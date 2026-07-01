export const majdNav = {
  name: "Majd",
  links: [
    { label: "Home", href: "#mj-top" },
    { label: "About Me", href: "#mj-about" },
    { label: "Services", href: "#mj-services" },
    { label: "Works", href: "#mj-works" },
    { label: "Contact", href: "#mj-contact" },
  ],
} as const;

export const majdHero = {
  line1: "SOFTWARE",
  line2: "ENGINEER",
  year: "©2026",
  since: "/CREATING SINCE 2020",
  portrait: "/projects/ahmed/ahmed-portrait.png",
} as const;

export const majdAbout = {
  kicker: "Hey!",
  paragraphs: [
    "I'm Majd, a builder based in Syria, currently working on Templyo, a platform for high-quality Framer templates.",
    "I'm a software engineer and Framer creator with a strong focus on building modern, scalable, and conversion-driven web experiences.",
    "Over the years, I've created and shipped multiple SaaS products and Framer templates used by global customers, helping them launch faster.",
  ],
  cta: "Get Started",
} as const;

export const majdServices = [
  {
    title: "Website Migration",
    tags: ["Web Migration", "Optimization", "Framer Rebuild"],
  },
  {
    title: "Framer Templates",
    tags: ["Startup", "Agency", "SaaS"],
  },
  {
    title: "Frontend Development",
    tags: ["UI Dev", "Responsive Layouts", "Web Performance"],
  },
  {
    title: "Product Consulting",
    tags: ["Product Direction", "Web Strategy", "Technical Guidance"],
  },
] as const;

export const majdProjects = [
  { title: "Damas", subtitle: "Agency Framer Template" },
  { title: "Najm", subtitle: "SaaS Framer Template" },
  { title: "Kavi", subtitle: "AI Framer Template" },
  { title: "PostWing", subtitle: "Social Media Scheduler" },
] as const;

// Use local campaign art as project stand-ins when remote URLs fail
export const majdProjectFallbacks = [
  "/projects/volvo/volvo-exhibit-cover.png",
  "/projects/cinematek/cinematek-exhibit-cover.png",
  "/projects/le-lievrier/le-lievrier-exhibit-cover.png",
  "/projects/marketing-intelligence/Martech_overview.png",
] as const;

export const majdTestimonials = [
  {
    quote:
      "Templyo completely changed how I approach building sites in Framer. The templates are not just beautiful, they're actually structured in a way that makes scaling so much easier.",
    name: "Yakoub Kashmiri",
    role: "Marketing Director",
  },
  {
    quote:
      "I've tried dozens of Framer templates, but Templyo stands out. Everything feels intentional, from the layout to the smallest interactions.",
    name: "Daniel K.",
    role: "Indie Maker",
  },
  {
    quote:
      "Templyo saved me weeks of work. I was able to launch my landing page in a day, and it still looks fully custom.",
    name: "Mark M.",
    role: "Startup Founder",
  },
  {
    quote:
      "The quality is insane. Clean structure, smooth animations, and super easy to customize. It feels like a premium product from start to finish.",
    name: "Omar H.",
    role: "Frontend Developer",
  },
] as const;

export const majdThoughts = [
  {
    date: "May 5, 2025",
    title: "Building Trust Through Clear Design",
    excerpt: "How thoughtful visual choices create a stronger sense of reliability for modern brands.",
  },
  {
    date: "Jun 16, 2025",
    title: "The Role of Art Direction in Branding",
    excerpt: "Why visual direction helps brands create emotion and a distinct point of view.",
  },
] as const;

export const majdContact = {
  title: "Let's talk.",
  lede: "Have a project or need help? Fill out the form, and we'll get back to you soon.",
} as const;

export const majdFooter = {
  headline: "Scaling Start-ups for Growth.",
  email: "Mejed@Templyo.io",
} as const;
