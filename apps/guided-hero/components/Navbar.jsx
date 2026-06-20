"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "@/lib/gsap-client";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const logoShortRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [heroLogoReady, setHeroLogoReady] = useState(false);

  useGSAP(() => {
    gsap.set(navRef.current, { opacity: 1, y: 0 });

    ScrollTrigger.create({
      start: "top -80",
      end: 99999,
      toggleClass: { className: "scrolled", targets: navRef.current },
      onEnter: () => {
        if (!heroLogoReady) return;
        gsap.to("#nav-logo-center-slot", { opacity: 0, y: -8, duration: 0.25, display: "none" });
        gsap.fromTo(
          logoShortRef.current,
          { y: 10, opacity: 0, display: "none" },
          { y: 0, opacity: 1, duration: 0.4, display: "block", ease: "power2.out" }
        );
      },
      onLeaveBack: () => {
        gsap.to(logoShortRef.current, { opacity: 0, y: 8, duration: 0.25, display: "none" });
        gsap.fromTo(
          "#nav-logo-center-slot",
          { y: -6, opacity: 0, display: "none" },
          { y: 0, opacity: 1, duration: 0.4, display: "block", ease: "power2.out" }
        );
      },
    });
  }, { scope: navRef, dependencies: [heroLogoReady] });

  useEffect(() => {
    const onLogoReady = () => setHeroLogoReady(true);
    window.addEventListener("hero:logo-ready", onLogoReady);
    return () => window.removeEventListener("hero:logo-ready", onLogoReady);
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.to(menuRef.current, { x: "0%", duration: 0.5, ease: "power3.inOut" });
      gsap.fromTo(
        ".mobile-link",
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.3, ease: "power2.out" }
      );
    } else {
      gsap.to(menuRef.current, { x: "100%", duration: 0.5, ease: "power3.inOut" });
    }
  }, [isOpen]);

  const scrollTo = (href) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        id="site-nav"
        ref={navRef}
        className="pointer-events-auto fixed top-0 left-0 z-50 flex h-24 w-full items-center justify-between bg-transparent px-6 md:px-12 lg:px-20 [&.scrolled]:h-16 [&.scrolled]:border-b [&.scrolled]:border-white/[0.08] [&.scrolled]:bg-[#0A0B10]/90 [&.scrolled]:backdrop-blur-xl"
      >
        <button
          type="button"
          className="relative cursor-pointer border-0 bg-transparent p-0 text-left"
          onClick={() => scrollTo("#home")}
          aria-label="Ahmed Mohsen Mostafa — home"
        >
          <div
            ref={logoShortRef}
            className="absolute top-1/2 left-0 hidden -translate-y-1/2 whitespace-nowrap font-display text-lg font-bold uppercase tracking-[0.14em] text-off-white"
          >
            AM.
          </div>
        </button>

        {/* Center logo slot — target for the hero logo flight */}
        <div
          id="nav-logo-center-slot"
          className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block"
          aria-hidden="true"
        >
          <span className="nav-monogram font-display text-[1.55rem] font-extrabold uppercase text-off-white/85" style={{ letterSpacing: '-0.14em' }}>
            AMM
          </span>
        </div>

        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => scrollTo(link.href)}
              className="nav-link-item cursor-pointer text-sm font-medium uppercase tracking-widest text-off-white/55 opacity-0 transition-colors duration-300 hover:text-off-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric-blue"
            >
              {link.name}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="relative z-[60] p-2 text-off-white md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          <div className="flex h-5 w-6 flex-col justify-between">
            <span
              className={`block h-[2px] w-full bg-current transition-transform duration-300 ${isOpen ? "translate-y-[9px] rotate-45" : ""}`}
            />
            <span
              className={`block h-[2px] w-full bg-current transition-opacity duration-300 ${isOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-[2px] w-full bg-current transition-transform duration-300 ${isOpen ? "-translate-y-[9px] -rotate-45" : ""}`}
            />
          </div>
        </button>
      </nav>

      <div
        ref={menuRef}
        className="fixed inset-0 z-40 flex translate-x-full flex-col justify-center bg-[#0F0A1F]/96 px-10 backdrop-blur-xl"
      >
        <div className="flex flex-col gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => scrollTo(link.href)}
              className="mobile-link text-left font-display text-3xl font-bold text-off-white hover:text-off-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-electric-blue"
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
