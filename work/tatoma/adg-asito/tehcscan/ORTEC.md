# AI Readiness Report: ORTEC Workforce Scheduling

**Prepared for:** Asito (part of ADG)
**Date:** February 8, 2026
**Prepared by:** Tatoma
**Focus:** Workforce Scheduling

---

## Executive Summary

ORTEC is a Netherlands-based optimization specialist (est. 1981) with over four decades of expertise in mathematical optimization and operations research. Their **ORTEC Workforce Scheduling** solution is a cloud-native platform that uses advanced algorithms, mathematical optimization, and machine learning to automate and optimize the entire workforce scheduling process — from demand forecasting to shift optimization, employee self-scheduling, and time registration. Unlike tools that bolt on AI as a chatbot or text generator, ORTEC's AI is structural: it powers the core scheduling engine itself. For Asito (ADG), a facility services company managing thousands of cleaning staff across dispersed sites with complex CAO requirements and high turnover, ORTEC addresses the exact scheduling challenge that AFAS cannot solve natively. ORTEC lists Facility Services as one of its six key industry verticals and has documented customer cases in the sector (Albron, G4S). The platform integrates with AFAS for HR/payroll data synchronization.

---

## AI / Optimization Identity

ORTEC does **not** have a branded AI assistant (no "Jonas" or "Copilot" equivalent). Instead, AI and mathematical optimization are the foundational technology layer that powers the entire product. This is an important distinction:

| Aspect | ORTEC Approach | Typical "AI Assistant" Approach |
|---|---|---|
| **Where AI lives** | Core scheduling engine | Bolt-on assistant layer |
| **AI type** | Mathematical optimization, operations research, machine learning | Generative AI / LLM |
| **What AI does** | Creates, optimizes, and balances schedules automatically | Generates text, answers questions, summarizes |
| **Human role** | Reviews and approves optimized schedules | Reviews AI-generated text/suggestions |
| **Maturity** | 40+ years of optimization R&D | Typically 1-3 years old |

ORTEC describes their AI approach as combining **Mathematical Optimization** and **Machine Learning** — not generative AI, but algorithmic intelligence applied to scheduling decisions.

---

## Core AI Capabilities

### 1. Demand Forecasting (Machine Learning)

ORTEC uses historical data and machine learning to forecast staffing demand across different time horizons. The demand calculation process translates volume forecasts into actual workload demands using up-to-date productivity figures.

**How it works:**
- Different volume types require multiple tasks and skill sets
- ML models analyze historical patterns to predict future demand
- Productivity rates per task/skill are factored in
- Output: required staffing levels per task, skill, location, and time period

> **Demo-ready use case:** For a cleaning operation with 50 client sites, ORTEC can forecast how many cleaners with which qualifications are needed at each site on each day, based on historical workload patterns, seasonal variation, and contract requirements.

### 2. Schedule Optimization (Mathematical Optimization / AI)

The core scheduling engine uses powerful optimization algorithms to create schedules that simultaneously balance multiple competing constraints:

- Labor laws and Working Hours Act (Arbeidstijdenwet)
- Collective labor agreements (CAO Schoonmaak)
- Employee qualifications and certifications
- Personal preferences and availability
- Travel time between locations
- Contracted hours
- Ergonomic guidelines
- Overtime rules and costs
- Fairness across employees

**Scale:** ORTEC's algorithm can optimize schedules for hundreds to thousands of employees in a single run. It can deploy the right employees across departments and locations, maximizing utilization of payroll staff before resorting to external (flexpool) workers.

> **Demo-ready use case:** At Schiphol Airport Retail, ORTEC's optimization halved absenteeism and reduced overtime by 20% by creating better-balanced, preference-respecting schedules.

### 3. Self-Scheduling with AI Conflict Resolution

ORTEC supports multiple scheduling models, from fully centralized to complete employee self-scheduling:

**Self-scheduling flow:**
1. AI forecasts demand and translates it into staffing requirements
2. Open shifts are published to employees
3. Employees bid on/select preferred shifts via the mobile app
4. If conflicts remain, the AI-powered optimizer resolves them impartially
5. The optimizer meets **over 90% of employee preferences** — surpassing manual planning

> **Demo-ready use case:** Cleaning staff can view available shifts across client sites on their phone, select preferences, and the system automatically resolves conflicts while respecting qualifications and CAO rules.

### 4. ML-Powered Insights & Learning

ORTEC uses machine learning to analyze the gap between planned and actual schedules, uncovering actionable patterns:

- **Roster health metrics:** Frequency of schedule changes indicates initial schedule quality
- **Preference-retention correlation:** ML identifies links between schedule adherence to preferences and employee retention
- **Optimal shift patterns:** Discovers ideal shift lengths and patterns from actual data
- **Self-scheduling behavior:** Learns employee self-scheduling patterns to improve future proposals
- **Emerging:** Generating new schedules based on historical patterns (generative scheduling)

> **Demo-ready use case:** ORTEC can identify that cleaning staff who consistently get their preferred shifts have 30% lower turnover, enabling data-driven scheduling policies that improve retention.

### 5. Smart Replacement Suggestions

When an employee calls in sick or is unavailable, ORTEC's algorithm suggests optimal replacements based on qualifications, availability, proximity, hours balance, and labor rules — in seconds rather than the hours a manual planner would need.

> **Demo-ready use case:** A site supervisor reports a cleaner is sick at 6 AM. ORTEC immediately proposes three qualified replacements ranked by suitability, and the supervisor confirms with one tap in the app.

### 6. Proactive Staffing Intelligence

ORTEC's AI provides visibility into anticipated staffing surpluses and shortages at the task level before actual assignments are made. This allows organizations to be proactive rather than reactive.

> **Demo-ready use case:** Two weeks ahead, ORTEC flags that three client sites will be understaffed on Tuesday mornings due to training schedules, allowing planners to adjust in advance.

---

## Product Modules & Features

| Module | Description |
|---|---|
| **Demand Forecasting** | ML-based demand prediction from historical data; translates volume into workload per task/skill |
| **Schedule Optimizer** | Core AI engine — creates optimized schedules balancing all constraints in a single run |
| **Cyclical Scheduling** | Recurring pattern schedules with optimization |
| **Bid Scheduling / Shift Bidding** | Employees bid on preferred shifts; AI resolves conflicts |
| **Self-Scheduling** | Full employee self-scheduling with AI guardrails |
| **Real-Time Rescheduling** | Dynamic adjustments for absences, demand changes, emergencies |
| **Smart Replacement** | AI-suggested replacements for absent employees |
| **Employee Self-Service App** | Mobile app — view schedule, swap shifts, bid on open shifts, report availability, access company news |
| **Employee Portal** | Web-based portal for schedule management and communications |
| **Time & Attendance** | Registration, approval, and calculation of actual work hours |
| **Planning Board** | Visual planning interface for planners and managers |
| **Analytics & KPIs** | Real-time performance indicators, schedule quality metrics, workforce utilization dashboards |
| **Communications** | Integrated communications to employees via app/portal |
| **Persona-Based Applications** | Tailored interfaces for Planners, Employees, Managers, and Ad-hoc Planners |

### Supported Scheduling Types
- Centralized scheduling
- Decentralized scheduling
- Cyclical schedules
- Bid schedules
- Complete self-scheduling
- Combined/hybrid models

### Deployment
- **Cloud-native** (available on Azure Marketplace)
- SaaS model
- Multi-language: Dutch, English, French, German
- Mobile: Android, iPad, iPhone

---

## Facility Services Industry Focus

ORTEC lists **Facility Services** as one of its six core industry verticals. Their facility services solution addresses specific challenges in cleaning, catering, and security:

### Industry Challenges ORTEC Addresses

| Challenge | ORTEC Solution |
|---|---|
| **Staff shortages post-COVID** | Optimizer maximizes utilization of available staff before hiring externally |
| **Unpredictable workload (e.g., remote work impact)** | Demand forecasting adapts to changing patterns |
| **Lack of cross-location collaboration** | Cross-site optimization deploys available staff from one location to cover shortages at another |
| **Labor compliance complexity** | Automated CAO/Working Hours Act compliance built into every schedule |
| **Employee engagement & retention** | Self-scheduling, shift bidding, preference matching (90%+), mobile app |

### Facility Services Solution Components

1. **Full planning process support** — From forecasts to budget control and payroll management
2. **Powerful optimizers** — Take regulations, qualifications, and employee preferences into account
3. **Shift Bidding & ESS modules** — Engage employees actively in planning
4. **Mobile app** — Schedule access, shift swaps, availability reporting, company news
5. **Advanced analytics** — Calculate optimal scheduling, measure KPIs, enable continuous improvement

---

## Customer Cases

### Facility Services & Cleaning

| Customer | Industry | Use Case | Result |
|---|---|---|---|
| **Albron** | Facility Services / Catering | Automated employee scheduling and timesheet approval | Central scheduling platform for improved WFM |
| **G4S** | Facility Services / Security | Quality and efficiency improvement | ORTEC optimization for security staffing |

### Other Industries (Demonstrating Scheduling Capabilities)

| Customer | Industry | Result |
|---|---|---|
| **Schiphol Airport Retail** | Retail / Airport | Absenteeism halved, overtime reduced by 20% |
| **Colruyt Group** | Retail / Logistics | Transformed logistics with faster, compliant planning |
| **Albert Schweitzer Hospital** | Healthcare | Data-driven scheduling decisions, improved communications |
| **Amsterdam UMC** | Healthcare / Municipal | Optimal personnel planning, improved satisfaction |
| **BaptistCare** (Australia) | Healthcare / Aged Care | Improved caregiver consistency |
| **Accolade** | Finance | Eliminated schedule inaccuracies through automation |

**Total impact cases:** 74+ across all ORTEC solutions.

---

## Integration Ecosystem

### AFAS Integration

ORTEC Workforce Scheduling **explicitly lists AFAS Software** as an integration partner (confirmed on Capterra and GetApp). The integration typically covers:

| Data Flow | Direction | Description |
|---|---|---|
| **Employee master data** | AFAS → ORTEC | Contracts, qualifications, availability, competencies |
| **Schedule/hours data** | ORTEC → AFAS | Worked hours, overtime, shift data for payroll processing |
| **Leave & absence** | Bidirectional | Absence data from AFAS feeds into ORTEC scheduling; ORTEC schedule changes sync back |
| **Payroll** | ORTEC → AFAS | Actual hours and compensation calculations for payroll |

### Other Integrations

| System Type | Integration |
|---|---|
| **HR & Payroll systems** | AFAS, SAP, generic payroll connectors |
| **ERP systems** | API-based integration |
| **Azure Marketplace** | Listed as cloud app, enabling Azure-based deployments |
| **API** | REST APIs for custom integrations |

---

## AI Limitations — What ORTEC CAN'T Do

| Limitation | Detail | Impact for Asito |
|---|---|---|
| **No generative AI / text assistant** | ORTEC does not have a Jonas/Copilot-style AI that generates text, answers questions, or summarizes documents. Its AI is optimization-focused. | Complementary to AFAS Jonas — ORTEC optimizes schedules, Jonas handles text-based HR workflows. |
| **No native HR management** | ORTEC is a scheduling tool, not an HR suite. It does not manage contracts, payroll, recruitment, or performance reviews. | Must integrate with AFAS for the full HR lifecycle. ORTEC handles scheduling only. |
| **No native recruitment AI** | No applicant tracking, CV screening, or talent matching. | Recruitment remains in AFAS (or external ATS like Teamtailor). |
| **No employee chatbot** | No conversational AI for employees to ask scheduling questions. Interaction is via app/portal. | Employee queries about schedules must go through planners or the self-service app. |
| **Large enterprise focus** | Primary customer base is large enterprises (10,000+ employees). May be over-engineered for smaller operations. | Asito's scale (thousands of employees) fits the target market well. |
| **Implementation complexity** | Advanced optimization requires configuration workshops to define scheduling criteria and priorities. Not plug-and-play. | Requires upfront investment in implementation and change management. |
| **Limited public review data** | Fewer reviews on G2/Capterra compared to mass-market WFM tools. Niche positioning. | Harder to benchmark against competitors from public reviews alone. |
| **No native BI/reporting beyond scheduling** | Analytics focus on scheduling KPIs. Broader workforce analytics (turnover prediction, engagement scoring) not native. | Combine with AFAS BI dashboards or peopleIX for full HR analytics. |

---

## Competitive Positioning

### Market Context

| Dimension | ORTEC | Mass-Market WFM (UKG, NICE, Legion) |
|---|---|---|
| **Core strength** | Deep mathematical optimization | Broad WFM suite with many modules |
| **AI approach** | Operations research + ML | Increasingly AI-first (generative + predictive) |
| **Target market** | Large enterprises in NL/EU, expanding globally | Global enterprises, all sizes |
| **Industry depth** | Deep in facility services, healthcare, logistics, retail | Broad across all industries |
| **AFAS integration** | Native integration listed | Limited/no AFAS integration |
| **Dutch market knowledge** | Native — built for Dutch labor law, CAOs, Arbeidstijdenwet | Often US-centric, adapted for EU |
| **User rating** | 4.7/5 on GetApp | Varies (UKG: ~4.2, NICE: ~4.3) |

### Key Differentiator for Asito

ORTEC's primary advantage is the combination of **deep scheduling optimization** with **Dutch labor market expertise**. For a facility services company operating under CAO Schoonmaak with thousands of dispersed workers, this matters more than broad WFM features. ORTEC is purpose-built for exactly this complexity.

---

## AI Maturity Assessment (Workforce Scheduling Focus)

| Dimension | Rating | Notes |
|---|---|---|
| **Schedule Optimization AI** | High | Core competency — 40+ years of optimization R&D. Handles thousands of employees in one run. |
| **Demand Forecasting** | High | ML-based forecasting from historical data. Proven at scale. |
| **Self-Scheduling / Employee Engagement** | High | Multiple scheduling models (bid, self, hybrid). Mobile app. 90%+ preference fulfillment. |
| **Real-Time Rescheduling** | High | Smart replacement suggestions, dynamic adjustments for absences. |
| **ML-Powered Insights** | Medium-High | Schedule quality analytics, preference-retention correlation, pattern discovery. Emerging generative scheduling. |
| **Integration Ecosystem** | Medium | AFAS and SAP integrations confirmed. REST APIs. Less broad than mass-market WFM platforms. |
| **Generative AI / Text AI** | Low | Not applicable — ORTEC is an optimization engine, not a text/content AI tool. |
| **Predictive HR Analytics** | Medium | Scheduling-focused analytics strong. Broader people analytics (turnover, engagement) not native. |
| **Compliance Automation** | High | Dutch labor law, CAOs, Working Hours Act built into optimization engine. |
| **Documentation & Support** | Medium-High | Comprehensive product documentation, insight articles, brochures. Implementation requires workshops. |

---

## Relevance for Asito (ADG) — Facility Services Scheduling

### Why ORTEC Matters for Asito

Asito's core scheduling challenges map directly to ORTEC's capabilities:

| Asito Challenge | ORTEC Solution | Readiness |
|---|---|---|
| **Scheduling 1000s of cleaners across sites** | Core optimizer — handles thousands in one run | Ready now |
| **CAO Schoonmaak compliance** | Built into optimization engine | Ready now |
| **High turnover / staff shortages** | Maximize utilization before external hiring; preference-based scheduling improves retention | Ready now |
| **Unpredictable demand (remote work impact on cleaning needs)** | ML demand forecasting adapts to changing patterns | Ready now |
| **Cross-site staff reallocation** | Optimizer deploys available staff from underutilized sites to short-staffed sites | Ready now |
| **Employee engagement for field staff** | Self-scheduling, shift bidding, mobile app | Ready now |
| **Last-minute absences** | Smart replacement suggestions in seconds | Ready now |
| **AFAS integration for payroll** | Native integration — hours/schedule data flows to AFAS payroll | Ready now |
| **Seasonal variation** | Demand forecasting handles seasonal patterns | Ready now |

### ORTEC + AFAS: Complementary Architecture

The combination of ORTEC (scheduling AI) and AFAS (HR/payroll AI) creates a comprehensive, AI-enhanced workforce management stack:

| Function | System | AI Capability |
|---|---|---|
| **Employee data, contracts, payroll** | AFAS | Jonas: workflow AI, document analysis, translation |
| **Recruitment** | AFAS (+ Teamtailor/Recruitee) | Jonas: CV screening, talent matching (Profit 8) |
| **Workforce scheduling** | ORTEC | Mathematical optimization, ML demand forecasting |
| **Employee self-service (scheduling)** | ORTEC app | Self-scheduling, shift bidding, shift swaps |
| **Employee self-service (HR)** | AFAS InSite/Pocket | Leave requests, expense claims, personal data |
| **Performance management** | AFAS | Jonas: conversation transcription, reporting |
| **Analytics** | Both | ORTEC: scheduling KPIs; AFAS: HR BI dashboards |

---

## Recommended Next Steps

### Immediate (Q1 2026)

1. **Assess current scheduling maturity** — Map Asito's current scheduling process (tools, manual effort, pain points, flex worker costs) to identify where ORTEC optimization would have the highest impact.

2. **Request an ORTEC demo** — Specifically for facility services. Ask to see demand forecasting for multi-site cleaning operations and the self-scheduling workflow.

3. **Validate AFAS-ORTEC integration** — Confirm the specific data flows between AFAS and ORTEC and assess implementation effort for bidirectional sync.

### Short-term (Q2-Q3 2026)

4. **Run a pilot** — Select 5-10 client sites for a pilot deployment. Measure: scheduler time savings, flex worker cost reduction, employee preference fulfillment rate, absenteeism impact.

5. **Define scheduling criteria** — Run ORTEC's recommended stakeholder workshop to define what a "good roster" means for Asito: priorities, constraints, fairness rules, CAO compliance requirements.

6. **Deploy mobile app** — Roll out the employee self-service app to cleaning staff for schedule viewing, shift swaps, and availability reporting.

### Medium-term (Q4 2026+)

7. **Scale deployment** — Based on pilot results, roll out ORTEC Workforce Scheduling across all Asito operations.

8. **Activate self-scheduling** — Move from centralized planning to a hybrid model where employees can self-schedule within AI-defined guardrails.

9. **Connect analytics** — Combine ORTEC scheduling data with AFAS HR data in Power BI for a unified workforce analytics dashboard covering scheduling efficiency, turnover, absence, and cost.

10. **Explore ML insights** — Use ORTEC's pattern analysis to identify correlations between schedule quality and retention — a high-value insight for reducing turnover in facility services.

---

## Sources

- [ORTEC Workforce Scheduling — Product Page](https://ortec.com/en/solutions/productivity-engagement/workforce-scheduling)
- [AI in Workforce Scheduling — 4 Examples (ORTEC Insights)](https://ortec.com/en/insights/ai-workforce-scheduling)
- [Workforce Experience: 6 Insights on AI and Planning](https://ortec.com/en/insights/workforce-experience-2025-insights)
- [AI in HR: Smarter Workforce Planning with ORTEC](https://ortec.com/en/insights/ai-in-hr)
- [Demand Management in Workforce Scheduling (ORTEC)](https://ortec.com/en-us/insights/demand-management-in-workforce-scheduling)
- [Future of Workforce Scheduling in Facility Services (ORTEC)](https://ortec.com/en/insights/future-workforce-scheduling-in-facility-services)
- [ORTEC Workforce Solutions for Facility Services](https://ortec.com/en/industries/facility-services)
- [ORTEC Workforce Scheduling — Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/ortecbv.ortec_workforce_scheduling)
- [ORTEC Workforce Scheduling — Capterra](https://www.capterra.com/p/215973/ORTEC-Workforce-Scheduling/)
- [ORTEC Workforce Scheduling — GetApp](https://www.getapp.com/hr-employee-management-software/a/ortec-workforce-scheduling/)
- [ORTEC Workforce Scheduling Alternatives — GetApp](https://www.getapp.com/hr-employee-management-software/a/ortec-workforce-scheduling/alternatives/)
- [ORTEC Market Share — 6sense](https://6sense.com/tech/hrms/ortec-workforce-scheduling-market-share)
- [ORTEC Impact Cases](https://ortec.com/en/impact-cases)
- [ORTEC Productivity & Engagement Solutions](https://ortec.com/en/solutions/productivity-engagement)
- [ORTEC Employee Self-Service App Brochure](https://ortec.com/en/solutions/productivity-engagement/workforce-scheduling) (linked from product page)
- [2024 Gartner Market Guide for Workforce Management Applications](https://workforcesoftware.com/white-paper/2024-gartner-market-guide-for-workforce-management-applications/)
