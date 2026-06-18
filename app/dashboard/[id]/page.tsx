"use client";

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  ArrowLeft, AlertCircle, Loader2, CreditCard, XCircle,
  Star, CheckCircle2, Receipt, Package,
} from 'lucide-react';
import { getMyRental, cancelRental, submitReview } from '@/lib/api';
import { useRequireAuth, RouteLoader } from '@/lib/auth-guard';
import { statusColorHex, type Rental } from '@/lib/types';

function StatusBadge({ label, color }: { label: string; color: string }) {
  const hex = statusColorHex(color);
  return (
    <span style={{
      display: 'inline-block', padding: '0.3rem 0.9rem', borderRadius: 'var(--radius-full)',
      fontSize: '0.8rem', fontWeight: 600, color: hex, background: `${hex}1a`, border: `1px solid ${hex}55`,
    }}>
      {label}
    </span>
  );
}

const rowStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem' };

export default function RentalDetailPage() {
  const params = useParams();
  const id = Number(params?.id);
  const ready = useRequireAuth();

  const [rental, setRental] = useState<Rental | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);

  // Review form
  const [ratings, setRatings] = useState<Record<number, number>>({});
  const [comments, setComments] = useState<Record<number, string>>({});
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchRental = useCallback(() => {
    setLoading(true);
    getMyRental(id)
      .then((res) => setRental(res.data))
      .catch(() => setError('Rental tidak ditemukan atau gagal dimuat.'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (ready && id) fetchRental();
  }, [ready, id, fetchRental]);

  const handleCancel = async () => {
    if (!rental) return;
    if (!confirm('Yakin ingin membatalkan booking ini?')) return;
    setCancelling(true);
    try {
      const res = await cancelRental(rental.id);
      setRental(res.data);
      toast.success('Booking berhasil dibatalkan.');
    } catch (err: unknown) {
      const apiErr = err as { message?: string };
      toast.error(apiErr?.message ?? 'Gagal membatalkan booking.');
    } finally {
      setCancelling(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!rental) return;
    // Produk unik dari items
    const productIds = Array.from(new Set(rental.items.map((it) => it.inventory_unit.product.id)));
    const reviews = productIds
      .filter((pid) => ratings[pid])
      .map((pid) => ({ product_id: pid, rating: ratings[pid], comment: comments[pid]?.trim() || undefined }));

    if (reviews.length === 0) {
      toast.error('Beri rating minimal untuk satu produk.');
      return;
    }

    setSubmittingReview(true);
    try {
      await submitReview(rental.id, reviews);
      toast.success('Terima kasih atas ulasannya!');
      fetchRental();
    } catch (err: unknown) {
      const apiErr = err as { message?: string };
      toast.error(apiErr?.message ?? 'Gagal mengirim ulasan.');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (!ready) return <RouteLoader />;

  if (error && !loading) {
    return (
      <div className="container" style={{ paddingTop: '150px', textAlign: 'center' }}>
        <AlertCircle size={48} style={{ color: '#f87171', margin: '0 auto 1rem' }} />
        <h2 style={{ marginBottom: '1rem' }}>{error}</h2>
        <Link href="/dashboard" className="text-gradient-primary">← Kembali ke Rental Saya</Link>
      </div>
    );
  }

  if (loading || !rental) {
    return (
      <div className="container" style={{ paddingTop: '120px', paddingBottom: 'var(--space-xl)' }}>
        <div className="glass" style={{ height: '400px', borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,0.03)' }} />
      </div>
    );
  }

  const canPay = rental.remaining_amount > 0 &&
    ['BOOKING_REQUEST', 'WAITING_FULL_PAYMENT'].includes(rental.status);
  const canCancel = rental.status === 'BOOKING_REQUEST';
  const canReview = rental.status === 'COMPLETED';
  const uniqueProducts = Array.from(
    new Map(rental.items.map((it) => [it.inventory_unit.product.id, it.inventory_unit.product])).values()
  );

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: 'var(--space-xl)' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      <Link href="/dashboard" className="text-muted flex items-center gap-xs" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        <ArrowLeft size={16} /> Kembali ke Rental Saya
      </Link>

      <div className="flex items-center gap-sm" style={{ marginBottom: '0.5rem', flexWrap: 'wrap' }}>
        <h1 style={{ fontSize: '2rem' }}>{rental.rental_code}</h1>
        <StatusBadge label={rental.status_label} color={rental.status_color} />
      </div>
      <p className="text-muted" style={{ marginBottom: '2rem' }}>Periode sewa: {rental.start_date} → {rental.end_date}</p>

      <div className="grid grid-checkout-container" style={{ gridTemplateColumns: '1.5fr 1fr', gap: 'var(--space-xl)' }}>
        {/* ── Left: Items + Payments + Review ── */}
        <div className="flex flex-col gap-sm">
          {/* Items */}
          <div className="glass responsive-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)' }}>
            <h3 className="flex items-center gap-xs" style={{ marginBottom: '1.25rem' }}><Package size={18} /> Barang Disewa</h3>
            <div className="flex flex-col gap-sm">
              {rental.items.map((it) => (
                <div key={it.id} className="flex justify-between" style={{ padding: '0.75rem 1rem', background: 'var(--color-bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                  <div>
                    <p style={{ fontSize: '0.95rem' }}>{it.inventory_unit.product.name}</p>
                    <p className="text-muted" style={{ fontSize: '0.78rem' }}>
                      Unit {it.inventory_unit.unit_code} · {it.rental_days} hari
                    </p>
                  </div>
                  <span style={{ fontWeight: 600 }}>Rp {it.subtotal.toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payments */}
          <div className="glass responsive-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)' }}>
            <h3 className="flex items-center gap-xs" style={{ marginBottom: '1.25rem' }}><Receipt size={18} /> Riwayat Pembayaran</h3>
            {rental.payments.length === 0 ? (
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>Belum ada pembayaran.</p>
            ) : (
              <div className="flex flex-col gap-sm">
                {rental.payments.map((p) => {
                  const pColor = p.status === 'VERIFIED' ? '#4ade80' : p.status === 'REJECTED' ? '#f87171' : '#ffb347';
                  return (
                    <div key={p.id} className="flex justify-between items-center" style={{ padding: '0.75rem 1rem', background: 'var(--color-bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                      <div>
                        <p style={{ fontSize: '0.9rem' }}>{p.type_label} · {p.payment_method_label}</p>
                        <p className="text-muted" style={{ fontSize: '0.78rem' }}>{p.payment_date?.split('T')[0]}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontWeight: 600 }}>Rp {p.amount.toLocaleString('id-ID')}</p>
                        <span style={{ fontSize: '0.72rem', color: pColor }}>{p.status_label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Review (COMPLETED) */}
          {canReview && (
            <div className="glass responsive-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,179,71,0.25)' }}>
              <h3 className="flex items-center gap-xs" style={{ marginBottom: '0.5rem' }}><Star size={18} color="#ffb347" /> Beri Ulasan</h3>
              <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '1.25rem' }}>Bagikan pengalamanmu menyewa barang ini.</p>
              {uniqueProducts.map((prod) => (
                <div key={prod.id} style={{ marginBottom: '1.25rem' }}>
                  <p style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>{prod.name}</p>
                  <div className="flex gap-xs" style={{ marginBottom: '0.5rem' }}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} type="button" onClick={() => setRatings((r) => ({ ...r, [prod.id]: n }))}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
                        <Star size={24} color="#ffb347" fill={(ratings[prod.id] ?? 0) >= n ? '#ffb347' : 'transparent'} />
                      </button>
                    ))}
                  </div>
                  <textarea
                    rows={2} placeholder="Tulis komentar (opsional)"
                    value={comments[prod.id] ?? ''}
                    onChange={(e) => setComments((c) => ({ ...c, [prod.id]: e.target.value }))}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: 'var(--radius-sm)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', resize: 'vertical' }}
                  />
                </div>
              ))}
              <button className="btn btn-primary" disabled={submittingReview} onClick={handleSubmitReview}
                style={{ gap: '0.5rem' }}>
                {submittingReview ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Mengirim...</> : <>Kirim Ulasan</>}
              </button>
            </div>
          )}
        </div>

        {/* ── Right: Billing + actions ── */}
        <div>
          <div className="glass sidebar-sticky" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)', position: 'sticky', top: '100px' }}>
            <h3 style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.85rem' }}>Rincian Biaya</h3>

            <div style={rowStyle}><span className="text-muted">Subtotal</span><span>Rp {rental.subtotal.toLocaleString('id-ID')}</span></div>
            {rental.discount_amount > 0 && <div style={rowStyle}><span className="text-muted">Diskon</span><span>- Rp {rental.discount_amount.toLocaleString('id-ID')}</span></div>}
            {rental.late_fee > 0 && <div style={rowStyle}><span className="text-muted">Denda Telat</span><span>Rp {rental.late_fee.toLocaleString('id-ID')}</span></div>}
            {rental.damage_fee > 0 && <div style={rowStyle}><span className="text-muted">Denda Kerusakan</span><span>Rp {rental.damage_fee.toLocaleString('id-ID')}</span></div>}
            {rental.cleaning_fee > 0 && <div style={rowStyle}><span className="text-muted">Biaya Kebersihan</span><span>Rp {rental.cleaning_fee.toLocaleString('id-ID')}</span></div>}

            <div style={{ ...rowStyle, marginTop: '0.5rem' }}><span className="text-muted">Total</span><span style={{ fontWeight: 600 }}>Rp {rental.total_amount.toLocaleString('id-ID')}</span></div>
            <div style={rowStyle}><span className="text-muted">Sudah Dibayar</span><span style={{ color: '#4ade80' }}>Rp {rental.paid_amount.toLocaleString('id-ID')}</span></div>

            <div className="flex justify-between" style={{ fontWeight: 700, fontSize: '1.15rem', borderTop: '1px dashed var(--color-border)', paddingTop: '1rem', marginTop: '0.5rem' }}>
              <span>Sisa Tagihan</span>
              <span className="text-gradient-primary">Rp {rental.remaining_amount.toLocaleString('id-ID')}</span>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-sm" style={{ marginTop: '1.5rem' }}>
              {canPay && (
                <Link href={`/payment/${rental.id}`} className="btn btn-primary" style={{ justifyContent: 'center', gap: '0.5rem' }}>
                  <CreditCard size={18} /> {rental.paid_amount > 0 ? 'Lanjutkan Pembayaran' : 'Bayar Sekarang'}
                </Link>
              )}
              {canCancel && (
                <button className="btn btn-outline" disabled={cancelling} onClick={handleCancel}
                  style={{ justifyContent: 'center', gap: '0.5rem', borderColor: 'rgba(248,113,113,0.4)', color: '#f87171' }}>
                  {cancelling ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Membatalkan...</> : <><XCircle size={16} /> Batalkan Booking</>}
                </button>
              )}
              {rental.status === 'COMPLETED' && (
                <div className="flex items-center gap-xs" style={{ color: '#4ade80', fontSize: '0.85rem', justifyContent: 'center' }}>
                  <CheckCircle2 size={16} /> Rental selesai
                </div>
              )}
            </div>

            {rental.notes && (
              <div style={{ marginTop: '1.5rem', padding: '0.85rem 1rem', background: 'var(--color-bg)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                <p className="text-muted" style={{ fontSize: '0.78rem', marginBottom: '0.25rem' }}>Catatan</p>
                <p style={{ fontSize: '0.88rem' }}>{rental.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
