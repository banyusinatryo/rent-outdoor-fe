"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Package, ChevronRight, Loader2 } from 'lucide-react';
import { getMyRentals } from '@/lib/api';
import { getCustomer } from '@/lib/auth';
import { useRequireAuth, RouteLoader } from '@/lib/auth-guard';
import { statusColorHex, type Rental } from '@/lib/types';

function StatusBadge({ label, color }: { label: string; color: string }) {
  const hex = statusColorHex(color);
  return (
    <span style={{
      display: 'inline-block', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)',
      fontSize: '0.75rem', fontWeight: 600, color: hex,
      background: `${hex}1a`, border: `1px solid ${hex}55`,
    }}>
      {label}
    </span>
  );
}

export default function DashboardPage() {
  const ready = useRequireAuth();
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const customer = typeof window !== 'undefined' ? getCustomer() : null;

  const fetchRentals = useCallback((p: number) => {
    setLoading(true);
    setError(null);
    getMyRentals(p)
      .then((res) => {
        setRentals((prev) => (p === 1 ? res.data : [...prev, ...res.data]));
        setLastPage(res.meta.last_page);
      })
      .catch(() => setError('Gagal memuat daftar rental.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (ready) fetchRentals(1);
  }, [ready, fetchRentals]);

  if (!ready) return <RouteLoader />;

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: 'var(--space-xl)', minHeight: '80vh' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.3rem', letterSpacing: '-1px' }}>
          Rental <span className="text-gradient-primary">Saya</span>
        </h1>
        <p className="text-muted">
          {customer ? `Halo, ${customer.name.split(' ')[0]}! ` : ''}Pantau status booking dan pembayaran Anda di sini.
        </p>
      </div>

      {error && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
          <p style={{ marginBottom: '1rem' }}>{error}</p>
          <button className="btn btn-primary" onClick={() => fetchRentals(1)}>Coba Lagi</button>
        </div>
      )}

      {/* Skeleton */}
      {loading && rentals.length === 0 && !error && (
        <div className="flex flex-col gap-sm">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass" style={{ height: '110px', borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,0.03)' }} />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && rentals.length === 0 && !error && (
        <div className="text-center text-muted" style={{ padding: '5rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Package size={32} style={{ opacity: 0.3, color: 'var(--color-primary)' }} />
          </div>
          <p style={{ fontSize: '1.2rem', fontWeight: 500 }}>Belum ada rental</p>
          <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>Yuk mulai sewa perlengkapan outdoor pertamamu.</p>
          <Link href="/katalog" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>Eksplor Katalog</Link>
        </div>
      )}

      {/* List */}
      <div className="flex flex-col gap-sm">
        {rentals.map((r, i) => {
          const names = r.items.map((it) => it.inventory_unit.product.name).join(', ');
          return (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.3) }}
            >
              <Link href={`/dashboard/${r.id}`} style={{ display: 'block' }}>
                <div
                  className="glass hover-lift"
                  style={{ padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
                >
                  <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-sm)', background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Package size={22} color="var(--color-primary)" />
                  </div>
                  <div style={{ flexGrow: 1, minWidth: 0 }}>
                    <div className="flex items-center gap-sm" style={{ marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                      <strong style={{ fontSize: '0.95rem' }}>{r.rental_code}</strong>
                      <StatusBadge label={r.status_label} color={r.status_color} />
                    </div>
                    <p className="text-muted" style={{ fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{names}</p>
                    <p className="text-muted" style={{ fontSize: '0.78rem', marginTop: '0.2rem' }}>{r.start_date} → {r.end_date}</p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p style={{ fontWeight: 700, color: 'var(--color-primary)' }}>Rp {r.total_amount.toLocaleString('id-ID')}</p>
                    {r.remaining_amount > 0 && (
                      <p style={{ fontSize: '0.72rem', color: '#ffb347' }}>Sisa Rp {r.remaining_amount.toLocaleString('id-ID')}</p>
                    )}
                  </div>
                  <ChevronRight size={20} className="text-muted" style={{ flexShrink: 0 }} />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Load more */}
      {!error && page < lastPage && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            className="btn btn-outline"
            disabled={loading}
            onClick={() => { const next = page + 1; setPage(next); fetchRentals(next); }}
          >
            {loading ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Memuat...</> : 'Muat Lebih Banyak'}
          </button>
        </div>
      )}
    </div>
  );
}
