# Module Builder Master Implementation Plan

## Executive Summary

This is the **master plan** for completing the Module Builder — an internal tool for the education expert to design modules and manage the AI-powered content generation pipeline. Current implementation stands at ~35% complete with strong foundations in data models and basic CRUD, but the core innovation (AI-powered content generation) remains unbuilt.

**Key Architecture Reference:** `docs/pipeline-pattern.md` describes the proven pipeline architecture we will follow — faceted research, embedding-based context, structured extraction, iterative refinement, reconciliation, and dependency-ordered deliverable generation.

**Orchestration Model:** All implementation work will be delegated to specialized subagents. The orchestrating agent (Claude) acts as an **Engineering Manager**, responsible for:
- Breaking work into well-scoped tasks for subagents
- Maintaining code quality and consistency across subagent outputs
- Ensuring reusability of components across phases
- Reviewing and integrating subagent work
- Keeping the big picture architecture in focus

**Reference Content:** `docs/modules/module-1.md` serves as the gold standard for expected content output — a 2000-line comprehensive module with:
- 6 narrative pre-reads with relatable characters (Kai, Zara, Marcus, Tasha, etc.)
- 6 detailed facilitator scripts with timing, activities, expected responses, and contingencies
- 9 workbook page templates with specific prompts
- Parent digest templates per week

---

## Architecture Foundation

### Pipeline Pattern (from `docs/pipeline-pattern.md`)

The Module Builder will implement this proven pattern:

```
Intake (Module Definition)
  → Parameterized Research (faceted, depth-controlled, embedding-augmented)
    → Structured Knowledge Extraction (schema-validated, source-traced)
      → Gold-Standard Authoring (expert writes Week 1 content)
        → Dependency-Ordered Content Generation (Weeks 2-6)
          ← Iterative Refinement (multi-pass, version-tracked)
          ← Reconciliation (embedding-based consistency detection)
          → Quality Validation (automated scoring + human review)
            → Module Preview & Publish
              → Post-Cohort Insight Discovery
                → Targeted Revision Workflow
```

### Key Architectural Patterns to Implement

| Pattern | Application in Module Builder |
|---------|------------------------------|
| **Progressive Enrichment** | Each content piece feeds into the next; Week 2 pre-read is informed by Week 1 |
| **Embedding-Based Retrieval** | Find relevant prior content when generating new pieces |
| **Dependency-Ordered Generation** | Pre-reads → Facilitator scripts → Workbooks → Digests |
| **Source Traceability** | Every generated sentence traces back to research/gold-standard |
| **Iterative Refinement** | Expert can refine individual pieces with full version history |
| **Reconciliation** | After editing Week 3, flag Week 4-6 for consistency review |
| **Chunked, Resumable Execution** | Long generation jobs save progress, can pause/resume |

---

## Current State Assessment

### What Exists (Foundation)
| Component | Status | Location |
|-----------|--------|----------|
| Module CRUD | ✅ Complete | `apps/backoffice/src/app/(dashboard)/modules/` |
| Session Management | ✅ Complete | Socratic phases, learning objectives |
| Content Versioning | ✅ Complete | `content_items`, `content_versions` tables |
| Workflow States | ✅ Complete | draft → review → approved → published |
| Content Editor | ⚠️ MVP (JSON) | Keep for now, enhance later |
| AI Job Schema | ✅ Complete | `ai_generation_jobs`, `ai_generation_feedback` |
| Audit Logging | ✅ Complete | Full audit trail |

### What's Missing (This Plan)

| Component | Phase | Priority |
|-----------|-------|----------|
| Research pipeline | Phase 1 | High |
| Gold-standard marking | Phase 1 | High |
| AI content generation (all 4 types) | Phase 1 | High |
| Quality scoring | Phase 1 | High |
| Review queue | Phase 2 | Medium |
| Module preview | Phase 2 | Medium |
| Module-level publish | Phase 2 | Medium |
| Knowledge compounding | Phase 3 | Medium |
| Post-cohort insights pipeline | Phase 3 | Medium |
| Rich text editor | Phase 4 | Lower |
| Template library | Phase 4 | Lower |
| Version history UI | Phase 4 | Lower |

---

## Implementation Phases Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                    PHASE 1: Core AI Pipeline                         │
│  Research → Gold-Standard → Generation (all 4 types) → Validation   │
│                         [HIGH PRIORITY]                              │
│                                                                      │
│  Subplans:                                                          │
│    1A. Research Pipeline                                            │
│    1B. Pre-Read Generation                                          │
│    1C. Facilitator Script Generation                                │
│    1D. Workbook Template Generation                                 │
│    1E. Parent Digest Generation                                     │
│    1F. Quality Validation Service                                   │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      PHASE 2: Review & Publish                       │
│            Review queue, module preview, publish workflow            │
│                         [MEDIUM PRIORITY]                            │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   PHASE 3: Intelligence & Iteration                  │
│       Knowledge compounding, post-cohort insights, revisions         │
│                         [MEDIUM PRIORITY]                            │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         PHASE 4: Polish                              │
│       Rich editor, template library, version history, export         │
│                          [LOWER PRIORITY]                            │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Core AI Pipeline

### Objective
Build the complete content generation pipeline: research gathering → gold-standard authoring → AI generation of all 4 content types → quality validation.

### Child Plan: `phase-1-core-ai-pipeline.md`

This phase has **6 subplans** that can be partially parallelized:

```
┌──────────────────┐
│  1A. Research    │──────────────────────────────────┐
│     Pipeline     │                                  │
└────────┬─────────┘                                  │
         │                                            │
         ▼                                            ▼
┌──────────────────┐    ┌──────────────────┐   ┌──────────────────┐
│ 1B. Pre-Read     │    │ 1F. Quality      │   │ (Shared infra)   │
│    Generation    │◄───│    Validation    │   │                  │
└────────┬─────────┘    └──────────────────┘   └──────────────────┘
         │                      ▲
         ▼                      │
┌──────────────────┐            │
│ 1C. Facilitator  │────────────┤
│    Scripts       │            │
└────────┬─────────┘            │
         │                      │
         ▼                      │
┌──────────────────┐            │
│ 1D. Workbook     │────────────┤
│    Templates     │            │
└────────┬─────────┘            │
         │                      │
         ▼                      │
┌──────────────────┐            │
│ 1E. Parent       │────────────┘
│    Digests       │
└──────────────────┘
```

---

### Subplan 1A: Research Pipeline

**Objective:** Implement automated research gathering following the pipeline-pattern.md architecture.

**Reference:** `docs/pipeline-pattern.md` Phase 2 (Research) + Phase 3 (Extraction)

#### Database Schema

```sql
-- Faceted query catalog (parameterized templates)
CREATE TABLE research_query_catalog (
  id UUID PRIMARY KEY,
  facet TEXT NOT NULL, -- e.g., 'developmental_psychology', 'pedagogy', 'scenarios'
  template TEXT NOT NULL, -- e.g., 'What developmental challenges do {{age_band}} face with {{domain}}?'
  priority INTEGER DEFAULT 5, -- 1-10, controls depth inclusion
  depth_requirement TEXT DEFAULT 'draft', -- sketch, draft, deep, exhaustive
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Research sessions per module
CREATE TABLE module_research (
  id UUID PRIMARY KEY,
  module_id UUID REFERENCES modules(id),
  depth_level TEXT DEFAULT 'draft', -- sketch, draft, deep, exhaustive
  status TEXT DEFAULT 'pending', -- pending, exploring, extracting, completed, failed
  created_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ
);

-- Individual research answers (exploration results)
CREATE TABLE research_answers (
  id UUID PRIMARY KEY,
  research_id UUID REFERENCES module_research(id),
  query_id UUID REFERENCES research_query_catalog(id),
  facet TEXT NOT NULL,
  question TEXT NOT NULL, -- Filled template
  response TEXT NOT NULL,
  embedding vector(1536), -- For semantic retrieval
  created_at TIMESTAMPTZ DEFAULT now(),
  refined_at TIMESTAMPTZ,
  response_history JSONB DEFAULT '[]'
);

-- Structured knowledge extraction
CREATE TABLE research_extractions (
  id UUID PRIMARY KEY,
  research_id UUID REFERENCES module_research(id),
  structured_knowledge JSONB NOT NULL, -- Schema-validated extraction
  sources JSONB NOT NULL, -- Maps sections to contributing answer IDs
  created_at TIMESTAMPTZ DEFAULT now()
);
```

#### Subagent Tasks

**Subagent 1A-1 (Catalog):** Create research query catalog for education domain
- Define facets: `developmental_psychology`, `pedagogy`, `executive_function`, `social_dynamics`, `scenarios`, `age_appropriateness`
- Create ~50 parameterized query templates with priority levels
- Template variables: `{{domain}}`, `{{age_band}}`, `{{artifact_name}}`, `{{socratic_phase}}`

**Subagent 1A-2 (Backend):** Build research exploration service
- Depth-controlled query selection (sketch → exhaustive)
- Streaming LLM execution with SSE events
- Embedding generation for each answer (using pgvector)
- Context assembly using semantic retrieval (top-N similar answers)
- Pause/resume capability
- Rate limit management (proactive throttling)

**Subagent 1A-3 (Backend):** Build structured extraction service
- Schema-validated extraction from raw answers
- Source traceability (map each section to contributing answers)
- Partial re-extraction (update specific facets without full regeneration)

**Subagent 1A-4 (UI):** Build research workflow UI
- "Run Research" button on module page
- Depth selector (sketch/draft/deep/exhaustive)
- Real-time progress display (streaming answers)
- Research summary view (structured extraction)
- Re-run/adjust capability

**Files to create:**
- `apps/backoffice/src/lib/research/query-catalog.ts`
- `apps/backoffice/src/lib/research/exploration-service.ts`
- `apps/backoffice/src/lib/research/extraction-service.ts`
- `apps/backoffice/src/lib/research/embedding-service.ts`
- `apps/backoffice/src/app/api/research/explore/route.ts`
- `apps/backoffice/src/app/api/research/extract/route.ts`
- `apps/backoffice/src/components/module-builder/research-panel.tsx`
- `supabase/migrations/00010_research_pipeline.sql`

---

### Subplan 1B: Pre-Read Generation

**Objective:** Generate pre-reads for Weeks 2-6 based on gold-standard Week 1 pre-read.

**Reference:** `docs/modules/module-1.md` pre-read examples (Kai, Zara, Marcus, etc.)

#### Content Schema (Pre-Read)

```typescript
interface PreReadContent {
  title: string;
  type: 'graphic-novel' | 'scenario' | 'briefing';
  weekNumber: number;
  socraticPhase: SocraticPhase;

  // Characters/scenarios
  characters: Array<{
    name: string;
    age: number;
    location: string;
    scenario: string; // The narrative vignette
    whatItReveals: string[]; // Implicit learning points
  }>;

  // Reflection prompts
  implicitReflectionPrompts: string[];

  // Metadata
  readingLevel: number; // Flesch-Kincaid grade
  estimatedReadTime: number; // minutes
  formatDetails: {
    pageCount: string;
    illustrationNotes: string;
  };
}
```

#### Subagent Tasks

**Subagent 1B-1 (Backend):** Build pre-read generation service
- Input: gold-standard Week 1 + research extraction + module metadata
- Prompt engineering for character creation (diverse, relatable, age-appropriate)
- Maintain narrative arc across weeks (each week builds on previous)
- Embedding-based consistency (retrieve relevant prior pre-reads as context)
- Source tracing (which research informed which character/scenario)

**Subagent 1B-2 (Backend):** Build gold-standard marking workflow
- "Mark as Gold Standard" action on content editor
- Validation: content must have all required fields
- Store `is_gold_standard` flag
- Extract style patterns for generation prompt

**Subagent 1B-3 (UI):** Build pre-read generation UI
- "Generate Weeks 2-6 Pre-Reads" button
- Progress indicator (generating Week 2... Week 3...)
- Draft review interface with side-by-side comparison
- Approve/Edit/Regenerate actions per week

**Files to create:**
- `apps/backoffice/src/lib/generation/pre-read-service.ts`
- `apps/backoffice/src/lib/generation/gold-standard-extractor.ts`
- `apps/backoffice/src/app/api/generate/pre-read/route.ts`
- `apps/backoffice/src/components/module-builder/pre-read-generator.tsx`
- `apps/backoffice/src/components/module-builder/draft-review.tsx`

---

### Subplan 1C: Facilitator Script Generation

**Objective:** Generate facilitator scripts for all 6 weeks.

**Reference:** `docs/modules/module-1.md` session plans (opening check-in, pre-read debrief, core activity, workbook time, group share & close)

#### Content Schema (Facilitator Script)

```typescript
interface FacilitatorScriptContent {
  weekNumber: number;
  sessionTitle: string;
  totalDuration: number; // minutes

  sections: Array<{
    name: string; // e.g., "Opening Check-In", "Pre-Read Debrief"
    duration: number;
    facilitatorScript: string; // Actual words to say
    discussionQuestions?: string[];
    expectedStudentResponses?: string[];
    ifThisHappensTryThis?: Array<{
      situation: string;
      response: string;
    }>;
    keyTakeaway?: string;
  }>;

  // Differentiation guidance
  differentiation: {
    finishEarly: string;
    struggling: string;
    quieterKids: string;
  };

  // Materials needed
  materials: string[];

  // Facilitator notes
  facilitatorNotes: string;
}
```

#### Subagent Tasks

**Subagent 1C-1 (Backend):** Build facilitator script generation service
- Input: pre-read content (must exist first) + research + module metadata
- Dependency: scripts depend on pre-reads (progressive enrichment)
- Generate realistic expected responses
- Include contingency handling (if this happens, try this)
- Timing validation (sections sum to total duration)

**Subagent 1C-2 (UI):** Build script generation UI
- "Generate Facilitator Scripts" button (enabled after pre-reads approved)
- Progress indicator
- Script preview with timing visualization
- Edit capability for each section

**Files to create:**
- `apps/backoffice/src/lib/generation/facilitator-script-service.ts`
- `apps/backoffice/src/app/api/generate/facilitator-script/route.ts`
- `apps/backoffice/src/components/module-builder/script-generator.tsx`

---

### Subplan 1D: Workbook Template Generation

**Objective:** Generate workbook page templates for all sessions.

**Reference:** `docs/modules/module-1.md` workbook pages (Focus Snapshot, Pattern Mapping, etc.)

#### Content Schema (Workbook)

```typescript
interface WorkbookTemplateContent {
  weekNumber: number;
  pages: Array<{
    pageNumber: number;
    title: string;
    instructions?: string;
    sections: Array<{
      type: 'prompt' | 'checkbox' | 'fill-in' | 'drawing-space' | 'list';
      label: string;
      prompt?: string;
      options?: string[]; // For checkbox type
    }>;
  }>;
}
```

#### Subagent Tasks

**Subagent 1D-1 (Backend):** Build workbook generation service
- Input: facilitator script (must exist) + pre-read + module metadata
- Dependency: workbooks depend on scripts (activities must match)
- Ensure workbook activities align with script timing
- Age-appropriate formatting

**Subagent 1D-2 (UI):** Build workbook generation UI
- "Generate Workbook Templates" button
- Page-by-page preview
- Visual workbook editor

**Files to create:**
- `apps/backoffice/src/lib/generation/workbook-service.ts`
- `apps/backoffice/src/app/api/generate/workbook/route.ts`
- `apps/backoffice/src/components/module-builder/workbook-generator.tsx`

---

### Subplan 1E: Parent Digest Generation

**Objective:** Generate parent communication templates for each week.

**Reference:** `docs/modules/module-1.md` parent digest template

#### Content Schema (Parent Digest)

```typescript
interface ParentDigestContent {
  weekNumber: number;
  subject: string; // Email subject line template

  sections: {
    sessionSummary: string;
    childQuoteTemplate: string; // "[Kid] said: \"{{quote}}\""
    insightHighlight: string;
    nextWeekPreview: string;
    conversationStarter: string;
  };

  // Personalization fields
  personalizationFields: string[]; // e.g., ['childName', 'specificQuote', 'specificObservation']
}
```

#### Subagent Tasks

**Subagent 1E-1 (Backend):** Build parent digest generation service
- Input: all other content types + module metadata
- Dependency: digests depend on scripts and workbooks
- Generate templates with personalization placeholders
- Tone: warm, informative, not overwhelming

**Subagent 1E-2 (UI):** Build digest generation UI
- "Generate Parent Digests" button
- Template preview with sample personalization

**Files to create:**
- `apps/backoffice/src/lib/generation/parent-digest-service.ts`
- `apps/backoffice/src/app/api/generate/parent-digest/route.ts`
- `apps/backoffice/src/components/module-builder/digest-generator.tsx`

---

### Subplan 1F: Quality Validation Service

**Objective:** Automated quality scoring for all content types.

**Reference:** `docs/pipeline-pattern.md` Phase 7 (quality validation with retry)

#### Quality Dimensions

| Dimension | Applies To | Measurement |
|-----------|------------|-------------|
| Reading Level | Pre-reads, Digests | Flesch-Kincaid grade (target: 5th-7th) |
| Scenario Specificity | Pre-reads | Character names, concrete details, location |
| Emotional Engagement | Pre-reads | Reflection prompts, emotional vocabulary |
| Timing Accuracy | Scripts | Sections sum to total, realistic durations |
| Activity Alignment | Workbooks | Activities match script descriptions |
| Age Appropriateness | All | Vocabulary, scenarios, complexity |
| Consistency | All | No contradictions with prior weeks |

#### Subagent Tasks

**Subagent 1F-1 (Backend):** Build quality validation service
- Reading level calculator (Flesch-Kincaid)
- Specificity analyzer (named characters, locations, concrete scenarios)
- LLM-based semantic checks (engagement, appropriateness)
- Timing validator (for scripts)
- Cross-content consistency checker (embedding-based)

**Subagent 1F-2 (Backend):** Build retry-with-feedback logic
- If quality score below threshold, retry with validator feedback in prompt
- Max retry limit (3 attempts)
- Truncation detection (don't retry if hit token limit)

**Subagent 1F-3 (UI):** Build quality display components
- Quality score badges on content items
- Detailed breakdown panel
- Pass/fail indicators

**Files to create:**
- `apps/backoffice/src/lib/validation/quality-service.ts`
- `apps/backoffice/src/lib/validation/reading-level.ts`
- `apps/backoffice/src/lib/validation/consistency-checker.ts`
- `apps/backoffice/src/components/module-builder/quality-panel.tsx`

---

### Shared Infrastructure (Phase 1)

These components are used across multiple subplans:

**1. LLM Service Abstraction**
```typescript
// apps/backoffice/src/lib/llm/client.ts
interface LLMClient {
  generate(prompt: string, options: GenerationOptions): AsyncGenerator<StreamEvent>;
  embed(text: string): Promise<number[]>;
}
```

**2. Embedding Service**
```typescript
// apps/backoffice/src/lib/embeddings/service.ts
interface EmbeddingService {
  embed(text: string): Promise<number[]>;
  findSimilar(embedding: number[], limit: number): Promise<SimilarItem[]>;
}
```

**3. Generation Job Manager**
```typescript
// apps/backoffice/src/lib/generation/job-manager.ts
interface JobManager {
  createJob(type: ContentType, moduleId: string): Promise<Job>;
  updateProgress(jobId: string, progress: Progress): Promise<void>;
  completeJob(jobId: string, result: Content): Promise<void>;
  failJob(jobId: string, error: Error): Promise<void>;
}
```

**4. Content Dependency Graph**
```typescript
// apps/backoffice/src/lib/generation/dependency-graph.ts
const CONTENT_DEPENDENCIES = {
  pre_read: [], // No dependencies, but needs research
  facilitator_script: ['pre_read'], // Depends on pre-read
  workbook_template: ['facilitator_script'], // Depends on script
  parent_digest: ['facilitator_script', 'workbook_template'], // Depends on both
};
```

---

### Phase 1 Success Criteria

- [ ] Expert can run research at different depth levels
- [ ] Research produces structured, source-traced knowledge
- [ ] Expert can author and mark gold-standard Week 1 content
- [ ] "Generate" produces all 4 content types for Weeks 2-6
- [ ] Generated content matches quality of `module-1.md` examples
- [ ] Quality scores display for all content
- [ ] Expert can approve/edit/regenerate each piece
- [ ] Content respects dependency order (pre-reads → scripts → workbooks → digests)

---

## Phase 2: Review & Publish

### Objective
Provide streamlined review workflow, module preview, and atomic publishing.

### Child Plan: `phase-2-review-publish.md`

### Key Deliverables

#### 2.1 Review Queue Page

**Subagent Tasks:**
- [ ] **Subagent 2A (UI):** Build consolidated review queue
  - Filter by module, content type, status
  - Batch actions (approve multiple)
  - Quality score summary per item
  - Link to content editor

**Files:**
- `apps/backoffice/src/app/(dashboard)/review/page.tsx`
- `apps/backoffice/src/components/review/review-queue.tsx`

#### 2.2 Module Preview

**Subagent Tasks:**
- [ ] **Subagent 2B (UI):** Build module preview page
  - Tab navigation: Pre-reads | Scripts | Workbooks | Digests
  - Sequential week-by-week view
  - Read-only formatted render
  - Alignment check indicators

**Files:**
- `apps/backoffice/src/app/(dashboard)/modules/[id]/preview/page.tsx`
- `apps/backoffice/src/components/module-builder/content-renderer.tsx`

#### 2.3 Module-Level Publish

**Subagent Tasks:**
- [ ] **Subagent 2C (Feature):** Build atomic publish workflow
  - Pre-publish checklist (all content approved?)
  - Confirmation dialog
  - Module versioning (v1.0 → v1.1)
  - Atomic transaction (all or nothing)

**Database changes:**
- Add `version TEXT`, `published_at TIMESTAMPTZ` to `modules`

### Phase 2 Success Criteria
- [ ] Review queue shows all pending content
- [ ] Preview renders full module as end-users see it
- [ ] Expert can publish entire module atomically
- [ ] Module versions are tracked

---

## Phase 3: Intelligence & Iteration

### Objective
Enable knowledge compounding across modules and post-cohort improvement workflow.

### Child Plan: `phase-3-intelligence-iteration.md`

**Reference:** `docs/pipeline-pattern.md` Phase 8 (Insight Discovery)

### Key Deliverables

#### 3.1 Knowledge Compounding

**Subagent Tasks:**
- [ ] **Subagent 3A (Feature):** Build cross-module knowledge linking
  - Domain-based module relationships
  - Research cross-references
  - "Related Research" panel on module intake
  - Select relevant knowledge to feed into new module

#### 3.2 Post-Cohort Insights Pipeline

Following the multi-stream reasoning pattern from pipeline-pattern.md:

**Input Streams:**
1. Facilitator feedback (post-session forms)
2. Structured research from the module
3. Engagement metrics (if available)

**Insight Types:**
- `scenario_mismatch`: "Kids didn't relate to banking scenario"
- `reading_level_issue`: "Pre-read Week 3 too complex"
- `timing_problem`: "Activity X consistently runs over"
- `engagement_drop`: "Week 4 has lowest engagement"

**Subagent Tasks:**
- [ ] **Subagent 3B (Backend):** Build insights pipeline
  - Consume facilitator feedback
  - Generate revision recommendations
  - Priority scoring
  - Trace to specific content items
- [ ] **Subagent 3C (UI):** Build iteration workflow UI
  - Revision recommendations list
  - Click-through to affected deliverable
  - "Accept revision" workflow
  - Auto-version increment on republish

**Database:**
```sql
CREATE TABLE module_insights (
  id UUID PRIMARY KEY,
  module_id UUID REFERENCES modules(id),
  cohort_id UUID REFERENCES cohorts(id),
  insight_type TEXT,
  recommendation TEXT,
  affected_content_id UUID REFERENCES content_items(id),
  priority INTEGER,
  status TEXT, -- pending, accepted, rejected, implemented
  created_at TIMESTAMPTZ
);

CREATE TABLE facilitator_feedback (
  id UUID PRIMARY KEY,
  session_id UUID REFERENCES sessions(id),
  cohort_id UUID REFERENCES cohorts(id),
  pre_read_rating INTEGER,
  activity_worked TEXT,
  activity_flat TEXT,
  timing_notes TEXT,
  student_responses TEXT,
  suggestions TEXT,
  created_at TIMESTAMPTZ
);
```

### Phase 3 Success Criteria
- [ ] New modules can reference research from related modules
- [ ] Facilitator feedback flows into insights pipeline
- [ ] Revision recommendations surface with priority
- [ ] Revisions auto-increment module version

---

## Phase 4: Polish

### Objective
Complete remaining PRD features for polished expert experience.

### Child Plan: `phase-4-polish.md`

### Key Deliverables

#### 4.1 Rich Text Editor
- Replace JSON textarea with TipTap/Lexical editor
- Structured fields for metadata
- Real-time quality feedback panel

#### 4.2 Content Template Library
- Socratic phase templates (Observe, Map, Design, Test, Codify)
- Content type templates
- Template browser with preview

#### 4.3 Version History Viewer
- Timeline view of versions
- Diff view between versions
- Restore capability

#### 4.4 Export Bundle
- Export formats: JSON, Markdown, PDF
- Include all content types
- Metadata preservation

#### 4.5 Success Metrics Dashboard
- Time to produce a module
- First-draft quality pass rate
- Expert satisfaction tracking

### Phase 4 Success Criteria
- [ ] Rich editor provides better authoring UX
- [ ] Templates accelerate content creation
- [ ] Version history enables rollback
- [ ] Export produces complete bundles

---

## Subagent Orchestration Model

### How Work Gets Delegated

```
┌─────────────────────────────────────────────────────────────────┐
│                    ORCHESTRATOR (Claude)                         │
│                                                                  │
│  Responsibilities:                                               │
│  • Break work into well-scoped subagent tasks                   │
│  • Provide clear context and constraints to each subagent       │
│  • Review subagent outputs for quality and consistency          │
│  • Ensure shared components are reused (not duplicated)         │
│  • Integrate subagent work into coherent whole                  │
│  • Make architectural decisions when subagents need guidance    │
│  • Track progress against master plan                           │
└─────────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            ▼                 ▼                 ▼
     ┌───────────┐     ┌───────────┐     ┌───────────┐
     │ Subagent  │     │ Subagent  │     │ Subagent  │
     │   (UI)    │     │ (Backend) │     │ (Schema)  │
     └───────────┘     └───────────┘     └───────────┘
```

### Subagent Task Template

Each subagent receives:

```markdown
## Context
[What exists, what's the goal, relevant files/patterns]

## Scope
[Specific files to create/modify]

## Constraints
- Must reuse: [existing components]
- Must follow: [patterns from X file]
- Must not: [anti-patterns to avoid]

## Dependencies
[What must exist before this task]

## Output
[Expected deliverable]

## Verification
[How to test the work]
```

### Parallel vs Sequential Work

| Can Run in Parallel | Must Be Sequential |
|--------------------|-------------------|
| 1A (Research) + 1F (Quality) | 1A → 1B (Research before Pre-reads) |
| UI components for different pages | 1B → 1C → 1D → 1E (Content dependency chain) |
| Schema design + UI mockups | Backend → UI (UI needs API) |
| Different content type generators | Phase 1 → Phase 2 → Phase 3 → Phase 4 |

---

## Environment Configuration

```env
# LLM (Anthropic Claude)
ANTHROPIC_API_KEY=
GENERATION_MODEL=claude-sonnet-4-20250514
EMBEDDING_MODEL=text-embedding-3-small

# Supabase (with pgvector)
SUPABASE_URL=
SUPABASE_SERVICE_KEY=

# Rate Limiting
LLM_REQUESTS_PER_MINUTE=50
LLM_TOKENS_PER_MINUTE=100000
```

---

## Verification Strategy

### Per-Phase Verification

**Phase 1:**
1. Create test module "Focus & Attention"
2. Run research at "draft" depth
3. Author gold-standard Week 1 pre-read manually
4. Generate Weeks 2-6 pre-reads
5. Verify generated content matches `module-1.md` quality
6. Generate scripts, workbooks, digests
7. Verify dependency order respected
8. Verify quality scores accurate

**Phase 2:**
1. Populate review queue with test content
2. Preview module, verify formatting
3. Publish module, verify version increments
4. Verify module visible in facilitator app

**Phase 3:**
1. Create second module in same domain
2. Verify related research surfaces
3. Submit mock facilitator feedback
4. Verify insights pipeline generates recommendations
5. Accept revision, verify version increment

**Phase 4:**
1. Author content with rich editor
2. Use template to create new content
3. Compare version history
4. Export module bundle

### End-to-End Workflow Test

Complete expert workflow:
1. Create new module (intake form)
2. Run research (draft depth)
3. Author gold-standard Week 1 pre-read
4. Mark as gold standard
5. Generate all Weeks 2-6 content (4 types)
6. Review quality scores
7. Edit any failing content
8. Preview full module
9. Publish module v1.0
10. (Later) Receive cohort feedback
11. Review revision recommendations
12. Apply revisions
13. Publish module v1.1

---

## Open Items Resolved

| Question | Resolution |
|----------|------------|
| LLM Provider | Anthropic Claude |
| Research Sources | Hybrid: web search + uploaded docs (web/internal first) |
| Insights Pipeline | Build as part of Phase 3 (following pipeline-pattern.md) |
| Editor Priority | AI generation first (keep JSON editor), rich editor in Phase 4 |
| Content Scope | All 4 types from beginning, with subplans for each |

---

## Next Steps

1. **User approves this master plan**
2. Create detailed child plan for Phase 1A (Research Pipeline)
3. Begin Phase 1 implementation via subagents:
   - Start with shared infrastructure (LLM client, embedding service)
   - Then research pipeline (1A)
   - Then content generators in dependency order (1B → 1C → 1D → 1E)
   - Quality validation (1F) can parallel with generators
4. Orchestrator reviews each subagent output before integration
5. Complete Phase 1, then proceed to Phase 2
