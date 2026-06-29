import { useCallback, useRef, useState, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "../../lib/gsapClient";

const DOSSIER_TABS = [
  { id: "scan", label: "Scan", target: "frame-01-sequence" },
  { id: "exhibits", label: "Exhibits", target: "featured-exhibits", endTarget: "method" },
  { id: "method", label: "Method", target: "method", endTarget: "proof" },
  { id: "proof", label: "Proof", target: "proof", endTarget: "frame-05" },
  { id: "contact", label: "Contact", target: "frame-07" },
] as const;

type TabId = (typeof DOSSIER_TABS)[number]["id"];

type Props = {
  active?: boolean;
};

export function DossierEdgeMarks({ active = true }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const [inRange, setInRange] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("scan");

  const scrollToTab = useCallback((target: string) => {
  const pinTargets: Record<string, string> = {
    "featured-exhibits": "featured-exhibits-stage",
    method: "method-stage",
    proof: "proof",
  };
    const pinId = pinTargets[target];
    const el = document.getElementById(pinId ?? target);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: pinId ? "center" : "start" });
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  useGSAP(
    () => {
      if (!active) return;

      const start = document.getElementById("frame-01-sequence");
      const end = document.getElementById("frame-07");
      if (!start || !end) return;

      const triggers: ScrollTrigger[] = [];

      const rangeSt = ScrollTrigger.create({
        trigger: start,
        start: "top top",
        endTrigger: end,
        end: "bottom bottom",
        onEnter: () => setInRange(true),
        onLeave: () => setInRange(false),
        onEnterBack: () => setInRange(true),
        onLeaveBack: () => setInRange(false),
      });
      triggers.push(rangeSt);
      if (rangeSt.isActive) setInRange(true);

      DOSSIER_TABS.forEach((tab) => {
        const el = document.getElementById(tab.target);
        if (!el) return;

        const endEl = tab.endTarget ? document.getElementById(tab.endTarget) : null;

        const st = ScrollTrigger.create({
          trigger: el,
          start: "top 52%",
          ...(endEl
            ? { endTrigger: endEl, end: "bottom 48%" }
            : { end: "bottom 48%" }),
          onEnter: () => setActiveTab(tab.id),
          onEnterBack: () => setActiveTab(tab.id),
        });
        triggers.push(st);
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        triggers.forEach((st) => st.kill());
      };
    },
    { dependencies: [active] },
  );

  if (!active) return null;

  return (
    <nav
      ref={rootRef}
      className={["dossier-edge", inRange ? "dossier-edge--live" : ""].filter(Boolean).join(" ")}
      aria-label="Portfolio dossier sections"
    >
      <p className="dossier-edge__file pf-mono" aria-hidden>
        File
      </p>
      <ul className="dossier-edge__tabs">
        {DOSSIER_TABS.map((tab, index) => {
          const isActive = activeTab === tab.id;
          return (
            <li key={tab.id} className="dossier-edge__item">
              <button
                type="button"
                className={["dossier-edge__tab", "pf-mono", isActive ? "is-active" : ""]
                  .filter(Boolean)
                  .join(" ")}
                style={{ "--tab-stagger": index } as CSSProperties}
                onClick={() => scrollToTab(tab.target)}
                aria-current={isActive ? "true" : undefined}
              >
                <span className="dossier-edge__tab-label">{tab.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
