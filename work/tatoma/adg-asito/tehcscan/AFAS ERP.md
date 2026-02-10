# AI Readiness Report: AFAS Software

**Prepared for:** Asito (part of ADG)
**Date:** February 8, 2026
**Prepared by:** Tatoma

---

## Executive Summary

AFAS Software is a Dutch cloud-based ERP platform used by over 14,000 organizations for HR, payroll, finance, and operations. In late 2024, AFAS launched **Jonas**, a branded AI assistant integrated directly into its workflow engine. Jonas is actively used by 1,000+ organizations and is positioned as a practical, privacy-compliant tool — not a standalone chatbot, but an AI layer embedded in business workflows. For Asito (ADG), this means AI capabilities are available within the ERP they already use, with particular relevance for HR processes, workforce management, and operational reporting.

---

## Branded AI Assistant

| | |
|---|---|
| **Name** | Jonas |
| **Launch** | November 2024 (first integrations in InSite & OutSite) |
| **Positioning** | "A tool to add value, not a goal in itself" — practical AI embedded in workflows |
| **Adoption** | 1,000+ organizations actively using Jonas (as of 2025) |
| **Compliance** | Operates within the European AI Act; all processing stays within the secure AFAS environment |

---

## AI Capabilities — What Jonas CAN Do

### 1. Smart Workflow Reactions
Jonas can automatically generate text responses within AFAS workflows. When a user reaches a specific step, AI-generated summaries, analyses, or conclusions appear on screen. Users can also invoke Jonas manually to write, shorten, lengthen, or restyle text (business, friendly, etc.) on any dossier item.

> **Demo-ready use case (HR):** In a sick-leave workflow, Jonas can automatically summarize the case history and suggest a response for the HR advisor, who only needs to review and send it. Zorggroep Sint Maarten reports saving ~6 hours/month on HR workflows this way.

### 2. Speech-to-Text / Audio Tasks
Users can record audio via AFAS Pocket or Apple Watch, and Jonas automatically transcribes and optionally analyzes the recording (e.g., extracting action points or creating summaries). The transcription is attached to the workflow as a dossier item.

> **Demo-ready use case (Operations):** A team leader at a cleaning site can voice-record observations after an inspection, and Jonas converts it into a structured report attached to the relevant workflow — no typing needed.

### 3. AI Task Templates
Administrators can create standardized Jonas commands (prompt templates) for specific workflow steps. Users invoke these via a button or keyboard shortcut (`/`). This enables consistent AI usage across the organization.

> **Demo-ready use case (Management):** Leaders at BACU use Jonas to record employee conversations and auto-generate conversation reports. They type half a word and Jonas creates a full report they can edit and share.

### 4. Document-Aware AI Analysis
Jonas can reference attached documents (employment conditions, collective labor agreements, CVs, etc.) within a workflow and extract or summarize relevant information.

> **Demo-ready use case (Recruitment):** When an applicant submits a CV and cover letter, Jonas extracts key information and fills it into dossier fields — reducing manual data entry in the hiring workflow.

### 5. Receipt OCR (Scan & Recognize)
AFAS Pocket uses AI-powered text recognition on expense receipts. Users photograph a receipt, and Jonas pre-fills the date, description, and amount.

> **Demo-ready use case (Finance/Field staff):** Cleaning team supervisors can photograph fuel or supply receipts on-site and submit expenses directly — fields are auto-populated.

### 6. Translation
Jonas can translate all untranslated fields to English, French, German, or Dutch (Belgium) with one click.

> **Demo-ready use case (Multi-site operations):** For an international operation like ADG, workflow documents can be quickly translated for colleagues in Belgium or other regions.

### 7. Bank Statement Matching (Machine Learning)
AFAS uses ML to suggest ledger account matches during manual reconciliation, continuously learning from user feedback.

> **Demo-ready use case (Finance):** During monthly reconciliation, Jonas suggests matching entries, reducing manual lookup time for the finance team.

### 8. Jonas Insights Dashboard
Provides visibility into Jonas usage across the organization — which AI tasks are used most, user ratings, and which prompts need improvement. Enables data-driven optimization of AI workflows.

---

## AI Limitations — What Jonas CAN'T Do

| Limitation | Detail |
|---|---|
| **Not a chatbot** | Jonas is not a conversational assistant. It works within structured workflows, not as a free-form Q&A tool. AFAS is still exploring chat-based AI support. |
| **Outputs require verification** | AFAS explicitly states AI is not infallible. Users remain responsible for reviewing and approving all generated content. |
| **Admin setup required** | Advanced AI features (workflow AI tasks, document analysis) require administrator configuration. AI texts don't appear automatically — they must be deliberately built into workflows. |
| **Requires activation** | All Jonas features (except receipt OCR in Pocket) require explicit activation in the AFAS environment. |
| **No predictive analytics** | Jonas does not offer predictive workforce planning, demand forecasting, or advanced BI powered by AI. BI dashboards exist but are Power BI-based, not AI-driven. |
| **No autonomous process automation** | Jonas assists and generates text — it does not autonomously execute business decisions or trigger actions without human confirmation. |
| **Limited to AFAS ecosystem** | Jonas operates entirely within AFAS. It cannot pull in external data sources or interact with non-AFAS systems. |
| **Prompt tuning needed** | Initial AI outputs may not be optimal. Administrators need to iteratively refine prompts using feedback from Jonas Insights. |
| **No image or video analysis** | Jonas handles text and audio only. There is no computer vision or image analysis capability. |

---

## Upcoming AI Developments (Roadmap — Profit 8, June 2026)

AFAS has announced several significant AI enhancements in its Profit 8 release:

1. **Jonas in all workflows** — Jonas automation will be deployable across all existing workflows and processes, with full self-configuration.
2. **AI-powered CV parsing** — Jonas will extract information from CVs and cover letters and fill dossier fields automatically in recruitment workflows.
3. **AI talent matching** — AFAS will suggest applicant-to-vacancy matches based on CVs and competencies, including cross-vacancy recommendations.
4. **Expanded speech-to-text** — AI analysis on audio files in workflows (transcription + automatic extraction of tasks and action points).
5. **mTLS security** — Mutual TLS for more secure API integrations.

---

## Third-Party AI Integrations & Extensibility

AFAS offers a well-documented REST API that enables external AI integration, even where Jonas doesn't natively cover a use case.

### AFAS API Capabilities

| Component | Description |
|---|---|
| **REST API** | Full read/write access via GetConnectors and UpdateConnectors |
| **Authentication** | Token-based (base64-encoded), generated via AppConnector in Profit |
| **Documentation** | [docs.afas.help](https://docs.afas.help/profit/en/GetConnector) |
| **Testing** | [connect.afas.nl](https://connect.afas.nl) for endpoint testing |

### Integration Platforms & Connectors

| Platform | What It Enables |
|---|---|
| **Apideck** | Unified API connector for AFAS, enabling integration with 200+ other services |
| **APIcenter** | No-code AFAS integration hub for connecting with third-party tools |
| **Azure Data Factory** | ETL pipeline from AFAS REST API into Azure/Power BI |
| **Power Automate** | Custom connectors or HTTP actions to AFAS REST API, enabling AI tool orchestration |
| **Make / Zapier** | Webhook-based connections to AFAS, enabling AI middleware workflows |
| **Teamtailor** | HR/ATS integration via GetConnectors and UpdateConnectors |
| **Watermelon.ai** | AI chatbot platform used by AFAS internally — automates 90% of customer inquiries |
| **Whitevision** | Document processing integration with AFAS |
| **Virtual Workforce** | Order entry automation using OCR + AI + ML integrated with AFAS |

### Developer Libraries

| Library | Language |
|---|---|
| [laravel-afas-rest-connector](https://github.com/wesimplycode/laravel-afas-rest-connector) | PHP (Laravel) |
| [afasprofit](https://github.com/MegaChriz/afasprofit) | PHP |
| Azure Data Factory (native REST connector) | Low-code |

### What This Means for External AI

Because AFAS exposes a comprehensive REST API, organizations can build custom AI pipelines that:
- Pull data from AFAS → process with external AI (OpenAI, Azure AI, Claude, etc.) → write results back to AFAS
- Use Power Automate or Make as orchestration layers between AFAS and AI services
- Build custom dashboards combining AFAS data with AI-powered analysis

---

## Customer Sentiment on AI

### What Users Love
- **Time savings are concrete:** Zorggroep Sint Maarten reports saving 6 hours/month on HR processes using Jonas.
- **Low barrier to entry:** Smart reactions on dossier items require no setup — every user can start immediately.
- **User stays in control:** AFAS philosophy of "AI assists, humans decide" resonates with users who want to leverage AI without losing oversight.
- **Privacy-first approach:** Jonas operates entirely within the AFAS secure environment, which users in regulated industries value highly.
- **Easy audio workflows:** Speech-to-text via Pocket/Apple Watch is frequently praised for field-based use cases.

### What Users Want Improved
- **More out-of-the-box AI templates:** Current implementation requires administrator effort to create prompts and configure workflow AI tasks.
- **Chatbot/Q&A capability:** Users want a conversational Jonas for ad-hoc questions (e.g., "How many sick days does employee X have left?") — AFAS acknowledges this is a future exploration area.
- **Predictive capabilities:** No AI-driven forecasting for workforce planning, budgeting, or demand prediction exists yet.
- **Cross-system AI:** Jonas is confined to the AFAS ecosystem. Users with multi-vendor landscapes want AI that spans across systems.

### Notable Customer Quote
> "Leidinggevenden tikken bij wijze van spreken een half woord in en Jonas maakt er een gespreksverslag van" — Leaders type half a word and Jonas creates a full conversation report. (BACU via AFAS)

---

## AI Maturity Assessment

| Dimension | Rating | Notes |
|---|---|---|
| **Native AI Features** | Medium-High | Jonas offers substantive workflow AI, speech-to-text, OCR, and translation. Not yet at predictive/autonomous level. |
| **AI Integration Ecosystem** | Medium | Strong REST API enables external AI connection. No native AI marketplace, but platforms like Apideck and APIcenter bridge the gap. |
| **Documentation Quality** | High | Comprehensive help center, video tutorials, API docs at docs.afas.help. |
| **Customer Adoption** | Medium | 1,000+ organizations using Jonas (out of 14,000+ total). Growing but not yet ubiquitous. |
| **Compliance & Trust** | High | European AI Act compliant, data stays within AFAS, transparent about limitations. |
| **Roadmap Ambition** | Medium-High | Profit 8 (June 2026) brings talent matching, CV parsing, and expanded workflow AI — meaningful additions. |

---

## Relevance for Asito (ADG) — Cleaning & Facility Management

AFAS has a dedicated solution for the cleaning industry ("schoonmaak") covering quoting/calculation, workflow management, planning integration, and BI dashboards. Combined with Jonas, the following opportunities are particularly relevant for Asito:

### High-Value AI Use Cases for Asito

1. **HR workflow acceleration** — Automate responses to employee questions, sick-leave processing, and onboarding workflows using Jonas. Based on comparable cases, this could save significant admin hours.

2. **Field reporting via speech** — Team leaders and site managers can voice-record site inspections, incident reports, or shift handover notes via Pocket. Jonas transcribes and structures these automatically.

3. **Recruitment at scale** — With Profit 8 (June 2026), Jonas will support CV parsing and talent matching — valuable for a high-volume hiring environment like facility services.

4. **Expense processing** — Receipt OCR for field staff expense claims reduces manual data entry.

5. **Multi-language support** — For ADG's international operations, Jonas's translation feature can streamline cross-border documentation.

6. **Custom AI via API** — AFAS's REST API enables building custom AI solutions on top of AFAS data — for example, an AI-powered scheduling optimizer or quality prediction model using AFAS workforce data piped to an external AI service.

---

## Recommended Next Steps

1. **Activate Jonas** — Ensure Jonas is activated in the Asito AFAS environment and that administrators are trained on creating AI task templates and workflow integrations.

2. **Pilot with HR workflows** — Start with a focused pilot on HR processes (sick leave, onboarding, employee questions) where proven time savings exist.

3. **Explore speech tasks for operations** — Deploy Pocket-based voice recording for team leaders to capture site reports and handover notes.

4. **Plan for Profit 8** — Prepare for the June 2026 Profit 8 release that adds CV parsing and talent matching — particularly relevant for Asito's recruitment volumes.

5. **Evaluate API-based AI extensions** — Assess whether external AI (via the AFAS REST API) could address gaps Jonas doesn't cover — such as predictive workforce scheduling or quality forecasting.

6. **Monitor Jonas Insights** — Use the built-in analytics dashboard to measure adoption, identify well-performing prompts, and iteratively improve AI task quality.

---

## Sources

- [AI in AFAS ERP-software: maak kennis met Jonas](https://www.afas.nl/software/ai)
- [AFAS & AI — Hoe gaan we bij AFAS om met AI?](https://klant.afas.nl/thema/ai)
- [AI in AFAS (Jonas) — Help Center](https://help.afas.nl/help/NL/SE/jonas.htm)
- [1.000+ organisaties vertrouwen op Jonas](https://www.afas.nl/persbericht/meer-dan-1-000-organisaties-vertrouwen-op-ai-assistent-jonas-om-tijd-te-winnen)
- [Jonas slim inzetten voor marketing & commercie](https://klant.afas.nl/blog/jonas-ai-voor-jouw-processen)
- [Ontdek Jonas — VIER Consultancy](https://www.vierconsultancy.nl/inspiratie/blogs/ontdek-jonas-de-slimme-ai-assistent-van-afas/)
- [Jonas in actie: automatisering met AI (video)](https://help.afas.nl/video/video_JsJlcwFnQQk)
- [AFAS Roadmap](https://www.afas.nl/roadmap)
- [AFAS voor schoonmaakbedrijven](https://www.afas.nl/branche/schoonmaak)
- [AFAS API Documentation](https://docs.afas.help/profit/en/GetConnector)
- [AFAS Software — Apideck Connector](https://www.apideck.com/connectors/afas)
- [Watermelon.ai — AFAS Customer Service Case](https://watermelon.ai/success-story/afas-software/)
- [Virtual Workforce — AFAS Order Entry Automation](https://virtualworkforce.ai/order-entry-automation-afas-2/)
- [AFAS Open 2024 — AI & AFAS (video)](https://help.afas.nl/video/video_nTlxOIkV4v8)
- [AFAS on GetApp](https://www.getapp.com/hr-employee-management-software/a/afas-software/)
