import gsap, { ScrollTrigger } from "../../../lib/gsapClient";

const SCROLL_VH = 0.75;
const SIGNAL_FADE_START = 0.55;
const SIGNAL_FADE_END = 0.75;
const STAGE_FADE_START = 0.75;
const STAGE_FADE_END = 0.92;
const SCRUB_SMOOTH = 0.38;

export function bindHeroScrollSequence({
  root,
  scrollCue,
}: {
  root: HTMLElement;
  scrollCue: HTMLElement;
}) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const signal = root.querySelector<HTMLElement>(".hero-squeeze__signal");
  const cvCta = root.querySelector<HTMLElement>(".hero-squeeze__cv-cta");
  const storyStage = root.querySelector<HTMLElement>(".hero-story-stage");
  const projectCursor = root.querySelector<HTMLElement>(".hero-squeeze__project-cursor");

  const primeCue = () => {
    gsap.set(scrollCue, { opacity: 1, visibility: "visible" });
    root.classList.add("hero-squeeze--scroll-cue");
  };

  const resetCue = () => {
    root.classList.remove("hero-squeeze--scroll-cue");
  };

  if (reduced) {
    primeCue();
    return () => resetCue();
  }

  primeCue();

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: root,
      start: "top top",
      end: () => `+=${Math.round(window.innerHeight * SCROLL_VH)}`,
      scrub: SCRUB_SMOOTH,
      pin: true,
      anticipatePin: 0,
      invalidateOnRefresh: true,
      onLeaveBack: () => {
        gsap.set(scrollCue, { clearProps: "opacity,visibility,transform" });
        primeCue();
      },
    },
  });

  const signalDur = SIGNAL_FADE_END - SIGNAL_FADE_START;
  const stageDur = STAGE_FADE_END - STAGE_FADE_START;

  if (signal) {
    tl.to(signal, { opacity: 0, y: -12, duration: signalDur * 0.85 }, SIGNAL_FADE_START);
  }
  if (cvCta) {
    tl.to(cvCta, { opacity: 0, y: 8, duration: signalDur * 0.8 }, SIGNAL_FADE_START);
  }
  tl.to(scrollCue, { opacity: 0, y: -8, duration: signalDur * 0.9 }, SIGNAL_FADE_START + 0.02);

  if (storyStage) {
    tl.to(storyStage, { opacity: 0, scale: 0.98, duration: stageDur * 0.9 }, STAGE_FADE_START);
  }
  if (projectCursor) {
    tl.to(projectCursor, { opacity: 0, duration: stageDur * 0.75 }, STAGE_FADE_START);
  }

  const onResize = () => ScrollTrigger.refresh();
  window.addEventListener("resize", onResize);
  requestAnimationFrame(() => ScrollTrigger.refresh());

  return () => {
    window.removeEventListener("resize", onResize);
    tl.scrollTrigger?.kill();
    tl.kill();
    gsap.set(scrollCue, { clearProps: "all" });
    if (projectCursor) gsap.set(projectCursor, { clearProps: "opacity" });
    if (storyStage) gsap.set(storyStage, { clearProps: "all" });
    if (signal) gsap.set(signal, { clearProps: "all" });
    if (cvCta) gsap.set(cvCta, { clearProps: "all" });
    resetCue();
  };
}
