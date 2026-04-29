# P1-T1 — Hero Micro-Animation

**Phase**: 1 — Testable Core  
**Status**: [x] COMPLETE  
**Estimated effort**: 0.5 day  
**Depends on**: Nothing — this can be built first

---

## What This Is

A looping 3-second CSS animation embedded inside the Hero section.
Shows one invoice being created (typing → row appears → total counts up → saved).
Purpose: user feels "this is fast" before reading the headline.

This is NOT the interactive demo. It is a passive visual teaser.

---

## Exact Behavior

Loop duration: 3.0 seconds. Restarts immediately on completion.

Frame 1 (0.0s – 0.8s):
- Item search field shows typing animation
- Characters appear one by one: "Sam..." at ~80ms per character
- Implemented as CSS animation on text content or using clip-path reveal

Frame 2 (0.8s – 1.2s):
- First product row slides into view: "Samsung Galaxy A55 · ₹24,999 · GST 18%"
- Animation: translateY(-8px → 0) + opacity(0 → 1), 200ms ease-out

Frame 3 (1.2s – 2.0s):
- Second row appears: "iPhone 15 128GB · ₹79,999 · GST 18%"
- Same slide-in animation, 200ms

Frame 4 (2.0s – 2.6s):
- Total counter animates: ₹0 → ₹1,22,357
- Count-up easing: ease-out, 600ms
- Displayed as formatted INR (₹X,XX,XXX)

Frame 5 (2.6s – 3.0s):
- "✓ Saved" badge appears in green
- 400ms hold

Frame 6 (3.0s):
- Entire animation fades to empty state (opacity 0, 300ms)
- Restarts

---

## Technical Constraints

- CSS ONLY. No JavaScript. No React state. No setInterval.
- Use CSS @keyframes with animation-delay on each element
- Use animation-iteration-count: infinite
- Use animation-fill-mode: both
- All animations run on compositor thread (transform + opacity only — no height, margin, top)
- Wrap entire component in @media (prefers-reduced-motion: reduce) — if matched, show static screenshot of completed invoice state instead of animation

---

## Placement

- Desktop: right side of Hero section, ~40% width, dark card frame
- Mobile: below CTA buttons
- Clicking the animation: smooth scroll to demo section (anchor link)
- The card frame around the animation should look like the actual product UI — same dark bg, same border color, same typography as DemoInvoice

---

## Files to Create

- `components/sections/HeroSection.tsx` — Server Component, imports HeroMicroAnimation
- `components/hero/HeroMicroAnimation.tsx` — Server Component, pure HTML + CSS
- `styles/hero-animation.css` — all @keyframes defined here (or in the component via <style> tag if using CSS modules)

---

## Acceptance Criteria

- [x] Animation loops continuously with no visible jump between cycles
- [x] Each frame timing matches the spec: 0.0s, 0.8s, 1.2s, 2.0s, 2.6s, 3.0s (±100ms tolerance)
- [x] No JavaScript used — verified by inspecting the component: no useState, no useEffect, no setInterval
- [x] Animation uses only transform and opacity (no layout-triggering properties)
- [x] On Chrome DevTools Performance tab: no layout recalculations during animation loop
- [x] Component renders correctly as a Server Component (no 'use client' directive)
- [x] @media (prefers-reduced-motion: reduce) is implemented — when enabled in OS settings, animation stops and static state is shown
- [x] Clicking the animation scrolls to the demo section
- [x] Desktop layout: animation is right-aligned, ~40% width, has dark card frame
- [x] Mobile layout: animation appears below CTA buttons, full width
- [x] Card frame visual matches DemoInvoice styling (same border color, dark bg, same font)
- [x] Page Lighthouse Performance score does not decrease by more than 2 points after adding this component
