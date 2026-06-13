"use client";

import { motion } from "framer-motion";
import { Mountain, Users, Leaf, HeartHandshake } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Tentang() {
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
    <div style={{ paddingTop: '100px', paddingBottom: 'var(--space-xl)', position: 'relative', overflow: 'hidden' }}>
      {/* Background Effect */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -2, background: 'var(--color-bg)' }} />
      <div className="animate-blob" style={{ position: 'absolute', top: '-20%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(255,107,53,0.1) 0%, transparent 70%)', zIndex: -1, borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div className="animate-blob animation-delay-2000" style={{ position: 'absolute', bottom: '10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(46,139,87,0.1) 0%, transparent 70%)', zIndex: -1, borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div className="container">
        {/* Header Section */}
        <div className="grid md:grid-cols-2 gap-xl" style={{ alignItems: 'center', marginBottom: 'var(--space-xl)', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} style={{ display: 'inline-flex', marginBottom: '1rem' }}>
              <span style={{ padding: '0.4rem 1rem', background: 'rgba(255,107,53,0.1)', color: 'var(--color-primary)', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '0.9rem', border: '1px solid rgba(255,107,53,0.2)' }}>
                Tentang Kami
              </span>
            </motion.div>
            <motion.h1 variants={fadeInUp} style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', letterSpacing: '-1px', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Mendemokratisasi Akses ke <span className="text-gradient-primary">Alam Bebas.</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-muted" style={{ fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Di Nexus Outdoor, kami percaya bahwa setiap orang berhak menikmati keindahan alam tanpa harus terhalang oleh mahalnya harga peralatan gunung. Kami hadir untuk menghubungkan para petualang dengan pemilik alat lokal dalam sebuah ekosistem berbagi yang aman dan terpercaya.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex gap-sm">
              <Link href="/katalog">
                <button className="btn btn-primary" style={{ padding: '0.8rem 2rem' }}>Mulai Bertualang</button>
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} style={{ position: 'relative', height: '500px', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <Image 
              src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80" 
              alt="Hikers looking at mountains" 
              fill 
              unoptimized
              style={{ objectFit: 'cover' }} 
            />
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to right, rgba(15,17,16,0.8) 0%, transparent 50%)' }} />
          </motion.div>
        </div>

        {/* Nilai Inti */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          style={{ marginBottom: 'var(--space-xl)' }}
        >
          <motion.h2 variants={fadeInUp} className="text-center" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Nilai <span className="text-muted">Inti Kami</span></motion.h2>
          
          <div className="grid grid-cols-3 gap-md">
            <motion.div variants={fadeInUp} className="glass hover-lift" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
              <div style={{ width: '70px', height: '70px', margin: '0 auto 1.5rem', background: 'rgba(74,222,128,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80' }}>
                <Leaf size={32} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Keberlanjutan (Eco-Friendly)</h3>
              <p className="text-muted" style={{ lineHeight: 1.6 }}>Dengan menyewa daripada membeli, kita mengurangi limbah konsumsi dan jejak karbon. Satu tenda bisa membahagiakan puluhan orang berbeda.</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="glass hover-lift" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
              <div style={{ width: '70px', height: '70px', margin: '0 auto 1.5rem', background: 'rgba(255,107,53,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                <HeartHandshake size={32} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Kepercayaan Komunitas</h3>
              <p className="text-muted" style={{ lineHeight: 1.6 }}>Sistem Escrow kami dan ulasan transparan memastikan bahwa penyewa dan vendor lokal saling menghargai dan menjaga aset bersama.</p>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="glass hover-lift" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
              <div style={{ width: '70px', height: '70px', margin: '0 auto 1.5rem', background: 'rgba(46,139,87,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)' }}>
                <Mountain size={32} />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Semangat Eksplorasi</h3>
              <p className="text-muted" style={{ lineHeight: 1.6 }}>Kami meruntuhkan tembok biaya agar mahasiswa, pekerja, dan siapapun bisa merasakan tenangnya tidur di bawah taburan bintang di puncak gunung.</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Angka Statistik */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeInUp}
          className="glass"
          style={{ padding: '4rem 2rem', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}
        >
          <div className="grid grid-cols-4 gap-md text-center">
            <div>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>10k+</div>
              <div className="text-muted" style={{ fontSize: '1.1rem', fontWeight: 500 }}>Transaksi Berhasil</div>
            </div>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--color-accent)', marginBottom: '0.5rem' }}>500+</div>
              <div className="text-muted" style={{ fontSize: '1.1rem', fontWeight: 500 }}>Vendor Terverifikasi</div>
            </div>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: '#4ade80', marginBottom: '0.5rem' }}>0%</div>
              <div className="text-muted" style={{ fontSize: '1.1rem', fontWeight: 500 }}>Tingkat Penipuan (Escrow)</div>
            </div>
            <div>
              <div style={{ fontSize: '3rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>24/7</div>
              <div className="text-muted" style={{ fontSize: '1.1rem', fontWeight: 500 }}>Dukungan Tim</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
