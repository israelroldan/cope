# Worktree Brief: Interactive Learning Engine

**Roadmap ID:** Academy v2 (Learn evolution)
**Priority:** P1 | **Workstream:** Studio Experience
**Status:** Ready for scoping discussion
**Design doc:** [Learn v1 Design](./learn-v1-design.md) (v9)
**Depends on:** Academy Engine v1 (worktree-academy-engine.md), Use Case Generator (implemented), Prompt Library (shipped)
**Reference platforms:** ProfAI (use-case-driven AI coaching), SoloLearn (micro-exercises + immediate execution), Sana Learn (17+ interactive card types)

### Version History

| Version | Date | Changes |
|---------|------|---------|
| **v1** | **2026-02-25** | **Initial brief — interactive learning activity system replacing static markdown. 9 activity types, progressive lesson structure (observe → identify → evaluate → create), use-case-connected learning, AI-evaluated open responses.** |

---

## The Core Idea

v1 Academy modules are markdown articles with an exercise at the end. That's "corporate training" — read something, do a thing, check a box. It works as a foundation but it doesn't teach. Not really.

Interactive learning is different. Instead of *reading about* prompt structure, the employee *identifies parts of a prompt* by highlighting them. Instead of *reading about* context quality, they *evaluate why a prompt produced bad output* and fix it. Instead of *being told* what good prompts look like, they *build one step by step* from their own use case — with the platform guiding each step, giving feedback, and connecting the result to their prompt library.

The difference between "I completed a module" and "I actually learned something" is the difference between passive consumption and active participation. This engine makes every module feel like SoloLearn or ProfAI — bite-sized, interactive, and connected to the employee's real work.

### The Progression Model

Every lesson follows a four-beat didactical arc:

```
OBSERVE  →  IDENTIFY  →  EVALUATE  →  CREATE
```

1. **Observe** — See a concept in action. Short explanation + concrete example. (content cards)
2. **Identify** — Find the concept in context. "Which part of this prompt is the role?" (highlight, drag-drop, label activities)
3. **Evaluate** — Judge and reason. "This prompt generated result X. Why?" or "What's missing?" (multiple choice, open-field AI-evaluated)
4. **Create** — Apply it yourself. Use your own use case, build your own prompt, iterate, save. (prompt runner, guided creation)

This isn't just a pedagogical model — it maps directly to how the module content works:

```
Module: "Prompts Have Parts"

OBSERVE:  "This is a prompt. It has 4 parts: Role, Context, Task, Format."
          [Shows an annotated example prompt]

IDENTIFY: "Here's a new prompt. Tap/click on the ROLE part."
          [Employee highlights "You are a marketing analyst"]
          "Now tap the CONTEXT."
          [Employee highlights "Our Q4 campaign had 3 channels..."]

EVALUATE: "This prompt generated a generic report. Why?"
          [A] Missing context about what metrics matter
          [B] The role is too vague
          [C] No format specified
          → Feedback: "A and C — the AI doesn't know what 'good' looks like for your team."

CREATE:   "Now build a prompt for YOUR use case."
          [Pre-filled from Use Case Generator: employee's real task]
          [Guided: "What role should the AI play?" → "What context does it need?" → ...]
          [Run it → see result → iterate → save to library]
```

---

## What This Is (and Isn't)

This IS:
- An interactive activity engine that replaces static markdown modules with structured, interactive lessons
- A library of activity types (highlight, multiple choice, drag-drop, open-field, prompt builder, etc.) that content authors compose into lessons
- Connected to the employee's real data — use cases and prompts flow into learning activities
- AI-evaluated where appropriate (open-field responses get contextual feedback)
- Built on the existing Academy Engine (paths, progress, certificates) — it extends, not replaces

This is NOT:
- A full LMS authoring tool (v1 of the interactive engine has a fixed set of activity types)
- A gamification system (no XP, no leaderboards — engagement comes from relevance)
- A chatbot/conversational AI tutor (activities are structured, not free-form chat)
- A video platform (video can embed in content cards, but it's not the core interaction model)

---

## Part 1: Activity Types

The engine supports a defined set of activity types. Each activity type has: a data schema (what content authors provide), a rendering component (what the employee sees), and a completion condition (what counts as "done").

### Content Activities (Observe)

#### 1. `content_card`
**What it is:** A short piece of explanatory content — text, images, annotated examples. The "explain" step before interaction. Not a full article — think 2-4 paragraphs max, often with a visual.

**Schema:**
```
{
  type: "content_card"
  title: string                    // optional heading
  body_md: string                  // markdown content (short — max ~300 words)
  image_url: string | null         // optional illustration or annotated example
  video_url: string | null         // optional short video embed
  callout: string | null           // optional highlighted key takeaway
}
```

**Completion:** Auto-completes when viewed (scroll to bottom or explicit "Got it" button). Content cards don't block — they're the setup for interactive activities.

#### 2. `annotated_example`
**What it is:** A piece of text (usually a prompt or AI output) with labeled annotations. The employee sees the full text with colored highlights and labels pointing to specific parts. This is the "here's what it looks like" before "now you identify the parts."

**Schema:**
```
{
  type: "annotated_example"
  title: string
  description: string              // brief context ("This is a well-structured prompt for writing a report")
  source_text: string              // the full text being annotated
  annotations: [
    {
      start: number                // character offset start
      end: number                  // character offset end
      label: string                // what this part is ("Role", "Context", "Task", "Format")
      color: string                // visual category (maps to a color palette)
      explanation: string          // tooltip/detail ("The role tells AI what perspective to take")
    }
  ]
}
```

**Completion:** Auto-completes when all annotations have been viewed/tapped.

### Identification Activities (Identify)

#### 3. `highlight_select`
**What it is:** The employee reads a piece of text and highlights/selects the part that matches a prompt. Like ProfAI's "select the action" pattern. Can be used for prompt anatomy, identifying bias, finding key information in AI output, etc.

**Schema:**
```
{
  type: "highlight_select"
  instruction: string              // "Select the CONTEXT part of this prompt"
  source_text: string              // the full text
  correct_selections: [
    { start: number, end: number } // one or more correct ranges
  ]
  label: string                    // what they're selecting ("Context")
  feedback_correct: string         // "That's the context — it gives AI the specific details about your Q4 campaign"
  feedback_incorrect: string       // "Not quite — that's the task instruction. The context is the background information..."
  hint: string | null              // optional hint shown after first wrong attempt
}
```

**Completion:** Correct selection made. Allow retries — feedback is educational, not punitive.

#### 4. `drag_drop_order`
**What it is:** Items that need to be arranged in the correct order or matched to categories. Good for: ordering prompt components, matching AI tools to use cases, sequencing a workflow.

**Schema:**
```
{
  type: "drag_drop_order"
  instruction: string              // "Arrange these prompt parts in the most effective order"
  mode: "sequence" | "categorize"
  items: [
    { id: string, label: string, content: string }
  ]
  // For "sequence" mode:
  correct_order: string[]          // array of item IDs in correct order
  // For "categorize" mode:
  categories: [
    { id: string, label: string }
  ]
  correct_mapping: { [item_id]: category_id }
  feedback_correct: string
  feedback_incorrect: string
}
```

**Completion:** Correct arrangement/categorization. Allow retries with feedback.

#### 5. `label_parts`
**What it is:** A piece of text with blank labels that the employee fills in by selecting from options. Like a more structured version of highlight_select — the parts are already marked, the employee assigns the correct label to each. Good for prompt anatomy, identifying AI output components, etc.

**Schema:**
```
{
  type: "label_parts"
  instruction: string              // "Label each part of this prompt"
  source_text: string              // text with marked sections
  blanks: [
    {
      id: string
      start: number
      end: number
      correct_label: string        // the right answer
    }
  ]
  label_options: string[]          // all available labels (includes distractors)
  feedback_correct: string
  feedback_per_blank: { [blank_id]: string } | null  // optional per-blank feedback
}
```

**Completion:** All blanks correctly labeled. Allow retries.

### Evaluation Activities (Evaluate)

#### 6. `multiple_choice`
**What it is:** A question with multiple options. Can be single-select or multi-select. Includes contextual feedback per option — not just "wrong" but "here's why this isn't quite right."

**Schema:**
```
{
  type: "multiple_choice"
  question: string                 // "This prompt generated a generic report. Why?"
  context: string | null           // optional context block shown above the question (e.g., the prompt and its output)
  options: [
    {
      id: string
      text: string
      is_correct: boolean
      feedback: string             // shown when selected — explains WHY right/wrong
    }
  ]
  multi_select: boolean            // if true, multiple correct answers possible
  explanation: string              // shown after answering — the full explanation
}
```

**Completion:** Correct answer(s) selected. Show per-option feedback immediately, full explanation after.

#### 7. `open_response`
**What it is:** An open text field where the employee writes a response, evaluated by AI. This is for higher-order thinking: "What would you change about this prompt to get a better result?" or "Why do you think the AI missed the key insight?"

**Schema:**
```
{
  type: "open_response"
  question: string                 // "What context is missing from this prompt that would improve the output?"
  context: string | null           // optional context block
  min_length: number               // minimum response length (chars) — prevents "idk"
  evaluation_criteria: string      // passed to AI evaluator: "Good answer mentions: specific data needed, format preferences, audience"
  example_good_response: string    // used by AI evaluator as reference
  max_attempts: number             // how many tries (default: 2)
}
```

**AI Evaluation:** The employee's response is sent to the AI evaluator with the `evaluation_criteria` and `example_good_response`. The AI returns:
```
{
  quality: "strong" | "partial" | "needs_work"
  feedback: string                 // specific, constructive feedback
  suggestion: string | null        // "Consider also mentioning..." (for partial/needs_work)
}
```

**Completion:** After receiving feedback (any quality level). The employee sees the AI's assessment and can optionally retry. Not graded pass/fail — the feedback IS the learning.

### Creation Activities (Create)

#### 8. `guided_prompt_builder`
**What it is:** A step-by-step prompt construction activity where the employee builds a prompt for their own use case. Each step focuses on one component (role, context, task, format) with guidance and inline feedback. This is the bridge between "I understand prompts" and "I can write them."

**Schema:**
```
{
  type: "guided_prompt_builder"
  instruction: string              // "Build a prompt for your use case"
  use_case_source: "selected" | "from_generator" | "manual"
  steps: [
    {
      id: string
      component: string            // "role" | "context" | "task" | "format" | "constraints"
      prompt_text: string          // "What role should the AI take for this task?"
      help_text: string            // "Examples: 'You are a financial analyst', 'You are a copywriter with 10 years experience'"
      placeholder: string          // input placeholder
      ai_feedback: boolean         // whether to give AI feedback on this step
      feedback_criteria: string | null  // if ai_feedback: what to evaluate
    }
  ]
  show_assembled_prompt: boolean   // show the full assembled prompt after all steps
  allow_run: boolean               // let them run the assembled prompt in the built-in runner
  allow_save_to_library: boolean   // let them save the result to their prompt library
}
```

**Flow:**
1. Employee selects a use case (pre-loaded from Use Case Generator if available, or enters manually)
2. For each step: reads the guidance → writes their input → optionally gets AI feedback ("Your context is good but consider adding an example of the output format you want")
3. Sees the full assembled prompt
4. Runs it (if `allow_run`) → sees the result
5. Optionally iterates (change a component → re-run)
6. Saves to library (if `allow_save_to_library`)

**Completion:** All steps filled. Running and saving are encouraged but not required for completion.

#### 9. `prompt_runner`
**What it is:** The same built-in prompt runner from Academy v1, but now usable as an activity within a lesson flow. Fill variables → run → see result → mark done. Exists as a standalone activity type so it can be placed anywhere in a lesson sequence.

**Schema:**
```
{
  type: "prompt_runner"
  instruction: string              // "Try this prompt with your own data"
  prompt_template: string          // the prompt text with {{variables}}
  variables: [
    {
      name: string
      label: string
      placeholder: string
      help_text: string | null
    }
  ]
  pre_run_guidance: string | null  // shown before running ("For best results, include...")
  post_run_reflection: string | null // shown after running ("How does this compare to doing it manually?")
}
```

**Completion:** Prompt executed at least once.

---

## Part 2: Lesson Structure

### From Modules to Lessons

v1 modules = one markdown blob + one exercise. Interactive modules = a **sequence of activities** that follow the observe → identify → evaluate → create arc.

**Data model change:** A module's content is no longer a single `content_md` field. Instead, a module contains an ordered list of activities:

```
learning_activities (
  id               uuid PK
  module_id        uuid FK → learning_modules
  sequence_order   integer
  activity_type    text          -- one of the 9 types above
  activity_data    jsonb         -- the type-specific schema
  is_required      boolean       -- must complete to advance (default true)
  estimated_seconds integer      -- time estimate for this activity
  created_at       timestamptz
  updated_at       timestamptz
)

activity_progress (
  id               uuid PK
  user_id          uuid FK → users
  activity_id      uuid FK → learning_activities
  started_at       timestamptz
  completed_at     timestamptz   -- nullable
  attempts         integer       -- how many tries
  response_data    jsonb         -- what the employee submitted (for analytics)
  ai_feedback      jsonb         -- AI evaluator response (for open_response)
  created_at       timestamptz
)
```

### Lesson Flow UI

The employee sees a **vertical scroll of activity cards** — not a paginated slideshow. Each activity is a distinct card. The lesson progresses naturally by scrolling, with activities unlocking as previous ones are completed.

```
┌─────────────────────────────────────────────┐
│  MODULE: Prompts Have Parts                 │
│  ████████░░░░░░ 4 of 10 activities          │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ 📖 CONTENT CARD                     │    │
│  │ "Every effective prompt has four     │    │
│  │  parts that work together..."        │    │
│  │                            [Got it]  │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ 🔍 ANNOTATED EXAMPLE                │    │
│  │ [Role: "You are a financial analyst  │    │
│  │  specializing in Q4 reports"]        │    │
│  │ [Context: "Our Q4 campaign ran       │    │
│  │  across 3 channels with a $50k      │    │
│  │  budget..."]                         │    │
│  │ [Task: "Write a performance summary"]│    │
│  │ [Format: "Use bullet points, max    │    │
│  │  one page"]                          │    │
│  │                     [Tap each label] │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ ✋ HIGHLIGHT SELECT                  │    │
│  │ "Select the CONTEXT in this prompt:" │    │
│  │                                     │    │
│  │ "You are a marketing coordinator.   │    │
│  │  Our summer campaign launched on     │    │
│  │  June 1st with email, social, and   │    │
│  │  paid channels. Write a brief       │    │
│  │  performance summary for the team   │    │
│  │  meeting."                          │    │
│  │                                     │    │
│  │  [Highlighting enabled — tap words] │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ 🔒 MULTIPLE CHOICE (locked)          │    │
│  │ Complete the activity above first    │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ 🔒 6 more activities...              │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

### Module Completion

A module is complete when all `is_required` activities are completed. Optional activities (e.g., a bonus `open_response`) can be skipped without blocking progress. The module's `exercise_completed_at` in `employee_progress` is set when the last required activity is completed.

---

## Part 3: Use Case Connection

### Learning From Your Own Work

This is what makes this different from generic AI courses. The Foundation block (modules 1-3) progressively connects to the employee's real data:

**Module 1** (What AI Does): Generic examples — the employee hasn't done anything yet.

**Module 2** (Find Your Use Cases): The self_report exercise sends them to the Use Case Generator. After this, `personal_use_cases` has data.

**Module 3** (Try, Iterate, Save): The `guided_prompt_builder` activity pulls from the employee's saved use cases:
- "Pick one of your use cases" → dropdown populated from `personal_use_cases` where status = 'discovered'
- The builder pre-fills the `use_case_source` with the employee's task description, context, and AI suggestions
- The resulting prompt is built around THEIR work, not a generic example
- When they save, the prompt links to the use case (bidirectional)
- When they mark the use case as "Tried", the whole loop closes

**This creates the ProfAI-style seamless connection** — the learning flow produces real artifacts (prompts, use cases) that persist beyond the lesson. The learning IS the onboarding into the product.

### Dynamic Activity Content

Some activities can reference the employee's data:

```
{
  type: "guided_prompt_builder"
  use_case_source: "from_generator"
  // → UI shows: "Pick one of your use cases from Discover"
  // → Populates steps with context from the selected use case
}
```

```
{
  type: "content_card"
  body_md: "In module 2, you discovered {{use_case_count}} use cases. Let's take one and turn it into a working prompt..."
  // → Template variables resolved from employee data at render time
}
```

This is **best-effort** — if the employee hasn't used the Use Case Generator yet, activities fall back to generic examples. The experience is better with personal data but works without it.

---

## Part 4: AI Evaluation

### Open Response Evaluation

The `open_response` activity type sends the employee's text to an AI evaluator. This is NOT a quiz grader — it's a teaching tool.

**Evaluation prompt structure:**
```
<system>
You are an AI learning evaluator for Tatoma's AI Foundations course.
Your role is to give constructive, specific feedback that teaches — not to grade.

Evaluate the employee's response against the criteria below.
Be encouraging but honest. If the answer is incomplete, explain what's
missing and why it matters. Never say "wrong" — say what could be added
or improved.
</system>

<context>
Question: {question}
Additional context: {context}
Evaluation criteria: {evaluation_criteria}
Example of a strong response: {example_good_response}
</context>

<employee_response>
{their_response}
</employee_response>

<instructions>
Return JSON:
{
  "quality": "strong" | "partial" | "needs_work",
  "feedback": "specific feedback (2-3 sentences)",
  "suggestion": "what to add/improve (1 sentence, null if strong)"
}
</instructions>
```

**Key design choices:**
- Feedback is always constructive, never punitive
- "needs_work" still counts as completed — the learning happens in reading the feedback
- The employee can retry after feedback (up to `max_attempts`)
- AI evaluation follows the same provider pattern as the Prompts app
- Rate limit: evaluations count toward a reasonable per-user limit (TBD)

---

## Part 5: Example Lesson — Module 3 (Try, Iterate, Save)

This is the Foundation culmination module, fully interactive:

```
Activity 1: content_card
  "You've discovered use cases. Now let's turn one into a working prompt."
  [Short explanation of the 4-part prompt structure with a visual]

Activity 2: annotated_example
  [A complete prompt with Role/Context/Task/Format annotated and color-coded]
  "This is what a well-structured prompt looks like. Tap each label to learn more."

Activity 3: highlight_select
  "Here's a new prompt. Select the ROLE."
  [Employee highlights the role section]

Activity 4: highlight_select
  "Now select the CONTEXT."
  [Employee highlights the context section]

Activity 5: multiple_choice
  "This prompt generated a generic, bland report. What's most likely missing?"
  [Options with per-option feedback explaining why context and format matter]

Activity 6: open_response
  "Look at this prompt and its output. What specific context would you add to make the output more useful for the employee's team?"
  [AI evaluates the response — looking for specificity, real-world context suggestions]

Activity 7: content_card
  "Now it's your turn. Let's build a prompt for one of YOUR use cases."
  [Transition card preparing for the creation phase]

Activity 8: guided_prompt_builder
  use_case_source: "from_generator"
  [Step by step: role → context → task → format, with AI feedback at each step]
  [Assembles the full prompt → employee runs it → sees result]

Activity 9: prompt_runner
  [Employee iterates — adds more context, refines the prompt, runs again]
  post_run_reflection: "How does this compare to doing this task manually? What would you change next time?"

Activity 10: content_card
  "You just built, tested, and refined a prompt with your own data. Save it to your library — it's yours to use whenever you need it."
  [CTA: "Save to Prompt Library" + "Mark Use Case as Tried"]

→ MODULE COMPLETE. Foundation done.
```

---

## Part 6: Content Authoring

### How Activities Are Created

For v1 of the interactive engine, activities are defined as JSONB in the `learning_activities` table. Content authors create them through the Workbench admin interface.

**Workbench authoring UI (minimal for v1):**
- Select activity type from dropdown
- Fill in the type-specific fields (JSON form or structured input)
- Preview the activity as the employee would see it
- Reorder activities within a module via drag-and-drop

**No visual WYSIWYG editor** — the authoring interface is functional, not pretty. It's for internal use (co-founders, consultants), not end users. A richer authoring experience is a later investment.

### AI-Assisted Content Generation (Future)

Like Sana Learn's approach: upload a concept outline → AI generates a draft set of activities covering the observe → identify → evaluate → create arc. Content author reviews and refines. This is out of scope for v1 of the interactive engine but the activity data model supports it — every activity is structured JSON that an AI could generate.

---

## Part 7: Migration from v1 Modules

The interactive engine doesn't break v1 modules. It extends the system:

- v1 modules that still have `content_md` + exercise render as before (backward compatible)
- Modules with `learning_activities` render using the interactive engine
- A module can have EITHER `content_md` (v1 style) OR `learning_activities` (interactive), not both
- Migration: existing modules can be progressively converted from markdown to interactive activities

**The `learning_modules` table gets a new field:**
```
learning_modules (
  ...existing fields...
  content_type    text    -- "markdown" (default, v1) | "interactive" (v2)
)
```

When `content_type = "interactive"`, the module renderer loads activities from `learning_activities` instead of rendering `content_md`.

---

## Part 8: What's Explicitly Out of Scope

- **Collaborative/social activities** — no peer discussion, no shared sticky notes, no live sessions. Individual learning only for now.
- **Adaptive AI tutor** — no free-form chat tutor that adapts the curriculum. Activities are structured, not conversational.
- **Gamification** — no XP, points, streaks, leaderboards. Engagement comes from relevance and interactivity.
- **Timed activities** — no countdown timers on questions. Learning, not testing.
- **Branching paths** — activities are linear within a module. No "if you got this wrong, do this remedial activity" logic.
- **Video-based activities** — videos can embed in content cards but there are no "watch this video and answer questions" activity types.
- **Activity template marketplace** — no sharing activity templates across organizations.
- **Rich text authoring UI** — Workbench authoring is functional/JSON-based, not visual.

---

## Part 9: Graceful Degradation

| Failure | Fallback |
|---------|----------|
| **AI evaluation fails** (open_response) | Show a generic "Thanks for your response" message and mark complete. Log for retry. Employee still progresses. |
| **Use case data not available** (guided_prompt_builder with from_generator) | Fall back to manual input: "Describe a task you do regularly at work." The builder works without pre-populated data. |
| **Activity data malformed** | Skip the activity and show next one. Log the error. Never block module progress on a broken activity. |
| **Highlight/drag-drop doesn't work** (mobile, accessibility) | Fall back to multiple_choice equivalent: "Which of these sections is the CONTEXT?" with text options. |
| **Employee skips optional activities** | Module still completable. Progress shows "X of Y activities" but only required activities gate completion. |

---

## Part 10: Success Criteria

| Metric | Target | How to measure |
|--------|--------|----------------|
| Activities feel interactive, not just reading | >70% of module time spent on interactive activities (not content cards) | Time tracking per activity type |
| Highlight/select activities work reliably | Correct selection registered on first or second attempt for >80% of employees | `activity_progress.attempts` distribution |
| AI evaluation is useful | >60% of employees who get "partial" or "needs_work" feedback retry with improvement | Retry rate + quality improvement in `activity_progress` |
| Use case connection works | >50% of Module 3 completions use a real use case from the generator (not manual input) | `guided_prompt_builder` response_data analysis |
| Prompt saved to library | >40% of Module 3 completions result in a prompt saved to the library | Link between activity completion and prompt creation timestamps |
| Module completion rate improves over v1 | Interactive modules have higher completion than markdown modules | A/B comparison if both exist |

---

## Implementation Notes for Claude Code

1. **This extends the Academy Engine, not replaces it.** The `learning_activities` table and `activity_progress` table are additions. The existing `learning_modules` table gets a `content_type` field. v1 modules continue to work.

2. **Activity types are a component library.** Each of the 9 activity types needs a React component that renders the activity from its JSONB schema and handles interaction + completion. Think of it as a card-based component system.

3. **Highlight/select interaction** is the trickiest UI component. The employee needs to select a range of text within a paragraph. Look at how text selection works in annotation tools or reading apps. On mobile, this may need a tap-based alternative (tap words to toggle selection).

4. **AI evaluation** follows the same provider pattern as the Prompts app and Use Case Generator. The evaluation is a simple prompt → JSON response call. Rate limit it reasonably.

5. **Use case connection** requires querying `personal_use_cases` for the current user. The `guided_prompt_builder` with `use_case_source: "from_generator"` needs to: fetch the user's use cases, let them select one, and pre-populate the builder steps with context from the selected use case.

6. **The authoring UI in Workbench** should be functional but doesn't need to be polished. A structured form per activity type (not a free-form JSON editor) with preview capability. This is internal tooling.

7. **Feature flag** — same `feature-learn` flag. Interactive modules only render if the flag is enabled; otherwise fall back to markdown if available.

8. **i18n-ready** — all activity text fields (instructions, feedback, options, etc.) should follow the same i18n preparation pattern. The JSONB schemas should support localized strings when multi-language is added later.

9. **Accessibility** — highlight_select and drag_drop_order need keyboard-accessible alternatives. At minimum: tab-navigate to elements, enter/space to select. Fall back to simpler interaction modes when full interactivity isn't possible.
