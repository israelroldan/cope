# Research Overview — AFAS Software (ERP)
**AI Readiness report as part of Asito's IT Landscape**
**Sticky: 🟡 Medium-High AI Maturity**

---

## KEY DETAILS

- **Vendor:** AFAS Software (Netherlands)
- **Owner at Asito:** Finance / Operations (ERP system)
- **Used for:** Cloud-based ERP covering finance, operations, workflow management, and industry-specific modules (cleaning/schoonmaak: quoting, calculation, planning, BI)
- **Scale:** 14,000+ organizations use AFAS; processes payroll for 3.8M workers
- **Contract/Licensing:** SaaS subscription; AI features (Jonas) included at no extra charge (fair use policy)
- **Deployment:** Fully cloud-based SaaS

---

## API AVAILABILITY AND INTEGRATIONS

- **REST API:** Full read/write access via GetConnectors and UpdateConnectors
- **Authentication:** Token-based (base64-encoded), generated via AppConnector in Profit
- **Documentation:** Comprehensive at docs.afas.help
- **Testing:** Endpoint testing available at connect.afas.nl
- **Key integrations:**
  - **Apideck** — Unified API connector (200+ services)
  - **APIcenter** — No-code integration hub
  - **Azure Data Factory** — ETL pipeline into Azure/Power BI
  - **Power Automate** — Custom connectors / HTTP actions
  - **Make / Zapier** — Webhook-based connections
  - **Teamtailor / Recruitee** — ATS integration
  - **Watermelon.ai** — AI chatbot (used by AFAS internally, 90% auto-response)
  - **Virtual Workforce** — OCR + AI order entry automation
- **Developer libraries:** PHP (Laravel), PHP (MegaChriz), Azure Data Factory native

---

## OPPORTUNITIES / USE CASES

**Quick wins (ready now):**
- Activate Jonas for HR workflow acceleration (answering employee questions, dossier summaries) — proven 6 hrs/month savings at Zorggroep Sint Maarten
- Field reporting via speech-to-text (Pocket/Apple Watch) — team leaders voice-record inspections, Jonas transcribes
- Receipt OCR for field staff expense claims
- Translation of workflow documents for international ADG operations (NL/BE)
- Bank statement matching ML for monthly reconciliation

**Vision / medium-term:**
- Profit 8 (June 2026): CV parsing, AI talent matching, Jonas in all workflows
- Custom AI via REST API — build external AI pipelines (OpenAI, Azure AI, Claude) on AFAS data
- AI-powered scheduling optimizer or quality prediction using AFAS workforce data

---

## KEY AI CAPABILITIES

- **Branded AI assistant:** Jonas (launched Nov 2024, 1,000+ orgs using it)
- **Smart Workflow Reactions:** Auto-generate text in workflow steps; users can summarize, rewrite, shorten, change tone
- **Speech-to-Text:** Record audio via Pocket/Apple Watch → auto-transcribe + analyze (action points, summaries)
- **AI Task Templates:** Standardized prompt templates for consistent AI use across the org (invoked via `/` shortcut)
- **Document-Aware Analysis:** Jonas reads attached documents (CAOs, CVs, policies) and extracts/summarizes info
- **Receipt OCR (Scan & Recognize):** Photo → auto-fill date, description, amount
- **Translation:** One-click translation to EN/FR/DE/NL-BE
- **Bank Statement ML Matching:** Learns from user feedback to suggest ledger matches
- **Jonas Insights Dashboard:** Usage analytics, user ratings, prompt optimization tracking

**Integration potential:**
- AFAS REST API enables any external AI to read/write data
- Power Automate / Make as orchestration layers to external AI services

---

## KEY LIMITATIONS AND CONSTRAINTS

- **Not a chatbot:** Jonas works in structured workflows only — no free-form Q&A for employees
- **Outputs require human verification:** AI is not infallible; all content needs review
- **Admin setup required:** Advanced AI tasks must be configured by administrators (prompts, workflow steps)
- **Requires activation:** Jonas features (except receipt OCR) need explicit activation per environment
- **No predictive analytics:** No AI-driven forecasting for workforce planning, demand, or budgets
- **No autonomous actions:** Jonas generates text — does not execute decisions without human approval
- **Limited to AFAS ecosystem:** Cannot pull external data or interact with non-AFAS systems
- **Prompt tuning needed:** Initial outputs may be generic; iterative refinement via Jonas Insights required
- **No image/video analysis:** Text and audio only
- **EU AI Act compliant:** All processing stays within AFAS secure environment

---

## SHOWCASE

- **Demo: HR Workflow Acceleration** — Zorggroep Sint Maarten: Jonas auto-proposes answers to employee questions, HR reviews and sends → 6 hrs/month saved
- **Demo: Field Voice Reporting** — Team leader records inspection notes via Pocket → Jonas creates structured report → attached to workflow
- **Demo: Conversation Reports** — BACU: Leaders record employee conversations → Jonas auto-generates report from half-typed prompt
- **Reference:** 1,000+ organizations actively using Jonas (AFAS press release, 2025)
- **Video:** Jonas in actie: automatisering met AI (AFAS Help Center)
