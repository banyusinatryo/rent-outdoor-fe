import Link from 'next/link';

export default function Navbar() {
  return (
    <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, padding: '1rem 0' }} className="glass animate-fade-in">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }} className="text-gradient-primary">
            PeakRent.
          </span>
        </Link>

        <div className="flex items-center gap-md" style={{ fontWeight: 500 }}>
          <Link href="/katalog" className="text-muted" style={{ transition: 'color 0.2s' }}>Katalog</Link>
          <Link href="/cara-kerja" className="text-muted" style={{ transition: 'color 0.2s' }}>Cara Kerja</Link>
          <Link href="/tentang" className="text-muted" style={{ transition: 'color 0.2s' }}>Tentang</Link>
        </div>

        <div className="flex items-center gap-sm">
          <Link href="/login" className="btn btn-outline" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
            Log In
          </Link>
          <Link href="/register" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
            Mulai Sewa
          </Link>
        </div>
      </div>
    </nav>
  );
}
