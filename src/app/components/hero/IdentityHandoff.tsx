import { profile } from "@portfolio/shared/content";
import { motion } from "motion/react";

/** First copy — floats over the project mosaic. */
export function IdentityHandoff() {
  return (
    <section
      id="frame-01"
      className="relative z-10 flex min-h-[100vh] flex-col justify-end px-6 pb-16 pt-28 md:px-24 md:pb-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{ maxWidth: 720 }}
      >
        <p className="pf-mono mb-5" style={{ color: "var(--pf-hot)", fontSize: 10, letterSpacing: "0.2em" }}>
          {profile.status}
        </p>
        <h1
          className="pf-h1"
          style={{
            fontSize: "clamp(3rem, 10vw, 6.5rem)",
            fontWeight: 600,
            letterSpacing: "0.02em",
            lineHeight: 0.95,
            textTransform: "uppercase",
            color: "var(--pf-paper)",
            textShadow: "0 2px 40px rgba(0,0,0,0.45)",
            paddingInline: "0.05em",
          }}
        >
          Ahmed
        </h1>
        <p
          className="pf-mono mt-4"
          style={{
            fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(240,237,228,0.55)",
          }}
        >
          Mohsen Mostafa · Brussels
        </p>
        <p
          className="pf-lede mt-8"
          style={{
            maxWidth: "40ch",
            color: "rgba(240,237,228,0.82)",
            fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
            lineHeight: 1.55,
          }}
        >
          {profile.heroFine}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#frame-04" className="pf-btn">
            View Projects
          </a>
          <a href="/resume.pdf" className="pf-btn pf-btn-ghost" style={{ color: "var(--pf-paper)", borderColor: "rgba(240,237,228,0.35)" }}>
            Download CV
          </a>
        </div>
      </motion.div>
    </section>
  );
}
