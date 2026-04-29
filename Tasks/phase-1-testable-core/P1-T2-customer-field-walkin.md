# P1-T2 — CustomerField with Walk-in Customer Skip

**Phase**: 1 — Testable Core  
**Status**: [ ] NOT STARTED  
**Estimated effort**: 0.5 day  
**Depends on**: P1-T4 (DemoInvoice shell must exist for CustomerField to live in)

---

## What This Is

The Customer Name input field at the top of the demo invoice.
Key feature: Walk-in Customer skip path — user presses Enter on empty field
and "Walk-in Customer" fills in, removing first-interaction friction.

---

## Exact Behavior

On demo mount:
- Field is auto-focused (via useEffect + ref.focus())
- Ghost text "Walk-in Customer" is visible in the field (not a standard HTML placeholder)
- Below the field: "↵ Press Enter to use Walk-in Customer" instruction text is visible

Ghost text styling:
- Color: zinc-500 (not zinc-400 which is standard placeholder)
- Has a subtle CSS class: `.ghost-value` — distinct from `.typed-value`
- Communicates "this value exists, press Enter to accept" — not "type something here"
- The visual difference from a real placeholder: slightly different opacity + a faint underline

Instruction text:
- Font size: 11px
- Color: zinc-600 (muted)
- Always visible on load — not on hover, not on focus
- Position: directly below the input, not inside it

When user presses Enter on EMPTY field:
- "Walk-in Customer" fills in with 100ms amber background pulse animation
- Focus immediately moves to Item Search field
- Timer starts (if not already started)
- Instruction text fades out: opacity 0, transition 200ms

When user types first character:
- Instruction text fades out: opacity 0, transition 200ms
- Ghost text disappears (controlled input — field now has typed value)
- Normal typing continues

When user presses Enter on FILLED field:
- Focus moves to Item Search field
- Timer starts (if not already started)

When user presses Tab on field (any state):
- Same behavior as Enter

After invoice is saved:
- Field is disabled (no further editing)
- Typed value remains visible

---

## Component Interface

Props:
- value: string
- onChange: (value: string) => void
- onConfirm: () => void — called when Enter or Tab pressed with any value (or after Walk-in fill)
- disabled: boolean

Internal state:
- showInstruction: boolean — true until first interaction, then false permanently

---

## Files to Create/Modify

- `components/demo/CustomerField.tsx` — Client Component
- `components/demo/WalkInSkipHint.tsx` — small sub-component, receives `visible: boolean`

---

## Acceptance Criteria

- [ ] Field is auto-focused when DemoInvoice mounts — cursor is blinking on page load without user clicking
- [ ] Ghost text "Walk-in Customer" is visible before any interaction
- [ ] Ghost text is visually distinct from a standard HTML placeholder (different class, different styling)
- [ ] Instruction text "↵ Press Enter to use Walk-in Customer" is visible below the field on load
- [ ] Pressing Enter on empty field: "Walk-in Customer" fills in, amber flash plays for ~100ms
- [ ] Pressing Enter on empty field: focus moves immediately to Item Search field
- [ ] Pressing Enter on empty field: instruction text fades out
- [ ] Typing first character: instruction text fades out within 200ms
- [ ] Pressing Enter on filled field: focus moves to Item Search field
- [ ] Pressing Tab on field (empty or filled): same behavior as Enter
- [ ] Timer starts on first keystroke in this field
- [ ] Field is disabled after invoice is saved
- [ ] No 'use client' warning — component is correctly marked 'use client'
- [ ] Keyboard-only flow: user can go from page load to Item Search field without touching the mouse
