export const brand = {
  name: "URBANCUT",
  region: "Abuja, Nigeria",
  hours: "Monday–Saturday, 10:00 a.m.–6:00 p.m.",
  timezone: "Africa/Lagos",
};
export const categories = [
  "Barbering",
  "Loc care",
  "Braiding",
  "Home services",
] as const;
export type Category = (typeof categories)[number];
export type Service = {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  detail: string;
};
export const services: Service[] = [
  {
    id: "adult-cut",
    name: "Adult haircut",
    category: "Barbering",
    price: 7000,
    description: "A fresh cut. Your own point of view.",
    detail:
      "A haircut shaped around your preferred look. Final inclusions, duration and price will be confirmed by the studio.",
  },
  {
    id: "child-cut",
    name: "Children’s haircut",
    category: "Barbering",
    price: 4000,
    description: "A neat finish for the younger ones.",
    detail:
      "A haircut for a younger client. Add alongside an adult service, or increase the quantity for more than one child.",
  },
  {
    id: "beard",
    name: "Beard shape-up",
    category: "Barbering",
    price: 3500,
    description: "Considered lines. A clean outline.",
    detail:
      "Beard shaping for a clean outline. Discuss your preferred shape with the studio; duration and inclusions are pending.",
  },
  {
    id: "colour",
    name: "Hair colouring",
    category: "Barbering",
    price: 10000,
    description: "Make room for a different shade.",
    detail:
      "Colour application. Available colours, materials, preparation and pricing must be confirmed with the studio.",
  },
  {
    id: "waves",
    name: "Wave styling",
    category: "Barbering",
    price: 6000,
    description: "Definition, down to the finish.",
    detail:
      "Styling focused on a defined wave look. Exact service scope and duration are to be confirmed.",
  },
  {
    id: "starter-locs",
    name: "Starter locs",
    category: "Loc care",
    price: 18000,
    description: "The beginning of your loc journey.",
    detail:
      "An introductory loc installation service. Method, hair requirements and duration must be discussed with the studio.",
  },
  {
    id: "loc-maintenance",
    name: "Loc maintenance",
    category: "Loc care",
    price: 12000,
    description: "Care for the look you’re growing.",
    detail:
      "Maintenance and tidying of existing locs. Final scope depends on your hair and must be confirmed.",
  },
  {
    id: "loc-extensions",
    name: "Loc extensions",
    category: "Loc care",
    price: 35000,
    description: "Explore a new length and shape.",
    detail:
      "Extension work for a loc style. Materials, length and final pricing require confirmation.",
  },
  {
    id: "mens-braids",
    name: "Men’s braids",
    category: "Braiding",
    price: 10000,
    description: "A pattern that feels like you.",
    detail:
      "Braiding tailored to a chosen style. Confirm lengths, materials and exact options before your visit.",
  },
  {
    id: "womens-braids",
    name: "Women’s braids",
    category: "Braiding",
    price: 18000,
    description: "Your style, thoughtfully woven.",
    detail:
      "Braiding options with lengths, materials and duration to be confirmed with the studio.",
  },
  {
    id: "home-grooming",
    name: "Abuja home grooming enquiry",
    category: "Home services",
    price: 15000,
    description: "Grooming, in your own space.",
    detail:
      "Request a home visit within Abuja. Exact location, service scope, travel fee and scheduling must be confirmed; this sample is not an approved visit price.",
  },
];
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
  [
    "When are you open?",
    "Monday to Saturday, 10 a.m. to 6 p.m., Abuja time. We are closed on Sundays.",
  ],
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
    "Home-service enquiries are available within Abuja. The location, scope, travel fee and scheduling need to be confirmed with the studio.",
  ],
  [
    "Are manicure, pedicure and spa services available?",
    "Manicure, pedicure, massage and spa are coming soon and cannot be selected. Facial services are still unconfirmed.",
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
    "No. Displayed prices are examples awaiting approval. This local preview lets you prepare a sample request only. Nothing is saved, sent or confirmed.",
  ],
];
export const money = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;
