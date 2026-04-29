'use client';

import Link from 'next/link';

interface DemoConversionBarProps {
  elapsedMs: number;
}

/**
 * DemoConversionBar
 * A slide-up call-to-action bar that appears after a successful demo.
 */
export default function DemoConversionBar({ elapsedMs }: DemoConversionBarProps) {
  const seconds = (elapsedMs / 1000).toFixed(1);

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] animate-slide-up px-4 pb-4 md:pb-8">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <h4 className="text-white font-bold text-lg">
              You did it in <span className="text-amber-500">{seconds}s</span>.
            </h4>
            <p className="text-zinc-400 text-sm">Your free trial is one click away.</p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2 w-full md:w-auto">
            <Link 
              href="/signup"
              className="w-full md:w-auto px-8 h-12 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center"
            >
              Start free trial
            </Link>
            <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">
              14 days free · No credit card · Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
