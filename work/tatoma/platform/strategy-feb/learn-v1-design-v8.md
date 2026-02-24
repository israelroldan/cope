# Learn v1 — Design Session Output

**Date:** February 24, 2026
**Context:** Full design session building on strategy notes (Feb 12), product PRDs (Feb 16), and unified roadmap (Feb 17)
**Status:** Working draft — for discussion with Israel

### Version History

| Version | Date | Changes |
|---------|------|---------|
| v1 | 2026-02-24 | Initial design document — full v1 scope, UX, content strategy, technical approach |
| v2 | 2026-02-24 | Updated build status: Prompt Library is 100% shipped. Revised sequencing and timeline to reflect completed work. |
| v3 | 2026-02-24 | Refined Use Case Generator scope: guided wizard with AI at each step, org-context enrichment, bidirectional prompt library linking. Created separate worktree brief. |
| v4 | 2026-02-24 | Rewrote Use Case Generator worktree brief with behavioral pipeline architecture (Guided Achievement Engine pattern). 5-phase pipeline, discriminated response types, scaffolding fields, activation flow, reflection, re-engagement, guardrails, graceful degradation. |
| v5 | 2026-02-24 | Critical tone correction in Use Case Generator: shifted from "just try it" (habit-forming) to "your expertise makes AI output good" (professional adoption). Three-part before/after (raw → limitations → refined with expertise). Reflection captures context effort level to teach the core lesson: more context = better results. Removed Cards as standalone product — "Try it" flow uses prompt library directly ("run the prompt in context"). |
| v6 | 2026-02-24 | All open decisions resolved. Entry point: Use Case Generator first. Prompt sharing: already live for employees, no curated/shared distinction. Assessments: completion-based (no graded quizzes). Content: deferred to Sprint 3. Pilot: full org at one client, feature-flag based. Sprint sequencing revised: content writing absorbed into Sprint 3, Sprint 4 becomes content finalization + pilot. |
| v7 | 2026-02-24 | Created worktree brief for Academy Engine + Certificates + Analytics (Sprint 2). Use Case Generator worktree is fully implemented. Two exercise types: self_report + prompt_execution. Certificate uses existing Tatoma brand kit. Analytics dashboard in Workbench (TL-facing), computed daily. |
| **v8** | **2026-02-24** | **Academy worktree v2: current "Learn" sidebar → "Resources" (rename, not replace). Exercises use built-in prompt runner (not library redirect). Certificates = HTML web pages, no PDF export for v1. Analytics = tracking only, no dashboard yet. Feature flag = "feature-learn". Added module content pointers. Removed org_analytics_cache and daily aggregation from Sprint 2.** |

---

## The Core Tension

The strategy docs contain a rich, ambitious vision for Learn & Create. Five capability areas, 12 weeks of phased implementation, three user personas, enterprise LMS integration — the works. That vision is right for the *destination*. But for v1, shipping something focused and excellent beats shipping everything at 60%.

This document proposes a tighter v1 scope that respects three constraints:

1. **One developer** — everything competes for the same hands
2. **The "one platform" decision** — Learn lives inside the Studio, not as a standalone product
3. **Lock-in before content** — personal data (prompts, use cases) creates switching costs faster than learning modules

---

## Part 1: What v1 Actually Is

### The v1 Promise

An employee gets invited to Tatoma, lands in the Studio, and within 15 minutes has:
- Discovered 3-5 AI use cases relevant to their actual daily work
- Saved their first prompt
- Tried an AI tool (Card) that saved them time on a real task

Within 2 weeks, they've completed "AI Foundations" and earned a certificate they can put on LinkedIn.

That's it. That's the v1 promise. Everything else serves this.

### What's In (The Essentials)

**1. Personal Use Case Generator** — *the hook* → [Full worktree brief](./worktree-use-case-generator.md)
- **Guided wizard with AI at each step** (not a simple form): Step 1 (role + context → AI suggests common tasks), Step 2 (pain points + time estimates → AI ranks by AI opportunity), Step 3 (3-5 personalized use case cards with "try it" links)
- **Org-context enriched** — pulls industry, department templates, and org priorities to make suggestions specific, not generic
- **Bidirectional prompt library linking** — auto-links to existing prompt templates when a match exists, or offers "Create a prompt for this" pre-filling the prompt builder
- Personal use case library with status tracking: Discovered → Tried → Adopted → Dismissed
- *Why first:* This is the single best "aha moment" generator. It answers the employee's real question: "What can AI do for ME?" It also creates personal data that makes the platform sticky.

**2. Prompt Library + Generator** — *the daily tool* ✅ SHIPPED
- ~~Unified prompt experience (Library + Prompts apps consolidated)~~ ✅ Done
- ~~Pre-built templates for common tasks~~ ✅ Done (10-15 high-quality starters)
- ~~Personal prompt library: save, organize, tag~~ ✅ Done
- ~~Guided prompt builder / AI refinement~~ ✅ Done (promoting manual prompts to AI-refined versions)
- ~~Prompt refiner~~ ✅ Done (included in AI refinement flow)
- Example runs ✅ Done
- Variables and variable filling ✅ Done
- Version history ✅ Done
- Comments system ✅ Done
- *Status:* This is fully shipped and functional. The daily engagement layer is live.

**3. Academy — AI Foundations Path** — *the structured learning* → [Full worktree brief](./worktree-academy-engine.md)
- One learning path: "AI Foundations" — 6 modules (not 8 — be realistic about content investment)
- Each module: short article (markdown), hands-on exercise, quick assessment (3-5 questions)
- Progress tracking: employee sees their dashboard
- Certificate on completion: branded PDF, verification URL, shareable
- *Why 6 modules, not 8:* Quality over quantity. Each module must end with "I can do something new." Better to have 6 excellent modules than 8 mediocre ones. Add more paths later.

**4. Run Prompts in Context** — *the instant value*
- The execution layer is the prompt library itself — employees "try" use cases by running prompts with their actual data and context
- Prompt templates pre-filled from use case discovery + employee's variables
- The prompt library's existing run/refine/version features serve as the "tools" layer
- Cards as a standalone product concept is being reworked separately and is out of scope for Learn v1
- *Why prompts-as-tools, not Cards:* The prompt library is shipped and proven. Employees running prompts in context (with their own data, their own examples, their own refinements) aligns with the core principle that output quality scales with the expertise you put in.

**5. Employee Onboarding + Org Analytics** — *the infrastructure*
- Invite flow: TL sends org invite link → employee signs up → selects department + role
- Role-based permissions (employee vs. TL vs. consultant)
- Org-level analytics dashboard for TLs: registered employees, active users, path completion rates, use cases discovered, prompts created
- Department breakdown view
- *Why this isn't optional:* Without onboarding, employees can't get in. Without analytics, TLs can't prove value to leadership. These are table stakes, not features.

### What's Out (Deferred to v2/v3)

| Capability | Why it's out | When it comes back |
|-----------|-------------|-------------------|
| **Department-specific learning paths** | Multiplies content burden before validating the model | v2 — after AI Foundations proves itself |
| **Training session support** (catalog, materials, attendance) | Valuable but not a platform differentiator in v1 | v2 — when clients start booking sessions |
| **LMS/xAPI integration** | Enterprise need, but no client is asking for it yet | v2 — when enterprise deals require it |
| **Cross-org content sharing** | Requires multiple active clients | v3 — when content volume justifies it |
| **Gamification / leaderboards** | Gimmick without substance | Maybe never — focus on genuine value |
| **Cards as standalone product** | Being reworked separately; prompt library serves as the tools layer for Learn v1 | TBD — Cards concept rework is a separate workstream |
| **Video hosting** | Use external embeds for now | v2 — if video content proves valuable |
| **Mobile-native** | Responsive web is fine for v1 | v3 — if usage data shows mobile demand |

### The Sequencing Within v1 (Revised)

With the Prompt Library fully shipped, the build plan shifts. The biggest piece of Sprint 1 is done, which frees up capacity and changes the critical path.

**What's done:**
- ✅ Unified prompt experience (Library + Prompts consolidation)
- ✅ Pre-built prompt templates (10-15 high-quality starters)
- ✅ Personal prompt library (save, organize, tag)
- ✅ Guided prompt builder / AI refinement
- ✅ Prompt refiner
- ✅ Example runs, variables, version history, comments

**What remains to build:**

**Sprint 1 (Week 1-2): Use Case Generator + Employee Foundation**
- Employee onboarding flow (invite, SSO, department selection)
- Personal use case generator (behavioral pipeline, AI flow — follows Prompts app AI integration pattern)
- Use case library (save, rate, link to prompts from shared libraries)
- Department use case templates (starter packs pattern, i18n-ready)

**Sprint 2 (Week 3-4): Academy Engine + Certificates + Tracking**
- Sidebar rename: current "Learn" → "Resources", new "Learn" = learning paths
- Learning path and module system (data model, rendering, navigation)
- Built-in exercise prompt runner (lightweight, inline — not the prompt library)
- Progress tracking: started → exercise_completed → module_completed (no graded assessments)
- Certificate system (HTML web page, public verification URL — no PDF for v1)
- Employee learning dashboard (personal progress)
- Analytics tracking only (ensure all events/timestamps captured — dashboard comes later)
- Feature flag: `feature-learn`

**Sprint 3 (Week 5-6): Content + Integration**
- Co-founders write AI Foundations content (6 module outlines, ~18 hours)
- AI-assisted expansion of outlines into full module content
- Content loaded into Academy system
- "Run prompt in context" integration (use case → prompt template → execute with variables)
- Studio dashboard (the "home" screen with favorites, progress, suggestions)

**Sprint 4 (Week 7-8): Polish + Pilot**
- Content review and refinement
- Bug fixes, UX polish, performance tuning
- Feature-flag rollout to full org at first client
- Iterate based on pilot feedback

**Revised timeline: 8 weeks from start of Sprint 1.** Content is now the critical path in Sprint 3 — co-founder writing time must be protected during those two weeks. The simplified assessment model (completion-based, no quizzes) saves dev time in Sprint 2, which absorbs analytics and certificates that were previously in Sprint 3.

---

## Part 2: The User Experience

### Information Architecture

The Studio is the employee's home. Everything in Learn lives here:

```
STUDIO (employee home)
├── Dashboard
│   ├── Quick-launch favorites (prompts)
│   ├── Learning progress summary
│   ├── Recent use cases
│   └── "What's new" nudge
│
├── Discover
│   ├── Use Case Generator ("Find My Use Cases")
│   ├── My Use Cases (personal library)
│   └── Department suggestions (pre-built templates)
│
├── Prompts ✅ SHIPPED
│   ├── Browse templates (by category)
│   ├── Create prompt (guided builder + AI refinement)
│   ├── My Prompts (personal library with variables, versions, comments)
│   └── Example runs
│
└── Learn
    ├── Learning Paths (starting with AI Foundations)
    ├── My Progress
    └── Certificates
```

### The Dashboard — Where Engagement Lives or Dies

The dashboard is the most important screen. If it's boring, employees won't come back. If it's overwhelming, they'll bounce.

**Design principle:** The dashboard should answer ONE question: "What should I do right now?"

**For a new employee (first visit):**
```
┌─────────────────────────────────────────────┐
│  Welcome, Sarah 👋                          │
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │  YOUR AI JOURNEY STARTS HERE          │  │
│  │                                       │  │
│  │  ① Find what AI can do for YOU  →     │  │
│  │     (Use Case Generator)              │  │
│  │                                       │  │
│  │  ② Try an AI prompt right now   →     │  │
│  │     (Email Drafter template)          │  │
│  │                                       │  │
│  │  ③ Start learning AI basics     →     │  │
│  │     (AI Foundations path)             │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  Popular prompts with your colleagues:       │
│  [Meeting Prep] [Email Drafter] [Brainstorm] │
└─────────────────────────────────────────────┘
```

**For a returning employee (week 3+):**
```
┌─────────────────────────────────────────────┐
│  Good morning, Sarah                        │
│                                             │
│  ┌─────────────────┐ ┌───────────────────┐  │
│  │ MY PROMPTS      │ │ CONTINUE LEARNING │  │
│  │                 │ │                   │  │
│  │ ⚡ Email Drafter│ │ AI Foundations     │  │
│  │ ⚡ Meeting Prep │ │ Module 4 of 6     │  │
│  │ ⚡ Weekly Report│ │ ████████░░ 67%    │  │
│  │                 │ │                   │  │
│  └─────────────────┘ └───────────────────┘  │
│                                             │
│  ┌─────────────────────────────────────────┐│
│  │ 💡 New suggestion: Based on your role,  ││
│  │    try "AI-assisted data validation"    ││
│  │    [See use case →]                     ││
│  └─────────────────────────────────────────┘│
│                                             │
│  MY USE CASES (3 discovered, 1 tried)       │
│  [Weekly report automation] [Email triage]  │
│  [Meeting notes summary]                    │
└─────────────────────────────────────────────┘
```

### Key UX Decisions

**1. Use Case Generator first, not Academy first**

The PRDs suggest Academy as the starting point. I'd push back on this. The use case generator creates an immediate "this is for ME" moment. Academy is important but it's "corporate training" until proven otherwise. Let employees discover *why* they should care before asking them to *learn*.

The flow: Discover → Try → Learn (not: Learn → Try → Discover)

**2. Prompts as the gateway drug**

The employee's first interaction with AI on the platform should be running a prompt template with their own data — not a learning module. A well-crafted prompt template with pre-filled variables proves value in 2 minutes. Learning modules take 15 minutes. Skeptical employees will try a prompt. They won't start a course. Once the prompt works, they're curious enough for the course.

**3. Progressive complexity**

- **Day 1:** Dashboard → Try a prompt template with your own data → Use case generator
- **Week 1:** Explore more templates → Save and customize a prompt → Start AI Foundations
- **Month 1:** Complete AI Foundations → Certificate → Build personal prompt library with refined prompts
- **Ongoing:** Personal prompt library (growing with expertise) → New use cases → Advanced paths (v2)

**4. The "empty state" problem**

A new employee's Studio is empty — no prompts, no use cases, no progress. Empty states kill engagement. Solutions:
- Pre-populate with "suggested" prompts based on department
- Use case generator as the first action (immediately fills the use case library)
- "Popular with your colleagues" section showing what others in the org are using (once there's data)
- First prompt interaction is low-setup (Email Drafter template with pre-filled example + guidance on what context to add)

---

## Part 3: Content Strategy

### AI Foundations Path — The 6 Modules

Each module follows the same structure:
1. **Concept** (3-5 min read) — one clear idea, conversational tone, real examples
2. **Exercise** (5-10 min) — hands-on task using AI, ideally connected to their actual work. Completing the exercise unlocks the next module. No graded quiz — the exercise IS the assessment.

**Module 1: What AI Actually Does (and Doesn't)**
- Concept: Mental model for LLMs. Not magic, not search engines. Good at: language tasks, pattern recognition, brainstorming. Bad at: facts, math, recent events, keeping secrets.
- Exercise: "Ask an AI to do two things — one it's great at (rewrite an email) and one it's bad at (calculate a complex formula). Compare the results."
- Takeaway: You now know where AI shines and where it doesn't. That's more than most people.

**Module 2: Your First Useful Prompt**
- Concept: What makes a prompt effective — role, context, task, format. The difference between "write me an email" and a structured prompt.
- Exercise: "Take a real email you need to write this week. Use the prompt template to write it. Compare your usual approach vs. the AI-assisted version."
- Takeaway: You just saved 10 minutes on a real task. That's the promise of AI at work.

**Module 3: Prompts That Actually Work**
- Concept: Common prompt patterns — the rewriter, the summarizer, the analyst, the brainstormer. When to use each. How to iterate.
- Exercise: "Pick a recurring task from your week. Choose the right prompt pattern. Create a reusable prompt and save it to your library."
- Takeaway: You now have a personal prompt in your library that you'll use again.

**Module 4: Finding AI Use Cases in Your Work**
- Concept: The "AI lens" — how to spot tasks that AI can help with. Signals: repetitive writing, summarizing, reformatting, analyzing text, generating options.
- Exercise: "Map your typical week. Which tasks match the AI signals? Use the Use Case Generator to explore 2-3 of them."
- Takeaway: You've identified specific, personal use cases. This isn't abstract anymore.

**Module 5: Working with AI as a Partner**
- Concept: AI as collaborator, not replacement. How to review and improve AI output. When to accept, when to iterate, when to do it yourself. The 80/20 rule of AI assistance.
- Exercise: "Take a draft document or report you're working on. Use AI to improve it (don't let AI write it from scratch). Track what you changed in the AI output."
- Takeaway: You know how to work *with* AI, not just *use* AI.

**Module 6: Building Your AI Toolkit**
- Concept: Pulling it all together. Personal prompt library, use case awareness, the skill of providing context. How to stay current as AI evolves. The difference between people who "tried AI once" and people who use it daily.
- Exercise: "Set up your personal AI toolkit: 3 saved prompts (refined with your context), 3 identified use cases you've tried, and notes on what context made the biggest difference. This is your starting kit."
- Takeaway: You now have a personal AI toolkit that you'll use every day. You're not just "AI aware" — you're AI-enabled.

### Content Creation Workflow

**Who writes what:**
- **Co-founders** write module outlines (concept bullet points, exercise description, assessment questions) — ~3 hours per module, ~18 hours total
- **AI-assisted expansion** turns outlines into full articles — Israel or designated person reviews and refines
- **Total co-founder investment:** ~25-30 hours (outlines + review), not 40+

**Quality bar:**
- Conversational tone (not corporate, not academic)
- Every sentence must pass the "would a real employee read this?" test
- No jargon without explanation
- Real examples from real work situations (anonymized from actual client cases)
- Short paragraphs, clear headings, scannable

**Content principles:**
- Start practical, add theory later (not the other way around)
- Every module must have a "do this RIGHT NOW" exercise
- Exercises should produce something the employee keeps (a prompt, a use case, a document)
- Assessments test "can you do this?" not "did you read this?"

### Prompt Templates — The Starter Library ✅ SHIPPED

The prompt template library is live with 10-15 pre-built templates including variable support, example runs, AI refinement, version history, and comments. Categories cover:

**Writing:** Email Drafter, Message Rewriter, Meeting Notes Summarizer, Status Report Generator

**Analysis:** Document Reviewer, Data Summarizer, Pros/Cons Generator

**Creativity:** Brainstorm Partner, Presentation Outliner, Content Expander

**Productivity:** Task Prioritizer, Meeting Agenda Builder, Process Documenter

**Communication:** Feedback Formatter, Explanation Simplifier

Each template includes variables (highlighted placeholders employees fill in), example runs showing real output, and the ability to promote manual prompts to AI-refined versions.

---

## Part 4: Technical Approach

### Architecture Summary

Learn v1 lives within the unified Studio shell (per the "one platform" decision). It extends the existing monorepo — no new apps, but new routes and pages within the consolidated Studio experience.

**Key technical decisions:**

1. **Content as markdown in the database** — learning modules are markdown stored in Postgres. No external CMS for v1. Admin authoring via Workbench.

2. **AI integration** — use case generator follows the same AI integration pattern used in the Prompts app (provider choice deferred to implementation). Rate-limit: 20 use case sessions/month per user.

3. **Certificates as HTML** — v1 certificates are rendered web pages using Tatoma brand kit, not generated PDFs. Public verification URL resolves to a no-auth page confirming the certificate. PDF export comes later.

4. **Analytics = tracking only** — v1 tracks all events and timestamps needed for analytics but does NOT build a dashboard or aggregation layer. Dashboard comes when we have real data and know which views TLs need.

5. **Prompt library** — ✅ Already shipped. Unified data model with collections, sharing, AI structuring, variables, version history, and comments.

### Data Model (Additions to Existing Schema)

```sql
-- Employee identity
employee_profiles (
  user_id         -- FK to existing users
  organization_id -- FK to existing organizations
  department      -- enum or string
  role_title      -- free text
  invited_at
  onboarded_at
)

-- Learning system (completion-based, no graded assessments)
learning_paths (id, title, description, estimated_hours, sequence_order, published)
learning_modules (id, path_id, title, content_md, video_url, exercise_prompt, sequence_order, estimated_minutes)
employee_progress (user_id, module_id, started_at, exercise_completed_at, completed_at)
certificates (id, user_id, path_id, issued_at, verification_code, pdf_url)

-- Use cases
personal_use_cases (id, user_id, org_id, title, description, task_description, ai_suggestion, estimated_time_savings, difficulty, status, rating, shared)
department_templates (id, department, title, description, prompt_template, difficulty)

-- Prompt library ✅ ALREADY EXISTS
-- (unified model with collections, sharing, variables, versions, comments)
-- Also serves as the "tools" layer — employees run prompts in context

-- Analytics
org_analytics_cache (org_id, metric_date, metrics_jsonb, computed_at)
```

### Scale Considerations

v1 targets 50-200 employees per client. At this scale:
- Read-heavy workload — cache learning content aggressively (content doesn't change often)
- Rate-limit AI features to control inference costs
- Compute analytics daily, not on every page load
- No need for sophisticated caching infrastructure yet — Postgres + Next.js ISR handles this load

---

## Part 5: Success Criteria & Measurement

### v1 Launch Criteria (must hit before expanding to more clients)

| Criteria | Target | How to know |
|---------|--------|-------------|
| Employee can self-onboard without support | 90%+ success rate | Test with 10 employees, count who complete onboarding without asking for help |
| Time to first "aha" moment | < 15 minutes | Measure time from first login to first prompt run or use case discovery |
| AI Foundations completion rate | 40%+ of those who start | Progress tracking data (completion = all 6 exercises done) |
| Certificate issued and shared | At least 5 per pilot | Certificate table + LinkedIn monitoring |
| Weekly return rate | 25%+ of registered | Auth log analysis (30-day rolling) |
| TL can demo adoption to leadership | TL says "yes, I can use this in my next leadership meeting" | Direct feedback |

### What "Good" Looks Like at 3 Months

- 100+ employees registered across 2-3 clients
- 30+ certificates issued
- 200+ personal prompts saved
- 100+ use cases discovered
- TLs using analytics dashboard in leadership conversations
- At least one employee-discovered use case promoted to Transformation OS

---

## Part 6: Decisions (All Resolved)

### Decision 1: Entry point ✅ RESOLVED (v6)

**Use Case Generator is the default entry point.** Academy is available and visible, but not forced. Dashboard CTA for discovery is more prominent than learning. Employees choose their own path — the flow is Discover → Try → Learn, not the reverse.

### Decision 2: Cards ✅ RESOLVED (v5)

Cards as a standalone product is out of scope for Learn v1 (being reworked separately). The "tools" layer is the prompt library itself — employees try use cases by running prompts in context.

### Decision 3: Prompt sharing ✅ RESOLVED (v6)

**Already live.** Employees can add prompts to shared org libraries and create their own libraries. There is no distinction between "org-curated" and "employee-shared" — if a prompt is in a shared library, it's available to the org. The Use Case Generator matches against all prompts in the org's shared libraries when suggesting "try it" links.

### Decision 4: Assessment rigor ✅ RESOLVED (v6)

**Completion-based, no graded quizzes.** Complete the hands-on exercise to unlock the next module. Certificate = finished all 6 modules. No pass/fail threshold, no scored assessments. This maximizes completion and keeps the tone practical ("do the thing") rather than academic ("pass the test").

*Implication:* The `module_assessments` table and `pass_threshold` field are no longer needed. Progress tracking is simpler: started → exercise_completed → module_completed.

### Decision 5: Content investment timeline ✅ RESOLVED (v6)

**Deferred to Sprint 3.** Co-founders focus on product validation during Sprints 1-2. Content writing happens when the Academy system is built and ready to receive it.

*Implication:* Content becomes the critical path in Sprint 3. Sprint sequencing revised — see updated sprint plan below.

### Decision 6: Pilot scope ✅ RESOLVED (v6)

**Full org at one client, feature-flag based.** Not limited to one department. Feature flags control rollout — can enable per-department or org-wide. This gives real adoption data across roles while maintaining a kill switch if something breaks.

---

## Summary: The v1 in One Page

**What it is:** The employee-facing side of Tatoma — where everyone in the organization discovers, learns, and builds personal AI capabilities.

**What it contains:**
1. Personal Use Case Generator (the hook)
2. ~~Prompt Library + Generator + Refiner (the daily tool)~~ ✅ SHIPPED
3. AI Foundations learning path with 6 modules + certificate (the structured learning)
4. Run prompts in context (the instant value — powered by shipped prompt library)
5. Employee onboarding + org analytics (the infrastructure)

**What's already done:** Prompt Library is fully shipped — unified experience, templates, personal library, example runs, variables, AI refinement, version history, comments. This also serves as the "tools" layer — employees try use cases by running prompts.

**What remains:** Use Case Generator + Onboarding → Academy Engine + Analytics + Certificates → Content + Dashboard → Polish + Pilot

**Timeline:** 8 weeks. Content is the critical path in Sprint 3 — co-founder writing time (~18 hours) must be protected.

**Assessments:** Completion-based. No quizzes. Do the exercise, unlock the next module. Certificate = all 6 done.

**Prompt sharing:** Already live for employees. No curated/shared distinction — all shared library prompts are available. Use Case Generator matches against the full org library.

**Pilot:** Full org at one client, feature-flag based.

**Success metric:** An employee's first reaction is "this is actually useful for my job" — not "another corporate training platform."
