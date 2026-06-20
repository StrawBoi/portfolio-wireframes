import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "../../../lib/gsapClient";
import { ScrollTrigger } from "../../../lib/gsapClient";
import { landingReel, profile } from "@portfolio/shared/content";

const COUNT = landingReel.length;
const ANGLE = 360 / COUNT;

function ringRadius() {
  return Math.min(Math.max(window.innerWidth * 0.44, 320), 520);
}

function panelSize() {
  const w = Math.min(window.innerWidth * 0.38, 420);
  return { w, h: Math.round(w * 0.64) };
}

function layoutRingPanels(panels: HTMLElement[]) {
  const R = ringRadius();
  const { w, h } = panelSize();
  panels.forEach((panel, i) => {
    gsap.set(panel, {
      position: "absolute",
      width: w,
      height: h,
      left: "50%",
      top: "50%",
      xPercent: -50,
      yPercent: -50,
      rotateY: i * -ANGLE,
      transformOrigin: `50% 50% ${R}px`,
      z: -R,
      force3D: true,
      opacity: 1,
    });
  });
}

function ReelSlide({
  project,
  index,
  setRef,
  setImgRef,
}: {
  project: (typeof landingReel)[number];
  index: number;
  setRef: (el: HTMLDivElement | null) => void;
  setImgRef: (el: HTMLImageElement | null) => void;
}) {
  return (
    <div
      ref={setRef}
      className="ring-hero__reel-slide absolute inset-0 overflow-hidden"
      style={{ opacity: index === 0 ? 1 : 0, visibility: index === 0 ? "visible" : "hidden" }}
    >
      {project.image ? (
        <img
          ref={setImgRef}
          src={project.image}
          alt=""
          className="ring-hero__reel-img absolute left-1/2 top-1/2 min-h-[115%] min-w-[115%] -translate-x-1/2 -translate-y-1/2 object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement!.style.background = `linear-gradient(135deg, ${project.accent}55 0%, #001621 65%)`;
          }}
        />
      ) : (
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${project.accent}55 0%, #001621 65%)` }} />
      )}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,22,33,0.94) 0%, rgba(0,22,33,0.15) 55%, transparent 100%)" }}
      />
      <div className="absolute bottom-[22%] left-6 right-6 md:left-12 md:right-auto md:max-w-lg">
        <p className="pf-mono" style={{ color: "var(--pf-hot)", fontSize: 10, letterSpacing: "0.18em" }}>
          {String(index + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
        </p>
        <h2
          style={{
            fontFamily: "var(--pf-font-display)",
            fontSize: "clamp(1.75rem, 4vw, 3rem)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            marginTop: 8,
            color: "var(--pf-paper)",
          }}
        >
          {project.title}
        </h2>
        <p className="pf-mono mt-2" style={{ fontSize: 11, letterSpacing: "0.12em", opacity: 0.75, color: "var(--pf-paper)" }}>
          {project.subtitle}
        </p>
      </div>
    </div>
  );
}

function RingPanel({
  project,
  index,
  setRef,
}: {
  project: (typeof landingReel)[number];
  index: number;
  setRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={setRef}
      className="ring-hero__panel relative overflow-hidden"
      style={{
        border: "1px solid rgba(240,237,228,0.22)",
        background: "#0a1520",
        boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
      }}
    >
      {project.image ? (
        <img
          src={project.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.parentElement!.style.background = `linear-gradient(135deg, ${project.accent}66 0%, #001621 70%)`;
          }}
        />
      ) : (
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${project.accent}66 0%, #001621 70%)` }} />
      )}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,22,33,0.88) 0%, transparent 55%)" }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="pf-mono" style={{ color: "var(--pf-hot)", fontSize: 9, letterSpacing: "0.14em" }}>
          {project.reelLabel}
        </p>
        <p
          style={{
            fontFamily: "var(--pf-font-display)",
            fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)",
            fontWeight: 600,
            marginTop: 4,
            color: "var(--pf-paper)",
          }}
        >
          {project.title}
        </p>
      </div>
    </div>
  );
}

export default function ProjectRingHero() {
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reelSlideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reelImgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const ringPanelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nameRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const navFiredRef = useRef(false);

  useGSAP(
    () => {
      const container = heroRef.current;
      const stage = stageRef.current;
      const reel = reelRef.current;
      const ring = ringRef.current;
      if (!container || !stage || !reel || !ring) return;

      const reelSlides = reelSlideRefs.current.filter(Boolean) as HTMLDivElement[];
      const reelImgs = reelImgRefs.current.filter(Boolean) as HTMLImageElement[];
      const ringPanels = ringPanelRefs.current.filter(Boolean) as HTMLDivElement[];
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
          const { isDesktop, reducedMotion } = context.conditions as {
            isDesktop: boolean;
            reducedMotion: boolean;
          };

          if (!isDesktop || reducedMotion) {
            gsap.set(reel, { opacity: 1 });
            gsap.set(ring, { opacity: 0 });
            gsap.set(reelSlides, { opacity: 1, visibility: "visible" });
            gsap.set(nameRef.current, { opacity: 1, y: 0 });
            gsap.set(ctaRef.current, { opacity: 1, y: 0 });
            emitLogoReady();
            return;
          }

          layoutRingPanels(ringPanels);
          gsap.set(stage, { perspective: 1200, perspectiveOrigin: "50% 42%" });
          gsap.set(ring, { rotationY: 0, scale: 1, opacity: 0, transformStyle: "preserve-3d" });
          gsap.set(reel, { opacity: 1 });
          gsap.set(reelSlides, { opacity: (i) => (i === 0 ? 1 : 0), visibility: (i) => (i === 0 ? "visible" : "hidden") });
          gsap.set(reelImgs, { scale: 1.08 });
          gsap.set(nameRef.current, { opacity: 0, y: 20 });
          gsap.set(ctaRef.current, { opacity: 0, y: 12 });

          const pin = ScrollTrigger.create({
            trigger: container,
            start: "top top",
            end: "+=100%",
            pin: true,
            pinSpacing: true,
          });

          const BEAT = 0.95;
          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            onComplete: () => {
              pin.kill(true);
              emitLogoReady();
            },
          });

          // ── Reel: fast fullscreen beats ────────────────────────────────
          reelSlides.forEach((slide, i) => {
            if (i === 0) {
              tl.to(reelImgs[i], { scale: 1.16, duration: BEAT, ease: "none" }, 0);
              return;
            }
            const t = i * BEAT;
            tl.set(reelSlides[i - 1], { visibility: "hidden" }, t);
            tl.set(slide, { visibility: "visible" }, t);
            tl.fromTo(slide, { opacity: 0 }, { opacity: 1, duration: 0.35 }, t);
            tl.fromTo(reelImgs[i], { scale: 1.05 }, { scale: 1.14, duration: BEAT, ease: "none" }, t);
            tl.to(reelSlides[i - 1], { opacity: 0, duration: 0.25 }, t);
          });

          const ringStart = COUNT * BEAT + 0.15;

          // ── Handoff: reel out → 3D ring in (CodePen geometry) ───────────
          tl.to(reel, { opacity: 0, duration: 0.35, ease: "power2.in" }, ringStart);
          tl.set(ring, { opacity: 1, rotationY: 160 }, ringStart + 0.05);
          tl.to(ring, { rotationY: 0, duration: 0.7, ease: "power3.out" }, ringStart + 0.1);

          // ── Ring spin (full carousel sweep) ─────────────────────────────
          tl.to(ring, { rotationY: -ANGLE * 2.2, duration: 1.1, ease: "power1.inOut" }, ringStart + 0.85);

          // ── Collapse into site ─────────────────────────────────────────
          tl.to(ring, { scale: 0.15, opacity: 0, duration: 0.45, ease: "power2.in" }, ringStart + 2.05);
          tl.to(nameRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, ringStart + 2.15);
          tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, ringStart + 2.35);

          tl.play();
        }
      );

      return () => mm.revert();
    },
    { scope: heroRef, revertOnUpdate: true }
  );

  return (
    <section
      id="frame-01"
      ref={heroRef}
      className="ring-hero relative isolate min-h-screen overflow-hidden"
      style={{ background: "#001621", color: "var(--pf-paper)" }}
      aria-label="Featured work reel"
    >
      <div className="ring-hero__chrome pointer-events-none absolute left-0 right-0 top-0 z-20 flex items-center justify-between px-6 py-5 md:px-12">
        <span className="pf-mono" style={{ color: "var(--pf-hot)", letterSpacing: "0.14em" }}>
          OPEN REEL · 01
        </span>
        <span className="pf-mono hidden md:inline" style={{ color: "rgba(240,237,228,0.45)", letterSpacing: "0.12em" }}>
          WORK FIRST
        </span>
      </div>

      <div ref={stageRef} className="ring-hero__stage absolute inset-0">
        <div ref={reelRef} className="ring-hero__reel absolute inset-0 z-10">
          {landingReel.map((project, i) => (
            <ReelSlide
              key={`reel-${project.id}`}
              project={project}
              index={i}
              setRef={(el) => {
                reelSlideRefs.current[i] = el;
              }}
              setImgRef={(el) => {
                reelImgRefs.current[i] = el;
              }}
            />
          ))}
        </div>

        <div
          ref={ringRef}
          className="ring-hero__ring pointer-events-none absolute left-1/2 top-[42%] z-20 h-0 w-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {landingReel.map((project, i) => (
            <RingPanel
              key={`ring-${project.id}`}
              project={project}
              index={i}
              setRef={(el) => {
                ringPanelRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>

      <div
        className="ring-hero__footer pointer-events-none absolute inset-x-0 bottom-0 z-30 flex flex-col items-center pb-10 pt-24 text-center md:pb-14"
        style={{ background: "linear-gradient(to top, rgba(0,22,33,0.96) 35%, transparent)" }}
      >
        <div ref={nameRef} className="pointer-events-auto max-w-3xl px-6">
          <p className="pf-mono mb-3" style={{ color: "var(--pf-hot)", fontSize: 10, letterSpacing: "0.18em" }}>
            {profile.status}
          </p>
          <h1
            style={{
              fontFamily: "var(--pf-font-display)",
              fontSize: "clamp(2rem, 5vw, 3.75rem)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              textTransform: "uppercase",
            }}
          >
            Ahmed Mohsen
            <br />
            Mostafa
          </h1>
          <p className="pf-mono mx-auto mt-4 max-w-md" style={{ fontSize: 12, letterSpacing: "0.12em", opacity: 0.65 }}>
            {profile.heroFine}
          </p>
        </div>
        <div ref={ctaRef} className="pointer-events-auto mt-8 flex flex-wrap justify-center gap-3 px-6">
          <a href="#frame-04" className="pf-btn">
            View Projects
          </a>
          <a
            href="/resume.pdf"
            className="pf-btn pf-btn-ghost"
            style={{ borderColor: "rgba(240,237,228,0.35)", color: "var(--pf-paper)" }}
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
