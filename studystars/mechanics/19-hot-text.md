# Hot Text (Textual Analysis)

> Learners read a passage and tap to highlight specific words, phrases, or sentences that answer an analytical question, practicing close reading and evidence identification.

## Core Mechanic

The screen displays a passage of text (50–500 words depending on age) and a prompt asking learners to identify specific segments. The prompt is clear and analytical, such as "Highlight the sentence that explains why volcanoes erupt" or "Select the phrase that shows the character's emotion." The learner taps on a word or phrase; it highlights (typically with a color overlay or border). The learner can tap multiple segments if the prompt allows (e.g., "Highlight ALL the adjectives that describe the sunset"). After tapping, the app provides immediate feedback: correct segments glow green, incorrect selections fade or are marked as not required, and a detailed explanation appears below or in a modal, explaining why those segments are the right answer.

The interaction is tap-and-release (no dragging). Some implementations allow swipe-to-select a range, but the simplest version uses discrete tap targets (words or short phrases).

## Why It Works

**Close reading and evidence identification are analytical skills (Bloom Level 4).** Rather than picking from options or recalling facts, learners must examine text, understand its structure, and extract relevant segments. This builds reading comprehension and the ability to support claims with evidence—critical skills in all subjects.

**Highlighting is tactile and memorable.** The act of selecting and seeing text light up creates a dopamine-rewarding feedback loop. Learners *feel* like they're doing detective work, marking up a text like real scholars and students do.

**Partial credit accommodates nuance.** Text passages often have multiple defensible correct answers. Scoring partial credit (per segment) allows learners to succeed even if they don't catch every nuance, while still encouraging precision.

## Content Generation Spec

The AI must produce:
1. A **passage** that is well-written, contextually rich, and appropriate to the age/topic.
2. A **prompt** that asks learners to identify segments (clearly specifying what they're looking for: a sentence, a phrase, evidence of emotion, etc.).
3. **correctSegments** array with precise start/end character indices for each correct segment. This requires the AI to mark character positions accurately.
4. An **explanation** that articulates why the identified segments are correct and how they answer the prompt.

The AI should ensure passages are rich enough to allow for meaningful analysis but not so long that learners lose focus. Segment indices must be exact; even a one-character offset breaks the highlight.

### Example Output

```json
{
  "passage": "The Amazon rainforest, often called the 'lungs of the Earth,' covers approximately 5.5 million square kilometers across nine countries. It produces roughly 20% of the world's oxygen and absorbs massive quantities of carbon dioxide, making it critical for regulating global climate. However, deforestation driven by logging, cattle ranching, and agricultural expansion threatens this vital ecosystem at an alarming rate. Scientists warn that if deforestation continues, the rainforest could reach a 'tipping point' where it can no longer sustain itself, transforming from a carbon sink into a carbon source.",
  "prompt": "Highlight the sentence that explains why the Amazon rainforest is important to the planet.",
  "correctSegments": [
    {
      "startIndex": 161,
      "endIndex": 274,
      "text": "It produces roughly 20% of the world's oxygen and absorbs massive quantities of carbon dioxide, making it critical for regulating global climate."
    }
  ],
  "explanation": "This sentence directly explains the rainforest's importance: it produces oxygen (essential for life) and absorbs carbon dioxide (regulates climate). While the first sentence mentions it's called the 'lungs of the Earth,' that's a metaphor. The second sentence makes the importance explicit and factual."
}
```

## UX Considerations

- **Readable font size:** Minimum 14px for ages 11+, 16px+ for ages 8–10. Ensure high contrast (dark text on light background).
- **Tap target precision:** Words should be independently tappable. If the passage is long, consider breaking it into sentences or short blocks, each with a subtle border or background to define tap zones.
- **Highlight color:** Use a bright, distinct color (e.g., yellow highlight or teal background) that stands out but doesn't strain eyes. Ensure it passes WCAG contrast ratios.
- **Multi-segment workflow:** If multiple segments are correct, visual feedback should be clear (e.g., "2 of 3 correct" counter, or a checklist of required segments).
- **Mobile readability:** On small screens, increase line-height to at least 1.5x. Ensure text reflows properly. Consider a "make text larger" option for accessibility.
- **Animation:** Highlighting should appear instantly or within 200ms. Explanation should fade in smoothly (not jarring).

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | Short passage (50–100 words). Single, obvious correct segment (a full sentence). Prompt is very explicit and concrete ('Highlight the sentence about...', 'Tap the word that means...'). Large font (16px+). Topics are simple and familiar. Instant, celebratory feedback on success. |
| 11–13 | Longer passage (150–250 words). 1–2 correct segments; may require identifying a phrase within a sentence or reasoning across sentences. Prompt includes inference ('Highlight the part that shows...', 'Select the evidence that...'). Medium font (14px). Topics are more complex (history, science, literature). Feedback includes brief explanation of why the segment is correct. |
| 14–16 | Complex passage (300–500 words, possibly excerpts from real texts). 2–3 correct segments. Prompt is analytical and demanding ('Highlight all the evidence supporting the author's argument', 'Select the phrases that reveal the speaker's bias'). Standard font (12–14px). Topics are abstract (literary analysis, historical interpretation, scientific argumentation). Feedback includes deeper explanation and may prompt reflection on alternative interpretations. |

## Lesson Placement

This mechanic works best in **Core Practice** or **Deep Engagement**, after content (text, lecture) has been introduced. It reinforces close reading and evidence identification taught in language arts, social studies, or literature classes.

Can also work in **Spaced Review** as a final check on comprehension or to practice analyzing a new passage on a familiar topic.

Avoid in **Hook** (requires prior context) or early **Post-Content** (better to summarize content first).

## Related Mechanics

- **01-multiple-choice:** Similar selection-based interaction, but learner picks from options rather than identifying in-text.
- **17-find-the-error:** Also at Bloom Level 4, but focuses on spotting errors rather than supporting evidence.
- **23-open-ended:** Learner types their own response rather than highlighting. Both assess understanding, but hot-text scaffolds with a bounded passage.
