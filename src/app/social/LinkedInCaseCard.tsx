import { featuredCampaignExhibits } from "../data/featuredExhibits";
import { socialProfile } from "./socialProfile";

const exhibit = featuredCampaignExhibits[0];

export function LinkedInCaseCard() {
  return (
    <div className="sn-linkedin" aria-label="LinkedIn case study preview">
      <article className="sn-linkedin__card">
        <header className="sn-linkedin__head">
          <div className="sn-linkedin__avatar" aria-hidden>
            {socialProfile.avatarFallback}
          </div>
          <div>
            <p className="sn-linkedin__author">{socialProfile.fullName}</p>
            <p className="sn-linkedin__meta pf-mono">
              Campaign strategy · {exhibit.context}
            </p>
            <p className="sn-linkedin__time pf-mono">1w · 🌐</p>
          </div>
        </header>

        <div className="sn-linkedin__body">
          <p>
            <strong>{exhibit.tagline}</strong> — {exhibit.description}
          </p>
          <p>{exhibit.achievement}</p>
          <ul className="sn-linkedin__signals">
            {exhibit.signals.map((s) => (
              <li key={s.k}>
                <span className="pf-mono">{s.k}</span> {s.v}
              </li>
            ))}
          </ul>
        </div>

        <div className="sn-linkedin__media">
          <img src={exhibit.image} alt="" />
        </div>

        <footer className="sn-linkedin__foot pf-mono">
          <span>Insightful · 42</span>
          <span>Repost · Save case</span>
        </footer>
      </article>
    </div>
  );
}
