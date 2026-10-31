import { studioPolicies, studioRequestNotice } from "./studio-policies.ts";
import { openingHoursSummary, studioSchedule } from "./appointments.ts";
export const brand = {
  name: "URBANCUT",
  region: "Gwarinpa, Abuja · Nigeria",
  hours: openingHoursSummary,
  timezone: studioSchedule.timeZone,
};
export type FAQ = { id: string; question: string; answer: string };
export const faqs: readonly FAQ[] = [
  {
    id: "location",
    question: "Where can I find the studio?",
    answer:
      "We operate from one studio in Abuja, Nigeria. Find us at 45 1st Avenue, Gwarinpa, Abuja 900108, Federal Capital Territory.",
  },
  { id: "hours", question: "When are you open?", answer: openingHoursSummary },
  {
    id: "same-day",
    question: "Can I request an appointment for today?",
    answer:
      "Please request at least the day before your preferred visit. Same-day requests are not available through this flow. Your preferred time is not confirmed availability.",
  },
  {
    id: "multiple-services",
    question: "Can I choose more than one service?",
    answer:
      "Yes. You can include multiple services, including adult and children’s haircuts, and increase quantities for more than one person.",
  },
  {
    id: "barber",
    question: "Can I choose my barber?",
    answer:
      "The website does not offer staff selection. The studio will allocate the appropriate professional.",
  },
  {
    id: "home-service",
    question: "Do you offer home services?",
    answer:
      "Home Service is a separate enquiry: ₦100,000 in Abuja for a one-person premium grooming package. Treatments and arrangements are confirmed during enquiry. Requests elsewhere in Nigeria or abroad are priced separately by arrangement.",
  },
  {
    id: "nail-wellness",
    question: "Are manicure, pedicure and spa services available?",
    answer:
      "Manicure, pedicure and Manicure + Pedicure are Coming Soon. Their planned prices are not payable now and they cannot be booked. The Wellness category currently previews Nail & Foot Care only; proposed Black Card benefits are not an available spa menu.",
  },
  {
    id: "academy",
    question: "Is the academy operating?",
    answer:
      "Yes. Admissions are open for five standalone programmes. Previous UrbanCut training is not required. Explore UrbanCut Academy and enquire about your chosen programme.",
  },
  {
    id: "products",
    question: "Can I buy grooming products?",
    answer:
      "The UrbanCut Grooming Collection is coming soon. Products are not available to order yet.",
  },
  {
    id: "deposit",
    question: "Is advance payment required for studio appointments?",
    answer: studioPolicies[0].text,
  },
  {
    id: "changes",
    question: "What if I need to change my studio appointment?",
    answer:
      "Contact the studio on WhatsApp with your appointment details. " +
      studioPolicies[1].text,
  },
  {
    id: "walk-ins",
    question: "Do you accept walk-ins?",
    answer:
      "Please contact the studio to check before visiting without a confirmed appointment.",
  },
  {
    id: "listed-prices",
    question: "Is this a confirmed studio booking?",
    answer:
      "Choose your services and preferred time, then continue to WhatsApp to request an appointment. " +
      studioRequestNotice,
  },
  {
    id: "confirmation",
    question: "When is my studio appointment confirmed?",
    answer:
      studioRequestNotice +
      " Payment details will be provided by the studio on WhatsApp.",
  },
  {
    id: "arrival",
    question: "When should I arrive for my appointment?",
    answer:
      "Please arrive on time so we can give your service the attention it deserves.",
  },
  {
    id: "late-arrival",
    question: "What happens if I arrive late?",
    answer:
      "Late arrival may reduce the time available for your appointment. Please contact the studio as soon as possible if you are running late.",
  },
  {
    id: "cancellation-policy",
    question: "How does rescheduling a missed studio appointment work?",
    answer: studioPolicies[1].text,
  },
  {
    id: "missed-appointment",
    question: "What happens if I miss my studio appointment?",
    answer: studioPolicies[1].text,
  },
  {
    id: "home-booking-terms",
    question: "What are the booking terms for home services?",
    answer:
      "Share your preferred date, time and full address when making your enquiry. Our team will confirm availability, package details, any applicable travel charges and the required payment or deposit before confirming your booking.",
  },
];
export { money } from "./catalogue";
