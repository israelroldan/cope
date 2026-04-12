# Collection/Gacha Reward

> Correct answers unlock randomized reward reveals with rarity tiers, creating excitement through luck-based collection mechanics.

## Core Mechanic

After answering a question correctly (or every N correct questions), learners unlock a reward reveal: a visual animation plays (treasure chest opens, fishing line catches, egg cracks) and reveals a randomized item from a reward pool. Items have rarity tiers—common items (70% drop rate) are frequent and might be cosmetic or narrative flavor; rare items (20%) are more interesting; legendary items (10%) are coveted and exciting. Each rarity tier has distinct visual feedback: common items appear with a simple "ping," rare items sparkle, legendary items burst with confetti and particle effects.

Learners accumulate these items in a personal collection or gallery, which they can view and optionally share. Duplicate items are tracked (e.g., "Sword ×3"), and optionally, duplicates can be traded for currency or crafting materials. Advanced versions allow learners to combine items, equip them as cosmetics, or trade them with peers.

The mechanic is a lightweight loot-box variant designed specifically for education: the reward is not pay-to-win (free play only), and rarity distribution is transparent and fair.

## Why It Works

Collection mechanics leverage completion motivation—the human drive to "catch them all." Combined with variable reward schedules (randomization), gacha mechanics create intermittent reinforcement, which produces the strongest, most persistent learning behaviors. The visual feedback (sparkles, confetti) releases dopamine and creates positive emotional associations with correct answers.

From a behavioral standpoint, gacha mechanics are a form of gamification that increases engagement without necessarily improving learning efficiency. However, they can increase time-on-task and reduce dropout rates, which indirectly support learning. Visually rewarding correct answers (beyond points) addresses learners who are less motivated by abstract scores.

Important caveat: Gacha mechanics can be exploitative if used irresponsibly (e.g., pay-to-gacha). In education, we use free-to-play gacha with transparent odds, trading mechanics, and no pay-to-win pressure.

## Content Generation Spec

The AI must generate:
1. **Questions** conforming to a wrapped mechanic.
2. **Item pool** with thematic items, rarity assignments, and descriptions.
3. **Rarity tier definitions** with probabilities, colors, and animation styles.

### Example Output

```json
{
  "questionMechanic": "multiple-choice",
  "questions": [
    {
      "id": "q1",
      "type": "multiple-choice",
      "prompt": "What is the largest planet in our solar system?",
      "options": ["Saturn", "Jupiter", "Neptune", "Uranus"],
      "correct": "Jupiter"
    }
  ],
  "collectionTheme": "solar-system-creatures",
  "questionsToUnlock": 1,
  "rarityTiers": [
    {
      "name": "Common",
      "probability": 0.70,
      "color": "#4a5f7f",
      "animation": "fade-in",
      "items": [
        "Moon Rabbit",
        "Solar Flare Sprite",
        "Asteroid Bit"
      ]
    },
    {
      "name": "Rare",
      "probability": 0.20,
      "color": "#2ecc71",
      "animation": "sparkle",
      "items": [
        "Mercury Dancer",
        "Venus Phoenix",
        "Mars Guardian"
      ]
    },
    {
      "name": "Legendary",
      "probability": 0.10,
      "color": "#f39c12",
      "animation": "burst-confetti",
      "items": [
        "Comet Wyvern",
        "Black Hole Oracle",
        "Supernova Celestial"
      ]
    }
  ],
  "rewardPool": [
    {
      "id": "moon-rabbit",
      "name": "Moon Rabbit",
      "rarity": "common",
      "description": "A playful moon spirit.",
      "icon": "🐰"
    },
    {
      "id": "comet-wyvern",
      "name": "Comet Wyvern",
      "rarity": "legendary",
      "description": "A rare, majestic cosmic dragon.",
      "icon": "🐉"
    }
  ],
  "duplicateHandling": "track-copies",
  "showcaseEnabled": true
}
```

## UX Considerations

**Question and Unlock Interface**
- Question displayed at top (40% of screen).
- Below, a large unlock button or interactive object (treasure chest, egg, fishing line): 80×80 px or larger.
- Text overlay: "Answer correctly to reveal a reward!" or "1 of 5 unlocks remaining in this session."

**Reveal Animation**
- On unlock, button animates (scales, rotates, glows).
- Object opens/cracks with a brief animation (0.5–1.0 second).
- Item card slides or pops into view.
- Item card displays: icon/thumbnail, name, rarity color/label, description.
- Optional: sound effect (chime for common, sparkle for rare, fanfare for legendary).

**Collection View**
- Dedicated tab or overlay showing all items collected (grid layout, 3–4 columns on mobile).
- Each item shows: icon, name, count (if duplicate), rarity color-coded border.
- Optional: search/filter by rarity, theme, or name.
- Optional: view full item stats or descriptions on tap.
- Rarity legend visible (common [gray] 70%, rare [green] 20%, legendary [gold] 10%).

**Duplicate Handling UI** (if enabled)
- Inventory shows "Sword ×3" with a "Trade" or "Combine" button.
- Tapping trades 3 duplicates for 1 currency unit or fragments.
- Optional: tooltip explaining duplicate mechanics.

**Mobile Optimization**
- Full-screen reveal animation centered.
- Collection grid adapts to screen width (2 columns on phones, 3–4 on tablets).
- Fast scroll with lazy loading if collection grows large (100+ items).

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | 3 rarity tiers (common, rare, legendary). Cute, non-violent items (animals, plants, stars). Unlock after every correct answer. Simple collection view (grid, no trading). Emphasis: "Fun surprises!" rather than completion. No pay mechanics or currency conversion. |
| 11–13 | 4–5 rarity tiers with visible probabilities (e.g., "70% common, 20% rare, 10% legendary"). Thematic collections (e.g., Ancient Egypt artifacts, sea creatures). Unlock every 1–2 correct answers. Duplicate tracking visible ("× 3"). Optional: trade 3 duplicates for 1 rare item. Collection showcase optional. |
| 14–16 | 6+ rarity tiers with weighted probability curves. Detailed lore/descriptions for items (educational flavor text). Unlock every 1–3 questions (customizable). Full trading system (1:3 common→rare, etc.). Crafting mechanics (combine 3 items to create a unique item). Leaderboard (most items, rarest item, completion %). Optional profile showing collection. |

## Lesson Placement

**Primary: Spaced Review or Extension**
- **Spaced Review**: Repeated, short sessions over days/weeks to combat forgetting. The collection mechanic creates continuity across sessions (learners check progress on their collection).
- **Extension**: Optional reward for completing core practice; encourages repeat engagement.

Can also appear as a **homework incentive** (e.g., "Complete 5 questions at home to unlock 5 rewards").

## Related Mechanics

- **Multiple Choice** (mechanic 1), **True/False** (mechanic 2): Commonly wrapped mechanics.
- **Strategy Game** (mechanic 27): Both have reward/resource mechanics; can combine (rare items grant currency or upgrades).
- **PvP Competition** (mechanic 29): Gacha items could be cosmetics or battle consumables.
- **Timed Speed** (mechanic 26): Speed correct answers could unlock higher rarity drops (optional incentive).
