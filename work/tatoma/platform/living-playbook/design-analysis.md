# The Living Playbook - Design Analysis

> Analysis of Figma designs for the new Client Portal playbook experience.
> Generated: 2026-02-05

## Overview

"The Living Playbook" is a redesign of the Client Portal that brings the internal Workbench consulting toolkit to clients in a polished, client-facing format.

## Main View (Our Planning)

- **Header**: "The Living Playbook" title + personalized "Hi {Name}" greeting
- **Navigation tabs**: Our Planning | Relations | Timeline | Stream
- **Left sidebar**:
  - Playbook section (Overview, Account, Landscape, People)
  - Knowledge section (Prompts, Cards, Library)
  - Custom sections (SADS, etc.)
- **Content**: Cards organized by time periods (This Quarter, Next Quarter, Later)

## Card System

Cards represent activities/milestones with rich content.

### Card Anatomy

| Element | Description |
|---------|-------------|
| Icon | Pentagon shape, color varies by type/status |
| Title | Activity name (e.g., "Tech scan") |
| Subtitle | Phase or category (e.g., "Align on strategy") |
| Description | Brief text explaining the activity |
| Winning Moves | Optional badges (e.g., "AI BENCHMARK IN YOUR INDUSTRY") |
| Circles | Optional team/group indicator |
| Resource Links | Notion docs, reports (e.g., "Tech Scan Report", "Landschap overview") |
| Team Avatars | Shows assigned team members |
| Team Name | Group responsible (e.g., "Coreteam", "IT", "Leadership") |
| Status Badge | `planned` / `in progress` / `done` / `suggestion` |
| Score/Level | For completed items (e.g., "Solid working ground" with bar chart) |
| Time indicator | Days since update (e.g., "1 day") |

### Card Visual States by Status

| Status | Background | Badge Style | Notes |
|--------|------------|-------------|-------|
| `planned` | Light/white | Green outline "planned" | Default state |
| `in progress` | Light/white | Green filled "in progress" | Active work |
| `done` | Dark (black) | Green filled "done" | Shows results/scores |
| `suggestion` | Light/white | Gray text "suggestion" | AI or consultant suggested |

### Card Size Variants

Cards appear in two widths:
- **Standard**: Single column width
- **Wide**: Shows additional resource links side-by-side

## Views

### 1. Our Planning (Main View)
- Kanban-style layout with time-based columns
- Columns: **This Quarter** | **Next Quarter** | **Later**
- Cards stack vertically within columns
- Drag-and-drop implied for reordering/rescheduling

### 2. Relations View
- Dependency graph visualization
- Shows how activities connect to each other
- Lines/arrows between related cards
- Cards positioned to show flow/sequence
- Allows understanding of activity dependencies

### 3. Timeline View
- Activity feed / audit log format
- Grouped by time (e.g., "YESTERDAY 12:12", "LAST WEEK")
- Shows status change events:
  - "Maarten changed status to planned"
  - "Maarten changed status to done"
  - "Maarten changed status to in progress"
- Cards displayed inline with their current state
- Comments/notes from team members (e.g., "Israel: Report is ready! Check out the results...")

### 4. Stream View
- Similar to Timeline but potentially filtered differently
- May show only relevant updates for the logged-in user

## Details Sidebar

When clicking a card, a sidebar slides in showing:

- Full card content (icon, title, description)
- **Winning Moves** checklist with checkable items
- "Share summary with colleagues" action button
- **Playbook snapshots**:
  - "Playbook - snapshot - updated"
  - "Playbook - snapshot - roundup after session"
- Team members section
- Status controls

## Optional Card Elements

### Winning Moves
- Displayed as badges/tags on cards
- Example: "AI BENCHMARK IN YOUR INDUSTRY"
- Can have multiple per card
- Checkable in detail view

### Circles
- Team/group involvement indicator
- Shows which organizational circles are involved
- Displayed with colored indicator (red/green shown)
- Shows relationship text (e.g., "stuurgroep van de toekomst")

## Sidebar Navigation

### Playbook Section
- Overview
- Account
- Landscape
- People

### Knowledge Section
- Prompts
- Cards
- Library

### Custom Sections
- User-defined sections (e.g., "SADS")

## Design Tokens (Observed)

### Colors
- **Background**: Cream/beige (#F5F5DC approximate)
- **Card Dark**: Black/very dark gray
- **Card Light**: White
- **Accent Green**: Used for status badges and highlights
- **Icon Yellow**: Pentagon icons on dark cards
- **Text Primary**: Black
- **Text Secondary**: Gray

### Typography
- **Title**: Monospace font ("The Living Playbook")
- **Greeting**: Sans-serif, large
- **Card titles**: Sans-serif, medium weight
- **Body text**: Sans-serif, regular

## Data Model Implications

Based on these designs, the data model needs to support:

1. **Activities/Cards**
   - Title, description, icon
   - Status (planned, in_progress, done, suggestion)
   - Time bucket (this_quarter, next_quarter, later) or dates
   - Assigned team/circle
   - Team members
   - Score/level (for completed items)

2. **Winning Moves**
   - Many-to-many with activities
   - Title/label
   - Completion status per activity

3. **Circles/Teams**
   - Name, color
   - Members
   - Organization relationship

4. **Resources/Links**
   - Attached to activities
   - Type (notion, url, file)
   - Title, icon

5. **Relations/Dependencies**
   - Source activity
   - Target activity
   - Relation type (blocks, enables, relates_to)

6. **Activity Log/Timeline**
   - Activity ID
   - User who made change
   - Change type (status_change, comment, etc.)
   - Old value, new value
   - Timestamp
   - Optional comment text

7. **Playbook Snapshots**
   - Point-in-time captures
   - Associated with activities
   - Type (updated, roundup, etc.)

## Implementation Priority (Suggested)

### Phase 1: Core
1. New data model for activities (replacing/extending milestones)
2. Card component with all visual states
3. Main "Our Planning" view with time columns

### Phase 2: Details & Interaction
4. Details sidebar
5. Status management
6. Resource links

### Phase 3: Collaboration
7. Timeline/activity log
8. Relations view (simplified)
9. Winning Moves & Circles

### Phase 4: Polish
10. Stream view
11. Advanced relations
12. Snapshots
