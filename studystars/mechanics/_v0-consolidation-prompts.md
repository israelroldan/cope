# Consolidation Prompts — Before Downloading to Monorepo

## Strategy

v0 is great at visual components but expensive for logic/type refactoring. Split accordingly:

- **v0 (5 prompts)**: New visual components that benefit from live preview — Content Slideshow (#33), Wow Moment, Pimpi Chat, PostItCard, Mixed Assessment (#34)
- **Monorepo (6 tasks)**: Types, hooks, state machines, orchestration, accessibility — all pure logic or attribute-level work

Run the 5 v0 prompts first (they're independent, can run in parallel). Then download to monorepo and do the 6 logic tasks there.

---

# PART 1 — v0 PROMPTS (visual components)

---

## v0 Prompt 1 of 4 — Content Slideshow (Mechanic #33)

```
NEW MECHANIC: Create a Content Slideshow component — mechanic #33 in our system.

This is the content delivery mechanic for the Spark lesson flow. It's a swipeable sequence of 1-5 narrated slides that teach concepts before an activity tests them. Think of it as a Scenario (#15) without the questions — pure storytelling.

Create `components/mechanics/ContentSlideshow.tsx`:

### Props (follows MechanicProps pattern like all other mechanics):
```typescript
interface ContentSlideshowContent {
  slides: {
    title: string;           // short card title, 2-6 words
    narration: string;       // 1-3 sentences of conversational storytelling, max ~80 words
    imagePrompt?: string;    // placeholder for AI-generated image
    imageUrl?: string;       // if image already generated
    factIds?: string[];      // which facts this slide teaches
  }[];
  transition?: 'swipe-left' | 'fade' | 'push-up' | 'none';
}

interface ContentSlideshowProps {
  content: ContentSlideshowContent;
  ageGroup: '8-10' | '11-13' | '14-16';
  onComplete: () => void;    // fires when kid taps through last slide
}
```

### Visual design:
- Each slide is a full-width card with rounded corners (16px), slight shadow
- Background: white or very light cream
- **Image area** (top 40%): Shows placeholder frame with the text "[Image: {imagePrompt}]" if no imageUrl. If imageUrl provided, show the image with rounded top corners.
- **Title**: DM Sans Bold, 18-22px depending on age group, below image area
- **Narration**: DM Sans Regular, 14-18px depending on age group, left-aligned, 1.5x line spacing
- **Dot pagination** at bottom center: ● ● ○ ○ showing current position
- **Navigation**: Swipe left to advance, swipe right to go back. Also support tap on right/left edges (right 25% = forward, left 25% = back).
- **Last slide**: Navigation changes from right-arrow/swipe to an orange pill-shaped "Got it!" button (matches existing orange accent color). This button fires onComplete.
- **Entry animation**: First slide fades in. Subsequent slides swipe in from right (or use the specified transition).
- **No auto-advance** — the kid controls the pace.

### Age adaptations:
- 8-10: Larger text (18px body), bigger "Got it!" button with bounce animation, vivid dot indicators (colored), max 2-3 slides in demo
- 11-13: Standard sizing (16px body), subtle arrow hint on first slide, 2-4 slides in demo
- 14-16: Same sizing (16px), minimal navigation chrome, can show optional "~15 sec read" hint on slide 1, 2-5 slides in demo

### Demo page:
Create a demo/preview showing a 3-slide content slideshow about the solar system:

Slide 1:
- Title: "Our Cosmic Neighborhood"
- Narration: "Our solar system is a tiny corner of the Milky Way galaxy. At its center sits the Sun — a star so massive that 1.3 million Earths could fit inside it. Everything else, all the planets, moons, and asteroids, orbits around it."
- imagePrompt: "The Sun at center with planets orbiting in concentric paths, deep space background with stars, warm golden light radiating from the Sun"

Slide 2:
- Title: "The Rocky Four"
- Narration: "The four planets closest to the Sun — Mercury, Venus, Earth, and Mars — are all made of rock and metal. They're small, dense, and warm. Earth is the only one with liquid water on its surface, which is why it's the only one (that we know of) with life."
- imagePrompt: "Four rocky planets in a row showing their relative sizes, Mercury smallest on left to Mars on right, with Earth's blue oceans visible, dark space background"

Slide 3:
- Title: "The Gas Giants"
- Narration: "Beyond Mars, everything changes. Jupiter and Saturn are enormous balls of gas — Jupiter alone could swallow all the other planets combined. And then there's Saturn's rings, made of billions of chunks of ice and rock, some as small as grains of sand and some as big as houses."
- imagePrompt: "Jupiter and Saturn side by side with Saturn's magnificent rings clearly visible, showing the enormous scale difference compared to a tiny Earth for reference, dramatic lighting"

The demo should show the slideshow with swipe navigation and the "Got it!" button on the last slide. Include an age group toggle so the reviewer can see all three age adaptations.

IMPORTANT: This component should follow the same visual language as the existing mechanics — DM Sans font, orange primary accent, white canvas, post-it aesthetic where appropriate. It needs to feel like it belongs alongside the other 32 mechanics, not like a separate "content" system.
```

---

## v0 Prompt 2 of 4 — Wow Moment

```
NEW COMPONENT: Create the WOW moment component for emotional peaks in the Spark lesson.

WOW moments are dramatic, fullscreen reveals of jaw-dropping facts. They're placed strategically (max 2 per Spark) between content and activities.

Create `components/spark/WowMoment.tsx`:

### Visual design:
- FULLSCREEN takeover — covers the entire viewport
- Dark background with subtle radial gradient (deep purple/indigo → near-black)
- Large emoji or icon at top center (🤯, 🌋, 💡, 🦕 etc.) — passed as prop
- WOW fact text: large, white, centered, DM Sans Bold, 20-28px depending on age
- Text appears with staggered word-by-word animation: each word fades in with slight upward motion, 150ms stagger between words
- Subtle particle shimmer or gentle floating sparkles in background (CSS-only, lightweight)
- "Did you know?" or "Wow!" label at top in smaller text, slightly transparent
- "Continue" button appears AFTER all text has animated in (1.5-2s delay), with a gentle fade-in
- Exit animation: scale down (0.95) + fade out over 300ms

### Props:
```typescript
interface WowMomentProps {
  fact: string;                        // the wow fact text
  emoji?: string;                      // large emoji at top (default "🤯")
  label?: string;                      // "Did you know?" / "Mind-blown!" / "Wow!" (default "Did you know?")
  factId?: string;                     // reference to fact sheet
  onContinue: () => void;
  ageGroup: '8-10' | '11-13' | '14-16';
}
```

### Age adaptations:
- 8-10: Larger emoji (80px), bigger text (24-28px), "Wow!" label, playful sparkle animation, big bouncy "Continue" button
- 11-13: Medium emoji (60px), 22-24px text, "Did you know?" label, subtle sparkles
- 14-16: Slightly smaller emoji (48px), 20-22px text, "Did you know?" label, minimal animation, understated elegance

### Demo page:
Create a demo showing 2 WOW moments you can tap through, with an age group toggle:

WOW 1:
- fact: "A teaspoon of a neutron star would weigh about 6 billion tons — that's roughly the weight of Mount Everest"
- emoji: "⭐"

WOW 2:
- fact: "Honey never spoils. Archaeologists found 3,000-year-old honey in Egyptian tombs that was still perfectly edible"
- emoji: "🍯"

Make the word-by-word animation feel dramatic and cinematic — like a movie reveal. The background should feel like deep space or a dark theater. This is the emotional peak of the lesson and should feel special compared to every other component.
```

---

## v0 Prompt 3 of 4 — Pimpi Chat Bubble Component

```
NEW COMPONENT: Create a reusable Pimpi chat component with two modes.

Create `components/shared/PimpiChat.tsx`:

### Mode 1: `evaluation` (used by open-ended mechanic #23 — Pimpi evaluates a single response)
- Pimpi avatar on left, speech bubble on right
- Single message from Pimpi (the evaluation feedback)
- No text input — kid reads Pimpi's evaluation, then taps "Continue"
- Typing indicator animation (3 bouncing dots) before message appears
- Message appears with typewriter effect (character by character, ~30ms per char)
- After message finishes, "Continue" button fades in

### Mode 2: `conversation` (used by "Explain to Pimpi" reflection — multi-turn dialogue)
- Full chat interface: messages stack vertically, scrollable
- Kid's messages on right (white bubbles with light border)
- Pimpi's messages on left (yellow bubbles matching post-it yellow #FFF9C4)
- Pimpi avatar (small, circular) next to each of Pimpi's messages
- Text input pinned to bottom with orange "Send" button
- Typing indicator (3 bouncing dots in yellow bubble) while waiting for Pimpi's response
- Turn counter displayed subtly in top corner: "3 of 8"
- Auto-scroll to latest message with smooth animation

### Props:
```typescript
interface PimpiChatProps {
  mode: 'evaluation' | 'conversation';
  // Evaluation mode:
  pimpiMessage?: string;              // single evaluation message
  onContinue?: () => void;            // when kid taps Continue after reading
  // Conversation mode:
  messages?: ChatMessage[];           // full conversation history
  onSendMessage?: (text: string) => void;
  isTyping?: boolean;                 // show typing indicator
  currentTurn?: number;
  maxTurns?: number;
  // Shared:
  pimpiMood?: 'curious' | 'excited' | 'thinking' | 'celebrating' | 'encouraging';
  disabled?: boolean;
}

interface ChatMessage {
  id: string;
  sender: 'kid' | 'pimpi';
  text: string;
  timestamp: number;
}
```

### Visual rules:
- Pimpi avatar: use a friendly cartoon mascot placeholder (round, colorful, ~40px). It should feel like the existing Pimpi mascots in the project.
- Speech bubbles: rounded corners (16px), slight shadow
- Pimpi bubbles: yellow (#FFF9C4), tail pointing left
- Kid bubbles: white with 1px gray border, tail pointing right
- DM Sans font throughout, 14-16px
- Send button: orange circle with white arrow icon
- Text input: rounded rectangle, light gray background, placeholder "Type your explanation..."
- Typing indicator: 3 dots in a yellow bubble, bouncing animation (each dot 200ms offset)
- Must look good on mobile — full-width chat, input pinned to bottom with safe area padding

### Mood-based Pimpi avatar variations:
- curious: slightly tilted head, one eyebrow raised
- excited: wide eyes, big smile
- thinking: hand on chin, looking up
- celebrating: arms up, stars around
- encouraging: thumbs up, warm smile
(Use simple emoji-like variations or CSS transforms on the base avatar — don't require separate image assets)

### Demo page:
Create a demo with two tabs:

Tab 1 — "Evaluation Mode":
Show Pimpi delivering this evaluation: "Nice work! You clearly understand that mummification was about preserving the body for the afterlife. I love how you mentioned the natron salt — that's a detail most people forget! One thing to think about: why did they remove most organs but keep the heart? 🤔"

Tab 2 — "Conversation Mode":
Show a pre-loaded 4-message conversation:
1. Pimpi: "So we just learned about mummification — can you explain it to me? I want to make sure I got it!"
2. Kid: "They preserved dead bodies so the soul could come back. They used salt and wrapped them in cloth."
3. Pimpi: "Whoa, they used salt? That's so interesting! What was the salt called, do you remember?"
4. Kid: "Natron! They left the body in natron for like 40 days to dry it out."
Then show the typing indicator (Pimpi is "responding"). Include the turn counter "4 of 8".

Include an age group toggle to show different text sizing.
```

---

## v0 Prompt 4 of 4 — PostItCard Shared Component

```
CONSOLIDATION TASK: Extract a shared PostItCard component used across multiple mechanics.

Several mechanics use card-like elements: flashcards, matching pairs, categorization cards, drag items. Extract the shared visual treatment into `components/shared/PostItCard.tsx`:

### Props:
```typescript
interface PostItCardProps {
  children: React.ReactNode;           // card content
  color?: 'yellow' | 'blue' | 'green' | 'pink' | 'orange' | 'white';
  size?: 'sm' | 'md' | 'lg';
  rotation?: number;                   // slight random tilt (-3 to 3 degrees), default auto-random
  isFlipped?: boolean;                 // for flashcard 3D flip animation
  backContent?: React.ReactNode;       // content on the back (for flashcard mode)
  isDragging?: boolean;                // elevated visual state when being dragged
  isMatched?: boolean;                 // dim/shrink when matched (matching pairs)
  isSelected?: boolean;                // highlighted border when tapped
  onTap?: () => void;
  onFlip?: () => void;
}
```

### Visual rules:
- Slightly off-square rectangle with soft shadow (2px 4px 12px rgba(0,0,0,0.08))
- Default color: yellow (#FFF9C4) — matches existing post-it aesthetic
- Color palette: yellow (#FFF9C4), blue (#BBDEFB), green (#C8E6C9), pink (#F8BBD0), orange (#FFE0B2), white (#FFFFFF)
- Subtle rotation (auto-random between -2 and 2 degrees) for organic, hand-placed feel
- Rounded corners (12px)
- Content centered, DM Sans font

### States:
- **Default**: Flat, slight shadow, subtle rotation
- **isDragging**: Shadow increases (0 8px 24px rgba(0,0,0,0.15)), scale 1.05, rotation 0 (snaps straight), slight z-index lift
- **isMatched**: Scale 0.9, opacity 0.5, pointer-events none, transition 300ms ease-out
- **isFlipped**: 3D flip animation (rotateY 180deg, 400ms, with backface-visibility hidden). Front shows children, back shows backContent.
- **isSelected**: Orange border (2px solid #FF6B35), slight scale 1.02

### Size variants:
- sm: 80x80px, 12px font — for dense grids (categorization, matching with many items)
- md: 120x100px, 14px font — default size (flashcards, matching pairs)
- lg: 160x120px, 16px font — for fewer items or younger kids

### Demo page:
Create a demo showing all PostItCard states:
1. Row of 6 cards in different colors, each with slight random rotation
2. A card mid-drag (elevated shadow)
3. A matched card (dimmed)
4. A flippable card — tap to flip (front: "What is the capital of France?", back: "Paris!")
5. A selected card (orange border)
6. All three sizes side by side

This component should be the visual foundation that flashcard, matching-pairs, categorization, and any drag-based mechanic can use instead of custom styled divs. The goal is visual consistency across the project.
```

---

## v0 Prompt 5 of 5 — Mixed Assessment (Mechanic #34)

```
NEW MECHANIC: Create a Mixed Assessment component — mechanic #34 in our system.

This is a meta-activity that composes 2-6 questions from different mechanic types into a mini-quiz. Each question renders as its native mechanic UI (MC renders option buttons, sequence-reorder renders a draggable list, etc.). Used for recaps, reviews, and checkpoints — NOT part of the core Spark lesson flow.

Create `components/mechanics/MixedAssessment.tsx`:

### Props (follows MechanicProps pattern):
```typescript
interface MixedAssessmentContent {
  title?: string;                    // e.g. "Quick Recap" — defaults to "Quick Check"
  questions: {
    mechanicId: string;              // slug of the sub-mechanic (e.g. "true-false", "sequence-reorder")
    content: any;                    // conforms to that mechanic's contentSchema
    _factRefs?: string[];
  }[];
  showProgress?: boolean;            // show "Question 2 of 4" — default true
  shuffleOrder?: boolean;            // randomize question order — default false
}

interface MixedAssessmentProps {
  content: MixedAssessmentContent;
  ageGroup: '8-10' | '11-13' | '14-16';
  onComplete: (result: MixedAssessmentResult) => void;
}

interface MixedAssessmentResult {
  mechanicId: 'mixed-assessment';
  score: number;                     // 0-1 normalized
  maxPoints: number;
  timeSpent: number;
  perQuestion: {
    mechanicId: string;
    correct: boolean;
    score: number;
  }[];
}
```

### Architecture:
The key challenge: this component must RENDER other mechanic components inside itself. For the v0 prototype, inline the sub-mechanic rendering (copy the existing MC, True/False, Sequence Reorder, Numerical Slider components or import them). In the monorepo, this will use MechanicRenderer.

For the prototype, support these 4 sub-mechanics as a proof of concept:
- true-false
- multiple-choice
- sequence-reorder
- numerical-slider

### UX Flow:
1. **Title screen** (optional, 1s): Shows assessment title with a subtle fade-in, then auto-advances
2. **Question screen**: One question at a time, full-width. Progress bar at top (thin orange line). Optional "Question 2 of 4" text.
3. **Each question**: Renders the sub-mechanic's native UI. Kid interacts exactly as they would with the standalone version.
4. **After answering**: Feedback overlay appears (green check or red X + brief explanation) for 1.5 seconds, then auto-slides to next question.
5. **Summary screen**: Appears after last question. Shows total score and per-question mini-review.

### Visual design:

Progress bar:
- Thin (3px) orange line at very top of screen
- Fills proportionally as questions are completed
- Smooth animation on fill

Question counter (below progress bar):
- "Question 2 of 4" in DM Sans, 12px, gray, centered
- For ages 8-10: hide this text, just show progress bar

Question area:
- Full-width, vertically centered
- Each sub-mechanic renders in its native layout (as if standalone)
- Transition between questions: slide left (current slides out, next slides in, 300ms)

Feedback between questions:
- Overlay fades in over the question
- Correct: green circle with white checkmark, "Nice!" text
- Incorrect: orange circle with X, "Not quite" text, 1-line explanation below
- Duration: 1.5 seconds, then auto-advance with slide-left transition

Summary screen:
- Title: "Your Results" (or "Great Job!" for ages 8-10)
- Score display:
  - Ages 8-10: Stars (⭐⭐⭐ for 3/4 correct, ⭐⭐ for 2/4, etc.)
  - Ages 11-13: "3 out of 4" with a circular progress ring
  - Ages 14-16: "75%" with circular progress ring + per-question breakdown
- Per-question row: small mechanic type icon (or emoji: ✓/✗) + mechanic name + result
- "Done" button at bottom: orange pill, fires onComplete

### No back navigation:
- Kids CANNOT go back to previous questions
- This is intentional — each question is a one-shot attempt
- No "Previous" button or swipe-right-to-go-back

### Demo page:
Create a demo with a 4-question assessment about the solar system:

Question 1 (true-false):
- statement: "The Sun is the largest object in our solar system."
- isTrue: true
- explanation: "The Sun contains 99.86% of all the mass in the solar system."

Question 2 (multiple-choice):
- question: "Which planet is known as the 'Red Planet'?"
- options: ["Venus", "Mars", "Jupiter", "Saturn"]
- correctIndex: 1
- explanation: "Mars appears red because its surface is covered in iron oxide (rust)."

Question 3 (sequence-reorder):
- prompt: "Order these planets from closest to farthest from the Sun:"
- items:
  - { label: "Mercury", text: "Smallest planet, closest to the Sun" }
  - { label: "Earth", text: "Third planet, the one we live on" }
  - { label: "Jupiter", text: "Largest planet, a gas giant" }
  - { label: "Neptune", text: "Farthest major planet, an ice giant" }

Question 4 (numerical-slider):
- prompt: "How many moons does Jupiter have?"
- correctValue: 95
- minValue: 1
- maxValue: 200
- unit: "moons"
- acceptableRange: 10
- explanation: "As of 2024, Jupiter has 95 confirmed moons, making it the planet with the most known moons."

Include an age group toggle to show the different summary treatments (stars vs fraction vs percentage).

IMPORTANT: Follow the existing project's visual language — DM Sans font, orange primary accent, white canvas. The sub-mechanic UIs inside each question should look IDENTICAL to their standalone versions. The mixed assessment just wraps them with a progress bar and transitions.
```

---

# PART 2 — MONOREPO TASKS (logic, types, refactoring)

> Do these after downloading the v0 project. They're pure TypeScript/logic work.

---

## Monorepo Task 1 — MechanicProps + MechanicRenderer

Create `lib/types/mechanic-props.ts` with standardized interfaces:

```typescript
export interface MechanicProps<TContent = any> {
  content: TContent;
  ageGroup: '8-10' | '11-13' | '14-16';
  mode?: 'standard' | 'game';
  onComplete: (result: MechanicResult) => void;
  onSkip?: () => void;
}

export interface MechanicResult {
  mechanicId: string;
  score: number;            // 0-1 normalized
  maxPoints: number;
  timeSpent: number;        // ms
  attempts: number;
  correct: boolean;
  responses: Record<string, any>;
}

export type MechanicId =
  | 'true-false' | 'fill-in-blank' | 'multiple-choice' | 'flashcard'
  | 'image-label' | 'matching-pairs' | 'word-builder'
  | 'sequence-reorder' | 'timeline' | 'categorization'
  | 'numerical-slider' | 'labeling' | 'scenario'
  | 'odd-one-out' | 'find-the-error' | 'cause-effect' | 'hot-text'
  | 'ranking' | 'pros-cons' | 'poll' | 'open-ended'
  | 'creative-draw' | 'debate-prompt'
  | 'speed-challenge' | 'streak-run' | 'boss-battle' | 'leaderboard-sprint'
  | 'mystery-reveal' | 'story-builder' | 'map-explorer' | 'comparison-table'
  | 'content-slideshow'   // #33
  | 'mixed-assessment';   // #34
```

Create `components/mechanics/MechanicRenderer.tsx`:
- Switch/map from `mechanicId` → lazy-loaded component
- Loading skeleton while mechanic loads
- ErrorBoundary with friendly "Oops" fallback
- Pass all `MechanicProps` through

Refactor all 34 mechanic components to accept `MechanicProps<TheirContentType>` and call `onComplete(result)`. For `content-slideshow`, the result has `score: 0, correct: true` (always passes — it's content delivery). For `mixed-assessment`, the result aggregates per-question scores.

---

## Monorepo Task 2 — Shared Interaction Hooks

Extract three hooks from duplicated logic across mechanics:

**`useDragReorder`** — used by sequence-reorder, ranking, categorization, labeling, timeline. Handles mouse drag + touch drag, snap-to-position, visual placeholder, optional zone-based dropping.

**`useTapSelect`** — used by MC, true/false, poll, hot-text, find-the-error, odd-one-out, matching-pairs. Manages selected indices, single/multi-select, pair mode, validation.

**`useTextInput`** — used by fill-in-blank, open-ended, word-builder. Character counter, min/max length, validation, auto-save draft.

Each hook manages STATE and EVENTS only — no UI rendering. Mechanics import the hook and render their own UI.

---

## Monorepo Task 3 — Feedback State Machine

Create `useFeedback` hook managing: `idle → answered → checking → correct | incorrect | partial → dismissed`

Create `FeedbackOverlay` component:
- `correct`: green check, brief confetti, "Nice!"
- `incorrect`: gentle red X, "Not quite", optional explanation
- `partial`: orange indicator, "Almost!"
- Game mode integrates with existing Celebration component

Replace per-mechanic setTimeout chains with this shared hook.

---

## Monorepo Task 4 — useSparkSession Hook

Orchestrates the full Spark playthrough. Manages current position in sequence, cumulative score, per-activity results, elapsed time, pause/resume.

Key insight: every step in the sequence is now a mechanic (content-slideshow is #33), so the hook just iterates through an array of `{ mechanicId, content }` objects. WOW and reflection are the only special types remaining.

Produces a `ComprehensionSnapshot` on completion for the learner profile.

---

## Monorepo Task 5 — Timer Hook + TimerDisplay

`useTimer` hook: countdown/countup, warning threshold, start/pause/resume/reset.

`TimerDisplay` component: ring (SVG circle), bar, or text variants. Orange → red at warning threshold.

Used by speed-challenge, streak-run, leaderboard-sprint, and any future timed mechanics.

---

## Monorepo Task 6 — Accessibility Sweep

After all components are refactored:
- 48x48px min touch targets on all interactive elements
- ARIA roles and labels (role="radio" for options, role="listitem" for drag items, role="timer", role="alert" for feedback, role="log" for PimpiChat)
- Keyboard navigation (Tab, Enter/Space to select, arrow keys for reorder)
- Focus management (trap in WOW/modals, return focus after feedback overlay)
- `aria-live` regions for score changes, timer warnings, turn counter, spark progress
- Visible focus outlines (2px orange ring, keyboard only)

---

# Running Order

```
v0 (parallel, all independent):
  ├── v0 #1: Content Slideshow (#33)
  ├── v0 #2: Wow Moment
  ├── v0 #3: Pimpi Chat
  ├── v0 #4: PostItCard
  └── v0 #5: Mixed Assessment (#34)

  ↓ download to monorepo ↓

Monorepo (sequential):
  1. MechanicProps + MechanicRenderer (types first)
  2. Interaction hooks (drag, tap, text)
  3. Feedback state machine
  4. useSparkSession (wires everything together)
  5. Timer hook + display
  6. Accessibility sweep (last — across everything)
```

Props alignment checkpoint: before downloading from v0, confirm that:
- ContentSlideshow accepts `{ content: ContentSlideshowContent, ageGroup, onComplete }`
- WowMoment accepts `{ fact, emoji, label, factId, ageGroup, onContinue }`
- PimpiChat accepts `{ mode, pimpiMessage, messages, onSendMessage, onContinue, isTyping, currentTurn, maxTurns, pimpiMood }`
- PostItCard accepts `{ children, color, size, rotation, isFlipped, isDragging, isMatched, isSelected, onTap, onFlip }`

These shapes are what `MechanicRenderer` and `useSparkSession` will plug into in the monorepo.
