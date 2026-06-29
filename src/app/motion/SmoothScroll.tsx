import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "../../lib/gsapClient";
import { ScrollTrigger } from "../../lib/gsapClient";

declare global {
  interface Window {
    __lenisVelocity?: number;
  }
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.45,
      syncTouch: true,
    });

    const root = document.documentElement;

    ScrollTrigger.scrollerProxy(root, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: root.style.transform ? "transform" : "fixed",
    });

    lenis.on("scroll", ScrollTrigger.update);
    lenis.on("scroll", (e: { velocity: number }) => {
      window.__lenisVelocity = e.velocity;
    });

    const onLenisRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onLenisRefresh);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 250);
    };
    window.addEventListener("resize", onResize);

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      ScrollTrigger.removeEventListener("refresh", onLenisRefresh);
      ScrollTrigger.scrollerProxy(root, {});
      gsap.ticker.remove(raf);
      lenis.destroy();
      window.__lenisVelocity = 0;
    };
  }, []);

  return <>{children}</>;
}
