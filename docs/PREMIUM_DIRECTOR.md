# Premium prototype — visual engineer director

> **Owner:** Ahmed Mohsen Mostafa  
> **Route:** `#prototype` only  
> **Branch:** `premium/prototype` (create from `narrative/social-feed` or `main`)  
> **Audience:** HR / marketing leads, Belgium & Europe · **Conversion:** Download CV

---

## What you are building

A **cinematic documentary**, not a dev portfolio. The site is one continuous film:

```
Loader → Willem (sacred) → Hero → Exhibits → Method → Proof → Story → Contact
```

**Visual engineer job:** motion earns attention **only where the story needs it**. Everything else is still, tonal, editorial.

**North star (from HANDOFF.md):**

> Cinematic entry → posters as proof → name as signal → scroll journey

---

## Story acts — one beat each

| Act | DOM / files | Visitor remembers | Motion budget |
|-----|-------------|-------------------|---------------|
| **0** | `WillemHandoff.tsx` | Name emerges from work | **Frozen** — do not edit |
| **1** | `HeroFrameReveal`, `useHeroScrollSequence`, `HeroStoryStage` | Campaign story + thesis before scroll | Pin + fade; story stage rotation |
| **2** | `FeaturedExhibits`, `useExhibitScrollSequence` | Posters prove range (Volvo, CINEMATEK, Lièvrier) | Long pin, plate carousel, meter |
| **3** | `MethodSection`, `useMethodScrollSequence` | How Ahmed thinks (4 beats) | Light — tab sync, line reveals on enter |
| **4** | `ProofDossiersSection`, `DossierFileBoard` | Evidence files, not claims | Clip reveal + masked words |
| **5** | `StoryExperienceSection`, `StoryFitSection` | Career arc → team fit | **Redesign** — pinned chapter rail (Phase C) |
| **6** | `07_ContactClosePrototype` | One clear close + CV | Finale pin, CTA lands last (Phase C) |

**Rule:** If a section already has a pin/scrub sequence, do not add a second gimmick. Fix **hierarchy and tone** first.

---

## Tonal arc (non-negotiable)

```
DARK (.pf-cinematic)     →  Hero + Exhibits (forest ink, ember accent)
RELEASE                  →  After exhibits unpin — cream paper earns its way in
EDITORIAL LIGHT          →  Method → Contact (Instrument, rules, dossier grammar)
```

Cream is not the default mood. Dark is the theatre; light is the exhale.

**Accent:** one ember (`--pf-hot` / `#D4622A`). No second accent. No purple, no Inter/Roboto.

---

## Stack — use what exists

| Layer | Path |
|-------|------|
| GSAP entry | `src/lib/gsapClient.ts` |
| Lenis + ScrollTrigger | `src/app/motion/SmoothScroll.tsx` |
| Word reveals | `src/app/components/dossier/WordReveal.tsx` |
| Hero scroll | `src/app/components/hero/useHeroScrollSequence.ts` |
| Exhibit scroll | `src/app/components/exhibit/useExhibitScrollSequence.ts` |
| Method scroll | `src/app/components/method/useMethodScrollSequence.ts` |
| Copy / CV data | `packages/shared/src/content.ts` |
| Campaign art | `public/projects/volvo/`, `cinematek/`, `le-lievrier/` |
| Design tokens | `src/styles/theme.css` |
| Creative rules | `.cursor/rules/portfolio-creative.mdc` |

**Libraries:** `gsap`, `@gsap/react`, `lenis` only for scroll choreography. `motion` for cursor if mounted later.

**Do not add:** Framer Motion site-wide, ScrollSmoother, new UI kits, Spline in hero.

---

## Dormant components (mount with intent, not by default)

| Component | When to use |
|-----------|-------------|
| `CustomCursor.tsx` | After intro, desktop — tactile layer only |
| `ProjectCursorReveal.tsx` | Exhibit plate hover — campaign peek |
| `DossierEdgeMarks.tsx` | Section framing between acts |
| `awwards.css` `.contact-close-prototype__*` | Contact finale (Phase C) |

---

## Phased delivery (sign off each phase in browser)

| Phase | Doc | Scope |
|-------|-----|-------|
| **A** | [PREMIUM_PHASE_A.md](./PREMIUM_PHASE_A.md) | Hero → Exhibits handoff + dark hold |
| **B** | PREMIUM_PHASE_B.md (after A ships) | Method + Proof hierarchy |
| **C** | PREMIUM_PHASE_C.md (after B ships) | Story rail + Contact finale |

**Per phase:** Plan → implement → `pnpm run build` → scroll QA at `http://localhost:5173/#prototype` → commit → next.

---

## Anti-patterns (what burned the last pass)

- Copying `MaskedWords` onto every static header
- `opacity: 0.4` on `site-reveal--beneath` (pale ghost site)
- Full-site “awwwards checklist” in one agent session
- 360° spins / cartoon scale without narrative purpose
- Editing `WillemHandoff.tsx` or exhibit pin math without director approval

---

## Model pick — visual engineer + narrative

Your use case is **two skills**: (1) *director* — story, rhythm, what deserves attention; (2) *implementer* — GSAP, Lenis, React, CSS.

| Step | Best model in Cursor | Role |
|------|----------------------|------|
| **Director brief / beat sheet** | **Claude Opus** or **Claude Sonnet (thinking)** | Acts, scroll phases, references, reject bad ideas before code |
| **Motion + layout implementation** | **Composer 2.5** or **GPT-5.3 Codex** | Tight diffs against existing hooks; fast iteration |
| **Quick CSS/layout fix** | **Composer 2.5 Fast** | After you’ve approved direction |
| **Avoid for creative lead** | Fable, single “do everything” agent | Broad scope → invisible plumbing, pale washes |

**Recommended workflow:**

1. **You + Opus (Plan mode):** 20 min — approve Phase A beat sheet only.  
2. **Composer (Agent mode):** implement Phase A files listed in `PREMIUM_PHASE_A.md`.  
3. **You:** scroll-test, screenshot, reject or accept.  
4. Repeat for B, C.

For *compelling story narrative*, **Opus/Sonnet thinking is the visual engineer’s brain**; **Composer/Codex is the hands**. Never skip the director step.

**MCP:** enable **cursor-ide-browser** so the implementer can verify scroll phases against your live site.

---

## Prompt shell (every implementation chat)

```
Read docs/PREMIUM_DIRECTOR.md and docs/PREMIUM_PHASE_[A|B|C].md.
Read .cursor/rules/portfolio-creative.mdc.

Phase [X] only. #prototype. Branch premium/prototype.
Propose scroll beat sheet (idle → pin → release) BEFORE coding.
Sacred: WillemHandoff — no edits.
scroller: document.documentElement, gsap from src/lib/gsapClient.ts.
pnpm run build when done.
```

---

## Repo

- https://github.com/StrawBoi/portfolio-wireframes  
- Fable “awwwards pass” reverted — baseline is clean `src/` on `narrative/social-feed`
