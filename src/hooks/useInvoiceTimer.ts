'use client';

import { useState, useEffect, useRef } from 'react';

interface UseInvoiceTimerProps {
  status: 'idle' | 'active' | 'saved';
  startTime: number | null;
}

/**
 * useInvoiceTimer
 * Manages the high-precision timer for the interactive demo.
 * Syncs with the centralized status and startTime from useReducer.
 */
export function useInvoiceTimer({ status, startTime }: UseInvoiceTimerProps) {
  const [elapsedMs, setElapsedMs] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start timer when status is active and startTime is available
    if (status === 'active' && startTime) {
      intervalRef.current = setInterval(() => {
        setElapsedMs(Date.now() - startTime);
      }, 50); // 20 updates/second as per spec
    }

    // Stop timer when status is saved
    if (status === 'saved' || status === 'idle') {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      if (status === 'idle') {
        setElapsedMs(0);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [status, startTime]);

  // Derived: justStarted is true for the first 800ms of the timer
  const justStarted = status === 'active' && !!startTime && elapsedMs > 0 && elapsedMs < 800;

  return { elapsedMs, justStarted };
}
