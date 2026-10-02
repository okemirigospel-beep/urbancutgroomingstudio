import type { Metadata } from "next";
import type { IndexingConfig } from "./indexing.ts";
import { studio } from "./studio.ts";
import { studioSchedule } from "./appointments.ts";

export const pageTitle =
  "UrbanCut Grooming Studio | Barber Shop in Gwarinpa, Abuja";
export const pageDescription =
  "Explore haircuts, beard grooming and barbering training at UrbanCut Grooming Studio in Gwarinpa, Abuja. View services and request an appointment.";

export function baseMetadata(config: IndexingConfig): Metadata {
  return {
    title: pageTitle,
    description: pageDescription,
    robots: { index: config.enabled, follow: true },
  };
}

export function homepageMetadata(config: IndexingConfig): Metadata {
  const image = config.origin
    ? [
        {
          url: `${config.origin}/media/urbancut-share.png`,
          width: 1200,
          height: 630,
          alt: studio.name,
        },
      ]
    : undefined;
  return {
    ...(config.origin
      ? {
          metadataBase: new URL(config.origin),
          alternates: { canonical: `${config.origin}/` },
        }
      : {}),
    openGraph: {
      type: "website",
      locale: "en_NG",
      siteName: studio.name,
      title: pageTitle,
      description: pageDescription,
      ...(config.origin ? { url: `${config.origin}/`, images: image } : {}),
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: pageTitle,
      description: pageDescription,
      ...(image ? { images: image } : {}),
    },
  };
}

export function businessSchema(config: IndexingConfig) {
  const time = (hour: number) => `${String(hour).padStart(2, "0")}:00`;
  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: studio.name,
    address: { "@type": "PostalAddress", ...studio.postalAddress },
    email: studio.email,
    sameAs: [studio.instagram],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "booking enquiries via WhatsApp",
      url: studio.whatsapp,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: time(studioSchedule.weekdayOpen),
        closes: time(studioSchedule.close),
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: time(studioSchedule.sundayOpen),
        closes: time(studioSchedule.close),
      },
    ],
    ...(config.origin
      ? {
          "@id": `${config.origin}/#business`,
          url: `${config.origin}/`,
          logo: `${config.origin}/media/urbancut-logo-header.svg`,
          image: `${config.origin}/media/urbancut-share.png`,
        }
      : {}),
  };
}

export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
