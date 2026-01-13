# Prototype Briefs — Gynzy Growth Sprint

*Raw notes for Day 2-3 build phase*
*6 prototypes across 3 topics*

---

## TOPIC 1: AUDIENCE (Segmentation/Tagging)

### Prototype 1: AI Tag Suggester

**Raw context:** Maria's pain is manual tagging — deciding which users should get which tags, doing it via CSV uploads or one-by-one in Intercom. Tags drive flow entry, so wrong/missing tags = users in wrong flows or no flow at all. The team confirmed Intercom API supports tagging (unlike flow creation). Current process: look at user attributes, make a judgment call, manually apply tag. This doesn't scale with 19,000+ users. Annemarie and Maria have the logic in their heads but it's not codified anywhere.

**Goals:** Build a working prototype that takes user profile data (attributes + behavior signals from BigQuery), runs it through AI with encoded rules, and outputs tag suggestions with confidence scores and reasoning. Human reviews suggestions in a simple UI, approves/rejects, then approved tags get pushed to Intercom via API. Prove we can automate the "thinking" part while keeping human approval.

**Workflow:** Pull user data from BigQuery/Census export → AI analyzes against rules (engagement level, feature usage, school penetration, region) → outputs suggested tags + confidence + "because they..." reasoning → display in simple dashboard → human clicks approve/reject → batch approved tags → push to Intercom via API → user now enters appropriate flows automatically.

**What we want to learn:** Can we capture Annemarie/Maria's tagging logic in rules? How accurate are AI suggestions vs. human judgment? What confidence threshold feels right for batch approval? Does the team trust it enough to approve in bulk? What edge cases break the logic? How much time does this actually save vs. manual tagging?

---

### Prototype 2: Coverage Analyzer

**Raw context:** They have 210 flows, 27 live, and zero visibility into who's in what. "We weten niet wat doorslaggevend" — they don't know what's working. Users fall through cracks (coverage gaps — not in any flow) or get message fatigue (overlap — in multiple flows simultaneously). The transcript confirmed "we doen geen analyse" — they literally don't do post-launch analysis. This is P0 in our assessment because you can't fix what you can't see. Read-only operations are definitely API-supported.

**Goals:** Build a visibility dashboard that pulls user and flow membership data, analyzes coverage and overlap, and presents it clearly. Show: what % of users are in 0 flows, 1 flow, 2+ flows. Which specific flow combinations create overlap. Which user segments have no flow at all. Surface redundant flows (similar entry rules). Give the team their first real picture of the current state.

**Workflow:** Connect to Intercom API / get data export → pull all users with their flow memberships → calculate coverage stats (users in 0/1/2+ flows) → identify overlap patterns (which flows co-occur) → identify gaps (segments with no coverage) → visualize in simple dashboard → highlight problem areas → suggest which flows might be redundant or conflicting.

**What we want to learn:** Can we actually get flow membership data from Intercom (API or export)? What does the real overlap look like — is it 5% or 50%? Are there obvious coverage gaps we can point to? Does seeing this data change how the team thinks about their flows? What actions would they take based on this visibility? Is overlap actually causing harm (do they have message fatigue evidence)?

---

## TOPIC 2: NEXT BEST ACTION (Recommendations)

### Prototype 3: Next Best Feature Recommender

**Raw context:** Gynzy has tons of features (lesson builder, Live Lessons, quizzes, classroom tools, etc.) but teachers discover them randomly. The transcript mentioned "making milestones and successes visible" and the recommendation engine concept (user-content matrix, similarity clustering). They validated 9 months ago that personalized recommendations improve engagement but never operationalized it. The Gynzyfication funnel (Activate → Penetrate → Inflate) depends on teachers using more features and spreading to colleagues.

**Goals:** Build a simple recommender that looks at what features a teacher currently uses and suggests what to try next based on patterns from similar teachers. "Teachers like you also love Live Lessons" style. Could power both in-product suggestions and email content. Start rule-based or simple pattern matching, not full ML. Prove the concept works before over-engineering.

**Workflow:** Get user feature usage data (which tools they use, frequency) → define feature similarity or progression paths (lesson builder → Live Lessons → quizzes is natural) → for a given user, identify what they haven't tried that similar users love → generate recommendation with reasoning → output could feed into email content or in-product banner.

**What we want to learn:** What feature progressions actually exist in the data? Is there a natural "next step" for each feature? Do teachers find these recommendations helpful or annoying? What's the "creepy vs. helpful" line — how much should we reveal that we're tracking? Can we identify "champion" teachers who use everything and work backward from their journey?

---

### Prototype 4: Milestone Detector

**Raw context:** The transcript discussed "making milestones and successes visible in communication and product." Teachers hit meaningful moments (first lesson created, first Live Lesson delivered, 10th lesson, first student quiz completion) but nobody celebrates or acknowledges them. This is low-hanging personalization — we know exactly when these moments happen from the event data. "We see you" messaging builds relationship and shows the product is paying attention.

**Goals:** Build a detector that identifies meaningful milestones in a teacher's journey and generates appropriate celebration/nudge messages. Define what milestones matter (first X, Nth X, streak, comeback after absence). Trigger timely, relevant messages that feel personal. Could integrate with Content Generator for actual message drafting.

**Workflow:** Define milestone events (first_lesson_created, first_live_lesson, 10th_lesson, 7_day_streak, returned_after_30_days, etc.) → monitor event stream or query historical data → when milestone detected, generate message context → either output template or feed to Content Generator → message feels like "Hey, you just did X — that's awesome, here's what to try next."

**What we want to learn:** Which milestones actually matter to teachers? Is celebrating first lesson patronizing or encouraging? What's the right timing — immediate vs. end of day vs. weekly digest? Do teachers even open these messages? Can we tie milestones to the Gynzyfication stages (milestone X = you're now "Activated")? What milestones indicate champion potential?

---

## TOPIC 3: CONTENT GENERATION

### Prototype 5: Content Draft Generator

**Raw context:** The team uses ChatGPT for content writing already but it's ad-hoc. They need NL and Flanders variants for everything (localization burden mentioned in transcript). Creating email content is slow — write, review, localize, review again. The sprint briefing mentioned "content generation" as a key opportunity. AI-generated content suggestions (not replacement) came up in the 15:02 session — building blocks, not full automation.

**Goals:** Build a content generator that takes goal + segment + tone as input and outputs 2-3 email variants (subject line, body, CTA). Include NL/Flanders toggle for regional variants. Use existing good emails as few-shot examples to capture Gynzy's voice. Human reviews and edits — AI does first draft, human polishes. Prove we can accelerate content creation without losing quality or brand voice.

**Workflow:** Collect 5-10 "good" emails as examples (Research team task) → define input structure (goal: re-engagement, segment: inactive 30 days, tone: encouraging) → build prompt with few-shot examples → generate 2-3 variants → include subject line options → toggle NL/Flanders for localized versions → human reviews, edits, approves → final content goes into Intercom.

**What we want to learn:** Can AI capture Gynzy's brand voice from examples? What's the quality gap between AI draft and final human-edited version? How much editing is actually needed? Do NL and Flanders variants require different prompts or just translation? Can teachers tell AI-generated from human-written? What tone guidelines matter most? Does this actually save time or create more review work?

---

### Prototype 6: Content Block Library

**Raw context:** The team rebuilds similar content over and over. Welcome emails, feature tips, re-engagement nudges — they exist but aren't organized or reusable. When building a new flow, they start from scratch or copy-paste from old flows. The transcript mentioned "dynamic content generation with building blocks" — modular pieces that can be assembled. This is foundation work for a more scalable content system.

**Goals:** Build a structured library of content blocks (intro paragraphs, feature descriptions, CTAs, sign-offs) that can be searched and matched to flow steps. Given a flow step like "welcome email," suggest matching blocks from library. Reduce copy-paste hunting. Create foundation for modular, consistent content. Start by importing existing good content into structured format.

**Workflow:** Audit existing emails/content for reusable blocks → define block types (intro, feature_highlight, cta, signoff, social_proof) → import blocks with metadata (tone, segment, goal, language) → build simple search/match interface → given a flow step context, suggest relevant blocks → user selects blocks, assembles into full content → over time, library grows with new validated content.

**What we want to learn:** What block types actually exist in current content? How granular should blocks be — sentence level or paragraph level? Do blocks combine well or feel Frankenstein? Can we auto-tag blocks by analyzing their content? Does having a library change how the team approaches content creation? What's the maintenance burden — does the library get stale?

---

## Summary Table

| # | Prototype | Topic | Raw Time Est | Priority |
|---|-----------|-------|--------------|----------|
| 1 | AI Tag Suggester | Audience | 6-8h | High — addresses core pain |
| 2 | Coverage Analyzer | Audience | 5-7h | High — P0 visibility |
| 3 | Next Best Feature Recommender | Next Best Action | 5-7h | Medium — expansion driver |
| 4 | Milestone Detector | Next Best Action | 4-6h | Medium — quick win |
| 5 | Content Draft Generator | Content | 6-8h | Medium — time saver |
| 6 | Content Block Library | Content | 4-6h | Lower — foundation work |

---

## Integration Vision (Friday Stretch)

```
User Profile
    ↓
[Tag Suggester] → suggests "at-risk" tag
    ↓
[Coverage Analyzer] → shows user is in 2 overlapping flows
    ↓
[Milestone Detector] → notices they hit 5 lessons but stopped
    ↓
[Recommender] → suggests "try Live Lessons"
    ↓
[Content Generator] → drafts personalized re-engagement email
    ↓
[Content Library] → pulls proven CTA block
    ↓
Human approves → Intercom sends
```

---

*Briefs ready for Day 2-3 build phase*
