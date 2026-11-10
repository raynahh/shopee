import { Category, FlashSaleItem, NotificationItem, Product, Voucher } from '../types';

export const HERO_BANNERS = [
  {
    id: 'b1',
    image: '/src/assets/images/banner_mega_sale_1794275540163.jpg',
    title: 'Shopee Mega Sale Festival',
    subtitle: 'Diskon Terbesar s/d 80% + Gratis Ongkir Rp0',
    tag: 'FESTIVAL 11.11',
    link: '#promo'
  },
  {
    id: 'b2',
    image: '/src/assets/images/banner_gadget_promo_1794275541466.jpg',
    title: 'Gadget & Electronic Day',
    subtitle: 'Earbuds, Smartwatch & Ponsel Flagship Cicilan 0%',
    tag: 'SUPER BRAND DAY',
    link: '#elektronik'
  }
];

export const QUICK_SERVICES = [
  { id: 'qs1', label: 'Gratis Ongkir XTRA', icon: 'Truck', color: 'text-amber-600', bg: 'bg-amber-50' },
  { id: 'qs2', label: 'Shopee Mall', icon: 'ShieldCheck', color: 'text-red-600', bg: 'bg-red-50' },
  { id: 'qs3', label: 'Pulsa & Tagihan', icon: 'Smartphone', color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'qs4', label: 'Murah Lebay', icon: 'Flame', color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 'qs5', label: 'Shopee Supermarket', icon: 'ShoppingBag', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 'qs6', label: 'Voucher & Diskon', icon: 'TicketPercent', color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 'qs7', label: 'Elektronik Center', icon: 'Laptop', color: 'text-cyan-600', bg: 'bg-cyan-50' },
  { id: 'qs8', label: 'Semua Promo', icon: 'Sparkles', color: 'text-rose-600', bg: 'bg-rose-50' },
];

export const CATEGORIES: Category[] = [
  { id: 'c1', name: 'Elektronik', iconName: 'Tv', slug: 'elektronik', itemCount: '14.2k Produk', accentBg: 'from-orange-500/10 to-amber-500/10' },
  { id: 'c2', name: 'Fashion Pria', iconName: 'Shirt', slug: 'fashion-pria', itemCount: '28.5k Produk', accentBg: 'from-blue-500/10 to-indigo-500/10' },
  { id: 'c3', name: 'Fashion Wanita', iconName: 'Sparkles', slug: 'fashion-wanita', itemCount: '42.1k Produk', accentBg: 'from-pink-500/10 to-rose-500/10' },
  { id: 'c4', name: 'Handphone & Aksesoris', iconName: 'Smartphone', slug: 'handphone', itemCount: '19.8k Produk', accentBg: 'from-purple-500/10 to-violet-500/10' },
  { id: 'c5', name: 'Kecantikan', iconName: 'HeartHandshake', slug: 'kecantikan', itemCount: '31.4k Produk', accentBg: 'from-rose-500/10 to-orange-500/10' },
  { id: 'c6', name: 'Perlengkapan Rumah', iconName: 'Home', slug: 'rumah-tangga', itemCount: '22.0k Produk', accentBg: 'from-emerald-500/10 to-teal-500/10' },
  { id: 'c7', name: 'Makanan & Minuman', iconName: 'Utensils', slug: 'makanan-minuman', itemCount: '15.9k Produk', accentBg: 'from-amber-500/10 to-yellow-500/10' },
  { id: 'c8', name: 'Olahraga & Outdoor', iconName: 'Dumbbell', slug: 'olahraga', itemCount: '9.3k Produk', accentBg: 'from-cyan-500/10 to-blue-500/10' },
  { id: 'c9', name: 'Otomotif', iconName: 'Car', slug: 'otomotif', itemCount: '8.1k Produk', accentBg: 'from-slate-500/10 to-zinc-500/10' },
  { id: 'c10', name: 'Voucher & Topup', iconName: 'Ticket', slug: 'voucher', itemCount: '5.4k Promo', accentBg: 'from-red-500/10 to-orange-500/10' },
];

export const FLASH_SALE_ITEMS: FlashSaleItem[] = [
  {
    id: 'fs1',
    productId: 'p1',
    name: 'Sneakers Sporty Ultra-Light Runner Pro Orange White',
    image: '/src/assets/images/product_sneakers_1794275541193.jpg',
    originalPrice: 499000,
    promoPrice: 189000,
    discountPercent: 62,
    soldPercent: 88,
    stockLeft: 12,
    isMall: true,
  },
  {
    id: 'fs2',
    productId: 'p2',
    name: 'Wireless ANC Over-Ear Headphones Studio Edition Hi-Res Audio',
    image: '/src/assets/images/product_headphones_1794275542209.jpg',
    originalPrice: 899000,
    promoPrice: 349000,
    discountPercent: 61,
    soldPercent: 94,
    stockLeft: 6,
    isMall: true,
  },
  {
    id: 'fs3',
    productId: 'p3',
    name: 'TWS True Wireless Stereo Bass Booster IPX5 Waterproof',
    image: '/src/assets/images/banner_gadget_promo_1794275541466.jpg',
    originalPrice: 299000,
    promoPrice: 119000,
    discountPercent: 60,
    soldPercent: 79,
    stockLeft: 21,
    isMall: false,
  },
  {
    id: 'fs4',
    productId: 'p4',
    name: 'Smartwatch AMOLED Display Heart Rate & SpO2 Monitor',
    image: '/src/assets/images/banner_gadget_promo_1794275541466.jpg',
    originalPrice: 650000,
    promoPrice: 279000,
    discountPercent: 57,
    soldPercent: 85,
    stockLeft: 15,
    isMall: true,
  },
  {
    id: 'fs5',
    productId: 'p5',
    name: 'Hoodie Oversize Heavyweight Fleece 330gsm Warm Sunset Edition',
    image: '/src/assets/images/product_sneakers_1794275541193.jpg',
    originalPrice: 320000,
    promoPrice: 145000,
    discountPercent: 55,
    soldPercent: 91,
    stockLeft: 8,
    isMall: false,
  },
  {
    id: 'fs6',
    productId: 'p6',
    name: 'Fast Charging Power Bank 20000mAh Dual USB-C PD 30W',
    image: '/src/assets/images/banner_mega_sale_1794275540163.jpg',
    originalPrice: 259000,
    promoPrice: 99000,
    discountPercent: 62,
    soldPercent: 73,
    stockLeft: 27,
    isMall: true,
  }
];

export const ALL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Sneakers Sporty Ultra-Light Runner Pro Orange White',
    category: 'fashion-pria',
    originalPrice: 499000,
    price: 189000,
    discountPercent: 62,
    rating: 4.9,
    reviewCount: 1420,
    soldCount: 3820,
    soldText: '3.8rb Terjual',
    image: '/src/assets/images/product_sneakers_1794275541193.jpg',
    badge: 'Mall',
    freeShipping: true,
    location: 'Kota Jakarta Barat',
    stock: 50,
    description: 'Sepatu running kasual pria & wanita dengan bantalan EVA ultra empuk dan sol karet anti-slip berdaya cengkeram tinggi. Bahan mesh bersirkulasi udara mencegah bau kaki.',
    variants: [
      { name: 'Warna', options: ['Orange White', 'Pure White', 'Triple Black'] },
      { name: 'Ukuran', options: ['39', '40', '41', '42', '43', '44'] }
    ]
  },
  {
    id: 'p2',
    name: 'Wireless ANC Over-Ear Headphones Studio Edition Hi-Res Audio',
    category: 'elektronik',
    originalPrice: 899000,
    price: 349000,
    discountPercent: 61,
    rating: 4.8,
    reviewCount: 980,
    soldCount: 2450,
    soldText: '2.4rb Terjual',
    image: '/src/assets/images/product_headphones_1794275542209.jpg',
    badge: 'Mall',
    freeShipping: true,
    location: 'Kota Tangerang',
    stock: 35,
    description: 'Headphone Bluetooth 5.3 dengan Active Noise Cancelling hingga 35dB, daya tahan baterai hingga 50 jam nonstop pemakaian, dan bantalan telinga memory foam ekstra nyaman.',
    variants: [
      { name: 'Warna', options: ['Matte Charcoal', 'Warm White', 'Navy Blue'] }
    ]
  },
  {
    id: 'p3',
    name: 'TWS True Wireless Stereo Bass Booster IPX5 Waterproof',
    category: 'elektronik',
    originalPrice: 299000,
    price: 119000,
    discountPercent: 60,
    rating: 4.7,
    reviewCount: 3200,
    soldCount: 8900,
    soldText: '8.9rb Terjual',
    image: '/src/assets/images/banner_gadget_promo_1794275541466.jpg',
    badge: 'Star+',
    freeShipping: true,
    location: 'Kota Surabaya',
    stock: 120,
    description: 'Earbuds wireless latency rendah untuk gaming & musik, driver dinamis 13mm dengan bass bertenaga, mikrofon ENC ganda untuk panggilan suara jernih tanpa bising.',
    variants: [
      { name: 'Warna', options: ['Midnight Black', 'Glossy White'] }
    ]
  },
  {
    id: 'p4',
    name: 'Smartwatch AMOLED Display Heart Rate & SpO2 Monitor',
    category: 'elektronik',
    originalPrice: 650000,
    price: 279000,
    discountPercent: 57,
    rating: 4.9,
    reviewCount: 850,
    soldCount: 1950,
    soldText: '1.9rb Terjual',
    image: '/src/assets/images/banner_gadget_promo_1794275541466.jpg',
    badge: 'Mall',
    freeShipping: true,
    location: 'Kota Jakarta Utara',
    stock: 45,
    description: 'Jam tangan pintar berlayar AMOLED 1.43 inch Always-on Display, 120+ mode olahraga, pelacak detak jantung 24 jam, notifikasi WhatsApp dan panggilan Bluetooth.',
    variants: [
      { name: 'Strap', options: ['Silicone Black', 'Leather Brown', 'Orange Sport'] }
    ]
  },
  {
    id: 'p5',
    name: 'Kemeja Linen Casual Pria Lengan Panjang Breathable Minimalist',
    category: 'fashion-pria',
    originalPrice: 220000,
    price: 99000,
    discountPercent: 55,
    rating: 4.8,
    reviewCount: 2150,
    soldCount: 5600,
    soldText: '5.6rb Terjual',
    image: '/src/assets/images/product_sneakers_1794275541193.jpg',
    badge: 'Star+',
    freeShipping: true,
    location: 'Kota Bandung',
    stock: 80,
    description: 'Kemeja pria bahan katun linen premium sejuk, jatuh di badan dan tidak mudah kusut. Sangat cocok untuk suasana kerja santai, kuliah, maupun hangout akhir pekan.',
    variants: [
      { name: 'Warna', options: ['Broken White', 'Sage Green', 'Terracotta', 'Navy'] },
      { name: 'Ukuran', options: ['M', 'L', 'XL', 'XXL'] }
    ]
  },
  {
    id: 'p6',
    name: 'Serum Wajah Brightening Niacinamide 10% + Zinc Glowing Glow',
    category: 'kecantikan',
    originalPrice: 155000,
    price: 79000,
    discountPercent: 49,
    rating: 4.9,
    reviewCount: 4100,
    soldCount: 12500,
    soldText: '12.5rb Terjual',
    image: '/src/assets/images/banner_mega_sale_1794275540163.jpg',
    badge: 'Mall',
    freeShipping: true,
    location: 'Kota Jakarta Selatan',
    stock: 200,
    description: 'Serum pencerah kulit wajah dengan formula ringan cepat meresap. Membantu menyamarkan noda hitam bekas jerawat, meratakan warna kulit, dan mengontrol minyak berlebih.',
    variants: [
      { name: 'Ukuran', options: ['20ml', '50ml (Hemat)'] }
    ]
  },
  {
    id: 'p7',
    name: 'Air Fryer Digital Kapasitas 4.5L Low Watt 650W Touchscreen',
    category: 'rumah-tangga',
    originalPrice: 750000,
    price: 369000,
    discountPercent: 51,
    rating: 4.8,
    reviewCount: 1640,
    soldCount: 3100,
    soldText: '3.1rb Terjual',
    image: '/src/assets/images/banner_gadget_promo_1794275541466.jpg',
    badge: 'Mall',
    freeShipping: true,
    location: 'Kota Bekasi',
    stock: 28,
    description: 'Penggoreng tanpa minyak otomatis dengan wadah anti lengket food-grade. Mengurangi lemak hingga 85%, dilengkapi 8 program memasak pintar untuk ayam, kentang, dan kue.',
    variants: [
      { name: 'Warna', options: ['Piano Black', 'Matte White'] }
    ]
  },
  {
    id: 'p8',
    name: 'Tumbler Stainless Steel Termos Tahan Dingin Panas 24 Jam 900ml',
    category: 'rumah-tangga',
    originalPrice: 180000,
    price: 85000,
    discountPercent: 53,
    rating: 4.9,
    reviewCount: 5200,
    soldCount: 15300,
    soldText: '15.3rb Terjual',
    image: '/src/assets/images/product_headphones_1794275542209.jpg',
    badge: 'Star',
    freeShipping: true,
    location: 'Kota Semarang',
    stock: 95,
    description: 'Botol minum tumbler stainless SUS 304 berdinding vakum ganda dengan sedotan silikon reusable. Bebas BPA, anti bocor, dan pas di cup holder mobil.',
    variants: [
      { name: 'Warna', options: ['Sunset Orange', 'Olive Green', 'Matte Black', 'Pastel Pink'] }
    ]
  },
  {
    id: 'p9',
    name: 'Dress Floral Wanita Elegan Midi Korean Style Vintage Casual',
    category: 'fashion-wanita',
    originalPrice: 240000,
    price: 115000,
    discountPercent: 52,
    rating: 4.8,
    reviewCount: 1890,
    soldCount: 4200,
    soldText: '4.2rb Terjual',
    image: '/src/assets/images/banner_mega_sale_1794275540163.jpg',
    badge: 'Star+',
    freeShipping: true,
    location: 'Kota Yogyakarta',
    stock: 60,
    description: 'Midi dress motif bunga vintage yang feminin dan anggun. Terbuat dari katun rayon lembut adem dengan tali pinggang yang bisa disesuaikan lekuk tubuh.',
    variants: [
      { name: 'Ukuran', options: ['All Size Fit to L', 'XL'] }
    ]
  },
  {
    id: 'p10',
    name: 'Paket Kopi Robusta & Arabica Espresso Blend 500gr Fresh Roast',
    category: 'makanan-minuman',
    originalPrice: 95000,
    price: 49000,
    discountPercent: 48,
    rating: 4.9,
    reviewCount: 3100,
    soldCount: 9400,
    soldText: '9.4rb Terjual',
    image: '/src/assets/images/product_sneakers_1794275541193.jpg',
    badge: 'Star+',
    freeShipping: true,
    location: 'Kab. Malang',
    stock: 150,
    description: 'Biji kopi pilihan perkebunan Nusantara disangrai fresh harian tingkat medium-dark roast. Karakter rasa cokelat karamel tebal dengan crema melimpah.',
    variants: [
      { name: 'Gilingan', options: ['Biji Utuh', 'Giling Halus (Espresso)', 'Giling Sedang (V60/Tubruk)'] }
    ]
  },
  {
    id: 'p11',
    name: 'Helm Motor Retro Bogo Kulit Sni Kaca Cembung Smoke Shield',
    category: 'otomotif',
    originalPrice: 260000,
    price: 129000,
    discountPercent: 50,
    rating: 4.7,
    reviewCount: 2450,
    soldCount: 6800,
    soldText: '6.8rb Terjual',
    image: '/src/assets/images/product_headphones_1794275542209.jpg',
    badge: 'Star',
    freeShipping: true,
    location: 'Kota Bogor',
    stock: 40,
    description: 'Helm bogo model klasik berstandar SNI dengan lapisan kulit sintetis premium tahan cuaca. Busa dalam tebal lembut dapat dilepas dan dicuci.',
    variants: [
      { name: 'Warna', options: ['Coklat Tua Vintage', 'Hitam Doff', 'Krem Karamel'] }
    ]
  },
  {
    id: 'p12',
    name: 'Voucher Google Play & Diamond Game Mobile Legends / FF Instant',
    category: 'voucher',
    originalPrice: 100000,
    price: 88000,
    discountPercent: 12,
    rating: 5.0,
    reviewCount: 7800,
    soldCount: 28400,
    soldText: '28.4rb Terjual',
    image: '/src/assets/images/banner_gadget_promo_1794275541466.jpg',
    badge: 'Mall',
    freeShipping: true,
    location: 'Jakarta Pusat',
    stock: 999,
    description: 'Kode voucher digital resmi langsung masuk via email & notifikasi aplikasi dalam 5 detik setelah pembayaran sukses. Aman, terpercaya dan bergaransi.',
    variants: [
      { name: 'Nominal', options: ['Rp50.000', 'Rp100.000', 'Rp250.000'] }
    ]
  }
];

export const VOUCHERS: Voucher[] = [
  {
    id: 'v1',
    code: 'ONGKIRNOL',
    title: 'Gratis Ongkir Min. Belanja Rp0',
    minSpend: 0,
    discountText: 'Diskon Ongkir s/d Rp20.000',
    type: 'shipping',
    expiresIn: 'Berlaku s/d Besok'
  },
  {
    id: 'v2',
    code: 'SHOPEE50K',
    title: 'Voucher Diskon Spesial 50RB',
    minSpend: 150000,
    discountText: 'Potongan Langsung Rp50.000',
    type: 'discount',
    expiresIn: 'Tersisa 3 jam'
  },
  {
    id: 'v3',
    code: 'CASHBACK10',
    title: 'Cashback Koin Shopee 10%',
    minSpend: 50000,
    discountText: 'Cashback koin s/d 25.000 Koin',
    type: 'cashback',
    expiresIn: 'Berlaku s/d Akhir Pekan'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: '⚡ Flash Sale Kilat Dimulai!',
    message: 'Sneakers Sporty & ANC Headphones diskon hingga 62%. Buruan sebelum kehabisan!',
    time: '5 menit yang lalu',
    read: false,
    type: 'promo',
    icon: 'Flame'
  },
  {
    id: 'n2',
    title: '🎁 Voucher Baru Masuk ke Akunmu',
    message: 'Voucher Gratis Ongkir Rp0 dan Potongan Rp50.000 siap kamu pakai saat checkout.',
    time: '1 jam yang lalu',
    read: false,
    type: 'promo',
    icon: 'Ticket'
  },
  {
    id: 'n3',
    title: '📦 Pesanan #SN-8921 Sedang Dikirim',
    message: 'Kurir SiCepat sedang menuju alamatmu. Estimasi tiba hari ini sebelum 17:00.',
    time: '3 jam yang lalu',
    read: true,
    type: 'order',
    icon: 'Truck'
  }
];
