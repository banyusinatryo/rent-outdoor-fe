import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--color-border)', padding: 'var(--space-lg) 0', marginTop: 'var(--space-xl)', background: 'var(--color-bg-secondary)' }}>
      <div className="container grid grid-cols-4 gap-lg">
        <div>
          <h3 className="text-gradient-primary" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Nexus Outdoor.</h3>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>
            Platform marketplace penyewaan alat outdoor terpercaya dengan sistem Escrow yang aman. Temukan gear kemah premium atau sewakan gear Anda.
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
            <Link href="/cara-kerja" className="text-muted">Cara Kerja (Escrow)</Link>
            <Link href="/syarat" className="text-muted">Syarat & Ketentuan</Link>
            <Link href="/privasi" className="text-muted">Kebijakan Privasi</Link>
            <Link href="/faq" className="text-muted">FAQ</Link>
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: '1rem', color: '#fff' }}>Mulai Menghasilkan</h4>
          <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
            Punya alat gunung yang menganggur? Jadilah Vendor dan raih pendapatan tambahan.
          </p>
          <Link href="/vendor/register" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            Daftar Jadi Vendor
          </Link>
        </div>
      </div>
      
      <div className="container text-center text-muted" style={{ marginTop: 'var(--space-lg)', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--color-border)', fontSize: '0.85rem' }}>
        &copy; {new Date().getFullYear()} Nexus Outdoor. All rights reserved.
      </div>
    </footer>
  );
}
