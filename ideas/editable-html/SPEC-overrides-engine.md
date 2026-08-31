# Overrides Engine — Implementation Spec (v1, text-only)

**Audience:** Claude Code (engineering implementation)
**Target app:** `apps/sites` (Next.js) at `/Users/israel/code/tatomahq/client-portal/apps/sites`
**Status:** Ready to implement
**Owner:** Israel

---

## 1. Problem Statement

The `sites` app hosts user-uploaded HTML "mini-sites" (presentations, microsites). Today, when a presenter wants to make a small edit during or between sessions — fix a typo, update a number, change a label — they have to edit the HTML file locally, repackage the zip, re-upload, and bust the cache. This is slow and gated on technical skills.

The existing presentation decks already prove a click-to-edit UX works (see `slides/canvas.js` — `contenteditable` + `localStorage`). But edits live only in the presenter's browser: not portable, not shared, lost on cache clear.

We want a **drop-in overrides engine** that lets any signed-in user edit text on any served mini-site, with edits persisted server-side, applied globally to all viewers, and propagated live to other open clients — **without changing the uploaded HTML files**.

---

## 2. Goals

1. **Edit any text on a hosted mini-site without modifying its files.** A signed-in user toggles edit mode, clicks any text element, types, and the edit persists.
2. **Overrides are global.** All viewers of the same site see the same edits.
3. **Edits propagate live.** Other open clients update within ~1s without reload.
4. **Zero author effort.** Authors keep uploading raw HTML/zips; the platform injects the engine automatically. No new markup required.
5. **Per-site opt-in.** Site owner toggles overrides on per site; off by default for safety.

---

## 3. Non-Goals (v1)

1. **Image / link / attribute editing.** Text content only. Architecture leaves room for `kind` field but UI ships text-only.
2. **Style or structural edits.** No drag-reorder, no delete, no CSS changes.
3. **Per-presenter or per-session overrides.** All overrides are global to the site.
4. **Edit history / undo across sessions.** Local undo while editing is fine; no server-side version log beyond `updated_at` / `updated_by`.
5. **Conflict resolution UI.** Last-write-wins. Realtime makes simultaneous edits visible enough.
6. **Self-serve auth model changes.** Reuse existing WorkOS session for writes; do not introduce new roles.

---

## 4. User Stories

**As a presenter** preparing a deck mid-meeting, I want to click any heading or paragraph on a hosted slide and edit the text in place, so that the change is immediately visible and persists for the next viewer.

**As a presenter** with a co-presenter on a second machine, I want my edits to appear on their screen within a second, so we can rehearse and react together.

**As a site owner** uploading a new microsite, I want overrides off by default, so an unfinished site doesn't accidentally let viewers edit it.

**As a site owner**, I want a single toggle in the admin UI to enable overrides per site, so I can opt in deliberately.

**As a viewer** without edit permission, I want the page to look and behave exactly like a normal hosted site — no edit affordances visible — so the experience is unchanged.

**As a presenter** re-uploading a new version of the same site, I want my old overrides to not silently mis-apply to the new version, so I'm not chasing ghosts.

---

## 5. Architecture

### 5.1 Components

```
┌─────────────────────────────────────────┐
│  Browser (viewer / presenter)           │
│  ┌───────────────────────────────────┐  │
│  │  Uploaded HTML (unchanged)        │  │
│  │  + injected <script> tag          │  │
│  │    └─ engine.js                   │  │
│  │       ├─ addressing               │  │
│  │       ├─ discover                 │  │
│  │       ├─ store (REST + LS cache)  │  │
│  │       ├─ realtime (Supabase chan) │  │
│  │       └─ ui (toolbar + edit mode) │  │
│  └───────────────────────────────────┘  │
└──────────────┬──────────────────────────┘
               │
       ┌───────┴───────┐
       │               │
       ▼               ▼
┌─────────────┐  ┌──────────────────┐
│ Next.js     │  │ Supabase         │
│ apps/sites  │  │ Realtime channel │
│             │  │ (broadcast only) │
│ - serves    │  └──────────────────┘
│   HTML w/             ▲
│   injected            │ NOTIFY
│   <script>            │
│ - /_overrides   ┌─────┴────────┐
│   API           │ Postgres     │
│   ├─ GET reads  │ site_overrides│
│   ├─ PUT writes │ (LISTEN)     │
└─────┬───────────┴──────────────┘
      │ service role
      └──────────────►
```

### 5.2 Data flow

**Initial page load:**
1. Browser hits `/<slug>/<page>`.
2. Route handler streams HTML from Supabase Storage.
3. If site has `overrides_enabled = true` and content-type is `text/html`, transform stream injects `<script src="/_overrides/engine.js" data-site-id="..." data-page="..." data-site-version="..." defer>` before `</body>`.
4. Engine boots. Reads its own `data-*` attributes. Walks DOM, builds a map of `element_path → DOM node` for editable candidates.
5. Engine fetches `GET /_overrides/:siteId/:siteVersion/:page` → applies overrides.
6. Engine subscribes to Supabase Realtime channel `site:{siteId}:v{siteVersion}:{page}`.
7. If session is signed in and authorized, engine renders the presenter toolbar (hidden until hotkey `E`).

**Edit:**
1. User presses `E` → edit mode on. Hover paints outline on candidates.
2. Click on a candidate → `contenteditable=true`, focus.
3. On `input` (debounced 400ms) → `PUT /_overrides/:siteId/:siteVersion/:page/:elementPath` with `{value}`.
4. Server upserts row, returns 200. Postgres NOTIFY → Realtime channel broadcasts `{element_path, value, updated_by}`.
5. Other clients receive broadcast → apply if `element_path` known. Sender ignores its own echo via local edit-id token.
6. Local write also caches to `localStorage` for instant paint on next load (write-through).

### 5.3 Addressing strategy

For each candidate element, compute:

```
path = "#" + el.id                                     if el.id is set
     | structuralPath(el)                              otherwise
fingerprint = sha1(textContent.trim().slice(0, 40))[:8]  // for orphan recovery
key = path + "@" + fingerprint
```

`structuralPath(el)` walks up to `<body>`, building `tag:nth-of-type(n)` segments separated by `>`. Example:

```
main > section:nth-of-type(2) > h2:nth-of-type(1)
```

The `fingerprint` is stored alongside but **not part of the primary key**. It's used by an orphan-recovery query: when the engine finds an override whose `path` no longer matches any element on the page, it tries to find a single element on the page whose own fingerprint matches, and re-applies + re-keys.

**Editable candidates whitelist:**
- Tags: `h1, h2, h3, h4, h5, h6, p, li, td, th, blockquote, span, a, button, label, dt, dd, figcaption, summary`
- Must be a leaf-ish node: only children are text nodes or inline tags from `{strong, em, b, i, u, code, mark, small, sub, sup, br, span, a}`
- **Skip:** any element with `[data-no-edit]`, `[contenteditable]` already set, anything inside `<script>`, `<style>`, `<svg>`, `<canvas>`, `<form>` controls, or with `data-canvas-key` (those are owned by the existing canvas.js)

---

## 6. Schema Changes

### 6.1 New migration: `packages/database/supabase/migrations/008_site_overrides.sql`

```sql
-- Add per-site flags to existing sites table
alter table sites
  add column overrides_enabled boolean not null default false,
  add column current_version   integer not null default 1;

-- Overrides table
create table site_overrides (
  site_id      uuid        not null references sites(id) on delete cascade,
  site_version integer     not null,
  page         text        not null,
  element_path text        not null,
  fingerprint  text,
  kind         text        not null default 'text',  -- future: 'attr:src', etc.
  value        text        not null,
  updated_at   timestamptz not null default now(),
  updated_by   text,
  primary key (site_id, site_version, page, element_path)
);

create index site_overrides_lookup
  on site_overrides (site_id, site_version, page);

-- RLS: deny all; service role only (matches sites table posture)
alter table site_overrides enable row level security;

-- Realtime: enable broadcast on this table
alter publication supabase_realtime add table site_overrides;
```

### 6.2 Update `packages/database/src/...` types

Add `Override` type and extend the `Site` type with `overridesEnabled: boolean`, `currentVersion: number`. Update any DB query helpers that fetch sites.

### 6.3 Version bump on re-upload

In `src/app/admin/sites/actions.ts:createSite()` (and any `updateSite` / re-upload path):
- On every successful re-upload of an existing slug, increment `current_version` by 1.
- Old `site_overrides` rows remain (orphaned by version) — explicit cleanup is a v2 concern.

---

## 7. API Surface

All routes live under `apps/sites/src/app/_overrides/` as Next route handlers.

### 7.1 `GET /_overrides/engine.js`

Serves the bundled engine. Long-cached (`Cache-Control: public, max-age=31536000, immutable`), versioned via build hash in path or query string. Returns `application/javascript`.

### 7.2 `GET /_overrides/:siteId/:siteVersion/:page`

- **Auth:** mirrors the parent site's read permissions (`is_public` / share-token / signed-in org match). Reuse the same auth helper used by `[slug]/[[...rest]]/route.ts`.
- **Returns:** `{ overrides: [{ element_path, value, kind, fingerprint, updated_at }] }`
- **Cache:** `no-store` for private sites; short `max-age` for public.

### 7.3 `PUT /_overrides/:siteId/:siteVersion/:page/:elementPathB64`

- **Auth:** WorkOS session required AND user must be authorized for the site (same authorization rule as admin write paths). Reject anonymous and share-token-only sessions with 403.
- **Body:** `{ value: string, kind?: "text", fingerprint?: string, edit_id?: string }`
- **Validation:** `value` ≤ 10KB, `element_path` ≤ 500 chars, `kind` in allowed set.
- **Behavior:** Upsert by primary key, set `updated_by` from session, return 200. Postgres trigger / Supabase Realtime fans out the change.

### 7.4 `DELETE /_overrides/:siteId/:siteVersion/:page/:elementPathB64`

- **Auth:** same as PUT.
- **Behavior:** Delete the row; element reverts to original on next load. Realtime broadcast carries `{element_path, value: null}` → clients re-render original `innerText` from the in-memory baseline captured at boot.

### 7.5 `PATCH /admin/sites/:id` (extend existing)

Add ability to flip `overrides_enabled`. Surface as a checkbox in the admin UI for the site.

---

## 8. Engine Module Spec

Location: new package or folder, e.g. `apps/sites/src/overrides-engine/` (built and served by route 7.1).

### 8.1 File layout

```
overrides-engine/
├── index.ts          # entry; reads <script data-*>, boots
├── addressing.ts     # pathFor(el), fingerprint(el), findByPathOrFingerprint
├── discover.ts       # walkCandidates(root): NodeList of editable elements
├── store.ts          # fetchAll, save, delete; localStorage cache
├── realtime.ts       # Supabase channel subscribe; apply remote changes
├── ui.ts             # toolbar, edit-mode toggle, hover outline, edit handlers
├── types.ts          # Override, EngineConfig
└── build.config.ts   # esbuild → single IIFE bundle, no external deps at runtime
```

### 8.2 Public surface (debugging)

Mounted at `window.__overrides`:
- `__overrides.enable()` / `disable()` — programmatic edit-mode toggle
- `__overrides.dump()` — return current applied overrides
- `__overrides.reset(elementPath)` — delete a single override

### 8.3 Boot sequence (`index.ts`)

```
1. Read self-script's data attributes: siteId, page, siteVersion, supabaseUrl, supabaseAnonKey
2. const baseline = capture(document)  // map of element_path -> original innerHTML, for revert
3. const overrides = await store.fetchAll()
4. apply(overrides)
5. if (session.canEdit) ui.mountToolbar()
6. realtime.subscribe(onRemote)
```

### 8.4 Editing (`ui.ts`)

- Hotkey `E` (no modifier, ignored if focus is in an `<input>`/`<textarea>`/`[contenteditable]`).
- Edit mode: add `body.__overrides-editing` class. Hover handler adds outline class to candidate under cursor.
- Click candidate → `el.contentEditable = "true"`, focus, place caret at click point.
- On `input` → debounce 400ms → `store.save(path, el.innerText)`. (v1 stores `innerText`, not HTML — strips formatting from paste.)
- On blur or Esc → `el.contentEditable = "false"`, exit edit on that node.
- Provide a small floating toolbar (top-right of viewport) with: Edit toggle, "Reset this element" (when one is focused), "View overrides" (opens a panel listing overrides on this page with revert buttons).

### 8.5 Echo suppression

Each `save()` generates an `edit_id` (uuid); engine tracks recent ids in a 30s ring buffer. Realtime messages carrying a known `edit_id` are ignored (the local DOM is already correct).

### 8.6 Cache

- After every `fetchAll`, write to `localStorage[`__ovr:{siteId}:{version}:{page}`]`.
- On boot, apply cache **synchronously before** the network fetch resolves (instant paint), then reconcile when fetch returns.
- On `save`, write through to cache immediately.

### 8.7 Bundle constraints

- No runtime npm imports. Inline a minimal Supabase Realtime client (or use `@supabase/realtime-js` bundled into the IIFE).
- Target ES2019, < 30KB gzipped goal.
- No CSS frameworks; ship a `<style>` block injected on boot (toolbar + outline classes).

---

## 9. Serving Changes (Route Handler)

File: `apps/sites/src/app/[slug]/[[...rest]]/route.ts`

After the existing `streamSiteFile()` call (~line 207), add:

```
if (site.overridesEnabled && contentType === 'text/html') {
  return injectOverridesEngine(stream, {
    siteId: site.id,
    siteVersion: site.currentVersion,
    page: pathFromRest,
  });
}
```

`injectOverridesEngine` is a streaming transform that:
1. Buffers until it sees `</body>` (case-insensitive).
2. Inserts: `<script src="/_overrides/engine.js?v={ENGINE_BUILD_HASH}" data-site-id="{id}" data-site-version="{v}" data-page="{escaped page}" data-supabase-url="{NEXT_PUBLIC_SUPABASE_URL}" data-supabase-anon-key="{NEXT_PUBLIC_SUPABASE_ANON_KEY}" defer></script>`.
3. Streams the rest unchanged.
4. Falls back to no-op injection if `</body>` not found before EOF (still serve original).

Use `TransformStream` to avoid buffering the whole document in memory.

---

## 10. Auth Model (v1)

- **Read overrides:** same authorization as the underlying site (public, signed-in-with-org-match, or valid share token). Engine fetches via the API, which reuses the existing auth helper.
- **Write overrides:** WorkOS session required, AND user is in `allowed_org_ids` for the site (or is an admin). Anonymous and share-token sessions are 403 on writes.
- **Toolbar visibility:** server-rendered hint on the injected `<script>` tag (`data-can-edit="true|false"` resolved server-side). Engine only mounts UI if true.

---

## 11. Acceptance Criteria

### Setup
- [ ] Migration `008_site_overrides.sql` runs cleanly on a fresh DB and on the current production DB.
- [ ] `sites` table has `overrides_enabled` (default false) and `current_version` (default 1).
- [ ] Re-uploading a site bumps `current_version` by 1.

### Serving
- [ ] Hosting a site with `overrides_enabled=false` serves byte-identical HTML to today (no script injection, no perf regression).
- [ ] Hosting a site with `overrides_enabled=true` serves HTML with exactly one injected `<script>` tag immediately before `</body>`.
- [ ] Non-HTML responses (CSS, JS, images) are never transformed.

### Engine — read path
- [ ] On a clean profile (no localStorage), opening a site with overrides applies all stored overrides before first paint or within one frame after.
- [ ] On a profile with stale `localStorage`, the cached overrides paint instantly, then reconcile when the network response arrives.
- [ ] Elements with `data-no-edit`, `data-canvas-key`, or inside `<script>/<style>/<form>` are never targeted.

### Engine — edit path (signed-in user)
- [ ] Pressing `E` toggles edit mode; toolbar reflects state.
- [ ] Hovering any candidate element in edit mode shows an outline.
- [ ] Clicking a candidate makes it editable; typing produces a `PUT` within 400ms of last keystroke.
- [ ] Refreshing the page shows the edit applied.
- [ ] Opening the same page in another browser shows the edit within 1s without refresh.
- [ ] Pressing Esc exits edit on the focused element without saving an extra change.
- [ ] "Reset this element" deletes the override; element reverts to original.

### Engine — non-editor
- [ ] An anonymous viewer (or share-token viewer) of an overrides-enabled site sees overrides applied but no toolbar, no hotkey, no clickable affordances.
- [ ] `PUT /_overrides/...` from such a session returns 403.

### Re-upload behavior
- [ ] Re-uploading bumps version; the new version starts with zero overrides applied.
- [ ] Old version's overrides remain in the DB (not deleted).

### Auth & RLS
- [ ] Direct anon-key writes to `site_overrides` from the browser are rejected by RLS.
- [ ] Read overrides on a private site without auth returns 403.

---

## 12. Open Questions

- **[Engineering]** Should `engine.js` be served from Next.js (`/_overrides/engine.js`) or from a CDN-fronted Supabase Storage object? Next is simpler; CDN is faster at scale. Default: Next, revisit if measured slow.
- **[Engineering]** Realtime: subscribe directly from the browser using the anon key + RLS that allows SELECT on `site_overrides`, OR proxy via SSE through Next? Direct is simpler and works for public sites; proxy is needed only if reads should be gated. **Decision needed before implementation.**
- **[Product]** When overrides are toggled OFF on a site, should existing overrides be hidden, deleted, or kept but inert? Default proposed: kept but inert (no fetch / apply). Confirm.
- **[Design]** What does the toolbar look like? v1 can ship a minimal text+button bar; design polish is a fast-follow.
- **[Engineering]** Do we need rate-limiting on `PUT /_overrides`? An accidental loop could thrash the table. Recommend: per-session 10 req/sec soft cap.

---

## 13. Phasing

**Phase 1 — Plumbing (no UI)**
- Migration, sites flags, `current_version` bump on re-upload.
- API endpoints (GET/PUT/DELETE) + auth wiring.
- Inject script transform; engine.js stub that just fetches and applies overrides (no edit UI).

**Phase 2 — Edit mode**
- Toolbar, hotkey, hover outline, click-to-edit, debounced save.
- localStorage cache + write-through.

**Phase 3 — Realtime**
- Supabase channel subscribe + echo suppression.
- Multi-client live propagation.

**Phase 4 — Admin polish**
- Toggle in admin UI for `overrides_enabled`.
- "View overrides" panel listing all overrides on the current page with revert buttons.
- Orphan recovery via fingerprint when path doesn't match.

Phases 1–3 are the v1 bar. Phase 4 is fast-follow after first dogfood.

---

## 14. Out of Scope (parking lot)

- Image/link/attribute overrides (`kind` field is in the schema; UI ships later).
- Per-presenter or per-session overrides.
- Edit history & restore from arbitrary point in time.
- Rich-text formatting (bold/italic) edits — v1 strips to `innerText`.
- Bulk import/export of overrides between site versions.
- Conflict UX for simultaneous edits on the same element.

---

## 15. Implementation Notes for Claude Code

- The route handler is the single chokepoint — do not introduce HTML transformation anywhere else.
- Reuse the existing auth helpers in `src/app/[slug]/[[...rest]]/route.ts` and admin actions; don't reinvent.
- The engine bundle should be self-contained (single IIFE, no module dependencies at runtime). Inline the Supabase Realtime client.
- Keep `engine.js` < 30KB gzipped. If it grows, split realtime as a lazy dynamic import.
- Test the streaming injection with an HTML file that has no `</body>` (some hand-written decks omit it) — fail open, serve original.
- Add a smoke E2E: upload a fixture HTML, enable overrides, edit a heading via Playwright, reload, assert text persists, open second context, assert live propagation.
