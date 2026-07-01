# Social narrative — director read

Branch: `narrative/social-feed`  
Preview: http://localhost:5173/#social

## Your strategic frame (how I read it)

You think in **platform-native proof**:

| Layer | Job | Audience scan |
|-------|-----|----------------|
| **IG profile** | Range + personality in 3s | “Is this a marketer who ships?” |
| **Grid / motion** | Depth tease → commitment to scroll | “There is more campaign work” |
| **LinkedIn post** | STP/SWOT, business logic | “Can they brief like an intern who thinks senior?” |

The website skin stays **Dossier Signal** (dark paper, ember, Instrument) — not a literal Instagram clone. We borrow **interaction grammar**, not UI chrome.

---

## Hero anatomy (built)

```
[ + gallery ]     Ahmed Mostafa     [ ≡ menu ]
[ avatar ]   11+ years · 3 campaigns · EU
Bio + internship line + CV
```

- **+** → scrolls to Option A grid (projects gallery entry)
- **Menu** → real `SiteMenu` / dossier nav
- **Avatar** → expects `public/profile/avatar.jpg` (falls back to AM)

---

## Option A — Grid peek (blur veil)

**Motion job:** withhold the last row — recruiter must scroll to “unlock” the feed.

**Best when:** you want familiarity (everyone knows IG grids) and fast proof of *volume*.

**Risk:** can feel generic if the grid is uniform or assets don’t share grade. Unequal cells + cover art fix hierarchy.

**Director vote:** **Default ship path for hero-after-intro** — lower risk, reads marketing-first immediately, pairs cleanly with Willem handoff landing on one cell.

---

## Option B — Spotlight pin (sharp rotate)

**Motion job:** one campaign poster **owns** attention; rotation sells craft; skeleton resolves into full grid.

**Best when:** you want a signature “wow” beat and Volvo (or CINEMATEK) as the lead story.

**Risk:** pin + rotate is heavier; on mobile it must simplify; wrong poster breaks the marketing read.

**Director vote:** **Signature moment inside Act 1** — not necessarily the whole hero. Use after intro dissolves: 0.8–1.2 viewport pin, then hand off to Option A grid.

---

## Recommended hybrid (if you pick one direction)

1. Intro (sacred) → name docks to profile toolbar  
2. **Option B** — 1 poster, sharp rotate, lands in grid cell  
3. **Option A** — full unequal grid, no blur (already earned scroll)  
4. Scroll → **LinkedIn post** case cards for Volvo / CINEMATEK / Le Lièvrier  
5. Method + contact unchanged in dossier voice  

---

## LinkedIn proof format

Built as `LinkedInCaseCard` — native post structure with your real Problem/Move/Outcome. Not an embed; styled card in Dossier Signal.

---

## Files

| Component | Path |
|-----------|------|
| Profile hero | `src/app/social/SocialProfileHero.tsx` |
| Option A | `src/app/social/SocialGridTeaser.tsx` |
| Option B | `src/app/social/SocialSpotlightScroll.tsx` |
| LinkedIn case | `src/app/social/LinkedInCaseCard.tsx` |
| Lab page | `src/app/social/SocialNarrativeLab.tsx` |
