# Categorization/Sorting

> Drag items into 2-4 labeled category buckets.

## Core Mechanic

A grid of 2-4 labeled category buckets appears at the top of the screen (e.g., "Mammals", "Reptiles", "Birds"). Below them is a pool of items to sort (e.g., "Lion", "Python", "Penguin", "Tiger", "Turtle", "Eagle"). The learner reads an item, determines which category it belongs to, and drags the item upward into the corresponding bucket. On mobile, a long-press on an item initiates drag mode; the item follows the finger as it moves. When the item is dragged over a bucket, the bucket highlights (changes color or enlarges) to show it's a valid drop target. Releasing the item (lifting finger) drops it into the bucket. Upon correct placement, the item snaps into the bucket and may briefly display a checkmark. Upon incorrect placement, the item shakes slightly or the bucket flashes red, and the item returns to the pool for another attempt.

The mechanic continues until all items are placed correctly. Progress is typically shown as "6 / 8 items sorted" or similar. The spatial arrangement (buckets at top, items below) mirrors physical sorting and supports embodied learning.

## Why It Works

Categorization requires learners to identify defining features of items and match them to category criteria—a deeper cognitive task than simple matching. Learners must not just recognize pairings but understand the logical basis for grouping. This metacognitive work (thinking about what makes items belong to a category) strengthens conceptual understanding more than surface-level memorization.

The drag-and-drop interaction is inherently more engaging than static selection because it creates a sense of physical action and spatial reasoning. Research in embodied cognition shows that motor engagement during learning enhances memory and transfer. By physically dragging items into categories, learners create stronger, more flexible category representations in memory.

The immediate per-item feedback supports error correction: if an item is placed wrongly, learners quickly see the error and can reconsider their categorization logic, leading to deeper processing.

## Content Generation Spec

The AI should generate categories and items that fit each category clearly. The challenge is creating plausible distractors—items that could belong to multiple categories but have one primary correct fit.

Examples:
- **Simple**: Mammals/Reptiles/Birds: Lion, Python, Penguin (very distinct)
- **Medium**: Vegetables/Fruits/Grains: Carrot, Apple, Tomato, Wheat, Corn (tomato is tricky—is it a fruit or vegetable? The AI should choose the intended category in the data.)
- **Hard**: Historical Periods by Continent: Roman Empire, Ming Dynasty, Islamic Golden Age, Medieval Europe (requires knowledge of geography and history)

Content shape:
- **categories** (string[]): Array of 2-4 category names. E.g., ["Mammals", "Reptiles", "Birds"]
- **items** (object[]): Array of {text, correctCategory} pairs.
  - "text": "Lion", "correctCategory": "Mammals"
  - "text": "Python", "correctCategory": "Reptiles"
  - "text": "Penguin", "correctCategory": "Birds"
- **explanation** (string, optional): "Lions are mammals because they have fur, produce milk, and give live birth. Snakes and lizards are reptiles with scales and cold blood. Birds have feathers, lay eggs, and are warm-blooded."
- **difficulty** (enum): "easy" for very distinct categories; "hard" for overlapping categories (e.g., Vegetables vs. Fruits).

### Example Output

```json
{
  "categories": [
    "Renewable Energy",
    "Non-Renewable Energy",
    "Storage Technology"
  ],
  "items": [
    {
      "text": "Solar Panels",
      "correctCategory": "Renewable Energy"
    },
    {
      "text": "Coal Power Plant",
      "correctCategory": "Non-Renewable Energy"
    },
    {
      "text": "Wind Turbine",
      "correctCategory": "Renewable Energy"
    },
    {
      "text": "Lithium Battery",
      "correctCategory": "Storage Technology"
    },
    {
      "text": "Natural Gas Pump",
      "correctCategory": "Non-Renewable Energy"
    },
    {
      "text": "Hydroelectric Dam",
      "correctCategory": "Renewable Energy"
    },
    {
      "text": "Oil Refinery",
      "correctCategory": "Non-Renewable Energy"
    },
    {
      "text": "Fuel Cell",
      "correctCategory": "Storage Technology"
    }
  ],
  "explanation": "Renewable energy sources replenish naturally (sun, wind, water). Non-renewable sources are finite (coal, oil, gas). Storage technologies capture and hold energy for later use.",
  "difficulty": "medium",
  "tags": [
    "energy",
    "sustainability",
    "environmental-science",
    "grade-7-science"
  ]
}
```

## UX Considerations

- **Bucket layout**: 2-4 buckets displayed in a horizontal row at the top of the screen, each with a clear label. Buckets are 100-120px wide on mobile, larger on tablets. Use color-coding if helpful (e.g., blue for Mammals, green for Reptiles, orange for Birds).
- **Item pool**: Items displayed in a scrollable area below buckets. Items are arranged in a grid or loose arrangement, not tightly packed.
- **Drag interaction**: Long-press (500ms) initiates drag mode. Item becomes semi-transparent or elevates slightly to indicate dragging. Follow finger smoothly with no lag.
- **Drop zones**: Buckets expand or highlight when an item is dragged over them (visual affordance). Display a "drop here" instruction if helpful for young learners.
- **Feedback animation**: Correct placement: item snaps into bucket with a satisfied sound and brief checkmark. Incorrect: item shakes, bucket flashes red, and item returns to pool.
- **Accessibility**: Support keyboard interaction on desktop: Tab through items, Arrow keys to navigate, Enter to place in highlighted bucket.

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | 2 categories maximum, 4-6 items. Large buckets (120×120px) with icons or emoji (e.g., 🦁 Mammals, 🐍 Reptiles). Large item tiles (80×60px). Simple, highly distinct categories. Optional tap-and-sort interaction (tap item, tap bucket) instead of drag, to reduce dexterity demands. Colorful, visually distinct bucket backgrounds. |
| 11–13 | 3 categories, 6-10 items. Standard buckets (100×100px) with text labels. Item tiles 70×50px. Conceptually related categories (e.g., different animal types, different plant parts, different historical periods). Drag-and-drop required. Immediate per-item feedback with encouragement. Progress counter visible. |
| 14–16 | 4 categories, 10-16 items. Compact buckets (80×80px). Item tiles 60×40px. Complex, sophisticated categorization (e.g., chemical elements by group/period, historical events by theme/century, or literary works by genre/era). Some items may fit multiple categories (distractors); learners must choose the best fit. No feedback until all items are placed (summative mode) or immediate per-item feedback (formative mode). Can include images instead of or alongside text. |

## Lesson Placement

**Post-content**: After teaching category definitions or introducing classification systems, categorization activities allow learners to practice applying those categories.

**Core practice**: For subjects centered on taxonomy, classification, or organization (biology, history, library science), categorization is core practice that builds fluency in category membership and organization.

**Deep engagement**: Complex categorization with multiple tricky items engages advanced learners in critical thinking and nuanced judgment.

## Related Mechanics

- **Matching Pairs** (id: `matching-pairs`): Simpler variant where learner matches pairs one-to-one rather than grouping into categories.
- **Fill in the Blank (Word Bank)** (id: `fill-in-blank-wordbank`): Similar drag-drop interaction but items are placed into sentence blanks rather than category buckets.
- **Multiple Choice** (id: `multiple-choice`): Simpler variant where learner selects a category from options rather than categorizing multiple items.
