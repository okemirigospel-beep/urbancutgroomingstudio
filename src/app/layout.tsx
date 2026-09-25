import type { Metadata } from "next";
import "./globals.css";
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
