# P2-T3 — Tally Migration Section

**Phase**: 2 — Conversion Infrastructure  
**Status**: [ ] NOT STARTED  
**Estimated effort**: 0.5 day  
**Depends on**: Nothing — fully static, no interactivity

---

## What This Is

A static section that addresses the migration concern directly and empathetically.
Purpose: remove the "but I have years of data in Tally" objection before it becomes a blocker.
Tone: calm, matter-of-fact, no FUD about Tally.

---

## Exact Content

Section heading: "Your Tally data comes with you."

Subheading (muted, below heading):
"Switching software is a real decision. Here's exactly what the process looks like."

3-step migration process:

Step 1 — Export (5 minutes)
"Export your masters from Tally: customers, products, ledgers. Standard Tally export — you've done this before."

Step 2 — Import (15 minutes)
"Upload the export file to MyERP. The import wizard maps your Tally fields automatically. You review and confirm."

Step 3 — Verify (10 minutes)
"Check 5 customer records and 5 products. If anything looks off, the wizard shows you exactly what to fix."

Below steps: "Total migration time: about 30 minutes. Your billing history stays in Tally for reference — you don't lose it."

Bottom of section — reassurance line:
"We've migrated 40+ electronics shops from Tally. None of them lost data."

---

## Design Notes

- This section is purely static — Server Component, no interactivity
- Steps displayed as a numbered list with large step numbers (text-6xl, muted)
- Time estimates shown as badges next to each step heading
- No before/after table, no FUD, no "Tally is slow" language in this section
- Tone is neutral about Tally — the migration section is about reassurance, not conversion

---

## Files to Create

- `components/sections/TallyMigrationSection.tsx` — Server Component

---

## Acceptance Criteria

- [ ] Section heading is exactly: "Your Tally data comes with you."
- [ ] All 3 migration steps are present with correct headings and body copy (exact copy from spec)
- [ ] Time estimates present for each step: 5 min, 15 min, 10 min
- [ ] "Total migration time: about 30 minutes." line is present
- [ ] "We've migrated 40+ electronics shops from Tally. None of them lost data." line is present
- [ ] Component has no 'use client' directive — pure Server Component
- [ ] No negative language about Tally in this section
- [ ] Section is positioned between FeaturesGrid and Pricing in homepage order
- [ ] Step numbers are visually large (prominent numbering style)
- [ ] Time estimate badges are visually distinct from step body copy
- [ ] `npx tsc --noEmit` passes with 0 errors
