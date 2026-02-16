# Asito Foundation Report
## Tech Scan: AI-mogelijkheden in het applicatielandschap

*Tatoma · Februari 2026*

---

## 1. Management Summary

Asito beschikt over een applicatielandschap met aanzienlijk AI-potentieel. In het kader van de Tatoma Foundation Sprint hebben wij negen kernapplicaties onderzocht op hun huidige AI-mogelijkheden, de roadmap van de leverancier, en de relevantie voor Asito's dagelijkse operatie.

De belangrijkste bevinding is helder: zes van de negen onderzochte applicaties scoren hoog op AI-volwassenheid. AFAS heeft Jonas, Microsoft biedt Copilot in Dynamics 365, Power BI, en Excel, en HubSpot heeft Breeze. Deze AI-assistenten zijn beschikbaar binnen de huidige licenties, maar vrijwel geen ervan is structureel geactiveerd of ingezet bij Asito.

Het probleem is dus niet het ontbreken van mogelijkheden, maar het activeren ervan. De gereedschapskist is gevuld. De vraag is welke gereedschappen al aanstaan.

Onze aanbeveling is om te beginnen met activatie, niet met implementatie. Het benutten van AI in deze tools kent drie niveaus: de ingebouwde assistenten activeren voor eindgebruikers, workflows en templates inrichten door de Application engineers, en vervolgens maatwerk bouwen waar nodig. Drie concrete vervolgstappen vereisen geen nieuwe systemen, geen architectuurwijzigingen, en geen grote investeringen: Jonas activeren in AFAS, het Copilot-gebruik inventariseren en richting geven, en de ORTEC AI/ML-modules in kaart brengen. Voor elk van deze stappen zijn we eerlijk over wat eenvoudig is en wat niet.

Dit rapport biedt in de hoofdtekst het overzicht en de analyse. Voor wie de details wil: in Appendix B staat per applicatie een uitgebreide analyse met features, beperkingen, en openstaande vragen. In Appendix D staan concrete praktijkscenario's ter inspiratie.

---

## 2. De Context

### 2.1 Organisatieprofiel

Asito is een van de grootste schoonmaakbedrijven van Nederland. De organisatie telt circa 8.000 schoonmakers, ongeveer 350 projectleiders, en zo'n 40 klantmanagers. Daarnaast werken er rond de 300 medewerkers op het hoofdkantoor in ondersteunende functies.

Dit is geen kantoororganisatie met een IT-afdeling die af en toe een tool uitrolt. Dit is een operationele organisatie die 24 uur per dag, 7 dagen per week actief is op honderden locaties verspreid over het land. De eindgebruikers van de IT-systemen zijn voormannen op locatie, schoonmakers met een telefoon, en projectleiders die meer tijd in hun auto doorbrengen dan achter een bureau.

Dat operationele karakter heeft directe consequenties voor AI-adoptie. Technologie die niet past bij de werkwijze van de eindgebruiker — praktisch, taakgericht, in het veld — wordt simpelweg niet gebruikt.

Het personeelsverloop ligt rond de 40% per jaar, wat resulteert in circa 150 wervingen per maand. De HR-keten is daarmee geen periodiek proces maar een continue stroom die om volume-efficiëntie vraagt.

### 2.2 Het procesmodel

Asito werkt met een bedrijfsprocesmodel van zeven ketenprocessen. Drie daarvan zijn primair (Lead-to-Order, Order-to-Service, Service-to-Cash), drie ondersteunend (Market-to-Lead, Hire-to-Retire, Oplossen en Verbeteren), en één besturend (Record-to-Report).

Dit rapport gaat niet over procesoptimalisatie — daar lopen andere trajecten voor. Het gaat over wat de applicaties die deze processen ondersteunen aan AI-mogelijkheden bevatten. We gebruiken de ketenprocessen als gedeelde taal, niet als adviesdomein.

### 2.3 Het huidige applicatielandschap

Asito heeft het afgelopen jaar een ingrijpende systeemtransitie doorgemaakt. Per 1 januari 2025 is een groot deel van het applicatielandschap live gegaan, met AFAS als centraal hub-systeem voor zowel ERP (finance, projecten, inkoop) als HR (personeelsbeheer, loonverwerking). Daaromheen functioneert ORTEC als workforce scheduling engine, Dynamics 365 als CRM, Appreo voor urenregistratie en werkorders in het specialistisch en periodiek segment, en GRIP voor projectcalculatie.

In de ondersteunende laag staan Ubeeo als ATS voor recruitment, de Werken Bij-website, HelloID voor identity management, en Totara als LMS. De analytics-laag wordt ingevuld door Power BI en Microsoft Fabric, waarbij een migratie vanaf Qlik lopend is.

De integratielaag tussen deze systemen draait deels nog op BizTalk en wordt gemigreerd naar Logic Apps. InSpark fungeert als Microsoft co-sourcing partner en is bezig met de opzet van een Azure AI Foundry sandbox — een omgeving voor het experimenteren met custom AI op Asito's eigen data.

Verschillende systemen worden uitgefaseerd, waaronder Flinker, Hubble, Jedox en Credit Manager. De endstate-positie van HubSpot is een open punt: het is onduidelijk of HubSpot in het eindplaatje blijft of dat de functionaliteit volledig naar Dynamics 365 verhuist.

### 2.4 Waar staat Asito met AI?

Het eerlijke antwoord is: aan het begin. En dat is begrijpelijk.

Het hele applicatielandschap is per 1 januari 2025 live gegaan. Het eerste jaar heeft grotendeels in het teken gestaan van stabilisatie — systemen laten draaien, integraties fijnstellen, gebruikers begeleiden. Het team van Application engineers is volledig bezet geweest met post-go-live issues. In die context is het logisch dat AI-activatie niet bovenaan de prioriteitenlijst stond.

De huidige situatie laat zich als volgt samenvatten. Copilot is beschikbaar via 50 tot 100 licenties, maar wordt uitsluitend ingezet voor persoonlijke productiviteit — individuele medewerkers die er af en toe iets mee doen, zonder procesmatige sturing. Jonas, de AI-assistent in AFAS, is niet actief ingezet. Van ORTEC is onduidelijk welke ML-modules actief zijn in de huidige licentie.

Er is één duidelijke uitzondering: het BI- en data-team. Dit team beschikt over een data science analyst en een information analyst die al actief bezig zijn met AI-toepassingen op data. Zij vormen de meest AI-rijpe groep binnen de organisatie.

Daarnaast zijn er structurele aandachtspunten. Er is sprake van een eilandcultuur waarbij teams in silo's werken en weinig cross-functionele datadeling plaatsvindt. Er is geen formeel data governance programma of master data management. De lopende procesoptimalisatie-inspanningen creëren veranderbereidheid, maar vragen tegelijkertijd capaciteit die ook voor AI-activatie nodig zou zijn.

---

## 3. Cross-System Inzichten

De waarde van een tech scan die het hele landschap tegelijk bekijkt zit niet in de bevindingen per tool — die staan in de appendix. De waarde zit in de patronen die je alleen ziet als je dwars door het landschap heen kijkt.

### 3.1 De activatiekloof

Het meest opvallende patroon is de kloof tussen wat beschikbaar is en wat geactiveerd is. Zes van de negen onderzochte applicaties scoren hoog op AI-volwassenheid. Elke grote leverancier in het landschap — AFAS, Microsoft, HubSpot — heeft het afgelopen jaar fors geïnvesteerd in AI. De mogelijkheden zitten in de tools. Ze staan alleen niet aan.

De oorzaken zijn navolgbaar: het team van Application engineers was bezig met stabilisatie, er was geen eigenaarschap over AI-activatie, en de kennis over wat beschikbaar is ontbrak. Maar het is ook goed nieuws. Er hoeft weinig gekocht te worden. Er hoeft weinig gebouwd te worden. Er moet geactiveerd en begeleid worden.

### 3.2 De datakwaliteit als randvoorwaarde

AI werkt op data. Als de data niet klopt, levert AI onbetrouwbare resultaten — of erger, resultaten die er betrouwbaar uitzien maar het niet zijn.

Bij Asito zijn er signalen van structurele datafricties, met name in de driehoek AFAS-ORTEC-Appreo. Uren die in het ene systeem worden ingevoerd komen niet altijd consistent door in het andere. Contractgegevens die in AFAS staan zijn niet altijd zichtbaar voor planners in ORTEC. Dit zijn bekende pijnpunten in de organisatie.

Datakwaliteit is geen AI-project. Het is een randvoorwaarde voor elk AI-project. Het BI- en data-team ziet dit probleem, maar heeft een beperkt mandaat om het organisatiebreed aan te pakken. Zonder formeel data-eigenaarschap per domein blijft dit een structurele kwetsbaarheid.

### 3.3 Het Microsoft-ecosysteem als versneller

Microsoft is de rode draad in Asito's landschap. Dynamics 365, Power BI, Fabric, Excel, Teams — allemaal Copilot-enabled. Dit biedt een unieke kans: één AI-assistent (Copilot) die dwars door meerdere applicaties heen werkt, met dezelfde interface en hetzelfde bedieningsconcept.

Daar komt bij dat InSpark een Azure AI Foundry sandbox aan het opzetten is. Dit is de basis voor custom AI-toepassingen op Asito's eigen data — modellen die verder gaan dan wat de standaard-Copilot kan.

Op dit moment wordt Copilot echter alleen voor persoonlijke productiviteit ingezet. De stap van individueel gebruik naar procesgerichte inzet is de grootste kans binnen het Microsoft-ecosysteem.

### 3.4 AFAS en ORTEC: de operationele ruggengraat

AFAS en ORTEC vormen samen de kern van Asito's operatie. AFAS is het hub-systeem voor finance, HR, en payroll. ORTEC is de scheduling engine die duizenden schoonmakers over honderden locaties plant. Samen bedienen ze de ketenprocessen Order-to-Service en Service-to-Cash — het hart van wat Asito doet.

Beide systemen hebben significante AI-mogelijkheden. AFAS heeft Jonas met speech-to-text, documentanalyse, en workflow-automatisering. ORTEC heeft een ML-gebaseerde optimalisatie-engine voor forecasting, planning, en vervanging bij uitval.

Maar de integratie tussen beide systemen is fragiel. Data stroomt via koppelingen die na de go-live nog worden verfijnd. Appreo fungeert als derde systeem in deze driehoek — het levert cruciale operationele data (uren, werkorders) maar heeft zelf geen AI-mogelijkheden. De waarde van Appreo voor AI zit volledig in de betrouwbaarheid waarmee het data doorstuurt naar AFAS en Power BI.

### 3.5 Twee open punten

Er zijn twee strategische beslissingen die invloed hebben op welke AI-investeringen zinvol zijn.

De eerste is de endstate-positie van HubSpot. HubSpot beschikt met Breeze over een van de meest uitgebreide AI-ecosystemen in het landschap. Maar als HubSpot wordt uitgefaseerd ten gunste van Dynamics 365, is elke investering in Breeze weggegooid. Zolang deze keuze niet gemaakt is, adviseren wij geen AI-activiteiten in het marketingdomein.

De tweede is het ontbreken van een duidelijk systeem voor het ketenproces Oplossen en Verbeteren. Zonder service desk tool is er geen systeem waarop AI-toepassingen als incident triage of kennisbankautomatisering kunnen landen.

---

## 4. Wat zit er in je gereedschapskist?

Dit hoofdstuk geeft een overzicht van alle negen onderzochte applicaties: hun AI-volwassenheid, het kernverhaal, en de status bij Asito. De volledige uitwerking per tool — met features, beperkingen, concrete voorbeelden, en openstaande vragen — staat in Appendix B.

### 4.1 Overzichtstabel

| Applicatie | AI Maturity | AI-assistent | Kernverhaal | Status bij Asito |
|---|---|---|---|---|
| AFAS ERP | High | Jonas | Rijke AI ingebouwd: OCR, speech-to-text, documentanalyse, workflow-automatisering. Gratis inbegrepen. | Beschikbaar, niet geactiveerd |
| AFAS HR | High | Jonas | Zelfde platform, HR-specifiek: CV-screening, CAO-analyse, dossiersamenvatting, medewerkersvragen. | Beschikbaar, niet geactiveerd |
| ORTEC | Medium | TESSA | ML-kern voor scheduling en forecasting. Sterke optimalisatie, geen generatieve AI. | Intensief in gebruik, AI-modules onbekend |
| Dynamics 365 | High | Copilot | Sales-productiviteit: samenvatting, e-mail, meeting prep, lead scoring. | Live, Copilot beperkt ingezet |
| Power BI / Fabric | High | Copilot | Natuurlijke-taalvragen op data. Fabric als strategisch dataplatform. | BI-team al actief met AI |
| Excel | High | Copilot | Laagste instapdrempel: formules, analyse, opschoning in natuurlijke taal. | 50-100 licenties, persoonlijk gebruik |
| HubSpot | High | Breeze | Meest uitgebreide AI-ecosysteem in de set. Relevantie hangt af van endstate-keuze. | Open punt |
| Ubeeo | Medium | Via partners | AI via In2Dialog (interviewanalyse) en WCC (matching). Niet native. | Partnercontracten: status onbekend |
| Appreo | Low | Geen | Geen AI-mogelijkheden. Waarde als betrouwbare databron, niet als AI-platform. | Actief, focus op datakwaliteit |

### 4.2 Wat valt op?

**Leveranciers investeren volop — Asito hoeft niet te wachten.** Zes van de negen tools hebben een actieve AI-roadmap. AFAS brengt Profit 8 uit in juni 2026 met AI in alle workflows. Microsoft breidt Copilot continu uit met agents en diepere integraties. HubSpot positioneert Breeze als strategische pijler. De leveranciers bewegen snel. De vraag is niet of AI in deze tools komt, maar of Asito er klaar voor is wanneer het er is.

**Jonas en Copilot: twee AI-assistenten, nul structurele activatie.** De twee meest directe kansen — Jonas in AFAS en Copilot in het Microsoft-ecosysteem — zijn allebei beschikbaar en allebei niet structureel ingezet. Dit zijn geen tools die geïmplementeerd moeten worden. Ze staan klaar. Jonas is inbegrepen in de AFAS-licentie (fair-use model). Copilot-licenties zijn er al voor 50 tot 100 gebruikers.

**ORTEC is een black box.** ORTEC is het meest operationeel kritische systeem in het landschap, maar het is onduidelijk welke AI- en ML-modules actief zijn. De ML-engine is structureel — het ís de kern van de scheduling-optimalisatie — maar de specifieke features die beschikbaar zijn in Asito's licentie moeten geïnventariseerd worden.

**Appreo levert data, geen intelligentie.** Appreo heeft geen AI en zal dat op basis van de huidige roadmap waarschijnlijk niet krijgen. Dat is geen probleem, maar het betekent dat de AI-waarde van Appreo-data (uren, werkorders, locaties) pas zichtbaar wordt als die data betrouwbaar doorstroomt naar systemen die er wél intelligentie aan kunnen toevoegen — met name AFAS en Power BI.

### 4.3 Waar gaan de leveranciers naartoe?

Een tech scan is niet alleen een snapshot van vandaag, maar ook een vooruitblik. Dit is wat de belangrijkste leveranciers op de roadmap hebben.

AFAS bereidt Profit 8 voor, gepland voor juni 2026. Dit wordt een significante stap: Jonas wordt beschikbaar in alle workflows, er komt CV-parsing en AI talent matching, en het Jonas Insights Dashboard biedt gebruiksanalyse en prompt-optimalisatie. Wie nu begint met Jonas in de huidige versie, is voorbereid op wat komt.

Microsoft evolueert Copilot van assistent naar agent. Copilot Studio maakt het mogelijk om custom agents te bouwen op eigen data. Azure AI Foundry — waar InSpark nu de sandbox voor bouwt — wordt de basis voor geavanceerde AI-toepassingen die verder gaan dan de standaard Copilot-functionaliteit.

ORTEC investeert in verdieping van de ML-engine: nauwkeurigere forecasting, meer zelflerend. Er is geen GenAI-roadmap bekend — geen conversationele interface, geen content-generatie. ORTEC's kracht blijft mathematische optimalisatie, en dat is precies wat Asito's planning nodig heeft.

HubSpot gaat all-in op AI met Breeze. Maar zoals eerder benoemd: de relevantie voor Asito hangt volledig af van de strategische endstate-keuze.

Ubeeo en Appreo hebben geen significante eigen AI-roadmap. Bij Ubeeo komt de AI-waarde van het partner-ecosysteem (In2Dialog, WCC, Textmetrics). Bij Appreo moet de waarde van buiten komen, via integraties met AFAS en Power BI.

---

## 5. Hoe ziet dat er concreet uit?

De voorgaande hoofdstukken beschrijven wat er in de gereedschapskist zit. Dit hoofdstuk geeft een beknopt overzicht van hoe die mogelijkheden er in de praktijk uitzien. In Appendix D staan concrete scenario's uit de dagelijkse praktijk ter inspiratie.

### Drie niveaus van AI-inzet

Het benutten van AI in de bestaande applicaties heeft drie niveaus die elk een andere aanpak vragen.

**Niveau 1 — Activeren voor eindgebruikers.** De ingebouwde AI-assistenten (Jonas, Copilot, Breeze) beschikbaar maken zodat eindgebruikers ze direct kunnen gebruiken voor hun eigen taken. Denk aan speech-to-text voor voormannen, Excel-analyses via Copilot, of antwoordsuggesties in HR-workflows. Dit niveau vereist vooral een activatiehandeling en basale begeleiding.

**Niveau 2 — Inrichten door Application engineers.** De Application engineers configureren workflows, templates en prompts die de AI-assistenten effectiever maken voor specifieke bedrijfsprocessen. Denk aan het opzetten van Jonas-templates voor inspectieverslagen, het configureren van Copilot-agents voor terugkerende rapportages, of het inrichten van geautomatiseerde HR-workflows. Dit niveau vereist een dieper begrip van zowel de applicatie als het bedrijfsproces.

**Niveau 3 — Bouwen van maatwerk.** Het ontwikkelen van semi-custom AI-functionaliteit binnen of bovenop de bestaande applicaties. Denk aan custom agents in Copilot Studio, geavanceerde data science modellen in Fabric, of specifieke automatiseringen via Azure AI Foundry. Dit niveau vereist specialistische kennis en is een logische vervolgstap nadat niveau 1 en 2 goed zijn ingericht.

### Waar liggen de kansen?

De meeste directe waarde zit in niveau 1 en 2. Voor Asito betekent dit concreet:

In de **operatie** (Order-to-Service, Service-to-Cash): voormannen die inspectiebevindingen inspreken via Jonas in de AFAS Pocket app, planners die slimmer vervangingen regelen via ORTEC's ML-engine, en financieel medewerkers die afwijkingen in nacalculaties detecteren via Excel Copilot.

In **HR** (Hire-to-Retire): recruiters die met Jonas CV's voorscreenen bij circa 150 wervingen per maand, HR-medewerkers die antwoordsuggesties krijgen op medewerkersvragen op basis van de CAO, en gespreksanalyses na interviews via In2Dialog.

In **sales en klantbeheer** (Lead-to-Order): klantmanagers die via Copilot in Dynamics 365 accountsamenvattingen en meeting prep krijgen, en het BI-team dat via Copilot in Power BI natuurlijke-taalvragen op dashboards stelt.

Elk van deze voorbeelden werkt op bestaande tools en vereist geen nieuw systeem. De uitgewerkte scenario's met voor-en-na-situaties staan in Appendix D.

---

## 6. Aanbevolen vervolgstappen en randvoorwaarden

### 6.1 Drie vervolgstappen

We noemen deze stappen bewust geen pilots. Het zijn activatiehandelingen en inventarisaties die Asito kan doen binnen de bestaande applicaties, met bestaande licenties, zonder architectuurwijzigingen. Bij elke stap zijn we eerlijk over wat eenvoudig is en wat meer vraagt.

Zoals beschreven in hoofdstuk 5 kent het benutten van AI drie niveaus: activeren voor eindgebruikers, inrichten door Application engineers, en bouwen van maatwerk. De onderstaande stappen richten zich primair op de eerste twee niveaus.

**Stap 1: Jonas activeren in AFAS (ERP en HR)**

De AFAS Application engineer activeert Jonas per omgeving. Dit is een configuratiehandeling, geen implementatieproject. Er zijn geen extra kosten aan verbonden — Jonas werkt op een fair-use model en is inbegrepen in de bestaande licentie.

Wat het oplevert op niveau 1 (activeren): de organisatie maakt voor het eerst kennis met AI in een vertrouwde omgeving. Medewerkers zien concreet wat AI doet — niet in een demo, maar in hun eigen werkproces. Speech-to-text voor voormannen, receipt OCR voor bonnetjes, en automatische antwoordsuggesties voor HR-medewerkers worden direct beschikbaar.

Wat het vraagt op niveau 2 (inrichten): de initiële outputs van Jonas zijn generiek. De Application engineers moeten het systeem afstemmen op Asito's specifieke werkwijze via templates en promptconfiguratie. Dat is een iteratief proces. Reken op weken, niet dagen, voordat de resultaten echt goed aansluiten bij de dagelijkse praktijk.

**Stap 2: Copilot-gebruik inventariseren en richting geven**

Er zijn 50 tot 100 Copilot-licenties beschikbaar die momenteel voor persoonlijke productiviteit worden gebruikt. De eerste stap is inventariseren: wie heeft een licentie, hoe wordt die gebruikt, en waar zit de meeste productiviteitswinst? Vervolgens: gerichte adoptie-begeleiding voor specifieke taken (Excel-analyses, Power BI-rapportage, e-mailgeneratie in Dynamics).

Wat het oplevert op niveau 1 (activeren): de transitie van "Copilot als iets dat je af en toe uitprobeert" naar "Copilot als werkgereedschap voor specifieke taken."

Wat het vraagt op niveau 2 (inrichten): Excel Copilot vereist dat bestanden op OneDrive of SharePoint staan. Als de organisatie nog veel op netwerkschijven werkt, is dit een migratie-afhankelijkheid die niet onderschat moet worden. Daarnaast kunnen de Application engineers Copilot-agents configureren voor terugkerende taken — maar dat vraagt een dieper begrip van de mogelijkheden.

**Stap 3: ORTEC AI/ML-modules inventariseren**

In overleg met de ORTEC-accountmanager vaststellen welke ML-features in de huidige licentie beschikbaar zijn en wat er actief is. Denk aan demand forecasting, smart replacement, en constraint-based optimization.

Wat het oplevert: duidelijkheid. Als modules beschikbaar zijn, biedt dat directe planning-optimalisatie. Als ze extra kosten, is dat een investeringsbeslissing die onderbouwd genomen kan worden.

Eerlijk over: ORTEC's ML is geen knop die je aanzet. Het vereist historische data van voldoende kwaliteit en volume om goed te functioneren. Als de data uit het eerste jaar na go-live nog inconsistent is — en daar zijn signalen van — kan de ML niet betrouwbaar trainen. Dit is een realistisch risico dat in de inventarisatie moet worden meegenomen.

### 6.2 Randvoorwaarden

De drie vervolgstappen hierboven zijn uitvoerbaar. Maar er zijn vijf randvoorwaarden die bepalen hoe succesvol ze worden — en die gelden voor élk AI-initiatief dat hierna komt.

**Data-eigenaarschap als startpunt.** De belangrijkste randvoorwaarde is niet technisch maar organisatorisch: wie is verantwoordelijk voor de kwaliteit van kerndata? Medewerkerdata, contractdata, urendata — dit zijn de basisingrediënten voor elke AI-toepassing. Zonder duidelijk eigenaarschap levert AI onbetrouwbare resultaten. Dit hoeft geen volledig data governance programma te zijn. Begin met het benoemen van data-eigenaren per domein.

**Integratiestabiliteit AFAS-ORTEC-Appreo.** De driehoek AFAS-ORTEC-Appreo is de ruggengraat van de operatie. Als data tussen deze systemen niet betrouwbaar synchroniseert, faalt elke AI die op deze data leunt. De lopende procesoptimalisatie-inspanningen raken dit punt al. Het is zaak dat integratiestabiliteit expliciet als randvoorwaarde wordt meegenomen in die trajecten.

**Capaciteit Application engineers.** Het team van Application engineers is volledig bezet met post-go-live stabilisatie. AI-activatie — zeker voor Jonas en ORTEC-modules — vereist betrokkenheid van dit team. Dit is realistisch gezien een keuze: ofwel extern ondersteunen, ofwel prioriteren ten koste van andere zaken. Beide opties zijn valide, maar de keuze moet bewust gemaakt worden.

**Adoptie-aanpak passend bij de doelgroep.** Asito's eindgebruikers — voormannen, schoonmakers, projectleiders — zijn praktijkmensen. AI-tools die niet hands-on, taakgericht, en in hun eigen werkomgeving worden geïntroduceerd, worden niet gebruikt. Een e-learning over "wat is AI" werkt niet. Een collega die laat zien "kijk, als je dit intypt, krijg je dit" werkt wel.

**Strategische keuzes die invloed hebben op de roadmap.** Twee beslissingen beïnvloeden welke AI-investeringen zinvol zijn: de endstate-positie van HubSpot en de keuze voor een service desk tool. Zolang deze keuzes open staan, adviseren wij geen AI-investeringen in die domeinen.

---

## Appendix A: AI Maturity Scoring — Methodiek

Elke applicatie in dit onderzoek is beoordeeld op drie criteria.

**Branded AI-assistent.** Heeft de leverancier een herkenbare, benoemde AI-assistent in het product geïntegreerd? Voorbeelden: Jonas (AFAS), Copilot (Microsoft), Breeze (HubSpot), TESSA (ORTEC). Een branded assistent is een signaal dat de leverancier AI niet als experiment maar als productpijler beschouwt.

**GenAI-diepte.** Hoe diep gaan de generatieve AI-mogelijkheden? Kan het systeem tekst genereren, documenten analyseren, patronen herkennen? Of beperkt de AI zich tot rule-based automatisering of klassieke ML? Hoe meer GenAI-functies beschikbaar zijn in de dagelijkse workflows, hoe hoger de score.

**Actieve AI-roadmap.** Investeert de leverancier zichtbaar en actief in AI? Zijn er concrete aankondigingen, bèta-programma's, en nieuwe releases gepland? Een actieve roadmap geeft vertrouwen dat de huidige AI-mogelijkheden een begin zijn, niet een eindpunt.

Op basis van deze drie criteria hebben we elke tool een score gegeven: High, Medium, of Low.

High betekent dat de leverancier uitgebreide AI-mogelijkheden biedt met een actieve roadmap. Het betekent niet dat het al werkt bij Asito — het betekent dat de mogelijkheden er zijn en geactiveerd kunnen worden.

Medium betekent dat er AI-elementen zijn (vaak ML-gebaseerd of via partners), maar dat de breedte of diepte beperkt is vergeleken met de High-categorie.

Low betekent dat er geen significante AI-mogelijkheden zijn en dat de roadmap geen verandering daarin suggereert.

---

## Appendix B: Per-applicatie analyse

### B.1 AFAS ERP — Jonas

**AI Maturity: High**

**Wat zit erin.** Jonas is de AI-assistent van AFAS, live sinds november 2024, inmiddels in gebruik bij meer dan 1.000 organisaties. De mogelijkheden omvatten Smart Workflow Reactions (tekst genereren, samenvatten, herschrijven binnen workflows), speech-to-text (audio opnemen via de Pocket app of Apple Watch met automatische transcriptie), receipt OCR (foto maken van een bonnetje, automatisch datum, omschrijving en bedrag extraheren), document-aware analyse (Jonas leest bijgevoegde documenten zoals contracten en CAO's en vat ze samen), AI task templates (gestandaardiseerde prompt-templates die via een sneltoets beschikbaar zijn), en bank statement ML matching (het systeem leert van correcties om steeds betere boekingsvoorstellen te doen).

**Wat komt eraan.** AFAS bereidt Profit 8 voor (gepland juni 2026) met CV-parsing, AI talent matching, en Jonas in alle workflows. Het Jonas Insights Dashboard biedt straks gebruiksanalyse en optimalisatie van prompts. De template-bibliotheek groeit via de AFAS-community.

**Wat betekent dat voor Asito.** Een projectleider maakt een werkverslag door zijn bevindingen in te spreken — Jonas maakt er een gestructureerd rapport van. Een financieel medewerker uploadt een factuur — Jonas vergelijkt met contractvoorwaarden en markeert afwijkingen. Bij de maandafsluiting suggereert het systeem boekingsmatches op basis van eerder gedrag.

**Beperkingen.** Jonas is geen chatbot — het werkt in gestructureerde workflows, niet als vrije vraag-en-antwoord interface. Alle outputs vereisen menselijke verificatie. Geavanceerde templates moeten door de Application engineers worden geconfigureerd. Jonas kan geen externe data ophalen buiten het AFAS-ecosysteem.

**Status bij Asito.** Jonas is beschikbaar maar niet actief ingezet. Activatie vereist een handeling door de AFAS Application engineer per omgeving.

**Openstaande vragen.** Is er een AFAS Application engineer aangewezen die de activatie kan uitvoeren? Welke workflows hebben de hoogste prioriteit voor Jonas-inzet? Zijn er specifieke templates of prompts die vanuit de AFAS-community relevant zijn voor de schoonmaaksector?

### B.2 AFAS HR — Jonas

**AI Maturity: High**

**Wat zit erin.** Jonas voor HR-workflows: automatisch antwoorden voorstellen op medewerkersvragen, CV-screening met extractie van kerngegevens, dossiersamenvatting in seconden, speech-to-text voor gespreksverslagen bij beoordelings- en functioneringsgesprekken, en CAO-documentanalyse waarbij Jonas vragen beantwoordt over voorwaarden op basis van het opgeladen document.

**Wat komt eraan.** Profit 8 brengt diepere integratie van Jonas in HR-workflows, AI talent matching, en meer geautomatiseerde HR-processen waaronder onboarding flows en documentvalidatie.

**Wat betekent dat voor Asito.** Een HR-medewerker ontvangt een vraag over verlof — Jonas stelt een antwoord voor op basis van de CAO en het personeelsdossier, de medewerker reviewt en verstuurt. Bij circa 150 wervingen per maand kan Jonas CV's voorscreenen en kerngegevens extraheren, waardoor de recruiter alleen de shortlist hoeft te beoordelen. Bewezen resultaat elders: circa 6 uur per maand besparing per HR-team (referentie: Zorggroep Sint Maarten).

**Beperkingen.** Zelfde als AFAS ERP: gestructureerde workflows, geen vrije chatinterface. CV-screening vereist dat documenten in het juiste format worden aangeleverd. De kwaliteit van antwoordsuggesties hangt af van de volledigheid van het CAO-document en het personeelsdossier.

**Status bij Asito.** Beschikbaar, niet geactiveerd. Zelfde activatiehandeling als bij AFAS ERP.

**Openstaande vragen.** Hoeveel medewerkersvragen per maand verwerkt het HR-team handmatig? Welke CAO-documenten zijn digitaal beschikbaar voor upload? Is er een specifieke HR-workflow die als eerste baat zou hebben bij Jonas?

### B.3 ORTEC Workforce Scheduling

**AI Maturity: Medium**

**Wat zit erin.** ORTEC's AI is structureel — het ís de kern van het product, geen toevoeging erop. De ML-gebaseerde scheduling engine omvat demand forecasting (voorspelling van personeelsbehoefte op basis van historische data), schedule optimization (balancering van arbeidswetgeving, CAO-regels, kwalificaties, voorkeuren, reistijden, en contracturen in één run voor duizenden medewerkers), smart replacement (bij uitval automatisch de beste vervanger voorstellen op basis van kwalificatie, beschikbaarheid en nabijheid), TESSA als self-service portaal voor medewerkers, en constraint-based optimization die rekening houdt met contractuele afspraken.

**Wat komt eraan.** ORTEC investeert in verdieping van de ML: nauwkeurigere forecasting en meer zelflerend gedrag. TESSA wordt uitgebreid als medewerkerportaal. Er is geen GenAI-roadmap bekend — geen conversationele interface, geen content-generatie. ORTEC's kracht is en blijft mathematische optimalisatie.

**Wat betekent dat voor Asito.** Bij een ziekmelding krijgt de planner direct een top-3 vervangers op basis van beschikbaarheid, certificering en reistijd — in plaats van handmatig bellen en zoeken. Het systeem signaleert proactief wanneer een planning conflicteert met contractuele afspraken. Demand forecasting voorspelt personeelsbehoefte per locatie.

**Beperkingen.** ORTEC biedt geen generatieve AI, geen chatbot, en geen HR-functionaliteit. Geavanceerde optimalisatie vereist configuratieworkshops. De ML-engine heeft historische data van voldoende kwaliteit nodig om betrouwbaar te functioneren.

**Status bij Asito.** ORTEC wordt intensief gebruikt voor roosterplanning. Het is onduidelijk welke AI/ML-modules actief zijn in de huidige licentie. Een inventarisatie met de ORTEC-accountmanager is noodzakelijk.

**Openstaande vragen.** Welke ORTEC-modules zijn beschikbaar in de huidige licentie? Zijn demand forecasting en smart replacement actief? Wat is de kwaliteit van de historische planningsdata na het eerste jaar post-go-live? Is TESSA als self-service portaal uitgerold naar medewerkers?

### B.4 Microsoft Dynamics 365 CRM — Copilot

**AI Maturity: High**

**Wat zit erin.** Copilot voor Sales biedt lead scoring, samenvatting van opportunities, e-mail drafting op basis van CRM-data, automatische meeting preparation met account-historie en gespreksonderwerpen, conversation intelligence voor gespreksanalyse en actie-extractie, en Copilot agents voor autonome taken als follow-up reminders en data-opschoning.

**Wat komt eraan.** Microsoft investeert in Copilot agents — autonome workflows die zelfstandig taken uitvoeren. Copilot Studio maakt custom agents mogelijk op Dynamics-data. De integratie met Teams en Outlook wordt steeds dieper.

**Wat betekent dat voor Asito.** Een klantmanager opent een account en ziet direct een samenvatting van recente interacties, openstaande offertes, en suggesties voor het volgende gesprek. Na een klantbezoek dicteert de klantmanager notities en Copilot maakt een gestructureerd gespreksverslag met follow-up acties.

**Beperkingen.** De waarde hangt af van hoe actief Dynamics 365 wordt gebruikt door de circa 40 klantmanagers. De beste features (meeting summaries, e-mail drafts) vereisen dat Outlook en Teams ook actief worden ingezet. Data governance is cruciaal — Copilot geeft toegang tot alle data waarvoor een gebruiker rechten heeft.

**Status bij Asito.** Dynamics 365 is live. Copilot-licenties zijn beschikbaar. Het gebruik is primair als CRM, niet als AI-ondersteunde werkplek.

**Openstaande vragen.** Hoe actief gebruiken de klantmanagers Dynamics 365? Is de CRM-data schoon genoeg voor betrouwbare Copilot-suggesties? Zijn er specifieke stappen in het Lead-to-Order proces die baat hebben bij automatisering?

### B.5 Microsoft Power BI / Fabric — Copilot

**AI Maturity: High**

**Wat zit erin.** Copilot in Power BI stelt gebruikers in staat om vragen te stellen in natuurlijke taal over dashboards en datasets. Daarnaast biedt het automatische narrative generation (dashboards krijgen automatische samenvattingen), is er Fabric als unified data platform (lakehouse, data engineering, data science, en BI in één omgeving), en een semantic model dat relaties tussen data-entiteiten begrijpt.

**Wat komt eraan.** Fabric wordt Microsoft's strategische dataplatform en vervangt losse producten. Er komen Copilot agents op data voor autonome monitoring en alerting, en er is directe integratie met Azure AI Foundry voor custom modellen op eigen data.

**Wat betekent dat voor Asito.** Een manager vraagt "wat waren de marges per regio vorige maand?" en krijgt direct een antwoord in tekst en grafiek. Het BI-team bouwt een dataset in Fabric en iedereen met toegang kan er vragen aan stellen via Copilot. Het BI- en data-team is al actief met AI en data science — dit team kan als voortrekker fungeren.

**Beperkingen.** De kwaliteit van Copilot-antwoorden hangt sterk af van de voorbereiding van het semantic model (naamgeving, beschrijvingen, relaties). Het bouwen van een unified model op AFAS- en ORTEC-data in Fabric is niet triviaal en vereist data engineering expertise. Copilot is geen voorspellend model — voor forecasting is Fabric Data Science nodig.

**Status bij Asito.** Power BI is in gebruik. De Qlik-migratie is lopend. De Fabric-licentie en Copilot in Power BI moeten geverifieerd worden. Het BI-team is de meest AI-rijpe groep in de organisatie.

**Openstaande vragen.** Wat is de huidige Fabric-licentiesituatie? Hoe ver is de Qlik-migratie? Welke datasets zijn al beschikbaar in het dataplatform? Heeft het BI-team behoefte aan Copilot of werken ze liever direct met data science tooling?

### B.6 Microsoft Excel — Copilot

**AI Maturity: High**

**Wat zit erin.** Copilot in Excel genereert formules in natuurlijke taal, schoont data op, en herkent patronen. Agent Mode (preview) voert meerdere stappen uit op data: filteren, berekenen, en visualiseren in één opdracht. Python in Excel (preview) maakt geavanceerde analyses direct in het spreadsheet mogelijk. Copilot identificeert trends en uitschieters in datasets.

**Wat komt eraan.** Agent Mode wordt stabieler en breder beschikbaar. Python in Excel wordt mainstream. Copilot wordt steeds beter in complexe, meerstaps-analyses.

**Wat betekent dat voor Asito.** Een financieel medewerker heeft een export uit AFAS en vraagt Copilot "toon alle posten waar nacalculatie meer dan 10% afwijkt van voorcalculatie" — en krijgt direct het antwoord. Een HR-medewerker krijgt verloopcijfers en vraagt "wat zijn de trends per regio?" — en krijgt een visualisatie. Excel Copilot heeft de laagste instapdrempel van alle AI-tools in het landschap.

**Beperkingen.** Excel Copilot werkt alleen op bestanden in OneDrive of SharePoint. Bestanden op netwerkschijven worden niet ondersteund. Dit is een bekende adoptiedrempel. De kwaliteit van de output hangt af van de structuur van de data — rommelige exports leveren rommelige resultaten.

**Status bij Asito.** 50 tot 100 Copilot-licenties zijn beschikbaar. Ze worden ingezet voor persoonlijke productiviteit, niet procesmatig.

**Openstaande vragen.** Hoeveel medewerkers werken al met bestanden op OneDrive/SharePoint versus netwerkschijven? Welke financiële of operationele analyses kosten nu de meeste handmatige tijd? Is er een team dat als eerste baat zou hebben bij gerichte Copilot-adoptie?

### B.7 HubSpot — Breeze

**AI Maturity: High**

**Wat zit erin.** Breeze is het AI-ecosysteem van HubSpot, opgebouwd in drie lagen. Breeze Copilot is een assistent in de interface voor schrijven, samenvatten, en onderzoek. Breeze Agents zijn autonome "teammates" voor content, prospecting, klantenservice, en personalisatie. Breeze Intelligence biedt data verrijking, buyer intent signalen, en formulier-optimalisatie. Daarnaast is er Content Hub AI voor het genereren van blogartikelen, social media posts, en landingspagina's.

**Wat komt eraan.** HubSpot investeert agressief in AI. Breeze Studio maakt het mogelijk om custom AI-agents te bouwen zonder code. De positionering is "AI-CRM" — AI niet als feature maar als kern van het product.

**Wat betekent dat voor Asito.** Breeze is technisch het meest uitgebreide AI-ecosysteem in de onderzochte set. Maar de relevantie hangt volledig af van de strategische beslissing over HubSpot's endstate-positie. Als HubSpot in het eindplaatje blijft, biedt Breeze significante marketing-automatisering. Als HubSpot wordt uitgefaseerd, is investering in Breeze niet zinvol.

**Beperkingen.** De meeste AI-features zijn beperkt tot Professional of Enterprise abonnementen. De kosten stijgen significant naarmate de contactenlijst groeit. HubSpot is een marketing- en salesplatform, niet geschikt voor operationele aansturing.

**Status bij Asito.** Open punt. De endstate-positie moet strategisch bepaald worden.

**Openstaande vragen.** Blijft HubSpot in het eindplaatje of gaat alles naar Dynamics 365? Welk HubSpot-abonnement is actief (Starter/Professional/Enterprise)? Worden de marketing-activiteiten die nu in HubSpot zitten ook in Dynamics uitgevoerd?

### B.8 Ubeeo ATS

**AI Maturity: Medium (via partners)**

**Wat zit erin.** Ubeeo heeft beperkte native AI — de kracht zit in het partner-ecosysteem. In2Dialog biedt interview-opname met automatische transcriptie en psychologische profilering. WCC ELISE levert semantische kandidaat-matching op basis van context en synoniemen. Textmetrics optimaliseert vacatureteksten voor inclusiviteit en SEO. De native functionaliteit omvat generatieve content voor vacatureteksten en gewogen scoring voor automatische pre-screening.

**Wat komt eraan.** Ubeeo leunt op het partner-ecosysteem voor AI-innovatie. Er is geen bekende eigen GenAI-roadmap.

**Wat betekent dat voor Asito.** Bij gebruik van In2Dialog kan een recruiter na een interview direct een AI-analyse zien van het gesprek, met een besparing van circa 30 minuten handmatige evaluatie per interview. Bij circa 150 wervingen per maand is de cumulatieve besparing significant.

**Beperkingen.** De afhankelijkheid van partners is een risico — als partnerschappen eindigen, verdwijnt de functionaliteit. Interview-opname via In2Dialog vereist strikte toestemmings- en privacyprocedures (AVG). Er is geen "chat met je data" mogelijkheid en geen voorspellende analytics.

**Status bij Asito.** Ubeeo is in gebruik voor recruitment. De status van partnerintegraties (In2Dialog, WCC) is onbekend.

**Openstaande vragen.** Welke partnerintegraties zijn actief in het huidige Ubeeo-contract? Is In2Dialog beschikbaar en wordt het gebruikt? Hoe is de AFAS-integratie ingericht voor de overgang van kandidaat naar medewerker?

### B.9 Appreo

**AI Maturity: Low (geen AI)**

**Wat zit erin.** Appreo heeft geen AI-mogelijkheden. Alle automatisering is rule-based. Het platform biedt 14 Plan Accelerators als slimme planning-helpers, maar deze zijn gebaseerd op deterministische regels, niet op ML of AI. Appreo heeft een sterke bidirectionele integratie met AFAS voor looncomponenten en biedt digitale werkorders, urenregistratie, en GPS-tracking.

**Wat komt eraan.** Er is geen bekende AI-roadmap. Appreo is niet gepositioneerd als AI-platform. Updates verschijnen elke drie weken, met focus op functionaliteit en gebruikservaring.

**Wat betekent dat voor Asito.** Appreo levert cruciale operationele data: uren, werkorders, en locatie-informatie. AI-waarde zit niet in Appreo zelf maar in wat er met Appreo-data gebeurt in andere systemen. De strategie voor Appreo is helder: het moet een betrouwbare databron zijn, niet een AI-platform.

**Beperkingen.** Geen AI van welke aard dan ook. Geen voorspellende analytics, geen conversationele interface, geen content-generatie. De waarde voor AI-initiatieven hangt af van de betrouwbaarheid van de data-integratie met AFAS en ORTEC.

**Status bij Asito.** Actief in gebruik voor specialistisch en periodiek schoonmaak. Geen AI-activatie mogelijk. Focus moet liggen op datakwaliteit en integratiestabiliteit.

**Openstaande vragen.** Hoe betrouwbaar is de bidirectionele sync met AFAS? Zijn er bekende datakwaliteitsproblemen in de uren- of werkorderregistratie? Worden de Plan Accelerators volledig benut?

---

## Appendix C: Integratiearchitectuur

De onderstaande tabel beschrijft de bevestigde dataflows tussen de kernsystemen in Asito's applicatielandschap.

| Bron | Doel | Data |
|------|------|------|
| Dynamics 365 | GRIP | Klanten, contactpersonen, objecten |
| Dynamics 365 | AFAS | Klanten, contactpersonen, debiteurennummers |
| GRIP | AFAS | Projecten, voorcalculatieregels, facturen |
| AFAS | GRIP | Medewerkers, referentiedata |
| AFAS | ORTEC | Medewerkers, verlofsaldi, ziek- en betetermeldingen, projecten, voorcalculatieregels |
| ORTEC | AFAS | Nacalculatieregels, verlofboekingen |
| AFAS | Appreo | Medewerkers, verlofsaldi, ziek- en betetermeldingen, projecten, voorcalculatieregels |
| Appreo | AFAS | Nacalculatieregels (inclusief bijlage), verlofboekingen |
| Appreo | ORTEC | Kloktijden |
| Werken Bij | ATS (Ubeeo) | Sollicitaties |
| ATS (Ubeeo) | Werken Bij | Gepubliceerde vacatures |
| ATS (Ubeeo) | AFAS | Nieuwe medewerkers |
| AFAS | ATS (Ubeeo) | Medewerkers, autorisaties, kostenplaatsen, objectnummers, klantlocaties |

---

## Appendix D: Praktijkscenario's ter inspiratie

De onderstaande scenario's illustreren hoe de AI-mogelijkheden uit dit rapport er in de dagelijkse praktijk van Asito uit kunnen zien. Elk scenario werkt op een bestaande tool en vereist geen nieuw systeem.

### D.1 De voorman die inspreekt (Jonas, AFAS)

**Nu:** Een voorman doet een inspectie op locatie. Na afloop rijdt hij terug naar kantoor, zit achter een bureau, en typt een verslag. Dat kost tijd, de verslagen zijn wisselend van kwaliteit, en regelmatig worden ze uitgesteld of helemaal niet gemaakt.

**Met Jonas:** De voorman spreekt zijn bevindingen in via de AFAS Pocket app terwijl hij nog op locatie is. Jonas transcribeert de opname, structureert de informatie in de juiste velden, en voegt het toe aan het werkdossier.

**Waarom dit werkt:** Geen nieuw systeem. Geen training in een onbekende app. De voorman praat — iets wat hij al doet — en de tool die hij al gebruikt krijgt een functie erbij. Dit sluit aan bij hoe Asito's mensen werken: praktisch, in het veld, zonder bureau.

**Niveau:** Activeren (niveau 1) plus templates inrichten (niveau 2) door de Application engineer.

### D.2 De financieel medewerker die vraagt in plaats van zoekt (Copilot, Excel)

**Nu:** Een financieel medewerker ontvangt een Excel-export uit AFAS met honderden regels. Ze moet handmatig zoeken naar afwijkingen in de nacalculatie — posten die niet kloppen, bedragen die afwijken van de voorcalculatie. Dat kost uren en is foutgevoelig.

**Met Excel Copilot:** Ze typt: "markeer alle posten waar het verschil tussen nacalculatie en voorcalculatie groter is dan 10%." Copilot filtert, berekent, en markeert de afwijkingen. In seconden in plaats van uren.

**Waarom dit werkt:** De medewerker kent Excel al. De Copilot-licentie is beschikbaar. Het enige verschil: het bestand moet op OneDrive of SharePoint staan, niet op een netwerkschijf.

**Niveau:** Activeren (niveau 1). Bestandslocatie op OneDrive/SharePoint is een randvoorwaarde.

### D.3 De recruiter die sneller beoordeelt (Jonas, AFAS HR / In2Dialog, Ubeeo)

**Nu:** Bij circa 150 wervingen per maand besteedt het recruitmentteam significant veel tijd aan het handmatig doornemen van CV's en het schrijven van gespreksverslagen na interviews.

**Met Jonas en In2Dialog:** Jonas screent inkomende CV's en extraheert kerngegevens in een gestandaardiseerd format — de recruiter beoordeelt een samenvatting in plaats van elk CV volledig te lezen. Na het interview maakt In2Dialog een gestructureerde gespreksanalyse op basis van de opname.

**Waarom dit werkt:** Twee tools die al in het landschap zitten. De ene vereist activatie (Jonas in AFAS HR), de andere een verificatie van het partnercontract (In2Dialog via Ubeeo).

**Niveau:** Activeren (niveau 1) voor Jonas, plus verificatie van het In2Dialog-partnercontract.

### D.4 De klantmanager die voorbereid het gesprek ingaat (Copilot, Dynamics 365)

**Nu:** Een klantmanager bereidt een klantbezoek voor door handmatig door het CRM te bladeren: recente interacties, openstaande offertes, eerdere afspraken. Dat kost tijd en levert een onvolledig beeld.

**Met Copilot in Dynamics 365:** De klantmanager opent het account en vraagt Copilot om een samenvatting van de recente historie en suggesties voor gespreksonderwerpen. Na het bezoek dicteert hij notities en Copilot maakt een gestructureerd verslag met follow-up acties.

**Waarom dit werkt:** Dynamics 365 is al live. Copilot-licenties zijn beschikbaar. De waarde groeit naarmate het CRM actiever wordt gebruikt.

**Niveau:** Activeren (niveau 1). Meer waarde ontstaat wanneer de Application engineers Copilot-agents inrichten voor specifieke salesprocessen (niveau 2).

### D.5 De data-analist die in natuurlijke taal bevraagt (Copilot, Power BI)

**Nu:** Een manager wil weten wat de marges per regio vorige maand waren. De vraag gaat naar het BI-team, dat een rapport maakt of een bestaand dashboard aanpast. Doorlooptijd: uren tot dagen.

**Met Copilot in Power BI:** De manager opent het dashboard en typt: "wat waren de marges per regio vorige maand?" Copilot genereert het antwoord in tekst en grafiek.

**Waarom dit werkt:** Het BI-team is al de meest AI-rijpe groep. Dit team kan Copilot in Power BI als eerste adopteren en als voortrekker fungeren voor de rest van de organisatie.

**Niveau:** Activeren (niveau 1) plus het BI-team bereidt het semantic model voor op Copilot-vragen (niveau 2).

---

*Dit rapport is opgesteld door Tatoma in het kader van de Foundation Sprint voor Asito, februari 2026. De bevindingen zijn gebaseerd op desk research, leveranciersdocumentatie, en gesprekken met het IT-team van Asito. De per-applicatie analyses dienen als vertrekpunt voor verdere validatie in samenwerking met de relevante teams.*
