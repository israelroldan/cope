# Prototype Briefs — Gynzy Growth Sprint

*Ruwe notities voor Dag 2-3 bouwfase*
*Framework: 3 Domeinen × 3 Niveaus*

---

## Drie Niveaus Model: Minimaal → Haalbaar → Supergreen

Dit is een progressief prototype-scoping framework — elk niveau bouwt voort op het vorige.

---

### Minimaal (De Basis)
**"Bewijs dat het überhaupt kan werken"**

- Kleinst mogelijke proof of concept
- Valideert de kernaanname
- Vaak handmatig of semi-handmatig
- Beantwoordt: "Is deze richting überhaupt levensvatbaar?"

**Tijd:** 3-4 uur

---

### Haalbaar (Het Doel) ⭐
**"Werkend prototype dat we donderdag kunnen demo'en"**

- Het daadwerkelijke sprintdoel
- Functioneel genoeg om te testen met echte gebruikers/data
- Toont het volledige concept, niet slechts een stukje
- Beantwoordt: "Lost dit het probleem op?"

**Tijd:** 6-10 uur

---

### Supergreen (De Droom)
**"Wat het zou kunnen worden als we dit goed doen"**

- Vrijdag stretch-doel
- Ambitieuze uitbreiding
- Toont de visie, niet alleen de MVP
- Beantwoordt: "Wat is het volledige potentieel?"

**Tijd:** 8-12 uur (alleen als Haalbaar solide is)

---

### Waarom Dit Werkt

| Voordeel | Hoe |
|----------|-----|
| **De-riskt de sprint** | Minimaal bewijst levensvatbaarheid voordat je zwaar investeert |
| **Duidelijke prioritering** | Team weet wat te schrappen als tijd opraakt |
| **Managet verwachtingen** | Stakeholders weten dat Haalbaar het doel is, Supergreen is bonus |
| **Maakt parallel werk mogelijk** | Eén persoon kan naar Supergreen pushen terwijl een ander Haalbaar polijst |

---

### De Regel

> **Begin niet aan Supergreen totdat Haalbaar af en gevalideerd is.**

Supergreen zonder Haalbaar is gewoon een demo zonder fundament.

---

## Framework Overzicht

| Domein | Doel | Doelniveau |
|--------|------|------------|
| **1. Data Verrijking & Audience Selectie** | Van platte data naar "Teacher DNA" profiel | Haalbaar |
| **2. NBA Engine** | Van simpele triggers naar Air Traffic Control | Haalbaar |
| **3. Content Factory** | Van handwerk naar gepersonaliseerde content | Haalbaar |

| Niveau | Betekenis |
|--------|-----------|
| **Minimaal** | De Basis — minimaal bewijs dat het werkt |
| **Haalbaar** | Het Doel — sprintdoel ⭐ |
| **Supergreen** | De Droom — vrijdag stretch |

---

# DOMEIN 1: Data Verrijking & Audience Selectie

**Doel:** Van platte data naar een "Teacher DNA" profiel

---

## Niveau: Minimaal (De Basis)

### Wat We Bouwen
Een gedefinieerd datamodel voor één persona (bijv. "De Bord-gebruiker")

**Ruwe context:** Op dit moment bestaat data in silo's — events vanuit de Gynzy frontend, attributen gesynchroniseerd via Census, gedragspatronen in BigQuery. Niemand heeft in kaart gebracht welke data er daadwerkelijk bestaat, wat het betekent, en hoe het samenhangt. Het team maakt segmentatiebeslissingen op basis van tribal knowledge, niet gedocumenteerde datadefinities. Voordat we iets slims kunnen bouwen, moeten we weten welk ruw materiaal we hebben om mee te werken.

**Doelen:** Een Data Dictionary maken die in kaart brengt: welke events van Gynzy (bijv. "Startpagina ingesteld") in profielen terechtkomen, welke Census data (bijv. "Aantal leerlingen") beschikbaar is, wat elk veld betekent, en hoe ze verbonden zijn. Bruikbaar maken voor engineers die het uiteindelijk in productie brengen. Beginnen met één complete persona om te bewijzen dat de aanpak werkt.

**Werkwijze:** Interview met Koen/data team over beschikbare velden → alle events en hun betekenis documenteren → alle Census/Intercom attributen documenteren → in kaart brengen welke velden één persona definiëren (bijv. "Bord-gebruiker") → structureren in Notion/spreadsheet formaat → volledigheid valideren door te checken: "kunnen we deze persona identificeren met deze data?"

**Wat we willen leren:** Welke data bestaat er daadwerkelijk vs. wat we aannamen? Zijn er gaps — signalen die we nodig hebben maar niet hebben? Hoe schoon/betrouwbaar is de data? Wat is de latency (real-time events vs. dagelijkse Census sync)? Heeft het data team bandbreedte om nieuwe velden toe te voegen indien nodig?

**Tijdschatting:** 3-4 uur

---

## Niveau: Haalbaar (Het Doel) ⭐ DOEL

### Wat We Bouwen
Een gevalideerde set van afgeleide metrics — niet alleen "clicks" maar vertaald naar Teacher DNA eigenschappen

**Ruwe context:** Ruwe data (login tellingen, lessen gemaakt, tools gebruikt) vertelt niet wie iemand IS. De magie zit in afgeleide metrics die gedrag vertalen naar betekenis. "Digivaardigheid-score" gebaseerd op feature adoptie patronen. "Structuur-behoefte" gebaseerd op hoe ze planningstools gebruiken. Deze afgeleide scores worden het "Teacher DNA" dat personalisatie aandrijft. In de transcripts werd het "Teacher DNA" concept genoemd — hier definiëren we wat dat daadwerkelijk betekent.

**Doelen:** 4-6 afgeleide metrics definiëren met duidelijke berekeningslogica. Een dummy dataset van 50 fictieve docenten met verrijkte profielen maken met deze metrics. Deze dataset voedt Domein 2 (NBA Engine) voor testing. Bewijzen dat we ruwe gedragsdata kunnen transformeren naar betekenisvolle segmenten zonder handmatige tagging.

**Werkwijze:** Afgeleide metrics definiëren (Digivaardigheid, Structuur-behoefte, Engagement-trajectory, Champion-potential, etc.) → berekeningslogica documenteren voor elk (bijv. "Digivaardigheid = gewogen score van features_used × frequentie × recentheid") → synthetische data generator bouwen (Python script of spreadsheet) → 50 fictieve docenten genereren met realistische verdelingen → valideren met team: "voelt docent #23 als een echt persoon?"

**Wat we willen leren:** Correleren deze afgeleide metrics daadwerkelijk met de realiteit? Kan Annemarie/Maria naar een Teacher DNA profiel kijken en zeggen "ja, dat klopt met wat ik weet over dit type"? Welke metrics zijn het meest voorspellend voor gewenst gedrag (activatie, expansie, churn)? Zijn 4-6 metrics genoeg of hebben we meer/minder nodig?

**Tijdschatting:** 6-8 uur

---

## Niveau: Supergreen (De Droom)

### Wat We Bouwen
Audience is niet langer een statische lijst maar een dynamische cluster — model herkent automatisch gedragsveranderingen

**Ruwe context:** Vandaag zijn segmenten statisch — je krijgt de tag "power user" en blijft zo totdat iemand je handmatig hertagt. Maar docenten evolueren. Een worstelende nieuweling wordt bekwaam. Een power user wordt stil. De droom is segmenten die zichzelf updaten: "Docent X gedraagt zich nu als een Power User" zonder dat iemand handmatig hun tags aanpast. Nog beter: voorspellen wie volgende week gaat churnen of upgraden voordat het gebeurt.

**Doelen:** Clustering algoritme bouwen dat docenten groepeert op gedragspatronen, niet handmatige tags. Detecteren wanneer iemands cluster-lidmaatschap verandert ("deze docent is van Beginner naar Intermediate gegaan"). Voorspellend model verkennen: gegeven huidige trajectory, wie gaat waarschijnlijk churnen over 2 weken? Wie gaat waarschijnlijk uitbreiden naar collega's?

**Werkwijze:** Verrijkte profielen van Haalbaar niveau nemen → clustering algoritme toepassen (k-means, hiërarchisch, etc.) → clusters visualiseren en valideren dat ze logisch zijn → cluster transities over tijd volgen (als we historische data hebben) → simpel churn/expansie voorspelmodel bouwen → voorspellingen testen tegen bekende uitkomsten.

**Wat we willen leren:** Ontstaan er natuurlijke clusters uit de data, of is het ruis? Hoe vaak veranderen docenten daadwerkelijk van cluster? Kunnen we churn voorspellen met betekenisvolle nauwkeurigheid? Wat is het vroegste waarschuwingssignaal? Zou het team algoritmische segmenttoewijzing vertrouwen?

**Tijdschatting:** 8-12 uur (vrijdag stretch)

---

# DOMEIN 2: NBA Engine (Next Best Action)

**Doel:** Van simpele triggers naar intelligente prioriteiten (Air Traffic Control)

---

## Niveau: Minimaal (De Basis)

### Wat We Bouwen
Een werkende Beslisboom voor de 'Cross-sell loop' (Van Bord naar Trainer)

**Ruwe context:** Het team heeft impliciete beslislogica: "als iemand het whiteboard veel gebruikt, moeten we ze vertellen over Trainer." Maar deze logica is niet gedocumenteerd of gesystematiseerd. Het leeft in de hoofden van mensen. Flows worden gebouwd op basis van intuïtie, niet expliciete regels. Voordat we slimme prioritering kunnen bouwen, moeten we minstens ÉÉN compleet beslispad in kaart brengen zonder gaps — elke conditie gedekt, elke uitkomst gedefinieerd.

**Doelen:** Één complete beslisboom in kaart brengen: Bord-gebruiker → Trainer promotie. Alle condities documenteren: ALS (User = Bord-gebruiker) EN (Heeft 5x tool gebruikt) → DAN (Actie = Promoot Trainer). Alle takken dekken inclusief "wat als ze al Trainer hebben?" Flowchart in Miro/Figma zonder gaps of doodlopende paden.

**Werkwijze:** Één cross-sell pad kiezen (Bord → Trainer) → team interviewen over beslislogica → alle entry condities in kaart brengen → alle vertakkingscondities in kaart brengen → alle uitkomsten in kaart brengen (inclusief "doe niets") → edge cases identificeren → visuele flowchart maken → doorlopen met team om gaps te vinden → itereren tot compleet.

**Wat we willen leren:** Hoe complex is ÉÉN beslispad wanneer volledig in kaart gebracht? Waar zitten de gaps in huidig denken ("we hebben nooit overwogen wat er gebeurt als...")? Hoeveel condities doen er daadwerkelijk toe vs. aangenomen dat ze ertoe doen? Kunnen we als team überhaupt overeenstemming bereiken over de logica?

**Tijdschatting:** 3-4 uur

---

## Niveau: Haalbaar (Het Doel) ⭐ DOEL

### Wat We Bouwen
Engine bevat "Air Traffic Control" — visualiseert EN lost overlap op, toont coverage gaps

**Ruwe context:** Dit is het P0 probleem van Dag 1. Gebruikers in meerdere flows (overlap = bericht-moeheid). Gebruikers in geen flows (gaps = gemiste kansen). "We weten niet wat doorslaggevend" — geen zicht op huidige staat. De Dag 1 transcripts bevestigden dat dit de kernpijn is. Air Traffic Control betekent: alle vliegtuigen (gebruikers) zien, weten op welke landingsbanen (flows) ze zitten, en regels hebben voor wanneer landingsbanen conflicteren.

**Doelen:** Dashboard bouwen dat echte gebruikers toont en in welke flows ze zitten (of niet). Overlap detecteren: wanneer gebruiker voor meerdere flows kwalificeert, welke wint? Gaps detecteren: welke gebruikers zitten in GEEN flow? Prioriteitslogica bouwen: wanneer onboarding EN sales-trigger conflicteren, bepaalt systeem winnaar op basis van prioriteitsscores. Output: Excel/Retool/v0 prototype dat Domein 1 data neemt en correcte prioriteit output.

**Werkwijze:** User/flow membership data uit Intercom halen (API of export) → overlap detectie bouwen (gebruikers in 2+ flows) → gap detectie bouwen (gebruikers in 0 flows) → prioriteitsscoringssysteem definiëren (welke flow types overheersen anderen) → beslislogica bouwen (bij conflict, pas prioriteit toe) → simpele dashboard UI maken → testen met echte edge cases van team.

**Wat we willen leren:** Hoe ziet echte overlap eruit — 5% van gebruikers of 50%? Wat zijn de daadwerkelijke gap segmenten? Voelt prioriteitsscoring juist voor het team? Welke edge cases breken de logica? Zouden ze geautomatiseerde prioriteitsbeslissingen vertrouwen? Hoe is de API/data toegang daadwerkelijk — kunnen we flow membership krijgen?

**Tijdschatting:** 8-10 uur

---

## Niveau: Supergreen (De Droom)

### Wat We Bouwen
NBA kiest het juiste kanaal op basis van context — niet alleen WAT te zeggen maar WAAR het te zeggen

**Ruwe context:** Vandaag gaat alles via Intercom email. Maar hetzelfde bericht werkt misschien beter als een in-app tip (als ze nu zijn ingelogd) of moet wachten (als ze net 3 emails hebben gekregen). Bericht-moeheid is echt. De droom: systeem weet "Gebruiker is nu ingelogd → toon Native Tip" vs. "Gebruiker offline voor een week → stuur Email." Slimme dosering voorkomt moeheid.

**Doelen:** Kanaalselectie toevoegen aan NBA Engine. Factoren: huidige staat van gebruiker (online/offline), recentheid van laatste bericht, kanaalvoorkeuren, berichturgentie. Bericht-moeheid preventieregels bouwen (max 2 emails/week, etc.). Output: multi-kanaal beslismodel dat niet alleen actie aanbeveelt maar ook afleveringsmethode.

**Werkwijze:** Kanaaldimensie toevoegen aan NBA logica → kanaalselectieregels definiëren (urgentie × recentheid × staat) → moeheidspreventielaag toevoegen (cooldowns, caps) → integreren met Domein 1 profielen (kanaalvoorkeuren) → testen met scenario's: "gebruiker kreeg gisteren email en is nu online — wat doen we?"

**Wat we willen leren:** Hebben docenten daadwerkelijke kanaalvoorkeuren? Wat is de moeheidgrens — hoeveel berichten voordat ze afhaken? Verbetert kanaalwisseling engagement of verwart het mensen? Welke signalen geven aan "nu is een goed moment"?

**Tijdschatting:** 6-8 uur (vrijdag stretch)

---

# DOMEIN 3: Automated Content Creation & Staging

**Doel:** Van handwerk naar een gepersonaliseerde 'Content Factory'

---

## Niveau: Minimaal (De Basis)

### Wat We Bouwen
Een Prompt Template die werkt — bewijs dat AI kan schrijven in Gynzy's stem

**Ruwe context:** Het team gebruikt al ChatGPT voor content maar het is ad-hoc. Iedereen prompt anders, kwaliteit varieert, en outputs matchen niet consistent Gynzy's toon. De Dag 1 transcripts noemden "AI-gegenereerde content suggesties (geen vervanging)" — bouwblokken, niet volledige automatisering. Eerst moeten we bewijzen dat AI content KAN schrijven die niet zwaar bewerkt hoeft te worden.

**Doelen:** Een prompt template bouwen die simpele inputs neemt (Naam, NBA, Doel) en email content output in Gynzy's tone of voice. Het concept bewijzen: AI output vereist minimale bewerking om bruikbaar te zijn. 5-10 voorbeeld "goede" emails verzamelen als few-shot training. Testen met verschillende inputs om consistentie te garanderen.

**Werkwijze:** Research team verzamelt 5-10 brand-voice voorbeelden → analyseren wat ze "Gynzy" maakt (toon, structuur, woordenschat) → prompt engineeren met few-shot voorbeelden → testen met verschillende inputs (verschillende NBAs, verschillende segmenten) → evalueren: hoeveel bewerking nodig? → prompt itereren tot kwaliteit consistent is.

**Wat we willen leren:** Kan AI Gynzy's specifieke stem vastleggen vanuit voorbeelden? Welke promptstructuur werkt het best? Hoeveel varieert outputkwaliteit over verschillende inputs? Welke types content zijn het moeilijkst voor AI (technische uitleg? emotionele appeals?)? Kunnen niet-technische teamleden de prompt gebruiken?

**Tijdschatting:** 3-4 uur

---

## Niveau: Haalbaar (Het Doel) ⭐ DOEL

### Wat We Bouwen
Automated Staging — output is niet platte tekst maar geformatteerd bericht klaar voor Intercom

**Ruwe context:** Zelfs wanneer AI goede content schrijft, is er nog werk om het te formatteren, HTML toe te voegen, variabelen te verwerken, varianten te maken. Het doel is één-knop-druk → meerdere kant-en-klare outputs. Content moet variëren op basis van Domein 1 profieldata: speelse toon voor onderbouw docent, formele toon voor administrator. NL/Vlaanderen lokalisatie ingebouwd.

**Doelen:** Generator tool bouwen (OpenAI Playground/Zapier/custom) die geformatteerde berichten output (HTML/JSON) klaar voor Intercom. Één knop druk → 5 variaties met verschillende invalshoeken. Toon varieert automatisch op basis van Teacher DNA (Domein 1). NL/Vlaanderen toggle voor lokalisatie. Gebruikersvariabelen injecteren (naam, school, relevante feature).

**Werkwijze:** Bouwen op Minimaal prompt → gestructureerde output toevoegen (JSON mode voor consistente formatting) → HTML templates maken voor verschillende email types → variabele injectie systeem bouwen (pull van Domein 1 profielen) → toonmodulatie regels toevoegen (segment → toon mapping) → NL/Vlaanderen lokalisatie toevoegen → simpele UI maken voor generatie → volledige pipeline testen: profiel in → geformatteerde email uit.

**Wat we willen leren:** Verbetert gestructureerde output (JSON) consistentie? Hoe goed is de toonmodulatie — kun je onderbouw vs. bovenbouw emails uit elkaar halen? Hoe accuraat is NL/Vlaanderen lokalisatie (of heeft het native review nodig)? Is "5 variaties" nuttig of overweldigend? Wat is de daadwerkelijke tijdsbesparing vs. huidig proces?

**Tijdschatting:** 8-10 uur

---

## Niveau: Supergreen (De Droom)

### Wat We Bouwen
Omnichannel Campaign Generator — één knop maakt complete campagneset over alle kanalen

**Ruwe context:** De ultieme visie: je beschrijft een campagnedoel, en het systeem genereert niet alleen één email maar een compleet campagnepakket. Email + in-app bericht + push notificatie, allemaal gecoördineerd, allemaal on-brand, klaar om te deployen. Dit verbindt met Domein 2's multi-kanaal beslissing — content bestaat voor welk kanaal de NBA ook selecteert.

**Doelen:** Generator maakt complete campagnepakketten: email (HTML), in-app bericht (component formaat), push notificatie (korte copy), en mogelijk visuele tip cards. Alle variaties gecoördineerd met consistente messaging. Eén export bevat alles wat nodig is voor omnichannel campagne. Zou zelfs beeldgeneratie kunnen bevatten voor in-product tips.

**Werkwijze:** Haalbaar generator uitbreiden → in-app bericht formaat toevoegen → push notificatie formaat toevoegen → visuele/tip card template toevoegen → messaging consistentie over formats garanderen → campagnepakket export bouwen → mogelijk beeldgeneratie integreren voor visuals → complete campagnegeneratie end-to-end testen.

**Wat we willen leren:** Voelen omnichannel campagnes gecoördineerd of repetitief? Wat is het juiste niveau van variatie over kanalen? Kunnen we bruikbare visuals genereren of is dat een stap te ver? Zou het team daadwerkelijk een campagnepakket gebruiken of per kanaal werken prefereren? Wat is de review-last voor multi-format output?

**Tijdschatting:** 8-12 uur (vrijdag stretch)

---

# Integratie Visie (Vrijdag)

Wanneer alle 3 domeinen verbinden:

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  DOMEIN 1: Teacher DNA                                          │
│  ┌─────────────────────┐                                        │
│  │ Gebruikersprofiel   │                                        │
│  │ • Digivaardigheid: 7│                                        │
│  │ • Structuur: Hoog   │                                        │
│  │ • Segment: Bord+    │                                        │
│  └──────────┬──────────┘                                        │
│             │                                                   │
│             ▼                                                   │
│  DOMEIN 2: NBA Engine                                           │
│  ┌─────────────────────┐                                        │
│  │ Air Traffic Control │                                        │
│  │ • In flows: 2       │                                        │
│  │ • Overlap: Ja       │                                        │
│  │ • Prioriteit:Trainer│                                        │
│  │ • Kanaal: Email     │                                        │
│  └──────────┬──────────┘                                        │
│             │                                                   │
│             ▼                                                   │
│  DOMEIN 3: Content Factory                                      │
│  ┌─────────────────────┐                                        │
│  │ Gegenereerde        │                                        │
│  │ Campagne            │                                        │
│  │ • Email: ✓          │                                        │
│  │ • In-app: ✓         │                                        │
│  │ • Toon: Formeel     │                                        │
│  │ • Lokalisatie: NL   │                                        │
│  └─────────────────────┘                                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

Demo verhaal: "Hier is een docent. Hun Teacher DNA toont hoge structuur-behoefte.
NBA Engine zegt dat ze de Trainer promotie moeten krijgen, via email (ze zijn
offline). Content Factory genereert een formele Nederlandse email, klaar om te versturen."
```

---

# Samenvatting Tabel

| Domein | Minimaal (3-4u) | Haalbaar ⭐ (6-10u) | Supergreen (8-12u) |
|--------|-----------------|--------------------|--------------------|
| **1. Data Verrijking** | Data Dictionary voor één persona | Afgeleide metrics + 50 docenten dummy dataset | Voorspellende clustering |
| **2. NBA Engine** | Beslisboom voor Bord→Trainer | ATC dashboard + prioriteitslogica | Multi-kanaal beslissing |
| **3. Content Factory** | Werkende prompt template | Geformatteerde generator + toonvariatie | Omnichannel campagneset |

**Dag 2-3 Doel:** Alle drie domeinen op Haalbaar niveau
**Vrijdag Stretch:** Supergreen pogingen + volledige integratie demo

---

*Briefs klaar voor Dag 2-3 bouwfase*
