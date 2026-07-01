import { useRef, type RefObject } from "react";
import gsap, { ScrollTrigger } from "../../lib/gsapClient";
import { useGSAP } from "@gsap/react";
import { SocialProfileHero } from "./SocialProfileHero";
import { SocialProfileTabs } from "./SocialProfileTabs";
import { heroScrollPick } from "./socialGridData";

type Props = {
  heroRef: RefObject<HTMLElement | null>;
};

type OriginMetrics = {
  x: number;
  y: number;
  w: number;
  h: number;
};

function readOrigin(card: HTMLElement): OriginMetrics {
  const c = card.getBoundingClientRect();
  return {
    x: c.left + c.width / 2,
    y: c.top + c.height / 2,
    w: c.width,
    h: c.height,
  };
}

function readTarget(target: HTMLElement) {
  const t = target.getBoundingClientRect();
  return {
    x: t.left + t.width / 2,
    y: t.top + t.height / 2,
    w: t.width,
    h: t.height,
  };
}

export function SocialHandoffPin({ heroRef }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const hero = heroRef.current;
      const pin = pinRef.current;
      const card = cardRef.current;
      if (!hero || !pin || !card) return;

      const target = hero.querySelector<HTMLElement>(`[data-cell="${heroScrollPick.cellId}"]`);
      const targetMedia = target?.querySelector<HTMLElement>(".sn-grid__media");
      if (!target || !targetMedia) return;

      const scroller = document.documentElement;
      target.setAttribute("data-handoff-target", "true");

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set(targetMedia, { opacity: 1 });
        return;
      }

      gsap.set(targetMedia, { opacity: 0 });

      let armed = false;
      let origin: OriginMetrics = { x: 0, y: 0, w: 0, h: 0 };

      const disarm = () => {
        armed = false;
        card.classList.remove("sn-handoff__card--flying");
        gsap.set(card, { clearProps: "all" });
        target.classList.remove("sn-grid__cell--landed");
        gsap.set(targetMedia, { opacity: 0 });
      };

      const arm = () => {
        if (armed) return;
        origin = readOrigin(card);
        armed = true;
        card.classList.add("sn-handoff__card--flying");
        gsap.set(card, {
          position: "fixed",
          left: 0,
          top: 0,
          margin: 0,
          xPercent: -50,
          yPercent: -50,
          x: origin.x,
          y: origin.y,
          width: origin.w,
          height: origin.h,
          rotation: 0,
          zIndex: 30,
          autoAlpha: 1,
        });
      };

      let st: ScrollTrigger | undefined;

      const apply = (progress: number) => {
        if (progress <= 0.001) {
          disarm();
          return;
        }

        if (!armed) arm();

        const end = readTarget(target);
        const spin = Math.min(1, progress / 0.34);
        const move = gsap.utils.clamp(0, 1, (progress - 0.06) / 0.88);
        const moveEase = gsap.parseEase("power2.inOut")(move);
        const landed = progress >= 0.95;

        gsap.set(card, {
          x: gsap.utils.interpolate(origin.x, end.x, moveEase),
          y: gsap.utils.interpolate(origin.y, end.y, moveEase),
          width: gsap.utils.interpolate(origin.w, end.w, moveEase),
          height: gsap.utils.interpolate(origin.h, end.h, moveEase),
          rotation: spin * 360,
          autoAlpha: landed ? 0 : 1,
        });

        target.classList.toggle("sn-grid__cell--landed", landed);
        gsap.set(targetMedia, { opacity: landed ? 1 : 0 });
      };

      st = ScrollTrigger.create({
        scroller,
        trigger: card,
        start: "center 62%",
        endTrigger: target,
        end: "center center",
        pin: pin,
        pinSpacing: true,
        scrub: 0.42,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefreshInit: disarm,
        onRefresh: () => {
          if (st) apply(st.progress);
        },
        onUpdate: (self) => apply(self.progress),
      });

      const refresh = () => ScrollTrigger.refresh();
      requestAnimationFrame(refresh);
      window.addEventListener("load", refresh);

      return () => {
        window.removeEventListener("load", refresh);
        st?.kill();
        disarm();
        target.removeAttribute("data-handoff-target");
        gsap.set(targetMedia, { clearProps: "opacity" });
      };
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="sn-handoff">
      <div ref={pinRef} className="sn-handoff__pin">
        <SocialProfileHero showTabs={false} />
        <div ref={cardRef} className="sn-handoff__card" data-handoff-card>
          <img src={heroScrollPick.image} alt="" draggable={false} />
        </div>
        <SocialProfileTabs />
      </div>
    </div>
  );
}
