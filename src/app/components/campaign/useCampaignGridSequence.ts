import gsap, { ScrollTrigger } from "../../../lib/gsapClient";
import { campaignGridPeekFrom } from "../../social/socialGridData";

const REVEAL_COUNT = campaignGridPeekFrom;

function readRect(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  return {
    x: r.left + r.width / 2,
    y: r.top + r.height / 2,
    w: r.width,
    h: r.height,
  };
}

function hideFlipGhost(flipGhost: HTMLElement) {
  gsap.set(flipGhost, {
    autoAlpha: 0,
    visibility: "hidden",
    clearProps: "transform,width,height",
  });
}

export function bindCampaignGridSequence({
  root,
  grid,
  pickCell,
  peekCells,
  flipGhost,
  stage,
}: {
  root: HTMLElement;
  grid: HTMLElement;
  pickCell: HTMLElement;
  peekCells: HTMLElement[];
  flipGhost: HTMLElement;
  stage?: HTMLElement | null;
}) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const revealCells = gsap.utils
    .toArray<HTMLElement>(".campaign-grid__cell", grid)
    .slice(0, REVEAL_COUNT);

  const scroller = document.documentElement;

  hideFlipGhost(flipGhost);

  if (reduced) {
    gsap.set(revealCells, { opacity: 1, y: 0 });
    gsap.set(peekCells, { opacity: 1, filter: "none" });
    pickCell.style.setProperty("--campaign-pick-glow", "0");
    return () => undefined;
  }

  gsap.set(revealCells, { opacity: 0, y: 20 });
  gsap.set(peekCells, { opacity: 0, filter: "blur(8px)" });
  pickCell.style.setProperty("--campaign-pick-glow", "0");

  const revealSt = ScrollTrigger.create({
    scroller,
    trigger: root,
    start: "top 80%",
    once: true,
    onEnter: () => {
      gsap.to(revealCells, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: "power2.out",
      });
    },
  });

  const progressSt = ScrollTrigger.create({
    scroller,
    trigger: root,
    start: "top bottom",
    end: "bottom top",
    scrub: 0.35,
    onUpdate: (self) => {
      const p = self.progress;
      const pickGlow = gsap.utils.clamp(0, 0.35, gsap.utils.mapRange(0.35, 0.45, 0, 0.35, p));
      pickCell.style.setProperty("--campaign-pick-glow", String(pickGlow));

      const peelT = gsap.utils.clamp(0, 1, (p - 0.55) / 0.12);
      peekCells.forEach((cell) => {
        gsap.set(cell, {
          opacity: peelT,
          filter: `blur(${gsap.utils.interpolate(8, 0, peelT)}px)`,
        });
      });
      stage?.classList.toggle("campaign-grid__stage--unlocked", peelT > 0.65);
    },
  });

  let handoffDone = false;

  const runFlipHandoff = () => {
    if (handoffDone) return;
    handoffDone = true;

    const plateTarget = document.querySelector<HTMLElement>(
      "#featured-exhibits-stage .exhibit-gallery__plate",
    );

    root.classList.add("campaign-grid--handoff");
    gsap.to(grid.querySelectorAll(".campaign-grid__cell:not(.campaign-grid__cell--pick)"), {
      opacity: 0,
      duration: 0.2,
      ease: "power2.out",
    });

    if (!plateTarget) {
      gsap.to(pickCell, { opacity: 0, duration: 0.25, delay: 0.1 });
      return;
    }

    const origin = readRect(pickCell);
    const target = readRect(plateTarget);
    const ghostImg = flipGhost.querySelector("img");
    if (!ghostImg) return;

    gsap.set(flipGhost, {
      visibility: "visible",
      autoAlpha: 1,
      xPercent: -50,
      yPercent: -50,
      x: origin.x,
      y: origin.y,
      width: origin.w,
      height: origin.h,
    });

    gsap.to(flipGhost, {
      x: target.x,
      y: target.y,
      width: target.w,
      height: target.h,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: () => {
        hideFlipGhost(flipGhost);
        gsap.set(pickCell, { opacity: 0 });
      },
    });
  };

  const leaveSt = ScrollTrigger.create({
    scroller,
    trigger: root,
    start: "top top",
    end: "bottom top",
    onLeave: runFlipHandoff,
    onEnterBack: () => {
      handoffDone = false;
      root.classList.remove("campaign-grid--handoff");
      hideFlipGhost(flipGhost);
      gsap.set(pickCell, { clearProps: "opacity" });
      gsap.set(grid.querySelectorAll(".campaign-grid__cell"), { clearProps: "opacity" });
    },
  });

  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener("resize", refresh);
  requestAnimationFrame(refresh);

  return () => {
    window.removeEventListener("resize", refresh);
    revealSt.kill();
    progressSt.kill();
    leaveSt.kill();
    hideFlipGhost(flipGhost);
    gsap.set([...revealCells, ...peekCells, pickCell], { clearProps: "all" });
    pickCell.style.removeProperty("--campaign-pick-glow");
    root.classList.remove("campaign-grid--handoff");
    stage?.classList.remove("campaign-grid__stage--unlocked");
  };
}
