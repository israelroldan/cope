# Content Generation Pipeline — StudyStars

How a topic becomes three playable Sparks.

---

## Overview

```
                         ┌─────────────────────┐
                         │    Topic (noun)      │
                         │  "Mummification"     │
                         └──────────┬───────────┘
                                    │
                           Stage 1  │  RESEARCH (one pass)
                                    ▼
                         ┌─────────────────────┐
                         │    Fact Sheet        │
                         │  (age-agnostic)      │
                         │                      │
                         │  facts (core/inter/  │
                         │  advanced), sequences,│
                         │  pairs, quantities,  │
                         │  vocabulary, wow,    │
                         │  misconceptions      │
                         └──────────┬───────────┘
                                    │
                           Stage 2  │  LESSON DESIGN (×3 age bands)
                          ┌─────────┼──────────┐
                          ▼         ▼          ▼
                   ┌───────────┐ ┌──────────┐ ┌───────────┐
                   │ Spark     │ │ Spark    │ │ Spark     │
                   │ (8-10)    │ │ (11-13)  │ │ (14-16)   │
                   │           │ │          │ │           │
                   │ simpler   │ │ standard │ │ deeper    │
                   │ vocab,    │ │ hook,    │ │ vocab,    │
                   │ fewer     │ │ 3-4      │ │ more      │
                   │ facts,    │ │ activi-  │ │ facts,    │
                   │ 2-3       │ │ ties     │ │ 3-4       │
                   │ activities│ │          │ │ activities│
                   └─────┬─────┘ └────┬─────┘ └─────┬─────┘
                         │            │              │
                         └─────┬──────┘──────────────┘
                               │
                      Stage 3  │  REFINE (optional)
                               ▼
                    ┌──────────────────────┐
                    │  Refined Spark(s)    │
                    └──────────────────────┘
```

**Admin manages N topics → N fact sheets → N×3 playable Sparks.**

The fact sheet is the editorial object. Topics are nouns ("Mummification", "Photosynthesis", "The Solar System") — not questions. The Spark generator turns each topic into an age-appropriate lesson with its own hook, narration style, vocabulary, and mechanics.

---

## Stage 1: Topic → Fact Sheet (one pass, age-agnostic)

**Input:** Topic string (noun) + optional subtopic
**Output:** A complete fact sheet matching `_fact-sheet-schema.json`
**Model:** Best available (Claude Opus or equivalent) — fact quality is everything
**Runs:** Once per topic. NOT per age group.

The AI researches the topic and produces the structured knowledge object. Facts are tagged with `complexity` tiers instead of targeting a specific age group:

- **core** — suitable for all ages (8-16). Essential concepts. The Spark generator MUST include these.
- **intermediate** — suitable for ages 11+. More nuanced, uses slightly specialized vocabulary.
- **advanced** — suitable for ages 14+ only. Technical details, advanced connections.

### What the fact sheet contains

Pure knowledge, no lesson design:

- **facts[]** — 10-25 core facts, each tagged with `seedTypes` and `complexity`
- **wowFacts[]** — IDs of facts that qualify as jaw-dropping WOW moments (should work across all ages)
- **misconceptions[]** — plausible wrong beliefs (become distractors)
- **sequences[]** — ordered processes, timelines, causal chains
- **pairs[]** — term↔definition, cause↔effect, person↔achievement relationships
- **quantities[]** — numerical facts with estimation ranges
- **categories[]** — groupings for sorting activities
- **vocabulary[]** — key terms with definitions, pronunciation, and complexity tags
- **spatialElements[]** — items with locations on maps/diagrams
- **comparisons[]** — pairs of things to compare and contrast

### What the fact sheet does NOT contain

- ~~ageGroup~~ → the fact sheet is age-agnostic. Age adaptation is a Spark concern.
- ~~hook / clue~~ → Spark generator writes age-appropriate hooks
- ~~narrative slides~~ → Spark generator writes content slideshows
- ~~reflection prompts~~ → Spark generator designs these
- ~~closing cliffhanger~~ → Spark generator writes nextHook

### Why age-agnostic?

If you generate separate fact sheets per age group, the underlying FACTS can diverge — different facts, different sequences, different wow moments. Now your three age-group Sparks are teaching different things about the same topic. That's a content management nightmare and a pedagogical problem.

Instead: one fact sheet with all the knowledge, tagged by complexity. The Spark generator selects the right subset:

| Age Group | Uses facts tagged... | Typical fact count | Typical vocabulary |
|-----------|---------------------|-------------------|-------------------|
| 8-10 | `core` only | 8-10 facts | Simple definitions, no jargon |
| 11-13 | `core` + `intermediate` | 10-15 facts | Standard vocab, some technical terms |
| 14-16 | `core` + `intermediate` + `advanced` | 12-20 facts | Full vocabulary, technical language |

The `coreFact: true` flag guarantees certain facts appear in ALL three Sparks — the generator adapts the language, not the content.

### Quality requirements

- **Factual accuracy is non-negotiable.** Flag uncertain facts with `source: "NEEDS_VERIFICATION"` and lower the `qualityScore`.
- **WOW facts are curated, not generic.** "The pyramids are big" is not a WOW. "The Great Pyramid was the tallest man-made structure for 3,800 years" is.
- **WOW facts must work across ALL ages.** A jaw-dropping fact is jaw-dropping whether you're 8 or 16.
- **Misconceptions are plausible.** Things a smart kid might actually believe.
- **seedTypes are pre-tagged.** Each fact declares what activities it can feed. No guesswork downstream.
- **Complexity tiers are honest.** Don't mark everything as "core" — an 8-year-old genuinely can't handle the chemical formula for natron.
- **Vocabulary has complexity tags.** "Mummy" is core, "natron" is intermediate, "desiccant" is advanced.
- **Topic is a noun.** "Mummification" not "Why did Egyptians wrap their dead?"

### Prompt template (Stage 1)

```
You are a curriculum researcher creating a structured, age-agnostic fact sheet for a micro-learning platform for kids (ages 8-16).

Topic: {{TOPIC}}
{{#if SUBTOPIC}}Focus area: {{SUBTOPIC}}{{/if}}

Generate a complete fact sheet following this JSON schema exactly:

<schema>
{{FACT_SHEET_SCHEMA}}
</schema>

Requirements:
1. Generate 12-20 core facts covering the topic comprehensively.
2. Tag each fact with a complexity tier:
   - "core" — essential, understandable by an 8-year-old with simple language
   - "intermediate" — more nuanced, appropriate for 11+
   - "advanced" — technical or detailed, for 14+ only
3. Aim for roughly: 5-8 core, 4-6 intermediate, 3-5 advanced facts.
4. Mark 3-5 facts as coreFact: true — these MUST appear in all age-group lessons.
5. Flag at least 2 as WOW facts — genuinely jaw-dropping, effective across all ages.
6. Include 3-5 plausible misconceptions kids of any age might believe.
7. Generate at least 1 sequence (timeline, process, or causal chain) with 4-6 items.
8. Generate 5-10 paired relationships.
9. Generate 3-5 numerical quantities with estimation ranges.
10. Generate at least 2 category groupings with 3+ items each.
11. Include key vocabulary with definitions, pronunciation guides, and complexity tags.
12. Tag every fact with all applicable seedTypes.
13. If uncertain about any fact, set source: "NEEDS_VERIFICATION" and lower qualityScore.

IMPORTANT:
- The topic is a NOUN, not a question. Write facts about the subject, not answers to a specific question.
- The fact sheet is pure research — no hooks, no narrative, no lesson flow decisions.
- Write facts at a neutral reading level. The Spark generator adapts vocabulary per age group.
- It must be internally consistent: no contradictions between facts, sequences, pairs, or misconceptions.
- Include metadata.factCount with the breakdown by complexity tier.

Output valid JSON only.
```

---

## Stage 2: Fact Sheet → Spark (×3 age bands)

**Input:** Fact sheet + target age group + available mechanic specs + lesson flow rules
**Output:** A complete Spark matching the schema in `_spark-of-the-day.md`
**Model:** Best available — this is lesson design, requires creative + pedagogical judgment
**Runs:** Three times per fact sheet — once per age band (8-10, 11-13, 14-16)

This is where all lesson design happens. The Spark generator reads the fact sheet, filters by complexity tier for the target age, and makes every decision:

1. **Hook**: Writes an age-appropriate Grej-style clue from the most intriguing facts
2. **Content slideshows**: Chunks facts into 2-4 slideshow sequences with storytelling narration adapted to the age group's reading level
3. **Activities**: Selects mechanics based on seedTypes, respects age adaptations, generates content matching each mechanic's `contentSchema`
4. **WOW placement**: Decides where wow moments land for maximum impact
5. **Reflection**: Designs the poll and "Explain to Pimpi" prompt
6. **Pimpi seed prompt**: Primes the mascot with topic knowledge, personality rules, and conversation guardrails
7. **Next hook**: Writes the cliffhanger for tomorrow's Spark

### Fact filtering by age

Before generating, the Spark generator filters the fact sheet:

```
8-10:  facts.filter(f => f.complexity === 'core')
11-13: facts.filter(f => f.complexity !== 'advanced')
14-16: facts (all)
```

The `coreFact: true` facts appear in all three Sparks — the generator adapts the narration language, not the facts themselves.

### How the three Sparks differ

| Dimension | 8-10 | 11-13 | 14-16 |
|-----------|------|-------|-------|
| **Facts used** | core only (5-8) | core + intermediate (10-15) | all (12-20) |
| **Hook style** | Simple wonder ("Why did they...?") | Intriguing mystery ("What did they pull out through...?") | Sophisticated provocation ("What can a CT scan reveal...?") |
| **Narration** | Short sentences, everyday words, playful tone | Standard vocabulary, conversational but precise | Can use technical terms, denser narration |
| **Slideshow slides** | 1-2 per slideshow, ~40 words each | 2-3 per slideshow, ~60 words each | 2-4 per slideshow, ~80 words each |
| **Activities** | 2-3, simpler mechanics (T/F, MC, slider) | 3, mix of simple + moderate (matching, reorder) | 3-4, full range (scenario, categorization, ranking) |
| **Vocabulary** | core terms only | core + intermediate terms | all terms |
| **Pimpi tone** | Very warm, lots of exclamation, simple follow-ups | Warm but more curious, slightly deeper questions | Friendly but more peer-like, asks for reasoning |
| **maxTurns** | 5-6 | 6-8 | 8-10 |

### Activity selection logic

A Spark uses 2-4 activities (not all 34 mechanics). Selected to:

1. **Ascend Bloom's.** Remember → Understand → Apply (minimum)
2. **Match seedTypes.** Only use mechanics whose required seedTypes exist in the filtered fact set
3. **Vary interaction.** Don't put two tap-based mechanics back-to-back. Mix tap, drag, type, slide.
4. **Respect age adaptations.** Check each mechanic's `ageAdaptations` for the target age group
5. **No spoilers.** Follow the no-spoiler constraints in mechanic specs (no ordinal labels, no visible ranking values)

**Default 3-activity progression:**

| Slot | Bloom's | Typical Mechanics | Fallback |
|------|---------|------------------|----------|
| After slideshow 1 | Remember | true-false, multiple-choice | flashcard |
| After slideshow 2 | Understand | matching-pairs, sequence-reorder | fill-in-blank-wordbank |
| After slideshow 3 | Apply+ | scenario, categorization, find-the-error | numerical-slider |

After activities: poll + "Explain to Pimpi" for reflection.

### Content slideshow ↔ activity pairing

Every content slideshow is linked to the activity that follows:

```
slideshow.content.slides[*].factIds  ∩  activity._factRefs  ≠  ∅
```

The slideshow teaches facts, the activity tests those same facts. The Spark generator writes slideshow narration that naturally sets up the activity — e.g., a slideshow describing a process leads into a sequence-reorder activity.

### Prompt template (Stage 2)

See the full Spark Generator Prompt in `_spark-of-the-day.md`.

### Running Stage 2 three times

The Spark generator runs as three independent calls, NOT one call that produces three Sparks. This is important because:

1. Each call gets the full context window dedicated to one age group
2. The hooks, narration, and activities are genuinely different — not just vocabulary swaps
3. Failure in one age group doesn't block the others
4. You can regenerate a single age band without touching the others

```
// Pseudocode
const factSheet = await generateFactSheet(topic);

const sparks = await Promise.all([
  generateSpark(factSheet, '8-10', mechanicSpecs),
  generateSpark(factSheet, '11-13', mechanicSpecs),
  generateSpark(factSheet, '14-16', mechanicSpecs),
]);
```

---

## Stage 3: Refine (Optional — Human or AI)

The refinement loop. Three modes:

### 3a: AI Self-Review

A second AI pass reviews each Spark for:
- **Factual consistency:** Do content slideshows and activities contradict each other?
- **Difficulty curve:** Does Bloom's level ascend through the sequence?
- **Age appropriateness:** Is the vocabulary right for the target age? Are mechanics age-adapted?
- **Distractor quality:** Plausibly wrong, or obviously silly?
- **Coverage:** Were WOW facts used effectively? Were coreFacts included?
- **Cross-age consistency:** Do all three Sparks teach the same core concepts?
- **Engagement:** Is the hook intriguing? Does the cliffhanger create a loop?
- **Pimpi quality:** Does the seed prompt give Pimpi enough context?

Output: Issues with suggested fixes, OR an auto-corrected Spark.

### 3b: Human Review (Teacher/Editor)

A human reviews in a UI that shows:
- The fact sheet with inline editing (editing here affects ALL three Sparks)
- Each Spark (tab per age group) with narration preview
- Each activity in its interactive form (using the prototypes!)
- The Pimpi seed prompt (editable per age group)
- Flag buttons: "wrong fact", "boring question", "too easy", "too hard"

Fact sheet changes trigger regeneration of affected Spark components (via `_factRefs`).

### 3c: AI Refinement on Request

Natural language instructions:
- "Make the 8-10 questions easier"
- "Add more about organ preservation"
- "The second distractor is too obvious in the 14-16 version"
- "Change the topic focus to daily life, not burial"

**Two paths depending on the change:**

- **Fact-level change** ("add more about X"): Update the fact sheet (JSON Merge Patch), then regenerate affected Sparks.
- **Spark-level change** ("make the hook more dramatic"): Update one Spark directly, no fact sheet change needed.
- **Cross-age change** ("this fact should be core, not advanced"): Update the fact's complexity in the fact sheet, then regenerate the Sparks that gain/lose that fact.

### Prompt template (Stage 3c — fact-level refinement)

```
You are refining a fact sheet. Here is the current version:

<fact-sheet>
{{CURRENT_FACT_SHEET}}
</fact-sheet>

The user requested this change:
"{{USER_INSTRUCTION}}"

Apply the change. Return ONLY modified sections using JSON Merge Patch (RFC 7396).

Rules:
1. Maintain internal consistency — update sequences, pairs, misconceptions that reference changed facts.
2. Don't remove WOW facts unless explicitly asked.
3. Preserve fact IDs so downstream components can detect what changed.
4. New facts get new IDs (continuing from highest existing).
5. Increment metadata.version.
6. If changing a fact's complexity tier, note which age-group Sparks are affected.
7. coreFact flags should be preserved unless explicitly changed.
```

---

## Mechanic-to-SeedType Mapping

Quick reference: which `seedType` tags in the fact sheet feed which mechanics.

| seedType | Mechanics it feeds |
|----------|-------------------|
| `multiple-choice` | multiple-choice, image-recognition |
| `true-false` | true-false |
| `flashcard` | flashcard |
| `fill-blank` | fill-in-blank-wordbank, fill-in-blank-free |
| `matching-pair` | matching-pairs, memory-game |
| `sequence-item` | sequence-reorder |
| `category-item` | categorization |
| `quantity` | numerical-slider |
| `spatial` | spatial-hotspot, labeling |
| `cause-effect` | cause-effect |
| `misconception` | find-the-error, true-false (as distractors) |
| `comparison` | compare-contrast |
| `ranking-item` | ranking |
| `scenario-seed` | scenario-question |
| `open-ended-prompt` | open-ended, brainstorm |
| `hot-text-passage` | hot-text |

---

## What This Enables

With this pipeline, the app can:

1. **Generate 3 playable Sparks from a single topic string.** One research call + three parallel lesson design calls.
2. **Guarantee content consistency across age groups.** All three Sparks teach the same core concepts from the same fact sheet.
3. **Scale the editorial catalog simply.** Admin manages N topics, kids see N×3 lessons.
4. **Support iterative refinement.** Change the fact sheet, regenerate affected Sparks. Change one Spark directly for age-specific tweaks.
5. **Scale to any topic.** "Mummification" and "How WiFi Works" use the same schemas, same pipeline, same mechanics.
6. **Enable human review.** One fact sheet to review for accuracy. Three Sparks to review for pedagogy (one per age group).
7. **Track quality.** Every fact has a source. Every fact sheet has a qualityScore. Sheets flagged "NEEDS_VERIFICATION" route to human review.
8. **Power Pimpi conversations.** Each Spark's `pimpiContext.seedPrompt` is age-adapted from the same fact base.
