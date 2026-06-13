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

export default function Katalog() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = getCategories();

  const filteredProducts = mockProducts.filter(p => {
    const matchCategory = activeCategory === 'Semua' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: 'var(--space-xl)', position: 'relative' }}>
      
      {/* Background Effect for Header */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '80%', height: '300px', background: 'radial-gradient(ellipse at top, rgba(255,107,53,0.15) 0%, transparent 70%)', zIndex: -1, pointerEvents: 'none' }} />

      <div className="flex items-center justify-between flex-wrap gap-sm" style={{ marginBottom: 'var(--space-lg)' }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <h1 style={{ fontSize: '3rem', letterSpacing: '-1px', marginBottom: '0.5rem' }}>
            Eksplorasi <span className="text-gradient-primary">Katalog</span>
          </h1>
          <p className="text-muted" style={{ fontSize: '1.1rem' }}>Temukan peralatan premium untuk petualangan Anda.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="glass" style={{ padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(255,107,53,0.3)' }}>
          <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{filteredProducts.length} Alat Ditemukan</span>
        </motion.div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '280px 1fr', gap: 'var(--space-xl)', alignItems: 'start' }}>
        
        {/* Sidebar Filter */}
        <motion.aside 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass" 
          style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', position: 'sticky', top: '100px' }}
        >
          {/* Search Bar */}
          <div style={{ position: 'relative', marginBottom: '2rem' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            <input 
              type="text" 
              placeholder="Cari alat..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ 
                width: '100%', padding: '0.8rem 1rem 0.8rem 2.8rem', borderRadius: 'var(--radius-full)', 
                background: 'rgba(0,0,0,0.2)', border: '1px solid var(--color-border)', color: '#fff', outline: 'none'
              }} 
            />
          </div>

          <h3 style={{ marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)' }}>Kategori</h3>
          <div className="flex flex-col gap-xs" style={{ marginBottom: '2rem' }}>
            {categories.map(cat => {
              const isActive = activeCategory === cat;
              return (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    textAlign: 'left', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                    backgroundColor: isActive ? 'rgba(255,107,53,0.1)' : 'transparent',
                    border: `1px solid ${isActive ? 'rgba(255,107,53,0.3)' : 'transparent'}`,
                    color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                    fontWeight: isActive ? 600 : 400,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if(!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if(!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {categoryIcons[cat]}
                  {cat}
                </button>
              );
            })}
          </div>

          <h3 style={{ marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--color-text-muted)' }}>Rentang Harga</h3>
          <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>Rp 10.000 - Rp 200.000+</p>
          <input type="range" min="10000" max="200000" style={{ width: '100%', accentColor: 'var(--color-primary)' }} />
        </motion.aside>

        {/* Product Grid */}
        <motion.div layout className="grid grid-cols-3 gap-md" style={{ minHeight: '500px' }}>
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map(product => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.3 }}
                key={product.id}
              >
                <Link href={`/produk/${product.id}`} style={{ display: 'block', height: '100%' }}>
                  <div className="glass hover-lift" style={{ 
                    height: '100%', display: 'flex', flexDirection: 'column',
                    borderRadius: 'var(--radius-lg)', overflow: 'hidden', transition: 'all 0.3s',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}>
                    {/* Image Container */}
                    <div style={{ position: 'relative', height: '220px', width: '100%' }}>
                      <Image src={product.image} alt={product.name} fill unoptimized style={{ objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(15,17,16,0.9) 100%)' }} />
                      
                      <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(15,17,16,0.7)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-full)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        {categoryIcons[product.category]} {product.category}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div style={{ padding: '1.5rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <div className="flex items-center gap-xs" style={{ marginBottom: '0.5rem' }}>
                        {product.vendor.isVerified && <BadgeCheck size={14} color="#4ade80" />}
                        <span className="text-muted" style={{ fontSize: '0.8rem' }}>{product.vendor.name}</span>
                      </div>
                      <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', lineHeight: 1.4, flexGrow: 1 }}>{product.name}</h3>
                      <div className="flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', marginTop: 'auto' }}>
                        <div>
                          <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-accent)' }}>
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
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center text-muted" style={{ gridColumn: '1 / -1', padding: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
            >
              <Search size={48} style={{ opacity: 0.2 }} />
              <p style={{ fontSize: '1.2rem' }}>Tidak ada produk yang cocok dengan pencarian Anda.</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
