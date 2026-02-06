# AI Readiness Report: Microsoft Power BI

**Client**: Asito (part of ADG)
**Date**: February 5, 2025
**Focus Area**: Business Intelligence, Dashboards, Data Visualization

---

## Executive Summary

Microsoft Power BI has **Copilot** deeply integrated as its AI assistant – the same technology powering Microsoft 365. Power BI Copilot transforms business intelligence through natural language report creation, automated DAX query generation, conversational data analysis, and intelligent report summaries. A major 2025 update introduced **Standalone Copilot** – allowing users to query any data they have access to across all reports and semantic models. AFAS has announced **full transition to Power BI** (ending Qlik support December 2025), making Power BI the strategic BI choice for AFAS customers like Asito. Copilot requires **Fabric F2+ or Premium P1+ capacity** – it's not available with Power BI Pro alone.

---

## Branded AI Assistant

| Attribute | Details |
|-----------|---------|
| **Name** | **Copilot** (Microsoft Fabric Copilot) |
| **Status** | Generally Available (Report Copilot); Preview (Standalone Copilot) |
| **Positioning** | "AI assistant that transforms how you work with data" |
| **Pricing** | Included in Fabric capacity (F2+) or Premium (P1+) – no additional AI cost currently |
| **Prerequisites** | Fabric F2+ or Power BI Premium P1+ capacity; Pro license insufficient |
| **Regional Availability** | Requires supported Fabric region; data movement settings for non-US/EU |

---

## AI Capabilities (What Power BI Copilot CAN Do)

### 1. Report Creation & Editing

Create and modify reports using natural language:

- **Generate entire report pages** from prompts in seconds
- **Smart visual recommendations** – Copilot selects best chart types automatically
- **Flexible editing** – add, change, or delete visuals through conversation
- **Undo/redo support** – reverse Copilot actions easily
- **Topic suggestions** – Copilot evaluates data and suggests report outlines

> **Demo-ready use case**: "Create a report page showing monthly revenue trends, regional comparisons, and top 5 products" – Copilot generates the complete page with appropriate visuals.

### 2. DAX Query Generation

Copilot assists with Data Analysis Expressions:

- **Natural language to DAX** – describe calculations, get working DAX code
- **DAX explanation** – understand complex existing queries
- **Integrated experience** – no copy/paste needed; works directly in Power BI Desktop
- **Syntax validation** – DAX parser ensures queries are valid
- **Developed with DAX authors** – contains Microsoft's expert examples

> **Demo-ready use case**: "Write a DAX measure that calculates year-over-year growth percentage for revenue" – Copilot generates the measure with correct syntax.

### 3. Chat with Your Data (Standalone Copilot)

New full-page conversational experience (Preview):

- **Query any data** – not limited to current report; access all reports and models
- **Natural language questions** – "Which region performed best last quarter?"
- **Visual-backed answers** – responses include charts and visuals
- **Intelligent filtering** – applies filters automatically based on context
- **Mobile support** – full chat experience from mobile homepage

> **Demo-ready use case**: Open standalone Copilot, ask "What were our sales in 2024 compared to 2023?" – Copilot finds the right report, applies filters, and returns a visual comparison.

### 4. Report Summaries & Narratives

Automated documentation and communication:

- **Generate report summaries** – create narratives about entire reports or specific pages
- **Subscription email summaries** – Copilot insights embedded in scheduled emails
- **Key insight highlighting** – automatically surfaces important findings
- **Selective summarization** – choose specific visuals to summarize

> **Demo-ready use case**: Generate a summary for a monthly HR dashboard that highlights absence trends, FTE changes, and turnover metrics – ready for management review.

### 5. Semantic Model Building

Create and maintain data models with AI:

- **Build models with natural language** – create tables, columns, measures, relationships
- **Bulk operations** – rename, refactor, translate, or document hundreds of objects
- **Measure descriptions** – auto-generate documentation for measures
- **Linguistic modeling** – suggest synonyms for fields to improve Q&A results

> **Demo-ready use case**: "Add a measure that calculates average absence rate per department" – Copilot creates the measure and adds it to the model.

### 6. AI Data Preparation

Optimize data for Copilot accuracy:

- **AI Data Schema** – curate subset of fields for Copilot to focus on
- **Verified answers** – pre-approve responses for common questions
- **AI instructions** – guide Copilot behavior for specific models
- **Filter inheritance** – verified answers now capture full visual state

---

## AI Limitations (What Power BI Copilot CAN'T Do)

| Limitation | Details |
|------------|---------|
| **Requires Fabric/Premium capacity** | Pro license alone insufficient – need F2+ or P1+ |
| **Not on trial SKUs** | Trial capacities don't support Copilot |
| **No PPU support** | Premium Per User workspaces not supported |
| **No sovereign clouds** | Not available in government clouds (GPU availability) |
| **Regional restrictions** | Requires data movement settings for non-US/EU tenants |
| **Admin must enable** | Copilot off by default; admin activation required |
| **English-first** | Limited support for other languages; English recommended |
| **Data prep required** | Models need AI preparation for accurate results |
| **Single Copilot capacity** | Only one Fabric Copilot capacity per user |
| **Embedded mode excluded** | Capacities with Embedded license not supported |

---

## Demo-Ready Use Cases

### Use Case 1: Natural Language Report Creation
**Source**: Microsoft Learn
**Description**: Describe what you want ("Create a sales dashboard with regional breakdown and monthly trends") and Copilot generates a complete report page with appropriate visuals, layouts, and formatting.
**Link**: [Create Reports with Copilot](https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-create-reports)

### Use Case 2: DAX Query Assistant
**Source**: Microsoft Learn DAX Copilot
**Description**: Ask Copilot to write complex DAX measures in plain English. Example: "Calculate running total of sales year-to-date" – Copilot generates the correct DAX with time intelligence functions.
**Link**: [Write DAX with Copilot](https://learn.microsoft.com/en-us/dax/dax-copilot)

### Use Case 3: Ask Anything (Standalone Copilot)
**Source**: Power BI May 2025 Update
**Description**: Full-page chat experience where users can ask questions about any data they have access to. Copilot finds the right report, applies filters, and returns visual answers – no manual navigation required.
**Link**: [Standalone Copilot Preview](https://powerbi.microsoft.com/en-us/blog/power-bi-may-2025-feature-summary/)

### Use Case 4: Automated Report Summaries
**Source**: Microsoft Learn
**Description**: Generate AI-written narratives about report pages for stakeholder communication. Summaries can be embedded in subscription emails for instant context.
**Link**: [Copilot Report Summaries](https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-introduction)

### Use Case 5: Bulk Model Documentation
**Source**: Power BI Copilot Overview
**Description**: Document hundreds of measures and columns in seconds. Copilot generates descriptions, suggests synonyms, and improves model discoverability for report builders.
**Link**: [Semantic Model Copilot](https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-semantic-models)

---

## AFAS Integration (Critical for Asito)

### AFAS Strategic Shift to Power BI

**Important**: AFAS has announced full transition to Power BI, ending Qlik support as of **December 1, 2025**. Power BI is now AFAS's strategic BI platform.

### Connection Methods

| Method | Description | Complexity |
|--------|-------------|------------|
| **GetConnector (Native)** | AFAS standard OData connection to Power BI | Low |
| **BI OData Connector** | Optimized connector for BI tools; no production impact | Medium |
| **Power BI Connector (Davista)** | Third-party connector with predefined tables | Low |
| **DutchGrit OData Server** | Free desktop app bridging Power BI and AFAS | Low |
| **Peliqan** | Instant data warehouse for AFAS → Power BI | Medium |

### Pre-Built HR Dashboard Template

AFAS provides a Power BI template dashboard **"HR Data"** that includes:
- KPIs (Kengetallen)
- FTE/Headcount and turnover
- Contracts management
- Absence tracking
- Leave and leave corrections
- Staffing overview
- Anniversaries
- Vacancies
- CSR indicators

### Setup Steps

1. In AFAS: General → Exports → Management → GetConnector
2. Select desired data collection (e.g., HR, Payroll, Finance)
3. Name your GetConnector
4. Apply filters to limit data transfer
5. Connect Power BI using OData or connector
6. Build dashboards or use AFAS templates

### Integration Architecture for Asito

```
AFAS (Jonas AI) → GetConnector / OData
       ↓
Power BI (Copilot) → Dashboards, Reports, AI Analysis
       ↓
       ├── HR Reports (absence, turnover, FTE)
       ├── Finance Reports (payroll, costs)
       ├── Operations Reports (from ORTEC/Appreo data)
       └── Executive Dashboards
```

---

## Customer Sentiment

### What Users Love

- **"Ease of use yet very powerful"** – intuitive interface with advanced capabilities
- **"Good tool for majority of use cases"** – meets most organizational BI needs
- **Copilot improvements** – smarter visuals, better filtering, more flexibility
- **AFAS native integration** – standard GetConnector makes connection straightforward
- **Mobile experience** – full Copilot chat available on mobile

### What Users Find Challenging

- **"Additional license fees for Copilot"** – requires Fabric/Premium capacity
- **"Pricing has significantly increased"** – some long-term customers report cost changes
- **Data preparation required** – models need AI prep for accurate Copilot results
- **Language limitations** – works best in English; other languages limited
- **Admin enablement** – Copilot off by default; requires IT involvement

### Q&A Deprecation Note

Microsoft deprecated Q&A (legacy natural language tool) – scheduled for removal **December 2026**. Users should transition to Copilot, which offers more advanced generative AI capabilities.

---

## AI Maturity Assessment

| Dimension | Rating | Notes |
|-----------|--------|-------|
| **Native AI Features** | **Very High** | Report creation, DAX generation, chat with data, summaries |
| **AI Accuracy** | High | Improved with AI Data Schema and verified answers |
| **Integration with AFAS** | **Very High** | Native OData support; AFAS strategic BI platform |
| **Documentation Quality** | Very High | Extensive Microsoft Learn resources |
| **Customer Adoption** | High | Growing; AFAS migration driving adoption |
| **Pricing Accessibility** | Medium | Requires Fabric/Premium capacity (not Pro) |

---

## Comparison: Power BI vs. Asito's Other Tools

| Aspect | Power BI | Excel | Dynamics 365 | AFAS |
|--------|----------|-------|-------------|------|
| **Branded AI** | Copilot | Copilot | Copilot | Jonas |
| **AI Type** | BI/Report AI | Formula AI | CRM AI | Workflow AI |
| **Key AI Feature** | Natural language reports, DAX | Formula generation | Sales/Service AI | Speech-to-text |
| **AFAS Integration** | Native (GetConnector) | Export/Import | Via connectors | N/A (source) |
| **Pricing** | Fabric F2+ required | M365 Copilot | M365 Copilot | Included |

---

## Recommended Next Steps for Asito

### Immediate Actions (High Priority)

1. **Assess Current Capacity**
   - Verify if Asito has Fabric F2+ or Premium P1+ capacity
   - If only Power BI Pro, evaluate Fabric capacity upgrade
   - Consider F2 starting tier (~$262/month) for Copilot access

2. **Enable Copilot for Power BI**
   - Ensure admin enables "Users can use Copilot" in Fabric admin portal
   - Enable data movement setting if outside US/EU
   - Test with pilot users before broad rollout

3. **Connect AFAS to Power BI**
   - Set up GetConnectors for HR, Payroll, and Finance data
   - Deploy AFAS HR Dashboard template as starting point
   - Evaluate BI OData Connector for optimized performance

### Strategic Actions

4. **Migrate from Qlik (if applicable)**
   - AFAS ended Qlik support December 2025
   - Plan migration of any existing Qlik dashboards to Power BI
   - Leverage Copilot for faster rebuild

5. **Prepare Data for Copilot**
   - Configure AI Data Schema to curate relevant fields
   - Create verified answers for common stakeholder questions
   - Add AI instructions for business context

6. **Unified BI Strategy**
   - Power BI as central dashboard platform
   - AFAS Jonas for HR workflow AI
   - Power BI Copilot for data exploration and reporting
   - Excel Copilot for ad-hoc analysis

### Facility Services Use Cases

| Use Case | Power BI Copilot Application |
|----------|------------------------------|
| **HR Analytics** | Absence trends, turnover analysis, FTE tracking |
| **Payroll Reporting** | Cost analysis, overtime monitoring, CAO compliance |
| **Operations Dashboards** | ORTEC/Appreo data visualization for managers |
| **Executive Summaries** | AI-generated narratives for leadership |
| **Client Reporting** | SLA performance, service quality metrics |

---

## Pricing Summary

| Option | Price | Copilot Access |
|--------|-------|----------------|
| **Power BI Pro** | ~$10/user/month | ❌ No Copilot |
| **Premium Per User (PPU)** | ~$20/user/month | ❌ No Copilot |
| **Fabric F2** | ~$262/month (capacity) | ✅ Copilot included |
| **Fabric F64** | ~$5,000+/month | ✅ Copilot included |
| **Premium P1** | ~$5,000/month | ✅ Copilot included |

**Note**: Copilot is currently included in Fabric/Premium capacity with no additional AI charges. Microsoft indicates future billing models may be introduced.

---

## Sources

- [Copilot for Power BI Overview](https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-introduction)
- [Create Reports with Copilot](https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-create-reports)
- [Write DAX with Copilot](https://learn.microsoft.com/en-us/dax/dax-copilot)
- [Enable Fabric Copilot](https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-enable-power-bi)
- [Fabric Copilot Capacity](https://learn.microsoft.com/en-us/fabric/enterprise/fabric-copilot-capacity)
- [Power BI May 2025 Update](https://powerbi.microsoft.com/en-us/blog/power-bi-may-2025-feature-summary/)
- [Power BI November 2025 Update](https://powerbi.microsoft.com/en-us/blog/power-bi-november-2025-feature-summary/)
- [Report Copilot Improvements](https://powerbi.microsoft.com/en-us/blog/introducing-improvements-to-the-report-copilot-in-power-bi/)
- [Q&A Deprecation Notice](https://powerbi.microsoft.com/en-us/blog/deprecating-power-bi-qa/)
- [AFAS Power BI Integration](https://klant.afas.nl/thema/power-bi)
- [Connecting AFAS with Power BI](https://procesbouwers.nl/en/business/link-afas-to-power-bi/)
- [Power BI Connector for AFAS](https://www.powerbiconnector.nl/power-bi-connector-voor-afas/)
- [Victa AFAS Connector](https://victabi.com/en/marketplace/afas)
- [Copilot Pricing Guide](https://www.2-data.com/knowledge-hub/a-quick-guide-to-understanding-the-licensing-cost-and-usage-of-microsoft-copilot-for-power-bi)
