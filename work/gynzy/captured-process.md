# Captured As-Is Process: Marketing Automation Flow

*Source: Sprint Day 1 process mapping session, Jan 12 2026*
*Facilitator: Sander*

---

## Overview

This is the current marketing automation process at Gynzy, captured during the sprint. The flow shows how the team goes from defining goals to launching flows in Intercom.

**Color coding in original diagram:**
- 🟢 Green: Start/End points
- 🟡 Yellow: Process steps
- 🔴 Red/Pink: Pain points, problems, manual work
- 🔵 Blue: Analysis/Dashboard outputs

---

## Process Flow

### Phase 1: Goal Definition

```
Start Marketing Automation Process
         ↓
Definieer doelen voor marketing team
(Define goals for marketing team)
         ↓
Vertaal naar acties: bv. onboarding flow maken
(Translate to actions: e.g., make onboarding flow)
"Wat willen we maken voor wie?" (What do we want to make for whom?)
```

**🔴 Pain Point:**
> "We houden niet allemaal het overzicht. Het is individueel. Handover moet beter. Prio bepalen."
> (We don't all keep oversight. It's individual. Handover needs to be better. Need to determine priority.)

---

### Phase 2: Briefing & Design

```
Briefing met segmenten en KPI/hypo vanuit Core systeem: linear
(Briefing with segments and KPI/hypothesis from Core system: linear)
         ↓
Ontwerpen van de flow met Fibre samen met experts, inclusief stappen/content
(Design the flow with Fibre together with experts, including steps/content)
System: Figma
         ↓
      ┌─────────────────┐
      │ STATISCH        │
      │ LINEAIR PAD     │
      │ (Static linear  │
      │  path)          │
      └─────────────────┘
```

**🔴 Pain Point:** Static linear path — flows are rigid, not dynamic/behavioral

---

### Phase 3: KPI Definition & Validation

```
Definieer KPIs van een flow
(Define KPIs of a flow)
System: Amplitude
         ↓
Valideren van flow technisch en op leesbaarheid binnen Gynzy
(Validate flow technically and for readability within Gynzy)
```

---

### Phase 4: Content Creation

```
Content creatie (tekst / visueel)
(Content creation - text / visual)
- Bouwen binnen bouwer (mail / posts) / Canvas / Google drive
- Teksten: Chat GPT
System: Intercom
         ↓
Localisatie
(Localization)
```

---

### Phase 5: Build & Launch

```
Bouwen flows Intercom en content toevoegen
(Build flows in Intercom and add content)
- Bouwen (mail / posts)
System: Intercom
         ↓
      ┌─────────────────┐
      │ 🔴 VEEL         │
      │ HANDMATIG WERK  │
      │ (Lots of manual │
      │  work)          │
      └─────────────────┘
         ↓
Segment definiëren (entry rules)
(Define segment - entry rules)
         ↓
Live zetten flow op kleine groep
(Put flow live on small group)
         ↓
Check op gekke Data / reactie users
(Check for weird data / user reactions)
```

---

### Phase 6: Scale & Analyze (Split Path)

```
                    ┌─────────────────────────────────────┐
                    │                                     │
                    ↓                                     ↓
        ┌───────────────────┐               ┌───────────────────┐
        │ Worden met geluk, │               │ Door naar         │
        │ angst of goed     │               │ volgende project  │
        │ gaat              │               │ (Continue to next │
        │ (With luck, fear  │               │  project)         │
        │  or goes well)    │               │                   │
        └─────────┬─────────┘               └─────────┬─────────┘
                  │                                   │
                  ↓                                   ↓
        ┌───────────────────┐               ┌───────────────────┐
        │ Zetten 3/4 grote  │               │ 🔴 WE DOEN GEEN   │
        │ flows live        │               │    ANALYSE        │
        │ (Put 3/4 large    │               │ (We don't do      │
        │  flows live)      │               │  analysis)        │
        └─────────┬─────────┘               └───────────────────┘
                  │
                  ↓
        ┌───────────────────┐
        │ 🔴 We weten niet  │
        │ wat doorslaggevend│
        │ (We don't know    │
        │  what's decisive) │
        └───────────────────┘
```

---

### Analysis & Dashboards (Right side)

```
┌────────────────────────────────────────────┐
│ Analyses doen:                             │
│ Amplitude >> overall flow performance      │
│ en content-flow en content type            │
│ (Do analyses: overall flow performance     │
│  and content-flow and content type)        │
└────────────────────────────────────────────┘
                    │
        ┌───────────┴───────────┐
        ↓                       ↓
┌───────────────┐     ┌───────────────────────┐
│ Gynzyfication │     │ Analyse doen op       │
│ dashboard     │     │ business analytics    │
│               │     │ (gynzyfication        │
│               │     │  stappen) Metabase    │
└───────────────┘     └───────────────────────┘
                              │
                              ↓
                    ┌───────────────────┐
                    │ Analyse doen in   │
                    │ Amplitude         │
                    └───────────────────┘
```

---

## Systems Identified

| System | Used For |
|--------|----------|
| **Figma** | Flow design (Core system) |
| **Amplitude** | KPI definition, flow performance analysis |
| **Intercom** | Content creation, flow building, segments |
| **ChatGPT** | Writing text content |
| **Canvas / Google Drive** | Content assets |
| **Metabase** | Business analytics (Gynzyfication steps) |

---

## Pain Points Summary

| # | Pain Point (Dutch) | Translation | Stage |
|---|-------------------|-------------|-------|
| 1 | "We houden niet allemaal het overzicht" | No shared oversight | Goal Definition |
| 2 | "Het is individueel" | Work is siloed/individual | Goal Definition |
| 3 | "Handover moet beter" | Handover needs improvement | Goal Definition |
| 4 | "Prio bepalen" | Priority setting is unclear | Goal Definition |
| 5 | "Statisch lineair pad" | Flows are static, not dynamic | Design |
| 6 | "Veel handmatig werk" | Lots of manual work | Build |
| 7 | "Worden met geluk, angst of goed gaat" | Launches with luck/fear | Scale |
| 8 | "We weten niet wat doorslaggevend" | Don't know what's decisive | Analysis |
| 9 | "We doen geen analyse" | We don't do analysis | Analysis |

---

## Opportunities (for Prioritize step)

Based on pain points captured:

| Opportunity | Maps to Pain | Priority Layer |
|-------------|--------------|----------------|
| Shared visibility dashboard | #1, #2 | P0 |
| Behavior-based dynamic paths (not static linear) | #5 | P1 |
| Automation of manual flow building | #6 | P1/P2 |
| Pre-launch overlap/coverage check | #7 | P0 |
| Automated performance analysis | #8, #9 | P2 |
| Clear prioritization framework | #4 | Process |
| Better handover process | #3 | Process |

---

*Captured: Sprint Day 1, Jan 12 2026*
