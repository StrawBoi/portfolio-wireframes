import { Artboard, FrameGrid } from "../Artboard";
import { Eyebrow, Mono } from "../wireframe/Primitives";
import { motion } from "motion/react";
import { useMotionMode } from "../../motion/MotionMode";
import { SequenceReveal } from "../../motion/SequenceReveal";
import { helpModes } from "@portfolio/shared/content";

function HelpVisual({ type }: { type: "blank" | "grid" | "funnel" }) {
  const { skipEntry, d, easeOut } = useMotionMode();
  const motionProps = skipEntry
    ? {}
    : {
        initial: { opacity: 0, scale: 0.96 as const },
        whileInView: { opacity: 1, scale: 1 as const },
        viewport: { once: true, margin: "-10%" as const },
        transition: { duration: d(0.55, 0.22), ease: easeOut },
      };

  if (type === "blank") {
    return (
      <motion.div style={{ height: 140 }} {...motionProps}>
        <svg viewBox="0 0 280 140" className="h-full w-full" fill="none" aria-hidden>
          <rect x="24" y="24" width="232" height="92" stroke="var(--pf-rule-strong)" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="48" y1="72" x2="120" y2="72" stroke="var(--pf-hot)" strokeWidth="1.5" />
        </svg>
      </motion.div>
    );
  }

  if (type === "grid") {
    return (
      <motion.div style={{ height: 140 }} {...motionProps}>
        <svg viewBox="0 0 280 140" className="h-full w-full" fill="none" aria-hidden>
          <rect x="40" y="20" width="200" height="100" stroke="var(--pf-ink)" strokeWidth="1" />
          {[1, 2].map((i) => (
            <line key={`v${i}`} x1={40 + i * 66} y1="20" x2={40 + i * 66} y2="120" stroke="var(--pf-rule-strong)" strokeWidth="0.75" />
          ))}
          <path d="M 72 52 L 80 60 L 96 44" stroke="var(--pf-hot)" strokeWidth="1.5" />
          <path d="M 138 84 L 146 92 L 162 76" stroke="var(--pf-hot)" strokeWidth="1.5" />
        </svg>
      </motion.div>
    );
  }

  return (
    <motion.div style={{ height: 140 }} {...motionProps}>
      <svg viewBox="0 0 280 140" className="h-full w-full" fill="none" aria-hidden>
        <path d="M 60 24 L 220 24 L 196 108 L 84 108 Z" stroke="var(--pf-ink)" strokeWidth="1.2" />
        <rect x="108" y="116" width="64" height="16" stroke="var(--pf-hot)" strokeWidth="1.2" />
      </svg>
    </motion.div>
  );
}

const VISUALS = ["blank", "grid", "funnel"] as const;

function HelpModeTile({
  n, t, d, signal, visual, index,
}: (typeof helpModes)[number] & { visual: (typeof VISUALS)[number]; index: number }) {
  const { skipEntry, d: dur, easeOut } = useMotionMode();
  return (
    <motion.article
      className="flex flex-col"
      style={{
        padding: "28px 24px",
        gap: 20,
        minHeight: 320,
        border: "1px solid var(--pf-rule)",
        background: "var(--pf-paper)",
      }}
      initial={skipEntry ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: dur(0.5, 0.2), delay: skipEntry ? 0 : index * 0.08, ease: easeOut }}
      whileHover={{ y: -4 }}
    >
      <div className="flex items-center justify-between">
        <span className="pf-num">N°{n}</span>
        <Mono>Help mode</Mono>
      </div>
      <HelpVisual type={visual} />
      <h3 className="pf-h3" style={{ fontSize: 28 }}>{t}</h3>
      <p className="pf-body" style={{ fontSize: 14 }}>{d}</p>
      <div style={{ height: 1, background: "var(--pf-rule)" }} />
      <Mono>{signal}</Mono>
    </motion.article>
  );
}

export function Desktop({ showGrid, fluid }: { showGrid: boolean; fluid?: boolean }) {
  return (
    <Artboard name="02_Capabilities" viewport="desktop" height={720} showGrid={showGrid} fluid={fluid}>
      <div style={{ paddingTop: 96, paddingBottom: 96 }}>
        <FrameGrid viewport="desktop" style={{ rowGap: 56 }}>
          <SequenceReveal style={{ gridColumn: "span 5 / span 5" }} className="flex flex-col gap-6">
            <Eyebrow>Fit Brief · 02</Eyebrow>
            <h2 className="pf-h2">
              Ways I can <span className="pf-display-italic">help.</span>
            </h2>
          </SequenceReveal>
          <div style={{ gridColumn: "span 6 / span 6", gridColumnStart: 7 }} className="flex items-end">
            <p className="pf-lede">
              How can I be a good fit? Three modes — from empty brief to research to ship.
              Shapes first; labels second.
            </p>
          </div>
          {helpModes.map((m, i) => (
            <div key={m.n} style={{ gridColumn: "span 4 / span 4" }}>
              <HelpModeTile {...m} visual={VISUALS[i]} index={i} />
            </div>
          ))}
        </FrameGrid>
      </div>
    </Artboard>
  );
}

export function Mobile({ showGrid, fluid }: { showGrid: boolean; fluid?: boolean }) {
  return (
    <Artboard name="02_Capabilities" viewport="mobile" height={1100} showGrid={showGrid} fluid={fluid}>
      <div className="flex flex-col gap-6" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <Eyebrow>Fit Brief · 02</Eyebrow>
        <h2 className="pf-h2" style={{ fontSize: 36 }}>Ways I can <span className="pf-display-italic">help.</span></h2>
        <div className="flex flex-col gap-4" style={{ marginTop: 12 }}>
          {helpModes.map((m, i) => (
            <HelpModeTile key={m.n} {...m} visual={VISUALS[i]} index={i} />
          ))}
        </div>
      </div>
    </Artboard>
  );
}
