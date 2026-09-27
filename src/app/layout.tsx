import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const dmSans = localFont({
  src: "./fonts/dm-sans.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-dm-sans",
  display: "swap",
  adjustFontFallback: "Arial",
  fallback: ["Arial", "sans-serif"],
});
const crimsonText = localFont({
  src: [
    {
      path: "./fonts/crimson-text-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/crimson-text-semibold-italic.woff2",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-crimson-text",
  display: "swap",
  adjustFontFallback: "Times New Roman",
  fallback: ["Times New Roman", "serif"],
});
// A glyph-only fallback: neither brand family includes the Nigerian naira sign.
const naira = localFont({
  src: "./fonts/naira.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-naira",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  declarations: [{ prop: "unicode-range", value: "U+20A6" }],
});

export const metadata: Metadata = {
  title: "URBANCUT — Grooming Studio, Abuja",
  description:
    "Barbering, braiding and loc care in Abuja. Explore services and plan your visit.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${crimsonText.variable} ${naira.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
