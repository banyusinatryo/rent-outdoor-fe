"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { mockProducts } from '@/data/mockProducts';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const product = mockProducts.find(p => p.id === id);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [days, setDays] = useState(0);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Termasuk hari H
      if (diffDays > 0) {
        setDays(diffDays);
      } else {
        setDays(0);
      }
    } else {
      setDays(0);
    }
  }, [startDate, endDate]);

  if (!product) {
    return (
      <div className="container" style={{ paddingTop: '150px', textAlign: 'center' }}>
        <h2>Produk Tidak Ditemukan</h2>
        <Link href="/katalog" className="text-gradient-primary">Kembali ke Katalog</Link>
      </div>
    );
  }

  const rentalTotal = days * product.pricePerDay;
  const grandTotal = rentalTotal;

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: 'var(--space-xl)' }}>
      {/* Breadcrumb */}
      <div className="text-muted" style={{ marginBottom: 'var(--space-md)', fontSize: '0.9rem' }}>
        <Link href="/">Beranda</Link> &rsaquo; <Link href="/katalog">Katalog</Link> &rsaquo; <span style={{ color: 'var(--color-text)' }}>{product.name}</span>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1.2fr 1fr', gap: 'var(--space-xl)' }}>
        {/* Left Col - Product Info */}
        <div>
          <div className="glass" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', height: '400px', position: 'relative', marginBottom: 'var(--space-md)' }}>
            <Image src={product.image} alt={product.name} fill unoptimized style={{ objectFit: 'cover' }} />
          </div>

          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{product.name}</h1>
          <div className="flex items-center gap-sm" style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ background: 'var(--color-bg-glass)', padding: '0.2rem 0.8rem', borderRadius: 'var(--radius-full)', fontSize: '0.85rem' }}>
              {product.category}
            </div>
            <div className="flex items-center gap-xs">
              <span style={{ color: '#4ade80', fontSize: '0.8rem' }}>✓ Tersedia di Toko</span>
            </div>
          </div>

          <h3 style={{ marginBottom: '1rem' }}>Deskripsi Barang</h3>
          <p className="text-muted" style={{ lineHeight: 1.7, marginBottom: '2rem' }}>
            {product.description}
          </p>

          <h3 style={{ marginBottom: '1rem' }}>Fitur Utama</h3>
          <ul className="text-muted" style={{ paddingLeft: '1.5rem', lineHeight: 1.7 }}>
            {product.features.map((feature, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>{feature}</li>
            ))}
          </ul>
        </div>

        {/* Right Col - Booking Widget */}
        <div>
          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', position: 'sticky', top: '100px' }}>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
              Rp {product.pricePerDay.toLocaleString('id-ID')} <span className="text-muted" style={{ fontSize: '1rem', fontWeight: 400 }}>/ hari</span>
            </h2>
            <div className="flex items-center gap-xs" style={{ marginBottom: '2rem' }}>
              <span style={{ color: '#ffb347', fontSize: '1.2rem' }}>★</span>
              <span>Kondisi Prima</span>
            </div>

            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Pilih Tanggal Sewa</h3>
            <div className="grid grid-cols-2 gap-sm" style={{ marginBottom: '1.5rem' }}>
              <div>
                <label className="text-muted" style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Tanggal Ambil</label>
                <input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }} 
                />
              </div>
              <div>
                <label className="text-muted" style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Tanggal Kembali</label>
                <input 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }} 
                />
              </div>
            </div>

            {days > 0 && (
              <div className="animate-fade-in" style={{ background: 'var(--color-bg)', padding: '1.5rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid var(--color-border)' }}>
                <h4 style={{ marginBottom: '1rem', borderBottom: '1px dashed var(--color-border)', paddingBottom: '0.5rem' }}>Rincian Biaya</h4>
                <div className="flex justify-between" style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  <span className="text-muted">Biaya Sewa ({days} Hari)</span>
                  <span>Rp {rentalTotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between" style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
                  <span className="text-muted">Jaminan Identitas</span>
                  <span>KTP/SIM (Ditahan di toko)</span>
                </div>
                <div className="flex justify-between" style={{ fontWeight: 700, fontSize: '1.2rem', borderTop: '1px dashed var(--color-border)', paddingTop: '1rem' }}>
                  <span>Total Bayar</span>
                  <span className="text-gradient-primary">Rp {grandTotal.toLocaleString('id-ID')}</span>
                </div>
                <p className="text-muted" style={{ fontSize: '0.75rem', marginTop: '1rem', textAlign: 'center' }}>
                  *Identitas KTP/SIM asli wajib dititipkan di toko saat pengambilan alat.
                </p>
              </div>
            )}

            <button 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
              disabled={days === 0}
              onClick={() => router.push(`/checkout/${id}?start=${startDate}&end=${endDate}`)}
            >
              {days > 0 ? 'Lanjut Booking' : 'Pilih Tanggal Dulu'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
