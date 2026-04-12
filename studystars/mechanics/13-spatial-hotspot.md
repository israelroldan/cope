# Spatial Pin/Hotspot (Tap on Image)

> Tap a specific location on an image (map, diagram, photo). Validated against a correct zone with proximity-based partial credit.

## Core Mechanic

The learner sees a question asking them to identify a location on a visual reference (e.g., "Tap where Egypt is on this map" or "Tap the heart on this anatomy diagram"). Below the question is a full-screen or responsive image—a map, diagram, photograph, or chart.

The learner taps the image at the location they believe is correct. A pin (marker) immediately appears at the tap location, showing their guess. The system calculates the distance from their pin to the correct location. If they're within an acceptable radius (the "correct zone"), they earn full points. If they're close but outside that zone, they earn partial credit proportional to proximity. The feedback displays both their pin (often in red or neutral color) and the correct location (in green), with a brief explanation.

Optionally, learners can use pinch-to-zoom and pan gestures to examine fine details on the image, making this mechanic suitable for detailed maps or complex diagrams.

## Why It Works

**Spatial Memory & Map Literacy**: Tapping on a map or diagram directly engages spatial reasoning and memory. Unlike naming a country in text form, pointing to it on a map requires accurate spatial representation—a stronger, more durable form of knowledge.

**Immediate Spatial Feedback**: Seeing their pin and the correct pin side by side provides instant visual calibration. This visual feedback is far more informative than "incorrect" alone and helps learners refine their spatial models.

**Real-World Transfer**: Map-reading and diagram interpretation are real-world skills. This mechanic builds practical competence, not just memorization.

**Engagement & Novelty**: Tapping and pinning feels different from multiple-choice or typing. The tactile, visual nature keeps learners engaged and reduces fatigue from text-heavy interfaces.

## Content Generation Spec

The AI must generate:
1. A clear question asking to tap or identify a location
2. A reference image (map, diagram, etc.) with defined coordinate system
3. The correct location (x, y, and radius) in image pixel coordinates
4. An explanation and optional distractor feedback

Key requirements:
- **Image Clarity**: Reference images must be large, clear, and suitable for mobile screens (responsive).
- **Coordinate Precision**: Coordinates should be normalized to the image's actual dimensions. The radius defines the margin of error.
- **Consistency**: For maps, use consistent coordinate systems (e.g., pixel coordinates with origin at top-left).

### Example Output

```json
{
  "prompt": "Tap to identify the location of Cairo on this map of North Africa.",
  "imageUrl": "https://api.studystars.example.com/images/map-north-africa.png",
  "imageAlt": "Political map of North Africa showing country borders, major cities, and the Nile River.",
  "correctZone": {
    "x": 520,
    "y": 280,
    "radius": 30
  },
  "explanation": "Cairo is Egypt's capital and the largest city in Africa. It is located on the Nile River in northeastern Egypt, near the Nile Delta. The city is a major cultural and economic center of the Arab world.",
  "distractorHints": [
    "Not Alexandria (which is further north on the Mediterranean coast)",
    "Not Giza (which is nearby, just west of Cairo)"
  ]
}
```

## UX Considerations

- **Image Display**: Images are responsive and scale to fit the screen while maintaining aspect ratio. On mobile, images fill the viewport with safe margin for tap accuracy.
- **Pin Indicator**: A circular marker or pin appears instantly where the learner taps. Color-code: neutral/gray for pending, green for correct, red for incorrect.
- **Zoom & Pan**: For detailed maps or diagrams, enable pinch-to-zoom and two-finger pan. The pin should remain visible and scale appropriately.
- **Feedback Overlay**: After submission, overlay the correct location as a green pin/marker. Show distance in kilometers (for maps) or pixels (for diagrams).
- **Accessibility**: Provide a text alternative ("Type the coordinates" or "Choose from a list of regions") for learners who cannot see the image clearly.

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | **Large regions and features**. Maps show major continents, oceans, or countries in bold. Diagrams have large, distinct structures (e.g., sun, Earth, moon on a space diagram). Correct zone radius: 40–60px. After incorrect attempt, outline or highlight the correct region with a faint glow. Encourages visual exploration. |
| 11–13 | **Medium detail**. Maps show countries, states, or major cities. Diagrams show organ systems, plant parts, or architectural zones. Correct zone radius: 25–40px. Feedback displays distance ("You were 50 pixels away from the correct location"). One hint available: "Look in the [region name] part of the map." |
| 14–16 | **High precision**. Maps show small cities, provinces, or specific geographic features (straits, peninsulas, mountain ranges). Diagrams show detailed anatomical structures, cell components, or intricate architectural features. Correct zone radius: 10–25px. No hints. Feedback includes geographic or scientific context (e.g., "Cairo sits at the apex of the Nile Delta, making it a natural hub for trade"). |

## Lesson Placement

**Core Practice**: Deploy spatial hotspot activities after teaching geographic or anatomical content. Example: "We just learned about world capitals. Now identify Paris on this map of France."

**Deep Engagement**: Combine with scenario-based questions (mechanic 15). Example: "Read this passage about the Suez Canal, then tap where it is on this map of Egypt and the Middle East."

**Interactive Exploration**: Create "discovery" activities where learners explore a map or diagram by tapping multiple locations (multiple hotspots per image), each revealing a fact or detail.

## Related Mechanics

- **Labeling (Mechanic 14)**: Similar spatial task, but learners drag labels onto the image instead of tapping. Labeling has more items and can require multi-step interaction.
- **Multiple Choice (Mechanic 4)**: A simpler alternative. Use MC to teach concept, then spatial hotspot for application and spatial reasoning.
- **Matching Pairs (Mechanic 8)**: Can be combined—match text descriptions to spatial locations on a map.
- **Scenario-Based Question (Mechanic 15)**: Combine reading comprehension with spatial reasoning.
