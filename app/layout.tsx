import type { Metadata, Viewport } from "next";
import { posthogSnippet } from "@/lib/posthog";
import "./globals.css";

// Private demo: never indexed, never followed, no sitemap.
export const metadata: Metadata = {
  title: "CDG London | Bespoke luxury construction",
  description: "CDG Construction is a trusted construction company with over 30 years of experience, delivering quality craftsmanship across London.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export const viewport: Viewport = { themeColor: "#161616" };

/* Runs before first paint: adds `js` (reveal targets start hidden without a flash) and `is-loading` for the
   preloader, which plays on every load. Reduced motion skips both. Without JavaScript nothing is hidden. */
const boot = "(function(){var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches){d.dataset.intro='done';d.classList.add('logo-landed');return}d.classList.add('js','is-loading')})()";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
        <script dangerouslySetInnerHTML={{ __html: posthogSnippet }} />
        <link rel="preload" href="/fonts/libre-baskerville-latin-400-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/inter-tight-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/media/still-living.jpg" as="image" />
        <noscript><style>{".preloader{display:none!important}"}</style></noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
