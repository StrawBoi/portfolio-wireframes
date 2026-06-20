"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-client";
import Image from "next/image";
import { EASE } from "@/lib/animations";

export default function ProjectSection({ project, index, total }) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const glowRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // Image clip-path reveal from bottom
        tl.fromTo(
          imageRef.current,
          { clipPath: "inset(100% 0 0 0)", scale: 1.05 },
          {
            clipPath: "inset(0% 0 0 0)",
            scale: 1,
            duration: 0.6,
            ease: "power2.inOut",
          }
        );

        // Glow fades in alongside image
        tl.fromTo(
          glowRef.current,
          { opacity: 0 },
          { opacity: 0.2, duration: 0.4, ease: "power1.inOut" },
          "<0.2"
        );

        // Text content slides in staggered
        tl.from(
          contentRef.current.children,
          {
            y: 60,
            opacity: 0,
            stagger: 0.1,
            duration: 0.4,
            ease: EASE.snappy,
          },
          "-=0.2"
        );

        // Exit: fade everything out
        tl.to(
          [imageRef.current, contentRef.current, glowRef.current],
          {
            opacity: 0,
            y: -30,
            duration: 0.3,
            ease: EASE.smoothIn,
          },
          "+=0.15"
        );

        return () => {
          tl.kill();
        };
      });

      mm.add("(max-width: 767px)", () => {
        // Mobile: simple scroll reveal, no pin
        gsap.from(imageRef.current, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          ease: EASE.snappy,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        });

        gsap.from(contentRef.current.children, {
          y: 40,
          opacity: 0,
          stagger: 0.08,
          duration: 0.6,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
          },
        });
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        // No animations for reduced motion
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  const paddedIndex = String(index + 1).padStart(2, "0");

  return (
    <div
      ref={containerRef}
      className="project-section relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Large faded index number watermark */}
      <span className="absolute top-8 right-8 md:top-12 md:right-16 font-display font-[800] text-[8rem] md:text-[15rem] leading-none text-[var(--color-off-white)] opacity-[0.04] pointer-events-none select-none">
        {paddedIndex}
      </span>

      {/* Color accent glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${project.color}33 0%, transparent 70%)`,
        }}
      />

      {/* Layout: image + text */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* Image */}
        <div
          ref={imageRef}
          className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
          style={{ clipPath: "inset(100% 0 0 0)" }}
        >
          <Image
            src={project.imageSrc}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 50vw"
          />
          {/* Subtle gradient overlay on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-deep-navy)]/30 to-transparent pointer-events-none" />
        </div>

        {/* Content */}
        <div ref={contentRef} className="flex flex-col gap-4">
          <span
            className="text-sm uppercase tracking-[0.2em] font-body font-medium"
            style={{ color: project.color }}
          >
            {project.category}
          </span>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-[var(--color-off-white)] leading-tight">
            {project.title}
          </h3>
          <p className="text-base md:text-lg text-[var(--color-soft-lavender)] leading-relaxed max-w-md opacity-80">
            {project.description}
          </p>
          <a
            href="#"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-off-white)] hover:text-[var(--color-electric-blue)] transition-colors group/link"
          >
            <span>View Project</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transition-transform group-hover/link:translate-x-1"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom progress indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-[var(--color-off-white)]/40 font-body">
        <span>{paddedIndex}</span>
        <span className="w-8 h-px bg-[var(--color-off-white)]/20" />
        <span>{String(total).padStart(2, "0")}</span>
      </div>
    </div>
  );
}
