import type { FeaturedExhibit } from "../../data/featuredExhibits";
import { MaskedLine, MaskedWords } from "../dossier/WordReveal";

type Props = {
  exhibits: readonly FeaturedExhibit[];
};

function CaptionPanel({ exhibit }: { exhibit: FeaturedExhibit }) {
  return (
    <div className="exhibit-gallery__caption-panel" data-exhibit={exhibit.id}>
      <div className="exhibit-gallery__caption-head">
        <p className="exhibit-gallery__caption-code pf-mono">
          <MaskedLine text={exhibit.code} />
        </p>
        <div className="exhibit-gallery__caption-ident">
          <h3 className="exhibit-gallery__caption-title">
            <MaskedWords text={exhibit.title} />
          </h3>
          <p className="exhibit-gallery__caption-meta pf-mono dossier-word__fade">
            {exhibit.role}
            <span aria-hidden> · </span>
            {exhibit.context}
          </p>
        </div>
      </div>

      <p className="exhibit-gallery__caption-achievement dossier-word__fade">{exhibit.achievement}</p>

      <ul className="exhibit-gallery__caption-signals">
        {exhibit.signals.map((signal) => (
          <li key={signal.k} className="exhibit-gallery__caption-signal">
            <span className="exhibit-gallery__caption-signal-k pf-mono">
              <MaskedLine text={signal.k} />
            </span>
            <span className="exhibit-gallery__caption-signal-v dossier-word__fade">{signal.v}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExhibitPlateOverlay({ exhibit }: { exhibit: FeaturedExhibit }) {
  return (
    <div className="exhibit-gallery__plate-copy">
      <p className="exhibit-gallery__tagline">
        <MaskedWords text={exhibit.tagline} />
      </p>
      <a
        href={exhibit.href}
        className="exhibit-gallery__cta pf-mono exhibit-gallery__fade dossier-word__fade"
        data-cursor="hover"
      >
        Open dossier
        <span aria-hidden> →</span>
      </a>
    </div>
  );
}

function ExhibitProgressMeter({ total }: { total: number }) {
  return (
    <div className="exhibit-gallery__meter" aria-hidden>
      <svg className="exhibit-gallery__meter-svg" viewBox="0 0 24 120" preserveAspectRatio="xMidYMid meet">
        <line x1="12" y1="6" x2="12" y2="114" className="exhibit-gallery__meter-ghost" />
        <line
          x1="12"
          y1="6"
          x2="12"
          y2="114"
          className="exhibit-gallery__meter-ink"
          pathLength="1"
        />
      </svg>
      <span className="exhibit-gallery__meter-readout pf-mono">
        <span className="exhibit-gallery__meter-current">01</span>
        <span className="exhibit-gallery__meter-sep">/</span>
        <span className="exhibit-gallery__meter-total">{String(total).padStart(2, "0")}</span>
      </span>
    </div>
  );
}

export function ExhibitGallery({ exhibits }: Props) {
  return (
    <div className="exhibit-gallery" data-cursor-block>
      <div className="exhibit-gallery__cinema">
        <div className="exhibit-gallery__stage">
          <div className="exhibit-gallery__plates" aria-live="polite">
            {exhibits.map((exhibit) => (
              <article
                key={exhibit.id}
                className={`exhibit-gallery__plate exhibit-gallery__plate--${exhibit.tone}`}
                data-exhibit={exhibit.id}
              >
                <div
                  className="exhibit-gallery__plate-bg"
                  style={{ backgroundImage: `url(${exhibit.image})` }}
                  role="img"
                  aria-label={`${exhibit.title} — ${exhibit.tagline}`}
                />
                <div className="exhibit-gallery__shade" aria-hidden />
                <div className="exhibit-gallery__ghost-label pf-mono" aria-hidden>
                  <span>{exhibit.code}</span>
                  <span>{exhibit.title}</span>
                </div>
                <ExhibitPlateOverlay exhibit={exhibit} />
              </article>
            ))}
          </div>
          <ExhibitProgressMeter total={exhibits.length} />
        </div>

        <div className="exhibit-gallery__caption-deck" aria-label="Exhibit dossier captions">
          {exhibits.map((exhibit) => (
            <CaptionPanel key={`caption-${exhibit.id}`} exhibit={exhibit} />
          ))}
        </div>
      </div>

      <svg className="exhibit-gallery__meter-defs" aria-hidden width="0" height="0">
        <defs>
          <linearGradient id="exhibit-gallery-meter-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(38, 28, 20, 0.5)" />
            <stop offset="72%" stopColor="rgba(38, 28, 20, 0.32)" />
            <stop offset="100%" stopColor="rgba(255, 65, 3, 0.85)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
