"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { mockProducts } from '@/data/mockProducts';

export default function CheckoutPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const id = params?.id as string;
  const product = mockProducts.find(p => p.id === id);
  
  const startParam = searchParams?.get('start');
  const endParam = searchParams?.get('end');
  
  const [name, setName] = useState('');
  const [wa, setWa] = useState('');
  const [days, setDays] = useState(0);
  
  useEffect(() => {
    if (startParam && endParam) {
      const start = new Date(startParam);
      const end = new Date(endParam);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setDays(diffDays > 0 ? diffDays : 0);
    }
  }, [startParam, endParam]);

  if (!product || !startParam || !endParam) {
    return (
      <div className="container" style={{ paddingTop: '150px', textAlign: 'center' }}>
        <h2>Pesanan Tidak Valid</h2>
        <Link href="/katalog" className="text-gradient-primary">Kembali ke Katalog</Link>
      </div>
    );
  }

  const rentalTotal = days * product.pricePerDay;
  const grandTotal = rentalTotal + product.securityDeposit;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !wa) {
      alert('Mohon lengkapi data diri');
      return;
    }
    router.push(`/payment/${id}?start=${startParam}&end=${endParam}`);
  };

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: 'var(--space-xl)' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Checkout</h1>
        <p className="text-muted">Selesaikan pesanan Anda dengan mengisi detail di bawah ini.</p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '1.5fr 1fr', gap: 'var(--space-xl)' }}>
        {/* Formulir Data Diri */}
        <div>
          <form onSubmit={handlePayment} className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
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
                type="text" 
                value={wa}
                onChange={(e) => setWa(e.target.value)}
                placeholder="Contoh: 081234567890"
                required
                style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
              />
            </div>

            <h3 style={{ marginTop: '2rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>Metode Pengambilan</h3>
            
            <div style={{ background: 'var(--color-bg)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-primary)' }}>
              <div className="flex items-center gap-sm">
                <span style={{ fontSize: '1.5rem' }}>📍</span>
                <div>
                  <h4 style={{ marginBottom: '0.2rem' }}>Ambil di Toko Vendor</h4>
                  <p className="text-muted" style={{ fontSize: '0.85rem' }}>Penyewa datang langsung ke alamat <strong>{product.vendor.name}</strong>.</p>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '2rem', fontSize: '1.1rem' }}>
              Lanjut ke Pembayaran
            </button>
          </form>
        </div>

        {/* Ringkasan Pesanan */}
        <div>
          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', position: 'sticky', top: '100px' }}>
            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>Ringkasan Pesanan</h3>
            
            <div className="flex gap-sm" style={{ marginBottom: '1.5rem' }}>
              <div style={{ position: 'relative', width: '80px', height: '80px', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                <Image src={product.image} alt={product.name} fill unoptimized style={{ objectFit: 'cover' }} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>{product.name}</h4>
                <p className="text-muted" style={{ fontSize: '0.85rem' }}>Vendor: {product.vendor.name}</p>
              </div>
            </div>

            <div style={{ background: 'var(--color-bg)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
              <div className="flex justify-between" style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                <span className="text-muted">Tanggal Ambil</span>
                <span>{startParam}</span>
              </div>
              <div className="flex justify-between" style={{ fontSize: '0.9rem' }}>
                <span className="text-muted">Tanggal Kembali</span>
                <span>{endParam}</span>
              </div>
            </div>

            <div className="flex justify-between" style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <span className="text-muted">Biaya Sewa ({days} Hari)</span>
              <span>Rp {rentalTotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between" style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
              <span className="text-muted">Uang Jaminan (Escrow)</span>
              <span>Rp {product.securityDeposit.toLocaleString('id-ID')}</span>
            </div>
            
            <div className="flex justify-between" style={{ fontWeight: 700, fontSize: '1.2rem', borderTop: '1px dashed var(--color-border)', paddingTop: '1rem' }}>
              <span>Total Bayar</span>
              <span className="text-gradient-primary">Rp {grandTotal.toLocaleString('id-ID')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
