import { useState } from "react";
import { SiteMenu } from "../components/nav/SiteMenu";
import { CV_HREF } from "../components/nav/siteNav";
import { socialProfile } from "./socialProfile";
import { socialGridCells } from "./socialGridData";

type Props = {
  showTabs?: boolean;
};

export function SocialProfileHero({ showTabs = true }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const postCount = socialGridCells.length;

  const openGallery = () => {
    document.getElementById("social-projects-gallery")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  return (
    <>
      <header className="sn-profile" data-cursor-block>
        <div className="sn-profile__inner">
          <div className="sn-profile__toolbar">
            <button
              type="button"
              className="sn-profile__plus"
              aria-label="Open projects gallery"
              onClick={openGallery}
              data-cursor="hover"
            >
              <span aria-hidden>+</span>
            </button>
            <h1 className="sn-profile__handle">{socialProfile.displayName}</h1>
            <button
              type="button"
              className="sn-profile__menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              data-cursor="hover"
            >
              <span className="sn-profile__menu-bar" />
              <span className="sn-profile__menu-bar" />
              <span className="sn-profile__menu-bar" />
            </button>
          </div>

          <div className="sn-profile__identity">
            <div className="sn-profile__avatar-wrap">
              {!avatarError ? (
                <img
                  src={socialProfile.avatarSrc}
                  alt=""
                  className="sn-profile__avatar"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <span className="sn-profile__avatar-fallback" aria-hidden>
                  {socialProfile.avatarFallback}
                </span>
              )}
            </div>

            <div className="sn-profile__stats">
              <div>
                <strong>{postCount}</strong>
                <span>posts</span>
              </div>
              <div>
                <strong>{socialProfile.years}</strong>
                <span>{socialProfile.yearsLabel}</span>
              </div>
              <div>
                <strong>3</strong>
                <span>campaigns</span>
              </div>
            </div>
          </div>

          <div className="sn-profile__middle">
            <p className="sn-profile__headline">{socialProfile.headline}</p>
            <p className="sn-profile__lede">{socialProfile.lede}</p>
            <p className="sn-profile__bio">{socialProfile.bioParagraph}</p>
            <p className="sn-profile__work">{socialProfile.workLine}</p>
            <p className="sn-profile__looking">{socialProfile.lookingFor}</p>
            <div className="sn-profile__actions">
              <a href={CV_HREF} className="sn-profile__cv pf-mono" download>
                Download CV
              </a>
              <span className="sn-profile__location pf-mono">{socialProfile.location}</span>
            </div>
            <p className="sn-profile__tags pf-mono">{socialProfile.tags}</p>
          </div>
        </div>

        {showTabs ? (
          <div className="sn-profile__tabs" aria-hidden>
            <span className="sn-profile__tab sn-profile__tab--active">
              <span className="sn-profile__tab-grid" />
            </span>
            <span className="sn-profile__tab sn-profile__tab--ghost">
              <span className="sn-profile__tab-reels" />
            </span>
            <span className="sn-profile__tab sn-profile__tab--ghost">
              <span className="sn-profile__tab-tagged" />
            </span>
          </div>
        ) : null}
      </header>

      <SiteMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
