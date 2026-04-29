/**
 * Analytics wrapper
 * Unified interface for event tracking. 
 * Redirects to console in dev and window.gtag in production.
 */

declare global {
  interface Window {
    gtag?: (command: string, action: string, params: any) => void;
  }
}

type AnalyticsEvent = { event: string; [key: string]: unknown };

export function track(payload: AnalyticsEvent): void {
  if (process.env.NODE_ENV === 'development') {
    console.log('[analytics]', payload);
    return;
  }
  
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    // Note: We're using the standard Gtag event format where payload.event is the action
    const { event, ...params } = payload;
    window.gtag('event', event, params);
  }
}
