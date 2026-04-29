'use client';

import React from 'react';

interface WalkInSkipHintProps {
  visible: boolean;
}

/**
 * WalkInSkipHint
 * Displays the "Press Enter to use Walk-in Customer" instruction.
 * Fades out when not visible.
 */
export default function WalkInSkipHint({ visible }: WalkInSkipHintProps) {
  return (
    <div 
      className={`mt-1.5 transition-opacity duration-200 hidden sm:block ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <span className="text-zinc-600 text-[11px] font-medium flex items-center gap-1.5 leading-none">
        <span className="text-zinc-700">↵</span>
        Press <kbd className="font-sans text-zinc-500">Enter</kbd> to use Walk-in Customer
      </span>
    </div>
  );
}
