# Content Slideshow

> A swipeable sequence of 1-5 narrated content cards that teach concepts before an activity tests them. Like a Scenario (#15) without the questions — pure storytelling.

## Core Mechanic

The learner is presented with a short sequence of narrated slides — each containing a title, conversational narration (1-3 sentences), and an evocative image. They swipe or tap to advance through slides at their own pace. There is no assessment — the slideshow's job is to **teach**, not test. It fires `onComplete` when the learner reaches the last slide and taps "Next."

This is the **content delivery** half of the Pimpi lesson flow. In the Spark sequence, a content-slideshow is always followed by an activity that tests what was just taught. The slideshow's `factIds` and the following activity's `_factRefs` share at least one fact, guaranteeing the teach→test pairing.

### How it relates to Scenario (#15)

Scenario (#15) is a **self-contained** read→quiz unit: passage + embedded MC questions in a single component. Content Slideshow is the **unbundled** version: the teaching content is in the slideshow, and the testing is in whatever mechanic follows (could be MC, but also Sequence Reorder, Matching Pairs, True/False, or any of the 32+ mechanics).

| | Content Slideshow (#33) | Scenario (#15) |
|---|---|---|
| **Contains questions?** | No | Yes (1-4 MC questions) |
| **Scored?** | No (ungraded) | Yes (partial credit) |
| **What follows it?** | Any mechanic | Nothing (self-contained) |
| **Bloom's level** | Content delivery (pre-Remember) | Apply |
| **When to use** | As the content phase in the Spark lesson flow | As a standalone read+quiz activity |
| **Duration** | 10-45s (reading only) | 60-120s (reading + answering) |

Use Content Slideshow when the Spark flow needs to teach before testing with ANY mechanic. Use Scenario when you need a compact, self-contained passage+quiz unit (e.g., in spaced review or standalone practice).

## Why It Works

**Segmented Learning**: Rather than presenting a wall of text, breaking content into swipeable cards creates natural cognitive pauses. Each slide is one concept, one beat, one "oh interesting" moment. This mirrors the Grej of the Day pedagogy: reveal information in dramatic, paced fragments.

**Storytelling Over Exposition**: The narration is written as conversational storytelling, not encyclopedic prose. "3,000 years ago along the Nile, priests began a 70-day ritual..." is more engaging and memorable than "Mummification was a process lasting 70 days." Narrative anchoring strengthens encoding.

**Visual-Verbal Pairing**: Each slide pairs narration with an evocative image, leveraging dual-coding theory. The learner processes the concept through both language and imagery simultaneously, creating richer memory traces.

**Agency Through Pacing**: The kid controls the pace — they advance when ready. This microautonomy (vs. timed auto-advance) respects different reading speeds and lets the brain process before moving on.

**Seamless Teach→Test**: Because the slideshow is a mechanic like any other, the Spark player doesn't need special-case logic. It renders a content-slideshow, fires `onComplete`, then renders the next mechanic in the sequence. The entire Spark is a uniform array of mechanics.

## Content Generation Spec

The Spark generator produces content slideshows as part of the Spark sequence. Each slideshow is written **specifically to set up the activity that follows** — the narration isn't generic, it deliberately introduces the concepts, relationships, or sequence that the next mechanic will test.

### Narration Rules

1. **One concept per slide** — never cram two ideas into one slide
2. **Conversational tone** — as if a friend is telling you something cool. Use "you," rhetorical questions, vivid verbs
3. **Build across slides** — slide 2 assumes the kid absorbed slide 1. Each slide adds a layer
4. **Max ~80 words per slide** — if you need more, split into two slides
5. **Set up the next activity** — if a Sequence Reorder follows, the narration describes the steps. If Matching Pairs follows, the narration introduces the relationships. This is intentional, not coincidental.
6. **No quiz-like language** — never say "can you guess?" or "which one is correct?" — that's the activity's job

### Image Prompt Rules (Grej of the Day)

1. **Images only, no text overlaid** — the image is atmospheric, not informational
2. **Specific and evocative** — "golden sunlight filtering through papyrus reeds along the Nile, ancient Egyptian temple silhouette in background" not "ancient Egypt"
3. **One focal point per image** — match the slide's single concept
4. **Age-appropriate tone** — 8-10 gets playful/colorful imagery, 14-16 gets more sophisticated/atmospheric

### Example Output

```json
{
  "slides": [
    {
      "title": "Along the Nile",
      "narration": "3,000 years ago, along the banks of the Nile river, ancient Egyptian priests believed that the body needed to be preserved for the afterlife. Without it, the soul — called the 'ka' — would have nowhere to return.",
      "imagePrompt": "Sunset over the Nile river valley, golden light reflecting off water, silhouettes of ancient Egyptian temples and palm trees on the far bank, warm amber tones",
      "factIds": ["f1", "f2"]
    },
    {
      "title": "The 70-Day Ritual",
      "narration": "Mummification wasn't quick. It took a team of priests exactly 70 days to prepare a body. They had to remove organs, dry everything out with a special salt called natron, and wrap the body in hundreds of meters of linen strips.",
      "imagePrompt": "Ancient Egyptian priests in white linen robes working carefully over a ceremonial table in a torchlit stone chamber, jars of natron salt nearby, solemn atmosphere",
      "factIds": ["f3", "f4", "f5"]
    },
    {
      "title": "What They Kept",
      "narration": "Here's the strange part: they removed the lungs, liver, stomach, and intestines — but they left the heart. Why? They believed the heart was the seat of intelligence and would be weighed against a feather in the afterlife to judge the person's character.",
      "imagePrompt": "Close-up of ornate Egyptian canopic jars with animal-headed lids (jackal, falcon, baboon, human), golden light, hieroglyphics visible on the jars",
      "factIds": ["f6", "f7"]
    }
  ],
  "transition": "swipe-left"
}
```

This slideshow naturally sets up a **Sequence Reorder** activity ("Put the mummification steps in order") or a **Matching Pairs** activity ("Match each organ to its canopic jar") that follows it in the Spark sequence.

## UX Considerations

- **Slide indicator**: Dot pagination at bottom (e.g., ● ● ○ ○) showing current position
- **Navigation**: Swipe left to advance, swipe right to go back. Also support tap on right/left edges. Arrow buttons as fallback for accessibility.
- **Image area**: Top 40% of card. Shows placeholder frame with `[Image: {imagePrompt}]` until real image is generated.
- **Narration area**: Bottom 60%. Title in DM Sans Bold (18-22px), narration in DM Sans Regular (14-18px depending on age group). Left-aligned. Comfortable line spacing (1.5x).
- **Card treatment**: White or light cream background, rounded corners (16px), slight shadow — matches the post-it aesthetic but cleaner (these are "teaching" cards, not "interaction" cards)
- **Last slide**: The navigation affordance changes from a right-arrow to an orange "Got it!" or "Let's go!" button that fires `onComplete`
- **Entry animation**: First slide fades in. Subsequent slides swipe in from right.
- **No auto-advance**: The kid controls the pace. Never auto-advance slides.
- **Reading time hint** (optional): A subtle estimated reading time on slide 1 (e.g., "~15 sec read") — helps set expectations. Omit for ages 8-10.

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8-10 | **Max 2-3 slides**. Short narration (1-2 sentences, ~40 words per slide). Larger text (18px body). Vivid, playful image prompts with bright colors. Big "Got it!" button with bounce animation. Dot indicator uses colored dots. Simple vocabulary — no words they'd need a dictionary for. |
| 11-13 | **2-4 slides**. Standard narration (2-3 sentences, ~60 words). 16px body text. Mix of atmospheric and explanatory images. Standard "Next" arrow with "Got it!" on last slide. Can include one unfamiliar vocabulary word with context clues in the narration. |
| 14-16 | **2-5 slides**. Denser narration allowed (2-3 sentences, ~80 words). 16px body. More sophisticated, atmospheric imagery. May include brief quotes, data points, or specific dates in narration. Subtle arrow navigation. Can assume larger vocabulary. |

## Lesson Placement

**Hook / Warm-up**: A 1-2 slide slideshow right after the Grej hook, setting the scene before the first activity.

**Core Practice**: The primary use — 2-4 slides of storytelling that introduce concepts, immediately followed by an activity that tests them.

**Deep Engagement**: Longer 3-5 slide slideshows that build a narrative arc before a complex activity (e.g., Scenario, Categorization).

**Never in Reflection**: Content slideshows are teaching tools, not reflection tools. The reflection phase uses Poll, Open-Ended, or Explain to Pimpi.

## Related Mechanics

- **Scenario Question (#15)**: The self-contained version (passage + embedded questions). Use Scenario when you need a standalone read+quiz; use Content Slideshow when the Spark flow handles the activity separately.
- **Flashcard (#3)**: Both are swipeable cards, but flashcards are self-assessed recall. Content Slideshow is pure content delivery — no self-assessment.
- **All testing mechanics (#1-32)**: Content Slideshow is designed to precede any of them. Its `factIds` link to the following activity's `_factRefs`.
