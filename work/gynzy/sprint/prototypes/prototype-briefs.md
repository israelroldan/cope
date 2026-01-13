# Prototype Briefs — Gynzy Growth Sprint

*Raw notes for Day 2-3 build phase*
*Framework: 3 Domains × 3 Levels*

---

## Framework Overview

| Domain | Goal | Target Level |
|--------|------|--------------|
| **1. Data Verrijking & Audience Selectie** | Van platte data naar "Teacher DNA" profiel | Haalbaar |
| **2. NBA Engine** | Van simpele triggers naar Air Traffic Control | Haalbaar |
| **3. Content Factory** | Van handwerk naar gepersonaliseerde content | Haalbaar |

| Level | Dutch | Meaning |
|-------|-------|---------|
| **Minimaal** | De Basis | Minimum viable proof |
| **Haalbaar** | Het Doel | Sprint target ⭐ |
| **Supergreen** | De Droom | Friday stretch |

---

# DOMAIN 1: Data Verrijking & Audience Selectie

**Goal:** Van platte data naar een "Teacher DNA" profiel

---

## Level: Minimaal (De Basis)

### What We're Building
Een gedefinieerd datamodel voor één persona (bijv. "De Bord-gebruiker")

**Raw context:** Right now data exists in silos — events from Gynzy frontend, attributes synced via Census, behavioral patterns in BigQuery. Nobody has mapped what data actually exists, what it means, and how it connects. The team makes segmentation decisions based on tribal knowledge, not documented data definitions. Before we can build anything smart, we need to know what raw material we have to work with.

**Goals:** Create a Data Dictionary that maps: which events from Gynzy (e.g., "Startpagina ingesteld") feed into profiles, which Census data (e.g., "Aantal leerlingen") is available, what each field means, and how they connect. Make this usable by engineers who will eventually productionize it. Start with one complete persona to prove the approach works.

**Workflow:** Interview Koen/data team on available fields → document all events and their meanings → document all Census/Intercom attributes → map which fields define one persona (e.g., "Bord-gebruiker") → structure in Notion/spreadsheet format → validate completeness by checking: "could we identify this persona from this data?"

**What we want to learn:** What data actually exists vs. what we assumed exists? Are there gaps — signals we need but don't have? How clean/reliable is the data? What's the latency (real-time events vs. daily Census sync)? Does the data team have bandwidth to add new fields if needed?

**Time estimate:** 3-4 hours

---

## Level: Haalbaar (Het Doel) ⭐ TARGET

### What We're Building
Een gevalideerde set van afgeleide metrics — not just "clicks" but translated into Teacher DNA properties

**Raw context:** Raw data (login counts, lessons created, tools used) doesn't tell you who someone IS. The magic is in derived metrics that translate behavior into meaning. "Digivaardigheid-score" (digital proficiency) based on feature adoption patterns. "Structuur-behoefte" (structure need) based on how they use planning tools. These derived scores become the "Teacher DNA" that drives personalization. The transcript mentioned "Teacher DNA" concept — this is where we define what that actually means.

**Goals:** Define 4-6 derived metrics with clear calculation logic. Create a dummy dataset of 50 fictional teachers with enriched profiles using these metrics. This dataset feeds into Domain 2 (NBA Engine) for testing. Prove we can transform raw behavioral data into meaningful segments without manual tagging.

**Workflow:** Define derived metrics (Digivaardigheid, Structuur-behoefte, Engagement-trajectory, Champion-potential, etc.) → document calculation logic for each (e.g., "Digivaardigheid = weighted score of features_used × frequency × recency") → build synthetic data generator (Python script or spreadsheet) → generate 50 fictional teachers with realistic distributions → validate with team: "does teacher #23 feel like a real person?"

**What we want to learn:** Do these derived metrics actually correlate with reality? Can Annemarie/Maria look at a Teacher DNA profile and say "yes, that matches what I know about this type"? Which metrics are most predictive of desired behaviors (activation, expansion, churn)? Are 4-6 metrics enough or do we need more/fewer?

**Time estimate:** 6-8 hours

---

## Level: Supergreen (De Droom)

### What We're Building
Audience is no longer static list but dynamic cluster — model automatically recognizes behavior changes

**Raw context:** Today segments are static — you're tagged "power user" and stay that way until someone manually re-tags you. But teachers evolve. A struggling newbie becomes proficient. A power user goes quiet. The dream is segments that update themselves: "Docent X now behaves like a Power User" without anyone manually changing their tags. Even better: predict who will churn or upgrade next week before it happens.

**Goals:** Build clustering algorithm that groups teachers by behavior patterns, not manual tags. Detect when someone's cluster membership changes ("this teacher moved from Beginner to Intermediate"). Explore predictive model: given current trajectory, who's likely to churn in 2 weeks? Who's likely to expand to colleagues?

**Workflow:** Take enriched profiles from Haalbaar level → apply clustering algorithm (k-means, hierarchical, etc.) → visualize clusters and validate they make sense → track cluster transitions over time (if we have historical data) → build simple churn/expansion prediction model → test predictions against known outcomes.

**What we want to learn:** Do natural clusters emerge from the data, or is it noise? How often do teachers actually change clusters? Can we predict churn with meaningful accuracy? What's the earliest warning signal? Would the team trust algorithmic segment assignment?

**Time estimate:** 8-12 hours (Friday stretch)

---

# DOMAIN 2: NBA Engine (Next Best Action)

**Goal:** Van simpele triggers naar intelligente prioriteiten (Air Traffic Control)

---

## Level: Minimaal (De Basis)

### What We're Building
Een werkende Beslisboom voor de 'Cross-sell loop' (Van Bord naar Trainer)

**Raw context:** The team has implicit decision logic: "if someone uses the whiteboard a lot, we should tell them about Trainer." But this logic isn't documented or systematized. It lives in people's heads. Flows get built based on intuition, not explicit rules. Before we can build smart prioritization, we need to map at least ONE complete decision path with no gaps — every condition covered, every outcome defined.

**Goals:** Map one complete decision tree: Bord-gebruiker → Trainer promotion. Document all conditions: IF (User = Bord-gebruiker) AND (Heeft 5x tool gebruikt) → THEN (Action = Promoot Trainer). Cover all branches including "what if they already have Trainer?" Flow chart in Miro/Figma with no gaps or dead ends.

**Workflow:** Pick one cross-sell path (Bord → Trainer) → interview team on decision logic → map all entry conditions → map all branching conditions → map all outcomes (including "do nothing") → identify edge cases → create visual flow chart → walk through with team to find gaps → iterate until complete.

**What we want to learn:** How complex is ONE decision path when fully mapped? Where are the gaps in current thinking ("we never considered what happens if...")? How many conditions actually matter vs. assumed to matter? Can we even agree on the logic as a team?

**Time estimate:** 3-4 hours

---

## Level: Haalbaar (Het Doel) ⭐ TARGET

### What We're Building
Engine contains "Air Traffic Control" — visualizes AND resolves overlap, shows coverage gaps

**Raw context:** This is the P0 problem from Day 1. Users in multiple flows (overlap = message fatigue). Users in no flows (gaps = missed opportunities). "We weten niet wat doorslaggevend" — no visibility into current state. The Day 1 transcript confirmed this is the core pain. Air Traffic Control means: see all the planes (users), know which runways (flows) they're on, and have rules for when runways conflict.

**Goals:** Build dashboard showing real users and which flows they're in (or not). Detect overlap: when user qualifies for multiple flows, which one wins? Detect gaps: which users aren't in ANY flow? Build priority logic: when onboarding AND sales-trigger conflict, system determines winner based on priority scores. Output: Excel/Retool/v0 prototype that takes Domain 1 data and outputs correct priority.

**Workflow:** Pull user/flow membership data from Intercom (API or export) → build overlap detection (users in 2+ flows) → build gap detection (users in 0 flows) → define priority scoring system (which flow types trump others) → build decision logic (when conflict, apply priority) → create simple dashboard UI → test with real edge cases from team.

**What we want to learn:** What does real overlap look like — 5% of users or 50%? What are the actual gap segments? Does priority scoring feel right to the team? What edge cases break the logic? Would they trust automated priority decisions? What's the API/data access actually like — can we get flow membership?

**Time estimate:** 8-10 hours

---

## Level: Supergreen (De Droom)

### What We're Building
NBA chooses the right channel based on context — not just WHAT to say but WHERE to say it

**Raw context:** Today everything goes through Intercom email. But the same message might work better as an in-app tip (if they're logged in right now) or should wait (if they just got 3 emails). Message fatigue is real. The dream: system knows "User is logged in now → show Native Tip" vs. "User offline for a week → send Email." Smart dosing prevents fatigue.

**Goals:** Add channel selection to NBA Engine. Factor in: user's current state (online/offline), recency of last message, channel preferences, message urgency. Build message fatigue prevention rules (max 2 emails/week, etc.). Output: multi-channel decision model that recommends not just action but delivery method.

**Workflow:** Add channel dimension to NBA logic → define channel selection rules (urgency × recency × state) → add fatigue prevention layer (cooldowns, caps) → integrate with Domain 1 profiles (channel preferences) → test with scenarios: "user just got email yesterday and is online now — what do we do?"

**What we want to learn:** Do teachers have actual channel preferences? What's the fatigue threshold — how many messages before they tune out? Does channel switching improve engagement or confuse people? What signals indicate "now is a good time"?

**Time estimate:** 6-8 hours (Friday stretch)

---

# DOMAIN 3: Automated Content Creation & Staging

**Goal:** Van handwerk naar een gepersonaliseerde 'Content Factory'

---

## Level: Minimaal (De Basis)

### What We're Building
Een Prompt Template die werkt — proof that AI can write in Gynzy's voice

**Raw context:** The team already uses ChatGPT for content but it's ad-hoc. Each person prompts differently, quality varies, and outputs don't consistently match Gynzy's tone. The Day 1 transcript mentioned "AI-generated content suggestions (not replacement)" — building blocks, not full automation. First we need to prove AI CAN write content that doesn't need heavy editing.

**Goals:** Build a prompt template that takes simple inputs (Naam, NBA, Doel) and outputs email content matching Gynzy's tone of voice. Prove the concept: AI output requires minimal editing to be usable. Collect 5-10 example "good" emails as few-shot training. Test with various inputs to ensure consistency.

**Workflow:** Research team collects 5-10 brand-voice examples → analyze what makes them "Gynzy" (tone, structure, vocabulary) → engineer prompt with few-shot examples → test with various inputs (different NBAs, different segments) → evaluate: how much editing needed? → iterate prompt until quality is consistent.

**What we want to learn:** Can AI capture Gynzy's specific voice from examples? What prompt structure works best? How much does output quality vary across different inputs? What types of content are hardest for AI (technical explanations? emotional appeals?)? Can non-technical team members use the prompt?

**Time estimate:** 3-4 hours

---

## Level: Haalbaar (Het Doel) ⭐ TARGET

### What We're Building
Automated Staging — output is not plain text but formatted message ready for Intercom

**Raw context:** Even when AI writes good content, there's still work to format it, add HTML, handle variables, create variants. The goal is one-button-press → multiple ready-to-use outputs. Content should vary based on Domain 1 profile data: playful tone for onderbouw teacher, formal tone for administrator. NL/Flanders localization built in.

**Goals:** Build generator tool (OpenAI Playground/Zapier/custom) that outputs formatted messages (HTML/JSON) ready for Intercom. One button press → 5 variations with different angles. Tone varies automatically based on Teacher DNA (Domain 1). Include NL/Flanders toggle for localization. Inject user variables (name, school, relevant feature).

**Workflow:** Build on Minimaal prompt → add structured output (JSON mode for consistent formatting) → create HTML templates for different email types → build variable injection system (pull from Domain 1 profiles) → add tone modulation rules (segment → tone mapping) → add NL/Flanders localization → create simple UI for generation → test full pipeline: profile in → formatted email out.

**What we want to learn:** Does structured output (JSON) improve consistency? How good is the tone modulation — can you tell onderbouw vs. bovenbouw emails apart? How accurate is NL/Flanders localization (or does it need native review)? Is "5 variations" useful or overwhelming? What's the actual time saving vs. current process?

**Time estimate:** 8-10 hours

---

## Level: Supergreen (De Droom)

### What We're Building
Omnichannel Campaign Generator — one button creates complete campaign set across all channels

**Raw context:** The ultimate vision: you describe a campaign goal, and the system generates not just one email but a complete campaign package. Email + in-app message + push notification, all coordinated, all on-brand, ready to deploy. This connects to Domain 2's multi-channel decision — content exists for whatever channel the NBA selects.

**Goals:** Generator creates complete campaign packages: email (HTML), in-app message (component format), push notification (short copy), and potentially visual tip cards. All variations coordinated with consistent messaging. One export contains everything needed for omnichannel campaign. Could even include visual generation for in-product tips.

**Workflow:** Extend Haalbaar generator → add in-app message format → add push notification format → add visual/tip card template → ensure messaging consistency across formats → build campaign package export → potentially integrate image generation for visuals → test complete campaign generation end-to-end.

**What we want to learn:** Do omnichannel campaigns feel coordinated or repetitive? What's the right level of variation across channels? Can we generate usable visuals or is that a step too far? Would the team actually use a campaign package or prefer channel-by-channel? What's the review burden for multi-format output?

**Time estimate:** 8-12 hours (Friday stretch)

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

# Summary Table

| Domain | Minimaal (3-4h) | Haalbaar ⭐ (6-10h) | Supergreen (8-12h) |
|--------|-----------------|--------------------|--------------------|
| **1. Data Verrijking** | Data Dictionary for one persona | Derived metrics + 50 teacher dummy dataset | Predictive clustering |
| **2. NBA Engine** | Decision tree for Bord→Trainer | ATC dashboard + priority logic | Multi-channel decision |
| **3. Content Factory** | Working prompt template | Formatted generator + tone variation | Omnichannel campaign set |

**Day 2-3 Target:** All three domains at Haalbaar level
**Friday Stretch:** Attempt Supergreen + full integration demo

---

*Briefs ready for Day 2-3 build phase*
