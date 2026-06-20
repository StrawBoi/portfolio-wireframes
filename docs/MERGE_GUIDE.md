# Merge Guide

How the three source projects connect and how to integrate them.

## Motion stack by app

| App | Library | Best for |
|-----|---------|----------|
| Studio (`src/`) | `motion/react` | Scroll-scrubbed frames, layout morphs, intro curtain |
| Guided hero | `gsap` + `@gsap/react` + `lenis` | Pinned scroll, Flip logo, curtain panels |
| Martech | CSS transitions + `useReveal` | Recruiter scan speed, restrained reveals |

Per GSAP React docs (`@gsap/react`): use `useGSAP` with `{ scope: containerRef, revertOnUpdate: true }` when porting hero animations into Studio. Do **not** mix GSAP and motion/react on the same DOM node — isolate hero in its own scoped container.

## Integration paths

### Path A — Hero replaces Studio intro (cinematic)

```
00_IntroGate (Quick/Slow) 
    → curtain transition (existing)
    → GuidedHero (ported from apps/guided-hero/components/Hero.jsx)
    → frames 02–07 (existing scroll site)
```

### Path B — Hero feeds martech (production)

```
apps/martech HomePage sections/Hero.jsx
    ← port name→logo Flip from guided-hero
    ← copy from packages/shared/content.ts
```

### Path C — Content-only merge (safest first step)

Import shared data into studio frames:

```ts
import { provenWork, experience, featuredProjects } from "@portfolio/shared/content";
```

Already wired: `05_ExperienceProof.tsx` can consume `provenWork.teams` and `experience[]`.

## Shared content contract

`packages/shared/src/content.ts` is the canonical merge point:

- `profile` — name, tagline, hero fine line
- `provenWork` — CinemaTech, Volvo, Vantier, Tlosol, GTM brands
- `experience` — Celura Marine, AE Garden, Ello Narrate
- `featuredProjects` — curtain reel + case study IDs
- `processFlow` / `methodCards` — sketch process map
- `introGate` — wow moment copy

Update this file once; propagate to all three apps.

## Original source locations (read-only reference)

| Label | Path |
|-------|------|
| Guided hero (original) | `C:\Users\Ahmed\Desktop\Ag\portfolio` |
| Martech (original) | `C:\Users\Ahmed\Downloads\AhmedMostafa--Martech-main` |
| Studio (Figma Make) | Figma file `sUW2xGDvD6Dc5kQuBPKVRA` |
| 3rdgen variants | `C:\Users\Ahmed\Desktop\3rdgen` (not copied — optional future import) |

## Next implementation tasks

1. Port `Hero.jsx` into `src/app/components/hero/GuidedHero.tsx` (Vite-compatible, drop Next.js imports)
2. Replace placeholder logos in `05_ExperienceProof` with `provenWork` from shared
3. Add `npm run dev:all` concurrently script when ready to preview side-by-side
4. Align typography: studio uses Bricolage/Inter Tight; martech uses Fraunces/DM Sans — pick one editorial system in `tokens.css`
