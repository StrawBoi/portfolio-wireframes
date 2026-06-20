import { Artboard } from "../Artboard";
import { Mono } from "../wireframe/Primitives";
import { motion, AnimatePresence, useSpring, useTransform } from "motion/react";
import { useMotionMode, MotionMode } from "../../motion/MotionMode";
import { ClipReveal } from "../../motion/Reveal";
import { Magnetic } from "../../motion/Magnetic";
import { useCallback, useEffect, useRef, useState } from "react";
import { featuredProjects } from "@portfolio/shared/content";
import { RecruiterAssist } from "../hero/RecruiterAssist";

const PREVIEWS = featuredProjects.slice(0, 4).map((p) => ({
  title: p.reelLabel || p.title,
  category: p.category,
  image: p.image,
}));

function ModeToggle({
  mode = "slow",
  onChange,
}: {
  mode?: MotionMode;
  onChange?: (m: MotionMode) => void;
}) {
  const Pill = ({ label, active, onClick }: { label: string; active: boolean; onClick?: () => void }) => (
    <button
      onClick={onClick}
      style={{
        padding: "8px 14px",
        fontFamily: "var(--pf-font-mono)",
        fontSize: 10,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        background: active ? "var(--pf-ink)" : "transparent",
        color: active ? "var(--pf-paper)" : "var(--pf-ink-2)",
        border: "none",
        cursor: onChange ? "pointer" : "default",
      }}
    >
      {label}
    </button>
  );
  return (
    <div className="inline-flex" style={{ border: "1px solid var(--pf-rule-strong)", padding: 2 }}>
      <Pill label="Quick" active={mode === "quick"} onClick={onChange ? () => onChange("quick") : undefined} />
      <Pill label="Slow" active={mode === "slow"} onClick={onChange ? () => onChange("slow") : undefined} />
    </div>
  );
}

/** Drag / scroll scrub — the visitor peels open "Show." to see work, not copy. */
function ShowScrub({
  reveal,
  onReveal,
  mobile,
}: {
  reveal: number;
  onReveal: (v: number) => void;
  mobile?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    onReveal(Math.max(0, Math.min(1, x)));
  }, [onReveal]);

  useEffect(() => {
    const up = () => { dragging.current = false; };
    const move = (e: PointerEvent) => {
      if (!dragging.current) return;
      setFromClientX(e.clientX);
    };
    window.addEventListener("pointerup", up);
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointermove", move);
    };
  }, [setFromClientX]);

  const active = PREVIEWS[Math.min(PREVIEWS.length - 1, Math.floor(reveal * PREVIEWS.length))];
  const springReveal = useSpring(reveal, { stiffness: 280, damping: 32 });
  const thumbX = useTransform(springReveal, (v) => `calc(${v * 100}% - 6px)`);
  const fillWidth = useTransform(springReveal, (v) => `${v * 100}%`);

  return (
    <div style={{ marginTop: mobile ? 20 : 28, maxWidth: mobile ? "100%" : 520 }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 10 }}>
        <Mono>{reveal < 0.05 ? "Drag to see the work" : "Showing"}</Mono>
        <AnimatePresence mode="wait">
          {reveal > 0.06 && (
            <motion.span
              key={active.title}
              className="pf-mono"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              style={{ color: "var(--pf-hot)" }}
            >
              {active.title} · {active.category}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div
        ref={trackRef}
        role="slider"
        aria-label="Reveal portfolio work"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(reveal * 100)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowUp") onReveal(Math.min(1, reveal + 0.08));
          if (e.key === "ArrowLeft" || e.key === "ArrowDown") onReveal(Math.max(0, reveal - 0.08));
        }}
        onPointerDown={(e) => {
          dragging.current = true;
          setFromClientX(e.clientX);
        }}
        style={{
          position: "relative",
          height: 2,
          background: "var(--pf-rule)",
          cursor: "ew-resize",
          touchAction: "none",
        }}
      >
        <motion.div
          style={{
            position: "absolute",
            left: 0,
            top: -5,
            width: 12,
            height: 12,
            background: "var(--pf-hot)",
            x: thumbX,
          }}
        />
        <motion.div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: 2,
            background: "var(--pf-hot)",
            width: fillWidth,
            transformOrigin: "left",
          }}
        />
      </div>
    </div>
  );
}

function Content({
  mobile = false,
  animate = false,
  onEnter,
  modeOverride,
  onModeChange,
}: {
  mobile?: boolean;
  animate?: boolean;
  onEnter?: () => void;
  modeOverride?: MotionMode;
  onModeChange?: (m: MotionMode) => void;
}) {
  const { d, easeOut, mode: ctxMode, skipEntry } = useMotionMode();
  const mode = modeOverride ?? ctxMode;
  const H = mobile ? 720 : 900;
  const skip = animate && skipEntry;

  const [reveal, setReveal] = useState(0);
  const [cueVisible, setCueVisible] = useState(true);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate) return;
    const t = setTimeout(() => setCueVisible(false), 5200);
    const onScroll = () => setCueVisible(false);
    window.addEventListener("scroll", onScroll, { once: true, passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, [animate]);

  // Scroll wheel peels open "Show." before the page advances
  useEffect(() => {
    if (!animate) return;
    const onWheel = (e: WheelEvent) => {
      if (reveal >= 0.98) return;
      e.preventDefault();
      setReveal((r) => Math.min(1, r + Math.abs(e.deltaY) * 0.0018));
      setCueVisible(false);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [animate, reveal]);

  const activeIdx = Math.min(PREVIEWS.length - 1, Math.floor(reveal * PREVIEWS.length));
  const active = PREVIEWS[activeIdx];
  const imageFill = active.image || "";

  const fade = (delay: number) =>
    animate && !skip
      ? {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: d(0.55, 0.22), delay: d(delay, delay * 0.4), ease: easeOut },
        }
      : ({} as Record<string, never>);

  const enterSlow = () => {
    onModeChange?.("slow");
    onEnter?.();
  };
  const enterQuick = () => {
    onModeChange?.("quick");
    onEnter?.();
  };

  return (
    <div ref={stageRef} className="relative" style={{ height: H, color: "var(--pf-ink)" }}>
      <div
        className="absolute left-0 right-0 flex items-center justify-between"
        style={{ top: mobile ? 24 : 36 }}
      >
        <div className="flex items-center gap-3">
          <div style={{ width: 8, height: 8, background: "var(--pf-signal)" }} />
          <span style={{ fontFamily: "var(--pf-font-display)", fontSize: mobile ? 16 : 18 }}>
            Ahmed<span style={{ color: "var(--pf-ink-2)" }}>—</span>Mostafa
          </span>
        </div>
        <ModeToggle mode={mode} onChange={onModeChange} />
      </div>

      <div className="absolute" style={{ left: 0, top: mobile ? 90 : 130 }}>
        <Mono>00 — Intro Gate</Mono>
      </div>

      <div
        className="absolute left-0 right-0 flex flex-col"
        style={{ top: mobile ? 150 : 220, gap: mobile ? 20 : 32 }}
      >
        <motion.div className="flex items-baseline gap-4" {...fade(0.05)}>
          <span className="pf-mono-num">N°00</span>
          <div style={{ flex: 1, height: 1, background: "var(--pf-rule)" }} />
          <span className="pf-mono">Scroll · Drag · Or Click</span>
        </motion.div>

        <h1
          className="pf-h1"
          style={{ maxWidth: mobile ? "100%" : 980, fontSize: mobile ? 44 : undefined, lineHeight: 0.92 }}
        >
          {animate && !skip ? (
            <span style={{ display: "inline-block", overflow: "hidden", paddingBottom: "0.06em" }}>
              <motion.span
                style={{ display: "block" }}
                animate={{ opacity: 1 - reveal * 0.72 }}
                transition={{ duration: 0.15 }}
              >
                <ClipReveal delay={0.15}>Don&rsquo;t tell.</ClipReveal>
              </motion.span>
              <ClipReveal delay={0.32}>
                <motion.span
                  layoutId="headline-accent"
                  className="pf-display-italic"
                  style={{
                    display: "inline-block",
                    backgroundImage: imageFill ? `url(${imageFill})` : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: `${reveal * 80}% center`,
                    WebkitBackgroundClip: reveal > 0.06 ? "text" : undefined,
                    backgroundClip: reveal > 0.06 ? "text" : undefined,
                    color: reveal > 0.06 ? "transparent" : "var(--pf-hot)",
                    filter: reveal > 0.06 ? "none" : undefined,
                  }}
                  animate={{
                    scale: 1 + reveal * 0.04,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  Show.
                </motion.span>
              </ClipReveal>
              <motion.span
                style={{ display: "block", marginTop: "0.08em" }}
                animate={{ opacity: 0.35 + reveal * 0.65 }}
                transition={{ duration: 0.2 }}
              >
                <ClipReveal delay={0.42}>Let the work speak.</ClipReveal>
              </motion.span>
            </span>
          ) : (
            <>
              Don&rsquo;t tell.
              <br />
              <motion.span layoutId="headline-accent" className="pf-display-italic" style={{ color: "var(--pf-hot)", display: "inline-block" }}>
                Show.
              </motion.span>
              <br />
              Let the work speak.
            </>
          )}
        </h1>

        {animate && (
          <ShowScrub reveal={reveal} onReveal={setReveal} mobile={mobile} />
        )}

        <motion.p className="pf-lede" style={{ maxWidth: mobile ? "100%" : 520 }} {...fade(animate ? 0.7 : 0)}>
          {reveal < 0.12
            ? "UX, research, strategy, and execution — but you decide when you've seen enough."
            : reveal < 0.75
              ? `${active.title}: ${active.category}. Keep going.`
              : "You've seen the signal. Enter when you're ready."}
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center gap-3"
          style={{ marginTop: mobile ? 8 : 16 }}
          {...fade(animate ? 0.55 : 0)}
        >
          <Magnetic
            className="pf-btn"
            onClick={enterSlow}
            style={reveal > 0.5 ? { boxShadow: "0 0 0 1px var(--pf-hot)" } : undefined}
          >
            Enter portfolio <span>→</span>
          </Magnetic>
          <Magnetic className="pf-btn pf-btn-ghost" onClick={enterQuick}>
            Take the quick tour
          </Magnetic>
        </motion.div>
      </div>

      <div
        className="absolute left-0 right-0 flex items-end justify-between"
        style={{ bottom: mobile ? 24 : 36 }}
      >
        <AnimatePresence>
          {(!animate || cueVisible) && (
            <motion.div
              key="cue"
              className="flex flex-col gap-1"
              initial={animate ? { opacity: 0, y: -6 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: d(0.5, 0.2), delay: animate ? d(1.0, 0.25) : 0, ease: easeOut }}
            >
              <Mono>Scroll to reveal</Mono>
              <div style={{ width: 1, height: 28, background: "var(--pf-ink)" }} />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex items-center gap-6">
          <Mono>Quick — scramble cut</Mono>
          <Mono>Slow — guided reveal</Mono>
        </div>
      </div>

      {/* Filmstrip bleed — work escapes the headline on deep reveal */}
      {animate && reveal > 0.15 && (
        <motion.div
          className="pointer-events-none absolute overflow-hidden"
          style={{
            right: mobile ? 0 : 96,
            top: mobile ? "58%" : "52%",
            width: mobile ? "42%" : "28%",
            height: mobile ? 120 : 160,
            border: "1px solid var(--pf-rule-strong)",
          }}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: (reveal - 0.15) * 1.4, x: 24 - reveal * 24 }}
          transition={{ duration: 0.2 }}
        >
          {imageFill ? (
            <img
              src={imageFill}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(20%)" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "var(--pf-card)",
                display: "flex",
                alignItems: "flex-end",
                padding: 12,
              }}
            >
              <span className="pf-mono" style={{ color: "var(--pf-hot)" }}>{active.title}</span>
            </div>
          )}
        </motion.div>
      )}

      {/* Recruiter / HR nudge — robot pops out beside a quick-scan prompt */}
      {animate && (
        <RecruiterAssist onQuick={enterQuick} mobile={mobile} reveal={reveal} />
      )}
    </div>
  );
}

/** Interactive live version used by the Prototype. */
export function Live({
  mobile = false,
  onEnter,
  mode,
  onModeChange,
}: {
  mobile?: boolean;
  onEnter: () => void;
  mode: MotionMode;
  onModeChange: (m: MotionMode) => void;
}) {
  return (
    <section className="pf-cinematic" style={{ background: "var(--pf-paper)", width: "100%" }}>
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          paddingLeft: mobile ? 20 : 96,
          paddingRight: mobile ? 20 : 96,
        }}
      >
        <Content mobile={mobile} animate onEnter={onEnter} modeOverride={mode} onModeChange={onModeChange} />
      </div>
    </section>
  );
}

export function Desktop({ showGrid, fluid }: { showGrid: boolean; fluid?: boolean }) {
  return (
    <Artboard name="00_Intro_Gate" viewport="desktop" height={900} showGrid={showGrid} fluid={fluid} cinematic>
      <Content />
    </Artboard>
  );
}
export function Mobile({ showGrid, fluid }: { showGrid: boolean; fluid?: boolean }) {
  return (
    <Artboard name="00_Intro_Gate" viewport="mobile" height={720} showGrid={showGrid} fluid={fluid} cinematic>
      <Content mobile />
    </Artboard>
  );
}
