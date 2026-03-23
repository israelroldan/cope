# Worktree Brief: Academy Learning — Engine + Content

**Roadmap ID:** Sprint 3 (Learn v1) / Sprint 4 (Interactive v2)
**Priority:** P0 | **Workstream:** Studio Experience
**Status:** Ready for implementation (after Academy Engine is built)
**Design doc:** [Learn v1 Design](./learn-v1-design.md) (v14)
**Depends on:** Academy Engine (worktree-academy-engine.md), Use Case Generator (implemented), Prompt Library (shipped)
**Reference platforms:** ProfAI (use-case-driven AI coaching), SoloLearn (micro-exercises + immediate execution), Sana Learn (17+ interactive card types)

### Version History

| Version | Date | Changes |
|---------|------|---------|
| v1 | 2026-02-25 | Initial brief — interactive learning activity system replacing static markdown. 9 activity types, progressive lesson structure (observe → identify → evaluate → create), use-case-connected learning, AI-evaluated open responses. |
| v2 | 2026-02-25 | Expanded to 19 activity types. Added 10 interactive mechanics from Tatoma learning format design: sorting buckets, sequence builder, binary stack, odd one out, spot the error, associations, fill the gap, ranking, multi match, two-axis placement. Introduced shared ActivityEnvelope wrapper. Added mechanic selection guide mapped to modules. |
| v3 | 2026-02-25 | Restructured to 9 modules across 3 paths (~1.5h each). Expanded Security from 1 module to 3 (Data Privacy, Spotting Mistakes, Responsible AI). Added capstone Module 9 (Your AI Action Plan). Full activity sequences for all 9 modules. Revised time estimates: ~4.5h total. |
| v4 | 2026-02-25 | Merged interactive learning engine + academy content worktrees into single document. Each module now includes learning objectives, content direction, and exit states alongside its activity sequence. Single handoff document for Sprint 3. |
| **v5** | **2026-02-25** | **Adopted Course → Lesson → Activity content hierarchy (aligned with LMS standards). Renamed "Learning Path" → "Course", "Module" → "Lesson" throughout. Added composition layer: Learning Paths reference Courses or Lessons for TL-configured delivery. Updated data model to match implemented schema (learning_courses, learning_lessons, learning_activities). Ready for LMS export mapping (Course=SCORM Course, Lesson=SCO/AU, Activity=Interaction).** |

---

## The Core Idea

v1 Academy lessons are markdown articles with an exercise at the end. That's "corporate training" — read something, do a thing, check a box. It works as a foundation but it doesn't teach. Not really.

Interactive learning is different. Instead of *reading about* prompt structure, the employee *identifies parts of a prompt* by highlighting them. Instead of *reading about* context quality, they *evaluate why a prompt produced bad output* and fix it. Instead of *being told* what good prompts look like, they *build one step by step* from their own use case — with the platform guiding each step, giving feedback, and connecting the result to their prompt library.

The difference between "I completed a lesson" and "I actually learned something" is the difference between passive consumption and active participation. This engine makes every lesson feel like SoloLearn or ProfAI — bite-sized, interactive, and connected to the employee's real work.

### Design Principle

**Learning happens through the platform, not about the platform.** The AI Foundations course walks the employee through actually using the Use Case Generator, prompt runner, and prompt library. The Prompt Engineering course builds real skills through structured exercises. The AI Strategy course ends with a capstone that produces a real action plan. Every course creates artifacts that persist beyond the learning.

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
- An interactive activity engine that replaces static markdown lessons with structured, interactive learning
- A library of 19 activity types that content authors compose into lessons
- Connected to the employee's real data — use cases and prompts flow into learning activities
- AI-evaluated where appropriate (open-field responses get contextual feedback)
- Mobile-first — all mechanics designed for touch interaction with keyboard fallbacks
- Built on the existing Academy Engine (courses, progress, certificates) — it extends, not replaces
- 9 lessons organized in 3 courses (~1.5h each, ~4.5h total), each with learning objectives, content direction, and full activity sequences
- Content hierarchy aligned with LMS standards: Course → Lesson → Activity (maps to SCORM Course → SCO → Interaction)

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
- Lesson 4 (Responsible AI): Sort data types into "Safe / Anonymize First / Never Share"
- Lesson 7 (AI Tool Landscape): Sort tasks into which AI tool handles them best
- Lesson 1 (AI Foundations): Sort statements into "AI Can Do / AI Can't Do / Depends on Context"

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
- Lesson 5 (Prompt Fundamentals): Order the prompt refinement cycle
- Lesson 8 (Change Management): Arrange the steps of a multi-agent pipeline

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
- Lesson 1: "A well-structured prompt includes a __blank1__ that tells the AI what perspective to take, __blank2__ that provides specific information about your situation, a clear __blank3__ describing what you need, and a __blank4__ specifying how the output should look."
- Lesson 4: "Before sharing data with AI, you should __blank1__ any personally identifiable information and never include __blank2__ in your prompts."

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
- Lesson 1: Match "Hallucination" → "AI generates plausible but false information", "Token" → "Unit of text the AI processes", "Context window" → "Maximum text AI can consider at once"
- Lesson 7: Match AI tools → their primary strength ("Perplexity" → "Research with cited sources", "Midjourney" → "Image generation from text")

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
- Lesson 1: Center = "Effective Prompt" → petals include "Specific context" (yes), "Clear role" (yes), "Longer is always better" (no), "Output format" (yes), "Personal opinions" (no)
- Lesson 7: Center = "ChatGPT" → select which use cases genuinely fit vs. which are better suited to other tools

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

**Tatoma examples (Lesson 4 — Responsible AI):**
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
- Lesson 1: Grid of AI capabilities — 7 things AI can do, 2 things it can't (but sound like it could). Pattern reveal: "AI can process and generate text but cannot access real-time data or remember previous conversations (without RAG)."
- Lesson 4: Grid of data handling practices — 6 safe practices, 2 risky ones disguised as normal.

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
- Lesson 5: Grid of 8 prompts — some well-structured, some with common mistakes (no role, vague task, missing format). "Spot the prompts that need improvement."
- Lesson 5: Grid of AI outputs — some accurate, some containing subtle hallucinations. "Which outputs should you verify before using?"
- Lesson 8: Grid of agentic workflow descriptions — some properly structured, some with missing handoff steps.

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
- Lesson 5: "Rank these prompt improvements from most to least impactful: adding specific context, changing the greeting, specifying output format, adding examples of desired output, making the prompt longer."
- Lesson 7: "Rank these AI tools by suitability for [specific task type]."

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
- Lesson 7: X = "Simple to Complex", Y = "Creative to Analytical" — place AI tools in quadrants
- Lesson 8: X = "Low Effort to Implement", Y = "Low to High Business Impact" — place agentic workflow use cases to prioritize what to automate first

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

## Part 3: Content Hierarchy & Data Model

### Content Hierarchy

```
Course → Lesson → Activity

CONTENT (authoring — what gets built):
  Course               → a complete learning experience (= LMS Course / SCORM Course / cmi5 Course)
    └── Lesson          → a single learning session (= LMS SCO / cmi5 AU)
          └── Activity   → atomic interaction (= LMS Interaction / xAPI Statement)

COMPOSITION (delivery — what gets assigned):
  Learning Path         → composed sequence of courses/lessons for a specific audience
    └── references Courses or Lessons in any order
```

Courses are the authoring-side grouping ("these lessons were designed together"). Learning Paths are the delivery-side composition ("assign these to my team"). A lesson can appear in multiple paths. A path can reference whole courses or individual lessons.

### From Markdown to Interactive

v1 lessons = one markdown blob + one exercise. Interactive lessons = a **sequence of activities** that follow the observe → identify → evaluate → create arc.

**Data model:** A lesson's content is no longer a single `content_md` field. Instead, a lesson contains an ordered list of activities:

```
learning_courses (
  id               uuid PK
  org_id           uuid FK → organizations
  title            text
  slug             text
  description      text
  estimated_hours  decimal
  is_published     boolean
  certificate_template_id  uuid | null
  created_at       timestamptz
  updated_at       timestamptz
)

learning_lessons (
  id               uuid PK
  course_id        uuid FK → learning_courses
  title            text
  slug             text
  description      text
  content_type     text          -- "markdown" (v1) | "interactive" (v2)
  estimated_minutes integer
  sequence_order   integer       -- position within the course
  is_published     boolean
  created_at       timestamptz
  updated_at       timestamptz
)

learning_activities (
  id               uuid PK
  lesson_id        uuid FK → learning_lessons
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

-- Composition layer (delivery)
learning_paths (
  id               uuid PK
  org_id           uuid FK → organizations
  title            text
  description      text
  is_default       boolean       -- shipped default paths
  is_published     boolean
  created_at       timestamptz
  updated_at       timestamptz
)

learning_path_items (
  id               uuid PK
  path_id          uuid FK → learning_paths
  item_type        text          -- "course" | "lesson"
  item_id          uuid          -- FK to courses or lessons
  sequence_order   integer
  is_required      boolean
  created_at       timestamptz
  updated_at       timestamptz
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

### Lesson Completion

A lesson is complete when all `is_required` activities are completed. Optional activities can be skipped without blocking progress. The lesson's `exercise_completed_at` in `employee_progress` is set when the last required activity is completed.

A course is complete when all its lessons are completed. Course completion triggers the certificate (if configured).

---

## Part 4: Use Case Connection

### Learning From Your Own Work

The 9 lessons across 3 courses progressively connect to the employee's real data:

**Lessons 1-3** (AI Foundations course): Generic examples and basic platform interaction — the employee is building foundational understanding.

**Lessons 4-6** (Prompt Engineering course): The core skill-building lessons. Responsible AI use (L4) uses generic scenarios. Prompt Fundamentals (L5) introduces the guided prompt builder. Advanced Techniques (L6) deepens applied skills.

**Lessons 7-9** (AI Strategy course): Reference the employee's saved use cases for context. AI Opportunity Mapping (L7), Change Management (L8), and Measuring AI Impact (L9) all connect to real organizational scenarios. L9 is the capstone — the employee designs their AI measurement strategy using the artifacts they've created throughout the course.

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

### 3 Courses, 9 Lessons

```
COURSE: AI FOUNDATIONS (~1.5h)
  Lesson 1: What is AI?                         ← markdown (v1)
  Lesson 2: How AI Thinks                       ← markdown (v1)
  Lesson 3: AI in Your Role                     ← markdown (v1)

COURSE: PROMPT ENGINEERING (~1.5h)
  Lesson 4: Responsible AI Use                  ~30 min  |  11 activities
  Lesson 5: Prompt Fundamentals                 ~30 min  |  11 activities
  Lesson 6: Advanced Techniques                 ~25 min  |   7 activities

COURSE: AI STRATEGY (~1.5h)
  Lesson 7: AI Opportunity Mapping              ~30 min  |  18 activities
  Lesson 8: Change Management                   ~30 min  |  18 activities
  Lesson 9: Measuring AI Impact                 ~30 min  |  16 activities

TOTAL: 3 courses  |  9 lessons  |  81 interactive activities + 3 markdown lessons  |  ~4.5 hours
```

### Which Mechanics For Which Lessons

| Lesson | Phase | Recommended Mechanics |
|--------|-------|----------------------|
| **L1-3: AI Foundations** | — | Markdown (v1 rendering) — content cards + exercise |
| **L4: Responsible AI Use** | Observe | content_card (introduction, data classification framework) |
| | Identify | sorting_buckets (data classification), fill_the_gap (privacy principles) |
| | Evaluate | binary_stack (safe to share?), spot_the_error (security risks in prompts), odd_one_out (data minimization) |
| | Create | open_response (advise colleague), prompt_runner (anonymized prompt) |
| **L5: Prompt Fundamentals** | Observe | content_card (introduction, teaching per exercise) |
| | Identify | fill_the_gap (prompt components), multi_match (parts to functions), sequence_builder (prompt elements) |
| | Create | guided_prompt_builder, prompt_runner |
| **L6: Advanced Techniques** | Observe | content_card (introduction, teaching per exercise) |
| | Identify | associations (techniques to use cases) |
| | Evaluate | ranking (techniques by effectiveness) |
| | Create | prompt_runner (apply technique) |
| **L7: AI Opportunity Mapping** | Observe | content_card, annotated_example (opportunity assessment) |
| | Identify | highlight_select (AI-ready processes), label_parts (AI readiness), sorting_buckets (opportunities by timeline) |
| | Evaluate | multiple_choice (strategy check), ranking (prioritize opportunities), two_axis_placement (impact vs effort) |
| | Create | open_response (opportunity brief), prompt_runner (readiness assessment) |
| **L8: Change Management** | Observe | content_card, annotated_example (framework) |
| | Identify | drag_drop_order (phases), sorting_buckets (stakeholder responses), associations (strategies to resistance types) |
| | Evaluate | spot_the_error (rollout plans), multiple_choice (concepts), binary_stack (change tactics) |
| | Create | open_response (communication plan), prompt_runner (stakeholder analysis) |
| **L9: Measuring AI Impact** | Observe | content_card, annotated_example (ROI framework) |
| | Identify | fill_the_gap (KPI vocabulary), label_parts (ROI calculation), highlight_select (measurable outcomes) |
| | Evaluate | multiple_choice (measurement concepts), ranking (metrics by reliability) |
| | Create | open_response (measurement plan), prompt_runner (impact dashboard) |

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

Every lesson below includes its learning objectives, content direction for activity authoring, and the complete activity sequence. These are the blueprints for implementation — each activity maps to a type from Part 1 and gets stored as JSONB in `learning_activities`.

**Note:** Lessons 1-3 (AI Foundations course) are markdown-based (v1 rendering). Their content is already implemented. The sequences below cover the interactive lessons (L4-L9).

---

### Lessons 1-3: AI Foundations (markdown, v1)

**Course: AI Foundations | 3 lessons | markdown + exercise**

| Lesson | Title | Content Type |
|--------|-------|-------------|
| L1 | What is AI? | Markdown + exercise |
| L2 | How AI Thinks | Markdown + exercise |
| L3 | AI in Your Role | Markdown + exercise |

These lessons use the v1 markdown renderer (`content_type: "markdown"`). Content is implemented.

---

### Lesson 4: Responsible AI Use — PROMPT ENGINEERING

**~30 min | 11 activities | Data classification, privacy reflexes, anonymization practice**

**Learning Objectives:**
- Classify data types by sensitivity (safe to share, needs anonymization, never share)
- Build the reflex for rapid data classification decisions
- Practice anonymizing data in prompts while maintaining usefulness
- Understand the difference between consumer and enterprise AI tool data handling

**Content Direction:**
Start with the practical question: when you type something into an AI tool, where does it go? Consumer tools may use your input for training; enterprise tools typically don't — but even with enterprise tools, some data should never leave your systems. The lesson is built around the data classification exercise — sorting data types into categories IS the lesson. Binary stack rapid-fire builds reflexes. The final exercise proves that anonymized data still produces useful AI output.

**Connection to Platform:** Uses generic workplace scenarios — no personal data connection needed. Security training works best with standardized examples.

**Exit State:** Employee can instantly classify data by sharing safety and knows how to anonymize effectively.

```
Activity 1: content_card — Introduction to responsible AI use
Activity 2: content_card — Data classification framework
Activity 3: content_card (teaching) → sorting buckets exercise
Activity 4: sorting_buckets — Classify data into Safe / Anonymize First / Never Share
Activity 5: content_card (teaching) → binary stack exercise
Activity 6: binary_stack — Rapid-fire accept/reject data for AI prompts
Activity 7: fill_the_gap — Data privacy principles
Activity 8: spot_the_error — Find security risks in AI prompts
Activity 9: odd_one_out — Which practice violates data minimization?
Activity 10: open_response — Advise a colleague on safe AI data practices
Activity 11: prompt_runner — Practice writing an anonymized prompt

→ LESSON COMPLETE.
```

---

### Lesson 5: Prompt Fundamentals — PROMPT ENGINEERING

**~30 min | 11 activities | Core prompt structure, building, and running**

**Learning Objectives:**
- Understand prompt anatomy: the core components and their functions
- Practice building prompts step by step with guidance
- Run prompts and see real results

**Content Direction:**
This is where the employee learns to construct prompts. Each interactive exercise is preceded by a teaching content card that introduces the concept. The progression goes from understanding components (fill the gap), to matching parts to functions (multi match), to ordering elements (sequence builder), to actually building and running a prompt (guided prompt builder + prompt runner).

**Connection to Platform:** The guided_prompt_builder and prompt_runner connect to the prompt library.

**Exit State:** Employee can construct and run a well-structured prompt.

```
Activity 1: content_card — Introduction to prompt engineering
Activity 2: content_card (teaching) → fill the gap exercise
Activity 3: fill_the_gap — Core prompt components
Activity 4: content_card (teaching) → multi match exercise
Activity 5: multi_match — Match prompt parts to their functions
Activity 6: content_card (teaching) → sequence builder exercise
Activity 7: sequence_builder — Order prompt elements correctly
Activity 8: content_card (teaching) → guided prompt builder
Activity 9: guided_prompt_builder — Build a prompt step by step
Activity 10: content_card (teaching) → prompt runner
Activity 11: prompt_runner — Run your prompt and see results

→ LESSON COMPLETE.
```

---

### Lesson 6: Advanced Techniques — PROMPT ENGINEERING

**~25 min | 7 activities | Technique matching, ranking, applied practice**

**Learning Objectives:**
- Know which advanced prompting techniques exist and when to use them
- Evaluate techniques by effectiveness for different scenarios
- Apply an advanced technique with the prompt runner

**Content Direction:**
Lighter lesson — builds on the fundamentals with more sophisticated techniques. Associations exercise maps techniques to use cases. Ranking exercise teaches which techniques have the most impact. Ends with applied practice.

**Connection to Platform:** Prompt runner for applied practice.

**Exit State:** Employee knows advanced techniques and has applied at least one. Prompt Engineering course complete.

```
Activity 1: content_card — Introduction to advanced techniques
Activity 2: content_card (teaching) → associations exercise
Activity 3: associations — Match techniques to their best use cases
Activity 4: content_card (teaching) → ranking exercise
Activity 5: ranking — Rank techniques by effectiveness
Activity 6: content_card (teaching) → prompt runner
Activity 7: prompt_runner — Apply an advanced technique

→ LESSON COMPLETE. Prompt Engineering course done.
```

---

### Lesson 7: AI Opportunity Mapping — AI STRATEGY

**~30 min | 18 activities | Assessment, identification, prioritization of AI opportunities**

**Learning Objectives:**
- Assess organizational processes for AI readiness
- Identify and label the components that make a process AI-ready
- Prioritize AI opportunities using impact vs. effort analysis
- Draft an AI opportunity brief

**Content Direction:**
The heaviest lesson in the AI Strategy course. 18 activities because it covers the full arc from understanding (annotated example) through identification (highlight, label, sort) to evaluation (multiple choice, ranking, two-axis placement) to creation (open response, prompt runner). Every interactive exercise is preceded by a teaching content card. The two-axis placement exercise is the strategic centerpiece — plotting opportunities on an impact vs. effort matrix.

**Connection to Platform:** The prompt_runner generates an AI readiness assessment.

**Exit State:** Employee can map and prioritize AI opportunities in their organization.

```
Activity 1: content_card — Introduction to AI opportunity mapping
Activity 2: content_card (teaching) → annotated example
Activity 3: annotated_example — AI opportunity assessment
Activity 4: content_card (teaching) → highlight select
Activity 5: highlight_select — Identify AI-ready processes
Activity 6: content_card (teaching) → label parts
Activity 7: label_parts — Label components of AI readiness
Activity 8: content_card (teaching) → sorting buckets
Activity 9: sorting_buckets — Categorize opportunities by timeline
Activity 10: content_card (teaching) → multiple choice
Activity 11: multiple_choice — AI strategy knowledge check
Activity 12: content_card (teaching) → ranking
Activity 13: ranking — Prioritize AI opportunities
Activity 14: content_card (teaching) → two axis placement
Activity 15: two_axis_placement — Plot opportunities on impact vs effort
Activity 16: content_card (teaching) → open response
Activity 17: open_response — Draft an AI opportunity brief
Activity 18: prompt_runner — Generate an AI readiness assessment

→ LESSON COMPLETE.
```

---

### Lesson 8: Change Management — AI STRATEGY

**~30 min | 18 activities | Frameworks, stakeholder responses, rollout planning**

**Learning Objectives:**
- Understand change management frameworks for AI adoption
- Classify stakeholder responses and match strategies to resistance types
- Identify mistakes in AI rollout plans
- Write a change communication plan

**Content Direction:**
Parallel structure to L7 — 18 activities, same pattern of teaching cards preceding exercises. Covers the human side of AI adoption: how people react to change, how to plan a rollout, how to communicate effectively. The annotated example shows a change management framework. Practical exercises include sorting stakeholder responses, spotting errors in rollout plans, and matching strategies to resistance types.

**Connection to Platform:** The prompt_runner generates a stakeholder analysis.

**Exit State:** Employee can plan and communicate an AI adoption initiative.

```
Activity 1: content_card — Introduction to change management for AI
Activity 2: content_card (teaching) → annotated example
Activity 3: annotated_example — Change management framework
Activity 4: content_card (teaching) → drag drop order
Activity 5: drag_drop_order — Order change management phases
Activity 6: content_card (teaching) → sorting buckets
Activity 7: sorting_buckets — Classify stakeholder responses
Activity 8: content_card (teaching) → spot the error
Activity 9: spot_the_error — Find mistakes in rollout plans
Activity 10: content_card (teaching) → multiple choice
Activity 11: multiple_choice — Change management concepts
Activity 12: content_card (teaching) → associations
Activity 13: associations — Match strategies to resistance types
Activity 14: content_card (teaching) → binary stack
Activity 15: binary_stack — Quick judgment on change tactics
Activity 16: content_card (teaching) → open response
Activity 17: open_response — Write a change communication plan
Activity 18: prompt_runner — Generate a stakeholder analysis

→ LESSON COMPLETE.
```

---

### Lesson 9: Measuring AI Impact — AI STRATEGY (Capstone)

**~30 min | 16 activities | KPIs, ROI frameworks, measurement planning**

**Learning Objectives:**
- Understand AI ROI frameworks and measurement approaches
- Identify and label measurable outcomes in AI implementations
- Evaluate and rank metrics by reliability
- Design a measurement plan for AI impact

**Content Direction:**
The capstone of the AI Strategy course. Focuses on proving AI value — the skill that turns experimentation into organizational commitment. Covers ROI frameworks, KPI vocabulary, identifying measurable outcomes, and designing measurement plans. The annotated example shows an ROI framework. Exercises progress from vocabulary (fill the gap) through identification (label parts, highlight select) to evaluation (multiple choice, ranking) to creation (open response, prompt runner).

**Connection to Platform:** The prompt_runner generates an AI impact dashboard.

**Exit State:** Employee can measure and communicate AI impact. AI Strategy course complete. Certificate awarded.

```
Activity 1: content_card — Introduction to measuring AI impact
Activity 2: content_card (teaching) → annotated example
Activity 3: annotated_example — AI ROI framework
Activity 4: content_card (teaching) → fill the gap
Activity 5: fill_the_gap — KPI and metrics vocabulary
Activity 6: content_card (teaching) → label parts
Activity 7: label_parts — Label parts of an ROI calculation
Activity 8: content_card (teaching) → highlight select
Activity 9: highlight_select — Identify measurable outcomes
Activity 10: content_card (teaching) → multiple choice
Activity 11: multiple_choice — Measurement concepts
Activity 12: content_card (teaching) → ranking
Activity 13: ranking — Rank metrics by reliability
Activity 14: content_card (teaching) → open response
Activity 15: open_response — Design a measurement plan
Activity 16: prompt_runner — Generate an AI impact dashboard

→ LESSON COMPLETE. AI Strategy course done. Certificate awarded.
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
- Reorder activities within a lesson via drag-and-drop

**No visual WYSIWYG editor** — the authoring interface is functional, not pretty. It's for internal use (co-founders, consultants), not end users.

### AI-Assisted Content Generation (Future)

Like Sana Learn's approach: upload a concept outline → AI generates a draft set of activities covering the full arc. Content author reviews and refines. Out of scope for v1 but the structured JSONB schemas support it.

---

## Part 9: Migration from v1 Lessons

The interactive engine doesn't break v1 lessons. It extends the system:

- v1 lessons with `content_md` + exercise render as before (backward compatible)
- Lessons with `learning_activities` render using the interactive engine
- A lesson has EITHER `content_md` (v1 style) OR `learning_activities` (interactive), not both
- Migration: existing lessons progressively converted from markdown to interactive activities

The `content_type` field on `learning_lessons` controls this: `"markdown"` (v1) vs `"interactive"` (v2). When `content_type = "interactive"`, the lesson renderer loads activities from `learning_activities` instead of rendering `content_md`.

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
| **Employee skips optional activities** | Lesson still completable. Progress shows "X of Y" but only required activities gate completion. |

---

## Part 11: What's Explicitly Out of Scope

- **Collaborative/social activities** — no peer discussion, no live sessions. Individual learning only.
- **Adaptive AI tutor** — no free-form chat tutor. Activities are structured.
- **Gamification** — no XP, points, streaks, leaderboards. Engagement from relevance and interactivity.
- **Timed activities** — no countdown timers. Learning, not testing.
- **Branching paths** — activities are linear within a lesson. No adaptive remediation.
- **Video-based activities** — videos can embed in content cards, no "watch and answer" types.
- **Activity template marketplace** — no sharing across organizations.
- **Rich text authoring UI** — Workbench authoring is functional/JSON-based.

---

## Part 12: Success Criteria

| Metric | Target | How to measure |
|--------|--------|----------------|
| Activities feel interactive | >70% of lesson time on interactive activities (not content cards) | Time tracking per activity type |
| Touch interactions work reliably | >90% of drag/swipe/tap activities completed without UI issues | Error logging + activity_progress completion rates |
| AI evaluation is useful | >60% of "partial"/"needs_work" feedback leads to retry with improvement | Retry rate + quality change in activity_progress |
| Prompt saved to library | >40% of L5 completions result in a saved prompt | Link between activity completion and prompt creation |
| Security reflexes build | Binary stack average score improves >20% from first to last attempt | score_correct/score_total in activity_progress |
| Lesson completion rate improves over v1 | Interactive lessons have higher completion than markdown lessons | A/B comparison (L1-3 vs L4-9) |
| Variety maintains engagement | No single activity type accounts for >30% of a lesson's activities | Content audit |

---

## Part 13: Implementation Notes for Claude Code

### Courses & Lessons

1. **Create 3 courses** — "AI Foundations" (L1-3, markdown), "Prompt Engineering" (L4-6, interactive), "AI Strategy" (L7-9, interactive). Each course ~1.5h estimated, published = true.

2. **Create 9 lesson records** — L1-3 with `content_type: "markdown"`, L4-9 with `content_type: "interactive"`. Time estimates stored in `learning_lessons.estimated_minutes`. Update based on real usage data once live.

3. **Course ordering** — AI Foundations should be completed before Prompt Engineering or AI Strategy unlocks. Prompt Engineering and AI Strategy can potentially be done in either order (TBD — may want Prompt Engineering before AI Strategy).

4. **Certificate trigger** — completing a course triggers that course's certificate. Each course has its own `certificate_template_id`.

5. **Learning Paths (composition layer)** — create a default "AI Academy" path that includes all 3 courses in order. TLs can later compose custom paths from individual courses or lessons.

### Interactive Engine

6. **This extends the Academy Engine, not replaces it.** The `learning_activities` table and `activity_progress` table are additions. The `learning_lessons` table has `content_type`. v1 (markdown) lessons continue to work.

7. **19 activity types = 19 React components, 81 interactive activities across 6 lessons (L4-9).** Each renders from its JSONB schema and handles interaction + completion. Think card-based component system. Group by phase for code organization:
   - `activities/observe/` — ContentCard, AnnotatedExample
   - `activities/identify/` — HighlightSelect, LabelParts, SortingBuckets, SequenceBuilder, FillTheGap, MultiMatch, Associations, DragDropOrder
   - `activities/evaluate/` — MultipleChoice, BinaryStack, OddOneOut, SpotTheError, Ranking, TwoAxisPlacement, OpenResponse
   - `activities/create/` — GuidedPromptBuilder, PromptRunner

7. **Shared interaction patterns:** Several mechanics share drag-and-drop (sorting_buckets, sequence_builder, ranking, drag_drop_order, two_axis_placement). Build a shared `useDragInteraction` hook that all of these compose. Similarly, tap-to-select is shared by multi_match, associations, odd_one_out, spot_the_error.

8. **Binary stack swipe interaction** needs a card stack UI with swipe gestures. Look at Tinder-style card libraries. Keyboard support: A = reject, D = accept (or left/right arrows).

9. **Two-axis placement** is the trickiest component. Needs a zoomable quadrant grid where items can be dragged to positions. On mobile, consider the sequential fallback (one item at a time, 4 quadrant buttons).

10. **AI evaluation** follows the same provider pattern as the Prompts app and Use Case Generator. Rate limit evaluations reasonably.

11. **Use case connection** requires querying `personal_use_cases` for the current user. The `guided_prompt_builder` with `use_case_source: "from_generator"` fetches use cases, lets them select one, and pre-populates builder steps.

### Content & Authoring

13. **L7 and L8 are the longest** — 18 activities each. They're the most comprehensive lessons in the AI Strategy course.

14. **Content quality** — use the content directions in Part 7 to author activity content. Placeholder content should be marked as draft: `<!-- DRAFT: Co-founder review needed -->`.

15. **The authoring UI in Workbench** should group the 19 types by phase in a dropdown. Each type gets a structured form (not raw JSON). Preview capability is important — content authors need to see what the employee will experience.

### Technical

16. **Feature flag** — same `feature-learn` flag. Interactive lessons only render if enabled; otherwise fall back to markdown if available.

17. **i18n-ready** — all text fields in activity schemas, lesson titles, descriptions, activity text, feedback strings should follow the same i18n preparation pattern. English-only for v1 but structured for localization.

18. **Accessibility** — all mechanics need keyboard alternatives. Minimum: tab-navigate to elements, enter/space to select. Drag mechanics fall back to arrow-key reordering. Screen reader announcements for state changes (correct/incorrect, progress updates). WCAG AA compliance (4.5:1 contrast).

19. **ActivityEnvelope validation** — when loading activities from JSONB, validate the envelope structure and type-specific schema. Malformed activities should be skipped gracefully (Part 10), never crash the lesson.

20. **Score tracking** — `activity_progress` now includes `score_correct` and `score_total` columns. Populated from the ActivityEnvelope scoring after each activity completion. This is for analytics only — scores don't gate progression.

21. **Mobile-first build order:** Start with the ★★★★★ mobile-rated mechanics (binary_stack, sorting_buckets, odd_one_out, multi_match, fill_the_gap) since they're the most touch-natural. Build ★★★★☆ next (sequence_builder, associations, ranking, spot_the_error). Save ★★★☆☆ (two_axis_placement) for last — it needs the most mobile adaptation.

### LMS Export Readiness

22. **Content hierarchy maps directly to LMS standards:**
    - `learning_courses` → SCORM Course / cmi5 Course
    - `learning_lessons` → SCORM SCO / cmi5 AU (the tracked unit)
    - `learning_activities` → SCORM Interactions / xAPI Statements
    - `learning_path_items` → internal composition only (not exported)

23. **activity_progress data** already covers SCORM core requirements: completion status (`completed_at`), score (`score_correct`/`score_total`), attempts (`attempts`). Consider adding `time_spent_seconds` for SCORM session time tracking.
