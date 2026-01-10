# COPE Assessment: Gynzy Sprint Prep

> Updated: 2026-01-09
> Sprint: Jan 12-16, 2026
> Status: Ready for sprint — Clarify v2 complete

---

## Clarify (v2 — Final)

### The Real Problem

**v0 (Jan 6):** "Help a 3-person team manage 50 audiences without 3x headcount"

**v1 (Jan 8, post-transcript):** "Help a 3-person team manage 210 flows (27 live) while fixing coverage gaps and preventing overlap"

**v2 (Jan 9, post-Figma):** "Transform Gynzy's marketing from static manual segments to a behavior-driven, AI-assisted personal communication engine — starting with a prototype that fixes coverage and overlap while showing what's possible."

### The Transformation Frame

This is not just operational efficiency. Annemarie's Figma shows a **transformation vision**:

```
CURRENT STATE                    DESIRED STATE
─────────────                    ─────────────
Static attributes                Behavior-driven segmentation
  ("onderbouw vs bovenbouw")       ("prepped 3 lessons, no student activity")
Manual segment creation          AI microsegmentation
  (210 flows, hard to manage)      (AI finds clusters, suggests actions)
Batch campaigns                  Real-time triggers
  (scheduled sends)                ("just finished a lesson" → tip)
Fixed segments                   Self-learning optimization
  (set and forget)                 (continuous improvement from data)
```

### Problem Layers

| Layer | Need | Sprint Role |
|-------|------|-------------|
| **P0 — Immediate** | Fix coverage gaps, prevent overlap | Prototype solves this |
| **P1 — Foundation** | Move static → behavior-based segmentation | Prototype enables this |
| **P2 — Capability** | AI microsegmentation + real-time triggers | Prototype demos this |
| **P3 — Vision** | Self-learning, continuously optimizing system | Sprint delivers roadmap |

### Sprint Deliverables (Clear)

| Deliverable | Layer | Purpose |
|-------------|-------|---------|
| **Transformation vision/roadmap** | P3 | Where this goes over time |
| **Working prototype** | P0/P1 | Fix coverage + overlap, enable behavior segments |
| **P2 demo capability** | P2 | Show AI microsegmentation potential |

### Constraints Confirmed

- **OpenAI** for prototype (contractual — Maria confirmed)
- **Process/workflow first** — sprint is about design, prototype proves concept
- **Annemarie is vision owner** — Figma is her direction, sprint aligns
- **Data is available** — behavior signals in BigQuery, real-time events from frontend
- **Human-in-the-loop** — firm requirement, AI suggests, human approves

### What's NOT in Scope

- Production deployment
- Intercom replacement
- Full AI automation
- Data pipeline changes (BigQuery → Census → Intercom works)

### New Context (Jan 9)

**From Maria's email:**
- Data stack: BigQuery → Census → Intercom (daily sync)
- Events: Sent directly from frontend (real-time possible)
- AI tools: OpenAI (paid, contractual), Gemini, Claude (devs)

**From Annemarie's Figma:**
- Vision for behavior-driven, AI-assisted segmentation
- Real-time triggers tied to concrete moments
- Self-learning segments that optimize over time
- She is driving this transformation

---

## Organise (Updated)

### Stakeholder Map

| Person | Role | Relevance to Sprint |
|--------|------|---------------------|
| **Annemarie** | Intercom owner | Day-to-day flow management, pain points |
| **Koen** | Data lead | BigQuery access, Census sync, metrics |
| **Dwayne** | Content tech lead | Curriculum-aware agent, personalization |
| **Maria** | Marketing | Campaign strategy, content |
| **Roberto** | ? | Sprint attendee |
| **Stephanie** | ? | Sprint attendee |
| **Joke** | ? | Sprint attendee |
| **Vincus** | ? | Sprint attendee |

### Technical Context

```
Data Flow:
Platform → BigQuery → Census → Intercom

Available Signals:
- Logins, lessons created/delivered
- Live Lesson sessions
- Quiz creation/usage
- Tool usage patterns
- School affiliation
- User role/grade level
```

### Constraints
- Intercom API limitations (can't easily prevent overlap)
- 3-person marketing team (no headcount increase)
- Human approval required before campaigns deploy
- Regional variants (NL vs Flanders)

### Assets Available
- Dwayne's curriculum scanning agent (potential integration)
- 9-month-old correlation matrix experiment (validated personalization)
- BigQuery data warehouse (any field can be pushed)

---

## Prioritise (Revised)

### Sprint Priorities (Ranked)

| Priority | Area | Rationale |
|----------|------|-----------|
| **P0** | Flow coverage visibility | Can't fix gaps you can't see |
| **P0** | Overlap detection | Users getting multiple flows is active harm |
| **P1** | Audience consolidation | 210 → manageable groups |
| **P1** | Behavior-based triggers | Dynamic cohort assignment |
| **P2** | Personalization framework | Curriculum-aware, role-aware content |
| **P3** | Champion identification | Expansion readiness scoring |

### What Changed
- **Overlap prevention** moved up — active harm vs missed opportunity
- **Coverage gaps** surfaced as new P0 — wasn't on radar before
- **Personalization** validated but remains P2 — needs foundation first

### Research Prompts Assessment

| Prompt | Still Relevant? | Notes |
|--------|-----------------|-------|
| 1. Consolidating audiences | Yes | Core ask, even more urgent at 210 flows |
| 2. Behavior triggers | Yes | Key to dynamic cohorts |
| 3. Teacher champions | Yes | Feeds expansion scoring |
| 4. Expansion readiness | Yes | Gynzyfication funnel metric |
| 5. Scaling personalization | Yes | Validated to work, needs operationalizing |

---

## Execute (Sprint Plan)

### Monday (Jan 12)
1. **Validate insights** — Present transcript findings, confirm with team
2. **Process mapping** — Current state (27 live flows, coverage gaps, overlaps)
3. **Benchmarking** — External B2C examples (Customer.io case study?)
4. **Creative directions** — "Personal communication engine" concept

### Tuesday-Wednesday (Jan 13-14)
- Build prototype/concept
- Focus on: overlap detection + audience consolidation tool
- Human-in-the-loop workflow design

### Thursday (Jan 15)
- Validate with team
- Process walkthrough or individual testing

### Deliverables Target
1. **Visibility tool** — See coverage gaps and overlaps
2. **Consolidation framework** — Group 210 flows into manageable clusters
3. **Trigger design** — Behavior-based cohort rules
4. **Human approval workflow** — AI suggests, human confirms

---

## Open Questions (For Sprint)

1. **Flow mapping** — Can we get export of all 210 flows with their rules?
2. **Dwayne integration** — Is curriculum agent ready for integration?
3. **Intercom API** — What can/can't we do programmatically?
4. **Success metrics** — How will we measure improvement?

---

## Files in This Folder

| File | Purpose | Status |
|------|---------|--------|
| `gynzyfication-concept.md` | Core model explanation | Current |
| `sprint-prep-2026-01-06.md` | Sander call notes | Current |
| `opportunities.md` | 9 AI opportunity areas | Current |
| `discovery-questions.md` | Questions for team | Current |
| `research-prompts.md` | ChatGPT research prompts | Current |
| `transcript-insights-2025-12-12.md` | Kickoff transcript analysis | **New** |
| `cope-assessment-2026-01-08.md` | This document | **New** |

---

## Pre-Sprint Progress (Updated Jan 9)

### Completed
- [x] Run research prompts through ChatGPT Deep Research (7 prompts)
- [x] Run research prompts through Gemini Deep Research (7 prompts)
- [x] Get Annemarie's Figma — received, analyzed, integrated into Clarify v2
- [x] Prep Miro board — created, Sander added as collaborator
- [x] Maria added us to Gynzy Slack
- [x] JADS location confirmed for Monday

### In Progress (Today - Jan 9)
- [ ] Feed 14 research docs into NotebookLM for synthesis
- [ ] Customer.io benchmarking session
- [ ] Process mapping prep with Sander (hard stop 14:00)
- [ ] Review/approve Sander's kick-off email

### Research Assets Ready
| Source | Documents |
|--------|-----------|
| ChatGPT Deep Research | 7 docs (one per prompt) |
| Gemini Deep Research | 7 docs (one per prompt) |
| **Total** | 14 research documents |

---

## Next Steps (Today's Session with Sander)

### 1. NotebookLM Synthesis
Feed into NotebookLM:
- 14 research documents
- Transcript insights
- Annemarie's Figma
- COPE assessment
- As-is / To-be process maps

**Output:** Key patterns and insights for Monday

### 2. Process Map Validation
Walk Sander through:
- As-is process map (validate accuracy)
- To-be process map (validate AI intervention points)
- Identify gaps before Monday

### 3. Prototype Scope Definition
Agree on what the prototype will actually do:
- P0: Coverage dashboard + overlap detection
- P1: Behavior-based segment builder
- P2 demo: AI microsegmentation example

### 4. Monday Agenda Finalization
- What we present vs. co-create
- How to structure the transformation vision discussion
- Teacher interview logistics for Thursday

---

*Updated: 2026-01-09 09:00*
*Status: Research complete, synthesis in progress*
