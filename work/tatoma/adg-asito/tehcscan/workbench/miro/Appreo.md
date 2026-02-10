# Appreo
Werk-Orders | Urenregistratie | Planning
**AI Maturity: Low** · **AI Assistant: Geen**

---

## KEY DETAILS

* **Specialistisch operatiesysteem bij Asito**: Sinds januari 2021 live voor specialist en periodieke schoonmaak. ~8.000 schoonmakers en 1.000 voormannen registreren dagelijks uren en werkorders via mobiel.

* **Ketenproces: Order-to-Service & Service-to-Cash**: Beheert planning, velduitvoering (mobiele klok in/uit, fotobewijs, handtekeningen), en voorbereiding voor facturering en loonberekening. System of Record voor operationele gegevens.

* **27 planningsweergaven voor inzicht**: Uniforme weergave van personeel, projecten en machines. Realtime zichtbaarheid voor partners/klanten. Hoge gebruikerstevredenheid: vervangt versnipperde spreadsheet-werkstromen.

* **Bi-directionele AFAS-koppeling**: Medewerkers, verlof, ziek-/betermeldingen, projecten, voorcalculatieregels van AFAS → Appreo. Nacalculatieregels + bijlagen van Appreo → AFAS. Ook ORTEC-integratie (kloktijden).

* **Bekend probleem: 1000+ urenmismatches/maand**: Tussen Appreo/ORTEC en AFAS. Veel handmatige controle nodig. AI-kansen liggen in intelligente matching en anomaly detection.

---

## KEY AI CAPABILITIES

* **AI Maturity: LAAG – geen native AI**: Geen GenAI, geen ML-scheduling, geen conversationele assistent (zoals ORTEC's TESSA). Appreo bevat GEEN AI-mogelijkheden.

* **"Smart Automation" = regel-gebaseerde logica**: 14 ingebouwde Plan Accelerators (sleep-en-zet, snelle suggesties). Automatisering volgt vaste regels ("als terugkerend, dan elke maandag"), niet op basis van patroonherkenning.

* **Wat Appreo wél biedt**: Visuele indicatoren (beschikbaarheid, compliance), capaciteitsprognose (deterministisch), KAM-meldingen, checklist-inspectie. Maar GEEN predictive analytics of AI-gebaseerde optimalisatie.

* **AI moet van buiten komen**: Via Appreo's Custom API kunnen externe AI-systemen werkorderdata benutten voor anomaly detection, intelligente matching en conversationele interfaces.

---

## API AVAILABILITY & INTEGRATIONS

* **Custom API beschikbaar**: Appreo biedt API voor integratie van derde partijen. Details (endpoints, authenticatie, rate limits, webhook-ondersteuning) moeten met vendor worden besproken.

* **AFAS-koppeling (bi-directioneel, real-time)**: Medewerkers, verlofsaldi, ziek-/betermeldingen, projecten, voorcalculatieregels van AFAS → Appreo. Nacalculatieregels + bijlagen van Appreo → AFAS.

* **ORTEC-integratie (kloktijden)**: Appreo → ORTEC voor GPS/routeplanning. ORTEC bevat wél AI voor scheduling-optimalisatie; Appreo is executielaag.

* **Bredere ERP-connectiviteit**: Exact Online, Twinfield, SnelStart, Visma, Unit4, Microsoft Dynamics. Appreo fungeert als middleware tussen veld en back-office.

* **Webhook/event-triggers onbekend**: Ondersteunt Appreo event-based triggers (bijv. "uren ingediend", "werkorder voltooid")? Essentieel voor real-time AI-workflows. Moet worden geverifieerd.

---

## OPPORTUNITIES / USE CASES

- **Order-to-Service · AUTOMATE** :  Anomaly detection op urengegevens: Externe AI detecteert urenmismatches real-time. Voorkomen handmatige controle bij 70%+ van cases.

- **Order-to-Service · AUTOMATE** :  Intelligente uurmatching-logica: AI reconciliëert tijdregistraties uit Appreo, ORTEC, AFAS. Herkent geldige afwijkingen, flaggt conflicten.

- **Order-to-Service · EDUCATE** :  Chatbot voor schoonmakers en voormannen: Conversationele assistent in Nederlands beantwoordt veelgestelde vragen. Verlaagt administratieve last.

- **Service-to-Cash · AUTOMATE** :  Facturerings-validatie assistent: AI controleert facturatiegegevens real-time op ontbrekende velden, looncode-verificatie. Versnelt Service-to-Cash.

- **Order-to-Service · AUTOMATE** :  Kwaliteitscontrole via fotobewijs: AI analyseert werkorderfoto's op kwaliteitsproblemen. Helpt projectleiders prioriteren.

- **Order-to-Service · INNOVATE** :  Predictive staffing demand: AI voorspelt personeelsbehoefte 2-4 weken vooruit voor beter vooruitplannen.

---

## CONSTRAINTS & DEPENDENCIES

* **Geen native AI is kernbeperking**: Appreo zelf bevat geen ML, GenAI of intelligente scheduling. Alle AI-mogelijkheden hangen af van externe systemen via API.

* **API-rijpheid kritiek**: Implementatie van externe AI vereist voldoende API-endpoints, authenticatie (OAuth), rate limits, en webhook-ondersteuning. Vendor-roadmap en technische diepte moeten worden besproken.

* **Datakwaliteit is voorbereiding**: 1000+ maandelijkse urenmismatches wijzen op gegevensissues in huidige systeem. AI-modellen vereisen schone trainingsgegevens. Data governance/kwaliteit moet eerst worden verbeterd.

* **Schoonmakers = eindgebruikers met lage digitale vaardigheden**: Elke AI-touchpoint (chatbot, dashboard, suggesties) moet extreem eenvoudig en in het Nederlands zijn. Slecht ontwerp = geen adoptie.

* **Afhankelijkheid van AFAS en ORTEC**: Stabiliteit en nauwkeurigheid van koppelingen bepaalt kwaliteit van gegevens voor AI. Slechte upstream-data → slechte voorspellingen.

---

## DISCOVERY QUESTIONS

* **API-diepte en authenticatie**: Welke endpoints zijn beschikbaar voor werkorders, urengegevens, personeelsgegevens? OAuth, tokens, API keys? Rate limits? Privacy-restricties voor derde partijen?

* **Webhook en event-trigger ondersteuning**: Kan Appreo real-time events triggeren (bijv. "uren ingediend", "werkorder voltooid")? Of alleen polling-gebaseerde integratie? Essentieel voor live AI-workflows.

* **Appreo-roadmap voor AI**: Plannen voor native conversationele interface, predictive analytics, of AI-scheduling? Concurrentie met ORTEC TESSA? Tijdlijn?

* **AFAS/ORTEC-integratiedetails**: Welke gegevensvelden bidirectioneel, welke read-only? Synchronisatiefrequentie? Waar kunnen AI-systemen "ingrijpen" in de datastroom?

* **Historische data export mogelijkheden**: Kan Appreo bulksgewijs werkorder- en urensgegevens exporteren voor offline ML-training? Via API of export-tools? Nodig voor initial training van anomaly-detectiemodellen.

* **Contactmoment met Albert Jan Frankfort**: Agenderen van gesprek met IT-directeur over: API-capabilities, integratiestrategie, en de rol van Appreo in Winning Move 2 ("Eilanden→Ketens") via slimme automatisering.
