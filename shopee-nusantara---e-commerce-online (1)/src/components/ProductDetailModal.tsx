import React, { useState } from 'react';
import {
  X,
  Star,
  Truck,
  ShieldCheck,
  MapPin,
  Plus,
  Minus,
  ShoppingCart,
  CheckCircle2,
  Share2,
  Heart
} from 'lucide-react';
import { Product } from '../types';
import { formatRupiah } from '../utils/formatters';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, variant?: string) => void;
  onBuyNow: (product: Product, quantity: number, variant?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (product.variants) {
      product.variants.forEach((v) => {
        initial[v.name] = v.options[0];
      });
    }
    return initial;
  });
  const [isLiked, setIsLiked] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const variantSummary = Object.values(selectedVariants).join(', ');

  const handleAddToCart = () => {
    onAddToCart(product, quantity, variantSummary || undefined);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 1500);
  };

  const handleBuyNow = () => {
    onBuyNow(product, quantity, variantSummary || undefined);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
          {/* Left Column: Product Imagery */}
          <div className="p-6 bg-slate-50 flex flex-col justify-between">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-xs border border-slate-200">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-[#d0011b] text-white text-xs font-bold px-2 py-0.5 rounded shadow">
                  {product.badge}
                </span>
              )}
              {product.discountPercent > 0 && (
                <span className="absolute top-3 right-3 bg-yellow-400 text-red-600 text-xs font-black px-2 py-0.5 rounded shadow">
                  -{product.discountPercent}%
                </span>
              )}
            </div>

            {/* Guarantees Strip */}
            <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-3 gap-2 text-center text-[11px] text-slate-600">
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mb-1" />
                <span>100% Original</span>
              </div>
              <div className="flex flex-col items-center">
                <Truck className="w-4 h-4 text-blue-600 mb-1" />
                <span>Gratis Retur 7 Hari</span>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircle2 className="w-4 h-4 text-[#ee4d2d] mb-1" />
                <span>Garansi Tiba Tepat Waktu</span>
              </div>
            </div>
          </div>

          {/* Right Column: Information & Actions */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              {/* Category & Location */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                <span className="uppercase tracking-wider font-semibold text-[#ee4d2d]">
                  {product.category}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {product.location}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {product.name}
              </h1>

              {/* Stats: Rating & Sold */}
              <div className="flex items-center gap-4 mt-2.5 pb-3 border-b border-slate-100 text-xs">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[#ee4d2d] underline">{product.rating}</span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <span className="text-slate-300">|</span>
                <span className="text-slate-600 font-medium">
                  {product.reviewCount} Penilaian
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-slate-900 font-bold">{product.soldText}</span>
              </div>

              {/* Pricing Box */}
              <div className="my-3.5 p-3.5 bg-orange-50/60 rounded-xl flex items-baseline gap-3">
                <span className="text-2xl font-black text-[#ee4d2d] font-mono tabular-nums">
                  {formatRupiah(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-slate-400 line-through font-mono tabular-nums">
                    {formatRupiah(product.originalPrice)}
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="text-[11px] font-bold text-red-600 bg-red-100 px-1.5 py-0.5 rounded">
                    HEMAT {product.discountPercent}%
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                {product.description}
              </p>

              {/* Variant Selections */}
              {product.variants && product.variants.map((variant) => (
                <div key={variant.name} className="mb-3.5">
                  <span className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Pilihan {variant.name}:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {variant.options.map((opt) => {
                      const isSelected = selectedVariants[variant.name] === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() =>
                            setSelectedVariants((prev) => ({
                              ...prev,
                              [variant.name]: opt,
                            }))
                          }
                          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                            isSelected
                              ? 'border-[#ee4d2d] bg-orange-50 text-[#ee4d2d] font-bold shadow-xs'
                              : 'border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Quantity Stepper */}
              <div className="flex items-center gap-4 my-4">
                <span className="text-xs font-semibold text-slate-700">Kuantitas:</span>
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-40 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-slate-800 font-mono">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    disabled={quantity >= product.stock}
                    className="p-1.5 text-slate-500 hover:bg-slate-100 disabled:opacity-40 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[11px] text-slate-400">
                  Tersisa {product.stock} buah
                </span>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 space-y-2.5">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="py-3 px-4 rounded-xl border border-[#ee4d2d] bg-orange-50 hover:bg-orange-100 text-[#ee4d2d] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  {addedSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Ditambahkan!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>+ Keranjang</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3 px-4 rounded-xl bg-[#ee4d2d] hover:bg-[#d83c1d] text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
                >
                  Beli Sekarang
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-1.5 transition-colors ${
                    isLiked ? 'text-red-500 font-semibold' : 'hover:text-slate-800'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{isLiked ? 'Disukai' : 'Favoritkan'}</span>
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert('Tautan produk berhasil disalin!');
                  }}
                  className="flex items-center gap-1.5 hover:text-slate-800 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Bagikan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
