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
| v2 | 2026-02-24 | Rewritten with behavioral pipeline architecture. 5-phase pipeline, discriminated response types, scaffolding fields, activation flow, reflection, re-engagement, guardrails, graceful degradation. |
| **v3** | **2026-02-24** | **Critical tone correction: shifted from "just try it" (habit-forming pattern) to "your expertise makes AI output good" (professional adoption pattern). Rewrote scaffolding fields to emphasize iteration and context investment over quick wins. Added honest expectations design principle. Updated before/after examples, tiny_start, obstacle_plan, and reflection to reinforce that AI output quality scales with the effort you put into prompting.** |

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

### Critical Design Principle: Honest Expectations

This pipeline is adapted from a habit-forming behavioral engine (the Guided Achievement Engine) where "showing up is half the battle" — where the primary goal is getting people to *try*. In that context, the output quality is secondary to the act of doing.

**That tone does not work here.**

In a professional context, an employee who follows a `tiny_start` like "paste your data into ChatGPT and get your report!" will get mediocre output. It will lack their institutional knowledge, their manager's preferences, the subtle context of why certain metrics matter. If we've set the expectation that AI does their work in 5 minutes, they'll feel misled. They'll conclude "AI doesn't work for my job" — which is *exactly* the failure mode this tool exists to prevent.

**The correct framing throughout this entire feature:**

> AI output quality is directly proportional to the context and expertise you feed in. The first attempt will be a rough draft — that's normal and expected. The value isn't that AI does it perfectly; it's that AI gives you a starting point you can shape with your expertise. The more you invest in your prompts (context, examples, constraints), the better the results get. This is a skill that improves with practice.

This principle affects every piece of copy, every scaffolding field, every before/after example, and every nudge in the system. Specifically:

- **`tiny_start`** should include context-giving as part of the first action, not just "paste and go"
- **`done_looks_like`** should describe a *reviewed and refined* output, not just a raw AI generation
- **`obstacle_plan`** should focus on improving output quality through better prompting, not just "try again"
- **`example_before_after`** should show the iteration — raw output → refined with context → usable result
- **Reflection** should capture what the employee did to improve the output (this is learning data)
- **Time savings estimates** should be honest: "saves 60% of the time" not "does it in 5 minutes"

---

## What This Is (and Isn't)

This IS:
- A guided wizard where AI participates at each step — not a form that dumps results at the end
- Personal and specific ("you, a benefits coordinator who spends 3 hours on enrollment questions")
- Connected to the org's context (industry, department, strategic priorities)
- Linked bidirectionally to the shipped prompt library — use cases are tried by running prompts in context
- The primary "hook" of the Learn experience — designed to create an "aha moment" within 10 minutes

This is NOT:
- The Transformation OS execution-level use case generator (which is strategic, for TLs)
- A free-form chat interface
- A generic "101 AI use cases" list
- A one-time discovery tool — the re-engagement loop brings employees back
- A separate "Cards" or "Tools" product — the execution layer is the prompt library itself

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
  tiny_start: string          // smallest first step INCLUDING context-giving, < 5 minutes
  done_looks_like: string     // observable outcome AFTER employee review/refinement
  obstacle_plan: string       // "If the output doesn't match —" prompting improvement strategy
  example_before_after: {     // honest three-part comparison showing iteration
    before: string            // "You currently do this by..."
    first_draft: string       // "AI generates X — useful but [honest limitation]"
    after_refinement: string  // "After you add your expertise, the result is..."
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

Each field has strict quality rules enforced in the prompt. **Critical: all fields must reflect the "honest expectations" principle — AI gives you a strong starting point that improves with your expertise, not a magic button.**

#### `tiny_start` — Defeating Activation Energy (With Context)
> "The smallest possible first action to try this use case, achievable in under 5 minutes, that INCLUDES giving AI the context it needs"

The key difference from a habit-forming app: the tiny first step isn't just "open the tool and click go." It includes the context-setting work that makes the output actually useful. This teaches the employee from the very first interaction that **what you put in determines what you get out.**

**Good:** "Open the Report Generator prompt template. Before running it, paste last week's campaign data AND a paragraph describing what your manager typically wants to see in these reports (metrics that matter, tone, level of detail). Then generate."
**Bad:** "Open ChatGPT, paste your data, and ask for a report" (no context = bad output = bad first impression)
**Bad:** "Think about how you could use AI for reporting" (meta, not action)

**Validation rule:** Must be a concrete action. Must include at least one context-giving instruction (paste an example, describe the format you need, specify what "good" looks like). Must NOT promise instant results without effort.

#### `done_looks_like` — Observable Completion (Reviewed, Not Raw)
> "What tangible result exists when you've successfully tried this use case — including your review and refinement of the AI output"

The outcome isn't "AI generated something." It's "AI generated a draft, you reviewed it with your expertise, and you have a result that's genuinely useful." This reinforces that the employee's knowledge is the essential ingredient.

**Good:** "A campaign report draft that you've reviewed and adjusted — the structure and data summary came from AI, but you've added your analysis of what the numbers mean and tweaked the tone to match your team's style. Total time: ~20 minutes instead of 45."
**Bad:** "A campaign report generated in 5 minutes" (implies AI output is ready to use as-is — it won't be)
**Bad:** "You feel more productive" (feeling, not artifact)

**Validation rule:** Must describe an artifact that includes the employee's review/refinement. Must include a realistic time estimate that accounts for review. Time savings should be expressed as a percentage or comparative ("20 min instead of 45") not an absolute ("done in 5 min").

#### `obstacle_plan` — Improving Output Quality
> "A specific strategy for when the AI output isn't good enough, starting with 'If the output doesn't match what you need —'"

The most likely obstacle isn't that AI fails — it's that the output is generic, misses context, or doesn't match the employee's standards. The obstacle plan should always point toward **better prompting and more context** as the solution, building the employee's prompt skills in the process.

**Good:** "If the output doesn't match what you need — paste an example of a report you wrote manually that your manager liked, and tell the AI: 'Follow this format and tone. Here's what I want emphasized: [your priorities].' The more specific you are about what 'good' looks like, the better the output."
**Bad:** "If it doesn't work — try again" (teaches nothing)
**Bad:** "If it doesn't work — ask your IT department" (passes the buck)
**Bad:** "If it doesn't work — try a different AI tool" (gives up on the skill-building)

**Validation rule:** Must teach a prompting improvement strategy. Must reference adding context, examples, or constraints as the path to better results. Must NOT suggest the employee just accept mediocre output or abandon the use case.

#### `example_before_after` — Making It Concrete (With Honest Iteration)
> "A three-part comparison showing: how the task is done today → what a first AI draft looks like (with its limitations) → what the refined result looks like after the employee adds their expertise"

This is the most important field for setting honest expectations. Instead of a simple before/after that implies AI magically produces perfect output, it shows a **three-beat narrative**: your current approach → raw AI output (useful but imperfect) → your expertise + AI (the real win).

**Good example structure:**
```
before: "You currently spend ~45 minutes on the weekly campaign report: pulling
  data from three sources, writing up trends, formatting for your manager."

first_draft: "AI generates a structured report from your data in 3 minutes. It gets
  the numbers and basic structure right, but the narrative is generic — it doesn't
  know that your manager cares about cost-per-lead trends or that the Q1 campaign
  underperformed for a known reason."

after_refinement: "You review the AI draft, add your analysis of what the numbers
  actually mean, adjust the framing for your manager's priorities, and fix the
  tone. Total: ~20 minutes. You saved ~25 minutes AND the report structure is
  more consistent week to week."
```

**Bad:** "Before: 45 minutes. After: 5 minutes." (dishonest, sets up disappointment)

**Data model change:** `example_before_after` becomes a three-field object:
```
example_before_after: {
  before: string        // how the task is done today
  first_draft: string   // what AI produces (with honest limitations noted)
  after_refinement: string  // what it looks like after employee adds their expertise
}
```

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

The "Try it" action always routes through the prompt library — prompts are the execution layer for use cases.

**If linked to an existing prompt template:**
1. Opens the prompt template with the option to run it in context (fill variables, execute against the employee's actual task)
2. Variables are pre-filled with context from the use case where possible
3. The use case's `tiny_start` is shown as a banner: "Start here: [tiny_start]"
4. The `done_looks_like` is shown as a subtle footer: "You'll know it worked when: [done_looks_like]"

**If "Create a prompt for this":**
1. Opens the prompt builder
2. Pre-fills with the AI-generated `suggested_prompt`
3. Pre-identifies `suggested_variables`
4. Same `tiny_start` and `done_looks_like` banners
5. On save, creates the bidirectional link — the employee can now run this prompt whenever they need it

**If the employee wants to try outside the platform (in ChatGPT, Copilot, etc.):**
1. The use case detail view shows all scaffolding fields prominently
2. `tiny_start` at the top: "Your first step →"
3. `obstacle_plan` accessible: "If the output isn't what you need →"
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

When an employee marks a use case as "Tried", they see a lightweight reflection that captures *how they got to a good result* — not just whether it worked. This is learning data both for the employee and for the system.

**Result quality (required):** "How was the AI output after you refined it?"
- `Ready to use` | `Needed some editing` | `Needed major rework` | `Wasn't useful`

**Context effort (required):** "How much context did you give the AI?"
- `Detailed instructions + examples` | `Basic instructions` | `Just the raw task`

**What you improved (optional but encouraged):** "What did you add or change to make the output work?"
- Free text — e.g., "Added our brand guidelines and an example from last month", "Restructured the sections to match our template", "The tone was too formal, I had to rewrite the intro"

**Would you use this again? (required):**
- `Yes, regularly` | `Yes, occasionally` | `Maybe with a better prompt` | `No, not worth it`

### The Two-Axis Assessment

Separating result quality from context effort creates a matrix with actionable signal — and **teaches the employee the core lesson: more context = better results.**

```
                     Just raw task    Basic instructions    Detailed + examples
Ready to use      |      rare       |       ✓            |         ✓         |
Needed editing    |       ✓         |       ✓            |       common      |
Needed rework     |     common      |       ✓            |       rare        |
Wasn't useful     |     common      |      rare          |      very rare    |
```

The diagonal tells the story: **when "just raw task" correlates with "needed major rework" and "detailed + examples" correlates with "ready to use", the employee sees the pattern themselves.** The platform can surface this explicitly: "You gave detailed context → the output was ready to use. That's the pattern — the more context you provide, the better AI works for you."

This data feeds:
- **The employee:** "Your best results came when you provided examples and context. Try that approach with your other use cases." This is the core prompt-literacy lesson, delivered through their own data.
- **The "what you improved" field** is gold: it captures the specific domain expertise the employee adds. Over time, this teaches employees what AI misses (tone, institutional knowledge, context) and what they uniquely contribute. It also seeds better prompts — "last time you added brand guidelines and it worked well, try including them upfront next time."
- **The TL analytics:** Aggregated quality distributions across the org. If many employees say "needed major rework", the prompt templates might need improvement. If most say "ready to use with detailed context", the system is working.
- **Future suggestions:** When the employee re-runs the generator, the AI sees which previous use cases produced good results AND what level of context effort was involved, adjusting suggestions accordingly.

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
| `example_first_draft` | text | Scaffolding: what AI produces (with honest limitations) |
| `example_after_refinement` | text | Scaffolding: result after employee adds their expertise |
| `status` | text | discovered / tried / adopted / dismissed |
| `result_quality` | text | nullable: ready_to_use / needed_editing / needed_rework / not_useful |
| `context_effort` | text | nullable: detailed_with_examples / basic_instructions / just_raw_task |
| `what_improved` | text | nullable: what the employee added/changed to make output work |
| `would_use_again` | text | nullable: yes_regularly / yes_occasionally / maybe_better_prompt / no |
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
- **Cards / standalone AI tools** — Cards as a product concept is being reworked separately. The use case generator's "Try it" flow routes through the prompt library (run the prompt in context), not through a Cards interface.
- **Guided execution timer** — unlike the Achievement Engine, use case "trying" happens either via the prompt library or outside the platform (in ChatGPT, Copilot, etc.). We track status and reflection, not real-time execution.

---

## Success Criteria

| Metric | Target | How to measure |
|--------|--------|----------------|
| Wizard completion rate | 70%+ of those who start | `use_case_sessions` completed/total |
| Average use cases saved per session | 3+ | `personal_use_cases` count per session |
| Time to complete wizard | < 10 minutes | Session timestamps |
| Discovered → Tried conversion | 40%+ within 2 weeks | Status transitions with date math |
| Tried → Adopted conversion | 30%+ of tried | Status transitions |
| Post-trial "Ready to use" or "Needed some editing" | 60%+ of reflections | `result_quality` distribution |
| Context effort correlation | Employees who give detailed context rate results higher | Cross-tabulation of `context_effort` × `result_quality` |
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
│  PHASE 3: USE CASE GENERATION (with honest scaffolding)                  │
│  "I have a vague idea but don't know what to actually DO"                │
│  ┌──────────────────────────────────────────────────────────────────┐    │
│  │  3-5 UseCaseCards, each with:                                    │    │
│  │  ┌──────────────────────────────────────────────────────────┐    │    │
│  │  │ title (action-oriented) + description (specific to them) │    │    │
│  │  │ estimated_time_savings (honest %) + difficulty            │    │    │
│  │  ├──────────────────────────────────────────────────────────┤    │    │
│  │  │ SCAFFOLDING (honest expectations):                       │    │    │
│  │  │  tiny_start: includes context-giving, not just "paste"   │    │    │
│  │  │  done_looks_like: reviewed+refined result, not raw AI    │    │    │
│  │  │  obstacle_plan: improve prompting, add context/examples  │    │    │
│  │  │  before → first_draft (honest limits) → after_refinement │    │    │
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
│  PHASE 4: TRY IT (ACTIVATION — via prompt library)                       │
│  "I found a use case but never actually tried it"                        │
│  ┌──────────────────────────────────────────────────────────────────┐    │
│  │  "Try with [prompt]" → run prompt in context, vars pre-filled    │    │
│  │  OR "Create a prompt" → builder pre-filled, save + run           │    │
│  │  OR try outside platform (ChatGPT, Copilot, etc.)               │    │
│  │  tiny_start banner (includes context-giving instructions)        │    │
│  │  done_looks_like footer (reviewed+refined result, not raw AI)    │    │
│  │  Status: Discovered → Tried (on "Mark as Tried" or prompt use)  │    │
│  └──────────────────────────────────────────────────────────────────┘    │
│                                │                                         │
│                                ▼                                         │
│  PHASE 5: REFLECT & RE-ENGAGE                                            │
│  "I tried it once but didn't build it into my workflow"                  │
│  ┌──────────────────────────────────────────────────────────────────┐    │
│  │  Post-trial: result quality × context effort (teaches the lesson │    │
│  │    that more context = better results, through their own data)   │    │
│  │  "What did you improve?" captures domain expertise contributed   │    │
│  │  Status: Tried → Adopted (manual or 3+ prompt uses)             │    │
│  │  Re-run: pre-filled profile, AI sees previous results + context │    │
│  │    effort levels, builds on what worked                          │    │
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
