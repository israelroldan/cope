# Pimpi Sparks — Scaffolding Briefing

> Design spec for scaffolding the new Pimpi Sparks app (daily micro-learning).
> Approved: 2026-03-24.
>
> **Context:** Pimpi Sparks was previously called "Pimpi Learn." The old missions
> product "Pimpi Sparks" has been renamed to "Pimpi Stickies." That rename is
> assumed complete before this briefing is executed.
>
> **IMPORTANT — Terminology override:** The product doc at `lifeos/pimpi.md` has
> NOT yet been updated to reflect the Sparks/Stickies rename. Where this briefing
> conflicts with `pimpi.md`, **this briefing takes precedence.** Specifically:
> "Spark" now means "daily micro-learning moment" (not "mission/goal"), and the
> old missions product is now "Stickies."

---

## What We're Building

Pimpi Sparks — daily micro-learning for kids. One interesting topic per day,
beautifully presented as a scrollable mini-lesson. The kid opens the app, reads
today's Spark, and walks away with one thing worth retelling at dinner.

**Audience:** Existing Pimpi families (kids using Stickies/Card). Auth plugs into
the existing Supabase setup.

**Scope:** App shell + "Today's Spark" reading experience. No content generation
pipeline, no Deep Dives, no Library of Me. Those come later.

---

## Architecture

Two new apps in the monorepo at `/Users/israel/code/studystars/pimpi-monorepo`:

### `apps/pimpi-sparks` — Expo mobile app
- Expo SDK 54, React 19, React Native 0.81, Expo Router 6
- Bundle ID: `app.pimpi.sparks`
- New Architecture enabled (`newArchEnabled: true`)
- Metro config: monorepo watchFolders + pnpm resolution (follow pimpi-card pattern)
- Token storage: `expo-secure-store`
- Icons: Monicon with `@iconify-json/streamline-freehand` (follow pimpi-card pattern)

### `apps/sparks` — Next.js web app
- Next.js 16, React 19, App Router
- Kid-facing web Spark experience (shareable URLs, SEO-friendly)
- API routes serving both web and mobile clients
- Backoffice panel for content management

### `packages/sparks` — `@pimpi/sparks` shared package
- `DailySpark` TypeScript types and Zod schema (named `DailySpark` to avoid
  collision with the existing `Spark` type in `@pimpi/shared` which represents
  Stickies missions — that type will be renamed to `Sticky`/`Mission` later)
- Seed content (hardcoded JSON)
- Shared validation, content utilities, and "today" logic
- **No shared UI components** — Expo and Next.js use different rendering
  primitives. UI components live in each app:
  - `apps/pimpi-sparks/components/spark/` (React Native)
  - `apps/sparks/components/spark/` (React/HTML)
  - Only types, schema, data, and business logic are shared via the package

### Workspace dependencies

**Both apps:**
- `@pimpi/sparks` (new)
- `@pimpi/i18n`
- `@pimpi/icons` (icon name constants — actual rendering uses Monicon in Expo, direct imports in Next.js)
- `@pimpi/shared`
- `@pimpi/celebrations`
- `@pimpi/sounds`

**Next.js app additionally:**
- `@pimpi/database` (Supabase client factories, needed for auth and future content storage)

---

## Design System — Sparks Identity

Pimpi Sparks has its **own visual identity**, distinct from the post-it aesthetic
used in Stickies and Card. The vibe is **digital mini-textbook for kids** — flat,
vibrant, toy-like plastic solid shapes, but structured like a magazine spread.

### Aesthetic
- Flat solid color blocks, chunky rounded shapes, bold numbering
- Clean white/light background with vibrant color accents
- Editorial layout — flowing text sections, not cards or post-its
- No post-its, no rotation, no adhesive strips, no corner folds
- Still unmistakably Pimpi: playful, warm, never clinical

### Brand Color
- **Yellow** — Sparks primary (joins Orange for Stickies, Mint for Card)

### Callout Accent Colors
| Type | Color | Use |
|------|-------|-----|
| Primary / Header | Yellow | Spark header, topic number block |
| WOW fact | Coral | The retellable fact callout |
| Hook / Riddle | Sky blue | Opening question callout |
| Go Deeper | Lavender | Future exploration teaser |

### Typography
- DM Sans, weights 400-800
- Expo: bundle TTF files as assets, load via `expo-font` `useFonts()` hook, hold
  splash screen until loaded. The existing Expo apps have font loading deferred —
  this app should actually implement it.
- Next.js: use `next/font/google` with `DM_Sans`
- Editorial hierarchy: large bold titles, clear heading/body/callout distinction

### Icons
- Streamline-freehand via Monicon (Expo) / direct import (Next.js)
- Never emoji. Never Lucide. (Note: `pimpi-card` has a legacy `lucide-react-native`
  dependency — do not replicate it.)

### Purpose-Built Components
| Component | Purpose |
|-----------|---------|
| `SparkHeader` | Bold topic number + title + category badge, yellow block background |
| `SparkBody` | Flowing text sections, numbered progression, scrollable |
| `SparkImage` | Clean-framed photo/illustration, rounded corners, no shadows |
| `SparkCallout` | Colored accent box for hook, wow, go deeper. Color varies by type. |
| `SparkProgress` | Visual indicator of position in the lesson |

### Contrast
- Luminance-based dynamic text color (dark on light blocks, light on dark)

### Reference
- Inspired by children's textbook "interesting fact" spreads and the Grej of the
  Day book format (two-page spread per topic, numbered sections, callout boxes)
- NOT a classroom presentation — this is self-directed, scrollable, one-screen

---

## Spark Content Structure

Each Spark is a single scrollable page — a vertical mini-textbook spread.

### Content Flow

```
┌─────────────────────────────────┐
│  HEADER                         │
│  Spark #5 · Nature              │
│  ┌─────────────────────┐        │
│  │  5  │ Bricks         │       │
│  └─────────────────────┘        │
│                                 │
│  HOOK (sky blue callout)        │
│  "What's the oldest building    │
│   material still used today?"   │
│                                 │
│  STORY                          │
│  ┌─ 1 ─────────────────┐       │
│  │ Section heading      │       │
│  │ 2-3 sentences...     │       │
│  └──────────────────────┘       │
│  ┌─ image ──────────────┐       │
│  │                      │       │
│  └──────────────────────┘       │
│  ┌─ 2 ─────────────────┐       │
│  │ Section heading      │       │
│  │ 2-3 sentences...     │       │
│  └──────────────────────┘       │
│  ┌─ 3 ─────────────────┐       │
│  │ ...                  │       │
│  └──────────────────────┘       │
│                                 │
│  WOW (coral callout)            │
│  "The Great Wall of China       │
│   contains 3.8 billion bricks"  │
│                                 │
│  GO DEEPER (lavender callout)   │
│  "Want to know how they built   │
│   skyscrapers before steel?"    │
│                                 │
│  ACTIONS                        │
│  [ Save ] [ Share ]             │
└─────────────────────────────────┘
```

### Data Schema

```typescript
type Locale = 'en' | 'es' | 'nl'

type SparkTopic = 'science' | 'history' | 'nature' | 'culture' | 'tech'

interface StorySection {
  heading: string       // short section title
  text: string          // 2-3 sentences, one subtopic
  imagePrompt?: string  // for future image generation
}

// Named DailySpark to avoid collision with existing Spark type in @pimpi/shared
// (which represents Stickies missions and will be renamed later)
interface DailySpark {
  id: string
  slug: string                         // "why-octopuses-have-three-hearts"
  topic: SparkTopic
  number: number                       // sequential spark number
  ageRange: [number, number]           // e.g. [6, 12]
  publishDate: string                  // ISO date — determines "today's Spark"

  // Content — each field in all 3 locales
  hook: Record<Locale, string>         // opening riddle/question
  title: Record<Locale, string>        // "Bricks" / "Bakstenen" / "Ladrillos"
  story: Record<Locale, StorySection[]> // 3-4 numbered sections
  wow: Record<Locale, string>          // the one retellable fact
  goDeeper: Record<Locale, string>     // teaser for future Deep Dives

  status: 'draft' | 'ready' | 'published'
  createdAt: string
  updatedAt: string
}
```

### Seed Content

- 15-20 Sparks generated by Claude during scaffolding
- 3-4 per topic (science, history, nature, culture, tech)
- All three locales: EN, ES, NL
- Age range: 6-12
- Hardcoded in `packages/sparks/data/sparks.json`
- Validated by Zod schema at build time

### Content Voice (Pimpi guidelines)

- Short sentences. Action verbs. Zero condescension.
- "Here's the thing about bricks." not "Did you know that bricks are amazing?"
- Periods are intentional — matter-of-fact tone.
- The wow fact is always the star.

### "Today" Logic

- Simple date-based: match `publishDate` to today's date
- If no Spark scheduled for today, serve the next available published Spark
- No complex scheduling system for MVP

---

## Navigation

### Expo App (`apps/pimpi-sparks`)

Grouped route pattern (follows pimpi-card convention):

```
app/
├── _layout.tsx              # Root layout (fonts, i18n init, sounds)
├── (auth)/
│   ├── _layout.tsx
│   ├── welcome.tsx          # Intro screen
│   ├── login.tsx            # Parent email auth
│   ├── pin-login.tsx        # Kid PIN entry (returning users)
│   └── parent-handoff.tsx   # COPPA gate for under-13
├── (app)/
│   ├── _layout.tsx
│   ├── index.tsx            # Today's Spark (home)
│   ├── archive.tsx          # Saved Sparks list
│   └── profile.tsx          # Interests, preferences
└── (parent)/
    ├── _layout.tsx
    └── ...                  # Parent management screens
```

- Stack navigation, no bottom tabs for MVP
- Today screen is the landing / home screen

### Next.js App (`apps/sparks`)

```
app/
├── layout.tsx               # Root layout
├── (spark)/
│   ├── today/page.tsx       # Today's Spark (public, SSR, shareable)
│   ├── spark/[id]/page.tsx  # Individual Spark (public, SEO meta)
│   └── archive/page.tsx     # Saved Sparks (auth required)
├── (backoffice)/
│   ├── admin/page.tsx               # Dashboard
│   ├── admin/sparks/page.tsx        # List/filter all Sparks
│   ├── admin/sparks/[id]/page.tsx   # View/edit Spark detail
│   └── admin/sparks/new/page.tsx    # Create new Spark
└── api/
    ├── spark/
    │   ├── today/route.ts   # GET today's Spark
    │   ├── [id]/route.ts    # GET specific Spark
    │   └── save/route.ts    # POST save a Spark (auth required)
    └── sparks/route.ts      # GET list with filters
```

---

## Auth Integration

No new auth system. Plugs into existing Supabase setup.

### Expo App
- Auth flow follows `apps/pimpi-stickies` (formerly pimpi-sparks) patterns:
  - `welcome.tsx` — intro screen
  - `login.tsx` — parent email auth
  - `pin-login.tsx` — kid PIN entry (returning users)
  - `parent-handoff.tsx` — COPPA gate for under-13
- Token storage: `expo-secure-store` with `pimpi-sparks-*` key prefix
- `apiClient()` wrapper: auto Bearer token + refresh via `X-Refresh-Token` header
- API base from `EXPO_PUBLIC_API_URL` (points to `apps/sparks` Next.js)
- Reuse `@pimpi/shared` COPPA constants and age range logic

### Next.js App
- Supabase cookie auth following `apps/stickies` (formerly `web`) patterns
- `@pimpi/database` for Supabase client factories
- Public routes (no auth): `/today`, `/spark/[id]`
- Protected routes (kid auth): `/archive`
- Backoffice routes (parent/admin auth): `/admin/*`
- API: public GET for `today`/`[id]`, authenticated POST for `save`

---

## i18n

- Wired from day one using `@pimpi/i18n` shared package
- Three locales: EN, ES, NL
- Expo: `i18n-js` + `expo-localization` for device locale detection
- Expo: locale persisted in `expo-secure-store` (key: `pimpi-locale`)
- Next.js: `next-intl` (follow existing `apps/stickies` pattern)
- All Spark content is locale-aware (schema has `Record<Locale, string>`)
- All UI strings go through translation keys — no hardcoded strings

---

## Phased Build Plan

Six phases with clear checkpoints. Each phase should be reviewable before
proceeding to the next.

### Phase 1 — App Bootstrap

**Goal:** Both apps exist in the monorepo and start successfully.

- Create `apps/pimpi-sparks` (Expo) with:
  - `app.json` (name, slug, bundleIdentifier, newArchEnabled, plugins)
  - Metro config with monorepo watchFolders + pnpm resolution
  - Root layout with Expo Router
  - Monicon setup for streamline-freehand icons
- Create `apps/sparks` (Next.js) with:
  - `next.config.ts`
  - Root layout with App Router
  - Basic folder structure
- Create `packages/sparks` (`@pimpi/sparks`) with:
  - Spark TypeScript types
  - Zod validation schema
  - Package exports
- Wire workspace dependencies in both apps
- Add entries to `turbo.json`
- **Checkpoint:** `turbo dev` starts both apps. Blank screens, no errors.

### Phase 2 — Design System

**Goal:** Sparks visual identity is implemented and visible.

- Define Sparks theme (yellow primary, coral/sky/lavender accents)
- Load DM Sans font (Expo: `expo-font`, Next.js: `next/font`)
- Build purpose-built components:
  - `SparkHeader` — topic number + title + category badge
  - `SparkBody` — numbered sections, flowing text
  - `SparkImage` — framed image placeholder
  - `SparkCallout` — hook (sky), wow (coral), go deeper (lavender)
  - `SparkProgress` — position indicator
- UI components are platform-specific (see Architecture section):
  - Expo: `apps/pimpi-sparks/components/spark/`
  - Next.js: `apps/sparks/components/spark/`
  - Same component names, same props (from `@pimpi/sparks` types), different implementations
- **Checkpoint:** Render a static mock Spark page in both apps with all components visible.

### Phase 3 — Seed Content

**Goal:** Real Spark content exists and validates.

- Define Spark JSON schema in `@pimpi/sparks`
- Generate 15-20 Sparks with Claude:
  - 3-4 per topic (science, history, nature, culture, tech)
  - All fields: hook, title, story (3-4 sections), wow, goDeeper
  - All three locales: EN, ES, NL
  - Age range: 6-12
  - Sequential numbering, publish dates spread across upcoming days
- Save as `packages/sparks/data/sparks.json`
- Zod validation runs at build time
- **Checkpoint:** Import and log a Spark. Schema validation passes. Content reads well.

### Phase 4 — Spark Reading Experience

**Goal:** A kid can open the app and read today's Spark.

- Implement "today" logic (date-based Spark cycling)
- Expo — Today screen:
  - Fetch today's Spark
  - Render full scrollable page (header → hook → story → wow → go deeper)
  - i18n: renders in device locale
- Expo — Archive screen:
  - List of saved Sparks (placeholder, requires auth in Phase 5)
- Next.js — `/today`:
  - SSR today's Spark
  - SEO meta tags, shareable URL
- Next.js — `/spark/[id]`:
  - Individual Spark page, shareable
  - Open Graph meta for social sharing
- Next.js — API routes:
  - `GET /api/spark/today`
  - `GET /api/spark/[id]`
  - `GET /api/sparks` (list with topic/status filters)
- i18n wiring in both apps
- **Checkpoint:** Open both apps. See today's Spark. Switch languages. Open a share link in a browser.

### Phase 5 — Auth Integration

**Goal:** Kids can log in and save Sparks.

- Expo — Auth flow:
  - Welcome → login → parent-handoff screens
  - Follow pimpi-stickies patterns (token storage, COPPA gate, PIN login)
  - `apiClient()` with auto auth headers
- Next.js — Auth:
  - Supabase cookie auth following `apps/stickies` pattern
  - Public vs protected route split
- Save functionality:
  - New `saved_sparks` Supabase table (user_id, spark_id, saved_at) — requires a
    migration. This is the one Supabase schema change in this scaffold.
  - `POST /api/spark/save` (authenticated)
  - `DELETE /api/spark/save` (unsave)
  - Save button on Spark page
  - Saved state indicator
- Archive (authenticated):
  - List saved Sparks (query `saved_sparks` table, resolve content from seed JSON)
  - Tap to re-read
- **Checkpoint:** Log in on both platforms. Save a Spark. See it in archive.

### Phase 6 — Backoffice

**Goal:** Content can be managed through a web admin panel.

- Next.js — `/admin`:
  - Dashboard: total Sparks, by status (draft/ready/published), by topic
- `/admin/sparks`:
  - Table: all Sparks, filterable by topic/status/date
  - Shows title, topic, status, publish date
- `/admin/sparks/[id]`:
  - Full Spark detail view (renders same as kid view)
  - Edit form (for MVP: renders editable fields, outputs JSON via copy-to-clipboard
    button for pasting into the seed file)
- `/admin/sparks/new`:
  - Create form with all fields
  - Live preview of how the Spark will look (renders the same SparkPage component)
  - "Copy JSON" button that copies the structured Spark JSON to clipboard
- Parent/admin auth required for all backoffice routes
- **Checkpoint:** Admin can browse all Sparks, view details, see content status.

---

## Out of Scope (explicitly)

- Content generation pipeline (AI-powered Spark creation at scale)
- Deep Dives (future feature, teased by "go deeper")
- Library of Me (future feature)
- Push notifications
- Offline support
- App Store submission
- The rename of existing Pimpi Sparks → Pimpi Stickies (separate task)
- Updates to `lifeos/pimpi.md` protected vocabulary (separate task)

---

## Environment Variables

### Expo App (`apps/pimpi-sparks`)
```
EXPO_PUBLIC_API_URL=http://localhost:3100   # Points to apps/sparks Next.js
```

### Next.js App (`apps/sparks`)
```
PORT=3100                                   # Avoid collision with other apps
NEXT_PUBLIC_SUPABASE_URL=                   # From existing Supabase project
NEXT_PUBLIC_SUPABASE_ANON_KEY=              # From existing Supabase project
SUPABASE_SERVICE_ROLE_KEY=                  # For backoffice admin operations
```

Create `.env.example` in both apps with these variables. Add `.env*.local` to
`.gitignore` (should already be there from monorepo root).

---

## Turbo Configuration

Add to `turbo.json` tasks — no custom entries needed, the existing generic
`build`, `dev`, `lint`, `validate` tasks apply. Ensure both new apps are
picked up by the `apps/*` workspace glob.

If a Zod validation script is added to `@pimpi/sparks` (Phase 3), add it as
a `validate` script in that package's `package.json` so `turbo validate` runs it.

Match Next.js version to what the other apps use (`next@16.1.6` at time of
writing) to avoid turborepo cache mismatches.

---

## Dependencies & Prerequisites

Before executing this briefing:

1. **Rename complete:** existing `apps/pimpi-sparks` has been renamed to `apps/pimpi-stickies`
2. **Monorepo access:** working at `/Users/israel/code/studystars/pimpi-monorepo`
3. **Supabase running:** existing auth and database accessible
4. **Reference apps available as patterns:**
   - Expo: `apps/pimpi-stickies` (formerly pimpi-sparks) — auth flow, token storage, i18n, apiClient
   - Expo: `apps/pimpi-card` — Monicon icon setup, Metro config, theme pattern
   - Next.js: `apps/stickies` (formerly web) — Supabase auth, next-intl, @pimpi/database usage

---

## Protected Vocabulary (Sparks-specific)

| Term | Meaning | Never say |
|------|---------|-----------|
| Spark | A daily micro-learning moment | Lesson, quiz, grej, flash card |
| Hook | The opening question/riddle | Intro, warm-up |
| Wow | The retellable fact | Fun fact, trivia |
| Go Deeper | Teaser for future exploration | Homework, assignment |
| Archive | Kid's saved Sparks collection | Library, history |

---

*This briefing is designed to be handed to Claude Code in the pimpi-monorepo
working directory. Execute phases sequentially, reviewing at each checkpoint.*
