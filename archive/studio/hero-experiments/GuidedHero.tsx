import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "../../../lib/gsapClient";
import { featuredProjects } from "@portfolio/shared/content";

// ── Types ────────────────────────────────────────────────────────────────────
// The parallel content agent adds `image: string | null` to each project.
type FeaturedProject = (typeof featuredProjects)[number] & { image?: string | null };

// Show first 3 featured projects in the hero reel
const displayProjects = (featuredProjects as FeaturedProject[]).slice(0, 3);

// ── Helpers ──────────────────────────────────────────────────────────────────
const titleSize = () => Math.min(Math.max(window.innerWidth * 0.1, 56), 176);
const compactTitleSize = () => Math.min(Math.max(window.innerWidth * 0.028, 22), 42);

// ── Component ────────────────────────────────────────────────────────────────
export default function GuidedHero() {
  const heroRef    = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLDivElement>(null);
  const line1Ref   = useRef<HTMLDivElement>(null);   // "AHMED"
  const line2Ref   = useRef<HTMLDivElement>(null);   // "MOHSEN MOSTAFA"
  const ruleRef    = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const sepRef     = useRef<HTMLDivElement>(null);
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

      const positionLine2 = () => {
        const one = line1Ref.current;
        const two = line2Ref.current;
        if (!one || !two) return;
        gsap.set(two, { x: one.offsetWidth + Math.max(window.innerWidth * 0.018, 14), y: 0 });
      };

      mm.add(
        {
          isDesktop:     "(min-width: 768px)",
          isMobile:      "(max-width: 767px)",
          reducedMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reducedMotion, isMobile } = context.conditions as {
            isDesktop: boolean;
            isMobile: boolean;
            reducedMotion: boolean;
          };

          const cards = gsap.utils.toArray<HTMLElement>(".hero-project-card", container);
          const ctas  = gsap.utils.toArray<HTMLElement>(".hero-cta", container);

          // ── Reduced-motion / mobile: static layout, all visible ─────────
          if (reducedMotion || isMobile) {
            gsap.set(titleRef.current, {
              x: 0, y: 0, xPercent: 0, yPercent: 0, left: "auto", top: "auto",
            });
            gsap.set([line1Ref.current, line2Ref.current], {
              fontSize: "clamp(3.5rem, 10vw, 6.2rem)",
              fontWeight: 700,
              letterSpacing: "0.03em",
              clearProps: "transform",
            });
            gsap.set(ruleRef.current,    { scaleX: 1, opacity: 1 });
            gsap.set(taglineRef.current, { opacity: 1, y: 0 });
            gsap.set(sepRef.current,     { opacity: 1, scaleY: 1 });
            gsap.set(cards,              { opacity: 1, xPercent: 0, y: 0 });
            gsap.set(ctas,               { opacity: 1, y: 0 });
            emitLogoReady();
            return;
          }

          if (!isDesktop) return;

          // ── Desktop animated path ────────────────────────────────────────

          // 1. Position "MOHSEN MOSTAFA" to the right of "AHMED" (single-row title)
          positionLine2();

          // 2. Act-1 entry: tagline fades up ~600ms after mount
          gsap.set(taglineRef.current, { opacity: 0, y: 18 });
          gsap.timeline().fromTo(
            taglineRef.current,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.75, delay: 0.6, ease: "power2.out" }
          );

          // 3. GSAP initial states — title centred (flex), shifted by transform origin
          gsap.set(titleRef.current, { xPercent: -50, yPercent: -50, x: 0, y: 0 });
          gsap.set([line1Ref.current, line2Ref.current], {
            fontSize: titleSize(),
            fontWeight: 300,
            letterSpacing: "0.08em",
          });
          gsap.set(ruleRef.current, {
            scaleX: 1, opacity: 1, transformOrigin: "center center",
          });
          gsap.set(sepRef.current, {
            opacity: 0, scaleY: 0, transformOrigin: "top center",
          });
          gsap.set(cards, { opacity: 0, xPercent: 120 });
          gsap.set(ctas,  { opacity: 0, y: 10 });

          // 4. Act-2 pinned scroll timeline (~300 vh)
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "+=300%",
              pin: true,
              scrub: 1.5,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // Title drifts toward top-left
          scrollTl.to(titleRef.current, {
            x: () => -window.innerWidth  * 0.42,
            y: () => -window.innerHeight * 0.38,
            ease: "none",
          }, 0);

          // Name compacts: smaller, bolder, tighter
          scrollTl.to([line1Ref.current, line2Ref.current], {
            fontSize: compactTitleSize(),
            fontWeight: 700,
            letterSpacing: "0.03em",
            ease: "none",
          }, 0);

          // "MOHSEN MOSTAFA" wraps below "AHMED"
          scrollTl.to(line2Ref.current, {
            x: 0,
            y: () => (line1Ref.current?.offsetHeight ?? 0) * 1.08,
            ease: "none",
          }, 0.02);

          // Thin rule collapses
          scrollTl.to(ruleRef.current, { scaleX: 0, ease: "none" }, 0);

          // Tagline fades out
          scrollTl.to(taglineRef.current, { opacity: 0, y: -16, ease: "none" }, 0.08);

          // Left separator draws in
          scrollTl.to(sepRef.current, { opacity: 0.8, scaleY: 1, ease: "none" }, 0.18);

          // Project cards slide in from right with stagger
          scrollTl.to(cards, { xPercent: 0, opacity: 1, stagger: 0.15, ease: "none" }, 0.42);

          // CTAs fade up
          scrollTl.to(ctas, { opacity: 1, y: 0, stagger: 0.12, ease: "none" }, 0.68);

          // In-hero name fades — hands off to nav logo at progress ≥ 0.80
          scrollTl.to(titleRef.current, { opacity: 0, ease: "none" }, 0.84);

          // Dispatch logo-ready when 80 % complete
          scrollTl.eventCallback("onUpdate", () => {
            const p = scrollTl.scrollTrigger?.progress ?? 0;
            if (p >= 0.8) emitLogoReady();
          });
        }
      );

      return () => mm.revert();
    },
    { scope: heroRef, revertOnUpdate: true }
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section
      id="frame-01"
      ref={heroRef}
      className="guided-hero relative isolate min-h-screen overflow-hidden"
      style={{ background: "var(--pf-paper)", color: "var(--pf-ink)" }}
      aria-label="Introduction — Ahmed Mohsen Mostafa"
    >
      {/* Subtle paper noise — mix-blend-multiply keeps it invisible on light bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Left vertical separator (desktop — GSAP draws it in on scroll) */}
      <div
        ref={sepRef}
        aria-hidden
        className="pointer-events-none absolute hidden md:block"
        style={{
          left: "clamp(1.25rem, 4vw, 3.5rem)",
          top: "14vh",
          width: 1,
          height: "72vh",
          background: "var(--pf-rule-strong)",
          transformOrigin: "top center",
          opacity: 0,
        }}
      />

      {/* ── Viewport stage ───────────────────────────────────────────────── */}
      <div
        className="relative z-10 mx-auto flex min-h-screen w-full flex-col"
        style={{ maxWidth: 1600, padding: "7rem 1.5rem" }}
      >
        {/*
          Mobile:  flex column, items centered, normal flow
          Desktop: absolute inset-0 (fills viewport), flex centers titleRef
        */}
        <div className="relative flex min-h-[calc(100vh-14rem)] flex-col items-center justify-center text-center md:absolute md:inset-0 md:min-h-screen md:text-left">

          {/* ── Name ─────────────────────────────────────────────────────── */}
          {/*
            Desktop: titleRef is centered by flexbox; GSAP applies
            xPercent(-50)/yPercent(-50) so scroll x/y move from a clean origin.
            Line-2 is absolute left-0 top-0, then positionLine2() shifts it right.
          */}
          <div
            ref={titleRef}
            className="relative overflow-visible"
            style={{ maxWidth: "max-content", willChange: "transform" }}
          >
            <div
              ref={line1Ref}
              style={{
                fontFamily:     "var(--pf-font-display)",
                lineHeight:     0.86,
                fontWeight:     300,
                textTransform:  "uppercase",
                letterSpacing:  "0.08em",
                color:          "var(--pf-ink)",
                fontSize:       "clamp(3.5rem, 10vw, 11rem)",
              }}
            >
              AHMED
            </div>
            <div
              ref={line2Ref}
              className="mt-2 md:absolute md:left-0 md:top-0 md:mt-0"
              style={{
                fontFamily:     "var(--pf-font-display)",
                lineHeight:     0.86,
                fontWeight:     300,
                textTransform:  "uppercase",
                letterSpacing:  "0.08em",
                color:          "var(--pf-ink)",
                fontSize:       "clamp(3.5rem, 10vw, 11rem)",
              }}
            >
              MOHSEN MOSTAFA
            </div>
          </div>

          {/* ── Thin rule under the name ─────────────────────────────────── */}
          <div
            ref={ruleRef}
            className="mt-8 md:mt-10"
            style={{ height: 1, width: "100vw", background: "var(--pf-rule)", transformOrigin: "center center" }}
          />

          {/* ── Tagline ──────────────────────────────────────────────────── */}
          <div ref={taglineRef} className="mt-7 opacity-100 md:opacity-0">
            <p
              style={{
                fontFamily:    "var(--pf-font-mono)",
                fontSize:      "1.05rem",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color:         "var(--pf-ink)",
              }}
            >
              Bridging Business&nbsp;·&nbsp;Technology&nbsp;·&nbsp;Marketing
            </p>
            <p
              style={{
                marginTop:     "0.75rem",
                fontFamily:    "var(--pf-font-mono)",
                fontSize:      "0.8125rem",
                letterSpacing: "0.18em",
                color:         "var(--pf-ink-2)",
              }}
            >
              11+ years&nbsp;·&nbsp;Brussels, Belgium
            </p>
          </div>

          {/* ── Project cards + CTAs ─────────────────────────────────────── */}
          {/*
            Mobile:  static in flex column, max-width 34rem
            Desktop: absolute right panel (see theme.css .hero-cards-panel)
          */}
          <div className="hero-cards-panel mt-12 grid w-full max-w-[34rem] gap-3">
            {displayProjects.map((project) => (
              <a
                key={project.id}
                href="#frame-04"
                className="hero-project-card group opacity-100 md:opacity-0"
                style={{
                  display:        "block",
                  borderRadius:   12,
                  border:         "1px solid var(--pf-rule)",
                  background:     "var(--pf-card)",
                  padding:        "1rem",
                  textDecoration: "none",
                  backdropFilter: "blur(4px)",
                  transition:     "border-color 180ms ease",
                }}
                aria-label={`Open ${project.title}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div style={{ flex: 1 }}>
                    {project.image ? (
                      <img
                        src={project.image}
                        alt=""
                        aria-hidden
                        style={{
                          width:        "100%",
                          height:       72,
                          objectFit:    "cover",
                          borderRadius: 6,
                          marginBottom: "0.625rem",
                          display:      "block",
                        }}
                      />
                    ) : null}
                    <h3
                      style={{
                        fontFamily:  "var(--pf-font-sans)",
                        fontSize:    "0.9375rem",
                        fontWeight:  600,
                        color:       "var(--pf-ink)",
                        lineHeight:  1.2,
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      style={{
                        marginTop:     "0.375rem",
                        fontFamily:    "var(--pf-font-mono)",
                        fontSize:      "0.6875rem",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color:         "var(--pf-ink-2)",
                      }}
                    >
                      {project.category}
                    </p>
                  </div>
                  <span
                    style={{
                      marginTop:  4,
                      fontSize:   "1.125rem",
                      color:      "var(--pf-hot)",
                      flexShrink: 0,
                      display:    "inline-block",
                      transition: "transform 300ms ease",
                    }}
                    className="group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </div>
              </a>
            ))}

            {/* CTAs */}
            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <a
                href="#frame-04"
                className="hero-cta pf-btn opacity-100 md:opacity-0"
              >
                View Projects
              </a>
              <a
                href="/resume.pdf"
                className="hero-cta pf-btn pf-btn-ghost opacity-100 md:opacity-0"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
