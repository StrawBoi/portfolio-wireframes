"use client";

import { useRef, useState } from "react";
import gsap from "@/lib/gsap-client";
import { useGSAP } from "@gsap/react";

const statsData = [
  { label: "Years across IT, dev, strategy & growth", target: 11, suffix: "+" },
  { label: "Disciplines bridged in one profile", target: 3, suffix: "" },
  { label: "From scratch to launch", staticValue: "0→1" },
  { label: "Brussels · working with global teams", staticValue: "EU" },
];

export default function About() {
  const sectionRef = useRef(null);
  const [counts, setCounts] = useState([0, 0]);

  useGSAP(() => {
    const section = sectionRef.current;

    gsap.from(".about-text", {
      scrollTrigger: { trigger: section, start: "top 80%" },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });

    gsap.from(".stat-card", {
      scrollTrigger: {
        trigger: ".stats-grid",
        start: "top 85%",
        onEnter: () => startCounters(),
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, { scope: sectionRef });

  const startCounters = () => {
    const targets = [11, 3];
    const duration = 1600;
    const steps = 50;
    const interval = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts(targets.map((t) => Math.min(t, Math.ceil(t * eased))));
      if (currentStep >= steps) clearInterval(timer);
    }, interval);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="mx-auto max-w-7xl bg-[var(--bg)] px-6 py-24 md:px-12 md:py-32 lg:px-20"
    >
      <div className="items-center lg:grid lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="about-text mb-4 block font-body text-sm font-semibold uppercase tracking-[0.35em] text-[var(--accent)]">
            About
          </span>
          <h2 className="about-text font-display text-4xl font-bold leading-tight text-[var(--text-primary)] md:text-5xl">
            One operator across
            <br />
            business, technology & marketing
          </h2>
          <p className="about-text mt-6 font-body text-lg leading-relaxed text-[var(--text-primary)]/75">
            I'm Ahmed Mohsen Mostafa. Over 11+ years I've moved between IT,
            full-stack development, strategy and growth — usually on the same
            problem. That range is the point: I translate between the people who
            decide, the people who build, and the market they're building for.
          </p>
          <p className="about-text mt-4 font-body leading-relaxed text-[var(--text-primary)]/55">
            Based in Brussels, working with global teams. I tend to start where
            others stop — the messy middle between a strategy deck and a shipped
            product.
          </p>
        </div>

        <div className="stats-grid mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] lg:mt-0">
          {statsData.map((stat, index) => (
            <div key={index} className="stat-card bg-[var(--bg)] p-7">
              <div className="font-display text-4xl font-light text-[var(--accent)] md:text-5xl">
                {stat.staticValue ? (
                  stat.staticValue
                ) : (
                  <>
                    {counts[index]}
                    {stat.suffix}
                  </>
                )}
              </div>
              <div className="mt-3 font-body text-sm leading-snug text-[var(--text-primary)]/55">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
