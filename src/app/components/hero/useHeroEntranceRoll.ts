import gsap from "../../../lib/gsapClient";

type IntroProfile = {
  isMobile: boolean;
  isTablet: boolean;
  reduceMotion: boolean;
};

function readIntroProfile(): IntroProfile {
  if (typeof window === "undefined") {
    return { isMobile: false, isTablet: false, reduceMotion: false };
  }
  return {
    isMobile: window.matchMedia("(max-width: 767px)").matches,
    isTablet: window.matchMedia("(min-width: 768px) and (max-width: 1023px)").matches,
    reduceMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  };
}

const ENTRANCE_EASE = "power3.inOut";

export function bindHeroEntranceRoll({
  root,
  onComplete,
}: {
  root: HTMLElement;
  onComplete: () => void;
}) {
  const exhibitSlides = root.querySelectorAll<HTMLElement>(
    ".hero-squeeze__roll-slide:not(.hero-squeeze__roll-slide--portrait)",
  );
  const portrait = root.querySelector<HTMLElement>(".hero-squeeze__roll-slide--portrait");
  const portraitImg = portrait?.querySelector<HTMLElement>("img");
  const total = exhibitSlides.length;
  const lastExhibitIdx = Math.max(0, total - 1);

  if (total === 0 || !portrait) {
    onComplete();
    return () => undefined;
  }

  const profile = readIntroProfile();

  const finishPortrait = () => {
    exhibitSlides.forEach((slide) => gsap.set(slide, { opacity: 0 }));
    gsap.set(portrait, { opacity: 1 });
    root.classList.add("hero-squeeze--portrait-settled");
    onComplete();
  };

  const showLastExhibit = () => {
    exhibitSlides.forEach((slide, i) => {
      gsap.set(slide, { opacity: i === lastExhibitIdx ? 1 : 0 });
    });
    gsap.set(portrait, { opacity: 0 });
  };

  if (profile.reduceMotion) {
    finishPortrait();
    root.classList.add("hero-squeeze--actions-ready");
    return () => {
      root.classList.remove("hero-squeeze--portrait-settled", "hero-squeeze--actions-ready");
    };
  }

  // Intro already ran the carousel — hold last exhibit, then cut to portrait only.
  showLastExhibit();
  if (portraitImg) gsap.set(portraitImg, { scale: 1.07 });
  root.classList.add("hero-squeeze--actions-ready");

  const HOLD = profile.isMobile ? 0.18 : 0.26;
  const CUT = profile.isMobile ? 0.1 : 0.12;

  const tl = gsap.timeline({ delay: 0.12, defaults: { ease: ENTRANCE_EASE } });

  tl.to({}, { duration: HOLD });
  tl.to(exhibitSlides[lastExhibitIdx], { opacity: 0, duration: CUT });
  tl.set(portrait, { opacity: 1 }, "<0.04");
  if (portraitImg) {
    tl.fromTo(
      portraitImg,
      { scale: 1.07 },
      { scale: 1, duration: 0.58, ease: "power3.out" },
      "<",
    );
  }
  tl.call(finishPortrait);

  return () => {
    tl.kill();
    root.classList.remove("hero-squeeze--portrait-settled", "hero-squeeze--actions-ready");
  };
}
