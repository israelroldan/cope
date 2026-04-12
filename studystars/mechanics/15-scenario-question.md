# Scenario-Based Question

> Read a short passage or watch content, then answer embedded comprehension questions. Tests understanding of presented material.

## Core Mechanic

The learner is presented with a short narrative, procedural explanation, or descriptive passage (50–150 words). The passage might describe a historical event, explain a scientific process, present a social scenario, or tell a brief story. As they read, they encounter one or more comprehension questions embedded within or immediately following the text.

The questions prompt learners to recall facts, make inferences, identify cause-and-effect relationships, or apply concepts described in the passage. Each question is presented with 2–4 multiple-choice options. The learner taps their answer, and feedback appears immediately, showing whether they were correct and explaining the connection between the answer and the passage.

The format is modular: questions can appear after a block of text, or they can interrupt the passage mid-way ("passage → question → more passage → question"). This keeps learners engaged in active reading rather than passive consumption.

## Why It Works

**Active Reading & Comprehension Monitoring**: By stopping to answer questions, learners actively process the passage rather than skimming passively. This retrieval practice strengthens encoding and helps learners monitor their own understanding (metacognition).

**Contextual Learning**: Knowledge is anchored to realistic scenarios or narratives, making it more memorable and transferable than isolated facts. Learning "photosynthesis produces glucose" in the context of a plant's survival needs is more meaningful than as a bare fact.

**Inference Building**: Well-designed comprehension questions go beyond literal recall to test inference, cause-and-effect, and prediction. These higher-order thinking skills are more valuable and more aligned with real-world comprehension demands.

**Immediate Clarification**: Embedded questions provide a checkpoint. If a learner misunderstands a passage midway, they discover it immediately and can re-read, clarify, and move forward with accurate knowledge.

## Content Generation Spec

The AI must generate:
1. A coherent narrative or explanatory passage (50–150 words depending on age)
2. 1–4 comprehension questions targeting understanding
3. 2–4 answer options per question
4. Explanations that reference the passage explicitly

Quality guidelines:
- **Passage Coherence**: The passage should stand alone as a complete unit. No external knowledge should be required to answer questions.
- **Question Alignment**: Questions should target stated or implied information in the passage, not require external knowledge.
- **Distractor Plausibility**: Wrong answers should be plausible enough to require careful reading, but clearly incorrect to attentive readers.
- **Explanation Quality**: Explanations should quote or paraphrase the passage, showing why the correct answer follows from the text.

### Example Output

```json
{
  "passage": "The Amazon rainforest plays a critical role in Earth's climate. Trees absorb carbon dioxide during photosynthesis and store it in their wood and leaves, helping regulate atmospheric CO₂ levels. When forests are cleared for farming or development, this stored carbon is released back into the atmosphere, accelerating climate change. Additionally, rainforests produce about 20% of the world's oxygen. They also support millions of species and influence regional rainfall patterns. Protecting the Amazon is therefore essential not just for biodiversity, but for global climate stability.",
  "questions": [
    {
      "question": "Why is protecting the Amazon rainforest important for climate stability?",
      "options": [
        "Because trees absorb carbon dioxide and store it, preventing its release into the atmosphere",
        "Because the Amazon is the only source of oxygen on Earth",
        "Because rainforests are located at the equator",
        "Because animals in the rainforest help humans by filtering air"
      ],
      "correctIndex": 0,
      "explanation": "The passage explains that trees absorb carbon dioxide through photosynthesis and store it in their wood and leaves. When forests are cleared, this stored carbon is released, accelerating climate change. Protecting forests keeps carbon stored and out of the atmosphere.",
      "distractorNotes": "Option 1 overstates the role (Amazon provides ~20% of oxygen, not all). Option 2 is geographically inaccurate. Option 3 is tangential."
    },
    {
      "question": "What happens when the Amazon rainforest is cleared?",
      "options": [
        "Carbon stored in trees is released into the atmosphere",
        "Rainfall decreases in tropical regions",
        "Millions of species are protected",
        "Atmospheric oxygen levels increase significantly"
      ],
      "correctIndex": 0,
      "explanation": "The passage states: 'When forests are cleared for farming or development, this stored carbon is released back into the atmosphere, accelerating climate change.'",
      "distractorNotes": "Option 1 is mentioned as a consequence but is secondary to carbon release. Option 2 references rainfall but is not explicitly stated. Option 3 is the opposite of what happens."
    }
  ],
  "context": "science: climate and ecosystems"
}
```

## UX Considerations

- **Passage Display**: Clean, readable typography with adequate line spacing (1.5x). On mobile, text wraps naturally and is left-aligned.
- **Question Presentation**: Questions appear with clear visual separation from the passage (white space, subtle background, or border). Each question is preceded by a number ("1.", "2.") for clarity.
- **Answer Options**: Displayed as large, tappable buttons (minimum 48×48px). Options are stacked vertically. Correct and incorrect answers are visually distinct after submission (correct = green checkmark or highlight, incorrect = red outline or strike-through).
- **Feedback Timing**: After tapping an answer, a brief visual confirmation appears (check or X). The explanation slides or fades in below the question.
- **Navigation**: "Next" button allows progression to the next question or lesson element. Optional "Re-read" button allows returning to the passage.
- **Progress Indicator**: Display "Question 1 of 3" or similar to show where the learner is in the set.

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | **Short passage (50 words) with simple narrative** (e.g., a short story about animals, a simple cause-and-effect scenario). **1–2 literal comprehension questions** (recall facts directly stated). **2 answer options** to reduce cognitive load. Simple vocabulary; no complex inference required. Explanation uses everyday language and directly quotes the passage. |
| 11–13 | **Passage (100 words) with moderate complexity** (e.g., explanation of a historical event, scientific process, social situation). **2–3 questions targeting recall, inference, and simple cause-and-effect**. **3 answer options**. Standard vocabulary with occasional academic terms explained contextually. Explanation paraphrases the passage and explicitly connects answer to text. |
| 14–16 | **Longer, complex passage (150 words) with sophisticated language** (e.g., nuanced explanation of a historical turning point, complex scientific mechanism, ethical dilemma). **3–4 questions targeting inference, vocabulary in context, implicit meaning, and analysis**. **3–4 answer options**. Advanced vocabulary; no context clues provided. Explanation may reference unstated but implied information, drawing connections to broader concepts. |

## Lesson Placement

**Core Practice**: Use scenario-based questions immediately after introducing new content. They serve as guided application and comprehension check.

**Deep Engagement**: Combine with other mechanics. Example sequence: Read scenario → Answer questions → Complete a related spatial hotspot task (identify locations mentioned in the scenario) or labeling task (apply concepts from the scenario).

**Spaced Review**: Re-present similar scenarios with related but slightly different questions weeks later to reinforce long-term retention.

## Related Mechanics

- **Multiple Choice (Mechanic 4)**: Scenario questions build on MC by adding context. Use MC first for isolated facts, then scenario questions for contextual understanding.
- **Fill-in-the-Blank (Mechanics 6 & 11)**: Can follow a scenario. Example: "Based on the passage, the capital of [country] is _____."
- **Matching Pairs (Mechanic 8)**: Can precede scenarios. Example: Teach facts via matching, then apply them in a scenario comprehension task.
- **Sequence Reordering (Mechanic 9)**: Combine scenario reading with reordering events described in the passage.
