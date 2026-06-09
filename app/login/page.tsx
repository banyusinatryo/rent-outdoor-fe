"use client";

import Link from 'next/link';

export default function Login() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Proses login akan segera diimplementasikan dengan Laravel Sanctum!");
  };

  return (
    <div className="container" style={{ paddingTop: '120px', paddingBottom: 'var(--space-xl)', display: 'flex', justifyContent: 'center' }}>
      <div className="glass animate-fade-in" style={{ width: '100%', maxWidth: '450px', padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
        <div className="text-center" style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Selamat Datang</h1>
          <p className="text-muted">Masuk ke akun PeakRent Anda.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-sm">
          <div className="flex flex-col gap-xs">
            <label className="text-muted" style={{ fontSize: '0.9rem' }}>Email</label>
            <input required type="email" placeholder="email@contoh.com" style={{ padding: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: '#fff' }} />
          </div>
          <div className="flex flex-col gap-xs" style={{ marginBottom: '1rem' }}>
            <div className="flex justify-between items-center">
              <label className="text-muted" style={{ fontSize: '0.9rem' }}>Password</label>
              <Link href="#" className="text-muted" style={{ fontSize: '0.8rem' }}>Lupa password?</Link>
            </div>
            <input required type="password" placeholder="••••••••" style={{ padding: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: '#fff' }} />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem', fontSize: '1rem' }}>
            Log In
          </button>
        </form>

        <div className="text-center" style={{ marginTop: '2rem' }}>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>
            Belum punya akun? <Link href="/register" className="text-gradient-primary" style={{ fontWeight: 600 }}>Daftar di sini</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
