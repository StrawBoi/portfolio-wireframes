import { useRef } from "react";
import gsap, { ScrollTrigger } from "../../lib/gsapClient";
import { useGSAP } from "@gsap/react";
import { majdHero, majdNav } from "./majdContent";

export function MajdHero() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const pin = pinRef.current;
      const card = cardRef.current;
      const title = titleRef.current;
      const meta = metaRef.current;
      const nav = navRef.current;
      if (!root || !pin || !card || !title || !meta || !nav) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.set(card, { rotateZ: -12, scale: 1, transformOrigin: "50% 55%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          scroller: document.documentElement,
          trigger: root,
          start: "top top",
          end: "+=135%",
          pin: pin,
          scrub: 0.35,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        card,
        {
          rotateZ: 360,
          scale: 3.2,
          y: "-24vh",
          ease: "power3.inOut",
          duration: 0.55,
        },
        0,
      )
        .to(title, { opacity: 0, y: -48, scale: 0.92, duration: 0.35, ease: "power2.in" }, 0.18)
        .to(meta, { opacity: 0, duration: 0.25, ease: "power2.in" }, 0.22)
        .to(nav, { opacity: 0, y: -12, duration: 0.2, ease: "power2.in" }, 0.12)
        .to(card, { opacity: 0, scale: 0.55, duration: 0.18, ease: "power2.in" }, 0.82);

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="mj-top" className="mj-hero" aria-label="Hero">
      <div ref={pinRef} className="mj-hero__pin">
        <div ref={navRef} className="mj-hero__nav">
          <span className="mj-hero__nav-name">{majdNav.name}</span>
          <span className="mj-hero__nav-dots" aria-hidden>
            <span />
            <span />
            <span />
          </span>
        </div>

        <div ref={titleRef} className="mj-hero__title-wrap">
          <h1 className="mj-hero__title">
            <span className="mj-hero__line">
              <span className="mj-hero__glyph mj-hero__glyph--star" aria-hidden>
                ✦
              </span>
              {majdHero.line1}
            </span>
            <span className="mj-hero__line">
              {majdHero.line2}
              <span className="mj-hero__glyph mj-hero__glyph--bolt" aria-hidden>
                ⚡
              </span>
            </span>
          </h1>
        </div>

        <div ref={metaRef} className="mj-hero__meta">
          <span className="mj-hero__year">{majdHero.year}</span>
          <div ref={cardRef} className="mj-hero__portrait">
            <img src={majdHero.portrait} alt="" />
          </div>
          <span className="mj-hero__since">{majdHero.since}</span>
        </div>
      </div>
    </section>
  );
}
