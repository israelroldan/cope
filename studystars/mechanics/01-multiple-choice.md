# Multiple Choice (Single Answer)

> Question with 2-6 answer options; user taps one. Immediate feedback. Points for correctness ± speed.

## Core Mechanic

A question appears at the top of the screen with 2-6 answer options arranged vertically below it. The learner reads the question, evaluates each option, and taps the option they believe is correct. Upon tapping, the selected option is highlighted and immediately reveals whether the answer is correct or incorrect. A checkmark and/or green highlight indicates a correct answer; an X and/or red highlight indicates an incorrect answer. Simultaneously, the correct answer (if not selected) highlights in green, and the app displays brief feedback text explaining the correct answer. The learner then advances to the next question by tapping "Next" or automatically after a 2-3 second delay. Points are awarded immediately if correct, with optional bonus points for speed.

The interaction is intentionally simple and fast—designed to minimize cognitive load and maximize retrieval practice. The visual feedback is immediate and unambiguous, creating clear cause-and-effect relationships between choice and outcome. Learners quickly internalize the pattern and can move through a series of questions with minimal friction.

## Why It Works

Multiple choice leverages retrieval-induced learning: the act of retrieving information from memory strengthens that knowledge more effectively than passive reading or observation. The four-option format (or 2-6 variation) provides enough options to challenge memory without being overwhelming. The immediate feedback loop ensures learners quickly correct misconceptions and reinforce accurate knowledge.

From a cognitive science perspective, the plausible distractors (wrong answers that reflect common misconceptions or half-truths) force deeper processing. Rather than discriminating between "right" and "obviously wrong," learners must consider nuances. This struggle enhances long-term retention. The speed-bonus mechanic optionally adds time pressure, which can increase arousal and engagement—but must be balanced carefully for younger learners who benefit from reflection time.

## Content Generation Spec

The AI must generate a question (natural language string), a correct answer, and 1-5 plausible distractors. Distractors should reflect common misconceptions, near-miss facts, or semantic confusions—not obvious red herrings. For example, when asking "What is the capital of Australia?" a good distractor is "Sydney" (largest city, commonly assumed capital), not "Atlantis" (nonsensical). The AI should also generate a brief explanation (1-2 sentences) of why the correct answer is right and why a common distractor is tempting.

Content shape:
- **question** (string): Clear, unambiguous question (8-20 words typical).
- **options** (string[]): 2-6 answers, with the correct one at any position (randomize before display).
- **correctIndex** (integer): 0-based position of the correct answer *before* randomization.
- **explanation** (string): "The Colosseum is in Rome, built 70-80 AD. Not Venice (St. Mark's) or Athens (Parthenon)."
- **difficulty** (enum): "easy" | "medium" | "hard" based on retrieval distance.

### Example Output

```json
{
  "question": "Which ancient monument stands on the Giza Plateau near Cairo?",
  "options": [
    "The Great Sphinx of Giza",
    "The Colosseum",
    "The Parthenon",
    "The Leaning Tower of Pisa"
  ],
  "correctIndex": 0,
  "explanation": "The Great Sphinx of Giza is located on the Giza Plateau in Egypt. The Colosseum is in Rome, the Parthenon in Athens, and the Leaning Tower in Pisa, Italy.",
  "difficulty": "medium",
  "tags": [
    "ancient-monuments",
    "geography",
    "archaeology"
  ]
}
```

## UX Considerations

- **Touch targets**: Minimum 48×48px for ages 11+; 56×56px for ages 8-10. Options should be full-width buttons with ample padding.
- **Visual hierarchy**: Large question text (16-18pt), smaller option text (14-16pt). Use high contrast colors for readability.
- **Color coding**: Green for correct, red for incorrect. Avoid relying on color alone; pair with icons (✓, ✗) or text labels.
- **Feedback timing**: Display feedback immediately (within 200ms of tap). Auto-advance after 2-3 seconds on correct answers; allow user to tap "Next" after incorrect answers to encourage reflection.
- **Animation**: Subtle scale/bounce on tap-to-select; fade-in for explanation text. Avoid distracting motion that delays interaction.
- **Mobile**: Stack options vertically on portrait phone screens. On tablets, options may be arranged in 2×2 or 2×3 grids if screen space allows, but vertical stack is most familiar.

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | Maximum 4 options. Positive-only feedback ("Great job!") avoids deflating incorrect answers. Larger 56×56px touch targets. Simple, concrete language with 1st-person phrasing ("Which of these is a dog?"). Include color-coded icons (images of options if possible). Longer reflection time (3-4 seconds before auto-advance). Distractors should be obviously related but not tricky. |
| 11–13 | Up to 5 options. Constructive feedback for incorrect answers ("Not quite—Mars has two moons, but Jupiter has four"). Standard 48×48px touch targets. More abstract language allowed. Distractors reflect genuine misconceptions (e.g., confusing similar countries, confusing synonyms). Speed bonus optional but not emphasized. |
| 14–16 | Up to 6 options. Timed variant available (10-15s countdown with visual timer). Challenging distractors drawn from higher-level misconceptions or edge cases. Feedback can be more detailed and contextual. Speed-bonus scoring is prominent; points scale with response speed. Can include follow-up questions or branching based on answer. |

## Lesson Placement

**Warm-up**: Quick multiple-choice questions activate prior knowledge and set the stage for new content (2-3 questions, 1-2 min).

**Post-content**: After introducing a concept, 5-10 multiple-choice questions reinforce core ideas and catch misconceptions while material is fresh.

**Spaced review**: Days or weeks later, multiple-choice questions reactivate fading memories and drive long-term retention through retrieval practice.

Not recommended for deep engagement or extension—use more open-ended mechanics (free-text, essay) for higher-order thinking.

## Related Mechanics

- **True/False** (id: `true-false`): A simpler, faster variant using only 2 options. Often used in rapid-fire warm-ups.
- **Image Recognition** (id: `image-recognition`): Replaces text options with images; ideal for visual/spatial knowledge.
- **Audio Recognition** (id: `audio-recognition`): Learner listens to audio (e.g., instrument, language, pronunciation) and selects from text or image options.
- **Matching Pairs** (id: `matching-pairs`): Scales multiple-choice logic to paired comparisons; learner connects related items.
