# Awwwards Roadmap — Agent Handoff

> **Last updated:** 2026-06-24  
> **Branch context:** Uncommitted work on portfolio-wireframes v0.4  
> **Source specs:** `Awwwards_Portfolio_Director_Blueprint.md` + `Cursor_Composer_Prompt.md` (UX/FE team)

---

## Mission

Elevate prototype mode from advanced wireframe → Awwards-level polish via **atmosphere**, **tactile response**, and **narrative continuity** — without breaking MotionMode or artboard frame files (reference only, not in UI).

---

## Consolidation (2026-06-24)

- **Single hero:** `HeroFrameReveal` + `HeroUxJourney` only — variant picker, router, hash routing, and keyboard ←/→ switching removed
- **Prototype-only UI:** Artboard tab switcher and controls hidden; `#prototype` is the default experience
- **Deleted:** unused variant components (Cinema, Teaser, Reel, Brief, Ledger, Arc) and orphaned CSS (`hero-variants`, `hero-teaser*`, `hero-cinema`)
- **Polish:** tighter GSAP timeline, editorial top rule, clickable scroll lead → UX journey, larger name scale

### Next hero iteration (recommended)

1. **Beat typography** — word-level stagger on proof/engage so copy feels authored, not faded-in
2. **Scroll coupling** — drive scroll-lead pulse amplitude from ScrollTrigger progress into `#frame-01-ux-journey`
3. **Cinematic handoff** — optional `pf-cinematic` dark wash on hero shell before paper-2 UX journey for stronger tonal shift

---

## Hero & UX Journey Redesign (2026-06-24)

### Frame hero (`HeroFrameReveal`)
- Full name **Ahmed M. Mostafa** with character-split entrance (HeroCinema pattern)
- Timed GSAP timeline + `useMotionMode`: philosophy → degree → exit → proof → engagement copy
- Copy sourced from `introGate.philosophy`, `profile.education`; custom proof/engage lines
- Editorial scroll lead: vertical dash + 2D SVG arrow (transform-only pulse)
- Removed 7-node arc progress bar from hero viewport

### UX journey (replaces `HeroJourneyRail`)
- New `HeroUxJourney.tsx`: pinned vertical steps, ScrollTrigger scrub (`+=320%`)
- Header: `introGate.wowMoment` + "A User-Experience Journey"
- 4 grounded UX principles; no horizontal pin, no Lenis/velocity
- `JourneyProgress` retargeted to `#frame-01-ux-journey` (4 steps)
- `HeroJourneyRail.tsx` deleted (replaced by `HeroUxJourney`)

### Performance
- Native scroll only; transform + opacity animations
- Frame hero is the sole prototype intro path

**Build:** `pnpm run build` passes ✅

---

## Implementation Status (23-step sequence)

| Step | Task | Status | Notes |
|------|------|--------|-------|
| 1 | `pnpm add lenis` | ✅ Done | `lenis ^1.3.23` at workspace root |
| 2 | `SmoothScroll.tsx` + App integration | ✅ Done | Prototype-only wrapper |
| 3 | `Loader.tsx` + Prototype gate | ✅ Done | sessionStorage skip; precedes WillemHandoff |
| 4 | `CanvasGrain.tsx` + App | ✅ Done | 30fps canvas overlay |
| 5 | `CustomCursor.tsx` + App | ✅ Done | Desktop only; `data-cursor` states |
| 6 | Cursor styles | ✅ Done | `src/styles/awwards.css` |
| 7 | `JourneyProgress.tsx` | ✅ Done | Bar desktop / "N / 7" mobile |
| 8 | HeroFrameReveal nodes | ✅ Done | Glow pulse, tooltips, aria-labels |
| 9 | HeroJourneyRail velocity | ✅ Done | `rotateZ` from `__lenisVelocity` |
| 10 | Exhibit hover CSS | ✅ Done | RGB drop-shadow on hover |
| 11 | `04_CaseStudies.tsx` parallax | ✅ Done | ScrollTrigger yPercent + wrapper |
| 12 | `SequenceReveal.tsx` | ✅ Done | SequenceReveal, LineReveal, WordReveal |
| 13 | Frame headings (02–06) | ✅ Done | Desktop exports only |
| 14 | AnimatePresence hero switch | ✅ Done | `HeroVariantTransition` in Prototype |
| 15 | Keyboard nav | ✅ Done | ←/→ variants; Space/Enter restart |
| 16 | `07_ContactClosePrototype.tsx` | ✅ Done | Replaces Contact.Desktop in prototype |
| 17 | Spline in contact close | ✅ Done | Lazy-loaded; hidden mobile + reduced-motion |
| 18 | `DarkModeToggle.tsx` | ✅ Done | Toggles `pf-cinematic` on prototype root |
| 19 | `ScrollVelocity.tsx` | ✅ Done | `[data-skew]` elements |
| 20 | `data-skew` attributes | ✅ Partial | Journey panels, frame name, frame h2s, contact heading |
| 21 | Device testing | ⏳ Pending | Manual QA needed |
| 22 | Reduced-motion audit | ⏳ Pending | Spot-check all new effects |
| 23 | Lighthouse / perf audit | ⏳ Pending | Spline chunk is ~2MB — expected warning |

**Build:** `pnpm run build` passes ✅

---

## New Files Created

```
src/app/components/Loader.tsx
src/app/components/CanvasGrain.tsx
src/app/components/CustomCursor.tsx
src/app/components/JourneyProgress.tsx
src/app/components/DarkModeToggle.tsx
src/app/components/frames/07_ContactClosePrototype.tsx
src/app/motion/SmoothScroll.tsx
src/app/motion/ScrollVelocity.tsx
src/app/motion/SequenceReveal.tsx
src/styles/awwards.css
docs/HANDOFF_AWWARDS.md  (this file)
```

---

## Modified Files

| File | Changes |
|------|---------|
| `src/app/App.tsx` | SmoothScrollProvider, CanvasGrain, CustomCursor, ScrollVelocitySkew |
| `src/app/components/Prototype.tsx` | Loader gate, hero transitions, keyboard nav, JourneyProgress, DarkModeToggle, ContactClosePrototype |
| `src/app/components/hero/variants/HeroJourneyRail.tsx` | Velocity rotation, `data-skew` |
| `src/app/components/hero/variants/HeroFrameReveal.tsx` | Tooltips, `data-skew` on name |
| `src/app/components/frames/02–06` | SequenceReveal on desktop headings |
| `src/app/components/frames/04_CaseStudies.tsx` | Image hover, parallax, data-cursor |
| `src/styles/index.css` | Imports awwards.css |
| `src/styles/hero-frame.css` | `position: relative` on nodes (tooltip anchor) |
| `package.json` | +lenis |

---

## Architecture Decisions

1. **Loader skip:** `sessionStorage` key `pf-loader-done` — shows once per browser session; logo restart skips loader.
2. **Lenis velocity:** Exposed as `window.__lenisVelocity` from SmoothScroll; consumed by ScrollVelocity + JourneyRail.
3. **Global effects:** Grain, cursor, skew live in `App.tsx` prototype branch — not inside Prototype to avoid double-mount on mode switch.
4. **Dark mode:** Prototype-only floating toggle applies `pf-cinematic` to Prototype root div (independent of Artboard toolbar dark).
5. **Spline:** Lazy import in ContactClosePrototype; chunk split as `react-spline-*.js`.

---

## How to Verify Locally

```bash
cd C:\Users\Ahmed\Projects\portfolio-wireframes
pnpm dev
# Open http://localhost:5173/#prototype
```

**Checklist:**
- [ ] Loader: AMM monogram → line split → WillemHandoff (click/key skips)
- [ ] Lenis: scroll feels inertial; ScrollTrigger journey still pins
- [ ] Grain: subtle film overlay entire viewport
- [ ] Cursor: ring follows mouse; expands on `[data-cursor="hover"]`
- [ ] Journey: bottom progress bar during horizontal scroll
- [ ] Timeline nodes: glow + tooltip on hover
- [ ] Hero picker: ←/→ switches variant with toast
- [ ] Space/Enter: restarts intro from logo flow
- [ ] Dark toggle: bottom-right switches cinematic palette
- [ ] Contact close: full-screen dark statement + optional Spline bg
- [ ] Artboard mode: unchanged, no Lenis/cursor/grain interference

---

## Known Gaps / Next Agent Tasks

### High priority
1. **Real contact URLs** — `07_ContactClosePrototype.tsx` uses placeholder `mailto:hello@example.com` and `#` for LinkedIn/CV. Wire to real links from content or env.
2. **`data-cursor` sweep** — Add to HeroVariantPicker buttons, Magnetic components, remaining CTAs.
3. **Reduced-motion pass** — Confirm Loader skip path, JourneyProgress hidden, no ticker leaks on toggle.
4. **Mobile journey** — Verify vertical stack + "N / 7" indicator reads well.

### Medium priority
5. **`data-skew` on remaining large headings** — Experience band 2/3 headings if desired (currently band 1 + frames 02–06).
6. **Hero `data-cursor`** — Nav links + scroll lead (picker removed).
7. **App toolbar version** — Shows `v0.4`.
8. **WordReveal usage** — Component exists but unused; apply to long ledes if storytelling needs it.

### Performance
9. **Spline weight** — Consider static poster fallback or intersection-observer load only when contact section near viewport.
10. **Canvas grain on low-end** — Could disable below certain `deviceMemory` or add user pref.

### Polish from blueprint not yet done
11. **SequenceReveal on mobile frame exports** — Only desktop headings updated.
12. **Focus visible states** — Blueprint asks `outline: 2px solid var(--pf-signal)` on interactive elements.
13. **Volcanico contrast** — AA check on `#FF4103` over Sand for text uses.

---

## Critical Rules (do not break)

- **Do NOT modify** `packages/shared/src/content.ts`
- **Honor MotionMode** — all Framer durations via `useMotionMode().d()`
- **GSAP for scroll**, Framer for UI — no duplication
- **Animate transform + opacity only**
- **Artboard frame files** remain in repo for reference; not exposed in UI
- **Single hero path:** `HeroFrameReveal` + `HeroUxJourney` only

---

## Key Integration Points

```tsx
// App.tsx — prototype branch
<SmoothScrollProvider>
  <Prototype />
  <CanvasGrain />
  <CustomCursor />
  <ScrollVelocitySkew />
</SmoothScrollProvider>

// Prototype.tsx flow
Loader → WillemHandoff → HeroFrameReveal (+ HeroUxJourney) → frames → ContactClosePrototype
```

---

## Easing Reference (from spec)

| Intent | Array |
|--------|-------|
| Entry | `[0.22, 1, 0.36, 1]` |
| Exit | `[0.65, 0, 0.35, 1]` |
| Cinematic | `[0.76, 0, 0.24, 1]` |
| Scroll scrub | `"none"` |

---

## If Context Runs Out

1. Read this file first.
2. Run `pnpm run build` — fix any TS errors before new work.
3. Start with **Known Gaps → High priority** items.
4. Test in `#prototype` hash, not artboard.
5. Reference original specs at user path: `c:\Users\Ahmed\Documents\kimi\workspace\`

---

*Handoff prepared by implementation agent — full roadmap Phases 1–7 coded; QA and polish remain.*
