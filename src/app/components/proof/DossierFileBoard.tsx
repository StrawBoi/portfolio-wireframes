import type { DossierFile } from "../../data/dossierFiles";
import { MaskedLine, MaskedWords } from "../dossier/WordReveal";

type Props = {
  file: DossierFile;
};

export function DossierFileBoard({ file }: Props) {
  return (
    <article
      id={`proof-${file.id}`}
      className={`proof-board proof-board--${file.tone}`}
      data-proof={file.id}
    >
      <div className="proof-board__visual" data-cursor="hover">
        <div
          className="proof-board__image"
          style={{ backgroundImage: `url(${file.boardImage})` }}
          role="img"
          aria-label={`${file.title} — dossier board`}
        />
        <div className="proof-board__shade" aria-hidden />
        <p className="proof-board__code pf-mono">{file.code}</p>
      </div>

      <div className="proof-board__body">
        <header className="proof-board__head">
          <h3 className="proof-board__title">
            <MaskedWords text={file.title} />
          </h3>
          <p className="proof-board__meta pf-mono dossier-word__fade">
            {file.role}
            <span aria-hidden> · </span>
            {file.context}
          </p>
        </header>

        <p className="proof-board__depth dossier-word__fade">{file.depthLead}</p>

        <p className="proof-board__achievement">
          <MaskedLine text={file.achievement} />
        </p>

        <ul className="proof-board__signals">
          {file.signals.map((signal) => (
            <li key={signal.k} className="proof-board__signal">
              <span className="proof-board__signal-k pf-mono">
                <MaskedLine text={signal.k} />
              </span>
              <span className="proof-board__signal-v dossier-word__fade">{signal.v}</span>
            </li>
          ))}
        </ul>

        <div className="proof-board__deliverables dossier-word__fade">
          <p className="proof-board__deliverables-k pf-mono">Deliverables</p>
          <ul className="proof-board__deliverables-list">
            {file.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <p className="proof-board__note pf-mono dossier-word__fade">{file.fileNote}</p>
      </div>
    </article>
  );
}
