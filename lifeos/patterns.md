# Patterns

> What works, what doesn't, and validated approaches. Grows over time from
> experience. Each entry should be specific enough to act on.

---

## What Works

### Product & Architecture

- **Gold-standard content model:** Expert writes one, AI generates the rest. The expert's time goes to quality control, not first-draft production. Proven in TLOM content pipelines.

- **Progressive enrichment:** Start with a minimal data structure, enrich it through pipeline stages. Each stage adds context. Works for content generation, user onboarding, AI workflows.

- **Pipeline pattern with atomic progress:** Long-running operations persist progress at individual step level. On crash: scan for first non-completed step and continue. No work lost. Critical for content generation, data sync, any multi-step process.

- **Compliance by architecture, not policy:** TLOM's five-layer design solves COPPA/GDPR-K structurally. The architecture makes violations impossible rather than relying on humans to follow rules. Apply this thinking to any regulated domain.

- **Three apps over one app with role routing:** When users have nothing in common (parents, facilitators, admins), separate apps beat role-based routing in a single app. More files, less confusion.

- **Feature flags from auth session data:** WorkOS session provides org membership, roles, and feature flags. No separate feature flag service needed for basic gating.

### Working with AI

- **Context engineering > model selection:** The quality of structured inputs, semantic search, and reduced round-trips determines output quality more than model size.

- **Specialist delegation over monolithic agents:** Hierarchical architecture — orchestrator discovers capabilities, spawns specialists for domain work, aggregates results. Don't try to hold everything in one context.

- **Check run history before re-spawning:** In long sessions, specialist results get lost to context compression. Call `get_last_run` before re-dispatching work that may already be done.

- **Prompts in the Hub, not the codebase:** LangSmith Hub is the source of truth. Code fallbacks for resilience only. Change behavior without deploys.

### Communication & Delivery

- **Versioned documents for evolving work:** v1, v2, v3 with changelogs. Preserves decision history and makes it safe to iterate without losing context.

- **McKinsey structure, human language:** Frameworks, 2x2s, executive summaries for strategic work. But stripped of jargon. The structure helps; the vocabulary doesn't.

- **State, don't sell:** For kid-facing products, parent-facing communications, and client pitches alike. Describe what it does. If the product is good, that's enough.

### Operations & Finance

- **BV-to-BV contracting always:** Never contract personally when operating through a holding BV. Schijnzelfstandigheid exposure, liability protection breach. Push for substitution clause and no exclusivity.

- **Capture open loops immediately:** When scattered across multiple ventures, the worst outcome is an untracked commitment. Capture with enough context to pick up cold tomorrow.

---

## Anti-Patterns

### Product & Architecture

- **Promise.all for dependent deletions:** FK constraints dictate order. Delete children before parents, sequentially. Promise.all can leave orphaned records or FK violations.

- **Generic CRUD scaffolds for behavioral products:** Products like Pimpi and TLOM have specific behavioral models. A generic scaffold misses the core loop. Design the architecture around the product's behavior, not the data model.

- **Optimistically proceeding on external API failure:** WorkOS, Supabase storage, S2S calls — check return values. On garbage: fail closed, don't optimistically continue. Missing secrets? Fail. External API returns garbage? Fail.

- **Investing in the dying:** When a feature or app is deprecated, do minimum viable fixes. Don't improve, don't refactor. The investment has negative expected value.

### Working with AI

- **Treating AI as magic:** Always ground suggestions in actual capabilities and limitations. "LLMs are transforming EdTech" is noise. Specific pipeline improvements with measured impact is signal.

- **Monolithic context for complex tasks:** Don't try to hold 5 projects in one conversation. Decompose into parallel investigations with clear aggregation points.

- **Guessing at stale data:** Memory records, file paths, function names — all decay. Verify before recommending. Grep before claiming a function exists.

### Communication

- **Performative strategy:** Bloated plans, process for its own sake, strategy decks that sound impressive but say little. Cut to the missing decisions: what are we trying to change, why now, what are we choosing not to do.

- **Treating stakeholder tension as a communication problem:** If alignment is breaking, identify where and who needs to own what. Don't just say "improve alignment."

- **Option overload:** Presenting five approaches when one is clearly best. Decision fatigue is the enemy. Recommend. Explain the one trade-off that matters. Move.

### Kids & Family Products

- **Gamification as engagement:** Leaderboards, XP, loot boxes, comparisons between kids — all rejected. These manipulate, they don't serve. The app should be there when kids show up, not guilt them when they don't.

- **"Earn" framing:** "Earn stamps by helping out!" sounds like payment. "Do activities. Get stamped." is matter-of-fact. Language shapes perception.

- **Inactivity surveillance:** No "your child hasn't been active" notifications. No parent dashboards highlighting inactivity. If a kid takes a week off, tomorrow is just another day.

---

## Decision Frameworks

### Trade-off hierarchy (when goals conflict)

1. Family commitments > work deadlines (always)
2. Working prototype > comprehensive documentation (unless audience is legal/financial/contractual)
3. Strategic correctness > speed (for irreversible decisions)
4. Speed > completeness (for reversible decisions)
5. Tatoma client delivery > internal venture work (pays the bills, generates patterns)
6. User-facing correctness > cross-platform parity > ship speed > architectural durability > code elegance

### Scope evaluation

Before taking on work: Does this conflict with a school pickup? Does this overlap with a calendar event? Is there a budget implication? What's currently in the queue? Is this the highest-leverage use of the next 2 hours?

### When to go deep vs. move fast

- **Go deep:** Compliance, data safety, legal structures, naming, equity, kid-facing anything
- **Move fast:** UI iteration, internal tools, experiment validation, content drafts
- **Ask first:** Architecture changes, new dependencies, scope expansion, anything touching multiple ventures

---

*Add entries when a pattern proves itself (succeeds 3+ times) or an anti-pattern bites (fails memorably). Remove entries that no longer apply.*
