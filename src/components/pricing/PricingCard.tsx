'use client';

import React from 'react';
import Link from 'next/link';
import { track } from '@/lib/analytics';

interface PricingPlan {
  name: string;
  monthlyPrice: string;
  annualPrice: string;
  features: string[];
  highlighted?: boolean;
  specialCopy?: string;
  badge?: string;
  savingsCallout?: string;
}

interface PricingCardProps {
  plan: PricingPlan;
}

/**
 * PricingCard
 * Displays a single pricing plan with a CTA.
 */
export default function PricingCard({ plan }: PricingCardProps) {
  const handleCtaClick = () => {
    track({
      event: 'signup_cta_clicked',
      source: 'pricing_section',
      demo_completed: false, // Default for global pricing section
      elapsed_ms: null
    });
  };

  return (
    <div className={`
      relative p-8 rounded-3xl border transition-all duration-300 flex flex-col h-full
      ${plan.highlighted 
        ? 'bg-zinc-900 border-amber-500/40 shadow-[0_0_40px_rgba(245,158,11,0.1)] scale-105 z-10' 
        : 'bg-zinc-900/50 border-white/5 hover:border-white/10'}
    `}>
      {plan.highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-zinc-950 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
        
        {plan.specialCopy && (
          <p className="text-amber-500 italic text-xs mb-2">{plan.specialCopy}</p>
        )}

        {plan.badge && (
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-800 border border-white/5 text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-4">
            <span>⚡</span> {plan.badge}
          </div>
        )}

        <div className="flex items-baseline gap-1 mt-2">
          {/* Annual Price */}
          <div className="pricing-annual flex items-baseline gap-1">
            <span className="text-4xl font-black text-white">₹{plan.annualPrice}</span>
            <span className="text-zinc-500 text-sm font-medium">/mo</span>
          </div>
          {/* Monthly Price */}
          <div className="pricing-monthly flex items-baseline gap-1">
            <span className="text-4xl font-black text-white">₹{plan.monthlyPrice}</span>
            <span className="text-zinc-500 text-sm font-medium">/mo</span>
          </div>
        </div>
        
        <div className="pricing-annual text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">
          (Billed annually)
        </div>

        {plan.savingsCallout && (
          <div className="pricing-annual text-amber-500/80 text-[10px] font-bold uppercase tracking-widest mt-2">
            {plan.savingsCallout}
          </div>
        )}
      </div>

      <ul className="space-y-4 mb-10 flex-grow">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3 text-sm text-zinc-400">
            <span className={idx === 0 ? 'text-amber-500' : 'text-zinc-600'}>
              {idx === 0 ? '⚡' : '✓'}
            </span>
            <span className={idx === 0 ? 'text-zinc-200 font-medium' : ''}>{feature}</span>
          </li>
        ))}
      </ul>

      <Link 
        href="/signup"
        onClick={handleCtaClick}
        className={`
          w-full py-4 rounded-xl font-bold text-sm transition-all text-center
          ${plan.highlighted 
            ? 'bg-amber-500 text-zinc-950 hover:bg-amber-400 shadow-[0_4px_20px_rgba(245,158,11,0.2)]' 
            : 'bg-zinc-800 text-white hover:bg-zinc-700'}
        `}
      >
        Start 14-Day Free Trial
      </Link>
    </div>
  );
}
