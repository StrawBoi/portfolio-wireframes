# Phase A — Hero → Exhibits (front third)

> **Prerequisite:** Read [PREMIUM_DIRECTOR.md](./PREMIUM_DIRECTOR.md)  
> **Goal:** The first 2 minutes feel like a **premium show reel** — dark, weighted, posters prove you before the page goes editorial.

---

## Paste into next agent chat

```
Read docs/PREMIUM_DIRECTOR.md and docs/PREMIUM_PHASE_A.md first.
Read .cursor/rules/portfolio-creative.mdc.

Phase A only. Route #prototype. Branch premium/prototype.

Before any code: write a beat sheet table (scroll % → what moves → what visitor feels).
I must approve the beat sheet, then you implement.

Sacred — DO NOT EDIT:
- src/app/components/hero/WillemHandoff.tsx
- bindCinemaHandoff / hero:logo-ready / name flight into #hero-name-slot

You MAY edit:
- src/app/components/hero/variants/HeroFrameReveal.tsx (layout/classes only, not Willem)
- src/app/components/hero/useHeroScrollSequence.ts
- src/app/components/hero/HeroStoryStage.tsx (timing/scale if needed)
- src/app/components/exhibit/FeaturedExhibits.tsx (wrapper/overlap only)
- src/styles/hero-thesis.css, hero-story-stage.css, exhibit.css, theme.css (tonal vars)
- Add ONE new file max for handoff scrim if needed (e.g. src/app/motion/HeroExhibitHandoff.tsx)

Do NOT:
- Add MaskedWords to hero/exhibits (already have sequences)
- Set site-reveal--beneath opacity below 1 (no pale ghost site)
- Mount CustomCursor / ScrollVelocity in this phase
- Touch Method, Proof, Story, Contact

Acceptance: dark holds through exhibits pin; ONE clear "lights up" moment entering Method;
pnpm run build passes; I scroll-test on desktop.
```

---

## Current behaviour (baseline)

| Piece | File | Today |
|-------|------|-------|
| Hero pin | `useHeroScrollSequence.ts` | `+=75vh` scrub, fade stage/signal/CV at 55–92% |
| Story stage | `HeroStoryStage.tsx` | Auto-rotate posts ~5.5s, Ken Burns |
| Exhibits | `useExhibitScrollSequence.ts` | Pin + plate carousel + meter scrub |
| Theme | `Prototype.tsx` | `.pf-cinematic` on root when dark |
| Gap | — | Weak hero→exhibits bridge; cream sections feel same weight as dark hero |

---

## Director target (what premium feels like)

### Emotional arc

1. **Willem ends** — name docks to nav; visitor is in the film.  
2. **Hero (dark)** — story stage + thesis: *marketing mind, campaign proof*. Visitor waits, reads.  
3. **Hero pin release** — not a hard cut; stage dissolves, scroll cue dies, **forest holds**.  
4. **Exhibits (still dark)** — first plate fills attention; carousel says *volume + craft*.  
5. **Exhibits release** — **first cream breath**: subtle scrim or edge light, not full bleach. Method section is visibly "next act."

### One unforgettable beat (pick one, nail it)

Choose **one** primary handoff device — implement excellently, not three mediocre ones:

| Option | Description | Risk |
|--------|-------------|------|
| **A. Poster ascend** | Active exhibit plate scales up 1→1.08 during last 20% of exhibit pin, then clip-path opens into Method | High impact; needs layout care |
| **B. Ember scrim** | Full-viewport radial ember wash peaks at hero unpin, gone before Method header | Subtle; must not look like Fable's pale veil |
| **C. Tonal lock** | Keep `.pf-cinematic` on root until exhibits `onLeave`; remove class with 400ms CSS transition on `--pf-paper` | Low motion, high craft |

**Director recommendation:** **C + light B** — tonal lock is the story (dark = theatre); ember scrim is punctuation, max opacity **0.35**, tied to scroll scrub.

---

## Beat sheet template (agent fills before coding)

| Scroll phase | Trigger | Elements | Transform | Visitor feels |
|--------------|---------|----------|-----------|---------------|
| 0% | Hero top | Story stage, signal, CV | idle | "I'm in the briefing" |
| … | Hero pin end | stage, cue | fade | "Time to see work" |
| … | Exhibits enter | plate 1 | — | "Posters are the proof" |
| … | Exhibits mid | carousel | scrub | "Range" |
| … | Exhibits leave | root theme | cinematic→light | "Lights up — dossier mode" |

---

## Technical constraints

```ts
// ScrollTrigger with Lenis
scrollTrigger: {
  scroller: document.documentElement,
  // ...
}
```

- Import from `src/lib/gsapClient.ts` only.  
- `prefers-reduced-motion`: skip pin extras; show final layout.  
- `ScrollTrigger.refresh()` after images load and on resize.  
- Transform + opacity only on animated layers.

---

## Files & IDs (DOM anchors)

| ID / selector | Purpose |
|---------------|---------|
| `#frame-01-sequence` | Hero root (`HeroFrameReveal`) |
| `#frame-01` | Hero stage |
| `#featured-exhibits` | Exhibits section |
| `#featured-exhibits-stage` | Exhibit pin target |
| `#method` | First light section — handoff end target |
| `#hero-name-slot` | Nav name dock (Willem target) |

---

## Visual checks (Ahmed signs off)

- [ ] Hero readable 3s after Willem — thesis + one campaign post visible  
- [ ] Dark background continuous hero → exhibits (no random cream band)  
- [ ] Exhibit pin feels long enough to see 2+ plates  
- [ ] Transition to Method feels intentional, not accidental scroll  
- [ ] No console errors; `pnpm run build` OK  
- [ ] Willem replay (nav name click / Space) still works  

---

## Out of scope (Phase B/C)

- Method rail reveals  
- Proof boards  
- Story 05–07 redesign  
- Contact finale  
- Custom cursor  

---

## After Phase A ships

1. Commit on `premium/prototype` with message: `Premium Phase A: hero–exhibits tonal handoff`  
2. Open Phase B chat with `PREMIUM_PHASE_B.md` (create from director doc when ready)  
3. Screenshot hero, exhibits mid-pin, Method top — keep as reference for B
