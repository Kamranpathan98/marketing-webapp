# P2-T2 — Pricing Section

**Phase**: 2 — Conversion Infrastructure  
**Status**: [ ] NOT STARTED  
**Estimated effort**: 1 day  
**Depends on**: Nothing in Phase 2 — can be built standalone

---

## What This Is

The pricing section with three plans, an annual/monthly toggle, and a Growth card
designed to convert Tally users who have already seen the demo.

---

## Plans and Pricing

Starter:
- Monthly: ₹799/mo
- Annual: ₹479/mo
- Features: Up to 3 staff, Basic inventory, WhatsApp receipts, Email support

Growth (HIGHLIGHTED):
- Monthly: ₹1,799/mo
- Annual: ₹1,079/mo
- Special copy below plan name: "Best for shops switching from Tally" — 12px, amber, italic
- Speed badge below plan name: ⚡ keyboard-first billing
- Features: Unlimited staff, Full inventory + IMEI, GST filing export, Priority support, Tally data import
- Border: amber glow (amber-500/40)
- "Most Popular" badge at top of card

Professional:
- Monthly: ₹2,999/mo
- Annual: ₹1,799/mo
- Features: Everything in Growth, Multi-location, API access, Dedicated account manager, Custom integrations

First feature in EVERY plan's feature list: prefixed with ⚡ (only the first one)

---

## Annual/Monthly Toggle

- Toggle defaults to ANNUAL on page load
- Toggle is a Client Component (PricingToggle)
- Switching to annual: prices update in the same render cycle (no animation needed, but a subtle fade works)
- Annual pricing shows: "[annual price]/mo" with "(billed annually)" below
- Monthly pricing shows: "[monthly price]/mo"
- Annual saves callout on Growth card: "Save ₹8,640/year vs monthly"

---

## FOUNDER2026 Coupon

- Displayed below pricing cards, not inside any card
- Text: "Use code FOUNDER2026 for 40% off — lifetime discount, first 50 annual customers."
- Style: amber text, centered, 14px
- No input field — just display the code

---

## FAQ Section

4 questions, always expanded (no accordion):

Q1: "Do I need to pay extra for GST filing?"
A1: "No. GST export is included in Growth and Professional plans at no extra cost."

Q2: "Can I import my data from Tally?"
A2: "Yes. Growth and Professional include a free Tally data import wizard. Takes about 20 minutes."

Q3: "What happens after the 14-day trial?"
A3: "You're asked to pick a plan. No data is deleted. No automatic charge."

Q4: "Is there a setup fee?"
A4: "No setup fee. No onboarding fee. You pay only the monthly or annual subscription."

---

## Files to Create

- `components/sections/PricingSection.tsx` — Server Component shell
- `components/pricing/PricingToggle.tsx` — Client Component (annual/monthly state)
- `components/pricing/PricingCard.tsx` — Server Component (receives plan data as props)

---

## Acceptance Criteria

- [ ] Toggle defaults to annual pricing on page load
- [ ] Switching toggle updates all three card prices simultaneously
- [ ] Starter monthly ₹799, annual ₹479 — correct on both toggle states
- [ ] Growth monthly ₹1,799, annual ₹1,079 — correct on both toggle states
- [ ] Professional monthly ₹2,999, annual ₹1,799 — correct on both toggle states
- [ ] Growth card has amber glow border
- [ ] Growth card shows "Best for shops switching from Tally" in amber italic 12px
- [ ] Growth card shows ⚡ keyboard-first billing badge
- [ ] Growth card shows "Most Popular" badge
- [ ] Annual savings callout shown on Growth card when annual is selected
- [ ] First feature in each plan list is prefixed with ⚡
- [ ] FOUNDER2026 coupon code is displayed below cards
- [ ] All 4 FAQ questions and answers are present (exact copy)
- [ ] PricingToggle is the only Client Component in this section
- [ ] `npx tsc --noEmit` passes with 0 errors
