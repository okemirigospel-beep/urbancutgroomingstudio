// Replace the initials with approved portrait media here when supplied.
export const founder = {
  name: "Naad Williams",
  title: "Founder & Creative Director",
  initials: "NW",
  portrait: null as null | {
    src: string;
    width: number;
    height: number;
    alt: string;
  },
};

// Presentation only: catalogue prices, packages and availability remain authoritative.
export const categoryPhotography: Partial<Record<string, string>> = {
  wellness: "/media/services/wellness.webp",
  membership: "/media/services/membership.webp",
};
