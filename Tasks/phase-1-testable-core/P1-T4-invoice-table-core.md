# P1-T4 — InvoiceTable Core

**Phase**: 1 — Testable Core  
**Status**: [x] COMPLETE  
**Estimated effort**: 1 day  
**Depends on**: Nothing — build the shell first, wire state later

---

## What This Is

The line items table inside DemoInvoice. Shows added products as rows.
Handles qty editing and row removal.
This task includes DemoInvoice's useReducer — the state backbone.

---

## DemoInvoice useReducer

Actions and their effects:

SET_CUSTOMER: { customer: string }
→ state.customer = payload.customer
→ if state.status === 'idle': state.status = 'active', state.startTime = Date.now()
→ state.hasInteracted = true

ADD_ITEM: { product: Product }
→ check if product.id already in items
  → if yes: increment qty by 1
  → if no: append { product, qty: 1, imei: '' }
→ recalculate derived values (subtotal, gstTotal, total) — these are derived, not stored
→ state.hasInteracted = true
→ if state.firstDropdownOpened === false: state.firstDropdownOpened = true

REMOVE_ITEM: { index: number }
→ remove items[index]

UPDATE_QTY: { index: number, qty: number }
→ if qty ≤ 0: remove item (same as REMOVE_ITEM)
→ else: items[index].qty = qty

UPDATE_IMEI: { index: number, imei: string }
→ items[index].imei = imei

SAVE:
→ state.status = 'saved'
→ state.savedMs = Date.now() - state.startTime

RESET:
→ return initialState (all fields cleared, status: 'idle')

---

## InvoiceTable Behavior

When items.length === 0:
- Show empty state: "No items added" + "Search above or press ↵ after customer name"

When items.length > 0:
- Show header row: Item | Rate | Qty | Amount | [remove]
- Show one InvoiceRow per item
- Show undo safety net text below last row: "↩ Undo available — click × on any row to remove" (11px, muted)

---

## InvoiceRow Behavior

Displays: product name, model number, GST rate + amount, qty input, line total (price × qty + GST)

IMEI field:
- Visible ONLY when product.category === 'Smartphone'
- Appears inline below product name
- Input: max 15 characters, placeholder "IMEI number (optional)"

Qty input:
- Type number, min 1
- onChange dispatches UPDATE_QTY
- If user types 0 or clears field: item is removed

Remove button:
- × button
- Desktop: visible on row hover only (CSS group-hover)
- Mobile: always visible
- onClick dispatches REMOVE_ITEM

After save: all inputs disabled

Line total calculation:
lineTotal = product.price × qty
lineGST = Math.floor(lineTotal × product.gst / 100)
displayed = lineTotal + lineGST

---

## Files to Create

- `components/demo/DemoInvoice.tsx` — Client Component, useReducer lives here
- `components/demo/InvoiceTable.tsx` — Client Component
- `components/demo/InvoiceRow.tsx` — Client Component
- `types/invoice.ts` — InvoiceItem, InvoiceState, InvoiceAction types
- `lib/gst.ts` — calcGST(price: number, rate: number): number — returns Math.floor(price * rate / 100)

---

## Acceptance Criteria

- [x] `types/invoice.ts` exists with InvoiceItem, InvoiceState, InvoiceAction fully typed, no `any`
- [x] `lib/gst.ts` exists with calcGST function, uses Math.floor (not Math.round)
- [x] useReducer is used (not multiple useState calls) in DemoInvoice
- [x] ADD_ITEM: adding same product twice increments qty (does not add duplicate row)
- [x] ADD_ITEM: adding different products creates separate rows
- [x] REMOVE_ITEM: row is removed from table
- [x] UPDATE_QTY to 0: row is removed
- [x] RESET: table clears completely, returns to empty state
- [x] IMEI field is visible for Smartphone category items
- [x] IMEI field is NOT visible for Accessories, Audio, TV category items
- [x] Qty input: changing value dispatches UPDATE_QTY immediately
- [x] Remove button: desktop — visible only on row hover; mobile — always visible
- [x] Line total = price × qty + GST (Math.floor for GST calculation)
- [x] Empty state shows correct text when no items
- [x] Undo safety net text appears when items.length ≥ 1
- [x] All inputs disabled after SAVE action
- [x] `npx tsc --noEmit` passes with 0 errors
