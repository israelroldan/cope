# UC1 — IM Review (Buyer's Perspective) — Live Demo Script

**Workshop:** Tatoma × Crowe Foederer — Tuesday, April 14, 2026
**Demo lead:** Israel (technical) / Sander (narration)
**Estimated runtime:** 10–12 minutes (2 min setup, 2 min generation, 6–8 min discussion & follow-ups)
**Document:** `2025 IM - Project Faraday.pdf` (33 pages, Dutch, text-based)

Legend:
- 🎙️ **[SPOKEN]** — narration to the room
- ⌨️ **[TYPED]** — exact text to paste into Claude
- 👉 **[ACTION]** — what to do on screen

---

## 1. Setup narration (while uploading the file)

👉 **[ACTION]** Open a fresh Claude chat. Have the PDF ready on the desktop. Drag-and-drop it into the input box so the room sees the upload progress.

🎙️ **[SPOKEN]**
> "Oké, voor onze eerste demo pakken we het Information Memorandum van Project Faraday erbij — dit is een echt IM voor KleurRijker B.V., een bedrijf uit Amersfoort met ongeveer 7,5 miljoen omzet en 27 FTE. Het document is 33 pagina's, volledig in het Nederlands, en bevat alles wat je in een professioneel IM verwacht: bedrijfsprofiel, marktanalyse, SWOT, een P&L over drie jaar, balansen, en acht normalisaties op de EBITDA."
>
> "We gaan hier één ding doen dat in de praktijk vaak uren kost: Claude laten lezen alsof hij aan de kópers-kant zit. Dus niet: 'vat het samen'. Wél: 'wat zou jij als potentiële koper hier uit willen halen — welke risico's, welke vragen, en wat vind je van die normalisaties?'"
>
> "Let op dat we het document niet van tevoren hebben voorbewerkt. Het is gewoon de PDF die Bram ons heeft aangeleverd. Claude leest 'm rauw in."

👉 **[ACTION]** Wait for the upload indicator to finish. Confirm the file chip shows "2025 IM - Project Faraday.pdf".

---

## 2. Primary prompt

⌨️ **[TYPED — Dutch, main version]**

```
Je bent een M&A-adviseur aan de kopers-kant. In de bijlage vind je het Information Memorandum voor Project Faraday (KleurRijker B.V.).

Maak een gestructureerde review van dit IM vanuit het perspectief van een potentiële koper. Behandel daarbij expliciet:

1. Belangrijkste risico's en aandachtspunten (o.a. klantconcentratie, key-man risico, personeel/arbeidsmarkt, regionale afhankelijkheid, groei-aannames).
2. Beoordeling van de financiële kerncijfers: omzettrend 2023–2025, EBITDA-marge, werkkapitaal, en de realisme van de 2025 Latest Estimate versus historie.
3. Kritische beoordeling van de 8 normalisaties op de EBITDA — welke vind je goed onderbouwd, welke zou je challengen, en waarom?
4. Due diligence-vragen die je als koper beantwoord wilt zien vóór een bindend bod — gegroepeerd per thema (commercieel, operationeel, financieel, juridisch/fiscaal, HR).
5. Ontbrekende informatie: wat zou je als koper verwachten te zien in dit IM dat er nu niet (of te kort) in staat?

Wees concreet, verwijs waar mogelijk naar paginanummers of specifieke cijfers uit het document, en geef aan hoe zeker je bent over elk punt. Schrijf in het Nederlands.
```

⌨️ **[TYPED — English alternative, only if the room prefers English]**

```
You are an M&A advisor on the buy-side. Attached is the Information Memorandum for Project Faraday (KleurRijker B.V.).

Produce a structured review of this IM from the perspective of a potential buyer. Cover explicitly:

1. Key risks and areas of concern (customer concentration, key-man risk, labour/HR, regional dependency, growth assumptions).
2. Financial assessment: revenue trend 2023–2025, EBITDA margin, working capital, and the reasonableness of the 2025 Latest Estimate vs. history.
3. Critical review of the 8 EBITDA normalization adjustments — which are well-supported, which would you push back on, and why?
4. Due diligence questions you would want answered before a binding offer — grouped by theme (commercial, operational, financial, legal/tax, HR).
5. Missing information: what would a buyer typically expect in an IM that is absent or thin here?

Be concrete, cite page numbers or specific figures where possible, and indicate your confidence level per point. Respond in English.
```

👉 **[ACTION]** Hit send. Don't touch the screen — let Claude stream the response.

---

## 3. Expected output highlights (narrate while Claude is generating)

🎙️ **[SPOKEN — as Claude starts writing]**
> "Terwijl Claude bezig is: let even op een paar dingen waar we straks op terugkomen."

Point these out on screen as they appear (roughly 60–120 seconds of generation):

**Risk section — watch for:**
- **Klantconcentratie** — does Claude flag top-customer dependency? The IM has a customer section; Claude should notice if the top-N share of revenue is high.
- **Key-man / familiebedrijf** — owner plus children in roles = classic key-man + nepotism-risk combo. Claude almost always catches this.
- **Arbeidsmarkt** — 27 FTE in a tight Dutch labor market. Good models mention this unprompted.
- **Regionale afhankelijkheid** — Amersfoort-based, likely regional customer base.

**Financial section — watch for:**
- **Omzettrend** — 2023 → 2024 → 2025E: is growth flattening? The 2025 Latest Estimate of ~EUR 7.4M vs. 2024's ~EUR 7.5M is essentially flat — a good review flags this against an optimistic forecast narrative.
- **EBITDA-marge** — ~EUR 2.3M on ~EUR 7.5M = ~30%. That's high for the sector. A sharp reviewer asks "is this sustainable and is it real?"
- **Werkkapitaal** — balance sheet snapshots at three dates should let Claude comment on WC trajectory.

**Normalizations — the money moment:**
- Owner salary adjustment — standard, expect it to pass.
- Children-in-roles adjustment — Claude should flag this as needing scrutiny (are they actually doing the work?).
- Facility / housing costs — often related-party; Claude should ask about arm's length.
- One-off provisions — Claude should ask whether they're truly non-recurring.

🎙️ **[SPOKEN — once output is complete]**
> "Kijk — dit is ongeveer wat een junior analyst in een halve dag zou opleveren, en Claude doet 't in twee minuten. Wat hier telt is niet dat 't perfect is; 't is een zeer sterke eerste draft waar Bram of Marieke bovenop gaan zitten."

---

## 4. Follow-up prompts (hands-on phase — pick 2 or 3)

Let the room choose which to try. Paste whichever gets traction.

### 4a. Drill into the normalizations

⌨️ **[TYPED]**
```
Zoom in op de 8 normalisaties op de EBITDA. Maak een tabel met per normalisatie:
- Bedrag en richting (+/−)
- Onderbouwing zoals gegeven in het IM
- Jouw oordeel: akkoord / discutabel / niet akkoord
- Welke onderliggende stukken je als koper zou opvragen om het te valideren

Welke normalisaties zijn samen verantwoordelijk voor het grootste EBITDA-effect, en hoe gevoelig is de vraagprijs voor deze posten?
```

### 4b. Biggest single risk

⌨️ **[TYPED]**
```
Als je één risico moet kiezen dat deze deal kan laten klappen of de prijs significant drukt — welke is dat, en waarom? Geef een korte onderbouwing met verwijzingen naar specifieke passages uit het IM, en beschrijf hoe je dit risico in de DD-fase zou proberen weg te nemen of te prijzen.
```

### 4c. Structured DD question list

⌨️ **[TYPED]**
```
Stel een due diligence-vragenlijst op die we vóór een bindend bod beantwoord willen hebben. Groepeer per werkstroom (Commercieel, Financieel, Fiscaal, Juridisch, HR/Organisatie, IT, ESG). Markeer per vraag: prioriteit (Hoog/Middel/Laag), bron (management interview, data room, externe bron), en link aan welk risico of aanname uit het IM.

Mik op een lijst die we direct naar de verkoper kunnen sturen.
```

### 4d. Critique the financial projections

⌨️ **[TYPED]**
```
Beoordeel de 2025 Latest Estimate en de onderliggende aannames kritisch. Vergelijk met de gerealiseerde cijfers 2023 en 2024. Welke posten vind je optimistisch, realistisch, of conservatief? Welke sanity checks zou je doen (bijv. omzet per FTE, marge-ontwikkeling, werkkapitaalratio's)?

Geef ook aan: als koper, welke multiple zou je verdedigen op genormaliseerde EBITDA, en welke argumenten gebruik je richting de verkoper om die multiple te onderbouwen?
```

---

## 5. Discussion questions (transition to group conversation)

🎙️ **[SPOKEN]** Use these to hand the floor back to the room. Pick whichever fits the energy.

1. *"Hoe verhoudt dit zich tot wat een junior M&A-analyst in een halve dag zou produceren — in kwaliteit, in volledigheid, in toon?"*
2. *"Wat zouden jullie hieraan willen toevoegen, wegstrepen of anders formuleren? Waar mist Claude de context die jullie in het hoofd hebben?"*
3. *"Hoe lang kost dit type review nu typisch bij Crowe — van IM binnen tot eerste buyer-memo klaar?"*
4. *"Waar zouden jullie deze output vertrouwen, en waar zou je er altijd een senior adviseur overheen willen hebben voordat 't naar de klant gaat?"*
5. *"Als we dit zouden productiseren binnen jullie werkwijze: op welk moment in het deal-proces zou 't het meeste opleveren — bij intake, bij IC-voorbereiding, of bij de Q&A-ronde met de verkoper?"*

---

## Fallback / contingency

- **If upload fails:** have the PDF also open in a second browser tab so you can copy-paste critical sections. Unlikely — 1.2 MB text PDF is trivial.
- **If Claude answers in English despite Dutch prompt:** say *"Kun je het in het Nederlands herschrijven?"* and continue.
- **If output is too short/shallow:** follow up with *"Ga dieper. Geef concrete cijfers en paginaverwijzingen."*
- **If the room fixates on one section:** that's a feature, not a bug — drop the other follow-ups and go deep on what they care about.
