'use client';

import React, { useEffect, useRef, useState } from 'react';

const TALLY_STEPS = [
  "Open Tally",
  "Go to Gateway of Tally",
  "Select Accounting Vouchers",
  "Press F8 (Sales)",
  "Select party name",
  "Enter stock item name",
  "Select unit",
  "Enter qty",
  "Enter rate",
  "Repeat for each item",
  "Check GST auto-fill",
  "Save voucher",
  "Print or email separately"
];

const MYERP_STEPS = [
  "Open billing (already open)",
  "Press Enter for Walk-in or type customer name",
  "Type 3 letters, press Enter to add item",
  "Repeat for each item",
  "Press F2 to save",
  "Done — receipt generated"
];

/**
 * WorkflowComparison
 * Visual comparison of steps between Tally and MyERP.
 * Animates in when the section is scrolled into view.
 */
export default function WorkflowComparison() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.4) {
          setIsVisible(true);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
      {/* Tally Column */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 font-bold">
            13
          </div>
          <div>
            <h4 className="text-white font-bold">Tally ERP 9 / Prime</h4>
            <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">The Slow Way</p>
          </div>
        </div>

        <div className="space-y-3">
          {TALLY_STEPS.map((step, i) => (
            <div 
              key={i}
              className={`
                flex items-center gap-4 transition-all duration-500
                ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
              `}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="text-zinc-600 font-mono text-xs w-4">{i + 1}.</span>
              <p className="text-zinc-400 text-sm font-medium">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MyERP Column */}
      <div className="space-y-6 p-8 rounded-3xl bg-amber-500/5 border border-amber-500/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <span className="text-8xl font-black text-amber-500">6</span>
        </div>
        
        <div className="flex items-center gap-3 mb-8 relative z-10">
          <div className="w-10 h-10 rounded-xl bg-amber-500 border border-amber-500 flex items-center justify-center text-zinc-950 font-bold shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            6
          </div>
          <div>
            <h4 className="text-white font-bold text-xl">MyERP</h4>
            <p className="text-amber-500 text-xs uppercase tracking-widest font-black">The Faster Way</p>
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          {MYERP_STEPS.map((step, i) => (
            <div 
              key={i}
              className={`
                flex items-center gap-4 transition-all duration-500
                ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
              `}
              style={{ transitionDelay: `${(TALLY_STEPS.length + i) * 60}ms` }}
            >
              <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center">
                <span className="text-amber-500 font-bold text-[10px]">{i + 1}</span>
              </div>
              <p className="text-zinc-200 text-sm font-bold">{step}</p>
            </div>
          ))}
        </div>

        <div className={`
          mt-8 pt-8 border-t border-amber-500/10 transition-all duration-1000 delay-[1200ms]
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className="flex items-center gap-2 text-amber-500 font-black uppercase tracking-tighter text-2xl">
            <span>⚡ 95% Less friction</span>
          </div>
        </div>
      </div>
    </div>
  );
}
