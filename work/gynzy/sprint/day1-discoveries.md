# Sprint Day 1: Discoveries & Emerging Context

> Date: 2026-01-12
> Status: Ongoing — updated throughout day

---

## Student Data & Usage Association

**Source:** Sprint session discussion (transcript to follow)

### What We Learned

| Element | Notes |
|---------|-------|
| **Student data** | Influences behavior-driven segmentation, but not in all cases |
| **Usage levels** | Categorized as: **low**, **adequate**, **high** |
| **Association type** | Not direct causation — more of a correlation/pattern |
| **License relationship** | Different license types have different "ideal" usage expectations |

### Implied Logic

```
License Type → Expected Usage Level → Actual Usage (from student data)
                                              ↓
                                      Gap = Opportunity for intervention
```

**Example:**
- School has "Premium" license → ideal usage = high
- Actual student engagement = low
- → Flag for re-engagement flow

### Open Questions (Awaiting Transcript)

- [ ] How exactly does student data flow into segmentation decisions?
- [ ] What triggers "association" vs. direct rule-based segmentation?
- [ ] Which license tiers map to which usage expectations?
- [ ] How does this affect flow targeting today?
- [ ] Is student data aggregated at teacher level or school level?

### Implications for Prototype

If student-level data unlocks better targeting, this suggests:

1. **Segmentation isn't just teacher attributes** — aggregate student behavior matters
2. **"Ideal usage" varies by license** — personalization must account for this
3. **AI opportunity:** Identify mismatches between license tier expectations and actual usage
4. **Potential prototype pivot:** Usage gap detector that flags schools/teachers underperforming vs. license tier expectations

---

## API Constraints Discovered

**Intercom does not support Series/flow creation via API.**

See full analysis in: `day1-first-proto-idea.md`

**What IS supported:**
- Tags, attributes, events, users, companies
- Read operations on segments

**What is NOT supported:**
- Creating or modifying Series/flows programmatically

---

## Process Flow Captured (Full Detail)

**Source:** Process mapping session, captured in `captured-process.png`

### Complete Process Map

| Step | Dutch | English | System | Pain Point? |
|------|-------|---------|--------|-------------|
| 1 | Start Marketing Automation Process | Start | — | — |
| 2 | Definieer doelen voor marketing team | Define goals | — | — |
| 3 | Vertaal naar acties (wat willen we maken voor wie?) | Translate to actions | — | Note: "We houden hier al rekening met wel/niet kan" |
| 4 | Briefing met segmenten en KPIs schrijven | Write briefing with segments & KPIs | Linear | — |
| 5 | Ontwerpen van de Hoog over Flow | Design high-level flow with experts | Figma | — |
| 6 | **Statisch lineair pad** | **Static linear path** | — | **RED** |
| 7 | Definieer KPIs van een flow | Define flow KPIs | Amplitude | — |
| 8 | Valideren van flow met leerkrachten | Validate with teachers | Internal | — |
| 9 | Content creatie (tekst/visual) | Content creation | Canva/GDrive | — |
| 9b | Localisatie | Localization | — | — |
| 10 | Bouwen flows Intercom + content toevoegen | Build flows in Intercom | Intercom, ChatGPT | — |
| 11 | **Veel handmatig werk** | **Lots of manual work** | — | **RED** |
| 12 | Segment definiëren (entry rules) | Define segment entry rules | — | — |
| 13 | Live zetten flow op kleine groep | Launch to small group | — | — |
| 14 | Check op gekke data / reactie users | Check for issues | — | — |
| 15 | Worden met geleid: angst of goed gaat | Guided by fear if it goes well | — | — |
| 16 | **Zetten 3/4 grote flows live** | **Launch 3/4 large flows live** | — | **RED** |
| 17 | **We weten niet wat 2/3 engaged** | **We don't know what's engaged** | — | — |
| 18 | **We doen geen analyse** | **We don't do analysis** | — | **RED** |

### Analysis Branch (When Done)

| Activity | System |
|----------|--------|
| Holistic flow performance analysis | — |
| Gynzyfication dashboard | — |
| Business analytics (gynzyfication stages) | Metabase |
| Amplitude analysis | Amplitude |

---

## Data Architecture (Full Detail)

**Source:** Data mapping session, captured in `captured-info-about-data.png`

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DATA FLOW                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PRODUCT                                                                     │
│     │                                                                        │
│     ▼                                                                        │
│  Contact created ──────────────────────► INTERCOM                           │
│                                              │                               │
│                                              ▼                               │
│                                         CENSUS (DWH)                         │
│                                         - Daily sync                         │
│                                         - User & School (license)            │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  FRONTEND EVENTS                                                             │
│     │                                                                        │
│     ├──► Google Tag Manager ──► INTERCOM (real-time)                        │
│     │                                                                        │
│     └──► BigQuery (via dbt) ◄─────────────────────────────────────────────  │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  INTERCOM NATIVE DATA                                                        │
│  - Device info                                                               │
│  - Last email opened                                                         │
│  - Flow information                                                          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Key insight:** Events are available in TWO places:
1. **Intercom** (real-time via GTM)
2. **BigQuery** (via dbt — for analysis)

---

## Pain Points Identified (RED boxes)

| # | Pain Point | Stage | Implication |
|---|------------|-------|-------------|
| 1 | **Statisch lineair pad** | Design | Flows are linear, not dynamic/branching |
| 2 | **Veel handmatig werk** | Build | Building in Intercom is manual, time-consuming |
| 3 | **Zetten 3/4 grote flows live** | Launch | Risk — launching large flows without confidence |
| 4 | **We doen geen analyse** | Post-launch | No systematic learning/optimization loop |

**Implicit pain:**
- "We weten niet wat 2/3 engaged" — No visibility into engagement
- "Worden met geleid: angst of goed gaat" — Fear-driven, not data-driven decisions

---

## Prototype Direction Evolution

| Time | Direction | Status |
|------|-----------|--------|
| Morning | Flow Generator (auto-create Intercom flows) | Blocked by API |
| Mid-day | Pivot to tagging + coverage analysis | Valid option |
| Current | Briefing-to-Flow Generator (steps 2-4) | Under consideration |

---

---

# Ask the Experts: Interview Framework

> Purpose: Guide conversations to surface HMW (How Might We) statements
> Use after process mapping, before ideation

## Interview Structure

For each pain point area, use this flow:
1. **Context question** — Understand the current reality
2. **Impact question** — Feel the pain
3. **Ideal state question** — Envision the future
4. **Barrier question** — Understand what's blocking
5. **→ Capture HMW** — Reframe as opportunity

---

## Topic 1: Static Linear Paths

**Pain point:** "Statisch lineair pad" (Step 6)

| Type | Question |
|------|----------|
| **Context** | "Walk us through how you decide on the structure of a flow today." |
| **Impact** | "What happens when you realize a linear flow doesn't fit all users?" |
| **Ideal** | "If you could create flows that adapted to each user, what would that look like?" |
| **Barrier** | "What stops you from creating more branching/dynamic flows today?" |

**HMW prompts:**
- HMW create flows that adapt to user behavior without exploding complexity?
- HMW help the team think beyond linear paths?
- HMW make branching flows as easy to build as linear ones?

---

## Topic 2: Manual Work in Intercom

**Pain point:** "Veel handmatig werk" (Step 11)

| Type | Question |
|------|----------|
| **Context** | "Show us what 'veel handmatig werk' looks like. Walk us through building a flow." |
| **Impact** | "How much time does it take? What's the most frustrating part?" |
| **Ideal** | "If you had a magic wand, what parts would you automate?" |
| **Barrier** | "Have you tried any shortcuts or workarounds?" |

**HMW prompts:**
- HMW reduce the clicks/steps needed to build a flow?
- HMW let the team describe what they want and have it built automatically?
- HMW reuse existing flow components instead of rebuilding?

---

## Topic 3: Fear When Launching

**Pain point:** "Worden met geleid: angst of goed gaat" (Step 15)

| Type | Question |
|------|----------|
| **Context** | "Tell us about the 'angst of goed gaat' — what are you worried about when launching?" |
| **Impact** | "Has a launch ever gone wrong? What happened?" |
| **Ideal** | "What would give you confidence to launch without fear?" |
| **Barrier** | "What information would you need to feel safe?" |

**HMW prompts:**
- HMW give the team confidence before launching a flow?
- HMW catch problems before they affect users?
- HMW make it safe to experiment?

---

## Topic 4: No Analysis Loop

**Pain point:** "We doen geen analyse" (Step 18)

| Type | Question |
|------|----------|
| **Context** | "You mentioned 'we doen geen analyse' — why not?" |
| **Impact** | "What decisions are you making without data that you wish you had data for?" |
| **Ideal** | "If you had a dashboard that showed everything, what would be on it?" |
| **Barrier** | "Is it a time problem? Access problem? Not knowing what to look at?" |

**HMW prompts:**
- HMW make analysis automatic, not extra work?
- HMW surface insights without requiring manual digging?
- HMW close the loop from launch → learn → improve?

---

## Topic 5: Engagement Visibility

**Pain point:** "We weten niet wat 2/3 engaged" (Step 17)

| Type | Question |
|------|----------|
| **Context** | "You said 'we weten niet wat 2/3 engaged' — what would you want to know?" |
| **Impact** | "What happens when users slip through unnoticed?" |
| **Ideal** | "If you could see exactly which users are in which flows, how would that change things?" |
| **Barrier** | "Is the data available? Is it the tooling?" |

**HMW prompts:**
- HMW give real-time visibility into who's in what flow?
- HMW alert the team when engagement drops?
- HMW identify users who need attention before they churn?

---

## Topic 6: Localization Burden

**Pain point:** Localisatie (Step 9b)

| Type | Question |
|------|----------|
| **Context** | "How does localization (NL vs Flanders) affect your workflow?" |
| **Impact** | "How much extra work is it? Do you ever skip it?" |
| **Ideal** | "What if localization happened automatically?" |

**HMW prompts:**
- HMW reduce the localization burden?
- HMW generate content variants automatically?

---

## Quick Reference Card for Facilitator

```
┌────────────────────────────────────────────────────────────┐
│  ASK THE EXPERTS — HMW CAPTURE GUIDE                       │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  PAIN POINTS TO PROBE:                                     │
│  1. Static linear paths (design limitation)                │
│  2. Manual work (build burden)                             │
│  3. Launch fear (confidence gap)                           │
│  4. No analysis (learning loop broken)                     │
│  5. Engagement blind spots (visibility)                    │
│  6. Localization (content scaling)                         │
│                                                            │
│  QUESTION FLOW:                                            │
│  Context → Impact → Ideal → Barrier → HMW                  │
│                                                            │
│  HMW FORMAT:                                               │
│  "How might we [verb] [outcome] [for whom/context]?"       │
│                                                            │
│  CAPTURE ON STICKY:                                        │
│  - One HMW per sticky                                      │
│  - Start with "HMW..."                                     │
│  - Keep it open (not solution-specific)                    │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## Actual Questions Used (Final)

These are the 6 questions used in the Ask the Experts session:

| # | Question | Probes |
|---|----------|--------|
| 1 | **What behavioral signals (like abandoning a quiz) do you see in Amplitude that you wish could trigger an immediate intervention?** | Real-time triggers, behavior-based segmentation |
| 2 | **What are key bottlenecks in the process?** | Pain points, manual work, time sinks |
| 3 | **What information gets lost between the goal definition and the actual rule setup?** | Handoff gaps, translation errors, intent vs. execution |
| 4 | **Are there any overlaps you fear most, and how do you currently prioritize one message over another?** | Overlap pain, prioritization logic, conflict resolution |
| 5 | **When do you decide to split a flow into sub-flows? (or never)** | Complexity management, modularization triggers |
| 6 | **When is a flow retired?** | Lifecycle management, cleanup process |

### Answers & Insights

*(To be captured during/after session)*

#### Q1: Behavioral signals → immediate intervention
-

#### Q2: Key bottlenecks
-

#### Q3: Information lost (goal → rules)
-

#### Q4: Overlap fears & prioritization
-

#### Q5: When to split flows
-

#### Q6: Flow retirement
-

---

## To Be Added

- [ ] Transcript insights on student data association
- [ ] Maria's detailed tagging workflow
- [ ] Export of complex flow example
- [ ] Tag taxonomy list
- [x] Full process flow captured
- [x] Data architecture captured
- [x] Pain points identified
- [x] Interview framework for Ask the Experts
