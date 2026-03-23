# Prompt: Tech Scan Intake Preparation

*Copy this prompt into a new Claude session. Attach the input documents listed below. The prompt will produce a briefing, call script, and shareable agenda.*

---

## The Prompt

```
You are helping me prepare for a Tech Scan intake call with a new customer. A Tech Scan maps AI capabilities and readiness across a customer's application landscape — per tool, we assess what AI features are available, what's already activated, and where the most value sits. The deliverable is a concrete report with per-tool assessments and recommendations ranging from "activate now" to "explore later."

## Your role

You are my preparation partner. Your job is to:
1. Digest all provided documents and extract a structured understanding of the customer's IT landscape, organization, and innovation posture
2. Produce three documents (see Outputs below)
3. Apply lessons from previous Tech Scan engagements (provided as context)
4. Flag gaps — things we don't know yet that we need to learn in the intake call

## Context: How a Tech Scan works

**What we assess per application:**
- What AI/ML capabilities does the vendor offer (branded assistants, native features, API access)?
- What is currently activated/licensed?
- What is the adoption level?
- What quick wins exist (features included in license but not activated)?
- What requires additional licensing, configuration, or custom development?
- How does this tool integrate with the rest of the stack (data flows, APIs)?

**What we DON'T do:**
- We don't recommend new platforms or architecture overhauls
- We don't build custom AI solutions (we map what's possible within existing tools)
- We assess tools the customer already has, not tools they should buy

**The intake call's purpose:**
- Validate our understanding of their landscape
- Discover pain points and priorities we can't see from documents alone
- Agree on which applications are in scope (typically 8-12)
- Identify who we need to talk to for deeper dives
- Understand political dynamics, timing constraints, and no-go zones

## Inputs I'm providing

I will attach documents from the customer. These typically include some combination of:
- IT landscape document (application overview, architecture diagrams, integration maps)
- Organization charts or structure descriptions
- Innovation strategy or agenda documents
- Process descriptions or operating model visuals
- BU/division strategy summaries
- Interview notes from stakeholders
- Previous consultant reports (e.g., ERP implementation blueprints)
- Any other relevant materials

Please read ALL attached documents thoroughly before producing outputs.

## Outputs I need

### 1. Intake Preparation Briefing (`techscan-intake-briefing.md`)

A comprehensive internal document covering:

**Section 1 — IT Landscape:** What we know about their application stack. Organize by:
- Core ERP/hub system (usually AFAS, SAP, or similar)
- Operational/domain-specific systems (CAFM, scheduling, field service, etc.)
- Supporting applications (CRM, ATS, LMS, feedback tools, OCR, etc.)
- BI & data layer (data warehouse, reporting tools, consolidation)
- Infrastructure & IT management (cloud, on-prem, managed service parties)

For each system, note: what it does, how central it is, how it connects to other systems, and any AI relevance.

**Section 1b — Migration/transformation context (if applicable):** If the customer is mid- or post-migration (e.g., ERP consolidation), map the As Is → To Be, what's done, what's in flight, and what the implications are for our Tech Scan scope.

**Section 2 — Innovation agenda:** What do they already know/do/plan around AI and innovation? Include:
- Formal innovation structures (boards, processes, evaluation methods)
- Named AI initiatives or projects
- Self-assessment of their innovation maturity
- Budget/resource allocation for innovation

**Section 2b — Ground truth from interviews/BU strategies:** If we have interview notes or BU-level strategy docs, synthesize what they reveal that differs from or adds to the official landscape docs. Include:
- Landscape corrections (tools not in the official docs, tools being phased out)
- AI readiness spectrum across BUs/divisions (table format)
- Key people and their dynamics (who drives innovation, who gatekeeps, who's a wildcard)
- The real constraints (capacity, budget, political)

**Section 3 — Comparison with previous engagements:** If reference material from previous Tech Scans is available, map the key differences and similarities (table format). Focus on: core ERP, scheduling, field ops, CRM, BI, IT operations, custom tools, integration approach.

**Section 4 — Lessons from previous engagements:** What worked, what didn't, what to repeat, what to avoid. Translate generic lessons into specific actions for this customer.

**Section 5 — Investigation questions:** Split into:
- Must-know (can't scope the Tech Scan without these)
- Good to understand (shapes the report quality)

**Section 6 — Risk factors:** Political dynamics, timing issues, capacity constraints, scope risks.

Close with: *"Lead with curiosity, not with frameworks. The goal of the intake is to listen, not to present."*

### 2. Combined Call Script (`techscan-intake-call-script.md`)

This is TWO documents in one file, separated by a double horizontal rule:

**Part A — Shareable Dutch agenda (top of file):**
A clean, professional agenda the customer can share with participants. In Dutch. Include:
- Goal statement
- What documentation we've received and reviewed
- Brief description of Tech Scan approach
- Agenda table: block number, topic, time allocation, brief description
- Note on preparation (none needed, but helpful if app owners can join)

**Part B — Internal English call script (below divider):**
The detailed facilitation guide. NOT to be shared with the customer. Structure:

- **Before the call:** What to have open on screen
- **Block 1 — Opening (5 min):** Framing, expectations, tone-setting
- **Block 2 — Their story (15 min):** One big open question, then follow-up threads. Include a table of specific topics to steer toward if not mentioned naturally
- **Block 3 — AI awareness (10 min):** What they've already explored. Include conditional branches: "If they mention [X], ask [Y]." Cover their known AI initiatives without leading
- **Block 4 — No-go zones (10 min):** Migrations, contract changes, political sensitivities. Include a signal-interpretation table
- **Block 5 — Technical deep-dive (15 min):** Integration architecture, authentication, versions/licenses per app, migration status, particularities
- **Block 6 — Scope confirmation (5 min):** Mirror understanding back, propose scope, agree on follow-up access
- **Close (5 min):** Next steps, timeline, format
- **Post-call checklist:** What to capture immediately after

For each block, provide:
- A suggested transition phrase (in quotes)
- What to listen for
- Specific questions (not generic — tailored to THIS customer based on the documents)
- Internal notes on what we already know vs. what we need to discover

### 3. Dutch Internal Script (`techscan-intake-gespreksleidraad-NL.md`)

Full Dutch translation of Part B of the call script. Same structure, same level of detail, but entirely in Dutch. This is for if the call is conducted in Dutch.

## Style and tone

- Be direct and specific, not generic
- Use their own terminology when possible (system names, process names, organizational language)
- Flag uncertainty explicitly ("we think X but need to confirm")
- Don't pad with filler — every line should earn its place
- Tables over paragraphs when comparing or listing
- Suggested questions should sound natural in conversation, not like an audit checklist

## How to handle additional documents

I may provide additional documents after the initial set. When I do:
- Read them thoroughly
- Update all three output documents with the new intelligence
- Call out what changed and why it matters
- Don't just append — integrate the new information into the existing structure

## Reference material from previous engagements

[PASTE OR ATTACH PREVIOUS TECH SCAN REPORTS, LESSONS LEARNED, OR REFERENCE MATERIALS HERE]

If no reference material is provided, skip Sections 3 and 4 of the briefing and focus on the customer's own landscape.
```

---

## What to attach when using this prompt

**Minimum viable input (will produce a useful but incomplete prep):**
- IT landscape document or application overview

**Ideal input (produces comprehensive prep):**
- IT landscape document
- Organization structure / org chart
- Innovation strategy or agenda document
- BU or division strategy summaries (use the BU summary prompt below to generate these)
- Interview notes from key stakeholders
- Any consultant reports (ERP blueprints, architecture designs, etc.)
- Reference: previous Tech Scan report (e.g., Asito) for comparison

**Additional documents you can feed in later:**
- Anything else that surfaces during preparation
- The prompt handles iterative document additions — just upload and say "integrate this"

---

## Companion Prompt: BU Strategy Summary

*Use this in a separate session to summarize BU strategy documents before feeding them into the main prompt above.*

```
I need you to produce a structured summary of the following Business Unit strategy document for use in a Tech Scan preparation. The Tech Scan maps AI capabilities and readiness across the customer's application landscape.

Extract and organize the following:

1. **BU Profile:** Name, core activity, size (employees/revenue if mentioned), market position
2. **Current IT/Tool Landscape:** Any tools, systems, or platforms mentioned — especially those NOT in the central IT landscape (shadow IT, BU-specific tools, vendor platforms)
3. **AI/Innovation Initiatives:** Named projects, pilots, ideas, or ambitions related to AI, automation, or digital innovation. Note their status (idea, pilot, live, scaled)
4. **Pain Points & Priorities:** What the BU struggles with operationally. What they want to fix or improve. Where they lose time, money, or quality
5. **AI Readiness Assessment:** Based on the signals in the document, rate this BU's AI readiness on a spectrum: Unknown → Cautious → Exploratory → Focused → Ambitious → Advanced. Justify in one sentence
6. **Key People:** Anyone named with a role relevant to IT, innovation, or decision-making
7. **Implications for Tech Scan:** What should we specifically look at or ask about for this BU? Any tools to research? Any political dynamics to be aware of?

Format as a clean markdown document. Be specific — quote tool names, initiative names, and figures where available. Flag anything that contradicts or adds to what a central IT landscape document might show.
```

---

## Tips for best results

1. **Feed documents in batches, not all at once.** Start with the IT landscape doc, get the first draft, then add innovation docs, then interviews, then consultant reports. Each round sharpens the output.

2. **Correct as you go.** If something is wrong or outdated, say so. The prompt handles corrections well.

3. **Ask for the cliff notes before the call.** Once all docs are integrated, ask: "give me the cliff notes — what do I absolutely need to know and do before the call?" This forces a prioritized distillation.

4. **Request a Dutch script separately.** The main prompt produces the English script first. Then say: "now create a Dutch version of just the script part." This ensures the Dutch version benefits from the fully refined English version.

5. **The shareable agenda should be requested explicitly.** After the script is solid, say: "add a shareable Dutch agenda at the top with just bullet points — onderwerp and toelichting." Keep it clean for the customer.

6. **After the intake call:** Feed the call notes back in and ask for an updated briefing + a proposed Tech Scan scope document. This becomes the project kickoff.
