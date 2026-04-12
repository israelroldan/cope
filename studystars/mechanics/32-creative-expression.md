# Creative Expression (Pictionary/Audio/Video)

> Learners draw, record audio, or record video to demonstrate understanding. Peers guess or evaluate responses, adding collaborative assessment.

## Core Mechanic

A learner receives a prompt (e.g., "Draw the water cycle," "Explain photosynthesis in 30 seconds," "Record your pronunciation of these three words"). Depending on the media type, they either:
- **Draw** on a canvas (using brush, colors, shapes) to visually represent the concept.
- **Record audio** (voice note, explanation, read-aloud) to demonstrate understanding verbally.
- **Record video** (screen, body, whiteboard) to show a full explanation or demonstration.

After creation, peers view the submission and either **guess** what the concept is (Pictionary-style, relevant for drawings) or **evaluate** using a rubric (relevant for audio/video). Peer guesses are submitted, and the original creator gets feedback ("3 people guessed 'water cycle' correctly!"). For evaluated submissions, peers rate clarity, accuracy, and creativity on a simple scale (1–5 stars or rubric dimensions), and the creator receives summary feedback (e.g., "Average clarity: 4.5/5").

The mechanic emphasizes peer collaboration and multimodal expression: different learners excel at different modes (some are strong visual thinkers, others are articulate speakers, others are confident video presenters).

## Why It Works

Creative expression activates the Bloom's taxonomy "Create" level: learners must internalize knowledge deeply enough to extemporaneously produce a representation of it. Multimodal expression accommodates diverse learning styles and abilities (kinesthetic learners thrive with drawing, auditory learners with recording).

Peer guessing and evaluation provide authentic audience (beyond the teacher), which increases motivation and accountability. The social nature of collaborative assessment (peers voting, commenting) builds community and teaches evaluation skills.

Cognitively, the act of creating a representation (drawing, explaining) externalizes internal understanding, making misconceptions visible and correctable. Recording one's voice or video also allows learners to self-monitor and self-correct (they can replay and hear themselves).

However, this mechanic requires psychological safety: learners must feel comfortable sharing creative work. Teacher modeling and a supportive culture are essential.

## Content Generation Spec

The AI must generate:
1. **Creative prompts**: Open-ended, tied to lesson content, accessible to diverse expression modes.
2. **Guessing/evaluation criteria**: Rubric dimensions for peer feedback.
3. **Example responses** (optional): Teacher-created or exemplar submissions to set expectations.

### Example Output

```json
{
  "prompt": "Draw how plants use sunlight to make food (photosynthesis).",
  "mediaType": "drawing",
  "maxDuration": null,
  "peerGuessing": true,
  "peerVoting": false,
  "rubric": {
    "criteria": [
      {
        "name": "Clarity",
        "description": "How easy is it to understand what the drawing shows?",
        "scale": "1-5"
      },
      {
        "name": "Accuracy",
        "description": "Does the drawing correctly represent photosynthesis?",
        "scale": "1-5"
      },
      {
        "name": "Creativity",
        "description": "Is the approach unique or clever?",
        "scale": "1-5"
      }
    ]
  },
  "exampleResponse": {
    "type": "image",
    "url": "exemplar-photosynthesis-drawing.png",
    "description": "A drawing showing the sun, a plant with leaves, arrows pointing from sun to plant, and a simple equation (sun + water + CO2 = glucose)."
  }
}
```

## UX Considerations

**Drawing Mode**
- **Canvas**: Full-screen white or light canvas (min 300×400px on mobile, 600×600px on tablet).
- **Tools**:
  - Color palette (10–20 colors) at top or side.
  - Brush size slider (small, medium, large).
  - Eraser button.
  - Undo / Clear buttons.
  - Fill bucket (optional).
- **Feedback**: Brush preview on tap. Smooth, responsive drawing (low latency).
- **Time limit** (if applicable): Optional timer (30–120s), displayed in corner.
- **Save/Submit**: Large "Save Drawing" button (56×56 px), disabled until content present.

**Audio Mode**
- **Record button**: Large, center (80×80 px), red to indicate "recording."
- **Timer**: Shows elapsed time (0:00 / 1:00).
- **Waveform visualization**: Optional, shows real-time audio input.
- **Pause/Resume** buttons (if supporting mid-recording).
- **Playback**: After recording, "Play Back" button lets learner review before submitting.
- **Rerecord**: "Retake" button to start over.
- **Submit**: "Submit Audio" button.

**Video Mode**
- **Camera view**: Full-screen preview of learner's face or screen (if screen-recording).
- **Record button**: Large, center, red.
- **Elapsed timer** (top corner).
- **Permissionsprompter**: "Allow camera and microphone?" (first time).
- **Playback** (after recording): Thumbnail + play button. Learner can review before submitting.
- **Rerecord** / **Submit** buttons.

**Peer Guessing Interface** (for drawing)
- **Large drawing displayed** (full screen or 80% of screen).
- **Text input field**: "What concept is this drawing?" (prompt shown above).
- **Submit guess** button.
- **Feedback overlay**: "Your guess was correct!" or "Correct guesses: 12 out of 18" (after all submissions).

**Peer Evaluation Interface** (for audio/video)
- **Playback widget**: Full-screen audio/video player with standard controls (play, pause, scrub).
- **Below: Rubric evaluation cards**, one per criterion.
- **Each card has a star or slider** (1–5), with description.
- **Optional**: Text comment field ("What did you especially like?").
- **Submit** button.

**Mobile Optimization**
- **Portrait orientation** primary (natural for drawing and voice recording).
- **Landscape** supported on tablets (wider canvas for drawing).
- **Touch-friendly**: All buttons 48×48px minimum. No tiny sliders or precise taps required.
- **Lazy loading**: If gallery of submissions, load thumbnails as user scrolls.

**Accessibility**
- **Drawing**: Alt-text placeholder ("Your drawing of [prompt]").
- **Audio**: Transcript generated (optional, auto-generated via speech-to-text) and displayed.
- **Video**: Captions (auto-generated or manually added by creator).
- **Color**: Not the only cue; use labels (e.g., "Blue brush" not just a blue button).

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | **Drawing only.** Simple prompts with visual references (images, emojis as hints). No time pressure or generous time (120+ seconds). Peer guessing with teacher moderation (teacher shows best guesses). No rubric; focus on celebration ("I like your colors!" type comments). Exemplar drawings shown before creation to scaffold. |
| 11–13 | **Drawing + audio.** Moderate prompts. Time limits (30–60s for audio, 60–90s for drawing). Simple peer rubric (2–3 dimensions: Clarity, Accuracy, Creativity). Guessing enabled for drawings. Optional text comments. Transcripts for audio submissions (auto-generated). Teacher reviews submissions before peer access (safety). |
| 14–16 | **All media types.** Complex prompts with sub-requirements. Strict time limits (15–45s for audio/video, 60–120s for drawing). Multi-criteria rubric (4–5 dimensions). Mandatory peer comments (50+ characters, specific). Optional voice emphasis metrics (for pronunciation activities: fluency, accent, stress). Trading/comparison features (view peer submissions side-by-side, compare rubric scores). Optional group presentations. |

## Lesson Placement

**Primary: Extension or Reflection**
- **Extension**: After core content and guided practice, learners apply and express understanding creatively.
- **Reflection**: End-of-lesson synthesis where learners consolidate and articulate what they've learned.

Can also appear in **project-based learning** (multi-day or multi-week) where creative expression is a deliverable, or as a **formative assessment** (low-stakes, teacher and peer feedback to inform next steps).

## Related Mechanics

- **Brainstorm** (mechanic 25): Both open-ended, divergent thinking. Brainstorm = ideas, Creative Expression = multimodal representation.
- **Peer Review** (mechanic 22): Creative expression generates artifacts for peer review.
- **Open Response** (mechanic 18): Similar freetext; Creative Expression adds multimodal and peer guessing.
- **Discussion** (mechanic 24): Can follow creative expression (peer presentations and discussion of creative work).
