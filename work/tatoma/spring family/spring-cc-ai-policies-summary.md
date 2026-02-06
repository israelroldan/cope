# Spring CC — AI Policies Summary

*Extracted from policy documents received January 2026*

---

## Risk Classification (EU AI Act Aligned)

| Level | Who Can Use | Requirements |
|-------|-------------|--------------|
| **Low/minimal** | All employees | Follow company rules + app guidelines |
| **Limited** | All employees | Follow Code of Conduct |
| **High** | Pre-approved only | Specific ruleset required |
| **Unacceptable** | Nobody | Prohibited |

---

## Compliant AI Tools

| Tool | Risk Level | Users | Key Restrictions |
|------|------------|-------|------------------|
| **Azure OpenAI** | Low/minimal | All (SCIM) | Fact-check required, no external use without revision |
| **MS Bing Chat Enterprise** | Low/minimal | All (SAML) | **No DALL-E 3 output** (IP issues with LEGO) |
| **Google Translate** | Limited | All | Not for client/production data |
| **Adobe Suite** (Firefly, etc.) | Limited | Assigned designers (SCIM) | - |
| **ChatGPT** | High | Assigned via managers | Private account, history off, fact-check |
| **Midjourney** | High | IT assigned, ZUPA only | Client must agree to risks, IP check |

---

## Non-Compliant Tools

| Tool | Reason |
|------|--------|
| **Quillbot** | No SAML/SCIM/API integration |
| **Midjourney** (default) | Copyright issues, IT security, ongoing lawsuits |

---

## Under Investigation

| Tool | Stage | Risk | Notes |
|------|-------|------|-------|
| Stable Diffusion | Pre-investigation | High | Dedicated machine only |
| Runway | Pre-investigation | - | 3D Motion Vietnam |
| Adobe Firefly | Production test | Limited | - |
| Shutterstock AI | Pre-investigation | Limited | - |
| Synthesia | Production test | Low/minimal | - |
| Google Bard | Initial assessment | High | - |
| **MS AI Builder** | Initial assessment | Low/minimal | Testing Power flows for QC |

---

## Code of Conduct — Key Rules

### Input Restrictions (Never share without risk assessment)
- Confidential data/material
- Client data/material
- Business critical data/material
- Personal data (names of colleagues, clients)
- Full datasets
- Full code sets
- Meeting notes/transcriptions

### Output Requirements
- Always fact-check and validate
- Always quality check (biased data, extra fingers, etc.)
- No client tasks unless terms allow commercial use
- No IP infringement
- No resemblances of known persons/brands

### Transparency Requirements
- **First time AI on client project** → Must inform client, reference external policy
- **AI did most of the work** → Tell the receiver
- **Using AI-generated parts** → Consider if disclosure needed

---

## Implementation Process (6 Steps)

1. **Pre-investigation** — Personal accounts OK, no company/client data
2. **Initial risk assessment** — Submit to SPRING Group IT
3. **Production test** — Verify capabilities, evaluate quality
4. **Compliance review** — Privacy, IPR, regulatory, ethical
5. **IT review** — Security, auth, encryption, logging
6. **Final risk assessment** — Categorize and document

---

## AI Steering Committee

- **Members:** SPRING Group IT + Compliance + stakeholders from each BU
- **Tasks:** Define AI rules, maintain Code of Conduct
- **Engagement:** Business critical or legal/ethical matters

---

## Sprint Implications

### Safe Bets for Proposals
- **Azure OpenAI** — Low risk, SCIM integrated, all employees
- **MS Copilot/Bing Chat** — Low risk, SAML integrated
- **MS AI Builder** — Already being tested for QC automation

### Watch Out
- **DALL-E 3 output prohibited** — LEGO IP concerns
- **Client data processing** — Requires specific approval path
- **New tools** — Must go through 6-step process
- **Midjourney** — Only for ZUPA client with explicit agreement

### For Any AI Capability We Propose
1. Identify which risk tier it falls into
2. Specify which approved tools would power it
3. Ensure no client data input unless Azure OpenAI path
4. Build in fact-checking/human oversight

---

*Summary prepared: February 3, 2026*
