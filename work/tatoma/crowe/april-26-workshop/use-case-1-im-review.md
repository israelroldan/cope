# Use Case 1: IM Review (Buyer's Perspective)

**Goal:** Have Claude read an Information Memorandum and review it from the perspective of a potential buyer.
**Feasibility: EXCELLENT — strongest demo use case**

---

## Files

- `2025 IM - Project Faraday.pdf` — 33 pages, 1.2 MB

## Document Profile

- **Format:** Professional M&A document, text-based PDF (fully searchable, not scanned)
- **Language:** Dutch
- **Quality:** High — color graphics, organizational charts, timelines, financial tables
- **Size:** Compact at 33 pages, well within Claude's context window

## Document Structure

| Section | Pages | Content |
|---------|-------|---------|
| Introduction | ~5 | Transaction overview |
| Company Information | 8–22 | Legal structure, operations, organization, personnel, history |
| Market Information | 23–26 | Industry context, trends, forecasts |
| SWOT Analysis | 27 | Strengths, weaknesses, opportunities, threats |
| Financial Information | 29–32 | Historical P&L, balance sheet, normalized figures, latest estimates |
| Disclaimer | 33 | Standard legal disclaimer |

## Key Financial Data in the IM

- **Revenue:** ~EUR 7.5M (2024)
- **EBITDA:** ~EUR 2.3M (2024)
- **Normalizations:** 8 detailed adjustments including owner salary, children roles, facility costs, provisions
- **Balance sheet:** Snapshots at 31-12-2023, 31-12-2024, 30-6-2025
- **Latest Estimate:** 2025 P&L projecting EUR 7.4M revenue
- **Headcount:** 27 FTE with detailed turnover and age distribution

## What Claude Can Deliver (Buyer's Perspective)

### Financial Health Assessment
- Revenue trends and growth trajectory
- Margin analysis (gross, EBITDA, net)
- Working capital needs and cash conversion
- Reasonableness of the 8 normalization adjustments

### Operational Assessment
- Staff structure and key-person dependency
- Service offerings and competitive positioning
- Geographic footprint and market reach

### Risk Identification
- Customer concentration risk
- Key-man / management dependency
- Labor shortage exposure (relevant in Dutch market)
- Regional dependency
- Sustainability of growth assumptions

### Deal Mechanics
- Transaction structure evaluation
- Normalization adjustment scrutiny
- 2025 forecast reasonableness vs. historical performance

### Missing Information
- What a buyer would typically expect to see that's not in the IM
- Areas requiring further due diligence

## Challenges

**Essentially none.** This is the ideal use case for Claude:
- Document is compact (33 pages), well-organized, text-based
- File size is negligible (1.2 MB)
- No scanned images or handwritten notes
- Tables and charts are clearly formatted
- Rich enough content for substantive analysis

## Questions for Bram

- What level of depth does Crowe typically provide in a buyer review? (High-level red flags vs. detailed clause-by-clause?)
- Does Crowe have a standard buyer due diligence framework or checklist they use?
- Should Claude comment on the quality/completeness of the IM itself?
- Is there a specific buyer profile to assume? (Strategic buyer vs. financial buyer changes the lens)

## Recommended Demo Approach

1. **Upload the full IM** to Claude
2. **Ask a single, open-ended prompt:** "Review this Information Memorandum from the perspective of a potential buyer. Identify key risks, areas of concern, questions you would want answered in due diligence, and an assessment of the financial normalizations."
3. **Let Claude produce a comprehensive review** — this typically takes 1–2 minutes and produces impressive output
4. **Follow up with targeted questions:** "What's the biggest risk you see?" or "Are the normalization adjustments reasonable?"
5. **Show iterative depth:** Ask Claude to drill into specific sections (e.g., "Analyze the customer concentration risk in more detail")

This is the best "wow moment" for the session — a 33-page M&A document analyzed in minutes with substantive, professional-grade insights.
