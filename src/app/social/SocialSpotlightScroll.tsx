import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { socialGridCells, spotlightPoster } from "./socialGridData";

gsap.registerPlugin(ScrollTrigger);

/**
 * Option B — Majd-style: one poster pins centre, sharp rotate on scroll,
 * skeleton grid resolves as the card lands.
 */
export function SocialSpotlightScroll() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const skeletonRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const pin = pinRef.current;
      const card = cardRef.current;
      const skeleton = skeletonRef.current;
      if (!root || !pin || !card || !skeleton) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cells = skeleton.querySelectorAll<HTMLElement>(".sn-spotlight__skel");

      if (reduced) {
        gsap.set(card, { rotateZ: 0, scale: 1 });
        gsap.set(cells, { opacity: 1 });
        return;
      }

      gsap.set(card, { rotateZ: -14, scale: 1.08, transformOrigin: "50% 55%" });
      gsap.set(cells, { opacity: 0.12 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=140%",
          pin: pin,
          scrub: 0.35,
          anticipatePin: 1,
        },
      });

      tl.to(
        card,
        {
          rotateZ: 10,
          scale: 1.02,
          ease: "power4.inOut",
          duration: 0.45,
        },
        0,
      )
        .to(
          card,
          {
            rotateZ: 0,
            scale: 0.42,
            y: "18vh",
            ease: "power3.inOut",
            duration: 0.35,
          },
          0.45,
        )
        .to(cells, { opacity: 1, stagger: 0.04, duration: 0.4, ease: "power2.out" }, 0.62)
        .to(card, { opacity: 0, duration: 0.15, ease: "power2.in" }, 0.78);

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="social-option-b" className="sn-spotlight" aria-label="Spotlight scroll">
      <div ref={pinRef} className="sn-spotlight__pin">
        <div ref={skeletonRef} className="sn-spotlight__skeleton sn-grid sn-grid--unequal">
          {socialGridCells.map((cell) => (
            <div
              key={`skel-${cell.id}`}
              className={`sn-spotlight__skel sn-grid__cell sn-grid__cell--${cell.layout}`}
            >
              <img src={cell.image} alt="" className="sn-grid__img" loading="lazy" />
            </div>
          ))}
        </div>

        <div ref={cardRef} className="sn-spotlight__card">
          <img src={spotlightPoster.image} alt="" className="sn-spotlight__card-img" />
          <div className="sn-spotlight__card-copy">
            <p className="pf-mono">{spotlightPoster.eyebrow}</p>
            <h3>{spotlightPoster.title}</h3>
            <p>{spotlightPoster.tagline}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
