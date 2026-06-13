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
      name: "Nexus Official",
      isVerified: true,
      rating: 4.9,
    },
    features: ["Kapasitas 4 Orang", "Frame Alloy", "Double Layer", "Anti Badai"],
  },
  {
    id: "p2",
    name: "Tenda Ultralight 2P",
    category: "Tenda",
    pricePerDay: 85000,
    securityDeposit: 400000,
    description: "Tenda kapasitas 2 orang yang sangat ringan (hanya 1.2kg), material nylon silnylon tahan air untuk pergerakan cepat (Fast & Light).",
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80",
    vendor: {
      name: "FastHike Gear",
      isVerified: true,
      rating: 4.8,
    },
    features: ["Kapasitas 2 Orang", "Berat 1.2kg", "Material Silnylon", "Waterproof 5000mm"],
  },
  {
    id: "p3",
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
    id: "p4",
    name: "Carrier Ultralight 40L",
    category: "Carrier",
    pricePerDay: 35000,
    securityDeposit: 200000,
    description: "Tas daypack/carrier 40L tanpa frame rigid, sangat ringan, cocok untuk summit attack atau tektok.",
    image: "/images/gear_backpack.png",
    vendor: {
      name: "FastHike Gear",
      isVerified: true,
      rating: 4.6,
    },
    features: ["Kapasitas 40L", "Frameless", "Roll-top Closure", "Bahan Dyneema"],
  },
  {
    id: "p5",
    name: "Sepatu Trekking Waterproof",
    category: "Pakaian & Sepatu",
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
    id: "p6",
    name: "Jaket Gunung Windproof Gore-Tex",
    category: "Pakaian & Sepatu",
    pricePerDay: 40000,
    securityDeposit: 350000,
    description: "Jaket hardshell anti angin dan air. Didesain untuk menahan hawa dingin ekstrem di puncak gunung dengan sirkulasi udara (pit zips).",
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80",
    vendor: {
      name: "Nexus Official",
      isVerified: true,
      rating: 4.9,
    },
    features: ["Gore-Tex Membran", "Windproof", "Pit Zips (Sirkulasi)", "Hoodie Adjustable"],
  },
  {
    id: "p7",
    name: "Kompor Portable Ultra Light",
    category: "Alat Masak",
    pricePerDay: 15000,
    securityDeposit: 100000,
    description: "Kompor camping lipat ultralight berbahan titanium. Api biru dan sangat stabil, bobot hanya 200 gram.",
    image: "/images/gear_stove.png",
    vendor: {
      name: "Nexus Official",
      isVerified: true,
      rating: 4.8,
    },
    features: ["Bahan Titanium", "Ultralight 200g", "Api Biru Stabil", "Praktis Dilipat"],
  },
  {
    id: "p8",
    name: "Nesting Cooking Set (Anti Lengket)",
    category: "Alat Masak",
    pricePerDay: 20000,
    securityDeposit: 150000,
    description: "Satu set peralatan masak teflon anti lengket. Terdiri dari panci, wajan penggorengan, dan teko air kecil. Pas untuk 3 orang.",
    image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=800&q=80",
    vendor: {
      name: "Outdoor Gear BDG",
      isVerified: true,
      rating: 4.6,
    },
    features: ["Teflon Anti Lengket", "Ringkas (Stackable)", "Kapasitas 3 Orang", "Ringan"],
  },
  {
    id: "p9",
    name: "Sleeping Bag Polar Bulu Tebal",
    category: "Aksesoris & Gear",
    pricePerDay: 25000,
    securityDeposit: 150000,
    description: "Sleeping bag tipe mummy dengan isian polar bulu tebal. Nyaman menahan suhu hingga 0 derajat celcius.",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&q=80",
    vendor: {
      name: "Trekker Sejati",
      isVerified: false,
      rating: 4.4,
    },
    features: ["Tipe Mummy", "Bahan Dalam Polar Bulu", "Limit Suhu 0°C", "Mudah Digulung"],
  },
  {
    id: "p10",
    name: "Trekking Pole Carbon Fiber",
    category: "Aksesoris & Gear",
    pricePerDay: 15000,
    securityDeposit: 100000,
    description: "Sepasang tongkat pendaki berbahan carbon fiber yang sangat kuat namun ringan. Melindungi lutut Anda saat turun gunung.",
    image: "https://images.unsplash.com/photo-1517457211119-21699f8d1671?w=800&q=80",
    vendor: {
      name: "FastHike Gear",
      isVerified: true,
      rating: 4.8,
    },
    features: ["Bahan Carbon Fiber", "Anti-Shock System", "Handle Cork", "Set (2 buah)"],
  },
  {
    id: "p11",
    name: "Headlamp LED 500 Lumens",
    category: "Aksesoris & Gear",
    pricePerDay: 10000,
    securityDeposit: 80000,
    description: "Senter kepala yang sangat terang dengan baterai isi ulang (USB-C). Tahan air ringan, pas untuk summit malam.",
    image: "https://images.unsplash.com/photo-1506544777-64cfbea165c7?w=800&q=80",
    vendor: {
      name: "Nexus Official",
      isVerified: true,
      rating: 4.9,
    },
    features: ["Terang 500 Lumens", "Baterai Cas USB-C", "Tahan Cipratan Air", "Mode Kedip/Merah"],
  }
];

export const getCategories = () => {
  return ["Semua", "Tenda", "Carrier", "Pakaian & Sepatu", "Alat Masak", "Aksesoris & Gear"];
};
