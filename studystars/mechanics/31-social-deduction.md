# Social Deduction

> Among Us-style game: hidden impostors sabotage while crewmates complete questions. Discuss, investigate anomalies, vote to eject.

## Core Mechanic

Before the game begins, players are randomly assigned secret roles: most are "crewmates," and 1–3 are "impostors." Only the impostors know who they are. The group enters a series of discussion and question-answering rounds. In each round:

1. **Question Phase (2–3 min)**: All players answer questions (same or distributed). Impostors can sabotage subtly (e.g., give wrong answers to frame crewmates, cause a brief blackout, initiate false accusations).
2. **Discussion Phase (30–60s)**: The team meets (text or video chat). Crewmates try to identify impostors by analyzing answer patterns (e.g., "Why did you both get question 3 wrong?" or "You're always the fastest answerer—suspicious!"). Impostors defend themselves or deflect blame.
3. **Voting Phase (20–30s)**: Everyone votes to "eject" one player. The player with the most votes is removed and their role is revealed.
4. **Repeat**: Until all impostors are ejected (crewmates win) or only impostors remain (impostors win).

The cognitive demand is high: crewmates must detect patterns (statistical anomalies, behavior shifts), manage social dynamics (persuasion, debate), and practice meta-reasoning (inferring intent from behavior). Impostors must manage deception while answering enough questions correctly to avoid suspicion.

## Why It Works

Social deduction games activate multiple cognitive and social skills simultaneously. Crewmates practice pattern recognition, inference, and probabilistic reasoning (e.g., "If they got 2/3 questions right and usually get 3/3, they're probably lying"). Impostors practice strategic thinking and perspective-taking (modeling what crewmates believe). Both engage in discussion, persuasion, and debate—high-level communication skills.

Socially, the game creates memorable, emotionally rich experiences (humor, drama, betrayal), which improves retention and social bonding. Academically, the academic content (the questions) is secondary to the meta-game; the questions are a tool to generate data for deduction.

However, this mechanic is socially complex and can exclude younger learners or those with poor social-emotional regulation. Older teens thrive with it.

## Content Generation Spec

The AI must generate:
1. **Questions** for the wrapped mechanic (diverse topics to support varied player expertise).
2. **Anomaly clues**: Suspicious patterns or hints impostors can subtly introduce.
3. **Role configuration**: Number of impostors, abilities, win conditions.

### Example Output

```json
{
  "questionMechanic": "multiple-choice",
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "prompt": "What is the largest moon of Jupiter?",
      "options": ["Europa", "Ganymede", "Io", "Callisto"],
      "correct": "Ganymede"
    },
    {
      "id": "q2",
      "type": "multiple-choice",
      "prompt": "Which scientist developed the theory of evolution?",
      "options": ["Isaac Newton", "Charles Darwin", "Albert Einstein", "Marie Curie"],
      "correct": "Charles Darwin"
    }
  ],
  "playerCount": 8,
  "impostorCount": 2,
  "discussionDuration": 45,
  "votingDuration": 30,
  "roundCount": 4,
  "questionsPerRound": 3,
  "impostorAbilities": [
    {
      "name": "Sabotage",
      "description": "Cause a 10-second blackout to disrupt communication.",
      "cooldown": 120
    },
    {
      "name": "False Accusation",
      "description": "Anonymous accuse another player to create confusion.",
      "cooldown": 180
    }
  ],
  "anomalyClues": [
    "Always answers fastest (might be impostor masking with confidence)",
    "Never gets the topic-specific question right (maybe unfamiliar with that subject?)",
    "Suddenly changes speed or confidence (sign of stress?)"
  ],
  "winConditions": {
    "crewmates": "Eject all impostors",
    "impostors": "Reduce crewmates to equal or fewer than impostors"
  }
}
```

## UX Considerations

**Pre-Game Lobby**
- "Find Game" button; optional: choose game mode (standard, simplified).
- Wait screen with player avatars joining.
- Role assignment: each player is notified privately (pop-up with emoji or icon: 👨‍🚀 Crewmate or 🎭 Impostor).

**Question Phase**
- All players see the same question (or distributed questions displayed individually).
- Answers logged in real-time (visible to all, unless impostor chooses to hide).
- Optional: time pressure (10–15s per question).

**Discussion Phase**
- Chat panel (text-based, moderated for safety).
- Thumbnails of each player's recent answers visible (e.g., "Player A: ✗ Q1, ✓ Q2, ✗ Q3").
- Countdown timer for discussion.
- Suggested discussion starters (e.g., "Ask another player to explain their last answer").

**Voting Phase**
- Large portraits of each player, tappable.
- Tap a player to vote them out.
- Vote counter updates in real-time.
- Countdown timer.
- Once voting closes, the ejected player's role is revealed ("✓ Crewmate" or "🎭 Impostor").
- Post-eject discussion (brief, 10–15s) before next round.

**End-Game Screen**
- "Crewmates Win!" or "Impostors Win!" with celebratory or dramatic animation.
- Stats: each player's role, votes received, accuracy, discussion contributions.
- Optional: highlight best impostors, best detectives, most suspicious answers.
- Offer to play again or return to main menu.

**Mobile Optimization**
- Portrait orientation.
- Discussion chat scrollable at bottom.
- Tap to vote (no selection dropdown).
- Avatars small but tap targets large (48×48 px minimum for voting).
- Minimal clutter; focus on discussion and voting.

**Accessibility & Safety**
- Moderated chat (teacher approval of sensitive language).
- Optional: suggested discussion prompts to keep players on track.
- Optional: voice comms for older learners (recorded, moderated).
- Clear rules: "No real-world insults, only game accusations."

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | **Not recommended.** If adapted: 4–6 players (smaller scale), 1 impostor max, simplified question content, moderated discussion (teacher filters all chat), 2–3 very short rounds (10–15 min total). Emphasis on fun and collaboration over winning. Role reveal at end (not mid-game). |
| 11–13 | **Simplified version.** 6–8 players, 1–2 impostors, moderate question difficulty, moderated chat with teacher present, 3–4 rounds. Anomaly clues given as hints (not hidden). Training round before real game. Post-game discussion of strategies. Focus on social skills over "catching the impostor." |
| 14–16 | **Full game.** 8–12 players, 2–3 impostors, advanced questions, free discussion (moderated for safety), 4–5 complex rounds. Impostor abilities enabled and distinct. Full anomaly clue discovery (crewmates must deduce). Optional voice comms (recorded, moderated). Leaderboard for wins by role. Post-game role analysis and strategy discussion. Optional tournaments. |

## Lesson Placement

**Primary: Extension or Deep Engagement**
- **Extension**: As a culminating, social activity after a multi-week unit. The questions are drawn from the unit content.
- **Deep Engagement**: Optional, premium activity for high-engagement classrooms or clubs.

Less commonly in warm-up or core-practice (too complex and social for early lesson phases).

## Related Mechanics

- **PvP Competition** (mechanic 29): Both are competitive; social deduction adds discussion and deception layers.
- **Cooperative Challenge** (mechanic 30): Opposite pole; both use multiplayer dynamics.
- **Multiple Choice** (mechanic 1), **True/False** (mechanic 2): Wrapped mechanics for the question content.
