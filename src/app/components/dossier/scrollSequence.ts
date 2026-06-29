export const SCRUB_SMOOTH = 0.42;
export const SCROLL_VH_DESKTOP = 0.88;
export const SCROLL_VH_MOBILE = 0.68;

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function isMobileViewport(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
}

export function pinScrollDistance(): number {
  const vh = isMobileViewport() ? SCROLL_VH_MOBILE : SCROLL_VH_DESKTOP;
  return Math.round(window.innerHeight * vh);
}

export function siteHeaderOffset(): number {
  if (typeof document === "undefined") return 64;
  const header = document.getElementById("hero-site-header");
  return header?.offsetHeight ?? 64;
}

/** Pin start below fixed site header */
export function pinStartBelowHeader(): string {
  return `top top+=${siteHeaderOffset()}`;
}

/** Viewport height minus header — for centered cinema frames */
export function cinemaViewportHeight(): number {
  return Math.max(320, window.innerHeight - siteHeaderOffset());
}
