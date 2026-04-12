# Use Case 4: Waarderingsmodel (Valuation Models)

**Goal:** Fill two different valuation model templates with data from annual reports.
**Feasibility: MEDIUM-HIGH**

---

## Files

- **DCF model:** `DCF model.xlsx` (simpler, 2 sheets)
- **ValuePlan:** `2026 ValuePlan.xlsm` (complex, 17 sheets)
- **Source data:** Same 3 annual reports as use case 3 (Cijferopstelling)

## DCF Model Structure

### Sheet 1: Prognose (Forecast/P&L)
- 240 rows covering historical (2022–2024) and forecast columns
- Key inputs needed: revenue, COGS, personnel costs (salaries, social charges, pensions), operating costs, D&A, tax rate (currently 25%)
- EBITDA, EBIT, net profit are formula-calculated

### Sheet 2: WACC
- Build-up method with inputs for: risk-free rate (2.72%), market premium (5%), size premium (5.59%)
- 8 BDO company-specific risk criteria: illiquidity, customer concentration, supplier dependence, management dependency, activity diversification, market barriers, track record, flexibility
- All aggregation is formula-driven

**Assessment:** Straightforward for Claude. Historical financials can be extracted from the annual reports. WACC parameters require judgment but are clearly labeled inputs.

## ValuePlan Structure

### Overview
- **17 interdependent sheets** with monthly and annual detail
- **No VBA macros detected** — despite being .xlsm, it's formula-only
- Bilingual support (Dutch/English toggle in Menu!E9)

### Key Sheets
- **Menu:** Master data (company info, settings)
- **Forecast:** Monthly & annual revenue, COGS, gross margin, personnel, opex, capex, working capital
- **Cost of Capital:** WACC calculation with debt/equity weighting
- **Sensitivity:** Multi-period sensitivity analysis
- **LBO-specific sheets:** Debt covenants, leverage ratios
- **Report/Valuation/Financing:** Output sheets with cascading formulas

### Inputs Required
- Revenue forecast (monthly & annual by product/department)
- COGS & gross margin assumptions
- Personnel costs breakdown
- Operating expenses by category
- CapEx and working capital adjustments
- Debt structure, interest rates
- Tax rates

**Assessment:** More challenging due to 17 interdependent sheets. Precise cell placement is critical — one wrong input could cascade errors. However, the lack of macros is good news.

## Feasibility Assessment

### DCF Model
**HIGH feasibility.** Simple 2-sheet structure, clear input cells, formulas handle all calculations. Claude extracts historicals from PDFs and fills the input fields.

### ValuePlan
**MEDIUM feasibility.** The complexity creates risk:
- 17 sheets with dependency chains
- Monthly detail requires more granular data than annual reports provide
- Language switching logic adds a layer of complexity
- Need to ensure inputs land in exactly the right cells

## Data Gaps

Both models share the same gaps:
1. **Forecast assumptions:** Reports provide historicals only; models expect multi-year projections
2. **WACC/risk parameters:** Size premium, company-specific risk premiums require business judgment — not available in reports
3. **Monthly granularity:** ValuePlan expects monthly data; annual reports only provide yearly figures

## Questions for Bram

- Should Claude fill only historical data, or also propose forecast assumptions based on trends?
- For the WACC: does Bram have standard risk premium ranges they use, or should Claude suggest values?
- For the ValuePlan: which sheets are highest priority? (We may want to focus on key input sheets rather than all 17)
- Is the goal to demonstrate feasibility, or to produce a fully working model?

## Recommended Demo Approach

1. **Start with the DCF model** — simpler, faster, more impressive per unit of effort
2. Show historical data extraction from one annual report into the Prognose sheet
3. Discuss WACC inputs interactively (Claude suggests, human confirms)
4. **Then mention the ValuePlan** — show its structure, explain the approach for a more complex model
5. If time allows, demonstrate filling the Menu and core Forecast sheet of the ValuePlan
