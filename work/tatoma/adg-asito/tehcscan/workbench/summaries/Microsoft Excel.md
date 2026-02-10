# Research Overview — Microsoft Excel
**AI Readiness report as part of Asito's IT Landscape**
**Sticky: 🟢 High AI Maturity**

---

## KEY DETAILS

- **Vendor:** Microsoft
- **Owner at Asito:** Cross-functional (Finance, Operations, HR, Management)
- **Used for:** Data organization, ad-hoc analysis, financial modeling, variance analysis — the "middle layer" between raw system data (AFAS/ORTEC) and Power BI reporting
- **Scale:** Ubiquitous — part of standard Microsoft 365 deployment
- **Contract/Licensing:** Part of M365 (E3/E5/Business Std). Copilot add-on: $30/user/month (Enterprise) or $21/user/month (SMB).
- **Deployment:** Hybrid (Desktop/Web/Mobile). AI features require cloud connectivity (OneDrive/SharePoint).
- **Compliance:** SOC 2, ISO 27001, GDPR, HIPAA

---

## API AVAILABILITY AND INTEGRATIONS

- **Data sources:** Imports from AFAS (via GetConnector exports), ORTEC (data exports), and virtually any system via CSV/API
- **Power BI pipeline:** Excel → Power BI for recurring reports; AFAS GetConnector can feed Power BI directly
- **Power Automate:** Automate Excel workflows triggered by events in other systems
- **Python in Excel:** Run pandas, statsmodels, and other Python libraries directly in the grid for advanced analytics
- **Role in ecosystem:**
  - Source: AFAS / ORTEC (System of Truth)
  - Analysis: Excel + Copilot (ad-hoc analysis, cleaning, modeling)
  - Reporting: Power BI (automated dashboards)

---

## OPPORTUNITIES / USE CASES

**Quick wins (ready now):**
- **Payroll Variance Analysis:** Export AFAS payroll data → Copilot identifies anomalies/variances month-over-month
- **Scheduling Analysis:** Analyze ORTEC exports → natural language queries to find coverage gaps, overtime patterns
- **Customer Feedback Classification:** Use `=COPILOT()` function to categorize free-text satisfaction surveys as Positive/Neutral/Negative
- **Data Cleaning:** Automate duplicate removal, column splitting, date standardization on messy exports

**Vision / medium-term:**
- **Agent Mode workflows:** Autonomous multi-step tasks — build tables, write formulas, create charts, self-validate results
- **Financial Modeling:** Agent Mode builds revenue projections from historical Appreo work order data
- **Python in Excel:** Predictive modeling and forecasting directly in the grid (advanced users)

---

## KEY AI CAPABILITIES

- **Primary AI:** Microsoft Copilot (GPT-4o based) embedded in the grid interface
- **Agent Mode (launched late 2025):** Autonomous workflow engine — breaks natural language requests into multi-step plans, builds tables, writes formulas, creates charts, validates results with transparency
- **Natural Language Formulas:** Describe calculations in plain English → Copilot generates correct syntax
- **`=COPILOT()` Function:** Native formula calling AI from a cell — summarize text, classify data, sentiment analysis, generate content (regional availability varies)
- **Automated Insights:** "Analyze Data" feature identifies trends, outliers, patterns without manual intervention
- **Instant Visualization:** Generate charts, PivotTables, dashboards from conversational prompts
- **Data Transformation:** Cleaning (dedup, split, standardize), OCR digitization ("Insert Data from Picture")

---

## KEY LIMITATIONS AND CONSTRAINTS

- **Table formatting required:** Copilot ONLY works on data formatted as Excel Tables (Ctrl+T) — cannot analyze unstructured ranges
- **Cloud dependency:** Files MUST be on OneDrive/SharePoint with AutoSave enabled. Local/network drives not supported for AI.
- **Size limits:** Copilot struggles with tables exceeding ~2M cells and complex workbooks
- **Regional restrictions:** `=COPILOT()` and advanced features may face rollout delays in EU/UK tenants
- **Shadow IT risk:** High risk of "Excel silos" where critical business logic exists only in local files
- **Hallucinations:** AI-generated formulas may contain subtle errors — mandatory verification for financial reporting
- **Non-deterministic:** AI responses can vary on recalculation — not suitable for rigid audit trails without freezing values
- **Not a system of record:** Excel is analysis/bridging layer, not a replacement for AFAS/ORTEC/D365

---

## SHOWCASE

- **Demo: Natural Language Analysis** — Ask "Show me monthly overtime trends by region" on an AFAS export → instant chart
- **Demo: Agent Mode** — "Build a variance analysis comparing this month's payroll to last month" → multi-step autonomous execution
- **Demo: =COPILOT() Classification** — Column of customer feedback → instant Positive/Neutral/Negative classification
- **Reference:** Universal adoption; Agent Mode launched late 2025 as Microsoft's pivot toward agentic workflows
- **Key dependency:** Requires Ctrl+T table formatting + OneDrive storage — critical for pilot setup
