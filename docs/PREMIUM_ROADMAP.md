# Premium portfolio — master roadmap

> **Owner:** Ahmed Mohsen Mostafa  
> **Branch:** `premium/prototype`  
> **Live route:** `http://localhost:5173/#prototype`  
> **Repo:** https://github.com/StrawBoi/portfolio-wireframes  
> **Theory:** [Translator Arc](./PREMIUM_NARRATIVE_BRIEF.md) — Marketing spine · Build · Experience · Communication

This document is your **operating schedule**: what **you** do, what **which agent** does, and **when**. Do not skip gates.

---

## How to read this doc

| Column | Meaning |
|--------|---------|
| **You** | Ahmed — decisions, assets, browser QA, approvals |
| **Agent** | Model + mode + deliverable |
| **Gate** | Do not proceed until checked |

**Token rule:** One agent = one job. Opus once for narrative. Composer one phase at a time. Never “premium the whole site” in one chat.

---

## Timeline overview

```
Week 0 · Prep          → You gather sources, branch, dev server
Phase 0 · Narrative    → Opus writes PREMIUM_MASTER_NARRATIVE.md → You approve
Phase A · Front third  → Sonnet beat sheet → Composer implement → You QA
Phase B · Middle       → Method + Proof → You QA
Phase C · Back third   → Story rail + Contact finale → You QA
Phase D · Media grid   → Integrate social mosaic into #prototype → You QA
Phase E · Polish       → Cursor, edge marks, perf → You QA
Phase F · Ship         → CV file, deploy, LinkedIn link
```

Phases A–D order may shift per `PREMIUM_MASTER_NARRATIVE.md` (e.g. grid in Act 1 before exhibits). Follow the master doc after Phase 0.

---

## Week 0 — Prep (you only, ~1 hour)

**When:** Before any Opus chat.

### Your todos

- [ ] `git checkout premium/prototype` and `pnpm install`
- [ ] `pnpm run dev` → confirm `#prototype` loads
- [ ] Add CV PDF to repo (e.g. `docs/assets/Ahmed-CV-2026.pdf`) or keep file ready to attach in chat
- [ ] Confirm URLs: [LinkedIn](https://www.linkedin.com/in/ahmed-mohsen-hanafy/), [ahmedmohsenmostafa.com](https://ahmedmohsenmostafa.com), martech site path or live URL
- [ ] List 2–3 reference sites you like (structure only, not copy) — paste into Opus chat
- [ ] Enable MCP: **cursor-ide-browser** in Cursor settings
- [ ] Read [PREMIUM_NARRATIVE_BRIEF.md](./PREMIUM_NARRATIVE_BRIEF.md) (10 min) so you can reject bad narrative ideas

### Agent

None.

### Gate

- [ ] Dev server works · Willem intro plays · no blockers

---

## Phase 0 — Master narrative (Opus)

**When:** Week 0, same day as prep.  
**Goal:** One approved ideology doc — no code.

### Agent

| Setting | Value |
|---------|--------|
| **Model** | **Claude Opus (thinking)** |
| **Mode** | **Plan** |
| **Prompt** | Full block in [PREMIUM_NARRATIVE_BRIEF.md](./PREMIUM_NARRATIVE_BRIEF.md) (`---BEGIN---` → `---END---`) |
| **Attach** | CV PDF |
| **Output** | `docs/PREMIUM_MASTER_NARRATIVE.md` |

### Your todos

- [ ] Paste Opus command + attach CV
- [ ] Answer Opus questions (max 5) — positioning, grid placement, internship tone
- [ ] Read full `PREMIUM_MASTER_NARRATIVE.md`
- [ ] **Red-pen pass:** cross out any beat that doesn’t serve marketing-first story
- [ ] Approve or send one revision round to **Sonnet thinking** (cheaper than second Opus pass)
- [ ] Commit approved doc: `git add docs/PREMIUM_MASTER_NARRATIVE.md && git commit -m "Approve master narrative"`

### Gate

- [ ] One-sentence positioning you’d say out loud to a recruiter
- [ ] Attention map ≤ 5 moments — you can name them from memory
- [ ] Media grid placement decided in master doc
- [ ] Phase A/B/C/D scopes updated in master doc

---

## Site sections — who does what

Map of the live `#prototype` stack. Use with master narrative lens columns.

| § | Section | Funnel | Lead lens | Phase | Sacred? |
|---|---------|--------|-----------|-------|---------|
| 0 | Loader | — | — | — | Light touch only |
| 1 | WillemHandoff | Awareness | Communication | — | **Yes — no agent edits** |
| 2 | Campaign media grid | Awareness | Marketing | **D** | Integrate from `#social` |
| 3 | HeroFrameReveal + StoryStage | Interest | Marketing + Experience | **A** | Pin/fade only |
| 4 | FeaturedExhibits | Interest → Consideration | Marketing | **A** | Pin carousel |
| 5 | MethodSection | Consideration | Marketing (method) | **B** | Rail + reveals |
| 6 | ProofDossiersSection | Evaluation | Marketing + Build | **B** | Dossier boards |
| 7 | Story 05 + 06 | Evaluation → Decision | Communication + Marketing | **C** | **Redesign** |
| 8 | Contact 07 | Decision | Communication | **C** | CV conversion |
| — | MainNav / SiteMenu | — | Experience | **E** | Shrink, menu copy |
| — | CustomCursor / grain | — | Experience | **E** | Optional polish |

---

## Phase A — Hero + Exhibits (front third)

**When:** After Phase 0 gate.  
**Doc:** [PREMIUM_PHASE_A.md](./PREMIUM_PHASE_A.md) + approved master narrative § Acts 3–4.

### Step A1 — Beat sheet (Sonnet)

| Agent | **Claude Sonnet 4.5 (thinking)** · Plan mode |
|-------|-----------------------------------------------|
| **Input** | `PREMIUM_MASTER_NARRATIVE.md` + `PREMIUM_PHASE_A.md` |
| **Task** | Fill beat sheet: scroll % → element → transform → visitor feeling |
| **Output** | Beat sheet in chat (or `docs/PREMIUM_PHASE_A_BEATS.md`) |

**You:** Approve beat sheet in chat (“approved, implement”) or request one revision.

### Step A2 — Implement (Composer)

| Agent | **Composer 2.5** or **GPT-5.3 Codex** · Agent mode |
|-------|-----------------------------------------------------|
| **Prompt shell** | See [PREMIUM_DIRECTOR.md](./PREMIUM_DIRECTOR.md) + approved beat sheet |
| **Files** | `useHeroScrollSequence.ts`, `HeroFrameReveal.tsx`, `FeaturedExhibits.tsx`, tonal CSS, optional `HeroExhibitHandoff.tsx` |
| **Forbidden** | WillemHandoff, Method, Proof, Story, Contact, pale `site-reveal` |

**You:**

- [ ] Hard-refresh `#prototype`
- [ ] Full scroll: Willem → hero pin → exhibits pin → Method top
- [ ] Check: dark holds through exhibits; one intentional “lights up” at Method
- [ ] Reject if same-y or pale
- [ ] `pnpm run build` passes
- [ ] Commit: `Premium Phase A: hero–exhibits handoff`

### Gate

- [ ] You’d show this to one marketing lead without apologizing

---

## Phase B — Method + Proof (middle)

**When:** After Phase A gate.  
**Doc:** `PREMIUM_MASTER_NARRATIVE.md` § Method + Proof (Composer creates `PREMIUM_PHASE_B.md` from master doc if missing).

### Narrative job

- **Method:** “How Ahmed thinks” — 4 beats = brief → research → build → measure (map to `methodBeats.ts`)
- **Proof:** Evidence not adjectives — metrics from `impactMetrics` + dossier files

### Step B1 — Beat sheet (Sonnet)

| Agent | Sonnet 4.5 thinking · Plan |
|-------|----------------------------|
| **Task** | Per-panel scroll script for Method rail; per-board reveal order for Proof |
| **You** | Approve |

### Step B2 — Implement (Composer)

| Agent | Composer 2.5 · Agent |
|-------|----------------------|
| **Files** | `MethodSection.tsx`, `useMethodScrollSequence.ts`, `MethodGallery.tsx`, `ProofDossiersSection.tsx`, `DossierFileBoard.tsx`, `method.css`, `proof-dossiers.css` |
| **Focus** | Copy hierarchy above fold; tab sync; no duplicate MaskedWords on headers already animated |
| **Forbidden** | Hero, exhibits, story redesign |

**You:**

- [ ] Scroll Method: each beat readable; active tab matches scroll
- [ ] Proof: each board feels like opening a file
- [ ] Marketing lens obvious in copy (not IT resume)
- [ ] Commit: `Premium Phase B: method and proof`

### Your content todos (can run parallel)

- [ ] Verify `packages/shared/src/content.ts` metrics match CV
- [ ] Add missing campaign one-liners for Volvo / CINEMATEK / Lièvrier if master doc flags gaps

---

## Phase C — Story + Contact (back third)

**When:** After Phase B gate.  
**This is the highest-risk phase** — layout redesign, not more reveals.

### Narrative job

- **Story 05:** Communication lens — career arc as chapters, not CV list
- **Story 06:** Marketing fit — “where I land in your team” (internship)
- **Contact 07:** Decision — CV is the only loud CTA

### Step C1 — Wireframe in words (Opus or Sonnet)

| Agent | **Sonnet 4.5 thinking** preferred (Opus if stuck) · Plan |
|-------|----------------------------------------------------------|
| **Task** | Pinned story rail structure: one column vs split; contact finale layout |
| **Output** | `docs/PREMIUM_PHASE_C.md` + ASCII/wireframe description |

**You:** Approve structure before any GSAP.

### Step C2 — Implement (Composer)

| Agent | Composer 2.5 · Agent |
|-------|----------------------|
| **Files** | `StoryExperienceSection.tsx`, `StoryFitSection.tsx`, `07_ContactClosePrototype.tsx`, `story-sections.css`, `awwards.css` contact block |
| **Allowed** | Pin ~120vh contact; line reveals; magnetic CV only here |
| **Forbidden** | Willem, hero pin math |

**You:**

- [ ] Story reads as one film chapter, not three homework sections
- [ ] Contact: name/CTA land in order; CV download works
- [ ] Commit: `Premium Phase C: story rail and contact finale`

---

## Phase D — Campaign media grid (marketing awareness)

**When:** Per master narrative placement (often after Willem or after hero — **not** last).  
**Source:** `src/app/social/SocialGridTeaser.tsx` + `socialGridData.ts` — **media only**, dossier chrome.

### Narrative job

Platform-native proof: recruiter thinks “Instagram / campaign wall” in 3 seconds.

### Step D1 — Placement spec (Sonnet)

| Agent | Sonnet · Plan |
|-------|---------------|
| **Input** | Master narrative § Media grid + `docs/social-narrative/DIRECTOR.md` |
| **Output** | Placement diagram: what scroll unlocks, handoff target cell |

**You:** Approve placement.

### Step D2 — Implement (Composer)

| Agent | Composer 2.5 · Agent |
|-------|----------------------|
| **Task** | Mount grid inside `Prototype.tsx` / hero-adjacent section; import `social-narrative.css` or extract grid-only CSS |
| **Keep** | Unequal cells, Volvo video cell, `/projects/` paths |
| **Drop** | `#social` lab banner, Majd links |
| **Optional** | Scroll handoff one poster → cell (`SocialHandoffPin` pattern) — only if in attention map |

**You:**

- [ ] Grid assets load; no broken paths
- [ ] Grid feels native to dossier, not a different website
- [ ] Commit: `Premium Phase D: campaign media grid in prototype`

---

## Phase E — Polish (optional, after C + D)

**When:** Full scroll works once end-to-end.

### Agent tasks (split — one chat each)

| Task | Model | Files |
|------|--------|-------|
| Custom cursor | Composer Fast | `CustomCursor.tsx`, `Prototype.tsx` mount after `introDone` |
| Project cursor on exhibits | Composer Fast | `ProjectCursorReveal.tsx`, `ExhibitGallery.tsx` |
| Dossier edge marks between acts | Composer Fast | `DossierEdgeMarks.tsx` |
| Nav compress + menu copy | Composer Fast | `MainNav.tsx`, `hero-site-header.css` |
| Reduced-motion audit | You + Composer | all ScrollTrigger hooks |

**You:**

- [ ] Desktop: cursor on links only, not annoying
- [ ] `prefers-reduced-motion`: no pin traps; content visible
- [ ] Lighthouse spot-check (Spline chunk warning OK)

---

## Phase F — Ship

**When:** After you’d send link to a recruiter.

### Your todos

- [ ] CV PDF in `public/` and `CV_HREF` correct in `siteNav.ts`
- [ ] Replace `hello@example.com` in contact if still placeholder
- [ ] Merge `premium/prototype` → main via PR
- [ ] Deploy (Vercel/Netlify — your existing flow)
- [ ] Update LinkedIn featured link + portfolio line

### Agent

| Agent | Composer · one shot |
|-------|---------------------|
| **Task** | Fix broken links, build CI, deploy config only |

---

## Quick reference — which model when

| Job | Model | Mode |
|-----|--------|------|
| Master narrative, ideology, funnel | **Opus thinking** | Plan |
| Phase beat sheet | **Sonnet 4.5 thinking** | Plan |
| GSAP / React / CSS | **Composer 2.5** or **GPT-5.3 Codex** | Agent |
| Tiny fix after approval | **Composer 2.5 Fast** | Agent |
| **Never** | Fable / one chat for whole site | — |

---

## Paste prompts — copy index

| Phase | Document |
|-------|----------|
| 0 Narrative | [PREMIUM_NARRATIVE_BRIEF.md](./PREMIUM_NARRATIVE_BRIEF.md) `---BEGIN---` block |
| A Implement | [PREMIUM_PHASE_A.md](./PREMIUM_PHASE_A.md) paste block |
| Any implement | [PREMIUM_DIRECTOR.md](./PREMIUM_DIRECTOR.md) prompt shell |
| B/C/D | `PREMIUM_MASTER_NARRATIVE.md` after Phase 0 |

---

## Your weekly checklist (minimal)

| Day | You |
|-----|-----|
| **Prep day** | Week 0 todos · Opus chat · approve master narrative |
| **Build day 1** | Phase A: approve beats → Composer → scroll QA → commit |
| **Build day 2** | Phase B + D (grid): same loop |
| **Build day 3** | Phase C: approve wireframe → Composer → scroll QA → commit |
| **Polish day** | Phase E if time · Phase F ship |

If a phase fails QA twice, stop implementation — return to **Sonnet Plan** with screenshots, not a bigger Composer prompt.

---

## Related docs

| Doc | Purpose |
|-----|---------|
| [PREMIUM_NARRATIVE_BRIEF.md](./PREMIUM_NARRATIVE_BRIEF.md) | Translator Arc + Opus command |
| [PREMIUM_DIRECTOR.md](./PREMIUM_DIRECTOR.md) | Stack, anti-patterns, model split |
| [PREMIUM_PHASE_A.md](./PREMIUM_PHASE_A.md) | Hero → Exhibits spec |
| [PREMIUM_MASTER_NARRATIVE.md](./PREMIUM_MASTER_NARRATIVE.md) | *Created in Phase 0* |
| [HANDOFF.md](./HANDOFF.md) | Legacy prototype detail |
| [social-narrative/DIRECTOR.md](./social-narrative/DIRECTOR.md) | Grid grammar |

---

## Status tracker (you fill in)

| Phase | Status | Date | Commit |
|-------|--------|------|--------|
| Week 0 Prep | ☐ | | |
| 0 Master narrative | ☐ | | |
| A Hero + Exhibits | ☐ | | |
| B Method + Proof | ☐ | | |
| C Story + Contact | ☐ | | |
| D Media grid | ☐ | | |
| E Polish | ☐ | | |
| F Ship | ☐ | | |
