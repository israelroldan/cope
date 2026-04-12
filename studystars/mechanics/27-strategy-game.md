# Strategy Game Wrapper

> Correct answers earn in-game currency/resources that players invest strategically (towers, upgrades, crops) to progress through a game world.

## Core Mechanic

A split-screen interface shows a game world (castle under siege, restaurant, farm, kingdom) on one side and question prompts on the other. Learners answer questions to earn in-game currency (gold, coins, harvest, customer happiness). Between question rounds, they pause to spend currency on strategic upgrades: purchasing tower defenses, buying decorations that boost productivity, planting crops, hiring workers, or unlocking new areas. The game has a clear win condition (e.g., defend the castle through 10 waves, fill the farm with 50 crops, earn 500 gold by round 5). Incorrect answers either forfeit currency or trigger a cost (e.g., lose 5 coins to repair damage).

The mechanic combines two feedback loops: immediate (correct question → currency earned, visible in a floating "+10 gold" pop-up) and strategic (currency spent on upgrades → visible game world changes → future questions grant more currency or face easier enemies). Learners who choose expensive upgrades early must answer more questions; those who invest wisely gain compound advantages. The game state persists across rounds, creating narrative continuity and emergent complexity.

## Why It Works

Resource management games have documented motivational and engagement effects. The combination of knowledge retrieval (answering questions) and strategic decision-making (spending currency) creates a rich cognitive experience: retrieval practice paired with application. Visible, meaningful consequences (upgrades appear on screen) provide stronger reinforcement than abstract points. The game narrative (defend a castle, build a farm) gives context and purpose to learning, addressing the "why" behind practice.

Economically, the game teaches trade-offs: you cannot afford everything at once; you must prioritize. Educationally, this mirrors real-world decision-making and encourages metacognition: "If I buy this upgrade now, I have less currency for later challenges."

From a motivation standpoint, in-game progression and customization tap into autonomy (learners choose which upgrades to purchase) and mastery (optimizing strategies to win).

## Content Generation Spec

The AI must generate:
1. **Questions** conforming to a wrapped mechanic (typically multiple-choice or short-answer).
2. **Theme assets** (descriptive names and flavor text for upgrades and game world).
3. **Economy parameters** (currency per question, costs, difficulty scaling).

### Example Output

```json
{
  "gameTheme": "castle-defense",
  "currencyName": "gold",
  "currencyPerQuestion": 10,
  "questionMechanic": "multiple-choice",
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "prompt": "What is the powerhouse of the cell?",
      "options": ["Nucleus", "Mitochondria", "Ribosome", "Golgi apparatus"],
      "correct": "Mitochondria"
    }
  ],
  "upgradeTree": [
    {
      "id": "wall-1",
      "name": "Stone Wall",
      "cost": 20,
      "effect": "Reduce incoming damage by 10%",
      "icon": "🧱"
    },
    {
      "id": "archer-tower",
      "name": "Archer Tower",
      "cost": 50,
      "effect": "Deal 5 damage per wave",
      "icon": "🏹"
    },
    {
      "id": "magic-shield",
      "name": "Magic Shield",
      "cost": 75,
      "effect": "Block one attack per wave",
      "icon": "🛡️"
    }
  ],
  "questionsPerRound": 3,
  "roundCount": 8,
  "winCondition": {
    "type": "waves-survived",
    "target": 10
  }
}
```

## UX Considerations

**Split-Screen Layout**
- Game world viewport (top 60% on phones, left 50% on tablets): shows the castle, farm, or kingdom with animated upgrades as they are purchased. Tappable upgrade locations invite placement.
- Question area (bottom 40% on phones, right 50% on tablets): clear prompt and answer options.
- Currency display (sticky HUD): "Gold: 120 | Next: 10 points"

**Upgrade Interface**
- After N questions answered, a "Shop" or "Build" menu slides up or becomes visible.
- Grid of 3–6 upgrade cards, each showing: icon, name, cost, brief description, "Locked" or "Available" status.
- Tap to select; confirmation dialog if expensive.
- Purchase with visual feedback: currency decreases, upgrade appears on screen, world state updates (tower placed, crop grows, worker appears).

**Game World Feedback**
- Waves of enemies approach and attack; player defenses respond.
- Upgrades are visually distinct and positioned on screen (towers in corners, crops in rows, etc.).
- Health bar or wave counter shows progress toward win condition.
- Victory screen with final statistics (gold earned, upgrades purchased, efficiency rating).

**Mobile Optimization**
- Vertical stack on phones: game above, questions below, shop overlays as needed.
- Pinch-to-zoom on game world for detailed viewing (optional).
- Haptic feedback on upgrades purchased (if device supports).

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | Single currency (gold only). 3–5 basic upgrades (cost 20–50). Simple economy: earn 10 gold per question, spend on 1 item at a time. Visual game world (colorful, whimsical). 5–8 questions per purchase cycle. Abundant currency (easy to afford upgrades). Win condition: simple (survive 5 waves, collect 100 gold). |
| 11–13 | Two currencies (gold + special resource, e.g., gems). 8–12 upgrades with costs 20–100. Medium economy: scaled costs, slight resource scarcity. Upgrade synergies (e.g., "2 towers = 1.2x damage"). 3–5 questions per cycle. 8 waves/rounds. Optional leaderboard (gold per question ratio). |
| 14–16 | 3+ currencies with conversion mechanics. 15–25+ upgrades, including hidden/rare ones. Complex economy: opportunity cost, prestige mechanics, late-game scaling. Advanced synergies and passive bonuses. 5–10 questions per cycle, difficulty-scaled rewards. 10–15 waves/rounds. Full leaderboard, seasonal resets, meta strategies (speedrun strategies, efficiency optimization). |

## Lesson Placement

**Primary: Extension or Deep Engagement**
- **Extension**: After mastery of core content, learners apply knowledge in a richer, longer activity.
- **Deep Engagement**: Multi-session or project-based learning where the game spans multiple lessons, creating continuity.

Can also appear as an **optional challenge** for fast finishers or as a **capstone activity** at the end of a unit.

## Related Mechanics

- **Multiple Choice** (mechanic 1) or **Short Answer** (mechanic 14): Commonly wrapped mechanics.
- **PvP Competition** (mechanic 29): Competitive variant; both players earn currency from questions and invest in upgrades to compete.
- **Cooperative Challenge** (mechanic 30): Team-based; all players contribute currency to a shared economy.
- **Collection/Gacha** (mechanic 28): Both have reward mechanics; can combine (upgrade drops are rare rewards).
- **Timed Speed** (mechanic 26): Optional timer on each question as an overlay.
