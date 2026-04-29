# P3-T5 — Mobile Optimization

**Phase**: 3 — Polish and Acquisition  
**Status**: [x] COMPLETE  
**Estimated effort**: 1 day  
**Depends on**: All Phase 1 and Phase 2 tasks complete

---

## What This Is

A focused mobile pass across the entire site.
The demo is not the primary mobile experience — the goal is that the page reads well
and conversion paths are accessible on mobile, not that the full demo is optimized for touch.

---

## Demo on Mobile

The demo IS functional on mobile but with these adjustments:
- [x] Layout: single column (customer field, then search, then table stacked vertically)
- [x] No keyboard hints (KeyboardHintBar hidden on viewport < 768px)
- [x] No StickyDemoReminder (hidden on viewport < 768px)
- [x] No auto-focus trigger (disabled on viewport < 768px)
- [x] F2 save: replaced with a visible "Save Invoice" button (F2 still works on physical keyboard)
- [x] Remove buttons on InvoiceRow: always visible (not hover-only) on mobile

Virtual keyboard handling:
- [x] When mobile keyboard opens (viewport height shrinks), the summary panel must remain visible
- [x] Use CSS env(keyboard-inset-height) or viewport-fit=cover where supported
- [x] Test on iOS Safari and Android Chrome

Touch targets:
- [x] All buttons: minimum 44×44px tap target (use padding, not size)
- [x] Product search results: minimum 48px height per row
- [x] Qty inputs: minimum 44px height
- [x] Remove buttons: minimum 44×44px

---

## Hero Section on Mobile

- [x] Animation (HeroMicroAnimation) appears below CTA buttons (already in P1-T1 spec)
- [x] CTA buttons stack vertically (not side by side)
- [x] Hero heading font size: clamp(28px, 6vw, 48px) — readable on small screens

---

## Pricing Section on Mobile

- [x] Cards stack vertically (single column)
- [x] Growth card still has amber border
- [x] Annual/monthly toggle remains visible and functional
- [x] FOUNDER2026 coupon text wraps correctly

---

## Navigation on Mobile

- [x] Navbar collapses to hamburger on viewport < 640px
- [x] Hamburger menu: full-screen overlay, large tap targets
- [x] Logo visible on all viewports

---

## Testing Requirements

Test on:
1. iPhone SE (375px) — smallest common iOS viewport
2. iPhone 14 (390px)
3. Android mid-range (360px)
4. iPad (768px) — tablet breakpoint

Test scenarios:
- Complete demo flow from customer field to save
- Tap all CTA buttons
- Open/close mobile nav
- Scroll through entire page

---

## Files to Modify

- [x] `components/demo/KeyboardHintBar.tsx` — hide on mobile (integrated as WalkInSkipHint)
- [x] `components/demo/InvoiceRow.tsx` — remove button always visible on mobile
- [x] `components/demo/DemoInvoice.tsx` — show Save button on mobile, disable auto-focus on mobile
- [x] `components/ui/StickyDemoReminder.tsx` — hide on mobile
- [x] `components/layout/Navbar.tsx` — add hamburger menu for mobile
- [x] Global CSS — ensure 44px touch targets, clamp typography

---

## Acceptance Criteria

- [x] All interactive elements have ≥ 44×44px tap targets (verified with Chrome DevTools device toolbar)
- [x] Product search dropdown rows are ≥ 48px height on mobile
- [x] Demo layout is single column on viewports < 768px
- [x] KeyboardHintBar is hidden on viewport < 768px
- [x] StickyDemoReminder is hidden on viewport < 768px
- [x] Auto-focus does not fire on viewport < 768px
- [x] Remove buttons on InvoiceRow are always visible on mobile (not hover-only)
- [x] "Save Invoice" button is visible on mobile (not just F2)
- [x] Mobile nav hamburger present on viewport < 640px
- [x] Hero heading is readable on 375px viewport (no overflow, no tiny text)
- [x] Pricing cards stack vertically on mobile
- [x] When mobile keyboard is visible, summary panel remains accessible (not hidden behind keyboard)
- [x] Demo is fully functional (add items, save) on iOS Safari 16+
- [x] Demo is fully functional on Android Chrome latest
- [x] No horizontal scroll on any page at any mobile viewport
- [x] Tested on iPhone SE (375px) — no broken layout
