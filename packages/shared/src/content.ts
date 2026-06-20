/**
 * Unified portfolio content — merged from:
 * - Sketch wireframes (handwritten notes)
 * - AhmedMostafa--Martech (production copy + projects)
 * - Guided hero (curtain reel projects)
 */

export const profile = {
  name: "Ahmed Mohsen Mostafa",
  short: "Ahmed",
  mark: "AMM",
  location: "Brussels, Belgium",
  role: "Strategy · Technology · Marketing",
  tagline: "Find & execute things you thought impossible.",
  heroFine:
    "From marketing intern to AI-native operator — strategically sharp, technically fluent.",
  linkedin: "https://www.linkedin.com/in/ahmed-mohsen-hanafy/",
  status: "Available — Summer 2026 internship",
};

export const provenWork = {
  teams: ["CINEMATEK", "Volvo Belgium"],
  individual: ["MOSOL", "Marketing Intelligence"],
  gtm: ["Vantier", "Tackle"],
};

export const experience = [
  {
    from: "Now",
    to: "Summer 2026",
    company: "Odisee BBA",
    position: "Business Management & Marketing",
    achievements: [
      "Preparing for a marketing, research, or analytics internship in Belgium or Europe.",
      "Applying a systems mind to market research, campaign logic, and operational follow-through.",
    ],
  },
  {
    from: "2025",
    to: "2025",
    company: "Volvo Belgium",
    position: "Account Manager · University campaign strategy",
    achievements: [
      "Connected market analysis, audience logic, and positioning into a locally resonant campaign proposal.",
      "Used STP, SWOT, PESTEL, Porter's Five Forces, and competitive benchmarking to frame the recommendation.",
    ],
  },
  {
    from: "2025",
    to: "2025",
    company: "CINEMATEK",
    position: "Campaign / account strategy support",
    achievements: [
      "Turned a multi-month cinema programme into a decade-by-decade audience and content system.",
      "Balanced cultural storytelling with platform planning, tone of voice, and practical conversion logic.",
    ],
  },
];

export const technicalExperience = [
  { role: "Systems mind", context: "11+ years across IT, development, marketing, and consulting" },
  { role: "Automation edge", context: "Lightweight operations, no-code logic, and cleaner handoffs" },
  { role: "Analytics habit", context: "Research, segmentation, dashboards, and decision briefs" },
  { role: "Business lens", context: "Strategy, marketing, and stakeholder communication" },
];

/** Landing reel — fullscreen hero sequence (Volvo → martech → Vantier) */
export const landingReel = [
  {
    id: "volvo-belgium-campaign",
    title: "Volvo Belgium",
    subtitle: "Made in Belgium · Campaign strategy",
    category: "Strategy & Creative",
    reelLabel: "Volvo",
    accent: "#2D5BFF",
    image: "/projects/volvo/volvo-belgium-campaign-board-mockup.png",
  },
  {
    id: "marketing-intelligence",
    title: "Marketing Intelligence",
    subtitle: "Research · Analytics · Decision dashboards",
    category: "Research & Analytics",
    reelLabel: "Martech",
    accent: "#00B4D8",
    image:
      "/projects/marketing-intelligence/marketing-intelligence-dashboard-mockup.png",
  },
  {
    id: "vantier",
    title: "Vantier",
    subtitle: "Brand identity · GTM positioning",
    category: "Brand Identity",
    reelLabel: "Vantier",
    accent: "#C9A227",
    image: "/projects/vantier/VantierBT.png",
  },
] as const;

/** Hero — one project, one decision (Volvo-led narrative) */
export const heroDecision = {
  id: "volvo-belgium-campaign",
  eyebrow: "Case · Volvo Belgium",
  hook: "Belgium builds Volvos.",
  hookAccent: "The brand wasn't leading with that.",
  tension:
    "Manufacturing was treated as background noise — not a positioning weapon.",
  insight:
    "Reframe local production as identity. STP, SWOT, and competitive scan turned factory truth into campaign logic.",
  image: "/projects/volvo/volvo-belgium-campaign-board-mockup.png",
  accent: "#2D5BFF",
  frameworks: ["STP", "SWOT", "Competitive scan"] as const,
};

/** Strip after hero decision — three more proof points */
export const heroMoreWork = [
  {
    id: "marketing-intelligence",
    title: "Marketing Intelligence",
    reelLabel: "Martech",
    accent: "#00B4D8",
    image: "/projects/marketing-intelligence/marketing-intelligence-dashboard-mockup.png",
  },
  {
    id: "cinematek",
    title: "CINEMATEK",
    reelLabel: "Cinematek",
    accent: "#FF5722",
    image: "/projects/cinematek/cinematek-campaign-board-mockup.png",
  },
  {
    id: "vantier",
    title: "Vantier",
    reelLabel: "Vantier",
    accent: "#C9A227",
    image: "/projects/vantier/VantierBT.png",
  },
] as const;

/** Hero curtain / featured projects — guided-hero + martech */
export const featuredProjects = [
  {
    id: "cinematek",
    title: "CINEMATEK — Decades of Cinema Campaign",
    category: "Campaign Strategy",
    reelLabel: "Cinematek",
    accent: "#FF5722",
    image: "/projects/cinematek/cinematek-campaign-board-mockup.png",
  },
  {
    id: "volvo-belgium-campaign",
    title: "Volvo Belgium — Made in Belgium Campaign Strategy",
    category: "Strategy & Creative",
    reelLabel: "Volvo",
    accent: "#2D5BFF",
    image: "/projects/volvo/volvo-belgium-campaign-board-mockup.png",
  },
  {
    id: "mosol",
    title: "MOSOL — Horeca Intelligence",
    category: "UX/UI Design",
    reelLabel: "MOSOL",
    accent: "#7000FF",
    image: "/projects/mosol/main-poster-thumbnail.png",
  },
  {
    id: "marketing-intelligence",
    title: "Marketing Intelligence",
    category: "Research & Analytics",
    reelLabel: "Martech",
    accent: "#00B4D8",
    image:
      "/projects/marketing-intelligence/marketing-intelligence-dashboard-mockup.png",
  },
  {
    id: "vantier",
    title: "Vantier",
    category: "Brand Identity",
    reelLabel: "Vantier",
    accent: "#C9A227",
    image: "/projects/vantier/VantierBT.png",
  },
  {
    id: "tackle",
    title: "Tackle — Sales Analytics",
    category: "UX/UI Design",
    reelLabel: "Tackle",
    accent: "#FF2D78",
    image: "/projects/tackle/tackle-mockup.png",
  },
  {
    id: "egyfwd",
    title: "EGYFWD Learning Platform",
    category: "EdTech",
    reelLabel: "EGYFWD",
    accent: "#00C4A7",
    image: null,
  },
  {
    id: "halan",
    title: "Halan App",
    category: "Fintech & Mobility",
    reelLabel: "Halan",
    accent: "#FF4A1C",
    image: null,
  },
  {
    id: "indrive",
    title: "InDrive MENA",
    category: "Mobility",
    reelLabel: "InDrive",
    accent: "#1E5BFF",
    image: null,
  },
];

export const processFlow = [
  {
    n: "01",
    t: "Decode",
    s: "Start with the brief behind the brief: audience, pressure, timing, and what the team actually needs to decide.",
  },
  {
    n: "02",
    t: "Map",
    s: "Turn ambiguity into a working field: segments, competitors, channels, constraints, and the first real questions.",
  },
  {
    n: "03",
    t: "Research",
    s: "Use market scans, audience logic, interviews, and analytics to separate signal from comfortable assumptions.",
  },
  {
    n: "04",
    t: "Frame",
    s: "Shape the strategic direction: positioning, message, campaign rhythm, and what the work must prove.",
  },
  {
    n: "05",
    t: "Build",
    s: "Translate the strategy into briefs, content systems, dashboards, flows, or lightweight automation.",
  },
  {
    n: "06",
    t: "Learn",
    s: "Close the loop honestly: what moved, what stayed unclear, and what should happen next.",
  },
] as const;

export const methodCards = [
  {
    t: "STP",
    d: "Segmentation, targeting, and positioning used as a decision lens, not a classroom artifact.",
  },
  {
    t: "SWOT / PESTEL",
    d: "A sober read of internal reality and external pressure before the campaign starts speaking.",
  },
  {
    t: "Competitive Scan",
    d: "Benchmarking the field to find the space where a message can be both true and distinct.",
  },
  {
    t: "Campaign Brief",
    d: "One sharp document that links audience tension, message, channel, and execution rhythm.",
  },
  {
    t: "Analytics Loop",
    d: "Dashboards, spreadsheets, and feedback signals kept close enough to change the next move.",
  },
] as const;

/** Frame 02 — three ways I can help (sketch: from scratch → research → design) */
export const helpModes = [
  {
    n: "01",
    t: "From scratch",
    d: "Empty brief → first mark.",
    signal: "Blank field, then structure.",
  },
  {
    n: "02",
    t: "Research & analytics",
    d: "Signal before story.",
    signal: "Grid fills with evidence.",
  },
  {
    n: "03",
    t: "Design & execution",
    d: "Strategy to ship.",
    signal: "Funnel narrows to one brief.",
  },
] as const;

/** Frame 04 — exhibit viewer (evidence before explanation) */
export const briefExhibits = [
  {
    exhibitId: "EXH-01",
    id: "volvo-belgium-campaign",
    title: "Volvo Belgium",
    accent: "#2D5BFF",
    image: "/projects/volvo/volvo-belgium-campaign-board-mockup.png",
    signals: [
      { k: "Problem", v: "Local manufacturing sat in the background — not the positioning." },
      { k: "Move", v: "Reframe factory truth as a Belgian identity advantage." },
      { k: "Outcome", v: "Campaign logic built on STP, SWOT, and competitive scan." },
    ],
  },
  {
    exhibitId: "EXH-02",
    id: "marketing-intelligence",
    title: "Marketing Intelligence",
    accent: "#00B4D8",
    image: "/projects/marketing-intelligence/marketing-intelligence-dashboard-mockup.png",
    signals: [
      { k: "Problem", v: "Research and dashboards rarely change the next decision." },
      { k: "Move", v: "Translate analytics into briefs a team can act on." },
      { k: "Outcome", v: "Operating edge between marketing and measurement." },
    ],
  },
  {
    exhibitId: "EXH-03",
    id: "vantier",
    title: "Vantier",
    accent: "#C9A227",
    image: "/projects/vantier/VantierBT.png",
    signals: [
      { k: "Problem", v: "Brand needed a distinct GTM voice in a crowded field." },
      { k: "Move", v: "Identity system tied to positioning and launch rhythm." },
      { k: "Outcome", v: "Coherent brand kit ready for market entry." },
    ],
  },
  {
    exhibitId: "EXH-04",
    id: "cinematek",
    title: "CINEMATEK",
    accent: "#FF5722",
    image: "/projects/cinematek/cinematek-campaign-board-mockup.png",
    signals: [
      { k: "Problem", v: "Classic cinema programming can feel fragmented to broader audiences." },
      { k: "Move", v: "Decade-by-decade campaign structure with platform-specific messaging." },
      { k: "Outcome", v: "Cultural campaign proposal with repeatable content system." },
    ],
  },
] as const;

/** Frame 06 — recruiter scan matrix (~8 second read) */
export const fitMatrix = {
  columns: ["Research", "Campaign", "Analytics", "Brand"] as const,
  rows: [
    { skill: "Research", marks: [true, false, true, false], evidence: "Martech" },
    { skill: "Campaign", marks: [false, true, false, true], evidence: "Volvo · Cinematek" },
    { skill: "Analytics", marks: [true, false, true, false], evidence: "Dashboards" },
    { skill: "Execution", marks: [false, true, true, true], evidence: "Vantier · Ops" },
  ],
} as const;

export const capabilities = [
  {
    n: "01",
    t: "Research & Insight",
    d: "Market scans, audience logic, and competitor context turned into a point of view a team can use.",
  },
  {
    n: "02",
    t: "Campaign Strategy",
    d: "Positioning, message, channel fit, and rhythm shaped around a real audience tension.",
  },
  {
    n: "03",
    t: "Analytics Translation",
    d: "Raw data, research notes, and dashboards translated into decisions instead of noise.",
  },
  {
    n: "04",
    t: "Marketing Operations",
    d: "The quiet layer: briefs, calendars, automations, and handoffs that keep the work moving.",
  },
  {
    n: "05",
    t: "Content Systems",
    d: "Editorial structures that let a campaign unfold over time without losing its pulse.",
  },
  {
    n: "06",
    t: "Automation Edge",
    d: "A technical background used carefully: less manual drag, cleaner workflows, faster learning loops.",
  },
] as const;

export const serviceFit = [
  {
    n: "01",
    t: "Market Research",
    w: "Internship fit",
    d: "Customer, competitor, and category research shaped into briefs that make the next decision clearer.",
    fit: "Recruiters looking for a research-first marketing intern.",
  },
  {
    n: "02",
    t: "Growth Analytics",
    w: "Internship fit",
    d: "Dashboards, spreadsheets, campaign reads, and funnel questions translated into usable signal.",
    fit: "Teams that need someone comfortable between marketing and measurement.",
  },
  {
    n: "03",
    t: "Campaign Planning",
    w: "Internship fit",
    d: "Audience segmentation, positioning, content rhythm, and channel logic for campaigns with a spine.",
    fit: "Marketing teams that want thinking before assets.",
  },
  {
    n: "04",
    t: "Marketing Operations",
    w: "Internship fit",
    d: "Briefs, calendars, workflows, and lightweight automations that remove friction from execution.",
    fit: "Small or mid-sized teams where the intern is expected to think and ship.",
  },
  {
    n: "05",
    t: "Content & Story",
    w: "Internship fit",
    d: "Editorial copy, tone systems, and narrative mapping built from audience insight, not decoration.",
    fit: "Brands and cultural teams with complex stories to clarify.",
  },
  {
    n: "06",
    t: "Research-to-Execution",
    w: "Hybrid fit",
    d: "The handoff from insight to campaign, landing page, dashboard, or operating rhythm.",
    fit: "B2B, product-led, or founder-led teams that need range without losing focus.",
  },
] as const;

export const caseStudies = [
  {
    n: "02",
    t: "Volvo Belgium — Made in Belgium Campaign Strategy",
    role: "Account Manager · University project · 2025",
    tag: "Brand positioning",
    summary:
      "Reframed Belgian manufacturing from an operational detail into a local brand advantage.",
  },
  {
    n: "03",
    t: "CINEMATEK — Decades of Cinema Campaign",
    role: "Campaign / account strategy support · University project · 2025",
    tag: "Cultural marketing",
    summary:
      "Turned a multi-month programme into a clear digital narrative across audiences, platforms, and time.",
  },
  {
    n: "04",
    t: "Marketing Intelligence",
    role: "Research & analytics direction",
    tag: "Analytics",
    summary:
      "Shows the operating edge: dashboards, research synthesis, and automation-minded marketing logic.",
  },
] as const;

export const featuredCaseStudy = {
  visualLabel: "01 — CINEMATEK · Decades of Cinema",
  mobileVisualLabel: "01 — CINEMATEK",
  eyebrow: "Featured · N°01",
  title:
    "CINEMATEK — a cultural campaign built like a programme people could enter.",
  mobileTitle: "CINEMATEK — cinema history made legible.",
  metaRows: [
    ["Role", "Campaign / account strategy support · University project"],
    [
      "Problem",
      "Classic cinema programming can feel fragmented, niche, or overly academic to broader audiences.",
    ],
    [
      "Approach",
      "Built a decade-by-decade campaign structure with audience logic, content rhythm, tone of voice, and platform-specific messaging.",
    ],
    [
      "Outcome",
      "A complete cultural campaign proposal with clear targeting, editorial direction, platform adaptation, and a repeatable content system.",
    ],
  ],
} as const;

export const contactClose = {
  eyebrow: "Close",
  heading: ["The signal is", "already in the", "conversation."],
  mobileHeading: "The signal is already in the conversation.",
  mobileHeadingLead: "The signal is already in",
  mobileHeadingAccent: "the conversation.",
  lede:
    "Available for a Summer 2026 marketing, research, growth, or analytics internship in Belgium or Europe. Brussels-based. Built for teams that need someone who can read the market, structure the work, and keep the loop moving.",
  mobileLede:
    "Available for a Summer 2026 marketing, research, growth, or analytics internship. Brussels-based; open across Belgium and Europe.",
  footerMark: "Ahmed Mohsen Mostafa · MMXXVI",
  footerLocation: "Brussels · Belgium / Europe",
  footerNote: "Recruiter-first portfolio",
} as const;

/** Intro gate copy — landing page sketch */
export const introGate = {
  philosophy: "Don't tell, show — let experience speak.",
  wowMoment: "Animated to guide ≠ to distract.",
  quickScan: "Quick scan version",
  glowMoment: "Glow moment — click to advance",
  scrambleTransition: "Scrambling animation to next page",
};
