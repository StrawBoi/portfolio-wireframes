import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "../../../lib/gsapClient";
import { EXHIBITS_CURATOR_LINE, EXHIBITS_SUB_RAIL, featuredCampaignExhibits } from "../../data/featuredExhibits";
import { ExhibitGallery } from "./ExhibitGallery";
import { ExhibitSpotlight } from "./ExhibitSpotlight";
import {
  bindExhibitScrollSequence,
  bindExhibitsRelease,
  bindSpotlightSequence,
} from "./useExhibitScrollSequence";
import { useMotionMode } from "../../motion/MotionMode";

type Props = {
  onRelease?: () => void;
  emberScrimRef?: RefObject<HTMLElement | null>;
  showSpotlight?: boolean;
};

export function FeaturedExhibits({ onRelease, emberScrimRef, showSpotlight = true }: Props) {
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
      const section = sectionRef.current;
      if (!pin || !gallery || !section) return;

      const emberScrim = emberScrimRef?.current ?? null;

      const cleanupGallery = bindExhibitScrollSequence({
        pinRoot: pin,
        galleryRoot: gallery,
        emberScrim,
        onPlateHandoffReady: () => {
          const firstCaption = gallery.querySelector<HTMLElement>(
            ".exhibit-gallery__caption-panel",
          );
          const firstPlate = gallery.querySelector<HTMLElement>(".exhibit-gallery__plate");
          if (!firstCaption && !firstPlate) return;

          gsap.fromTo(
            [firstCaption, firstPlate?.querySelector(".exhibit-gallery__plate-copy")].filter(
              Boolean,
            ),
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.3, ease: "power2.out", delay: 0.15 },
          );
        },
      });
      const cleanupSpotlight = spotlight ? bindSpotlightSequence(spotlight) : undefined;
      const cleanupRelease = bindExhibitsRelease({
        section,
        emberScrim,
        onRelease,
      });

      return () => {
        cleanupGallery?.();
        cleanupSpotlight?.();
        cleanupRelease?.();
      };
    },
    { scope: sectionRef, dependencies: [onRelease, emberScrimRef] },
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

        {showSpotlight ? <ExhibitSpotlight ref={spotlightRef} /> : null}
      </div>
    </section>
  );
}
