# Draaijer-Heyday Group: Tech Scan Report Outline

*Based on Asito Feb 2026 template — adapted for DHG's situation*

---

## How this maps to Asito

| Asito section | DHG equivalent | Key difference |
|---|---|---|
| Samenvatting | Samenvatting | DHG already has active agents — story is about orchestrating, not just activating |
| Introductie | Introductie | Same framing |
| De context | De context | More complex: 6 BUs, private SaaS Facilitor, Flowmatic ecosystem, 250 Copilot licenses |
| Cross-system inzichten | Cross-system inzichten | New theme: agent platform governance. Activation gap is smaller but orchestration gap is larger |
| Wat zit er in de gereedschapskist? | Wat zit er in de gereedschapskist? | Different tools. Facilitor replaces ORTEC/Appreo. Add Flowmatic/agent layer |
| Vervolgstappen | Vervolgstappen | Steps are different: formalize agent governance, expand proven agents, wait on AFAS |
| Appendix A: Scoring | Appendix A: Scoring | Same methodology |
| Appendix B: Per-applicatie | Appendix B: Per-applicatie | Different apps — from AI readiness research |
| Appendix C: Voorbeelden | Appendix C: Voorbeelden | DHG-specific use cases drawn from their existing agents |

---

## Report outline

### Samenvatting

- DHG has N applications in scope, evaluated on AI maturity, vendor roadmap, and relevance to daily operations.
- Key finding: unlike many organizations, DHG already has an active agent ecosystem (Billy, Bonnie, mail analysis, OpenClove PoC). The challenge is not "where to start" but "how to scale and govern."
- The three-level framework: ACTIVEREN, INRICHTEN, BOUWEN — but DHG is already operating at level 3 (Bouwen) in some areas while level 1 (Activeren) is untouched in others (Jonas not activated, Facilitor's native AI features only partially adopted).
- Three concrete next steps that require no new systems or architecture changes.
- Appendix contains detailed per-application analysis with features, limitations, and deepening questions.

### 1. Introductie

- What this tech scan evaluates: current application landscape for safe, practical AI implementation opportunities.
- Tool-level analysis, not strategy-level (that's the playbook).
- Goal: discover where AI can have impact today without major structural changes.
- Scope: [final list from intake — Deep: AFAS/Jonas, M365/Copilot, Facilitor. Medium: Planbition(?)/ShiftBase, PowerBI/Tagetik/DW, Whitevision. Lighter: Recruitee, StudyTube, InSocial/PURE. Plus: Flowmatic agent platform assessment]

### 2. De context

**The landscape post-migration**
- Per 1/1/2026 live with AFAS as central ERP/HR/Finance hub.
- Still in stabilization: payroll, invoicing, standard HRM live. Contract management, wagenparkbeheer, CRM optimization still in progress.
- Stefan's 18-month roadmap philosophy: foundation first, then expand.
- New HR director (started March 2026) — HR tool vision still forming.

**The application architecture**
- AFAS core with InSite portals (Mijn HEYDAY pages), OutSite, PocketApp, Profit modules (CRM, Financial, HR, Payroll, Projects, Order Management, Abonnementen).
- Facilitor as private SaaS: dedicated front-end servers + DB at Facilitor side. Larger clients get own instance, smaller clients share multi-client instance.
- Data layer: PowerBI + Tagetik + Value Portal/BudgetTracker on Azure Data Warehouse. Tagetik splitting: reporting stays (ADG requires it), financial planning moving to AFAS-aligned tool.
- Adjacent apps: ShiftBase (Multiline scheduling), Recruitee (ATS — role vs AFAS being clarified), StudyTube, InSocial, Whitevision.
- Phased out: HubSpot (Jan 2026), Planbition (end March 2026), Dynamics Sales (migrated to AFAS CRM).
- Hospitality planning outsourced to external party.

**AI adoption: already in motion**
- Unlike Asito where AI was available but not activated, DHG has an active agent ecosystem:
  - Billy (invoice processing) — fully rolled out, not a pilot
  - Bonnie (voice agent) — Multiline, now PoC for Integrated Business
  - Mail analysis agent (Flowmatic) — reads mailbox + FAQ, advises service desk agents
  - OpenClove PoC — mailbox access + Facilitor FAQ, hosted externally using Azure LLMs
  - Facilitor native AI — text cleanup (monteur → customer-friendly text) in latest versions
  - Brainial — tender process, being brought into internal IT landscape
- Copilot: ~250 paid licenses (>25% of employees). Chat available to everyone in tenant. Quarterly usage review with license reclamation.
- Training: ~90 via legacy Draaijer platform, 50-60 via external party (Heyday side), ongoing Let's Copilot initiative.
- Non-Microsoft AI: not blocked by policy. Guidelines in place (no PII, no company-sensitive data). Pragmatic stance ("wapenwedloop die je niet wint").

**The three-level framework**
- (1) Activeren: turn on built-in AI assistants for end users
- (2) Inrichten: Application engineers configure workflows and templates behind the scenes
- (3) Bouwen: custom development where standard functionality doesn't suffice
- For DHG: levels 1 and 2 are underleveraged (Jonas inactive, Facilitor AI features only partially adopted, Copilot used personally not process-driven). Level 3 is already active via Flowmatic agents but without formal governance.
- Recommendation: fill the gaps at levels 1-2 before expanding level 3.

### 3. Cross-system inzichten

**3.1. De activatiekloof — omgekeerd**
- At Asito, the finding was "tools are ready, nobody turned them on." At DHG, the picture is inverted: custom agents are running (level 3) while native AI features sit dormant (level 1).
- Jonas: not activated. Explicit decision — wait until AFAS foundation is stable. But Jonas is included in the license (fair-use model). When the time comes, it's a configuration exercise, not an implementation project.
- Facilitor native AI: text cleanup features available in latest versions, only now being evaluated for broader deployment. Meanwhile, external agents (Flowmatic) are doing the heavy lifting on Facilitor data.
- The gap: DHG is building custom agents faster than they're activating the tools they already pay for.

**3.2. Agent platform governance: de ontbrekende laag**
- NEW SECTION (not in Asito report — DHG-specific)
- Three agent platforms in play: Flowmatic (primary for cross-system agents), Copilot Studio (mentioned but less active), native app AI (Facilitor, future AFAS Jonas).
- De facto decision framework exists but is unwritten:
  - Within a single app, close to core process → use native AI (e.g., Facilitor text cleanup)
  - Cross-system, multi-step → external agent (Flowmatic/OpenClove) (e.g., Billy, Bonnie)
- Service accounts: Flowmatic agents run under Entra ID service accounts with defined roles. App-level permissions govern in-app actions.
- Missing: formal policy document, selection criteria matrix, security review checklist for new agents.
- Recommendation: formalize the existing implicit framework into a one-page governance doc.

**3.3. Het Microsoft-ecosysteem als versneller**
- Similar to Asito but further along: 250 Copilot licenses vs 50-100.
- Copilot is broadly deployed but usage is personal productivity, not process-driven.
- The step toward process-oriented Copilot use (Copilot Studio agents, Teams integrations) is the biggest near-term opportunity.
- Azure as the compliance-friendly AI runtime: Flowmatic agents already use Azure LLMs. Future agents should follow this pattern for data residency and ISO 27001 compliance (currently in audit).

**3.4. De AFAS-stabilisatiezone**
- Everything touching AFAS/HR/Finance/CRM is in flux.
- Subscription-based invoicing just introduced — new work processes, people still adjusting.
- HR leadership vacancy filled only last week — no tool vision yet.
- Sales/marketing: high ambitions, less foundation-minded ("die willen eerst leuke dingen").
- Clear implication: no AI recommendations that require AFAS reconfiguration, depend on Jonas, or add complexity to HR/finance teams during stabilization. Revisit in 2-3 months.
- BUT: customer-facing BU processes (Integrated Business, Multiline) are mature and well-understood — ideal for continued AI work.

**3.5. Open keuzes in het applicatielandschap**
- HubSpot replacement: unknown. Marketing/content automation stack TBD. No AI investment here until decision is made.
- Tagetik: reporting stays (ADG requirement), financial planning moving off. Short-term AI wins possible but not strategic.
- ATS (Recruitee) vs AFAS HR: role split being clarified. AI opportunities exist (job description generation, CV screening) but may shift with new HR director's vision.
- Hospitality planning: outsourced. Minimal AI surface area.

### 4. Wat zit er in de gereedschapskist?

**4.1. Overzichtstabel**

| Applicatie | AI Maturity | AI-assistent | Kernverhaal | Status bij DHG |
|---|---|---|---|---|
| AFAS ERP | High | Jonas | OCR, speech-to-text, workflow reactions, document analysis. Inbegrepen in licentie. | Beschikbaar, niet geactiveerd. Wacht op stabilisatie. |
| AFAS HR | High | Jonas | CV-screening, CAO-analyse, medewerkersvragen, dossiersamenvatting. | Beschikbaar, niet geactiveerd. Nieuwe HR directeur moet visie bepalen. |
| Facilitor | [Research needed] | Eigen AI + Flowmatic agents | Contract/financieel management, operatie, ticketing. Native text cleanup + externe agents. | Private SaaS. Native AI deels geadopteerd, Flowmatic agents actief. |
| M365 / Copilot | High | Copilot | Breed ecosysteem: Teams, Outlook, Excel, Word, PowerPoint. Copilot Studio voor custom agents. | ~250 licenties, persoonlijk gebruik. Geen procesmatige inzet. |
| Power BI / DW | High | Copilot | Natuurlijke-taalvragen op dashboards. Fabric als strategisch dataplatform. | In gebruik. Tagetik splitst: reporting blijft, planning vertrekt. |
| Whitevision | [Research needed] | [Research needed] | Scan & herken tool. | In gebruik. AI-mogelijkheden onbekend. |
| ShiftBase | [Research needed] | [Research needed] | Rooster tool Multiline. | In gebruik. Planbition (Hospitality) stopt eind maart. |
| Recruitee | [Research needed] | [Research needed] | ATS. Rol vs AFAS HR wordt bepaald. | In gebruik. Toekomst afhankelijk van HR-visie. |
| StudyTube | [Research needed] | [Research needed] | LMS / training platform. | In gebruik. |
| InSocial | [Research needed] | [Research needed] | Klanttevredenheid / feedback. | In gebruik. |
| Brainial | [Research needed] | Eigen AI | Tender/offerte proces AI. | Wordt nu in intern IT-landschap gebracht. |
| Flowmatic | N/A (platform) | N/A | Agent development platform. Billy, Bonnie, mail analysis gebouwd hiermee. | Primair agent platform. Cross-system workflows. |

**4.2. Wat valt op?**
- Vendors are investing heavily: AFAS Profit 8 (June 2026) brings Jonas everywhere, Microsoft expands Copilot into agents, Facilitor adding native AI features.
- DHG is ahead of Asito in agent adoption but behind in native AI activation.
- The activation gap is specifically in AFAS (Jonas) and Copilot (process-oriented use).
- Flowmatic agents prove the concept works — the question is standardization and governance, not feasibility.

**4.3. Waar gaan de leveranciers naartoe?**
- AFAS Profit 8 (June 2026): Jonas in all workflows, CV-parsing, AI talent matching, Insights Dashboard.
- Microsoft: Copilot → agents. Copilot Studio for custom agents. Azure AI Foundry for advanced scenarios.
- Facilitor: expanding native AI features. Text cleanup is first, more expected.
- [Other vendors: from AI readiness research per tool]

### 5. Vervolgstappen en randvoorwaarden

**5.1. Drie stappen**

*Stap 1: Agent governance formaliseren (niveau: Organiseren)*
- Document the existing implicit agent platform selection criteria.
- One-page decision framework: when native, when Flowmatic, when Copilot Studio.
- Define security baseline for new agents (Entra ID service accounts, data residency in Azure, ISO 27001 alignment).
- No new technology needed — just writing down what Stefan and Brendan already practice.

*Stap 2: Facilitor native AI breed uitrollen (niveau 1: Activeren + niveau 2: Inrichten)*
- The text cleanup feature is proven in latest versions. Roll out across all client instances where monteur-to-customer communication exists.
- Inventory other native AI features in current Facilitor version.
- Low risk: operates within existing private SaaS, no new integrations needed.

*Stap 3: Copilot van persoonlijk naar procesmatig (niveau 1: Activeren + niveau 2: Inrichten)*
- With 250 licenses already deployed, the infrastructure is there.
- Identify 3-5 process-specific Copilot use cases per BU (beyond personal productivity).
- Consultancy (data retrieval, proposal support), Multiline (service desk summaries), Integrated (contract analysis).
- Requires: targeted training (not generic "what is AI" but "open this document, do this prompt").

*[Parking lot: Jonas activation — ready when AFAS foundation stabilizes, estimated Q3 2026]*

**5.2. Randvoorwaarden**

- **AFAS-stabilisatie als harde grens.** No AI recommendations that touch AFAS configuration until Stefan confirms the foundation is stable. This includes Jonas activation.
- **Agent security baseline.** Every new agent must: run under Entra ID service account, use Azure-hosted LLMs, have defined data access scope. Formalize what's already practiced.
- **Capaciteit IT-team.** Stefan's team is in ISO 27001 audit, managing AFAS stabilization, and absorbing new HR director's requirements. Recommendations must be zero-overhead for IT or explicitly budgeted.
- **Proceseigenaar betrokkenheid.** HR topics through HR, finance through finance. No political minefields identified, but stakeholder routing matters.
- **Adoptie passend bij de doelgroep.** Consultants adopt fast. Service desk medewerkers need "als je dit intypt, krijg je dit" demonstrations. Hospitality receptie-medewerkers: minimal AI surface.

### Appendix A: AI Maturity Scoring

*[Same methodology as Asito report]*
- Three criteria: branded AI assistant presence, generative AI depth, visible AI roadmap.
- High / Medium / Low scoring.
- Combined with three-level framework (Activeren, Inrichten, Bouwen) to determine prioritization.

### Appendix B: Per-applicatie analyse

*[From AI readiness research — one section per app]*

Each section follows the same structure:
- **AI Maturity:** High / Medium / Low
- **Mogelijkheden:** What the tool's AI can do
- **Roadmap:** Where the vendor is heading
- **Beperkingen:** What doesn't work or requires conditions
- **Status bij DHG:** Current usage and activation level
- **Verdiepingsvragen:** Questions for follow-up with Stefan / app owners

Sections needed:
- B.1 AFAS ERP, Jonas
- B.2 AFAS HR, Jonas
- B.3 Facilitor (+ native AI features)
- B.4 Microsoft 365 / Copilot (focus on process-oriented use)
- B.5 Power BI / Data Warehouse
- B.6 Whitevision (Scan & Herken)
- B.7 ShiftBase
- B.8 Recruitee
- B.9 StudyTube
- B.10 InSocial
- B.11 Brainial (tender AI)
- [B.12 Tagetik — if still in scope given planned departure]

### Appendix C: Drie voorbeelden uit de praktijk ter inspiratie

*[DHG-specific, drawn from their existing operations]*

**C.1 De servicedesk-medewerker die niet meer zoekt**
- Nu: medewerker ontvangt mail, zoekt handmatig in FAQ, formuleert antwoord.
- Met de mail-analyse agent (Flowmatic): agent leest mailbox, raadpleegt FAQ, stelt antwoord en activiteit voor. Medewerker controleert en verzendt.
- Volgende stap: agent verzendt zelfstandig bij voldoende confidence score. Medewerker escaleert alleen uitzonderingen.
- Niveau: al op Bouwen (niveau 3). Optimalisatie = confidence thresholds en monitoring.

**C.2 De monteur wiens notities leesbaar worden**
- Nu: monteur schrijft werkverslag in eigen woorden. Klant ontvangt ruwe tekst.
- Met Facilitor native AI: tekst wordt automatisch opgeschoond naar klantwaardige taal.
- Vereist: Facilitor versie met text cleanup feature (beschikbaar in laatste versies). Configuratie door Facilitor beheerder.
- Niveau: Activeren (niveau 1) + Inrichten (niveau 2). Geen extern platform nodig.

**C.3 De consultant die met data in gesprek gaat**
- Nu: consultant bereidt advies voor op basis van handmatig verzamelde data uit meerdere bronnen.
- Met Copilot (process-gericht): consultant vraagt Copilot om samenvatting van projectdossier, vergelijking met benchmarks, conceptadvies op basis van templates.
- Vereist: Copilot-licentie (beschikbaar), documenten op OneDrive/SharePoint, domeinspecifieke prompt templates.
- Niveau: Activeren (niveau 1) — de licentie is er al. Inrichten (niveau 2) — templates en begeleiding door power users.

---

## Production notes

### What I still need to write this report:
1. **AI readiness research** per tool (the deep dives) — especially Facilitor, Whitevision, ShiftBase, Recruitee, StudyTube, InSocial, Brainial
2. **Staff interview insights** — from the broader employee survey/interviews (what Maarten mentioned)
3. **Stefan's questionnaire responses** — marketing stack, Hospitality details, ATS specifics, Tagetik direction
4. **Final scope confirmation** — from Friday's session

### Differences from Asito report:
- Section 3.2 is new (Agent platform governance) — Asito had no agents
- Section 3.4 is reframed (AFAS stabilization zone vs generic "open choices")
- Appendix B has different tools (no ORTEC, Dynamics 365, Appreo; add Facilitor, Flowmatic, Brainial)
- Appendix C uses DHG's own agent stories instead of hypothetical scenarios
- The narrative arc is inverted: Asito = "you have tools, turn them on." DHG = "you're already building, now govern and fill the gaps."
