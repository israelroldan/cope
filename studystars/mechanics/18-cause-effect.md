# Cause and Effect / Connection Mapping

> Learners match causes to effects or identify connections between seemingly unrelated concepts, revealing how ideas and events link across domains.

## Core Mechanic

The screen presents a prompt like "Match each cause to its effect" or "What connects these concepts?" On the left is a list of causes, triggers, or first concepts; on the right is a list of effects, consequences, or related items. The learner taps on a cause, then taps on the corresponding effect. A visual line (or highlight) connects the pair. Immediate feedback confirms if the match is correct or incorrect. After all pairs are matched (or after a timeout), the app reveals the explanation for each connection.

For open-ended variants (ages 14–16), the mechanic shifts: the learner sees a set of seemingly unrelated concepts (e.g., "Marie Curie, uranium, and the Berlin Wall") and must articulate or select from options what they have in common. This is more synthesis-heavy and demands higher-order thinking.

## Why It Works

**Causal reasoning is an analytical skill (Bloom Level 4).** Learners don't just recall facts; they examine *relationships* between events or ideas. "What caused what?" forces learners to think sequentially and understand how one action triggers another. "What connects these?" pushes learners to identify hidden relationships, a cornerstone of deep learning.

**Matching reduces cognitive load while preserving analytical demand.** Unlike open-ended "explain the cause" questions, matching gives learners a constraint. They're not generating from scratch; they're reasoning within a bounded set. This scaffolds analysis for younger learners while remaining challenging for older ones.

**Spatial/visual connection lines engage visual learners** and make abstract relationships concrete. The act of drawing a line or seeing a connection form is satisfying and memorable.

## Content Generation Spec

The AI must produce:
1. A **prompt** that frames the matching task or connection challenge.
2. A **pairs array** where each object contains a `cause` and an `effect` (or two related concepts).
3. An **explanation** that describes why each pair connects and, if applicable, the deeper theme that unites all pairs.
4. Optionally, a **connectionPrompt** for open-ended variants (ages 14–16).

For structured matching, the AI should ensure pairs are clear and defensible at the target age level. For open-ended connections, the AI should identify a credible, non-obvious thread that ties the concepts together.

### Example Output

```json
{
  "prompt": "Match each event to its consequence.",
  "pairs": [
    {
      "cause": "Invention of the steam engine",
      "effect": "Factories could manufacture goods faster and cheaper"
    },
    {
      "cause": "Massive migration to cities for factory jobs",
      "effect": "Rapid growth of urban slums and overcrowding"
    },
    {
      "cause": "Exploitation of factory workers and poor conditions",
      "effect": "Rise of labor movements and trade unions"
    },
    {
      "cause": "Cheap, mass-produced goods became available",
      "effect": "Middle class expanded; consumer culture emerged"
    }
  ],
  "explanation": "The Industrial Revolution was a cascade of interconnected causes and effects. The steam engine enabled mass production, which drew people to cities in search of work. Poor working conditions sparked labor activism. Meanwhile, the availability of affordable goods transformed society and economics. Each effect often became a cause for the next change."
}
```

## UX Considerations

- **Two-column layout (tablet) vs. carousel (phone):** On tablets, display causes on the left, effects on the right. On phones, use a carousel or tab-based interface to avoid horizontal cramping.
- **Tap-to-select flow:** Learner taps cause → color highlight or border appears → learner taps effect → line draws between them (animated). Visual feedback is critical.
- **Connection lines:** If using visual lines, animate them smoothly (e.g., SVG stroke animation). Ensure lines don't lag on older devices or when many pairs exist.
- **Partial credit display:** As the learner completes pairs, show a counter (e.g., "3 of 4 correct") to maintain motivation.
- **Clear labeling:** Use small headers ("Causes" / "Effects") so learners understand the task layout.
- **Mobile notes:** On phones, consider a sequential reveal: "Match pair 1, then pair 2," rather than all at once, to reduce visual overwhelm.

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | 3 simple, direct cause-effect pairs. Concrete, immediate consequences (e.g., "rain falls" → "ground gets wet", "plant a seed" → "flower grows", "turn on light" → "room lights up"). Use simple language and icons if helpful. Instant visual feedback on each match. |
| 11–13 | 4 cause-effect pairs with moderate abstraction. Historical, scientific, or social contexts (e.g., "printing press invented" → "ideas spread faster", "Industrial Revolution" → "people moved to cities", "invention of telephone" → "long-distance communication possible"). Learner sees cause-effect chains across time. Optional: ask learner to articulate one connection in their own words after matching. |
| 14–16 | 5 pairs with complex, multi-step causation, OR shift to open-ended connection challenge. Example structured set: "match the scientific discovery to its societal impact" with pairs like "germ theory" → "modern sanitation", "genetics" → "personalized medicine". Example open-ended: "What connects Marie Curie, uranium, and the Cold War?" (Answer: her discoveries led to nuclear power and weapons, which shaped the Cold War). Can explore causation with multiple valid interpretations. |

## Lesson Placement

This mechanic fits best in **Core Practice** or **Deep Engagement**, after learners have encountered the content. It reinforces connections and causality taught in the lesson. Can also work in **Spaced Review** to test whether learners retained understanding of cause-effect relationships.

Avoid placing in **Hook** (too abstract without context) or **Extension** (there are better uses for extension activities).

## Related Mechanics

- **01-multiple-choice:** Similar selection, but learner picks the correct answer to a question, not a cause-effect pair.
- **17-find-the-error:** Also at Bloom Level 4 (analyze), but focuses on spotting errors rather than connections.
- **20-ranking:** Can be combined with cause-effect (e.g., "rank these causes by impact").
- **23-open-ended:** For open-ended connection challenges, learners might type a response instead of matching.
