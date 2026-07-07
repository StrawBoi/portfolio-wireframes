import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "../../../lib/gsapClient";
import {
  campaignGridCells,
  campaignGridPeekFrom,
  heroScrollPick,
} from "../../social/socialGridData";
import { bindCampaignGridSequence } from "./useCampaignGridSequence";

function GridCell({
  cell,
  peek,
  pick,
}: {
  cell: (typeof campaignGridCells)[number];
  peek: boolean;
  pick: boolean;
}) {
  return (
    <article
      className={[
        "campaign-grid__cell",
        `campaign-grid__cell--${cell.layout}`,
        peek ? "campaign-grid__cell--peek" : "",
        pick ? "campaign-grid__cell--pick" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      data-cell={cell.id}
    >
      {cell.video ? (
        <video
          className="campaign-grid__media"
          poster={cell.image}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          {cell.videoWebm ? <source src={cell.videoWebm} type="video/webm" /> : null}
          <source src={cell.video} type="video/mp4" />
        </video>
      ) : (
        <img src={cell.image} alt="" className="campaign-grid__media" loading="lazy" />
      )}
      <div className="campaign-grid__meta">
        <span className="campaign-grid__eyebrow pf-mono">{cell.eyebrow}</span>
        <span className="campaign-grid__title">{cell.title}</span>
      </div>
    </article>
  );
}

export function CampaignGrid() {
  const rootRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const flipGhostRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const grid = gridRef.current;
      const flipGhost = flipGhostRef.current;
      const stage = root?.querySelector<HTMLElement>("[data-campaign-stage]");
      if (!root || !grid || !flipGhost) return;

      const pick = grid.querySelector<HTMLElement>(
        `[data-cell="${heroScrollPick.cellId}"]`,
      );
      if (!pick) return;

      const peekCells = gsap.utils.toArray<HTMLElement>(
        ".campaign-grid__cell--peek",
        grid,
      );

      return bindCampaignGridSequence({
        root,
        grid,
        pickCell: pick,
        peekCells,
        flipGhost,
        stage,
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="campaign-grid"
      className="campaign-grid"
      aria-labelledby="campaign-grid-heading"
    >
      <header className="campaign-grid__header">
        <p id="campaign-grid-heading" className="campaign-grid__label pf-mono">
          Campaign feed
        </p>
        <p className="campaign-grid__lede">Three campaigns — one feed. Strategy, craft, and proof in motion.</p>
      </header>

      <div className="campaign-grid__stage" data-campaign-stage>
        <div ref={gridRef} className="campaign-grid__grid" id="social-projects-gallery">
          {campaignGridCells.map((cell, i) => (
            <GridCell
              key={cell.id}
              cell={cell}
              peek={i >= campaignGridPeekFrom}
              pick={cell.id === heroScrollPick.cellId}
            />
          ))}
        </div>
        <div className="campaign-grid__veil" aria-hidden>
          <p className="campaign-grid__veil-copy pf-mono">Scroll for full gallery</p>
        </div>
      </div>

      <div ref={flipGhostRef} className="campaign-grid__flip-ghost" aria-hidden>
        <img src={heroScrollPick.image} alt="" draggable={false} />
      </div>
    </section>
  );
}
