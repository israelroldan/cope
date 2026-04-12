# Demo Kit — "The Patterns That Matter"

Use these samples during the opening segment to quickly show each pattern in action, before switching to Crowe's real data for the deep demos.

Each folder contains sample files and ready-to-paste prompts. None of this is client data — it's all fictional and safe to show on screen.

---

## Which Claude surface for which pattern?

| Pattern | Folder | Best demo surface | Why |
|---------|--------|-------------------|-----|
| 1. Document analysis | `pattern-1-document-analysis/` | **Claude Chat** (claude.ai) | Drag-and-drop a PDF, get analysis — simplest "wow" moment |
| 2. Cross-document comparison | `pattern-2-cross-document-comparison/` | **Claude Chat** | Upload two files at once, ask for discrepancies |
| 3. Template filling | `pattern-3-template-filling/` | **Claude Cowork** | Reads source doc + Excel template, produces a filled file |
| 4. Data extraction | `pattern-4-data-extraction/` | **Claude Cowork** or **Claude Code** | Turns messy unstructured text into clean structured output |

---

## How to use during the presentation

These are **optional quick demos** for the "Patterns That Matter" section (section 3 of the talking points). You don't need to run all four — pick one or two that land best with the audience.

**Option A — Just talk through them** (fastest, ~10 min total)
Describe each pattern using the examples as visual reference. No live AI needed.

**Option B — Live-demo one or two** (~15 min total)
Pick Pattern 1 or Pattern 2 as a quick live hit. Upload the sample file, paste the prompt, let Claude work. Then say: "This is exactly what we'll do next with your real data."

**Option C — Pre-record** (safest)
Run each demo beforehand, screenshot or screen-record the results, show those during the talk.

---

## File inventory

```
demo-kit/
├── README.md                          ← you are here
├── welcome-and-why-claude-talking-points.md  ← speaker guide
├── prompts.md                         ← all prompts in one place, copy-paste ready
│
├── pattern-1-document-analysis/
│   └── sample-company-profile.md      ← fictional company summary (~2 pages)
│
├── pattern-2-cross-document-comparison/
│   ├── letter-of-intent-v1.md         ← LOI with specific terms
│   └── share-purchase-agreement-v1.md ← SPA with deliberate discrepancies
│
├── pattern-3-template-filling/
│   ├── source-annual-report.md        ← fictional annual report with financials
│   └── financial-overview-template.xlsx ← empty template to be filled
│
└── pattern-4-data-extraction/
    └── messy-due-diligence-notes.md   ← unstructured meeting notes + findings
```
