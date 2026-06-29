# Handoff — portfolio-wireframes (detailed)

**For the next agent.** Read this file first, then hard-refresh `#prototype` live. Secondary refs: `docs/HERO_VARIANTS.md` (partially stale — Reel not documented there yet), `docs/STATUS.md`, `docs/MERGE_GUIDE.md`.

---

## Prompt for next chat

```
Read docs/HANDOFF.md first.

Ahmed has NOT signed off the hero. Current direction: Willem intro → HeroTeaserReel (fullscreen poster parade → stack right → name claims 60%). Reel is DEFAULT at #prototype.

Your job: refine and ship — not restart from zero unless Ahmed asks. Propose changes before large rebuilds. Uncommitted work exists on studio/prototype-v0.4 — commit only if Ahmed requests.
```

---

## Who this is for

**Ahmed Mohsen Mostafa** — Brussels. **Target:** marketing / research / analytics **internship Summer 2026** (Odisee BBA, expected 2026). Not positioned as senior IT.

**Audience:** HR directors, hiring managers, marketing leads — Belgium / Europe.

**Voice:** Recruiter-first. Business value, measurable outcomes, systems mind. CV-aligned (see `packages/shared/src/content.ts`).

**Aesthetic:** Editorial noir × creamy editorial paper (`--pf-paper` `#F0EDE4`). References: Bloomberg Terminal, Guardian longform, A24 titles, Norell/Taylor whitespace restraint.

**One accent only:** Volcanico `#FF4103`. Everything else tonal.

**Anti-rules (never):**
- Generic dev portfolio (purple gradients, Inter/Roboto, skill bars, card grids)
- 3D ring / carousel hero
- Static project wallpaper as hero bg
- Film-strip mosaic behind hero (Ahmed rejected — removed)
- Volvo fullscreen crop / brand cut off
- Tiny thumbnail posters / detached stepped cascades / fan blades with small images
- DecisionHero-style essay + diagrams in intro
- Spline robot / glassmorphism HR widgets in hero
- Pre-rendered hero video / scroll-scrub video (laggy — removed)
- Explaining intent in code comments

---

## North star

> **Cinematic entry → posters as proof → name as signal → scroll journey**

Posters are the hero first. Name enters after the work speaks. Sketch pillars (frame 03 only): SWOT, competitor grid, ROI, funnel — **not** in intro.

---

## What is LIVE now (`#prototype`)

**URL:** `http://localhost:5173/#prototype`  
**Repo:** `https://github.com/StrawBoi/portfolio-wireframes` (private)  
**Branch:** `studio/prototype-v0.4` (**active** — uncommitted changes; see below)  
**Baseline branch:** `main` (initial monorepo commit only)

### Journey flow

```
WillemHandoff (~3s, poster flashes in Ah|med box → brief Ahmed → fade)
  → hero:logo-ready → MainNav (cream shell)
  → HeroTeaserReel (DEFAULT) OR Teaser fan / Brief / Ledger / Arc via bottom picker
  → Frames 02–07 (sand paper #F0EDE4)
```

**Removed from path:** `HeroMosaic` (film strips), `IdentityHandoff` as default hero, Intro Gate, `HeroHookVideo` (scroll-scrub video).

### Orchestration (`src/app/components/Prototype.tsx`)

| State | Meaning |
|-------|---------|
| `introDone` | Willem finished; main shell visible |
| `logoReady` | `hero:logo-ready` fired; nav shows full name |
| `heroVariant` | `reel` \| `classic` \| `brief` \| `ledger` \| `arc` from hash |

**Shell:** `background: var(--pf-paper)` — light cream, not dark.

**Window events:**
- `hero:logo-ready` — nav identity + end of intro
- `hero:mosaic-reveal` — still dispatched by Willem skip/finish; **no listener** (mosaic removed)

**Restart:** Click name in nav → replays Willem.

### Hero variants (bottom picker)

| Hash | Label | Component | Role |
|------|-------|-----------|------|
| `#prototype` | **Reel** | `HeroTeaserReel.tsx` | **Default** — fullscreen poster parade |
| `#prototype-teaser` | Teaser | `HeroTeaser.tsx` | Fan layout — pivots from right (deprioritized) |
| `#prototype-brief` | Brief | `HeroBriefScroll.tsx` | Pinned 4-chapter scroll brief |
| `#prototype-ledger` | Ledger | `HeroImpactLedger.tsx` | CV metrics scan grid |
| `#prototype-arc` | Arc | `HeroGuidedArc.tsx` | Journey timeline 2011→now |

Router: `src/app/components/hero/variants/HeroVariantRouter.tsx` — `default` → `HeroTeaserReel`  
Hash helpers: `src/app/components/hero/readHeroVariant.ts` — `#prototype` → `reel`  
`App.tsx` treats any `#prototype*` hash as prototype mode.

---

## HeroTeaserReel (current default — Ahmed's latest direction)

**Pitch:** After Willem intro, each campaign poster **owns fullscreen**, then each new poster **pushes the previous right** while maintaining full viewport height. Posters rest stacked on the right; then **Ahmed enters from the left claiming 60%**, compressing posters into the right ~40%.

### Animation sequence (GSAP timeline on mount)

| Step | What happens |
|------|----------------|
| 1 | **Volvo** fades in fullscreen (`left: 0`, `width: 100%`) |
| 2 | **CINEMATEK** enters fullscreen; Volvo slides to right slot |
| 3 | **Le Lièvrier** enters fullscreen; Volvo + CINEMATEK stack tighter on right |
| 4 | **Identity** slides in (`x: -8% → 0`); posters animate to final narrow slots; first beat line reveals |
| 5 | ScrollTrigger on section — gentle opacity/translate exit into frame 02 |

**Layout constants:** `STACK_SLOTS` in `HeroTeaserReel.tsx` — percentage `left`/`width` for push + final stack.  
**Identity panel:** `width: 60%`, cream gradient fade into posters (`hero-teaser-reel.css`).  
**Posters:** `object-fit: contain`, full height, transparent bg, drop-shadow only — no frames/borders.

**Files:**
- `src/app/components/hero/variants/HeroTeaserReel.tsx`
- `src/styles/hero-teaser-reel.css`
- Content: `heroTeaserCards` in `content.ts`

**Reduced motion:** Skips timeline; sets final layout immediately.

### Open items Ahmed may want

- **Timing polish** — longer holds on each fullscreen beat, overlap on pushes, later name entrance
- **Beat cycling** — only first beat shows on identity enter; tie beats to poster sequence or scroll
- **Mobile** — reel CSS has breakpoints; fullscreen parade may need simplified mobile path
- **Stack slot tuning** — overlap vs clean side-by-side on right 40%
- Hide variant picker in production (Reel only)
- Drop Willem entirely for faster entry
- Ahmed sign-off: Reel vs Teaser fan vs Brief/Ledger/Arc

---

## HeroTeaser (fan — `#prototype-teaser`)

**Pitch:** Cream surface + floating poster fan pivoting from right edge. Ahmed rejected — images too small, looks poor. Kept for A/B only.

**Files:** `HeroTeaser.tsx`, `hero-teaser.css`

---

## WillemHandoff (intro — still live)

**Mechanic:** Osmo clone [CodePen wBGYEMd](https://codepen.io/osmosupply/pen/wBGYEMd) — **Ah | [growing box] | med** → brief **Ahmed** → fade.

**Images:** `heroTeaserCards` — Volvo, CINEMATEK, Le Lièvrier posters  
**Assets:** `public/projects/volvo/volvo-poster.png`, `cinematek/cinematek-poster.png`, `le-lievrier/le-lievrier-poster.png`

**Changes from earlier sessions:**
- **No** fullscreen expand to 100vw (Volvo crop problem)
- Third flash now Le Lièvrier (was Martech mockup)
- Shorter handoff to hero

**Files:** `WillemHandoff.tsx`, `willem-handoff.css`

---

## Frames 02–07 (Fit Brief — wired, stable)

| Frame | File | Concept |
|-------|------|---------|
| 02 | `02_Capabilities.tsx` | 3 help modes (scratch → research → design) |
| 03 | `03_ProcessMap.tsx` | Process + `BriefMethodKit` scroll-draw shapes |
| 04 | `04_CaseStudies.tsx` | Exhibit viewer EXH-01…04 |
| 05 | `05_ExperienceProof.tsx` | Full `cvExperience` timeline from CV |
| 06 | `06_ServicesFit.tsx` | Recruiter scan matrix |
| 07 | `07_ContactClose.tsx` | Close CTA |

Frame 05 uses `cvExperience` (7 roles from updated CV), not university-only `experience`.

---

## Content model (`packages/shared/src/content.ts`)

### Profile (CV-synced)

```ts
profile.role        // "Marketing · CRM · Analytics · Digital Delivery"
profile.headline    // "Business needs · Digital execution · Measurable outcomes"
profile.heroFine    // Long positioning line
profile.status      // "Available — Summer 2026 internship · Odisee BBA 2026"
profile.education   // Odisee 2026
```

### Hero assets

```ts
heroTeaserCards[]   // Volvo, CINEMATEK, Le Lièvrier — intro + reel + teaser
heroVariants[]      // reel, classic (Teaser), brief, ledger, arc — picker metadata
impactMetrics[]     // 6 CV numbers — Ledger variant
journeyArc[]        // 7 eras — Arc variant
skillLanes[]        // 4 CV skill groups — Brief variant
heroBriefChapters[] // 4 pinned chapters — Brief variant
cvExperience[]      // Full work history — frame 05
```

### Landing reel (legacy)

Still used by dormant `HeroMosaic.tsx` and frame 04 paths. Many `public/projects/*` images 404 locally → gradient fallbacks.

---

## Key files map

```
src/app/
  App.tsx                    # #prototype vs #artboard
  components/
    Prototype.tsx              # Intro + hero variant + frames 02–07
    hero/
      WillemHandoff.tsx        # Intro loader
      HeroTeaser.tsx             # Fan variant (#prototype-teaser)
      HeroMosaic.tsx             # Dormant (not imported)
      IdentityHandoff.tsx        # Superseded; kept for reference
      HeroVariantPicker.tsx      # Bottom tabs
      readHeroVariant.ts         # Hash ↔ variant id
      variants/
        HeroVariantRouter.tsx
        HeroTeaserReel.tsx       # ★ Default hero
        HeroBriefScroll.tsx
        HeroImpactLedger.tsx
        HeroGuidedArc.tsx
      toolkit/MethodShape.tsx    # Frame 03 BriefMethodKit
    brief/BriefMethodKit.tsx
    frames/02–07_*.tsx
packages/shared/src/content.ts   # ★ Single source of truth
archive/studio/                  # Disapproved heroes — NOT in build
```

**Styles:** `hero-teaser-reel.css`, `hero-teaser.css`, `hero-variants.css`, `willem-handoff.css`, `theme.css`

---

## Ahmed feedback history (do not repeat)

| Thing | Verdict |
|-------|---------|
| 3D ring / `ProjectRingHero` | Rejected — slow, not catchy |
| `DecisionHero` | **"SO BAD"** |
| `MethodToolkitHero` | Disapproved |
| Static mosaic grid | Boring |
| Film-strip `HeroMosaic` bg | **Removed** |
| Darkroom A+B intro | Tried → **reverted** |
| Volvo fullscreen (Willem blow-up) | Rejected — crop/readability |
| Scroll-scrub hero video | Rejected — laggy |
| Stepped/cascade small posters | Rejected — detached, not full ads |
| Fan/roulette with pivot | Rejected — images too small |
| Reel ⅓-right crossfade only | Rejected — posters not full-height layers |
| Willem Ah\|med mechanic | **Kept** |
| Fit Brief frames 02–06 | **Approved / wired** |
| CV-aligned copy | **Wanted** — partially wired |
| Fullscreen poster parade → stack → name 60% | **Latest direction** — built, not signed off |
| Cream paper hero (`--pf-paper`) | **Wanted** — live on Reel + shell |
| Brief / Ledger / Arc variants | Built for comparison |

---

## Uncommitted work (as of Jun 2026 session)

On `studio/prototype-v0.4`:

**Modified:** `content.ts`, `App.tsx`, `Prototype.tsx`, `WillemHandoff.tsx`, `IdentityHandoff.tsx`, `05_ExperienceProof.tsx`, `index.css`, `willem-handoff.css`, `README.md`, `docs/HANDOFF.md`, `docs/STATUS.md`

**New:** `HeroTeaserReel.tsx`, `HeroTeaser.tsx`, hero `variants/*`, `HeroVariantPicker.tsx`, `readHeroVariant.ts`, `hero-teaser-reel.css`, `hero-teaser.css`, `hero-variants.css`, `docs/HERO_VARIANTS.md`, poster PNGs (`volvo`, `cinematek`, `le-lievrier`)

**Next agent:** Run `git status` before assuming clean tree. `npm run build` passes. Commit/push only if Ahmed asks.

---

## Run & test

```bash
npm install
npm run dev
# → http://localhost:5173/#prototype
```

**Dev server dies often** → re-run `npm run dev` from repo root.

**Test checklist:**
1. `#prototype` — Willem plays → Reel poster parade → name claims 60%
2. Skip intro works; nav restart replays Willem
3. Bottom picker: Teaser, Brief, Ledger, Arc switch without crash
4. Scroll past hero into frames 02–07; frame 03 shapes draw on scroll
5. Frame 05 shows full CV timeline
6. `npm run build` passes
7. Mobile: Willem skips animation; verify reel stacks or degrades gracefully
8. `#prototype-teaser` — fan variant still loads (comparison only)

---

## GSAP rules

- `useGSAP` + `{ scope, revertOnUpdate: true }`
- Do **not** mix GSAP and `motion/react` on same DOM node
- ScrollTrigger registered in `src/lib/gsapClient.ts`
- GSAP Flip is Club-only
- Reel uses on-load timeline + post-timeline ScrollTrigger for exit scrub

---

## Do NOT do without explicit ask

- Re-add `HeroMosaic` / film strips to prototype path
- Re-add scroll-scrub hero video
- Re-add Intro Gate as default entry
- Resurrect 3D ring as hero
- DecisionHero-style decks in intro
- Commit/push to GitHub
- Remove variant picker without Ahmed's say
- Replace Willem with a totally new intro without approval
- Revert Reel to small-card / fan layout as default without Ahmed asking

---

## Suggested next steps (priority order)

1. **Ahmed sign-off** on Reel timing and final 60/40 layout
2. Polish poster stack slots (overlap, spacing, z-index during push)
3. Beat copy cycling tied to poster sequence or scroll
4. Mobile-specific reel choreography (or static final state)
5. Wire `public/resume.pdf` to Ahmed's latest CV PDF
6. Polish Willem → Reel handoff (no double-flash feel)
7. Hide picker; single hero for production
8. Update `docs/HERO_VARIANTS.md` to document Reel
9. Align frame 02+ copy fully to CV

---

## Session changelog

| Session | Action |
|---------|--------|
| Ring / DecisionHero / MethodToolkit | Disapproved → `archive/` |
| Fit Brief 02–04–06 + BriefMethodKit | Wired |
| Osmo Willem + Ah\|med | Live |
| HeroMosaic v2 film strips | Live then **removed** |
| Darkroom A+B | Reverted |
| Repo cleanup + GitHub push | `main` + `studio/prototype-v0.4` |
| CV ingest (FR/EN PDFs) | `content.ts` expanded |
| Hero variants Brief/Ledger/Arc | Built for A/B |
| HeroTeaser fan + poster images | Built; deprioritized |
| HeroTeaserReel + fullscreen parade | **Current default** |
| Le Lièvrier poster replaces Martech | intro + reel + content |
| Cream paper shell + reel bg | Live |
| HeroHookVideo scroll-scrub | Added then **removed** |

---

## Adaptive memory

User preferences may also live in: `~/.cursor/skills/adaptive/MEMORY.md`
