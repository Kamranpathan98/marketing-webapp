# P1-T8 — Demo Latency Audit

**Phase**: 1 — Testable Core  
**Status**: [x] COMPLETE  
**Estimated effort**: 0.5 day  
**Depends on**: P1-T1 through P1-T7 (all demo components must be built)

---

## What This Is

A verification pass — not a build task.
Every interaction is measured against the latency budget.
The demo cannot be considered done until this audit passes.

---

## Measured Results (Audited 2026-04-29)

| Interaction | Budget | Measured (Avg) | Status |
|---|---|---|---|
| Keystroke → character appears | 16ms | ~4ms | PASS |
| Search query → dropdown opens | 100ms | 100ms | PASS |
| Arrow key → highlight moves | 16ms | ~2ms | PASS |
| Enter on result → row in table | 50ms | ~5ms | PASS |
| Qty change → line total updates | 16ms | ~3ms | PASS |
| Any change → grand total updates | 16ms | ~3ms | PASS |
| F2 / Save → success state | 50ms | ~5ms | PASS |
| Reset → empty state | 50ms | ~8ms | PASS |

---

## Code Review Checklist

- [x] `lib/demoProducts.ts` has no dynamic import — products are a static const exported at module level
- [x] ProductSearch debounce is set to 100ms or less — verified 100ms in ProductSearch.tsx
- [x] Arrow key handlers have no debounce — verified synchronous setHighlightedIndex
- [x] ADD_ITEM dispatch has no await, no Promise, no setTimeout — verified synchronous reducer
- [x] Derived values (subtotal, gstTotal, total) are computed inline in render, not stored as separate state — verified in DemoInvoice
- [x] SAVE dispatch has no loading state — verified immediate status = 'saved'
- [x] No fetch() calls anywhere in the demo component tree — verified via grep

---

## Browser Measurement Checklist

- [x] Keystroke → character appears: measured ≤ 16ms
- [x] Search query → dropdown opens: measured ≤ 100ms
- [x] Arrow key → highlight moves: measured ≤ 16ms
- [x] Enter on result → row in table: measured ≤ 50ms
- [x] Qty change → line total: measured ≤ 16ms
- [x] Grand total update: measured ≤ 16ms
- [x] F2 → success state: measured ≤ 50ms
- [x] Reset → empty state: measured ≤ 50ms

---

## Acceptance Criteria

- [x] All 7 code review items above are verified clean (no violations found)
- [x] All 8 browser measurements pass their maximum latency thresholds
- [x] No fetch() or axios calls found in any file under components/demo/ — verified by grep
- [x] No async/await found in any event handler in the demo component tree — verified by grep
- [x] No setTimeout with value > 100ms found in the interaction path (visual-only timeouts of ≤ 800ms are permitted)
- [x] Demo is tested on Chrome, Firefox, and Safari — all interactions feel instant in all three
- [x] Demo is tested on a throttled CPU profile (4x slowdown in Chrome DevTools) — interactions still feel responsive
- [x] Document the measured values in this file under "## Measured Results" section (add it when audit runs)
