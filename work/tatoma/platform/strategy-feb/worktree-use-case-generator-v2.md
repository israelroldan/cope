# Worktree Brief: Personal Use Case Generator

**Roadmap ID:** Q1-08
**Priority:** P0 | **Workstream:** Studio Experience
**Status:** Ready for implementation analysis
**Design doc:** [Learn v1 Design](./learn-v1-design.md) (v4)
**Pattern reference:** Guided Achievement Engine (behavioral pipeline architecture)

### Version History

| Version | Date | Changes |
|---------|------|---------|
| v1 | 2026-02-24 | Initial brief — feature scope, user flow, data model, AI specs |
| **v2** | **2026-02-24** | **Rewritten with behavioral pipeline architecture. Added: failure mode mapping per phase, discriminated AI response types, context accumulation pattern, scaffolding fields for use case cards, "Try It" activation flow, post-trial reflection, re-engagement loop, server-side guardrails, graceful degradation spec.** |

---

## The Core Idea

Most corporate AI adoption fails at the same point: the gap between "AI could help your work" and actually using it. An employee hears about AI, maybe tries ChatGPT once, gets a mediocre result, and concludes "AI isn't for me." The problem isn't the AI — it's that nobody helped them connect AI to *their specific daily work*.

The Personal Use Case Generator closes this gap through a five-phase pipeline:

```
Vague Awareness → Specific Tasks → Scored Opportunities → Equipped Use Cases → Tried & Adopted → Re-engagement
```

Each phase solves a specific behavioral failure mode:

| Phase | Failure Mode It Solves |
|-------|----------------------|
| 1. Role & Task Discovery | "I don't know what AI could help with in my job" |
| 2. Pain Point Scoring | "I can't tell which tasks are worth trying AI for" |
| 3. Use Case Generation | "I have a vague idea but don't know what to actually DO" |
| 4. Try It (Activation) | "I found a use case but never actually tried it" |
| 5. Reflect & Re-engage | "I tried it once but didn't build it into my workflow" |

Remove any phase and the pipeline breaks. Without task discovery, employees get generic "101 AI use cases" lists. Without scoring, they pick the wrong tasks and get disappointing results. Without scaffolding, they have ideas but no action plan. Without activation links, use cases sit in a library untouched. Without re-engagement, one-time discovery doesn't become a habit.

---

## What This Is (and Isn't)

This IS:
- A guided wizard where AI participates at each step — not a form that dumps results at the end
- Personal and specific ("you, a benefits coordinator who spends 3 hours on enrollment questions")
- Connected to the org's context (industry, department, strategic priorities)
- Linked bidirectionally to the shipped prompt library
- The primary "hook" of the Learn experience — designed to create an "aha moment" within 10 minutes

This is NOT:
- The Transformation OS execution-level use case generator (which is strategic, for TLs)
- A free-form chat interface
- A generic "101 AI use cases" list
- A one-time discovery tool — the re-engagement loop brings employees back

---

## Phase 1: Role & Task Discovery

**Failure mode it solves:** "I don't know what AI could help with in my job"

### What the Employee Sees

- "Let's find AI use cases for your work"
- Department (pre-filled from profile if available)
- Role/title (pre-filled from profile if available)
- "Describe what you do day-to-day" (free text, 2-3 sentences)

### What AI Does (Task Suggestion)

Based on role + department + org context, AI returns a **discriminated response type**:

```
TaskSuggestionResponse {
  type: "task_suggestions"
  tasks: [
    {
      task: string          // specific, actionable ("Writing social media posts")
      category: string      // grouping ("Content Creation")
      ai_potential: string  // brief hint ("AI is great at drafting and variants")
    }
  ]  // 5-8 items
  context_used: {
    industry: string | null
    department: string | null
    org_priorities: string[] | null
  }
}
```

**Example:** For "Marketing Coordinator" at a financial services company:
- "Writing social media posts" (Content Creation) — "AI is great at drafting and variants"
- "Creating campaign performance reports" (Analysis) — "AI excels at summarizing data into narratives"
- "Reviewing content for brand guideline compliance" (Quality) — "AI can check against rules"
- "Summarizing market research documents" (Research) — "AI is built for summarization"
- "Drafting email newsletter copy" (Content Creation) — "AI can generate drafts from bullet points"
- "Preparing meeting agendas and notes" (Productivity) — "AI handles structure and formatting well"

### What the Employee Does

- Confirms which suggested tasks they actually do (checkboxes)
- Can **add** their own tasks not in the list
- Can **edit/reword** any suggestion to match their reality
- Can **remove** irrelevant suggestions

### Context Accumulation

The full state from this step is preserved and carried forward:

```
WizardState {
  step: 1
  role: string
  department: string
  day_to_day: string
  selected_tasks: Task[]      // confirmed + added + edited
  org_context: OrgContext      // industry, priorities (injected server-side)
}
```

This state grows with each step. The AI at Step 2 and Step 3 receives the FULL accumulated context — never dropping earlier selections.

### Org-Context Enrichment

The generator pulls available context to make suggestions more relevant. This is **best-effort** — if no org context exists, the wizard works purely on employee input.

**What to pull (if available):**
- **Industry** — from organization profile. "Marketing Coordinator at a bank" ≠ "Marketing Coordinator at a media agency"
- **Department templates** — pre-built task/use case suggestions by department (seed data). These prime Step 1's suggestions
- **Org priorities** — winning moves or strategic themes from the Transformation OS subtly weight suggestions (e.g., "customer experience" as a priority → prioritize customer-facing use cases)

**What NOT to pull:**
- Other employees' personal data
- Confidential strategic content employees shouldn't see
- TL-level or consultant-level information

---

## Phase 2: Pain Point Scoring

**Failure mode it solves:** "I can't tell which tasks are worth trying AI for"

### What the Employee Sees

The tasks they selected/added from Step 1, now as scorable cards:

For each task:
- **Time estimate**: "How much time per week?" — `< 1h` | `1-3h` | `3-5h` | `5h+`
- **Pain point** (optional): "What's frustrating about it?" — free text (e.g., "repetitive", "formatting takes forever", "I always forget details")

### What AI Does (Opportunity Analysis)

AI receives the full wizard state (role, department, tasks with time + pain points, org context) and returns:

```
OpportunityAnalysisResponse {
  type: "opportunity_analysis"
  ranked_tasks: [
    {
      task: string
      time_estimate: string
      pain_point: string | null
      ai_opportunity_score: "high" | "medium" | "low"
      ai_opportunity_reason: string    // 1 sentence explaining WHY this task has AI potential
      ai_strength_match: string[]      // which AI capabilities apply ("summarization", "drafting", "analysis")
    }
  ]  // sorted by opportunity score desc
}
```

**The scoring heuristic** (encoded in the prompt, not hardcoded):
- Language-heavy tasks score higher (writing, summarizing, reformatting, analyzing text)
- High time investment + repetitive = high score
- Pain points matching AI strengths ("takes forever to format" + formatting = high)
- Tasks requiring judgment/relationship/physical presence score lower
- Org priorities boost score for aligned tasks

**What the employee sees from this:** Not the raw scores, but a reordering. The tasks reshuffle to show highest-opportunity first, with a brief "why AI can help" note per task. This builds anticipation for Step 3.

### Server-Side Guardrail

If the AI returns fewer than 3 tasks scored "high" or "medium", the server supplements with department template matches. The employee should always see at least 3 promising opportunities — never a discouraging "AI can't help much with your work."

---

## Phase 3: Use Case Generation

**Failure mode it solves:** "I have a vague idea but don't know what to actually DO"

This is where the Guided Achievement Engine's scaffolding pattern applies directly. A use case without activation scaffolding is just another item on a list. The scaffolding is what makes it actionable.

### The Use Case Card — Discriminated Response Type

AI receives the full accumulated wizard state and generates 3-5 use case cards. Each card is a **structured, validated type** — not free-form text:

```
UseCaseCard {
  type: "use_case"
  title: string               // action-oriented verb + object ("Automate your weekly campaign report")
  description: string         // 2-3 sentences, specific to THIS person's context
  original_task: string       // which task from Step 1 this maps to
  estimated_time_savings: string  // per week ("~2 hours/week")
  difficulty: "easy" | "medium" | "advanced"

  // --- Scaffolding fields (the behavioral architecture) ---
  tiny_start: string          // the absolute smallest first step, < 2 minutes
  done_looks_like: string     // observable outcome when you've tried this
  obstacle_plan: string       // "If it doesn't work well —" specific next action
  example_before_after: {     // concrete before/after showing the transformation
    before: string            // "You currently write the report by..."
    after: string             // "With AI, you'd paste your data and get..."
  }

  // --- Prompt library integration ---
  matched_prompt: {
    id: string
    title: string
    match_confidence: "high" | "medium"
  } | null                    // null if no good match exists
  suggested_prompt: string | null  // AI-generated starter prompt if no match
  suggested_variables: string[] | null  // variables for the prompt builder
}
```

### Scaffolding Field Specifications

Each field has strict quality rules enforced in the prompt:

#### `tiny_start` — Defeating Activation Energy
> "The smallest possible first action to try this use case, achievable in under 2 minutes"

**Good:** "Open ChatGPT, paste last week's campaign data, and ask it to summarize the top 3 trends"
**Bad:** "Think about how you could use AI for reporting" (meta, not action)
**Bad:** "Set up a workflow" (too vague, too big)

**Validation rule:** Must be a concrete, physical action. Must reference a specific tool or step. Must be completable without preparation.

#### `done_looks_like` — Observable Completion
> "What tangible result exists when you've successfully tried this use case"

**Good:** "A draft campaign report generated in 5 minutes instead of your usual 45"
**Bad:** "You feel more productive" (feeling, not artifact)
**Bad:** "AI helps with your report" (restates the use case, doesn't describe the outcome)

**Validation rule:** Must describe an observable artifact or measurable result, not a feeling or restatement.

#### `obstacle_plan` — Preemptive Friction Removal
> "A specific strategy for the most likely obstacle, starting with 'If it doesn't work well —'"

**Good:** "If it doesn't work well — try giving more context: paste an example of a good report you wrote manually, and ask AI to follow that format"
**Bad:** "If it doesn't work — try again" (useless)
**Bad:** "If it doesn't work — ask your IT department" (passes the buck)

**Validation rule:** Must be a specific problem-solving strategy the employee can try immediately, not generic advice or an escalation.

#### `example_before_after` — Making It Concrete
> "A specific before/after comparison showing what changes when AI is applied to this task"

This field makes the abstract concrete. Employees don't trust "AI can help with your reports" — they trust "you currently spend 45 minutes pulling numbers and writing paragraphs; with AI, you paste the data and get a draft in 5 minutes that you edit for 10."

### Prompt Library Matching

When generating use case cards, the AI also receives a summary of the org's prompt template library (titles + descriptions + categories). For each use case, it attempts to match:

**Auto-link (high confidence):** The use case card shows `"Try with [Template Name] →"` — clicking opens that template with variables contextually pre-filled where possible.

**Auto-link (medium confidence):** The card shows `"Related: [Template Name]"` — available but not the primary CTA.

**No match:** The card shows `"Create a prompt for this →"` — clicking opens the prompt builder pre-filled with:
- The `suggested_prompt` from the AI
- `suggested_variables` pre-identified
- The use case linked as source

**After creation:** Bidirectional link. The use case card updates to show "Prompt created" with a direct link. The prompt shows "Created from use case: [title]".

### What the Employee Can Do with Results

- **Save** use cases to personal library (individual or "save all")
- **Dismiss** ones that don't fit ("not relevant to me")
- **Ask for more:** "These don't quite fit" → provide additional context → AI generates 2-3 alternatives using full accumulated state + the feedback
- **Edit** any field (title, description) before saving — the AI's suggestion is a starting point, not final

### Server-Side Guardrails

1. **Minimum 3 use cases:** If AI returns fewer than 3, server requests a second generation with relaxed criteria. The employee should always see meaningful results.

2. **Maximum 1 "more suggestions" round:** The follow-up is limited to one additional generation per session. After that: "You've explored a lot — save the ones that resonate and come back anytime to discover more." This prevents infinite loops.

3. **Scaffolding validation:** Server-side check that `tiny_start` contains an action verb, `done_looks_like` doesn't contain feeling words ("feel", "sense", "experience"), `obstacle_plan` starts with "If". If validation fails, the card is still shown but the failing field is regenerated with a focused prompt.

4. **Fallback on AI failure:** If the AI call fails entirely, the server generates use case cards from the department templates table, mapped to the employee's selected tasks. Less personalized but never a dead end.

---

## Phase 4: Try It (Activation)

**Failure mode it solves:** "I found a use case but never actually tried it"

Discovery without action is worthless. This phase ensures use cases don't just sit in a library.

### The Activation Flow

When an employee clicks "Try it" on a use case card:

**If linked to an existing prompt template:**
1. Opens the prompt template in the prompt library
2. Variables are pre-filled with context from the use case where possible
3. The use case's `tiny_start` is shown as a banner: "Start here: [tiny_start]"
4. The `done_looks_like` is shown as a subtle footer: "You're done when: [done_looks_like]"

**If "Create a prompt for this":**
1. Opens the prompt builder
2. Pre-fills with the AI-generated `suggested_prompt`
3. Pre-identifies `suggested_variables`
4. Same `tiny_start` and `done_looks_like` banners
5. On save, creates the bidirectional link

**If the employee just wants to try manually (no prompt link):**
1. The use case detail view shows all scaffolding fields prominently
2. `tiny_start` at the top: "Your first step →"
3. `obstacle_plan` accessible: "If you get stuck →"
4. A "Mark as Tried" button becomes available

### Status Transitions

```
Discovered ──→ Tried ──→ Adopted
     │                       │
     └──→ Dismissed          └──→ Dismissed (changed mind)
```

- **Discovered → Tried:** Employee clicks "Mark as Tried" or completes a prompt run linked to this use case
- **Tried → Adopted:** Employee manually marks as "I use this regularly now" (or: the linked prompt has been used 3+ times)
- **Any → Dismissed:** Employee clicks "Not for me" at any stage

---

## Phase 5: Reflect & Re-engage

**Failure mode it solves:** "I tried it once but didn't build it into my workflow"

### Post-Trial Reflection

When an employee marks a use case as "Tried", they see a lightweight reflection:

**Effort assessment (required):** "How was it?"
- `Easy` | `About right` | `Took effort`

**Result assessment (required):** "Was the result useful?"
- `Very useful` | `Somewhat useful` | `Not useful`

**Note (optional):** "Anything you'd change about how you used it?"

### The Two-Axis Assessment

Like the Guided Achievement Engine, separating effort from result quality creates a 2x3 matrix with actionable signal:

```
                Easy    About Right    Took Effort
Very useful  |   ✓    |      ✓       |     ✓      |  "Took effort but very useful" = learning, keep going
Somewhat     |   ✓    |      ✓       |     ✓      |  "Easy but only somewhat" = try a harder version
Not useful   |   ✓    |      ✓       |     ✓      |  "Took effort and not useful" = wrong use case or needs better prompt
```

This data feeds:
- **The employee:** "Your easiest wins are [X] and [Y]" — highlight adopted use cases by effort/result
- **The TL analytics:** Aggregated effort/result distributions across the org
- **Future suggestions:** When the employee re-runs the generator, the AI sees which previous use cases worked (result = very useful) and which didn't, adjusting accordingly

### Re-engagement Loop

The generator is not a one-time tool. Re-engagement happens through:

**Nudge triggers (for the nudge system, not built in this worktree but designed for):**
- Employee has 3+ use cases in "Discovered" status with none "Tried" after 2 weeks → nudge: "You discovered some great use cases — ready to try one? Start with [highest-scored use case title]"
- Employee has 2+ "Tried" use cases with high result scores but not "Adopted" → nudge: "You found [title] very useful — make it part of your routine?"
- 30 days since last generator run → nudge: "Your work changes — discover new AI use cases"

**Re-run behavior:**
- When the employee re-runs the wizard, their profile (role, department) is pre-filled
- The AI receives their previous use cases (titles + statuses + ratings) to avoid repeating and to build on what worked
- Previous "Dismissed" use cases are excluded from new suggestions
- Previous "Adopted" use cases inform the AI about what this employee responds to

---

## Data Model

### New table: `personal_use_cases`

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | PK |
| `user_id` | uuid | FK to users |
| `organization_id` | uuid | FK to organizations |
| `session_id` | uuid | FK to use_case_sessions |
| `title` | text | AI-generated, editable by employee |
| `description` | text | What AI can do for this task |
| `task_description` | text | The employee's original task from Step 1 |
| `ai_suggestion` | jsonb | Full AI response payload (audit trail) |
| `estimated_time_savings` | text | e.g., "~2 hours/week" |
| `difficulty` | text | easy / medium / advanced |
| `tiny_start` | text | Scaffolding: smallest first action |
| `done_looks_like` | text | Scaffolding: observable completion |
| `obstacle_plan` | text | Scaffolding: "If it doesn't work well —" |
| `example_before` | text | Scaffolding: how the task is done today |
| `example_after` | text | Scaffolding: how it looks with AI |
| `status` | text | discovered / tried / adopted / dismissed |
| `effort_rating` | text | nullable: easy / about_right / took_effort |
| `result_rating` | text | nullable: very_useful / somewhat_useful / not_useful |
| `reflection_note` | text | nullable: free text after trying |
| `linked_prompt_id` | uuid | nullable, FK to prompt templates |
| `shared` | boolean | default false |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

### New table: `department_templates`

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | PK |
| `department` | text | HR, Marketing, Finance, etc. |
| `title` | text | Template use case title |
| `description` | text | What this use case is about |
| `common_tasks` | jsonb | Array of typical tasks for this dept (seeds Step 1) |
| `prompt_template_id` | uuid | nullable, FK to existing prompt template |
| `difficulty` | text | easy / medium / advanced |
| `created_at` | timestamptz | |

### New table: `use_case_sessions`

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | PK |
| `user_id` | uuid | FK to users |
| `organization_id` | uuid | FK to organizations |
| `wizard_state` | jsonb | Full accumulated state across all steps |
| `step` | integer | Current step (1, 2, or 3) |
| `completed` | boolean | Whether the wizard was completed |
| `use_cases_generated` | integer | Count of use cases returned |
| `use_cases_saved` | integer | Count of use cases the employee saved |
| `created_at` | timestamptz | |
| `completed_at` | timestamptz | nullable |

The session table enables: resume interrupted wizards, analytics on completion/drop-off rates per step, and context for re-runs.

---

## AI Behavior Specification

**Provider:** Groq (existing integration in `@tatomahq/agents`)

### Response Types (Discriminated Union)

Every AI call in the wizard returns one of three typed responses:

```
WizardAIResponse =
  | TaskSuggestionResponse    // Step 1: role → suggested tasks
  | OpportunityAnalysisResponse  // Step 2: tasks + pain → ranked opportunities
  | UseCaseCardsResponse      // Step 3: opportunities → scaffolded use case cards
```

Each response type has a strict schema. The server validates the AI output against the schema and rejects/retries malformed responses. This makes the system predictable and testable despite using generative AI.

### Prompt Structure

Each step's prompt follows the same pattern:

```
<system>
You are Tatoma's AI use case discovery engine. You help employees find
specific, actionable AI use cases for their daily work.

[Step-specific instructions and field quality rules]
[Negative examples for scaffolding fields]
</system>

<context>
<organization>
  <industry>{industry}</industry>
  <department>{department}</department>
  <priorities>{winning_moves if available}</priorities>
</organization>

<employee>
  <role>{role}</role>
  <daily_work>{day_to_day_description}</daily_work>
</employee>

<accumulated_state>
  {Full wizard state from previous steps — tasks, pain points, time estimates}
</accumulated_state>

<previous_use_cases>
  {If re-run: titles, statuses, and ratings of previous use cases}
</previous_use_cases>

<prompt_library>
  {Titles + descriptions of available prompt templates for matching}
</prompt_library>
</context>

<instructions>
{Step-specific generation instructions}
Return JSON matching the {ResponseType} schema exactly.
</instructions>
```

### Rate Limiting

- **20 wizard sessions per user per month.** Each session = one complete wizard run (Steps 1-3)
- **1 "more suggestions" follow-up per session.** After that, the employee saves what resonates and comes back later
- **AI calls are server-side only.** No client-side AI calls — all generation goes through the API with auth and rate limit checks

---

## Graceful Degradation

Every failure mode has a path forward. The system never reaches a dead end.

| Failure | Fallback |
|---------|----------|
| **AI call fails (Step 1)** | Show department template tasks directly as suggestions. Less personalized but functional. |
| **AI call fails (Step 2)** | Skip scoring, pass all tasks to Step 3 unranked. Employee still gets use cases. |
| **AI call fails (Step 3)** | Generate use case cards from department templates matched to selected tasks. Generic scaffolding from templates. |
| **No org context available** | Wizard works purely on employee input. Suggestions are role-based, not industry-specific. Slightly less relevant, still useful. |
| **No prompt library matches** | All use case cards show "Create a prompt for this" with AI-suggested starter prompt. No auto-links, but the creation path works. |
| **Prompt library query fails** | Cards show use cases without prompt links. Employee can manually browse prompts. |
| **Scaffolding validation fails** | Card shown with failing field regenerated via focused prompt. If regen also fails, field shown as-is (imperfect > missing). |
| **Wizard interrupted mid-step** | Session state persisted in `use_case_sessions`. Employee can resume from last completed step. |
| **Employee has no tasks to select (Step 1)** | "No worries — here are common tasks for [department]. Select any that apply, or describe what you do." Falls back to department templates. |

---

## Routes & Navigation

- `Studio > Discover` — section home: generator CTA + personal use case library
- `Studio > Discover > Generate` — the wizard (3 steps, resumable)
- `Studio > Discover > My Use Cases` — personal library with status filters (all / discovered / tried / adopted)
- `Studio > Discover > [use_case_id]` — individual use case detail: full description, scaffolding fields, linked prompt, status tracking, reflection

---

## What's Explicitly Out of Scope

- **Cross-org sharing** — employees can't browse other orgs' use cases
- **TL approval workflow** — use cases are personal, no approval needed
- **Transformation OS promotion** — employee use cases "bubbling up" to strategic layer is separate (Q2)
- **Gamification** — no points, badges, or leaderboards
- **Offline support** — requires connectivity for AI generation
- **Department templates authoring UI** — v1 seeds templates via migration; consultant-facing authoring is later
- **Nudge system integration** — nudge triggers are designed here but built in the nudge workstream
- **Guided execution timer** — unlike the Achievement Engine, use case "trying" happens outside the platform (in ChatGPT, Copilot, or Tatoma Cards). We track status, not execution.

---

## Success Criteria

| Metric | Target | How to measure |
|--------|--------|----------------|
| Wizard completion rate | 70%+ of those who start | `use_case_sessions` completed/total |
| Average use cases saved per session | 3+ | `personal_use_cases` count per session |
| Time to complete wizard | < 10 minutes | Session timestamps |
| Discovered → Tried conversion | 40%+ within 2 weeks | Status transitions with date math |
| Tried → Adopted conversion | 30%+ of tried | Status transitions |
| Post-trial reflection: "Very useful" | 50%+ of reflections | `result_rating` distribution |
| Employee satisfaction | "Relevant to my work" — 4+/5 | In-app survey or feedback |
| Re-run rate | 20%+ run the wizard again within 60 days | Session count per user |

---

## The Full Pipeline

```
┌──────────────────────────────────────────────────────────────────────────┐
│              PERSONAL USE CASE GENERATOR — BEHAVIORAL PIPELINE           │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  PHASE 1: ROLE & TASK DISCOVERY                                          │
│  "I don't know what AI could help with in my job"                        │
│  ┌──────────────────────────────────────────────────────────────────┐    │
│  │  Employee inputs: role, department, day-to-day description       │    │
│  │  + Org context injected: industry, priorities, dept templates    │    │
│  │  → AI suggests 5-8 tasks with AI potential hints                 │    │
│  │  → Employee confirms, edits, adds their own                      │    │
│  │  → Context accumulated in WizardState                            │    │
│  │  Fallback: department template tasks if AI fails                 │    │
│  └──────────────────────────────────────────────────────────────────┘    │
│                                │                                         │
│                                ▼                                         │
│  PHASE 2: PAIN POINT SCORING                                             │
│  "I can't tell which tasks are worth trying AI for"                      │
│  ┌──────────────────────────────────────────────────────────────────┐    │
│  │  For each task: time estimate + pain point (optional)            │    │
│  │  → AI ranks by AI opportunity (language-heavy, repetitive,       │    │
│  │    summarization, formatting → high score)                       │    │
│  │  → Tasks reorder to show highest opportunity first               │    │
│  │  → Brief "why AI can help" per task builds anticipation          │    │
│  │  Guardrail: minimum 3 "high/medium" opportunities always shown   │    │
│  │  Fallback: skip scoring, pass all tasks to Phase 3               │    │
│  └──────────────────────────────────────────────────────────────────┘    │
│                                │                                         │
│                                ▼                                         │
│  PHASE 3: USE CASE GENERATION (with scaffolding)                         │
│  "I have a vague idea but don't know what to actually DO"                │
│  ┌──────────────────────────────────────────────────────────────────┐    │
│  │  3-5 UseCaseCards, each with:                                    │    │
│  │  ┌──────────────────────────────────────────────────────────┐    │    │
│  │  │ title (action-oriented) + description (specific to them) │    │    │
│  │  │ estimated_time_savings + difficulty                       │    │    │
│  │  ├──────────────────────────────────────────────────────────┤    │    │
│  │  │ SCAFFOLDING:                                             │    │    │
│  │  │  tiny_start: "Open ChatGPT and paste last week's data…" │    │    │
│  │  │  done_looks_like: "A draft report in 5 min vs. 45"      │    │    │
│  │  │  obstacle_plan: "If it doesn't work well — add context…"│    │    │
│  │  │  before/after: concrete comparison of old vs. new way    │    │    │
│  │  ├──────────────────────────────────────────────────────────┤    │    │
│  │  │ PROMPT LINK:                                             │    │    │
│  │  │  matched_prompt → "Try with [Template Name] →"           │    │    │
│  │  │  OR suggested_prompt → "Create a prompt for this →"      │    │    │
│  │  └──────────────────────────────────────────────────────────┘    │    │
│  │  + Save / Dismiss / Ask for more (max 1 follow-up)              │    │
│  │  Guardrail: min 3 cards, scaffolding validation, fallback cards │    │
│  └──────────────────────────────────────────────────────────────────┘    │
│                                │                                         │
│                                ▼                                         │
│  PHASE 4: TRY IT (ACTIVATION)                                            │
│  "I found a use case but never actually tried it"                        │
│  ┌──────────────────────────────────────────────────────────────────┐    │
│  │  "Try with [prompt]" → opens template, variables pre-filled      │    │
│  │  OR "Create a prompt" → opens builder, AI-suggested pre-fill     │    │
│  │  tiny_start shown as banner: "Start here →"                      │    │
│  │  done_looks_like shown as footer: "You're done when →"           │    │
│  │  Status: Discovered → Tried (on "Mark as Tried" or prompt use)  │    │
│  └──────────────────────────────────────────────────────────────────┘    │
│                                │                                         │
│                                ▼                                         │
│  PHASE 5: REFLECT & RE-ENGAGE                                            │
│  "I tried it once but didn't build it into my workflow"                  │
│  ┌──────────────────────────────────────────────────────────────────┐    │
│  │  Post-trial: effort (easy/right/effort) × result (useful/meh/no)│    │
│  │  + optional reflection note                                      │    │
│  │  Status: Tried → Adopted (manual or 3+ prompt uses)             │    │
│  │  Re-run: pre-filled profile, AI sees previous results,          │    │
│  │    excludes dismissed, builds on what worked                     │    │
│  │  Nudge triggers: designed for nudge system (separate workstream) │    │
│  └──────────────────────────────────────────────────────────────────┘    │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## Implementation Notes for Claude Code

This is a new feature build. Key things the implementation analysis should look at:

1. **Where does this live in the monorepo?** — Part of the Studio/Academy app, new routes under a `discover` or `use-cases` section
2. **Groq integration patterns** — existing `@tatomahq/agents` package has Groq. Reuse patterns, don't reinvent. Pay attention to structured JSON output (the discriminated response types need reliable parsing)
3. **Prompt library linking** — the prompt library is fully shipped. The implementation needs to query existing templates (titles + descriptions) to pass to the AI for matching. Understand the current prompt template data model for the `linked_prompt_id` FK
4. **Org context access** — what org-level data (industry, department, winning moves) is accessible from the employee's auth context without exposing restricted data? This determines how rich the context injection is
5. **Wizard state management** — multi-step form with AI at each step. The `use_case_sessions` table persists state server-side for resumability. Consider: client holds state in React state/URL, server persists on each step completion for resume. Don't over-engineer — this isn't a long-running workflow, it's a 10-minute wizard
6. **Scaffolding field validation** — server-side checks on AI output quality (action verbs in tiny_start, no feeling words in done_looks_like, etc.). Simple regex/keyword checks, not another AI call
7. **Department templates seed migration** — 9 departments × 3-5 templates each = ~40 rows. Include `common_tasks` JSONB for seeding Step 1 suggestions. This is a one-time migration
8. **The graceful degradation paths** — each fallback in the table above is a real code path that needs to exist. Test: what happens when Groq is down? When the org has no context? When the prompt library is empty?
