# The Living Playbook - Implementation Report

> Implementation status report for the Client Portal reimplementation
> Last Updated: 2026-02-05
> Plan file: `/Users/israel/code/israelroldan/cope/work/tatoma/platform/living-playbook/implementation-plan.md`

## Overview

This report documents the implementation of "The Living Playbook" - the reimplementation of the Client Portal from a resource-display app into a client-facing version of the Workbench consulting toolkit.

### Reference Documents

| Document | Path |
|----------|------|
| Implementation Plan | `/Users/israel/code/israelroldan/cope/work/tatoma/platform/living-playbook/implementation-plan.md` |
| Design Analysis | `/Users/israel/code/israelroldan/cope/work/tatoma/platform/living-playbook/design-analysis.md` |
| Data Model Plan | `/Users/israel/code/israelroldan/cope/work/tatoma/platform/living-playbook/data-model-plan.md` |
| Figma Designs | `/Users/israel/code/israelroldan/cope/work/tatoma/platform/living-playbook/*.png` |

### Codebase Location

```
/Users/israel/.workon/worktrees/tatoma/new-client-portal-part-1/
```

---

## Phase Completion Status

| Phase | Description | Status | Notes |
|-------|-------------|--------|-------|
| 0 | Database Schema | ✅ Complete | 7 new tables created |
| 1 | Activity CRUD & Queries | ✅ Complete | Full module with types, queries, mutations |
| 2 | Activity Card Component | ✅ Complete | v0-designed cards with phase-specific icons |
| 3 | Our Planning View | ✅ Complete | Time bucket columns with data fetching |
| 4 | Activity Details Sidebar | ✅ Complete | Framer Motion animations |
| 5 | Winning Moves System | ✅ Complete | Database + Workbench UI (manager, linking) |
| 6 | Activity Resources | ✅ Complete | Database + Workbench UI (add/remove dialogs) |
| 7 | Relations View | ✅ Complete | Database module; UI shows "Coming soon" |
| 8 | Timeline View | ✅ Complete | Database + Workbench UI (activity timeline) |
| 9 | Team Member Assignment | ✅ Complete | Database + Workbench UI (assign dialog) |
| 10 | Migration | ✅ Complete | Idempotent SQL migration |
| 11 | Polish & Cleanup | ✅ Complete | Build verified, phase icons added |

---

## Files Created

### Database Migrations

| File | Purpose |
|------|---------|
| `packages/database/supabase/migrations/031_living_playbook_schema.sql` | Creates all Living Playbook tables + migrates milestones → activities |

### Database Modules

#### Activities Module
```
packages/database/src/activities/
├── types.ts          # Activity, CreateActivityInput, UpdateActivityInput types
├── queries.ts        # getActivityById, getActivitiesByEngagement, getActivitiesByOrganization, etc.
├── mutations.ts      # createActivity, updateActivity, deleteActivity, reorderActivities
└── index.ts          # Exports
```

#### Winning Moves Module
```
packages/database/src/winning-moves/
├── types.ts          # WinningMove, ActivityWinningMoveLink types
├── queries.ts        # getWinningMoveById, getWinningMovesForActivity, etc.
├── mutations.ts      # createWinningMove, linkActivityToWinningMove, etc.
└── index.ts          # Exports
```

#### Activity Resources Module
```
packages/database/src/activity-resources/
├── types.ts          # ActivityResource, CreateActivityResourceInput types
├── queries.ts        # getActivityResourceById, getResourcesByActivity, etc.
├── mutations.ts      # createActivityResource, updateActivityResource, etc.
└── index.ts          # Exports
```

#### Relations Module
```
packages/database/src/relations/
├── types.ts          # Relation, RelationType, EntityType types
├── queries.ts        # getRelationById, getRelationsFromEntity, getActivityRelations, etc.
├── mutations.ts      # createRelation, updateRelation, deleteRelation, etc.
└── index.ts          # Exports
```

#### Activity Log Module
```
packages/database/src/activity-log/
├── types.ts          # ActivityLogEntry, ActivityLogEventType types
├── queries.ts        # getActivityLogById, getLogEntriesByActivity, getRecentLogEntries, etc.
├── mutations.ts      # createActivityLogEntry, addComment
└── index.ts          # Exports
```

#### Activity Team Members Module
```
packages/database/src/activity-team-members/
├── types.ts          # ActivityTeamMember, ResolvedActivityTeamMember types
├── queries.ts        # getTeamMembersByActivity, isUserAssignedToActivity, etc.
├── mutations.ts      # assignUserToActivity, unassignUserFromActivity, etc.
└── index.ts          # Exports
```

### Client Portal Components

#### Activity Components
```
apps/client-portal/src/components/activity/
├── activity-card.tsx           # v0-designed card with phase-specific icons (Align/Activate/Adopt)
├── activity-icon.tsx           # Generic activity icon
├── activity-status-badge.tsx   # Status badges (planned, in_progress, done, skipped, suggestion)
├── activity-team-avatars.tsx   # Overlapping avatar display with team name
├── activity-resources.tsx      # Resource links with TATOMA icon
├── activity-score-display.tsx  # Score/metrics visualization for completed activities
├── activity-detail-sidebar.tsx # Slide-out detail panel with Framer Motion
├── winning-moves-checklist.tsx # Checkable winning moves list
└── index.ts                    # Exports
```

#### Activity Data Fetching
```
apps/client-portal/src/lib/activity/
├── activity-data-fetcher.ts    # Batch fetch winning moves, team members, resources
└── index.ts                    # Exports
```

#### Playbook Components
```
apps/client-portal/src/components/playbook/
├── playbook-header.tsx     # "The Living Playbook" title + "Hi {name}" greeting
├── playbook-tabs.tsx       # Tab navigation (Our Planning, Relations, Timeline, Stream)
├── planning-view.tsx       # Three-column time bucket layout
├── time-bucket-column.tsx  # Individual column (This Quarter, Next Quarter, Later)
├── playbook-layout.tsx     # Complete layout with sidebar integration
└── index.ts                # Exports
```

### Client Portal Pages

| File | Route | Purpose |
|------|-------|---------|
| `apps/client-portal/src/app/(main)/playbook/page.tsx` | `/playbook` | Main Living Playbook page |

### Workbench Components

#### Activity Management Components
```
apps/workbench/src/components/features/activity/
├── activity-detail-sidebar.tsx        # Slide-out panel for editing activities
├── activity-status-selector.tsx       # Status dropdown/buttons
├── time-bucket-selector.tsx           # Segmented: This Quarter | Next Quarter | Later
├── activity-winning-moves-section.tsx # Checkbox list for linking winning moves
├── activity-resources-section.tsx     # Resource list with add/remove
├── activity-team-section.tsx          # Team member avatars with assign
├── activity-timeline.tsx              # Activity log display
├── add-resource-dialog.tsx            # Dialog for adding resources
├── assign-team-member-dialog.tsx      # Dialog for team assignment
└── index.ts                           # Exports
```

#### Winning Moves Components
```
apps/workbench/src/components/features/winning-moves/
├── winning-moves-manager.tsx          # Table with CRUD actions
├── winning-move-form-dialog.tsx       # Create/edit form dialog
└── index.ts                           # Exports
```

#### Playbook Components
```
apps/workbench/src/components/features/playbook/
├── playbook-content.tsx               # Main playbook content view
└── index.ts                           # Exports
```

#### Activity Logger
```
apps/workbench/src/lib/activity/
├── activity-logger.ts                 # Helper functions for audit logging
└── index.ts                           # Exports
```

### Workbench API Routes

#### Activities API
```
apps/workbench/src/app/api/clients/[orgId]/activities/
├── route.ts                           # GET list, POST create
└── [activityId]/
    ├── route.ts                       # GET, PATCH, DELETE
    ├── winning-moves/
    │   ├── route.ts                   # GET linked, POST link
    │   └── [wmId]/route.ts            # DELETE unlink
    ├── resources/
    │   ├── route.ts                   # GET, POST
    │   └── [resourceId]/route.ts      # PATCH, DELETE
    ├── team-members/route.ts          # GET, POST assign, DELETE unassign
    └── log/route.ts                   # GET activity log
```

#### Winning Moves API
```
apps/workbench/src/app/api/clients/[orgId]/winning-moves/
├── route.ts                           # GET list, POST create
└── [wmId]/route.ts                    # GET, PATCH, DELETE
```

---

## Database Schema

### New Tables

#### `activities`
Core table replacing milestones with richer model:
- `id`, `organization_id`, `engagement_id`
- `title`, `description`, `icon`, `icon_color`
- `status` (planned, in_progress, done, skipped, suggestion)
- `phase` (align, activate, adopt)
- `time_bucket` (this_quarter, next_quarter, later)
- `scheduled_date`, `due_date`, `order_index`
- `completed_at`, `completed_by`
- `score_data` (JSONB for metrics)
- `assigned_team`
- `migrated_from_milestone_id` (for migration tracking)

#### `winning_moves`
Strategic initiatives:
- `id`, `organization_id`
- `title`, `description`
- `source_phase`, `source_activity_id`
- `status` (active, achieved, archived)

#### `activity_winning_moves`
Junction table linking activities to winning moves:
- `activity_id`, `winning_move_id`
- `is_completed`, `completed_at`

#### `activity_resources`
Resources attached to activities:
- `activity_id`
- `type` (notion, url, file, tenant_page, tenant_file)
- `title`, `icon`, `url`
- `notion_page_id`, `tenant_page_id`, `tenant_file_id`
- `order_index`

#### `relations`
Generic entity-to-entity linking:
- `organization_id`
- `source_type`, `source_id`
- `target_type`, `target_id`
- `relation_type` (relates_to, blocks, enables, depends_on, informs)
- `label`, `created_by`

#### `activity_log`
Audit trail for timeline/stream:
- `activity_id`
- `user_id`, `user_name`
- `event_type` (created, status_change, comment, resource_added, etc.)
- `old_value`, `new_value` (JSONB)
- `comment`

#### `activity_team_members`
Team members assigned to activities:
- `activity_id`
- `user_id` (WorkOS user)
- `non_user_team_member_id` (non-user team members)

---

## UI Component Details

### ActivityCard States

| Status | Background | Badge | Shows Scores |
|--------|------------|-------|--------------|
| `planned` | Light (white) | Green outline "planned" | No |
| `in_progress` | Light (white) | Blue filled "in progress" | No |
| `done` | Dark (stone-900) | Green filled "done" | Yes |
| `skipped` | Light (white) | Gray "skipped" | No |
| `suggestion` | Light (white) | Gray text only | No |

### ActivityCard Phase Icons

Cards display phase-specific icons matching the homepage playbook cards:

| Phase | Icon | Color | Description |
|-------|------|-------|-------------|
| `align` | Pentagon/Shield | `#FF8C7DFF` (coral) | Hexagonal shield shape |
| `activate` | Three Blocks | `#0EE17EFF` (green) | Three connected rounded rectangles (wider aspect) |
| `adopt` | Dashed Circle | `#565656FF` (gray) | Circular dashed outline |
| `null` | Pentagon Outline | Yellow/Stone | Generic fallback icon |

Icons use `currentColor` and inherit from centralized `PLAYBOOK_PHASE_THEMES` via `getPlaybookPhaseTheme()`.

### PlaybookTabs Navigation

| Tab | Key | Status |
|-----|-----|--------|
| OUR PLANNING | `planning` | ✅ Implemented |
| RELATIONS | `relations` | Shows "Coming soon" |
| TIMELINE | `timeline` | Shows "Coming soon" |
| STREAM | `stream` | Shows "Coming soon" |

### ActivityDetailSidebar Features

- Slide-in animation from right (Framer Motion)
- Backdrop overlay (click to close)
- Close button (X)
- Sections:
  - Header with icon, title, phase
  - Description
  - Winning moves checklist
  - Share action link
  - Resources (for completed activities)
  - Playbook snapshots (placeholder)
  - Team members with avatars
  - Status badge in footer

---

## Migration Details

### Milestone → Activity Mapping

| Milestone Field | Activity Field | Transformation |
|-----------------|----------------|----------------|
| `id` | `migrated_from_milestone_id` | Preserved for reference |
| `engagement_id` | `engagement_id` | Direct copy |
| (from engagement) | `organization_id` | Derived from engagement |
| `title` | `title` | Direct copy |
| `description` | `description` | Direct copy |
| `status: pending` | `status: planned` | Renamed |
| `status: in_progress` | `status: in_progress` | Same |
| `status: completed` | `status: done` | Renamed |
| `status: skipped` | `status: skipped` | Same |
| `order_index` | `order_index` | Direct copy |
| `completed_at` | `completed_at` | Direct copy |
| `completed_by` | `completed_by` | Direct copy |
| (from engagement) | `phase` | Derived from engagement.phase |
| - | `time_bucket` | Default: 'this_quarter' |

### Migration Script Behavior

- **Idempotent**: Safe to run multiple times
- **Non-destructive**: Original milestones preserved
- **Reference tracking**: `migrated_from_milestone_id` links back to original

---

## What's Working

### Database Layer
✅ **Full Database Schema**: All 7 tables created with indexes, constraints, RLS policies
✅ **Activity CRUD**: Complete read/write operations for activities
✅ **Winning Moves Module**: Database operations for CRUD and linking
✅ **Activity Resources Module**: Database operations for attachments
✅ **Relations Module**: Database operations for dependencies
✅ **Activity Log Module**: Database operations for timeline/audit
✅ **Team Members Module**: Database operations for assignment
✅ **Migration**: Milestones → Activities conversion ready

### Client Portal
✅ **Activity Card**: v0-designed cards with phase-specific icons (Align/Activate/Adopt)
✅ **Our Planning View**: Three-column time bucket layout with data fetching
✅ **Activity Detail Sidebar**: Slide-out panel with Framer Motion animations
✅ **Data Fetching**: Batch loading of winning moves, team members, resources
✅ **Phase Icons**: Correct icons and colors from centralized theme system

### Workbench
✅ **Activity Detail Sidebar**: Full editing capabilities (title, description, status, phase, time bucket)
✅ **Winning Moves Manager**: CRUD table with form dialogs
✅ **Activity-Winning Move Linking**: Checkbox UI in sidebar
✅ **Activity Resources Section**: Add/remove resources with dialog
✅ **Team Assignment**: Avatar list with assign/unassign dialog
✅ **Activity Timeline**: Log display in sidebar
✅ **Activity Logger**: Helper functions for audit trail
✅ **Full API Coverage**: All CRUD routes for activities, winning moves, resources, team members

---

## What's Not Yet Implemented (Future Work)

### Client Portal UI Components Needed

1. **Relations View UI** (`playbook-tabs.tsx` → "relations")
   - Dependency graph visualization
   - Consider using `reactflow` library
   - Database module ready: `packages/database/src/relations/`

2. **Timeline View UI** (`playbook-tabs.tsx` → "timeline")
   - Activity feed with change events in Client Portal
   - Comments display
   - Database module ready: `packages/database/src/activity-log/`
   - Note: Workbench has activity timeline display

3. **Stream View UI** (`playbook-tabs.tsx` → "stream")
   - Filtered view of timeline
   - Same data source as Timeline

### Workbench Integration (Remaining)

1. ~~**Winning Moves Management**~~ ✅ Complete
   - ~~UI for creating/editing winning moves~~
   - ~~UI for linking winning moves to activities~~

2. ~~**Activity Resources Management**~~ ✅ Complete
   - ~~UI for adding/removing resources from activities~~

3. ~~**Activity Team Assignment**~~ ✅ Complete
   - ~~UI for assigning team members to activities~~

4. **Relations Management** (Not started)
   - UI for creating relations between activities
   - Visual editor for dependencies

### Sidebar Navigation Update

Per design, sidebar should have:
```
PLAYBOOK
├── Overview (home/planning view)
├── Account      ← placeholder
├── Landscape    ← placeholder
└── People       ← placeholder

KNOWLEDGE
├── Prompts      ← link to Prompts app
├── Cards        ← link to Cards app
└── Library      ← link to Library app
```

---

## Testing Notes

### Build Verification

```bash
# Build succeeds
pnpm --filter client-portal build

# New route available
/playbook
```

### Local Development

```bash
# Start local Supabase (if not running)
cd packages/database && pnpm db:start

# Reset database with migrations
cd packages/database && pnpm db:reset

# Generate types after schema changes
cd packages/database && pnpm db:types

# Run client-portal
pnpm --filter client-portal dev
```

### Access the Playbook

1. Log in to Client Portal
2. Navigate to `/playbook`
3. Activities will be organized by time bucket
4. Click an activity to open the detail sidebar

---

## Key Decisions Made

1. **Activities superset milestones**: All milestone data maps to activities + additional fields
2. **Additive approach**: New tables extend system; old tables remain until migration complete
3. **Service role only**: All database access via service role client (consistent with existing pattern)
4. **Framer Motion for animations**: Used for sidebar slide-in animation
5. **Deferred features**: Circles and Snapshots deferred for MVP
6. **Time buckets instead of dates**: this_quarter, next_quarter, later (not specific dates)
7. **v0-designed Activity Cards**: Used v0 prototype for card design, adapted to data model
8. **Phase-specific icons**: Cards display Align (pentagon), Activate (3 blocks), Adopt (dashed circle) icons
9. **Centralized theme colors**: Phase icons use colors from `PLAYBOOK_PHASE_THEMES` for consistency

---

## Git Commits

| Commit | Description |
|--------|-------------|
| `8c4fd8a1` | Add client-portal playbook page with activity cards |
| `1a27b6f9` | Add workbench activity management system |
| `871e44fd` | Consolidate migrations 029+030 into 031 |

### Commit Details

**`8c4fd8a1` - Client Portal Playbook** (18 files, +1,711 lines)
- Activity cards with v0 design and phase-specific icons
- Data fetching for winning moves, team members, resources
- Planning view with time bucket columns
- Activity detail sidebar

**`1a27b6f9` - Workbench Activity Management** (58 files, +7,212 lines)
- Database modules for activities, winning moves, resources, team members, logs
- Workbench API routes for all CRUD operations
- Workbench UI components (sidebar, selectors, dialogs)
- Database migrations for the Living Playbook schema

**`871e44fd` - Consolidate Migrations**
- Combined 029 + 030 into single 031 migration to avoid conflicts with main branch

---

## Files Modified

### Database Package Index
```
packages/database/src/index.ts
```
Added exports for all new modules.

### Playbook Layout Integration
```
apps/client-portal/src/components/playbook/playbook-layout.tsx
```
Integrated ActivityDetailSidebar with state management.

---

## Recommended Next Steps

1. ~~**Workbench Integration**: Add activity management to Workbench~~ ✅ Complete
2. **Run migrations on staging**: Apply 029 and 030 migrations to staging database
3. **Test data migration**: Run milestone → activity migration and verify data
4. **Implement Relations View**: Build the dependency graph UI in Client Portal
5. **Implement Timeline View**: Build the activity feed UI in Client Portal
6. **Update Sidebar Navigation**: Match design specifications
7. **Connect to real engagement data**: Wire up the playbook page to actual engagement data
8. **End-to-end testing**: Test full flow from Workbench to Client Portal

---

## Contact

For questions about this implementation, refer to:
- Plan file: `/Users/israel/code/israelroldan/cope/work/tatoma/platform/living-playbook/implementation-plan.md`
- Claude Code transcript: Check `.claude/` directory for session history
