# True/False (Binary Judgment)

> Statement displayed; select True or False. Ultra-fast decision cycle.

## Core Mechanic

A declarative statement appears prominently on the screen (14-18pt font, high contrast). Below it are two large buttons: "True" on the left and "False" on the right, often color-coded (green and red, or contrasting pastels). The learner reads the statement, evaluates its accuracy against their knowledge, and taps one button. Immediately upon tapping, the button changes color, a checkmark or X appears, and brief feedback text confirms whether the judgment was correct. The explanation clarifies the statement's truth value and addresses common misconceptions. The learner then advances to the next statement within 1-2 seconds.

The mechanic is intentionally stripped down: no multiple options to parse, no reading distraction. This forces rapid recall and judgment, making it ideal for building fluency and reflexive knowledge. The binary constraint also means the AI can generate pairs easily (one statement true, one false variant).

## Why It Works

True/False leverages rapid-fire retrieval practice at its most distilled: the learner must access a memory trace and make a binary judgment, both simple cognitive operations that create space for speed-based flow states. The simplicity reduces cognitive load, allowing high-frequency practice with minimal fatigue. Research shows binary judgment tasks enhance fluency more efficiently than longer multiple-choice sequences when item difficulty is matched carefully.

The false statements are most effective when they are "near misses"—plausibly true but factually incorrect. This forces the learner to engage in critical evaluation rather than pattern matching. For example, "Octopuses have three hearts" is harder than "Octopuses have ten hearts" because the former requires precise knowledge, not just a vague sense of "something is off." This deeper processing supports longer retention.

## Content Generation Spec

The AI should generate true statements and then create false variants by minimal, plausible changes. For example:
- True: "The Great Wall of China is approximately 13,000 miles long."
- False: "The Great Wall of China is approximately 5,000 miles long." (same fact, wrong magnitude)

The false statement must be close enough to truth to require genuine knowledge, not logical absurdity. The explanation should explicitly state the correct fact and explain why the false variant is tempting or how learners often confuse it.

Content shape:
- **statement** (string): A declarative sentence (10-25 words). Use simple grammar to avoid confusing reading difficulty with knowledge difficulty.
- **isTrue** (boolean): The correct answer.
- **explanation** (string): "The Great Wall is about 13,000 miles long when including all branches. Many people guess 5,000-7,000 based on maps that show only major sections."
- **difficulty** (enum): "easy" for obvious statements, "hard" for near-miss false statements.

### Example Output

```json
{
  "statement": "The Egyptian pyramids were built by slaves using ramps and levers.",
  "isTrue": false,
  "explanation": "Modern evidence suggests workers were paid and fed well, not enslaved. They used ramps, levers, and water-lubricated sledges. The 'slavery' narrative comes from classical Greek writers, not archaeological evidence.",
  "difficulty": "hard",
  "tags": [
    "ancient-egypt",
    "history",
    "architecture",
    "misconceptions"
  ]
}
```

## UX Considerations

- **Touch targets**: True and False buttons must be at least 56×56px, preferably 64×64px on mobile to accommodate young fingers and minimize mis-taps.
- **Color coding**: Green for True, Red for False (or use pastel if high contrast needed). Pair with text labels; never rely on color alone.
- **Button layout**: Side-by-side on landscape or tablets; stack vertically (True above False) on portrait phones if space is tight.
- **Typography**: Statement text 16-20pt, bold, center-aligned. Button text 14-18pt, sans-serif.
- **Feedback timing**: Color change on tap (within 100ms). Explanation text fades in after 300ms. Auto-advance after 2-3 seconds.
- **Animation**: Button pulse on tap; checkmark/X icon animates in with a subtle bounce.

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | Large 64×64px buttons with big icons (✓ for True, ✗ for False). Use emoji or colored symbols if icons feel sterile. Statements must be unambiguous and concrete ("Cats have four legs" — easy). No trick statements. Feedback is celebratory ("Correct!"). |
| 11–13 | Standard 56×56px buttons. Statements can introduce subtle ambiguities or require careful reading ("Most of Antarctica is ice" — requires clarification: ice sheet vs. sea ice). Distractors reflect age-appropriate misconceptions. Neutral feedback tone. |
| 14–16 | Rapid-fire variant enabled. Statements are sophisticated and require precise knowledge ("The mitochondria is the site of anaerobic respiration" — False, it's the site of aerobic respiration, glycolysis occurs in cytoplasm). Speed scoring with timers and leaderboards. Can include historical or contested claims that require nuanced judgment. |

## Lesson Placement

**Warm-up**: 3-5 true/false questions to activate prior knowledge and build confidence (2-3 minutes total). Fastest way to get learners cognitively engaged.

**Spaced review**: Perfect for flash-card-like review sessions. Pairs well with flashcard mechanics to vary interaction mode.

Not recommended for deep engagement—the binary constraint limits opportunities for nuanced thinking.

## Related Mechanics

- **Multiple Choice** (id: `multiple-choice`): A more complex variant offering 3+ options. True/False is the atomic form of single-answer selection.
- **Flashcard** (id: `flashcard`): Can be combined into a hybrid where flashcard reveals true/false prompt instead of free recall.
- **Rapid-fire gamification**: Can be wrapped in timed competition or speed-run mechanics (Kahoot-style, Blooket-style).
