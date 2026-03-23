# Intern: Gespreksleidraad Tech Scan Intake — Draaijer-Heyday

*Niet delen met de klant.*

*Doel: Met voldoende informatie uit het gesprek komen om de Tech Scan gericht en volledig uit te voeren.*

---

## Voorbereiding

Open het IT Landschap document op je scherm. Gebruik het **applicatielandschap-diagram** en het **BI-landschap-diagram** als visuele ankers — het zijn hun eigen visuals, wat laat zien dat je je huiswerk hebt gedaan zonder een eigen framework op te leggen.

---

## BLOK 1 — Opening & kadering (5 min)

> "Fijn dat jullie tijd hebben. Het doel van vandaag is eenvoudig: we willen jullie landschap goed genoeg begrijpen om een Tech Scan te doen die er echt toe doet — geen standaard verhaal. Dus het grootste deel van dit gesprek luisteren wij. We hebben het IT Landschap document en het procesoverzicht doorgenomen en hebben een aantal gerichte vragen, maar we horen eerst graag jullie perspectief."

**Verwachtingen neerzetten:**

- We vragen naar jullie systemen, hoe ze met elkaar verbonden zijn en waar het schuurt
- We vragen wat jullie al onderzocht hebben rondom AI — we willen geen werk dubbel doen of dingen vertellen die jullie al weten
- We vragen naar gebieden die buiten scope moeten blijven of lage prioriteit hebben — zeker met de AFAS-migratie die nog aan het landen is
- Aan het eind bevestigen we wat de Tech Scan volgens ons moet dekken

**LET OP:** We hebben ook het Node1 Fase 2 rapport doorgenomen (Target IT architectuur, juli 2025). We begrijpen de As Is → To Be migratie. Niet als eerste benoemen — laat hen de huidige situatie in eigen woorden beschrijven, maar gebruik het om scherpere vervolgvragen te stellen.

---

## BLOK 2 — Hun verhaal: de operationele werkelijkheid (15 min)

**De openingsvraag — laat ze vertellen:**

> "Als je aan iemand nieuw zou moeten uitleggen hoe een klanttraject end-to-end werkt — van contractondertekening tot maandfactuur — welke systemen worden dan geraakt en in welke volgorde?"

**Luister naar:** De natuurlijke stroom door Facilitor, AFAS, planningstools, BI. Wie raakt wat aan. Waar zitten de overdrachten. Waar gaat het mis of vertraagt het.

**Doorvraag-lijnen (alleen als ze niet vanzelf komen):**

- "Waar in die keten besteden mensen tijd aan dingen die repetitief of laagwaardig voelen?"
- "Zijn er stappen die nog handmatig zijn waarvan jullie wensen dat ze dat niet waren?"
- "Verschilt die stroom tussen Hospitality en MultiLine, of is het in essentie hetzelfde proces met andere tools?"

**Specifieke onderwerpen om naar toe te sturen als ze niet vanzelf langskomen:**

| Onderwerp | Waarom we het nodig hebben | Vraag indien nodig |
|-----------|---------------------------|-------------------|
| Rol van Facilitor | Het is hun CAFM-ruggengraat, 11 instanties — we moeten begrijpen hoe centraal het is | "We zagen dat Facilitor in meerdere configuraties voorkomt — single client, multi-client, centraal. Hoe verhouden die zich tot elkaar?" |
| Ontrafelaar | Custom tool, waarschijnlijk uren-reconciliatie — potentieel sterke AI-kandidaat | "We zagen 'Ontrafelaar' in het landschap voor Hospitality. Kunnen jullie toelichten wat die doet?" |
| CWS | 3 custom instanties voor MultiLine — scope moet duidelijk worden | "Zelfde vraag voor CWS aan de MultiLine-kant — wat doet die?" |
| Planning-fragmentatie | Planbition vs. ShiftBase vs. PURE — bewust of legacy? | "Jullie hebben drie verschillende planning-/roostering-tools. Is dat bewust per dienstlijn, of staat consolidatie op de agenda?" |

---

## BLOK 3 — AI-bewustzijn & huiswerk tot nu toe (10 min)

**Overgang:**

> "Heel nuttige context. Nu — voordat we technisch de diepte ingaan — zijn we benieuwd: hebben jullie of het team al onderzocht welke AI-mogelijkheden er in jullie huidige tools beschikbaar zijn?"

**Luister naar:** Kennen ze Jonas? Hebben ze Copilot getest? Heeft een leverancier (AFAS, Facilitor, HubSpot) hen AI-features gepitcht? Is er intern enthousiasme of scepsis?

**BELANGRIJK — We weten al dat ze een innovatieagenda 2026 hebben.** We kennen de specifieke AI-ideeën (AI offertetool, HR-agent Billy, Interim Matchmaker, Multiline Bonnie, Digitale receptie, MJOB/MJOP AI, etc.). Dit blok draait erom te peilen hoe ver ze zijn met die plannen en wat de Tech Scan daaraan kan bijdragen. Laat hen dit zelf vertellen — noem de ideeën niet als eerste, maar haak aan als ze ze noemen.

**Als ze hun innovatie-agenda/board noemen (waarschijnlijk):**
- "We zagen dat jullie een innovatieboard hebben met ambassadeurs uit de BU's. Hoe ver zijn de AI-ideeën voor 2026 — zitten die nog in de signaalfase, of zijn er al pilots?"
- "Welke van die ideeën zijn het meest urgent of hebben de meeste steun vanuit de directie?"
- "Is er al een koppeling gemaakt tussen die ideeën en wat jullie huidige tools al kunnen? Of is dat precies wat jullie van de Tech Scan verwachten?"

**Als ze specifieke AI-initiatieven noemen (Billy, Matchmaker, offertetool, etc.):**
- "Hoe is dat idee ontstaan — vanuit een pijnpunt in de operatie, of vanuit een leverancier die het pitchte?"
- "Is er al een technische verkenning gedaan — weten jullie of het bestaande tool dit kan, of moet er iets gebouwd worden?"
- "Wie is de eigenaar van dit initiatief binnen de organisatie?"

**Als ze Flowmatic / zelfgebouwde AI-agents noemen:**
- "We begrijpen dat er al een aantal agents gebouwd zijn in Flowmatic — een servicedesk-agent, Billie voor facturatie, een intakes-agent. Zijn die al live bij eindgebruikers, of zitten ze nog in een test-/pilotfase?"
- "Wie heeft die gebouwd — en wie onderhoudt ze? Is dat het initiatief van één persoon of een teaminspanning?"
- "Hoe zijn die agents verbonden met jullie kernsystemen — halen ze data op uit AFAS of Facilitor, of werken ze meer standalone?"
- "Is Flowmatic iets dat jullie zien opschalen naar andere BU's, of is het meer een experimenteeromgeving?"

**Als ze Jonas / AFAS AI noemen:**
- "Hoe ver zijn jullie daarmee? Actief, pilot, of nog verkennend?"
- "Op welke AFAS-modules willen jullie dat het meest toepassen?"
- "Zijn er blokkades — licenties, datakwaliteit, verandermanagement?"

**Als ze Copilot / M365 AI noemen:**
- "Is Copilot breed uitgerold of bij een selecte groep?"
- "Waar gebruiken mensen het daadwerkelijk voor — vergaderingen samenvatten, mails opstellen, iets anders?"
- "Is er governance omheen — wie bepaalt welke data Copilot mag benaderen?"

**Als ze HubSpot / marketing tools noemen:**
- "We begrijpen dat HubSpot wordt uitgefaseerd richting WordPress + een nieuwe marketing automation tool. Is die vervanging al gekozen?"
- "Moeten we marketing-tool-AI meenemen in de Tech Scan scope — als eisen voor de nieuwe tool in plaats van beoordeling van HubSpot?"

**Als ze nog niet veel onderzocht hebben:**
- "Helemaal geen probleem — dat is precies waar de Tech Scan voor is. Wij brengen in kaart wat beschikbaar is en wat het activeren waard is."
- "De Tech Scan kan direct input leveren voor jullie R-W-W beoordeling — per idee kunnen we aangeven wat realistisch is (Real), wat het oplevert (Win) en of het past bij de strategie (Worth)."

**Als ze scepsis uiten:**
- Niet pushen. Erkennen. "Wat zou er waar moeten zijn voordat AI voor jullie waardevol voelt?" Dit vertelt je wat de succescriteria zijn.

**Koppeling naar hun innovatieproces (belangrijk voor framing):**
> Als het gesprek er aanleiding toe geeft, benoem dan: "Ons Tech Scan rapport kan direct aansluiten op jullie innovatieproces — het levert de signaalfase-input die het innovatieboard nodig heeft om te beoordelen welke AI-mogelijkheden het waard zijn om naar de pilotfase te brengen."

---

## BLOK 4 — No-go zones & timing (10 min)

**Overgang:**

> "Voordat we verdergaan — zijn er gebieden in het landschap waar we expliciet van weg moeten blijven? Dingen die mid-migratie zijn, waar een contractheronderhandeling loopt, of waar een beslissing in de lucht hangt die onze analyse achterhaald zou maken?"

**Specifieke vragen:**

- "Wordt er iets vervangen of geconsolideerd in de komende 6-12 maanden?" *(Planningstools? CRM? BI-platform?)*
- "Zijn er leverancierscontracten die binnenkort verlengd worden en waarvan de uitkomst het landschap kan veranderen?" *(AFAS, Facilitor, COM4 managed services)*
- "Is er iets politiek gevoelig — gebieden waar teams sterk eigenaarschap voelen en externe input niet op prijs stellen?"
- "In het document staat dat COM4 de operationele IT beheert. Zijn er grenzen die we moeten respecteren in wat wij beoordelen vs. wat bij hen hoort?"

**Wat we hier eigenlijk in kaart brengen:**

| Signaal | Wat het betekent voor scope |
|---------|---------------------------|
| "We migreren X naar Y" | X niet diep beoordelen, Y als toekomstige staat noteren |
| "Dat is COM4-terrein" | Applicatie wel beoordelen, maar infra-aanbevelingen voorzichtig formuleren |
| "De planning-situatie is... ingewikkeld" | Voorzichtig mee omgaan, waarschijnlijk politiek — tools individueel beoordelen, geen consolidatie aanbevelen |
| "We hebben net een 3-jarig contract getekend met Z" | Z is in scope en blijft — focus op maximale waarde eruit halen |
| "Management wil dat we naar [onderwerp] kijken" | Dit is de echte opdracht — prioriteit aan geven |

---

## BLOK 5 — Technische verdieping: koppelingen, authenticatie, versies (15 min)

**Overgang:**

> "Top — nu moeten we iets technischer worden om te zorgen dat de Tech Scan klopt. We hebben een aantal specifieke vragen over hoe jullie systemen met elkaar praten en hoe toegang is ingericht."

### 5A — Koppelingen & datastromen

- "Het landschapsdiagram toont koppelingen tussen AFAS, Facilitor en de andere systemen als API/XML/CSV. Zit er een middleware-laag achter die dat orkestreert, of zijn het punt-naar-punt koppelingen?"
- "Wie bouwt en onderhoudt de koppelingen — is dat intern, COM4, of een derde partij?"
- "De BI-laag toont een Data Warehouse op Azure met feeds vanuit meerdere bronnen. Is dat een beheerd, governed dataplatform, of meer een verzameling van pipelines?"
- "We zagen 'isolated collection' apart gemarkeerd in het BI-diagram — wat is dat?"
- "Hoe stroomt data specifiek tussen Facilitor en AFAS? Realtime sync, batch, handmatig?"

### 5B — Authenticatie & identiteit

- "Alles loopt via Azure AD / Entra ID met SSO en MFA — geldt dat voor alle applicaties, of zijn er uitzonderingen?"
- "Hebben Facilitor, Planbition, ShiftBase hun eigen identity management, of zijn ze gefedereerd via Entra?"
- "Conditional access policies — worden die uniform toegepast of per applicatie?"
- "Hoe authenticeren buitendienstmedewerkers / hospitality-medewerkers zonder laptop? Via PocketApp? Gedeelde devices?"

### 5C — Versies, licenties & adoptie

Loop de belangrijkste applicaties langs. Per applicatie hebben we nodig: versie/tier, licentiemodel en daadwerkelijk adoptieniveau.

| Applicatie | Wat te vragen |
|------------|--------------|
| **AFAS** | "Welke Profit-versie? E3/E5-equivalent? Zit Jonas in jullie licentie? Hoeveel actieve gebruikers over de 20 administraties?" |
| **M365** | "E3 of E5 over de hele linie? Copilot-licenties — hebben jullie die? Hoeveel?" |
| **HubSpot** | "We begrijpen dat HubSpot wordt uitgefaseerd — is dat bevestigd? Zo ja, wat komt ervoor in de plaats en wanneer? Moeten we het nog meenemen, of richten we AI-aanbevelingen op de selectiecriteria voor de vervanging?" |
| **Facilitor** | "Welke versie? SaaS of on-prem? Is er een AI- of automatiseringsroadmap vanuit de leverancier?" |
| **Planbition** | "Huidige versie? Zijn er AI/optimalisatie-features beschikbaar?" |
| **ShiftBase** | "Idem — versie en AI-mogelijkheden?" |
| **Recruitee** | "Welk plan? Worden AI-features voor screening of matching gebruikt?" |
| **StudyTube** | "Worden AI-gegenereerde leerpaden of contentaanbevelingen gebruikt?" |
| **PowerBI / Tagetik** | "PowerBI Pro of Premium? Fabric? Tagetik — cloud of on-prem? AI/ML-modellen in de BI-laag?" |
| **Whitevision** | "Wat is de scope — alleen factuurscannen, of breder documentverwerking? AI/ML in de herkenningsengine?" |

### 5D — Status AFAS-migratie

We weten uit het Node1-rapport wat er gepland was. Nu moeten we de werkelijke huidige stand begrijpen.

- "Het Node1-rapport beschreef een grote migratie — Exact, Dynamics, Visma|Raet, BIS allemaal naar AFAS. Hoe landt dat? Wat is volledig live, wat is nog in beweging?"
- "We begrijpen dat BIS bij Consultancy en Dynamics Sales in de komende weken worden uitgefaseerd. Is er verder nog iets in transitie?"
- "Hoe is de datakwaliteit na de migratie? Zijn er integratiepunten die nog schuren — vooral Facilitor ↔ AFAS en de custom interfaces?"
- "Het rapport identificeerde 27 maatwerkitems. Hoe ver zijn die? Welke blokkeren of vreten capaciteit?"
- "Is Node1 nog betrokken bij Fase 3 implementatie, of is dat overgedragen aan intern/COM4?"

### 5E — Bijzonderheden

- "Is er iets ongewoons aan jullie opzet dat niet voor de hand zou liggen vanuit de documentatie? Legacy-systemen die nog draaien? Shadow IT? Tools die niet in het landschapsdiagram staan maar waar mensen op leunen?"
- "Zijn er compliance- of data-residency-eisen waar we rekening mee moeten houden — vooral rondom de Azure-omgeving en het datawarehouse?"
- "De backup-architectuur werkt met fysieke tapes en offsite opslag. Is dat een compliance-vereiste of legacy? Is er interesse om dat te moderniseren?"

---

## BLOK 6 — Gap-bevestiging & scope-afspraak (5 min)

**Overgang:**

> "Op basis van wat jullie gedeeld hebben en wat we in de documentatie gezien hebben, is dit wat we denken te begrijpen — en waar we nog gaten zien."

**Spiegel je begrip terug, laat hen corrigeren:**

> "Sinds de AFAS-migratie is het beeld helder: AFAS is de hub — CRM, Finance, HR, Operations allemaal in één omgeving met 9 werkgevers en 23 administraties. Facilitor is de operationele ruggengraat voor de Integrated dienstverlening. Jullie hebben divisie-specifieke planningstools — Planbition voor Hospitality, ShiftBase voor MultiLine, PURE cross-service. De BI-laag op Azure met PowerBI en Tagetik blijft, gevoed vanuit de nieuwe AFAS-data. COM4 beheert de dagelijkse IT-ops, jullie houden strategische regie. Multiline opereert wat zelfstandiger met Genesys, Salesforce en CWS naast AFAS. Klopt dat, of zitten we ergens naast?"

**Bevestig vervolgens de scope:**

> "Voor de Tech Scan richten we ons op de huidige stack — niet de uitgefaseerde systemen. Diepgaand: AFAS (incl. Jonas — over CRM, HR, Finance, Operations, InSite/OutSite), M365 (incl. Copilot) en Facilitor. Middenniveau: de planningstools (Planbition + ShiftBase), de BI-stack (PowerBI/Tagetik/Data Warehouse) en Whitevision. Lichter: Recruitee, StudyTube, InSocial, PURE. Exact, Dynamics, Visma|Raet en BIS slaan we over. En voor de Multiline-specifieke tools als Genesys en Salesforce — willen jullie die ook in scope, of houden we het bij de groepsstack? Zelfde vraag voor Flowmatic en de AI-agents die daar gebouwd worden. Past dat?"

**Afspraken over vervolgtoegang:**

- "Met wie moeten we praten voor verdieping op specifieke applicaties?" *(Applicatie-eigenaren, power users)*
- "Kunnen we toegang krijgen tot — of een walkthrough van — de admin-consoles van AFAS, Facilitor en M365?" *(Licentiedetails, feature-activatiestatus)*
- "Is er een gedetailleerder koppeling-/interface-document dan wat in het IT Landschap staat?"

---

## Afsluiting (5 min)

- Vervolgstappen en planning bevestigen
- Afspreken wie het Tech Scan-rapport ontvangt en in welk formaat
- Vragen: "Is er iets dat we niet gevraagd hebben maar dat jullie denken dat we moeten weten?"

---

## Checklist na het gesprek

Direct na het gesprek vastleggen:

- [ ] Bevestigde applicatie-scope (in/uit)
- [ ] No-go zones en timing-beperkingen
- [ ] AI-huiswerk dat al gedaan is (per applicatie)
- [ ] Integratie-architectuur (middleware of punt-naar-punt)
- [ ] Authenticatiemodel per applicatie (SSO/gefedereerd of standalone)
- [ ] Versie/licentie-tier per applicatie
- [ ] Contactpersonen voor verdiepingsgesprekken
- [ ] Verrassingen of "bijzonderheden" die zijn gemarkeerd
- [ ] Politieke dynamiek waargenomen (IT vs. management, COM4-relatie)
- [ ] Hun taalgebruik voor processen (overnemen in het rapport)
