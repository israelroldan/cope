# AI Readiness Report: Microsoft Excel

**Client**: Asito (part of ADG)
**Date**: February 5, 2025
**Focus Area**: Spreadsheets, Data Analysis, Reporting

---

## Executive Summary

Microsoft Excel has **Copilot** deeply integrated as its AI assistant – the same technology powering Microsoft 365 Copilot. Excel Copilot transforms spreadsheet work through natural language formula generation, automated data analysis, chart creation, and PivotTable building. A major update in late 2025 introduced **Agent Mode** – an agentic workflow that can plan, execute, and validate multi-step spreadsheet tasks autonomously. Excel Copilot is included in the **Microsoft 365 Copilot license at $30/user/month** (or $21/user/month for SMB). However, users report mixed experiences – particularly with accuracy issues and the requirement that data must be in table format and saved to OneDrive/SharePoint.

---

## Branded AI Assistant

| Attribute | Details |
|-----------|---------|
| **Name** | **Copilot** (Microsoft 365 Copilot) |
| **Status** | Generally Available (GA) – Agent Mode rolling out Dec 2025-Feb 2026 |
| **Positioning** | "AI-powered assistant that transforms how you work with data" |
| **Pricing** | $30/user/month (M365 Copilot) or $21/user/month (SMB) |
| **Prerequisites** | Microsoft 365 E3/E5 or Business Standard/Premium; files on OneDrive/SharePoint |
| **Regional Availability** | COPILOT function not yet available in EU/UK |

---

## AI Capabilities (What Excel Copilot CAN Do)

### 1. Formula Generation & Assistance

Excel Copilot's most practical feature is translating natural language into Excel formulas:

- **Natural language to formula** – describe calculations in plain English
- **Formula autocomplete** – context-aware suggestions as you type "="
- **Syntax handling** – no need to memorize complex functions like AVERAGEIFS vs AVERAGEIF
- **Error explanation** – understand why formulas aren't working

> **Demo-ready use case**: Type "Calculate revenue growth rate quarter over quarter" and Copilot generates the appropriate formula, including correct cell references and syntax.

### 2. Data Analysis & Insights

- **Automated trend identification** – highlights patterns and anomalies
- **Statistical summaries** – quick overview of key metrics
- **Outlier detection** – flags unusual data points
- **Text analysis** – sentiment analysis and keyword extraction from survey responses

> **Demo-ready use case**: Upload employee feedback data, ask "What are the main themes in this feedback?" and Copilot categorizes responses, identifies sentiment, and summarizes key issues.

### 3. Data Visualization

- **Smart chart recommendations** – suggests best visual format (bar, line, pie)
- **Automatic chart creation** – generates charts from natural language requests
- **PivotTable building** – creates PivotTables with appropriate fields and layouts
- **Dashboard generation** – transforms raw data into business-ready visuals

> **Demo-ready use case**: Ask "Show me monthly revenue trends as a line chart" and Copilot creates the visualization instantly, ready for presentation.

### 4. Data Cleaning & Transformation

- **Remove duplicates** automatically
- **Standardize formats** (dates, currencies, text case)
- **Split columns** – separate first/last names, extract dates from timestamps
- **Filter and sort** – apply complex filters through conversation

> **Demo-ready use case**: "Split the full name column into first name and last name" – Copilot handles the transformation without needing to write formulas.

### 5. Agent Mode (December 2025+)

The newest capability – an agentic workflow that:

- **Plans multi-step tasks** – breaks complex requests into steps
- **Executes autonomously** – builds tables, writes formulas, creates charts
- **Validates results** – checks outputs as it progresses
- **Shows transparency** – exposes steps for user review and editing

> **Demo-ready use case**: "Analyze this sales data, create a summary table, add growth calculations, and build a chart showing trends" – Agent Mode handles the entire workflow, showing each step for approval.

### 6. COPILOT Function (Beta)

A new formula function that calls AI directly from cells:

- **=COPILOT(prompt, context)** – generates AI responses in-cell
- **Text summarization** – summarize data in adjacent cells
- **Classification** – tag or categorize content
- **Sample data generation** – create demo data for prototyping

> **Demo-ready use case**: =COPILOT("Classify this feedback as positive, negative, or neutral", A2) – applies AI classification across rows.

### 7. Python Integration (Preview)

- **Advanced analytics** – use Python libraries within Excel
- **Forecasting** – ask "Forecast sales for next 4 quarters" and get Python-powered predictions
- **Statistical modeling** – access libraries not available in native Excel

---

## AI Limitations (What Excel Copilot CAN'T Do)

| Limitation | Details |
|------------|---------|
| **Requires OneDrive/SharePoint** | Files must be cloud-saved with AutoSave enabled; local files not supported |
| **Table format required** | Data must be in Excel Table format (Ctrl+T); standard cell ranges don't work |
| **2 million cell limit** | Cannot process tables larger than 2 million cells |
| **Single sheet focus** | Cannot automatically connect data across multiple sheets/tabs |
| **No Power Query** | Cannot build Power Query steps or advanced ETL workflows |
| **No workbook comparison** | Cannot compare Excel files for differences |
| **Regional restrictions** | COPILOT function not available in EU/UK |
| **Non-deterministic** | May return different results on recalculation |
| **Knowledge cutoff** | Model knowledge limited to before June 2024 |
| **Language bias** | Works best with English prompts and data |
| **Accuracy concerns** | Formulas may have errors – always verify outputs |
| **No confidential files** | Cannot work with files labeled Confidential/Highly Confidential |
| **Response time** | Large tables may take up to 1 minute for operations |

---

## Demo-Ready Use Cases

### Use Case 1: Natural Language Formula Generation
**Source**: Microsoft Support / DataCamp
**Description**: Describe calculations in plain English ("Calculate year-over-year growth percentage") and Copilot generates the correct Excel formula with proper syntax and cell references.
**Link**: [Excel Copilot Tutorial](https://www.datacamp.com/tutorial/excel-copilot-tutorial)

### Use Case 2: Instant Data Visualization
**Source**: Microsoft 365 Life Hacks
**Description**: Ask Copilot to create charts and graphs from your data. Request "Show revenue by region as a bar chart" and get instant visualization.
**Link**: [How to Use AI in Excel](https://www.microsoft.com/en-us/microsoft-365-life-hacks/everyday-ai/time-saving-tips/how-to-use-ai-excel)

### Use Case 3: Employee Feedback Analysis
**Source**: Microsoft Tech Community
**Description**: Upload text-based data (feedback, reviews, survey responses) and ask Copilot to identify themes, sentiment, and key insights – transforming unstructured text into actionable findings.
**Link**: [Analyze Text Insights](https://techcommunity.microsoft.com/blog/microsoft365copilotblog/using-copilot-in-excel-to-analyze-text-insights/4257264)

### Use Case 4: Agent Mode Multi-Step Analysis
**Source**: Microsoft Community Hub
**Description**: Describe a complex task ("Build a financial model with revenue projections, cost analysis, and trend charts") and Agent Mode plans, executes, and validates each step automatically.
**Link**: [Agent Mode Announcement](https://techcommunity.microsoft.com/blog/excelblog/unlock-the-power-of-copilot-in-excel-now-generally-available/4242810)

### Use Case 5: Data Cleaning Automation
**Source**: Sherweb / AbleBits
**Description**: Ask Copilot to clean messy data – remove duplicates, standardize formats, split columns – without writing formulas or using complex menus.
**Link**: [7 Ways to Use Copilot in Excel](https://www.sherweb.com/blog/microsoft-ecosystem/office-365/copilot-for-microsoft-365-can-be-used-in-microsoft-excel/)

---

## Integration with Asito's Stack

### AFAS → Excel/Power BI Reporting

AFAS data can be exported and analyzed in Excel/Power BI:

| Method | Description |
|--------|-------------|
| **AFAS GetConnector** | Direct API connection to Power BI using AFAS REST services |
| **Dataddo** | Third-party ETL platform for automated AFAS → Excel/Power BI sync |
| **Manual Export** | Export AFAS reports to Excel for Copilot analysis |
| **Power Query** | Connect Excel/Power BI to AFAS for automated refresh |

### Potential Workflow for Asito

```
AFAS (Jonas AI) → Export HR/Payroll data
       ↓
Excel (Copilot) → Analyze, visualize, clean data
       ↓
Power BI → Dashboard reporting
       ↓
Stakeholder Presentations
```

### Facility Services Use Cases

| Use Case | Excel Copilot Application |
|----------|--------------------------|
| **Employee scheduling analysis** | Analyze ORTEC export data for coverage patterns |
| **Payroll variance analysis** | Review AFAS payroll exports for anomalies |
| **Customer feedback analysis** | Categorize and summarize client satisfaction surveys |
| **Cost tracking** | Build financial models from Appreo work order data |
| **KPI dashboards** | Create visual summaries for management reporting |

---

## Customer Sentiment

### What Users Love

- **"Copilot is especially useful for people who don't use Excel regularly"** – provides quick data overviews
- **"Generating formulas is Copilot's most practical use case"** – eliminates syntax memorization
- **"Saves hours on data analysis"** – automated trend identification and visualization
- **Agent Mode transparency** – shows steps for review, keeping users in control

### What Users Find Challenging

- **"Copilot in Excel is the worst with constantly providing inaccurate information"** – formula errors reported
- **"Falls flat on actually performing tasks"** – sometimes gives instructions instead of executing
- **"Failed to understand context"** – generic responses to specific questions
- **"Intrusive pop-ups"** – Copilot ads appear every time Excel opens
- **"Table format requirement is an extra step"** – forces data restructuring
- **Language limitations** – some users could only use Copilot in English

### Trustpilot Sentiment

Mixed reviews on Trustpilot for Microsoft Copilot overall, with Excel-specific complaints about accuracy and the OneDrive/table requirements.

### Productivity Claims (Microsoft)

- **70%** report being more productive
- **68%** say work quality improved
- **64%** spend less time processing data

---

## AI Maturity Assessment

| Dimension | Rating | Notes |
|-----------|--------|-------|
| **Native AI Features** | **High** | Formula generation, analysis, visualization, Agent Mode |
| **AI Accuracy** | Medium | User reports of formula errors; always verify outputs |
| **Integration Ecosystem** | High | Power BI, OneDrive, SharePoint, Teams |
| **Documentation Quality** | Very High | Extensive Microsoft Learn resources |
| **Customer Adoption** | Medium-High | Growing but mixed user sentiment |
| **Regional Compliance** | Medium | COPILOT function not available in EU/UK |

---

## Comparison: Excel vs. Asito's Other Tools

| Aspect | Excel | Dynamics 365 | AFAS | HubSpot | ORTEC |
|--------|-------|-------------|------|---------|-------|
| **Branded AI** | Copilot | Copilot | Jonas | Breeze | TESSA |
| **AI Type** | Formula/Analysis AI | CRM AI | Workflow AI | Generative content | ML scheduling |
| **Key AI Feature** | Natural language formulas | Sales/Service AI | Speech-to-text | Content generation | Optimization |
| **Data Focus** | Spreadsheet analysis | Customer relationships | HR/Payroll | Marketing | Workforce planning |
| **Pricing** | $30/user/month | $30/user/month | Included | Included | Varies |

---

## Recommended Next Steps for Asito

### Immediate Actions

1. **Verify Microsoft 365 License Status**
   - Confirm which Microsoft 365 tier Asito uses
   - Assess if Copilot license ($30/user/month) is active or available
   - Consider SMB pricing ($21/user/month) if <300 users

2. **Test Copilot with AFAS Data**
   - Export AFAS HR/payroll data to Excel
   - Convert to table format (Ctrl+T)
   - Save to OneDrive/SharePoint
   - Test Copilot for variance analysis and trend identification

3. **Pilot Use Cases**
   - Start with low-risk analysis tasks
   - Always verify Copilot-generated formulas
   - Document accuracy issues and successful applications

### Strategic Actions

4. **AFAS → Power BI Pipeline**
   - Evaluate GetConnector API for automated AFAS → Power BI reporting
   - Consider Dataddo for real-time sync
   - Build dashboards combining AFAS, ORTEC, and Appreo data

5. **Employee Training**
   - Train finance/HR staff on Copilot capabilities
   - Emphasize verification of AI outputs
   - Create prompt templates for common tasks

6. **Cross-Tool AI Strategy**
   - Excel Copilot for ad-hoc analysis and reporting
   - AFAS Jonas for HR workflow automation
   - Power BI for automated dashboards
   - ORTEC data for workforce analytics

### Caution Areas

7. **Accuracy Verification**
   - Never use Copilot outputs for financial reporting without manual verification
   - Double-check formulas for payroll and compliance calculations
   - Use native Excel formulas for high-stakes calculations

8. **Regional Limitations**
   - COPILOT function (=COPILOT()) not available in EU/UK
   - Plan accordingly if Asito operates in these regions

---

## Pricing Summary

| Option | Price | Includes |
|--------|-------|----------|
| **Microsoft 365 Copilot** | $30/user/month | Copilot across Word, Excel, PowerPoint, Outlook, Teams |
| **Copilot Business (SMB)** | $21/user/month | For organizations <300 users |
| **Free Copilot Chat** | $0 | Limited – daily image generation limits, no full Excel integration |

**Note**: Requires Microsoft 365 E3/E5 or Business Standard/Premium as prerequisite.

---

## Sources

- [Excel Copilot Now Generally Available](https://techcommunity.microsoft.com/blog/excelblog/unlock-the-power-of-copilot-in-excel-now-generally-available/4242810)
- [Get Started with Copilot in Excel](https://support.microsoft.com/en-us/office/get-started-with-copilot-in-excel-d7110502-0334-4b4f-a175-a73abdfc118a)
- [Excel Copilot FAQ](https://support.microsoft.com/en-us/office/frequently-asked-questions-about-copilot-in-excel-7a13758f-d61e-4a56-8440-f2c9a07802ec)
- [Excel Copilot Complete Guide 2025](https://excelmaster.ai/blog/microsoft-ai-excel-copilot-complete-guide-2025)
- [COPILOT Function Reference](https://support.microsoft.com/en-us/office/copilot-function-5849821b-755d-4030-a38b-9e20be0cbf62)
- [Copilot in Excel Features and Limitations](https://www.dev4side.com/en/blog/copilot-in-excel)
- [Excel Copilot Requirements and Limitations](https://sumproduct.com/blog/ai-blog-copilot-in-excel-requirements-and-limitations/)
- [Excel Copilot Review (DataCamp)](https://www.datacamp.com/blog/copilot-in-excel)
- [62 Real World Copilot Use Cases](https://creospark.com/real-world-use-cases-of-copilot-in-microsoft-365/)
- [Microsoft 365 Copilot Pricing](https://www.microsoft.com/en-us/microsoft-365-copilot/pricing)
- [Connecting AFAS with Power BI](https://procesbouwers.nl/en/business/link-afas-to-power-bi/)
- [User Feedback on Copilot](https://techcommunity.microsoft.com/discussions/microsoft365copilot/microsofts-copilot-a-frustrating-flop-in-ai-powered-productivity/4221190)
