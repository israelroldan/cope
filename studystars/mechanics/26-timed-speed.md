# Timed Speed Challenge

> Standard questions with a countdown timer that rewards speed and accuracy, testing automaticity and rapid retrieval.

## Core Mechanic

A set of questions (typically 5–15) appears one at a time with a large, prominently displayed countdown timer running in the background. Learners answer each question as quickly as they can. Correct answers award points; incorrect answers either subtract points or simply move to the next question (depending on the failure condition). Speed is rewarded: answering in the first 10 seconds may earn 2× points, while answering after 30 seconds might earn 1×. A running score updates in real time, and streak counters animate on consecutive correct answers (e.g., "3 in a row!" with particles).

The timer applies to the entire set, not individual questions—so learners must balance speed with accuracy. If time runs out before all questions are answered, the challenge ends immediately, showing final score. On tablets or larger screens, a health bar or progress visualization may accompany the timer, showing how many questions remain.

## Why It Works

Automaticity—the ability to retrieve facts or apply procedures without conscious effort—is essential for deeper learning. A timed speed challenge creates a low-stakes, time-pressured environment where learners practice retrieval at speed. The gamification (timer, streaks, multipliers) taps into intrinsic motivation and increases persistence. Speed pressure also reduces cognitive load: learners are forced to rely on implicit memory and intuition rather than slow, deliberative reasoning, which is exactly when we want to measure how automatized a skill has become.

From a neuroscience perspective, retrieval practice under mild time pressure strengthens long-term memory consolidation. The immediate feedback (correct/incorrect, score change) provides error correction and reinforcement. Streak mechanics leverage achievement motivation (the desire to extend a winning streak).

## Content Generation Spec

The AI must generate:
1. **A set of questions** conforming to any wrapped mechanic (multiple choice, true/false, short answer, matching).
2. **A time limit** based on question count and difficulty (rule of thumb: 5–10 seconds per question).
3. **Speed multiplier rules** (optional but recommended).

### Example Output

```json
{
  "duration": 60,
  "questionMechanic": "multiple-choice",
  "questionCount": 10,
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "prompt": "What is the capital of France?",
      "options": ["London", "Paris", "Berlin", "Madrid"],
      "correct": "Paris"
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "prompt": "What is 7 × 8?",
      "options": ["54", "56", "58", "60"],
      "correct": "56"
    }
  ],
  "streakThreshold": 3,
  "speedWeighting": {
    "fastBound": 10,
    "fastMultiplier": 2.0,
    "slowBound": 30,
    "slowMultiplier": 0.5
  },
  "failureCondition": "time-runs-out"
}
```

## UX Considerations

**Prominent Timer**
- 48–72pt font, centered at the top or corner (never buried in UI).
- Color changes as time runs low: green → yellow → red.
- Optional: auditory tick sound when time is below 10 seconds (muted by default, user-controlled).

**Question Display**
- Large tap targets for answer selection (64×64 px or larger).
- Instant visual feedback on tap: correct answer flashes green, incorrect flashes red.
- Next question appears immediately after correct answer (no delay), or after a brief pause if incorrect.

**Score and Streak**
- Running score updated in real time (e.g., "+10 pts" pops up and fades).
- Streak counter clearly visible (e.g., "3 in a row ✨" with star burst animation).
- Post-question feedback: "Correct! 2.0x speed bonus!" or "Incorrect. -5 pts."

**Mobile Optimization**
- Full-screen question area (64–72% of screen height).
- Answer buttons stack vertically or arrange in a 2×2 grid depending on question type.
- Portrait orientation primary; landscape supported on tablets.
- No horizontal scroll; all content fits within viewport.

**Accessibility**
- Color not the only indicator; use text labels ("Correct" checkmark, "Incorrect" ×).
- Timer has aria-live updates for screen readers.
- Auditory tick is optional and muted by default.

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | Generous time limits (60–90s for 5–8 simple questions). Easy, familiar topics (e.g., basic math facts, sight words). Large colorful timer. Celebration animations on every correct answer (no streaks, just encouragement). Speed bonus optional or absent. Failure condition: time runs out (no penalty for wrong). |
| 11–13 | Moderate time (45–60s for 8–12 intermediate questions). Standard topics (e.g., multiplication, geography, definitions). Speed multiplier introduced (1.5–2.0x for fast answers). Streak counter (e.g., 5 in a row = bonus multiplier). Failure condition: time runs out or 3 incorrect answers. |
| 14–16 | Tight time (30–45s for 12–15 challenging questions). Complex content (e.g., advanced math, foreign language, historical analysis). Progressive difficulty (harder questions get more points). Advanced speed weighting (1s bonus scaling). Optional difficulty-based multipliers. Leaderboard integration. Ranked tiers. |

## Lesson Placement

**Primary: Warm-up or Spaced Review**
- **Warm-up**: 2–3 min speed challenge at the start of class to activate prior knowledge and build momentum.
- **Spaced Review**: Mid-week or weekly rapid retrieval drill on previous topics to combat forgetting.

Can also appear in **post-content** practice (to test automaticity right after instruction) or as an **extension challenge** (optional bonus for fast finishers).

## Related Mechanics

- **Multiple Choice** (mechanic 1): Common wrapped mechanic.
- **Matching** (mechanic 6): Also amenable to speed-wrapping.
- **True/False** (mechanic 2): Fast, ideal for timed sets.
- **PvP Competition** (mechanic 29): Both use timers and speed-based scoring; can be combined (timed PvP duel).
- **Strategy Game** (mechanic 27): Optional timer on each question as an overlay.
