# Roadmap Frontend: PeakRent (Next.js)

Dokumen ini adalah peta jalan (*roadmap*) khusus untuk pengembangan sisi klien (Frontend) dari marketplace sewa alat outdoor "PeakRent". 

Proyek ini dibangun menggunakan **Next.js 16+ (App Router)**, **TypeScript**, dan **Vanilla CSS**.

## Fase 1: Inisialisasi & Setup Lingkungan (✅ Selesai)
- Inisialisasi Next.js dengan arsitektur App Router.
- Pembersihan dependensi (konflik package manager) dan setup folder `public/images` untuk aset.
- Konfigurasi *development server* agar berjalan stabil tanpa error.

## Fase 2: Design System & Core UI (✅ Selesai)
- Pembuatan Global Design System (`globals.css`):
  - Skema warna *Dark/Nature premium* (Deep Forest Green, Charcoal, Vibrant Orange).
  - Integrasi font modern Google (Outfit & Inter).
  - Efek visual *Glassmorphism* (kaca transparan) dan micro-animations (`.hover-lift`).
- Pembuatan komponen *Layout* inti:
  - Navbar transparan yang melayang (Sticky Glass Navbar).
  - Footer komprehensif (navigasi, informasi bisnis, link ke portal Vendor).
- **Halaman Beranda (`/`)**: 
  - Desain *Hero Section* dengan gambar AI fotorealistis.
  - Grid alat terpopuler.
  - Ilustrasi visual alur kerja keamanan ganda (Sistem Escrow P2P).

## Fase 3: Pencarian & Eksplorasi Produk (✅ Selesai)
- Integrasi data simulasi (*Mock Data*) statis sementara di `data/mockProducts.ts`.
- **Halaman Katalog (`/katalog`)**:
  - Filter kategori secara interaktif tanpa *loading* ulang halaman (Client-side filtering).
  - Grid kartu produk yang responsif beserta informasi harga sewa harian.
- **Halaman Detail Produk (`/produk/[id]`)**:
  - Tampilan galeri foto besar, spesifikasi alat, dan status verifikasi Vendor.
  - **Booking Widget (Interaktif)**: Dilengkapi dengan input rentang kalender (Tanggal Ambil & Kembali) dan kalkulasi otomatis untuk menghitung durasi hari sewa, harga total sewa, dan Uang Jaminan (*Security Deposit*).

## Fase 4: Portal Mitra (P2P Vendor) & Autentikasi Pengguna (✅ Selesai)
- Desain Halaman Login & Registrasi yang *modern* (`/login`, `/register`) untuk pelanggan reguler.
- **Landing Page Khusus Vendor (`/vendor`)**: 
  - Halaman untuk meyakinkan toko/pemilik barang lain bergabung ke platform.
  - Penjelasan **Skema Bisnis P2P**: Platform mengenakan **Potongan Komisi (Platform Fee) sebesar 15%** dari setiap transaksi penyewaan yang sukses.
- **Antarmuka Pendaftaran Vendor (`/vendor/register`)**:
  - Formulir pendaftaran toko.
  - Kewajiban mengunggah foto identitas (**KTP & Swafoto**) sebagai syarat utama verifikasi identitas (KYC) demi keamanan ekosistem Escrow.
- Pembuatan *User Dashboard*: Menampilkan profil, riwayat penyewaan, alat yang sedang disewa, dan status pengembalian Uang Jaminan.

## Fase 5: Proses Checkout & Simulasi Pembayaran (✅ Selesai)
- Halaman Keranjang / Ringkasan Pesanan (*Order Summary*).
- Form pengisian data diri dengan metode pengambilan langsung di toko Vendor.
- Antarmuka *Payment Gateway Mockup* (simulasi visual halaman pembayaran pihak ketiga) dan halaman sukses.

## Fase 6: Transisi ke API Laravel (Backend Integration) (⏳ Mendatang)
- Mengganti seluruh `mockProducts.ts` dengan proses *fetching* (`fetch()`) ke REST API Laravel yang akan dibuat nanti.
- Implementasi *State Management* (Zustand/Redux) jika kerumitan keranjang belanja meningkat.
- Autentikasi sungguhan menggunakan *Laravel Sanctum* atau JWT.
