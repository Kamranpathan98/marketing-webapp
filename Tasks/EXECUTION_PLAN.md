# MyERP Marketing Website — Complete Execution Plan
# Version 3.0 — Final

---

## THE ONE RULE

> If it does not help a user complete their first invoice faster, it does not ship in Phase 1.

---

## WEBSITE FLOW

Homepage section order (non-negotiable):

  Hero  [contains micro-animation]
    ↓
  Speed Proof  [leads with "Most Tally users take 2–3 min per invoice"]
    ↓
  Inline Interactive Demo  [auto-focus tightened + Walk-in Customer skip]
    ↓
  Feature Groups
    ↓
  Tally Migration Section
    ↓
  Pricing  [Growth plan has decision shortcut copy]
    ↓
  Final CTA

  [Floating] Sticky Demo Reminder — visible after user scrolls past demo


---

## TECH STACK

- Next.js App Router
- TypeScript
- Tailwind CSS
- React (latest)
- All demo data: hardcoded in-memory TypeScript constants
- No API calls inside demo interactions — ever


---

## DEMO LATENCY BUDGET (HARD LIMITS)

These are maximums, not targets. A violation is a spec violation.

| Interaction | Max Latency | Method |
|---|---|---|
| Keystroke → character appears | 16ms | Controlled input, synchronous |
| Search query → dropdown opens | 100ms | setTimeout debounce, max 100ms |
| Arrow key → highlight moves | 16ms | Synchronous setState, no debounce |
| Enter on result → row in table | 50ms | Synchronous reducer dispatch |
| Qty change → line total updates | 16ms | Derived value, computed in render |
| Any change → grand total updates | 16ms | Derived value, computed in render |
| F2 / Save → success state | 50ms | Synchronous reducer dispatch |
| Reset → empty state | 50ms | Synchronous reducer dispatch |

PROHIBITED in demo interaction path:
- fetch() or axios calls
- async/await in event handlers
- setTimeout > 100ms in interaction path
- Loading spinners or skeleton states
- Dynamic imports of product data

PERMITTED:
- setTimeout ≤ 800ms for visual-only effects (timer flash, pulse animations)
- CSS transitions and animations
- requestAnimationFrame for smooth counter animations


---

## COMPONENT TREE

Listed outermost to innermost.

### Server Components (rendered at build, no JS sent)
- layout.tsx — Navbar + Footer
- page.tsx — Homepage shell
- HeroSection — static copy + HeroMicroAnimation (CSS only)
- HeroMicroAnimation — looping CSS animation, no state
- SpeedComparisonSection — static shell (animation triggered by thin client wrapper)
- FeaturesGrid — static copy
- TallyMigrationSection — static copy
- TimeBenchmarkAnchor — static text above demo
- Footer — static

### Client Components (hydrated with React)
- InlineDemoSection — manages demo state + conversion bar
- DemoInvoice — core invoice state via useReducer
- CustomerField — auto-focus, Enter/Tab handling, WalkInSkipHint
- WalkInSkipHint — visibility based on field content
- ProductSearch — debounced search, dropdown, keyboard nav
- ProductSearchDropdown — pure presentational, receives props
- InvoiceTable — reactive to state changes
- InvoiceRow — qty edit, IMEI field conditional on phone category
- SummaryPanel — derived totals, count-up transition
- InvoiceTimer — setInterval, justStarted flash
- KeyboardHintBar — responds to focusedField changes
- SuccessOverlay — time result + trust line + ownership hook + Tally bar
- DemoConversionBar — slide-up CTA after save
- SpeedBarsAnimator — IntersectionObserver + animation trigger
- PricingToggle — annual/monthly state
- StickyDemoReminder — context-aware, IntersectionObserver


---

## DEMO STATE (useReducer)

Actions:
- SET_CUSTOMER — update customer name, start timer if not started
- ADD_ITEM — add product to items array, recalculate totals
- REMOVE_ITEM — remove by index, recalculate totals
- UPDATE_QTY — update qty by index, recalculate totals
- SAVE — transition to saved state, record savedMs
- RESET — return to idle state, clear all fields

State shape:
- customer: string
- items: InvoiceItem[]
- status: 'idle' | 'active' | 'saved'
- startTime: number | null
- savedMs: number | null
- hasInteracted: boolean
- firstDropdownOpened: boolean

Derived values (computed in render, never stored in state):
- subtotal = items.reduce(qty * price)
- gstTotal = items.reduce(calcGST per item)
- total = subtotal + gstTotal


---

## KEYBOARD MAP

| Key | Context | Action |
|---|---|---|
| Enter | CustomerField (empty) | Fill "Walk-in Customer", move focus to search |
| Enter | CustomerField (filled) | Move focus to search |
| Tab | CustomerField | Move focus to search |
| ↑↓ | ProductSearchDropdown open | Navigate results |
| Enter | ProductSearchDropdown open | Add highlighted item |
| Esc | ProductSearchDropdown open | Close dropdown, clear query, retain focus |
| Tab | ProductSearchDropdown open | Same as Enter (add item) |
| F2 | Any (items present) | Save invoice |
| F2 | Any (no items) | Silent ignore |
| Ctrl+Z | Items present | Remove last added item |
| F5 | Saved state | Reset / new invoice |


---

## AUTO-FOCUS TRIGGER (for demo section)

All four conditions must be true simultaneously:

1. Demo section ≥ 50% in viewport (IntersectionObserver)
2. User has NOT yet interacted with demo (hasInteracted === false)
3. Scroll velocity is near zero (< 2px/ms)
4. 350ms have elapsed since viewport threshold crossed

Override: Never auto-focus on viewport < 768px (mobile).
Override: If user clicked StickyDemoReminder, bypass velocity check but keep 350ms delay.


---

## WALK-IN CUSTOMER SKIP

- Customer field shows "Walk-in Customer" as ghost-fill (not standard placeholder)
- Below field: "↵ Press Enter to use Walk-in Customer" (11px, muted, always visible on load)
- Enter on empty field: fills "Walk-in Customer" with 100ms amber flash, moves focus to search
- First keystroke: instruction text fades out (opacity transition 200ms)
- Walk-in Customer text: light gray, slightly different visual from typed input (styled with CSS class, not just color)


---

## TIMER BEHAVIOR

- Timer starts on first keystroke in ANY field
- Displays as X.Xs format (seconds + tenths)
- On start: flash "⚡ Timer started" adjacent to timer for 800ms (fade in 100ms, hold 500ms, fade out 200ms)
- Running: amber color
- Stopped (saved): bold amber
- Saved: green, shows final time
- justStarted prop: boolean, true for 800ms after first keystroke, controls flash visibility


---

## SUCCESS OVERLAY CONTENT (exact copy)

Line 1: ✓ Invoice created in [X.Xs]
Line 2: "This is exactly how it works in real billing. No shortcuts." (13px, muted, italic)
Line 3: "This invoice can be yours in one click." (ownership hook)
Line 4: Tally comparison bar — fills over 3 real seconds, CSS animation
Line 5: [Start free trial and keep this invoice] — primary CTA
Line 6: [Create another invoice] — secondary, resets demo


---

## SPEED BADGE SYSTEM

Badge format: ⚡ [specific claim]

Placement:
- Hero: inline with subtext — ⚡ 9 sec invoice
- Demo section label chip: ⚡ Live Demo · 9 sec invoice
- Pricing Growth card: ⚡ keyboard-first billing (below plan name)
- Each pricing card: first feature in list has ⚡ prefix only
- Final CTA trust row: ⚡ 9 sec average invoice time

Rules:
- Maximum 1 badge per visual section
- Always use ⚡ emoji, never 🚀 or others
- Never larger than surrounding text
- Only on factual, specific claims


---

## PRICING PLANS

Starter: ₹799/mo (annual: ₹479/mo)
Growth: ₹1,799/mo (annual: ₹1,079/mo) — HIGHLIGHTED
Professional: ₹2,999/mo (annual: ₹1,799/mo)

Growth card special copy: "Best for shops switching from Tally" — 12px, amber, italic, below plan name
FOUNDER2026 coupon: 40% lifetime discount, first 50 annual customers

Annual default: true (toggle defaults to annual on load)


---

## DEMO PRODUCT DATASET (10 products)

All fields required: id, name, model, category, price (INR), gst (%), stock

1. Samsung Galaxy A55 5G | SM-A556B | Smartphone | 24999 | 18% | 12
2. Samsung Galaxy S24 | SM-S921B | Smartphone | 64999 | 18% | 5
3. Samsung 65" Crystal 4K TV | UA65AUE65 | TV | 54999 | 28% | 3
4. iPhone 15 128GB | MLXP3HN/A | Smartphone | 79999 | 18% | 8
5. iPhone 15 Pro 256GB | MTQ73HN/A | Smartphone | 134999 | 18% | 4
6. Realme 12 Pro+ 5G | RMX3840 | Smartphone | 26999 | 18% | 15
7. boAt Rockerz 550 BT | BT-550 | Accessories | 1799 | 18% | 30
8. Anker 67W GaN Charger | A2667 | Accessories | 2499 | 18% | 20
9. JBL Flip 6 Speaker | JBLFLIP6BLK | Audio | 11999 | 18% | 7
10. OnePlus Buds Pro 2 | E509A | Audio | 9999 | 18% | 10

IMEI field appears for category === 'Smartphone' only.
GST 28% applies to TV category. All others 18%.


---

## /switch-from-tally PAGE

Route: /switch-from-tally
Purpose: SEO + paid ads acquisition for Tally users actively searching for alternatives

Sections (in order):
1. Headline matching search intent — "Still using Tally for your electronics shop? There's a faster way."
2. 5 Tally pain points written in first-person user voice
3. 13-step vs 6-step workflow comparison (animated on scroll)
4. Demo embed (same DemoInvoice component, different benchmark text)
5. Migration steps — 3 steps with time estimates
6. Pricing (Growth card only) + FOUNDER2026 coupon
7. "Book a free migration call" CTA → Calendly link

SEO:
- Title: "Switch from Tally to MyERP — Invoice 6x Faster | MyERP"
- Meta: "Electronics retailers switching from Tally cut billing time from 3 minutes to 9 seconds. Free migration wizard. 14-day trial."
- H1: "Still using Tally for your electronics shop? There's a faster way."


---

## EXECUTION PHASES

### Phase 1 — Testable Core (ship first, test with real users)
P1-T1: Hero micro-animation (CSS only)
P1-T2: CustomerField with Walk-in Customer skip
P1-T3: ProductSearch with autocomplete + auto-highlight
P1-T4: InvoiceTable core (add/remove/qty)
P1-T5: SummaryPanel with live totals
P1-T6: InvoiceTimer with start flash
P1-T7: Save action + SuccessOverlay with trust line + ownership hook
P1-T8: Demo latency audit (verify all interactions meet budget)

Phase 1 gate: All tasks complete + 1 real Tally user completes demo unaided in < 30 seconds

### Phase 2 — Conversion Infrastructure
P2-T1: SpeedComparison section with animated bars
P2-T2: Pricing section with toggle + decision shortcut
P2-T3: Tally Migration section
P2-T4: StickyDemoReminder (context-aware)
P2-T5: Signup flow (2 fields: email + password)

Phase 2 gate: All tasks complete + signup flow tested end-to-end

### Phase 3 — Polish and Acquisition
P3-T1: Row entry animations + micro-interactions
P3-T2: Auto-focus scroll-velocity refinement
P3-T3: Analytics instrumentation (5 events)
P3-T4: /switch-from-tally page
P3-T5: Mobile optimization pass
P3-T6: Performance audit (Lighthouse ≥ 90)
P3-T7: SEO basics (meta tags, OG image, structured data)
