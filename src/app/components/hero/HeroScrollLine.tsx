export function HeroScrollLine() {
  return (
    <div className="hero-scroll-meter" aria-hidden>
      <svg
        className="hero-scroll-meter__svg"
        viewBox="0 0 24 120"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="hero-scroll-meter-gradient" x1="12" y1="6" x2="12" y2="114" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="var(--pf-hot)" />
            <stop offset="100%" stopColor="var(--pf-signal)" />
          </linearGradient>
        </defs>
        <line x1="12" y1="6" x2="12" y2="114" className="hero-scroll-meter__ghost" />
        <line
          x1="12"
          y1="6"
          x2="12"
          y2="114"
          className="hero-scroll-meter__ink"
          pathLength="1"
        />
      </svg>
      <span className="hero-scroll-meter__readout pf-mono">
        <span className="hero-scroll-meter__value">00</span>
        <span className="hero-scroll-meter__unit">pct</span>
      </span>
    </div>
  );
}
