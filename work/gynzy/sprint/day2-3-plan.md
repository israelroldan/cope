# Day 2-3 Plan: Prototype Building

> Sprint Days 2-3 (January 13-14, 2026)
> Teams: Solution Team + User Research Team
> Framework: 3 Domains × 3 Levels

---

## Timeline Overview

| Day | Focus |
|-----|-------|
| **Day 2-3** | Build individual prototypes (aim for "Haalbaar" level) |
| **Thursday** | Validate pieces with team/teachers |
| **Friday** | Connect into integrated demo + stretch toward "Supergreen" |

---

## Team Structure

| Team | Focus | Output |
|------|-------|--------|
| **Solution Team** | Build working prototypes | Functional demos for Thursday |
| **User Research Team** | Validate assumptions with teachers/experts | Insights that shape prototype direction |

---

## The 3 Domains

| # | Domain | Goal |
|---|--------|------|
| 1 | **Data Verrijking & Audience Selectie** | Van platte data naar een "Teacher DNA" profiel |
| 2 | **NBA Engine** | Van simpele triggers naar intelligente prioriteiten (Air Traffic Control) |
| 3 | **Automated Content Creation & Staging** | Van handwerk naar een gepersonaliseerde 'Content Factory' |

---

# Domain 1: Data Verrijking & Audience Selectie

**Goal:** Van platte data naar een "Teacher DNA" profiel

## Level: Minimaal (De Basis)

**What:** Een gedefinieerd datamodel voor één persona (bijv. "De Bord-gebruiker")

**Deliverables:**
- Map which events from Gynzy (e.g., 'Startpagina ingesteld') are needed
- Map which Census data (e.g., 'Aantal leerlingen') feeds the profile
- **Output: Data Dictionary ready for engineers**

**Build approach:**
- Interview with Koen/data team on available fields
- Document in structured format (Notion/spreadsheet)
- Validate completeness with one persona

**Time estimate:** 3-4 hours

---

## Level: Haalbaar (Het Doel) ⭐ TARGET

**What:** Een gevalideerde set van afgeleide metrics — not just "clicks" but translated into properties

**Deliverables:**
- Define logic for derived scores:
  - "Digivaardigheid-score" (digital proficiency)
  - "Structuur-behoefte" (structure need)
  - Based on behavioral patterns (Teacher DNA concept)
- **Output: Dummy Dataset of 50 fictional teachers with enriched profiles**
- This dataset feeds into Domain 2 (NBA Engine) for testing

**Build approach:**
- Define 4-6 derived metrics with calculation logic
- Create synthetic data generator (Python/spreadsheet)
- Validate metric definitions with team

**Time estimate:** 6-8 hours

---

## Level: Supergreen (De Droom)

**What:** Audience is no longer static list but dynamic cluster

**Deliverables:**
- Model automatically recognizes behavior changes
  - "Docent X now behaves like a Power User" — without manual segmentation
- **Output: Concept for Predictive Audience**
  - Model predicts who will churn or upgrade next week

**Build approach:**
- Clustering algorithm on enriched profiles
- Churn/upgrade prediction model (if data available)

**Time estimate:** 8-12 hours (Friday stretch)

---

## Research Support (Domain 1)

| Research Task | Purpose |
|---------------|---------|
| Interview Annemarie/Maria on current segmentation logic | Capture tribal knowledge |
| Validate "Teacher DNA" dimensions with teachers | Do these profiles feel accurate? |
| Test derived metrics against real examples | Does "Digivaardigheid-score" correlate with reality? |

---

# Domain 2: NBA Engine (Next Best Action)

**Goal:** Van simpele triggers naar intelligente prioriteiten (Air Traffic Control)

## Level: Minimaal (De Basis)

**What:** Een werkende Beslisboom voor de 'Cross-sell loop' (Van Bord naar Trainer)

**Deliverables:**
- Logic: IF (User = Bord-gebruiker) AND (Heeft 5x tool gebruikt) → THEN (Action = Promoot Trainer)
- **Output: Flow chart in Miro/Figma with no gaps**

**Build approach:**
- Map one complete decision path
- Document all conditions and outcomes
- Validate logic completeness

**Time estimate:** 3-4 hours

---

## Level: Haalbaar (Het Doel) ⭐ TARGET

**What:** Engine contains "Air Traffic Control" insight and/or logic

**Deliverables:**
- System can visualize AND/OR resolve overlap:
  - When user is in onboarding AND hits sales-trigger → logic determines which action wins based on priority scores
- Shows when a person is NOT in any flow
- **Output: Dashboard showing users and which flows they're in (or not)**
- **Output: Logic Prototype (Excel/no-code) that takes Domain 1 data and outputs correct priority**

**Build approach:**
- Pull user/flow data from Intercom
- Build overlap detection logic
- Create priority scoring system
- Simple dashboard UI (Retool/spreadsheet/v0)

**Time estimate:** 8-10 hours

---

## Level: Supergreen (De Droom)

**What:** NBA chooses the right channel based on context

**Deliverables:**
- Engine determines:
  - "User is logged in now → show Native Tip"
  - "User offline for a week → send Email"
- **Output: Multi-channel decision model that prevents message fatigue through smart dosing**

**Build approach:**
- Add channel selection logic to NBA
- Factor in recency, frequency, channel preference
- Message fatigue prevention rules

**Time estimate:** 6-8 hours (Friday stretch)

---

## Research Support (Domain 2)

| Research Task | Purpose |
|---------------|---------|
| Map current flow priorities (which is most important?) | Define priority scoring |
| Test priority logic with edge cases | Does the NBA make sensible choices? |
| Validate channel preferences with teachers | When do they want email vs. in-app? |

---

# Domain 3: Automated Content Creation & Staging

**Goal:** Van handwerk naar een gepersonaliseerde 'Content Factory'

## Level: Minimaal (De Basis)

**What:** Een Prompt Template die werkt

**Deliverables:**
- Input: Naam, NBA, Doel (manually entered)
- Output: Email that matches Gynzy 'Tone of Voice'
- **Output: Proof that AI can write content without heavy editing**

**Build approach:**
- Collect 5-10 example "good" emails
- Engineer prompt with few-shot examples
- Test with various inputs

**Time estimate:** 3-4 hours

---

## Level: Haalbaar (Het Doel) ⭐ TARGET

**What:** Automated Staging — output is not plain text but formatted message

**Deliverables:**
- Output: Formatted message (HTML/JSON) ready for Intercom or Native environment
- Content varies based on Domain 1 variables:
  - Playful tone for onderbouw teacher
  - Formal tone for administrator
- **Output: Working Generator Tool (OpenAI Playground/Zapier/custom)**
- One button press → 5 perfect variations

**Build approach:**
- Structured output from LLM (JSON mode)
- Template system for HTML formatting
- Variable injection from user profile
- NL/Flanders localization toggle

**Time estimate:** 8-10 hours

---

## Level: Supergreen (De Droom)

**What:** Native & External Integration

**Deliverables:**
- Generator creates not just text but also:
  - Visual/tip card for in-product (Native Integration)
- **Output: One button generates complete Omnichannel Campaign set**
  - Mail + In-app message + Push notification
  - Ready for sending

**Build approach:**
- Image generation or template-based visuals
- Multi-format output (email HTML, in-app JSON, push payload)
- Campaign package export

**Time estimate:** 8-12 hours (Friday stretch)

---

## Research Support (Domain 3)

| Research Task | Purpose |
|---------------|---------|
| Collect brand voice examples (5-10 emails) | Training data for prompts |
| Document tone differences (onderbouw vs. bovenbouw, NL vs. Flanders) | Variation rules |
| Test AI content with teachers | Can they tell the difference? What feels wrong? |

---

# Day 2-3 Schedule

## Day 2: Foundation + Minimaal → Haalbaar

| Time | Solution Team | User Research Team |
|------|---------------|-------------------|
| **Morning** | Domain 1: Data Dictionary + start derived metrics | Interview Annemarie/Maria on segmentation logic |
| **Afternoon** | Domain 2: Decision tree + start ATC logic | Collect brand voice examples, interview prep |
| **End of day** | Have "Minimaal" complete for all 3 domains | Have research inputs ready for Day 3 |

## Day 3: Haalbaar Completion

| Time | Solution Team | User Research Team |
|------|---------------|-------------------|
| **Morning** | Domain 1: Complete dummy dataset | Validate Teacher DNA with quick teacher tests |
| | Domain 2: Complete ATC dashboard | Test priority logic with edge cases |
| **Afternoon** | Domain 3: Complete generator tool | Test AI content quality |
| | Integration + polish | Synthesize findings for Thursday |
| **End of day** | "Haalbaar" complete for all 3 domains | Research report ready |

---

# Success Criteria

## Thursday Demo: "Haalbaar" Level Achieved

| Domain | Success = |
|--------|-----------|
| **Data Verrijking** | Dummy dataset of 50 teachers with derived metrics (Digivaardigheid, Structuur-behoefte, etc.) |
| **NBA Engine** | Dashboard showing real users, flow membership, overlap detection, priority recommendations |
| **Content Factory** | Generator that produces 5 formatted email variations with one click, tone varies by segment |

## Friday Stretch: "Supergreen" Attempts

| Domain | Stretch = |
|--------|-----------|
| **Data Verrijking** | Predictive clustering (who's about to churn/upgrade) |
| **NBA Engine** | Multi-channel decision (email vs. in-app based on context) |
| **Content Factory** | Omnichannel campaign set (email + in-app + push) |

---

# Integration Vision (Friday)

When all 3 domains connect:

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  DOMAIN 1: Teacher DNA                                          │
│  ┌─────────────────────┐                                        │
│  │ User Profile        │                                        │
│  │ • Digivaardigheid: 7│                                        │
│  │ • Structuur: Hoog   │                                        │
│  │ • Segment: Bord+    │                                        │
│  └──────────┬──────────┘                                        │
│             │                                                   │
│             ▼                                                   │
│  DOMAIN 2: NBA Engine                                           │
│  ┌─────────────────────┐                                        │
│  │ Air Traffic Control │                                        │
│  │ • In flows: 2       │                                        │
│  │ • Overlap: Yes      │                                        │
│  │ • Priority: Trainer │                                        │
│  │ • Channel: Email    │                                        │
│  └──────────┬──────────┘                                        │
│             │                                                   │
│             ▼                                                   │
│  DOMAIN 3: Content Factory                                      │
│  ┌─────────────────────┐                                        │
│  │ Generated Campaign  │                                        │
│  │ • Email: ✓          │                                        │
│  │ • In-app: ✓         │                                        │
│  │ • Tone: Formeel     │                                        │
│  │ • Localized: NL     │                                        │
│  └─────────────────────┘                                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Demo story: "Here's a teacher. Their Teacher DNA shows high structure-need.
NBA Engine says they should get the Trainer promotion, via email (they're
offline). Content Factory generates a formal Dutch email, ready to send."
```

---

# Data/Access Needed

- [ ] Sample user data export from Koen (events + attributes)
- [ ] Census data fields documentation
- [ ] Current flow membership data from Intercom
- [ ] List of available Gynzy events (for derived metrics)
- [ ] 5-10 example "good" emails (brand voice)
- [ ] Intercom API credentials (for tag operations)
- [ ] Access to BigQuery (for user queries)

---

# Reference

**Facilitator's Framework:**
- Domain 1: Data Verrijking & Audience Selectie
- Domain 2: NBA Engine
- Domain 3: Automated Content Creation & Staging

**Levels:**
- Minimaal (De Basis) — Minimum viable proof
- Haalbaar (Het Doel) — Sprint target ⭐
- Supergreen (De Droom) — Friday stretch
