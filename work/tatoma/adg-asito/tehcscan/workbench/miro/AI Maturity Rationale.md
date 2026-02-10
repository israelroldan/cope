# AI Maturity Rationale
Beoordelingsmodel voor het Tech Scan applicatielandschap van Asito

---

## Beoordelingskader

De AI Maturity-score reflecteert drie dimensies:

1. **Branded AI-assistent:** Heeft de tool een eigen, herkenbare AI-assistent met een naam en identiteit?
2. **GenAI-diepte:** Hoe diep zijn de generatieve AI-mogelijkheden (tekstgeneratie, NL-analyse, autonome agents)?
3. **Actieve AI-roadmap:** Investeert de leverancier zichtbaar in AI-doorontwikkeling?

| Score | Betekenis |
|-------|-----------|
| **High** | Branded GenAI-assistent, meerdere ingebouwde AI-features, actieve roadmap |
| **Medium** | Deels AI-mogelijkheden (ML/optimalisatie of via partners), geen volwaardig GenAI |
| **Low** | Geen native AI, geen AI-roadmap, AI alleen mogelijk via externe integratie |

---

## AFAS ERP :  High

**AI-assistent:** Jonas (live sinds november 2024, 1.000+ organisaties actief)

Jonas is volledig ingebed in de ERP-workflows: tekstgeneratie, samenvattingen, herschrijvingen, smart reactions per dossieritem. Daarnaast spraak-naar-tekst (via AFAS Pocket/Apple Watch), receipt OCR (Scan & Recognize) en document-aware analyse op contracten en facturen. Bank statement ML leert van gebruikersfeedback bij reconciliatie. EU AI Act-compliant (CAICO®-gecertificeerd). Jonas is inbegrepen zonder extra kosten (fair-use model), wat de adoptiedrempel verlaagt. Profit 8 (juni 2026) breidt AI verder uit naar alle ERP-workflows.

---

## AFAS HR :  High

**AI-assistent:** Jonas (zelfde platform, HR-specifieke toepassingen)

Dezelfde Jonas-assistent maar met HR-gerichte capabilities: automatisch beantwoorden van medewerkersvragen (bewezen ~6 uur/maand besparing per HR-team), CV-screening en kandidaatanalyse (anti-discriminatie-compliant), spraak-naar-tekst voor performance-gesprekken, CAO-documentanalyse, en onboarding-workflow automatisering. Bij Asito bijzonder relevant gezien het volume: 8.000+ medewerkers, ~150 wervingen/maand, hoog verloop (~40%/jaar). Profit 8 voegt CV-parsing en talent matching toe.

---

## Microsoft Dynamics 365 CRM :  High

**AI-assistent:** Copilot (Microsoft-breed, native geïntegreerd)

Microsoft Copilot zit diep in de CRM-ervaring: vergadervoorbereiding, e-mail drafts, opportunity-samenvattingen, lead scoring, conversation intelligence (gesprekstranscriptie + sentiment). Onderdeel van het bredere Microsoft AI-ecosysteem met regelmatige capability-updates. Volledige GenAI: natuurlijke taal-analyse, autonome acties, relatieanalyse. Bij Asito cruciaal voor het Lead-to-Order ketenproces (acquisitie, offertetraject, projectbeheer). Copilot-licentie vereist.

---

## Microsoft Power BI / Fabric :  High

**AI-assistent:** Copilot (Microsoft Fabric-platform)

Copilot maakt natuurlijke taal-queries op data mogelijk, genereert automatisch visualisaties, schrijft narratieve samenvattingen, en beantwoordt vragen over datasets (Q&A). Onderdeel van het Microsoft Fabric-platform dat data engineering, data science en BI integreert met AI doorheen het hele platform. Maakt self-service analytics toegankelijk voor niet-technische gebruikers. Bij Asito relevant voor Record-to-Report (rapportages, planning & control) en cross-keten inzichten.

---

## HubSpot :  High

**AI-assistent:** Breeze (meest uitgebreid AI-ecosysteem in de set)

Breeze is niet één assistent maar een volledig ecosysteem: Breeze Copilot (embedded assistent met persistent memory), vier autonome Agents (Content Agent, Prospecting Agent, Customer Agent, Personalization Agent), Breeze Intelligence (dataverrijking + buyer intent-signalen), Content Remix (één asset → 5+ formats), AI Writers (blog, e-mail, social), en predictive lead scoring. Zeer actief doorontwikkeld en gemarketed. Belangrijk voorbehoud: de meeste features zijn tier-gated (Professional+/Enterprise vereist). Daarnaast staat HubSpot met een vraagteken in Asito's eindarchitectuur :  endstate-beslissing bepaalt of investering in Breeze zinvol is.

---

## Microsoft Excel :  High

**AI-assistent:** Copilot (onderdeel M365 Copilot)

Copilot voor formulegeneratie, dataopschoning, en analyse in natuurlijke taal. Agent Mode voor meerstaps autonome taken. Python in Excel voor geavanceerde analyses. Al onderdeel van Asito's lopende M365 Copilot-uitrol (50-100 licenties). Meest toegankelijke instap voor de EDUCATE-pijler: laagdrempelig, breed inzetbaar, direct beschikbaar. De snelste quick win in het landschap omdat licenties er al zijn.

---

## ORTEC :  Medium

**AI-assistent:** TESSA (Employee Self-Service)

TESSA is een branded self-service app voor medewerkers (diensten inzien, ruilen, bieden op shifts, voorkeuren aangeven) :  maar het is **geen GenAI**. De AI in ORTEC is klassieke ML en mathematische optimalisatie: demand forecasting, roosteroptimalisatie, smart replacement-algoritmen, ergonomie- en fairness-balancering. Krachtig voor wat het doet, maar geen natuurlijke taal-interface, geen tekstgeneratie, geen autonome agents. De intelligentie zit in het **algoritme**, niet in een conversatie-assistent. Bij Asito cruciaal voor het roosteren van 8.000+ schoonmakers, maar AI-mogelijkheden vragen activatie en licentie-check.

---

## Ubeeo :  Medium

**AI-assistent:** Geen native :  via partnerecosysteem

Ubeeo heeft geen eigen AI-assistent. AI-mogelijkheden komen via het **partnerecosysteem**: In2Dialog (video-interviewanalyse), WCC (AI-gestuurde referentiechecks), Textmetrics (vacaturetekst-optimalisatie). Dit levert reële AI-waarde maar het is gefragmenteerd, niet diep ingebed in de tool zelf, en afhankelijk van partnercontracten en -licenties. Ubeeo is primair een ATS met automatiseringsmogelijkheden, geen AI-platform. Bij Asito relevant voor het Hire-to-Retire ketenproces (werving & selectie).

---

## Appreo :  Low

**AI-assistent:** Geen

Geen AI-assistent, geen branded AI-features, geen zichtbare AI-roadmap. Appreo is een gefocust systeem voor urenregistratie en werkorderbeheer :  operationeel en transactioneel van aard. Elke AI-mogelijkheid zou extern moeten worden toegevoegd via API-integratie (bijv. anomaliedetectie op urendata via Power Automate + externe AI). De tool doet wat het doet (goed), maar er is niets AI-native om te benutten. Bij Asito verbonden met AFAS en ORTEC voor kloktijden en nacalculatieregels.
