import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const Spline = lazy(() => import("@splinetool/react-spline"));

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * A quiet side-of-stage nudge for time-poor recruiters / HR.
 * The Spline robot pops out slowly beside the card and tracks the cursor,
 * gesturing the visitor toward the 90-second quick scan.
 */
export function RecruiterAssist({
  onQuick,
  mobile,
  reveal = 0,
}: {
  onQuick: () => void;
  mobile?: boolean;
  reveal?: number;
}) {
  const [boxIn, setBoxIn] = useState(false);
  const [robotIn, setRobotIn] = useState(false);
  const reduced = useRef(prefersReduced());

  useEffect(() => {
    if (mobile) return;
    const t1 = setTimeout(() => setBoxIn(true), reduced.current ? 200 : 1600);
    const t2 = setTimeout(() => setRobotIn(true), reduced.current ? 200 : 2500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [mobile]);

  if (mobile) return null;

  // As the visitor peels open the headline, the nudge yields the stage.
  const faded = reveal > 0.12;

  return (
    <motion.div
      className="absolute z-20 hidden md:flex md:items-end"
      style={{ right: 40, top: 286, gap: 4 }}
      animate={{ opacity: faded ? 0 : 1 }}
      transition={{ duration: 0.3 }}
      aria-hidden={faded}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...({ inert: faded ? "" : undefined } as any)}
    >
      {/* 3D robot — pops out slowly, follows cursor */}
      <AnimatePresence>
        {robotIn && !reduced.current && (
          <motion.div
            key="robot"
            initial={{ opacity: 0, scale: 0.55, x: 28, y: 14 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 188,
              height: 188,
              marginBottom: -8,
              filter: "drop-shadow(0 16px 28px rgba(0,22,33,0.18))",
            }}
          >
            <Suspense fallback={null}>
              <Spline
                scene="/scene.splinecode"
                style={{ width: "100%", height: "100%", background: "transparent" }}
              />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recruiter nudge card */}
      <AnimatePresence>
        {boxIn && (
          <motion.aside
            key="nudge"
            className="pointer-events-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: reduced.current ? 0.2 : 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 248,
              padding: "16px 18px",
              background: "var(--pf-card)",
              border: "1px solid var(--pf-rule)",
              borderRadius: 12,
              backdropFilter: "blur(6px)",
              boxShadow: "0 12px 32px rgba(0,22,33,0.10)",
            }}
          >
            <div className="flex items-center gap-2" style={{ marginBottom: 10 }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  background: "var(--pf-hot)",
                  borderRadius: 1,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--pf-font-mono)",
                  fontSize: 9.5,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--pf-ink-2)",
                }}
              >
                For Recruiters &amp; HR
              </span>
            </div>

            <p
              style={{
                fontFamily: "var(--pf-font-sans)",
                fontSize: 14,
                lineHeight: 1.4,
                color: "var(--pf-ink)",
                margin: 0,
              }}
            >
              Short on time? Take the{" "}
              <span style={{ color: "var(--pf-hot)", fontWeight: 600 }}>
                90-second quick scan.
              </span>
            </p>

            <button
              type="button"
              onClick={onQuick}
              className="group"
              style={{
                marginTop: 14,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "var(--pf-ink)",
                color: "var(--pf-paper)",
                border: "none",
                borderRadius: 8,
                padding: "9px 14px",
                fontFamily: "var(--pf-font-mono)",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Quick scan
              <span
                style={{
                  color: "var(--pf-hot)",
                  transition: "transform 240ms ease",
                  display: "inline-block",
                }}
                className="group-hover:translate-x-0.5"
              >
                →
              </span>
            </button>
          </motion.aside>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default RecruiterAssist;
