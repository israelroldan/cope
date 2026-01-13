# Cluster: Content Management & Modular Design

> Sprint Day 1 — Prototype Ideas
> Source: Opportunity clustering session

---

## Original Ideas in Cluster

- Om het marketingteam te helpen bij het maken van gepersonaliseerde content op schaal, gaan we werken met een dynamische template waarin voor alle tools afbeeldingen en teksten worden gemaakt en automatisch worden ingevuld in de flow die je bouwt.
- Tatoma: Flow Designer — In order to build more personalized flows we will create a flow generator
- Tatoma: In order to create & test faster with flows, we create a content generation engine based on goals and flows
- In order to enable reuse and scalable personalization, we will design content as modular building blocks based on journey stage and user intent, not on segments. Our unique solution is a content library that can be dynamically combined per segment or flow.

---

## Prototype Ideas

### Prototype 1: "Block Library"
**Complexity: Low**

| Aspect | Detail |
|--------|--------|
| **What it does** | Structured catalog of reusable content blocks, organized by journey stage + user intent (not by segment). Makes existing content discoverable and reusable. |
| **Build approach** | Airtable/Notion database with fields: block name, journey stage, intent, content type (email/in-app/banner), text, image URL, localization status |
| **Input needed** | Inventory of existing content from current flows |
| **Demo output** | Searchable library: "Show me all 'feature discovery' blocks for 'activated' stage" → 8 results, 5 localized for Flanders |
| **Time estimate** | 2-3 hours |

---

### Prototype 2: "Content Draft Generator"
**Complexity: Low-Medium**

| Aspect | Detail |
|--------|--------|
| **What it does** | Given a goal + target segment + tone, AI generates draft content (email subject, body, CTA). Can generate multiple variants for A/B testing. |
| **Build approach** | OpenAI API with prompt template. Input form → multiple content variants output. Could include Flanders/NL localization toggle. |
| **Input needed** | Brand voice guidelines, example content that performed well, segment descriptions |
| **Demo output** | Input: "Re-engage inactive bovenbouw teachers, friendly tone" → 3 email variants with subjects, preview text, body, CTAs |
| **Time estimate** | 3-4 hours |

---

### Prototype 3: "Template Personalizer"
**Complexity: Medium**

| Aspect | Detail |
|--------|--------|
| **What it does** | Dynamic template with placeholders that auto-fill based on user attributes. Shows how one template becomes many personalized versions. |
| **Build approach** | Simple web app: template editor with {{variables}} → preview panel showing rendered output for different sample users |
| **Input needed** | List of available personalization variables (name, school, grade, tool usage, etc.) |
| **Demo output** | Template: "Hi {{name}}, we noticed {{school_name}} hasn't tried {{unused_feature}} yet..." → Preview for 3 different teachers showing personalized output |
| **Time estimate** | 3-5 hours |

---

### Prototype 4: "Flow Blueprint Generator"
**Complexity: Medium-High**

| Aspect | Detail |
|--------|--------|
| **What it does** | Given goals + available content blocks + target segment, AI generates a flow structure with branches. Outputs visual diagram + content-to-step mapping. |
| **Build approach** | OpenAI API → structured JSON output → mermaid diagram renderer. Content blocks from library get mapped to flow steps. |
| **Input needed** | Goal description, content block library, segment definition, key decision points |
| **Demo output** | Input: "Onboarding flow for new Flemish teachers" → Mermaid diagram with 5 steps, 2 branches (engaged vs. struggling), content blocks assigned to each |
| **Time estimate** | 5-6 hours |

---

### Prototype 5: "Smart Assembler"
**Complexity: High**

| Aspect | Detail |
|--------|--------|
| **What it does** | Full content orchestration: given user state, AI selects and assembles content blocks into a personalized message. Combines modular content + dynamic logic. |
| **Build approach** | Backend with content block database + AI selection layer + template rendering. Input user profile → output fully assembled, personalized message. |
| **Input needed** | Content block library, user state schema, assembly rules/priorities |
| **Demo output** | Input: Teacher profile (grade 4, Flanders, created lessons, no Live Lessons, active last week) → Output: Assembled email with personalized intro + relevant feature tip + localized CTA |
| **Time estimate** | 6-8 hours |

---

## Summary

| Prototype | Complexity | Time | Best For |
|-----------|------------|------|----------|
| Block Library | Low | 2-3h | Foundation piece, enables reuse |
| Content Draft Generator | Low-Medium | 3-4h | Speeds up content creation, easy win |
| Template Personalizer | Medium | 3-5h | Shows personalization at scale |
| Flow Blueprint Generator | Medium-High | 5-6h | Addresses flow design pain, visual output |
| Smart Assembler | High | 6-8h | Full vision of modular + dynamic |

---

## Recommendation

Build **#2 (Content Draft Generator)** + **#1 (Block Library)** — Content Generator shows immediate AI value for the team; Block Library creates the foundation for modular thinking. Together they shift from "build from scratch" to "generate + assemble."

Alternatively, if you want more visual impact: **#4 (Flow Blueprint Generator)** directly addresses the "static linear path" pain with tangible output.
