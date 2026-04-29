# P1-T6 — InvoiceTimer with Start Flash

**Phase**: 1 — Testable Core  
**Status**: [x] COMPLETE  
**Estimated effort**: 0.5 day  
**Depends on**: P1-T4 (timer state lives in DemoInvoice)

---

## What This Is

The elapsed-time display in the demo invoice.
Starts on first keystroke. Stops on save. Shows the user how fast they are.

---

## Timer Behavior

Timer lives in DemoInvoice as a setInterval (not in InvoiceTimer component).
InvoiceTimer is purely presentational — receives elapsedMs and status as props.

setInterval:
- Fires every 50ms (20 updates/second — smooth enough, not taxing)
- Increments elapsedMs = Date.now() - startTime
- Starts when SET_CUSTOMER or ADD_ITEM action fires with status === 'idle'
- Stops (clearInterval) when SAVE fires
- Clears on RESET
- Cleanup in useEffect return function

Display format: X.Xs (e.g., "9.4s" not "00:09.4")
- Below 10s: "X.Xs"
- 10s and above: "XX.Xs"

Visual states:
- Idle (not started): shows "0.0s", color zinc-600 (muted)
- Running: color amber-400
- Saved: color green-400, bold

Start flash (justStarted):
- justStarted is a boolean ref (not state) in DemoInvoice
- Set to true when timer starts
- A setTimeout of 800ms sets it back to false
- InvoiceTimer receives justStarted: boolean prop

Flash element:
- Text: "⚡ Timer started"
- Visible only when justStarted === true
- CSS animation: fadeInOut — opacity 0→1 (100ms), hold (500ms), 1→0 (200ms)
- Total duration: 800ms
- After fade, element unmounts (conditional render based on justStarted)
- Color: amber

---

## Component Interface

InvoiceTimer props:
- elapsedMs: number
- status: 'idle' | 'active' | 'saved'
- justStarted: boolean

No internal state. No setInterval inside this component.

useInvoiceTimer hook (lives in DemoInvoice or as a hook file):
- Manages setInterval
- Returns { elapsedMs, justStarted }

---

## Files to Create

- `components/demo/InvoiceTimer.tsx` — Client Component, presentational only
- `hooks/useInvoiceTimer.ts` — hook managing setInterval and justStarted

---

## Acceptance Criteria

- [x] setInterval is in DemoInvoice or useInvoiceTimer hook — NOT inside InvoiceTimer component
- [x] Timer starts on first keystroke in CustomerField or ProductSearch (whichever comes first)
- [x] Timer interval is 50ms
- [x] Timer stops (clearInterval called) exactly when SAVE action fires
- [x] Timer clears on RESET action
- [x] useEffect cleanup function calls clearInterval — no memory leak
- [x] Display format: "X.Xs" for < 10 seconds, "XX.Xs" for ≥ 10 seconds
- [x] Idle state: muted zinc-600 color
- [x] Running state: amber-400 color
- [x] Saved state: green-400 color, bold
- [x] "⚡ Timer started" flash appears when timer starts
- [x] Flash duration is ~800ms total (fade in + hold + fade out)
- [x] Flash uses CSS animation (not JS setTimeout for the animation itself)
- [x] After flash completes, flash element is not in the DOM
- [x] justStarted is a ref (not state) — verified by confirming it does not cause a re-render
- [x] `npx tsc --noEmit` passes with 0 errors
