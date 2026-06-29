import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap, { ScrollTrigger } from "../../../lib/gsapClient";
import { DossierSection } from "../dossier/DossierSection";
import { PROOF_CURATOR_LINE, PROOF_SUB_RAIL, proofDossierFiles } from "../../data/dossierFiles";
import { DossierFileBoard } from "./DossierFileBoard";
import { useMotionMode } from "../../motion/MotionMode";

export function ProofDossiersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { skipEntry } = useMotionMode();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const boards = gsap.utils.toArray<HTMLElement>(".proof-board", section);

      if (reduced || skipEntry) {
        boards.forEach((board) => {
          gsap.set(board.querySelector(".proof-board__image"), { clipPath: "inset(0% 0% 0% 0%)" });
          gsap.set(board.querySelectorAll(".dossier-word__mask-inner"), { yPercent: 0, opacity: 1 });
          gsap.set(board.querySelectorAll(".dossier-word__fade"), { opacity: 1, y: 0 });
        });
        return;
      }

      boards.forEach((board) => {
        const image = board.querySelector<HTMLElement>(".proof-board__image");
        const masks = board.querySelectorAll<HTMLElement>(".dossier-word__mask-inner");
        const fades = board.querySelectorAll<HTMLElement>(".dossier-word__fade");

        if (image) gsap.set(image, { clipPath: "inset(0% 12% 0% 0%)" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: board,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });

        if (image) {
          tl.to(image, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85, ease: "power3.out" }, 0);
        }

        masks.forEach((mask, i) => {
          tl.fromTo(
            mask,
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
            0.12 + i * 0.04,
          );
        });

        fades.forEach((item, i) => {
          tl.fromTo(
            item,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
            0.28 + i * 0.06,
          );
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger && section.contains(st.trigger as Node)) st.kill();
        });
      };
    },
    { scope: sectionRef, dependencies: [skipEntry] },
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || skipEntry) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const label = section.querySelector(".dossier-section__label");
      const curator = section.querySelector(".dossier-section__curator");
      const subRail = section.querySelector(".proof-dossiers__sub-rail");

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
    <DossierSection
      id="proof"
      label="Proof"
      curator={PROOF_CURATOR_LINE}
      sectionRef={sectionRef}
      className="proof-dossiers"
    >
      <p className="proof-dossiers__sub-rail pf-mono">{PROOF_SUB_RAIL}</p>
      <div className="proof-dossiers__stack">
        {proofDossierFiles.map((file) => (
          <DossierFileBoard key={file.id} file={file} />
        ))}
      </div>
    </DossierSection>
  );
}
