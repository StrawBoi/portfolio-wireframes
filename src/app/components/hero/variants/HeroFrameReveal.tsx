import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "../../../../lib/gsapClient";
import { waitFontsReady } from "../introAssets";
import { bindHeroScrollSequence } from "../useHeroScrollSequence";
import { HeroScrollCue } from "../HeroScrollCue";
import { HeroStoryStage } from "../HeroStoryStage";
import { HERO_SIGNAL } from "../../../data/heroHook";
import { CV_HREF } from "../../nav/siteNav";

type Props = {
  active?: boolean;
};

export function HeroFrameReveal({ active = true }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const [handoffReveal, setHandoffReveal] = useState(false);

  useEffect(() => {
    const onReveal = () => setHandoffReveal(true);
    window.addEventListener("hero:mosaic-reveal", onReveal);
    return () => window.removeEventListener("hero:mosaic-reveal", onReveal);
  }, []);

  useGSAP(
    () => {
      if (!handoffReveal) return;

      const root = rootRef.current;
      if (!root) return;

      const field = root.querySelector<HTMLElement>(".hero-squeeze__field");
      if (field) {
        gsap.fromTo(field, { opacity: 0 }, { opacity: 1, duration: 0.9, ease: "power2.inOut" });
      }
    },
    { scope: rootRef, revertOnUpdate: true, dependencies: [handoffReveal] },
  );

  useGSAP(
    () => {
      if (!active || !handoffReveal) return;

      const root = rootRef.current;
      const scrollCue = root?.querySelector<HTMLElement>(".hero-scroll-cue");
      if (!root || !scrollCue) return;

      const slot = document.getElementById("hero-name-slot");
      if (!slot?.querySelector(".hero-squeeze__name-flight")) {
        return;
      }

      let unbindScroll: (() => void) | undefined;

      waitFontsReady().then(() => {
        unbindScroll = bindHeroScrollSequence({ root, scrollCue });
      });

      return () => {
        unbindScroll?.();
      };
    },
    { scope: rootRef, revertOnUpdate: true, dependencies: [active, handoffReveal] },
  );

  const isPending = !handoffReveal;

  return (
    <div
      ref={rootRef}
      id="frame-01-sequence"
      className={[
        "hero-squeeze",
        isPending ? "hero-squeeze--pending" : "",
        handoffReveal ? "hero-squeeze--live" : "",
        handoffReveal ? "hero-squeeze--cursor-live" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <section
        ref={stageRef}
        id="frame-01"
        className="hero-squeeze__stage"
        aria-label="Introduction"
      >
        <div className="hero-squeeze__field" aria-hidden />

        <HeroStoryStage active={handoffReveal && active} />

        <div className="hero-squeeze__vignette" aria-hidden />

        <aside className="hero-squeeze__signal" aria-label="Profile signal" data-cursor-block>
          <p className="hero-squeeze__signal-stack">
            <span className="hero-squeeze__signal-years">{HERO_SIGNAL.years}</span>
            <span className="hero-squeeze__signal-years-label">{HERO_SIGNAL.yearsLabel}</span>
          </p>
          <p className="hero-squeeze__signal-line">
            Bachelor <em>{HERO_SIGNAL.lineEmphasis}</em> · Odisee 2026
          </p>
          <p className="hero-squeeze__signal-tags pf-mono">{HERO_SIGNAL.tags}</p>
        </aside>

        <a
          href={CV_HREF}
          className="hero-squeeze__cv-cta pf-mono"
          download
          data-cursor="hover"
          data-cursor-block
        >
          Download CV
          <span className="hero-squeeze__cv-meta">PDF · 2026</span>
        </a>

        <HeroScrollCue />
      </section>
    </div>
  );
}
