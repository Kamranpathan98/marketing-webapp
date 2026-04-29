# P3-T3 — Analytics Instrumentation

**Phase**: 3 — Polish and Acquisition  
**Status**: [ ] NOT STARTED  
**Estimated effort**: 0.5 day  
**Depends on**: P1-T4, P1-T7, P2-T5 (demo and signup must exist to instrument)

---

## What This Is

5 analytics events tracked across the demo and signup flow.
Implementation uses a thin wrapper so the analytics provider can be swapped later.
For now the wrapper logs to console.log in development and sends to window.gtag in production.

---

## The 5 Events

### 1. demo_started
Fired: when hasInteracted changes from false to true (first keystroke anywhere in demo)
Payload:
```typescript
{
  event: 'demo_started',
  trigger: 'customer_field' | 'product_search'  // which field got the first keystroke
}
```

### 2. demo_item_added
Fired: on every ADD_ITEM dispatch
Payload:
```typescript
{
  event: 'demo_item_added',
  product_category: string,       // e.g. 'Smartphone'
  item_count: number,             // total items in invoice after add
  elapsed_ms: number              // time since demo_started
}
```

### 3. demo_completed
Fired: on SAVE dispatch
Payload:
```typescript
{
  event: 'demo_completed',
  elapsed_ms: number,             // savedMs
  item_count: number,             // items in the saved invoice
  used_walk_in: boolean           // was customer "Walk-in Customer"
}
```

### 4. signup_cta_clicked
Fired: when user clicks any "Start free trial" or "Start free trial and keep this invoice" button
Payload:
```typescript
{
  event: 'signup_cta_clicked',
  source: 'success_overlay' | 'demo_conversion_bar' | 'pricing_section' | 'final_cta' | 'sticky_reminder',
  demo_completed: boolean,        // was the demo completed before this click
  elapsed_ms: number | null       // savedMs if demo was completed, null otherwise
}
```

### 5. demo_reset
Fired: on RESET dispatch
Payload:
```typescript
{
  event: 'demo_reset',
  previous_elapsed_ms: number | null,   // savedMs before reset (null if never saved)
  reset_after_save: boolean             // true if demo was in 'saved' state when reset
}
```

---

## Analytics Wrapper

File: `lib/analytics.ts`

```typescript
type AnalyticsEvent = { event: string; [key: string]: unknown };

export function track(payload: AnalyticsEvent): void {
  if (process.env.NODE_ENV === 'development') {
    console.log('[analytics]', payload);
    return;
  }
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', payload.event, payload);
  }
}
```

All 5 events call track() — no direct gtag calls scattered through components.

---

## Files to Create/Modify

- `lib/analytics.ts` — analytics wrapper
- `components/demo/DemoInvoice.tsx` — fire demo_started, demo_item_added, demo_completed, demo_reset
- `components/demo/SuccessOverlay.tsx` — fire signup_cta_clicked (source: success_overlay)
- `components/demo/DemoConversionBar.tsx` — fire signup_cta_clicked (source: demo_conversion_bar)
- `components/sections/PricingSection.tsx` — fire signup_cta_clicked (source: pricing_section)
- `components/ui/StickyDemoReminder.tsx` — fire signup_cta_clicked (source: sticky_reminder)

---

## Acceptance Criteria

- [ ] `lib/analytics.ts` exists with the track() wrapper function
- [ ] In development: track() logs to console.log with `[analytics]` prefix
- [ ] In production: track() calls window.gtag if available (does not throw if gtag absent)
- [ ] demo_started fires on first keystroke, payload includes correct trigger field
- [ ] demo_item_added fires on every item add, payload includes product_category and item_count
- [ ] demo_completed fires on save, payload includes elapsed_ms and used_walk_in
- [ ] signup_cta_clicked fires from all 4 CTA locations, payload includes correct source value
- [ ] demo_reset fires on reset, payload includes reset_after_save boolean
- [ ] No event fires twice for the same user action
- [ ] All event payloads match the TypeScript types exactly (no missing fields)
- [ ] `npx tsc --noEmit` passes with 0 errors
