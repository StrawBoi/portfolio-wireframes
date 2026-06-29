import gsap from "../../../lib/gsapClient";

const EASE_CLOSE = "power3.inOut";
const EASE_ASCEND = "expo.inOut";
const EASE_DISSOLVE = "power2.inOut";
const EASE_RISE = "power3.out";

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function convertIntroNameToHero(nameEl: HTMLElement) {
  nameEl.classList.remove("willem-handoff__h1", "willem-handoff__h1--ahmed");
  nameEl.classList.add("hero-squeeze__name-row");

  nameEl.querySelectorAll<HTMLElement>("[class*='willem-handoff__letter']").forEach((el) => {
    el.className = el.className
      .split(/\s+/)
      .filter(Boolean)
      .map((cls) => cls.replace(/^willem-handoff__/, "hero-squeeze__"))
      .join(" ");
  });

  const start = nameEl.querySelector(".willem-handoff__h1-start");
  start?.classList.replace("willem-handoff__h1-start", "hero-squeeze__name-start");
  const end = nameEl.querySelector(".willem-handoff__h1-end");
  end?.classList.replace("willem-handoff__h1-end", "hero-squeeze__name-end");

  nameEl.querySelector(".willem-handoff__loader-box")?.remove();
}

function measureDockScale(nameRow: HTMLElement, slot: HTMLElement): number {
  const heroRoot = document.getElementById("frame-01-sequence");
  heroRoot?.classList.add("hero-squeeze--name-compact");
  const compactRect = nameRow.getBoundingClientRect();
  heroRoot?.classList.remove("hero-squeeze--name-compact");

  const slotRect = slot.getBoundingClientRect();
  return gsap.utils.clamp(
    0.12,
    1,
    Math.min(
      (slotRect.width * 0.96) / Math.max(compactRect.width, 1),
      (slotRect.height * 1.15) / Math.max(compactRect.height, 1),
    ),
  );
}

function fitDockedName(nameRow: HTMLElement, slot: HTMLElement) {
  gsap.set(nameRow, { clearProps: "transform", scale: 1 });
  const maxW = slot.getBoundingClientRect().width * 0.98;
  const needed = nameRow.scrollWidth;
  if (needed > maxW && maxW > 0) {
    gsap.set(nameRow, {
      scale: Math.max(0.88, maxW / needed),
      transformOrigin: "center center",
    });
  }
}

function mountNameFlight(introName: HTMLElement): {
  flight: HTMLDivElement;
  startRect: DOMRect;
} {
  convertIntroNameToHero(introName);

  const startRect = introName.getBoundingClientRect();
  const flight = document.createElement("div");
  flight.className = "hero-squeeze__name-flight hero-squeeze__name-flight--cinema";
  flight.appendChild(introName);
  document.body.appendChild(flight);

  gsap.set(flight, {
    position: "fixed",
    top: startRect.top,
    left: startRect.left,
    width: startRect.width,
    margin: 0,
    padding: 0,
    zIndex: 260,
    transformOrigin: "center center",
    x: 0,
    y: 0,
    scale: 1,
  });

  return { flight, startRect };
}

function revealHeroBrief(heroRoot: HTMLElement | null, at: number, tl: gsap.core.Timeline) {
  if (!heroRoot) return;

  const signal = heroRoot.querySelector<HTMLElement>(".hero-squeeze__signal");
  const scrollCue = heroRoot.querySelector<HTMLElement>(".hero-scroll-cue");
  const storyStage = heroRoot.querySelector<HTMLElement>(".hero-story-stage");
  const cvCta = heroRoot.querySelector<HTMLElement>(".hero-squeeze__cv-cta");

  const riseTargets = [signal, storyStage, scrollCue, cvCta].filter(Boolean) as HTMLElement[];

  gsap.set(riseTargets, { opacity: 0, y: 14 });

  if (signal) {
    tl.to(signal, { opacity: 1, y: 0, duration: 0.52, ease: EASE_RISE }, at);
  }

  if (storyStage) {
    tl.to(storyStage, { opacity: 1, y: 0, duration: 0.62, ease: EASE_RISE }, at + 0.12);
  }

  if (scrollCue) {
    tl.to(scrollCue, { opacity: 1, y: 0, duration: 0.45, ease: EASE_RISE }, at + 0.28);
  }

  if (cvCta) {
    tl.to(cvCta, { opacity: 1, y: 0, duration: 0.42, ease: EASE_RISE }, at + 0.36);
  }
}

export function runCinemaHandoff({
  introRoot,
  introName,
  loaderEl,
  onComplete,
}: {
  introRoot: HTMLElement;
  introName: HTMLElement;
  loaderEl: HTMLElement | null;
  onComplete: () => void;
}) {
  const slot = document.getElementById("hero-name-slot");
  const header = document.getElementById("hero-site-header");
  const heroRoot = document.getElementById("frame-01-sequence");
  const menu = header?.querySelector<HTMLElement>(".hero-site-header__menu");

  if (!slot) {
    onComplete();
    return () => undefined;
  }

  const reduced = prefersReducedMotion();
  const closeDur = reduced ? 0.01 : 0.48;
  const ascendDur = reduced ? 0.01 : 0.92;
  const dissolveDur = reduced ? 0.01 : 0.72;
  const hold = reduced ? 0 : 0.14;

  introRoot.classList.add("is--descending", "is--handoff", "is--resolve");

  const boxes = introRoot.querySelectorAll<HTMLElement>(".willem-handoff__loader-box");
  const boxGrow = introRoot.querySelectorAll<HTMLElement>(".willem-handoff__loader-box-grow");
  const rollInner = introRoot.querySelector<HTMLElement>(".willem-handoff__loader-box-inner");
  const h1Start = introName.querySelector<HTMLElement>(".willem-handoff__h1-start");
  const h1End = introName.querySelector<HTMLElement>(".willem-handoff__h1-end");

  let flight: HTMLDivElement | null = null;

  const slotCenter = () => {
    const sr = slot.getBoundingClientRect();
    const nameRow = flight?.querySelector<HTMLElement>(".hero-squeeze__name-row") ?? introName;
    return {
      top: sr.top + sr.height / 2,
      left: sr.left + sr.width / 2,
      scale: measureDockScale(nameRow, slot),
    };
  };

  const finishDock = () => {
    if (!flight) {
      onComplete();
      return;
    }

    flight.classList.remove("hero-squeeze__name-flight--cinema");
    flight.classList.add("hero-squeeze__name-flight--docked");
    gsap.set(flight, {
      clearProps:
        "position,top,left,width,height,margin,padding,x,y,scale,xPercent,yPercent,zIndex",
    });
    gsap.set(introName, { clearProps: "transform" });
    slot.appendChild(flight);
    fitDockedName(introName, slot);

    heroRoot?.classList.add(
      "hero-squeeze--live",
      "hero-squeeze--name-compact",
      "hero-squeeze--name-docked",
      "hero-squeeze--name-settled",
      "hero-squeeze--actions-ready",
    );
    header?.classList.add("is--name-settled");
    onComplete();
  };

  const tl = gsap.timeline({ onComplete: finishDock });

  const closeAt = hold;
  const ascendAt = closeAt + closeDur * 0.82;
  const dissolveAt = closeAt + closeDur * 0.62;

  if (rollInner) {
    tl.to(rollInner, { opacity: 0, duration: closeDur * 0.35, ease: "power2.in" }, closeAt);
  }

  tl.to(boxes, { width: 0, duration: closeDur, ease: EASE_CLOSE }, closeAt);
  tl.to(boxGrow, { scaleX: 0, duration: closeDur, ease: EASE_CLOSE }, closeAt);

  if (h1Start) {
    tl.to(h1Start, { x: "0.32em", duration: closeDur, ease: EASE_CLOSE }, closeAt);
  }
  if (h1End) {
    tl.to(h1End, { x: "-0.18em", duration: closeDur, ease: EASE_CLOSE }, closeAt);
  }

  tl.add(() => {
    const mounted = mountNameFlight(introName);
    flight = mounted.flight;
    return gsap.to(flight, {
      top: () => slotCenter().top,
      left: () => slotCenter().left,
      xPercent: -50,
      yPercent: -50,
      scale: () => slotCenter().scale,
      duration: ascendDur,
      ease: EASE_ASCEND,
    });
  }, ascendAt);

  if (menu) {
    gsap.set(menu, { opacity: 0 });
    tl.to(menu, { opacity: 1, duration: 0.42, ease: EASE_RISE }, dissolveAt + 0.08);
  }

  tl.call(() => {
    window.dispatchEvent(new Event("hero:mosaic-reveal"));
    heroRoot?.classList.remove("hero-squeeze--pending");
    heroRoot?.classList.add("hero-squeeze--handoff");
  }, undefined, dissolveAt);

  if (loaderEl) {
    tl.to(
      loaderEl,
      { scale: 1.014, opacity: 0, duration: dissolveDur, ease: EASE_DISSOLVE },
      dissolveAt,
    );
  }

  tl.to(
    introRoot,
    { opacity: 0, duration: dissolveDur, ease: EASE_DISSOLVE },
    dissolveAt,
  );

  revealHeroBrief(heroRoot, dissolveAt + 0.18, tl);

  return () => {
    tl.kill();
  };
}
