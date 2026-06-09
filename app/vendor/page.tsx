import Image from 'next/image';
import Link from 'next/link';

export default function VendorLanding() {
  return (
    <>
      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        height: '80vh', 
        display: 'flex', 
        alignItems: 'center',
        paddingTop: '60px',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: -1
        }}>
          <Image 
            src="/images/vendor_hero.png" 
            alt="Vendor Outdoor Shop" 
            fill
            priority
            unoptimized
            style={{ objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.5)' }}
          />
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(to right, rgba(15,17,16,0.9) 0%, rgba(15,17,16,0.4) 100%)'
          }} />
        </div>

        <div className="container animate-fade-in" style={{ zIndex: 10 }}>
          <div style={{ maxWidth: '600px' }}>
            <span style={{ 
              display: 'inline-block',
              padding: '0.4rem 1rem', 
              background: 'rgba(46,139,87,0.2)', 
              color: '#4ade80', 
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              fontSize: '0.9rem',
              marginBottom: '1.5rem',
              border: '1px solid rgba(74, 222, 128, 0.3)'
            }}>
              Program Kemitraan P2P
            </span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
              Ubah Alat Nganggur <br />Jadi <span style={{ color: '#4ade80' }}>Pendapatan.</span>
            </h1>
            <p className="text-muted" style={{ fontSize: '1.15rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              Bergabunglah dengan ratusan pemilik toko dan individu lainnya. Sewakan tenda, carrier, atau sepatu gunung Anda ke ribuan pendaki terverifikasi dengan jaminan 100% aman berkat sistem Escrow kami.
            </p>
            
            <div className="flex gap-sm">
              <Link href="/vendor/register" className="btn" style={{ background: '#4ade80', color: '#0f1110', padding: '1rem 2rem', fontSize: '1.1rem' }}>
                Mulai Berjualan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Skema Bisnis & Escrow */}
      <section className="container" style={{ padding: 'var(--space-xl) var(--space-sm)' }}>
        <div className="text-center" style={{ marginBottom: 'var(--space-lg)' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Skema yang Jelas & Menguntungkan</h2>
          <p className="text-muted" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Kami percaya pada transparansi. Anda mendapatkan akses ke ribuan pelanggan potensial, sistem pembayaran otomatis, dan keamanan alat tanpa perlu repot membangun website sendiri.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-lg" style={{ alignItems: 'center' }}>
          <div className="glass hover-lift" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid var(--color-primary)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>85%</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Pendapatan Bersih Anda</h3>
            <p className="text-muted">Dari setiap transaksi sukses, 85% dari harga sewa otomatis masuk ke Wallet Balance Anda yang bisa ditarik kapan saja.</p>
          </div>

          <div className="glass hover-lift" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem', color: 'var(--color-text-muted)' }}>15%</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Platform Fee</h3>
            <p className="text-muted">Potongan kecil untuk biaya server, promosi marketing, *payment gateway*, dan pengelolaan infrastruktur keamanan Escrow.</p>
          </div>
        </div>
      </section>

      {/* Keamanan Extra (KYC) */}
      <section style={{ background: 'var(--color-bg-secondary)', padding: 'var(--space-xl) 0' }}>
        <div className="container text-center">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Sistem Keamanan Ganda</h2>
          <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto 3rem auto', fontSize: '1.1rem' }}>
            Barang Anda adalah aset berharga. Kami melindunginya dengan Verifikasi Identitas (KYC) berlapis.
          </p>
          
          <div className="grid grid-cols-3 gap-md">
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🪪</div>
              <h4 style={{ marginBottom: '0.5rem' }}>Verifikasi KTP Wajib</h4>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>Penyewa tidak bisa melakukan booking sebelum mengunggah foto KTP asli dan swafoto. Data disimpan aman terenkripsi.</p>
            </div>
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💰</div>
              <h4 style={{ marginBottom: '0.5rem' }}>Uang Jaminan Otomatis</h4>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>Sistem menahan *Security Deposit* pelanggan. Jika barang Anda rusak atau hilang, uang jaminan otomatis menjadi milik Anda.</p>
            </div>
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</div>
              <h4 style={{ marginBottom: '0.5rem' }}>Sistem Rating Ketat</h4>
              <p className="text-muted" style={{ fontSize: '0.9rem' }}>Pelanggan dengan rekam jejak buruk akan diblokir dari platform. Anda selalu berhadapan dengan penyewa berkualitas.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
