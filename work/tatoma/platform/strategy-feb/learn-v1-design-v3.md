# Learn v1 — Design Session Output

**Date:** February 24, 2026
**Context:** Full design session building on strategy notes (Feb 12), product PRDs (Feb 16), and unified roadmap (Feb 17)
**Status:** Working draft — for discussion with Israel

### Version History

| Version | Date | Changes |
|---------|------|---------|
| v1 | 2026-02-24 | Initial design document — full v1 scope, UX, content strategy, technical approach |
| v2 | 2026-02-24 | Updated build status: Prompt Library is 100% shipped. Revised sequencing and timeline to reflect completed work. |
| **v3** | **2026-02-24** | **Refined Use Case Generator scope: guided wizard with AI at each step (not simple form), org-context enrichment, bidirectional prompt library linking. Created separate worktree brief ([worktree-use-case-generator.md](./worktree-use-case-generator.md)).** |

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

**3. Academy — AI Foundations Path** — *the structured learning*
- One learning path: "AI Foundations" — 6 modules (not 8 — be realistic about content investment)
- Each module: short article (markdown), hands-on exercise, quick assessment (3-5 questions)
- Progress tracking: employee sees their dashboard
- Certificate on completion: branded PDF, verification URL, shareable
- *Why 6 modules, not 8:* Quality over quantity. Each module must end with "I can do something new." Better to have 6 excellent modules than 8 mediocre ones. Add more paths later.

**4. Cards Catalog (Curated)** — *the instant value*
- Not the full Cards app — a curated selection of 5-8 workplace cards
- Email Writer, Meeting Prep, Document Summarizer, Brainstorm Partner, Status Report Generator
- Quick-launch from Studio dashboard, favorites
- *Why curated, not the full app:* The existing Cards app has complexity that makes sense for power users. Employees need "click and go" — a handful of excellent cards, not a builder.

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
| **Full Cards builder** | Complexity overkill for employees | v3 — reintroduced as inline Studio tools per roadmap |
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
- Personal use case generator (conversational AI flow via Groq)
- Use case library (save, rate, link to prompts)
- Department use case templates (pre-built suggestions)

**Sprint 2 (Week 3-4): Cards + Academy Engine**
- Curated Cards catalog (5-8 workplace cards)
- Card favorites + quick-launch from dashboard
- Learning path and module system (data model, rendering, navigation)
- Assessment engine (JSONB quiz arrays, pass/fail)

**Sprint 3 (Week 5-6): Content + Certificates + Analytics**
- AI Foundations path (6 modules — content authored in parallel during sprints 1-2)
- Certificate generation (branded PDF, verification URL)
- Org-level analytics dashboard (TL-facing adoption metrics)
- Employee learning dashboard (personal progress)

**Sprint 4 (Week 7-8): Polish + Pilot**
- Studio dashboard (the "home" screen with favorites, progress, suggestions)
- Bug fixes, UX polish, performance tuning
- Pilot deployment with first client's employee group
- Iterate based on pilot feedback

**Revised timeline: 8 weeks from start of Sprint 1.** The prompt library completion means Sprint 1 can focus entirely on use case generation and employee onboarding — two meaty features that benefit from having full attention.

---

## Part 2: The User Experience

### Information Architecture

The Studio is the employee's home. Everything in Learn lives here:

```
STUDIO (employee home)
├── Dashboard
│   ├── Quick-launch favorites (Cards + prompts)
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
├── Tools (Cards)
│   ├── Browse catalog
│   └── My Favorites
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
│  │  ② Try an AI tool right now     →     │  │
│  │     (Email Writer card)               │  │
│  │                                       │  │
│  │  ③ Start learning AI basics     →     │  │
│  │     (AI Foundations path)             │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  Popular with your colleagues:              │
│  [Meeting Prep] [Email Writer] [Brainstorm] │
└─────────────────────────────────────────────┘
```

**For a returning employee (week 3+):**
```
┌─────────────────────────────────────────────┐
│  Good morning, Sarah                        │
│                                             │
│  ┌─────────────────┐ ┌───────────────────┐  │
│  │ MY FAVORITES    │ │ CONTINUE LEARNING │  │
│  │                 │ │                   │  │
│  │ ⚡ Email Writer │ │ AI Foundations     │  │
│  │ ⚡ Meeting Prep │ │ Module 4 of 6     │  │
│  │ ⚡ My Report    │ │ ████████░░ 67%    │  │
│  │   Prompt        │ │                   │  │
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

**2. Cards as a gateway drug**

The employee's first interaction with AI on the platform should be a Card, not a learning module. Cards prove value in 30 seconds. Learning modules take 15 minutes. Skeptical employees will try a Card. They won't start a course. Once the Card works, they're curious enough for the course.

**3. Progressive complexity**

- **Day 1:** Dashboard → Try a Card → Use case generator
- **Week 1:** Explore prompt templates → Save first prompt → Start AI Foundations
- **Month 1:** Complete AI Foundations → Certificate → Build personal prompt library
- **Ongoing:** Personal prompt library → New use cases → Advanced paths (v2)

**4. The "empty state" problem**

A new employee's Studio is empty — no prompts, no use cases, no progress. Empty states kill engagement. Solutions:
- Pre-populate with "suggested" prompts based on department
- Use case generator as the first action (immediately fills the use case library)
- "Popular with your colleagues" section showing what others in the org are using (once there's data)
- First Card interaction is zero-setup (Email Writer with pre-filled example)

---

## Part 3: Content Strategy

### AI Foundations Path — The 6 Modules

Each module follows the same structure:
1. **Concept** (3-5 min read) — one clear idea, conversational tone, real examples
2. **Exercise** (5-10 min) — hands-on task using AI, ideally connected to their actual work
3. **Assessment** (2-3 min) — 3-5 questions testing comprehension, pass at 70%

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
- Concept: Pulling it all together. Personal prompt library, favorite Cards, use case awareness. How to stay current as AI evolves. The difference between people who "tried AI once" and people who use it daily.
- Exercise: "Set up your personal AI toolkit: 3 saved prompts, 2 favorite Cards, 2 identified use cases. This is your starting kit."
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

2. **AI via Groq** — use case generator uses Groq for fast, cost-effective inference. Rate-limit: 20 use case scopes/month per user.

3. **Certificate PDFs** — server-side generation (React-PDF or Puppeteer). Branded template, verification URL that resolves to a public page confirming the certificate.

4. **Analytics computed daily** — org-level metrics aggregated via daily cron job, not real-time. Dashboard reads from a pre-computed cache table.

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

-- Learning system
learning_paths (id, title, description, estimated_hours, sequence_order, published)
learning_modules (id, path_id, title, content_md, video_url, exercise_prompt, sequence_order, estimated_minutes)
module_assessments (id, module_id, questions_jsonb, pass_threshold)
employee_progress (user_id, module_id, started_at, completed_at, assessment_score)
certificates (id, user_id, path_id, issued_at, verification_code, pdf_url)

-- Use cases
personal_use_cases (id, user_id, org_id, title, description, task_description, ai_suggestion, estimated_time_savings, difficulty, status, rating, shared)
department_templates (id, department, title, description, prompt_template, difficulty)

-- Prompt library ✅ ALREADY EXISTS
-- (unified model with collections, sharing, variables, versions, comments)

-- Cards catalog (extended from existing)
card_catalog (id, title, description, system_prompt, category, icon, is_global, organization_id)
user_card_favorites (user_id, card_id)
card_usage_log (id, user_id, card_id, used_at)

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
| Time to first "aha" moment | < 15 minutes | Measure time from first login to first Card use or use case discovery |
| AI Foundations completion rate | 40%+ of those who start | Progress tracking data |
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

## Part 6: Open Decisions (For Discussion)

### Decision 1: Use Case Generator vs. Academy — which is the true entry point?

The PRDs position Academy first. The roadmap says "lock-in before content." I'm arguing for Use Case Generator first because it's personalized and creates immediate data. But Academy first has a case too: it builds foundational understanding.

**Recommendation:** Use Case Generator as the *default* entry point on the dashboard, Academy as the *structured* path. Don't force a sequence — let employees choose, but make the CTA for discovery more prominent than the CTA for learning.

### Decision 2: How many Cards at launch?

The full Cards app has a builder and many capabilities. For v1, I suggest a curated set of 5-8 cards that are guaranteed to work well. Quality over quantity.

**Recommendation:** Launch with 5 Cards (Email Writer, Meeting Prep, Document Summarizer, Brainstorm Partner, Status Report). Add more based on usage data.

### Decision 3: Prompt library — personal only or team sharing in v1?

~~Team sharing adds social proof ("Sarah in marketing uses this prompt") but adds complexity (approval workflows, privacy concerns).~~

**Update (v2):** The shipped prompt library already includes a sharing/collections model. This decision may already be resolved depending on what's enabled for employees. Need to confirm: is the current sharing model exposed to employee-role users, or only consultants/TLs?

### Decision 4: Assessment rigor

How hard should the module assessments be? Too easy = certificate feels worthless. Too hard = completion rate drops.

**Recommendation:** 70% pass threshold, 3-5 questions per module, questions test application (not recall). Allow retakes. The certificate should feel earned but achievable.

### Decision 5: Content investment timeline

6 modules × ~3 hours of co-founder time per module = ~18 hours. When does this happen?

**Recommendation:** Outline modules 1-3 during Sprint 1 (weeks 1-2). Outline modules 4-6 during Sprint 2 (weeks 3-4). AI-assisted expansion runs in parallel. Content reviewed before Sprint 3 starts building content into the LMS.

### Decision 6: Pilot scope

**Recommendation:** Start with 20-30 employees from one department at one client (not the whole org). Self-selecting volunteers, not mandatory. This gives enough data without the risk of a bad first impression at scale.

---

## Summary: The v1 in One Page

**What it is:** The employee-facing side of Tatoma — where everyone in the organization discovers, learns, and builds personal AI capabilities.

**What it contains:**
1. Personal Use Case Generator (the hook)
2. ~~Prompt Library + Generator + Refiner (the daily tool)~~ ✅ SHIPPED
3. AI Foundations learning path with 6 modules + certificate (the structured learning)
4. 5 curated workplace Cards (the instant value)
5. Employee onboarding + org analytics (the infrastructure)

**What's already done:** Prompt Library is fully shipped — unified experience, templates, personal library, example runs, variables, AI refinement, version history, comments.

**What remains:** Use Case Generator → Cards catalog → Academy + Certificates + Analytics → Dashboard + Polish + Pilot

**Timeline:** ~6-7 weeks for remaining work (down from 8, thanks to Prompt Library being done)

**Content investment:** ~25-30 hours of co-founder time for module outlines + review

**Pilot:** 20-30 employees, one department, one client, volunteers only

**Success metric:** An employee's first reaction is "this is actually useful for my job" — not "another corporate training platform."
