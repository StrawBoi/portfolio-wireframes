import { useRef } from "react";
import gsap, { ScrollTrigger } from "../../lib/gsapClient";
import { useGSAP } from "@gsap/react";
import { socialGridCells, socialGridPeekFrom } from "./socialGridData";

type Props = {
  embedded?: boolean;
};

function GridCell({ cell, peek }: { cell: (typeof socialGridCells)[number]; peek: boolean }) {
  return (
    <article
      className={[
        "sn-grid__cell",
        `sn-grid__cell--${cell.layout}`,
        peek ? "sn-grid__cell--peek" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      data-cell={cell.id}
    >
      {cell.video ? (
        <video
          className="sn-grid__media"
          poster={cell.image}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          {cell.videoWebm ? <source src={cell.videoWebm} type="video/webm" /> : null}
          <source src={cell.video} type="video/mp4" />
        </video>
      ) : (
        <img src={cell.image} alt="" className="sn-grid__media" loading="lazy" />
      )}
      <div className="sn-grid__meta">
        <span className="sn-grid__eyebrow pf-mono">{cell.eyebrow}</span>
        <span className="sn-grid__title">{cell.title}</span>
      </div>
    </article>
  );
}

export function SocialGridTeaser({ embedded = false }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const grid = gridRef.current;
      const veil = veilRef.current;
      if (!root || !grid || !veil) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduced) {
        gsap.set(veil, { opacity: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          scroller: document.documentElement,
          trigger: root,
          start: "top 88%",
          end: "bottom 50%",
          scrub: 0.35,
        },
      });

      tl.to(veil, { opacity: 0, duration: 1, ease: "power2.out" }, 0).to(
        grid.querySelectorAll(".sn-grid__cell--peek"),
        { filter: "blur(0px)", opacity: 1, duration: 1, ease: "power2.out" },
        0,
      );

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: rootRef },
  );

  const gridBody = (
    <div className="sn-grid-teaser__stage">
      <div ref={gridRef} className="sn-grid sn-grid--unequal" id="social-projects-gallery">
        {socialGridCells.map((cell, i) => (
          <GridCell key={cell.id} cell={cell} peek={i >= socialGridPeekFrom} />
        ))}
      </div>
      <div ref={veilRef} className="sn-grid-teaser__veil" aria-hidden>
        <p className="sn-grid-teaser__veil-copy pf-mono">Scroll for full gallery</p>
      </div>
    </div>
  );

  if (embedded) {
    return (
      <div ref={rootRef} className="sn-grid-teaser sn-grid-teaser--embedded" aria-label="Projects grid">
        {gridBody}
      </div>
    );
  }

  return (
    <section ref={rootRef} id="social-option-a" className="sn-grid-teaser" aria-label="Projects grid">
      {gridBody}
    </section>
  );
}
