import { useRef } from "react";
import { SocialProfileHero } from "./SocialProfileHero";
import { SocialGridTeaser } from "./SocialGridTeaser";
import { SocialHandoffPin } from "./SocialHandoffPin";
import { SocialSpotlightScroll } from "./SocialSpotlightScroll";
import { LinkedInCaseCard } from "./LinkedInCaseCard";
import "../../styles/social-narrative.css";

export function SocialNarrativeLab() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <div className="pf sn-lab">
      <div className="sn-lab__banner pf-mono">
        <span>Social narrative · cream edition</span>
        <a href="#majd">Majd clone →</a>
        <a href="#prototype">← dossier prototype</a>
      </div>

      <section ref={heroRef} className="sn-hero" aria-label="Profile and work grid">
        <SocialHandoffPin heroRef={heroRef} />
        <SocialGridTeaser embedded />
      </section>

      <details className="sn-lab__fold">
        <summary className="sn-lab__fold-trigger pf-mono">Option B — spotlight scroll</summary>
        <SocialSpotlightScroll />
      </details>

      <details className="sn-lab__fold">
        <summary className="sn-lab__fold-trigger pf-mono">LinkedIn case format</summary>
        <LinkedInCaseCard />
      </details>
    </div>
  );
}
