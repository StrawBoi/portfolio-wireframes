import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "../../../lib/gsapClient";
import { heroDecision, heroMoreWork, profile } from "@portfolio/shared/content";
import { DecisionDiagram } from "./DecisionDiagram";
import { bindMethodDraw } from "./toolkit/MethodShape";

const TICKER_FRAGMENTS = [
  "STP::SCAN",
  "SWOT::LOAD",
  "ROI↑",
  "BELGIUM::MFG",
  "POSITION::?",
  "VOLVO::SIGNAL",
];

export default function DecisionHero() {
  const heroRef = useRef<HTMLElement>(null);
  const hookRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const diagramWrapRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const stripCardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const nameRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLSpanElement>(null);
  const diagramSvgRef = useRef<SVGSVGElement>(null);
  const navFiredRef = useRef(false);

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

          const stripCards = stripCardsRef.current.filter(Boolean) as HTMLElement[];

          if (!isDesktop || rm) {
            if (diagramSvgRef.current) {
              bindMethodDraw(gsap.timeline(), diagramSvgRef.current, { reducedMotion: true });
            }
            gsap.set([hookRef.current, bodyRef.current, diagramWrapRef.current, visualRef.current, stripRef.current, nameRef.current, ctaRef.current], {
              opacity: 1,
              y: 0,
              clipPath: "inset(0% 0% 0% 0%)",
            });
            gsap.set(stripCards, { opacity: 1, x: 0 });
            gsap.set(tickerRef.current, { opacity: 0 });
            emitLogoReady();
            return;
          }

          gsap.set(tickerRef.current, { opacity: 1 });
          gsap.set(hookRef.current, { opacity: 0, y: 28 });
          gsap.set(bodyRef.current, { opacity: 0, y: 20 });
          gsap.set(diagramWrapRef.current, { opacity: 0.35 });
          gsap.set(visualRef.current, { clipPath: "inset(100% 0% 0% 0%)", opacity: 1 });
          gsap.set(stripCards, { opacity: 0, x: 48 });
          gsap.set(stripRef.current, { opacity: 0 });
          gsap.set(nameRef.current, { opacity: 0, y: 16 });
          gsap.set(ctaRef.current, { opacity: 0, y: 10 });

          // Ticker flicker (signal lock-on)
          let tickIdx = 0;
          const tickTween = gsap.to({}, {
            duration: 0.55,
            repeat: 4,
            onRepeat: () => {
              tickIdx = (tickIdx + 1) % TICKER_FRAGMENTS.length;
              if (tickerRef.current) tickerRef.current.textContent = TICKER_FRAGMENTS[tickIdx];
            },
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "+=220%",
              pin: true,
              scrub: 0.55,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          if (diagramSvgRef.current) {
            bindMethodDraw(tl, diagramSvgRef.current, {
              drawSlot: { from: 0.28, to: 0.62 },
              labelSlot: { from: 0.58, to: 0.72 },
            });
          }

          // 0–0.12: resolve signal → hook
          tl.to(tickerRef.current, { opacity: 0, duration: 0.06, ease: "none" }, 0.08);
          tl.to(hookRef.current, { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" }, 0.1);
          tickTween.kill();

          // 0.12–0.28: tension + body copy
          tl.to(bodyRef.current, { opacity: 1, y: 0, duration: 0.12, ease: "none" }, 0.18);
          tl.to(diagramWrapRef.current, { opacity: 1, duration: 0.1, ease: "none" }, 0.22);

          // 0.28–0.62: diagrams draw (via DecisionDiagram bindMethodDraw)
          // 0.58–0.72: volvo visual reveals
          tl.to(visualRef.current, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.14, ease: "none" }, 0.58);

          // 0.72–0.88: more work strip
          tl.to(stripRef.current, { opacity: 1, duration: 0.06, ease: "none" }, 0.72);
          tl.to(stripCards, { opacity: 1, x: 0, stagger: 0.04, duration: 0.1, ease: "none" }, 0.74);

          // 0.88–1: signature
          tl.to(nameRef.current, { opacity: 1, y: 0, duration: 0.08, ease: "none" }, 0.88);
          tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.06, ease: "none" }, 0.92);

          tl.eventCallback("onUpdate", () => {
            if ((tl.scrollTrigger?.progress ?? 0) >= 0.9) emitLogoReady();
          });
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
      className="decision-hero relative isolate min-h-screen overflow-hidden"
      style={{ background: "#001621", color: "var(--pf-paper)" }}
      aria-label="Volvo Belgium case decision"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(240,237,228,0.04) 2px, rgba(240,237,228,0.04) 3px)",
        }}
      />

      <div className="decision-hero__grid relative z-10 mx-auto grid min-h-screen w-full max-w-[1440px] grid-cols-1 gap-8 px-6 pb-28 pt-24 md:grid-cols-12 md:gap-10 md:px-12 md:pb-16 md:pt-28">
        {/* Copy column */}
        <div className="flex flex-col justify-center md:col-span-5">
          <span
            ref={tickerRef}
            className="pf-mono mb-6 inline-block"
            style={{ color: "var(--pf-hot)", fontSize: 11, letterSpacing: "0.2em" }}
          >
            {TICKER_FRAGMENTS[0]}
          </span>

          <div ref={hookRef}>
            <p className="pf-mono mb-4" style={{ color: "rgba(240,237,228,0.5)", fontSize: 10, letterSpacing: "0.16em" }}>
              {heroDecision.eyebrow}
            </p>
            <h2
              style={{
                fontFamily: "var(--pf-font-display)",
                fontSize: "clamp(2rem, 4.2vw, 3.25rem)",
                fontWeight: 600,
                letterSpacing: "-0.035em",
                lineHeight: 0.98,
              }}
            >
              {heroDecision.hook}
              <br />
              <span style={{ color: "var(--pf-hot)" }}>{heroDecision.hookAccent}</span>
            </h2>
          </div>

          <div ref={bodyRef} className="mt-6 space-y-4">
            <p className="pf-lede" style={{ color: "rgba(240,237,228,0.82)", maxWidth: "36ch" }}>
              {heroDecision.tension}
            </p>
            <p className="pf-body" style={{ color: "rgba(240,237,228,0.65)", maxWidth: "40ch", fontSize: 15 }}>
              {heroDecision.insight}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {heroDecision.frameworks.map((f) => (
                <span
                  key={f}
                  className="pf-mono"
                  style={{
                    fontSize: 9,
                    letterSpacing: "0.12em",
                    padding: "6px 10px",
                    border: "1px solid rgba(240,237,228,0.2)",
                    color: "rgba(240,237,228,0.7)",
                  }}
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Diagram + visual */}
        <div className="flex flex-col justify-center gap-5 md:col-span-7">
          <div ref={diagramWrapRef} className="w-full max-w-lg md:ml-auto">
            <DecisionDiagram ref={diagramSvgRef} />
          </div>
          <div
            ref={visualRef}
            className="relative ml-auto aspect-[16/10] w-full max-w-xl overflow-hidden"
            style={{ border: "1px solid rgba(240,237,228,0.15)", background: "#0a1520" }}
          >
            <img
              src={heroDecision.image}
              alt=""
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement!.style.background = `linear-gradient(135deg, ${heroDecision.accent}44 0%, #001621 70%)`;
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 p-4"
              style={{ background: "linear-gradient(to top, rgba(0,22,33,0.9), transparent)" }}
            >
              <span className="pf-mono" style={{ fontSize: 10, letterSpacing: "0.14em", color: "var(--pf-hot)" }}>
                Recommendation → campaign board
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* More work strip */}
      <div ref={stripRef} className="relative z-10 border-t border-[rgba(240,237,228,0.12)] px-6 py-8 md:px-12">
        <p className="pf-mono mb-4" style={{ fontSize: 10, letterSpacing: "0.16em", color: "rgba(240,237,228,0.45)" }}>
          THREE MORE LIKE THIS →
        </p>
        <div className="flex gap-3 overflow-x-auto pb-1 md:gap-4">
          {heroMoreWork.map((p, i) => (
            <a
              key={p.id}
              href="#frame-04"
              ref={(el) => {
                stripCardsRef.current[i] = el;
              }}
              className="decision-hero__strip-card group shrink-0"
              style={{
                width: "min(72vw, 220px)",
                border: "1px solid rgba(240,237,228,0.15)",
                background: "#0a1520",
                textDecoration: "none",
                overflow: "hidden",
              }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.style.background = `linear-gradient(135deg, ${p.accent}55 0%, #001621 80%)`;
                  }}
                />
              </div>
              <div className="p-3">
                <p className="pf-mono" style={{ fontSize: 9, color: "var(--pf-hot)", letterSpacing: "0.12em" }}>
                  {p.reelLabel}
                </p>
                <p
                  style={{
                    fontFamily: "var(--pf-font-sans)",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--pf-paper)",
                    marginTop: 4,
                  }}
                >
                  {p.title}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Signature */}
      <div
        className="relative z-10 flex flex-col items-center border-t border-[rgba(240,237,228,0.1)] px-6 py-10 text-center md:py-12"
        style={{ background: "linear-gradient(to top, rgba(0,22,33,0.98), rgba(0,22,33,0.85))" }}
      >
        <div ref={nameRef}>
          <p className="pf-mono mb-2" style={{ fontSize: 10, letterSpacing: "0.16em", color: "rgba(240,237,228,0.45)" }}>
            Strategist signature
          </p>
          <p
            style={{
              fontFamily: "var(--pf-font-display)",
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            Ahmed Mohsen Mostafa
          </p>
          <p className="pf-mono mx-auto mt-3 max-w-md" style={{ fontSize: 11, letterSpacing: "0.1em", opacity: 0.6 }}>
            {profile.heroFine}
          </p>
        </div>
        <div ref={ctaRef} className="mt-6 flex flex-wrap justify-center gap-3">
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
