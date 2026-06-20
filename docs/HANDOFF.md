# Handoff — portfolio-wireframes

Brief for the **next agent**. Read this + `docs/MERGE_GUIDE.md` + `docs/sketches/portfolio-draft-v1.png` before coding.

---

## ⚠️ Your first job (read this)

**Ahmed has not signed off on the current hero.** He wants the **next agent to think creatively and propose genuinely different directions** — not incremental polish on what exists.

### What to do first

1. Read this file + skim the live flow at `#prototype`
2. **Do not jump straight to code.** Present **3–5 distinct creative concepts** for the opening 5–8 seconds (intro → first copy)
3. Each concept: one-sentence pitch, motion story (beats), why it fits editorial noir / recruiter audience, what you’d reject from past failures
4. Wait for Ahmed to pick one (or hybrid) before a full rebuild

### What “different” means here

Ahmed explicitly rejected feeling like:
- A dev portfolio template
- A 3D ring / carousel with 3 flat images (no real depth)
- Static project wallpaper (boring)
- Slow gaps between name → fullscreen project → landing
- Volvo fullscreen that crops the brand off the board mockup
- Clipped / cramped **AHMED** typography
- The old Intro Gate landing page (removed — Willem intro is the entry now)

He **has** responded positively to:
- Osmo **Willem** loader mechanic ([CodePen wBGYEMd](https://codepen.io/osmosupply/pen/wBGYEMd)) cloned with his project photos
- **Ah | [images] | med** split naming
- Movement in the background (film strips helped; still not “the one”)
- Fit Brief system on frames 02–06 (help modes, exhibit viewer, fit matrix, frame 03 shape kit)

---

## Who this is for

**Ahmed Mohsen Mostafa** — Brussels-based. Positioning: marketing / research / analytics **intern** (Summer 2026), not senior IT. Voice: recruiter-first, systems mind, martech confidence.

**Audience:** HR directors, hiring managers, marketing leads in Belgium / Europe.

**Aesthetic:** Editorial noir × data intelligence. Reference tones: Bloomberg Terminal, Guardian longform, A24 titles. **One accent:** Volcanico `#FF4103`. Everything else tonal.

**Anti-rules (never):**
- Generic dev portfolio (purple gradients, Inter/Roboto, skill bars, cookie-cutter card grids)
- Giant centered name + pinned scroll as default hero
- Spline robot / glassmorphism HR widgets in hero path
- Floating giant “SWOT / ROI” text without shapes
- Pre-rendered hero video for interactive diagrams (kills scroll ownership)
- Explaining what you're doing in code comments — just build it

---

## North star (evolved — no longer “ring”)

> **Cinematic entry → work-first proof → name as logo → scroll journey**

| Beat | Current implementation | Notes |
|------|------------------------|-------|
| **Entry** | `WillemHandoff` on load — no Intro Gate | Ahmed removed landing page |
| **Name** | **Ah** \| growing image box \| **med** → fullscreen **Ahmed** | Fix clipping with letter-spacing + padding |
| **Projects** | 3 flashes in box (Vantier → Martech → Volvo), then brief fullscreen Volvo | Volvo uses `object-fit: contain` to show board |
| **Background** | `HeroMosaic` — 3 horizontal film strips, scan line, spotlight | Movement ok; hook TBD |
| **Fullscreen plate** | Random tonal gradient (not Volvo) | Placeholder until layered art |
| **First copy** | `IdentityHandoff` over dark moving bg | Ahmed + Mohsen Mostafa subtitle + CTAs |
| **Journey** | Frames 02–07 (Fit Brief reframes) | Sand paper `#F0EDE4` from frame 02 onward |

Sketch method shapes (SWOT, competitor grid, ROI, funnel) belong on **frame 03 Process**, not the intro.

---

## What is live now (prototype)

**URL:** `http://localhost:5173/#prototype`  
**Default mode:** `#prototype` (App.tsx sets this when hash is empty)

### Journey flow (`src/app/components/Prototype.tsx`)

```
WillemHandoff (fixed overlay, auto ~3–4s)
  → hero:mosaic-reveal → HeroMosaic (film strips, fixed bg)
  → hero:logo-ready → MainNav + IdentityHandoff
  → Frames 02–07
```

**State flags:**
- `introDone` — Willem finished; main shell mounts
- `mosaicReady` — listens for `hero:mosaic-reveal`
- `logoReady` — listens for `hero:logo-ready`

**Events (window):**
- `hero:mosaic-reveal` — fade in moving background
- `hero:logo-ready` — nav logo + identity beat

### Key components

| File | Status | Role |
|------|--------|------|
| `src/app/components/hero/WillemHandoff.tsx` | **Live** | Osmo Willem clone — Ah\|imgs\|med → Ahmed fullscreen |
| `src/app/components/hero/HeroMosaic.tsx` | **Live** | 3-row infinite film strip + scan + spotlight |
| `src/app/components/hero/IdentityHandoff.tsx` | **Live** | Post-intro name + tagline + CTAs (dark hero) |
| `src/app/components/Prototype.tsx` | **Live** | Orchestration (no Intro Gate) |
| `src/styles/willem-handoff.css` | **Live** | Willem layout |
| `src/styles/hero-mosaic.css` | **Live** | Film strip styles |
| `packages/shared/src/content.ts` | **Live** | `landingReel`, `helpModes`, `briefExhibits`, `fitMatrix` |
| `src/lib/gsapClient.ts` | **Live** | GSAP + ScrollTrigger |

### Frames 02–07 (Fit Brief — wired)

| Frame | File | Concept |
|-------|------|---------|
| 02 | `02_Capabilities.tsx` | 3 help modes (sketch: scratch → research → design) |
| 03 | `03_ProcessMap.tsx` | Process flow + `BriefMethodKit` scroll-draw shapes |
| 04 | `04_CaseStudies.tsx` | Exhibit viewer EXH-01…04 |
| 05 | `05_ExperienceProof.tsx` | (unchanged wire) |
| 06 | `06_ServicesFit.tsx` | Recruiter scan matrix |
| 07 | `07_ContactClose.tsx` | (unchanged wire) |

### Content — landing reel order

```ts
// packages/shared/src/content.ts → landingReel
1. volvo-belgium-campaign
2. marketing-intelligence
3. vantier
```

Images under `public/projects/` — many 404 locally; components fall back to accent gradients.

---

## Hero experiments (in repo, NOT wired)

| Component | What it was | Ahmed's reaction |
|-----------|-------------|------------------|
| `00_IntroGate.tsx` | Landing + Spline + Quick/Slow | **Removed from path** — intro is better without it |
| `ReelRingTransition.tsx` / `ReelHandoff.tsx` | Reel → ring / signal lock | Ring rejected; signal lock replaced by Willem |
| `GuidedHero.tsx` | Pinned name + side cards | Baseline; replaced |
| `MethodToolkitHero.tsx` | Noturno ROI diagram | Disapproved |
| `ProjectRingHero.tsx` | Auto reel + ring as hero | Too slow, not catchy |
| `DecisionHero.tsx` | Volvo brief + diagrams | **“SO BAD”** |

**Lesson:** Work-first visuals, punctuation transitions, zero copy on proof beats. No strategist decks in hero.

---

## Creative directions to explore (seed list — go further)

Past brainstorm + Ahmed feedback. **Your job is to add new ones**, not recycle these blindly:

| Idea | One-liner | Risk |
|------|-----------|------|
| **Willem++** | Refine Osmo loader but skip Volvo fullscreen; morph box directly into film world | Incremental — may bore |
| **Signal lock-on** | Static → crosshair → image resolves (Bloomberg acquire) | Tried briefly; may feel tech-bro |
| **Curtain slits** | Name letters are blades revealing project strips | Strong editorial |
| **Contact sheet** | Darkroom red glow, photos burn in sequentially | Cinematic, unique |
| **Terminal channel hop** | Fake Bloomberg feed switching EXH-01/02/03 | On-brand if restrained |
| **Horizontal evidence train** | One continuous pan, no fullscreen beat | Good breadth, weak anchor |
| **Accordion strip** (CodePen RNRwEjr) | Hover-expand project panels — better for **frame 04** than intro | Wrong zone for auto intro |
| **One beat, one frame** | Single project, single camera move, then name | Failed when copy-heavy (DecisionHero) |
| **Data mist** | Particle field coalesces into project thumbnails | High effort, high wow if tasteful |
| **Name as aperture** | Letters ARE the mask; content only visible through letterforms | Typography as logo rule |

**Ask:** What would A24 × Guardian × Bloomberg do for an **intern** portfolio in 2026 — not an agency reel?

---

## Willem / HeroMosaic — current implementation notes

### WillemHandoff
- GSAP timeline: letters rise → box grows → overlap expand to fullscreen → Ahmed letters → mosaic handoff
- Skip button top-right; `prefers-reduced-motion` + mobile skip animation
- Volvo: `object-fit: contain`, `object-position` animated top → board content
- Timing tightened in last session (overlap grow/expand, short hold before mosaic)

### HeroMosaic
- 3 horizontal rows, infinite GSAP `x` scroll (different speeds/directions)
- Diagonal tilt, vertical drift, Volcanico scan line, rotating `.is--lit` frame
- Fixed `position: fixed` behind hero; frame 02+ sand paper covers on scroll

### Known issues (Ahmed feedback)
- Still feels like a gap between name beat and project fullscreen
- Volvo fullscreen moment questionable — brand readability depends on asset crop
- **AHMED** was clipping — partial CSS fix; verify on multiple viewports
- Film strips = movement but not yet “hook” level mysterious/rich

---

## Monorepo map

| Path | Role |
|------|------|
| `src/` | **Studio** — live Vite prototype (`#prototype`) |
| `apps/guided-hero/` | GSAP hero lab (Next.js) — reference only |
| `apps/martech/` | Production martech site — reference copy |
| `packages/shared/` | Canonical `content.ts` |
| `docs/sketches/portfolio-draft-v1.png` | Ahmed's handwritten journey + method shapes |
| `docs/MERGE_GUIDE.md` | Merge rules, GSAP isolation |

---

## Run locally

```bash
npm run dev
# Prototype: http://localhost:5173/#prototype
```

**Dev server often dies** → `ERR_CONNECTION_REFUSED` on 5173. Re-run `npm run dev` from repo root.

**Test:**
1. Open `#prototype` — Willem plays immediately (no Enter click)
2. Watch Ah\|med → fullscreen → film strips → identity copy
3. Scroll frames 02–07

**Build:** `npm run build` (passes)

---

## GSAP rules

- `useGSAP` + `{ scope, revertOnUpdate: true }` in hero components
- Do **not** mix GSAP and motion/react on the same DOM node
- ScrollTrigger in `src/lib/gsapClient.ts`
- GSAP Flip is Club-only

---

## Do not do without explicit ask

- Re-add Intro Gate as default entry
- Resurrect 3D ring as hero centerpiece
- Add copy overlays on intro proof beats
- DecisionHero-style essay + diagrams in intro
- Commit/push unless Ahmed requests

---

## Session changelog

| Session | Action |
|---------|--------|
| Ring / MethodToolkit / DecisionHero | Disapproved |
| ReelRingTransition + zero copy | Built; ring later removed |
| Signal Lock-On | Brief attempt |
| Fit Brief frames 02–04–06 + BriefMethodKit | Wired |
| Osmo Willem clone | Ahmed asked to clone CodePen wBGYEMd with project photos |
| Intro Gate removed | Willem is entry |
| Name → Ahmed (Ah\|med) | Loader + identity |
| HeroMosaic v1 | Static grid — boring |
| HeroMosaic v2 | Film strips + movement |
| Timing / clipping / Volvo contain | Last polish pass |
| **This handoff** | Next agent: **propose creative alternatives before coding** |
| Darkroom A+B intro | Tried → **reverted** — Willem kept |
| Random gradient plate | Replaced Volvo fullscreen land |
| Repo cleanup | Unused heroes → `archive/`; docs consolidated |
| **Branch** | `studio/prototype-v0.4` — see `docs/STATUS.md` |

---

## Adaptive memory

User preferences: `~/.cursor/skills/adaptive/MEMORY.md`
