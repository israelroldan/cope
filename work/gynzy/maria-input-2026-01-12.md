# Maria's Technical Input — Sprint Day 1

*Source: Maria, Jan 12 2026*
*Context: Data infrastructure and access for sprint*

---

## Raw Input (Dutch)

1. We hebben in intercom company's (scholen) en users. Zowel company's als users hebben verschillende attributen die we dagelijks up to date houden. Dit gebeurd vanuit het dwh. Daarnaast hebben we ook events, deze worden rechtstreeks vanuit de front-end verstuurd.

2. We hebben een analytics database in bigquery. Hier wordt veel gebruikersdata verzameld en geaggegreerd en dat wordt dan naar intercom gestuurd.

3. We gebruiken census. Deze synct voor alle company's en alle users een aantal datavelden. We segmenteren hier nog niet, dat doen we op dit moment in Intercom zelf aan het begin van flows en met behulp van segmenten. Ook worden er wel eens tags gebruikt die soms handmatig en soms via csv upload erin worden gezet.

4. We hebben een betaald account bij OpenAi. En we hebben google workspace waar gemini bij in zit. De developers gebruiken claude.

5. Voor open AI hebben zowel Dwayne als ik beheer rechten. Voor google hangt het ervanaf wat we willen. Dwayne heeft een aantal rechten. En anders hebben we een platform team waar we terrecht kunnen. We zijn een kleine organisatie, dus als we iets nodig hebben komende week dan zal het waarschijnlijk wel lukken om dit snel gefixt te krijgen.

---

## Summary (English)

### Data Architecture

| Layer | Technology | What it does |
|-------|------------|--------------|
| **Intercom** | Companies (schools) + Users | Both have attributes, updated daily from DWH |
| **Events** | Frontend → Intercom | Real-time, sent directly from frontend |
| **BigQuery** | Analytics DB | User data collected, aggregated, pushed to Intercom |
| **Census** | Sync layer | Syncs data fields for all companies and users |

### Current Segmentation Approach

- Segmentation happens **in Intercom** (not Census)
- Done at **flow entry** + via **segments**
- **Tags** also used — sometimes manual, sometimes CSV upload

### AI Tools Access

| Tool | Access |
|------|--------|
| **OpenAI** | Paid account — Dwayne + Maria have admin |
| **Gemini** | Google Workspace — Dwayne has some rights |
| **Claude** | Used by developers |
| **Platform team** | Available if needed |

### Sprint Enabler

> "We zijn een kleine organisatie, dus als we iets nodig hebben komende week dan zal het waarschijnlijk wel lukken om dit snel gefixt te krijgen."

Translation: Small org = can move fast. If we need something this week, likely can get it done quickly.

---

## Implications for Sprint

1. **Data model confirmed**: Companies (schools) ↔ Users hierarchy in Intercom
2. **Events are real-time capable** — frontend sends directly (enables real-time triggers)
3. **Census is sync-only** — segmentation logic lives in Intercom, not upstream
4. **Tags are a workaround** — manual/CSV = pain point for automation
5. **OpenAI is the path** — admin access available for prototype
6. **Fast turnaround possible** — small org, can unblock quickly

---

## Questions This Raises

1. What attributes are currently synced via Census? (field list)
2. What events are being sent from frontend? (event catalog)
3. How many tags exist? How are they used?
4. Can we get sample data exports from BigQuery for prototype?
