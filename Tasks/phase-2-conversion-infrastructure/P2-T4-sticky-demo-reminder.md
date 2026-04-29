# P2-T4 — StickyDemoReminder

**Phase**: 2 — Conversion Infrastructure  
**Status**: [ ] NOT STARTED  
**Estimated effort**: 0.5 day  
**Depends on**: P1-T4 (needs DemoInvoice state to know demo completion status)

---

## What This Is

A fixed-position reminder bar that appears after the user scrolls past the demo section.
It is context-aware: its text changes based on whether the user has completed the demo.
Purpose: capture users who scrolled past the demo without trying it.

---

## Visibility Rules

Appears when:
- User has scrolled past the demo section (demo section no longer in viewport)
- AND: user has NOT completed a signup

Does NOT appear when:
- Viewport width < 768px (mobile) — never shown on mobile
- User has completed signup
- User is currently in the demo section

Tracked via IntersectionObserver on the demo section container.
When demo section exits viewport (scrolled past): StickyDemoReminder fades in.
When demo section re-enters viewport: StickyDemoReminder fades out.

Fade in: opacity 0 → 1, translateY(8px → 0), 200ms ease-out
Fade out: opacity 1 → 0, 150ms ease-in, then display: none

---

## Context-Aware Text States

State 1 — Demo not started (hasInteracted === false):
"↑ Try the 9-second demo above — no signup needed."
CTA button: "Try it now" — smooth scrolls to demo section, then triggers auto-focus (bypasses velocity check)

State 2 — Demo in progress (status === 'active'):
"You started — finish your invoice above. Press F2 to save."
CTA button: "Finish invoice ↑" — smooth scrolls to demo section

State 3 — Demo completed (status === 'saved'):
"You did it in [X.Xs]. Ready to start your free trial?"
CTA button: "Start free trial" — links to signup section or signup flow

---

## Component Structure

StickyDemoReminder:
- position: fixed, bottom: 0, full width, z-index: 50
- Background: dark (zinc-900), border-top: zinc-800
- Padding: 12px 16px
- Two columns: text left, CTA button right

State is passed down from InlineDemoSection (which holds DemoInvoice state).
StickyDemoReminder does NOT manage its own demo state — it only reads it.

StickyDemoReminder receives props:
- demoStatus: 'idle' | 'active' | 'saved'
- hasInteracted: boolean
- savedMs: number | null
- onTryItNow: () => void — triggers scroll + auto-focus
- isDemoInView: boolean — controls visibility

---

## Files to Create

- `components/ui/StickyDemoReminder.tsx` — Client Component

---

## Acceptance Criteria

- [ ] Component is never rendered on viewport < 768px
- [ ] Component is not visible when demo section is in viewport
- [ ] Component fades in when user scrolls past demo section
- [ ] Component fades out when user scrolls back to demo section
- [ ] State 1 text shown when hasInteracted === false: "↑ Try the 9-second demo above — no signup needed."
- [ ] State 2 text shown when status === 'active': "You started — finish your invoice above. Press F2 to save."
- [ ] State 3 text shown when status === 'saved': includes actual elapsed time in X.Xs format
- [ ] "Try it now" button scrolls to demo and bypasses velocity check for auto-focus
- [ ] "Finish invoice ↑" button scrolls to demo section
- [ ] Fade-in animation uses CSS transform + opacity only
- [ ] Component does not manage its own demo state — all state received as props
- [ ] IntersectionObserver cleans up on component unmount
- [ ] `npx tsc --noEmit` passes with 0 errors
