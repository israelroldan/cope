# Workshop Context Document

## What Is This

Tatoma (an AI consultancy based in the Netherlands) is running a half-day workshop for Crowe Foederer (a Dutch accounting and advisory firm) on **Tuesday, April 14, 2026, from 12:30 to 17:00**.

The purpose is to demonstrate how AI can accelerate M&A (mergers & acquisitions) advisory workflows, using Crowe Foederer's own case materials and templates.

## Who's Involved

**Tatoma (us — hosting the workshop):**
- Sander Kok — co-founder, business lead
- Israel Roldán — co-founder, technical lead

**Crowe Foederer (the client):**
- Bram Verhagen — Consultant, M&A advisory. Prepared the briefing and case materials.
- Marieke Steijvers — also on Bram's team, CC'd on all correspondence.

Crowe Foederer is part of the global Crowe network. They offer Accountancy, Tax, Advisory, and Technology services. Their Eindhoven office is leading this initiative.

## The Strategic Context

- **Tatoma uses Claude** (Anthropic) as its primary AI platform. We love it and believe it has the best reasoning, tooling, and patterns for knowledge work.
- **Crowe Foederer uses Microsoft Copilot and Copilot Studio** as part of their AI/IT strategy.
- **The workshop is split in two:**
  - **Part 1 (Claude):** "Welcome to Claude land" — we showcase what's possible by running two live demos on Crowe's data. This sets the quality bar and demonstrates how we work at Tatoma.
  - **Part 2 (Copilot Studio):** "Now let's build in your stack" — we switch to Copilot Studio and start prototyping the remaining use cases in Crowe's Microsoft ecosystem.

The tone is collaborative, not competitive. We're not selling Claude over Copilot — we're showing what great AI-assisted M&A work looks like, then helping them achieve it with their tools.

## The Case Materials

Bram provided a zip file ("Briefing Claude.zip") containing real, confidential case data organized into 6 use cases:

### Case company: KleurRijker B.V.
- Based in Amersfoort, Netherlands
- Deal code-named "Project Faraday"
- Annual reports available for 2023, 2024, and 2025 (concept)
- Audit files (XAF format from Exact Online) for 2022–2025
- Revenue ~EUR 7.5M, EBITDA ~EUR 2.3M (2024), 27 FTE

### Separate case: Van Grunsven
- Used for the bid letter / term sheet comparison (UC2)
- Non-Binding Offer dated January 24, 2026
- Term Sheet dated February 25, 2026
- Purchase price: EUR 18M including earn-out

## The 6 Use Cases (in demo order)

| # | Use Case | Platform | What it tests |
|---|----------|----------|---------------|
| 1 | IM Review | Claude | Read a 33-page Information Memorandum and review it from a buyer's perspective |
| 2 | Biedingsbrief vs. Term Sheet | Claude | Compare two deal documents and flag discrepancies |
| 3 | Cijferopstelling | Copilot Studio | Extract financial data from PDF annual reports into an Excel P&L/balance sheet template |
| 4 | Waarderingsmodel | Copilot Studio | Fill two valuation model templates (DCF + ValuePlan) with extracted data |
| 5 | Teaser | Copilot Studio | Generate a teaser PPTX from the IM content |
| 6 | Auditfiles | Copilot Studio | Parse large XAF audit files, flag notable items, suggest normalizations |

## Key File Details

### UC1: IM Review
- `2025 IM - Project Faraday.pdf` — 33 pages, 1.2 MB, text-based PDF, Dutch
- Sections: introduction, company info, market info, SWOT, financial info, disclaimer
- Contains 8 normalization adjustments, P&L for 2023–2025, balance sheet snapshots

### UC2: Biedingsbrief vs. Term Sheet
- `Getekende NBO Van Grunsven.pdf` — 3 pages, signed, Jan 24, 2026
- `Getekende Term Sheet Van Grunsven.pdf` — 9 pages, signed, Feb 25, 2026
- Known discrepancies: earn-out max (EUR 4.15M vs 4.0M), management fee (EUR 230K vs 260K), working capital treatment, warranty framework

### UC3: Cijferopstelling
- `Template cijferopstellingIM.xlsx` — 5 sheets (P&L historical, P&L forecast, balance sheet, customers, suppliers)
- 3 annual reports (KleurRijker BV 2023, 2024, 2025 concept) — text-based PDFs, Dutch RJ format
- ~80–90% of template fields can be auto-filled from the PDFs

### UC4: Waarderingsmodel
- `DCF model.xlsx` — 2 sheets (Prognose + WACC), straightforward
- `2026 ValuePlan.xlsm` — 17 sheets, no macros, formula-only, bilingual (NL/EN)
- Same annual reports as UC3

### UC5: Teaser
- `Teaser - Project X (template NL).pptx` — 3 slides (title, company overview + metrics, contact)
- Same IM as UC1 as source content

### UC6: Auditfiles
- 4 XAF files (2022–2025), 63–88 MB each, XAF 3.2 standard from Exact Online
- 67K–99K GL lines per year, ~16,800 customers/suppliers per year
- Too large for direct AI processing — requires preprocessing pipeline

## Workshop Language

- The case materials and annual reports are in **Dutch**
- The workshop conversation will likely be in **Dutch**
- Workshop prep documents (these files) are in **English** for internal Tatoma use
- Workshop deliverables/slides can be in either language — confirm with the team

## Tone & Approach

- **Collaborative, not sales-y.** We're partners helping Crowe explore what's possible.
- **Honest about limitations.** If something doesn't work perfectly, that's a learning moment.
- **Interactive.** Everyone gets hands-on time. This is a working session, not a presentation.
- **Forward-looking.** The session should end with a clear next step and pilot project.
