# Sprint Day 1 Synthesis

*Date: January 12, 2026*
*Location: JADS Den Bosch*
*Sources: Process mapping session, Omi transcripts, prototype discussions*

---

## Executive Summary

Day 1 focused on understanding Gynzy's current marketing automation process and identifying opportunities for AI-assisted improvement. The team mapped the as-is flow, surfaced key pain points, and converged on prototype directions that work within Intercom's API constraints.

**Key outcome:** Pivot from "AI builds flows" to "AI helps with tagging and content" — because Intercom's API doesn't support flow creation.

---

## The Current Process (As-Is)

### Flow Overview

```
Define Goals → Translate to Actions → Briefing → Design in Figma → Define KPIs
    ↓
Content Creation → Localization → Build in Intercom → Define Segments → Go Live
    ↓
Small Group Test → Scale to 3-4 Flows → (No Analysis) → Next Project
```

### Systems in Play

| System | Role |
|--------|------|
| **Figma** | Flow design (source of truth for design) |
| **Intercom** | Flow building, segments, content, delivery |
| **Amplitude** | KPI definition, flow performance |
| **Metabase** | Business analytics (Gynzyfication steps) |
| **BigQuery** | Data warehouse |
| **Census** | Data sync to Intercom |
| **ChatGPT** | Content writing |

### Critical Pain Points

| Pain Point | Quote/Evidence | Impact |
|------------|----------------|--------|
| **No shared oversight** | "We houden niet allemaal het overzicht" | Siloed work, poor handover |
| **Static linear paths** | "Statisch lineair pad" | Can't respond to behavior |
| **Manual work** | "Veel handmatig werk" | Hours building flows |
| **Launch with luck** | "Worden met geluk, angst" | No confidence in releases |
| **No analysis** | "We doen geen analyse" | Don't know what works |
| **Don't know what's decisive** | "We weten niet wat doorslaggevend" | Can't optimize |
| **Figma → Intercom info loss** | Transcript: "Risk of information loss" | Design intent lost in translation |

---

## Key Insights from Discussions

### 1. Flow Architecture Problems

**From transcript (14:12):**
- School-level vs user-level signals need differentiation
- Transition from onboarding → penetration flows is unclear
- Figma designs lose fidelity when built in Intercom
- **Suggestion:** Intercom should be source of truth, with Figma as documentation

**Implication:** The problem isn't just building flows — it's maintaining coherence across the system.

---

### 2. The API Constraint (Blocker)

**From transcript (14:34):**
> "API constraints: can't create/modify Intercom flows via API"

**What Intercom API supports:**
- Create/update users and companies
- Add/remove tags
- Set custom attributes
- Send events
- Read segments

**What it doesn't support:**
- Create Series/flows
- Modify flow logic

**Implication:** Original "Flow Generator" prototype must pivot.

---

### 3. Behavior-Driven Segmentation

**From transcript (15:02):**
- Smart segments that auto-update based on behavior
- Behavior-driven flow triggering
- AI-generated content suggestions (not replacement)
- Maintain onboarding flow alongside behavior-triggered communications

**From transcript (15:29):**
- Intent-based messaging over exact flow definitions
- Next-best-action suggestions
- Advisory tool to move users between lifecycle stages

**Implication:** The opportunity is in the data layer (tags, attributes, segments) not the flow layer.

---

### 4. TATOMA Framework

Captured during prototype discussion:

| Letter | Meaning |
|--------|---------|
| **T** | Target |
| **A** | Assumptions |
| **T** | Thin slice |
| **O** | One-page |
| **M** | Minimal build |
| **A** | After-action capture |

Use this for prototype briefs.

---

## Prototype Directions (Validated)

### Primary: AI Tagging Assistant

**What it does:**
- Analyzes user attributes + behavior from BigQuery
- Suggests tags based on patterns/rules
- Human reviews and approves suggestions
- Approved tags pushed to Intercom via API
- Existing flows pick up newly-tagged users

**Why it works:**
- Uses API capabilities that exist (tagging)
- Addresses manual tagging/vetting pain
- Human-in-the-loop preserved
- No flow creation needed

**Workflow:**
```
BigQuery data → AI analyzes → Suggests tags → Human approves → API pushes tags → Flows trigger
```

---

### Secondary: Coverage & Overlap Analyzer

**What it does:**
- Pulls user/segment data via API
- Shows which users are in no flow (coverage gaps)
- Shows which users are in multiple flows (overlap)
- Surfaces redundant flows

**Why it works:**
- Read-only operations = definitely API supported
- Addresses P0 visibility problem
- Tangible output (dashboard)

---

### Tertiary: Content Assistant

**What it does:**
- AI generates content suggestions/variants
- Building blocks for emails
- Not full replacement — suggestions for human to refine

**Why it works:**
- Addresses content creation bottleneck
- Already using ChatGPT for this (just more structured)
- Human stays in control

---

## Prioritization Output

From the color-coded prioritization exercise:

| Priority | Focus Area |
|----------|------------|
| **Top 1-3** | To be defined tomorrow |
| **This week** | Prototype v0.1 or v0.2 |
| **Test** | Partner access/feedback session |

**Prioritization lens:** Impact vs Effort, with audience and concrete action considerations.

---

## Gynzyfication Funnel (Confirmed)

```
Attract → Acquire → Activate → Penetrate → Inflate → Convert
```

Communication flows should map to these stages, with clear handoffs between:
- Onboarding (Attract → Activate)
- Penetration (Activate → Penetrate)
- Expansion (Penetrate → Inflate → Convert)

---

## Open Questions for Day 2

| Question | Why It Matters |
|----------|----------------|
| What are the top 1-3 priorities? | Focus prototype effort |
| Which tags drive flow entry today? | Tagging assistant design |
| Can we get sample user data with tags? | Prototype testing |
| What does "success" look like for the prototype? | Validation criteria |
| Who is the partner for testing? | Access and feedback |

---

## Data Needs Identified

For prototype development:

| Data | Source | Purpose |
|------|--------|---------|
| User attributes | BigQuery/Census | Tagging logic |
| Behavior signals | BigQuery/Events | Behavior-based rules |
| Current tags | Intercom | Understand existing taxonomy |
| Flow membership | Intercom | Coverage/overlap analysis |
| Flow definitions | Intercom/Figma | Map tag → flow relationships |

---

## Day 2 Agenda (Suggested)

1. **Finalize top 1-3 priorities** from yesterday's exercise
2. **Define prototype scope** — what exactly are we building?
3. **Get data access** — sample exports for prototype
4. **Map tag → flow relationships** — understand current state
5. **Start building** — tagging assistant or coverage analyzer

---

## Key Quotes Bank

For reference and presentations:

> "We houden niet allemaal het overzicht. Het is individueel. Handover moet beter."
> — On shared visibility

> "Statisch lineair pad"
> — On rigid flow architecture

> "Veel handmatig werk"
> — On the build process

> "We doen geen analyse"
> — On post-launch learning

> "We weten niet wat doorslaggevend"
> — On understanding what works

> "Risk of information loss when translating from Figma to Intercom"
> — On design fidelity

> "Intent-based messaging over exact flow definitions"
> — On the strategic shift needed

---

## Files Reference

| File | Contents |
|------|----------|
| `captured-process.md` | As-is flow diagram description |
| `sprint/transcripts/day1-sessions-part1.md` | Morning transcripts |
| `sprint/transcripts/day1-sessions-part2.md` | Afternoon transcripts |
| `sprint/day1-first-proto-idea.md` | Prototype concepts + API analysis |
| `maria-input-2026-01-12.md` | Technical context from Maria |
| `sprint-briefing-2026-01-12.md` | Official sprint brief |

---

*Synthesis complete. Ready for Day 2.*
