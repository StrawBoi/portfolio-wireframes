import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "../../../lib/gsapClient";
import { cvExperience } from "@portfolio/shared/content";

const CHAPTERS = cvExperience.slice(0, 4).map((entry, i) => ({
  act: String(i + 1).padStart(2, "0"),
  years: `${entry.from} — ${entry.to}`,
  place: entry.company,
  role: entry.position,
  beat: entry.achievements[0] ?? "",
}));

export function StoryExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const cards = section.querySelectorAll<HTMLElement>(".story-chapter");

      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.04,
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="frame-05"
      className="story-section story-experience"
      aria-labelledby="story-experience-heading"
    >
      <div className="story-section__inner">
        <header className="story-section__header">
          <p className="story-section__label pf-mono">Personnel file · 05</p>
          <h2 id="story-experience-heading" className="story-section__title">
            Four chapters.<span className="story-section__title-accent"> One through-line.</span>
          </h2>
          <p className="story-section__lede">
            IT systems, sales floors, and consulting rooms before marketing — each chapter left a reflex:
            read the room, find the pattern, ship the proof.
          </p>
        </header>

        <ol className="story-experience__chapters">
          {CHAPTERS.map((chapter) => (
            <li key={chapter.place} className="story-chapter">
              <p className="story-chapter__act pf-mono">{chapter.act}</p>
              <div className="story-chapter__body">
                <p className="story-chapter__years pf-mono">{chapter.years}</p>
                <h3 className="story-chapter__place">{chapter.place}</h3>
                <p className="story-chapter__role">{chapter.role}</p>
                <p className="story-chapter__beat">{chapter.beat}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
