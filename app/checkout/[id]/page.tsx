"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { Loader2, AlertCircle } from 'lucide-react';
import { getProduct, createBooking } from '@/lib/api';
import { getProductImage, calculateRentalPrice, type ApiProduct } from '@/lib/types';
import { useRequireAuth, RouteLoader } from '@/lib/auth-guard';

export default function CheckoutPage() {
  const params       = useParams();
  const searchParams = useSearchParams();
  const router       = useRouter();

  const id        = Number(params?.id);
  const startDate = searchParams?.get('start') ?? '';
  const endDate   = searchParams?.get('end') ?? '';
  const unitId    = Number(searchParams?.get('unit_id'));
  const days      = Number(searchParams?.get('days')) || 0;
  const ready     = useRequireAuth();

  // ── State ────────────────────────────────────────────────────────────────
  const [product, setProduct]     = useState<ApiProduct | null>(null);
  const [loadingProd, setLoadingProd] = useState(true);
  const [name, setName]           = useState('');
  const [wa, setWa]               = useState('');
  const [notes, setNotes]         = useState('');
  const [loading, setLoading]     = useState(false);

  // ── Fetch produk (setelah auth siap) ──────────────────────────────────────
  useEffect(() => {
    if (!ready || !id) return;

    setLoadingProd(true);
    getProduct(id)
      .then((res) => setProduct(res.data))
      .catch(() => toast.error('Gagal memuat data produk.'))
      .finally(() => setLoadingProd(false));
  }, [ready, id]);

  // ── Validasi param URL ────────────────────────────────────────────────────
  const isInvalid = !startDate || !endDate || !unitId || days <= 0;

  // ── Hitung harga ──────────────────────────────────────────────────────────
  const rentalTotal = product ? calculateRentalPrice(product, days) : 0;

  // ── Handler booking ───────────────────────────────────────────────────────
  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !wa.trim()) {
      toast.error('Mohon lengkapi nama dan nomor WhatsApp');
      return;
    }
    if (!product || !unitId) return;

    setLoading(true);
    try {
      const res = await createBooking({
        start_date: startDate,
        end_date: endDate,
        items: [{ inventory_unit_id: unitId, rental_days: days }],
        notes: notes.trim() || undefined,
      });

      toast.success('Booking berhasil dibuat!');
      // Redirect ke halaman payment dengan rental ID dari API
      router.push(`/payment/${res.data.id}?start=${startDate}&end=${endDate}`);
    } catch (err: unknown) {
      const apiErr = err as { message?: string };
      toast.error(apiErr?.message ?? 'Booking gagal. Coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  // ── Guard auth ──────────────────────────────────────────────────────────────
  if (!ready) return <RouteLoader />;

  // ── Invalid params ────────────────────────────────────────────────────────
  if (isInvalid && !loadingProd) {
    return (
      <div className="container" style={{ paddingTop: '150px', textAlign: 'center' }}>
        <AlertCircle size={48} style={{ color: '#f87171', margin: '0 auto 1rem' }} />
        <h2>Pesanan Tidak Valid</h2>
        <p className="text-muted" style={{ margin: '1rem 0 2rem' }}>
          Silakan pilih produk dan tanggal sewa terlebih dahulu.
        </p>
        <Link href="/katalog" className="text-gradient-primary">← Kembali ke Katalog</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: 'var(--space-xl)' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Checkout</h1>
        <p className="text-muted">Selesaikan pesanan Anda dengan mengisi detail di bawah ini.</p>
      </div>

      <div className="grid grid-checkout-container" style={{ gridTemplateColumns: '1.5fr 1fr', gap: 'var(--space-xl)' }}>
        {/* ── Left: Formulir ── */}
        <div>
          <form onSubmit={handleBooking} className="glass responsive-card" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>Data Penyewa</h3>

            <div style={{ marginBottom: '1.5rem' }}>
              <label className="text-muted" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Nama Lengkap</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkap sesuai KTP"
                required
                style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label className="text-muted" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Nomor WhatsApp</label>
              <input
                type="tel"
                value={wa}
                onChange={(e) => setWa(e.target.value)}
                placeholder="Contoh: 081234567890"
                required
                style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label className="text-muted" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Catatan (opsional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Ambil jam 10 pagi"
                rows={3}
                style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)', resize: 'vertical' }}
              />
            </div>

            <h3 style={{ marginTop: '2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>Metode Pengambilan</h3>

            <div style={{ background: 'var(--color-bg)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-primary)' }}>
              <div className="flex items-center gap-sm">
                <span style={{ fontSize: '1.5rem' }}>📍</span>
                <div>
                  <h4 style={{ marginBottom: '0.2rem' }}>Ambil di Toko</h4>
                  <p className="text-muted" style={{ fontSize: '0.85rem' }}>Penyewa datang langsung ke alamat <strong>Nexus Outdoor</strong>.</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '1rem', marginTop: '2rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              disabled={loading}
            >
              {loading ? <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Memproses...</> : 'Lanjut ke Pembayaran'}
            </button>
          </form>
        </div>

        {/* ── Right: Ringkasan ── */}
        <div>
          <div className="glass sidebar-sticky" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', position: 'sticky', top: '100px' }}>
            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>Ringkasan Pesanan</h3>

            {loadingProd ? (
              <div style={{ height: '80px', background: 'rgba(255,255,255,0.04)', borderRadius: 12, marginBottom: '1.5rem' }} />
            ) : product && (
              <div className="flex gap-sm" style={{ marginBottom: '1.5rem' }}>
                <div style={{ position: 'relative', width: '80px', height: '80px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', flexShrink: 0 }}>
                  <Image src={getProductImage(product)} alt={product.name} fill unoptimized style={{ objectFit: 'cover' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>{product.name}</h4>
                  <p className="text-muted" style={{ fontSize: '0.85rem' }}>Brand: {product.brand || 'Nexus Outdoor'}</p>
                  <p className="text-muted" style={{ fontSize: '0.85rem' }}>Kategori: {product.category.name}</p>
                </div>
              </div>
            )}

            <div style={{ background: 'var(--color-bg)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
              <div className="flex justify-between" style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span className="text-muted">Tanggal Ambil</span>
                <span>{startDate}</span>
              </div>
              <div className="flex justify-between" style={{ fontSize: '0.9rem' }}>
                <span className="text-muted">Tanggal Kembali</span>
                <span>{endDate}</span>
              </div>
            </div>

            <div className="flex justify-between" style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <span className="text-muted">Biaya Sewa ({days} Hari)</span>
              <span>Rp {rentalTotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between" style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
              <span className="text-muted">Jaminan Identitas</span>
              <span>KTP/SIM Asli</span>
            </div>

            <div className="flex justify-between" style={{ fontWeight: 700, fontSize: '1.2rem', borderTop: '1px dashed var(--color-border)', paddingTop: '1rem' }}>
              <span>Total Bayar</span>
              <span className="text-gradient-primary">Rp {rentalTotal.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
