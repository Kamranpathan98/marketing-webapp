# P2-T1 — SpeedComparison Section

**Phase**: 2 — Conversion Infrastructure  
**Status**: [x] COMPLETE  
**Estimated effort**: 0.5 day  
**Depends on**: Phase 1 complete (demo must exist to reference it)

---

## What This Is

A static section above the demo that leads with the specific Tally pain point.
Contains animated horizontal bars comparing MyERP vs Tally invoice times.
Scroll-triggered — bars animate in when the section enters the viewport.

---

## Exact Behavior

Section heading: "Most Tally users take 2–3 minutes per invoice."
Subheading: "Here's why that adds up fast."

Benchmark table (4 rows):

| Action | Tally | MyERP |
|---|---|---|
| Open billing module | 45 sec | 0 sec (already open) |
| Find/type customer | 30 sec | 3 keystrokes |
| Add items + IMEI | 60 sec | Enter × items |
| Save + print | 30 sec | F2 |

Below table: "Total: ~3 minutes vs 9 seconds on average."

Animated bars:
- Two horizontal bars: one red (Tally, ~180s), one amber (MyERP, ~9s)
- Width is proportional: Tally bar = 100%, MyERP bar = 5%
- On scroll into view: bars animate from 0% to their target width
- Animation: CSS transition, 600ms ease-out
- Trigger: IntersectionObserver, fires when section ≥ 40% in viewport
- Animation only fires once — not on every scroll

SpeedBarsAnimator:
- Thin Client Component wrapping only the animated bars
- Uses IntersectionObserver to toggle a CSS class (`animated`)
- When `animated` class is present: bars grow to full width via CSS transition
- Parent SpeedComparisonSection is a Server Component

---

## Files to Create

- `components/sections/SpeedComparisonSection.tsx` — Server Component (static copy + table)
- `components/speed/SpeedBarsAnimator.tsx` — Client Component (IntersectionObserver + CSS trigger)

---

## Acceptance Criteria

- [x] Section heading is exactly: "Most Tally users take 2–3 minutes per invoice."
- [x] All 4 benchmark table rows are present with correct data
- [x] "Total: ~3 minutes vs 9 seconds on average." line is present
- [x] Two bars present: red (Tally) and amber (MyERP)
- [x] MyERP bar is visually ~5% the width of Tally bar when fully animated
- [x] Bars start at 0 width and animate to target widths on scroll trigger
- [x] Animation is CSS transition (not JS-driven width updates)
- [x] IntersectionObserver fires animation only once per page load
- [x] SpeedComparisonSection is a Server Component (no 'use client' directive on it)
- [x] SpeedBarsAnimator is the only Client Component in this section
- [x] Section is positioned above the inline demo section in homepage order
- [x] On mobile: table is readable (horizontal scroll or stacked layout)
- [x] `npx tsc --noEmit` passes with 0 errors
