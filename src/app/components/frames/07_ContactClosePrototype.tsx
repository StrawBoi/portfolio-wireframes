import { contactClose } from "@portfolio/shared/content";
import { CV_HREF } from "../nav/siteNav";

export function ContactClosePrototype() {
  return (
    <section
      className="story-section story-contact"
      aria-labelledby="contact-close-heading"
    >
      <div className="story-section__inner story-contact__inner">
        <header className="story-contact__header">
          <p className="story-section__label pf-mono">{contactClose.eyebrow}</p>
          <h2 id="contact-close-heading" className="story-contact__title">
            {contactClose.heading[0]}{" "}
            <span className="story-section__title-accent">{contactClose.heading[1]}</span>{" "}
            {contactClose.heading[2]}
          </h2>
          <p className="story-section__lede story-contact__lede">{contactClose.lede}</p>
        </header>

        <div className="story-contact__actions">
          <a href={CV_HREF} className="story-contact__cv pf-mono" download data-cursor="hover">
            Download CV
            <span>PDF · 2026</span>
          </a>
          <a href="mailto:hello@example.com" className="story-contact__ghost pf-mono" data-cursor="hover">
            Send a message
          </a>
          <a href="#" className="story-contact__ghost pf-mono" data-cursor="hover">
            LinkedIn
          </a>
        </div>

        <footer className="story-contact__footer pf-mono">
          <span>{contactClose.footerMark}</span>
          <span>{contactClose.footerLocation}</span>
        </footer>
      </div>
    </section>
  );
}
