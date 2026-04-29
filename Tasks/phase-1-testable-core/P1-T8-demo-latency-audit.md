# P1-T8 — Demo Latency Audit

**Phase**: 1 — Testable Core  
**Status**: [ ] NOT STARTED  
**Estimated effort**: 0.5 day  
**Depends on**: P1-T1 through P1-T7 (all demo components must be built)

---

## What This Is

A verification pass — not a build task.
Every interaction is measured against the latency budget.
The demo cannot be considered done until this audit passes.

---

## Latency Budget (from EXECUTION_PLAN.md)

| Interaction | Maximum |
|---|---|
| Keystroke → character appears | 16ms |
| Search query → dropdown opens | 100ms |
| Arrow key → highlight moves | 16ms |
| Enter on result → row in table | 50ms |
| Qty change → line total updates | 16ms |
| Any change → grand total updates | 16ms |
| F2 / Save → success state | 50ms |
| Reset → empty state | 50ms |

---

## Audit Method

Use Chrome DevTools Performance tab for each measurement.

For each interaction:
1. Open Performance tab
2. Start recording
3. Perform the interaction once
4. Stop recording
5. Find the input event and the subsequent paint
6. Measure time from input event to next completed frame

For "dropdown opens" specifically:
- Type a character
- Measure from keydown event to dropdown visible (layout complete)

---

## Code Review Checklist

Before running browser measurements, verify these in code:

- [ ] `lib/demoProducts.ts` has no dynamic import — products are a static const exported at module level
- [ ] ProductSearch debounce is set to 100ms or less — grep for `setTimeout` in ProductSearch.tsx and verify the value
- [ ] Arrow key handlers have no debounce — verify onKeyDown in ProductSearch dispatches setHighlightedIndex synchronously
- [ ] ADD_ITEM dispatch has no await, no Promise, no setTimeout — verify in DemoInvoice or reducer
- [ ] Derived values (subtotal, gstTotal, total) are computed inline in render, not stored as separate state — verify in DemoInvoice
- [ ] SAVE dispatch has no loading state — verify no intermediate 'saving' status exists
- [ ] No fetch() calls anywhere in the demo component tree — grep for fetch and axios in components/demo/

---

## Browser Measurement Checklist

- [ ] Keystroke → character appears: measured ≤ 16ms
- [ ] Search query → dropdown opens: measured ≤ 100ms
- [ ] Arrow key → highlight moves: measured ≤ 16ms
- [ ] Enter on result → row in table: measured ≤ 50ms
- [ ] Qty change → line total: measured ≤ 16ms
- [ ] Grand total update: measured ≤ 16ms
- [ ] F2 → success state: measured ≤ 50ms
- [ ] Reset → empty state: measured ≤ 50ms

---

## Acceptance Criteria

- [ ] All 7 code review items above are verified clean (no violations found)
- [ ] All 8 browser measurements pass their maximum latency thresholds
- [ ] No fetch() or axios calls found in any file under components/demo/ — verified by grep
- [ ] No async/await found in any event handler in the demo component tree — verified by grep
- [ ] No setTimeout with value > 100ms found in the interaction path (visual-only timeouts of ≤ 800ms are permitted)
- [ ] Demo is tested on Chrome, Firefox, and Safari — all interactions feel instant in all three
- [ ] Demo is tested on a throttled CPU profile (4x slowdown in Chrome DevTools) — interactions still feel responsive
- [ ] Document the measured values in this file under "## Measured Results" section (add it when audit runs)
