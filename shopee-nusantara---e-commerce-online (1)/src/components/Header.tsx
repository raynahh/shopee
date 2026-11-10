import React, { useState } from 'react';
import {
  Search,
  ShoppingCart,
  Bell,
  HelpCircle,
  Globe,
  Smartphone,
  User,
  ShoppingBag,
  X
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { Product } from '../types';
import { formatRupiah } from '../utils/formatters';

interface HeaderProps {
  cartCount: number;
  unreadNotifsCount: number;
  onOpenCart: () => void;
  onOpenNotifs: () => void;
  searchTerm: string;
  onSearchChange: (query: string) => void;
  onSelectProduct: (product: Product) => void;
  allProducts: Product[];
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  unreadNotifsCount,
  onOpenCart,
  onOpenNotifs,
  searchTerm,
  onSearchChange,
  onSelectProduct,
  allProducts,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchSuggestions = allProducts.filter(p =>
    searchTerm.trim() !== '' && p.name.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5);

  const popularKeywords = [
    'Sneakers Runner',
    'Headphone ANC',
    'TWS Bass',
    'Smartwatch AMOLED',
    'Serum Wajah',
    'Air Fryer'
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-gradient-to-b from-[#f53d2d] to-[#ff5722] text-white shadow-md">
      {/* Top Utility Bar (Shopee style top navigation) */}
      <div className="border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between text-xs text-white/90">
          <div className="flex items-center gap-4">
            <span className="hover:text-white cursor-pointer transition-colors">Seller Centre</span>
            <span className="text-white/40">|</span>
            <span className="hover:text-white cursor-pointer transition-colors">Mulai Jual</span>
            <span className="text-white/40">|</span>
            <span className="hover:text-white cursor-pointer transition-colors flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5" />
              Download Aplikasi
            </span>
            <span className="text-white/40">|</span>
            <span className="hover:text-white cursor-pointer transition-colors">Ikuti Kami</span>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={onOpenNotifs}
              className="hover:text-white transition-colors flex items-center gap-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
            >
              <div className="relative">
                <Bell className="w-3.5 h-3.5" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-300 rounded-full" />
                )}
              </div>
              <span>Notifikasi</span>
            </button>
            <span className="hover:text-white cursor-pointer transition-colors flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" />
              Bantuan
            </span>
            <span className="hover:text-white cursor-pointer transition-colors flex items-center gap-1">
              <Globe className="w-3.5 h-3.5" />
              Bahasa Indonesia
            </span>
            <span className="text-white/40">|</span>
            <div className="flex items-center gap-2 font-medium cursor-pointer hover:text-white">
              <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                R
              </div>
              <span>Rayhan A.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-3">
        <div className="flex items-center gap-4 lg:gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0 cursor-pointer" onClick={() => onSearchChange('')}>
            <div className="w-10 h-10 rounded-xl bg-white text-[#ee4d2d] flex items-center justify-center shadow-md">
              <ShoppingBag className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="leading-tight">
              <div className="text-xl lg:text-2xl font-extrabold tracking-tight flex items-center">
                <span>Shopee</span>
                <span className="text-yellow-300 text-sm lg:text-base font-bold ml-1">Nusantara</span>
              </div>
              <p className="text-[10px] text-white/80 font-medium tracking-wider hidden sm:block">BELANJA ONLINE TERPERCAYA</p>
            </div>
          </div>

          {/* Search Bar Container */}
          <div className="flex-1 relative">
            <div className="relative flex items-center bg-white rounded-md shadow-sm p-1">
              <input
                type="text"
                placeholder="Diskon s/d 80% | Cari sepatu running, TWS wireless, air fryer..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full px-3 py-1.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="p-1 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                className="bg-[#ee4d2d] hover:bg-[#d83c1d] text-white px-5 py-2 rounded text-sm font-medium flex items-center justify-center transition-colors shrink-0 shadow-sm"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Quick keywords under search bar */}
            <div className="hidden lg:flex items-center gap-3 mt-1.5 text-xs text-white/85 overflow-hidden whitespace-nowrap">
              {popularKeywords.map((kw) => (
                <button
                  key={kw}
                  onClick={() => onSearchChange(kw)}
                  className="hover:text-yellow-200 transition-colors cursor-pointer text-left focus:outline-none"
                >
                  {kw}
                </button>
              ))}
            </div>

            {/* Search Suggestion Dropdown */}
            {isSearchFocused && searchSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-slate-200 z-50 overflow-hidden divide-y divide-slate-100">
                <div className="px-4 py-2 bg-slate-50 text-xs font-semibold text-slate-500">
                  Hasil Pencarian Produk ({searchSuggestions.length})
                </div>
                {searchSuggestions.map((product) => (
                  <div
                    key={product.id}
                    onMouseDown={() => onSelectProduct(product)}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-orange-50/60 cursor-pointer transition-colors"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 object-cover rounded bg-slate-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{product.name}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-semibold text-[#ee4d2d]">{formatRupiah(product.price)}</span>
                        <span className="text-slate-400 line-through">{formatRupiah(product.originalPrice)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Icons (Install App, Cart & Notifications) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Install to Home Screen Button */}
            <PWAInstallButton />

            {/* Mobile Notification Button */}
            <button
              onClick={onOpenNotifs}
              className="md:hidden relative p-2 text-white hover:text-yellow-200 transition-colors focus:outline-none"
              aria-label="Lihat Notifikasi"
            >
              <Bell className="w-6 h-6" />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-yellow-300 text-[#ee4d2d] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadNotifsCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-white hover:text-yellow-200 transition-colors flex items-center gap-2 rounded-lg hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Lihat Keranjang Belanja"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-white text-[#ee4d2d] border border-[#ee4d2d] text-xs font-bold rounded-full px-1.5 min-w-[20px] h-5 flex items-center justify-center shadow-md animate-pulse">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold hidden sm:inline-block">Keranjang</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
