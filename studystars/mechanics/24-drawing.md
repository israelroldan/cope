# Drawing / Sketching

> Learners draw, label, or annotate on a digital canvas; expressions are peer-assessed or self-assessed, valuing creative and visual thinking alongside factual accuracy.

## Core Mechanic

The screen displays a prompt (e.g., "Draw the water cycle" or "Label the parts of a plant cell") and a large, touch-enabled digital canvas. The learner is given drawing tools: a pen, optional highlighter, eraser, and a color palette. The learner draws, sketches, or labels freely on the canvas. Most canvases are blank, though some include a background image (a diagram to label, an outline to fill, or a map to annotate) and an optional reference image (e.g., a photo of a Viking ship, a diagram of the water cycle).

As the learner draws, their strokes appear in real-time. An undo button (or undo gesture) allows revision. After finishing, the learner submits the drawing. Depending on the implementation, the drawing is either peer-assessed (classmates view and comment), self-assessed (learner rates their own work against a rubric), or reviewed by a teacher.

The interaction is tactile and expressive: drawing requires motor control and creativity, engaging learners who may struggle with text-based responses.

## Why It Works

**Drawing is a form of creative expression (Bloom Level 6).** Not all learners excel at writing, but many can visualize and draw concepts clearly. Drawing mechanics honor multiple intelligences and learning modalities.

**Visual representation deepens understanding.** When a learner draws a concept (the water cycle, cell division, historical events), they must think through the spatial relationships and sequences, often revealing gaps in understanding they wouldn't catch through text alone.

**Peer assessment builds community and mirrors real-world feedback.** Seeing how peers interpreted the same prompt, and offering feedback, develops critical observation and collaborative learning.

**Low-pressure creativity.** Unlike timed tests or standardized responses, drawing is inherently creative. There's no single "correct" drawing, reducing anxiety and encouraging engagement.

## Content Generation Spec

The AI must produce:
1. A **prompt** that is clear and suitable for visual representation.
2. Optionally, a **backgroundImageUrl** (e.g., a blank diagram to label, or a map outline).
3. Optionally, a **referenceImageUrl** (e.g., a photo or historical image for inspiration).
4. A **toolConfig** specifying colors, brush sizes, and available tools (pen, highlighter, eraser, shapes).
5. An **assessmentMode** (peer-review, self-assessment, rubric-based, or ungraded).
6. Optionally, a **rubric** if using rubric-based assessment.

For AI, generating creative drawing prompts is easy. Providing reference images is valuable. Auto-grading drawings is not feasible (visual analysis of learner sketches is unreliable); peer or teacher assessment is better.

### Example Output

```json
{
  "prompt": "Draw and label the water cycle. Show evaporation, condensation, precipitation, and collection. Use different colors for each stage.",
  "backgroundImageUrl": null,
  "referenceImageUrl": "https://example.com/water-cycle-diagram.png",
  "toolConfig": {
    "colors": ["black", "blue", "cyan", "gray", "white", "red", "orange", "yellow", "green", "purple"],
    "brushSizes": [2, 5, 10, 20],
    "tools": ["pen", "highlighter", "eraser", "shapes"]
  },
  "assessmentMode": "rubric-based",
  "rubric": [
    {
      "criterion": "All four stages labeled clearly",
      "maxPoints": 5
    },
    {
      "criterion": "Uses different colors for each stage",
      "maxPoints": 3
    },
    {
      "criterion": "Shows arrows or flow connecting stages",
      "maxPoints": 2
    },
    {
      "criterion": "Neat and organized",
      "maxPoints": 2
    }
  ]
}
```

## UX Considerations

- **Large, responsive canvas:** Ideally full-screen or near-full-screen, especially on tablets. Tablets are ideal for drawing; phones are less precise but still usable.
- **Accessible tool palette:** Color swatches and brush-size selector should be easily accessible (bottom toolbar, side palette, or toggle menu).
- **Haptic feedback:** On mobile, provide haptic feedback on pen touch and tool selection to make the interaction feel responsive.
- **Undo/Redo:** Essential feature. Learners make accidental strokes; easy undo encourages exploration and risk-taking.
- **Smooth rendering:** Brush strokes should render instantly with no lag. This is critical for engagement; laggy drawing frustrates learners.
- **Save/Export:** Allow learners to save or export their drawing as an image for later viewing or sharing.
- **Reference image positioning:** If a reference image is provided, position it beside the canvas (on wide screens) or above (on phones) so it's visible while drawing without obscuring the canvas.
- **Mobile stylus support:** If possible, support stylus input (Apple Pencil, Android stylus) for more precise drawing on tablets.

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | Free-form drawing with fun, imaginative prompts. Blank or simple outline canvas. 5 colors, 2–3 brush sizes. Tools: pen + eraser only. No strict rubric; focus on creativity and enjoyment. Prompt example: "Draw your favorite animal doing something silly" or "Draw what a friendly alien might look like." Peer feedback is celebratory and descriptive ('I like your bright colors!' 'This looks so happy!'). Estimated time: 60–90 seconds. |
| 11–13 | Structured drawing with labeling. Canvas may include a diagram outline (plant cell, weather system, historical scene). 8 colors, 3–4 brush sizes. Tools: pen, highlighter, eraser. Simple rubric (3–4 criteria) focusing on accuracy and clarity. Prompt example: "Label and color-code the parts of a plant cell" or "Draw and label the nitrogen cycle." Peer feedback focuses on accuracy and clarity ('Your labels are in the right places; you could make the arrows clearer'). Estimated time: 90–120 seconds. |
| 14–16 | Detailed annotation and analytical drawing. Blank or detailed background (map, diagram). 12+ colors, 4+ brush sizes. Tools: pen, highlighter, eraser, shapes (rectangles, circles, lines). Rubric (4–5 criteria) assessing accuracy, detail, organization, and analysis. Prompt example: "Sketch the major trade routes of the Silk Road, color-code by region, and annotate with key goods traded" or "Draw a detailed cross-section of Earth's layers, label them, and indicate approximate temperatures." Peer feedback is substantive and critical ('Your route is accurate; consider adding annotations about cultural exchange'). Estimated time: 120–180 seconds. |

## Lesson Placement

This mechanic works best in **Extension** or **Reflection** phases. It's a culminating activity where learners synthesize and creatively express understanding.

Can appear in **Deep Engagement** as a hands-on, exploratory activity that breaks up text-heavy lessons.

Avoid in **Hook** (less efficient for rapid engagement) or **Core Practice** (objective feedback is more valuable).

## Related Mechanics

- **23-open-ended:** Learner types rather than draws. Both are creative, but drawing may be more accessible for visual learners or those with writing challenges.
- **19-hot-text:** Learner identifies evidence vs. creating original representation.
- **24-drawing:** This mechanic.
