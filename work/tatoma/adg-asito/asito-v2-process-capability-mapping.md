# Asito: Process → Capability Mapping v2
## Pre-read for Jordi Alignment — Thursday 30 Jan 2026

---

## Context

After Monday's techscan with Albert Jan, we're recalibrating our approach. This document proposes a **complementary positioning** between Node1 and Tatoma for the Foundation Sprint (Feb 3).

**Goal of Thursday's call:** Align on this framing, get your input on gaps, and agree on how we present together.

---

## The Core Insight

We tackle opposite ends of the solution space:

| Node1 / Jordi | Tatoma |
|---------------|--------|
| Process architecture | Connected intelligence |
| "Which system handles what" | "What AI capability helps where" |
| System of Record focus | Handoff & friction focus |
| Long-term rationalization | Quick wins within current landscape |

**We're not competing — we're complementing.**

You own process & systems. We own intelligence augmentation at friction points.

---

## The Positioning for Albert Jan

What we learned Monday:
- "Connected intelligence layer" was heard as "one central AI platform" — not what we meant
- Generic domains confused rather than clarified
- He needs to see HIS world, not our framework

**The reframe:**

> "We're not proposing new boxes. We're adding intelligence to YOUR boxes, at the friction points in YOUR process model."

Or simply: **"Not a new layer — it's the glue between your existing systems."**

---

## Anchored on Your IT Architecture (Endstate)

We're working from your IT architecture diagram. These are the **endstate systems** we're mapping to:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         CORE SYSTEMS (Endstate)                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌──────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐  │
│   │ Dynamics │ ───▶ │   AFAS   │ ◀─── │  ORTEC   │ ◀─── │  Appreo  │  │
│   │   CRM    │      │  (Hub)   │ ───▶ │ Planning │      │  Clock   │  │
│   └──────────┘      └──────────┘      └──────────┘      └──────────┘  │
│        │                 │                                             │
│        ▼                 ▼                                             │
│   ┌──────────┐      ┌──────────┐      ┌──────────┐                    │
│   │   GRIP   │      │   ATS    │ ◀─── │Werken Bij│                    │
│   │ Projects │      │Recruiting│      │ Website  │                    │
│   └──────────┘      └──────────┘      └──────────┘                    │
│                          │                                             │
│                          ▼                                             │
│   ┌──────────┐      ┌──────────┐      ┌──────────┐                    │
│   │Dataplatform│    │  HelloID │      │  Totara  │                    │
│   │ Analytics │     │ Identity │      │   LMS    │                    │
│   └──────────┘      └──────────┘      └──────────┘                    │
│                                                                         │
├─────────────────────────────────────────────────────────────────────────┤
│  Being phased out: Flinker, Hubble, Credit manager, Jedox              │
│  ❓ Gaps: HubSpot? TOPdesk? Procure-to-Pay systems?                    │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Your Bedrijfsprocesmodel + AI Capabilities

```
PRIMAIR (Value Stream)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Lead-to-Order          Order-to-Service         Service-to-Cash
┌─────────────┐        ┌─────────────┐          ┌─────────────┐
│  Dynamics   │  ───▶  │   ORTEC     │   ───▶   │    AFAS     │
│  + GRIP     │        │   + AFAS    │          │  (Finance)  │
└──────┬──────┘        └──────┬──────┘          └──────┬──────┘
       │                      │                        │
       ⚡                     ⚡                       ⚡
   Copilot in            Guardrail in            Anomaly detection
   Dynamics CRM          ORTEC planning          in AFAS
                         ─────────────           ─────────────────
                         Contract constraints    1000+ mismatches/mo
                         not visible to planner  €100-200k leakage


ONDERSTEUNEND (Supporting)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Market-to-Lead         Hire-to-Retire           Oplossen & Verbeteren
┌─────────────┐        ┌─────────────┐          ┌─────────────┐
│ ❓ HubSpot? │        │ Werken Bij  │          │ ❓ TOPdesk? │
│  Dynamics?  │        │ → ATS → AFAS│          │             │
└──────┬──────┘        └──────┬──────┘          └──────┬──────┘
       │                      │                        │
       ⚡                     ⚡                       ⚡
   Lead scoring          Compliance checker      Incident triage
   (if system exists)    in ATS/AFAS flow       (if system exists)
                         ─────────────
                         Incomplete docs,
                         premature starts


                       Procure-to-Pay
                       ┌─────────────┐
                       │ ❓ GAP      │
                       │ (SAP Ariba  │
                       │  client-    │
                       │  specific?) │
                       └─────────────┘


BESTUREND (Controlling)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Record-to-Report
┌─────────────┐
│ Dataplatform│
│ + AFAS      │
└──────┬──────┘
       │
       ⚡
   Auto-reconciliation
   alerts


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ = Connected Intelligence "Spark" — capability INSIDE existing system
❓ = Gap / needs clarification from Jordi
```

---

## The Sparks: Friction → Capability (Detailed)

Based on Monday's conversation and your IT architecture:

| # | Process | Stage | Friction Point | Systems | Integration | AI Capability |
|---|---------|-------|----------------|---------|-------------|---------------|
| **1** | Order-to-Service | Assign | Contract constraints invisible to planner | ORTEC | AFAS → ORTEC (Voorcalculatieregels) | **Process guardrail** |
| **2** | Service-to-Cash | Reconcile | 1000+ hour mismatches/month | AFAS; ORTEC | ORTEC → AFAS (Nacalculatieregels) | **Anomaly detection + auto-triage** |
| **3** | Service-to-Cash | Invoice | €100-200k forgotten pass-throughs | AFAS | GRIP → AFAS (Facturen) | **Billing anomaly alert** |
| **4** | Hire-to-Retire | Onboard | Incomplete docs, staff starts prematurely | AFAS; ATS | ATS → AFAS (Nieuwe medewerkers) | **Compliance checker** |
| **5** | Hire-to-Retire | Mutate | BOMA not updated on changes | AFAS; ORTEC | AFAS → ORTEC (Ziek-/betetermeldingen) | **Event-triggered sync** |

### Quick Win Candidates

| Spark | Impact | Complexity | Recommendation |
|-------|--------|------------|----------------|
| #1 Guardrail | High (planner frustration) | Medium (Ortec integration) | ✅ Pilot candidate |
| #2 Hour reconciliation | Very High (€€€ + pain) | Medium (background agent) | ✅ Pilot candidate |
| #3 Pass-through alert | Very High (€100-200k/mo) | Low (AFAS rules) | ✅ Quick win |
| #4 Onboard compliance | Medium (risk reduction) | Low (workflow bot) | ✅ Quick win |
| #5 Mutation sync | Medium (operational) | Low (event trigger) | Later |

---

## Gaps & Open Questions

### Systems we're unsure about:

| Area | Question | Impact on mapping |
|------|----------|-------------------|
| **Market-to-Lead** | Is HubSpot part of endstate, or does everything go through Dynamics? | Affects where lead scoring lives |
| **Oplossen & Verbeteren** | Is TOPdesk the endstate service desk? Ebbot? | Affects incident triage capability |
| **Procure-to-Pay** | What's the standard system? SAP Ariba seems client-specific | May not be a friction point for us |
| **Credit Management** | Being phased out — what replaces it? | Affects collections capability |

### Process stages we're guessing on:

| Process | Stage | Our assumption | Validate? |
|---------|-------|----------------|-----------|
| Lead-to-Order | Calculate (m²) | Done in Dynamics + GRIP | ❓ |
| Order-to-Service | Execute | Appreo captures time → ORTEC | ❓ |
| Hire-to-Retire | Develop | Totara for training | ❓ |
| Record-to-Report | All | Dataplatform is the hub | ❓ |

### Integration points we need to confirm:

| Flow | What we think happens | Confirm? |
|------|----------------------|----------|
| ORTEC → AFAS | Nacalculatieregels + Verlofboekingen flow back | ❓ |
| Appreo → ORTEC | Kloktijden (clock times) feed planning | ❓ |
| ATS → AFAS | New hires auto-provisioned | ❓ |

---

## Quick Wins vs Architecture

This is where we complement each other:

```
                    YOUR LANE                    OUR LANE
                    ─────────                    ────────

FOCUS               IT landscape                 Friction points
                    rationalization              in current landscape

DELIVERABLE         Target architecture          Deployed capabilities
                    + roadmap                    + quick wins

APPROACH            "Phase out Hubble,           "While you rationalize,
                    consolidate on AFAS"         we fix the pain now"
```

**The pitch to Albert Jan:**
> "Jordi will help you rationalize your landscape over time. In the meantime, we deploy quick wins that work within your current systems — no architecture overhaul required."

---

## For Feb 3: Who Presents What?

**Proposal:**

| Segment | Who | Content |
|---------|-----|---------|
| Process overview | Jordi | "Here's how Asito's processes flow across the endstate systems" |
| Friction points | Joint | "Based on our conversations, these are the pain points" |
| Capability overlay | Israel/Maarten | "These sparks address the friction — here's how" |
| Quick win selection | Joint | "Which 1-2 do we pilot first?" |

---

## Questions for Thursday

### 1. Complementary positioning
- Does this split work for you?
- Are we stepping on each other's toes anywhere?

### 2. Systems validation
- Is HubSpot in the endstate or being replaced?
- TOPdesk for service desk — correct?
- What's the Procure-to-Pay story?

### 3. Friction points
- Which resonate most with what you've seen?
- Any we should add or drop?
- Any too political to surface on Feb 3?

### 4. Albert Jan strategy
- What's his real concern — budget, control, IT vs Innovation turf?
- Should we let him pick the first use case?
- What communication style works with him?

### 5. Feb 3 choreography
- Does the "who presents what" split work?
- How do we signal unity, not two vendors?

---

## Appendix: Full Process-Stage-System Mapping

See accompanying CSV: `asito-process-capability-mapping.csv`

| Category | Process | # Stages |
|----------|---------|----------|
| Primair | Lead-to-Order | 5 |
| Primair | Order-to-Service | 5 |
| Primair | Service-to-Cash | 4 |
| Ondersteunend | Market-to-Lead | 2 |
| Ondersteunend | Hire-to-Retire | 8 |
| Ondersteunend | Oplossen & Verbeteren | 2 |
| Besturend | Record-to-Report | 4 |

**Total: 30 process-stage combinations mapped**

---

## Appendix: Key Integration Flows (from IT Architecture)

| Source | Target | Data |
|--------|--------|------|
| Dynamics | GRIP | Klanten, Contactpersonen, Objecten |
| Dynamics | AFAS | Klanten, Contactpersonen, Debiteurennr |
| GRIP | AFAS | Projecten, Voorcalculatieregels, Facturen |
| AFAS | GRIP | Medewerkers, Referentiedata |
| AFAS | ORTEC | Medewerkers, Verlofsaldi, Ziek-/betetermeldingen, Projecten, Voorcalculatieregels |
| ORTEC | AFAS | Nacalculatieregels, Verlofboekingen |
| AFAS | Appreo | Medewerkers, Verlofsaldi, Ziek-/betetermeldingen, Projecten, Voorcalculatieregels |
| Appreo | AFAS | Nacalculatieregels (incl. bijlage), Verlofboekingen |
| Appreo | ORTEC | Kloktijden |
| Werken Bij | ATS | Sollicitaties |
| ATS | Werken Bij | Gepubliceerde vacatures |
| ATS | AFAS | Nieuwe medewerkers |
| AFAS | ATS | Medewerkers, Autorisaties, Kostenplaatsen, Objectnummers, Klantlocaties |

---

*Document prepared by Israel (Tatoma) — Jan 27, 2026*
*For alignment with Jordi (Node1) ahead of Asito Foundation Sprint (Feb 3)*
