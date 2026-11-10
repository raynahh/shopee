import React, { useState } from 'react';
import { Star, Truck, MapPin, Plus, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';
import { formatRupiah } from '../utils/formatters';

interface ProductSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

type SortOption = 'rekomendasi' | 'terlaris' | 'termurah' | 'tertinggi' | 'diskon';

export const ProductSection: React.FC<ProductSectionProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  selectedCategory,
  onSelectCategory,
}) => {
  const [activeSort, setActiveSort] = useState<SortOption>('rekomendasi');
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const sortProducts = (list: Product[]) => {
    const copy = [...list];
    switch (activeSort) {
      case 'terlaris':
        return copy.sort((a, b) => b.soldCount - a.soldCount);
      case 'termurah':
        return copy.sort((a, b) => a.price - b.price);
      case 'tertinggi':
        return copy.sort((a, b) => b.price - a.price);
      case 'diskon':
        return copy.sort((a, b) => b.discountPercent - a.discountPercent);
      case 'rekomendasi':
      default:
        return copy.sort((a, b) => b.rating - a.rating);
    }
  };

  const sortedProducts = sortProducts(products);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, e);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 1200);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      {/* Section Sticky / Interactive Filter Header */}
      <div className="bg-white rounded-xl shadow-xs border border-slate-100 p-4 mb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-5 bg-[#ee4d2d] rounded-full" />
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              REKOMENDASI & PRODUK TERLARIS
            </h2>
          </div>

          {/* Sort Tabs (Segmented control) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs text-slate-500 font-medium mr-1 shrink-0">Urutkan:</span>
            {[
              { id: 'rekomendasi', label: 'Terkait' },
              { id: 'terlaris', label: 'Terlaris' },
              { id: 'diskon', label: 'Diskon Terbesar' },
              { id: 'termurah', label: 'Harga Terendah' },
              { id: 'tertinggi', label: 'Harga Tertinggi' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSort(tab.id as SortOption)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeSort === tab.id
                    ? 'bg-[#ee4d2d] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
          <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-800">
            Tidak ada produk yang cocok
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Coba ubah kata kunci pencarian atau pilih kategori lain untuk melihat koleksi produk.
          </p>
          <button
            onClick={() => onSelectCategory('all')}
            className="mt-4 px-4 py-2 bg-[#ee4d2d] text-white rounded-lg text-xs font-semibold hover:bg-[#d83c1d] transition-colors"
          >
            Lihat Semua Produk
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-3.5">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="bg-white rounded-xl border border-slate-200/80 hover:border-[#ee4d2d]/60 overflow-hidden group cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between relative"
            >
              {/* Product Card Top: Badges & Image */}
              <div>
                <div className="relative aspect-square w-full bg-slate-50 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Mall or Star Badge */}
                  {product.badge && (
                    <span
                      className={`absolute top-2 left-2 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs text-white ${
                        product.badge === 'Mall'
                          ? 'bg-[#d0011b]'
                          : product.badge === 'Star+'
                          ? 'bg-[#ee4d2d]'
                          : 'bg-amber-600'
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}

                  {/* Discount percentage tag in top right */}
                  {product.discountPercent > 0 && (
                    <div className="absolute top-0 right-0 bg-yellow-400 text-red-600 font-extrabold text-[10px] px-1.5 py-0.5 rounded-bl shadow-xs">
                      -{product.discountPercent}%
                    </div>
                  )}

                  {/* Free shipping floating tag */}
                  {product.freeShipping && (
                    <div className="absolute bottom-1.5 left-1.5 bg-emerald-600/95 text-white text-[9px] font-semibold px-1.5 py-0.5 rounded flex items-center gap-1 backdrop-blur-xs">
                      <Truck className="w-3 h-3" />
                      <span>Gratis Ongkir</span>
                    </div>
                  )}
                </div>

                {/* Content details */}
                <div className="p-2.5 sm:p-3">
                  {/* Title */}
                  <h3 className="text-xs sm:text-[13px] font-medium text-slate-800 line-clamp-2 leading-snug group-hover:text-[#ee4d2d] transition-colors h-9">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="mt-2 flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-sm sm:text-base font-extrabold text-[#ee4d2d] font-mono tabular-nums leading-none">
                      {formatRupiah(product.price)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-[10px] sm:text-xs text-slate-400 line-through font-mono tabular-nums">
                        {formatRupiah(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Rating, Sold, Location */}
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="font-semibold text-slate-700">{product.rating}</span>
                      <span className="text-slate-300">·</span>
                      <span>{product.soldText}</span>
                    </div>
                  </div>

                  <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{product.location}</span>
                  </div>
                </div>
              </div>

              {/* Quick Add Button */}
              <div className="p-2.5 pt-0">
                <button
                  onClick={(e) => handleQuickAdd(product, e)}
                  className={`w-full py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
                    addedProductId === product.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-orange-50 hover:bg-[#ee4d2d] text-[#ee4d2d] hover:text-white border border-orange-200 hover:border-[#ee4d2d]'
                  }`}
                >
                  {addedProductId === product.id ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Berhasil!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Keranjang</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
