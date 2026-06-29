import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 25 });
  const sy = useSpring(y, { stiffness: 300, damping: 25 });
  const ix = useSpring(x, { stiffness: 500, damping: 30 });
  const iy = useSpring(y, { stiffness: 500, damping: 30 });
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReduced) return;

    setEnabled(true);
    document.body.classList.add("pf-custom-cursor");

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };

    const onHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorType = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      cursorRef.current?.setAttribute("data-state", cursorType || "default");
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onHover);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onHover);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("pf-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className="pf-cursor"
      data-state="default"
      style={{ opacity: visible ? 1 : 0 }}
      aria-hidden
    >
      <motion.div className="pf-cursor__outer" style={{ x: sx, y: sy }} />
      <motion.div className="pf-cursor__inner" style={{ x: ix, y: iy }} />
    </div>
  );
}
