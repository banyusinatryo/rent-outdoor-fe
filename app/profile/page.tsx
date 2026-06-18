"use client";

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Loader2, User, ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react';
import { getMe, updateMe } from '@/lib/api';
import { saveCustomer } from '@/lib/auth';
import { useRequireAuth, RouteLoader } from '@/lib/auth-guard';
import type { Customer, CustomerStatus } from '@/lib/types';

const STATUS_META: Record<CustomerStatus, { label: string; color: string; icon: React.ReactNode }> = {
  VERIFIED: { label: 'Terverifikasi', color: '#4ade80', icon: <ShieldCheck size={16} /> },
  UNVERIFIED: { label: 'Belum Verifikasi', color: '#ffb347', icon: <ShieldAlert size={16} /> },
  BLACKLISTED: { label: 'Diblokir', color: '#f87171', icon: <ShieldX size={16} /> },
};

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)',
  background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)',
};
const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' };

export default function ProfilePage() {
  const ready = useRequireAuth();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: '', phone: '', address: '',
    emergency_contact_name: '', emergency_contact_phone: '',
  });

  useEffect(() => {
    if (!ready) return;
    getMe()
      .then((res) => {
        setCustomer(res.data);
        setForm({
          name: res.data.name ?? '',
          phone: res.data.phone ?? '',
          address: res.data.address ?? '',
          emergency_contact_name: res.data.emergency_contact_name ?? '',
          emergency_contact_phone: res.data.emergency_contact_phone ?? '',
        });
      })
      .catch(() => setError('Gagal memuat profil.'))
      .finally(() => setLoading(false));
  }, [ready]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await updateMe({
        name: form.name,
        phone: form.phone,
        address: form.address || undefined,
        emergency_contact_name: form.emergency_contact_name || undefined,
        emergency_contact_phone: form.emergency_contact_phone || undefined,
      });
      setCustomer(res.data);
      saveCustomer(res.data); // sinkronkan cache lokal (dipakai Navbar)
      toast.success('Profil berhasil diperbarui.');
    } catch (err: unknown) {
      const apiErr = err as { message?: string; errors?: Record<string, string[]> };
      const firstError = apiErr?.errors ? Object.values(apiErr.errors)[0]?.[0] : null;
      toast.error(firstError ?? apiErr?.message ?? 'Gagal menyimpan profil.');
    } finally {
      setSaving(false);
    }
  };

  if (!ready) return <RouteLoader />;

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: 'var(--space-xl)', maxWidth: '720px', minHeight: '80vh' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div className="flex items-center gap-sm" style={{ marginBottom: '0.3rem' }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <User size={24} color="var(--color-primary)" />
        </div>
        <div>
          <h1 style={{ fontSize: '1.8rem' }}>Profil Saya</h1>
          {customer && (
            <span className="flex items-center gap-xs" style={{ fontSize: '0.82rem', color: STATUS_META[customer.status].color }}>
              {STATUS_META[customer.status].icon} {STATUS_META[customer.status].label}
            </span>
          )}
        </div>
      </div>

      {error && <p className="text-muted" style={{ marginTop: '2rem' }}>{error}</p>}

      {loading ? (
        <div className="glass" style={{ height: '420px', borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,0.03)', marginTop: '1.5rem' }} />
      ) : customer && (
        <form onSubmit={handleSave} className="glass responsive-card" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', marginTop: '1.5rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="text-muted" style={labelStyle}>Email</label>
            <input type="email" value={customer.email} disabled style={{ ...inputStyle, opacity: 0.6, cursor: 'not-allowed' }} />
            <p className="text-muted" style={{ fontSize: '0.75rem', marginTop: '0.3rem' }}>Email tidak dapat diubah.</p>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label className="text-muted" style={labelStyle}>Nama Lengkap</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} required />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label className="text-muted" style={labelStyle}>Nomor WhatsApp</label>
            <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inputStyle} required />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label className="text-muted" style={labelStyle}>Alamat</label>
            <textarea rows={2} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>

          <h3 style={{ margin: '0.5rem 0 1.25rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>Kontak Darurat</h3>

          <div className="grid grid-cols-2 gap-sm">
            <div>
              <label className="text-muted" style={labelStyle}>Nama Kontak</label>
              <input type="text" value={form.emergency_contact_name} onChange={(e) => setForm({ ...form, emergency_contact_name: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label className="text-muted" style={labelStyle}>Nomor Kontak</label>
              <input type="tel" value={form.emergency_contact_phone} onChange={(e) => setForm({ ...form, emergency_contact_phone: e.target.value })} style={inputStyle} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={saving}
            style={{ width: '100%', padding: '1rem', marginTop: '2rem', justifyContent: 'center', gap: '0.5rem' }}>
            {saving ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Menyimpan...</> : 'Simpan Perubahan'}
          </button>
        </form>
      )}
    </div>
  );
}
