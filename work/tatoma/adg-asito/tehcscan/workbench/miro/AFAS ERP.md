# AFAS ERP
ERP System | Central Hub | Finance, Projecten, Inkoop
**AI Maturity: High** · **AI: Jonas**

---

## KEY DETAILS

- **Centrale hub-functie bij Asito:** AFAS is het centrale systeem waaraan bijna alle andere systemen gekoppeld zijn (GRIP, ORTEC, Appreo, Dynamics). Ondersteunt volledige bedrijfsvoering voor ~8.000 schoonmakers, 1.000 voormannen, 350 projectleiders, 40 klantmanagers en 300 HQ-medewerkers.

- **Drie ketenprocessen geraakt:** Service-to-Cash (nacalculatie, facturatie, debiteurenbewaking), Procure-to-Pay (crediteurenbewaking, betaalverwerking), Record-to-Report (dataverzameling, rapportages).

- **Nederlandse SaaS, GDPR-compliant:** AFAS Online met InSite (medewerkerszelfservice), OutSite (klantportaal), Profit (backoffice) en workflow-engine. Data blijft in Nederland.

- **Bekende frictie ter waarde:** 1.000+ urenmismatches/maand (AFAS↔ORTEC), €100-200k vergeten doorbelastingen/maand, onvolledige documenten bij onboarding, handmatige nasynchronisatie tussen systemen.

---

## KEY AI CAPABILITIES

- **Jonas AI-assistent (nov 2024+):** Embedded in workflows voor tekstgeneratie, samenvattingen, herschrijving. Smart reactions kunnen automatische antwoorden genereren per dossieritem; handmatig invokeerbaar via `/`-commando.

- **Spraak-naar-tekst & audio-analyse:** Via AFAS Pocket of Apple Watch: voormannen en locatiemanagers spreken observaties in; Jonas transcribeert en extraheert taakpunten automatisch. Perfecte fit voor Asito's locatierapportages.

- **Receipt OCR (Scan & Recognize):** Schoonmakers fotograferen bonnen ter plaatse; Jonas vult datum, bedrag, omschrijving in. Bespaard handwerk bij onkosten.

- **Document-aware analyse:** Jonas kan gekoppelde documenten (contracten, facturen, inkooporders, projectdocumentatie) lezen en relevante info extraheren/samenvatten. Ondersteunt financiële verificatie en projectbeheer.

- **Automatische tekstbewerking:** Verkort, verlengt of verandert toon (zakelijk ↔ vriendelijk) van gegenereerde teksten. Ideaal voor klantcommunicatie.

- **Bank statement ML:** AFAS leert van gebruikersfeedback om ledger-matches voor te stellen bij reconciliatie.

- **Toekomstig (Profit 8, juni 2026):** Uitgebreide speech-to-text, verbeterde document-analyse, Jonas breed deploybaar in alle ERP-workflows (finance, inkoop, projectbeheer).

---

## API AVAILABILITY & INTEGRATIONS

- **REST API volledig beschikbaar:** GetConnectors (read) en UpdateConnectors (write). Token-based auth. Docs op docs.afas.help; testing via connect.afas.nl.

- **Huidige integratiestromen bij Asito:**
  - Dynamics → AFAS: klanten, contactpersonen, debiteurennummers
  - GRIP ↔ AFAS: projecten, voorcalculatieregels, facturen, medewerkers
  - ORTEC ↔ AFAS: medewerkers, verlofsaldi, projecten, nacalculatieregels, verlofboekingen
  - Appreo ↔ AFAS: medewerkers, verlofsaldi, projecten, nacalculatieregels (met bijlagen)

- **Integratiemogelijkheden:** Power Automate (custom connectors), Azure Data Factory (ETL), Apideck (unified API naar 200+ apps), APIcenter (no-code hub), Make/Zapier (webhooks).

- **Webhooks & Logic Apps:** Power Automate kan workflows triggeren op AFAS-events. Externe AI (OpenAI, Claude, etc.) via REST API voor data-processing.

- **Jonas-activatie:** Alle Jonas-features (behalve Receipt OCR) moeten expliciet geactiveerd worden per omgeving door AFAS-admin.

---

## OPPORTUNITIES / USE CASES

- **Service-to-Cash · AUTOMATE** :  Automatische nasynchronisatie urenmismatches: Jonas vergelijkt dagelijks ORTEC-verlofboekingen met AFAS-projecturen. 80% reductie van 1.000+ mismatches/maand.

- **Service-to-Cash · AUTOMATE** :  Intelligente vergeten-doorbelastingen detectie via Jonas-analyse. €80-150k/maand potentieel terugverdienen.

- **Service-to-Cash · AUTOMATE** :  AI-gestuurde factuurvalidatie voordat verzending. Verlaagt invoicing-fouten en verbetert debiteurenbewaking.

- **Record-to-Report · AUTOMATE** :  Financiële rapportage-automatisering: Jonas genereert maand-/kwartaaloverzichten en reconciliatierapporten uit AFAS-data. Bespaart handmatige rapportage-uren bij HQ-finance.

- **Order-to-Service · AUTOMATE** :  Spraakgestuurde locatierapportages via AFAS Pocket. Voormannen spreken observaties in; Jonas transcribeert en structureert.

- **Procure-to-Pay · AUTOMATE** :  Receipt OCR voor fieldteam-onkosten. Schoonmakers fotograferen bonnen ter plaatse; Jonas herkent bedrag + datum.

- **Order-to-Service · INNOVATE** :  Predictieve personeelsplanning met externe AI via AFAS REST API en Power Automate.

---

## CONSTRAINTS & DEPENDENCIES

- **Jonas vereist expliciete activatie:** Alle Jonas-features (behalve Receipt OCR) moeten per omgeving ingeschakeld en door AFAS-admin geconfigureerd worden. Geen automatische rollout.

- **Datakwaliteit is kritisch:** Jonas-output afhankelijk van input-kwaliteit. Incomplete AFAS-records (ontbrekende klant-info, dubbele medewerkers) verslechteren AI-output.

- **Integratieafhankelijkheden:** Veel use cases hangen af van GRIP↔AFAS, ORTEC↔AFAS of Appreo↔AFAS-koppelingen. Fouten upstream (verkeerde uren in ORTEC) propageren door Jonas-analyse.

- **Geen IT-herarchitectuur:** Alle oplossingen moeten werken binnen bestaande AFAS-setup. Power Automate + API-calls haalbaar; custom AFAS-modules niet.

- **Beperkte verandercapaciteit:** Eilandcultuur bij Asito. Jonas-pilots vereisen veel change-management; training moet zeer praktisch en taakgericht zijn.

- **Prompt-tuning nodig:** Initiële Jonas-outputs zijn niet perfect. Iteratieve refinement via Jonas Insights Dashboard vereist aandacht van AFAS-beheerders.

---

## DISCOVERY QUESTIONS

- **Wanneer is Jonas geactiveerd?** In welke workflows (HR, finance, operations) en op welk gebruikersniveau? Welke limitations door licensing?

- **Welke AFAS API-tokens bestaan al?** Wie mag GET/UPDATE-connectors aanmaken? Power Automate ↔ AFAS mogelijk, of security-restricties?

- **Hoe GRIP↔AFAS-synchronisatie?** Real-time of batch? Welke velden sync? Waar ontstaan 1.000+ urenmismatches?

- **Wie is AFAS-poweruser/-beheerder?** Wie past workflows aan, tuned Jonas-prompts, bouwt dossier-automatisering? Hoeveel capaciteit?

- **Wat werkt al met Jonas?** Van 1.000+ orgs: demo-use cases vergelijkbaar met Asito (schoonmaak, veld-heavy)?

- **Profit 8-timing (juni 2026):** Welke ERP-specifieke verbeteringen (workflow-automatisering, documentanalyse, reconciliatie)? Budget/licenties nodig?

- **AI governance:** Beleid rondom financiële/projectdata in Jonas-workflows? Wie mag factuur- en projectdata via AI verwerken? Autorisatieniveaus?
