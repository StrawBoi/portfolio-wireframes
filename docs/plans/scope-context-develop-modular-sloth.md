# Plan: Low-Fidelity Portfolio Wireframes

## Context
Build an in-browser low-fidelity wireframe set for an animated personal portfolio website, translating handwritten sketches into structured frames. Output is a single React app that renders 8 desktop frames (1440px, 12-col grid) and 8 mobile companion frames (390px, 4-col grid), all grayscale, with labelled placeholders and notes for future motion. This is a wireframe deliverable — not a polished site — so visuals stay deliberately raw: dashed boxes, "[Image]" / "[CTA]" labels, section tags, grid overlays.

## Approach

A single-page React app that stacks all frames vertically in a scrollable "artboard" canvas, mimicking a Figma-style review surface. Each frame is a self-contained component with a header strip (frame name + viewport size), an optional 12-col / 4-col grid overlay toggle, and the wireframe content inside.

### File structure
- `src/app/App.tsx` — artboard shell: title bar, grid toggle, desktop/mobile column, renders all frames in order.
- `src/app/components/Artboard.tsx` — frame wrapper (label header, fixed width, grid overlay, border).
- `src/app/components/wireframe/Primitives.tsx` — shared lo-fi primitives: `Box` (dashed placeholder w/ label), `TextLine` (gray bar), `Btn` (CTA placeholder), `ImagePh`, `Note` (yellow-tinted dev note for motion cues), `SectionTag`.
- `src/app/components/frames/` — one file per frame, each exporting `Desktop` and `Mobile` variants:
  - `00_IntroGate.tsx`
  - `01_HomeHero.tsx`
  - `02_Capabilities.tsx`
  - `03_ProcessMap.tsx`
  - `04_CaseStudies.tsx`
  - `05_ExperienceProof.tsx`
  - `06_ServicesFit.tsx`
  - `07_ContactClose.tsx`

### Layout system
- Desktop frames: fixed `width: 1440px`, 12-col grid using CSS grid (`grid-cols-12`, 24px gutter, 96px outer margin).
- Mobile frames: fixed `width: 390px`, 4-col grid (`grid-cols-4`, 16px gutter, 20px outer margin).
- Artboard lays desktop column and mobile column side-by-side (or stacked on narrow viewports), each frame paired with its mobile companion.
- Grayscale palette only: white background, `neutral-100/200/300/400` for blocks, `neutral-600/900` for text, dashed `neutral-400` borders for placeholders.
- No font-size / weight Tailwind classes (per project rules) — rely on default theme.css typography; labels use `<small>` and section tags via `<span>`.

### Frame contents (per spec + sketches)
Each frame implements the sections listed in the user's brief. Sketch-derived details:
- **00_IntroGate ("Landing / Wow Moment")**: full-bleed 1440×900. Top-left name placeholder. Top-right **Quick / Slow toggle** pill — *Quick* path skips the Wow Moment via a scrambling/glitch transition straight to the next page (the "old website on main branch" per sketch); *Slow* path plays the full animated Wow Moment and advances on user click. Centered "Wow Moment" placeholder block with note: "Animated to guide ≠ to distract." Bottom scroll cue. Motion note: "Quick = scramble cut; Slow = guided reveal; click on Wow Moment advances."
- **01_HomeHero ("Don't Tell, Show — Let Experience")**: 7-col copy left — headline "Don't tell, show. Let experience speak.", sub "What do you wanna tell?" + positioning line on UX/UI/research/strategy/execution, primary CTA "Enter" + secondary "How I can be a good fit". 5-col visual placeholder right (interface fragment). Side note panel: "Short scroll".
- **02_Capabilities ("How can I be a good fit — Skills / Ways I can help")**: section header pulled from sketch. 3×2 grid of capability cards: Research, UX/UI Design, Product Thinking, Strategy & Briefs, Funnel & Conversion, Front-end-aware execution.
- **03_ProcessMap ("From scratch → Outcome")**: horizontal flow mirroring sketch — *Help from scratch → Brainstorm Ideas → Design → Research + Analytics → Quality (as a driver to ROI) → Competitor Analysis (matrix placeholder) → Outcome*. Underneath, method-card row: SWOT, Competitor Matrix, Briefs & Strategy, Funneling → Sales, ROI. Motion notes: "Paint / reveal with scroll" on the flow; "Stagger method cards".
- **04_CaseStudies**: 12-col featured case (8-col visual + 4-col meta: title, role, problem, approach, impact). Then 3 supporting project cards with the same metadata slots.
- **05_ExperienceProof ("Proven work with global teams" + "Relevant Experience" + "Find & Execute things you thought impossible")**: split into three stacked bands.
  1. *Proven work with global teams* — logo strip placeholders (CinemaTech, Volvo featured; then Vauxhall, Tlosol, Vauxhall le Revier Noir, BTH → Tackle, Toyota). Note: "Replace with scroll-reveal".
  2. *Relevant Experience* — stacked cards (Ghana Martins, AE Garden, Ecco Narrate) each with Position / Achievements / 1-1-1 slots. Sub-block: *Technical Experience* — IT Manager, Technical Support, Customer Support, Sales (Junior Wind, Dell).
  3. *Find & Execute things you thought impossible* — interactive placeholder: "Hide all & leave Possible on screen" (motion note: filter/dissolve effect). Freelance & Remote work block alongside.
- **06_ServicesFit**: 6 service tiles (Discovery, UX Strategy, UI Systems, Research Synthesis, FE-aware Design, GTM Support).
- **07_ContactClose**: large closing statement, sub-line, 3 CTAs (Email, LinkedIn, Resume), minimal footer.

### Reuse
- `src/app/components/ui/*` shadcn components are available but intentionally NOT used — wireframes need raw lo-fi blocks, not polished UI. Only exception: `Toggle` if convenient for the Quick/Slow placeholder, styled down to grayscale.
- Use existing `ImageWithFallback` only if an actual image is ever needed; for wireframes, `ImagePh` placeholder boxes suffice.

### Motion notes
Rendered as small bordered `Note` callouts beside relevant sections (e.g., "→ Motion: parallax visual"; "→ Motion: stagger reveal on scroll"). Not implemented as actual animation — this is a wireframe.

## Verification
- Open the preview surface; confirm all 8 frames render in order, each with a header showing frame name + viewport size.
- Toggle the grid overlay; verify 12 columns on desktop frames and 4 on mobile frames.
- Visually confirm grayscale only (no color), placeholders labelled, hierarchy readable, motion notes visible.
- Resize browser; artboard should remain scrollable and frames should keep their fixed pixel widths (horizontal scroll within artboard is acceptable on narrow viewports).
