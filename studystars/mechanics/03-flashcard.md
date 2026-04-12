# Flashcard (Self-Assessed Recall)

> Card shows prompt on front. User attempts recall, flips to check. Self-sorts into 'Know' / 'Still Learning.'

## Core Mechanic

A large card fills most of the screen, displaying a prompt or question on the front (e.g., "Mitochondrion — main function?"). The learner reads the prompt, thinks quietly, and attempts to recall the answer from memory. Once they feel confident in their answer, they tap the card or swipe horizontally to flip it. The card rotates with a smooth 3D animation, revealing the back with the correct answer or definition (e.g., "ATP production (cellular respiration)"). The learner compares their mental answer to the revealed answer, silently assessing how well they did. Optionally, they may be offered two buttons: "I Know This" (green) or "Still Learning" (orange/yellow). Selecting one advances to the next card in the deck and registers that card's mastery status in a spaced repetition algorithm. The learner continues through the deck at their own pace, seeing the same cards again on future sessions if they marked them as "Still Learning."

The mechanic emphasizes active recall (retrieving from memory before seeing the answer), which is far more effective for long-term retention than passive reading or recognition. The self-assessment step allows learners to calibrate their own confidence and decide which cards need more review.

## Why It Works

Flashcard-based learning is grounded in the spacing effect and retrieval practice principle. When learners attempt recall, they engage in effortful retrieval that strengthens memory more than rereading. The delay between prompt and answer is crucial—it forces retrieval from long-term memory, not working memory. Even if learners fail to recall the answer, seeing it immediately afterward supports encoding.

Critically, self-assessment introduces metacognitive reflection. Learners who misjudge their own knowledge (overconfidence or underconfidence) receive calibrating feedback via spaced repetition: overconfident cards appear again sooner, forcing retrieval success; underestimated cards get extra review. This feedback loop gradually sharpens learners' ability to predict their own performance.

## Content Generation Spec

The AI should generate prompt-answer pairs aligned with a learning objective. Prompts can be questions, definitions to fill in, or cues for recall. Answers should be concise but complete enough to verify correctness. For multilingual contexts, front and back can be in different languages (e.g., front = English word, back = French translation). The AI can also add optional hints (e.g., "Starts with M" for Mitochondrion) to scaffold younger learners.

Content shape:
- **front** (string): The prompt or cue (5-15 words). This is the question or stimulus the learner sees before flipping. Examples: "Capital of Brazil?", "What process converts sunlight into glucose?", "Spanish word for 'book'".
- **back** (object): Structured content for the reveal side:
  - **back.title** (string, required): The key concept or answer being recalled. Displayed prominently as the heading. This is the thing the learner is trying to retrieve. Examples: "Brasília", "Photosynthesis", "Libro", "KE = ½mv²".
  - **back.detail** (string, required): A concise explanation reinforcing the title. 1-2 sentences, displayed below the title in smaller text. Examples: "The capital was moved inland from Rio de Janeiro in 1960 to promote development of Brazil's interior.", "Plants use chlorophyll to convert light energy, water, and CO₂ into glucose and oxygen."
  - **back.category** (string, optional): A short thematic label shown as a tag/chip. Helps learners build mental models across cards. Examples: "Geography", "Biology", "Vocabulary".
- **hint** (string, optional): A brief scaffolding hint (2-5 words). Examples: "South American city", "Plant process, produces glucose".
- **topic** (string, required): The lesson topic for deck organization. e.g. "The Solar System", "Ancient Egypt".
- **difficulty** (enum, optional): "easy" for high-frequency facts; "hard" for specialized terms or complex definitions.

### Example Output

```json
{
  "front": "What process do plants use to convert sunlight into glucose?",
  "back": {
    "title": "Photosynthesis",
    "detail": "Plants use chlorophyll in chloroplasts to convert light energy, water, and CO₂ into glucose and oxygen.",
    "category": "Biology"
  },
  "hint": "Uses light, starts with 'photo'",
  "topic": "Biology — Plant Science",
  "difficulty": "medium",
  "tags": [
    "biology",
    "photosynthesis",
    "cellular-processes",
    "grade-6"
  ]
}
```

## UX Considerations

- **Card size**: Large, centered card taking up 85-95% of screen width on mobile. Minimum 400px × 300px on tablets.
- **Typography**: Front text 18-24pt bold (depending on age and screen size). Back text 16-20pt. High contrast (dark text on light background, or vice versa).
- **Flip animation**: 3D card rotation (0.6s duration with cubic-bezier easing). Tap anywhere on card, or swipe horizontally (swipe right = next, left = previous if allowed).
- **Progress indicator**: Show "7 / 20" or similar in top corner. Optional progress bar at bottom.
- **Self-assessment buttons**: Two large buttons ("I Know" / "Still Learning") appear after flip, or require manual press before advancing.
- **Minimalist design**: Single card per screen. Remove clutter. Focus attention on front/back text.
- **One-handed use**: Ensure tap targets are reachable with one thumb; avoid top-right corner for critical buttons on large phones.

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | Larger cards (95% width) with 20-24pt front text and 18-20pt back text. Include visual elements: emoji, small icons, or illustrations beside text. Hint text always visible or easily accessible (tap "?"). No timer pressure. Tap-to-flip only; swiping optional. Affirmative language for self-assessment ("I got it!" / "Let me practice more"). |
| 11–13 | Standard card layout with 18-22pt front, 16-18pt back. Self-assessment buttons visible after flip. Optional timer mode (20-30s per card) but not default. Progress counter on every card. Swipe navigation smooth and responsive. Longer definitions allowed. |
| 14–16 | Compact cards (80-90% width) with 16-20pt text. Swipe-based navigation with kinetic inertia (continue scrolling on momentum). Speed mode with 10-15s timer per card. Spaced repetition stats visible ("You've seen this 3 times, got it wrong once"). Keyboard shortcuts (Space = flip, Arrow keys = navigate). Expert-level hints or etymology for advanced learners. |

## Lesson Placement

**Spaced review**: The primary use case. Learners return to flashcard decks over days/weeks. Spaced repetition algorithms show harder cards more frequently, optimizing retention.

**Warm-up**: 3-5 flashcards at the start of a lesson to activate prior knowledge.

**Core practice**: In contexts where memorization is the goal (vocabulary, formulas, definitions), flashcards serve as core practice, not just review.

## Related Mechanics

- **Multiple Choice** (id: `multiple-choice`): A scaffolded variant where the answer is shown immediately with distractors. Useful when pure recall is too hard.
- **True/False** (id: `true-false`): Can be combined with flashcards—front shows a statement, back shows the judgment + explanation.
- **Spaced Repetition Algorithm** (not a mechanic per se, but a backend feature): Automatically prioritizes cards based on recall success, showing easier cards less often.
