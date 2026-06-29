import { useRef, useState, useCallback, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "../../../lib/gsapClient";
import { introRollExhibits } from "../../data/featuredExhibits";
import type { MotionMode } from "../../motion/MotionMode";
import {
  decodeIntroImages,
  preloadIntroImages,
  waitFontsReady,
} from "./introAssets";
import {
  END_LETTERS,
  START_LETTERS,
  willemEndLetterClassName,
  willemStartLetterClassName,
} from "./nameLetters";
import { runCinemaHandoff } from "./bindCinemaHandoff";

import "../../../styles/willem-handoff.css";

const APERTURE_WIDTH = "3.35em";
const INTRO_EASE = "power3.inOut";

type IntroProfile = {
  isMobile: boolean;
  isTablet: boolean;
  reduceMotion: boolean;
};

function readIntroProfile(): IntroProfile {
  if (typeof window === "undefined") {
    return { isMobile: false, isTablet: false, reduceMotion: false };
  }
  return {
    isMobile: window.matchMedia("(max-width: 767px)").matches,
    isTablet: window.matchMedia("(min-width: 768px) and (max-width: 1023px)").matches,
    reduceMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  };
}

function rollIndicesForProfile(profile: IntroProfile, total: number): number[] {
  if (total <= 0) return [];
  if (profile.isMobile) return [0, total - 1];
  if (profile.isTablet) {
    return [0, 1, total - 1].filter((v, i, a) => a.indexOf(v) === i && v < total);
  }
  return Array.from({ length: total }, (_, i) => i);
}

type Props = {
  mode: MotionMode;
  onComplete: () => void;
  cinemaHandoff?: boolean;
  continuous?: boolean;
};

function PosterVeil() {
  return <span className="willem-handoff__poster-veil" aria-hidden />;
}

function PosterVignette() {
  return <span className="willem-handoff__poster-vignette" aria-hidden />;
}

export function WillemHandoff({
  mode,
  onComplete,
  cinemaHandoff = false,
  continuous = false,
}: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const doneRef = useRef(false);
  const introBuiltRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const fitNameRowRef = useRef<(() => void) | null>(null);
  const [phase, setPhase] = useState<"loading" | "hero">("loading");
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    document.body.style.overflow = "";
    rootRef.current?.classList.remove("is--animating");
    if (continuous) setPhase("hero");
    else setMounted(false);
    onComplete();
  }, [onComplete, continuous]);

  const skip = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    timelineRef.current?.kill();
    document.body.style.overflow = "";
    rootRef.current?.classList.remove("is--animating");

    const container = rootRef.current;
    const h1 = container?.querySelector<HTMLElement>(".willem-handoff__h1--ahmed");
    const loaderEl = container?.querySelector<HTMLElement>(".willem-handoff__loader");

    if (container && h1) {
      runCinemaHandoff({
        introRoot: container,
        introName: h1,
        loaderEl: loaderEl ?? null,
        onComplete: () => {
          if (continuous) setPhase("hero");
          else setMounted(false);
          onComplete();
        },
      });
      return;
    }

    window.dispatchEvent(new Event("hero:mosaic-reveal"));
    if (continuous) setPhase("hero");
    else setMounted(false);
    onComplete();
  }, [onComplete, continuous]);

  useGSAP(
    () => {
      const container = rootRef.current;
      if (!container || phase === "hero" || introBuiltRef.current || doneRef.current) return;

      let cancelled = false;
      let resizeTimer: ReturnType<typeof setTimeout> | undefined;

      const onResize = () => {
        if (doneRef.current) return;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => fitNameRowRef.current?.(), 120);
      };
      window.addEventListener("resize", onResize);

      const run = async () => {
        await Promise.all([preloadIntroImages(), decodeIntroImages(), waitFontsReady()]);
        if (cancelled || !rootRef.current || introBuiltRef.current || doneRef.current) return;

        introBuiltRef.current = true;

        const c = rootRef.current;
        c.classList.add("is--animating");

        const loadingLetters = c.querySelectorAll<HTMLElement>(".willem-handoff__letter");
        const startLetters = c.querySelectorAll<HTMLElement>(
          ".willem-handoff__h1-start .willem-handoff__letter"
        );
        const endLetters = c.querySelectorAll<HTMLElement>(
          ".willem-handoff__h1-end .willem-handoff__letter"
        );
        const boxes = c.querySelectorAll<HTMLElement>(".willem-handoff__loader-box");
        const boxGrow = c.querySelectorAll<HTMLElement>(".willem-handoff__loader-box-grow");
        const boxInner = c.querySelector<HTMLElement>(".willem-handoff__loader-box-inner");
        const rollSlides = c.querySelectorAll<HTMLElement>(".willem-handoff__roll-slide");
        const rollImgs = c.querySelectorAll<HTMLElement>(".willem-handoff__roll-slide img");
        const loaderEl = c.querySelector<HTMLElement>(".willem-handoff__loader");
        const stageEl = c.querySelector<HTMLElement>(".willem-handoff__stage");
        const h1 = c.querySelector<HTMLElement>(".willem-handoff__h1--ahmed");
        const h1Start = c.querySelector<HTMLElement>(".willem-handoff__h1-start");
        const h1End = c.querySelector<HTMLElement>(".willem-handoff__h1-end");

        const profile = readIntroProfile();
        const quick = mode === "quick" || profile.isMobile;

        const RISE = quick ? 0.38 : 0.46;
        const RISE_STAGGER = quick ? 0.018 : 0.022;
        const GROW = quick ? 0.6 : profile.isTablet ? 0.68 : 0.76;
        const ROLL_HOLD = quick ? 0.28 : profile.isTablet ? 0.34 : 0.42;
        const ROLL_CUT = quick ? 0.1 : 0.12;

        const slideOrder = rollIndicesForProfile(profile, rollSlides.length);

        const fitNameRow = () => {
          if (!h1 || !loaderEl || doneRef.current) return;
          gsap.set(h1, { scale: 1 });
          const pad = 32;
          const available = loaderEl.clientWidth - pad;
          const needed = h1.scrollWidth;
          if (needed > available && available > 0) {
            gsap.set(h1, {
              scale: available / needed,
              transformOrigin: "center center",
            });
          }
        };
        fitNameRowRef.current = fitNameRow;

        const clearWillChange = () => {
          loadingLetters.forEach((el) => {
            el.style.willChange = "auto";
          });
          if (boxInner) boxInner.style.willChange = "auto";
          if (stageEl) stageEl.style.willChange = "auto";
        };

        fitNameRow();

        const runHandoff = () => {
          if (!h1 || doneRef.current) return;
          runCinemaHandoff({
            introRoot: c,
            introName: h1,
            loaderEl,
            onComplete: () => {
              clearWillChange();
              finish();
            },
          });
        };

        const tl = gsap.timeline({
          defaults: { ease: INTRO_EASE },
        });
        timelineRef.current = tl;

        const openAperture = (duration: number, label?: string) => {
          const at = label ?? undefined;
          tl.fromTo(
            boxes,
            { width: "0em" },
            { width: APERTURE_WIDTH, duration, ease: INTRO_EASE },
            at
          );
          if (boxGrow.length) {
            tl.fromTo(
              boxGrow,
              { scaleX: 0, transformOrigin: "center center" },
              { scaleX: 1, duration, ease: INTRO_EASE },
              at
            );
          }
          if (boxInner) {
            tl.set(boxInner, { visibility: "visible" }, at);
            tl.to(
              boxInner,
              {
                opacity: 1,
                scale: 1,
                clipPath: "inset(0% 0% 0% 0% round 5px)",
                duration,
                ease: INTRO_EASE,
                onComplete: () => {
                  boxInner.classList.add("is--visible");
                  c.classList.add("is--grown");
                  clearWillChange();
                  fitNameRow();
                },
              },
              at
            );
          }
        };

        const runRoll = (hold: number, cut: number, startLabel: string) => {
          if (slideOrder.length === 0) return;

          slideOrder.forEach((slideIdx, orderIdx) => {
            if (orderIdx === 0) {
              if (rollSlides[slideIdx]) {
                tl.set(rollSlides[slideIdx], { opacity: 1 }, startLabel);
              }
              return;
            }
            const prevIdx = slideOrder[orderIdx - 1];
            const at = `${startLabel}+=${orderIdx * (hold + cut)}`;
            tl.to(rollSlides[prevIdx], { opacity: 0, duration: cut }, at);
            tl.to(rollSlides[slideIdx], { opacity: 1, duration: cut }, "<");
            tl.to({}, { duration: hold * 0.55 });
          });
        };

        if (profile.reduceMotion) {
          gsap.set(loadingLetters, { yPercent: 0, opacity: 1 });
          gsap.set(boxes, { width: APERTURE_WIDTH, overflow: "hidden" });
          gsap.set(boxGrow, { scaleX: 1, transformOrigin: "center center" });
          if (h1Start) gsap.set(h1Start, { x: 0 });
          if (h1End) gsap.set(h1End, { x: 0 });
          if (boxInner) {
            gsap.set(boxInner, {
              opacity: 1,
              scale: 1,
              clipPath: "inset(0% 0% 0% 0% round 5px)",
              visibility: "visible",
            });
            boxInner.classList.add("is--visible");
          }
          c.classList.add("is--expanding", "is--grown");

          slideOrder.forEach((idx, i) => {
            gsap.set(rollSlides[idx], { opacity: i === 0 ? 1 : 0 });
          });
          if (rollImgs.length) gsap.set(rollImgs, { scale: 1 });

          fitNameRow();
          tl.addLabel("roll", 0.2);
          runRoll(0.55, 0.35, "roll");
          tl.addLabel("handoff", "+=0.08");
          tl.call(runHandoff, undefined, "handoff");
          return;
        }

        gsap.set(loadingLetters, { yPercent: 115, opacity: 0, force3D: true });
        gsap.set(boxes, { width: "0em", overflow: "hidden" });
        gsap.set(boxGrow, { scaleX: 0, transformOrigin: "center center" });
        if (boxInner) {
          gsap.set(boxInner, {
            opacity: 0,
            scale: 0.94,
            clipPath: "inset(50% 50% 50% 50% round 5px)",
            visibility: "hidden",
          });
        }
        if (h1Start) gsap.set(h1Start, { x: 8 });
        if (h1End) gsap.set(h1End, { x: -8 });
        if (rollImgs.length) gsap.set(rollImgs, { scale: 1.06 });
        rollSlides.forEach((slide) => gsap.set(slide, { opacity: 0 }));

        tl.to(startLetters, {
          yPercent: 0,
          opacity: 1,
          duration: RISE,
          stagger: RISE_STAGGER,
          ease: INTRO_EASE,
          force3D: true,
        });

        tl.to(
          endLetters,
          {
            yPercent: 0,
            opacity: 1,
            duration: RISE * 0.9,
            stagger: RISE_STAGGER * 0.9,
            ease: INTRO_EASE,
            force3D: true,
          },
          `-=${RISE * 0.62}`
        );

        tl.addLabel("grow", `-=${RISE * 0.28}`);
        tl.call(() => {
          c.classList.add("is--expanding");
          fitNameRow();
        }, undefined, "grow");

        if (h1Start) {
          tl.to(h1Start, { x: 0, duration: GROW, ease: INTRO_EASE }, "grow");
        }
        if (h1End) {
          tl.to(h1End, { x: 0, duration: GROW, ease: INTRO_EASE }, "grow");
        }

        openAperture(GROW, "grow");

        const revealImgAt = `grow+=${GROW * 0.55}`;
        if (slideOrder.length > 0) {
          const firstIdx = slideOrder[0];
          if (rollImgs[firstIdx]) gsap.set(rollImgs[firstIdx], { scale: 1 });
          tl.to(rollSlides[firstIdx], { opacity: 1, duration: 0.22, ease: INTRO_EASE }, revealImgAt);
          if (rollImgs[firstIdx]) {
            tl.fromTo(
              rollImgs[firstIdx],
              { scale: 1.08 },
              { scale: 1, duration: GROW * 0.45, ease: INTRO_EASE },
              revealImgAt
            );
          }
          tl.addLabel("roll", `+=${quick ? 0.05 : 0.1}`);
          runRoll(ROLL_HOLD, ROLL_CUT, "roll");
          tl.to({}, { duration: quick ? 0.14 : 0.22 });
        }

        tl.addLabel("handoff", `+=${quick ? 0.06 : 0.1}`);
        tl.call(runHandoff, undefined, "handoff");
      };

      run();

      return () => {
        cancelled = true;
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", onResize);
        fitNameRowRef.current = null;
        if (!doneRef.current) {
          timelineRef.current?.kill();
          timelineRef.current = null;
          introBuiltRef.current = false;
        }
      };
    },
    { scope: rootRef, revertOnUpdate: false }
  );

  if (!mounted) return null;

  const isHero = phase === "hero";

  return (
    <section
      ref={rootRef}
      id="intro-handoff"
      className={[
        "willem-handoff",
        continuous ? "is--continuous" : "is--overlay",
        isHero ? "is--hero" : "is--loading",
      ].join(" ")}
      aria-label={isHero ? "Introduction" : "Portfolio intro"}
    >
      {!isHero && (
        <button type="button" onClick={skip} className="willem-handoff__skip pf-mono">
          Skip →
        </button>
      )}

      <div className="willem-handoff__loader" aria-hidden={isHero}>
        <div className="willem-handoff__stage">
          <div
            className="willem-handoff__h1 willem-handoff__h1--ahmed"
            aria-label="Ahmed Mohsen Mostafa"
          >
            <div className="willem-handoff__h1-start">
              {START_LETTERS.map((char, i) => (
                <span key={`s-${i}`} className={willemStartLetterClassName(i)}>
                  {char === " " ? "\u00a0" : char}
                </span>
              ))}
            </div>

            <div className="willem-handoff__loader-box">
              <div className="willem-handoff__loader-box-grow">
                <div className="willem-handoff__loader-box-inner">
                  <div className="willem-handoff__aperture-mat">
                    <div className="willem-handoff__growing-image">
                      <div className="willem-handoff__growing-image-wrap">
                        <div className="willem-handoff__roll-aspect">
                          {introRollExhibits.map((card, i) => (
                            <figure
                              key={card.id}
                              className="willem-handoff__roll-slide"
                              data-poster={card.id}
                            >
                              <img
                                src={card.image}
                                alt=""
                                loading="eager"
                                fetchPriority={i === 0 ? "high" : "auto"}
                                decoding="async"
                              />
                              {card.tone === "sculptural" && <PosterVeil />}
                              <PosterVignette />
                            </figure>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="willem-handoff__h1-end">
              {END_LETTERS.map((char, i) => (
                <span key={`e-${i}`} className={willemEndLetterClassName(i)}>
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
