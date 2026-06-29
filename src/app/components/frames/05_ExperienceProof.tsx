import { Artboard, FrameGrid } from "../Artboard";
import { Eyebrow, Mono } from "../wireframe/Primitives";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useMotionMode } from "../../motion/MotionMode";
import { provenWork, cvExperience, technicalExperience } from "@portfolio/shared/content";
import { SequenceReveal, LineReveal } from "../../motion/SequenceReveal";

const LOGOS = [
  ...provenWork.teams,
  ...provenWork.individual,
  ...provenWork.gtm,
];

const ROLES = cvExperience.map((e) => ({
  y: `${e.from} — ${e.to}`,
  co: e.company,
  role: e.position,
  ach: e.achievements.join(" "),
}));

const TECH = technicalExperience.map((t) => [t.role, t.context]);

const IMPOSSIBLE = [
  "messy", "abstract", "stalled", "unclear", "POSSIBLE", "contested",
  "underfunded", "overscoped", "late", "complex", "ambiguous", "stuck",
];

// Scroll threshold within the spine's scroll well where each row fires [start, end].
const ROW_THRESHOLDS = ROLES.map((_, i) => [i / ROLES.length, (i + 0.9) / ROLES.length]);

/** Scroll-driven vertical timeline spine. Receives progress from parent's useScroll. */
function TimelineSpine({ progress }: { progress: any }) {
  const { skipEntry } = useMotionMode();
  const scaleY = useTransform(progress, [0, 1], skipEntry ? [1, 1] : [0, 1]);

  return (
    <div
      className="absolute"
      style={{ left: -24, top: 0, bottom: 0, width: 1, background: "var(--pf-rule)" }}
    >
      <motion.div
        style={{
          position: "absolute",
          top: 0, left: 0,
          width: "100%", height: "100%",
          background: "var(--pf-hot)",
          scaleY,
          transformOrigin: "top center",
        }}
      />
      {/* Volcanico dot at origin */}
      <motion.div
        style={{
          position: "absolute",
          top: -4, left: -3.5,
          width: 8, height: 8,
          borderRadius: "50%",
          background: "var(--pf-hot)",
          scaleY,
        }}
      />
    </div>
  );
}

/** One experience row — reveals when the scroll spine has reached it. */
function TimelineRow({
  r, index, containerProgress,
}: {
  r: typeof ROLES[number];
  index: number;
  containerProgress: any;
}) {
  const { skipEntry, easeOut } = useMotionMode();
  const [start, end] = ROW_THRESHOLDS[index];
  const opacity = useTransform(containerProgress, [start, end], skipEntry ? [1, 1] : [0, 1]);
  const y = useTransform(containerProgress, [start, end], skipEntry ? [0, 0] : [10, 0]);

  return (
    <motion.div
      className="grid"
      style={{
        gridTemplateColumns: "140px 1fr 1fr",
        alignItems: "start",
        paddingTop: 24,
        paddingBottom: 24,
        borderTop: "1px solid var(--pf-rule)",
        borderBottom: index === ROLES.length - 1 ? "1px solid var(--pf-rule)" : "none",
        columnGap: 24,
        opacity,
        y,
      }}
    >
      <Mono>{r.y}</Mono>
      <div className="flex flex-col gap-1">
        <span style={{ fontFamily: "var(--pf-font-display)", fontSize: 24, color: "var(--pf-ink)" }}>
          {r.co}
        </span>
        <span className="pf-small">{r.role}</span>
      </div>
      <span className="pf-body" style={{ color: "var(--pf-ink)", fontSize: 14 }}>{r.ach}</span>
    </motion.div>
  );
}

/** The timeline band: single useScroll on the non-static roles column drives spine + rows. */
function TimelineBand() {
  const colRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: colRef,
    offset: ["start 80%", "end 30%"],
  });

  return (
    <FrameGrid viewport="desktop">
      <div style={{ gridColumn: "span 4 / span 4" }} className="flex flex-col gap-5">
        <Eyebrow>Relevant Experience</Eyebrow>
        <h3 className="pf-h3" style={{ fontSize: 32 }}>Three chapters. One through-line.</h3>
        <p className="pf-body">Marketing studies, campaign work, and a long systems background converge in one profile: research, analytics, operations, and execution.</p>
      </div>
      {/* position: relative is required by useScroll to compute offsets correctly */}
      <div
        ref={colRef}
        style={{ gridColumn: "span 7 / span 7", gridColumnStart: 6, position: "relative" }}
        className="flex flex-col"
      >
        <TimelineSpine progress={scrollYProgress} />
        {ROLES.map((r, i) => (
          <TimelineRow key={r.co} r={r} index={i} containerProgress={scrollYProgress} />
        ))}
      </div>
    </FrameGrid>
  );
}

/** Sticky Impossible→Possible beat.
 *  Outer well is 260 vh tall. Inner content is pinned sticky.
 *  User scrolls through; scroll progress drives chaos → collapse. */
function ImpossibleBand() {
  const { skipEntry } = useMotionMode();
  const wellRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wellRef,
    offset: ["start start", "end end"],
  });

  // If quick mode, render static final state without the scroll well.
  if (skipEntry) {
    return (
      <FrameGrid viewport="desktop" style={{ rowGap: 32 }}>
        <TechBlock />
        <FreelanceBlock />
        <ImpossibleCard scrollProgress={null} />
      </FrameGrid>
    );
  }

  return (
    <div ref={wellRef} style={{ height: "260vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, paddingTop: 0 }}>
        <FrameGrid viewport="desktop" style={{ rowGap: 32 }}>
          <TechBlock />
          <FreelanceBlock />
          <ImpossibleCard scrollProgress={scrollYProgress} />
        </FrameGrid>
      </div>
    </div>
  );
}

function TechBlock() {
  return (
    <div style={{ gridColumn: "span 5 / span 5" }}>
      <div style={{ border: "1px solid var(--pf-rule)", padding: 28 }} className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Eyebrow>Technical Crossover</Eyebrow>
          <Mono>4 roles</Mono>
        </div>
        <p className="pf-body" style={{ fontSize: 13 }}>
          Before marketing, I worked close to systems, support, development, and operations. That history is useful here: cleaner data, tighter handoffs, fewer blind spots.
        </p>
        <div className="flex flex-col" style={{ marginTop: 8 }}>
          {TECH.map(([role, co], i) => (
            <div key={role} className="grid" style={{
              gridTemplateColumns: "1fr auto",
              padding: "10px 0",
              borderTop: i === 0 ? "1px solid var(--pf-rule)" : "none",
              borderBottom: "1px solid var(--pf-rule)",
            }}>
              <span className="pf-body" style={{ color: "var(--pf-ink)", fontSize: 14 }}>{role}</span>
              <Mono>{co}</Mono>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FreelanceBlock() {
  return (
    <div style={{ gridColumn: "span 3 / span 3" }}>
      <div style={{ background: "var(--pf-ink)", color: "var(--pf-paper)", padding: 28, height: "100%" }}
        className="flex flex-col gap-5 justify-between">
        <div className="flex flex-col gap-3">
          <span className="pf-mono" style={{ color: "var(--pf-hot)" }}>— Internship / Embedded</span>
          <span style={{ fontFamily: "var(--pf-font-display)", fontSize: 28, lineHeight: 1.1 }}>
            Available for a Summer 2026 marketing, research, growth, or analytics internship where thinking and execution both matter.
          </span>
        </div>
        <span className="pf-small" style={{ color: "var(--pf-ink-3)" }}>Brussels-based · Belgium / Europe</span>
      </div>
    </div>
  );
}

/** The signature brand thesis moment.
 *  scrollProgress=null means quick mode — render final state. */
function ImpossibleCard({ scrollProgress }: { scrollProgress: any }) {
  const { easeOut } = useMotionMode();
  // Chaos phase: 0 → 0.45 of scroll progress. Collapse: 0.45 → 1.
  const chaosEnd = 0.45;
  const collapseEnd = 1.0;

  return (
    <div style={{ gridColumn: "span 4 / span 4" }}>
      <div style={{ border: "1px solid var(--pf-rule)", padding: 28 }} className="flex flex-col gap-4 h-full">
        <Eyebrow>Impossible → Possible</Eyebrow>
        <span style={{ fontFamily: "var(--pf-font-display)", fontSize: 22, lineHeight: 1.15 }}>
          Most briefs arrive pre-filtered. The constraint wasn&rsquo;t the problem — the framing was.
        </span>
        <div
          className="relative flex flex-wrap items-start gap-x-3 gap-y-2"
          style={{ marginTop: 8, minHeight: 120 }}
        >
          {IMPOSSIBLE.map((w, i) => (
            <ImpossibleWord
              key={w}
              word={w}
              index={i}
              scrollProgress={scrollProgress}
              chaosEnd={chaosEnd}
              collapseEnd={collapseEnd}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Static final state — used in artboard / quick mode (no scroll progress). */
function ImpossibleWordStatic({ word }: { word: string }) {
  const isHero = word === "POSSIBLE";
  if (isHero) {
    return (
      <span
        className="relative"
        style={{
          fontFamily: "var(--pf-font-display)",
          fontSize: 22,
          fontStyle: "italic",
          color: "var(--pf-hot)",
          display: "inline-block",
        }}
      >
        POSSIBLE
        <span
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -3,
            height: 2,
            background: "var(--pf-hot)",
            transform: "scaleX(1)",
            transformOrigin: "left center",
          }}
        />
      </span>
    );
  }
  return (
    <span
      style={{
        fontFamily: "var(--pf-font-display)",
        fontSize: 18,
        color: "var(--pf-ink-3)",
        display: "inline-block",
        opacity: word === "POSSIBLE" ? 1 : 0.07,
      }}
    >
      {word}
    </span>
  );
}

/** Scroll-driven chaos → collapse. Only mounted when scrollProgress is provided. */
function ImpossibleWordAnimated({
  word, index, scrollProgress, chaosEnd, collapseEnd,
}: {
  word: string;
  index: number;
  scrollProgress: NonNullable<Parameters<typeof ImpossibleCard>[0]["scrollProgress"]>;
  chaosEnd: number;
  collapseEnd: number;
}) {
  const isHero = word === "POSSIBLE";
  const jX = ((index * 37) % 8) - 4;
  const jY = ((index * 53) % 6) - 3;
  const staggeredChaosStart = Math.min(chaosEnd * 0.9, index * 0.025);
  const k1 = staggeredChaosStart;
  const k2 = Math.max(k1, Math.min(k1 + 0.08, chaosEnd - 0.03));
  const k3 = Math.max(k2, Math.min(k1 + 0.18, chaosEnd - 0.015));
  const k4 = Math.max(k3 + 0.001, chaosEnd);

  const scale = useTransform(scrollProgress, [chaosEnd, collapseEnd], [1, 1.2]);
  const underlineScaleX = useTransform(
    scrollProgress,
    [Math.min(chaosEnd + 0.1, collapseEnd - 0.01), collapseEnd],
    [0, 1],
  );
  const opacity = useTransform(
    scrollProgress,
    [k1, k2, k3, k4, collapseEnd],
    [0.8, 0.35, 0.8, 0.5, 0.07],
  );
  const x = useTransform(
    scrollProgress,
    [k1, Math.max(k2, Math.min(k1 + 0.1, k4)), Math.max(k3, Math.min(k1 + 0.2, k4)), k4],
    [0, jX, -jX * 0.6, 0],
  );
  const y = useTransform(
    scrollProgress,
    [k1, Math.max(k2, Math.min(k1 + 0.1, k4)), Math.max(k3, Math.min(k1 + 0.2, k4)), k4],
    [0, jY, -jY * 0.6, 0],
  );

  if (isHero) {
    return (
      <motion.span
        className="relative"
        style={{
          fontFamily: "var(--pf-font-display)",
          fontSize: 22,
          fontStyle: "italic",
          color: "var(--pf-hot)",
          display: "inline-block",
          scale,
        }}
      >
        POSSIBLE
        <motion.span
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: -3,
            height: 2,
            background: "var(--pf-hot)",
            scaleX: underlineScaleX,
            transformOrigin: "left center",
          }}
        />
      </motion.span>
    );
  }

  return (
    <motion.span
      style={{
        fontFamily: "var(--pf-font-display)",
        fontSize: 18,
        color: "var(--pf-ink-3)",
        display: "inline-block",
        opacity,
        x,
        y,
      }}
    >
      {word}
    </motion.span>
  );
}

function ImpossibleWord({
  word, index, scrollProgress, chaosEnd, collapseEnd,
}: {
  word: string;
  index: number;
  scrollProgress: any;
  chaosEnd: number;
  collapseEnd: number;
}) {
  if (!scrollProgress) {
    return <ImpossibleWordStatic word={word} />;
  }
  return (
    <ImpossibleWordAnimated
      word={word}
      index={index}
      scrollProgress={scrollProgress}
      chaosEnd={chaosEnd}
      collapseEnd={collapseEnd}
    />
  );
}

export function Desktop({ showGrid, fluid }: { showGrid: boolean; fluid?: boolean }) {
  const { skipEntry, d, easeOut } = useMotionMode();
  return (
    <Artboard name="05_Experience_Proof" viewport="desktop" height={1480} showGrid={showGrid} fluid={fluid}>
      <div className="flex flex-col" style={{ paddingTop: 48, paddingBottom: 48, gap: 48 }}>

        {/* Band 1 — Proof / clients */}
        <FrameGrid viewport="desktop">
          <SequenceReveal style={{ gridColumn: "span 5 / span 5" }} className="flex flex-col gap-6">
            <Eyebrow>Proof</Eyebrow>
            <h2 className="pf-h2">
              11+ years. <span className="pf-display-italic">Systems mind.</span>
            </h2>
          </SequenceReveal>
          <div style={{ gridColumn: "span 6 / span 6", gridColumnStart: 7 }} className="flex items-end">
            <p className="pf-lede">
              In-house, embedded, and independent. Work delivered across automotive,
              entertainment, hospitality, and enterprise — with teams that had deadlines, not just briefs.
            </p>
          </div>
          <div style={{ gridColumn: "span 12 / span 12", marginTop: 24 }}>
            <div className="grid grid-cols-8" style={{ borderTop: "1px solid var(--pf-rule)", borderBottom: "1px solid var(--pf-rule)" }}>
              {LOGOS.map((l, i) => (
                <motion.div
                  key={l}
                  className="flex items-center justify-center"
                  style={{
                    height: 96,
                    borderRight: i < LOGOS.length - 1 ? "1px solid var(--pf-rule)" : "none",
                    fontFamily: "var(--pf-font-display)",
                    fontSize: 18, color: "var(--pf-ink-2)",
                    letterSpacing: "-0.01em",
                  }}
                  initial={skipEntry ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: d(0.5, 0.2), delay: skipEntry ? 0 : i * 0.04, ease: easeOut }}
                >
                  {l}
                </motion.div>
              ))}
            </div>
          </div>
        </FrameGrid>

        {/* Band 2 — Experience timeline with painted spine */}
        <TimelineBand />

        {/* Band 3 — Technical + Freelance + Impossible (sticky pinned) */}
        <ImpossibleBand />
      </div>
    </Artboard>
  );
}

export function Mobile({ showGrid, fluid }: { showGrid: boolean; fluid?: boolean }) {
  return (
    <Artboard name="05_Experience_Proof" viewport="mobile" height={1900} showGrid={showGrid} fluid={fluid}>
      <div className="flex flex-col gap-10" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <Eyebrow>Proof</Eyebrow>
        <h2 className="pf-h2" style={{ fontSize: 32 }}>
              11+ years. <span className="pf-display-italic">Systems mind.</span>
        </h2>
        <div className="grid grid-cols-2" style={{ borderTop: "1px solid var(--pf-rule)" }}>
          {LOGOS.map((l) => (
            <div key={l} style={{
              padding: "18px 8px",
              borderBottom: "1px solid var(--pf-rule)",
              fontFamily: "var(--pf-font-display)", fontSize: 16, color: "var(--pf-ink-2)",
              textAlign: "center",
            }}>{l}</div>
          ))}
        </div>
        <Eyebrow>Relevant Experience</Eyebrow>
        <div className="flex flex-col">
          {ROLES.map((r) => (
            <div key={r.co} style={{ borderTop: "1px solid var(--pf-rule)", padding: "16px 0" }}
              className="flex flex-col gap-1">
              <Mono>{r.y}</Mono>
              <span style={{ fontFamily: "var(--pf-font-display)", fontSize: 20 }}>{r.co}</span>
              <span className="pf-small">{r.role}</span>
              <span className="pf-body" style={{ fontSize: 13, marginTop: 6 }}>{r.ach}</span>
            </div>
          ))}
        </div>
        <div style={{ border: "1px solid var(--pf-rule)", padding: 18 }} className="flex flex-col gap-2">
          <Eyebrow>Technical Crossover</Eyebrow>
          {TECH.map(([r, c]) => (
            <div key={r} className="flex items-center justify-between"
              style={{ borderTop: "1px solid var(--pf-rule)", paddingTop: 8, paddingBottom: 8 }}>
              <span className="pf-body" style={{ color: "var(--pf-ink)", fontSize: 13 }}>{r}</span>
              <Mono>{c}</Mono>
            </div>
          ))}
        </div>
        <div style={{ background: "var(--pf-ink)", color: "var(--pf-paper)", padding: 20 }}
          className="flex flex-col gap-2">
          <span className="pf-mono" style={{ color: "var(--pf-hot)" }}>— Internship / Embedded</span>
          <span style={{ fontFamily: "var(--pf-font-display)", fontSize: 22, lineHeight: 1.15 }}>
            Available for a Summer 2026 marketing, research, growth, or analytics internship.
          </span>
        </div>
      </div>
    </Artboard>
  );
}
