# Family

> The non-negotiable architecture. Everything else routes around this.

---

## Structure

Family of four in Bakel/Gemert, North Brabant, Netherlands.

- **Israel** — father, primary school-run handler for Amelie
- **Partner** — mother, handles Philippe's logistics by default
- **Amelie** — secondary school, Sint Lucas VMBO
- **Philippe** — primary school

---

## Amelie

**The single most important scheduling constraint in the entire system.**

- School: Sint Lucas VMBO
- Schedule: **variable** — must check Magister before confirming any afternoon availability
- Israel handles ALL pickups and dropoffs
- Commute: home-to-school 45 minutes, work-to-school 20 minutes
- No meeting, no deadline, no co-founder request overrides this

**Scheduling rules:**
- Before confirming any afternoon slot → check Amelie's last class time
- Calculate leave-by time = last class end minus commute buffer
- No meetings recommended after 14:00 unless Magister confirms a late end
- When Amelie starts 2nd period → combined morning dropoff with Philippe is possible

**AI assistant behavior:** Any system scheduling on Israel's behalf must check Amelie's Magister schedule as the FIRST step for afternoon availability. Warn early, not late.

---

## Philippe

- School: primary school
- Schedule: **fixed** (no Magister lookup needed)
  - Monday, Tuesday, Thursday: 8:30 - 14:45
  - Wednesday, Friday: 8:30 - 12:30
- **Wife handles pickup by default**
- Only becomes Israel's constraint if he explicitly says so
- Do NOT assume Philippe's schedule comes from Magister — it's memorized

---

## Partner

- Handles Philippe's school logistics
- Not a direct interaction surface for AI systems
- Named in constraints but addressed through Israel

---

## Family Interests

- Baking (Mexican conchas — connecting cultures through food)
- Music
- Dutch culture and language integration
- Entrepreneurial content (Shark Tank, etc.)

---

## Hard Rules for AI Systems

1. Amelie's pickup is inviolable — route every afternoon decision through this first
2. Check Magister before confirming any afternoon availability — always
3. Default currency is EUR
4. Default timezone is Europe/Amsterdam
5. If context is ambiguous between work and personal, default to work during business hours
6. Philippe's pickup is wife's responsibility unless Israel explicitly says otherwise
7. If Israel mentions "inbox" without context, he means LifeOS inbox, not email

---

*Update when school schedules change (semester transitions), when kids change schools, or when logistics responsibilities shift.*
