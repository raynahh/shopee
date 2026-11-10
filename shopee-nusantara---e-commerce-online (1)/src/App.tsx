/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { BannerSlider } from './components/BannerSlider';
import { CategoryGrid } from './components/CategoryGrid';
import { FlashSaleSection } from './components/FlashSaleSection';
import { ProductSection } from './components/ProductSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { NotificationDrawer } from './components/NotificationDrawer';
import { PromoVoucherModal } from './components/PromoVoucherModal';
import { Footer } from './components/Footer';
import {
  ALL_PRODUCTS,
  FLASH_SALE_ITEMS,
  VOUCHERS,
  INITIAL_NOTIFICATIONS,
} from './data/mockData';
import { CartItem, Product, Voucher, NotificationItem } from './types';
import { Check, Flame } from 'lucide-react';

export default function App() {
  // Products & Data State
  const [products] = useState<Product[]>(ALL_PRODUCTS);
  const [flashSaleItems] = useState(FLASH_SALE_ITEMS);
  const [vouchers] = useState<Voucher[]>(VOUCHERS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Cart State (Initialized with 1 sample item so user immediately sees active badges)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      product: ALL_PRODUCTS[0],
      quantity: 1,
      selectedVariant: 'Orange White, 42',
      selected: true,
    },
  ]);

  // Filtering & Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modal & Drawer visibility
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isNotifsOpen, setIsNotifsOpen] = useState(false);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(vouchers[0]);

  // Temporary Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1, variant?: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant === variant
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            product,
            quantity,
            selectedVariant: variant,
            selected: true,
          },
        ];
      }
    });
    showToast(`"${product.name.slice(0, 24)}..." berhasil ditambahkan ke keranjang!`);
  };

  const handleBuyNow = (product: Product, quantity = 1, variant?: string) => {
    handleAddToCart(product, quantity, variant);
    setSelectedProductForModal(null);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Produk dihapus dari keranjang.');
  };

  const handleToggleSelect = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleSelectAll = (selected: boolean) => {
    setCartItems((prev) =>
      prev.map((item) => ({ ...item, selected }))
    );
  };

  const handleApplyVoucher = (voucher: Voucher | null) => {
    setAppliedVoucher(voucher);
    if (voucher) {
      showToast(`Voucher ${voucher.code} berhasil diterapkan!`);
    }
  };

  const handleCheckoutSuccess = () => {
    // Clear checked-out items
    setCartItems((prev) => prev.filter((item) => !item.selected));
    showToast('Pesanan berhasil dibuat! Terima kasih telah berbelanja di Shopee Nusantara.');
  };

  // Notification Handlers
  const unreadNotifsCount = notifications.filter((n) => !n.read).length;
  const handleMarkAllNotifsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };
  const handleNotificationClick = (item: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    );
    if (item.type === 'promo') {
      setIsNotifsOpen(false);
      setIsPromoModalOpen(true);
    }
  };

  // Filter products by category and search keyword
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        searchTerm.trim() === '' ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory =
        selectedCategory === 'all' || p.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200 border border-slate-700">
          <div className="w-5 h-5 rounded-full bg-emerald-500 text-slate-900 flex items-center justify-center font-bold">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Header with Search, Cart & Notifs */}
      <Header
        cartCount={totalCartCount}
        unreadNotifsCount={unreadNotifsCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenNotifs={() => setIsNotifsOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSelectProduct={(p) => setSelectedProductForModal(p)}
        allProducts={products}
      />

      <main className="flex-1">
        {/* Banner Promo Slider (Shown when not filtering search query) */}
        {!searchTerm && (
          <BannerSlider
            onSelectCategorySlug={setSelectedCategory}
            onOpenPromoModal={() => setIsPromoModalOpen(true)}
          />
        )}

        {/* 2. Grid Kategori */}
        <CategoryGrid
          selectedCategory={selectedCategory}
          onSelectCategory={(slug) => {
            setSelectedCategory(slug);
            // Scroll smoothly down to product list if category selected
            if (slug !== 'all') {
              const el = document.getElementById('katalog-produk');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />

        {/* 3. Section Flash Sale (Shown when no search filter active) */}
        {!searchTerm && (
          <FlashSaleSection
            items={flashSaleItems}
            allProducts={products}
            onSelectProduct={(p) => setSelectedProductForModal(p)}
          />
        )}

        {/* Active Search / Category Indicator */}
        {(searchTerm || selectedCategory !== 'all') && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <div className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="text-xs text-slate-600">
                Menampilkan hasil untuk:{' '}
                {searchTerm && (
                  <span className="font-bold text-slate-900">"{searchTerm}" </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="font-bold text-[#ee4d2d] uppercase">
                    [{selectedCategory}]
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline"
              >
                Reset Filter
              </button>
            </div>
          </div>
        )}

        {/* 4. Section Produk Terlaris & Rekomendasi */}
        <div id="katalog-produk">
          <ProductSection
            products={filteredProducts}
            onSelectProduct={(p) => setSelectedProductForModal(p)}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </main>

      {/* 5. Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onToggleSelect={handleToggleSelect}
        onSelectAll={handleSelectAll}
        availableVouchers={vouchers}
        appliedVoucher={appliedVoucher}
        onApplyVoucher={handleApplyVoucher}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      <NotificationDrawer
        isOpen={isNotifsOpen}
        onClose={() => setIsNotifsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotifsAsRead}
        onNotificationClick={handleNotificationClick}
      />

      <PromoVoucherModal
        isOpen={isPromoModalOpen}
        onClose={() => setIsPromoModalOpen(false)}
        vouchers={vouchers}
        onApplyVoucher={(v) => {
          handleApplyVoucher(v);
          setIsPromoModalOpen(false);
          setIsCartOpen(true);
        }}
      />
    </div>
  );
}
