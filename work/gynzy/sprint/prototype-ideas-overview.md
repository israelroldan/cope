# Prototype Ideas Overview

> Sprint Day 1 — Consolidated View
> Source: Opportunity clustering session
> Purpose: Pick prototypes to build Day 2-3

---

## Summary

| Cluster | # of Ideas | Recommended Pick |
|---------|------------|------------------|
| Communication & Optimization | 5 | Air Traffic Control + Breakpoint Finder |
| Segmentation & Tagging | 5 | AI Tag Suggester + Audience Discovery |
| Content & Modular Design | 5 | Content Draft Generator + Block Library |
| Personalization & Recommendations | 5 | Milestone Celebrator + Agentic Message Crafter |
| Marketing Automation | 5 | Content Auto-Filler + Quick Audience Picker |
| **Total** | **25** | **10 recommended** |

---

## All Prototypes by Complexity

### Low Complexity (2-3 hours)

| Prototype | Cluster | Time | Value |
|-----------|---------|------|-------|
| Timing Oracle | Communication | 2-3h | Quick insight on optimal send times |
| Breakpoint Finder | Communication | 2-4h | Shows where Gynzyfication stalls |
| Rule Externalizer | Segmentation | 2-3h | Documents tribal knowledge |
| Block Library | Content | 2-3h | Foundation for content reuse |
| Milestone Celebrator | Personalization | 2-3h | High emotional impact, users feel seen |
| Quick Audience Picker | Marketing Automation | 2-3h | Immediate time saver |

### Low-Medium Complexity (3-4 hours)

| Prototype | Cluster | Time | Value |
|-----------|---------|------|-------|
| AI Tag Suggester | Segmentation | 3-4h | Directly solves tagging pain, API-ready |
| Content Draft Generator | Content | 3-4h | Speeds up content creation |
| Next Best Feature | Personalization | 3-4h | Drives feature adoption |
| Content Auto-Filler | Marketing Automation | 3-4h | Kills copy-paste pain |

### Medium Complexity (4-5 hours)

| Prototype | Cluster | Time | Value |
|-----------|---------|------|-------|
| Air Traffic Control Dashboard | Communication | 4-6h | P0 priority — solves overlap pain |
| Audience Discovery | Segmentation | 4-5h | Reveals hidden segments, "aha" moments |
| Template Personalizer | Content | 3-5h | Shows personalization at scale |
| Agentic Message Crafter | Personalization | 4-5h | AI agent approach + localization |
| Next Best Action Suggester | Marketing Automation | 4-5h | Powers product + marketing |

### Medium-High Complexity (5-6 hours)

| Prototype | Cluster | Time | Value |
|-----------|---------|------|-------|
| Adaptive Journey Simulator | Communication | 4-6h | Vision demo, shows dynamic flows |
| Natural Language Segment Builder | Segmentation | 4-6h | Speeds up segment creation |
| Flow Blueprint Generator | Content | 5-6h | Addresses static path pain, visual output |
| Smart Recommendation API | Personalization | 5-6h | Unified engine for product + marketing |
| Campaign Assembly Line | Marketing Automation | 5-6h | End-to-end workflow |

### High Complexity (6-8 hours)

| Prototype | Cluster | Time | Value |
|-----------|---------|------|-------|
| Moment Orchestrator | Communication | 6-8h | Full paradigm shift to moment-based |
| Lookalike Finder | Segmentation | 6-8h | Advanced ML, champion identification |
| Smart Assembler | Content | 6-8h | Full modular + dynamic content |
| Personal Communication Engine | Personalization | 6-8h | "Feels made for me" vision |
| One-Prompt Campaign | Marketing Automation | 6-8h | Maximum wow, full AI potential |

---

## Recommended Build Plan

### If Building 1 Per Cluster (5 prototypes)

| Cluster | Pick | Complexity | Time | Why |
|---------|------|------------|------|-----|
| Communication | **Air Traffic Control** | Medium | 4-6h | Directly solves P0 overlap pain |
| Segmentation | **AI Tag Suggester** | Low-Medium | 3-4h | API-ready, addresses Maria's pain |
| Content | **Content Draft Generator** | Low-Medium | 3-4h | Immediate AI value for team |
| Personalization | **Agentic Message Crafter** | Medium | 4-5h | Shows AI agent vision + localization |
| Marketing Automation | **Content Auto-Filler** | Low-Medium | 3-4h | Kills manual copy-paste |

**Total estimated time: 18-21 hours** (feasible for 2 people over 2 days)

---

### If Building 2 Per Cluster (10 prototypes)

| Cluster | Primary | Secondary | Combined Time |
|---------|---------|-----------|---------------|
| Communication | Air Traffic Control | Breakpoint Finder | 6-10h |
| Segmentation | AI Tag Suggester | Audience Discovery | 7-9h |
| Content | Content Draft Generator | Block Library | 5-7h |
| Personalization | Agentic Message Crafter | Milestone Celebrator | 6-8h |
| Marketing Automation | Content Auto-Filler | Quick Audience Picker | 5-7h |

**Total estimated time: 29-41 hours** (ambitious for 2 people over 2 days, but possible with parallel work)

---

### Minimal Viable Demo (If Time-Constrained)

Pick **3 prototypes** that together tell a complete story:

| Prototype | Cluster | Time | Story Role |
|-----------|---------|------|------------|
| **Air Traffic Control** | Communication | 4-6h | "We see the problem" (visibility) |
| **AI Tag Suggester** | Segmentation | 3-4h | "AI helps us act" (automation) |
| **Agentic Message Crafter** | Personalization | 4-5h | "Content becomes personal" (output) |

**Total: 11-15 hours** — Achievable in 1 focused day with 2 people

**Demo narrative:** "First we see which users are stuck (Air Traffic Control), then AI helps us tag them correctly (Tag Suggester), then AI crafts personalized messages for them (Message Crafter)."

---

## Prototype Synergies

Some prototypes are **more valuable together**:

| Combo | Why They Work Together |
|-------|------------------------|
| Air Traffic Control + Breakpoint Finder | Visibility layer: see overlaps AND see where users stall |
| AI Tag Suggester + Audience Discovery | Segmentation layer: find hidden segments AND auto-tag users |
| Content Draft Generator + Block Library | Content layer: library provides structure, generator fills it |
| Quick Audience Picker + Content Auto-Filler | Automation layer: pick audience fast, fill content fast |

---

## Decision Matrix

| If You Want... | Build This |
|----------------|------------|
| Quick wins to show AI value | Milestone Celebrator, Timing Oracle, Quick Audience Picker |
| Solve P0 pain (overlap/coverage) | Air Traffic Control, Breakpoint Finder |
| Address Maria's tagging pain | AI Tag Suggester, Rule Externalizer |
| Show "wow" vision for Thursday | One-Prompt Campaign, Agentic Message Crafter |
| Foundation for future work | Block Library, Rule Externalizer, Audience Discovery |
| Product + Marketing alignment | Smart Recommendation API, Next Best Action Suggester |

---

---

# Prototype Briefs (Top 5 Recommended)

## 1. Air Traffic Control Dashboard

**Raw context:** Gynzy has 210 flows (27 live) and no way to see which users are in multiple flows simultaneously. Users can receive conflicting messages, or get overwhelmed when they qualify for several campaigns at once. The team operates with "angst" — fear that launching a new flow will cause problems they can't see. Intercom has no native overlap prevention. As they scale personalization, this problem gets exponentially worse.

**Goals:** Build a dashboard that shows (1) which users are currently in multiple flows, (2) which flow combinations conflict most, and (3) recommendations for which message should "win" when there's overlap. Start with visibility, later add the ability to apply suppression tags via API.

**Workflow:** Pull user data with flow memberships → analyze for overlaps → display conflicts in simple UI → show recommendations based on priority rules (e.g., "onboarding beats feature tips") → human reviews → optionally push suppression tags.

**What we want to learn:** Can we actually get flow membership data out of Intercom? How bad is the overlap problem really (10 users or 1,000)? Will the team trust AI-generated priority recommendations? Is tag-based suppression a viable workaround for the missing API?

---

## 2. AI Tag Suggester

**Raw context:** Maria described tagging as painful — sometimes manual, sometimes CSV upload, always requiring "vetting" before segments can be designed. Tags are the bridge between raw user data and flow entry rules. The decision logic for "who gets which tag" lives in people's heads. Intercom's API DOES support tag operations, making this automatable.

**Goals:** Build a tool where you input a user (or batch of users) and AI suggests which tags should be applied, with confidence scores and reasoning. Human reviews suggestions before they're pushed. Proves AI can handle the "vetting" step that currently bottlenecks segmentation.

**Workflow:** Input user profile (attributes + behaviors) → AI analyzes against tag taxonomy and learned patterns → outputs tag recommendations with confidence + reasoning ("No login in 21 days + 2 lessons created = [at-risk], [needs-nudge]") → human approves/rejects → approved tags pushed via Intercom API.

**What we want to learn:** Can we codify the tagging decision logic that's currently tribal knowledge? How much context does the AI need to make good suggestions? Will Maria trust the recommendations? What confidence threshold makes human review feel safe vs. tedious?

---

## 3. Content Draft Generator

**Raw context:** Creating content for flows is slow. The team needs to write copy, localize for NL vs. Flanders, create variants for different segments, and do this repeatedly for every flow. They already use ChatGPT for some content work, but it's ad-hoc. Scaling personalization means scaling content creation — impossible with 3 people doing it manually.

**Goals:** Build a tool where you input a goal + target segment + tone, and AI generates draft content: email subject lines, body copy, CTAs. Bonus: generate multiple variants for A/B testing and handle NL/Flanders localization automatically.

**Workflow:** Input form (goal: "re-engage inactive teachers", segment: "bovenbouw Flanders", tone: "friendly") → AI generates 2-3 email variants → each variant includes subject, preview text, body, CTA → toggle to see NL vs. Flanders versions → human edits/approves → copy to Intercom.

**What we want to learn:** Can AI match Gynzy's brand voice with minimal examples? How good is automated NL↔Flanders localization? Do generated variants actually differ meaningfully? Will the team use this as a starting point or find it creates more work to edit?

---

## 4. Agentic Message Crafter

**Raw context:** The vision is "every message feels like it was made for me." Current flows are static — same message to everyone in a segment. Real personalization means: taking a user's specific context (what they've done, what they haven't, their school, their grade level) and crafting a message that speaks to THEM. This is the "agentic" approach — an AI agent that understands user state and generates appropriate communication.

**Goals:** Build an AI agent that takes user profile + communication intent (re-engage, upsell, tip, celebrate) and outputs a fully personalized message. The agent should handle localization (NL vs. Flanders), reference specific user actions ("we noticed you created 3 lessons but haven't tried Live Lessons"), and feel human.

**Workflow:** Input: user profile JSON + intent type → Agent processes: extracts relevant context, selects appropriate tone, incorporates specific details, localizes → Output: complete message ready to send, with explanation of personalization choices made.

**What we want to learn:** How specific can personalization get before it feels creepy? Does referencing actual user behavior increase engagement or freak people out? Can one agent handle all intent types or do we need specialized agents? How do we maintain brand consistency when every message is unique?

---

## 5. Content Auto-Filler

**Raw context:** Building a flow in Intercom means copying content from Google Docs, pasting into each step, formatting, repeat. For a 5-step flow with 2 regional variants, that's 10+ copy-paste operations. This is "handmatig knip en plakwerk" — manual scissors and paste work. It's not creative work, it's mechanical work that eats time and introduces errors.

**Goals:** Build a tool where you select a flow template (e.g., "5-step onboarding") and it auto-populates each step with appropriate content from a library. Match content to step based on purpose (welcome, tip, feature intro, re-engage). Output is ready-to-paste content blocks, correctly formatted.

**Workflow:** Select flow template → system shows steps with empty slots → for each slot, AI suggests matching content from library (or generates if not found) → human reviews/swaps content if needed → export all content blocks formatted for Intercom copy-paste (or as structured data).

**What we want to learn:** Does a content library actually exist, or do we need to build it first? How good is AI at matching "step 3 of onboarding" to appropriate content? Does this actually save time, or does reviewing/tweaking suggestions take just as long? Would the team prefer suggestions or full automation?

---

## Files Reference

Detailed specs for each cluster:
- `prototype-ideas/cluster-communication.md`
- `prototype-ideas/cluster-segmentation.md`
- `prototype-ideas/cluster-content.md`
- `prototype-ideas/cluster-personalization.md`
- `prototype-ideas/cluster-marketing-automation.md`
