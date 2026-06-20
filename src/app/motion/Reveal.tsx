import { motion } from "motion/react";
import { ReactNode } from "react";
import { useMotionMode } from "./MotionMode";

type Common = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
  once?: boolean;
};

/** Used for moments that should always reveal (headlines, signature beats). Honors Quick = skip. */
export function Reveal({ children, delay = 0, y = 14, className, style, once = true }: Common) {
  const { d, easeOut, skipEntry } = useMotionMode();
  if (skipEntry) return <div className={className} style={style}>{children}</div>;
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px -10% 0px" }}
      transition={{ duration: d(0.7, 0.28), delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  index,
  children,
  y = 14,
  className,
  style,
}: { index: number; children: ReactNode; y?: number; className?: string; style?: React.CSSProperties }) {
  const { d, easeOut, stagger, skipEntry } = useMotionMode();
  if (skipEntry) return <div className={className} style={style}>{children}</div>;
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: d(0.55, 0.22), delay: index * stagger, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

/** Headline clip-mask reveal — full line arrives as one decisive motion (no word stagger). */
export function ClipReveal({
  children,
  delay = 0,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { d, easeOut, skipEntry } = useMotionMode();
  if (skipEntry) return <span className={className} style={style}>{children}</span>;
  return (
    <motion.span
      className={className}
      style={{ display: "inline-block", ...style }}
      initial={{ clipPath: "inset(0 0 100% 0)", y: "0.2em" }}
      animate={{ clipPath: "inset(0 0 0% 0)", y: 0 }}
      transition={{ duration: d(0.7, 0.3), delay, ease: easeOut }}
    >
      {children}
    </motion.span>
  );
}
