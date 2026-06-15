/**
 * lib/auth.ts
 * Token management untuk autentikasi customer via localStorage.
 * Semua operasi token harus melalui helper ini agar mudah diganti
 * ke httpOnly cookie di masa depan jika diperlukan.
 */

const TOKEN_KEY = "nexus_token";
const CUSTOMER_KEY = "nexus_customer";

import type { Customer } from "./types";

// ─── Token ────────────────────────────────────────────────────────────────────

/** Simpan token ke localStorage */
export function saveToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

/** Ambil token dari localStorage. Mengembalikan null jika tidak ada. */
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

/** Hapus token dari localStorage (logout) */
export function removeToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}

/** Cek apakah user sedang login (token ada di localStorage) */
export function isLoggedIn(): boolean {
  return getToken() !== null;
}

// ─── Customer Data ────────────────────────────────────────────────────────────

/** Simpan data customer ke localStorage */
export function saveCustomer(customer: Customer): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));
}

/** Ambil data customer dari localStorage */
export function getCustomer(): Customer | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(CUSTOMER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Customer;
  } catch {
    return null;
  }
}

/** Hapus data customer dari localStorage */
export function removeCustomer(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CUSTOMER_KEY);
}

// ─── Combined Auth Actions ────────────────────────────────────────────────────

/** Simpan token + data customer sekaligus (dipanggil setelah login/register) */
export function setAuth(token: string, customer: Customer): void {
  saveToken(token);
  saveCustomer(customer);
}

/** Hapus semua data auth (dipanggil saat logout) */
export function clearAuth(): void {
  removeToken();
  removeCustomer();
}
