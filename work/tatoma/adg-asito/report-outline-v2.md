# Asito Foundation Report — Outline v2
## Structuur, intentie per sectie, en databronnen
### Wijzigingen t.o.v. v1: Sectie 4 nu per-tool (niet per-ketenproces), sectie 5 concreter, sectie 6 realistischer

---

## 1. Management Summary (1 pagina)

**Intentie:** In één pagina het totaalplaatje neerzetten. De lezer (directie, IT, operations) moet na deze pagina weten: wat hebben we onderzocht, wat vonden we, en wat raden we aan.

**Kernboodschap:** Asito heeft al een rijk applicatielandschap. Van de 9 onderzochte applicaties scoren er 6 hoog op AI-volwassenheid. Het probleem is niet het ontbreken van mogelijkheden, maar het activeren ervan. De gereedschapskist is vol — de vraag is welke gereedschappen al aanstaan.

**Elementen:**
- Scope: 9 applicaties onderzocht op AI-mogelijkheden en vendorroadmap
- Headline-bevinding: 6 van 9 tools hebben uitgebreide AI — vrijwel niets is geactiveerd
- Per tool: wat zit erin, wat is geactiveerd, waar gaat de leverancier naartoe
- Aanbeveling: begin met activatie van bestaande features, niet met nieuwe projecten
- Tijdlijn: wat is activatie (dagen/weken) vs. wat vereist voorbereiding (maanden)

**Databronnen:** Synthese van alle secties hieronder

---

## 2. De Context (2-3 pagina's)

*Ongewijzigd t.o.v. v1 — structuur en intentie blijven staan.*

### 2a. Organisatieprofiel
**Intentie:** Schaal en complexiteit tastbaar maken — dit is geen kantoor-IT, dit is operationele technologie voor duizenden mensen in het veld.

- ~8.000 schoonmakers, ~350 projectleiders, ~40 klantmanagers
- Operationeel 24/7 op honderden locaties
- Hoog verloop (~40% per jaar)
- ~150 wervingen per maand

**Databronnen:** Procesorganisatie PDF, AFAS HR canvas, Playbook

### 2b. Het procesmodel
**Intentie:** Asito's eigen bedrijfsprocesmodel kort schetsen als context. We gebruiken hun taal, maar dringen geen procesanalyse op.

- 7 ketenprocessen als kapstok (kort benoemen)
- Dit rapport gaat niet over procesoptimalisatie — het gaat over wat de tools die deze processen ondersteunen aan AI-mogelijkheden bevatten

**Databronnen:** Procesorganisatie PDF

### 2c. Het huidige applicatielandschap
**Intentie:** Het endstate-architectuurplaatje beschrijven, inclusief de realiteit dat veel systemen net live zijn (1/1/2025) en het eerste jaar grotendeels in het teken van stabilisatie heeft gestaan.

- AFAS als centraal hub-systeem (ERP + HR)
- ORTEC voor workforce scheduling
- Dynamics 365 voor CRM
- Appreo voor urenregistratie specialistisch/periodiek
- GRIP voor projectcalculatie
- Ondersteunend: ATS (Ubeeo), Werken Bij website, HelloID, Totara
- Analytics: Power BI / Fabric (migratie vanaf Qlik lopend)
- Integratielaag: BizTalk → Logic Apps transitie
- InSpark als Microsoft co-sourcing partner (Azure AI Foundry sandbox in opzet)

**Databronnen:** IT-architectuur endstate (afbeelding), transcript gesprek, Playbook

### 2d. Waar staat Asito met AI?
**Intentie:** Eerlijk en empathisch beeld schetsen. Geen veroordeling maar begrip.

- Systemen per 1/1/2025 live → eerste jaar: stabilisatie en post-go-live issues
- Applicatiebeheerteam volledig bezet
- Copilot beschikbaar (50-100 licenties) maar alleen ingezet voor persoonlijke productiviteit
- Jonas (AFAS) niet actief ingezet
- ORTEC ML-features: onduidelijk welke modules actief zijn
- BI/data-team is wél al bezig met AI (data science analyst aanwezig)
- De lopende procesoptimalisatie-inspanningen creëren veranderbereidheid maar vragen ook capaciteit
- Eilandcultuur: teams werken in silo's, weinig cross-functionele datadeling
- Geen formeel data governance of master data management

**Databronnen:** Transcript gesprek (primair), Playbook, process-capability mapping

---

## 3. Cross-System Inzichten (2-3 pagina's)

*Ongewijzigd t.o.v. v1 — structuur en intentie blijven staan.*

### 3a. De activatiekloof
- 6 van 9 tools: High AI-volwassenheid, vrijwel niets geactiveerd
- Goed nieuws: er hoeft weinig gekocht te worden

### 3b. De datakwaliteit-bottleneck
- Structurele fricties in ORTEC-AFAS-Appreo driehoek
- Geen master data management → randvoorwaarde, niet een AI-project

### 3c. Het Microsoft-ecosysteem als versneller
- Copilot als rode draad (Dynamics, Power BI, Excel, Teams)
- InSpark / Azure AI Foundry sandbox als basis voor custom AI
- Nu: persoonlijke productiviteit. Kans: procesgerichte inzet

### 3d. AFAS + ORTEC: de operationele ruggengraat
- Samen de kern van de operatie, maar integratie is fragiel
- Appreo als "derde wiel" (data-invoer zonder eigen AI)

### 3e. Twee open punten
- HubSpot endstate (strategische keuze)
- Service desk (geen systeem = geen AI-mogelijkheid)

---

## 4. Wat zit er in je gereedschapskist? — Per-tool AI-overzicht (4-5 pagina's)

**NIEUWE OPZET (v2)**

**Intentie:** Dit is het inhoudelijke hart van de tech scan. Per applicatie laten zien: (1) welke AI-mogelijkheden er vandaag beschikbaar zijn, (2) wat de leverancier op de roadmap heeft, en (3) wat dat concreet kan betekenen voor de productiviteit van individuele Asito-medewerkers.

**Waarom per tool en niet per proces:** Albert Jan gaf aan dat geïsoleerde, concrete voorbeelden van productiviteitswinst per applicatie het meest bruikbaar zijn. Een eerdere poging om kansen over alle processen heen te presenteren landde niet goed — het was te aanmatigend en vol aannames over hun werkwijze. Door per tool te presenteren zeggen we: "dit is wat er in je tools zit" — niet: "dit is wat wij denken dat jullie moeten doen met jullie processen."

**Structuur per tool:**
1. **Wat zit erin?** — Huidige AI-features (feitelijk, uit onze research)
2. **Wat komt eraan?** — Vendor roadmap en visie (waar gaat de tool naartoe?)
3. **Wat betekent dat voor Asito?** — 1-2 concrete, individuele productiviteitsvoorbeelden (geen procesassumpties)
4. **Wat is de status bij Asito?** — Geactiveerd? Gebruikt? Onbekend?

---

### 4a. AFAS ERP — Jonas
**AI Maturity: High**

**Wat zit erin:**
- Jonas (AI-assistent, live sinds nov 2024, 1.000+ organisaties)
- Smart Workflow Reactions: tekst genereren, samenvatten, herschrijven binnen workflows
- Speech-to-Text: audio opnemen via Pocket/Apple Watch → automatisch transcriberen
- Receipt OCR (Scan & Herken): foto → automatisch datum, omschrijving, bedrag
- Document-Aware Analysis: Jonas leest bijlagen (contracten, CAO's) en vat samen
- AI Task Templates: gestandaardiseerde prompt-templates (via `/`-shortcut)
- Bank Statement ML Matching: leert van correcties om boekingsvoorstellen te doen

**Wat komt eraan:**
- Profit 8 (gepland juni 2026): CV-parsing, AI talent matching, Jonas in álle workflows
- Jonas Insights Dashboard: gebruiksanalyse, optimalisatie van prompts
- Groeiende template-bibliotheek via AFAS community

**Wat betekent dat voor Asito:**
- Voorbeeld: een projectleider maakt een werkverslag door in te spreken → Jonas maakt er een gestructureerd rapport van
- Voorbeeld: financiële medewerker uploadt een factuur → Jonas vergelijkt met contractvoorwaarden en markeert afwijkingen
- Voorbeeld: bij maandafsluiting suggereert het systeem boekingsmatches op basis van eerder gedrag

**Status bij Asito:** Jonas is beschikbaar maar niet actief ingezet. Activatie vereist handeling door AFAS-beheerder.

**Databronnen:** AFAS ERP canvas, AFAS ERP assessment, AFAS roadmap research

---

### 4b. AFAS HR — Jonas
**AI Maturity: High**

**Wat zit erin:**
- Jonas voor HR-workflows: automatisch antwoorden voorstellen op medewerkersvragen
- CV-screening: documenten uploaden, Jonas extraheert kerngegevens
- Dossier-samenvattingen: Jonas vat personeelsdossiers samen in seconden
- Speech-to-text voor gesprekverslagen (beoordelings- en functioneringsgesprekken)
- CAO-documentanalyse: Jonas beantwoordt vragen over CAO-voorwaarden op basis van het document

**Wat komt eraan:**
- Profit 8: diepere integratie Jonas in HR-workflows, AI talent matching
- Verwachting: meer geautomatiseerde HR-processen (onboarding flows, documentvalidatie)

**Wat betekent dat voor Asito:**
- Voorbeeld: HR-medewerker ontvangt een vraag over verlof → Jonas stelt een antwoord voor op basis van de CAO en het personeelsdossier → medewerker reviewt en verstuurt
- Voorbeeld: bij ~150 wervingen/maand kan Jonas CV's voorscreenen en kerngegevens extraheren → recruiter hoeft alleen de shortlist te beoordelen
- Bewezen resultaat elders: ~6 uur/maand besparing per HR-team (referentie: Zorggroep Sint Maarten)

**Status bij Asito:** Zelfde als ERP — beschikbaar, niet geactiveerd.

**Databronnen:** AFAS HR canvas, AFAS HR assessment

---

### 4c. ORTEC Workforce Scheduling
**AI Maturity: Medium**

**Wat zit erin:**
- ML-gebaseerde scheduling engine (kern van het product, geen add-on)
- Demand forecasting: voorspelling van personeelsbehoefte op basis van historische data
- Smart Replacement: bij uitval automatisch de beste vervanger voorstellen (kwalificatie + beschikbaarheid + nabijheid)
- TESSA: self-service portaal voor medewerkers (inzicht in roosters, beschikbaarheid doorgeven)
- Constraint-based optimization: rekening houden met contractregels, certificeringen, reistijden

**Wat komt eraan:**
- ORTEC investeert in ML-verdieping: nauwkeurigere forecasting, meer zelflerend
- TESSA wordt uitgebreid als medewerkerportaal
- Geen GenAI-roadmap bekend (geen conversationele interface, geen content-generatie)

**Wat betekent dat voor Asito:**
- Voorbeeld: bij een ziekmelding krijgt de planner direct een top-3 vervangers op basis van beschikbaarheid, certificering en reistijd — in plaats van handmatig bellen/zoeken
- Voorbeeld: het systeem signaleert proactief wanneer een planning conflicteert met contractuele afspraken (max uren, rustperiodes)
- Maar: onduidelijk is welke ML-modules actief zijn in Asito's licentie — dit moet geïnventariseerd worden

**Status bij Asito:** ORTEC wordt intensief gebruikt voor roosterplanning. Onbekend welke AI/ML-modules actief zijn. Inventarisatie nodig.

**Databronnen:** ORTEC canvas, ORTEC assessment, transcript (bevestiging dat ORTEC centraal is)

---

### 4d. Microsoft Dynamics 365 CRM — Copilot
**AI Maturity: High**

**Wat zit erin:**
- Copilot voor Sales: lead scoring, opportunity-samenvatting, e-mail drafting
- Meeting preparation: automatische voorbereiding op klantgesprekken (CRM-data + e-mails)
- Conversation intelligence: gespreksanalyse en actie-extractie
- Copilot agents: autonome taken (follow-up reminders, data-opschoning)

**Wat komt eraan:**
- Microsoft investeert zwaar in Copilot agents (autonome workflows)
- Copilot Studio: custom agents bouwen op Dynamics-data
- Integratie met Teams en Outlook wordt steeds dieper

**Wat betekent dat voor Asito:**
- Voorbeeld: een klantmanager opent een account → Copilot toont een samenvatting van recente interacties, openstaande offertes, en suggesties voor het volgende gesprek
- Voorbeeld: na een klantbezoek dicteert de klantmanager notities → Copilot maakt een gestructureerd gespreksverslag en stelt follow-up acties voor
- Kanttekening: de waarde hangt af van hoe actief Dynamics 365 wordt gebruikt door de ~40 klantmanagers

**Status bij Asito:** Dynamics 365 is live, Copilot-licenties zijn beschikbaar. Gebruik is nog primair als CRM, niet als AI-ondersteunde werkplek.

**Databronnen:** Dynamics 365 canvas, Dynamics assessment

---

### 4e. Microsoft Power BI / Fabric — Copilot
**AI Maturity: High**

**Wat zit erin:**
- Copilot in Power BI: stel vragen in natuurlijke taal over dashboards en datasets
- Automatische narrative generation: dashboards krijgen automatische samenvattingen
- Fabric: unified data platform (lakehouse, data engineering, data science, BI — alles in één)
- Semantic model: begrijpt relaties tussen data-entiteiten

**Wat komt eraan:**
- Fabric wordt Microsoft's strategische data platform (vervangt losse producten)
- Copilot agents op data: autonome monitoring en alerting
- Directe integratie met Azure AI Foundry (custom modellen op eigen data)

**Wat betekent dat voor Asito:**
- Voorbeeld: een manager vraagt "wat waren de marges per regio vorige maand?" en krijgt direct een antwoord in tekst en grafiek — zonder zelf te moeten navigeren door rapporten
- Voorbeeld: het BI-team bouwt een dataset in Fabric → iedereen met toegang kan er vragen aan stellen via Copilot
- Bijzonder relevant: het BI/data-team is al actief met AI en data science. Dit team kan als voortrekker fungeren.

**Status bij Asito:** Power BI is in gebruik, Qlik-migratie is lopend. Fabric-licentie en Copilot in Power BI: status moet geverifieerd worden. BI-team is de meest AI-rijpe groep.

**Databronnen:** Power BI canvas, Power BI assessment, transcript (bevestiging BI-team activiteit)

---

### 4f. Microsoft Excel — Copilot
**AI Maturity: High**

**Wat zit erin:**
- Copilot in Excel: formules genereren in natuurlijke taal, data opschonen, patronen herkennen
- Agent Mode (preview): Copilot voert meerdere stappen uit op data (filteren, berekenen, visualiseren)
- Python in Excel (preview): geavanceerde analyses direct in het spreadsheet
- Data-analyse suggesties: Copilot identificeert trends en uitschieters

**Wat komt eraan:**
- Agent Mode wordt stabieler en breder beschikbaar
- Python in Excel wordt mainstream
- Copilot wordt steeds beter in complexe analyses

**Wat betekent dat voor Asito:**
- Voorbeeld: een financieel medewerker heeft een export uit AFAS → vraagt Copilot "toon alle posten waar nacalculatie meer dan 10% afwijkt van voorcalculatie" → krijgt direct het antwoord
- Voorbeeld: HR-medewerker krijgt een bestand met verloopcijfers → vraagt Copilot "wat zijn de trends per regio?" → krijgt een visualisatie
- Laagste instapdrempel van alle AI-tools: de medewerker hoeft alleen te typen wat ze willen weten

**Belangrijk:** Excel Copilot werkt alleen op bestanden in OneDrive/SharePoint. Bestanden op netwerkschijven worden niet ondersteund. Dit is een bekende adoptiedrempel.

**Status bij Asito:** 50-100 Copilot-licenties beschikbaar. Worden ingezet voor persoonlijke productiviteit, niet procesmatig.

**Databronnen:** Excel canvas, Excel assessment, transcript (bevestiging Copilot-gebruik)

---

### 4g. HubSpot — Breeze
**AI Maturity: High**

**Wat zit erin:**
- Breeze: uitgebreid AI-ecosysteem met drie lagen:
  - Breeze Copilot: assistent in de interface (schrijven, samenvatten, onderzoeken)
  - Breeze Agents: autonome taken (content agent, social agent, prospecting agent, customer agent)
  - Breeze Intelligence: data verrijking, buyer intent, form shortening
- Content Hub AI: blogartikelen, social posts, landingspagina's genereren
- Prospecting automation: automatisch ideale doelgroepen identificeren

**Wat komt eraan:**
- HubSpot investeert agressief in AI (Breeze is hun strategische pijler)
- Meer agents, meer autonomie, meer integraties
- AI-first benadering: HubSpot positioneert zich als "AI-CRM"

**Wat betekent dat voor Asito:**
- Breeze is technisch het meest uitgebreide AI-ecosysteem in Asito's set
- Maar: de relevantie hangt volledig af van de strategische beslissing over HubSpot's endstate-positie
- Als HubSpot blijft: Breeze biedt significante marketingautomatisering
- Als HubSpot uitgefaseerd wordt: investering in Breeze is niet zinvol

**Status bij Asito:** Open punt. Endstate-positie van HubSpot moet strategisch bepaald worden.

**Databronnen:** HubSpot canvas, HubSpot assessment, transcript (gevoeligheid rond endstate)

---

### 4h. Ubeeo ATS
**AI Maturity: Medium (via partners)**

**Wat zit erin:**
- Geen native AI in Ubeeo zelf
- AI via partnerintegraties:
  - In2Dialog: interview-analyse met AI (gespreksscores, competentie-inschattingen)
  - WCC: smart matching op kandidaatpool
- Recruitment workflow automation (maar rule-based, niet AI)

**Wat komt eraan:**
- Ubeeo leunt op partner-ecosysteem voor AI-innovatie
- Geen bekende eigen GenAI-roadmap

**Wat betekent dat voor Asito:**
- Voorbeeld: bij gebruik van In2Dialog kan een recruiter na een interview direct een AI-analyse zien van het gesprek → besparing ~30 min handmatige evaluatie per interview
- Bij ~150 wervingen/maand is de cumulatieve besparing significant
- Afhankelijk van actieve partnercontracten — dit moet geïnventariseerd worden

**Status bij Asito:** Ubeeo is in gebruik voor recruitment. Partnerintegraties (In2Dialog, WCC): status onbekend.

**Databronnen:** Ubeeo canvas, Ubeeo assessment

---

### 4i. Appreo
**AI Maturity: Low (geen AI)**

**Wat zit erin:**
- Geen AI-mogelijkheden — alle automatisering is rule-based
- 14 Plan Accelerators (slimme planning-helpers, maar niet ML/AI)
- Sterke integratie met AFAS (bidirectioneel, looncomponenten)
- Digitale werkorders, urenregistratie, GPS-tracking

**Wat komt eraan:**
- Geen bekende AI-roadmap
- Appreo is niet gepositioneerd als AI-platform
- Updates elke 3 weken, focus op functionaliteit en UX

**Wat betekent dat voor Asito:**
- Appreo levert cruciale operationele data (uren, werkorders, locatie)
- AI-waarde zit niet ín Appreo maar in wat er met Appreo-data gebeurt in andere systemen (AFAS, Power BI)
- Strategie: Appreo als betrouwbare databron, niet als AI-platform

**Status bij Asito:** Actief in gebruik voor specialistisch/periodiek schoonmaak. Geen AI-activatie mogelijk — focus op datakwaliteit en integratiestabiliteit.

**Databronnen:** Appreo canvas, Appreo assessment

---

## 5. Uitgelichte voorbeelden (1-2 pagina's)

**AANGESCHERPT (v2)**

**Intentie:** 2-3 scenario's die de lezer direct kan visualiseren in de dagelijkse praktijk. Deze voorbeelden vloeien voort uit de per-tool mogelijkheden uit sectie 4, maar maken ze tastbaar in een Asito-context. Het zijn geen beloftes — het zijn illustraties van wat de tools kunnen als ze geactiveerd zijn.

**Criterium voor selectie:** Elk voorbeeld moet (a) werken op een bestaande tool, (b) geen implementatieproject vereisen (activatie of configuratie), en (c) waarde opleveren voor een individuele medewerker — niet pas na een organisatiebrede uitrol.

### Voorbeeld 1: "De voorman die inspreekt"
**De situatie nu:** Een voorman doet een inspectie op locatie. Na afloop rijdt hij terug, zit achter een bureau, en typt een verslag. Dat duurt lang, de verslagen zijn wisselend van kwaliteit, en soms worden ze helemaal niet gemaakt.

**Met Jonas (AFAS):** De voorman spreekt zijn bevindingen in via de AFAS Pocket app terwijl hij nog op locatie is. Jonas transcribeert, structureert het in de juiste velden, en voegt het toe aan het werkdossier.

**Waarom dit werkt:** Geen nieuw systeem. Geen training in een app. De voorman praat — iets wat hij al doet. De tool die hij al gebruikt (AFAS Pocket) krijgt een functie erbij.

**Vereist:** Jonas-activatie door AFAS-beheerder. Geen licentiekosten.

### Voorbeeld 2: "De financieel medewerker die vraagt in plaats van zoekt"
**De situatie nu:** Een financieel medewerker krijgt een Excel-export uit AFAS met honderden regels. Ze moet handmatig zoeken naar afwijkingen in de nacalculatie. Dat kost uren en is foutgevoelig.

**Met Excel Copilot:** Ze typt: "markeer alle posten waar het verschil tussen nacalculatie en voorcalculatie groter is dan 10%." Copilot filtert, berekent, en markeert — in seconden.

**Waarom dit werkt:** De medewerker kent Excel al. De Copilot-licentie is er al. Het enige verschil: het bestand moet op OneDrive staan, niet op een netwerkschijf.

**Vereist:** Bestand op OneDrive/SharePoint. Copilot-licentie (beschikbaar).

### Voorbeeld 3: "De recruiter die sneller beoordeelt"
**De situatie nu:** Bij ~150 wervingen per maand besteedt de recruitment-afdeling significant tijd aan het handmatig doornemen van CV's en het schrijven van gespreksverslagen.

**Met Jonas (AFAS HR) + In2Dialog (Ubeeo-partner):** Jonas screent inkomende CV's en extraheert kerngegevens in een gestandaardiseerd format. Na het interview maakt In2Dialog een gespreksanalyse. De recruiter beoordeelt de samenvatting in plaats van alles met de hand te doen.

**Waarom dit werkt:** Twee tools die al in het landschap zitten. De ene vereist activatie (Jonas), de andere een partnercontract-check (In2Dialog).

**Vereist:** Jonas-activatie (AFAS HR), verificatie In2Dialog-contract bij Ubeeo.

---

## 6. Aanbevolen vervolgstappen & randvoorwaarden (2 pagina's)

**AANGESCHERPT (v2)**

**Intentie:** Concrete, eerlijke aanbevelingen. We noemen ze bewust geen "pilots" in de zin van projecten — het zijn activatiehandelingen en inventarisaties die Asito kan doen binnen de bestaande applicaties, met bestaande licenties, zonder architectuurwijzigingen. We zijn eerlijk over wat eenvoudig is en wat meer vraagt.

### 6a. Aanbevolen vervolgstappen (gerangschikt op complexiteit)

**Stap 1: Jonas activeren in AFAS (ERP + HR)**
- **Wat:** AFAS-beheerder activeert Jonas per omgeving
- **Inspanning:** Minimaal — het is een configuratiehandeling, geen implementatieproject
- **Kosten:** Geen (fair-use model, inbegrepen in licentie)
- **Wat het oplevert:** De organisatie ervaart AI in een vertrouwde omgeving. Eerste tastbare voorbeelden van wat AI concreet doet.
- **Eerlijk over:** De initiële outputs van Jonas zijn generiek. Er is een iteratieperiode nodig om de prompts en templates af te stemmen op Asito's specifieke werkwijze. Reken op weken, niet dagen, voor goede resultaten.

**Stap 2: Copilot-gebruik inventariseren en richting geven**
- **Wat:** In kaart brengen wie de 50-100 licenties heeft, hoe ze worden gebruikt, en waar de meeste productiviteitswinst zit
- **Inspanning:** Inventarisatie (IT-beheer) + adoptie-begeleiding (weken)
- **Kosten:** Geen extra licenties nodig
- **Wat het oplevert:** Van "Copilot als speeltje" naar "Copilot als werkgereedschap" voor specifieke taken
- **Eerlijk over:** Excel Copilot vereist dat bestanden op OneDrive/SharePoint staan. Als de organisatie nog veel op netwerkschijven werkt, is dit een migratie-afhankelijkheid die niet onderschat moet worden.

**Stap 3: ORTEC AI/ML-modules inventariseren**
- **Wat:** In overleg met ORTEC-accountmanager vaststellen welke ML-features in de huidige licentie zitten en wat er actief is
- **Inspanning:** Gesprek met ORTEC, interne inventarisatie, mogelijk testactivatie
- **Kosten:** Afhankelijk van licentiemodel — mogelijk al inbegrepen, mogelijk extra modules nodig
- **Wat het oplevert:** Duidelijkheid over wat er kan. Als modules beschikbaar zijn: directe planning-optimalisatie
- **Eerlijk over:** ORTEC's ML is geen knop die je aanzet. Het vereist historische data van voldoende kwaliteit en volume. Als de data uit het eerste jaar na go-live nog inconsistent is, kan de ML niet goed trainen. Dit is een realistisch risico.

### 6b. Randvoorwaarden (de basis die alles mogelijk maakt)

**Intentie:** Niet als blokkade presenteren maar als enablers. En eerlijk zijn: sommige hiervan zijn niet triviaal.

**1. Data-eigenaarschap als startpunt**
De belangrijkste randvoorwaarde is niet technisch maar organisatorisch: wie is verantwoordelijk voor de kwaliteit van kerndata? Medewerkerdata, contractdata, urendata — dit zijn de basisingrediënten voor elke AI-toepassing. Zonder duidelijk eigenaarschap levert AI onbetrouwbare resultaten. Dit hoeft geen volledig data governance programma te zijn — begin met het benoemen van data-eigenaren per domein.

**2. Integratiestabiliteit AFAS-ORTEC-Appreo**
De driehoek AFAS-ORTEC-Appreo is de ruggengraat van de operatie. Als data tussen deze systemen niet betrouwbaar synchroniseert, faalt elke AI die op deze data leunt. De lopende procesoptimalisatie-inspanningen raken dit punt al — het is zaak dat de integratiestabiliteit expliciet als randvoorwaarde wordt meegenomen.

**3. Capaciteit applicatiebeheer**
Het applicatiebeheerteam is volledig bezet met post-go-live stabilisatie. AI-activatie (zeker voor Jonas en ORTEC-modules) vereist betrokkenheid van dit team. Realistisch: ofwel extern ondersteunen, ofwel prioriteren ten koste van andere zaken. Dit is een keuze, geen vanzelfsprekendheid.

**4. Adoptie-aanpak passend bij de doelgroep**
Asito's eindgebruikers — voormannen, schoonmakers, projectleiders — zijn praktijkmensen. AI-tools die niet hands-on, taakgericht, en in hun eigen werkomgeving worden geïntroduceerd, worden niet gebruikt. Een e-learning over "wat is AI" werkt niet. Een collega die laat zien "kijk, als je dit intypt, krijg je dit" werkt wel.

**5. Strategische keuzes die invloed hebben op de roadmap**
Twee beslissingen beïnvloeden welke AI-investeringen zinvol zijn:
- De endstate-positie van HubSpot (blijft het, of gaat alles naar Dynamics?)
- De keuze voor een service desk tool (Oplossen & Verbeteren heeft geen systeem)
Zolang deze keuzes open staan, adviseren wij geen AI-investeringen in die domeinen.

---

## 7. Appendix

*Ongewijzigd t.o.v. v1.*

### 7a. AI Maturity Scoring — Methodiek
### 7b. Per-applicatie assessment (samenvattingen, alle 9 tools)
### 7c. Proces-systeem-mapping (volledige tabel, 32 rijen)
### 7d. Integratiearchitectuur (bevestigde dataflows)
### 7e. Openstaande vragen per tool

---

## Toon & Stijl

- **Taal:** Nederlands (formeel maar toegankelijk)
- **Perspectief:** Wij zijn de adviseur die meedenkt, niet de expert die vertelt
- **Filosofie:** Constraint-Based Innovation — activeer wat je hebt, koop niets nieuws
- **Vermijden:** Waslijsten van AI-mogelijkheden per proces, aannames over hun werkwijze, verkooptaal
- **Wel doen:** Per tool laten zien wat erin zit, waar het naartoe gaat, en wat dat concreet kan betekenen. Het team laat zelf bepalen hoe ze dit inzetten.
- **Eerlijkheid:** Niet alles is een "quick win." We benoemen realistisch wat eenvoudig is en wat niet.

## Content-restricties

- ❌ Geen persoonsnamen — alleen teamreferenties
- ❌ Geen "formatiereductie" — woord komt niet voor
- ❌ Geen "Renko" — vervangen door "de lopende procesoptimalisatie-inspanningen"
- ❌ Geen onbevestigde getallen — alleen beschrijvend benoemen als fricties/pijnpunten
- ❌ Geen waslijst van proceskansen — per tool, concreet, geïsoleerd
- ✅ Wél concrete getallen die bevestigd zijn: ~8.000 schoonmakers, ~350 projectleiders, 50-100 Copilot-licenties, 9 applicaties, 7 ketenprocessen, ~150 wervingen/maand, ~40% verloop

## Geschatte omvang

| Sectie | Pagina's |
|--------|----------|
| Management Summary | 1 |
| De Context | 2-3 |
| Cross-System Inzichten | 2-3 |
| Per-tool AI-overzicht | 4-5 |
| Uitgelichte Voorbeelden | 1-2 |
| Vervolgstappen & Randvoorwaarden | 2 |
| Appendix | 5-8 |
| **Totaal** | **~17-24 pagina's** |
