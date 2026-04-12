# Use Case 2: Biedingsbrief en Term Sheet (Discrepancy Check)

**Goal:** Upload a bid letter (NBO) and term sheet, and have Claude identify discrepancies between them.
**Feasibility: HIGH — second-strongest demo use case**

---

## Files

- `Getekende NBO Van Grunsven.pdf` — 3 pages, dated 24 January 2026
- `Getekende Term Sheet Van Grunsven.pdf` — 9 pages, dated 25 February 2026

Both are clean, text-based PDFs with signatures.

## Document Summaries

### NBO (Non-Binding Offer) — 3 pages
- **Purchase price:** EUR 18,000,000 (maximum including earn-out)
- **Structure:** Newco holds 90% (Bruhold 5%, Berthold 5%)
- **Earn-out:** EUR 4,150,000 maximum (2026–2028), based on EBITDA targets (EUR 3.5M threshold/year)
- **Working capital:** Positive adjustment to be determined post-closing
- **Management fee:** EUR 230,000 annually from 1 January 2027
- **Closing:** 1 June 2026
- **Economic ownership:** 1 January 2026
- **Minor handwritten annotations and signatures**

### Term Sheet — 9 pages
- **Purchase price:** EUR 18,000,000 on a cash-and-debt-free basis
- **Earn-out:** EUR 4,000,000 maximum (2026–2028), same EBITDA structure (EUR 3.5M threshold)
- **Working capital:** Minimum EUR 500,000 required by 31 December 2025
- **Warranties:** Extensive reps & warranties with caps (EUR 15,000–100,000 baskets)
- **Warranty liability cap:** 10% of purchase price (EUR 1.4M)
- **Non-compete:** 2 years post-closing
- **Closing conditions:** Detailed due diligence, ACM (Anti-Cartel Authority) approval
- **Management fee:** EUR 260,000 annual fee for directors
- **Timeline:** Week 9 to week 24 of 2026

## Discrepancies Already Identified

Claude's preliminary analysis already flagged these concrete discrepancies:

### 1. Earn-out Maximum
- **NBO:** EUR 4,150,000
- **Term Sheet:** EUR 4,000,000
- **Gap:** EUR 150,000 — needs clarification on which prevails

### 2. Management Fee
- **NBO:** EUR 230,000/year
- **Term Sheet:** EUR 260,000/year
- **Gap:** EUR 30,000/year — different amounts, possibly different scope

### 3. Working Capital Treatment
- **NBO:** Mentions "overige liquide middelen" dividend post-closing (excess cash distribution)
- **Term Sheet:** Requires minimum EUR 500,000 positive working capital by 31 Dec 2025
- **Conflict:** Different approaches to working capital — NBO is more seller-friendly

### 4. Earn-out Payment Timing
- **NBO:** "Within 30 days" of year-end accounts
- **Term Sheet:** 6-month detail period post-closing, allows disputes
- **Difference:** Significant timing and dispute mechanism gap

### 5. Warranties & Indemnification
- **NBO:** Silent on warranties
- **Term Sheet:** Adds comprehensive warranty framework with 10% purchase price liability cap (EUR 1.4M)
- **Structural addition:** Entirely new risk allocation not present in NBO

### 6. Non-compete
- **NBO:** Silent
- **Term Sheet:** 2-year non-compete with detailed provisions
- **Addition:** New obligation for sellers

### 7. Closing Conditions
- **NBO:** Lacks specifics
- **Term Sheet:** Detailed DD timeline and ACM approval required
- **Gap:** Significant additional conditionality

## Context Note

The 1-month gap between documents (24 Jan NBO → 25 Feb Term Sheet) means some evolution is expected and intentional. Claude should distinguish between:
- **Intentional refinements** (normal deal progression from NBO to Term Sheet)
- **Actual discrepancies** (conflicting terms that need resolution)
- **Structural additions** (new provisions in Term Sheet not contemplated in NBO)

## Questions for Bram

- Is the goal just to flag discrepancies, or also to assess which version is more favorable to which party?
- Should Claude produce a comparison matrix, a narrative analysis, or both?
- Are there other document pairs (e.g., SPA vs. Term Sheet) they'd want to compare in practice?
- How does Crowe currently do this comparison? (Manual side-by-side review?)

## Recommended Demo Approach

1. **Upload both documents** to Claude
2. **Ask:** "Compare this NBO and Term Sheet. Identify all discrepancies, contradictions, and terms present in one but absent from the other."
3. **Claude produces a structured comparison** with the specific findings above
4. **Follow up:** "Which of these discrepancies favors the buyer vs. the seller?"
5. **Highlight the EUR 150K earn-out gap** — this is the kind of concrete finding that immediately demonstrates value

This is an extremely compelling demo because the discrepancies are real, specific, and verifiable. Crowe's M&A team will immediately recognize the value of catching these automatically.
