# CompoundWay — Product Requirements Document (v1 MVP)

**Palu · February 2026**
**Platform:** Native iOS (Swift / SwiftUI)
**Codebase:** Fresh build, informed by Guided Achievement Engine patterns
**Scope:** Tracks + Missions (Identity layer deferred to v2)

---

## 1. Product Overview

### 1.1 What Is CompoundWay?

CompoundWay is an AI-powered habits app that takes a vague desire to improve — "I want to get more fit," "I want to be more creative," "I want to be a better partner" — and transforms it into a structured, adaptive, forgiving system of daily practice missions.

Unlike existing habit trackers that assume users already know what to do, CompoundWay solves the upstream problem: it figures out *what* the user should do, designs complementary practice tracks, generates scaffolded daily missions, guides execution, captures proof and reflection, and sustains engagement through streaks with built-in forgiveness.

### 1.2 MVP Scope Summary

The v1 MVP delivers two of the three architectural layers described in the concept document:

- **Habit Tracks:** AI-generated systems of complementary practice tracks based on user input.
- **Missions:** Individual practice sessions powered by the Guided Achievement Engine's five-phase pipeline.

The **Identity layer** (earned identity narrative, "you're becoming" milestones) is deferred to v2. The v1 collects the data that will power it (completion history, 3×3 assessment matrix) but does not surface identity-level messaging.

### 1.3 Target User

Adults who want to improve in some area of their life but struggle to convert that intention into consistent action. They may have tried other habit apps and churned because those apps assumed they already knew what to do and just needed reminders.

### 1.4 Success Metrics (MVP)

| Metric | Target | Rationale |
|--------|--------|-----------|
| Day 1 retention | > 60% | User completes onboarding AND first mission |
| Day 7 retention | > 30% | User completes at least 3 missions in first week |
| Day 30 retention | > 15% | User has an active streak or used weekly pass |
| Onboarding completion rate | > 80% | From app open to first mission completion |
| Average missions/week (active users) | > 4 | Indicates habit formation, not just exploration |

---

## 2. User Flows

### 2.1 Onboarding Flow

The onboarding is the product's first impression and its primary differentiator. It must feel warm, conversational, and radically different from typical "set up your habits" workflows.

**Design reference:** *Her* (film) energy — not a chat UI, but card-and-bubble interactions that feel like a conversation. The existing Pimpi refinement UI is the interaction model.

#### Flow Steps

```
1. Welcome screen
   → Warm greeting, no sign-up wall
   → Single soft prompt: "What would you like to spend more time on?"
   → Free text input + "Inspire me" button

2. Refinement loop (if needed)
   → Verb + object detection determines if input is specific enough
   → If vague: progressive narrowing via tappable option bubbles
   → Maximum 3 refinement rounds (hard stop, server-enforced)
   → Context preserved across rounds via selectionPath array

3. Track presentation
   → System generates 2–3 complementary habit tracks
   → Presented as cards: track name, frequency, time per session
   → System recommends a starting subset
   → User can select all, some, or just one

4. First mission (immediate)
   → "Want to try your first one right now?"
   → Drops directly into a mission from the selected track
   → Full scaffolding: tinyStart, materials, doneLooksLike, etc.
   → Timer, completion, proof, celebration (confetti)

5. Dashboard reveal
   → After first mission completion, show the main dashboard
   → Tracks laid out with upcoming schedule
   → "Prove the value before showing the system"

6. Account creation
   → Prompted after first mission completion (not before)
   → Apple Sign-In + email options
   → Data from anonymous session migrated to account
```

#### "Inspire Me" Flow

For users who can't articulate what they want:

- Generates 8–10 diverse activity/improvement ideas as tappable bubbles
- Covers diverse domains: fitness, creativity, learning, relationships, organization, professional growth
- Each idea is a `{ label, value }` pair feeding into the refinement pipeline
- No domain repeated twice in one set
- Avoids recently completed activities (once user has history)

### 2.2 Daily Engagement Flow

```
1. App open
   → Dashboard shows today's scheduled mission(s)
   → Maximum 1–2 missions surfaced per day (load balancing)
   → Card preview: track name, mission title, estimated duration, difficulty

2. Mission selection
   → Tap to expand mission card
   → See full scaffolding: tinyStart, doneLooksLike, obstaclePlan
   → Materials checklist (interactive, checkable)
   → Helper resources (tappable links, verified URLs)
   → Challenge level selection: Easy / Medium / Hard (contextual labels)
   → Duration selection (scaled to challenge level)

3. Execution
   → "Start" begins elapsed timer (counts up, not down)
   → Scaffolding board remains visible throughout
   → Materials checklist interactive during execution
   → Helper resources tappable during execution
   → Pause / Resume with full state preservation
   → No auto-completion — user presses "I'm Done!"

4. Proof & Reflection
   → Photo capture (optional) — device camera, cloud upload
   → Note (optional) — freeform text
   → Self-rating (required): Easy | Ok | Hard
   → Feeling (required): Great | Okay | Tough
   → Confetti celebration animation

5. Return to dashboard
   → Updated streak visualization
   → Next mission preview (if applicable)
   → Trophy wall updated with new completion
```

### 2.3 Track Management Flow

```
1. Add new improvement area
   → Same refinement flow as onboarding
   → "What else would you like to work on?"
   → Generates new set of complementary tracks
   → User selects which to activate

2. View track detail
   → Track name, description, current cadence
   → Completion history (calendar with colored dots)
   → 3×3 assessment distribution over time
   → Current challenge level
   → Pause / Resume track
   → Archive track

3. Modify track cadence
   → Adjust frequency (e.g., 3x/week → 2x/week)
   → System re-balances daily load across all active tracks
```

### 2.4 Streak & Pass Flow

```
1. Streak display
   → Calendar view: consecutive days form connected "pills"
   → Current streak count prominently displayed
   → Best streak (all-time high watermark)

2. Streak break
   → If user misses a day and had an active streak:
     → Show last streak value
     → Offer weekly pass if available: "Use your weekly pass to restore?"
     → If accepted: streak restored, pass consumed
     → If declined or unavailable: streak resets to 0

3. Weekly pass
   → One per ISO week, auto-resets each Monday
   → Visual indicator showing pass availability
   → Only offered when there's a streak worth saving (lastStreakBeforeReset > 0)
```

---

## 3. Feature Specifications

### 3.1 AI Refinement Engine

**Purpose:** Convert vague user input into specific, actionable habit tracks with missions.

#### Two-Level Refinement

The refinement engine operates at two levels in CompoundWay:

1. **Track-level refinement** (onboarding & "add new area"): Takes broad input ("I want to get fit") and produces a set of complementary habit tracks with cadences.
2. **Mission-level refinement** (inherited from Guided Achievement Engine): Takes a track's context and generates a specific mission card for today's session.

#### Discriminated Response Types

Every AI call returns exactly one of:

```
TrackPlan {
  type: "track_plan"
  tracks: [{
    name: string              // e.g., "Cardio Training"
    description: string       // 1-2 sentences
    frequency: string         // e.g., "3x per week"
    minutesPerSession: number // estimated
    category: string          // for load balancing and interdependency
  }]
  recommended: number[]       // indices of suggested starting tracks
}

Refinement {
  type: "refinement"
  question: string            // max 8 words, friendly
  options: [{
    label: string             // emoji + 2-4 words
    value: string             // carries full context forward
  }]                          // 2-4 options
}

Card {
  type: "card"
  title: string               // action-oriented verb + object
  duration: number            // realistic minutes
  difficulty: "Easy" | "Medium" | "Hard"
  challengeLevels: [string, string, string]  // contextual variants
  materials: string[]         // 2-4 common items
  helpers: string[]           // verified resource URLs (see 3.2)
  doneLooksLike: string       // tangible observable outcome
  tinyStart: string           // achievable in under 60 seconds
  obstaclePlan: string        // "If stuck —" specific strategy
}
```

#### Branching Logic

- **Track-level:** Input with a clear domain + goal → `TrackPlan` immediately. Vague input → `Refinement` rounds (max 3).
- **Mission-level:** Verb + object detected → `Card` immediately. Insufficient specificity → `Refinement` (max 3 rounds).

#### Server-Side Guardrails

- Round 3+ forces output (TrackPlan or Card) regardless of model response
- Fallback track plan / card built from raw input + selectionPath if model fails
- Input sanitized against prompt injection
- Rate limits per user per hour

#### Passive-to-Active Redirection

Prompt rule: passive consumption inputs are redirected to active creation.

- "watch TikTok" → "Film a 30-second tutorial"
- "listen to music" → "Learn to play a song chorus"
- "play video games" → "Design a game level on paper"

#### Natural Filter for Unscaffoldable Goals

If input can't decompose into practice tracks ("win the lottery," "go viral"), the system redirects: "That's a great goal — what skills would help you get there?"

### 3.2 Resource Search & Validation Pipeline

**Purpose:** Provide real, working helper links — never hallucinated URLs.

#### Pipeline

```
1. Search agent calls grounded web search tool
   → Returns 4-5 candidate resources with names + URLs
   → Agent explicitly prohibited from fabricating URLs

2. Server-side validation:
   → Extract URL from "resource name — URL" format
   → Resolve redirect URLs
   → Validate liveness:
     - YouTube: oembed endpoint check
     - Other: HEAD request, 3-second timeout
   → SSRF protection: reject localhost, private IPs, non-HTTPS
   → Graceful degradation: if ALL fail, return originals

3. Trim to 3 verified resources

4. Deliver async (card appears first, resources follow)
```

### 3.3 Mission Execution Environment

| Element | Specification |
|---------|--------------|
| **Timer** | Elapsed (counts up), not countdown. Visual progress bar toward suggested duration. No auto-stop. |
| **"Done looks like"** | Always visible during execution. Prominent card. |
| **Materials checklist** | Interactive checkboxes with strike-through on check. |
| **Helpers / Resources** | Tappable links opening in-app browser or system browser. |
| **"If stuck"** | Always visible. Rescue hatch for frustration. |
| **"Tiny start"** | Displayed prominently at session start. |
| **Pause / Resume** | Full state preservation. Scaffolding board remains visible during pause. Timer pauses. |
| **Completion** | Explicit "I'm Done!" button. No auto-completion at timer end. |

### 3.4 Proof & Reflection

#### Capture

- **Photo** (optional): Device camera or photo library. Uploaded to cloud storage (see 5.3).
- **Note** (optional): Freeform text, no character limit displayed but stored up to 2000 characters.
- **Self-rating** (required): Easy | Ok | Hard — difficulty axis.
- **Feeling** (required): Great | Okay | Tough — emotional axis.

#### 3×3 Assessment Matrix

```
              Easy    Ok    Hard
  Great    |       |      |      |   → flow state, growth
  Okay     |       |      |      |   → comfort zone / neutral
  Tough    |       |      |      |   → potential overwhelm
```

Data stored per completion and aggregated per track for adaptive difficulty in future versions. In v1, data is collected and stored but not yet used for automatic difficulty adjustment (that's v2 adaptive intelligence).

#### Celebration

Confetti animation on completion. Colored particles falling from top of screen. Duration: 2-3 seconds. This is psychologically grounded in the peak-end rule — creating an emotional peak at the end of the experience.

### 3.5 Streak System

#### Core Logic (Server-Side)

```
On mission completion:
  today = ISO date (YYYY-MM-DD)

  if yesterday exists in completed_dates:
    streak = old_streak + 1
  else if today not in completed_dates:
    if old_streak > 0:
      last_streak_before_reset = old_streak
    streak = 1
  // else: already completed today, no streak change

  best_streak = max(best_streak, streak)
```

#### Weekly Pass

```
Conditions to offer:
  - weeklyPassAvailable === true
  - lastStreakBeforeReset > 0

Effect:
  - streak = lastStreakBeforeReset + 1 (restored + today)
  - weeklyPassAvailable = false

Reset:
  - weeklyPassAvailable resets to true each new ISO week (Monday)
```

#### Visualization

- Calendar view with consecutive days forming connected visual "pills"
- Colored dots per completed mission on each date (using track color)
- Current streak count and best streak prominently displayed
- Weekly pass availability indicator

### 3.6 Track Orchestration

#### Cadence Management

Each track has a target frequency (e.g., 3x/week). The system distributes missions across the week:

- Avoid scheduling same-category tracks on consecutive days (e.g., two physical tracks back-to-back)
- Respect user-defined rest days (if configured)
- Distribute evenly across available days

#### Load Balancing

- Maximum 2 missions surfaced per day across all active tracks
- If more tracks are active than daily slots allow, rotate which tracks fire each day
- User can always manually trigger an additional mission from any track

#### Mission Generation

When a track fires for the day:
1. Pull track context (category, recent completion history, current challenge level)
2. Call mission-level AI to generate a Card
3. Card difficulty and content informed by track progression (in v1: basic progression based on completion count; in v2: informed by 3×3 matrix data)

### 3.7 Trophy Wall

- Scrollable history of all completed missions
- Each entry shows: mission title, track name, date, duration, self-assessment, photo (if captured), note (if written)
- Calendar view with colored dots per track
- Filterable by track

---

## 4. Screens & Navigation

### 4.1 Screen Map

```
Tab Bar (3 tabs)
├── Today (default)
│   ├── Today's mission card(s)
│   ├── Streak display
│   └── Quick stats (missions this week, active tracks)
│
├── Tracks
│   ├── Active tracks list
│   │   └── Track detail → completion history, cadence, pause/archive
│   ├── "Add new area" button → refinement flow
│   └── Archived tracks
│
└── Progress
    ├── Calendar view (all tracks, colored dots)
    ├── Trophy wall (scrollable completion history)
    ├── Streak stats (current, best, weekly pass status)
    └── Summary stats (total completions, total time, tracks completed)
```

### 4.2 Modal Flows

- **Onboarding:** Full-screen flow, appears on first launch before tab bar
- **Mission execution:** Full-screen modal from Today tab. Timer, scaffolding board, completion.
- **Proof & reflection:** Slides up after "I'm Done!" within mission modal
- **Refinement:** Full-screen flow for adding new improvement areas
- **Weekly pass offer:** Alert/sheet when streak break is detected on app open
- **Settings:** Accessible from profile icon. Account, notifications, rest days, data export.

### 4.3 Design Direction

- **Warm, not clinical.** Rounded corners, soft shadows, approachable typography.
- **Card-based.** Missions, tracks, and completions are all cards. Consistent visual language.
- **Minimal chrome.** Let the content breathe. No heavy navigation bars or busy dashboards.
- **Color per track.** Each track gets an assigned color used in calendar dots, cards, and pills. System-assigned from a curated palette.
- **Conversational tone.** All system copy should feel like a supportive friend, not a productivity app. "Nice work" not "Task completed."

---

## 5. Technical Architecture

### 5.1 Client (iOS)

| Component | Technology |
|-----------|-----------|
| Language | Swift |
| UI Framework | SwiftUI |
| Architecture | MVVM with lightweight coordinator pattern |
| Local persistence | SwiftData (Core Data successor) |
| Networking | URLSession with async/await |
| State management | Combine + @Observable (iOS 17+) |
| Minimum deployment | iOS 17.0 |

#### Optimistic Updates

All state changes applied immediately with temporary IDs (`temp-` prefix). Server reconciliation happens async. `pendingIds` map tracks temp-to-real ID resolution.

**Critical rule:** Completion is never reverted on server failure. The user's sense of accomplishment is protected even if the network is unreliable.

#### Offline Support

- Missions can be generated while online and cached for offline execution
- Timer, scaffolding, and completion flow work fully offline
- Proof photos queued for upload when connection restores
- Streak calculation works offline against local completed_dates

### 5.2 Backend

| Component | Technology |
|-----------|-----------|
| Runtime | Node.js (or alternative TBD) |
| API | REST with JSON |
| Database | PostgreSQL |
| Authentication | Apple Sign-In, email/password (via Auth provider TBD) |
| AI orchestration | Server-side prompt management with model routing |
| File storage | Cloud object storage (S3-compatible) for proof photos |
| Hosting | TBD |

#### AI Model Routing

Different tasks use different models optimized for their requirements:

| Task | Model Type | Priority |
|------|-----------|----------|
| Track plan generation | Language model (structured output) | Quality over speed |
| Mission card generation | Language model (structured output) | Balance of quality and speed |
| Resource search | Model with grounded web search tool | Factual accuracy |
| Inspiration generation | Language model (high temperature) | Creativity and diversity |

#### Prompt Management

System prompts served from a remote prompt hub with caching:
- 5-minute TTL with 60-second background refresh
- Hardcoded fallback prompts if hub is unreachable
- Prompts editable and deployable without code changes

### 5.3 Data Model (Core Entities)

```
User
  id: UUID
  email: string
  displayName: string
  createdAt: timestamp
  streak: number
  bestStreak: number
  lastStreakBeforeReset: number
  weeklyPassAvailable: boolean
  weeklyPassResetWeek: string (ISO week)

ImprovementArea
  id: UUID
  userId: UUID
  rawInput: string              // original user input
  selectionPath: string[]       // refinement breadcrumb
  createdAt: timestamp
  status: "active" | "archived"

Track
  id: UUID
  improvementAreaId: UUID
  userId: UUID
  name: string
  description: string
  category: string
  frequency: string             // "3x_per_week", "daily", etc.
  minutesPerSession: number
  color: string                 // hex, system-assigned
  currentChallengeLevel: "Easy" | "Medium" | "Hard"
  completionCount: number
  status: "active" | "paused" | "archived"
  createdAt: timestamp

Mission
  id: UUID
  trackId: UUID
  userId: UUID
  title: string
  challengeLevel: "Easy" | "Medium" | "Hard"
  challengeLabels: [string, string, string]
  suggestedDuration: number     // minutes
  tinyStart: string
  doneLooksLike: string
  obstaclePlan: string
  materials: string[]
  helpers: [{name: string, url: string}]
  status: "pending" | "active" | "completed" | "skipped"
  scheduledDate: string         // ISO date
  createdAt: timestamp

Completion
  id: UUID
  missionId: UUID
  trackId: UUID
  userId: UUID
  elapsedSeconds: number
  difficultyRating: "Easy" | "Ok" | "Hard"
  feelingRating: "Great" | "Okay" | "Tough"
  note: string?
  photoUrl: string?
  completedAt: timestamp

CompletedDate
  userId: UUID
  date: string                  // ISO date (YYYY-MM-DD), for streak calc
  missionCount: number
```

---

## 6. Notifications

### 6.1 Push Notification Strategy

Notifications are opt-in, requested after first week of use (not during onboarding).

| Notification | Timing | Copy Style |
|-------------|--------|-----------|
| Daily mission reminder | User-configured time (default: 9am) | "Your [track name] mission is ready. Today: [mission title]" |
| Streak at risk | 8pm if no mission completed today and streak > 3 | "You've got a [N]-day streak going. Still time to keep it alive." |
| Weekly pass available | Monday morning if pass was used previous week | "Your weekly pass just refreshed." |
| Milestone | After 7, 14, 30, 60, 100 day streaks | "That's [N] days. You're building something real." |

### 6.2 What We Don't Send

- No "you haven't opened the app in X days" guilt notifications
- No marketing or upsell notifications in v1
- No more than 1 notification per day

---

## 7. MVP Scope Boundaries

### 7.1 In Scope (v1)

- Conversational onboarding with refinement engine
- AI-generated complementary habit tracks
- AI-generated scaffolded mission cards
- Mission execution environment (timer, scaffolding board)
- Proof capture (photo, note)
- 3×3 self-assessment (data collected and stored)
- Streak system with weekly pass
- Trophy wall / completion history
- Calendar visualization
- Track management (add, pause, archive)
- "Inspire me" flow
- Passive-to-active redirection
- Offline mission execution
- Push notifications (opt-in)
- Apple Sign-In authentication

### 7.2 Out of Scope (v2+)

- **Identity layer:** Earned identity narrative, "you're becoming" milestones, identity-level messaging
- **Adaptive difficulty:** Automatic challenge level adjustment based on 3×3 matrix data (v1 collects data, v2 acts on it)
- **Social features:** Accountability partners, shared journeys, family tracks
- **Therapist/coach integration:** Professional track prescription and monitoring
- **Android:** Platform expansion
- **Wearable integration:** Apple Watch companion
- **Audio-first experience:** Voice-based onboarding and mission guidance
- **Advanced track interdependency:** Domain-specific rules (progressive overload, periodization)
- **In-app purchases / subscription:** Monetization (v1 is free)
- **Widget:** iOS home screen widget for today's mission
- **Siri integration:** "Hey Siri, start my CompoundWay mission"

### 7.3 Deferred Design Decisions

- Exact monetization model (freemium vs. subscription vs. hybrid)
- Track limit for free tier (if any)
- Sharing / export functionality
- Data portability / export format
- Multi-language support

---

## 8. Launch Plan

### 8.1 Phases

```
Phase 1: Foundation (Weeks 1–4)
  → Data model, authentication, basic API
  → AI integration: refinement engine, card generation, resource search
  → Prompt authoring and testing

Phase 2: Core Loop (Weeks 5–8)
  → Onboarding flow
  → Mission execution environment
  → Proof & reflection
  → Streak system with weekly pass

Phase 3: Track Layer (Weeks 9–11)
  → Track generation from refinement
  → Cadence management and load balancing
  → Track management UI
  → Progressive mission generation

Phase 4: Polish & Launch (Weeks 12–14)
  → Trophy wall and calendar views
  → Notifications
  → Offline support
  → Performance optimization
  → TestFlight beta
  → App Store submission
```

### 8.2 Beta Strategy

- 2-week TestFlight beta with 50–100 users
- Focus on: onboarding completion rate, first-mission completion rate, day-7 retention
- Collect qualitative feedback on AI-generated track quality and mission scaffolding
- Iterate on prompts based on real usage data

---

## 9. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| AI generates low-quality tracks or missions | Core value prop fails, users churn | Extensive prompt engineering, server-side validation, fallback cards, beta testing with rapid prompt iteration |
| Resource URLs are broken or irrelevant | Erodes trust | Validation pipeline with liveness checks, SSRF protection, graceful degradation |
| Onboarding feels too long | Users drop off before first mission | Hard stop at 3 refinement rounds, immediate mission after track selection, measure and optimize funnel |
| Users create too many tracks and feel overwhelmed | Burnout, churn | Load balancing (max 2/day), system recommends starting subset, progressive track addition |
| Streak break causes churn despite weekly pass | Lose users after bad week | Weekly pass design, no guilt notifications, soft re-engagement ("Welcome back, ready to pick up where you left off?") |
| AI API latency affects UX | Mission generation feels slow | Cache missions ahead of schedule, async resource loading, optimistic UI patterns |
| Offline edge cases break streak calculation | User frustration, data inconsistency | All streak logic server-side with ISO dates, client syncs on reconnect, completion never reverted |

---

## 10. Open Questions (To Resolve During Build)

- **Backend hosting:** Evaluate options (Railway, Fly.io, AWS, Vercel) based on cost and latency requirements
- **AI provider:** Primary model provider and fallback strategy. Evaluate structured output reliability across providers.
- **Analytics:** Which analytics platform for funnel tracking and retention metrics?
- **Crash reporting:** Sentry, Crashlytics, or alternative?
- **Photo storage:** S3, Cloudflare R2, or Supabase Storage?
- **Push notification service:** APNs directly or via service (OneSignal, Firebase)?
- **Prompt hub:** Build vs. buy for remote prompt management?
- **App Store category:** Health & Fitness, Productivity, or Lifestyle?

---

*This is a living document. Last updated February 2026.*
