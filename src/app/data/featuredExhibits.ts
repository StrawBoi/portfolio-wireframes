export type ExhibitTone = "industrial" | "archival" | "sculptural";

export type ExhibitSignal = {
  k: string;
  v: string;
};

export type FeaturedExhibit = {
  id: string;
  index: string;
  code: string;
  title: string;
  eyebrow: string;
  industry: string;
  tagline: string;
  description: string;
  role: string;
  context: string;
  achievement: string;
  signals: readonly ExhibitSignal[];
  image: string;
  href: string;
  tone: ExhibitTone;
};

export const EXHIBITS_CURATOR_LINE =
  "Campaign strategy, brand systems, and cultural programming — academic and client-facing work.";

export const EXHIBITS_SUB_RAIL =
  "Three strategic files · not a portfolio grid";

export const featuredSpotlight = {
  id: "cinematek-spotlight",
  code: "SPOTLIGHT",
  index: "03",
  title: "CINEMATEK",
  eyebrow: "Cultural institution",
  tagline: "100 years of cinema — archival intelligence as exhibition design.",
  poster: "/projects/cinematek/cinematek-poster.png",
  portrait: "/projects/cinematek/cinematek-70s.png",
  href: "#proof-cinematek",
  tone: "archival" as ExhibitTone,
};

export const featuredCampaignExhibits: FeaturedExhibit[] = [
  {
    id: "volvo-belgium-campaign",
    index: "01",
    code: "EXH. 01",
    title: "Volvo Belgium",
    eyebrow: "Automotive campaign",
    industry: "Automotive",
    tagline: "Made in Belgium",
    description:
      "Belgian craft meets automotive heritage — a national campaign engineered for premium recall.",
    role: "Campaign strategy · positioning",
    context: "Odisee BBA · automotive",
    achievement: "STP/SWOT turned factory truth into national campaign logic",
    signals: [
      {
        k: "Problem",
        v: "Local manufacturing sat in the background — not the positioning.",
      },
      {
        k: "Move",
        v: "Reframe factory truth as a Belgian identity advantage.",
      },
      {
        k: "Outcome",
        v: "Campaign architecture built on STP, SWOT, and competitive scan.",
      },
    ],
    image: "/projects/volvo/volvo-cover-4x3.png",
    href: "#proof-volvo-belgium-campaign",
    tone: "industrial",
  },
  {
    id: "le-lievrier",
    index: "02",
    code: "EXH. 02",
    title: "Le Lièvrier",
    eyebrow: "Luxury coffee",
    industry: "Luxury F&B",
    tagline: "Café d'exception",
    description:
      "Luxury coffee positioned through sculptural restraint and a tactile brand world.",
    role: "Brand world · luxury F&B",
    context: "Odisee BBA · hospitality",
    achievement: "Sculptural identity for café d'exception positioning",
    signals: [
      {
        k: "Problem",
        v: "Premium coffee lacked a tactile, ownable brand world.",
      },
      {
        k: "Move",
        v: "Editorial noir and sculptural restraint as positioning language.",
      },
      {
        k: "Outcome",
        v: "Coherent luxury identity ready for market touchpoints.",
      },
    ],
    image: "/projects/le-lievrier/le-lievrier-cover-4x3.png",
    href: "#proof-le-lievrier",
    tone: "sculptural",
  },
  {
    id: "cinematek",
    index: "03",
    code: "EXH. 03",
    title: "CINEMATEK",
    eyebrow: "Cultural institution",
    industry: "Culture",
    tagline: "100 years of cinema",
    description:
      "A century of film rendered as archival exhibition — history as designed experience.",
    role: "Cultural campaign · institution",
    context: "CINEMATEK · decade programming",
    achievement: "Decade-structured campaign for a century of cinema",
    signals: [
      {
        k: "Problem",
        v: "Classic cinema programming can feel fragmented to broader audiences.",
      },
      {
        k: "Move",
        v: "Decade-by-decade structure with platform-specific messaging.",
      },
      {
        k: "Outcome",
        v: "Cultural campaign proposal with a repeatable content system.",
      },
    ],
    image: "/projects/cinematek/cinematek-cover-4x3.png",
    href: "#proof-cinematek",
    tone: "archival",
  },
];

export type IntroRollSlide = {
  id: string;
  index: string;
  eyebrow: string;
  image: string;
  widescreen: string;
  tone: ExhibitTone;
};

export const introRollExhibits: IntroRollSlide[] = [
  {
    id: "cinematek-intro",
    index: "01",
    eyebrow: "Archival signal",
    image: "/projects/cinematek/cinematek-intro.png",
    widescreen: "/projects/cinematek/cinematek-poster.png",
    tone: "archival",
  },
  {
    id: "volvo-intro-belgium",
    index: "02",
    eyebrow: "Automotive campaign",
    image: "/projects/volvo/volvo-intro-belgium.png",
    widescreen: "/projects/volvo/volvo-intro-belgium.png",
    tone: "industrial",
  },
  {
    id: "volvo-intro-p1800",
    index: "03",
    eyebrow: "Heritage campaign",
    image: "/projects/volvo/volvo-intro-p1800.png",
    widescreen: "/projects/volvo/volvo-intro-p1800.png",
    tone: "industrial",
  },
  {
    id: "le-lievrier-intro",
    index: "04",
    eyebrow: "Luxury sculptural",
    image: "/projects/le-lievrier/le-lievrier-intro-noir.png",
    widescreen: "/projects/le-lievrier/le-lievrier-intro-noir.png",
    tone: "sculptural",
  },
];

export const heroApertureSlides: string[] = introRollExhibits.map((slide) => slide.image);
