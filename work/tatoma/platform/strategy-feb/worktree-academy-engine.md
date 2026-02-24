# Worktree Brief: Academy Engine + Certificates + Analytics Tracking

**Roadmap ID:** Sprint 2 (Learn v1)
**Priority:** P0 | **Workstream:** Studio Experience
**Status:** Ready for implementation analysis
**Design doc:** [Learn v1 Design](./learn-v1-design.md) (v7)
**Depends on:** Use Case Generator (implemented), Prompt Library (shipped)

### Version History

| Version | Date | Changes |
|---------|------|---------|
| v1 | 2026-02-24 | Initial brief — Academy engine, certificate generation, analytics dashboard. Completion-based progress (no graded assessments). |
| **v2** | **2026-02-24** | **Revised per Israel's feedback: "Learn" is the new sidebar destination (current "Learn" becomes "Resources"). Exercises use a simple built-in prompt runner (not the library). Certificates are HTML-rendered on web (no PDF export for v1). Analytics = tracking only, no dashboard yet. Feature flag = "feature-learn". Added module content pointers. i18n-ready throughout.** |

---

## The Core Idea

The Use Case Generator gets employees to discover and try AI use cases. But discovery alone doesn't build lasting capability — employees need structured learning to go from "I tried a prompt once" to "I understand how to work with AI effectively."

The Academy Engine is the structured learning layer. It serves one learning path in v1 ("AI Foundations" — 6 modules), but is built to support multiple paths later. Each module follows a concept → exercise → done pattern. No quizzes, no scores — completing the hands-on exercise is what unlocks the next module. Finish all 6, get a certificate.

The certificate matters more than it might seem. For employees, it's proof of a new skill — something they can share. For TLs, it's a measurable adoption metric: "X% of our employees are now AI-certified." For the platform, certificates create a completion incentive that pure "read the article" modules don't.

---

## What This Is (and Isn't)

This IS:
- A learning path system that renders markdown content, tracks exercise completion, and issues certificates
- Completion-based: do the exercise, move on. No graded assessments.
- A certificate system that renders on the web (HTML) with public verification URLs
- Comprehensive event/progress tracking so we can build analytics later
- An employee progress dashboard showing personal learning status
- Built to support multiple learning paths later, but ships with one (AI Foundations)

This is NOT:
- A full LMS (no SCORM, no xAPI, no third-party content import)
- A video hosting platform (external embeds for now)
- A content authoring tool (content is authored in Workbench as markdown, or via migration)
- A gamification system (no points, badges, leaderboards)
- An assessment engine (no quizzes, no scoring, no pass/fail)
- A PDF certificate generator (v1 is HTML only — PDF export comes later)
- An analytics dashboard (v1 tracks everything, dashboard comes later)

---

## Part 1: Navigation Change

### The Sidebar Rename

The current "Learn" destination in the Academy app sidebar becomes **"Resources"** — it keeps all its existing content (learning resources, links, curated materials). Nothing is removed or replaced.

The **new "Learn" destination** is the learning path system built in this worktree. This is where employees find AI Foundations, track their progress, and earn certificates.

```
Academy sidebar (after this change):
├── Learn          ← NEW: learning paths, modules, progress, certificates
├── Resources      ← RENAMED: current "Learn" content (resources, links)
├── Discover       ← Use Case Generator (already implemented)
└── [other existing sections]
```

This is a rename + addition, not a replacement. Existing functionality stays intact under the new "Resources" label.

---

## Part 2: Learning Path & Module System

### Data Model

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
  exercise_prompt_template text  -- nullable, the prompt text for prompt_execution exercises
  exercise_prompt_variables jsonb -- nullable, variable definitions for the exercise prompt
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

- **`prompt_execution`**: Shows the exercise description + a **built-in prompt runner** embedded directly in the exercise section. This is NOT a redirect to the prompt library — it's a simple, self-contained prompt execution UI within the module page. The employee fills in variables, runs the prompt, sees the result, and the exercise is automatically marked complete when they execute. Details in Part 3 below.

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

## Part 3: Exercise Prompt Runner

### Why Not the Prompt Library?

Sending the employee to the prompt library to run an exercise prompt breaks the learning flow. They'd leave the module, navigate to a different section, run a prompt in a different context, and somehow need to come back. The continuity of "read → try → done → next" is lost.

Instead, `prompt_execution` exercises have a **simple, built-in prompt runner** embedded directly in the module page. Think of it as a lightweight version of the prompt execution experience, scoped to the exercise context.

### What the Employee Sees

Within the exercise section of a module page:

1. **Exercise description** — what to do and why (from `exercise_prompt`)
2. **Variable inputs** — if the exercise prompt has variables (e.g., `{{email_topic}}`, `{{your_data}}`), show input fields for each. Variable definitions come from `exercise_prompt_variables`.
3. **"Run" button** — executes the prompt with the filled variables
4. **Result area** — shows the AI output inline, below the prompt runner
5. **"Mark as Done" button** — appears after execution. Employee confirms they've reviewed the result.

The prompt runner is minimal:
- No save-to-library flow (that's the library's job)
- No version history or comments
- No AI refinement
- Just: fill variables → run → see result → done

### Technical Approach

The prompt runner follows the same AI integration pattern as the Prompts app (same provider, same API patterns). The prompt text and variables are stored on the module record (`exercise_prompt_template` + `exercise_prompt_variables`), not in the prompt library.

The implementation details of this runner should be determined during implementation — the worktree describes the UX and data, not the exact component architecture. The key requirement is: **the employee never leaves the module page to complete the exercise.**

### Fallback

If the AI call fails, show an error message and fall back to self-report: "Something went wrong. You can still complete this exercise manually and click 'Mark as Done' when you're finished."

---

## Part 4: Module Content Pointers

Content is authored by co-founders in Sprint 3. But the worktree should give Claude Code enough context to build meaningful placeholder content and to understand what the exercises need to support. Here's what each module covers:

### Module 1: What AI Actually Does (and Doesn't)

Builds the right mental model for LLMs. Not magic, not a search engine — a language tool that's exceptionally good at some things and unreliable at others. Covers what AI excels at (drafting, summarizing, brainstorming, reformatting, pattern-matching in text) and what it's bad at (factual accuracy, math, recent events, nuance, confidential reasoning). The goal is to prevent both over-trust and dismissal. After this module, the employee knows where to point AI and where not to bother.

**Exercise (prompt_execution):** "Ask an AI to do two things: rewrite a short paragraph of yours in a more professional tone (something it's great at), then ask it to calculate a specific business metric from raw numbers (something it's unreliable at). Compare the quality of both outputs." The exercise prompt should include both tasks with variable slots for the employee's own paragraph and numbers.

### Module 2: Your First Useful Prompt

The anatomy of an effective prompt: role, context, task, format. Shows the concrete difference between "write me an email" (vague) and a structured prompt with context, audience, and format instructions (specific). Introduces the idea that what you put in determines what you get out — the first touchpoint with the "honest expectations" principle that runs through the whole platform.

**Exercise (prompt_execution):** "Take a real email you need to write this week. Use this structured prompt template to draft it — fill in who it's for, what you need to say, and what tone to use. Compare the output to how you'd normally write it." Template has variables for recipient, purpose, key points, and tone.

### Module 3: Prompt Patterns That Work

Introduces the four main prompt patterns employees will use daily: the rewriter (improve existing text), the summarizer (condense long content), the analyst (extract insights from data), and the brainstormer (generate options and ideas). Explains when to use each and how to iterate. Emphasizes that the first output is a starting point — iteration with more context makes it better.

**Exercise (prompt_execution):** "Pick one recurring task from your week. Choose the prompt pattern that fits best (we'll give you all four to try). Run it with your real data. Save the result if it's useful — this could become a prompt you reuse." Offers a multi-pattern template where the employee selects which pattern to try.

### Module 4: Finding AI Use Cases in Your Work

The "AI lens" — teaches employees to spot tasks in their daily work that have high AI potential. Signals: repetitive writing, summarizing long documents, reformatting content between formats, analyzing text for patterns, generating options or alternatives. Connects directly to the Use Case Generator they may have already used. Reinforces that the best use cases are personal and specific, not generic.

**Exercise (self_report):** "Map your typical work week. For each day, list 2-3 tasks you spend the most time on. Star the ones that match the AI signals from this module. Then open the Use Case Generator and explore at least 2 of your starred tasks." This exercise bridges to the Discover section — it's self-reported because the action happens across multiple parts of the platform.

### Module 5: Working With AI as a Partner

Shifts the frame from "AI does my work" to "AI is my starting point." Covers the review-and-refine workflow: generate a draft → evaluate what's good and what's missing → add your expertise (context, judgment, institutional knowledge) → iterate. The 80/20 insight: AI handles 80% of the structural/repetitive work, you add the 20% that requires your brain. Honest about when AI output is good enough as-is and when it needs significant rework.

**Exercise (prompt_execution):** "Take something you're actually working on — a document, report, email, or plan. Don't start from scratch with AI. Instead, paste your existing draft and ask AI to improve it: better structure, clearer language, missing sections. Track what the AI changed and what you'd change back." Template has variables for the draft content and improvement instructions.

### Module 6: Building Your AI Toolkit

Pulling it all together. Reviews what they've learned across modules 1-5 and focuses on building a sustainable practice: how to maintain and grow a personal prompt library, how to share useful prompts with colleagues, how to keep evaluating new use cases as work evolves. The key message: the difference between "tried AI once" and "uses AI daily" is having a personal toolkit that grows with you. Ends with a forward-looking note about AI evolving and the importance of staying curious.

**Exercise (self_report):** "Set up your personal AI toolkit: confirm you have at least 3 saved prompts in your library (refined with your context), at least 2 use cases you've tried, and write a one-sentence note about what type of context made the biggest difference in your results. This is your starting kit." Self-reported because it's a portfolio check across the platform.

---

## Part 5: Certificate System

### When a Certificate is Issued

An employee completes all modules in a learning path (all `exercise_completed_at` timestamps set) → the system automatically creates a certificate record.

### Certificate Data Model

```
certificates (
  id                uuid PK
  user_id           uuid FK → users
  path_id           uuid FK → learning_paths
  organization_id   uuid FK → organizations
  employee_name     text          -- snapshot at time of issue
  path_title        text          -- snapshot at time of issue
  org_name          text          -- snapshot at time of issue
  issued_at         timestamptz
  verification_code text UNIQUE   -- short URL-safe code (e.g., "TAT-AF-8x7k2m")
  created_at        timestamptz
)
```

**Why snapshot `employee_name`, `path_title`, and `org_name`?** If any of these change later, the certificate should still show what it said when issued.

### Certificate Rendering (HTML)

**v1 is HTML only — no PDF generation or export.** The certificate is a rendered web page, not a downloadable file.

**Employee sees their certificate at:** `Studio > Learn > Certificates > [certificate_id]`

This page renders a professional, branded certificate using the existing Tatoma brand kit (colors, logo, fonts from the codebase). It should look like a certificate — clean, formal, shareable.

**Content on the certificate page:**
- Tatoma logo
- "Certificate of Completion"
- Employee name
- Path title ("AI Foundations")
- Organization name
- Date of completion
- Verification code
- A brief description: "Has completed the AI Foundations learning path, demonstrating practical AI skills for the workplace."

**Sharing:** The certificate page URL is shareable. When someone opens the link, they see the certificate (no auth required for the verification view).

### Public Verification Page

The verification URL resolves to a simple public page (no auth required) that confirms:
- Certificate is valid
- Employee name
- Path title
- Organization name
- Date of completion

This can be the same rendered certificate page, or a simpler verification-only view. The key: no auth wall, so LinkedIn links and shared URLs work for anyone.

**Route:** A public route like `/verify/[code]`.

---

## Part 6: Analytics Tracking (No Dashboard Yet)

### Philosophy: Track Everything, Dashboard Later

v1 does NOT include an analytics dashboard. But it tracks all the events and data needed to build one later. The priority is making sure no data is lost — we can always build views on top of existing data, but we can't retroactively track events that weren't captured.

### What to Track

All tracking should use whatever event/logging pattern already exists in the codebase. If there's no event system, the data already lives in the tables — just ensure timestamps and status fields are always populated.

**Employee activity events (ensure these are tracked with timestamps):**
- Account created / onboarded (with department, role)
- Login / session start
- Module started (first open)
- Exercise completed (with exercise_type: self_report or prompt_execution)
- Module completed
- Path completed
- Certificate issued
- Use case discovered / tried / adopted / dismissed (already tracked by Use Case Generator)
- Prompt created / saved / run (already tracked by Prompt Library)

**The data for all metrics listed in the design doc (registration, activation, completion rates, department breakdown, etc.) should be derivable from the existing tables and these events.** We'll build the dashboard to query this data in a future sprint.

### What NOT to Build

- No `org_analytics_cache` table for v1 — no pre-computation
- No daily aggregation job
- No dashboard UI in Workbench
- No charts, metrics pages, or reporting

These come later when we have real data and know which views TLs actually need.

---

## Part 7: Employee Progress Dashboard

### What the Employee Sees

The employee's "Learn" page shows their personal progress:

**Learning path card:**
- Path title + description
- Progress bar: X of 6 modules completed
- Current module: "[Module title] — Continue →"
- Estimated time remaining
- Certificate status: "Not started" | "In progress (X/6)" | "Completed ✓ — View certificate"

**Module list:**
- All modules listed in order
- Each shows: title, estimated time, status icon (locked / available / completed)
- Clicking an available or completed module opens it
- Clicking a locked module shows a tooltip: "Complete [previous module] first"

**For v1, there's only one learning path.** The UI should handle multiple paths (loop/list), but we only seed one. The "Paths" list is just a single card. Don't over-design for multiple paths — just make sure the data model and rendering support it.

---

## Part 8: Routes & Navigation

### Employee-facing (Studio / Academy app)

- `Academy > Learn` — learning dashboard (path cards, progress) ← NEW sidebar destination
- `Academy > Learn > [path_id]` — path overview (module list, progress bar)
- `Academy > Learn > [path_id] > [module_id]` — module page (content, exercise with built-in runner, navigation)
- `Academy > Learn > Certificates` — list of earned certificates
- `Academy > Learn > Certificates > [certificate_id]` — individual certificate view (shareable)
- `Academy > Resources` — current "Learn" content, renamed ← RENAMED from "Learn"

### TL/Consultant-facing (Workbench)

- `Workbench > Academy > Paths` — manage learning paths (edit, publish/unpublish)
- `Workbench > Academy > Modules` — manage modules within paths (edit content, reorder)

### Public

- `/verify/[code]` — certificate verification page (no auth)

---

## Part 9: Graceful Degradation

| Failure | Fallback |
|---------|----------|
| **Module content empty** | Show exercise section only with a "Content coming soon" message. Module is still completable via exercise. |
| **Video embed fails to load** | Show the rest of the module content normally. Video is supplementary, not blocking. |
| **Exercise prompt runner AI call fails** | Fall back to self-report: show error message + "Mark as Done" button. Employee can complete the exercise manually. |
| **No learning paths published** | "Learn" section shows a "Coming soon" state. Don't hide the navigation entry — employees should see it exists. |
| **Employee has no department set** | Learning experience is unaffected. Department field is nullable in tracking. |

---

## Part 10: What's Explicitly Out of Scope

- **Multiple learning paths** — the system supports them in the data model, but v1 ships with one (AI Foundations). No path selection UI needed beyond a single card.
- **Content authoring WYSIWYG** — markdown text area in Workbench is sufficient
- **LMS integration (SCORM/xAPI)** — not needed for v1 scale
- **Video hosting** — external embeds only (YouTube, Vimeo, Loom)
- **Gamification** — no points, badges, leaderboards, streaks
- **Email notifications** — no "you haven't logged in" or "new module available" emails in v1
- **Analytics dashboard** — no dashboard, no charts, no aggregation. Just track the data.
- **PDF certificate export** — v1 is HTML only. PDF generation comes later.
- **Assessment engine** — no quizzes, no scoring, no question banks. Completion-based only.
- **Module content** — the Academy Engine is the system. Content is authored by co-founders in Sprint 3 and loaded into the system. This worktree is about the engine, not the content.
- **Prompt library integration for exercises** — exercises use a built-in prompt runner, not the prompt library. The exercise prompt execution is self-contained within the module page.

---

## Part 11: Success Criteria

| Metric | Target | How to measure |
|--------|--------|----------------|
| Module rendering works correctly | All 6 modules render markdown + exercises without layout issues | Manual QA |
| Self-report exercises track completion | Clicking "Mark as Done" updates `exercise_completed_at` | Automated test |
| Prompt runner exercises work end-to-end | Fill variables → run → see result → mark done, all within the module page | Manual QA |
| Module locking works | Can't skip ahead; completing exercise unlocks next module | Automated test |
| Certificate created on path completion | Record created with verification code when last exercise is completed | Automated test |
| Certificate page renders correctly | Branded certificate visible at certificate URL, matching Tatoma brand kit | Manual QA |
| Verification URL works publicly | Public page loads without auth and shows correct certificate data | Automated test |
| Sidebar rename works | "Learn" shows new learning paths, "Resources" shows old content | Manual QA |
| All progress events are tracked | Every status/timestamp field is populated at the right moment | Automated test |

---

## Implementation Notes for Claude Code

1. **Where does this live?** — This is a set of **new routes in the Academy app**. The key navigation change: the current "Learn" sidebar item becomes **"Resources"** (keeping all its existing content). The **new "Learn"** sidebar item points to the learning path system. This is a rename + addition — nothing is removed.

2. **Module content is not in this worktree** — the `content_md` fields will be empty or have placeholder text. The system needs to work with empty/placeholder content gracefully. Real content is loaded in Sprint 3. Use the module content pointers (Part 4) to generate meaningful placeholder content for testing.

3. **Exercise prompt runner** — `prompt_execution` exercises need a **simple, built-in prompt runner embedded in the module page**. This is NOT a redirect to the prompt library. The employee fills variables, runs the prompt, sees the output, and marks the exercise done — all without leaving the module. Follow the same AI integration pattern as the Prompts app for the execution itself, but the UI is a lightweight inline component. If prompt execution is complex to build, fall back to `self_report` for all exercises in v1 — the system should work either way. The details of this runner can be refined during implementation.

4. **Certificate = HTML, not PDF** — v1 certificates are rendered web pages, not generated PDFs. Look at existing Tatoma brand assets in the codebase (logo, colors, fonts) and build a professional-looking certificate page. No file generation, no storage URL — just a rendered page at a route. The `pdf_url` field from the original design is not needed for v1.

5. **Analytics = tracking only** — do NOT build an analytics dashboard, aggregation job, or `org_analytics_cache` table. Just ensure all progress events are tracked with timestamps in the existing tables (`employee_progress`, `personal_use_cases`, prompt library tables). We'll build views on this data later.

6. **Feature flag** — the feature flag name is **`feature-learn`**. The new "Learn" sidebar destination and all learning path routes should respect this flag (per-org or per-department toggle). The "Resources" rename should happen regardless of the feature flag — it's a naming cleanup.

7. **Current "Learn" → "Resources"** — this is a sidebar rename in the Academy app. The existing page, content, and routes stay the same, just under the new "Resources" label. Ensure no existing links or bookmarks break — if the URL changes, add a redirect.

8. **Multi-language preparation** — all seed data (path titles, module titles, descriptions, exercise prompts) should follow the i18n pattern established in the codebase (same approach as starter packs and department templates). The UI itself doesn't need to be multi-language in v1, but the data model and seed structure should be ready so we can localize later without painful migrations.
