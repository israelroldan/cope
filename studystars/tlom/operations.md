# The Library of Me — Operational Model

---

## OPENING

The concept document describes what families experience. This document describes the machine that makes it possible.

The core operational thesis: A small, part-time founding team can operate like a full content studio by applying AI-powered production pipelines, structured content architectures, and purpose-built facilitator tooling.

Three pillars: content production pipeline, facilitator operations and tooling, and the platform architecture.

---

## THE CONTENT PRODUCTION PIPELINE

Central engine of the operation. Follows a proven architecture: parameterized research → structured knowledge extraction → dependency-ordered deliverable generation → quality validation → post-cohort insight discovery. Each layer compounds on the previous, and every output is both a final product and a potential input to the next layer of reasoning.

### Phase 1: Module Intake

The education expert defines the module:

- Topic domain (e.g., executive function, communication, financial basics)
- Target artifact name (e.g., "User Manual for My Brain")
- Socratic cycle phase mapping to weeks (Week 1 = Observe, Week 2 = Map, etc.)
- Learning objectives per session
- Reference materials, pedagogical research, or inspiration sources
- Optional: notes from previous related modules (knowledge compounds across modules)

This intake object persists and enriches every downstream step. It's the "subject + depth setting" for the entire pipeline.

### Phase 2: Automated Research

A catalog of parameterized query templates, organized by topic domain, executes against a search-augmented LLM:

- "What do 10-14 year olds commonly struggle with regarding [topic]?"
- "What approaches have been studied for teaching [skill] to adolescents?"
- "What language and metaphors do kids this age use to describe [problem]?"
- "What are common misconceptions about [topic] among parents?"
- "What does the research say about self-authored vs. prescribed [skill] interventions?"

An extraction step parses the raw research into a structured knowledge object — the single source of truth for everything downstream. This isn't a document anyone reads; it's the machine-readable foundation that every pre-read, facilitator script, and workbook prompt draws from.

The knowledge object is stored and reusable. When building Module 5 ("Beat Procrastination"), the pipeline draws from the compounded knowledge of related modules (e.g., Module 1's executive function research). This is the compounding knowledge architecture.

### Phase 3: Dependency-Ordered Deliverable Generation

Each module's content set IS a dependency graph. Deliverables are generated in topological order — foundational pieces first, dependent pieces after.

The dependency chain for one week of a module:

1. **Pre-read (foundational)** — introduces the scenario, character, and Socratic phase prompt. Depends on: module intake + structured research.
2. **Facilitator script (depends on pre-read)** — the minute-by-minute session run sheet. Generated from: pre-read content + learning objectives + session structure template.
3. **Workbook template (depends on pre-read + facilitator script)** — the structured pages the kid fills in during/after the session. Generated from: session activities + Socratic phase + artifact structure.
4. **Parent digest template (depends on facilitator script)** — the weekly summary for Premium parents. Generated from: session plan + expected outcomes.
5. **Next week's pre-read (depends on entire previous week's chain)** — advances the character's story and the Socratic cycle to the next phase.

Each deliverable's prompt is assembled from: the structured research output, the module intake, and the full text of its upstream dependency deliverables. Progressive enrichment means each piece benefits from everything before it.

**Quality validation with retry:** Each generated deliverable passes through automated quality checks before it can feed downstream. Pre-reads get reading level checks, emotional engagement scoring, scenario specificity checks. Facilitator scripts get timing validation, prompt quality, activity clarity checks. If validation fails, the deliverable regenerates with corrective feedback — preventing weak outputs from propagating through the dependency chain.

The education expert's role: The pipeline generates DRAFTS. The expert reviews, refines, and approves. Their job shifts from "create everything from scratch" to "design the framework, review AI drafts, and ensure pedagogical integrity." This is the multiplier that makes a part-time expert as productive as a full content team.

### Phase 4: Post-Cohort Insight Discovery

After a cohort completes a module, the insight engine runs multi-stream reasoning across three independent data sources:

**Stream 1: Facilitator feedback** — structured post-session forms capturing what landed, what didn't, which pre-reads confused kids, which activities ran long, which discussions were flat.

**Stream 2: The structured research output and module content** — what was designed and why, the pedagogical intent behind each choice.

**Stream 3: Parent/kid feedback and submitted artifacts (Premium tier)** — what actually resonated, what the kids produced, parent satisfaction signals.

The insight pipeline runs through a sequence of reasoning steps:

1. Analyze patterns across facilitator feedback (e.g., "Pre-read 3 consistently rated low across 4 cohorts")
2. Cross-reference with research and content intent (e.g., "The banking scenario was designed to introduce financial concepts, but the research shows kids this age relate better to social spending")
3. Generate specific revision recommendations (e.g., "Change protagonist from 16-year-old managing a bank account to 12-year-old managing birthday money and a school fundraiser")
4. Identify module-level improvements (e.g., "Week 3 consistently runs 10 minutes over — suggest splitting Activity 2 into two shorter activities")
5. Surface cross-module insights (e.g., "Modules that open with a humor-driven pre-read have 30% higher facilitator engagement ratings in Week 1")

Each insight is typed, prioritized, and traced back to specific data sources. The education expert reviews and decides which revisions to implement. Revised content feeds back into the pipeline.

This creates the compounding knowledge architecture: raw research → structured knowledge → deliverables → cohort data → insights → better deliverables. Each cycle makes the content sharper.

---

## THE MODULE BUILDER (INTERNAL TOOL)

The education expert's workstation. Where the content production pipeline has a human interface.

### Workflow

1. **Define module** — topic, artifact name, learning objectives, Socratic phase mapping, reference materials
2. **Run research** — trigger the automated research phase, review the structured knowledge object
3. **Author gold-standard pre-read** — write one pre-read by hand for Week 1. This establishes the tone, reading level, character voice, and scenario style for the module.
4. **Generate remaining pre-reads** — AI generates drafts for Weeks 2-6 following the gold-standard pattern but advancing through the Socratic cycle. Education expert reviews, edits, approves.
5. **Generate facilitator scripts** — for each approved pre-read, AI generates the session run sheet. Education expert validates timing, prompts, and pedagogy.
6. **Generate workbook templates** — for each session, AI generates the structured workbook pages. Expert checks alignment with activities.
7. **Generate parent digest templates** — for each session, AI generates the digest template. Quick review.
8. **Preview module** — see all content in context (pre-reads in sequence, scripts in the facilitator app view, workbook as a PDF)
9. **Publish** — content flows to the content layer, becomes available in facilitator app and parent portal

### The "One Gold Standard" Pattern

This is the key productivity multiplier. The education expert writes ONE exemplar piece per content type per module. The AI uses that exemplar as style reference for generating the rest. This means:

- The expert's pedagogical judgment and voice are preserved across all generated content
- The AI handles volume; the expert handles quality and direction
- A module that would take weeks of full-time work can be produced in days of part-time review

---

## THE FACILITATOR COMPANION APP

A purpose-built Next.js web application designed for iPad Pro in landscape orientation. Internal operational tool — not marketing-facing, not student-facing. This is what makes contract facilitators reliable.

### Design Philosophy

Clean, utilitarian UI using shadcn/ui components. Designed for fast scanning and reference during live teaching, not for aesthetics. A facilitator glances at it between activities — it needs to be instantly readable.

Two-column layout:

- **Left panel (main):** Session Timeline — the minute-by-minute run sheet
- **Right panel (sidebar):** Materials + Notes — prep checklist and contextual guidance

### Session Timeline (Left Panel)

A collapsible accordion structure for each session, broken into timed segments.

**Example for Module 1, Week 2 (Map phase), 60 minutes:**

**Opening Check-In (5 min)**
- Activity: "One word for how your week went — go around the circle"
- Facilitator note: Keep it light. Don't dig into answers yet.
- Timer: 5:00

**Pre-Read Debrief (10 min)**
- Activity: "Who remembers what Alex tried? Which approach surprised you?"
- Key prompts: [3-4 specific discussion questions generated from the pre-read]
- Facilitator note: If kids didn't read it, do a 2-minute verbal summary (provided in script)
- Expected responses: [2-3 typical student responses with suggested follow-ups]
- Timer: 10:00

**Core Activity — Pattern Mapping (20 min)**
- Setup: Share screen with slide showing 3 focus patterns from pre-read
- Individual (5 min): "Silently map your own patterns against these. Which feels most like you? What would you add?"
- Breakout pairs (8 min): "Share with your partner — what's similar? What's different?"
- Full group (7 min): "What surprised you about how different we all are?"
- Facilitator note: Don't push for consensus. The point is noticing difference.
- If-this-then-that: "If a kid says 'none of these are me' → great! Ask them to describe their pattern. That's the activity working."
- Timer: 20:00

**Workbook Time (15 min)**
- Activity: "Open to page 4. Sketch or write your own focus pattern using the template."
- Facilitator role: Walk around (virtually check in), affirm effort, don't correct.
- Timer: 15:00

**Group Share & Close (10 min)**
- Activity: "Who wants to share one thing from their page? Volunteers only."
- Closing prompt: "Next week we'll start DESIGNING your system based on what you mapped today."
- Preview next pre-read: "You'll get a case study about a kid who built their own focus protocol. Read it before Thursday!"
- Timer: 10:00

Each segment expands/collapses. Timer is visible. The script is specific enough that a well-prepared person can run the session from the app alone.

### Materials & Prep Checklist (Right Panel, Top)

Interactive checkboxes organized by session:

- Pre-read sent to all families (confirm delivery)
- Slides loaded and screen-share ready
- Workbook template available (PDF link for late joiners)
- Zoom/Meet room open 5 min early
- Recording settings configured (if applicable)
- Parent digest template queued for post-session

### Teacher Notes (Right Panel, Bottom)

Collapsible sections:

- **Differentiation:** guidance for kids who finish early vs. kids who struggle
- **Common Issues:** "Kids often say 'I can't focus on anything.' Reframe: 'Can you think of ONE time this week you were focused? What was different about that moment?'"
- **This Week's Pre-Read Context:** Summary so facilitator can reference without re-reading
- **Key Takeaway:** "By the end of this session, every kid should have at least a rough sketch of their personal focus pattern. It doesn't need to be complete — it needs to be THEIRS."

### Cohort Management Features

Beyond session reference:

- Cohort roster with kid names, attendance, and facilitator notes per kid
- Post-session feedback form (structured: "What landed? What didn't? Any concerns?")
- Pre-read delivery status (which families confirmed receipt)
- Link to trigger parent digest generation for Premium families

### Content Source Architecture

Critical choice: The facilitator app reads from the content layer that the content production pipeline populates. New module → pipeline generates content → facilitator app has new sessions ready. No code changes required. The app is a delivery surface for pipeline outputs.

---

## THE PARENT PORTAL

Parent-facing web application. Where the money flows and trust is built. Premium and simple — not a learning management system.

### Core Features

**Onboarding flow:**
- Family library card creation (parent + kid together)
- Module selection with descriptions and sample pre-reads
- Session scheduling (choose cohort time slots)
- Tier selection (Core / Premium / Premium+)
- Payment

**Module dashboard:**
- Current module progress (which week, which Socratic phase)
- Upcoming session details and countdown
- Pre-read access (link to current week's pre-read)

**Premium features:**
- Workbook submission interface (photo upload / scan)
- Page-by-page review before submission (parent can include/exclude pages)
- AI processing status and result preview
- Approve / edit / reject processed artifacts
- Digital Library dashboard (visual bookshelf of completed artifacts)
- Parent digests inbox

**Premium+ features:**
- Print preview of completed artifacts
- Cover customization (kid's name, module title, optional photo)
- Print ordering and delivery tracking

### Design Principles

- Mobile-first (parents use phones, not laptops)
- Clean, calm, premium feel — not edtech-cluttered
- Maximum 3 taps to any action
- No dark patterns, no engagement manipulation
- Clear data transparency

---

## THE PLATFORM ARCHITECTURE

### MVP (Months 1-6): Stitched Stack

Don't build a custom platform. Stitch proven tools:

- **WhatsApp Business API** — nudges and reminders
- **Zoom / Google Meet** — live cohort sessions
- **Next.js web app** — parent portal (onboarding, dashboard, workbook submission, Library)
- **Next.js web app** — facilitator companion (iPad-optimized, reads from content layer)
- **Headless CMS or structured JSON/Markdown** — content layer
- **LLM API (Claude or similar)** — content generation pipeline + artifact processing
- **OCR service** — workbook page scanning (photo → text)
- **Lulu/Blurb API** — print-on-demand fulfillment for Premium+
- **Stripe** — payments
- **Notion/Airtable** — internal ops, facilitator management, feedback tracking

### Scale (Year 2+): Custom Platform

When stitching becomes technical debt:

- Unified platform with single auth
- Real-time content management with preview
- Integrated AI pipeline with module builder UI
- Facilitator scheduling and assignment
- Analytics dashboard (cohort performance, conversion, retention)
- Multi-language support
- School/institution admin portal (for B2B)

### AI Pipeline Architecture

Three distinct functions:

#### 1. Content Generation (internal, education expert-facing)

- **Input:** Module intake + structured research + dependency deliverables
- **Process:** Prompt assembly → LLM generation → quality validation → retry if needed
- **Output:** Draft pre-reads, facilitator scripts, workbook templates, parent digests
- **Review:** Education expert approves/edits before publication

#### 2. Artifact Processing (parent-facing, Premium tier)

- **Input:** Scanned/photographed workbook pages + module template
- **Process:** OCR → text extraction → LLM structuring using per-module artifact template → formatting
- **Output:** Polished, structured Library of Me chapter
- **Review:** Parent approves before it enters the Library

#### 3. Insight Discovery (internal, team-facing)

- **Input:** Facilitator feedback + research knowledge + parent/kid feedback + artifacts
- **Process:** Multi-stream reasoning → pattern analysis → revision recommendations
- **Output:** Typed, prioritized insights traced to specific data sources
- **Review:** Education expert decides which revisions to implement

Each function is independent but shares the underlying knowledge layer. Content from Function 1 becomes context for Function 2's artifact processing. Feedback from Function 3 feeds back into Function 1's next cycle.

---

## FACILITATOR OPERATIONS

### Hiring Profile

The architecture deliberately lowers the facilitator bar:

- Warm, organized, attentive people (not exceptional coaches or therapists)
- Comfortable with kids aged 10-15
- Reliable internet and quiet space
- Can follow a structured session plan
- Part-time or contract basis (2-4 cohorts per week)

**NOT required:**

- Teaching certification
- Subject matter expertise (the content carries the pedagogical weight)
- Improvisation skills (the scripts are detailed enough)
- Full-time availability

### Onboarding and Training

**Self-paced training module:**
- Walk-through of the facilitator companion app
- Video examples of good vs. mediocre session facilitation
- Scenario-based training: handling shallow answers, dominating personalities, unprepared kids
- Quiz/certification before first live session

**Shadow sessions:**
- New facilitators observe 2-3 sessions by experienced facilitators
- Then run 1-2 with an experienced facilitator observing
- Feedback and calibration before solo operation

**Ongoing support:**
- Facilitator community (Slack/WhatsApp) for peer support
- Monthly calibration sessions
- Post-session feedback forms create a data stream the team reviews weekly

### Quality Loop

Facilitator feedback → insight pipeline → content revision → better scripts → easier facilitation → better kid outcomes → better parent satisfaction → growth. The facilitator isn't just delivering — they're a sensor in the system.

---

## TEAM ROLES AND CAPACITY

### Founding Team (Part-Time)

**Education Expert:**
- Primary: Module design, gold-standard content authoring, AI draft review, pedagogical quality assurance
- Secondary: Facilitator training, pilot facilitation
- Estimated: 10-15 hours/week during content sprints, 5-8 hours/week during cohort operation

**Technical Person:**
- Primary: Platform development (parent portal, facilitator app), AI pipeline setup and maintenance, integrations
- Secondary: Analytics, infrastructure, print fulfillment integration
- Estimated: 15-20 hours/week during build phases, 5-10 hours/week during operation

**Sales/PM Person:**
- Primary: Parent acquisition, trial conversion, cohort scheduling, facilitator hiring and management
- Secondary: Community management, partnership development, pricing iteration
- Estimated: 10-15 hours/week

**Nutritionist (Optional Content Layer):**
- Primary: Design wellness/sleep/focus/nutrition supplementary content for parent guides
- Secondary: Potentially author one module in the wellness domain ("My Operating System")
- Estimated: 3-5 hours/week

### Contracted Roles

**Facilitators:** Part-time contractors, 2-4 cohorts per week each. Scale by hiring more.

**Content Designer:** Contract for pre-read visual design (graphic novel panels, infographics). Project-based per module.

---

## KEY ARCHITECTURAL PATTERNS

Design principles that make the operational model work:

### 1. Progressive Enrichment

Each pipeline stage feeds the next. Module intake enriches research, research enriches deliverables, deliverables enrich facilitator tools, cohort feedback enriches the next iteration.

### 2. Dependency-Ordered Generation

Content deliverables arranged in a dependency graph. Pre-reads before scripts, scripts before workbooks, workbooks before digests. Foundational documents feed higher-level ones.

### 3. Composable Outputs

Every deliverable is both a human-readable final product AND a machine-consumable input for downstream automated reasoning. Pre-reads are inputs to the facilitator script generator. Facilitator scripts are inputs to the parent digest generator. Everything feeds forward.

### 4. Multi-Stream Reasoning

The insight discovery step consumes multiple independent data streams and reasons across them simultaneously.

### 5. Selective Consumption

Downstream pipelines don't consume ALL upstream outputs — they selectively pull specific deliverables relevant to their reasoning task.

### 6. The Gold Standard Pattern

Education expert writes ONE exemplar. AI generates the rest following that pattern. Expert reviews and approves.

### 7. Validation with Retry

Automated quality gates at each generation step with corrective feedback loops.

### 8. Compounding Knowledge

Raw research → structured knowledge → deliverables → cohort data → insights → better deliverables. Each cycle makes every module sharper. Knowledge from related modules enriches new module creation.

### 9. Content-Code Separation

The facilitator app and parent portal read from a content layer. New modules don't require code changes. Content authors work in the module builder, not in code files.

---

## OPERATIONAL WORKFLOWS

### The Full Module Creation Cycle (Weeks 1-3)

**Week 1: Design + Research**
- Education expert defines module intake (2 hours)
- Run automated research pipeline (1 hour automated, 2 hours review)
- Write gold-standard Week 1 pre-read (3-4 hours)
- Review structured knowledge object, surface gaps, refine research (1-2 hours)
- Total: ~9 hours education expert time

**Week 2: Bulk Generation**
- AI generates remaining pre-reads (Week 2-6) — all 5 in parallel
- AI generates facilitator scripts for all 6 weeks
- AI generates workbook templates for all 6 weeks
- AI generates parent digest templates for all 6 weeks
- All automated, runs overnight/batch: ~2 hours human oversight

**Week 3: Review + Refinement**
- Education expert reviews all pre-reads (3-4 hours), edits, approves
- Education expert reviews all facilitator scripts (2-3 hours), validates timing and pedagogy
- Education expert spot-checks workbook templates (1-2 hours)
- Technical person sets up module in facilitator app and parent portal (1 hour)
- Publish and schedule for first cohort (30 min)
- Total: ~8 hours education expert + 1 hour technical

**Total creation time: ~18 hours education expert, ~3 hours technical**

Compare to traditional content development: 60-80 hours for one full module. This is a 75-80% reduction in time.

### The Facilitator Onboarding Cycle (3-4 days)

- Day 1: Self-paced training module (2-3 hours async)
- Day 2: Live orientation with experienced facilitator (1 hour) + review of first assigned module (1 hour)
- Days 3-4: Shadow 2 live sessions (2 × 1 hour) + facilitator observes them running 1 session (1 hour)
- Ready for independent delivery

Total ramp time: ~7-8 hours spread over a week. After this, a facilitator can reliably deliver sessions with minimal support.

### The Post-Cohort Insight Pipeline (2-3 hours)

After a cohort completes a module:

1. Facilitator feedback forms are collected (10 min)
2. Parent/kid feedback and submitted artifacts are organized (10 min)
3. Insight pipeline runs (fully automated, runs overnight)
4. Education expert reviews insights and recommendations (1-1.5 hours)
5. Education expert decides which revisions to implement
6. Approved revisions are queued in the module builder for next offering
7. Next cohort runs with improved content

This closes the loop: cohort data → insights → better content → better cohort outcomes.

---

## CONTENT LAYER ARCHITECTURE

### The Content Schema

Each module in the content layer contains:

```
Module
├── Metadata (title, artifact name, domain, learning objectives)
├── Research Knowledge Object (structured extraction from Phase 2)
├── Week 1
│   ├── PreRead (narrative, reading level, Socratic phase)
│   ├── FacilitatorScript (minute-by-minute timeline, prompts, notes)
│   ├── WorkbookTemplate (structured PDF with activities and reflection prompts)
│   └── ParentDigestTemplate (AI prompt + expected output structure)
├── Week 2-6 (same structure)
└── Metadata (facilitator tips, common issues, differentiation strategies)
```

This structure is flat enough to be version-controlled (Git), flexible enough to power multiple surfaces (facilitator app, parent portal, content builder), and queryable enough to feed the AI pipeline.

### Version Control and Iterations

Each module lives in a structured JSON or YAML format in version control. When insights lead to revisions:

1. Education expert edits the specific deliverable (e.g., Week 3 pre-read)
2. Change is committed with a note ("Revised banking scenario to social spending context")
3. Next cohort automatically pulls the new version
4. All future cohorts benefit from the improvement

This creates an audit trail of improvement and prevents accidental rollbacks.

### Language and Personalization

The content layer is structured to support future localization:

- Pre-reads and scripts are language-agnostic but use country-specific references
- Workbook templates use templated placeholders for names/contexts
- Parent digests pull from structured data, so they can be generated in any language

In Year 2, when expanding to German, Spanish, or Portuguese speakers, the content layer structure supports rapid translation and adaptation.

---

## REVENUE AND UNIT ECONOMICS

### Revenue per Learner

Based on the tier structure and expected distribution:

| Tier | Price | Distribution | Revenue Share |
|------|-------|--------------|---------------|
| Core | €150 | 60% | €90 |
| Premium | €220 | 30% | €66 |
| Premium+ | €300 | 10% | €30 |
| **Blended Average** | **€186** | **100%** | **€186** |

### Cost Structure (per learner, per module)

| Cost Category | Amount | Notes |
|---------------|--------|-------|
| Facilitator labor | €12.50 | €50 per session ÷ 4 kids |
| Platform/infrastructure | €5 | Email, Notion, WhatsApp, servers |
| Printed book (Premium+ only) | €1.80 | €18 per book × 10% distribution |
| **Total Variable Cost** | **€19.30** | **~10% of revenue** |

### Margin Analysis

- **Gross Margin:** €186 - €19.30 = **€166.70 (90%)**
- **After amortized curriculum cost (€16/learner):** €150.70 **(81%)**
- **After overhead (team capacity, tools, etc.):** €120-130 **(65-70%)**

This is a high-margin business model. The content is produced once and reused indefinitely.

### Repeat and Lifetime Value

Assuming conservative repeat assumptions:

- Trial → Core conversion: 30%
- Core → Premium upgrade: 25%
- First repeat module: 60% of Core tier customers
- Second repeat: 40% of first repeat (cumulative)

**Sample LTV for a Core customer over 5 years:**
- Module 1 (Core): €150
- Module 2 (Core): €150 × 60% = €90
- Module 3 (Premium): €220 × 60% × 40% = €53
- Module 4 (Premium+): €300 × 40% × 25% = €30
- Modules 5+ (conservative): €80
- **Total LTV: €403**

At 81% contribution margin and 4 modules average, **lifetime contribution is ~€260**. This supports CAC spend of €50-100 depending on payback period targets.

---

## SCALING ROADMAP

### Phase 1: MVP (Months 1-6)

**Focus:** Prove the pedagogical model and operational efficiency.

Content:
- 2-3 fully developed modules
- 40-50 total sessions
- ~120-150 pre-reads, facilitator scripts, workbook templates

Operations:
- 2-3 pilot cohorts (4-6 kids each, from friends/network)
- 1 trained facilitator (founder or hire first contract facilitator)
- Module builder interface created and tested
- Facilitator companion app MVP
- Parent portal onboarding and dashboard MVP
- Stripe payments integrated

Team:
- Education expert (part-time, focused on content)
- Technical person (building platform)
- Sales/PM (pilot recruitment and feedback)

Capacity:
- ~30 paying learners (conservative, from pilot cohorts)
- Revenue: ~€5.5k (low, because pilot pricing or discounts)

### Phase 2: Scale (Months 7-18)

**Focus:** Expand to multiple cohorts, add facilitators, prove unit economics.

Content:
- 5-8 modules in portfolio
- Add 2 new modules (based on pilot feedback)
- Pre-read library is defensible IP and repurposed for marketing

Operations:
- 8-12 concurrent cohorts at any time
- 3-4 trained contract facilitators
- Module builder fully operational
- Facilitator companion app live
- Parent portal complete with Premium features
- AI artifact processing pipeline live
- Insight discovery pipeline operational
- Post-cohort iteration cycle established

Team:
- Education expert (part-time, content design + iteration)
- Technical person (infrastructure, platform improvements)
- Sales/PM (cohort marketing, facilitator management)
- Community manager (part-time, peer support, testimonials)

Capacity:
- ~200-300 active learners per month
- Revenue: €35-50k per month (€420-600k/year)

### Phase 3: Expansion (Year 2+)

**Focus:** Add new markets, deepen Premium engagement, explore B2B.

Content:
- 10-15 modules in portfolio
- Content localization (German, Spanish, Portuguese)
- Specialized content tracks (e.g., "resilience pathway" = 3 modules in sequence)

Operations:
- 20+ concurrent cohorts
- 6-10 facilitators (global, mixed part-time and full-time)
- Custom platform with real-time content management
- Analytics dashboard (cohort metrics, conversion, retention)
- School partnerships piloting Core tier
- B2B licensing conversations with tutoring centers

Team:
- Education expert (full-time, curriculum design)
- Technical lead + junior developers (platform enhancement)
- Sales + marketing team
- Ops/community manager
- Content designer (visual pre-reads, print book design)

Capacity:
- 1000-1500 active learners
- Revenue: €200-250k per month (€2.4-3m/year)

---

## RISK MITIGATION AND OPERATIONAL RESILIENCE

### Content Quality Risk

**Risk:** AI-generated content doesn't meet pedagogical standards.

**Mitigation:**
- Expert review gates every deliverable before publication
- Validation pipeline with specific quality criteria
- Facilitator feedback forms explicitly ask "What content confused kids?"
- Content revision cycle tightens based on feedback patterns
- Maintain high standard for gold-standard pre-reads (hand-authored, sets tone for all AI generation)

### Facilitator Reliability Risk

**Risk:** Contract facilitators cancel or deliver poorly.

**Mitigation:**
- Detailed facilitator scripts reduce improvisation burden
- Weekly peer calibration sessions (30 min) catch drift early
- Post-session feedback forms create transparency on performance
- Multiple facilitators trained per module (geographic redundancy)
- Bonus structure for 95%+ attendance (small incentive, big impact)
- Community of practice prevents isolation

### Cohort Engagement Risk

**Risk:** Kids don't show up or drop out mid-module.

**Mitigation:**
- Pre-reads prime engagement before the session
- Social accountability (peers in the cohort)
- WhatsApp nudges maintain rhythm without manipulation
- Workbook accumulation creates visible progress
- Parent email digests show value, encourage continuation
- Exit survey asks "Why did you leave?" — data feeds back to content improvement

### Platform Scalability Risk

**Risk:** Stitched stack becomes fragile as volume grows.

**Mitigation:**
- MVP architecture documented and modular
- Clear thresholds for when to migrate to custom platform (e.g., >500 concurrent cohorts)
- Content layer designed to be portable (easily migrates to custom platform)
- No vendor lock-in (Stripe can be swapped, WhatsApp replaced, etc.)
- Year 2 plan includes platform consolidation before it becomes urgent

### Regulatory Risk

**Risk:** EU tightens AI for minors regulations, Premium tier becomes compliant but difficult.

**Mitigation:**
- **This is actually a strength:** Core tier requires zero AI
- If regulations tighten, pivot to Core-only and keep growing
- Other AI-first competitors would be forced to rebuild
- Architecture designed to be resilient to this exact scenario

---

## SUCCESS METRICS AND DASHBOARDS

### Education Metrics

- **Content quality:** Facilitator ratings per deliverable ("Did this pre-read land?" 1-5 scale)
- **Engagement:** Session attendance rate, workbook completion rate
- **Learning:** Pre/post self-assessment (kid rates their focus/communication/planning confidence)
- **Artifact quality:** Parent satisfaction with final artifact, kid ownership of artifact

### Business Metrics

- **Trial to Core conversion:** % of trial participants who upgrade
- **Core to Premium upgrade:** % of Core tier who move to Premium
- **Repeat rate:** % of Module 1 learners who do Module 2 within 18 months
- **CAC payback:** Months to payback customer acquisition cost from LTV
- **Cohort economics:** Revenue per cohort minus facilitator cost = gross profit per cohort

### Operational Metrics

- **Content velocity:** Hours to produce a full module (track as it decreases)
- **Facilitator onboarding time:** Hours from hire to first solo session
- **Facilitator quality:** Scores on post-session feedback, attendance rates, parent comments
- **Platform reliability:** Uptime %, error rates, support ticket volume

### Dashboards

**Education Expert Dashboard:**
- Pipeline status (which modules in progress, what stage)
- Quality metrics (most/least loved pre-reads, scripts, templates)
- Insight backlog (recommended revisions, priority)
- Revision impact (did the change improve the metric?)

**Ops Dashboard:**
- Cohort schedule (upcoming, ongoing, completed)
- Facilitator status (availability, performance, pending training)
- Learner funnel (trial → Core → Premium → Premium+)
- Revenue by tier and cohort

**Team Dashboard:**
- KPIs summary (conversion, LTV, CAC, repeat rate)
- Bottlenecks (where is capacity constrained?)
- Roadmap progress (modules in portfolio, new markets)

---

## WHAT THIS MAKES POSSIBLE

With this operational model, the founding team can:

- **Produce a complete new module (6-8 sessions with all deliverables) in 2-3 weeks** of part-time work instead of 2-3 months
- **Onboard a new contract facilitator in under a week** with detailed scripts and training
- **Run 10+ concurrent cohorts with 3-4 facilitators** without founder involvement in delivery
- **Iterate content based on real cohort data** without starting over — insights pipeline closes the loop
- **Scale to new markets by translating the content layer** — the apps and pipeline stay the same
- **Compound knowledge advantage with every cohort**, making each subsequent module better than the last
- **Maintain high margins (65-70% contribution)** as volume grows, because content is produced once and reused indefinitely

The AI isn't a feature of the product. It's the engine that makes the product possible at this team size.

---
