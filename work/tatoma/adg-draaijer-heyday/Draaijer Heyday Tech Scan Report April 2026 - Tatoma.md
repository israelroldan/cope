# Draaijer Heyday Tech Scan: AI-mogelijkheden in het applicatielandschap

*April 2026*

Tatoma — in opdracht van Draaijer Heyday Group
Vertrouwelijk

---

## Samenvatting

In het kader van de Tatoma Foundation Sprint hebben wij zes kernapplicaties van Draaijer Heyday onderzocht op hun huidige AI-mogelijkheden, de roadmap van de leverancier en de relevantie voor de dagelijkse operatie van Draaijer Heyday.

De belangrijkste bevinding is dat Draaijer Heyday zich in een ongebruikelijke positie bevindt. Waar de meeste organisaties nog moeten beginnen met AI-activatie, heeft Draaijer Heyday al een actief AI-ecosysteem opgebouwd: Billy voor factuurverwerking, Bonnie AI als voice-agent, Heydi als servicedesk-assistent, Brainial voor tenderondersteuning, en AI-functionaliteit in Genesys voor klantcontact. Tegelijkertijd zijn de ingebouwde AI-assistenten in de bestaande tools (Jonas in AFAS, native AI in Facilitor, procesmatig gebruik van Copilot) nauwelijks of niet geactiveerd.

Het probleem is dus niet het ontbreken van mogelijkheden of ambitie, maar de balans. Daarnaast ontbreekt formele governance over het groeiende agent-landschap.

Om per applicatie te beoordelen waar de organisatie staat en wat de logische volgende stap is, hanteren wij in deze tech scan een eenvoudig drielagenmodel voor AI-activatie op toolniveau:

1. **Activeren:** ingebouwde AI-assistenten inschakelen voor eindgebruikers (bijvoorbeeld Jonas aanzetten in AFAS, of Facilitor's native AI-features beschikbaar maken)
2. **Inrichten:** workflows en templates configureren zodat AI structureel in het werkproces zit (bijvoorbeeld domeinspecifieke prompt-templates voor Copilot, of Facilitor AI configureren per klant-instance)
3. **Bouwen:** maatwerk ontwikkelen waar standaard functionaliteit niet volstaat (bijvoorbeeld de agents Billy en Heydi die via Flowmatic zijn gebouwd)

Dit model is complementair aan de strategische pijlers uit het Tatoma Playbook (Activeren, Automatiseren, Innoveren) maar richt zich specifiek op de vraag: wat is er per tool nodig om AI-waarde te ontsluiten?

De kern van onze bevinding: er wordt al gebouwd op niveau 3 terwijl niveau 1 en 2 onderbenut blijven. De focus zou moeten liggen op de eerste twee niveaus, en tegelijk op het formaliseren van wat al draait op het derde niveau.

In de appendix staat een uitgebreide analyse per applicatie met features, beperkingen en praktijkvoorbeelden, evenals drie concrete vervolgstappen ter inspiratie die geen nieuwe systemen, geen architectuurwijzigingen, en geen grote investeringen vereisen. Voor elk van deze stappen zijn we eerlijk over wat eenvoudig is en wat niet.

---

## 1. Introductie

Deze tech scan beoordeelt het huidige applicatielandschap van Draaijer Heyday om mogelijkheden voor veilige en praktische AI-implementatie te identificeren. De evaluatie is gebaseerd op gedetailleerde analyses op toolniveau. Het doel is om te ontdekken waar AI vandaag de dag al impact kan hebben zonder ingrijpende structurele veranderingen.

Dit rapport is geen AI-strategie. De strategische richting, waaronder de keuzes rond Activeren, Automatiseren en Innoveren, is het onderwerp van het Tatoma Playbook dat parallel wordt opgeleverd. Dit rapport levert de technische onderbouwing: welke tools zijn er, wat kunnen ze, en wat is de meest logische volgorde van activatie.

De scope omvat zes applicaties en één externe bouwpartner die in de intakesessie als relevant zijn geïdentificeerd:

- **Diep:** AFAS (ERP + HR/Jonas), Microsoft 365/Copilot, Facilitor
- **Medium:** Power BI / Data Warehouse / Tagetik
- **Vendor-assessment:** Flowmatic (als externe bouwpartner voor custom agents)

Whitevision (scan & herkenning) en ShiftBase (roosterplanning) zijn in de intakesessie benoemd maar in de interviews niet substantieel besproken. Deze tools worden daarom niet apart geanalyseerd; waar relevant worden ze in context genoemd.

Daarnaast hebben wij het bredere AI-initiatieven-landschap (Billy, Bonnie AI, Heydi, Brainial, AI in Genesys, Schoolreisje 2.0, Lovable-pilots) als geheel beoordeeld op governance en architectuur.

---

## 2. De context

### Het landschap na de migratie

Per 1 januari 2026 is AFAS live als centraal hub-systeem voor ERP, HR, finance en CRM. De migratie, onderdeel van de fusie van Draaijer en Heyday tot één groep onder ADG, is technisch afgerond maar operationeel nog in stabilisatie. Payroll, facturatie en standaard HRM draaien. Contractbeheer, wagenparkbeheer en CRM-optimalisatie zijn nog in inrichting.

De Manager Business Information Systems hanteert een bewuste 18-maanden filosofie: eerst het fundament op orde, dan uitbreiden. Die keuze is begrijpelijk gezien de omvang van de migratie: zes business units, circa 900 medewerkers, en een volledig nieuw applicatielandschap. Daarnaast is in maart 2026 een nieuwe HR-directeur aangetreden, waardoor de HR-toolvisie nog in vorming is.

### De applicatiearchitectuur

AFAS vormt de kern met InSite-portals (Mijn HEYDAY-pagina's), OutSite, PocketApp en Profit-modules voor CRM, Finance, HR, Payroll, Projecten, Ordermanagement en Abonnementen.

Facilitor is het tweede grote systeem: een private SaaS-oplossing voor contract-, financieel en operationeel management, primair ingezet bij Heyday Integrated. Grotere klanten krijgen een eigen instance met dedicated front-end servers en database aan de Facilitor-zijde; kleinere klanten delen een multi-client omgeving. Tussen AFAS en Facilitor is een interface gebouwd voor facturatie.

De datalaag bestaat uit Power BI, Tagetik en Value Portal/BudgetTracker op een Azure Data Warehouse. Tagetik wordt gesplitst: de rapportagefunctie blijft (ADG-vereiste), de financial planning verhuist naar een AFAS-aligned tool.

Aanvullende applicaties: ShiftBase voor roosterplanning bij Multiline en Whitevision voor scan & herkenning. Daarnaast zijn er tools als Recruitee (ATS), StudyTube (learning) en InSocial (klanttevredenheid) in gebruik, maar deze vallen buiten de scope van deze tech scan.

Afgebouwd: HubSpot (januari 2026), Planbition (eind maart 2026), Dynamics Sales (gemigreerd naar AFAS CRM). De marketing- en content-automationstool die HubSpot vervangt is nog niet gekozen.

### AI-adoptie: al in beweging

Anders dan bij veel organisaties waar AI beschikbaar is maar niet geactiveerd, heeft Draaijer Heyday al een actief agent-ecosysteem:

- **Billy** (factuurverwerking) — volledig uitgerold, geen pilot meer. Scant mailboxen, herkent facturen en stuurt deze automatisch naar het juiste systeem. Custom gebouwd door Flowmatic.
- **Bonnie AI** (voice-agent) — exclusieve samenwerking met Bonnie AI voor inzet in de facilitaire sector. Operationeel bij Multiline, proof of concept voor Integrated Business. Wordt gezien als bouwsteen voor bredere service-orkestratie.
- **Heydi** (servicedesk-assistent) — leest mailbox, raadpleegt FAQ en Facilitor, stelt antwoord en activiteit voor aan de servicedeskmedewerker. Custom gebouwd door Flowmatic op LLMs via Azure. Doorontwikkeling naar Heydi 2.0 gepland.
- **Facilitor native AI** — meerdere AI-features beschikbaar in recente versies: automatische onderwerpgeneratie voor meldingen, samenvattingen bij afronding, kennisbankartikelen uit incidenten, en geautomatiseerde taakomschrijvingen voor werkorders. Wordt geëvalueerd voor bredere uitrol.
- **Brainial** (tenderondersteuning) — actief bij Commercie. Een van de meest concrete commerciële AI-initiatieven, gericht op het sneller en consistenter opstellen van offertes en tenders met hergebruik van kennis.
- **AI in Genesys** — AI-functionaliteit binnen het klantcontactplatform van Multiline. Wordt doorontwikkeld richting agent assist en hybride service.
- **Schoolreisje 2.0** — digitale, gamified werkvorm voor scholen, in ontwikkeling bij Consultancy. Doorontwikkeling als schaalbare propositie, Flowmatic als mogelijke bouwpartner.
- **Lovable-pilots** — dashboards en apps bij Consultancy en Vastgoedexploitatie. Pionierfase, verkenning van no-code AI-tooling.

Copilot is breed beschikbaar: circa 250 betaalde licenties (meer dan 25% van de medewerkers). Chat is beschikbaar voor iedereen in de tenant. Er vindt kwartaallijks een gebruiksreview plaats met licentie-terugvordering bij non-gebruik. Het gebruik is overwegend persoonlijke productiviteit; procesmatige inzet ontbreekt. De Azure AI-omgeving en Copilot Studio vormen de technische basis voor eigen of partnergedreven AI-oplossingen.

Trainingen lopen via meerdere kanalen: circa 90 medewerkers via het legacy Draaijer-platform, 50-60 via een externe partij (Heyday-zijde), en een lopend Let's Copilot initiatief (gamified AI e-learning, wordt onderzocht voor bredere uitrol). De organisatie scoort hoog op enthousiasme (4,33/5) en bereidheid tot pilots (4,21/5), maar laag op ervaren aanmoediging door management (2,83/5).

Niet-Microsoft AI-tools worden niet geblokkeerd. Er zijn richtlijnen (geen PII, geen bedrijfsgevoelige data), maar geen formeel verbod. De pragmatische positie: "een wapenwedloop die je niet wint."

---

## 3. Cross-system inzichten

### 3.1. De activatiekloof — omgekeerd

Bij de meeste organisaties is de centrale bevinding: "de tools zijn klaar, niemand heeft ze aangezet." Bij Draaijer Heyday is het beeld omgekeerd: er worden al custom agents gebouwd (niveau 3) terwijl de ingebouwde AI-features onbenut blijven (niveau 1).

**Jonas:** niet geactiveerd. Bewuste keuze: wachten tot het AFAS-fundament stabiel is. Maar Jonas is inbegrepen in de licentie (fair-use model). Wanneer het moment komt, is het een configuratie-exercitie, geen implementatieproject. Met Profit 8 (juni 2026) wordt Jonas beschikbaar in alle workflows.

**Facilitor native AI:** meerdere AI-features zijn beschikbaar in recente versies (onderwerpgeneratie, samenvattingen, kennisbankartikelen, taakomschrijvingen), maar worden nu pas geëvalueerd voor bredere uitrol. Ondertussen doet Heydi (gebouwd door Flowmatic) het zware werk op Facilitor-data.

**Copilot:** 250 licenties, overwegend voor persoonlijke productiviteit. Het potentieel in Excel, Word, Outlook en Teams voor procesmatige ondersteuning is grotendeels onbenut. Copilot Studio, waarmee custom agents gebouwd kunnen worden, is beschikbaar maar nauwelijks actief.

De kloof: Draaijer Heyday bouwt custom agents sneller dan het de tools activeert waarvoor het al betaalt.

### 3.2. Agent governance: de ontbrekende laag

Bij Draaijer Heyday zijn er drie routes waarlangs AI-agents ontstaan:

- **Flowmatic** (externe bouwpartner) — bouwt en beheert custom agents voor cross-system workflows (Billy, Heydi). Bonnie AI is een aparte partij met een exclusieve samenwerking.
- **Copilot Studio** — beschikbaar via Microsoft, maar minder actief ingezet
- **Native app-AI** — Facilitor's eigen AI-features, toekomstig AFAS Jonas

Er bestaat een impliciet besliskader dat in de praktijk al wordt gehanteerd:

- Binnen één applicatie, dicht bij het kernproces → gebruik native AI (bijvoorbeeld Facilitor's meldingverwerking)
- Cross-system, multi-stap → externe bouwpartner (Flowmatic) (bijvoorbeeld Billy, Heydi)

Agents draaien onder Entra ID service-accounts met gedefinieerde rollen. App-niveau permissies bepalen de in-app acties. De Azure-omgeving fungeert als compliance-vriendelijke AI-runtime.

Wat ontbreekt: een formeel beleidsdocument, een selectiecriteria-matrix, en een security review checklist voor nieuwe agents. Het bestaande impliciete framework is solide. Het hoeft alleen opgeschreven te worden. Daarbij is het relevant dat de afhankelijkheid van Flowmatic als externe bouwpartner wordt meegewogen: wat wordt uitbesteed, wat wordt intern beheerd, en hoe ziet de exit-strategie eruit.

### 3.3. Het Microsoft-ecosysteem als versneller

Microsoft is de rode draad voor individuele productiviteit: Teams, Outlook, Excel, Word, Power BI. Allemaal Copilot-enabled. Elke applicatie heeft een eigen Copilot-assistent die is afgestemd op de context van die tool. De herkenbare interface en uniforme merknaam verlagen de drempel voor gebruikers.

Met circa 250 betaalde licenties is de dekking hoog, meer dan 25% van de medewerkers. Maar het gebruik is overwegend persoonlijke productiviteit, niet procesmatig.

De stap naar procesgerichte Copilot-inzet (Copilot Studio-agents, Teams-integraties, domeinspecifieke prompt-templates) is de grootste kans op korte termijn. Uit de AI Readiness Survey blijkt dat medewerkers hier klaar voor zijn: de trainingsbereidheid scoort 4,00/5, maar de zelfinschatting van vaardigheden slechts 3,21/5. Het ontbreekt niet aan motivatie maar aan begeleiding.

Azure fungeert als de compliance-vriendelijke AI-runtime: de door Flowmatic gebouwde agents draaien al op LLMs via Azure. Toekomstige agents zouden dit patroon moeten volgen voor data-residency en aansluiting bij de lopende ISO 27001 certificering.

### 3.4. De AFAS-stabilisatiezone

Alles wat AFAS raakt (HR, finance, CRM) is in beweging. De abonnementsfacturatie is net geïntroduceerd met nieuwe werkprocessen; medewerkers passen zich nog aan. De nieuwe HR-directeur is net gestart en heeft nog geen toolvisie. Sales en marketing hebben hoge ambities maar minder focus op het fundament.

Concreet: geen AI-aanbevelingen die AFAS-herconfiguratie vereisen, afhankelijk zijn van Jonas, of complexiteit toevoegen aan HR- en financeteams gedurende de stabilisatiefase. Heroverweeg in Q3 2026, wanneer Profit 8 beschikbaar is en het fundament bewezen stabiel is.

Maar: klantgerichte BU-processen (Integrated, Multiline) zijn volwassen en goed begrepen. Die zijn ideaal voor voortgezet AI-werk. De stabilisatiezone is geen argument om niets te doen, wel om het juiste te doen op de juiste plek.

### 3.5. Open keuzes in het applicatielandschap

**HubSpot-vervanging:** onbekend. De marketing- en content-automatiseringsstack is nog niet bepaald. Geen AI-investering hier totdat de keuze is gemaakt.

**Tagetik:** rapportage blijft (ADG-vereiste), financial planning vertrekt. Korte-termijn AI-wins zijn mogelijk maar niet strategisch. Investeer hier niet diep.

**ATS versus AFAS HR:** de rolafbakening wordt nog bepaald. AI-mogelijkheden bestaan (vacatureteksten genereren, CV-screening), maar kunnen verschuiven met de visie van de nieuwe HR-directeur.

**Hospitality-planning:** uitbesteed aan een externe partij. Minimaal AI-oppervlak vanuit Draaijer Heyday-perspectief.

Zolang deze keuzes niet gemaakt zijn, adviseren wij geen AI-investeringen in deze domeinen. De kans is te groot dat inspanningen verloren gaan bij een platformwissel.

---

## 4. Wat zit er in de gereedschapskist?

### 4.1. Overzichtstabel

| Applicatie | AI Maturity | AI-assistent | Kernverhaal | Status bij DHG |
|---|---|---|---|---|
| **AFAS ERP** | High | Jonas | OCR, speech-to-text, documentanalyse, workflow-automatisering. Inbegrepen in licentie. | Beschikbaar, niet geactiveerd. Wacht op stabilisatie. |
| **AFAS HR** | High | Jonas | CV-screening, CAO-analyse, dossiersamenvatting, medewerkersvragen. | Beschikbaar, niet geactiveerd. Nieuwe HR-directeur moet visie bepalen. |
| **Facilitor** | Medium | Eigen AI + externe agents | Contract/financieel/operationeel management. Native AI-features voor meldingen, werkorders en kennisbeheer + externe agents (Heydi). | Private SaaS. Native AI beschikbaar, externe agents actief. |
| **M365 / Copilot** | High | Copilot | Breed ecosysteem: Teams, Outlook, Excel, Word. Copilot Studio voor custom agents. | ~250 licenties, persoonlijk gebruik. Geen procesmatige inzet. |
| **Power BI / DW** | High | Copilot | Natuurlijke-taalvragen op dashboards. Fabric als strategisch dataplatform. | In gebruik. BI-team actief met data en AI. |
| **Flowmatic** | N/A (vendor) | N/A | Externe bouwpartner voor custom agents. Billy en Heydi gebouwd door Flowmatic. | Primaire bouwpartner. Custom agents op Azure. |

### 4.2. Wat valt op?

**Leveranciers investeren volop:** de meeste onderzochte tools hebben een actieve AI-roadmap. AFAS brengt Profit 8 uit in juni 2026 met AI in alle workflows. Microsoft breidt Copilot continu uit met agents en diepere integraties. Facilitor voegt native AI-features toe. AI komt naar deze tools, of je wilt of niet. De organisatie moet er klaar voor zijn wanneer het zover is.

**Jonas en Copilot: twee AI-assistenten, nul structurele activatie.** De twee meest directe kansen: Jonas in AFAS en Copilot in het Microsoft-ecosysteem, zijn allebei beschikbaar en allebei niet structureel ingezet. Dit zijn geen tools die geïmplementeerd moeten worden. Ze staan klaar. Jonas is inbegrepen in de AFAS-licentie (fair-use model). Copilot-licenties zijn er al voor meer dan 250 gebruikers.

**Het AI-ecosysteem bewijst dat het concept werkt.** Billy, Heydi, Bonnie AI, Brainial en de AI in Genesys leveren aantoonbaar waarde op uiteenlopende domeinen. Dat het concept werkt is bewezen. Wat ontbreekt is standaardisatie, beheer en opschaling.

**Facilitor is een unieke positie.** Als private SaaS met dedicated instances heeft Draaijer Heyday meer controle dan bij standaard SaaS-tools. De native AI-features (meldingen, werkorders, kennisbeheer) plus de externe agent-integraties (Heydi) maken Facilitor tot een van de meest AI-rijke applicaties in het landschap, al is die rijkdom verspreid over meerdere lagen.

### 4.3. Waar gaan de leveranciers naartoe?

**AFAS bereidt Profit 8 voor (juni 2026):** Jonas in alle workflows, CV-parsing, AI talent matching, en een Jonas Insights Dashboard voor gebruiksanalyse. Wie nu begint met Jonas is voorbereid op wat komt.

**Microsoft evolueert Copilot van assistent naar agent.** Copilot Studio maakt custom agents mogelijk op eigen data. Azure AI Foundry wordt de basis voor geavanceerde AI voorbij de standaard Copilot. Microsoft beweegt van passieve assistent naar actieve agent die taken uitvoert.

**Facilitor breidt native AI-features uit.** Na de eerste generatie features (onderwerpgeneratie, samenvattingen, kennisbankartikelen, taakomschrijvingen) liggen spraakgestuurde reserveringssystemen, verbeterde zoekfunctionaliteit en dagsamenvattingen op de roadmap. De combinatie met externe agents (gebouwd door Flowmatic) biedt een uniek hybride model.

---

## 5. Vervolgstappen en randvoorwaarden

### 5.1. Drie stappen

#### Stap 1: Agent governance formaliseren (niveau: Organiseren)

Documenteer het bestaande impliciete agent platform selectiekader. Eén pagina beslisframework: wanneer native AI, wanneer een externe bouwpartner (Flowmatic), wanneer Copilot Studio. Definieer een security baseline voor nieuwe agents: Entra ID service-accounts, data-residency in Azure, aansluiting bij ISO 27001.

**Wat is eenvoudig:** het kader bestaat al in de praktijk. Het opschrijven ervan is een kwestie van documentatie, niet van uitvinding. Eén werksessie met IT en de Innovatiemanager volstaat.

**Wat is niet eenvoudig:** ervoor zorgen dat het kader ook wordt nageleefd wanneer de druk toeneemt om snel nieuwe agents te bouwen. Governance moet licht genoeg zijn om niet te vertragen, maar stevig genoeg om risico's te beheersen.

#### Stap 2: Facilitor native AI breed uitrollen (niveau 1: Activeren + niveau 2: Inrichten)

De native AI-features zijn bewezen in recente versies: automatische onderwerpgeneratie, samenvattingen bij afronding, kennisbankartikelen en taakomschrijvingen voor werkorders. Rol deze uit naar alle klant-instances waar meldingverwerking en werkorderbeheer plaatsvinden.

**Wat is eenvoudig:** de feature bestaat al. Het is een configuratie-actie per instance, geen ontwikkelproject. Operationeel risico is laag: de tool werkt binnen de bestaande private SaaS-omgeving.

**Wat is niet eenvoudig:** de uitrol naar meerdere klant-instances vereist afstemming met Facilitor als leverancier en met de operationele teams per klant. De planning moet rekening houden met de doorlooptijd van versie-updates bij private SaaS.

#### Stap 3: Copilot van persoonlijk naar procesmatig (niveau 1: Activeren + niveau 2: Inrichten)

Met 250 licenties is de infrastructuur er al. Identificeer 3-5 processpecifieke Copilot use cases per BU (voorbij persoonlijke productiviteit). Denk aan: data retrieval en voorstelondersteuning bij Consultancy, servicedesksamenvattingen bij Multiline, contractanalyse bij Integrated.

**Wat is eenvoudig:** de licenties zijn er. De tools zijn beschikbaar. Er zijn al enthousiastelingen in de organisatie die als champion kunnen fungeren.

**Wat is niet eenvoudig:** procesmatig gebruik vereist geen generieke "wat is AI"-training maar gerichte begeleiding: "open dit document, doe deze prompt, controleer dit resultaat." Dat vergt investering in domeinspecifieke prompt-templates en begeleiding door power users. Uit de survey blijkt dat medewerkers hier om vragen (4,00/5 trainingsbereidheid) maar het niet krijgen (2,83/5 managementaanmoediging).

> **Parkeerplaats: Jonas-activatie.** Klaar wanneer het AFAS-fundament stabiel is, geschat Q3 2026 na de release van Profit 8. Dat betekent niet wachten met alles, wel Jonas-activatie niet forceren in een instabiele omgeving.

### 5.2. Randvoorwaarden

**AFAS-stabilisatie als harde grens.** Geen AI-aanbevelingen die AFAS-configuratie raken totdat het fundament bewezen stabiel is. Dit geldt ook voor Jonas-activatie.

**Agent security baseline.** Elke nieuwe agent moet draaien onder een Entra ID service-account, gebruik maken van Azure-hosted LLMs en een gedefinieerd data-toegangsbereik hebben. Dit is formalisatie van wat al wordt gepraktiseerd.

**Capaciteit IT-team.** Het BIS-team beheert de ISO 27001 audit, de AFAS-stabilisatie en absorbeert de vereisten van de nieuwe HR-directeur. Aanbevelingen moeten zero-overhead zijn voor IT of expliciet gebudgetteerd. Dit rapport doet geen voorstellen die het IT-team belasten zonder die belasting te benoemen.

**Proceseigenaar-betrokkenheid.** HR-onderwerpen via HR, finance via finance. De route door de organisatie is minstens zo belangrijk als de technische implementatie. De interviews bevestigen dat bij elke stafafdeling bereidheid bestaat, maar het mandaat en de prioriteit vaak ontbreken.

**Adoptie passend bij de doelgroep.** Consultants adopteren snel. Servicedeskmedewerkers hebben "als je dit intypt, krijg je dit"-demonstraties nodig. Hospitality-medewerkers op locatie: minimaal AI-oppervlak. Van de circa 250 medewerkers in directe uitvoering hebben de meesten geen tools anders dan e-mail en AFAS voor verlofaanvragen.

---

## Appendix A: AI Maturity Scoring

Elke applicatie is beoordeeld op drie criteria:

| Criterium | Wat we meten | Waarom het ertoe doet |
|---|---|---|
| **Branded AI-assistent** | Heeft de leverancier een eigen, herkenbare AI-assistent gelanceerd? | Een branded assistent (Jonas, Copilot, Breeze) verlaagt de activatiedrempel en signaleert serieuze investering. |
| **Generatieve AI-diepte** | Gaat de AI verder dan klassieke ML? Genereert het content, analyses of aanbevelingen? | Generatieve AI biedt bredere toepassingen dan alleen classificatie of scoring. |
| **Zichtbare AI-roadmap** | Communiceert de leverancier actief over toekomstige AI-features? | Een actieve roadmap biedt zekerheid dat investeringen in de tool rendement blijven opleveren. |

De scores:

| Score | Betekenis |
|---|---|
| **High** | Branded AI-assistent aanwezig, generatieve AI beschikbaar, actieve roadmap. Direct klaar voor activatie. |
| **Medium** | AI-features aanwezig maar beperkt in scope of diepte, of roadmap nog in ontwikkeling. Activatie mogelijk maar met beperkingen. |
| **Low** | Geen of minimale AI-features. Waarde primair als databron, niet als AI-tool. |

Deze scoring wordt gecombineerd met het drie-niveaus framework (Activeren, Inrichten, Bouwen) om per applicatie de meest logische activatievolgorde te bepalen. Een applicatie met een High score én een lage huidige activatiegraad is een directe kandidaat voor niveau 1 (Activeren).

---

## Appendix B: Per-applicatie analyse

### B.1 AFAS ERP — Jonas

**AI Maturity:** High

**Mogelijkheden:** Jonas is de AI-assistent van AFAS, inbegrepen in de licentie (fair-use model). Huidige functies omvatten OCR voor documentherkenning, speech-to-text voor het dicteren van notities, workflow-reacties op basis van signalen, en documentanalyse. Jonas kan vragen beantwoorden over financiële data, verlofoverzichten genereren en eenvoudige analyses uitvoeren binnen de Profit-omgeving.

**Roadmap:** Profit 8 (verwacht juni 2026) brengt Jonas naar alle workflows: CV-parsing, AI talent matching, factuurverwerking, en een Jonas Insights Dashboard voor gebruiksanalyse. AFAS positioneert Jonas als integraal onderdeel van het platform, niet als add-on.

**Beperkingen:** Jonas werkt uitsluitend binnen de AFAS-omgeving. Cross-system intelligentie vereist externe integratie. De kwaliteit van output hangt af van de datakwaliteit in AFAS, en die is bij Draaijer Heyday nog in opbouw na de migratie. Daarnaast zijn niet alle Jonas-features even ver: sommige zijn productierijp, andere nog in preview.

**Status bij DHG:** Beschikbaar maar niet geactiveerd. Bewuste keuze: het AFAS-fundament moet eerst stabiel zijn. De verwachte activatie is Q3 2026, na stabilisatie en na beschikbaarheid van Profit 8.


### B.2 AFAS HR — Jonas

**AI Maturity:** High

**Mogelijkheden:** Jonas biedt HR-specifieke functies: CV-screening en -matching, CAO-analyse en -interpretatie, dossiersamenvatting, en het beantwoorden van medewerkersvragen over regelingen, verlof en arbeidsvoorwaarden. In combinatie met InSite-portals kan Jonas self-service voor medewerkers versterken.

**Roadmap:** Profit 8 voegt AI talent matching toe, verbeterde CV-parsing en intelligentere onboarding-workflows. AFAS positioneert Jonas steeds nadrukkelijker als HR-copilot voor zowel HR-professionals als medewerkers.

**Beperkingen:** HR-data is bij Draaijer Heyday nog in opbouw. De nieuwe HR-directeur (gestart maart 2026) moet eerst haar visie op het HR-toollandschap bepalen. Vroegtijdige activatie van Jonas in HR kan leiden tot verwarring als de processinrichting nog verandert.

**Status bij DHG:** Beschikbaar, niet geactiveerd. De timing hangt af van twee factoren: AFAS-stabilisatie en de HR-directeur's toolvisie.


### B.3 Facilitor

**AI Maturity:** Medium

**Mogelijkheden:** Facilitor biedt meerdere native AI-features: automatische onderwerpgeneratie voor meldingen, AI-gegenereerde samenvattingen bij het afsluiten van incidenten, kennisbankartikelen die automatisch worden aangemaakt uit incidentoplossingen, en geautomatiseerde taakomschrijvingen bij het omzetten van meldingen naar werkorders. Alle AI-gegenereerde content blijft bewerkbaar. Facilitor draait hiervoor op een eigen Azure-omgeving binnen Europa (GDPR-compliant). Daarnaast fungeert Facilitor als databron voor externe agents: Heydi raadpleegt Facilitor FAQ en data om servicedeskmedewerkers te adviseren.

**Roadmap:** Facilitor breidt de native AI-features uit. Gecommuniceerde richtingen: spraakgestuurde reserveringssystemen (AI-agents), verbeterde zoekfunctionaliteit en geautomatiseerde dagsamenvattingen. De combinatie van native features en externe agent-integratie maakt Facilitor tot een hybride AI-platform.

**Beperkingen:** Als private SaaS is de updatecyclus afhankelijk van Facilitor als leverancier. Niet alle instances draaien dezelfde versie; grotere klanten krijgen sneller updates dan multi-client omgevingen. De externe agent-integratie (gebouwd door Flowmatic) voegt complexiteit toe die niet door Facilitor wordt beheerd.

**Status bij DHG:** Native AI-features worden geëvalueerd voor bredere uitrol. Heydi is actief als externe agent op Facilitor-data. De combinatie werkt, maar de governance over de grens tussen native en externe AI is informeel.


### B.4 Microsoft 365 / Copilot

**AI Maturity:** High

**Mogelijkheden:** Copilot is beschikbaar in het volledige Microsoft-ecosysteem: samenvattingen en actiepunten in Teams, e-mailverwerking in Outlook, data-analyse in Excel, documentcreatie in Word, en presentaties in PowerPoint. Copilot Studio maakt het mogelijk om custom agents te bouwen op organisatie-eigen data. Azure AI Foundry biedt de runtime voor geavanceerde AI-scenario's.

**Roadmap:** Microsoft investeert zwaar in de transitie van Copilot als assistent naar Copilot als agent. Copilot Studio wordt het platform voor organisatie-specifieke agents. Azure AI Foundry vervangt geleidelijk de huidige AI-infrastructuur. Het eindbeeld: niet één assistent, maar een ecosysteem van gespecialiseerde agents.

**Beperkingen:** Copilot levert de meeste waarde wanneer documenten op SharePoint/OneDrive staan en goed zijn gestructureerd. Bij Draaijer Heyday is de informatiestructuur na de fusie nog in opbouw. Daarnaast is de stap van persoonlijk naar procesmatig gebruik niet technisch maar organisatorisch: het vereist domeinspecifieke prompt-templates, werkafspraken en begeleiding.

**Status bij DHG:** ~250 betaalde licenties, chat beschikbaar voor iedereen. Gebruik is persoonlijke productiviteit, niet procesmatig. Copilot Studio nauwelijks actief. De grootste kans zit in de verschuiving van persoonlijk naar procesmatig gebruik.


### B.5 Power BI / Azure Data Warehouse

**AI Maturity:** High

**Mogelijkheden:** Copilot in Power BI maakt natuurlijke-taalvragen op dashboards mogelijk. Microsoft Fabric biedt als strategisch dataplatform geavanceerde analytics, ML-integratie en AI-gedreven inzichten. Het BI-team van Draaijer Heyday is al actief met data- en AI-toepassingen.

**Roadmap:** Microsoft positioneert Fabric als de volgende generatie van het dataplatform. AI wordt geïntegreerd in de volledige data-pipeline: van ingestie tot rapportage. Copilot in Power BI wordt steeds krachtiger in het genereren van inzichten en het beantwoorden van complexe vragen.

**Beperkingen:** De Tagetik-splitsing (rapportage blijft, planning vertrekt) creëert een overgangsperiode. De datakwaliteit in het Azure Data Warehouse is afhankelijk van de upstream-systemen (AFAS, Facilitor). Het BI-team heeft beperkte capaciteit naast de lopende basistrajecten.

**Status bij DHG:** Actief in gebruik. BI-team is de meest AI-rijpe groep binnen de organisatie. Tagetik wordt gesplitst. De transitie naar Fabric als strategisch platform is een logische toekomstrichting.


### B.6 Flowmatic (Externe bouwpartner)

**AI Maturity:** N/A — vendorbeoordeling

**Rol:** Flowmatic is de externe partij die custom AI-agents bouwt en beheert voor Draaijer Heyday. Het is geen applicatie in het landschap maar een bouwpartner die cross-system agents realiseert waar native tooling niet volstaat. Billy (facturatie) en Heydi (servicedesk) zijn door Flowmatic gebouwd en worden door hen onderhouden.

**Architectuur (op basis van interviews):** De agents draaien op LLMs via Azure onder Entra ID service-accounts. App-niveau permissies bepalen de acties per agent. De keuze voor Azure als runtime sluit aan bij de bredere Microsoft-strategie en de lopende ISO 27001 certificering. *N.B. Deze architectuurbeschrijving is gebaseerd op informatie uit stakeholder-interviews en de Foundation Workshop. Een technische verificatie van de exacte architectuur is niet uitgevoerd in deze scan.*

**Sterkte:** Flowmatic heeft bewezen dat het model werkt. Billy en Heydi leveren aantoonbare waarde in de dagelijkse operatie. De samenwerking biedt flexibiliteit voor cross-system workflows die native tools niet kunnen leveren.

**Aandachtspunten:** De governance is informeel. Er is geen formeel selectiekader dat bepaalt wanneer Flowmatic een agent bouwt versus wanneer native AI of Copilot Studio de voorkeur verdient. Daarnaast is er afhankelijkheid van Flowmatic als externe partij voor doorontwikkeling, onderhoud en ondersteuning. De Heydi 2.0 ontwikkeling is in voorbereiding.


---

## Appendix C: Drie voorbeelden uit de praktijk ter inspiratie

### C.1 De servicedesk-medewerker die niet meer zoekt

**Nu:** Een servicedesk-medewerker ontvangt een e-mail van een klant. Ze opent Facilitor, zoekt handmatig in de FAQ, raadpleegt het contractdossier, en formuleert een antwoord. Doorlooptijd: 10-15 minuten per vraag. Bij complexe vragen langer.

**Met de mail-analyse agent (Heydi):** De agent leest de mailbox, herkent het type vraag, raadpleegt automatisch de Facilitor FAQ en relevante contractdata, en stelt een antwoord plus activiteit voor. De medewerker controleert, past aan indien nodig, en verzendt. Doorlooptijd: 2-3 minuten per vraag.

**Volgende stap:** De agent verzendt zelfstandig bij een voldoende hoge confidence score. De medewerker escaleert alleen uitzonderingen. Dit vereist het instellen van confidence-drempels en een monitoringsproces.

**Niveau:** Al op Bouwen (niveau 3). Optimalisatie = confidence thresholds, monitoring en uitbreiding naar meer mailboxen en domeinen (HR, Finance, IT).

### C.2 De melding die zichzelf opschoont

**Nu:** Een monteur registreert een melding met een korte, ruwe omschrijving. "Cv ketel nagekeken, drukventiel vervangen, was lek. Klant was niet thuis, sleutel bij buren opgehaald." Deze melding wordt omgezet naar een werkorder voor een leverancier — met de ruwe tekst als taakomschrijving.

**Met Facilitor native AI:** Bij het omzetten van de melding naar een werkorder genereert Facilitor automatisch een professionele taakomschrijving. Daarnaast krijgt de melding automatisch een helder onderwerp en wordt bij afronding een samenvatting gegenereerd. De medewerker controleert en past aan waar nodig — alle AI-output blijft bewerkbaar.

**Vereist:** Recente Facilitor-versie met native AI-features. Configuratie door de Facilitor-beheerder per klant-instance. Geen extern platform nodig — Facilitor draait op een eigen Azure-omgeving binnen Europa.

**Niveau:** Activeren (niveau 1) + Inrichten (niveau 2). De features bestaan al. Het is een kwestie van uitrollen en configureren.

### C.3 De consultant die met data in gesprek gaat

**Nu:** Een consultant bereidt een adviesgesprek voor. Ze opent het projectdossier in SharePoint, doorzoekt handmatig eerdere rapporten, kopieert relevante paragrafen naar een Word-document, en bouwt een presentatie op basis van losse fragmenten. Doorlooptijd: 2-4 uur voorbereiding per gesprek.

**Met Copilot (procesmatig):** De consultant opent het projectdossier en vraagt Copilot: "Vat de belangrijkste bevindingen samen uit de laatste drie kwartaalrapportages." Copilot genereert een samenvatting. Vervolgens: "Vergelijk deze resultaten met de benchmarks uit het adviesrapport van vorig jaar." Copilot maakt de vergelijking. De consultant interpreteert, voegt haar eigen analyse toe, en bouwt het advies op.

**Vereist:** Copilot-licentie (beschikbaar), documenten op SharePoint (in opbouw na fusie), en domeinspecifieke prompt-templates die de consultant helpen om de juiste vragen te stellen. Het verschil zit niet in de technologie maar in de begeleiding.

**Niveau:** Activeren (niveau 1) — de licentie is er al. Inrichten (niveau 2) — templates en begeleiding door power users. De training die medewerkers vragen (4,00/5 bereidheid) moet hier worden ingezet.

---

*Dit rapport is opgesteld door Tatoma in het kader van de Foundation Sprint voor Draaijer Heyday Group, april 2026. De analyses zijn gebaseerd op interviews met zeven stakeholders, een AI Readiness Survey (n=24), een Foundation Workshop, leveranciersonderzoek en een intake-sessie met het BIS-team. De per-applicatie analyses zijn indicatief en gebaseerd op publiek beschikbare informatie en leverancierscommunicatie ten tijde van het onderzoek.*
