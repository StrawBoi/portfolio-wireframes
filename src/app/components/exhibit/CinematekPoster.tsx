import "../../../styles/cinematek-poster.css";

const FILM_FRAMES = [
  "/projects/cinematek/cinematek-intro.png",
  "/projects/volvo/volvo-intro-p1800.png",
  "/projects/le-lievrier/le-lievrier-intro-noir.png",
];

export function CinematekPoster() {
  return (
    <article className="cinematek-poster" aria-label="CINEMATEK exhibition poster study">
      <div className="cinematek-poster__grain" aria-hidden />

      <div className="cinematek-poster__copy">
        <p className="cinematek-poster__eyebrow pf-mono">
          A heritage exhibition celebrating the art of cinema
        </p>
        <h2 className="cinematek-poster__title">CINEMATEK</h2>
        <p className="cinematek-poster__tagline">A journey through film history</p>

        <ul className="cinematek-poster__features pf-mono">
          <li>Rare archives</li>
          <li>Iconic moments</li>
          <li>Timeless stories</li>
        </ul>
      </div>

      <div className="cinematek-poster__visual">
        <div className="cinematek-poster__portrait">
          <img
            src="/projects/cinematek/cinematek-70s.png"
            alt=""
            className="cinematek-poster__portrait-img"
          />
          <div className="cinematek-poster__portrait-fade" aria-hidden />
        </div>

        <div className="cinematek-poster__strip" aria-hidden>
          {FILM_FRAMES.map((src) => (
            <div key={src} className="cinematek-poster__strip-frame">
              <img src={src} alt="" />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
