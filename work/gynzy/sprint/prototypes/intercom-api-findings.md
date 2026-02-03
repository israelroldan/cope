# Intercom Internal API Findings

*Reverse engineering session: January 14, 2026*
*Workspace: Tatoma (vzzy2jf5)*
*Status: ✅ CONFIRMED - Endpoints verified via Ember Data inspection*

---

## Key Discoveries

### Authentication

**CSRF Token:**
- Location: `<meta name="csrf-token" content="...">`
- Header: `X-CSRF-Token`
- Token example: `JF75zTpXirn_915pbzczWoRzIM3OfQF8_UQz_M6Q5B-gH37xF-u5m274nHUKkL6MUVWPhuPhz4tKoKSkXyTmlQ`

**Session Cookies:**
- `intercom-session-tx2p130c` - Main session cookie
- `intercom-id-tx2p130c` - User identifier
- `intercom-device-id-tx2p130c` - Device identifier

### Required Headers

```javascript
{
  "X-CSRF-Token": "<csrf-token>",
  "X-EMBERCOM-REVISION-ID": "106608",  // Version tracking
  "X-EMBERCOM-SHA": "005ffa3b07f513268d165927aef651688611abae",  // Build hash
  "X-Client-Width": "1512",
  "X-Client-Height": "862",
  "X-Client-Device-Memory": "8",
  "X-Embercom-Route": "apps.app.outbound.email.edit",  // Current route
  "X-Document-Visible": "true",
  "Accept": "application/json",
  "Content-Type": "application/json"
}
```

### API Base

- Base URL: `https://app.intercom.com`
- API path prefix: `/ember/`
- App ID parameter: `app_id=vzzy2jf5`

---

## ✅ CONFIRMED API Endpoints

*Verified via Ember Data adapter inspection*

### Series Model Hierarchy (NEW - January 14, 2026)

Intercom Series uses a **multi-level model structure** for automated message flows:

```
series/series (ID: 468097)
    ├── nodes → series/node (ID: 7657954, 7661001, etc.)
    │       ├── type: "entry-rules" | "email" | "wait" | etc.
    │       └── connections → to other nodes
    └── edges → series/edge (connections between nodes)
```

**Series Endpoints:**
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/ember/series/series` | POST | Create new series |
| `/ember/series/series/{id}` | GET/PUT | Get/update series |
| `/ember/series/nodes` | POST | Add node to series |

**Series URL Structure:**
```
https://app.intercom.com/a/apps/{app_id}/outbound/series/{series_id}?mode=edit
https://app.intercom.com/a/apps/{app_id}/outbound/series/{series_id}?mode=edit&nodeId={node_id}
```

**Series Node Types (object_type codes):**

| Type | object_type | Category | Required Feature |
|------|-------------|----------|------------------|
| Chat | 38 | Messages | - |
| Post | 45 | Messages | - |
| Email | 8 | Messages | - |
| Workflow | 54 | Messages | bot_workflows |
| Tour | 0 | Messages | product_tours |
| Banner | 10 | Messages | - |
| Push | 18 | Messages | - |
| Carousel | 42 | Messages | - |
| SMS | 30 | Messages | sms |
| Survey | 84 | Messages | surveys |
| WhatsApp | 115 | Messages | whatsapp_integration |
| Checklist | 109 | Messages | checklists |
| Rules | 51 | Audience | - |
| Wait | 52 | Flow | - |
| Tag | 53 | Flow | - |
| Split Test | 64 | Flow | advanced_ab |
| Webhook | 75 | Flow | outbound_webhooks |

**Create Series Request:**
```javascript
// POST /ember/series/series
{ "app_id": "vzzy2jf5", "template_id": null }
```

**Add Node Request:**
```javascript
// POST /ember/series/nodes
{ "app_id": "vzzy2jf5", "series_id": "468321", "object_type": 8, "object_data": {} }
```

**Example Series IDs (from test session):**
- Series ID: `468097`
- Entry Rules Node ID: `7657954`
- Email 1 Node ID: `7661001`
- Wait Node ID: (auto-generated)
- Email 2 Node ID: (auto-generated)

---

### Email Model Hierarchy

Intercom uses a **3-level model structure** for emails:

```
matching-system/ruleset (ID: 56890016)
    └── rulesetLinks → matching-system/ruleset-links/email (ID: 57171857)
            └── object → emails/email (ID: 79726232)
                    └── localizedEmailContents → emails/localized-email-content (ID: 79725543)
```

### Confirmed Endpoints

| Endpoint | Method | Model | Purpose |
|----------|--------|-------|---------|
| `/ember/matching_system/rulesets/{id}` | GET/PUT | `matching-system/ruleset` | Campaign targeting rules |
| `/ember/emails/emails/{id}` | GET/PUT | `emails/email` | Email settings (unsubscribe, styling) |
| `/ember/emails/localized_email_contents/{id}` | GET/PUT | `emails/localized-email-content` | **Actual email content** |
| `/ember/outbound_emails/{id}` | GET | `outbound-email` | Outbound email wrapper |
| `/ember/ping.json` | POST | - | Heartbeat/keepalive |
| `/ember/admins/away_settings.json?app_id={id}` | GET | - | Admin away status |

### Email Content Model (`emails/localized-email-content`)

**Attributes:**
- `blocks` - Email body content (structured blocks)
- `subjectBlocks` - Subject line content
- `subject` - Plain text subject
- `locale` - Language code (e.g., "en")
- `assignToId` / `assignToType` - Assignment settings
- `emailTemplateType` / `emailTemplateId` - Template reference
- `senderType` / `senderId` - From address
- `replyToType` / `replyToId` - Reply-to address

**Body Structure (`blocks`):**
```json
{
  "blocks": [
    {
      "responsive": false,
      "container": true,
      "sectionType": "content",
      "rows": [
        {
          "cells": [
            {
              "style": { "paddingTop": "35px", ... },
              "content": [
                {
                  "text": "Hey {{first_name|fallback:\"there\"}},",
                  "align": "left",
                  "type": "paragraph"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

### Ruleset Model (`matching-system/ruleset`)

**Attributes:**
- `state` - Draft/Live status (0 = draft)
- `matchBehavior` - Targeting behavior
- `predicateGroup` - Audience filters
- `goal` - Campaign goal tracking
- `utmSettings` - UTM parameters
- `scheduledActivation` / `scheduledDeactivation` - Scheduling

**Relationships:**
- `rulesetLinks` → HasMany `matching-system/ruleset-link`
- `currentVersion` → BelongsTo `matching-system/ruleset-version`
- `rulesetTriggers` → HasMany `matching-system/ruleset-trigger`

---

## URL Structure

**Series edit page:**
```
https://app.intercom.com/a/apps/{app_id}/outbound/series/{series_id}?mode=edit
https://app.intercom.com/a/apps/{app_id}/outbound/series/{series_id}?mode=edit&nodeId={node_id}
```

**Email edit page:**
```
https://app.intercom.com/a/apps/{app_id}/outbound/email/{ruleset_id}?mode=edit
```

**Example IDs (from test session):**
- **Series:** `468097` (Teacher Plus Discovery - NL Penetrated)
- Ruleset ID: `56890016`
- Ruleset Link ID: `57171857`
- Email ID: `79726232`
- Localized Content ID: `79725543`

---

## Boot Data

```javascript
window.__embercom_boot_data = {
  app_type: "embercom",
  cache_disabled: false,
  current_admin_id: 9708226,
  model_cache_fingerprints: {
    admin: "96557012639ba3ce528bb27cedf2d27ac2b1f8cd",
    app: "73050e889f232c6ad4c83dcbff748534bc2d4981"
  },
  is_fin_standalone_app: false
}
```

---

## Ember.js Framework Details

**Version:** Ember 3.28.10

**Key Objects:**
- `window.Ember` - Main Ember object
- `window.Embercom` - App namespace
- `window.EmberApplicationInstance` - Running app instance
- `webpackChunkembercom` - Bundled modules

**Adapter Namespace:** `ember` (maps to `/ember/` path prefix)

---

## Observations

### Save Mechanism

The email editor uses **XMLHttpRequest** (not fetch) for saves. Auto-save triggers PUT requests to:
- `/ember/matching_system/rulesets/{id}` - For targeting changes
- `/ember/emails/localized_email_contents/{id}` - For content changes (likely)

### Template Support

79 templates found in store - endpoint likely:
```
GET /ember/templates?app_id={id}
```

---

## Manual Testing Commands

```bash
# Fetch Series (replace with actual tokens)
curl 'https://app.intercom.com/ember/series/series/468097?app_id=vzzy2jf5' \
  -H 'X-CSRF-Token: <token>' \
  -H 'Cookie: intercom-session-tx2p130c=<session>' \
  -H 'Accept: application/json'

# Fetch email content (replace with actual tokens)
curl 'https://app.intercom.com/ember/emails/localized_email_contents/79725543?app_id=vzzy2jf5' \
  -H 'X-CSRF-Token: <token>' \
  -H 'Cookie: intercom-session-tx2p130c=<session>' \
  -H 'Accept: application/json'

# Update email content
curl -X PUT 'https://app.intercom.com/ember/emails/localized_email_contents/79725543?app_id=vzzy2jf5' \
  -H 'X-CSRF-Token: <token>' \
  -H 'Cookie: intercom-session-tx2p130c=<session>' \
  -H 'Content-Type: application/json' \
  -d '{"emails/localized-email-content": {"subject": "New Subject", "blocks": [...]}}'

# Fetch ruleset (campaign)
curl 'https://app.intercom.com/ember/matching_system/rulesets/56890016?app_id=vzzy2jf5' \
  -H 'X-CSRF-Token: <token>' \
  -H 'Cookie: intercom-session-tx2p130c=<session>' \
  -H 'Accept: application/json'
```

---

## Next Steps for Implementation

1. ✅ ~~Discover API endpoints~~ - DONE
2. **Implement auth flow** - Use session cookies + CSRF token
3. **Test GET requests** - Verify we can fetch email data
4. **Test PUT requests** - Verify we can update content
5. **Create contract tests** - Monitor for API changes
6. **Compare with Dwayne's findings** - Validate approach

---

*Findings from browser session with Israel - January 14, 2026*
