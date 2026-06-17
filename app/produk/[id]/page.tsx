"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BadgeCheck, Star, AlertCircle, CheckCircle2, Package } from 'lucide-react';
import { getProduct, getProductAvailability } from '@/lib/api';
import { getProductImage, calculateRentalPrice, type ApiProduct, type AvailabilityData } from '@/lib/types';
import { isLoggedIn } from '@/lib/auth';

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function Skeleton({ w = '100%', h = '20px', mb = '0' }: { w?: string; h?: string; mb?: string }) {
  return (
    <div style={{
      width: w, height: h, marginBottom: mb,
      borderRadius: 8,
      background: 'rgba(255,255,255,0.06)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
        animation: 'shimmer 1.5s infinite',
      }} />
    </div>
  );
}

// ─── Komponen Utama ───────────────────────────────────────────────────────────
export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const id     = Number(params?.id);

  // ── State Produk ─────────────────────────────────────────────────────────
  const [product, setProduct]     = useState<ApiProduct | null>(null);
  const [loadingProd, setLoadingProd] = useState(true);
  const [errorProd, setErrorProd] = useState<string | null>(null);

  // ── State Tanggal & Availability ─────────────────────────────────────────
  const [startDate, setStartDate]           = useState('');
  const [endDate, setEndDate]               = useState('');
  const [availability, setAvailability]     = useState<AvailabilityData | null>(null);
  const [loadingAvail, setLoadingAvail]     = useState(false);

  // ── Fetch produk ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!id) return;
    setLoadingProd(true);
    getProduct(id)
      .then((res) => setProduct(res.data))
      .catch(() => setErrorProd('Produk tidak ditemukan atau gagal dimuat.'))
      .finally(() => setLoadingProd(false));
  }, [id]);

  // ── Fetch availability saat tanggal berubah ───────────────────────────────
  useEffect(() => {
    if (!startDate || !endDate || !id) {
      setAvailability(null);
      return;
    }
    if (new Date(endDate) < new Date(startDate)) return;

    setLoadingAvail(true);
    getProductAvailability(id, startDate, endDate)
      .then((res) => setAvailability(res.data))
      .catch(() => setAvailability(null))
      .finally(() => setLoadingAvail(false));
  }, [startDate, endDate, id]);

  // ── Perhitungan harga ─────────────────────────────────────────────────────
  const rentalDays   = availability?.rental_days ?? 0;
  const rentalTotal  = product && rentalDays > 0
    ? (availability?.tier_price ?? calculateRentalPrice(product, rentalDays))
    : 0;

  // ── Handler Booking ───────────────────────────────────────────────────────
  const handleBooking = () => {
    if (!availability?.is_available || !availability.available_units[0]) return;
    const unitId = availability.available_units[0].id;
    const checkoutUrl = `/checkout/${id}?start=${startDate}&end=${endDate}&unit_id=${unitId}&days=${rentalDays}`;
    // Belum login → arahkan ke login dulu, lalu kembali ke checkout
    if (!isLoggedIn()) {
      router.push(`/login?redirect=${encodeURIComponent(checkoutUrl)}`);
      return;
    }
    router.push(checkoutUrl);
  };

  // ── Error state ───────────────────────────────────────────────────────────
  if (errorProd) {
    return (
      <div className="container" style={{ paddingTop: '150px', textAlign: 'center' }}>
        <AlertCircle size={48} style={{ color: '#f87171', margin: '0 auto 1rem' }} />
        <h2 style={{ marginBottom: '1rem' }}>{errorProd}</h2>
        <Link href="/katalog" className="text-gradient-primary">← Kembali ke Katalog</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: 'var(--space-xl)' }}>
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      {/* Breadcrumb */}
      <div className="text-muted" style={{ marginBottom: 'var(--space-md)', fontSize: '0.9rem' }}>
        <Link href="/">Beranda</Link> &rsaquo; <Link href="/katalog">Katalog</Link> &rsaquo;{' '}
        <span style={{ color: 'var(--color-text)' }}>{product?.name ?? '...'}</span>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1.2fr 1fr', gap: 'var(--space-xl)' }}>

        {/* ══════════════════════════════════════════════
            LEFT COL — Informasi Produk
           ══════════════════════════════════════════════ */}
        <div>
          {/* Gambar */}
          <div className="glass" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '400px', position: 'relative', marginBottom: 'var(--space-md)' }}>
            {loadingProd
              ? <Skeleton w="100%" h="400px" />
              : product && (
                <Image
                  src={getProductImage(product)}
                  alt={product.name}
                  fill
                  unoptimized
                  style={{ objectFit: 'cover' }}
                />
              )
            }
          </div>

          {loadingProd ? (
            <>
              <Skeleton w="70%" h="40px" mb="0.75rem" />
              <Skeleton w="50%" h="20px" mb="1.5rem" />
              <Skeleton w="100%" h="80px" mb="2rem" />
            </>
          ) : product && (
            <>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{product.name}</h1>

              <div className="flex items-center gap-sm" style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ background: 'var(--color-bg-glass)', padding: '0.2rem 0.8rem', borderRadius: 'var(--radius-full)', fontSize: '0.85rem' }}>
                  {product.category.name}
                </div>
                {product.brand && (
                  <div className="flex items-center gap-xs">
                    <BadgeCheck size={16} color="#4ade80" />
                    <span style={{ color: '#4ade80', fontSize: '0.85rem' }}>{product.brand}</span>
                  </div>
                )}
                <div className="flex items-center gap-xs">
                  <span style={{ color: product.available_units_count > 0 ? '#4ade80' : '#f87171', fontSize: '0.85rem' }}>
                    {product.available_units_count > 0
                      ? `✓ ${product.available_units_count} Unit Tersedia`
                      : '✗ Stok Habis'}
                  </span>
                </div>
              </div>

              <h3 style={{ marginBottom: '1rem' }}>Deskripsi Barang</h3>
              <p className="text-muted" style={{ lineHeight: 1.7, marginBottom: '2rem' }}>{product.description}</p>

              {/* Pricing Tiers */}
              {product.pricing_tiers.length > 0 && (
                <>
                  <h3 style={{ marginBottom: '1rem' }}>Harga Paket Sewa</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                    {product.pricing_tiers.map((tier) => (
                      <div key={tier.days} className="glass" style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)',
                        border: '1px solid rgba(0,229,255,0.1)',
                      }}>
                        <span className="text-muted" style={{ fontSize: '0.9rem' }}>{tier.days} Hari</span>
                        <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                          Rp {tier.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* ══════════════════════════════════════════════
            RIGHT COL — Booking Widget
           ══════════════════════════════════════════════ */}
        <div>
          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', position: 'sticky', top: '100px' }}>

            {loadingProd ? (
              <>
                <Skeleton w="60%" h="36px" mb="0.5rem" />
                <Skeleton w="40%" h="18px" mb="2rem" />
              </>
            ) : product && (
              <>
                <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
                  Rp {product.default_daily_price.toLocaleString('id-ID')}
                  <span className="text-muted" style={{ fontSize: '1rem', fontWeight: 400 }}> / hari</span>
                </h2>
                <div className="flex items-center gap-xs" style={{ marginBottom: '2rem' }}>
                  <Star size={16} style={{ color: '#ffb347', fill: '#ffb347' }} />
                  <span style={{ fontSize: '0.9rem' }}>Kondisi Prima</span>
                  <span className="text-muted" style={{ fontSize: '0.85rem' }}>
                    · {product.available_units_count} unit tersedia
                  </span>
                </div>
              </>
            )}

            {/* Pilih tanggal */}
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Pilih Tanggal Sewa</h3>
            <div className="grid grid-cols-2 gap-sm" style={{ marginBottom: '1.5rem' }}>
              <div>
                <label className="text-muted" style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Tanggal Ambil</label>
                <input
                  type="date"
                  value={startDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                />
              </div>
              <div>
                <label className="text-muted" style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Tanggal Kembali</label>
                <input
                  type="date"
                  value={endDate}
                  min={startDate || new Date().toISOString().split('T')[0]}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
                />
              </div>
            </div>

            {/* Availability Result */}
            {loadingAvail && (
              <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                Mengecek ketersediaan...
              </div>
            )}

            {!loadingAvail && availability && (
              <div className="animate-fade-in" style={{
                background: 'var(--color-bg)', padding: '1.5rem',
                borderRadius: 'var(--radius-md)', marginBottom: '1.5rem',
                border: `1px solid ${availability.is_available ? 'rgba(74,222,128,0.3)' : 'rgba(248,113,113,0.3)'}`,
              }}>
                {/* Status ketersediaan */}
                <div className="flex items-center gap-xs" style={{ marginBottom: '1rem' }}>
                  {availability.is_available
                    ? <CheckCircle2 size={18} color="#4ade80" />
                    : <AlertCircle size={18} color="#f87171" />
                  }
                  <span style={{ fontWeight: 600, color: availability.is_available ? '#4ade80' : '#f87171', fontSize: '0.9rem' }}>
                    {availability.is_available
                      ? `${availability.available_units_count} unit tersedia pada tanggal ini`
                      : 'Tidak tersedia pada tanggal ini'}
                  </span>
                </div>

                {availability.is_available && (
                  <>
                    <h4 style={{ marginBottom: '1rem', borderBottom: '1px dashed var(--color-border)', paddingBottom: '0.5rem' }}>
                      Rincian Biaya
                    </h4>
                    <div className="flex justify-between" style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      <span className="text-muted">Durasi Sewa</span>
                      <span>{availability.rental_days} Hari</span>
                    </div>
                    <div className="flex justify-between" style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                      <span className="text-muted">
                        {availability.tier_price ? 'Harga Paket' : `Rp ${product?.default_daily_price.toLocaleString('id-ID')} × ${availability.rental_days} hari`}
                      </span>
                      <span>Rp {rentalTotal.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between" style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
                      <span className="text-muted">Jaminan Identitas</span>
                      <span>KTP/SIM (Ditahan di toko)</span>
                    </div>
                    <div className="flex justify-between" style={{ fontWeight: 700, fontSize: '1.2rem', borderTop: '1px dashed var(--color-border)', paddingTop: '1rem' }}>
                      <span>Total Bayar</span>
                      <span className="text-gradient-primary">Rp {rentalTotal.toLocaleString('id-ID')}</span>
                    </div>
                    {availability.tier_price && (
                      <p style={{ fontSize: '0.75rem', color: '#4ade80', marginTop: '0.5rem', textAlign: 'center' }}>
                        🎉 Harga paket diterapkan!
                      </p>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Unit info jika tersedia */}
            {!loadingAvail && availability?.is_available && availability.available_units[0] && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                marginBottom: '1.5rem', padding: '0.75rem 1rem',
                background: 'rgba(74,222,128,0.05)', borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(74,222,128,0.15)',
              }}>
                <Package size={16} color="#4ade80" />
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Unit: <strong style={{ color: 'var(--color-text)' }}>{availability.available_units[0].unit_code}</strong>
                </span>
              </div>
            )}

            <button
              className="btn btn-primary"
              style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
              disabled={!availability?.is_available || loadingAvail || loadingProd}
              onClick={handleBooking}
            >
              {loadingAvail
                ? 'Mengecek ketersediaan...'
                : availability?.is_available
                  ? 'Lanjut Booking'
                  : startDate && endDate
                    ? 'Tidak Tersedia'
                    : 'Pilih Tanggal Dulu'
              }
            </button>

            <p className="text-muted" style={{ fontSize: '0.75rem', marginTop: '1rem', textAlign: 'center' }}>
              *Identitas KTP/SIM asli wajib dititipkan di toko saat pengambilan alat.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
