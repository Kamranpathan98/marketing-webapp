# P3-T2 — Auto-Focus Scroll-Velocity Refinement

**Phase**: 3 — Polish and Acquisition  
**Status**: [ ] NOT STARTED  
**Estimated effort**: 0.5 day  
**Depends on**: P1-T4 (DemoInvoice must exist with hasInteracted state)

---

## What This Is

The full 4-condition auto-focus trigger for the demo section.
Prevents the jarring experience of focus jumping to an input while the user is still scrolling.
Phase 1 used a simplified trigger — this task implements the complete spec.

---

## The 4 Conditions (ALL must be true)

1. Demo section ≥ 50% in viewport — tracked via IntersectionObserver with threshold: 0.5
2. hasInteracted === false — read from DemoInvoice state
3. Scroll velocity < 2px/ms — measured via scroll event listener
4. 350ms have elapsed since viewport threshold was crossed — setTimeout after condition 1 triggers

Auto-focus fires only when all 4 are simultaneously true.

If conditions 1 and 4 are met but velocity is still high: re-check velocity every 50ms until it drops below threshold or user interacts.

---

## Scroll Velocity Measurement

```typescript
let lastScrollY = window.scrollY;
let lastScrollTime = Date.now();
let scrollVelocity = 0;

window.addEventListener('scroll', () => {
  const now = Date.now();
  const dy = Math.abs(window.scrollY - lastScrollY);
  const dt = now - lastScrollTime;
  scrollVelocity = dt > 0 ? dy / dt : 0;
  lastScrollY = window.scrollY;
  lastScrollTime = now;
}, { passive: true });
```

Velocity check: scrollVelocity < 2 (px/ms)

---

## Override Behaviors

Override 1 — Mobile: Never auto-focus if window.innerWidth < 768px. This check must happen at the moment of firing, not just on mount (user could resize).

Override 2 — StickyDemoReminder click: If user clicked "Try it now" on StickyDemoReminder, bypass the velocity check (condition 3) but keep the 350ms delay. Implemented by passing a `bypassVelocityCheck` flag.

---

## Implementation Location

This logic lives in `components/sections/InlineDemoSection.tsx`.
InlineDemoSection:
- Owns the IntersectionObserver for the demo section
- Owns the scroll velocity listener
- Passes auto-focus trigger down to DemoInvoice via a ref callback or prop

---

## Files to Modify

- `components/sections/InlineDemoSection.tsx` — implement full 4-condition trigger, scroll velocity listener
- `components/demo/DemoInvoice.tsx` — expose a triggerAutoFocus() method via ref or callback prop

---

## Acceptance Criteria

- [ ] Auto-focus does NOT fire while user is actively scrolling fast (velocity ≥ 2px/ms)
- [ ] Auto-focus DOES fire when user scrolls to demo and comes to rest (velocity < 2px/ms)
- [ ] 350ms delay is present after demo section crosses 50% viewport threshold
- [ ] Auto-focus only fires when hasInteracted === false — never fires if user already interacted
- [ ] Auto-focus never fires on viewport width < 768px (checked at fire time, not mount time)
- [ ] StickyDemoReminder "Try it now" click: triggers auto-focus bypassing velocity check
- [ ] StickyDemoReminder override still waits 350ms before focusing
- [ ] Velocity re-check interval is 50ms when conditions 1 and 4 met but velocity still high
- [ ] Scroll listener uses { passive: true } flag
- [ ] IntersectionObserver and scroll listener both clean up on component unmount
- [ ] Auto-focus fires at most once per demo instance (resets after RESET action)
- [ ] `npx tsc --noEmit` passes with 0 errors
