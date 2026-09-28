import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import RevealOnScroll from "@/components/RevealOnScroll";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rock1 Builders – Gateway to Mediterranean Living in Montenegro",
  description:
    "Luxury residences and Europe's first Ayurvedic wellness resort at Life Bay Montenegro, from Rock1 Builders.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script below adds the `js` class before React hydrates.
    <html lang="en" className={`${jakarta.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* Gate the intro-animation hidden states on JS actually running */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <RevealOnScroll />
        <div aria-hidden="true" className="grain" />
      </body>
    </html>
  );
}
