/**
 * lib/api.ts
 * Central API client untuk Nexus Outdoor REST API.
 * Semua fetching ke backend Laravel harus melalui helper ini.
 */

// Base URL diambil dari environment variable.
// Set NEXT_PUBLIC_API_URL di file .env.local (lokal) atau environment hosting.
export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://admin-nexus.codiroom.tech/api/v1";

// ─── Core Fetch Helper ────────────────────────────────────────────────────────

interface ApiFetchOptions extends RequestInit {
  token?: string;
}

/**
 * Generic fetch wrapper dengan default headers & error handling konsisten.
 * Melempar error jika response bukan 2xx.
 */
export async function apiFetch<T = unknown>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const { token, headers: customHeaders, ...rest } = options;

  const headers: HeadersInit = {
    Accept: "application/json",
    ...customHeaders,
  };

  // Inject Authorization header jika token tersedia
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  // Jangan set Content-Type jika body adalah FormData (multipart)
  if (!(rest.body instanceof FormData)) {
    (headers as Record<string, string>)["Content-Type"] = "application/json";
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...rest,
    headers,
  });

  const json = await response.json();

  if (!response.ok) {
    // Lempar object JSON agar bisa di-catch dan diparse komponen
    throw json;
  }

  return json as T;
}

// ─── Authenticated Fetch ──────────────────────────────────────────────────────

/**
 * Fetch dengan token dari localStorage secara otomatis.
 * Gunakan ini untuk endpoint yang butuh auth.
 */
export async function authFetch<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  let token: string | null = null;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("nexus_token");
  }

  return apiFetch<T>(endpoint, { ...options, token: token ?? undefined });
}

// ─── Public API Functions ─────────────────────────────────────────────────────

/** GET /categories */
export const getCategories = () => apiFetch<import("./types").CategoriesResponse>("/categories");

/** GET /products */
export const getProducts = (params?: {
  category_id?: number;
  search?: string;
  per_page?: number;
  page?: number;
}) => {
  const query = new URLSearchParams();
  if (params?.category_id) query.set("category_id", String(params.category_id));
  if (params?.search) query.set("search", params.search);
  if (params?.per_page) query.set("per_page", String(params.per_page));
  if (params?.page) query.set("page", String(params.page));

  const qs = query.toString();
  return apiFetch<import("./types").ProductsResponse>(`/products${qs ? `?${qs}` : ""}`);
};

/** GET /products/:id */
export const getProduct = (id: number) =>
  apiFetch<import("./types").ProductDetailResponse>(`/products/${id}`);

/** GET /products/:id/availability */
export const getProductAvailability = (
  id: number,
  startDate: string,
  endDate: string
) =>
  apiFetch<import("./types").AvailabilityResponse>(
    `/products/${id}/availability?start_date=${startDate}&end_date=${endDate}`
  );

/** GET /products/:id/reviews */
export const getProductReviews = (id: number, page = 1) =>
  apiFetch<import("./types").ReviewsResponse>(`/products/${id}/reviews?per_page=10&page=${page}`);

// ─── Auth API Functions ───────────────────────────────────────────────────────

/** POST /register */
export const registerCustomer = (body: {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  address?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
}) =>
  apiFetch<import("./types").AuthResponse>("/register", {
    method: "POST",
    body: JSON.stringify(body),
  });

/** POST /login */
export const loginCustomer = (body: { email: string; password: string }) =>
  apiFetch<import("./types").AuthResponse>("/login", {
    method: "POST",
    body: JSON.stringify(body),
  });

/** POST /logout */
export const logoutCustomer = () =>
  authFetch<{ success: boolean; message: string }>("/logout", {
    method: "POST",
  });

/** GET /me */
export const getMe = () =>
  authFetch<import("./types").MeResponse>("/me");

/** PUT /me */
export const updateMe = (body: {
  name?: string;
  phone?: string;
  address?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
}) =>
  authFetch<import("./types").MeResponse>("/me", {
    method: "PUT",
    body: JSON.stringify(body),
  });

// ─── Booking / Rental API Functions ──────────────────────────────────────────

/** POST /bookings */
export const createBooking = (body: {
  start_date: string;
  end_date: string;
  items: { inventory_unit_id: number; rental_days: number }[];
  notes?: string;
}) =>
  authFetch<import("./types").RentalDetailResponse>("/bookings", {
    method: "POST",
    body: JSON.stringify(body),
  });

/** GET /my-rentals */
export const getMyRentals = (page = 1) =>
  authFetch<import("./types").RentalsResponse>(`/my-rentals?per_page=10&page=${page}`);

/** GET /my-rentals/:id */
export const getMyRental = (id: number) =>
  authFetch<import("./types").RentalDetailResponse>(`/my-rentals/${id}`);

/** POST /my-rentals/:id/cancel */
export const cancelRental = (id: number) =>
  authFetch<import("./types").RentalDetailResponse>(`/my-rentals/${id}/cancel`, {
    method: "POST",
  });

// ─── Payment API Functions ────────────────────────────────────────────────────

/** POST /payments (multipart/form-data) */
export const uploadPayment = (formData: FormData) =>
  authFetch<import("./types").PaymentResponse>("/payments", {
    method: "POST",
    body: formData,
  });

/** GET /my-rentals/:rentalId/payments */
export const getRentalPayments = (rentalId: number) =>
  authFetch<import("./types").PaymentsListResponse>(`/my-rentals/${rentalId}/payments`);

// ─── Review API Functions ─────────────────────────────────────────────────────

/** POST /my-rentals/:rentalId/review */
export const submitReview = (
  rentalId: number,
  reviews: { product_id: number; rating: number; comment?: string }[]
) =>
  authFetch<import("./types").ReviewSubmitResponse>(`/my-rentals/${rentalId}/review`, {
    method: "POST",
    body: JSON.stringify({ reviews }),
  });
