export const projectsData = [
  {
    title: "Cinematek — Decades of Cinema",
    category: "Brand Identity",
    description:
      "Centenary campaign for the Royal Belgian Film Archive. A multi-format visual identity spanning posters, outdoor, print, and digital.",
    imageSrc: "/cinematek/cinematek-campaign.png",
    color: "#4F6EF7",
    reelLabel: "Cinematek",
  },
  {
    title: "MOSOL — Horeca Intelligence",
    category: "UX/UI Design",
    description:
      "Data-driven SaaS dashboard helping Belgian restaurants optimize menu profitability, margins, and demand patterns.",
    imageSrc: "/Mosol/mosol-dashboard.png",
    color: "#4F6EF7",
    reelLabel: "MOSOL",
  },
  {
    title: "Volvo Belgium — Campaign Strategy",
    category: "Strategy & Creative",
    description:
      "End-to-end campaign strategy for Volvo Belgium. From audience insights to multi-channel creative execution across digital and OOH.",
    imageSrc: "/volvo/volvo-belgium-campaign-board-mockup.png",
    color: "#4F6EF7",
    reelLabel: "Volvo",
  },
  {
    title: "MOSOL — Execution Sprint",
    category: "Go-to-Market",
    description:
      "A five-week sprint from brand positioning to beta launch, including personas, prototyping, validation, and planning.",
    imageSrc: "/Mosol/exec-sprint.png",
    color: "#4F6EF7",
    reelLabel: "Sprint",
  },
  {
    title: "Tackle — Sales Analytics",
    category: "UX/UI Design",
    description:
      "A performance dashboard for sales teams. Real-time KPIs, pipeline analytics, and territory management in one unified interface.",
    imageSrc: "/Tackle/tackle-dashboard.png",
    color: "#4F6EF7",
    reelLabel: "Tackle",
  },
  {
    title: "Cinematek — 70s Edition",
    category: "Editorial Design",
    description:
      "Retro-inspired poster series for the Decades of Cinema campaign. Bold editorial typography meets halftone imagery.",
    imageSrc: "/cinematek/cinematek-70s.png",
    color: "#4F6EF7",
    reelLabel: "70s Edit",
  },
];

/** Six curtain slats — cycles project art for the hero reel */
export function getCurtainPanels() {
  const base = projectsData.map((p) => ({
    imageSrc: p.imageSrc,
    label: p.reelLabel,
    category: p.category,
    accent: p.color,
  }));
  return [...base, base[0], base[1]];
}
