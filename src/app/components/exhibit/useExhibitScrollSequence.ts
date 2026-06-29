import gsap, { ScrollTrigger } from "../../../lib/gsapClient";
import { siteHeaderOffset } from "../dossier/scrollSequence";

const SCROLL_VH = 0.72;
const SCROLL_VH_MOBILE = 0.58;
const SCRUB_SMOOTH = 0.42;

type PlateRole = "center" | "left" | "right" | "far";

function plateRole(plateIndex: number, activeIndex: number, count: number): PlateRole {
  let diff = plateIndex - activeIndex;
  if (diff > count / 2) diff -= count;
  if (diff < -count / 2) diff += count;
  if (diff === 0) return "center";
  if (diff === -1) return "left";
  if (diff === 1) return "right";
  return "far";
}

function plateOffset(role: PlateRole): number {
  const spread = Math.min(window.innerWidth * 0.28, 360);
  if (role === "left") return -spread;
  if (role === "right") return spread;
  return 0;
}

const PLATE_PROPS: Record<
  PlateRole,
  { scale: number; opacity: number; zIndex: number; filter: string }
> = {
  center: { scale: 1, opacity: 1, zIndex: 4, filter: "none" },
  left: { scale: 0.44, opacity: 0.42, zIndex: 2, filter: "saturate(0.32) brightness(0.7)" },
  right: { scale: 0.44, opacity: 0.42, zIndex: 2, filter: "saturate(0.32) brightness(0.7)" },
  far: { scale: 0.32, opacity: 0, zIndex: 1, filter: "saturate(0.2) brightness(0.6)" },
};

function ghostOpacityForRole(role: PlateRole): number {
  if (role === "left" || role === "right") return 0.8;
  return 0;
}

function activeIndexForProgress(progress: number, count: number): number {
  const segment = 1 / count;
  return Math.min(count - 1, Math.max(0, Math.floor(progress / segment + 0.0001)));
}

function localProgressForIndex(progress: number, index: number, count: number): number {
  const segment = 1 / count;
  return gsap.utils.clamp(0, 1, (progress - index * segment) / segment);
}

function revealCaptionPanel(panel: HTMLElement) {
  gsap.set(panel, { visibility: "visible", pointerEvents: "auto", opacity: 1 });
  gsap.set(panel.querySelectorAll(".dossier-word__mask-inner, .exhibit-gallery__mask-inner"), {
    yPercent: 0,
    opacity: 1,
  });
  gsap.set(panel.querySelectorAll(".dossier-word__fade, .exhibit-gallery__fade"), {
    opacity: 1,
    y: 0,
  });
}

function revealPlateOverlay(panel: HTMLElement, t: number) {
  gsap.set(panel, { visibility: "visible", pointerEvents: "auto" });

  const masks = panel.querySelectorAll<HTMLElement>(
    ".dossier-word__mask-inner, .exhibit-gallery__mask-inner",
  );
  const fades = panel.querySelectorAll<HTMLElement>(
    ".dossier-word__fade, .exhibit-gallery__fade",
  );

  masks.forEach((mask, i) => {
    const threshold = (i / Math.max(masks.length, 1)) * 0.28;
    const p = gsap.utils.clamp(0, 1, (t - threshold) / 0.34);
    gsap.set(mask, { yPercent: (1 - p) * 100, opacity: p });
  });

  fades.forEach((item, i) => {
    const p = gsap.utils.clamp(0, 1, (t - 0.18 - i * 0.05) / 0.28);
    gsap.set(item, { opacity: p, y: (1 - p) * 14 });
  });
}

function syncExhibitContent(
  progress: number,
  count: number,
  captionPanels: HTMLElement[],
  plateCopies: HTMLElement[],
) {
  const active = activeIndexForProgress(progress, count);
  const localT = localProgressForIndex(progress, active, count);

  captionPanels.forEach((panel, i) => {
    if (i === active) revealCaptionPanel(panel);
    else gsap.set(panel, { visibility: "hidden", pointerEvents: "none" });
  });

  plateCopies.forEach((copy, i) => {
    if (i === active) revealPlateOverlay(copy, Math.min(1, localT + 0.08));
    else gsap.set(copy, { visibility: "hidden", pointerEvents: "none" });
  });
}

function bindPlateKeyframes(
  tl: gsap.core.Timeline,
  plates: HTMLElement[],
  count: number,
) {
  const marks = Array.from({ length: count }, (_, i) => i / (count - 1));

  plates.forEach((plate, plateIndex) => {
    const ghost = plate.querySelector<HTMLElement>(".exhibit-gallery__ghost-label");
    marks.forEach((t, activeIndex) => {
      const role = plateRole(plateIndex, activeIndex, count);
      const props = PLATE_PROPS[role];
      const values = {
        x: () => plateOffset(role),
        scale: props.scale,
        opacity: props.opacity,
        zIndex: props.zIndex,
        filter: props.filter,
      };

      if (activeIndex === 0) {
        tl.set(plate, values, 0);
        if (ghost) tl.set(ghost, { opacity: ghostOpacityForRole(role) }, 0);
      } else {
        const prev = marks[activeIndex - 1];
        tl.to(plate, { ...values, duration: t - prev, ease: "none" }, prev);
        if (ghost) {
          tl.to(
            ghost,
            { opacity: ghostOpacityForRole(role), duration: t - prev, ease: "none" },
            prev,
          );
        }
      }
    });
  });
}

function bindScrollMeter(
  tl: gsap.core.Timeline,
  root: HTMLElement,
  count: number,
) {
  const meter = root.querySelector<HTMLElement>(".exhibit-gallery__meter");
  const ink = root.querySelector<SVGLineElement>(".exhibit-gallery__meter-ink");
  const current = root.querySelector<HTMLElement>(".exhibit-gallery__meter-current");

  if (!meter || !ink) return;

  gsap.set(meter, { opacity: 1 });
  gsap.set(ink, { strokeDasharray: 1, strokeDashoffset: 1 });

  tl.fromTo(
    ink,
    { strokeDashoffset: 1 },
    { strokeDashoffset: 0, duration: 0.94, ease: "none" },
    0,
  );

  if (current) {
    const counter = { index: 1 };
    tl.fromTo(
      counter,
      { index: 1 },
      {
        index: count,
        duration: 0.94,
        ease: "none",
        onUpdate: () => {
          const rounded = Math.min(count, Math.max(1, Math.round(counter.index)));
          current.textContent = String(rounded).padStart(2, "0");
        },
      },
      0,
    );
  }

  tl.to(meter, { opacity: 0, duration: 0.04, ease: "none" }, 0.97);
}

function anchorPlates(plates: HTMLElement[], activeIndex = 0) {
  plates.forEach((plate, i) => {
    const role = plateRole(i, activeIndex, plates.length);
    const props = PLATE_PROPS[role];
    const ghost = plate.querySelector<HTMLElement>(".exhibit-gallery__ghost-label");
    gsap.set(plate, {
      position: "absolute",
      top: "50%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
      transformOrigin: "center center",
      x: plateOffset(role),
      scale: props.scale,
      opacity: props.opacity,
      zIndex: props.zIndex,
      filter: props.filter,
    });
    if (ghost) gsap.set(ghost, { opacity: ghostOpacityForRole(role) });
  });
}

export function bindExhibitScrollSequence({
  pinRoot,
  galleryRoot,
  onPinned,
}: {
  pinRoot: HTMLElement;
  galleryRoot: HTMLElement;
  onPinned?: (pinned: boolean) => void;
}) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const plates = gsap.utils.toArray<HTMLElement>(".exhibit-gallery__plate", galleryRoot);
  const captionPanels = gsap.utils.toArray<HTMLElement>(
    ".exhibit-gallery__caption-panel",
    galleryRoot,
  );
  const plateCopies = gsap.utils.toArray<HTMLElement>(".exhibit-gallery__plate-copy", galleryRoot);
  const count = plates.length;

  if (count === 0) return () => undefined;

  const revealAllCopy = (root: HTMLElement) => {
    gsap.set(root, { visibility: "visible", pointerEvents: "auto", opacity: 1 });
    gsap.set(root.querySelectorAll(".dossier-word__mask-inner, .exhibit-gallery__mask-inner"), {
      yPercent: 0,
      opacity: 1,
    });
    gsap.set(root.querySelectorAll(".dossier-word__fade, .exhibit-gallery__fade"), {
      opacity: 1,
      y: 0,
    });
  };

  if (reduced) {
    galleryRoot.classList.add("exhibit-gallery--static");
    plates.forEach((plate) => {
      gsap.set(plate, { clearProps: "all", opacity: 1, scale: 1 });
      const ghost = plate.querySelector(".exhibit-gallery__ghost-label");
      if (ghost) gsap.set(ghost, { opacity: 0 });
    });
    captionPanels.forEach(revealAllCopy);
    plateCopies.forEach(revealAllCopy);
    const ink = galleryRoot.querySelector<SVGLineElement>(".exhibit-gallery__meter-ink");
    const current = galleryRoot.querySelector<HTMLElement>(".exhibit-gallery__meter-current");
    if (ink) gsap.set(ink, { strokeDashoffset: 0 });
    if (current) current.textContent = String(count).padStart(2, "0");
    onPinned?.(false);
    return () => galleryRoot.classList.remove("exhibit-gallery--static");
  }

  const mobile = window.matchMedia("(max-width: 767px)").matches;
  const scrollVh = mobile ? SCROLL_VH_MOBILE : SCROLL_VH;
  const headerPad = () => Math.round(siteHeaderOffset());

  gsap.set(plates, {
    transformOrigin: "center center",
    position: "absolute",
    top: "50%",
    left: "50%",
    xPercent: -50,
    yPercent: -50,
  });

  anchorPlates(plates, 0);

  const syncFromProgress = (progress: number) => {
    syncExhibitContent(progress, count, captionPanels, plateCopies);
  };

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: pinRoot,
      start: () => `center center+=${Math.round(headerPad() * 0.15)}`,
      end: () => `+=${Math.round(window.innerHeight * scrollVh)}`,
      scrub: SCRUB_SMOOTH,
      pin: true,
      anticipatePin: 0,
      invalidateOnRefresh: true,
      onRefresh: (self) => syncFromProgress(self.progress),
      onEnter: () => {
        pinRoot.classList.add("exhibition-wall--pinned");
        pinRoot.style.setProperty("--site-header-h", `${headerPad()}px`);
        onPinned?.(true);
      },
      onLeave: () => {
        pinRoot.classList.remove("exhibition-wall--pinned");
        syncFromProgress(1);
        onPinned?.(false);
      },
      onEnterBack: () => {
        pinRoot.classList.add("exhibition-wall--pinned");
        pinRoot.style.setProperty("--site-header-h", `${headerPad()}px`);
        onPinned?.(true);
      },
      onLeaveBack: () => {
        pinRoot.classList.remove("exhibition-wall--pinned");
        syncFromProgress(0);
        anchorPlates(plates, 0);
        onPinned?.(false);
      },
      onUpdate: (self) => syncFromProgress(self.progress),
    },
  });

  bindPlateKeyframes(tl, plates, count);
  bindScrollMeter(tl, galleryRoot, count);

  syncFromProgress(tl.scrollTrigger?.progress ?? 0);

  const onResize = () => ScrollTrigger.refresh();
  window.addEventListener("resize", onResize);
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    syncFromProgress(tl.scrollTrigger?.progress ?? 0);
  });

  return () => {
    window.removeEventListener("resize", onResize);
    tl.scrollTrigger?.kill();
    tl.kill();
    pinRoot.classList.remove("exhibition-wall--pinned");
    plates.forEach((plate) => gsap.set(plate, { clearProps: "all" }));
    gsap.set(captionPanels, { clearProps: "visibility,pointerEvents" });
    gsap.set(plateCopies, { clearProps: "visibility,pointerEvents" });
    captionPanels.forEach((panel) => {
      gsap.set(panel.querySelectorAll(".dossier-word__mask-inner, .dossier-word__fade"), {
        clearProps: "all",
      });
    });
    plateCopies.forEach((copy) => {
      gsap.set(copy.querySelectorAll(".dossier-word__mask-inner, .dossier-word__fade"), {
        clearProps: "all",
      });
    });
    const ink = galleryRoot.querySelector<SVGLineElement>(".exhibit-gallery__meter-ink");
    if (ink) gsap.set(ink, { clearProps: "strokeDashoffset,strokeDasharray" });
    onPinned?.(false);
  };
}

export function bindSpotlightSequence(spotlight: HTMLElement) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const poster = spotlight.querySelector<HTMLElement>(".exhibit-spotlight__poster-img");
  const portrait = spotlight.querySelector<HTMLElement>(".exhibit-spotlight__portrait-wrap");
  const cta = spotlight.querySelector<HTMLElement>(".exhibit-spotlight__cta");

  if (!poster) return () => undefined;

  if (reduced) {
    gsap.set(poster, { clipPath: "inset(0% 0% 0% 0%)" });
    if (portrait) gsap.set(portrait, { y: 0, opacity: 1 });
    if (cta) gsap.set(cta, { opacity: 1, y: 0 });
    return () => undefined;
  }

  gsap.set(poster, { clipPath: "inset(0% 100% 0% 0%)" });
  if (portrait) gsap.set(portrait, { y: 48, opacity: 0.65 });
  if (cta) gsap.set(cta, { opacity: 0, y: 16 });

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: spotlight,
      start: "top 88%",
      end: "bottom 35%",
      scrub: SCRUB_SMOOTH,
    },
  });

  tl.to(poster, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.55 }, 0);

  if (portrait) {
    tl.to(portrait, { y: -18, opacity: 1, duration: 0.7 }, 0.08);
  }

  if (cta) {
    tl.to(cta, { opacity: 1, y: 0, duration: 0.22 }, 0.6);
  }

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
    gsap.set(poster, { clearProps: "clipPath" });
    if (portrait) gsap.set(portrait, { clearProps: "all" });
    if (cta) gsap.set(cta, { clearProps: "all" });
  };
}
