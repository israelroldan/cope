# Research Overview — Microsoft Dynamics 365 CRM
**AI Readiness report as part of Asito's IT Landscape**
**Sticky: 🟢 Very High AI Maturity**

---

## KEY DETAILS

- **Vendor:** Microsoft
- **Owner at Asito:** Sales / Customer Service / Field Service
- **Used for:** Enterprise CRM — central system of record for sales, customer service, and field operations. Unified with Microsoft 365 ecosystem.
- **Scale:** Forrester CRM Wave Leader + Gartner Magic Quadrant Leader (2026)
- **Contract/Licensing:** $30/user/month (M365 Copilot — includes Sales/Service/Finance). Prerequisites: M365 E3/E5 or Business Standard/Premium. SMB pricing available at $21/user/month (<300 users).
- **Deployment:** SaaS (Cloud-based on Microsoft Dataverse); EU data residency available
- **Compliance:** GDPR, SOC 2, HIPAA, ISO 27001, FedRAMP

---

## API AVAILABILITY AND INTEGRATIONS

- **Platform:** Built on Microsoft Dataverse with Power Platform extensibility
- **AFAS integration options:**
  - **Alumio (iPaaS)** — Code-free workflow automation
  - **Commercient SYNC** — Direct sync of sales orders to AFAS ERP
  - **KoppelHet** — Azure-based integration services
- **Native ecosystem:** Deep integration with Outlook, Teams, SharePoint, Excel, Power BI, Power Automate
- **Proposed data flow architecture:**
  - D365 (Sales/Contracts) → AFAS (HRM/Payroll) → ORTEC (Scheduling) → Appreo (Work Orders)
  - AI layer: Copilot (D365) + Jonas (AFAS) + ORTEC optimization

---

## OPPORTUNITIES / USE CASES

**Quick wins (ready now):**
- **Meeting Prep with Copilot:** Auto-generate briefings with account history, open opportunities, and talking points before sales calls
- **Email Drafting:** Generate personalized emails using CRM data and past interactions
- **Case Summarization:** Instantly condense complex service case histories into 2-sentence summaries
- **Smart Answers:** Agents ask natural language questions against the knowledge base ("What are the SLA terms for [Customer]?")

**Vision / medium-term:**
- **Autonomous Lead Agents:** Auto-qualify and prioritize inbound leads (2025+ feature)
- **Field Service Optimization:** Smart scheduling of cleaners/technicians based on skills, location, equipment
- **Work Order Automation:** Convert cases to work orders with templates for recurring tasks ("Deep Clean", "Panel Cleaning")
- **Integration hub:** Position D365 as the central engine feeding specialist tools (AFAS, ORTEC, Appreo)

---

## KEY AI CAPABILITIES

- **Branded AI:** Microsoft Copilot (GenAI assistant, deeply embedded — not a bolt-on)
- **Sales Acceleration:**
  - Personalized email drafting from CRM data
  - Meeting prep briefs (account history, opportunities, talking points)
  - Real-time Teams call transcription with KPI/sentiment identification
  - Autonomous lead qualification agents
- **Customer Service:**
  - Case summarization (complex histories → 2-sentence summaries)
  - Natural language knowledge base queries
- **Field Service:**
  - Smart scheduling (skills, location, equipment optimization)
  - Work order automation with templates for recurring tasks
- **AI type:** Generative AI (GPT-4 based) + autonomous agents

---

## KEY LIMITATIONS AND CONSTRAINTS

- **Licensing complexity:** No free trial; requires specific M365 base licenses (E3/E5). Can be confusing.
- **Ecosystem dependency:** Best features (meeting summaries, email drafts) require Outlook + Teams usage
- **Data friction:** Finance Agent features require specific ERP connections (D365 Finance or SAP)
- **Sensitivity gaps:** Copilot may not fully recognize encryption labels on external data sources
- **Data governance risk:** Copilot accesses all data a user has permission to see — strict permissions required to prevent surfacing sensitive data
- **Adoption curve:** "Setup isn't flip-a-switch" — success depends heavily on implementation partner quality
- **Dashboard customization:** Out-of-the-box dashboards often need significant customization to be user-friendly
- **Complexity:** Vast customization options can lead to "technical debt" if workflows aren't clearly mapped

---

## SHOWCASE

- **Demo: Meeting Prep** — Before a client meeting, Copilot generates a brief with full account history, open deals, and suggested talking points
- **Demo: Case Summarization** — Complex service case with 50+ interactions → instant 2-sentence summary for agent handoff
- **Demo: Field Service Scheduling** — Optimize dispatcher decisions for cleaning staff based on skills, location, and availability
- **Reference:** Gartner MQ Leader + Forrester Wave Leader (2026)
- **Architecture diagram:** D365 → AFAS → ORTEC → Appreo integration flow with AI layer overlay
