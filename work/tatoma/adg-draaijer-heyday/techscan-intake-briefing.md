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

- **HubSpot** — marketing/CRM (being phased out → WordPress + new marketing automation)
- **Recruitee** — ATS/recruitment (vs. Ubeeo at Asito)
- **StudyTube** — LMS/learning
- **InSocial** — client/employee feedback
- **Whitevision** — Scan & Herken (OCR tool, document scanning)
- **Ontrafelaar** — custom tool, 2x for Hospitality (likely hours/invoice reconciliation — worth asking about)
- **3x CWS** — custom tool for MultiLine

### BI & data layer

Mature data architecture with an **Azure Data Warehouse** at the center:
- **Data collection layer** feeding from: AFAS (replacing YouForce/Raet, Dynamics, Exact, E-Synergy), Facilitor, Planbition, Tagetik, and external sources. Data warehouse needs adaptation as source systems change.
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

## 1b. The AFAS migration — what Node1 tells us

Node1 ("Reimagine Work") built the target IT architecture and process implementation blueprint for DHG. Their Phase 2 report (v1.2, July 2025) maps the complete "As Is → To Be" transformation across CRM, Operations, HRM, and Finance. **Most of this migration is now done** (March 2026). Key remaining items: BIS phaseout at Consultancy and Dynamics Sales phaseout at HEYDAY — both happening in the coming weeks.

### The scale of what changed

The old landscape was deeply fragmented. Per-BU tooling included Dynamics Sales (CRM for HEYDAY), BIS custom tool (CRM/Operations for Draaijer Group), Salesforce (CRM for Multiline), Exact Globe+ (Finance across HEYDAY), Exact Online (Finance for Draaijer Group/Multiline), Exact Synergy (Operations for HEYDAY non-Integrated), Visma|Raet (HRM across HEYDAY), and Blue10 (Finance for Multiline). **All of this is being consolidated into one AFAS environment.**

### AFAS structure — the complexity beneath the surface

The new AFAS setup is more complex than "one ERP":

- **1 AFAS environment** (single tenant)
- **9 werkgevers** (legal employers) across 6 BV entities
- **7 arbeidsvoorwaarden** (employment conditions)
- **3 CAO's** (collective labor agreements): C1 (Reliante Care), C2 (Infinea), C3 (Antwoord Services)
- **23 financiële administraties** (up from the 20 we knew about)
- **2 entities outside the fiscal unit** (BTW): Reliante Care and Infinea

This matters for Jonas/AI: any AI feature in AFAS needs to work across this multi-employer, multi-CAO, multi-administration structure. It's not a simple single-tenant activation.

### What stays, what goes, what's still in flux

**Being replaced (mostly done):**

| Old system | Domain | Replaced by | Status |
|-----------|--------|------------|--------|
| Dynamics Sales | CRM (HEYDAY) | AFAS CRM | Phaseout in coming weeks |
| BIS (custom) | CRM/Ops/HRM (Draaijer Group) | AFAS | Phaseout at Consultancy in coming weeks |
| Exact Globe+ (14 instances) | Finance (HEYDAY) | AFAS Financieel | Migrated |
| Exact Online | Finance (Draaijer/Multiline) | AFAS Financieel | Migrated |
| Exact Synergy | Operations (HEYDAY) | AFAS Operations | Migrated |
| Visma\|Raet | HRM/Payroll (HEYDAY) | AFAS HR/Payroll | Migrated (payroll likely outsourced) |
| Blue10 | Invoice processing (Multiline) | AFAS | Migrated |
| SharePoint "Mijn HEYDAY" | Employee portal | AFAS InSite | Migrated |

**Staying and connecting to AFAS:**

| System | Interface type | Notes |
|--------|---------------|-------|
| HubSpot | 3rd party connector | Staying for now, but being phased out (see §2b) — connector via AFAS impl. partner |
| PURE | Direct integration | Selected over vPlan for AFAS integration depth |
| ShiftBase (Multiline) | Standard connector | Clean integration path |
| Planbition (Hospitality) | Custom | Needs development — currently via data warehouse export/import |
| Recruitee | Standard connector | Straightforward |
| StudyTube | Standard connector | Straightforward |
| InSocial | Standard connector | Straightforward |
| Whitevision | Standard connector | Selected partly based on Asito & Multiline experience with deep AFAS integration |
| Ontrafelaar (Hospitality) | Custom | Needs adaptation (ORT splitting to Planbition) |
| Facilitor | Custom 2x (sales + procurement interface) | Requires adaptation + 3rd party connector development for master data sync |
| CWS (Multiline) | Custom 2x (ASN + Infinea) | Requires adaptation |

**Still in flux:**

- **Salesforce at Multiline**: Decision not yet final whether to fully phase out. Master data management migrates to AFAS regardless. CRM use in Salesforce may continue alongside.
- **Multiline AFAS re-implementation**: Their current AFAS needs to be re-implemented in the new group environment.
- **Locatiebeheer AFAS**: Same — current implementation needs migration to new environment.

### 27 items of custom development (maatwerk)

The Node1 report identifies 27 required customizations — 20 process-level (dashboards, workflows, custom invoice layouts, ORT calculations, contract-roster mutations, intercompany reconciliation) and 7 infrastructure-level (custom connectors for Planbition/CWS/Facilitor, Ontrafelaar adaptation, data warehouse integration, InSite intranet setup, OutSite per-label branding).

**This is the source of the IT capacity bottleneck.** With 27 custom items on top of the migration itself, it's no surprise Brandon and Stefan are flagging that IT can't keep up with innovation requests.

### FP&A moves to AFAS InSite + Tagetik

The financial planning layer is designed around AFAS InSite Projecten for operational steering, with Tagetik handling annual planning (demand, capacity, third-party costs) via export to AFAS. PowerBI dashboards stay but will be fed from AFAS data rather than the old Exact/BIS sources. The data warehouse continues as the consolidation layer.

### Implications for the Tech Scan

1. **AFAS is now genuinely central.** CRM, Operations, HRM, Finance — all in one. Jonas assessment becomes the single most important Tech Scan deliverable.
2. **The migration is fresh.** Even if "done," the organization is in stabilization mode. Process adoption, data quality, and user proficiency are likely still settling. Don't assume everything works smoothly.
3. **Custom interfaces are the fragile points.** Facilitor ↔ AFAS, CWS ↔ AFAS, Planbition ↔ AFAS — these are custom-built and maintained by third parties. Any AI that crosses these boundaries needs the integration to be reliable first.
4. **Scope adjustment needed.** Don't assess Exact Globe+, Dynamics Sales, Visma|Raet, BIS — they're gone or going. Focus on the new stack: AFAS (deep), Facilitor, scheduling tools, BI layer, M365, and the "staying" peripherals.
5. **Node1 is a stakeholder.** They built this architecture. They may still be involved in Phase 3 implementation. Understanding their ongoing role matters for who executes on our recommendations.
6. **Whitevision was selected partly based on Asito experience.** This is a direct connection point — we can reference what we know about Whitevision's AI capabilities from the Asito scan.

---

## 2. Their innovation agenda — they're not starting from zero

Draaijer-Heyday has a **formal innovation structure** that's directly relevant to how we position the Tech Scan.

### Organizational setup

Since April 2025, DHG operates as a Hoofddirectie (HD) facilitating 6 business units (Integrated, Consultancy, Interim, Hospitality, Vastgoedexploitatie, Multiline). Each BU has its own director and labels (e.g., Multiline includes ASN, Reliante, Infinea).

They have a **Multidisciplinair Innovatieboard** — 8 strategic ambassadors from across the BUs plus an Innovatiemanager as the central hub. The board feeds into and receives from the BUs via a "vraagstukken ↔ innovaties" loop. Experts from HR, Finance, and IT provide supplementary perspectives.

**Key people on the Innovatieboard:** Stefan Vermeulen (Manager BIS — also author of the IT Landschap doc), Sandro Mehic (Projectmanager Data & Applicaties), plus the Innovatiemanager at group level. These are likely our primary counterparts.

### Their self-assessment: honest about the gap

They openly acknowledge that innovation has been "reactief en gefragmenteerd" within HEYDAY Integrated, Consultancy & Hospitality, with a gap between ambition and reality. Integron research (2020-2024) showed low scores on innovatiekracht and proactiviteit. Interviews revealed a lack of ownership and structural support. This is the context in which our Tech Scan lands — they're trying to formalize what has been ad-hoc.

### Innovation process & evaluation

They use a 4-step innovation process: **Signaalfase → Selectiefase → Pilotfase → Businesscasefase**. Ideas come in via an innovation form from employees, directors, vendors, partners, and clients. The Innovatieboard evaluates using the **R-W-W method** (Real: feasible with available resources? Win: competitive advantage? Worth: contributes to strategic goals?).

Their innovation portfolio follows the **Innovation Ambition Matrix** (Nagji & Tuff): target is **70% Core + Adjacencies, 30% Transformational**.

### Concrete AI ideas for 2026 — the wish list

This is critical. They already have **named AI initiatives** on their 2026 innovation wheel:

| Initiative | BU / Scope | What it likely means |
|-----------|-----------|---------------------|
| AI offertetool | Multiple BUs (appears 3x) | AI-assisted proposal/quote generation — likely their #1 cross-BU priority |
| Staff HR-agent "Billy" | Group-level | AI HR assistant, probably leveraging AFAS HR data |
| BU Interim Matchmaker | BU Interim | AI matching of interim candidates to assignments |
| Consultancy AI personal agents | BU Consultancy | AI assistants for consultants |
| Multiline "Bonnie" MCP | BU Multiline | Named AI agent for Multiline operations |
| Digitale receptie | BU Hospitality | AI/digital reception for hospitality clients |
| MJOB/MJOP AI | BU Vastgoedbeheer | AI for maintenance planning (meerjarenonderhoudsplan) |
| HR-data-inzicht | Group-level | AI-driven HR analytics |
| AI leergang | Group-level | AI training/learning program for employees |
| PVE digital Dashboarding & IHP | Cross-BU | Digital program of requirements + dashboarding |
| Landschapskaart | Group-level | Mapping exercise (possibly what our Tech Scan feeds into) |
| AI & digitalisering | Group-level | Overarching digitalization initiative |

**Implication for the Tech Scan:** Our work directly feeds their Signaalfase and Selectiefase. The Tech Scan tells them which of these ideas can be supported by their existing tool capabilities (Core innovation) vs. which require new tooling or custom development (Adjacencies/Transformational). We should explicitly frame our output as input to their R-W-W evaluation.

### Open innovation & external partners

They explicitly position open innovation as strategic — collaboration with clients, vendors, startups, and knowledge institutions. Co-creation with partners is a named approach. **We are exactly the kind of external partner they want to involve.** This is a good sign for engagement.

### The declarability tension

Innovation time = less billable hours, which creates financial pressure on BUs. Their solution: a central innovation fund where innovation hours are booked centrally, compensating BUs. This means there's budget for innovation work, but it also means every initiative needs to justify the time investment. Our Tech Scan recommendations should be mindful of this — quick wins that save billable time are especially valuable.

---

## 2b. What the interviews and BU strategies tell us — ground truth

We have interview notes from 4 key stakeholders (Brandon Kwey - Innovatiemanager, Stefan Vermeulen - BIS Manager, Jinni Christiaanse - Marketing Manager, Henri Drenthen - Commercieel directeur) plus strategy summaries for 5 of 6 BUs (missing: Hospitality). This reveals several critical corrections to our earlier assumptions.

### Landscape corrections — what we got wrong

**HubSpot is being phased out.** Marketing is moving to WordPress + a new (unnamed) marketing automation tool. HubSpot was tied to old websites. This means HubSpot should either be removed from Tech Scan scope or reframed as "outgoing tool — what to look for in its replacement."

**They're already building AI agents.** Brandon (Innovatiemanager) is working with Flowmatic to build agents: a Service desk agent (MultiLine), "Billie" (facturatie agent), and an Intakes agent for Consultancy. They also use Copilot Studio internally. This is much further than "exploring."

**Jonas in AFAS was planned for February 2026 pilots.** Stefan confirmed this in his January interview. By the intake call (mid-March), pilots should be underway or recently started. Ask how it's going.

**Copilot is rolled out to ~80-90 people + full Consulting.** Training via Let's Copilot (&Samhoud). Usage is "heel wisselend" — some enthusiasts, many barely using it. Classic adoption gap.

**Brainial is used for tenders** and being rolled out ADG-wide. Not in the IT landscape document but actively in use commercially.

**CRM is a recognized problem.** Henri says teams work with the same clients in silos, separate CRM environments, missing cross-sell opportunities. AFAS CRM is "ontoereikend." Henri is developing his own AI CRM module with a VU Amsterdam professor (Brandon involved). This is a politically sensitive area — there's DIY innovation happening outside IT's purview.

**Multiline has its own tech stack.** Beyond the group landscape: Genesys Cloud CX (core platform), Salesforce (CRM), CWS (proprietary), Mendix (being phased out), Altura (lead tracking), Tunstall (Reliante Care). AFAS implementation planned for 2026. This BU operates semi-independently on IT.

**Monday.com and other tools** appear in BU Vastgoedexploitatie (project management), alongside O-prognose (MJOB), Proprli (compliance), and planned IRIXS (asset management). These aren't in the group IT landscape doc either.

### AI readiness spectrum across BUs

| BU | Readiness | Key signal | Primary AI play |
|-----|-----------|-----------|----------------|
| **Multiline** | Advanced — mid-race | Bonnie is live, AI as revenue stream (100-150% markup), €50-100K annual investment | Scale Bonnie, integrate data layer (AFAS + Power BI + Genesys) |
| **Consultancy** | Ambitious — actively building | AI offertetool in development, Copilot fully rolled out, BLC system in design | Validate and accelerate existing initiatives |
| **Interim** | Focused — one clear use case | Matchmaker in approved strategy, commercially motivated (declarability from 65% → 80%+) | Build the Matchmaker, reduce 50% admin time |
| **Vastgoedexploitatie** | Exploratory but concrete | Digital twins (TwinTopics), MJOB/MJOP AI, "mensloze exploitatie" vision | MJOB/MJOP AI + predictive maintenance |
| **Integrated** | Cautious — operational first | "Early majority" self-description, Facilitor dependency, eNPS of 2 | Fix backbone (Facilitor + AFAS), then AI |
| **Hospitality** | Unknown — no strategy doc | Digitale receptie on innovation wheel, Planbition for scheduling | Assess during intake |

### People dynamics to be aware of

**Brandon Kwey (Innovatiemanager)** is the engine. He's building agents, chairing the innovatieboard, working with multiple AI partners (Flowmatic, Bonnie, TwinTopics, Let's Copilot). He moves fast but flags that IT can't keep up.

**Stefan Vermeulen (BIS Manager)** is the gatekeeper. He controls the IT landscape, is pragmatic, and is focused on the AFAS implementation. His dream of "mensloze FM" is progressive but he acknowledges the org doesn't share it. IT capacity is his biggest constraint.

**Henri Drenthen (Commercieel directeur)** is the wildcard. Former owner of Draaijer, used to high-end IT support, frustrated by current constraints. Building his own AI CRM with a VU professor. Expects AI to eliminate junior consultant roles within years. Silo'd CRM environments are his #1 pain point.

**Jinni Christiaanse (Marketing)** is rebuilding from scratch. New in role (Jan 2026), previous marketing director left, rebranding strategy underway (May 2026 launch), team of 8, open to AI but low knowledge/tooling. HubSpot → WordPress migration is her project.

### The capacity tension — this is the elephant in the room

Brandon and Stefan both flag the same thing: **IT capacity is the bottleneck.** The AFAS implementation is consuming focus. Brandon has to submit tickets for everything. Development support is scarce. This means our Tech Scan recommendations need to be conscious of implementation capacity — don't recommend 15 things when they can execute 3. Prioritize ruthlessly, and consider which recommendations can be done WITHOUT IT involvement (e.g., activating existing vendor features, Copilot adoption, Flowmatic agent building).

### Additional tools not in the IT Landscape document

| Tool | Used by | Function |
|------|---------|----------|
| Flowmatic | Innovation / Brandon | AI agent builder (Service desk, Billie, Intakes agents) |
| Bonnie | Multiline | AI partner for human+AI call center operations |
| Brainial | Commercial / Inside Sales | Tender/bid automation — ADG-wide rollout |
| TwinTopics | Vastgoedexploitatie | Digital twins for real estate |
| Let's Copilot | Group-wide | Copilot training (&Samhoud) |
| Genesys Cloud CX | Multiline | Contact center platform (voicebots, sentiment, Agent Copilot) |
| Salesforce | Multiline | CRM and pipeline management |
| Monday.com | Vastgoedexploitatie | Project management |
| O-prognose | Vastgoedexploitatie | MJOB maintenance forecasting |
| Proprli | Vastgoedexploitatie | Compliance and maintenance planning |
| Copilot Studio | Innovation / Brandon | Agent building (Microsoft) |
| VU Amsterdam AI module | Henri / Brandon | Custom AI CRM in development |

---

## 4. Key differences vs. Asito

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

## 5. Applying the Asito lessons

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

## 6. What to investigate during the intake call

### Must-know (without these, we can't scope the Tech Scan)

1. **Which applications are in scope?** Post-migration, the core stack is clearer: AFAS (deep — CRM, Finance, HR, Payroll, Operations, Projects, InSite/OutSite), Facilitor, M365 (Copilot), PowerBI/Tagetik, and the scheduling tools (Planbition, ShiftBase, PURE). Secondary: Recruitee, StudyTube, InSocial, Whitevision. Exclude the retired systems (Exact, Dynamics, Visma|Raet, BIS). HubSpot is borderline — it's outgoing, but the replacement isn't named yet.

2. **What's the Ontrafelaar?** The name suggests "disentangler" — probably an hours/invoice reconciliation tool for Hospitality. If it's custom-built, it may be a prime candidate for AI augmentation (similar to Asito's uren-ontrafeling pain point).

3. **CWS — what is it?** Three custom instances for MultiLine. Need to understand function and whether AI is relevant here.

4. **What's the current AFAS Profit version and licensing?** Jonas availability depends on this. Are they on a fair-use model? Do they have InSite/OutSite active (the diagram suggests yes)?

5. **How do they use the BI/Data Warehouse?** The architecture looks mature (Azure DW, Tagetik for consolidation, PowerBI for operational). Who builds and maintains it? Is this internal or outsourced? This determines whether "Bouwen" level AI (custom models, Fabric, AI Foundry) is realistic.

6. **What is their integration middleware?** The diagram shows "Interfaces - API/XML/CSV" but no named middleware (Asito uses Azure Integration Services). Are these point-to-point connections? Who maintains them?

7. **Process model / operating model:** Do they have documented business processes? How do they think about their service delivery chain?

### Good to understand (shapes the report)

8. **Stabilization phase?** We now know the AFAS migration is mostly done but BIS and Dynamics phaseouts are happening in the coming weeks. They are very likely in stabilization mode — similar to Asito's post go-live state. Ask: "How is the AFAS migration landing? What's still settling? Where are the rough edges?"

9. **AI initiatives to date?** Has anyone experimented with Jonas, Copilot, or any other AI? What's the general sentiment — enthusiasm, skepticism, or "we haven't thought about it"?

10. **The Hospitality vs. MultiLine split:** Different scheduling tools, different custom tools. Are these operationally independent divisions, or is there pressure to converge? This affects whether we write per-division or cross-cutting recommendations.

11. **Facilitor roadmap:** Is Facilitor investing in AI? What version are they on? How central is it to client-facing operations?

12. **Data quality concerns?** At Asito, integration stability (AFAS-ORTEC) was a precondition. Here, the AFAS-Facilitor and AFAS-scheduling tool integrations are the equivalent — are they reliable?

---

## 7. Suggested intake call structure

Based on the Asito lesson ("start from their world"), here's a recommended flow:

**Opening (5 min):** Brief intro. We're here to understand your landscape so we can identify where AI can add value within your existing tools — no new platforms, no architecture overhaul.

**Their story (20 min):** "Walk us through how your operation works. A client signs a contract — what happens next? Which systems are involved, who touches what?" Let them draw the picture. Listen for pain language ("that's where it gets messy", "we lose time on", "it's manual").

**Application deep-dive (15 min):** Go through the key applications. For each: How do you use it? What works well? What frustrates you? Have you looked at any AI features? Use the application landscape diagram from their own document as reference — don't bring a foreign framework.

**Scoping (10 min):** Based on what we've heard, propose which applications to include in the Tech Scan. Aim for 8-10 max. Agree on who we might need to talk to for deeper dives (application owners, BI team, COM4 for infra questions).

**Close (5 min):** Next steps, timeline, what we'll deliver (reference the Asito-style report format without sharing that specific report).

---

## 8. Risk factors to watch for

- **IT vs. business tension:** At Asito, Innovation and IT were misaligned. At Draaijer-Heyday, ask early: who is sponsoring this Tech Scan? Is IT on board, or is this coming from management/innovation? If the IT director feels this is "happening to them," adjust tone accordingly.

- **COM4 as gatekeeper:** COM4 manages operational IT. If AI activation requires infra changes (Copilot licensing, Azure AI services), COM4 may need to be involved. Understand the relationship early.

- **Custom tool complexity:** Ontrafelaar and CWS are custom. These are harder to assess for AI readiness than commercial products with public roadmaps. We may need source-level understanding or developer interviews.

- **Multi-entity complexity:** 20 administrations means any AI rollout needs to work across entities. Configuration-per-client in AFAS/Facilitor may mean Jonas activation is not a one-time thing but a per-administration effort.

- **IT capacity is the real constraint.** Both Brandon and Stefan flag this. AFAS implementation is consuming all bandwidth. Recommendations that require IT development resources will compete with the AFAS rollout. Frame quick wins as things that DON'T need IT tickets.

- **Shadow innovation is happening.** Henri's VU Amsterdam AI CRM, Brandon's Flowmatic agents, Multiline's Bonnie — innovation is happening outside the formal IT governance. The Tech Scan should acknowledge and validate this rather than trying to centralize it.

- **HubSpot is outgoing.** Don't invest Tech Scan effort in HubSpot AI features (Breeze) if the tool is being replaced. Instead, frame marketing tool AI requirements as "what to look for in the replacement."

- **Rebranding in May 2026.** Marketing is mid-rebranding with multiple new brand names launching. Any marketing/communications AI recommendations should account for this transition.

---

*Remember: lead with curiosity, not with frameworks. The goal of the intake is to listen, not to present.*
