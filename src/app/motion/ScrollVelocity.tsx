import { useEffect } from "react";
import gsap from "../../lib/gsapClient";

export function ScrollVelocitySkew() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ticker = () => {
      const velocity = window.__lenisVelocity ?? 0;
      const skew = Math.min(Math.max(velocity * 0.04, -1.5), 1.5);
      gsap.utils.toArray<HTMLElement>("[data-skew]").forEach((el) => {
        gsap.set(el, { skewY: skew });
      });
    };

    gsap.ticker.add(ticker);
    return () => gsap.ticker.remove(ticker);
  }, []);

  return null;
}
