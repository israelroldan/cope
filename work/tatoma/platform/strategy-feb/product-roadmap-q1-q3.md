# TATOMA Platform — Product Roadmap Q1–Q3 2026

**Date:** February 17, 2026
**Status:** Post co-founder session
**Team:** Israel, Sander & Maarten

---

## Where We Are Today

The TATOMA platform is a monorepo of **10 separate Next.js apps**, each with its own URL, port, and auth config. Users land on Hub (hub.tatoma.eu), see a grid of app cards, and click through to separate apps: Client Portal (clients.tatoma.eu), Academy (academy.tatoma.eu), Prompts, Cards, Library, Landscape, and Workbench.

This worked for getting features shipped fast. It doesn't work for what comes next.

The co-founder session made a single overarching decision that reshapes the platform: **TATOMA is one product, not a collection of apps.** Employees should say "I logged into TATOMA" and know exactly what they mean. From that decision, everything else follows.

---

## What Needs to Change

The meeting produced nine specific decisions. Rather than listing them in order, here's how they group into four workstreams that define the roadmap.

### Workstream 1: Platform Unification

The most architecturally significant change. Today users navigate between separate apps via Hub. Tomorrow they navigate sections within a single platform.

**What this means concretely:**

The current multi-app launcher pattern (Hub at port 3000 routing to Client Portal at 3001, Academy at 3002, Prompts at 3003, Cards at 3004, Library at 3005) needs to become a single coherent shell. Not necessarily a single Next.js app — the monorepo architecture can stay — but the **user experience** must feel like one product with sections, not a collection of tools.

This involves:

- **Unified navigation** — a role-aware navbar/sidebar that replaces the Hub launcher grid. Employees see Studio sections (prompts, use cases, academy). TLs and leadership also see Console sections (playbook, engagements). Consultants see everything plus the Workbench.
- **Cards behind a feature flag** — Cards, Library, Prompts, and Academy are four overlapping concepts for "AI tools and learning." Shipping all four as separate nav items creates confusion. Cards go behind a flag (`feature-cards`, already exists in WorkOS) until the Studio consolidation is complete. The Cards app (port 3004) stays in the monorepo but disappears from the user-facing navigation.
- **Navbar improvements** — consistent iconography, collapsible sidebar, mobile responsiveness, active states. The current pattern where each app has its own `LoggedLayout` with slightly different headers needs to converge.

**Why this is first:** Nothing else makes sense without the shell. You can't build a "studio-first" experience if the user still lands on a grid of app cards.

### Workstream 2: Engagement Restructure

The Workbench and Client Portal both center on the "Playbook" concept (Align → Activate → Adopt phases with activities). Four decisions reshape how this works:

**Rename + split the information architecture:**
- Current: "Playbook" = the panel showing activities, winning moves, and roadmap
- New: **"Engagements"** = the activities and tasks (the execution layer). **"Playbook"** = a new top-level section containing winning moves, strategic context, and transformation narrative content extracted from Miro boards

This is mostly a rename + UI reorganization in both the Workbench (`/[orgId]` routes, `playbook` components) and Client Portal (`PlaybookTransitionProvider`, phase overlays). The `winning_moves` table stays but its UI home moves from inside activities to the new Playbook section. The route structure changes from `/[orgId]/playbook/[phase]` to something like `/[orgId]/engagements/[phase]` + `/[orgId]/playbook`.

**Child tasks, assignments, and collaboration:**
- The `activities` table gets `parent_activity_id` (self-referential FK, nullable)
- Workbench engagement panel becomes a task planner with expandable/collapsible activity trees
- Client Portal shows child tasks with input prompts — clients can upload files, provide text input, update status on specific sub-tasks
- This transforms the flat activity list (which currently has status tracking, assignments, and resources) into a proper work breakdown structure
- API needs nested CRUD + re-ordering within parent
- **Assignments** — any activity or child task can be assigned to a user, whether a Tatoma consultant or a client-side user (TL, employee). Assignment means "this person needs to take action" — uploading a file, reviewing a deliverable, providing input. Assignments trigger notifications and appear in a personal task view. New `activity_assignments` table (activity_id, user_id, role, status, due_date)
- **Public comments** — threaded comments visible to all users on the engagement (client team + Tatoma). Enables transparent client-facing conversation on activities and child tasks. Supports @mentions with notification hooks. New `activity_comments` table (activity_id, parent_comment_id for threading, user_id, content, visibility: 'public')
- **Private notes** — threaded notes visible only to Tatoma consultants. Same structure as comments but scoped to internal users. Gives consultants a coordination space that clients don't see — prep notes, internal flags, strategy discussion. Same table with visibility: 'internal'

**Date range timeframes:**
- Activities currently use `time_bucket` enum (This Quarter / Next Quarter / Later) — this is imprecise
- Replace with `start_date` + `end_date` (both DATE type, both required), always spanning one or more full days
- Quarter membership is computed: activity overlaps a quarter's dates = it's in that quarter
- This enables proper Gantt-style timeline rendering and simplifies the "Our Planning" view in Client Portal

**Standardized relationships:**
- Activity relations already exist (drag-to-connect in Workbench, `activity_relations` table) but are freeform
- The Asiot client implementation becomes the canonical template — same relationship types, display rules, and graph layout for all clients
- Needs documentation of the Asiot patterns before implementation

### Workstream 3: Studio Experience

The platform's default experience for employees shifts from "here are some apps" to "here is your AI Studio."

**What "studio-first" means against the current codebase:**

Today there are three separate apps that handle tools: **Prompts** (port 3003) does NLP-based prompt structuring, **Library** (port 3005) manages prompt collections with sharing, and **Cards** (port 3004) runs AI workflows. Plus **Academy** (port 3002) has curated learning resources as JSONB per org. These four apps need to feel like one Studio.

The immediate move:

- **Consolidate Library + Prompts** into a unified prompt experience. Library already has the data model for collections, sharing, categories, teams, and S2S card generation. Prompts has the AI-powered structuring and refinement. Together they become the core of the Studio: browse prompts, create with AI assistance, save to personal library, share with team.
- **Build the personal use case generator** — a conversational AI flow (using existing Groq integration) that asks about role, daily tasks, and pain points, then suggests personalized AI use cases. Each use case becomes a card in a personal library with "try it" links to relevant prompts.
- **Position Academy as enablement** — the current Academy renders org-specific JSONB content with skill-level tabs. It needs to evolve into a real module system (see Workstream 4) but the key positioning change is that it appears *within* the Studio, not as a separate destination. "Learn how to get more out of your tools" not "go to the learning app."

Cards stay behind the flag until Q3, when the Studio experience is solid enough to reintroduce them as inline tools (run a card from within a prompt, from a use case, from a module exercise).

### Workstream 4: Learning Infrastructure

Before building course content from scratch, the learning system will adopt a context-aware content curation model — similar in spirit to what platforms like ProfAI have pioneered. The Academy's content pipeline will integrate bidirectionally with the Workbench's Context research engine (Perplexity + Tavily synthesis). Client context research — industry analysis, strategic priorities, competitive landscape — feeds into the learning system to surface relevant use cases, curate topical resources, and generate contextually appropriate exercises. In the other direction, employee-discovered use cases and learning outcomes feed back into the strategic context, enriching the research base that consultants and TLs work from. This means learning content isn't generic — it's tailored to what each client is actually working on.

Academy today is a content carousel with no progress tracking, no assessments, no certificates, and no way to export data to enterprise LMS systems. It needs to become a lightweight LMS.

**What to build:**
- **Module system** — learning paths (sequences of modules), individual modules with markdown content + optional video + hands-on exercise + assessment quiz
- **Progress tracking** — employee learning dashboard showing paths started, modules completed, time invested
- **Assessment engine** — simple quiz per module (JSONB question arrays), pass/fail threshold
- **Certificate generation** — branded PDF on path completion with verification URL
- **xAPI statement generation** — emit xAPI statements for key events (module started, completed, assessment scored, certificate earned). This is the enterprise unlock: customers can point their LMS at a Tatoma xAPI endpoint to sync completion data into Cornerstone, SAP SuccessFactors, etc.

The bidirectional Context integration means the AI Foundations path won't exist in isolation — module exercises will reference real use cases from the client's domain, and completed exercises generate new use cases that flow back into the Workbench.

The content itself (the actual AI Foundations path with 6-8 modules) is a co-founder investment — someone needs to write the outlines. AI-assisted expansion can handle the volume, but the initial structure and quality bar need to be set by the team.

---

## The Roadmap

Three quarters. Each builds on the previous. One developer.

### Q1 2026 — Ship the Platform

**The goal:** An employee logs into tatoma.eu and lands in their Studio. A transformation lead logs in and also sees the strategic layer. It feels like one product. Six weeks starting mid-February, shipping by end of March.

**What gets built — 6 weeks, tightly sequenced:**

**Week 1: Shell + Structure (tasks 1–7)**

The entire platform skeleton ships in one sprint. Navigation, engagement restructure, data model changes, and Studio core all land together. This is the heaviest week — it sets the shape of everything.

1. **Unified platform shell + navbar** — design and implement the role-aware navigation. Studio sections for all users, Console sections for authorized users. Replace the Hub app-launcher grid with a proper sidebar/nav pattern. Each existing app needs its `LoggedLayout` updated to use the shared nav.
2. **Engagements rename** — rename current Playbook routes/components to Engagements throughout Workbench and Client Portal. Update the `PlaybookTransitionProvider`, phase overlays, sidebar sections. Significant codebase rename but no behavioral change.
3. **New Playbook section** — create the top-level Playbook as a new section in Console. Move winning moves UI from inside activities to here. Add narrative/context content area (markdown-based, similar to the `playbook_narratives` concept from the PRD).
4. **Cards behind flag** — set `feature-cards` default to off for new orgs. Remove Cards from the Studio navigation. App stays functional for existing users with the flag.
5. **Child tasks + assignments + collaboration** — add `parent_activity_id` to activities table, build nested CRUD API, expandable tree UI in both Workbench and Client Portal. Activities and child tasks can be **assigned to any user** — Tatoma consultants *and* client-side users (TLs, employees) — meaning "you need to do something here" (upload a file, provide input, review a deliverable). Assignments drive notification triggers and surface in personal task views. Each activity/child task also gets two collaboration layers: a **public comments tree** visible to everyone on the engagement (client + Tatoma), and **private notes** visible only to Tatoma consultants (also threaded). This gives consultants a space to coordinate internally without the client seeing, while maintaining a transparent client-facing conversation. Both trees support @mentions with notification hooks.
6. **Date range timeframes** — migrate from `time_bucket` to `start_date` + `end_date` on activities. Update the "Our Planning" view in Client Portal and the planning view in Workbench. Compute quarter membership from dates.
7. **Prompt library consolidation** — merge the Prompts app's AI structuring with Library's collection/sharing model into a unified Studio section. Personal prompt library, team sharing, AI-assisted refinement. This is the primary lock-in feature.

**Week 2: Studio Experience (tasks 8–9)**

With the shell and prompt library in place, the Studio gets its two signature features.

8. **Personal use case generator** — conversational flow using Groq, personal use case library with "try it" links.
9. **Lightweight LMS engine** — learning paths, modules (markdown + video + exercise + assessment), progress tracking. Replaces the current Academy JSONB carousel with a real module system. *(Continues into Week 3.)*

**Week 3: LMS + xAPI (tasks 9, 12)**

Finish the LMS engine and wire up enterprise integration.

9. *(Continued)* — complete module rendering, assessment engine (JSONB quiz arrays, pass/fail), progress dashboard.
12. **xAPI statement generation** — emit xAPI for module events (started, completed, scored, certified). Build the export endpoint. This is the enterprise unlock.

**Weeks 4–5: Content + Certificates (tasks 10–11)**

The learning system is functional — now fill it. These two weeks need co-founder involvement for content outlines.

10. **AI Foundations content** — first learning path (6–8 modules). Co-founder outlines + AI-assisted expansion for volume.
11. **Certificate generation** — branded PDF on path completion. Verification URL.

**Week 6: Nudge System (task 13)**

13. **Nudge system v1** — weekly digest email via Resend. Reuse existing notification infrastructure (webhook pipeline, `notifications` + `notification_recipients` tables).

**Q1 exit criteria:**
- Employee lands in Studio, browses/creates prompts, discovers personal use cases, starts learning modules
- TL sees restructured Engagements with child tasks and date ranges, accesses strategic Playbook section
- Cards hidden from nav
- xAPI export works for module completions
- Feels like one platform

---

### Q2 2026 — Make It Sticky

**The goal:** Prove the platform carries value between consulting sessions. The guided refresh is the single most important feature for the business model shift.

**What gets built:**

**Engagement intelligence (the business model test):**

1. **Guided refresh workflow** — 4 weeks before a quarterly session, TL gets prompted to complete a refresh questionnaire. Step-by-step flow covering progress sentiment, winning move updates, blockers, new use cases. AI-generated summary visible to both TL and consultant. Uses existing Workbench research pipeline patterns for document upload + context extraction.
2. **Quarterly check-in support** — pre-session briefing page (auto-generated from refresh + activity data), session outcome capture, quarter-over-quarter comparison view.
3. **Health signals + scorecard** — activity overdue/stale detection, progress indicators per winning move, transformation scorecard widget. Computed on page load, cached with 1h TTL.
4. **Sprint workflow v1** — "Request a Sprint" flow from activities or use cases. Brief template (objective, scope, team, success criteria) with AI-assisted generation. Sprint types: Spike (~2 days), Sprint (~1 week), Special (variable). Approved sprints appear as special activity cards.

**Studio depth:**

5. **Prompt refiner** — paste a prompt that gave bad results, describe what went wrong, get AI-suggested improvements with explanations. Builds on the Prompts app's existing Groq structuring.
6. **Department use case templates** — pre-built suggestions for HR, Marketing, Finance, Operations, IT, Sales. Auto-suggested based on employee's department tag.
7. **Training session support** — session catalog, materials hub (pre/during/post resources), attendance tracking, post-session follow-up nudge.
8. **Org-level analytics dashboard** — adoption metrics visible to TLs and consultants. Registered employees, active users, path completions, use cases discovered, prompts created. Department breakdown. Computed daily via cron.

**Infrastructure:**

9. **xAPI endpoint** — full endpoint that customers can configure their LMS to pull from.
10. **Nudge system v2** — health alerts (activity stale > 30 days), refresh reminders (4 weeks + 2 weeks), status change notifications (consultant updates something → TL gets email).
11. **Standardized relationships** — implement the Asiot template as the canonical model. Document the patterns. Apply to all clients.

**Q2 exit criteria:**
- Guided refresh tested with pilot client, TL prepares in <30 min
- Sprint workflow functional
- Health signals surfacing real issues
- At least one client syncing xAPI to their LMS
- Org analytics dashboard showing adoption data

---

### Q3 2026 — Consolidate and Scale

**The goal:** Reintroduce Cards as part of a unified workspace. Build the data moats for renewal conversations. Handle 100+ employee clients without performance issues.

**What gets built:**

**Cards consolidation (the big Q4 move):**

1. **Studio integration** — Cards (the existing Cards app at port 3004, with its full execution engine, RAG pipeline, GenUI output, knowledge files) are reintroduced not as a separate app but as inline tools within the Studio. Run a card from within a prompt, from a use case, from a learning module exercise. The Card catalog becomes part of the Studio browsing experience.
2. **Unified tool experience** — prompts, use cases, and cards feel like one coherent Studio with cross-references. A prompt can generate a card. A use case links to relevant prompts and cards. A learning module's hands-on exercise can invoke a card.

**Console completion:**

3. **Sprint tracking + outcomes** — full lifecycle: brief → scheduled → in_progress → delivered → reviewed. Post-sprint deliverables captured back into the Playbook.
4. **Relations view** — React Flow dependency graph using the standardized relationship model from Q2.
5. **Timeline + Stream views** — chronological activity feed and personalized stream. Uses existing `activity_log` data.
6. **Quarter-over-quarter reporting** — the renewal conversation view. Completion rates trending, use cases growing, sprints delivered, learning adoption metrics from the Studio side.
7. **Export capabilities** — generate shareable PDF/summary of transformation progress for stakeholder reporting.

**Scale + enterprise:**

8. **Performance optimization** — caching strategy for 100-1000 user clients (read-heavy workload), rate limiting on AI features (use case generator, prompt refiner), cost controls per org.
9. **Studio content sharing** — employees share use cases and prompts within their org. Approval workflow for shared content.
10. **Advanced notification preferences** — per-user toggles for email types (weekly digest, status changes, refresh reminders, learning nudges).
11. **Cross-client template library** — anonymized best-of prompts and use case templates across all clients. The beginning of Tatoma's content moat.

**Q3 exit criteria:**
- Cards live as inline Studio tools, not a separate app
- All engagement views functional (Engagements, Playbook, Timeline, Relations, Stream)
- Full sprint lifecycle working
- Renewal data available: QoQ progress, org adoption, use case counts
- 3+ clients with 100+ employees, no performance issues

---

## Sequencing Logic

The ordering isn't arbitrary. Here's why things land where they do:

**Q1 is structural.** The platform shell, engagement restructure, and Studio core are foundational. Nothing in Q2 or Q3 works without the unified navigation, the Engagements/Playbook split, and the prompt/use case library. This is the biggest risk quarter because it involves significant architectural change to a ~140K line codebase with 10 apps. Six weeks, mid-Feb through end of March.

**Q2 validates the business model.** The guided refresh + sprint workflow is the critical test. If the platform can replace biweekly consultant check-ins with quarterly strategy sessions + on-demand sprints, the revenue model shift works. Consultant capacity doubles from ~4 to ~8 concurrent clients. This is why Q2 is "engagement intelligence" — it's the quarter that proves the thesis.

**Q3 is consolidation.** Cards come back, the Studio becomes complete, reporting gets built for renewal conversations. This is the "polish and scale" quarter. If Q1 and Q2 go well, Q3 is about making it all cohesive and handling real enterprise scale. If Q1 or Q2 slip, Q3 absorbs the overflow.

**Lock-in before content, always.** The prompt library and use case generator ship before learning paths because personal data creates switching costs that content cannot. An employee with 20 saved prompts and 8 use cases won't leave the platform even if the academy content is mid. The reverse isn't true.

**Enterprise unlocks are sequenced to not block sales.** xAPI foundation in Q1, full endpoint in Q2. This means enterprise sales conversations in H2 2026 can include LMS integration as a capability, not a roadmap item.

---

## Open Items

These need answers before or during Q1:

1. **Navigation design** — sidebar vs. top nav, collapsed vs. expanded, mobile behavior. This drives the entire shell implementation.
2. **Multi-app or single-app shell?** — the monorepo has 10 Next.js apps today. The unified navigation can work as either a single new app that replaces Hub, or a shared navigation component across existing apps. The former is cleaner but more migration work. The latter is incremental but adds complexity. Needs an architecture decision.
3. **Asiot relationship documentation** — someone needs to capture the Asiot relationship patterns as the canonical template before Q2 implementation.
4. **Content authoring investment** — the AI Foundations path needs 6-8 modules. Who writes the outlines? When? The team needs to commit ~40 hours.
5. **Pilot client** — which client gets the unified platform first? What's the tolerance for rough edges?
6. **Pricing model** — workspace included in base subscription or per-user above a threshold? Deferred from this session but affects how the invite flow is designed.
7. **Cards consolidation design** — "Cards as inline tools in the Studio" is a concept, not a design. Needs exploration in Q2 to ship in Q3.

---

*This roadmap supersedes the earlier two-product framing (Transformation OS + Studio) from the Feb 12 strategy session and draft PRDs. Those documents remain useful as capability references but should be read through the lens of the "one platform" decision.*
