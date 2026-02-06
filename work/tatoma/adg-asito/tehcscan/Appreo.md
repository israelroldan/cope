# Appreo

✅ **Approved** · **Category:** Project Management & Field Service · **AI Maturity:** None (High Automation) · **Confidence:** Medium

## Executive Summary

Appreo is a specialized SaaS platform for digital work orders, time registration, and personnel planning, purpose-built for the cleaning and facility services industry. Unlike general project management tools, Appreo focuses on sector-specific needs like payroll integration, CAO wage codes, and mobile field execution.

**Asito** has been utilizing Appreo since **January 1, 2021**, specifically for its specialist and periodic cleaning operations. While the platform lacks native Generative AI or conversational interfaces, it offers "Smart Automation" through rule-based planning indicators and seamless ERP integrations, effectively replacing paper workflows with digital forms.

## Quick Facts

| Attribute | Details |
| --- | --- |
| **Company** | Appreo B.V. |
| **Website** | [https://www.appreo.nl](https://www.appreo.nl) |
| **Deployment** | SaaS (Cloud) with Mobile Apps (iOS/Android) |
| **Primary Markets** | Netherlands, Belgium (Service-oriented industries) |
| **Compliance** | GDPR (AVG) compliant |
| **Development Cycle** | Updates released every 3 weeks |

---

## Asito’s Current Implementation

* **In Use Since:** January 1, 2021.
* **Scope:** Specialist and periodic cleaning operations.
* **User Satisfaction:** High. Operations management reports that the tool provides a "complete overview" where partners and clients have real-time access to work status.
* **Key Benefit:** Centralizes planning, execution, and client visibility, eliminating fragmented spreadsheet-based planning.

---

## Core Functional Capabilities

Appreo operates as a **System of Record** and **Workflow** engine, managing the lifecycle from planning to invoicing.

### 1. Planning & Scheduling

* **Unified View:** Combines people, projects, and machinery in a single interface (27 different planning views available).
* **Smart Indicators:** Visual cues for availability, compliance, and equipment status.
* **Forecasting:** Capacity forecasting to predict staffing needs.
* **Recurring Work:** Auto-scheduling for indefinite recurring cleaning rounds.

### 2. Digital Field Execution

* **Mobile Work Orders:** Technicians fill out orders on-site via mobile app.
* **Evidence Capture:** Includes photo documentation and digital signatures from customers.
* **Time & Material:** Real-time clock in/out (start/stop) or post-registration of hours and materials used.

### 3. Financial & Administrative

* **Invoicing:** Instant availability of work order data for billing.
* **Payroll Prep:** One-click payroll preparation with automated CAO wage codes.
* **Quality Management:** KAM reports and checklist-based inspections.

---

## AI Maturity & Readiness Analysis

**Rating: None** (Focus is on Digitalization & Automation)

Appreo is currently **not an AI-enabled platform**. It relies on deterministic algorithms rather than Machine Learning (ML) or Generative AI (GenAI).

### "Smart" Features vs. AI

Appreo markets "Smart Automation," which should not be confused with AI:

* **Plan Accelerators:** 14 built-in shortcuts (e.g., drag-and-drop, quick suggestions after 3 characters) designed to speed up manual tasks.
* **Rule-Based Logic:** Automation follows strict, pre-defined rules (e.g., "if recurring, schedule every Monday") rather than learning from historical patterns.
* **No Conversational Interface:** There is no branded AI assistant (like ORTEC's TESSA or HubSpot's Breeze). Employees cannot use natural language to query schedules.

### Comparison to AI-Enabled Tools

| Feature | Appreo | AI-Enabled Competitors (e.g., ORTEC) |
| --- | --- | --- |
| **Scheduling** | Manual graphical boards with rule-based helpers | AI/ML optimization algorithms |
| **Interaction** | Buttons and forms | Conversational Chatbots / Voice |
| **Reporting** | Descriptive (Actuals vs. Budget) | Predictive & Prescriptive Analytics |
| **Content** | User-generated only | GenAI drafting (emails, reports) |

---

## Integration Ecosystem

Appreo acts as a middleware layer that connects operational field data with back-office financial systems.

* **HR & Payroll:** Deep, native integration with **AFAS**, **Nmbrs**, and **Loket** (handles bidirectional sync and wage codes).
* **ERP & Finance:** Integrates with **Exact Online**, **Twinfield**, **SnelStart**, **Visma**, **Unit4**, and **Microsoft Dynamics**.
* **Specialized:** Connections to GPS systems for location tracking and **Alert** for security monitoring.

---

## Risks & Governance

* **External Dependency:** Accuracy of financial data relies heavily on the stability of ERP integrations.
* **Privacy:** Collection of employee location data and precise time tracking requires strict adherence to internal privacy policies.
* **Mobile Limitations:** While field workers have a strong app, backend planning adjustments are limited to tablets/desktops; there is no full-featured phone app for planners.

---

## Strategic Recommendations for Asito

### 1. Maximize Current Automation

Before seeking new tools, ensure the current Appreo implementation utilizes all **14 "Plan Accelerators"** and smart indicators. Verify that the recurring schedule features are fully deployed to reduce manual planning load.

### 2. Close the AI Gap via Integration

Since Appreo lacks native AI:

* **Explore API Capabilities:** Investigate using Appreo’s Custom API to connect a third-party AI assistant (e.g., a custom chatbot) that can answer employee questions about schedules.
* **Hybrid Approach:** Evaluate a "Best of Breed" strategy where **ORTEC** handles complex AI-driven schedule optimization, while **Appreo** remains the execution layer for work orders and time registration.

### 3. Vendor Roadmap Engagement

As a satisfied and established customer, Asito should formally request Appreo's roadmap regarding:

* **Conversational Interfaces:** Are there plans for a "TESSA-like" assistant?
* **Predictive Analytics:** Will they move beyond descriptive reporting?

### 4. Governance Review

Review data retention policies within Appreo to ensure they align with Asito’s internal governance standards, particularly regarding long-term storage of employee movement data.