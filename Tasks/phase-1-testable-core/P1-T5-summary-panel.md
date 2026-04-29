# P1-T5 — SummaryPanel

**Phase**: 1 — Testable Core  
**Status**: [x] COMPLETE  
**Estimated effort**: 0.5 day  
**Depends on**: P1-T4 (needs DemoInvoice state to be wired)

---

## What This Is

The totals panel at the bottom of the invoice.
Shows subtotal, GST total (CGST + SGST), and grand total.
All values are derived from items array — never stored in state.

---

## Derived Value Calculations

These are computed in the render function of DemoInvoice, passed as props to SummaryPanel.
They are NEVER stored in state.

subtotal = items.reduce((sum, item) => sum + item.product.price * item.qty, 0)
gstTotal = items.reduce((sum, item) => sum + Math.floor(item.product.price * item.qty * item.product.gst / 100), 0)
total = subtotal + gstTotal

---

## Display

Rows:
- "Subtotal" | ₹XX,XXX
- "CGST + SGST" | ₹XX,XXX
- "Total" | ₹XX,XXX (bold, amber color on the amount)

When items.length === 0:
- All values show ₹0
- Panel is visible but dimmed (opacity 0.4)

When items.length > 0:
- Full opacity
- Total amount has a CSS transition: when value changes, brief scale(1.05) → scale(1) over 150ms

Formatting: All amounts use Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })

---

## Component Interface

Props:
- subtotal: number
- gstTotal: number
- total: number

No internal state. Pure presentational component.

---

## Files to Create

- `components/demo/SummaryPanel.tsx` — Client Component (needs CSS transition)
- `lib/formatCurrency.ts` — formatINR(n: number): string using Intl.NumberFormat

---

## Acceptance Criteria

- [x] SummaryPanel has no internal state — all values received as props
- [x] Subtotal, CGST+SGST, and Total rows are all displayed
- [x] Total amount is bold and amber colored
- [x] When items.length === 0: panel is visible but dimmed
- [x] Adding an item: total updates immediately (same render cycle as ADD_ITEM dispatch)
- [x] Changing qty: total updates immediately
- [x] Removing an item: total updates immediately
- [x] All amounts formatted as INR with en-IN locale (₹24,999 not ₹24999)
- [x] `lib/formatCurrency.ts` exists and is used by SummaryPanel (not inline Intl calls)
- [x] Total value CSS transition: brief scale on change (150ms, transform only)
- [x] `npx tsc --noEmit` passes with 0 errors
