import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "../../lib/gsapClient";
import { useMotionMode } from "../motion/MotionMode";

const STORAGE_KEY = "pf-loader-done";

type Props = {
  onComplete: () => void;
};

export function Loader({ onComplete }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const monogramRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { easeOut, easeStrong, d } = useMotionMode();
  const [visible, setVisible] = useState(() => sessionStorage.getItem(STORAGE_KEY) !== "1");

  useEffect(() => {
    if (!visible) onComplete();
  }, [visible, onComplete]);

  useGSAP(
    () => {
      if (!visible || !rootRef.current) return;

      const finish = () => {
        sessionStorage.setItem(STORAGE_KEY, "1");
        setVisible(false);
        onComplete();
      };

      const skip = () => {
        gsap.killTweensOf(rootRef.current);
        gsap.to(rootRef.current, {
          opacity: 0,
          duration: 0.15,
          onComplete: finish,
        });
      };

      const onKey = () => skip();
      const onClick = () => skip();
      window.addEventListener("keydown", onKey, { once: true });
      rootRef.current.addEventListener("click", onClick, { once: true });

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        finish();
        return () => {
          window.removeEventListener("keydown", onKey);
          rootRef.current?.removeEventListener("click", onClick);
        };
      }

      const tl = gsap.timeline({ onComplete: finish });
      tl.fromTo(monogramRef.current, { opacity: 0 }, { opacity: 1, duration: d(0.35, 0.12), ease: easeOut })
        .fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: d(0.25, 0.1), ease: easeStrong }, "-=0.1")
        .to(rootRef.current, { opacity: 0, duration: d(0.2, 0.08), ease: "power2.out" }, "+=0.05");

      const autoSkip = window.setTimeout(skip, 900);

      return () => {
        window.clearTimeout(autoSkip);
        window.removeEventListener("keydown", onKey);
        rootRef.current?.removeEventListener("click", onClick);
        tl.kill();
      };
    },
    { scope: rootRef, dependencies: [visible] }
  );

  if (!visible) return null;

  return (
    <div ref={rootRef} className="pf-loader" role="status" aria-label="Loading">
      <div ref={monogramRef} className="pf-loader__monogram">
        AMM
      </div>
      <div ref={lineRef} className="pf-loader__line pf-loader__line--solo" aria-hidden />
    </div>
  );
}
