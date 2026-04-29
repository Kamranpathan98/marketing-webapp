'use client';

import React, { useEffect, useRef, useState } from 'react';
import WalkInSkipHint from './WalkInSkipHint';

interface CustomerFieldProps {
  value: string;
  onChange: (value: string) => void;
  onConfirm: () => void;
  disabled: boolean;
  autoFocus?: boolean;
}

/**
 * CustomerField
 * Handles customer name input with a "Walk-in Customer" shortcut.
 * Includes auto-focus and amber flash animation on shortcut use.
 */
export default function CustomerField({ 
  value, 
  onChange, 
  onConfirm, 
  disabled,
  autoFocus = true 
}: CustomerFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showInstruction, setShowInstruction] = useState(true);
  const [isFlashing, setIsFlashing] = useState(false);

  // Auto-focus on mount
  useEffect(() => {
    if (autoFocus && inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [autoFocus, disabled]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    // Enter or Tab triggers confirmation or Walk-in shortcut
    if (e.key === 'Enter' || e.key === 'Tab') {
      if (!value) {
        // Walk-in Customer Shortcut Path
        e.preventDefault(); // Prevent Tab from moving focus before we handle it
        setIsFlashing(true);
        onChange('Walk-in Customer');
        setShowInstruction(false);
        
        // Amber flash duration (100ms)
        setTimeout(() => {
          setIsFlashing(false);
          onConfirm();
        }, 100);
      } else {
        // Normal confirmation
        onConfirm();
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (showInstruction) setShowInstruction(false);
    onChange(e.target.value);
  };

  return (
    <div className="space-y-1">
      <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
        Customer Name
      </label>
      
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          disabled={disabled}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          className={`
            w-full h-11 bg-surface border rounded-lg px-4 text-sm transition-all duration-150 font-sans
            ${isFlashing ? 'bg-amber-500/20 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'border-surface-border'}
            ${!disabled && !isFlashing ? 'focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 outline-none' : ''}
            ${value === 'Walk-in Customer' && !isFlashing ? 'ghost-value' : 'text-white'}
            disabled:opacity-60 disabled:cursor-not-allowed
          `}
        />
        
        {/* Ghost Text Overlay (visible when field is empty) */}
        {!value && !disabled && (
          <div className="absolute inset-0 flex items-center px-4 pointer-events-none select-none">
            <span className="ghost-value text-sm opacity-50">Walk-in Customer</span>
          </div>
        )}
      </div>

      <WalkInSkipHint visible={showInstruction && !value && !disabled} />
    </div>
  );
}
