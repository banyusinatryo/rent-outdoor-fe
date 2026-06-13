"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mountain, Tent, Compass } from "lucide-react";

const containerStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } },
};

const inputBase: React.CSSProperties = {
  padding: "0.8rem",
  borderRadius: "var(--radius-md)",
  background: "rgba(3,5,8,0.8)",
  border: "1px solid var(--color-border)",
  color: "#fff",
  outline: "none",
  transition: "border 0.3s, box-shadow 0.3s",
  width: "100%",
  fontSize: "0.95rem",
};

const inputFocus: React.CSSProperties = {
  borderColor: "rgba(0,229,255,0.5)",
  boxShadow: "0 0 15px rgba(0,229,255,0.15)",
};

const floatingCards = [
  { icon: Mountain, label: "Gunung", x: "8%", y: "38%", delay: 0 },
  { icon: Tent, label: "Tenda", x: "32%", y: "62%", delay: 0.25 },
  { icon: Compass, label: "Jelajah", x: "18%", y: "78%", delay: 0.5 },
];

export default function Login() {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Proses login akan segera diimplementasikan dengan Laravel Sanctum!");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        paddingTop: "100px",
        display: "flex",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Neon blobs ── */}
      <div
        className="animate-blob"
        style={{
          position: "absolute",
          width: 420,
          height: 420,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 70%)",
          top: "10%",
          left: "-5%",
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
          background: "radial-gradient(circle, rgba(255,85,0,0.10) 0%, transparent 70%)",
          bottom: "5%",
          left: "25%",
          filter: "blur(90px)",
          zIndex: 0,
          animationDelay: "2s",
        }}
      />
      <div
        className="animate-blob"
        style={{
          position: "absolute",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)",
          top: "55%",
          right: "5%",
          filter: "blur(70px)",
          zIndex: 0,
          animationDelay: "4s",
        }}
      />

      {/* ══════════════════════════════════════════════
          LEFT SIDE — Decorative / Branding
         ══════════════════════════════════════════════ */}
      <motion.div
        variants={containerStagger}
        initial="hidden"
        animate="visible"
        style={{
          flex: "1.3",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "var(--space-xl) var(--space-xl) var(--space-xl) clamp(2rem, 6vw, 5rem)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.h1
          variants={fadeUp}
          className="text-gradient-primary"
          style={{
            fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: "1.2rem",
            letterSpacing: "-0.02em",
          }}
        >
          Selamat Datang
          <br />
          Kembali
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-muted"
          style={{
            fontSize: "1.05rem",
            lineHeight: 1.7,
            maxWidth: 440,
            marginBottom: "2.5rem",
          }}
        >
          Nexus Outdoor adalah platform penyewaan alat outdoor terlengkap.
          Temukan perlengkapan terbaik untuk petualangan Anda berikutnya —
          mulai dari tenda, carrier, hingga peralatan mendaki gunung.
        </motion.p>

        {/* Floating decorative cards */}
        {floatingCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              variants={fadeUp}
              animate={{ y: [0, -15, 0] }}
              transition={{
                y: {
                  duration: 3.5 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: card.delay,
                },
              }}
              className="glass"
              style={{
                position: "absolute",
                left: card.x,
                top: card.y,
                padding: "1rem 1.3rem",
                borderRadius: "var(--radius-md)",
                display: "flex",
                alignItems: "center",
                gap: "0.65rem",
                boxShadow: "0 0 20px rgba(0,229,255,0.08), 0 8px 32px rgba(0,0,0,0.3)",
                border: "1px solid var(--color-border)",
                zIndex: 2,
                backdropFilter: "blur(14px)",
              }}
            >
              <Icon size={20} style={{ color: "var(--color-primary)" }} />
              <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-text)" }}>
                {card.label}
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ══════════════════════════════════════════════
          RIGHT SIDE — Login Form
         ══════════════════════════════════════════════ */}
      <div
        style={{
          flex: "1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "var(--space-xl) clamp(1.5rem, 4vw, 4rem)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="glass"
          style={{
            width: "100%",
            maxWidth: 420,
            padding: "2.8rem 2.4rem",
            borderRadius: "var(--radius-lg)",
            position: "relative",
            borderTop: "2px solid rgba(0,229,255,0.5)",
            boxShadow:
              "0 -4px 30px rgba(0,229,255,0.10), 0 20px 60px rgba(0,0,0,0.35)",
          }}
        >
          {/* Glowing top edge reflection */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "10%",
              right: "10%",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(0,229,255,0.5), transparent)",
              filter: "blur(1px)",
            }}
          />

          <h2
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              marginBottom: "0.4rem",
              color: "var(--color-text)",
            }}
          >
            Log In
          </h2>
          <p
            className="text-muted"
            style={{ fontSize: "0.9rem", marginBottom: "2rem" }}
          >
            Masuk ke akun Nexus Outdoor Anda.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col" style={{ gap: "1.25rem" }}>
            {/* Email */}
            <div className="flex flex-col gap-xs">
              <label
                className="text-muted"
                style={{ fontSize: "0.85rem", fontWeight: 500 }}
              >
                Email
              </label>
              <input
                required
                type="email"
                placeholder="email@contoh.com"
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                style={{
                  ...inputBase,
                  ...(focusedField === "email" ? inputFocus : {}),
                }}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-xs">
              <div className="flex justify-between items-center">
                <label
                  className="text-muted"
                  style={{ fontSize: "0.85rem", fontWeight: 500 }}
                >
                  Password
                </label>
                <Link
                  href="#"
                  className="text-muted"
                  style={{
                    fontSize: "0.78rem",
                    textDecoration: "none",
                    transition: "color 0.3s",
                  }}
                >
                  Lupa password?
                </Link>
              </div>
              <input
                required
                type="password"
                placeholder="••••••••"
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                style={{
                  ...inputBase,
                  ...(focusedField === "password" ? inputFocus : {}),
                }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: "100%",
                padding: "0.85rem",
                fontSize: "1rem",
                marginTop: "0.5rem",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Log In
            </button>
          </form>

          {/* Register link */}
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <p className="text-muted" style={{ fontSize: "0.88rem" }}>
              Belum punya akun?{" "}
              <Link
                href="/register"
                className="text-gradient-primary"
                style={{ fontWeight: 600, textDecoration: "none" }}
              >
                Daftar di sini
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
