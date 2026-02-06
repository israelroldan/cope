# The Living Playbook - Data Model Plan

> Comprehensive data model for the new Client Portal "Living Playbook" experience.
> Generated: 2026-02-05
> Updated: 2026-02-05

## Overview

This document outlines the new data model that will power the Living Playbook. The approach is **additive** - new tables extend the system while existing tables (`engagements`, `engagement_phase_milestones`) remain functional until migration is complete.

### Design Principles

1. **Don't break Workbench** - Existing functionality must continue working
2. **Extend, then migrate** - Add new tables, run in parallel, then migrate
3. **Activities are a superset of milestones** - All milestone data maps to activities + more
4. **Flexible relations** - Generic linking allows anything to connect to anything
5. **Audit everything** - Activity log captures all changes for timeline view

### Decisions

| Question | Decision |
|----------|----------|
| Skipped milestones | Add `skipped` as valid activity status |
| Standalone activities | No - always tied to an engagement |
| Circles | **Deferred** - skip for MVP |
| Snapshots | **Deferred** - skip for MVP |
| Stream vs Timeline | Same data, different filters |

---

## New Tables

### 1. `activities`

The core table replacing milestones. Richer model with support for all Living Playbook features.

```sql
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Ownership (always tied to an engagement)
  organization_id TEXT NOT NULL,              -- WorkOS org_id (tenant)
  engagement_id UUID NOT NULL REFERENCES engagements(id) ON DELETE CASCADE,

  -- Core fields
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,                                   -- Icon identifier (e.g., 'pentagon', 'hexagon')
  icon_color TEXT,                             -- Icon color (e.g., 'yellow', 'green')

  -- Status & scheduling
  status TEXT NOT NULL DEFAULT 'planned',      -- planned, in_progress, done, skipped, suggestion
  phase TEXT,                                  -- align, activate, adopt (denormalized from engagement)
  time_bucket TEXT DEFAULT 'this_quarter',     -- this_quarter, next_quarter, later
  scheduled_date DATE,                         -- Optional specific date
  due_date DATE,                               -- Optional deadline

  -- Ordering
  order_index INTEGER NOT NULL DEFAULT 0,

  -- Completion data
  completed_at TIMESTAMPTZ,
  completed_by TEXT,                           -- WorkOS user_id

  -- Results/scoring (for completed activities)
  score_data JSONB,                            -- Flexible structure for scores, levels, metrics
  -- Example: {"level": "Solid working ground", "metrics": [{"label": "low hanging fruits", "value": 9}, {"label": "strong recommendations", "value": 3}]}

  -- Assignment
  assigned_team TEXT,                          -- Team name (e.g., 'Coreteam', 'IT', 'Leadership')

  -- Migration tracking
  migrated_from_milestone_id UUID,             -- Original milestone ID if migrated

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_activities_organization ON activities(organization_id);
CREATE INDEX idx_activities_engagement ON activities(engagement_id);
CREATE INDEX idx_activities_status ON activities(status);
CREATE INDEX idx_activities_phase ON activities(phase);
CREATE INDEX idx_activities_time_bucket ON activities(time_bucket);
```

#### Status Values

| Status | Description | Card Style |
|--------|-------------|------------|
| `planned` | Scheduled but not started | Light card, green outline badge |
| `in_progress` | Currently being worked on | Light card, green filled badge |
| `done` | Completed | Dark card, shows results/scores |
| `skipped` | Intentionally skipped | Light card, gray strikethrough |
| `suggestion` | AI or consultant suggested | Light card, gray text |

#### Time Bucket Values

| Bucket | Description |
|--------|-------------|
| `this_quarter` | Current quarter |
| `next_quarter` | Next quarter |
| `later` | Future (no specific timeline) |

---

### 2. `winning_moves`

Strategic initiatives defined during the Align phase, referenced in Activate/Adopt activities.

```sql
CREATE TABLE winning_moves (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id TEXT NOT NULL,              -- WorkOS org_id (tenant)

  title TEXT NOT NULL,
  description TEXT,

  -- Origin tracking
  source_phase TEXT DEFAULT 'align',          -- Which phase created this
  source_activity_id UUID REFERENCES activities(id) ON DELETE SET NULL,

  -- Status
  status TEXT NOT NULL DEFAULT 'active',      -- active, achieved, archived

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_winning_moves_organization ON winning_moves(organization_id);
CREATE INDEX idx_winning_moves_status ON winning_moves(status);
```

---

### 3. `activity_winning_moves`

Junction table linking activities to winning moves they contribute to.

```sql
CREATE TABLE activity_winning_moves (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
  winning_move_id UUID NOT NULL REFERENCES winning_moves(id) ON DELETE CASCADE,

  -- Track if this activity has "completed" its contribution
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(activity_id, winning_move_id)
);

CREATE INDEX idx_activity_winning_moves_activity ON activity_winning_moves(activity_id);
CREATE INDEX idx_activity_winning_moves_winning_move ON activity_winning_moves(winning_move_id);
```

---

### 4. `activity_resources`

Resources (links, files, pages) attached to activities.

```sql
CREATE TABLE activity_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,

  -- Resource type
  type TEXT NOT NULL,                         -- notion, url, file, tenant_page, tenant_file

  -- Display
  title TEXT NOT NULL,
  icon TEXT,                                  -- Icon identifier

  -- Reference (one of these based on type)
  url TEXT,                                   -- For 'url' type
  notion_page_id TEXT,                        -- For 'notion' type
  tenant_page_id UUID,                        -- For 'tenant_page' type (references tenant_pages)
  tenant_file_id UUID,                        -- For 'tenant_file' type (references tenant_files)

  -- Ordering
  order_index INTEGER NOT NULL DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activity_resources_activity ON activity_resources(activity_id);
```

---

### 5. `relations`

Generic linking table for connecting any entities.

```sql
CREATE TABLE relations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id TEXT NOT NULL,              -- Scoped to tenant

  -- Source
  source_type TEXT NOT NULL,                  -- activity, winning_move, tenant_page, tenant_file, etc.
  source_id UUID NOT NULL,

  -- Target
  target_type TEXT NOT NULL,
  target_id UUID NOT NULL,

  -- Relation metadata
  relation_type TEXT,                         -- blocks, enables, relates_to, depends_on, etc. (nullable for simple links)
  label TEXT,                                 -- Optional display label

  -- Audit
  created_by TEXT,                            -- WorkOS user_id
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Prevent duplicate relations
  UNIQUE(source_type, source_id, target_type, target_id)
);

CREATE INDEX idx_relations_source ON relations(source_type, source_id);
CREATE INDEX idx_relations_target ON relations(target_type, target_id);
CREATE INDEX idx_relations_organization ON relations(organization_id);
```

#### Relation Types (Initial Set)

| Type | Description |
|------|-------------|
| `relates_to` | Generic relationship (default) |
| `blocks` | Source blocks target from starting |
| `enables` | Completing source enables target |
| `depends_on` | Source depends on target |
| `informs` | Source provides input to target |

---

### 6. `activity_log`

Audit trail for timeline view.

```sql
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- What changed
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,

  -- Who changed it
  user_id TEXT NOT NULL,                      -- WorkOS user_id
  user_name TEXT,                             -- Cached display name for timeline

  -- Change details
  event_type TEXT NOT NULL,                   -- status_change, comment, resource_added, resource_removed,
                                              -- winning_move_linked, assignment_changed, etc.

  old_value JSONB,                            -- Previous state (for status_change, etc.)
  new_value JSONB,                            -- New state

  -- Optional comment
  comment TEXT,                               -- User's note/comment

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activity_log_activity ON activity_log(activity_id);
CREATE INDEX idx_activity_log_created ON activity_log(created_at DESC);
CREATE INDEX idx_activity_log_event_type ON activity_log(event_type);
```

#### Event Types

| Event | Description | old_value | new_value |
|-------|-------------|-----------|-----------|
| `status_change` | Status updated | `{"status": "planned"}` | `{"status": "done"}` |
| `comment` | User left a comment | null | null (comment in `comment` field) |
| `resource_added` | Resource linked | null | `{"resource_id": "...", "title": "..."}` |
| `resource_removed` | Resource unlinked | `{"resource_id": "...", "title": "..."}` | null |
| `winning_move_linked` | Winning move associated | null | `{"winning_move_id": "...", "title": "..."}` |
| `assignment_changed` | Team assignment changed | `{"team": "Coreteam"}` | `{"team": "IT"}` |
| `created` | Activity created | null | null |

---

### 7. `activity_team_members`

Team members assigned to activities.

```sql
CREATE TABLE activity_team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID NOT NULL REFERENCES activities(id) ON DELETE CASCADE,

  -- Either a WorkOS user or non-user team member
  user_id TEXT,                               -- WorkOS user_id
  non_user_team_member_id UUID REFERENCES non_user_team_members(id) ON DELETE CASCADE,

  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure at least one is set
  CONSTRAINT activity_team_member_reference CHECK (
    user_id IS NOT NULL OR non_user_team_member_id IS NOT NULL
  ),

  -- Prevent duplicates
  UNIQUE(activity_id, user_id),
  UNIQUE(activity_id, non_user_team_member_id)
);

CREATE INDEX idx_activity_team_members_activity ON activity_team_members(activity_id);
```

---

## Migration Strategy

### Phase 1: Add New Tables (Non-Breaking)

1. Create all new tables alongside existing ones
2. No changes to `engagements` or `engagement_phase_milestones`
3. Workbench continues using existing tables

### Phase 2: Dual-Write (Bridge Period)

1. Update Workbench to write to BOTH old and new tables
2. When creating a milestone, also create corresponding activity
3. When updating milestone status, update activity status
4. New features (winning moves, circles, etc.) only in new tables

### Phase 3: Client Portal on New Model

1. Build Client Portal using `activities` table
2. Validate data integrity
3. Both apps running on their respective models

### Phase 4: Migrate Workbench

1. Update Workbench UI to use `activities` instead of milestones
2. Keep read fallback to milestones for any unmigrated data
3. Run migration script for historical data

### Phase 5: Deprecate Old Tables

1. Once all data migrated and verified
2. Remove milestone-related code from Workbench
3. Archive or drop `engagement_phase_milestones` table

---

## Milestone → Activity Mapping

| Milestone Field | Activity Field | Notes |
|-----------------|----------------|-------|
| `id` | `migrated_from_milestone_id` | Preserve reference |
| `engagement_id` | `engagement_id` | Direct mapping |
| (from engagement) | `organization_id` | Derived from engagement |
| `title` | `title` | Direct mapping |
| `description` | `description` | Direct mapping |
| `status: pending` | `status: planned` | Renamed |
| `status: in_progress` | `status: in_progress` | Same |
| `status: completed` | `status: done` | Renamed |
| `status: skipped` | `status: skipped` | Direct mapping |
| `order_index` | `order_index` | Direct mapping |
| `completed_at` | `completed_at` | Direct mapping |
| `completed_by` | `completed_by` | Direct mapping |
| (from engagement) | `phase` | Derived from engagement.phase |
| - | `time_bucket` | Default to 'this_quarter' |
| - | `icon`, `icon_color` | Default or derive from phase |
| - | `score_data` | null for migrated |
| - | `assigned_team` | null for migrated |

### Migration Script (Pseudocode)

```sql
INSERT INTO activities (
  organization_id,
  engagement_id,
  title,
  description,
  status,
  phase,
  time_bucket,
  order_index,
  completed_at,
  completed_by,
  migrated_from_milestone_id,
  created_at,
  updated_at
)
SELECT
  e.organization_id,
  m.engagement_id,
  m.title,
  m.description,
  CASE m.status
    WHEN 'pending' THEN 'planned'
    WHEN 'in_progress' THEN 'in_progress'
    WHEN 'completed' THEN 'done'
    WHEN 'skipped' THEN 'skipped'
  END,
  e.phase,
  'this_quarter',  -- default
  m.order_index,
  m.completed_at,
  m.completed_by,
  m.id,  -- preserve original milestone ID
  m.created_at,
  m.updated_at
FROM engagement_phase_milestones m
JOIN engagements e ON m.engagement_id = e.id;
```

---

## RLS Policies

All new tables need Row Level Security policies. Given the service-role-only pattern in Workbench:

```sql
-- Enable RLS
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE winning_moves ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_winning_moves ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_team_members ENABLE ROW LEVEL SECURITY;

-- Service role only policies (matching existing pattern)
CREATE POLICY "Service role access" ON activities FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role access" ON winning_moves FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role access" ON activity_winning_moves FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role access" ON activity_resources FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role access" ON relations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role access" ON activity_log FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role access" ON activity_team_members FOR ALL USING (true) WITH CHECK (true);
```

For Client Portal (if using anon/authenticated role), add tenant-scoped policies:

```sql
CREATE POLICY "Tenant access" ON activities
  FOR SELECT
  USING (organization_id = current_setting('app.organization_id')::text);
```

---

## Entity Relationship Diagram

```
┌─────────────────┐
│   engagements   │
│   (existing)    │
└────────┬────────┘
         │ 1:N
         ▼
┌─────────────────┐
│   activities    │
└────────┬────────┘
         │
    ┌────┴────┬──────────────┬───────────────┐
    │ 1:N     │ N:M          │ 1:N           │ 1:N
    ▼         ▼              ▼               ▼
┌─────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│activity │ │  activity   │ │  activity   │ │  activity   │
│resources│ │winning_moves│ │    log      │ │team_members │
└─────────┘ └──────┬──────┘ └─────────────┘ └─────────────┘
                   │ N:M
                   ▼
           ┌─────────────┐
           │winning_moves│
           └─────────────┘

┌─────────────────┐
│    relations    │ (generic linking - connects any entities)
└─────────────────┘
```

---

## TypeScript Types

```typescript
// Status types
type ActivityStatus = 'planned' | 'in_progress' | 'done' | 'skipped' | 'suggestion'
type TimeBucket = 'this_quarter' | 'next_quarter' | 'later'
type PlaybookPhase = 'align' | 'activate' | 'adopt'
type RelationType = 'relates_to' | 'blocks' | 'enables' | 'depends_on' | 'informs'

// Core types
interface Activity {
  id: string
  organizationId: string
  engagementId: string              // Required - always tied to engagement
  title: string
  description: string | null
  icon: string | null
  iconColor: string | null
  status: ActivityStatus
  phase: PlaybookPhase | null
  timeBucket: TimeBucket
  scheduledDate: string | null
  dueDate: string | null
  orderIndex: number
  completedAt: string | null
  completedBy: string | null
  scoreData: ActivityScoreData | null
  assignedTeam: string | null
  migratedFromMilestoneId: string | null
  createdAt: string
  updatedAt: string
}

interface ActivityScoreData {
  level: string
  metrics: Array<{
    label: string
    value: number
  }>
}

interface WinningMove {
  id: string
  organizationId: string
  title: string
  description: string | null
  sourcePhase: PlaybookPhase
  sourceActivityId: string | null
  status: 'active' | 'achieved' | 'archived'
  createdAt: string
  updatedAt: string
}

interface ActivityResource {
  id: string
  activityId: string
  type: 'notion' | 'url' | 'file' | 'tenant_page' | 'tenant_file'
  title: string
  icon: string | null
  url: string | null
  notionPageId: string | null
  tenantPageId: string | null
  tenantFileId: string | null
  orderIndex: number
  createdAt: string
}

interface Relation {
  id: string
  organizationId: string
  sourceType: string
  sourceId: string
  targetType: string
  targetId: string
  relationType: RelationType | null
  label: string | null
  createdBy: string | null
  createdAt: string
}

interface ActivityLogEntry {
  id: string
  activityId: string
  userId: string
  userName: string | null
  eventType: string
  oldValue: Record<string, unknown> | null
  newValue: Record<string, unknown> | null
  comment: string | null
  createdAt: string
}
```

---

## Implementation Order

### Step 1: Database Schema
1. Create migration file with all new tables
2. Run on local Supabase
3. Generate TypeScript types

### Step 2: Core Activity CRUD
1. Activity queries and mutations in `packages/database` or app
2. Service functions for Workbench
3. Keep milestone functions working

### Step 3: Client Portal - Our Planning View
1. Activity card component
2. Time bucket columns
3. Basic status management

### Step 4: Winning Moves
1. CRUD for winning moves
2. Activity-winning move linking UI

### Step 5: Activity Resources
1. Link existing tenant_pages and tenant_files
2. External URL support
3. Resource UI in activity cards

### Step 6: Relations
1. Generic relation CRUD
2. Relations view UI
3. Dependency visualization

### Step 7: Activity Log & Timeline
1. Auto-logging on activity changes
2. Timeline view (same data as Stream, different filters)
3. Comment support

### Step 8: Migration
1. Run migration script
2. Update Workbench to use activities
3. Verify and deprecate milestones

---

## Deferred Features

The following are explicitly deferred for later phases:

1. **Circles** - Groups of tenants for exclusive content (will add `circles`, `circle_members` tables later)
2. **Snapshots** - Point-in-time activity captures
