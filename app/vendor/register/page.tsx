"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function VendorRegister() {
  const [formData, setFormData] = useState({
    shopName: '',
    email: '',
    phone: '',
    bankName: '',
    accountNumber: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Pendaftaran Vendor Berhasil! Tunggu verifikasi admin 1x24 Jam.");
  };

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: 'var(--space-xl)', maxWidth: '800px' }}>
      <div className="text-center" style={{ marginBottom: 'var(--space-lg)' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Daftar Sebagai Mitra Vendor</h1>
        <p className="text-muted">Lengkapi data di bawah ini untuk mulai menyewakan barang Anda secara aman.</p>
      </div>

      <div className="glass animate-fade-in" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-md">
          
          {/* Bagian 1: Data Toko */}
          <div>
            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem', color: '#4ade80' }}>1. Informasi Toko/Individu</h3>
            <div className="grid grid-cols-2 gap-sm" style={{ marginBottom: '1rem' }}>
              <div className="flex flex-col gap-xs">
                <label className="text-muted" style={{ fontSize: '0.9rem' }}>Nama Toko / Nama Anda</label>
                <input required type="text" placeholder="Masukkan nama toko" style={{ padding: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: '#fff' }} />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="text-muted" style={{ fontSize: '0.9rem' }}>Email Aktif</label>
                <input required type="email" placeholder="email@contoh.com" style={{ padding: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: '#fff' }} />
              </div>
            </div>
            <div className="flex flex-col gap-xs">
              <label className="text-muted" style={{ fontSize: '0.9rem' }}>Nomor WhatsApp / Telepon</label>
              <input required type="tel" placeholder="08123456789" style={{ padding: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: '#fff' }} />
            </div>
          </div>

          {/* Bagian 2: Data Pencairan Dana */}
          <div>
            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem', color: '#4ade80' }}>2. Rekening Pencairan (Withdrawal)</h3>
            <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>Rekening ini akan digunakan untuk mengirim pendapatan 85% Anda.</p>
            <div className="grid grid-cols-2 gap-sm">
              <div className="flex flex-col gap-xs">
                <label className="text-muted" style={{ fontSize: '0.9rem' }}>Nama Bank</label>
                <select required style={{ padding: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: '#fff' }}>
                  <option value="">-- Pilih Bank --</option>
                  <option value="BCA">BCA</option>
                  <option value="Mandiri">Mandiri</option>
                  <option value="BNI">BNI</option>
                  <option value="BRI">BRI</option>
                </select>
              </div>
              <div className="flex flex-col gap-xs">
                <label className="text-muted" style={{ fontSize: '0.9rem' }}>Nomor Rekening</label>
                <input required type="text" placeholder="Masukkan No. Rekening" style={{ padding: '0.8rem', borderRadius: 'var(--radius-sm)', background: 'var(--color-bg)', border: '1px solid var(--color-border)', color: '#fff' }} />
              </div>
            </div>
          </div>

          {/* Bagian 3: Verifikasi Identitas KYC */}
          <div>
            <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem', color: '#4ade80' }}>3. Verifikasi Keamanan (KYC)</h3>
            <div className="grid grid-cols-2 gap-sm">
              <div className="flex flex-col gap-xs" style={{ background: 'var(--color-bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px dashed var(--color-border)' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>Upload Foto KTP</label>
                <p className="text-muted" style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>Wajib jelas dan terbaca. Maksimal 5MB.</p>
                <input required type="file" accept="image/*" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }} />
              </div>
              <div className="flex flex-col gap-xs" style={{ background: 'var(--color-bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px dashed var(--color-border)' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>Upload Selfie dengan KTP</label>
                <p className="text-muted" style={{ fontSize: '0.8rem', marginBottom: '1rem' }}>Wajah Anda dan KTP harus terlihat jelas dalam 1 frame.</p>
                <input required type="file" accept="image/*" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }} />
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <label className="flex items-center gap-xs" style={{ cursor: 'pointer', marginBottom: '1.5rem' }}>
              <input required type="checkbox" style={{ width: '18px', height: '18px', accentColor: '#4ade80' }} />
              <span className="text-muted" style={{ fontSize: '0.9rem' }}>Saya setuju dengan Syarat & Ketentuan Kemitraan Nexus Outdoor serta potongan komisi platform sebesar 15%.</span>
            </label>
            <button type="submit" className="btn" style={{ background: '#4ade80', color: '#0f1110', width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
              Kirim Pendaftaran
            </button>
          </div>
        </form>
      </div>

      <div className="text-center" style={{ marginTop: '2rem' }}>
        <p className="text-muted" style={{ fontSize: '0.9rem' }}>Sudah terdaftar sebagai mitra? <Link href="/login" style={{ color: '#4ade80', fontWeight: 600 }}>Login di sini</Link></p>
      </div>
    </div>
  );
}
