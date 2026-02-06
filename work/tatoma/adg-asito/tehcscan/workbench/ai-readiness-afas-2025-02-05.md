# AI Readiness Report: AFAS Software

**Client**: Asito (part of ADG)
**Date**: February 5, 2025
**Focus Area**: ERP, HRM, Payroll, Finance

---

## Executive Summary

AFAS Software is a Dutch ERP provider based in Leusden with 600+ employees and 12,000+ customers. Unlike other products in Asito's stack, **AFAS has a branded AI assistant called "Jonas"** – a fully integrated AI assistant that helps with workflow automation, speech-to-text, translation, text summarization, and smart analysis. Over 1,000 organizations are actively using Jonas. Critically, **Asito implemented AFAS and AFAS HR in early 2025**, migrating 9,000+ personnel records, making Jonas immediately relevant for Asito's operations.

---

## Branded AI Assistant

| Attribute | Details |
|-----------|---------|
| **Name** | **Jonas** |
| **Status** | Generally Available (GA) |
| **Launch** | 2024 (expanded November 2024 to InSite/OutSite) |
| **Positioning** | "Your smart AI assistant that makes work easier and faster" |
| **Adoption** | 1,000+ organizations actively using Jonas |
| **Pricing** | Included free via fair use policy |
| **Compliance** | European AI Act compliant; GDPR-compliant |

---

## AI Capabilities (What Jonas CAN Do)

### 1. Workflow Automation with AI

Jonas integrates directly into AFAS workflows to provide intelligent automation:

- **Automatic AI task execution** within any workflow step
- **Smart analysis** of documents, requests, and data
- **AI-generated information blocks** appear at the right moment in workflows
- **Document context** – attach CAO texts, employment terms, or policies to AI prompts

> **Demo-ready use case**: An employee submits an HR question via the portal. Jonas automatically analyzes the question, references the relevant CAO/collective labor agreement, and drafts a suggested response for HR to review and send – saving significant time per query.

### 2. Speech-to-Text (Transcription)

- **Voice recording** via AFAS Pocket or Apple Watch
- **Automatic transcription** – speech converted to text instantly
- **Workflow integration** – transcribed text becomes a dossier item with audio attachment
- **AI summarization** – record a meeting, let Jonas create a summary

> **Demo-ready use case**: A manager records an employee performance review on their phone during the meeting. Jonas transcribes it, generates a summary, and adds it directly to the employee's HR dossier – the manager only needs to review and approve.

### 3. Writing Assistance & Summarization

- **Draft workflow responses** faster with AI-assisted writing
- **Summarize documents** or dossier content automatically
- **Analyze processes** and provide recommendations

> **Demo-ready use case**: When processing a leave request, Jonas can summarize the employee's leave history and remaining balance, helping managers make faster decisions.

### 4. Translation

- **Automatic field translation** for multilingual organizations
- **Supported languages**: English, French, German, Dutch (Belgium)
- **One-click translation** via "magic wand" icon

> **Demo-ready use case**: Asito's international employees can receive communications in their preferred language without HR manually translating documents.

### 5. Scan & Recognition (Expense Management)

- **Receipt scanning** via AFAS Pocket
- **AI text recognition** extracts expense data from photos
- **Automated expense processing**

> **Demo-ready use case**: Field employees photograph receipts; AFAS automatically extracts vendor, amount, and date for expense declarations.

### 6. Machine Learning for Accounting

- **Smart suggestions** for manual reconciliation in AFAS SB
- **General ledger account recommendations** based on historical patterns
- **Time savings** through intelligent matching

---

## AI Limitations (What Jonas CAN'T Do)

| Limitation | Details |
|------------|---------|
| **Not infallible** | AI answers must always be reviewed before use |
| **Not available in Pocket** | Jonas AI is only in InSite/OutSite, not the mobile app |
| **File size limits** | Large attachments can cause Azure OpenAI errors |
| **No conversational chat** | Unlike ChatGPT, Jonas doesn't have a free-form chat interface |
| **Requires activation** | Must be enabled per environment by administrator |
| **Workflow-bound** | AI results only visible during active workflow steps |
| **No predictive forecasting** | No AI-driven demand forecasting or workforce planning |
| **No generative job content** | Cannot draft job descriptions or recruitment content |

---

## Demo-Ready Use Cases

### Use Case 1: AI-Assisted HR Query Response
**Source**: AFAS Help Center / Zorggroep Sint Maarten Case Study
**Description**: Employee submits HR question via portal. Jonas automatically analyzes the question, references relevant policy documents (CAO, employment terms), and drafts a suggested response. HR reviews and sends.
**Time Savings**: Significant reduction per HR query
**Link**: [AFAS Jonas Help](https://help.afas.nl/help/NL/SE/jonas.htm)

### Use Case 2: Voice-to-Dossier Meeting Reports
**Source**: BACU Customer Example
**Description**: Managers use Jonas to record conversations with employees and automatically generate meeting reports. They speak a few keywords, Jonas creates a complete report, they edit and share with the employee.
**Quote**: "Gelukkig heeft AFAS AI zo ingebouwd dat je zelf de controle houdt" (AFAS built AI so you maintain control)
**Link**: [Accountancy Vanmorgen Article](https://www.accountancyvanmorgen.nl/2024/11/28/partner-afas-ai-kan-werk-leuker-en-beter-maken/)

### Use Case 3: Recruitment Workflow with AI Analysis
**Source**: AFAS Recruitment Software
**Description**: Complete recruitment workflow from vacancy creation to onboarding. Jonas can analyze applications and provide smart insights at key workflow decision points.
**Link**: [AFAS Recruitment](https://www.afas.nl/software/recruitment)

### Use Case 4: Expense Receipt Processing
**Source**: AFAS Pocket Features
**Description**: Employees photograph expense receipts. AI automatically recognizes and extracts text, categorizes the expense, and prepares it for approval workflow.
**Link**: [AFAS AI Overview](https://www.afas.nl/software/ai)

---

## Asito's AFAS Implementation (2025)

### Critical Finding: Asito Already Uses AFAS

Asito implemented AFAS and AFAS HR in **early 2025**. Key details from CFO Sjors de Kruiff:

| Aspect | Details |
|--------|---------|
| **Go-Live** | Beginning of 2025 |
| **Scope** | AFAS + AFAS HR |
| **Data Migrated** | 9,000+ personnel records |
| **Strategic Rationale** | Future-proof digitalization; user-friendly HR functionalities |
| **Key Benefits** | Single system for invoice approvals, hour registration, employee data |
| **CAO Support** | AFAS natively supports cleaning industry CAO |

### Asito's Future Plans

According to the case study, Asito is already looking at:
- **Additional system integrations** (likely ORTEC, Appreo)
- **AFAS app expansion** with extra communication functionalities
- **Further automation** of administrative processes

### Implication for Jonas

Since Asito has implemented AFAS in early 2025, **Jonas is immediately available** for use. This represents a significant AI opportunity that may not have been fully explored yet.

---

## Integration Ecosystem

### Native Integrations with Asito's Stack

| System | Integration Status | Data Flow |
|--------|-------------------|-----------|
| **ORTEC** | Standard integration available | Employee planning ↔ AFAS HRM |
| **Appreo** | Certified AFAS partner | Hours, leave, illness, materials → AFAS Payroll |
| **Ubeeo** | Certified AFAS partner | Recruitment data → AFAS HRM for onboarding |

### Key Quote on ORTEC + AFAS Integration

> "There are fantastic planning packages for catering or cleaning, but they can't replace each other. Thanks to the combination of AFAS and Ortec, the complexity remains manageable. We now work with one version of the truth."

### Appreo as Operational Complement

Appreo positions itself as the operational complement to AFAS: plan activities, manage teams, record hours/allowances/leave/illness – all automatically transferred to AFAS where the Payroll Auditor performs 130+ smart checks ensuring correct CLA compliance.

---

## Customer Sentiment

### What Users Love

- **"Fijn dat bijna alles mogelijk is"** – users appreciate the comprehensive functionality
- **CAO integration** – salary changes and collective labor agreement updates handled centrally
- **Self-service** – employees can view payslips, request leave, manage data independently
- **Award-winning employer** – AFAS won "Best Large Employer Netherlands 2022"

### What Users Find Challenging

- **Login issues** – some users report friction with authentication
- **Migration complexity** – transitioning between AFAS products can be difficult
- **Learning curve** – standard processes require adjustment from custom workflows
- **Support response times** – some users report slow helpdesk

### Notable Customer Quote (Asito)

> "De overstap naar AFAS was een strategische keuze om Asito toekomstbestendig te maken. AFAS bleek de ideale keuze vanwege de gebruiksvriendelijke HR-functionaliteiten."
> – Sjors de Kruiff, CFO Asito

---

## AI Maturity Assessment

| Dimension | Rating | Notes |
|-----------|--------|-------|
| **Native AI Features** | **High** | Jonas is a mature, integrated AI assistant |
| **AI Integration Ecosystem** | High | Works within standard AFAS workflows |
| **Documentation Quality** | High | Extensive Dutch help center and partner resources |
| **Customer Adoption** | High | 1,000+ organizations using Jonas |
| **AI Roadmap Visibility** | Medium | "Some applications live, others still in idea phase" |
| **Compliance** | **Very High** | European AI Act compliant, GDPR-proof |

---

## Comparison: AFAS vs. Asito's Other Tools

| Aspect | AFAS | HubSpot | ORTEC | Appreo | Ubeeo |
|--------|------|---------|-------|--------|-------|
| **Branded AI** | **Jonas** | Breeze | TESSA | None | None |
| **AI Type** | Workflow AI + Transcription | Generative content | ML optimization + conversational | Rule-based | Partner integrations |
| **Key AI Feature** | Speech-to-text, workflow automation | Content generation | Schedule optimization | Smart indicators | In2Dialog interviews |
| **AI Maturity** | **Very High** | Very High | High | Low | Medium |
| **Asito Status** | ✅ Implemented 2025 | Unknown | In use | In use since 2021 | Unknown |

---

## Recommended Next Steps for Asito

### Immediate Actions (High Priority)

1. **Activate Jonas in Asito's AFAS Environment**
   - Verify Jonas is enabled in InSite/OutSite
   - Train administrators on AI workflow configuration
   - Start with HR query automation pilot

2. **Pilot Speech-to-Text for Manager Reviews**
   - Enable voice recording for performance conversations
   - Test transcription accuracy with Dutch/multilingual content
   - Measure time savings vs. manual note-taking

3. **Configure AI-Enhanced HR Workflows**
   - Add Jonas analysis steps to leave request workflows
   - Attach CAO documents to AI prompts for policy-compliant responses
   - Test translation for international employees

### Strategic Actions

4. **Verify Integration Health**
   - Confirm ORTEC ↔ AFAS integration is active
   - Validate Appreo → AFAS payroll data flow
   - If using Ubeeo, ensure recruitment → AFAS onboarding works

5. **Explore Combined AI Strategy**
   - Use Jonas for HR/payroll AI within AFAS
   - Use ORTEC TESSA for workforce scheduling questions in ESS app
   - Use HubSpot Breeze for recruitment marketing content
   - Use Ubeeo + In2Dialog for AI interview analysis

6. **Request Jonas Roadmap from AFAS**
   - Ask about planned conversational AI chatbot
   - Understand when Pocket app will get Jonas
   - Explore upcoming InSite/OutSite AI features

---

## Sources

- [AFAS AI Overview (Jonas)](https://www.afas.nl/software/ai)
- [AFAS Jonas Help Center](https://help.afas.nl/help/NL/SE/jonas.htm)
- [AFAS Jonas in Workflows](https://help.afas.nl/content/NL/SE/jonas.htm)
- [1,000+ Organizations Use Jonas (Press Release)](https://www.afas.nl/persbericht/meer-dan-1-000-organisaties-vertrouwen-op-ai-assistent-jonas-om-tijd-te-winnen)
- [Asito AFAS Implementation Case Study](https://www.asito.nl/artikelen/afas-bij-asito-efficientere-processen-en-tevreden-medewerkers-binnen-asito)
- [AFAS for Cleaning Industry](https://www.afas.nl/branche/schoonmaak)
- [AFAS Recruitment Software](https://www.afas.nl/software/recruitment)
- [AFAS Customer Reviews (Trustpilot)](https://www.trustpilot.com/review/afas.nl)
- [VIER Consultancy - Jonas Overview](https://www.vierconsultancy.nl/inspiratie/blogs/ontdek-jonas-de-slimme-ai-assistent-van-afas/)
- [Accountancy Vanmorgen - AI Interview](https://www.accountancyvanmorgen.nl/2024/11/28/partner-afas-ai-kan-werk-leuker-en-beter-maken/)
- [Appreo AFAS Integration](https://www.appreo.nl/en/Koppelingen/afas/)
- [Ubeeo AFAS Integration](https://ubeeo.nl/en/integrated-solutions/afas/)
- [AFAS Service & Maintenance Integrations](https://partner.afas.nl/koppelingen/service-onderhoud)
