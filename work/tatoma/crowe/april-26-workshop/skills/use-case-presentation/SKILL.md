---
name: use-case-presentation
description: Transform a demo-script markdown into a single-file HTML presentation that matches Tatoma's styleguide and the "Use-Case Asset" 10-row canvas structure. Use whenever the user asks to turn a UCx-demo-script.md (or similar workshop script) into a shared-screen presentation.
---

# Use-Case Asset presentation generator

## What this skill does

Given a demo-script markdown (narration + typed prompts + on-screen actions for a live workshop demo), produce **one self-contained `.html` file** that:

1. **Matches the Tatoma visual style** — same fonts, color tokens, typography rhythm, card system, chips, demo-box component, and nav as `reference-uc1.html` (the canonical example in this skill folder).
2. **Uses the 10-row Use-Case Asset canvas as the spine** — every presentation opens with an empty canvas (hypotheses as grey placeholder text, editable) and closes with the "filled canvas" takeaway slide. In between, slides map onto canvas rows.
3. **Keeps the live interactivity** — keyboard nav, editable canvas cells with `localStorage` persistence (and sync between the intro canvas and the filled canvas), copy-to-clipboard buttons on every prompt, `N` to toggle speaker notes, `F` for fullscreen.
4. **Hides presenter narration from the shared screen** — all `🎙️ [SPOKEN]` and `👉 [ACTION]` content from the script goes into `<div class="speaker-note">` blocks, hidden by default. Only the current `N` toggle exists; the shared screen stays clean unless the presenter deliberately reveals them.

## Before you start

1. **Read `reference-uc1.html` in this folder**, fully. It is the ground truth for styling, component markup, and script behaviour. Treat every CSS custom property, class name, and JS block as reusable boilerplate — do not invent new ones.
2. **Read the user-supplied demo-script markdown**, fully. Identify:
   - **Session metadata** — workshop, date, demo lead, runtime, primary document(s).
   - **Setup narration** → title slide subtitle + speaker note.
   - **Primary prompt(s)** (the `[TYPED]` code blocks) → the demo-box on the output/validation slide. Keep multilingual variants (e.g. Dutch + English alt) — put the primary in the visible demo-box and the alternative in an adjacent/toggleable demo-box or as a second copy block.
   - **Expected-output highlights** → narration for the "what to watch for" speaker notes on the output slide and the post-demo "moment" slide.
   - **Follow-up prompts (4a/4b/…)** → each becomes its own slide with its own full demo-box + copy button. Do **not** summarise these away; the user explicitly wants every prompt copy-able verbatim.
   - **Discussion questions** → "Quality & reuse signals" slide bullet list + speaker notes.
   - **Fallback / contingency** → speaker notes only; never on-screen.

## The 10-row Use-Case Asset canvas (fixed row labels + icons)

Always use these exact labels, order, and SVG icons (copy the SVG markup from `reference-uc1.html`):

| # | Label | Icon key (in reference) |
|---|-------|-------------------------|
| 01 | Who it's for | person-with-check |
| 02 | What problem it solves | target concentric circles |
| 03 | When to use it | clock |
| 04 | Where it runs | stacked racks |
| 05 | Required inputs | circle with arrow in |
| 06 | Expected output | document with check |
| 07 | Examples & tips | lightbulb |
| 08 | Owner & status | shield with check |
| 09 | Related learning | open book |
| 10 | Quality & reuse signals | bar chart (mint) |

Row 10 always uses the mint-icon class. Row 06 is the demo anchor — the slide that validates it must contain the primary prompt's demo-box.

## Slide structure (loose, content-driven)

The slide count and grouping are **flexible** — let the script's content decide. Only these anchor slides are mandatory:

- **Title** (`section-divider`) — UC number, one-line description, 2–3 chips, setup speaker note.
- **Canvas intro** (`uca-slide`) — the full empty canvas with all 10 rows as editable hypotheses.
- **Row 05 (Required inputs)** — always include; typically shows big-number cards with the case facts.
- **Row 06 (Expected output) — the live demo slide** — contains the primary prompt demo-box. This is the only non-negotiable demo-box placement.
- **Post-demo "moment"** (`section-divider`) — short punchy statement of the payoff ("Half a day of work. Two minutes of reading." equivalent).
- **Follow-up prompts** — one slide per follow-up, each with its own demo-box + copy button. Title and framing per follow-up come from the script.
- **Row 10 (Quality & reuse signals)** — discussion prompts as two columns, speaker notes guide the conversation.
- **Filled canvas** (`uca-slide`, mint icons) — same 10 rows, now framed as the artifact. All `[data-canvas-key]` values sync with the intro canvas via JS (already in the reference).

Rows 01/02, 03/04, 08/09 pair well on a single slide using the `validate-grid` two-column layout. Pair or split based on how much the script has to say about each.

## Component contracts (use exactly these — do not rename)

- **`.slide`** — one per slide. Add `.section-divider` for centred title-style slides, `.uca-slide` for the full canvas slides.
- **`.canvas-step`** — slide header anchoring to a canvas row. Contains the step icon, label, and `canvas-step-pair` meta ("fill · validate", "fill · hands-on", "fill · then load", "commit · bridge", "the demo").
- **`.uca-card` / `.uca-grid` / `.uca-row`** — the canvas itself. Every editable cell gets `contenteditable="true"` and `data-canvas-key="..."` (one of: who, problem, when, where, inputs, output, examples, owner, learning, quality).
- **`.validate-block`** — per-row hypothesis slide block. The hypothesis div gets `contenteditable="true"` and `data-hyp-key="..."` (same key set as canvas).
- **`.demo-box`** — every prompt goes in one of these. Structure: header with `demo-label` (pulsing salmon dot + "Live · Claude Chat" or similar) and `demo-surface` meta on the right; body with `demo-files` (one `.demo-file` per attachment named in the script) and a `.demo-prompt` containing the `.copy-btn` (with `data-target="..."` pointing at a unique prompt id), a `.p-tag` (language or prompt name), and a `.prompt-text` with the escaped prompt text.
- **`.card`** — content cards (follow-up summaries on row-07 slide, big-number fact cards on row-05 slide).
- **`.chip`** — small meta tags; use `.salmon-bg`, `.mint`, `.muted-bg`, `.purple-bg` variants from the reference.
- **`.speaker-note`** — every slide should have one. Contents: all `[SPOKEN]` narration + `[ACTION]` notes + expected-output guidance + fallbacks relevant to that moment. Start with a bolded `<strong>Speaker note · [short label]</strong>`.

## Copy from reference verbatim

The following blocks are **identical every time** — copy them byte-for-byte from `reference-uc1.html`:

- The `<head>` — fonts link, viewport meta.
- The entire `<style>` block — every CSS custom property and class.
- The `.logo-area` markup.
- The `.nav-bar` markup.
- The entire `<script>` block at the bottom — slide engine, localStorage persistence, canvas-cell sync, keyboard handlers, copy buttons, reset button.

Only the slide content inside `<div class="deck">` changes per use case.

## Content rules

- **Language** — mirror the script. If the script is Dutch, the on-screen chrome stays English (logo area, nav help) but the prompts and slide bodies are Dutch. If the script has a primary + alternative language, expose both: primary prompt in the main demo-box, alternative in a second demo-box below with its own copy button and a `p-tag` marking the language.
- **Prompt fidelity** — copy prompt text verbatim from the script's `[TYPED]` blocks. Preserve line breaks, apostrophes, em-dashes. HTML-escape `&`, `<`, `>` in the `.prompt-text` span.
- **Speaker notes** — include every `[SPOKEN]`, `[ACTION]`, expected-output highlight, and fallback line from the script in the most relevant slide's speaker note. Nothing from the script should be lost; it either surfaces on-screen (short, punchy, salesy) or lives in the speaker note (the full narrative).
- **On-screen brevity** — slides show headlines, chips, cards, hypothesis text, and prompts. Longform narration never appears on-screen.

## Output expectations

- **One file**, saved to the workspace folder. Name it `{uc-id}-{short-slug}.html` (e.g. `uc2-nbo-comparison.html`).
- **Self-contained** — no external assets other than the two Tatoma font stylesheets and the optional logo image (which already has an `onerror` hide fallback in the reference).
- **Test mentally** — after writing, confirm: (a) empty canvas slide + filled canvas slide share identical `data-canvas-key` values so the JS sync works; (b) every `copy-btn`'s `data-target` matches a unique id on a `prompt-text` span in the same slide; (c) every `.demo-prompt` has exactly one `.copy-btn`, one `.p-tag`, and one `.prompt-text`; (d) speaker notes are present on every slide; (e) no narration bled onto the visible slide body.

## Working procedure

1. Read `reference-uc1.html` and the supplied script end-to-end.
2. Sketch the slide list as a short plan: which UCA rows does this script cover in depth, where does the demo live, how many follow-ups are there, where does the "moment" slide go. Confirm with the user before writing HTML if the slide count or grouping is non-obvious.
3. Write the HTML file into the workspace in one pass, copying the reference scaffolding and swapping in content.
4. Present the file with a `computer://` link and a one-line summary. Do not narrate what's in it.
