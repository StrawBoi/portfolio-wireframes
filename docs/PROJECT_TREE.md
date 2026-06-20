# Portfolio Unified — Project Tree

Merged monorepo combining three past chats into one workspace.

| Source chat | Original path | Role in unified project |
|-------------|---------------|-------------------------|
| **Animated scroll website** | `src/` (root) | **Studio** — 8-frame cinematic scroll prototype |
| **Guided hero animation** | `apps/guided-hero/` | **Hero lab** — GSAP + Lenis name→logo choreography |
| **ahmedmostafa--martech** | `apps/martech/` | **Production site** — recruiter-first pages + real copy |

---

## Directory tree

```
portfolio-unified/                          ← you are here (root = Studio app)
│
├── src/                                    # STUDIO — Animated scroll website
│   ├── app/
│   │   ├── App.tsx                         # Artboard ↔ Prototype mode switcher
│   │   ├── components/
│   │   │   ├── Prototype.tsx               # ★ Live cinematic experience (#prototype)
│   │   │   ├── hero/
│   │   │   │   ├── WillemHandoff.tsx       # ★ Live intro (Osmo Ah|med)
│   │   │   │   ├── HeroMosaic.tsx          # ★ Film-strip background
│   │   │   │   ├── IdentityHandoff.tsx     # ★ First copy beat
│   │   │   │   ├── RecruiterAssist.tsx     # Artboard Intro Gate only
│   │   │   │   └── toolkit/MethodShape.tsx # Frame 03 scroll-draw shapes
│   │   │   ├── brief/BriefMethodKit.tsx    # Frame 03 method kit
│   │   │   ├── Artboard.tsx                # Wireframe review surface
│   │   │   ├── frames/
│   │   │   │   ├── 00_IntroGate.tsx        # Artboard only (not in #prototype)
│   │   │   │   ├── 01_HomeHero.tsx         # Wireframe hero reference
│   │   │   │   ├── 02_Capabilities.tsx     # Fit Brief — help modes
│   │   │   │   ├── 03_ProcessMap.tsx       # Process + BriefMethodKit
│   │   │   │   ├── 04_CaseStudies.tsx      # Exhibit viewer
│   │   │   │   ├── 05_ExperienceProof.tsx  # Proven work
│   │   │   │   ├── 06_ServicesFit.tsx      # Recruiter scan matrix
│   │   │   │   └── 07_ContactClose.tsx     # Closing CTA
│   │   │   └── wireframe/Primitives.tsx
│   │   └── motion/
│   │       ├── MotionMode.tsx              # Quick / Slow paths
│   │       ├── Reveal.tsx
│   │       └── Magnetic.tsx
│   └── styles/
│       ├── theme.css                       # Volcanico / Noturno tokens
│       ├── willem-handoff.css              # Live Willem intro
│       ├── hero-mosaic.css                 # Film strips
│       └── fonts.css
│
├── archive/                                # NOT in Vite build — reference / reuse
│   ├── README.md
│   └── studio/
│       ├── hero-experiments/               # Ring, DecisionHero, GuidedHero, …
│       ├── ui/src-ui/                      # Unused shadcn kit
│       ├── figma/
│       └── styles/hero-experiments.css
│
├── apps/
│   ├── guided-hero/                        # GUIDED HERO — GSAP animation lab
│   │   ├── app/
│   │   │   ├── page.js                     # Home shell
│   │   │   ├── layout.js
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── Hero.jsx                    # ★ Name stagger → logo on scroll (Flip)
│   │   │   ├── HeroTransition.jsx          # Marketing-term parallax bridge
│   │   │   ├── ProjectSection.jsx          # Curtain panel reel
│   │   │   ├── SmoothScroll.jsx            # Lenis wrapper
│   │   │   └── Navbar.jsx                  # Logo choreography target
│   │   └── lib/
│   │       ├── gsap-client.js              # GSAP + ScrollTrigger + Flip
│   │       ├── hero-timeline.js            # Intro timeline
│   │       └── projects-data.js            # Curtain reel assets
│   │
│   └── martech/                            # MARTECH — Production recruiter site
│       ├── src/
│       │   ├── App.jsx                     # React Router shell
│       │   ├── pages/
│       │   │   ├── HomePage.jsx
│       │   │   ├── ProjectsPage.jsx
│       │   │   ├── ProjectDetailPage.jsx
│       │   │   ├── AboutPage.jsx
│       │   │   └── ContactPage.jsx
│       │   ├── components/
│       │   │   ├── sections/               # Hero, ProofStrip, FeaturedWork…
│       │   │   └── ui/                     # shadcn components
│       │   └── lib/
│       │       └── data.js                 # ★ Real profile + project copy
│       └── public/                         # CV, project images, OG assets
│
├── packages/
│   └── shared/                             # SHARED — single source of truth
│       └── src/
│           ├── content.ts                  # Merged sketch + martech + hero data
│           ├── tokens.css                  # Cross-app design tokens
│           └── index.ts
│
├── docs/
│   ├── STATUS.md                           # ★ Live snapshot for agents
│   ├── HANDOFF.md                          # Agent brief + hero history
│   ├── PROJECT_TREE.md                     # This file
│   ├── MERGE_GUIDE.md
│   ├── plans/                              # Scope + merge plans
│   ├── sources/martech-memory/             # PRD snapshot
│   └── guidelines/                         # Design guidelines
│
├── package.json                            # Root = Studio (Vite + motion/react)
├── pnpm-workspace.yaml
└── vite.config.ts
```

---

## Sketch → frame mapping

From your handwritten wireframes:

| Sketch section | Studio frame | Martech equivalent | Hero lab |
|----------------|--------------|-------------------|----------|
| Landing / Wow moment | `00_IntroGate` | — | — |
| Don't tell, show | `01_HomeHero` | `sections/Hero` | `Hero.jsx` intro |
| Skills / ways to help | `02_Capabilities` | `CapabilityPillars` | `Skills.jsx` |
| Process + ROI graph | `03_ProcessMap` | — | `HeroTransition` terms |
| Case studies | `04_CaseStudies` | `FeaturedWork` | `Projects.jsx` |
| Proven work + Experience | `05_ExperienceProof` | `ProofStrip` + `Journey` | curtain reel |
| Impossible → Possible | `05_ExperienceProof` | — | — |
| Freelance & remote | `05_ExperienceProof` | — | — |
| Services fit | `06_ServicesFit` | — | — |
| Contact close | `07_ContactClose` | `ContactCTA` + `ContactPage` | `Contact.jsx` |
| Glow click → scramble | `00_IntroGate` + `Prototype` curtain | — | — |
| Name → logo on scroll | — | — | `Hero.jsx` Flip |

---

## Run commands

```bash
# Studio (animated scroll) — default, port 5173
npm run dev

# Guided hero (GSAP + Next.js) — port 3000
npm run dev:hero

# Martech production site (Vite) — port 5174+
npm run dev:martech
```

---

## Merge priority (recommended build order)

1. **Content** — pull copy from `@portfolio/shared` into studio frames
2. **Hero** — port `Hero.jsx` GSAP choreography into `01_HomeHero` or replace intro gate handoff
3. **Production** — when studio is approved, promote sections into `apps/martech`
