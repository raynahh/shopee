import React from 'react';
import {
  Tv,
  Shirt,
  Sparkles,
  Smartphone,
  HeartHandshake,
  Home,
  Utensils,
  Dumbbell,
  Car,
  Ticket,
  ChevronRight
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';

interface CategoryGridProps {
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const renderCategoryIcon = (iconName: string) => {
    const iconClass = "w-6 h-6 stroke-[1.8]";
    switch (iconName) {
      case 'Tv': return <Tv className={iconClass} />;
      case 'Shirt': return <Shirt className={iconClass} />;
      case 'Sparkles': return <Sparkles className={iconClass} />;
      case 'Smartphone': return <Smartphone className={iconClass} />;
      case 'HeartHandshake': return <HeartHandshake className={iconClass} />;
      case 'Home': return <Home className={iconClass} />;
      case 'Utensils': return <Utensils className={iconClass} />;
      case 'Dumbbell': return <Dumbbell className={iconClass} />;
      case 'Car': return <Car className={iconClass} />;
      case 'Ticket': return <Ticket className={iconClass} />;
      default: return <Sparkles className={iconClass} />;
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div className="bg-white rounded-xl shadow-xs border border-slate-100 overflow-hidden">
        {/* Section Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-4.5 bg-[#ee4d2d] rounded-full" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              KATEGORI PILIHAN
            </h2>
          </div>
          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs sm:text-sm font-semibold text-[#ee4d2d] hover:text-[#d83c1d] flex items-center gap-1 transition-colors"
          >
            {selectedCategory !== 'all' ? 'Tampilkan Semua Kategori' : 'Lihat Semua'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Grid: 5 cols on mobile, 10 cols on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 divide-x divide-y divide-slate-100">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(isSelected ? 'all' : cat.slug)}
                className={`flex flex-col items-center justify-center p-3 sm:p-4 text-center group cursor-pointer transition-all relative ${
                  isSelected
                    ? 'bg-orange-50/80 text-[#ee4d2d]'
                    : 'bg-white hover:bg-slate-50/80 text-slate-700'
                }`}
              >
                {/* Active Indicator Bar */}
                {isSelected && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-[#ee4d2d]" />
                )}

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-transform group-hover:scale-110 ${
                    isSelected
                      ? 'bg-[#ee4d2d] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 group-hover:bg-orange-100 group-hover:text-[#ee4d2d]'
                  }`}
                >
                  {renderCategoryIcon(cat.iconName)}
                </div>

                <span
                  className={`text-xs font-medium leading-snug line-clamp-2 max-w-[90px] ${
                    isSelected ? 'text-[#ee4d2d] font-bold' : 'text-slate-800'
                  }`}
                >
                  {cat.name}
                </span>

                <span className="text-[10px] text-slate-400 mt-1 font-mono tabular-nums">
                  {cat.itemCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
