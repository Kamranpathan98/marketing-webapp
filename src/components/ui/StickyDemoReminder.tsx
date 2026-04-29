'use client';

import React from 'react';
import Link from 'next/link';

interface StickyDemoReminderProps {
  demoStatus: 'idle' | 'active' | 'saved';
  hasInteracted: boolean;
  savedMs: number | null;
  onTryItNow: () => void;
  isDemoInView: boolean;
}

/**
 * StickyDemoReminder
 * A floating conversion bar that appears when the demo is out of view.
 * Guides the user back to the interactive experience.
 */
export default function StickyDemoReminder({
  demoStatus,
  hasInteracted,
  savedMs,
  onTryItNow,
  isDemoInView
}: StickyDemoReminderProps) {
  // Never show on mobile as per spec
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) return null;

  // Visibility state: Only show if demo is NOT in view
  const isVisible = !isDemoInView;

  // Derive content based on state
  let text = "";
  let buttonText = "";
  let isLink = false;
  
  if (demoStatus === 'saved' && savedMs) {
    text = `You did it in ${(savedMs / 1000).toFixed(1)}s. Ready to start your free trial?`;
    buttonText = "Start free trial";
    isLink = true;
  } else if (hasInteracted || demoStatus === 'active') {
    text = "You started — finish your invoice above. Press Ctrl+S to save.";
    buttonText = "Finish invoice ↑";
  } else {
    text = "↑ Try the 9-second demo above — no signup needed.";
    buttonText = "Try it now";
  }

  const commonClasses = "px-5 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-black uppercase tracking-widest rounded-lg transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] whitespace-nowrap flex items-center justify-center";

  return (
    <div 
      className={`
        fixed bottom-0 left-0 w-full z-50 transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}
      `}
    >
      <div className="bg-zinc-900/95 backdrop-blur-md border-t border-zinc-800 shadow-[0_-10px_40px_rgba(0,0,0,0.4)]">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between gap-8">
          
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <p className="text-zinc-300 text-sm font-medium">
              {text}
            </p>
          </div>

          {isLink ? (
            <Link href="/signup" className={commonClasses}>
              {buttonText}
            </Link>
          ) : (
            <button onClick={onTryItNow} className={commonClasses}>
              {buttonText}
            </button>
          )}

        </div>
      </div>
    </div>
  );
}
