"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap-client";
import { projectsData } from "@/lib/projects-data";
import ProjectSection from "./ProjectSection";
import { EASE, createScrollConfig } from "@/lib/animations";

export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  useGSAP(
    () => {
      // Animate the section header
      gsap.from(headerRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: EASE.snappy,
        scrollTrigger: createScrollConfig(headerRef.current),
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="projects" className="relative">
      {/* Section header */}
      <div ref={headerRef} className="pt-32 pb-16 px-6 text-center">
        <span className="text-sm uppercase tracking-[0.3em] text-[var(--color-electric-blue)] font-body">
          Selected Work
        </span>
        <h2 className="mt-4 text-4xl md:text-6xl font-display font-bold text-[var(--color-off-white)]">
          Projects
        </h2>
      </div>

      {/* Individual project sections */}
      {projectsData.map((project, index) => (
        <ProjectSection
          key={project.title}
          project={project}
          index={index}
          total={projectsData.length}
        />
      ))}
    </section>
  );
}
