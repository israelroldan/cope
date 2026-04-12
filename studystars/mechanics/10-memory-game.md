# Memory/Concentration Game

> Flip pairs of face-down cards to find matching pairs from memory, reinforcing associations between related concepts.

## Core Mechanic

The learner faces a grid of face-down cards (3×4 or 4×4). They tap a card to flip it, revealing content (an image, word, or symbol). They tap a second card to flip it. If the two cards match (e.g., a country name matches a flag), they stay flipped and the learner earns points. If they don't match, both cards flip back over and the learner tries again.

The game continues until all pairs are matched. Visually, matched pairs either remain visible with a checkmark overlay or fade away, depending on the age group. As pairs are matched, a progress counter shows how many remain. Optional: a timer counts down, adding pressure for older learners.

The entire interaction is driven by tapping—no dragging or complex gestures—making it accessible to younger children while remaining engaging for teens.

## Why It Works

**Working Memory & Retrieval Practice**: Learners must hold the position and identity of cards in working memory across multiple flips. Each failed attempt strengthens the memory trace, making successful matches more rewarding and longer-lasting.

**Spaced Exposure**: Unlike a single recognition task, the memory game forces repeated, spaced exposure to each pair. The failure-and-retry loop is actually a strength: research on desirable difficulty shows that struggling (and failing) to retrieve information makes learning stick better.

**Motivation Through Gamification**: The competitive element (timer, attempts counter, score) activates intrinsic motivation. Younger children find the simple sensory pleasure of flipping cards rewarding; older learners enjoy beating their own time or score.

**Association Building**: The game directly embodies the learning goal—forming tight associations between paired concepts (flag ↔ country, definition ↔ term, date ↔ event). Repeated retrieval under this format burns in those associations.

## Content Generation Spec

The AI must generate:
1. A set of semantically matched pairs (minimum 6, maximum 8 pairs)
2. A grid configuration (3×4 for younger learners, 4×4 for older)
3. Optional: a theme hint (e.g., "geography", "history") to guide visual design

Each pair should be:
- **Clear and unambiguous**: The match must be undeniable once both cards are flipped.
- **Balanced in difficulty**: Some pairs should be obvious (reinforcing success), others slightly trickier (building persistence).
- **Age-appropriate in content complexity**: Younger learners match concrete items (animals + habitats); older learners match abstract concepts (historical figures + achievements).

### Example Output

```json
{
  "pairs": [
    {
      "front": "Egypt",
      "back": "🏜️ The Nile River Valley",
      "category": "geography"
    },
    {
      "front": "Cleopatra",
      "back": "Last active pharaoh of Ptolemaic Egypt",
      "category": "history"
    },
    {
      "front": "Pyramid of Giza",
      "back": "Built as tomb for Pharaoh Khufu",
      "category": "archaeology"
    },
    {
      "front": "Hieroglyphics",
      "back": "Ancient Egyptian writing system",
      "category": "language"
    },
    {
      "front": "Tutankhamun",
      "back": "Young pharaoh with famous gold burial mask",
      "category": "history"
    },
    {
      "front": "Papyrus",
      "back": "Plant used to make paper in ancient Egypt",
      "category": "technology"
    },
    {
      "front": "3100 BCE",
      "back": "Approximate date of ancient Egypt's unification",
      "category": "chronology"
    },
    {
      "front": "Scarab Beetle",
      "back": "Sacred symbol of rebirth in Egyptian culture",
      "category": "culture"
    }
  ],
  "gridSize": "4x4",
  "speedBonus": true,
  "theme": "ancient-egypt"
}
```

## UX Considerations

- **Card Size**: Each card should be large enough to tap easily (56×56px minimum). On 4×4 grids, cards may be tighter; ensure enough padding between them.
- **Card Flip Animation**: Smooth 3D flip (300ms transition) using CSS `transform: rotateY()` or equivalent. Shows brief loading state before content appears.
- **Matched Pair Feedback**: After a correct match, cards glow or show a checkmark for 1–2 seconds. On 4×4 grids for older learners, cards fade and remove immediately.
- **Mismatch Feedback**: If cards don't match, they flip back quickly (after 1 second), and a subtle "uh-oh" sound (optional) reinforces the miss without shaming.
- **Progress Indicators**: Display a counter showing "Pairs Found: 4 of 8" and optional timer (HH:MM:SS or just seconds).
- **Accessibility**: Cards can be navigated via keyboard (arrow keys) and activated (Enter/Space) for accessibility.

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | **3×4 grid (6 pairs)**. Matched pairs remain visible with a gold star or checkmark overlay. No timer—play at own pace. Content: animals & habitats, fruits & colors, simple objects & uses. Feedback is celebratory ("Great match!"). Attempts counter shown but not used for scoring. |
| 11–13 | **4×4 grid (8 pairs)**. Matched pairs fade after 1–2 seconds. Optional 90-second timer (learner can opt out). Content: country-flag pairs, historical figures-achievements, biology terms-definitions. Scoring: 10 points per match, 1 point per remaining second bonus. Feedback shows accuracy and encourages replaying. |
| 14–16 | **4×4 grid (8 pairs)**. Matched pairs remove instantly. 60-second timer (mandatory). Content: abstract concepts, literary characters-plot points, scientific terms-mechanisms, dates-historical events. Scoring: 10 points per match, time-weighted bonus (complete in <30s = +20 points), –1 point per failed attempt. Leaderboard shows top scores. |

## Lesson Placement

**Core Practice & Extension**: Memory games are best deployed *after* learners have encountered the content in a lesson. Use it as a low-stakes, high-engagement review. It reinforces associations without the pressure of a graded quiz.

**Spaced Review**: Schedule memory games as part of a spaced-review cycle (days later, weeks later) to strengthen long-term retention and combat forgetting.

## Related Mechanics

- **Matching Pairs (Mechanic 8)**: Identical in content structure, but pairs are visible simultaneously. Memory game hides pairs, adding cognitive load.
- **Multiple Choice (Mechanic 4)**: A simpler, less demanding variant. Use it before memory games to scaffold understanding.
- **Flash Cards (Mechanic 2)**: Another memory-based mechanic. Can be sequenced: flash cards first (passive recognition), then memory game (active retrieval).
