# Cooperative/Team Challenge

> Teams work together against an environmental challenge. Individual correct answers contribute to shared progress; collective failure reinforces interdependence.

## Core Mechanic

A team of learners (3–8 players) faces a shared environmental threat or goal: rising lava (they must answer questions to raise the platform higher), a sinking submarine (answer to pump water out), a farm to build (answer to plant crops), or a disease spreading (answer to develop vaccine doses). A shared progress bar dominates the screen, showing the team's collective advancement toward the goal. Individual learners see questions (one at a time, or distributed among team members). When someone answers correctly, the team's progress meter advances by one increment; incorrect answers either stall progress or trigger a small penalty (time reduced by 5 seconds, health decreased by 1 point).

The narrative is collaborative: "We must reach 50 correct answers before the lava rises to the platform." Time pressure is shared—a countdown timer shows the remaining time for the entire team to succeed. If the team reaches the goal before time or health runs out, they win collectively (everyone celebrates). If they fail, everyone fails together, creating collective accountability and cohesion.

An optional feature is individual contribution tracking (visible only to the team or hidden), which can motivate participation without introducing ranking.

## Why It Works

Cooperative learning is strongly supported by research: it increases engagement, improves retention, and develops social-emotional skills (teamwork, empathy, communication). Shared failure (the team loses together if they do not reach the goal) creates interdependence and motivates all learners to contribute, including quiet or struggling learners who might otherwise disengage.

Neurologically, cooperative contexts activate social brain regions and increase oxytocin, deepening emotional bonding with team members. This creates a "social glue" that makes learning more memorable and transferable.

Importantly, cooperative challenges work best when individual roles or question types are varied so that each learner feels they contributed meaningfully (e.g., diverse question topics, distributed answering).

## Content Generation Spec

The AI must generate:
1. **Questions** conforming to a wrapped mechanic, ideally with diversity (mixed difficulty, topics) to accommodate diverse team members.
2. **Narrative framing** (the specific challenge scenario).
3. **Match parameters** (team size, target score, time limit, progress visualization).

### Example Output

```json
{
  "questionMechanic": "multiple-choice",
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "prompt": "What is the chemical symbol for gold?",
      "options": ["Go", "Au", "Gd", "Ag"],
      "correct": "Au"
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "prompt": "Which planet is known as the Red Planet?",
      "options": ["Venus", "Mars", "Jupiter", "Saturn"],
      "correct": "Mars"
    }
  ],
  "narrative": "Your team's submarine is sinking! Answer science questions to power the pumps and drive water out before we hit the ocean floor.",
  "targetScore": 40,
  "teamSize": 5,
  "timeLimit": 420,
  "progressVisualization": "rising-water-level",
  "penaltyForWrongAnswer": 5,
  "reviveOrCheckpoint": false,
  "participationTracking": true
}
```

## UX Considerations

**Team Roster and Status**
- Team member names/avatars in a small grid at the top (8–12px each) or a list.
- Optional: color-code each member and show their question next to their color.
- Shared progress bar (large, center-top): visual representation of collective progress (e.g., water rising, platform ascending, crops planted).
- Countdown timer (large, visible, 36–48pt font).

**Question Distribution**
- Questions distributed among team members in rotation, or all see the same question and race to answer.
- Variant A (recommended): One question at a time, any team member can answer (encourages participation from fast responders and allows slower members to think). Tap their name to select, then answer.
- Variant B: Each player sees their own question in rotation, ensuring equal turns.

**Progress Feedback**
- On correct answer, progress bar advances visibly (animate 0.3–0.5s), with a "ding" sound and "+1" label.
- On incorrect answer, progress stalls briefly or retracts 1 unit, with a "buzz" sound and optional explanation.
- Optional: individual contribution counter visible to team (e.g., "Sarah: 5 correct, Team: 15/40").

**Shared Narrative Updates**
- Periodically, the narrative updates (e.g., "Lava is rising! We have 60 seconds left!").
- End screen: "Success! The submarine has surfaced!" or "Failure. The lava has reached the top. Better luck next time!"

**Mobile Optimization**
- Vertical layout: team roster top, progress bar center, question below, timer sticky.
- Landscape on tablets: team roster left, progress/narrative center, question right.
- Tap target for "answer" buttons is large (56×56 px).

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | Small teams (3–4 players). Simple, concrete narrative (e.g., "Save the forest animals!"). Generous time limits (300+ seconds) and low target scores (20–25 correct). No penalty for incorrect answers; focus on accumulation. Encouraging tone throughout. Team names and simple visuals. |
| 11–13 | Medium teams (4–6 players). Moderate narrative (e.g., "Escape the volcano"). Standard time (300s) and target (40–50 correct). Small penalty on wrong (lose 3–5 seconds or 1 health). Individual contribution visible as a bar (not ranking). Team celebration animations. Optional post-game group discussion. |
| 14–16 | Larger teams (6–8 players). Complex, branching narrative (e.g., "Multi-stage space mission"). Challenging time (180–300s) and ambitious target (60–80 correct). Meaningful penalties (lose 10 seconds per wrong, or lose 5 health points). Full participation transparency. Optional voice comms (moderated). Post-game stats and replay viewing. Leaderboard for team completion times and efficiency. |

## Lesson Placement

**Primary: Extension or Deep Engagement**
- **Extension**: After core content mastery, a full-class cooperative challenge as a capstone or celebration.
- **Deep Engagement**: Multi-session challenges or project-based learning where the team continues to work toward a goal across several lessons.

Can also appear as a **icebreaker** at the start of a unit (low-stakes, simple challenge to build team cohesion) or as a **reflection activity** (synthesizing multiple lessons).

## Related Mechanics

- **Multiple Choice** (mechanic 1), **True/False** (mechanic 2), **Short Answer** (mechanic 14): Commonly wrapped mechanics.
- **PvP Competition** (mechanic 29): Opposite pole; competitive vs. cooperative.
- **Strategy Game** (mechanic 27): Team-based variant where the team shares a resource pool.
- **Timed Speed** (mechanic 26): Can add a timer overlay for urgency.
