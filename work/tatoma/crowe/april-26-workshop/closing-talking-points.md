# Wrap-up & Next Steps — Talking Points
## 16:50 – 17:00 | The final 10 minutes

**Audience:** Bram & Marieke (Crowe Foederer)
**State of the room:** Four hours in. Two Claude demos, a transition, three Copilot Studio sessions. Coffee is gone. Brains are full. They're energized but tired.

**Tone:** Crisp, forward-looking, concrete. Every sentence earns its place. Don't summarize what they just lived through — they remember. Pivot fast to priorities and the ask.

**The ask by the end of 10 minutes:** (1) their #1 priority use case, (2) a yes to a pilot, (3) a date for the follow-up.

---

## Minute 1–3 · Quick recap (3 min)

### Opening frame
> "We're not going to relive the afternoon. You lived it. But I want to say one sentence about each use case and then land on the headline."

### One sentence per use case

**UC1 — IM Review (Claude):**
> "33 pages of Dutch IM, analyzed from a buyer's perspective in under two minutes. Real reasoning, not keyword scanning."

**UC2 — NBO vs. Term Sheet (Claude):**
> "Cross-document comparison surfaced the EUR 150K earn-out gap, the management fee mismatch, and the working capital language — exactly the kind of detail that gets missed on a Friday afternoon."

**UC3 — Cijferopstelling (Copilot Studio):**
> "We built it live. It wasn't perfect, but we proved the pattern works in your stack and we know exactly what it takes to make it production-ready."

**UC4 — Waarderingsmodel (Copilot Studio):**
> "Seventeen sheets, formula-heavy. Realistic take: the DCF is automatable soon, the full ValuePlan is a longer horizon. We know the shape of that work now."

**UC5 — Teaser (Copilot Studio):**
> "The quick-win candidate — three slides, clean template, IM as source. Lowest effort, highest visible impact."

**UC6 — Auditfiles (Architecture):**
> "88 MB XML, 99K GL lines. AI can't read it raw — nobody's can. We sketched the preprocessing pipeline. This one's a real engineering project, not a no-code flow."

### The headline

*(Say this one slowly, make eye contact.)*

> **"AI can meaningfully accelerate your M&A workflows — today, not someday. Some of it is ready to ship. Some of it needs real engineering. But none of it is science fiction anymore."**

---

## Minute 4–6 · Priority exercise (3 min)

### The question
> "Here's the question I want you to answer together, out loud: if you could have one of these six use cases working in production next month — not a prototype, not a demo, actually used by your team on live deals — which one is it?"

### How to run it
- **Don't let them hedge.** If they say "probably UC3 or UC5" — push: "Pick one. We'll revisit the other next."
- **Ask the follow-up:** "Why that one? What does it unlock?" The reason tells you more than the ranking does.
- **Capture visibly.** Write it on the whiteboard or open a note on screen. Making it visible makes it real.
- **Then ask for #2 and #3** — you need a pipeline, not just a pilot.

### If they get stuck, prompt with framing
- "Which one would save the most hours per deal?"
- "Which one would be visible to your clients — or stays internal?"
- "Which one would be the easiest 'win' to build internal momentum?"

### Our honest expectation *(for your back pocket, don't volunteer unless asked)*
- **Most likely #1:** UC3 (cijferopstelling) or UC5 (teaser). Both are high-frequency, template-based, and demonstrably feasible.
- **Less likely #1 but high value:** UC1/UC2 as Copilot agents — but those require rebuilding the Claude magic in Copilot, which is a harder translation.
- **Probably not #1 for pilot:** UC4 (too complex) and UC6 (too much upstream plumbing).

### Land the moment
> "Okay — [UC name] it is. That's what we're going to build."

---

## Minute 7–9 · Next steps (3 min)

### Propose the pilot (be specific, don't leave it open)

> "Here's what we propose. A 4-week pilot on [UC name]. Two weeks to a working POC, two more to harden it into something your team can actually use on the next deal that comes in."

### The split

**Tatoma builds:**
- The Copilot Studio flow, agent, and any custom AI Builder models
- The SharePoint / template structure if needed
- A one-page runbook so anyone on your team can trigger and review the output
- Weekly check-ins so we don't disappear into a black box

**Crowe tests:**
- Provide 2–3 real deals' worth of source material (properly anonymized or under NDA — your call)
- Bram and Marieke run the flow on real work, flag where it breaks or underperforms
- Honest feedback loop — we'd rather hear "this output is useless" in week 2 than week 4

**Together we iterate:**
- Weekly 45-minute sync — short, focused, "what broke, what worked, what's next"
- Open Slack/Teams channel for in-between questions

### Timeline, concretely

| Week | Milestone |
|------|-----------|
| Week 1 | Environment ready, first working flow end-to-end (rough) |
| Week 2 | POC demo — run on one real deal, assess quality honestly |
| Week 3 | Harden: error handling, edge cases, prompt tuning, UI polish |
| Week 4 | MVP review — decide: ship to the team, extend scope, or pivot |

### The follow-up session date

> "Let's put a date on the calendar right now for the 4-week review. Looking at Tuesday May 12 or Wednesday May 13 — which works?"

*(Get the commitment before the energy drops. If neither works, don't leave without an alternative date.)*

### Pricing / scope note *(only if they ask)*
> "We'll send a short proposal tomorrow with scope and pricing — nothing you haven't already discussed with Sander. If the pilot succeeds we talk about the compound vision. If it doesn't, you've spent four weeks and learned a lot."

---

## Minute 10 · Closing (1 min)

### Thank them — specifically
> "Before we wrap — thank you. Real thank you. You gave us real case materials, real deals, and you engaged with this for four hours straight. That's not normal, and it's why today was useful instead of generic."

### The compound vision *(the one slide in your head you want them leaving with)*

> "Here's where this goes. Today we looked at six use cases as if they were separate. They're not. They're a pipeline."

*(Trace it on the whiteboard or in the air.)*

> **Audit files → Cijferopstelling → Valuation → IM → Teaser**

> "Each one feeds the next. Do them all, and a deal that takes your team three weeks of grunt work to prepare takes three days of expert review on AI-generated drafts. That's the actual prize. Today was the first brick."

### The send-off
> "We're excited to build this with you. Let's go make something real."

*(Then shake hands, close laptops, don't linger. End on energy, not logistics.)*

---

## Cheat sheet — the 4 things that MUST happen in these 10 minutes

1. **Headline landed:** "AI can meaningfully accelerate your M&A workflows — today, not someday."
2. **Priority picked:** one use case, out loud, on the board.
3. **Pilot agreed:** 4-week POC on that use case, with clear Tatoma/Crowe split.
4. **Follow-up date:** calendar invite sent before they leave the room.

If all four happen, the workshop was a success. If you had to cut anything, cut the recap — they lived it.

---

## Tripwires & flex

- **If they can't pick a #1:** propose UC5 (teaser) as the quick-win pilot. Low risk, fast to show value, builds internal appetite for the bigger ones.
- **If they push back on 4 weeks:** offer a 2-week lightweight POC instead. Don't argue about timeline — get the yes and the follow-up date.
- **If they say "let us think about it":** fine — but pin the follow-up call for early next week, not "sometime." Momentum dies in vagueness.
- **If someone else on their side needs to approve (IT, partner, etc.):** ask who, and offer to join that conversation. Don't leave it to an internal relay.
- **If the energy has crashed:** cut to the compound-vision close, skip the Tatoma/Crowe split detail (send it by email tomorrow), get the date, shake hands.
