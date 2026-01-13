# Prototype Brief Generator Prompt

*Use this prompt to generate mini briefs from rough notes about a problem domain with multiple prototype levels.*

---

## The Prompt

```
I have rough notes about a problem domain with multiple prototype ideas at different levels. Generate a mini brief (1-2 paragraphs per section) for EACH prototype. Keep it messy/raw — this is for quick capture.

For each prototype, cover:

**RAW CONTEXT**
What's the situation? What pain does this address? What constraints exist?

**GOALS**
What does this prototype prove? What's the success criteria?

**WORKFLOW**
Input → Process → Output. Who does what?

**WHAT WE WANT TO LEARN**
Open questions, assumptions to test, what would make us pivot or proceed?

---

DOMAIN: [name of the problem space]

PROTOTYPE LEVELS:
- Level 1 (simplest/quickest): [name or short description]
- Level 2 (medium complexity): [name or short description]
- Level 3 (most ambitious): [name or short description]

RAW NOTES:
[paste your unstructured notes, bullet points, transcript excerpts, whiteboard captures, etc.]
```

---

## Example Input

```
DOMAIN: Marketing Flow Automation

PROTOTYPE LEVELS:
- Level 1: Coverage dashboard (read-only visibility)
- Level 2: AI tagging assistant (suggest + apply tags)
- Level 3: Intent-based flow generator (natural language → flows)

RAW NOTES:
- Intercom API doesn't support flow creation, only tags/attributes
- Maria spends hours on manual CSV tagging
- 210 flows, 27 live, users falling through cracks
- "We don't know who's in what flow"
- Human approval required before anything deploys
- BigQuery has all the behavior data
- Census syncs daily to Intercom
- Team of 3, can't scale manually
- Validated that personalization works but never operationalized
```

---

## Tips

- **Don't over-polish the notes** — the prompt handles messy input
- **Include constraints** — what's blocked, what's required, what's off-limits
- **Add quotes** — pain points in stakeholder words help ground the brief
- **Level 1 should be buildable in days**, Level 3 might be the vision

---

*Template created: 2026-01-12*
