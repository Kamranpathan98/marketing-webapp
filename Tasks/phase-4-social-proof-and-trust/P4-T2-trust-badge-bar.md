# P4-T2 — Trust Badge Bar

**Phase**: 4 — Social Proof and Trust  
**Status**: [x] COMPLETE  
**Estimated effort**: 0.25 day  
**Depends on**: Phase 3 Complete

---

## What This Is

A subtle, grayscale logo bar representing industry associations, local retailer groups, or "Made in India" pride.
This builds "institutional" trust.

---

## Content Requirements

- [ ] **Logos**: 
    - "Made in India" badge.
    - "GST Compliant" seal.
    - "ISO 27001" (if applicable/placeholder).
    - Placeholder for "Electronics Retailers Association".
- [ ] **Design**: 
    - Low-contrast, grayscale logos (to not distract from CTAs).
    - Horizontal layout, centered.
    - Fades in on scroll.
- [ ] **Placement**: 
    - Just below the Hero section (the "Trust Line").
    - Above the footer.

---

## Files to Create/Modify

- `components/ui/TrustBar.tsx` — new component
- `components/sections/HeroSection.tsx` — replace the simple text trust line with this bar

---

## Acceptance Criteria

- [x] Logos are high-quality SVGs (or well-rendered placeholders)
- [x] Bar is responsive (stacks or horizontal scroll on mobile)
- [x] Grayscale until hover (optional)
- [x] Enhances the "premium" SaaS feel of the hero fold
