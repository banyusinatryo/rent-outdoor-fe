"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Mountain, Loader2 } from "lucide-react";
import { loginCustomer } from "@/lib/api";
import { setAuth } from "@/lib/auth";

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
  borderColor: "rgba(0,229,255,0.5)",
  boxShadow: "0 0 15px rgba(0,229,255,0.15)",
  background: "rgba(0,229,255,0.02)",
};

export default function Login() {
  const router = useRouter();
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [loading, setLoading]           = useState(false);
  const [apiError, setApiError]         = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setApiError(null);

    try {
      const res = await loginCustomer({ email, password });
      setAuth(res.data.token, res.data.customer);
      router.push('/');
    } catch (err: unknown) {
      const apiErr = err as { message?: string; errors?: Record<string, string[]> };
      setApiError(
        apiErr?.errors?.email?.[0] ??
        apiErr?.message ??
        'Login gagal. Periksa email dan password Anda.'
      );
    } finally {
      setLoading(false);
    }
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
      
      {/* ── Background Ambient Glow ── */}
      <div style={{ position: "absolute", top: "-10%", left: "-5%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(0,229,255,0.15) 0%, transparent 60%)", filter: "blur(80px)", borderRadius: "50%", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(255,85,0,0.1) 0%, transparent 60%)", filter: "blur(90px)", borderRadius: "50%", zIndex: 0 }} />

      {/* ══════════════════════════════════════════════
          PREMIUM CENTERED GLASS CARD
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
          boxShadow: "0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,229,255,0.05)",
          overflow: "hidden",
          position: "relative",
          zIndex: 10
        }}
      >
        
        {/* LEFT SIDE — High Quality Image Panel */}
        <div className="hide-on-mobile" style={{ flex: "1.1", position: "relative" }}>
          <Image 
            src="/images/IMG_4440.jpg" 
            alt="Camping and Hiking" 
            fill 
            style={{ objectFit: "cover" }} 
            priority
          />
          {/* Gradient Overlay for text readability */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(3,5,8,0.95) 0%, rgba(3,5,8,0.2) 50%, transparent 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,229,255,0.1) 0%, transparent 100%)" }} />
          
          {/* Logo & Copy overlay */}
          <div style={{ position: "absolute", inset: "0", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "2.5rem" }}>
            <Link href="/">
              <div style={{ position: "relative", width: "120px", height: "36px" }}>
                <Image src="/images/nexus logo.png" alt="Nexus Logo" fill style={{ objectFit: "contain", objectPosition: "left" }} />
              </div>
            </Link>
            
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.8rem", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", borderRadius: "100px", border: "1px solid rgba(255,255,255,0.2)", marginBottom: "1rem" }}>
                <Mountain size={14} color="#00E5FF" />
                <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#fff", letterSpacing: "0.5px" }}>NEXUS OUTDOOR</span>
              </div>
              <h2 style={{ fontSize: "2rem", fontWeight: 700, lineHeight: 1.2, color: "#fff", marginBottom: "0.5rem" }}>
                Jelajahi Alam,<br/>Tanpa Batas.
              </h2>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", maxWidth: "280px" }}>
                Akses ribuan perlengkapan premium untuk mendukung perjalanan terbaik Anda.
              </p>
            </motion.div>
          </div>
        </div>

        {/* RIGHT SIDE — Clean Login Form */}
        <div style={{ flex: "1", padding: "3rem 3.5rem", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", background: "rgba(6, 9, 13, 0.6)" }}>
          
          {/* Subtle top edge highlight */}
          <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent)" }} />

          <div style={{ marginBottom: "2rem" }}>
            <h1 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#fff", marginBottom: "0.4rem" }}>Log In</h1>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)" }}>Selamat datang kembali! Silakan masukkan detail akun Anda.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Error Message */}
            {apiError && (
              <div style={{ padding: '0.85rem 1rem', borderRadius: '10px', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', color: '#f87171', fontSize: '0.85rem' }}>
                {apiError}
              </div>
            )}

            {/* Email */}
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 500, color: "rgba(255,255,255,0.7)", marginBottom: "0.5rem" }}>
                Email
              </label>
              <input
                required
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                style={{ ...inputBase, ...(focusedField === "email" ? inputFocus : {}) }}
              />
            </div>

            {/* Password */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>
                  Password
                </label>
              </div>
              <input
                required
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                style={{ ...inputBase, ...(focusedField === "password" ? inputFocus : {}) }}
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={!loading ? { scale: 1.01, boxShadow: "0 5px 15px rgba(0,229,255,0.2)" } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.9rem",
                borderRadius: "12px",
                background: loading ? "rgba(0,229,255,0.5)" : "var(--color-primary)",
                color: "#000",
                fontSize: "0.95rem",
                fontWeight: 600,
                border: "none",
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem"
              }}
            >
              {loading ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Masuk...</> : <>Masuk Akun <ArrowRight size={16} /></>}
            </motion.button>
          </form>

          {/* Register Link */}
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>
              Belum punya akun?{" "}
              <Link href="/register" style={{ color: "#fff", fontWeight: 600, textDecoration: "none" }}>
                Daftar sekarang
              </Link>
            </p>
          </div>

        </div>
      </motion.div>

    </div>
  );
}
