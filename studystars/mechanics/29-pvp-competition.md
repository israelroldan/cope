# PvP Competition (Player vs Player)

> Direct player-vs-player combat: correct answers generate attacks, defenses, or steals. Social dynamics create engagement and competitive drama.

## Core Mechanic

Two or more learners compete directly. A shared question appears on screen (or each player sees their own question, depending on the variant). Learners answer in real time. A correct answer generates an action: in "attack" mode, the correct answerer throws a snowball, casts a spell, or steals gold from an opponent's score. In "defend" mode, a correct answer blocks or absorbs incoming damage. In "steal" mode, a correct answer takes resources from the opponent. The visual result is split-screen with both players' portraits/avatars, health bars, score counters, and action animations playing out between them.

Speed and accuracy both matter: answering first and correctly gives a strategic advantage. The game runs for a set number of questions (e.g., 30 questions = about 5 minutes). The player with the most health, points, or resources remaining at the end wins. Optional: leaderboard showing match results.

Variants include duels (1v1), squads (4v4), and royales (8–30 players, last player standing wins), each with different match lengths and dynamics.

## Why It Works

Competition is a powerful motivator for many learners, especially adolescents. The social dynamic of playing against peers increases emotional investment and makes the activity memorable. Direct, visible consequences (opponent's health bar decreases when you answer correctly) provide immediate, intrinsic reinforcement far stronger than abstract points. The "drama" of gameplay—momentum shifts, comebacks, close finishes—sustains attention and engagement.

However, competition can also demotivate low-performing learners or those with math anxiety. PvP works best when questions are calibrated to a learner's level (adaptive difficulty) or when cooperative variants are also available.

From a cognitive standpoint, the time pressure inherent to PvP creates optimal conditions for retrieval practice and automaticity development. Correct answers are retrieved rapidly, under stress, which strengthens long-term memory and transfer.

## Content Generation Spec

The AI must generate:
1. **Questions** conforming to a wrapped mechanic (typically multiple-choice or true/false for speed).
2. **Action names** and visual descriptions for correct/incorrect outcomes.
3. **Match parameters** (player count, health, damage, question count).

### Example Output

```json
{
  "questionMechanic": "multiple-choice",
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "prompt": "What is 5 × 9?",
      "options": ["40", "45", "50", "55"],
      "correct": "45"
    },
    {
      "id": "q2",
      "type": "true-false",
      "prompt": "Paris is the capital of Spain.",
      "correct": false
    }
  ],
  "gameMode": "attack",
  "actionNames": {
    "correct": "Snowball Throw",
    "incorrect": "Slip on Ice"
  },
  "matchSize": 4,
  "healthPerPlayer": 100,
  "damagePerCorrect": 15,
  "questionsPerMatch": 20,
  "winCondition": "last-player-standing"
}
```

## UX Considerations

**Match Lobby**
- "Find Match" button or auto-queue.
- Optional: choose game mode (duel, squad, royale).
- Wait screen while opponent/teammates are found.
- Brief character selection (optional cosmetics from collection mechanic).

**During Match**
- **Split-screen layout**: Each player's avatar, name, and health bar visible on opposite sides (top 20% of screen).
- **Question in center** (40% of screen) with large, easily tappable answer buttons (56–64px).
- **Real-time score/health updates**: When player A answers correctly, their attack animation plays briefly (e.g., snowball arc from A to B), and B's health bar decreases.
- **Action descriptions** appear below the question (e.g., "Player A: +15 damage! ⚡").
- **Timer** for each question (5–10 seconds) to encourage speed.

**Post-Match**
- Results screen showing winner, final scores, MVP (most damage, fastest answers, etc.).
- Optional: screenshot or GIF to share.
- Offer to queue for next match or return to main menu.

**Mobile Optimization**
- Portrait orientation (standard).
- Avatars and health bars stack vertically at top, question centered, tap targets large (min 56×56 px).
- Landscape mode for tablets: split avatars left/right, question in center.
- Minimal scrolling; all content fits within viewport.

**Accessibility**
- Health bar changes also accompanied by text (e.g., "Health: 85/100").
- Action descriptions read by screen readers.
- Color + icon for attack vs. defend (not color-coded alone).

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | Duels only (1v1); smaller player pools avoid overwhelming social dynamics. Cooperative-leaning mode: both players' health decreases together if either answers incorrectly (shift toward collaboration). Simple themes (snowballs, bubbles, friendly creatures). 5–10 questions per match. No stealing. Encourage good sportsmanship post-match. Leaderboard optional or de-emphasized. |
| 11–13 | Squads (4v4) allowed. Moderate attack/defense mechanics. Light stealing (1–2 points per correct). Standard themes (wizards, spies, adventurers). 10–20 questions. Leaderboard visible but not emphasized; focus on fun. Optional voice chat for team coordination (moderated). |
| 14–16 | Full royales (8–30 player, last standing). Aggressive mechanics (high damage, meaningful steals). Advanced themes (strategy RPG, space battles). 20–30 questions per match. Full ranked leaderboard with seasons and achievements. Optional ranked tiers (Bronze→Diamond). Stats tracking (win rate, average damage, speediest answers). Optional voice comms, clan features. |

## Lesson Placement

**Primary: Extension or Deep Engagement**
- **Extension**: After mastery of core content, learners compete to stay engaged and motivated.
- **Deep Engagement**: Multi-match sessions or seasonal competitions spanning weeks.

Can also appear as an **optional tournament** or **competitive challenge event** at the end of a unit.

## Related Mechanics

- **Timed Speed** (mechanic 26): Can be combined; timer on each question adds urgency.
- **Strategy Game** (mechanic 27): PvP variant where players earn currency from questions and spend on upgrades (asymmetric economies).
- **Cooperative Challenge** (mechanic 30): Opposite pole; both support multiplayer learning with different social dynamics.
- **Collection/Gacha** (mechanic 28): Gacha items could be cosmetics or battle items used in PvP.
