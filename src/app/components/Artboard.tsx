import { ReactNode } from "react";

type Props = {
  name: string;
  viewport: "desktop" | "mobile";
  height?: number;
  showGrid: boolean;
  cinematic?: boolean;
  /** When true, render content inline as a real page section (no artboard chrome, no fixed width). */
  fluid?: boolean;
  children: ReactNode;
};

const CONFIG = {
  desktop: { width: 1440, cols: 12, margin: 96, gutter: 24 },
  mobile: { width: 390, cols: 4, margin: 20, gutter: 16 },
};

export function Artboard({ name, viewport, height, showGrid, cinematic, fluid, children }: Props) {
  const cfg = CONFIG[viewport];
  if (fluid) {
    return (
      <section
        data-frame={name}
        className={cinematic ? "pf-cinematic" : ""}
        style={{ background: "var(--pf-paper)", color: "var(--pf-ink)", width: "100%" }}
      >
        <div
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            paddingLeft: viewport === "desktop" ? 96 : 20,
            paddingRight: viewport === "desktop" ? 96 : 20,
            minHeight: height,
          }}
        >
          {children}
        </div>
      </section>
    );
  }
  return (
    <div className={`flex flex-col items-start gap-3 shrink-0 ${cinematic ? "pf-cinematic" : ""}`}>
      <div className="flex items-center gap-3">
        <span className="pf-mono" style={cinematic ? { color: "#2BC9B7" } : undefined}>{name}</span>
        <span className="pf-mono-num">
          {viewport} · {cfg.width}px · {cfg.cols}col{cinematic ? " · cinematic" : ""}
        </span>
      </div>
      <div
        className="relative"
        style={{
          width: cfg.width,
          minHeight: height ?? 600,
          background: "var(--pf-paper)",
          border: "1px solid var(--pf-rule)",
          boxShadow: "0 1px 0 rgba(0,0,0,0.02), 0 30px 60px -40px rgba(0,0,0,0.18)",
        }}
      >
        {showGrid && (
          <div
            className="pointer-events-none absolute inset-0 z-10 grid"
            style={{
              gridTemplateColumns: `repeat(${cfg.cols}, 1fr)`,
              columnGap: cfg.gutter,
              paddingLeft: cfg.margin,
              paddingRight: cfg.margin,
            }}
          >
            {Array.from({ length: cfg.cols }).map((_, i) => (
              <div key={i} style={{ background: "rgba(220,70,37,0.05)", borderLeft: "1px dashed rgba(220,70,37,0.35)", borderRight: "1px dashed rgba(220,70,37,0.35)" }} />
            ))}
          </div>
        )}
        <div
          className="relative"
          style={{
            paddingLeft: cfg.margin,
            paddingRight: cfg.margin,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function FrameGrid({
  viewport,
  className = "",
  children,
  style,
}: {
  viewport: "desktop" | "mobile";
  className?: string;
  children: ReactNode;
  style?: React.CSSProperties;
}) {
  const cfg = CONFIG[viewport];
  return (
    <div
      className={`grid ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cfg.cols}, 1fr)`,
        columnGap: cfg.gutter,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function TopBar({ viewport = "desktop" }: { viewport?: "desktop" | "mobile" }) {
  return (
    <div
      className="flex items-center justify-between"
      style={{
        paddingTop: viewport === "desktop" ? 28 : 18,
        paddingBottom: viewport === "desktop" ? 28 : 18,
        borderBottom: "1px solid var(--pf-rule)",
      }}
    >
      <div className="flex items-center gap-3">
        <div style={{ width: 8, height: 8, background: "var(--pf-signal)" }} />
        <span style={{ fontFamily: "var(--pf-font-display)", fontSize: 18, color: "var(--pf-ink)" }}>
          Studio<span style={{ color: "var(--pf-ink-2)" }}>—</span>Name
        </span>
      </div>
      {viewport === "desktop" && (
        <nav className="flex items-center gap-7">
          {["Work", "Process", "Experience", "Services"].map((n) => (
            <span key={n} className="pf-small" style={{ color: "var(--pf-ink)" }}>{n}</span>
          ))}
          <button className="pf-btn" style={{ padding: "10px 16px" }}>Contact</button>
        </nav>
      )}
      {viewport === "mobile" && (
        <div className="flex flex-col gap-1">
          <div style={{ width: 22, height: 1, background: "var(--pf-ink)" }} />
          <div style={{ width: 22, height: 1, background: "var(--pf-ink)" }} />
        </div>
      )}
    </div>
  );
}
