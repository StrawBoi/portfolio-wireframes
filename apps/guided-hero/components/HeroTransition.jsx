"use client";

import { useRef } from "react";
import gsap from "@/lib/gsap-client";
import { ScrollTrigger } from "@/lib/gsap-client";
import { useGSAP } from "@gsap/react";

export default function HeroTransition() {
  const containerRef = useRef(null);

  // Marketing terms with depth and speed for parallax
  const marketingTerms = [
    { text: "MVP", depth: 0.3, speed: 0.7, x: 10, y: 15 },
    { text: "SWOT", depth: 0.5, speed: 1.1, x: 25, y: 35 },
    { text: "4C", depth: 0.7, speed: 1.4, x: 60, y: 20 },
    { text: "ROI", depth: 0.4, speed: 0.9, x: 75, y: 45 },
    { text: "KPI", depth: 0.6, speed: 1.2, x: 40, y: 60 },
    { text: "B2B", depth: 0.2, speed: 0.6, x: 15, y: 70 },
    { text: "CTR", depth: 0.8, speed: 1.5, x: 80, y: 65 },
    { text: "CPA", depth: 0.35, speed: 0.8, x: 50, y: 80 },
  ];

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
          reducedMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reducedMotion } = context.conditions;

          // Reduced motion: show everything statically
          if (reducedMotion) {
            const terms = gsap.utils.toArray(".marketing-term", container);
            gsap.set(terms, {
              opacity: 1,
              y: 0,
              rotateX: 0,
              rotateY: 0,
              scale: 1,
            });
            return;
          }

          // Desktop: full parallax effect
          if (isDesktop) {
            marketingTerms.forEach((term, i) => {
              const el = container.querySelector(`[data-term="${i}"]`);
              if (!el) return;

              // Set initial state
              gsap.set(el, {
                y: "100vh",
                rotateX: 45,
                rotateY: -15 + (i * 5),
                opacity: 0,
                scale: 0.5,
                force3D: true,
              });

              // Animate on scroll
              gsap.to(el, {
                y: "-80vh",
                rotateX: 0,
                rotateY: 0,
                opacity: 0.85,
                scale: 1,
                duration: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: container,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: term.speed,
                },
              });
            });

            // Additional parallax layers for depth
            const terms = gsap.utils.toArray(".marketing-term", container);
            terms.forEach((term, i) => {
              const depth = marketingTerms[i]?.depth || 0.5;
              
              // Horizontal drift for extra dimension
              gsap.to(term, {
                x: `+=${(depth - 0.5) * 100}`,
                duration: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: container,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: depth * 1.2,
                },
              });
            });
          } else {
            // Mobile: simpler animation with fewer terms
            const visibleTerms = marketingTerms.slice(0, 5);
            
            visibleTerms.forEach((term, i) => {
              const el = container.querySelector(`[data-term="${i}"]`);
              if (!el) return;

              gsap.set(el, {
                y: "80vh",
                rotateX: 30,
                opacity: 0,
                scale: 0.6,
                force3D: true,
              });

              gsap.to(el, {
                y: "-40vh",
                rotateX: 0,
                opacity: 0.7,
                scale: 0.9,
                duration: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: container,
                  start: "top 90%",
                  end: "bottom 10%",
                  scrub: term.speed * 0.8,
                },
              });
            });

            // Hide extra terms on mobile
            const extraTerms = gsap.utils.toArray(".marketing-term", container).slice(5);
            gsap.set(extraTerms, { opacity: 0, display: "none" });
          }
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="hero-transition relative min-h-screen overflow-hidden bg-[var(--color-deep-navy)]"
      aria-hidden="true"
    >
      {/* Gradient overlay for smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-deep-navy)] via-transparent to-[var(--color-deep-navy)] opacity-60 pointer-events-none" />

      {/* Marketing terms with parallax */}
      {marketingTerms.map((term, i) => (
        <div
          key={i}
          data-term={i}
          className="marketing-term absolute will-change-transform"
          style={{
            left: `${term.x}%`,
            top: `${term.y}%`,
            fontSize: `clamp(${2 + term.depth * 3}rem, ${3 + term.depth * 5}vw, ${4 + term.depth * 6}rem)`,
          }}
        >
          {term.text}
        </div>
      ))}

      {/* Subtle floating particles for depth */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[var(--color-electric-blue)]/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
