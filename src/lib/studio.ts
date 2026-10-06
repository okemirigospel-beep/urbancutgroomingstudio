import { studioSchedule } from "./appointments.ts";
import { whatsappBase } from "./booking.ts";

const hour = (h: number) => `${h % 12 || 12} ${h >= 12 ? "p.m." : "a.m."}`;
const postalAddress = {
  streetAddress: "45 1st Avenue, Gwarinpa",
  addressLocality: "Abuja",
  postalCode: "900108",
  addressRegion: "Federal Capital Territory",
  addressCountry: "NG",
};
export const studio = {
  postalAddress,
  name: "UrbanCut Grooming Studio",
  legalName: "UrbanCut Grooming Lounge & Spa Ltd",
  tiktok: "https://www.tiktok.com/@urbancut",
  address: `${postalAddress.streetAddress}, ${postalAddress.addressLocality} ${postalAddress.postalCode}, ${postalAddress.addressRegion}`,
  hours: [
    {
      days: "Monday–Saturday",
      hours: `${hour(studioSchedule.weekdayOpen)}–${hour(studioSchedule.close)}`,
    },
    {
      days: "Sunday",
      hours: `${hour(studioSchedule.sundayOpen)}–${hour(studioSchedule.close)}`,
    },
  ],
  whatsapp: whatsappBase,
  instagram: "https://www.instagram.com/urbancut9ja",
  email: "urbancut2020@gmail.com",
  directions:
    "https://www.google.com/maps/dir//Urbancut+grooming+studio,+45+1st+Avenue,+Gwarinpa,+Abuja+900108,+Federal+Capital+Territory/@9.024256,7.449868,11z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x104e75f8abda3d8d:0xcb4d77bfa7469571!2m2!1d7.4176867!2d9.1055931?entry=ttu",
};
