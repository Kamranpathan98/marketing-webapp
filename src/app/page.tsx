import HeroSection from '@/components/sections/HeroSection';
import SpeedComparisonSection from '@/components/sections/SpeedComparisonSection';
import TestimonialSection from '@/components/sections/TestimonialSection';
import InlineDemoSection from '@/components/demo/InlineDemoSection';
import SuccessMetricsSection from '@/components/sections/SuccessMetricsSection';
import TallyMigrationSection from '@/components/sections/TallyMigrationSection';
import PricingSection from '@/components/sections/PricingSection';

import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'MyERP — Invoice in 9 Seconds | Electronics Shop Billing',
  description: 'Billing software built for electronics retailers. Create GST invoices in 9 seconds. IMEI tracking, Tally migration included. 14-day free trial.',
  openGraph: {
    title: 'MyERP — Invoice in 9 Seconds',
    description: 'Billing software built for electronics retailers. GST-ready, keyboard-first, 9-second invoices.',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'MyERP — Invoice in 9 Seconds' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyERP — Invoice in 9 Seconds',
    description: 'Billing software built for electronics retailers.',
    images: ['/og-image.png'],
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "MyERP",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "Billing software for electronics retailers. GST invoices in 9 seconds.",
    "offers": {
      "@type": "Offer",
      "price": "479",
      "priceCurrency": "INR",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "billingDuration": "P1M",
        "billingIncrement": 1
      }
    }
  };

  return (
    <main className="bg-surface overflow-x-hidden">
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <SpeedComparisonSection />
      <TestimonialSection />
      <InlineDemoSection />
      <SuccessMetricsSection />
      <TallyMigrationSection />
      <PricingSection />
    </main>
  );
}
