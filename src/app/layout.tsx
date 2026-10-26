import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import RevealOnScroll from "@/components/RevealOnScroll";
import { defaultOgImage, siteUrl } from "@/content/site";
import { expireSanityTags } from "@/sanity/actions";
import { SanityLive } from "@/sanity/live";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Google Analytics 4 (G-Y97S2DKLRJ) is loaded by this container, along with the form event tags.
const gtmId = "GTM-NNG37VJG";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // "./" resolves to each page's own URL, so every page gets a self-referencing canonical.
  alternates: { canonical: "./" },
  title: "Rock1 Builders – Gateway to Mediterranean Living in Montenegro",
  description:
    "Luxury residences and Europe's first Ayurvedic wellness resort at Life Bay Montenegro, from Rock1 Builders.",
  openGraph: {
    url: "./",
    type: "website",
    siteName: "Rock1 Builders",
    locale: "en_GB",
    images: [{ url: defaultOgImage, width: 1200, height: 630, alt: "Life Bay Montenegro by Rock1 Builders" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script below adds the `js` class before React hydrates.
    <html lang="en" className={`${jakarta.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* Google Tag Manager, as high in <head> as possible (GTM's own install instructions; the
            @next/third-parties component would load it later, after hydration). */}
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`,
          }}
        />
        {/* Gate the intro-animation hidden states on JS actually running */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <RevealOnScroll />
        {/* Refreshes cached Sanity content when an editor publishes */}
        <SanityLive action={expireSanityTags} />
        <div aria-hidden="true" className="grain" />
      </body>
    </html>
  );
}
