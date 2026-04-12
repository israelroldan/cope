# Workshop Content Generation Prompts

Each prompt below is designed to be run as a standalone task (e.g., with a subagent). For each one, provide:
1. **CONTEXT.md** — the workshop context document
2. **The relevant use-case markdown file** (where applicable)
3. **The prompt below**

The output for each should be saved in an `outputs/` subfolder.

---

## Prompt 1: Welcome & "Why Claude" — Talking Points

**Attach:** `CONTEXT.md`
**Output:** `outputs/01-welcome-talking-points.md`

```
You are helping prepare a workshop where Tatoma (an AI consultancy) is presenting to Crowe Foederer (a Dutch accounting/advisory firm specializing in M&A).

Read the attached CONTEXT.md for full background.

Write the talking points for the opening 30-minute segment: "Welcome & Why Claude" (12:30–13:00). This is not a slide deck — it's a structured speaker guide that Israel or Sander can use to present naturally.

Structure it as follows:

1. **Introductions & agenda** (5 min)
   - Suggested opening lines
   - How to frame the two-part structure: "First our world, then yours"
   - Set expectations: interactive, hands-on, not a lecture

2. **What is Claude and why do we love it** (10 min)
   - Explain Claude in terms an M&A consultant would care about (not tech jargon)
   - Key capabilities: reading long documents, reasoning about financials, multilingual (Dutch), structured output
   - How Tatoma uses it day-to-day — make it real and relatable
   - Quick comparison with generic AI assistants: why Claude is different for knowledge work

3. **The patterns that matter** (10 min)
   - Document analysis: upload → analyze → structured insight
   - Template filling: source data + template → populated deliverable
   - Cross-document comparison: find discrepancies, flag risks
   - Data extraction: unstructured → structured (PDF/XML → Excel)
   - Frame these as universal patterns: "These work in Claude AND in Copilot Studio"

4. **What we'll do today** (5 min)
   - Two live Claude demos with their real data
   - Then switch to Copilot Studio for the remaining use cases
   - Everyone gets hands-on

Keep the tone warm, confident, and conversational. These are talking points, not a script — bullet points with key phrases, not full sentences to read aloud. Include suggested transitions between sections.
```

---

## Prompt 2: UC1 Demo Script — IM Review

**Attach:** `CONTEXT.md` + `use-case-1-im-review.md`
**Output:** `outputs/02-uc1-demo-script.md`

```
You are helping prepare a live demo for a workshop. Read the attached CONTEXT.md and use-case-1-im-review.md for full background.

Create a demo script for UC1: IM Review (buyer's perspective). This will be performed live with Claude analyzing the "2025 IM - Project Faraday.pdf" (33 pages, Dutch).

The script should include:

1. **Setup narration** (what to say while uploading the file)
   - Brief context: "This is a real Information Memorandum for a company called KleurRijker..."
   - What we're about to ask Claude to do

2. **The primary prompt** (exact text to type/paste into Claude)
   - Should ask Claude to review the IM from a potential buyer's perspective
   - Should request: key risks, areas of concern, due diligence questions, assessment of the 8 normalization adjustments
   - Write this in Dutch since the document is Dutch (but note an English alternative too)

3. **Expected output highlights** (what to point out while Claude is generating)
   - Key findings to look for: customer concentration, key-man risk, normalization scrutiny
   - Financial observations: revenue trends, EBITDA margins, forecast reasonableness

4. **Follow-up prompts for the hands-on phase** (3-4 options)
   - A prompt drilling into normalization adjustments
   - A prompt asking about the biggest risk
   - A prompt requesting a structured due diligence question list
   - A prompt asking Claude to critique the financial projections

5. **Discussion questions** to transition to the group conversation
   - "How does this compare to what a junior analyst would produce?"
   - "What would you add or change?"
   - "How long would this normally take?"

Keep the narration natural and confident. Mark clearly what's spoken vs. what's typed into Claude.
```

---

## Prompt 3: UC2 Demo Script — Biedingsbrief vs. Term Sheet

**Attach:** `CONTEXT.md` + `use-case-2-biedingsbrief-termsheet.md`
**Output:** `outputs/03-uc2-demo-script.md`

```
You are helping prepare a live demo for a workshop. Read the attached CONTEXT.md and use-case-2-biedingsbrief-termsheet.md for full background.

Create a demo script for UC2: Biedingsbrief vs. Term Sheet discrepancy check. This will be performed live with Claude comparing two signed Dutch M&A documents.

The script should include:

1. **Setup narration** (what to say while uploading both files)
   - Context: "These are real signed documents — a Non-Binding Offer and a Term Sheet for the same deal, dated one month apart"
   - What we're asking Claude to do

2. **The primary prompt** (exact text to type/paste into Claude)
   - Ask Claude to compare the NBO and Term Sheet, identify all discrepancies, contradictions, and terms in one but absent from the other
   - Write in Dutch (with English alternative)

3. **Expected findings to highlight** (what to point out as Claude generates)
   - EUR 150K earn-out gap (4.15M vs 4.0M)
   - EUR 30K management fee mismatch (230K vs 260K)
   - Working capital treatment conflict
   - Warranty framework added in Term Sheet but absent from NBO
   - Non-compete clause added

4. **Follow-up prompts for hands-on phase** (2-3 options)
   - "Which of these discrepancies favors the buyer vs. the seller?"
   - "Which discrepancies are likely intentional refinements vs. actual conflicts?"
   - "Summarize this as a one-page memo for the deal team"

5. **Transition to coffee break**
   - Recap what they just saw: qualitative analysis + cross-document comparison
   - Tease what's coming: "After the break, we switch to your world — Copilot Studio"

Keep the script tight — this demo is 25 minutes including hands-on and discussion.
```

---

## Prompt 4: Transition Segment — Claude to Copilot Studio

**Attach:** `CONTEXT.md`
**Output:** `outputs/04-transition-talking-points.md`

```
You are helping prepare a 20-minute transition segment for a workshop. Read the attached CONTEXT.md for background.

The audience (Crowe Foederer — M&A consultants) just watched two impressive live demos in Claude. Now we need to bridge to Copilot Studio, which is the platform they'll actually use. This is a delicate moment — we need to energize them about building in their own stack without making it feel like a downgrade.

Write talking points for the transition segment (14:15–14:35):

1. **"The patterns are the same"** (5 min)
   - Recap the two patterns they just saw: document analysis + cross-document comparison
   - Explain that these patterns are platform-agnostic: prompt + document + reasoning = insight
   - The quality depends on prompt engineering, workflow design, and the right data — not just which AI model you use
   - "What Claude just did, we can architect in Copilot Studio"

2. **Quick Copilot Studio orientation** (10 min)
   - What Copilot Studio is: Microsoft's platform for building custom AI agents and workflows
   - Key building blocks relevant to what they just saw:
     - Custom agents (like having a specialized Claude but inside Teams/SharePoint)
     - AI Builder for document processing (PDF extraction, form recognition)
     - Power Automate for workflow orchestration
     - Connectors to SharePoint, Dataverse, Teams
   - What's strong in Copilot Studio vs. what's still maturing (be honest)
   - How it fits into their existing Microsoft 365 ecosystem

3. **The plan for the rest of the afternoon** (5 min)
   - UC3: live prototyping (the main build)
   - UC4+5: exploration and approach design
   - UC6: architecture discussion
   - "We're building together — if we hit walls, that's valuable learning"

The tone should be: honest, pragmatic, excited about possibilities but realistic about effort. Don't oversell Copilot Studio and don't undersell it either. The audience knows Microsoft — they need to see HOW these patterns translate, not be convinced that they can.
```

---

## Prompt 5: UC3 Build Guide — Cijferopstelling in Copilot Studio

**Attach:** `CONTEXT.md` + `use-case-3-cijferopstelling.md`
**Output:** `outputs/05-uc3-build-guide.md`

```
You are helping prepare a live prototyping session in Microsoft Copilot Studio. Read the attached CONTEXT.md and use-case-3-cijferopstelling.md for full background.

This is the main "build" segment of the workshop (40 minutes). We'll create an agent or flow in Copilot Studio that processes a Dutch annual report PDF and extracts financial data into an Excel template.

Create a build guide that includes:

1. **Architecture overview** (what we're building)
   - Input: PDF annual report (Dutch, RJ format, text-based)
   - Process: extract financial figures, map to template structure
   - Output: populated Excel template (P&L + balance sheet)
   - Draw out the flow: trigger → document processing → AI extraction → Excel mapping → output

2. **Step-by-step build plan** (what to do in the 20-minute build window)
   - What to pre-prepare before the session vs. what to build live
   - Recommended approach: Copilot Studio agent with AI Builder document processing? Or Power Automate flow with AI Builder? Or a custom GPT-style agent?
   - Step 1: Create the agent/flow
   - Step 2: Configure document input (PDF upload)
   - Step 3: Add AI extraction node with a prompt that maps Dutch financial line items to the template structure
   - Step 4: Configure Excel output
   - What to skip/simplify to stay within 20 minutes

3. **The extraction prompt** (the core AI instruction)
   - Write a detailed prompt that tells the AI: "Given this Dutch annual report, extract the following fields: [list from the template]. Return as structured JSON."
   - Include the specific Dutch financial terms from the template (netto-omzet, brutowinst, personeelskosten, etc.)

4. **What to show and discuss during the test phase** (12 min)
   - Run it with one annual report
   - Compare output to what Claude produced in UC1
   - Discuss accuracy, gaps, and what would need human review

5. **Fallback plan**
   - If the build hits technical issues, what's the graceful pivot?
   - Options: show a pre-built version, switch to whiteboard architecture, discuss what we learned

Be specific about Copilot Studio UI steps where possible. This guide should be usable by someone who knows Copilot Studio but hasn't built this specific flow before.
```

---

## Prompt 6: UC4+5 Exploration Notes — Waarderingsmodel & Teaser

**Attach:** `CONTEXT.md` + `use-case-4-waarderingsmodel.md` + `use-case-5-teaser.md`
**Output:** `outputs/06-uc4-5-exploration-notes.md`

```
You are helping prepare a 30-minute exploration segment for a workshop. Read the attached CONTEXT.md, use-case-4-waarderingsmodel.md, and use-case-5-teaser.md for background.

These two use cases are grouped because they share the same core pattern (source data → fill template) and we have 30 minutes total — not enough to fully prototype both, but enough to explore approaches and build one if time allows.

Create exploration notes that include:

1. **UC4: Waarderingsmodel — Architecture discussion** (10 min)
   - How would a Copilot Studio agent fill a DCF model? Walk through the approach.
   - The DCF model (2 sheets) vs. the ValuePlan (17 sheets) — which is realistic to automate?
   - Key challenge: WACC parameters require human judgment. How do you build an agent that asks the right questions?
   - Honest assessment: what works, what's hard, what's a future phase

2. **UC5: Teaser — Quick prototype** (12 min)
   - The teaser is only 3 slides — this is the better candidate for a quick build
   - Approach: agent reads the IM (already analyzed in UC1), extracts teaser-relevant content, populates a PPTX
   - How does PPTX generation work in Power Automate / Copilot Studio? (document templates, merge fields, etc.)
   - What can be automated vs. what needs manual polish (the 70/30 split)

3. **Discussion: Which is the better first project?** (8 min)
   - Compare effort vs. value for UC4 and UC5
   - The teaser is simpler but lower impact; the valuation model is complex but high-value
   - Prompt questions for the group: "Which of these would save you the most time? Which would your team adopt fastest?"

Keep it practical. Include specific Copilot Studio features to reference during the discussion. Flag where Copilot Studio has known limitations vs. where it should work well.
```

---

## Prompt 7: UC6 Architecture Document — Auditfiles

**Attach:** `CONTEXT.md` + `use-case-6-auditfiles.md`
**Output:** `outputs/07-uc6-architecture.md`

```
You are helping prepare a 20-minute architecture discussion for a workshop. Read the attached CONTEXT.md and use-case-6-auditfiles.md for background.

This is the most technical use case. The audit files are 63–88 MB XML files (Dutch XAF 3.2 format from Exact Online) with 67K–99K general ledger lines per year. They're too large for any AI to process directly. The goal is to architect a solution that preprocesses these files and feeds filtered, relevant data to an AI for M&A due diligence analysis.

Create an architecture document that includes:

1. **The challenge** (5 min — what to present)
   - Show the scale: 4 files, 63–88 MB, ~99K GL lines per year
   - Why direct upload doesn't work (any AI, not just a Claude or Copilot limitation)
   - What Crowe wants: flag notable items, suggest normalizations

2. **Proposed architecture** (10 min — the main discussion)
   - Draw a pipeline: XAF file → preprocessing → filtered subsets → AI analysis → structured report
   - Preprocessing options in the Microsoft stack:
     - Azure Function (Python/C#) that parses XML and extracts subsets
     - Power Automate with custom connector
     - Azure Data Factory for the ETL step
     - Logic Apps as orchestrator
   - What to extract (the filters):
     - Manual journal entries with narratives
     - Transactions above EUR X threshold
     - Period 13 (closing) entries
     - Year-over-year balance comparisons
     - Specific GL account codes (management fees, related-party)
   - AI analysis layer:
     - Copilot Studio agent that receives the filtered CSV/JSON
     - Custom prompts for: anomaly detection, normalization suggestions, trend analysis
   - Output: structured report (Excel or Word) with flagged items and recommendations

3. **Discussion: Where does this live in Crowe's stack?** (5 min)
   - Who maintains the preprocessing logic?
   - How does this integrate with their existing audit workflow?
   - Is this a one-off tool or a repeatable pipeline?
   - Timeline estimate: what's a realistic MVP?

Include a simple ASCII or Mermaid diagram of the architecture. Be specific about Microsoft technologies but honest about where custom development is needed. This is the use case with the highest long-term potential but also the most engineering effort.
```

---

## Prompt 8: Wrap-up Framework

**Attach:** `CONTEXT.md`
**Output:** `outputs/08-wrapup-framework.md`

```
You are helping prepare the closing 10 minutes of a workshop. Read the attached CONTEXT.md for background.

By this point, the group has spent 4 hours together: two Claude demos, a transition to Copilot Studio, live prototyping, exploration, and architecture discussions. They're energized but tired. The wrap-up needs to be crisp, forward-looking, and end with a clear next step.

Create a wrap-up framework:

1. **Quick recap** (3 min)
   - One sentence per use case: what we did, what we learned
   - The headline insight: "AI can meaningfully accelerate your M&A workflows — today, not someday"

2. **Priority exercise** (3 min)
   - Ask Bram and Marieke: "If you could have one of these six use cases working in production next month, which would it be?"
   - Capture their ranking — this drives the follow-up

3. **Next steps** (3 min)
   - Propose concrete follow-up: pilot project on their #1 priority
   - Timeline: what's realistic? (2 weeks for a POC? 4 weeks for an MVP?)
   - Who does what: Tatoma builds, Crowe tests, iterate together
   - Suggest a follow-up session date

4. **Closing** (1 min)
   - Thank them for sharing real data and being so engaged
   - "This is just the beginning" — the compound workflow vision (audit files → financials → valuation → IM → teaser)
   - End on energy: "We're excited to build this with you"

Keep it tight. No rambling. Every sentence should earn its place in the final 10 minutes.
```

---

## How to Use These Prompts

For each prompt:
1. Start a new Claude session or subagent
2. Attach `CONTEXT.md` as background
3. Attach the relevant use-case markdown file(s) if specified
4. Paste the prompt
5. Save the output to the specified file in `outputs/`

The outputs can then be reviewed, refined, and assembled into the final workshop materials.
