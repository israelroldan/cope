# Day 1 Transcript Summary — Gynzy Growth Sprint

*January 12, 2026 | JADS Den Bosch*
*17 sessions | ~3 hours of conversation*

---

## Overview

The Gynzy Growth Sprint kicked off with process mapping, benchmarking, and prototype ideation sessions. The team mapped the current marketing automation workflow, identified pain points, explored AI opportunities, and converged on prototype directions within technical constraints.

---

## Morning Sessions (11:00-12:00)

**User consent and communication (11:33)** — Brief discussion about how users give consent for email communications and the terms/conditions flow.

**Academy inspiration (11:46)** — Team reviewed prototype ideas for schools, emphasizing step-by-step solutions rather than all-in-one approaches. Referenced inspiration materials in the Miro board and Gynzy Academy.

**Learning goals from data (11:59)** — Discussion about transforming boring learning goals into engaging ones using data. Explored creating personalized training paths based on user data, potentially at school level rather than individual teacher level.

---

## Midday Sessions (12:00-13:00)

**Benchmark session kickoff (12:44)** — Sander outlined the afternoon agenda: installation benchmarks (market analysis, competitor tools), followed by marketing team interviews to understand pain points and opportunities. Each participant asked to identify inspiring tools/companies and note why they're relevant.

**Trade configuration (12:53)** — Brief technical discussion about configuration and video creation.

---

## Early Afternoon (13:00-14:00)

**App personalization examples (13:14)** — Team discussed personalization patterns from other apps, including post-action notifications ("you're doing great"), in-app messaging vs email, and how children's apps handle engagement. Noted the value of personalized next-screen experiences.

**Behavior signals for flows (13:30)** — Discussion about using classroom behavior signals (like "four wall signal" and student trainer usage) as triggers for flows. Emphasized that AI support should augment teachers, not replace their judgment.

**AI marketing case studies (13:35)** — Israel shared examples of behavior-driven marketing (like IXL's "your child struggles with fractions" emails). Referenced Customer.io case studies in the Miro board showing similar workflows to what Gynzy wants to achieve.

**B2B value proposition (13:45)** — Discussed the challenge of demonstrating clear ROI to users in B2B software. Users need to see direct value from completing steps. Marketing opportunity: use specific quotes and use cases.

---

## Core Afternoon Sessions (14:00-16:00)

**Optimizing onboarding with AI (13:52, 17 min)** — Deep discussion on using AI for content automation and code changes. Proposed a "content generation engineer" role/workflow. Raised questions about Figma vs Intercom as source of truth. Discussed legacy tools not optimized for scale, flow overlap issues, and when to retire inactive flows.

**Onboarding vs penetration flows (14:12, 20 min)** — Key distinction between onboarding/activation flows and deeper penetration flows for existing users. Discussed school-level vs user-level signals, and the transition point between flow types. **Major concern: information loss when translating Figma designs to Intercom builds.** Suggestion: make Intercom the source of truth with Figma as documentation. Ended with a 30-minute individual prioritization exercise.

**Tatoma product framework (14:34, 27 min)** — Longest and most substantive session. Team refined the TATOMA framework for prototype development: Target, Assumptions, Thin slice, Test, One-page, Minimal build, After-action capture. Discussed three prototype concepts:
1. **AI tagging assistant** — auto-create properties from behavioral data
2. **Flow generator** — natural language to flow definitions
3. **Air traffic control** — manage overlapping campaigns

**Critical discovery: Intercom API cannot create or modify flows.** This blocked the flow generator concept. Discussion of integrations with BigQuery, Census, Customer.io. Noted human-in-the-loop as firm requirement.

**Smart segments and content (15:02, 12 min)** — Discussed AI-generated content as building blocks (suggestions, not replacement). Introduced smart segments that auto-update based on behavior rather than manual segmentation. Key: maintain onboarding flows alongside behavior-triggered communications.

**Recommendation engine concept (15:16, 9 min)** — Exploratory discussion about user-content matrix models. Users on X-axis, content on Y-axis, calculate similarity to form clusters. Advisory and mixed recommendation approaches. Making milestones visible in product and communications.

**Intent-based messaging (15:29, 17 min)** — Shift from defining exact flows to capturing intent behind each goal. Let AI/tooling generate sequences per segment. Next-best-action suggestions. Advisory tool to move users through lifecycle stages. Color-coded prioritization exercise to select top opportunities.

**Week planning (16:02, 6 min)** — Wrap-up session. Define top 1-3 priorities for the week. Build prototype v0.1 or v0.2. Tomorrow: tracking session and action item review. Explore partner test for access/feedback.

---

## Key Themes

1. **Static → Dynamic:** Current flows are linear and static; need behavior-driven, adaptive flows
2. **Manual → Automated:** Too much manual work in tagging, content creation, and flow building
3. **Siloed → Visible:** No shared oversight; need visibility into coverage and overlap
4. **Design → Implementation Gap:** Figma designs lose fidelity when built in Intercom
5. **API Constraints:** Can't programmatically create flows — must work with tags/attributes instead

---

## Decisions Made

- **Pivot prototype direction** due to API constraints — focus on tagging and coverage, not flow creation
- **Intercom as source of truth** for flows, with Figma as documentation
- **Human-in-the-loop required** — AI suggests, human approves
- **TATOMA framework** adopted for prototype briefs
- **Prioritization exercise** to select top 1-3 priorities for the week

---

## Prototype Concepts (Post-Pivot)

| Prototype | Description | Status |
|-----------|-------------|--------|
| **AI Tagging Assistant** | Suggest tags from behavior data, human approves, push via API | Primary |
| **Coverage Analyzer** | Show users in no flow or multiple flows | Secondary |
| **Content Assistant** | AI-generated content building blocks | Tertiary |
| ~~Flow Generator~~ | ~~Natural language to flow definitions~~ | Blocked by API |

---

## Action Items Captured

- Define top 1-3 priorities (Day 2)
- Get sample user data with tags
- Map current tag → flow relationships
- Build prototype v0.1
- Schedule partner test for feedback

---

## Participants

**Core team:** Annemarie, Stefanie, Roberto, Maria, Dwayne, Joke
**Tatoma:** Sander (facilitator), Israel
**Data:** Koen

---

*Summary complete. Full transcripts available in day1-sessions-part1.md and day1-sessions-part2.md*
