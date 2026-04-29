'use client';

import React from 'react';
import PricingToggle from '../pricing/PricingToggle';
import PricingCard from '../pricing/PricingCard';

/**
 * TallyPricingSection
 * Specifically shows ONLY the Growth plan for Tally switchers.
 */
export default function TallyPricingSection() {
  const growthPlan = {
    name: 'Growth',
    monthlyPrice: '1,799',
    annualPrice: '1,079',
    highlighted: true,
    specialCopy: 'Best for shops switching from Tally',
    badge: 'keyboard-first billing',
    savingsCallout: 'Save ₹8,640/year vs monthly',
    features: [
      'Unlimited staff members',
      'Full inventory + IMEI tracking',
      'GST filing export',
      'Tally data import wizard',
      'Priority phone support'
    ]
  };

  return (
    <section className="py-24 bg-surface border-t border-white/5" id="pricing">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            The perfect plan for your shop.
          </h2>
          <PricingToggle />
        </div>

        <div className="max-w-md mx-auto mb-12">
          <PricingCard plan={growthPlan} />
        </div>

        {/* Coupon Code */}
        <div className="text-center">
          <p className="text-amber-500 font-bold text-sm tracking-wide">
            Use code <span className="bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20 mx-1">FOUNDER2026</span> for 40% off — lifetime discount, first 50 annual customers.
          </p>
        </div>
      </div>
    </section>
  );
}
