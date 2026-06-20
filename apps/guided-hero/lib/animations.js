// Shared animation constants and presets
export const EASE = {
  smooth: "power2.out",
  smoothIn: "power2.in",
  snappy: "power3.out",
  expo: "expo.out",
  bounce: "back.out(1.7)",
};

export const DURATION = {
  fast: 0.4,
  normal: 0.6,
  slow: 0.8,
  reveal: 1.0,
  hero: 1.2,
};

export const STAGGER = {
  fast: 0.03,
  normal: 0.05,
  slow: 0.08,
  chars: 0.02,
};

// Reusable animation presets for ScrollTrigger
export const REVEAL_FROM_BELOW = {
  y: 60,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out",
};

export const REVEAL_FADE = {
  opacity: 0,
  duration: 0.6,
  ease: "power2.out",
};

export const SCALE_IN = {
  scale: 0.9,
  opacity: 0,
  duration: 0.7,
  ease: "power3.out",
};

// Helper: split text into span-wrapped characters for animation
export function splitTextToChars(element) {
  if (!element) return [];
  const text = element.textContent;
  element.innerHTML = "";
  return [...text].map((char) => {
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.style.willChange = "transform, opacity";
    span.textContent = char === " " ? "\u00A0" : char;
    element.appendChild(span);
    return span;
  });
}

// Helper: create a standard ScrollTrigger config
export function createScrollConfig(trigger, options = {}) {
  return {
    trigger,
    start: "top 85%",
    end: "bottom 20%",
    toggleActions: "play none none none",
    ...options,
  };
}
