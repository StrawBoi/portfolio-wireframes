import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "../../../lib/gsapClient";
import { serviceFit } from "@portfolio/shared/content";

const FIT_BEATS = serviceFit.slice(0, 3);

export function StoryFitSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const cards = section.querySelectorAll<HTMLElement>(".story-fit__card");

      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.06,
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="frame-06"
      className="story-section story-fit"
      aria-labelledby="story-fit-heading"
    >
      <div className="story-section__inner">
        <header className="story-section__header">
          <p className="story-section__label pf-mono">Engagement brief · 06</p>
          <h2 id="story-fit-heading" className="story-section__title">
            Where the story lands<span className="story-section__title-accent"> in your team.</span>
          </h2>
          <p className="story-section__lede">
            Summer 2026 internship — Brussels-based, open across Belgium and Europe. Three ways the
            narrative maps to what hiring teams actually need.
          </p>
        </header>

        <div className="story-fit__grid">
          {FIT_BEATS.map((beat) => (
            <article key={beat.n} className="story-fit__card">
              <p className="story-fit__index pf-mono">{beat.n}</p>
              <h3 className="story-fit__name">{beat.t}</h3>
              <p className="story-fit__desc">{beat.d}</p>
              <p className="story-fit__for pf-mono">{beat.fit}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
