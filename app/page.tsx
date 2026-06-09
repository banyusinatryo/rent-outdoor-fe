import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section style={{ 
        position: 'relative', 
        height: '100vh', 
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
            src="/images/hero_camping.png" 
            alt="Camping in the mountains at twilight" 
            fill
            priority
            unoptimized
            style={{ objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.6)' }}
          />
          {/* Gradient Overlay for text readability */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(to bottom, rgba(15,17,16,0.3) 0%, rgba(15,17,16,0.9) 100%)'
          }} />
        </div>

        <div className="container animate-fade-in" style={{ zIndex: 10 }}>
          <div style={{ maxWidth: '800px' }}>
            <span style={{ 
              display: 'inline-block',
              padding: '0.4rem 1rem', 
              background: 'rgba(255,107,53,0.15)', 
              color: 'var(--color-primary)', 
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              fontSize: '0.9rem',
              marginBottom: '1.5rem',
              border: '1px solid var(--color-border-glow)'
            }}>
              Penyewaan Alat Gunung #1 dengan Escrow Aman
            </span>
            <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
              Petualangan Hebat <br />Mulai dari <span className="text-gradient-primary">Sini.</span>
            </h1>
            <p className="text-muted" style={{ fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '600px', lineHeight: 1.6 }}>
              Temukan tenda, carrier, dan gear premium dari vendor terpercaya. Transaksi dijamin aman 100% dengan uang jaminan (Security Deposit) otomatis kembali.
            </p>
            
            <div className="flex gap-sm">
              <Link href="/katalog" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                Cari Alat Sekarang
              </Link>
              <Link href="/cara-kerja" className="btn glass" style={{ padding: '1rem 2rem', fontSize: '1.1rem', color: '#fff' }}>
                Pelajari Escrow
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES & GEAR */}
      <section className="container" style={{ padding: 'var(--space-xl) var(--space-sm)' }}>
        <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-md)' }}>
          <h2 style={{ fontSize: '2.5rem' }}>Gear <span className="text-muted">Terpopuler</span></h2>
          <Link href="/katalog" className="text-gradient-primary" style={{ fontWeight: 600 }}>Lihat Semua &rarr;</Link>
        </div>

        <div className="grid grid-cols-3 gap-md">
          {/* Card 1 */}
          <div className="glass hover-lift" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', transition: 'transform 0.3s' }}>
            <div style={{ position: 'relative', height: '250px' }}>
              <Image src="/images/gear_tent.png" alt="Tenda Premium 4-Season" fill unoptimized style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--color-bg-glass)', padding: '0.2rem 0.8rem', borderRadius: 'var(--radius-full)', backdropFilter: 'blur(8px)', fontSize: '0.85rem', fontWeight: 600 }}>
                Tenda
              </div>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Tenda Premium 4-Season</h3>
              <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Kapasitas 4 Orang, Anti Badai</p>
              <div className="flex items-center justify-between">
                <div>
                  <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>Rp 120.000</span>
                  <span className="text-muted" style={{ fontSize: '0.85rem' }}> /hari</span>
                </div>
                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Sewa</button>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass hover-lift" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', transition: 'transform 0.3s' }}>
            <div style={{ position: 'relative', height: '250px' }}>
              <Image src="/images/gear_backpack.png" alt="Carrier 60L Professional" fill unoptimized style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--color-bg-glass)', padding: '0.2rem 0.8rem', borderRadius: 'var(--radius-full)', backdropFilter: 'blur(8px)', fontSize: '0.85rem', fontWeight: 600 }}>
                Carrier
              </div>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Carrier 60L Professional</h3>
              <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Sistem Backsystem Ergonomis</p>
              <div className="flex items-center justify-between">
                <div>
                  <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>Rp 45.000</span>
                  <span className="text-muted" style={{ fontSize: '0.85rem' }}> /hari</span>
                </div>
                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Sewa</button>
              </div>
            </div>
          </div>

          {/* Card 3 (Text Placeholder for completeness) */}
          <div className="glass flex flex-col items-center justify-center text-center" style={{ borderRadius: 'var(--radius-md)', padding: '2rem', border: '1px dashed var(--color-border)' }}>
            <div style={{ width: '64px', height: '64px', background: 'rgba(255,107,53,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>⛺</span>
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Temukan Lebih Banyak</h3>
            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>Ratusan perlengkapan hiking & kemah siap menemani perjalanan Anda.</p>
            <Link href="/katalog" className="btn btn-outline" style={{ width: '100%' }}>Eksplor Katalog</Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS / ESCROW */}
      <section style={{ background: 'var(--color-bg-secondary)', padding: 'var(--space-xl) 0' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-lg)' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Sistem Aman & Terpercaya</h2>
            <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
              Infrastruktur transaksi kami dirancang dengan sistem Escrow otomatis. Dana ditahan dengan aman hingga alat kembali dalam kondisi utuh.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-md">
            <div className="glass text-center" style={{ padding: '2.5rem 2rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🔒</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>1. Booking & Bayar Jaminan</h3>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>
                Penyewa membayar biaya sewa beserta Uang Jaminan (Security Deposit). Dana disimpan secara aman di rekening platform (Escrow).
              </p>
            </div>
            <div className="glass text-center" style={{ padding: '2.5rem 2rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🏕️</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>2. Gunakan Alat & Bertualang</h3>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>
                Vendor menyerahkan alat kepada Penyewa. Status berubah otomatis dan alat dikunci di kalender untuk tanggal tersebut.
              </p>
            </div>
            <div className="glass text-center" style={{ padding: '2.5rem 2rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>💸</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>3. Alat Kembali, Dana Cair</h3>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>
                Setelah alat dikembalikan tanpa kerusakan, Uang Jaminan 100% dikembalikan. Pendapatan Vendor langsung masuk ke Wallet Balance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
