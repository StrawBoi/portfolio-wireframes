import type { MethodBeat } from "../../data/methodBeats";
import { MaskedLine, MaskedWords } from "../dossier/WordReveal";

type Props = {
  beats: readonly MethodBeat[];
};

function BeatPanel({ beat }: { beat: MethodBeat }) {
  return (
    <article
      className={`method-rail__panel method-rail__panel--${beat.tone}`}
      data-beat={beat.id}
    >
      <p className="method-rail__meta pf-mono">
        <MaskedLine text={beat.code} className="method-rail__code" />
        <span className="method-rail__index">Beat {beat.index}</span>
      </p>
      <h3 className="method-rail__title">
        <MaskedWords text={beat.title} />
      </h3>
      <p className="method-rail__lead dossier-word__fade">{beat.lead}</p>
      <p className="method-rail__body dossier-word__fade">{beat.body}</p>
    </article>
  );
}

export function MethodGallery({ beats }: Props) {
  return (
    <div className="method-rail method-rail--stacked" data-cursor-block>
      <nav className="method-rail__track" aria-label="Method beats">
        <ol className="method-rail__tabs">
          {beats.map((beat) => (
            <li key={beat.id} className="method-rail__tab-item">
              <span
                className="method-rail__tab pf-mono"
                data-beat={beat.id}
                aria-current={beat.index === "01" ? "step" : undefined}
              >
                <span className="method-rail__tab-code">{beat.code}</span>
                <span className="method-rail__tab-title">{beat.title}</span>
              </span>
            </li>
          ))}
        </ol>
      </nav>

      <div className="method-rail__stage" aria-live="polite">
        {beats.map((beat) => (
          <BeatPanel key={beat.id} beat={beat} />
        ))}
      </div>
    </div>
  );
}
