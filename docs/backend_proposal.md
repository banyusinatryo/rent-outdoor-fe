# Proposal Struktur Backend — Syarat Ketentuan & FAQ

Dokumen ini berisi usulan struktur database (skema tabel) dan API endpoint untuk mengelola konten dinamis halaman **Syarat & Ketentuan** serta **FAQ** pada aplikasi Nexus Outdoor.

---

## 1. Halaman Syarat & Ketentuan

### Skema Tabel Database: `terms_and_conditions`
Tabel ini digunakan untuk menyimpan poin-poin syarat dan ketentuan sewa secara terstruktur.

| Nama Kolom | Tipe Data | Deskripsi |
|---|---|---|
| `id` | `BIGINT` (PK, Auto Increment) | ID unik data. |
| `title` | `VARCHAR(255)` | Judul poin, misal: "Ketentuan Umum", "Jaminan Identitas". |
| `content` | `TEXT` | Detail deskripsi atau sub-poin dalam format Markdown/HTML sederhana. |
| `sort_order` | `INT` | Urutan tampilan di halaman (semakin kecil, tampil semakin di atas). |
| `is_active` | `BOOLEAN` (Default: `true`) | Status aktif/nonaktif syarat tersebut. |
| `created_at` | `TIMESTAMP` | Waktu dibuat. |
| `updated_at` | `TIMESTAMP` | Waktu diperbarui. |

### API Endpoints
1. **Dapatkan Semua Syarat & Ketentuan (Public/Frontend)**
   - **Method**: `GET`
   - **Endpoint**: `/api/v1/terms`
   - **Response (`200 OK`)**:
     ```json
     {
       "success": true,
       "data": [
         {
           "id": 1,
           "title": "Persyaratan Identitas",
           "content": "Penyewa wajib menitipkan identitas asli yang sah (KTP/SIM/STNK) di toko fisik kami selama masa peminjaman alat berlangsung.",
           "sort_order": 1
         },
         {
           "id": 2,
           "title": "Keterlambatan Pengembalian",
           "content": "Keterlambatan pengembalian alat akan dikenakan denda sesuai dengan tarif daily price per alat untuk setiap hari keterlambatan.",
           "sort_order": 2
         }
       ]
     }
     ```

2. **Manajemen Admin (Protected/Admin)**
   - `POST /api/v1/admin/terms` (Tambah syarat baru)
   - `PUT /api/v1/admin/terms/{id}` (Edit syarat)
   - `DELETE /api/v1/admin/terms/{id}` (Hapus/Deaktifkan syarat)

---

## 2. Halaman FAQ (Frequently Asked Questions)

### Skema Tabel Database: `faqs`
Tabel ini menyimpan pertanyaan yang sering diajukan beserta jawabannya, dipisahkan berdasarkan kategori.

| Nama Kolom | Tipe Data | Deskripsi |
|---|---|---|
| `id` | `BIGINT` (PK, Auto Increment) | ID unik data. |
| `category` | `VARCHAR(100)` | Kategori pertanyaan, misal: "Penyewaan", "Pembayaran", "Pengembalian". |
| `question` | `TEXT` | Pertanyaan yang diajukan oleh pengguna. |
| `answer` | `TEXT` | Jawaban dari pertanyaan tersebut. |
| `sort_order` | `INT` | Urutan tampilan di halaman. |
| `is_active` | `BOOLEAN` (Default: `true`) | Status aktif/nonaktif FAQ. |
| `created_at` | `TIMESTAMP` | Waktu dibuat. |
| `updated_at` | `TIMESTAMP` | Waktu diperbarui. |

### API Endpoints
1. **Dapatkan Semua FAQ (Public/Frontend)**
   - **Method**: `GET`
   - **Endpoint**: `/api/v1/faqs`
   - **Response (`200 OK`)**:
     ```json
     {
       "success": true,
       "data": [
         {
           "id": 1,
           "category": "Penyewaan",
           "question": "Apakah saya harus datang ke toko untuk mengambil barang?",
           "answer": "Ya, untuk saat ini pengambilan dan pengembalian barang wajib dilakukan langsung di toko fisik Nexus Outdoor untuk memverifikasi jaminan identitas asli Anda.",
           "sort_order": 1
         },
         {
           "id": 2,
           "category": "Pembayaran",
           "question": "Metode pembayaran apa saja yang didukung?",
           "answer": "Kami mendukung pembayaran melalui Transfer Bank BCA, scan QRIS, e-wallet (GoPay, OVO, Dana), serta pembayaran tunai langsung di toko.",
           "sort_order": 2
         }
       ]
     }
     ```

2. **Manajemen Admin (Protected/Admin)**
   - `POST /api/v1/admin/faqs` (Tambah FAQ baru)
   - `PUT /api/v1/admin/faqs/{id}` (Edit FAQ)
   - `DELETE /api/v1/admin/faqs/{id}` (Hapus/Deaktifkan FAQ)
