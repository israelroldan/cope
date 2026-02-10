# The Book Doctor

**A Compositional Toolkit for Fiction Authors**

Architecture & Design Specification — Version 1.0, Module 1: Characters

*Adapted from the Research-to-Deliverable-to-Insight Pipeline Pattern*

---

## 1. The Core Idea

This document specifies **The Book Doctor**, a modular fiction-development toolkit that adapts the Research-to-Deliverable-to-Insight pipeline pattern to the craft of writing literary and realistic fiction. The system takes a **fiction element** (a character, location, theme, or other narrative building block), applies a configurable depth of structured exploration, produces a set of interdependent creative deliverables, and then reasons across those deliverables to surface narrative insights the author might not have seen.

The fundamental insight is the same one that drove the original pipeline: *outputs are not terminal products — they are composable intermediate artifacts.* A character's psychological profile is both a useful document for the author and a machine-consumable input for generating that character's dialogue guide. A dialogue guide, in turn, becomes an input for cross-character tension analysis. Each layer of generation compounds on the last, producing analytical depth that no single prompt could achieve.

The toolkit is designed to be modular. This specification fully defines the first module — **Characters** — and sketches the architectural slots for future modules (Locations, Themes, Plot Structure, World Systems). The module system is designed so that cross-module insight discovery becomes possible as modules are added: a character module's outputs can be consumed by the location module's insight engine, and vice versa.

The target user is a fiction author working on literary or realistic fiction — work where psychological depth, relational complexity, and thematic resonance matter more than plot mechanics or world-system rules. The toolkit is optimized for this, but the modular architecture means genre-specific extensions (fantasy worldbuilding, thriller plot machinery) can be layered on without changing the core pattern.

---

## 2. Architecture Overview

The pipeline follows six phases. Each phase feeds the next, and every output is stored and referenceable by downstream phases. The key adaptation from the original pattern is that "research" is replaced by "exploration" — instead of querying the web for factual information, the system generates probing creative questions that excavate the fiction element from multiple angles.

### 2.1 The Six Phases

| Phase | Original Pipeline | Book Doctor Adaptation |
|-------|-------------------|------------------------|
| 1. Intake | Subject + depth + notes | Fiction element seed + depth + author's existing material |
| 2. Exploration | Parameterized web queries | Parameterized creative prompts organized by facet |
| 3. Extraction | Structured knowledge object | Structured Element Profile (normalized, typed) |
| 4. Synthesis | Dependency-ordered deliverables | Dependency-ordered fiction deliverables |
| 5. Insight Discovery | Multi-stream reasoning over artifacts + research + deliverables | Narrative intelligence across author material + profiles + deliverables |
| 6. Elaboration | Deep-dive on selected insights | Scene-level elaboration on selected narrative opportunities |

### 2.2 Progressive Enrichment

Every phase has access to all upstream outputs. A Phase 4 deliverable (say, a Voice & Dialogue Guide) is generated with full knowledge of the intake seed, all exploration answers, the structured profile, and any earlier deliverables it depends on. This is not optional context — it is a hard architectural requirement. Without progressive enrichment, the outputs collapse into generic, disconnected documents.

### 2.3 Module Architecture

Each fiction element type (Characters, Locations, Themes, etc.) is a **module**. A module defines:

- **An Intake Schema** — what seed information the author provides
- **An Exploration Query Catalog** — parameterized creative prompts organized by facet
- **An Extraction Schema** — the structure of the normalized profile
- **A Deliverable Catalog** — documents with dependency levels
- **Validation Criteria** — fiction-specific quality gates
- **Insight Discovery Steps** — the reasoning sequence for narrative intelligence

Modules are independent but interoperable. The insight discovery engine can consume profiles and deliverables from any module, enabling cross-module reasoning (e.g., "how does this character's psychology interact with this location's emotional register?").

---

## 3. Module 1: Characters

The Characters module is the first and most deeply specified module. It is designed for literary and realistic fiction, where characters are defined less by what they *do* and more by who they *are* — their contradictions, their inner weather, the gap between their public performance and private experience.

### 3.1 Phase 1: Intake

The author provides a character seed — as much or as little as they have. The intake schema is deliberately permissive; the system is designed to work with a name and a single sentence, or with pages of existing notes.

| Field | Required | Description |
|-------|----------|-------------|
| Name | Yes | Working name for the character (can be provisional) |
| Role | No | Narrative role: protagonist, antagonist, secondary, peripheral |
| One-Line Sketch | No | The author's gut-level description (e.g., "a woman who performs confidence to hide how lost she feels") |
| Genre / Tone | No | Defaults to literary/realistic; can be adjusted per-character |
| Story Context | No | Brief description of the story this character lives in |
| Existing Notes | No | Free-form notes, manuscript excerpts, prior drafts |
| Relationships | No | Known connections to other characters (references other character profiles if they exist) |
| Depth Level | Yes | Sketch (fast, ~8 queries), Draft (~20), Deep (~40), Exhaustive (~60+) |

The intake persists as a first-class object and is injected into every downstream prompt. Author notes are particularly valuable — they carry the author's voice and intuition, which the system should amplify rather than replace.

### 3.2 Phase 2: Exploration Query Catalog

The exploration catalog is the heart of the module. It replaces the original pipeline's web-research queries with **creative probing prompts** — questions designed to excavate a character from angles the author might not have considered. Each query is parameterized with the character's seed data and any available context.

Queries are organized into thematic facets. The depth setting controls how many queries are selected from each facet. At "Sketch" depth, one or two queries per facet; at "Exhaustive," the full catalog.

#### Facet 1: Psychology & Inner Life

These queries probe the character's internal world — not pop-psychology labels, but the lived texture of how they experience being themselves.

- *What does {name} believe about themselves that is not entirely true? What function does this self-deception serve?*
- *When {name} is alone and unobserved, what do they think about? What do they avoid thinking about?*
- *What is {name}'s relationship to their own emotions? Do they intellectualize, suppress, perform, or surrender to feeling?*
- *What would {name}'s therapist (real or hypothetical) identify as their core wound? How does {name} protect it?*
- *When {name} is afraid, what does their fear look like from the outside? What behaviors does it produce?*
- *What does {name} want that they cannot admit to wanting? What do they openly want that is actually a proxy for something deeper?*
- *What cognitive distortions does {name} habitually employ? Catastrophizing, minimizing, splitting, magical thinking?*
- *How does {name} experience shame? What triggers it? What do they do immediately after feeling it?*

#### Facet 2: Backstory & Formation

These queries build the character's history — not as a timeline of events, but as a web of formative experiences that explain who they are now.

- *What is the earliest experience {name} remembers that still shapes their behavior today? How has the memory distorted over time?*
- *Describe {name}'s family dinner table at age 12. Who speaks? Who is silent? What is the emotional undertow?*
- *What did {name} learn about love from watching their parents (or guardians)? What did they learn about power?*
- *What is the thing that happened to {name} that they have never told anyone? Not because it's dramatic, but because they don't have the words for it yet.*
- *What did {name} want to be at age 10, at 16, at 22? Track the erosion or evolution of that ambition.*
- *What class, economic, or social position did {name} grow up in? How did it shape what they believe they deserve?*
- *Who was the first person to truly disappoint {name}? How did they metabolize that disappointment?*

#### Facet 3: Body & Physical Presence

These queries ground the character in physicality — how they inhabit their body, how their body signals to the world.

- *How does {name} move through a room? What does their posture communicate that their words might not?*
- *What is {name}'s relationship to their own appearance? Comfort, vigilance, indifference, weaponization?*
- *What does {name} do with their hands when they're nervous, bored, or lying?*
- *How does {name} experience physical discomfort or pain? Are they stoic, performative, avoidant?*
- *What sensory details does {name} notice first when entering a new space? What does this reveal about them?*
- *Describe a specific physical habit or tic that {name} is unaware of but others notice.*

#### Facet 4: Social Self & Relationships

These queries examine the character in relation to others — the gap between the face they present and the person underneath.

- *Who does {name} become in a group? Leader, observer, provocateur, peacemaker, chameleon?*
- *How does {name} behave when they have power over someone? How about when someone has power over them?*
- *What kind of person does {name} instinctively trust? What kind do they instinctively distrust? Why are both instincts sometimes wrong?*
- *How does {name} handle conflict? Do they lean in, withdraw, deflect with humor, escalate, or go quiet?*
- *What does {name}'s closest friendship look like? What do they get from it that they can't get elsewhere?*
- *How does {name} express affection? How do they receive it? Is there a mismatch between the two?*
- *What is {name}'s pattern in romantic relationships? What role do they cast their partners in?*

#### Facet 5: Voice & Expression

These queries establish how the character communicates — not just dialogue, but their entire expressive register.

- *What is {name}'s default sentence length and rhythm? Do they speak in long, looping sentences or clipped fragments?*
- *What words or phrases does {name} overuse? What words would they never say?*
- *How does {name}'s speech change when they're lying, when they're aroused, when they're angry, when they're trying to be liked?*
- *Does {name} use humor? What kind? Self-deprecating, dry, cutting, absurdist? When is it a weapon and when is it a shield?*
- *What does {name}'s silence sound like? What are the different qualities of their not-speaking?*
- *How does {name} write versus how they speak? Texts, emails, letters — do they reveal a different person?*

#### Facet 6: Contradictions & Fault Lines

These are the most generative queries — they probe the places where a character is at war with themselves, which is where fiction lives.

- *Where does {name}'s self-image diverge most sharply from how others experience them?*
- *What does {name} do that contradicts their stated values? How do they justify this to themselves?*
- *What is {name} most judgmental about in others that is actually a projection of something they refuse to see in themselves?*
- *Under what circumstances would {name} betray their own moral code? What would they tell themselves afterward?*
- *What does {name} need but refuse to ask for? What have they built their identity around not needing?*

#### Facet 7: Narrative Potential

These queries are explicitly craft-oriented — they probe the character's usefulness as a vehicle for story.

- *What does {name} want (external goal) versus what do they need (internal truth)? How does the gap between these drive the story?*
- *What is the one thing {name} must learn, accept, or surrender by the end of the story? What will it cost them?*
- *What is {name}'s breaking point? What would have to happen for them to become someone they don't recognize?*
- *If {name}'s arc were a single sentence, what would it be? (e.g., "A man who mistakes control for love learns that surrender is not the same as weakness.")*
- *What scenes would test {name} most effectively? Where is the maximum pressure on their specific fault lines?*
- *What is the dramatic irony available in {name}'s story — what does the reader understand about {name} before {name} does?*

#### Facet 8: World Interface

These queries anchor the character in their material and spatial reality.

- *What objects does {name} carry, keep, or refuse to throw away? What do these objects mean?*
- *Describe {name}'s living space. What does it reveal about them? What does it conceal?*
- *What is {name}'s relationship to money? What did they learn about it growing up?*
- *What daily rituals does {name} maintain? Which ones are conscious choices and which are compulsions?*
- *How does {name} experience the passage of time? Are they future-oriented, past-haunted, or trapped in the present?*

### 3.3 Phase 3: Structured Character Profile

After all exploration queries complete, an extraction step parses the raw creative answers into a **Structured Character Profile** — a normalized, machine-readable object that becomes the single source of truth for everything downstream. This is the equivalent of the original pipeline's "structured knowledge object."

The profile is not a flat summary. It is a typed, hierarchical object with defined fields, so that downstream deliverables and insight engines can reference specific facets without parsing prose.

| Section | Fields | Source Facets |
|---------|--------|---------------|
| Identity | Name, age range, social position, role in story, one-line essence | Intake + Facets 1, 2 |
| Psychology | Core wound, defense mechanisms, attachment style, emotional range, self-deception patterns, cognitive distortions | Facet 1 |
| Backstory | Formative events (list), family dynamics summary, pivotal losses, secrets, class/economic background | Facet 2 |
| Physicality | Movement quality, appearance relationship, nervous habits, sensory orientation, physical tics | Facet 3 |
| Social Patterns | Group role, power behavior (up/down), conflict style, trust patterns, intimacy patterns, friendship model | Facet 4 |
| Voice | Sentence rhythm, vocabulary markers, avoidance words, humor type, silence qualities, written-vs-spoken gap | Facet 5 |
| Contradictions | Self-image vs. reality gaps, value-behavior conflicts, projections, moral flexibility zones | Facet 6 |
| Arc Potential | Want vs. need, required transformation, breaking point, arc sentence, maximum-pressure scenarios, dramatic irony | Facet 7 |
| Material World | Significant objects, living space description, money relationship, daily rituals, time orientation | Facet 8 |

The extraction prompt instructs the LLM to be ruthlessly specific. Generic entries ("she's a complex person") are flagged for re-exploration. The profile should read like field notes from someone who has been watching this person for years.

### 3.4 Phase 4: Deliverable Catalog

The deliverable catalog defines the documents the system generates. As in the original pipeline, deliverables are arranged in **dependency levels** — each level has access to all deliverables from previous levels, plus the structured profile and intake seed. The system generates them in order, so later documents are enriched by earlier ones.

#### Level 1 — Foundational Documents

**Character Dossier.** A comprehensive factual-feeling reference document. Not a story — a reference. Organized by the profile sections, but written in fluid prose rather than schema fields. This is what the author pins above their desk. It should feel like reading a case file written by someone who cares about the subject.

**Psychological Profile.** A deep-dive into the character's inner architecture. Maps their defense mechanisms, attachment patterns, emotional triggers, and the logic of their self-deception. Written in a tone that balances clinical precision with empathic understanding. References specific backstory events as causal anchors.

#### Level 2 — Relational & Expressive Documents

*Depends on: Level 1 deliverables.*

**Relationship Dynamics Map.** For each known relationship (from intake or inferred from exploration), describes the dynamic in terms of power, need, projection, and unspoken contracts. If the related character also has a profile, cross-references it. If not, sketches the other character just enough to make the dynamic vivid.

**Voice & Dialogue Guide.** A practical writing tool. Includes: sample dialogue lines across emotional states (calm, angry, lying, vulnerable, performative); vocabulary and syntax notes; verbal tics and avoidances; how their speech changes by audience. The guide should be specific enough that an author could write a dialogue scene using it as a rubric.

**Backstory Timeline.** A chronological map of formative events, but annotated with narrative significance. Each event is tagged with: what it taught the character, what defense it produced, and how it echoes in their present-day behavior. The timeline is not exhaustive — it prioritizes events with narrative leverage.

#### Level 3 — Narrative Architecture Documents

*Depends on: Level 1 and Level 2 deliverables.*

**Arc Blueprint.** Maps the character's trajectory through the story. Defines: the opening state (who they are at the start), the destabilizing event (what disrupts their equilibrium), the escalating pressures (what forces them to confront what they avoid), the crisis point (where their old self cannot survive), and the landing state (who they become — or fail to become). Each stage references the psychological profile to explain *why* this character would respond this way.

**Scene Seed Kit.** A set of 8–12 proposed scenes, each designed to test, reveal, or transform the character. Each seed includes: the situation, what's at stake for this specific character, what the scene would reveal to the reader, and which fault line it pressures. Seeds are tagged by arc stage (opening, escalation, crisis, resolution).

**Thematic Thread Analysis.** Identifies how this character embodies, challenges, or complicates the story's central themes. If the story is about, say, the cost of ambition, this document traces how the character's specific backstory, psychology, and arc relate to that theme — not as allegory, but as lived experience that resonates with the thematic question.

#### Level 4 — Editorial & Diagnostic Documents

*Depends on: All previous levels.*

**Editorial Diagnostic.** A candid assessment of the character's development. Flags: underdeveloped areas, inconsistencies between profile and arc, generic elements that need specificity, missing relationships, and places where the character defaults to type rather than feeling individual. This document is the toolkit's self-critique.

**Narrative Opportunity Report.** Identifies unexploited potential: relationship dynamics that could generate scenes, backstory revelations that could shift reader sympathy, contradictions that could fuel subplot, and moments where the character's arc could intersect with other characters' arcs in surprising ways.

### 3.5 Phase 5: Insight Discovery

This is where the architecture proves its value beyond document generation. The insight discovery engine consumes **three independent data streams** and reasons across them to surface narrative intelligence the author might not have seen.

#### Input Streams

1. **Author's Existing Material** — manuscript excerpts, scene drafts, notes, revision comments. These are the "domain artifacts" from the original pipeline: items the author has created and assessed independently of this toolkit.
2. **Structured Character Profiles** — from Phase 3. If multiple characters have been processed through the toolkit, all their profiles are available.
3. **Selected Deliverables** — not all deliverables, but the ones most relevant to insight generation: Arc Blueprints, Relationship Dynamics Maps, and Thematic Thread Analyses.

#### Reasoning Sequence

The insight engine runs through a defined sequence of reasoning steps. Each step saves intermediate results that feed the next.

| Step | Operation | Inputs |
|------|-----------|--------|
| 1 | **Cross-Character Tension Mapping:** Identify where characters' needs, fears, and desires create natural conflict — not arbitrary opposition, but the kind of friction that emerges when two psychologically specific people collide. | All character profiles + Relationship Maps |
| 2 | **Thematic Resonance Analysis:** Find how different characters echo, invert, or complicate each other thematically. Identify character pairings that illuminate the story's themes through contrast. | Thematic Thread Analyses + Profiles |
| 3 | **Narrative Gap Identification:** Surface missing relationship dynamics, unexplored backstory connections, and character interactions the story needs but hasn't built yet. | All deliverables + Author's manuscript |
| 4 | **Arc Interference Analysis:** Map where character arcs intersect, support, or undermine each other. Identify moments where one character's transformation creates pressure on another's stasis. | Arc Blueprints + Profiles |
| 5 | **Scene Opportunity Synthesis:** Propose scenes that serve multiple characters simultaneously — scenes where the collision of two characters' specific psychologies produces dramatic energy. | All prior steps + Scene Seed Kits |
| 6 | **Consistency Audit:** Catch contradictions between character profiles and manuscript behavior. Flag places where a character acts out of profile without narrative justification. | Profiles + Author's manuscript |

Each insight is typed and prioritized. Types include: **Tension Opportunity** (two characters whose psychologies would produce compelling friction), **Thematic Echo** (characters who unknowingly mirror each other), **Narrative Gap** (something the story needs but doesn't have yet), **Arc Collision** (a moment where two arcs intersect productively), and **Consistency Flag** (a place where the manuscript contradicts the character's established psychology).

### 3.6 Phase 6: Deep-Dive Elaboration

Any insight from Phase 5 can be selected for elaboration. The elaboration engine generates a detailed document using the same progressive enrichment pattern: the insight, its source profiles, the relevant deliverables, and the author's manuscript context all feed into the generation prompt.

Elaboration documents are tailored to the insight type:

- **Tension Opportunity** → a detailed scene treatment showing the dynamic in action, with dialogue samples and internal monologue
- **Thematic Echo** → an analytical essay tracing the parallel through both characters, with suggestions for how to make the echo visible to readers without being heavy-handed
- **Narrative Gap** → a proposed solution: a new scene, a new character, a backstory revision, or a structural change, with rationale
- **Arc Collision** → a sequence treatment showing how the collision could play out across 2–3 scenes, with escalation
- **Consistency Flag** → a diagnostic showing the contradiction, possible explanations (maybe it's intentional — unreliable narrator, growth, regression), and revision suggestions if it's unintentional

---

## 4. Quality Validation

Every deliverable passes through automated quality validation before being stored. This adapts the original pipeline's structural and semantic checks to the specific demands of fiction. Validation is not about whether the document is "correct" — there is no correct in fiction — but about whether it is **useful, specific, and internally coherent.**

### 4.1 Structural Checks

- All required sections present
- Appropriate length for depth level (a "Sketch" dossier should not be 5,000 words)
- Cross-references to other deliverables are valid (no references to documents that don't exist yet)
- Profile fields are populated with specific content, not placeholders

### 4.2 Semantic Validation

A separate LLM call scores each deliverable on five fiction-specific dimensions:

| Dimension | What It Measures | Failure Signal |
|-----------|------------------|----------------|
| Psychological Plausibility | Does this character feel like a real person with internally consistent logic? | Contradictory traits without explanation, motivations that don't connect to backstory |
| Narrative Utility | Does this material give the author something to work with? | Generic observations, absence of concrete scene suggestions or usable detail |
| Specificity | Are details concrete and vivid, or abstract and generic? | "She is a complex woman" vs. "She alphabetizes her spice rack but lets mail pile up for weeks" |
| Distinctiveness | Does this character feel different from others in the story? | Psychology, voice, or arc that could belong to any character |
| Thematic Coherence | Does the character serve the story's themes without becoming an allegory? | Character is a thematic mouthpiece, or has no connection to central questions |

Each dimension is scored 1–5. A deliverable that scores below 3 on any dimension triggers a **regeneration with feedback** — the validator's specific critique is injected into the prompt, and the deliverable is regenerated. Maximum two retries before the system flags the deliverable for human review.

The validation step is the system's self-correcting mechanism. It prevents the common failure mode of LLM-generated fiction material: plausible-sounding but generic output that doesn't actually help the author do anything.

---

## 5. Future Modules

The module architecture is designed so that new fiction-element types can be added without modifying the core pipeline. Each future module follows the same six-phase pattern but defines its own query catalog, deliverable catalog, and insight discovery steps.

### 5.1 Locations Module

For literary fiction, a location is not a backdrop — it is a character. The Locations module would explore places through facets like *emotional register* (what does this place feel like?), *sensory signature* (what does a character notice first?), *social meaning* (what does being here signal about a character?), *temporal layers* (what happened here before the story began?), and *narrative function* (what can only happen in this specific place?).

Deliverables: Location Profile, Sensory Reference Guide, Location-as-Character Analysis, Scene Potential Map. Cross-module insight: how do specific characters experience this place differently, and what does that reveal?

### 5.2 Themes Module

Themes are the most abstract module and the most dependent on cross-module input. The Themes module would not generate themes from scratch — it would *extract and articulate* themes that are already latent in the characters, locations, and plot. Its exploration queries would probe the author's manuscript and existing profiles for recurring patterns, unanswered questions, and moral tensions.

Deliverables: Thematic Map, Question Hierarchy (the nested questions the story is asking), Symbol & Motif Guide, Thematic Consistency Audit.

### 5.3 Plot Structure Module

Designed to consume all character arc blueprints and weave them into a unified narrative structure. This module would be less about "what happens" and more about "why it happens in this order" — the causal logic of the story as driven by character psychology.

Deliverables: Structural Blueprint, Pacing Analysis, Subplot Integration Map, Climax Architecture.

### 5.4 World Systems Module (Genre Extension)

For speculative fiction, this module would handle magic systems, technology, political structures, and cultural rules. It is the most "research-like" module, closest to the original pipeline's factual research phase. Intentionally excluded from the literary/realistic core but architecturally ready.

---

## 6. Cross-Module Insight Discovery

The most powerful feature of the modular architecture is cross-module insight discovery. When two or more modules have produced outputs, the insight engine can reason across them simultaneously, surfacing connections that are invisible within any single module.

### 6.1 Architecture

Cross-module insight discovery follows the same multi-stream pattern as within-module discovery, but the streams are drawn from different modules. The engine uses **selective consumption** — it does not ingest all deliverables from all modules, but rather pulls specific deliverables relevant to the cross-module question.

### 6.2 Example: Characters × Locations

Given character profiles and location profiles, the cross-module engine could:

- Identify which locations would most effectively test each character's fault lines
- Surface characters whose psychology would be most altered by a specific place
- Propose scenes where the location itself becomes an antagonist for a character's specific vulnerability
- Find mismatches between a character's emotional state and a location's emotional register (productive dissonance)

### 6.3 Example: Characters × Themes

Given character profiles and a thematic map:

- Identify characters who unconsciously embody opposing sides of a thematic question
- Surface characters whose arcs resolve a thematic question and those whose arcs complicate it
- Propose character pairings that would make a theme visible to readers through dramatic action rather than exposition

### 6.4 The Compounding Knowledge Architecture

This is the direct translation of the original pipeline's key architectural insight: *outputs are composable intermediate artifacts.* Character profiles feed location analysis, which feeds thematic extraction, which feeds plot structure. Each layer adds analytical depth that the previous layer could not achieve alone. And because every output is stored and referenceable, new reasoning processes can be layered on without re-running earlier phases.

The result is a compounding knowledge architecture for fiction: raw character exploration becomes structured profiles, profiles become deliverables, deliverables become cross-module insights, and insights become scene-level elaborations — each layer grounded in everything below it.

---

## 7. Key Architectural Patterns (Adapted)

| Pattern | Original Form | Book Doctor Adaptation |
|---------|---------------|------------------------|
| Progressive Enrichment | Each stage feeds the next with all upstream context | Every deliverable prompt includes intake seed, exploration answers, structured profile, and prior-level deliverables |
| Dependency-Ordered Generation | Foundational docs first, strategies built on them | Dossier and Psychological Profile first; Arc Blueprint and Scene Seeds built on top of them |
| Composable Outputs | Deliverables are both human-readable and machine-consumable | The Voice Guide is useful to the author AND a structured input for cross-character dialogue analysis |
| Multi-Stream Reasoning | Insight discovery consumes artifacts + research + deliverables | Narrative intelligence consumes manuscript + profiles + selected deliverables |
| Selective Consumption | Downstream pipelines choose which deliverables to pull | The Arc Interference step only needs Arc Blueprints and Profiles, not Dossiers or Voice Guides |
| Layered Elaboration | Insights expand into detailed documents | A "Tension Opportunity" insight expands into a full scene treatment with dialogue |
| Validation with Retry | Automated quality gates catch weak outputs | Fiction-specific scoring (plausibility, specificity, utility, distinctiveness, thematic coherence) |
| Chunked Execution | Long pipelines broken into resumable steps | A "Deep" character run (~40 queries + 9 deliverables + validation) executes in resumable chunks |
| Multi-Model Orchestration | Different models for different tasks | A creative model for exploration, a large-context model for deliverables, a critical model for validation |

---

## 8. The Full Pattern

```
Character Seed + Author Notes
  → Parameterized Creative Exploration (8 facets, depth-controlled)
    → Structured Character Profile (normalized, typed, specific)
      → Dependency-Ordered Deliverables (4 levels, 10 documents)
        → Multi-Stream Narrative Insight Discovery (6-step reasoning)
          → Selective Deep-Dive Elaboration (scene treatments, diagnostics, revisions)
```

Each layer compounds on the previous, and every output is both a final product and a potential input to the next layer of reasoning.
