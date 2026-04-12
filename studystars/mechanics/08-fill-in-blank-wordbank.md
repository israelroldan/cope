# Fill in the Blank (Word Bank)

> Sentence with blanks + word bank. Tap/drag words into blanks. Cloze with scaffolding.

## Core Mechanic

A passage of text appears on the screen with 1-5 blanks (empty spaces marked by underlines or boxes). Below the text is a word bank: a row of word tiles representing candidate answers. The learner reads the passage and the context around each blank, then drags or taps a word from the bank and places it into a blank. The word snaps into place with a satisfying animation. If correct, the word remains in the blank; if the context allows, the word may gray-out in the word bank (indicating it's been used). If incorrect, the word shakes briefly and returns to the bank, signaling the answer didn't fit. The learner continues filling blanks until all are complete.

The mechanic emphasizes contextual learning: instead of isolated vocabulary (as in flashcards), learners see words in meaningful sentences and must use context clues (syntax, semantics) to select the right word. This mirrors real-world language comprehension.

## Why It Works

The cloze procedure (reading with deleted words) is a well-researched technique for building reading comprehension and vocabulary in context. When learners fill blanks, they engage in both bottom-up processing (retrieving vocabulary from the word bank) and top-down processing (using context to predict meaning). This dual processing enhances learning more than either strategy alone.

The word bank removes pure recall demand—learners need only recognize correct answers among options (a recognition task, easier than unassisted recall). This scaffolding allows younger learners and language learners to focus on comprehension and contextual application rather than struggling with retrieval. Over time, as proficiency increases, scaffolds can be reduced (fewer words in bank, more challenging distractors).

The spatial arrangement (text above, word bank below) supports embodied cognition: learners physically move words into their contexts, creating motor memory to accompany semantic memory.

## Content Generation Spec

The AI should generate sentences with strategic deletions. Deletions should target key vocabulary or grammatical items. The word bank should include:
1. All correct answers
2. Semantically plausible distractors (words that could fit contextually but are not the intended answer)
3. Syntactically plausible distractors (words of the correct part of speech that don't fit semantically)

Example:
- Correct: "The {{blank}} is the largest ocean on Earth" → [Pacific, Atlantic, Indian]
- More challenging: "A {{blank}} molecule consists of two hydrogen atoms bonded to one oxygen atom" → [water, hydrogen, oxygen, compound] (all are chemistry terms; only "water" is correct)

Content shape:
- **text** (string): Passage with {{blank}} markers. Example: "The {{blank}} is the process by which plants convert {{blank}} and {{blank}} into {{blank}} using {{blank}} energy."
- **blanks** (object[]): Array of {correctAnswer, position} for each blank.
- **wordBank** (string[]): 4-8 word options (number of blanks + 2-4 distractors). E.g., ["photosynthesis", "water", "carbon dioxide", "glucose", "sunlight", "oxygen", "respiration", "nitrogen"]
- **explanation** (string, optional): Context and correct answers with brief rationale.
- **difficulty** (enum): "easy" for obvious context; "hard" for multiple plausible options.

### Example Output

```json
{
  "text": "The {{blank}} are the largest animals to have ever lived on Earth. They {{blank}} in the ocean and feed on tiny organisms called {{blank}}. Ancient {{blank}} were even larger than modern whales.",
  "blanks": [
    {
      "correctAnswer": "whales",
      "position": 0
    },
    {
      "correctAnswer": "live",
      "position": 1
    },
    {
      "correctAnswer": "krill",
      "position": 2
    },
    {
      "correctAnswer": "whales",
      "position": 3
    }
  ],
  "wordBank": [
    "whales",
    "live",
    "krill",
    "dinosaurs",
    "swim",
    "plankton",
    "fish",
    "exist"
  ],
  "explanation": "Whales are the largest living animals. Most baleen whales live in the ocean and filter-feed on krill (small shrimp-like animals). Interestingly, fossil evidence suggests ancient whales were even larger than species alive today, such as the blue whale.",
  "difficulty": "medium",
  "tags": [
    "marine-biology",
    "animals",
    "whales",
    "reading-comprehension",
    "grade-5-science"
  ]
}
```

## UX Considerations

- **Text display**: Large, readable font (16-18pt). High contrast. Blanks shown as underlines (______) or boxes (☐) clearly distinct from surrounding text. Space around blanks to make them obvious.
- **Word bank layout**: Horizontal row of word tiles below the passage. Each tile is a large, tappable button (48×48px minimum). Use subtle background color to distinguish from regular text.
- **Placement interaction**: Tap a word tile, then tap a blank to place it. Or drag a word tile to a blank. Both interactions should be intuitive and responsive.
- **Feedback**: Word snaps into blank with a smooth animation (0.3s). Correct placement: checkmark briefly appears, word remains in blank. Incorrect: word shakes (100ms vibration) and returns to bank; learner can try again.
- **Used words**: Words that are placed may gray-out or remain visible in the bank (learner preference or setting). For young learners, placing a word usually removes it from the bank to reduce visual clutter.
- **Progress**: Show "3 / 5 blanks filled" or similar counter.
- **Keyboard support** (desktop): Tab through blanks, use arrow keys to select words in bank, Enter to place.

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | 1 blank maximum, 2-3 words in bank. Very short, simple sentence (8-12 words) with obvious context clues. Large text (18-20pt). Large blanks (shown as big underlines). Large word tiles (60×50px). Tap-to-fill interaction (tap word, tap blank) to minimize drag complexity. Positive feedback ("Great!"). |
| 11–13 | 2 blanks, 4-5 words in bank. Medium-length sentence (15-25 words) with clear context clues. Standard text size (16-18pt). Standard blank size and word tiles (48×48px). Drag or tap interaction both supported. Immediate per-blank feedback. Context clues are helpful but require reading comprehension. |
| 14–16 | 3+ blanks, 6-8 words in bank. Long, complex sentences or multi-sentence passages (25-60 words). Minimal context clues; learners must rely on vocabulary knowledge and syntactic awareness. Small, compact text (14-16pt). Distractors are challenging (synonyms, near-misses, different parts of speech). Drag interaction required. Can include mixed difficulty (some blanks obvious, others subtle) within a single passage. |

## Lesson Placement

**Post-content**: After teaching vocabulary or grammar concepts, cloze sentences reinforce learning by requiring learners to apply knowledge in context.

**Core practice**: For reading comprehension and vocabulary building, cloze sentences are core practice that builds fluency in recognizing words in context.

Not recommended for pure assessment of knowledge—the word bank provides significant scaffolding.

## Related Mechanics

- **Matching Pairs** (id: `matching-pairs`): Similar word-selection logic but items are abstract pairs rather than contextual blanks.
- **Categorization** (id: `categorization`): Similar drag-drop interaction but items are grouped into categories rather than placed into specific blanks.
- **Multiple Choice** (id: `multiple-choice`): Less scaffolded variant where learner selects from options but words are not draggable and context is less prominent.
