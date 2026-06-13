"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Mountain } from "lucide-react";

const inputBase: React.CSSProperties = {
  padding: "0.85rem 1rem",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#fff",
  outline: "none",
  transition: "all 0.3s ease",
  width: "100%",
  fontSize: "0.9rem",
};

const inputFocus: React.CSSProperties = {
  borderColor: "rgba(255,85,0,0.5)",
  boxShadow: "0 0 15px rgba(255,85,0,0.15)",
  background: "rgba(255,85,0,0.02)",
};

export default function Register() {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Proses pendaftaran akan segera diimplementasikan dengan Laravel Sanctum!");
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      background: "var(--color-bg)", 
      position: "relative",
      overflow: "hidden",
      padding: "2rem"
    }}>
      
      {/* ── Background Ambient Glow (Flipped from Login) ── */}
      <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(255,85,0,0.12) 0%, transparent 60%)", filter: "blur(80px)", borderRadius: "50%", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 60%)", filter: "blur(90px)", borderRadius: "50%", zIndex: 0 }} />

      {/* ══════════════════════════════════════════════
          PREMIUM CENTERED GLASS CARD (Mirrored Layout)
         ══════════════════════════════════════════════ */}
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "1000px",
          minHeight: "550px",
          background: "rgba(10, 14, 20, 0.4)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRadius: "24px",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,85,0,0.05)",
          overflow: "hidden",
          position: "relative",
          zIndex: 10
        }}
      >
        
        {/* LEFT SIDE — Clean Register Form */}
        <div style={{ flex: "1.1", padding: "3rem 3.5rem", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", background: "rgba(6, 9, 13, 0.6)" }}>
          
          {/* Subtle top edge highlight */}
          <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,85,0,0.3), transparent)" }} />

          <div style={{ marginBottom: "2rem" }}>
            <Link href="/" style={{ display: "inline-block", marginBottom: "1.5rem" }}>
              <div style={{ position: "relative", width: "110px", height: "30px" }}>
                <Image src="/images/nexus logo.png" alt="Nexus Logo" fill style={{ objectFit: "contain", objectPosition: "left" }} />
              </div>
            </Link>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#fff", marginBottom: "0.4rem" }}>Buat Akun</h1>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}>Mulai petualangan Anda bersama Nexus Outdoor.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            
            {/* Nama Lengkap */}
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 500, color: "rgba(255,255,255,0.7)", marginBottom: "0.4rem" }}>
                Nama Lengkap
              </label>
              <input
                required
                type="text"
                placeholder="John Doe"
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
                style={{ ...inputBase, ...(focusedField === "name" ? inputFocus : {}) }}
              />
            </div>

            {/* Email */}
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 500, color: "rgba(255,255,255,0.7)", marginBottom: "0.4rem" }}>
                Email
              </label>
              <input
                required
                type="email"
                placeholder="nama@email.com"
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                style={{ ...inputBase, ...(focusedField === "email" ? inputFocus : {}) }}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 500, color: "rgba(255,255,255,0.7)", marginBottom: "0.4rem" }}>
                Password
              </label>
              <input
                required
                type="password"
                placeholder="Minimal 8 karakter"
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                style={{ ...inputBase, ...(focusedField === "password" ? inputFocus : {}) }}
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01, boxShadow: "0 5px 15px rgba(255,85,0,0.2)" }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              style={{
                width: "100%",
                padding: "0.9rem",
                borderRadius: "12px",
                background: "var(--color-accent)", // Orange
                color: "#000",
                fontSize: "0.95rem",
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
                marginTop: "0.5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem"
              }}
            >
              Daftar Sekarang <ArrowRight size={16} />
            </motion.button>
          </form>

          {/* Login Link */}
          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>
              Sudah punya akun?{" "}
              <Link href="/login" style={{ color: "#fff", fontWeight: 600, textDecoration: "none" }}>
                Log In di sini
              </Link>
            </p>
          </div>

        </div>

        {/* RIGHT SIDE — High Quality Image Panel */}
        <div className="hide-on-mobile" style={{ flex: "1", position: "relative" }}>
          <Image 
            src="/images/hero_camping.png" 
            alt="Camping and Hiking" 
            fill 
            style={{ objectFit: "cover", objectPosition: "center" }} 
            priority
          />
          {/* Gradient Overlay for text readability */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(3,5,8,0.95) 0%, rgba(3,5,8,0.2) 50%, transparent 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, rgba(255,85,0,0.1) 0%, transparent 100%)" }} />
          
          {/* Copy overlay */}
          <div style={{ position: "absolute", inset: "0", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "2.5rem" }}>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.8rem", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.2)", marginBottom: "1rem" }}>
                <Mountain size={14} color="#FF5500" />
                <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#fff", letterSpacing: "0.5px" }}>BERGABUNG BERSAMA KAMI</span>
              </div>
              <h2 style={{ fontSize: "2rem", fontWeight: 700, lineHeight: 1.2, color: "#fff", marginBottom: "0.5rem" }}>
                Jadilah Bagian Dari<br/>Komunitas Kami.
              </h2>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", maxWidth: "280px" }}>
                Lebih dari sekadar menyewa. Dapatkan poin reward dan akses prioritas ke alat terbaru.
              </p>
            </motion.div>
          </div>
        </div>

      </motion.div>

    </div>
  );
}
