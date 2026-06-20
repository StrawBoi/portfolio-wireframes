import { useState, useEffect, ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MotionMode, MotionModeProvider } from "../motion/MotionMode";

import { WillemHandoff } from "./hero/WillemHandoff";
import { HeroMosaic } from "./hero/HeroMosaic";
import { IdentityHandoff } from "./hero/IdentityHandoff";
import * as Caps from "./frames/02_Capabilities";
import * as Process from "./frames/03_ProcessMap";
import * as Cases from "./frames/04_CaseStudies";
import * as Exp from "./frames/05_ExperienceProof";
import * as Services from "./frames/06_ServicesFit";
import * as Contact from "./frames/07_ContactClose";

function MainNav({ onRestart, logoReady }: { onRestart: () => void; logoReady: boolean }) {
  return (
    <header
      className="sticky top-0 z-40"
      style={{
        background: logoReady ? "rgba(0,22,33,0.72)" : "rgba(240,237,228,0.86)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${logoReady ? "rgba(240,237,228,0.12)" : "var(--pf-rule)"}`,
        transition: "background 0.8s ease, border-color 0.8s ease",
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ maxWidth: 1440, margin: "0 auto", padding: "16px 96px" }}
      >
        <button
          onClick={onRestart}
          className="flex items-center gap-3"
          style={{ background: "transparent", border: 0, cursor: "pointer", padding: 0 }}
        >
          <AnimatePresence mode="wait">
            {logoReady ? (
              <motion.div
                key="full-name"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "flex", flexDirection: "column", gap: 0, lineHeight: 1.05 }}
              >
                <span
                  style={{
                    fontFamily: "var(--pf-font-display)",
                    fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                    color: "var(--pf-paper)",
                  }}
                >
                  Ahmed
                </span>
                <span
                  style={{
                    fontFamily: "var(--pf-font-mono)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(240,237,228,0.55)",
                  }}
                >
                  Mohsen Mostafa
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3"
              >
                <div style={{ width: 8, height: 8, background: "var(--pf-hot)" }} />
                <span style={{ fontFamily: "var(--pf-font-display)", fontSize: 18, color: "var(--pf-ink)" }}>
                  Ahmed
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        <nav className="flex items-center gap-7">
          {[
            ["Capabilities", "02"],
            ["Process", "03"],
            ["Work", "04"],
            ["Experience", "05"],
            ["Services", "06"],
          ].map(([label, n]) => (
            <a
              key={n}
              href={`#frame-${n}`}
              className="pf-small"
              style={{ color: logoReady ? "rgba(240,237,228,0.75)" : "var(--pf-ink)" }}
            >
              {label}
            </a>
          ))}
          <a href="#frame-07" className="pf-btn" style={{ padding: "10px 16px" }}>
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}

function FrameSection({ id, children }: { id: string; children: ReactNode }) {
  return <div id={`frame-${id}`}>{children}</div>;
}

export function Prototype() {
  const [introDone, setIntroDone] = useState(false);
  const [mosaicReady, setMosaicReady] = useState(false);
  const [logoReady, setLogoReady] = useState(false);
  const mode: MotionMode = "slow";

  useEffect(() => {
    const onMosaic = () => setMosaicReady(true);
    const onLogo = () => setLogoReady(true);
    window.addEventListener("hero:mosaic-reveal", onMosaic);
    window.addEventListener("hero:logo-ready", onLogo);
    return () => {
      window.removeEventListener("hero:mosaic-reveal", onMosaic);
      window.removeEventListener("hero:logo-ready", onLogo);
    };
  }, []);

  const handleRestart = () => {
    setIntroDone(false);
    setMosaicReady(false);
    setLogoReady(false);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  return (
    <MotionModeProvider mode={mode}>
      <div style={{ background: "var(--pf-paper)", minHeight: "100vh" }}>
        <HeroMosaic visible={mosaicReady} />

        {!introDone && (
          <WillemHandoff mode={mode} onComplete={() => setIntroDone(true)} />
        )}

        {introDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <MainNav onRestart={handleRestart} logoReady={logoReady} />
            <main>
              <div className="relative z-[1] min-h-[100vh] overflow-hidden">
                <IdentityHandoff />
              </div>
              <FrameSection id="02"><Caps.Desktop showGrid={false} fluid /></FrameSection>
              <FrameSection id="03"><Process.Desktop showGrid={false} fluid /></FrameSection>
              <FrameSection id="04"><Cases.Desktop showGrid={false} fluid /></FrameSection>
              <FrameSection id="05"><Exp.Desktop showGrid={false} fluid /></FrameSection>
              <FrameSection id="06"><Services.Desktop showGrid={false} fluid /></FrameSection>
              <FrameSection id="07"><Contact.Desktop showGrid={false} fluid /></FrameSection>
            </main>
          </motion.div>
        )}
      </div>
    </MotionModeProvider>
  );
}
