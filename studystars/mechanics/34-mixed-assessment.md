# Mixed Assessment

> A mini-quiz of 2-6 questions drawn from different mechanic types. Each question uses a different interaction pattern, testing the same topic from multiple angles.

## Core Mechanic

The learner is presented with a short sequence of questions, each rendered as a different sub-mechanic. Question 1 might be True/False, question 2 a Sequence Reorder, question 3 a Fill-in-Blank, question 4 a Matching Pairs. Each question renders the sub-mechanic's native UI — the kid doesn't see a "quiz wrapper," they see the actual interaction they've used before, just in a continuous flow with a progress bar.

After each question, immediate feedback shows (correct/incorrect + explanation). The assessment auto-advances to the next question after a brief pause. At the end, a summary screen shows the overall score and per-question results.

### How it differs from other wrappers

| | Mixed Assessment (#34) | Speed Challenge (#26) | Boss Battle (#28) | Scenario (#15) |
|---|---|---|---|---|
| **Time pressure** | None | Core (countdown) | Optional | None |
| **Sub-mechanic variety** | Different mechanic per question | Same mechanic repeated | Same mechanic with narrative | MC only |
| **Narrative wrapper** | None (clean quiz) | None (pure speed) | Boss health bar + story | Passage + embedded questions |
| **Scoring** | Partial credit, per-question | Speed-weighted | Damage-to-boss | Partial credit |
| **Primary use** | Recap, review, checkpoint | Fluency drill | Engagement gamification | Comprehension check |

The key differentiator: Mixed Assessment tests a topic from **multiple angles** by varying the interaction type. This forces deeper processing — recognizing a fact in True/False is different from reconstructing it in Sequence Reorder or recalling it in Fill-in-Blank.

## Why It Works

**Varied Retrieval Practice**: Testing the same knowledge through different interaction types strengthens memory more than repeating the same format. Research on "desirable difficulties" shows that varying the retrieval context (drag vs. tap vs. type) forces the brain to build more flexible, transferable knowledge representations.

**Interleaving Effect**: Mixing question types within a single assessment creates an interleaving effect. The learner can't settle into a single cognitive mode — they must re-orient for each question, which increases encoding depth.

**Comprehensive Coverage**: A single True/False can only test one fact. A mixed set of 4 questions can test 4 different facts using 4 different cognitive demands (recognition, ordering, recall, classification). This gives a much richer comprehension signal in the same time budget.

**Assessment Validity**: In psychometrics, testing the same construct through multiple methods (multi-trait multi-method) gives a more reliable signal than repeated single-method testing. A kid who gets the MC right but can't reorder the sequence has a different understanding than one who aces both.

## Eligible Sub-Mechanics

The following mechanics can appear as questions inside a Mixed Assessment. The filter: can it work as a standalone "question" that takes 10-30 seconds and produces a clear score?

### Eligible (~20 mechanics)

| # | Mechanic | Interaction | Why it works as a sub-question |
|---|----------|-------------|-------------------------------|
| 1 | True/False | Tap | Fast binary check, 5-10s |
| 2 | Fill-in-Blank | Type | Recall, 10-20s |
| 3 | Multiple Choice | Tap | Recognition, 10-15s |
| 4 | Flashcard | Flip + self-assess | Self-paced recall, 10-15s |
| 5 | Image Recognition | Tap | Visual identification, 10-15s |
| 6 | Matching Pairs | Tap/drag | Relational, 15-30s (limit to 3-4 pairs) |
| 8 | Word Builder | Type/drag | Spelling + recall, 10-20s |
| 9 | Sequence Reorder | Drag | Ordering, 15-30s (limit to 3-4 items) |
| 10 | Timeline | Drag | Temporal ordering, 15-30s |
| 11 | Categorization | Drag | Classification, 15-30s (limit to 4-6 items, 2 categories) |
| 12 | Numerical Slider | Slide | Estimation, 10-15s |
| 13 | Labeling | Tap on image | Spatial identification, 10-20s |
| 15 | Scenario Question | Read + tap | Comprehension, 30-60s (1 question only) |
| 16 | Odd-One-Out | Tap | Pattern recognition, 10-15s |
| 17 | Find-the-Error | Tap | Critical analysis, 15-20s |
| 18 | Cause-Effect | Tap/drag | Relational reasoning, 15-25s |
| 19 | Hot Text | Tap | Textual identification, 10-20s |
| 20 | Ranking | Drag | Evaluative ordering, 15-25s (limit to 3-4 items) |
| 21 | Pros-Cons | Drag | Evaluative classification, 15-25s |
| 32 | Comparison Table | Tap/type | Analytical comparison, 20-30s |

### Excluded

| # | Mechanic | Why excluded |
|---|----------|-------------|
| 22 | Poll | Reflection, not assessment (no correct answer) |
| 23 | Open-Ended | Requires Pimpi evaluator, too heavyweight for a sub-question |
| 24 | Creative Draw | Creative expression, no clear score |
| 25 | Debate Prompt | Discussion-based, no clear score |
| 26 | Speed Challenge | Is itself a wrapper |
| 27 | Streak Run | Is itself a wrapper |
| 28 | Boss Battle | Is itself a wrapper |
| 29 | Leaderboard Sprint | Multiplayer wrapper |
| 30 | Mystery Reveal | Narrative wrapper |
| 31 | Story Builder | Creative, no clear score |
| 33 | Content Slideshow | Content delivery, not assessment |
| 34 | Mixed Assessment | No nesting — a mixed assessment cannot contain another mixed assessment |

### Sub-mechanic constraints

When a mechanic appears inside a Mixed Assessment, it may need to be **constrained** to fit the quick-question format:

- **Matching Pairs**: Max 3-4 pairs (not the full 6-12)
- **Sequence Reorder**: Max 3-4 items (not 6)
- **Ranking**: Max 3-4 items
- **Categorization**: Max 4-6 items across 2 categories (not 3-4 categories)
- **Scenario Question**: Max 1 embedded question (not 4)
- **Flashcard**: Count as 1 question but use the self-assessed format (flip → "Did I get it right?")

The Spark generator (or recap generator) should respect these constraints when composing a Mixed Assessment.

## Content Generation Spec

The AI generates a Mixed Assessment by:

1. Selecting 2-6 facts from the source material (fact sheet or review pool)
2. For each fact, choosing the best-fit mechanic based on the fact's `seedTypes`
3. Generating content conforming to that mechanic's `contentSchema`
4. Ensuring mechanic variety — no two consecutive questions should use the same interaction type

### Mechanic Selection Rules

1. **Vary interaction types**: Don't put two tap-based mechanics back-to-back. Alternate between tap, drag, type, slide.
2. **Match seedTypes**: Only use a mechanic if the fact's `seedTypes` support it (e.g., a date fact → sequence-reorder or timeline, a definition → fill-in-blank or matching-pairs).
3. **Bloom's progression optional**: For review/recap, Bloom's doesn't need to ascend — mix freely. For warm-up assessments, starting easy (Remember) and escalating is nice but not required.
4. **Respect constraints**: Apply the sub-mechanic constraints above (e.g., max 4 pairs for matching).
5. **Respect age**: Check each sub-mechanic's `ageAdaptations` for the target age group.

### Example Output

```json
{
  "title": "Mummification Recap",
  "questions": [
    {
      "mechanicId": "true-false",
      "content": {
        "statement": "The mummification process took 70 days to complete.",
        "isTrue": true,
        "explanation": "Ancient Egyptian mummification was a lengthy ritual that required exactly 70 days from start to finish."
      },
      "_factRefs": ["f3"]
    },
    {
      "mechanicId": "sequence-reorder",
      "content": {
        "prompt": "Put the mummification steps in order:",
        "items": [
          { "label": "Organ removal", "text": "Internal organs were removed and placed in canopic jars" },
          { "label": "Natron drying", "text": "The body was packed in natron salt for 40 days" },
          { "label": "Linen wrapping", "text": "The dried body was wrapped in hundreds of meters of linen" }
        ],
        "orderingType": "procedural"
      },
      "_factRefs": ["f4", "f5"]
    },
    {
      "mechanicId": "multiple-choice",
      "content": {
        "question": "Which organ did the ancient Egyptians leave inside the body during mummification?",
        "options": ["Brain", "Heart", "Liver", "Lungs"],
        "correctIndex": 1,
        "explanation": "The Egyptians believed the heart was the seat of intelligence and would be weighed in the afterlife, so they left it in place.",
        "difficulty": "medium"
      },
      "_factRefs": ["f6"]
    },
    {
      "mechanicId": "numerical-slider",
      "content": {
        "prompt": "How many meters of linen were typically used to wrap a single mummy?",
        "correctValue": 450,
        "minValue": 50,
        "maxValue": 1000,
        "unit": "meters",
        "acceptableRange": 100,
        "explanation": "Archaeologists estimate that wrapping a single mummy required around 450 meters (nearly 1,500 feet) of linen strips."
      },
      "_factRefs": ["f5"]
    }
  ],
  "showProgress": true,
  "shuffleOrder": false
}
```

## UX Considerations

### Question Flow
- One question at a time, full-screen
- Progress bar at top: thin orange line showing completion (e.g., 2/4)
- Optional "Question 2 of 4" text below progress bar
- Each question renders its sub-mechanic's native UI — the kid interacts exactly as they would with the standalone mechanic
- After submitting an answer: feedback overlay (correct/incorrect) shows for 1.5s, then auto-advances to next question

### Transitions
- Questions slide in from right (same as content-slideshow navigation)
- Feedback overlay fades in/out
- Summary screen scales in from center

### Summary Screen
- Shows after the last question's feedback
- Total score: "3 out of 4" or "75%" depending on age group
- Per-question mini-review: small icon for each question (green check / red X) with the mechanic type label
- "Done" button returns to the calling context (Spark player, review session, etc.)
- For ages 8-10: stars or emoji rating instead of percentage. "Great job! ⭐⭐⭐" for 3/4.
- For ages 14-16: percentage + option to expand each question and re-read the explanation

### No Back Navigation
- Kids cannot go back to previous questions (prevents "peek and fix" which undermines assessment validity)
- This is intentional — each question is a one-shot attempt

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8-10 | **2-3 questions max**. Only simple mechanics: true-false, multiple-choice, numerical-slider, matching-pairs (3 pairs). Large touch targets. Big encouraging feedback ("Awesome!" / "Nice try!") between questions. Summary uses stars (⭐) not percentages. No question counter text — just the progress bar. |
| 11-13 | **3-5 questions**. Full range of simple + moderate mechanics. Can include sequence-reorder, categorization, fill-in-blank. Standard feedback with brief explanation. Summary shows "3 of 5" and per-question icons. |
| 14-16 | **4-6 questions**. Full range of eligible mechanics including ranking, cause-effect, comparison-table. Concise feedback. Summary shows percentage, per-question breakdown with expandable explanations, and "Review missed topics" link. |

## Lesson Placement

**Spaced Review**: The primary use case. Days or weeks after a Spark, resurface key facts through a Mixed Assessment. The variety of mechanics prevents the staleness of repeated MC quizzes.

**Warm-up**: At the start of a new Spark in a series, a 2-3 question Mixed Assessment recaps yesterday's Spark before introducing new content.

**Extension**: After a Spark, as an optional "test yourself" activity for kids who want more practice.

**NOT in the core Spark flow**: Mixed Assessment is a standalone activity, not part of the interleaved Spark sequence. The Spark flow uses individual mechanics paired with content slideshows. Mixed Assessment lives in the review/recap layer above.

## Related Mechanics

- **Speed Challenge (#26)**: Both wrap sub-mechanics, but Speed Challenge adds time pressure and repeats the SAME mechanic. Mixed Assessment has no time pressure and varies mechanics.
- **Boss Battle (#28)**: Both present a series of questions, but Boss Battle adds narrative (boss health bar, damage). Mixed Assessment is a clean, no-frills quiz.
- **Scenario Question (#15)**: Both test comprehension, but Scenario bundles its own passage. Mixed Assessment assumes the kid has already learned the content and is being assessed on recall.
- **Content Slideshow (#33)**: Natural pairing — a recap flow might be: brief Content Slideshow refresher → Mixed Assessment.
