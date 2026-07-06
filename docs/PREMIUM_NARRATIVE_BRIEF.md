# Premium narrative — director command (marketing-first)

> **Use with:** Claude **Opus (thinking)** in **Plan mode** first.  
> **Then:** Sonnet thinking or Composer for phased implementation per [PREMIUM_DIRECTOR.md](./PREMIUM_DIRECTOR.md).

---

## Adaptable theory: **The Translator Arc**

Ahmed is not “a developer who does marketing” or “a student with a pretty portfolio.”  
The site sells one idea:

> **I translate business problems into campaigns, systems, and experiences — and I can prove each layer.**

Four **lenses** (reorder in scroll, never erase):

| Lens | What it proves | Visitor question answered |
|------|----------------|---------------------------|
| **1 · Marketing** | Strategy, CRM, content, messaging, campaigns, martech | “Can he think like our marketing team?” |
| **2 · Build** | Software, delivery, ops, cloud, automation | “Can he ship what he strategizes?” |
| **3 · Experience** | UI/UX, frames, content systems, editorial craft | “Will our brand look credible in his hands?” |
| **4 · Communication** | Customer-facing journey 2011→now | “Can he hold a room / a client / a brief?” |

**Marketing is the spine.** Build and UX are *how the strategy becomes real*. Communication is *why trust compounds*.

### Scroll = marketing funnel (not just cinema)

| Funnel stage | Site beat | Attention job |
|--------------|---------|---------------|
| **Awareness** | Willem + **campaign media grid** | “This is platform-native proof — I recognize the grammar.” |
| **Interest** | Hero thesis + story stage | “He has a point of view, not just posters.” |
| **Consideration** | Exhibits pin + Method rail | “Range + how he thinks.” |
| **Evaluation** | Proof dossiers + metrics | “Evidence, not adjectives.” |
| **Decision** | Story fit + Contact / CV | “He fits our internship / team.” |

Motion earns attention **at funnel transitions**, not on every heading.

### Fixed product decisions (Ahmed, 2026)

- **Route:** `#prototype` is the film; `#social` grid is **media grammar only** — unequal mosaic from `socialGridData.ts` / `public/projects/`, integrated into Act 1–2, not a separate lab forever.
- **Sacred:** `WillemHandoff` intro mechanics.
- **Conversion:** Download CV.
- **Audience:** HR / marketing leads, Belgium & EU · Summer 2026 internship.
- **Anti:** generic dev portfolio, skill bars, purple gradients, motion without message.

---

## Model recommendation

| Task | Model | Why |
|------|--------|-----|
| **This brief** — read CV/LinkedIn/sites, craft ideology, scroll architecture, attention map | **Claude Opus (thinking)** | Best multi-source synthesis + distinctive narrative frame; worth the tokens once |
| Phase beat sheets (after master doc approved) | **Claude Sonnet 4.5 (thinking)** | Cheaper iteration on one act at a time |
| GSAP / React implementation | **Composer 2.5** or **GPT-5.3 Codex** | Hands, not ideology |

**Use Opus once for the master narrative.** Do not use Opus for every CSS tweak.

---

## Sources the director agent must read

### In repo (read first)
- `packages/shared/src/content.ts` — CV, metrics, journey, campaigns
- `docs/HANDOFF.md` — anti-rules, north star
- `.cursor/rules/portfolio-creative.mdc`
- `src/app/social/socialGridData.ts` + `socialProfile.ts` — **keep media grid**
- `docs/social-narrative/DIRECTOR.md` — IG grammar rationale
- `docs/PREMIUM_DIRECTOR.md` + `docs/PREMIUM_PHASE_A.md` — phased delivery

### External (fetch / browse)
- CV PDF — Ahmed to attach or path in repo if added
- LinkedIn: https://www.linkedin.com/in/ahmed-mohsen-hanafy/
- Website 1: https://ahmedmohsenmostafa.com *(confirm live URL)*
- Website 2: `apps/martech/` production site or deployed martech URL *(Ahmed to confirm)*

### Campaign assets
- `public/projects/volvo/`, `cinematek/`, `le-lievrier/`, `marketing-intelligence/`

---

## Deliverables Opus must produce (before any code)

1. **One-sentence positioning** (marketing student, not senior IT).
2. **Translator Arc** applied — per section, which lens leads and which supports.
3. **Scroll script** — table: Act | Section | Funnel stage | What user sees | What user feels | Why motion here (or stillness).
4. **Attention map** — max 5 “hero moments” for the whole site; everything else secondary.
5. **Media grid placement** — where IG-style mosaic lives in `#prototype` and what it hands off to.
6. **Copy hierarchy** — 3 lines max per section above the fold; tie to `content.ts`.
7. **Phase A/B/C updates** — rewrite phase scopes if funnel demands it.
8. **Open questions** — only what Ahmed must answer (max 5).

Output file: `docs/PREMIUM_MASTER_NARRATIVE.md` (agent creates; Ahmed approves).

---

## Paste command (Opus · Plan mode)

Copy from `---BEGIN---` to `---END---` into a **new chat** with **Claude Opus (thinking)** in **Plan mode**.

---BEGIN---

You are the **visual narrative director** for Ahmed Mohsen Mostafa's portfolio — not a code implementer.

## Who Ahmed is
- Marketing student (Odisee BBA, expected 2026), Brussels
- 11+ years across customer service, CRM, software delivery, IT leadership, consulting — **marketing-first positioning today**
- Loves: strategic marketing, campaigns, martech, CRM, content, messaging
- Also: software/build, UI/UX (content systems + frames), communication journey (client-facing arc 2011→now)
- Audience: HR directors, marketing leads, hiring managers — Belgium & Europe
- Primary conversion: **Download CV** · Summer 2026 internship

## Your job
Read Ahmed's profile across all sources, then craft an **adaptable ideology** for the website: narrative arc, scroll logic, attention design, and where each of the four lenses leads (Marketing · Build · Experience · Communication).

**Do not write implementation code.** Produce `docs/PREMIUM_MASTER_NARRATIVE.md` as your deliverable.

## Theory to develop (or improve)
Use or refine the **Translator Arc**: Ahmed translates business problems → campaigns, systems, experiences — with proof at each layer. Marketing is the spine; build & UX are how strategy ships; communication is why trust compounds.

Map scroll to a **marketing funnel** (Awareness → Interest → Consideration → Evaluation → Decision), not just "cinematic acts."

## Sources — read in order

### Repository (portfolio-wireframes, branch `premium/prototype`)
1. `docs/PREMIUM_NARRATIVE_BRIEF.md` — this framing
2. `docs/PREMIUM_DIRECTOR.md` — phased delivery, stack, anti-patterns
3. `packages/shared/src/content.ts` — CV, metrics, journey, campaigns
4. `docs/HANDOFF.md` + `.cursor/rules/portfolio-creative.mdc` — voice & anti-rules
5. `src/app/social/socialGridData.ts` — **campaign media grid (KEEP)** — unequal mosaic, Volvo/CINEMATEK/Le Lièvrier assets
6. `src/app/social/socialProfile.ts` — profile copy grammar
7. `docs/social-narrative/DIRECTOR.md` — why platform-native proof matters
8. `public/projects/` — campaign art

### External — fetch and synthesize
- LinkedIn: https://www.linkedin.com/in/ahmed-mohsen-hanafy/
- Website: https://ahmedmohsenmostafa.com
- Martech production site: read `apps/martech/` in repo OR deployed URL if live
- CV: [Ahmed attaches PDF or points to file path]

## Fixed product decisions
- Main experience: `#prototype` (Loader → Willem → Hero → Exhibits → Method → Proof → Story → Contact)
- **Integrate the social campaign media grid** into the main arc (not a side lab) — media/mosaic only; dossier visual system stays
- **Sacred:** Willem intro — do not redesign mechanics
- One accent color (ember). No generic dev-portfolio aesthetics.
- Motion only where the funnel needs attention; stillness is also a choice.

## Deliverables in PREMIUM_MASTER_NARRATIVE.md
1. One-sentence positioning
2. Four-lens map per site section (which lens leads, which supports)
3. Full scroll script table: Act | Component | Funnel stage | Visual | Emotion | Motion/stillness rationale
4. **Attention map** — max 5 unforgettable moments site-wide
5. **Media grid** — exact placement, handoff target, what scroll unlocks
6. Copy hierarchy per act (max 3 lines above fold; cite content.ts fields)
7. Updated Phase A / B / C scopes for implementer agents
8. References (A24, Guardian, Bloomberg, campaign portfolios — what to steal structurally, not visually)
9. Max 5 questions for Ahmed only if blocked

## After your doc
Ahmed approves → Sonnet/Composer implements **one phase at a time** per PREMIUM_PHASE_*.md.

Start by summarizing what you learned from LinkedIn + websites vs `content.ts` gaps, then propose the master narrative.

---END---
