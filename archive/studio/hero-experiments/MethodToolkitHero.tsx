import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "../../../lib/gsapClient";
import { introGate } from "@portfolio/shared/content";
import { RoiGraph } from "./toolkit/RoiGraph";

export default function MethodToolkitHero() {
  const heroRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [scrollTimeline, setScrollTimeline] = useState<gsap.core.Timeline | null>(null);
  const navFiredRef = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useGSAP(
    () => {
      const container = heroRef.current;
      if (!container) return;

      const mm = gsap.matchMedia();

      const emitLogoReady = () => {
        if (navFiredRef.current) return;
        navFiredRef.current = true;
        window.dispatchEvent(new Event("hero:logo-ready"));
      };

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          reducedMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reducedMotion: rm } = context.conditions as {
            isDesktop: boolean;
            reducedMotion: boolean;
          };

          if (rm || !isDesktop) {
            gsap.set([copyRef.current, stageRef.current], { opacity: 1, y: 0, scale: 1 });
            setScrollTimeline(null);
            emitLogoReady();
            return;
          }

          gsap.set(copyRef.current, { opacity: 0, y: 24 });
          gsap.set(stageRef.current, {
            opacity: 0.35,
            scale: 0.98,
            transformOrigin: "center center",
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "+=200%",
              pin: true,
              scrub: 1.2,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          setScrollTimeline(tl);

          tl.to(copyRef.current, { opacity: 1, y: 0, ease: "none", duration: 0.22 }, 0);
          tl.to(stageRef.current, { opacity: 1, scale: 1, ease: "none", duration: 0.28 }, 0.06);

          tl.eventCallback("onUpdate", () => {
            const p = tl.scrollTrigger?.progress ?? 0;
            if (p >= 0.55) emitLogoReady();
          });
        }
      );

      return () => {
        setScrollTimeline(null);
        mm.revert();
      };
    },
    { scope: heroRef, revertOnUpdate: true }
  );

  return (
    <section
      id="frame-01"
      ref={heroRef}
      className="pf-dark method-toolkit-hero relative isolate min-h-screen overflow-hidden"
      style={{ background: "var(--pf-paper)", color: "var(--pf-ink)" }}
      aria-label="Method toolkit — don't tell, show"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      <div
        className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1600px] md:grid-cols-2"
        style={{ padding: "clamp(5rem, 12vh, 7rem) clamp(1.25rem, 4vw, 3.5rem)" }}
      >
        <div ref={copyRef} className="flex flex-col justify-center gap-8 md:pr-10">
          <span className="pf-eyebrow">Method · Toolkit</span>
          <h1 className="pf-h1" style={{ maxWidth: "14ch", lineHeight: 0.92 }}>
            Don&rsquo;t tell.
            <br />
            <span className="pf-display-italic" style={{ color: "var(--pf-hot)" }}>
              Show.
            </span>
          </h1>
          <p
            className="pf-mono"
            style={{ fontSize: "0.8125rem", letterSpacing: "0.18em", color: "var(--pf-ink-2)" }}
          >
            What do you wanna tell?
          </p>
          <p className="pf-lede" style={{ maxWidth: 420 }}>
            {introGate.philosophy} Scroll — the diagram draws as the strategist would on a dark stage.
          </p>
          <div className="flex items-center gap-3" style={{ marginTop: 8 }}>
            <div style={{ width: 8, height: 8, background: "var(--pf-hot)" }} />
            <span className="pf-mono" style={{ color: "var(--pf-ink-3)" }}>
              Scroll to draw · ROI
            </span>
          </div>
        </div>

        <div
          ref={stageRef}
          className="flex items-center justify-center md:justify-end"
          style={{ color: "var(--pf-ink)" }}
        >
          <div
            className="relative flex w-full items-center justify-center rounded-sm border"
            style={{
              aspectRatio: "420 / 340",
              maxWidth: 480,
              borderColor: "var(--pf-rule)",
              background: "var(--pf-card)",
              padding: "clamp(1rem, 3vw, 2rem)",
            }}
          >
            <RoiGraph timeline={scrollTimeline} reducedMotion={reducedMotion} />
          </div>
        </div>
      </div>
    </section>
  );
}
