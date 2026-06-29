import { heroSocialPosts } from "./heroSocialPosts";

export type HeroRevealProject = {
  id: string;
  index: string;
  title: string;
  eyebrow: string;
  image: string;
  href: string;
  zone: number;
  testimonial?: {
    quote: string;
    attribution: string;
  };
};

/** Cursor + story stage — synced to social post wall */
export const heroRevealProjects: HeroRevealProject[] = heroSocialPosts.map((post) => ({
  id: post.id,
  index: post.index,
  title: post.title,
  eyebrow: post.eyebrow,
  image: post.image,
  href: post.href,
  zone: post.zone,
  testimonial: {
    quote: post.caption,
    attribution: post.eyebrow,
  },
}));

export { heroSocialPosts };
