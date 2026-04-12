# How to Use the StudyStars Mechanics Directory

A guide for future us (and future Claude sessions).

---

## What's in here

This directory contains the complete specification, tooling, and pipeline for 34 micro-learning activity mechanics (32 original archetypes + content slideshow for content delivery + mixed assessment for recaps/reviews).

### Reference files (prefixed with `_`)

| File | What it is |
|------|-----------|
| `_schema.json` | JSON Schema definition that all 32 mechanic specs conform to |
| `_index.json` | Master registry of all mechanics with implementation status tracking |
| `_index.html` | Visual dashboard — serve with `npx serve` and open in browser |
| `_fact-sheet-schema.json` | Schema for the fact sheet — pure knowledge (facts, sequences, pairs, vocabulary, etc.). No lesson design. |
| `_pipeline.md` | The 2-stage (+refinement) pipeline: Topic → Fact Sheet → Spark → Refined Spark |
| `_prototype-styleguide.md` | Component-level design tokens, animations, and interaction patterns for building prototypes |
| `_v0-prompt.md` | Prompt template for generating mechanic prototypes in v0 |
| `_generate-prompt.py` | Script to assemble a ready-to-paste v0 prompt for any mechanic by number |
| `_lesson-flow.md` | The Pimpi Grej experience — how content cards, activities, WOW moments, and reflection interleave into a single lesson |
| `_spark-of-the-day.md` | The top-level Spark spec — schema, generator prompt, and orchestration logic for producing a complete playable lesson |
| `_how-to-use-this.md` | This file |

### Mechanic files (32 pairs)

Each mechanic has two files:
- `{NN}-{slug}.json` — Machine-readable spec (interaction type, content schema, scoring, UX, age adaptations)
- `{NN}-{slug}.md` — Human-readable description (how it works, cognitive science, example content, UX notes)

Numbering follows the canonical order from the research: 01-05 Remember, 06-10 Understand, 11-15 Apply, 16-19 Analyze, 20-22 Evaluate, 23-25 Create, 26-32 Gamification wrappers, 33+ Structural mechanics (content delivery, etc.).

---

## Common tasks

### "I want to see what's been built"

```bash
cd studystars/mechanics
npx serve .
# Open http://localhost:3000/_index.html
```

The dashboard shows all 32 mechanics with their status, priority, AI generability rating, and links to specs/prototypes.

### "I want to generate a v0 prototype for mechanic N"

```bash
cd studystars/mechanics
python3 _generate-prompt.py 6 | pbcopy
```

This copies a complete prompt (styleguide + mechanic spec + mechanic description + requirements) to your clipboard. Paste it into v0 within the shared project. Save the output as `{NN}-{slug}.prototype.tsx`.

Then update `_index.json`:
```json
{
  "status": "prototype-done",
  "prototypeFile": "06-matching-pairs.prototype.tsx",
  "prototypeRoute": "/mechanics/matching-pairs"
}
```

### "I want to generate a Spark for a topic"

Follow the pipeline in `_pipeline.md`:

1. **Stage 1 — Research (once per topic):** Use the Stage 1 prompt with your topic (a noun like "Mummification", not a question). The AI returns an age-agnostic fact sheet matching `_fact-sheet-schema.json` — pure knowledge with complexity tiers (`core` / `intermediate` / `advanced`), no lesson design.
2. **Stage 2 — Lesson Design (×3 age bands):** Run the Spark Generator prompt (in `_spark-of-the-day.md`) three times — once per age band (8-10, 11-13, 14-16). Each call receives the same fact sheet + target age group + available mechanic specs. The generator filters facts by complexity, then produces a complete Spark: age-appropriate hook, interleaved content slideshows + activities, wow moments, reflection with Pimpi seed prompt, and next-hook cliffhanger.
3. **Stage 3 — Refine (optional):** Use natural language instructions to tweak the fact sheet (affects all three Sparks) or a single Spark directly (affects one age band only).

The three Stage 2 calls run independently and in parallel — each gets the full context window dedicated to one age group. Right now this is manual (copy-paste prompts). It becomes API calls when the Next.js app is built.

### "I want to add or modify a mechanic spec"

1. Edit the `.json` and `.md` files for the mechanic
2. Make sure the JSON still conforms to `_schema.json` (all required keys present)
3. If you changed the `contentSchema`, check that `_fact-sheet-schema.json` still produces compatible seed data
4. Update `_index.json` if the name, priority, or tier changed

### "I want to change the fact sheet schema"

Edit `_fact-sheet-schema.json`. Then check:
- Do the `seedTypes` in the schema still map to the right mechanics? (See the mapping table in `_pipeline.md`)
- Do the mechanic `contentSchema` fields still align with what the fact sheet produces?
- Update the Stage 1 and Stage 2c prompt templates in `_pipeline.md` if the structure changed

### "I want to adjust the v0 prompt or styleguide"

Edit `_v0-prompt.md` (the prompt template) and/or `_prototype-styleguide.md` (the design tokens). The generator script reads these at runtime, so changes take effect immediately on the next `python3 _generate-prompt.py N`.

### "I want to convert this directory into a Next.js app"

The directory is designed for this transition:
- `_index.json` becomes your data source (import it or fetch it)
- `_index.html` becomes your `/mechanics` route (rewrite in React)
- Each `.prototype.tsx` file becomes a component you can render at `/mechanics/[slug]`
- The fact sheet schema and pipeline prompts become your API route logic
- The mechanic `.json` specs become your content generation contracts

---

## Architecture decisions

**Why separate fact sheet and Spark?**
The fact sheet is pure knowledge — what we know about a topic. The Spark is lesson design — how we teach it. Separating them means you can regenerate the lesson (new hook, different mechanics, better narration) without re-researching the facts. And you can review factual accuracy independently of pedagogical flow.

**Why one age-agnostic fact sheet per topic?**
If you generate separate fact sheets per age group, the underlying FACTS can diverge — different facts, different sequences, different wow moments. Now your three age-group Sparks are teaching different things about the same topic. Instead: one fact sheet with all the knowledge, tagged by complexity tier (`core` / `intermediate` / `advanced`). The Spark generator selects the right subset per age band. Admin manages N topics → N fact sheets → N×3 playable Sparks.

**Why a single fact sheet per set of Sparks?**
Everything (content slideshows + activities) traces back to one source of truth via `factIds` and `_factRefs`. This guarantees activities test what was taught, nothing contradicts, and changing one fact tells you exactly which Spark components need regenerating. Facts marked `coreFact: true` appear in ALL three age-band Sparks, ensuring content consistency.

**Why `seedTypes` on each fact?**
So Stage 2 doesn't have to guess which mechanics a fact can feed. A date fact explicitly declares it can seed `sequence-item` + `quantity` + `fill-blank`. This makes mechanic selection deterministic.

**Why priority tiers on mechanics?**
P0 (12 mechanics) covers all Bloom's levels and is fully AI-generable. You can ship a complete product with just P0. P1 adds depth, P2 adds variety, P3 requires multiplayer infrastructure.

**Why the v0 prompt includes the full styleguide every time?**
Redundancy over drift. v0 picks up project context from earlier generations, but repeating the exact hex values, touch target minimums, and post-it treatment ensures mechanic #18 is as on-brand as mechanic #1.

---

## File relationships

```
_schema.json
    └── defines the shape of ──→ NN-slug.json (x34, includes content-slideshow + mixed-assessment)

_fact-sheet-schema.json
    └── defines the shape of ──→ generated fact sheets (pure knowledge)
    └── seedTypes map to ──→ mechanic contentSchema fields

_spark-of-the-day.md
    └── defines ──→ Spark schema (the playable lesson)
    └── contains ──→ Spark generator prompt
    └── contains ──→ Pimpi seed prompt template
    └── reads from ──→ _fact-sheet-schema.json (input)
    └── reads from ──→ NN-slug.json contentSchemas (activity shapes)
    └── reads from ──→ _lesson-flow.md (rhythm rules)

_pipeline.md
    └── Stage 1 ──→ Topic → Fact Sheet (uses _fact-sheet-schema.json)
    └── Stage 2 ──→ Fact Sheet → Spark (uses _spark-of-the-day.md)
    └── Stage 3 ──→ Refinement (human or AI)

_prototype-styleguide.md ──┐
_v0-prompt.md ─────────────┤
NN-slug.json ──────────────┼──→ _generate-prompt.py ──→ assembled v0 prompt
NN-slug.md ────────────────┘

_index.json
    └── tracks status of ──→ all 32 mechanics
    └── read by ──→ _index.html (dashboard)
```
