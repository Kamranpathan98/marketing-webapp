# P3-T7 — SEO Basics

**Phase**: 3 — Polish and Acquisition  
**Status**: [x] COMPLETE  
**Estimated effort**: 0.5 day  
**Depends on**: P3-T4 (/switch-from-tally page must exist)

---

## What This Is

Meta tags, OG image, and structured data for the homepage and /switch-from-tally.
This is the minimum viable SEO layer — enough for Google indexing and social sharing to work correctly.

---

## Acceptance Criteria

- [x] Homepage title tag: "MyERP — Invoice in 9 Seconds | Electronics Shop Billing"
- [x] Homepage meta description matches spec exactly
- [x] Homepage og:title and og:description are set
- [x] Homepage og:image points to /og-image.png (1200×630)
- [x] Homepage twitter:card is "summary_large_image"
- [x] /switch-from-tally title tag matches P3-T4 spec exactly
- [x] /switch-from-tally og:title and og:description are set
- [x] `public/og-image.png` exists at correct path and is viewable in browser
- [x] JSON-LD structured data is present on homepage (verify with Script tag)
- [x] `public/robots.txt` exists and disallows /api/
- [x] `app/sitemap.ts` exists and includes both homepage and /switch-from-tally
- [x] No duplicate title tags across pages
- [x] `npm run build` completes successfully
