# Pimpi Card — MVP Build Prompt for Claude Code

Paste everything below into Claude Code.

---

## Prompt

I need you to build the MVP for **Pimpi Card**, a household reward economy app for kids. It's part of the StudyStars / Pimpi ecosystem. I'll give you the brand brief, the ecosystem tech stack, and what I need built. Your job is to produce a full-system MVP spec and then build it.

### Brand Brief (v1.1)

Pimpi Card is a household stamp wallet where kids earn stamps by doing chores and spend them on parent-created rewards. It runs on two layers:

**Layer 1 — Chores (Earn Now):**
Parents assign chores with stamp values. Kids complete them, earn stamps, save toward a goal, and spend their card on rewards. Parent approves and fulfils.

**Layer 2 — Stamp Cards (Build Over Time):**
Achievement trackers tied to categories of chores. Each Stamp Card has a theme (e.g. "Tidy Tiger") and a series of escalating milestones (1 → 5 → 15 → 30 → 50). Every qualifying chore completion counts toward the card. Hit a milestone → earn bonus stamps → stamp fills in with a date. No deadlines, no streaks, no guilt. Just cumulative progress. Inspired by Animal Crossing's Nook Miles achievement system.

**Spending:** One unified wallet. Kids browse parent-created rewards, pin a goal, watch progress fill, request to spend their card. Parent approves and fulfils in real life.

**Protected vocabulary — use these terms exactly:**
- **Stamp** (never "point", "coin", "credit")
- **Pimpi Card** (always capitalised, always both words)
- **Spend your card** (never "redeem", "cash out")
- **Chore** (never "quest", "mission")
- **Reward** (parent-created, real, meaningful)
- **Goal** (a pinned reward to save toward)
- **Fulfil** (parent delivers after approving)
- **Stamp Card** (never "badge", "achievement", "challenge")
- **Milestone** (threshold on a Stamp Card)
- **Collection** (set of Stamp Cards, never "trophy case")

**Age scaling:**
- Ages 4–7: Parent does everything. Big animations. Simple rewards. Stamp Cards have ~3 milestones, experienced as surprise bonus moments.
- Ages 8–12: Kids browse rewards independently, pin goals, track progress, initiate spend requests. Stamp Cards are a source of pride.
- Ages 13–17: Feels like their wallet, not a parent's chart. Clean, not cutesy. Higher-value everything.

**Design language:** Post-it aesthetic, bold flat colours, handmade warmth. Physical card as hero UI. Stamp grid motif. Wallet/pocket metaphor. Amber (`#F5A623`) as primary accent.

**Colour palette:**
- Stamp amber: `#F5A623` (primary accent, filled stamps)
- Card cream: `#FAEEDA` (card background, surfaces)
- Spent: `#E8941A` (deducted stamps)
- Earned: `#1D9E75` (incoming stamps)
- Redemption: `#D85A30` (reward request/fulfilment)
- Background: `#F4F3EF` (app canvas)
- Milestone: `#4A90D9` (Stamp Card milestone bonus)

**Tone:** Warm, matter-of-fact, concrete. Never sounds like a bank, fintech, or chore chart. Satisfying, not addictive.

### Ecosystem Tech Stack (match this)

The existing Pimpi ecosystem uses:
- **Frontend (web):** Next.js 14 + shadcn/ui + Tailwind CSS + TypeScript
- **Kid app:** Expo / React Native (mobile)
- **Database:** Supabase (PostgreSQL)
- **Hosting:** Vercel
- **Auth:** Supabase Auth (Apple Sign-In + email/password)
- **Payments:** Stripe (not needed for MVP)
- **Compliance:** COPPA by design — no data collection from minors, parent consent per-instance

Key architectural patterns from the ecosystem:
- Optimistic updates with temp IDs on client, server reconciliation async
- Offline-first with graceful reconnect
- Content-code separation
- User actions (completions) are never reverted on network failure
- Data isolation by user / household

### What to Build (Full System MVP)

**Three surfaces:**

1. **Kid mobile app** (Expo / React Native)
   - Home: see stamp balance, active chores, pinned goal progress
   - Chore list: available chores with stamp values, mark as done
   - Stamp Card collection: browse cards, see milestone progress, filled stamps with dates
   - Rewards: browse catalog, pin a goal, request to spend your card
   - Stamp earning moment: satisfying animation when stamps land

2. **Parent web dashboard** (Next.js 14 + shadcn/ui + Tailwind)
   - Household setup: add kids, set age group
   - Chore manager: create/edit chores, set stamp values, assign to kids
   - Reward manager: create/edit rewards, set stamp cost
   - Stamp Card manager: create/edit Stamp Cards, define milestones and bonus values, link to chore categories
   - Approval queue: approve chore completions, approve spend requests, fulfil rewards
   - Economy overview: stamps earned/spent per kid, active goals

3. **Backend / API** (Supabase)
   - Database schema for: households, parents, kids, chores, chore completions, stamps (ledger), rewards, goals, spend requests, stamp cards, stamp card progress, milestones
   - Row-level security policies for household data isolation
   - Real-time subscriptions for chore approvals and stamp updates
   - Stamp ledger: every stamp movement is a transaction (earned from chore, earned from milestone bonus, spent on reward)

**Localisation:** Structure for en/es/nl from day one (i18n setup), English content only for MVP.

**Don't build yet:** Push notifications, streak mechanics, social features, Stripe integration, print features, AI features.

### How to Proceed

1. First, produce the full technical spec: data model, API routes, screen inventory, component tree. Show me for review.
2. Then scaffold the monorepo with all three surfaces.
3. Then build iteratively, starting with the data layer, then parent dashboard (so we can seed data), then kid app.
