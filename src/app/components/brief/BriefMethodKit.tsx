import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap, { ScrollTrigger } from "../../../lib/gsapClient";
import { bindMethodDraw } from "../hero/toolkit/MethodShape";
import { Mono } from "../wireframe/Primitives";

const SHAPES = [
  { id: "roi", label: "01 / ROI", caption: "Quality as a driver to ROI" },
  { id: "grid", label: "02 / Scan", caption: "Competition analysis" },
  { id: "swot", label: "03 / SWOT", caption: "Internal vs external read" },
  { id: "funnel", label: "04 / Funnel", caption: "Research → briefs & strategy" },
] as const;

const DRAW_SLOTS = [
  { from: 0.02, to: 0.22, labelFrom: 0.18, labelTo: 0.24 },
  { from: 0.26, to: 0.46, labelFrom: 0.42, labelTo: 0.48 },
  { from: 0.5, to: 0.7, labelFrom: 0.66, labelTo: 0.72 },
  { from: 0.74, to: 0.94, labelFrom: 0.9, labelTo: 0.98 },
];

function RoiShape() {
  return (
    <>
      <path data-method-draw d="M 48 248 L 48 52" stroke="var(--pf-ink)" strokeWidth="1.5" />
      <path data-method-draw d="M 48 248 L 352 248" stroke="var(--pf-ink)" strokeWidth="1.5" />
      <path data-method-draw d="M 64 228 L 320 68" stroke="var(--pf-hot)" strokeWidth="1.75" strokeLinecap="round" />
      <circle data-method-draw cx="320" cy="68" r="4" stroke="var(--pf-hot)" strokeWidth="1.5" fill="none" />
      <text data-method-label x="24" y="152" fill="var(--pf-ink-2)" fontFamily="var(--pf-font-mono)" fontSize="9" letterSpacing="0.12em" transform="rotate(-90 24 152)" opacity="0">
        QUALITY
      </text>
      <text data-method-label x="200" y="272" fill="var(--pf-ink-2)" fontFamily="var(--pf-font-mono)" fontSize="9" letterSpacing="0.12em" textAnchor="middle" opacity="0">
        ROI
      </text>
    </>
  );
}

function GridShape() {
  const cells = [
    [1, 0, 1],
    [0, 1, 0],
    [1, 1, 0],
  ];
  return (
    <>
      <rect data-method-draw x="56" y="56" width="288" height="192" stroke="var(--pf-ink)" strokeWidth="1.2" fill="none" />
      {[1, 2].map((i) => (
        <line key={`v${i}`} data-method-draw x1={56 + i * 96} y1="56" x2={56 + i * 96} y2="248" stroke="var(--pf-rule-strong)" strokeWidth="0.75" />
      ))}
      {[1, 2].map((i) => (
        <line key={`h${i}`} data-method-draw x1="56" y1={56 + i * 64} x2="344" y2={56 + i * 64} stroke="var(--pf-rule-strong)" strokeWidth="0.75" />
      ))}
      {cells.flatMap((row, ri) =>
        row.map((on, ci) =>
          on ? (
            <path
              key={`${ri}-${ci}`}
              data-method-draw
              d={`M ${88 + ci * 96} ${92 + ri * 64} L ${96 + ci * 96} ${100 + ri * 64} L ${112 + ci * 96} ${84 + ri * 64}`}
              stroke="var(--pf-hot)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          ) : (
            <path
              key={`${ri}-${ci}`}
              data-method-draw
              d={`M ${88 + ci * 96} ${88 + ri * 64} L ${112 + ci * 96} ${112 + ri * 64} M ${112 + ci * 96} ${88 + ri * 64} L ${88 + ci * 96} ${112 + ri * 64}`}
              stroke="var(--pf-ink-2)"
              strokeWidth="1"
              opacity="0.5"
            />
          )
        )
      )}
      <text data-method-label x="200" y="36" fill="var(--pf-ink-2)" fontFamily="var(--pf-font-mono)" fontSize="9" letterSpacing="0.1em" textAnchor="middle" opacity="0">
        COMPETITOR GRID
      </text>
    </>
  );
}

function SwotShape() {
  return (
    <>
      <circle data-method-draw cx="200" cy="152" r="72" stroke="var(--pf-ink)" strokeWidth="1.2" fill="none" />
      <line data-method-draw x1="200" y1="84" x2="200" y2="220" stroke="var(--pf-ink)" strokeWidth="1" />
      <line data-method-draw x1="132" y1="152" x2="268" y2="152" stroke="var(--pf-ink)" strokeWidth="1" />
      {[
        [168, 118],
        [232, 118],
        [168, 186],
        [232, 186],
      ].map(([cx, cy], i) => (
        <circle key={i} data-method-draw cx={cx} cy={cy} r="3" fill="var(--pf-hot)" />
      ))}
      <text data-method-label x="200" y="248" fill="var(--pf-ink-2)" fontFamily="var(--pf-font-mono)" fontSize="9" letterSpacing="0.14em" textAnchor="middle" opacity="0">
        SWOT
      </text>
    </>
  );
}

function FunnelShape() {
  return (
    <>
      <path data-method-draw d="M 88 56 L 312 56 L 272 248 L 128 248 Z" stroke="var(--pf-ink)" strokeWidth="1.2" fill="none" />
      <line data-method-draw x1="128" y1="248" x2="272" y2="248" stroke="var(--pf-ink)" strokeWidth="1.2" />
      <rect data-method-draw x="156" y="268" width="88" height="48" stroke="var(--pf-hot)" strokeWidth="1.2" fill="none" />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} data-method-draw x1="168" y1={280 + i * 10} x2="232" y2={280 + i * 10} stroke="var(--pf-ink-2)" strokeWidth="0.75" opacity="0.6" />
      ))}
      <text data-method-label x="200" y="36" fill="var(--pf-ink-2)" fontFamily="var(--pf-font-mono)" fontSize="9" letterSpacing="0.1em" textAnchor="middle" opacity="0">
        FUNNELING
      </text>
      <text data-method-label x="200" y="340" fill="var(--pf-ink-2)" fontFamily="var(--pf-font-mono)" fontSize="8" letterSpacing="0.08em" textAnchor="middle" opacity="0">
        BRIEFS & STRATEGY
      </text>
    </>
  );
}

const SHAPE_CONTENT = {
  roi: RoiShape,
  grid: GridShape,
  swot: SwotShape,
  funnel: FunnelShape,
} as const;

function MethodShapeCell({
  shapeId,
  label,
  caption,
  svgRef,
}: {
  shapeId: keyof typeof SHAPE_CONTENT;
  label: string;
  caption: string;
  svgRef: (el: SVGSVGElement | null) => void;
}) {
  const Shape = SHAPE_CONTENT[shapeId];
  return (
    <div
      className="flex flex-col gap-3"
      style={{
        padding: "20px 16px",
        border: "1px solid var(--pf-rule)",
        background: "var(--pf-paper)",
        minHeight: 280,
      }}
    >
      <Mono>{label}</Mono>
      <svg ref={svgRef} viewBox="0 0 400 360" fill="none" className="w-full flex-1" style={{ color: "var(--pf-ink)" }} aria-hidden>
        <Shape />
      </svg>
      <span className="pf-small" style={{ fontSize: 11, color: "var(--pf-ink-2)" }}>
        {caption}
      </span>
    </div>
  );
}

/** Scroll-pinned method shapes from Ahmed's sketch — frame 03 signature. */
export function BriefMethodKit() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const svgRefs = useRef<(SVGSVGElement | null)[]>([]);
  const captionRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      const caption = captionRef.current;
      if (!section || !pin) return;

      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const svgs = svgRefs.current.filter(Boolean) as SVGSVGElement[];
      if (svgs.length !== SHAPES.length) return;

      const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });

      svgs.forEach((svg, i) => {
        const slot = DRAW_SLOTS[i];
        bindMethodDraw(tl, svg, {
          reducedMotion: reduced,
          drawSlot: { from: slot.from, to: slot.to },
          labelSlot: { from: slot.labelFrom, to: slot.labelTo },
        });
      });

      if (caption && !reduced) {
        gsap.set(caption, { opacity: 0.4 });
        tl.to(caption, { opacity: 1, duration: 0.08 }, 0.02);
      }

      if (reduced) {
        gsap.set(caption, { opacity: 1 });
        return;
      }

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top 12%",
        end: "+=240%",
        pin: pin,
        scrub: 0.55,
        animation: tl,
        invalidateOnRefresh: true,
      });

      return () => {
        st.kill();
        tl.kill();
      };
    },
    { scope: sectionRef, revertOnUpdate: true }
  );

  return (
    <div ref={sectionRef} className="relative">
      <div ref={pinRef}>
        <div className="flex items-end justify-between" style={{ marginBottom: 20 }}>
          <Mono>Method kit · point reveal with scroll</Mono>
          <Mono>04 of 04</Mono>
        </div>
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
        >
          {SHAPES.map((s, i) => (
            <MethodShapeCell
              key={s.id}
              shapeId={s.id}
              label={s.label}
              caption={s.caption}
              svgRef={(el) => {
                svgRefs.current[i] = el;
              }}
            />
          ))}
        </div>
        <p ref={captionRef} className="pf-body" style={{ marginTop: 20, fontSize: 13, maxWidth: 520 }}>
          Shapes recruiters recognize — drawn as you scroll, before the copy asks for attention.
        </p>
      </div>
    </div>
  );
}
