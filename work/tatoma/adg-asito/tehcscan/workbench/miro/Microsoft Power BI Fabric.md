# Microsoft Power BI / Fabric

Analytics & BI Platform | Record-to-Report, Ketenvisibiliteit, AI-Gestuurde Inzichten
**AI Maturity: High** · **AI Assistant: Copilot**

---

## KEY DETAILS

- **Rol bij Asito:** Vervanging Qlik → centrale analytics/reporting platform die AFAS (HR/payroll) en ORTEC (planning) verbindt. Dataplatform (Azure Synapse) levert data, Power BI visualiseert en analyseert.

- **Strategische motivatie:** Migratie van Qlik naar Power BI onderdeel van transformatie naar AI-gestuurde inzichten. Copilot maakt natuurlijke taalachtvragen op management data mogelijk (Record-to-Report optimalisatie).

- **Fabric is toekomst:** Microsoft Fabric = all-in-one SaaS data platform; Power BI is visualisatie- en BI-laag. Beide nodig voor volwassen AI-analytics.

- **Dataplatform integratie:** Power BI direct gekoppeld aan Azure Synapse Analytics (Dataplatform). AFAS & ORTEC data gefedereerd via ADF (Azure Data Factory) → OneLake → Fabric semantic models → Copilot.

- **Gebruikers:** 8.000+ schoonmakers (via app/portal), 300 HQ-medewerkers (analytics, HR, operations). Site managers & regionale leiders = primary Copilot users.

---

## KEY AI CAPABILITIES

- **Copilot in Power BI:** Chat-interface voor natuurlijke taal queries op reports, semantic models en data agents. Managers vragen "Toon absenteïsmetrends in Randstad" → Copilot genereert visualisatie automatisch.

- **Natuurlijke taal rapportages:** Copilot genereert volledige report-pagina's uit tekstbeschrijving. "Maak dashboard met personeelssterkte, uitstroomratio, contractduur per afdeling" → klaar. Vervangt handmatige Qlik-bouw.

- **DAX query generation:** Copilot genereert DAX formules voor data analysts (rolling averages, complex measures). Versnelt semantic model development.

- **Smart Narratives & Auto-narratives:** Copilot schrijft samenvattingen van dashboards automatisch. "Rapport absentie → AI genereert samenvatting met key drivers."

- **Anomaly Detection (Real-Time Intelligence):** Automatische detectie ongewone patronen in check-ins, absenteïsme, overtime. Geen handmatige signaleringen meer; Fabric alert bij afwijkingen.

- **Data Agents (AI-skills):** Custom agents voor bedrijfsspecifieke vragen. "Waarom 40% meer overtime locatie X vorige week?" → Agent reasont over AFAS + ORTEC + financiële data, geeft root cause analyse.

- **Predictive Analytics (Fabric Data Science):** ML-modellen voorspellen absentie-pieken, personeelsuitstroom, behofte volgende week. Azure ML integration; modellen direct deployed naar Fabric.

---

## API AVAILABILITY & INTEGRATIONS

- **REST API Power BI:** Embedden rapporten in portals, programmeren workspace management, refresh scheduling. Standard Microsoft enterprise API.

- **Azure Synapse / Fabric Lakehouse connection:** Direct SQL-verbinding naar OneLake. Power BI semantic models query Lakehouse tabellen. Native integration = snelle iteratie.

- **AFAS GetConnector (REST API):** Directe AFAS-koppeling via REST API (base64 token). AFAS administrateur configureert GetConnectors voor HR-data. Alternative: Invantive Cloud (no-code).

- **ORTEC API integratie:** Planning- en check-in data via ORTEC REST API → Azure Data Factory pipeline → Fabric Lakehouse. Medium complexity; goed gedocumenteerd.

- **Power Automate triggers:** Workflows triggeren op Power BI data events. Bijv. absentie-alert → Automate → notificatie naar supervisor.

- **Dataflows (Power Query / Fabric Data Wrangler):** Self-service data preparation. Admins bouwen herbruikbare dataflows; analysts publiceren zelf.

---

## OPPORTUNITIES / USE CASES

- **Record-to-Report · EDUCATE** :  Rapportage automatisering via Copilot voor Qlik-migratie. 20-30% handmatige rapportdagen bespaard per analyst per maand.

- **Record-to-Report · AUTOMATE** :  Self-service queries: regionale leiders vragen direct Copilot naar budgets, inhuur, absentie per site zonder IT-tussenkomst.

- **Order-to-Service · AUTOMATE** :  Real-time check-in monitoring met Fabric Real-Time Intelligence; automatische detectie onderbezetting per site met live alerts.

- **Service-to-Cash · AUTOMATE** :  Anomaliedetectie overtimekosten via Copilot; identificeert oorzaken (personeelscapaciteit, planning, seizoen).

- **Record-to-Report · EDUCATE** :  Unified workforce dashboard combineert AFAS (headcount, kosten, CAO) + ORTEC (planning, flex-inhuur) voor ketenvisibiliteit.

- **Service-to-Cash · INNOVATE** :  Predictive turnover modeling en flex-worker demand forecasting via Fabric ML.

- **Record-to-Report · INNOVATE** :  Text analytics op employee feedback surveys voor sentiment per site.

---

## CONSTRAINTS & DEPENDENCIES

- **Fabric-licentie vereist voor Copilot:** Minimum F2 SKU (~€50/month). Copilot niet beschikbaar op Power BI Premium PPU. Budget engagement nodig; escaleer naar Albert Jan Frankfort.

- **Datakwaliteit Dataplatform kritiek:** Copilot-kwaliteit hangt af van semantic model voorbereiding. Investering data governance essentieel.

- **Qlik-migratie timing:** Power BI/Fabric moet operationeel zijn voordat Qlik shut-off. 6-12 maanden transitie.

- **Azure Synapse volwassenheid:** ADP-stabiliteit is prerequisite voor betrouwbare inzichten.

- **Q&A deprecatie Dec 2026:** Migratie naar Copilot nodig vóór deadline.

---

## DISCOVERY QUESTIONS

- **Fabric-licentie status:** Heeft Asito momenteel Fabric capacity? Budget beschikbaar F2+?

- **Qlik migratie planning:** Wanneer moet Qlik uit? Hoeveel dashboards moeten migreren?

- **Dataplatform volwassenheid:** Kan Azure Synapse stabiel HR + planning data leveren?

- **Copilot activatie:** Mag Copilot ingeschakeld? Zijn er data governance concerns?

- **Semantic model kwaliteit:** Welke BI-team resources beschikbaar voor model voorbereiding?

---

_Canvas geüpdate: Tech Scan Asito, Tatoma Consulting_
