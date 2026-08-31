# Design brief — the parallel-workstreams tracker

**Reference implementation:** `2026-07-14-july-rework-v1-lock-tracker.html` (open it; it is real, populated, and working)
**Predecessors:** six earlier trackers in this directory (2026-06-01 → 2026-06-08) — the same idea, evolving

---

## What this is

A **single self-contained HTML file** that turns a pile of Linear tickets into an **operating console** for fanning work out to several coding agents at once, each in its own git worktree.

It is not a plan. It is not a roadmap. It is not a Gantt chart. It is a **cockpit you sit in while N agents are running**, and it lives for a few days and then dies.

## Who uses it, and how

One person (Israel), alone, at a desk, with 3-7 coding agents in flight.

The session looks like this:

1. Open the file. **Scan for what to pick up next.**
2. Grab a card, hit its dispatch button, paste the prompt into a fresh agent, paste the worktree command into a terminal.
3. Type the agent's name onto the card so he remembers who has what.
4. Come back forty minutes later. **Re-scan. What landed? What's now unblocked? Who's stuck?**
5. Flip statuses. Leave handoff notes on cards. Repeat.
6. Next morning, re-open it and immediately re-orient: **where are we?**

The whole design question is: **how fast can he re-orient after being away?** That is the job.

## The one thing that makes it valuable

**Seams.** A seam is where two parallel lanes touch the same file.

Anyone can list tickets. The reason this artifact exists is that it answers the question a ticket list cannot: *if I run these five agents at once, where will they collide, and what do I do about it?*

Every card carries `surf` — the actual files it touches. A seam is the intersection of `surf` across lanes. Each seam ends in a **verdict** from a fixed taxonomy:

- land-first-then-rebase
- single-own the file
- sub-sequence, not parallel
- dodge the file entirely
- promote to a hard dependency
- coordinate the number (migrations)

**A tracker whose seams are hard to find has failed at its only real job.** In the current implementation they are a panel above the board, which is honest but passive — they sit there and you have to remember to read them. That's the biggest open question in the design.

## The information, and why each piece is there

### The board

Cards, grouped into **lanes**. A lane = **one worktree, one agent, one PR**. It is the unit of dispatch, not a category. 3-9 lanes.

### A card is one Linear ticket

| Element | Why it exists |
|---|---|
| **Ticket id + title** | Identity |
| **Status** — todo / wip / done | Set by hand, cycles on click. The only state he maintains |
| **Readiness** — ready / awaits TTM-xxx | **Computed**, not typed. From the card's blockers + what's done |
| **Pick-up number** (#1, #2…) | Computed. Cards sort within a lane: in-progress → ready → blocked (soonest-to-unblock first) → done. This is the "what next" answer |
| **Surface** — the files it touches | The collision index. Also tells an agent where it's about to work |
| **Note** — live state + `SEAM1 …` refs | So an agent that only ever sees its own card still learns about the collision |
| **Critical path** marker | Which cards determine how long the whole epic takes |
| **Agent** — a name he types | Assignment. Filterable, so he can pull up one agent's queue |
| **Handoff notes** — free text | Where it's at. The thing he reads when he comes back |
| **Dispatch** | Copies a ready-made kickoff prompt for an agent |
| **Worktree / branch** | Copies `git worktree add …` and the Linear branch name |
| **Link to Linear** | The ticket is the source of truth; the tracker is a lens |

### Above the board

- **Rollups** — done/total, in-flight, ready to pick up, blocked. Glanceable state of the world.
- **Framing panel** — "where things stand", rewritten by hand as work lands.
- **Seams panel** — the collisions and their verdicts.
- **Ordering panel** — first wave, worktree plan, each lane's internal running order, reserved migration numbers.

### Optional mechanics that have earned their place

- **Dependency overlay** — an SVG that draws arrows between cards (solid = blocks, dashed = land together). Toggleable, off by default.
- **Filters** — ready-only, critical-path-only, by agent.
- **Deferred lane** — visually faded; work that's parked.

## Hard constraints

- **One HTML file.** No build step, no npm, no external requests. Fonts, CSS, JS all inline. It gets opened with `open file://…`.
- **State is `localStorage`.** Statuses, agent names, notes. Nothing is on a server. A versioned key lets a re-seed from Linear deliberately reset it.
- **The data is two JS literals** at the top of the `<script>`: a `STREAMS` object (lanes) and a `T` array (cards). An agent regenerates these; a human never hand-edits the rendering code.
- **Desktop.** One person, one big screen. Mobile is irrelevant.
- **It is disposable.** Days, not months. Don't over-engineer for longevity.

## What is FIXED (don't design these away)

- Cards carry live, hand-set status + agent + notes. It is a console, not a document.
- Readiness and pick-up order are **computed**, never typed.
- Lanes are the unit of dispatch.
- Every seam ends in a verdict.
- One file, no dependencies, localStorage.

## What is OPEN — go explore

1. **How do seams get surfaced?** Today: a passive panel. But a seam is a *relationship between two cards*, and it's currently rendered nowhere near either of them. Should a card *show* its seams? Should the board draw them? Should hovering a card light up everything it collides with? This is the richest problem in the brief.

2. **What does "where are we?" look like at a glance?** He's been away four hours. What's the single view that re-orients him fastest? Today it's five stat tiles and a lot of scanning.

3. **Is a column-per-lane board even right?** It's inherited from kanban. But lanes aren't workflow stages — they're *parallel tracks that occasionally touch*. Something more like a braid, a dependency map, or a swimlane-with-crossings might tell the truth better. The dependency overlay exists precisely because the grid can't express the relationships.

4. **Time.** Nothing in the current design shows *elapsed* time, staleness, or how long a card has sat in `wip`. Earlier versions had an 8-hour countdown timer for one-day bursts. Should a card look stale? Should the board show drift?

5. **The dispatch moment.** Right now it's a copy-to-clipboard button. That's the primary action of the entire artifact and it looks like a footnote.

6. **Density.** 18 cards × 7 lanes is a lot of surface. Is there a compact mode? A card that expands?

## Visual direction so far

The current implementation borrows the **Binders app** design language (an existing TATOMA product surface):

- Warm off-white canvas `#faf6f4`, near-black plum text `#1d0a14`, salmon primary `#ff8c7d`
- **Room tones** for lanes: olive `#e8e6cb`, sage `#d1dcc5`, blush `#f7e2da`
- **SectionShell** — big soft-cornered tinted panels (24px radius, generous padding)
- **White sub-cards** nested inside them (14px radius, soft shadow)
- **Status chips** — a coloured dot + mono uppercase micro-label
- **StatCard** — mono eyebrow, big serif number, a salmon accent bar across the top
- **IconButton** — a 44px near-black circle; the confident, physical affordance
- Serif headings (Canela → Georgia), mono in uppercase with wide tracking
- Status palette: grey `#8a8194` todo · amber `#c08a3e` in-progress · green `#3f7d5a` done · terracotta `#b86a55` blocked/seams

**This is a starting point, not a requirement.** It was chosen because it's warm, calm, and already ours. But a dispatch cockpit arguably wants *more* signal and *less* calm than a client-facing product surface. Push on it.

## Real data to design against

Don't use lorem. The reference file is populated with the actual July Studio Rework fan-out:

- **7 lanes** — Foundation · Home rooms · Task page flow · Prompt lifecycle · Prompt chrome · Libraries · Academy recap
- **18 cards**
- **11 seams**, e.g.:
  - `task-try-surface.tsx` — three lanes touch it → *sub-sequence at the head, then parallel*
  - `packages/ui/prompt-detail.tsx` — two lanes → *single-own; the other consumes props*
  - migration numbers — four lanes → *reserve up front: 138, 139, 140, 141*
- **Critical path**: 847 → 861 → 864 → 855
- One card is **urgent but not on the critical path** (862) — the design has to distinguish "on fire" from "determines the end date"

## Success test

Open the file cold, after a weekend. Within **ten seconds**: what's in flight, what can I start right now, what's stuck and on whom, and where are the two lanes about to crash into each other?
