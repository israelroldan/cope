# The Living Playbook - Implementation Plan

> Master orchestration plan for reimplementing the Client Portal as "The Living Playbook"
> Created: 2026-02-05

## Execution Model

**The main agent acts as Engineering Manager and Orchestrator.**

- Main agent maintains big-picture view and tracks progress across phases
- **All implementation work is delegated to subagents** (Task tool)
- Main agent reviews subagent output and ensures quality/consistency
- Main agent handles cross-cutting concerns and integration points
- Use TodoWrite to track phase progress at the orchestration level

### Subagent Delegation Pattern

```
Main Agent (EM/Orchestrator)
├── Delegates "Create migration file" → Subagent
├── Reviews output, confirms correctness
├── Delegates "Create activity queries" → Subagent
├── Reviews output, confirms correctness
└── ... continues orchestrating
```

**Benefits:**
- Main agent stays focused on architecture and integration
- Subagents handle focused implementation tasks
- Better context management (subagents get targeted context)
- Easier to parallelize independent work

---

## Overview

Transform the Client Portal from a resource-display app into a client-facing version of the Workbench consulting toolkit. The new "Living Playbook" will show clients their engagement activities, progress, winning moves, and allow them to track their AI transformation journey.

### Key Documents

- Design Analysis: `/Users/israel/code/israelroldan/cope/work/tatoma/platform/living-playbook/design-analysis.md`
- Data Model Plan: `/Users/israel/code/israelroldan/cope/work/tatoma/platform/living-playbook/data-model-plan.md`
- Figma Designs: `/Users/israel/code/israelroldan/cope/work/tatoma/platform/living-playbook/`

### Constraints

- **Don't break Workbench** - It's actively used, all changes must be backwards compatible
- **Additive approach** - New tables extend system, old tables remain until migration complete
- **Activities are superset of milestones** - All milestone data maps to activities + more

---

## Phase 0: Database Schema

**Goal:** Create all new tables for the Living Playbook data model.

### Tables to Create

| Table | Purpose |
|-------|---------|
| `activities` | Core table replacing milestones |
| `winning_moves` | Strategic goals from Align phase |
| `activity_winning_moves` | Junction: activities ↔ winning moves |
| `activity_resources` | Links/files/pages attached to activities |
| `relations` | Generic entity-to-entity linking |
| `activity_log` | Audit trail for timeline/stream |
| `activity_team_members` | People assigned to activities |

### Tasks

- [x] **0.1** Create migration file in `packages/database/supabase/migrations/`
- [x] **0.2** Run migration on local Supabase (`pnpm db:push`)
- [x] **0.3** Generate TypeScript types (`pnpm db:types`)
- [x] **0.4** Verify tables created correctly

### Files to Modify/Create

- `packages/database/supabase/migrations/029_living_playbook_schema.sql` (created)

### Verification

```bash
cd packages/database
pnpm db:reset
pnpm db:types
# Check that new types appear in generated types
```

---

## Phase 1: Activity CRUD & Queries

**Goal:** Create the data access layer for activities.

### Tasks

- [x] **1.1** Create activity types in shared location
- [x] **1.2** Create activity queries (list, get by id, get by engagement)
- [x] **1.3** Create activity mutations (create, update, delete)
- [x] **1.4** Create activity log auto-logging (trigger or application-level)
- [x] **1.5** Add activity resource queries and mutations

### Files Created

- `packages/database/src/activities/` (new directory)
  - `types.ts` - Activity TypeScript types
  - `queries.ts` - Read operations
  - `mutations.ts` - Write operations
  - `index.ts` - Exports

### Verification

- Unit tests for CRUD operations
- Manual testing via Supabase dashboard

---

## Phase 2: Client Portal - Activity Card Component

**Goal:** Build the core Activity Card UI component matching Figma designs.

### Card States

| Status | Style |
|--------|-------|
| `planned` | Light card, green outline badge |
| `in_progress` | Light card, green filled badge |
| `done` | Dark card (black bg), shows results/scores |
| `skipped` | Light card, gray strikethrough |
| `suggestion` | Light card, gray text |

### Tasks

- [x] **2.1** Create base `ActivityCard` component with all status variants
- [x] **2.2** Add icon system (pentagon shapes with colors)
- [x] **2.3** Add team avatars display
- [x] **2.4** Add resource links section (Notion docs, files)
- [x] **2.5** Add winning moves badges (optional display)
- [x] **2.6** Add score/level display for completed activities

### Files Created

- `apps/client-portal/src/components/activity/`
  - `activity-card.tsx`
  - `activity-icon.tsx`
  - `activity-status-badge.tsx`
  - `activity-resources.tsx`
  - `activity-team-avatars.tsx`
  - `activity-score-display.tsx`
  - `index.ts`

### Verification

- Storybook or dev page showing all card variants
- Visual comparison with Figma designs

---

## Phase 3: Client Portal - Our Planning View

**Goal:** Build the main "Our Planning" view with time-bucket columns.

### Layout

```
┌─────────────────────────────────────────────────────────────┐
│  The Living Playbook                                        │
│  Hi {Name}                                                  │
├─────────────────────────────────────────────────────────────┤
│  [OUR PLANNING]  [RELATIONS]  [TIMELINE]  [STREAM]          │
├─────────────────────────────────────────────────────────────┤
│  THIS QUARTER    │  NEXT QUARTER    │  LATER               │
│  ┌──────────┐    │  ┌──────────┐    │  ┌──────────┐        │
│  │  Card 1  │    │  │  Card 4  │    │  │  Card 7  │        │
│  └──────────┘    │  └──────────┘    │  └──────────┘        │
│  ┌──────────┐    │  ┌──────────┐    │                      │
│  │  Card 2  │    │  │  Card 5  │    │                      │
│  └──────────┘    │  └──────────┘    │                      │
└─────────────────────────────────────────────────────────────┘
```

### Tasks

- [x] **3.1** Create page header component (title + greeting)
- [x] **3.2** Create view tabs component (Our Planning, Relations, Timeline, Stream)
- [x] **3.3** Create time-bucket columns layout
- [x] **3.4** Integrate activity cards into columns
- [x] **3.5** Add data fetching (server component with suspense)
- [x] **3.6** Update sidebar navigation to match designs

### Files Created

- `apps/client-portal/src/app/(main)/playbook/page.tsx`
- `apps/client-portal/src/components/playbook/`
  - `playbook-header.tsx`
  - `playbook-tabs.tsx`
  - `planning-view.tsx`
  - `time-bucket-column.tsx`

### Verification

- Navigate to `/playbook`, see new planning view
- Activities grouped by time bucket
- All card states render correctly

---

## Phase 4: Activity Details Sidebar

**Goal:** Build the slide-out details panel when clicking an activity.

### Features

- Full activity content display
- Winning moves checklist
- "Share summary with colleagues" action
- Playbook snapshots section (deferred)
- Team members list

### Tasks

- [x] **4.1** Create sidebar/drawer component
- [x] **4.2** Add activity detail content
- [x] **4.3** Add winning moves checklist UI
- [x] **4.4** Add share action
- [x] **4.5** Connect to card click handler

### Files Created

- `apps/client-portal/src/components/activity/`
  - `activity-detail-sidebar.tsx`
  - `winning-moves-checklist.tsx`

### Verification

- Click activity card → sidebar opens
- All sections display correctly
- Close on click outside or X button

---

## Phase 5: Winning Moves System

**Goal:** Implement winning moves CRUD and linking to activities.

### Tasks

- [x] **5.1** Create winning moves queries/mutations in database layer
- [ ] **5.2** Add winning moves management in Workbench (admin creates them)
- [ ] **5.3** Add winning moves linking to activities in Workbench
- [x] **5.4** Display winning moves on activity cards in Client Portal

### Files Created

- `packages/database/src/winning-moves/`
  - `types.ts`
  - `queries.ts`
  - `mutations.ts`
- `apps/workbench/src/components/winning-moves/` (TODO)
- `apps/workbench/src/app/(main)/[orgId]/winning-moves/` (TODO)

### Verification

- Create winning move in Workbench
- Link to activity
- See badge appear on Client Portal activity card

---

## Phase 6: Activity Resources

**Goal:** Link files, pages, and URLs to activities.

### Tasks

- [x] **6.1** Create activity resources queries/mutations
- [ ] **6.2** Add resource linking UI in Workbench
- [x] **6.3** Display resource links on activity cards
- [x] **6.4** Handle click to open resource (notion page, download file, external URL)

### Files Created

- `packages/database/src/activity-resources/`

### Verification

- Link a tenant_page to activity in Workbench
- See resource appear on activity card in Client Portal
- Click resource → navigates correctly

---

## Phase 7: Relations View

**Goal:** Build the relations/dependency visualization.

### Approach (MVP)

- Simple graph showing activities as nodes
- Lines connecting related activities
- Use generic `relations` table for any-to-any linking

### Tasks

- [x] **7.1** Create relations queries/mutations
- [ ] **7.2** Add relation creation UI in Workbench
- [ ] **7.3** Build relations view component (simple graph/diagram)
- [ ] **7.4** Add to Client Portal as "Relations" tab

### Libraries to Consider

- `reactflow` - Interactive node-based diagrams
- `d3` - Lower level, more control
- Simple CSS-based approach for MVP

### Files Created

- `packages/database/src/relations/`
- `apps/client-portal/src/components/playbook/relations-view.tsx` (TODO)

### Verification

- Create relations between activities in Workbench
- See visual graph in Client Portal Relations tab

---

## Phase 8: Timeline View

**Goal:** Build the activity log timeline/stream view.

### Features

- Chronological feed of activity changes
- Status change events with user attribution
- Comments from team members
- Activity cards inline with events

### Tasks

- [x] **8.1** Implement activity_log auto-population on activity changes
- [x] **8.2** Create timeline queries (with pagination)
- [ ] **8.3** Build timeline view component
- [ ] **8.4** Add comment creation functionality
- [ ] **8.5** Add as "Timeline" and "Stream" tabs (same data, different filters)

### Files Created

- `packages/database/src/activity-log/`
- `apps/client-portal/src/components/playbook/timeline-view.tsx` (TODO)
- `apps/client-portal/src/components/playbook/timeline-event.tsx` (TODO)

### Verification

- Change activity status in Workbench
- See event appear in Client Portal Timeline
- Add comment, see it in feed

---

## Phase 9: Team Member Assignment

**Goal:** Assign team members to activities.

### Tasks

- [x] **9.1** Create activity_team_members queries/mutations
- [ ] **9.2** Add team assignment UI in Workbench activity edit
- [x] **9.3** Display assigned members on activity cards (avatars)
- [x] **9.4** Show team in activity detail sidebar

### Files Created

- `packages/database/src/activity-team-members/`

### Verification

- Assign team member to activity in Workbench
- See avatar on activity card in Client Portal

---

## Phase 10: Migration

**Goal:** Migrate existing milestones to activities.

### Strategy

1. Run migration script to copy all milestones → activities
2. Dual-write period: Workbench writes to both tables
3. Validate data integrity
4. Switch Workbench to activities only
5. Deprecate milestone code

### Tasks

- [x] **10.1** Write migration script (SQL)
- [ ] **10.2** Test on staging data
- [ ] **10.3** Update Workbench to use activities
- [ ] **10.4** Remove milestone dependencies
- [ ] **10.5** Archive/drop milestone table

### Verification

- All existing engagements have corresponding activities
- Workbench functionality unchanged
- Client Portal shows migrated data

---

## Phase 11: Polish & Cleanup

**Goal:** Final touches and cleanup.

### Tasks

- [ ] **11.1** Remove old Client Portal playbook components (phase cards, overlays)
- [ ] **11.2** Update sidebar navigation
- [ ] **11.3** Add loading states and skeletons
- [ ] **11.4** Add error handling
- [ ] **11.5** Performance optimization (caching, prefetching)
- [ ] **11.6** Accessibility review

---

## Sidebar Navigation (New Structure)

Based on Figma designs:

```
PLAYBOOK
├── Overview (home/planning view)
├── Account      ← placeholder for now
├── Landscape    ← placeholder for now
└── People       ← placeholder for now

KNOWLEDGE
├── Prompts      ← link to Prompts app
├── Cards        ← link to Cards app
└── Library      ← link to Library app
```

**Notes:**
- Account/Landscape/People are placeholders, will be built later
- Knowledge section links to existing apps (external navigation)

---

## Summary: Execution Order

| Phase | Description | Depends On |
|-------|-------------|------------|
| 0 | Database Schema | - |
| 1 | Activity CRUD | 0 |
| 2 | Activity Card Component | 1 |
| 3 | Our Planning View | 2 |
| 4 | Details Sidebar | 2, 3 |
| 5 | Winning Moves | 1 |
| 6 | Activity Resources | 1 |
| 7 | Relations View | 1 |
| 8 | Timeline View | 1 |
| 9 | Team Assignment | 1 |
| 10 | Migration | 1-9 |
| 11 | Polish | 10 |

Phases 5-9 can be parallelized after Phase 4 is complete.

---

## Subagent Task Examples

For each phase, here are example subagent prompts:

**Phase 0:**
- "Create a Supabase migration file for the Living Playbook schema with tables: activities, winning_moves, activity_winning_moves, activity_resources, relations, activity_log, activity_team_members. Include RLS policies. Reference the data model at /Users/israel/code/israelroldan/cope/work/tatoma/platform/living-playbook/data-model-plan.md"

**Phase 1:**
- "Create activity CRUD queries and mutations in packages/database/src/activities/. Follow existing patterns from packages/database/src/ for consistency."

**Phase 2:**
- "Build the ActivityCard component in apps/client-portal matching the Figma designs. Support status variants: planned, in_progress, done, skipped, suggestion."

**Phase 7:**
- "Build a simple relations view using reactflow to visualize activity dependencies. Read from the relations table."
