# Microsoft Dynamics 365 CRM
**Sales & Klantrelatie System** | **Dynamics 365 Sales · Service · Field Service**
**AI Maturity: Hoog** · **AI Assistant: Copilot**

---

## KEY DETAILS

- **Centraliseert alle klantdata:** Dynamics 365 is het system of record voor Asito's Lead-to-Order proces (acquisitie, offertes, contracten). 40 klantmanagers gebruiken het dagelijks voor klantinteracties en sales pipeline beheer.

- **Microsofts AI-leider op CRM-markt:** Native Copilot integratie (diep ingebouwd in workflows), niet losgekoppeld. SaaS op Microsoft Dataverse, kostprijs €30/user/maand incl. AI-features (via Microsoft 365 Copilot licentie).

- **Ketenproces-ondersteuning:** Volledige Lead-to-Order flow: Lead → Opportunity → Quote → Contract. Integratie met GRIP (contractbeheer) en AFAS (klant/contactdata) haalbaar via iPaaS (Alumio, KoppelHet).

- **Compliance & veiligheid:** GDPR, SOC 2, ISO 27001. Data residency configureerbaar (EU opties). Inloggen via Active Directory ondersteund.

- **Field Service voor operations:** Smart Scheduling voor schoonmakers, automatische werkorder-generatie. Relevant voor Asito's 8.000+ schoonmakers & 1.000 voormannen.

---

## KEY AI CAPABILITIES

- **Copilot Sales Acceleration:** E-mails automatisch genereren met klanthistorie & context, vergadervoorbereidingen met accountsamenvatting en talking points. Besparing: 3-5 uur/week per klantmanager.

- **Real-time conversatie-intelligentie:** Live-transcriptie Teams-calls, sentiment-analyse, KPI-extractie. Voor tenderonderhandelingen: negotiatie-insights en risk-detectie.

- **Autonomous Lead Agents (2025+):** Copilot kwalificeert & prioriteert inkomende leads automatisch. Voor Asito: auto-klassificatie warm/koud uit inbound tenders & inquiries.

- **Predictive Lead & Opportunity Scoring:** ML-modellen voorspellen sluitingskans per opportunity. Voor tenders: tender-winscore op basis van historische data, klantprofiel, omvang.

- **Case Summarization (Service):** Complexe klanthistoriek in 2-zinnen samenvatting. Voor customer service: snel overzicht projectstatus en contractdetails.

- **Smart Insights & Next-Best-Actions:** AI-aanbevelingen welke klant/opportunity prioriteit krijgt. Ondersteunt proactief verkoopgedrag (Winning Move 4).

---

## API AVAILABILITY & INTEGRATIONS

- **Dataverse API & Power Platform:** Open REST/OData API's, Power Automate workflows, Power BI rapportage. Extensibiliteit via Power Apps.

- **GRIP-integratie:** Klanten, contactpersonen, objecten synct Dynamics → GRIP. Reverse: GRIP-ID's terug naar Dynamics. iPaaS-partner (Alumio) essentieel voor bidirectioneel data-flow.

- **AFAS-integratie:** Klanten, contactpersonen, objecten + AFAS-debiteurnummers via Commercient SYNC of KoppelHet. Verkooporders automatisch naar AFAS.

- **Microsoft 365 ecosysteem:** Native Outlook (e-mailhistorie), Teams (call-recording), LinkedIn Sales Navigator, AD-authenticatie.

- **Field Service koppelingen:** D365 Field Service work-orders naar ORTEC scheduling of Appreo. Dispatching schoonmakers op skills/locatie/beschikbaarheid.

---

## OPPORTUNITIES / USE CASES

- **Lead-to-Order · AUTOMATE** :  Tender AI & offertegeneratie: Copilot analyseert tenderspecificaties en genereert offerteschema's. 20% minder offerte-tijd, hogere winsrate.

- **Lead-to-Order · AUTOMATE** :  Lead Scoring & Routing: Autonomous Agents klassificeren inbound opportunities (warm/koud). Tender-winscore op basis van historische conversies.

- **Lead-to-Order · AUTOMATE** :  E-mail & Vergadervoorbereiding: Copilot genereert aanbiedingsmails, contract-updates, vergaderbriefings. 3-5 uur/week besparing per klantmanager.

- **Lead-to-Order · EDUCATE** :  Sales Insights & Predictive Analytics: Dashboard tender-funnel met conversion rates per klanttype. Copilot aanbevelingen welke klanten proactief benaderen.

- **Order-to-Service · AUTOMATE** :  Schoonmaker-dispatching via Field Service: Work-orders geoptimaliseerd op skills/locatie/beschikbaarheid. Integratie ORTEC.

- **Lead-to-Order · INNOVATE** :  Conversatie-intelligentie op tenders: Teams-call transcriptie + sentiment-analyse. AI identificeert negotiate-moments en risk-signalen.

- **Lead-to-Order · EDUCATE** :  360° Klant-inzichten: Unified profiles uit GRIP, AFAS, Dynamics. AI-aanbevelingen: upsell, contract-renewals, risk-customers.

---

## CONSTRAINTS & DEPENDENCIES

- **Geen IT-herarchitectuur:** D365 integrerend met GRIP (apart) en AFAS. iPaaS-partner (Alumio, KoppelHet) essentieel; geen custom API-dev. 6-12 maanden haalbaar.

- **Data governance complex:** Customization-risico op "technical debt." Copilot-permissies strikt configureren (voorkomen gevoelige data leakage). GRIP→D365→AFAS data-mapping vooraf zeer rigoureus.

- **Licensing & M365 vereisten:** Copilot vereist M365 E3/E5 of Business Premium. €30/user/maand × ~300 HQ staff = €108.000/jaar. SMB-pricing €21/user/maand mogelijk.

- **Adoptieverloop traag:** Setup niet flip-a-switch. Success hangt af van partner-kwaliteit, change-management, training. Pilot-fase in sandbox nodig.

- **Microsoft 365 afhankelijkheid:** Best features vereisen Teams + Outlook. Offline-capabilities beperkt. Power Platform admins nodig voor Power Automate workflows.

---

## DISCOVERY QUESTIONS

- **Tender AI exact flow:** Hoe loopt inkomende tenderspec → offerte → GRIP-projectdata? Waar zit handmatig werk in offerteprocedure? Welke criteria AI-gegenereerd?

- **GRIP-integratie prioriteit:** Welke GRIP-data (sjablonen, SLA's, scopes) moet D365 real-time beschikken? Bidirectioneel sync nodig? iPaaS-voorkeur?

- **Lead-scoring criteria:** Historische tender-data beschikbaar voor ML-training (wins/losses, klantprofiel, omvang, sector)? Hoe classify Asito nu warm/koud leads? Autonoom agent-kwalificatie acceptable?

- **Field Service fit:** Kan D365 Field Service Appreo vervangen, of specialistische rol Appreo? Data-koppeling schoonmakers ↔ ORTEC ↔ D365 work-orders?

- **Rollout-strategie:** Pilot: 5-10 klantmanagers Copilot Sales (meeting-prep, e-mail), dan tender-AI voor subset tenders. Timeline, success-metrics, sponsor (Albert Jan Frankfort)?
