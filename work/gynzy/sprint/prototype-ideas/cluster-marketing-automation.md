# Cluster: Marketing Automation

> Sprint Day 1 — Prototype Ideas
> Source: Opportunity clustering session

---

## Original Ideas in Cluster

- Om het handmatige werk van het marketing team te verminderen moet het makkelijker zijn om audiences te selecteren en content in te plannen.
- Om gebruikers te helpen om Gynzy te ontdekken kunnen we met een next best tool / action de gebruikers helpen
- Om onze marketingcollega's te helpen tijd te besparen zorgen we ervoor dat het vullen van flows met content geen handmatig knip en plakwerk is maar een geautomatiseerd proces

---

## Prototype Ideas

### Prototype 1: "Quick Audience Picker"
**Complexity: Low**

| Aspect | Detail |
|--------|--------|
| **What it does** | Pre-built audience templates with one-click selection. Instead of building filters from scratch, choose from common patterns: "New users (last 30 days)", "Inactive bovenbouw", "High-usage no Live Lessons", etc. |
| **Build approach** | Simple UI with saved audience definitions. Could export as Intercom filter config or just display criteria for manual setup. |
| **Input needed** | List of commonly used audience definitions from the team |
| **Demo output** | Dropdown: select "Re-engagement candidates" → shows criteria + estimated size (340 users) → copy filter to Intercom |
| **Time estimate** | 2-3 hours |

---

### Prototype 2: "Content Auto-Filler"
**Complexity: Low-Medium**

| Aspect | Detail |
|--------|--------|
| **What it does** | Given a flow structure (e.g., 5-step onboarding), auto-populates each step with content from the content library. No more copy-paste between docs and Intercom. |
| **Build approach** | Flow template + content library → matching algorithm suggests content per step → outputs ready-to-use content blocks |
| **Input needed** | Flow templates with step types, content library tagged by purpose/stage |
| **Demo output** | Select "Onboarding Flow Template" → system fills: Step 1 = Welcome email, Step 2 = First lesson tip, Step 3 = Live Lesson intro... with actual content ready to paste |
| **Time estimate** | 3-4 hours |

---

### Prototype 3: "Next Best Action Suggester"
**Complexity: Medium**

| Aspect | Detail |
|--------|--------|
| **What it does** | For any user, suggests their logical next action in Gynzy. Powers both in-product nudges AND marketing emails with the same logic. |
| **Build approach** | Decision tree or AI-based: user state → next best action. Output includes action, reason, and suggested message. |
| **Input needed** | User journey stages, feature usage data, action catalog |
| **Demo output** | User: created 5 lessons, 0 Live Lessons, grade 4 → "Next Best Action: Try Live Lessons. Reason: 82% of similar teachers found this valuable. Suggested message: [generated copy]" |
| **Time estimate** | 4-5 hours |

---

### Prototype 4: "Campaign Assembly Line"
**Complexity: Medium-High**

| Aspect | Detail |
|--------|--------|
| **What it does** | Semi-automated workflow: Select goal → Get audience suggestion → Get content suggestions → Review & approve → Export ready for Intercom. Reduces multi-tool juggling. |
| **Build approach** | Step-by-step wizard UI combining audience picker + content generator + flow structure. Human approves each step. |
| **Input needed** | Audience templates, content library, flow templates |
| **Demo output** | Goal: "Re-engage inactive Flanders teachers" → Suggested audience (127 users) → Generated 3-email sequence → Approve → Export content + segment definition |
| **Time estimate** | 5-6 hours |

---

### Prototype 5: "One-Prompt Campaign"
**Complexity: High**

| Aspect | Detail |
|--------|--------|
| **What it does** | Describe campaign in one sentence → AI generates complete campaign: audience definition, flow structure, content for each step, timing recommendations. Human reviews and tweaks. |
| **Build approach** | OpenAI with structured output → generates full campaign spec. Could include mermaid flow diagram + content + segment rules. |
| **Input needed** | Available data fields, content library, flow patterns, brand guidelines |
| **Demo output** | Input: "Win back teachers who tried Live Lessons once but never again" → Output: Segment definition, 4-step flow diagram, 4 email drafts, recommended send times, success metrics |
| **Time estimate** | 6-8 hours |

---

## Summary

| Prototype | Complexity | Time | Best For |
|-----------|------------|------|----------|
| Quick Audience Picker | Low | 2-3h | Immediate time saver, low risk |
| Content Auto-Filler | Low-Medium | 3-4h | Kills copy-paste pain directly |
| Next Best Action Suggester | Medium | 4-5h | Powers product + marketing alignment |
| Campaign Assembly Line | Medium-High | 5-6h | End-to-end workflow improvement |
| One-Prompt Campaign | High | 6-8h | Maximum "wow", shows full AI potential |

---

## Recommendation

Build **#2 (Content Auto-Filler)** + **#1 (Quick Audience Picker)** — Both directly attack the "handmatig werk" pain. Together they eliminate the two most tedious parts: finding the right audience and copy-pasting content into flows.

If you want to show vision: **#5 (One-Prompt Campaign)** is high impact for demos, though more ambitious.
