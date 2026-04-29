'use client';

import React from 'react';

interface InvoiceTimerProps {
  elapsedMs: number;
  status: 'idle' | 'active' | 'saved';
  justStarted: boolean;
}

/**
 * InvoiceTimer
 * Purely presentational component that displays elapsed time.
 * Handles the "Timer started" flash animation.
 */
export default function InvoiceTimer({ 
  elapsedMs, 
  status, 
  justStarted 
}: InvoiceTimerProps) {
  // Format to X.Xs or XX.Xs
  const seconds = (elapsedMs / 1000).toFixed(1);

  let textColor = 'text-zinc-600';
  let fontWeight = 'font-medium';

  if (status === 'active') {
    textColor = 'text-amber-400';
  } else if (status === 'saved') {
    textColor = 'text-green-400';
    fontWeight = 'font-bold';
  }

  return (
    <div className="flex items-center gap-4">
      {/* Timer Flash Message */}
      {justStarted && (
        <div className="animate-fade-in-out flex items-center gap-1.5 py-1 px-2 rounded bg-amber-500/10 border border-amber-500/20">
          <span className="text-amber-500 text-[10px] font-bold uppercase tracking-tight">
            ⚡ Timer started
          </span>
        </div>
      )}

      {/* Elapsed Time Display */}
      <div className={`font-mono text-sm tabular-nums transition-colors duration-300 ${textColor} ${fontWeight}`}>
        {seconds}s
      </div>
    </div>
  );
}
