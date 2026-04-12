# Brainstorm/Ideation

> Open-ended idea generation with AI clustering and peer voting to identify the best ideas.

## Core Mechanic

Learners respond to an open-ended prompt by submitting multiple short-text ideas (typically 3–5 per learner). Each idea is a single sentence or phrase. As ideas arrive, they are displayed in a chat-style feed. Once submission ends, the AI analyzes and groups similar ideas by theme or category, showing clusters visually (e.g., "Nature-based solutions," "Human innovation," "Technology-driven"). Peers then vote on the best ideas within each cluster using a simple 1–5 star or thumbs-up system. The voting phase highlights top ideas by vote count, creating a peer-validated "hall of good ideas." Finally, the class or teacher can discuss why certain ideas ranked highest, reinforcing metacognition around quality ideation.

The flow is: prompt appears → learners type and submit ideas (1 per tap + submit) → ideas accumulate in chat feed → timer ends or submission cap reached → AI groups and displays clusters → voting phase begins (tap to vote) → results tabulated and shown → reflection discussion (optional).

## Why It Works

Brainstorming is a high-level creative task that requires divergent thinking and psychological safety. The anonymity of text submissions and the absence of immediate judgment (voting comes after, not during submission) reduce fear of "wrong answers," letting learners generate more ideas and take larger conceptual risks. AI clustering provides cognitive scaffolding: instead of a chaotic list, peers see patterns and relationships, which deepens understanding and makes voting more meaningful. Peer voting taps into intrinsic motivation (being heard by classmates) and introduces a light gamification element that sustains engagement. This mechanic works particularly well after direct instruction—learners have content knowledge and now apply it generatively.

From a learning science perspective, brainstorming supports divergent (open-ended, creative) production, which strengthens conceptual flexibility and novel problem-solving. Clustering activates schema formation (learners notice commonalities). Voting introduces peer evaluation, a light form of metacognitive reflection.

## Content Generation Spec

The AI must generate:
1. **Brainstorm prompt**: An open-ended question or challenge tied to the lesson topic, phrased to encourage multiple valid answers.
2. **Clustering rules** (optional): Keywords or themes the AI should recognize when grouping ideas (helps ensure sensible clusters).
3. **Voting rubric** (optional): Criteria for peer voting (e.g., "originality," "feasibility," "impact").

### Example Output

```json
{
  "prompt": "Name as many ways as you can think of to reduce plastic waste in your community.",
  "maxEntries": 5,
  "votingEnabled": true,
  "aiGrouping": true,
  "sampleIdeas": [
    "Ban single-use bags",
    "Start a community recycling program"
  ],
  "timeLimit": 120,
  "rubric": {
    "criteria": [
      {
        "name": "Feasibility",
        "description": "How realistic is this solution in your community?"
      },
      {
        "name": "Impact",
        "description": "How much would this reduce plastic waste?"
      }
    ]
  }
}
```

## UX Considerations

**Text Entry**
- Single text input field with a clear "Submit Idea" button (48×48 px minimum).
- Character limit enforced (e.g., 150 chars) to keep ideas concise.
- Optional: visual counter showing entries used (e.g., "3 of 5 ideas submitted").

**Chat-Style Feed**
- New ideas appear at the bottom, with a subtle animation (fade-in, slide-up).
- Each idea card shows the idea text, initials or anonymous user indicator, and timestamp.
- No names displayed during submission (privacy + impartiality during voting).

**Clustering Display**
- After submission closes, ideas are regrouped and shown with a cluster label (e.g., "🌍 Environmental Solutions").
- Same visual style as individual ideas, but with a header.
- Smooth transition (fade + reflow) as clustering happens.

**Voting Interface**
- Star or thumbs-up icons (5-star common, or 1–3 thumbs for simplicity).
- Large tap targets (56×56 px) to accommodate quick voting.
- Feedback: star fills with color on tap, number increments below.
- Vote count visible once revealed (after submission ends or on demand).

**Responsive Design**
- On phones: full-width chat feed, top-to-bottom flow.
- On tablets: two-column layout (ideas on left, voting leaderboard on right) if space allows.

## Age Adaptations

| Age Group | Adaptations |
|-----------|------------|
| 8–10 | Simple, concrete prompts with visual references (images, emojis). 1–3 ideas max. No voting; teacher selects and discusses best ideas. Focus on generating ideas without judgment. |
| 11–13 | Open-ended prompts. 3–5 ideas per learner. AI grouping shown as simple labels. Peer voting with 1–2 criteria (e.g., "I like this idea" vs. "This is creative"). Group discussion of top ideas. |
| 14–16 | Complex prompts with constraints or multiple dimensions (e.g., "cost," "environmental impact," "timeline"). Full 5-idea limit. AI clustering with detailed thematic analysis. Multi-criteria voting (4+ rubric dimensions). Synthesis discussion: Why did certain ideas rank highest? What does that reveal about the concept? |

## Lesson Placement

**Best placement: Extension or Reflection**
- **Extension**: After core content and guided practice, learners apply knowledge creatively to a new scenario or problem.
- **Reflection**: At the end of a lesson, as a synthesis activity where learners consolidate learning by generating novel applications.

Can also appear in warm-up (lower-stakes brainstorm of prior knowledge) or as part of a project-based learning unit.

## Related Mechanics

- **Open Response** (mechanic 18): Similar freetext submission; brainstorm is open-ended, open-response is more structured.
- **Peer Review** (mechanic 22): Brainstorm generates raw ideas; peer review evaluates them against rubric. Often paired.
- **Discussion** (mechanic 24): Brainstorm generates ideas; discussion explores them deeper.
- **Collection/Gacha** (mechanic 28): Both reward quantity and encourage participation (more ideas = more engagement).
