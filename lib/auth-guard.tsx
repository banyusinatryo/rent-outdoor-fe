"use client";

/**
 * lib/auth-guard.tsx
 * Proteksi route sisi-klien. Next.js middleware tidak dipakai karena token
 * disimpan di localStorage (tidak terbaca di server/edge). Hook ini mengecek
 * status login saat mount; jika belum login, redirect ke /login dengan membawa
 * URL halaman saat ini agar bisa kembali setelah login berhasil.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { isLoggedIn } from "./auth";

/** Mengembalikan true bila user sudah login & halaman aman dirender. */
export function useRequireAuth(): boolean {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
      setReady(true);
      return;
    }
    const dest = window.location.pathname + window.location.search;
    router.replace(`/login?redirect=${encodeURIComponent(dest)}`);
  }, [router]);

  return ready;
}

/** Loader layar penuh selama pengecekan auth / proses redirect. */
export function RouteLoader() {
  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Loader2 size={32} className="animate-spin" style={{ color: "var(--color-primary)" }} />
    </div>
  );
}

/**
 * Ambil tujuan redirect dari query string (?redirect=...).
 * Dipakai login/register untuk kembali ke halaman asal. Hanya path internal
 * yang diizinkan (mencegah open-redirect ke domain luar).
 */
export function getRedirectTarget(fallback = "/"): string {
  if (typeof window === "undefined") return fallback;
  const raw = new URLSearchParams(window.location.search).get("redirect");
  if (!raw) return fallback;
  // hanya izinkan path relatif yang diawali satu "/" (bukan "//" atau URL absolut)
  if (raw.startsWith("/") && !raw.startsWith("//")) return raw;
  return fallback;
}
