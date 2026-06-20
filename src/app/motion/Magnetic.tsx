import { motion, useMotionValue, useSpring } from "motion/react";
import { ReactNode, useRef } from "react";
import { useMotionMode } from "./MotionMode";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  /** Pointer pull radius in px. */
  radius?: number;
  /** Pull strength 0-1. */
  strength?: number;
};

/** Wraps a button-like element with magnetic pointer pull. Spring physics. */
export function Magnetic({ children, onClick, className, style, radius = 90, strength = 0.32 }: Props) {
  const { spring, skipEntry } = useMotionMode();
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  function onMove(e: React.PointerEvent) {
    if (skipEntry || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist > radius) {
      x.set(0); y.set(0);
      return;
    }
    x.set(dx * strength);
    y.set(dy * strength);
  }
  function onLeave() {
    x.set(0); y.set(0);
  }

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={className}
      style={{ x: sx, y: sy, ...style }}
    >
      {children}
    </motion.button>
  );
}
