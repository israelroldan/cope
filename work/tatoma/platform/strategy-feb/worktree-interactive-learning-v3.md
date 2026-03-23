# Worktree Brief: Interactive Learning Engine

**Roadmap ID:** Academy v2 (Learn evolution)
**Priority:** P1 | **Workstream:** Studio Experience
**Status:** Ready for scoping discussion
**Design doc:** [Learn v1 Design](./learn-v1-design.md) (v11)
**Depends on:** Academy Engine v1 (worktree-academy-engine.md), Use Case Generator (implemented), Prompt Library (shipped)
**Reference platforms:** ProfAI (use-case-driven AI coaching), SoloLearn (micro-exercises + immediate execution), Sana Learn (17+ interactive card types)

### Version History

| Version | Date | Changes |
|---------|------|---------|
| v1 | 2026-02-25 | Initial brief — interactive learning activity system replacing static markdown. 9 activity types, progressive lesson structure (observe → identify → evaluate → create), use-case-connected learning, AI-evaluated open responses. |
| v2 | 2026-02-25 | Expanded to 19 activity types. Added 10 interactive mechanics from Tatoma learning format design: sorting buckets, sequence builder, binary stack, odd one out, spot the error, associations, fill the gap, ranking, multi match, two-axis placement. Introduced shared ActivityEnvelope wrapper. Added mechanic selection guide mapped to modules. Updated example lessons. |
| **v3** | **2026-02-25** | **Restructured to 9 modules across 3 paths (~1.5h each). Expanded Security from 1 module to 3 (Data Privacy, Spotting Mistakes, Responsible AI). Added capstone Module 9 (Your AI Action Plan). Full activity sequences for all 9 modules. Revised time estimates: ~4.5h total.** |

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

1. **Observe** — See a concept in action. Short explanation + concrete example. (content cards, annotated examples)
2. **Identify** — Find, classify, recall, and connect. Active exercises that make the employee interact with the material. (highlight, sort, match, fill-in, associate, label, sequence)
3. **Evaluate** — Judge, decide, and reason. Higher-order thinking about what's right, wrong, better, or worse. (multiple choice, binary decisions, spot errors, rank, place on axes, open-field AI-evaluated)
4. **Create** — Apply it yourself. Use your own use case, build your own prompt, iterate, save. (prompt runner, guided creation)

Activities don't have to follow this arc rigidly within a single lesson — a lesson might weave between phases. But the overall module should progress from observe toward create, and individual activity difficulty should generally increase.

---

## What This Is (and Isn't)

This IS:
- An interactive activity engine that replaces static markdown modules with structured, interactive lessons
- A library of 19 activity types that content authors compose into lessons
- Connected to the employee's real data — use cases and prompts flow into learning activities
- AI-evaluated where appropriate (open-field responses get contextual feedback)
- Mobile-first — all mechanics designed for touch interaction with keyboard fallbacks
- Built on the existing Academy Engine (paths, progress, certificates) — it extends, not replaces

This is NOT:
- A full LMS authoring tool (v1 of the interactive engine has a fixed set of activity types)
- A gamification system (no XP, no leaderboards — engagement comes from relevance)
- A chatbot/conversational AI tutor (activities are structured, not free-form chat)
- A video platform (video can embed in content cards, but it's not the core interaction model)

---

## Part 1: Activity Types — Full Catalogue

The engine supports 19 activity types organized by their primary role in the didactical arc. Each type has a data schema (stored as JSONB in `activity_data`), a rendering component, and a completion condition.

All activities share a common **ActivityEnvelope** wrapper (see Part 2). The schemas below show only the type-specific `spec` content.

---

### OBSERVE Activities

These set the stage. Short, consumable, non-blocking.

#### 1. `content_card`
**What it is:** A short piece of explanatory content — text, images, annotated examples. The "explain" step before interaction. Think 2-4 paragraphs max, often with a visual.

**Schema:**
```
{
  type: "content_card"
  title: string                    // optional heading
  body_md: string                  // markdown content (short — max ~300 words)
  image_url: string | null         // optional illustration
  video_url: string | null         // optional short video embed
  callout: string | null           // optional highlighted key takeaway
}
```

**Completion:** Auto-completes when viewed (scroll to bottom or "Got it" button).

#### 2. `annotated_example`
**What it is:** A piece of text (usually a prompt or AI output) with labeled annotations. The employee sees the full text with colored highlights and labels pointing to specific parts.

**Schema:**
```
{
  type: "annotated_example"
  title: string
  description: string              // brief context
  source_text: string              // the full text being annotated
  annotations: [
    {
      start: number                // character offset start
      end: number                  // character offset end
      label: string                // "Role", "Context", "Task", "Format"
      color: string                // visual category
      explanation: string          // tooltip detail
    }
  ]
}
```

**Completion:** Auto-completes when all annotations have been viewed/tapped.

---

### IDENTIFY Activities

Active exercises where the employee interacts with the material — finding, classifying, recalling, connecting, ordering.

#### 3. `highlight_select`
**What it is:** The employee reads text and highlights/selects the part matching a prompt. Like ProfAI's "select the action" pattern.

**Best for:** Prompt anatomy (select the Role), finding key information in AI output, identifying bias in generated text.

**Schema:**
```
{
  type: "highlight_select"
  instruction: string              // "Select the CONTEXT part of this prompt"
  source_text: string
  correct_selections: [
    { start: number, end: number }
  ]
  label: string                    // what they're selecting
  feedback_correct: string
  feedback_incorrect: string
  hint: string | null
}
```

**Completion:** Correct selection made. Allow retries with educational feedback.

#### 4. `label_parts`
**What it is:** Text with blank labels the employee fills in by selecting from options. The parts are already marked — the employee assigns the correct label to each.

**Best for:** Prompt anatomy (label each section), identifying AI output components.

**Schema:**
```
{
  type: "label_parts"
  instruction: string
  source_text: string
  blanks: [
    {
      id: string
      start: number
      end: number
      correct_label: string
    }
  ]
  label_options: string[]          // all available labels (includes distractors)
  feedback_correct: string
  feedback_per_blank: { [blank_id]: string } | null
}
```

**Completion:** All blanks correctly labeled.

#### 5. `sorting_buckets`
**What it is:** Items that must be dragged into the correct category bucket. The employee classifies 12-20 items across 3-5 categories.

**Best for:** Classifying data types (safe vs. needs anonymization vs. never share), sorting AI tools by capability, categorizing prompt techniques by purpose, taxonomies of any kind.

**Why it's different from `drag_drop_order` categorize mode:** Sorting Buckets is specifically designed for classification with larger item sets, progressive reveal (items appear in batches), and per-item explanations. It's the go-to mechanic when classification IS the learning objective.

**Schema:**
```
{
  type: "sorting_buckets"
  instruction: string              // "Sort these data types by how they should be handled"
  categories: [
    {
      id: string
      label: string                // "Safe to Share", "Needs Anonymization", "Never Share"
      hint: string | null          // optional category guidance
    }
  ]
  items: [
    {
      id: string
      label: string                // the item text
      correct_category_id: string
      explanation: string          // WHY it belongs there
    }
  ]
  reveal_mode: "all" | "progressive"  // show all items at once or in batches
  batch_size: number | null        // for progressive: how many items per batch
}
```

**Completion:** All items correctly sorted. Allow retries per item with feedback.

**Tatoma examples:**
- Module 4 (Security): Sort data types into "Safe / Anonymize First / Never Share"
- Module 5 (Tool Landscape): Sort tasks into which AI tool handles them best
- Module 1 (AI Basics): Sort statements into "AI Can Do / AI Can't Do / Depends on Context"

#### 6. `sequence_builder`
**What it is:** Steps presented in random order that must be arranged in the correct sequence. Each step has an explanation of why it comes where it does.

**Best for:** Process understanding — prompt engineering workflows, agentic workflow steps, the iterative refinement cycle.

**Why it exists alongside `drag_drop_order`:** Sequence Builder adds two-tier hints (hint per step + hint about transitions between steps) and requires a single unambiguous correct order. `drag_drop_order` is a lighter general-purpose mechanic. Use Sequence Builder when the ordering itself is the core lesson.

**Schema:**
```
{
  type: "sequence_builder"
  instruction: string              // "Arrange these steps in the correct order"
  steps: [
    {
      id: string
      label: string                // action-oriented: "Define the AI's role"
      correct_index: number        // 0-based position
      hint: string | null          // hint for this step's position
      explanation: string          // why this position
    }
  ]
  transition_explanations: [       // why step A leads to step B
    {
      from_id: string
      to_id: string
      explanation: string
    }
  ] | null
}
```

**Completion:** Correct order achieved.

**Tatoma examples:**
- Module 3 (Try/Iterate/Save): Order the prompt refinement cycle
- Module 6 (Agentic Workflows): Arrange the steps of a multi-agent pipeline

#### 7. `fill_the_gap`
**What it is:** Educational text with inline blanks. Each blank is answered via multiple choice from a small set of options. The text itself teaches — blanks are placed at key learning moments, not random words.

**Best for:** Active recall of terminology, prompt structure patterns, security rules. The surrounding text provides context while the blanks test comprehension.

**Schema:**
```
{
  type: "fill_the_gap"
  instruction: string              // "Complete the text by filling in the blanks"
  text: string                     // contains __blankId__ placeholders
  blanks: [
    {
      id: string                   // MUST match placeholder in text
      options: string[]            // 3-4 choices
      answer: string               // correct option
      hint: string | null
      explanation: string          // why this is the answer
    }
  ]
}
```

**Critical implementation note:** Placeholders use the blank's `id`, NOT the answer. Example: `"text": "A prompt starts with a __blank1__ that tells AI what perspective to take"` with `"id": "blank1"`, answer: `"role"`.

**Completion:** All blanks correctly filled.

**Tatoma examples:**
- Module 1: "A well-structured prompt includes a __blank1__ that tells the AI what perspective to take, __blank2__ that provides specific information about your situation, a clear __blank3__ describing what you need, and a __blank4__ specifying how the output should look."
- Module 4: "Before sharing data with AI, you should __blank1__ any personally identifiable information and never include __blank2__ in your prompts."

#### 8. `multi_match`
**What it is:** Two columns of items that must be paired. The employee taps an item on the left, then taps its match on the right. Typically one-to-one, but supports many-to-one.

**Best for:** Vocabulary building, term-definition matching, connecting concepts to examples, mapping tools to use cases.

**Schema:**
```
{
  type: "multi_match"
  instruction: string              // "Match each AI term to its definition"
  left_column: [
    { id: string, label: string }
  ]
  right_column: [
    { id: string, label: string }
  ]
  pairs: [
    { left_id: string, right_id: string }
  ]
  many_to_one: boolean             // can multiple left items match one right?
  feedback_per_pair: { [left_id]: string } | null  // optional per-pair explanation
}
```

**Completion:** All pairs correctly matched.

**Tatoma examples:**
- Module 1: Match "Hallucination" → "AI generates plausible but false information", "Token" → "Unit of text the AI processes", "Context window" → "Maximum text AI can consider at once"
- Module 5: Match AI tools → their primary strength ("Perplexity" → "Research with cited sources", "Midjourney" → "Image generation from text")

#### 9. `associations`
**What it is:** A central concept with 6-10 "petal" concepts arranged radially around it. Some petals genuinely relate to the center, some don't. The employee selects the related ones.

**Best for:** Concept mapping, understanding what relates to a core idea, building mental models of topic scope.

**Schema:**
```
{
  type: "associations"
  instruction: string              // "Select the concepts that relate to the center"
  center: {
    id: string
    label: string                  // the central concept
  }
  petals: [
    {
      id: string
      label: string
      is_related: boolean
      explanation: string          // why it relates (or doesn't)
    }
  ]
  max_select: number | null        // optional limit on selections
}
```

**Completion:** All correct petals selected (and no incorrect ones).

**Tatoma examples:**
- Module 1: Center = "Effective Prompt" → petals include "Specific context" (yes), "Clear role" (yes), "Longer is always better" (no), "Output format" (yes), "Personal opinions" (no)
- Module 5: Center = "ChatGPT" → select which use cases genuinely fit vs. which are better suited to other tools

#### 10. `drag_drop_order`
**What it is:** A general-purpose drag mechanic for ordering items or matching to categories. Lighter-weight than the specialized mechanics (sorting_buckets, sequence_builder) — use for simpler cases.

**Schema:**
```
{
  type: "drag_drop_order"
  instruction: string
  mode: "sequence" | "categorize"
  items: [
    { id: string, label: string, content: string }
  ]
  // For "sequence" mode:
  correct_order: string[]
  // For "categorize" mode:
  categories: [
    { id: string, label: string }
  ]
  correct_mapping: { [item_id]: category_id }
  feedback_correct: string
  feedback_incorrect: string
}
```

**Completion:** Correct arrangement/categorization.

---

### EVALUATE Activities

Higher-order thinking — judging, deciding, analyzing, reasoning.

#### 11. `multiple_choice`
**What it is:** A question with multiple options, single or multi-select. Includes contextual feedback per option — not just "wrong" but "here's why."

**Schema:**
```
{
  type: "multiple_choice"
  question: string
  context: string | null           // optional context block above the question
  options: [
    {
      id: string
      text: string
      is_correct: boolean
      feedback: string             // explains WHY right/wrong
    }
  ]
  multi_select: boolean
  explanation: string              // full explanation shown after answering
}
```

**Completion:** Correct answer(s) selected.

#### 12. `binary_stack`
**What it is:** A card stack where items appear one at a time. For each card, the employee accepts or rejects it based on a stated rule. Builds rapid decision-making instincts.

**Best for:** Security rules (is this safe to share?), prompt quality checks (is this a good prompt?), best practice validation. The speed of the interaction trains reflexes, not deliberation.

**Why it's different from multiple_choice:** Binary Stack is about rapid rule application across many items, not deep reasoning about a single question. The accept/reject framing with one-at-a-time cards creates a different cognitive mode — pattern recognition over analysis.

**Schema:**
```
{
  type: "binary_stack"
  instruction: string              // the rule being applied
  rule: string                     // clear criterion: "Accept data that is safe to include in an AI prompt"
  items: [
    {
      id: string
      content: string              // the item to evaluate
      correct_decision: "accept" | "reject"
      explanation: string          // why accept/reject
    }
  ]
  order: "sequential" | "random"
  show_score: boolean              // show running tally
}
```

**Interaction:** Swipe right (accept) / swipe left (reject) on mobile. Accept/Reject buttons on desktop. Keyboard: arrow keys or A/R.

**Completion:** All items decided. Show summary of correct/incorrect at end.

**Tatoma examples (Module 4 — Security):**
- Rule: "Accept data that is safe to include in an AI prompt"
- Cards: "Customer's full name and email" → Reject. "Anonymized quarterly revenue trends" → Accept. "Internal salary bands by role" → Reject. "Public product feature list" → Accept. "Employee performance review notes" → Reject. "Industry benchmark statistics" → Accept.

#### 13. `odd_one_out`
**What it is:** A grid of 6-9 items sharing an implicit pattern. 1-3 items don't fit. The employee identifies the outliers, then the pattern is revealed.

**Best for:** Pattern recognition, exceptions to rules, distinguishing similar concepts. The learning happens when the pattern is revealed — the employee often discovers something they hadn't consciously noticed.

**Schema:**
```
{
  type: "odd_one_out"
  instruction: string              // "Find the item(s) that don't belong"
  pattern_reveal: string           // shown after: "All others are X, but Y is Z"
  items: [
    {
      id: string
      label: string
      is_odd: boolean
      explanation: string          // why it fits or doesn't
    }
  ]
  allow_multiple: boolean          // can have 1+ odd items
  difficulty: "easy" | "medium" | "hard"
}
```

**Completion:** All odd items correctly identified (and no non-odd items selected).

**Tatoma examples:**
- Module 1: Grid of AI capabilities — 7 things AI can do, 2 things it can't (but sound like it could). Pattern reveal: "AI can process and generate text but cannot access real-time data or remember previous conversations (without RAG)."
- Module 4: Grid of data handling practices — 6 safe practices, 2 risky ones disguised as normal.

#### 14. `spot_the_error`
**What it is:** A grid of 8-12 items mixing correct and incorrect examples. The employee identifies which ones contain errors.

**Best for:** Debugging prompts, spotting hallucinations in AI output, quality control. Trains the critical eye every AI user needs.

**Why it's different from highlight_select:** Highlight_select asks "find this specific thing." Spot the Error asks "find what's WRONG" — a harder, more open-ended cognitive task that requires understanding what "correct" looks like.

**Schema:**
```
{
  type: "spot_the_error"
  instruction: string              // "Select the prompts that contain errors"
  items: [
    {
      id: string
      content: string              // the example to evaluate
      has_error: boolean
      error_explanation: string    // what's wrong (or why it's correct)
      fix_suggestion: string | null // how to fix it (if error)
      error_type: string | null    // category: "missing_context", "vague_role", "hallucination"
    }
  ]
  layout: "grid" | "list"
}
```

**Completion:** All errors correctly identified (and no correct items flagged).

**Tatoma examples:**
- Module 3: Grid of 8 prompts — some well-structured, some with common mistakes (no role, vague task, missing format). "Spot the prompts that need improvement."
- Module 4: Grid of AI outputs — some accurate, some containing subtle hallucinations. "Which outputs should you verify before using?"
- Module 6: Grid of agentic workflow descriptions — some properly structured, some with missing handoff steps.

#### 15. `ranking`
**What it is:** Items that must be ordered according to a specific criterion. Unlike Sequence Builder (which orders steps in a process), Ranking orders by judgment — "most to least effective", "highest to lowest risk."

**Best for:** Comparative analysis, prioritization, evaluating relative quality. The criterion-based judgment is a different cognitive skill than process sequencing.

**Schema:**
```
{
  type: "ranking"
  instruction: string
  criterion: string                // "Rank from most to least effective for getting specific output"
  items: [
    {
      id: string
      label: string
      correct_rank: number         // 0-based position
      explanation: string          // why this rank
    }
  ]
}
```

**Completion:** Correct ranking achieved.

**Tatoma examples:**
- Module 3: "Rank these prompt improvements from most to least impactful: adding specific context, changing the greeting, specifying output format, adding examples of desired output, making the prompt longer."
- Module 5: "Rank these AI tools by suitability for [specific task type]."

#### 16. `two_axis_placement`
**What it is:** A 2D quadrant grid. The employee places items in the correct quadrant based on two dimensions simultaneously. The most cognitively complex mechanic.

**Best for:** Multi-dimensional analysis, trade-off understanding, strategic thinking. Reserve for advanced modules.

**Schema:**
```
{
  type: "two_axis_placement"
  instruction: string
  axes: {
    x_left: string                 // "Low Effort"
    x_right: string                // "High Effort"
    y_bottom: string               // "Low Impact"
    y_top: string                  // "High Impact"
  }
  items: [
    {
      id: string
      label: string
      correct_region: "TL" | "TR" | "BL" | "BR"
      explanation: string          // why this quadrant, reasoning both dimensions
    }
  ]
}
```

**Completion:** All items placed in correct quadrants.

**Mobile note:** This mechanic requires more screen space. On small phones, consider a simplified mode where items are placed one at a time with the quadrant zoomed in. Works best on tablets and desktop.

**Tatoma examples:**
- Module 5: X = "Simple to Complex", Y = "Creative to Analytical" — place AI tools in quadrants
- Module 6: X = "Low Effort to Implement", Y = "Low to High Business Impact" — place agentic workflow use cases to prioritize what to automate first

#### 17. `open_response`
**What it is:** An open text field evaluated by AI. For higher-order thinking that can't be captured by multiple choice.

**Schema:**
```
{
  type: "open_response"
  question: string
  context: string | null
  min_length: number               // minimum chars
  evaluation_criteria: string      // passed to AI evaluator
  example_good_response: string    // reference for evaluator
  max_attempts: number             // default: 2
}
```

**AI Evaluation returns:**
```
{
  quality: "strong" | "partial" | "needs_work"
  feedback: string                 // specific, constructive
  suggestion: string | null        // what to add/improve
}
```

**Completion:** After receiving feedback (any quality level). Feedback IS the learning.

---

### CREATE Activities

The employee applies what they've learned using their own data.

#### 18. `guided_prompt_builder`
**What it is:** Step-by-step prompt construction from the employee's own use case. Each step focuses on one component with guidance and optional AI feedback.

**Schema:**
```
{
  type: "guided_prompt_builder"
  instruction: string
  use_case_source: "selected" | "from_generator" | "manual"
  steps: [
    {
      id: string
      component: string            // "role" | "context" | "task" | "format" | "constraints"
      prompt_text: string
      help_text: string
      placeholder: string
      ai_feedback: boolean
      feedback_criteria: string | null
    }
  ]
  show_assembled_prompt: boolean
  allow_run: boolean
  allow_save_to_library: boolean
}
```

**Flow:**
1. Employee selects a use case (from Use Case Generator if available, or manual entry)
2. For each step: reads guidance → writes input → optionally gets AI feedback
3. Sees the full assembled prompt
4. Runs it → sees result → iterates
5. Saves to library

**Completion:** All steps filled. Running and saving encouraged but not required.

#### 19. `prompt_runner`
**What it is:** The built-in prompt runner as a standalone activity. Fill variables → run → see result → mark done.

**Schema:**
```
{
  type: "prompt_runner"
  instruction: string
  prompt_template: string          // text with {{variables}}
  variables: [
    {
      name: string
      label: string
      placeholder: string
      help_text: string | null
    }
  ]
  pre_run_guidance: string | null
  post_run_reflection: string | null
}
```

**Completion:** Prompt executed at least once.

---

## Part 2: ActivityEnvelope — Shared Wrapper

All 19 activity types share a common envelope structure. This wraps the type-specific schema and provides universal metadata, feedback configuration, and scoring.

```
ActivityEnvelope {
  id: uuid                         // unique identifier (= learning_activities.id)
  type: string                     // one of 19 activity types
  version: "1.0"                   // schema version for migration
  instruction: string              // what the learner should do (duplicated in spec for convenience)
  theme: {
    topic: string | null           // subject matter tag
    difficulty: "easy" | "medium" | "hard"
  }
  spec: { ... }                    // type-specific schema (Part 1)
  feedback: {
    immediate: boolean             // show feedback on each action? (default: true)
    show_solutions: boolean        // allow revealing answers after attempts? (default: true)
    explanations: boolean          // show explanations? (default: true)
    hints: boolean                 // provide hints? (default: true)
    show_progress: boolean         // show completion progress within activity? (default: true)
  }
  scoring: {
    correct: number                // computed after completion
    total: number                  // total possible
  }
}
```

**How this maps to the database:** The `learning_activities.activity_data` JSONB column stores the full envelope. The `activity_type` column on the table duplicates `envelope.type` for indexing and querying without JSONB parsing.

**Universal scoring:** Every activity produces a `{correct, total}` score. For content_card and annotated_example, this is always `{1, 1}` (viewed = complete). For interactive activities, it's the count of correctly answered sub-items vs. total. This enables simple analytics: "employee got 7/10 on the sorting activity."

Scoring is for tracking, not gating. Activities are completion-based — the employee always progresses. The score data is stored in `activity_progress.response_data` for later analysis.

---

## Part 3: Lesson Structure

### From Modules to Lessons

v1 modules = one markdown blob + one exercise. Interactive modules = a **sequence of activities** that follow the observe → identify → evaluate → create arc.

**Data model change:** A module's content is no longer a single `content_md` field. Instead, a module contains an ordered list of activities:

```
learning_activities (
  id               uuid PK
  module_id        uuid FK → learning_modules
  sequence_order   integer
  activity_type    text          -- one of the 19 types
  activity_data    jsonb         -- the ActivityEnvelope
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
  score_correct    integer       -- from scoring
  score_total      integer       -- from scoring
  response_data    jsonb         -- what the employee submitted
  ai_feedback      jsonb         -- AI evaluator response (for open_response)
  created_at       timestamptz
)
```

### Lesson Flow UI

The employee sees a **vertical scroll of activity cards** — not a paginated slideshow. Each activity is a distinct card. The lesson progresses naturally by scrolling, with activities unlocking as previous ones are completed.

```
┌─────────────────────────────────────────────┐
│  MODULE: Prompts Have Parts                 │
│  ████████░░░░░░ 4 of 12 activities          │
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
│  │ [Role] [Context] [Task] [Format]    │    │
│  │ Tap each label to learn more        │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ ✋ HIGHLIGHT SELECT                  │    │
│  │ "Select the CONTEXT in this prompt" │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ 📝 FILL THE GAP                     │    │
│  │ "A prompt starts with a [____] that │    │
│  │  tells AI what perspective to take"  │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ 🔀 SORTING BUCKETS                  │    │
│  │ "Sort these prompt components into  │    │
│  │  the correct category"              │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ 🔒 7 more activities...              │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

### Module Completion

A module is complete when all `is_required` activities are completed. Optional activities can be skipped without blocking progress. The module's `exercise_completed_at` in `employee_progress` is set when the last required activity is completed.

---

## Part 4: Use Case Connection

### Learning From Your Own Work

The 9 modules across 3 paths progressively connect to the employee's real data:

**Module 1** (What AI Does): Generic examples — the employee hasn't done anything yet.

**Module 2** (Find Your Use Cases): The self_report exercise sends them to the Use Case Generator. After this, `personal_use_cases` has data.

**Module 3** (Try, Iterate, Save): The `guided_prompt_builder` activity pulls from the employee's saved use cases:
- "Pick one of your use cases" → dropdown populated from `personal_use_cases` where status = 'discovered'
- The builder pre-fills steps with context from the selected use case
- When they save, the prompt links to the use case (bidirectional)
- When they mark the use case as "Tried", the whole loop closes

**Modules 4-6** (Security): Use generic but realistic workplace scenarios. No personal data connection needed — security training works best with standardized examples everyone evaluates the same way.

**Modules 7-8** (Tool Landscape + Agentic): Reference the employee's saved use cases for context ("which tool fits your use case?") but use generic examples for the core teaching.

**Module 9** (Your AI Action Plan): The capstone. Pulls heavily from the employee's personal data — their use cases, their saved prompts, their progress across modules. This is where everything connects: the employee designs their personal AI strategy using the artifacts they've created throughout the course.

### Dynamic Activity Content

Some activities can reference the employee's data:

```
{
  type: "guided_prompt_builder"
  use_case_source: "from_generator"
  // → UI: "Pick one of your use cases from Discover"
}
```

```
{
  type: "content_card"
  body_md: "In module 2, you discovered {{use_case_count}} use cases. Let's take one and turn it into a working prompt..."
  // → Template variables resolved from employee data at render time
}
```

This is **best-effort** — if the employee hasn't used the Use Case Generator yet, activities fall back to generic examples.

---

## Part 5: AI Evaluation

### Open Response Evaluation

The `open_response` activity sends the employee's text to an AI evaluator. This is NOT a quiz grader — it's a teaching tool.

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

## Part 6: Mechanic Selection Guide

### 9 Modules Across 3 Paths

```
PATH: AI FOUNDATIONS (~1.5h)
  Module 1: What AI Does (and Doesn't)         ~30 min  |  10 activities
  Module 2: Find Your Use Cases                 ~25 min  |   9 activities
  Module 3: Try, Iterate, Save                  ~35 min  |  13 activities

PATH: SECURE AI USAGE (~1.5h)
  Module 4: Data Privacy & What to Share        ~30 min  |   9 activities
  Module 5: Spotting AI Mistakes                ~30 min  |  10 activities
  Module 6: Responsible AI in Practice          ~25 min  |   8 activities

PATH: AI WORKFLOWS (~1.5h)
  Module 7: The AI Tool Landscape               ~30 min  |  10 activities
  Module 8: Agentic Workflows                   ~30 min  |  10 activities
  Module 9: Your AI Action Plan (capstone)      ~30 min  |   9 activities

TOTAL: 9 modules  |  88 activities  |  ~4.5 hours
```

### Which Mechanics For Which Modules

| Module | Phase | Recommended Mechanics |
|--------|-------|----------------------|
| **M1: What AI Does** | Observe | content_card, annotated_example |
| | Identify | multi_match (vocabulary), fill_the_gap (key concepts), associations (AI capability scope) |
| | Evaluate | odd_one_out (which task CAN'T AI do?), binary_stack (accept tasks AI is good at), multiple_choice |
| | Create | — (too early) |
| **M2: Find Your Use Cases** | Observe | content_card |
| | Identify | sorting_buckets (tasks by AI suitability), fill_the_gap (use case characteristics) |
| | Evaluate | binary_stack (is this task suitable for AI?), ranking (rank use cases by AI fit) |
| | Create | prompt_runner (describe a use case), self-report → Use Case Generator |
| **M3: Try, Iterate, Save** | Observe | content_card, annotated_example (prompt anatomy) |
| | Identify | highlight_select (prompt parts), label_parts, fill_the_gap (prompt structure), sequence_builder (refinement cycle) |
| | Evaluate | spot_the_error (find bad prompts), ranking (rank improvements), multiple_choice, open_response |
| | Create | guided_prompt_builder, prompt_runner |
| **M4: Data Privacy** | Observe | content_card |
| | Identify | sorting_buckets (data classification: safe/anonymize/never), fill_the_gap (privacy rules) |
| | Evaluate | binary_stack (safe to share? rapid fire), spot_the_error (prompts with PII), odd_one_out (risky practice) |
| | Create | prompt_runner (practice anonymizing data in prompts) |
| **M5: Spotting Mistakes** | Observe | content_card, annotated_example (annotated hallucination) |
| | Identify | multi_match (error types ↔ descriptions), fill_the_gap (verification practices) |
| | Evaluate | spot_the_error (find hallucinations/bias in outputs), odd_one_out (which "fact" is fabricated?), binary_stack (safe to use without verification?), open_response |
| | Create | prompt_runner (verification prompt) |
| **M6: Responsible AI** | Observe | content_card |
| | Identify | sorting_buckets (appropriate/needs review/never use AI), multi_match (risks ↔ mitigations) |
| | Evaluate | binary_stack (does this use follow responsible practices?), spot_the_error (ethical boundary violations), open_response (advise a colleague) |
| | Create | — (reflection-focused, no creation) |
| **M7: AI Tool Landscape** | Observe | content_card |
| | Identify | multi_match (tools ↔ strengths), sorting_buckets (tasks ↔ tool categories), associations (tool ↔ use cases) |
| | Evaluate | two_axis_placement (tools on complexity/capability axes), ranking (tool suitability), odd_one_out (which tool doesn't fit?) |
| | Create | prompt_runner (same task framed for different tools) |
| **M8: Agentic Workflows** | Observe | content_card, annotated_example (workflow diagram) |
| | Identify | sequence_builder (workflow steps), multi_match (agents ↔ roles), label_parts (workflow components) |
| | Evaluate | spot_the_error (broken handoffs), two_axis_placement (effort vs. impact), ranking (automation priorities) |
| | Create | open_response (design a workflow) |
| **M9: Your AI Action Plan** | Observe | content_card |
| | Identify | sorting_buckets (use cases by priority: quick wins/medium/long-term) |
| | Evaluate | ranking (top use cases by impact), two_axis_placement (effort vs. value matrix) |
| | Create | guided_prompt_builder, prompt_runner, open_response (30-day plan) |

### By Learning Objective

| Objective | Best Mechanics |
|-----------|---------------|
| **Classification & Categorization** | sorting_buckets, associations |
| **Process & Sequencing** | sequence_builder, drag_drop_order |
| **Vocabulary & Terminology** | multi_match, fill_the_gap |
| **Rapid Decision-Making** | binary_stack |
| **Pattern Recognition** | odd_one_out |
| **Critical Analysis & Debugging** | spot_the_error, open_response |
| **Prioritization & Judgment** | ranking, two_axis_placement |
| **Concept Understanding** | annotated_example, highlight_select, label_parts |
| **Applied Creation** | guided_prompt_builder, prompt_runner |

### By Difficulty Level

| Level | Mechanics |
|-------|-----------|
| **Beginner** | content_card, annotated_example, fill_the_gap, multi_match, sorting_buckets, binary_stack |
| **Intermediate** | highlight_select, label_parts, sequence_builder, odd_one_out, multiple_choice, spot_the_error |
| **Advanced** | ranking, associations, two_axis_placement, open_response, guided_prompt_builder |

---

## Part 7: All 9 Lesson Sequences

Every module below is a complete activity sequence. These are the blueprints for content authoring — each activity maps to a type from Part 1 and gets stored as JSONB in `learning_activities`.

---

### Module 1: What AI Does (and Doesn't) — FOUNDATION

**~30 min | 10 activities | No personal data yet — all generic examples**

```
Activity 1: content_card
  "AI isn't magic and it isn't a search engine. It's a language tool —
   exceptionally good at some things, unreliable at others. Let's find out which is which."
  [Visual: simple spectrum from "AI excels" to "AI struggles"]

Activity 2: annotated_example
  Show a prompt ("Rewrite this paragraph in a professional tone") and its output.
  Annotations highlight: what the AI did well (tone, structure, clarity) and what
  it can't know (whether the content is factually correct for your organization).
  "Tap each annotation to understand what AI is actually doing here."

Activity 3: multi_match
  "Match each AI term to its description."
  Left: Hallucination, Token, Context window, Prompt, LLM
  Right: AI generates plausible but false info, Unit of text AI processes,
         Maximum text AI can consider, Your instruction to AI, Large Language Model

Activity 4: fill_the_gap
  "AI is trained on [____] amounts of text from the internet. It predicts the most
   likely [____] word based on patterns, which is why it can sound confident even
   when it's [____]. AI works best for tasks involving [____] like drafting,
   summarizing, and brainstorming."
  Blanks: large/next/wrong/language

Activity 5: associations
  Center: "Tasks AI Excels At"
  Petals: "Drafting emails" (yes), "Summarizing documents" (yes), "Precise calculations" (no),
  "Brainstorming ideas" (yes), "Real-time data lookup" (no), "Reformatting text" (yes),
  "Legal advice" (no), "Translating languages" (yes)

Activity 6: odd_one_out
  Grid of 8 tasks. 6 are things AI handles well. 2 sound plausible but AI is unreliable at them.
  Items: "Rewrite for tone", "Summarize a report", "Calculate exact tax liability",
  "Draft meeting agenda", "Brainstorm product names", "Verify if a fact is true",
  "Write a job description", "Create an outline"
  Pattern reveal: "AI processes language brilliantly but can't guarantee factual
  accuracy or perform precise calculations."

Activity 7: binary_stack
  Rule: "Accept tasks where AI would genuinely save you time and produce good results"
  12 cards: "Draft a follow-up email" → Accept. "Calculate quarterly revenue" → Reject.
  "Summarize a 10-page report" → Accept. "Verify a legal clause is compliant" → Reject.
  "Brainstorm campaign taglines" → Accept. "Write precise technical specs" → Reject.
  [Builds the instinct: language tasks yes, precision/facts tasks no]

Activity 8: multiple_choice
  Context: Shows a prompt asking AI to list "the top 5 competitors for [company]
  with their exact 2024 revenue figures." The output looks confident but some
  numbers are fabricated.
  "What's the main problem with this output?"
  [A] The AI can't access the internet (partial — depends on tool)
  [B] Revenue figures may be hallucinated — AI generates plausible numbers, not verified ones (correct)
  [C] The prompt was too short (wrong — length isn't the issue)
  [D] AI can't understand business topics (wrong — it understands, it just can't verify)

Activity 9: open_response
  "Think about your own work. Name one task where AI would save you meaningful
   time and one task where you'd never trust AI to handle alone. Explain why for each."
  [AI evaluates for: specific examples, correct understanding of AI strengths/limitations]

Activity 10: content_card
  "You now have a mental model for AI: great at language, unreliable at facts.
   That's more than most people. Next: let's find specific tasks in YOUR work
   where AI fits."
  callout: "The key insight: AI is a drafting partner, not a fact-checker."

→ MODULE COMPLETE.
```

---

### Module 2: Find Your Use Cases — FOUNDATION

**~25 min | 9 activities | Ends with Use Case Generator — produces personal data**

```
Activity 1: content_card
  "Generic '101 AI use cases' lists are useless if none of them match your job.
   Let's figure out where AI fits in YOUR daily work."
  [Visual: the "AI lens" — repetitive, language-heavy, pattern-based tasks]

Activity 2: sorting_buckets
  3 categories: "Great for AI" / "Maybe — Depends" / "Not for AI"
  12 workplace tasks: "Drafting status update emails" → Great. "Approving budget allocations" → Not.
  "Summarizing meeting notes" → Great. "Making hiring decisions" → Not.
  "Reformatting a report for a different audience" → Great.
  "Reviewing legal contracts for compliance" → Maybe.
  [Per-item feedback explains the reasoning]

Activity 3: fill_the_gap
  "The best AI use cases share three characteristics: the task is [____] (you do it
   often), it's [____]-heavy (involves writing, reading, or reformatting), and the
   output doesn't require [____] accuracy (a draft is fine, you'll review it)."
  Blanks: repetitive/language/perfect

Activity 4: binary_stack
  Rule: "Accept tasks that are good candidates for AI automation"
  10 cards mixing obvious AI fits with common traps.
  "Writing first drafts of client proposals" → Accept.
  "Deciding which candidates to interview" → Reject.
  "Summarizing competitor website changes" → Accept.
  "Signing off on financial statements" → Reject.

Activity 5: ranking
  "Rank these tasks by how much time AI could realistically save you."
  Items: "Rewriting an email in a different tone" (fast — minutes),
  "Summarizing a 20-page report" (significant — 30+ min saved),
  "Brainstorming 10 taglines" (moderate — 15 min saved),
  "Reformatting data into a table" (fast — minutes),
  "Researching a topic and writing a brief" (significant — hours saved)

Activity 6: multiple_choice
  "Which description makes the strongest AI use case?"
  [A] "I sometimes need to write things" (too vague)
  [B] "Every Monday I spend 45 minutes summarizing 5 team updates into one exec
       summary — it's always the same format" (correct — specific, repetitive, language-heavy)
  [C] "I want AI to make decisions about our product roadmap" (wrong — judgment, not language)
  [D] "I occasionally need to calculate quarterly projections" (wrong — math, not language)
  Feedback per option explaining what makes a use case strong.

Activity 7: content_card
  "Now that you know what makes a good AI use case, let's find yours.
   The Use Case Generator will walk you through your actual role and tasks
   to discover where AI fits in your work."
  callout: "You'll save at least 2 use cases — these follow you through the rest of the course."

Activity 8: prompt_runner
  Template: "I work as a {{your_role}}. A task I do regularly that involves a lot of
  writing, reading, or reformatting is: {{describe_task}}. I usually spend about
  {{time_spent}} on this task each time."
  pre_run_guidance: "Try describing one of your tasks to see how AI would frame it as a use case."
  post_run_reflection: "Did the AI understand your task? This is what the Use Case Generator does — but more thoroughly."

Activity 9: content_card
  "Time to do the real thing. Open the Use Case Generator (Discover section)
   and complete the wizard. Save at least 2 use cases that resonate with your work."
  [CTA: "Open Use Case Generator" + "Mark as Done" when they return]

→ MODULE COMPLETE.
```

---

### Module 3: Try, Iterate, Save — FOUNDATION (Culmination)

**~35 min | 13 activities | Heaviest module — produces real prompts and use case updates**

```
Activity 1: content_card
  "You've discovered use cases. Now let's turn one into a working prompt."
  [Short explanation of the 4-part prompt structure with a visual]

Activity 2: annotated_example
  [A complete prompt with Role/Context/Task/Format annotated and color-coded]
  "This is what a well-structured prompt looks like. Tap each label to learn more."

Activity 3: fill_the_gap
  "A well-structured prompt includes a [____] that tells the AI what perspective
   to take, [____] that provides specific details about your situation, a clear
   [____] describing what you need, and a [____] specifying how the output should look."
  Options per blank: role/context/task/format plus distractors

Activity 4: highlight_select
  "Here's a new prompt. Select the ROLE."
  [Employee highlights the role section]

Activity 5: highlight_select
  "Now select the CONTEXT."
  [Employee highlights the context section]

Activity 6: spot_the_error
  Grid of 8 prompts — 5 well-written, 3 with common mistakes (missing context,
  vague role, no format specified).
  "Select the prompts that need improvement."
  [Feedback per item explains what's wrong and how to fix it]

Activity 7: multiple_choice
  "This prompt generated a generic, bland report. What's most likely missing?"
  [Options with per-option feedback explaining why context and format matter]

Activity 8: ranking
  "Rank these prompt improvements from most to least impactful for getting better output."
  Items: Add specific context > Add examples of desired output > Specify output format >
         Change the greeting > Make the prompt longer

Activity 9: open_response
  "Look at this prompt and its output. What specific context would you add to make
   the output more useful for the employee's team?"
  [AI evaluates — looking for specificity, actionable suggestions]

Activity 10: content_card
  "Now it's your turn. Let's build a prompt for one of YOUR use cases."
  [Transition card preparing for creation phase]

Activity 11: guided_prompt_builder
  use_case_source: "from_generator"
  [Step by step: role → context → task → format, with AI feedback at each step]
  [Assembles the full prompt → employee runs it → sees result]

Activity 12: prompt_runner
  [Employee iterates — adds more context, refines, runs again]
  post_run_reflection: "How does this compare to doing this task manually?"

Activity 13: content_card
  "You just built, tested, and refined a prompt with your own data.
   Save it to your library — it's yours."
  [CTA: "Save to Prompt Library" + "Mark Use Case as Tried"]

→ MODULE COMPLETE. Foundation done.
```

---

### Module 4: Data Privacy & What to Share — SECURITY

**~30 min | 9 activities | The sorting/binary stack core**

```
Activity 1: content_card
  "You know how to use AI. Now let's make sure you use it safely.
   The first rule: not everything belongs in a prompt."
  [Visual: data classification spectrum — public → internal → confidential → restricted]

Activity 2: content_card
  "When you type something into an AI tool, where does it go? It depends on the tool.
   Consumer tools (free ChatGPT) may use your input for training. Enterprise tools
   (your organization's approved tools) typically don't. But even with enterprise tools,
   some data should never leave your organization's systems."
  callout: "When in doubt, leave it out."

Activity 3: sorting_buckets
  3 categories: "Safe to Share" / "Anonymize First" / "Never Share with AI"
  15 data items, progressive reveal (5 at a time):
  Batch 1: "Public product features" → Safe. "Customer full names and emails" → Anonymize.
  "Internal salary bands" → Never. "Industry benchmark stats" → Safe.
  "Employee performance reviews" → Never.
  Batch 2-3: mix of trickier items — anonymized revenue trends (Safe), client contract
  terms (Never), job posting text (Safe), proprietary pricing model (Never), etc.

Activity 4: binary_stack
  Rule: "Accept data that is safe to include in an AI prompt without modification"
  12 cards, rapid fire:
  "Anonymized quarterly revenue trends" → Accept.
  "Customer's full email thread" → Reject.
  "Public job posting text" → Accept.
  "Internal strategy document" → Reject.
  "Generic industry statistics" → Accept.
  "Employee's medical leave details" → Reject.
  [Speed builds the reflex]

Activity 5: fill_the_gap
  "Before including customer data in an AI prompt, you should [____] any personally
   identifiable information. AI providers may use your input for [____], so never
   include [____] information. The safest approach is [____] minimization — only
   share what the AI actually needs to do its job."
  Blanks: anonymize/training/confidential/data

Activity 6: spot_the_error
  Grid of 8 prompts. Some are properly anonymized, some contain security risks:
  "Summarize this email from John Smith at Acme Corp (john@acme.com) about..." → Error (PII).
  "Summarize this email from a client about their Q4 budget concerns..." → Correct.
  "Our internal pricing: Enterprise $50k, Growth $25k, Starter $10k. Draft a..." → Error (proprietary).
  [Feedback shows how to fix each one]

Activity 7: odd_one_out
  Grid of 7 data handling practices. 6 follow data minimization. 1 doesn't.
  "Which practice doesn't belong?"
  "Remove names before pasting" ✓, "Use role descriptions instead of names" ✓,
  "Include extra context just in case the AI needs it" ✗ (the odd one),
  "Summarize rather than paste full documents" ✓, etc.
  Pattern reveal: "Data minimization means only sharing what the AI needs. Extra
  context 'just in case' is how sensitive data leaks into prompts."

Activity 8: open_response
  "Your colleague wants to paste a customer's full email thread into AI to draft
   a response. What would you tell them?"
  [AI evaluates for: mentions anonymization, data minimization, checking org policy]

Activity 9: prompt_runner
  Template: a prompt that needs customer data, with pre-anonymized variable placeholders.
  "Practice writing a prompt about {{customer_situation}} without revealing any
   personally identifiable information. Use {{customer_role}} instead of names."
  post_run_reflection: "Was the output still useful with anonymized data? That's the point."

→ MODULE COMPLETE.
```

---

### Module 5: Spotting AI Mistakes — SECURITY

**~30 min | 10 activities | Hallucinations, bias, the critical review habit**

```
Activity 1: content_card
  "AI doesn't know when it's wrong. It produces every answer with the same
   confident tone — whether it's perfectly accurate or completely fabricated.
   Your job is to know the difference."
  callout: "AI is a drafting partner, not a source of truth."

Activity 2: annotated_example
  An AI-generated paragraph about a company's Q3 performance. Annotations highlight:
  - A plausible but fabricated statistic (hallucination)
  - A correctly summarized trend (reliable)
  - An overly confident prediction (speculation presented as fact)
  - A biased framing (subtle bias in language choice)
  "Tap each annotation. Not everything wrong is obvious."

Activity 3: multi_match
  "Match each AI error type to its description."
  Left: Hallucination, Confident speculation, Bias, Outdated information, Fabricated sources
  Right: AI invents plausible but false facts, Prediction stated as certainty,
  Systematic skew in framing or representation, Training data has a cutoff date,
  AI generates fake citations that look real

Activity 4: fill_the_gap
  "When AI presents a specific [____] or statistic, always verify it against a
   [____] source. AI can also produce [____] sources — citations that look real
   but don't exist. The safest habit: treat every AI output as a [____] that
   needs your review, not a finished product."
  Blanks: fact/primary/fabricated/draft

Activity 5: spot_the_error
  Grid of 10 AI-generated statements (presented as "AI wrote these about your industry"):
  Mix of accurate statements and hallucinations/bias/outdated info.
  6 correct, 4 with errors of different types.
  "Select the statements you should verify before using."
  [Feedback per item: what's wrong, what error type, how to check]

Activity 6: odd_one_out
  Grid of 7 AI-generated "facts." 6 are accurate (verifiable). 1 is a hallucination
  that sounds equally plausible.
  "Which fact would you want to double-check?"
  Pattern reveal: "The others are well-established facts. [X] sounds right but is
  actually fabricated — AI generated a plausible number that doesn't match reality."

Activity 7: binary_stack
  Rule: "Accept AI outputs that are safe to use in a professional document without verification"
  12 cards: "A rewritten paragraph in professional tone" → Accept (style, not facts).
  "A list of the top 5 competitors with market share percentages" → Reject (verify numbers).
  "A brainstormed list of meeting agenda topics" → Accept (ideas, not facts).
  "A summary claiming 'revenue grew 23% in Q3'" → Reject (verify specific claim).
  "An email draft following your outline" → Accept (your content, AI's style).
  "A paragraph citing 'a 2024 Harvard Business Review study'" → Reject (citation may be fabricated).

Activity 8: multiple_choice
  Context: Shows an AI output that contains a subtle bias — e.g., when asked to
  describe leadership qualities, the AI defaults to stereotypically masculine traits.
  "What's the issue with this output?"
  [A] It's a hallucination (no — the traits are real, just skewed)
  [B] It reflects bias in the AI's training data (correct)
  [C] The prompt was too short (no — length isn't the issue)
  [D] AI can't understand leadership (no — it understands, it just mirrors biased patterns)

Activity 9: open_response
  "You receive an AI-generated report that includes three specific statistics and
   two citations. What's your verification process before sharing this with your team?"
  [AI evaluates for: checking stats against primary sources, verifying citations exist,
   flagging any claims that seem too specific/precise, mentioning AI disclosure]

Activity 10: prompt_runner
  Template: "Review this AI-generated text and identify any claims that need verification:
  {{ai_generated_text}}. For each claim, explain what source you would check and why."
  pre_run_guidance: "This prompt turns AI into a self-checker. It's not perfect, but
  it's a useful first pass."
  post_run_reflection: "AI can sometimes catch its own mistakes when asked to review.
  But your judgment is still the final filter."

→ MODULE COMPLETE.
```

---

### Module 6: Responsible AI in Practice — SECURITY

**~25 min | 8 activities | When NOT to use AI, ethical use, org compliance**

```
Activity 1: content_card
  "You know what data to protect and how to spot mistakes. Now: when should
   you not use AI at all — even if you could?"
  [Visual: decision tree — Is this task appropriate for AI?]

Activity 2: sorting_buckets
  3 categories: "Appropriate for AI" / "Use AI with Human Review" / "Never Use AI Alone"
  12 scenarios:
  "Drafting a blog post outline" → Appropriate.
  "Writing a performance review for a direct report" → Never (requires personal judgment + empathy).
  "Summarizing customer feedback themes" → Appropriate.
  "Making a hiring decision based on resumes" → Never (bias risk, legal implications).
  "Drafting a response to a client complaint" → With Review (tone matters, facts must be right).
  "Generating ideas for a team offsite" → Appropriate.
  [Per-item feedback explains the ethical reasoning]

Activity 3: multi_match
  "Match each AI risk to its mitigation strategy."
  Left: Hallucination risk, Bias in outputs, Privacy breach, Over-reliance, Lack of transparency
  Right: Always verify facts against sources, Review for balanced representation,
  Anonymize data before input, Maintain human judgment for decisions,
  Disclose when AI was used in the process

Activity 4: binary_stack
  Rule: "Accept uses of AI that follow responsible practices"
  10 cards:
  "Using AI to draft an email, then reviewing before sending" → Accept.
  "Letting AI decide which job applicants to interview" → Reject.
  "Using AI to summarize a meeting, then sharing without disclosure" → Reject.
  "Using AI to brainstorm, then selecting ideas yourself" → Accept.
  "Pasting a colleague's private message into AI for analysis" → Reject.
  "Using AI to proofread your own writing" → Accept.

Activity 5: spot_the_error
  Grid of 8 workplace AI use scenarios. Some are responsible, some cross ethical lines:
  "Ran customer survey through AI for theme analysis" → Fine.
  "Used AI to write a performance review and submitted it as-is" → Error (no human review, not transparent).
  "Asked AI to help brainstorm solutions, picked the best one myself" → Fine.
  "Fed a colleague's private Slack messages into AI to summarize their position" → Error (privacy).
  [Feedback per item with ethical reasoning]

Activity 6: fill_the_gap
  "When using AI in your work, you should always [____] the output before sharing it.
   If AI contributed significantly to a deliverable, it's good practice to [____] that
   AI was used. For decisions that affect [____], human judgment should always be the
   final authority. Your organization's AI [____] provides specific guidelines for your context."
  Blanks: review/disclose/people/policy

Activity 7: open_response
  "A colleague says: 'I used AI to write the entire client proposal and sent it
   without reviewing it. It saved me hours!' What would you tell them about
   the risks of this approach?"
  [AI evaluates for: mentions review step, quality risks, hallucination risk,
   transparency with client, professional responsibility]

Activity 8: content_card
  "Responsible AI use isn't about fear — it's about confidence. You now know
   what data to protect, how to spot mistakes, and when human judgment matters most.
   Use AI boldly, but use it wisely."
  callout: "Check your organization's AI policy for specific guidelines that apply to your role."

→ MODULE COMPLETE. Security path done.
```

---

### Module 7: The AI Tool Landscape — ADVANCED

**~30 min | 10 activities | Maps the ecosystem, matches tools to tasks**

```
Activity 1: content_card
  "There's no single 'best AI tool' — different tools excel at different things.
   Knowing which tool to reach for is like knowing which app to use: you wouldn't
   use a spreadsheet to write a report."
  [Visual: AI tool categories — Conversational, Research, Image, Code, Productivity, Specialized]

Activity 2: multi_match
  "Match each AI tool to its primary strength."
  Left: ChatGPT/Claude, Perplexity, Midjourney/DALL-E, GitHub Copilot, Copilot for 365
  Right: General-purpose conversation and drafting, Research with cited sources,
  Image generation from text, Code completion and generation,
  AI embedded in Office documents

Activity 3: sorting_buckets
  4 categories: "Conversational AI" / "Research Tools" / "Creative Tools" / "Productivity Tools"
  12 tasks:
  "Draft a project proposal" → Conversational. "Find recent stats with sources" → Research.
  "Create a presentation visual" → Creative. "Summarize a Word document" → Productivity.
  "Brainstorm product names" → Conversational. "Generate a logo concept" → Creative.
  "Research competitor pricing" → Research. "Auto-format a spreadsheet" → Productivity.

Activity 4: associations
  Center: "ChatGPT / Claude" (conversational AI)
  Petals: "Drafting emails" (yes), "Real-time stock prices" (no), "Brainstorming" (yes),
  "Image generation" (no — different tool), "Code review" (yes), "Cited research" (no — use Perplexity),
  "Summarizing documents" (yes), "Video editing" (no)
  [Teaches the boundaries of conversational AI]

Activity 5: two_axis_placement
  X: "Simple Tasks ←→ Complex Tasks"
  Y: "Creative ←→ Analytical"
  Items: "ChatGPT" → TR (complex, slightly creative). "Perplexity" → TR (complex, analytical).
  "DALL-E" → TL (simple input, creative). "Copilot for 365" → BL (simple, analytical).
  "GitHub Copilot" → BR (complex, analytical).
  [Teaches that tools occupy different spaces — no single tool does everything]

Activity 6: odd_one_out
  Grid of 7 tools presented for "research tasks with citations."
  6 are plausible research tools (Perplexity, Google Scholar, etc.).
  1 is great at language but bad at citations (e.g., standard ChatGPT without browsing).
  Pattern reveal: "Conversational AI generates plausible text but doesn't inherently
  verify or cite sources. For research with citations, use tools built for that."

Activity 7: ranking
  "For the task 'Research competitor landscape and write a 1-page brief,' rank
   these approaches from most to least effective."
  Items: Use Perplexity for research then Claude/ChatGPT for drafting > Use Claude/ChatGPT
  for everything > Use only Google search and write manually > Ask AI to generate the
  brief without any research step > Copy from a competitor's website
  [Teaches tool chaining — using the right tool for each step]

Activity 8: multiple_choice
  "Your team needs to create 10 social media image concepts for a campaign launch.
   Which approach makes the most sense?"
  [A] Ask ChatGPT to describe the images in text (partial — no visuals)
  [B] Use Midjourney/DALL-E for initial concepts, then refine with design team (correct)
  [C] Use Copilot for 365 to generate PowerPoint slides (wrong tool for the job)
  [D] Use Perplexity to research what competitors posted (useful but doesn't create images)

Activity 9: prompt_runner
  Template: "I need to {{task_description}}. Compare how you would approach this versus
  how a specialized tool like {{alternative_tool}} would approach it. What are your
  strengths and limitations for this specific task?"
  pre_run_guidance: "This prompt asks AI to be honest about its own limitations — a useful technique."
  post_run_reflection: "AI can help you decide which tool to use, including when NOT to use it."

Activity 10: content_card
  "You now have a mental map of the AI tool landscape. The key: match the tool to the
   task, chain tools together for complex work, and don't force one tool to do everything."
  callout: "Ask your organization which tools are approved for your context."

→ MODULE COMPLETE.
```

---

### Module 8: Agentic Workflows — ADVANCED

**~30 min | 10 activities | Multi-step AI, agents, where things are heading**

```
Activity 1: content_card
  "So far, every AI interaction has been one prompt → one response. But AI is
   evolving beyond single turns. Agentic AI can take multiple steps, use tools,
   and work through complex tasks with minimal hand-holding."
  [Visual: Single prompt vs. Agentic workflow — prompt is a question, agent is a mission]

Activity 2: annotated_example
  A multi-step agentic workflow annotated:
  "Research competitors → Analyze pricing → Draft comparison → Format as presentation"
  Annotations: "Trigger" (what starts the workflow), "Steps" (sequential actions),
  "Handoffs" (where one step's output feeds the next), "Human checkpoint" (where you review),
  "Output" (final deliverable)

Activity 3: sequence_builder
  "Arrange these agentic workflow steps in the correct order."
  Steps (scrambled): "Define the goal and constraints" → "Break the task into steps" →
  "Assign each step to the right tool or agent" → "Define handoffs between steps" →
  "Set human review checkpoints" → "Run and monitor" → "Review and iterate on the output"
  [Transition explanations: why defining before assigning, why checkpoints before running]

Activity 4: label_parts
  A workflow diagram with blank labels.
  Source: "[ ] → Research market data → [ ] → AI drafts summary → [ ] → Human reviews →
  [ ] → Final report published"
  Labels to assign: "Trigger event", "Data collection agent", "Handoff to writing agent",
  "Human checkpoint", "Output delivery"

Activity 5: multi_match
  "Match each agentic concept to its role in a workflow."
  Left: Trigger, Agent, Handoff, Checkpoint, Guardrail, Output
  Right: What starts the workflow, AI that executes a specific step,
  Where one step passes results to the next, Where a human reviews before continuing,
  Rules that prevent the AI from going off-track, The final deliverable

Activity 6: spot_the_error
  Grid of 8 agentic workflow descriptions. Some are well-designed, some have critical flaws:
  "Research → Draft → Send to client" → Error (no human review before sending).
  "Research → Summarize → Human reviews → Revise → Publish" → Correct.
  "Analyze data → Make budget decision → Implement" → Error (AI making financial decisions).
  "Monitor inbox → Categorize → Draft responses → Human approves → Send" → Correct.
  [Feedback explains why each flaw matters]

Activity 7: ranking
  "Rank these tasks by how well-suited they are for agentic automation."
  Items: "Monitor news and summarize daily" (excellent — repetitive, multi-step, low-stakes) >
  "Research → analyze → draft a weekly report" (good — structured, reviewable) >
  "Process incoming requests and route to teams" (good — classifiable, rule-based) >
  "Write creative marketing copy for a new product" (moderate — needs more human direction) >
  "Negotiate contract terms with a vendor" (poor — requires judgment, empathy, strategy)

Activity 8: two_axis_placement
  X: "Low Effort to Implement ←→ High Effort"
  Y: "Low Business Impact ←→ High Business Impact"
  Items: "Auto-summarize daily news" → TL (low effort, moderate impact).
  "Build a full research → report pipeline" → TR (high effort, high impact).
  "Auto-categorize incoming emails" → BL (low effort, low impact — nice-to-have).
  "Automate quarterly financial analysis" → TR (high effort, high impact).
  "Auto-format meeting notes" → BL (low effort, low impact).
  [Teaches prioritization: start with top-left (low effort, high impact)]

Activity 9: open_response
  "Pick one of your use cases that involves multiple steps. Design an agentic
   workflow for it: what's the trigger, what are the steps, where does AI handle
   things vs. where do you review? Don't worry about whether the tools exist yet."
  [AI evaluates for: clear trigger, logical step sequence, appropriate human checkpoints,
   realistic scope, understanding of AI vs. human responsibilities]

Activity 10: content_card
  "Agentic AI is where things are heading. The employees who can think in workflows
   — breaking complex tasks into steps, knowing where AI fits and where humans
   must stay in the loop — will get the most value as these tools mature."
  callout: "You don't need to build agents today. But thinking in workflows already makes
  your single-prompt use cases more effective."

→ MODULE COMPLETE.
```

---

### Module 9: Your AI Action Plan — ADVANCED (Capstone)

**~30 min | 9 activities | Personal strategy using everything learned**

```
Activity 1: content_card
  "You've learned what AI can do, built prompts, understood security, explored
   tools, and thought about workflows. Now: what's YOUR plan? Let's turn
   everything you've learned into a personal AI strategy for your work."
  callout: "This is your graduation project. By the end, you'll have a concrete action plan."

Activity 2: sorting_buckets
  3 categories: "Quick Wins (this week)" / "Medium Projects (this month)" / "Long-Term Bets (this quarter)"
  Items pulled from the employee's saved use cases (if available), or generic examples:
  "Draft email templates for common responses" → Quick Win.
  "Build a weekly report summarization workflow" → Medium.
  "Design an agentic pipeline for competitor monitoring" → Long-Term.
  [If personal data available: "Your use case: '{{use_case_title}}'" with the employee deciding]

Activity 3: ranking
  "Rank your top use cases by impact on your daily work."
  Items: either the employee's real use cases or generic examples representing
  different impact levels. The ranking teaches prioritization.
  [Criterion: "Which would save you the most time or produce the most value if you
   implemented it this week?"]

Activity 4: two_axis_placement
  X: "Easy to Start ←→ Requires Setup"
  Y: "Low Daily Impact ←→ High Daily Impact"
  Items: 6 use case archetypes (or employee's real ones):
  "Email drafting shortcuts" → TL (easy, high impact — start here).
  "Meeting note summarization" → TL (easy, high impact).
  "Custom research workflow" → TR (needs setup, high impact).
  "Auto-formatting reports" → BL (easy, low impact — nice-to-have).
  "Full agentic analysis pipeline" → BR (hard, moderate impact — defer).
  [The quadrant becomes their prioritization matrix]

Activity 5: sequence_builder
  "Arrange the steps to integrate AI into your daily workflow."
  Steps: "Pick your #1 quick-win use case" → "Write or refine a prompt for it" →
  "Test it with real data from your work" → "Save the working prompt to your library" →
  "Use it for a full week and note what to improve" → "Iterate based on real usage" →
  "Share what worked with your team"
  [Transition explanations: why testing before saving, why a full week before iterating]

Activity 6: guided_prompt_builder
  use_case_source: "from_generator"
  instruction: "Build your best prompt yet. Pick your top-priority use case and
  craft a prompt you'll actually use starting tomorrow."
  [Full builder: role → context → task → format → constraints]
  allow_run: true
  allow_save_to_library: true

Activity 7: prompt_runner
  [Employee runs their prompt, iterates one more time]
  post_run_reflection: "This prompt is now a real tool in your library. How will
  you remember to use it tomorrow? What's the trigger in your workflow?"

Activity 8: open_response
  "Write your 30-day AI action plan. Include: (1) Which use case you'll start with
   this week, (2) What tool(s) you'll use, (3) How you'll measure if it's working,
   (4) What you'll try next month. Be specific."
  [AI evaluates for: specificity, realistic scope, includes measurement,
   builds on what they learned, references their actual use cases]

Activity 9: content_card
  "You started this course wondering what AI could do. You're finishing it with
   real use cases, real prompts in your library, and a plan for what's next.
   That's not certification — that's capability."
  [CTA: "Complete Path" → triggers certificate]
  callout: "Your certificate is ready. But more importantly — your prompts and use cases are
  waiting for you in the platform. Use them."

→ COURSE COMPLETE. Certificate awarded.
```

---

## Part 8: Content Authoring

### How Activities Are Created

Activities are defined as JSONB in the `learning_activities` table. Content authors create them through the Workbench admin interface.

**Workbench authoring UI (minimal for v1):**
- Select activity type from dropdown (19 types, grouped by phase)
- Fill in the type-specific fields (structured form, not raw JSON)
- Configure the ActivityEnvelope feedback settings
- Preview the activity as the employee would see it
- Reorder activities within a module via drag-and-drop

**No visual WYSIWYG editor** — the authoring interface is functional, not pretty. It's for internal use (co-founders, consultants), not end users.

### AI-Assisted Content Generation (Future)

Like Sana Learn's approach: upload a concept outline → AI generates a draft set of activities covering the full arc. Content author reviews and refines. Out of scope for v1 but the structured JSONB schemas support it.

---

## Part 9: Migration from v1 Modules

The interactive engine doesn't break v1 modules. It extends the system:

- v1 modules with `content_md` + exercise render as before (backward compatible)
- Modules with `learning_activities` render using the interactive engine
- A module has EITHER `content_md` (v1 style) OR `learning_activities` (interactive), not both
- Migration: existing modules progressively converted from markdown to interactive activities

**The `learning_modules` table gets a new field:**
```
learning_modules (
  ...existing fields...
  content_type    text    -- "markdown" (default, v1) | "interactive" (v2)
)
```

When `content_type = "interactive"`, the module renderer loads activities from `learning_activities` instead of rendering `content_md`.

---

## Part 10: Graceful Degradation

| Failure | Fallback |
|---------|----------|
| **AI evaluation fails** (open_response) | Show generic "Thanks for your response" and mark complete. Log for retry. |
| **Use case data not available** (guided_prompt_builder) | Fall back to manual input: "Describe a task you do regularly." |
| **Activity data malformed** | Skip the activity, show next. Log error. Never block progress. |
| **Drag-based mechanic on limited device** (sorting_buckets, ranking, sequence_builder, two_axis_placement) | Fall back to tap-to-select: show item, show options, tap correct target. |
| **Highlight/drag doesn't work** (mobile, accessibility) | Fall back to multiple_choice equivalent. |
| **Two-axis placement on small screen** | Switch to sequential placement: show one item at a time, present 4 quadrant buttons. |
| **Employee skips optional activities** | Module still completable. Progress shows "X of Y" but only required activities gate completion. |

---

## Part 11: What's Explicitly Out of Scope

- **Collaborative/social activities** — no peer discussion, no live sessions. Individual learning only.
- **Adaptive AI tutor** — no free-form chat tutor. Activities are structured.
- **Gamification** — no XP, points, streaks, leaderboards. Engagement from relevance and interactivity.
- **Timed activities** — no countdown timers. Learning, not testing.
- **Branching paths** — activities are linear within a module. No adaptive remediation.
- **Video-based activities** — videos can embed in content cards, no "watch and answer" types.
- **Activity template marketplace** — no sharing across organizations.
- **Rich text authoring UI** — Workbench authoring is functional/JSON-based.

---

## Part 12: Success Criteria

| Metric | Target | How to measure |
|--------|--------|----------------|
| Activities feel interactive | >70% of module time on interactive activities (not content cards) | Time tracking per activity type |
| Touch interactions work reliably | >90% of drag/swipe/tap activities completed without UI issues | Error logging + activity_progress completion rates |
| AI evaluation is useful | >60% of "partial"/"needs_work" feedback leads to retry with improvement | Retry rate + quality change in activity_progress |
| Use case connection works | >50% of Module 3 completions use a real use case from generator | guided_prompt_builder response_data |
| Prompt saved to library | >40% of Module 3 completions result in a saved prompt | Link between activity completion and prompt creation |
| Security reflexes build | Binary stack average score improves >20% from first to last attempt | score_correct/score_total in activity_progress |
| Module completion rate improves over v1 | Interactive modules have higher completion than markdown modules | A/B comparison |
| Variety maintains engagement | No single activity type accounts for >30% of a module's activities | Content audit |

---

## Part 13: Implementation Notes for Claude Code

1. **This extends the Academy Engine, not replaces it.** The `learning_activities` table and `activity_progress` table are additions. The existing `learning_modules` table gets `content_type`. v1 modules continue to work.

2. **19 activity types = 19 React components, 88 total activities across 9 modules.** Each renders from its JSONB schema and handles interaction + completion. Think card-based component system. Group by phase for code organization:
   - `activities/observe/` — ContentCard, AnnotatedExample
   - `activities/identify/` — HighlightSelect, LabelParts, SortingBuckets, SequenceBuilder, FillTheGap, MultiMatch, Associations, DragDropOrder
   - `activities/evaluate/` — MultipleChoice, BinaryStack, OddOneOut, SpotTheError, Ranking, TwoAxisPlacement, OpenResponse
   - `activities/create/` — GuidedPromptBuilder, PromptRunner

3. **Shared interaction patterns:** Several mechanics share drag-and-drop (sorting_buckets, sequence_builder, ranking, drag_drop_order, two_axis_placement). Build a shared `useDragInteraction` hook that all of these compose. Similarly, tap-to-select is shared by multi_match, associations, odd_one_out, spot_the_error.

4. **Binary stack swipe interaction** needs a card stack UI with swipe gestures. Look at Tinder-style card libraries. Keyboard support: A = reject, D = accept (or left/right arrows).

5. **Two-axis placement** is the trickiest component. Needs a zoomable quadrant grid where items can be dragged to positions. On mobile, consider the sequential fallback (one item at a time, 4 quadrant buttons).

6. **AI evaluation** follows the same provider pattern as the Prompts app and Use Case Generator. Rate limit evaluations reasonably.

7. **Use case connection** requires querying `personal_use_cases` for the current user. The `guided_prompt_builder` with `use_case_source: "from_generator"` fetches use cases, lets them select one, and pre-populates builder steps.

8. **The authoring UI in Workbench** should group the 19 types by phase in a dropdown. Each type gets a structured form (not raw JSON). Preview capability is important — content authors need to see what the employee will experience.

9. **Feature flag** — same `feature-learn` flag. Interactive modules only render if enabled; otherwise fall back to markdown if available.

10. **i18n-ready** — all text fields in activity schemas support localized strings when multi-language is added. JSONB schemas should be ready for this.

11. **Accessibility** — all mechanics need keyboard alternatives. Minimum: tab-navigate to elements, enter/space to select. Drag mechanics fall back to arrow-key reordering. Screen reader announcements for state changes (correct/incorrect, progress updates). WCAG AA compliance (4.5:1 contrast).

12. **ActivityEnvelope validation** — when loading activities from JSONB, validate the envelope structure and type-specific schema. Malformed activities should be skipped gracefully (Part 10), never crash the lesson.

13. **Score tracking** — `activity_progress` now includes `score_correct` and `score_total` columns. Populated from the ActivityEnvelope scoring after each activity completion. This is for analytics only — scores don't gate progression.

14. **Mobile-first build order:** Start with the ★★★★★ mobile-rated mechanics (binary_stack, sorting_buckets, odd_one_out, multi_match, fill_the_gap) since they're the most touch-natural. Build ★★★★☆ next (sequence_builder, associations, ranking, spot_the_error). Save ★★★☆☆ (two_axis_placement) for last — it needs the most mobile adaptation.
