import React from 'react';
import PricingToggle from '../pricing/PricingToggle';
import PricingCard from '../pricing/PricingCard';

/**
 * PricingSection
 * The main container for the pricing table and FAQ.
 * This is a Server Component that orchestrates the pricing experience.
 */
export default function PricingSection() {
  const plans = [
    {
      name: 'Starter',
      monthlyPrice: '799',
      annualPrice: '479',
      features: [
        'Up to 3 staff members',
        'Basic inventory management',
        'WhatsApp receipts',
        'Email support'
      ]
    },
    {
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
    },
    {
      name: 'Professional',
      monthlyPrice: '2,999',
      annualPrice: '1,799',
      features: [
        'Multi-location management',
        'Full API access',
        'Dedicated account manager',
        'Custom integrations',
        'Everything in Growth'
      ]
    }
  ];

  const faqs = [
    {
      q: 'Do I need to pay extra for GST filing?',
      a: 'No. GST export is included in Growth and Professional plans at no extra cost.'
    },
    {
      q: 'Can I import my data from Tally?',
      a: 'Yes. Growth and Professional include a free Tally data import wizard. Takes about 20 minutes.'
    },
    {
      q: 'What happens after the 14-day trial?',
      a: "You're asked to pick a plan. No data is deleted. No automatic charge."
    },
    {
      q: 'Is there a setup fee?',
      a: 'No setup fee. No onboarding fee. You pay only the monthly or annual subscription.'
    }
  ];

  return (
    <section className="py-24 bg-surface" id="pricing">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header & Toggle */}
        <div className="text-center space-y-8 mb-20">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Simple, transparent pricing.
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-medium">
              Start with a 14-day free trial. No credit card required. No hidden fees.
            </p>
          </div>
          
          <PricingToggle />
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-12">
          {plans.map((plan, i) => (
            <PricingCard key={i} plan={plan} />
          ))}
        </div>

        {/* Coupon Code */}
        <div className="text-center mb-24">
          <p className="text-amber-500 font-bold text-sm tracking-wide">
            Use code <span className="bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20 mx-1">FOUNDER2026</span> for 40% off — lifetime discount, first 50 annual customers.
          </p>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {faqs.map((faq, i) => (
              <div key={i} className="space-y-3">
                <h4 className="text-white font-bold text-base">{faq.q}</h4>
                <p className="text-zinc-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
