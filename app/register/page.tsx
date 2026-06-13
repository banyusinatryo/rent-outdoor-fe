"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Backpack, ShieldCheck, MapPin } from "lucide-react";
import { useState } from "react";

const inputBaseStyle: React.CSSProperties = {
  padding: "0.8rem",
  borderRadius: "var(--radius-md)",
  background: "rgba(3,5,8,0.8)",
  border: "1px solid var(--color-border)",
  color: "#fff",
  outline: "none",
  transition: "border 0.3s",
  width: "100%",
  fontSize: "0.95rem",
};

const inputFocusStyle: React.CSSProperties = {
  border: "1px solid rgba(255,85,0,0.5)",
  boxShadow: "0 0 15px rgba(255,85,0,0.15)",
};

function GlowInput({
  label,
  type = "text",
  placeholder,
  required = true,
}: {
  label: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-xs">
      <label className="text-muted" style={{ fontSize: "0.9rem" }}>
        {label}
      </label>
      <input
        required={required}
        type={type}
        placeholder={placeholder}
        style={{
          ...inputBaseStyle,
          ...(focused ? inputFocusStyle : {}),
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const floatingCards = [
  {
    icon: Backpack,
    label: "Peralatan Lengkap",
    delay: 0,
    top: "12%",
    right: "8%",
    rotate: -4,
  },
  {
    icon: ShieldCheck,
    label: "Terjamin Aman",
    delay: 0.8,
    top: "42%",
    right: "22%",
    rotate: 3,
  },
  {
    icon: MapPin,
    label: "Jelajahi Alam",
    delay: 1.6,
    top: "70%",
    right: "6%",
    rotate: -2,
  },
];

export default function Register() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Pendaftaran berhasil!");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "100px",
        paddingBottom: "var(--space-xl)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Neon Blobs ── */}
      <div
        className="animate-blob"
        style={{
          position: "absolute",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,85,0,0.18) 0%, transparent 70%)",
          top: "-5%",
          right: "10%",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />
      <div
        className="animate-blob"
        style={{
          position: "absolute",
          width: 340,
          height: 340,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 70%)",
          bottom: "5%",
          left: "5%",
          filter: "blur(90px)",
          zIndex: 0,
          animationDelay: "2s",
        }}
      />
      <div
        className="animate-blob"
        style={{
          position: "absolute",
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,85,0,0.1) 0%, transparent 70%)",
          bottom: "25%",
          right: "35%",
          filter: "blur(70px)",
          zIndex: 0,
          animationDelay: "4s",
        }}
      />

      {/* ── Split Layout ── */}
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: "var(--space-xl)",
          alignItems: "center",
          minHeight: "calc(100vh - 100px)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── LEFT: Registration Form ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ position: "relative", zIndex: 2 }}
        >
          <motion.div
            variants={fadeUp}
            className="glass"
            style={{
              padding: "2.5rem",
              borderRadius: "var(--radius-lg)",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 0 40px rgba(255,85,0,0.06), 0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            {/* Orange glowing top border */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "10%",
                right: "10%",
                height: "2px",
                background:
                  "linear-gradient(90deg, transparent, var(--color-accent), transparent)",
                borderRadius: "999px",
                boxShadow: "0 0 20px rgba(255,85,0,0.5)",
              }}
            />

            {/* Header */}
            <motion.div variants={fadeUp} style={{ marginBottom: "2rem" }}>
              <h1
                style={{
                  fontSize: "2rem",
                  fontWeight: 700,
                  marginBottom: "0.5rem",
                  color: "var(--color-text)",
                }}
              >
                Daftar Akun Baru
              </h1>
              <p className="text-muted" style={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
                Mulai petualangan Anda bersama Nexus Outdoor.
              </p>
            </motion.div>

            {/* Form */}
            <motion.form
              variants={fadeUp}
              onSubmit={handleSubmit}
              className="flex flex-col gap-sm"
            >
              <GlowInput label="Nama Lengkap" type="text" placeholder="John Doe" />
              <GlowInput label="Email" type="email" placeholder="email@contoh.com" />
              <div style={{ marginBottom: "0.5rem" }}>
                <GlowInput label="Password" type="password" placeholder="••••••••" />
              </div>

              <motion.button
                variants={fadeUp}
                type="submit"
                className="btn btn-accent"
                whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(255,85,0,0.35)" }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: "100%",
                  padding: "0.85rem",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "none",
                  marginTop: "0.5rem",
                }}
              >
                Buat Akun
              </motion.button>
            </motion.form>

            {/* Footer Link */}
            <motion.div
              variants={fadeUp}
              style={{
                marginTop: "2rem",
                borderTop: "1px solid var(--color-border)",
                paddingTop: "1.5rem",
                textAlign: "center",
              }}
            >
              <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                Sudah punya akun?{" "}
                <Link
                  href="/login"
                  className="text-gradient-primary"
                  style={{ fontWeight: 600 }}
                >
                  Login di sini
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Decorative Area ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ position: "relative", minHeight: 500 }}
        >
          {/* Main Text */}
          <motion.div variants={fadeLeft} style={{ marginBottom: "1.5rem" }}>
            <h2
              className="text-gradient-primary"
              style={{
                fontSize: "3rem",
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: "1rem",
              }}
            >
              Mulai Petualangan
              <br />
              Baru
            </h2>
            <p
              className="text-muted"
              style={{ fontSize: "1.05rem", lineHeight: 1.7, maxWidth: 420 }}
            >
              Bergabunglah dengan komunitas penjelajah alam. Akses ratusan peralatan
              outdoor premium, rencanakan perjalanan, dan ciptakan pengalaman yang tak
              terlupakan bersama Nexus Outdoor.
            </p>
          </motion.div>

          {/* Floating Decorative Cards */}
          {floatingCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.7, rotate: card.rotate * 2 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: card.rotate,
                y: [0, -15, 0],
              }}
              transition={{
                opacity: { duration: 0.6, delay: 0.4 + i * 0.2 },
                scale: { duration: 0.6, delay: 0.4 + i * 0.2 },
                rotate: { duration: 0.6, delay: 0.4 + i * 0.2 },
                y: {
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: card.delay,
                },
              }}
              className="glass"
              style={{
                position: "absolute",
                top: card.top,
                right: card.right,
                padding: "1.2rem 1.6rem",
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                boxShadow:
                  i === 0
                    ? "0 0 20px rgba(255,85,0,0.12), 0 4px 20px rgba(0,0,0,0.3)"
                    : i === 1
                    ? "0 0 20px rgba(0,229,255,0.12), 0 4px 20px rgba(0,0,0,0.3)"
                    : "0 0 20px rgba(255,85,0,0.08), 0 4px 20px rgba(0,0,0,0.3)",
                zIndex: 3 - i,
                backdropFilter: "blur(14px)",
              }}
            >
              <card.icon
                size={22}
                style={{
                  color: i === 1 ? "var(--color-primary)" : "var(--color-accent)",
                }}
              />
              <span
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "var(--color-text)",
                  whiteSpace: "nowrap",
                }}
              >
                {card.label}
              </span>
            </motion.div>
          ))}

          {/* Accent line decoration */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            style={{
              position: "absolute",
              bottom: "15%",
              left: 0,
              width: "60%",
              height: "1px",
              background:
                "linear-gradient(90deg, var(--color-accent), transparent)",
              transformOrigin: "left",
              opacity: 0.4,
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
