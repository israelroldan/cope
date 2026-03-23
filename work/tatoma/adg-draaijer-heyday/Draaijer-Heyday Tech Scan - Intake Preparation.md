# Draaijer-Heyday Tech Scan — Intake Preparation Briefing

*Prepared: March 12, 2026*
*For: Intake call with IT Director + team*

---

## 1. What we know about their landscape

Draaijer-Heyday is a multi-service facility management company (cleaning, hospitality, multiline services) operating across **20+ client administrations**. The IT environment reflects this complexity — one core platform serving many entities, with domain-specific tooling per service line.

### Core: AFAS as the hub

AFAS is the undisputed center of their landscape, covering CRM, Financieel, HR, Payroll, Projecten, Order Management, and Abonnementen. It's not just ERP — it's also the portal layer via **InSite** ("Mijn HEYDAY" pages for info, applications, facilitaire diensten, inkoop) and **OutSite** (client- and applicant-facing portals). PocketApp/Profit extends mobile access.

This is similar to Asito's AFAS-centric architecture — **Jonas is the immediate AI play here too.**

### Scheduling & workforce: fragmented across service lines

Unlike Asito (one ORTEC), Draaijer-Heyday has **multiple scheduling tools by division**:

- **Planbition** — Rooster tool for Hospitality
- **ShiftBase** — Rooster tool for MultiLine
- **PURE** — Plan tool (cross-service?)

This fragmentation is significant. It means scheduling intelligence can't be addressed as one conversation — each tool has its own AI maturity and integration depth with AFAS.

### Facility management: Facilitor is a big deal

**Facilitor** (CAFM software) appears in three flavors:
- 9x Single Client instances (HEYDAY Integrated)
- 1x Multiple Clients instance (HEYDAY Integrated)
- 1x Centraal instance

This is their operational backbone for service delivery to clients. Facilitor connects to AFAS via API/XML/CSV interfaces. **This has no equivalent in the Asito landscape** — it's a domain-specific system that will need its own AI assessment.

### Supporting applications

- **HubSpot** — marketing/CRM (same open question as Asito: endstate unclear)
- **Recruitee** — ATS/recruitment (vs. Ubeeo at Asito)
- **StudyTube** — LMS/learning
- **InSocial** — client/employee feedback
- **Whitevision** — Scan & Herken (OCR tool, document scanning)
- **Ontrafelaar** — custom tool, 2x for Hospitality (likely hours/invoice reconciliation — worth asking about)
- **3x CWS** — custom tool for MultiLine

### BI & data layer

Mature data architecture with an **Azure Data Warehouse** at the center:
- **Data collection layer** feeding from: YouForce/Raet HRM, MS Dynamics CRM, Exact, Facilitor, Planbition, E-Synergy, Tagetik, and external sources
- **Reporting tools**: PowerBI, Tagetik (financial consolidation/CPM), Value Portal/BudgetTracker
- **Consumers**: ADG (parent?), HEYDAY F&C, HEYDAY Klantteams (Fin, OPS, HEYQ), Opdrachtgevers (clients)

The BI landscape diagram shows "isolated collection" as a separate red element — worth asking what this is.

### Infrastructure & IT management

- **Microsoft 365** (E5 security) — central KA with Azure AD/Entra ID, SSO, 2FA
- **WatchGuard** firewall with VLAN segmentation
- **Veeam** backup → HPE NAS → tape (offsite, ISO27001 certified storage)
- On-prem ESX servers + SAN + Azure cloud (hybrid)
- **Multi-party IT management**: Draaijer-Heyday (strategic/tactical), **COM4 Automatisering** (operational IT/managed workplace), **ML** (specific operational areas), **Interpulse** (small scope)

The demarcation matrix shows COM4 handles most operational IT (servicedesk, workplace, KA applications, server platform, infrastructure). Draaijer-Heyday retains strategic control (visie, innovatie, informatie management) and manages business applications themselves.

---

## 2. Key differences vs. Asito (inform your approach)

| Dimension | Asito | Draaijer-Heyday |
|-----------|-------|-----------------|
| Core ERP | AFAS (ERP + HR) | AFAS (ERP + HR + CRM + more) |
| Scheduling | ORTEC (one platform) | Planbition + ShiftBase + PURE (fragmented) |
| Field/facility ops | Appreo (workforce) | Facilitor (CAFM, 11 instances) |
| CRM/Marketing | Dynamics 365 + HubSpot | HubSpot (+ AFAS CRM module) |
| ATS/Recruitment | Ubeeo | Recruitee |
| BI platform | Power BI + Fabric (migrating from Qlik) | PowerBI + Tagetik + BudgetTracker on Azure DW |
| IT operations | InSpark (managed) | COM4 Automatisering (managed) |
| Custom tools | Minimal | Ontrafelaar (2x), CWS (3x) |
| Integration approach | Azure Integration Services | API/XML/CSV interfaces (ask about middleware) |
| Process model source | Jordi's bedrijfsprocesmodel | Unknown — **must discover in intake** |

---

## 3. Applying the Asito lessons

### Lesson 1: Start from THEIR world, not ours

We don't have a process model for Draaijer-Heyday yet. The PPTX shows a "Basis proces MS voor 20 administraties/klanten" but it's a system flow (Facilitor → AFAS → BudgetTracker), not a business process model.

**In the intake, ask:** "How do you describe your core processes? Do you work with something like order-to-service, hire-to-retire — or do you have your own terminology?" Also: "Can you share any process diagrams or operating model visuals you use internally?"

### Lesson 2: Don't present a framework — discover their language

Avoid "Connected Intelligence Blueprint" or domain frameworks. Instead, ask about their pain points per system and listen for the language they use. An IT director at a facility management company will think in terms of client onboarding, service delivery, employee scheduling, billing/invoicing, and operational reporting.

### Lesson 3: "Connected intelligence" = capabilities IN existing tools

Draaijer-Heyday already has their tools. The value is activating what's dormant (Jonas in AFAS, Copilot in M365) and addressing friction at integration points (AFAS ↔ Facilitor, scheduling tools ↔ AFAS, data warehouse feeding).

### Lesson 4: Quick wins must be explicit

For Asito, the quick wins were: (1) Activate Jonas in AFAS, (2) Inventory and guide Copilot usage, (3) Inventory ORTEC ML modules. For Draaijer-Heyday, the analogues would likely be:
1. Activate Jonas in AFAS (same play — it's included in the license)
2. Copilot inventory and adoption guidance (same play)
3. Assess Facilitor's AI/automation capabilities (new — this is their domain-specific system)

### Lesson 5: Multi-party IT = navigate carefully

COM4 manages their operational IT. The IT director sits above that, handling strategic direction. Understand who owns what decisions — especially around AFAS configuration, Facilitor customization, and data warehouse development. Changes may require coordination with COM4.

---

## 4. What to investigate during the intake call

### Must-know (without these, we can't scope the Tech Scan)

1. **Which applications are in scope?** The landscape is large. For Asito we did 9 apps. Here we need to agree on scope — likely AFAS, HubSpot, Facilitor, Planbition or ShiftBase, Recruitee, PowerBI/Tagetik, M365, and possibly Whitevision.

2. **What's the Ontrafelaar?** The name suggests "disentangler" — probably an hours/invoice reconciliation tool for Hospitality. If it's custom-built, it may be a prime candidate for AI augmentation (similar to Asito's uren-ontrafeling pain point).

3. **CWS — what is it?** Three custom instances for MultiLine. Need to understand function and whether AI is relevant here.

4. **What's the current AFAS Profit version and licensing?** Jonas availability depends on this. Are they on a fair-use model? Do they have InSite/OutSite active (the diagram suggests yes)?

5. **How do they use the BI/Data Warehouse?** The architecture looks mature (Azure DW, Tagetik for consolidation, PowerBI for operational). Who builds and maintains it? Is this internal or outsourced? This determines whether "Bouwen" level AI (custom models, Fabric, AI Foundry) is realistic.

6. **What is their integration middleware?** The diagram shows "Interfaces - API/XML/CSV" but no named middleware (Asito uses Azure Integration Services). Are these point-to-point connections? Who maintains them?

7. **Process model / operating model:** Do they have documented business processes? How do they think about their service delivery chain?

### Good to understand (shapes the report)

8. **Stabilization phase?** Asito's landscape was freshly migrated and stabilizing (post go-live issues, Application engineers at capacity). Is Draaijer-Heyday in a similar phase, or is the landscape stable?

9. **AI initiatives to date?** Has anyone experimented with Jonas, Copilot, or any other AI? What's the general sentiment — enthusiasm, skepticism, or "we haven't thought about it"?

10. **The Hospitality vs. MultiLine split:** Different scheduling tools, different custom tools. Are these operationally independent divisions, or is there pressure to converge? This affects whether we write per-division or cross-cutting recommendations.

11. **Facilitor roadmap:** Is Facilitor investing in AI? What version are they on? How central is it to client-facing operations?

12. **Data quality concerns?** At Asito, integration stability (AFAS-ORTEC) was a precondition. Here, the AFAS-Facilitor and AFAS-scheduling tool integrations are the equivalent — are they reliable?

---

## 5. Suggested intake call structure

Based on the Asito lesson ("start from their world"), here's a recommended flow:

**Opening (5 min):** Brief intro. We're here to understand your landscape so we can identify where AI can add value within your existing tools — no new platforms, no architecture overhaul.

**Their story (20 min):** "Walk us through how your operation works. A client signs a contract — what happens next? Which systems are involved, who touches what?" Let them draw the picture. Listen for pain language ("that's where it gets messy", "we lose time on", "it's manual").

**Application deep-dive (15 min):** Go through the key applications. For each: How do you use it? What works well? What frustrates you? Have you looked at any AI features? Use the application landscape diagram from their own document as reference — don't bring a foreign framework.

**Scoping (10 min):** Based on what we've heard, propose which applications to include in the Tech Scan. Aim for 8-10 max. Agree on who we might need to talk to for deeper dives (application owners, BI team, COM4 for infra questions).

**Close (5 min):** Next steps, timeline, what we'll deliver (reference the Asito-style report format without sharing that specific report).

---

## 6. Risk factors to watch for

- **IT vs. business tension:** At Asito, Innovation and IT were misaligned. At Draaijer-Heyday, ask early: who is sponsoring this Tech Scan? Is IT on board, or is this coming from management/innovation? If the IT director feels this is "happening to them," adjust tone accordingly.

- **COM4 as gatekeeper:** COM4 manages operational IT. If AI activation requires infra changes (Copilot licensing, Azure AI services), COM4 may need to be involved. Understand the relationship early.

- **Custom tool complexity:** Ontrafelaar and CWS are custom. These are harder to assess for AI readiness than commercial products with public roadmaps. We may need source-level understanding or developer interviews.

- **Multi-entity complexity:** 20 administrations means any AI rollout needs to work across entities. Configuration-per-client in AFAS/Facilitor may mean Jonas activation is not a one-time thing but a per-administration effort.

---

*Remember: lead with curiosity, not with frameworks. The goal of the intake is to listen, not to present.*
