# Archive

Reference-only code removed from the live Studio (`src/`) build. **Not imported** by Vite — safe to browse, copy, or re-wire later.

## Layout

| Path | Contents |
|------|----------|
| `studio/hero-experiments/` | Disapproved or superseded hero intros (ring, DecisionHero, GuidedHero, etc.) |
| `studio/ui/src-ui/` | Unused shadcn/ui kit from Figma Make export |
| `studio/figma/` | `ImageWithFallback` helper (unused) |
| `studio/styles/hero-experiments.css` | Styles for archived hero components |
| `default_shadcn_theme.css` | Original shadcn theme export |

## Re-using an experiment

1. Copy the component back into `src/app/components/hero/`
2. Fix import paths (`gsapClient`, `content`, etc.)
3. Import `studio/styles/hero-experiments.css` if needed
4. Wire in `Prototype.tsx` — do not auto-enable without Ahmed sign-off

See `docs/HANDOFF.md` for rejection history and live hero path.
