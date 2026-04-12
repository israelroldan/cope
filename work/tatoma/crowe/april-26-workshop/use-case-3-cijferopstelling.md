# Use Case 3: Cijferopstelling (P&L and Balance Sheet)

**Goal:** Fill a financial statements template with data extracted from annual reports.
**Feasibility: HIGH**

---

## Files

- **Template:** `Template cijferopstellingIM.xlsx`
- **Source data:**
  - `KleurRijker BV 2023.pdf`
  - `KleurRijker BV 2024.pdf`
  - `KleurRijker BV 2025 concept.pdf`

## Template Structure

The Excel template contains 5 worksheets:

### Sheet 1: W&V (Income Statement — Historical)
- Columns: Label, 2020, 2021, 2022, 2023
- ~25–30 rows of financial line items (revenue, COGS, gross profit, personnel costs, operating costs, EBITDA, etc.)
- Many rows contain formulas for automatic calculation (margins, growth rates)
- Data entry fields are empty, waiting for input

### Sheet 2: W&V Prognose (Income Statement — Forecast)
- Columns: Label, 2025, 2026, 2027, 2028
- Same structure as historical sheet
- No source data available for these years in the annual reports

### Sheet 3: Balans (Balance Sheet)
- 4 columns for year-end dates (2020-12-31 through 2023-12-31)
- Assets, liabilities, and equity sections with subtotal formulas

### Sheet 4–5: Klanten & Leveranciers (Customers & Suppliers)
- Top 10–18 customer/supplier rankings by revenue/purchases
- Multi-year comparisons (2021–2023)

## Annual Report Format

All three PDFs are:
- **Text-based** (not scanned) — full text extraction possible
- **Standard Dutch RJ format** (Richtlijnen Jaarverslaggeving)
- **Consistent structure:** Cover, Table of Contents, Audit Report, Financial Results, Balance Sheet, P&L, Detailed Notes
- **Multi-year:** Each report shows 2 years side-by-side (e.g., 2025 vs 2024)

Key extractable data points: netto-omzet (net revenue), brutowinst (gross profit), personnel costs (lasten uit hoofde van personeelsbeloningen), operating costs breakdown, balance sheet line items.

## Feasibility Assessment

Claude can reliably extract **80–90% of template fields** directly from the PDFs. The remaining 10–20% falls into these gaps:

### What works well
- Main P&L line items (revenue, COGS, gross profit, operating costs, net profit)
- Balance sheet items (fixed assets, current assets, equity, liabilities)
- Data is cleanly formatted in structured tables with EUR amounts

### Gaps and challenges
1. **Customer/supplier rankings** are not in the annual reports — would need accounting data (possibly extractable from the audit files in use case 6 — Auditfiles)
2. **Forecast section (2025–2028)** has no source data; requires external assumptions or trend-based projections
3. **Line item mapping:** Some template rows (e.g., "Management fee", "Pensioenlasten") may not map 1:1 to annual report categories — requires accounting knowledge to interpret
4. **Aggregation:** Some report items need to be combined or split to match template structure (e.g., "Overige Kosten")

## Questions for Bram

- Do the annual reports follow the exact same chart of accounts year over year?
- For the customer/supplier sheets: should we extract that data from the audit files instead?
- Should Claude attempt trend-based forecasts for the prognose sheet, or leave it blank?
- Is there a mapping guide between their internal cost categories and the template line items?

## Recommended Demo Approach

1. Upload the template + one annual report (e.g., 2024)
2. Ask Claude to extract and map the financial data
3. Show the filled template, highlighting what was automated vs. what needs human review
4. Then do all 3 years to show scalability
