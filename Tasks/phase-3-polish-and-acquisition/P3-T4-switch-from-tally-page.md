# P3-T4 — /switch-from-tally Page

**Phase**: 3 — Polish and Acquisition  
**Status**: [x] COMPLETE  
**Estimated effort**: 1 day  
**Depends on**: P1-T4 through P1-T7 (demo must work to embed it), P2-T2 (pricing card to embed)

---

## What This Is

A dedicated landing page targeting Tally users searching for alternatives.
Route: /switch-from-tally
Built for SEO and paid ads — headline matches search intent.

---

## Page Sections (in order)

### Section 1 — Headline
H1: "Still using Tally for your electronics shop? There's a faster way."
Subheadline: "Invoice in 9 seconds. GST-ready. IMEI tracking. Tally data import included."
CTA button: "Try the 9-second demo" — anchor-scrolls to demo embed on this page

### Section 2 — 5 Tally Pain Points
Heading: "You already know these problems."
Pain points written in first-person voice:

1. "I open Tally, navigate to billing, and it's already taking 30 seconds before I've typed a thing."
2. "Entering a product name takes forever — I'm typing the full name every time."
3. "IMEI tracking is manual. I keep a separate spreadsheet."
4. "My accountant needs GST reports monthly and exporting from Tally is a full-day job."
5. "Training new staff on Tally takes a week. Half of them still make mistakes."

### Section 3 — Workflow Comparison (animated on scroll)
Heading: "13 steps in Tally. 6 steps in MyERP."

Tally column (13 steps):
1. Open Tally
2. Go to Gateway of Tally
3. Select Accounting Vouchers
4. Press F8 (Sales)
5. Select party name
6. Enter stock item name
7. Select unit
8. Enter qty
9. Enter rate
10. Repeat for each item
11. Check GST auto-fill
12. Save voucher
13. Print or email separately

MyERP column (6 steps):
1. Open billing (already open)
2. Press Enter for Walk-in or type customer name
3. Type 3 letters, press Enter to add item
4. Repeat for each item
5. Press F2 to save
6. Done — receipt generated

Scroll trigger: when section ≥ 40% in viewport, steps animate in one by one
Each step appears with opacity 0 → 1 + translateX(-8px → 0), staggered 60ms per step
Tally column animates first (left), MyERP column animates second (right)

### Section 4 — Demo Embed
Heading above: "Try it yourself. No signup. No Tally comparison — just faster billing."
Embeds the same DemoInvoice component used on the homepage.
Benchmark text changes: "Your personal best on this page" (not "Average: 9 sec")

### Section 5 — Migration Steps
Reuses content from TallyMigrationSection (import the component).

### Section 6 — Pricing (Growth card only)
Import and render only the Growth pricing card (not all 3 cards).
Below it: FOUNDER2026 coupon code display.
Include annual/monthly toggle — same PricingToggle component.

### Section 7 — Migration Call CTA
Heading: "Not sure if your setup is compatible? Let's talk."
Body: "Book a free 20-minute call. We'll review your Tally setup and tell you exactly what the migration looks like for your shop."
CTA button: "Book a free migration call" — links to Calendly (placeholder URL for now: #calendly)
Below button (small text): "No sales pitch. Just an honest answer about whether MyERP fits."

---

## SEO

Page metadata (in layout or generateMetadata):
- title: "Switch from Tally to MyERP — Invoice 6x Faster | MyERP"
- description: "Electronics retailers switching from Tally cut billing time from 3 minutes to 9 seconds. Free migration wizard. 14-day trial."
- og:title: same as title
- og:description: same as description
- og:type: "website"

H1: "Still using Tally for your electronics shop? There's a faster way." (exact match to Section 1)

---

## Files to Create

- [x] `app/switch-from-tally/page.tsx` — page with generateMetadata
- [x] `components/tally/WorkflowComparison.tsx` — Client Component (scroll animation)

---

## Acceptance Criteria

- [x] Route /switch-from-tally exists and renders without errors
- [x] H1 text matches exactly: "Still using Tally for your electronics shop? There's a faster way."
- [x] All 5 pain points present in first-person voice (exact copy from spec)
- [x] Tally column shows exactly 13 steps (exact copy from spec)
- [x] MyERP column shows exactly 6 steps (exact copy from spec)
- [x] Workflow comparison animates in on scroll (staggered, 60ms per step)
- [x] DemoInvoice is embedded on this page and fully functional
- [x] Demo benchmark text on this page says "Your personal best on this page" (not homepage text)
- [x] TallyMigrationSection component is reused (not duplicated)
- [x] Only the Growth pricing card is shown (not all 3)
- [x] FOUNDER2026 coupon code is displayed below Growth card
- [x] "Book a free migration call" CTA is present with link to #calendly
- [x] Page title tag: "Switch from Tally to MyERP — Invoice 6x Faster | MyERP"
- [x] Meta description matches spec exactly
- [x] og:title and og:description are set
- [x] `npx tsc --noEmit` passes with 0 errors
