# MyERP Marketing Website — Task System

This folder contains the complete execution plan and all individual task files
for the MyERP marketing website.

## How This Works

- `/Tasks/EXECUTION_PLAN.md` — The full strategic plan. Read this first.
- `/Tasks/STATUS.md` — Master tracker. Update this when a task is complete.
- `/Tasks/phase-*/` — Individual task files, one per task.

## Rules

1. A task is COMPLETE only when every checkbox in its acceptance criteria is checked.
2. STATUS.md is updated after each task — not before, not speculatively.
3. Phase 2 does not start until all Phase 1 tasks are marked COMPLETE in STATUS.md.
4. Phase 3 does not start until all Phase 2 tasks are marked COMPLETE in STATUS.md.
5. Do not mark a task complete based on "it looks right." Every checkbox must be
   verified against the specific criterion written in the task file.

## Task Status Values

- `[ ] NOT STARTED` — Work has not begun
- `[~] IN PROGRESS` — Work has started, not all criteria met
- `[x] COMPLETE` — All acceptance criteria checked and verified

## Phase Gates

Phase 1 → Phase 2 gate: All P1 tasks COMPLETE + Phase 1 User Test passed
  User test: 1 real Tally user completes demo without asking for help in < 30 seconds

Phase 2 → Phase 3 gate: All P2 tasks COMPLETE + signup flow working end-to-end

Phase 3: Ship when complete. No gate beyond individual task acceptance criteria.
