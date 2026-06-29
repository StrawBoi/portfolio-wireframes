import { HERO_SCROLL_CUE, HERO_SCROLL_SUB } from "../../data/heroHook";

export function HeroScrollCue() {
  return (
    <div className="hero-scroll-cue" aria-label="Approach">
      <div className="hero-scroll-cue__copy" data-cursor-block>
        <p className="hero-scroll-cue__lead">{HERO_SCROLL_CUE}</p>
        <p className="hero-scroll-cue__sub">{HERO_SCROLL_SUB}</p>
      </div>
    </div>
  );
}
