import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap, { ScrollTrigger } from "../../../lib/gsapClient";
import { DossierSection } from "../dossier/DossierSection";
import { METHOD_CURATOR_LINE, methodBeats } from "../../data/methodBeats";
import { MethodGallery } from "./MethodGallery";
import { bindMethodScrollSequence } from "./useMethodScrollSequence";
import { useMotionMode } from "../../motion/MotionMode";

export function MethodSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const { skipEntry } = useMotionMode();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const rail = railRef.current;
      if (!section || !rail) return;

      const cleanup = bindMethodScrollSequence({ sectionRoot: section, railRoot: rail });
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return cleanup;
    },
    { scope: sectionRef, dependencies: [] },
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || skipEntry) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const label = section.querySelector(".dossier-section__label");
      const curator = section.querySelector(".dossier-section__curator");

      gsap.fromTo(
        [label, curator].filter(Boolean),
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
    <DossierSection
      id="method"
      label="Method"
      curator={METHOD_CURATOR_LINE}
      sectionRef={sectionRef}
      className="method-section"
    >
      <div ref={railRef} id="method-stage" className="method-section__rail">
        <MethodGallery beats={methodBeats} />
      </div>
    </DossierSection>
  );
}
