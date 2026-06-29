import { type CSSProperties, type ReactNode } from "react";
import { motion } from "motion/react";
import { useMotionMode } from "./MotionMode";

type BaseProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
};

export function SequenceReveal({ children, className, style, delay = 0 }: BaseProps) {
  const { d, easeOut, skipEntry } = useMotionMode();
  if (skipEntry) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: d(0.5, 0.2), delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

export function LineReveal({ children, className, style, delay = 0 }: BaseProps) {
  const { d, easeOut, skipEntry } = useMotionMode();
  if (skipEntry) {
    return (
      <span className={className} style={style}>
        {children}
      </span>
    );
  }

  return (
    <span className="line-reveal-wrapper" style={{ overflow: "hidden", display: "block" }}>
      <motion.span
        className={className}
        style={{ ...style, display: "block" }}
        initial={{ yPercent: 100 }}
        whileInView={{ yPercent: 0 }}
        viewport={{ once: true }}
        transition={{ duration: d(0.45, 0.18), delay, ease: easeOut }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function WordReveal({ children, className, delay = 0 }: Omit<BaseProps, "style">) {
  const { d, easeOut, skipEntry, stagger } = useMotionMode();
  const text = typeof children === "string" ? children : "";
  const words = text.split(/\s+/).filter(Boolean);

  if (skipEntry || words.length === 0) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span className={className} style={{ display: "inline" }}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="line-reveal-wrapper"
          style={{ overflow: "hidden", display: "inline-block", verticalAlign: "top" }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ yPercent: 100 }}
            whileInView={{ yPercent: 0 }}
            viewport={{ once: true }}
            transition={{ duration: d(0.55, 0.22), delay: delay + i * stagger, ease: easeOut }}
          >
            {word}
            {i < words.length - 1 ? "\u00a0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
