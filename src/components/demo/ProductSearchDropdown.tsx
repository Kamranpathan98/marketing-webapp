'use client';

import React from 'react';
import { Product } from '@/types/invoice';
import { formatINR } from '@/lib/formatCurrency';

interface ProductSearchDropdownProps {
  results: Product[];
  highlightedIndex: number;
  onSelect: (product: Product) => void;
  isFirstOpen: boolean;
}

/**
 * ProductSearchDropdown
 * Pure presentational component for the autocomplete results.
 * Keyboard-navigable via the parent's highlightedIndex.
 */
export default function ProductSearchDropdown({
  results,
  highlightedIndex,
  onSelect,
  isFirstOpen
}: ProductSearchDropdownProps) {
  if (results.length === 0) return null;

  return (
    <div className="absolute top-full left-0 w-full mt-1 bg-surface-card border border-surface-border rounded-lg shadow-2xl overflow-hidden z-50 animate-slide-in">
      {/* Results List */}
      <div className="max-h-[320px] overflow-y-auto scrollbar-hide">
        {results.map((product, index) => {
          const isHighlighted = index === highlightedIndex;
          const isLowStock = product.stock <= 3;

          return (
            <div
              key={product.id}
              onClick={() => onSelect(product)}
              className={`
                flex items-center justify-between p-3 cursor-pointer transition-colors
                ${isHighlighted ? 'bg-amber-500/10 border-l-2 border-amber-500' : 'border-l-2 border-transparent hover:bg-surface-elevated'}
              `}
            >
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white leading-tight">{product.name}</span>
                  <span className="text-[10px] uppercase font-bold text-zinc-500 bg-surface-elevated px-1.5 py-0.5 rounded leading-none">
                    {product.category}
                  </span>
                </div>
                <div className="text-[11px] text-zinc-500 font-medium">
                  {product.model} · {product.gst}% GST
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-mono font-bold text-amber-500">
                  {formatINR(product.price)}
                </div>
                <div className={`text-[10px] font-bold ${isLowStock ? 'text-red-500' : 'text-zinc-500'}`}>
                  {product.stock} in stock
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Hint */}
      <div className="p-2 bg-surface-elevated/50 border-t border-surface-border-muted flex items-center justify-between">
        <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">
          {results.length} results
        </span>
        <div className={`flex items-center gap-1.5 ${isFirstOpen ? 'animate-pulse-once' : ''}`}>
          <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-tight">
            ↵ Enter to add
          </span>
        </div>
      </div>
    </div>
  );
}
