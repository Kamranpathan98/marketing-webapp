'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import DemoInvoiceSkeleton from '@/components/demo/DemoInvoiceSkeleton';

const DemoInvoice = dynamic(() => import('@/components/demo/DemoInvoice'), {
  loading: () => <DemoInvoiceSkeleton />,
  ssr: false,
});

import { DemoInvoiceRef } from '@/components/demo/DemoInvoice';

/**
 * TallyDemoSection
 * Targeted demo wrapper for the Tally migration page.
 */
export default function TallyDemoSection() {
  const [demoState, setDemoState] = useState<{
    status: 'idle' | 'active' | 'saved';
    hasInteracted: boolean;
  }>({
    status: 'idle',
    hasInteracted: false,
  });

  const demoRef = useRef<DemoInvoiceRef>(null);

  const handleStateChange = useCallback((status: 'idle' | 'active' | 'saved', hasInteracted: boolean) => {
    setDemoState({ status, hasInteracted });
  }, []);

  return (
    <section id="demo" className="py-24 bg-surface relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Try it yourself. <span className="text-amber-500">No signup.</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-medium">
            No Tally comparison — just faster billing. See how quickly you can create an invoice.
          </p>
        </div>

        <DemoInvoice 
          ref={demoRef}
          benchmarkLabel="Your personal best on this page"
          onStateChange={handleStateChange}
        />

        <div className="mt-12 flex justify-center items-center gap-8 text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span className="text-[10px] uppercase font-black tracking-widest">Keyboard Only</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span className="text-[10px] uppercase font-black tracking-widest">No Loading</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span className="text-[10px] uppercase font-black tracking-widest">GST-Ready</span>
          </div>
        </div>
      </div>
    </section>
  );
}
