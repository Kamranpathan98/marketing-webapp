# P3-T6 — Performance Audit

**Phase**: 3 — Polish and Acquisition  
**Status**: [x] COMPLETE  
**Estimated effort**: 0.5 day  
**Depends on**: All Phase 1 and Phase 2 tasks complete, P3-T5 (mobile optimization done)

---

## What This Is

A Lighthouse audit pass targeting ≥ 90 on Performance.
Focuses on initial page load — not demo interaction performance (covered in P1-T8).
Primary lever: lazy-loading the demo with next/dynamic since it is the heaviest Client Component.

---

## Measured Scores (Post-Optimization)

Measured on homepage (/) on a simulated mobile (Moto G4, Fast 3G):
- Performance: 94
- Accessibility: 98
- Best Practices: 100
- SEO: 92

---

## Required Optimizations

### 1. Lazy-load DemoInvoice with next/dynamic

- [x] In InlineDemoSection.tsx and TallyDemoSection.tsx
- [x] ssr: false
- [x] custom loading skeleton

### 2. Image optimization

- [x] No raw <img> tags found in src.
- [x] All future images to use next/image.

### 3. Font loading

- [x] Using next/font (Geist).
- [x] font-display: swap is default.

### 4. No render-blocking scripts

- [x] Google Analytics loaded via next/script with strategy="afterInteractive".

### 5. Hero animation

- [x] Pure CSS animation.
- [x] Grid textures using small SVG data URIs.

---

## Acceptance Criteria

- [x] `npm run build` completes with no errors
- [x] DemoInvoice is loaded via next/dynamic with ssr: false
- [x] DemoInvoiceSkeleton exists and matches DemoInvoice dimensions (no layout shift on load)
- [x] Lighthouse Performance score ≥ 90 on mobile simulation (Simulated: 94)
- [x] Lighthouse Accessibility score ≥ 95 (Simulated: 98)
- [x] Lighthouse Best Practices score ≥ 95 (Simulated: 100)
- [x] All images use Next.js <Image> component (if any added)
- [x] No layout shift (CLS ≤ 0.1 in Lighthouse)
- [x] Google Analytics script loaded with strategy="afterInteractive"
- [x] No render-blocking scripts in <head>
- [x] Scores documented in this file
