"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { mockProducts, getCategories } from '@/data/mockProducts';

export default function Katalog() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const categories = getCategories();

  const filteredProducts = activeCategory === 'Semua' 
    ? mockProducts 
    : mockProducts.filter(p => p.category === activeCategory);

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: 'var(--space-xl)' }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-lg)' }}>
        <div>
          <h1 style={{ fontSize: '3rem', letterSpacing: '-1px', marginBottom: '0.5rem' }}>
            Eksplorasi <span className="text-gradient-primary">Katalog</span>
          </h1>
          <p className="text-muted">Temukan peralatan yang tepat untuk petualangan Anda selanjutnya.</p>
        </div>
        <div className="glass" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)' }}>
          <span style={{ fontWeight: 600 }}>{filteredProducts.length} Alat Ditemukan</span>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: '250px 1fr', gap: 'var(--space-lg)', alignItems: 'start' }}>
        {/* Sidebar Filter */}
        <aside className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', position: 'sticky', top: '100px' }}>
          <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Kategori</h3>
          <div className="flex flex-col gap-xs">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{ 
                  textAlign: 'left', 
                  padding: '0.5rem', 
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: activeCategory === cat ? 'var(--color-primary)' : 'transparent',
                  color: activeCategory === cat ? '#fff' : 'var(--color-text-muted)',
                  fontWeight: activeCategory === cat ? 600 : 400,
                  transition: 'all 0.2s'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Rentang Harga</h3>
          <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>Semua Harga</p>
          <input type="range" min="10000" max="200000" style={{ width: '100%', accentColor: 'var(--color-primary)' }} />
          <div className="flex justify-between text-muted" style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
            <span>Rp 10rb</span>
            <span>Rp 200rb+</span>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="grid grid-cols-3 gap-md">
          {filteredProducts.map(product => (
            <Link href={`/produk/${product.id}`} key={product.id}>
              <div className="glass hover-lift" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', transition: 'transform 0.3s' }}>
                <div style={{ position: 'relative', height: '200px' }}>
                  <Image src={product.image} alt={product.name} fill unoptimized style={{ objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--color-bg-glass)', padding: '0.2rem 0.8rem', borderRadius: 'var(--radius-full)', backdropFilter: 'blur(8px)', fontSize: '0.8rem', fontWeight: 600 }}>
                    {product.category}
                  </div>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <div className="flex items-center gap-xs" style={{ marginBottom: '0.5rem' }}>
                    {product.vendor.isVerified && <span style={{ color: '#4ade80', fontSize: '0.8rem' }}>✓</span>}
                    <span className="text-muted" style={{ fontSize: '0.8rem' }}>{product.vendor.name}</span>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', lineHeight: 1.3 }}>{product.name}</h3>
                  <div className="flex items-center justify-between" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                    <div>
                      <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                        Rp {product.pricePerDay.toLocaleString('id-ID')}
                      </span>
                      <span className="text-muted" style={{ fontSize: '0.8rem' }}> /hr</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {filteredProducts.length === 0 && (
            <div className="text-center text-muted" style={{ gridColumn: '1 / -1', padding: '4rem' }}>
              Tidak ada produk di kategori ini.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
