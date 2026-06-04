import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { SITE_URL } from "@/lib/siteUrl";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Charlotte Wolseley Brinton — Event Fusion",
    template: "%s | Charlotte Wolseley Brinton",
  },
  description:
    "Bespoke occasions, delivered with discretion. Trusted by royalty, cultural institutions and private clients for over 25 years.",
  openGraph: {
    type: "website",
    siteName: "Event Fusion",
    locale: "en_GB",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
