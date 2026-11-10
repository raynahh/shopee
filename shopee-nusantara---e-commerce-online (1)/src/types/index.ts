export interface Product {
  id: string;
  name: string;
  category: string;
  originalPrice: number;
  price: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  soldCount: number;
  soldText: string;
  image: string;
  badge?: 'Mall' | 'Star+' | 'Star' | 'Super';
  freeShipping: boolean;
  location: string;
  stock: number;
  description: string;
  variants?: {
    name: string;
    options: string[];
  }[];
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  slug: string;
  itemCount: string;
  accentBg: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedVariant?: string;
  selected: boolean;
}

export interface FlashSaleItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  originalPrice: number;
  promoPrice: number;
  discountPercent: number;
  soldPercent: number;
  stockLeft: number;
  isMall?: boolean;
}

export interface Voucher {
  id: string;
  code: string;
  title: string;
  minSpend: number;
  discountText: string;
  type: 'shipping' | 'cashback' | 'discount';
  expiresIn: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'promo' | 'wallet';
  icon: string;
}
