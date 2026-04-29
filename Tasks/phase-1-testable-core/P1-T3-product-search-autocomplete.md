# P1-T3 — ProductSearch with Autocomplete

**Phase**: 1 — Testable Core  
**Status**: [x] COMPLETE  
**Estimated effort**: 1 day  
**Depends on**: P1-T4 (InvoiceTable must exist to receive added items)

---

## What This Is

The item search field with autocomplete dropdown.
This is the most interaction-dense component in the demo.
It is the core of the speed demonstration — 3 characters + Enter = item added.

---

## Data Source

Import from: `lib/demoProducts.ts`
All 10 products defined in EXECUTION_PLAN.md must be present.
Search runs synchronously against this in-memory array. No API call. No async.

Search matches on: name (case-insensitive), model number (case-insensitive), category (case-insensitive).

---

## Exact Behavior

Field is focused after CustomerField confirms (Enter/Tab from customer field).

When user types:
- Debounce: 100ms maximum (not 150ms, not 300ms)
- After 100ms: filter demoProducts array synchronously
- If results > 0: open dropdown
- First result is ALWAYS highlighted (index 0) — user can press Enter immediately

Dropdown:
- Each result shows: product name, model number, category, price (formatted INR), stock count, GST %
- Stock ≤ 3: stock count shown in red (low stock warning)
- Highlighted result: amber left border + amber background tint
- Max 6 results shown

Arrow key navigation:
- ↓: move highlight down (wraps from last to first)
- ↑: move highlight up (wraps from first to last)
- NO debounce on arrow keys — synchronous setState only

Enter key:
- Adds highlighted item to invoice
- Calls ADD_ITEM dispatch
- Clears search query
- Closes dropdown
- Re-focuses search field (stays on search for next item)

Tab key: same as Enter

Esc key:
- Closes dropdown (setOpen false)
- Clears query (setQuery '')
- Retains focus on search field

Blur:
- Closes dropdown after 150ms delay (to allow click on result to register first)

When user types nothing and presses ↓:
- Pre-loaded suggestions expand (all 10 products shown, first highlighted)

First dropdown open (per session):
- First time dropdown opens, footer hint "↵ Enter to add" has pulse animation
- Pulse: CSS animation, 2 cycles of 0.8s each, then stops
- After first item is added: pulse never appears again (firstDropdownOpened = true in state)

---

## Latency Requirements (from budget)

- Keystroke → character appears: ≤ 16ms
- Keystroke → dropdown opens: ≤ 100ms (debounce ceiling)
- Arrow key → highlight moves: ≤ 16ms (synchronous)
- Enter → item added to table: ≤ 50ms

---

## Component Interface

ProductSearch props:
- onItemAdd: (product: Product) => void
- disabled: boolean
- focusRef: RefObject (for programmatic focus from parent)
- onFirstDropdownOpen: () => void — called once, updates firstDropdownOpened in DemoInvoice

ProductSearchDropdown props (pure presentational):
- results: Product[]
- highlightedIndex: number
- onSelect: (product: Product) => void
- isFirstOpen: boolean (controls Enter pulse)

---

## Files to Create

- `components/demo/ProductSearch.tsx` — Client Component
- `components/demo/ProductSearchDropdown.tsx` — Client Component (presentational)
- `lib/demoProducts.ts` — static data, all 10 products

---

## Acceptance Criteria

- [x] `lib/demoProducts.ts` exists and contains all 10 products with all required fields
- [x] Search is synchronous — no API call, no async, verified by Network tab in DevTools (no requests during typing)
- [x] Debounce is ≤ 100ms — verified by typing quickly and measuring dropdown open time
- [x] First result is auto-highlighted when dropdown opens (no ↓ needed before Enter works)
- [x] Arrow ↓ navigates down the list; at last item, wraps to first
- [x] Arrow ↑ navigates up the list; at first item, wraps to last
- [x] Arrow key response is immediate — no perceptible delay between keypress and highlight change
- [x] Enter on highlighted item: item is added to invoice, dropdown closes, query clears, focus stays on search
- [x] Tab on highlighted item: same behavior as Enter
- [x] Esc: dropdown closes, query clears, focus stays on search field — invoice form does NOT close or reset
- [x] Blur with 150ms delay: clicking a result adds the item (blur doesn't fire before click registers)
- [x] Stock ≤ 3 shows stock count in red
- [x] First dropdown open: footer hint pulses for ~1.6s (2 × 0.8s cycles), then stops permanently
- [x] After first item added: pulse never appears again in the session
- [x] Pressing ↓ with empty field: all 10 products shown, first highlighted
- [x] Component returns null for keyboard hints on viewport < 768px
- [x] `npx tsc --noEmit` passes with 0 errors after this component is added
