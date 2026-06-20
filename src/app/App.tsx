import { useEffect, useState } from "react";
import * as Intro from "./components/frames/00_IntroGate";
import * as Hero from "./components/frames/01_HomeHero";
import * as Caps from "./components/frames/02_Capabilities";
import * as Process from "./components/frames/03_ProcessMap";
import * as Cases from "./components/frames/04_CaseStudies";
import * as Exp from "./components/frames/05_ExperienceProof";
import * as Services from "./components/frames/06_ServicesFit";
import * as Contact from "./components/frames/07_ContactClose";
import { DesignSystemHeader } from "./components/DesignSystemHeader";
import { Prototype } from "./components/Prototype";
import { MotionModeProvider } from "./motion/MotionMode";

const FRAMES = [Intro, Hero, Caps, Process, Cases, Exp, Services, Contact];

type AppMode = "prototype" | "artboard";

const MODE_TABS: { id: AppMode; label: string; hint: string }[] = [
  { id: "artboard", label: "Artboard", hint: "Wireframes · colours · type" },
  { id: "prototype", label: "Prototype", hint: "Animated experience" },
];

function readModeFromHash(): AppMode {
  const h = window.location.hash;
  if (!h || h === "#prototype") return "prototype";
  return "artboard";
}

export default function App() {
  const [appMode, setAppMode] = useState<AppMode>(() => readModeFromHash());
  const [showGrid, setShowGrid] = useState(false);
  const [view, setView] = useState<"both" | "desktop" | "mobile">("both");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, "", "#prototype");
      setAppMode("prototype");
    }
    const onHashChange = () => setAppMode(readModeFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const switchMode = (mode: AppMode) => {
    setAppMode(mode);
    window.location.hash = mode === "prototype" ? "#prototype" : "#artboard";
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  return (
    <div className={`pf ${dark && appMode === "artboard" ? "pf-dark" : ""}`} style={{ minHeight: "100vh" }}>
      {/* Top toolbar — always visible above both modes */}
      <div
        className="sticky top-0 z-[200]"
        style={{
          background: "var(--pf-paper)",
          borderBottom: "1px solid var(--pf-rule)",
          padding: "12px 24px",
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div style={{ width: 8, height: 8, background: "var(--pf-hot)" }} />
            <span className="pf-mono" style={{ color: "var(--pf-ink)" }}>Portfolio · Wireframes</span>
            <span className="pf-mono-num">v0.3</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div
              className="inline-flex flex-wrap"
              style={{ border: "1px solid var(--pf-rule-strong)", padding: 2, gap: 2 }}
              role="tablist"
              aria-label="View mode"
            >
              {MODE_TABS.map(({ id, label, hint }) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={appMode === id}
                  onClick={() => switchMode(id)}
                  title={hint}
                  className="pf-mono"
                  style={{
                    padding: "10px 16px",
                    background: appMode === id ? "var(--pf-ink)" : "transparent",
                    color: appMode === id ? "var(--pf-paper)" : "var(--pf-ink-2)",
                    border: "none",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {appMode === "artboard" && (
              <>
                <div style={{ width: 1, height: 20, background: "var(--pf-rule)", margin: "0 4px" }} />
                {(["both", "desktop", "mobile"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setView(v)}
                    className="pf-mono"
                    style={{
                      padding: "8px 12px",
                      background: view === v ? "var(--pf-ink)" : "transparent",
                      color: view === v ? "var(--pf-paper)" : "var(--pf-ink-2)",
                      border: "1px solid var(--pf-rule-strong)",
                      cursor: "pointer",
                    }}
                  >
                    {v}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setShowGrid((g) => !g)}
                  className="pf-mono"
                  style={{
                    padding: "8px 12px",
                    background: showGrid ? "var(--pf-ink)" : "transparent",
                    color: showGrid ? "var(--pf-paper)" : "var(--pf-ink-2)",
                    border: "1px solid var(--pf-rule-strong)",
                    cursor: "pointer",
                  }}
                >
                  Grid
                </button>
                <button
                  type="button"
                  onClick={() => setDark((d) => !d)}
                  className="pf-mono"
                  style={{
                    padding: "8px 12px",
                    background: dark ? "var(--pf-ink)" : "transparent",
                    color: dark ? "var(--pf-paper)" : "var(--pf-ink-2)",
                    border: "1px solid var(--pf-rule-strong)",
                    cursor: "pointer",
                  }}
                >
                  {dark ? "Dark" : "Light"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {appMode === "prototype" ? (
        <Prototype />
      ) : (
        <MotionModeProvider mode="quick">
          <div style={{ padding: 40 }} className="overflow-x-auto">
            <div
              className="flex flex-col"
              style={{
                gap: 96,
                maxWidth: view === "mobile" ? 480 : "none",
                minWidth: view === "mobile" ? undefined : 1440,
              }}
            >
              <DesignSystemHeader />
              {FRAMES.map((F, i) => (
                <div key={i} className="flex flex-row items-start" style={{ gap: 56 }}>
                  {(view === "both" || view === "desktop") && <F.Desktop showGrid={showGrid} />}
                  {(view === "both" || view === "mobile") && <F.Mobile showGrid={showGrid} />}
                </div>
              ))}
            </div>
          </div>
        </MotionModeProvider>
      )}
    </div>
  );
}
