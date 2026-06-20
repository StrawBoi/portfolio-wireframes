"use client";

import { useRef } from "react";
import gsap from "@/lib/gsap-client";
import { useGSAP } from "@gsap/react";

export default function Contact() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    tl.from(".contact-label", { y: 20, opacity: 0, duration: 0.5 })
      .from(".contact-title", { y: 40, opacity: 0, duration: 0.6, stagger: 0.2 }, "-=0.3")
      .from(".contact-sub", { y: 20, opacity: 0, duration: 0.5 }, "-=0.4")
      .from(".contact-btn", { scale: 0.8, opacity: 0, duration: 0.5, ease: "back.out(1.5)" }, "-=0.2")
      .from(".social-link", { y: 20, opacity: 0, duration: 0.4, stagger: 0.1 }, "-=0.2");

  }, { scope: sectionRef });

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 z-10 bg-deep-navy">
      <div className="absolute inset-0 gradient-mesh opacity-50 z-0"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <span className="contact-label block text-electric-blue uppercase tracking-widest text-sm font-semibold mb-6">
          GET IN TOUCH
        </span>
        
        <h2 className="contact-title text-4xl md:text-6xl lg:text-7xl font-display font-bold text-off-white leading-tight">
          Have a problem worth <br />
          <span className="gradient-text inline-block">solving?</span>
        </h2>
        
        <p className="contact-sub text-xl text-off-white/60 mt-8 max-w-lg mx-auto font-body">
          Selective on new engagements — consulting, fractional, and senior product/strategy roles. If the fit is right, let's talk.
        </p>
        
        <div className="contact-btn mt-12">
          <a href="mailto:hello@ahmedmostafa.com" className="cta-btn inline-block rounded-full px-12 py-5 text-lg font-semibold text-white font-display">
            <span>Start a conversation →</span>
          </a>
        </div>
        
        <div className="mt-16 flex gap-8 justify-center flex-wrap">
          {["LinkedIn", "Email", "Resume"].map((social, idx) => (
            <a 
              key={idx} 
              href="#" 
              className="social-link text-off-white/50 hover:text-off-white transition-colors duration-300 font-body text-sm uppercase tracking-wider font-semibold relative group overflow-hidden"
            >
              {social}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-hot-pink -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
