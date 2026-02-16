# Asito Foundation Report
## Tech Scan: AI-mogelijkheden in het applicatielandschap

*Tatoma · Februari 2026*

---

## 1. Management Summary

Asito's applicatielandschap bevat meer AI dan de organisatie gebruikt. Zes van de negen onderzochte applicaties scoren hoog op AI-volwassenheid. AFAS heeft Jonas, Microsoft biedt Copilot in Dynamics 365, Power BI en Excel, HubSpot heeft Breeze. Deze assistenten zijn beschikbaar binnen de huidige licenties, maar geen ervan is structureel geactiveerd.

De aanbeveling: begin met activatie, niet met implementatie. Drie vervolgstappen vereisen geen nieuwe systemen of architectuurwijzigingen: Jonas activeren in AFAS, het Copilot-gebruik inventariseren en richting geven, en de ORTEC AI/ML-modules in kaart brengen.

De hoofdtekst biedt het overzicht. De appendix bevat per applicatie de uitgebreide analyse.

---

## 2. De Context

### 2.1 Organisatieprofiel

Asito telt circa 8.000 schoonmakers, ongeveer 350 projectleiders, zo'n 40 klantmanagers en rond de 300 medewerkers op het hoofdkantoor. De organisatie is 24/7 actief op honderden locaties. Eindgebruikers zijn voormannen op locatie, schoonmakers met een telefoon en projectleiders die meer tijd in hun auto doorbrengen dan achter een bureau. Technologie die niet past bij die werkwijze wordt niet gebruikt.

Het personeelsverloop ligt rond de 40% per jaar, wat neerkomt op circa 150 wervingen per maand.

### 2.2 Het applicatielandschap

Per 1 januari 2025 is het grootste deel van het landschap live gegaan. AFAS fungeert als centraal hub-systeem voor ERP (finance, projecten, inkoop) en HR (personeelsbeheer, loonverwerking). Daaromheen: ORTEC voor workforce scheduling, Dynamics 365 als CRM, Appreo voor urenregistratie en werkorders in het specialistisch en periodiek segment, GRIP voor projectcalculatie.

In de ondersteunende laag: Ubeeo als ATS, de Werken Bij-website, HelloID voor identity management, Totara als LMS. Analytics via Power BI en Microsoft Fabric, met een lopende migratie vanaf Qlik.

De integratielaag draait deels op BizTalk en wordt gemigreerd naar Logic Apps. InSpark is bezig met de opzet van een Azure AI Foundry sandbox voor custom AI op Asito's eigen data. Flinker, Hubble, Jedox en Credit Manager worden uitgefaseerd. De endstate-positie van HubSpot is een open punt.

### 2.3 Waar staat Asito met AI?

Aan het begin, en dat is verklaarbaar. Het applicatielandschap is per 1 januari 2025 live gegaan en het eerste jaar stond in het teken van stabilisatie. Het applicatiebeheerteam was volledig bezet met post-go-live issues. AI-activatie stond niet bovenaan de lijst.

De huidige situatie: Copilot is beschikbaar via 50 tot 100 licenties maar wordt alleen ingezet voor persoonlijke productiviteit, zonder procesmatige sturing. Jonas (AFAS) is niet actief. Van ORTEC is onduidelijk welke ML-modules actief zijn.

Uitzondering: het BI- en data-team. Dit team is al actief met AI-toepassingen op data en vormt de meest AI-rijpe groep binnen de organisatie.

Structurele aandachtspunten: een eilandcultuur met weinig cross-functionele datadeling, geen formeel data governance programma, en de lopende procesoptimalisatie-inspanningen die zowel veranderbereidheid als capaciteitsdruk creëren.

---

## 3. Cross-System Inzichten

### 3.1 De activatiekloof

Zes van de negen applicaties scoren hoog op AI-volwassenheid. Elke grote leverancier in het landschap heeft het afgelopen jaar fors in AI geïnvesteerd. De mogelijkheden zitten in de tools. Ze staan niet aan.

De oorzaken zijn navolgbaar: het applicatiebeheerteam was bezig met stabilisatie, er was geen eigenaarschap over AI-activatie, en de kennis over wat beschikbaar is ontbrak. Er hoeft weinig gekocht of gebouwd te worden. Er moet geactiveerd en begeleid worden.

### 3.2 Datakwaliteit als randvoorwaarde

AI werkt op data. Bij Asito zijn er signalen van datafricties in de driehoek AFAS-ORTEC-Appreo. Uren die in het ene systeem worden ingevoerd komen niet altijd consistent door in het andere. Contractgegevens in AFAS zijn niet altijd zichtbaar voor planners in ORTEC.

Datakwaliteit is geen AI-project, het is een randvoorwaarde voor elk AI-project. Het BI- en data-team ziet dit probleem maar heeft een beperkt mandaat om het organisatiebreed aan te pakken.

### 3.3 Het Microsoft-ecosysteem als versneller

Microsoft is de rode draad: Dynamics 365, Power BI, Fabric, Excel, Teams, allemaal Copilot-enabled. Dat biedt één AI-assistent die dwars door meerdere applicaties werkt met dezelfde interface. InSpark bouwt daar bovenop een Azure AI Foundry sandbox voor custom AI op eigen data.

Op dit moment wordt Copilot alleen voor persoonlijke productiviteit gebruikt. De stap naar procesgerichte inzet is de grootste kans.

### 3.4 Twee open punten

De endstate-positie van HubSpot bepaalt of investering in Breeze zinvol is. Zolang die keuze niet gemaakt is, adviseren wij geen AI-activiteiten in het marketingdomein.

Daarnaast ontbreekt een systeem voor het ketenproces Oplossen en Verbeteren. Zonder service desk tool is er geen platform waarop AI-toepassingen als incident triage of kennisbankautomatisering kunnen landen.

---

## 4. Wat zit er in je gereedschapskist?

### 4.1 Overzichtstabel

| Applicatie | AI Maturity | AI-assistent | Kernverhaal | Status bij Asito |
|---|---|---|---|---|
| AFAS ERP | High | Jonas | OCR, speech-to-text, documentanalyse, workflow-automatisering. Inbegrepen in licentie. | Beschikbaar, niet geactiveerd |
| AFAS HR | High | Jonas | CV-screening, CAO-analyse, dossiersamenvatting, medewerkersvragen. | Beschikbaar, niet geactiveerd |
| ORTEC | Medium | TESSA | ML-kern voor scheduling en forecasting. Geen generatieve AI. | Intensief in gebruik, AI-modules onbekend |
| Dynamics 365 | High | Copilot | Samenvatting, e-mail, meeting prep, lead scoring. | Live, Copilot beperkt ingezet |
| Power BI / Fabric | High | Copilot | Natuurlijke-taalvragen op data. Strategisch dataplatform. | BI-team al actief met AI |
| Excel | High | Copilot | Formules, analyse, opschoning in natuurlijke taal. Laagste instapdrempel. | 50-100 licenties, persoonlijk gebruik |
| HubSpot | High | Breeze | Uitgebreid AI-ecosysteem. Relevantie hangt af van endstate-keuze. | Open punt |
| Ubeeo | Medium | Via partners | AI via In2Dialog (interviewanalyse) en WCC (matching). | Partnerstatus onbekend |
| Appreo | Low | Geen | Geen AI. Waarde als betrouwbare databron. | Actief, focus op datakwaliteit |

### 4.2 Wat valt op?

Zes van de negen tools hebben een actieve AI-roadmap. AFAS brengt Profit 8 uit in juni 2026 met AI in alle workflows. Microsoft breidt Copilot uit met agents en integraties. HubSpot positioneert Breeze als strategische pijler. De leveranciers bewegen snel.

De twee meest directe kansen, Jonas in AFAS en Copilot in het Microsoft-ecosysteem, zijn allebei beschikbaar en allebei niet structureel ingezet. Jonas is inbegrepen in de AFAS-licentie. Copilot-licenties zijn er al voor 50 tot 100 gebruikers.

ORTEC is operationeel het meest kritische systeem, maar het is onduidelijk welke AI/ML-modules actief zijn in de huidige licentie.

Appreo heeft geen AI en zal dat waarschijnlijk niet krijgen. De AI-waarde van Appreo-data (uren, werkorders, locaties) wordt pas zichtbaar als die data betrouwbaar doorstroomt naar AFAS en Power BI.

### 4.3 Waar gaan de leveranciers naartoe?

AFAS bereidt Profit 8 voor (juni 2026): Jonas in alle workflows, CV-parsing, AI talent matching, en een Jonas Insights Dashboard voor gebruiksanalyse. Wie nu begint met Jonas is voorbereid op wat komt.

Microsoft evolueert Copilot van assistent naar agent. Copilot Studio maakt custom agents mogelijk op eigen data. Azure AI Foundry wordt de basis voor geavanceerde AI voorbij de standaard Copilot.

ORTEC investeert in nauwkeurigere forecasting en meer zelflerend gedrag. Geen GenAI-roadmap. De kracht blijft mathematische optimalisatie.

HubSpot gaat all-in op Breeze, maar de relevantie voor Asito hangt af van de endstate-keuze.

Ubeeo en Appreo hebben geen eigen AI-roadmap. Bij Ubeeo komt AI via partners (In2Dialog, WCC, Textmetrics). Bij Appreo moet de waarde via integraties met AFAS en Power BI komen.

---

## 5. Drie voorbeelden uit de praktijk

### De voorman die inspreekt

Nu: na een inspectie rijdt de voorman terug naar kantoor om een verslag te typen. Dat kost tijd, de verslagen variëren in kwaliteit, en regelmatig worden ze uitgesteld.

Met Jonas (AFAS): de voorman spreekt zijn bevindingen in via de AFAS Pocket app op locatie. Jonas transcribeert, structureert de informatie en voegt het toe aan het werkdossier. Geen nieuw systeem, geen training in een onbekende app.

Vereist: Jonas-activatie door de AFAS-beheerder. Geen extra licentiekosten.

### De financieel medewerker die vraagt in plaats van zoekt

Nu: een financieel medewerker doorzoekt handmatig een Excel-export met honderden regels op afwijkingen in de nacalculatie. Dat kost uren.

Met Excel Copilot: "markeer alle posten waar het verschil tussen nacalculatie en voorcalculatie groter is dan 10%." Copilot filtert, berekent en markeert. Seconden in plaats van uren.

Vereist: bestand op OneDrive/SharePoint (niet op een netwerkschijf). Copilot-licentie (beschikbaar).

### De recruiter die sneller beoordeelt

Nu: bij circa 150 wervingen per maand gaat veel tijd naar handmatig CV's doornemen en gespreksverslagen schrijven.

Met Jonas (AFAS HR) en In2Dialog (Ubeeo-partner): Jonas screent CV's en extraheert kerngegevens. In2Dialog maakt een gestructureerde gespreksanalyse na het interview.

Vereist: Jonas-activatie in AFAS HR. Verificatie of het In2Dialog-contract via Ubeeo actief is.

---

## 6. Vervolgstappen en randvoorwaarden

### 6.1 Drie stappen

Dit zijn geen pilots. Het zijn activatiehandelingen en inventarisaties binnen bestaande applicaties, met bestaande licenties, zonder architectuurwijzigingen.

**Stap 1: Jonas activeren in AFAS**

De AFAS-beheerder activeert Jonas per omgeving. Configuratiehandeling, geen implementatieproject, geen extra kosten (fair-use model). De initiële outputs zijn generiek. Afstemming op Asito's werkwijze via templates en promptconfiguratie is een iteratief proces van weken, niet dagen.

**Stap 2: Copilot-gebruik inventariseren en richting geven**

Inventariseren wie een licentie heeft, hoe die gebruikt wordt, en waar de meeste productiviteitswinst zit. Daarna: gerichte adoptie-begeleiding voor specifieke taken. Excel Copilot vereist bestanden op OneDrive of SharePoint. Als de organisatie veel op netwerkschijven werkt, is dat een migratie-afhankelijkheid die niet onderschat moet worden.

**Stap 3: ORTEC AI/ML-modules inventariseren**

Met de ORTEC-accountmanager vaststellen welke ML-features beschikbaar en actief zijn. ORTEC's ML vereist historische data van voldoende kwaliteit. Als de data uit het eerste jaar na go-live inconsistent is, kan de ML niet betrouwbaar trainen.

### 6.2 Randvoorwaarden

**Data-eigenaarschap.** Wie is verantwoordelijk voor de kwaliteit van medewerkerdata, contractdata, urendata? Zonder duidelijk eigenaarschap levert AI onbetrouwbare resultaten. Begin met het benoemen van data-eigenaren per domein.

**Integratiestabiliteit AFAS-ORTEC-Appreo.** Als data tussen deze systemen niet betrouwbaar synchroniseert, faalt elke AI die erop leunt.

**Capaciteit applicatiebeheer.** AI-activatie vereist betrokkenheid van het applicatiebeheerteam dat volledig bezet is met post-go-live stabilisatie. Dat is een keuze: extern ondersteunen of prioriteren ten koste van andere zaken.

**Adoptie passend bij de doelgroep.** Asito's eindgebruikers zijn praktijkmensen. Een e-learning over "wat is AI" werkt niet. Een collega die laat zien "als je dit intypt, krijg je dit" werkt wel.

**Twee strategische keuzes.** De endstate-positie van HubSpot en de keuze voor een service desk tool beïnvloeden welke AI-investeringen zinvol zijn. Zolang die open staan, adviseren wij geen AI-investeringen in die domeinen.

---

## Appendix A: AI Maturity Scoring

Elke applicatie is beoordeeld op drie criteria: de aanwezigheid van een branded AI-assistent (Jonas, Copilot, Breeze, TESSA), de diepte van generatieve AI-mogelijkheden, en de zichtbaarheid van een actieve AI-roadmap.

High: uitgebreide AI met actieve roadmap. Medium: AI-elementen aanwezig (vaak ML of via partners), beperkt in breedte of diepte. Low: geen significante AI, roadmap suggereert geen verandering.

---

## Appendix B: Per-applicatie analyse

### B.1 AFAS ERP, Jonas

AI Maturity: High

Jonas is live sinds november 2024 bij meer dan 1.000 organisaties. Mogelijkheden: Smart Workflow Reactions (tekst genereren, samenvatten, herschrijven), speech-to-text via de Pocket app of Apple Watch, receipt OCR, document-aware analyse van contracten en CAO's, AI task templates via sneltoets, en bank statement ML matching die leert van correcties.

Roadmap: Profit 8 (juni 2026) brengt Jonas in alle workflows, CV-parsing, AI talent matching en een Insights Dashboard.

Beperkingen: werkt in gestructureerde workflows, niet als vrije chatinterface. Outputs vereisen menselijke verificatie. Geen externe databronnen buiten AFAS.

Status bij Asito: beschikbaar, niet geactiveerd.

### B.2 AFAS HR, Jonas

AI Maturity: High

Zelfde platform, HR-specifiek: antwoordsuggesties op medewerkersvragen op basis van CAO en dossier, CV-screening met extractie van kerngegevens, dossiersamenvatting, speech-to-text voor gespreksverslagen, CAO-documentanalyse.

Roadmap: Profit 8 brengt diepere HR-integratie, AI talent matching, geautomatiseerde onboarding flows.

Beperkingen: CV-screening vereist documenten in het juiste format. Kwaliteit van antwoordsuggesties hangt af van de volledigheid van het CAO-document en personeelsdossier.

Status bij Asito: beschikbaar, niet geactiveerd.

### B.3 ORTEC Workforce Scheduling

AI Maturity: Medium

De ML is de kern van het product: demand forecasting, schedule optimization (arbeidswetgeving, CAO-regels, kwalificaties, voorkeuren, reistijden in één run voor duizenden medewerkers), smart replacement bij uitval, en TESSA als self-service portaal.

Roadmap: nauwkeurigere forecasting, meer zelflerend. Geen GenAI-roadmap.

Beperkingen: geen generatieve AI, geen chatbot. Geavanceerde optimalisatie vereist configuratieworkshops. ML heeft historische data van voldoende kwaliteit nodig.

Status bij Asito: intensief in gebruik voor roosterplanning. Onduidelijk welke AI/ML-modules actief zijn.

### B.4 Dynamics 365 CRM, Copilot

AI Maturity: High

Copilot voor Sales: lead scoring, opportunity-samenvatting, e-mail drafting op basis van CRM-data, meeting preparation met account-historie, conversation intelligence voor gespreksanalyse en actie-extractie, Copilot agents voor follow-up en data-opschoning.

Roadmap: Copilot agents (autonome workflows), Copilot Studio voor custom agents, diepere Teams/Outlook-integratie.

Beperkingen: waarde hangt af van hoe actief de circa 40 klantmanagers Dynamics gebruiken. Beste features vereisen dat Outlook en Teams ook actief worden ingezet.

Status bij Asito: live, Copilot beperkt ingezet.

### B.5 Power BI / Fabric, Copilot

AI Maturity: High

Copilot in Power BI: natuurlijke-taalvragen op dashboards en datasets, automatische narrative generation. Fabric als unified data platform met lakehouse, data engineering, data science en BI.

Roadmap: Fabric wordt Microsoft's strategische dataplatform. Copilot agents op data voor autonome monitoring. Directe integratie met Azure AI Foundry.

Beperkingen: antwoordkwaliteit hangt af van de voorbereiding van het semantic model. Een unified model op AFAS- en ORTEC-data bouwen in Fabric vereist data engineering expertise. Copilot is geen voorspellend model.

Status bij Asito: Power BI in gebruik, Qlik-migratie lopend. BI-team is de meest AI-rijpe groep.

### B.6 Excel, Copilot

AI Maturity: High

Copilot genereert formules in natuurlijke taal, schoont data op, herkent patronen. Agent Mode (preview) voert meerdere stappen uit in één opdracht. Python in Excel (preview) voor geavanceerde analyses.

Beperkingen: werkt alleen op bestanden in OneDrive of SharePoint. Rommelige data levert rommelige resultaten.

Status bij Asito: 50 tot 100 licenties, persoonlijk gebruik.

### B.7 HubSpot, Breeze

AI Maturity: High

Drie lagen: Breeze Copilot (assistent voor schrijven, samenvatten, onderzoek), Breeze Agents (autonome content, prospecting, klantenservice), Breeze Intelligence (data verrijking, buyer intent). Content Hub AI voor blogartikelen, social media, landingspagina's.

Roadmap: Breeze Studio voor custom agents zonder code. Positionering als AI-CRM.

Beperkingen: meeste AI-features beperkt tot Professional of Enterprise. Kosten stijgen met contactenlijst. Marketing/sales-platform, niet operationeel.

Status bij Asito: open punt. Endstate-positie moet bepaald worden.

### B.8 Ubeeo ATS

AI Maturity: Medium (via partners)

Beperkte native AI. Partner-ecosysteem: In2Dialog (interviewopname, transcriptie, psychologische profilering), WCC ELISE (semantische kandidaat-matching), Textmetrics (vacaturetekst-optimalisatie). Native: generatieve content voor vacatureteksten en gewogen scoring voor automatische pre-screening.

Beperkingen: partnerafhankelijkheid als risico. In2Dialog vereist strikte AVG-toestemmingsprocedures. Geen voorspellende analytics.

Status bij Asito: in gebruik voor recruitment. Status partnerintegraties onbekend.

### B.9 Appreo

AI Maturity: Low

Geen AI. Automatisering is rule-based. 14 Plan Accelerators als planning-helpers (deterministische regels, niet ML). Bidirectionele integratie met AFAS voor looncomponenten. Digitale werkorders, urenregistratie, GPS-tracking.

Beperkingen: geen AI van welke aard ook. Waarde voor AI-initiatieven hangt af van de betrouwbaarheid van data-integratie met AFAS en ORTEC.

Status bij Asito: actief in gebruik. Focus op datakwaliteit en integratiestabiliteit.

---

## Appendix C: Integratiearchitectuur

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

*Dit rapport is opgesteld door Tatoma in het kader van de Foundation Sprint voor Asito, februari 2026.*
