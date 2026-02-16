# PRD: Transformation OS — Q2 2026

**Author:** Israel Roldan
**Date:** February 16, 2026
**Status:** Draft
**Context:** [Strategy Session Notes (Feb 12)](./platform-notes.md)

---

## 1. Background & Motivation

On February 12, the three co-founders held a strategy session that resulted in a fundamental repositioning of the Tatoma offering. The key decision: shift from vague, unscalable execution support toward a **platform-centered model** with two distinct products serving different audiences.

### The Two-Product Model

| Product | Who it's for | What it does |
|---------|-------------|-------------|
| **Transformation OS** | Decision makers, management teams, transformation lead(s) | The strategic command center — playbook, sprints, guided refresh, adoption tools, and the transformation lead's growth path |
| **Learn & Create** | All employees across the organization | Training, personal AI adoption, prompt tools, certificates — the retention and stickiness layer |

**This PRD covers the Transformation OS only.** Learn & Create will have its own dedicated PRD.

### Why this matters now

The current platform has the bones (Living Playbook, activity cards, winning moves), but it was built as a consultant tool with a client-facing view. The strategy session demands it become something more: a system that decision makers and transformation leads feel ownership of, that delivers value between consulting touchpoints, and that justifies a recurring subscription after year one.

The Transformation OS combines the **Transform** (platform + playbook) and **Accelerate** (sprints) layers into a single coherent product — because for the target user (the transformation lead and their leadership team), these are two sides of the same coin: the strategy and the execution.

---

## 2. Current State

### What exists today

The Living Playbook implementation (completed Feb 5, 2026) delivered:

**Database layer (complete):**
- Activities table (replacing milestones) with status, time buckets, phases, scoring
- Winning moves with activity linking
- Activity resources (Notion, URLs, files)
- Relations (generic entity-to-entity linking)
- Activity log (audit trail)
- Team member assignment

**Client Portal (partial):**
- Activity cards with phase-specific icons (Align/Activate/Adopt)
- "Our Planning" view with time-bucket columns (This Quarter / Next Quarter / Later)
- Activity detail sidebar with Framer Motion animations
- Winning moves checklist display
- Relations, Timeline, Stream tabs → "Coming soon"

**Workbench (mostly complete):**
- Full activity CRUD with sidebar editing
- Winning moves manager
- Activity resources add/remove
- Team member assignment
- Activity timeline/log display
- All API routes built

### What's missing to become the Transformation OS

| Gap | Impact |
|-----|--------|
| No guided onboarding | Clients can't start without full consulting hand-holding |
| No quarterly refresh workflow | No structured way to prepare for check-ins between sessions |
| No playbook narrative or strategic context | Activities exist in a vacuum — no story connecting them |
| Relations and Timeline views not built | Two of four tabs are placeholder |
| No execution use case generator | Transformation leads can't scope new AI use cases independently |
| No sprint workflow in the platform | Can't scope or track Spikes/Sprints/Specials from within the OS |
| No nudge/notification system | Platform is passive — clients must remember to come back |
| No progress indicators or health signals | No way to see at a glance if the transformation is on track |
| No transformation lead development path | The TL role is demanding but there's no support for growing into it |
| No export capabilities | Clients can't generate shareable summaries for stakeholders |

---

## 3. Goals for Q2

### Primary goal
Make the Transformation OS good enough that a client transformation lead considers it *their* system for managing the AI transformation — not a consultant's tool they occasionally peek at.

### Success criteria
1. A client can log in, see the current state of their transformation, and understand what needs attention — without needing a call with Tatoma.
2. The quarterly refresh workflow is guided enough that a transformation lead can prepare for a check-in session in under 30 minutes.
3. The platform surfaces signals (progress, blockers, upcoming activities) that justify its existence between consulting touchpoints.
4. Transformation leads can scope new use cases and request sprints independently from the platform.
5. The experience feels like a product, not a consulting deliverable viewer.

### Non-goals for Q2
- Self-service sign-up (no product-led growth yet)
- Learn & Create module (separate PRD)
- Client-to-client circles or communities
- External integrations (Slack, Teams, Jira connectors)
- Mobile optimization
- White-label / client branding

---

## 4. Capability Areas

The Transformation OS has seven capability areas. Together, they form a complete system for managing an AI transformation at the leadership level.

### 4.1 Guided Onboarding

**Problem:** Today, getting a client onto the platform requires extensive consulting setup — manually creating activities, configuring the playbook, explaining navigation. There's no self-guided path from "first login" to "I understand my transformation."

**What it delivers:**
- **Welcome flow** — when a transformation lead first logs in, they see a guided walkthrough: what the OS does, how it maps to their engagement, what actions they can take.
- **Playbook setup wizard** — for consultants: a structured flow for populating a new client's playbook (industry context → winning moves → initial activities → phase mapping). Replaces ad-hoc Workbench setup.
- **Sprint introduction** — explain Spikes, Sprints, and Specials as part of onboarding. Show how to request one when needed.
- **Progress checklist** — a persistent onboarding checklist (view your playbook, complete your first refresh, explore the timeline) that disappears once key actions are taken.

**Data model changes:**
- `onboarding_progress` table: `user_id`, `organization_id`, `step` (enum), `completed_at`

### 4.2 Living Playbook + Adoption Tools

**Problem:** The playbook shows activity cards but lacks strategic context. There's no narrative about *why* these activities matter or how the transformation arc unfolds. Additionally, two of four tabs are placeholders.

**What it delivers:**
- **Playbook Overview page** — a rich-text summary of the client's transformation story as the landing view. Includes: transformation vision, key challenges, strategic direction, links to winning moves.
- **Phase summaries** — narrative blocks at the top of each phase (Align, Activate, Adopt) explaining what this phase means for this client.
- **Winning moves as strategic anchors** — promote winning moves from badges to first-class navigation items with their own pages showing linked activities, progress, and consultant notes.
- **Timeline view** — chronological feed of all activity changes, grouped by time period. Uses existing `activity_log` data.
- **Stream view** — personalized feed for the logged-in user (their assigned activities, mentions, updates).
- **Relations view** — interactive React Flow dependency graph. Activities as nodes, relations as edges. Click to open detail sidebar.
- **Client-side commenting** — transformation leads can comment on activities directly from the portal.
- **Progress & health dashboard** — progress bars per winning move, phase completion indicators, overdue/stale activity flags, transformation scorecard widget.

**Data model changes:**
- `playbook_narratives` table: `organization_id`, `engagement_id`, `section`, `content` (markdown), `updated_at`, `updated_by`
- Enrich `winning_moves` with `description` field
- Add `position_x`, `position_y` to activities for graph positioning

### 4.3 Execution Use Case Generator

**Problem:** Between consulting sessions, transformation leads discover potential AI use cases in conversations, meetings, or industry reading — but have no structured way to evaluate and capture them. They either forget them or bring a messy list to the quarterly session.

**What it delivers:**
- **"New Use Case" flow** — a guided form accessible from the dashboard. Asks: what department, what process, what's the pain point, estimated impact, estimated complexity.
- **AI-assisted scoping** — using existing Groq integration, the platform drafts a preliminary use case brief from the input. Suggests similar use cases from Tatoma's library if available.
- **Use case backlog** — captured use cases appear in a dedicated section of the playbook. Consultants review during quarterly sessions and can promote to activities or sprint candidates.
- **Prioritization matrix** — simple impact vs. effort quadrant view of the use case backlog, helping transformation leads have more productive conversations with their leadership team.

**Data model changes:**
- `use_cases` table: `id`, `organization_id`, `engagement_id`, `title`, `department`, `process`, `pain_point`, `estimated_impact`, `estimated_complexity`, `ai_brief` (generated), `status` (captured / reviewed / promoted / parked), `created_by`, `created_at`

### 4.4 Guided Refresh

**Problem:** Between consulting sessions, the platform goes silent. Clients show up to quarterly check-ins unprepared. The strategy session explicitly called this out: "before you get back, we do the platform-led refresh."

**What it delivers:**
- **Refresh prompt** — 2-4 weeks before a scheduled quarterly session, the platform prompts the transformation lead to start a refresh via banner/card on the dashboard.
- **Guided questionnaire** — step-by-step flow covering: overall progress sentiment, status updates on winning moves, new strategic inputs, key blockers, new use cases discovered.
- **Document upload with AI context extraction** — clients upload strategy docs; the platform uses the existing Workbench research pipeline to extract relevant context and update the playbook narrative.
- **Refresh summary** — AI-generated pre-session briefing from responses + activity data. Visible to both client and consultant.
- **Reminder emails** — automated reminders via Resend at 4 weeks and 2 weeks before the session.

**Data model changes:**
- `quarterly_refreshes` table: `id`, `organization_id`, `engagement_id`, `quarter`, `status`, `scheduled_session_date`, `responses` (JSONB), `summary` (markdown), `created_at`, `completed_at`
- `refresh_documents` table: `id`, `refresh_id`, `file_path`, `original_filename`, `extracted_context` (JSONB), `uploaded_at`

### 4.5 Quarterly Check-in Support

**Problem:** Even with the refresh, the quarterly session itself lacks platform support. Consultants prepare manually, and outcomes aren't captured in a structured way back into the platform.

**What it delivers:**
- **Pre-session briefing page** — auto-generated view combining: refresh summary, activity health signals, winning move progress, new use cases since last session. Designed for consultants to review before the call.
- **Session outcome capture** — after the quarterly session, consultants can record: key decisions made, activities added/modified, next quarter priorities, follow-up actions. This becomes part of the engagement history.
- **Quarter-over-quarter comparison** — simple view showing progress from one quarter to the next (completion rates, new activities, sentiment trend).

**Data model changes:**
- `quarterly_sessions` table: `id`, `refresh_id`, `session_date`, `outcomes` (JSONB), `decisions` (JSONB), `recorded_by`, `created_at`

### 4.6 Transformation Lead MiniMBA

**Problem:** The transformation lead role is demanding and often filled by someone who's never done it before. They need to learn strategy execution, change management, and stakeholder alignment — but there's no structured path for that within the platform. Currently this falls to ad-hoc consulting conversations.

**What it delivers:**
- **Curated learning path** — a sequence of short modules (articles, frameworks, micro-lessons) covering the core competencies of a transformation lead: stakeholder management, change communication, initiative prioritization, measuring transformation progress.
- **Contextual nudges** — when the platform detects relevant moments (e.g., a refresh is upcoming → surface a module on "preparing for leadership check-ins"), it suggests the relevant learning content.
- **Progress tracking** — the transformation lead sees their learning progress. Consultants see it too, enabling better coaching conversations.
- **Community of practice (future)** — placeholder for connecting transformation leads across Tatoma clients. Not built in Q2, but the content framework supports it.

**Implementation note:** This is primarily a content + delivery system. The platform displays curated content authored by Tatoma consultants. No LMS engine needed for MVP — a content table with sequencing is sufficient. LMS integration can come later.

**Data model changes:**
- `learning_modules` table: `id`, `title`, `content` (markdown), `category`, `sequence_order`, `estimated_minutes`
- `learning_progress` table: `user_id`, `module_id`, `started_at`, `completed_at`

### 4.7 Sprint Workflow (Spikes, Sprints, Specials)

**Problem:** The strategy session defined sprints as a core part of the Transformation OS offering — not a bolt-on. Currently there's no way to scope, request, or track sprints from within the platform.

**What it delivers:**
- **"Request a Sprint" action** — available from activity cards, use cases, or standalone. Opens a guided flow where the transformation lead describes what they need.
- **Sprint brief template** — structured document covering: objective, scope, team involved, prerequisites, success criteria, expected deliverables. Pre-populated from activity context.
- **AI-assisted brief generation** — uses Groq to draft a brief from the activity context and guided questions.
- **Sprint types** — Spike (~2 days, process-oriented), Sprint (~1 week, explorative), Special (topic deep-dive, variable scope). Each has a tailored brief template.
- **Sprint tracking** — approved sprints appear as special activity cards in the playbook with their own status flow: briefed → scheduled → in_progress → delivered → reviewed.
- **Sprint outcomes** — post-sprint, deliverables and key outcomes are captured back into the playbook, linking to relevant activities and winning moves.

**Data model changes:**
- Add `activity_type` field to `activities`: `standard` | `spike` | `sprint` | `special`
- `sprint_briefs` table: `id`, `activity_id`, `objective`, `scope`, `team`, `prerequisites`, `success_criteria`, `deliverables`, `sprint_type`, `status` (draft / submitted / approved / completed), `created_at`, `submitted_at`

---

## 5. Cross-Cutting: Proactive Nudge System

Not a standalone capability, but essential infrastructure that all capability areas depend on.

**Problem:** "Don't expect them to log in daily." The platform needs to reach clients where they are and route them back when there's a reason.

**What to build:**
- **Weekly digest email** — sent to the transformation lead every Monday via Resend. Shows: activities that changed, upcoming activities, stale items, and a CTA to log in.
- **Quarterly refresh reminders** — emails at 4 and 2 weeks before the session.
- **Activity status change notifications** — when a consultant updates something, the TL gets an email with what changed.
- **Health alert email** — if no activity has been updated in 30+ days, send a nudge.
- **Contextual learning nudges** — surface relevant MiniMBA content based on platform events (e.g., upcoming refresh → "how to prepare for leadership check-ins").

**Data model changes:**
- `notification_preferences` table: `organization_id`, `user_id`, `weekly_digest`, `status_change_alerts`, `refresh_reminders`, `learning_nudges`
- `notification_log` table: `id`, `organization_id`, `user_id`, `type`, `sent_at`, `email_id`

---

## 6. Implementation Phases

### Phase A: Foundation (Weeks 1–3)
*Deploy the Living Playbook, add the narrative layer, and get the first-login experience right.*

1. Complete Living Playbook deployment — merge branch, run migrations, verify data.
2. Build guided onboarding flow — welcome walkthrough, progress checklist.
3. Build playbook narrative layer — overview page, phase summaries, winning moves pages.
4. Build Timeline view using existing activity_log data.
5. Add client-side commenting on activities from Client Portal.
6. Progress indicators — completion percentages on winning moves and phase headers.

**Exit criteria:** A new client can log in for the first time and understand their transformation through a guided experience. Existing clients see their transformation story, not just cards.

### Phase B: Refresh & Check-in (Weeks 4–6)
*Build the workflow that makes the platform valuable between sessions.*

1. Guided refresh questionnaire — step-by-step pre-session flow.
2. Document upload with context extraction (reuse Workbench research pipeline).
3. AI-generated refresh summary / pre-session briefing.
4. Pre-session briefing page for consultants.
5. Session outcome capture in Workbench.
6. Refresh reminder emails via Resend.

**Exit criteria:** Transformation lead receives a reminder, completes refresh in ~20 min, consultant has a briefing ready before quarterly session, session outcomes feed back into the platform.

### Phase C: Intelligence & Nudges (Weeks 7–9)
*Make the platform proactive and add the use case generator.*

1. Execution use case generator — guided capture + AI scoping.
2. Use case backlog with prioritization matrix.
3. Activity health signals — overdue and stale detection.
4. Transformation scorecard summary widget.
5. Weekly digest email — automated Monday summary.
6. Status change notifications.

**Exit criteria:** Transformation leads can capture and evaluate use cases independently. Platform sends meaningful emails that drive return visits.

### Phase D: Sprints, Relations & Learning (Weeks 10–12)
*Complete the sprint workflow, relations view, and the TL learning path.*

1. Sprint brief generator — guided flow for requesting Spikes/Sprints/Specials.
2. Sprint activity type — special cards in the playbook with their own status flow.
3. Relations view — React Flow dependency graph.
4. Stream view — personalized activity feed.
5. Transformation Lead MiniMBA — learning path structure, initial content modules, progress tracking.

**Exit criteria:** Transformation leads can request sprints from within the platform, all four playbook tabs are functional, and the first MiniMBA learning modules are available.

---

## 7. What Changes for Existing Clients

**Transition approach:**
- Deploy improvements incrementally — clients see a better product over the quarter.
- Pilot quarterly refresh with one client first (likely Acito) before broader rollout.
- The biweekly check-in cadence tapers as the platform proves it can carry the load.
- Frame it as "we're investing in making your transformation more self-sufficient."

**Grandfathering:**
- Existing clients keep current engagement terms through contract period.
- New features (refresh, sprint briefs, use case generator) are presented as platform upgrades they get automatically.
- The pricing shift (setup fee + subscription) applies to new engagements or renewals.

---

## 8. Technical Considerations

### Architecture decisions
- Keep the dual-app model (Workbench + Client Portal) for now. Audiences and permissions are different enough.
- Reuse Workbench research pipeline for quarterly refresh context extraction and use case AI scoping.
- Email via Resend for all nudges. Webhook infrastructure already exists.
- React Flow for relations — lightweight, well-maintained.
- MiniMBA content stored as markdown in a content table. No LMS engine for MVP.

### Performance considerations
- Activity health signals computed on page load, cached with 1-hour TTL.
- Weekly digest emails via scheduled function (Vercel Cron).
- Document upload context extraction is async — show progress indicator.
- Use case AI scoping via Groq (fast inference).

### Migration risks
- Living Playbook branch has 76 files changed. Merge carefully with any main branch changes since Feb 5.
- Migration 031 (milestone → activity) is idempotent but should be tested on staging first.

---

## 9. Open Questions

1. **Rich text format for narratives** — Markdown or structured blocks? Recommendation: start with Markdown.

2. **Quarterly refresh scheduling** — who sets the date? Recommendation: manually set by consultant, with option to auto-generate.

3. **Comment permissions** — any client user, or only the transformation lead? Recommendation: any authenticated user in the org.

4. **Sprint brief approval flow** — does the consultant need to approve? Recommendation: yes — draft → submitted → approved.

5. **MiniMBA content creation** — who writes the modules? Recommendation: co-founders author initial set (10-15 modules), expand over time. AI-assisted drafting from existing Tatoma IP.

6. **Use case library sharing** — should use cases be shareable across clients (anonymized)? Recommendation: not in Q2. Build the per-client version first, cross-pollination later.

7. **Notification volume** — how many emails per week is too many? Recommendation: cap at weekly digest + activity-triggered alerts. Let users toggle off categories.

---

## 10. Success Metrics (post-launch)

| Metric | Target | How to measure |
|--------|--------|----------------|
| Client portal logins per month | 4+ per client (at least weekly) | Auth logs |
| Quarterly refresh completion rate | 80%+ of clients complete before session | Refresh table status |
| Time to complete quarterly refresh | Under 30 minutes | Timestamp delta |
| Email open rate (weekly digest) | 40%+ | Resend analytics |
| Activities updated per quarter | 50%+ of active activities get a status change | Activity log queries |
| Use cases captured per quarter | 3+ per client | Use case table count |
| Sprint briefs created | 1+ per accelerator/leader client per quarter | Sprint brief table count |
| MiniMBA module completion | 50%+ of TLs complete at least 3 modules in first quarter | Learning progress table |
| Client NPS on platform value | 7+ | Quarterly survey |

---

*This PRD covers the Transformation OS only. A separate PRD for Learn & Create (Academy, personal use case generator, prompt tools, Cards/Agents, training sessions) will follow. The two products share infrastructure but serve different audiences and will be developed on different timelines.*
