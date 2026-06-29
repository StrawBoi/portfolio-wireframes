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
    eyebrow: "Heritage exhibition",
    image: "/projects/cinematek/cinematek-poster.png",
    href: "#featured-exhibits-stage",
    caption: "Archival intelligence with exhibition drama.",
    zone: 0.32,
  },
  {
    id: "lievrier-ig-01",
    projectId: "le-lievrier",
    index: "03",
    title: "Le Lièvrier",
    eyebrow: "Luxury coffee",
    image: "/projects/le-lievrier/le-lievrier-poster.png",
    href: "#featured-exhibits-stage",
    caption: "Sculptural brand world — restraint and premium signal.",
    zone: 0.52,
  },
  {
    id: "volvo-ig-02",
    projectId: "volvo",
    index: "04",
    title: "Volvo P1800",
    eyebrow: "Hero asset",
    image: "/projects/volvo/volvo-p1800-4x3.png",
    href: "#featured-exhibits-stage",
    caption: "Heritage line — cinematic product frame.",
    zone: 0.68,
  },
  {
    id: "cinematek-ig-02",
    projectId: "cinematek",
    index: "05",
    title: "CINEMATEK 70s",
    eyebrow: "Programme identity",
    image: "/projects/cinematek/cinematek-70s-4x3.png",
    href: "#featured-exhibits-stage",
    caption: "Decade programming as editorial system.",
    zone: 0.86,
  },
];
