# P3-T1 — Row Animations + Micro-Interactions

**Phase**: 3 — Polish and Acquisition  
**Status**: [x] COMPLETE  
**Estimated effort**: 0.5 day  
**Depends on**: P1-T4, P1-T5, P1-T7 (invoice table, summary panel, and save overlay must work)

---

## What This Is

Visual polish layer on top of the working demo.
Three micro-interactions: row slide-in on add, total scale pulse on change, and save border animation.
These are cosmetic — the demo must already work correctly before this task starts.

---

## Interaction 1 — Row Slide-In on ADD_ITEM

When a new row is added to InvoiceTable:
- The new row enters with: translateY(-6px → 0) + opacity(0 → 1)
- Duration: 180ms, easing: ease-out
- Only the NEW row animates — existing rows do not move
- Implementation: CSS class `.row-enter` applied to the row on mount, removed after animation completes

CSS:
```css
.row-enter {
  animation: rowSlideIn 180ms ease-out forwards;
}
@keyframes rowSlideIn {
  from { transform: translateY(-6px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

When qty is incremented (not a new row): no animation — the row stays in place.

---

## Interaction 2 — Total Scale Pulse on Change

When the grand total value changes (any ADD_ITEM, REMOVE_ITEM, UPDATE_QTY):
- Total amount briefly scales: scale(1) → scale(1.05) → scale(1)
- Duration: 150ms total, easing: ease-out then ease-in
- Implementation: CSS class `.total-pulse` toggled via useEffect watching total value

CSS:
```css
.total-pulse {
  animation: totalPulse 150ms ease-out;
}
@keyframes totalPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
```

---

## Interaction 3 — Save Border Animation

Already specified in P1-T7 (invoice border turns green on save).
This task verifies it is smooth and adds the box-shadow glow.

On SAVE:
- Border color transition: neutral → green-500/40 — 400ms ease
- Box shadow: 0 0 0px rgba(34,197,94,0) → 0 0 30px rgba(34,197,94,0.08) — 400ms ease

On RESET:
- Both properties transition back to neutral — 200ms ease

---

## Files to Modify

- `components/demo/InvoiceRow.tsx` — add `.row-enter` class on mount
- `components/demo/SummaryPanel.tsx` — add `.total-pulse` class when total changes
- `components/demo/DemoInvoice.tsx` — verify save/reset border transitions are in place

---

## Acceptance Criteria

- [x] New rows slide in from above (translateY -6px → 0) when added to table
- [x] Slide-in animation duration is ~180ms
- [x] Only the newly added row animates — existing rows do not shift
- [x] Incrementing qty on an existing row: no slide animation
- [x] Grand total pulses to scale(1.05) when any item change occurs
- [x] Total pulse animation duration is ~150ms
- [x] Total pulse uses CSS animation (not JS transform manipulation)
- [x] Invoice border transitions to green on save (400ms)
- [x] Box-shadow glow appears on save alongside border color
- [x] Border and shadow return to neutral on reset (200ms)
- [x] All animations use only transform and opacity (no layout properties)
- [x] Chrome DevTools Performance: no layout recalculations during any of these animations
- [x] Demo latency audit still passes after adding these animations (interactions still feel instant)
