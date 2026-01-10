# AI-Assisted Marketing Transformation: Research Prompts (v2)

*For ChatGPT deep research session, January 2026*
*Updated: 2026-01-09 — Aligned with transformation frame*

## Context for All Prompts

Use this context block at the start of each prompt:

```
CONTEXT: Gynzy is a web-based interactive whiteboard platform for elementary education (K-8) in Netherlands and Flanders. Teachers use it for lesson building, classroom management tools, Live Lessons broadcast to student devices, and AI-generated quizzes.

CURRENT STATE:
- 3-person marketing team
- 210 Intercom flows total, 27 currently live
- 19,725 users in onboarding flows (NL + Flanders)
- Static, attribute-based segmentation ("grade level", "region", "plan tier")
- Coverage gaps: not all users are in a flow
- Overlap: users can be in multiple flows simultaneously
- Data stack: BigQuery → Census (daily sync) → Intercom
- Events sent directly from frontend (real-time capable)
- AI tools available: OpenAI (contractual), Gemini, Claude

TRANSFORMATION GOAL:
Move from static manual segments to a behavior-driven, AI-assisted "personal communication engine" with:
- Behavior-based segmentation (not just attributes)
- AI microsegmentation (AI identifies clusters)
- Real-time triggers (action-based, not batch)
- Self-learning optimization (continuous improvement)
- Human-in-the-loop approval (AI suggests, human confirms)

SPRINT DELIVERABLES (Jan 12-16):
- Transformation vision/roadmap
- Working prototype for coverage + overlap (P0/P1)
- Demo of AI microsegmentation capability (P2)
```

---

## Prompt 1: Transformation Patterns — Static to Behavior-Driven

```
[Insert context block above]

RESEARCH QUESTION:
How have B2C and B2B2C companies successfully transformed their marketing from static attribute-based segmentation to behavior-driven, AI-assisted segmentation?

Looking for:
1. Case studies of companies that made this transition (especially EdTech, SaaS, or subscription businesses)
2. Common stages in the transformation journey
3. What "behavior-driven" looks like in practice — specific signals that work
4. Pitfalls and failure modes to avoid
5. How long these transformations typically take and what quick wins come first

Specific interest in companies using Intercom, Customer.io, or similar platforms.
```

---

## Prompt 2: Behavior Signals for EdTech Engagement

```
[Insert context block above]

RESEARCH QUESTION:
What behavioral signals in a classroom instruction platform create meaningful, actionable segments?

Available signals in Gynzy:
- Logins (frequency, time of day, day of week)
- Lessons created vs. lessons delivered
- Live Lesson sessions (broadcast to students)
- Quiz creation and student completion rates
- Tool usage patterns (timer, name picker, group maker)
- Cloud storage activity
- School affiliation and colleague activity

Looking for:
1. Which behavior combinations indicate engagement trajectory (growing, stable, declining)?
2. What patterns distinguish "ready to expand" teachers from "satisfied solo users"?
3. Examples of behavior-based segments from EdTech or SaaS (e.g., "power user emerging", "at risk of churn", "champion potential")
4. How to define meaningful thresholds (e.g., "3+ lessons delivered this week" vs "logged in once")
5. Behavior patterns that indicate readiness for specific interventions (upsell, re-engagement, feature adoption)
```

---

## Prompt 3: AI Microsegmentation — Practical Implementation

```
[Insert context block above]

RESEARCH QUESTION:
How do companies implement AI-driven microsegmentation that automatically identifies user clusters — while keeping humans in the loop?

Specific questions:
1. What AI/ML approaches work for finding meaningful user clusters? (clustering algorithms, embeddings, propensity models)
2. How do you make AI-generated segments interpretable to marketers? (they need to understand and approve)
3. What's the right granularity? (too broad = generic, too narrow = unmanageable)
4. How do you handle segment drift over time?
5. Examples of tools or architectures that enable this (especially with BigQuery as data source, Intercom as activation layer)

Constraint: Must maintain human approval before any campaign deploys. Looking for "AI suggests, human confirms" patterns.
```

---

## Prompt 4: Real-Time Triggers — Architecture and Patterns

```
[Insert context block above]

RESEARCH QUESTION:
How do companies implement real-time behavioral triggers for marketing automation — moving from batch campaigns to moment-based interventions?

Context: Gynzy sends events directly from frontend to their system (real-time capable). They want triggers like:
- "Just finished a lesson" → send tip or social proof
- "Created quiz but students haven't taken it" → nudge
- "First Live Lesson completed" → celebration + next step
- "Colleague at same school just signed up" → expansion opportunity

Looking for:
1. Technical architectures for real-time trigger systems (event streaming, webhook patterns)
2. How to balance real-time responsiveness with not overwhelming users
3. Trigger design patterns that work (timing, frequency caps, cooldowns)
4. How to integrate real-time triggers with existing Intercom flows
5. Examples from EdTech or SaaS of effective moment-based messaging
```

---

## Prompt 5: Coverage and Overlap — Detection and Prevention

```
[Insert context block above]

RESEARCH QUESTION:
How do marketing teams detect and prevent coverage gaps and flow overlap in complex automation systems?

Current problem:
- 210 flows, 27 live — some users in multiple flows (overlap), some in none (gap)
- No visibility into who's in what
- Intercom doesn't prevent overlap natively

Looking for:
1. Methods to audit existing flows and map coverage
2. How to detect overlap before it happens (pre-activation check)
3. Architectural patterns for "one user, one primary flow" or priority-based flow assignment
4. Dashboard/visibility solutions that show coverage and overlap in real-time
5. How to consolidate 210 flows into manageable groups without breaking existing campaigns
```

---

## Prompt 6: Self-Learning Segments — Continuous Optimization

```
[Insert context block above]

RESEARCH QUESTION:
How do companies implement "self-learning" segmentation that continuously optimizes based on performance data?

Annemarie's vision: "Segments are not fixed, but continuously re-optimized based on data and feedback."

Looking for:
1. What does "self-learning" mean in practice? (A/B testing? Reinforcement learning? Manual review cycles?)
2. How do you measure segment effectiveness? (conversion, engagement, revenue attribution)
3. Feedback loops: how does campaign performance inform segment definition?
4. How to balance automation with human oversight (segments that auto-adjust vs. segments that surface recommendations)
5. Examples of companies doing this well — what does their process look like?
```

---

## Prompt 7: Human-in-the-Loop Workflows for AI Marketing

```
[Insert context block above]

RESEARCH QUESTION:
What are best practices for human-in-the-loop AI marketing workflows where AI assists but humans approve?

Constraint: Gynzy is firm that no campaign deploys without human approval. They want AI to:
- Suggest segments
- Draft content variants
- Flag coverage gaps
- Detect overlap
- Recommend optimizations

But humans must:
- Approve segment definitions
- Approve content before send
- Make final activation decision

Looking for:
1. Workflow designs that make AI suggestions easy to review and approve
2. How to present AI recommendations in a way marketers trust and understand
3. Approval UX patterns (single approval, tiered review, exception-based)
4. How to handle AI confidence levels (high confidence = auto-suggest, low = flag for review)
5. Examples of marketing tools with good human-in-the-loop design
```

---

## How to Use These Prompts

1. **Run each prompt through ChatGPT** (Deep Research mode if available)
2. **Capture key findings** in a synthesis doc
3. **Feed into NotebookLM** with:
   - Transcript insights (transcript-insights-2025-12-12.md)
   - Annemarie's Figma (figma-annemarie.png)
   - COPE assessment (cope-assessment-2026-01-08.md)
4. **Synthesize for Monday** — pull out patterns that inform the prototype design

---

## Priority Order

| Prompt | Priority | Rationale |
|--------|----------|-----------|
| **5. Coverage + Overlap** | P0 | Immediate prototype need |
| **2. Behavior Signals** | P1 | Foundation for behavior-based segments |
| **1. Transformation Patterns** | P1 | Informs vision/roadmap |
| **4. Real-Time Triggers** | P2 | Demo capability for sprint |
| **3. AI Microsegmentation** | P2 | Demo capability for sprint |
| **7. Human-in-the-Loop** | P2 | Workflow design for prototype |
| **6. Self-Learning** | P3 | Vision/roadmap input |

---

*Created: 2026-01-07*
*Updated: 2026-01-09 — v2 aligned with transformation frame*
