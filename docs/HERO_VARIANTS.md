# Hero variants — scroll-driven concepts

Built from Ahmed's updated CV (FR/EN). Compare live using the bottom picker, or deep-link:

| URL hash | Variant |
|----------|---------|
| `#prototype` | **Reel** (default) — fullscreen poster parade → stack right → name 60% |
| `#prototype-teaser` | **Teaser** — floating poster fan from right edge |
| `#prototype-brief` | **Brief** — pinned four-chapter scroll |
| `#prototype-ledger` | **Ledger** — impact metrics scan |
| `#prototype-arc` | **Arc** — journey timeline |

---

## Variant 0 — Reel (`HeroTeaserReel`) — **DEFAULT**

**Pitch:** Posters are the hero. Each campaign poster owns fullscreen on load, then the next pushes the previous right (full viewport height throughout). After all three stack on the right, Ahmed enters claiming 60% left; posters compress into ~40% right.

| Beat | Content |
|------|---------|
| 1 | Volvo poster fullscreen |
| 2 | CINEMATEK fullscreen; Volvo slides right |
| 3 | Le Lièvrier fullscreen; first two stack |
| 4 | Name + status + first beat line; posters in narrow right slots |
| 5 | Scroll exit into frame 02 |

**Files:** `variants/HeroTeaserReel.tsx`, `hero-teaser-reel.css`  
**Assets:** `heroTeaserCards` — Volvo, CINEMATEK, Le Lièvrier posters in `public/projects/`

---

## Shared principles

1. **Animation guides, never decorates** — each scroll beat answers one recruiter question.
2. **Business value first** — metrics and roles from CV, not generic portfolio filler.
3. **Premium editorial noir** — one accent (Volcanico), tonal darks, monospace metadata.
4. **Functional handoff** — every variant links to frames 04–07 (work, experience, contact).

---

## Variant A — Brief (`HeroBriefScroll`)

**Pitch:** A pinned fit brief that unfolds in four chapters as you scroll.

| Scroll chapter | Recruiter gets | Trigger |
|----------------|----------------|---------|
| Profile | Who you are + positioning | Pin + scrub chapter 1→2 |
| Proof | Top 3 CV metrics (40%, 27%, 22%) | Rail dot + crossfade |
| Range | Four skill lanes from CV | Lane grid reveal |
| Next | Internship CTA + CV download | Final chapter + CTAs |

**Why it helps:** Mirrors the Fit Brief system (frames 02–06). Feels like opening a dossier — leadership through structure, not loud copy.

**ScrollTrigger:** `pin` + `scrub: 0.55` on ~320% scroll depth.

---

## Variant B — Ledger (`HeroImpactLedger`)

**Pitch:** Bloomberg-style proof ledger — one metric lit at a time.

| Beat | Content |
|------|---------|
| Header | Role line + "Proof you can audit" |
| Cards | 6 CV metrics with context + tools |
| Scan | Scroll activates each card sequentially |
| Exit | Experience frame + CV |

**Why it helps:** HR can scan numbers in ~8 seconds. Shows **business value addition** without essay copy. Confidence through verifiable outcomes.

**ScrollTrigger:** Pinned grid; `call()` on timeline steps to toggle `.is--active`.

---

## Variant C — Arc (`HeroGuidedArc`)

**Pitch:** Operating arc from Vodafone (2011) → Odisee marketing focus (now).

| Beat | Story |
|------|-------|
| Intro | Wide lens positioning statement |
| Timeline | 7 eras with progress line scrub |
| Detail | Active era title, org, note, lane tag |
| Exit | Projects + contact |

**Why it helps:** Explains the **journey** — customer → build → CRM → IT leadership → consulting → marketing. Answers "why marketing now?" with evidence, not a pivot story.

**ScrollTrigger:** Line `scaleX` scrub + era detail swaps on timeline progress.

---

## CV content wired

- `packages/shared/src/content.ts` — `profile`, `impactMetrics`, `journeyArc`, `skillLanes`, `cvExperience`
- Frame **05** — full `cvExperience` timeline
- Classic hero — updated `profile.role`, `heroFine`, education line

---

## Picking a winner

| If you prioritise… | Lean toward |
|--------------------|-------------|
| Recruiter scan speed | **Ledger** |
| Narrative + breadth | **Arc** |
| Fit with rest of site | **Brief** |
| Cinematic intro + minimal copy | **Classic** (Willem) |

Hybrid paths: Willem intro → **Brief** chapters, or **Ledger** cards as frame 01 with film mosaic bg.

---

## Files

```
src/app/components/hero/variants/
  HeroBriefScroll.tsx
  HeroImpactLedger.tsx
  HeroGuidedArc.tsx
  HeroVariantRouter.tsx
src/styles/hero-variants.css
```
