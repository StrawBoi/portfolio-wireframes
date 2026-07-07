/**
 * Hero social wall — drop IG exports into /public/projects/social/
 * (4:5 or 1:1). Paths below use campaign posters until social crops exist.
 */

export type HeroSocialPost = {
  id: string;
  projectId: string;
  index: string;
  title: string;
  eyebrow: string;
  /** 4:5 portrait — Instagram post crop */
  image: string;
  href: string;
  caption: string;
  zone: number;
};

export const heroSocialPosts: HeroSocialPost[] = [
  {
    id: "volvo-ig-01",
    projectId: "volvo",
    index: "01",
    title: "Volvo Belgium",
    eyebrow: "Automotive · Made in Belgium",
    image: "/projects/volvo/volvo-poster.png",
    href: "#featured-exhibits-stage",
    caption: "Factory truth as national identity — campaign board frame.",
    zone: 0.12,
  },
  {
    id: "cinematek-ig-01",
    projectId: "cinematek",
    index: "02",
    title: "CINEMATEK",
    eyebrow: "Campaign board",
    image: "/projects/cinematek/cinematek-campaign-board-mockup.png",
    href: "#featured-exhibits-stage",
    caption: "Decade programming as a repeatable content system.",
    zone: 0.32,
  },
  {
    id: "lievrier-ig-01",
    projectId: "le-lievrier",
    index: "03",
    title: "Le Lièvrier",
    eyebrow: "Luxury coffee",
    image: "/projects/le-lievrier/le-lievrier-intro-noir.png",
    href: "#featured-exhibits-stage",
    caption: "Sculptural brand world — restraint and premium signal.",
    zone: 0.52,
  },
  {
    id: "volvo-ig-02",
    projectId: "volvo",
    index: "04",
    title: "Volvo Belgium",
    eyebrow: "Strategy frame",
    image: "/projects/volvo/Strategy.png",
    href: "#featured-exhibits-stage",
    caption: "STP and competitive scan turned into campaign logic.",
    zone: 0.68,
  },
  {
    id: "cinematek-ig-02",
    projectId: "cinematek",
    index: "05",
    title: "CINEMATEK 70s",
    eyebrow: "Programme identity",
    image: "/projects/cinematek/cinematek-decades-70s-poster.png",
    href: "#featured-exhibits-stage",
    caption: "Decade programming as editorial system.",
    zone: 0.86,
  },
];
