# Worktree Brief: Academy Engine + Certificates + Analytics

**Roadmap ID:** Sprint 2 (Learn v1)
**Priority:** P0 | **Workstream:** Studio Experience
**Status:** Ready for implementation analysis
**Design doc:** [Learn v1 Design](./learn-v1-design.md) (v6)
**Depends on:** Use Case Generator (implemented), Prompt Library (shipped)

### Version History

| Version | Date | Changes |
|---------|------|---------|
| **v1** | **2026-02-24** | **Initial brief — Academy engine, certificate generation, analytics dashboard. Completion-based progress (no graded assessments). Exercise completion via self-report or prompt execution depending on exercise type.** |

---

## The Core Idea

The Use Case Generator gets employees to discover and try AI use cases. But discovery alone doesn't build lasting capability — employees need structured learning to go from "I tried a prompt once" to "I understand how to work with AI effectively."

The Academy Engine is the structured learning layer. It serves one learning path in v1 ("AI Foundations" — 6 modules), but is built to support multiple paths later. Each module follows a concept → exercise → done pattern. No quizzes, no scores — completing the hands-on exercise is what unlocks the next module. Finish all 6, get a certificate.

The certificate matters more than it might seem. For employees, it's proof of a new skill — something they can put on LinkedIn. For TLs, it's a measurable adoption metric: "X% of our employees are now AI-certified." For the platform, certificates create a completion incentive that pure "read the article" modules don't.

Analytics closes the loop for TLs: who's registered, who's active, who's completing modules, who's discovering use cases, who's actually using prompts. Without this dashboard, TLs can't prove value to leadership — and proving value is what drives renewals.

---

## What This Is (and Isn't)

This IS:
- A learning path system that renders markdown content, tracks exercise completion, and issues certificates
- Completion-based: do the exercise, move on. No graded assessments.
- A certificate generator that produces branded PDFs with public verification URLs
- An analytics dashboard for TLs showing adoption metrics across their org
- An employee progress dashboard showing personal learning status
- Built to support multiple learning paths later, but ships with one (AI Foundations)

This is NOT:
- A full LMS (no SCORM, no xAPI, no third-party content import)
- A video hosting platform (external embeds for now)
- A content authoring tool (content is authored in Workbench as markdown, or via migration)
- A gamification system (no points, badges, leaderboards)
- An assessment engine (no quizzes, no scoring, no pass/fail)

---

## Part 1: Learning Path & Module System

### Data Model

These tables are defined in the design doc. Included here for implementation reference:

```
learning_paths (
  id              uuid PK
  title           text          -- "AI Foundations"
  description     text          -- path overview
  estimated_hours decimal       -- total estimated time
  sequence_order  integer       -- for ordering multiple paths (v2+)
  published       boolean       -- only published paths are visible to employees
  created_at      timestamptz
  updated_at      timestamptz
)

learning_modules (
  id               uuid PK
  path_id          uuid FK → learning_paths
  title            text          -- "What AI Actually Does (and Doesn't)"
  content_md       text          -- full module content as markdown
  video_url        text          -- nullable, external embed URL
  exercise_type    text          -- "self_report" | "prompt_execution"
  exercise_prompt  text          -- exercise description (what to do)
  exercise_linked_prompt_id  uuid  -- nullable, FK → prompt templates (for prompt_execution type)
  sequence_order   integer       -- module ordering within the path
  estimated_minutes integer      -- per-module time estimate
  created_at       timestamptz
  updated_at       timestamptz
)

employee_progress (
  id                    uuid PK
  user_id               uuid FK → users
  module_id             uuid FK → learning_modules
  started_at            timestamptz     -- when employee opened the module
  exercise_completed_at timestamptz     -- nullable, when exercise was marked/detected done
  completed_at          timestamptz     -- nullable, when module was fully completed
  created_at            timestamptz
)
```

### Module Rendering

Each module page has three sections:

**1. Concept section** — renders `content_md` as formatted HTML. Standard markdown rendering (headings, lists, code blocks, links, images). If `video_url` is present, embed it at the top or at a position marked in the markdown (e.g., a `<!-- video -->` placeholder).

**2. Exercise section** — renders `exercise_prompt` as a distinct callout/card below the content. This is the "do this now" action. The exercise section looks different depending on `exercise_type`:

- **`self_report`**: Shows the exercise description + a "Mark as Done" button. The employee does the exercise (which might be outside the platform — e.g., "compare AI output vs your manual approach") and clicks Done when they're finished. Trust-based.

- **`prompt_execution`**: Shows the exercise description + a "Try this prompt →" button that links to `exercise_linked_prompt_id`. The exercise is automatically marked complete when the employee runs that prompt (detected via the prompt library's existing execution tracking). Falls back to self-report if the prompt run can't be detected.

**3. Navigation** — Previous/Next module links. Next module is locked until the current exercise is completed. The last module in the path shows "Complete path → Get certificate" instead of "Next."

### Module Locking

Modules are sequential within a path. An employee can only access module N+1 after completing module N's exercise. Module 1 is always unlocked.

Implementation: when loading a module page, check `employee_progress` for all modules with lower `sequence_order` in the same path. If any don't have `exercise_completed_at` set, redirect to the latest incomplete module. Keep it simple — no complex unlock trees, just linear progression.

### Content Authoring (v1)

Content is authored outside the system and loaded via:
- **Seed migration** — initial AI Foundations content loaded as part of deployment
- **Workbench** — TLs/consultants can edit module content (markdown) through the admin interface

No WYSIWYG editor for v1. Content is markdown. The Workbench editing experience should be whatever the simplest existing pattern is — a text area with markdown preview is fine.

---

## Part 2: Certificate Generation

### When a Certificate is Issued

An employee completes all modules in a learning path (all `exercise_completed_at` timestamps set) → the system automatically creates a certificate record and generates the PDF.

### Certificate Data Model

```
certificates (
  id                uuid PK
  user_id           uuid FK → users
  path_id           uuid FK → learning_paths
  organization_id   uuid FK → organizations
  employee_name     text          -- snapshot at time of issue
  path_title        text          -- snapshot at time of issue
  issued_at         timestamptz
  verification_code text UNIQUE   -- short URL-safe code (e.g., "TAT-AF-8x7k2m")
  pdf_url           text          -- storage URL for generated PDF
  created_at        timestamptz
)
```

**Why snapshot `employee_name` and `path_title`?** If a name or path title changes later, the certificate should still show what it said when issued.

### Certificate PDF

**Design:** Follow the existing Tatoma brand kit (colors, logo, fonts) from the codebase. Claude Code should look at existing brand assets and match the style. The certificate should look professional and clean — something an employee would be comfortable sharing on LinkedIn.

**Content on the certificate:**
- Tatoma logo
- "Certificate of Completion"
- Employee name
- Path title ("AI Foundations")
- Organization name
- Date of completion
- Verification URL (e.g., `https://app.tatoma.eu/verify/TAT-AF-8x7k2m`)
- A brief description: "Has completed the AI Foundations learning path, demonstrating practical AI skills for the workplace."

**Generation approach:** Server-side PDF generation. Claude Code should determine the best approach based on existing patterns in the codebase (React-PDF, Puppeteer, or similar). Generate on certificate creation and store the PDF (same storage pattern used elsewhere in the app).

### Public Verification Page

The verification URL resolves to a simple public page (no auth required) that confirms:
- Certificate is valid
- Employee name
- Path title
- Organization name
- Date of completion

This page is minimal — it exists so that when someone clicks a LinkedIn badge or shared link, they can verify the certificate is real. No employee personal data beyond name is exposed.

**Route:** A public route, not behind auth. Something like `/verify/[code]`.

---

## Part 3: Employee Progress Dashboard

### What the Employee Sees

The employee's learning dashboard shows their personal progress. This lives within the Studio under "Learn" in the IA:

**Learning path card:**
- Path title + description
- Progress bar: X of 6 modules completed
- Current module: "[Module title] — Continue →"
- Estimated time remaining
- Certificate status: "Not started" | "In progress (X/6)" | "Completed ✓ — View certificate"

**Module list:**
- All modules listed in order
- Each shows: title, estimated time, status icon (locked 🔒 / available / completed ✓)
- Clicking an available or completed module opens it
- Clicking a locked module shows a tooltip: "Complete [previous module] first"

**For v1, there's only one learning path.** The UI should handle multiple paths (loop/list), but we only seed one. The "Paths" list is just a single card. Don't over-design for multiple paths — just make sure the data model and rendering support it.

---

## Part 4: Analytics Dashboard (TL-facing)

### Who Sees This

The analytics dashboard is for **TL** and **consultant** roles — not employees. It lives in the **Workbench** (admin side), not the Studio (employee side).

### Metrics

The dashboard shows org-level adoption metrics. All metrics are computed from existing data — no new tracking infrastructure needed.

**Registration & Activation:**
- Total registered employees (count of `employee_profiles` for the org)
- Active employees (employees who logged in within the last 30 days)
- Activation rate: employees who have completed at least one action (run a prompt, saved a use case, started a module) / total registered

**Use Case Discovery (from `personal_use_cases`):**
- Total use cases discovered across org
- Use cases by status: Discovered / Tried / Adopted / Dismissed
- Discovered → Tried conversion rate
- Tried → Adopted conversion rate

**Learning (from `employee_progress`):**
- Employees who started AI Foundations
- Employees who completed AI Foundations
- Completion rate (completed / started)
- Certificates issued

**Prompt Library (from existing prompt library data):**
- Total prompts saved by employees
- Prompts in shared libraries
- Most-used prompt templates (by run count)

**Department Breakdown:**
- All of the above sliced by department
- Shows which departments are most/least engaged

### Computation

**Analytics are computed daily, not real-time.** A daily job aggregates metrics into a cache table:

```
org_analytics_cache (
  id            uuid PK
  org_id        uuid FK → organizations
  metric_date   date
  metrics_jsonb jsonb       -- all metrics as a JSON blob
  computed_at   timestamptz
)
```

The dashboard reads from this cache. The JSONB structure should be flexible enough to add new metrics without schema changes.

**Why daily, not real-time?** At 50-200 employees per client, the query load from real-time computation is trivial. But building the cache pattern now means it works when we scale to thousands. Also, TLs don't need real-time data — they check dashboards weekly or before leadership meetings.

The daily computation job should follow whatever scheduled job pattern exists in the codebase (cron, queue worker, etc.).

### Dashboard UI

Keep it simple for v1. A single page with:
- **Top row:** 3-4 headline numbers (registered employees, active rate, certificates issued, use cases discovered)
- **Middle section:** Key charts/metrics — completion funnel (registered → activated → started learning → completed), use case status distribution
- **Bottom section:** Department breakdown table
- **Date range:** Default to "last 30 days" with option to change to "all time" or "last 7 days"

No export to CSV/PDF in v1. No email reports. Just the dashboard page.

---

## Part 5: Routes & Navigation

### Employee-facing (Studio)

- `Studio > Learn` — learning dashboard (path cards, progress)
- `Studio > Learn > [path_id]` — path overview (module list, progress bar)
- `Studio > Learn > [path_id] > [module_id]` — module page (content, exercise, navigation)
- `Studio > Learn > Certificates` — list of earned certificates with download links

### TL/Consultant-facing (Workbench)

- `Workbench > Analytics` — org-level analytics dashboard
- `Workbench > Academy > Paths` — manage learning paths (edit, publish/unpublish)
- `Workbench > Academy > Modules` — manage modules within paths (edit content, reorder)

### Public

- `/verify/[code]` — certificate verification page (no auth)

---

## Part 6: Graceful Degradation

| Failure | Fallback |
|---------|----------|
| **Module content empty** | Show exercise section only with a "Content coming soon" message. Module is still completable via exercise. |
| **Video embed fails to load** | Show the rest of the module content normally. Video is supplementary, not blocking. |
| **Prompt execution detection fails** (for `prompt_execution` exercises) | Fall back to self-report: show a "Mark as Done" button. Employee can still complete the exercise manually. |
| **Certificate PDF generation fails** | Create the certificate record (so completion is tracked). Queue a retry for PDF generation. Show "Certificate earned — PDF generating..." in the UI. |
| **Analytics computation job fails** | Dashboard shows last successfully computed data with a "Last updated: [date]" indicator. Never show a blank dashboard. |
| **No learning paths published** | "Learn" section shows a "Coming soon" state. Don't hide the navigation entry — employees should see it exists. |
| **Employee has no org context (department not set)** | Analytics department breakdown shows them as "Unassigned." Learning experience is unaffected. |

---

## Part 7: What's Explicitly Out of Scope

- **Multiple learning paths** — the system supports them in the data model, but v1 ships with one (AI Foundations). No path selection UI needed beyond a single card.
- **Content authoring WYSIWYG** — markdown text area in Workbench is sufficient
- **LMS integration (SCORM/xAPI)** — not needed for v1 scale
- **Video hosting** — external embeds only (YouTube, Vimeo, Loom)
- **Gamification** — no points, badges, leaderboards, streaks
- **Email notifications** — no "you haven't logged in" or "new module available" emails in v1
- **Export analytics** — no CSV/PDF export from the dashboard
- **Assessment engine** — no quizzes, no scoring, no question banks. This was explicitly decided against in favor of completion-based progress.
- **Content for the modules themselves** — the Academy Engine is the system. Content is authored by co-founders in Sprint 3 and loaded into the system. This worktree is about the engine, not the content.

---

## Part 8: Success Criteria

| Metric | Target | How to measure |
|--------|--------|----------------|
| Module rendering works correctly | All 6 modules render markdown + exercises without layout issues | Manual QA |
| Exercise completion tracking accurate | Self-report and prompt execution types both correctly update progress | Automated test |
| Module locking works | Can't skip ahead; completing exercise unlocks next module | Automated test |
| Certificate generated on path completion | PDF created within 30 seconds of last exercise completion | End-to-end test |
| Verification URL resolves | Public page loads without auth and shows correct certificate data | Automated test |
| Analytics dashboard loads | TL sees headline metrics within 2 seconds of page load | Manual QA |
| Analytics data correct | Metrics match raw data counts (spot-check 5 metrics) | Manual verification |
| Department breakdown populated | At least 3 departments shown when employees have departments set | Manual QA |

---

## Implementation Notes for Claude Code

1. **Where does this live?** — Like the Use Case Generator, the Academy Engine is a **new set of routes in the Academy app** alongside what already exists. The employee-facing learning pages live in the Studio. The analytics dashboard lives in the Workbench. The certificate verification page is a public route.

2. **Module content is not in this worktree** — the content_md fields will be empty or have placeholder text. The system needs to work with empty/placeholder content gracefully. Real content is loaded in Sprint 3.

3. **Exercise types** — two types: `self_report` (button click) and `prompt_execution` (auto-detected via prompt library run tracking). For `prompt_execution`, look at how the Prompts app tracks prompt runs/executions to detect completion. If that tracking doesn't exist or is hard to integrate, fall back to `self_report` for all exercises in v1 — the system should work either way.

4. **Certificate PDF generation** — look at existing brand assets in the codebase (logo, colors, fonts) and match the style. Use whatever PDF generation approach fits the existing tech stack (React-PDF, Puppeteer, jsPDF, etc.). The certificate needs to look professional — this is something employees will share publicly.

5. **Analytics computation** — follow whatever scheduled job pattern exists in the codebase for the daily aggregation. The JSONB blob in `org_analytics_cache` should be structured but flexible. Start with the metrics listed above; the shape should make it easy to add new metrics later without migrations.

6. **Feature flags** — same as the Use Case Generator: the Academy engine routes and navigation entries should respect the Learn feature flag (per-org or per-department toggle).

7. **Existing Academy content** — there's already learning content, resources, and links in the Academy app. The new learning path system sits alongside this — it doesn't replace the existing content. Ensure the navigation accommodates both.

8. **Multi-language preparation** — like the department templates in the Use Case Generator, any seed data (path titles, descriptions) should follow the i18n pattern established in the codebase. The UI itself doesn't need to be multi-language in v1, but the data model should be ready.
