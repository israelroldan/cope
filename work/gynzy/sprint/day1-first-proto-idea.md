# Prototype Idea: Flow Generator

> Date: 2026-01-12 (Sprint Day 1)
> Status: Concept for validation

---

## The Real Pain

It's not "help me think about segments" — Intercom already does that. The pain is:

1. **Flows are so complex they hit block limits** — branching logic explodes
2. **Manual flow building is slow** — clicking through the editor, adding conditions, wiring branches
3. **Breaking apart flows is tedious** — they know a flow should be subflows, but restructuring is work
4. **Configuration, not ideation** — they know *what* they want, building it is the bottleneck

---

## Prototype Concept: "Flow Generator"

```
INPUT (from user):
├── Goal: "Onboard new Flemish teachers who teach grades 3-5"
├── Available data: [grade_level, region, signup_date, lessons_created, ...]
├── Content points: [welcome email, first lesson tip, Live Lesson intro, ...]
└── Constraints: "Split by whether they've created a lesson in week 1"

AI DOES:
├── Generates flow structure (entry → branches → messages → exits)
├── Suggests subflow decomposition if complexity > threshold
├── Maps content to branches
├── Defines segment rules per branch
└── Outputs Intercom-compatible configuration

OUTPUT:
├── Visual flow preview (mermaid or similar)
├── Intercom flow config (JSON/API-ready if possible)
└── Suggested subflows if needed
```

---

## What This Solves

| Current Pain | Prototype Solution |
|--------------|-------------------|
| Hours building flows manually | AI generates structure in seconds |
| Hit block limits | AI suggests subflow splits automatically |
| Branching logic is error-prone | AI applies rules consistently |
| Hard to visualize before building | Preview before pushing to Intercom |
| Recreating similar flows for NL/Flanders | AI generates variants from one spec |

---

## What We Need to Capture Today

### 1. Flow Anatomy

| Question | Why |
|----------|-----|
| Show us your most complex flow — the one hitting limits | Understand the structure AI needs to generate |
| What makes it complex? Too many branches? Too many conditions? | Identify decomposition logic |
| How would *you* break it into subflows if you had time? | Capture expert heuristics |
| What's the entry logic? Exit conditions? | Boundary rules |

### 2. Flow Goals (How They Think About It)

| Question | Why |
|----------|-----|
| When you start a new flow, how do you describe what it should do? | Natural language → flow mapping |
| What data points do you typically branch on? | Core segmentation variables |
| How do you decide timing between messages? | Pacing logic |
| What triggers exit from a flow? | Completion criteria |

### 3. Intercom Specifics

| Question | Why |
|----------|-----|
| Can we export a flow definition? (JSON, CSV, screenshot) | Understand output format |
| Do you use the Intercom API for anything today? | Integration possibility |
| What are the actual block limits you're hitting? | Constraints to design for |
| Can you duplicate/template flows in Intercom? | Existing workarounds |

---

## Sample Data / Artifacts Needed

| Artifact | Purpose |
|----------|---------|
| **Export of 1-2 complex flows** | Reverse-engineer structure |
| **List of branching variables** | What data points drive rules |
| **Content library sample** | Messages/templates available |
| **Intercom API docs review** | Can we push flows programmatically? |
| **"Dream flow" description** | What would they build if it were instant? |

---

## Quick Win for Prototype Demo

Even without API integration, we could demo:

1. **User describes goal in plain language**
2. **AI outputs a mermaid diagram of the flow**
3. **AI outputs the segment rules per branch**
4. **AI suggests where to split into subflows**

They could then manually build it in Intercom, but the *thinking* is done. If we get Intercom API access, we push the config directly.

---

## Key Question for Gynzy Today

> "Can we see your most complex flow — the one that's hitting limits or took forever to build? We want to understand: if AI could generate that structure from a description of what you wanted, would that be valuable?"

---

## Next Steps

- [ ] Validate this direction with team
- [ ] Get export of complex flow
- [x] Review Intercom API capabilities — **BLOCKER FOUND**
- [ ] Build first mermaid-output prototype

---

# API Constraint Discovery

> Added: 2026-01-12 (during sprint)

## The Problem

**Intercom does not support Series/flow creation via API.**

The API is designed for data operations, not flow building. This blocks the original "push config directly to Intercom" approach.

### What Intercom API DOES Support

| Capability | API Support |
|------------|-------------|
| Create/update users | Yes |
| Create/update companies | Yes |
| Add/remove **tags** | Yes |
| Set **custom attributes** | Yes |
| Send **events** | Yes |
| Read segments | Yes |
| Create Series/flows | **No** |
| Modify flow logic | **No** |

### Sources

- [Intercom REST API Docs](https://developers.intercom.com/docs/build-an-integration/learn-more/rest-apis)
- [Intercom Workflows Builder Help](https://www.intercom.com/help/en/articles/6611595-using-the-workflows-builder)
- [Intercom OpenAPI on GitHub](https://github.com/intercom/Intercom-OpenAPI)

---

## Pivot Options

### Option A: "Blueprint Generator" (No API needed)

AI generates the flow design as a visual spec + rule definitions. User manually builds in Intercom, but the thinking/design is done.

**Value:** Saves design time, not build time. Still useful but less magic.

**Pros:**
- No API dependency
- Still addresses complexity pain
- Visual output is tangible

**Cons:**
- Manual build step remains
- Less "wow" factor

---

### Option B: Pivot to Data Layer (API supported) ⭐ RECOMMENDED

The API *does* support tags and attributes. Pivot: AI doesn't build flows — AI **tags users correctly** so they route into the right *existing* flows.

```
CURRENT:
User → Manual tagging/vetting → Segment → Flow

WITH AI:
User data → AI analyzes → Suggests tags → Human approves → Tags applied via API → Existing flows trigger
```

**This is Maria's original pain point — the manual tagging/vetting step.**

**Pros:**
- Uses what API actually supports
- Addresses stated pain (tagging/vetting)
- Proves AI value in real workflow
- Tags → existing flows = no Series API needed
- Human-in-the-loop preserved

**Cons:**
- Requires existing flows to be tag-triggered
- Different prototype than originally envisioned

**Prototype becomes:**

> "Given user attributes + behavior, AI suggests which tags to apply. Human approves. Tags are pushed via API. Existing flows pick up the newly-tagged users."

---

### Option C: Overlap & Coverage Analyzer (Read-only)

Use API to pull user/segment data, AI analyzes:
- Which users are in no flow (coverage gaps)
- Which users are in multiple flows (overlap)
- Which flows are redundant

**Value:** Visibility tool. Doesn't build anything, but surfaces the problem clearly.

**Pros:**
- Pure read operations = definitely API supported
- Addresses P0 priority from COPE assessment
- Tangible output (dashboard/report)

**Cons:**
- Doesn't automate anything
- Analysis only, not action

---

### Option D: Fin Procedures Integration

Intercom's **Fin Procedures** allow multi-step actions via API. Could we define procedures that handle routing logic?

**Pros:**
- Native Intercom capability
- Could enable more automation

**Cons:**
- More complex to implement
- May not solve the core flow-building pain
- Requires deeper Fin integration

---

## Recommendation

**Pivot to Option B** with Option C as a complementary deliverable:

1. **Primary prototype:** AI-powered tagging assistant
   - Input: User data + behavior signals
   - AI: Suggests tags based on patterns
   - Human: Approves/rejects suggestions
   - Output: Tags applied via Intercom API
   - Result: Users flow into correct existing Series

2. **Secondary deliverable:** Coverage/overlap analyzer
   - Shows which users aren't in any flow
   - Shows which users are in multiple flows
   - Informs which tags/flows need attention

This combination:
- Addresses Maria's pain (manual tagging)
- Addresses P0 priorities (coverage + overlap)
- Uses API capabilities that actually exist
- Maintains human-in-the-loop requirement
- Proves AI value in real workflow

---

## Updated Questions for Gynzy

Given the pivot, new questions to ask:

| Question | Why |
|----------|-----|
| How do tags currently trigger flow entry? | Understand existing tag → flow mapping |
| Which tags are most important for routing? | Prioritize for prototype |
| What's the tagging decision logic today? | Capture rules AI should learn |
| Can we get a user export with current tags? | Training/testing data |
| Are you open to tag-based flow triggering? | Validate pivot direction |

---

## Next Steps (Updated)

- [ ] Validate Option B pivot with team
- [ ] Get list of current tags and their meanings
- [ ] Get sample user data with attributes
- [ ] Map which flows are triggered by which tags
- [ ] Build tagging suggestion prototype
- [ ] Build coverage/overlap analyzer
