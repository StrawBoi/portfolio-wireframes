# Studio status — portfolio-wireframes

Snapshot for agents and collaborators. **Branch:** `studio/prototype-v0.4` (active development). **`main`** preserved for baseline / wireframe-only work.

---

## What is live (`#prototype`)

```
WillemHandoff (Ah | flashes | med → Ahmed, random gradient plate — not Volvo)
  → hero:mosaic-reveal → HeroMosaic (film strips)
  → hero:logo-ready → MainNav + IdentityHandoff
  → Frames 02–07 (Fit Brief)
```

| Component | Path | Role |
|-----------|------|------|
| Orchestration | `src/app/components/Prototype.tsx` | Intro + scroll journey |
| Willem intro | `src/app/components/hero/WillemHandoff.tsx` | Osmo loader clone |
| Film background | `src/app/components/hero/HeroMosaic.tsx` | Moving project strips |
| First copy | `src/app/components/hero/IdentityHandoff.tsx` | Name + tagline + CTAs |
| Method shapes | `src/app/components/brief/BriefMethodKit.tsx` | Frame 03 scroll-draw |
| Shared content | `packages/shared/src/content.ts` | Copy, reel, fit matrix |

**Default URL:** `http://localhost:5173/#prototype`

---

## Artboard mode (`#artboard`)

Wireframe review for frames 00–07 (desktop + mobile pairs). Intro Gate still visible here only — **not** in prototype path.

---

## Monorepo apps

| Path | Role |
|------|------|
| `src/` | **Studio** — Vite prototype (this doc) |
| `apps/guided-hero/` | GSAP hero lab (Next.js reference) |
| `apps/martech/` | Production martech site reference |
| `packages/shared/` | Canonical `content.ts` + tokens |

---

## Session history (summary)

| Phase | Outcome |
|-------|---------|
| Ring / DecisionHero / MethodToolkit | Disapproved → archived |
| Fit Brief frames 02–04–06 + BriefMethodKit | Wired ✓ |
| Osmo Willem clone + Ah\|med split | Live ✓ |
| HeroMosaic v2 (film strips) | Live ✓ |
| Darkroom + Aperture intro (A+B) | Tried → **reverted** |
| Willem + random gradient plate (no Volvo land) | Current ✓ |
| Repo cleanup + archive | This commit |

---

## Hero — open items (Ahmed)

- Hero not fully signed off — Willem mechanic kept; fullscreen plate is placeholder gradient until layered art lands
- Film strips = movement but may need more “hook”
- Verify **AHMED** typography clipping on all viewports

---

## Archived experiments

Unused components live under `archive/studio/` — see `archive/README.md`. **Not built by Vite.**

---

## Docs index

| Doc | Purpose |
|-----|---------|
| [HANDOFF.md](./HANDOFF.md) | Agent brief + rejection history |
| [MERGE_GUIDE.md](./MERGE_GUIDE.md) | Cross-app integration |
| [PROJECT_TREE.md](./PROJECT_TREE.md) | Directory map |
| [plans/](./plans/) | Original scope + landing merge plans |
| [guidelines/Guidelines.md](./guidelines/Guidelines.md) | Design guidelines |

---

## Run

```bash
npm install
npm run dev          # Studio → #prototype
npm run dev:hero     # apps/guided-hero
npm run dev:martech  # apps/martech
npm run build        # Studio production build
```

---

## For the next agent

1. Read **HANDOFF.md** + this file
2. Open `#prototype` — do not re-add Intro Gate to prototype path
3. Hero changes: propose direction before large rebuilds
4. Re-use archived experiments from `archive/studio/hero-experiments/` only with explicit ask
