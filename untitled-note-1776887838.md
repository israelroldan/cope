---
type: Note
---
StudyStars mother-site briefing

What I found in the ground

No existing marketing site for StudyStars. There is a real product codebase: ~/code/studystars/tlom-platform/ holds three\
Next.js 16 apps (parent-portal, facilitator, backoffice) plus a master brief at docs/context.md that still treats "The\
Library of Me" as the primary brand and carries its own tagline "Not worksheets. A Library of Me." That brief predates the\
2026-04-21 portfolio update that re-separated StudyStars from Pimpi Learn. The tlom-platform SOUL.md and the master brief\
have not been updated to reflect the StudyStars-as-canonical decision.

The souls directory also has dia-studystars.md, but it is a generic Dia-browser AI persona that was filed there by mistake.\
Not load-bearing.

1. Domain and brand architecture

Recommendation: StudyStars is the umbrella brand and program line. The Library of Me is the flagship program and its\
signature artifact. One site, one canonical URL.

- [studystars.net](http://studystars.net) carries the brand, the program catalog, the compliance story, the B2B contact surface.
- [thelibraryofme.com](http://thelibraryofme.com) 301s to studystars.net/programs/library-of-me for now, and earns its own page or microsite later if the program needs a consumer-direct surface for parents buying a hardcover book.

Why

The ventures-list line you already locked on [palu.io](http://palu.io) says "Programs that help older kids practice the skills schools don't\
grade". Programs, plural. That is umbrella language by construction. It leaves room for "User Manual for My Brain", "Say It\
Clearly", "Own the Week", and the twenty-plus modules the master brief already planned across five domains. A program line\
needs a program-line name. StudyStars works for that; The Library of Me does not.

The Library of Me, in the master brief, is literally described as the artifact the kid builds over a curriculum. "At\
Premium+, artifacts become professionally printed books — a literal 'Library of Me' on the shelf." That is the output of a\
program, not the brand of the program line. "Not worksheets. A Library of Me." is a curriculum-level tagline, not a B2B\
umbrella.

B2B buyers (schools, cohort networks, institutional facilitators) purchase program lines. They will not sign a procurement\
contract with a brand named after a deliverable. They will sign with a program-line brand that names the deliverable as its\
flagship.

Two-sites-two-brands fragments attention and doubles maintenance for a brand that is explicitly active-but-quiet. Park the\
second domain with a redirect and only spin it up if The Library of Me grows into a consumer-direct book product with its own\
audience (parents buying the finished hardcover as a gift, for example).

What to write into the tlom-platform brief

After you approve the above, the docs/context.md master brief and the SOUL.md both need a line change: brand = StudyStars,\
flagship program = The Library of Me, printed artifact keeps that name. That is a trailing edit, not this session's work, but\
flagging it here so it doesn't drift.

2. Visual identity

The brief was "set the visual system, don't just implement one." Here is the reasoning and what I'm proposing. No code yet.

Typography

- Headings: Fraunces. Variable serif, open-source, real optical sizing. Reads editorial and library-shelf without reading dusty-academic. Not Tomcat (Kimbi owns display serif warmth), not DM Sans (Palú and Pimpi own it), not Itim (Kimbi uses it for body). Fraunces at heavy weight with soft optical size gives the "this is a curriculum, not a product tour" register.
- Body: Inter. Workhorse sans, B2B-legible at small sizes, holds long-form compliance and facilitator documentation. Different from DM Sans across the family. Pairs cleanly with Fraunces.
- Mono (sparingly): JetBrains Mono or iA Writer Mono. Only for the rubric-level table (Emerging / Developed / Advanced) and the competency list. Signals "structured, systematic" without turning the whole page into an engineering doc.

Palette: ink-and-lamp

This is the biggest differentiator. Palú is paper-warm light. Kimbi is cream-warm light with animated chroma. Pimpi is\
post-it bright. All three live in daylight. StudyStars should live in lamplight.

┌────────────────────┬─────────┬───────────────────────────────────────────────────┐\
│ Token │ Value │ Role │\
├────────────────────┼─────────┼───────────────────────────────────────────────────┤\
│ --color-background │ #0f1b2c │ Deep midnight-ink. Not black. │\
├────────────────────┼─────────┼───────────────────────────────────────────────────┤\
│ --color-foreground │ #f6ecd6 │ Warm parchment. Inverse of Palú's cream. │\
├────────────────────┼─────────┼───────────────────────────────────────────────────┤\
│ --color-muted │ #a39a8a │ Warm dust. │\
├────────────────────┼─────────┼───────────────────────────────────────────────────┤\
│ --color-rule │ #1f2c40 │ Slightly lighter than bg for dividers. │\
├────────────────────┼─────────┼───────────────────────────────────────────────────┤\
│ --color-accent │ #e9a84a │ Study-lamp amber. Links, one underline, the star. │\
└────────────────────┴─────────┴───────────────────────────────────────────────────┘

The emotional frame: the desk at 9pm where serious work gets done, the lamp that lights the workbook page, the warm spine of\
a book on a library shelf. It reads grown-up without reading cold. It reads institutional without reading district-PDF. Kids\
who get to be there feel trusted with it, which is the brand promise.

Light-mode inverse for /compliance and long-form procurement docs: parchment #f6ecd6 background, ink #0f1b2c foreground, same\
amber. The long-form document surface inverts to signal "this is a record you can read and keep". The home and program pages\
stay ink.

Explicit contrast:

- vs Pimpi post-it: StudyStars is not playful, not flat-colored, not adhesive. It is literary and serious. Pimpi is the kid's bedroom wall. StudyStars is the desk under the lamp.
- vs Palú Labs paper: Palú is steady and daylight. StudyStars is steady and lamplight. Same steadiness (no animation, no chroma cycling, single accent), inverted surface. Cousins.
- vs Kimbi cream: Kimbi is warmth plus chromatic energy. StudyStars is warmth plus editorial stillness. No hue cycling, no micro-animations.

Mark

No commissioned logo for V1. Wordmark-only, rendered as studystars in Fraunces semibold italic with an amber five-point star\
as a terminal glyph or crossbar. Same pragmatic move Palú Labs made: typography does the work, a proper mark comes when the\
brand earns it. Defer the mark commission until StudyStars has a second program shipped or a signed B2B pilot.

Layout register

- Single column, 720px max on prose surfaces, 960px on catalog surfaces.
- Serif H1 with a 60–72ch measure, amber drop-in for the star glyph.
- Numbered sections for the compliance story (the five layers). Numbers in Fraunces, content in Inter.
- One interaction: amber underline on links, slight weight shift on hover. No animation, no parallax, no transitions longer than 160ms.
- Plenty of whitespace. Lab notebook, not marketing site.
- The Pimpi "state what it does" rule applies, reinforced by the grown-up register.
3. Site architecture

Single mother site. Progressive disclosure. Same Next 15 / React 19 / Tailwind v4 / TS 5.7 stack as Palú and Kimbi. Add\
next-intl and Resend on top.

Home (/)

1. Hero. Wordmark plus expanded tagline. Draft:\
   ▎ StudyStars runs programs that help older kids practice the skills schools don't grade, and keep what they build. For\
   facilitators, schools, and parents of pre-teens and young adults in Europe and Latin America.

2. The expansion preserves the locked Palú line and adds the audience. Nothing else on screen until scroll.
3. Programs. Named list, not cards. "User Manual for My Brain", "Say It Clearly", "Own the Week", plus the flagship link to\
   The Library of Me. Each entry: one-line description, duration, cohort size, the artifact the kid keeps. Styled like the\
   Ventures list on [palu.io](http://palu.io) (divider rules, domain-style right-aligned label, amber hover).

4. Seven competencies. Named list with the OECD Learning Compass 2030 reference as a footnote citation. Rubric levels\
   (Emerging / Developed / Advanced) as a small mono table. This is where grown-up buyers can see the pedagogy without having to\
   ask for a framework document.

5. How it's built to be safe. The five-layer architecture, numbered, one sentence per layer. Pre-reads are outbound. WhatsApp\
   is nudges only. Live sessions are human only. Workbooks are kid-owned. AI is parent-initiated, per-instance. One link to\
   /compliance for the procurement-length version. This section is the B2B reason to take the next meeting.

6. Who runs it, who it is for. Facilitator profile (warm, organized, follow scripts, not required to be pedagogy experts).\
   Audience: pre-teens and young adults in EMEA and LATAM. Explicit mention of tiger parents and expat families because that is\
   the actual market per the master brief.

7. The Library of Me. The flagship program gets its own on-home section because it is the load-bearing artifact. What the kid\
   ends up with. Where the hardcover fits. A single photograph or line-drawing of a book spine on a shelf, amber spine, kid's\
   name.

8. Get a pilot. B2B contact, not a consumer signup. One sentence: "Programs start when a cohort is ready. Write to us if you\
   want to run one at your school or network." Email, or a Resend form that routes by audience (school / facilitator / parent).

9. Footer. Palú Labs credit with link to [palu.io](http://palu.io), KvK number, contact email, language switcher (EN / ES / NL), minimal legal\
   (privacy, cookies). Compliance is in the architecture; the legal footer carries the absolute minimum.

Subpages

- /programs/[slug] — template route for each program. Starts with three real entries. Content in src/content/programs/*.ts so new programs slot in without code changes.
- /programs/library-of-me — the flagship. Destination of [thelibraryofme.com](http://thelibraryofme.com) redirect.
- /compliance — procurement-length expansion of the five layers. Written for a school privacy officer. Light-mode inverse palette. Printable. This is the document you send when a school asks for "your privacy policy".
- /facilitators — facilitator recruiting and onboarding page. Not V1; flagged as a slot for later.

Multi-locale

Same pattern as Snackjes. src/middleware.ts with next-intl. Routes under [locale]/. Default en. Locales en, es, nl.\
Auto-detect plus footer switcher. Content strings in messages/en.json, messages/es.json, messages/nl.json. Informal Dutch\
register always (je/jij). Spanish neutral-LATAM register (audience includes Mexico per the master brief). No flag icons.

How programs slot in later

Content-as-code. Each program is a typed TS object:

{\
slug, name, tagline, oneLiner,\
duration, cohortSize,\
competencies: [...],\
tiers: ['Trial' | 'Core' | 'Premium' | 'Premium+'],\
artifact: string,\
status: 'live' | 'upcoming' | 'parked',\
}

Parked programs sit in the array with status: 'parked' and don't render, same hidden: true pattern as [palu.io](http://palu.io)'s Ventures\
list. This keeps the catalog honest about what exists versus what is planned, without a CMS.

Repo location

Recommendation: ~~/code/studystars/website. Keeps the trade-name under one root next to tlom-platform, pimpi-monorepo,~~\
~~cowork-workspace. Matches how Kimbi is organized (~~/code/kimbigames/website, ~/code/kimbigames/snackjes/).

4. Clarifying questions before I scaffold

Seven, ranked by how much they block work.

1. The seven competencies. pimpi.md says three are confirmed (Critical Thinking, Adaptability, Systems Thinking) and four are TBC from OECD Learning Compass 2030. Do you have the full seven locked somewhere I haven't found, or do I ship V1 with three named and "four more in development" stated plainly?
2. Pricing visibility. The master brief has concrete prices (€120 / €180 / €250 / €350). On a B2B-posture site, do tiers appear with prices, with price ranges, or with "talk to us"? My lean: tier names and inclusions on the home, no prices, because the primary buyer is institutional. Contra-argument: parents of expat kids in Mexico also need to self-qualify. Your call.
3. The Library of Me's name treatment. I'm treating "The Library of Me" as a program and artifact name under the StudyStars brand. The tlom-platform SOUL still calls the whole thing The Library of Me. Confirm the split, or tell me if The Library of Me is supposed to stay brand-weight and StudyStars is something else.
4. Pimpi cross-reference. Portfolio.md says shared concepts travel freely between Pimpi Learn and StudyStars as patterns, but the brands stay distinct. On the public StudyStars site, do we mention Pimpi at all (as a sibling under Palú Labs), or is the narrative clean — Palú Labs umbrella in the footer, no visible Pimpi link?
5. Contact routing. One inbox (<hello@studystars.net>) with a short form that asks "I'm a school / facilitator / parent", or three separate addresses? My lean: one inbox, one form with the audience selector, Resend forwards to you.
6. Compliance page depth for V1. Procurement-ready long-form (~1500 words, printable, hits every COPPA/GDPR-K concern a school officer checks), or a crisp expansion of the five layers (~500 words) with a note that the full document is available on request? My lean: ship procurement-ready. It is the single most valuable surface for the B2B motion and you have the material.
7. Founder attribution. Palú Labs' hero says "Founded by Israel Roldán in 2017." Does StudyStars carry a founder line, or does it stay brand-only and let the Palú Labs footer handle attribution? I'd stay brand-only on StudyStars — the umbrella already does the personal attribution.

What I did not touch

- Soul file for StudyStars. The existing dia-studystars.md is mislabeled; the tlom-platform SOUL.md is product-codebase-scoped. A brand soul for the mother site is worth writing, but it is downstream of the answers to Q1 and Q3.
- The tlom-platform docs rename. Those edits are a follow-up once the brand architecture lands.
- Any code. Per your instruction.

Ready for your answers to the seven questions, or for a redirect on any of the four recommendations.
