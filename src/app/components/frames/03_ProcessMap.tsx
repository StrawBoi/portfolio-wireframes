import { Artboard, FrameGrid } from "../Artboard";
import { Eyebrow, Mono } from "../wireframe/Primitives";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useMotionMode } from "../../motion/MotionMode";
import { methodCards, processFlow } from "@portfolio/shared/content";
import { BriefMethodKit } from "../brief/BriefMethodKit";
import { SequenceReveal, LineReveal } from "../../motion/SequenceReveal";

function Node({ n, t, s }: { n: string; t: string; s: string }) {
  return (
    <div className="pf-node" style={{ minWidth: 184 }}>
      <span className="pf-node-num">N°{n}</span>
      <span className="pf-node-title">{t}</span>
      <span className="pf-small" style={{ fontSize: 12 }}>{s}</span>
    </div>
  );
}

export function Desktop({ showGrid, fluid }: { showGrid: boolean; fluid?: boolean }) {
  return (
    <Artboard name="03_Process_Map" viewport="desktop" height={1480} showGrid={showGrid} fluid={fluid}>
      <div className="flex flex-col gap-16" style={{ paddingTop: 96, paddingBottom: 96 }}>
        <FrameGrid viewport="desktop">
          <SequenceReveal style={{ gridColumn: "span 6 / span 6" }} className="flex flex-col gap-6">
            <Eyebrow>Fit Brief · 03</Eyebrow>
            <h2 className="pf-h2">
              <LineReveal>How the work</LineReveal>
              <LineReveal delay={0.08}>
                <span className="pf-display-italic">actually gets done.</span>
              </LineReveal>
            </h2>
          </SequenceReveal>
          <div style={{ gridColumn: "span 5 / span 5", gridColumnStart: 8 }} className="flex items-end">
            <p className="pf-lede">
              Six stages plus the method shapes from the sketch — SWOT, competitor grid,
              ROI, funnel. Drawn on scroll, not explained upfront.
            </p>
          </div>
        </FrameGrid>

        <ProcessFlow />

        <BriefMethodKit />

        <MethodsRow />

      </div>
    </Artboard>
  );
}

/** Scroll-scrubbed: as the user scrolls past the section, the strategist draws the diagram. */
function ProcessFlow() {
  const { skipEntry } = useMotionMode();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 30%"],
  });
  // 6 nodes + 5 connectors = 11 slots, each one occupies a window of scroll progress.
  const total = processFlow.length + (processFlow.length - 1);
  const slot = 1 / total;
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div className="flex items-stretch" style={{ gap: 0 }}>
        {processFlow.map((s, i) => {
          const start = i * 2 * slot;
          const end = start + slot;
          return (
            <div key={s.n} className="flex items-center" style={{ flex: i === processFlow.length - 1 ? "0 0 auto" : "1 1 0" }}>
              <ScrubNode progress={scrollYProgress} from={start} to={end} skip={skipEntry}>
                <Node {...s} />
              </ScrubNode>
              {i < processFlow.length - 1 && (
                <ScrubConnector progress={scrollYProgress} from={end} to={end + slot} skip={skipEntry} />
              )}
            </div>
          );
        })}
      </div>
      <motion.div
        className="flex items-center gap-3"
        style={{ marginTop: 16 }}
        initial={{ opacity: skipEntry ? 1 : 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.4 }}
      >
        <div style={{ width: 8, height: 8, background: "var(--pf-hot)" }} />
        <Mono>Insight matters when it changes the next move</Mono>
      </motion.div>
    </div>
  );
}

function ScrubNode({
  progress, from, to, skip, children,
}: { progress: any; from: number; to: number; skip: boolean; children: React.ReactNode }) {
  const opacity = useTransform(progress, [from, to], skip ? [1, 1] : [0, 1]);
  const y = useTransform(progress, [from, to], skip ? [0, 0] : [10, 0]);
  return <motion.div style={{ opacity, y }}>{children}</motion.div>;
}

function ScrubConnector({
  progress, from, to, skip,
}: { progress: any; from: number; to: number; skip: boolean }) {
  const scaleX = useTransform(progress, [from, to], skip ? [1, 1] : [0, 1]);
  return (
    <motion.div
      className="pf-connector"
      style={{ scaleX, transformOrigin: "left center" }}
    />
  );
}

function MethodsRow() {
  const { skipEntry, d, easeOut } = useMotionMode();
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-end justify-between">
        <Mono>Method cards · what plugs in at each step</Mono>
        <Mono>05 of 05</Mono>
      </div>
      <FrameGrid viewport="desktop">
        {methodCards.map((m, i) => (
          <motion.div
            key={m.t}
            style={{ gridColumn: "span 2 / span 2", gridColumnStart: 1 + i * 2 + (i >= 3 ? 1 : 0) }}
            initial={skipEntry ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: d(0.45, 0.18), delay: skipEntry ? 0 : i * 0.04, ease: easeOut }}
            whileHover={{ y: -4 }}
          >
            <div
              style={{
                padding: "18px 16px",
                borderTop: "1px solid var(--pf-ink)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <Mono>0{i + 1} / 05</Mono>
              <span style={{ fontFamily: "var(--pf-font-display)", fontSize: 22, color: "var(--pf-ink)" }}>
                {m.t}
              </span>
              <span className="pf-body" style={{ fontSize: 13 }}>{m.d}</span>
            </div>
          </motion.div>
        ))}
      </FrameGrid>
    </div>
  );
}

export function Mobile({ showGrid, fluid }: { showGrid: boolean; fluid?: boolean }) {
  return (
    <Artboard name="03_Process_Map" viewport="mobile" height={2200} showGrid={showGrid} fluid={fluid}>
      <div className="flex flex-col gap-8" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <Eyebrow>Process · Signature</Eyebrow>
        <h2 className="pf-h2" style={{ fontSize: 36 }}>How the work <span className="pf-display-italic">actually gets done.</span></h2>
        <div className="flex flex-col" style={{ gap: 0 }}>
          {processFlow.map((s, i) => (
            <div key={s.n} className="flex flex-col items-stretch">
              <Node {...s} />
              {i < processFlow.length - 1 && (
                <div style={{ width: 1, height: 24, background: "var(--pf-rule-strong)", marginLeft: 22 }} />
              )}
            </div>
          ))}
        </div>
        <Mono>Methods</Mono>
        <div className="flex flex-col gap-3">
          {methodCards.map((m, i) => (
            <div key={m.t} style={{ borderTop: "1px solid var(--pf-ink)", paddingTop: 12 }}>
              <Mono>0{i + 1} / 05</Mono>
              <div style={{ fontFamily: "var(--pf-font-display)", fontSize: 20 }}>{m.t}</div>
              <span className="pf-body" style={{ fontSize: 13 }}>{m.d}</span>
            </div>
          ))}
        </div>
      </div>
    </Artboard>
  );
}
