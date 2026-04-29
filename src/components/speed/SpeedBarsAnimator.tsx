'use client';

import React, { useEffect, useState, useRef } from 'react';

/**
 * SpeedBarsAnimator
 * Handles the scroll-triggered animation for the speed comparison bars.
 * Uses IntersectionObserver to ensure animation only fires once.
 */
export default function SpeedBarsAnimator() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, we don't need the observer anymore
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.4 } // Trigger when 40% visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="space-y-10 w-full">
      {/* Tally Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Tally Prime</span>
          <span className="text-xl font-black text-red-500/80">~3 Minutes</span>
        </div>
        <div className="h-4 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5">
          <div 
            className="h-full bg-red-900/40 transition-all duration-[800ms] ease-out origin-left"
            style={{ width: isVisible ? '100%' : '0%' }}
          ></div>
        </div>
      </div>

      {/* MyERP Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <span className="text-sm font-bold text-amber-500 uppercase tracking-widest">MyERP</span>
          <span className="text-xl font-black text-amber-500">9 Seconds</span>
        </div>
        <div className="h-4 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/5">
          <div 
            className="h-full bg-amber-500 transition-all duration-[800ms] ease-out origin-left delay-300"
            style={{ width: isVisible ? '5%' : '0%' }}
          ></div>
        </div>
      </div>
    </div>
  );
}
