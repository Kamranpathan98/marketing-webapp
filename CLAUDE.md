# MyERP Marketing Website — CLAUDE.md

## Project

Marketing website for MyERP — a keyboard-first billing ERP for Indian electronics retailers.
Core message: "Create invoices 2x faster than Tally"

## Tech Stack

- Next.js App Router (latest)
- TypeScript
- Tailwind CSS (pure — no component library)
- React (latest)
- No backend — demo is fully client-side with hardcoded data

## Folder Structure

D:\Projects\landing\
  src/
    app/                    ← Next.js App Router pages
      layout.tsx            ← Root layout (Navbar + Footer — not yet built)
      page.tsx              ← Homepage
      demo/page.tsx         ← Full demo page
      pricing/page.tsx      ← Pricing page
      switch-from-tally/    ← SEO acquisition page (Phase 3)
      api/signup/           ← API route for trial signup (Phase 2)
    components/
      layout/               ← Navbar, Footer
      sections/             ← Page sections (Hero, Pricing, etc.)
      hero/                 ← HeroMicroAnimation
      demo/                 ← All demo components (DemoInvoice, etc.)
      ui/                   ← Shared primitives (Button, Badge, etc.)
    hooks/                  ← useInvoiceTimer, useKeyboardNav, etc.
    lib/                    ← gst.ts, formatCurrency.ts, demoProducts.ts
    types/                  ← invoice.ts
    styles/                 ← hero-animation.css (Phase 1)
  Tasks/                    ← Execution plan + task files (DO NOT MODIFY)
    EXECUTION_PLAN.md       ← Source of truth for all design decisions
    STATUS.md               ← Task completion tracker
    phase-1-testable-core/
    phase-2-conversion-infrastructure/
    phase-3-polish-and-acquisition/

## Critical Rules

1. Demo interactions have a latency budget — see Tasks/EXECUTION_PLAN.md
   - No fetch() inside demo components
   - No async/await in event handlers
   - Debounce on search ≤ 100ms
   - Arrow keys: zero debounce

2. DemoInvoice uses useReducer (not multiple useState)

3. Derived values (subtotal, gstTotal, total) are NEVER stored in state.
   Compute in render from items array.

4. Server Components vs Client Components:
   - Mark 'use client' ONLY at the lowest necessary level
   - HeroMicroAnimation = Server Component (pure CSS, no JS)
   - DemoInvoice and all children = Client Components
   - Page shells = Server Components

5. GST calculation uses Math.floor (not Math.round) — see lib/gst.ts

6. Currency formatting uses en-IN locale — see lib/formatCurrency.ts

7. All demo product data is in lib/demoProducts.ts — never inline

## Task System

All work is tracked in /Tasks. 
Before starting any task, read the task file in /Tasks/phase-X/
A task is COMPLETE only when every checkbox in its acceptance criteria is checked.
Update Tasks/STATUS.md when a task is complete.

## Current Status

Phase 1 — Testable Core: IN PROGRESS
  P1-T1 Hero animation: NOT STARTED
  P1-T2 CustomerField: NOT STARTED
  P1-T3 ProductSearch: NOT STARTED
  P1-T4 InvoiceTable: NOT STARTED
  P1-T5 SummaryPanel: NOT STARTED
  P1-T6 Timer: NOT STARTED
  P1-T7 Save + SuccessOverlay: NOT STARTED
  P1-T8 Latency audit: NOT STARTED
