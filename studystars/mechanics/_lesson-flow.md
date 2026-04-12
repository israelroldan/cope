# Lesson Flow — The Pimpi Grej Experience

How content slideshows and activities weave together into a single lesson.

---

## The Core Insight

A Pimpi lesson is **not** "watch slides, then do quiz." It's a conversation between **learning** and **doing** — a content slideshow (mechanic #33) teaches something, then an activity immediately tests it, then the next slideshow builds on that understanding. The kid is never passive for more than 15 seconds.

This is Pimpi's interpretation of the **Grej of the Day** pedagogy: hook → micro-content → practice → reflection, but with the content and practice **interleaved**, not sequential.

**Key design decision**: Content slideshows are mechanic #33 (`content-slideshow`), not a special type. Every step in the Spark sequence is an activity with a `mechanicId`. The Spark player has ONE rendering path — no branching between "content" and "activity."

---

## The Rhythm

```
┌─────────────────────────────────────────────────┐
│  HOOK                                            │
│  Grej clue — creates information gap             │
│  "What did ancient Egyptians remove from         │
│   dead bodies... except for one organ?"          │
└──────────────────────┬──────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────┐
│  CONTENT SLIDESHOW 1 (mechanic #33)               │
│  1-3 narrated slides — sets the scene            │
│  "3,000 years ago in the Nile valley..."         │
└──────────────────────┬──────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────┐
│  ACTIVITY 1 — any mechanic                       │
│  Tests what was just taught                      │
│  e.g., True/False, Multiple Choice, Fill-blank   │
│  Bloom's: Remember                               │
└──────────────────────┬──────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────┐
│  CONTENT SLIDESHOW 2 (mechanic #33)               │
│  Goes deeper — process, cause-effect             │
│  "The mummification process took 70 days..."     │
└──────────────────────┬──────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────┐
│  💥 WOW MOMENT                                   │
│  Jaw-dropping fact, fullscreen treatment          │
│  "The brain? They pulled it out through the      │
│   nose with a hook!"                             │
└──────────────────────┬──────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────┐
│  ACTIVITY 2 — any mechanic                       │
│  Tests comprehension of the process              │
│  e.g., Sequence Reorder, Matching Pairs          │
│  Bloom's: Understand                             │
└──────────────────────┬──────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────┐
│  CONTENT SLIDESHOW 3 (mechanic #33)               │
│  Application / connection to today               │
│  "Modern scientists used CT scans to look        │
│   inside mummies without unwrapping them..."     │
└──────────────────────┬──────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────┐
│  ACTIVITY 3 — any mechanic                       │
│  Applies knowledge to new context                │
│  e.g., Scenario Question, Categorization,        │
│  Find-the-Error                                  │
│  Bloom's: Apply / Analyze                        │
└──────────────────────┬──────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────┐
│  REFLECTION                                      │
│  "Go Deeper" + "Explain to Pimpi"                │
│  - Poll: "What surprised you most?"              │
│  - Open-ended: Explain what you learned in       │
│    your own words (Pimpi listens, reacts)        │
│  - Optional: Confidence rating                   │
└──────────────────────┬──────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────┐
│  NEXT HOOK (cliffhanger)                         │
│  "Tomorrow: Why did they leave the heart in?"    │
└─────────────────────────────────────────────────┘
```

---

## Key Principles

### 1. Activities are NOT always multiple choice

Each testing activity slot can be filled by **any** of the 33 mechanics. The content slideshow (#33) delivers the teaching content, then the activity that follows can be anything:

- Slideshow teaches about organ removal → **True/False** ("The heart was removed during mummification")
- Slideshow teaches the 5-step process → **Sequence Reorder** (put the steps in order)
- Slideshow teaches materials used → **Matching Pairs** (match material to purpose: natron → drying, linen → wrapping)
- Slideshow presents a scenario → **Find-the-Error** (spot what's wrong in this description of mummification)
- Slideshow shows quantities → **Numerical Slider** (how many days did mummification take?)

The testing activity type is selected based on what the slideshow taught and what `seedTypes` the underlying facts carry.

### 2. Content slideshows and activities are paired

Each content slideshow is linked to the testing activity that follows it. The activity MUST test something from that specific slideshow, not from a previous one. This is what makes the interleaving feel like a conversation rather than a random quiz.

```
slideshow[0].content.slides[*].factIds ∩ activity[0]._factRefs ≠ ∅
```

### 3. Bloom's ascends through the lesson

The lesson naturally progresses up Bloom's taxonomy:

| Position | Bloom's Level | Typical Content Card | Typical Activity |
|----------|--------------|---------------------|-----------------|
| 1 | Remember | Scene-setting, key facts | True/False, Multiple Choice, Flashcard |
| 2 | Understand | Process, cause-effect, relationships | Matching Pairs, Sequence Reorder, Fill-in-Blank |
| 3 | Apply/Analyze | Application, connection, deeper analysis | Scenario Question, Categorization, Find-the-Error, Compare-Contrast |
| Reflection | Evaluate/Create | — | Poll, Confidence Rating, Open-Ended ("Explain to Pimpi") |

### 4. WOW moments are punctuation, not content

WOW moments sit between a content slideshow and an activity. They don't introduce new testable facts — they're emotional peaks that make the kid go "wait, really?!" Their purpose is **engagement**, not **assessment**. The activity that follows tests the content slideshow before the WOW, not the WOW itself.

Exception: if the WOW fact IS the content (e.g., "the brain was pulled out through the nose"), it can absolutely be tested. The point is the WOW moment's *presentation* is special — fullscreen, dramatic, maybe animated — but it doesn't disrupt the teach→test pairing.

### 5. The lesson is 3-5 minutes, not 15

Pimpi lessons are micro-lessons. The target is:

| Component | Duration | Count |
|-----------|----------|-------|
| Hook | 5-10s | 1 |
| Content slideshows (#33) | 10-45s each (1-5 slides) | 2-4 |
| WOW moments | 5-8s each | 1-2 |
| Testing activities | 15-40s each | 2-4 |
| Explain to Pimpi | 60-120s (5-10 turns) | 1 |
| Next hook | 5s | 1 |
| **Total** | **3-6 min** | |

---

## How This Changes the Lesson Object

The interleaved flow uses a single **sequence** array where every step is an activity with a `mechanicId`. Content slideshows are mechanic #33, WOW moments and reflections use their own types (these may become mechanics too in the future, but for now they retain their types for clarity):

```json
{
  "lessonId": "uuid",
  "topic": "Ancient Egypt: Mummification",
  "ageGroup": "11-13",
  "estimatedDuration": "4min",
  "factSheetVersion": 1,

  "hook": {
    "clueText": "What did ancient Egyptians remove from dead bodies... except for one organ?",
    "imagePrompt": "mysterious silhouette of an Egyptian sarcophagus, golden light"
  },

  "sequence": [
    {
      "type": "activity",
      "position": 1,
      "mechanicId": "content-slideshow",
      "mechanicName": "Content Slideshow",
      "bloomLevel": "remember",
      "content": {
        "slides": [
          {
            "title": "Along the Nile",
            "narration": "3,000 years ago along the Nile river, ancient Egyptians believed the body needed to be preserved for the afterlife...",
            "imagePrompt": "Nile river valley at sunset, ancient Egyptian temples in background",
            "factIds": ["f1", "f2"]
          }
        ],
        "transition": "swipe-left"
      },
      "_factRefs": ["f1", "f2"]
    },
    {
      "type": "activity",
      "position": 2,
      "mechanicId": "true-false",
      "mechanicName": "True or False",
      "bloomLevel": "remember",
      "content": { "..." : "conforms to true-false contentSchema" },
      "_factRefs": ["f1"]
    },
    {
      "type": "activity",
      "position": 3,
      "mechanicId": "content-slideshow",
      "mechanicName": "Content Slideshow",
      "bloomLevel": "remember",
      "content": {
        "slides": [
          {
            "title": "The 70-Day Ritual",
            "narration": "Mummification wasn't quick. It took a team of priests exactly 70 days...",
            "imagePrompt": "Egyptian priests performing mummification ritual in torchlit chamber",
            "factIds": ["f3", "f4"]
          },
          {
            "title": "What They Kept",
            "narration": "They removed the lungs, liver, stomach, and intestines — but they left the heart...",
            "imagePrompt": "Ornate Egyptian canopic jars with animal-headed lids, golden light",
            "factIds": ["f5", "f6"]
          }
        ],
        "transition": "swipe-left"
      },
      "_factRefs": ["f3", "f4", "f5", "f6"]
    },
    {
      "type": "wow",
      "position": 4,
      "fact": "They removed the brain by inserting a hook through the nose and pulling it out piece by piece!",
      "factId": "f7",
      "treatment": "fullscreen-dramatic"
    },
    {
      "type": "activity",
      "position": 5,
      "mechanicId": "sequence-reorder",
      "mechanicName": "Sequence Reorder",
      "bloomLevel": "understand",
      "content": { "..." : "conforms to sequence-reorder contentSchema" },
      "_factRefs": ["f3", "f4", "f5"]
    },
    {
      "type": "activity",
      "position": 6,
      "mechanicId": "content-slideshow",
      "mechanicName": "Content Slideshow",
      "bloomLevel": "remember",
      "content": {
        "slides": [
          {
            "title": "Inside a Mummy",
            "narration": "Today, scientists use CT scanners to peek inside mummies without unwrapping them...",
            "imagePrompt": "modern CT scan of an ancient mummy, split view ancient/modern",
            "factIds": ["f8", "f9"]
          }
        ],
        "transition": "fade"
      },
      "_factRefs": ["f8", "f9"]
    },
    {
      "type": "activity",
      "position": 7,
      "mechanicId": "matching-pairs",
      "mechanicName": "Matching Pairs",
      "bloomLevel": "apply",
      "content": { "..." : "conforms to matching-pairs contentSchema" },
      "_factRefs": ["f3", "f5", "f8"]
    },
    {
      "type": "reflection",
      "position": 8,
      "mechanicId": "poll",
      "content": {
        "question": "What surprised you most about mummification?",
        "options": [
          "The brain removal through the nose",
          "That it took 70 days",
          "That they left the heart in",
          "That we can scan mummies with CT"
        ]
      }
    },
    {
      "type": "reflection",
      "position": 9,
      "mechanicId": "open-ended",
      "content": {
        "prompt": "Explain to Pimpi: Why did ancient Egyptians mummify their dead?",
        "pimpiReaction": "curious"
      }
    }
  ],

  "nextHook": {
    "clueText": "Tomorrow: Why did they leave the heart inside? What did they believe it could do?",
    "nextTopic": "ancient-egypt-afterlife"
  }
}
```

Notice: every content delivery step is now `mechanicId: "content-slideshow"` — the Spark player resolves it through `MechanicRenderer` just like `true-false` or `sequence-reorder`. No branching logic needed.

---

## How This Relates to Mechanic #15 (Scenario) and #33 (Content Slideshow)

Mechanic #33 (Content Slideshow) is the **unbundled** content delivery mechanism — it teaches, then a separate activity tests. Mechanic #15 (Scenario) is the **self-contained** version: passage + embedded MC questions in one component. They serve different purposes:

| | Content Slideshow (#33) | Scenario (#15) |
|---|---|---|
| **Contains questions?** | No — the next mechanic in the sequence handles testing | Yes — 1-4 MC questions embedded |
| **Scored?** | No (ungraded) | Yes (partial credit) |
| **What follows it?** | Any mechanic | Nothing (self-contained) |
| **Use when** | Main Spark flow — teach then test with any mechanic | Standalone read+quiz, spaced review, hypotheticals |

Both can appear in the same Spark. A Content Slideshow teaches the main content, and later a Scenario presents a hypothetical application ("Imagine you are an Egyptian priest...") with its own embedded questions.

---

## Pipeline Integration

The Spark generator (Stage 2 in `_pipeline.md`) handles all interleaving in a single AI call. It reads the age-agnostic fact sheet, filters by complexity tier for the target age group, and produces the complete `sequence[]` array — no separate assembly step needed. Stage 2 runs three times per fact sheet (once per age band: 8-10, 11-13, 14-16), producing three genuinely different Sparks from the same knowledge base.

See `_spark-of-the-day.md` for the full Spark schema, generator prompt, and complexity filtering rules.

---

## "Explain to Pimpi" — The Reflection Mechanic

The closing reflection is a multi-turn conversation where the kid explains what they learned to Pimpi (the mascot). This is the most powerful learning moment:

- **Generation effect**: Producing an explanation strengthens memory far more than recognition or recall
- **Metacognition**: The learner must assess what they actually understood vs. what they just read
- **Emotional anchoring**: Talking "to" Pimpi makes it feel like helping a friend, not answering a test

This uses a **two-layer architecture**: Pimpi (the visible character — reacts, celebrates, asks follow-ups) and the Observer (a silent assessment LLM — tracks which facts were explained, missed, or confused). The Observer whispers signals to Pimpi so it can steer the conversation toward gaps without breaking character. Conversations are capped at 5-10 turns depending on age group.

Full spec including both prompt templates, conversation flow, and comprehension snapshot format is in `_spark-of-the-day.md`.

---

## Minimum Viable Lesson Flow

For the MVP, the simplest valid lesson is:

```
Hook → Content Slideshow (1-2 slides) → Activity → Reflection → Next Hook
```

That's 1 content slideshow, 1 testing activity, 1 reflection. About 90 seconds. This is the atomic unit that the pipeline must be able to produce reliably before scaling to the full 3-slideshow flow.
