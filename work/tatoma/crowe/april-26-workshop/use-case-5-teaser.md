# Use Case 5: Teaser from IM

**Goal:** Fill a teaser template (PowerPoint) based on the content of the Information Memorandum.
**Feasibility: ~70% AUTOMATED**

---

## Files

- **Template:** `Teaser - Project X (template NL).pptx` (3 slides)
- **Source:** `2025 IM - Project Faraday.pdf` (same file as use case 1 — IM Review)

## Template Structure

### Slide 1: Title Slide
- Company logo/header image (fixed)
- Title text placeholder: currently reads "Project X" — needs project/company name
- Clean cover design

### Slide 2: Company Overview & Metrics
- **To fill:**
  - Company name in title ("Onderneming te koop: [Company Name]")
  - Business description (1–2 paragraphs: what the company does, USPs)
  - Key metrics table (revenue, EBITDA, margins, headcount)
  - EBITDA trend chart (data points needed)
- **Fixed elements:** Chart frame, table structure, company logo

### Slide 3: Contact & Services
- Fixed contact information (Jaap Schrover, Bram Verhagen — Crowe Foederer)
- Fixed service categories: M&A, Valuation, Transaction Services, Debt Advisory
- 4 empty placeholder shapes (likely for partner logos)

## What Claude Can Automate

### Fully automatable (~70%)
- Project/company name substitution
- Business description text (extracted and summarized from IM sections on company info and operations)
- Key financial metrics (revenue, EBITDA, margins — directly from IM financial tables)
- EBITDA data points for the chart (numerical values from the IM)

### Requires manual finalization (~30%)
- **EBITDA chart:** Claude can generate the data, but chart formatting/rendering in PowerPoint requires python-pptx or manual work
- **Images/logos:** Cannot be generated; need to be sourced separately
- **Visual polish:** Table styling, color scheme alignment, font sizing

## Feasibility Assessment

Claude's role here is best described as "smart content drafter" rather than "full automation":
1. Read the IM and extract relevant content
2. Generate the text, metrics, and data points
3. Populate the PPTX template programmatically (using python-pptx)
4. Human does final visual polish in PowerPoint

The teaser is only 3 slides, so the manual finalization step is minimal — maybe 10 minutes of cleanup.

## Questions for Bram

- Is the goal a 90% complete draft that someone polishes, or full automation?
- Are there specific anonymization requirements? (Company name, industry details, location?)
- What tone/style do they expect? (Corporate/formal vs. sell-side marketing?)
- Can they provide an example of a finished teaser alongside its source IM for calibration?

## Recommended Demo Approach

1. **Show the empty template** — "here's what needs to be filled"
2. **Upload the IM** and ask Claude to extract teaser-relevant content
3. **Generate the filled PPTX** programmatically
4. **Show the result** side by side with the template
5. **Discuss the 70/30 split** — what's automated vs. what needs human touch
6. **Frame it as time savings** — "this reduces a 2-hour task to 20 minutes of review and polish"
