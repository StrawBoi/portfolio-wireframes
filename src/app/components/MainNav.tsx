import { useState } from "react";
import { SiteMenu } from "./nav/SiteMenu";
import { CV_HREF } from "./nav/siteNav";

export function MainNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        id="hero-site-header"
        className={["hero-site-header", menuOpen ? "hero-site-header--menu-open" : ""]
          .filter(Boolean)
          .join(" ")}
        data-cursor-block
      >
        <div className="hero-site-header__inner">
          <button
            type="button"
            className="hero-site-header__menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            data-cursor="hover"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="hero-site-header__menu-mark" aria-hidden>
              <span className="hero-site-header__menu-bar" />
              <span className="hero-site-header__menu-bar" />
            </span>
            <span className="hero-site-header__menu-label pf-mono">{menuOpen ? "Close" : "Menu"}</span>
          </button>

          <div id="hero-name-slot" className="hero-site-header__logo" aria-hidden="true" />

          <a
            href={CV_HREF}
            className="hero-site-header__cv pf-mono"
            download
            data-cursor="hover"
          >
            Download CV
          </a>
        </div>
      </header>

      <SiteMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
