# Spring CC — Master Context Document

**Client:** Spring Family (Spring Creative Collective)
**Engagement:** Connected Intelligence Blueprint — Foundation Sprint
**Last Updated:** February 3, 2026

---

## Executive Summary

Spring Family is a creative agency group with operations in Denmark and Vietnam. We conducted a 2-hour process discovery session with Simon (Group CIO) and Leo (Director 3D Motion) on January 27, 2026.

**Three priority themes emerged for the Foundation Sprint:**
1. **Intake Intelligence** — Brief parsing and completeness checking
2. **Predictive Project Health** — Proactive budget/resource alerts
3. **Historical Memory** — Estimation lookup and knowledge capture

**Budget:** 575,000 DKK approved for Microsoft Agent projects

**Key Constraint:** All AI solutions must use Azure OpenAI path (Low risk, SCIM integrated) to stay compliant with their EU AI Act-aligned policies.

---

## Key Contacts

| Name | Role | Notes |
|------|------|-------|
| **Simon** | Group CIO | Primary IT contact, owns tool landscape |
| **Leo** | Director 3D Motion | Production perspective, AI adoption champion |
| **Nicholas** | Head of AI (new) | Starts Feb 2, strategy meeting Feb 20 |
| **Cecile** | Tatoma contact | Requested session recordings for context |
| **Hendrik** | Tatoma contact | Share notes with him |

---

## Tool Landscape (by CIB Domain)

### Workforce & Skills
*People, roles, and capabilities*

- **Float** — Resource allocation
- **Zoios** — Pulse surveys, 1:1 journals, EDP tracking
- **Entra ID** — Source of truth for org structure
- **No HR system** — Under investigation

### Projects & Innovation
*Execution, delivery, and technical work*

- **Encodify** — Primary PM tool (replaced Monday.com). Modules for QC, project mgmt, client portal
- **Asana** — Client-side only (task sharing with clients)
- **Monday.com** — Downgraded to archive only
- **Adobe Suite** (Firefly, Photoshop, Illustrator)
- **Maya + Vray** — 3D rendering
- **Frame.io** — Video review
- **Weave AI** — AI tool container (Runway, Cling, Flux)
- **ComfyUI** — Local AI workflows (testing)
- **LucidLink** — File access layer
- **Backblaze** — Cloud storage (3 buckets, hot storage)

### Customers & Contracts
*Commercial and client-led information*

- **HubSpot** — CRM
- **Penneo** — Signatures
- **dotlegal** — Compliance/GDPR
- **Sproom** — Invoice sending
- **FTP (internal)** — Replacing WeTransfer
- **Encodify / OneDrive** — Client delivery (varies by client)

### Communications & Collaboration
*Conversations and shared work*

- **Email** — Primary client communication
- **Teams** — Internal + some client collaboration (50/50 split)
- **Microsoft Loop** — Internal workflow docs, client process guidelines

### Meetings & Engagements
*Decisions, alignment, and planning*

- **Teams** — Meetings
- **Encodify** — Client portal for reviews/approvals

### Insights & Analytics
*Performance and financial data*

- **Deltek Maconomy Cloud** — Time registration, budgets, invoicing
- **Power BI / Fabric** — Reporting, forecasting (owned by Finance)

---

### AI Tools (Compliant)
- **Azure OpenAI** — Low risk, all employees (SCIM)
- **MS Bing Chat Enterprise** — Low risk, all employees (SAML)
- **Adobe Suite AI features** — Limited risk, assigned designers
- **ChatGPT** — High risk, assigned persons only, private accounts

### Non-Compliant
- Discord/Midjourney — One client exception only (ZUPA)
- Quillbot — No SAML/SCIM

---

## Pain Points (From Session)

### 1. Briefing Fragmentation
No standard intake process. Briefs arrive via email/Teams with varying completeness. Production briefs need technical specs (resolution, frame rate); creative briefs need different info. PMs manually chase missing details.

> "The briefing, how they come in, it's still very fragmented... there was some time attempts to make briefing templates, but they are not flexible enough."
> — Leo

### 2. Manual Estimation Effort
No lookup of similar past projects. Producers manually search through historical data.

> "We've done something like this already so many times. Why are we even bother to estimate? Why don't we have an AI agent to do that?"
> — Leo

### 3. Project Health is Reactive
Discover budget overruns after the fact. No proactive alerts during production.

> "Instead of them coming to us and say, hey, why is profit so bad... you could just ask the agent, hey, have a look at the project. Anything weird?"
> — Leo

### 4. Cross-Department Holiday Blindness
Resource conflicts when people book holidays. Other departments don't see it. Cited in recent retrospective.

### 5. Knowledge Lives in Heads
No retros except major issues. Guidelines exist in Loop but not connected. Knowledge leaves when people leave.

### 6. Tool Request Friction
Requesters fill compliance forms with info they don't know. Leo already using AI to fill some fields.

### 7. Archive/Storage Pressure
Hot storage filling up. Need cold migration process. 2-5 year retention by contract.

---

## Three Priority Themes

### 1. Intake Intelligence

**Problem:** Brief type detection and completeness checking

**Systems Involved:** Email, Teams, Encodify

**Opportunity:** AI agent that:
- Detects brief type (production vs creative)
- Flags missing information before work starts
- Reduces PM chase time

**Policy Alignment:** Azure OpenAI for brief parsing — Low risk if no client data in prompts

---

### 2. Predictive Project Health

**Problem:** Budget alerts, resource conflicts, absence overlaps

**Systems Involved:** Float, Deltek Maconomy Cloud, Power BI, Zoios (absence)

**Opportunity:** Proactive alerts connecting:
- Time/budget actuals from Maconomy
- Resource allocation from Float
- Absence data

Alert triggers: unusual time patterns, senior-heavy allocation, holiday conflicts, budget trajectory

**Policy Alignment:** MS AI Builder pathway — already being tested for QC automation

---

### 3. Historical Memory

**Problem:** Similar project lookup, estimation assist, knowledge capture

**Systems Involved:** Deltek Maconomy Cloud, Microsoft Loop, Encodify

**Opportunity:**
- Estimation assistant querying Maconomy for similar projects
- Knowledge capture prompts after project delivery
- Searchable project history

**Policy Alignment:** Azure OpenAI + internal data — needs careful scoping around what data is processed

---

## Quick Win Candidates

| Opportunity | Effort | Impact | Owner |
|-------------|--------|--------|-------|
| Brief completeness checker | Low | High | PM team |
| Tool compliance auto-fill | Low | Medium | IT |
| Estimation assistant | Medium | High | Production |
| Project health alerts | Medium | High | Finance + Production |

---

## AI Policy Constraints

Spring has comprehensive AI governance aligned with EU AI Act. Key points:

### Risk Tiers
| Level | Who Can Use | Requirements |
|-------|-------------|--------------|
| Low/minimal | All employees | Follow company rules |
| Limited | All employees | Follow Code of Conduct |
| High | Pre-approved only | Specific ruleset required |
| Unacceptable | Nobody | Prohibited |

### Safe Path for Our Proposals
- **Azure OpenAI** = Low risk, SCIM integrated — best bet
- **MS AI Builder** = Already being tested
- **MS Copilot** = Low risk, SAML integrated

### Constraints
- **DALL-E 3 output prohibited** — LEGO IP concerns
- **No client data** to external AI without 6-step approval process
- **Midjourney** = High risk, ZUPA only

### Code of Conduct Requirements
Any AI solution must:
- Fact-check outputs
- Not process meeting notes/transcriptions without approval
- Not store client data in external systems
- Have human oversight built in
- Inform client first time AI is used on their project

---

## Shadow IT Categories (Monitored)

1. Micro-SaaS file conversion tools
2. Web-based generative AI without company license
3. Unapproved browser extensions/plugins
4. WeTransfer-like file sharing services
5. Unapproved collaboration platforms (Miro, Pinterest)
6. Personal cloud storage for company data
7. Personal AI licenses for work tasks
8. Switching to personal iCloud
9. Mobile apps where company data could leak

**Note:** Personal exploration allowed with private accounts, no production data.

---

## Budget & Resources

- **575,000 DKK** approved for Microsoft Agent projects
- **Nicholas** (new Head of AI) starts Feb 2
- Strategy meeting scheduled for Feb 20
- **Resource constraint:** Limited internal capacity (Leo + 1 for AI workflows)
- **Adobe Firefly collaboration** ongoing (Simon facilitating)

---

## Open Loop Status

| Item | Status | Waiting On |
|------|--------|------------|
| Simon next steps | Active | Draft follow-up email |
| Sync with Cecile | In progress | Share notes |
| Follow-up with Hendrik | In progress | Share notes |

---

## Next Steps

1. **Share this context** with colleague taking over
2. **Draft follow-up email to Simon** with:
   - Updated process mapping
   - Three themes summary
   - Proposed sprint focus
3. **Coordinate with Nicholas** once he starts (Feb 2)
4. **Pick Foundation Sprint focus** from the three themes
5. **Identify pilot users** for first AI capability
6. **Schedule technical discovery** for chosen theme

---

## Local File References

| File | Description |
|------|-------------|
| `spring-cc-session-findings.md` | Detailed findings from transcript with quotes |
| `spring-cc-process-mapping.csv` | Tool → process → domain mapping (39 rows) |
| `spring-cc-session-summary.md` | Shareable 1-pager for Simon |
| `spring-cc-ai-policies-summary.md` | AI policy details |
| `spring-cc-shadow-it-list.md` | Shadow IT categories |
| `spring-cc-session-playbook.md` | Original facilitation guide |
| `spring-cc-session-agenda-shared.md` | What Simon saw before session |

---

## Source Documents (Google Drive)

Located in: `Tatoma/Clients/01. Agency Circle/02. Denmark/Spring Family/Client resources/`

- `AI-tools.xlsx` — Tool compliance spreadsheet
- `Appendix II - Assessment overview AI solutions.pdf`
- `External AI Policy_SPRING Family_v1_0923.pdf`
- `Internal AI Usage Policy_SPRING Family_v1.pdf`
- `Purpose of the AI Policy.pdf`

---

*Document prepared: February 3, 2026*
*For handover to: [Colleague Name]*
