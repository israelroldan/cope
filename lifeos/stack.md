# Stack & Tools

> Tech preferences and infrastructure. What Israel builds with and why.

---

## Core Preferences

| Layer | Choice | Notes |
|-------|--------|-------|
| Language | TypeScript | Preferred over Python for everything |
| Runtime | Bun | Never Node.js for new projects |
| Package manager | bun | Never npm/yarn/pnpm for personal projects |
| Markup | Markdown | Never HTML for basic content |
| Framework | Next.js (App Router) | Server Components by default |
| Mobile | Expo / React Native | Cross-platform from day one |
| Styling | Tailwind CSS | v4 for Tatoma, v3 for Pimpi |
| Components | shadcn/ui + Radix UI | Source code, not library |
| Monorepo | Turborepo + pnpm workspaces | pnpm for monorepos, bun for standalone |
| Database | Supabase (PostgreSQL) | + Auth + RLS + storage + pgvector |
| Hosting | Vercel | Zero-config, edge functions |
| Auth | WorkOS AuthKit (Tatoma) / Supabase Auth (others) | SSO/SAML for enterprise |
| Email | Resend + React Email | Transactional |
| Payments | Stripe | Standard |
| AI | Vercel AI SDK + Mastra agents | Multi-provider |
| Prompt management | LangSmith Hub | Prompts live in the Hub, not codebase |
| Dev environment | Claude Code | Primary. 1000+ sessions, industrial scale |

---

## AI Stack

**Models:** Multi-provider via Vercel AI SDK. Anthropic (Claude), Google (Gemini), OpenAI, Groq, Mistral. Default to AI Gateway when on Vercel.

**Agent framework:** Mastra for domain agents. Domain agents live in consuming apps, not shared packages.

**Embeddings:** OpenAI (text-embedding-3-small) via pgvector in Supabase.

**Prompt strategy:** LangSmith Hub is the source of truth. Code fallbacks exist for resilience, not for editing. Change behavior in the UI, not in commits.

**MCP integrations:** Magister (school), Slack, Google Calendar, Gmail, YNAB, Omi (wearable lifelog), iCal, Miro, Playwright. cope-agent orchestrates via specialist delegation.

---

## Infrastructure

**Vercel:** Primary hosting for all web apps. PR previews with Supabase branch DBs. Production deploy via manual GitHub Action.

**Supabase:** Database, auth, storage, realtime, vector search. Service role client (`createSupabaseServiceClient()`) for admin ops. GitHub Integration for DB migrations.

**GitHub:** All repos. Worktree-based branch workflow. Greptile for automated PR review (auto-triggers on push, never manually).

**Jolie Invest BV infra:**
- Dokku server (dokku.palu.io) — being decommissioned
- Various experiments and services

---

## Development Patterns

**Monorepo conventions:**
- Shared packages: `@{project}/*` imports (never relative cross-package paths)
- App-specific code stays in `apps/[name]/src/`
- Shared code → `packages/` only when 2+ apps need it
- `createNextConfig()` factory for all Next.js configs
- Feature flags from auth session data

**Data operations:**
- Every query scoped to `organization_id` / `tenant_id` (multi-tenant projects)
- FK children deleted before parents, sequentially (never `Promise.all`)
- Check return values from external calls before proceeding
- `select('*')` when returning full type, `Partial<T>` for partial selects

**Frontend patterns:**
- Server Components by default, `'use client'` only for interactivity
- Optimistic updates (temp IDs, instant UI, server reconciliation)
- Empty states, error handling, and edge cases are part of the feature
- `cn()` utility for className merging (clsx + tailwind-merge)

**Build verification:**
- `pnpm build` (or `bun build`) is the source of truth
- Don't chase ESLint errors in packages where it's not configured
- Type honesty: don't lie to the type system

---

## Known Gotchas

- Local IP changes break Expo dev — check `EXPO_PUBLIC_API_URL` first
- `ignoreBuildErrors: true` in some Next.js configs means TS errors slip through
- Two cookie layers in some projects (httpOnly Supabase + simplified edge-runtime token)
- Supabase GitHub Integration auto-creates branch DBs for PR previews
- Greptile reviews auto-trigger on push (~7 min) — never trigger manually with @greptile
- All Supabase access through API routes — no `NEXT_PUBLIC_` Supabase vars

---

*Update when major stack changes happen (new framework version, new tool adoption, new provider).*
