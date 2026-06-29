import { useEffect, useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "../../../lib/gsapClient";
import type { HeroRevealProject } from "../../data/heroRevealProjects";
import {
  cardHitsZones,
  clampRevealPoint,
  cursorInZones,
  getProjectRestrictedZones,
  revealCardRect,
} from "./projectCursorZones";

const FOLLOW = 0.68;
const ZONE_SIGMA = 0.2;

type Props = {
  projects: HeroRevealProject[];
  className?: string;
  eventHostRef?: RefObject<HTMLElement | null>;
  enabled?: boolean;
};

export function ProjectCursorReveal({
  projects,
  className = "",
  eventHostRef,
  enabled = true,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const quoteTextRef = useRef<HTMLParagraphElement>(null);
  const quoteCiteRef = useRef<HTMLElement>(null);
  const quoteBlockRef = useRef<HTMLQuoteElement>(null);
  const onRef = useRef(false);
  const trailRef = useRef(false);

  useEffect(() => {
    projects.forEach((p) => {
      const img = new Image();
      img.src = p.image;
    });
  }, [projects]);

  useGSAP(
    () => {
      if (!enabled) return;

      const root = rootRef.current;
      const stage = stageRef.current;
      const host = eventHostRef?.current ?? root?.parentElement;
      if (!root || !stage || !host || projects.length === 0) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const reveal = root.querySelector<HTMLElement>(".project-cursor__reveal");
      const trail = root.querySelector<HTMLElement>(".project-cursor__trail");
      const trailDots = root.querySelectorAll<HTMLElement>(".project-cursor__trail-dot");
      const revealCards = root.querySelectorAll<HTMLElement>(".project-cursor__card");

      if (reduced) {
        if (reveal) gsap.set(reveal, { opacity: 0 });
        if (trail) gsap.set(trail, { opacity: 0 });
        return;
      }

      let lastDominant = 0;
      const pointer = { x: 0.5, y: 0.45, tx: 0.5, ty: 0.45, cx: 0, cy: 0 };

      const syncQuote = (index: number) => {
        const project = projects[index];
        if (!project?.testimonial) {
          if (quoteBlockRef.current) quoteBlockRef.current.hidden = true;
          return;
        }
        if (quoteBlockRef.current) quoteBlockRef.current.hidden = false;
        if (quoteTextRef.current) quoteTextRef.current.textContent = project.testimonial.quote;
        if (quoteCiteRef.current) quoteCiteRef.current.textContent = project.testimonial.attribution;
      };

      syncQuote(0);
      window.dispatchEvent(new CustomEvent("hero:project-active", { detail: { index: 0 } }));

      const setPointer = (clientX: number, clientY: number) => {
        const rect = stage.getBoundingClientRect();
        if (rect.width < 1 || rect.height < 1) return;
        pointer.cx = clientX;
        pointer.cy = clientY;
        pointer.tx = gsap.utils.clamp(0.06, 0.94, (clientX - rect.left) / rect.width);
        pointer.ty = gsap.utils.clamp(0.14, 0.86, (clientY - rect.top) / rect.height);
      };

      const onEnter = () => {
        onRef.current = true;
        root.classList.add("project-cursor--on");
      };
      const onLeave = () => {
        onRef.current = false;
        root.classList.remove("project-cursor--on", "project-cursor--trail");
        trailRef.current = false;
        if (reveal) gsap.set(reveal, { opacity: 0 });
        if (trail) gsap.set(trail, { opacity: 0 });
      };
      const onMove = (e: MouseEvent) => setPointer(e.clientX, e.clientY);
      const onTouch = (e: TouchEvent) => {
        const t = e.touches[0];
        if (t) setPointer(t.clientX, t.clientY);
      };

      host.addEventListener("mouseenter", onEnter);
      host.addEventListener("mouseleave", onLeave);
      host.addEventListener("mousemove", onMove, { passive: true });
      host.addEventListener("touchstart", onTouch, { passive: true });
      host.addEventListener("touchmove", onTouch, { passive: true });

      const zoneWeight = (nx: number, zone: number) =>
        Math.exp(-((nx - zone) ** 2) / (2 * ZONE_SIGMA * ZONE_SIGMA));

      const collectZones = () => {
        const header = document.getElementById("hero-site-header");
        const zones = getProjectRestrictedZones(host);
        if (header) zones.push(...getProjectRestrictedZones(header));
        return zones;
      };

      const tick = () => {
        if (!onRef.current) return;

        pointer.x += (pointer.tx - pointer.x) * FOLLOW;
        pointer.y += (pointer.ty - pointer.y) * FOLLOW;

        let dominant = 0;
        let maxW = 0;
        projects.forEach((project, i) => {
          const w = zoneWeight(pointer.x, project.zone);
          if (w > maxW) {
            maxW = w;
            dominant = i;
          }
        });

        if (dominant !== lastDominant) {
          lastDominant = dominant;
          syncQuote(dominant);
          window.dispatchEvent(
            new CustomEvent("hero:project-active", { detail: { index: dominant } }),
          );
        }

        const strength = gsap.utils.clamp(0, 1, maxW * 3.4);
        const rect = stage.getBoundingClientRect();
        const zones = collectZones();

        let px = pointer.x * rect.width;
        let py = pointer.y * rect.height;

        if (!reveal || strength < 0.04) {
          gsap.set(reveal, { opacity: 0 });
          if (trail) gsap.set(trail, { opacity: 0 });
          return;
        }

        const cardW = reveal.offsetWidth || 300;
        const cardH = reveal.offsetHeight || 240;
        const clamped = clampRevealPoint(px, py, cardW, cardH, rect, zones);
        px = clamped.px;
        py = clamped.py;

        const cardRect = revealCardRect(rect, px, py, cardW, cardH);
        const useTrail = cursorInZones(pointer.cx, pointer.cy, zones) || cardHitsZones(cardRect, zones);

        if (useTrail) {
          gsap.set(reveal, { opacity: 0, scale: 1 });
          if (trail) {
            const lx = pointer.cx - rect.left;
            const ly = pointer.cy - rect.top;
            gsap.set(trail, { opacity: 0.7 });
            trailDots.forEach((dot, i) => {
              gsap.set(dot, {
                x: lx - i * 5,
                y: ly - i * 3,
                xPercent: -50,
                yPercent: -50,
                opacity: 0.5 - i * 0.08,
                scale: 1 - i * 0.12,
              });
            });
          }
          if (!trailRef.current) {
            trailRef.current = true;
            root.classList.add("project-cursor--trail");
          }
        } else {
          if (trail) gsap.set(trail, { opacity: 0 });
          if (trailRef.current) {
            trailRef.current = false;
            root.classList.remove("project-cursor--trail");
          }

          revealCards.forEach((card, i) => {
            gsap.set(card, { opacity: i === dominant ? strength : 0 });
          });

          gsap.set(reveal, {
            x: px,
            y: py,
            xPercent: -50,
            yPercent: -40,
            opacity: strength,
            scale: 0.94 + strength * 0.06,
            force3D: true,
          });
        }
      };

      gsap.ticker.add(tick);

      return () => {
        host.removeEventListener("mouseenter", onEnter);
        host.removeEventListener("mouseleave", onLeave);
        host.removeEventListener("mousemove", onMove);
        host.removeEventListener("touchstart", onTouch);
        host.removeEventListener("touchmove", onTouch);
        gsap.ticker.remove(tick);
        root.classList.remove("project-cursor--on", "project-cursor--trail");
      };
    },
    { scope: rootRef, dependencies: [projects, enabled] },
  );

  return (
    <div
      ref={rootRef}
      className={["project-cursor", className].filter(Boolean).join(" ")}
      aria-hidden
    >
      <div ref={stageRef} className="project-cursor__stage">
        <div className="project-cursor__zone-hints pf-mono">
          {projects.map((p) => (
            <span
              key={p.id}
              className="project-cursor__zone-hint"
              style={{ left: `${p.zone * 100}%` }}
            />
          ))}
        </div>

        <div className="project-cursor__trail">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className="project-cursor__trail-dot" />
          ))}
        </div>

        <div className="project-cursor__reveal">
          <div className="project-cursor__stack">
            {projects.map((project) => (
              <a
                key={project.id}
                href={project.href}
                className="project-cursor__card"
                tabIndex={-1}
              >
                <div className="project-cursor__mat">
                  <img src={project.image} alt="" className="project-cursor__img" draggable={false} />
                </div>
                <div className="project-cursor__meta pf-mono">
                  <span className="project-cursor__index">{project.index}</span>
                  <span className="project-cursor__title">{project.title}</span>
                  <span className="project-cursor__eyebrow">{project.eyebrow}</span>
                </div>
              </a>
            ))}
          </div>

          <blockquote ref={quoteBlockRef} className="project-cursor__quote">
            <p ref={quoteTextRef} />
            <cite ref={quoteCiteRef} className="pf-mono" />
          </blockquote>
        </div>
      </div>
    </div>
  );
}
