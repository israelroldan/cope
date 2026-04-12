# Poll / Opinion Vote

> Learners vote on an opinion question with no correct answer; results are visualized as a chart or word cloud, fostering reflection and peer awareness.

## Core Mechanic

The screen displays an opinion prompt (e.g., "Which invention changed the world most?" or "What surprised you today?") and a set of options. The learner taps an option to vote. Immediately, the vote is recorded and the app transitions to a results view: a bar chart, pie chart, or word cloud showing how other learners (and the class as a whole) voted. The visualization updates in real-time as more learners vote, or it reveals all results at once after the learner votes (depending on implementation).

For open-ended variants (ages 14–16), instead of predefined options, learners type a short response (1–10 words), and results are aggregated into a word cloud where larger words indicate more popular responses.

The interaction is frictionless: a single tap to vote, instant gratification via results visualization.

## Why It Works

**Polls invite evaluative thinking without grading pressure.** At Bloom Level 5 (Evaluate), learners make judgments about opinions and values. Polls ask "What do you think?" not "What is correct?" This lowers anxiety and encourages honest reflection.

**Peer visibility builds community and awareness.** Seeing how others voted—or how many people agree with you—creates a sense of shared learning. Learners realize their peers have diverse perspectives, building empathy and critical thinking about diverse viewpoints.

**Results visualization is engaging and memorable.** A bar chart or word cloud is more interesting than a simple scoreboard. The visual feedback loop (vote → see results grow) is satisfying and addictive, especially for younger learners.

**Polls reduce grading burden and enable reflection.** Unlike objective questions, polls don't need to be graded. Teachers can use results to spark class discussion: "I see many of you chose X; why do you think that is?"

## Content Generation Spec

The AI must produce:
1. A **prompt** that frames an opinion question clearly.
2. **options** array (for closed variant): 3–5 response options that represent different viewpoints or preferences.
3. A **displayType** enum: "bar-chart", "pie-chart", or "word-cloud".
4. For open-ended variants, omit options and specify "word-cloud" to let learners type responses.

The AI should craft opinion prompts that are thought-provoking but accessible, avoiding polarizing or sensitive topics (unless age and context allow).

### Example Output (Closed Variant)

```json
{
  "prompt": "Which invention has had the biggest impact on human society?",
  "options": [
    "The printing press",
    "The steam engine",
    "The electric light bulb",
    "The internet"
  ],
  "displayType": "bar-chart"
}
```

### Example Output (Open-Ended Variant)

```json
{
  "prompt": "In one word or short phrase, what is the most important thing you learned today?",
  "displayType": "word-cloud"
}
```

## UX Considerations

- **Large, tappable options:** Each option should be a card or button with at least 48x48px tap target.
- **Quick feedback:** After the learner votes, show the results immediately or with a brief (0.3–0.5s) animation.
- **Results visualization:** Bar chart is clearest for comparisons. Pie chart works for showing proportion of whole. Word cloud is fun and modern but less precise (hard to compare exact counts).
- **Mobile-friendly charts:** Ensure legends are readable, fonts are large, and bars/segments are distinct colors. Avoid tiny labels or crowded layouts.
- **Live updates (optional):** If showing live results, clearly indicate "updating..." or use subtle animations (bars growing) to show new votes coming in. Avoid overwhelming screen flicker.
- **Open-ended results:** For word clouds, pre-filter spam or nonsense responses. Implement a moderation layer if possible.
- **No pressure:** Ensure the UI conveys there's no "wrong" answer. A neutral, friendly tone in the prompt helps.

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | Fun, lighthearted opinion questions with 3–4 clear options. Topics are personally relevant or whimsical ('What's your favorite animal?', 'Would you rather have wings or gills?', 'Which is the best snack?'). Results shown as simple bar chart with large numbers or emoji icons. Single-step: tap and see results. No open-ended text option (too much cognitive load). |
| 11–13 | More reflective opinion questions tied to the lesson ('Which character made the best choice?', 'What do you think will happen next?', 'Which would be harder: living in ancient Rome or the Renaissance?'). 4–5 options. Results shown as bar chart or pie chart with percentages and counts. Option: include a brief explanation in the poll results (e.g., "65% chose Option A because..."). Encourages learner to think about peers' reasoning. |
| 14–16 | Sophisticated opinion and meta-cognitive questions ('Which of these arguments is most compelling?', 'What is your biggest takeaway from today's lesson?', 'How confident are you in your understanding?'). Often open-ended (word cloud) to allow complex, nuanced responses. Results can include filtering by theme or time. Encourage post-poll discussion: "Why do you think so many chose X?" Learners critically examine the class's collective thinking. |

## Lesson Placement

Polls work best in **Hook** (to engage and activate prior knowledge at lesson start) or **Reflection** (to consolidate learning and prompt metacognition at lesson end).

Can also appear in **Post-Content** (to check engagement) or **Spaced Review** (to reflect on retention and learning).

Avoid overusing in **Core Practice** where objective feedback is more valuable.

## Related Mechanics

- **21-poll:** This mechanic.
- **22-confidence-rating:** Similar in spirit (no right answer), but focused on metacognition (rating confidence) rather than opinion.
- **23-open-ended:** Learner types a free-form response that may be graded, vs. poll where responses are ungraded and aggregated.
