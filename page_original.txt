"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tent, Backpack, Compass, ShieldCheck, Banknote, MapPin } from "lucide-react";

export default function Home() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <>
      {/* Animated Background Blobs */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div className="animate-blob" style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255,107,53,0.15) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%', filter: 'blur(40px)' }} />
        <div className="animate-blob animation-delay-2000" style={{ position: 'absolute', top: '40%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(46,139,87,0.1) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%', filter: 'blur(60px)' }} />
        <div className="animate-blob animation-delay-4000" style={{ position: 'absolute', bottom: '-20%', left: '20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255,179,71,0.1) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%', filter: 'blur(40px)' }} />
      </div>

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
          zIndex: 1
        }}>
          <Image 
            src="/images/hero_camping.png" 
            alt="Camping in the mountains at twilight" 
            fill
            priority
            unoptimized
            style={{ objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.5)' }}
          />
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(to bottom, rgba(15,17,16,0.2) 0%, var(--color-bg) 100%)'
          }} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            style={{ maxWidth: '800px' }}
          >
            <motion.span variants={fadeInUp} style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem', 
              background: 'rgba(255,107,53,0.15)', 
              color: 'var(--color-primary)', 
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              fontSize: '0.9rem',
              marginBottom: '1.5rem',
              border: '1px solid var(--color-border-glow)'
            }}>
              <ShieldCheck size={16} /> Penyewaan Alat Gunung #1 dengan Escrow Aman
            </motion.span>
            
            <motion.h1 variants={fadeInUp} style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
              Petualangan Hebat <br />Mulai dari <span className="text-gradient-primary">Sini.</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-muted" style={{ fontSize: '1.25rem', marginBottom: '2.5rem', maxWidth: '600px', lineHeight: 1.6 }}>
              Temukan tenda, carrier, dan gear premium dari vendor terpercaya. Transaksi dijamin aman 100% dengan uang jaminan otomatis kembali.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex gap-sm">
              <Link href="/katalog">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
                  Eksplor Katalog
                </motion.button>
              </Link>
              <Link href="/cara-kerja">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn glass" style={{ padding: '1rem 2rem', fontSize: '1.1rem', color: '#fff' }}>
                  Pelajari Escrow
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED CATEGORIES & GEAR */}
      <section className="container" style={{ padding: 'var(--space-xl) var(--space-sm)' }}>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="flex items-center justify-between" style={{ marginBottom: 'var(--space-md)' }}
        >
          <h2 style={{ fontSize: '2.5rem' }}>Gear <span className="text-muted">Terpopuler</span></h2>
          <Link href="/katalog" className="text-gradient-primary" style={{ fontWeight: 600 }}>Lihat Semua &rarr;</Link>
        </motion.div>

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-3 gap-md"
        >
          {/* Card 1 */}
          <motion.div variants={fadeInUp} className="glass hover-lift" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', transition: 'transform 0.3s', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ position: 'relative', height: '250px' }}>
              <Image src="/images/gear_tent.png" alt="Tenda Premium 4-Season" fill unoptimized style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--color-bg-glass)', padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)', backdropFilter: 'blur(12px)', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Tent size={14} /> Tenda
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
                <Link href="/katalog">
                  <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', borderRadius: 'var(--radius-full)' }}>Sewa</button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={fadeInUp} className="glass hover-lift" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', transition: 'transform 0.3s', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ position: 'relative', height: '250px' }}>
              <Image src="/images/gear_backpack.png" alt="Carrier 60L Professional" fill unoptimized style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--color-bg-glass)', padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)', backdropFilter: 'blur(12px)', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Backpack size={14} /> Carrier
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
                <Link href="/katalog">
                  <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', borderRadius: 'var(--radius-full)' }}>Sewa</button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={fadeInUp} className="glass flex flex-col items-center justify-center text-center hover-lift" style={{ borderRadius: 'var(--radius-md)', padding: '2rem', border: '1px dashed var(--color-primary)' }}>
            <div style={{ width: '80px', height: '80px', background: 'rgba(255,107,53,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
              <Compass size={40} />
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Temukan Lebih Banyak</h3>
            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>Ratusan perlengkapan hiking & kemah siap menemani perjalanan Anda.</p>
            <Link href="/katalog" style={{ width: '100%' }}>
              <button className="btn btn-primary" style={{ width: '100%' }}>Eksplor Katalog</button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* HOW IT WORKS / ESCROW */}
      <section style={{ position: 'relative', padding: 'var(--space-xl) 0', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--color-bg-secondary)', zIndex: 0 }} />
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center" style={{ marginBottom: 'var(--space-lg)' }}
          >
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Sistem Aman & <span className="text-gradient-primary">Terpercaya</span></h2>
            <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
              Infrastruktur transaksi kami dirancang dengan sistem Escrow otomatis. Dana ditahan dengan aman hingga alat kembali dalam kondisi utuh.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-3 gap-md"
          >
            <motion.div variants={fadeInUp} className="glass text-center hover-lift" style={{ padding: '3rem 2rem', borderRadius: 'var(--radius-md)', borderTop: '4px solid var(--color-primary)' }}>
              <div style={{ width: '80px', height: '80px', margin: '0 auto 1.5rem', background: 'rgba(255,107,53,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                <ShieldCheck size={40} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>1. Booking & Bayar Jaminan</h3>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>
                Penyewa membayar biaya sewa beserta Uang Jaminan (Security Deposit). Dana disimpan secara aman di rekening platform (Escrow).
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="glass text-center hover-lift" style={{ padding: '3rem 2rem', borderRadius: 'var(--radius-md)', borderTop: '4px solid var(--color-accent)' }}>
              <div style={{ width: '80px', height: '80px', margin: '0 auto 1.5rem', background: 'rgba(46,139,87,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)' }}>
                <MapPin size={40} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>2. Ambil Alat & Bertualang</h3>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>
                Ambil alat langsung di lokasi vendor. Status berubah otomatis dan alat dikunci di kalender untuk tanggal tersebut.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="glass text-center hover-lift" style={{ padding: '3rem 2rem', borderRadius: 'var(--radius-md)', borderTop: '4px solid #4ade80' }}>
              <div style={{ width: '80px', height: '80px', margin: '0 auto 1.5rem', background: 'rgba(74,222,128,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80' }}>
                <Banknote size={40} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>3. Alat Kembali, Dana Cair</h3>
              <p className="text-muted" style={{ fontSize: '0.95rem' }}>
                Setelah alat dikembalikan tanpa kerusakan, Uang Jaminan 100% dikembalikan. Pendapatan Vendor masuk ke Wallet Balance.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
