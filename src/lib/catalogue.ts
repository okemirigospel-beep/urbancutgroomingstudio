export type CategoryId = "haircuts" | "beard" | "hair-care" | "wellness";
export type Category = {
  id: CategoryId | "home" | "membership";
  name: string;
  image: string;
  caption: string;
  kind: "studio" | "enquiry-only" | "coming-soon";
};
export const categories: Category[] = [
  {
    id: "haircuts",
    name: "Haircuts & Grooming",
    image: "haircuts",
    caption: "Personal cuts. Considered finishes.",
    kind: "studio",
  },
  {
    id: "beard",
    name: "Beard & Shave",
    image: "beard",
    caption: "Clean lines. A well-groomed finish.",
    kind: "studio",
  },
  {
    id: "hair-care",
    name: "Hair & Scalp Care",
    image: "hair-care",
    caption: "Care, colour and loc maintenance.",
    kind: "studio",
  },
  {
    id: "wellness",
    name: "UrbanCut Wellness",
    image: "wellness",
    caption: "Nail & Foot Care",
    kind: "coming-soon",
  },
  {
    id: "home",
    name: "UrbanCut Home Service",
    image: "home",
    caption: "Premium grooming at your location.",
    kind: "enquiry-only",
  },
  {
    id: "membership",
    name: "UrbanCut Black Card",
    image: "membership",
    caption: "Monthly Grooming Membership",
    kind: "coming-soon",
  },
];
export type Service = {
  id: string;
  category: CategoryId;
  name: string;
  price: number;
  duration?: number;
  description: string;
  inclusions?: string[];
  status: "bookable" | "coming-soon";
};
export const services: Service[] = [
  {
    id: "signature-cut",
    category: "haircuts",
    name: "UrbanCut Signature Haircut",
    price: 15000,
    duration: 45,
    status: "bookable",
    description:
      "A personalised haircut with more time dedicated to precision, shape and finishing details. Ideal for clients who appreciate extra attention to their look.",
  },
  {
    id: "express-cut",
    category: "haircuts",
    name: "UrbanCut Express Haircut",
    price: 10000,
    duration: 35,
    status: "bookable",
    description:
      "A professional haircut in a shorter, focused appointment. Refresh your look with a neat finish that fits into your schedule.",
  },
  {
    id: "kids-cut",
    category: "haircuts",
    name: "Kids Haircut",
    price: 5000,
    status: "bookable",
    description:
      "A neat, age-appropriate haircut tailored to your child’s style, with care and attention throughout the appointment.",
  },
  {
    id: "ladies-cut",
    category: "haircuts",
    name: "Ladies Haircut",
    price: 15000,
    status: "bookable",
    description:
      "A personalised cut that complements your features and style, whether you prefer a close crop, a shaped short cut or a refresh of your current look.",
  },
  {
    id: "signature-experience",
    category: "haircuts",
    name: "The UrbanCut Signature Experience",
    price: 32000,
    duration: 45,
    status: "bookable",
    description:
      "A complete grooming refresh combining a haircut, dye, shave, hairline detailing and shampoo for a polished, coordinated finish.",
    inclusions: ["Haircut", "Dye", "Shave", "Hairline detailing", "Shampoo"],
  },
  {
    id: "premium-shave",
    category: "beard",
    name: "Premium Shave",
    price: 5000,
    status: "bookable",
    description:
      "A careful shave focused on neatness and a clean, well-groomed finish.",
  },
  {
    id: "shave-enhancement",
    category: "beard",
    name: "Shave + Enhancement",
    price: 8000,
    status: "bookable",
    description:
      "A neat shave with added enhancement for sharper definition, tailored to your preferred finish.",
  },
  {
    id: "shampoo",
    category: "hair-care",
    name: "Shampoo Treatment",
    price: 5000,
    status: "bookable",
    description:
      "Cleanse away dirt, excess oil and product buildup for fresh-feeling hair and scalp. Enjoy on its own or alongside another grooming service.",
  },
  {
    id: "black-dye",
    category: "hair-care",
    name: "Black Hair Dye",
    price: 5000,
    status: "bookable",
    description:
      "Refresh faded colour, cover visible greys or achieve a more uniform look with a rich black finish.",
  },
  {
    id: "texturizer",
    category: "hair-care",
    name: "Texturizer",
    price: 6000,
    status: "bookable",
    description:
      "A chemical treatment that loosens your natural curl pattern. Your hair type, condition and preferred texture guide the treatment.",
  },
  {
    id: "blonde",
    category: "hair-care",
    name: "Blonde Colour Tinting",
    price: 15000,
    status: "bookable",
    description:
      "Refresh your style with a blonde tone. Your starting colour and previous treatments will influence the shade achievable.",
  },
  {
    id: "other-colours",
    category: "hair-care",
    name: "Other Colours",
    price: 25000,
    status: "bookable",
    description:
      "Express your style with a colour beyond black or blonde. Discuss your preferred shade and availability before booking.",
  },
  {
    id: "palm-rolling",
    category: "hair-care",
    name: "Locs — Palm Rolling",
    price: 30000,
    status: "bookable",
    description:
      "Maintain and neaten existing locs with palm rolling, helping define their shape for a well-groomed appearance.",
  },
  {
    id: "manicure",
    category: "wellness",
    name: "Manicure",
    price: 7000,
    status: "coming-soon",
    description:
      "Dedicated hand and nail grooming for a neat, cared-for appearance and a polished everyday look.",
  },
  {
    id: "pedicure",
    category: "wellness",
    name: "Pedicure",
    price: 10000,
    status: "coming-soon",
    description:
      "Refresh your feet with dedicated foot and toenail care, leaving them feeling cared for and neatly groomed.",
  },
  {
    id: "manicure-pedicure",
    category: "wellness",
    name: "Manicure + Pedicure",
    price: 15000,
    status: "coming-soon",
    description:
      "Complete hand and foot grooming in one appointment, combining our manicure and pedicure services.",
  },
];
export const homeOffering = {
  status: "enquiry-only" as const,
  title: "Premium Grooming at Your Location",
  price: 100000,
  package: "One-person premium grooming package",
  description:
    "A one-person premium grooming package delivered at your preferred location. The exact treatments and visit arrangements are confirmed during enquiry.",
  outside:
    "Requests elsewhere in Nigeria or abroad are considered by arrangement. Pricing is quoted separately.",
};
export const membership = {
  status: "coming-soon" as const,
  registrationFee: 50000,
  headline: "Your grooming routine, thoughtfully planned.",
  introduction:
    "Our upcoming monthly grooming membership is designed around consistent personal care, regular appointments and booking privileges.",
  benefits: [
    "Two premium haircuts per month.",
    "Beard maintenance.",
    "Manicure and pedicure.",
    "Facial care.",
    "Massage.",
    "Hair colour.",
    "Priority booking, subject to availability.",
    "Birthday benefit.",
    "Complimentary add-on.",
    "Priority home-service booking, subject to availability.",
  ],
};
export const money = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;
