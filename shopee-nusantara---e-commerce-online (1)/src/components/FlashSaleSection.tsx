import React, { useState, useEffect } from 'react';
import { Flame, Zap, ChevronRight } from 'lucide-react';
import { FlashSaleItem, Product } from '../types';
import { formatRupiah } from '../utils/formatters';

interface FlashSaleSectionProps {
  items: FlashSaleItem[];
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

export const FlashSaleSection: React.FC<FlashSaleSectionProps> = ({
  items,
  allProducts,
  onSelectProduct,
}) => {
  // Live ticking countdown timer: Starts at 2 hours, 45 minutes, 30 seconds
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 2, minutes: 59, seconds: 59 }; // loop
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDigit = (num: number) => num.toString().padStart(2, '0');

  const handleCardClick = (item: FlashSaleItem) => {
    const matched = allProducts.find((p) => p.id === item.productId);
    if (matched) {
      onSelectProduct(matched);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="bg-white rounded-xl shadow-xs border border-orange-100 overflow-hidden">
        {/* Flash Sale Header Bar */}
        <div className="px-5 py-4 border-b border-orange-100/60 bg-gradient-to-r from-orange-50/50 via-white to-orange-50/30 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[#ee4d2d]">
              <Flame className="w-6 h-6 fill-current animate-bounce" />
              <span className="text-lg sm:text-xl font-black italic tracking-wider">
                FLASH SALE
              </span>
            </div>

            {/* Countdown Timer Badges */}
            <div className="flex items-center gap-1 text-white text-xs font-bold font-mono">
              <span className="bg-slate-900 px-2 py-1 rounded">
                {formatDigit(timeLeft.hours)}
              </span>
              <span className="text-slate-800 font-bold">:</span>
              <span className="bg-slate-900 px-2 py-1 rounded">
                {formatDigit(timeLeft.minutes)}
              </span>
              <span className="text-slate-800 font-bold">:</span>
              <span className="bg-slate-900 px-2 py-1 rounded">
                {formatDigit(timeLeft.seconds)}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              if (items.length > 0) handleCardClick(items[0]);
            }}
            className="text-xs sm:text-sm font-semibold text-[#ee4d2d] hover:text-[#d83c1d] flex items-center gap-1 transition-colors"
          >
            Lihat Semua Promo Kilat
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Product Cards Row (Scrollable or Grid) */}
        <div className="p-4 overflow-x-auto no-scrollbar">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 min-w-[620px] lg:min-w-0">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => handleCardClick(item)}
                className="bg-white rounded-lg border border-slate-100 hover:border-orange-300 p-2.5 flex flex-col justify-between group cursor-pointer hover:shadow-md transition-all hover:-translate-y-1 relative"
              >
                {/* Discount Flag Badge in Top Right */}
                <div className="absolute top-2 right-2 z-10 bg-yellow-400 text-red-600 text-[10px] font-black px-1.5 py-0.5 rounded shadow-xs flex items-center gap-0.5">
                  <Zap className="w-3 h-3 fill-current" />
                  <span>-{item.discountPercent}%</span>
                </div>

                {/* Product Image */}
                <div className="relative aspect-square w-full rounded-md overflow-hidden bg-slate-50 mb-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.isMall && (
                    <span className="absolute bottom-1 left-1 bg-[#d0011b] text-white text-[9px] font-bold px-1 py-0.5 rounded">
                      Mall
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <h3 className="text-xs font-medium text-slate-800 line-clamp-2 leading-snug group-hover:text-[#ee4d2d] transition-colors">
                    {item.name}
                  </h3>

                  <div className="pt-1">
                    <p className="text-sm font-extrabold text-[#ee4d2d] font-mono tabular-nums leading-none">
                      {formatRupiah(item.promoPrice)}
                    </p>
                    <p className="text-[11px] text-slate-400 line-through font-mono tabular-nums">
                      {formatRupiah(item.originalPrice)}
                    </p>
                  </div>

                  {/* Stock Progress Bar (Shopee signature fire bar) */}
                  <div className="pt-2">
                    <div className="w-full h-3.5 bg-orange-100 rounded-full overflow-hidden relative flex items-center justify-center">
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all"
                        style={{ width: `${item.soldPercent}%` }}
                      />
                      <span className="relative z-10 text-[9px] font-bold text-white uppercase tracking-wider drop-shadow-xs">
                        {item.soldPercent >= 90 ? 'Segera Habis' : `Terjual ${item.soldPercent}%`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
