/**
 * lib/types.ts
 * TypeScript interfaces untuk semua API response dari Nexus Outdoor backend.
 * Didasarkan pada API_DOCUMENTATION.md.
 */

// ─── Base Response Shape ──────────────────────────────────────────────────────

export interface ApiSuccess<T> {
  success: true;
  message?: string;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  success: true;
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

// ─── Category ─────────────────────────────────────────────────────────────────

export interface ApiCategory {
  id: number;
  name: string;
  code_prefix: string;
}

export type CategoriesResponse = ApiSuccess<ApiCategory[]>;

// ─── Product ──────────────────────────────────────────────────────────────────

export interface PricingTier {
  days: number;
  price: number;
}

export interface ApiProduct {
  id: number;
  name: string;
  brand: string;
  description: string;
  default_daily_price: number;
  pricing_tiers: PricingTier[];
  checklist_template: unknown[];
  category: ApiCategory;
  available_units_count: number;
}

export type ProductsResponse = PaginatedResponse<ApiProduct>;
export type ProductDetailResponse = ApiSuccess<ApiProduct>;

/**
 * Mapping kategori name → path gambar statis di /public/images.
 * Fallback karena API tidak mengembalikan field image.
 */
export const CATEGORY_IMAGE_MAP: Record<string, string> = {
  Tenda: "/images/gear_tent.png",
  Carrier: "/images/gear_backpack.png",
  "Pakaian & Sepatu": "/images/gear_shoes.png",
  "Alat Masak": "/images/gear_stove.png",
  "Aksesoris & Gear": "/images/gear_tent.png",
};

/** Mengambil gambar produk berdasarkan kategori (fallback ke placeholder) */
export function getProductImage(product: ApiProduct): string {
  return CATEGORY_IMAGE_MAP[product.category.name] ?? "/images/gear_tent.png";
}

/** Menghitung harga sewa berdasarkan tier atau harga per hari */
export function calculateRentalPrice(product: ApiProduct, days: number): number {
  if (days <= 0) return 0;
  
  // Cari exact match di pricing tiers
  const tier = product.pricing_tiers.find((t) => t.days === days);
  if (tier) return tier.price;
  
  // Fallback: daily price × days
  return product.default_daily_price * days;
}

// ─── Availability ─────────────────────────────────────────────────────────────

export interface AvailableUnit {
  id: number;
  unit_code: string;
  product: ApiProduct;
  status: InventoryUnitStatus;
  status_label: string;
  condition_notes: string | null;
}

export interface AvailabilityData {
  product_id: number;
  product_name: string;
  start_date: string;
  end_date: string;
  rental_days: number;
  default_daily_price: number;
  tier_price: number | null;
  available_units_count: number;
  available_units: AvailableUnit[];
  is_available: boolean;
}

export type AvailabilityResponse = ApiSuccess<AvailabilityData>;

// ─── Customer / Auth ──────────────────────────────────────────────────────────

export type CustomerStatus = "UNVERIFIED" | "VERIFIED" | "BLACKLISTED";

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string | null;
  emergency_contact_name?: string | null;
  emergency_contact_phone?: string | null;
  status: CustomerStatus;
}

export interface AuthData {
  customer: Customer;
  token: string;
}

export type AuthResponse = ApiSuccess<AuthData>;
export type MeResponse = ApiSuccess<Customer>;

// ─── Rental ───────────────────────────────────────────────────────────────────

export type RentalStatus =
  | "BOOKING_REQUEST"
  | "DP_PAID"
  | "PREPARED"
  | "WAITING_FULL_PAYMENT"
  | "ONGOING"
  | "RETURNED_PENDING_CHECK"
  | "COMPLETED"
  | "CANCELLED"
  | "OVERDUE";

export const RENTAL_STATUS_LABEL: Record<RentalStatus, string> = {
  BOOKING_REQUEST: "Booking Request",
  DP_PAID: "DP Dibayar",
  PREPARED: "Siap Diambil",
  WAITING_FULL_PAYMENT: "Menunggu Pelunasan",
  ONGOING: "Sedang Disewa",
  RETURNED_PENDING_CHECK: "Dikembalikan - Dalam Pemeriksaan",
  COMPLETED: "Selesai",
  CANCELLED: "Dibatalkan",
  OVERDUE: "Terlambat",
};

export const RENTAL_STATUS_COLOR: Record<RentalStatus, string> = {
  BOOKING_REQUEST: "gray",
  DP_PAID: "warning",
  PREPARED: "info",
  WAITING_FULL_PAYMENT: "warning",
  ONGOING: "success",
  RETURNED_PENDING_CHECK: "danger",
  COMPLETED: "success",
  CANCELLED: "gray",
  OVERDUE: "danger",
};

export interface RentalItem {
  id: number;
  inventory_unit: AvailableUnit;
  daily_price: number;
  rental_days: number;
  subtotal: number;
  condition_before: string | null;
  condition_after: string | null;
  status_after_return: string | null;
  damage_fee: number;
}

export interface Rental {
  id: number;
  rental_code: string;
  customer_id: number;
  start_date: string;
  end_date: string;
  actual_return_date: string | null;
  status: RentalStatus;
  status_label: string;
  status_color: string;
  subtotal: number;
  discount_amount: number;
  dp_amount: number;
  paid_amount: number;
  remaining_amount: number;
  late_fee: number;
  damage_fee: number;
  cleaning_fee: number;
  total_amount: number;
  notes: string | null;
  items: RentalItem[];
  payments: Payment[];
  created_at: string;
}

export type RentalsResponse = PaginatedResponse<Rental>;
export type RentalDetailResponse = ApiSuccess<Rental>;

// ─── Payment ──────────────────────────────────────────────────────────────────

export type PaymentType = "DP" | "FULL_PAYMENT" | "ADDITIONAL_FEE";
export type PaymentStatus = "PENDING_VERIFICATION" | "VERIFIED" | "REJECTED";
export type PaymentMethod = "CASH" | "BANK_TRANSFER" | "QRIS" | "EWALLET";

export const PAYMENT_METHOD_LABEL: Record<PaymentMethod, string> = {
  CASH: "Cash",
  BANK_TRANSFER: "Bank Transfer",
  QRIS: "QRIS",
  EWALLET: "E-Wallet",
};

export interface Payment {
  id: number;
  type: PaymentType;
  type_label: string;
  status: PaymentStatus;
  status_label: string;
  amount: number;
  payment_method: PaymentMethod;
  payment_method_label: string;
  payment_date: string;
  proof_image_url: string;
  notes: string | null;
  verified_at: string | null;
}

export type PaymentResponse = ApiSuccess<Payment>;
export type PaymentsListResponse = ApiSuccess<Payment[]>;

// ─── Review ───────────────────────────────────────────────────────────────────

export interface Review {
  id: number;
  rental_id: number;
  customer: Pick<Customer, "id" | "name">;
  product_id: number;
  rating: number;
  comment: string | null;
  created_at: string;
}

export interface ProductReviewsData {
  product_id: number;
  product_name: string;
  average_rating: number;
  total_reviews: number;
  reviews: Review[];
}

export type ReviewsResponse = ApiSuccess<ProductReviewsData> & {
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
};

export type ReviewSubmitResponse = ApiSuccess<Review[]>;

// ─── Inventory Unit Status ────────────────────────────────────────────────────

export type InventoryUnitStatus =
  | "READY"
  | "RESERVED"
  | "RENTED"
  | "RETURNED_PENDING_CHECK"
  | "MAINTENANCE"
  | "LOST"
  | "RETIRED";
