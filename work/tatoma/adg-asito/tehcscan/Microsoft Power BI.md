Here is the unified technical assessment for Microsoft Power BI, tailored for Asito based on the provided documentation.

# Microsoft Power BI

**Client:** Asito (part of ADG)
**Status:** ✅ Approved
**Date:** February 6, 2026
**AI Maturity:** High / Very High

---

## 1. Executive Summary

Microsoft Power BI is the approved Business Intelligence platform for Asito, serving as the centralized presentation layer for organizational metrics and insights. The platform has evolved significantly with the integration of **Copilot** (powered by Microsoft Fabric), transforming it from a visualization tool into an AI-assisted analytics partner.

**Strategic Imperative:** This assessment is critical due to AFAS's announcement that they will end Qlik support on **December 1, 2025**. AFAS has designated Power BI as their strategic BI choice, necessitating a migration for customers like Asito.

---

## 2. Tool Profile & Specifications

| Attribute | Details |
| --- | --- |
| **Category** | Analytics & Business Intelligence |
| **Deployment** | Hybrid (Desktop & Cloud) |
| **Agent** | **Copilot** (Microsoft Fabric Copilot) |
| **Compliance** | GDPR, HIPAA, FedRAMP, ISO 27001, SOC 1/2/3 |
| **Data Residency** | Global; configurable via Microsoft Fabric/Azure regions |
| **Languages** | DAX (Data Analysis Expressions), M Formula Language |

---

## 3. AI Capabilities (Copilot & Native)

Power BI rates **Very High** for native AI features, primarily driven by the integration of Copilot and Azure Machine Learning.

### Generative AI: Copilot

*Requires Fabric F2+ or Premium P1+ capacity.*

* **Report Creation:** Users can generate entire report pages, outlines, and smart visuals using natural language prompts (e.g., "Create a sales dashboard with regional breakdown").
* **DAX Query Generation:** Copilot acts as a coding assistant, converting natural language into valid DAX syntax and explaining complex existing queries.
* **Standalone Copilot (Chat with Data):** A full-page conversational experience allowing users to query *any* data they have access to, not just the open report. It returns visual-backed answers and applies intelligent filters.
* **Narrative Summaries:** Automatically generates textual summaries of reports or specific visuals, which can be embedded in subscription emails for stakeholders.
* **Semantic Model Building:** Assists in building data models by creating tables, measures, and relationships via natural language commands.

### Analytical AI

* **Smart Narratives:** Automated text summaries of data trends.
* **Key Influencers:** Visuals that analyze data to determine what factors influence specific metrics.
* **AutoML:** Seamless integration with Azure Machine Learning models.

---

## 4. Strategic Integration: AFAS & Asito

With the deprecation of Qlik support by AFAS in late 2025, Power BI is the required path forward for Asito's HR and Finance reporting.

### Connectivity Architecture

* **Primary Source:** AFAS (Jonas AI).
* **Connection Method:** AFAS standard **GetConnector** (OData) is the primary method.
* **Alternatives:** BI OData Connector (optimized), Power BI Connector (Davista), or Peliqan (Data Warehouse).
* **Other Integrations:** Microsoft 365 (Excel, Teams), Salesforce, Google Analytics, SQL Server.

### Target Use Cases for Facility Services

1. **HR Analytics:** Absence trends, turnover analysis, and FTE tracking (using AFAS "HR Data" template).
2. **Operations:** Visualizing data from ORTEC/Appreo for manager dashboards.
3. **Executive Reporting:** AI-generated narratives for leadership reviews regarding SLA performance and costs.

---

## 5. Risk, Governance & Limitations

### Technical Limitations

* **Licensing Barrier:** Copilot is **not** available with a standard Power BI Pro license. It requires **Fabric F2+** or **Premium P1+** capacity.
* **Language:** Copilot is English-first; support for other languages is limited.
* **Data Prep:** Models require an "AI Data Schema" and linguistic modeling (synonyms) to function accurately with Copilot.

### Governance Risks

* **Data Leakage:** Improperly shared dashboards or publishing sensitive reports to the web.
* **Accuracy (GIGO):** Reliance on the accuracy of the underlying data model; if the model is poor, Copilot's answers will be poor.
* **Shadow IT:** Uncontrolled workspace creation can lead to governance sprawl.
* **Cost Management:** Managing costs associated with Premium/Fabric capacities.

---

## 6. Recommended Action Plan

### Immediate Actions

1. **Verify Licensing:** Assess if Asito currently possesses Fabric F2+ or Premium P1 capacity. If operating on Pro only, evaluate the upgrade to Fabric F2 (~$262/month) to unlock Copilot.
2. **Admin Enablement:** Ensure the Power BI Admin enables "Users can use Copilot" in the Fabric admin portal.
3. **AFAS Connection:** Setup GetConnectors for HR and Payroll and deploy the standard AFAS HR Dashboard template as a baseline.

### Strategic Actions

4. **Qlik Migration:** Begin migrating existing Qlik dashboards to Power BI immediately to meet the December 2025 deadline, utilizing Copilot to accelerate the rebuild.
5. **Governance Review:** Review Asito's data governance policies regarding report sharing and train analysts on using Smart Narratives to standardize commentary.
6. **Data Curation:** Configure AI Data Schemas and "verified answers" to ensure Copilot provides accurate responses to business questions.
