'use client';

import React, { useEffect, useState } from 'react';
import { formatINR } from '@/lib/formatCurrency';

interface SummaryPanelProps {
  subtotal: number;
  gstTotal: number;
  total: number;
  isEmpty: boolean;
}

/**
 * SummaryPanel
 * Displays the calculated totals at the bottom of the invoice.
 * Purely presentational, receives values as props.
 */
export default function SummaryPanel({
  subtotal,
  gstTotal,
  total,
  isEmpty
}: SummaryPanelProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Trigger scale animation when total changes and is not empty
  useEffect(() => {
    if (total > 0 && !isEmpty) {
      setShouldAnimate(true);
      const timer = setTimeout(() => setShouldAnimate(false), 150);
      return () => clearTimeout(timer);
    }
  }, [total, isEmpty]);

  return (
    <div 
      className={`flex justify-end pt-6 border-t border-surface-border-muted bg-surface-elevated/30 transition-opacity duration-300 ${
        isEmpty ? 'opacity-40' : 'opacity-100'
      }`}
    >
      <div className="w-full max-w-[240px] space-y-3">
        {/* Subtotal Row */}
        <div className="flex justify-between items-center text-xs">
          <span className="text-zinc-500 font-medium uppercase tracking-wider">Subtotal</span>
          <span className="text-zinc-300 font-mono">{formatINR(subtotal)}</span>
        </div>

        {/* GST Row */}
        <div className="flex justify-between items-center text-xs">
          <span className="text-zinc-500 font-medium uppercase tracking-wider">CGST + SGST</span>
          <span className="text-zinc-300 font-mono">{formatINR(gstTotal)}</span>
        </div>

        {/* Grand Total Row */}
        <div className="flex justify-between items-end pt-2 border-t border-surface-border-muted/50">
          <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest pb-1">Grand Total</span>
          <div 
            className={`text-3xl font-bold text-amber-500 font-mono transition-transform duration-150 ${
              shouldAnimate ? 'scale-[1.05]' : 'scale-100'
            }`}
          >
            {formatINR(total)}
          </div>
        </div>
      </div>
    </div>
  );
}
