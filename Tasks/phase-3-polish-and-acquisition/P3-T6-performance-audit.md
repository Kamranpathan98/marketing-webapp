# P3-T6 — Performance Audit

**Phase**: 3 — Polish and Acquisition  
**Status**: [ ] NOT STARTED  
**Estimated effort**: 0.5 day  
**Depends on**: All Phase 1 and Phase 2 tasks complete, P3-T5 (mobile optimization done)

---

## What This Is

A Lighthouse audit pass targeting ≥ 90 on Performance.
Focuses on initial page load — not demo interaction performance (covered in P1-T8).
Primary lever: lazy-loading the demo with next/dynamic since it is the heaviest Client Component.

---

## Target Scores

All measured on homepage (/) on a simulated mobile (Moto G4, Fast 3G):
- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 95
- SEO: ≥ 90 (full SEO covered in P3-T7, but basic signals should be present)

---

## Required Optimizations

### 1. Lazy-load DemoInvoice with next/dynamic

```typescript
// In InlineDemoSection.tsx
import dynamic from 'next/dynamic';

const DemoInvoice = dynamic(() => import('../demo/DemoInvoice'), {
  loading: () => <DemoInvoiceSkeleton />,
  ssr: false,
});
```

DemoInvoiceSkeleton:
- Same dimensions as DemoInvoice (no layout shift)
- Shows a dark card with 3 gray placeholder rows
- No animation — static

### 2. Image optimization

All images must use Next.js <Image> component (not <img>).
Check: hero background (if any), OG images, any product screenshots.
Ensure width and height props are set to prevent layout shift.

### 3. Font loading

If Google Fonts or any external font is used:
- Use next/font (not <link> in head)
- font-display: swap

### 4. No render-blocking scripts

Verify no third-party scripts are loaded synchronously in <head>.
Google Analytics (gtag): loaded via next/script with strategy="afterInteractive".

### 5. Hero animation

HeroMicroAnimation uses only CSS — verify it is not blocking the main thread on load.
If the animation CSS file is large: inline critical CSS, defer non-critical.

---

## Audit Method

1. Build production bundle: `npm run build`
2. Start production server: `npm start`
3. Open Chrome DevTools → Lighthouse
4. Run audit on homepage: Mobile, Simulated throttling
5. Record scores
6. If any score < target: use Lighthouse recommendations to diagnose

Also run: `npm run build` and check bundle analyzer output (if next-bundle-analyzer is installed).

---

## Files to Create/Modify

- `components/sections/InlineDemoSection.tsx` — wrap DemoInvoice in next/dynamic
- `components/demo/DemoInvoiceSkeleton.tsx` — loading placeholder
- `app/layout.tsx` — ensure Google Analytics loaded with strategy="afterInteractive" if used

---

## Acceptance Criteria

- [ ] `npm run build` completes with no errors
- [ ] DemoInvoice is loaded via next/dynamic with ssr: false
- [ ] DemoInvoiceSkeleton exists and matches DemoInvoice dimensions (no layout shift on load)
- [ ] Lighthouse Performance score ≥ 90 on mobile simulation
- [ ] Lighthouse Accessibility score ≥ 95
- [ ] Lighthouse Best Practices score ≥ 95
- [ ] All images use Next.js <Image> component (no raw <img> tags)
- [ ] No layout shift (CLS ≤ 0.1 in Lighthouse)
- [ ] Google Analytics script (if present) loaded with strategy="afterInteractive"
- [ ] No render-blocking scripts in <head>
- [ ] Scores documented in this file under "## Measured Scores" section (add when audit runs)
