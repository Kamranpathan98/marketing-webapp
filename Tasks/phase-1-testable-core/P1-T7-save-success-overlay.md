# P1-T7 — Save Action + SuccessOverlay

**Phase**: 1 — Testable Core  
**Status**: [x] COMPLETE  
**Estimated effort**: 1 day  
**Depends on**: P1-T4, P1-T5, P1-T6 (must have invoice state, totals, timer working)

---

## What This Is

The save mechanism (F2 key + Save button) and the success state shown after saving.
This is the emotional payoff of the entire demo.
The SuccessOverlay contains the trust line and ownership hook — the two critical conversion copy elements.

---

## Save Mechanism

F2 key:
- Registered as a global keydown listener on window (useEffect in DemoInvoice)
- Only fires SAVE if: items.length > 0 AND status !== 'saved'
- If items.length === 0 and F2 pressed: silent ignore (no error, no message)
- If status === 'saved' and F2 pressed: silent ignore
- Cleanup: removeEventListener on unmount

Save button:
- Visible in action bar at bottom of invoice
- Disabled when items.length === 0
- Disabled when status === 'saved'
- onClick dispatches SAVE

Save action:
- Dispatches SAVE to reducer
- Reducer sets: status = 'saved', savedMs = Date.now() - startTime
- ZERO loading state — no spinner, no "Saving...", no delay
- Success state appears in the SAME render cycle as the dispatch

---

## SuccessOverlay Content (exact copy — do not paraphrase)

Line 1: "✓ Invoice created in [X.Xs]" — large, green, bold
Line 2 (13px, muted, italic): "This is exactly how it works in real billing. No shortcuts."
Line 3 (trust line): "This invoice can be yours in one click."
Line 4: Tally comparison bar (see below)
Line 5: Primary CTA button — "Start free trial and keep this invoice"
Line 6: Secondary link — "Create another invoice" — resets demo on click

Tally comparison bar:
- Label: "Tally billing time for this invoice:"
- A progress bar that fills from 0% to 100% over exactly 3 real seconds
- CSS animation: width 0% → 100%, animation-duration: 3s, animation-timing-function: linear
- Color: red (muted — not bright red)
- This bar takes 3 real seconds to fill. This is intentional. The user waits.
- Below the bar, when it completes: "3+ minutes" text appears

---

## DemoConversionBar

This is separate from SuccessOverlay. It is a slide-up bar in InlineDemoSection.

Appearance timing:
- Appears 500ms after SuccessOverlay shows
- Slides up from bottom of demo section (translateY: 60px → 0, 300ms ease-out)
- position: fixed bottom, NOT inside DemoInvoice

Content:
- "You did it in [X.Xs]. Your free trial is one click away."
- [Start free trial] button — primary
- "14 days free. No credit card. Cancel anytime." — small text

Disappears when:
- User clicks "Create another invoice" (RESET)
- User clicks any signup CTA

---

## Invoice Border on Save

When status changes to 'saved':
- Invoice container border: transition from neutral (#1f1f1f) to green (green-500/40)
- Box shadow: 0 0 30px rgba(34, 197, 94, 0.08)
- Transition: 400ms

---

## Reset Behavior

"Create another invoice" click:
- Dispatches RESET action
- SuccessOverlay unmounts
- DemoConversionBar slides down and unmounts
- Invoice border returns to neutral
- New invoice number generated (Math.random())
- Customer field auto-focused
- Timer returns to 0.0s

---

## Files to Create/Modify

- `components/demo/DemoInvoice.tsx` — add F2 listener, SAVE dispatch, save button
- `components/demo/SuccessOverlay.tsx` — Client Component
- `components/sections/InlineDemoSection.tsx` — Client Component, manages DemoConversionBar
- `components/demo/DemoConversionBar.tsx` — Client Component

---

## Acceptance Criteria

- [x] F2 key dispatches SAVE when items.length > 0
- [x] F2 key with no items: silent ignore (no error state, no message)
- [x] F2 key after already saved: silent ignore
- [x] Save button is disabled when items.length === 0
- [x] No loading state: success state appears immediately on save (same render cycle)
- [x] SuccessOverlay shows elapsed time in X.Xs format
- [x] Trust line present: "This is exactly how it works in real billing. No shortcuts." (exact copy)
- [x] Ownership hook present: "This invoice can be yours in one click." (exact copy)
- [x] Tally comparison bar fills over exactly 3 real seconds
- [x] Tally comparison bar uses CSS animation (not JS setInterval)
- [x] "3+ minutes" text appears after bar completes
- [x] CTA button text: "Start free trial and keep this invoice" (exact copy)
- [x] "Create another invoice" resets the demo completely
- [x] After reset: customer field is auto-focused
- [x] After reset: new invoice number is generated
- [x] Invoice border turns green on save (400ms transition)
- [x] DemoConversionBar appears 500ms after save
- [x] DemoConversionBar slides up from bottom (CSS transform, not JS animation)
- [x] DemoConversionBar disappears on reset
- [x] F2 global listener is cleaned up on unmount (removeEventListener)
- [x] `npx tsc --noEmit` passes with 0 errors
