import { useCallback, useEffect, useId, useRef } from "react";
import { CV_HREF, SITE_NAV } from "./siteNav";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function SiteMenu({ open, onClose }: Props) {
  const panelId = useId();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const onNavigate = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    requestAnimationFrame(() => firstLinkRef.current?.focus());

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={["site-menu", open ? "site-menu--open" : ""].filter(Boolean).join(" ")}
      aria-hidden={!open}
    >
      <button
        type="button"
        className="site-menu__backdrop"
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />

      <nav
        id={panelId}
        className="site-menu__panel"
        aria-label="Site"
        aria-hidden={!open}
      >
        <p className="site-menu__kicker pf-mono">Dossier index</p>

        <ul className="site-menu__list">
          {SITE_NAV.map((item, i) => (
            <li key={item.id}>
              <a
                ref={i === 0 ? firstLinkRef : undefined}
                href={item.href}
                className="site-menu__link"
                data-cursor="hover"
                tabIndex={open ? 0 : -1}
                onClick={onNavigate}
              >
                <span className="site-menu__index pf-mono">{String(i + 1).padStart(2, "0")}</span>
                <span className="site-menu__label">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <a
          href={CV_HREF}
          className="site-menu__cv pf-mono"
          download
          data-cursor="hover"
          tabIndex={open ? 0 : -1}
          onClick={onNavigate}
        >
          Download CV
          <span className="site-menu__cv-meta">PDF · 2026</span>
        </a>
      </nav>
    </div>
  );
}
