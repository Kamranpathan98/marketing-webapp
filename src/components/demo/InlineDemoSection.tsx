'use client';

import React, { useState, useEffect } from 'react';
import DemoInvoice from './DemoInvoice';
import DemoConversionBar from './DemoConversionBar';

/**
 * InlineDemoSection
 * Wrapper for the interactive demo.
 * Manages the conversion bar appearance after a successful demo.
 */
export default function InlineDemoSection() {
  const [demoState, setDemoState] = useState<{
    status: 'idle' | 'saved';
    elapsedMs: number;
    showConversionBar: boolean;
  }>({
    status: 'idle',
    elapsedMs: 0,
    showConversionBar: false,
  });

  const handleSave = (elapsedMs: number) => {
    setDemoState({
      status: 'saved',
      elapsedMs,
      showConversionBar: false, // Wait 500ms
    });
  };

  const handleReset = () => {
    setDemoState({
      status: 'idle',
      elapsedMs: 0,
      showConversionBar: false,
    });
  };

  useEffect(() => {
    if (demoState.status === 'saved' && !demoState.showConversionBar) {
      const timer = setTimeout(() => {
        setDemoState(prev => ({ ...prev, showConversionBar: true }));
      }, 500); // 500ms delay as per spec
      return () => clearTimeout(timer);
    }
  }, [demoState.status, demoState.showConversionBar]);

  return (
    <section id="demo" className="py-24 bg-surface relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-texture bg-grid-48 opacity-[0.02] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Try it yourself. <span className="text-amber-500">No signup required.</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-medium">
            Experience the speed of keyboard-first billing. Create your first invoice in under 10 seconds.
          </p>
        </div>

        <DemoInvoice onSave={handleSave} onReset={handleReset} />
        
        <div className="mt-12 flex justify-center items-center gap-8 text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span className="text-[10px] uppercase font-black tracking-widest">Keyboard Only</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span className="text-[10px] uppercase font-black tracking-widest">Zero Loading</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span className="text-[10px] uppercase font-black tracking-widest">Real-time GST</span>
          </div>
        </div>
      </div>

      {/* Slide-up Conversion Bar */}
      {demoState.showConversionBar && (
        <DemoConversionBar elapsedMs={demoState.elapsedMs} />
      )}
    </section>
  );
}
