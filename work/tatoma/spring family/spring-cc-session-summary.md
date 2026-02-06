# Spring CC — Process Discovery Session Summary

**Date:** January 27, 2026
**Attendees:** Simon (Group CIO), Leo (Director 3D Motion), Israel (Tatoma)
**Duration:** ~2 hours

---

## Session Outcome

We mapped Spring's primary tools to process stages across the Connected Intelligence Blueprint domains. Three high-value themes emerged for the Foundation Sprint.

---

## Three Priority Themes

### 1. Intake Intelligence
**Problem:** Briefing fragmentation. No standard intake process—briefs arrive via email/Teams with varying completeness. Production briefs need technical specs (resolution, frame rate); creative briefs need different info. PMs manually chase missing details.

**Opportunity:** AI agent that detects brief type and flags missing information before work starts.

**Systems involved:** Email, Teams, Encodify

---

### 2. Predictive Project Health
**Problem:** Project overruns discovered after the fact. Finance asks "why is profit bad?" and then teams scramble to investigate. Cross-department holiday conflicts cause handover chaos (cited in recent retro).

**Opportunity:** Proactive alerts connecting:
- Float (resource allocation)
- Maconomy (time/budget actuals)
- Absence data

Alert when: unusual time patterns, senior-heavy allocation, holiday conflicts, budget trajectory.

**Systems involved:** Float, Deltek Maconomy Cloud, Power BI, Zoios (absence)

---

### 3. Historical Memory
**Problem:** "We've done this 100 times—why are we estimating from scratch?" No lookup of similar past projects. Knowledge lives in people's heads. No retros except for major issues. When people leave, context goes with them.

**Opportunity:**
- Estimation assistant querying Maconomy for similar projects
- Knowledge capture prompts after project delivery
- Searchable project history

**Systems involved:** Deltek Maconomy Cloud, Microsoft Loop (guidelines), Encodify

---

## Tool Landscape Corrections

| Change | Detail |
|--------|--------|
| Monday.com | Downgraded to archive → **Encodify** is primary PM |
| Asana | Client-side only (task sharing with clients) |
| Discord/Midjourney | **Non-compliant** - one client exception |
| WeTransfer | Being phased out → internal FTP |
| + Weave AI | AI tool container (Runway, Cling, Flux) |
| + Microsoft Loop | Workflow docs, client process guidelines |
| + Zoios | Pulse surveys, 1:1 journals, EDP |
| + Deltek Maconomy Cloud | Time, budgets, invoicing |
| No HR system | Confirmed - under investigation |

---

## Quick Win Candidates

| Opportunity | Effort | Impact |
|-------------|--------|--------|
| Brief completeness checker | Low | High - reduces PM chase time |
| Tool compliance auto-fill | Low | Medium - Leo's friction point |
| Estimation assistant | Medium | High - Leo's explicit request |
| Project health alerts | Medium | High - cited in recent retro |

---

## Resources & Constraints

- **Budget:** 575,000 DKK approved for Microsoft Agent projects
- **New Head of AI:** Nicholas starts Feb 2
- **Strategy meeting:** Feb 20
- **Resource constraint:** Limited internal capacity (Leo + 1 for AI workflows)
- **Adobe collaboration:** Firefly initiative ongoing (Simon facilitating)

---

## Pending Items from Simon

- [ ] Shadow IT list (suspected tools)
- [ ] AI policies (internal + external)

---

## Next Steps

1. **Share this summary** with Cecile and Hendrik
2. **Coordinate with Nicholas** once he starts (Feb 2)
3. **Pick Foundation Sprint focus** from the three themes
4. **Identify pilot users** for first AI capability
5. **Schedule technical discovery** for chosen theme

---

## Attachments

- Updated process mapping: `spring-cc-process-mapping.csv`
- Session playbook with full notes: `spring-cc-session-playbook.md`

---

*Summary prepared: February 3, 2026*
