# Process-Capability Mapping Generator

## Purpose
Generate an industry-specific process mapping as a **starting hypothesis** before the first client workshop. This gives you a prepared baseline that demonstrates domain knowledge while leaving room for client-specific refinement.

---

## Prompt

```
You are a business process analyst preparing for a Connected Intelligence discovery session with a new client. Your task is to generate a **hypothesis process-capability mapping** based on the client's industry and context.

## Client Context
- **Company name:** {{company_name}}
- **Industry:** {{industry}}
- **Business description:** {{description}}
- **Size:** {{size}} (employees/revenue if known)
- **Known systems:** {{known_systems}} (if any, otherwise "Unknown")

## Your Task

Generate a process mapping table with the following structure:

| Id | Category | Process | Stage | Likely Systems | Integration Hypothesis | AI Capability Examples | Confidence |
|----|----------|---------|-------|----------------|----------------------|------------------------|------------|

### Column definitions:
- **Category**: High-level grouping (use industry-appropriate terminology)
- **Process**: Standard process name (use X-to-Y naming convention where appropriate)
- **Stage**: Sub-step within the process
- **Likely Systems**: Common tools for this industry/process (mark with ❓ if guessing)
- **Integration Hypothesis**: Where data likely flows between systems
- **AI Capability Examples**: Potential AI interventions at this stage
- **Confidence**: High / Medium / Low — how certain are you this applies to this client?

### Industry Templates

Use these category structures based on industry:

**Professional Services / Agencies:**
- Intake & Briefing (Lead-to-Opportunity, Brief-to-Kickoff)
- Production & Handoffs (Concept-to-Delivery, Request-to-Fulfill)
- Delivery & Knowledge (Deliver-to-Archive, Time-to-Cash)
- Operations & Patterns (Hire-to-Retire, Issue-to-Resolution, Report-to-Insight)

**Field Services / Staffing / Facility Management:**
- Primair: Lead-to-Order, Order-to-Service, Service-to-Cash
- Ondersteunend: Market-to-Lead, Procure-to-Pay, Hire-to-Retire, Incident-to-Resolution
- Besturend: Record-to-Report

**Product / SaaS Companies:**
- Acquire (Lead-to-Customer, Trial-to-Paid)
- Activate (Onboard-to-Active, Request-to-Resolution)
- Retain (Usage-to-Renewal, Feedback-to-Improvement)
- Expand (Customer-to-Advocate, Upsell-to-Close)
- Operate (Hire-to-Retire, Procure-to-Pay, Record-to-Report)

**Financial Services / Accounting Bureaus:**
- Client Services (Engage-to-Onboard, Request-to-Deliver, Query-to-Resolution)
- Core Processing (Collect-to-Reconcile, Process-to-Report, Audit-to-File)
- Advisory (Analyze-to-Advise, Plan-to-Execute)
- Operations (Hire-to-Retire, Procure-to-Pay, Comply-to-Report)

**Manufacturing / Distribution:**
- Demand (Forecast-to-Plan, Order-to-Commit)
- Supply (Procure-to-Receive, Make-to-Stock/Order)
- Fulfill (Pick-to-Ship, Deliver-to-Invoice)
- Service (Install-to-Support, Issue-to-Resolution)
- Operate (Hire-to-Retire, Maintain-to-Optimize, Record-to-Report)

**Healthcare / Care Services:**
- Patient/Client Journey (Refer-to-Intake, Assess-to-Plan, Treat-to-Discharge, Follow-to-Outcome)
- Operations (Schedule-to-Deliver, Hire-to-Retire, Procure-to-Pay)
- Compliance (Document-to-Audit, Incident-to-Resolution)
- Revenue (Service-to-Claim, Claim-to-Cash)

### Common Systems by Industry

**Professional Services / Agencies:**
- CRM: HubSpot, Pipedrive, Salesforce
- Projects: Monday.com, Asana, Jira, Productive
- Creative: Adobe Suite, Figma, Frame.io
- Finance: Exact, Twinfield, Xero, QuickBooks
- HR: Personio, HiBob, Workday
- Time: Harvest, Toggl, Clockify

**Field Services / Staffing:**
- ERP/HR: AFAS, SAP, Workday, ADP
- Workforce Planning: Ortec, Quinyx, Deputy, Humanity
- CRM: Dynamics 365, Salesforce, HubSpot
- Service: TOPdesk, ServiceNow, Freshservice
- Time & Attendance: Various clock systems

**Product / SaaS:**
- CRM: Salesforce, HubSpot
- Product: Amplitude, Mixpanel, Pendo
- Support: Zendesk, Intercom, Freshdesk
- Engineering: Jira, Linear, GitHub
- Finance: Stripe, Chargebee, NetSuite

**Financial Services:**
- Practice Mgmt: CCH, Thomson Reuters, Wolters Kluwer
- Accounting: Exact, Unit4, SAP
- Document Mgmt: SharePoint, iManage
- Workflow: Various proprietary

### Output Requirements

1. Generate 25-40 rows covering all major processes
2. Mark Low confidence items with ❓ in the Systems column
3. Include a "Likely Friction Points" section after the table
4. Include "Questions to Validate" section with 5-10 key questions for the discovery session
5. Output as CSV-compatible format

### Likely Friction Points Section

After the table, identify 5-8 friction points that are **common in this industry**:

| Process | Friction | Why it's common | AI Opportunity |
|---------|----------|-----------------|----------------|

### Questions to Validate Section

Generate questions that will help you:
1. Confirm or reject your system hypotheses
2. Discover their actual process terminology
3. Identify their specific pain points
4. Understand their IT architecture philosophy (best-of-breed vs. consolidated)
```

---

## Usage Examples

### Example 1: Creative Agency

**Input:**
```
Company name: Rosie Creative
Industry: Creative Agency
Business description: Full-service creative agency, 45 people, brand strategy, campaigns, content production
Size: 45 employees
Known systems: Monday.com, Figma
```

**Output would include:**
- Categories: Intake & Briefing, Production & Handoffs, Delivery & Knowledge, Operations & Patterns
- Processes: Lead-to-Opportunity, Brief-to-Kickoff, Concept-to-Delivery, etc.
- Systems: Monday.com (confirmed), Figma (confirmed), ❓ Harvest, ❓ HubSpot

---

### Example 2: Accounting Bureau

**Input:**
```
Company name: Van der Berg Accountants
Industry: Accounting Bureau
Business description: Mid-size accounting firm, audit, tax, advisory for SME clients
Size: 120 employees
Known systems: Exact Online
```

**Output would include:**
- Categories: Client Services, Core Processing, Advisory, Operations
- Processes: Engage-to-Onboard, Collect-to-Reconcile, Audit-to-File, etc.
- Systems: Exact Online (confirmed), ❓ CCH, ❓ CaseWare

---

### Example 3: Field Services

**Input:**
```
Company name: CleanCorp
Industry: Facility Management / Cleaning Services
Business description: Commercial cleaning, 2000 cleaners, B2B contracts
Size: 2000 field workers, 50 office staff
Known systems: Unknown
```

**Output would include:**
- Categories: Primair, Ondersteunend, Besturend
- Processes: Lead-to-Order, Order-to-Service, Service-to-Cash, Hire-to-Retire
- Systems: ❓ AFAS, ❓ Ortec, ❓ Dynamics

---

## Integration with Techscan Workflow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  1. COLD START  │────▶│  2. DISCOVERY   │────▶│  3. VALIDATED   │
│                 │     │                 │     │                 │
│  Generate       │     │  Workshop with  │     │  Final mapping  │
│  hypothesis     │     │  client         │     │  anchored on    │
│  from industry  │     │  Fill gaps      │     │  their reality  │
│  template       │     │  Correct errors │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                       │                       │
        ▼                       ▼                       ▼
   process-mapping-         Updated CSV            v2 mapping
   hypothesis.csv          with ✅/❌             (like Asito)
```

---

## Notes

- **Never present hypotheses as facts** — frame as "based on similar companies, we expect..."
- **The goal is to look prepared, not prescriptive** — clients appreciate when you've done homework but remain curious
- **Use their terminology once you learn it** — adapt your category names to match their internal language
- **Friction points are conversation starters** — "We often see X in this industry — is that true for you?"
