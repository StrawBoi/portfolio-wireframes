import { useCallback } from "react";
import { HERO_SCAN } from "../../data/heroHook";

const SCAN_TARGET = "#featured-exhibits-stage";

export function HeroScanToast() {
  const startScan = useCallback(() => {
    const target = document.querySelector<HTMLElement>(SCAN_TARGET);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <aside className="hero-scan-flag" aria-label="Quick portfolio scan">
      <button
        type="button"
        className="hero-scan-flag__trigger"
        onClick={startScan}
        data-cursor="hover"
        data-cursor-block
      >
        <span className="hero-scan-flag__stamp pf-mono" aria-hidden>
          <span className="hero-scan-flag__stamp-num">30</span>
          <span className="hero-scan-flag__stamp-unit">sec</span>
        </span>

        <span className="hero-scan-flag__body">
          <span className="hero-scan-flag__kicker pf-mono">{HERO_SCAN.kicker}</span>
          <span className="hero-scan-flag__headline">
            {HERO_SCAN.headline}
            <em>{HERO_SCAN.headlineEm}</em>
          </span>
        </span>

        <span className="hero-scan-flag__rail" aria-hidden>
          <span className="hero-scan-flag__rail-ghost" />
          <span className="hero-scan-flag__rail-ink" />
        </span>

        <span className="hero-scan-flag__cta pf-mono">
          {HERO_SCAN.cta}
          <span className="hero-scan-flag__cta-arrow" aria-hidden>
            →
          </span>
        </span>
      </button>
    </aside>
  );
}
