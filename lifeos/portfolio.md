# Portfolio

> All ventures as one interconnected system. Updated when a venture's status
> materially changes.

---

## How It Connects

```
Tatoma (clients) → patterns & revenue
       ↓
Palu Labs (experiments) → validates patterns
       ↓
StudyStars / Pimpi (products) → receives graduated experiments
       ↑
Cope (infrastructure) → orchestrates everything
```

Each venture feeds the others. A competency rubric from StudyStars becomes a Tatoma deliverable template. A Tatoma AI pipeline pattern becomes TLOM's content generation backbone. Cope's MCP integrations serve both personal life and product development.

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

## StudyStars / The Library of Me → Pimpi Learn

> **Pivot (2026-03-23):** TLOM's core concepts (competency-based learning,
> content pipeline, self-reflection) are being absorbed into the Pimpi universe
> as **Pimpi Learn**. Education consultant and sales/PM partner disengaged.
> Cohort/facilitator model dropped. Self-directed model adopted.

**What (original):** EdTech platform for pre-teens to young adults. Cohort-based curriculum where children design their own operating system for life through Socratic-cycle modules that produce student-authored artifacts, up to hardcover printed books.

**Role:** Solo founder-engineer. Owns every product, architecture, and brand decision.

**Team:**
- Education expert — module designer, gold-standard content author, AI draft reviewer (part-time 10-15h/week sprint, 5-8h ops)
- Sales/PM partner
- Contract facilitators — warm, organized, follow scripts (not pedagogical experts)

**Pedagogical model:** Competency-based, 7 competencies (Critical Thinking, Adaptability, Systems Thinking, etc.), three program tiers (Starter → Achiever → Champion), three rubric levels (Emerging → Developed → Advanced). Aligned with OECD Learning Compass 2030. Observe-map-design-test-codify cycle per module.

**Compliance architecture (load-bearing):** Five layers — outbound pre-reads, nudge-only WhatsApp, human-only live sessions, kid-owned workbooks, parent-gated AI processing. Solves COPPA/GDPR-K by structure. If a feature breaks this, the feature changes — not the architecture.

**Content pipeline:** Research exploration → content generation → quality validation → post-cohort insight discovery. Gold-standard pattern: expert writes one, AI generates the rest. Sequential dependency chain (pre-reads → scripts → workbooks → digests). Atomic progress, resumable by default.

**Stack:** Three Next.js 16 apps (parent-portal, facilitator companion, backoffice), pnpm + Turborepo monorepo, Supabase (PostgreSQL + Auth + RLS + pgvector), Claude Sonnet 4 for text, OpenAI for embeddings, Stripe for payments, Lulu/Blurb for print, WhatsApp Business API for nudges, Resend + React Email.

**Market:** Tiger parents and expat families in EMEA/LATAM. NL, UK, Mexico research.

**Sibling:** Pimpi. Different brand, different tech, same philosophy (kid agency, no guilt, artifacts over scores).

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

## Palu Labs

**What:** Israel's personal consultancy and experimentation vehicle under Jolie Invest BV. Freelance work, side projects, and ideas in incubation.

**Role:** Proving ground. Most experiments won't graduate. Track which ones generate energy and learning, not just which ones "succeed."

**Known experiments:**
- Snackbak — physics game with Dutch snack theming. Canvas, collision detection, 3D transforms, SVG optimization.
- The Book Doctor — compositional fiction-development toolkit using research-to-deliverable-to-insight pipeline pattern.
- Various freelance engineering work.

**Principle:** When an experiment shows product-market signal, it graduates to its own venture. When it doesn't, it dies quietly. No zombie projects.

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
