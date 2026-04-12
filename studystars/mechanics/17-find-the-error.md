# Find the Error / Odd One Out

> Learners examine a set of items and tap to identify which one is incorrect, doesn't belong, or is the odd one out.

## Core Mechanic

The screen displays a question or challenge at the top (e.g., "Which of these is NOT a planet?" or "One of these facts about sharks is false — which one?"). Below the prompt is a vertical stack of 3–5 items. The learner taps on the item they believe is wrong or doesn't belong. Once selected, the app reveals immediate feedback: a checkmark or cross, the correct answer highlighted, and a detailed explanation of why that item was the error and what makes the others correct or cohesive.

The interaction is single-tap, high-velocity. No dragging, no multi-step sequences. The learner makes a decision and instantly learns whether they were right and why.

## Why It Works

**Error detection is a form of analysis at Bloom's Level 4.** Rather than recalling a fact or applying a rule, learners must examine a set, compare items, and identify the *one* that violates a pattern or criterion. This builds critical thinking by forcing learners to think about what unites the correct answers, not just pick the "obvious" one.

**Cognitive load is lower than open-ended questions** but higher than simple recall. The constraint (pick one error from a fixed set) makes reasoning tractable. Learners don't have to generate an answer; they evaluate existing options. This scaffolds analysis for younger learners.

**The puzzle feel drives engagement.** "Spot the error" or "find the imposter" taps into detective instincts. Kids enjoy the reveal and love feeling smart when they catch a subtle error.

## Content Generation Spec

The AI must produce:
1. A **prompt** that clearly asks learners to find the error or odd item.
2. An **items array** where one item is wrong and the rest are correct or thematically cohesive.
3. An **errorIndex** pointing to the wrong item.
4. An **explanation** that articulates why the flagged item is wrong and what unites the others.

The AI should ensure the error is genuinely findable at the target age level: obvious for 8–10, subtle but fair for 11–13, and plausibly ambiguous for 14–16.

### Example Output

```json
{
  "prompt": "One of these planets is actually a dwarf planet. Which one?",
  "items": [
    "Jupiter",
    "Earth",
    "Mars",
    "Pluto"
  ],
  "errorIndex": 3,
  "explanation": "Pluto was reclassified as a dwarf planet in 2006 because it is smaller and has not cleared its orbital path of other debris. Jupiter, Earth, and Mars are all full-sized planets that meet all three criteria: they orbit the Sun, are round, and have cleared their orbits of other objects."
}
```

## UX Considerations

- **Single tap interaction:** Minimize friction. Each item is a large tap target (minimum 48×48px, ideally larger).
- **Clear visual feedback:** When tapped, the selected item highlights (e.g., border change, background color shift). After submission, the correct answer is clearly marked with an icon or color.
- **Reveal animation:** The explanation should fade or slide in smoothly, not jarring the learner.
- **Mobile-first:** On narrow screens, stack items vertically. On wider screens (tablets), consider a 2-column layout if 4–5 items are present, but keep readability in mind.
- **Text length:** Keep items short (one short sentence or phrase). If items are paragraphs, use a scrollable text area per item, but avoid if possible.
- **Visual cues for young learners:** Emoji, icons, or color coding can reduce reading load for ages 8–10. Older learners benefit from text-only or minimal visual scaffolding.

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | 3 items only. One item is completely wrong (e.g., "Which is not a color?" with "red, blue, dog"). Simple, concrete topics (animals, food, objects). Use icons or emoji alongside text. Obvious error; no subtlety required. |
| 11–13 | 4 items. Error is subtle but fair (e.g., one fact is slightly wrong or one item doesn't fit the category). More abstract topics (historical facts, scientific principles). Learners must reason about nuance. |
| 14–16 | 5 items. Multiple items *could* plausibly be errors; learner must identify the *most* incorrect or analyze complex criteria. Sophisticated topics (historical debates, scientific edge cases). Example: "Which explorer did NOT round the Cape of Good Hope?" with Columbus, Gama, Bartolomeu, Diaz, and Magellan (where the answer depends on precise historical knowledge). |

## Lesson Placement

This mechanic works best in **Core Practice** or **Deep Engagement** phases, after content has been introduced. It reinforces learning by asking learners to think critically about what they've just learned. Can also appear in **Spaced Review** to challenge memory and understanding.

Avoid placing in the **Hook** (too demanding) or **Extension** (better uses for extension activities).

## Related Mechanics

- **01-multiple-choice:** Similar selection pattern but learner picks the *correct* answer, not the error.
- **02-true-false:** Simpler version; only two items, and the prompt is "is this true or false?"
- **10-memory-game:** Also involves spotting patterns and finding mismatches, but in a timed, card-flip format.
- **19-hot-text:** Similar analysis but at text-level (highlight the error in a passage rather than pick from discrete items).
