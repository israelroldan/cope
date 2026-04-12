# v0 Prompt Template — StudyStars Activity Mechanic Prototype

Copy this prompt into v0. Replace `{{STYLEGUIDE}}`, `{{MECHANIC_MD}}`, and `{{MECHANIC_JSON}}` with the contents of the corresponding files. Or paste them inline below the markers.

---

## The Prompt

```
Build a self-contained, reusable React component prototype for an interactive learning activity.

This is one of 32 activity mechanics for a kids' micro-learning app called Pimpi (ages 8-16). The component must be a portable, reusable default export — NOT a page. It should work when dropped into any Next.js route or rendered inside another component. No page-level layout, no `<html>` or `<body>` tags, no page-level providers. Just a clean component that owns its own state and renders its own UI within whatever container it's placed in.

## Design System

Follow this styleguide exactly for colors, typography, spacing, touch targets, animations, and component structure:

<styleguide>
{{STYLEGUIDE}}
</styleguide>

## Mechanic Specification

This is the JSON spec defining the mechanic's interaction type, content schema, scoring, and UX:

<spec>
{{MECHANIC_JSON}}
</spec>

## Mechanic Description

This is the detailed description of how the mechanic works, including cognitive science rationale and a content generation example:

<description>
{{MECHANIC_MD}}
</description>

## Requirements

1. **Reusable component, not a page.** Single file, one default-exported React functional component, no required props. No page-level wrappers — the component should render cleanly when imported and used as `<MultipleChoice />` inside any parent.
2. **Mock data from the content schema.** Hardcode 3-5 sample items on the topic "Ancient Egypt" that match the `contentSchema` in the JSON spec. The data should be realistic and interesting for an 11-year-old.
3. **Full interaction flow.** The prototype must walk through: question/prompt → user interaction → immediate feedback (correct/incorrect with explanation) → next item → completion screen with score.
4. **Mobile-first layout.** Design for 390px width. The component wrapper should be `max-w-md mx-auto min-h-[100dvh]` — it fills its container, not the page.
5. **All states.** Show: idle, active/selected, correct feedback, incorrect feedback, disabled, and completion.
6. **Animations.** Use CSS transitions (300ms ease-out). Stagger option appearance. Pulse on selection. Color transitions on feedback. Slide-up for explanations.
7. **Touch-friendly.** Minimum 48x48px tap targets. Full-width option buttons with generous padding.
8. **Score tracking.** Track correct/incorrect across all items. Show results at the end.
9. **Reset.** A "Try Again" button on the completion screen that resets all state.
10. **No external dependencies** beyond React and Tailwind. Use lucide-react for icons if needed (Check, X, ChevronRight, RotateCcw, Timer, etc.)
11. **DM Sans font.** Assume the parent app loads DM Sans. Do NOT add `@import` or `<link>` tags for fonts inside the component.

## Pimpi Brand Aesthetic — Critical

This app has a distinctive visual identity. The prototype MUST feel like Pimpi, not like a generic quiz app. Specifically:

- **Post-it card styling for the question area.** The question should sit on a colored card (use yellow `#FFD600` as default) with the signature Pimpi post-it treatment: 6px adhesive strip across the top (slightly lighter/transparent shade of the card color), a subtle corner fold at bottom-right (16x16px, `linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.08) 50%)`), slight random rotation (-2 to 2 degrees), rounded-lg corners, and a crisp card shadow `0 2px 8px rgba(0,0,0,0.12)`. The question text should be charcoal `#111` bold.
- **Post-it palette is the brand.** Use the six signature colors — yellow `#FFD600`, coral `#FF4081`, mint `#00E676`, sky `#448AFF`, lavender `#7C4DFF`, peach `#FF6D00` — not gray/neutral tones. Options, tags, progress dots, feedback accents, and the completion screen should all draw from this palette.
- **Organic imperfection.** Add small random rotations (-1 to 2 degrees) on option cards or interactive elements. Nothing should feel perfectly grid-aligned — it should feel hand-placed and lived-in.
- **White canvas, color from content.** The background is always clean white `#FFFFFF`. All color comes from the content elements (post-it cards, buttons, accents), never from the chrome.
- **The mascot appears on the completion screen.** Use `https://pimpi.app/pimpi_celeb.svg` for good scores (>60%), `https://pimpi.app/pimpi_idea.svg` for lower scores. The mascot should have a drop-shadow filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.12)) drop-shadow(0 4px 8px rgba(0,0,0,0.08))`.
- **Buttons are fully rounded pills.** Primary CTA: `rounded-full bg-[#FF6D00] text-white font-bold`. Not rounded-lg rectangles.
- **Kid-friendly but not childish.** Bold colors and a cute mascot, but clean DM Sans typography and smart contrast. This could hang in a design studio.

## What makes a great prototype

- Someone seeing this mechanic for the first time should understand the interaction within 3 seconds
- The feedback is satisfying — correct answers feel rewarding, incorrect answers are instructive not punishing
- It feels unmistakably like Pimpi — post-it cards, bold palette, organic rotations, white canvas
- It feels like a real app, not a wireframe
- The pacing is right — not too fast, not too slow between states
- The component is portable — you could drop it into any Next.js route and it just works
```

---

## Usage

### Option A: Paste directly into v0

1. Copy the prompt above
2. Open the styleguide file: `_prototype-styleguide.md`
3. Open the mechanic files: e.g. `01-multiple-choice.md` and `01-multiple-choice.json`
4. Replace the `{{STYLEGUIDE}}`, `{{MECHANIC_JSON}}`, and `{{MECHANIC_MD}}` placeholders
5. Paste into v0

### Option B: Script it

```bash
# Generate a ready-to-paste prompt for any mechanic by number
MECH_NUM="01"
MECH_SLUG="multiple-choice"

STYLEGUIDE=$(cat _prototype-styleguide.md)
MECH_JSON=$(cat ${MECH_NUM}-${MECH_SLUG}.json)
MECH_MD=$(cat ${MECH_NUM}-${MECH_SLUG}.md)

cat _v0-prompt.md | \
  sed "s|{{STYLEGUIDE}}|${STYLEGUIDE}|" | \
  sed "s|{{MECHANIC_JSON}}|${MECH_JSON}|" | \
  sed "s|{{MECHANIC_MD}}|${MECH_MD}|"
```

(Note: `sed` won't handle multiline well. For real use, write a small Node/Python script or just paste manually.)

### Option C: Quick script (Python)

```python
#!/usr/bin/env python3
"""Generate a complete v0 prompt for a given mechanic number."""
import sys, json

num = sys.argv[1].zfill(2)

# Find the matching files
import glob
json_file = glob.glob(f"{num}-*.json")[0]
md_file = glob.glob(f"{num}-*.md")[0]

with open("_prototype-styleguide.md") as f:
    styleguide = f.read()
with open(json_file) as f:
    spec = f.read()
with open(md_file) as f:
    description = f.read()

# Read the prompt template and extract just the prompt block
with open("_v0-prompt.md") as f:
    template = f.read()

# Extract the content between the ``` markers in "The Prompt" section
import re
match = re.search(r'## The Prompt\s*```\s*\n(.*?)```', template, re.DOTALL)
prompt = match.group(1)

# Substitute
prompt = prompt.replace("{{STYLEGUIDE}}", styleguide)
prompt = prompt.replace("{{MECHANIC_JSON}}", spec)
prompt = prompt.replace("{{MECHANIC_MD}}", description)

print(prompt)
```

Save as `_generate-prompt.py` and run:

```bash
cd studystars/mechanics
python3 _generate-prompt.py 1 | pbcopy   # copies prompt for Multiple Choice to clipboard
python3 _generate-prompt.py 6            # prints prompt for Matching Pairs
python3 _generate-prompt.py 17           # prints prompt for Find the Error
```

---

## After v0 generates the component

1. Save the output as `{number}-{slug}.prototype.tsx` in this directory
2. Update `_index.json`: set `status` to `"prototype-done"`, `prototypeFile` to the filename
3. The dashboard will automatically show a link to the prototype

---

## Iteration tips

If v0's first output isn't right, common follow-ups:

- "Make the touch targets larger — options should be at least 56px tall"
- "Add a slide-up animation for the explanation text after feedback"
- "The completion screen needs a 'Try Again' button that resets all state"
- "Use the post-it card style for the question: yellow background, slight rotation, adhesive strip at top"
- "Show the correct answer highlighted in mint green when the user gets it wrong"
- "Add a progress bar at the top showing question X of Y"
