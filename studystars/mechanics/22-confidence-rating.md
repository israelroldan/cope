# Confidence Rating (Metacognitive)

> After answering any question, learners rate how confident they are; points are multiplied by confidence level, making correct + confident answers worth the most and encouraging honest self-assessment.

## Core Mechanic

This mechanic is an overlay, not a standalone activity. It sits on top of any other mechanic (multiple choice, true-false, open-ended, etc.). After the learner submits an answer, a secondary prompt appears: "How sure are you?" with 2–3 confidence options. For ages 8–10, the options are emoji-based (😊 Sure / 😕 Not Sure). For ages 11–16, they're text-based (Low, Medium, High).

The learner taps their confidence level. Immediately, the scoring engine multiplies the base score by a multiplier tied to that confidence level. For example:
- Correct + High confidence = base score × 2.0 = maximum points.
- Correct + Low confidence = base score × 1.0 = full credit but no bonus.
- Wrong + High confidence = base score × 0 × 2.0 = zero points AND a "learning moment" feedback.
- Wrong + Low confidence = base score × 0 × 1.0 = zero points, but with encouraging feedback.

Feedback immediately follows, acknowledging the learner's accuracy and confidence calibration.

## Why It Works

**Confidence rating is a metacognitive skill (Bloom Level 5).** It asks learners to evaluate not just their answer, but their own certainty. This builds self-awareness and honest self-assessment—critical for lifelong learning.

**The scoring multiplier incentivizes honest introspection.** If learners always select "High" regardless of actual confidence, the multiplier system eventually punishes overconfidence (wrong + high = zero points, not bonus). This teaches learners to be honest and calibrated. Over time, learners learn: "I should only say 'High' when I truly am confident."

**Confidence-correct mismatches are teaching moments.** If a learner answers incorrectly but rates confidence as low, the feedback can be encouraging ("You wisely doubted yourself; here's the correct answer."). If they answer incorrectly but rate confidence as high, the feedback is a gentle nudge ("This was tricky; overconfidence happens to everyone.").

**Desirable difficulty paired with calibration.** Confidence ratings make the learning experience more dynamic: easier questions paired with high confidence are rewarding; harder questions where learners admit doubt encourage growth mindset.

## Content Generation Spec

This mechanic has almost no AI content generation. It's a pure wrapper:

1. The base question content comes from any other mechanic (e.g., multiple choice, true-false).
2. Define **confidenceLevels**: an array of 2–3 options. Ages 8–10: ['Sure', 'Not Sure'] or ['😊 Sure', '😕 Not Sure']. Ages 11–16: ['Low', 'Medium', 'High'].
3. Define **scoringMultiplier**: a mapping of each level to a multiplier. Example: {'Low': 1.0, 'Medium': 1.5, 'High': 2.0}.
4. The system computes: final score = base score × (1 if wrong, else 1) × multiplier.

### Example Output (Overlay on a Multiple-Choice Question)

```json
{
  "baseQuestion": {
    "type": "multiple-choice",
    "prompt": "What is the capital of France?",
    "options": ["London", "Paris", "Berlin", "Madrid"],
    "correctIndex": 1,
    "explanation": "Paris is the capital and largest city of France."
  },
  "confidenceLevels": ["Low", "Medium", "High"],
  "scoringMultiplier": {
    "Low": 1.0,
    "Medium": 1.5,
    "High": 2.0
  }
}
```

## UX Considerations

- **Post-answer timing:** The confidence prompt should appear immediately after the learner submits their answer, but before the explanation (if any). This preserves honesty; learners answer first, then commit to confidence.
- **Clear labeling:** Use language that's age-appropriate ("Sure / Not Sure" for young learners, "Low / Medium / High" for older ones).
- **Emoji for young learners:** Pairing emoji with text reduces reading load and adds personality. 😊 for sure, 😕 for not sure.
- **Horizontal layout:** Confidence options should be arranged horizontally (not vertically) for quick scanning and selection.
- **Tap feedback:** When the learner taps a confidence level, it should highlight, scale, or change color to confirm selection.
- **Immediate score reveal:** After tapping confidence, show the new score calculation (e.g., "Base score: 10 × Confidence multiplier: 2.0 = 20 points").
- **Encouraging language:** Feedback should reinforce honest self-assessment, not punish overconfidence. "You were overconfident, but that's a learning opportunity!" rather than "You failed."

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | Two emoji-based levels: 😊 Sure / 😕 Not Sure. Large, colorful emoji buttons (48x48px+). Multiplier: Sure = 2x points, Not Sure = 1x points. Positive, celebratory feedback: "You were sure and got it right! Awesome!" or "You weren't sure, and that's smart on a tricky question." No calibration graph; keep feedback immediate and fun. |
| 11–13 | Three text levels: Low, Medium, High. Clear, neutral emoji options (e.g., 😐 Low, 🤔 Medium, 😊 High) alongside text. Multiplier: Low = 1x, Medium = 1.5x, High = 2x. Feedback includes brief reflection on calibration: "You got it right and were confident—great!" or "You weren't sure, and here's why...". Optional: simple counter showing "correct confident" vs. "correct uncertain" over a few questions. |
| 14–16 | Three levels with detailed calibration feedback. Multiplier: Low = 1x, Medium = 1.5x, High = 2x. After 3–5 questions, show a calibration graph plotting confidence vs. accuracy (e.g., "You were confident 80% of the time and correct 85%—excellent calibration!" or "You were often confident but right only 60%—consider being more cautious."). This metacognitive feedback helps learners become aware of their own knowledge gaps and builds self-regulation. |

## Lesson Placement

Confidence ratings work best in **Core Practice** and **Deep Engagement** phases, where assessment is frequent and learners benefit from calibration feedback. Also valuable in **Reflection** to encourage metacognition.

Can be used throughout a lesson to build learner awareness of their own understanding.

Avoid in **Hook** (too early to assess confidence) or in very short lessons where there's no time for calibration to develop.

## Related Mechanics

- **22-confidence-rating:** This mechanic.
- **01-multiple-choice, 02-true-false, 23-open-ended:** Any question type can have a confidence rating overlay.
- **21-poll:** Similar spirit (no right answer), but focused on opinion rather than confidence in a factual answer.
