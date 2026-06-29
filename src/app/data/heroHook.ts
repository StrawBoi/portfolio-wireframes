/** Hero copy — sourced from CV positioning (EN) */

export const HERO_SIGNAL = {
  years: "11+",
  yearsLabel: "years",
  line: "Bachelor Marketing · Odisee 2026",
  lineEmphasis: "Marketing",
  tags: "CRM · Data · Digital · Ixelles",
} as const;

export const HERO_THESIS_LINES = [
  "Eleven years inside systems. Now campaigns that measure.",
  "I translate business goals into CRM, content, and proof.",
] as const;

/** Bottom lockup — full thesis (hero only) */
export const HERO_SCROLL_CUE = HERO_THESIS_LINES[0];
export const HERO_SCROLL_SUB = HERO_THESIS_LINES[1];

export const HERO_SCAN = {
  kicker: "Recruiter scan",
  headline: "Hybrid profile — ",
  headlineEm: "marketing + data + CRM",
  cta: "View exhibits",
} as const;
