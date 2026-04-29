'use client';

import React, { useEffect, useState } from 'react';

interface SuccessOverlayProps {
  elapsedMs: number;
  onReset: () => void;
}

/**
 * SuccessOverlay
 * Shown when the user saves the invoice.
 * Includes the "Tally Comparison Bar" and conversion copy.
 */
export default function SuccessOverlay({ elapsedMs, onReset }: SuccessOverlayProps) {
  const [showTallyText, setShowTallyText] = useState(false);
  const seconds = (elapsedMs / 1000).toFixed(1);

  useEffect(() => {
    // Show the "3+ minutes" text after the 3-second bar animation finishes
    const timer = setTimeout(() => setShowTallyText(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center animate-fade-in p-6 rounded-xl">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-3">
          <div className="text-4xl md:text-5xl font-bold text-green-500 tracking-tight">
            ✓ Invoice created in {seconds}s
          </div>
          <p className="text-zinc-500 text-sm italic font-medium">
            "This is exactly how it works in real billing. No shortcuts."
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-white text-lg font-bold">This invoice can be yours in one click.</p>
          
          {/* Tally Comparison Bar */}
          <div className="space-y-2 text-left bg-zinc-900/50 p-4 rounded-lg border border-white/5">
            <div className="flex justify-between items-end mb-1">
              <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">
                Tally billing time for this invoice:
              </span>
              {showTallyText && (
                <span className="text-red-500 text-[10px] font-black uppercase animate-fade-in tracking-tighter">
                  3+ minutes
                </span>
              )}
            </div>
            <div className="h-2 w-full bg-black rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-red-900/60 animate-fill-3s origin-left"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-4">
          <button className="w-full h-14 bg-amber-500 hover:bg-amber-400 text-black font-black uppercase tracking-widest text-sm rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/20">
            Start free trial and keep this invoice
          </button>
          <button 
            onClick={onReset}
            className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors py-2"
          >
            Create another invoice
          </button>
        </div>
      </div>
    </div>
  );
}
