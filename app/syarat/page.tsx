"use client";

import { motion } from "framer-motion";
import { ShieldCheck, BookOpen, AlertTriangle, RefreshCw, Calendar } from "lucide-react";
import Link from "next/link";

export default function SyaratPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const terms = [
    {
      icon: <ShieldCheck size={24} color="var(--color-primary)" />,
      title: "Jaminan Identitas Asli (Wajib)",
      content: "Penyewa wajib menitipkan sekurang-kurangnya satu identitas asli fisik yang sah (KTP / SIM / STNK asli) yang masih berlaku selama masa sewa berlangsung. Identitas harus atas nama penyewa yang melakukan registrasi di platform.",
    },
    {
      icon: <Calendar size={24} color="var(--color-accent)" />,
      title: "Batas Waktu & Pengambilan",
      content: "Pengambilan perlengkapan dapat dilakukan langsung di toko fisik Nexus Outdoor sesuai tanggal mulai sewa yang dipilih saat pemesanan. Pengambilan di luar jam operasional toko wajib dikonfirmasi terlebih dahulu.",
    },
    {
      icon: <AlertTriangle size={24} color="#f87171" />,
      title: "Kerusakan & Kehilangan",
      content: "Penyewa bertanggung jawab penuh atas keutuhan alat sewa. Jika terjadi kerusakan ringan/berat atau kehilangan barang, penyewa wajib mengganti biaya perbaikan atau mengganti dengan unit baru sejenis.",
    },
    {
      icon: <RefreshCw size={24} color="#4ade80" />,
      title: "Pembatalan & Pengembalian",
      content: "Pembatalan pesanan yang dilakukan H-3 sebelum tanggal mulai sewa berhak mendapatkan refund DP sebesar 100%. Pembatalan yang dilakukan kurang dari H-1 tidak mendapatkan pengembalian uang muka.",
    },
  ];

  return (
    <div style={{ paddingTop: "100px", paddingBottom: "var(--space-xl)", position: "relative", overflow: "hidden", minHeight: "100vh" }}>
      {/* Ambient backgrounds */}
      <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)", filter: "blur(80px)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(255,85,0,0.06) 0%, transparent 70%)", filter: "blur(80px)", borderRadius: "50%", pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: "800px" }}>
        
        {/* Header */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          style={{ marginBottom: "3rem", textAlign: "center" }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 1rem", background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)", borderRadius: "var(--radius-full)", color: "var(--color-primary)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "1rem" }}>
            <BookOpen size={14} /> Aturan & Kebijakan sewa
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-1px", marginBottom: "0.5rem" }}>
            Syarat & <span className="text-gradient-primary">Ketentuan</span>
          </h1>
          <p className="text-muted" style={{ fontSize: "1.05rem" }}>
            Harap baca syarat dan ketentuan persewaan alat sewa di Nexus Outdoor dengan saksama.
          </p>
        </motion.div>

        {/* Content List */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "3rem" }}
        >
          {terms.map((term, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
              className="glass responsive-card"
              style={{
                padding: "2rem",
                borderRadius: "var(--radius-lg)",
                border: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                gap: "1.25rem",
                alignItems: "flex-start"
              }}
            >
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0
              }}>
                {term.icon}
              </div>
              <div>
                <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", fontWeight: 600 }}>{term.title}</h3>
                <p className="text-muted" style={{ lineHeight: 1.6, fontSize: "0.95rem" }}>{term.content}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="glass responsive-card"
          style={{
            padding: "2.5rem 2rem",
            borderRadius: "var(--radius-lg)",
            border: "1px solid rgba(0,229,255,0.15)",
            textAlign: "center"
          }}
        >
          <h3 style={{ marginBottom: "0.5rem" }}>Punya pertanyaan lain?</h3>
          <p className="text-muted" style={{ marginBottom: "1.5rem", fontSize: "0.95rem" }}>
            Silakan lihat halaman bantuan FAQ atau hubungi customer service kami.
          </p>
          <div className="flex gap-sm justify-center hero-buttons">
            <Link href="/faq" className="btn btn-outline" style={{ padding: "0.75rem 2rem" }}>
              Lihat FAQ
            </Link>
            <Link href="/katalog" className="btn btn-primary" style={{ padding: "0.75rem 2rem" }}>
              Mulai Sewa
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
