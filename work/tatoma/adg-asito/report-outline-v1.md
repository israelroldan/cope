# Asito Foundation Report — Outline v1
## Structuur, intentie per sectie, en databronnen

---

## 1. Management Summary (1 pagina)

**Intentie:** In één pagina het totaalplaatje neerzetten. De lezer (directie, IT, operations) moet na deze pagina weten: wat hebben we onderzocht, wat vonden we, en wat raden we aan.

**Kernboodschap:** Asito heeft al een rijk applicatielandschap. Van de 9 onderzochte applicaties scoren er 6 hoog op AI-volwassenheid. Het probleem is niet het ontbreken van mogelijkheden, maar het activeren en verbinden ervan. De sleutel tot AI-waarde bij Asito zit in drie dingen: (1) activatie van wat er al is, (2) datakwaliteit op orde brengen, en (3) de juiste adoptie-aanpak voor een operationele organisatie.

**Elementen:**
- Scope: 9 applicaties, 7 ketenprocessen, 32 processtappen geanalyseerd
- Headline-bevinding: 6 van 9 tools hebben uitgebreide AI — bijna niets is geactiveerd
- Drie snelle wins die geen nieuw systeem vereisen
- Twee strategische keuzes die eerst gemaakt moeten worden
- Tijdlijn: wat kan in Q1 vs. wat vereist voorbereiding

**Databronnen:** Synthese van alle secties hieronder

---

## 2. De Context (2-3 pagina's)

**Intentie:** De lezer meenemen in Asito's uitgangspositie. Niet als droog feitenoverzicht, maar als verhaal: waar komt Asito vandaan, waar staan ze nu, en waarom is dit het juiste moment voor AI?

### 2a. Organisatieprofiel
**Intentie:** Schaal en complexiteit tastbaar maken — dit is geen kantoor-IT, dit is operationele technologie voor duizenden mensen in het veld.

- ~8.000 schoonmakers, ~350 projectleiders, ~40 klantmanagers
- Operationeel 24/7 op honderden locaties
- Hoog verloop (~40% per jaar)
- ~150 wervingen per maand

**Databronnen:** Procesorganisatie PDF, AFAS HR canvas, Playbook

### 2b. Het procesmodel
**Intentie:** Asito's eigen bedrijfsprocesmodel als kapstok gebruiken. Laten zien dat we hun taal spreken, niet onze eigen framework opleggen.

- 7 ketenprocessen (3 primair, 3 ondersteunend, 1 besturend)
- Primair: Lead-to-Order → Order-to-Service → Service-to-Cash
- Ondersteunend: Market-to-Lead, Hire-to-Retire, Oplossen & Verbeteren
- Besturend: Record-to-Report
- Procure-to-Pay als open punt

**Databronnen:** Procesorganisatie PDF, process-capability mapping v2

### 2c. Het huidige applicatielandschap
**Intentie:** Het endstate-architectuurplaatje beschrijven zoals Asito het zelf ziet, inclusief de realiteit dat veel systemen net live zijn (1/1/2025) en het eerste jaar grotendeels in het teken van stabilisatie heeft gestaan.

- AFAS als centraal hub-systeem (ERP + HR)
- ORTEC voor workforce scheduling
- Dynamics 365 voor CRM
- Appreo voor urenregistratie specialistisch/periodiek
- GRIP voor projectcalculatie
- Ondersteunend: ATS (Ubeeo), Werken Bij website, HelloID, Totara
- Analytics: Power BI / Fabric (migratie vanaf Qlik lopend)
- Integratielaag: BizTalk → Logic Apps transitie
- Uitfasering: Flinker, Hubble, Jedox, Credit Manager
- InSpark als Microsoft co-sourcing partner (Azure AI Foundry sandbox in opzet)

**Databronnen:** IT-architectuur endstate (afbeelding), transcript gesprek, Playbook

### 2d. Waar staat Asito met AI?
**Intentie:** Eerlijk en empathisch beeld schetsen. Geen veroordeling ("jullie lopen achter") maar begrip ("jullie hebben een turbulent jaar achter de rug — logisch dat AI-activatie niet bovenaan stond").

- Systemen per 1/1/2025 live → eerste jaar: stabilisatie en brandjes blussen
- Applicatiebeheerteam volledig bezet met post-go-live issues
- Copilot beschikbaar (50-100 licenties) maar alleen ingezet voor persoonlijke productiviteit
- Jonas (AFAS) niet actief ingezet
- ORTEC ML-features: onbekend welke modules actief zijn
- BI/data-team is wél al bezig met AI (data science analyst aanwezig)
- De lopende procesoptimalisatie-inspanningen creëren veranderbereidheid maar vragen ook capaciteit
- Eilandcultuur: teams werken in silo's, weinig cross-functionele datadeling
- Geen formeel data governance of master data management

**Databronnen:** Transcript gesprek (primair), Playbook, process-capability mapping

---

## 3. Cross-System Inzichten (2-3 pagina's)

**Intentie:** Dit is het hart van het rapport — de patronen die je alleen ziet als je het hele landschap tegelijk bekijkt. Niet per tool, maar dwars door tools heen. Dit is de unieke waarde van de techscan.

### 3a. De activatiekloof
**Intentie:** Het grootste patroon benoemen — de mogelijkheden zijn er, maar ze staan uit.

- 6 van 9 tools scoren High op AI-volwassenheid
- Geen enkele AI-assistent (Jonas, Copilot, Breeze) wordt structureel ingezet
- Oorzaken: post-go-live drukte, ontbrekende kennis, geen eigenaarschap over AI-activatie
- Dit is goed nieuws: er hoeft weinig gekocht te worden, er moet geactiveerd worden

**Databronnen:** Alle 9 techscan canvassen, transcript

### 3b. De datakwaliteit-bottleneck
**Intentie:** Laten zien dat AI pas werkt als de data klopt — en dat dit bij Asito een fundamenteel aandachtspunt is.

- Signalen van structurele mismatches in het ORTEC-AFAS-Appreo driehoek
- Geen master data management; geen formele data governance
- De BI-afdeling ziet dit probleem, maar heeft beperkte mandaat
- Datakwaliteit is geen AI-project, maar een randvoorwaarde voor elk AI-project

**Databronnen:** Transcript, process-capability mapping (friction points), AFAS/ORTEC canvassen

### 3c. Het Microsoft-ecosysteem als versneller
**Intentie:** Laten zien dat Microsoft de rode draad is in het landschap, en dat Copilot een unificerend element kan zijn — mits strategisch uitgerold.

- Dynamics 365, Power BI/Fabric, Excel, Teams: allemaal Copilot-enabled
- InSpark bouwt Azure AI Foundry sandbox → basis voor custom AI
- Maar: Copilot wordt nu alleen voor "leuke dingen" gebruikt (persoonlijke productiviteit)
- Kans: van individueel gebruik naar procesgeïntegreerde AI

**Databronnen:** Excel/Dynamics/Power BI canvassen, transcript

### 3d. AFAS + ORTEC: de operationele ruggengraat
**Intentie:** De AFAS-ORTEC combinatie uitlichten als dé plek waar operationele AI-waarde zit, maar ook waar de grootste fricties leven.

- AFAS = hub (finance, HR, payroll) met Jonas als AI-assistent
- ORTEC = scheduling engine met ML-optimalisatie
- Samen vormen ze de kern van Order-to-Service en Service-to-Cash
- Maar: de integratie is fragiel, data loopt niet altijd synchroon
- Appreo als "derde wiel" — operationele data-invoer zonder eigen AI

**Databronnen:** AFAS ERP, ORTEC, Appreo canvassen, integration flows

### 3e. De twee blinde vlekken
**Intentie:** Eerlijk benoemen waar het landschap onduidelijk is — dit zijn strategische beslissingen, geen technische.

- **HubSpot vs. Dynamics:** Endstate-positie van HubSpot is een open vraag. Beide hebben uitgebreide AI. Investeren in de verkeerde is weggegooid geld.
- **Service desk:** Geen duidelijk systeem voor Oplossen & Verbeteren. TOPdesk? Ebbot? Dit beperkt AI-mogelijkheden voor incident triage.

**Databronnen:** Transcript (HubSpot gevoelig), process-capability mapping (gaps)

---

## 4. Strategische AI-kansen (3-4 pagina's)

**Intentie:** Van patronen naar concrete kansen. Georganiseerd per ketenproces, niet per tool — want de lezer denkt in processen, niet in systemen. Per kans: wat is het, in welk systeem, wat levert het op, en wat is ervoor nodig.

### 4a. Lead-to-Order (Dynamics 365 + GRIP)
**Intentie:** Laten zien dat Copilot in Dynamics CRM de salesproductiviteit kan verhogen, maar dat dit pas relevant is als de CRM-adoptie goed is.

- Copilot voor leadkwalificatie, opportunity-samenvatting, e-mailgeneratie
- Vereist: schone CRM-data, actief gebruik door klantmanagers
- Categorie: EDUCATE (eerst adoptie, dan AI)

### 4b. Order-to-Service (ORTEC + AFAS + Appreo)
**Intentie:** De kern van Asito's operatie. Hier zit het meeste AI-potentieel én de meeste frictie.

- ORTEC ML voor demand forecasting en schedule optimization
- Smart Replacement bij ziekteverzuim (kwalificatie + beschikbaarheid + nabijheid)
- Contractconstraints als guardrail in roosterplanning (AFAS → ORTEC)
- Appreo als data-invoerpunt: geen eigen AI, maar cruciale operationele data
- Vereist: inventarisatie actieve ORTEC-modules, datakwaliteit AFAS-ORTEC sync

### 4c. Service-to-Cash (AFAS)
**Intentie:** De financiële lekkage zichtbaar maken. Hier zit direct meetbare businesswaarde.

- Jonas voor factuurvalidatie en anomaliedetectie
- Nacalculatie-verificatie: automatische check op uren-discrepanties
- Doorbelastingsherinnering: signaleren van gemiste pass-through kosten
- Bank statement ML matching (al beschikbaar, activatie vereist)
- Vereist: Jonas-activatie, definiëring van business rules

### 4d. Hire-to-Retire (AFAS HR + Ubeeo + ATS)
**Intentie:** Bij ~150 wervingen/maand en ~40% verloop is de HR-keten een continue stroom. AI kan hier volume-efficiëntie brengen.

- Jonas voor CV-screening en dossier-samenvattingen
- Speech-to-text voor gesprekverslagen (projectleiders, voormannen)
- Ubeeo + In2Dialog voor interview-analyse
- Onboarding compliance checker: zijn alle documenten compleet vóór eerste werkdag?
- Vereist: Jonas-activatie per HR-workflow, partnercontracten Ubeeo

### 4e. Record-to-Report (Power BI / Fabric + Dataplatform)
**Intentie:** De BI-afdeling is de meest AI-rijpe groep. Hen versterken als "AI-voortrekkers" in de organisatie.

- Copilot in Power BI: natuurlijke-taalvragen op dashboards
- Fabric als unified data platform (vervanging Qlik + meer)
- Azure AI Foundry voor custom modellen op Asito-data
- BI-team als interne AI-ambassadeur — zij begrijpen data en kunnen use cases aanleveren
- Vereist: Fabric-licentie, Qlik-migratiepad, data governance basis

### 4f. Overige ketenprocessen
**Intentie:** Kort benoemen wat er is, eerlijk zijn over de gaps.

- **Market-to-Lead:** Afhankelijk van HubSpot-beslissing
- **Procure-to-Pay:** Geen duidelijk standaardsysteem — parkeren
- **Oplossen & Verbeteren:** Service desk niet in scope — geen AI-kans zonder systeem

---

## 5. Uitgelichte voorbeelden (1-2 pagina's)

**Intentie:** 2-3 concrete, tastbare voorbeelden die de lezer zich kan voorstellen. Geen abstracte AI-termen, maar scenario's uit de dagelijkse praktijk van Asito.

### Voorbeeld 1: "De voorman die praat in plaats van typt"
**Scenario:** Een voorman doet een inspectie op locatie. In plaats van na afloop achter een bureau een rapport te typen, spreekt hij zijn bevindingen in via de AFAS Pocket app. Jonas transcribeert, structureert, en voegt het toe aan het werkdossier.
**Systeem:** AFAS (Jonas, Speech-to-Text)
**Ketenproces:** Order-to-Service (Execute)
**Waarom dit resoneert:** Asito's voormannen zijn doeners, geen typisten. Dit sluit aan bij hun werkwijze.

### Voorbeeld 2: "De planner die weet wat niet mag"
**Scenario:** Een planner in ORTEC maakt een rooster. Het systeem waarschuwt automatisch wanneer een toewijzing conflicteert met contractuele afspraken — maximaal aantal uren, vereiste certificeringen, reistijdlimieten. Nu zijn deze constraints onzichtbaar en worden fouten pas bij nacalculatie ontdekt.
**Systeem:** ORTEC (Optimization engine) + AFAS (contractdata)
**Ketenproces:** Order-to-Service (Assign)
**Waarom dit resoneert:** Dit is een dagelijks frustratiepunt voor planners. Het is de verborgen oorzaak van veel nacalculatie-problemen.

### Voorbeeld 3: "De factuur die zichzelf controleert"
**Scenario:** Voordat een factuur verstuurd wordt, vergelijkt Jonas automatisch de nacalculatieregels met de voorcalculatie en het contract. Afwijkingen worden gemarkeerd. Gemiste doorbelastingen — materiaal, extra uren, meerwerk — worden gesignaleerd vóór verzending.
**Systeem:** AFAS (Jonas + business rules)
**Ketenproces:** Service-to-Cash (Invoice)
**Waarom dit resoneert:** Financiële lekkage door vergeten doorbelastingen is een bekend pijnpunt.

---

## 6. Pilotkandidaten & Randvoorwaarden (2 pagina's)

**Intentie:** Concrete aanbevelingen. Niet "er zijn kansen" maar "begin hier, doe dit, met deze voorwaarden." Eerlijk over wat er eerst moet kloppen.

### 6a. Aanbevolen pilots (top 3)

**Pilot 1: Jonas activeren in AFAS**
- Wat: AI-assistent activeren per AFAS-omgeving (ERP + HR)
- Waarom: Nul extra kosten (fair-use), geen implementatie nodig, directe waarde
- Quick win: Speech-to-text voor voormannen, receipt OCR, HR FAQ-afhandeling
- Voorwaarde: AFAS-beheerder moet activatie uitvoeren
- Tijdlijn: Dagen, niet weken
- Impact: EDUCATE — zichtbaar maken dat AI al in de tools zit

**Pilot 2: Copilot doelgericht inzetten (van persoonlijk naar proces)**
- Wat: Copilot-licenties strategisch toewijzen aan specifieke processtappen
- Waarom: Licenties zijn er al, maar worden niet procesmatig ingezet
- Quick win: Excel Copilot voor financiële analyses, Power BI Copilot voor rapportage
- Voorwaarde: Bestanden op OneDrive/SharePoint, niet op netwerkschijven
- Tijdlijn: Weken (adoptie-begeleiding)
- Impact: EDUCATE → AUTOMATE transitie

**Pilot 3: ORTEC-modules inventariseren en activeren**
- Wat: Inventarisatie welke ORTEC AI/ML-modules beschikbaar zijn in huidige licentie
- Waarom: ORTEC's ML is structureel (scheduling engine), niet een add-on — maar onbekend is wat er actief is
- Quick win: Smart Replacement, demand forecasting — als de modules er zijn
- Voorwaarde: Overleg met ORTEC-accountmanager, module-inventarisatie
- Tijdlijn: Weken (inventarisatie) → maanden (activatie)
- Impact: AUTOMATE — directe operationele waarde

### 6b. Randvoorwaarden (wat moet eerst)

**Intentie:** Niet als blokkade presenteren, maar als enablers. "Dit zijn de dingen die élke pilot succesvol maken."

1. **Data governance basis:** Eigenaarschap over kerndata (medewerkers, contracten, uren). Niet een heel programma — begin met afspraken over wie verantwoordelijk is voor datakwaliteit per domein.

2. **Integratiestabiliteit:** De AFAS-ORTEC-Appreo driehoek moet betrouwbaar synchroniseren. Elk AI-initiatief dat op uren- of contractdata leunt, faalt als de integratie niet klopt.

3. **Adoptie-aanpak:** AI-tools zonder training en begeleiding worden niet gebruikt. Asito's populatie (voormannen, schoonmakers, projectleiders) vereist een hands-on, taakgerichte aanpak — geen e-learnings.

4. **Capaciteit applicatiebeheer:** Het team is nu volledig bezet met stabilisatie. AI-activatie vereist minimale maar gerichte capaciteit. Oplossing: extern ondersteunen of prioriteren.

5. **Strategische beslissingen:** HubSpot endstate en service desk keuze beïnvloeden welke AI-investeringen zinvol zijn.

---

## 7. Appendix

**Intentie:** Alle detail voor wie dieper wil graven. Referentiemateriaal, geen leesmateriaal.

### 7a. AI Maturity Scoring — Methodiek
- Drie criteria uitgelegd
- Scoringsschaal (High/Medium/Low) met definities

### 7b. Per-applicatie assessment (samenvattingen)
- Per tool: 1 pagina met key details, AI capabilities, limitations, kansen
- Alle 9 tools: AFAS ERP, AFAS HR, ORTEC, Dynamics 365, Power BI/Fabric, Excel, HubSpot, Ubeeo, Appreo

### 7c. Proces-systeem-mapping (volledige tabel)
- Alle 32 processtappen met systemen, integratiepunten, en AI-capabilities
- Gebaseerd op de CSV

### 7d. Integratiearchitectuur
- Overzicht van alle bevestigde dataflows tussen systemen
- Bron: IT-architectuur endstate + validatie uit gesprek

### 7e. Openstaande vragen
- Per tool: discovery questions die nog beantwoord moeten worden
- Strategische beslissingen die invloed hebben op de roadmap

---

## Toon & Stijl

- **Taal:** Nederlands (formeel maar toegankelijk)
- **Perspectief:** Wij zijn de adviseur die meedenkt, niet de expert die vertelt
- **Filosofie:** Constraint-Based Innovation — activeer wat je hebt, koop niets nieuws
- **Vermijden:** Jargon zonder context, afkortingen zonder uitleg, verkooptaal
- **Wel doen:** Asito's eigen terminologie gebruiken (ketenprocessen, voormannen, projectleiders, nacalculatie)

## Content-restricties

- ❌ Geen persoonsnamen — alleen teamreferenties (bijv. "het BI-team", "het applicatiebeheerteam", "de operations directie")
- ❌ Geen "formatiereductie" — woord komt niet voor in het rapport
- ❌ Geen "Renko" — vervangen door "de lopende procesoptimalisatie-inspanningen"
- ❌ Geen onbevestigde getallen (€100-200k doorbelastingen, 1.000+ mismatches) — alleen beschrijvend benoemen als "structurele fricties" of "bekende pijnpunten"
- ✅ Wél concrete getallen die bevestigd zijn: ~8.000 schoonmakers, ~350 projectleiders, 50-100 Copilot-licenties, 9 applicaties, 7 ketenprocessen

## Geschatte omvang

| Sectie | Pagina's |
|--------|----------|
| Management Summary | 1 |
| De Context | 2-3 |
| Cross-System Inzichten | 2-3 |
| Strategische AI-kansen | 3-4 |
| Uitgelichte Voorbeelden | 1-2 |
| Pilotkandidaten & Randvoorwaarden | 2 |
| Appendix | 5-8 |
| **Totaal** | **~16-23 pagina's** |
