'use client';

import React, { useState, useEffect } from 'react';
import DemoInvoice from './DemoInvoice';
import DemoConversionBar from './DemoConversionBar';
import StickyDemoReminder from '../ui/StickyDemoReminder';

/**
 * InlineDemoSection
 * Wrapper for the interactive demo.
 * Manages the conversion bar appearance after a successful demo.
 */
export default function InlineDemoSection() {
  const [demoState, setDemoState] = useState<{
    status: 'idle' | 'active' | 'saved';
    hasInteracted: boolean;
    elapsedMs: number;
    showConversionBar: boolean;
  }>({
    status: 'idle',
    hasInteracted: false,
    elapsedMs: 0,
    showConversionBar: false,
  });

  const [isDemoInView, setIsDemoInView] = useState(true);
  const sectionRef = React.useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDemoInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSave = React.useCallback((elapsedMs: number) => {
    setDemoState(prev => ({
      ...prev,
      status: 'saved',
      elapsedMs,
      showConversionBar: false,
    }));
  }, []);

  const handleReset = React.useCallback(() => {
    setDemoState({
      status: 'idle',
      hasInteracted: false,
      elapsedMs: 0,
      showConversionBar: false,
    });
  }, []);

  const handleStateChange = React.useCallback((status: 'idle' | 'active' | 'saved', hasInteracted: boolean) => {
    setDemoState(prev => {
      // Only update if state actually changed to prevent infinite loops
      if (prev.status === status && prev.hasInteracted === hasInteracted) return prev;
      return { ...prev, status, hasInteracted };
    });
  }, []);

  const handleTryItNow = React.useCallback(() => {
    const section = document.getElementById('demo');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (demoState.status === 'saved' && !demoState.showConversionBar) {
      const timer = setTimeout(() => {
        setDemoState(prev => ({ ...prev, showConversionBar: true }));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [demoState.status, demoState.showConversionBar]);

  return (
    <section 
      ref={sectionRef}
      id="demo" 
      className="py-24 bg-surface relative overflow-hidden"
    >
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

        <DemoInvoice 
          onSave={handleSave} 
          onReset={handleReset} 
          onStateChange={handleStateChange}
        />
        
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

      {/* Fixed Sticky Reminder */}
      <StickyDemoReminder 
        demoStatus={demoState.status}
        hasInteracted={demoState.hasInteracted}
        savedMs={demoState.elapsedMs}
        isDemoInView={isDemoInView}
        onTryItNow={handleTryItNow}
      />
    </section>
  );
}
