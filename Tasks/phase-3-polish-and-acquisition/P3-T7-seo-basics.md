# P3-T7 — SEO Basics

**Phase**: 3 — Polish and Acquisition  
**Status**: [ ] NOT STARTED  
**Estimated effort**: 0.5 day  
**Depends on**: P3-T4 (/switch-from-tally page must exist)

---

## What This Is

Meta tags, OG image, and structured data for the homepage and /switch-from-tally.
This is the minimum viable SEO layer — enough for Google indexing and social sharing to work correctly.

---

## Homepage SEO

Using Next.js generateMetadata or Metadata export in app/page.tsx:

```typescript
export const metadata: Metadata = {
  title: 'MyERP — Invoice in 9 Seconds | Electronics Shop Billing',
  description: 'Billing software built for electronics retailers. Create GST invoices in 9 seconds. IMEI tracking, Tally migration included. 14-day free trial.',
  openGraph: {
    title: 'MyERP — Invoice in 9 Seconds',
    description: 'Billing software built for electronics retailers. GST-ready, keyboard-first, 9-second invoices.',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'MyERP — Invoice in 9 Seconds' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyERP — Invoice in 9 Seconds',
    description: 'Billing software built for electronics retailers.',
    images: ['/og-image.png'],
  },
};
```

---

## /switch-from-tally SEO

Already specified in P3-T4. This task verifies it is implemented correctly.

Title: "Switch from Tally to MyERP — Invoice 6x Faster | MyERP"
Description: "Electronics retailers switching from Tally cut billing time from 3 minutes to 9 seconds. Free migration wizard. 14-day trial."

---

## OG Image

File: `public/og-image.png`
Dimensions: 1200 × 630px
Content: Product name "MyERP" + tagline "Invoice in 9 Seconds" + dark background
This is a static image — no dynamic OG image generation needed at this stage.

If the image does not exist yet: create a placeholder using a simple dark card with text.
Tool: any image editor, or generate via a script. The image must exist at this path.

---

## Structured Data (JSON-LD)

Add to homepage only:

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "MyERP",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "Billing software for electronics retailers. GST invoices in 9 seconds.",
  "offers": {
    "@type": "Offer",
    "price": "479",
    "priceCurrency": "INR",
    "priceSpecification": {
      "@type": "UnitPriceSpecification",
      "billingDuration": "P1M",
      "billingIncrement": 1
    }
  }
}
```

Implementation: `<Script type="application/ld+json">` in app/page.tsx or layout.tsx.

---

## Robots and Sitemap

`public/robots.txt`:
```
User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://yourdomain.com/sitemap.xml
```

`app/sitemap.ts` (Next.js sitemap generation):
```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://yourdomain.com', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://yourdomain.com/switch-from-tally', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];
}
```

Note: replace yourdomain.com with actual domain before deploying.

---

## Files to Create/Modify

- `app/page.tsx` — add Metadata export
- `app/switch-from-tally/page.tsx` — verify Metadata from P3-T4 is correct
- `public/og-image.png` — create static OG image
- `public/robots.txt` — create robots file
- `app/sitemap.ts` — create sitemap

---

## Acceptance Criteria

- [ ] Homepage title tag: "MyERP — Invoice in 9 Seconds | Electronics Shop Billing"
- [ ] Homepage meta description matches spec exactly
- [ ] Homepage og:title and og:description are set
- [ ] Homepage og:image points to /og-image.png (1200×630)
- [ ] Homepage twitter:card is "summary_large_image"
- [ ] /switch-from-tally title tag matches P3-T4 spec exactly
- [ ] /switch-from-tally og:title and og:description are set
- [ ] `public/og-image.png` exists at correct path and is viewable in browser
- [ ] JSON-LD structured data is present on homepage (verify with Google Rich Results Test or view-source)
- [ ] `public/robots.txt` exists and disallows /api/
- [ ] `app/sitemap.ts` exists and includes both homepage and /switch-from-tally
- [ ] No duplicate title tags across pages
- [ ] `npx tsc --noEmit` passes with 0 errors
