# Exploration Notes: UC4 (Waarderingsmodel) + UC5 (Teaser)

**Segment length:** 30 minutes total. Structure: **separate-but-linked** — we frame the shared pattern up front, then treat each use case on its own terms because the hard parts diverge sharply.

**Timing:**
- (0:00–0:02) Opening frame: "same pattern, different bottlenecks"
- (0:02–0:12) UC4 Waarderingsmodel — architecture discussion
- (0:12–0:24) UC5 Teaser — quick prototype
- (0:24–0:30) Compare + "which first?" group discussion

---

## 0. Opening frame (2 min)

Say this out loud before starting either segment:

> "Both of these use cases look like the same problem — source data goes in, template comes out. UC3 was the same shape. What we're going to do now is notice where that surface similarity breaks down. UC4's hard part isn't filling cells, it's getting the WACC judgment out of a human's head. UC5's hard part is just content extraction and layout — no judgment calls. Same pattern, different bottlenecks, different readiness."

This sets up the payoff in the final 8-minute discussion: the comparison becomes meaningful because we framed the pattern up front.

---

## 1. UC4: Waarderingsmodel — Architecture Discussion (10 min)

### The core pattern (shared with UC3 and UC5)

A Copilot Studio agent for valuation would be a topic-driven agent with three loosely coupled stages:

1. **Extract** — pull structured historicals from the annual report PDFs (AI Builder "Extract information from documents" or a Power Automate flow using Document Intelligence).
2. **Reason** — reconcile years, normalize line items, map them to the template's expected rows.
3. **Write** — push values into specific Excel cells via the Excel Online (Business) connector (`Update a row` / `Run script` with Office Scripts).

Office Scripts (run via the "Excel Online — Run script" action) is the unlock. Named ranges + a single script that accepts a JSON payload is far more robust than addressing cells by row/column in the flow itself.

### Where this use case diverges from "just fill a template"

The extract-reason-write loop only gets us to the numbers. The real work is the **advisory conversation around the WACC**, and that's what makes UC4 genuinely different from UC5.

### DCF (2 sheets) vs. ValuePlan (17 sheets)

**DCF is the realistic target.** Scope the first build to DCF only.

- DCF has ~20–30 input cells on Prognose + ~15 on WACC. All clearly labeled. Formulas do the rest.
- ValuePlan has 17 interdependent sheets, monthly granularity the annual reports don't contain, and an NL/EN language toggle (Menu!E9) that shifts label positions. One miskeyed cell cascades.
- Rule of thumb for Copilot Studio: **if you can't describe the target cells as a flat JSON object in under a page, don't automate it in v1.** ValuePlan fails that test; DCF passes.

Honest framing: ValuePlan is a *phase 2* — viable only after we've built a reliable forecasting sub-agent and agreed on default assumptions with Bram.

### The WACC judgment problem — the real design challenge

WACC is where this stops being "fill the template" and becomes an advisory conversation. The build-up method has:

- Risk-free rate (2.72% — lookup, automatable)
- Market premium (5% — house standard, automatable)
- Size premium (5.59% — depends on company size bucket, semi-automatable)
- **8 BDO company-specific risk criteria** — all human judgment: illiquidity, customer concentration, supplier dependence, management dependency, activity diversification, market barriers, track record, flexibility

Approach: build this as an **adaptive card conversation** inside the Copilot Studio topic. The agent:

1. Pre-fills risk-free + market + size premium from a house-standards table in SharePoint / Dataverse.
2. For each of the 8 criteria, shows the definition and a 0–3% slider, with a pre-suggested value grounded in what the agent observed in the annual report ("customer concentration: top-3 customers are 42% of revenue → suggested 1.5%").
3. Requires the user to confirm or edit before writing to the WACC sheet.

Concrete Copilot Studio features to reference:
- **Topics + adaptive cards** for the parameter-gathering flow
- **Variables + entities** to carry extracted financials between turns
- **Generative answers** grounded on a SharePoint library of past valuation memos ("for comparable deals we used X")
- **Power Automate child flow** for the Excel write step
- **Dataverse table** as the shared state between extraction and writing

### What works, what's hard, what's future phase

**Works well:**
- Historical extraction from the three annual reports (same pipeline as UC3).
- Writing to clearly labeled cells in DCF Prognose and WACC via Office Scripts.
- Interactive WACC parameter collection through adaptive cards.

**Hard but doable:**
- Line-item mapping when the annual report uses slightly different wording year over year (RJ format varies). Needs a mapping table + "review diff" step before write.
- Handling multi-year historicals where one year is "concept" and values may still shift.

**Future phase:**
- ValuePlan's 17 sheets.
- Auto-generated forecast assumptions (needs a separate forecasting agent with sector benchmarks).
- Sensitivity tables and scenario comparison.

**Known Copilot Studio limitations to flag:**
- Agents can't natively read complex Excel — writes are fine via Office Scripts, but "reading the whole model back" for verification is clunky.
- Long-running flows (>several minutes) for big PDFs need to be pushed into Power Automate and polled; the chat UX won't stream progress nicely.
- Document extraction accuracy on Dutch RJ-format PDFs is good but not perfect — plan for a human confirmation step.

### Transition into UC5

> "Notice what just happened in the WACC conversation — the agent had to ask eight substantive questions and be ready to defend each suggestion. Now watch UC5, where the agent asks essentially zero questions because there's no judgment in a teaser."

---

## 2. UC5: Teaser — Quick Prototype (12 min)

### Why this is the better candidate for a live build

Only 3 slides, one source document (the IM — already parsed in UC1), and the bulk of the work is text substitution. No judgment calls. If anything falls over it'll do so visibly and quickly, which is useful for the workshop.

### Approach

1. UC1 already produced a structured summary of the IM. We reuse that as the agent's input instead of re-parsing the PDF — saves minutes and makes the flow deterministic.
2. The Copilot Studio agent prompts: "Generate teaser for Project Faraday?" with a confirm card showing extracted values (company name, revenue, EBITDA, headcount, 2-paragraph business description).
3. On confirm, it fires a Power Automate flow that opens the PPTX template and replaces placeholders.
4. Result lands in a SharePoint folder; the agent returns a link.

### PPTX generation in the Microsoft stack — what actually works

Three realistic options, in order of how cleanly they fit Copilot Studio:

**Option A: Word template → convert to PPTX.**
PowerPoint doesn't have a native "merge fields" concept the way Word does. Power Automate's **"Populate a Microsoft Word template"** action does, and the cleanest pattern is often: generate a Word doc with merge fields, then convert. For a visual 3-slide teaser this isn't ideal.

**Option B: Placeholder-token replace in the PPTX (recommended for v1).**
Put tokens like `{{CompanyName}}`, `{{Revenue}}`, `{{EBITDA_2024}}`, `{{BusinessDescription}}` directly into the template's text frames. A Power Automate flow with the **"Get file content" → custom action → "Create file"** pattern opens the .pptx (it's a zip), runs a find/replace on the slide XML, and saves. 30–50 lines in a custom connector or an Azure Function. Robust, predictable, easy to debug.

**Option C: python-pptx in an Azure Function called from Power Automate.**
Richer — can add chart data, resize tables, swap images. More setup. Probably v2 once the chart on slide 2 becomes a real requirement.

For the workshop: walk through Option B. That's what a Crowe team could realistically ship in a sprint.

### The 70/30 split

**Automatable (~70%):**
- Title slide project/company name
- Slide 2 headline, 1–2 paragraph description, metrics table values
- EBITDA data points (numbers — not the rendered chart)
- Year labels, currency formatting

**Manual polish (~30%):**
- EBITDA trend chart needs a human to refresh data or we go to python-pptx
- Partner/industry logos on slide 3
- Tone tuning on the business description
- Final visual QA (spacing, font, anonymization check)

Frame as: **"2-hour task becomes 20-minute review."** That's the story that wins adoption.

### Copilot Studio features to reference live

- **Topic trigger** "generate teaser"
- **Adaptive card** to confirm extracted values before writing
- **Power Automate flow** as the action, with a SharePoint document library output
- **Generative AI node** (not full generative answers) to summarize the IM's "Company info" section into the 2-paragraph description with a style prompt
- **File output card** to return the finished deck to the user

**Known limitations:**
- Copilot Studio's built-in PPTX handling is thin; real work happens in Power Automate / Azure.
- Very long text generation (2+ paragraphs) inside a topic works, but you lose fine-grained style control vs. a proper prompt in a dedicated step.
- File size caps on connector actions — not an issue for a 3-slide deck but worth flagging for "why not a full CIM?"

---

## 3. Discussion: Which is the better first project? (8 min)

### Pulling the thread from the opening frame

> "Both use the same extract→reason→write pattern. But UC4's bottleneck is judgment — you're designing a conversation. UC5's bottleneck is layout — you're designing a document pipeline. That's why one is a 4–6 week project and the other is a quarter-long program."

### Effort vs. value

| | Effort (build) | Effort (maintain) | Value per run | Runs/month |
|---|---|---|---|---|
| **UC5 Teaser** | Low — 1–2 sprints | Low — template rarely changes | Medium — saves ~90 min per teaser | Many (every new mandate) |
| **UC4 DCF** | Medium — 3–4 sprints, plus WACC UX | Medium — model versions change | High — saves 3–6 hours per valuation, reduces errors | Fewer |
| **UC4 ValuePlan** | High — phase 2 | High | Very high if it works | Rare |

### The honest trade-off

- **Teaser:** simpler, faster to ship, lower impact per run, but hits more often. Great "proof it works" project. Low risk of embarrassing errors because output is always human-reviewed before it leaves the firm.
- **DCF:** harder, especially the WACC conversation design, but the value is real. Errors are higher-stakes — a wrong input the reviewer misses ends up in a client deliverable.
- **ValuePlan:** not the first project. Revisit after DCF is stable.

### Recommendation

Build **UC5 Teaser first** as the flagship Copilot Studio pilot (4–6 weeks), then **UC4 DCF** as the second project once the team has Copilot Studio muscle memory. Keep ValuePlan on the roadmap but not in the first half of the year.

### Prompt questions for the group

Use these to open the 8-minute discussion — conversational, let them answer:

- Which of these would save **you personally** the most time in a typical month?
- Which would your team adopt fastest — who on the team would actually open the agent next Monday?
- If the teaser ships with a 70% draft, is that a win, or does "not fully finished" make it harder to adopt than a manual one?
- For DCF: how much judgment is there in the "8 risk criteria"? House view, or does every partner do it differently?
- What would make you trust an agent's filled DCF enough to use it in a live engagement?
- If we could only build one agent this quarter, which would it be — and what would the rest of your team say?

### Close of segment

Park the winner on the board. Carry it into the "pilot project" conversation in the final workshop segment.
