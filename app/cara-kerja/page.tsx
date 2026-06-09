"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Banknote, MapPin, CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";

export default function CaraKerja() {
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
      <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(46,139,87,0.15) 0%, transparent 70%)', zIndex: -1, borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(255,107,53,0.1) 0%, transparent 70%)', zIndex: -1, borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div className="container">
        {/* Header Section */}
        <motion.div 
          initial="hidden" animate="visible" variants={staggerContainer}
          className="text-center" style={{ maxWidth: '800px', margin: '0 auto', marginBottom: 'var(--space-xl)' }}
        >
          <motion.div variants={fadeInUp} style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <span style={{ padding: '0.4rem 1rem', background: 'rgba(74,222,128,0.1)', color: '#4ade80', borderRadius: 'var(--radius-full)', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid rgba(74,222,128,0.2)' }}>
              <Lock size={16} /> Keamanan Transaksi 100%
            </span>
          </motion.div>
          <motion.h1 variants={fadeInUp} style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-1px', marginBottom: '1rem' }}>
            Bagaimana <span className="text-gradient-primary">PeakRent</span> Bekerja?
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-muted" style={{ fontSize: '1.2rem', lineHeight: 1.6 }}>
            Kami menggunakan sistem <strong>Escrow (Rekening Bersama)</strong> untuk memastikan penyewa mendapatkan alat yang sesuai, dan pemilik alat terhindar dari risiko kerusakan/kehilangan.
          </motion.p>
        </motion.div>

        {/* Step by Step Timeline */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
          {/* Step 1 */}
          <motion.div variants={fadeInUp} className="glass hover-lift" style={{ display: 'flex', gap: '2rem', padding: '2.5rem', borderRadius: 'var(--radius-lg)', alignItems: 'center', borderLeft: '4px solid var(--color-primary)' }}>
            <div style={{ flexShrink: 0, width: '80px', height: '80px', background: 'rgba(255,107,53,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
              <ShieldCheck size={40} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>1. Booking & Pembayaran (Escrow)</h3>
              <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: 1.6 }}>
                Penyewa memilih alat dan tanggal sewa. Saat membayar, uang yang ditransfer adalah <strong>Harga Sewa + Uang Jaminan</strong>. Dana ini tidak langsung diberikan ke pemilik alat, melainkan ditahan dengan aman oleh sistem PeakRent.
              </p>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div variants={fadeInUp} className="glass hover-lift" style={{ display: 'flex', gap: '2rem', padding: '2.5rem', borderRadius: 'var(--radius-lg)', alignItems: 'center', borderLeft: '4px solid var(--color-accent)' }}>
            <div style={{ flexShrink: 0, width: '80px', height: '80px', background: 'rgba(46,139,87,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)' }}>
              <MapPin size={40} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>2. Pengambilan & Pemakaian Alat</h3>
              <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: 1.6 }}>
                Penyewa mengambil alat di lokasi pemilik. Pemilik merasa tenang karena sistem sudah mengunci Uang Jaminan. Penyewa bisa bertualang dengan perlengkapan yang sudah dipesan.
              </p>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div variants={fadeInUp} className="glass hover-lift" style={{ display: 'flex', gap: '2rem', padding: '2.5rem', borderRadius: 'var(--radius-lg)', alignItems: 'center', borderLeft: '4px solid #4ade80' }}>
            <div style={{ flexShrink: 0, width: '80px', height: '80px', background: 'rgba(74,222,128,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80' }}>
              <Banknote size={40} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>3. Pengembalian & Pencairan Dana</h3>
              <p className="text-muted" style={{ fontSize: '1.05rem', lineHeight: 1.6 }}>
                Alat dikembalikan ke pemilik. Setelah pemilik memverifikasi bahwa alat tidak rusak/hilang, sistem memecah dana: Harga Sewa cair ke dompet pemilik, dan <strong>Uang Jaminan 100% kembali</strong> ke penyewa.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center" style={{ marginTop: 'var(--space-xl)' }}
        >
          <div className="glass" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', padding: '3rem', borderRadius: 'var(--radius-lg)', border: '1px dashed rgba(255,255,255,0.2)' }}>
            <CheckCircle2 size={48} color="#4ade80" style={{ marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Siap Untuk Memulai?</h2>
            <p className="text-muted" style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>Eksplorasi ribuan perlengkapan tanpa rasa khawatir.</p>
            <div className="flex gap-sm">
              <Link href="/katalog">
                <button className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Mulai Sewa Alat</button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
