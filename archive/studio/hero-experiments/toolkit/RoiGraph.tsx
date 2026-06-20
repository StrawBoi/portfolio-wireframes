import gsap from "../../../../lib/gsapClient";
import { MethodShape } from "./MethodShape";

type RoiGraphProps = {
  timeline: gsap.core.Timeline | null;
  reducedMotion?: boolean;
};

/** ROI diagram — Quality (Y) vs ROI (X), upward diagonal on Noturno stage. */
export function RoiGraph({ timeline, reducedMotion }: RoiGraphProps) {
  return (
    <MethodShape
      timeline={timeline}
      reducedMotion={reducedMotion}
      className="roi-graph h-full w-full max-w-[min(420px,92vw)]"
    >
      <path
        data-method-draw="1"
        d="M 72 268 L 72 48"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        data-method-draw="2"
        d="M 72 268 L 368 268"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        data-method-draw="3"
        d="M 67 88 L 77 88 M 67 148 L 77 148 M 67 208 L 77 208"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.45"
      />
      <path
        data-method-draw="4"
        d="M 132 273 L 132 263 M 212 273 L 212 263 M 292 273 L 292 263"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.45"
      />
      <path
        data-method-draw="5"
        d="M 88 248 L 340 72"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        data-method-draw="6"
        d="M 328 84 L 340 72 L 328 60"
        stroke="var(--pf-hot)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        data-method-draw="7"
        cx="340"
        cy="72"
        r="4"
        stroke="var(--pf-hot)"
        strokeWidth="1.5"
        fill="none"
      />
      <text
        data-method-label="1"
        x="36"
        y="168"
        fill="currentColor"
        fontFamily="var(--pf-font-mono)"
        fontSize="11"
        letterSpacing="0.14em"
        transform="rotate(-90 36 168)"
        opacity="0"
      >
        QUALITY
      </text>
      <text
        data-method-label="2"
        x="220"
        y="296"
        fill="currentColor"
        fontFamily="var(--pf-font-mono)"
        fontSize="11"
        letterSpacing="0.14em"
        textAnchor="middle"
        opacity="0"
      >
        ROI
      </text>
      <text
        data-method-label="3"
        x="220"
        y="32"
        fill="var(--pf-ink-2)"
        fontFamily="var(--pf-font-mono)"
        fontSize="9"
        letterSpacing="0.1em"
        textAnchor="middle"
        opacity="0"
      >
        QUALITY AS A DRIVER TO ROI
      </text>
    </MethodShape>
  );
}
