"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, LayoutDashboard, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCustomer, clearAuth } from '@/lib/auth';
import { logoutCustomer } from '@/lib/api';
import type { Customer } from '@/lib/types';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sinkronkan status login setiap navigasi & saat localStorage berubah (tab lain)
  useEffect(() => {
    setCustomer(getCustomer());
    const sync = () => setCustomer(getCustomer());
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await logoutCustomer();
    } catch {
      /* token mungkin sudah invalid — tetap lanjut bersihkan sesi lokal */
    }
    clearAuth();
    setCustomer(null);
    setIsMobileMenuOpen(false);
    router.push('/');
  };

  const firstName = customer?.name?.split(' ')[0] ?? '';

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      style={{ 
        position: 'fixed', 
        top: isScrolled ? '1rem' : 0, 
        left: 0,
        right: 0,
        margin: '0 auto',
        width: '100%', 
        maxWidth: isScrolled ? '850px' : '1200px',
        zIndex: 50, 
        padding: isScrolled ? '0.8rem var(--nav-padding-x, 2.5rem)' : '1.5rem 1rem',
        background: isScrolled ? 'rgba(3, 5, 8, 0.75)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(24px)' : 'none',
        border: isScrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        borderRadius: isScrolled ? 'var(--radius-full)' : '0',
        boxShadow: isScrolled ? 'var(--shadow-glow)' : 'none',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }} 
    >
      <div className="flex items-center justify-between" style={{ width: '100%' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '130px', height: '40px', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>
            <Image 
              src="/images/nexus logo.png" 
              alt="Nexus Outdoor" 
              fill 
              style={{ objectFit: 'contain', objectPosition: 'left' }}
              priority
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="flex items-center hide-on-mobile" style={{ fontWeight: 500, gap: '2rem', fontSize: '1rem', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>
          <Link href="/katalog" className="text-muted hover:text-white" style={{ transition: 'color 0.2s' }}>Katalog</Link>
          <Link href="/cara-kerja" className="text-muted hover:text-white" style={{ transition: 'color 0.2s' }}>Cara Kerja</Link>
          <Link href="/tentang" className="text-muted hover:text-white" style={{ transition: 'color 0.2s' }}>Tentang</Link>
        </div>

        <div className="flex items-center hide-on-mobile" style={{ gap: '1rem' }}>
          {customer ? (
            <>
              <Link href="/dashboard" className="btn btn-outline" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem', gap: '0.4rem' }}>
                <LayoutDashboard size={16} /> {firstName || 'Dashboard'}
              </Link>
              <button onClick={handleLogout} className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem', gap: '0.4rem' }}>
                <LogOut size={16} /> Keluar
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-outline" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                Log In
              </Link>
              <Link href="/register" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                Mulai Sewa
              </Link>
            </>
          )}
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
          className="show-on-mobile"
          style={{ 
            position: 'absolute', 
            top: '100%', 
            left: '0.75rem', 
            width: 'calc(100% - 1.5rem)', 
            padding: '1.5rem',
            background: 'rgba(10, 13, 20, 0.98)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            marginTop: '0.5rem',
            boxShadow: 'var(--shadow-glow)'
          }}
        >
          <div className="flex flex-col gap-sm">
            <Link href="/katalog" className="text-muted" onClick={() => setIsMobileMenuOpen(false)}>Katalog</Link>
            <Link href="/cara-kerja" className="text-muted" onClick={() => setIsMobileMenuOpen(false)}>Cara Kerja</Link>
            <Link href="/tentang" className="text-muted" onClick={() => setIsMobileMenuOpen(false)}>Tentang</Link>
            <hr style={{ borderColor: 'var(--color-border)', margin: '0.5rem 0' }} />
            {customer ? (
              <>
                <Link href="/dashboard" className="btn btn-outline" style={{ justifyContent: 'center', gap: '0.4rem' }} onClick={() => setIsMobileMenuOpen(false)}><LayoutDashboard size={16} /> Dashboard</Link>
                <Link href="/profile" className="text-muted" onClick={() => setIsMobileMenuOpen(false)}>Profil Saya</Link>
                <button onClick={handleLogout} className="btn btn-primary" style={{ justifyContent: 'center', gap: '0.4rem' }}><LogOut size={16} /> Keluar</button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn btn-outline" style={{ justifyContent: 'center' }} onClick={() => setIsMobileMenuOpen(false)}>Log In</Link>
                <Link href="/register" className="btn btn-primary" style={{ justifyContent: 'center' }} onClick={() => setIsMobileMenuOpen(false)}>Mulai Sewa</Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
