# Intercom Content Harness — Architecture

*Sprint prototype: AI-powered content creation → Intercom internal API*
*Based on Dwayne's POC + robustness requirements*

---

## Vision

```
Natural Language Input → AI Processing → Intercom Internal API → Live Content
```

**v0.1 (CLI):** Developer tool, Claude Code SDK, proves concept
**v1.0 (API):** Hosted endpoint, anyone at Gynzy can use

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                         INTERCOM HARNESS                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────────┐ │
│  │   INPUT     │    │  AI LAYER   │    │   INTERCOM ADAPTER      │ │
│  │             │    │             │    │                         │ │
│  │ • CLI args  │───▶│ • Claude    │───▶│ • Auth (cached)         │ │
│  │ • JSON      │    │ • Tools     │    │ • Internal API calls    │ │
│  │ • Natural   │    │ • Prompts   │    │ • Response handling     │ │
│  │   language  │    │             │    │                         │ │
│  └─────────────┘    └─────────────┘    └─────────────────────────┘ │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────────┐│
│  │                    RELIABILITY LAYER                            ││
│  │  • Auth cache + refresh    • Contract tests    • Retry logic   ││
│  └─────────────────────────────────────────────────────────────────┘│
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Components

### 1. Input Layer

Accepts multiple input formats:

```typescript
// CLI usage examples
gynzy-content create-template --type email --goal "re-engage inactive users" --segment "30-day-inactive"
gynzy-content create-template --json '{"type": "email", "goal": "...", "segment": "..."}'
gynzy-content create-template "Write a friendly email to re-engage teachers who haven't logged in for 30 days"
```

### 2. AI Layer (Claude Code SDK)

Tools the agent can use:

| Tool | Purpose |
|------|---------|
| `analyze_segment` | Understand target audience characteristics |
| `generate_content` | Create email/message content with variants |
| `validate_content` | Check against Gynzy brand voice guidelines |
| `localize_content` | Create NL and Flanders variants |
| `push_to_intercom` | Send to Intercom via internal API |

### 3. Intercom Adapter

Wraps the reverse-engineered internal API:

```typescript
interface IntercomAdapter {
  // Auth
  authenticate(credentials: ServiceAccountCreds): Promise<AuthToken>
  refreshToken(token: AuthToken): Promise<AuthToken>

  // Templates (from Dwayne's research)
  createEmailTemplate(template: EmailTemplate): Promise<TemplateResult>
  updateEmailTemplate(id: string, template: EmailTemplate): Promise<TemplateResult>
  listTemplates(): Promise<Template[]>

  // Potentially more (if endpoints discovered)
  createMessage?(message: Message): Promise<MessageResult>
  updateSegment?(segment: Segment): Promise<SegmentResult>
}
```

### 4. Reliability Layer

**Auth Cache:**
```typescript
class AuthCache {
  private token: AuthToken | null
  private expiresAt: Date

  async getToken(): Promise<AuthToken> {
    if (this.isValid()) return this.token
    return this.refresh()
  }
}
```

**Contract Tests:**
```typescript
// Run periodically to detect API changes
describe('Intercom Internal API Contract', () => {
  it('template creation endpoint exists', async () => {
    const response = await probe('/api/templates/create')
    expect(response.status).not.toBe(404)
  })

  it('template payload schema unchanged', async () => {
    const result = await createTemplate(testPayload)
    expect(result).toMatchSchema(expectedSchema)
  })
})
```

---

## File Structure (v0.1 CLI)

```
gynzy-intercom-harness/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts              # CLI entry point
│   ├── agent.ts              # Claude agent setup
│   ├── tools/
│   │   ├── analyze-segment.ts
│   │   ├── generate-content.ts
│   │   ├── validate-content.ts
│   │   ├── localize-content.ts
│   │   └── push-to-intercom.ts
│   ├── intercom/
│   │   ├── adapter.ts        # Internal API wrapper
│   │   ├── auth.ts           # Auth + caching
│   │   └── types.ts          # API types
│   └── reliability/
│       ├── contract-tests.ts
│       └── retry.ts
├── prompts/
│   ├── system.md             # Agent system prompt
│   ├── brand-voice.md        # Gynzy tone guidelines
│   └── examples/             # Few-shot examples
└── tests/
    └── contracts/            # API contract tests
```

---

## Required from Dwayne

To build this, we need:

| Item | Why |
|------|-----|
| Internal API endpoints | Which URLs does Intercom use internally? |
| Request/response shapes | What payloads do they expect? |
| Auth flow details | How does the web UI authenticate? CSRF + session? |
| Service account possibility | Can Gynzy IT create a dedicated account? |

---

## Usage Flow (v0.1)

```bash
# 1. Setup (one-time)
export INTERCOM_EMAIL="service-account@gynzy.com"
export INTERCOM_PASSWORD="..."
export ANTHROPIC_API_KEY="..."

# 2. Generate and push content
gynzy-content create \
  --type email \
  --goal "re-engage teachers inactive 30+ days" \
  --segment "inactive-30d" \
  --tone "warm, encouraging" \
  --locales "nl,be"

# Output:
# ✓ Generated 3 email variants
# ✓ Created NL and BE localizations (6 total)
# ✓ Validated against brand voice
# ? Push to Intercom? [y/N]
# ✓ Created template: "Re-engagement - Inactive 30d - NL" (id: tmpl_abc123)
# ✓ Created template: "Re-engagement - Inactive 30d - BE" (id: tmpl_def456)
```

---

## Upgrade Path to v1.0 (Hosted)

```
v0.1 CLI                          v1.0 Hosted API
─────────────────────────────────────────────────────
CLI args                    →     HTTP POST /generate
Local execution             →     Cloud function / container
Developer-only              →     Web UI for anyone
Manual trigger              →     Webhook triggers
```

---

## Open Questions

1. **Auth mechanism:** Does Intercom use session cookies + CSRF, or something else?
2. **Rate limits:** Does the internal API have rate limiting?
3. **Account type:** Can a service account access all workspaces?
4. **Audit trail:** Does Intercom log who created templates?
5. **IT approval:** What's Gynzy's policy on using internal APIs?

---

## Next Steps

1. [ ] Get Dwayne's endpoint documentation
2. [ ] Create basic TypeScript project structure
3. [ ] Implement auth flow with caching
4. [ ] Build first tool: `push-to-intercom`
5. [ ] Add AI layer with content generation
6. [ ] Write contract tests
7. [ ] Demo to team

---

*Architecture draft: 2026-01-14*
*Based on Dwayne's POC and team requirements*
