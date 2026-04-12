# Sentence/Sequence Reordering

> Drag scrambled items into the correct sequence based on chronological, procedural, or logical order.

## Core Mechanic

The learner sees a question asking them to arrange 3–6 scrambled items in the correct order. Items appear in a vertical list with a draggable handle on each. The learner long-presses an item, drags it to a new position, and releases. The item snaps into place with a subtle animation, and the rest of the list reflows. Once the learner believes the sequence is correct, they tap a "Check" button to submit.

Feedback is immediate: if the sequence is fully correct, they see a confirmation with a brief explanation of why that order is right. If incorrect, the activity highlights which items are out of place and invites them to try again. The visual feedback is clear but not punitive—the interface guides them toward the correct answer without revealing it outright (on first attempt).

This mechanic works equally well for arranging historical events chronologically, steps in a scientific process, components of a complex idea, or phases of a project. The key is that there's a single, objectively correct sequence that learners must reconstruct from memory or reasoning.

## Why It Works

**Retrieval Practice & Reconstruction**: Instead of recognizing the correct order from options (as in multiple choice), learners must actively recall and physically arrange each item. This effortful retrieval strengthens memory and understanding. The motor component of dragging creates a multimodal memory trace.

**Cognitive Load Management**: By presenting items one at a time (scrollable list), rather than all at once, the interface avoids overwhelming visual clutter. The incremental arrangement process mirrors how learners actually think through sequences: "What comes first? Then what?"

**Procedural Knowledge**: This mechanic is especially effective for teaching procedures, processes, and workflows. The act of physically reordering mirrors the mental process of following a sequence, making it more memorable and transferable than static reading.

## Content Generation Spec

The AI must generate:
1. A clear question or prompt that specifies the ordering principle (chronological, procedural, etc.)
2. A list of 3–6 items in the correct order, each as a structured object with a **label** (date, step number, or short name) and **text** (1-2 sentence description)
3. A brief explanation of why that order is correct (optional but recommended)

The structured `items` format ensures the prototype can render each draggable card with a prominent label (e.g., a date or step number) and a supporting description below it, giving learners clear visual hierarchy.

For age-appropriate content:
- **Ages 8–10**: Simple, concrete sequences (e.g., stages of growth, daily routines). Explanation should use simple language.
- **Ages 11–13**: Mixed complexity; may include abstract concepts. Explanation should reference cause-and-effect or logical relationships.
- **Ages 14–16**: Complex, multi-step processes. Explanation should address deeper causal chains and conditional relationships.

The AI should never generate ambiguous orderings—the correct sequence must be objectively defensible.

Content shape:
- **items[].label** (string, required): A short identifier — a concise name or keyword describing WHAT happens. Displayed prominently on the draggable card. Examples: "Condensation", "Natron Salt", "Linen Wrapping".
- **items[].text** (string, required): A 1-2 sentence description of this step or event. Displayed below the label in smaller text.

**No-spoiler constraint**: Labels must NOT contain ordinal clues that reveal the correct sequence. Avoid step numbers ("Step 1", "Step 2"), sequential dates ("1440", "1769") unless the learning goal IS reading dates, or positional words ("first", "then", "finally"). The label names WHAT happens; the learner's job is to figure out the order.

### Example Output

```json
{
  "prompt": "Arrange these stages of the water cycle in the correct order, starting with water on Earth's surface.",
  "items": [
    {
      "label": "Evaporation",
      "text": "Water evaporates from oceans, lakes, and rivers, becoming water vapor."
    },
    {
      "label": "Rising & Cooling",
      "text": "Water vapor rises into the atmosphere and cools, losing energy."
    },
    {
      "label": "Condensation",
      "text": "Cooled water vapor condenses into tiny droplets, forming clouds."
    },
    {
      "label": "Precipitation",
      "text": "Water falls as rain, snow, or sleet back to Earth's surface."
    },
    {
      "label": "Collection",
      "text": "Precipitation flows into rivers and oceans, completing the cycle."
    }
  ],
  "explanation": "The water cycle is driven by the sun's energy. Heat evaporates water from surface bodies, the vapor rises and cools in the atmosphere, condenses into clouds, and falls as precipitation. This cycle is continuous and essential for distributing freshwater across the planet.",
  "orderingType": "procedural"
}
```

## UX Considerations

- **Touch Target**: Each item should be at least 48×48px tall, with a clear drag handle (icon or colored left edge).
- **Drag Indication**: When long-pressed, the item slightly elevates (shadow/scale) and opacity changes to show it's "grabbed."
- **Slot Feedback**: As the user drags an item, a faint insertion line appears between items to show where it will land.
- **Snap Animation**: When released, the item smoothly snaps to its new position (150–200ms ease-out transition).
- **Keyboard Access**: Tab through items, use arrow keys to reorder.
- **Visual Hierarchy**: Number each item (1, 2, 3, etc.) on the left to reinforce sequence awareness.

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | **3 items max** from familiar, everyday contexts (morning routine, growth stages, meal preparation). Larger touch targets (56×56px+). After incorrect attempt, show a visual timeline or color-coded breakdown. Hints: "What happens first?" prompt. |
| 11–13 | **4–5 items**. Mix of concrete and slightly abstract sequences (water cycle, historical periods, ecosystem food chains). Standard touch targets. Hint available: reveal first or last item position. Explanation includes cause-and-effect reasoning. |
| 14–16 | **Up to 6 items**. Complex, abstract sequences (chemical reaction mechanisms, argumentative structures, historical causation chains). No hints. Feedback explanation must address conditional logic ("If X happens, then Y because..."). |

## Lesson Placement

**Post-Content & Core Practice**: This mechanic is ideal immediately after presenting a process or sequence. Learners apply their fresh understanding by reconstructing the sequence from memory. Repeat placements work well for spaced review—the same sequence can be presented weeks later to reinforce long-term retention.

**Deep Engagement**: For advanced learners, use sequence reordering as a bridge to analysis: "Arrange these events, then explain what would happen if one step were skipped?"

## Related Mechanics

- **Matching Pairs (Mechanic 8)**: Both require learner-driven association, but matching is unordered while reordering is strictly sequenced.
- **Multiple Choice (Mechanic 4)**: A simpler alternative where learners recognize rather than construct the sequence.
- **Fill-in-the-Blank (Mechanics 6 & 11)**: Can be combined—after reordering, ask learners to fill in a step that was omitted.
- **Scenario-Based Questions (Mechanic 15)**: A sequence is embedded within a narrative; reordering can scaffold understanding before reading the scenario.
