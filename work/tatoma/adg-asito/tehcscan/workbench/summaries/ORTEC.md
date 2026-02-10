# Research Overview — ORTEC Workforce Scheduling
**AI Readiness report as part of Asito's IT Landscape**
**Sticky: 🟢 High AI Maturity (Optimization/ML)**

---

## KEY DETAILS

- **Vendor:** ORTEC (Netherlands, est. 1981)
- **Owner at Asito:** Operations / Workforce Planning
- **Used for:** AI-powered workforce scheduling — demand forecasting, shift optimization, self-scheduling, time registration, real-time rescheduling. Purpose-built for large-scale, multi-site operations.
- **Scale:** 40+ years of optimization R&D; Facility Services is one of six core industry verticals. Customer cases: Albron, G4S, Schiphol Airport Retail. Rating: 4.7/5 on GetApp.
- **Contract/Licensing:** SaaS (cloud-native, Azure Marketplace); enterprise-focused
- **Deployment:** Cloud-native; multi-language (NL/EN/FR/DE); mobile apps (Android/iOS)
- **Industry fit:** Deep Dutch labor market expertise — built for Arbeidstijdenwet, CAO Schoonmaak compliance

---

## API AVAILABILITY AND INTEGRATIONS

- **AFAS integration (native/confirmed):**
  - Employee master data: AFAS → ORTEC (contracts, qualifications, availability)
  - Schedule/hours data: ORTEC → AFAS (for payroll processing)
  - Leave & absence: Bidirectional sync
  - Payroll: ORTEC → AFAS (actual hours + compensation)
- **Other integrations:**
  - SAP, generic payroll connectors
  - REST APIs for custom integrations
  - Azure Marketplace listed
  - ERP systems via API
- **Complementary architecture with AFAS:**
  - AFAS = HR lifecycle (contracts, payroll, recruitment, performance)
  - ORTEC = workforce scheduling (optimization, demand, self-scheduling)
  - Together = comprehensive AI-enhanced WFM stack

---

## OPPORTUNITIES / USE CASES

**Quick wins (ready now):**
- **Scheduling 1000s of cleaners across sites** — core optimizer handles thousands in one run with CAO compliance built in
- **Smart Replacement:** Sick cleaner at 6 AM → ORTEC instantly proposes 3 qualified replacements ranked by suitability → supervisor confirms with one tap
- **Self-scheduling for engagement:** Employees bid on/select shifts via mobile app; AI resolves conflicts while meeting 90%+ of preferences
- **Cross-site reallocation:** Optimizer deploys available staff from underutilized sites to short-staffed sites automatically
- **Demand forecasting:** ML predicts how many cleaners, with which qualifications, at each site, on each day

**Vision / medium-term:**
- **Preference-retention correlation:** ML identifies that staff with preferred schedules have 30% lower turnover → data-driven scheduling policies
- **Generative scheduling:** Emerging capability to generate new schedules from historical patterns
- **Unified analytics:** Combine ORTEC scheduling + AFAS HR data in Power BI for workforce intelligence dashboard
- **Proactive staffing:** Flag understaffed sites 2 weeks in advance → planners adjust before it becomes a problem

---

## KEY AI CAPABILITIES

- **AI is structural — not a bolt-on assistant.** ORTEC's AI powers the core scheduling engine itself.
- **Demand Forecasting (ML):** Historical data + ML → staffing requirements per task/skill/location/time
- **Schedule Optimization (Mathematical Optimization):** Balances labor laws, CAOs, qualifications, preferences, travel time, contracted hours, overtime, fairness — all in one run for thousands of employees
- **Self-Scheduling + AI Conflict Resolution:** AI forecasts demand → open shifts published → employees select → AI resolves conflicts impartially → 90%+ preference fulfillment
- **ML-Powered Insights:** Schedule quality metrics, preference-retention correlation, optimal shift pattern discovery, self-scheduling behavior learning
- **Smart Replacement:** Sick call → instant suggestions based on qualifications, availability, proximity, hours balance, labor rules
- **Proactive Staffing Intelligence:** Anticipates surpluses/shortages at task level before assignments are made
- **No generative AI / text assistant** — complements AFAS Jonas for text-based workflows

---

## KEY LIMITATIONS AND CONSTRAINTS

- **No generative AI / text assistant:** ORTEC optimizes schedules — does not generate text, answer questions, or summarize documents. Complements AFAS Jonas.
- **No native HR management:** Not an HR suite — no contracts, payroll, recruitment, performance. Must integrate with AFAS.
- **No recruitment AI:** No ATS, CV screening, or talent matching.
- **No employee chatbot:** No conversational AI for scheduling queries. Interaction via app/portal only.
- **Implementation complexity:** Advanced optimization requires configuration workshops to define criteria/priorities. Not plug-and-play.
- **Large enterprise focus:** Primarily designed for 10,000+ employee organizations (Asito's scale fits well).
- **Limited public reviews:** Fewer G2/Capterra reviews vs. mass-market WFM tools — niche positioning.
- **No native BI beyond scheduling:** Broader people analytics (turnover, engagement) not native — combine with AFAS BI or Power BI.

---

## SHOWCASE

- **Demo: Multi-Site Schedule Optimization** — 50 client sites, hundreds of cleaners → optimizer creates optimal schedule respecting CAO Schoonmaak, qualifications, preferences, travel time — in minutes
- **Demo: Self-Scheduling** — Employees view open shifts → select preferences on mobile → AI resolves conflicts → 90%+ preferences met (surpasses manual planning)
- **Demo: Smart Replacement** — Sick call at 6 AM → 3 ranked replacement suggestions in seconds → supervisor confirms with one tap
- **Reference: Schiphol Airport Retail** — Absenteeism halved, overtime reduced by 20%
- **Reference: Albron** — Central scheduling platform for facility services catering
- **Key differentiator:** 40+ years of optimization R&D + native Dutch labor law compliance + AFAS integration = purpose-built for Asito's exact challenge
