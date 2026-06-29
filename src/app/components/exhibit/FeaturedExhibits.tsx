import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "../../../lib/gsapClient";
import { EXHIBITS_CURATOR_LINE, EXHIBITS_SUB_RAIL, featuredCampaignExhibits } from "../../data/featuredExhibits";
import { ExhibitGallery } from "./ExhibitGallery";
import { ExhibitSpotlight } from "./ExhibitSpotlight";
import { bindExhibitScrollSequence, bindSpotlightSequence } from "./useExhibitScrollSequence";
import { useMotionMode } from "../../motion/MotionMode";

export function FeaturedExhibits() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLElement>(null);
  const { skipEntry } = useMotionMode();

  useGSAP(
    () => {
      const pin = pinRef.current;
      const gallery = galleryRef.current;
      const spotlight = spotlightRef.current;
      if (!pin || !gallery) return;

      const cleanupGallery = bindExhibitScrollSequence({
        pinRoot: pin,
        galleryRoot: gallery,
      });
      const cleanupSpotlight = spotlight ? bindSpotlightSequence(spotlight) : undefined;

      return () => {
        cleanupGallery?.();
        cleanupSpotlight?.();
      };
    },
    { scope: sectionRef },
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || skipEntry) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const label = section.querySelector(".exhibition-wall__label");
      const curator = section.querySelector(".exhibition-wall__curator");
      const subRail = section.querySelector(".exhibition-wall__sub-rail");

      gsap.fromTo(
        [label, curator, subRail].filter(Boolean),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [skipEntry] },
  );

  return (
    <section
      ref={sectionRef}
      id="featured-exhibits"
      className="featured-exhibits exhibition-wall"
      aria-labelledby="featured-exhibits-heading"
    >
      <div className="exhibition-wall__inner">
        <header className="exhibition-wall__header" data-cursor-block>
          <p id="featured-exhibits-heading" className="exhibition-wall__label pf-mono">
            Selected Exhibits
          </p>
          <p className="exhibition-wall__curator">{EXHIBITS_CURATOR_LINE}</p>
          <p className="exhibition-wall__sub-rail pf-mono">{EXHIBITS_SUB_RAIL}</p>
        </header>

        <div ref={pinRef} id="featured-exhibits-stage" className="exhibition-wall__pin">
          <div ref={galleryRef}>
            <ExhibitGallery exhibits={featuredCampaignExhibits} />
          </div>
        </div>

        <ExhibitSpotlight ref={spotlightRef} />
      </div>
    </section>
  );
}
