# PRD — Use-Case Asset Generator

**Owner:** Israel
**Status:** Draft v0.1
**Date:** April 13, 2026
**Audience:** Product + exec brief (engineering spec to follow separately)

---

## 1. One-line summary

A product feature that turns a raw demo-script (markdown) into an interactive, presentable **Use-Case Asset** — a structured 10-row canvas plus a live-demo deck that a consultant can run on a shared screen, edit in front of a client, and save back to the tenant's use-case library.

## 2. Why this, why now

Workshops like Tatoma × Crowe Foederer require hours of manual work to turn a demo script into a presentable, interactive artifact. The current hand-built HTML (UC1 · IM Review) proved the format works — the client literally fills the canvas with us on screen, and the filled canvas becomes the workshop's deliverable. Today that output is bespoke, written by a human in a single HTML file, not reusable across tenants, and not persisted anywhere except the consultant's laptop.

Productising this closes the loop: **every workshop generates a tenant-owned asset, not a slide deck that disappears after the session.** Over time the tenant accumulates a use-case library that becomes their internal playbook.

## 3. Who it's for

- **Primary — workshop facilitators** (Tatoma consultants, and eventually partners): they arrive with a script, leave with a filled, persisted asset for the client.
- **Secondary — tenant end-users** (e.g. Crowe M&A team): they inherit the filled asset post-workshop, keep editing it, and reuse the prompt patterns on their own deals.
- **Tertiary — tenant admins**: browse the growing library, surface reusable patterns across teams.

## 4. The core artifact: the Use-Case Asset

A Use-Case Asset is a first-class entity in the platform (not a document attachment). It has:

- **10 canonical rows** — Who it's for · What problem it solves · When to use it · Where it runs · Required inputs · Expected output · Examples & tips · Owner & status · Related learning · Quality & reuse signals.
- **State** — hypothesis (the pre-workshop guess) and validated content (what was agreed in the room).
- **Linked prompts** — one primary prompt + N follow-ups, each copy-to-clipboard ready.
- **Metadata** — owner, status (hypothesis · prototype · pilot · adopted), tenant, links to related assets.

Because the asset lives in the platform, it can be rendered through multiple views — presentation deck, doc export, library card, dashboard tile — without re-authoring. **V1 ships the presentation view; other views are future work.**

## 5. Scope (v1)

In scope:

- Upload or paste a demo-script markdown (following the `[SPOKEN]` / `[TYPED]` / `[ACTION]` convention).
- Generate an interactive Use-Case Asset: hypothesised canvas + presentation deck + extracted prompts.
- Live-edit canvas cells during presentation mode; edits persist to the asset (not browser localStorage).
- Copy-to-clipboard on every prompt.
- Speaker-notes toggle for the facilitator on shared screen.
- Save the asset to the tenant's library; later sessions resume from last state.
- Export the canvas as PDF and the deck as standalone HTML (for offline presenting).

Explicitly out of scope for v1:

- Other asset templates (pitch decks, training modules). UCA-only until the pattern is proven.
- Multi-user real-time co-editing. Single-facilitator editing; client watches.
- Automatic script parsing from voice/transcripts.
- Prompt execution inside the platform. The facilitator still copies prompts into the Claude app of their choice.
- A proper presenter view (second-window with next-slide preview). The existing `N`-toggle pattern is v1.

## 6. User flows

**Flow A — Create asset from script (pre-workshop)**
Facilitator opens the platform → *New Use-Case Asset* → uploads `UCx-demo-script.md` → the system parses it, pre-fills the 10 canvas rows with hypotheses, extracts prompts into the Prompts tab, and generates a draft deck. Facilitator reviews, edits, and saves.

**Flow B — Present & validate (live in the workshop)**
Facilitator opens the asset → *Present* → full-screen deck. On canvas slides, hypotheses are editable inline; the facilitator edits them with the room's input. Copy-prompt buttons feed the facilitator's Claude session. Speaker notes toggle with `N`. Every edit auto-saves to the asset.

**Flow C — Post-workshop handover**
Facilitator marks asset as `validated` → ownership transfers to the tenant user (e.g. Bram at Crowe). Tenant users see it in their library, keep iterating, and the prompts stay copy-ready for their next deal.

**Flow D — Reuse across use cases**
Tenant admin browses the library, sees UC1 and UC2 share a prompt pattern, clones a row or a prompt into a new asset as a starting hypothesis.

## 7. Platform assumptions (what we do NOT rebuild)

- **Design system** provides: typography tokens, color tokens, cards, chips, buttons, modals, toasts, layout primitives. We consume these.
- **Storage & persistence** handle asset CRUD, versioning, and the canvas's cell-level edits.
- **Auth & tenant isolation** already exist: each asset lives under a tenant, respects existing role permissions, and inherits tenant-level branding.
- **File upload + parsing** pipeline exists for markdown ingestion.
- **Clipboard & fullscreen utilities** are already available platform-wide.

This feature contributes: the UCA data model, the script parser, the presentation renderer, and the canvas-editing UX. Everything else is platform.

## 8. Success metrics

- **Adoption:** N workshops run through the platform in the first quarter post-launch (target set with GTM).
- **Asset reuse:** % of generated assets that receive ≥1 edit in the 30 days after the workshop (signals the tenant actually uses it, not a one-off deck).
- **Time-to-deck:** median time from script upload to first presentable draft (target: under 5 minutes).
- **Canvas completeness:** % of rows that move from hypothesis → validated state during the live session.
- **Facilitator NPS** on the presenting experience.

## 9. Risks & open questions

- **Script format dependency.** The parser expects the `[SPOKEN]` / `[TYPED]` / `[ACTION]` convention. We either enforce it (template) or invest in tolerant parsing. *Recommendation: enforce via a provided template in v1; tolerate in v1.1.*
- **Multilingual prompts.** UC1 has Dutch + English alternatives. The model has to preserve both as discrete, separately-copyable prompts. Need confirmation this generalises.
- **Shared-screen risk on speaker notes.** If the facilitator toggles `N` mid-presentation, notes appear to the whole room. Accepted for v1; presenter view is v2.
- **Offline / air-gapped workshops.** Some tenants (regulated verticals) can't rely on the platform being reachable live. HTML export is the v1 answer — does it need to round-trip edits back?
- **Prompt IP.** When a tenant user edits a prompt, does that edit flow back to a shared pattern library, stay private to the tenant, or both? Needs a policy call before shipping library reuse.

## 10. Rollout

- **Alpha (internal):** Tatoma consultants run the next 2–3 workshops through the platform. UC1 and UC2 as seed content.
- **Closed beta:** Crowe Foederer + 1–2 other partner tenants. Focus on flows A, B, C. Library view stubbed.
- **GA:** Library view, reuse flow (D), HTML/PDF export, and the analytics needed to read success metrics.

## 11. Dependencies

- Platform design system must expose the components the deck needs (cards, chips, demo-box equivalent, canvas grid, section dividers). Gap: a "demo-box with copy button" component may not exist today.
- Platform storage must support structured JSON per asset (10 rows × 2 states + prompts array + metadata) with cell-level versioning.
- Platform renderer must support a full-screen presentation mode with keyboard nav.

---

**Appendix — source material:** `skills/use-case-presentation/SKILL.md` and `skills/use-case-presentation/reference-uc1.html` capture the current hand-built format in full. The reference HTML is the visual and interaction ground truth for the v1 presentation view.
