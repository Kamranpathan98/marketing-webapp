'use client';

import React from 'react';
import { InvoiceItem } from '@/types/invoice';
import { formatINR } from '@/lib/formatCurrency';
import { calcGST } from '@/lib/gst';

interface InvoiceRowProps {
  item: InvoiceItem;
  index: number;
  onQtyChange: (index: number, qty: number) => void;
  onImeiChange: (index: number, imei: string) => void;
  onRemove: (index: number) => void;
  disabled: boolean;
}

/**
 * InvoiceRow
 * Displays a single product row in the invoice table.
 * Handles quantity updates and IMEI entry for Smartphones.
 */
export default function InvoiceRow({
  item,
  index,
  onQtyChange,
  onImeiChange,
  onRemove,
  disabled
}: InvoiceRowProps) {
  const { product, qty, imei = '' } = item;
  const isSmartphone = product.category === 'Smartphone';
  
  const unitPrice = product.price;
  const lineSubtotal = unitPrice * qty;
  const lineGst = calcGST(lineSubtotal, product.gst);
  const lineTotal = lineSubtotal + lineGst;

  return (
    <div className="group flex items-start p-3 border-b border-surface-border-muted/50 hover:bg-surface-elevated/30 transition-colors">
      {/* Item Details */}
      <div className="flex-1 min-w-0 pr-4">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white truncate">{product.name}</span>
            <span className="text-[10px] uppercase font-bold text-zinc-500 bg-surface-elevated px-1.5 py-0.5 rounded leading-none shrink-0">
              {product.category}
            </span>
          </div>
          <div className="text-[11px] text-zinc-500 font-medium">
            {product.model} · GST {product.gst}% ({formatINR(calcGST(unitPrice, product.gst))})
          </div>
          
          {/* IMEI Field for Smartphones */}
          {isSmartphone && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-[9px] text-zinc-500 uppercase font-bold shrink-0">IMEI:</span>
              <input
                type="text"
                disabled={disabled}
                value={imei}
                onChange={(e) => onImeiChange(index, e.target.value.slice(0, 15))}
                placeholder="IMEI number (optional)"
                className="bg-transparent border-b border-surface-border-muted focus:border-amber-500/50 outline-none text-[11px] text-zinc-300 w-full max-w-[140px] py-0.5 placeholder:text-zinc-700 transition-colors font-mono"
              />
            </div>
          )}
        </div>
      </div>

      {/* Rate (per unit total) */}
      <div className="w-24 text-right hidden sm:block pt-1">
        <div className="text-xs text-zinc-400 font-mono">
          {formatINR(unitPrice + calcGST(unitPrice, product.gst))}
        </div>
      </div>

      {/* Qty Input */}
      <div className="w-20 px-4 pt-0.5">
        <input
          type="number"
          min="1"
          disabled={disabled}
          value={qty || ''}
          onChange={(e) => onQtyChange(index, parseInt(e.target.value, 10))}
          className="w-full bg-surface-elevated border border-surface-border rounded px-2 py-1 text-xs text-center text-white focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 outline-none transition-all font-mono"
        />
      </div>

      {/* Line Total */}
      <div className="w-28 text-right pt-1 pr-2 relative">
        <div className="text-sm font-bold text-zinc-200 font-mono">
          {formatINR(lineTotal)}
        </div>
        
        {/* Remove Button (Desktop: visible on hover) */}
        {!disabled && (
          <button
            onClick={() => onRemove(index)}
            className="absolute -right-1 top-1.5 p-1 text-zinc-600 hover:text-red-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200"
            title="Remove item"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
