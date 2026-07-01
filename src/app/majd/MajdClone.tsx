import {
  majdAbout,
  majdContact,
  majdFooter,
  majdNav,
  majdProjectFallbacks,
  majdProjects,
  majdServices,
  majdTestimonials,
  majdThoughts,
} from "./majdContent";
import { MajdHero } from "./MajdHero";
import "../../styles/majd-clone.css";

export function MajdClone() {
  return (
    <div className="mj-lab">
      <div className="mj-lab__banner pf-mono">
        <span>Majd clone · reference lab</span>
        <a href="#social">← social narrative</a>
      </div>

      <MajdHero />

      <section id="mj-about" className="mj-about">
        <div className="mj-about__inner">
          <h2 className="mj-about__kicker">{majdAbout.kicker}</h2>
          {majdAbout.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} className="mj-about__p">
              {p}
            </p>
          ))}
          <a href="#mj-contact" className="mj-btn">
            {majdAbout.cta}
          </a>
        </div>
      </section>

      <section id="mj-services" className="mj-services">
        <h2 className="mj-section-title">Services</h2>
        <div className="mj-services__grid">
          {majdServices.map((service) => (
            <article key={service.title} className="mj-service-card">
              <h3>{service.title}</h3>
              <ul>
                {service.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="mj-works" className="mj-works">
        <div className="mj-works__head">
          <h2 className="mj-section-title">Featured Projects</h2>
          <a href="#mj-works" className="mj-link">
            View All Work
          </a>
        </div>
        <div className="mj-works__grid">
          {majdProjects.map((project, i) => (
            <a key={project.title} href="#mj-works" className="mj-work-card">
              <div className="mj-work-card__media">
                <img
                  src={majdProjectFallbacks[i]}
                  alt=""
                  loading="lazy"
                />
              </div>
              <div className="mj-work-card__copy">
                <h3>{project.title}</h3>
                <p>{project.subtitle}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="mj-testimonials">
        <h2 className="mj-section-title">Testimonials</h2>
        <div className="mj-testimonials__grid">
          {majdTestimonials.map((t) => (
            <blockquote key={t.name} className="mj-quote">
              <p>{t.quote}</p>
              <footer>
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mj-thoughts">
        <h2 className="mj-section-title">Thoughts</h2>
        <div className="mj-thoughts__list">
          {majdThoughts.map((post) => (
            <a key={post.title} href="#mj-thoughts" className="mj-thought">
              <span className="mj-thought__date pf-mono">{post.date}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </a>
          ))}
        </div>
      </section>

      <section id="mj-contact" className="mj-contact">
        <div className="mj-contact__inner">
          <h2 className="mj-section-title">{majdContact.title}</h2>
          <p className="mj-contact__lede">{majdContact.lede}</p>
          <form className="mj-form" onSubmit={(e) => e.preventDefault()}>
            <label>
              <span>Name</span>
              <input type="text" placeholder="Enter your name" required />
            </label>
            <label>
              <span>Email</span>
              <input type="email" placeholder="Enter your email" required />
            </label>
            <label>
              <span>Your Project</span>
              <textarea placeholder="Tell us about your project" rows={4} required />
            </label>
            <button type="submit" className="mj-btn mj-btn--dark">
              Submit
            </button>
          </form>
        </div>
      </section>

      <footer className="mj-footer">
        <h2 className="mj-footer__headline">{majdFooter.headline}</h2>
        <div className="mj-footer__cols">
          <div>
            <h4 className="pf-mono">/Quick links</h4>
            <ul>
              {majdNav.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="pf-mono">/Contact</h4>
            <a href={`mailto:${majdFooter.email}`}>{majdFooter.email}</a>
          </div>
        </div>
        <p className="mj-footer__brand pf-mono">MAJD</p>
      </footer>
    </div>
  );
}
