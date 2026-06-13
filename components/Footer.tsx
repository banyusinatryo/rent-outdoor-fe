import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--color-border)', padding: 'var(--space-lg) 0', marginTop: 'var(--space-xl)', background: 'radial-gradient(ellipse at bottom, rgba(0, 229, 255, 0.05) 0%, var(--color-bg) 100%)', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '-1px', left: 0, width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)' }} />
      <div className="container grid grid-cols-4 gap-lg" style={{ position: 'relative', zIndex: 1 }}>
        <div>
          <h3 className="text-gradient-primary" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Nexus Outdoor.</h3>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>
            Platform penyewaan alat outdoor terpercaya dengan sistem keamanan penitipan identitas. Temukan gear kemah premium dari toko kami.
          </p>
        </div>
        
        <div>
          <h4 style={{ marginBottom: '1rem', color: '#fff' }}>Jelajahi</h4>
          <div className="flex flex-col gap-sm" style={{ fontSize: '0.9rem' }}>
            <Link href="/katalog" className="text-muted">Katalog Alat</Link>
            <Link href="/kategori/tenda" className="text-muted">Tenda & Shelter</Link>
            <Link href="/kategori/carrier" className="text-muted">Tas Carrier</Link>
            <Link href="/kategori/sepatu" className="text-muted">Sepatu Trekking</Link>
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: '1rem', color: '#fff' }}>Informasi</h4>
          <div className="flex flex-col gap-sm" style={{ fontSize: '0.9rem' }}>
            <Link href="/cara-kerja" className="text-muted">Cara Kerja</Link>
            <Link href="/syarat" className="text-muted">Syarat & Ketentuan</Link>
            <Link href="/privasi" className="text-muted">Kebijakan Privasi</Link>
            <Link href="/faq" className="text-muted">FAQ</Link>
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: '1rem', color: '#fff' }}>Alamat Toko</h4>
          <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
            Jl. Pendaki Gunung No. 123, Bandung, Jawa Barat.
          </p>
          <Link href="/katalog" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            Lihat Katalog
          </Link>
        </div>
      </div>
      
      <div className="container text-center text-muted" style={{ marginTop: 'var(--space-lg)', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--color-border)', fontSize: '0.85rem' }}>
        &copy; {new Date().getFullYear()} Nexus Outdoor. All rights reserved.
      </div>
    </footer>
  );
}
