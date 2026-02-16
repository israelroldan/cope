# Asito Foundation Report — Outline v3
## Structuur, intentie per sectie, en databronnen
### Wijzigingen t.o.v. v2: Sectie 4 is nu een samenvattend overzicht; volledige per-tool uitwerking verhuist naar Appendix

---

## 1. Management Summary (1 pagina)

**Intentie:** In één pagina het totaalplaatje neerzetten. De lezer moet na deze pagina weten: wat hebben we onderzocht, wat vonden we, en wat raden we aan.

**Kernboodschap:** Asito heeft al een rijk applicatielandschap. Van de 9 onderzochte applicaties scoren er 6 hoog op AI-volwassenheid. Het probleem is niet het ontbreken van mogelijkheden, maar het activeren ervan. De gereedschapskist is vol — de vraag is welke gereedschappen al aanstaan.

**Elementen:**
- Scope: 9 applicaties onderzocht op AI-mogelijkheden en vendorroadmap
- Headline-bevinding: 6 van 9 tools hebben uitgebreide AI — vrijwel niets is geactiveerd
- De rode draad: activatie, niet implementatie
- Drie concrete vervolgstappen (vooruitwijzing naar sectie 6)
- Verwijzing: voor wie de details wil, staat per tool een uitgebreide analyse in de appendix

**Databronnen:** Synthese van alle secties

---

## 2. De Context (2-3 pagina's)

*Ongewijzigd t.o.v. v2*

### 2a. Organisatieprofiel
### 2b. Het procesmodel (kort, als context)
### 2c. Het huidige applicatielandschap
### 2d. Waar staat Asito met AI? (empathisch, eerlijk)

---

## 3. Cross-System Inzichten (2-3 pagina's)

*Ongewijzigd t.o.v. v2*

### 3a. De activatiekloof
### 3b. De datakwaliteit-bottleneck
### 3c. Het Microsoft-ecosysteem als versneller
### 3d. AFAS + ORTEC: de operationele ruggengraat
### 3e. Twee open punten (HubSpot, service desk)

---

## 4. Wat zit er in je gereedschapskist? (2-3 pagina's)

**NIEUWE OPZET (v3) — samenvattend overzicht**

**Intentie:** Een beknopt, leesbaar overzicht van alle 9 tools. De lezer krijgt in één oogopslag: welke AI-volwassenheid per tool, wat het kernverhaal is, en waar de leverancier naartoe gaat. Niet de diepte — die staat in de appendix. Dit is het dashboard van de tech scan.

**Waarom dit formaat:** Het gesprek met het IT-team maakte duidelijk dat concrete, per-tool inzichten het meest bruikbaar zijn — niet een waslijst van proceskansen. Tegelijkertijd hoort de volledige uitwerking (features, roadmaps, voorbeelden, beperkingen) niet in de hoofdtekst maar als referentiemateriaal. Sectie 4 geeft het overzicht; de appendix biedt de diepte.

### 4.1 — De overzichtstabel

Een samenvattende tabel met alle 9 tools:

| Applicatie | AI Maturity | AI-assistent | Kernverhaal | Status bij Asito |
|---|---|---|---|---|
| AFAS ERP | High | Jonas | Rijke AI ingebouwd (OCR, speech, documentanalyse). Activatie vereist. | Beschikbaar, niet geactiveerd |
| AFAS HR | High | Jonas | Zelfde platform, HR-specifiek (CV-screening, CAO-analyse, dossiers). | Beschikbaar, niet geactiveerd |
| ORTEC | Medium | TESSA | ML-kern voor scheduling. Sterke basis, geen GenAI. | Intensief in gebruik, AI-modules onbekend |
| Dynamics 365 | High | Copilot | Sales-productiviteit (samenvattingen, e-mail, meeting prep). | Live, Copilot beschikbaar maar beperkt ingezet |
| Power BI/Fabric | High | Copilot | Natuurlijke-taalvragen op data. Fabric als strategisch dataplatform. | BI-team is al actief met AI |
| Excel | High | Copilot | Laagste instapdrempel. Formules, analyse, opschoning in natuurlijke taal. | 50-100 licenties, persoonlijk gebruik |
| HubSpot | High | Breeze | Meest uitgebreide AI-ecosysteem. Relevantie hangt af van endstate-keuze. | Open punt |
| Ubeeo | Medium | Via partners | AI via In2Dialog en WCC, niet native. | Partnercontracten: status onbekend |
| Appreo | Low | Geen | Geen AI. Waarde als databron, niet als AI-platform. | Actief, focus op datakwaliteit |

### 4.2 — Wat valt op?

**Intentie:** De drie-vier belangrijkste observaties uit de tabel uitlichten. Geen herhaling van sectie 3, maar de tool-specifieke inzichten die de lezer meeneemt.

**a) Leveranciers investeren volop — Asito hoeft niet te wachten**
Zes van de negen tools hebben een actieve AI-roadmap. AFAS brengt Profit 8 uit in juni 2026 met AI in alle workflows. Microsoft breidt Copilot continu uit met agents en diepere integraties. HubSpot positioneert Breeze als strategische pijler. De leveranciers bewegen — de vraag is of Asito meebeweegt of later instapt.

**b) Jonas en Copilot: twee AI-assistenten, nul activatie**
De twee meest directe kansen — Jonas in AFAS en Copilot in het Microsoft-ecosysteem — zijn allebei beschikbaar en allebei niet structureel ingezet. Dit zijn geen tools die geïmplementeerd moeten worden. Ze staan klaar.

**c) ORTEC is een black box**
ORTEC is het meest operationeel kritische systeem, maar het is onduidelijk welke AI/ML-modules actief zijn. De ML-engine is structureel (het ís de scheduling-optimalisatie), maar welke features beschikbaar zijn in Asito's licentie moet geïnventariseerd worden.

**d) Appreo levert data, geen intelligentie**
Appreo heeft geen AI en zal dat waarschijnlijk niet krijgen. De waarde van Appreo voor AI zit in de data die het genereert (uren, werkorders, locatie). Die data wordt pas waardevol als het betrouwbaar doorstroomt naar AFAS en Power BI.

### 4.3 — Waar gaan de leveranciers naartoe? (korte vooruitblik)

**Intentie:** Het team een blik geven op wat eraan komt. Dit maakt de tech scan niet alleen een snapshot maar ook een vooruitblik — precies wat Albert Jan aangaf als waardevolle bijdrage.

- **AFAS:** Profit 8 (juni 2026) wordt een grote stap — Jonas in alle workflows, CV-parsing, AI talent matching. Wie nu begint met Jonas, is voorbereid.
- **Microsoft:** Copilot evolueert van assistent naar agent. Copilot Studio maakt custom agents op eigen data mogelijk. Azure AI Foundry (waar InSpark nu de sandbox bouwt) wordt de basis voor custom AI.
- **ORTEC:** Investeert in ML-verdieping, niet in GenAI. Verwacht geen conversationele interface — verwacht wel nauwkeurigere forecasting en optimalisatie.
- **HubSpot:** Gaat all-in op AI met Breeze. Maar alleen relevant als HubSpot in het endstate-plaatje blijft.
- **Ubeeo/Appreo:** Geen significante AI-roadmap. Waarde moet van buiten komen (partners, integraties).

**Afsluiting sectie 4:** Verwijzing naar de appendix voor de volledige per-tool analyse (features, beperkingen, concrete voorbeelden, en openstaande vragen).

---

## 5. Uitgelichte voorbeelden (1-2 pagina's)

*Ongewijzigd t.o.v. v2 — drie concrete scenario's*

### Voorbeeld 1: "De voorman die inspreekt" (Jonas / AFAS)
### Voorbeeld 2: "De financieel medewerker die vraagt in plaats van zoekt" (Excel Copilot)
### Voorbeeld 3: "De recruiter die sneller beoordeelt" (Jonas HR + In2Dialog)

Elk met: situatie nu → met AI → waarom dit werkt → wat het vereist.

---

## 6. Aanbevolen vervolgstappen & randvoorwaarden (2 pagina's)

*Ongewijzigd t.o.v. v2*

### 6a. Drie vervolgstappen (gerangschikt op complexiteit)
- Stap 1: Jonas activeren in AFAS (dagen, geen kosten, eerlijk over iteratietijd)
- Stap 2: Copilot-gebruik inventariseren en richting geven (weken, OneDrive-afhankelijkheid)
- Stap 3: ORTEC AI/ML-modules inventariseren (weken→maanden, datakwaliteit-risico)

### 6b. Vijf randvoorwaarden
1. Data-eigenaarschap
2. Integratiestabiliteit AFAS-ORTEC-Appreo
3. Capaciteit applicatiebeheer
4. Adoptie-aanpak passend bij doelgroep
5. Strategische keuzes (HubSpot, service desk)

---

## 7. Appendix

**UITGEBREID (v3) — per-tool analyses verhuizen hierheen**

### 7a. AI Maturity Scoring — Methodiek
- Drie criteria (branded AI-assistent, GenAI-diepte, actieve AI-roadmap)
- Scoringsschaal (High/Medium/Low) met definities

### 7b. Per-applicatie analyse (alle 9 tools — het hart van de appendix)

**Intentie:** De volledige per-tool uitwerking die in v2 in sectie 4 stond. Dit is het referentiemateriaal waar het team op terugvalt. Per tool dezelfde structuur:

1. **Wat zit erin?** — Huidige AI-features (feitelijk)
2. **Wat komt eraan?** — Vendor roadmap
3. **Wat betekent dat voor Asito?** — 1-2 concrete productiviteitsvoorbeelden
4. **Beperkingen & aandachtspunten** — Wat het níet kan
5. **Status bij Asito** — Geactiveerd? Gebruikt? Onbekend?
6. **Openstaande vragen** — Discovery questions voor vervolgsessies

**Bevat alle 9 tools:**
- 7b-1: AFAS ERP (Jonas)
- 7b-2: AFAS HR (Jonas)
- 7b-3: ORTEC Workforce Scheduling
- 7b-4: Microsoft Dynamics 365 CRM (Copilot)
- 7b-5: Microsoft Power BI / Fabric (Copilot)
- 7b-6: Microsoft Excel (Copilot)
- 7b-7: HubSpot (Breeze)
- 7b-8: Ubeeo ATS
- 7b-9: Appreo

### 7c. Proces-systeem-mapping (volledige tabel, 32 rijen)
### 7d. Integratiearchitectuur (bevestigde dataflows)

---

## Toon & Stijl

- **Taal:** Nederlands (formeel maar toegankelijk)
- **Perspectief:** Wij zijn de adviseur die meedenkt, niet de expert die vertelt
- **Filosofie:** Constraint-Based Innovation — activeer wat je hebt, koop niets nieuws
- **Vermijden:** Waslijsten, procesassumpties, verkooptaal
- **Wel doen:** Per tool laten zien wat erin zit en waar het naartoe gaat. Het team bepaalt zelf hoe ze dit inzetten.
- **Eerlijkheid:** Niet alles is een "quick win." We benoemen realistisch wat eenvoudig is en wat niet.

## Content-restricties

- ❌ Geen persoonsnamen — alleen teamreferenties
- ❌ Geen "formatiereductie" — woord komt niet voor
- ❌ Geen "Renko" — vervangen door "de lopende procesoptimalisatie-inspanningen"
- ❌ Geen onbevestigde getallen — alleen beschrijvend benoemen
- ❌ Geen waslijst van proceskansen
- ✅ Wél bevestigde getallen: ~8.000 schoonmakers, ~350 projectleiders, 50-100 Copilot-licenties, ~150 wervingen/maand, ~40% verloop

## Geschatte omvang

| Sectie | Pagina's |
|--------|----------|
| Management Summary | 1 |
| De Context | 2-3 |
| Cross-System Inzichten | 2-3 |
| Wat zit er in je gereedschapskist? (overzicht) | 2-3 |
| Uitgelichte Voorbeelden | 1-2 |
| Vervolgstappen & Randvoorwaarden | 2 |
| **Hoofdtekst totaal** | **~10-14 pagina's** |
| Appendix (methodiek + 9 tools + mapping + architectuur) | 12-16 |
| **Totaal** | **~22-30 pagina's** |

---

## Samenvatting van de rapportflow

```
Sectie 1: Management Summary
  → "Dit is wat we vonden en wat we aanbevelen" (1 pagina)

Sectie 2: De Context
  → "Dit is wie Asito is en waar ze staan" (achtergrond)

Sectie 3: Cross-System Inzichten
  → "Dit zijn de patronen die we zien dwars door het landschap" (analyse)

Sectie 4: Wat zit er in je gereedschapskist?
  → "Dit is het overzicht van alle 9 tools: score, kernverhaal, status, en waar het naartoe gaat" (dashboard)
  → "Voor de details: zie appendix"

Sectie 5: Uitgelichte Voorbeelden
  → "Zo ziet dat er concreet uit in de praktijk van Asito" (illustratie)

Sectie 6: Vervolgstappen & Randvoorwaarden
  → "Begin hier. En dit moet kloppen." (actie)

Appendix: Per-tool analyse
  → "Alle details per applicatie, voor wie verder wil lezen" (referentie)
```
