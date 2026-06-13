"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      style={{ 
        position: 'fixed', 
        top: 0, 
        width: '100%', 
        zIndex: 50, 
        padding: isScrolled ? '0.8rem 0' : '1.5rem 0',
        background: isScrolled ? 'rgba(15, 17, 16, 0.8)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
        transition: 'padding 0.3s ease, background 0.3s ease, backdrop-filter 0.3s ease'
      }} 
    >
      <div className="container flex items-center justify-between">
        <Link href="/">
          <span style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-0.5px' }} className="text-gradient-primary">
            PeakRent.
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="flex items-center gap-md hide-on-mobile" style={{ fontWeight: 500 }}>
          <Link href="/katalog" className="text-muted hover:text-white" style={{ transition: 'color 0.2s' }}>Katalog</Link>
          <Link href="/cara-kerja" className="text-muted hover:text-white" style={{ transition: 'color 0.2s' }}>Cara Kerja</Link>
          <Link href="/tentang" className="text-muted hover:text-white" style={{ transition: 'color 0.2s' }}>Tentang</Link>
        </div>

        <div className="flex items-center gap-sm hide-on-mobile">
          <Link href="/login" className="btn btn-outline" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
            Log In
          </Link>
          <Link href="/register" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
            Mulai Sewa
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="show-on-mobile"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ color: 'var(--color-text)' }}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="glass show-on-mobile"
          style={{ 
            position: 'absolute', 
            top: '100%', 
            left: 0, 
            width: '100%', 
            padding: '1.5rem',
            borderTop: '1px solid var(--color-border)',
            borderBottom: '1px solid var(--color-border)'
          }}
        >
          <div className="flex flex-col gap-sm">
            <Link href="/katalog" className="text-muted" onClick={() => setIsMobileMenuOpen(false)}>Katalog</Link>
            <Link href="/cara-kerja" className="text-muted" onClick={() => setIsMobileMenuOpen(false)}>Cara Kerja</Link>
            <Link href="/tentang" className="text-muted" onClick={() => setIsMobileMenuOpen(false)}>Tentang</Link>
            <hr style={{ borderColor: 'var(--color-border)', margin: '0.5rem 0' }} />
            <Link href="/login" className="btn btn-outline" style={{ justifyContent: 'center' }} onClick={() => setIsMobileMenuOpen(false)}>Log In</Link>
            <Link href="/register" className="btn btn-primary" style={{ justifyContent: 'center' }} onClick={() => setIsMobileMenuOpen(false)}>Mulai Sewa</Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
