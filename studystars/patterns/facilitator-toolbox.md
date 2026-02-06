We built a **facilitator companion app** for a 5-day educational bootcamp aimed at ages 10-12. The app was a Next.js site designed to be used on an **iPad Pro in landscape** by the person running the sessions -- it was an internal tool, not marketing-facing.

**How we got here:** We started by building a marketing-style landing page for the program, then pivoted to a student-facing study companion, and finally landed on the correct framing: a **facilitator reference tool** for the teacher running the bootcamp. The layout was also adjusted from a mobile-first tab-based design to a two-column layout optimized for iPad Pro landscape, with the main timeline on the left and sidebar panels on the right.

**Program structure:** Each day had 3 teaching blocks:

1. **Study Skills** -- learning strategies like note-taking, visual mapping, process thinking
2. **Mathematical Thinking / Reasoning Skills** -- applied math concepts like estimation, spatial reasoning, probability
3. **Future Skills** -- AI and technology literacy topics like how AI learns, computer vision, AI ethics


**What the app showed for each day:**

- **Session Timeline** (main panel, left) -- A collapsible accordion with each block broken into timed segments. Each segment had the activity name, duration, detailed facilitator instructions, discussion prompts, and expected student outputs.
- **Materials & Prep Checklist** (sidebar, right top) -- Interactive checkboxes for all physical and digital materials needed, organized by block.
- **Teacher Notes** (sidebar, right bottom) -- Differentiation strategies, classroom management tips, and key takeaways, also collapsible.


**State when we stopped:** Days 2, 3, and 4 were fully populated with detailed lesson content. Days 1 and 5 existed as navigation buttons but had no content yet. The day data was hardcoded inline in each component file (session-timeline.tsx, materials-checklist.tsx, teacher-notes.tsx), keyed by day number. The page.tsx managed which day was selected via client-side state and passed it down as a prop.

**Design approach:** Clean, utilitarian UI using shadcn/ui components (collapsibles, checkboxes, cards) with a neutral color scheme -- designed for fast scanning and reference during live teaching, not for aesthetics or marketing.

---