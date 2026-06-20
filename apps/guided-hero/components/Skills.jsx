"use client";

import { useRef } from "react";
import gsap from "@/lib/gsap-client";
import { useGSAP } from "@gsap/react";

const capabilities = [
  {
    category: "Strategy",
    detail: "Positioning · Market & competitor research · Funnels · Briefs that ship",
  },
  {
    category: "Product & UX",
    detail: "Discovery · UX/UI design · Prototyping · Front-end-aware execution",
  },
  {
    category: "Technology",
    detail: "Full-stack development · Systems & integrations · IT operations",
  },
  {
    category: "Growth & Data",
    detail: "Campaign strategy · Analytics & A/B testing · KPI & ROI modelling",
  },
];

export default function Skills() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    gsap.from(".skills-header", {
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });

    gsap.from(".cap-row", {
      scrollTrigger: { trigger: ".cap-list", start: "top 85%" },
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power3.out",
    });
  }, { scope: sectionRef });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative z-10 mx-auto max-w-5xl px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <div className="max-w-2xl">
        <span className="skills-header block font-body text-sm font-semibold uppercase tracking-[0.35em] text-[var(--accent)]">
          Capabilities
        </span>
        <h2 className="skills-header mt-5 font-display text-4xl font-bold text-[var(--text-primary)] md:text-6xl">
          What I actually do
        </h2>
      </div>

      <div className="cap-list mt-16">
        {capabilities.map((cap, i) => (
          <div
            key={cap.category}
            className="cap-row group grid grid-cols-[2.5rem_1fr] items-baseline gap-4 border-t border-[var(--border)] py-8 transition-colors duration-300 md:grid-cols-[3.5rem_14rem_1fr] md:gap-8"
          >
            <span className="font-body text-sm tracking-[0.2em] text-[var(--text-muted)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-2xl font-medium text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--accent)] md:text-3xl">
              {cap.category}
            </h3>
            <p className="col-span-2 font-body text-base leading-relaxed text-[var(--text-primary)]/55 md:col-span-1">
              {cap.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
