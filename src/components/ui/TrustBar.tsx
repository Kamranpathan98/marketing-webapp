'use client';

import React from 'react';

/**
 * TrustBar
 * A clean, grayscale row of trust badges and industry marks.
 */
export default function TrustBar() {
  const badges = [
    { label: 'Made in India', icon: '🇮🇳' },
    { label: 'GST Ready', icon: '🧾' },
    { label: 'Data Encrypted', icon: '🔒' },
    { label: 'Cloud Secure', icon: '☁️' },
    { label: '24/7 Support', icon: '📞' }
  ];

  return (
    <div className="w-full py-8 border-y border-white/5 bg-zinc-950/20 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {badges.map((badge, i) => (
            <div 
              key={i} 
              className="flex items-center gap-3 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default group"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">{badge.icon}</span>
              <span className="text-[10px] md:text-[11px] uppercase font-black tracking-[0.2em] text-white">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
