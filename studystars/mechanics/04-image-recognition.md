# Image Recognition (Visual Identification)

> 3-4 images, select one matching text prompt. Visual association.

## Core Mechanic

A text prompt appears at the top of the screen (e.g., "Which of these is a llama?"). Below it are 3-4 image tiles arranged in a 2×2 grid (on mobile) or 1×3 row (on tablet/desktop). Each tile is a large, tappable square with rounded corners. The learner reads the prompt, scans the images, and taps the image they believe matches the prompt. Upon tapping, the selected tile scales slightly and gains a colored border (green if correct, red if incorrect). An explanation text appears briefly below, confirming the correct answer and providing context if requested. The learner then advances to the next item after 1-2 seconds. Points are awarded if the answer is correct.

The mechanic leverages visual processing to reduce cognitive load from reading. By presenting the question in words and the options as images, the activity suits learners with strong visual memory or those learning visual vocabulary (animal names, architectural styles, flags, etc.).

## Why It Works

Visual recognition activates multiple neural pathways: semantic memory (meaning of the word), visual memory (appearance of the object), and associative memory (linking the two). This multi-modal encoding results in richer memory traces. When learners see an image and label, they create a cross-modal link that supports faster and more flexible recall later.

For younger learners, image recognition reduces reading burden, allowing them to engage with vocabulary they may not yet read fluently. For older learners, the visual challenge (distinguishing between similar items) requires visual discrimination skills that transfer to real-world identification tasks.

## Content Generation Spec

The AI should generate text prompts that are matched with images. The correct image is unambiguous and matches the prompt directly. Distractors are plausible but distinct—they might be related objects (different animal, different monument) or visually similar but contextually different items. The AI can source images from royalty-free databases (e.g., Unsplash, Pexels, or generated via DALL-E) and ensure they are high-quality and centered.

Content shape:
- **prompt** (string): "Which of these is a sunflower?" or "Identify the Great Barrier Reef."
- **images** (object[]): Array of 3-4 image objects, each with a URL and alt-text.
  - **url** (string): Path or URL to image file (JPG, PNG).
  - **alt** (string): Accessibility alt-text ("A yellow sunflower with brown center in a field").
- **correctIndex** (integer): 0-based position of the correct image (before randomization).
- **explanation** (string, optional): "This is a sunflower, a large flowering plant in the daisy family. It's named for its tendency to face the sun (heliotropism). The other images show a rose, a daisy, and a tulip."
- **difficulty** (enum): "easy" for highly distinct images, "hard" for visually similar distractors.

### Example Output

```json
{
  "prompt": "Which of these is the Eiffel Tower?",
  "images": [
    {
      "url": "https://example.com/images/eiffel-tower.jpg",
      "alt": "The Eiffel Tower in Paris, a tall iron lattice monument with three levels"
    },
    {
      "url": "https://example.com/images/big-ben.jpg",
      "alt": "Big Ben clock tower in London, a Gothic Revival tower with ornate detailing"
    },
    {
      "url": "https://example.com/images/statue-liberty.jpg",
      "alt": "The Statue of Liberty in New York, a copper statue of a robed woman on a pedestal"
    },
    {
      "url": "https://example.com/images/colosseum.jpg",
      "alt": "The Colosseum in Rome, an ancient amphitheater with multiple arched levels"
    }
  ],
  "correctIndex": 0,
  "explanation": "The Eiffel Tower is the iconic wrought-iron monument in Paris, built for the 1889 World's Fair. Big Ben is in London, the Statue of Liberty is in New York, and the Colosseum is in Rome.",
  "difficulty": "easy",
  "tags": [
    "landmarks",
    "world-monuments",
    "geography",
    "architecture"
  ]
}
```

## UX Considerations

- **Grid layout**: 2×2 on portrait mobile (4 images total). 1×3 or 1×4 on landscape/tablets if needed. Ensure images are square or nearly square for consistent sizing.
- **Image sizing**: Each tile 120×120px minimum (per WCAG). On small phones, may be 100×100px if space requires. On tablets, 160×200px or larger.
- **Image quality**: High-resolution, centered images. Avoid overly zoomed-in or cropped images that obscure context.
- **Rounded corners**: 8-16px border radius on image tiles for modern, friendly appearance.
- **Feedback**: Immediate border highlight and scale animation on tap (within 150ms). Checkmark/X icon appears briefly.
- **Accessibility**: Every image requires alt-text for screen readers. Alt-text should describe the image clearly ("Yellow sunflower in a field", not just "flower").

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | 3 large images only (reduces cognitive load). Very distinct distractors (e.g., cat vs. dog vs. bird, not cat vs. tiger vs. lion). 150×150px tiles minimum. Optional text labels below each image (e.g., "Cat", "Dog", "Bird"). High-contrast, colorful images. Positive feedback tone. |
| 11–13 | 3-4 images with more nuanced distractors. 120×120px tiles standard. No text labels on images; prompt must do the work. Distractors can be items from the same category (e.g., different dog breeds, different monuments from the same country). Constructive explanation if wrong. |
| 14–16 | 4 images with challenging visual distinctions. Optional zoom function on tap to examine fine details. Timed variant (15-20s countdown). Explanation can be longer and include historical or scientific context. Can include artistic style distinctions or architectural details. |

## Lesson Placement

**Warm-up**: 2-3 image recognition items to activate visual memory and set a positive tone (quick wins).

**Post-content**: After introducing visual vocabulary or landmarks, 3-5 image items reinforce and test visual identification.

Not typically used for deep engagement or reflection—primarily a recognition and recall activity.

## Related Mechanics

- **Multiple Choice** (id: `multiple-choice`): Text-only variant. Image recognition is the visual equivalent.
- **Audio Recognition** (id: `audio-recognition`): Audio version of the same mechanic. Learner listens to audio cue and identifies from image or text options.
- **Matching Pairs** (id: `matching-pairs`): Can be combined with images (match image to image, or image to label).
