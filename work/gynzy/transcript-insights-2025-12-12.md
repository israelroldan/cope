# Transcript Insights: Gynzy Marketing Sprint Kickoff

> Source: Fireflies transcript, December 12, 2025
> Participants: Koen (Gynzy Data), Annemarie (Intercom), Sander (Tatoma), Dwayne (Content Tech Lead), Jan (Tatoma Technical), Israel (Tatoma)

---

## Key Numbers (Updates Previous Assumptions)

| Metric | Previous Assumption | Actual |
|--------|---------------------|--------|
| Total flows | 50 | **210** |
| Live flows | - | **27** |
| Users in onboarding | - | **19,725** (NL + Flanders) |
| Marketing team size | 3 | Confirmed 3 |

**Critical insight:** Not all users are in flows. This is recognized as a problem — users can slip through without receiving any communication.

---

## Current Pain Points (Confirmed & Expanded)

### Intercom Limitations
- **No overlap prevention** — Users can be in multiple flows simultaneously, causing message fatigue
- **Poor analytics** — Can't easily see which users are in which flows
- **API limitations** — Hard to build custom solutions on top
- **Manual segment management** — Creating and maintaining segments is labor-intensive

### Operational Challenges
- **Flow proliferation** — Started with a few, now 210 total (technical debt)
- **No exit conditions** — Users stay in flows even after converting
- **Regional complexity** — NL vs Flanders have different flows, content, timing

### Content Challenges
- **Localization burden** — Same flow needs Dutch variants for NL vs Flanders
- **Personalization gap** — Know they should personalize more but can't scale it
- **Template rigidity** — Hard to create dynamic content variants

---

## Technical Architecture

### Data Stack
| Component | Technology |
|-----------|------------|
| Data warehouse | BigQuery |
| Sync to Intercom | Census |
| Backend | Kubernetes |
| Languages | Python, Ruby |
| Database | MongoDB |

### Data Capability
- **Can push any fields to Intercom** — Not a technical limitation
- **Real-time sync possible** — Census handles the ETL
- **Behavioral events tracked** — Logins, lessons, tool usage available

**Implication:** Data availability is not the bottleneck. The problem is knowing *what* to do with it.

---

## Previous AI Experiments

### Correlation Matrix (9 months ago)
- Built tool recommendation engine based on usage patterns
- Result: **Personalized messages got higher open rates**
- Validated that personalization works
- **Not operationalized** — Was a proof-of-concept, not deployed at scale

### Dwayne's Agent Work
- Building curriculum-aware content scanning
- Can identify which tools/lessons match Dutch curriculum objectives
- **Potential:** Personalize messages based on what teacher is teaching
- Example: "We noticed you're teaching fractions — here's our fraction tools"

---

## Gynzyfication Funnel (Detailed)

```
Attract → Acquire → Activated → Penetrated → Involved
```

| Stage | Definition |
|-------|------------|
| **Attract** | Awareness, website visits |
| **Acquire** | Account created |
| **Activated** | Using the platform regularly |
| **Penetrated** | Multiple teachers at same school |
| **Involved** | School-wide institutional deal |

### Conversion Targets
- 100 new schools (NL + Flanders)
- 100 Flemish schools Gynzyfied (activated → penetrated)

---

## Sprint Scope (Confirmed)

**End-to-end:** Audience selection → Content creation → Send

Not just segmentation — the sprint should address the full communication workflow.

### Human-in-the-loop Emphasis
Multiple times reinforced:
- "Not a fully automated segment builder"
- "Human approval before campaigns deploy"
- "Push the button" model — AI suggests, human confirms

---

## What Changes From Previous Work

### Clarify Phase Updates
| Previous | Updated |
|----------|---------|
| "50 audiences" | 210 flows total, 27 live |
| Unknown coverage | Not all users in flows (gap) |
| Assumed Intercom was underused | Confirmed: overlap, analytics, API issues |

### Organise Phase Updates
- Technical architecture now clearer (BigQuery → Census → Intercom)
- Dwayne's agent work opens curriculum-aware personalization
- Flow management is more complex than assumed

### Prioritise Phase Updates
- **Overlap prevention** surfaces as higher priority than assumed
- **Coverage gaps** (users not in any flow) is a new concern
- Personalization validated to work — raises priority of content personalization

---

## What Holds From Previous Work

### Confirmed Assumptions
- Land-and-expand model accurate
- Human-in-the-loop requirement firm
- 3-person team constraint real
- Intercom is the platform (no switching discussion)
- Sprint dates: Jan 12-16, 2026

### Research Prompts Still Relevant
All 5 research prompts remain valid:
1. Consolidating audience segments
2. Behavior-based triggers
3. Identifying teacher champions
4. Expansion readiness scoring
5. Scaling personalization

---

## Quotes Worth Noting

> "We validated that personalized messages get higher open rates... but we never operationalized it"
— Koen (on the correlation matrix experiment)

> "Not all users are in a flow. That's a problem."
— Annemarie

> "We can push any fields to Intercom. The data is there."
— Koen

> "The curriculum scanning could tell us what they're teaching, then we personalize based on that"
— Dwayne

---

## Action Items for Sprint Prep

1. **Get Annemarie's Figma** — Process/journey visualization mentioned
2. **Map the 27 live flows** — Understand current state before optimizing
3. **Identify coverage gaps** — Which user segments have no flow?
4. **Explore Dwayne's agent** — Curriculum-aware personalization potential
5. **Design overlap detection** — First step before prevention

---

*Extracted: 2026-01-08*
