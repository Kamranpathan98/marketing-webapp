'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import DemoInvoiceSkeleton from './DemoInvoiceSkeleton';

const DemoInvoice = dynamic(() => import('./DemoInvoice'), {
  loading: () => <DemoInvoiceSkeleton />,
  ssr: false,
});

import { DemoInvoiceRef } from './DemoInvoice';
import DemoConversionBar from './DemoConversionBar';
import StickyDemoReminder from '../ui/StickyDemoReminder';

/**
 * InlineDemoSection
 * Wrapper for the interactive demo.
 * Manages the conversion bar appearance and the advanced 4-condition autofocus trigger.
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

  const [isDemoInView, setIsDemoInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const demoRef = useRef<DemoInvoiceRef>(null);

  // Advanced Auto-focus State
  const [isInThreshold, setIsInThreshold] = useState(false);
  const velocityRef = useRef(0);
  const hasAutoFocused = useRef(false);
  const bypassVelocityOnce = useRef(false);

  // 1. Scroll Velocity Listener
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastScrollTime = Date.now();

    const handleScroll = () => {
      const now = Date.now();
      const dy = Math.abs(window.scrollY - lastScrollY);
      const dt = now - lastScrollTime;
      velocityRef.current = dt > 0 ? dy / dt : 0;
      lastScrollY = window.scrollY;
      lastScrollTime = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Intersection Observer (50% threshold)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInThreshold(entry.isIntersecting);
        // Also update the simple visibility for the sticky reminder (can use a smaller threshold or same)
        setIsDemoInView(entry.intersectionRatio > 0.1);
      },
      { threshold: [0.1, 0.5] }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // 3. The 4-Condition Autofocus Logic
  useEffect(() => {
    // Condition 2: Never fire if user already interacted
    if (demoState.hasInteracted || hasAutoFocused.current) return;

    // Condition 1: Demo section >= 50% in viewport
    if (!isInThreshold) return;

    // Condition 4: 350ms delay after threshold
    const timer = setTimeout(() => {
      const checkAndFocus = () => {
        // Final condition check before firing
        if (demoState.hasInteracted || hasAutoFocused.current) return;
        
        // Mobile Override
        if (window.innerWidth < 768) return;

        // Condition 3: Velocity < 2px/ms (unless bypassed)
        if (velocityRef.current < 2 || bypassVelocityOnce.current) {
          demoRef.current?.triggerAutoFocus();
          hasAutoFocused.current = true;
          bypassVelocityOnce.current = false;
        } else {
          // Re-check every 50ms if velocity is high
          setTimeout(checkAndFocus, 50);
        }
      };

      checkAndFocus();
    }, 350);

    return () => clearTimeout(timer);
  }, [isInThreshold, demoState.hasInteracted]);

  const handleSave = useCallback((elapsedMs: number) => {
    setDemoState(prev => ({
      ...prev,
      status: 'saved',
      elapsedMs,
      showConversionBar: false,
    }));
  }, []);

  const handleReset = useCallback(() => {
    setDemoState({
      status: 'idle',
      hasInteracted: false,
      elapsedMs: 0,
      showConversionBar: false,
    });
    hasAutoFocused.current = false;
  }, []);

  const handleStateChange = useCallback((status: 'idle' | 'active' | 'saved', hasInteracted: boolean) => {
    setDemoState(prev => {
      if (prev.status === status && prev.hasInteracted === hasInteracted) return prev;
      return { ...prev, status, hasInteracted };
    });
  }, []);

  const handleTryItNow = useCallback(() => {
    const section = document.getElementById('demo');
    if (section) {
      bypassVelocityOnce.current = true;
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
          ref={demoRef}
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

      {demoState.showConversionBar && (
        <DemoConversionBar elapsedMs={demoState.elapsedMs} />
      )}

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
