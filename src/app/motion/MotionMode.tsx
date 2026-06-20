import { createContext, useContext, ReactNode } from "react";

export type MotionMode = "quick" | "slow";

type Ease = [number, number, number, number];

type Ctx = {
  mode: MotionMode;
  /** Quick mode skips entry choreography — render final states immediately, animate only state changes. */
  skipEntry: boolean;
  /** Base duration in seconds, scaled by mode. */
  d: (slow: number, quick?: number) => number;
  /** Stagger delay between siblings, scaled by mode. */
  stagger: number;
  /** Easing taxonomy — different intents, different curves. */
  easeOut: Ease;   // arrival, entry
  easeIn: Ease;    // departure, exit
  easeStrong: Ease; // cinematic cut, curtain
  spring: { type: "spring"; stiffness: number; damping: number; mass?: number };
};

const defaults: Ctx = {
  mode: "slow",
  skipEntry: false,
  d: (s) => s,
  stagger: 0.08,
  easeOut: [0.22, 1, 0.36, 1],
  easeIn: [0.65, 0, 0.35, 1],
  easeStrong: [0.76, 0, 0.24, 1],
  spring: { type: "spring", stiffness: 380, damping: 28 },
};

const MotionModeCtx = createContext<Ctx>(defaults);

export function MotionModeProvider({ mode, children }: { mode: MotionMode; children: ReactNode }) {
  const value: Ctx = {
    ...defaults,
    mode,
    skipEntry: mode === "quick",
    d: (slow, quick) => (mode === "quick" ? (quick ?? slow * 0.35) : slow),
    stagger: mode === "quick" ? 0 : 0.085,
  };
  return <MotionModeCtx.Provider value={value}>{children}</MotionModeCtx.Provider>;
}

export function useMotionMode() {
  return useContext(MotionModeCtx);
}
