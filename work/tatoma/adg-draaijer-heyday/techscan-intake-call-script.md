# Draaijer-Heyday Tech Scan — Intake Call

*Maandag 13:30 | ~60 minuten*

---

## Agenda (deelbaar met deelnemers)

**Doel:** Samen het applicatielandschap doorlopen zodat we de Tech Scan gericht en relevant kunnen uitvoeren — geen standaard checklist, maar afgestemd op jullie situatie.

**Ontvangen documentatie:** We hebben van Stefan het IT Landschap document (v2025.3, incl. applicatie- en BI-landschap, demarcatiematrix ML) en het basisprocesoverzicht voor de 20 administraties ontvangen en doorgenomen.

**Aanpak Tech Scan:** Per applicatie brengen we in kaart welke AI-mogelijkheden er al beschikbaar zijn (denk aan Jonas in AFAS, Copilot in M365, AI-features in Facilitor en de planning-tools), wat al geactiveerd is, en waar de meeste waarde zit. We richten ons op de huidige stack ná de AFAS-migratie — niet op uitgefaseerde systemen. Het resultaat is een concreet rapport met per tool een beoordeling en aanbevelingen — van "direct activeren" tot "later uitwerken."

| # | Onderwerp | Tijd | Toelichting |
|---|-----------|------|-------------|
| 1 | Opening & aanpak | 5 min | Korte introductie, werkwijze Tech Scan |
| 2 | Jullie operatie | 15 min | Hoe werkt het van klantcontract tot facturatie? Welke systemen, welke knelpunten? |
| 3 | AI-verkenning tot nu toe | 10 min | Wat hebben jullie al onderzocht of geactiveerd op het gebied van AI? |
| 4 | Aandachtspunten & no-go's | 10 min | Lopende migraties, contractwijzigingen, of gebieden die buiten scope moeten blijven |
| 5 | Technische verdieping | 15 min | Koppelingen, authenticatie, versies/licenties, bijzonderheden |
| 6 | Scope & vervolgstappen | 5 min | Welke applicaties nemen we mee, wie spreken we voor verdieping, planning |

**Voorbereiding:** Geen speciale voorbereiding nodig. Het helpt als de applicatie-eigenaren (AFAS, Facilitor, BI) beschikbaar zijn of kort kunnen aansluiten.

---
---

# Intern: Call Script & Gespreksleidraad

*Onderstaand is het interne script — niet delen met de klant.*

*Goal: Walk out with enough to scope and execute the Tech Scan*

---

## Before the call

Open their IT Landschap document on your screen. Use the **application landscape diagram** and **BI landscape diagram** as visual anchors — these are their own visuals, which signals that you've done your homework without imposing a foreign framework.

---

## BLOCK 1 — Opening & framing (5 min)

> "Thanks for making time. The purpose of today is simple: we want to understand your landscape well enough to do a meaningful Tech Scan — not a generic one. So the bulk of this call is us listening to you. We've reviewed the IT Landschap document and the process overview you shared, and we have some specific questions, but first we'd like to hear your perspective."

**Set expectations:**
- We'll ask about your systems, how they connect, and where you see friction
- We'll ask what you've already explored around AI — we don't want to duplicate work or tell you things you already know
- We'll ask about any areas that are off-limits or low priority right now — especially with the AFAS migration still settling
- At the end we'll confirm what we think the Tech Scan should cover

**NOTE:** We've now also reviewed the Node1 Phase 2 report (Target IT architectuur, July 2025). We understand the As Is → To Be migration. Don't lead with this — let them describe the current state in their own words, but use it to ask sharper follow-up questions.

---

## BLOCK 2 — Their story: the operational reality (15 min)

**The opening question — let them run with it:**

> "If you had to explain to someone new how a client engagement works end-to-end — from contract signing to monthly invoice — which systems get touched and in what order?"

**Listen for:** The natural flow through Facilitor, AFAS, scheduling tools, BI. Who touches what. Where handoffs happen. Where things break or slow down.

**Follow-up threads (only if they don't surface naturally):**

- "Where in that chain do people spend time on things that feel repetitive or low-value?"
- "Are there steps that are still manual that you wish weren't?"
- "Is the flow different for Hospitality vs. MultiLine, or is it essentially the same process with different tools?"

**Specific things to steer toward if not mentioned:**

| Topic | Why we need it | Prompt if needed |
|-------|---------------|-----------------|
| Facilitor's role | It's their CAFM backbone, 11 instances — we need to understand how central it is | "We noticed Facilitor appears in multiple configurations — single client, multi-client, centraal. How do those relate to each other?" |
| Ontrafelaar | Custom tool, likely hours reconciliation — could be a prime AI candidate | "We saw 'Ontrafelaar' in the landscape for Hospitality. Can you walk us through what that does?" |
| CWS | 3 custom instances for MultiLine — need to understand scope | "Same question for CWS on the MultiLine side — what does it handle?" |
| Scheduling fragmentation | Planbition vs. ShiftBase vs. PURE — is this intentional or legacy? | "You have three different planning/scheduling tools. Is that by design per service line, or is consolidation on the radar?" |

---

## BLOCK 3 — AI awareness & homework done (10 min)

**Transition:**

> "That's really helpful context. Now — before we go deeper on the tech side — we're curious: have you or your team already explored what AI capabilities exist in the tools you're using today?"

**Listen for:** Do they know about Jonas? Have they piloted Copilot? Has any vendor (AFAS, Facilitor, HubSpot) pitched them AI features? Is there internal enthusiasm or skepticism?

**IMPORTANT — We already know they have a 2026 innovation agenda.** They have named AI initiatives (AI offertetool, HR-agent Billy, Interim Matchmaker, Multiline Bonnie MCP, Digitale receptie, MJOB/MJOP AI, etc.) and a formal Innovatieboard with R-W-W evaluation criteria. This block is about gauging how far along those plans are and what the Tech Scan adds. Let them tell you — don't name the ideas first, but hook in when they mention them.

**If they mention their innovation agenda/board (likely):**
- "We understand you have an innovatieboard with ambassadors across the BUs. How far along are the 2026 AI ideas — still in the signal phase, or have some moved to pilots?"
- "Which of those ideas has the most urgency or directie backing?"
- "Has anyone mapped those ideas back to what your current tools can already do? Or is that exactly what you're expecting from the Tech Scan?"

**If they mention specific AI initiatives (Billy, Matchmaker, offertetool, etc.):**
- "How did that idea originate — from an operational pain point, or from a vendor pitch?"
- "Has there been a technical exploration — do you know if the existing tool can do this, or does it need to be built?"
- "Who owns this initiative within the organization?"

**If they mention Flowmatic / self-built AI agents:**
- "We understand there are already some agents built in Flowmatic — a service desk agent, Billie for invoicing, an intakes agent. Are those live with end users, or still in a testing/pilot phase?"
- "Who built those — and who maintains them? Is that one person's initiative or a team effort?"
- "How do those agents connect to your core systems — do they tap into AFAS or Facilitor data, or do they work more standalone?"
- "Is Flowmatic something you see scaling across BUs, or is it more of a sandbox for experimentation?"

**If they mention Jonas / AFAS AI:**
- "How far along is that? Active, piloting, or still exploring?"
- "Which AFAS modules are you most interested in applying it to?"
- "Any blockers — licensing, data quality, change management?"

**If they mention Copilot / M365 AI:**
- "Is Copilot rolled out broadly or to a select group?"
- "What are people actually using it for — summarizing meetings, drafting emails, something else?"
- "Any governance around it — who decides what data Copilot can access?"

**If they mention HubSpot / marketing tools:**
- "We understand HubSpot is being phased out in favor of WordPress + a new marketing automation tool. Has that replacement been chosen yet?"
- "Should we include marketing tool AI in the Tech Scan scope — as requirements for the new tool rather than assessment of HubSpot?"

**If they haven't explored much:**
- "That's completely fine — that's exactly what the Tech Scan is for. We'll map out what's available and what's worth activating."
- "The Tech Scan can feed directly into your R-W-W evaluation — for each idea, we can assess whether it's Real (feasible), Win (competitive advantage), and Worth (strategic fit)."

**If they express skepticism:**
- Don't push. Acknowledge it. "What would need to be true for AI to feel worthwhile to you?" This tells you what success criteria look like.

**Framing opportunity (use if the conversation allows):**
> "Our Tech Scan report can plug directly into your innovation process — it delivers the signal-phase input your innovatieboard needs to evaluate which AI capabilities are worth moving to the pilot phase."

---

## BLOCK 4 — No-go zones & timing constraints (10 min)

**Transition:**

> "Before we go further — are there areas in the landscape that we should explicitly stay away from? Things that are mid-migration, under contract renegotiation, or where a decision is pending that would make our analysis outdated?"

**Specific probes:**

- "Is anything being replaced or consolidated in the next 6-12 months?" *(Scheduling tools? CRM? BI platform?)*
- "Are there vendor contracts coming up for renewal where the outcome could change the landscape?" *(AFAS, Facilitor, COM4 managed services)*
- "Is there anything politically sensitive — areas where teams have strong ownership and wouldn't welcome external input?"
- "The document mentions COM4 handles operational IT. Are there boundaries we should respect in terms of what we assess vs. what falls in their domain?"

**What we're really mapping here:**

| Signal | What it means for scope |
|--------|------------------------|
| "We're migrating X to Y" | Exclude X from deep assessment, note Y as future state |
| "That's COM4's territory" | Assess the application, but frame infra recommendations carefully |
| "The scheduling situation is... complicated" | Tread carefully, probably political — assess tools individually, don't recommend consolidation |
| "We just signed a 3-year deal with Z" | Z is in scope and staying — focus on maximizing value from it |
| "Management wants us to look at [topic]" | This is the real brief — prioritize accordingly |

---

## BLOCK 5 — Technical deep-dive: integration, auth, versions (15 min)

**Transition:**

> "Great — now we need to get a bit more technical to make sure the Tech Scan is accurate. We have some specific questions about how your systems talk to each other and how access is managed."

### 5A — Integration & data flow

- "The landscape diagram shows interfaces between AFAS, Facilitor, and the other systems as API/XML/CSV. Is there a middleware layer orchestrating those, or are they point-to-point connections?"
- "Who builds and maintains the integrations — is that internal, COM4, or a third party?"
- "The BI layer shows a Data Warehouse on Azure with feeds from multiple sources. Is that a maintained, governed data platform, or more of a collection of pipelines?"
- "We saw 'isolated collection' marked separately in the BI diagram — what is that?"
- "How does data flow between Facilitor and AFAS specifically? Real-time sync, batch, manual?"

### 5B — Authentication & identity

- "Everything runs through Azure AD / Entra ID with SSO and MFA — is that true for all applications, or are there exceptions?"
- "Do Facilitor, Planbition, ShiftBase have their own identity management, or are they federated through Entra?"
- "Conditional access policies — are those applied uniformly or per-application?"
- "For field workers / hospitality staff without laptops — how do they authenticate? PocketApp? Shared devices?"

### 5C — Versions, licenses & adoption

Run through the key applications. For each, we need version/tier, license model, and actual adoption level.

| Application | What to ask |
|-------------|------------|
| **AFAS** | "Which Profit version? E3/E5 equivalent? Is Jonas included in your licensing? How many active users across the 20 administrations?" |
| **M365** | "E3 or E5 across the board? Copilot licenses — do you have any? How many?" |
| **HubSpot** | "We understand HubSpot is being phased out — is that confirmed? If so, what's replacing it and when? Should we still include it, or focus AI recommendations on the replacement criteria?" |
| **Facilitor** | "Which version? SaaS or on-prem? Is there an AI or automation roadmap from the vendor?" |
| **Planbition** | "Current version? Any AI/optimization features available?" |
| **ShiftBase** | "Same — version and AI capabilities?" |
| **Recruitee** | "Which plan? Using any AI features for screening or matching?" |
| **StudyTube** | "Using AI-generated learning paths or content recommendations?" |
| **PowerBI / Tagetik** | "PowerBI Pro or Premium? Fabric? Tagetik — cloud or on-prem? Any AI/ML models in the BI layer?" |
| **Whitevision** | "What's the scope — invoice scanning only, or broader document processing? Any AI/ML in the recognition engine?" |

### 5D — AFAS migration status

We know from the Node1 report what was planned. Now we need to understand the actual current state.

- "The Node1 report mapped a big migration — Exact, Dynamics, Visma|Raet, BIS all moving to AFAS. How is that landing? What's fully live, what's still in flight?"
- "We understand BIS at Consultancy and Dynamics Sales are being phased out in the coming weeks. Is there anything else still in transition?"
- "How is data quality after the migration? Any integration points that are still rough — especially Facilitor ↔ AFAS and the custom interfaces?"
- "The report identified 27 items of custom development. How far along are those? Which ones are blocking or consuming capacity?"
- "Is Node1 still involved in Phase 3 implementation, or has that transitioned to internal/COM4?"

### 5E — Particularities

- "Anything unusual about your setup that wouldn't be obvious from the documentation? Legacy systems still running? Shadow IT? Tools that aren't in the landscape diagram but people depend on?"
- "Any compliance or data residency requirements we should be aware of — especially around the Azure environment and data warehouse?"
- "The backup architecture uses physical tapes with offsite storage. Is that a compliance requirement, or legacy? Is there appetite to modernize that?"

---

## BLOCK 6 — Gap confirmation & scope agreement (5 min)

**Transition:**

> "Based on what you've shared and what we've seen in the documentation, here's what we think we understand — and where we still have gaps."

**Present your understanding, ask them to correct it:**

> "Since the AFAS migration, the picture is clear: AFAS is the hub — CRM, Finance, HR, Operations all in one environment with 9 werkgevers and 23 administraties. Facilitor is the operational backbone for Integrated service delivery. You have division-specific scheduling tools — Planbition for Hospitality, ShiftBase for MultiLine, PURE cross-service. The BI layer on Azure with PowerBI and Tagetik stays, fed from the new AFAS data. COM4 manages day-to-day IT ops, you retain strategic direction. Multiline operates somewhat independently with Genesys, Salesforce, and CWS alongside AFAS. Does that sound right, or are we off on any of that?"

**Then confirm scope:**

> "For the Tech Scan, we're proposing to focus on the current stack — not the retired systems. In depth: AFAS (incl. Jonas — across CRM, HR, Finance, Operations, InSite/OutSite), M365 (incl. Copilot), and Facilitor. Medium depth: the scheduling tools (Planbition + ShiftBase), the BI stack (PowerBI/Tagetik/Data Warehouse), and Whitevision. Lighter touch: Recruitee, StudyTube, InSocial, PURE. We'd skip Exact, Dynamics, Visma|Raet, BIS since those are gone or going. And for Multiline-specific tools like Genesys and Salesforce — do you want those in scope too, or keep it to the group stack? Same question for Flowmatic and the AI agents being built there. Does that feel right?"

**Agree on follow-up access:**

- "Who should we talk to for deeper dives on specific applications?" *(Application owners, power users)*
- "Can we get access to — or a walkthrough of — the admin consoles for AFAS, Facilitor, and M365?" *(License details, feature activation status)*
- "Is there a more detailed integration/interface document beyond what's in the IT Landschap?"

---

## Close (5 min)

- Confirm next steps and timeline
- Agree on who receives the Tech Scan report and in what format
- Ask: "Is there anything we didn't ask about that you think we should know?"

---

## Post-call checklist

After the call, immediately capture:

- [ ] Confirmed application scope (in/out)
- [ ] No-go zones and timing constraints
- [ ] AI homework already done (per application)
- [ ] Integration architecture (middleware or point-to-point)
- [ ] Auth model per application (SSO/federated or standalone)
- [ ] Version/license tier per application
- [ ] Key contacts for deep-dive interviews
- [ ] Any surprises or "particularities" flagged
- [ ] Political dynamics observed (IT vs. management, COM4 relationship)
- [ ] Their language for processes (adopt it in the report)
