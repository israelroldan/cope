# The Library of Me — Master Brief

> Attach this document as base context for every prompt session.
> For deeper detail, attach `concept-v2.md` (product/front-of-house) or `operations.md` (back-of-house) when a specific prompt calls for it.

---

## What It Is

A modular curriculum where children aged 10–15 design their own operating system for life through cohort-based live sessions, case-study pre-reads, and scaffolded workbook activities. Each module produces a student-authored artifact (a system, toolkit, protocol, or guide). At Premium+ tier, artifacts become professionally printed books — a literal "Library of Me" on the shelf.

**Brand:** The Library of Me
**Tagline:** "Not worksheets. A Library of Me."
**Market:** Tiger parents and expat families in EMEA/LATAM
**Category:** Self-leadership education (not tutoring, not therapy, not generic skill-building)

---

## Pedagogical Engine

**The Socratic Cycle:** Observe → Map → Design → Test → Codify

Every module follows this 5-phase arc across 4–6 weekly sessions. Facilitators run pre-designed, templated activities — they hold space and follow scripts, they don't improvise or coach. Cohorts are 4–6 kids. Sessions are 60 minutes.

**The deliverable IS the learning.** Kids aren't graded — they build something real they keep.

---

## 5-Layer Product Architecture

| Layer | What it does | Data stance |
|-------|-------------|-------------|
| **1. Case-study pre-reads** | Prime introspection before each session. Graphic novel panels, scenario cards, mission briefings. Relatable protagonists with intentional distance. | Outbound content only. Zero data collection. |
| **2. WhatsApp nudges** | Logistical reminders, session links, celebration posts. Async rhythm. | Nudges only. No data gathering, no chatbots, no tracking. |
| **3. Weekly live group session** | Facilitator-led, templated activities processing the pre-read. Small breakouts → full group reflection → workbook time. | Human experience. No transcripts, no data mining. |
| **4. Workbook** | Paper or local-only digital. Structured templates matching Socratic phase. Accumulates visibly (15+ pages after 5 sessions). | Kid's property. Nothing shared unless parent submits. |
| **5. Parent opt-in AI processing** | Parent reviews pages → submits → AI structures into polished artifact → parent approves/edits/rejects. Per-instance consent, no blanket authorization. | Premium only. Parent-gated. No profiling, no retention beyond artifact generation. |

**Compliance by architecture:** COPPA/GDPR-K solved by design, not legal agreements. Pre-reads are outbound, WhatsApp is nudges, workbooks are kid-owned, AI is parent-initiated.

---

## Tier Structure

| Tier | Price/module | Includes |
|------|-------------|----------|
| **Trial** | Free or €20 | One session of one module. Intentionally incomplete artifact. |
| **Core** | €120–180 | Full 4–6 week module. Pre-reads, sessions, workbook, parent digests. No AI. |
| **Premium** | €180–250 | Core + AI artifact processing + digital Library dashboard + personalized pre-reads + print-ready PDF. |
| **Premium+** | €250–350 | Premium + professionally printed, hardcover physical book with kid's name. |

No freemium. Yes tiered with trials as hook. Semester bundles available at each tier.

---

## Module Portfolio

**5 domains, 20+ modules planned. First 3 for pilot:**

1. **"User Manual for My Brain"** — Study systems and focus (Module 1, pilot with founder's kids)
2. **"Say It Clearly"** — Talk toolkit with scripts and frameworks
3. **"Own the Week"** — Personal planning protocol

Other domains: Communication + Collaboration, Thinking + Learning, Life Literacy, Leadership + Citizenship.

---

## Content Production Pipeline

**Gold Standard Pattern:** Education expert writes ONE exemplar per content type. AI generates the rest following that pattern. Expert reviews and approves.

**Dependency-ordered generation:** Pre-reads → facilitator scripts → workbook templates → parent digests → next week's pre-reads. Topological ordering prevents weak outputs from propagating downstream.

**Quality validation with retry:** Automated checks at each step (reading level, timing, prompt quality). Failed deliverables regenerate with corrective feedback.

**Post-cohort insight discovery:** Multi-stream reasoning across facilitator feedback + research + parent/kid feedback → typed, prioritized revision recommendations.

**Result:** Full module produced in ~18 hours education expert time + ~3 hours technical (vs. 60–80 hours traditional).

---

## App Map

| App | Purpose | Users |
|-----|---------|-------|
| **Parent Portal** | Family-facing: onboarding, module tracking, submissions, Digital Library, print orders | Parents, kids |
| **Facilitator Companion** | In-session tool: scripts, timers, notes, attendance | Contract facilitators |
| **Backoffice** | Internal ops: module builder, cohort management, support, Stripe, analytics | Team |
| **Marketing Site** | Lead generation: landing pages, trial signup, public pre-reads | Prospects |

---

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Parent portal | Next.js 14 + shadcn/ui + Tailwind |
| Facilitator companion app | Next.js, iPad Pro landscape, two-column layout (session timeline + materials) |
| Backoffice app | Next.js 14 + shadcn/ui + Tailwind (shared DB, separate auth with roles) |
| Styling | shadcn/ui components |
| Database | Supabase (PostgreSQL) |
| Payments | Stripe |
| Communications | WhatsApp Business API |
| Hosting | Vercel |
| Print fulfillment | Lulu or Blurb API |
| AI pipelines | Claude API |
| Content layer | Structured JSON/Markdown, version-controlled |

Content-code separation: new modules require no code changes. Apps read from content layer.

---

## Key Architectural Patterns

1. **Composable outputs** — every deliverable is human-readable AND machine-consumable input for downstream generation
2. **Dependency-ordered generation** — topological ordering of deliverables prevents garbage propagation
3. **Progressive enrichment** — each pipeline stage feeds the next; knowledge compounds across cohorts
4. **Multi-stream reasoning** — insight discovery consumes multiple independent data streams simultaneously
5. **Selective consumption** — downstream pipelines pull specific deliverables, not all upstream outputs
6. **Validation with retry** — automated quality gates with corrective feedback loops

---

## Team (Part-Time Founding)

| Role | Hours/week | Primary responsibility |
|------|-----------|----------------------|
| Education expert | 10–15 (sprints), 5–8 (ops) | Module design, gold-standard authoring, AI draft review |
| Technical | 15–20 (build), 5–10 (ops) | Platform dev, AI pipeline, integrations |
| Sales/PM | 10–15 | Acquisition, conversion, facilitator management |
| Facilitators | Contract, 2–4 cohorts/week each | Deliver sessions using scripts |

Facilitator profile: warm, organized, attentive. NOT required: teaching cert, subject expertise, improvisation skills.

---

## Unit Economics

- Blended revenue per learner per module: **€186**
- Variable cost per learner: **~€20** (facilitator + infra + print amortized)
- Gross margin: **~90%**
- Contribution margin after curriculum amortization: **~81%**
- LTV per Core customer: **~€400** over 5 years
- Trial → Core conversion target: **30%**

---

## Key Constraints & Decisions

- Founder's kids are the Module 1 pilot cohort
- No data collection from minors at any tier
- Core tier works entirely without AI (regulatory resilience)
- WhatsApp is for nudges only — never data collection
- Parent consent is per-instance, never blanket
- Printed books are at Premium+ only (Lulu/Blurb print-on-demand)
- No freemium — tiered with trial hooks
- Part-time team; AI handles content volume, humans handle quality gates
