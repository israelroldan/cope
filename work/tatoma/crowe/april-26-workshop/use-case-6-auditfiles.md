# Use Case 6: Auditfiles (XAF Analysis)

**Goal:** Upload audit files and have Claude flag notable items and suggest potential normalizations for M&A due diligence.
**Feasibility: MEDIUM (requires preprocessing)**

---

## Files

- `1.1.1 AuditFile2022V3_2_766538.xaf` — 63 MB
- `1.1.2 AuditFile2023V3_2_766538.xaf` — 76 MB
- `1.1.3 AuditFile2024V3_2_766538.xaf` — 86 MB
- `1.1.4 AuditFile2025V3_2_766538.xaf` — 88 MB

## Data Profile

| Year | File Size | Transactions | GL Lines | Subledger Lines |
|------|-----------|-------------|----------|-----------------|
| 2022 | 63 MB | 13,383 | 66,730 | 13,078 |
| 2023 | 76 MB | 17,202 | 83,919 | 16,401 |
| 2024 | 86 MB | 19,243 | 95,509 | 19,064 |
| 2025 | 88 MB | 20,077 | 98,694 | 19,724 |

**Growth trajectory:** ~50% increase in transaction volume from 2022 to 2025.

## XML Structure (XAF 3.2 Standard, Exact Online)

- **Header:** Fiscal year, date range, currency (EUR)
- **Company data:** KleurRijker B.V., Amersfoort
- **Journals:** 15 types (Kasboek, Bankboek, etc.) with transaction postings
- **Customers/Suppliers:** ~16,800 per year
- **Accounting periods:** 13 per fiscal year
- **General Ledger:** Full account postings with GL codes (0830, 1000–1503, etc.)
- **Subledger:** Invoice references, customer/supplier IDs, document references, narrative descriptions

## The Context Window Challenge

Individual files are **far too large** to upload directly into Claude's context window:
- A single 2025 file with ~99K GL lines would consume roughly 800K+ tokens
- Claude's context window cannot handle this raw

### Solution: Preprocessing

Write a Python script to extract targeted subsets. For M&A normalization purposes, the most valuable filters:

1. **All manual journal entries** with narratives (flag human interventions)
2. **Non-routine transactions** above a threshold (e.g., > EUR 5,000)
3. **Period-end entries** (closing adjustments, accruals)
4. **Year-over-year account balance comparisons** (trend analysis)
5. **Related-party transactions** (if identifiable from GL codes)
6. **Summary by GL account** (aggregated balances per period)

## What Claude Can Identify

### Notable Items
- Unusual transactions (large amounts, round numbers, manual entries)
- Entries near fiscal year-end (potential earnings management)
- Corrections and reversals
- Duplicate entries (one subledger narrative already says "Dubbel ingeboekt" = double-booked)
- Missing supporting documents (empty docRef fields)

### Potential Normalizations
- Owner/management compensation adjustments
- One-off costs or income
- Related-party transaction adjustments
- Accrual timing differences
- Non-recurring expenses flagged by narrative descriptions

### Cross-Year Analysis
- Revenue and cost trends across 4 years
- Customer/supplier concentration changes
- Account balance anomalies (sudden jumps or drops)

## Questions for Bram

- Does Crowe Foederer have a standard normalization checklist they use for M&A?
- What GL account codes correspond to management fees, related-party transactions, and one-off items?
- Are they comfortable with a preprocessing step, or do they expect "drag and drop"?
- What threshold amounts are meaningful for their due diligence? (> EUR 5K? > EUR 10K?)
- Can they provide an example of a normalization analysis they've done manually, for benchmarking?

## Recommended Demo Approach

1. **Before the session:** Prepare a Python preprocessing script that extracts key subsets from XAF files
2. **Show the raw data challenge** — "here's an 88MB file with 99K lines"
3. **Demonstrate the preprocessing** — extract manual entries, large transactions, period-end adjustments
4. **Upload the filtered subset** to Claude and show the analysis
5. **Highlight cross-year comparison** — this is where the real value lies for M&A

## Technical Note: Preprocessing Script Outline

```
Input: 4 XAF files (2022–2025)
Process:
  - Parse XML structure
  - Extract GL line items with: date, amount, debit/credit, account code, description, journal type
  - Filter by: manual entries, amount > threshold, period 13 (closing), specific account codes
  - Aggregate: balance by account by year, transaction counts by journal type
Output: CSV or markdown summary suitable for Claude's context window
```

This script should be prepared before the session so the demo runs smoothly.
