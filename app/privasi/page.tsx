"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Key, Eye, ClipboardList, Info } from "lucide-react";
import Link from "next/link";

export default function PrivasiPage() {
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

  const policies = [
    {
      icon: <Eye size={24} color="var(--color-primary)" />,
      title: "Data yang Kami Kumpulkan",
      content: "Kami mengumpulkan data pribadi berupa nama lengkap, alamat email, nomor telepon/WhatsApp, alamat rumah, serta informasi kontak darurat saat Anda membuat akun dan melakukan transaksi sewa.",
    },
    {
      icon: <Key size={24} color="var(--color-accent)" />,
      title: "Keamanan Dokumen Jaminan (KTP/SIM)",
      content: "Dokumen identitas fisik asli yang Anda titipkan di toko fisik kami disimpan di brankas khusus berkeamanan tinggi. Kami menjamin dokumen tersebut tidak akan dipindai (scan), difotokopi, disebarluaskan, atau disalahgunakan untuk keperluan lain.",
    },
    {
      icon: <ClipboardList size={24} color="#4ade80" />,
      title: "Penggunaan Informasi",
      content: "Data pribadi Anda digunakan untuk proses verifikasi booking sewa, menghubungi Anda terkait detail pengambilan/pengembalian barang, serta penyelesaian transaksi keuangan secara sah.",
    },
    {
      icon: <ShieldAlert size={24} color="#f87171" />,
      title: "Perlindungan & Hak Anda",
      content: "Nexus Outdoor berkomitmen penuh melindungi hak privasi data Anda. Anda berhak memperbarui informasi profil Anda kapan saja atau meminta penghapusan akun serta data pribadi setelah seluruh proses sewa Anda selesai sepenuhnya.",
    },
  ];

  return (
    <div style={{ paddingTop: "100px", paddingBottom: "var(--space-xl)", position: "relative", overflow: "hidden", minHeight: "100vh" }}>
      {/* Ambient background glows */}
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
            <Info size={14} /> Kebijakan Privasi Pengguna
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-1px", marginBottom: "0.5rem" }}>
            Kebijakan <span className="text-gradient-primary">Privasi</span>
          </h1>
          <p className="text-muted" style={{ fontSize: "1.05rem" }}>
            Bagaimana kami melindungi dan mengelola data pribadi Anda secara bertanggung jawab.
          </p>
        </motion.div>

        {/* Content List */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "3rem" }}
        >
          {policies.map((policy, index) => (
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
                {policy.icon}
              </div>
              <div>
                <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", fontWeight: 600 }}>{policy.title}</h3>
                <p className="text-muted" style={{ lineHeight: 1.6, fontSize: "0.95rem" }}>{policy.content}</p>
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
          <h3 style={{ marginBottom: "0.5rem" }}>Keamanan Anda Prioritas Kami</h3>
          <p className="text-muted" style={{ marginBottom: "1.5rem", fontSize: "0.95rem" }}>
            Kami selalu memperbarui sistem kami demi menjamin kerahasiaan identitas titipan sewa Anda.
          </p>
          <div className="flex gap-sm justify-center hero-buttons">
            <Link href="/syarat" className="btn btn-outline" style={{ padding: "0.75rem 2rem" }}>
              Aturan Sewa
            </Link>
            <Link href="/katalog" className="btn btn-primary" style={{ padding: "0.75rem 2rem" }}>
              Eksplor Katalog
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
