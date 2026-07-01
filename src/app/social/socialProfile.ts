import { profile } from "@portfolio/shared/content";
import { HERO_SIGNAL } from "../data/heroHook";

export const socialProfile = {
  handle: "ahmedmostafa",
  displayName: "Ahmed Mostafa",
  fullName: profile.name,
  location: profile.location,
  /** Middle section — recruiter scan path */
  headline: "Systems mind. Marketing hands.",
  lede:
    "Eleven years inside operations, CRM, and delivery — now building campaigns that recruiters can judge in ten seconds.",
  bioParagraph:
    "Brussels-based. Finishing Marketing at Odisee (2026). I translate briefs into content systems, measurement, and frames that hold up in market — not slide decks that disappear after the meeting.",
  workLine:
    "Volvo Belgium · CINEMATEK · Le Lièvrier — proof you can scroll like a feed and read like a strategy doc.",
  lookingFor: "Open to Summer 2026 marketing internship · Belgium & EU",
  tags: HERO_SIGNAL.tags,
  years: HERO_SIGNAL.years,
  yearsLabel: HERO_SIGNAL.yearsLabel,
  linkedin: profile.linkedin,
  avatarSrc: "/projects/ahmed/ahmed-portrait.png",
  avatarFallback: "AM",
} as const;
