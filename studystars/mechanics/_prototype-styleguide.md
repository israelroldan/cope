# Prototype Styleguide — StudyStars Activity Components

Use this when generating a self-contained React component prototype for any of the 32 activity mechanics.

---

## Component Constraints

- **Single .tsx file.** No external dependencies beyond React, Tailwind, and lucide-react.
- **Self-contained mock data.** The component generates or hardcodes sample content that matches the mechanic's `contentSchema`. No API calls, no props required.
- **Default export.** The component must be a default-exported React functional component with no required props.
- **Mobile-first viewport.** Design for 390×844 (iPhone 14) as primary. The component should fill the viewport height and look right at `max-w-md mx-auto`.
- **All states visible.** The prototype must be interactive and show: initial state, active/in-progress state, correct feedback, incorrect feedback, and completion state. Use internal React state to drive transitions.
- **No localStorage, no sessionStorage.** Use `useState` / `useReducer` only.

---

## Design Tokens

### Colors

```
// Post-it palette — use for cards, accents, feedback, category colors
yellow:    #FFD600
coral:     #FF4081
mint:      #00E676
sky:       #448AFF
lavender:  #7C4DFF
peach:     #FF6D00

// Interface
surface:   #FFFFFF
charcoal:  #111111
gray:      #999999
bodyText:  #444444
divider:   #E5E5E5
cta:       #FF6D00
ctaHover:  #E65100
flame:     #FF3D00
success:   #00E676
error:     #FF4081
```

### Typography

- **Font:** DM Sans (import from Google Fonts via `@import` in a `<style>` tag or assume Tailwind config includes it)
- **Headings:** font-extrabold, text-charcoal (#111)
- **Body:** font-normal to font-medium, text-bodyText (#444)
- **Labels:** font-bold, uppercase, tracking-wider, text-xs, text-gray (#999)
- **Question text:** text-xl font-bold text-charcoal, centered
- **Option text:** text-base font-semibold

### Spacing & Layout

- **Component wrapper:** `max-w-md mx-auto min-h-screen bg-white flex flex-col`
- **Content area:** `flex-1 px-5 py-6 flex flex-col`
- **Bottom action area:** `px-5 py-4` (for buttons, progress indicators)
- **Card padding:** `p-4` or `p-5`
- **Gap between options:** `gap-3`
- **Border radius:** `rounded-lg` (8px) for cards, `rounded-xl` (12px) for outer containers, `rounded-full` for pills/buttons

### Shadows

```
card:      shadow-[0_2px_8px_rgba(0,0,0,0.12)]
elevated:  shadow-[0_3px_12px_rgba(0,0,0,0.14)]
```

### Touch Targets

- **Minimum tap target:** 48×48px (12×12 in Tailwind: `min-h-12 min-w-12`)
- **Option buttons:** full-width, `min-h-14` (56px), generous padding `px-5 py-4`
- **Spacing between tappable elements:** at least `gap-3` (12px)

---

## Component Structure

Every activity prototype follows this layout:

```
┌─────────────────────────────┐
│  Header Bar                 │  ← Progress dots, timer (if applicable), mechanic label
│                             │
│  Question / Prompt Area     │  ← The stimulus: text, image, passage, audio prompt
│                             │
│                             │
│  Interaction Zone           │  ← Options, drag targets, slider, canvas, etc.
│                             │
│                             │
│  Feedback Overlay           │  ← Appears after response: correct/incorrect + explanation
│                             │
│  Bottom Bar                 │  ← Next button, progress, score
└─────────────────────────────┘
```

### Header Bar
- Fixed at top of component
- Shows: mechanic type label (uppercase, tiny, gray), question counter ("3 of 5"), optional timer
- Minimal — don't let it compete with the question

### Question / Prompt Area
- Centered text for short questions
- Left-aligned for passages or multi-line prompts
- `text-xl font-bold text-[#111]` for question text
- Generous bottom margin before interaction zone

### Interaction Zone
- This is mechanic-specific — the core of each prototype
- Fills available space between question and bottom bar
- Uses `flex-1` to expand

### Feedback State
- **Correct:** Option/area flashes mint (#00E676) background, checkmark icon appears, brief explanation text fades in
- **Incorrect:** Option/area flashes coral (#FF4081) background, X icon appears, correct answer highlighted in mint, explanation shows
- **Transition:** 300ms ease-out, slight scale pulse on the selected option
- **Explanation text:** text-sm, text-[#444], appears below the interaction zone with a slide-up animation

### Bottom Bar
- "Next" button: `w-full rounded-full bg-[#FF6D00] text-white font-bold py-3.5 text-base`
- Appears after feedback is shown
- Disabled state: `bg-[#E5E5E5] text-[#999]`
- On hover/active: `bg-[#E65100] scale-[1.02]`

---

## Animation Patterns

Use inline CSS transitions or Tailwind `transition-all duration-300`. No Framer Motion needed for prototypes.

- **Option appear:** Fade up, stagger 40ms per item (`opacity-0 translate-y-2` → `opacity-100 translate-y-0`)
- **Selection:** Scale pulse `scale-[1.03]` → `scale-100` over 200ms
- **Correct feedback:** Background color transition 200ms + checkmark icon fade-in
- **Incorrect feedback:** Background color transition 200ms + shake animation (2px horizontal oscillation, 300ms)
- **Card flip (flashcards):** CSS `transform: rotateY(180deg)` with `perspective-1000` on parent
- **Drag snap:** Items animate to target position with `transition-all duration-200`
- **Completion:** Confetti-like burst — use 6-8 small colored squares (post-it palette) that scatter and fade

---

## Mechanic-Specific Patterns

### Selection mechanics (MC, T/F, Image Recognition)
- Options as full-width cards with left-aligned text
- Unselected: `bg-[#F5F5F5] border border-[#E5E5E5]`
- Hover: `border-[#DDD] shadow-sm`
- Selected (before submit): `border-[#FF6D00] bg-[#FFF8F0]` ring effect
- Correct after submit: `bg-[#E8F5E9] border-[#00E676]`
- Incorrect after submit: `bg-[#FCE4EC] border-[#FF4081]`

### Ordering/Sorting mechanics (Reorder, Categorization, Ranking)
- Draggable items with grab cursor
- Active drag: `shadow-elevated scale-[1.05] opacity-90`
- Drop zone highlight: dashed border in target color
- Use `onPointerDown`/`onPointerMove`/`onPointerUp` for drag (no external DnD library)
- Acceptable fallback: tap-to-select then tap-target-to-place (easier to implement, still interactive)

### Input mechanics (Free recall, Numerical slider, Open-ended)
- Text input: `w-full rounded-lg border-2 border-[#E5E5E5] px-4 py-3 text-lg focus:border-[#FF6D00] focus:ring-2 focus:ring-[#FF6D00]/20`
- Slider: custom styled range input with thumb in peach (#FF6D00), track in gray (#E5E5E5), filled portion in peach
- Character/word counter where relevant

### Spatial mechanics (Hotspot, Labeling)
- Image fills width, maintains aspect ratio
- Tap zone indicators: pulsing circle outlines
- Placed labels: pill-shaped tags with colored background

### Memory/Flip mechanics
- Card grid with consistent sizing
- Face-down cards: solid colored back (cycle through post-it palette)
- Flip animation: 3D rotate on Y axis, 400ms

### Meta-overlay mechanics (Confidence, Timer)
- These wrap other mechanics — show a secondary UI layer
- Confidence: 3-segment selector below the question (Low / Medium / High) appearing after answer
- Timer: fixed-position bar at top, fills from right to left, changes color (mint → yellow → coral) as time runs out

---

## Mock Data Guidelines

- Use a single concrete topic for all sample questions: **"Ancient Egypt"** (unless the mechanic doesn't fit, then use "The Solar System")
- Generate 3-5 questions/items — enough to demonstrate the flow but not overwhelming
- Include at least 1 correct and 1 incorrect answer demonstration in the flow
- Difficulty: medium (appropriate for an 11-year-old)
- All text in English

---

## Completion Screen

After all questions are answered, show a simple results screen:

- Score: large number, centered, in peach (#FF6D00) for good scores, coral for poor
- "X out of Y correct" subtitle
- Brief message: "Great job!" / "Keep practicing!" (based on score)
- "Try Again" button (resets state)
- Optional: Pimpi mascot image from `https://pimpi.app/pimpi_celeb.svg` (celebration) or `https://pimpi.app/pimpi_idea.svg` (try again)

---

## Interactive & App-like Patterns

These patterns define how Pimpi feels in motion. They apply to all prototypes.

### State & Feedback

- **Optimistic updates:** Actions feel instant. When a user taps an answer, the UI responds immediately — don't simulate a server round-trip.
- **Success state:** A spring-animated pulse (scale 1.8 → 1, `damping: 15, stiffness: 300`). Optionally show the mascot in celebrating mood with sparkles. No toast notifications — the visual change IS the feedback.
- **Error state:** Subtle red (`#FF3D00` flame) text below the element. No modal alerts. Keep the user in context.
- **Loading state:** Gentle pulse animation on the element that's loading (opacity 0.5 → 1 cycle). No spinners. If loading takes >1s, show a post-it shaped skeleton with the adhesive strip in gray.
- **Empty state:** A single centered post-it (yellow, slight rotation) with an encouraging message and a CTA. Add the mascot looking thoughtful.

### Selection & Pickers

- **Single select grid:** Grid of colored squares from the post-it palette. Each square is `rounded-lg`, ~48-56px. Selected state: white ring/border (`ring-2 ring-white`).
- **Filter chips:** Horizontal scroll row of rounded pills. Default: `bg-white border border-gray-200`. Selected: filled with a post-it color + white text.
- **Multi-step wizards:** Progress stepper at top (dots connected by lines), content card below. Transitions slide horizontally or fade.

### Cards as Interactive Elements

- **Tappable cards:** Scale 1.02 + y:-2 on hover, scale 0.97 on tap. Cursor pointer.
- **Card flip:** Front fades out (`opacity: 0, scale: 0.92`), back fades in. Duration: 250ms.
- **Draggable cards:** Pick up with slight scale-up (1.05) and elevated shadow. Drop snaps with spring physics.
- **Completion checkmark:** Small mint circle with white checkmark, top-right. Appears with pop animation (`scale: 0 → 1`, spring).

### Overlays

- **Full-screen overlays** (not centered modals): Slide up from bottom or fade in (`opacity: 0, y: 30` → `opacity: 1, y: 0`, 300ms).
- **Backdrop:** `bg-black/20` — very subtle dim.
- **Close action:** Back arrow (top-left) or swipe down. No X buttons.

### Micro-interactions

These small touches make a prototype feel like Pimpi:
1. **Element appears:** Fade up + slight scale (0.95 → 1), staggered if in a list (40ms per item)
2. **Correct answer:** Spring bounce scale (1.8 → 1) with 50ms delay after tap
3. **Score increments:** Number counts up with spring
4. **Mascot reacts:** On success, swap to celebrating mood (sparkles for 2s, then fade). Use `https://pimpi.app/pimpi_celeb.svg`
5. **Button press:** Scale down to 0.97 on tap, back to 1 on release (spring, not ease)
6. **Screen transition:** Fade + slide, 300ms, ease-out. Never instant-swap
7. **Shake on wrong answer:** 2px horizontal oscillation, 300ms duration

### Data Visualization

- **Progress bars:** Rounded-full, post-it color fill on `#E5E5E5` track. Animate width on mount.
- **Counters/numbers:** Large DM Sans 800, charcoal, with small colored label above (uppercase).
- **Score display:** Animated count-up on completion screen.

---

## What "Done" Looks Like

A finished prototype:
1. Loads with mock data and is immediately interactive
2. Shows the full flow: question → interaction → feedback → next → completion
3. Looks polished on a phone-sized viewport (390px wide)
4. Uses the Pimpi color palette and DM Sans typography
5. Has smooth transitions between states (no jarring jumps)
6. Demonstrates the core mechanic clearly — someone seeing it for the first time should understand the interaction pattern within 3 seconds
