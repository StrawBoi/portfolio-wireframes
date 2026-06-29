import type { FeaturedExhibit } from "../../data/featuredExhibits";

type Props = FeaturedExhibit & {
  className?: string;
  wallOffset?: "low" | "mid" | "high";
};

export function ExhibitCard({
  code,
  title,
  industry,
  tagline,
  image,
  href,
  tone,
  id,
  className = "",
  wallOffset = "low",
}: Props) {
  return (
    <article
      className={[
        "exhibit-wall-card",
        `exhibit-wall-card--${tone}`,
        `exhibit-wall-card--${wallOffset}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-exhibit={id}
      data-cursor-block
    >
      <a href={href} className="exhibit-wall-card__link" data-cursor="hover">
        <div className="exhibit-wall-card__meta exhibit-wall-card__meta-line">
          <span className="exhibit-wall-card__code pf-mono">{code}</span>
          <span className="exhibit-wall-card__industry pf-mono">{industry}</span>
        </div>

        <div className="exhibit-wall-card__frame">
          <div className="exhibit-wall-card__reveal">
            <img
              className="exhibit-wall-card__image"
              src={image}
              alt={`${title} — ${tagline}`}
              loading="lazy"
              decoding="async"
            />
            <div className="exhibit-wall-card__mat" aria-hidden />
          </div>
        </div>

        <div className="exhibit-wall-card__caption">
          <h3 className="exhibit-wall-card__title exhibit-wall-card__meta-line">{title}</h3>
          <p className="exhibit-wall-card__tagline exhibit-wall-card__meta-line pf-mono">
            {tagline}
          </p>
        </div>
      </a>
    </article>
  );
}
