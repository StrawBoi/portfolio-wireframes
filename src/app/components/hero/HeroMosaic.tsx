import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "../../../lib/gsapClient";
import { landingReel } from "@portfolio/shared/content";

import "../../../styles/hero-mosaic.css";

const FILM_POOL = [
  landingReel[0],
  landingReel[1],
  landingReel[2],
  { id: "cinematek", image: "/projects/cinematek/cinematek-campaign-board-mockup.png", accent: "#FF5722" },
  { id: "mosol", image: "/projects/mosol/main-poster-thumbnail.png", accent: "#7000FF" },
  { id: "tackle", image: "/projects/tackle/tackle-mockup.png", accent: "#FF2D78" },
] as const;

const TRACKS = [
  { speed: 28, reverse: false, offset: 0 },
  { speed: 38, reverse: true, offset: 2 },
  { speed: 22, reverse: false, offset: 4 },
] as const;

function buildRow(offset: number) {
  const ordered = [...FILM_POOL.slice(offset), ...FILM_POOL.slice(0, offset)];
  return [...ordered, ...ordered];
}

type Props = {
  visible: boolean;
};

export function HeroMosaic({ visible }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const scan = scanRef.current;
      if (!root || !visible) return;

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const rows = root.querySelectorAll<HTMLElement>(".hero-mosaic__row");
      const frames = root.querySelectorAll<HTMLElement>(".hero-mosaic__frame");
      const imgs = root.querySelectorAll<HTMLImageElement>(".hero-mosaic__frame img");

      if (prefersReduced) return;

      const master = gsap.timeline({ repeat: -1 });

      rows.forEach((row, i) => {
        const track = TRACKS[i];
        const half = row.scrollWidth / 2;
        gsap.set(row, { x: track.reverse ? -half : 0 });
        master.to(
          row,
          {
            x: track.reverse ? 0 : -half,
            duration: track.speed,
            ease: "none",
          },
          0
        );
      });

      imgs.forEach((img, i) => {
        gsap.to(img, {
          scale: 1.14,
          duration: 6 + (i % 4) * 1.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      let litIndex = 0;
      const cycleLit = () => {
        frames.forEach((f) => f.classList.remove("is--lit"));
        if (frames.length) frames[litIndex % frames.length].classList.add("is--lit");
        litIndex += 1;
      };
      cycleLit();
      const litTimer = gsap.timeline({ repeat: -1, onRepeat: cycleLit });
      litTimer.to({}, { duration: 2.2 });

      if (scan) {
        gsap.fromTo(
          scan,
          { top: "-2%" },
          { top: "102%", duration: 5.5, ease: "none", repeat: -1 }
        );
      }

      gsap.to(root.querySelector(".hero-mosaic__tracks"), {
        y: "3%",
        duration: 8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      return () => {
        master.kill();
        litTimer.kill();
        gsap.killTweensOf([...rows, ...imgs, scan, root.querySelector(".hero-mosaic__tracks")]);
        frames.forEach((f) => f.classList.remove("is--lit"));
      };
    },
    { scope: rootRef, dependencies: [visible], revertOnUpdate: true }
  );

  return (
    <div ref={rootRef} className={`hero-mosaic${visible ? " is--visible" : ""}`} aria-hidden>
      <div className="hero-mosaic__tracks">
        {TRACKS.map((track, ti) => (
          <div key={ti} className="hero-mosaic__track">
            <div className="hero-mosaic__row">
              {buildRow(track.offset).map((project, fi) => (
                <div key={`${ti}-${project.id}-${fi}`} className="hero-mosaic__frame">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt=""
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement!.style.background = `linear-gradient(145deg, ${project.accent}44 0%, #001621 80%)`;
                      }}
                    />
                  ) : (
                    <div className="h-full w-full" style={{ background: `linear-gradient(145deg, ${project.accent}44 0%, #001621 80%)` }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div ref={scanRef} className="hero-mosaic__scan" />
      <div className="hero-mosaic__veil" />
      <div className="hero-mosaic__grain" />
    </div>
  );
}
