"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "@/lib/gsap-client";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>#*+=·.";

const readoutRows = [
  { label: "ROLE", value: "MARKETING · RESEARCH · ANALYTICS" },
  { label: "WINDOW", value: "SUMMER 2026 · INTERNSHIP" },
  { label: "BASE", value: "BRUSSELS, BELGIUM" },
  { label: "RECORD", value: "11+ YEARS · IT / DEV / STRATEGY" },
];

const tickerFragments = [
  "SIGNAL ACQUIRED",
  "50.85°N 4.35°E",
  "ROI ↑",
  "SWOT",
  "CTR 0.84",
  "B2B",
  "SEGMENTATION",
  "KPI",
  "CPA ↓",
  "ATTRIBUTION",
  "FUNNEL",
  "POSITIONING",
  "GTM",
  "RETENTION",
];

function randomGlyphString(length) {
  let out = "";
  for (let i = 0; i < length; i += 1) {
    out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
  }
  return out;
}

export default function Hero() {
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const captionRef = useRef(null);
  const rowsRef = useRef(null);
  const nameRef = useRef(null);
  const nameTextRef = useRef(null);
  const roleRef = useRef(null);
  const tickerRef = useRef(null);
  const sweepRef = useRef(null);
  const scrollCueRef = useRef(null);
  const navReadyRef = useRef(false);

  useGSAP(
    () => {
      const container = heroRef.current;
      if (!container) return;

      const emitNavReady = () => {
        if (navReadyRef.current) return;
        navReadyRef.current = true;
        window.dispatchEvent(new Event("hero:logo-ready"));
      };

      const addScramble = (tl, el, position, dur = 0.7) => {
        if (!el) return;
        const finalText = el.dataset.final ?? el.textContent;
        const proxy = { p: 0 };
        tl.to(
          proxy,
          {
            p: 1,
            duration: dur,
            ease: "power2.inOut",
            onUpdate() {
              const reveal = Math.floor(proxy.p * finalText.length);
              let out = "";
              for (let i = 0; i < finalText.length; i += 1) {
                const ch = finalText[i];
                if (ch === " ") {
                  out += " ";
                } else if (i < reveal) {
                  out += ch;
                } else {
                  out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
                }
              }
              el.textContent = out;
            },
            onComplete() {
              el.textContent = finalText;
            },
          },
          position
        );
      };

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
          reducedMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reducedMotion } = context.conditions;
          const valueEls = gsap.utils.toArray(".sig-value", container);

          if (reducedMotion || !isDesktop) {
            gsap.set(
              [
                gridRef.current,
                captionRef.current,
                rowsRef.current,
                nameRef.current,
                roleRef.current,
                tickerRef.current,
                scrollCueRef.current,
              ],
              { opacity: 1, x: 0, y: 0, scale: 1, clearProps: "transform" }
            );
            emitNavReady();
            return;
          }

          // Capture finals, then mask everything in glyph-noise pre-paint.
          valueEls.forEach((el) => {
            el.dataset.final = el.textContent;
            el.textContent = randomGlyphString(el.textContent.length);
          });
          if (nameTextRef.current) {
            nameTextRef.current.dataset.final = nameTextRef.current.textContent;
            nameTextRef.current.textContent = randomGlyphString(
              nameTextRef.current.textContent.length
            );
          }

          gsap.set(gridRef.current, { opacity: 0 });
          gsap.set(captionRef.current, { opacity: 0, y: 8 });
          gsap.set(nameRef.current, { opacity: 0, y: 24 });
          gsap.set(roleRef.current, { opacity: 0, y: 12 });
          gsap.set(tickerRef.current, { opacity: 0 });
          gsap.set(scrollCueRef.current, { opacity: 0, y: 8 });
          gsap.set(sweepRef.current, { yPercent: -100, opacity: 0 });

          // Cold open: signal locks on.
          const intro = gsap.timeline({ delay: 0.25 });
          intro.to(gridRef.current, { opacity: 1, duration: 0.9, ease: "power2.out" }, 0);
          intro.to(
            sweepRef.current,
            { opacity: 0.5, duration: 0.3, ease: "none" },
            0.1
          );
          intro.to(
            sweepRef.current,
            { yPercent: 220, opacity: 0, duration: 1.6, ease: "power1.inOut" },
            0.1
          );
          intro.to(captionRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.2);

          valueEls.forEach((el, i) => addScramble(intro, el, 0.55 + i * 0.22, 0.7));

          intro.to(nameRef.current, { opacity: 1, y: 0, duration: 0.6 }, ">-0.1");
          addScramble(intro, nameTextRef.current, "<", 1.1);
          intro.to(roleRef.current, { opacity: 1, y: 0, duration: 0.5 }, ">-0.5");
          intro.to(tickerRef.current, { opacity: 1, duration: 0.6 }, "<");
          intro.to(scrollCueRef.current, { opacity: 1, y: 0, duration: 0.5 }, "<");
          intro.add(emitNavReady);

          // Infinite data tape.
          const tape = tickerRef.current?.querySelector(".sig-tape");
          if (tape) {
            gsap.to(tape, {
              xPercent: -50,
              duration: 28,
              ease: "none",
              repeat: -1,
            });
          }

          // Scroll: file recedes, name compacts toward the nav.
          const scrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: "+=170%",
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          scrollTl.to(
            [captionRef.current, rowsRef.current, tickerRef.current, scrollCueRef.current],
            { opacity: 0, y: -24, ease: "none" },
            0
          );
          scrollTl.to(gridRef.current, { opacity: 0, ease: "none" }, 0);
          scrollTl.to(
            nameRef.current,
            {
              y: () => -window.innerHeight * 0.36,
              scale: 0.46,
              transformOrigin: "left center",
              ease: "none",
            },
            0.05
          );
          scrollTl.to(roleRef.current, { opacity: 0, ease: "none" }, 0.05);
          scrollTl.to(nameRef.current, { opacity: 0, ease: "none" }, 0.82);

          scrollTl.eventCallback("onUpdate", () => {
            const progress = scrollTl.scrollTrigger?.progress ?? 0;
            if (progress >= 0.7) emitNavReady();
          });
        }
      );

      return () => mm.revert();
    },
    { scope: heroRef }
  );

  return (
    <section
      id="home"
      ref={heroRef}
      className="hero-section relative isolate min-h-screen overflow-hidden bg-[var(--bg)] text-[var(--text-primary)]"
      aria-label="Ahmed Mohsen Mostafa — incoming signal"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(255,65,3,0.06),_transparent_45%),linear-gradient(180deg,_#080808_0%,_#0A0A0A_60%,_#070707_100%)]" />
      <div ref={gridRef} className="sig-grid absolute inset-0" />
      <div
        ref={sweepRef}
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--accent)] shadow-[0_0_24px_4px_rgba(255,65,3,0.35)]"
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1600px] flex-col justify-between px-6 py-24 md:px-12 md:py-20 lg:px-20">
        {/* Top status bar */}
        <div className="sig-mono flex items-center justify-between text-[0.7rem] uppercase tracking-[0.32em] text-[var(--text-muted)]">
          <span className="flex items-center gap-2">
            <span className="sig-dot inline-block h-2 w-2 rounded-full bg-[var(--accent)]" />
            SIG // LOCK
          </span>
          <span className="hidden sm:inline">50.85°N 4.35°E · BRUSSELS</span>
        </div>

        {/* Readout */}
        <div className="max-w-3xl">
          <p
            ref={captionRef}
            className="sig-mono mb-8 text-[0.72rem] uppercase tracking-[0.4em] text-[var(--accent)]"
          >
            Incoming signal — decoding subject
          </p>

          <div ref={rowsRef} className="space-y-3">
            {readoutRows.map((row) => (
              <div
                key={row.label}
                className="sig-mono flex items-baseline gap-4 text-[0.85rem] md:text-[0.95rem]"
              >
                <span className="w-24 shrink-0 uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  {row.label}
                </span>
                <span className="text-[var(--text-muted)]">::</span>
                <span className="sig-value uppercase tracking-[0.12em] text-[var(--text-primary)]">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Lower-third chyron — the name */}
        <div className="flex items-end justify-between gap-8">
          <div ref={nameRef} className="flex items-stretch gap-5">
            <span className="mt-1 w-[3px] shrink-0 self-stretch bg-[var(--accent)]" />
            <div>
              <h1
                ref={nameTextRef}
                className="font-display text-[clamp(2.4rem,7vw,5.5rem)] font-semibold uppercase leading-[0.92] tracking-[0.02em] text-[var(--text-primary)]"
              >
                AHMED MOHSEN MOSTAFA
              </h1>
              <p
                ref={roleRef}
                className="sig-mono mt-4 text-[0.72rem] uppercase tracking-[0.34em] text-[var(--text-muted)]"
              >
                Strategy · Data · Story — for brands that move
              </p>
            </div>
          </div>

          <div
            ref={scrollCueRef}
            className="sig-mono hidden shrink-0 items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-[var(--text-muted)] md:flex"
          >
            <span>Scroll — open file</span>
            <span className="text-[var(--accent)]">↓</span>
          </div>
        </div>
      </div>

      {/* Data tape */}
      <div
        ref={tickerRef}
        className="absolute inset-x-0 bottom-0 z-10 overflow-hidden border-t border-[var(--border)] bg-black/40 py-3 backdrop-blur-sm"
        aria-hidden="true"
      >
        <div className="sig-tape sig-mono flex w-max gap-10 whitespace-nowrap pr-10 text-[0.7rem] uppercase tracking-[0.28em] text-[var(--text-muted)]">
          {[...tickerFragments, ...tickerFragments].map((fragment, i) => (
            <span key={`${fragment}-${i}`} className="flex items-center gap-10">
              <span className="text-[var(--accent)]">/</span>
              {fragment}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
