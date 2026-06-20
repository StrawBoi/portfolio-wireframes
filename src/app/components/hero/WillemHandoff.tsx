import { useRef, useState, useCallback, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "../../../lib/gsapClient";
import { landingReel, profile } from "@portfolio/shared/content";
import type { MotionMode } from "../../motion/MotionMode";

import "../../../styles/willem-handoff.css";

const START_LETTERS = ["A", "h"];
const END_LETTERS = ["m", "e", "d"];
const PLATE_BACKGROUNDS = [
  "linear-gradient(160deg, #001621 0%, #102a38 50%, #000508 100%)",
  "linear-gradient(145deg, rgba(255,65,3,0.14) 0%, #001621 42%, #0a1520 100%)",
  "linear-gradient(135deg, rgba(45,91,255,0.12) 0%, #001621 55%, #001018 100%)",
  "linear-gradient(155deg, rgba(0,180,216,0.1) 0%, #001621 50%, #000810 100%)",
  "radial-gradient(ellipse 80% 60% at 32% 38%, rgba(255,65,3,0.1) 0%, #001621 72%)",
] as const;

const DISPLAY_NAME = "Ahmed";

type Props = {
  mode: MotionMode;
  onComplete: () => void;
};

export function WillemHandoff({ mode, onComplete }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const doneRef = useRef(false);
  const [visible, setVisible] = useState(true);
  const [hidden, setHidden] = useState(true);

  const extras = [landingReel[2], landingReel[1]];
  const plateBg = useMemo(
    () => PLATE_BACKGROUNDS[Math.floor(Math.random() * PLATE_BACKGROUNDS.length)],
    []
  );

  const skip = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    document.body.style.overflow = "";
    window.dispatchEvent(new Event("hero:mosaic-reveal"));
    window.dispatchEvent(new Event("hero:logo-ready"));
    setVisible(false);
    onComplete();
  }, [onComplete]);

  useGSAP(
    () => {
      const container = rootRef.current;
      if (!container) return;

      const finish = () => {
        if (doneRef.current) return;
        doneRef.current = true;
        document.body.style.overflow = "";
        window.dispatchEvent(new Event("hero:logo-ready"));
        setVisible(false);
        onComplete();
      };

      const quick = mode === "quick";
      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced || window.innerWidth < 768) {
        window.dispatchEvent(new Event("hero:mosaic-reveal"));
        finish();
        return;
      }

      const loader = container.querySelector<HTMLElement>(".willem-handoff__loader");
      const loadingLetters = container.querySelectorAll<HTMLElement>(".willem-handoff__letter");
      const boxes = container.querySelectorAll<HTMLElement>(".willem-handoff__loader-box");
      const growingImages = container.querySelectorAll<HTMLElement>(".willem-handoff__growing-image");
      const headingStarts = container.querySelectorAll<HTMLElement>(".willem-handoff__h1-start");
      const headingEnds = container.querySelectorAll<HTMLElement>(".willem-handoff__h1-end");
      const coverExtras = container.querySelectorAll<HTMLElement>(".willem-handoff__cover-image-extra");
      const headerLetters = container.querySelectorAll<HTMLElement>(".willem-handoff__letter-white");
      const statusEl = container.querySelector<HTMLElement>(".willem-handoff__status");
      const coverPlate = container.querySelector<HTMLElement>(".willem-handoff__cover-plate");

      if (coverPlate) {
        gsap.set(coverPlate, { scale: 1.25 });
      }

      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({
        defaults: { ease: "expo.inOut" },
        onStart: () => setHidden(false),
        onComplete: finish,
      });

      const RISE = quick ? 0.55 : 0.72;
      const GROW = quick ? 0.65 : 0.82;
      const EXPAND = quick ? 0.85 : 1.05;

      tl.from(loadingLetters, {
        yPercent: 100,
        stagger: 0.02,
        duration: RISE,
      });

      tl.fromTo(boxes, { width: "0em" }, { width: "1em", duration: GROW }, `< ${RISE * 0.35}`);
      tl.fromTo(growingImages, { width: "0%" }, { width: "100%", duration: GROW }, "<");
      tl.fromTo(headingStarts, { x: "0em" }, { x: "-0.05em", duration: GROW }, "<");
      tl.fromTo(headingEnds, { x: "0em" }, { x: "0.05em", duration: GROW }, "<");

      if (coverExtras.length) {
        tl.fromTo(
          coverExtras,
          { opacity: 1 },
          { opacity: 0, duration: 0.04, ease: "none", stagger: quick ? 0.22 : 0.32 },
          `-=${GROW * 0.15}`
        );
      }

      tl.to(
        growingImages,
        { width: "100vw", height: "100dvh", duration: EXPAND, ease: "power3.inOut" },
        `< ${GROW * 0.25}`
      );
      tl.to(boxes, { width: "110vw", duration: EXPAND }, "<");

      if (coverPlate) {
        tl.to(
          coverPlate,
          { scale: 1, duration: EXPAND, ease: "power2.inOut" },
          "<"
        );
      }

      tl.from(
        headerLetters,
        { yPercent: 100, duration: 0.65, ease: "expo.out", stagger: 0.03 },
        `< ${EXPAND * 0.35}`
      );

      if (statusEl) {
        tl.from(statusEl, { yPercent: 100, opacity: 0, duration: 0.5, ease: "expo.out" }, "<0.08");
      }

      const mosaicAt = `+=${quick ? 0.12 : 0.22}`;

      tl.call(() => {
        window.dispatchEvent(new Event("hero:mosaic-reveal"));
      }, undefined, mosaicAt);

      if (loader) {
        tl.to(loader, { opacity: 0, duration: 0.45, ease: "power2.in" }, mosaicAt);
      }

      tl.to(
        headerLetters,
        { opacity: 0, y: -8, duration: 0.35, stagger: 0.015, ease: "power2.in" },
        mosaicAt
      );

      if (statusEl) {
        tl.to(statusEl, { opacity: 0, duration: 0.3 }, mosaicAt);
      }

      if (coverPlate) {
        tl.to(coverPlate, { opacity: 0, duration: 0.5, ease: "power2.in" }, mosaicAt);
      }

      tl.to(container, { opacity: 0, duration: 0.55, ease: "power2.inOut" }, `${mosaicAt}+=0.15`);

      return () => {
        document.body.style.overflow = "";
        tl.kill();
      };
    },
    { scope: rootRef, revertOnUpdate: true, dependencies: [mode] }
  );

  if (!visible) return null;

  return (
    <section
      ref={rootRef}
      className={`willem-handoff is--loading${hidden ? " is--hidden" : ""}`}
      aria-label="Portfolio intro"
    >
      <button
        type="button"
        onClick={skip}
        className="absolute right-6 top-6 z-50 pf-mono"
        style={{
          background: hidden ? "rgba(26,26,26,0.06)" : "rgba(240,237,228,0.12)",
          border: "1px solid rgba(26,26,26,0.15)",
          color: hidden ? "var(--pf-ink)" : "var(--pf-paper)",
          padding: "8px 14px",
          cursor: "pointer",
          letterSpacing: "0.08em",
          fontSize: 11,
        }}
      >
        Skip →
      </button>

      <div className="willem-handoff__loader">
        <div className="willem-handoff__h1 willem-handoff__h1--ahmed">
          <div className="willem-handoff__h1-start">
            {START_LETTERS.map((char, i) => (
              <span key={`s-${i}`} className="willem-handoff__letter">{char}</span>
            ))}
          </div>

          <div className="willem-handoff__loader-box">
            <div className="willem-handoff__loader-box-inner">
              <div className="willem-handoff__growing-image">
                <div className="willem-handoff__growing-image-wrap">
                  {extras.map((project, i) => (
                    <img
                      key={project.id}
                      className={`willem-handoff__cover-image-extra is--${i + 1}`}
                      src={project.image}
                      alt=""
                      loading="eager"
                      style={{ objectPosition: "50% 20%" }}
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  ))}
                  <div
                    className="willem-handoff__cover-plate"
                    style={{ background: plateBg }}
                    aria-hidden
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="willem-handoff__h1-end">
            {END_LETTERS.map((char, i) => (
              <span key={`e-${i}`} className="willem-handoff__letter">{char}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="willem-handoff__content">
        <div className="willem-handoff__bottom">
          <div className="willem-handoff__name" aria-hidden>
            {DISPLAY_NAME.split("").map((char, i) => (
              <span key={i} className="willem-handoff__letter-white">{char}</span>
            ))}
          </div>
          <p className="willem-handoff__status">{profile.status}</p>
        </div>
      </div>
    </section>
  );
}
