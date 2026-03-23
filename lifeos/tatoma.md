# TATOMA — Product & Company Homebase

> The complete reference for Tatoma. Load this for any Tatoma-related
> conversation.
>
> Last updated: 2026-03-23

---

## What Tatoma Is

Dutch AI consultancy helping organizations adopt AI through structured
consulting engagements. "AI Transformation in a Box." Revenue-generating.
Israel's primary income source.

---

## People

| Person | Role | Priority | Context |
|--------|------|----------|---------|
| Israel Roldan | CTO, co-founder | — | Architecture, product delivery, sole engineer on platform |
| Sander Kok | Co-founder | VIP | Operations, domain partnerships, WBSO subsidy, marketing automation |
| Maarten van den Heuvel-Erp | Co-founder | VIP | Product, playbooks, client delivery, tech scans |
| Thomas Verhappen | Direct report | High | One tier below co-founders |

**Key channels:**
- #founders-talk — critical, always surface
- #project-gynzy — critical (client team Israel is joining)
- #product — high priority
- #-ai-rollout-project — high priority (Robin Radar)

**Communication norms:**
- Sander and Maarten messages get flagged first, always
- Co-founder comms: direct, transparent, assumes shared context
- Thomas: high priority but one tier below co-founders
- Greptile auto-reviews PRs on push (~7 min) — never trigger manually

---

## Active Clients

| Client | Status | Notes |
|--------|--------|-------|
| Robin Radar | Active | AI rollout project, #-ai-rollout-project channel |
| Gynzy | Active | Client team Israel is joining, #project-gynzy |
| ABN AMRO | Active | |
| Tijhuis Ingenieurs | Active | |

---

## The Platform

Multi-tenant SaaS built by a single developer (Israel). 10-app Next.js
monorepo with 8 shared packages.

### Apps

| App | Purpose | Status |
|-----|---------|--------|
| Academy | AI learning platform with interactive activities | Active |
| Prompts | Prompt library management | Shipped |
| Workbench | Strategic planning tools | Active |
| Client Portal | Engagement tracking | Active |
| Cards | AI workflows | Active |
| Landscape | Discovery/overview | **Deprecated** — minimum viable fixes only |

### Methodology

**Connected Intelligence Blueprint** — the consulting framework.
- Prompt libraries in tools
- Use-case generators
- Learning academies
- AI readiness assessments
- Certificates
- Strategic planning

The platform spans the full adoption lifecycle: assess → learn → build → measure.

### Architecture

**Stack:**
- Next.js 16, Supabase (Postgres + RLS + storage), WorkOS AuthKit (SAML/SSO)
- pnpm workspaces, Turborepo, Vercel, Tailwind CSS 4, shadcn/ui, Radix UI
- AI: Mastra agents, Vercel AI SDK, multi-provider (Anthropic, Google, Groq, Mistral, OpenAI)

**Auth model:**
- WorkOS handles authentication
- `createAppProxy()` in each app's `proxy.ts` enforces feature flags, roles, TATOMA membership
- `withAuth()` provides session data in server components/actions
- Feature flags from WorkOS session data

**Data model:**
- Multi-tenant via `organization_id` / `tenant_id`
- Service role client (`createSupabaseServiceClient()`) bypasses RLS for admin ops
- Domain modules in `@tatomahq/database` encapsulate query patterns

**i18n:**
- Cookie-based locale detection (`tatoma-locale`)
- Three locales: en, nl, da
- Shared messages in `@tatomahq/i18n`, app-specific in `apps/*/messages/`
- `createI18nRequestConfig()` factory per app
- Informal Dutch register always: je/jij/jouw, never u/uw

**Deployment:**
- Supabase GitHub Integration for DB migrations
- Vercel for app deployments
- PR previews auto-create Supabase branch DBs
- Production deploy via manual GitHub Action

### Key Patterns

| Pattern | Usage |
|---------|-------|
| `createAppProxy()` | Auth + feature flags + role gating per app |
| `getMainLayoutData()` | Standard layout data fetching |
| `PlatformLayout` | Shared layout component |
| `createFeedbackAction()` | Feedback forms per app |
| `createNextConfig()` | Next.js config factory from `@tatomahq/config/next` |
| `@tatomahq/*` imports | All cross-package imports (never relative paths) |
| `cn()` | className merging (clsx + tailwind-merge) |
| Domain modules | Query patterns in `@tatomahq/database` (18 modules) |

### Platform Rules (non-negotiable)

1. **Multi-tenant safety.** Every query, mutation, deletion scoped to `organization_id`. Before any data op: "What if this user belongs to multiple orgs?"
2. **Fail closed.** On error, throw — never return something that triggers destructive downstream action. Missing secrets? Fail. External API garbage? Fail.
3. **FK deletion order.** Delete children before parents, sequentially. Never `Promise.all` for dependent deletions. Map the constraint chain first.
4. **Use what exists.** 75+ UI components, 18 database domain modules, shared config factories. Search before writing. Import from `@tatomahq/*`.
5. **Minimize blast radius.** App-specific code stays in `apps/[name]/src/`. Shared code → `packages/` only when 2+ apps need it.
6. **Don't invest in the dying.** Landscape is deprecated. Fix what's broken, don't improve or refactor.
7. **Type honesty.** `select('*')` for full type, `Partial<T>` for partial selects.
8. **Verify external results.** WorkOS calls, Supabase storage, S2S responses — check return value before marking complete.
9. **Build verifies.** `pnpm build` is the source of truth. Don't chase ESLint errors in misconfigured packages.

### Implementation Checklist (every data operation)

- [ ] Scoped to `organization_id` / `tenant_id`?
- [ ] FK children deleted before parents?
- [ ] Deletions sequential, not `Promise.all`?
- [ ] External call return values checked?
- [ ] Storage paths listed dynamically (not hardcoded)?
- [ ] `created_by_user_id` set for system records?
- [ ] Max poll count / timeout on client-side polling?
- [ ] Errors logged explicitly?
- [ ] New env vars added to `.env.local.example` with `[required]`/`[optional]`?

---

## Corporate Structure

TATOMA BV is an operating company. Israel's equity flows through
Jolie Invest BV (holding).

**Equity situation:** Small position. Management agreement structure had
identified legal risks (reverse vesting cliffs, potential traps).
See `for-your-eyes-only.md` for honest assessment.

**WBSO:** R&D tax credit subsidy. Sander manages this.

---

## Revenue & Business Model

**Current model:** Pure consulting. Clients pay for engagements that include
platform access + hands-on support.

**Potential evolution (requires co-founder alignment):**

| Path | What | Dependency |
|------|------|-----------|
| Self-serve tier | Prompt Library as standalone SaaS (EUR 29-49/team/mo) | Sander + Maarten must agree |
| AI Playbook product | Distilled methodology as digital product (EUR 199-499) | Co-founder alignment, positions as lead-gen |
| White-label | Other consultancies license the platform | Longer-term, multi-tenant maturity needed |

None of these are in motion. All require explicit co-founder alignment first.

---

## What Tatoma Generates for the Portfolio

Tatoma is the pattern engine. Client work produces reusable patterns:

| Pattern from Tatoma | Where it transfers |
|--------------------|--------------------|
| AI content pipeline architecture | TLOM/Pimpi Learn content generation |
| Multi-tenant data model | Any future SaaS product |
| Prompt library design | Palu Labs experiments |
| Academy/learning platform patterns | Pimpi Learn, StudyStars |
| Compliance/governance frameworks | TLOM, any regulated product |
| Client AI adoption playbooks | Potential standalone product |

---

## Known Pain Points

- **Israel is the only engineer.** Every feature, every bug fix, every migration depends on him. No backup.
- **Landscape is deprecated** but still exists. Minimum viable maintenance.
- **ESLint not properly configured** in all packages. Don't chase lint errors — trust `pnpm build`.
- **Greptile reviews** take ~7 minutes after push. Never trigger manually.
- **i18n scope** may expand beyond en/nl/da. Cookie-based architecture supports it but each locale means new translation files in every app.
- **AI agent patterns evolving.** Mastra, Vercel AI SDK, provider mix — follow project conventions, update as preferences shift.

---

## Open Questions

- [ ] Self-serve tier: has this been discussed with Sander/Maarten?
- [ ] Equity: has the management agreement structure been resolved?
- [ ] WBSO: is the current R&D activity properly captured for the subsidy?
- [ ] Client pipeline: what's the current sales funnel status?
- [ ] Platform roadmap: what's the next major feature after current sprint?

---

*Load this at the start of any Tatoma conversation. Update when clients
change, platform ships major features, or team dynamics shift.*
