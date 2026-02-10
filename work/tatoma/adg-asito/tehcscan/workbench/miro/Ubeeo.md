# Ubeeo

ATS & Recruitment Platform | Hire-to-Retire Process · High-Volume Hiring
**AI Maturity: Medium** · **AI: via Partners**

---

## KEY DETAILS

- **Ubeeo's rol bij Asito:** Centraal recruitment systeem dat sollicitaties van Werken Bij website ontvangt, kandidaten tracked en nieuwe medewerkers doorgeeft aan AFAS voor indiensttreding.

- **Hoog personeelsverloop in schoonmaakbranche:** ~8.000 schoonmakers bij Asito met aanzienlijk verloop. Ubeeo moet hoge applicatiestromen kunnen verwerken en screening versnellen.

- **Integratie Werken Bij website:** Vacatureplaatsen vanuit AFAS, sollicitaties binnenkomen in Ubeeo, data terugkoppeling naar Werken Bij voor gepubliceerde vacatures.

- **Ketenproces focus:** Van Werving & Selectie tot eerste stappen Indiensttreding. HelloID-login, AFAS-synchronisatie (medewerkers, autorisaties, kostenplaatsen, objectnummers, klantlocaties).

- **Technische basis:** SaaS-deployment, GDPR-compliant, ISO 27001-certified, Europa-gehost. Mobiele recruiter/kandidaat interface beschikbaar.

---

## KEY AI CAPABILITIES

- **Native AI (beperkt):** Generatieve AI voor vacatureteksten optimaliseren, configurable application scoring op basis van gewogen vragen, rules-based workflow automation.

- **Interview-analyse via In2Dialog (partner):** Opname, transcriptie & psychologische profielen van kandidaten. ~30 min besparing per interview. Native integratie beschikbaar.

- **Smart Candidate Matching (WCC ELISE partner):** Semantisch zoeken op kandidaatpool; matcht op skills, locatie, ervaring (niet alleen keywords).

- **Writing Optimization (Textmetrics partner, juni 2025):** Real-time suggesties voor vacatureteksten (inclusiviteit, SEO-optimalisatie).

- **Psychometrics (Pi Company / SHL):** Koppeling met assessment-providers voor pre-employment testing. Partner-afhankelijk.

---

## API AVAILABILITY & INTEGRATIONS

- **AFAS native integration:** Bidirectioneel: Ubeeo → AFAS (nieuwe medewerkers, scoring data), AFAS → Ubeeo (medewerkergegevens, autorisaties, kostenplaatsen, objectnummers, klantlocaties).

- **Werken Bij website koppeling:** API tussen Werken Bij en Ubeeo ATS voor vacaturesynchronisatie en applicatie-inname.

- **HelloID-inlog:** SSO/passwordless authentication voor recruiters, gekoppeld aan AFAS/Asito identity management.

- **Multi-channel posting:** LinkedIn, Indeed, Broadbean. Video-integraties (Sonru, Flipbase) beschikbaar maar niet standaard actief.

- **Open partner-ecosysteem:** In2Dialog, WCC, Textmetrics, psychometrie-providers: allemaal via API gekoppeld. Geen monolithische 'branded assistant', maar modulaire AI-toevoegingen.

---

## OPPORTUNITIES / USE CASES

- **Hire-to-Retire · AUTOMATE** :  CV Screening pilot: AI-assisted CV parsing & kandidaatranking. 70%+ van kandidaten automatisch screenen.

- **Hire-to-Retire · EDUCATE** :  Meertalige screening & communicatie: Textmetrics ondersteunt meertalige vacatures. AI-gebaseerde vertaling van screening-vragen.

- **Hire-to-Retire · AUTOMATE** :  Snelle invulling vacatures (time-to-hire): Smart matching + in2Dialog interview-analyse. Vacatures sneller bezet.

- **Hire-to-Retire · AUTOMATE** :  Onboarding versnelling: AI-gegenereerde vacatureteksten + candidate data direct naar AFAS. Minder handmatige data-entry.

- **Hire-to-Retire · EDUCATE** :  Augmented Recruiting Team: Recruiters focussen op relatie; AI doet screening, transcriptie, matching.

- **Hire-to-Retire · AUTOMATE** :  Workflow automatie: SMS-herinneringen (no-shows), social media posting, zelf-service interview-scheduling.

---

## CONSTRAINTS & DEPENDENCIES

- **Partner-afhankelijkheid:** In2Dialog, WCC, Textmetrics zijn kritiek voor geavanceerde AI. Geen native Ubeeo AI-assistent. Als partners stoppen, functionaliteit weg: hoge vendor-dependency risk.

- **AVG & discriminatierisico bij geautomatiseerd screenen:** AI-matching & scoring moeten regelmatig op bias worden geauditt (vooral discriminatie op basis van nationaliteit/taal). Bij schoonmakers: risico dat niet-Nederlandse kandidaten onbedoeld worden gefilterd.

- **Taalbarrière bij niet-Nederlandse schoonmakers:** Meertalige interface beschikbaar, maar AI-models (In2Dialog psychologisch profiel, WCC matching) zijn primair Nederlands/Engels-georiënteerd. Test nodig voor niet-EU talen.

- **Geen IT-herarchitectuur mogelijk:** Constraint vanuit Asito strategie. Ubeeo-integraties moeten binnen 6-12 maanden haalbaar zijn; geen 'rip & replace' HRIS-projecten.

- **Vendor lock-in CV-screening:** Zodra CV screening pilot live gaat, afhankelijk van Ubeeo's parseer-engine & partner-scoring. Migratie naar ander ATS later complex.

---

## DISCOVERY QUESTIONS

- **Welke AI-partners kan Ubeeo vandaag inschakelen voor Asito?** In2Dialog beschikbaar? WCC Smart Matching? Kostenoverzicht per module?

- **Status CV Screening Pilot:** Waar staat de roadmap-item? Pilot-fase met klein deel vacatures? Go-live planning?

- **Werken Bij website traffic & volume:** Hoeveel sollicitaties per maand? Peak-moment (hoeveel per dag)? Hoe veel handmatige screening-uren nu?

- **Meertalige mogelijkheden testen:** Kunnen In2Dialog interviews & WCC matching Portugees/Pools/Engels goed hanteren? Psychologische profielen valide voor niet-NL kandidaten?

- **AFAS data-flow validatie:** Zijn alle Asito-specifieke velden (kostenplaatsen, objectnummers, klantlocaties) vandaag correct gesynchroniseerd? No-shows/dropout tracking beschikbaar?

- **AVG compliance voor AI-screening:** Welke disclaimers/notificaties moeten in sollicitatie-flow? Human appeal-process nodig als geautomatiseerd afgewezen?
