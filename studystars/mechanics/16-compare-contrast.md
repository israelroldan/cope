# Compare and Contrast

> Examine two or more items and identify similarities and differences through structured multiple-choice questions.

## Core Mechanic

The learner sees two items presented side by side (or stacked on narrow screens). Each item is labeled with a name (e.g., "Amazon River" and "Nile River") and displays a set of key facts or characteristics in bullet-point form.

Below the items are 2–4 comparison/contrast questions. Questions ask the learner to identify what the items have in common, how they differ, or how they fit into categories. For example: "Which of the following is true of both rivers?", "What is a key difference between X and Y?", or "Which best describes the relationship between these two concepts?"

The learner taps their answer from 3–4 multiple-choice options. Feedback is immediate: a checkmark or highlight indicates correctness, and an explanation references both items and their facts, explicitly showing why the answer is right.

The entire activity is structured as guided multiple-choice, avoiding open-ended Venn diagram placement (which is harder to validate and less suitable for AI generation).

## Why It Works

**Analytical Thinking**: Comparison requires learners to identify and articulate relationships between concepts. This is a higher-order cognitive skill than simple recall or application. It builds the ability to synthesize and see patterns.

**Conceptual Integration**: By examining multiple items side by side, learners understand each one more deeply through contrast and analogy. This comparative framing is a proven cognitive strategy for building robust mental models.

**Discrimination Learning**: Identifying subtle differences (especially in comparison tasks for older learners) trains learners to discriminate between similar but distinct concepts. This builds nuance and precision in understanding.

**Transfer & Generalization**: Skills learned through comparison (recognizing similarities across domains, identifying structural parallels) transfer better to novel contexts than isolated learning.

## Content Generation Spec

The AI must generate:
1. Two items to compare (names and 3–5 key facts each)
2. 2–4 comparison questions targeting similarity, difference, categorization, or cause-effect
3. 3–4 answer options per question
4. Explanations that reference specific facts from both items

Guidelines:
- **Item Selection**: Items should be meaningfully related yet distinct (e.g., two historical figures, two ecosystems, two literary characters). Random comparisons waste cognitive effort.
- **Fact Quality**: Facts should be specific, accurate, and relevant to potential comparison questions. Vague descriptions reduce question quality.
- **Question Progression**: Begin with obvious comparisons, then progress to subtle or implicit ones. Avoid questions that require external knowledge.
- **Distractor Logic**: Wrong answers should reflect common misconceptions or partial understanding, not random errors.

### Example Output

```json
{
  "itemA": {
    "name": "Amazon River",
    "facts": [
      "Located in South America, flowing through Brazil and nine other countries",
      "Approximately 6,400 kilometers long, making it the second-longest river",
      "Carries more water than any other river in the world (about 209,000 cubic meters per second)",
      "Flows through the Amazon Rainforest, the world's largest tropical rainforest",
      "Supports millions of species and is critical for global climate regulation"
    ]
  },
  "itemB": {
    "name": "Nile River",
    "facts": [
      "Located in Africa, flowing through eleven countries and emptying into the Mediterranean Sea",
      "Approximately 6,650 kilometers long, making it the longest river in the world",
      "Flows through the Sahara Desert and is essential for agriculture in Egypt",
      "Historically central to Egyptian civilization; annual flooding once provided nutrient-rich silt",
      "Supports over 300 million people who depend on its water for drinking, irrigation, and power"
    ]
  },
  "questions": [
    {
      "question": "Which of the following is true of both the Amazon and Nile rivers?",
      "options": [
        "Both are among the world's longest rivers and support large human populations",
        "Both flow through deserts and rely on seasonal flooding",
        "Both flow into the Mediterranean Sea",
        "Both are located in South America"
      ],
      "correctIndex": 0,
      "comparisonType": "similarity",
      "explanation": "Both the Amazon and Nile are among the world's longest rivers (Amazon: ~6,400 km, Nile: ~6,650 km). Additionally, both support millions of people—the Amazon's rainforest is critical globally, and the Nile directly supports over 300 million people in its basin."
    },
    {
      "question": "What is a key difference in how these two rivers influence their regions?",
      "options": [
        "The Amazon regulates climate and biodiversity globally, while the Nile is primarily an agricultural resource",
        "The Nile is longer and supports more species",
        "The Amazon flows through more countries",
        "Only the Nile has seasonal patterns"
      ],
      "correctIndex": 0,
      "comparisonType": "difference",
      "explanation": "The Amazon River's primary global impact is through climate regulation and supporting millions of species in the rainforest, affecting global biodiversity and climate. The Nile's primary importance is agricultural—its water (and historically its flooding) makes life possible in the surrounding desert for 300+ million people. This represents a fundamental difference in their ecological roles."
    },
    {
      "question": "Which environmental threat would be more devastating for each river?",
      "options": [
        "Deforestation for the Amazon; water diversion for the Nile",
        "Both rivers would be equally affected by any single threat",
        "Water pollution affects all rivers equally",
        "Climate change only impacts tropical rivers like the Amazon"
      ],
      "correctIndex": 0,
      "comparisonType": "cause-effect",
      "explanation": "Deforestation is the primary threat to the Amazon because the rainforest is integral to its ecosystem and climate function. For the Nile, water diversion (e.g., dams, irrigation) is most threatening because millions depend directly on its flow for agriculture and drinking water. Each river's vulnerabilities reflect its distinct roles."
    }
  ]
}
```

## UX Considerations

- **Item Display**: On wide screens (desktop/tablet), items are side-by-side in equal-width columns. On narrow screens (mobile), items stack vertically with clear visual separation (border, background color).
- **Item Labeling**: Each item's name is prominently displayed at the top in larger text (18–24pt). Facts are bulleted, with consistent line spacing (1.5x) for readability.
- **Question Presentation**: Questions appear below the items with clear numeric labels ("Question 1 of 3"). Visual hierarchy separates question from items (white space, subtle background).
- **Answer Options**: Displayed as large, tappable buttons (minimum 48×48px). Options are stacked vertically and clearly separated.
- **Feedback**: After submission, a checkmark/X appears next to the selected option. The explanation fades in below the question, referencing both items by name.
- **Progress Indicator**: Display "Question 1 of 3" or similar. A progress bar can show position in the set.

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | **Two obviously different concrete items** (e.g., dog vs. cat, winter vs. summer, day vs. night). **2 simple comparison questions** focusing on obvious similarities and differences. **3 answer options**. No subtle or multi-dimensional analysis. Explanation uses simple language and direct statement ("Both are animals," "They are both cold"). Facts are concrete and observable. |
| 11–13 | **Two moderately similar items** (e.g., two ecosystems, two historical periods, two geometric shapes). **2–3 questions** testing obvious and subtle differences. One question may require simple categorization ("Both are types of..."). **3 answer options**. Explanation explicitly maps facts from each item to the comparison. Questions go beyond surface differences to explore function or role. |
| 14–16 | **Two complex items with multiple dimensions** (e.g., two political systems, two evolutionary adaptations, two literary themes, two economic theories). **3–4 questions** testing multi-criteria analysis, implicit relationships, and complex cause-effect. **3–4 answer options**. Questions may require synthesis across categories (structure, function, historical context, ethical dimensions). Explanation connects to broader frameworks and may explore conditional relationships ("If X is true of A, then Y follows for B because..."). |

## Lesson Placement

**Deep Engagement**: This is an analytically demanding mechanic best used after learners have solid foundational understanding of both items. It's ideal for review and synthesis, not introduction.

**Integration & Transfer**: Use comparison to help learners see how concepts learned separately relate to each other. Example: After learning about mitochondria and chloroplasts separately, use compare-and-contrast to explore their relationship (endosymbiotic theory, similarities in structure, different energy roles).

**Critical Thinking Development**: Combine with other high-order mechanics (scenario questions, spatial hotspots) in a "deep engagement" section to challenge advanced learners.

## Related Mechanics

- **Multiple Choice (Mechanic 4)**: A simpler alternative. Use MC first to teach individual items, then comparison to relate them.
- **Scenario-Based Question (Mechanic 15)**: Can be combined. Example: Read a scenario, then compare two concepts relevant to the scenario.
- **Matching Pairs (Mechanic 8)**: A precursor. Match properties/facts, then use compare-and-contrast for deeper analysis.
- **Matching Pairs with Memory (Mechanic 10)**: Can reinforce underlying facts before comparison.
