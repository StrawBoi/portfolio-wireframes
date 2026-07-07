export type SocialGridCell = {
  id: string;
  image: string;
  title: string;
  eyebrow: string;
  layout: "hero" | "tall" | "wide" | "square";
  video?: string;
  videoWebm?: string;
};

/** Campaign feed — featured mosaic + IG square rows */
export const socialGridCells: SocialGridCell[] = [
  {
    id: "volvo-hero",
    image: "/projects/volvo/volvo-poster.png",
    video: "/projects/volvo/volvo-hero.mp4",
    videoWebm: "/projects/volvo/volvo-hero.webm",
    title: "Volvo Belgium",
    eyebrow: "Made in Belgium",
    layout: "hero",
  },
  {
    id: "cinematek-70s",
    image: "/projects/cinematek/cinematek-decades-70s-poster.png",
    title: "CINEMATEK",
    eyebrow: "The 70s · Action",
    layout: "tall",
  },
  {
    id: "lievrier",
    image: "/projects/le-lievrier/le-lievrier-intro-noir.png",
    title: "Le Lièvrier",
    eyebrow: "Café d'exception",
    layout: "wide",
  },
  {
    id: "cinematek-heritage",
    image: "/projects/cinematek/cinematek-campaign.png",
    title: "CINEMATEK",
    eyebrow: "100 years of cinema",
    layout: "square",
  },
  {
    id: "volvo-p1800",
    image: "/projects/volvo/volvo-intro-p1800.png",
    title: "Volvo P1800",
    eyebrow: "Built for life",
    layout: "square",
  },
  {
    id: "volvo-presenting",
    image: "/projects/volvo/Presenting.png",
    title: "Volvo Belgium",
    eyebrow: "Situation analysis",
    layout: "square",
  },
  {
    id: "cinematek-60s",
    image: "/projects/cinematek/cinematek-decades-60s-poster.png",
    title: "CINEMATEK",
    eyebrow: "The 60s",
    layout: "square",
  },
  {
    id: "cinematek-board",
    image: "/projects/cinematek/cinematek-campaign-board-mockup.png",
    title: "CINEMATEK",
    eyebrow: "Campaign board",
    layout: "square",
  },
  {
    id: "cinematek-exhibit",
    image: "/projects/cinematek/cinematek-exhibit-cover.png",
    title: "CINEMATEK",
    eyebrow: "Exhibit cover",
    layout: "square",
  },
  {
    id: "cinematek-intro",
    image: "/projects/cinematek/cinematek-intro.png",
    title: "CINEMATEK",
    eyebrow: "Centenary intro",
    layout: "square",
  },
  {
    id: "cinematek-poster",
    image: "/projects/cinematek/cinematek-poster.png",
    title: "CINEMATEK",
    eyebrow: "Heritage poster",
    layout: "square",
  },
  {
    id: "cinematek-70s-cover",
    image: "/projects/cinematek/cinematek-70s-4x3.png",
    title: "CINEMATEK",
    eyebrow: "70s cover",
    layout: "square",
  },
  {
    id: "lievrier-poster",
    image: "/projects/le-lievrier/le-lievrier-poster.png",
    title: "Le Lièvrier",
    eyebrow: "Brand poster",
    layout: "square",
  },
  {
    id: "lievrier-cover",
    image: "/projects/le-lievrier/le-lievrier-cover-4x3.png",
    title: "Le Lièvrier",
    eyebrow: "Cover art",
    layout: "square",
  },
  {
    id: "lievrier-exhibit",
    image: "/projects/le-lievrier/le-lievrier-exhibit-cover.png",
    title: "Le Lièvrier",
    eyebrow: "Exhibit",
    layout: "square",
  },
  {
    id: "volvo-board",
    image: "/projects/volvo/volvo-belgium-campaign-board-mockup.png",
    title: "Volvo Belgium",
    eyebrow: "Campaign board",
    layout: "square",
  },
  {
    id: "volvo-strategy",
    image: "/projects/volvo/Strategy.png",
    title: "Volvo Belgium",
    eyebrow: "Strategy",
    layout: "square",
  },
  {
    id: "volvo-sprint",
    image: "/projects/volvo/Sprint.png",
    title: "Volvo Belgium",
    eyebrow: "Creative sprint",
    layout: "square",
  },
  {
    id: "volvo-belgium",
    image: "/projects/volvo/volvo-intro-belgium.png",
    title: "Volvo Belgium",
    eyebrow: "Belgium launch",
    layout: "square",
  },
  {
    id: "volvo-exhibit",
    image: "/projects/volvo/volvo-exhibit-cover.png",
    title: "Volvo Belgium",
    eyebrow: "Exhibit cover",
    layout: "square",
  },
  {
    id: "volvo-cover",
    image: "/projects/volvo/volvo-cover-4x3.png",
    title: "Volvo Belgium",
    eyebrow: "Cover 4×3",
    layout: "square",
  },
  {
    id: "volvo-presenting-2",
    image: "/projects/volvo/presenting-2.jpeg",
    title: "Volvo Belgium",
    eyebrow: "Presentation",
    layout: "square",
  },
];

/** Prototype campaign grid — 9 cells, 3 per campaign, one visual angle each */
export const campaignGridCells: SocialGridCell[] = [
  {
    id: "volvo-hero",
    image: "/projects/volvo/volvo-poster.png",
    video: "/projects/volvo/volvo-hero.mp4",
    videoWebm: "/projects/volvo/volvo-hero.webm",
    title: "Volvo Belgium",
    eyebrow: "Made in Belgium",
    layout: "hero",
  },
  {
    id: "cinematek-70s",
    image: "/projects/cinematek/cinematek-decades-70s-poster.png",
    title: "CINEMATEK",
    eyebrow: "The 70s · Action",
    layout: "tall",
  },
  {
    id: "lievrier",
    image: "/projects/le-lievrier/le-lievrier-intro-noir.png",
    title: "Le Lièvrier",
    eyebrow: "Café d'exception",
    layout: "wide",
  },
  {
    id: "volvo-presenting",
    image: "/projects/volvo/Presenting.png",
    title: "Volvo Belgium",
    eyebrow: "Situation analysis",
    layout: "square",
  },
  {
    id: "cinematek-60s",
    image: "/projects/cinematek/cinematek-decades-60s-poster.png",
    title: "CINEMATEK",
    eyebrow: "The 60s",
    layout: "square",
  },
  {
    id: "volvo-board",
    image: "/projects/volvo/volvo-belgium-campaign-board-mockup.png",
    title: "Volvo Belgium",
    eyebrow: "Campaign board",
    layout: "square",
  },
  {
    id: "volvo-strategy",
    image: "/projects/volvo/Strategy.png",
    title: "Volvo Belgium",
    eyebrow: "Strategy",
    layout: "square",
  },
  {
    id: "cinematek-board",
    image: "/projects/cinematek/cinematek-campaign-board-mockup.png",
    title: "CINEMATEK",
    eyebrow: "Campaign board",
    layout: "square",
  },
  {
    id: "volvo-sprint",
    image: "/projects/volvo/Sprint.png",
    title: "Volvo Belgium",
    eyebrow: "Creative sprint",
    layout: "square",
  },
];

export const socialGridPeekFrom = Math.max(0, socialGridCells.length - 6);

/** Withheld last row — 3 process cells */
export const campaignGridPeekFrom = Math.max(0, campaignGridCells.length - 3);

/** Central scroll handoff — flies from hero into grid */
export const heroScrollPick = {
  cellId: "lievrier",
  image: "/projects/le-lievrier/le-lievrier-intro-noir.png",
  label: "Le Lièvrier",
} as const;

export const spotlightPoster = {
  image: "/projects/volvo/volvo-poster.png",
  video: "/projects/volvo/volvo-hero.mp4",
  videoWebm: "/projects/volvo/volvo-hero.webm",
  title: "Volvo Belgium",
  tagline: "Made in Belgium",
  eyebrow: "Automotive campaign",
};
