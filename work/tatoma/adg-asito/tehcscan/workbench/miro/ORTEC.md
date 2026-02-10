# ORTEC
Workforce Scheduling & Optimization Engine | System of Record, Workflow, Analytics
**AI Maturity: Medium** · **AI Engine: TESSA (Employee Self-Service)**

---

## KEY DETAILS

- **Wat:** ORTEC is een gespecialiseerde optimalisatie-engine (1981, 40+ jaar onderzoek) voor roosterplanning die wiskundige optimalisatie en machine learning toepast. Dit is geen bolt-on AI assistant, maar de core engine van het systeem.

- **Cloud-native SaaS op Azure** met mobile app (iOS/Android) voor werknemers. Real-time calculation engine. Ondersteunt Nederlands recht: Arbeidstijdenwet, CAO Schoonmaak, ISO 27001, ISAE 3402.

- **Voor Asito:** ORTEC is gebouwd voor precies dit probleem :  roosteren van duizenden schoonmakers over vele objecten met complexe arbeidswetgeving en hoog verzuim. Facility Services is core vertical (klanten: Albron, G4S).

- **Ketenproces fit:** Roosteren (Schedule Optimizer) → Plannen (Cyclical/Bid Scheduling) → Mutaties roosteren (Smart Replacements) → Dienstverlening (Real-Time Rescheduling).

---

## KEY AI CAPABILITIES

- **TESSA Self-Service App:** Werknemers zien hun rooster, bieden in op shifts, wisselen shifts uit, melden beschikbaarheid op hun telefoon. Mobiel, iOS/Android, Dutch language support. AI regelt conflicten automatisch. 90%+ voorkeur wordt vervuld.

- **Schedule Optimization (Mathematical Optimization):** ORTEC berekent optimale roosters voor duizenden schoonmakers tegelijk. Balanceert: arbeidsregels, CAO, kwalificaties, voorkeur, reistijd, contracturen, ergonomie, overwerk, fairness. Één berekening voor hele team.

- **Demand Forecasting (Machine Learning):** Voorspelt hoeveel schoonmakers met welke vaardigheden nodig zijn per object per dag, op basis van historische patronen, seizoen, contracteisen. Output: benodigde personeelsniveaus per taak/locatie/periode voor accurate planning.

- **Smart Replacement Suggestions:** Zieke werknemer melden → ORTEC stelt in seconden drie gekwalificeerde vervangingen voor (o.b.v. kwalificatie, beschikbaarheid, afstand, uren, arbeidsregels). Voorman tikt één keuze. Voorkwam vroeger 1-2 uur telefoneren.

- **ML Insights & Learning:** ORTEC analyseert gat tussen geplande en daadwerkelijke roosters. Ontdekt: correlatie voorkeur-behoud (werknemers met voorkeuren hebben 30% lager verloop), optimale shift-patronen, rostergezondheidmetrieken.

- **Proactive Staffing Intelligence:** Twee weken vooruit: ORTEC signaleert welke objecten onderbemannd zijn op welke dagen (bijv. trainingen). Planners kunnen preventief aanpassen i.p.v. reactief op crisis reageren.

---

## API AVAILABILITY & INTEGRATIONS

- **AFAS ↔ ORTEC Native Integration:** Bidirectioneel. AFAS → ORTEC: Medewerkers, Verlofsaldi, Ziek-/betermeldingen, Projecten. ORTEC → AFAS: Nacalculatieregels, Verlofboekingen, Werkuren voor salarisverwerking.

- **Appreo → ORTEC Kloktijden:** Kloktijdgegevens vanuit Appreo synchroniseren in ORTEC voor nauwkeurige uren-tracking en naleving. Huiing bezorg-integratie mogelijk.

- **REST APIs** voor custom integraties. Webhooks beschikbaar. Middleware-mogelijkheden voor verdere koppelingen. Azure Marketplace integratie voor clouddeployment.

- **SAP, Microsoft Dynamics, HRIS, Payroll Systemen:** ORTEC ondersteunt standaard koppelingen met groot ERP/HR landschap. JSON/XML data exchange.

- **Real-time Data Sync:** Uren, rooster, beschikbaarheid, verlof synchroniseren live tussen systemen. Geen handmatige export/import, geen dagverlies.

---

## OPPORTUNITIES / USE CASES

- **Order-to-Service · AUTOMATE** :  Contractconstraint-validatie: Voorcalculatieregels uit AFAS zichtbaar in ORTEC roosters. Voormannen zien constraint-overtredingen direct.

- **Order-to-Service · AUTOMATE** :  Urenmismatch-detectie & preventie: ORTEC ML-analyse voorkomt 1000+ mismatches/maand preventief bij rooster-creatie.

- **Order-to-Service · AUTOMATE** :  Vraagprognose + auto-scheduling: ORTEC voorspelt vraag per object en genereert semi-automatische roosters. Bespaard 5-10 uur planning/week.

- **Order-to-Service · AUTOMATE** :  Ziekteverzuim-schokdemping: Smart Replacement AI stelt gekwalificeerde vervanger voor in 30 seconden i.p.v. 1-2 uur handmatig zoeken.

- **Order-to-Service · AUTOMATE** :  Proactieve bezetting: ORTEC signaleert onderbesetting 2 weken vooruit zodat planners preventief kunnen aanpassen.

- **Order-to-Service · EDUCATE** :  TESSA Self-Service App uitrol naar 8000+ schoonmakers. Werknemers leren shifts bieden, beschikbaarheid melden.

- **Order-to-Service · INNOVATE** :  Data-driven rooster-beleid: ORTEC ontdekt shift-combinaties en voorkeur-matches die verloop voorkomen. 30% verloop-verlaging proven.

---

## CONSTRAINTS & DEPENDENCIES

- **Geen IT-herarchitectuur:** ORTEC past in bestaande stack (AFAS, Appreo) via API integraties. Geen Big Bang rewrite. Haalbaar 6-12 maanden scope (pilots Q1, rollout Q2-Q4).

- **Implementatie-complexiteit:** ORTEC vereist stakeholder-workshops (voormannen, projectleiders, HQ) om "goed rooster voor Asito" te definiëren: prioriteiten, constraints, fairness-regels, CAO-normen. Niet plug-and-play. Voorbereiding (jam sessions, data audit) essentieel.

- **Data-kwaliteit kritisch:** Voorcalculatieregels (contracten, kwalificaties, beschikbaarheid) moeten compleet & actueel in AFAS zijn. Sloppy data = suboptimale roosters. Master data cleanup (scope: 8000 employees) nodig.

- **Verandercapaciteit laag (eilandcultuur):** Voormannen & projectleiders roosteren handmatig uit gewoonte, onder tijdsdruk. ORTEC-vertrouwen bouwen vergt communicatie, training, early wins, top-down mandate.

---

## DISCOVERY QUESTIONS

- **ORTEC-versie & -modules:** Welke ORTEC modules zijn beschikbaar in Asito's licentie? (Demand Forecasting, Self-Scheduling, Smart Replacement, Real-Time Rescheduling, Cyclical Scheduling allemaal nodig?)

- **TESSA-activatie:** Is TESSA (Employee Self-Service App) al ingeschakeld en uitgerold naar schoonmakers? Hoe lang duurt mobiele onboarding? App language: Nederlands?

- **API-/integratiestatus:** Zijn AFAS ↔ ORTEC REST APIs al geimplementeerd? Welke data synct bidirectioneel? Zijn lags/fouten in sync bekend (1000+ urenmismatch-oorzaken)?

- **Voorcalculatieregels-integratie:** Kunnen voorcalculatieregels (minimale/maximale uren, contracttypen, flexibiliteit) uit AFAS rechtstreeks in ORTEC-constraints geladen worden, of moeten ze handmatig geconfigureerd?

- **AI-modules beschikbaar:** Welke ML/AI-features zijn licentieafhankelijk? (Demand Forecasting, Smart Replacement, ML Insights, Proactive Intelligence). Welke zijn actief? Kosten voor activatie/uitbreiding?
