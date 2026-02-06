# Automated Research-to-Deliverable-to-Insight Generation Pipeline

> A conceptual description of the pipeline architecture we built — domain-agnostic, intended as a reference for replicating the pattern in other contexts.

---

## The Core Idea

We built a system that took a **subject** and a **depth setting**, automatically produced a complete set of polished, interdependent written deliverables, and then used those deliverables as structured inputs into a second-order **insight discovery pipeline** — proving that the outputs of the first pipeline were not just human-readable documents, but machine-consumable building blocks for further automated reasoning.

---

## Phase 1: Intake

The user provided the subject name, chose a depth level (which controlled how many research queries would be generated), and optionally added notes or uploaded reference documents. A lightweight profile captured basic metadata about the subject. This intake data persisted and was used to enrich every downstream step.

## Phase 2: Research (Automated Information Gathering)

We maintained a **catalog of parameterized query templates** — pre-written research questions organized into thematic groups. Each template was a slot-filled question (e.g., _"What is {subject}'s approach to X?"_) with metadata controlling how the query should be executed (which AI model to use, how recent the information should be, what category it belonged to).

Based on the selected depth, the system chose a subset of templates, filled in the subject details, and executed them against a **search-augmented LLM** (an AI model with real-time web access). Each query returned a prose answer with source citations.

Once all queries completed, an **extraction step** used a separate LLM call to parse the raw answers into a **structured knowledge object** — a normalized, machine-readable representation of everything the research phase had learned. This became the single source of truth for everything downstream.

## Phase 3: Synthesis (Deliverable Generation)

We defined a **catalog of deliverables** — each one a document with a specific purpose, structure, and set of required sections. Critically, deliverables had **dependency relationships** organized into levels. A deliverable at level 3 could reference the full content of deliverables from levels 1 and 2. The system generated them in dependency order, so later documents were enriched by earlier ones.

For each deliverable, a **context assembly step** built a rich prompt containing:

- The structured research output from Phase 2
- The user's original input and notes
- The full text of all previously generated dependency deliverables

An LLM then generated the document.

Each output went through **automated quality validation** — both structural checks (format, required sections, length) and a semantic check (a separate LLM scored it for relevance, depth, and completeness). If scores were too low, the system retried generation with the validator's feedback injected into the prompt, up to a retry limit.

## Phase 4: Insight Discovery (Compositional Reasoning Over Outputs)

This is where the architecture proved its real value. The user separately maintained a **registry of domain artifacts** — concrete items they'd gathered and assessed independently of the research pipeline.

The insight discovery engine ran a **multi-step reasoning pipeline** that consumed **three distinct input streams simultaneously**:

1. **The assessed domain artifacts** — user-curated, independently evaluated
2. **The structured research output** from Phase 2 — machine-readable knowledge
3. **Specific synthesis deliverables** from Phase 3 — selectively pulled (not all deliverables, just the ones relevant to insight generation)

The pipeline ran through a sequence of reasoning steps where each step built on the previous:

1. **Analyze combinations** — identify meaningful groupings among the domain artifacts based on their assessed capabilities
2. **Extract needs** — pull pain points and opportunities from the research output and the relevant synthesis deliverables
3. **Match solutions to needs** — connect artifact combinations to identified pain points
4. **Generate strategic initiatives** — propose medium-term initiatives grounded in both the artifacts and the research
5. **Generate immediate actions** — propose quick wins achievable with existing artifacts
6. **Identify gaps** — surface needs that no current artifact can address

Each step saved intermediate results, and the final output was a set of typed, prioritized **insights** — each traced back to specific artifacts and grounded in the research and deliverables that informed it.

Users could then select individual insights for **deep-dive elaboration**, which generated detailed documents (impact analysis, implementation plan, success metrics) using the same progressive enrichment pattern — the insight, its source artifacts, the research output, and the relevant deliverables all fed into the generation prompt.

---

## Why This Matters Architecturally

The insight discovery phase demonstrated that the deliverables produced in Phase 3 were not terminal outputs. They were **composable intermediate artifacts** — structured enough to be selectively consumed by a second automated reasoning process. The pipeline's outputs became another pipeline's inputs, and because both the research knowledge and the synthesis deliverables were stored and accessible, new reasoning processes could be layered on top without re-running earlier phases.

This created a **compounding knowledge architecture**: raw research became structured knowledge, structured knowledge became deliverables, and deliverables became inputs for insight discovery — each layer adding analytical depth that the previous layer couldn't achieve alone.

---

## Key Architectural Patterns

### 1. Progressive Enrichment

Each stage fed the next, with information compounding through the pipeline. No stage operated in isolation — every generation step had access to all relevant upstream outputs.

### 2. Dependency-Ordered Generation

Deliverables were arranged in a dependency graph, with foundational documents (glossaries, inventories, assessments) produced first and fed as context into higher-level documents (strategies, roadmaps, recommendations).

### 3. Composable Outputs

Deliverables were designed to be both human-readable final products and machine-consumable inputs for downstream automated reasoning.

### 4. Multi-Stream Reasoning

The insight discovery step consumed multiple independent data streams (user-curated artifacts, structured research, selected deliverables) and reasoned across them simultaneously.

### 5. Selective Consumption

Downstream pipelines didn't consume all upstream outputs — they selectively pulled the specific deliverables relevant to their reasoning task.

### 6. Layered Elaboration

Insights could be individually expanded into detailed documents using the same generation + validation pattern, creating a drill-down capability at any level.

### 7. Validation with Retry

Automated quality gates at each generation step caught weak outputs early and re-ran them with corrective feedback, preventing low-quality content from cascading into dependent deliverables.

### 8. Chunked, Resumable Execution

Long pipelines (potentially dozens of LLM calls over 30+ minutes) were broken into time-bounded chunks that saved progress to the database and self-invoked to continue. Every completed step was tracked, making the entire pipeline idempotent and safe to re-run at any point.

### 9. Multi-Model Orchestration

Different steps used different AI models optimized for the task — a web-search model for research, a large-context model for long-form generation, and a separate model for quality validation.

---

## The Full Pattern

```
Parameterized Research
  → Structured Knowledge Extraction
    → Dependency-Ordered Deliverable Generation
      → Multi-Stream Insight Discovery (over deliverables + external artifacts)
        → Selective Deep-Dive Elaboration
```

Each layer compounds on the previous, and every output is both a final product and a potential input to the next layer of reasoning.
