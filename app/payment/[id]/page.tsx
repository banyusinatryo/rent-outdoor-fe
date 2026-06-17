"use client";

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import { Loader2, AlertCircle, Upload, ShieldCheck, X } from 'lucide-react';
import { getMyRental, uploadPayment } from '@/lib/api';
import { useRequireAuth, RouteLoader } from '@/lib/auth-guard';
import {
  PAYMENT_METHOD_LABEL,
  type Rental,
  type PaymentMethod,
  type PaymentType,
} from '@/lib/types';

const PAYMENT_METHODS: PaymentMethod[] = ['BANK_TRANSFER', 'QRIS', 'EWALLET', 'CASH'];

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)',
  background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)',
};

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params?.id);
  const ready = useRequireAuth();

  // ── State ──────────────────────────────────────────────────────────────────
  const [rental, setRental] = useState<Rental | null>(null);
  const [loadingRental, setLoadingRental] = useState(true);
  const [errorRental, setErrorRental] = useState<string | null>(null);

  // ── Form fields ────────────────────────────────────────────────────────────
  const [type, setType] = useState<PaymentType>('DP');
  const [amount, setAmount] = useState<number>(0);
  const [method, setMethod] = useState<PaymentMethod>('BANK_TRANSFER');
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // ── Fetch rental (setelah auth siap) ───────────────────────────────────────
  useEffect(() => {
    if (!ready || !id) return;

    setLoadingRental(true);
    getMyRental(id)
      .then((res) => setRental(res.data))
      .catch(() => setErrorRental('Rental tidak ditemukan atau gagal dimuat.'))
      .finally(() => setLoadingRental(false));
  }, [ready, id]);

  // ── Default tipe & nominal mengikuti status rental ──────────────────────────
  useEffect(() => {
    if (!rental) return;
    const isFullStage = rental.status === 'WAITING_FULL_PAYMENT';
    const defaultType: PaymentType = isFullStage ? 'FULL_PAYMENT' : 'DP';
    setType(defaultType);
  }, [rental]);

  // Saran nominal: FULL_PAYMENT = sisa tagihan, DP = 50% dari sisa (dibulatkan ribuan)
  useEffect(() => {
    if (!rental) return;
    if (type === 'FULL_PAYMENT') {
      setAmount(rental.remaining_amount);
    } else {
      setAmount(Math.round((rental.remaining_amount / 2) / 1000) * 1000);
    }
  }, [type, rental]);

  // ── Preview gambar bukti ─────────────────────────────────────────────────────
  const onPickFile = (file: File | null) => {
    if (proofPreview) URL.revokeObjectURL(proofPreview);
    if (!file) {
      setProofFile(null);
      setProofPreview(null);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Ukuran gambar maksimal 5MB.');
      return;
    }
    setProofFile(file);
    setProofPreview(URL.createObjectURL(file));
  };
  useEffect(() => () => { if (proofPreview) URL.revokeObjectURL(proofPreview); }, [proofPreview]);

  const productNames = useMemo(
    () => rental?.items.map((it) => it.inventory_unit.product.name).join(', ') ?? '',
    [rental]
  );

  // ── Submit ───────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rental) return;
    if (!proofFile) {
      toast.error('Mohon unggah bukti pembayaran terlebih dahulu.');
      return;
    }
    if (!amount || amount < 1) {
      toast.error('Nominal pembayaran tidak valid.');
      return;
    }

    const formData = new FormData();
    formData.append('rental_id', String(rental.id));
    formData.append('type', type);
    formData.append('amount', String(amount));
    formData.append('payment_method', method);
    formData.append('payment_date', paymentDate);
    formData.append('proof_image', proofFile);
    if (notes.trim()) formData.append('notes', notes.trim());

    setSubmitting(true);
    try {
      await uploadPayment(formData);
      toast.success('Bukti pembayaran terkirim! Menunggu verifikasi admin.');
      router.push(`/dashboard/${rental.id}`);
    } catch (err: unknown) {
      const apiErr = err as { message?: string; errors?: Record<string, string[]> };
      const firstError = apiErr?.errors ? Object.values(apiErr.errors)[0]?.[0] : null;
      toast.error(firstError ?? apiErr?.message ?? 'Gagal mengirim pembayaran. Coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Guard auth ──────────────────────────────────────────────────────────────
  if (!ready) return <RouteLoader />;

  // ── Error / not found ──────────────────────────────────────────────────────────
  if (errorRental && !loadingRental) {
    return (
      <div className="container" style={{ paddingTop: '150px', textAlign: 'center' }}>
        <AlertCircle size={48} style={{ color: '#f87171', margin: '0 auto 1rem' }} />
        <h2 style={{ marginBottom: '1rem' }}>{errorRental}</h2>
        <Link href="/dashboard" className="text-gradient-primary">← Lihat Rental Saya</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: 'var(--space-xl)' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Pembayaran</h1>
        <p className="text-muted">
          Transfer ke rekening toko, lalu unggah bukti transfer. Admin akan memverifikasi pembayaran Anda.
        </p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1.5fr 1fr', gap: 'var(--space-xl)' }}>
        {/* ── Left: Form upload ── */}
        <div>
          <form onSubmit={handleSubmit} className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
            {/* Instruksi rekening (statis) */}
            <div style={{ background: 'var(--color-bg)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-primary)', marginBottom: '2rem' }}>
              <h4 style={{ marginBottom: '0.5rem' }}>Tujuan Transfer</h4>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>
                <strong>BCA</strong> 1234567890 — a.n. Nexus Outdoor<br />
                <span className="text-muted" style={{ fontSize: '0.8rem' }}>Atau QRIS / e-wallet sesuai metode yang dipilih.</span>
              </p>
            </div>

            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>Detail Pembayaran</h3>

            {/* Tipe pembayaran */}
            <label className="text-muted" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Jenis Pembayaran</label>
            <div className="grid grid-cols-2 gap-sm" style={{ marginBottom: '1.5rem' }}>
              {(['DP', 'FULL_PAYMENT'] as PaymentType[]).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setType(t)}
                  style={{
                    padding: '0.9rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                    background: type === t ? 'rgba(0,229,255,0.1)' : 'transparent',
                    border: `1px solid ${type === t ? 'var(--color-primary)' : 'var(--color-border)'}`,
                    color: type === t ? 'var(--color-primary)' : 'var(--color-text-muted)',
                    fontWeight: type === t ? 600 : 400, transition: 'all 0.2s',
                  }}
                >
                  {t === 'DP' ? 'Uang Muka (DP)' : 'Pelunasan'}
                </button>
              ))}
            </div>

            {/* Nominal */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="text-muted" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Nominal (Rp)</label>
              <input
                type="number" min={1} value={amount || ''}
                onChange={(e) => setAmount(Number(e.target.value))}
                style={inputStyle} required
              />
            </div>

            {/* Metode */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="text-muted" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Metode Pembayaran</label>
              <div className="flex flex-wrap gap-sm">
                {PAYMENT_METHODS.map((m) => (
                  <button
                    type="button" key={m} onClick={() => setMethod(m)}
                    style={{
                      padding: '0.6rem 1rem', borderRadius: 'var(--radius-full)', cursor: 'pointer', fontSize: '0.85rem',
                      background: method === m ? 'rgba(0,229,255,0.1)' : 'transparent',
                      border: `1px solid ${method === m ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      color: method === m ? 'var(--color-primary)' : 'var(--color-text-muted)',
                      fontWeight: method === m ? 600 : 400, transition: 'all 0.2s',
                    }}
                  >
                    {PAYMENT_METHOD_LABEL[m]}
                  </button>
                ))}
              </div>
            </div>

            {/* Tanggal */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="text-muted" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Tanggal Pembayaran</label>
              <input
                type="date" value={paymentDate} max={new Date().toISOString().split('T')[0]}
                onChange={(e) => setPaymentDate(e.target.value)} style={inputStyle} required
              />
            </div>

            {/* Upload bukti */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="text-muted" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Bukti Transfer (maks 5MB)</label>
              {proofPreview ? (
                <div style={{ position: 'relative', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={proofPreview} alt="Bukti transfer" style={{ width: '100%', maxHeight: '320px', objectFit: 'contain', background: 'var(--color-bg)' }} />
                  <button
                    type="button" onClick={() => onPickFile(null)}
                    style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', width: 32, height: 32, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  padding: '2rem', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                  border: '1px dashed var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text-muted)',
                }}>
                  <Upload size={28} style={{ opacity: 0.6 }} />
                  <span style={{ fontSize: '0.9rem' }}>Klik untuk pilih gambar (jpg/png)</span>
                  <input
                    type="file" accept="image/jpeg,image/png,image/jpg" hidden
                    onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
                  />
                </label>
              )}
            </div>

            {/* Catatan */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="text-muted" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Catatan (opsional)</label>
              <textarea
                value={notes} onChange={(e) => setNotes(e.target.value)} rows={2}
                placeholder="Contoh: Transfer via BCA a.n. Budi"
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            <button
              type="submit" className="btn btn-primary"
              style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              disabled={submitting || loadingRental}
            >
              {submitting
                ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Mengirim...</>
                : <><Upload size={18} /> Kirim Bukti Pembayaran</>}
            </button>
          </form>
        </div>

        {/* ── Right: Ringkasan rental ── */}
        <div>
          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', position: 'sticky', top: '100px' }}>
            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>Ringkasan Tagihan</h3>

            {loadingRental ? (
              <div style={{ height: '180px', background: 'rgba(255,255,255,0.04)', borderRadius: 12 }} />
            ) : rental && (
              <>
                <div className="flex gap-sm" style={{ marginBottom: '1.5rem' }}>
                  {rental.items[0] && (
                    <div style={{ position: 'relative', width: '64px', height: '64px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', flexShrink: 0, background: 'var(--color-bg)' }}>
                      <Image src="/images/gear_tent.png" alt="" fill unoptimized style={{ objectFit: 'cover' }} />
                    </div>
                  )}
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>{rental.rental_code}</p>
                    <p className="text-muted" style={{ fontSize: '0.8rem', lineHeight: 1.4 }}>{productNames}</p>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)' }}>{rental.status_label}</span>
                  </div>
                </div>

                <div style={{ background: 'var(--color-bg)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                  <div className="flex justify-between" style={{ marginBottom: '0.5rem' }}>
                    <span className="text-muted">Periode</span>
                    <span>{rental.start_date} → {rental.end_date}</span>
                  </div>
                  <div className="flex justify-between" style={{ marginBottom: '0.5rem' }}>
                    <span className="text-muted">Subtotal</span>
                    <span>Rp {rental.subtotal.toLocaleString('id-ID')}</span>
                  </div>
                  {rental.discount_amount > 0 && (
                    <div className="flex justify-between" style={{ marginBottom: '0.5rem' }}>
                      <span className="text-muted">Diskon</span>
                      <span>- Rp {rental.discount_amount.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                  <div className="flex justify-between" style={{ marginBottom: '0.5rem' }}>
                    <span className="text-muted">Sudah Dibayar</span>
                    <span style={{ color: '#4ade80' }}>Rp {rental.paid_amount.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <div className="flex justify-between" style={{ fontWeight: 700, fontSize: '1.15rem', borderTop: '1px dashed var(--color-border)', paddingTop: '1rem' }}>
                  <span>Sisa Tagihan</span>
                  <span className="text-gradient-primary">Rp {rental.remaining_amount.toLocaleString('id-ID')}</span>
                </div>

                <div className="flex items-center gap-xs" style={{ marginTop: '1.5rem', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  <ShieldCheck size={14} color="#4ade80" />
                  Pembayaran diverifikasi manual oleh admin.
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
