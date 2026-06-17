"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tent, Backpack, Compass, ShieldCheck, Banknote, MapPin, ArrowRight } from "lucide-react";
import { getProducts } from "@/lib/api";
import { getProductImage, type ApiProduct } from "@/lib/types";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<ApiProduct[]>([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  useEffect(() => {
    getProducts({ per_page: 4 })
      .then((res) => setFeaturedProducts(res.data))
      .catch(() => { /* abaikan; section sembunyi jika kosong */ })
      .finally(() => setLoadingFeatured(false));
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <>
      {/* Animated Background Blobs */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div className="animate-blob" style={{ position: "absolute", top: "-10%", left: "-10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(60px)" }} />
        <div className="animate-blob animation-delay-2000" style={{ position: "absolute", top: "50%", right: "-10%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(255, 85, 0, 0.12) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(70px)" }} />
        <div className="animate-blob animation-delay-4000" style={{ position: "absolute", bottom: "-15%", left: "30%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(0, 229, 255, 0.1) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(50px)" }} />
      </div>

      {/* ═══════════════════════════════════════
          HERO — Cinematic Full-Width
      ═══════════════════════════════════════ */}
      <section style={{ position: "relative", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* Background Image */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
          <Image
            src="/images/hero_camping.png"
            alt="Camping under the stars"
            fill
            priority
            unoptimized
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          {/* Cinematic overlays */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(3,5,8,0.4) 0%, rgba(3,5,8,0.2) 40%, rgba(3,5,8,0.85) 85%, var(--color-bg) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(3,5,8,0.6) 0%, transparent 50%, rgba(3,5,8,0.3) 100%)" }} />
        </div>

        {/* Content — Centered */}
        <div className="container" style={{ position: "relative", zIndex: 10, textAlign: "center" }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            style={{ maxWidth: "800px", margin: "0 auto" }}
          >
            <motion.span
              variants={fadeInUp}
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.4rem 1.2rem",
                background: "rgba(0, 229, 255, 0.1)",
                border: "1px solid rgba(0, 229, 255, 0.3)",
                borderRadius: "var(--radius-full)",
                color: "var(--color-primary)",
                fontWeight: 600, fontSize: "0.85rem",
                marginBottom: "2rem",
                boxShadow: "0 0 25px rgba(0, 229, 255, 0.15)",
              }}
            >
              <ShieldCheck size={15} /> Penyewaan Alat Outdoor Premium
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              style={{
                fontSize: "clamp(3rem, 6vw, 5.5rem)",
                letterSpacing: "-2px",
                lineHeight: 1.05,
                marginBottom: "1.5rem",
                textShadow: "0 0 60px rgba(0,0,0,0.5)",
              }}
            >
              Petualangan Dimulai <br />
              <span className="text-gradient-primary" style={{ filter: "drop-shadow(0 0 25px rgba(0,229,255,0.4))" }}>
                dari Sini.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-muted"
              style={{ fontSize: "1.2rem", marginBottom: "3rem", maxWidth: "550px", margin: "0 auto 3rem", lineHeight: 1.7 }}
            >
              Koleksi perlengkapan gunung terlengkap. Sewa mudah, ambil di toko, jaminan identitas. Siap temani setiap langkah Anda.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex gap-sm justify-center">
              <Link href="/katalog">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(0,229,255,0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary"
                  style={{ padding: "1rem 2.5rem", fontSize: "1.1rem", gap: "0.5rem" }}
                >
                  Eksplor Katalog <ArrowRight size={18} />
                </motion.button>
              </Link>
              <Link href="/cara-kerja">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline"
                  style={{ padding: "1rem 2rem", fontSize: "1.1rem", backdropFilter: "blur(10px)", background: "rgba(255,255,255,0.05)" }}
                >
                  Cara Kerja
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}
        >
          <span className="text-muted" style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "2px" }}>Scroll</span>
          <div style={{ width: "1px", height: "30px", background: "linear-gradient(to bottom, var(--color-primary), transparent)" }} />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURED — Product Showcase Strip
      ═══════════════════════════════════════ */}
      <section className="container" style={{ padding: "var(--space-xl) var(--space-sm)", position: "relative", zIndex: 1 }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          {/* Section header */}
          <motion.div variants={fadeInUp} className="flex items-center justify-between" style={{ marginBottom: "var(--space-lg)" }}>
            <div>
              <h2 style={{ fontSize: "2.5rem", marginBottom: "0.3rem", letterSpacing: "-1px" }}>
                Gear <span className="text-gradient-primary">Terpopuler</span>
              </h2>
              <p className="text-muted" style={{ fontSize: "1rem" }}>Perlengkapan favorit yang paling sering disewa.</p>
            </div>
            <Link href="/katalog">
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                className="btn btn-outline hide-on-mobile"
                style={{ padding: "0.7rem 1.5rem", fontSize: "0.9rem", gap: "0.5rem" }}
              >
                Lihat Semua <ArrowRight size={16} />
              </motion.button>
            </Link>
          </motion.div>

          {/* Product grid — 4 cols asymmetric */}
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr 1fr 1.3fr", gap: "1.5rem", alignItems: "stretch" }}>
            {loadingFeatured
              ? Array.from({ length: 4 }).map((_, i) => (
                <motion.div key={`feat-skel-${i}`} variants={fadeInUp}>
                  <div className="glass" style={{ height: "100%", minHeight: i === 0 || i === 3 ? "400px" : "340px", borderRadius: "var(--radius-lg)", border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)" }} />
                </motion.div>
              ))
              : featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <Link href={`/produk/${product.id}`} style={{ display: "block", height: "100%" }}>
                  <div
                    className="glass"
                    style={{
                      height: "100%",
                      borderRadius: "var(--radius-lg)",
                      overflow: "hidden",
                      border: "1px solid rgba(255,255,255,0.06)",
                      transition: "border-color 0.3s, box-shadow 0.3s",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0,229,255,0.3)";
                      e.currentTarget.style.boxShadow = "0 0 30px rgba(0,229,255,0.1), 0 20px 40px rgba(0,0,0,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {/* Image */}
                    <div style={{ position: "relative", height: i === 0 || i === 3 ? "280px" : "220px" }}>
                      <Image src={getProductImage(product)} alt={product.name} fill unoptimized style={{ objectFit: "cover" }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(3,5,8,0.95) 100%)" }} />
                      {/* Category pill */}
                      <div style={{
                        position: "absolute", top: "1rem", right: "1rem",
                        background: "rgba(3,5,8,0.6)", backdropFilter: "blur(10px)",
                        padding: "0.35rem 0.8rem", borderRadius: "var(--radius-full)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        fontSize: "0.75rem", fontWeight: 600, color: "#fff",
                        display: "flex", alignItems: "center", gap: "0.3rem",
                      }}>
                        {product.category.name === "Tenda" && <Tent size={12} />}
                        {product.category.name === "Carrier" && <Backpack size={12} />}
                        {product.category.name !== "Tenda" && product.category.name !== "Carrier" && <Compass size={12} />}
                        {product.category.name}
                      </div>
                    </div>
                    {/* Content */}
                    <div style={{ padding: "1.2rem 1.5rem", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                      <h3 style={{ fontSize: "1.1rem", marginBottom: "0.8rem", lineHeight: 1.4, flexGrow: 1 }}>{product.name}</h3>
                      <div className="flex items-center justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "0.8rem" }}>
                        <div>
                          <span style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--color-primary)" }}>
                            Rp {product.default_daily_price.toLocaleString("id-ID")}
                          </span>
                          <span className="text-muted" style={{ fontSize: "0.8rem" }}> /hr</span>
                        </div>
                        <div style={{
                          width: "32px", height: "32px", borderRadius: "50%",
                          background: "rgba(0,229,255,0.1)", border: "1px solid rgba(0,229,255,0.3)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <ArrowRight size={14} color="var(--color-primary)" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          HOW IT WORKS — Zigzag Mini
      ═══════════════════════════════════════ */}
      <section style={{ position: "relative", padding: "var(--space-xl) 0", overflow: "hidden" }}>
        {/* Subtle background */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, var(--color-bg), rgba(0,229,255,0.02), var(--color-bg))", zIndex: 0 }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center"
            style={{ marginBottom: "var(--space-lg)" }}
          >
            <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem", letterSpacing: "-1px" }}>
              Sewa Semudah <span className="text-gradient-primary">1-2-3</span>
            </h2>
            <p className="text-muted" style={{ maxWidth: "500px", margin: "0 auto", fontSize: "1.05rem" }}>
              Proses yang simpel, aman, dan transparan dari awal hingga akhir.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2rem", position: "relative" }}
          >
            {/* Connecting line */}
            <div className="hide-on-mobile" style={{
              position: "absolute", top: "60px", left: "16%", right: "16%", height: "1px",
              background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.3), rgba(255,85,0,0.3), rgba(74,222,128,0.3), transparent)",
              zIndex: 0,
            }} />

            {/* Step 1 */}
            <motion.div variants={fadeInUp} style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <motion.div
                whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(0,229,255,0.3)" }}
                style={{
                  width: "100px", height: "100px", margin: "0 auto 1.5rem",
                  background: "rgba(0,229,255,0.08)", borderRadius: "var(--radius-lg)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "1px solid rgba(0,229,255,0.2)",
                  boxShadow: "0 0 20px rgba(0,229,255,0.1)",
                  transition: "all 0.3s",
                }}
              >
                <ShieldCheck size={40} color="var(--color-primary)" strokeWidth={1.5} />
              </motion.div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "2px" }}>Langkah 01</span>
              <h3 style={{ fontSize: "1.2rem", margin: "0.5rem 0", color: "#fff" }}>Booking & Bayar</h3>
              <p className="text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                Pilih alat, tentukan tanggal, dan bayar DP/Lunas secara online.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div variants={fadeInUp} style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <motion.div
                whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(255,85,0,0.3)" }}
                style={{
                  width: "100px", height: "100px", margin: "0 auto 1.5rem",
                  background: "rgba(255,85,0,0.08)", borderRadius: "var(--radius-lg)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "1px solid rgba(255,85,0,0.2)",
                  boxShadow: "0 0 20px rgba(255,85,0,0.1)",
                  transition: "all 0.3s",
                }}
              >
                <MapPin size={40} color="var(--color-accent)" strokeWidth={1.5} />
              </motion.div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "2px" }}>Langkah 02</span>
              <h3 style={{ fontSize: "1.2rem", margin: "0.5rem 0", color: "#fff" }}>Ambil & Titip KTP</h3>
              <p className="text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                Datang ke toko, tunjukkan bukti, titipkan identitas sebagai jaminan.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div variants={fadeInUp} style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <motion.div
                whileHover={{ scale: 1.1, boxShadow: "0 0 40px rgba(74,222,128,0.3)" }}
                style={{
                  width: "100px", height: "100px", margin: "0 auto 1.5rem",
                  background: "rgba(74,222,128,0.08)", borderRadius: "var(--radius-lg)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  border: "1px solid rgba(74,222,128,0.2)",
                  boxShadow: "0 0 20px rgba(74,222,128,0.1)",
                  transition: "all 0.3s",
                }}
              >
                <Banknote size={40} color="#4ade80" strokeWidth={1.5} />
              </motion.div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#4ade80", textTransform: "uppercase", letterSpacing: "2px" }}>Langkah 03</span>
              <h3 style={{ fontSize: "1.2rem", margin: "0.5rem 0", color: "#fff" }}>Kembalikan & Ambil KTP</h3>
              <p className="text-muted" style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                Kembalikan alat, kami inspeksi, dan KTP Anda langsung kembali.
              </p>
            </motion.div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            style={{ textAlign: "center", marginTop: "var(--space-lg)" }}
          >
            <Link href="/cara-kerja">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-outline"
                style={{ padding: "0.8rem 2rem", fontSize: "1rem", gap: "0.5rem" }}
              >
                Pelajari Selengkapnya <ArrowRight size={16} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
