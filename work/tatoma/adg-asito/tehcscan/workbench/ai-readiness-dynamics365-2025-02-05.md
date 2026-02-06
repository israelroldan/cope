# AI Readiness Report: Microsoft Dynamics 365 CRM

**Client**: Asito (part of ADG)
**Date**: February 5, 2025
**Focus Area**: CRM, Sales, Customer Service, Field Service

---

## Executive Summary

Microsoft Dynamics 365 is an enterprise CRM/ERP platform with **Copilot** as its branded AI assistant – the same AI powering Microsoft 365. Copilot is deeply integrated across Sales, Customer Service, and Field Service modules, offering email drafting, meeting preparation, conversation summarization, and autonomous AI agents. Microsoft was named a **Leader in Forrester's CRM Wave Q1 2025** and **Gartner's Magic Quadrant 2024** for CRM. As of October 2025, Copilot for Sales, Service, and Finance are **included in the Microsoft 365 Copilot license at $30/user/month** (previously $50/user/month with add-ons). AFAS integration is available through multiple Dutch partners like Alumio, Commercient, and KoppelHet.

---

## Branded AI Assistant

| Attribute | Details |
|-----------|---------|
| **Name** | **Copilot** |
| **Status** | Generally Available (GA) |
| **Launch** | February 2024 (GA for Sales & Service) |
| **Positioning** | "AI companion that works with you in every app" |
| **Pricing** | $30/user/month (Microsoft 365 Copilot – now includes Sales, Service, Finance) |
| **Prerequisites** | Microsoft 365 E3/E5 or Business Standard/Premium |
| **Regional Availability** | Full GA in US, UK, Australia, India; Preview in EU and other regions |

---

## AI Capabilities (What Copilot CAN Do)

### 1. Copilot for Sales

#### Email & Communication
- **Draft personalized emails** based on CRM data and customer history
- **Summarize email threads** to extract key points and buying intent
- **BANT analysis** (Budget, Authority, Need, Timing) from email content
- **Auto-save emails and meetings** to CRM records

> **Demo-ready use case**: A sales rep receives a long email thread from a prospect. Copilot summarizes it in seconds, highlights buying signals, and drafts a personalized follow-up email using account data from CRM.

#### Meeting Preparation & Follow-up
- **Generate meeting briefs** in Word with customer history, recent interactions, and open opportunities
- **Real-time sales insights** during Teams calls
- **Meeting summaries** with conversation analysis, sales keywords, KPIs, and suggested next actions
- **Auto-transcription** of calls saved to CRM

> **Demo-ready use case**: Before a client call, Copilot generates a prep brief including recent emails, past meeting notes, open opportunities, and suggested talking points – delivered directly in Teams or Outlook.

#### Natural Language Chat
- Ask Copilot questions about your sales data in plain language
- "Show me all opportunities closing this month over €50,000"
- "What's the status of my deal with [Customer]?"

#### AI Agents (2025+)
- **Autonomous lead qualification** and prioritization
- **Schedule meetings** and follow up with prospects automatically
- **Sales Qualification Agent** researches and scores leads based on customer data

> **Demo-ready use case**: Configure the Sales Qualification Agent to automatically research inbound leads, score them based on fit criteria, and route high-priority leads to the appropriate sales rep – without manual intervention.

### 2. Copilot for Customer Service

#### Ask Questions
- Agents can ask Copilot questions and get answers from knowledge base, trusted websites, and internal documents
- Expands search across configured trusted domains

> **Demo-ready use case**: A customer service agent handling a call about a specific contract can ask Copilot "What are the SLA terms for [Customer]?" and get an instant answer from the knowledge base.

#### Response Drafting
- **Draft email responses** based on conversation context and knowledge base
- Pre-made templates or custom prompts
- Personalized to the specific customer and issue

#### Case Summarization
- **Automatic case summaries** including title, customer, product, priority, and description
- Quick overview for agents picking up a case
- Conversation summaries during and after interactions

> **Demo-ready use case**: An agent receives a transferred call. Instead of reading the full case history, Copilot provides a 2-sentence summary: "Customer reported recurring billing issue on Jan 15. Previous agent promised callback within 24 hours – no follow-up recorded."

#### Smart Assist Workspace
- Browser-like tabbed interface for multi-session handling
- AI identifies similar cases and relevant knowledge articles
- Proactive suggestions during conversations

### 3. Copilot for Field Service

- **Work order management** with AI-powered scheduling
- **Convert cases to work orders** automatically
- **Predictive maintenance** – schedule cleaning/repairs when actually needed
- **Facility and equipment scheduling** for shared resources

> **Demo-ready use case (Cleaning Industry)**: Configure incident types for "Panel Cleaning" or "Deep Clean" that auto-populate work orders with required resources, estimated duration, and skills needed.

---

## AI Limitations (What Copilot CAN'T Do)

| Limitation | Details |
|------------|---------|
| **No free trial** | Microsoft 365 Copilot has no trial available |
| **Requires M365 license** | Must have E3/E5 or Business Standard/Premium as prerequisite |
| **Limited without Teams/Outlook** | Many best features require Microsoft ecosystem |
| **Regional restrictions** | Some features preview-only outside US/UK/AU |
| **Language limitations** | Finance Agent only supports US English currently |
| **No free tier** | Limited Copilot features for D365 Sales Enterprise do not get new features |
| **ERP dependency** | Finance Agent requires connected ERP (D365 Finance, Business Central, or SAP) |
| **Data movement required** | Non-US/EU regions need to enable cross-region data movement |
| **Sensitivity label gaps** | Copilot doesn't recognize encryption on external data sources |
| **Image generation limits** | Daily limits apply without full Copilot license |

---

## Demo-Ready Use Cases

### Use Case 1: AI-Powered Sales Meeting Preparation
**Source**: Microsoft Learn / Copilot for Sales
**Description**: Before client meetings, Copilot automatically generates a preparation brief including account history, recent interactions, open opportunities, and suggested talking points.
**Impact**: 4x faster meeting prep
**Link**: [Copilot for Sales](https://learn.microsoft.com/en-us/microsoft-sales-copilot/introduction)

### Use Case 2: Real-Time Call Transcription & Insights
**Source**: Dynamics 365 Sales
**Description**: During Teams calls, Copilot provides real-time transcription, identifies sales keywords and KPIs, and generates post-call summaries with action items – all saved to the CRM record.
**Link**: [Copilot in D365 Sales](https://learn.microsoft.com/en-us/dynamics365/sales/copilot-overview)

### Use Case 3: Customer Service Case Summarization
**Source**: Dynamics 365 Customer Service
**Description**: When agents open or receive transferred cases, Copilot provides instant AI-generated summaries including customer history, issue description, and previous actions taken.
**Link**: [Copilot in Customer Service](https://learn.microsoft.com/en-us/dynamics365/customer-service/administer/configure-copilot-features)

### Use Case 4: Autonomous Lead Qualification Agent
**Source**: 2025 Release Wave
**Description**: The Sales Qualification Agent automatically researches inbound leads, scores them based on fit criteria, and routes qualified leads to sales reps – without manual intervention.
**Link**: [D365 Sales 2025 Wave](https://learn.microsoft.com/en-us/dynamics365/release-plan/2025wave2/sales/dynamics365-sales/)

### Use Case 5: Field Service Work Order Automation (Cleaning Industry)
**Source**: Dynamics 365 Field Service
**Description**: Create incident types for recurring cleaning tasks that auto-populate work orders with required skills, equipment, and estimated duration. AI-optimized scheduling matches technicians based on skills and proximity.
**Link**: [D365 Field Service](https://learn.microsoft.com/en-us/dynamics365/field-service/overview)

---

## Integration with Asito's Stack

### AFAS Integration Options

Multiple Dutch integration partners offer AFAS ↔ Dynamics 365 connectors:

| Partner | Integration Type | Features |
|---------|-----------------|----------|
| **Alumio** | iPaaS | Pre-built connectors, code-free integration, workflow automation |
| **Commercient SYNC** | Direct sync | Sales orders from CRM to AFAS ERP, eliminates manual entry |
| **KoppelHet** | Azure-based | Microsoft Azure Integration Services, robust and flexible |
| **APIcenter** | API connector | Inventory sync, item data, automated data transfer |
| **Peliqan** | Data warehouse | Sync to data warehouse for Power BI reporting |

### Potential Integration Architecture for Asito

```
Dynamics 365 CRM (Sales/Service/Field Service)
          ↓ (Commercient SYNC or Alumio)
        AFAS (HRM/Payroll) ← Jonas AI
          ↓
   ORTEC (Scheduling) ← TESSA AI
          ↓
   Appreo (Work Orders)
```

### Field Service Relevance for Cleaning Industry

Dynamics 365 Field Service is specifically designed for facility management and cleaning services:
- **Work order templates** for recurring cleaning tasks
- **Scheduling optimization** based on skills, location, and equipment
- **Performance tracking** for SLA compliance
- **Client portal** for real-time service visibility

---

## Customer Sentiment

### What Users Love

- **"Microsoft ecosystem integration is seamless"** – works natively with Outlook, Teams, and Power BI
- **"Teams dialer inside Sales Hub lets reps call from CRM"** – real-time transcripts saved to records
- **"Copilot drafts follow-ups faster"** – AI layer helps triage and respond
- **Industry recognition** – Leader in Forrester CRM Wave Q1 2025 and Gartner Magic Quadrant 2024

### What Users Find Challenging

- **"Licensing is powerful but confusing"** – Professional vs. Enterprise vs. Premium + Copilot add-on
- **"Setup isn't flip-a-switch"** – requires time on security roles, server sync, and configuration
- **"Dashboard could use an upgrade"** – layout makes it difficult to quickly access metrics
- **"Mixed implementation experiences"** – quality depends heavily on implementation partner

### G2/Capterra Ratings

| Platform | Rating | Reviews |
|----------|--------|---------|
| **G2 (Sales)** | 4.4/5 | Multiple reviews |
| **G2 (Customer Service)** | 4.3/5 | Multiple reviews |
| **Capterra** | 4.2/5 (value-for-money) | 2024 Shortlist |

### Productivity Impact (Microsoft Data)

- **70%** of Copilot users report being more productive
- **68%** say it improved work quality
- **29%** faster on tasks (searching, writing, summarizing)
- **4x faster** catching up on missed meetings
- **64%** spend less time processing email

---

## AI Maturity Assessment

| Dimension | Rating | Notes |
|-----------|--------|-------|
| **Native AI Features** | **Very High** | Copilot deeply integrated across all modules |
| **AI Agent Capabilities** | Very High | Autonomous agents for lead qualification, scheduling |
| **Integration Ecosystem** | High | Multiple Dutch partners for AFAS integration |
| **Documentation Quality** | Very High | Extensive Microsoft Learn documentation |
| **Customer Adoption** | High | Leader in analyst rankings |
| **Regional Compliance** | High | EU data residency options available |

---

## Comparison: Dynamics 365 vs. Asito's Other Tools

| Aspect | Dynamics 365 | AFAS | HubSpot | ORTEC | Appreo | Ubeeo |
|--------|-------------|------|---------|-------|--------|-------|
| **Branded AI** | **Copilot** | Jonas | Breeze | TESSA | None | None |
| **AI Type** | Full generative + Agents | Workflow AI | Generative content | ML + conversational | Rule-based | Partner (In2Dialog) |
| **Key AI Feature** | Email/meeting AI, autonomous agents | Speech-to-text, HR workflows | Content generation | Schedule optimization | Indicators | Interview analysis |
| **AI Maturity** | **Very High** | Very High | Very High | High | Low | Medium |
| **Pricing** | $30/user/month (Copilot) | Included | Included (tiers) | Varies | Included | Varies |

---

## Recommended Next Steps for Asito

### Assessment Phase

1. **Confirm CRM Status**
   - Verify if Asito currently uses Dynamics 365 or another CRM
   - If not using D365, assess fit vs. current CRM solution
   - Consider Microsoft ecosystem alignment (already using AFAS, likely using M365)

2. **Pilot Copilot Features**
   - If using D365: Enable Copilot in a sandbox environment
   - Test email drafting, meeting prep, and case summarization
   - Measure time savings vs. current workflows

3. **Evaluate Field Service Module**
   - Assess D365 Field Service for cleaning/facility operations
   - Compare with Appreo's work order functionality
   - Determine if complementary or overlapping

### Integration Planning

4. **AFAS Integration Assessment**
   - If using D365: Evaluate Commercient SYNC or KoppelHet for AFAS integration
   - Map data flows: CRM contacts → AFAS employees, D365 orders → AFAS invoicing
   - Consider unified reporting via Power BI

5. **Microsoft Ecosystem Leverage**
   - If on Microsoft 365: Copilot features multiply value
   - Teams integration provides call recording, transcription, and AI summaries
   - Power Platform extends automation possibilities

### Strategic Considerations

6. **Copilot License Planning**
   - New pricing (Oct 2025): $30/user/month includes Sales, Service, and Finance
   - Previously $50/user/month – significant savings opportunity
   - SMB option: $21/user/month for <300 users

7. **Cross-Tool AI Strategy**
   - D365 Copilot for CRM/sales/service AI
   - AFAS Jonas for HR/payroll workflows
   - ORTEC TESSA for employee scheduling questions
   - HubSpot Breeze for marketing content

---

## Pricing Summary

| Copilot Option | Price | Includes |
|----------------|-------|----------|
| **Microsoft 365 Copilot** | $30/user/month | Copilot for Sales + Service + Finance |
| **Copilot Business (SMB)** | $21/user/month | For <300 users |
| **D365 Sales Enterprise** | Limited free Copilot | Basic features only, no new features planned |

**Note**: Requires Microsoft 365 E3/E5 or Business Standard/Premium as prerequisite.

---

## Sources

- [Copilot in Dynamics 365 Sales Overview](https://learn.microsoft.com/en-us/dynamics365/sales/copilot-overview)
- [Copilot for Sales Features](https://learn.microsoft.com/en-us/microsoft-sales-copilot/features-d365-users)
- [Copilot in Dynamics 365 Customer Service](https://learn.microsoft.com/en-us/dynamics365/customer-service/administer/configure-copilot-features)
- [Dynamics 365 2024 Release Wave 2](https://learn.microsoft.com/en-us/dynamics365/release-plan/2024wave2/)
- [Dynamics 365 2025 Release Wave 2](https://learn.microsoft.com/en-us/dynamics365/release-plan/2025wave2/sales/dynamics365-sales/)
- [Microsoft 365 Copilot Pricing](https://www.microsoft.com/en-us/microsoft-365-copilot/pricing)
- [Copilot License Changes (Stoneridge)](https://stoneridgesoftware.com/big-changes-to-copilot-licenses-impacting-dynamics-365/)
- [Dynamics 365 Field Service Overview](https://learn.microsoft.com/en-us/dynamics365/field-service/overview)
- [Dynamics 365 Reviews (Capterra)](https://www.capterra.com/p/157279/Dynamics-365/reviews/)
- [Dynamics 365 Sales Reviews (G2)](https://www.g2.com/products/dynamics-365-sales/reviews)
- [AFAS to Dynamics 365 Integration (Alumio)](https://www.alumio.com/connect/afas-to-microsoft-dynamics-365-crm)
- [Commercient SYNC for AFAS/D365](https://www.commercient.com/product/sync-integration-for-afas-software-and-dynamics-365-crm/)
- [Dynamics 365 CRM for Facility Management](https://akitais.com/news/dynamics-365-crm-for-facility-management/)
