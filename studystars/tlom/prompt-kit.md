# The Library of Me — Prompt Kit

A collection of production-ready prompts for building out The Library of Me's components, organized by phase and dependency.

**How to use this kit:**
- Each prompt is self-contained with embedded context about the product
- Copy the prompt text directly into Claude, ChatGPT, or your AI tool of choice
- Attach the reference files noted in the "Context to Attach" section
- Follow the dependency notes to understand the build order
- Mark prompts as "MVP" (needed for pilot) or "Scale" (for later expansion)

---

## SECTION 1: PRODUCT REQUIREMENT DOCUMENTS (PRDs)

### 1. Parent Portal PRD

**Status:** MVP (needed for pilot)
**Dependencies:** None (reads from concept + operations)
**Attach:** concept-v2.md, operations.md
**Expected Output:** 15-20 page PRD with user flows, feature matrix, data model, API specs
**Time to Complete:** 1-2 sessions with Claude

**Prompt:**

```
You are helping design The Library of Me, a modular curriculum where kids (ages 10–15)
design their own operating system for life through cohort sessions, case studies, and
scaffolded reflection.

I'm attaching two documents:
1. concept-v2.md — the product vision and architecture
2. operations.md — the operational model and technical stack

Your task: Write a comprehensive Product Requirement Document (PRD) for the Parent Portal.

The Parent Portal is a web application (mobile-first) where:
- Parents onboard their family and select modules
- Parents track their child's module progress
- Premium tier: Parents submit workbooks for AI processing, see processed artifacts, manage the Digital Library
- Premium+ tier: Parents preview and order printed books

The PRD should include:

1. OVERVIEW
   - 2-3 sentence summary of what the portal is and why it matters
   - User personas (parent profiles: privacy-conscious, aspirational, tech-savvy, skeptical)
   - Core user flows (onboarding, weekly engagement, Premium submission, print ordering)

2. USER STORIES
   - Minimum 15-20 user stories covering all three tiers (Core, Premium, Premium+)
   - Format: "As a [persona], I want to [action], so that [outcome]"
   - Include acceptance criteria for each story

3. FEATURE BREAKDOWN BY TIER
   - Core Tier features (onboarding, dashboard, schedule, pre-read links)
   - Premium Tier additions (workbook submission, artifact review, Digital Library, parent digests)
   - Premium+ Tier additions (print preview, cover customization, ordering, tracking)

4. WIREFRAME DESCRIPTIONS
   - Homepage/login
   - Onboarding flow (3-4 screens)
   - Module dashboard (current module, upcoming session, pre-read access)
   - Workbook submission flow (photo upload, page review, approval)
   - Digital Library dashboard (bookshelf view, artifact detail, search)
   - Print ordering flow (preview → customize → order → tracking)

5. DATA MODEL
   - Family schema (parent, kid, preferences, tier)
   - Module schema (title, artifact name, learning objectives, week content)
   - Submission schema (workbook pages, metadata, processing status)
   - Artifact schema (processed content, Library entry, version history)
   - Order schema (book details, shipping, payment)

6. API REQUIREMENTS
   - Authentication endpoints
   - Module data endpoints (GET current module, GET upcoming session, GET pre-read)
   - Submission endpoints (POST workbook, GET processing status, PUT approval)
   - Library endpoints (GET artifacts, PUT Library, DELETE artifact)
   - Order endpoints (POST order, GET tracking, GET proof preview)

7. PAYMENT AND TIER LOGIC
   - How tier selection works at onboarding
   - How upgrades work mid-module
   - How print orders integrate with Stripe
   - Refund/cancellation logic

8. DESIGN PRINCIPLES
   - Mobile-first (parents use phones)
   - Calm, premium aesthetic (not edtech-cluttered)
   - Maximum 3 taps to any action
   - No dark patterns, no engagement manipulation
   - Clear data transparency

9. SUCCESS METRICS
   - Onboarding completion rate
   - Core to Premium conversion rate
   - Premium to Premium+ upgrade rate
   - Artifact submission rate
   - Print order completion rate
   - Session attendance rate
   - Repeat module rate

10. DEPENDENCIES AND INTEGRATIONS
    - Stripe for payments
    - WhatsApp Business API for nudges
    - Content layer (pre-reads, session info)
    - AI pipeline for artifact processing
    - Lulu/Blurb API for print fulfillment
    - Email service for parent digests

Write the PRD in clear, structured markdown. Be specific about flows and interactions.
Include rough wireframe text descriptions where helpful.
```

---

### 2. Facilitator Companion App PRD

**Status:** MVP (needed for pilot)
**Dependencies:** None
**Attach:** concept-v2.md, operations.md
**Expected Output:** 12-15 page PRD with UI component specs, session timeline format specs
**Time to Complete:** 1-2 sessions

**Prompt:**

```
You are helping design The Library of Me's Facilitator Companion App — a purpose-built
tool for contract facilitators delivering live cohort sessions.

I'm attaching:
1. concept-v2.md — product vision
2. operations.md — operational model (including the app design philosophy)

Your task: Write a comprehensive PRD for the Facilitator Companion App.

Key context from operations.md:
- iPad Pro landscape orientation
- Two-column layout: Session Timeline (left) + Materials & Notes (right)
- Built in Next.js with shadcn/ui components
- Clean, utilitarian UI — designed for quick scanning, not aesthetics
- Reads from the content layer (no code changes needed to add new modules)

The PRD should include:

1. OVERVIEW
   - Why this app exists: enables contract facilitators to deliver reliably without improvisation
   - Target user: warm, organized, contract facilitators (not necessarily certified teachers)
   - Design philosophy: scanning + quick reference during live sessions

2. USER PERSONAS
   - Contract facilitator (part-time, 2-4 cohorts/week)
   - Education expert (reviews post-session feedback)
   - Operations manager (assigns facilitators, monitors cohort health)

3. LAYOUT AND NAVIGATION
   - Two-column responsive layout (left: timeline, right: materials)
   - Mobile collapse: single column on smaller screens
   - Top nav: cohort selector, session date/time, recording toggle
   - Navigation never blocks content

4. SESSION TIMELINE (LEFT PANEL)
   - Accordion structure, one accordion per session
   - Example: Module 1, Week 2 session with timed segments
   - Each segment includes:
     * Activity name
     * Facilitator note (1-2 lines)
     * Key prompts (3-4 discussion questions)
     * Expected responses (examples of what kids might say + follow-ups)
     * If-this-then-that handling (what to do if activity stalls)
     * Timer (visible countdown)
   - Segments are expandable/collapsible
   - Current segment highlighted
   - Completed segments greyed out
   - Approx. 4-6 segments per 60-minute session

5. MATERIALS & PREP CHECKLIST (RIGHT PANEL, TOP)
   - Interactive checkboxes (tap to mark complete)
   - List includes:
     * Pre-read sent and delivery confirmed
     * Slides loaded and screen-share ready
     * Workbook template available (PDF link)
     * Zoom/Google Meet room open 5 min early
     * Recording settings configured
     * Parent digest template queued
   - Visual indicator: how many pre-checks complete

6. TEACHER NOTES (RIGHT PANEL, BOTTOM)
   - Collapsible sections:
     * Differentiation (what if kids finish early? what if they struggle?)
     * Common Issues (e.g., "Kids say 'I can't focus on anything'" → reframe strategy)
     * This Week's Pre-Read Context (1-paragraph summary)
     * Key Takeaway (what every kid should leave with)
   - Expandable to full-screen if needed

7. COHORT MANAGEMENT FEATURES
   - Cohort roster with kid names
   - Attendance checkbox (tap each kid as they join)
   - Facilitator notes per kid (collapsible, e.g., "Sarah was quiet today, very engaged via chat")
   - Post-session feedback form (structured: "What landed? What didn't? Any concerns?")
   - Link to trigger parent digest generation for Premium families

8. CONTENT SOURCE ARCHITECTURE
   - App reads from content layer (JSON/structured data)
   - New modules automatically appear in the app
   - No code changes needed to add content
   - Facilitator selects from dropdown: "Module 1, Week 3"
   - Content populates immediately

9. REAL-TIME FEATURES
   - Timer counts down visibly (can be paused, reset)
   - "Recording live" indicator (if Zoom is active)
   - Attendance updates sync to backend (for ops dashboard)
   - Feedback form submits to database
   - Parent digest trigger queues the generation

10. OFFLINE RESILIENCE
    - Core timeline content cached locally
    - App works offline (reads cached content)
    - Sync when back online (attendance, feedback, notes)

11. ACCESSIBILITY
    - High contrast mode for use in varied lighting
    - Large tap targets (for quick clicks)
    - Keyboard shortcuts (spacebar = toggle current segment, arrow keys = move between segments)
    - Screen reader support for cohort roster

12. DESIGN COMPONENTS
    - shadcn/ui components: Accordion, Checkbox, Button, Card, AlertDialog, Tabs
    - Color palette: neutral + one accent color
    - Typography: clear hierarchy (activity names prominent, notes secondary)

13. DATA MODEL
    - Session schema (module, week, segments, timing, activities, notes)
    - Cohort schema (kids list, facilitator, start date, ongoing/completed)
    - Facilitator feedback schema (per-segment, overall, text notes)
    - Attendance schema (kid, session, present/absent)

14. SUCCESS METRICS
    - Facilitator prep time (should be <5 min to load session)
    - Session timing accuracy (how often do sessions match timeline estimates?)
    - Facilitator confidence (post-training survey)
    - Cohort attendance rate (proxy for facilitator reliability)
    - Post-session feedback quality (are facilitators providing useful insights?)

15. DEPENDENCIES
    - Content layer API (reads module + session structure)
    - Attendance/feedback database
    - Zoom/Google Meet integration (for recording indicator)
    - Parent digest triggering system
    - Analytics/ops dashboard (receives cohort data)

16. NICE-TO-HAVES (POST-MVP)
    - Facilitator notes per kid (searchable history)
    - Template messages for common situations
    - Video examples of good facilitation (embedded tutorials)
    - Peer facilitator messaging (quick Q&A during sessions)
    - Session recording transcript (transcription service)

Write the PRD in clear markdown. Include wireframe text descriptions for each major screen.
Be specific about component behavior (e.g., "Clicking the timer pauses it and shows a 'paused' label").
```

---

### 3. Module Builder PRD

**Status:** MVP (needed for pilot)
**Dependencies:** None
**Attach:** concept-v2.md, operations.md
**Expected Output:** 12-15 page PRD focused on workflow and content templates
**Time to Complete:** 1-2 sessions

**Prompt:**

```
You are designing The Library of Me's Module Builder — an internal tool for the education
expert to design modules and manage the AI-powered content generation pipeline.

I'm attaching:
1. concept-v2.md — product vision
2. operations.md — operational model (see "THE MODULE BUILDER" section for context)

Your task: Write a comprehensive PRD for the Module Builder.

Key context:
- This is an education expert's workstation, not a product feature
- Workflow: Define module → Run research → Author gold-standard pre-read → Generate remaining
  content → Review and approve → Preview → Publish
- The "gold-standard pattern" is key: expert writes ONE pre-read by hand. AI generates the
  rest following that pattern.
- It's the interface to the content production pipeline described in operations.md

The PRD should include:

1. OVERVIEW
   - Who uses it: education expert (part-time, 10-15 hours/week during content sprints)
   - Why it exists: manage the AI-powered pipeline, ensure pedagogical quality, review/approve outputs
   - Core workflow: one module creation cycle takes 2-3 weeks of part-time work

2. MODULE INTAKE WORKFLOW
   - Form to define a new module:
     * Topic domain (executive function, communication, etc.)
     * Target artifact name (e.g., "User Manual for My Brain")
     * Socratic cycle phase mapping (Week 1 = Observe, Week 2 = Map, etc.)
     * Learning objectives per session (text entry)
     * Reference materials (paste URLs or upload PDFs)
     * Notes from related modules (compound knowledge)
     * Target age band (10-12, 13-15)
     * Estimated difficulty level
   - Output: Intake object stored and versioned
   - This object feeds every downstream step

3. AUTOMATED RESEARCH WORKFLOW
   - Button: "Run Research"
   - Shows: research parameterized query templates and topics
   - System executes queries (may take 5-10 min)
   - Output: Structured knowledge object (machine-readable, not for human reading)
   - Displays: "Research complete. Ready to review."
   - Expert can: view raw research summary, adjust queries, rerun research
   - Output is stored and feeds downstream content generation

4. GOLD-STANDARD PRE-READ AUTHORING
   - Text editor for writing the Week 1 pre-read
   - Side panel: reading level checker (real-time feedback)
   - Side panel: scenario specificity checker (is this relatable to target age?)
   - Side panel: emotional engagement scorer (does this prime introspection?)
   - Expert writes ONE high-quality pre-read
   - Marks it as "gold standard" when satisfied
   - This becomes the template for AI-generated pre-reads in subsequent weeks

5. BULK CONTENT GENERATION WORKFLOW
   - Button: "Generate Remaining Pre-Reads" (Weeks 2-6)
   - System shows: "Generating 5 pre-reads based on gold-standard..."
   - Status bar: generation progress
   - Output: 5 draft pre-reads appear in the interface
   - For each draft:
     * Preview (formatted text)
     * Quality scores (reading level, engagement, specificity)
     * Edit button (inline editing)
     * Approve/Reject buttons
   - Similar workflow for:
     * Facilitator scripts (one per session, 6 total)
     * Workbook templates (one per session, 6 total)
     * Parent digest templates (one per session, 6 total)

6. REVIEW AND APPROVAL WORKFLOW
   - All drafts appear in a queue
   - Expert reviews each deliverable:
     * Reads/scans content
     * Checks quality scores
     * Edits inline if needed
     * Clicks "Approve" or sends back for regeneration with feedback
   - Approved content moves to "Ready to Preview"
   - Quality gates prevent bad content from flowing downstream

7. MODULE PREVIEW
   - View entire module as it will appear to facilitators and parents:
     * Pre-reads in sequence (how does the story arc flow?)
     * Facilitator scripts with timing (do sessions run on time?)
     * Workbook pages (do they match the activities?)
     * Parent digests (do they highlight the right moments?)
   - Expert can spot-check alignment:
     * Does Week 2 pre-read reference Week 1 outcomes?
     * Does the facilitator script match the workbook activities?
     * Do parent digests tell a coherent story across the module?

8. PUBLISH WORKFLOW
   - Button: "Publish to Content Layer"
   - Confirmation: "This will make the module available in the facilitator app and parent portal"
   - Module versioning: all content gets a version number (v1.0, v1.1 after iteration)
   - Module becomes immediately available to:
     * Facilitator app (new option in session selector)
     * Parent portal (visible as an available module)
     * Content layer API (accessible to other systems)

9. POST-COHORT ITERATION WORKFLOW
   - After a cohort completes, insights pipeline runs
   - Expert sees: list of recommended revisions (prioritized, traced to data)
   - Expert can:
     * View revision recommendation (e.g., "Change banking scenario to social spending")
     * Click through to the affected deliverable (e.g., Week 3 pre-read)
     * Edit the deliverable directly
     * Mark as "approved revision"
   - Revised content is republished with new version number (v1.1)
   - All future cohorts automatically use the improved version

10. CONTENT TEMPLATE LIBRARY
    - Dropdown: choose template for new content
    - Templates include:
      * "Socratic Phase: Observe" pre-read template
      * "Socratic Phase: Map" pre-read template
      * "Socratic Phase: Design" pre-read template
      * "Socratic Phase: Test" pre-read template
      * "Socratic Phase: Codify" pre-read template
      * Facilitator script template
      * Workbook activity template
      * Parent digest template
    - Each template shows: structure, example, key elements to include

11. KNOWLEDGE COMPOUNDING VIEW
    - Shows: related modules (e.g., "If you're building Module 5 on procrastination,
      these modules have related research you can reference")
    - Links to: research from Module 1 (executive function), Module 2 (focus)
    - Allows expert to: select relevant knowledge objects to feed into new module research

12. SEARCH AND VERSION CONTROL
    - Search: find any previous module by name, topic, artifact name
    - Version history: view all versions of a module with what changed
    - Rollback: (admin only) revert to previous version if needed
    - Export: download all deliverables for a module as a bundle (for translation,
      backup, etc.)

13. COLLABORATION AND NOTES
    - Add notes to any deliverable (e.g., "Revised 2024-01-15 based on cohort feedback")
    - Tag collaborators (if multiple people are working on content)
    - Audit trail: who edited what, when, what they changed

14. DATA MODEL
    - Module schema (intake, research, deliverables, versions, status)
    - Deliverable schema (pre-read, script, workbook, digest, with metadata)
    - Quality check schema (scores, pass/fail criteria)
    - Insight schema (revision recommendations, priority, data source)

15. SUCCESS METRICS
    - Time to produce a full module (should be 18 hours of expert time, down from 60-80)
    - % of first-draft content that passes quality gates (target: 80%+)
    - % of facilitator feedback citing content improvements (proxy for iteration effectiveness)
    - Expert satisfaction (ease of use, speed, confidence in outputs)

16. DEPENDENCIES
    - LLM API for research and content generation
    - Quality validation service (reading level, engagement scoring)
    - Content layer storage and versioning
    - Insight discovery pipeline (provides revision recommendations)
    - Facilitator app and parent portal (consume published content)

Write the PRD in clear markdown. Include wireframe descriptions and sample workflows.
Be specific about what each button does and what expert sees at each step.
```

---

### 4. Content Layer / CMS PRD

**Status:** MVP (needed for pilot)
**Dependencies:** None
**Attach:** concept-v2.md, operations.md
**Expected Output:** 10-12 page PRD focused on schema and API design
**Time to Complete:** 1-2 sessions

**Prompt:**

```
You are designing The Library of Me's Content Layer — the structured data repository that
powers the Facilitator Companion App and Parent Portal.

I'm attaching:
1. concept-v2.md — product vision
2. operations.md — operational model (see "CONTENT LAYER ARCHITECTURE" section)

Your task: Write a comprehensive PRD for the Content Layer.

Key context from operations.md:
- This is a headless CMS or structured JSON/Markdown in version control
- Module schema includes: metadata, research knowledge object, week structure (pre-read,
  script, workbook, digest template), metadata for facilitator tips
- This content layer is what the facilitator app and parent portal READ FROM
- New modules published via Module Builder automatically populate both surfaces
- Content is version-controlled and traceable

The PRD should include:

1. OVERVIEW
   - What it is: structured data repository for all module content
   - Who consumes it: facilitator app, parent portal, Module Builder, AI pipeline
   - Why it matters: separates content from code (new modules don't require code changes)
   - Two options: Headless CMS (e.g., Sanity, Contentful) vs. structured JSON/YAML in Git

2. MODULE SCHEMA
   ```
   Module:
     - id (uuid)
     - version (semantic)
     - metadata
       * title
       * artifactName
       * domain (executive function, communication, etc.)
       * learningObjectives (array of strings)
       * targetAgeBand (10-12, 13-15)
       * difficulty (beginner, intermediate, advanced)
       * createdDate
       * lastUpdatedDate
       * authorName
       * status (draft, published, archived)
     - research
       * structuredKnowledgeObject (machine-readable, indexed)
       * sourceQueries (which research queries produced this)
     - weeks (array of Week objects)
       * weekNumber (1-6)
       * socraticPhase (observe, map, design, test, codify)
       * preRead (PreRead object)
       * facilitatorScript (FacilitatorScript object)
       * workbookTemplate (WorkbookTemplate object)
       * parentDigestTemplate (ParentDigestTemplate object)
     - facilitatorTips
       * commonIssues (array of issue + handling strategy)
       * differentiation (guidance for fast/slow learners)
       * keyTakeaway
   ```

3. PRE-READ SCHEMA
   ```
   PreRead:
     - id (uuid)
     - weekNumber
     - title
     - content (narrative text, structured for reading level)
     - readingLevel (grade equivalent, 4th-9th grade range)
     - characterNames (array)
     - scenarioSummary (1-sentence summary)
     - socraticPhasePrompt (implicit question for this phase)
     - engagementScore (quality metric)
     - format (narrative, comic, infographic, mission brief, etc.)
     - imageAssets (array of image references for multi-media pre-reads)
     - estimatedReadingTime (minutes)
     - goldStandardIndicator (boolean: is this the template for this module?)
   ```

4. FACILITATOR SCRIPT SCHEMA
   ```
   FacilitatorScript:
     - id (uuid)
     - weekNumber
     - duration (minutes)
     - segments (array of Segment objects)
       * segmentNumber
       * name (e.g., "Opening Check-In")
       * durationMinutes
       * activity (description)
       * facilitatorNote (1-2 lines)
       * keyPrompts (array of 3-4 discussion questions)
       * expectedResponses (array of example student responses with follow-ups)
       * ifThenHandling (contingency guidance, e.g., "If kids didn't read the pre-read...")
       * timer (true/false: should this segment have a visible countdown?)
     - materials (array of materials needed: slides, PDFs, links)
     - differentiationNotes
     - commonIssuesForThisSession (pulled from module metadata)
     - estimatedTiming (total, usually 60 min)
   ```

5. WORKBOOK TEMPLATE SCHEMA
   ```
   WorkbookTemplate:
     - id (uuid)
     - weekNumber
     - pages (array of Page objects)
       * pageNumber
       * title
       * socraticPhase
       * activityPrompt (what the kid is doing on this page)
       * templateFields (structured prompts, reflection questions, sketching space)
       * estimatedTimeMinutes (how long to spend on this page)
       * designNotes (is this individual, pair, or group work?)
   ```

6. PARENT DIGEST TEMPLATE SCHEMA
   ```
   ParentDigestTemplate:
     - id (uuid)
     - weekNumber
     - aiPromptTemplate (template for generating the digest)
       * sessionSummary (key moments from the session)
       * childHighlight (specific thing the child did/said)
       * nextWeekPreview
       * parentReflectionPrompt (optional question for parent)
     - structure (what order to present information)
     - tone (celebratory, reflective, forward-looking)
   ```

7. API ENDPOINTS
   - GET /modules (list all published modules with metadata)
   - GET /modules/{id} (full module with all weeks + content)
   - GET /modules/{id}/weeks/{weekNumber} (single week's deliverables)
   - GET /modules/{id}/weeks/{weekNumber}/facilitatorScript
   - GET /modules/{id}/weeks/{weekNumber}/preRead
   - GET /modules/{id}/weeks/{weekNumber}/workbookTemplate
   - GET /modules/{id}/weeks/{weekNumber}/parentDigestTemplate
   - POST /modules (publish new module from Module Builder)
   - PUT /modules/{id} (update module with new version)
   - GET /modules/{id}/versions (version history)
   - GET /research/{researchId} (access structured knowledge object for AI pipeline)

8. STORAGE OPTIONS
   Option A: Headless CMS (Sanity, Contentful)
     - Pros: visual authoring, real-time preview, webhooks for automation
     - Cons: vendor lock-in, cost at scale
   Option B: Git + Structured JSON/YAML
     - Pros: version control, portability, no vendor lock-in, easy to translate
     - Cons: manual tooling needed, less visual authoring
   - Recommendation: Start with Option B (Git + JSON) for MVP, migrate to CMS if
     authoring becomes a bottleneck

9. VERSIONING AND ROLLBACK
   - Each module has version numbers (v1.0, v1.1, etc.)
   - Version control (Git): every change is committed with a message
   - Rollback capability: can revert to previous version if needed
   - Audit trail: who published what, when, what changed

10. LOCALIZATION SUPPORT
    - Content structure designed for translation
    - Language field on all text content
    - Separate content objects per language (e.g., modules/user-manual/en, modules/user-manual/de)
    - Shared research knowledge objects across languages

11. SEARCH AND FILTERING
    - Search by module name, artifact name, learning objective
    - Filter by domain, age band, difficulty level
    - Filter by Socratic phase (for facilitators preparing lessons)
    - Full-text search on content (for indexing pre-reads, scripts)

12. ANALYTICS AND USAGE
    - Track: which modules are most used, which sessions run longest, which pre-reads
      are re-read most
    - Feed back to education expert for iteration priorities
    - Inform which modules to develop next

13. INTEGRATIONS
    - Module Builder publishes to content layer (POST /modules)
    - Facilitator app queries content layer (GET endpoints)
    - Parent portal queries content layer (GET endpoints, pre-read links)
    - AI pipeline queries content layer for context (GET /modules/{id}/research)
    - Insight discovery pipeline uses content layer as context

14. SECURITY AND ACCESS
    - Public: published modules and pre-reads (what parents/facilitators see)
    - Internal: research knowledge objects and AI prompts (education expert and AI only)
    - Authentication: API key for facilitator app and parent portal
    - No personal data in content layer (COPPA/GDPR safe)

15. PERFORMANCE REQUIREMENTS
    - GET /modules should return in <200ms
    - GET /modules/{id} should return in <500ms
    - Caching: facilitator app caches content locally (offline resilience)
    - CDN: pre-reads and assets served globally (for EMEA/LATAM markets)

16. SUCCESS METRICS
    - API response times (99th percentile <500ms)
    - Content publication latency (from Module Builder to facilitator app, <1 min)
    - Uptime (99.9%+)
    - Search relevance (how often do users find what they're looking for?)

Write the PRD in clear markdown. Include schema examples in code blocks. Be specific about
API contract (request/response format).
```

---

### 5. AI Content Generation Pipeline PRD

**Status:** MVP (needed for pilot)
**Dependencies:** #4 (Content Layer), #3 (Module Builder)
**Attach:** concept-v2.md, operations.md
**Expected Output:** 12-15 page PRD with detailed prompt architecture and validation specs
**Time to Complete:** 2-3 sessions

**Prompt:**

```
You are designing The Library of Me's AI Content Generation Pipeline — the automated system
that generates pre-reads, facilitator scripts, workbook templates, and parent digests.

I'm attaching:
1. concept-v2.md — product vision
2. operations.md — operational model (see sections on content production pipeline and
   architectural patterns)

Your task: Write a comprehensive PRD for the AI Content Generation Pipeline.

Key context:
- Central engine of the operation
- Workflow: parameterized research → structured knowledge extraction → dependency-ordered
  deliverable generation → quality validation → retry
- The "gold-standard pattern": education expert writes ONE pre-read. AI generates the rest
  following that pattern.
- Each deliverable depends on previous ones (pre-read → script → workbook → digest)
- Quality gates prevent bad outputs from propagating downstream

The PRD should include:

1. OVERVIEW
   - What it is: automated content generation system powered by LLM
   - Why it matters: reduces content creation time from 60-80 hours to 18 hours per module
   - Core insight: multiplies the education expert's output without replacing their judgment

2. PHASE 1: PARAMETERIZED RESEARCH
   - Catalog of research query templates organized by domain
   - Example queries:
     * "What do 10-14 year olds commonly struggle with regarding [topic]?"
     * "What approaches have been studied for teaching [skill] to adolescents?"
     * "What language and metaphors do kids this age use to describe [problem]?"
     * "What are common misconceptions about [topic] among parents?"
     * "What does research say about self-authored vs. prescribed [skill] interventions?"
   - Module intake provides topic parameters
   - System executes queries in parallel against search-augmented LLM
   - Inputs to research pipeline:
     * Module topic
     * Target age band
     * Domain (executive function, communication, etc.)
     * Related module references (for knowledge compounding)
   - Output: raw research synthesis (1000-2000 words per query)

3. PHASE 2: STRUCTURED KNOWLEDGE EXTRACTION
   - Parse raw research into machine-readable knowledge object
   - Knowledge object schema:
     * Domain concepts (key ideas in this topic)
     * Common struggles (what kids this age actually face)
     * Evidence-based approaches (what research shows works)
     * Language and metaphors (how kids talk about this)
     * Parent concerns (what parents worry about)
     * Misconceptions (what kids often get wrong)
     * Progression (how does understanding develop from age 10 to 15?)
     * Character archetypes (relatable personas for pre-read scenarios)
     * Real-world examples (concrete instances kids would recognize)
   - This object is NOT for human reading—it's the single source of truth for all
     downstream generation
   - Stored and versioned in content layer
   - Reusable for future related modules

4. PHASE 3: DEPENDENCY-ORDERED DELIVERABLE GENERATION
   - Topological ordering (pre-read first, then script, workbook, digest)
   - Week 1-6 pipeline:
     * Week 1 pre-read (depends on: module intake + research)
     * Week 1 facilitator script (depends on: Week 1 pre-read + learning objectives)
     * Week 1 workbook template (depends on: Week 1 pre-read + script)
     * Week 1 parent digest (depends on: script + expected outcomes)
     * Week 2 pre-read (depends on: Week 1 complete + Socratic phase progression)
     * [repeat for weeks 3-6]
   - Progressive enrichment: each deliverable's prompt assembly includes:
     * Structured research output
     * Module intake
     * Full text of upstream dependencies
   - For pre-reads:
     * Input prompt includes: gold-standard Week 1 pre-read (as style template),
       research knowledge object, Socratic phase for this week
     * Instruction: "Generate a Week [N] pre-read following this pattern: [gold-standard],
       advancing to the [phase] phase of the Socratic cycle"
     * Output: draft pre-read
   - For facilitator scripts:
     * Input prompt includes: pre-read content, learning objectives, session structure
       template (timing, segment count)
     * Instruction: "Generate a minute-by-minute session script for this pre-read"
     * Output: draft script with timed segments, activities, prompts
   - For workbook templates:
     * Input prompt includes: session activities (from script), Socratic phase, artifact
       structure (from module intake)
     * Instruction: "Generate workbook pages reflecting the session activities"
     * Output: draft workbook pages with prompts and templates
   - For parent digests:
     * Input prompt includes: session plan, expected outcomes
     * Instruction: "Generate a parent digest template that highlights key moments"
     * Output: digest template with placeholders for child highlights

5. PHASE 4: QUALITY VALIDATION WITH RETRY
   - Quality gates for each deliverable type
   - Pre-read validation:
     * Reading level check (target: grade 4-9 equivalent)
     * Engagement score (does this prompt introspection? 1-10 scale)
     * Scenario specificity (is this relatable to target age? 1-10 scale)
     * Character consistency (do characters match previous weeks?)
     * Pass criteria: reading level OK + engagement >6 + specificity >6
   - Facilitator script validation:
     * Timing accuracy (sum of segments ≈ 60 min, ±5 min tolerance)
     * Prompt quality (are discussion questions open-ended? 1-10)
     * Activity clarity (can a non-expert follow this? 1-10)
     * Pass criteria: timing OK + prompt quality >7 + clarity >7
   - Workbook template validation:
     * Alignment (do activities match session? 1-10)
     * Age-appropriateness (is this feasible for this age? 1-10)
     * Space adequacy (do pages have room for answers? visual check)
     * Pass criteria: alignment >7 + age-appropriate >7
   - Parent digest validation:
     * Tone consistency (is this celebratory/reflective as intended? 1-10)
     * Specificity (does it reference actual session? 1-10)
     * Pass criteria: tone >6 + specificity >6
   - If validation fails:
     * System generates corrective feedback prompt
     * Example: "Pre-read failed reading level check (10.5 grade, target 8). Simplify
       vocabulary. Regenerate."
     * Regenerate with feedback in prompt
     * Retry up to 3 times
     * If still failing, surface to expert with flag: "MANUAL REVIEW NEEDED"

6. PHASE 5: EXPERT REVIEW AND APPROVAL
   - All generated drafts fed to Module Builder (see PRD #3)
   - Expert sees quality scores alongside each draft
   - Expert can:
     * Edit content inline
     * Approve as-is
     * Send back for regeneration with feedback
   - No bad content propagates downstream

7. DEPENDENCY GRAPH EXECUTOR
   - System automatically:
     * Detects when Phase 2 is complete (research object ready)
     * Triggers Week 1 pre-read generation
     * Waits for expert approval of Week 1 pre-read
     * Triggers all Week 1 downstream generation (script, workbook, digest)
     * Waits for approval of Week 1 complete
     * Triggers Week 2 pre-read generation (now has full Week 1 context)
     * [repeat for weeks 3-6]
   - Each stage waits for upstream completion
   - No circular dependencies possible (DAG architecture)

8. PROMPT ENGINEERING SPECIFICATIONS
   - Pre-read generation prompt template:
     ```
     You are a curriculum designer for The Library of Me, a program that teaches
     kids ages 10-15 to design their own operating system for life.

     Context:
     - Module topic: [topic]
     - Target age: [age band]
     - Socratic phase for Week [N]: [phase]
     - Learning objective: [objective]

     Gold-standard pre-read (Week 1, establish the pattern):
     [full text of Week 1 pre-read]

     Research knowledge on this topic:
     [relevant sections of knowledge object]

     Task: Generate a Week [N] pre-read that:
     1. Follows the same format and tone as the gold-standard pre-read
     2. Advances the story/scenario to the [phase] phase of the Socratic cycle
     3. Introduces a relatable character or scenario kids this age recognize
     4. Primes introspection without asking explicit questions
     5. Is readable at [grade] level (use simple vocabulary, short sentences)
     6. Takes approximately [reading time] minutes to read

     Generate the pre-read now:
     ```
   - Script generation prompt template:
     ```
     You are a facilitator guide writer for The Library of Me.

     Context:
     - Module: [title]
     - Week [N], [phase] phase
     - Learning objective: [objective]
     - Pre-read content: [full pre-read text]
     - Target learners: [age band], [cohort size] kids per session
     - Session duration: [minutes]

     Task: Generate a minute-by-minute session run sheet that:
     1. Includes 4-6 timed segments totaling ~[minutes]
     2. Each segment has: activity, facilitator note, key prompts, expected responses,
        if-then handling
     3. Segments progress through: opening, pre-read debrief, core activity,
        workbook time, closing
     4. Prompts are open-ended and require no expertise to ask
     5. Activities work for facilitators who aren't subject experts
     6. Includes one "if-this-then-that" handling per segment

     Generate the script now:
     ```
   - Similar templates for workbook and digest generation

9. KNOWLEDGE OBJECT VERSIONING
   - Each research output is versioned
   - Links to module it was generated for
   - Can be reused for future related modules
   - Compounding knowledge: related modules reference previous research
   - Example: "Module 5 (Beat Procrastination) pulls from Module 1 (Executive Function)
     research"

10. ERROR HANDLING AND LOGGING
    - Every generation step logs:
      * Input parameters
      * LLM output (full response)
      * Validation results
      * Retry attempts
      * Final approval status
    - Logs accessible to expert and technical team
    - Used for debugging and improvement

11. SCALING CONSIDERATIONS
    - Parallel generation: Weeks 2-6 pre-reads can generate in parallel after Week 1 is approved
    - Batch scheduling: all modules scheduled for next month generate overnight
    - Cost optimization: use lower-cost LLM models for high-volume generation, expert-grade
      models for validation
    - Rate limiting: respect API quotas for search-augmented LLM

12. INPUTS FROM MODULE BUILDER
    - Module intake object
    - Gold-standard pre-read (written by expert)
    - Module approval to proceed with generation

13. OUTPUTS TO CONTENT LAYER
    - All generated deliverables
    - Research knowledge object
    - Quality metrics and logs
    - Version information

14. INTEGRATION POINTS
    - Module Builder: expert initiates pipeline via "Generate Remaining Pre-Reads" button
    - Content Layer: all outputs published to content layer
    - Facilitator app: reads published content
    - Parent portal: reads published content
    - Insight discovery: consumes content alongside feedback for iteration

15. SUCCESS METRICS
    - Content production time per module (target: 18 hours expert time)
    - First-draft pass rate through quality gates (target: 80%+)
    - Expert editing time (should be <1 hour per module, mostly polish)
    - Facilitator feedback on content quality (rating: 4-5 out of 5)
    - Parent satisfaction with pre-reads (did they prime engagement?)

16. NICE-TO-HAVES (POST-MVP)
    - A/B testing: generate multiple variants, measure engagement, keep best
    - Automated personalization: generate variants based on previous module submissions
    - Multi-language generation: generate Spanish/German variants automatically
    - Continuous improvement: feed facilitator feedback back into quality validation criteria

Write the PRD in clear markdown. Include full prompt templates in code blocks.
Be specific about validation criteria (scoring scales, thresholds).
```

---

### 6. AI Artifact Processing Pipeline PRD

**Status:** MVP (Premium tier, needed for pilot conversions)
**Dependencies:** #4 (Content Layer)
**Attach:** concept-v2.md, operations.md
**Expected Output:** 10-12 page PRD focused on OCR, structuring, and parent review
**Time to Complete:** 1-2 sessions

**Prompt:**

```
You are designing The Library of Me's AI Artifact Processing Pipeline — the system that
transforms raw workbook pages into polished Library of Me chapters.

I'm attaching:
1. concept-v2.md — product vision (see Layer 5: Parent Opt-In AI Processing)
2. operations.md — operational model (see "Artifact Processing" in AI Pipeline Architecture)

Your task: Write a comprehensive PRD for the AI Artifact Processing Pipeline.

Key context:
- Premium tier unlock: parent submits workbook photos/scans → system processes → polished
  chapter appears
- Parent reviews before approving
- Parent can edit or reject
- High-quality output is critical for conversion to Premium tier
- This is parent-facing, so UX matters as much as processing quality

The PRD should include:

1. OVERVIEW
   - What it is: converts scanned/photographed workbook pages into formatted artifacts
   - Workflow: OCR → text extraction → LLM structuring → formatting
   - Why it matters: makes Premium tier compelling (justifies upgrade price)
   - Quality threshold: output must feel polished, maintain kid's voice, be parent-approvable

2. INPUT SOURCES
   - Workbook photo (taken on parent's phone)
   - Workbook scan (PDF from scanner or Acrobat)
   - Multiple pages per submission
   - Format variety (photos at odd angles, varying lighting, hand-drawn, typed)

3. PHASE 1: OCR AND IMAGE PREPROCESSING
   - Input: image or PDF
   - Preprocessing:
     * Deskew (straighten tilted images)
     * Despeckle (remove noise/shadows)
     * Enhance contrast (make text clearer)
   - OCR engine: Google Vision API or similar
   - Output: raw text extracted from image
   - Quality check: confidence score for OCR accuracy
   - If confidence <80%, flag for expert review: "Image too blurry, ask parent to resubmit"

4. PHASE 2: TEXT EXTRACTION AND STRUCTURING
   - Raw OCR text often includes:
     * Headers/labels from template (e.g., "My Focus Pattern:")
     * Structured answers (kid's responses to prompts)
     * Sketches/drawings (converted to "[hand-drawn diagram]")
     * Fragments, incomplete sentences, crossed-out text
   - LLM structuring task:
     * Input: raw OCR text + module artifact template
     * Module artifact template specifies: expected sections, data types, structure
     * Example for "User Manual for My Brain" artifact:
       - Section 1: "My Focus Patterns" (structured categories)
       - Section 2: "My Best Focus Times" (time + context)
       - Section 3: "My System Design" (steps/rules)
       - Section 4: "Testing & Iteration" (experiments tried)
       - Section 5: "My Protocol" (final, codified system)
     * LLM task: parse raw text into these sections, clean up language, preserve voice
     * Prompt template:
       ```
       You are editing a young person's workbook entries into a polished chapter.

       Context:
       - Kid's name: [name]
       - Module: [artifact name]
       - Phase: [Socratic phase]

       Raw workbook text (may be messy, incomplete):
       [OCR text]

       Module artifact template:
       [expected sections and structure]

       Task:
       1. Parse the raw text into the expected sections
       2. Clean up language (fix OCR errors, complete sentences) but preserve the kid's voice
       3. Organize into clear sections with headers
       4. Add internal structure (bullet points, numbering) where logical
       5. Format as markdown

       Output format:
       # [Kid's Artifact Title]
       [structured, polished content matching template]
       ```
   - Output: structured markdown with sections, preserved voice

5. PHASE 3: FORMATTING AND DESIGN
   - Markdown → beautiful PDF or digital format
   - Design principles:
     * Large, readable typography
     * Generous whitespace
     * Kid's name prominent
     * Section headers styled consistently
     * Optional: illustrations or visual dividers matching module theme
     * Optional: kid's own drawings integrated (if provided)
   - Color theme tied to module (each module has a color palette)
   - Length: typically 8-12 pages per artifact

6. PHASE 4: PARENT REVIEW AND APPROVAL
   - Parent sees: preview of formatted artifact (PDF or web view)
   - Parent options:
     * "Approve — add to Library": artifact is finalized and stored
     * "Edit text": parent makes edits inline (removes personal info, adjusts phrasing)
     * "Reject — don't use this": artifact is discarded, no charge
     * "Ask for changes": parent provides feedback, LLM restructures and resubmits
   - No artifact enters the Library without explicit parent approval
   - Parent can choose to remove pages before submission ("Yes, include pages 1-3, not page 4")

7. PHASE 5: LIBRARY STORAGE AND VERSIONING
   - Approved artifacts stored in parent's Digital Library
   - Metadata:
     * Kid's name and age
     * Module name and week
     * Date created
     * Original submission date
     * Processed date
     * Parent approval date
   - Artifacts are searchable and browsable
   - Parent can request new processing if desired ("Try again with different formatting")

8. QUALITY GATES AND ERROR HANDLING
   - OCR confidence: if <80%, flag for parent: "This page is hard to read. Could you retake
     the photo or re-scan?"
   - LLM structuring: if output is malformed, flag for expert review
   - Parent approval: no artifact goes live without explicit thumbs-up
   - Expert escalation: if parent requests changes and LLM can't satisfy, escalate to expert

9. DATA PRIVACY AND RETENTION
   - Workbook submission: stored temporarily, deleted after processing
   - OCR text: stored temporarily, deleted after structuring
   - Final artifact: stored permanently in parent's Library
   - Processing logs: retained for improvement, not accessible to product analytics
   - No sharing with third parties without explicit consent
   - Parent can request deletion of any artifact

10. INTEGRATION POINTS
    - Parent Portal: workbook upload interface, processing status, preview and approval UI
    - Content Layer: reads artifact template for module
    - Digital Library: stores approved artifacts
    - Print Pipeline: approved artifacts feed to print fulfillment

11. PERFORMANCE AND SCALABILITY
    - Target processing time: <2 minutes from upload to preview ready
    - Handle: 5-10 submissions per day at pilot scale
    - Batch processing: schedule overnight processing for high volume
    - Cost optimization: use cheaper OCR for images with high confidence

12. SUCCESS METRICS
    - OCR accuracy rate (target: 95%+ text captured correctly)
    - Parent approval rate (target: 80%+ of submissions approved as-is or with minor edits)
    - Processing speed (target: <2 min average)
    - Parent satisfaction (target: 4.5/5 on "Did this look polished?")
    - LLM output quality (expert spot-check: how many need manual edits?)

13. NICE-TO-HAVES (POST-MVP)
    - Multi-language: process workbooks written in Spanish, German, Portuguese
    - Handwriting recognition: better OCR for hand-drawn content
    - Auto-photo quality detection: reject blurry photos before processing
    - AI enhancement: colorize drawings, add decorative elements to match module theme
    - Comparison view: show original vs. processed side-by-side

Write the PRD in clear markdown. Include the structuring prompt template.
Be specific about parent approval UX and error handling flows.
```

---

### 7. AI Insight Discovery Pipeline PRD

**Status:** Scale (post-cohort iteration, Phase 2+)
**Dependencies:** All content PRDs, facilitator operations
**Attach:** concept-v2.md, operations.md
**Expected Output:** 10-12 page PRD focused on multi-stream reasoning and insights
**Time to Complete:** 2 sessions

**Prompt:**

```
You are designing The Library of Me's AI Insight Discovery Pipeline — the system that
analyzes post-cohort feedback and recommends content revisions.

I'm attaching:
1. concept-v2.md — product vision
2. operations.md — operational model (see "Post-Cohort Insight Discovery" section)

Your task: Write a comprehensive PRD for the AI Insight Discovery Pipeline.

Key context:
- Runs after each cohort completes a module
- Consumes three independent data streams: facilitator feedback, content design, parent/kid
  feedback
- Outputs: typed, prioritized revision recommendations
- Goal: close the loop — cohort data → insights → better content → better next cohort

The PRD should include:

1. OVERVIEW
   - What it is: multi-stream reasoning system for continuous content improvement
   - When it runs: end of each cohort (after final session)
   - Why it matters: creates compounding knowledge edge (each iteration gets better)
   - Outputs: revision recommendations fed back to Module Builder

2. INPUT STREAMS
   - Stream 1: Facilitator feedback
     * Structured post-session forms (one per session)
     * Questions:
       - "What landed? (1-10)"
       - "What didn't land? (1-10)"
       - "Which pre-read was most engaging?"
       - "Which activity ran long or short?"
       - "Any concerns about this content?"
       - "Free text notes"
     * Data collected: scores per session, activity timing accuracy, engagement ratings
   - Stream 2: Content research and design intent
     * Pulled from Module intake and research knowledge object
     * Questions: What was this content designed to do? What's the pedagogical intent?
     * Metadata: learning objectives, Socratic phase, target outcomes per week
   - Stream 3: Parent and kid feedback + artifacts
     * Optional: parent satisfaction survey ("How satisfied are you?" 1-5)
     * Kid reflection (if collected): "What was most useful?" open text
     * Premium tier: submitted artifacts (signal of what resonated)
     * Meta: which families upgraded to Premium (proxy for value perception)

3. ANALYSIS PIPELINE
   - Step 1: Facilitator feedback analysis
     * Aggregate scores across cohorts (is Pre-Read 3 consistently rated low?)
     * Identify patterns ("Week 2 consistently runs 10 min over")
     * Flag outliers ("One facilitator rated Week 4 much higher than average")
   - Step 2: Cross-reference with design intent
     * For each low-rated item: what was it designed to do?
     * Example: "Pre-Read 3 banking scenario was designed to introduce financial concepts,
       but facilitators report it confused kids. Research says kids this age relate better
       to social spending scenarios."
   - Step 3: Artifact and outcome analysis
     * Premium artifacts: what did kids produce? How complete were their Systems?
     * Parent comments: which modules lead to Premium upgrades?
     * Attendance: do certain content elements predict higher retention?
   - Step 4: Synthesis and recommendation generation
     * For each finding, generate specific revision recommendation
     * Trace each recommendation back to data sources
     * Prioritize by impact (high-frequency issues affecting engagement vs. one-off concerns)

4. INSIGHT TYPES
   - Content Quality Issues
     * Type: "Pre-read readability"
     * Example: "Pre-Read 2 has 3 sentences with >20 words. Recommend shortening."
     * Data source: facilitation feedback + readability metrics
     * Priority: medium (affects engagement)
   - Timing Issues
     * Type: "Activity runs over"
     * Example: "Core Activity (Pattern Mapping) consistently runs 25 min instead of 20.
       Recommend splitting into two shorter activities."
     * Data source: facilitator timing logs
     * Priority: high (cascades to other segments)
   - Engagement Gaps
     * Type: "Low resonance with audience"
     * Example: "Banking scenario doesn't land with 10-12 year olds. Research shows they
       relate better to social spending. Recommend changing protagonist scenario."
     * Data source: facilitator engagement ratings + research
     * Priority: high (affects learning)
   - Character/Narrative Issues
     * Type: "Character consistency"
     * Example: "Week 3 introduces a new protagonist (Zara) but kids expect continuation
       of Week 1-2 (Alex). Recommend using same character across weeks."
     * Data source: facilitator notes + artifact analysis
     * Priority: medium (affects narrative cohesion)
   - Outcome Gaps
     * Type: "Kids not reaching learning objective"
     * Example: "Facilitators report Week 4 workbooks are incomplete. Kids rush. Recommend
       moving Activity 3 to post-session homework."
     * Data source: workbook completion rates + facilitator notes
     * Priority: high (impacts artifact quality)

5. RECOMMENDATION GENERATION PROMPT TEMPLATE
   ```
   You are analyzing post-cohort feedback to generate content revision recommendations.

   Context:
   - Module: [title]
   - Cohort: [cohort name], [dates]
   - Facilitators: [count]
   - Kids: [count]
   - Pre-read engagement average: [score 1-10]
   - Content quality feedback: [summary]

   Facilitator feedback summary:
   [aggregated scores and patterns]

   Content design intent:
   [module intake, learning objectives, Socratic phase]

   Parent and artifact feedback:
   [key insights from Premium submissions, parent comments]

   Task: Generate specific, actionable revision recommendations.

   For each recommendation:
   1. Recommendation title (one-line summary)
   2. Current issue (what's happening now, with data source)
   3. Proposed change (specific revision)
   4. Reason (why this matters, pedagogically)
   5. Priority (high/medium/low based on impact)
   6. Data sources (which feedback streams support this)

   Format as structured list.
   ```

6. PRIORITIZATION FRAMEWORK
   - High priority: affects learning outcomes or engagement across cohorts
     * Example: "Pre-read consistently scored low" affects >50% of kids
     * Example: "Activity runs over" cascades to subsequent segments
   - Medium priority: affects user experience but not core learning
     * Example: "Character name inconsistency" affects narrative feel
     * Example: "One slide needs better contrast" improves readability
   - Low priority: one-time issues or minor polish
     * Example: "Typo in Week 3 workbook" affects appearance
     * Example: "One facilitator noted difficulty" is outlier, not pattern

7. FEEDBACK LOOP TO MODULE BUILDER
   - Insight pipeline outputs list of recommendations (typed, prioritized, traceable)
   - Education expert receives in Module Builder UI
   - Expert reviews each recommendation
   - Expert decides: implement, defer, or skip
   - Approved revisions are edited in Module Builder
   - Revised content is republished with new version number
   - Next cohort automatically uses improved version

8. KNOWLEDGE COMPOUNDING
   - Each iteration improves the module
   - Insights from Module 1 inform Module 2 design
   - Example: "Cohort 1 of Module 1 showed strong engagement with humor-driven pre-reads.
     Recommend increasing humor in Module 2."
   - Research knowledge objects accumulate across modules

9. SCALE CONSIDERATIONS
   - Per-cohort analysis: 1-2 hours automated, 1-2 hours expert review
   - Batch analysis: end of month, analyze all cohorts that completed
   - Longitudinal analysis: track same recommendation across 3+ cohorts (is the revision
     actually working?)

10. DATA STORAGE AND RETENTION
    - Feedback forms: stored permanently, queryable
    - Insight recommendations: stored with version history
    - Facilitator notes: retained for training and improvement
    - Kid artifacts: permanently stored in Digital Library
    - Privacy: no personally identifiable kid data in insight pipeline outputs

11. SUCCESS METRICS
    - Recommendation implementation rate (% of recommendations implemented by expert)
    - Improvement validation (does the revision actually improve the metric?)
    - Iteration velocity (how fast can we improve content?)
    - Facilitator confidence (post-revision survey: "Is the revised content clearer?")

12. INTEGRATIONS
    - Facilitator app: collects post-session feedback
    - Parent portal: collects parent feedback and stores artifacts
    - Module Builder: receives revision recommendations, implements revisions
    - Content layer: publishes revised content

Write the PRD in clear markdown. Include the recommendation generation prompt template.
Be specific about insight types and prioritization criteria.
```

---

### 8. WhatsApp Nudge System PRD

**Status:** MVP (needed for pilot engagement)
**Dependencies:** None (standalone)
**Attach:** concept-v2.md
**Expected Output:** 8-10 page PRD focused on messaging philosophy and technical specs
**Time to Complete:** 1 session

**Prompt:**

```
You are designing The Library of Me's WhatsApp Nudge System — a logistical messaging
channel (not a data collection or conversational AI channel).

I'm attaching:
1. concept-v2.md — product vision (see Layer 2: WhatsApp/App as Nudge Channel)

Your task: Write a comprehensive PRD for the WhatsApp Nudge System.

Key context from concept:
- WhatsApp is used EXCLUSIVELY for nudges and logistical reminders
- NO data collection, NO conversational AI, NO personal disclosure requests
- Messages are transparent, respectful, non-manipulative
- Broadcast list or WhatsApp Business API
- Simple, lightweight, ultra-low operational overhead

The PRD should include:

1. OVERVIEW
   - What it is: logistics messaging system via WhatsApp
   - What it's NOT: engagement platform, data collection channel, conversational AI
   - Why WhatsApp: families in EMEA/LATAM already use it, notifications are seen (vs email)
   - Philosophy: transparent, respectful, rhythmic (not sporadic)

2. MESSAGING TYPES AND EXAMPLES
   - Pre-read delivery: "Your case study for Thursday's session is ready 📎 [link]"
   - Session reminder: "Session starts in 2 hours at 4pm. Did you read the pre-read?"
   - Celebration: "Great cohort moment today! Kids were so thoughtful during breakout."
   - Logistical update: "Note: next week's session moves to Friday 3pm instead of Thursday"
   - Milestone nudge: "One week to go! You're designing your first system this week."
   - Motivational tie-in: "Your Turn to Test: Try one thing from Tuesday's discussion this week"
   - No follow-up nudges ("Haven't read yet? Let us know why!")
   - No engagement metrics ("You've been opening 80% of our messages!")
   - No CTAs asking for interaction or disclosure

3. MESSAGING FREQUENCY AND SCHEDULE
   - Pre-read delivery: once per week, Thu/Fri (giving 48-72 hours before session)
   - Session reminder: 2 hours before session only (not 24 hours, not multiple reminders)
   - Post-session celebration: within 24 hours of session (for momentum)
   - Logistical updates: as-needed, no regular cadence
   - Motivational nudges: 1 per module max (usually at week 2-3 when engagement might dip)
   - Total cadence: 2-3 messages per week during module, not sporadic surprises

4. TECHNICAL IMPLEMENTATION
   - Option A: WhatsApp Broadcast List (MVP)
     * Setup: create broadcast list in WhatsApp Business
     * Send: founder or ops person manually sends to group
     * Limits: max 250 recipients per list, no automation
     * Cost: free (uses regular WhatsApp Business)
   - Option B: WhatsApp Business API (Scale)
     * Automation: can schedule messages, trigger on events
     * Cost: per-message pricing (~$0.001-0.003/message)
     * Higher reliability for large cohorts
   - Recommendation: Start with Broadcast List (MVP), migrate to API at Scale phase

5. MESSAGE TEMPLATES
   - Pre-read delivery template:
     ```
     Hi [family first name],

     [Kid's name]'s case study for this week's session is ready.

     Topic: [week topic + Socratic phase]
     Read time: ~5 min
     Link: [URL to pre-read]

     Session is Thursday 4-5pm. Looking forward to it!
     ```
   - Session reminder template:
     ```
     Reminder: [kid's name]'s session starts in 2 hours! 🎯

     Time: 4pm EST
     Did you read the pre-read? It sets up the session.
     ```
   - Celebration template:
     ```
     Great session today! [kid's name] did [specific moment].

     Next week: [Socratic phase] phase — they'll [what's coming].
     ```
   - Logistical update template:
     ```
     Schedule change: next week's session moves to Friday 3pm
     (instead of Thursday 4pm).

     Same group, same facilitator. See you then!
     ```

6. SENDING WORKFLOW
   - Manual sends (MVP):
     * Ops person: check session schedule for week
     * Ops person: draft message from template
     * Ops person: send to broadcast list 48-72 hours before session
     * Ops person: receive manual attendance responses (optional)
   - Automated sends (Scale):
     * Set up WhatsApp Business API
     * Create webhooks: session scheduled → pre-read delivery message queued
     * Message sends automatically at T-48 hours
     * Celebration message queued after session ends (facilitator triggers via app)

7. FAMILY CONTACT MANAGEMENT
   - Collect WhatsApp number during onboarding (parent provides)
   - Store: family, kid name, WhatsApp number, opt-in to messaging
   - Parent can opt-out: "Remove me from session reminders" → no further messages
   - Parent can update: "My number changed" → update contact
   - No automatic re-engagement ("Hey, we haven't heard from you in a while!")

8. COMPLIANCE AND PRIVACY
   - All messages are logistical, not personal data collection
   - No tracking: no read receipts harvested, no engagement metrics
   - Transparent: family knows exactly why they're getting this message
   - GDPR/COPPA compliant: parent is gatekeeper for contact info, no direct kid contact
   - WhatsApp encryption: messages are end-to-end encrypted

9. TONE AND BRAND
   - Warm and friendly (not corporate)
   - Specific and personal ("It's Thursday pre-read day!" not "We have new content!")
   - Celebratory (focusing on kid's achievements, not lack of engagement)
   - Respectful of time (short messages, no needless follow-ups)
   - Emoji use: minimal, consistent (e.g., 🎯 for sessions, 📎 for links)

10. METRICS AND MONITORING
    - Session reminder delivery rate (did message send successfully?)
    - Session attendance rate (proxy for reminder effectiveness)
    - Opt-out rate (are families disabling notifications? <5% target)
    - No engagement metrics (we don't track "how many opened this")

11. ESCALATION AND EXCEPTIONS
    - Family misses session → no automated nudges ("You missed last week!")
    - Family cancels module → send one cancellation confirmation, then stop
    - Urgent schedule change → send immediately (not batched)
    - Non-urgent update → batch with next pre-read delivery

12. NICE-TO-HAVES (POST-MVP)
    - Two-way messaging: family replies "Can't make Thursday" → app notifies ops
    - Attendance polling: "Who's coming to Thursday's session?" (anonymous, quick)
    - Kid-friendly nudges: optional separate stream with age-appropriate motivational content
    - Localization: messages in Spanish, German, Portuguese for international families

13. DEPENDENCIES
    - Onboarding flow: collects WhatsApp number
    - Session management: knows schedule (what time, what week, which pre-read)
    - Facilitator app: trigger for post-session celebration message
    - Parent portal: family can manage notification preferences

14. SUCCESS METRICS
    - Delivery success rate (>99%)
    - Session attendance rate (should improve with reminders)
    - Opt-in rate at onboarding (target: 95%+)
    - Opt-out rate (target: <5%)
    - Parent satisfaction (does this feel helpful? 4/5+)

Write the PRD in clear markdown. Include message templates with placeholders.
Be specific about the no-engagement-tracking philosophy.
```

---

### 9. Print Fulfillment Integration PRD

**Status:** MVP (Premium+ tier, Phase 2+)
**Dependencies:** #4 (Content Layer), #6 (Artifact Processing)
**Attach:** concept-v2.md, operations.md
**Expected Output:** 10-12 page PRD focused on book design and logistics
**Time to Complete:** 1-2 sessions

**Prompt:**

```
You are designing The Library of Me's Print Fulfillment Integration — the system that
converts digital artifacts into beautifully printed, bound books.

I'm attaching:
1. concept-v2.md — product vision (see Premium+ Tier: Printed Book)
2. operations.md — operational model (references Lulu/Blurb API)

Your task: Write a comprehensive PRD for the Print Fulfillment Integration.

Key context:
- Premium+ tier unlock: €250-350 per module
- Physical book with kid's name on spine
- 50-80 pages per module
- Full-color interior with kid's artifacts, photos, illustrations
- Delivered in keepsake box
- Use print-on-demand (POD) services: Lulu, Blurb, CreateSpace
- Per-unit cost: €12-18, production time: 7-10 days

The PRD should include:

1. OVERVIEW
   - What it is: integration with POD services for high-quality printed books
   - Who uses it: Premium+ tier families
   - Why it matters: creates identity moment, prestige object, referral engine
   - Quality standard: bookstore-quality production

2. BOOK ARCHITECTURE
   - Front matter:
     * Title page: kid's name, module artifact name, date, subtle design
     * Letter from education expert: personal note (one per module type)
     * Table of contents
   - Main content:
     * Original workbook pages (scanned or integrated)
     * AI-processed artifact (polished, formatted)
     * Parent reflection section (optional, if parent adds comments)
     * Kid's own drawings or photos (if submitted)
   - Back matter:
     * Colophon (who designed this, when)
     * Blank pages for notes/future iterations
   - Total length: 50-80 pages depending on module depth

3. DESIGN SYSTEM
   - Cover design:
     * Hardcover or softcover (determine based on cost/feel)
     * Module-specific color palette (e.g., "User Manual" = blue tones)
     * Kid's name prominently on spine and cover
     * Subtle illustrative elements (geometric shapes, icons tied to module theme)
     * Author byline: "[Kid's Name] Author"
   - Interior design:
     * Consistent typography (headings, body, emphasis)
     * Section dividers with module theme illustrations
     * Generous margins and whitespace
     * Page numbers and running headers
     * Full-color printing (not B&W)
   - Consistency across modules: each book feels like part of a series ("The Library of Me"),
     but each is unique to its module

4. TEMPLATE GENERATION
   - LLM task: take approved artifact + module design specs → InDesign or PDf template
   - Input:
     * Approved artifact content (sections, text, images)
     * Module color palette and design assets
     * Book dimensions (standard paperback or premium hardcover)
     * Photo or custom cover illustration (optional, provided by kid/parent)
   - Output: ready-to-print PDF or InDesign file
   - Prompt template:
     ```
     You are designing the interior layout for a printed book.

     Context:
     - Title: [module artifact name]
     - Author: [kid's name]
     - Total pages: ~[estimated]
     - Color theme: [module colors]
     - Content: [artifact text]
     - Design style: clean, educational, celebratory

     Task:
     1. Create a table of contents
     2. Design section dividers with visual elements
     3. Format the artifact content into readable pages
     4. Add running headers and page numbers
     5. Include a blank "Reflections" section at the end (5 pages)
     6. Generate LaTeX or markdown for professional typesetting

     Output: formatted content ready for print.
     ```

5. PROOF PREVIEW WORKFLOW
   - System generates: PDF or digital proof
   - Parent sees: exactly what the printed book will look like
   - Parent can:
     * "Approve — send to print"
     * "Request changes" (text edits, reorder sections, etc.)
     * "Cancel" (don't print this)
   - Changes are quick (edit and regenerate proof, <30 min)
   - Parent reviews proof for 48 hours, then orders or cancels

6. COVER CUSTOMIZATION
   - Parent optionally uploads: kid's photo or custom illustration for cover
   - Parent optionally edits: title, subtitle, color palette preference
   - System regenerates: cover with custom elements
   - Parent approves cover before full book goes to print

7. INTEGRATION WITH POD SERVICE
   - Option A: Lulu API
     * Create book project via API
     * Upload PDF/project file
     * Get proof preview
     * Parent approves
     * Submit to print
     * Track production and shipping
   - Option B: Blurb API
     * Similar workflow
   - Recommendation: Lulu for MVP (lower per-unit cost, good API)

8. ORDER AND FULFILLMENT WORKFLOW
   - Parent approves final proof
   - System creates order in Lulu/Blurb
   - Parent pays via Stripe (Premium+ tier or à la carte)
   - Production: 5-7 days
   - Shipping: 7-14 days depending on destination
   - Delivery: to parent's address (collected at onboarding)
   - Keepsake box: Lulu/Blurb can add branded packaging (optional upgrade)

9. INVENTORY AND REORDERING
   - Parent can order additional copies of same book
   - System remembers approved proof
   - One-click reorder with new shipping address (for grandparents, relatives)
   - Per-unit cost for reorders: €12-18 (no setup fee)

10. MULTI-MODULE COLLECTIONS
    - Parent with 3+ completed modules can order a "Library Box": all 3 books, matching spines,
      in a custom-designed slipcase
    - Designed to sit on shelf as a visual collection
    - Premium pricing (€80-120 for box)
    - High referral value (grandparents see the shelf, ask about program)

11. DATA MODEL
    - Book order schema:
      * Module, kid, parent
      * Approved artifact content
      * Cover customization (photo, color, title)
      * Proof status (pending approval, approved, submitted to print)
      * Production status (queued, in production, shipped, delivered)
      * Tracking number
      * Cost breakdown
    - Design asset schema:
      * Module color palette
      * Template assets (section dividers, icons)
      * Typography specifications

12. QUALITY ASSURANCE
    - Lulu/Blurb proof preview: parent sees exactly what will print
    - Color accuracy: match module brand colors in print
    - Binding quality: check that spine text is clear
    - Paper quality: specify paper stock (standard vs. premium)
    - Production check: Lulu/Blurb handles QA before shipping

13. COST AND PRICING STRATEGY
    - Per-unit cost to company: €12-18 (paper, binding, shipping)
    - Premium+ price: €250-350 per module
    - Gross margin on print: €232-338 per book
    - But: need to account for design/template generation (~€5-10 per book amortized)
    - Net margin: €220-330 per book (high margin despite print costs)
    - Reorders: lower margin because no design/template work, pure fulfillment

14. LOGISTICS AND SHIPPING
    - Ships to: EMEA and LATAM primarily
    - Shipping method: standard international mail (7-14 days)
    - Premium shipping available: express (3-5 days, +€15)
    - Tracking: parent can track order from Lulu/Blurb portal
    - Delivery: to parent's address (verified at onboarding)

15. RETURNS AND ISSUES
    - Binding defect: Lulu/Blurb handles replacement (no cost to company/family)
    - Lost in shipping: family files claim, Lulu/Blurb handles
    - Parent doesn't like cover design: too late to change once approved (lessons learned)

16. INTEGRATIONS
    - Parent portal: "Order printed book" button appears after artifact is approved
    - Stripe: payment processing
    - Lulu/Blurb API: book creation, proof generation, order submission
    - Email: shipping confirmation and tracking link
    - Analytics: track Premium+ adoption rate, reorder rate

17. SUCCESS METRICS
    - Premium+ adoption rate among Premium families (target: 20-30%)
    - Print order volume per cohort (target: avg 2-3 books per cohort of 6)
    - Parent satisfaction with printed quality (4.5/5+)
    - Reorder rate (parents ordering additional copies for family)
    - Referral attribution (track referrals from parents showing book to others)

18. NICE-TO-HAVES (POST-MVP)
    - Kid-designed covers: system allows kid to design cover elements before printing
    - Audio accompaniment: QR code in book links to audio recordings of kid reading passages
    - Personalized illustrations: commission artist to illustrate each book (premium add-on)
    - Library display case: sold separately, branded to hold "The Library of Me" books

Write the PRD in clear markdown. Include book layout example and cost breakdown.
Be specific about Lulu/Blurb API integration points.
```

---

## SECTION 2: MVP SCOPING

### 10. Overall MVP Scope

**Status:** First decision point (before building anything)
**Dependencies:** None
**Attach:** concept-v2.md, operations.md
**Expected Output:** 3-5 page scoping document with feature matrix and manual vs. build decisions
**Time to Complete:** 1 session

**Prompt:**

```
You are helping scope the minimum viable product for The Library of Me's first pilot.

Context: We want to run one pilot module with 2-3 cohorts (4-6 kids each, so ~15-18 kids
total) over 8-16 weeks. We have: 1 part-time education expert, 1 part-time technical person,
1 part-time sales/PM person.

Task: Create a scoping document that answers:
- What's the minimum set of components needed for a successful pilot?
- What must we build vs. what can be manual or stitched together?
- What existing tools should we use (Typeform, Google Docs, Sheets, Stripe, etc.)?

The document should include:

1. MVP FEATURE MATRIX
   Create a table showing:
   - Component (pre-reads, facilitator scripts, parent onboarding, workbook submission, etc.)
   - MVP requirement (what's the minimum?)
   - Build or manual?
   - Tool/approach
   - Notes

2. BUILD VS. MANUAL DECISIONS
   - What to build NOW (parent onboarding form, Stripe payment, workbook submission)
   - What to do MANUAL (education expert writes all pre-reads by hand, no AI pipeline)
   - What to DEFER (facilitator app web version, artifact processing automation, print)

3. TOOL STACK FOR MVP
   - Content: Google Docs (shared drive)
   - Forms: Typeform or Google Forms
   - Payments: Stripe
   - Cohort management: Notion or Airtable
   - Email/WhatsApp: Gmail + WhatsApp Broadcast List
   - Processing: Claude API (manual, batch)

4. CRITICAL PATH
   Week-by-week timeline:
   - Week 1-2: Module design + pre-reads
   - Week 3-4: Platform build (parent onboarding + payment)
   - Week 5: First cohort recruitment
   - Weeks 6-11: Run first cohort (parallel with 2-3 more cohorts)

5. RESOURCE ESTIMATE
   - Education expert hours (content creation + facilitation support)
   - Technical person hours (parent portal build)
   - Sales/PM hours (recruitment, customer support)

6. SUCCESS CRITERIA FOR PILOT
   - Trial → Core conversion: 30%+
   - Core → Premium upgrade: 20%+
   - Session attendance: 80%+
   - Kid artifact completion: 90%+
   - Parent satisfaction: 4/5+
   - Repeat interest: 40%+ for Module 2

Write as a decision-focused doc with tables. Emphasize: "This is not scalable, but it works
for 15-20 kids and teaches us what matters."
```

---

### 11. MVP Parent Portal Spec

**Status:** MVP (1-2 month build)
**Dependencies:** #10 (Overall MVP Scope)
**Attach:** concept-v2.md, operations.md
**Expected Output:** Minimal spec (2-3 pages) covering only essential features
**Time to Complete:** 1 session

**Prompt:**

```
Scope the MINIMUM viable parent portal for the pilot. We have 1 part-time technical person.
They have 2-3 weeks to build this.

What MUST be built:
- Onboarding form (family info + tier selection + payment)
- Module dashboard (current week, next session, pre-read link)
- Workbook submission form (for Premium tier only)
- Processing status page (is it ready yet?)

What does NOT need to be built yet:
- Digital Library dashboard (can be a simple folder link)
- Parent digest portal (we email manually)
- Print integration (defer to Phase 2)
- Analytics (manual, Google Sheets)

Write a 2-3 page minimal spec that a developer can build in 2-3 weeks.
Include: user flows, data model, tech stack, deployment plan.
```

---

### 12. MVP Content Pipeline

**Status:** MVP (manual workflow)
**Dependencies:** None
**Attach:** concept-v2.md, operations.md
**Expected Output:** 2-3 page workflow for creating Module 1
**Time to Complete:** 1 session

**Prompt:**

```
Design the content creation workflow for Module 1 (MVP phase).

The education expert will create this by hand, with optional Claude assistance.

Task: Map out a realistic, step-by-step workflow:

Week 1: Design + Research
- Education expert: module intake (2 hours)
- Education expert: read research, take notes (3-4 hours)
- Output: research summary

Week 2: Pre-reads (all 6 weeks)
- Education expert: write 6 pre-reads by hand (12-16 hours)
- Style: case studies, 5-10 min reads, narrative-driven
- Output: Google Docs with all 6 pre-reads

Week 3: Facilitator Scripts + Workbook Templates
- Education expert: draft 6 facilitator scripts (8-12 hours)
- Education expert: draft 6 workbook templates (4-6 hours)
- Output: printable PDFs for facilitator + kids

Timeline: 35-40 hours education expert time, spread over 3 weeks

Optional: Use Claude API to accelerate
- "Here's my research + Week 1 pre-read. Draft Week 2." → expert reviews + edits
- Can cut time to 25-30 hours if expert is comfortable with AI drafting

Iteration: After first cohort, use facilitator feedback to improve content

Write as a practical workflow doc, not a theoretical pipeline.
```

---

### 13. MVP Artifact Processing

**Status:** MVP (manual, not automated)
**Dependencies:** None
**Attach:** concept-v2.md
**Expected Output:** 2-3 page manual workflow
**Time to Complete:** 1 session

**Prompt:**

```
Design a manual but beautiful artifact processing workflow for the MVP phase.

Don't automate yet. Do this manually so you can:
1. Learn what quality looks like
2. Gather data for future automation
3. Test willingness to pay for Premium tier

Workflow (per submission, 60-90 minutes):
1. Expert review: read workbook pages (15 min)
2. Manual transcription: type out kid's text (20-30 min)
3. AI polishing: paste into Claude, request polish (10-15 min)
4. Formatting: apply design template, generate PDF (10-15 min)
5. Parent review: send for approval (parent decides yes/edit/no)

Track: time per step, parent satisfaction, what edits parents request

Expected volume for MVP: 8-10 Premium submissions across all cohorts
At €20-30 per submission (contractor cost), total ~€160-300 for pilot phase

Write as practical workflow. Include the exact Claude prompt for polishing.
When volume grows to 50+ per month (Phase 2), then automate.
```

---

## SECTION 3: IMPLEMENTATION PROMPTS

### 14. Parent Portal Implementation

**Status:** Phase 1 build (Weeks 3-5 of pilot)
**Dependencies:** #11 (MVP Parent Portal Spec)
**Attach:** concept-v2.md, operations.md
**Expected Output:** Implementation guidance for a Next.js developer
**Time to Complete:** 40-60 hours of development

**Prompt:**

```
You are building the parent portal for The Library of Me using Next.js.

Build ONLY these features for MVP:

1. ONBOARDING FLOW (/onboard)
   - Step 1: Parent name, email, WhatsApp, kid name, kid age
   - Step 2: Module selection (only "User Manual for My Brain" for now)
   - Step 3: Tier selection (Core €150 or Premium €220)
   - Step 4: Stripe checkout

2. DASHBOARD (/dashboard)
   - Welcome message
   - Module card: title, week (1 of 6), Socratic phase, next session date, pre-read link
   - (If Premium) Workbook submission button

3. WORKBOOK SUBMISSION (/submit-workbook)
   - File upload (images + PDFs)
   - Checkbox to select which pages
   - Submit to processing

4. PROCESSING STATUS (/processing-status)
   - Polling display: "Processing..." → "Done! Here's your chapter:"
   - Buttons: Approve | Edit request | Don't use this

5. SIMPLE LIBRARY (/library)
   - List of approved artifacts (that's it)

Tech stack:
- Next.js 14 (App Router)
- shadcn/ui + Tailwind
- Firestore (Firebase) for data
- Firebase Storage for files
- Stripe for payments
- Vercel for hosting

Write implementation guidance covering:
- Project structure
- Key files and components
- Data models
- API routes
- Deployment checklist

Use code examples where helpful.
```

---

## SECTION 4: CONTENT GENERATION PROMPTS

These prompts generate actual module content once the structure is in place.

### 15. Module Research Prompt

**Status:** Use for any new module
**Dependencies:** Module intake defined
**Attach:** concept-v2.md
**Expected Output:** Structured research knowledge object (1500-2000 words)
**Time to Complete:** 1 session with Claude

**Prompt:**

```
Conduct research for a new Library of Me module.

Module Definition:
- Topic: [e.g., "executive function + focus systems"]
- Target artifact: [e.g., "User Manual for My Brain"]
- Age band: [10-12 or 13-15]
- Domain: [executive function, communication, thinking, life literacy, leadership]

Task: Research and structure knowledge about this topic for kids this age.

Generate a structured knowledge object with these sections:

1. DOMAIN CONCEPTS
   - 5-8 core ideas kids should understand
   - Simple, concrete language
   - Real-life examples

2. WHAT KIDS THIS AGE STRUGGLE WITH
   - 5-8 common challenges (research-backed)
   - Why these are hard developmentally
   - Real scenarios they face

3. EVIDENCE-BASED APPROACHES
   - Techniques shown to work
   - Feasible for kids to implement themselves
   - Concrete, practice-able (not just theory)

4. LANGUAGE AND METAPHORS
   - Words kids use
   - Comparisons that resonate
   - What to avoid (jargon, overly clinical)

5. PARENT CONCERNS
   - What parents worry about
   - Common misconceptions
   - ROI messaging for parents

6. COMMON MISCONCEPTIONS
   - Myths kids have about this
   - Why they're appealing
   - How to gently challenge

7. PROGRESSION (Socratic cycle)
   - Week 1 (Observe): what should they notice?
   - Week 2 (Map): what patterns?
   - Week 3 (Design): what can they choose?
   - Week 4 (Test): what should they try?
   - Week 5-6 (Codify): what system?

8. CHARACTER ARCHETYPES
   - 3-4 relatable personas
   - Their specific challenges
   - Diverse contexts (not stereotypes)

9. REAL-WORLD EXAMPLES
   - Concrete scenarios from kids' lives
   - Not hypothetical
   - Range of outcomes and contexts

Output: Structured markdown with concrete details in each section.
Be specific and grounded in what's true for this age group.
```

---

### 16. Pre-Read Generation Prompt

**Status:** Use after Week 1 gold-standard is written
**Dependencies:** Module research completed
**Attach:** concept-v2.md
**Expected Output:** Draft pre-reads for Weeks 2-6 (5-8 pages total)
**Time to Complete:** 1 session

**Prompt:**

```
Generate pre-reads for a Library of Me module.

Module: [title]
Age: [band]
Research (from prompt #15):
[paste knowledge object]

Gold-standard Week 1 pre-read (as style template):
[paste the education expert's Week 1 pre-read]

Task: Generate Weeks 2-6, following the same style but advancing through the Socratic cycle.

Constraints:
1. Follow Week 1's style, tone, reading level, format exactly
2. Each week: NEW scenario/character, but maintain narrative cohesion
3. Advance through phases:
   - Week 2 (Map): Show different patterns, help notice differences
   - Week 3 (Design): Someone designing their own system
   - Week 4 (Test): Someone trying it, what worked
   - Week 5-6 (Codify): Someone with a working protocol
4. Reading time: 5-10 min each
5. Diverse characters, family structures, contexts
6. No preaching, let the story speak
7. Implicit prompt at end (what would you do?) but NO explicit question

Output: 5 pre-reads labeled Week 2-6, each 500-800 words.
```

---

### 17. Facilitator Script Generation Prompt

**Status:** Use after pre-reads are approved
**Dependencies:** Pre-reads completed
**Attach:** concept-v2.md
**Expected Output:** 6 minute-by-minute scripts (5-8 pages each)
**Time to Complete:** 1 session

**Prompt:**

```
Generate facilitator scripts for a Library of Me module.

These are minute-by-minute guides for running 60-minute cohort sessions.
They must be detailed enough that a warm, organized person with zero teaching experience
can run the session successfully.

Module: [title]
Cohort size: 4-6 kids
Duration: 60 minutes per session, 6 sessions total

Pre-reads (all 6, for reference):
[paste approved pre-reads]

Learning objectives by week:
[list objectives]

Task: Generate a facilitator script for EACH of 6 weeks.

Each script includes:
- Session overview (objectives, materials, room setup)
- 4-6 timed segments (~10-15 min each)
  * Segment name
  * Duration
  * Activity description (detailed enough to follow)
  * Facilitator note (1-2 sentences on tone/approach)
  * Key prompts (3-4 open-ended questions)
  * Expected responses (what kids might say + follow-ups)
  * If-then handling (e.g., "If quiet → try...")
  * Timer indicator
- Materials needed
- Differentiation notes
- Key takeaway

Constraints:
1. Timing realistic (4-6 segments adding to ~60 min, ±5 min)
2. Activities low-prep, run from script alone
3. Prompts require NO subject expertise
4. Flow: opening → pre-read debrief → core activity → workbook → closing
5. Assume screen-share (Zoom/Meet)
6. Warm, conversational tone (not robotic)

Output: 6 scripts (Week 1-6), each 6-8 pages when formatted.
```

---

## SECTION 5: INTERNAL TOOLING

### 18. Backoffice App PRD

**Status:** MVP (lightweight version needed for pilot operations)
**Dependencies:** #1 (Parent Portal — shared auth/data model), #4 (Content Layer — module data structure)
**Attach:** master-brief.md, operations.md
**Expected Output:** 15-20 page PRD with role-based access model, feature breakdown by domain, data model extensions
**Time to Complete:** 1-2 sessions

**Prompt:**

```
You are helping design The Library of Me's Backoffice App — the internal team tool
used by operations staff, content managers, support agents, and administrators to
run the business.

I'm attaching:
1. master-brief.md — product brief (architecture, tiers, tech stack, team)
2. operations.md — the full operational model

Your task: Write a comprehensive PRD for the Backoffice App.

Key context:
- This is a SEPARATE Next.js app from the Parent Portal — different users, different concerns
- Same Supabase database, shared data model, but separate auth with role-based access
- Tech stack: Next.js 14, shadcn/ui, Tailwind, Supabase (shared with Parent Portal)
- Must support part-time team (intuitive, low training overhead)
- MVP version should replace "just use the Supabase dashboard" for common operations

The app has FOUR primary domains:

DOMAIN 1: MODULE BUILDER (Content Management)
- Create and edit modules (title, description, domain, duration, tier availability)
- Define Socratic Cycle phases per module (Observe → Map → Design → Test → Codify)
- Manage weekly structure (what happens each week, learning objectives)
- Upload/create/edit pre-reads per week (rich text editor or markdown)
- Upload/create/edit facilitator scripts per week
- Upload/create/edit workbook page templates per week
- Create parent digest templates per week
- Content versioning (track changes across cohorts)
- Content status workflow: Draft → Review → Approved → Published
- Preview mode: see pre-read / script / workbook as end user would see it
- At scale: trigger AI content generation pipeline and review outputs

DOMAIN 2: OPERATIONS (Cohort & Enrollment Management)
- Create cohorts (assign module, facilitator, schedule, capacity)
- Manage enrollments (add/remove kids, assign to cohorts, waitlists)
- View cohort calendar (all upcoming sessions across all facilitators)
- Facilitator management (profiles, availability, cohort assignments, performance notes)
- Session management (mark completed, flag issues, reschedule)
- Attendance tracking per session
- WhatsApp broadcast management (compose nudges, schedule sends, view delivery)
- Parent digest management (review AI-generated digests before send, override content)
- Cohort health dashboard (attendance trends, completion rates, dropout flags)

DOMAIN 3: SUPPORT & CUSTOMER MANAGEMENT
- Family directory (search by parent name, email, kid name, tier)
- Family detail view: tier, modules enrolled, payment history, session attendance, support tickets
- Stripe integration:
  * View payment history and invoices
  * Issue refunds (with reason tracking)
  * Manage subscription status (pause, cancel, upgrade/downgrade tier)
  * View failed payments and retry status
- Support ticket management:
  * Incoming tickets (email-based or in-app)
  * Assign to team member
  * Status tracking (open, in progress, resolved, escalated)
  * Internal notes and resolution history
- Bulk actions: email a cohort, notify all families of schedule change

DOMAIN 4: ANALYTICS & REPORTING
- Business dashboard: MRR, active families, tier distribution, churn rate
- Cohort performance: attendance rates, completion rates, conversion rates (trial → core, core → premium)
- Content performance: which pre-reads get engagement, which modules have highest completion
- Facilitator metrics: session ratings, attendance under their cohorts, repeat rate
- Financial reports: revenue by module, by tier, refund rates, LTV tracking
- Export to CSV for external analysis

The PRD should include:

1. OVERVIEW
   - What it is and who uses it
   - Why a separate app (not admin routes on Parent Portal)
   - Design philosophy: operational efficiency, low training overhead, zero ambiguity

2. USER ROLES AND ACCESS
   - Admin (full access — founder, operations lead)
   - Content Manager (Module Builder + read-only operations)
   - Facilitator Lead (Operations domain — cohort/session management, no financial data)
   - Support Agent (Customer management + limited operations — no content editing)
   - Read-only (Analytics + reporting — for investors, advisors)
   - Role assignment and management

3. FEATURE BREAKDOWN BY DOMAIN
   - Module Builder: full CRUD + content workflow + preview + AI pipeline triggers
   - Operations: cohort lifecycle, enrollment, scheduling, facilitator management
   - Support: family lookup, Stripe operations, ticket management
   - Analytics: dashboards, reports, exports

4. WIREFRAME DESCRIPTIONS
   - Global navigation (sidebar with domain icons)
   - Module Builder: module list → module detail → week editor → content editor
   - Operations: cohort calendar view → cohort detail → enrollment management
   - Support: family search → family detail (with tabbed sections) → Stripe panel
   - Analytics: dashboard with cards and charts → drill-down views

5. DATA MODEL EXTENSIONS
   - What new tables/fields beyond the Parent Portal schema
   - Role and permission tables
   - Support ticket schema
   - Content versioning schema
   - Audit log schema (who changed what, when)

6. STRIPE INTEGRATION SPEC
   - Which Stripe APIs to use (Customers, Subscriptions, Invoices, Refunds)
   - Webhook handling for payment events
   - What support agents can and cannot do (refund limits, no card access)
   - Reconciliation approach

7. CONTENT WORKFLOW ENGINE
   - Draft → Review → Approved → Published state machine
   - Who can transition between states (role-based)
   - Notification on state changes
   - Rollback to previous version

8. AI PIPELINE INTEGRATION (Scale Phase)
   - Trigger content generation from Module Builder
   - Review AI-generated drafts inline
   - Accept/reject/edit AI outputs
   - Pipeline status monitoring
   - Error handling and retry controls

9. MVP vs SCALE SCOPING
   - MVP (for pilot): Module CRUD, cohort management, enrollment, family lookup, basic Stripe view
   - Scale: full content workflow, AI pipeline controls, analytics dashboards, support tickets
   - What can stay in Supabase dashboard for now vs. what MUST be in the app

10. DESIGN PRINCIPLES
    - Functional, not flashy — this is internal tooling
    - Fast search and filtering everywhere (families, modules, cohorts)
    - Keyboard shortcuts for power users
    - Responsive but desktop-first (ops team uses laptops)
    - Audit trail on destructive actions

Write the PRD in clear, structured markdown. Be specific about the Stripe integration
since payment support is a primary use case. Include rough wireframe descriptions.
```

---

## HOW TO USE THIS KIT

1. **Start with MVP Scoping (#10-13):** Decide what to build vs. manual
2. **Then do Implementation (#14):** Build parent portal and backoffice MVP (#18)
3. **Meanwhile do Content (#15-17):** Create Module 1 content
4. **Run the Pilot:** Execute with 2-3 cohorts, gather feedback
5. **After Pilot, if successful:** Use full PRDs (Section 1) to build production components

---

## QUICK REFERENCE: PROMPTS BY PHASE

**MVP Phase (Weeks 1-16):**
- #10: Overall scope
- #11-13: Content + platform decisions
- #14: Parent portal build
- #15-17: Module 1 content generation
- #18: Backoffice app (MVP scope — module CRUD, cohort management, family lookup, basic Stripe)

**Scale Phase (Months 4-18):**
- #1-9: Full PRDs for production components
- #18: Backoffice app (full scope — content workflow, AI pipeline controls, analytics, support tickets)
- Use PRD #5 to build AI content generation pipeline
- Use PRD #6 for artifact processing automation
- Use PRD #7 for post-cohort insight discovery

**Year 2+:**
- Use PRD #8-9 for WhatsApp + Print monetization
- Localization and B2B partnerships

---

## APP MAP

| App | Purpose | Users |
|-----|---------|-------|
| **Parent Portal** | Family-facing: onboarding, module tracking, submissions, Digital Library, print orders | Parents, kids |
| **Facilitator Companion** | In-session tool: scripts, timers, notes, attendance | Contract facilitators |
| **Backoffice** | Internal ops: module builder, cohort management, support, Stripe, analytics | Team (admins, content managers, support agents) |
| **Marketing Site** | Lead generation: landing pages, trial signup, public pre-reads | Prospects |

---

This prompt kit is ready to use. Copy any prompt, attach the referenced files, and go.