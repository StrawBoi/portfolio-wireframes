import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata = {
  title: "Ahmed Mohsen Mostafa | Business · Technology · Marketing",
  description:
    "Ahmed Mohsen Mostafa — 11+ years bridging IT, full-stack development, strategy and growth. Brussels-based, working with global teams on strategy, product and execution.",
  keywords: [
    "strategy",
    "full-stack development",
    "product",
    "UX/UI design",
    "growth",
    "consulting",
    "Brussels",
    "Belgium",
  ],
  openGraph: {
    title: "Ahmed Mohsen Mostafa | Business · Technology · Marketing",
    description:
      "One operator across business, technology and marketing. 11+ years from strategy to shipped product.",
    type: "website",
    locale: "en_BE",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
