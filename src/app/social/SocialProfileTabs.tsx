export function SocialProfileTabs() {
  return (
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
  );
}
