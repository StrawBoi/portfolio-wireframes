// NOTE: Frame 01 is no longer rendered in the Prototype flow.
// GuidedHero (src/app/components/hero/GuidedHero.tsx) replaces it as the live hero.
// This file is kept for the standalone Artboard artboard viewer.
import { Artboard, FrameGrid, TopBar } from "../Artboard";
import { Btn, Eyebrow, HeroVisual, Mono } from "../wireframe/Primitives";
import { motion } from "motion/react";
import { useMotionMode } from "../../motion/MotionMode";

export function Desktop({ showGrid, fluid }: { showGrid: boolean; fluid?: boolean }) {
  const { skipEntry, d, easeOut } = useMotionMode();
  return (
    <Artboard name="01_Home_Hero" viewport="desktop" height={840} showGrid={showGrid} fluid={fluid}>
      {!fluid && <TopBar />}
      <div style={{ paddingTop: fluid ? 56 : 96, paddingBottom: 80 }}>
        <FrameGrid viewport="desktop">
          <div style={{ gridColumn: "span 7 / span 7" }} className="flex flex-col gap-10">
            <motion.div
              initial={skipEntry ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: d(0.55, 0.22), delay: d(0.1, 0.04), ease: easeOut }}
            >
              <Eyebrow>Open to work · Senior UX &amp; Strategy</Eyebrow>
            </motion.div>
            <h1 className="pf-h1">
              <motion.span
                style={{ display: "block", overflow: "hidden" }}
                initial={skipEntry ? false : { clipPath: "inset(0 0 100% 0)", y: "0.15em" }}
                animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
                transition={{ duration: d(0.75, 0.3), delay: d(0.22, 0.08), ease: easeOut }}
              >
                From brief to
              </motion.span>
              <motion.span
                layoutId="headline-accent"
                className="pf-display-italic"
                style={{ display: "inline-block" }}
                transition={{ duration: d(0.7, 0.28), ease: easeOut }}
              >
                shipped product.
              </motion.span>
              <motion.span
                style={{ display: "block", overflow: "hidden" }}
                initial={skipEntry ? false : { clipPath: "inset(0 0 100% 0)", y: "0.15em" }}
                animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
                transition={{ duration: d(0.75, 0.3), delay: d(0.36, 0.12), ease: easeOut }}
              >
                Without the gaps.
              </motion.span>
            </h1>
            <motion.p
              className="pf-lede"
              style={{ maxWidth: 520 }}
              initial={skipEntry ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: d(0.55, 0.22), delay: d(0.5, 0.14), ease: easeOut }}
            >
              I work at the intersection of UX, research, analytics, and strategy — then
              stay close enough to the build that what ships matches what was designed.
            </motion.p>
            <motion.div
              className="flex items-center gap-3"
              initial={skipEntry ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: d(0.45, 0.18), delay: d(0.62, 0.18), ease: easeOut }}
            >
              <Btn label="View selected work" arrow />
              <Btn label="See how I work" primary={false} />
            </motion.div>
            <motion.div
              className="flex items-center gap-8"
              style={{ marginTop: 24 }}
              initial={skipEntry ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: d(0.55, 0.22), delay: d(0.72, 0.22), ease: easeOut }}
            >
              <div className="flex flex-col gap-1">
                <span className="pf-mono">Years active</span>
                <span style={{ fontFamily: "var(--pf-font-display)", fontSize: 32 }}>9+</span>
              </div>
              <div style={{ width: 1, height: 36, background: "var(--pf-rule)" }} />
              <div className="flex flex-col gap-1">
                <span className="pf-mono">Projects shipped</span>
                <span style={{ fontFamily: "var(--pf-font-display)", fontSize: 32 }}>40+</span>
              </div>
              <div style={{ width: 1, height: 36, background: "var(--pf-rule)" }} />
              <div className="flex flex-col gap-1">
                <span className="pf-mono">Disciplines</span>
                <span style={{ fontFamily: "var(--pf-font-display)", fontSize: 32 }}>6</span>
              </div>
            </motion.div>
          </div>
          <div style={{ gridColumn: "span 5 / span 5" }} className="flex flex-col gap-3">
            <HeroVisual />
            <div className="flex items-center justify-between">
              <Mono>fig.01 — system map</Mono>
              <Mono>scroll to begin ↓</Mono>
            </div>
          </div>
        </FrameGrid>
      </div>
    </Artboard>
  );
}

export function Mobile({ showGrid, fluid }: { showGrid: boolean; fluid?: boolean }) {
  return (
    <Artboard name="01_Home_Hero" viewport="mobile" height={820} showGrid={showGrid} fluid={fluid}>
      {!fluid && <TopBar viewport="mobile" />}
      <div className="flex flex-col gap-7" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <Eyebrow>Open to work · Senior UX &amp; Strategy</Eyebrow>
        <h1 className="pf-h1" style={{ fontSize: 44 }}>
          From brief to <span className="pf-display-italic">shipped product.</span> Without the gaps.
        </h1>
        <p className="pf-lede">
          UX, research, analytics, and strategy — then close enough to the build that
          what ships matches what was designed.
        </p>
        <div className="flex flex-col gap-2">
          <Btn label="View selected work" arrow />
          <Btn label="See how I work" primary={false} />
        </div>
        <HeroVisual height={260} />
      </div>
    </Artboard>
  );
}
