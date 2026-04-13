# Transition Segment — Talking Points
## 14:15 – 14:35 | From Claude to Copilot Studio (20 min)

**Audience:** Bram & Marieke (Crowe Foederer, M&A advisory)
**Context:** They just watched UC1 (IM review) and UC2 (NBO vs. Term Sheet) in Claude. Coffee break just ended. Energy is high. Now we need to shift gears without losing momentum.

**Tone:** Honest, pragmatic, collaborative. We're not selling — we're translating. Don't oversell Copilot Studio, don't undersell it. They know Microsoft; they need to see HOW the patterns translate, not be convinced they can.

---

## Part 1 — "The patterns are the same" (5 min | 14:15 – 14:20)

### Opening line
> "Before we switch tools, I want to step back for a minute. Because what you just saw in Claude — that wasn't really about Claude. It was about two patterns. And those patterns are going to show up again this afternoon, just wearing different clothes."

### Recap the two patterns
**Pattern 1 — Document analysis (UC1):**
- One document in, structured reasoning out.
- The IM went in as 33 pages of Dutch prose. What came back was a buyer's-perspective review: risks flagged, normalizations assessed, questions surfaced.
- "That's not magic. That's: prompt + document + reasoning model = insight."

**Pattern 2 — Cross-document comparison (UC2):**
- Two documents in, differences out.
- NBO and Term Sheet side by side. The EUR 150K earn-out gap, the management fee mismatch, the working capital language — all surfaced.
- "Same recipe, different ingredients. Prompt + documents + reasoning = structured comparison."

### The core point
> "Neither of those patterns is Claude-specific. They're AI-assisted knowledge work patterns. They work anywhere you can combine three things: a well-designed prompt, the right document context, and a capable reasoning model."

**What actually determines quality:**
- Prompt engineering — asking the right question the right way
- Workflow design — what comes in, what comes out, what the human reviews
- Data quality and access — can the system actually see the right documents?
- The model matters too — but it's maybe 30% of the outcome. The other 70% is the three things above.

### The bridge
> "What Claude just did, we can architect in Copilot Studio. The UI will look different, the building blocks will be named differently, but the thinking is the same. And the thinking is the part that's actually hard."

*(This is the moment to watch the room. If they're nodding, move on. If someone looks skeptical, invite it: "Does that land? Or does it feel like I'm glossing over something?")*

---

## Part 2 — Copilot Studio orientation (10 min | 14:20 – 14:30)

### What Copilot Studio is
- Microsoft's platform for building custom AI agents and AI-powered workflows.
- Sits inside the Microsoft 365 ecosystem — so it already knows about your SharePoint, your Teams, your Outlook, your Dataverse.
- Two ways to think about it:
  - **As an agent builder** — "I want a specialized Claude-like helper that lives inside Teams and knows our M&A playbook."
  - **As a workflow automator** — "I want a flow that fires when a new PDF lands in a SharePoint folder, extracts the financials, and populates a template."
- For what you do, you'll end up using both.

### Key building blocks (map them to what we just saw)

**Custom agents** — the "specialized Claude" equivalent
- A custom agent is a scoped assistant with its own instructions, its own knowledge sources (SharePoint libraries, specific files, a Dataverse table), and its own tools.
- For UC1-style work: an "IM Review Agent" that lives in Teams, knows your buyer-perspective prompt, and reviews any IM you upload.
- For UC2-style work: a "Deal Doc Comparison Agent" that takes two files and returns discrepancies.

**AI Builder** — the document processing layer
- Prebuilt and custom AI models for PDFs, forms, invoices, receipts.
- Form recognition, text extraction, entity extraction, classification.
- This is what will do the heavy lifting for UC3 (annual report → P&L template) and UC5 (IM → teaser content).
- Honest note: AI Builder is good at *structured* documents (invoices, forms) and getting better at *semi-structured* (annual reports). It's not a reasoning model — it's an extractor. You pair it with the generative AI nodes for the reasoning part.

**Power Automate** — the orchestration layer
- The glue. "When this happens, do that, then do this other thing, then save the result here."
- Triggers (file added to SharePoint, message in Teams, manual button press, scheduled run).
- Actions (call AI Builder, call a generative AI prompt, update Excel, post to Teams, email Bram).
- For any use case that's more than "ask a question, get an answer," you'll have Power Automate under the hood.

**Connectors** — the "it knows your stuff" layer
- SharePoint (where your case files live)
- Dataverse (if/when you want a structured store for deal data)
- Teams (where people actually work)
- Excel / OneDrive (for the templates)
- Outlook (for the human-in-the-loop approvals)

### What's strong, what's maturing (be honest)

**Strong in Copilot Studio:**
- Tight integration with M365 — this is its unfair advantage. No tool matches the "it already knows where our files are" experience.
- Custom agents for knowledge Q&A over SharePoint content are genuinely solid right now.
- Power Automate is mature, well-documented, and battle-tested.
- Governance, compliance, and admin controls — enterprise-grade, which matters for client data.
- AI Builder handles standard document types (invoices, receipts, IDs) very well out of the box.

**Still maturing / where we'll need to be pragmatic:**
- Complex reasoning over long documents is not at Claude's level yet. The underlying models (GPT-4 family via Azure OpenAI) are capable, but the orchestration layer adds overhead. A 33-page Dutch IM review will likely need more prompt engineering and probably a chunking strategy to match what we saw this morning.
- Custom document extraction for non-standard formats (like Dutch RJ annual reports, or XAF audit files) requires building your own AI Builder model or going outside to Azure AI Document Intelligence.
- PPTX generation from Power Automate is possible but finicky — the tooling is less polished than Excel/Word.
- Debugging agent behavior is harder than in Claude. Fewer knobs, less transparency about what the model actually did.
- The gap between "demo that works" and "production flow that works reliably on 20 annual reports in a row" is real. Plan for iteration.

### The ecosystem fit
> "The big reason to build this in Copilot Studio — even where Claude might be technically stronger — is that your users already live in Teams, SharePoint, and Outlook. An agent in Copilot Studio is one click away for everyone on your team. An external tool is a context switch, a login, a data transfer, a compliance question. For work that touches client-confidential M&A data every single day, that difference compounds."

*(If someone asks "so why don't YOU use Copilot Studio at Tatoma?" — answer honestly: we're a small consultancy, our data doesn't live in M365, and we optimize for reasoning quality over ecosystem fit. For Crowe, the tradeoff is different, and that's why we're making this switch.)*

---

## Part 3 — The plan for the rest of the afternoon (5 min | 14:30 – 14:35)

### Frame the shift
> "One thing to name up front: the next three hours look different from the last hour and a half. We're switching from 'watch Sander and Israel drive' to 'all four of us building together.' That's intentional."

### Walk the plan

**UC3 — Cijferopstelling (40 min, 14:35 – 15:15):** the main build
- This is where we spend real time. Annual report PDF → Excel template.
- We'll architect the flow on the whiteboard first (8 min), then build it live in Copilot Studio (20 min), then test it on a real annual report (12 min).
- This is the use case that most resembles UC1 in pattern — document in, structured data out — so it's the best one to translate first.

**UC4 + UC5 — Waarderingsmodel & Teaser (30 min, 15:45 – 16:15):** exploration
- After the long pause, we come back and look at these two together because they share the same pattern as UC3: source data in, template filled out.
- UC4 (valuation model) is ambitious — 17 sheets, complex formulas. We'll discuss approach more than build.
- UC5 (teaser) is the "quick win" candidate — 3 slides, simpler structure. We prototype this one.
- The question we're answering: "Of these two, which becomes the pilot?"

**UC6 — Auditfiles (20 min, 16:30 – 16:50):** architecture
- 88 MB XML files with 99K GL lines per year. Too big for any AI to process raw. No exception.
- So this one is a whiteboard session, not a live build. We design the preprocessing pipeline together.
- Where does the XAF parsing live? Power Automate? An Azure Function? A custom connector?
- This is less about Copilot Studio specifically and more about architecture for Crowe's stack.

### Set expectations honestly
> "We're building live. That means two things. One — if it works, that's exciting because you'll see exactly how it's done and can reproduce it. Two — if it doesn't work, or we hit a wall, that's also valuable. Where we get stuck today is where you would have gotten stuck in three weeks on your own. Finding it now, together, with a plan for how to solve it — that's a better outcome than a polished demo that hides the hard parts."

### Close with an invitation
> "So: fewer 'wow' moments in this half, probably more 'huh, interesting' moments. Keep asking questions. The rougher this gets, the more useful it is. Ready?"

---

## Delivery notes

**Pacing:**
- 5 / 10 / 5 — but the middle block is the one to protect. If Part 1 runs long because discussion is good, trim the "plan for the afternoon" recap since the agenda is on screen anyway.
- If Part 2 runs long because they're asking detailed questions about AI Builder or connectors — that's a great sign. Let it breathe. We can borrow 5 minutes from UC3's discussion phase.

**Tripwires to watch for:**
- If they seem deflated ("so Copilot Studio is worse?") — reground in ecosystem fit and the fact that model choice is 30% of the outcome.
- If they seem overconfident ("great, so we'll build all six in a month") — reground in the "demo to production gap" honesty.
- If there's silence after the "honest about what's maturing" part — ask: "Does that match what you've heard internally, or is this new?"

**One-liners to keep in the back pocket:**
- "The hard part of AI work isn't the AI. It's the surrounding plumbing."
- "Claude set the quality bar this morning. This afternoon we figure out how close we can get in your stack — and where the tradeoffs are worth making."
- "We're not migrating from Claude to Copilot Studio. You never were in Claude. We're translating what we just showed into your world."

**What you're signaling with this segment:**
- We respect your platform choice and are not here to upsell a different one.
- We've actually worked in Copilot Studio enough to know where it shines and where it struggles.
- The afternoon will be a working session, not a continued demo.
- The goal isn't perfection — it's a clear picture of what to pilot first.
