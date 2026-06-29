import { featuredCampaignExhibits, type ExhibitSignal, type ExhibitTone } from "./featuredExhibits";

export type DossierFile = {
  id: string;
  code: string;
  title: string;
  role: string;
  context: string;
  achievement: string;
  depthLead: string;
  signals: readonly ExhibitSignal[];
  deliverables: readonly string[];
  fileNote: string;
  boardImage: string;
  tone: ExhibitTone;
};

export const PROOF_CURATOR_LINE =
  "Full boards — problem, move, outcome. Depth for recruiters who stay past the scan.";

export const PROOF_SUB_RAIL = "Three dossier files · expanded evidence";

const depthById: Record<
  string,
  Pick<DossierFile, "depthLead" | "deliverables" | "fileNote" | "boardImage">
> = {
  "volvo-belgium-campaign": {
    depthLead:
      "National positioning built from factory intelligence — not borrowed global creative.",
    deliverables: [
      "STP segmentation & competitive scan",
      "SWOT-led campaign architecture",
      "Channel-ready messaging framework",
    ],
    fileNote: "Academic campaign case · Odisee BBA · automotive vertical.",
    boardImage: "/projects/volvo/volvo-poster.png",
  },
  "le-lievrier": {
    depthLead:
      "A tactile brand world for luxury F&B — restraint as the differentiator.",
    deliverables: [
      "Brand world & visual identity system",
      "Packaging and touchpoint direction",
      "Positioning narrative for hospitality launch",
    ],
    fileNote: "Luxury F&B identity · sculptural editorial tone · academic brief.",
    boardImage: "/projects/le-lievrier/le-lievrier-poster.png",
  },
  cinematek: {
    depthLead:
      "A century of cinema structured as exhibition design — decades as chapters.",
    deliverables: [
      "Decade-by-decade programming architecture",
      "Platform-specific messaging system",
      "Cultural campaign proposal & content rhythm",
    ],
    fileNote: "Institution-scale cultural campaign · archival intelligence as design.",
    boardImage: "/projects/cinematek/cinematek-poster.png",
  },
};

export const proofDossierFiles: DossierFile[] = featuredCampaignExhibits.map((exhibit) => {
  const depth = depthById[exhibit.id];
  return {
    id: exhibit.id,
    code: exhibit.code,
    title: exhibit.title,
    role: exhibit.role,
    context: exhibit.context,
    achievement: exhibit.achievement,
    depthLead: depth.depthLead,
    signals: exhibit.signals,
    deliverables: depth.deliverables,
    fileNote: depth.fileNote,
    boardImage: depth.boardImage,
    tone: exhibit.tone,
  };
});
