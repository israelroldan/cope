# Labeling (Drag Labels onto Image)

> Drag text labels from a bank onto correct positions on a reference image. Validates label placement with snap-to-anchor feedback.

## Core Mechanic

The learner sees a reference image (e.g., diagram of a cell, map of continents, anatomy chart) and a bank of label tiles positioned below or beside the image. Each label tile contains a short text phrase (e.g., "mitochondrion", "nucleus", "Pacific Ocean").

The learner drags a label tile from the bank onto the image, aiming for the correct location. As they drag, a line or visual indicator shows where the label will land. When the label gets close enough to the correct anchor point (within a "snap radius"), it snaps into place with a smooth animation and visual feedback (highlight, check mark, or color change).

Correctly placed labels lock in place and cannot be moved. Incorrectly placed labels either snap back to the bank or remain with a visual indicator (e.g., red outline) showing they're wrong. The learner can then retry or move on.

If distractor labels are included (labels that don't belong), the learner must select which labels to place and which to leave unused. This adds a discriminatory component—not just knowing placement, but knowing which labels apply to this particular image.

## Why It Works

**Spatial + Semantic Learning**: Combining spatial reasoning (where to place the label) with semantic knowledge (what the label means and why it belongs there) creates robust, multimodal memories. Learners aren't just naming parts; they're understanding their locations and functions.

**Effortful Retrieval with Guidance**: The drag-and-snap mechanic is more demanding than multiple choice (which offers recognition cues) but more guided than free recall. This "sweet spot" of difficulty is optimized for learning.

**Immediate Spatial Feedback**: The snap-to-position animation provides instant, concrete feedback that the placement is correct. This is more satisfying and informative than a text-based "correct" message.

**Self-Correction Loop**: Incorrectly placed labels return to the bank, allowing learners to attempt the same label again without penalty. This builds confidence and encourages exploration.

## Content Generation Spec

The AI must generate:
1. A clear labeling task (e.g., "Label the organelles of a plant cell")
2. A reference image with defined anchor points
3. Label text for 3–10 key structures or features
4. Optional: 1–5 distractor labels (for difficulty)
5. An explanation of the structure or system
6. Optional: per-label explanations (educational value)

Guidelines:
- **Image Preparation**: The image must have clear, identifiable regions or structures. Anchor points should be placed at the logical location of each label (e.g., next to or pointing to the structure).
- **Snap Radius**: Larger for younger learners (40–50px), smaller for older learners (20–25px). This controls difficulty without changing content.
- **Distractors**: Should be plausible but clearly not part of this structure (e.g., "tail" for an animal when labeling "bird anatomy").

### Example Output

```json
{
  "prompt": "Label the major organs and structures of the human heart.",
  "imageUrl": "https://api.studystars.example.com/images/diagram-human-heart.png",
  "imageAlt": "Anatomical diagram of the human heart showing chambers, valves, and major blood vessels.",
  "labels": [
    {
      "text": "Right Atrium",
      "position": { "x": 150, "y": 200, "snapRadius": 30 }
    },
    {
      "text": "Left Atrium",
      "position": { "x": 450, "y": 200, "snapRadius": 30 }
    },
    {
      "text": "Right Ventricle",
      "position": { "x": 150, "y": 400, "snapRadius": 30 }
    },
    {
      "text": "Left Ventricle",
      "position": { "x": 450, "y": 400, "snapRadius": 30 }
    },
    {
      "text": "Aorta",
      "position": { "x": 500, "y": 150, "snapRadius": 30 }
    },
    {
      "text": "Pulmonary Artery",
      "position": { "x": 100, "y": 150, "snapRadius": 30 }
    }
  ],
  "distractorLabels": [
    "Trachea",
    "Esophagus",
    "Liver"
  ],
  "explanation": "The human heart is a muscular organ divided into four chambers: two atria and two ventricles. The right side receives deoxygenated blood from the body and pumps it to the lungs. The left side receives oxygenated blood from the lungs and pumps it to the body via the aorta.",
  "perLabelExplanations": {
    "Right Atrium": "Receives deoxygenated blood from the superior and inferior vena cava.",
    "Left Atrium": "Receives oxygenated blood from the pulmonary veins.",
    "Right Ventricle": "Pumps deoxygenated blood to the lungs via the pulmonary artery.",
    "Left Ventricle": "Pumps oxygenated blood to the body via the aorta.",
    "Aorta": "The largest artery in the body, carrying oxygenated blood from the left ventricle.",
    "Pulmonary Artery": "Carries deoxygenated blood from the right ventricle to the lungs."
  }
}
```

## UX Considerations

- **Label Bank Layout**: Labels are displayed as draggable tiles in a scrollable bank (bottom or right side). Each tile is at least 48×48px with clear padding.
- **Drag Indication**: When long-pressed/grabbed, a label tile lifts slightly (shadow, scale) and opacity changes to show it's active.
- **Snap Visualization**: As the label approaches an anchor point, a faint circle or highlight appears, indicating the snap zone. When within radius, the label snaps with a smooth animation (200–300ms).
- **Feedback Colors**: Correctly placed labels can show a green check or highlight. Incorrectly placed labels show a red outline before returning to the bank.
- **Touch Target**: Minimum 48×48px for labels. On large images, ensure anchor points are spaced far enough to avoid mis-taps.
- **Mobile Optimization**: On narrow screens, use a side-by-side layout (image left, label bank right) or stack vertically with resizable sections.

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | **Maximum 4 labels**. Simple, familiar structures (body parts, plant anatomy, basic house/room objects). Large snap radius (40–50px) to minimize frustration. Large touch targets (56×56px+). No distractors—all labels belong. Feedback uses celebratory language and animations ("Great job!"). Correct labels remain visible and highlighted. |
| 11–13 | **6 labels**. Moderate complexity (organs, ecosystems, machinery, map features). Standard snap radius (30px). Standard touch targets (48×48px). 1–2 distractor labels to introduce selection. Feedback shows which labels are correct and brief descriptions. Encourages trying different placements. |
| 14–16 | **Up to 10 labels**. High complexity (cell organelles, chemical apparatus, detailed anatomies, historical sites). Tight snap radius (20–25px). Small touch targets acceptable for learners with fine motor control. 2–5 distractors to require real discrimination. Feedback includes per-label scientific or historical context. Scoring reflects accuracy (all correct = full points, partial correct = proportional points). |

## Lesson Placement

**Core Practice**: Deploy labeling immediately after teaching a new diagram or structure. Example: "We just learned about photosynthesis. Label the key structures of a chloroplast."

**Deep Engagement**: Combine with scenario-based questions (mechanic 15). Example: "Based on the passage about plant adaptation, label the xerophytic features on this desert plant."

**Cumulative Review**: Create multi-image labeling sequences where learners label multiple related diagrams in one session, building comprehensive understanding.

## Related Mechanics

- **Spatial Hotspot (Mechanic 13)**: Similar spatial task, but learners tap instead of drag. Hotspot is simpler (1 correct location); labeling has multiple (up to 10).
- **Matching Pairs (Mechanic 8)**: Can be combined—first match label text to descriptions, then place labels on image.
- **Multiple Choice (Mechanic 4)**: Use MC to teach structure names first, then labeling for application and spatial understanding.
- **Scenario-Based Question (Mechanic 15)**: Embed labeling within a narrative or case study for context.
