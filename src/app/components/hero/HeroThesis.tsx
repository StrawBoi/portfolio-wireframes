import { HERO_THESIS_LINES } from "../../data/heroHook";

function ThesisLine({ text, secondary = false }: { text: string; secondary?: boolean }) {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <p className={`hero-thesis__line${secondary ? " hero-thesis__line--secondary" : ""}`}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="hero-thesis__word-mask">
          <span className="hero-thesis__word">
            {word}
            {i < words.length - 1 ? "\u00a0" : ""}
          </span>
        </span>
      ))}
    </p>
  );
}

export function HeroThesis() {
  return (
    <section className="hero-thesis" aria-label="Approach">
      <div className="hero-thesis__frame">
        <div className="hero-thesis__inner">
          <div className="hero-thesis__copy" data-cursor-block>
            <ThesisLine text={HERO_THESIS_LINES[0]} />
            <ThesisLine text={HERO_THESIS_LINES[1]} secondary />
          </div>
        </div>
      </div>
    </section>
  );
}
