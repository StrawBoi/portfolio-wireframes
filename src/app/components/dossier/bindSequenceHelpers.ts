import gsap from "../../../lib/gsapClient";

const COPY_IN = 0.055;
const COPY_OUT = 0.04;

export function bindCopySegment(
  tl: gsap.core.Timeline,
  copyRoot: HTMLElement | null,
  segStart: number,
  segEnd: number,
  selectors: {
    mask: string;
    fade: string;
  },
) {
  if (!copyRoot) return;

  const masks = copyRoot.querySelectorAll<HTMLElement>(selectors.mask);
  const fadeItems = copyRoot.querySelectorAll<HTMLElement>(selectors.fade);

  gsap.set(masks, { yPercent: 108, opacity: 0 });
  gsap.set(fadeItems, { opacity: 0, y: 18 });
  gsap.set(copyRoot, { visibility: "hidden", pointerEvents: "none" });

  const inStart = segStart;
  const outStart = segEnd - COPY_OUT * 0.5;

  tl.set(copyRoot, { visibility: "visible" }, inStart);
  tl.set(copyRoot, { pointerEvents: "auto" }, inStart);

  masks.forEach((mask, i) => {
    const stagger = (i / Math.max(masks.length, 1)) * (COPY_IN * 0.55);
    tl.to(
      mask,
      { yPercent: 0, opacity: 1, duration: COPY_IN * 0.45, ease: "none" },
      inStart + stagger,
    );
  });

  fadeItems.forEach((item, i) => {
    tl.to(
      item,
      { opacity: 1, y: 0, duration: COPY_IN * 0.5, ease: "none" },
      inStart + COPY_IN * 0.35 + i * 0.012,
    );
  });

  tl.to(masks, { yPercent: -108, opacity: 0, duration: COPY_OUT, ease: "none" }, outStart);
  tl.to(fadeItems, { opacity: 0, y: -12, duration: COPY_OUT * 0.85, ease: "none" }, outStart);
  tl.set(copyRoot, { visibility: "hidden", pointerEvents: "none" }, segEnd);
}

export function bindIndexMeter(
  tl: gsap.core.Timeline,
  root: HTMLElement,
  count: number,
  selectors: {
    meter: string;
    ink: string;
    current: string;
    fadeAt?: number;
  },
) {
  const meter = root.querySelector<HTMLElement>(selectors.meter);
  const ink = root.querySelector<SVGLineElement>(selectors.ink);
  const current = root.querySelector<HTMLElement>(selectors.current);
  const fadeAt = selectors.fadeAt ?? 0.97;

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

  tl.to(meter, { opacity: 0, duration: 0.04, ease: "none" }, fadeAt);
}
