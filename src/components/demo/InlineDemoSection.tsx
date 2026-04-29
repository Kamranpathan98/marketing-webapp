'use client';

import React from 'react';
import DemoInvoice from './DemoInvoice';

/**
 * InlineDemoSection
 * Wrapper for the interactive demo.
 * Handles the layout and background for the demo area.
 */
export default function InlineDemoSection() {
  return (
    <section id="demo" className="py-24 bg-surface relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-texture bg-grid-48 opacity-[0.02] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Try it yourself. <span className="text-amber-500">No signup required.</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Experience the speed of keyboard-first billing. Create your first invoice in under 10 seconds.
          </p>
        </div>

        <DemoInvoice />
        
        <div className="mt-12 flex justify-center items-center gap-8 text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span className="text-xs uppercase font-bold tracking-widest">Keyboard Only</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span className="text-xs uppercase font-bold tracking-widest">Zero Loading</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span className="text-xs uppercase font-bold tracking-widest">Real-time GST</span>
          </div>
        </div>
      </div>
    </section>
  );
}
