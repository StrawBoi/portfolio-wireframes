import { useState, useEffect, ReactNode, useCallback, useRef } from "react";
import { MotionMode, MotionModeProvider } from "../motion/MotionMode";
import { prefersSaveData } from "./hero/introAssets";

import { Loader } from "./Loader";
import { WillemHandoff } from "./hero/WillemHandoff";
import { HeroFrameReveal } from "./hero/variants/HeroFrameReveal";
import { CampaignGrid } from "./campaign/CampaignGrid";
import { FeaturedExhibits } from "./exhibit/FeaturedExhibits";
import { MethodSection } from "./method/MethodSection";
import { DarkModeToggle } from "./DarkModeToggle";
import { ProofDossiersSection } from "./proof/ProofDossiersSection";
import { StoryExperienceSection } from "./story/StoryExperienceSection";
import { StoryFitSection } from "./story/StoryFitSection";
import { ContactClosePrototype } from "./frames/07_ContactClosePrototype";

import { MainNav } from "./MainNav";

const INTRO_STORAGE_KEY = "pf-intro-done";

function resolveMotionMode(): MotionMode {
  return prefersSaveData() ? "quick" : "slow";
}

function FrameSection({ id, children }: { id: string; children: ReactNode }) {
  return <div id={`frame-${id}`}>{children}</div>;
}

export function Prototype() {
  const rootRef = useRef<HTMLDivElement>(null);
  const emberScrimRef = useRef<HTMLDivElement>(null);
  const [loaderDone, setLoaderDone] = useState(() => sessionStorage.getItem("pf-loader-done") === "1");
  const [introDone, setIntroDone] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [toneTransitioning, setToneTransitioning] = useState(false);
  const [sessionKey, setSessionKey] = useState(0);
  const mode: MotionMode = resolveMotionMode();

  const handleIntroComplete = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setIntroDone(true);
  }, []);

  const handleRestart = useCallback(() => {
    try {
      sessionStorage.removeItem(INTRO_STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setIntroDone(false);
    setIsDark(true);
    setSessionKey((k) => k + 1);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const handleExhibitsRelease = useCallback(() => {
    setToneTransitioning(true);
    setIsDark(false);
    window.setTimeout(() => setToneTransitioning(false), 420);
  }, []);

  useEffect(() => {
    if (!introDone) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === " " || e.key === "Enter") {
        if (e.key === " ") e.preventDefault();
        handleRestart();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [introDone, handleRestart]);

  return (
    <MotionModeProvider mode={mode}>
      <div
        ref={rootRef}
        className={[
          isDark ? "pf-cinematic" : "",
          toneTransitioning ? "pf-tone-transition" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ background: "var(--pf-paper)", minHeight: "100vh" }}
      >
        <div
          ref={emberScrimRef}
          className="pf-ember-scrim"
          aria-hidden
          data-layer="ember-scrim"
        />

        {!loaderDone && <Loader onComplete={() => setLoaderDone(true)} />}

        <main style={{ paddingTop: 0 }}>
          {loaderDone && (
            <>
              <div
                id="site-reveal"
                className={[
                  "site-reveal",
                  introDone ? "site-reveal--ready" : "site-reveal--beneath",
                ].join(" ")}
              >
                <MainNav />
                <HeroFrameReveal active={introDone} />
                <CampaignGrid />
                <FeaturedExhibits
                  onRelease={handleExhibitsRelease}
                  emberScrimRef={emberScrimRef}
                  showSpotlight={false}
                />
                <MethodSection />
                {introDone && (
                  <DarkModeToggle isDark={isDark} onToggle={() => setIsDark((d) => !d)} />
                )}
                <ProofDossiersSection />
                <StoryExperienceSection />
                <StoryFitSection />
                <FrameSection id="07"><ContactClosePrototype /></FrameSection>
              </div>

              {!introDone && (
                <WillemHandoff
                  key={sessionKey}
                  mode={mode}
                  cinemaHandoff
                  onComplete={handleIntroComplete}
                />
              )}
            </>
          )}
        </main>
      </div>
    </MotionModeProvider>
  );
}
