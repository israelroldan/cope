# Numerical Estimation/Slider

> Move a slider along a scale or type a number to estimate a value. Proximity to the correct value determines partial credit.

## Core Mechanic

The learner sees a question asking for a numerical estimate (e.g., "In what year was the Eiffel Tower built?" or "What is the population of Brazil in millions?"). Below the question is a horizontal slider with a draggable thumb. The slider's range is defined by min and max values (e.g., 1800–2000 for a year, 100–300 for millions).

As the learner drags the thumb, a number appears above or inside it, showing their current guess. At the left and right ends of the slider are labels showing the min and max values, and sometimes intermediate marks (25%, 50%, 75%) for reference. Once the learner is satisfied with their estimate, they tap "Check" or release the slider to submit.

The system immediately calculates the distance between the learner's answer and the correct value. If they're within the acceptable range (e.g., ±10 years), they earn full points. If they're close but outside that range, they earn partial credit proportional to how close they got. The feedback shows the correct answer, the learner's answer, and an explanation.

Optionally, for older learners, a numeric input field below the slider allows direct typing for precise entry, combining the tactile slider with precise control.

## Why It Works

**Estimation as a Skill**: Estimation is a crucial real-world skill that goes beyond memorized facts. This mechanic builds "number sense" and the ability to make educated guesses based on scale and context.

**Partial Credit Motivation**: Unlike binary (right/wrong) tasks, proximity-based scoring feels fairer and more motivating. Learners who are "almost right" see that effort is rewarded, encouraging persistence.

**Cognitive Anchoring**: Sliders create visual anchors. The min/max bounds provide reference points, helping learners calibrate their estimates. A learner might not know exactly when the Eiffel Tower was built, but they can reason: "It's probably between the Industrial Revolution (1850) and World War II (1945)."

**Tangible Feedback**: The immediate numeric feedback (showing both the learner's answer and correct value) provides clear calibration. Repeated exposure to slider questions improves learners' ability to estimate similar values in the future.

## Content Generation Spec

The AI must generate:
1. A clear question requesting a numerical estimate
2. The correct value
3. A reasonable range for the slider (min/max)
4. A margin of error (acceptable range) based on the difficulty
5. An explanation of the correct answer and its context

Guidelines:
- **Range Selection**: The range should be wide enough to feel challenging but not so wide that the correct answer is a needle in a haystack. Typically 2–3x the correct value on either side.
- **Acceptable Range**: For easier questions, ±20%. For harder questions, ±5–10% of the correct value.
- **Units**: Include units (years, kilometers, millions, etc.) in both the question and the feedback.

### Example Output

```json
{
  "prompt": "In what year was the Eiffel Tower completed and first opened to the public?",
  "correctValue": 1889,
  "minValue": 1800,
  "maxValue": 1950,
  "unit": "year",
  "acceptableRange": 5,
  "explanation": "The Eiffel Tower was completed in 1889 for the Exposition Universelle (World's Fair) in Paris. It was designed by Gustave Eiffel and initially intended to be temporary. It has since become one of the most iconic structures in the world.",
  "precision": 0
}
```

## UX Considerations

- **Slider Thumb**: 48×48px or larger, with clear visual focus state and label showing current value.
- **Range Labels**: Min and max values displayed at slider ends in smaller text.
- **Tick Marks**: For complex ranges, show intermediate marks (e.g., 25%, 50%, 75%) with subtle tick lines.
- **Value Display**: Current value displays above the thumb in real time, updating smoothly as the learner drags (no lag).
- **Optional Input Field**: Below the slider, a text input field allows learners to type precise values directly. Helpful for older learners or when fine-tuning is needed.
- **Haptic Feedback** (mobile): Optional light vibration when the learner crosses the correct value, subtly guiding without revealing the answer.
- **Submission**: Learner taps "Check" or presses Enter. Immediate feedback appears below.

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | **Small ranges (1–100 or similar)**. Visual number line with clear marks at 0, 25, 50, 75, 100. Wide acceptable range (±25–30). Questions about concrete, measurable quantities (number of legs on a spider, months in a year, number of colors in a rainbow). Explanation is simple and ties to real-world experience. |
| 11–13 | **Moderate ranges (1–2,000+)**. Slider marked every 250–500 units for easy reference. Standard acceptable range (±10–15). Questions about measurements, populations, dates, and distances (e.g., "Distance from New York to London in kilometers?"). Explanation includes context and reference points. |
| 14–16 | **Large, precise ranges (1–100,000+)**. Fine-grained slider with optional numeric input field for direct entry. Tight acceptable range (±5–10, or ±5%). Questions are more abstract and data-driven (stock market values, scientific measurements, historical statistics). Explanation includes derivations, comparisons, or derived calculations. Leaderboard shows closest estimates. |

## Lesson Placement

**Core Practice**: Use numerical sliders to reinforce facts and build number sense. They work well for teaching historical dates, geographic distances, scientific measurements, and demographic data.

**Deep Engagement**: Combine sliders with Scenario-Based questions (mechanic 15). Example: "Based on this paragraph about climate data, estimate the temperature increase by 2050." This ties estimation to comprehension.

**Real-World Application**: Sliders can introduce estimation frameworks. After a few slider questions on related topics (e.g., planetary distances), discuss with learners the reasoning patterns they used.

## Related Mechanics

- **Multiple Choice (Mechanic 4)**: A simpler alternative for younger learners. Use MC first to teach the correct answer, then slider later for estimation.
- **Short Answer / Free Text (Mechanic 11)**: Can be combined—slider for rough estimate, then text input for explanation (e.g., "Estimate the year, then explain why you chose that range").
- **Numerical Input (if mechanic exists)**: A variant where learners type the number directly instead of using a slider. Less tangible feedback, but faster for learners comfortable with typing.
