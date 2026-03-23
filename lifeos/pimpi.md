# Pimpi — Product Homebase

> The complete reference for the Pimpi universe. Load this for any
> Pimpi-related conversation.
>
> Last updated: 2026-03-23

---

## What Pimpi Is

A family of tools that help kids turn intentions into action. Familyware —
tools that serve the actual logistics and emotional texture of raising kids.

The audience is two people at once: the kid who needs clarity and the parent
who needs trust. Everything ships through that dual lens.

---

## The Universe

```
  Explore                 Learn
  "What could I try?"     "What's interesting?"
  Hobby catalog           Grej of the Day
  Dopamine menu           Deep Dives
                          Library of Me
        │                       │
        │    ┌──────────────────┤
        ▼    ▼                  ▼
      Sparks                  Card
      "Let's do it"           "It counts"
      Guided missions         Stamp economy
      Proof of Done           Collections
```

| Product | Color | Status | One-liner | Core loop |
|---------|-------|--------|-----------|-----------|
| Sparks | Orange #FF6D00 | Live (free) | Missions. "From spark to done." | Choose → do → prove → celebrate |
| Card | Mint #00E676 | Private alpha | Stamps. "Every activity counts." | Contribute → stamp → collect → milestone |
| Learn | TBD | Not started | Discovery. "Your library, your life." | Discover → explore → reflect → grow |
| Explore | TBD | Concept | Hobbies. "What should I try next?" | Browse → try → track → deepen |

### Cross-product connections

| From | To | Connection |
|------|----|------------|
| Explore | Sparks | "Want to try pottery? Here's a Spark to guide your first project" |
| Explore | Card | "Started a new hobby? Here's a stamp card for it" |
| Explore | Learn | "Curious about astronomy? Here's a Deep Dive" |
| Learn | Explore | "Today's Grej was about robotics — here are related hobbies" |
| Sparks | Card | Completing a Spark earns stamps |
| Card | Explore | "You've filled your art card — try a new art hobby" |

---

## Non-Negotiable Principles

These are load-bearing. If a feature conflicts, the feature changes.

1. **The kid picks the goal.** Desire-led, not obligation-led. Every feature asks: "Does this put the kid in the driver's seat?"
2. **No guilt, no manipulation.** No leaderboards, XP, loot boxes, comparisons between kids. Stamps are never taken away. Streaks celebrate showing up — never punish absence.
3. **No surveillance.** No "your child hasn't been active" notifications. No inactivity dashboards. If a kid takes a week off, tomorrow is just another day.
4. **State what it does, don't sell what it could be.** No hype, no manufactured urgency, no "revolutionary platform." Describe plainly. If the product is good, that's enough.
5. **Scope is sacred.** Don't silently shrink it (marking obvious pieces as "non-goals") or expand it (adding unrequested features). Ask before changing scope.
6. **Visual consistency is brand.** The post-it aesthetic is the strongest visual signature. Every new surface inherits it. A screen that looks like generic white-box UI is a bug.
7. **Compliance by architecture.** No collecting, storing, or processing data from minors without parent initiation. Structural protection, not policy-based.

---

## Design System

**Aesthetic:** Post-it cards — flat solid color fills, adhesive strips, corner folds, slight rotation, crisp shadows. No blurry/diffused shadows. No paper textures.

**Colors (post-it palette):**

| Name | Use |
|------|-----|
| Yellow | Default post-it |
| Coral | Alerts, warmth |
| Mint | Pimpi Card, success |
| Sky | Information, calm |
| Lavender | Creativity, reflection |
| Peach | Soft accents |

Use `postit-*` color tokens from `tailwind.config.ts` — never hardcode hex values.

**Typography:** DM Sans only. Weights 400-800. No other typeface.

**Text contrast:** Luminance-based dynamic contrast. Dark text on light post-its, light text on dark ones.

**Icons:** `@iconify-json/streamline-freehand` + custom SVGs. Never emoji. Never Lucide in Pimpi products.

**Mascot:** Flat mint-green illustration with sticker shadow. Never on a post-it — always on the page surface.

**Shadows:** Always crisp. Never blurry/diffused.

---

## Protected Vocabulary

These terms never translate, never synonym-swap, never drift.

| Term | Meaning | Never say |
|------|---------|-----------|
| Spark | A mission/goal the kid chooses | Task, assignment, challenge |
| Streak | Consecutive days showing up | Streak-loss, penalty |
| Proof of Done | Evidence the kid completed a Spark | Submission, upload |
| Stamp | Recognition for an activity | Reward, point, XP |
| Pimpi | The brand | - |
| Activity | Something a kid does (in Card) | Chore, job, task |
| Contribution | Activity subtype: household help | Chore |
| Challenge | Activity subtype: something new/hard | Assignment |
| Celebrate | What you do with milestones | Redeem, cash in, earn |
| Grej | Daily micro-learning moment (in Learn) | Lesson, quiz |

**"Activities" not "chores."** Chore sounds like obligation. Activity sounds like choice.

**"Do activities. Get stamped."** not "Earn stamps by helping out!" Earn sounds transactional.

---

## Pimpi Learn (absorbing TLOM/StudyStars)

> Pivot decision 2026-03-23. Original TLOM team disengaged. Core concepts
> fold into Pimpi as a self-directed product.

### Three layers

**Grej of the Day** — daily micro-learning.
- One interesting topic, age-appropriate, beautifully presented in post-it style
- Kid can: save it, share it, or go deeper
- No guilt for missing a day
- Phase 1: curated by topic (science, history, nature, culture, tech)
- Phase 2: personalized based on kid's interests and Library of Me profile
- Content pipeline generates these at scale (target: 365 for year one)

**Deep Dives** — structured exploration when curiosity strikes.
- Kid chooses a topic (from a Grej, from life, from Explore catalog)
- Structured 3-5 step path, age-appropriate
- Produces an artifact (summary, project, creation)
- Uses TLOM content pipeline (research → generation → quality validation)
- Desire-led: the kid picks what to explore

**Library of Me** — self-reflection and soft skills.
- The observe-map-design-test-codify cycle
- 7 competencies as organizing framework:
  1. Critical Thinking
  2. Adaptability
  3. Systems Thinking
  4. (4-7 from OECD Learning Compass 2030 — to be confirmed)
- Over time, the kid builds their personal operating manual
- Reflection prompts generated by content pipeline
- This is the long-term anchor — the other two feed into it

### What transferred from TLOM

| TLOM concept | Pimpi Learn version |
|-------------|-------------------|
| Content pipeline (research → generation → validation) | Generates Grejs, Deep Dives, reflection prompts |
| Gold-standard model (expert writes one, AI generates rest) | Israel + AI generates content (no external expert) |
| Compliance architecture (5-layer) | Inherited from Pimpi principles |
| 7 competencies (OECD Learning Compass 2030) | Organizing framework for Library of Me |
| Observe-map-design-test-codify cycle | Library of Me reflection structure |
| Facilitator scripts | Dropped (self-directed model) |
| Cohort model | Dropped (individual, join anytime) |
| Printed hardcover books | Dropped (digital artifacts) |

---

## Pimpi Explore (concept phase)

### Phase 1: Curated hobby catalog (content only)
- Categorized hobbies and activities
- Each entry: description, difficulty, age range, what you need, cost level
- Connections to Sparks ("try this"), Card ("track this"), Learn ("learn about this")
- The "dopamine menu" — fights "I'm bored and don't know what to do"
- Target: 200+ hobbies in catalog at launch
- Content pipeline generates entries

### Phase 2: Local marketplace (after families are using Explore)
- Local hobby clubs, teachers, stores list themselves
- Parents discover local options for their kids
- Businesses pay for visibility (promoted listings)
- Network effects: more families → more businesses → more families
- Geographically anchored (Netherlands first)

---

## Tech Stack

**Current (Sparks + Card):**
- Next.js (App Router, RSC), React 19, Expo/React Native
- Supabase (Postgres + Auth + RLS), Turborepo, pnpm workspaces
- Tailwind v3, Framer Motion, react-hook-form + zod
- next-intl, shadcn/ui
- Mastra AI agents, LangSmith prompt hub
- Three locales from day one: EN, ES, NL

**For Learn + Explore:**
- Same monorepo, shared packages
- Content pipeline from TLOM codebase (to be migrated/adapted)
- pgvector for semantic search (Deep Dive content retrieval)
- Content stored in Supabase, generated via pipeline, served from cache

**Known gotchas:**
- Local IP changes break Expo dev — check `EXPO_PUBLIC_API_URL` first
- `ignoreBuildErrors: true` means TS errors slip through builds
- Two cookie layers for auth (httpOnly Supabase + simplified edge-runtime `pimpi-token`)
- No test framework yet
- All Supabase access through API routes — no `NEXT_PUBLIC_` Supabase vars

---

## Revenue Model

```
Free tier:
  Sparks  — 3 active sparks
  Card    — basic stamp tracking
  Learn   — 1 Grej per day (view only)
  Explore — browse catalog

Pimpi+ (EUR 4-6/mo or EUR 40-60/year per family):
  Sparks  — unlimited sparks, templates
  Card    — full stamp economy, categories, milestones
  Learn   — Grej archive + Deep Dives + Library of Me
  Explore — save favorites, personalized suggestions

Future: Pimpi Explore marketplace (B2B)
  Local businesses pay for listings / promoted placement
```

**Revenue math:**
- 100 families × EUR 5/mo = EUR 500/mo (breathing room)
- 250 families × EUR 5/mo = EUR 1,250/mo (meaningful)
- 500 families × EUR 5/mo = EUR 2,500/mo (game-changing)

Marginal cost of a new family ≈ EUR 0 (content is inventory).

---

## Phased Rollout

| Phase | What | Timeline | Key question |
|-------|------|----------|-------------|
| **1** | Pimpi+ paywall on Sparks + Card | Now (1-2 weeks) | Do we have active users? |
| **2** | Pimpi Learn MVP (Grej of the Day + basic Deep Dives) | 3 months | How much TLOM pipeline needs adapting? |
| **3** | Library of Me layer in Learn | Month 4-5 | Which competencies resonate most? |
| **4** | Pimpi Explore catalog (content only) | Month 5-6 | What hobbies do kids actually browse? |
| **5** | Explore marketplace (B2B listings) | After Explore traction | Do local businesses want this? |

**Phase 1 is the priority.** Everything else sequences behind paying users.

---

## Copy Guidelines

**Kid-facing:**
- Short sentences. Action verbs. Zero condescension.
- "Stamp it." not "Great job completing your activity!"
- "Do it." "Nice one." "What's next?"
- Periods are intentional — matter-of-fact tone.

**Parent-facing:**
- Honest, slightly conspiratorial, builds trust.
- "Yeah, we've been there."
- Specific, not hype. "Your kid picks 3 activities per week" not "unlock your child's potential."

**Marketing / public site:**
- State, don't sell. Describe what it does.
- No manufactured urgency. No "revolutionary." No "transformative."
- If the product is good, describing it plainly is enough.

---

## Competitive Context

**What Israel pays for his own kids:**
- Kodland — coding education for kids
- EarlySteps Academy — early skills development

These validate the market from the consumer side. Pimpi Learn is
complementary (life skills, not coding) but competes for the same
parent budget and kid attention.

**Key differentiator:** Pimpi is a connected ecosystem. Kodland teaches
coding. EarlySteps teaches skills. Pimpi connects doing (Sparks),
contributing (Card), learning (Learn), and discovering (Explore) into
one world where everything feeds everything else. No other product does this.

---

## Open Questions

- [ ] Active user count for Sparks — determines Phase 1 approach
- [ ] Colors for Learn and Explore in the post-it palette
- [ ] How much of the TLOM content pipeline needs adaptation vs. direct reuse?
- [ ] Which 7 competencies (confirm full list from OECD framework)
- [ ] App Store status — is Sparks in the App Store or TestFlight only?
- [ ] Pimpi+ pricing: EUR 4 or EUR 6/mo? EUR 40 or EUR 60/year?
- [ ] Is the public site restructure (multi-product nav) done or in progress?

---

*This is the Pimpi homebase. Load it at the start of any Pimpi conversation.
Update when products ship, pivot, or when new decisions are made.*
