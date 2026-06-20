import type { ReactNode } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "../../../../lib/gsapClient";

export type MethodDrawSlot = {
  from: number;
  to: number;
};

type BindMethodDrawOptions = {
  drawSlot?: MethodDrawSlot;
  labelSlot?: MethodDrawSlot;
  reducedMotion?: boolean;
};

function prepStroke(el: SVGGeometryElement) {
  const length = el.getTotalLength();
  gsap.set(el, {
    strokeDasharray: length,
    strokeDashoffset: length,
    opacity: 1,
  });
}

/** Attach stroke-draw tweens to an existing scrubbed timeline (0–1 positions). */
export function bindMethodDraw(
  timeline: gsap.core.Timeline,
  svg: SVGSVGElement,
  { drawSlot = { from: 0.12, to: 0.78 }, labelSlot = { from: 0.68, to: 0.92 }, reducedMotion = false }: BindMethodDrawOptions = {}
) {
  const paths = gsap.utils.toArray<SVGGeometryElement>("[data-method-draw]", svg);
  const labels = gsap.utils.toArray<SVGTextElement>("[data-method-label]", svg);

  if (reducedMotion) {
    paths.forEach((path) => gsap.set(path, { strokeDashoffset: 0, opacity: 1 }));
    gsap.set(labels, { opacity: 1 });
    return;
  }

  paths.forEach(prepStroke);
  gsap.set(labels, { opacity: 0 });

  const drawSpan = drawSlot.to - drawSlot.from;
  const perPath = drawSpan / Math.max(paths.length, 1);

  paths.forEach((path, i) => {
    const start = drawSlot.from + i * perPath;
    timeline.to(
      path,
      { strokeDashoffset: 0, ease: "none", duration: perPath },
      start
    );
  });

  timeline.to(
    labels,
    { opacity: 1, stagger: 0.04, ease: "none", duration: labelSlot.to - labelSlot.from },
    labelSlot.from
  );
}

type MethodShapeProps = {
  children: ReactNode;
  className?: string;
  /** Shared pinned/scrubbed timeline from parent hero */
  timeline: gsap.core.Timeline | null;
  reducedMotion?: boolean;
  drawSlot?: MethodDrawSlot;
  labelSlot?: MethodDrawSlot;
};

/**
 * Reusable scroll-scrub SVG draw wrapper.
 * Parent owns ScrollTrigger + pin; MethodShape binds draw tweens to that timeline.
 */
export function MethodShape({
  children,
  className,
  timeline,
  reducedMotion = false,
  drawSlot,
  labelSlot,
}: MethodShapeProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const svg = svgRef.current;
      if (!svg) return;

      if (!timeline || reducedMotion) {
        bindMethodDraw(gsap.timeline(), svg, {
          reducedMotion: true,
          drawSlot,
          labelSlot,
        });
        return;
      }

      bindMethodDraw(timeline, svg, { drawSlot, labelSlot, reducedMotion });
    },
    { scope: svgRef, dependencies: [timeline, reducedMotion], revertOnUpdate: true }
  );

  return (
    <svg ref={svgRef} className={className} viewBox="0 0 420 340" fill="none" aria-hidden>
      {children}
    </svg>
  );
}
