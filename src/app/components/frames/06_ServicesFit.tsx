import { Artboard, FrameGrid } from "../Artboard";
import { Btn, Eyebrow, Mono } from "../wireframe/Primitives";
import { motion } from "motion/react";
import { useMotionMode } from "../../motion/MotionMode";
import { fitMatrix } from "@portfolio/shared/content";

function FitMatrix() {
  const { skipEntry, d, easeOut } = useMotionMode();
  const { columns, rows } = fitMatrix;

  return (
    <div style={{ borderTop: "1px solid var(--pf-ink)", borderBottom: "1px solid var(--pf-rule)" }}>
      <div
        className="grid items-center"
        style={{
          gridTemplateColumns: `140px repeat(${columns.length}, 1fr) 120px`,
          columnGap: 16,
          padding: "18px 0",
          borderBottom: "1px solid var(--pf-rule)",
        }}
      >
        <Mono>Skill</Mono>
        {columns.map((col) => (
          <Mono key={col} className="text-center">{col}</Mono>
        ))}
        <Mono>Evidence</Mono>
      </div>

      {rows.map((row, ri) => (
        <motion.div
          key={row.skill}
          className="grid items-center"
          style={{
            gridTemplateColumns: `140px repeat(${columns.length}, 1fr) 120px`,
            columnGap: 16,
            padding: "22px 0",
            borderTop: "1px solid var(--pf-rule)",
          }}
          initial={skipEntry ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: d(0.45, 0.18), delay: skipEntry ? 0 : ri * 0.05, ease: easeOut }}
        >
          <span style={{ fontFamily: "var(--pf-font-display)", fontSize: 20, color: "var(--pf-ink)" }}>
            {row.skill}
          </span>
          {row.marks.map((on, ci) => (
            <div key={`${row.skill}-${ci}`} className="flex justify-center">
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: on ? "var(--pf-hot)" : "transparent",
                  border: on ? "none" : "1px solid var(--pf-rule-strong)",
                  display: "inline-block",
                }}
                aria-hidden
              />
            </div>
          ))}
          <Mono style={{ fontSize: 10 }}>{row.evidence}</Mono>
        </motion.div>
      ))}
    </div>
  );
}

export function Desktop({ showGrid, fluid }: { showGrid: boolean; fluid?: boolean }) {
  return (
    <Artboard name="06_Services_Fit" viewport="desktop" height={720} showGrid={showGrid} fluid={fluid}>
      <div className="flex flex-col gap-12" style={{ paddingTop: 96, paddingBottom: 96 }}>
        <FrameGrid viewport="desktop">
          <div style={{ gridColumn: "span 6 / span 6" }} className="flex flex-col gap-6">
            <Eyebrow>Fit Brief · 06</Eyebrow>
            <h2 className="pf-h2">Recruiter scan <span className="pf-display-italic">matrix.</span></h2>
          </div>
          <div style={{ gridColumn: "span 5 / span 5", gridColumnStart: 8 }} className="flex flex-col gap-4 justify-end">
            <p className="pf-lede">
              ~8 seconds. Strength dots, not skill bars. Honest intern positioning —
              research, campaign, analytics, brand.
            </p>
            <Btn label="Start the conversation" arrow />
          </div>
        </FrameGrid>

        <FitMatrix />
      </div>
    </Artboard>
  );
}

export function Mobile({ showGrid, fluid }: { showGrid: boolean; fluid?: boolean }) {
  const { columns, rows } = fitMatrix;

  return (
    <Artboard name="06_Services_Fit" viewport="mobile" height={900} showGrid={showGrid} fluid={fluid}>
      <div className="flex flex-col gap-6" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <Eyebrow>Fit Brief · 06</Eyebrow>
        <h2 className="pf-h2" style={{ fontSize: 32 }}>Recruiter scan <span className="pf-display-italic">matrix.</span></h2>
        <div className="flex flex-col gap-4">
          {rows.map((row) => (
            <div key={row.skill} style={{ borderTop: "1px solid var(--pf-rule)", paddingTop: 14 }}>
              <span style={{ fontFamily: "var(--pf-font-display)", fontSize: 20 }}>{row.skill}</span>
              <div className="flex flex-wrap gap-3" style={{ marginTop: 10 }}>
                {columns.map((col, ci) => (
                  <span key={col} className="pf-mono" style={{ fontSize: 10 }}>
                    {col} {row.marks[ci] ? "●" : "○"}
                  </span>
                ))}
              </div>
              <Mono style={{ marginTop: 8, fontSize: 10 }}>{row.evidence}</Mono>
            </div>
          ))}
        </div>
        <Btn label="Start the conversation" arrow />
      </div>
    </Artboard>
  );
}
