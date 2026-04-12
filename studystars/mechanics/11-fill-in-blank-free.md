# Free Recall Fill-in-the-Blank (No Word Bank)

> Type an answer from memory to complete a sentence or question with no word bank. Validated with fuzzy matching for spelling variants.

## Core Mechanic

The learner sees a sentence or question with a blank space marked clearly (e.g., "The capital of Australia is _______"). Unlike the word-bank version (mechanic 6), there are no options to choose from. The learner must recall the answer entirely from memory and type it into a text field.

As they type, the input field shows their text. Once they submit (by tapping "Check" or pressing Enter), the system compares their response against a list of acceptable answers. This list includes the canonical answer plus common variants: different cases, abbreviations, and (depending on age group) minor spelling mistakes.

Feedback is immediate: if correct, the learner sees a checkmark and an explanation. If incorrect, they see the correct answer, the explanation, and optionally a retry button. The cognitive demand is higher than word-bank fill-in-the-blank because learners must generate the answer rather than recognize it—a stronger form of retrieval practice.

## Why It Works

**Free Recall vs. Recognition**: Free recall (generating an answer from memory) requires deeper encoding and creates stronger, more durable memories than recognition (selecting from options). This mechanic directly targets that harder, more valuable retrieval mode.

**Generative Learning**: The act of typing—generating a response character by character—creates a motor memory that boosts long-term retention. Studies show that typing notes is more effective than reading them.

**Graded Difficulty**: By offering optional hints only for younger learners, this mechanic naturally scaffolds. Older learners face stricter conditions, building confidence in their knowledge.

**Spaced Repetition Ready**: Free-recall questions are ideal for spacing algorithms. The system can track which questions the learner answers correctly and re-present the harder ones after days or weeks, optimizing retention curves.

## Content Generation Spec

The AI must generate:
1. A clear sentence or question with a blank (marked `{{blank}}`)
2. A list of acceptable answers (canonical + variants)
3. A concise explanation of the correct answer
4. Optional: a progressive hint (character by character or semantic clue)

For variant handling:
- **Case insensitivity**: "Australia" = "australia" = "AUSTRALIA"
- **Common misspellings**: "Canberra" should accept "Canaberra" if a common error
- **Abbreviations**: "Australia" = "AU" (context-dependent)
- **Synonyms**: Context allows ("the opposite of hot is _____": accept "cold" or "cool")

Age-appropriate content:
- **Ages 8–10**: Concrete nouns, simple adjectives, obvious associations
- **Ages 11–13**: Dates, definitions, facts requiring moderate recall effort
- **Ages 14–16**: Abstract terms, precise definitions, technical vocabulary

### Example Output

```json
{
  "text": "The process by which plants convert sunlight into chemical energy is called {{blank}}.",
  "acceptedAnswers": [
    "photosynthesis",
    "Photosynthesis",
    "PHOTOSYNTHESIS",
    "photo synthesis",
    "fotosynthesis"
  ],
  "hint": "P_____________ (11 letters, starts with 'photo')",
  "explanation": "Photosynthesis is the biochemical process where plants use light energy, water, and carbon dioxide to produce glucose and oxygen. It occurs primarily in the chloroplasts of plant cells and is essential for converting solar energy into forms usable by living organisms.",
  "answerLength": 15,
  "acceptableSpellingVariants": true
}
```

## UX Considerations

- **Input Field**: 44px+ tall with clear focus state. Placeholder text hints at expected length ("The answer is about 10 characters...").
- **On-Screen Keyboard**: Mobile devices should display a soft keyboard automatically. Capitalize the first letter unless it's a lowercase term (e.g., "pH").
- **Submission**: Learner taps "Check" button or presses Enter. Both trigger validation.
- **Feedback Display**: Correct answer appears in a distinct visual style (bold, highlighted, or in a separate box) so it's impossible to miss.
- **Retry Option**: For younger learners, offer a "Try Again" button. For older learners, show the answer once and move on.
- **Character Counter** (optional): Display how many characters the learner has typed, helping them gauge if their answer is complete.

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | **Simple, concrete answers** (animal names, colors, body parts, numbers). Hints show the full word on demand ("Show hint: _______"). Case-insensitive. Accepts any reasonable spelling variant (phonetic matching for easier terms). Explanation uses everyday language. Unlimited retries. |
| 11–13 | **Standard difficulty** (facts, dates, simple definitions, place names). Progressive hint available: first letter + underscores ("P__________"), or semantic hint ("It's a process that requires sunlight"). Fuzzy matching enabled for common typos (e.g., "occured" → "occurred"). Explanation references the lesson or source material. One retry per question. |
| 14–16 | **Higher cognitive demand** (technical definitions, abstract concepts, precise terms). No hints. Strict character matching (only minor typos like transposed letters accepted via Levenshtein distance ≤ 1). Explanation includes deeper context, causal reasoning, or connections to other concepts. No retries—answer shown once. |

## Lesson Placement

**Core Practice**: Deploy free-recall FIB immediately after teaching content. It serves as an in-the-moment check of understanding and forces active retrieval while content is still relatively fresh.

**Spaced Review**: Re-present the same or similar questions after 1 day, 3 days, 1 week, and 2 weeks using a spaced-repetition algorithm. This leverages the spacing effect to build durable long-term memory.

**Reflection**: Use free-recall FIB as a self-check tool; learners can assess their own knowledge without teacher judgment.

## Related Mechanics

- **Fill-in-the-Blank with Word Bank (Mechanic 6)**: A recognition-based precursor. Sequence: word-bank FIB → free-recall FIB as difficulty ramps.
- **Short Answer / Essay (Mechanic 16, if exists)**: A more open-ended variant where learners write 1–3 sentences instead of a single word.
- **Multiple Choice (Mechanic 4)**: A simpler alternative for younger learners or reinforcement before free-recall.
- **Flashcards (Mechanic 2)**: Complements this mechanic—use flashcards as warm-up, then free-recall FIB for deeper challenge.
