# Crowe Foederer x Tatoma — Claude & Copilot Studio Workshop
## Tuesday, April 14, 2026 | 12:30 – 17:00

---

## Session Narrative

**Part 1 — "Welcome to Claude land":** We show how we work at Tatoma, using Claude on two of Crowe's real M&A use cases. This sets the bar for what great AI-assisted advisory work looks like — the speed, the quality, the depth of analysis. We do this because we love Claude and because its skills, tooling, and patterns make work like this a breeze.

**Transition — "From our world to yours":** We bridge the gap. The concepts, patterns, and workflows we demonstrated in Claude? Those same ideas can be implemented in Crowe's Microsoft ecosystem using Copilot Studio. Different tool, same ambition.

**Part 2 — "Let's build it in your stack":** We switch to Copilot Studio and start prototyping. We take the remaining use cases and build live — exploring what's possible, where the gaps are, and what a production-ready solution would look like.

---

## Agenda Overview

| Time | Duration | Item |
|------|----------|------|
| 12:30 – 13:00 | 30 min | 🎓 **Welcome & "Why Claude"** |
| 13:00 – 13:35 | 35 min | 🟣 **UC1: IM Review** — Claude live demo |
| 13:35 – 14:00 | 25 min | 🟣 **UC2: Biedingsbrief vs. Term Sheet** — Claude live demo |
| 14:00 – 14:15 | 15 min | ☕ Coffee break |
| 14:15 – 14:35 | 20 min | 🔀 **Transition: From Claude to Copilot Studio** |
| 14:35 – 15:15 | 40 min | 🔵 **UC3: Cijferopstelling** — Copilot Studio prototyping |
| 15:15 – 15:45 | 30 min | 🍽️ Pause |
| 15:45 – 16:15 | 30 min | 🔵 **UC4+5: Waarderingsmodel & Teaser** — Copilot Studio exploration |
| 16:15 – 16:30 | 15 min | ☕ Coffee break |
| 16:30 – 16:50 | 20 min | 🔵 **UC6: Auditfiles** — Architecture & approach |
| 16:50 – 17:00 | 10 min | 🏁 **Wrap-up & next steps** |

🟣 = Claude  |  🔵 = Copilot Studio  |  🔀 = Transition

---

## Part 1: Claude Land (12:30 – 14:00)

### 12:30 – 13:00 | Welcome & "Why Claude" (30 min)

**Purpose:** Set the stage. Introduce Claude, explain why Tatoma chose it as our platform, and give Bram and Marieke a mental model for what AI-assisted M&A work can look like.

**Suggested content:**

1. **Introductions & agenda** (5 min)
   - Who's who, what we'll cover, how the afternoon is structured
   - "Two parts: first we show you our world, then we build in yours"

2. **What is Claude and why do we love it** (10 min)
   - Anthropic's AI — designed for thoughtful, nuanced reasoning
   - Key strengths for advisory work: long context window (reads entire documents), strong structured reasoning, multilingual (Dutch works great), domain expertise
   - How we use it at Tatoma: the daily workflow, the tools, the ecosystem
   - Quick tour of the interface (Cowork / claude.ai)

3. **The patterns that matter** (10 min)
   - Document analysis: upload → analyze → structured output
   - Template filling: source data + template → populated deliverable
   - Cross-document comparison: find discrepancies, flag risks
   - Data extraction: unstructured → structured (PDF/XML → Excel)
   - "These patterns are universal — they work in Claude, and they work in Copilot Studio too"

4. **What we'll demo** (5 min)
   - Two live demos with Crowe's actual data
   - Then we switch to Copilot Studio for the rest
   - Everyone gets hands-on throughout

### 13:00 – 13:35 | 🟣 UC1: IM Review — Buyer's Perspective (35 min)

**File:** `2025 IM - Project Faraday.pdf` (33 pages)

| Phase | Time | Activity |
|-------|------|----------|
| Demo | 8 min | Upload the IM, ask Claude for a buyer's perspective review |
| Hands-on | 12 min | Bram/Marieke try their own prompts — drill into normalizations, risks, financials |
| Discussion | 15 min | How does this compare to current process? What's the time savings? What would you change? |

**Why this demo matters:**
- Shows Claude reading and analyzing 33 pages in under 2 minutes
- Demonstrates quality of reasoning — risk identification, normalization assessment, buyer questions
- The kind of output that takes a consultant hours, done in minutes
- Sets the benchmark for what Copilot Studio should aim to deliver

### 13:35 – 14:00 | 🟣 UC2: Biedingsbrief vs. Term Sheet (25 min)

**Files:** `Getekende NBO Van Grunsven.pdf` + `Getekende Term Sheet Van Grunsven.pdf`

| Phase | Time | Activity |
|-------|------|----------|
| Demo | 7 min | Upload both documents, ask Claude to find discrepancies |
| Hands-on | 8 min | Explore findings — which party does each discrepancy favor? |
| Discussion | 10 min | Accuracy check — did Claude catch everything? What would you add? |

**Why this demo matters:**
- Concrete, verifiable findings (EUR 150K earn-out gap, management fee mismatch)
- Shows the cross-document comparison pattern in action
- Immediately recognizable value for M&A professionals

---

### 14:00 – 14:15 | ☕ Coffee Break (15 min)

---

## Transition: From Claude to Copilot Studio (14:15 – 14:35)

### 14:15 – 14:35 | 🔀 Bridging the Two Worlds (20 min)

**Purpose:** Connect what they just saw in Claude to what's possible in their Microsoft ecosystem. Make the mental shift from "watching a demo" to "building our own solution."

**Suggested content:**

1. **The patterns are the same** (5 min)
   - What Claude just did = document analysis + reasoning + structured output
   - These patterns translate to Copilot Studio: agents, flows, connectors, AI Builder
   - "The AI model behind it may differ, but the workflow design is the same"

2. **Quick Copilot Studio orientation** (10 min)
   - What Copilot Studio can do: custom agents, AI-powered flows, document processing
   - Key building blocks: topics, actions, connectors, generative AI nodes
   - How it connects to SharePoint, Teams, Power Automate, Dataverse
   - What's strong, what's still maturing

3. **The plan for the rest of the afternoon** (5 min)
   - We'll take the remaining 4 use cases and explore them in Copilot Studio
   - UC3 (cijferopstelling): we'll prototype this live
   - UC4+5 (waarderingsmodel + teaser): we'll explore the approach and build what we can
   - UC6 (auditfiles): we'll architect the solution together
   - "Let's see how far we get — building live means we'll learn together"

---

## Part 2: Copilot Studio (14:35 – 17:00)

### 14:35 – 15:15 | 🔵 UC3: Cijferopstelling — Live Prototyping (40 min)

**Files:** `Template cijferopstellingIM.xlsx` + annual reports (KleurRijker BV 2023–2025)

**This is the first Copilot Studio use case — give it the most time for live building.**

| Phase | Time | Activity |
|-------|------|----------|
| Architecture | 8 min | Map out the flow: PDF upload → data extraction → template mapping → Excel output |
| Build | 20 min | Start building in Copilot Studio — create an agent/flow that processes an annual report |
| Test & discuss | 12 min | Run it with real data, see what works, discuss gaps and next steps |

**Key questions to explore:**
- How does Copilot Studio handle PDF text extraction?
- Can AI Builder parse Dutch financial statements accurately?
- How do we map extracted data to the specific Excel template structure?
- What's the right trigger: manual upload, SharePoint folder, Teams message?

**Realistic expectation:** We probably won't get a fully working end-to-end flow in 20 minutes, but we can build the core logic and demonstrate the approach. The goal is to prove feasibility and identify the gaps.

---

### 15:15 – 15:45 | 🍽️ Pause (30 min)

---

### 15:45 – 16:15 | 🔵 UC4+5: Waarderingsmodel & Teaser — Exploration (30 min)

**Files:** `DCF model.xlsx` / `2026 ValuePlan.xlsm` + `Teaser - Project X (template NL).pptx` + IM

**These two are grouped because they share the same core pattern: source data → fill template. We explore the approach rather than fully prototyping both.**

| Phase | Time | Activity |
|-------|------|----------|
| UC4 architecture | 10 min | How would a Copilot Studio agent fill a valuation model? Discuss the DCF (simple) vs. ValuePlan (complex). What's realistic? |
| UC5 prototype | 12 min | Build on what we learned from UC3: create a flow that extracts IM content and populates a PPTX teaser |
| Discussion | 8 min | Compare complexity: which of these is worth automating first? |

**Key questions to explore:**
- Can Copilot Studio work with complex Excel models (17 sheets, formulas)?
- How does PPTX generation work in Power Automate / Copilot Studio?
- Is the teaser (3 simple slides) a better "quick win" than the valuation model?

---

### 16:15 – 16:30 | ☕ Coffee Break (15 min)

---

### 16:30 – 16:50 | 🔵 UC6: Auditfiles — Architecture & Approach (20 min)

**Files:** 4 XAF audit files (2022–2025, 63–88 MB each)

**This is the most technical use case. Rather than live-building, we architect the solution together.**

| Phase | Time | Activity |
|-------|------|----------|
| Challenge | 5 min | Show the data: 88 MB XML files, 99K GL lines — too large for any AI to process raw |
| Architecture | 10 min | Design the preprocessing pipeline: XAF → parse → filter → summarize → feed to AI for analysis |
| Discussion | 5 min | Where does this run? Power Automate? Azure Function? Custom connector? What's the right approach for Crowe's stack? |

**Key questions to explore:**
- Where in Crowe's infrastructure would the XML preprocessing live?
- Can Azure AI Document Intelligence handle XAF files, or do we need custom parsing?
- How would the output integrate with their existing due diligence workflow?
- Is this a Copilot Studio agent, a Power Automate flow, or a custom app?

### 16:50 – 17:00 | 🏁 Wrap-up & Next Steps (10 min)

- **Recap the afternoon:** What did we learn? What surprised us?
- **Claude takeaways:** The quality bar is set — this is what great AI-assisted M&A work looks like
- **Copilot Studio takeaways:** What's ready to build now, what needs more exploration, what's a longer-term investment
- **Priority ranking:** Which use case should become the first pilot project?
- **Next steps:** Timeline, who does what, follow-up session?
- **The big picture:** Today's 6 use cases are just the start — the compound workflow (audit files → cijferopstelling → valuation → IM → teaser) is where the real transformation happens

---

## Session Design Notes

**Narrative arc:**
- "Here's the gold standard" (Claude demos) → "Now let's build it in your world" (Copilot Studio) → "What do we ship first?" (next steps)

**Energy management:**
- Block 1 is high-energy: impressive demos, hands-on, "wow" moments
- The transition sets expectations: "we're switching from watching to building"
- Block 2 is collaborative: we're figuring things out together, building live, learning as we go
- End on a forward-looking note: priorities, timeline, vision

**Flexibility:**
- If the Claude demos run long because the discussion is rich — that's fine, compress UC4+5
- If Copilot Studio prototyping hits friction — that's expected and valuable learning; pivot to architecture discussion
- UC4+5 are grouped and compressible; UC6 is already framed as architecture rather than build

**What "success" looks like:**
- Bram and Marieke leave with a clear sense of what AI can do for their M&A workflow
- They've seen it work on their own data (Claude demos)
- They've seen it start to take shape in their own stack (Copilot Studio)
- There's a concrete next step: which use case becomes the pilot

---

## Prep Checklist

### Claude prep (Tatoma)
- [ ] Pre-test UC1 (IM review) end-to-end — nail the prompts
- [ ] Pre-test UC2 (discrepancy check) end-to-end — verify all findings
- [ ] Prepare backup prompts and talking points for both demos
- [ ] Set up the demo environment

### Copilot Studio prep (Tatoma + Crowe)
- [ ] Ensure Copilot Studio access is ready (whose tenant? whose licenses?)
- [ ] Verify AI Builder / document processing capabilities in their tenant
- [ ] Prepare a basic agent/flow skeleton for UC3 to speed up live building
- [ ] Test PDF processing and Excel output in Copilot Studio/Power Automate beforehand
- [ ] Have the case files accessible in SharePoint or OneDrive for the Copilot Studio demos

### General
- [ ] Prepare slides or talking points for the intro (12:30) and transition (14:15)
- [ ] Print or share the agenda with Bram and Marieke in advance
- [ ] Set up screen sharing / projection for the session
- [ ] Have both Claude and Copilot Studio open and ready to go
