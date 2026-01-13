# Cluster: Segmentation & Tagging

> Sprint Day 1 — Prototype Ideas
> Source: Opportunity clustering session

---

## Original Ideas in Cluster

- In order to help het marketingteam met tijdrovende handmatige segmentatie, willen we slimme AI-segmenten genereren die zichzelf bijwerken op basis van gedrag en voortgang.
- Automated user bucketing based on interactions and preferences / Automated activity/content bucketing (Collaborative filtering)
- Tatoma: Audience discovery — In order to better understand our teachers we build automated audience discovery including AI tagging automation
- In order to create simpler rules for segmentation, we will make key decisions explicit using simple if/then rules. Our unique solution is shared decision logic that lives outside people's heads.

---

## Prototype Ideas

### Prototype 1: "Rule Externalizer"
**Complexity: Low**

| Aspect | Detail |
|--------|--------|
| **What it does** | Captures the if/then segmentation logic that currently lives in people's heads. Creates a shared, documented decision tree for segment rules. |
| **Build approach** | Simple form interface (Notion, Airtable, or quick web app) where team inputs rules. Could auto-generate decision tree visualization. |
| **Input needed** | Interview with Annemarie/Maria: "How do you decide who goes in segment X?" |
| **Demo output** | Visual decision tree: "IF region=Flanders AND grade=bovenbouw AND lessons_created<3 THEN → Onboarding Flow B" |
| **Time estimate** | 2-3 hours |

---

### Prototype 2: "AI Tag Suggester"
**Complexity: Low-Medium**

| Aspect | Detail |
|--------|--------|
| **What it does** | Given a user profile, AI suggests which tags should be applied based on learned patterns. Human reviews and approves before tags are pushed. |
| **Build approach** | OpenAI API + user data input → tag recommendations. Could be CLI tool or simple web UI. Intercom API supports tag operations. |
| **Input needed** | Sample user data (attributes + behaviors) + existing tag taxonomy |
| **Demo output** | "User 12345: Recommend tags [at-risk], [low-engagement], [bovenbouw]. Confidence: 87%. Reason: No login in 21 days, 2 lessons created but not delivered." |
| **Time estimate** | 3-4 hours |

---

### Prototype 3: "Audience Discovery"
**Complexity: Medium**

| Aspect | Detail |
|--------|--------|
| **What it does** | AI analyzes user data to find natural clusters/segments the team hasn't explicitly defined. Surfaces "hidden" audiences. |
| **Build approach** | Python clustering (k-means or similar) on user attributes + behaviors → visualization of discovered segments with descriptions |
| **Input needed** | User export with attributes (region, grade, license, usage metrics) |
| **Demo output** | "Discovered 5 natural clusters. Cluster 3: 'Weekend Preppers' — 340 teachers who only log in Saturday/Sunday, high lesson creation, zero Live Lessons. Currently not targeted by any flow." |
| **Time estimate** | 4-5 hours |

---

### Prototype 4: "Natural Language Segment Builder"
**Complexity: Medium-High**

| Aspect | Detail |
|--------|--------|
| **What it does** | User describes segment in plain language, AI generates the filter rules in Intercom-compatible format |
| **Build approach** | OpenAI API with structured output → generates filter JSON/rules. Could include validation against available data fields. |
| **Input needed** | List of available Intercom attributes + example segment descriptions |
| **Demo output** | Input: "Teachers in Flanders who started in last 30 days and haven't tried Live Lessons yet" → Output: Intercom filter config + estimated audience size |
| **Time estimate** | 4-6 hours |

---

### Prototype 5: "Lookalike Finder"
**Complexity: High**

| Aspect | Detail |
|--------|--------|
| **What it does** | "Find more teachers like this one" — collaborative filtering to identify similar users based on behavior patterns, not just attributes |
| **Build approach** | ML model (embeddings or similarity scoring) on user activity data. Input seed users → output similar users. |
| **Input needed** | Rich behavioral data (events, content interactions, feature usage) |
| **Demo output** | "Based on 10 'champion teachers' you identified, here are 45 more with similar patterns who could be champions. Common traits: 5+ Live Lessons, shares content, logs in 4+ days/week." |
| **Time estimate** | 6-8 hours |

---

## Summary

| Prototype | Complexity | Time | Best For |
|-----------|------------|------|----------|
| Rule Externalizer | Low | 2-3h | Quick win, documents tribal knowledge |
| AI Tag Suggester | Low-Medium | 3-4h | Directly addresses tagging pain, API-ready |
| Audience Discovery | Medium | 4-5h | Reveals blind spots, "aha moment" potential |
| NL Segment Builder | Medium-High | 4-6h | Speeds up segment creation, reduces errors |
| Lookalike Finder | High | 6-8h | Advanced, enables champion identification |

---

## Recommendation

Build **#2 (AI Tag Suggester)** + **#3 (Audience Discovery)** — Tag Suggester directly solves Maria's pain and works with API; Audience Discovery creates "wow" moments by revealing segments they didn't know existed.
