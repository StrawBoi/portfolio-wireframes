"use client";

import { useRef } from "react";
import gsap from "@/lib/gsap-client";
import { useGSAP } from "@gsap/react";

export default function ScrollIndicator({ enterDelay = 2.65, scopeRef }) {
  const indicatorRef = useRef(null);
  const pulseRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
      const el = indicatorRef.current;
      const pulse = pulseRef.current;
      if (!el) return;

      if (prefersReducedMotion) {
        gsap.set(el, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(el, { opacity: 0, y: 16 });

      const enter = gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        delay: enterDelay,
        ease: "power3.out",
      });

      const bounce = gsap.to(el, {
        y: 10,
        duration: 0.9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: enterDelay + 0.85,
      });

      if (pulse) {
        gsap.to(pulse, {
          scale: 1.35,
          opacity: 0,
          duration: 1.6,
          repeat: -1,
          ease: "power2.out",
          delay: enterDelay + 0.4,
        });
      }

      const scope = scopeRef?.current;
      const onHeroComplete = () => {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.5, overwrite: true });
      };

      scope?.addEventListener("hero:complete", onHeroComplete);

      return () => {
        enter.kill();
        bounce.kill();
        scope?.removeEventListener("hero:complete", onHeroComplete);
      };
    },
    { scope: indicatorRef, dependencies: [enterDelay] }
  );

  const handleScroll = () => {
    const projects = document.getElementById("projects");
    if (projects) {
      projects.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      type="button"
      ref={indicatorRef}
      aria-label="Scroll to projects"
      className="hero-scroll-indicator absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-2 border-0 bg-transparent p-2 md:bottom-10"
      onClick={handleScroll}
    >
      <span className="text-[0.58rem] font-semibold uppercase tracking-[0.42em] text-off-white/45">
        Scroll
      </span>
      <span className="relative flex h-12 w-12 items-center justify-center">
        <span
          ref={pulseRef}
          className="absolute inset-0 rounded-full border border-electric-blue/40"
          aria-hidden="true"
        />
        <span
          className="absolute inset-1 rounded-full border border-off-white/15"
          aria-hidden="true"
        />
        <svg
          className="relative h-5 w-5 text-off-white/70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </span>
    </button>
  );
}
