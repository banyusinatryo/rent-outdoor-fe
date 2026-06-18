"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqGroup {
  category: string;
  items: FaqItem[];
}

export default function FaqPage() {
  const [openIndexes, setOpenIndexes] = useState<Record<string, boolean>>({});

  const toggleAccordion = (groupIndex: number, itemIndex: number) => {
    const key = `${groupIndex}-${itemIndex}`;
    setOpenIndexes((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  const faqs: FaqGroup[] = [
    {
      category: "Penyewaan",
      items: [
        {
          question: "Bagaimana cara menyewa perlengkapan di Nexus Outdoor?",
          answer: "Pilih perlengkapan sewa di katalog, tentukan tanggal ambil dan kembali, cek ketersediaan, lalu tekan 'Lanjut Booking'. Setelah itu, selesaikan data diri penyewa dan lakukan transfer DP/Pelunasan.",
        },
        {
          question: "Berapa lama batas waktu minimal sewa?",
          answer: "Sewa minimal dihitung 1 hari (24 jam) terhitung sejak pengambilan barang di toko.",
        },
      ],
    },
    {
      category: "Identitas & Jaminan",
      items: [
        {
          question: "Kenapa harus menitipkan identitas asli di toko?",
          answer: "Ini digunakan sebagai jaminan keamanan unit alat outdoor sewa kami. Identitas Anda (KTP/SIM asli) akan disimpan dengan aman di toko fisik dan langsung dikembalikan setelah barang dikembalikan secara lengkap.",
        },
        {
          question: "Dapatkah saya menggunakan kartu identitas kerabat?",
          answer: "Bisa, asalkan kerabat pemilik identitas hadir langsung pada saat serah terima barang di toko untuk tanda tangan berkas persetujuan sewa.",
        },
      ],
    },
    {
      category: "Pembayaran & Pembatalan",
      items: [
        {
          question: "Metode pembayaran apa saja yang didukung?",
          answer: "Kami mendukung transfer bank BCA, scan QRIS, serta e-wallet (GoPay, OVO, Dana). Anda juga bisa melakukan pelunasan tunai di toko.",
        },
        {
          question: "Apakah uang muka (DP) saya hangus jika terjadi pembatalan sewa?",
          answer: "Pembatalan sewa yang diajukan maksimal H-3 sebelum tanggal peminjaman berhak mendapatkan refund DP 100%. Untuk pembatalan H-1 atau pada hari H, DP tidak dapat dikembalikan.",
        },
      ],
    },
  ];

  return (
    <div style={{ paddingTop: "100px", paddingBottom: "var(--space-xl)", position: "relative", overflow: "hidden", minHeight: "100vh" }}>
      {/* Ambient background glows */}
      <div style={{ position: "absolute", top: "-10%", right: "-10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)", filter: "blur(80px)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "-10%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(255,85,0,0.06) 0%, transparent 70%)", filter: "blur(80px)", borderRadius: "50%", pointerEvents: "none" }} />

      <div className="container" style={{ position: "relative", zIndex: 1, maxWidth: "800px" }}>
        
        {/* Header */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          style={{ marginBottom: "3rem", textAlign: "center" }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 1rem", background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)", borderRadius: "var(--radius-full)", color: "var(--color-primary)", fontWeight: 600, fontSize: "0.85rem", marginBottom: "1rem" }}>
            <HelpCircle size={14} /> Tanya Jawab Umum
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", letterSpacing: "-1px", marginBottom: "0.5rem" }}>
            Frequently Asked <span className="text-gradient-primary">Questions</span>
          </h1>
          <p className="text-muted" style={{ fontSize: "1.05rem" }}>
            Temukan jawaban cepat untuk pertanyaan yang paling sering diajukan.
          </p>
        </motion.div>

        {/* Accordions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", marginBottom: "3rem" }}>
          {faqs.map((group, groupIdx) => (
            <motion.div 
              key={groupIdx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeInUp}
            >
              <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem", color: "var(--color-primary)", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "0.5rem" }}>
                {group.category}
              </h2>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {group.items.map((item, itemIdx) => {
                  const key = `${groupIdx}-${itemIdx}`;
                  const isOpen = !!openIndexes[key];

                  return (
                    <div 
                      key={itemIdx}
                      className="glass"
                      style={{ 
                        borderRadius: "var(--radius-sm)", 
                        overflow: "hidden", 
                        border: "1px solid rgba(255,255,255,0.06)",
                        transition: "all 0.3s ease"
                      }}
                    >
                      <button
                        onClick={() => toggleAccordion(groupIdx, itemIdx)}
                        style={{
                          width: "100%",
                          padding: "1.25rem 1.5rem",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          background: "none",
                          border: "none",
                          color: "#fff",
                          cursor: "pointer",
                          textAlign: "left",
                          fontSize: "1rem",
                          fontWeight: 500,
                          gap: "1rem"
                        }}
                      >
                        <span>{item.question}</span>
                        {isOpen ? <ChevronUp size={18} color="var(--color-primary)" /> : <ChevronDown size={18} />}
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                          >
                            <div style={{ 
                              padding: "0 1.5rem 1.5rem", 
                              color: "var(--color-text-muted)", 
                              fontSize: "0.92rem", 
                              lineHeight: 1.6,
                              borderTop: "1px solid rgba(255,255,255,0.04)",
                              paddingTop: "1rem"
                            }}>
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

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
            Tim kami siap membantu menjawab keraguan Anda.
          </p>
          <div className="flex gap-sm justify-center hero-buttons">
            <Link href="/syarat" className="btn btn-outline" style={{ padding: "0.75rem 2rem" }}>
              Kebijakan Sewa
            </Link>
            <Link href="https://wa.me/6281234567890" target="_blank" className="btn btn-primary" style={{ padding: "0.75rem 2rem" }}>
              Hubungi WhatsApp
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
