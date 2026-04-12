# Matching Pairs (Association)

> Grid of 6-12 items; connect related pairs. Matched pairs disappear. Often timed.

## Core Mechanic

Two columns appear on the screen. The left column contains 3-12 items (e.g., countries: France, Brazil, Japan). The right column contains the corresponding items in randomized order (e.g., capitals: Tokyo, Brasília, Paris). The learner reads an item on the left, identifies its match on the right, and taps both items in sequence. Upon tapping the second item, the app checks if the pair is correct. If correct, both items highlight and disappear with a fade animation; the learner sees immediate confirmation and gains points. If incorrect, both items briefly shake or display an error state, then return to normal; the learner can try again. The learner continues until all pairs are matched.

The mechanic scales from simple (3 pairs for young learners) to complex (12 pairs for advanced learners). The layout is typically two columns on mobile, but may adapt to a grid or carousel on larger screens. Timed variants add pressure: a countdown timer runs in the corner, and faster completion earns bonus points or triggers special effects.

## Why It Works

Matching activates associative learning: the cognitive process of linking two concepts or pieces of information. When learners repeatedly connect related items, they strengthen the conceptual bond. This is distinct from isolated fact retrieval (as in multiple choice) because it requires learners to hold multiple items in working memory and discriminate between matches.

The visual-spatial arrangement supports learning: seeing items in two columns and physically connecting them (via taps) creates an embodied memory trace. The disappearing animation provides clear feedback and reduces cognitive load as the grid simplifies. Research on pairing and association shows that learners who engage in repeated matching practice improve not just at matching itself, but also at unprompted recall and transfer.

## Content Generation Spec

The AI should generate related pairs. The relationship can be:
- **Factual** (country-capital, inventor-invention)
- **Semantic** (word-synonym, term-definition)
- **Temporal** (historical event-date, historical figure-achievement)
- **Conceptual** (concept-example, principle-application)

The AI should ensure:
1. Each left item has exactly one correct match on the right.
2. Distractors are plausible but clearly wrong (e.g., if left is "France", right options include "Paris" [correct] and "Tokyo", "Rome", "Madrid" [plausible capitals, not France's]).
3. No item appears twice.

Content shape:
- **pairs** (object[]): Array of {left, right} objects.
  - "left": "France", "right": "Paris"
  - "left": "Brazil", "right": "Brasília"
  - "left": "Japan", "right": "Tokyo"
- **shuffled** (boolean, default true): Randomize the right column for display.
- **explanation** (string, optional): Contextual note (e.g., "Brasília became Brazil's capital in 1960, replacing Rio de Janeiro.").
- **difficulty** (enum): "easy" for obvious pairs; "hard" for subtly similar distractors.

### Example Output

```json
{
  "pairs": [
    {
      "left": "Alexander Fleming",
      "right": "Penicillin"
    },
    {
      "left": "Marie Curie",
      "right": "Radioactivity"
    },
    {
      "left": "Albert Einstein",
      "right": "Theory of Relativity"
    },
    {
      "left": "Isaac Newton",
      "right": "Law of Gravitation"
    },
    {
      "left": "Charles Darwin",
      "right": "Theory of Evolution"
    }
  ],
  "shuffled": true,
  "explanation": "These scientists made landmark discoveries that shaped modern science. Each discovery represents a leap in human understanding and has practical applications in medicine, physics, and biology.",
  "difficulty": "medium",
  "tags": [
    "history-of-science",
    "scientists",
    "discoveries",
    "grade-7-science"
  ]
}
```

## UX Considerations

- **Layout**: Two-column layout on mobile and tablet. Left column fixed, right column may be scrollable if many items. On very large screens, may display a single grid with lines drawn between matched items (drag-based interaction).
- **Touch targets**: Each item must be at least 48×48px, preferably 56×56px for young learners. Items are typically text-only buttons but can include small icons.
- **Visual feedback**: Selected items highlight with a color (e.g., light blue border or background). Upon matching, the pair briefly glows green or displays a checkmark, then fades out.
- **Scrolling**: If more than 6 items, the right column may be scrollable. Ensure the left column stays visible and fixed while the right scrolls.
- **Animations**: Smooth fade-out for matched pairs. Slight shake or red flash for incorrect attempts. Satisfying "snap" sound optional for correct matches.
- **Progress**: Show "4 / 6 pairs matched" or similar progress indicator.

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | Maximum 3 pairs (6 items). Large items (60×60px minimum) with clear, simple associations (e.g., animal + habitat: Lion / Savanna, Fish / Ocean, Bird / Forest). Optional small icon beside text (picture of lion, fish, bird). No timer. Celebratory feedback ("Great pair!"). Tap-sequence interaction is simpler: tap item on left, then item on right. |
| 11–13 | 4-5 pairs (8-10 items). Standard item size (48×56px). Conceptual associations (inventor-invention, word-definition, country-capital). Optional timer (60-90s) but not mandatory. Point rewards for speed. Clear per-pair feedback immediately. |
| 14–16 | 6-8 pairs or more (up to 12 items). Compact item size (40×48px). Complex associations (historical figure-achievement, chemical element-property, literary work-theme). Timed variant (90-120s countdown, timer prominent). Speed-based leaderboard. Can include images on both left and right sides (e.g., flag-image and capital-name). Expert-level explanation post-completion. |

## Lesson Placement

**Post-content**: After introducing paired concepts (countries and capitals, inventors and inventions), matching consolidates the associations while material is fresh.

**Core practice**: For vocabulary-heavy subjects (language learning, anatomy, history), matching pairs is core practice that builds fluency through repeated association.

**Deep engagement**: Timed competitive variants (leaderboards, speed runs) engage older learners in challenge-based learning.

## Related Mechanics

- **Categorization** (id: `categorization`): Similar layout but learner groups items into multiple categories (more than 2).
- **Fill in the Blank (Word Bank)** (id: `fill-in-blank-wordbank`): Learner matches words to blanks in sentences, rather than abstract pairs.
- **Multiple Choice** (id: `multiple-choice`): Simpler variant where learner matches one item to options without grid interaction.
