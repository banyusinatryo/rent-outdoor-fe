"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Tent, Backpack, Shirt, Flame, Compass, BadgeCheck, SlidersHorizontal } from 'lucide-react';
import { getCategories, getProducts } from '@/lib/api';
import { getProductImage, type ApiCategory, type ApiProduct } from '@/lib/types';

// ─── Ikon kategori ────────────────────────────────────────────────────────────
const categoryIcons: Record<string, React.ReactNode> = {
  "Semua":             <Compass size={18} />,
  "Tenda":             <Tent size={18} />,
  "Carrier":           <Backpack size={18} />,
  "Pakaian & Sepatu":  <Shirt size={18} />,
  "Alat Masak":        <Flame size={18} />,
  "Aksesoris & Gear":  <SlidersHorizontal size={18} />,
};

// ─── Framer Motion variants ───────────────────────────────────────────────────
const staggerContainer = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

// ─── Skeleton Card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="glass" style={{
      borderRadius: 'var(--radius-lg)', overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{ height: '230px', background: 'rgba(255,255,255,0.04)', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
          animation: 'shimmer 1.5s infinite',
        }} />
      </div>
      <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>
        <div style={{ height: '12px', width: '60%', background: 'rgba(255,255,255,0.06)', borderRadius: 6, marginBottom: '0.75rem' }} />
        <div style={{ height: '18px', width: '85%', background: 'rgba(255,255,255,0.08)', borderRadius: 6, marginBottom: '1rem' }} />
        <div style={{ height: '14px', width: '40%', background: 'rgba(0,229,255,0.12)', borderRadius: 6 }} />
      </div>
    </div>
  );
}

// ─── Komponen Utama ───────────────────────────────────────────────────────────
export default function Katalog() {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null); // null = "Semua"
  const [searchQuery, setSearchQuery]           = useState('');
  const [searchFocused, setSearchFocused]       = useState(false);
  const [categories, setCategories]             = useState<ApiCategory[]>([]);
  const [products, setProducts]                 = useState<ApiProduct[]>([]);
  const [total, setTotal]                       = useState(0);
  const [loading, setLoading]                   = useState(true);
  const [error, setError]                       = useState<string | null>(null);

  // ── Fetch categories saat mount ───────────────────────────────────────────
  useEffect(() => {
    getCategories()
      .then((res) => setCategories(res.data))
      .catch(() => { /* tidak fatal jika gagal, icon default tetap tampil */ });
  }, []);

  // ── Fetch products (dengan debounce pada search) ───────────────────────────
  const fetchProducts = useCallback(() => {
    setLoading(true);
    setError(null);

    getProducts({
      category_id: activeCategoryId ?? undefined,
      search: searchQuery.trim() || undefined,
      per_page: 20,
    })
      .then((res) => {
        setProducts(res.data);
        setTotal(res.meta.total);
      })
      .catch(() => setError('Gagal memuat produk. Coba lagi.'))
      .finally(() => setLoading(false));
  }, [activeCategoryId, searchQuery]);

  // Debounce: tunda 350ms setelah user berhenti mengetik
  useEffect(() => {
    const timer = setTimeout(fetchProducts, searchQuery ? 350 : 0);
    return () => clearTimeout(timer);
  }, [fetchProducts, searchQuery]);

  return (
    <div style={{ paddingTop: '100px', paddingBottom: 'var(--space-xl)', paddingLeft: '5%', paddingRight: '5%', position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>

      {/* shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      {/* ── Neon Blob Backgrounds ── */}
      <div style={{ position: 'absolute', top: '-80px', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 65%)', borderRadius: '50%', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '-40px', right: '-5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255,85,0,0.1) 0%, transparent 65%)', borderRadius: '50%', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none' }} />

      {/* ══════════════════════════════════════════════
          HEADER
         ══════════════════════════════════════════════ */}
      <div style={{ position: 'relative', zIndex: 1, marginBottom: 'var(--space-lg)' }}>
        <div className="flex items-center justify-between flex-wrap gap-sm">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', letterSpacing: '-1.5px', marginBottom: '0.4rem', lineHeight: 1.1 }}>
              Eksplorasi{' '}
              <span className="text-gradient-primary">Katalog</span>
            </h1>
            <p className="text-muted" style={{ fontSize: '1.1rem', maxWidth: '480px' }}>
              Temukan peralatan premium untuk petualangan Anda berikutnya.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="glass"
            style={{ padding: '0.6rem 1.5rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(0,229,255,0.4)', boxShadow: '0 0 20px rgba(0,229,255,0.12)', whiteSpace: 'nowrap' }}
          >
            <span style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.95rem' }}>
              {loading ? '...' : `${total} Alat Ditemukan`}
            </span>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          SEARCH BAR
         ══════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ position: 'relative', zIndex: 1, marginBottom: 'var(--space-md)' }}
      >
        <div style={{ position: 'relative', maxWidth: '100%' }}>
          <Search size={20} style={{
            position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)',
            color: searchFocused ? 'var(--color-primary)' : 'var(--color-text-muted)',
            transition: 'color 0.3s ease',
          }} />
          <input
            type="text"
            placeholder="Cari peralatan outdoor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{
              width: '100%',
              padding: '1rem 1.25rem 1rem 3.25rem',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--color-bg-glass)',
              backdropFilter: 'blur(12px)',
              border: `1px solid ${searchFocused ? 'rgba(0,229,255,0.4)' : 'var(--color-border)'}`,
              boxShadow: searchFocused ? '0 0 24px rgba(0,229,255,0.1)' : 'none',
              color: '#fff',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.3s ease',
            }}
          />
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════
          CATEGORY PILL BAR
         ══════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{ position: 'relative', zIndex: 1, marginBottom: 'var(--space-lg)', overflowX: 'auto', scrollbarWidth: 'none' }}
      >
        <div className="flex items-center gap-sm" style={{ paddingBottom: '0.5rem', minWidth: 'max-content' }}>
          {/* Tombol "Semua" */}
          {[{ id: null, name: 'Semua' }, ...categories].map((cat, i) => {
            const isActive = activeCategoryId === cat.id;
            return (
              <motion.button
                key={cat.id ?? 'semua'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.35 + i * 0.05 }}
                onClick={() => setActiveCategoryId(cat.id ?? null)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.6rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: isActive ? 'rgba(0,229,255,0.1)' : 'transparent',
                  border: `1px solid ${isActive ? 'rgba(0,229,255,0.4)' : 'rgba(255,255,255,0.08)'}`,
                  boxShadow: isActive ? '0 0 16px rgba(0,229,255,0.1)' : 'none',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  whiteSpace: 'nowrap', flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor     = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.color           = 'var(--color-text)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor     = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.color           = 'var(--color-text-muted)';
                  }
                }}
              >
                {categoryIcons[cat.name] ?? <Compass size={18} />}
                {cat.name}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════
          ERROR STATE
         ══════════════════════════════════════════════ */}
      {error && (
        <div style={{
          textAlign: 'center', padding: '3rem',
          color: 'var(--color-text-muted)', position: 'relative', zIndex: 1,
        }}>
          <p style={{ marginBottom: '1rem' }}>{error}</p>
          <button className="btn btn-primary" onClick={fetchProducts}>Coba Lagi</button>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          PRODUCT GRID
         ══════════════════════════════════════════════ */}
      {!error && (
        <motion.div
          layout
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="katalog-grid"
          style={{
            position: 'relative', zIndex: 1, minHeight: '500px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 'var(--space-lg)',
          }}
        >
          {/* ── Skeleton loading ── */}
          {loading && Array.from({ length: 6 }).map((_, i) => (
            <motion.div key={`skel-${i}`} variants={staggerItem}>
              <SkeletonCard />
            </motion.div>
          ))}

          {/* ── Product cards ── */}
          <AnimatePresence mode="popLayout">
            {!loading && products.map((product) => (
              <motion.div
                layout
                variants={staggerItem}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.35 }}
                key={product.id}
              >
                <Link href={`/produk/${product.id}`} style={{ display: 'block', height: '100%' }}>
                  <div
                    className="glass hover-lift"
                    style={{
                      height: '100%', display: 'flex', flexDirection: 'column',
                      borderRadius: 'var(--radius-lg)', overflow: 'hidden',
                      transition: 'all 0.35s ease',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(0,229,255,0.25)';
                      e.currentTarget.style.boxShadow  = '0 0 30px rgba(0,229,255,0.08), 0 8px 32px rgba(0,0,0,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                      e.currentTarget.style.boxShadow  = 'none';
                    }}
                  >
                    {/* Image */}
                    <div className="katalog-card-image" style={{ position: 'relative', height: '230px', width: '100%' }}>
                      <Image
                        src={getProductImage(product)}
                        alt={product.name}
                        fill
                        unoptimized
                        style={{ objectFit: 'cover' }}
                      />
                      <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'linear-gradient(to bottom, transparent 50%, rgba(3,5,8,0.9) 100%)',
                      }} />
                      {/* Category badge */}
                      <div style={{
                        position: 'absolute', top: '0.85rem', right: '0.85rem',
                        background: 'rgba(3,5,8,0.65)', padding: '0.35rem 0.75rem',
                        borderRadius: 'var(--radius-full)', backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        fontSize: '0.72rem', fontWeight: 600, color: '#fff',
                        display: 'flex', alignItems: 'center', gap: '0.3rem',
                      }}>
                        {categoryIcons[product.category.name] ?? <Compass size={14} />}
                        {product.category.name}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="katalog-card-content" style={{ padding: '1.25rem 1.5rem 1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <div className="flex items-center gap-xs" style={{ marginBottom: '0.5rem' }}>
                        <BadgeCheck size={14} color="#4ade80" />
                        <span className="text-muted" style={{ fontSize: '0.78rem', letterSpacing: '0.3px' }}>
                          {product.brand || 'Nexus Outdoor'}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', lineHeight: 1.4, flexGrow: 1, fontWeight: 500 }}>
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between" style={{
                        borderTop: '1px solid rgba(255,255,255,0.07)',
                        paddingTop: '1rem', marginTop: 'auto',
                      }}>
                        <div>
                          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                            Rp {product.default_daily_price.toLocaleString('id-ID')}
                          </span>
                          <span className="text-muted" style={{ fontSize: '0.8rem' }}> /hari</span>
                        </div>
                        {/* Availability badge */}
                        <span style={{
                          fontSize: '0.75rem', fontWeight: 600,
                          color: product.available_units_count > 0 ? '#4ade80' : '#f87171',
                        }}>
                          {product.available_units_count > 0
                            ? `${product.available_units_count} tersedia`
                            : 'Habis'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* ── Empty state ── */}
          {!loading && products.length === 0 && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted"
              style={{
                gridColumn: '1 / -1', padding: '5rem 2rem',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
              }}
            >
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem',
              }}>
                <Search size={32} style={{ opacity: 0.3, color: 'var(--color-primary)' }} />
              </div>
              <p style={{ fontSize: '1.2rem', fontWeight: 500 }}>Tidak ada produk yang cocok</p>
              <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>Coba ubah kata kunci atau kategori pencarian Anda.</p>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
