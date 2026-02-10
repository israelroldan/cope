# HubSpot

**Marketing CRM** | Marktanalyse & Marketing | Market-to-Lead keten
**AI Maturity: High** · **AI: Breeze**

---

## KEY DETAILS

- **Rol in Asito:** HubSpot is het centrale platform voor marketing automation en lead management. Verbonden via Azure Logic Apps (dashed line = mogelijke uitfasering?). Veel integratiepotentieel, maar beperkt verbonden met rest van landschap (geen directe AFAS-koppeling).

- **STRATEGISCH RISICO :  Endstate onzekerheid:** Status van HubSpot in de eindarchitectuur is een VRAAGTEKEN. Migratie naar Dynamics mogelijk, of verdere investering in HubSpot. Dit beperkt langetermijninvesteringen en moet eerst besproken met Albert Jan Frankfort (IT-directeur).

- **Huidge integratiestatus:** API-first architectuur biedt veel koppelingsmogelijkheden (Zapier, Make, native connectors). Maar diepere landschapsintegratie (bijv. ERP, HRM) vraagt architectuurbeslissing en duidelijkheid over toekomst.

- **Data governance kritisch:** Asito moet clean CRM-data garanderen voor Breeze Intelligence (predictive scoring, prospecting). Slechte data = slechte AI-output. Huidge data-kwaliteit onbekend.

- **AI maturity: HOOG, maar tier-gated:** Professional+/Enterprise tiers ontgrendelen alle Breeze-features. Starter-licenties hebben beperkte AI-toegang. Huídige licentieniveau moet geverifieerd worden.

## KEY AI CAPABILITIES

- **Breeze Copilot:** Embedded AI-assistent voor on-demand hulp, meeting-samenvattingen, en strategische analyse via CRM-data. Persistent memory over conversaties heen.

- **Breeze Agents (autonoom):** Vier gespecialiseerde AI-agenten:
  - **Content Agent:** Automatiseert content marketing workflows
  - **Prospecting Agent:** Onderzoeks- en outreach-automatisering
  - **Customer Agent:** Getraind op kennisbases, automatiseert customer responses
  - **Personalization Agent (Beta):** Identificeert doelgroepsegmenten

- **Breeze Intelligence:** Dataverrijking en buyer intent-signalen direct in de CRM. Basis voor Market-to-Lead kansen (leadscoring, marktinzicht).

- **Content Remix:** Transformeert één asset (blog, video) naar meerdere formaten: social posts, email, audio scripts. Gebruikers besparen 10+ uren/maand. HOOG ROI.

- **AI Writers:** AI Blog Writer (volledige posts), AI Email Writer (sales outreach), Text Enhancers (Rewrite, Expand, Shorten, Tone). Versnelt routine communicatie.

- **Predictive AI & Conversation Intelligence:** Lead scoring op basis van buyer signals, call transcription. Ondersteunt sales effectiveness en marktanalyse.

## API AVAILABILITY & INTEGRATIONS

- **API-first architectuur:** Open API met 1000+ connectoren (native + third-party via Zapier, Make). Brede koppelmogelijkheden.

- **Native productivity:** Gmail, Outlook, Slack, Zoom, Microsoft 365, Google Workspace. Makkelijke integratie met bedrijfs-IT.

- **Automation platform:** Zapier (5000+ apps), Make (advanced logic + externe LLMs), native HubSpot workflows. Kan Breeze AI aan externe systemen koppelen.

- **Beperkte landschapsintegratie bij Asito:** Ondanks API-mogelijkheden: geen directe AFAS-verbinding. Logic Apps-koppeling is "dashed line". Diepere ERP/HR integratie vraagt strategie-keuze.

- **ChatGPT integratie:** Read-only access voor diepere CRM-analyse. Kan waarde toevoegen voor strategy/analytics.

## OPPORTUNITIES / USE CASES

- **Market-to-Lead · AUTOMATE** :  Content Multiplication: Content Remix genereert 5+ formats (LinkedIn, email, Twitter) uit één blog post. 10+ uren/maand bespaard.

- **Market-to-Lead · AUTOMATE** :  Lead Scoring & Prospecting Agent: Breeze Intelligence geeft predictive scoring. Prospecting Agent handelt outreach automatisch af.

- **Market-to-Lead · EDUCATE** :  Marktanalyse & Buyer Intelligence: Breeze Copilot analyseert CRM-data voor marktinzichten en competitor positioning.

- **Lead-to-Order · AUTOMATE** :  Sales Email & Offer Acceleration: AI Email Writer genereert sales outreach en tender voorbereiding. Versnelt bid-proces.

- **Market-to-Lead · AUTOMATE** :  Knowledge Base & FAQ Automation: Breeze Content Agent analyseert support tickets en genereert FAQ's.

- **Market-to-Lead · INNOVATE** :  Personalisatie op schaal: Personalization Agent identificeert doelsegmenten; Content Agent maakt segment-specific messaging.

- **VOORZICHTIG:** Alle kansen hangen af van ENDSTATE-KEUZE. Investeringen risicovol als HubSpot wordt uitfaseeerd.

## KEY LIMITATIONS & CONSTRAINTS

- **KRITIEKE DEPENDENCY :  Endstate strategie:** HubSpot staat met "?" in endstate architectuur. Migratie naar Dynamics = verlies Breeze investment. Beslissing van IT-leiding (Albert Jan Frankfort) bepaalt haalbaarheid.

- **Licentie-afhankelijkheid:** Alle high-value AI features zijn Professional+ of Enterprise tier-only. Starter-licenties hebben minimale Breeze-access. Huídige licentieniveau moet geverifieerd.

- **Data kwaliteit is kritisch:** Breeze Intelligence en predictive scoring werken alleen op clean CRM-data. Asito's data-hygiene is onbekend. Audit nodig voordat je op Breeze vertrouwt.

- **Geen IT-herarchitectuur beschikbaar:** 6-12 maanden constraint. Geen major landscape rewiring. Dit beperkt integratie-diepte met AFAS, ERP, HRM.

- **Admin governance nodig:** Hallucination-risico: AI-generated content (blogs, emails) vereist human review voordat publicatie naar klanten.

## DISCOVERY QUESTIONS

- **1. ENDSTATE STRATEGIE [CRUCIALE VRAAG]:** Blijft HubSpot in eindarchitectuur, of migreren we naar Dynamics CRM? Dit bepaalt of Breeze-investeringen zinvol zijn. **Aanspreekpunt: Albert Jan Frankfort.**

- **2. Huidge licentieniveau:** Welke HubSpot-tier heeft Asito nu (Starter / Professional / Enterprise)? Professional+ nodig voor volledige Breeze access. Upgrade-kosten?

- **3. CRM-datakwaliteit audit:** Hoe compleet/schoon is Asito's HubSpot-database? Contact hygiene, lead scoring accuracy, AFAS-sync status? Breeze Intelligence hangt hiervan af.

- **4. Breeze feature-enablement:** Zijn generative AI tools in HubSpot ingeschakeld? Welke Breeze Agents willen teams testen (Content, Prospecting, Email)?

- **5. AFAS & ERP integratieplan:** Als HubSpot blijft, hoe diep koppelen we met AFAS, SAP, HRM? Zapier/Make/Logic Apps volstaan voor quick wins, maar strategie-keuze nodig.
