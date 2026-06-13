"use client";

import Link from 'next/link';

export default function PaymentSuccessPage() {
  return (
    <div className="container animate-fade-in" style={{ paddingTop: '150px', paddingBottom: 'var(--space-xl)', textAlign: 'center', minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ 
        width: '100px', 
        height: '100px', 
        background: 'rgba(74, 222, 128, 0.2)', 
        borderRadius: '50%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        margin: '0 auto 2rem',
        border: '2px solid #4ade80'
      }}>
        <span style={{ fontSize: '3rem', color: '#4ade80' }}>✓</span>
      </div>
      
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Pembayaran Berhasil!</h1>
      <p className="text-muted" style={{ maxWidth: '500px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
        Pesanan Anda telah dikonfirmasi. 
        Silakan datang ke toko kami dengan membawa bukti pembayaran ini dan identitas asli (KTP/SIM) untuk pengambilan barang.
      </p>

      <div className="flex gap-sm justify-center">
        <Link href="/" className="btn" style={{ padding: '1rem 2rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', color: 'var(--color-text)' }}>
          Kembali ke Beranda
        </Link>
        <Link href="/katalog" className="btn btn-primary" style={{ padding: '1rem 2rem', borderRadius: 'var(--radius-sm)' }}>
          Sewa Alat Lain
        </Link>
      </div>
    </div>
  );
}
