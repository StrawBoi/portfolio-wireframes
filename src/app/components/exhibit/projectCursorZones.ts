const PAD = 8;

function expand(rect: DOMRect, pad: number): DOMRect {
  return new DOMRect(rect.left - pad, rect.top - pad, rect.width + pad * 2, rect.height + pad * 2);
}

function isVisible(el: Element): boolean {
  const style = getComputedStyle(el);
  return style.visibility !== "hidden" && parseFloat(style.opacity) > 0.05;
}

function overlaps(a: DOMRect, b: DOMRect): boolean {
  return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
}

function pointInRect(x: number, y: number, r: DOMRect): boolean {
  return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
}

export function getProjectRestrictedZones(scope: HTMLElement): DOMRect[] {
  const zones: DOMRect[] = [];

  if (scope.hasAttribute("data-cursor-block") && isVisible(scope)) {
    zones.push(expand(scope.getBoundingClientRect(), PAD));
  }

  scope.querySelectorAll<HTMLElement>("[data-cursor-block]").forEach((el) => {
    if (isVisible(el)) zones.push(expand(el.getBoundingClientRect(), PAD));
  });

  return zones;
}

export function revealCardRect(
  stageRect: DOMRect,
  px: number,
  py: number,
  cardW: number,
  cardH: number,
): DOMRect {
  const cx = stageRect.left + px;
  const cy = stageRect.top + py;
  return new DOMRect(cx - cardW * 0.5, cy - cardH * 0.42, cardW, cardH);
}

export function cursorInZones(clientX: number, clientY: number, zones: DOMRect[]): boolean {
  return zones.some((z) => pointInRect(clientX, clientY, z));
}

export function cardHitsZones(card: DOMRect, zones: DOMRect[]): boolean {
  return zones.some((z) => overlaps(card, z));
}

export function clampRevealPoint(
  px: number,
  py: number,
  cardW: number,
  cardH: number,
  stageRect: DOMRect,
  zones: DOMRect[],
): { px: number; py: number } {
  let x = px;
  let y = py;

  for (let i = 0; i < 16; i++) {
    const card = revealCardRect(stageRect, x, y, cardW, cardH);
    const hit = zones.find((z) => overlaps(card, z));
    if (!hit) return { px: x, py: y };

    const cy = stageRect.top + y;
    if (hit.top <= stageRect.top + stageRect.height * 0.38) {
      y += 16;
      continue;
    }
    if (hit.bottom >= stageRect.bottom - stageRect.height * 0.22) {
      y -= 16;
      continue;
    }
    const zcy = hit.top + hit.height / 2;
    y += cy < zcy ? -14 : 14;
  }

  return { px: x, py: y };
}
