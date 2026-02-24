# Prompt: Client-Facing Context Renderer

Use this prompt in Claude Code within the TATOMA monorepo.

---

## The Prompt

```
I need you to build a client-facing Context view for the TATOMA platform. The Context feature currently lives in the Workbench app (consultant-only) and contains strategic research about a client — their industry, competitive landscape, trends, and deliverables. I want to create a polished view of this content for the Client Portal so that TLs and leadership can see the approved research outputs without needing Workbench access.

This is NOT a 1:1 copy of the Workbench UI. It's a curated, presentation-quality view that only shows approved/published content for the research and deliverables sections. Think of it as the consultant's research rendered as a strategy microsite for the client. However, the Context Overview section (Section 1) is special — it is **editable by the client** so they can provide and update information about their company.

## Design System

Use the TATOMA design system throughout. These are the tokens:

Colors:
- Ivory: #F6FAEB (page background, light sections)
- Ivory Dark: #E8EDDA (borders, subtle backgrounds)
- Salmon: #FF8E7D (accents, labels, active states)
- Salmon Light: #FFB5AA (hover states)
- Teal: #2D9CDB (Studio/employee accent — use sparingly here)
- Magenta: #4F2035 (headings, hero backgrounds, primary accent)
- Magenta Light: #6B3A50 (hover on dark)
- Amber: #FFA726 (Workbench accent — do NOT use in client view, this is consultant-only)
- White: #FFFFFF (card backgrounds, content panels)
- Gray 600: #4A4A4A (body text)
- Gray 400: #8A8A8A (secondary text, meta labels)
- Green: #4CAF50 (approved/complete status)

Typography:
- Headings: Georgia, 'Times New Roman', serif — font-weight 400, letter-spacing -0.01em
- Monospace labels: 'Space Mono', monospace — 11px, uppercase, letter-spacing 0.08em (section labels, tags, metadata)
- Body: system sans-serif stack ('Helvetica Neue', Helvetica, Arial, sans-serif) — 15px, line-height 1.6

Component Patterns:
- Section labels: Small mono text in salmon above the heading (e.g., "STRATEGIC CONTEXT", "RESEARCH", "DELIVERABLES")
- Cards: White background, border-radius 14px, 1px solid ivory-dark border, 28px padding
- Pills/tags: Inline-block, 4px 12px padding, border-radius 6px, 11px font
- Hero/header: Magenta background with ivory text, client name prominent, engagement context
- Alternating section backgrounds: Ivory → White → Ivory
- Callout blocks: Left border accent (3px salmon), ivory background
- Grids: CSS Grid, responsive

Interaction Patterns:
- Sticky navigation bar (magenta, Space Mono, salmon active underline, smooth scroll)
- IntersectionObserver for active nav highlighting
- Hover transitions on cards: translateY(-2px)
- Smooth transitions on interactive elements

## The Three Sections

### Section 1: Context Overview (editable)

This is the strategic context data about the client's company. It lives in the same Supabase tables that the Workbench reads from — both consultants and clients can contribute to it.

The context form has fields like:
- Company name, industry, size
- Strategic priorities
- AI maturity level
- Key challenges
- Current AI initiatives
- Transformation goals

**Two states: display mode and edit mode.**

**Display mode (default):** Don't render as a form. Render as a structured overview — a clean, scannable company profile. Use a grid of labeled value pairs for the factual fields (company, industry, size, maturity). Use prose blocks with Georgia headings for the narrative fields (strategic priorities, challenges, goals). Group related fields into visual clusters.

Layout:
- Top: Company hero banner (magenta) with name, industry, size as meta pills
- Below: 2-column grid of context cards — each card is a theme (e.g., "Strategic Priorities", "Current AI Initiatives", "Key Challenges", "Transformation Goals") with the content rendered as well-formatted text inside a white card with a salmon left border accent
- An "Edit Context" button in the top-right of the section (subtle, secondary style — not dominant). Clicking it transitions to edit mode.

**Edit mode:** Triggered by the "Edit Context" button. The styled cards transition into editable form fields — each card's content area becomes a textarea or rich text input, and the factual fields (company, industry, size, maturity) become standard inputs/selects. Keep the visual structure the same (same card layout, same groupings) so the transition feels smooth, not jarring. Show "Save" and "Cancel" buttons. On save, persist to Supabase and transition back to display mode with the updated content. On cancel, discard changes and return to display mode.

The edit experience should feel like editing a profile, not filling out a bureaucratic form. Keep the Georgia headings, the salmon accents, the card structure. Just swap the rendered text for inputs inside the same visual containers.

**Empty state:** This is critical. When a client first accesses the Context page and no context data exists yet, they should NOT see a blank page or an empty grid of cards. Instead, show a welcoming, purposeful empty state:

- A centered illustration area (could be a simple geometric pattern or icon in the Tatoma design system — magenta/ivory tones, not a generic stock illustration)
- A Georgia heading: something like "Tell us about your organization"
- A brief description (1-2 sentences) explaining that this context helps Tatoma tailor their AI transformation approach, research, and recommendations to the client's specific situation
- A prominent CTA button: "Add Context" (salmon background, white text) that opens the edit mode directly
- Below the CTA, optionally show ghost/placeholder cards with the field labels visible but empty — giving the client a preview of what the completed profile will look like. These placeholders should use dashed borders (ivory-dark) and muted text to distinguish them from real content.

The empty state should feel inviting, not incomplete. The client should understand WHY they're being asked to provide this information and WHAT they'll get in return (tailored research, relevant deliverables, personalized recommendations).

If the context is partially filled (some fields have data, others don't), render the filled fields normally in display mode and show subtle "Add" prompts on the empty cards — don't fall back to the full empty state.

### Section 2: Research Insights

This is the research queries section. In the Workbench, consultants run research queries (questions) through the Context pipeline (Perplexity + Tavily synthesis) and get long-form markdown answers. Each query has a status — only show queries with an "approved" status.

**Rendering approach:** Side-by-side layout.
- **Left panel (sticky or scrollable):** A vertical list of research questions. Each question is a clickable item showing the question text and a subtle date/tag. The active question is highlighted (salmon left border or background tint). This panel should be ~30-35% width.
- **Right panel:** The full markdown answer for the selected question. Render with proper markdown styling — Georgia headings, good paragraph spacing, styled blockquotes for callouts, code blocks if present, bullet lists with proper indentation. This is where the depth lives, so give it room (~65-70% width).
- Clicking a question in the left panel scrolls/switches the right panel to show that answer.
- Consider a "Reading time" or word count indicator per question as subtle metadata.
- If there are many approved queries, group them by topic/category if that data is available.

Visual reference: Think of a documentation site sidebar pattern (like Notion or GitBook) but styled in the Tatoma design system. The left panel has the clean, scannable list; the right panel has the rich content.

### Section 3: Deliverables

This section shows approved deliverables generated from the Context research. In the Workbench, deliverables are documents/outputs that consultants generate and approve. Each deliverable has a title, type, status, and content or link.

**Rendering approach:** A responsive card grid (2-3 columns on desktop, 1 on mobile).
- Each deliverable is a card with:
  - A type icon or emoji at the top (document, presentation, analysis, report, etc.)
  - Title (Georgia, prominent)
  - Type tag as a pill (e.g., "One-Pager", "SWOT Analysis", "Competitor Brief", "Market Report")
  - Brief description or excerpt (2-3 lines, truncated)
  - Date generated / last updated as subtle mono metadata
  - A "View" or "Open" action — links to the deliverable content or opens it in a modal/panel
- Cards should have the standard hover effect (translateY -2px)
- Color-code the type pills:
  - Strategy docs: magenta tint
  - Analysis: teal tint
  - Reports: salmon tint
  - Presentations: green tint
- If a deliverable has rich content (markdown), clicking "View" could expand it inline or open a full-width reading view below the grid — similar to the research panel

## Architecture Requirements

- Build as React components for the Client Portal app
- Read the existing Context data model in the Workbench codebase — understand the Supabase tables for context, research queries, and deliverables. The Client Portal will read from the same tables but with RLS policies scoped to the client's org
- Only render content marked as approved/published for Sections 2 and 3 — never show draft or in-progress research. Section 1 (Context Overview) shows ALL context data and is editable by the client.
- Components needed:
  - `ContextHero` — client name, engagement info, meta data
  - `ContextOverview` — the structured company profile (display mode + edit mode)
  - `ContextOverviewEdit` — the edit form variant of the overview (same visual structure, inputs instead of text)
  - `ContextEmptyState` — the welcoming empty state when no context data exists
  - `ResearchInsights` — the side-by-side question/answer browser
  - `DeliverablesGrid` — the card grid of approved deliverables
  - `ContextRenderer` — top-level component that composes the above with sticky nav
- State management: the ContextOverview needs local form state for edit mode, optimistic updates on save, and error handling. Use React state (useState/useReducer) — no need for a global store.
- Use Tailwind CSS 4 (already in monorepo) with design tokens as CSS custom properties
- The markdown rendering in the research answers needs to handle: headings, paragraphs, lists, blockquotes, bold/italic, links, and potentially tables. Use an existing markdown renderer if one is already in the codebase, or add one (react-markdown or similar)
- The view should be responsive — the research side-by-side layout should stack vertically on mobile (questions list on top, selected answer below)
- Consider adding a print/export capability so clients can generate a PDF of the full context package
- The empty state, partial state, display mode, and edit mode should all share the same visual grid/card structure — only the inner content changes. This makes transitions smooth and keeps the page layout stable.

## What to Do

1. First, explore the existing Context-related code in the Workbench app — look at the routes, components, data model (Supabase tables for context form data, research queries with their statuses and answers, deliverables with their types and statuses). Understand what fields are available.
2. Check if the Client Portal already has any Context-related routes or components.
3. Plan the component architecture — what goes where, how data flows from Workbench tables to Client Portal components, what RLS policies are needed.
4. Build the components starting with ContextOverview (most straightforward), then DeliverablesGrid (visual impact), then ResearchInsights (most complex interaction).
5. Wire up the top-level ContextRenderer with sticky nav and section composition.

Start by exploring the codebase and creating a plan. Don't write code until the plan is approved.
```
