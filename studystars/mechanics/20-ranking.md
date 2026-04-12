# Ranking / Prioritization

> Learners order items by a criterion (e.g., oldest to newest, biggest to smallest, most to least important) using drag-to-reorder, exercising evaluative judgment.

## Core Mechanic

The screen displays a prompt (e.g., "Rank these planets from closest to farthest from the Sun") and a vertical stack of items in a shuffled order. Each item is a card or row with a number showing its current position (1, 2, 3, etc.). The learner long-presses an item to grab it, then drags it up or down the list. As the learner drags, other items shift to make room, and position numbers update in real-time. Once the learner releases, the item snaps into place with a smooth animation. After the learner completes the ranking (or after a timeout), the app reveals feedback: the correct order is shown (often with items that were misplaced highlighted), and an explanation details the ranking logic.

The interaction pattern is drag-and-drop, natural and tactile on touch devices.

## Why It Works

**Ranking is an evaluative skill (Bloom Level 5).** Learners don't just recall facts or apply a formula; they must examine multiple items, weigh criteria, and make judgments about their relative position or importance. This builds critical decision-making skills.

**Drag-and-drop is intuitive and engaging.** Unlike a multiple-choice question where learners passively select, ranking demands active manipulation. The haptic feedback (especially on mobile) and smooth animations make the interaction feel rewarding and game-like.

**Partial credit captures partial understanding.** In ranking tasks, learners often get some items in the right order and others wrong. Scoring partial credit (e.g., 2 out of 5 items in correct relative position) rewards effort and identifies misconceptions.

**Ranking reveals gaps in knowledge and reasoning.** How a learner ranks items tells you not just what they know, but how they prioritize or conceptualize relationships. A learner might know facts but misunderstand their relative importance or temporal order.

## Content Generation Spec

The AI must produce:
1. A **prompt** that clearly specifies the ranking criterion (e.g., "from X to Y").
2. A **criterion** string describing the sorting rule (e.g., "chronological order, oldest to newest").
3. An **items** array in the CORRECT order, each as a structured object with a **label** (item name) and **value** (the quantitative or qualifying measure that justifies its rank).
4. An **explanation** that articulates why this order is correct and may provide context or interesting facts.

The structured `items` format ensures the prototype can render each draggable card with a prominent label and reveal the justifying value after submission, giving learners clear feedback on why each item belongs where it does.

Content shape:
- **items[].label** (string, required): The item name or title. Displayed prominently on the draggable card. Examples: "Jupiter", "Printing Press", "Mount Everest". Must NOT contain the ranking value or numeric clues that reveal the correct order.
- **items[].value** (string, required): The quantitative or qualifying measure that justifies this item's rank. Hidden during interaction, revealed only after submission. Examples: "778 million km", "1440 CE", "8,849 m".

**No-spoiler constraint**: The label names the ITEM; the value justifies its RANK. These must stay separate. The learner should not be able to deduce the correct order from the labels alone — that's the whole challenge.

The AI should ensure the ranking is defensible at the target age level and that the explanation is clear and educational.

### Example Output

```json
{
  "prompt": "Rank these inventions from oldest to newest.",
  "criterion": "chronological order, oldest to newest",
  "items": [
    { "label": "Printing Press", "value": "1440 CE" },
    { "label": "Steam Engine", "value": "1769 CE" },
    { "label": "Light Bulb", "value": "1879 CE" },
    { "label": "Airplane", "value": "1903 CE" },
    { "label": "Computer", "value": "1946 CE" }
  ],
  "explanation": "The printing press revolutionized information distribution in the 15th century. The steam engine powered the Industrial Revolution in the late 1700s. Edison's light bulb transformed daily life in the late 1800s. The Wright brothers' airplane changed transportation in the early 1900s. And the modern computer emerged after World War II, launching the digital age. Each invention built on the knowledge and technology of its predecessors."
}
```

## UX Considerations

- **Long-press initiation:** Clearly indicate that an item can be dragged (e.g., with a subtle icon, color change, or haptic feedback on long-press).
- **Live reordering:** As the learner drags, other items should smoothly slide out of the way. Position numbers should update in real-time.
- **Snap-to-position animation:** When the learner releases, the item should snap into place with a satisfying animation (e.g., elastic easing).
- **Visual feedback:** Dragged item should appear lifted or highlighted (shadow, opacity change) to indicate it's being moved.
- **Mobile-optimized:** On small screens, ensure items have good padding (48px+ tap target). Long-press is more reliable than click-and-hold. Avoid horizontal reordering.
- **Accessibility:** Support keyboard navigation (arrow keys to reorder) for users who can't drag.

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | 3–4 items with obvious, objective criteria (e.g., 'rank by size', 'rank by age'). Use visual indicators (images, size comparison). Correct order is unambiguous. Feedback is celebratory. Example: "Rank these animals from smallest to largest" with pictures of an ant, dog, elephant, and whale. |
| 11–13 | 5 items with objective, factual criteria (chronological, numerical). Learner must recall facts and understand the ordering logic. Example: "Rank these historical events in order (oldest to newest)" or "Rank these countries by population (smallest to largest)." Feedback includes brief explanation of each step in the ranking. |
| 14–16 | 6 items with subjective or multi-dimensional criteria. Ranking requires evaluation and justification. Example: "Rank these sources by credibility for an essay about climate change" (learner must weigh evidence, author expertise, bias) or "Rank these arguments by logical strength." Explanation may note nuance and multiple valid perspectives. Can ask: "What would change your ranking?" to prompt reflection. |

## Lesson Placement

This mechanic works well in **Core Practice** (testing recall and basic ranking) or **Deep Engagement** (testing judgment and evaluation). Also fits **Reflection** phases where learners evaluate their own learning or consider priorities.

Can work in **Spaced Review** as a cumulative assessment.

Avoid in **Hook** (better for engagement than pure ranking) or **Extension** (unless the extension is explicitly about prioritization).

## Related Mechanics

- **09-sequence-reorder:** Variant focusing on ordering a sequence of events or steps in a process, rather than ranking by abstract criteria.
- **20-ranking:** This mechanic itself.
- **21-poll:** Different mechanic; no ranking, just voting on preferences.
- **01-multiple-choice:** Simpler selection; learner picks the correct answer, not ranking multiple items.
