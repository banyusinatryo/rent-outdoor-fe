"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Banknote, MapPin, CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";

export default function CaraKerja() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25 },
    },
  };

  return (
    <div style={{ paddingTop: "100px", paddingBottom: "var(--space-xl)", position: "relative", overflow: "hidden", minHeight: "100vh" }}>

      {/* ── Animated Neon Blobs ── */}
      <motion.div
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", top: "-8%", right: "-6%", width: "650px", height: "650px", background: "radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 }}
      />
      <motion.div
        animate={{ x: [0, -30, 25, 0], y: [0, 40, -20, 0], scale: [1, 1.1, 0.9, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", top: "35%", left: "-8%", width: "700px", height: "700px", background: "radial-gradient(circle, rgba(255,85,0,0.1) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(90px)", pointerEvents: "none", zIndex: 0 }}
      />
      <motion.div
        animate={{ x: [0, 20, -15, 0], y: [0, -25, 30, 0], scale: [1, 0.95, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", bottom: "5%", right: "15%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(70px)", pointerEvents: "none", zIndex: 0 }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>

        {/* ═══════════════════════════════════════════
            HEADER — Asymmetrical Split Layout
        ═══════════════════════════════════════════ */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid-zigzag"
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: "var(--space-lg)",
            alignItems: "center",
            marginBottom: "6rem",
          }}
        >
          {/* Left — Title + Badge */}
          <motion.div variants={fadeInLeft}>
            <motion.div
              variants={fadeInUp}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.45rem 1.1rem",
                background: "rgba(0,229,255,0.08)",
                border: "1px solid rgba(0,229,255,0.25)",
                borderRadius: "var(--radius-full)",
                color: "var(--color-primary)",
                fontWeight: 600,
                fontSize: "0.85rem",
                marginBottom: "1.5rem",
                boxShadow: "0 0 20px rgba(0,229,255,0.15)",
              }}
            >
              <Lock size={15} /> Keamanan Transaksi 100%
            </motion.div>

            <h1 style={{ fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)", letterSpacing: "-1.5px", lineHeight: 1.08, marginBottom: "1.2rem" }}>
              Bagaimana{" "}
              <span className="text-gradient-primary">Nexus Outdoor</span>{" "}
              Bekerja?
            </h1>

            <p className="text-muted" style={{ fontSize: "1.15rem", lineHeight: 1.7, maxWidth: "560px" }}>
              Kami menerapkan sistem <strong>Verifikasi &amp; Penahanan Identitas Asli</strong> untuk memastikan keamanan persewaan, menjaga kualitas perlengkapan, dan menjamin kelancaran petualangan Anda.
            </p>
          </motion.div>

          {/* Right — Decorative floating glass element */}
          <motion.div
            variants={fadeInRight}
            className="hide-on-mobile"
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="glass"
              style={{
                width: "220px",
                height: "220px",
                borderRadius: "var(--radius-lg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(0,229,255,0.2)",
                boxShadow: "0 0 40px rgba(0,229,255,0.12), inset 0 0 40px rgba(0,229,255,0.04)",
                position: "relative",
                transform: "rotate(-6deg)",
              }}
            >
              <motion.div
                animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 0.95, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Lock size={72} color="var(--color-primary)" strokeWidth={1.2} style={{ opacity: 0.7 }} />
              </motion.div>
              {/* Small orbiting dot */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
              >
                <div style={{ position: "absolute", top: "-6px", left: "50%", width: "12px", height: "12px", borderRadius: "50%", background: "var(--color-primary)", boxShadow: "0 0 15px var(--color-primary)", transform: "translateX(-50%)" }} />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ═══════════════════════════════════════════
            STEPS — Zigzag Layout
        ═══════════════════════════════════════════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5rem", marginBottom: "6rem" }}>

          {/* ── Step 1: Content Left, Glass Right ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid-zigzag"
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: "var(--space-lg)",
              alignItems: "center",
            }}
          >
            {/* Content */}
            <motion.div variants={fadeInLeft} style={{ position: "relative" }}>
              {/* Giant step number */}
              <span className="step-number-bg" style={{
                position: "absolute",
                top: "-40px",
                left: "-10px",
                fontSize: "10rem",
                fontWeight: 900,
                lineHeight: 1,
                color: "rgba(0,229,255,0.05)",
                pointerEvents: "none",
                userSelect: "none",
                letterSpacing: "-8px",
              }}>
                01
              </span>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "50%",
                    background: "rgba(0,229,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center",
                    border: "1px solid rgba(0,229,255,0.2)",
                  }}>
                    <ShieldCheck size={22} color="var(--color-primary)" />
                  </div>
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "2px" }}>
                    Langkah 01
                  </span>
                </div>
                <h3 style={{ fontSize: "1.8rem", marginBottom: "0.75rem", letterSpacing: "-0.5px" }}>
                  Booking &amp; Pembayaran
                </h3>
                <p className="text-muted" style={{ fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "480px" }}>
                  Penyewa memilih perlengkapan dan menentukan rentang tanggal sewa. Pembayaran (DP atau Lunas) dilakukan secara aman melalui platform kami untuk mengunci ketersediaan barang.
                </p>
              </div>
            </motion.div>

            {/* Decorative Glass Card */}
            <motion.div variants={fadeInRight} className="hide-on-mobile" style={{ display: "flex", justifyContent: "center" }}>
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="glass"
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "var(--radius-lg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(0,229,255,0.25)",
                  boxShadow: "0 0 35px rgba(0,229,255,0.15), 0 8px 32px rgba(0,0,0,0.3)",
                  transform: "rotate(4deg)",
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.12, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ShieldCheck size={64} color="var(--color-primary)" strokeWidth={1.3} style={{ opacity: 0.75 }} />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── Step 2: Glass Left, Content Right (ZIGZAG) ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid-zigzag"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr",
              gap: "var(--space-lg)",
              alignItems: "center",
            }}
          >
            {/* Decorative Glass Card — LEFT */}
            <motion.div variants={fadeInLeft} className="hide-on-mobile" style={{ display: "flex", justifyContent: "center" }}>
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="glass"
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "var(--radius-lg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(255,85,0,0.25)",
                  boxShadow: "0 0 35px rgba(255,85,0,0.12), 0 8px 32px rgba(0,0,0,0.3)",
                  transform: "rotate(-5deg)",
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, -6, 6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <MapPin size={64} color="var(--color-accent)" strokeWidth={1.3} style={{ opacity: 0.75 }} />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Content — RIGHT */}
            <motion.div variants={fadeInRight} style={{ position: "relative" }}>
              {/* Giant step number */}
              <span className="step-number-bg" style={{
                position: "absolute",
                top: "-40px",
                right: "-10px",
                fontSize: "10rem",
                fontWeight: 900,
                lineHeight: 1,
                color: "rgba(255,85,0,0.06)",
                pointerEvents: "none",
                userSelect: "none",
                letterSpacing: "-8px",
              }}>
                02
              </span>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "50%",
                    background: "rgba(255,85,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center",
                    border: "1px solid rgba(255,85,0,0.2)",
                  }}>
                    <MapPin size={22} color="var(--color-accent)" />
                  </div>
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "2px" }}>
                    Langkah 02
                  </span>
                </div>
                <h3 style={{ fontSize: "1.8rem", marginBottom: "0.75rem", letterSpacing: "-0.5px" }}>
                  Pengambilan &amp; Penahanan KTP
                </h3>
                <p className="text-muted" style={{ fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "480px" }}>
                  Ambil perlengkapan di toko fisik kami dengan menunjukkan bukti booking. Sebagai jaminan keamanan alat, kami akan <strong>menahan identitas asli Anda (KTP/SIM/STNK)</strong> selama masa sewa berlangsung.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Step 3: Content Left, Glass Right ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid-zigzag"
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: "var(--space-lg)",
              alignItems: "center",
            }}
          >
            {/* Content */}
            <motion.div variants={fadeInLeft} style={{ position: "relative" }}>
              {/* Giant step number */}
              <span className="step-number-bg" style={{
                position: "absolute",
                top: "-40px",
                left: "-10px",
                fontSize: "10rem",
                fontWeight: 900,
                lineHeight: 1,
                color: "rgba(74,222,128,0.05)",
                pointerEvents: "none",
                userSelect: "none",
                letterSpacing: "-8px",
              }}>
                03
              </span>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "50%",
                    background: "rgba(74,222,128,0.1)", display: "flex", alignItems: "center", justifyContent: "center",
                    border: "1px solid rgba(74,222,128,0.2)",
                  }}>
                    <Banknote size={22} color="#4ade80" />
                  </div>
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#4ade80", textTransform: "uppercase", letterSpacing: "2px" }}>
                    Langkah 03
                  </span>
                </div>
                <h3 style={{ fontSize: "1.8rem", marginBottom: "0.75rem", letterSpacing: "-0.5px" }}>
                  Pengembalian Alat &amp; Identitas
                </h3>
                <p className="text-muted" style={{ fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "480px" }}>
                  Setelah selesai, kembalikan perlengkapan ke toko kami tepat waktu. Kami akan melakukan inspeksi kondisi barang, dan <strong>identitas KTP Anda akan langsung dikembalikan</strong> jika tidak ada kerusakan atau denda keterlambatan.
                </p>
              </div>
            </motion.div>

            {/* Decorative Glass Card */}
            <motion.div variants={fadeInRight} className="hide-on-mobile" style={{ display: "flex", justifyContent: "center" }}>
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="glass"
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "var(--radius-lg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(74,222,128,0.25)",
                  boxShadow: "0 0 35px rgba(74,222,128,0.12), 0 8px 32px rgba(0,0,0,0.3)",
                  transform: "rotate(6deg)",
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 4, -4, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Banknote size={64} color="#4ade80" strokeWidth={1.3} style={{ opacity: 0.75 }} />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* ═══════════════════════════════════════════
            CTA — Full-width Glowing Glass Card
        ═══════════════════════════════════════════ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div
            className="glass cta-glass"
            style={{
              width: "100%",
              padding: "3.5rem 3rem",
              borderRadius: "var(--radius-lg)",
              border: "1px solid rgba(0,229,255,0.2)",
              boxShadow: "0 0 50px rgba(0,229,255,0.08), 0 0 100px rgba(0,229,255,0.04), inset 0 1px 0 rgba(255,255,255,0.05)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Subtle inner glow */}
            <div style={{
              position: "absolute",
              top: "-50%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "400px",
              height: "300px",
              background: "radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />

            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ marginBottom: "1.2rem" }}
            >
              <CheckCircle2 size={52} color="#4ade80" strokeWidth={1.5} />
            </motion.div>

            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", marginBottom: "0.8rem", letterSpacing: "-0.5px", position: "relative" }}>
              Siap Untuk Memulai?
            </h2>
            <p className="text-muted" style={{ marginBottom: "2rem", fontSize: "1.15rem", maxWidth: "500px", lineHeight: 1.6, position: "relative" }}>
              Eksplorasi ribuan perlengkapan tanpa rasa khawatir.
            </p>

            <Link href="/katalog" style={{ position: "relative" }}>
              <motion.button
                className="btn btn-primary"
                style={{
                  padding: "1rem 2.5rem",
                  fontSize: "1.1rem",
                  boxShadow: "0 0 25px rgba(0,229,255,0.25)",
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0,229,255,0.4)" }}
                whileTap={{ scale: 0.97 }}
              >
                Mulai Sewa Alat
              </motion.button>
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
