# Studio Tools Catalog — Feature Specification

**Product**: TATOMA Studio (Academy Learn page)
**Author**: Israel (TATOMA) — spec refined with competitive research synthesis
**Date**: 2026-03-30
**Status**: Draft v2 — replaces initial GitHub issue spec

---

## 1. Problem statement

The current Tool Catalog is a flat grid of cards showing tool name, vendor, one category tag, and an AI maturity label (Low/Medium/High). It has three critical failures:

1. **No discovery experience.** Tools are dumped in a grid with only category chip filters. There's no search, no CIB domain navigation, no "recommended for you," no way to explore by work context. Employees scroll through 55+ identical-looking cards with no guidance.

2. **Cards carry almost no information.** Each card shows a letter avatar (no real logos), the tool name, the vendor name, a single category badge, and an AI maturity color label. There's no description of what the tool does with AI, no learning content hooks, no org adoption context beyond a small "Used by your org" tag on some cards, and no progress indicators.

3. **No connection to learning.** The catalog exists in isolation. There's no link from a tool to Academy courses, no proficiency tracking, no reason for an employee to come back. It's a reference list, not a learning surface.

The catalog needs to become a place where employees discover what AI can do in the tools they already use, and have a clear path to learn more.

---

## 2. Design principles

These five principles should guide every design decision:

**Adoption over discovery.** Employees don't need to find 4,000 tools — they need to understand the 15–30 tools their org uses and what AI can do inside them. Default to "My Org's Stack," not "Explore everything."

**Work context first.** Navigate by CIB domain (how employees think about their work), not by tool type (how developers categorize software). "How can AI help with my customer contracts?" comes before "show me CRM tools."

**Bidirectional learning.** Every tool page surfaces related courses. Every course surfaces related tools. The tool catalog and Academy are two views of the same learning journey, not separate features.

**Show, don't require clicks.** Card-level information density matters. An employee scanning the grid should learn something useful from every card without clicking into it. The current cards waste space.

**Professional, not gamified.** Progress tracking uses "proficiency levels" and clean progress bars, not XP, confetti, or cartoon badges. Frame everything as career development.

---

## 3. What changes from v1

| Aspect | Current (v1) | Target (v2) |
|---|---|---|
| **Card content** | Letter avatar, name, vendor, 1 category tag, AI maturity label | Real logo, name, AI-focused description, CIB domain, org badge, course count, proficiency bar, tags |
| **Navigation** | Category chip filters only | CIB domain tiles as primary nav + search + filters panel + "My Stack" / "Explore" toggle |
| **Taxonomy** | Tool-type categories (Analytics & BI, Collaboration…) | CIB domains as primary axis, tool types as secondary filter |
| **Org context** | Small "Used by your org" tag on some cards | Default view shows org's tools; "Explore all" as secondary; team adoption counts on detail pages |
| **Resources & learning** | None | Curated external resources with "I have tried this" tracking; full Academy course integration deferred to v2+ |
| **Detail pages** | None visible | Full tool profile with AI capabilities, curated resources, use cases, comments, comparison |
| **Search** | None | Full-text with typeahead, grouped by CIB domain |
| **Views** | Grid only | Grid (default) + List (dense/comparison mode) |

---

## 4. Information architecture

### 4.1 Page structure

```
Academy Learn page
├── Courses (existing)
└── Tools Catalog (new — tabbed or sectioned)
    ├── Hero / intro area
    │   ├── Title + subtitle
    │   ├── Search bar (prominent)
    │   └── "My Org's Stack" / "Explore All Tools" toggle
    ├── CIB Domain navigation (6 domain tiles or tabs)
    ├── Filter panel (left sidebar on desktop, slide-out on mobile)
    ├── Results area
    │   ├── Active filter pills + result count
    │   ├── Sort dropdown + Grid/List view toggle
    │   └── Tool cards
    └── Tool Detail Page (navigated to from card click)
```

### 4.2 CIB domain navigation

The six CIB domains are the primary navigation axis. They appear as visual tiles (with icons and tool counts) above the grid, replacing the current flat category chips as the entry point.

| CIB Domain | Icon suggestion | Example tools |
|---|---|---|
| Workforce & Skills | 👥 | LinkedIn, Workday, BambooHR |
| Projects & Innovation | 🚀 | Notion, Jira, Miro, GitHub Copilot |
| Customers & Contracts | 🤝 | Salesforce, HubSpot, DocuSign |
| Communications & Collaboration | 💬 | Slack, Teams, Zoom, Grammarly |
| Meetings & Engagements | 📅 | Otter.ai, Fireflies, Calendly |
| Insights & Analytics | 📊 | Tableau, Power BI, Looker, ChatGPT |

Clicking a domain tile filters the grid to tools in that domain. The current tool-type categories (Analytics & BI, Collaboration, CRM, etc.) become a secondary filter within each domain view.

**Why this change:** Employees asking "How can AI help me with my customer work?" think in domain terms. The current category-first taxonomy (Analytics & BI, Collaboration, Communication…) is a developer's view of the world, not an employee's.

### 4.3 "My Org's Stack" vs. "Explore All Tools"

A prominent toggle at the top of the catalog switches between two views:

- **My Org's Stack** (default): Shows only tools linked to the employee's org via `landscape_tools`. Each card shows the employee's personal learning progress. This is the daily-use view.
- **Explore All Tools**: Shows the full `landscape_tools_catalog` (55+ tools). Tools the org already uses get a "Used by your org" badge. Tools not yet adopted show "Request access" instead.

**Why default to org stack:** The competitive research and Mathijs feedback both confirm that employees want to work with tools they already have. Showing 55+ tools by default creates the same choice paralysis that consumer directories suffer from.

---

## 5. Tool card design

### 5.1 Grid card (default browse view)

Each card should contain these elements, in this visual hierarchy:

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  [Tool Logo]  Tool Name                   [Bookmark ♡]   │
│   48×48       Vendor                                     │
│                                                          │
│  One-line AI capability description (max 120 chars)      │
│  "AI-powered meeting transcription and action items"     │
│                                                          │
│  ┌─────────────────┐  ┌──────────────────────┐           │
│  │ 🏢 Used by org  │  │ 📊 Insights & Analytics │        │
│  └─────────────────┘  └──────────────────────┘           │
│                                                          │
│  📎 5 resources   💡 Medium AI maturity                  │
│                                                          │
│  2 of 5 explored                                         │
│  ─── or ───                                              │
│  [Explore resources →]                                   │
│                                                          │
│  #transcription  #automation  #productivity              │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Element-by-element rationale:**

- **Tool logo** (48×48, real image): The current letter avatars make every card look the same. Real logos provide instant visual recognition. Fall back to a styled letter avatar only when no logo is available in the catalog data.
- **Tool name + vendor**: Keep from v1, but name is the primary visual weight (H3-level), vendor is secondary text.
- **AI capability description** (new, max 120 chars): This is the single most important addition. It answers "what can AI do in this tool?" — not what the tool itself does (employees already know what Slack is). Example: "AI-generated channel summaries, thread digests, and search answers" rather than "Team messaging platform."
- **"Used by your org" badge** (🏢): Promoted from the small tag in v1 to a prominent badge. In "Explore All" view, this is replaced with "Request access" for non-adopted tools.
- **CIB domain badge**: Replaces the current single category tag. Shows which work domain this tool belongs to.
- **Resource count** (📎): Shows "5 resources" — curated links to external articles, videos, and vendor docs. Replaces the "course count" planned for when Academy learning content exists (v2+).
- **AI maturity indicator** (💡): Retained from v1 but redesigned. Instead of just a color-coded "Medium" label (which is meaningless without context), show "Low / Medium / High AI maturity" with a subtle visual treatment. Consider a tooltip or small info icon explaining what the levels mean.
- **Exploration counter**: Shows "2 of 5 explored" — a simple count of resources the employee has marked as "I have tried this." If none explored, shows an "Explore resources →" CTA instead. This is a lightweight proxy for learning progress in v1, replacing the full proficiency model (deferred to v2+).
- **Hashtag tags** (max 3): Clickable, for cross-category discovery. Keep from v1 but make them functional (clicking filters the catalog).

### 5.2 List card (dense comparison view)

For employees evaluating tools side by side, a denser row format accessible via a Grid/List toggle:

| Logo | Tool Name | CIB Domain | AI Maturity | Explored | Org Status | Resources | Actions |
|---|---|---|---|---|---|---|---|
| [logo] | Power BI | Insights & Analytics | Medium | 4 of 5 | 12 teams | 5 | Compare · View |
| [logo] | Tableau | Insights & Analytics | High | — | 0 teams | 3 | Request · View |

This view surfaces all comparison-relevant data without clicking into detail pages.

### 5.3 "Common in your industry" badge

Retained from v1 concept but made more specific. Instead of a generic badge, show: "Used by 73% of Professional Services orgs" (based on aggregated `landscape_tools` data across orgs in the same `context_org_profiles.industry`). This appears on tool cards in the "Explore All" view and on detail pages.

---

## 6. Tool detail page

Clicking a tool card opens a full detail page. This is entirely new — v1 has no detail view.

### 6.1 Page structure

**Hero section**
- Tool logo (large, 96×96), tool name (H1), vendor
- One-line AI capability summary
- CIB domain badge(s) — a tool can belong to multiple domains
- Org status: "Used by 8 teams in your org" or "Not yet adopted"
- AI maturity level with explanation (not just "Medium" — explain what it means for this tool)
- Primary CTA: "Explore resources" / "Continue exploring" / "Request access"

**Section 1 — AI capabilities in this tool**
A structured overview of specifically what AI features this tool offers. Not a generic product description — TATOMA users already know what Slack does; they need to know what Slack's AI features do.

Includes:
- 3–5 "Ideal for" use cases in gerund form (e.g., "Automating meeting summaries and action items," "Generating draft presentations from notes")
- Balanced Pros (3–4) and Cons (2–3) focused on the AI capabilities specifically — editorial honesty builds trust
- AI maturity assessment: what's production-ready, what's in beta, what's limited

**Section 2 — Resources**
Curated external links to help employees learn how to make the most of this tool's AI features. This is the v1 replacement for full Academy course integration (deferred to v2+).

- TATOMA-curated resources per tool: vendor docs, YouTube tutorials, blog posts, help center guides (3–5 per tool, stored in `landscape_tools_catalog`)
- Org-level overrides: admins can add, remove, or reorder resources for their org via Admin/Workbench (stored per-org, overriding the global defaults)
- User-suggested resources: employees can submit links they found useful — these go into a moderation queue for admin approval
- Each resource shows: title, source (e.g., "Microsoft Learn", "YouTube"), type icon (📄 article, 🎥 video, 📘 docs), and an "I have tried this" button
- The "I have tried this" toggle tracks which resources an employee has engaged with — this drives the "2 of 5 explored" counter on tool cards
- Resources are the primary learning surface in v1 — they replace Academy courses until TATOMA's own learning content is ready

**Section 3 — Use cases**
Tools connect to personal use cases from the Academy discovery feature. This shows employees which AI use cases this tool can support.

- Use cases linked to this tool from the Academy discovery feature's use case library
- Each use case shows: title, brief description, and CIB domain
- Employees can mark use cases they've tried ("I've done this") — contributing to their personal use case portfolio in the Academy
- This creates a feedback loop: the tool catalog shows what's possible, the discovery feature helps employees act on it

**Section 4 — Comments & tips**
Lightweight community features for v1.

- Employees can leave comments on tool pages — tips, experiences, questions
- No formal voting system in v1 (deferred) — just a chronological comment thread
- Comments are org-scoped (only visible within the same organisation)

**Section 5 — Evaluate & compare**
- "Compare with alternatives" CTA: pre-filtered to tools in the same CIB domain
- Pricing / licensing information
- Security and compliance notes (if relevant)
- "Common in your industry" benchmark data

**Sidebar**
- "Popular in your org" — related tools other teams use
- "Also used by [Team name]" — social proof
- "Recommend to a colleague" secondary CTA
- "Suggest a resource" CTA — lets employees submit useful links

---

## 7. Search and filtering

### 7.1 Search

Full-text search across tool names, vendor names, AI capability descriptions, use-case examples, and tags. This is the primary discovery method for employees who already know what they're looking for.

Requirements:
- Prominent search bar at the top of the catalog (not hidden behind filters)
- Typeahead with results grouped by CIB domain
- Search must be reliable — this is where Futurepedia and Insidr.ai both fail, and it's the most basic expectation

### 7.2 Filter panel

Left-panel on desktop, slide-out on mobile. Real-time result counts on each filter option.

| Filter | Type | Options |
|---|---|---|
| CIB Domain | Multi-select chips | 6 domains |
| Tool Type | Multi-select chips | Writing, Image, Video, Data, Automation, Communication, Code, Project Mgmt |
| Org Status | Radio buttons | My org uses · Available to request · All tools |
| AI Maturity | Multi-select | Low · Medium · High |
| My Progress | Multi-select | Not explored · Partially explored · Fully explored |
| Resources | Toggle | Has curated resources |

Active filters appear as removable pills above results (standard enterprise pattern).

### 7.3 Sort options

- **Recommended** (default, personalized): Org-adopted tools first, then by CIB domain relevance to the employee's role
- **Most adopted in org**: By number of teams using the tool
- **Most resources**: Tools with the most curated resources
- **AI maturity**: High → Low
- **Recently added**: Newest in the catalog
- **Alphabetical**

---

## 8. Resources, use cases & progress tracking (v1)

In v1, TATOMA doesn't yet have its own Academy learning content per tool. Instead, the catalog provides curated external resources and connects tools to the Academy discovery feature's use cases. Full bidirectional learning integration with Academy courses, proficiency levels, and certification is deferred to v2+.

### 8.1 Curated resources model

Each tool has a set of curated external resources — articles, videos, vendor docs, and guides that help employees learn to use the tool's AI features.

**Three layers of resource management:**

1. **Global defaults** (TATOMA-managed): 3–5 resources per tool, curated by TATOMA and stored on `landscape_tools_catalog`. These are the baseline for all orgs.
2. **Org overrides** (Admin/Workbench-managed): Org admins can add, remove, reorder, or replace resources for their org. Stored per-org, overriding the global defaults. Example: an org might add their internal "How we use Power BI" guide.
3. **User suggestions** (moderated): Employees can submit links they found useful via a "Suggest a resource" button on tool detail pages. These go into a moderation queue visible in Admin/Workbench. Approved suggestions become org-level resources.

**Resource data model:**

| Field | Description |
|---|---|
| `title` | Resource title (e.g., "Getting Started with Slack AI") |
| `url` | External link |
| `source` | Source name (e.g., "Microsoft Learn", "YouTube", "Vendor Docs") |
| `type` | `article` / `video` / `docs` / `guide` / `tutorial` |
| `scope` | `global` (TATOMA default) or `org` (org override) |
| `order` | Display order |

### 8.2 "I have tried this" tracking

Each resource on a tool's detail page has an "I have tried this" toggle button. When an employee marks a resource, it:
- Increments their personal exploration count for that tool
- Drives the card-level counter: "2 of 5 explored"
- Persists across sessions (stored per user per resource)

This is a lightweight proxy for learning progress. It's honest about what it tracks — the employee self-reports having engaged with the resource, not that they've mastered anything. It sets the foundation for the full proficiency model in v2+ without over-promising.

**Card-level display:**
- If no resources explored: "Explore resources →" CTA
- If partially explored: "2 of 5 explored"
- If all explored: "✓ All resources explored"

### 8.3 Tool ↔ Use case connection

Tools connect to the Academy discovery feature's personal use cases. This is the bridge between "what tools exist" (catalog) and "what can I do with AI" (discovery).

**How it works:**
- Each tool in the catalog can be linked to one or more use cases from the Academy discovery feature
- The tool detail page shows linked use cases under a "Use cases" section
- Employees can mark use cases they've tried ("I've done this") — contributing to their personal use case portfolio in the Academy
- The connection is bidirectional: the discovery feature can also surface which tools support a given use case

**Data model:** A join table linking `landscape_tools_catalog.id` to use case IDs in the Academy discovery feature.

### 8.4 Comments on tools

Employees can leave comments on tool pages — tips, experiences, questions, or links to resources they found useful. Comments are:
- Org-scoped (visible only within the same organisation)
- Chronological (no voting or ranking in v1)
- Moderated by org admins if needed

This is a lightweight v1 community layer. Formal peer use-case examples with structured templates, helpfulness voting, and CIB domain filtering are deferred to v2+.

### 8.5 What's deferred to v2+ (full learning integration)

The following features require TATOMA's own Academy learning content to exist per tool:

- **Bidirectional Academy course integration**: Tool pages surface Academy courses; course pages link back to tools
- **Proficiency model** (Aware → Familiar → Proficient → Expert) with weighted composite scoring
- **Academy-authored content per tool**: Guided introduction courses, deep-dive courses, assessments, certifications
- **Learning path sequencing**: Recommended progression through content types
- **Team proficiency dashboards**: "Marketing team: 72% Proficient on Canva AI"
- **Industry benchmarking on proficiency**: "Your org's average AI proficiency vs. industry"

---

## 9. Request-a-tool flow

Three tiers based on tool status:

**Tier 1 — Self-serve** (tool already licensed by org)
Employee clicks "Start learning" → immediately accesses Academy content. Zero friction.

**Tier 2 — Lightweight request** (tool in catalog but not adopted by org)
- Pre-populated form: employee name, team, CIB domain (auto-filled from the catalog page they navigated from), brief use case
- 2-click submission
- Creates a `landscape_tool_review_requests` entry
- Status tracking: employee can see "Requested" / "Under review" / "Approved" / "Declined" on the tool card

**Tier 3 — Suggest a new tool** (tool not in the catalog at all)
- "Request a tool" button (already exists in v1 top-right)
- Form: tool name, vendor, URL, which CIB domain it fits, why the employee wants it
- Creates a `landscape_tool_review_requests` entry for admin review
- Admin can then add the tool to the catalog if appropriate

---

## 10. Personalisation layers (v1 scope)

For the initial build, implement two of the four personalisation layers:

### Layer 1 — Organisation (v1)
- "My Org's Stack" default view showing tools from the org's `landscape_tools`
- Industry context for "Common in your industry" badges (from `context_org_profiles.industry`)

### Layer 2 — Individual (v1, lightweight)
- "I have tried this" resource exploration tracking per tool
- Bookmark/favorites for personal collections
- Comments on tool pages
- "Continue where you left off" on the catalog homepage

### Deferred to v2
- **Team/Department layer**: Team-specific tool recommendations, team proficiency dashboards
- **Role layer**: Role-based default CIB domain weighting, recommended learning paths by job title
- **Onboarding flow**: 3-step personalisation wizard on first visit
- **Full proficiency tracking**: Aware → Familiar → Proficient → Expert (requires Academy course content)

---

## 11. Technical notes

### Data model connections

- `landscape_tools_catalog` — the global tool reference (55+ tools, TATOMA-managed). Must be enriched with:
  - `ai_description` (new field): 120-char AI-focused description for card display
  - `ai_capabilities` (new field or section): structured AI feature list for detail pages
  - `ideal_for` (new field): 3–5 use cases in gerund form
  - `pros_cons` (new field): balanced editorial assessment of AI capabilities
  - `logo_url` (ensure populated): real logos, not letter fallbacks
- `landscape_tools` — links catalog entries to an org via `tool_catalog_id` FK
- `context_org_profiles.industry` — used for "Common in your industry" aggregation
- `landscape_tool_review_requests` — existing table for tool request workflow
- **New: `landscape_tool_resources`** — curated external resources per tool:
  - `id`, `tool_catalog_id` (FK), `org_id` (nullable — null = global default, set = org override)
  - `title`, `url`, `source`, `type` (article/video/docs/guide/tutorial), `order`
  - `suggested_by` (nullable — set when user-suggested, null when admin-curated)
  - `status` (approved/pending — for moderation of user suggestions)
- **New: `landscape_tool_resource_interactions`** — "I have tried this" tracking:
  - `user_id`, `resource_id`, `tried_at` (timestamp)
- **New: `landscape_tool_comments`** — org-scoped comments on tools:
  - `id`, `tool_catalog_id`, `org_id`, `user_id`, `content`, `created_at`
- Tool ↔ use case relationship: a join table linking `landscape_tools_catalog.id` to use case IDs in the Academy discovery feature

### API architecture

No existing cross-app data sharing between Academy and Landscape. This feature requires:
- A new API route in Academy that queries `landscape_tools_catalog` directly (both apps use `createSupabaseServiceClient()`)
- Endpoints needed:
  - `GET /api/tools/catalog` — list all tools with filters (CIB domain, tool type, org status, search query)
  - `GET /api/tools/catalog/:id` — tool detail with AI capabilities, resources, use cases, comments, org adoption data
  - `GET /api/tools/org` — tools adopted by the current user's org
  - `POST /api/tools/request` — create a tool review request
  - `GET /api/tools/industry-benchmarks` — aggregated adoption data for the user's industry
  - `GET /api/tools/:id/resources` — curated resources (merged global + org overrides)
  - `POST /api/tools/:id/resources/suggest` — user suggests a new resource (enters moderation queue)
  - `POST /api/tools/resources/:id/tried` — toggle "I have tried this" on a resource
  - `GET /api/tools/:id/use-cases` — linked use cases from Academy discovery feature
  - `GET /api/tools/:id/comments` — org-scoped comments
  - `POST /api/tools/:id/comments` — add a comment
  - `POST /api/tools/:id/bookmark` — toggle personal bookmark
  - `GET /api/tools/my-progress` — user's exploration progress across all tools

### CIB domains (reference)

```
workforce_and_skills
projects_and_innovation
customers_and_contracts
communications_and_collaboration
meetings_and_engagements
insights_and_analytics
```

---

## 12. Acceptance criteria

### Must have (v1)

- [ ] Tool cards show: real logo (with letter fallback), name, vendor, AI capability description (120 chars), CIB domain badge, AI maturity level, org adoption badge, resource count, exploration counter ("2 of 5 explored") or "Explore resources →" CTA, up to 3 hashtag tags
- [ ] CIB domain tiles as primary navigation (6 domains with tool counts)
- [ ] "My Org's Stack" / "Explore All Tools" toggle, defaulting to org stack
- [ ] Search bar with full-text search across tool names, vendors, descriptions, tags
- [ ] Filter panel: CIB domain, tool type, org status, AI maturity, learning progress
- [ ] Sort options: recommended, most adopted, most resources, AI maturity, recently added, alphabetical
- [ ] Grid view (default) and List view toggle
- [ ] Tool detail page with: hero, AI capabilities section, resources section, use cases section, comments section, evaluate/compare section
- [ ] "Used by your org" badge on cards for tools in the org's `landscape_tools`
- [ ] "Common in your industry" badge with percentage based on aggregated cross-org data
- [ ] Curated resources per tool: TATOMA-managed global defaults (3–5 per tool), with org-level overrides in Admin/Workbench
- [ ] "I have tried this" toggle on each resource, driving the card-level "X of Y explored" counter
- [ ] User-suggested resources with moderation queue in Admin/Workbench
- [ ] Use cases from Academy discovery feature linked to tools on detail pages
- [ ] Org-scoped comments on tool detail pages (chronological, no voting in v1)
- [ ] Request-a-tool flow (Tier 2 and Tier 3) creating `landscape_tool_review_requests` entries
- [ ] Accessible to all Academy users (no admin role required) — read-only catalog, write for requests and bookmarks

### Should have (v1 stretch)

- [ ] Bookmark/favorites system for personal tool collections
- [ ] "Ideal for" use cases on detail pages
- [ ] Balanced Pros/Cons on detail pages
- [ ] Clickable hashtag tags that filter the catalog

### Deferred (v2+)

- [ ] **Bidirectional Academy course integration**: Tool pages surface Academy courses; course pages link back to tools
- [ ] **Proficiency model** (Aware → Familiar → Proficient → Expert) replacing the resource exploration counter
- [ ] **Academy-authored learning content per tool**: Guided courses, deep-dive modules, assessments, certifications
- [ ] Side-by-side tool comparison (2–3 tools within same CIB domain)
- [ ] Structured peer use-case examples with templates and helpfulness voting
- [ ] Team proficiency dashboards ("Marketing team: 72% Proficient on Canva AI")
- [ ] Industry benchmarking dashboards for org admins
- [ ] Role-based personalisation (default CIB domains based on job title)
- [ ] Onboarding wizard (3-step personalisation on first visit)
- [ ] "Recommended for you" personalised feed
- [ ] AI-powered tool recommendations
- [ ] "Trending in your org" (30-day rolling window of learning activity)

---

## 13. Design references

The competitive research analysed four AI tool directories and several enterprise platforms. Key patterns to borrow:

| Pattern | Source | How to adapt for TATOMA |
|---|---|---|
| Business-function navigation tabs | Futurepedia | → CIB domain tiles as primary nav |
| 7-element card design | Futurepedia | → Our 9-element card (logo, name, AI desc, CIB domain, org badge, courses, AI maturity, progress, tags) |
| "Ideal for" use cases in gerund form | AI Catalog | → On detail pages, focused on AI use cases specifically |
| Balanced Pros/Cons | AI Catalog | → On detail pages, focused on AI capabilities |
| Education-first positioning | Insidr.ai | → Bidirectional learning model (our core differentiator) |
| Structured learning roadmap | Insidr.ai | → Proficiency levels with mapped content types |
| Multi-dimensional rating | Futurepedia | → Simplified to AI maturity + proficiency (avoid over-complexity) |
| Emoji-coded categories | AI Catalog | → Icons for CIB domains |
| Dense list view for evaluation | G2 / Capterra | → List view toggle with comparison-relevant columns |
| Professional achievement system | Salesforce Trailhead | → Proficiency levels (Aware → Expert), no gamification |

---

## Appendix: what "AI maturity" means on a tool card

The current v1 shows "Low," "Medium," or "High" with no explanation. The v2 spec should include a clear definition, visible via tooltip or on the detail page:

- **Low**: The tool has announced or is beta-testing AI features, but they are limited in scope or not yet production-ready.
- **Medium**: The tool has shipped production AI features that cover some workflows, but significant manual work remains in core use cases.
- **High**: The tool has deeply integrated AI across its core workflows, with features that meaningfully reduce manual effort for most users.

This definition should be visible somewhere in the UI (info icon tooltip on cards, expanded explanation on detail pages) so the label carries meaning.
