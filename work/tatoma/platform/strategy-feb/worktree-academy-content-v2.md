# Worktree Brief: Academy Content — 9 Modules

**Roadmap ID:** Sprint 3 (Learn v1) / Sprint 4 (Interactive v2)
**Priority:** P0 | **Workstream:** Studio Experience
**Status:** Ready for implementation (after Academy Engine is built)
**Design doc:** [Learn v1 Design](./learn-v1-design.md) (v12)
**Depends on:** Academy Engine (worktree-academy-engine.md), Interactive Learning Engine (worktree-interactive-learning.md), Use Case Generator (implemented), Prompt Library (shipped)

### Version History

| Version | Date | Changes |
|---------|------|---------|
| v1 | 2026-02-24 | Initial brief — 6 modules: Foundation (3) + Security (1) + Advanced (2). Simple exercises (prompt_execution, self_report). |
| **v2** | **2026-02-25** | **Restructured to 9 modules across 3 paths (~1.5h each). Expanded Security from 1 module to 3 (Data Privacy, Spotting Mistakes, Responsible AI). Added capstone Module 9 (Your AI Action Plan). Content directions aligned with interactive learning activity sequences. Total ~4.5h.** |

---

## The Core Idea

The Academy Engine (separate worktree) builds the system: paths, modules, progress tracking, exercise runner, certificates. The Interactive Learning Engine (separate worktree) builds the activity types and lesson structure. This worktree is about the **content** — what each module teaches, the learning objectives, and the content direction for activity authoring.

The 9 modules are organized in three paths:

```
PATH: AI FOUNDATIONS (~1.5h)
  Module 1: What AI Does (and Doesn't)         ~30 min
  Module 2: Find Your Use Cases                 ~25 min
  Module 3: Try, Iterate, Save                  ~35 min
  → Employee has used every core platform feature. Has saved use cases and prompts.

PATH: SECURE AI USAGE (~1.5h)
  Module 4: Data Privacy & What to Share        ~30 min
  Module 5: Spotting AI Mistakes                ~30 min
  Module 6: Responsible AI in Practice          ~25 min
  → Employee knows what to protect, what to verify, and when NOT to use AI.

PATH: AI WORKFLOWS (~1.5h)
  Module 7: The AI Tool Landscape               ~30 min
  Module 8: Agentic Workflows                   ~30 min
  Module 9: Your AI Action Plan (capstone)      ~30 min
  → Employee has a personal AI strategy and a concrete 30-day action plan.

TOTAL: 9 modules | ~4.5 hours | Certificate on completion
```

### Design Principle

**Learning happens through the platform, not about the platform.** The Foundation block walks the employee through actually using the Use Case Generator, prompt runner, and prompt library. The Security block builds real instincts through rapid-fire exercises, not just reading about risks. The Advanced block ends with a capstone that produces a real action plan. Every path creates artifacts that persist beyond the learning.

---

## PATH 1: AI FOUNDATIONS

### Module 1: What AI Does (and Doesn't)

**Learning Objectives:**
- Build the right mental model for LLMs — not magic, not a search engine
- Understand what AI excels at (drafting, summarizing, brainstorming, reformatting)
- Understand what AI is unreliable at (factual accuracy, math, real-time data, nuanced judgment)
- Prevent both over-trust and dismissal

**Content Direction:**
Conversational, myth-busting tone. Start with what most people get wrong about AI. LLMs predict the next most likely word — that's why they're great at language tasks and bad at facts. Use concrete contrasts: show AI brilliantly rewriting a paragraph, then show it confidently fabricating a statistic. The aha moment is experiencing the contrast firsthand. Cover: drafting, summarizing, brainstorming, reformatting (strengths) vs. factual accuracy, precise math, current events, confidential reasoning (weaknesses).

**Key Vocabulary Introduced:** LLM, hallucination, token, context window, prompt

**Connection to Platform:** None yet — generic examples only. Sets up Module 2.

**Exit State:** Employee knows where AI shines and where it doesn't.

---

### Module 2: Find Your Use Cases

**Learning Objectives:**
- Recognize characteristics of strong AI use cases (repetitive, language-heavy, pattern-based)
- Apply the "AI lens" to daily work — identify tasks that eat time with reformatting/summarizing/drafting
- Use the Use Case Generator to discover personal AI opportunities
- Save at least 2 use cases that resonate

**Content Direction:**
Shift from theory to personal application. Explain the three traits of a good AI use case: repetitive (you do it often), language-heavy (involves writing/reading/reformatting), and draft-friendly (doesn't require perfect accuracy on first pass). Give examples across different job functions so every employee can relate. Build anticipation for the Use Case Generator — the exercise IS the main event.

**Connection to Platform:** Module exercise sends the employee to the Use Case Generator (Discover section). After this module, `personal_use_cases` has data that feeds Modules 3 and 9.

**Exit State:** Employee has at least 2 saved use cases based on their actual job. This isn't abstract anymore.

---

### Module 3: Try, Iterate, Save (Foundation Culmination)

**Learning Objectives:**
- Understand prompt anatomy: role, context, task, format
- Learn that the first AI output is always a draft — iteration is the skill
- Practice building, running, and iterating on a prompt with real data
- Save a working prompt to the library and update use case status

**Content Direction:**
The culmination of the Foundation block. This module has more activities than the others (~13) because it's where everything comes together. Covers prompt anatomy with annotated examples, then progresses through identification (highlight the role, select the context), evaluation (spot bad prompts, rank improvements), and creation (build a prompt from your own use case). The key lesson: what you put in determines what you get out — and it's a skill that improves with practice.

**Connection to Platform:** The `guided_prompt_builder` pulls from the employee's saved use cases (Module 2). The resulting prompt saves to the prompt library. The use case status updates to "Tried." This closes the loop — the learning produces real artifacts.

**Exit State:** Employee has a working prompt in their library that they built, tested, and refined with their own data. They've used every core platform feature. Foundation complete.

---

## PATH 2: SECURE AI USAGE

### Module 4: Data Privacy & What to Share

**Learning Objectives:**
- Classify data types by sensitivity (safe to share, needs anonymization, never share)
- Build the reflex for rapid data classification decisions
- Practice anonymizing data in prompts while maintaining usefulness
- Understand the difference between consumer and enterprise AI tool data handling

**Content Direction:**
Start with the practical question: when you type something into an AI tool, where does it go? Consumer tools may use your input for training; enterprise tools typically don't — but even with enterprise tools, some data should never leave your systems. The module is built around the data classification exercise — sorting data types into categories IS the lesson. Binary stack rapid-fire builds reflexes. The final exercise proves that anonymized data still produces useful AI output.

**Key Categories:** Safe to Share (public info, generic industry data, your own writing), Anonymize First (customer details, internal metrics with context), Never Share (PII, salary data, proprietary strategy, confidential client data, credentials)

**Connection to Platform:** Uses generic workplace scenarios — no personal data connection needed. Security training works best with standardized examples.

**Exit State:** Employee can instantly classify data by sharing safety and knows how to anonymize effectively.

---

### Module 5: Spotting AI Mistakes

**Learning Objectives:**
- Recognize hallucinations — plausible but fabricated facts, statistics, and citations
- Identify bias in AI outputs — skewed framing, representation gaps
- Develop the verification habit: treat every output as a draft
- Know which AI outputs need verification vs. which are safe to use as-is

**Content Direction:**
AI doesn't know when it's wrong — it produces every answer with the same confident tone. This module trains the critical eye. Start with an annotated example showing a real hallucination (a fabricated statistic that looks perfectly plausible). Progress through error identification exercises. The core insight: style-based outputs (rewrites, brainstorms, summaries of YOUR text) are usually safe; fact-based outputs (statistics, citations, claims about the world) always need verification. Cover hallucinations, fabricated citations, confident speculation, outdated information, and bias patterns.

**Tone:** Not fear-based — empowering. "You're now the quality filter."

**Connection to Platform:** Uses generic examples. The prompt_runner exercise teaches a useful technique: asking AI to self-review its own output for potential errors.

**Exit State:** Employee has an instinctive "verify this" response when AI outputs facts, statistics, or citations.

---

### Module 6: Responsible AI in Practice

**Learning Objectives:**
- Know when NOT to use AI — even if technically possible
- Understand the ethical boundary: decisions affecting people require human judgment
- Practice AI disclosure and transparency habits
- Connect learning to the organization's AI policy

**Content Direction:**
The previous two modules covered WHAT to protect and HOW to verify. This module covers WHEN to step back entirely. Focus on scenarios: performance reviews (requires empathy), hiring decisions (bias risk + legal), client negotiations (requires judgment), medical/legal advice (requires expertise). Practical, not philosophical — teach through realistic workplace scenarios that the employee will actually face. Cover disclosure practices: when and how to communicate that AI was used. Reference the organization's AI policy as the authoritative guide for their specific context.

**Tone:** Empowering, not restrictive. "Use AI boldly, but use it wisely."

**Connection to Platform:** Reflection-focused. No creation activity — this module is about building ethical judgment, not producing artifacts.

**Exit State:** Employee knows where the ethical lines are and can make confident decisions about appropriate AI use. Security path complete.

---

## PATH 3: AI WORKFLOWS

### Module 7: The AI Tool Landscape

**Learning Objectives:**
- Map the current AI tool ecosystem by category (conversational, research, creative, code, productivity)
- Match tools to tasks — know which tool to reach for
- Understand tool chaining: using the right tool for each step of a complex task
- Identify approved/recommended tools for their organization

**Content Direction:**
No single tool is best at everything. This module builds a mental map. Categories: Conversational AI (ChatGPT, Claude) for drafting and brainstorming; Research tools (Perplexity, Google AI) for current info with citations; Image generation (Midjourney, DALL-E) for visual content; Code assistants (Copilot, Cursor) for technical teams; Productivity tools (Copilot for 365, Notion AI) for embedded AI in work tools. Be honest about overlaps and trade-offs. The key skill is tool selection — and knowing that chaining tools (research with Perplexity → draft with Claude) often beats asking one tool to do everything.

**Connection to Platform:** References the employee's saved use cases for context. The prompt_runner exercise asks AI to honestly assess its own strengths vs. specialized tools.

**Exit State:** Employee has a mental map of AI tools and knows which to reach for depending on the task.

---

### Module 8: Agentic Workflows

**Learning Objectives:**
- Understand "agentic AI" — multi-step, tool-using, autonomous task execution
- Distinguish between prompts (questions) and workflows (missions)
- Identify workflow components: triggers, steps, handoffs, checkpoints, guardrails
- Assess which tasks are suitable for agentic automation

**Content Direction:**
Forward-looking but grounded. Agentic AI can take multiple steps, use tools, search the web, write and run code — working through complex tasks with minimal hand-holding. Give realistic examples: research → synthesize → draft a summary; monitor a data source → alert when conditions change; analyze multiple reports → identify patterns → draft recommendations. Be honest about limitations: agents can go off-track without clear instructions, they need oversight, they work best for well-defined multi-step tasks. Frame as "very capable intern" not "autonomous expert." The key skill: breaking work into steps that agents can handle — this is where AI is heading, and understanding it now gives them a head start.

**Connection to Platform:** The open_response exercise asks the employee to design a workflow for one of their use cases, connecting back to their Module 2 data.

**Exit State:** Employee can think in workflows — breaking complex tasks into steps, knowing where AI fits and where humans must stay in the loop.

---

### Module 9: Your AI Action Plan (Capstone)

**Learning Objectives:**
- Prioritize saved use cases into quick wins, medium projects, and long-term bets
- Create a concrete 30-day AI action plan with specific use cases, tools, and success measures
- Build one final prompt for their #1 priority use case
- Graduate with both a certificate AND a real, actionable plan

**Content Direction:**
This is the "graduation project." No new concepts — pure application. The employee takes everything they've learned and builds a personal AI strategy. The sorting/ranking/placement activities help them prioritize their use cases. The guided_prompt_builder creates one final prompt for their top priority. The open_response is their 30-day plan. The tone should be celebratory and forward-looking: "You started wondering what AI could do. You're finishing with real tools and a real plan."

**Connection to Platform:** Pulls heavily from the employee's personal data — use cases from Module 2, prompts from Module 3, progress across all modules. The capstone is the most "connected" module — it ties everything together. The final content_card triggers the certificate.

**Exit State:** Employee has a concrete action plan, a final polished prompt in their library, and their certificate. They know exactly what to do with AI starting tomorrow.

---

## Implementation Notes for Claude Code

1. **This is a content-loading worktree.** The Academy Engine and Interactive Learning Engine should already be built. This worktree creates the seed data that loads the 3 paths and 9 modules into the system.

2. **Create 3 learning paths** — "AI Foundations" (modules 1-3), "Secure AI Usage" (modules 4-6), "AI Workflows" (modules 7-9). Each path ~1.5h estimated, published = true.

3. **Create 9 module records** — each with `content_type: "interactive"`. The activity sequences are defined in the Interactive Learning Engine worktree (Part 7). This worktree provides the content direction for authoring those activities.

4. **Module 3 is the longest** — 13 activities, ~35 min. It's the Foundation culmination and intentionally heavier.

5. **Module 9 needs dynamic data** — the sorting_buckets and ranking activities should attempt to pull from the employee's saved use cases. Fall back to generic examples if no personal data is available.

6. **Content quality** — use the content directions above to author activity content. Each module's activities are detailed in the Interactive Learning Engine worktree. Placeholder content should be marked as draft: `<!-- DRAFT: Co-founder review needed -->`.

7. **i18n-ready** — all module titles, descriptions, activity text, feedback strings should follow the same i18n preparation pattern. English-only for v1 but structured for localization.

8. **Path ordering** — Foundation must be completed before Security or Advanced unlocks. Security and Advanced can potentially be done in either order (TBD — may want Security before Advanced).

9. **Certificate trigger** — completing all 9 modules (all 3 paths) triggers the certificate. Each path completion could also trigger a path-level badge (future, not v1).

10. **Time estimates per module** — stored in `learning_modules.estimated_minutes`. Use the estimates from the Interactive Learning Engine worktree (Part 6 summary). These should be updated based on real usage data once live.
