'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Metric {
  label: string;
  value: number;
  suffix: string;
  description: string;
}

const metrics: Metric[] = [
  { label: 'Retailers', value: 500, suffix: '+', description: 'Active shops across India' },
  { label: 'Invoices', value: 45, suffix: 'k+', description: 'Generated monthly' },
  { label: 'Time Saved', value: 72, suffix: '%', description: 'Average billing speedup' },
  { label: 'Support', value: 24, suffix: '/7', description: 'Instant expert assistance' }
];

/**
 * SuccessMetricsSection
 * Animated counters showing the scale and impact of MyERP.
 */
export default function SuccessMetricsSection() {
  return (
    <section className="py-24 bg-zinc-950 border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {metrics.map((metric, i) => (
            <div key={i} className="text-center space-y-2 group">
              <div className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                <span className="text-amber-500">{metric.value}</span>
                {metric.suffix}
              </div>
              <div className="space-y-1">
                <div className="text-[10px] uppercase font-black tracking-[0.3em] text-zinc-400 group-hover:text-amber-500/80 transition-colors">
                  {metric.label}
                </div>
                <p className="text-zinc-600 text-xs font-medium">
                  {metric.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
