'use client';

import React from 'react';
import { InvoiceItem } from '@/types/invoice';
import InvoiceRow from './InvoiceRow';

interface InvoiceTableProps {
  items: InvoiceItem[];
  onQtyChange: (index: number, qty: number) => void;
  onImeiChange: (index: number, imei: string) => void;
  onRemove: (index: number) => void;
  disabled: boolean;
}

/**
 * InvoiceTable
 * Displays the list of added products.
 * Includes empty state and header for the invoice.
 */
export default function InvoiceTable({
  items,
  onQtyChange,
  onImeiChange,
  onRemove,
  disabled
}: InvoiceTableProps) {
  const hasItems = items.length > 0;

  return (
    <div className="border border-surface-border-muted rounded-lg overflow-hidden bg-surface/50">
      {/* Table Header */}
      <div className="bg-surface-elevated p-3 border-b border-surface-border-muted flex justify-between text-[10px] uppercase font-bold text-zinc-500 tracking-widest">
        <span className="flex-1">Item Description</span>
        <div className="flex">
          <span className="w-24 text-right hidden sm:block">Rate</span>
          <span className="w-20 text-center px-4">Qty</span>
          <span className="w-28 text-right pr-6">Amount</span>
        </div>
      </div>

      {/* Table Body */}
      <div className="min-h-[120px]">
        {!hasItems ? (
          <div className="p-12 text-center space-y-2">
            <div className="text-zinc-600 text-sm font-medium italic">No items added to invoice</div>
            <p className="text-zinc-700 text-xs">
              Search above or press <kbd className="font-sans">↵</kbd> after entering customer name
            </p>
          </div>
        ) : (
          <div className="divide-y divide-surface-border-muted/30">
            {items.map((item, index) => (
              <InvoiceRow
                key={`${item.product.id}-${index}`}
                item={item}
                index={index}
                onQtyChange={onQtyChange}
                onImeiChange={onImeiChange}
                onRemove={onRemove}
                disabled={disabled}
              />
            ))}
          </div>
        )}
      </div>

      {/* Table Footer / Safety Net */}
      {hasItems && (
        <div className="p-2 px-4 bg-surface-elevated/20 border-t border-surface-border-muted/50">
          <p className="text-[11px] text-zinc-600 font-medium">
            <span className="text-zinc-500">↩</span> Undo available — click <span className="text-zinc-500">×</span> on any row to remove
          </p>
        </div>
      )}
    </div>
  );
}
