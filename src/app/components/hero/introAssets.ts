import { introRollExhibits } from "../../data/featuredExhibits";
import { HERO_PORTRAIT_IMAGE } from "../../data/heroPortrait";

const FONT_READY_MS = 1200;

export function preloadIntroImages(): Promise<void> {
  const sources = [
    ...introRollExhibits.map((exhibit) => exhibit.image),
    HERO_PORTRAIT_IMAGE,
  ];
  return Promise.all(
    sources.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.decoding = "async";
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = src;
        }),
    ),
  ).then(() => undefined);
}

export async function decodeIntroImages(): Promise<void> {
  const sources = [
    ...introRollExhibits.map((exhibit) => exhibit.image),
    HERO_PORTRAIT_IMAGE,
  ];
  await Promise.all(
    sources.map(async (src) => {
      try {
        const img = new Image();
        img.src = src;
        if (img.decode) await img.decode();
      } catch {
        /* non-blocking */
      }
    }),
  );
}

export function waitFontsReady(timeoutMs = FONT_READY_MS): Promise<void> {
  if (typeof document === "undefined" || !document.fonts?.ready) {
    return Promise.resolve();
  }
  return Promise.race([
    document.fonts.ready.then(() => undefined),
    new Promise<void>((resolve) => setTimeout(resolve, timeoutMs)),
  ]);
}

export function prefersSaveData(): boolean {
  if (typeof navigator === "undefined") return false;
  const conn = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (!conn) return false;
  if (conn.saveData) return true;
  return conn.effectiveType === "slow-2g" || conn.effectiveType === "2g";
}
