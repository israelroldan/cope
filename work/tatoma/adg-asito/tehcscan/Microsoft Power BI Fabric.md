# AI Readiness Report: Power BI / Microsoft Fabric

**Prepared for:** Asito (part of ADG)
**Date:** February 8, 2026
**Prepared by:** Tatoma

---

## Executive Summary

Microsoft Power BI is the undisputed market leader in business intelligence, named a Gartner Magic Quadrant Leader for the 18th consecutive year (2025) with 30 million monthly active users. Power BI is now deeply integrated into **Microsoft Fabric**, a unified SaaS data platform that combines data engineering, data science, real-time analytics, and BI into one environment. The AI story spans two layers: **Copilot** (a generative AI assistant for natural-language data querying, report creation, and DAX generation) and **Fabric AI services** (machine learning, predictive analytics, anomaly detection, and data agents). For Asito (ADG), Power BI / Fabric is the connective tissue between AFAS (HR/payroll data) and ORTEC (scheduling data) — enabling unified dashboards, predictive workforce analytics, and AI-powered insights that neither AFAS nor ORTEC can deliver alone. Copilot is now available on all paid Fabric SKUs starting from F2 (~€50/month), making AI-powered analytics accessible at any scale.

---

## Branded AI Assistant

| | |
|---|---|
| **Name** | Copilot (for Power BI / Microsoft Fabric) |
| **Engine** | Azure OpenAI (GPT-4 based) |
| **Launch** | GA in Power BI (2024); expanded to all paid SKUs from F2 (April 2025) |
| **Positioning** | AI assistant embedded across all Fabric workloads — data engineering, data science, real-time intelligence, and Power BI |
| **Adoption** | 28,000+ organizations on Microsoft Fabric; 30 million monthly active Power BI users |
| **Security** | Data is not sent to OpenAI public services or used to train foundation models. Respects tenant, data, and permission boundaries. |

---

## Platform Overview: Power BI + Microsoft Fabric

Microsoft Fabric is an all-in-one SaaS data platform. Power BI is its analytics and visualization layer. Together, they provide:

| Fabric Workload | What It Does | AI Built In |
|---|---|---|
| **Power BI** | Dashboards, reports, data visualization, self-service BI | Copilot, AI visuals, natural language Q&A |
| **Data Factory** | Data integration, ETL/ELT pipelines | Copilot for pipeline authoring |
| **Data Engineering** | Spark-based data processing, Lakehouse | Copilot for code generation, notebooks |
| **Data Science** | ML model training, deployment, experimentation | Copilot for ML, Azure ML integration |
| **Data Warehouse** | SQL-based analytics warehouse | Copilot for SQL authoring |
| **Real-Time Intelligence** | Streaming data, event processing, KQL | Copilot for KQL, anomaly detection |
| **OneLake** | Unified data lake (single source of truth) | Foundation for all AI/ML workloads |
| **Data Agents** | AI agents that query enterprise data in natural language | LLM-powered, customizable per scenario |

---

## AI Capabilities — What Copilot & Fabric CAN Do

### 1. Natural Language Data Querying (Copilot for Power BI)

Business users can ask questions about their data in plain language and get visualizations, summaries, and answers back. Three experiences exist:

- **Standalone Copilot** — Full-page chat experience to find and analyze any report, semantic model, or data agent the user has access to
- **Copilot Pane** — Contextual assistant within an open report
- **Copilot in Apps** — Scoped to curated content within a Power BI app

> **Demo-ready use case:** An Asito regional manager asks Copilot: "Show me absenteeism trends for cleaning staff in the Randstad region over the last 6 months" — Copilot queries the connected AFAS data and generates a trend visualization.

### 2. AI-Powered Report Creation & Editing

Copilot can generate entire report pages from natural language descriptions. It automatically selects the best visual types, supports flexible editing (add/change/delete visuals), and can create narrative summaries of reports.

> **Demo-ready use case:** An HR analyst says "Create a dashboard showing headcount, turnover rate, and average contract duration by department" — Copilot builds the page from the AFAS semantic model.

### 3. DAX Query Generation

Copilot generates DAX (Data Analysis Expressions) queries directly in DAX Query View, reducing reliance on specialized skills. This speeds up semantic model development.

> **Demo-ready use case:** A data analyst asks Copilot to generate a DAX measure for "rolling 12-month average absence rate per location" — Copilot produces the formula from the model context.

### 4. Mobile Copilot (November 2025)

A standalone Copilot experience on mobile allows users to ask any data question and get instant insights — including auto-generated visuals — from their phone.

> **Demo-ready use case:** A site manager at a client location opens the Power BI mobile app and asks "What's my team's overtime this week compared to budget?" — gets an instant answer with a visual.

### 5. Data Agents (Formerly AI Skills)

Data agents are customizable AI agents that use your organization's data in OneLake to answer questions in real time. Unlike Copilot (general-purpose), data agents can be tailored with specific instructions and examples for unique business scenarios.

- Can reason, plan, and respond across the Fabric platform
- Automate data flows, ingestion, transformation, analysis, and visualization
- Conduct root cause analysis and anomaly detection
- Maintain roles and permissions from the OneLake catalog

> **Demo-ready use case:** A custom data agent for Asito could be configured to answer operational questions like "Why was overtime 40% higher at location X last week?" — the agent queries scheduling data (ORTEC), absence data (AFAS), and contract data to provide a root cause analysis.

### 6. Real-Time Intelligence & Anomaly Detection

Fabric's Real-Time Intelligence workload enables streaming data analysis with built-in anomaly detection:

- AI-powered anomaly detection on streaming data using KQL functions and time-series models
- Automated alerts when anomalies are detected
- Adapts to evolving patterns — no custom model development needed in many cases

> **Demo-ready use case:** Real-time monitoring of cleaning site check-ins. If a pattern of missed check-ins emerges at specific sites, Fabric automatically flags the anomaly and alerts operations.

### 7. Predictive Analytics & Machine Learning (Fabric Data Science)

Fabric's Data Science workload integrates with Azure ML for building and deploying predictive models:

- Pre-built algorithms and custom model training
- Demand/capacity forecasting using historical data
- Customer behavior prediction
- Risk scoring and classification
- Models can be deployed directly into Fabric for operational use

> **Demo-ready use case:** A predictive model trained on AFAS absence data + ORTEC scheduling data forecasts which sites are likely to be understaffed next week — enabling proactive intervention.

### 8. AI Functions (Preview)

AI functions allow applying LLM-powered transformations to OneLake data with a single line of code:

- Text summarization
- Classification
- Sentiment analysis
- Entity extraction
- Text generation

> **Demo-ready use case:** Automatically classify and summarize employee feedback from surveys stored in Fabric, identifying themes like "scheduling fairness" or "workload" without manual analysis.

### 9. Copilot for Data Engineering & Pipelines

Copilot assists across Fabric's data engineering workloads:

- **Notebooks:** Generate code, fix errors, add documentation automatically
- **Data Factory:** Author data pipelines with natural language
- **SQL:** Generate queries, diagnose performance issues, optimize designs

---

## AI Limitations — What Copilot & Fabric CAN'T Do

| Limitation | Detail | Impact for Asito |
|---|---|---|
| **Data preparation is critical** | Copilot quality depends heavily on semantic model preparation — naming conventions, field descriptions, relationships, linguistic modeling. Poorly prepared models produce inaccurate or misleading results. | Significant upfront investment needed to prepare AFAS and ORTEC data models for Copilot. |
| **No cross-report reasoning** | Copilot cannot reason across multiple disconnected reports or models in a single query. Each query is scoped to one model/report. | Cannot ask "compare HR data from AFAS with scheduling data from ORTEC" unless both are in a unified model. |
| **Limited forecasting in Copilot** | Copilot cannot generate new predictive insights like forecasting or anomaly detection on its own. These require Fabric Data Science or Real-Time Intelligence workloads. | Predictive workforce analytics require building ML models in Fabric, not just asking Copilot. |
| **Not a replacement for data modeling** | Copilot can generate DAX and visuals, but cannot design a star schema, build relationships, or architect a data model from scratch. | Still need data engineering expertise to build the AFAS/ORTEC data model in Fabric. |
| **No embedded Copilot** | Copilot is not supported in Power BI Embedded scenarios (as of 2025). External-facing apps cannot use Copilot. | If Asito embeds Power BI dashboards in their own portals, Copilot won't be available there. |
| **Capacity throttling risk** | Heavy Copilot usage consumes capacity units and can slow down other workloads (reports, refreshes). Requires capacity planning. | Need to monitor Copilot usage to prevent impacting business-critical dashboards. |
| **PPU not supported** | Copilot doesn't support workspaces backed by Power BI Premium Per User (PPU). | Must use Fabric capacity (F2+) or legacy P SKU for Copilot access. |
| **Sovereign clouds unsupported** | Copilot not available in sovereign/government cloud environments. | Not likely an issue for Asito, but relevant for government contracts. |
| **Q&A retiring December 2026** | Legacy natural language Q&A will be deprecated. Organizations must migrate to Copilot. | Need to transition any existing Q&A-based reports to Copilot by end of 2026. |

---

## Licensing & Pricing

### Fabric Capacity (CU-based pricing)

| SKU | Monthly Cost (approx.) | Copilot | Free Viewer Access | Key Use Case |
|---|---|---|---|---|
| **F2** | ~€50/month | ✅ | ❌ (Pro needed) | Entry-level Copilot access |
| **F4** | ~€100/month | ✅ | ❌ | Small team analytics |
| **F8** | ~€200/month | ✅ | ❌ | Department-level analytics |
| **F64** | ~€5,000/month | ✅ | ✅ (no Pro for viewers) | Enterprise — equivalent to legacy P1 |
| **F128+** | €10,000+/month | ✅ | ✅ | Large enterprise with heavy workloads |

### Per-User Licenses

| License | Monthly Cost | Notes |
|---|---|---|
| **Power BI Free** | €0 | View only in Premium/F64+ workspaces |
| **Power BI Pro** | ~€11.70/user/month | Required for publishing and collaboration below F64 |
| **Fabric Copilot Capacity** | Included in F2+ | Token-based billing within capacity |

### Key Pricing Insight for Asito

- **Minimum for Copilot:** F2 (~€50/month) + Pro licenses for creators
- **Enterprise recommended:** F64 (~€5,000/month) eliminates need for Pro licenses for report viewers — important when distributing dashboards to hundreds of managers/supervisors
- **Copilot cost:** Included in Fabric capacity, billed via token consumption within the CU budget

---

## Integration with AFAS & ORTEC

### AFAS → Power BI / Fabric

| Method | Description | Complexity |
|---|---|---|
| **AFAS GetConnector (REST API)** | Direct connection using AFAS REST API endpoints. Configure in Power BI Desktop via Web source with Authorization header (base64 token). | Medium — requires AFAS admin to set up GetConnectors |
| **Invantive Cloud** | No-code AFAS → Power BI connector. 105+ connectors including OData for Power BI. | Low — step-by-step wizard |
| **Dataddo** | AFAS data connector to analytics tools and databases. Full REST API access. | Low-Medium |
| **Peliqan** | Sync AFAS into a data warehouse, then connect to Power BI. Enables SQL on AFAS data. | Medium — adds data warehouse layer |
| **Azure Data Factory** | ETL from AFAS REST API into Fabric Lakehouse via Fabric Data Factory. Best for enterprise data pipelines. | Medium-High — most robust for Fabric integration |

### ORTEC → Power BI / Fabric

| Method | Description | Complexity |
|---|---|---|
| **ORTEC REST API / Data Export** | ORTEC Workforce Scheduling provides scheduling data, KPIs, and analytics. Can be extracted via API or data export. | Medium — depends on ORTEC export configuration |
| **Azure Data Factory** | Pipeline from ORTEC data into Fabric Lakehouse alongside AFAS data. | Medium-High |
| **Custom Power BI connector** | Build a custom connector using Power Query M functions against ORTEC APIs. | High — requires development |

### Unified Data Model Architecture

The recommended architecture for Asito:

```
AFAS (HR/Payroll) ──→ Azure Data Factory ──→ Fabric Lakehouse (OneLake) ──→ Power BI
ORTEC (Scheduling) ──→ Azure Data Factory ──→ Fabric Lakehouse (OneLake) ──→ Power BI
                                                       ↓
                                              Unified Semantic Model
                                                       ↓
                                         Copilot / Data Agents / ML Models
```

This architecture enables cross-system queries (e.g., correlating AFAS absence data with ORTEC scheduling efficiency) that neither system can answer alone.

---

## Competitive Positioning

| Dimension | Power BI / Fabric | Tableau (Salesforce) | Qlik Sense |
|---|---|---|---|
| **Gartner MQ 2025** | Leader (#1 — 18th year) | Leader | Leader |
| **Monthly active users** | 30 million | Not disclosed | Not disclosed |
| **AI assistant** | Copilot (GPT-4) | Tableau AI / Pulse | Qlik Answers (NL querying) |
| **Unified data platform** | Microsoft Fabric (all-in-one) | Tableau Data Cloud | Qlik Cloud (partial) |
| **Predictive/ML** | Fabric Data Science + Azure ML | Tableau Einstein | Qlik AutoML |
| **AFAS integration** | Via REST API / GetConnector | Via REST API (manual) | Via REST API (manual) |
| **Microsoft ecosystem** | Native (Teams, SharePoint, Excel, Azure) | Add-on | Add-on |
| **Pricing advantage** | Copilot from ~€50/month (F2) | Higher entry cost | Higher entry cost |
| **Dutch market share** | Dominant | Limited | Present |

### Key Differentiator for Asito

Power BI is already the de facto standard in the Dutch enterprise market, and AFAS includes Power BI-compatible BI dashboards as a standard feature. The Microsoft ecosystem (Teams, SharePoint, Azure, M365) likely already exists within Asito/ADG, making Fabric the natural choice for unified analytics.

---

## AI Maturity Assessment

| Dimension | Rating | Notes |
|---|---|---|
| **Generative AI (Copilot)** | High | GPT-4 powered. Natural language querying, report creation, DAX generation, mobile. Available on all paid SKUs. |
| **Predictive Analytics** | High | Fabric Data Science workload with Azure ML integration. Demand forecasting, risk scoring, classification. |
| **Anomaly Detection** | High | Built-in real-time anomaly detection in Real-Time Intelligence. Adapts to patterns without custom models. |
| **Data Agents** | Medium-High | Customizable AI agents for domain-specific data querying. Preview, but rapidly maturing. |
| **Self-Service BI** | High | 30M users. Natural language, drag-and-drop, Copilot assistance. Strong self-service culture. |
| **Data Integration** | High | Azure Data Factory, 150+ connectors, REST API support. Direct AFAS connectivity documented. |
| **AFAS Integration** | Medium-High | Multiple methods (direct API, Invantive, Dataddo, ADF). Requires setup but well-documented. |
| **ORTEC Integration** | Medium | Feasible via API/data export + ADF pipeline. Less documented than AFAS integration. |
| **Compliance & Security** | High | Azure security, data residency options, RBAC, RLS. Data not sent to OpenAI public services. |
| **Market Position** | Highest | #1 Gartner MQ Leader, 18 consecutive years. 30M users. Dominant in NL enterprise. |

---

## Relevance for Asito (ADG)

### Why Power BI / Fabric Matters for Asito

Power BI / Fabric is the missing analytics and AI layer that connects AFAS and ORTEC data into a unified, AI-powered intelligence platform:

| Capability | Without Fabric | With Fabric |
|---|---|---|
| **Cross-system analytics** | Separate AFAS dashboards + ORTEC reports. No combined view. | Unified model combining HR, payroll, and scheduling data. |
| **Predictive workforce analytics** | Not available in either AFAS or ORTEC natively. | ML models in Fabric predict absence, turnover, and demand. |
| **Natural language insights** | Not available. | Copilot lets managers ask questions in plain language. |
| **Real-time monitoring** | Limited to ORTEC planning board. | Fabric Real-Time Intelligence with anomaly detection. |
| **Anomaly detection** | Manual identification only. | Automatic detection of unusual patterns in scheduling, absence, or cost data. |
| **Self-service for managers** | Report consumers only (AFAS BI dashboards). | Self-service exploration with Copilot guidance. |

### High-Value AI Use Cases for Asito

| Use Case | Fabric Capability | Data Sources | Business Impact |
|---|---|---|---|
| **Unified workforce dashboard** | Power BI + Copilot | AFAS + ORTEC | Single view of headcount, scheduling efficiency, costs, absence |
| **Predictive absence modeling** | Fabric Data Science | AFAS absence history | Forecast which sites are likely to have absence spikes next week |
| **Scheduling efficiency analytics** | Power BI + Data Agents | ORTEC scheduling data | Measure planned vs. actual hours, overtime trends, flex worker usage |
| **Turnover risk prediction** | Fabric Data Science | AFAS + ORTEC | Identify employees at risk of leaving based on scheduling patterns + HR signals |
| **Real-time site monitoring** | Real-Time Intelligence | ORTEC check-in data | Detect missed check-ins, understaffing, anomalous patterns in real time |
| **Natural language ops queries** | Copilot / Data Agents | Unified model | "How much did we spend on flex workers last month vs. budget?" |
| **CAO compliance reporting** | Power BI | AFAS + ORTEC | Automated compliance dashboards for Working Hours Act and CAO Schoonmaak |
| **Cost optimization insights** | Copilot + Data Science | AFAS payroll + ORTEC scheduling | Identify where scheduling optimization can reduce overtime and flex costs |

---

## Recommended Next Steps

### Immediate (Q1 2026)

1. **Activate Fabric capacity (F2)** — Start with the entry-level SKU (~€50/month) to enable Copilot and begin experimenting with AI-powered analytics on existing AFAS data.

2. **Connect AFAS to Power BI** — Set up AFAS GetConnectors for key HR data (headcount, absence, payroll, contracts) and connect to Power BI Desktop. Use Invantive Cloud if a no-code approach is preferred.

3. **Prepare semantic model** — Invest in proper model preparation: descriptive field names, relationships, descriptions, and linguistic modeling. This is the single most important step for Copilot quality.

### Short-term (Q2-Q3 2026)

4. **Build unified data model** — Create a Fabric Lakehouse combining AFAS and ORTEC data via Azure Data Factory. Design a star schema for workforce analytics.

5. **Deploy Copilot for managers** — Once the semantic model is prepared and approved, enable Copilot for regional managers and operations leads. Start with read-only natural language querying.

6. **Build predictive absence model** — Use Fabric Data Science to train a model predicting absence patterns from historical AFAS data. Deploy it into the Fabric workspace for operational use.

### Medium-term (Q4 2026+)

7. **Upgrade to F64** — When dashboard distribution to hundreds of site managers is needed, upgrade to F64 to eliminate individual Pro licenses for viewers.

8. **Deploy custom data agents** — Create Asito-specific data agents that can answer operational questions combining HR, scheduling, and financial data in real time.

9. **Implement real-time monitoring** — Connect ORTEC check-in/scheduling events to Fabric Real-Time Intelligence for live anomaly detection and automated alerts.

10. **Migrate from Q&A to Copilot** — Plan migration of any existing Power BI Q&A features before the December 2026 deprecation deadline.

---

## Sources

- [Microsoft Fabric Overview](https://learn.microsoft.com/en-us/fabric/fundamentals/microsoft-fabric-overview)
- [Copilot in Fabric Overview](https://learn.microsoft.com/en-us/fabric/fundamentals/copilot-fabric-overview)
- [Copilot for Power BI](https://learn.microsoft.com/en-us/power-bi/create-reports/copilot-introduction)
- [Copilot for Data Science & Data Engineering](https://learn.microsoft.com/en-us/fabric/data-engineering/copilot-notebooks-overview)
- [FabCon 2025: Agentic Capabilities in Fabric](https://www.microsoft.com/en-us/microsoft-fabric/blog/2025/03/31/fabcon-2025-fueling-tomorrows-ai-with-new-agentic-capabilities-and-security-innovations-in-fabric)
- [Fabric November 2025 Feature Summary](https://blog.fabric.microsoft.com/en-us/blog/fabric-november-2025-feature-summary)
- [Power BI January 2026 Feature Summary](https://powerbi.microsoft.com/en-us/blog/power-bi-january-2026-feature-summary/)
- [Fabric Copilot Capacity (SKU & Pricing)](https://learn.microsoft.com/en-us/fabric/enterprise/fabric-copilot-capacity)
- [Microsoft Fabric Pricing](https://azure.microsoft.com/en-us/pricing/details/microsoft-fabric/)
- [Copilot Capacity Now Available from F2](https://blog.bismart.com/en/fabric-copilot-capacity-available-from-f2)
- [Power BI Licensing Guide](https://learn.microsoft.com/en-us/fabric/enterprise/powerbi/service-admin-power-bi-licensing)
- [Microsoft Named Leader — 2025 Gartner MQ for Analytics & BI](https://powerbi.microsoft.com/en-us/blog/microsoft-named-a-leader-in-the-2025-gartner-magic-quadrant-for-analytics-and-bi-platforms/)
- [Connecting AFAS with Power BI (Procesbouwers)](https://procesbouwers.nl/en/business/link-afas-to-power-bi/)
- [Invantive Cloud — AFAS to Power BI](https://cloud.invantive.com/en/afas/power-bi-connector/setup)
- [Dataddo — AFAS Data Connector](https://blog.dataddo.com/afas-software-export-any-afas-data-to-databases-and-analytics-tools)
- [Peliqan — AFAS Data Warehouse + BI](https://peliqan.io/connector/AFAS/)
- [ORTEC Workforce Scheduling on Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/ortecbv.ortec_workforce_scheduling)
- [Power BI Q&A Retirement (Dec 2026)](https://www.magnetismsolutions.com/news/power-bi-qampa-to-retire-by-december-2026-what-you-need-to-know)
- [Microsoft Fabric 2026 Trends](https://powerbiconsulting.com/blog/microsoft-fabric-2026-trends)
- [AI Integration in Microsoft Fabric](https://www.waferwire.com/blog/ai-integration-microsoft-fabric)
- [Real-Time Intelligence in Fabric](https://avantiico.com/real-time-intelligence-microsoft-fabric/)
- [Copilot in Power BI — Myths & Realities (Data Goblins)](https://data-goblins.com/power-bi/copilot-in-power-bi)
