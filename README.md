# Ahmed Mostafa — Portfolio Unified

Monorepo merging three Cursor chat projects into one workspace:

- **Studio** (root) — Animated scroll website with 8 cinematic frames
- **Guided Hero** (`apps/guided-hero`) — GSAP name→logo choreography + curtain reel
- **Martech** (`apps/martech`) — Production recruiter-first site (AhmedMostafa--Martech)

## Quick start

```bash
npm install
npm run dev          # Studio — http://localhost:5173
npm run dev:hero     # Guided hero — http://localhost:3000
npm run dev:martech  # Production site
```

Toggle Studio modes via URL hash:
- `#artboard` — wireframe review (desktop + mobile pairs)
- `#prototype` — full animated experience

## Branches

| Branch | Purpose |
|--------|---------|
| `main` | Baseline / preserved default |
| `studio/prototype-v0.4` | **Active** — HeroTeaser + Willem posters + Fit Brief |

Agents: clone and checkout `studio/prototype-v0.4` for current work.

## Docs

- [Status snapshot](./docs/STATUS.md) — what's live, branch info, session summary
- [Agent handoff](./docs/HANDOFF.md) — hero brief + rejection history
- [Project tree](./docs/PROJECT_TREE.md) — full directory map
- [Merge guide](./docs/MERGE_GUIDE.md) — integration paths between the three apps
- [Scope plan](./docs/plans/scope-context-develop-modular-sloth.md) — original wireframe brief
- [Hero variants](./docs/HERO_VARIANTS.md) — Brief / Ledger / Arc comparison

## Shared package

```ts
import { profile, provenWork, featuredProjects } from "@portfolio/shared/content";
```

Single source of truth for copy merged from sketches, martech `data.js`, and guided-hero `projects-data.js`.
