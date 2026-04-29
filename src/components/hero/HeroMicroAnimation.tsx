import React from 'react';

/**
 * HeroMicroAnimation
 * A pure CSS looping animation for the hero section.
 * Zero JavaScript, renders as a Server Component.
 */
export default function HeroMicroAnimation() {
  return (
    <div className="relative w-full max-w-md mx-auto lg:mx-0 group">
      {/* Decorative Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
      
      {/* Card Container */}
      <div className="relative bg-surface-card border border-surface-border rounded-xl shadow-2xl overflow-hidden font-sans hero-animation-container">
        {/* Invoice Header */}
        <div className="p-4 border-b border-surface-border-muted flex justify-between items-center bg-surface-elevated/50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-amber-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
          </div>
          <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-medium">New Invoice #8842</div>
        </div>

        {/* Input Field Simulation */}
        <div className="p-4 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] text-zinc-500 uppercase font-semibold">Search Product</label>
            <div className="h-10 w-full bg-surface border border-amber-500/30 rounded-md px-3 flex items-center">
              <span className="text-zinc-200 text-sm typing-text"></span>
              <span className="w-0.5 h-4 bg-amber-500 ml-0.5 animate-pulse"></span>
            </div>
          </div>

          {/* Table Simulation */}
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] text-zinc-500 uppercase border-b border-surface-border-muted pb-1 px-1">
              <span>Item</span>
              <span>Total</span>
            </div>
            
            {/* Row 1 */}
            <div className="row-1-anim flex justify-between items-center py-2 px-1 border-b border-surface-border-muted/50">
              <div className="flex flex-col">
                <span className="text-xs text-zinc-100 font-medium">Samsung Galaxy A55</span>
                <span className="text-[10px] text-zinc-500">₹24,999 · GST 18%</span>
              </div>
              <span className="text-xs text-zinc-200 font-mono">₹29,499</span>
            </div>

            {/* Row 2 */}
            <div className="row-2-anim flex justify-between items-center py-2 px-1 border-b border-surface-border-muted/50">
              <div className="flex flex-col">
                <span className="text-xs text-zinc-100 font-medium">iPhone 15 128GB</span>
                <span className="text-[10px] text-zinc-500">₹79,999 · GST 18%</span>
              </div>
              <span className="text-xs text-zinc-200 font-mono">₹94,399</span>
            </div>
          </div>

          {/* Footer / Total */}
          <div className="pt-4 flex justify-between items-end">
            <div className="badge-anim flex items-center gap-1.5 bg-green-500/10 text-green-500 px-2 py-1 rounded-full border border-green-500/20">
              <span className="text-[10px] font-bold uppercase tracking-tight">✓ Saved</span>
            </div>
            
            <div className="text-right">
              <div className="text-[10px] text-zinc-500 uppercase font-semibold">Grand Total</div>
              <div className="text-2xl font-bold text-amber-500 font-mono counter-anim"></div>
            </div>
          </div>
        </div>
        
        {/* Progress Bar (Visual Polish) */}
        <div className="h-1 bg-surface-border-muted w-full">
          <div className="h-full bg-amber-500 w-1/3 opacity-30"></div>
        </div>
      </div>

      {/* Anchor for smooth scroll mentioned in task */}
      <a 
        href="#demo" 
        className="absolute inset-0 z-10" 
        aria-label="Scroll to interactive demo"
      ></a>
    </div>
  );
}
