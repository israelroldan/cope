# Spring CC — Session Findings

**Date:** January 27, 2026
**Duration:** ~2 hours
**Attendees:** Simon (Group CIO), Leo (Director 3D Motion), Israel (Tatoma)

---

## Tool Landscape Corrections

### Tools Added (Not in Original Mapping)
| Tool | Purpose | Notes |
|------|---------|-------|
| **Encodify** | Primary PM tool | Replaced Monday.com (now archive only). Modules: QC, project mgmt, client portal |
| **Weave AI** | AI tool container | Subscription for Runway, Cling, Flux, video models |
| **ComfyUI** | Local AI workflows | Testing phase, Leo + 1 person |
| **Microsoft Loop** | Workflow docs | Client process guidelines, internal documentation |
| **Zoios** | HR/engagement | Pulse surveys (monthly), 1:1 journals, EDP tracking |
| **Deltek Maconomy Cloud** | Finance | Time registration, budgets, invoicing |
| **Issue** | Task management | CGI-specific, internal only |
| **LucidLink** | File access layer | Entry point to Backblaze storage (3 buckets, hot storage) |
| **Kudos system** | Recognition | Coming in ~1 month |

### Tools Corrected
| Original Understanding | Correction |
|------------------------|------------|
| Monday.com = PM tool | Downgraded to archive only |
| Asana = internal | Client-side only (task sharing with clients) |
| Discord/Midjourney = in use | **Non-compliant**, one client exception (ZUPA) |
| WeTransfer = active | Being phased out → internal FTP replacement |
| HR system exists | **No HR system** - under investigation |

---

## Key Pain Points (7 Identified)

### 1. Briefing Fragmentation
> "The briefing, how they come in, it's still very fragmented... there was some time attempts to make briefing templates, but they are not flexible enough."
— Leo

- No standard intake process
- Email/Teams chaos
- Brief type (production vs creative) determines info needed but no system helps identify which
- PMs manually chase missing details (resolution, frame rate, etc.)

### 2. Manual Estimation Effort
> "We've done something like this already so many times. Why are we even bother to estimate? Why don't we have an AI agent to do that?"
— Leo

- No lookup of similar past projects
- Producers manually search through historical data
- Time wasted on repetitive estimation work

### 3. Project Health is Reactive
> "Instead of them coming to us and say, hey, why is profit so bad... you could just ask the agent, hey, have a look at the project. Anything weird? Any unusual pattern?"
— Leo

- Discover budget overruns after the fact
- Finance asks "why is profit bad?" then teams scramble
- No proactive alerts during production

### 4. Cross-Department Holiday Blindness
> "People apply for holiday, but because it was a cross department project, they didn't know that the people were on holiday, and then they had to do quick handover."
— Leo (citing recent retro)

- Resource conflicts when people book holidays
- Other department's producers don't see it
- Causes handover chaos

### 5. Knowledge Lives in Heads
> "If we don't know, the producer wouldn't know, then they would ask the team lead."
— Leo

- No retros except for major issues
- Guidelines in Loop but not connected to anything
- Knowledge leaves when people leave
- No searchable project history

### 6. Tool Request Friction
> "My issue is... a lot of the information, I have no idea. Does the software follow compliance? GDPR? I don't know."
— Leo

- Requesters fill forms with info they don't know
- IT needs use case, requester needs vendor compliance info
- Leo already using AI to fill some fields

### 7. Archive/Storage Pressure
> "Our constraint is the server space. We deal with heavy files... rendering, a lot of video."
— Leo

- Hot storage filling up
- Manual cold migration process needed
- 2-5 year retention depending on client contract
- Leo built a "last touched" script to identify candidates

---

## Three Themes Confirmed

### 1. Intake Intelligence
**Problem:** Brief parsing, type detection, completeness checking

**Evidence from session:**
- Leo: Different brief types need different info (production vs creative)
- No templates flexible enough
- Producers spend time chasing missing details

**Opportunity:** AI agent that detects brief type and flags missing information before work starts

---

### 2. Predictive Project Health
**Problem:** Budget alerts, resource conflicts, absence overlaps

**Evidence from session:**
- Leo's explicit request for proactive monitoring
- Recent retro cited holiday blindness issue
- Finance discovers problems after the fact

**Opportunity:** Connect Float + Maconomy + absence data for proactive alerts

---

### 3. Historical Memory
**Problem:** Similar project lookup, estimation assist, knowledge capture

**Evidence from session:**
- Leo: "Why are we estimating from scratch?"
- Knowledge in heads, leaves with people
- No retros, no capture mechanism

**Opportunity:** Estimation assistant querying Maconomy for similar projects

---

## Leo's Specific Requests (3D Motion Director)

1. **Brief completeness checker** — Flag missing info based on project type
2. **Estimation lookup** — Query historical data for similar projects
3. **Proactive project health** — Alert on unusual patterns during production
4. **Cross-reference absence data** — Catch holiday conflicts before they cause problems
5. **Eventually:** AI that learns to use software via video (mentioned Gemini, Claude Cowork)

---

## Quick Win Candidates

| Opportunity | Effort | Impact | Notes |
|-------------|--------|--------|-------|
| Brief completeness checker | Low | High | Reduces PM chase time |
| Tool compliance auto-fill | Low | Medium | Leo's friction point |
| Estimation assistant | Medium | High | Leo's explicit request |
| Project health alerts | Medium | High | Cited in recent retro |

---

## Budget & Resources

- **575,000 DKK** approved for Microsoft Agent projects
- **Nicholas** (new Head of AI) starts Feb 2
- Vacation week in between, strategy meeting Feb 20
- **Resource constraint:** Leo + 1 for AI workflows
- **Adobe Firefly collaboration** ongoing (Simon facilitating)

---

## IT Landscape Insights

### Authentication
- Entra ID = source of truth for org structure
- SAML integration for most tools
- SCIM for user provisioning on some (Adobe, Azure OpenAI)

### Storage Architecture
- LucidLink → Backblaze (3 buckets, hot storage)
- Need cold storage migration
- Retention: 2-5 years by client contract

### AI Governance
- MS List in Teams = AI tool compliance tracking
- EU AI Act risk categorization
- Checklist process for new tools
- Shadow IT allowed for personal exploration (private accounts, no production data)

### Client Communication
- Email primary (50/50 with Teams)
- Client Teams setup vs Spring setup varies
- Delivery method is client-driven (Encodify, FTP, OneDrive)

---

## Follow-Up Items

### From Simon (Received)
- [x] Shadow IT list
- [x] AI policies (internal + external)

### To Do
- [ ] Share updated process mapping with Simon/Cecile/Hendrik
- [ ] Coordinate with Nicholas (starts Feb 2)
- [ ] Potentially talk to Finance (owns Power BI) during sprint

---

## Quotes Worth Noting

**On estimation:**
> "We've done something like this already so many times. Why are we even bother to estimate? Shouldn't I just ask someone to look through the similar project in the last five years? Why don't we have an AI agent to do that?"
— Leo

**On proactive monitoring:**
> "If you notice an unusual pattern during production already, maybe ping. Instead of just retrospective, you can predict and anticipate problems."
— Leo

**On knowledge capture:**
> "If we have interesting things, or we finish something big, we will mention it there [town hall]. But not like project specifics."
— Leo

**On tool requests:**
> "I'm probably a big pain in the ass for IT. Sorry, Simon, for that."
— Leo

---

*Findings extracted from session transcript — February 3, 2026*
