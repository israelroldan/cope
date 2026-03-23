# Worktree Brief: AI Foundations — Module Content

**Roadmap ID:** Sprint 3 (Learn v1)
**Priority:** P0 | **Workstream:** Studio Experience
**Status:** Ready for implementation (after Academy Engine is built)
**Design doc:** [Learn v1 Design](./learn-v1-design.md) (v8)
**Depends on:** Academy Engine (worktree-academy-engine.md), Use Case Generator (implemented), Prompt Library (shipped)

### Version History

| Version | Date | Changes |
|---------|------|---------|
| **v1** | **2026-02-24** | **Initial brief — 6 modules restructured: Foundation (3) + Security (1) + Advanced (2). Modules build through the platform — by end of Foundation block, employee has used every core feature. Module 6 = agentic workflows.** |

---

## The Core Idea

The Academy Engine (separate worktree) builds the system: paths, modules, progress tracking, exercise runner, certificates. This worktree is about the **content** that goes into that system — the AI Foundations learning path.

The 6 modules are organized in three blocks:

```
FOUNDATION (Modules 1-3)
  By the end: employee has a mental model for AI, has discovered personal use cases,
  has tried a prompt with real data, iterated on it, saved it to their library, and
  updated their use case. They've used every core feature of the platform and created
  real personal data.

SECURITY (Module 4)
  Data privacy + responsible AI use. Practical, not fear-based.

ADVANCED (Modules 5-6)
  The AI landscape (what tools exist, when to use what) and agentic workflows
  (multi-step AI automation — where things are heading).
```

The key design principle: **learning happens through the platform, not about the platform.** The Foundation block doesn't just teach concepts — it walks the employee through actually using the Use Case Generator, the prompt runner, and the prompt library. The exercises produce real artifacts (saved use cases, saved prompts) that persist after the learning is done.

---

## Module Structure

Each module follows the same structure:
1. **Concept** (3-5 min read) — one clear idea, conversational tone, real examples
2. **Exercise** (5-10 min) — hands-on task. Completing it unlocks the next module.

Exercise types:
- **`prompt_execution`** — uses the built-in prompt runner on the module page (fill variables → run → see result)
- **`self_report`** — employee does the task (possibly across platform sections or with external tools) and clicks "Mark as Done"

---

## Module 1: What AI Does (and Doesn't) — FOUNDATION

### Content Direction

Builds the right mental model for LLMs. Not magic, not a search engine — a language tool that's exceptionally good at some things and unreliable at others. Covers what AI excels at (drafting, summarizing, brainstorming, reformatting, pattern-matching in text) and what it's bad at (factual accuracy, math, recent events, nuance, confidential reasoning). The goal is to prevent both over-trust and dismissal. After this module, the employee knows where to point AI and where not to bother.

### Exercise (prompt_execution)

"Ask an AI to do two things: rewrite a short paragraph of yours in a more professional tone (something it's great at), then ask it to calculate a specific business metric from raw numbers (something it's unreliable at). Compare the quality of both outputs."

The exercise prompt should include both tasks with variable slots for the employee's own paragraph and numbers. The point is experiencing the contrast firsthand.

### Takeaway

You now know where AI shines and where it doesn't. That's more than most people.

---

## Module 2: Find Your Use Cases — FOUNDATION

### Content Direction

This is where the employee runs the Use Case Generator as part of the learning flow. The module content explains: what makes a good AI use case (repetitive, language-heavy, pattern-based tasks), how to think about your daily work through the "AI lens" (which tasks eat time, which involve reformatting/summarizing/drafting), and why personalized use cases beat generic "101 AI use cases" lists. The content builds anticipation for the exercise, which is the main event.

### Exercise (self_report)

"Open the Use Case Generator (Discover section) and complete the wizard. Tell it about your role, select tasks you actually do, and let it find AI opportunities in your work. Save at least 2 use cases that resonate."

Self-reported because the exercise happens in the Discover section — the employee navigates there, runs the wizard, and comes back to mark it done. By the end, they have personal use cases saved.

### Takeaway

You've identified specific AI opportunities in your actual work. This isn't abstract anymore.

---

## Module 3: Try a Prompt, Iterate, Save — FOUNDATION

### Content Direction

The culmination of the Foundation block. Covers: the anatomy of a good prompt (role, context, task, format), why the first output is always a draft (the honest expectations principle), how to iterate (add context, give examples, be specific about what "good" looks like), and the value of saving refined prompts for reuse. The key lesson: what you put in determines what you get out — and it's a skill that improves with practice.

### Exercise (prompt_execution + self_report)

This is a multi-step exercise that builds to a complete loop:

1. **Pick a use case** — choose one of the use cases you saved in module 2
2. **Try a prompt** — use the built-in runner to run a prompt for this use case with your real data and context
3. **Review and iterate** — look at the output. What's good? What's missing? Try a variation with more context, better instructions, or an example of what "good" looks like
4. **Save to library** — when you have a prompt that works, save it to your prompt library (navigate to Prompts section)
5. **Update your use case** — go back to Discover and mark the use case as "Tried"

The prompt_execution part (steps 2-3) happens in the built-in runner. Steps 4-5 are self-reported.

**By the end of this module: the employee has discovered use cases (module 2), tried a prompt with real data, iterated to improve it, saved a prompt to their library, and updated their use case status. Foundation complete — they've used every core feature of the platform and created real personal data.**

### Takeaway

You've gone from "what can AI do?" to having a personal prompt in your library that you built, tested, and refined with your own data. That prompt is yours — use it whenever you need it.

---

## Module 4: Security & Responsible AI Use — SECURITY

### Content Direction

Covers both data privacy and responsible use practices.

**Data privacy:** Where does your data go when you use different AI tools? What's the difference between consumer AI (ChatGPT free tier) and enterprise/API tools (where data isn't used for training)? What should you never paste into an AI tool — confidential data, personal information, proprietary code, client data. What does your organization's AI policy say? If the org has set up specific approved tools, highlight those.

**Responsible use:** Hallucination risks and how to verify AI output — AI can be confidently wrong. Bias in AI responses. When AI is the wrong tool entirely: high-stakes decisions, legal/medical advice, situations requiring empathy or nuanced judgment. The critical review habit: always verify, never blindly trust.

**Tone:** Practical, not fear-based. The goal is confident, informed use — not avoidance. "Now that you know what AI can do, here's how to use it responsibly."

### Exercise (prompt_execution)

"Test AI's limitations: paste a paragraph that contains a factual claim and ask the AI to verify it. Then ask it to generate content about a topic where accuracy matters (company financials, legal requirements, industry regulations). Review both outputs critically — where is the AI confident but wrong? What would you need to verify before using this output?"

The exercise teaches the critical review habit through direct experience.

### Takeaway

You know what to share and what not to share with AI tools, and you've seen firsthand why "trust but verify" is the right approach.

---

## Module 5: The AI Tool Landscape — ADVANCED

### Content Direction

Maps the current AI tool ecosystem so employees know what's available and what each tool does best.

**Categories:**
- Conversational AI (ChatGPT, Claude) — general-purpose assistants, good for drafting, brainstorming, analysis
- Search and research (Perplexity, Google AI) — when you need current information with sources
- Image generation (Midjourney, DALL-E) — visual content, mockups, creative assets
- Code assistants (GitHub Copilot, Cursor) — for technical teams
- Document and productivity tools (Copilot for Microsoft 365, Notion AI) — AI embedded in work tools
- Specialized tools by industry — what exists in your specific field

If the organization has approved or recommended specific tools, those should be highlighted (this can use org context if available). Honest about overlaps — many tools do similar things — and about trade-offs (quality vs speed vs cost vs privacy).

Helps employees match their use cases (from module 2) to the right tools — "for this type of task, this tool tends to work best."

### Exercise (self_report)

"Take your saved use cases and map each one to the AI tool that would be best for it. For at least one use case, try a tool you haven't used before (even if just the free tier). Write down: which tool did you try, what was it good at, and would you use it again?"

Self-reported because this involves using external tools.

### Takeaway

You know what's out there and which tool to reach for depending on the task. You're not locked into one AI tool for everything.

---

## Module 6: Agentic Workflows — ADVANCED

### Content Direction

Introduces the next level beyond single prompts: AI agents and multi-step automated workflows.

**What "agentic" means in practical terms:** AI that can take multiple steps, use tools, search the web, write and run code, work through complex tasks without hand-holding at every step. The difference between asking AI a question (a prompt) and giving AI a mission (an agent workflow).

**What current agent tools can do:** Claude with computer use and tool calling, GPT with actions and custom GPTs, Copilot agents, custom-built workflows. Realistic examples of agentic workflows in a work context: research → synthesize → draft a summary; analyze multiple reports → identify patterns → draft recommendations; monitor a data source → alert when conditions are met.

**Honest about current limitations:** Agents can go off-track without clear instructions. They work best for well-defined multi-step tasks rather than open-ended creative work. They're powerful but need oversight — think "very capable intern" not "autonomous expert." The reliability is improving fast.

**Forward-looking:** This is where AI is heading. Understanding agentic workflows now — even just conceptually — gives you a head start. The employees who understand how to break work into steps that agents can handle will be the ones who benefit most as these tools mature.

### Exercise (self_report)

"Think about one of your use cases that involves multiple steps (e.g., 'research competitors then write a summary', 'analyze three reports then draft recommendations', 'process incoming requests and categorize them'). Break it down into steps. Which steps could an AI agent handle end-to-end? Which still need your judgment at each stage? Write out what an ideal agentic workflow would look like for this task — even if the tools don't exist yet to automate it fully."

Self-reported because this is a thinking/planning exercise about future capabilities.

### Takeaway

You understand where AI is going — not just single prompts, but multi-step workflows. You can already start thinking about your work in terms of "what could an agent handle?" That's the skill that will compound as these tools improve.

---

## Implementation Notes for Claude Code

1. **This is a content-loading worktree, not a feature-building worktree.** The Academy Engine (paths, modules, progress, exercises, certificates) should already be built. This worktree creates the seed migration that loads the AI Foundations path and its 6 modules into the system.

2. **Create the learning path** — one `learning_paths` record: "AI Foundations", description covering the three-block structure, estimated ~3 hours total, published = true.

3. **Create 6 module records** — each with `content_md` (placeholder text based on the content direction above — co-founders will refine), `exercise_type`, `exercise_prompt`, and for `prompt_execution` exercises: `exercise_prompt_template` + `exercise_prompt_variables`.

4. **Exercise prompt templates** — for modules 1, 3, and 4 (the `prompt_execution` exercises), create actual prompt templates with variable definitions that the built-in runner can execute. Use the exercise descriptions above as guidance for what the prompts should do.

5. **Module 3 is hybrid** — it has both a `prompt_execution` component (try/iterate in the runner) and a `self_report` component (save to library, update use case). For the data model, treat it as `prompt_execution` (the runner part) with the self-report steps described in the exercise text. The "Mark as Done" button appears after the prompt execution, and the exercise description guides the employee through the additional save/update steps.

6. **Content quality** — the placeholder content should be good enough to test the full flow but clearly marked as draft. Use `<!-- DRAFT: Co-founder review needed -->` at the top of each `content_md`. The content direction above gives enough structure to write meaningful 3-5 paragraph placeholders.

7. **i18n-ready** — all module titles, descriptions, exercise prompts, and content should follow the same i18n pattern as department templates and starter packs. Prepare for localization even though v1 is English-only.

8. **Exercise prompt variables** — design them to be genuinely useful with real employee data:
   - Module 1: `{{your_paragraph}}` (text to rewrite), `{{your_numbers}}` (data to calculate)
   - Module 3: `{{use_case_context}}` (what the task is), `{{your_data}}` (real input data), `{{what_good_looks_like}}` (desired output description)
   - Module 4: `{{factual_claim}}` (text with a claim to verify), `{{accuracy_topic}}` (topic requiring accurate content)
