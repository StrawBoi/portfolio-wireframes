import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "../../../lib/gsapClient";
import { landingReel } from "@portfolio/shared/content";
import type { MotionMode } from "../../motion/MotionMode";

const COUNT = landingReel.length;
const LEAD_INDEX = 0;

type Props = {
  mode: MotionMode;
  onComplete: () => void;
};

/**
 * Signal Lock-On — static field → crosshair acquire → image resolves.
 * Zero copy. Terminal noir, not carousel.
 */
export function ReelHandoff({ mode, onComplete }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const noiseRef = useRef<SVGSVGElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const meterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pushRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const doneRef = useRef(false);
  const [visible, setVisible] = useState(true);

  const skip = useCallback(() => {
    if (doneRef.current) return;
    document.body.style.overflow = "";
    doneRef.current = true;
    setVisible(false);
    window.dispatchEvent(new Event("hero:logo-ready"));
    onComplete();
  }, [onComplete]);

  useGSAP(
    () => {
      const root = rootRef.current;
      const noise = noiseRef.current;
      const turb = turbRef.current;
      const scan = scanRef.current;
      const chrome = chromeRef.current;
      const push = pushRef.current;
      if (!root || !noise || !turb || !scan || !chrome || !push) return;

      const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[];
      const imgs = imgRefs.current.filter(Boolean) as HTMLImageElement[];
      const meters = meterRefs.current.filter(Boolean) as HTMLDivElement[];
      const leadSlide = slides[LEAD_INDEX];
      const leadImg = imgs[LEAD_INDEX];

      const finish = () => {
        if (doneRef.current) return;
        doneRef.current = true;
        setVisible(false);
        window.dispatchEvent(new Event("hero:logo-ready"));
        onComplete();
      };

      const quick = mode === "quick";
      const LOCK = quick ? 0.72 : 0.98;
      const BURST = quick ? 0.07 : 0.1;

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (prefersReduced || window.innerWidth < 768) {
        document.body.style.overflow = "";
        finish();
        return;
      }

      gsap.set(slides, { visibility: "hidden", opacity: 0, clipPath: "circle(0% at 50% 52%)" });
      gsap.set(slides[0], { visibility: "visible", opacity: 1 });
      gsap.set(imgs, { scale: 1.22, filter: "brightness(0.55) contrast(1.15) saturate(0.7)" });
      gsap.set(noise, { opacity: 0.92 });
      gsap.set(scan, { top: "-4%", opacity: 0.85 });
      gsap.set(chrome, { opacity: 1 });
      gsap.set(meters, { scaleY: 0, transformOrigin: "bottom center" });
      gsap.set(push, { opacity: 0, scale: 1 });
      gsap.set(turb, { attr: { baseFrequency: 0.75 } });

      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({ onComplete: finish });

      const lockBeat = (i: number, start: number) => {
        const slide = slides[i];
        const img = imgs[i];
        const meter = meters[i];

        tl.set(slide, { visibility: "visible", opacity: 1, clipPath: "circle(0% at 50% 52%)" }, start);
        tl.set(img, { scale: 1.26, filter: "brightness(0.5) contrast(1.2) saturate(0.65)" }, start);
        tl.to(turb, { attr: { baseFrequency: 1.05 }, duration: LOCK * 0.35, ease: "power2.in" }, start);
        tl.to(
          slide,
          { clipPath: "circle(148% at 50% 52%)", duration: LOCK, ease: "power3.out" },
          start
        );
        tl.to(
          img,
          { scale: 1.1, filter: "brightness(0.92) contrast(1.05) saturate(1)", duration: LOCK, ease: "power2.out" },
          start
        );
        tl.to(noise, { opacity: 0.08, duration: LOCK * 0.85, ease: "power2.out" }, start + LOCK * 0.12);
        tl.fromTo(scan, { top: "-4%" }, { top: "104%", duration: LOCK * 0.92, ease: "none" }, start);
        tl.to(meter, { scaleY: 1, duration: LOCK * 0.55, ease: "power2.out" }, start + LOCK * 0.25);

        if (i < COUNT - 1) {
          const burstAt = start + LOCK + 0.04;
          tl.to(noise, { opacity: 0.95, duration: BURST, ease: "power4.in" }, burstAt);
          tl.to(slide, { opacity: 0, duration: BURST * 0.8, ease: "power2.in" }, burstAt);
          tl.set(slide, { visibility: "hidden" }, burstAt + BURST);
          tl.set(turb, { attr: { baseFrequency: 0.85 } }, burstAt + BURST);
          tl.set(scan, { top: "-4%" }, burstAt + BURST);
        }
      };

      lockBeat(0, 0.08);
      lockBeat(1, 0.08 + LOCK + BURST + 0.06);
      lockBeat(2, 0.08 + (LOCK + BURST + 0.06) * 2);

      const resolveAt = 0.08 + (LOCK + BURST + 0.06) * 2 + LOCK + 0.1;

      // ── All signals acquired → collapse to lead feed → sand ─────────────
      tl.to(slides[2], { opacity: 0, duration: 0.1, ease: "power2.in" }, resolveAt);
      tl.set(slides[2], { visibility: "hidden" }, resolveAt + 0.1);
      tl.set(leadSlide, { visibility: "visible", opacity: 1, clipPath: "circle(148% at 50% 52%)" }, resolveAt + 0.08);
      tl.fromTo(
        leadImg,
        { scale: 1.14, filter: "brightness(1.05)" },
        { scale: 1.22, filter: "brightness(1.12) contrast(1.08)", duration: quick ? 0.2 : 0.28, ease: "power2.in" },
        resolveAt + 0.1
      );
      tl.to(chrome, { opacity: 0, duration: 0.22, ease: "power2.in" }, resolveAt + 0.12);
      tl.to(noise, { opacity: 0, duration: 0.18, ease: "power2.in" }, resolveAt + 0.14);

      const pushAt = resolveAt + (quick ? 0.38 : 0.48);
      tl.to(leadSlide, { opacity: 0, duration: 0.08 }, pushAt);
      tl.set(push, { opacity: 1 }, pushAt);
      tl.fromTo(
        push,
        { scale: 0.48, filter: "brightness(0.7) blur(8px)" },
        { scale: 1.1, filter: "brightness(1) blur(0px)", duration: 0.55, ease: "power4.inOut" },
        pushAt + 0.02
      );
      tl.to(root, { backgroundColor: "#F0EDE4", duration: 0.32, ease: "power2.inOut" }, pushAt + 0.32);
      tl.to(push, { scale: 1.18, opacity: 0, duration: 0.24, ease: "power3.in" }, pushAt + 0.58);

      tl.call(() => {
        document.body.style.overflow = "";
      });

      tl.play();

      return () => {
        document.body.style.overflow = "";
        tl.kill();
      };
    },
    { scope: rootRef, revertOnUpdate: true, dependencies: [mode] }
  );

  const pushImage = landingReel[LEAD_INDEX].image;
  const pushAccent = landingReel[LEAD_INDEX].accent;

  if (!visible) return null;

  return (
    <div
      ref={rootRef}
      className="signal-lock fixed inset-0 z-[90] overflow-hidden"
      style={{ background: "#001621" }}
      role="region"
      aria-label="Portfolio signal acquisition"
    >
      <button
        type="button"
        onClick={skip}
        className="absolute right-6 top-6 z-50 pf-mono"
        style={{
          background: "rgba(240,237,228,0.06)",
          border: "1px solid rgba(240,237,228,0.2)",
          color: "rgba(240,237,228,0.75)",
          padding: "8px 14px",
          cursor: "pointer",
          letterSpacing: "0.08em",
          fontSize: 11,
        }}
      >
        Skip →
      </button>

      {/* Project feeds — revealed by radial lock-on */}
      {landingReel.map((project, i) => (
        <div
          key={project.id}
          ref={(el) => {
            slideRefs.current[i] = el;
          }}
          className="absolute inset-0 overflow-hidden"
          style={{ visibility: "hidden", opacity: 0 }}
        >
          {project.image ? (
            <img
              ref={(el) => {
                imgRefs.current[i] = el;
              }}
              src={project.image}
              alt=""
              className="absolute left-1/2 top-1/2 min-h-[122%] min-w-[122%] -translate-x-1/2 -translate-y-1/2 object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement!.style.background = `radial-gradient(circle at 50% 52%, ${project.accent}55 0%, #001621 72%)`;
              }}
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{ background: `radial-gradient(circle at 50% 52%, ${project.accent}55 0%, #001621 72%)` }}
            />
          )}
        </div>
      ))}

      {/* Live static — SVG turbulence */}
      <svg
        ref={noiseRef}
        className="signal-lock__noise pointer-events-none absolute inset-0 z-30 h-full w-full"
        aria-hidden
      >
        <filter id="signal-grain">
          <feTurbulence ref={turbRef} type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#signal-grain)" opacity="0.55" />
      </svg>

      {/* Terminal chrome — geometry only, zero project copy */}
      <div ref={chromeRef} className="signal-lock__chrome pointer-events-none absolute inset-0 z-40" aria-hidden>
        <div className="signal-lock__reticle" />
        <div className="signal-lock__corner signal-lock__corner--tl" />
        <div className="signal-lock__corner signal-lock__corner--tr" />
        <div className="signal-lock__corner signal-lock__corner--bl" />
        <div className="signal-lock__corner signal-lock__corner--br" />

        <div className="signal-lock__meter">
          {landingReel.map((_, i) => (
            <div
              key={`meter-${i}`}
              ref={(el) => {
                meterRefs.current[i] = el;
              }}
              className="signal-lock__meter-bar"
            />
          ))}
        </div>

        <div
          ref={scanRef}
          className="signal-lock__scanline"
        />
      </div>

      {/* Push-through to sand */}
      <div ref={pushRef} className="pointer-events-none absolute inset-0 z-20 overflow-hidden" style={{ opacity: 0 }}>
        {pushImage ? (
          <img src={pushImage} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full" style={{ background: `linear-gradient(135deg, ${pushAccent}55 0%, #001621 70%)` }} />
        )}
      </div>
    </div>
  );
}
