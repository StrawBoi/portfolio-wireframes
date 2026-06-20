import { forwardRef } from "react";

const stroke = "rgba(240, 237, 228, 0.85)";
const faint = "rgba(240, 237, 228, 0.25)";
const hot = "#FF4103";

export const DecisionDiagram = forwardRef<SVGSVGElement>(function DecisionDiagram(_props, ref) {
  return (
    <svg ref={ref} className="h-auto w-full max-w-[420px] md:ml-auto" viewBox="0 0 420 340" fill="none" aria-hidden>
      <rect data-method-draw x="24" y="24" width="180" height="140" stroke={faint} strokeWidth="1" />
      {[1, 2, 3].map((i) => (
        <line key={`vg${i}`} data-method-draw x1={24 + i * 45} y1="24" x2={24 + i * 45} y2="164" stroke={faint} strokeWidth="0.75" />
      ))}
      {[1, 2, 3].map((i) => (
        <line key={`hg${i}`} data-method-draw x1="24" y1={24 + i * 35} x2="204" y2={24 + i * 35} stroke={faint} strokeWidth="0.75" />
      ))}

      <circle data-method-draw cx="320" cy="88" r="36" stroke={stroke} strokeWidth="1.2" />
      <line data-method-draw x1="320" y1="56" x2="320" y2="120" stroke={stroke} strokeWidth="1" />
      <line data-method-draw x1="284" y1="88" x2="356" y2="88" stroke={stroke} strokeWidth="1" />

      <line data-method-draw x1="48" y1="260" x2="200" y2="260" stroke={faint} strokeWidth="1" />
      <line data-method-draw x1="48" y1="260" x2="48" y2="190" stroke={faint} strokeWidth="1" />
      <line data-method-draw x1="52" y1="255" x2="188" y2="205" stroke={hot} strokeWidth="2" />

      <text data-method-label x="52" y="278" fill={faint} fontSize="9" fontFamily="var(--pf-font-mono)" letterSpacing="0.12em">
        ROI
      </text>
      <text data-method-label x="28" y="228" fill={faint} fontSize="9" fontFamily="var(--pf-font-mono)" letterSpacing="0.08em">
        Quality
      </text>
      <text data-method-label x="300" y="142" fill={stroke} fontSize="10" fontFamily="var(--pf-font-mono)" letterSpacing="0.14em">
        SWOT
      </text>
      <text data-method-label x="24" y="182" fill={faint} fontSize="9" fontFamily="var(--pf-font-mono)" letterSpacing="0.1em">
        COMPETITIVE SCAN
      </text>
    </svg>
  );
});
