# NotebookLM Synthesis Prompts

*For synthesizing 14 research documents (7 ChatGPT + 7 Gemini Deep Research)*
*Created: 2026-01-09*

---

## Sources to Upload

- 14 research documents (ChatGPT + Gemini, one per prompt)
- `transcript-insights-2025-12-12.md`
- `cope-assessment-2026-01-08.md`
- `as-is-draft-from-transcript.md`
- `to-be-draft-from-transcript.md`
- `figma-annemarie.png`

---

## Prompt 1: Key Patterns Across All Research

```
Across all the research documents, what are the most consistent patterns and recommendations that appear in multiple sources?

Focus on:
- Transformation approaches (static → behavior-driven)
- Coverage and overlap solutions
- AI microsegmentation methods
- Human-in-the-loop workflow patterns

List the top 10 patterns with which sources support each.
```

---

## Prompt 2: ChatGPT vs Gemini Comparison

```
Compare the findings from ChatGPT Deep Research vs Gemini Deep Research for the same prompts. Where do they:

1. AGREE strongly (consistent recommendations)
2. DISAGREE or contradict each other
3. COMPLEMENT each other (one adds depth the other missed)

Present as a table by prompt topic.
```

---

## Prompt 3: Prototype Recommendations

```
Based on all sources, what should a prototype for "coverage + overlap detection" actually include?

Give me:
1. Must-have features (P0)
2. Should-have features (P1)
3. Nice-to-have for demo (P2)
4. Technical approaches mentioned
5. Warnings or pitfalls to avoid
```

### Prompt 3b: Data Shape for Prototype (Follow-up)

```
Based on the prototype features you just described, what data would this prototype need to work with?

Define the data schema/shape including:

1. USER table — what fields describe a user?
   - Attributes (role, grade level, region, plan tier, school ID, etc.)
   - Behavior metrics (login count, lessons created, lessons delivered, etc.)
   - Timestamps (created_at, last_active, etc.)

2. FLOW/SEGMENT table — what fields describe a flow or segment?
   - Metadata (name, type, status, created_by, etc.)
   - Rules/conditions (entry criteria, exit criteria)
   - Performance metrics (users in flow, open rates, etc.)

3. USER_FLOW_MEMBERSHIP table — how do we track who's in what?
   - User ID, Flow ID, entry date, status, etc.

4. EVENTS table — what behavioral events should we track?
   - Event types (login, lesson_created, lesson_delivered, quiz_created, etc.)
   - Event properties (timestamp, user_id, metadata)

5. SCHOOL table — for expansion/penetration tracking
   - School ID, name, region, teacher count, active teachers, etc.

For each table:
- List recommended fields with data types
- Indicate which are required vs optional
- Note any relationships between tables
- Suggest realistic value ranges for synthetic data generation

Format as a data dictionary I can use to generate synthetic test data with tools like Tonic Fabricate.
```

---

## Prompt 4: Behavior Signals Synthesis

```
Synthesize all findings about behavior-based segmentation for EdTech. Create a concrete list of:

1. Recommended behavior signals for Gynzy specifically
2. Segment definitions that would work (e.g., "power user emerging", "at risk")
3. Threshold examples (what numbers/frequencies matter)
4. How these map to Gynzy's available data (logins, lessons, Live Lessons, quizzes)
```

---

## Prompt 5: Monday Presentation Ammo

```
Find the most compelling quotes, statistics, and examples I can use in Monday's workshop presentation. Looking for:

1. Quotes about why transformation matters
2. Stats on impact of behavior-driven vs static segmentation
3. Case study examples (company names, results)
4. Cautionary tales (what happens if you don't transform)

Format as a "quote bank" I can pull from.
```

---

## Prompt 6: Human-in-the-Loop Design

```
What do the sources say about designing human-in-the-loop AI workflows for marketing?

Specifically:
1. What should AI decide vs. humans decide?
2. How to present AI suggestions so marketers trust them?
3. Approval workflow patterns that work
4. How to handle AI confidence levels
```

---

## Prompt 7: Transformation Roadmap Input

```
Based on all research, draft a transformation roadmap from Gynzy's current state to Annemarie's vision (behavior-driven, AI microsegmentation, real-time triggers, self-learning).

Structure as phases:
- Phase 1: Foundation (what to do first)
- Phase 2: Capability building
- Phase 3: Advanced/vision state

Include dependencies between phases.
```

---

## Prompt 8: Quick Wins Identification

```
What quick wins can Gynzy implement immediately (before or during sprint) based on the research?

Looking for:
- Low effort, high impact changes
- Things that don't require new tooling
- Process changes vs. technical changes
```

---

## Pro Tips for NotebookLM

1. **Ask follow-ups** — When it gives a list, ask "expand on #3" or "give me more examples of X"

2. **Request citations** — Ask "which sources support this?" to trace back to specific docs

3. **Use the Audio Overview** — Generate the podcast-style summary for a different perspective while you work on other things

4. **Compare perspectives** — Ask "what would a skeptic say about this recommendation?"

5. **Get specific** — If answers are too generic, add "specifically for a 3-person EdTech marketing team using Intercom"

---

## Output Checklist

After running these prompts, you should have:

- [ ] Top 10 patterns with source attribution
- [ ] ChatGPT vs Gemini comparison table
- [ ] Prototype feature list (P0/P1/P2)
- [ ] Data schema for synthetic data generation
- [ ] Behavior signals and segment definitions
- [ ] Quote bank for Monday presentation
- [ ] Human-in-the-loop design patterns
- [ ] Transformation roadmap draft
- [ ] Quick wins list

---

*Save NotebookLM outputs to `work/gynzy/notebooklm-synthesis-output.md`*
