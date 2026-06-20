/**
 * Hero Entry Timeline — clean, impactful on-load animation.
 *
 * Phase 1 (0–1.5s):
 *   - Name characters stagger in with Y offset + rotateX
 *   - Accent line scales from center
 *   - Subtitle fades in
 *   - Scroll CTA appears last
 */
import { gsap } from "@/lib/gsap-client";
import { EASE, DURATION, STAGGER } from "@/lib/animations";

export function createHeroEntryTimeline(container) {
  if (!container) return null;

  // Query elements
  const nameSteps = gsap.utils.toArray(".hero-name-step", container);
  const accentLine = container.querySelector(".hero-accent-line");
  const subtitle = container.querySelector(".hero-subtitle");
  const scrollCta = container.querySelector(".hero-scroll-cta");

  if (!nameSteps.length) return null;

  // Set initial states
  nameSteps.forEach((step) => {
    const chars = step.querySelectorAll(".hero-char");
    gsap.set(chars, {
      yPercent: 110,
      opacity: 0,
      rotateX: -80,
      transformOrigin: "50% 100%",
      force3D: true,
    });
  });

  if (accentLine) {
    gsap.set(accentLine, { scaleX: 0, transformOrigin: "center center" });
  }

  if (subtitle) {
    gsap.set(subtitle, { opacity: 0, y: 20 });
  }

  if (scrollCta) {
    gsap.set(scrollCta, { opacity: 0, y: 10 });
  }

  // Build timeline
  const tl = gsap.timeline({
    defaults: { ease: EASE.expo },
    onComplete: () => {
      container.dispatchEvent(new CustomEvent("hero:complete"));
    },
  });

  // AHMED characters drop in
  const ahmedChars = nameSteps[0]?.querySelectorAll(".hero-char");
  if (ahmedChars?.length) {
    tl.to(
      ahmedChars,
      {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        duration: DURATION.hero,
        stagger: { each: STAGGER.chars, from: "start" },
      },
      0.2
    );
  }

  // MOSTAFA characters drop in (0.15s after AHMED starts)
  const mostafaChars = nameSteps[1]?.querySelectorAll(".hero-char");
  if (mostafaChars?.length) {
    tl.to(
      mostafaChars,
      {
        yPercent: 0,
        opacity: 1,
        rotateX: 0,
        duration: DURATION.hero,
        stagger: { each: STAGGER.chars, from: "start" },
      },
      0.35
    );
  }

  // Accent line scales in from center
  if (accentLine) {
    tl.to(
      accentLine,
      { scaleX: 1, duration: DURATION.slow, ease: EASE.snappy },
      0.9
    );
  }

  // Subtitle fades in
  if (subtitle) {
    tl.to(
      subtitle,
      { opacity: 1, y: 0, duration: DURATION.normal, ease: EASE.smooth },
      1.1
    );
  }

  // Scroll CTA fades in
  if (scrollCta) {
    tl.to(
      scrollCta,
      { opacity: 1, y: 0, duration: DURATION.normal, ease: EASE.smooth },
      2.0
    );
  }

  return tl;
}

export function splitDisplayLine(text) {
  return text.split("").map((char, index) => ({
    char: char === " " ? "\u00A0" : char,
    key: `${char}-${index}`,
  }));
}
