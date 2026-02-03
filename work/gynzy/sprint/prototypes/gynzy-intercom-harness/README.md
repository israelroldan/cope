# Gynzy Intercom Content Harness

AI-powered content generation for Intercom via internal API.

> **Status:** Sprint prototype (v0.1)
> **Based on:** Dwayne's POC for reverse-engineered Intercom API

## Quick Start

```bash
# Install dependencies
npm install

# Copy env file and add your keys
cp .env.example .env

# Run in development mode
npm run dev -- create --interactive

# Or with all options
npm run dev -- create \
  --goal "re-engage inactive teachers" \
  --segment "inactive-30d" \
  --tone "warm" \
  --locales "nl,be" \
  --context ./examples/context-re-engagement.json
```

## Features

- **AI Content Generation** — Claude generates email variants based on goal, segment, and tone
- **Context-Aware** — Pass a context file with Teacher DNA, flow info, and campaign goals
- **Localization** — Automatic NL (Netherlands) and BE (Flanders) variants
- **Intercom Push** — Push generated content as draft templates (via internal API)
- **Human-in-the-Loop** — Review before pushing, dry-run mode available

## Usage

### Basic Generation

```bash
gynzy-content create --goal "promote Live Lessons" --segment "bord-users"
```

### With Context File

The `--context` flag is key for personalized content:

```bash
gynzy-content create \
  --goal "cross-sell Trainer" \
  --context ./my-context.json
```

Context files can include:

```json
{
  "user": {
    "teacherDna": {
      "digivaardigheid": 7,
      "structuurBehoefte": "hoog",
      "onderbouwBovenbouw": "onderbouw"
    }
  },
  "flow": {
    "stage": "penetration",
    "previousMessages": ["Welcome email", "Feature tip #1"]
  },
  "goals": {
    "primary": "Drive feature adoption",
    "kpis": ["Click rate > 5%"]
  }
}
```

### Interactive Mode

```bash
gynzy-content create --interactive
```

### Push to Intercom

```bash
# Dry run (preview only)
gynzy-content create --goal "..." --push --dry-run

# Actually push
gynzy-content create --goal "..." --push
```

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    CLI (index.ts)                   │
├─────────────────────────────────────────────────────┤
│                  Agent (agent.ts)                   │
│  • Claude API calls                                 │
│  • Prompt building with context                     │
│  • Response parsing                                 │
├─────────────────────────────────────────────────────┤
│              Intercom Adapter (intercom/)           │
│  • Auth with caching                                │
│  • Internal API wrapper                             │
│  • Template CRUD operations                         │
└─────────────────────────────────────────────────────┘
```

## TODO (for production)

- [ ] Implement actual Intercom auth flow (from Dwayne's research)
- [ ] Document discovered API endpoints
- [ ] Add contract tests for API stability
- [ ] Service account setup
- [ ] Rate limiting / retry logic
- [ ] v1.0: Hosted API endpoint

## Files

```
src/
├── index.ts           # CLI entry point
├── agent.ts           # Claude agent with context handling
├── intercom/
│   ├── adapter.ts     # API wrapper (needs real endpoints)
│   ├── auth.ts        # Auth + caching
│   └── types.ts       # TypeScript types
├── tools/
│   ├── generate-content.ts
│   └── push-to-intercom.ts
prompts/
│   └── system.md      # Agent system prompt
examples/
│   ├── context-re-engagement.json
│   └── context-feature-adoption.json
```

## Next Steps

1. **Get Dwayne's endpoint documentation** — Fill in the actual API calls
2. **Test auth flow** — Implement session/CSRF handling
3. **Add contract tests** — Monitor for API changes
4. **Demo to team** — Get feedback on workflow

---

*Sprint prototype: January 2026*
