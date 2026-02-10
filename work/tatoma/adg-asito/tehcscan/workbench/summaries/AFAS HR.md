# Research Overview — AFAS Software (HR System)
**AI Readiness report as part of Asito's IT Landscape**
**Sticky: 🟡 Medium AI Maturity (HR-specific)**

---

## KEY DETAILS

- **Vendor:** AFAS Software (Netherlands)
- **Owner at Asito:** HR / Payroll department
- **Used for:** Integrated HRM suite — personnel admin, payroll (200+ CAOs incl. CAO Schoonmaak), recruitment (ATS), onboarding, leave & absence, performance management, talent management, employee self-service (InSite/Pocket)
- **Scale:** 14,000+ organizations; 3.8M payslips processed; AFAS Pocket is #1 business app in NL
- **Contract/Licensing:** SaaS; starts at €350/month. Jonas AI included at no extra charge (fair use)
- **Review scores:** Feedback Company 7.7/10 (664 reviews); Capterra HR Feature Score 13/13

---

## API AVAILABILITY AND INTEGRATIONS

- **REST API:** Full read/write via GetConnectors and UpdateConnectors
- **HR/ATS integrations:**
  - **Teamtailor** — Native ATS connector with AI job matching
  - **Recruitee (Tellent)** — Collaborative hiring, auto-transfers to AFAS
  - **Gladior** — AI vacancy text generation, campaign targeting, career chatbot using AFAS data
- **People Analytics:**
  - **peopleIX** — Predictive turnover/engagement insights from AFAS HR data
  - **Power BI** — Advanced dashboards via Azure Data Factory
- **Onboarding:** Appical integration (gamified digital onboarding)
- **Cross-system:** SAP SuccessFactors connector (Salure/KoppelHet); Workday connector (Aimsterdam); Nmbrs journal entries
- **Chatbots:** Watermelon.ai (internal); Gladior career chatbot; Paradox (Olivia) for recruitment

---

## OPPORTUNITIES / USE CASES

**Quick wins (ready now):**
- Answer employee HR questions at scale using Jonas workflow AI (proven: 6 hrs/month at Zorggroep Sint Maarten)
- AI-powered recruitment screening: Jonas analyzes vacancy + CV + letter → structured assessment
- Performance conversation transcription via Pocket/Apple Watch → auto-generate reports
- Receipt OCR for field supervisors' expense claims
- Summarize CAO Schoonmaak provisions in contract renewal workflows
- Standardized AI templates for recurring HR tasks (rejection emails, sick leave analysis, development goals)

**Vision / medium-term (Profit 8, June 2026):**
- CV parsing: auto-populate dossier fields from CVs
- AI talent matching: cross-vacancy recommendations ("applied for A, fits B better")
- Enhanced speech-to-text with goal/action extraction
- Jonas deployable in ALL workflows with self-configuration

**Gaps requiring 3rd-party:**
- Predictive workforce analytics → peopleIX or custom Power BI
- Employee HR chatbot → Gladior or custom API solution
- AI workforce scheduling → ORTEC (not native to AFAS)

---

## KEY AI CAPABILITIES

- **Jonas AI assistant** (Nov 2024; EU AI Act compliant; CAICO® certified PM)
- **Automated HR Q&A:** Draft responses to employee questions in workflows
- **Recruitment AI screening:** Analyze vacancy + CV + motivation letter → assessment (anti-discrimination aware)
- **Performance transcription:** Voice-record conversations → Jonas transcribes + generates structured report
- **Document-aware HR analysis:** Reference CAOs, employment conditions, policies within workflows
- **Receipt & Expense OCR:** Photo → auto-fill fields in AFAS Pocket
- **AI Task Templates:** Standardized prompts for recurring HR tasks
- **Translation:** One-click to EN/FR/DE/NL-BE for international operations
- **Smart Reactions:** Summarize, rewrite, shorten, change tone on any dossier item (no admin setup)
- **Payroll Auditor:** 130+ automated checks (not GenAI, but effective automation)

---

## KEY LIMITATIONS AND CONSTRAINTS

- **No predictive workforce analytics:** No AI forecasting for turnover, absenteeism, or staffing demand. BI is descriptive only.
- **No conversational HR chatbot:** Employees can't ask Jonas questions directly ("How many leave days left?"). Self-service is form-based.
- **No AI scheduling/rostering:** No shift optimization. Critical gap for facility services → requires ORTEC.
- **No sentiment analysis:** Can't monitor engagement or satisfaction from communications/surveys.
- **No skills inference / talent intelligence:** Skills are manually entered. (Talent matching coming Profit 8.)
- **No autonomous decisions:** All outputs require human review — good for compliance, limits full automation.
- **Prompt tuning required:** Admin investment needed for high-quality, Asito-specific AI outputs.
- **Limited to AFAS ecosystem:** Jonas can't pull data from external systems (planning, T&A, LMS).
- **No image/video analysis:** Text and audio only. Document verification (ID checks) remains manual.
- **UI criticism:** Some users report interface is "confusing" and "counterintuitive."
- **Implementation heavy:** No guided setup; organizations self-configure.

---

## SHOWCASE

- **Demo: Employee Q&A Automation** — Zorggroep Sint Maarten: High volume of questions → Jonas proposes answers → HR reviews & sends → 6 hrs/month saved
- **Demo: Recruitment Screening** — Zorggroep Sint Maarten: Jonas analyzes vacancy + CV + letter → structured assessment for hiring manager → faster, consistent evaluation
- **Demo: Performance Conversation** — BACU: Leaders record conversations → Jonas creates full conversation report → focus on listening, not note-taking
- **Reference:** Capterra HR Feature Score 13/13 (all categories covered)
- **Roadmap:** Profit 8 (June 2026) — CV parsing + talent matching = high-volume recruitment transformation
