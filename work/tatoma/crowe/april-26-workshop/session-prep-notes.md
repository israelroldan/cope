# Crowe Foederer x Tatoma — Workshop Prep Notes

**Date:** Tuesday, April 14, 2026
**Participants:** Bram Verhagen & Marieke Steijvers (Crowe Foederer), Sander Kok & Israel Roldán (Tatoma)
**Purpose:** Demonstrate AI-powered M&A workflows using Claude, then prototype solutions in Copilot Studio (Crowe's stack)

---

## Key Context

- **Crowe's AI/IT strategy is Microsoft-based** — they use Copilot and Copilot Studio
- **Tatoma's approach:** We show Claude first because it's how we work and because its skills, tooling, and patterns make this kind of work a breeze. Then we switch to Copilot Studio to build in their ecosystem.
- **The narrative:** "Let us show you how things are in Claude land → now let's do the remaining scenarios with your tooling and setup"

---

## Session Structure

### Part 1: Claude (12:30 – 14:00)
Two live demos with Crowe's real data to set the quality bar:
- **UC1: IM Review** — Claude analyzes a 33-page Information Memorandum from a buyer's perspective
- **UC2: Biedingsbrief vs. Term Sheet** — Claude finds concrete discrepancies between two deal documents

### Transition (14:15 – 14:35)
Bridge the concepts: the patterns Claude just demonstrated (document analysis, cross-document comparison, structured extraction) are universal — they can be implemented in Copilot Studio too.

### Part 2: Copilot Studio (14:35 – 17:00)
Live prototyping and architecture exploration:
- **UC3: Cijferopstelling** — build a PDF → Excel extraction flow (live prototype)
- **UC4+5: Waarderingsmodel & Teaser** — explore approaches, prototype the teaser
- **UC6: Auditfiles** — architect the preprocessing pipeline together

---

## Case Materials

Bram provided a zip file ("Briefing Claude.zip", ~24MB) with real case data:
- **Case company:** KleurRijker B.V. (Amersfoort), deal code-named "Project Faraday"
- **Bid letter/term sheet:** Separate entity (Van Grunsven)
- **Confidentiality:** Client-sensitive data — handle with care

---

## Use Case Summary (in demo order)

| # | Use Case | Platform | Feasibility | Approach |
|---|----------|----------|-------------|----------|
| 1 | IM review (buyer perspective) | Claude | Excellent | Live demo |
| 2 | Biedingsbrief vs. term sheet | Claude | High | Live demo |
| 3 | Cijferopstelling (P&L + balance sheet) | Copilot Studio | High | Live prototype |
| 4 | Waarderingsmodel (DCF + ValuePlan) | Copilot Studio | Medium-High | Exploration |
| 5 | Teaser from IM | Copilot Studio | ~70% | Prototype if time |
| 6 | Auditfiles (XAF analysis) | Copilot Studio | Medium | Architecture discussion |

---

## Questions to Discuss with Sander

### About the Claude demos
1. Are we comfortable with the UC1 and UC2 prompts? Should we dry-run them before Tuesday?
2. Do we want to prepare "scripted" prompts or go fully live?

### About the Copilot Studio part
3. **Access:** Whose Copilot Studio tenant are we using? Crowe's or a Tatoma sandbox?
4. **Licenses:** Do we have AI Builder credits / document processing available?
5. **Pre-work:** Should we pre-build a skeleton flow for UC3 so the live building isn't starting from zero?
6. **Expectations:** How much can we realistically build live in ~2 hours? Set expectations with Bram.

### About positioning
7. How do we frame the Claude → Copilot Studio transition without it feeling like "our tool is better but you can't use it"?
8. Should we emphasize that the AI model quality (GPT-4 in Copilot vs. Claude) is one factor, but workflow design and prompt engineering matter more?

---

## Detailed Analysis Files

Each use case has a dedicated analysis file:

- [use-case-1-im-review.md](./use-case-1-im-review.md) — Claude demo
- [use-case-2-biedingsbrief-termsheet.md](./use-case-2-biedingsbrief-termsheet.md) — Claude demo
- [use-case-3-cijferopstelling.md](./use-case-3-cijferopstelling.md) — Copilot Studio prototype
- [use-case-4-waarderingsmodel.md](./use-case-4-waarderingsmodel.md) — Copilot Studio exploration
- [use-case-5-teaser.md](./use-case-5-teaser.md) — Copilot Studio prototype
- [use-case-6-auditfiles.md](./use-case-6-auditfiles.md) — Architecture discussion

## Workshop Agenda

- [workshop-agenda.md](./workshop-agenda.md) — Full agenda with timings, phases, and talking points
