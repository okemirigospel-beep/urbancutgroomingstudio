import { openingHoursSummary, studioSchedule } from "./appointments.ts";
export const brand = {
  name: "URBANCUT",
  region: "Abuja, Nigeria",
  hours: openingHoursSummary,
  timezone: studioSchedule.timeZone,
};
export const academy = [
  {
    title: "Foundation",
    fee: 110000,
    duration: "4 months",
    audience: "An introduction to the craft",
    outline:
      "Tool familiarisation, hygiene basics, client consultation and introductory haircutting.",
  },
  {
    title: "Elevated Skills",
    fee: 160000,
    duration: "4 months",
    audience: "Build on the basics",
    outline: "Sectioning, blending, introductory fades and beard shaping.",
  },
  {
    title: "Professional Grooming",
    fee: 230000,
    duration: "5 months",
    audience: "Develop consistent practice",
    outline:
      "Advanced haircut practice, styling, service consistency and client care.",
  },
  {
    title: "Advanced Artistry",
    fee: 320000,
    duration: "5 months",
    audience: "Explore more creative work",
    outline:
      "Creative finishing, introductory braiding and loc techniques, and corrective practice.",
  },
  {
    title: "Mastery Programme",
    fee: 450000,
    duration: "6 months",
    audience: "Refine a broader skill set",
    outline:
      "Complex practical work, portfolio development and studio workflow fundamentals.",
  },
];
export const faqs = [
  [
    "Where can I find the studio?",
    "We operate from one studio in Abuja, Nigeria. The exact address and directions are pending; please confirm them before planning your visit.",
  ],
  ["When are you open?", openingHoursSummary],
  [
    "Can I request an appointment for today?",
    "Please request at least the day before your preferred visit. Same-day requests are not available through this flow. Your preferred time is not confirmed availability.",
  ],
  [
    "Can I choose more than one service?",
    "Yes. You can include multiple services, including adult and children’s haircuts, and increase quantities for more than one person.",
  ],
  [
    "Can I choose my barber?",
    "The website does not offer staff selection. The studio will allocate the appropriate professional.",
  ],
  [
    "Do you offer home services?",
    "Home Service is a separate enquiry: ₦100,000 in Abuja for a one-person premium grooming package. Treatments and arrangements are confirmed during enquiry. Requests elsewhere in Nigeria or abroad are priced separately by arrangement.",
  ],
  [
    "Are manicure, pedicure and spa services available?",
    "Manicure, pedicure and Manicure + Pedicure are Coming Soon. Their planned prices are not payable now and they cannot be booked. The Wellness category currently previews Nail & Foot Care only; proposed Black Card benefits are not an available spa menu.",
  ],
  [
    "Is the academy operating?",
    "Yes. Enquire about current training options. The five programme outlines, fees and durations shown here are provisional, not enrolment terms.",
  ],
  [
    "Can I buy grooming products?",
    "The product range has not launched. Beard oil, beard balm and styling cream are sample previews with no checkout or stock promise.",
  ],
  [
    "Do I need to pay a deposit?",
    "Please ask the studio to confirm any deposit requirement before your appointment. A deposit policy has not yet been published.",
  ],
  [
    "What if I need to cancel, reschedule or arrive late?",
    "Contact the studio with your appointment details as soon as possible. Applicable notice requirements and charges must be confirmed with the studio.",
  ],
  [
    "Do you accept walk-ins?",
    "Please contact the studio to check before visiting without a confirmed appointment.",
  ],
  [
    "Are these final prices, and is this a live booking?",
    "Our Services shows published listed prices, with planned nail-care prices marked Coming Soon. Your selection creates an appointment request, not a confirmed reservation. Review it, continue to WhatsApp and press Send there. The studio must confirm availability, final amount and arrangements. The website does not save or send your request.",
  ],
];
export { money } from "./catalogue";
