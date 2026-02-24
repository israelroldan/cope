# Worktree Brief: Personal Use Case Generator

**Roadmap ID:** Q1-08
**Priority:** P0 | **Workstream:** Studio Experience
**Status:** Ready for implementation analysis
**Design doc:** [Learn v1 Design](./learn-v1-design.md) (v3)

---

## What This Is

A guided, AI-assisted wizard that helps employees discover AI use cases specific to their daily work. It's the primary "hook" of the Learn experience — the first thing an employee does after onboarding. The goal is that within 10 minutes, an employee has 3-5 personalized, actionable AI use cases saved to their personal library.

This is NOT:
- The Transformation OS execution-level use case generator (which is strategic, for TLs)
- A free-form chat interface
- A generic "101 AI use cases" list

This IS:
- A step-by-step wizard where AI participates at each step
- Personal and specific ("you, a benefits coordinator who spends 3 hours on enrollment questions")
- Connected to the org's context (industry, department, strategic priorities)
- Linked to the existing prompt library (auto-match existing templates or offer to create new ones)

---

## The User Flow

### Step 1: Role & Context

**What the employee sees:**
- "Let's find AI use cases for your work"
- Department (pre-filled from their profile if available)
- Role/title input (free text, pre-filled from profile if available)
- Brief description of what they do day-to-day (free text, 2-3 sentences)

**What AI does after this step:**
- Based on their role + department + org context (industry, known priorities from Transformation OS), AI suggests 5-8 common tasks for someone in that role
- Example: for a "Marketing Coordinator" at a financial services company, AI might suggest: "Writing social media posts", "Creating campaign reports", "Reviewing brand guidelines compliance", "Summarizing market research", "Drafting email newsletters"

**What the employee does:**
- Confirms which of the suggested tasks they actually do (checkboxes)
- Can add their own tasks that weren't suggested
- Can edit/reword any suggestion to match their reality

### Step 2: Pain Points & Time Sinks

**What the employee sees:**
- The tasks they selected/added from Step 1, now as a list
- For each task: "How much time do you spend on this per week?" (rough estimate: <1h, 1-3h, 3-5h, 5h+)
- For each task: "What's frustrating about it?" (optional, free text — e.g., "repetitive", "takes forever to format", "I always forget details")

**What AI does after this step:**
- AI analyzes the tasks + time estimates + pain points and identifies which ones have the highest AI potential
- Considers: Is this a language task? Does it involve summarizing, writing, analyzing, reformatting? Is it repetitive? Does the pain point match a known AI strength?
- Ranks tasks by "AI opportunity score" (internal, not shown to user)

### Step 3: Your Use Cases (Results)

**What the employee sees:**
- 3-5 personalized AI use cases, ranked by potential impact
- Each use case card shows:
  - **Title** — clear, action-oriented (e.g., "Automate your weekly campaign report")
  - **What AI can do** — 2-3 sentence description of how AI helps with this specific task
  - **Estimated time savings** — per week (e.g., "~2 hours/week")
  - **Difficulty** — Easy / Medium / Advanced (how much prompt skill is needed)
  - **Try it** — link to a matching prompt template if one exists, or a "Create a prompt for this" button that pre-fills the prompt builder

**What the employee can do:**
- Save use cases to their personal library (individual or "save all")
- Dismiss ones that don't fit ("not relevant")
- Ask for more: "These don't quite fit — suggest more based on [additional context]" → AI generates 2-3 more suggestions
- Rate a use case after trying it (useful / not useful)

### After the Wizard

- Saved use cases appear in `Studio > Discover > My Use Cases`
- Each use case card in the library shows its status: Discovered → Tried → Adopted → Dismissed
- The employee can re-run the generator anytime (new role, new tasks, or just want fresh ideas)
- TLs see aggregated data: "47 use cases discovered across the org, top 10 by department"

---

## Org-Context Enrichment

The generator should pull available context from the organization's data to make suggestions more relevant. This is a "best effort" enrichment — if no org context exists, the wizard still works purely on what the employee inputs.

**What context to pull (if available):**
- **Industry** — from the organization profile. A "Marketing Coordinator at a bank" gets different suggestions than at a media agency.
- **Department templates** — pre-built use case suggestions by department (HR, Marketing, Finance, etc.). These serve as seed data for Step 1's task suggestions.
- **Org priorities** — if the Transformation OS has winning moves or strategic themes, these can subtly weight the suggestions (e.g., if "customer experience" is a winning move, prioritize customer-facing use cases).

**What context NOT to pull:**
- No access to other employees' personal data
- No access to confidential strategic content that employees shouldn't see
- No exposing TL-level or consultant-level information

---

## Prompt Library Integration

Each generated use case should connect to the shipped prompt library:

**Auto-linking:** When AI generates a use case, it checks the org's prompt template library for matches. If a relevant template exists (e.g., "Email Drafter" for a "Draft customer emails faster" use case), the use case card shows a "Try with [Template Name]" button that opens that template.

**Create new:** If no good match exists, the use case card shows a "Create a prompt for this" button. Clicking it opens the prompt builder pre-filled with:
- A suggested prompt based on the use case description
- Variables pre-identified from the use case context
- The use case linked as the source

**After creation:** When an employee creates a prompt from a use case, the use case and prompt are linked (bidirectional). The use case card updates to show "Prompt created" with a direct link.

---

## Data Model

**New table: `personal_use_cases`**

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | PK |
| `user_id` | uuid | FK to users |
| `organization_id` | uuid | FK to organizations |
| `title` | text | AI-generated, editable |
| `description` | text | What AI can do for this task |
| `task_description` | text | The employee's original task description |
| `ai_suggestion` | jsonb | Full AI response payload (for audit/debugging) |
| `estimated_time_savings` | text | e.g., "~2 hours/week" |
| `difficulty` | text | easy / medium / advanced |
| `status` | text | discovered / tried / adopted / dismissed |
| `rating` | integer | nullable, 1-5 after trying |
| `linked_prompt_id` | uuid | nullable, FK to prompt templates |
| `shared` | boolean | default false |
| `created_at` | timestamptz | |
| `updated_at` | timestamptz | |

**New table: `department_templates`**

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | PK |
| `department` | text | HR, Marketing, Finance, etc. |
| `title` | text | Template use case title |
| `description` | text | What this use case is about |
| `prompt_template_id` | uuid | nullable, FK to existing prompt template |
| `difficulty` | text | easy / medium / advanced |
| `created_at` | timestamptz | |

**New table: `use_case_sessions`**

| Column | Type | Notes |
|--------|------|-------|
| `id` | uuid | PK |
| `user_id` | uuid | FK to users |
| `organization_id` | uuid | FK to organizations |
| `wizard_state` | jsonb | Stores the full state of each step (role, tasks, pain points, AI responses) |
| `completed` | boolean | Whether the wizard was completed |
| `created_at` | timestamptz | |
| `completed_at` | timestamptz | nullable |

The session table lets employees resume an interrupted wizard and gives us analytics on completion rates.

---

## AI Behavior Specification

**Provider:** Groq (existing integration in `@tatomahq/agents`)

**Step 1 — Task Suggestion Prompt:**
Given the employee's role, department, day-to-day description, and org context (industry), generate 5-8 common tasks this person likely does that have AI potential. Return as a JSON array of `{ task: string, category: string }`. Tasks should be specific and actionable, not generic.

**Step 2 — Opportunity Analysis Prompt:**
Given the selected tasks with time estimates and pain points, rank them by AI opportunity. Consider: language-heaviness, repetitiveness, summarization potential, formatting needs. Return ranked tasks with AI opportunity reasoning.

**Step 3 — Use Case Generation Prompt:**
For the top 3-5 tasks by AI opportunity, generate a use case card. Each card: title (action-oriented), description (2-3 sentences, specific to this person's context), estimated time savings, difficulty level. Also generate a suggested prompt if no existing template matches.

**"More suggestions" follow-up prompt:**
Given the previous suggestions, the user's feedback ("these don't fit because [X]"), and additional context they provide, generate 2-3 alternative use cases that address the feedback.

**Rate limiting:** 20 use case generation sessions per user per month. Each session = one full wizard run (Steps 1-3). Follow-up "more suggestions" count as part of the same session.

---

## Routes & Navigation

- `Studio > Discover` — the section home, shows the generator CTA + personal use case library
- `Studio > Discover > Generate` — the wizard (3 steps)
- `Studio > Discover > My Use Cases` — personal library with status filters (all / discovered / tried / adopted)
- Individual use case detail view — full description, linked prompt, status tracking, rating

---

## What's Explicitly Out of Scope

- **Cross-org sharing** — employees can't browse other orgs' use cases
- **TL approval workflow** — use cases are personal, no approval needed to save
- **Transformation OS promotion** — the flow where employee use cases "bubble up" to the strategic layer is a separate feature (Q2)
- **Gamification** — no points, badges, or leaderboards for discovering use cases
- **Offline support** — requires connectivity for AI generation
- **Department templates authoring** — for v1, seed the templates table manually or via migration. Consultant-facing template authoring is a later feature.

---

## Success Criteria

| Metric | Target |
|--------|--------|
| Wizard completion rate | 70%+ of those who start |
| Average use cases saved per session | 3+ |
| "Tried" status conversion | 40%+ of discovered use cases get tried within 2 weeks |
| Time to complete wizard | < 10 minutes |
| Employee satisfaction | "These suggestions were relevant to my work" — 4+/5 |

---

## Implementation Notes for Claude Code

This is a new feature build. Key things the implementation analysis should look at:

1. **Where does this live in the monorepo?** — should be part of the Studio/Academy app, new routes under a `discover` or `use-cases` section
2. **Groq integration patterns** — the existing `@tatomahq/agents` package already has Groq. Reuse the same patterns, don't reinvent
3. **Prompt library linking** — the prompt library is fully shipped. The implementation needs to query existing templates to find matches when generating use case results. Understand the current prompt template data model for the linking
4. **Org context access** — need to understand what org-level data (industry, department list, potentially winning moves) is accessible from the employee's auth context without exposing restricted data
5. **State management for the wizard** — multi-step form with AI at each step means async state. Consider whether to persist wizard state server-side (the `use_case_sessions` table) or manage it client-side with server persistence only on completion
6. **The department templates migration** — seed data for the standard departments (HR, Marketing, Finance, Operations, IT, Sales, Legal, R&D, Customer Service) with 3-5 template use cases each. This is ~40 template rows.
