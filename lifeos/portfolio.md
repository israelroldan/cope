# Portfolio

> All ventures as one interconnected system. Updated when a venture's status
> materially changes.

---

## How It Connects

```
Tatoma BV (day job, 10% stake) → patterns & revenue
       ↓
Palú Labs (ZZP umbrella, 5-9) → experiments across trade names:
    Kimbi Games · Pimpi Apps · StudyStars/TLOM · Literary Sculptor
       ↓
Graduation: validated trade name → own BV under Jolie Invest
       ↑
Cope (infrastructure) → orchestrates everything
```

Each venture feeds the others. A competency rubric from StudyStars becomes a Tatoma deliverable template. A Tatoma AI pipeline pattern becomes a Pimpi or TLOM content generation backbone. Cope's MCP integrations serve both personal life and product development.

Palú Labs is the **incubator / publisher of record** for everything shipped on the 5-9 side. Kimbi Games, Pimpi Apps, StudyStars/The Library of Me, and The Literary Sculptor are all currently *handelsnamen* (trade names) on the same KvK registration. When a trade name earns investor interest or operational complexity beyond what ZZP exposure can absorb, it graduates to a standalone BV that sits under Jolie Invest BV (sibling to the Tatoma stake).

---

## TATOMA BV

**What:** Dutch AI consultancy helping organizations adopt AI through structured consulting engagements. "AI Transformation in a Box."

**Role:** CTO and co-founder. Product delivery, architecture, client-facing technical leadership.

**Co-founders:**
- Sander Kok — operations, domain partnerships, WBSO subsidy
- Maarten van den Heuvel-Erp — product, playbooks, client delivery

**Key team:**
- Thomas Verhappen — direct report

**Platform:** Multi-tenant SaaS. 10-app Next.js monorepo with 8 shared packages.
- Academy — AI learning platform with interactive activities
- Prompts — prompt library management (shipped)
- Workbench — strategic planning tools
- Client Portal — engagement tracking
- Cards — AI workflows
- Connected Intelligence Blueprint — consulting methodology

**Stack:** Next.js 16, Supabase (Postgres + RLS + storage), WorkOS AuthKit (SAML/SSO), pnpm workspaces, Turborepo, Vercel, Tailwind CSS 4, shadcn/ui, Radix UI. AI: Mastra agents, Vercel AI SDK, multi-provider (Anthropic, Google, Groq, Mistral, OpenAI).

**Active clients:** Robin Radar, Gynzy, ABN AMRO, Tijhuis Ingenieurs.

**Key channels:** #founders-talk (critical), #project-gynzy, #product, #-ai-rollout-project.

**Locales:** en, nl, da. Cookie-based detection. Informal Dutch register always.

**Revenue status:** Revenue-generating. Pays the bills and generates the patterns.

---

## StudyStars / The Library of Me (Palú Labs trade name)

> **Status update (2026-04-21):** Name kept around because the direction still
> has room. Positioning is being split from Pimpi Apps: StudyStars/TLOM leans
> B2B / webinar-based / older kids / more focused, while Pimpi Apps stays
> self-service / online / product-led / younger. The two are explicitly
> sibling brands under Palú Labs, not one folding into the other.
>
> An earlier (March 2026) plan folded TLOM concepts into Pimpi Learn after
> the original team disengaged. That plan is partially reversed: the shared
> concepts (competency framework, content pipeline, compliance architecture)
> still travel freely between the two brands as patterns, but the StudyStars/
> TLOM brand remains distinct and active-but-quiet.

**Domains:** studystars.net (canonical), thelibraryofme.com (sibling site).

**What:** EdTech for pre-teens and young adults. Competency-based, cohort or webinar-friendly, designed around student-authored artifacts (workbooks, printed books). Sells through facilitators and institutions, not consumer app stores — the opposite flank from Pimpi.

**Role:** Solo founder-engineer. Owns every product, architecture, and brand decision.

**Team:**
- Original education expert — disengaged (2026-03).
- Original sales/PM partner — disengaged (2026-03).
- No contract facilitators active. Future B2B delivery TBD.

**Pedagogical model:** Competency-based, 7 competencies (Critical Thinking, Adaptability, Systems Thinking, etc.), three program tiers (Starter → Achiever → Champion), three rubric levels (Emerging → Developed → Advanced). Aligned with OECD Learning Compass 2030. Observe-map-design-test-codify cycle per module.

**Compliance architecture (load-bearing):** Five layers — outbound pre-reads, nudge-only WhatsApp, human-only live sessions, kid-owned workbooks, parent-gated AI processing. Solves COPPA/GDPR-K by structure. If a feature breaks this, the feature changes — not the architecture.

**Content pipeline:** Research exploration → content generation → quality validation → post-cohort insight discovery. Gold-standard pattern: expert writes one, AI generates the rest. Sequential dependency chain (pre-reads → scripts → workbooks → digests). Atomic progress, resumable by default.

**Stack:** Three Next.js 16 apps (parent-portal, facilitator companion, backoffice), pnpm + Turborepo monorepo, Supabase (PostgreSQL + Auth + RLS + pgvector), Claude Sonnet 4 for text, OpenAI for embeddings, Stripe for payments, Lulu/Blurb for print, WhatsApp Business API for nudges, Resend + React Email.

**Market:** Tiger parents and expat families in EMEA/LATAM. NL, UK, Mexico research.

**Sibling:** Pimpi Apps. Different brand, different audience, same philosophical core (kid agency, no guilt, artifacts over scores). Where Pimpi goes product-led and consumer-direct, StudyStars goes facilitator-led and B2B-friendly.

---

## Pimpi

**What:** Familyware. A family of tools that help kids turn intentions into action. Tools that serve the actual logistics and emotional texture of raising kids.

**Role:** Solo founder-engineer. Every role: product strategy, engineering, brand, design direction, copy, ops.

**Products:**
- **Pimpi Sparks** (live) — mission-based self-driven learning. "From spark to done." Orange #FF6D00.
- **Pimpi Card** (private alpha) — household stamp economy. "Every activity counts. Literally." Mint #00E676.
- **Parent dashboard** — shared across products.
- **Public site** — brand family hub.

**Design system:** Post-it card aesthetic — flat colors, adhesive strips, corner folds, slight rotation, crisp shadows. Six named colors (yellow, coral, mint, sky, lavender, peach). DM Sans typeface (400-800). Luminance-based dynamic text contrast. Streamline Freehand icons + custom SVGs. Mascot: flat mint-green illustration with sticker shadow.

**Protected vocabulary:** Spark, Streak, Proof of Done, Stamp, Pimpi. "Activities" not "chores." "Celebrate" not "redeem." Never translate, never synonym-swap.

**Core product principles:**
- The kid picks the goal (desire-led, not obligation-led)
- No guilt mechanics, no gamification tricks, no surveillance
- Stamps are never taken away
- Streaks celebrate showing up — never punish absence
- State what it does, don't sell what it could be
- Visual consistency is brand (post-it aesthetic everywhere)
- Scope is sacred — don't silently shrink or expand it

**Stack:** Next.js (App Router, RSC), React 19, Expo/React Native, Supabase (Postgres + Auth + RLS), Turborepo, pnpm, Tailwind v3, Framer Motion, react-hook-form + zod, next-intl, Mastra AI agents, LangSmith prompt hub, shadcn/ui. Three locales (EN/ES/NL) from day one.

**Audience:** Two people at once — the kid who needs clarity and the parent who needs trust.

---

## Kimbi Games (Palú Labs trade name)

**What:** Indie game studio under the Palú Labs ZZP umbrella. Creative control of all game IP. First shipped title: **Snackjes!** (2026) — a Dutch snackbar game for iOS, rebranded from the earlier Snackbak Automatiek concept.

**Site:** `kimbigames.com`.

**Current state:** Snackjes! shipped and live on the App Store via Palú Labs as EU DSA trader. v1.0 published April 2026, Koningsdag seasonal event planned April 25-28.

**Brand rule — logo color:** The Kimbi logo takes on the main color of each game it represents. On the studio site it cycles through the full color wheel as a demonstration; for any specific game context it renders in that game's primary color. Snackjes! orange `#E07406` is the anchor hue.

**Team credits (Snackjes!):**
- Design & Illustrations: Amélie R., Philipe R. (Kimbi Games)
- Idea, Development & Sounds: Palú Labs × Kimbi Games
- Special Thanks: Mónica Larios (Kimbi Games)
- Early Testers: Sander K., Maarten vd H., Beatriz L.

**Future:** Likely the first Palú Labs trade name to graduate to its own BV. Investor/buyer interest in the Snackjes IP is the triggering condition — at that point Kimbi Games BV becomes the publisher of record and Palú Labs drops out of the Snackjes credit lockup.

**Stack:** Expo/React Native (mobile), Next.js 15 + Tailwind v4 (website), Supabase (multiplayer Snackstrijd), Resend (contact), next-intl (EN/ES/NL).

---

## Palú Labs (ZZP handelsnaam)

**What:** Israel's personal incubator, publisher of record, and experimentation vehicle. ZZP (eenmanszaak) with handelsnamen, not a BV — decision 2026-04-13 to keep operations on ZZP rather than opening a werk-BV. The trader of record under EU DSA for all apps shipped on the 5-9 side.

**Trade names currently registered:**
- **Kimbi Games** — game studio. Creative control of game IP. Snackjes! shipped 2026. Investor-ready candidate for BV spin-off. See `kimbigames.com`.
- **Pimpi Apps** — self-service / product-led familyware. Sparks live, Card in alpha. Full section below.
- **StudyStars / The Library of Me** — EdTech, B2B/webinar direction. Full section above. Domains: `studystars.net`, `thelibraryofme.com`.
- **The Literary Sculptor** (`literarysculptor.com`) — compositional fiction-development toolkit using research-to-deliverable-to-insight pipeline pattern. Previously called The Book Doctor.

**Secondary:** Freelance engineering and advisory invoiced directly under Palú Labs (not under a specific trade name).

**Corporate context:**
- **Jolie Invest BV** — personal holding (in oprichting, 2026-04-13). Holds the 10% Tatoma BV stake. No werk-BV subsidiary yet.
- **Palú Labs** — ZZP handelsnaam, not incorporated. Any trade name above may migrate to its own werk-BV under Jolie Invest when investor interest, product liability, or co-founder dynamics make incorporation worthwhile. Kimbi Games is the most likely first spin-off.

**Open risks (conscious trade-off):**
- Personal liability for all Palú Labs trade-name products — not shielded by BV.
- Israel's personal name appears on KvK uittreksel as owner of "Palú Labs" handelsnaam. App stores, privacy policies, and formal legal docs surface the personal name even when public-facing branding says "Palú Labs" or one of the trade names.

**Role:** Proving ground + publishing vehicle + brand family home. Most experiments won't graduate. Track which ones generate energy and learning, not just which ones "succeed."

**Principle:** When a trade name shows investor signal, IP value, or operational complexity beyond ZZP absorption, it graduates to its own BV under Jolie Invest. When it doesn't, it parks quietly. No zombie projects.

---

## Cope

**What:** Personal AI infrastructure. An operational partner embedded in daily work across consulting, product development, parenting, finance, and side ventures.

**Role:** The connective tissue. Compresses the distance between intent and execution for someone running multiple high-context workstreams simultaneously.

**Architecture:**
- cope-agent MCP server — specialist agent delegation
- Specialist agents: ics-sync-agent, finance-agent, school-agent, email, Slack, Notion, Magister, YNAB, Omi, iCal, Miro, Playwright
- Hierarchical: orchestrator discovers capabilities via YAML manifest, spawns specialists who connect to domain-specific MCP servers
- Run history persisted at `~/.config/cope-agent/run-history/`
- Key tools: `get_run_history`, `get_last_run`, `discover_capability`, `spawn_specialist`

**Entry points:** CLI (primary), MCP server, HTTP API, Slack bot, macOS menubar app.

**LifeOS (Sanity CMS):** Goals (OKR hierarchy: yearly > quarterly > monthly > weekly), projects, tasks, inbox captures, open loops, decisions, notes. 21 tools for full CRUD.

**Usage scale:** 1000+ sessions since Jan 2026. Up to 55 sessions and 35K messages in a single day. Peak token consumption >1M tokens/day on Opus 4.6. Core part of the engineering team.

**Principle:** Context is the product. The value scales directly with accumulated context. Without it, it's just another chatbot.

---

*Review when a venture's status materially changes, a new venture appears, or an existing one is deprecated.*
