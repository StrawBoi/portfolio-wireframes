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

## Beat sheet — Hero → Grid → Exhibits → The Release

> **Status:** Written · Awaiting Ahmed sign-off before Phase A implement.  
> **Motion budget:** 5 moments only. Every other line is scroll-driven stillness.

---

### ACT 1 — Hero (`#frame-01-sequence`)

| Scroll phase | Trigger | Elements | Transform | Visitor feels |
|---|---|---|---|---|
| **0% — pin start** | `#frame-01-sequence` enters viewport | Story stage (post 1 visible), thesis block, signal row, CV hint | Idle — full opacity; story auto-rotate starts, ~5.5 s / post, Ken Burns on each | "I'm in the briefing" |
| **0 – 30% pin** | Hero pinned; story cycling | Posts 1 → 2 → 3 auto-rotate; thesis static | Auto-rotate only — no scroll-driven transform yet | "He has a point of view" |
| **30 – 55% pin** | Stage on 3rd post; visitor reads | Thesis: *"Marketing with structure, curiosity, and intent."* Signal row below | Everything at full opacity; zero scroll-driven motion | "I believe him" |
| **55 – 75% pin** | Pin decay begins | Signal row + CV hint | `opacity 1 → 0`; ease-out 200 ms scrub-tied | "Time to see the work" |
| **75 – 92% pin** | Stage fade | Story stage container | `opacity 1 → 0`; ease-out 150 ms scrub-tied | "Show me what you made" |
| **92 – 100% pin** | Hero unpin | `#frame-01-sequence` root | Scroll resumes; hero fixed layer releases; dark background continues | "Scrolling into the show" |

---

### ACT 1.5 — Campaign Grid (`#campaign-grid`)

> **Grid is not pinned.** Scroll-reveal only. Withheld last row is the only lock.

| Scroll phase | Trigger | Elements | Transform | Visitor feels |
|---|---|---|---|---|
| **Grid enter** | `#campaign-grid` crosses 80 vh | Rows 1 – 4 (cells 1 – 18) | Stagger reveal: `y 20 → 0`, `opacity 0 → 1`; 60 ms delay per cell, row-major order; easeOut | "Platform-native. Real volume." |
| **Grid 20%** | All revealed cells settled | Volvo video cell | `autoplay muted loop` fires; no controls | "It moves — this is live work" |
| **Grid 40%** | **Moment 2 — breadth announced** | Le Lièvrier noir cell (`heroScrollPick`) | `scale 1 → 1.02`; ember border glow `opacity 0 → 0.35`, 250 ms ease | "That one is calling me out" |
| **Grid 60%** | Scroll threshold hit | Last row (cells 19 – 22), blurred / clipped | `filter blur(8px) → 0`, `opacity 0 → 1`; 300 ms ease — recruiter earned the feed | "He made me scroll for it" |
| **Grid 85%** | Grid exit; handoff primes | Le Lièvrier noir cell | `scale 1.02 → 1.06`; FLIP position snapshot recorded | "That poster is coming with me" |
| **Grid → Exhibits** | `#campaign-grid` onLeave | Lead cell only | FLIP animate: cell `DOMRect` → Exhibit plate-1 position; 600 ms `easeInOut`; all other cells `opacity → 0` over 200 ms | "Depth — I'm going deeper" |

---

### ACT 2 — Featured Exhibits (`#featured-exhibits-stage`)

| Scroll phase | Trigger | Elements | Transform | Visitor feels |
|---|---|---|---|---|
| **Exhibit enter** | `#featured-exhibits-stage` pins | Plate 1 (FLIP target arrives) | Title + role: `opacity 0 → 1`, `y 10 → 0`, 300 ms after FLIP settles | "Posters are the proof" |
| **Pin 0 – 33%** | Pin holding; plate 1 static | Plate 1 full-attention; progress meter | Meter bar scrubs `0 → 33%`; outcome line `opacity 0 → 1` at 15% of range | **Moment 3 — one campaign owns the viewport** |
| **Pin 33 – 66%** | Carousel advance → plate 2 | Plate 1 exits left; plate 2 enters right | `x: 0 → -100%` / `100% → 0`; 400 ms `easeInOut`; meter continues scrub | "Range — three campaigns, same craft" |
| **Pin 66 – 85%** | Carousel advance → plate 3 | Plate 3; ember edge scrim warms | Ember radial scrim `opacity 0 → 0.35`, scroll-scrub tied; plate 3 `scale 1 → 1.08` over scrub range | "Depth — I want to see more" |
| **Pin 85 – 100%** | Pre-release tension | Root `.pf-cinematic` class; all plates | Dark holds; no change — theatre is still dark | "Still in the show" |

---

### THE RELEASE — Tonal Handoff

> **Director pick: C + light B** — tonal lock is the story; ember scrim is punctuation only.  
> Max ember opacity: **0.35**. No cream band mid-exhibits.

| Scroll phase | Trigger | Elements | Transform | Visitor feels |
|---|---|---|---|---|
| **onLeave fires** | `#featured-exhibits` ScrollTrigger `onLeave` | Root element | `.pf-cinematic` class removed; CSS `transition` 400 ms on `--pf-bg`, `--pf-surface`, `--pf-text` | **Moment 4 — lights come up** |
| **0 – 200 ms** | Theme CSS transition runs | All backgrounds + text | Dark forest → cream paper; ember edge scrim simultaneously `opacity 0.35 → 0` | "Something just changed — this is different" |
| **400 ms** | Transition complete | `#method` section | Light editorial zone fully visible: Instrument Serif rules, whitespace, no `.pf-cinematic` | "Now he makes the case" |

---

### Unforgettable moment checklist

| # | Moment | Section | This beat sheet delivers it via |
|---|--------|---------|----------------------------------|
| 2 | Campaign grid reveal | Grid | Stagger reveal + withheld last row scroll-unlock |
| 3 | One exhibit poster owns viewport | Exhibits | FLIP handoff from grid → plate 1 + long pin at 0 – 33% |
| 4 | **The Release** — dark to light | Transition | `.pf-cinematic` onLeave class removal + 400 ms CSS transition |

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
