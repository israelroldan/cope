# PRD: Learn & Create — Q2 2026

**Author:** Israel Roldan
**Date:** February 16, 2026
**Status:** Draft
**Context:** [Strategy Session Notes (Feb 12)](./platform-notes.md) · [Transformation OS PRD](./prd-transformation-os-q2.md)

---

## 1. Background & Motivation

The Feb 12 strategy session established a two-product model for the Tatoma platform. While the Transformation OS targets decision makers and transformation leads, **Learn & Create** targets the other 95% of the organization — the people who actually need to adopt AI in their daily work.

### The Two-Product Model

| Product | Who it's for | What it does |
|---------|-------------|-------------|
| **Transformation OS** | Decision makers, management teams, transformation lead(s) | Strategic command center (separate PRD) |
| **Learn & Create** | All employees across the organization | Training, personal AI adoption, prompt tools, certificates — the retention and stickiness layer |

**This PRD covers Learn & Create only.**

### Why Learn & Create matters

The strategy session identified Learn & Create as the **retention play**. If only transformation leads use the platform, there's limited stickiness after year one. But if employees across the company are building personal use case libraries, generating prompts, completing certifications, and attending training sessions — the platform becomes embedded in the organization's daily workflow. That's what justifies the recurring subscription.

The competitive benchmark is **Section (Prof AI)** — they pivoted their entire org to a product-led approach with training, use case discovery, and certification. Tatoma needs to match and exceed this while integrating it with the Transformation OS layer (something Section doesn't have).

### Target audience

Unlike the Transformation OS (which targets 3-10 people per client), Learn & Create targets **all employees** — potentially hundreds or thousands of users per client organization. This fundamentally changes the design constraints: it must be self-service, low-friction, and feel like a consumer product.

---

## 2. Current State

### What exists today

The Tatoma platform has some components that relate to Learn & Create, but none are built for employee-scale usage:

**Academy app (shell only):**
- App exists in the monorepo (`apps/academy`)
- Basic routing and layout in place
- No course content, no LMS, no certificate generation

**Prompts app:**
- Prompt library with categories
- Basic CRUD for prompt templates
- No personal refinement workflow, no AI-assisted generation

**Cards app:**
- Card-based AI tools
- Functional but positioned as a Tatoma internal tool, not client-facing at scale
- No agent capabilities yet

**What's completely missing:**
- Training content / course system
- Certificate generation and tracking
- Personal use case generator (different from the execution-level generator in Transformation OS)
- LMS integration capability
- Employee onboarding flow
- Usage analytics at the employee level
- Any concept of "personal AI workspace"

---

## 3. Goals for Q2

### Primary goal
Build the first version of Learn & Create that's good enough to demo to clients as part of the Tatoma offering — and to pilot with one client's broader employee base.

### Success criteria
1. An employee can sign up (via org invite), complete a basic AI literacy path, and earn a certificate — without any hand-holding.
2. Employees can discover and capture personal AI use cases relevant to their role and department.
3. The prompt generator helps employees create effective prompts for their specific tasks — even if they have zero prompt engineering experience.
4. Cards/Agents provide always-on AI assistance for common workplace tasks.
5. The platform tracks engagement at the org level so transformation leads can see adoption metrics.

### Non-goals for Q2
- Full LMS integration (Moodle, Cornerstone, etc.) — defer to Q3
- Mobile-native app
- Multi-language content
- Gamification / leaderboards
- Integration with the Transformation OS playbook (shared infrastructure but separate UX for now)
- Video hosting (use external embeds for now)

---

## 4. Capability Areas

Learn & Create has five capability areas, plus shared infrastructure.

### 4.1 Academy + Certificates

**Problem:** Employees are told "you need to use AI" but aren't given a structured path to get started. Most AI training is one-off workshops that don't stick. There's no way to track who's been trained, what they know, or what skills they're developing.

**What it delivers:**

**Course system:**
- **Learning paths** — sequences of modules organized by theme. Launch paths: "AI Foundations" (everyone), "AI for Your Role" (department-specific), "Prompt Craft" (advanced).
- **Modules** — individual learning units. Each module contains: a short article or guide (markdown), optional embedded video, a hands-on exercise (try this prompt, build this use case), and a quick assessment (3-5 questions).
- **Progress tracking** — employees see their learning dashboard: paths started, modules completed, time invested, certificates earned.

**Certificates:**
- **Completion certificates** — generated when a learning path is fully completed (all modules + assessments passed).
- **Certificate design** — branded Tatoma PDF with employee name, completion date, path name, and a unique verification URL.
- **Org-level dashboard** — transformation leads and HR can see: how many employees completed which paths, overall completion rates, department-level breakdown.

**LMS connection (future-ready):**
- Design the certificate and completion data model to support future SCORM/xAPI export for clients who want to sync with their existing LMS.
- Not built in Q2, but the schema should not block it.

**Data model:**
- `learning_paths` table: `id`, `title`, `description`, `target_audience`, `estimated_hours`, `sequence_order`, `published`
- `learning_modules` table: `id`, `path_id`, `title`, `content` (markdown), `video_url`, `exercise_prompt`, `sequence_order`, `estimated_minutes`
- `module_assessments` table: `id`, `module_id`, `questions` (JSONB array of question objects)
- `employee_progress` table: `user_id`, `module_id`, `started_at`, `completed_at`, `assessment_score`
- `certificates` table: `id`, `user_id`, `path_id`, `issued_at`, `verification_code`, `pdf_url`

### 4.2 Personal Use Case Generator

**Problem:** The Transformation OS has an "execution use case generator" for transformation leads — but that's strategic-level (which department, which process, what ROI). Employees need something different: a personal tool that helps them find AI use cases in *their own daily work*. "I spend 2 hours a week writing status reports — can AI help?"

**What it delivers:**
- **"Find My Use Cases" flow** — a conversational questionnaire that asks: What's your role? What tasks do you spend the most time on? Which ones are repetitive? Which involve writing/summarizing/analyzing? The AI suggests 3-5 personalized use cases.
- **Use case cards** — each discovered use case becomes a card in the employee's personal workspace. Shows: what the use case is, estimated time savings, difficulty level, and a "Try it" button that links to a relevant prompt or Card.
- **Personal use case library** — employees build up a collection of use cases they've discovered and tried. They can rate them (useful / not useful) and share anonymized versions with the org.
- **Department templates** — pre-built use case templates for common departments (HR, Marketing, Finance, Operations). Employees in those departments get suggestions automatically.

**Data model:**
- `personal_use_cases` table: `id`, `user_id`, `organization_id`, `title`, `description`, `task_description`, `ai_suggestion`, `estimated_time_savings`, `difficulty`, `status` (discovered / tried / adopted / dismissed), `rating`, `shared`
- `department_templates` table: `id`, `department`, `title`, `description`, `prompt_template`, `difficulty`

### 4.3 Prompt Generator / Refiner

**Problem:** Most employees don't know how to write effective prompts. They try ChatGPT, get mediocre results, and conclude "AI doesn't work for my job." What they need is guided prompt creation that turns their intent into a well-structured prompt — and helps them refine it based on results.

**What it delivers:**
- **Guided prompt builder** — a step-by-step flow: What do you want to achieve? What's the context? What format do you need? What tone? The system assembles a structured prompt from the answers.
- **Prompt templates** — pre-built templates for common tasks: email drafting, meeting summaries, document review, data analysis, content creation. Employees can start from a template and customize.
- **Prompt refiner** — paste a prompt that didn't work well, describe what went wrong, and the system suggests improvements. Explains *why* each change helps (building prompt literacy over time).
- **Personal prompt library** — employees save prompts that worked well. Organized by category. Can be shared with the org (with approval).
- **Integration with use cases** — when an employee discovers a use case, the prompt generator can auto-create a starter prompt for that use case.

**Data model:**
- `prompt_templates` table: `id`, `title`, `category`, `template` (with variable placeholders), `description`, `example_output`, `organization_id` (null for global), `created_by`
- `user_prompts` table: `id`, `user_id`, `title`, `prompt_text`, `category`, `notes`, `use_case_id` (optional link), `shared`, `created_at`

### 4.4 Cards / Agents

**Problem:** Training is good, but employees need *tools* — always-available AI assistants that help with specific tasks. The Cards app already exists but is positioned as an internal Tatoma tool, not a client-facing product.

**What it delivers:**
- **Card catalog** — a library of pre-built AI cards for common workplace tasks: email writer, meeting prep, document summarizer, brainstorm partner, status report generator, FAQ builder.
- **Custom cards** — consultants can create client-specific cards (e.g., a card that knows the client's brand guidelines, or one that follows their specific reporting format).
- **Always-on access** — cards are available from the main Learn & Create dashboard. Quick-launch favorites.
- **Agent roadmap (future)** — the architecture should support evolving cards into more capable agents that can take actions (pull data, fill templates, send drafts). Not built in Q2, but the card model should be extensible.

**Data model:**
- Existing Cards app tables can be extended
- `card_catalog` table: `id`, `title`, `description`, `system_prompt`, `category`, `icon`, `is_global`, `organization_id`, `created_by`
- `user_card_favorites` table: `user_id`, `card_id`
- `card_usage_log` table: `id`, `user_id`, `card_id`, `used_at`

### 4.5 Training Sessions

**Problem:** Not all learning happens in the platform. Tatoma delivers in-person and virtual training sessions — "Work Better with AI" workshops, AI hands-on labs, and the Transformation Lead Academy. These sessions need a home in the platform for scheduling, materials, and follow-up.

**What it delivers:**

**Training session types:**
- **Work Better / AI Hands-on** — half-day or full-day workshops for employee groups. Focused on practical AI skills. The platform hosts: session description, pre-work materials, during-session exercises, post-session resources.
- **Transformation Lead Academy** — a deeper program specifically for transformation leads (overlaps with MiniMBA in Transformation OS but delivered as structured training sessions rather than self-paced modules).

**Platform support:**
- **Session catalog** — upcoming and past training sessions. Employees can see what's available and register interest (actual scheduling managed by consultant).
- **Session materials hub** — for each session: agenda, slides (embedded), exercise instructions, resource links. Available before, during, and after.
- **Post-session follow-up** — after attending, employees get: summary of key takeaways, links to relevant learning paths and use cases, and a feedback form.
- **Attendance tracking** — which employees attended which sessions. Feeds into org-level adoption metrics.

**Data model:**
- `training_sessions` table: `id`, `organization_id`, `title`, `description`, `session_type` (workshop / hands_on / tl_academy), `scheduled_date`, `duration_hours`, `max_participants`, `status` (planned / confirmed / completed / cancelled)
- `session_materials` table: `id`, `session_id`, `title`, `type` (agenda / slides / exercise / resource), `content` (markdown or URL), `sequence_order`
- `session_attendance` table: `id`, `session_id`, `user_id`, `registered_at`, `attended`, `feedback` (JSONB)

---

## 5. Cross-Cutting: Employee Engagement Infrastructure

Shared infrastructure that supports all capability areas.

### Employee Identity & Access
- Employees are invited by the transformation lead or HR via org-level invite links
- Authentication via WorkOS AuthKit (same SSO as Transformation OS)
- Role: `employee` (vs. `transformation_lead` and `consultant` in Transformation OS)
- Department tagging for personalized content

### Org-Level Analytics Dashboard
- Visible to transformation leads and consultants
- Metrics: total registered employees, active users (last 30 days), learning path completion rates, use cases discovered, prompts created, cards used, sessions attended
- Department breakdown view
- Export capability for client reporting

### Content Management
- Tatoma consultants author and publish learning paths, modules, and prompt templates via a Workbench-like admin interface
- Content can be global (available to all clients) or org-specific
- Versioning for content updates

**Data model:**
- `employee_profiles` table: `user_id`, `organization_id`, `department`, `role_title`, `invited_at`, `onboarded_at`
- `org_analytics_cache` table: computed daily, per-org rollups of key metrics

---

## 6. Implementation Phases

### Phase A: Foundation (Weeks 1–3)
*Get the Academy running and the employee identity system in place.*

1. Employee invitation and onboarding flow — org invite links, WorkOS SSO, department tagging.
2. Learning path and module content system — markdown-based, admin authoring.
3. First learning path: "AI Foundations" — 6-8 modules covering AI basics, prompt writing, use case thinking.
4. Module assessment system — simple quiz per module.
5. Certificate generation — PDF generation with Tatoma branding, verification URL.
6. Employee learning dashboard — progress, paths, certificates.

**Exit criteria:** An employee can be invited, complete the AI Foundations path, pass assessments, and receive a branded certificate.

### Phase B: Personal AI Tools (Weeks 4–6)
*Add the use case generator and prompt tools.*

1. Personal use case generator — conversational flow + AI suggestions.
2. Personal use case library — save, rate, share.
3. Guided prompt builder — step-by-step prompt creation.
4. Prompt templates — pre-built library for common tasks.
5. Prompt refiner — paste and improve workflow.
6. Personal prompt library — save and organize.

**Exit criteria:** Employees can discover personal AI use cases and build effective prompts — even with zero prior experience.

### Phase C: Cards & Training (Weeks 7–9)
*Make Cards client-facing and add training session support.*

1. Card catalog — curated set of workplace AI cards.
2. Custom card creation — consultants build org-specific cards.
3. Card quick-launch and favorites.
4. Training session catalog and registration.
5. Session materials hub — pre/during/post resources.
6. Attendance tracking and post-session follow-up.

**Exit criteria:** Employees have always-on AI tools via Cards and a structured training session experience.

### Phase D: Analytics & Polish (Weeks 10–12)
*Org-level visibility, department templates, and refinement.*

1. Org-level analytics dashboard — adoption metrics for TLs and consultants.
2. Department use case templates — pre-built suggestions by department.
3. Second learning path: "AI for Your Role" — department-specific modules.
4. Content sharing — employees can share use cases and prompts with their org.
5. Integration touchpoints with Transformation OS — use case promotion, adoption metrics feeding into transformation health.

**Exit criteria:** Transformation leads can see org-wide AI adoption metrics. Department-specific content is available. The two products (Transformation OS + Learn & Create) share meaningful data.

---

## 7. Technical Considerations

### Architecture decisions
- **Separate app in monorepo** — Learn & Create uses the existing `academy` app as its shell, expanded with new pages/routes. Prompts and Cards apps remain separate but linked via navigation.
- **Shared auth** — same WorkOS AuthKit instance as Transformation OS. Employee role distinguished by permissions.
- **Content as markdown** — all learning content stored as markdown in the database. No external CMS for MVP.
- **PDF generation** — use a server-side PDF library (e.g., `@react-pdf/renderer` or Puppeteer) for certificate generation.
- **AI features via existing providers** — use Groq for use case generation and prompt refinement (fast, cost-effective for high-volume employee usage).

### Scale considerations
- Unlike Transformation OS (3-10 users per client), Learn & Create could have 100-1000+ users per client.
- Read-heavy workload — most employees consume content, few create.
- Cache aggressively: learning paths, module content, prompt templates.
- Rate-limit AI features (use case generator, prompt refiner) per user to control costs.
- Org analytics computed daily via cron, not real-time.

### Content creation burden
- The biggest risk is not technical — it's content. The AI Foundations path needs 6-8 high-quality modules at launch.
- Department-specific content multiplies the burden.
- Recommendation: use AI-assisted drafting (consultants write outlines, AI expands, consultants review) to accelerate content creation.

---

## 8. Open Questions

1. **Pricing model for Learn & Create** — per-user (consumption-based) or included in the Transformation OS subscription? The strategy session mentioned tiers based on user count (100 for Kickstarter, 250 for Leader). How does this work in practice?

2. **Content authoring workflow** — do consultants author directly in the platform, or do they write in Notion/Google Docs and import? Recommendation: author in platform for MVP, import capability later.

3. **Employee self-service vs. org-managed** — can employees sign up on their own (via org domain), or must they be explicitly invited? Recommendation: explicit invite for Q2, self-service domain matching later.

4. **Cards as standalone or integrated?** — should Cards live within Learn & Create, or remain a separate app accessible from both products? Recommendation: accessible from both, but the primary home is Learn & Create.

5. **Department taxonomy** — who defines the department list? Standard set or client-configurable? Recommendation: standard set (HR, Marketing, Finance, Operations, IT, Sales, Legal, R&D, Customer Service) with ability to add custom.

6. **Cross-client content sharing** — can Tatoma build a shared use case / prompt library across all clients (anonymized)? Recommendation: not in Q2, but design the data model to support it.

7. **Transformation Lead Academy placement** — does TL Academy live in Learn & Create (as a training session type) or in Transformation OS (as part of MiniMBA)? Recommendation: content overlap is fine. Training sessions in Learn & Create, self-paced modules in Transformation OS MiniMBA.

---

## 9. Success Metrics (post-launch)

| Metric | Target | How to measure |
|--------|--------|----------------|
| Employee registration rate | 30%+ of invited employees register | Employee profile count vs. invite count |
| Monthly active users | 20%+ of registered employees active | Auth logs (30-day window) |
| AI Foundations completion rate | 40%+ of registered complete the path | Employee progress table |
| Certificates issued per quarter | 50%+ of active users earn at least one | Certificate table count |
| Personal use cases discovered | 2+ per active user per quarter | Use case table count |
| Prompts created/saved | 3+ per active user per quarter | User prompts table |
| Card usage frequency | Weekly usage by 30%+ of active users | Card usage log |
| Training session attendance | 80%+ of registered show up | Attendance tracking |
| Employee satisfaction | 4+/5 on platform usefulness | In-app survey |
| Org-level: adoption signal | TL can demo adoption metrics to leadership | Analytics dashboard completeness |

---

*This PRD covers Learn & Create only. See the [Transformation OS PRD](./prd-transformation-os-q2.md) for the strategic command center targeting decision makers and transformation leads. The two products share infrastructure (auth, hosting, AI providers) but serve fundamentally different audiences and use cases.*
