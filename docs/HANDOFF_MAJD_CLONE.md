# Majd Clone + Social Narrative — Agent Handoff

> **Last updated:** 2026-06-24  
> **Branch:** `narrative/social-feed`  
> **Reference site:** https://majd-portfolio.framer.website/  
> **Owner:** Ahmed Mohsen Mostafa — Brussels, marketing internship Summer 2026

---

## Prompt for next chat (paste this first)

```
Read docs/HANDOFF_MAJD_CLONE.md first, then docs/social-narrative/DIRECTOR.md.

Ahmed rejected the current Majd hero animation — it reads like a "kids animation" (full 360° spin + cartoon scale). Your job is to match the REFERENCE scroll behavior on https://majd-portfolio.framer.website/, not invent a gimmick.

Before coding:
1. Open #majd locally and the reference site side-by-side (use cursor-ide-browser MCP).
2. Record scroll phases: idle → pin start → mid → handoff → about section.
3. Propose timing/easing changes BEFORE a large rewrite.

Sacred: do NOT break #prototype (WillemHandoff → HeroFrameReveal). Majd and social are lab routes only.

Build: pnpm run build. Verify #majd and #social after changes.
Commit only if Ahmed asks.
```

---

## Mission

Build a **faithful Majd-style scroll hero** (cream editorial, pinned portrait handoff) as a **reference lab**, then optionally port the motion grammar into `#social` (IG profile → poster flies into grid cell).

**Current state:** Layout and sections exist. **Motion is wrong** — treat animation as greenfield rework inside existing DOM/CSS shell.

---

## What Ahmed rejected (do not repeat)

| Current (`MajdHero.tsx`) | Why it fails |
|--------------------------|--------------|
| `rotateZ: -12 → 360` over scrub | Full spin feels toy-like, not editorial |
| `scale: 1 → 3.2` + `y: -24vh` | Overshoots; no controlled landing |
| Title/meta fade on same timeline as spin | Everything moves at once — no hierarchy |
| Portrait fades out at 82% progress | Reference keeps image presence into next beat |

**Direction:** Study the reference frame-by-frame. Majd motion is **slow, weighted, minimal axes** — likely subtle scale + vertical drift + opacity choreography, **not** a carnival spin. Prefer **one dominant transform** (scale OR Y OR slight rotateY) with title typography receding first.

---

## Reference behavior (study checklist)

Use browser MCP on https://majd-portfolio.framer.website/ and fill this table while scrolling:

| Phase | Scroll % (approx) | Portrait | Title "SOFTWARE ENGINEER" | Nav pill | Next section |
|-------|-------------------|----------|---------------------------|----------|--------------|
| Idle | 0 | Small, between ©2026 and /CREATING SINCE | Full size, centered | Visible black pill | — |
| Pin engage | ? | ? | ? | ? | Hero still pinned |
| Mid | ? | ? | ? | ? | — |
| Release | ? | ? | ? | ? | About "Hey!" enters |

**Acceptance:** Ahmed should not be able to tell "different engine" from reference at hero scroll speed on desktop. Mobile may simplify (no pin or shorter pin).

---

## Routes (hash SPA)

| Hash | Component | Grain | Notes |
|------|-----------|-------|-------|
| `#prototype` | `Prototype.tsx` | On | **Sacred** — Willem intro + dossier frames |
| `#social` | `SocialNarrativeLab.tsx` | Off | IG profile + grid + handoff pin lab |
| `#majd` | `MajdClone.tsx` | Off | Majd reference clone |

Router: `src/app/App.tsx` → `useHashRoute()`.

**Preview URLs:**
- http://localhost:5173/#majd
- http://localhost:5173/#social
- http://localhost:5173/#prototype

---

## File map

### Majd clone
| File | Role |
|------|------|
| `src/app/majd/MajdHero.tsx` | **Fix here** — ScrollTrigger pin + portrait timeline |
| `src/app/majd/MajdClone.tsx` | Full page sections (about, services, works, etc.) |
| `src/app/majd/majdContent.ts` | Copy + image paths |
| `src/styles/majd-clone.css` | Cream paper, typography, layout |

### Social narrative lab
| File | Role |
|------|------|
| `src/app/social/SocialNarrativeLab.tsx` | Lab shell + banner links |
| `src/app/social/SocialHandoffPin.tsx` | Poster pin → fly into grid cell (same motion problem space) |
| `src/app/social/SocialProfileHero.tsx` | IG-style profile block |
| `src/app/social/SocialGridTeaser.tsx` | Unequal mosaic grid |
| `src/app/social/socialGridData.ts` | 22 cells, `heroScrollPick` target for handoff |
| `src/styles/social-narrative.css` | Cream IG column grammar |

### Shared motion infrastructure
| File | Role |
|------|------|
| `src/lib/gsapClient.ts` | Single GSAP + ScrollTrigger + useGSAP registration |
| `src/app/motion/SmoothScroll.tsx` | Lenis + `ScrollTrigger.scrollerProxy(document.documentElement)` |
| `src/app/App.tsx` | Route switch + `SmoothScrollProvider` wrapper |

### Good motion references in-repo (read before rewriting)
| File | Why |
|------|-----|
| `src/app/components/hero/WillemHandoff.tsx` | Cinematic intro timing, eased sequences |
| `src/app/components/hero/variants/HeroFrameReveal.tsx` | Pinned hero + scrub discipline |
| `src/app/components/hero/variants/HeroUxJourney.tsx` | Long pin scrub `+=320%` pattern |

---

## Stack & npm packages

**Runtime (already installed — do not add Framer Motion for hero):**

| Package | Version | Use |
|---------|---------|-----|
| `gsap` | ^3.15 | Timelines, ScrollTrigger |
| `@gsap/react` | ^2.1.2 | `useGSAP` hook + scope cleanup |
| `lenis` | ^1.3.23 | Smooth scroll; must sync with ScrollTrigger |
| `react` / `react-dom` | 18.3.1 | UI |
| `vite` | 6.3.5 | Dev/build |

**GSAP plugins in use:** `ScrollTrigger` only (no ScrollSmoother — Lenis replaces it).

**Not needed for this task:** Spline, MUI, motion (Framer), embla — ignore unless touching prototype.

---

## ScrollTrigger + Lenis rules (mandatory)

1. **Always** set `scroller: document.documentElement` on ScrollTrigger instances when Lenis is active.
2. **Never** double-pin the same element without `pinSpacing` awareness.
3. Call `ScrollTrigger.refresh()` after images load and on resize (see `SmoothScroll.tsx`).
4. Use `useGSAP({ scope: rootRef })` and kill timelines + triggers in cleanup.
5. **`prefers-reduced-motion`:** skip pin/spin; show final layout state.
6. Prefer **transform + opacity** only — no layout-thrashing width/height tweens on fixed flyers unless necessary (see `SocialHandoffPin` for fixed-position pattern).
7. Import GSAP from `src/lib/gsapClient.ts` — never duplicate `registerPlugin`.

```tsx
// Pattern
import gsap, { ScrollTrigger } from "../../lib/gsapClient";
import { useGSAP } from "@gsap/react";

scrollTrigger: {
  scroller: document.documentElement,
  trigger: root,
  start: "top top",
  end: "+=…",
  pin: pinEl,
  scrub: true, // or small number 0.3–0.8 for weight
  anticipatePin: 1,
  invalidateOnRefresh: true,
}
```

---

## Cursor rules (repo)

| Rule | Path | Applies |
|------|------|---------|
| Stack + flow | `.cursor/rules/portfolio.mdc` | Always |
| Creative identity + anti-rules | `.cursor/rules/portfolio-creative.mdc` | Always |

**User rules (global):** design-philosophy.mdc, project-identity.mdc — cinematic documentary, one accent, name transforms, no generic dev portfolio.

**For Majd lab specifically:** cream paper `#F0EDE4`, bold display type — match reference, not dossier dark mode.

---

## MCP servers to enable (Cursor)

| MCP | Use for this task |
|-----|-------------------|
| **cursor-ide-browser** | Side-by-side scroll capture of reference vs `#majd`; verify pin points |
| **plugin-context7-plugin-context7** | GSAP ScrollTrigger + `@gsap/react` API if unsure |
| **plugin-gsap-skills** (via skills) | ScrollTrigger, timeline, React lifecycle patterns |

Optional: **plugin-figma-figma** only if Ahmed provides Framer export frames.

---

## Skills to load (in order)

1. **gsap-scrolltrigger** — pin, scrub, scrollerProxy with Lenis  
2. **gsap-react** — `useGSAP`, context cleanup  
3. **gsap-timeline** — phased hero choreography  
4. **gsap-performance** — transform-only, reduced motion  
5. **modern-web-guidance** — if touching CSS/viewport units  

Path pattern: `~/.cursor/plugins/cache/cursor-public/gsap-skills/.../skills/<name>/SKILL.md`

---

## Social handoff (secondary target)

After Majd hero is correct, port motion to `#social`:

- **Pick card:** Le Lièvrier noir — `heroScrollPick` in `socialGridData.ts`
- **Target cell:** `[data-cell="lievrier"]` in grid
- **Component:** `SocialHandoffPin.tsx` — fixed-position flyer + scrub progress

Same failure mode: full 360° spin reads cheap. Match Majd **weight** even when flying into a grid cell.

Director brief: `docs/social-narrative/DIRECTOR.md`

---

## Assets

| Asset | Path |
|-------|------|
| Majd portrait stand-in | `/projects/ahmed/ahmed-portrait.png` |
| Project tiles (Majd works) | `majdProjectFallbacks` in `majdContent.ts` |
| Social grid campaigns | `/projects/volvo/`, `/projects/cinematek/`, `/projects/le-lievrier/` |

Volvo hero video (grid cell): `/projects/volvo/volvo-hero.mp4` + `.webm`

---

## Commands

```bash
pnpm install
pnpm run dev      # http://localhost:5173/#majd
pnpm run build    # must pass before handoff
```

---

## Acceptance criteria

- [ ] Hero scroll on `#majd` matches reference **feel** (slow, editorial, no cartoon spin)
- [ ] Pin releases cleanly into About section without jump/flash
- [ ] Lenis + ScrollTrigger stay in sync (no scroll fighting)
- [ ] `#prototype` unchanged and still builds
- [ ] `#social` handoff updated OR documented blockers
- [ ] `prefers-reduced-motion` degrades gracefully
- [ ] `pnpm run build` passes

---

## Related docs

| Doc | Content |
|-----|---------|
| `docs/HANDOFF.md` | Main prototype / Willem hero (do not break) |
| `docs/HANDOFF_AWWARDS.md` | Awwwards polish roadmap for `#prototype` |
| `docs/social-narrative/DIRECTOR.md` | Social narrative strategy |
| `docs/STATUS.md` | Quick branch snapshot |

---

## Repo

- **GitHub:** https://github.com/StrawBoi/portfolio-wireframes (private)
- **Branch:** `narrative/social-feed`
