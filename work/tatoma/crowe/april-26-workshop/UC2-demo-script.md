# UC2 Demo Script — Biedingsbrief vs. Term Sheet

**Duration:** 25 minutes total (≈8 min demo + 12 min hands-on + 5 min discussion/transition)
**Platform:** Claude (desktop app)
**Files:** `Getekende NBO Van Grunsven.pdf` (3 pp, 24 Jan 2026) + `Getekende Term Sheet Van Grunsven.pdf` (9 pp, 25 Feb 2026)
**Presenter:** Israel (driving) · Sander (narrating context)

---

## 1. Setup Narration (while uploading both PDFs — ≈60 sec)

> "Dit zijn twee échte, getekende documenten uit een lopende deal — een Non-Binding Offer van 24 januari en een Term Sheet van 25 februari. Eén maand ertussen. Zelfde deal, zelfde partijen, zelfde koopsom van 18 miljoen op papier.
>
> In de praktijk leest een M&A-adviseur deze twee documenten regel voor regel naast elkaar. Dat kost een ervaren consultant al snel een halve dag, en zelfs dan glipt er wel eens iets doorheen — een earn-out cap die stilletjes 150K lager is geworden, een management fee die afwijkt, een garantieraamwerk dat er opeens in staat.
>
> We gaan Claude vragen om deze vergelijking in één keer te doen. Niet samenvatten — **vergelijken**. En we willen het onderscheid zien tussen bewuste verfijningen en écht conflicterende bepalingen."

*(While the files upload: mention that both are clean, signed, text-based PDFs — so no OCR issues. Claude reads them natively.)*

---

## 2. The Primary Prompt

### Dutch (use this one live)

```
Ik heb twee getekende documenten voor dezelfde transactie (Van Grunsven):
- Een Non-Binding Offer (NBO) van 24 januari 2026
- Een Term Sheet van 25 februari 2026

Vergelijk beide documenten grondig en lever:

1. Een overzichtstabel met alle materiële bepalingen naast elkaar
   (koopsom, earn-out, werkkapitaal, management fee, garanties,
   non-concurrentie, closing condities, timing).

2. Een expliciete lijst van:
   a) Discrepanties — bepalingen die in beide stukken staan maar
      inhoudelijk afwijken (noem bedragen en paginareferenties).
   b) Structurele toevoegingen — bepalingen die wél in de Term Sheet
      staan maar niet in de NBO.
   c) Weggevallen punten — bepalingen uit de NBO die niet terugkomen
      in de Term Sheet.

3. Een korte duiding per bevinding: is dit vermoedelijk een normale
   verfijning tussen NBO en Term Sheet, of een écht conflict dat
   opgelost moet worden voor SPA-fase?

Antwoord in het Nederlands. Wees concreet met bedragen en locaties in
de documenten.
```

### English alternative (backup)

```
I have two signed documents for the same transaction (Van Grunsven):
- A Non-Binding Offer (NBO) dated 24 January 2026
- A Term Sheet dated 25 February 2026

Please compare them thoroughly and produce:

1. A side-by-side table of all material terms (purchase price,
   earn-out, working capital, management fee, warranties, non-compete,
   closing conditions, timing).

2. An explicit list of:
   a) Discrepancies — terms present in both but with differing
      substance (cite amounts and page references).
   b) Structural additions — terms in the Term Sheet but absent
      from the NBO.
   c) Dropped items — terms in the NBO that do not reappear.

3. A short judgement per finding: likely a normal NBO→Term Sheet
   refinement, or a real conflict to resolve before SPA stage?

Be concrete with figures and document locations.
```

---

## 3. Expected Findings — What to Point Out Live

As Claude generates its answer, Israel narrates — don't wait until the end. Pause the room on each of these:

**Earn-out gap (EUR 150K)** — "Kijk hier: NBO zegt 4,15 miljoen maximum, Term Sheet zegt 4,0 miljoen. Dezelfde EBITDA-drempel van 3,5 miljoen, maar 150K verschil aan de top. Dit is het soort bevinding waar deze demo om draait."

**Management fee (EUR 30K/jaar)** — "230K in de NBO, 260K in de Term Sheet. Over drie jaar earn-out-periode is dat 90K. Bewust of over het hoofd gezien? Dat is geen AI-vraag, dat is een vraag voor Bram."

**Working capital treatment** — "Hier botst het echt: de NBO spreekt over uitkering van overige liquide middelen ná closing — verkoper-vriendelijk. De Term Sheet eist minimaal 500K positief werkkapitaal per 31 december 2025 — koper-vriendelijk. Dit is niet een verfijning, dit is een andere benadering."

**Warranty framework** — "De NBO zwijgt over garanties. De Term Sheet introduceert een volledig garantieraamwerk met 10% cap op de koopsom, dus 1,4 miljoen aansprakelijkheid. Dit is een structurele toevoeging — verwacht in een Term Sheet, maar de verkoper moet dit bewust accepteren."

**Non-compete** — "Zelfde verhaal: NBO zwijgt, Term Sheet zet er een 2-jarig concurrentiebeding in. Nieuwe verplichting voor verkopers."

*(Optional if Claude surfaces it):* **Earn-out payment timing** — "30 dagen in de NBO versus 6 maanden detailperiode met geschillenregeling in de Term Sheet. Dat is een wezenlijk ander cashflow-profiel voor de verkoper."

**Framing line to land the point:**
> "Wat je hier ziet is geen samenvatting. Claude heeft twee stukken tekst tegen elkaar gehouden en conclusies getrokken over wat afwijkt, wat ontbreekt en wat nieuw is. Dat is kwalitatief werk — precies wat de M&A-adviseur zelf zou doen."

---

## 4. Hands-On Phase — Follow-Up Prompts (pick 2, ≈12 min)

Let the room drive. Offer these three options on a slide; whichever gets the most interest, we run together.

**Option A — Partij-analyse**
```
Welke van deze discrepanties pakken gunstig uit voor de koper,
en welke voor de verkoper? Geef per punt een korte motivatie en
rangschik op financiële impact.
```

**Option B — Intentie vs. conflict**
```
Scheid de bevindingen in twee categorieën:
(1) waarschijnlijk bewuste verfijningen tussen NBO en Term Sheet,
(2) écht conflicterende punten die vóór de SPA opgelost moeten worden.
Motiveer per punt kort waarom je het in die categorie plaatst.
```

**Option C — Deal-team memo**
```
Vat dit samen als een één-pagina memo voor het deal team, in het
Nederlands. Structuur: kop, executive summary (3 regels), tabel met
de top-5 bevindingen en financiële impact, aanbevolen vervolgstappen.
Toon in markdown.
```

*(If the group is quiet, default to A → C. A gets the emotional reaction, C produces something they can imagine sending to a client.)*

**Discussion prompts while Claude generates:**
- "Hoe doen jullie dit vandaag? Handmatig naast elkaar?"
- "Zouden jullie dit vertrouwen zonder menselijke check? Wat zou je moeten zien om dat vertrouwen op te bouwen?"
- "Welke andere documentparen zouden hetzelfde patroon kunnen volgen — SPA vs. Term Sheet? LOI vs. NBO?"

---

## 5. Transition to Coffee Break (≈60 sec)

> "Dus in deze twee demo's — de IM-review en deze NBO/Term Sheet-vergelijking — hebben jullie gezien wat Claude sterk maakt: **kwalitatieve analyse** en **cross-document vergelijking**. Lezen, begrijpen, oordelen, samenvatten.
>
> Na de pauze schakelen we over naar jullie wereld. We pakken dezelfde soort use cases, maar nu in Copilot Studio — jullie Microsoft-stack. Daar zit de echte vraag: hoe krijgen we dit soort kwaliteit in de tools die jullie morgen al gebruiken?
>
> Koffie, 15 minuten. Daarna bouwen we."

---

## Presenter Checklist

- [ ] Both PDFs open in a finder window, ready to drag into Claude
- [ ] New Claude chat, clean context
- [ ] Primary prompt copied to clipboard (Dutch version)
- [ ] Three follow-up prompts visible on a slide or in a note window
- [ ] Timer visible: 25-minute block
- [ ] Bram cued to jump in on the management-fee question — he may know if it's intentional

## Fallback if Claude misses something

If Claude doesn't surface the EUR 150K earn-out gap on the first pass:
```
Kijk specifiek naar de earn-out-bepalingen in beide documenten. Wat is
het maximum bedrag in elk, en valt je iets op?
```

If Claude produces only prose (no table):
```
Zet de materiële bepalingen in een tabel met drie kolommen: bepaling,
NBO, Term Sheet.
```
