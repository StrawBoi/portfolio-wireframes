const VIEW_WORK_HREF = "#featured-exhibits-stage";
const CV_HREF = "/resume.pdf";

export function HeroActions() {
  return (
    <nav className="hero-actions pf-mono" aria-label="Quick actions">
      <a
        href={VIEW_WORK_HREF}
        className="hero-actions__link hero-actions__link--work hero-actions__link--left"
        data-cursor="hover"
        data-cursor-block
      >
        <span className="hero-actions__index" aria-hidden>
          01
        </span>
        <span className="hero-actions__body">
          <span className="hero-actions__label">View work</span>
          <span className="hero-actions__cue" aria-hidden>
            <span className="hero-actions__line" />
            <span className="hero-actions__arrow">←</span>
          </span>
        </span>
      </a>

      <a
        href={CV_HREF}
        className="hero-actions__link hero-actions__link--cv hero-actions__link--right"
        download
        data-cursor="hover"
        data-cursor-block
      >
        <span className="hero-actions__body">
          <span className="hero-actions__label">Download CV</span>
          <span className="hero-actions__meta">PDF · 2026</span>
        </span>
        <span className="hero-actions__file" aria-hidden>
          <svg viewBox="0 0 16 18" width="14" height="16" fill="none" aria-hidden>
            <path
              d="M4.5 1.5h4.75L12.5 4.25V15.5a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V2.5a1 1 0 0 1 1-1Z"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <path d="M9.25 1.5V4.5H12.5" stroke="currentColor" strokeWidth="1.1" />
            <path d="M5.5 9h5M5.5 11.5h3.25" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
        </span>
      </a>
    </nav>
  );
}
