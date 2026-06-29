import { forwardRef } from "react";
import { featuredSpotlight } from "../../data/featuredExhibits";

export const ExhibitSpotlight = forwardRef<HTMLElement>(function ExhibitSpotlight(_, ref) {
  const spot = featuredSpotlight;

  return (
    <article
      ref={ref}
      className={`exhibit-spotlight exhibit-spotlight--${spot.tone}`}
      aria-labelledby="exhibit-spotlight-title"
    >
      <a href={spot.href} className="exhibit-spotlight__link" data-cursor="hover">
        <div className="exhibit-spotlight__copy">
          <p className="exhibit-spotlight__kicker pf-mono">{spot.code}</p>
          <p className="exhibit-spotlight__eyebrow pf-mono">{spot.eyebrow}</p>
          <h2 id="exhibit-spotlight-title" className="exhibit-spotlight__title">
            {spot.title}
          </h2>
          <p className="exhibit-spotlight__tagline">{spot.tagline}</p>
          <span className="exhibit-spotlight__cta pf-mono">
            Open dossier
            <span aria-hidden> →</span>
          </span>
        </div>

        <div className="exhibit-spotlight__visual">
          <div className="exhibit-spotlight__reveal">
            <img
              className="exhibit-spotlight__poster-img"
              src={spot.poster}
              alt=""
              loading="lazy"
              decoding="async"
            />
            <div className="exhibit-spotlight__grain" aria-hidden />
          </div>
          <div className="exhibit-spotlight__portrait-wrap" aria-hidden>
            <img
              className="exhibit-spotlight__portrait"
              src={spot.portrait}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </a>
    </article>
  );
});
