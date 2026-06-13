"use client";

import Link from 'next/link';

export default function Register() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Pendaftaran berhasil!");
  };

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: 'var(--space-xl)', display: 'flex', justifyContent: 'center' }}>
      <div className="glass animate-fade-in" style={{ width: '100%', maxWidth: '450px', padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
        <div className="text-center" style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Daftar Akun Baru</h1>
          <p className="text-muted">Mulai petualangan Anda bersama Nexus Outdoor.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-sm">
          <div className="flex flex-col gap-xs">
            <label className="text-muted" style={{ fontSize: '0.9rem' }}>Nama Lengkap</label>
            <input required type="text" placeholder="John Doe" style={{ padding: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: '#fff' }} />
          </div>
          <div className="flex flex-col gap-xs">
            <label className="text-muted" style={{ fontSize: '0.9rem' }}>Email</label>
            <input required type="email" placeholder="email@contoh.com" style={{ padding: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: '#fff' }} />
          </div>
          <div className="flex flex-col gap-xs" style={{ marginBottom: '1rem' }}>
            <label className="text-muted" style={{ fontSize: '0.9rem' }}>Password</label>
            <input required type="password" placeholder="••••••••" style={{ padding: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: '#fff' }} />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem', fontSize: '1rem' }}>
            Buat Akun
          </button>
        </form>

        <div className="text-center" style={{ marginTop: '2rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
          <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
            Sudah punya akun? <Link href="/login" className="text-gradient-primary" style={{ fontWeight: 600 }}>Login di sini</Link>
          </p>
          <div style={{ background: 'var(--color-bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
            <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>Punya toko / barang yang mau disewakan?</p>
            <Link href="/vendor" style={{ color: '#4ade80', fontWeight: 600, fontSize: '0.9rem' }}>Gabung jadi Mitra Vendor &rarr;</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
