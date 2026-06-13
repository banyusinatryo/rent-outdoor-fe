"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Tent, Backpack, Shirt, Flame, Compass, BadgeCheck, SlidersHorizontal } from 'lucide-react';
import { mockProducts, getCategories } from '@/data/mockProducts';

const categoryIcons: Record<string, React.ReactNode> = {
  "Semua": <Compass size={18} />,
  "Tenda": <Tent size={18} />,
  "Carrier": <Backpack size={18} />,
  "Pakaian & Sepatu": <Shirt size={18} />,
  "Alat Masak": <Flame size={18} />,
  "Aksesoris & Gear": <SlidersHorizontal size={18} />
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.3 }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } }
};

export default function Katalog() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const categories = getCategories();

  const filteredProducts = mockProducts.filter(p => {
    const matchCategory = activeCategory === 'Semua' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: 'var(--space-xl)', position: 'relative', overflow: 'hidden' }}>

      {/* ── Neon Blob Backgrounds ── */}
      <div style={{
        position: 'absolute', top: '-80px', left: '-10%', width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 65%)',
        borderRadius: '50%', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', top: '-40px', right: '-5%', width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(255,85,0,0.1) 0%, transparent 65%)',
        borderRadius: '50%', filter: 'blur(80px)', zIndex: 0, pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', top: '200px', left: '40%', width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(50px)', zIndex: 0, pointerEvents: 'none'
      }} />

      {/* ══════════════════════════════════════════════
          HEADER AREA
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
            style={{
              padding: '0.6rem 1.5rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(0,229,255,0.4)',
              boxShadow: '0 0 20px rgba(0,229,255,0.12), inset 0 0 12px rgba(0,229,255,0.05)',
              whiteSpace: 'nowrap'
            }}
          >
            <span style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.95rem' }}>
              {filteredProducts.length} Alat Ditemukan
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
            transition: 'color 0.3s ease'
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
              boxShadow: searchFocused ? '0 0 24px rgba(0,229,255,0.1), 0 0 60px rgba(0,229,255,0.04)' : 'none',
              color: '#fff',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
          />
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════
          HORIZONTAL CATEGORY PILL BAR
         ══════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          position: 'relative', zIndex: 1,
          marginBottom: 'var(--space-lg)',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div className="flex items-center gap-sm" style={{
          paddingBottom: '0.5rem',
          minWidth: 'max-content'
        }}>
          {categories.map((cat, i) => {
            const isActive = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.35 + i * 0.05 }}
                onClick={() => setActiveCategory(cat)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
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
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.color = 'var(--color-text)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.color = 'var(--color-text-muted)';
                  }
                }}
              >
                {categoryIcons[cat]}
                {cat}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════════
          PRODUCT GRID
         ══════════════════════════════════════════════ */}
      <motion.div
        layout
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 gap-md"
        style={{ position: 'relative', zIndex: 1, minHeight: '500px' }}
      >
        <AnimatePresence mode='popLayout'>
          {filteredProducts.map((product) => (
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
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    transition: 'all 0.35s ease',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0,229,255,0.25)';
                    e.currentTarget.style.boxShadow = '0 0 30px rgba(0,229,255,0.08), 0 8px 32px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Image Container */}
                  <div style={{ position: 'relative', height: '230px', width: '100%' }}>
                    <Image src={product.image} alt={product.name} fill unoptimized style={{ objectFit: 'cover' }} />
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                      background: 'linear-gradient(to bottom, transparent 50%, rgba(3,5,8,0.9) 100%)'
                    }} />

                    {/* Category Badge */}
                    <div style={{
                      position: 'absolute', top: '0.85rem', right: '0.85rem',
                      background: 'rgba(3,5,8,0.65)',
                      padding: '0.35rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      letterSpacing: '0.2px'
                    }}>
                      {categoryIcons[product.category]} {product.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '1.25rem 1.5rem 1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <div className="flex items-center gap-xs" style={{ marginBottom: '0.5rem' }}>
                      <BadgeCheck size={14} color="#4ade80" />
                      <span className="text-muted" style={{ fontSize: '0.78rem', letterSpacing: '0.3px' }}>Nexus Outdoor</span>
                    </div>
                    <h3 style={{
                      fontSize: '1.1rem',
                      marginBottom: '1rem',
                      lineHeight: 1.4,
                      flexGrow: 1,
                      fontWeight: 500
                    }}>
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between" style={{
                      borderTop: '1px solid rgba(255,255,255,0.07)',
                      paddingTop: '1rem',
                      marginTop: 'auto'
                    }}>
                      <div>
                        <span style={{
                          fontSize: '1.25rem',
                          fontWeight: 700,
                          color: 'var(--color-primary)',
                        }}>
                          Rp {product.pricePerDay.toLocaleString('id-ID')}
                        </span>
                        <span className="text-muted" style={{ fontSize: '0.8rem' }}> /hr</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted"
            style={{
              gridColumn: '1 / -1',
              padding: '5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            <div style={{
              width: '80px', height: '80px',
              borderRadius: '50%',
              background: 'rgba(0,229,255,0.05)',
              border: '1px solid rgba(0,229,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '0.5rem'
            }}>
              <Search size={32} style={{ opacity: 0.3, color: 'var(--color-primary)' }} />
            </div>
            <p style={{ fontSize: '1.2rem', fontWeight: 500 }}>Tidak ada produk yang cocok</p>
            <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>Coba ubah kata kunci atau kategori pencarian Anda.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
