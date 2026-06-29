import gsap from "../../../lib/gsapClient";

type CarouselRole = "center" | "left" | "right" | "far";

function carouselRole(itemIndex: number, activeIndex: number, count: number): CarouselRole {
  let diff = itemIndex - activeIndex;
  if (diff > count / 2) diff -= count;
  if (diff < -count / 2) diff += count;
  if (diff === 0) return "center";
  if (diff === -1) return "left";
  if (diff === 1) return "right";
  return "far";
}

function carouselOffset(role: CarouselRole, spread: number): number {
  if (role === "left") return -spread;
  if (role === "right") return spread;
  return 0;
}

export type CarouselKeyframeProps = {
  scale: number;
  opacity: number;
  zIndex: number;
  filter: string;
};

export function bindCarouselKeyframes(
  tl: gsap.core.Timeline,
  items: HTMLElement[],
  count: number,
  roleProps: Record<CarouselRole, CarouselKeyframeProps>,
  spreadFn: () => number = () => Math.min(window.innerWidth * 0.3, 420),
) {
  const marks = Array.from({ length: count }, (_, i) => i / Math.max(count - 1, 1));

  items.forEach((item, itemIndex) => {
    marks.forEach((t, activeIndex) => {
      const role = carouselRole(itemIndex, activeIndex, count);
      const props = roleProps[role];
      const values = {
        x: () => carouselOffset(role, spreadFn()),
        scale: props.scale,
        opacity: props.opacity,
        zIndex: props.zIndex,
        filter: props.filter,
      };

      if (activeIndex === 0) {
        tl.set(item, values, 0);
      } else {
        const prev = marks[activeIndex - 1];
        tl.to(item, { ...values, duration: t - prev, ease: "none" }, prev);
      }
    });
  });
}
