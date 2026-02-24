# Prompt: Playbook Visual Renderer

Use this prompt in Claude Code within the TATOMA monorepo.

---

## The Prompt

```
I need you to build a visual Playbook renderer for the TATOMA platform. The Playbook is a strategic document that consultants create per client engagement inside the Workbench app (port 3008). It contains structured sections like AI Strategy One-Pager, Ambition, SWOT Analysis, Winning Moves, and Focus Areas.

Right now, the Playbook renders as flat markdown/text with minimal hierarchy. I want it to render as a rich, interactive, visually polished HTML view — similar in spirit to a strategy microsite, but rendered inside the platform as a React component.

## Design System

Use the TATOMA design system throughout. These are the tokens:

Colors:
- Ivory: #F6FAEB (page background, light sections)
- Ivory Dark: #E8EDDA (borders, subtle backgrounds)
- Salmon: #FF8E7D (accents, labels, highlights)
- Salmon Light: #FFB5AA (hover states)
- Teal: #2D9CDB (Studio/employee accent)
- Magenta: #4F2035 (headings, hero backgrounds, Console accent)
- Magenta Light: #6B3A50 (hover on dark)
- Amber: #FFA726 (Workbench accent)
- White: #FFFFFF (card backgrounds)
- Gray 600: #4A4A4A (body text)
- Gray 400: #8A8A8A (secondary text, meta labels)

Typography:
- Headings: Georgia, 'Times New Roman', serif — font-weight 400, letter-spacing -0.01em
- Monospace labels: 'Space Mono', monospace — 11px, uppercase, letter-spacing 0.08em (used for section labels, tags, metadata)
- Body: system sans-serif stack ('Helvetica Neue', Helvetica, Arial, sans-serif) — 15px, line-height 1.6

Component Patterns:
- Section labels: Small mono text in salmon above the heading (e.g., "STRATEGIC CONTEXT", "WINNING MOVES")
- Cards: White background, border-radius 14px, 1px solid ivory-dark border, 28px padding
- Pills/tags: Inline-block, 4px 12px padding, border-radius 6px, 11px font, color-coded by category
- Hero/header sections: Magenta background with ivory text, subtle radial gradient overlays for depth
- Alternating section backgrounds: Ivory → White → Ivory for visual rhythm
- Exit criteria / callout blocks: Left border accent (3px salmon), ivory background, rounded
- Grids: CSS Grid for cards (2-column on desktop, 1-column mobile)

Interaction Patterns:
- Sticky navigation bar at the top (magenta background, Space Mono links, salmon active underline, smooth scroll to sections)
- Hover transitions on cards: subtle translateY(-2px)
- Collapsible sections where appropriate
- IntersectionObserver to highlight active nav item on scroll

## What the Playbook Contains

A Playbook is per-client and per-engagement. It has these section types (not all are always present):

1. **AI Strategy One-Pager** — prose summary of the client's AI transformation strategy. Usually 3-5 paragraphs with key themes bolded.

2. **Ambition One-Pager** — the client's AI ambition statement. Where they want to be. Prose with sometimes a numbered list of ambition pillars.

3. **AI SWOT Analysis** — four quadrants (Strengths, Weaknesses, Opportunities, Threats) each with 3-6 bullet points. This MUST render as a 2x2 color-coded grid, not as a flat list.
   - Strengths: teal background tint
   - Weaknesses: salmon background tint
   - Opportunities: green background tint (#4CAF50 at 8% opacity)
   - Threats: magenta background tint

4. **Winning Moves** — a collection of strategic initiatives, each rendered as a card. Each winning move has:
   - Title
   - Description
   - Status (Not Started / In Progress / Completed) — render as a colored pill
   - Priority/impact level (optional)
   - Related activities (links)

   Render as a responsive card grid. Status pills: Not Started = gray, In Progress = salmon, Completed = teal.

5. **AI Focus for the Next Quarter/Year** — structured focus areas, often with timeframes. Can be a timeline or card layout.

6. **Narrative Content** — freeform markdown sections that consultants add. Could be meeting notes, strategic context from Miro board exports, or custom sections. Render with proper markdown styling (Georgia headings, good spacing, blockquote styling for callouts).

7. **Playbook Welcome Slide** — a hero/cover section at the top. Client name, engagement title, Tatoma branding. This becomes the Playbook's visual header.

## Architecture Requirements

- Build this as a React component (or set of components) that lives in the Workbench app or in the shared packages
- The Playbook data comes from the existing Supabase tables — read the current playbook data model in the codebase to understand the schema
- Each section type gets its own renderer component (SWOTGrid, WinningMovesGrid, StrategyOnePager, AmbitionSection, FocusAreas, NarrativeBlock, PlaybookHero)
- There should be a top-level `PlaybookRenderer` component that takes a playbook object and maps sections to the right renderer based on section type
- Use Tailwind CSS 4 (already in the monorepo) for utility classes, but define the design tokens as CSS custom properties so the design system is centralized
- The rendered view should also be exportable as a standalone HTML document (for sharing with clients who don't have platform access) — this means the component should be able to render server-side or generate a self-contained HTML string
- The sticky nav should auto-generate from the sections present in the playbook

## What to Do

1. First, read the existing Playbook-related code in the Workbench app — look at the current routes, components, and data model. Understand what data is already available.
2. Plan the component architecture (which components, where they live, how they compose)
3. Define the design system tokens as CSS custom properties in a shared location
4. Build the section renderers one at a time, starting with PlaybookHero and NarrativeBlock (most reusable), then SWOTGrid and WinningMovesGrid (most visual impact)
5. Build the top-level PlaybookRenderer with sticky nav and section mapping
6. Add the HTML export capability

Start by exploring the codebase and creating a plan. Don't write code until the plan is approved.
```
