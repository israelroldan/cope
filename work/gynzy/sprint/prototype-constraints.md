# Prototype Constraints Reference

> Date: 2026-01-12 (Sprint Day 1)
> Status: Confirmed constraints for prototype phase

---

## Summary

The primary technical constraint is that **Intercom's API does not support programmatic creation or modification of Series/flows** — meaning any prototype that aims to "auto-generate flows" must output designs or recommendations for humans to implement, not direct Intercom integration. However, the API *does* support tags, attributes, and events, which opens a path for AI-assisted user routing through the data layer rather than the flow layer.

Organizationally, the prototype must respect the **human-in-the-loop requirement** (AI suggests, human approves) and scale for a **3-person team** without adding headcount. The existing complexity of **210 flows (27 live)** means we can't assume a clean slate — any solution must work alongside or help consolidate what already exists. Real-time triggers are possible via GTM events, but user attributes sync daily via Census, creating a hybrid real-time/batch data environment.

---

## Technical Constraints

| Constraint | Impact | Source |
|------------|--------|--------|
| **Intercom API: No Series/flow creation** | Cannot programmatically create or modify flows | API research |
| **Intercom API: CAN do** tags, attributes, events, users | Prototype must work through data layer, not flow layer | API research |
| **Intercom block limits** | Flows hit max complexity; can't build infinitely branching flows | Process mapping |
| **No native overlap prevention** | Intercom doesn't stop users from being in multiple flows | Transcript insights |
| **Census syncs daily** | User/school attributes are not real-time (batch) | Maria's input |
| **Events ARE real-time** | Via GTM → Intercom; also in BigQuery via dbt | Data architecture |

---

## Organizational Constraints

| Constraint | Impact | Source |
|------------|--------|--------|
| **3-person marketing team** | No headcount increase; solution must scale without more people | Confirmed |
| **Human-in-the-loop required** | AI suggests, human approves — no full automation | Firm requirement |
| **Regional variants (NL vs Flanders)** | Content/flows need localization; doubles some work | Process mapping |

---

## Tool Stack Constraints

| Constraint | Impact | Source |
|------------|--------|--------|
| **Intercom stays** | No platform switch; must work within Intercom | Confirmed |
| **AI tools: OpenAI (contractual)** | Prototype should use OpenAI; Gemini/Claude available but OpenAI preferred | Maria's input |
| **Existing systems: Linear, Figma, Amplitude, Canva, Metabase** | Prototype should complement, not replace these | Process mapping |

---

## Data Constraints

| Constraint | Impact | Source |
|------------|--------|--------|
| **Data available in BigQuery** | Rich behavioral data exists; can be queried | Confirmed |
| **Data in Intercom is subset** | Only what Census syncs + events via GTM | Data architecture |
| **Student data is "association" not direct** | Usage levels (low/adequate/high) linked to license tiers | Session discussion |

---

## Process Constraints

| Constraint | Impact | Source |
|------------|--------|--------|
| **210 existing flows (27 live)** | Any solution must account for existing complexity | Transcript |
| **No current analysis loop** | "We doen geen analyse" — no feedback mechanism | Process mapping |
| **Flows rarely retired** | Accumulation problem; prototype can't assume clean slate | Inferred |

---

## Prototype Feasibility Matrix

### What We CAN Build

| Approach | Why It Works |
|----------|--------------|
| **AI-powered briefing generator** | No API needed; output is document |
| **Flow diagram generator** | No API needed; output is visual (mermaid) |
| **Tag suggestion assistant** | Tags ARE supported via API |
| **Overlap/coverage analyzer** | Read-only API operations work |
| **Segment recommendation engine** | Output is recommendations, human implements |
| **Content variant generator** | No API needed; output is text |

### What We CANNOT Build (Directly)

| Approach | Why It's Blocked |
|----------|------------------|
| Auto-create flows in Intercom | No API support |
| Auto-modify flow branching | No API support |
| Real-time flow triggers from BigQuery | Would need custom pipeline; Census is daily |
| Fully automated campaigns | Human-in-the-loop requirement |

### Gray Area (Possible with Workarounds)

| Approach | Workaround |
|----------|------------|
| "Smart" flow routing | Use tags to route users into existing flows |
| Real-time intervention | Use GTM events → Intercom (already works) |
| Dynamic content | Use Intercom's native personalization with better attributes |

---

---

## Big Opportunity: "Air Traffic Control"

### The Scaling Paradox

If Gynzy succeeds in creating more dynamic, behavior-based, personalized flows, they create a new problem: **message fatigue at scale**. More segments × more triggers × more content variants = more communications per user. Without coordination, personalization becomes spam.

### The Concept

An **"Air Traffic Control" layer** that sits above individual flows and manages:

| Function | What It Does |
|----------|--------------|
| **Frequency capping** | Max X messages per user per week, regardless of how many flows they qualify for |
| **Priority arbitration** | When user qualifies for multiple messages, decide which one wins |
| **Cooldown periods** | After a high-priority message, suppress lower-priority ones for N days |
| **Channel balancing** | Spread across email, in-app, push — don't hammer one channel |
| **Fatigue detection** | If user stops engaging, reduce frequency automatically |

### Why This Matters

```
TODAY (27 flows):
User might be in 2-3 flows → manageable

FUTURE (100+ dynamic segments):
User could qualify for 10+ flows → overwhelm risk

WITH AIR TRAFFIC CONTROL:
AI decides: "This user gets the re-engagement email,
suppress the feature tip and the NPS survey this week"
```

### Fits the Constraints

| Aspect | How It Works |
|--------|--------------|
| **No flow API needed** | Works at the tag/attribute layer — suppress via tags |
| **Human-in-the-loop** | Humans set rules (max frequency, priorities), AI enforces |
| **Scales for 3-person team** | Automates coordination they can't do manually |
| **Addresses overlap pain** | Directly solves "users in multiple flows" problem |

### Prototype Possibility

Could be as simple as:
1. AI analyzes which users are in multiple flows
2. Recommends which message should "win" this week
3. Human approves
4. System applies suppression tags

This is **P0-level valuable** — it prevents the success of personalization from becoming its own failure mode.

---

## Quick Reference

```
┌─────────────────────────────────────────────────────────────┐
│  PROTOTYPE CONSTRAINTS — QUICK REFERENCE                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  HARD BLOCKERS:                                             │
│  ✗ Cannot auto-create Intercom flows via API                │
│  ✗ Cannot auto-modify flow logic via API                    │
│  ✗ Cannot bypass human approval                             │
│                                                             │
│  SOFT CONSTRAINTS:                                          │
│  ~ Real-time user attributes (daily sync via Census)        │
│  ~ Must work with existing 210 flows                        │
│  ~ Must support NL + Flanders variants                      │
│                                                             │
│  ENABLERS:                                                  │
│  ✓ Can read/write tags, attributes, events via API          │
│  ✓ Events are real-time (GTM → Intercom)                    │
│  ✓ Rich data in BigQuery for analysis                       │
│  ✓ OpenAI available for AI features                         │
│  ✓ Team open to AI-assisted (not AI-replaced) workflows     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```
