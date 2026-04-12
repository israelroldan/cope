# ATC Board — Parallel Execution Kit

**What:** A method + HTML template for running multiple Claude Code agents on independent workstreams without merge conflicts.

**When:** You have 5+ issues/tasks, some with dependencies, and want to maximize throughput.

---

## Quick Start

Paste this into a Claude Code session in the repo you want to work on:

```
I need to set up parallel execution for this repo. Here are my issues:

[paste your issue list — GitHub issues, Linear tickets, a markdown list, or just descriptions]

Help me create an ATC (Air Traffic Control) board:

1. Map dependencies between these items
2. Check which items touch the same files/areas (conflict zones)
3. Group into independent parallel tracks (max 5 concurrent)
4. Sequence into waves (wave 1 = no dependencies, wave 2 = needs wave 1, etc.)
5. For each item, write a friendly dispatch prompt I can copy-paste to start
   a new session — include the issue ref, relevant file paths, what to read
   first, and dependencies
6. Generate a standalone HTML board with:
   - Swimlane grid (rows = tracks, columns = waves)
   - Status dots on each item (queued/active/review/done/blocked)
   - Click-to-copy on each item (copies the dispatch prompt)
   - Slot counter (X/5 active)
   - Operations log section for tracking launches and completions
   - Legend with status colors

Use this HTML template as a starting point: [path to atc-board-template.html]

Output the board as docs/atc-board.html (or wherever makes sense for this repo).
```

---

## Operating the Board

### Launching an agent
1. Click the item → prompt copied
2. Open new Claude Code session → paste
3. Update the board: dot → `status-active`, increment slot count, add log entry

### When an agent completes
1. Update dot → `status-review` (PR open) or `status-done` (merged)
2. Decrement slot count
3. Add log entry with result + PR link
4. Check: does this unblock a Wave 2/3 item? Launch it

### When something blocks
1. Dot → `status-blocked`, log why
2. Can a different item take the slot?

---

## Files in This Kit

- `atc-board.md` — this file (methodology)
- `atc-board-template.html` — the HTML template to generate boards from
