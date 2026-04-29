# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing website for MyERP — a keyboard-first billing ERP for Indian electronics retailers.
Core message: "Create invoices 2x faster than Tally"

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # Run ESLint
```

No test runner is configured. Verify correctness by running the dev server and exercising demo interactions manually.

## Tech Stack

- Next.js 16 App Router
- React 19 + TypeScript
- Tailwind CSS v4 (pure — no component library)
- No backend — demo is fully client-side with hardcoded data

## Architecture

TypeScript path alias `@/` resolves to `src/`. Key modules:

- `src/types/invoice.ts` — `Product`, `InvoiceItem`, `InvoiceState`, `InvoiceAction`, `FocusField` types
- `src/lib/demoProducts.ts` — `DEMO_PRODUCTS` array + `searchProducts(query)` helper (returns max 6 results, synchronous)
- `src/lib/gst.ts` — `calcGST(price, rate)` and `calcGSTSplit(price, rate)` — both use `Math.floor`
- `src/lib/formatCurrency.ts` — uses `en-IN` locale

The full design spec (homepage section order, copy, component tree, keyboard map, auto-focus trigger logic, success overlay content, pricing details) lives in `Tasks/EXECUTION_PLAN.md`. Read it before implementing any UI.

### Server vs Client Components

- Page shells, layout, HeroSection, HeroMicroAnimation, SpeedComparisonSection, FeaturesGrid, TallyMigrationSection, Footer → **Server Components** (no `'use client'`)
- HeroMicroAnimation → Server Component, pure CSS animation, zero JS
- DemoInvoice and all its children → **Client Components**
- Mark `'use client'` only at the lowest necessary level

### Demo State (DemoInvoice)

Uses `useReducer` — never multiple `useState`. State shape and actions are defined in `src/types/invoice.ts`.

Derived values `subtotal`, `gstTotal`, `total` are **never stored in state** — compute from `items` in render.

## Critical Rules

**Demo latency (hard limits — violations are spec violations):**

| Interaction | Max | Method |
|---|---|---|
| Keystroke → character appears | 16ms | Controlled input, synchronous |
| Search → dropdown opens | 100ms | setTimeout debounce ≤ 100ms |
| Arrow key → highlight moves | 16ms | Synchronous, zero debounce |
| Enter on result → row added | 50ms | Synchronous reducer dispatch |
| Qty/total update | 16ms | Derived in render |
| F2/Save → success state | 50ms | Synchronous reducer dispatch |

**Prohibited in demo interaction path:** `fetch()`, `axios`, `async/await` in event handlers, `setTimeout > 100ms`, loading spinners, dynamic imports of product data.

**Permitted:** `setTimeout ≤ 800ms` for visual-only effects (timer flash, pulse), CSS transitions, `requestAnimationFrame`.

## Tailwind Tokens

Custom colors defined in `tailwind.config.ts`:
- `surface` / `surface-card` / `surface-elevated` / `surface-border` / `surface-border-muted` — dark surface palette
- `amber` / `amber-300` / `amber-400` / `amber-500` / `amber-600` — brand accent
- `text-2xs` — 11px / 16px line-height

Custom animations: `slide-in`, `fade-in-out`, `pulse-once`, `count-up`, `slide-up`.

Background: `bg-grid-texture` with `bg-grid-48` size.

CSS utilities in `globals.css`: `.demo-input` (amber focus ring), `.ghost-value` (italic zinc-500, for Walk-in Customer pre-fill), `.scrollbar-hide`.

Fonts: Geist Sans (`font-sans`) and Geist Mono (`font-mono`) via CSS variables.

## Task System

All work is tracked in `Tasks/`. Before starting any task, read its task file in `Tasks/phase-X/`.
A task is COMPLETE only when every checkbox in its acceptance criteria is checked.
After completing a task, update `Tasks/STATUS.md`.

Current task status: see `Tasks/STATUS.md`.
