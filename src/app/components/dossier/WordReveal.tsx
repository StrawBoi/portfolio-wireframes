type MaskProps = {
  text: string;
  className?: string;
};

export function MaskedLine({ text, className }: MaskProps) {
  return (
    <span className={className}>
      <span className="dossier-word__mask">
        <span className="dossier-word__mask-inner">{text}</span>
      </span>
    </span>
  );
}

export function MaskedWords({ text, className }: MaskProps) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="dossier-word__mask">
          <span className="dossier-word__mask-inner">
            {word}
            {i < words.length - 1 ? "\u00a0" : ""}
          </span>
        </span>
      ))}
    </span>
  );
}
