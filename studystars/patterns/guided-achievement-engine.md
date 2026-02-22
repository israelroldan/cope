# Guided Achievement Engine

> A full-stack behavioral system that transforms vague human intent into structured, resourced, executable action plans with built-in accountability — domain-agnostic by design, proven in education.

---

## The Core Idea

Most productivity tools fail at the same point: the gap between "I want to do something" and actually doing it. A person says "I want to get better at drawing" and hits a wall — what specifically? For how long? With what materials? What does "done" look like? What happens when they get stuck?

The Guided Achievement Engine closes this gap through a five-phase pipeline:

```
Vague Intent → Structured Goal → Equipped Action → Guided Execution → Proof & Reflection → Sustained Engagement
```

Each phase was designed to solve a specific behavioral failure mode:

| Phase | Failure Mode It Solves |
|-------|----------------------|
| Intent Capture & AI Refinement | "I don't know what specifically to do" |
| Action Equipping | "I don't have what I need to start" |
| Guided Execution | "I started but lost focus / got stuck" |
| Proof & Reflection | "I finished but it doesn't feel like it counts" |
| Sustained Engagement | "I did it once but can't keep going" |

The system emerged from building Pimpi, a mission-based achievement app for kids. But the engine underneath is domain-agnostic — the same pipeline applies to fitness routines, therapy homework, creative projects, professional development, or any domain where people struggle to convert intention into consistent action.

---

## Phase 1: Intent Capture & AI Refinement

**Problem:** Users express goals at wildly different levels of specificity. "Draw a cat" is actionable. "Get creative" is not. The system must handle both without making the specific user jump through hoops or leaving the vague user stranded.

### The Refinement Loop

The core mechanism is a discriminated response type. Every AI call returns exactly one of two shapes:

```
Response = Refinement | Card

Refinement {
  type: "refinement"
  question: string         // max 8 words, friendly
  options: [               // 2-4 choices
    { label: string,       // emoji + 2-4 words
      value: string }      // carries full context forward
  ]
}

Card {
  type: "card"
  title: string            // action-oriented verb + object
  duration: number         // realistic minutes
  difficulty: "Easy" | "Medium" | "Hard"
  challengeLevels: string[3]   // contextual variants per difficulty
  materials: string[]      // 2-4 common items needed
  helpers: string[]        // resource search queries / links
  doneLooksLike: string    // tangible observable outcome
  tinyStart: string        // achievable in under 60 seconds
  obstaclePlan: string     // "If stuck —" specific strategy
}
```

**The decision rule is verb + object detection:**
- `"draw a cat"` → has verb (draw) + object (a cat) → **Card immediately**
- `"bake chocolate chip cookies"` → verb + object → **Card immediately**
- `"exercise"` → no object → **Refinement** ("What kind of exercise?")
- `"get better grades"` → goal, not action → **Refinement** that redirects to a concrete replacement activity

This is the critical design insight: **trust specificity**. When someone knows what they want to do, don't interrogate them. Only refine when the input genuinely lacks enough information to construct an executable plan.

### Progressive Narrowing with Context Preservation

Each refinement round narrows exactly one dimension. The key constraint: every option's `value` field must carry forward the full accumulated context, never dropping earlier selections.

```
Round 0: "art" → Refinement: "What kind of art?"
  Options: "🎨 Drawing", "🖌️ Painting", "✂️ Collage", "🏺 Sculpting"

User selects: "🎨 Drawing"

Round 1: "Drawing" → Refinement: "What do you want to draw?"
  Options: "🐱 Animals", "👤 People", "🏔️ Landscapes", "✨ Abstract"
  (Each value: "Drawing animals", "Drawing people", etc.)

User selects: "🐱 Animals"

Round 2: "Drawing animals" → Card (specific enough)
  title: "Draw your favorite animal"
  ...full scaffolding fields
```

The selection path is maintained as a growing array threaded through every API call:

```
selectionPath: ["art", "Drawing", "Drawing animals"]
```

The server injects this as XML-tagged context into the AI prompt:

```
<selection>art</selection> → <selection>Drawing</selection> → <selection>Drawing animals</selection>
NEVER lose context from earlier steps.
```

### Hard Stop at Round 3

A server-side safeguard ensures the refinement loop cannot run indefinitely:

- **Round 0:** Return card if clear action, only refine bare categories
- **Round 1:** Return card if specific action + object, else one more refine
- **Round 2:** Return card NOW unless input is truly vague
- **Round 3+:** Force card. No more refinements. Period.

This is enforced at two levels:
1. The prompt includes round-specific forcing rules injected into the user message
2. A server-side guard catches any model that returns a refinement at round 3+ and replaces it with a fallback card built from the user's raw input

### Inspiration as a Starting Point

For users who can't even articulate what they want, an inspiration flow generates 10 diverse activity ideas as floating, tappable bubbles. Each idea is a `{ label, value }` pair that feeds directly into the refinement pipeline at round -1.

The inspiration agent is prompted to:
- Cover diverse domains (writing, art, movement, organizing, learning)
- Focus on repeatable skill-building habits, not one-off projects
- Require zero special supplies
- Never repeat the same domain twice in one set
- Avoid suggesting activities the user has done recently (the server injects the user's 10 most recent mission titles)

### Passive-to-Active Redirection

A critical prompt rule: passive consumption inputs are redirected to active creation.

```
"watch TikTok" → "Film a 30-second TikTok tutorial"
"listen to music" → "Learn to play a song chorus"
"play video games" → "Design a game level on paper"
```

This transforms the engine from a task manager into a growth catalyst — it doesn't just organize what people already want to do, it nudges them toward the version that builds skills.

---

## Phase 2: Action Equipping

**Problem:** Having a clear goal isn't enough. People abandon plans because they don't have what they need, don't know what "done" means, or can't overcome the activation energy to start.

### The Scaffolding Fields

Every Card generated by the system includes five scaffolding fields that are psychologically grounded:

#### `tinyStart` — Defeating Activation Energy
> "The absolute tiniest first step, achievable in under 60 seconds"

Examples:
- For "Draw your favorite animal": "Open your sketchbook to a blank page and draw one circle"
- For "Practice piano scales": "Sit on the bench and play one C note"

This is based on the behavioral insight that the hardest part of any task is starting. By defining a step so small it feels trivial, the system bypasses the resistance that kills most intentions.

**Validation rule:** Must not be meta-actions like "set a timer" or "think about what to do." Must be a physical, concrete action.

#### `doneLooksLike` — Observable Completion Criteria
> "A tangible, observable outcome — what artifact or result will exist when you're done"

Examples:
- "A completed pencil sketch of an animal with at least basic shading"
- "Three full scales played smoothly at tempo without mistakes"

**Validation rule:** Must describe an observable artifact or state, not a feeling. "Feel proud of your work" is rejected in favor of "A finished drawing you can show someone."

#### `obstaclePlan` — Preemptive Friction Removal
> "A specific strategy for the most likely obstacle, starting with 'If stuck —'"

Examples:
- "If stuck — look at a photo of the animal and trace the basic shape first"
- "If stuck — slow the tempo to half speed and play each hand separately"

**Validation rule:** Must be a specific problem-solving strategy, not generic advice like "break it into smaller steps."

#### `materials` — Physical Readiness
> "2-4 common household items needed"

Rendered as an interactive checklist during execution. Each item can be checked off, providing a micro-completion moment before the main task even begins.

#### `helpers` — Knowledge Readiness
> "1-3 helpful resources: tutorials, reference materials, guides"

### The Resource Search Pipeline

Resources aren't hallucinated — they're found through a dedicated search agent with real-time web access:

1. **Search Agent** calls a grounded web search tool (explicitly prohibited from fabricating URLs)
2. Agent returns 4-5 candidate resources with names and URLs
3. **Server-side validation pipeline:**
   - Extract URL from each `"resource name — URL"` formatted string
   - Resolve redirect URLs (some search APIs return proxy URLs)
   - Validate each URL is live:
     - YouTube URLs → check via oembed endpoint
     - Other URLs → HEAD request with 3s timeout
   - SSRF protection: reject localhost, private IP ranges, non-HTTPS
   - Graceful degradation: if ALL validations fail, return originals rather than empty list
4. **Trim to 3** verified resources — the sweet spot between "enough options" and "choice paralysis"

This pipeline ensures users see real, working links — not hallucinated URLs that 404.

### Challenge Levels — Contextual Difficulty Variants

The AI generates three challenge levels that are contextual variants of the activity, not generic Easy/Medium/Hard labels:

```
Cooking mission:
  Easy: "Scrambled eggs"
  Medium: "Cheese omelette"
  Hard: "Eggs Benedict"

Drawing mission:
  Easy: "Quick sketch"
  Medium: "Detailed drawing"
  Hard: "Full color piece"
```

The user selects a challenge level after the card is generated, and this selection also influences the duration options presented (Easy: 5/10/15/20 min, Medium: 10/15/20/30 min, Hard: 20/30/45/60 min).

---

## Phase 3: Guided Execution

**Problem:** People start tasks and lose focus, forget what they're supposed to be doing, or don't have their resources accessible when they need them.

### The Execution Environment

When a user enters execution mode, all scaffolding fields are rendered as a persistent reference board alongside a timer:

| Element | Purpose | Rendering |
|---------|---------|-----------|
| Timer | Time awareness without pressure | Counts up toward suggested duration; no auto-stop |
| "Done looks like" | Constant reminder of the finish line | Prominent card, always visible |
| Materials checklist | Track physical readiness | Interactive checkboxes with strike-through |
| Helpers / Resources | Instant access to learning materials | Tappable links that open in-context |
| "If stuck" | Rescue hatch for frustration moments | Visible card, always accessible |
| "Tiny start" | Re-engagement after pause | Displayed prominently at the start |

### Timer Design Decisions

The timer is deliberately **not** a countdown:
- It counts elapsed time against the suggested duration
- Progress is shown visually (bar or circular) reaching 100%
- There is **no auto-completion** when time runs out
- The user must explicitly press "I'm Done!" to finish

This design choice reflects the insight that a countdown timer creates anxiety and rushes people, while an elapsed timer creates awareness without pressure. The user is in control of when they're done — the duration is a guide, not a constraint.

### Pause and Resume

The timer supports pause/resume, and critically, the scaffolding board remains visible during pause. This means if someone gets interrupted, they can come back, see exactly where they were (materials checked, time elapsed), and resume without reconstruction cost.

---

## Phase 4: Proof & Reflection

**Problem:** Completing a task without marking it creates no sense of closure. And without reflection, there's no learning or emotional processing.

### The Proof Capture

After pressing "I'm Done!", the user enters a proof-of-completion flow:

1. **Photo capture** (optional) — opens device camera, uploads to cloud storage
2. **Note** (optional) — freeform text: "What did you do? How did it go?"
3. **Self-rating** (required) — three options on a difficulty axis:
   - "Easy" / "Ok" / "Hard"
4. **Feeling** (required) — three options on an emotional axis:
   - "Great" / "Okay" / "Tough"

### The Two-Axis Assessment

The self-rating and feeling axes are deliberately separate because they capture orthogonal information:

```
              Easy    Ok    Hard
  Great    |   ✓   |  ✓  |  ✓  |   "Hard but Great" = flow state, growth
  Okay     |   ✓   |  ✓  |  ✓  |   "Easy and Okay" = comfort zone
  Tough    |   ✓   |  ✓  |  ✓  |   "Hard and Tough" = maybe too ambitious
```

This 3x3 matrix provides rich signal for the system:
- **Hard + Great** = the user was in a flow state, challenge level was right
- **Easy + Okay** = the user might need higher difficulty next time
- **Hard + Tough** = the challenge level might need to decrease, or the scaffolding needs improvement
- **Easy + Great** = comfort zone success, user might be ready to level up

Over time, this data creates a profile of what challenge levels produce engagement vs. frustration for each individual.

### Celebration

Completion triggers a confetti animation — colored particles in the system's palette, falling from the top of the screen. This is a small detail with outsized psychological impact: it creates a moment of celebration that anchors the feeling of accomplishment.

The confetti is deliberate, not just decorative. It creates an emotional peak at the end of the experience (peak-end rule), making the entire session feel more positive in retrospect.

---

## Phase 5: Sustained Engagement

**Problem:** One-time completion is easy. Sustained behavior change requires a system that acknowledges human imperfection and rewards consistency without punishing gaps.

### Streak System

The streak tracks consecutive days with at least one completed action:

```
Completion logic (server-side):
  if yesterday exists in completed_dates:
    streak = old_streak + 1
  else:
    streak = 1
    last_streak_before_reset = old_streak

  best_streak = max(best_streak, new_streak)
```

The streak is visualized as a calendar view where consecutive days form connected visual "pills" — creating a tangible chain the user doesn't want to break.

### Weekly Pass — Forgiving Imperfection

The most behaviorally important feature: a weekly pass that lets users restore a broken streak.

```
Conditions:
  - weeklyPassAvailable === true
  - lastStreakBeforeReset > 0 (there was a streak worth saving)

Effect:
  - streak = lastStreakBeforeReset (restored)
  - weeklyPassAvailable = false

Reset:
  - weeklyPassAvailable resets to true each new ISO week
```

This solves the "I missed one day and now my 30-day streak is gone, why bother" problem. One free pass per week means:
- A single bad day doesn't destroy weeks of progress
- Users feel the system is on their side, not punishing them
- The pass is scarce enough (once per week) to maintain streak value
- It creates a strategic decision: "Should I use my pass now or save it?"

### The Trophy Wall

Completed missions accumulate in a historical view. Each completion carries its proof (photo, note), self-assessment, and timestamp. The calendar visualization shows colored dots for each completed mission on its date, with the mission's assigned color.

This transforms individual completions into a visible body of work — proof that effort compounds over time.

### The "Do Again" Pattern

Completed missions remain accessible and can be repeated. This is critical for skill-building domains where the same activity (practice piano, run 5K, meditate) should be done regularly. The system doesn't treat completion as archival — it treats it as one iteration in an ongoing practice.

---

## Why This Matters Architecturally

The Guided Achievement Engine is not a to-do list with AI. It's a behavioral pipeline where each phase creates the conditions for the next:

1. **Without refinement**, users create vague goals that can't be executed
2. **Without scaffolding**, users have goals but no plan to achieve them
3. **Without guided execution**, users have plans but lose focus
4. **Without proof**, users finish but don't feel a sense of accomplishment
5. **Without streaks and forgiveness**, users accomplish things once but don't build habits

Remove any phase and the pipeline breaks. The system works because it's complete — it addresses the full lifecycle of human intention from "I vaguely want to do something" to "I've built a sustained practice."

The AI components (refinement, card generation, resource search) are enablers, not the core innovation. The core innovation is the **behavioral architecture** — the specific fields, the specific flow, the specific forgiveness mechanisms. The AI makes it scalable (one system handles millions of different goals), but the structure is what makes it effective.

---

## Key Architectural Patterns

### 1. Discriminated Response Types

Every AI interaction returns one of a finite set of typed responses (`Refinement | Card | Inspiration`), each validated against a strict schema. This makes the system predictable and testable despite using generative AI — the model's creativity is channeled through a fixed structural contract.

### 2. Progressive Narrowing with Context Accumulation

The selection path grows with each user choice, and full context is carried forward in every option's value. The AI never asks about something the user already specified. This creates a conversational feel without actual multi-turn conversation — each call is stateless on the server, with the client threading context through the `selectionPath` array.

### 3. Server-Side Behavioral Guardrails

The AI is given guidelines in the prompt, but critical behavioral rules are enforced server-side:
- Round 3+ forces a card regardless of model output
- Resource URLs are validated for liveness
- Input is sanitized against injection
- Rate limits prevent abuse
- A fallback card is always available if the model fails entirely

This "trust but verify" pattern means the system degrades gracefully — the worst case is a generic but functional card, never a broken state.

### 4. Optimistic Updates with Async Reconciliation

The client applies all state changes immediately using temporary IDs (`temp-` prefix), then reconciles with server responses asynchronously. A `pendingIds` map tracks temp-to-real ID resolution, and dependent operations (like completing a mission created moments ago) await the real ID before calling the server.

Critical design choice: **completion is never reverted on server failure** ("completion is important — leave optimistic"). The user's sense of accomplishment is protected even if the network is unreliable.

### 5. Layered AI with Specialized Agents

Different AI tasks use different models optimized for their requirements:
- **Refinement/Card generation** — language model (creative, structured output)
- **Resource search** — model with grounded web search tool (factual, URL-verified)
- **Inspiration** — language model with high temperature (creative, diverse)

Each agent has its own system prompt, schema, and validation pipeline. This separation means each can be tuned, swapped, or scaled independently.

### 6. Live Prompt Management

System prompts are served from a remote prompt hub with caching (5-minute TTL, 60-second background refresh). Prompts can be edited and deployed without any code changes — the running system picks up new prompts within minutes. Hardcoded prompts serve as fallbacks if the prompt hub is unreachable.

### 7. Structured Scaffolding Fields

The five scaffolding fields (`tinyStart`, `doneLooksLike`, `obstaclePlan`, `materials`, `helpers`) aren't free-form advice — they're typed, validated fields with strict quality rules enforced in the prompt. This means the UI can render them in dedicated, purpose-built components rather than as generic text blocks.

### 8. Two-Axis Self-Assessment

Separating difficulty rating from emotional feeling creates a 3x3 matrix of completion states. This is richer than a single "how did it go?" question and provides actionable signal for adaptive difficulty, without requiring the user to think hard about their response.

### 9. Forgiveness Mechanisms

The weekly pass system acknowledges that humans are imperfect. Instead of a brittle all-or-nothing streak, the system provides a recovery mechanism that maintains motivation while preserving the value of consistency.

### 10. Graceful Degradation at Every Layer

- AI fails → fallback card from user's raw input
- Prompt hub unreachable → hardcoded fallback prompts
- Resource URLs all invalid → return originals rather than empty
- Server unreachable → optimistic state preserved on client
- Photo upload fails → completion still works without photo

The system never reaches a dead end. Every failure mode has a path forward.

---

## The Full Pattern

```
┌─────────────────────────────────────────────────────────────────────┐
│                    GUIDED ACHIEVEMENT ENGINE                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  PHASE 1: INTENT CAPTURE & AI REFINEMENT                           │
│  ┌─────────────┐    ┌──────────────┐    ┌────────────────────┐     │
│  │ User Input  │───→│  Verb+Object │─Y─→│  Generate Card     │     │
│  │ (or Inspire)│    │  Detection   │    │  (immediate)       │     │
│  └─────────────┘    └──────┬───────┘    └────────┬───────────┘     │
│                            │ N                    │                  │
│                     ┌──────▼───────┐              │                  │
│                     │  Refinement  │              │                  │
│                     │  Bubble      │◄─────┐       │                  │
│                     │  (narrow 1   │      │       │                  │
│                     │   dimension) │      │       │                  │
│                     └──────┬───────┘      │       │                  │
│                            │ select       │       │                  │
│                     ┌──────▼───────┐      │       │                  │
│                     │  Round < 3?  │──Y───┘       │                  │
│                     └──────┬───────┘              │                  │
│                            │ N (force card)       │                  │
│                            └──────────────────────┤                  │
│                                                   ▼                  │
│  PHASE 2: ACTION EQUIPPING                                          │
│  ┌────────────────────────────────────────────────────────────┐     │
│  │  Structured Card                                           │     │
│  │  ┌──────────┐ ┌───────────────┐ ┌──────────────────────┐  │     │
│  │  │ tinyStart│ │doneLooksLike  │ │ obstaclePlan         │  │     │
│  │  │ <60 sec  │ │observable     │ │ "If stuck —"         │  │     │
│  │  │ first act│ │artifact       │ │ specific strategy    │  │     │
│  │  └──────────┘ └───────────────┘ └──────────────────────┘  │     │
│  │  ┌──────────────────┐  ┌──────────────────────────────┐   │     │
│  │  │ materials[]      │  │ helpers[] (verified URLs)     │   │     │
│  │  │ interactive      │  │ search → validate → trim to 3│   │     │
│  │  │ checklist        │  │ SSRF-protected               │   │     │
│  │  └──────────────────┘  └──────────────────────────────┘   │     │
│  │  ┌──────────────────────────────────────────────────────┐ │     │
│  │  │ challengeLevels[3] — contextual difficulty variants  │ │     │
│  │  │ + duration scaling per difficulty tier               │ │     │
│  │  └──────────────────────────────────────────────────────┘ │     │
│  └────────────────────────────────────────────────────────────┘     │
│                                    │                                 │
│                                    ▼                                 │
│  PHASE 3: GUIDED EXECUTION                                          │
│  ┌────────────────────────────────────────────────────────────┐     │
│  │  Timer (elapsed, not countdown)                            │     │
│  │  + Scaffolding board: all fields visible during execution  │     │
│  │  + Materials checklist (interactive)                       │     │
│  │  + Resource links (tappable)                               │     │
│  │  + Pause / Resume with full state preservation             │     │
│  │  + Explicit "I'm Done!" (no auto-complete)                 │     │
│  └────────────────────────────────────────────────────────────┘     │
│                                    │                                 │
│                                    ▼                                 │
│  PHASE 4: PROOF & REFLECTION                                        │
│  ┌────────────────────────────────────────────────────────────┐     │
│  │  Photo capture (optional) → cloud upload                   │     │
│  │  Note (optional) → freeform text                           │     │
│  │  Self-rating (required):  Easy | Ok | Hard                 │     │
│  │  Feeling (required):      Great | Okay | Tough             │     │
│  │  → 3×3 matrix of completion states                         │     │
│  │  → Celebration animation (confetti / peak-end rule)        │     │
│  └────────────────────────────────────────────────────────────┘     │
│                                    │                                 │
│                                    ▼                                 │
│  PHASE 5: SUSTAINED ENGAGEMENT                                      │
│  ┌────────────────────────────────────────────────────────────┐     │
│  │  Streak: consecutive days with ≥1 completion               │     │
│  │  Best streak: all-time high watermark                      │     │
│  │  Weekly pass: restore broken streak (1x/week, auto-reset)  │     │
│  │  Calendar: visual chain + colored dots per mission         │     │
│  │  Trophy wall: accumulated proof across all completions     │     │
│  │  Repeat: completed actions remain accessible for re-doing  │     │
│  └────────────────────────────────────────────────────────────┘     │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Implementation Lessons

### What Worked Well

**Verb + object detection as the branching heuristic.** Instead of always asking clarifying questions (annoying for specific users) or always generating cards (unusable for vague users), the single rule "does this have a verb and an object?" correctly routes ~90% of inputs. It's simple, explainable, and tunable via prompt.

**Forcing a card at round 3.** Without a hard stop, the refinement loop occasionally entered cycles where the model kept narrowing without ever committing. The server-side override at round 3 solved this completely — and the fallback card built from accumulated context is usually good enough.

**Separating search from generation.** Using a dedicated search agent with real web access for resources, rather than asking the generation model to produce URLs, eliminated hallucinated links entirely. The validation pipeline (liveness checks, SSRF protection, redirect resolution) catches the remaining edge cases.

**"Completion is never reverted."** The decision to keep optimistic completion state even if the server call fails was counterintuitive but correct. In behavioral terms, the cost of taking away someone's sense of accomplishment (and breaking their streak) due to a network hiccup far outweighs the cost of a slightly inconsistent server state.

**The weekly pass as a retention mechanism.** Users who lost a streak without a recovery option frequently churned. The weekly pass reduced this dramatically — not because it was used often, but because knowing it existed reduced the anxiety around maintaining a perfect record.

**Structured scaffolding fields over free-form advice.** By making `tinyStart`, `doneLooksLike`, etc. typed fields with strict validation rules, the UI can render them in purpose-built components (a prominent "start here" callout, a visible finish line, an interactive checklist). This is fundamentally different from — and more effective than — a paragraph of AI-generated advice.

### What Required Iteration

**Prompt engineering for field quality.** The scaffolding fields required extensive prompt iteration. Early versions of `tinyStart` would generate meta-steps ("think about what you want to do") instead of physical actions. `doneLooksLike` would produce feelings ("feel accomplished") instead of observable artifacts. `obstaclePlan` would generate generic advice ("break it into smaller steps"). Each field required explicit negative examples in the prompt to reach consistent quality.

**Resource validation latency.** Validating 4-5 URLs sequentially added noticeable latency. The solution was parallel validation with aggressive timeouts (3s per URL) and the "return originals if all fail" fallback. Users see resources a beat after the card appears, which reads as "searching" rather than "broken."

**Challenge levels vs. difficulty labels.** The initial design used generic "Easy / Medium / Hard" labels. User testing showed these felt judgmental and didn't help users understand what each level actually meant. Contextual labels (e.g., "Scrambled eggs" / "Cheese omelette" / "Eggs Benedict") performed dramatically better — users could immediately picture what each difficulty level entailed.

**Inspiration diversity.** Early inspiration prompts would cluster around the same few domains (drawing, reading, exercise). Explicit diversity requirements ("never repeat the same domain twice in one set") and domain coverage rules ("mix academic + creative + physical + life skills") were needed to make the inspiration flow feel genuinely expansive.

**Streak calculation edge cases.** Timezone handling in streak logic (what counts as "yesterday"?) and the interaction between weekly passes and streak restoration required careful server-side implementation. The key insight was to use ISO dates (YYYY-MM-DD) everywhere and compute streaks server-side to avoid client timezone drift.

---

## Domain Application Examples

The Guided Achievement Engine is domain-agnostic. Here's how the same five-phase pipeline maps to different verticals:

### Fitness & Health

```
Phase 1: "I want to get in shape"
  → Refinement: "What kind of activity?" → Running / Strength / Yoga / Swimming
  → "Running" → Card: "Complete a 20-minute interval run"

Phase 2: Scaffolding
  tinyStart: "Put on your running shoes and step outside"
  doneLooksLike: "20 minutes of run/walk intervals completed"
  obstaclePlan: "If stuck — walk for 2 minutes, then try running for 30 seconds"
  materials: ["Running shoes", "Water bottle", "Phone with timer"]
  helpers: [Couch-to-5K app link, interval timer video]

Phase 3: Elapsed timer tracking workout duration, interval prompts visible

Phase 4: Selfie at finish + "Easy/Ok/Hard" + "Great/Okay/Tough"
  → "Hard + Great" = runner's high, challenge was right

Phase 5: Running streak, weekly rest day pass, distance/time progression log
```

### Therapy & Mental Health Homework

```
Phase 1: "I need to work on my anxiety"
  → Refinement: "What aspect?" → Breathing exercises / Thought journaling /
    Exposure practice / Grounding techniques
  → "Thought journaling" → Card: "Write a thought record for one anxious thought"

Phase 2: Scaffolding
  tinyStart: "Open your journal and write today's date"
  doneLooksLike: "One completed thought record with situation, thought,
    evidence for/against, and balanced thought"
  obstaclePlan: "If stuck — start with just describing the situation in 2 sentences"
  materials: ["Journal or paper", "Pen"]
  helpers: [CBT thought record template, example filled-in record]

Phase 3: Timer for journaling session, template visible alongside

Phase 4: Note about insights + difficulty/feeling assessment
  → Therapist can review the 3×3 matrix over time to track progress

Phase 5: Journaling streak, weekly pass for tough weeks, accumulated entries as progress
```

### Creative Projects

```
Phase 1: "I want to write music"
  → Refinement: "What kind?" → Lyrics / Melody / Beat production / Full song
  → "Lyrics" → Refinement: "What style?" → Rap / Pop / Poetry / Storytelling
  → Card: "Write one verse of rap lyrics"

Phase 2: Scaffolding
  tinyStart: "Write down one line about how you feel right now"
  doneLooksLike: "8-16 bars of original lyrics with a consistent rhyme scheme"
  obstaclePlan: "If stuck — freestyle out loud for 30 seconds and write
    down whatever comes out"
  materials: ["Notebook", "Pen", "Phone for recording"]
  helpers: [Rhyme dictionary, beat instrumental playlist, rap writing tutorial]

Phase 3: Writing timer, rhyme resources accessible, beat playing

Phase 4: Record a voice memo of the verse + difficulty/feeling

Phase 5: Writing streak, portfolio of verses, progression from single bars to full songs
```

### Professional Development

```
Phase 1: "I want to learn data science"
  → Refinement: "What area?" → Python basics / Statistics / ML fundamentals /
    Data visualization
  → "Python basics" → Card: "Complete one Python exercise on list comprehensions"

Phase 2: Scaffolding
  tinyStart: "Open your code editor and type: numbers = [1, 2, 3, 4, 5]"
  doneLooksLike: "Three working list comprehension examples saved in a .py file"
  obstaclePlan: "If stuck — rewrite the example using a regular for loop first,
    then convert it"
  materials: ["Computer", "Python installed", "Code editor"]
  helpers: [Python docs on list comprehensions, interactive tutorial link]

Phase 3: Coding timer, documentation accessible, editor open

Phase 4: Screenshot of working code + difficulty/feeling

Phase 5: Learning streak, skill progression tracking, weekly pass for busy weeks
```

### Household & Life Management

```
Phase 1: "I need to declutter"
  → Refinement: "What space?" → Bedroom / Kitchen / Closet / Garage
  → "Closet" → Card: "Sort and organize one shelf of your closet"

Phase 2: Scaffolding
  tinyStart: "Take everything off one shelf and put it on your bed"
  doneLooksLike: "One shelf organized with items in keep/donate/trash piles,
    shelf wiped clean, keep items returned neatly"
  obstaclePlan: "If stuck — set a 'maybe' pile and decide on those items last"
  materials: ["Trash bag", "Donation box", "Cleaning cloth"]
  helpers: [KonMari folding technique video, closet organization ideas]

Phase 3: Timer for cleaning session, method reference accessible

Phase 4: Before/after photo + difficulty/feeling

Phase 5: Decluttering streak, room-by-room progress, weekly pass
```

---

### The Engine Is the Product

In each domain above, the same five phases appear with the same structural fields. What changes is:
- The **prompt content** (domain-specific examples, vocabulary, safety rules)
- The **resource sources** (fitness apps vs. coding tutorials vs. therapy templates)
- The **proof format** (photo, screenshot, recording, journal entry)
- The **streak semantics** (daily practice vs. weekly sessions vs. rest-day-aware)

The engine itself — intent capture, scaffolding generation, guided execution, proof & reflection, sustained engagement — remains identical. This is what makes it intellectual property rather than just an application: it's a reusable behavioral architecture that can be skinned for any domain where humans struggle to convert intention into consistent action.
