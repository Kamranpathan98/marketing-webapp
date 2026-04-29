# P4-T1 — Testimonial Carousel

**Phase**: 4 — Social Proof and Trust  
**Status**: [x] COMPLETE  
**Estimated effort**: 0.5 day  
**Depends on**: Phase 3 Complete

---

## What This Is

A premium, horizontal-scrolling or auto-playing carousel of customer testimonials.
Retailers need to see that *other people like them* (electronics shop owners) are successfully using the product.

---

## Design Requirements

- [ ] **Card Design**: 
    - Dark-mode "Glassmorphism" effect (border + blur).
    - Amber star ratings (5 stars).
    - Clear typography for the quote.
    - Avatar placeholder or real photo.
    - Shop name and location (e.g., "SK Mobiles, Mumbai").
- [ ] **Interaction**:
    - Smooth horizontal scroll on mobile.
    - Previous/Next buttons on desktop.
    - Subtle auto-play (optional, but nice).
- [ ] **Placement**: 
    - On Homepage, between `SpeedComparisonSection` and `InlineDemoSection`.
    - Also on `/switch-from-tally`.

---

## Sample Data (The "Personas")

1. **Suresh Raina**, Owner of *Raina Electronics, Lucknow*  
   "I used to stay in the shop until 10 PM just to finish my Tally billing. With MyERP, I'm home by 8:30. The keyboard shortcuts are a lifesaver."
2. **Anjali Gupta**, Manager at *Global Mobile Hub, Delhi*  
   "IMEI tracking was a nightmare in our old software. Now we just scan the barcode and it's done. Fastest GST billing we've ever used."
3. **Vikram Singh**, *Singh & Sons, Chandigarh*  
   "Migrating our 10 years of Tally data took less than an hour. The support team is incredible."

---

## Files to Create/Modify

- `components/sections/TestimonialSection.tsx` — new section component
- `components/ui/TestimonialCard.tsx` — reusable card component
- `app/page.tsx` — integrate the section
- `app/switch-from-tally/page.tsx` — integrate the section

---

## Acceptance Criteria

- [x] Carousel is responsive (visible on mobile/tablet/desktop)
- [x] At least 3 distinct personas from the electronics industry
- [x] Smooth transitions between slides
- [x] Glassmorphism styling matches the existing "premium" theme
- [x] Includes star ratings and shop locations for credibility
- [x] No layout shift when interacting with the carousel
