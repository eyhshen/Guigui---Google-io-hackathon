import React from 'react';
import { Product } from '../types';
import { Bottle } from './Bottle';
import { addMonths, isBefore, parseISO, differenceInDays } from 'date-fns';

interface ShelfProps {
  inventory: Product[];
  onProductClick: (p: Product) => void;
  highlightedIds?: string[];
  dimUnselected?: boolean;
}

const categoryTranslations: Record<string, string> = {
  'Serum': '精华液',
  'Toner': '爽肤水',
  'Moisturizer': '乳液面霜',
  'Sunscreen': '防晒霜',
  'Cleanser': '洁面乳',
  'Cream': '面霜',
  'Lotion': '乳液',
};

const translateCategory = (cat: string) => categoryTranslations[cat] || cat;

export function Shelf({ inventory, onProductClick, highlightedIds = [], dimUnselected = false }: ShelfProps) {
  const getExpiryStatus = (p: Product) => {
    const today = new Date();
    const expiryDate = parseISO(p.expiryDate);
    if (isBefore(expiryDate, today)) return 'expired';
    if (differenceInDays(expiryDate, today) <= 30) return 'expiring';
    return 'active';
  };

  const sortedInventory = [...inventory].sort((a, b) => {
    return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
  });

  return (
    <div className="grid grid-cols-3 gap-3 p-1 pb-10">
      {sortedInventory.map(product => {
        const isHighlighted = highlightedIds.includes(product.id);
        const shouldDim = dimUnselected && !isHighlighted;
        const status = getExpiryStatus(product);

        return (
          <button
            key={product.id}
            onClick={() => onProductClick(product)}
            className={`relative flex flex-col items-center p-3 rounded-2xl transition-all duration-300 bg-white/5 shadow-sm border ${
              shouldDim
                ? 'opacity-40 grayscale scale-95'
                : 'opacity-100 hover:shadow-md active:scale-95'
            } ${
              isHighlighted
                ? 'border-[#A7E8C0]/40 ring-4 ring-[#A7E8C0]/15 bg-[#A7E8C0]/10'
                : 'border-white/10 hover:border-white/10'
            }`}
          >
            {/* Expiry Badge */}
            {status === 'expired' && (
              <div className="absolute top-1.5 right-1.5 z-10 bg-[#F08A9B]/12 text-[#F08A9B] text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-[#F08A9B]/30">
                已过期
              </div>
            )}
            {status === 'expiring' && (
              <div className="absolute top-1.5 right-1.5 z-10 bg-[#F5C377]/12 text-[#F5C377] text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-[#F5C377]/30 animate-pulse">
                临期
              </div>
            )}
            
            <div className="h-16 flex items-center justify-center mt-3">
              <Bottle shape={product.bottle.shape} colorHex={product.bottle.colorHex} size={48} />
            </div>
            <div className="text-center w-full mt-2.5">
              <p className="text-[10px] font-medium text-[#6E6884] truncate leading-tight uppercase tracking-wider">{product.brand}</p>
              <p className="text-[11px] font-semibold text-[#CFC8E0] truncate mt-0.5 leading-tight">{product.name}</p>
              <span className="inline-block px-1.5 py-0.5 bg-white/[0.06] rounded text-[8px] text-[#6E6884] font-medium border border-white/10 mt-1.5">
                {translateCategory(product.category)}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
