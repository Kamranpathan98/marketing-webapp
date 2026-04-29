import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import PainPointsSection from '@/components/tally/PainPointsSection';
import WorkflowComparison from '@/components/tally/WorkflowComparison';
import TallyDemoSection from '@/components/tally/TallyDemoSection';
import TallyMigrationSection from '@/components/sections/TallyMigrationSection';
import TallyPricingSection from '@/components/tally/TallyPricingSection';

export const metadata: Metadata = {
  title: 'Switch from Tally to MyERP — Invoice 6x Faster | MyERP',
  description: 'Electronics retailers switching from Tally cut billing time from 3 minutes to 9 seconds. Free migration wizard. 14-day trial.',
  openGraph: {
    title: 'Switch from Tally to MyERP — Invoice 6x Faster | MyERP',
    description: 'Electronics retailers switching from Tally cut billing time from 3 minutes to 9 seconds. Free migration wizard. 14-day trial.',
    type: 'website',
  },
};

/**
 * SwitchFromTallyPage
 * Highly targeted landing page for Tally users.
 */
export default function SwitchFromTallyPage() {
  return (
    <main className="bg-surface min-h-screen">
      {/* Section 1 — Headline */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-texture bg-grid-48 opacity-[0.03] pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-widest mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            Tally Alternative for Electronics Retailers
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight max-w-5xl mx-auto mb-8 leading-[1.1]">
            Still using Tally for your electronics shop? <span className="text-zinc-600 italic">There&apos;s a faster way.</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto font-medium mb-12">
            Invoice in 9 seconds. GST-ready. IMEI tracking. Tally data import included.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="#demo"
              className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black uppercase tracking-widest text-sm rounded-xl transition-all shadow-[0_0_30px_rgba(245,158,11,0.2)]"
            >
              Try the 9-second demo
            </Link>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
              No signup required
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 — Pain Points */}
      <PainPointsSection />

      {/* Section 3 — Workflow Comparison */}
      <section className="py-32 bg-surface">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              13 steps in Tally. <span className="text-amber-500">6 steps in MyERP.</span>
            </h2>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
              We redesigned the billing workflow from scratch for speed.
            </p>
          </div>
          <WorkflowComparison />
        </div>
      </section>

      {/* Section 4 — Demo Embed */}
      <TallyDemoSection />

      {/* Section 5 — Migration Steps */}
      <TallyMigrationSection />

      {/* Section 6 — Pricing */}
      <TallyPricingSection />

      {/* Section 7 — Migration Call CTA */}
      <section className="py-32 bg-amber-500">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <div className="bg-zinc-950 p-12 md:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-amber-500/20 transition-colors" />
            
            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                  Not sure if your setup is compatible? <span className="text-amber-500 underline decoration-zinc-800">Let&apos;s talk.</span>
                </h2>
                <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
                  Book a free 20-minute call. We&apos;ll review your Tally setup and tell you exactly what the migration looks like for your shop.
                </p>
              </div>

              <div className="flex flex-col items-center gap-4">
                <Link 
                  href="#calendly"
                  className="px-10 py-5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black uppercase tracking-widest text-sm rounded-xl transition-all shadow-[0_10px_40px_rgba(245,158,11,0.2)]"
                >
                  Book a free migration call
                </Link>
                <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest">
                  No sales pitch. Just an honest answer about whether MyERP fits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.3em]">
          &copy; 2026 MyERP Technologies. Built for speed.
        </p>
      </footer>
    </main>
  );
}
