# Demo Prompts — Copy & Paste Ready

Each prompt below is ready to use. Upload the indicated file(s), paste the prompt, go.

---

## Pattern 1 — Document Analysis

**Surface:** Claude Chat (claude.ai)
**Upload:** `pattern-1-document-analysis/sample-company-profile.md`

### Prompt 1a: Buyer's perspective review

```
You are an experienced M&A advisor reviewing this Information Memorandum on behalf of a potential buyer.

Please provide:
1. An executive summary of the company (3-4 sentences)
2. The key strengths that make this an attractive acquisition
3. The key risks and red flags — be specific, cite numbers from the document
4. Questions you would raise in the next management meeting
5. Your assessment of the EBITDA normalizations — which do you accept, which would you challenge, and why?

Be direct and analytical. This is for an internal buyer memo, not a polite response to the seller.
```

### Prompt 1b: Quick financial health check (alternative, faster)

```
Review the financial data in this Information Memorandum. Give me a one-page financial health assessment covering: revenue trends, margin analysis, working capital, and any numbers that don't add up or deserve closer scrutiny.
```

---

## Pattern 2 — Cross-Document Comparison

**Surface:** Claude Chat (claude.ai)
**Upload both:** `pattern-2-cross-document-comparison/letter-of-intent-v1.md` AND `share-purchase-agreement-v1.md`

### Prompt 2a: Find all discrepancies

```
I'm uploading two deal documents for the same transaction:
1. A Letter of Intent (LOI) dated January 15, 2026
2. A Share Purchase Agreement (SPA) dated March 10, 2026

Compare these two documents clause by clause. For every discrepancy or material change between the LOI and the SPA, tell me:
- What the LOI says
- What the SPA says
- Who benefits from the change (buyer or seller)
- Whether this is a material change that should be flagged

Present this as a structured table. Don't skip minor differences — in M&A, the details matter.
```

### Prompt 2b: Seller's negotiation brief (alternative angle)

```
You represent the sellers in this transaction. Between the LOI and the SPA, several terms have shifted. Identify every change that disadvantages the sellers and draft talking points for a call with the buyer's counsel where you push back on these changes.
```

---

## Pattern 3 — Template Filling

**Surface:** Claude Cowork (best) or Claude Chat
**Upload both:** `pattern-3-template-filling/source-annual-report.md` AND `pattern-3-template-filling/financial-overview-template.xlsx`

### Prompt 3a: Fill the template

```
I'm giving you two files:
1. An annual report for BrightPath Solutions B.V. (the source data)
2. An Excel template with empty cells for a financial overview (P&L, Balance Sheet, Key Metrics)

Please read the annual report carefully and fill in the Excel template with the correct figures. The blue cells with yellow background are the input cells that need data.

For the P&L sheet: fill in all three years (2023, 2024, 2025).
For the Balance Sheet: fill in 2025 and 2024.
For Key Metrics: calculate and fill in what you can derive from the annual report data.

Use the exact figures from the report. Where a figure needs to be negative (costs, expenses), enter it as a negative number. Save the completed file.
```

### Prompt 3b: Fill and flag gaps (more realistic)

```
Fill in this financial overview template using the data from the annual report. Where data is available, enter it. Where you need to estimate or derive a number, mark the cell and explain your calculation. Where data is missing entirely, leave the cell empty and list what's missing at the end.
```

---

## Pattern 4 — Data Extraction

**Surface:** Claude Cowork or Claude Code
**Upload:** `pattern-4-data-extraction/messy-due-diligence-notes.md`

### Prompt 4a: Structured risk register

```
These are raw notes from a due diligence site visit. They're messy and conversational — that's how real DD notes look.

Extract and organize the findings into a structured risk register with these columns:
- Risk ID (R-001, R-002, etc.)
- Category (Financial / Legal / Operational / Commercial / IT / Governance)
- Description (one clear sentence)
- Severity (High / Medium / Low)
- Financial impact (estimate if mentioned, "TBD" if not)
- Source (who mentioned it or where it was found)
- Recommended action

Sort by severity (High first). Don't miss anything — read the notes carefully, including the asides and confidential comments.
```

### Prompt 4b: Extract to Excel (Cowork-specific)

```
Read these due diligence notes and create an Excel file with two sheets:

Sheet 1 — "Risk Register": structured table with columns for Risk ID, Category, Description, Severity, Estimated Financial Impact, Source, and Recommended Next Step.

Sheet 2 — "Customer Overview": extract the customer revenue data mentioned in the notes into a clean table with Customer Name, 2025 Revenue, Contract End Date, and Notes/Flags.

Make it presentation-ready — I want to share this with the deal team.
```

### Prompt 4c: Action items extraction (quick win)

```
Extract all action items from these due diligence notes. For each one, give me: what needs to be done, who should do it (legal / financial / commercial team), and urgency (immediate / this week / before next meeting). Format as a numbered checklist.
```

---

## Bonus: Combination Prompts (show the workflow)

These combine multiple patterns and work well as a "what's really possible" closer.

### Bonus 1: End-to-end deal assessment (Pattern 1 + 4 combined)

**Upload:** the sample IM + the DD notes

```
I'm giving you an Information Memorandum and raw due diligence site visit notes for two different fictional companies. Imagine they were for the same deal.

Based on both documents, write a 1-page investment committee memo covering:
- Deal summary (company, price, structure)
- Key findings from DD that confirm or contradict the IM
- Top 3 risks with mitigation suggestions
- Go / No-Go recommendation with conditions

Write it the way a senior M&A partner would — concise, direct, no fluff.
```

---

## Tips for Live Demos

- **Start with Pattern 1 or 2** — they're the fastest to show and most visually impressive
- **Pattern 3 is the "Cowork moment"** — it produces a file, which feels tangible
- **Pattern 4 is the "messy data" moment** — everyone has notes like this, so it resonates
- **If short on time**, just run Prompt 1a and Prompt 2a — those are the two strongest
- **Always pause and let Bram/Marieke react** before moving to the next pattern
