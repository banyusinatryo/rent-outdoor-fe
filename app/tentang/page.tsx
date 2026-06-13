"use client";

import { motion } from "framer-motion";
import { Mountain, Users, Leaf, HeartHandshake } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Tentang() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const stats = [
    { value: "10k+", label: "Transaksi Berhasil", color: "var(--color-primary)", borderColor: "rgba(0, 229, 255, 0.4)", bgGlow: "rgba(0, 229, 255, 0.06)", offsetY: -8 },
    { value: "500+", label: "Pelanggan Aktif", color: "var(--color-accent)", borderColor: "rgba(255, 85, 0, 0.4)", bgGlow: "rgba(255, 85, 0, 0.06)", offsetY: 12 },
    { value: "100%", label: "Barang Terawat", color: "#4ade80", borderColor: "rgba(74, 222, 128, 0.4)", bgGlow: "rgba(74, 222, 128, 0.06)", offsetY: -4 },
    { value: "24/7", label: "Dukungan Tim", color: "#ffffff", borderColor: "rgba(255, 255, 255, 0.25)", bgGlow: "rgba(255, 255, 255, 0.04)", offsetY: 8 },
  ];

  const values = [
    {
      icon: <Leaf size={32} />,
      iconColor: "#4ade80",
      iconBg: "rgba(74, 222, 128, 0.1)",
      borderTop: "linear-gradient(90deg, transparent, #4ade80, transparent)",
      title: "Peduli Lingkungan",
      description: "Menyewa perlengkapan berarti mengurangi produksi limbah baru. Satu tenda yang dirawat dengan baik bisa menemani puluhan perjalanan berbeda tanpa membebani alam.",
      offsetY: -20,
    },
    {
      icon: <HeartHandshake size={32} />,
      iconColor: "var(--color-primary)",
      iconBg: "rgba(0, 229, 255, 0.1)",
      borderTop: "linear-gradient(90deg, transparent, var(--color-primary), transparent)",
      title: "Keamanan Terjamin",
      description: "Sistem jaminan identitas kami rancang agar semua pihak merasa tenang. Alat toko tetap aman, dan Anda bisa menikmati petualangan tanpa rasa khawatir.",
      offsetY: 0,
    },
    {
      icon: <Mountain size={32} />,
      iconColor: "var(--color-accent)",
      iconBg: "rgba(255, 85, 0, 0.1)",
      borderTop: "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
      title: "Eksplorasi Tanpa Batas",
      description: "Biaya tidak boleh jadi halangan untuk menikmati alam. Kami hadir agar siapa pun bisa merasakan syahdunya tidur di bawah taburan bintang di puncak gunung.",
      offsetY: -20,
    },
  ];

  return (
    <div style={{ paddingTop: "100px", paddingBottom: "var(--space-xl)", position: "relative", overflow: "hidden", minHeight: "100vh" }}>
      {/* ── Deep Background ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: -3, background: "var(--color-bg)" }} />

      {/* ── Animated Neon Blobs ── */}
      <div
        className="animate-blob"
        style={{
          position: "absolute",
          top: "-15%",
          right: "-8%",
          width: "700px",
          height: "700px",
          background: "radial-gradient(circle, rgba(0, 229, 255, 0.12) 0%, transparent 65%)",
          zIndex: -1,
          borderRadius: "50%",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />
      <div
        className="animate-blob"
        style={{
          position: "absolute",
          top: "40%",
          left: "-12%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(255, 85, 0, 0.1) 0%, transparent 65%)",
          zIndex: -1,
          borderRadius: "50%",
          filter: "blur(90px)",
          pointerEvents: "none",
          animationDelay: "2s",
        }}
      />
      <div
        className="animate-blob"
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "20%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, transparent 65%)",
          zIndex: -1,
          borderRadius: "50%",
          filter: "blur(80px)",
          pointerEvents: "none",
          animationDelay: "4s",
        }}
      />

      <div className="container">
        {/* ═══════════════════════════════════════════
            HERO — Asymmetrical Split Layout
        ═══════════════════════════════════════════ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: "4rem",
            alignItems: "center",
            marginBottom: "8rem",
          }}
        >
          {/* LEFT — Copy */}
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} style={{ display: "inline-flex", marginBottom: "1.2rem" }}>
              <span
                style={{
                  padding: "0.45rem 1.2rem",
                  background: "rgba(0, 229, 255, 0.08)",
                  color: "var(--color-primary)",
                  borderRadius: "var(--radius-full)",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  border: "1px solid rgba(0, 229, 255, 0.2)",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                Tentang Kami
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              style={{
                fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
                letterSpacing: "-1.5px",
                marginBottom: "1.8rem",
                lineHeight: 1.08,
                fontWeight: 800,
              }}
            >
              Mendemokratisasi
              <br />
              Akses ke{" "}
              <span className="text-gradient-primary">Alam Bebas.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-muted"
              style={{ fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: "480px" }}
            >
              Di Nexus Outdoor, kami percaya bahwa setiap orang berhak menikmati keindahan alam
              tanpa harus terhalang oleh mahalnya harga peralatan gunung. Kami hadir untuk
              menyediakan perlengkapan berkualitas tinggi yang disewakan dengan proses yang aman
              dan mudah.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <Link href="/katalog">
                <button
                  className="btn btn-primary"
                  style={{
                    padding: "0.9rem 2.4rem",
                    fontSize: "1rem",
                    fontWeight: 600,
                    boxShadow: "0 0 30px rgba(0, 229, 255, 0.2), 0 0 60px rgba(0, 229, 255, 0.08)",
                  }}
                >
                  Mulai Bertualang
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT — Overlapping Glass Image Cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ position: "relative", height: "540px" }}
          >
            {/* Large Card — slightly rotated */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                width: "420px",
                height: "480px",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                transform: "rotate(3deg)",
                border: "1px solid rgba(0, 229, 255, 0.15)",
                boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 229, 255, 0.08)",
                background: "var(--color-bg-glass)",
                backdropFilter: "blur(16px)",
                zIndex: 2,
              }}
            >
              <div style={{ padding: "10px", height: "100%" }}>
                <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "calc(var(--radius-lg) - 6px)", overflow: "hidden" }}>
                  <Image
                    src="/images/gunung-terindah-di-indonesia-7.jpg"
                    alt="Hikers on mountain trail"
                    fill
                    unoptimized
                    style={{ objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(160deg, rgba(0, 229, 255, 0.08) 0%, transparent 40%, rgba(255, 85, 0, 0.06) 100%)",
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Small Card — overlapping at different angle */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                bottom: "20px",
                left: "0",
                width: "280px",
                height: "320px",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                transform: "rotate(-5deg)",
                border: "1px solid rgba(255, 85, 0, 0.2)",
                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 35px rgba(255, 85, 0, 0.08)",
                background: "var(--color-bg-glass)",
                backdropFilter: "blur(16px)",
                zIndex: 3,
              }}
            >
              <div style={{ padding: "8px", height: "100%" }}>
                <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "calc(var(--radius-lg) - 4px)", overflow: "hidden" }}>
                  <Image
                    src="/images/IMG_4440.jpg"
                    alt="Mountain adventure"
                    fill
                    unoptimized
                    style={{ objectFit: "cover", objectPosition: "center 30%" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(200deg, rgba(255, 85, 0, 0.1) 0%, transparent 50%)",
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Decorative floating glow dot */}
            <motion.div
              animate={{ y: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                top: "40%",
                left: "30%",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--color-primary)",
                boxShadow: "0 0 20px var(--color-primary), 0 0 40px rgba(0, 229, 255, 0.3)",
                zIndex: 4,
              }}
            />
          </motion.div>
        </div>

        {/* ═══════════════════════════════════════════
            VALUES — Offset Grid
        ═══════════════════════════════════════════ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          style={{ marginBottom: "8rem" }}
        >
          <motion.h2
            variants={fadeInUp}
            style={{
              fontSize: "clamp(2rem, 3vw, 2.8rem)",
              marginBottom: "3.5rem",
              textAlign: "center",
              fontWeight: 700,
              letterSpacing: "-0.5px",
            }}
          >
            Nilai{" "}
            <span className="text-muted">Inti Kami</span>
          </motion.h2>

          <div className="grid grid-cols-3 gap-md">
            {values.map((item, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                className="hover-lift"
                style={{
                  position: "relative",
                  transform: `translateY(${item.offsetY}px)`,
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                }}
              >
                {/* Glowing top border */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: item.borderTop,
                    zIndex: 2,
                  }}
                />
                {/* Subtle top glow */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "10%",
                    right: "10%",
                    height: "60px",
                    background: item.borderTop,
                    opacity: 0.08,
                    filter: "blur(20px)",
                    zIndex: 1,
                  }}
                />

                <div
                  className="glass"
                  style={{
                    padding: "2.8rem 2rem",
                    borderRadius: "var(--radius-lg)",
                    textAlign: "center",
                    height: "100%",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                  }}
                >
                  <div
                    style={{
                      width: "72px",
                      height: "72px",
                      margin: "0 auto 1.5rem",
                      background: item.iconBg,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: item.iconColor,
                      boxShadow: `0 0 25px ${item.iconBg}`,
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", fontWeight: 700, letterSpacing: "-0.3px" }}>
                    {item.title}
                  </h3>
                  <p className="text-muted" style={{ lineHeight: 1.7, fontSize: "0.95rem" }}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════
            STATS — Floating Glass Pills
        ═══════════════════════════════════════════ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  transform: `translateY(${stat.offsetY}px)`,
                  background: stat.bgGlow,
                  backdropFilter: "blur(16px)",
                  border: `1px solid ${stat.borderColor}`,
                  borderRadius: "var(--radius-lg)",
                  padding: "2rem 2.5rem",
                  textAlign: "center",
                  minWidth: "200px",
                  boxShadow: `0 0 30px ${stat.bgGlow}, 0 8px 32px rgba(0, 0, 0, 0.3)`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Inner glow */}
                <div
                  style={{
                    position: "absolute",
                    top: "-50%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "100px",
                    height: "100px",
                    background: stat.borderColor,
                    borderRadius: "50%",
                    filter: "blur(40px)",
                    opacity: 0.15,
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    fontSize: "2.8rem",
                    fontWeight: 800,
                    color: stat.color,
                    marginBottom: "0.4rem",
                    lineHeight: 1,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-muted"
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
