# Research Overview — Microsoft Power BI / Fabric
**AI Readiness report as part of Asito's IT Landscape**
**Sticky: 🟢 High AI Maturity**

---

## KEY DETAILS

- **Vendor:** Microsoft
- **Owner at Asito:** Data & Analytics / BI / Management
- **Used for:** Business intelligence, dashboards, self-service analytics — the connective tissue between AFAS (HR/payroll) and ORTEC (scheduling). Unified data platform (Microsoft Fabric) combining data engineering, data science, real-time analytics, and BI.
- **Scale:** 30 million monthly active Power BI users; 28,000+ organizations on Fabric; Gartner MQ Leader 18 consecutive years
- **Contract/Licensing:** Fabric capacity-based — Copilot from F2 (~€50/month). Power BI Pro ~€11.70/user/month. Enterprise: F64 (~€5,000/month) eliminates Pro for viewers.
- **Deployment:** SaaS (Azure-based); EU data residency available
- **Compliance:** Azure security, RBAC, RLS. Data not sent to OpenAI public services.

---

## API AVAILABILITY AND INTEGRATIONS

- **AFAS → Power BI:**
  - AFAS GetConnector (REST API) — direct connection via Web source
  - Invantive Cloud — no-code AFAS → Power BI connector (105+ connectors)
  - Dataddo — AFAS data connector to analytics tools
  - Peliqan — Sync AFAS into data warehouse, then Power BI
  - Azure Data Factory — ETL into Fabric Lakehouse (enterprise-grade)
- **ORTEC → Power BI:**
  - ORTEC REST API / data export
  - Azure Data Factory pipeline into Fabric Lakehouse
  - Custom Power BI connector via Power Query M functions
- **Recommended architecture:** AFAS + ORTEC → Azure Data Factory → Fabric Lakehouse (OneLake) → Unified Semantic Model → Copilot / Data Agents / ML Models

---

## OPPORTUNITIES / USE CASES

**Quick wins (ready now):**
- **Natural language data querying:** Managers ask "Show me absenteeism trends for cleaning staff in Randstad over 6 months" → instant visualization
- **AI report creation:** "Create a dashboard showing headcount, turnover rate, and average contract duration by department" → Copilot builds the page
- **DAX generation:** "Rolling 12-month average absence rate per location" → Copilot produces formula
- **Mobile Copilot:** Site managers query data from their phone ("What's my team's overtime vs. budget?")

**Vision / medium-term:**
- **Unified workforce dashboard:** Single view combining AFAS + ORTEC data (headcount, scheduling efficiency, costs, absence)
- **Predictive absence modeling:** Forecast which sites are likely to have absence spikes next week
- **Turnover risk prediction:** Identify at-risk employees from scheduling patterns + HR signals
- **Custom Data Agents:** AI agents answering "Why was overtime 40% higher at location X?" across multiple data sources
- **Real-time site monitoring:** Detect missed check-ins, understaffing, anomalous patterns with automated alerts

---

## KEY AI CAPABILITIES

- **Copilot for Power BI:** GPT-4 powered natural language querying, report creation, DAX generation
  - Standalone Copilot (full-page chat)
  - Copilot Pane (contextual within reports)
  - Copilot in Apps (scoped to curated content)
  - Mobile Copilot (Nov 2025)
- **Data Agents:** Customizable AI agents querying enterprise data in natural language; tailored with specific instructions per business scenario
- **Real-Time Intelligence:** Streaming data analysis + built-in anomaly detection using KQL + time-series models
- **Fabric Data Science:** ML model training/deployment — demand forecasting, risk scoring, classification (Azure ML integration)
- **AI Functions (Preview):** LLM-powered transformations — text summarization, classification, sentiment analysis, entity extraction
- **Copilot for Engineering:** Code generation in notebooks, natural language pipeline authoring in Data Factory, SQL authoring

---

## KEY LIMITATIONS AND CONSTRAINTS

- **Data preparation is critical:** Copilot quality depends heavily on semantic model prep (naming, descriptions, relationships). Poorly prepared = inaccurate results.
- **No cross-report reasoning:** Cannot query across multiple disconnected models in one query. Unified model required for cross-system questions.
- **Copilot ≠ predictive:** Copilot alone can't forecast or detect anomalies — requires Fabric Data Science or Real-Time Intelligence workloads.
- **Not a data modeler:** Copilot can generate DAX/visuals but cannot design star schemas or architect models from scratch.
- **No Embedded Copilot:** Not supported in Power BI Embedded (external-facing portals).
- **Capacity throttling:** Heavy Copilot usage consumes capacity units — can slow other workloads (reports, refreshes).
- **PPU not supported:** Copilot requires Fabric capacity (F2+), not Power BI Premium Per User.
- **Q&A retiring Dec 2026:** Legacy natural language Q&A must migrate to Copilot.
- **Requires data engineering expertise:** Building the unified AFAS/ORTEC model in Fabric is non-trivial.

---

## SHOWCASE

- **Demo: Natural Language Dashboard** — Manager asks "Show me absenteeism trends for Randstad cleaning staff" → instant visualization from AFAS data
- **Demo: AI Report Builder** — "Create headcount + turnover + contract duration dashboard by department" → auto-generated report page
- **Demo: Data Agent (Root Cause)** — "Why was overtime 40% higher at location X?" → agent queries scheduling + absence + contract data
- **Demo: Mobile Copilot** — Site manager on phone asks "What's my overtime vs. budget this week?" → instant answer with chart
- **Reference:** Gartner MQ Leader 18 consecutive years; 30M active users; dominant in Dutch enterprise market
- **Architecture:** AFAS + ORTEC → Fabric Lakehouse → Unified Model → the analytics layer neither system can deliver alone
