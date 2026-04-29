'use client';

import React from 'react';


/**
 * PricingToggle
 * A sleek, high-contrast toggle for switching between Annual and Monthly billing.
 */
export default function PricingToggle() {
  const [billingCycle, setBillingCycle] = React.useState<'annual' | 'monthly'>('annual');

  React.useEffect(() => {
    // Sync initial state to document for Server Components
    document.documentElement.setAttribute('data-billing', 'annual');
  }, []);

  const handleCycleChange = (cycle: 'annual' | 'monthly') => {
    setBillingCycle(cycle);
    document.documentElement.setAttribute('data-billing', cycle);
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-zinc-900 border border-white/5 p-1 rounded-xl flex items-center relative">
        {/* Animated Background Slide */}
        <div 
          className={`absolute h-9 w-[100px] bg-amber-500 rounded-lg transition-all duration-300 ease-out ${
            billingCycle === 'annual' ? 'translate-x-0' : 'translate-x-[100px]'
          }`}
        />
        
        <button
          onClick={() => handleCycleChange('annual')}
          className={`relative z-10 w-[100px] py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
            billingCycle === 'annual' ? 'text-zinc-950' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          Annual
        </button>
        <button
          onClick={() => handleCycleChange('monthly')}
          className={`relative z-10 w-[100px] py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
            billingCycle === 'monthly' ? 'text-zinc-950' : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          Monthly
        </button>
      </div>
      
      {billingCycle === 'annual' && (
        <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest animate-pulse">
          Save up to 40% with Annual
        </span>
      )}
    </div>
  );
}
