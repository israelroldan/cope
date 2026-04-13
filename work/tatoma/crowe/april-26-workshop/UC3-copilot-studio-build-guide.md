# UC3 Cijferopstelling — Copilot Studio Build Guide

**Workshop:** Crowe Foederer × Tatoma — April 14, 2026
**Segment:** Part 2, main build (40 min total: 8 min setup/framing + 20 min build + 12 min test/discuss)
**Goal:** Build something in Copilot Studio that turns a Dutch annual report PDF into a populated `Template cijferopstellingIM.xlsx`.

---

## 1. Architecture Overview

### What we're building

A Power Automate flow (invoked from a Copilot Studio agent) that:

1. Accepts a PDF annual report as input.
2. Extracts the full text of the PDF.
3. Sends the text to an AI prompt (AI Builder, GPT-4o backed) with instructions to return a structured JSON payload of financial line items.
4. Writes those values into a copy of `Template cijferopstellingIM.xlsx` (W&V sheet + Balans sheet).
5. Returns a link to the populated file.

### Flow diagram (draw on whiteboard at the start)

```
┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│ Copilot      │──▶│ PDF text     │──▶│ AI Builder   │──▶│ Parse JSON + │──▶│ Excel file   │
│ Studio agent │   │ extraction   │   │ "Create text │   │ Excel Online │   │ in OneDrive/ │
│ (chat input  │   │ (AI Builder  │   │ with GPT"    │   │ "Update row" │   │ SharePoint   │
│  + file)     │   │ or PDF       │   │ prompt       │   │ actions      │   │ + link back  │
│              │   │ action)      │   │              │   │              │   │ to user      │
└──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘
     trigger           extract              reason              map                  output
```

### Why this stack (recommended approach)

We evaluated three options:

1. **Copilot Studio agent with a Power Automate flow as a tool (recommended).** Gives us a chat UX for the demo, the flow does the heavy lifting, and AI Builder's "Create text with GPT" action is the fastest way to get a reliable JSON extraction without custom code.
2. Power Automate flow only, triggered manually. Works but no chat UX — less impressive as a live demo.
3. Custom GPT / declarative agent with document upload. Fast to build but can't write into an Excel template with precise cell addresses — the extraction would be demo-only, not end-to-end.

We go with option 1. It demonstrates the "agent calls tools" pattern Crowe will actually use for production work, and it ends with a real Excel file.

---

## 2. Step-by-Step Build Plan

### Pre-prep (before the session — do this on Monday)

Doing all of this live would blow the time box. Pre-stage:

- **OneDrive / SharePoint folder** for the workshop (e.g. `/Workshop Faraday/UC3/`).
- **Template copy:** put `Template cijferopstellingIM.xlsx` in that folder. Make sure the W&V and Balans sheets are formatted as Excel **tables** (`Insert → Table`) — the "Update a row" action in Power Automate only works on tables, not ranges. Name the tables `tblWV` and `tblBalans`.
  - Add a "Label" column as the key column.
  - Alternative if tables are problematic: use the "Update cell" action with explicit cell addresses.
- **Source PDFs:** upload `KleurRijker BV 2024.pdf` (primary demo file) and 2023 + 2025 concept as backups.
- **Copilot Studio environment:** make sure Israel is signed in, a test agent already exists (empty shell), and GPT/AI Builder credits are verified.
- **Reference run:** do one dry run end-to-end on Monday evening. Save the working flow as `UC3-Cijferopstelling-READY` so we have a known-good version to fall back to.
- **Whiteboard slide:** have the architecture diagram ready on a slide or on the whiteboard before we start.

### Live build (20 minutes)

#### Step 1 — Create the flow (≈3 min)

1. In Copilot Studio, open the pre-created agent → **Tools** → **+ Add a tool** → **New Power Automate flow**. This opens Power Automate with the correct "Run a flow from Copilot" trigger prewired.
2. In the trigger, add inputs:
   - `PdfFile` (File)
   - `Year` (Text) — so the flow knows which column to populate.
3. Add outputs:
   - `ResultFileUrl` (Text)
   - `Summary` (Text)

#### Step 2 — Extract PDF text (≈3 min)

1. **+ New step → AI Builder → Extract text from images and PDFs.**
2. Input: `PdfFile` from the trigger.
3. Use the `Text` output downstream. (If AI Builder OCR is unreliable or slow, swap for **Encodian's "Get text from PDF"** or the OneDrive "Convert file (preview)" action — say this aloud as we do it; it's a real-world pivot.)

#### Step 3 — AI extraction (≈6 min — the interesting part)

1. **+ New step → AI Builder → Create text with GPT using a prompt.**
2. Click **Create custom prompt**.
3. Paste the extraction prompt from section 3 below. Use the dynamic `Text` output from step 2 as the `{{annualReportText}}` variable, and `Year` as `{{targetYear}}`.
4. Set output format to **JSON**. If that option isn't available in your tenant, end the prompt with "Return ONLY valid JSON, no prose." and parse downstream.
5. Save and test the prompt once inside the AI Builder prompt designer on a paragraph of the PDF to show it working in isolation — great teaching moment.

#### Step 4 — Parse JSON (≈2 min)

1. **+ New step → Data Operation → Parse JSON.**
2. Content: output of the GPT action.
3. Schema: paste the schema from section 3 (or click "Generate from sample" using the sample output).

#### Step 5 — Write to Excel (≈4 min)

For each financial line item we want to populate, add **Excel Online (Business) → Update a row**:

- Location: OneDrive / SharePoint
- File: `Template cijferopstellingIM.xlsx`
- Table: `tblWV`
- Key Column: `Label`
- Key Value: `"Netto-omzet"` (etc.)
- Column (the year, e.g. `2023`): dynamic value `nettoOmzet` from parsed JSON.

To stay inside 20 minutes, **wire up only the top 6 fields live:** Netto-omzet, Brutowinst, Personeelskosten, EBITDA, Totaal activa, Eigen vermogen. Say out loud: "the rest is identical copy-paste, we won't do all 30 rows live." If we have time, we can add more. The pre-prepared fallback flow has all rows wired.

#### Step 6 — Return to the agent (≈1 min)

1. **+ New step → OneDrive → Create share link** (read-only) on the template file.
2. Set the trigger response: `ResultFileUrl` = the share link, `Summary` = `"Extracted @{variables('nettoOmzet')} net revenue for year @{triggerBody()['Year']}."`.
3. Save the flow.

#### Step 7 — Wire it up in Copilot Studio (≈1 min)

1. Back in Copilot Studio, the new flow is now a tool. Add a topic (or node on the default topic) that triggers on "extract financials" / "cijferopstelling". Pass the uploaded file and the target year to the flow. Render the returned share link.
2. **Publish** to the test channel.

### What to skip/simplify

- Don't build balance-sheet mapping live beyond one or two rows — it follows the exact same pattern.
- Don't worry about Klanten/Leveranciers sheets — call out that those come from audit files (UC6) and move on.
- Don't try to handle the prognose (forecast) sheet — explicitly flag as "needs human".
- Don't add error handling, retries, or logging. We'll talk about those in discussion.
- Don't parameterize the template path. Hard-code for the demo.

---

## 3. The Extraction Prompt

Paste this into the AI Builder "Create text with GPT" prompt designer.

```
You are a financial analyst assistant extracting data from a Dutch annual report
(jaarrekening, Dutch RJ / Richtlijnen Jaarverslaggeving format).

INPUT
- Full text of the annual report: {{annualReportText}}
- Target reporting year: {{targetYear}}

TASK
Extract the financial figures for {{targetYear}} that match the line items below.
All figures are in EUR. If the report shows amounts in thousands, convert to full
euros. If a line item is not present in the report, return null — do NOT guess.

OUTPUT
Return ONLY valid JSON, no prose, using this exact schema:

{
  "year": <number>,
  "sourceDocument": "<filename or title found in the document>",
  "currency": "EUR",
  "unitsInReport": "units" | "thousands",
  "profitAndLoss": {
    "nettoOmzet": <number|null>,                 // Net revenue
    "kostprijsVanDeOmzet": <number|null>,        // Cost of goods sold
    "brutowinst": <number|null>,                 // Gross profit
    "personeelskosten": <number|null>,           // Personnel costs (lasten uit hoofde van personeelsbeloningen)
    "lonenEnSalarissen": <number|null>,
    "socialeLasten": <number|null>,
    "pensioenlasten": <number|null>,
    "afschrijvingen": <number|null>,             // Depreciation and amortisation
    "huisvestingskosten": <number|null>,
    "verkoopkosten": <number|null>,
    "autokosten": <number|null>,
    "kantoorkosten": <number|null>,
    "algemeneKosten": <number|null>,
    "overigeBedrijfskosten": <number|null>,
    "ebitda": <number|null>,
    "ebit": <number|null>,
    "financieleBatenEnLasten": <number|null>,
    "resultaatVoorBelastingen": <number|null>,
    "belastingen": <number|null>,
    "resultaatNaBelastingen": <number|null>
  },
  "balanceSheet": {
    "materieleVasteActiva": <number|null>,
    "immaterieleVasteActiva": <number|null>,
    "financieleVasteActiva": <number|null>,
    "voorraden": <number|null>,
    "vorderingen": <number|null>,
    "liquideMiddelen": <number|null>,
    "totaalActiva": <number|null>,
    "eigenVermogen": <number|null>,
    "voorzieningen": <number|null>,
    "langlopendeSchulden": <number|null>,
    "kortlopendeSchulden": <number|null>,
    "totaalPassiva": <number|null>
  },
  "notes": [
    "<short free-text note for anything ambiguous or worth flagging>"
  ],
  "confidence": "high" | "medium" | "low"
}

RULES
1. Dutch reports often show two years side-by-side. Extract only the {{targetYear}} column.
2. Preserve sign conventions from the report (costs as positive numbers when shown that way).
3. If a value is aggregated in the report (e.g., "Overige kosten" combines several
   template line items), put the total in the closest matching field and add a
   short entry to "notes".
4. If the audit report, directors' report, or disclaimer section contradicts the
   figures, trust the financial statements section.
5. Set confidence = "low" if more than 3 fields are null or if the report structure
   deviates significantly from Dutch RJ format.
```

**Parse JSON schema (step 4):** generate automatically from a sample output — don't hand-write it live.

---

## 4. Test and Discussion Phase (12 min)

### Run the demo (≈4 min)

1. Open the published agent in Teams or the test pane.
2. Upload `KleurRijker BV 2024.pdf`. Say: "extract the financials for 2023" (the 2024 report shows 2024 + 2023 side by side; both years are inside).
3. Wait for the flow to complete (~30–60 sec). Narrate what's happening at each step so the audience stays with us.
4. Click the returned share link → template opens with values populated.

### Compare to Claude's UC1 output (≈3 min)

Pull up the side-by-side. Concrete things to point at:

- Did both agree on netto-omzet and brutowinst? (Expected: yes, to the euro.)
- Where did they diverge? (Typical: aggregated cost categories like "Overige kosten" or management-fee treatment.)
- Which one flagged ambiguity better? Claude tends to narrate uncertainty; the Copilot Studio output has it only in the `notes` array and `confidence` field — call that out as a design choice to preserve.

### Discussion prompts (≈5 min)

- **Accuracy:** what would you accept without human review? (Our take: headline P&L and balance sheet totals yes; cost breakdowns and mapping decisions no.)
- **Gaps:** forecast sheet is empty, customers/suppliers are empty — what's the right pattern? (Forecast: human input or separate trend model. Customers/suppliers: chain to UC6 audit-file pipeline.)
- **Scale:** what happens when we do all three years × all 30 rows? Do we fan out the flow, or one big call? (One GPT call per PDF; loop the write-back.)
- **Trust and control:** the `confidence` field and `notes` array are the seed of a human-review UI. How would you surface them in Crowe's review workflow?

---

## 5. Fallback Plan

Things that can go wrong live: tenant permissions on AI Builder, GPT quota, OneDrive auth, table-vs-range confusion in the Excel action, or the PDF text extraction returning garbled text.

Escalation ladder — try in this order, don't spend more than 2 minutes on any step:

1. **Switch to the pre-built flow.** `UC3-Cijferopstelling-READY` from pre-prep. Just run it. Honesty line: "we prepped this version last night; let's use the saved time to walk through it node by node."
2. **Drop Excel write-back, keep AI extraction.** If Excel Online fails, have the flow return the raw JSON in the agent response. The value story is still intact — we have structured data from an unstructured PDF.
3. **Whiteboard the architecture.** If the flow editor itself is misbehaving, go to the whiteboard version of the diagram and walk through what each node would do and why, using the extraction prompt as the centrepiece. This is still a good 15-minute teaching session.
4. **Show a screen recording.** Israel: please record a 2-min screen capture of the working flow on Monday evening as ultimate fallback.
5. **Turn it into a discussion.** If we're stuck and time is bleeding, pivot to "what did we learn about building this in Copilot Studio vs. Claude?" Compare the developer experience, the prompt, the governance story. That's genuinely valuable workshop content.

Whatever we pivot to, name it: "we're hitting X, let's switch to Y." Crowe will appreciate the honesty, and the workshop tone document says exactly this.
