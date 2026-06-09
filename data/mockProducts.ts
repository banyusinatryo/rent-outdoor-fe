export interface Product {
  id: string;
  name: string;
  category: string;
  pricePerDay: number;
  securityDeposit: number;
  description: string;
  image: string;
  vendor: {
    name: string;
    isVerified: boolean;
    rating: number;
  };
  features: string[];
}

export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Tenda Premium 4-Season",
    category: "Tenda",
    pricePerDay: 120000,
    securityDeposit: 500000,
    description: "Tenda dome kapasitas 4 orang dengan frame alloy kokoh. Cocok untuk cuaca ekstrem dan badai pegunungan tropis. Sudah termasuk pasak dan tali.",
    image: "/images/gear_tent.png",
    vendor: {
      name: "PeakRent Official",
      isVerified: true,
      rating: 4.9,
    },
    features: ["Kapasitas 4 Orang", "Frame Alloy", "Double Layer", "Anti Badai"],
  },
  {
    id: "p2",
    name: "Carrier 60L Professional",
    category: "Carrier",
    pricePerDay: 45000,
    securityDeposit: 250000,
    description: "Tas gunung (carrier) 60 Liter dengan sistem backsystem ergonomis dan bantalan empuk. Tidak membuat punggung sakit untuk pendakian panjang.",
    image: "/images/gear_backpack.png",
    vendor: {
      name: "Outdoor Gear BDG",
      isVerified: true,
      rating: 4.7,
    },
    features: ["Kapasitas 60L", "Ergonomic Backsystem", "Termasuk Raincover", "Banyak Kantong"],
  },
  {
    id: "p3",
    name: "Sepatu Trekking Waterproof",
    category: "Sepatu",
    pricePerDay: 35000,
    securityDeposit: 300000,
    description: "Sepatu hiking mid-cut dengan lapisan waterproof Gore-Tex dan sole Vibram untuk cengkeraman maksimal di medan licin dan berbatu.",
    image: "/images/gear_shoes.png",
    vendor: {
      name: "Trekker Sejati",
      isVerified: false,
      rating: 4.5,
    },
    features: ["Waterproof", "Sole Vibram", "Mid-Cut Support", "Ukuran 40-44"],
  },
  {
    id: "p4",
    name: "Kompor Portable Ultra Light",
    category: "Alat Masak",
    pricePerDay: 15000,
    securityDeposit: 100000,
    description: "Kompor camping lipat ultralight berbahan titanium. Api biru dan sangat stabil, bobot hanya 200 gram.",
    image: "/images/gear_stove.png",
    vendor: {
      name: "PeakRent Official",
      isVerified: true,
      rating: 4.8,
    },
    features: ["Bahan Titanium", "Ultralight 200g", "Api Biru Stabil", "Praktis Dilipat"],
  }
];

export const getCategories = () => {
  return ["Semua", "Tenda", "Carrier", "Sepatu", "Alat Masak"];
};
