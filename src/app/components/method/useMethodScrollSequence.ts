import gsap, { ScrollTrigger } from "../../../lib/gsapClient";
import { prefersReducedMotion, siteHeaderOffset } from "../dossier/scrollSequence";

function revealPanel(panel: HTMLElement) {
  gsap.set(panel, { clearProps: "visibility,opacity,pointerEvents" });
  gsap.set(panel, { visibility: "visible", pointerEvents: "auto", opacity: 1 });
  gsap.set(panel.querySelectorAll(".dossier-word__mask-inner"), {
    clearProps: "visibility,opacity,transform",
    yPercent: 0,
    opacity: 1,
    visibility: "visible",
  });
  gsap.set(panel.querySelectorAll(".dossier-word__fade"), {
    clearProps: "visibility,opacity,transform",
    opacity: 1,
    y: 0,
    visibility: "visible",
  });
}

function setActiveBeat(index: number, panels: HTMLElement[], tabs: HTMLElement[]) {
  panels.forEach((panel, i) => {
    panel.classList.toggle("is-active", i === index);
  });
  tabs.forEach((tab, i) => {
    tab.classList.toggle("is-active", i === index);
    tab.setAttribute("aria-current", i === index ? "step" : "false");
  });
}

export function bindMethodScrollSequence({
  sectionRoot,
  railRoot,
}: {
  sectionRoot: HTMLElement;
  railRoot: HTMLElement;
}) {
  const reduced = prefersReducedMotion();
  const rail = railRoot.querySelector<HTMLElement>(".method-rail") ?? railRoot;
  const panels = gsap.utils.toArray<HTMLElement>(".method-rail__panel", rail);
  const tabs = gsap.utils.toArray<HTMLElement>(".method-rail__tab", rail);

  if (panels.length === 0) return () => undefined;

  rail.classList.add("method-rail--stacked");
  panels.forEach(revealPanel);
  setActiveBeat(0, panels, tabs);

  if (reduced) {
    return () => {
      panels.forEach((panel) => {
        gsap.set(panel, { clearProps: "visibility,opacity,pointerEvents" });
        gsap.set(panel.querySelectorAll(".dossier-word__mask-inner, .dossier-word__fade"), {
          clearProps: "all",
        });
      });
    };
  }

  const triggers: ScrollTrigger[] = [];
  const headerPad = () => Math.round(siteHeaderOffset() + 12);

  panels.forEach((panel, index) => {
    const st = ScrollTrigger.create({
      trigger: panel,
      start: () => `top center+=${headerPad()}`,
      end: () => `bottom center+=${headerPad()}`,
      onEnter: () => setActiveBeat(index, panels, tabs),
      onEnterBack: () => setActiveBeat(index, panels, tabs),
    });
    triggers.push(st);
  });

  const onResize = () => ScrollTrigger.refresh();
  window.addEventListener("resize", onResize);

  return () => {
    window.removeEventListener("resize", onResize);
    triggers.forEach((st) => st.kill());
    panels.forEach((panel) => {
      panel.classList.remove("is-active");
      gsap.set(panel, { clearProps: "visibility,opacity,pointerEvents" });
      gsap.set(panel.querySelectorAll(".dossier-word__mask-inner, .dossier-word__fade"), {
        clearProps: "all",
      });
    });
    tabs.forEach((tab) => {
      tab.classList.remove("is-active");
      tab.removeAttribute("aria-current");
    });
  };
}
