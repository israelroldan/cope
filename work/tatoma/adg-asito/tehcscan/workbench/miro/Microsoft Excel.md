# Microsoft Excel
**Analytics & BI | System of Record | Workflow** | **Rol:** Analyses, ad-hoc rapportages, financiële modellering
**AI Maturity: High** · **AI: Copilot**

---

## KEY DETAILS

- **Alomtegenwoordig bij Asito:** Excel is de standaard tool voor ad-hoc analyses, berekeningen, planning en rapportages. Niet een kernsysteem, maar wel in vrijwel alle ketenprocessen aanwezig (Record-to-Report, Service-to-Cash, Order-to-Service, Lead-to-Order).

- **Microsoft 365 Copilot licenties al beschikbaar:** Asito heeft 50-100 Copilot licenties. Dit is de snelste quick win omdat de licenties al aanwezig zijn en gekoppeld aan het lopende Microsoft 365 Copilot project. Geen extra investeringen nodig.

- **Breed gebruikersprofiel:** Van financieel medewerkers (analyses, rapportages) tot operationeel management (planning, berekeningen) tot HQ-staff (offertes, calculaties, varianceanalyses). Bijna iedereen gebruikt Excel, maar met variabele AI-vaardigheid.

- **Hybrid deployment met cloud-vereisten:** Desktop, Web, en mobiel beschikbaar. AI-features vereisen OneDrive/SharePoint en AutoSave. Lokale netwerkschijven werken niet voor Copilot. Dit vraagt om data governance aanpassing.

- **Onderdeel van M365-strategie:** Excel is direct gekoppeld aan Microsoft 365-adoptie en het Copilot-project. Winning Move 1 ("Training→Transformatie") is rechtstreeks toepasselijk: maak Copilot beschikbaar, train gebruikers, zie transformatie gebeuren.

---

## KEY AI CAPABILITIES

- **Copilot & Agent Mode:** Copilot genereert formules uit natuurlijke taal. Agent Mode (nieuw, eind 2025) voert multi-stap taken autonoom uit: bouwt tabellen, schrijft formules, maakt grafieken, valideert resultaten. Dit is het vlaggenschip-feature voor Asito's ad-hoc analyses.

- **Formulegeneratie in natuurlijke taal:** Gebruikers beschrijven berekeningen in Nederlands (bijv. "Bereken omzetgroei YoY") en Copilot genereert correcte syntax. Perfect voor HQ-calculaties en payroll-varianceanalyses zonder handmatig formule-schrijven.

- **Data opschonen & transformatie:** Automated Insights detecteren trends en anomalieën. Data Cleaning (duplicaten verwijderen, kolommen splitsen, datumformaten standaardiseren) is ideaal voor de vele handmatige, eiland-Excel-bestanden bij Asito. Insert Data from Picture digitaliseert papieren documenten via OCR.

- **Agent Mode voor multi-stap analyses:** Ideaal voor Asito's complexe bedrijfsprocessen. Voorbeeld: AFAS-payrolldata importeren → anomalieën identificeren → rapportage genereren → resultaten valideren - alles in één conversatie, autonoom.

- **Python in Excel voor geavanceerde modellen:** Gebruikers voeren Python (pandas, statsmodels) rechtstreeks in het grid uit. Perfect voor ORTEC-schedulingoptimalisatie, forecasting, en voorspellende modellen zonder externe tools.

- **Natural Language analyse & Smart Data Types:** Vraag Copilot om trends te identificeren, grafieken te genereren, of categorieën toe te wijzen (bijv. klanttevredenheidssurveys) via natuurlijke taal. Geen SQL of complexe formules nodig.

---

## API AVAILABILITY & INTEGRATIONS

- **Microsoft 365 Graph API & Power Automate:** Excel-workbooks kunnen worden geactiveerd via Power Automate triggers. Ideaal voor automatisering van rapportopstelling, gegevenssynchronisatie tussen AFAS/ORTEC en Excel-analysebestanden.

- **Verbinding met Asito's dataplatform:** Excel kan via Power Query gegevens rechtstreeks uit AFAS (HR, Payroll) en ORTEC (Scheduling) importeren. Elimineert handmatig exporteren/importeren. OneDrive/SharePoint als centrale opslagplaats voor samenwerking.

- **VBA & Office Scripts voor legacy-integraties:** Bestaande macro's en automatisering kunnen behouden blijven, maar Office Scripts (moderne vervanger) worden aanbevolen voor cloud-eerste workflows en onderhoudbaarheid.

- **Power BI integratie:** Excel blijft "analysescherm"; Power BI wordt "rapportagescherm". Recurring reports migreren naar Power BI, Excel Copilot gebruikt voor ad-hoc, onderzoekend werk.

- **SQL Server, SAP, Salesforce connectors:** Via Power Query kunnen externe datasources worden aangesloten. Voor Asito relevant: koppelingen met andere ADG Dienstengroep-systemen of partner-integraties.

---

## OPPORTUNITIES / USE CASES

- **Record-to-Report · AUTOMATE** :  Payroll varianceanalyse: AFAS-payrolldata → Copilot identificeert maand-op-maand afwijkingen → rapportage auto-genereren.

- **Service-to-Cash · AUTOMATE** :  Order- en facturatiegegevens uit ORTEC/AFAS → Copilot analyseert winstmarges, doorlooptijden, klantwaarschijnlijkheid.

- **Order-to-Service · EDUCATE** :  ORTEC-schedulingdata → Copilot identificeert personeelsgaten, overtijdpatronen, optimalisatiemogelijkheden.

- **Lead-to-Order · EDUCATE** :  Offertes en calculaties: Excel-templates + Copilot voor snelle scenario-bouw. Formulegeneratie doet het zware werk.

- **Record-to-Report · EDUCATE** :  Formulegeneratie quick win: 50-100 Copilot licentiehouders kunnen formulegeneratie in Nederlands gebruiken.

- **Record-to-Report · AUTOMATE** :  Agent Mode voor multi-stap analyses: Dataanalist voert complexe vragen automatisch uit met transparantie.

- **Record-to-Report · AUTOMATE** :  Data cleanup en schaduw-IT-risico: Copilot Cleaning verwijdert duplicaten, standardiseert formaten. Centraliseer critieke bestanden op OneDrive/SharePoint.

---

## CONSTRAINTS & DEPENDENCIES

- **Cloud-afhankelijkheid en data governance:** Copilot werkt ALLEEN op OneDrive/SharePoint (met AutoSave). Lokale netwerkschijven werken niet. Dit vraagt cultuurverandering: gevoelige payroll-data moet naar cloud, wat compliance-reviews en nieuwe policies vraagt. Timing: 2-3 maanden voorbereiding.

- **Excel-tabel-vereiste (Ctrl+T):** Copilot analyseert alleen geformatteerde Excel-tabellen, niet ongestructureerde bereiken. Veel huidige Asito-Excel-bestanden voldoen hier niet aan. Training nodig. Dit is een snelle fix, maar wijdverspreide: ~60-80% van gebruikers moet omgeschoold.

- **Schaduw-IT en datakwaliteit:** Honderden niet-beheerde Excel-bestanden in persoonlijke mappen of teams. Copilot maakt probleem zichtbaar: gaat gebruikers helpen slechte data sneller te analyseren? Zonder data governance zal dit AI-hallucinations versterken. Nodig: beleid rondom "welke Excel-bestanden mogen naar cloud".

- **Copilot licentie-verdeling:** 50-100 licenties voor ~8.000 medewerkers. Triage nodig: wie krijgt eerst? Aanbeveling: financieel/analytisch team (Record-to-Report), dan managementlagen (planning/analyses), dan bredere rollen. Risico: gebruikers voelen zich buitengesloten, willen hun eigen licenties. EDUCATE-strategie kritiek.

- **Vereenvoudiging versus rigiditeit:** Agent Mode genereert formules/analyses die niet 100% deterministisch zijn (AI kan varieert). Niet geschikt voor rigide audit trails of gesloten control-systemen zonder "invriezing" van waarden. Financiële rapportages vereisen human sign-off. Policies moeten duidelijk zijn.

---

## DISCOVERY QUESTIONS

- **Copilot licentie-verdeling & prioriteit:** Wie krijgt de 50-100 beschikbare Copilot-licenties eerst? Wat zijn de selectiecriteria? Hoe voorkomen we adoption-claimen en rivaliteit tussen teams? Aanbeveling voor Albert Jan Frankfort: bepaal "pilot cohort" (bijv. 20-30 power users) voor 2-3 maanden feedback, dan rollout.

- **Meest gebruikte Excel-workflows:** Welke Excel-processen zijn "het ergste" (meest handmatig, meest foutgevoelig, meest zichtbaar in ketenprocessen)? Kans om snelle wins te pakken: AFAS-payroll, ORTEC-planning, HQ-calculaties. Maak prioriteitenlijst van 3-5 workflows voor Copilot-pilots.

- **Schaduw-IT en data-locatie:** Hoeveel Excel-bestanden zijn lokaal / op netwerkschijven vs. al op OneDrive/SharePoint? Wat zijn de "kritieke" bestanden voor business continuity? Hoeveel handelt gevoelige info (payroll, klantgegevens) af? Dit bepaalt implementatietraject.

- **Python in Excel beschikbaarheid & expertise:** Heeft Asito data scientists of power users die Python willen gebruiken? Of is dit een future-state capability? Determineert prioriteit voor INNOVATE-aspect (forecasting, ML-modellen).

- **Agent Mode adoptiebaarheid:** Hoe "klaar" zijn Asito-gebruikers voor agentic workflows (laat AI multi-stap taken afhalen)? Of is dit stap 2 na Copilot-training? Aanbeveling: fase 1 = Copilot chat & formulegeneratie (EDUCATE), fase 2 = Agent Mode (AUTOMATE).
