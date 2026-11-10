import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Truck,
  ShieldCheck,
  Smartphone,
  Flame,
  ShoppingBag,
  TicketPercent,
  Laptop,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { HERO_BANNERS, QUICK_SERVICES } from '../data/mockData';

interface BannerSliderProps {
  onSelectCategorySlug?: (slug: string) => void;
  onOpenPromoModal?: () => void;
}

export const BannerSlider: React.FC<BannerSliderProps> = ({
  onSelectCategorySlug,
  onOpenPromoModal
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_BANNERS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Truck': return <Truck className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6" />;
      case 'Flame': return <Flame className="w-6 h-6" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6" />;
      case 'TicketPercent': return <TicketPercent className="w-6 h-6" />;
      case 'Laptop': return <Laptop className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6">
      {/* Banner Area (Shopee 2-column Desktop Grid: Carousel on Left, 2 Stacked Cards on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Main Banner Slider (2 cols on large screen) */}
        <div
          className="lg:col-span-2 relative h-[220px] sm:h-[300px] md:h-[340px] rounded-xl overflow-hidden shadow-sm group bg-slate-900"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {HERO_BANNERS.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={banner.image}
                alt={banner.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-5 sm:p-7 text-white">
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded w-fit mb-1">
                  {banner.tag}
                </span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow-sm">
                  {banner.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-lg drop-shadow-xs">
                  {banner.subtitle}
                </p>
                <div className="mt-3">
                  <button
                    onClick={onOpenPromoModal}
                    className="inline-flex items-center gap-1.5 bg-[#ee4d2d] hover:bg-[#d83c1d] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg shadow transition-all hover:gap-2"
                  >
                    Klaim Voucher Sekarang
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Left / Right Arrow Controls */}
          <button
            onClick={prevSlide}
            aria-label="Slide sebelumnya"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Slide berikutnya"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-3 right-5 z-20 flex items-center gap-1.5">
            {HERO_BANNERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Ke slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === currentSlide ? 'w-6 bg-[#ee4d2d]' : 'w-2 bg-white/70 hover:bg-white'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 2 Stacked Mini Promotional Banners (Shopee Desktop Style) */}
        <div className="hidden lg:grid grid-rows-2 gap-3 h-[340px]">
          {/* Card 1 */}
          <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-orange-600 to-amber-500 p-5 text-white flex flex-col justify-between shadow-sm group cursor-pointer hover:shadow-md transition-shadow">
            <div className="z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded">
                SUPER DEALS
              </span>
              <h3 className="text-lg font-bold mt-1.5 leading-snug">
                Pesta Gadget & Aksesoris
              </h3>
              <p className="text-xs text-orange-100 mt-0.5">
                Cashback 100% Koin Shopee
              </p>
            </div>
            <div className="z-10 flex items-center justify-between">
              <span className="text-xs font-semibold text-yellow-200 underline decoration-yellow-200/50">
                Belanja Sekarang →
              </span>
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white">
                <Laptop className="w-5 h-5" />
              </div>
            </div>
            {/* Background graphic motif */}
            <div className="absolute -right-4 -bottom-6 w-28 h-28 rounded-full bg-white/10 pointer-events-none group-hover:scale-110 transition-transform" />
          </div>

          {/* Card 2 */}
          <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-rose-600 to-red-500 p-5 text-white flex flex-col justify-between shadow-sm group cursor-pointer hover:shadow-md transition-shadow">
            <div className="z-10">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded">
                BEBAS ONGKIR
              </span>
              <h3 className="text-lg font-bold mt-1.5 leading-snug">
                Gratis Ongkir Seluruh Indonesia
              </h3>
              <p className="text-xs text-red-100 mt-0.5">
                Tanpa Minimum Belanja Hari Ini
              </p>
            </div>
            <div className="z-10 flex items-center justify-between">
              <span className="text-xs font-semibold text-yellow-200 underline decoration-yellow-200/50">
                Ambil Voucher →
              </span>
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white">
                <Truck className="w-5 h-5" />
              </div>
            </div>
            {/* Background graphic motif */}
            <div className="absolute -right-4 -bottom-6 w-28 h-28 rounded-full bg-white/10 pointer-events-none group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </div>

      {/* Quick Services Ribbon (Shopee 8 features strip) */}
      <div className="mt-4 bg-white rounded-xl shadow-xs border border-slate-100 p-4">
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-2 text-center">
          {QUICK_SERVICES.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'qs1' || item.id === 'qs6') {
                  onOpenPromoModal?.();
                } else if (item.id === 'qs7') {
                  onSelectCategorySlug?.('elektronik');
                } else {
                  onOpenPromoModal?.();
                }
              }}
              className="flex flex-col items-center group cursor-pointer p-1 rounded-lg hover:bg-slate-50 transition-colors focus:outline-none"
            >
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${item.bg} ${item.color} shadow-xs group-hover:scale-105 transition-transform`}
              >
                {renderIcon(item.icon)}
              </div>
              <span className="text-[11px] sm:text-xs font-medium text-slate-700 mt-2 leading-tight line-clamp-2 max-w-[85px]">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
