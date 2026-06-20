import { Artboard, FrameGrid } from "../Artboard";
import { Eyebrow, Mono } from "../wireframe/Primitives";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useMotionMode } from "../../motion/MotionMode";
import { briefExhibits } from "@portfolio/shared/content";

function ExhibitImage({ src, accent, alt }: { src: string; accent: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover"
      onError={(e) => {
        e.currentTarget.style.display = "none";
        e.currentTarget.parentElement!.style.background = `linear-gradient(145deg, ${accent}44 0%, var(--pf-paper-2) 60%)`;
      }}
    />
  );
}

function SignalRow({ label, value, index }: { label: string; value: string; index: number }) {
  const { d, easeOut, skipEntry } = useMotionMode();
  return (
    <motion.div
      className="flex flex-col gap-1"
      style={{ borderTop: "1px solid var(--pf-rule)", paddingTop: 12 }}
      initial={skipEntry ? false : { opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: d(0.45, 0.18), delay: skipEntry ? 0 : index * 0.06, ease: easeOut }}
    >
      <Mono>{label}</Mono>
      <span className="pf-body" style={{ fontSize: 14, color: "var(--pf-ink)" }}>{value}</span>
    </motion.div>
  );
}

function ExhibitViewer() {
  const [active, setActive] = useState(0);
  const exhibit = briefExhibits[active];
  const { d, easeOut, skipEntry } = useMotionMode();

  return (
    <div className="flex flex-col gap-8">
      <FrameGrid viewport="desktop" style={{ rowGap: 32 }}>
        <motion.div
          style={{ gridColumn: "span 8 / span 8" }}
          className="relative overflow-hidden"
          layout
          transition={{ duration: d(0.4, 0.16), ease: easeOut }}
        >
          <div style={{ height: 480, border: "1px solid var(--pf-rule)", background: "var(--pf-paper-2)" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={exhibit.id}
                className="h-full w-full"
                initial={skipEntry ? false : { opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: d(0.35, 0.14), ease: easeOut }}
              >
                {exhibit.image ? (
                  <ExhibitImage src={exhibit.image} accent={exhibit.accent} alt="" />
                ) : (
                  <div className="h-full w-full" style={{ background: `linear-gradient(145deg, ${exhibit.accent}44 0%, var(--pf-paper-2) 60%)` }} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="absolute bottom-4 left-4 flex items-center gap-3">
            <div style={{ width: 8, height: 8, background: "var(--pf-hot)" }} />
            <Mono>{exhibit.exhibitId} · {exhibit.title}</Mono>
          </div>
        </motion.div>

        <div style={{ gridColumn: "span 4 / span 4" }} className="flex flex-col gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={exhibit.id}
              className="flex flex-col gap-6"
              initial={skipEntry ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: d(0.35, 0.14), ease: easeOut }}
            >
              <Mono>Exhibit · signal lines</Mono>
              <h3 className="pf-h3" style={{ fontSize: 30 }}>{exhibit.title}</h3>
              <div className="flex flex-col gap-4">
                {exhibit.signals.map((s, i) => (
                  <SignalRow key={s.k} label={s.k} value={s.v} index={i} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </FrameGrid>

      <div className="flex gap-3 flex-wrap">
        {briefExhibits.map((ex, i) => (
          <button
            key={ex.id}
            type="button"
            onClick={() => setActive(i)}
            className="pf-mono"
            style={{
              padding: "10px 14px",
              border: active === i ? "1px solid var(--pf-ink)" : "1px solid var(--pf-rule)",
              background: active === i ? "var(--pf-paper-2)" : "transparent",
              cursor: "pointer",
              color: "var(--pf-ink)",
              fontSize: 11,
              letterSpacing: "0.06em",
            }}
          >
            {ex.exhibitId}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Desktop({ showGrid, fluid }: { showGrid: boolean; fluid?: boolean }) {
  const { d, easeOut, skipEntry } = useMotionMode();
  return (
    <Artboard name="04_Case_Studies" viewport="desktop" height={920} showGrid={showGrid} fluid={fluid}>
      <div className="flex flex-col gap-16" style={{ paddingTop: 96, paddingBottom: 96 }}>
        <FrameGrid viewport="desktop">
          <motion.div
            style={{ gridColumn: "span 6 / span 6" }}
            className="flex flex-col gap-6"
            initial={skipEntry ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: d(0.6, 0.24), ease: easeOut }}
          >
            <Eyebrow>Fit Brief · 04</Eyebrow>
            <h2 className="pf-h2">Exhibits with <span className="pf-display-italic">real signal.</span></h2>
          </motion.div>
          <div style={{ gridColumn: "span 5 / span 5", gridColumnStart: 8 }} className="flex items-end">
            <p className="pf-lede">
              Evidence before explanation. Full-bleed boards, three signal lines per case —
              problem, move, outcome.
            </p>
          </div>
        </FrameGrid>

        <ExhibitViewer />
      </div>
    </Artboard>
  );
}

export function Mobile({ showGrid, fluid }: { showGrid: boolean; fluid?: boolean }) {
  const [active, setActive] = useState(0);
  const exhibit = briefExhibits[active];

  return (
    <Artboard name="04_Case_Studies" viewport="mobile" height={1200} showGrid={showGrid} fluid={fluid}>
      <div className="flex flex-col gap-8" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <Eyebrow>Fit Brief · 04</Eyebrow>
        <h2 className="pf-h2" style={{ fontSize: 36 }}>
          Exhibits with <span className="pf-display-italic">real signal.</span>
        </h2>
        <div style={{ height: 220, border: "1px solid var(--pf-rule)", overflow: "hidden" }}>
          {exhibit.image ? (
            <ExhibitImage src={exhibit.image} accent={exhibit.accent} alt="" />
          ) : (
            <div className="h-full w-full" style={{ background: `linear-gradient(145deg, ${exhibit.accent}44 0%, var(--pf-paper-2) 60%)` }} />
          )}
        </div>
        <Mono>{exhibit.exhibitId}</Mono>
        <h3 className="pf-h3">{exhibit.title}</h3>
        {exhibit.signals.map((s, i) => (
          <SignalRow key={s.k} label={s.k} value={s.v} index={i} />
        ))}
        <div className="flex gap-2 flex-wrap">
          {briefExhibits.map((ex, i) => (
            <button
              key={ex.id}
              type="button"
              onClick={() => setActive(i)}
              className="pf-mono"
              style={{
                padding: "8px 12px",
                border: "1px solid var(--pf-rule)",
                background: active === i ? "var(--pf-paper-2)" : "transparent",
                fontSize: 10,
              }}
            >
              {ex.exhibitId}
            </button>
          ))}
        </div>
      </div>
    </Artboard>
  );
}
