# Microsoft Dynamics 365 CRM

**Client:** Asito (part of ADG)
**Date:** February 6, 2026
**Status:** ✅ Approved
**Confidence:** High
**Focus Area:** CRM, Sales, Customer Service, Field Service

---

## 1. Executive Summary

Microsoft Dynamics 365 is a comprehensive, enterprise-grade CRM platform that acts as a central system of record for sales, customer service, and field operations. It is currently rated with **High AI Maturity** due to the deep integration of **Microsoft Copilot**, a generative AI assistant that powers email drafting, meeting summarization, and autonomous agent capabilities.

As of early 2026, Microsoft is recognized as a leader in both the Forrester CRM Wave and Gartner Magic Quadrant. The platform offers significant strategic value for Asito by unifying customer data and leveraging the existing Microsoft 365 ecosystem. Notably, the **Copilot for Sales, Service, and Finance** capabilities are now included in the standard Microsoft 365 Copilot license ($30/user/month), improving cost-efficiency compared to previous pricing models.

---

## 2. Tool Profile & Specifications

| Attribute | Details |
| --- | --- |
| **Vendor** | Microsoft |
| **Category** | CRM / System of Record |
| **Deployment** | SaaS (Cloud-based on Microsoft Dataverse) |
| **AI Agent** | **Copilot** (GenAI assistant) |
| **Pricing** | **$30/user/month** (Microsoft 365 Copilot – includes Sales/Service/Finance) |
| **Prerequisites** | Microsoft 365 E3/E5 or Business Standard/Premium |
| **Compliance** | GDPR, SOC 2, HIPAA, ISO 27001, FedRAMP |
| **Data Residency** | Global (Regionally configurable; EU options available) |

---

## 3. AI Capabilities & Maturity

**Rating: Very High**
Dynamics 365 features "Copilot" as a native, deeply integrated AI assistant. Unlike simple add-ons, it is embedded in the workflow of Sales, Service, and Field Service modules.

### Core AI Features (What Copilot CAN Do)

* **Sales Acceleration:**
* **Email Drafting:** Generates personalized emails using CRM data and past interactions.
* **Meeting Prep:** Creates briefs with account history, open opportunities, and talking points.
* **Real-Time Insights:** Transcribes Teams calls live, identifying KPIs and sentiment.
* **Autonomous Agents:** Qualifies and prioritizes inbound leads automatically (2025+ feature).


* **Customer Service Efficiency:**
* **Case Summarization:** instantly condenses complex case histories into 2-sentence summaries for agents.
* **Smart Answers:** Allows agents to ask natural language questions ("What are the SLA terms for [Customer]?") against the knowledge base.


* **Field Service Optimization (Relevant to Cleaning/Facility Mgmt):**
* **Smart Scheduling:** Optimizes technician/cleaner dispatch based on skills, location, and equipment.
* **Work Order Automation:** Converts cases to work orders automatically; supports templates for recurring tasks like "Deep Clean" or "Panel Cleaning."



### Known Limitations (What Copilot CAN'T Do)

* **Licensing Gates:** No free trial; requires specific M365 base licenses (E3/E5).
* **Ecosystem Dependency:** Best features (meeting summaries, email drafts) require Outlook and Teams usage.
* **Data Friction:** Finance Agent features currently require specific ERP connections (D365 Finance or SAP).
* **Sensitivity Gaps:** Copilot may not fully recognize encryption labels on external data sources.

---

## 4. Integration Architecture for Asito

Dynamics 365 supports a robust integration ecosystem, particularly relevant for Asito’s existing tool stack (AFAS, ORTEC).

### Proposed Data Flow

The following architecture suggests how Dynamics 365 could sit as the central engine, feeding data to specialist tools:

```mermaid
graph TD
    D365[Dynamics 365 CRM] -->|Sales/Contracts| AFAS[AFAS (HRM/Payroll)]
    AFAS -->|Employee Data| ORTEC[ORTEC (Scheduling)]
    ORTEC -->|Schedule/Resource| Appreo[Appreo (Work Orders)]
    
    subgraph AI Layer
    D365 -.-> Copilot[Copilot]
    AFAS -.-> Jonas[Jonas AI]
    ORTEC -.-> TESSA[TESSA AI]
    end

```

### AFAS Integration Options

Several Dutch partners offer mature connectors to bridge Dynamics 365 and AFAS:

* **Alumio (iPaaS):** Code-free integration for workflow automation.
* **Commercient SYNC:** Direct sync of sales orders to AFAS ERP to eliminate manual entry.
* **KoppelHet:** Azure-based integration services for robust data handling.

---

## 5. Strategic Fit & Comparison

| Feature | **Dynamics 365** | **HubSpot** | **Appreo** |
| --- | --- | --- | --- |
| **Primary Role** | Enterprise CRM & System of Record | Marketing & Light CRM | Work Order & Field Ops |
| **AI Agent** | **Copilot (GenAI + Agents)** | Breeze (Content Gen) | None (Rule-based) |
| **AI Maturity** | **Very High** | High | Low |
| **Key Strength** | Deep Office 365 Integration, autonomous agents | Ease of use, content creation | specialized operational execution |
| **Weakness** | Complexity, requires setup | Less customizable for complex field ops | Limited CRM/Sales capabilities |

**Customer Sentiment:**

* **Pros:** Users value the seamless integration with Outlook/Teams and the ability to dial/record calls directly from the CRM.
* **Cons:** Licensing can be confusing; setup requires a dedicated partner/admin; dashboards often need customization to be user-friendly.

---

## 6. Risks & Governance

* **Data Governance:** The vast customization options can lead to complexity. Asito must map workflows clearly to avoid "technical debt."
* **Data Leakage:** Copilot effectively accesses all data a user has permission to see. Permissions must be strictly configured to prevent it from surfacing sensitive data (e.g., executive salaries) in chat answers.
* **Adoption Curve:** "Setup isn't flip-a-switch." Success depends heavily on the quality of the implementation partner.

---

## 7. Recommended Next Steps

### Immediate Actions

1. **Audit Data Privacy:** Review Asito's current Power Platform admin settings to ensure AI features comply with internal data policies.
2. **Pilot Copilot:** Enable Copilot in a sandbox environment. Test specifically for **Meeting Prep** (Sales) and **Case Summarization** (Service) to measure time savings.
3. **Field Service Assessment:** Compare D365 Field Service capabilities directly against Appreo to determine if consolidation is viable or if they should remain integrated.

### Strategic Planning

4. **Licensing Review:** Evaluate the new pricing ($30/user/mo) against the user base size (<300 users may qualify for SMB pricing at $21/user/mo).
5. **Integration Mapping:** Select a partner (e.g., Alumio or KoppelHet) to map the critical data flow between **Dynamics 365 (Sales)** and **AFAS (Invoicing/HR)**.

---

**Sources:**

* *AI Readiness Report: Microsoft Dynamics 365 CRM (Asito)*
* *Microsoft Dynamics 365 CRM Assessment (Approved)*