import { useCallback, useEffect, useRef, useState } from "react";
import { heroSocialPosts, type HeroSocialPost } from "../../data/heroSocialPosts";

const ROTATE_MS = 5500;

type Props = {
  posts?: HeroSocialPost[];
  active?: boolean;
};

export function HeroStoryStage({ posts = heroSocialPosts, active = true }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const featured = posts[activeIndex] ?? posts[0];

  const focusPost = useCallback((index: number) => {
    setActiveIndex(index);
    window.dispatchEvent(new CustomEvent("hero:project-active", { detail: { index } }));
  }, []);

  useEffect(() => {
    if (!active) return;

    const onProject = (e: Event) => {
      const detail = (e as CustomEvent<{ index: number }>).detail;
      if (typeof detail?.index === "number") setActiveIndex(detail.index);
    };

    window.addEventListener("hero:project-active", onProject);
    return () => window.removeEventListener("hero:project-active", onProject);
  }, [active]);

  useEffect(() => {
    if (!active || posts.length < 2 || paused) return;

    const id = window.setInterval(() => {
      setActiveIndex((i) => {
        const next = (i + 1) % posts.length;
        window.dispatchEvent(new CustomEvent("hero:project-active", { detail: { index: next } }));
        return next;
      });
    }, ROTATE_MS);

    return () => window.clearInterval(id);
  }, [active, posts.length, paused]);

  useEffect(() => {
    const rail = railRef.current;
    const chip = rail?.querySelector<HTMLElement>(`[data-post-index="${activeIndex}"]`);
    chip?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeIndex]);

  useEffect(() => {
    posts.forEach((p) => {
      const img = new Image();
      img.src = p.image;
    });
  }, [posts]);

  if (!featured) return null;

  return (
    <div
      className="hero-story-stage"
      aria-label="Campaign social wall"
      aria-hidden={!active}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <p className="hero-story-stage__kicker pf-mono">Campaign archive · live feed</p>

      <div className="hero-story-stage__spotlight">
        {posts.map((post) => (
          <article
            key={post.id}
            className={[
              "hero-story-stage__post",
              post.id === featured.id ? "hero-story-stage__post--active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-hidden={post.id !== featured.id}
          >
            <img
              src={post.image}
              alt=""
              className="hero-story-stage__post-img"
              loading="eager"
              decoding="async"
            />
            <div className="hero-story-stage__post-scrim" />
            <div className="hero-story-stage__post-meta">
              <p className="hero-story-stage__post-eyebrow pf-mono">{post.eyebrow}</p>
              <p className="hero-story-stage__post-title">{post.title}</p>
              <p className="hero-story-stage__post-caption">{post.caption}</p>
            </div>
          </article>
        ))}
      </div>

      <div ref={railRef} className="hero-story-stage__rail" role="tablist" aria-label="Posts">
        {posts.map((post, i) => (
          <button
            key={post.id}
            type="button"
            role="tab"
            data-post-index={i}
            aria-selected={i === activeIndex}
            className={[
              "hero-story-stage__chip",
              i === activeIndex ? "hero-story-stage__chip--active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => focusPost(i)}
          >
            <img src={post.image} alt="" className="hero-story-stage__chip-img" loading="lazy" />
            <span className="hero-story-stage__chip-index pf-mono">{post.index}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
