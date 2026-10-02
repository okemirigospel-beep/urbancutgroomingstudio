import { money } from "./catalogue.ts";
import { whatsappUrl } from "./booking.ts";
export type Programme = {
  id: string;
  level: number;
  name: string;
  subtitle?: string;
  duration: string;
  feeNaira: number;
  shortDescription: string;
  introduction: string;
  curriculumGroups: { title: string; items: string[] }[];
  certificateTitle?: string;
  imageSrc: string;
  imageAlt: string;
};
export const programmes: readonly Programme[] = [
  {
    id: "foundation",
    level: 1,
    name: "UrbanCut Foundation",
    duration: "4 Weeks",
    feeNaira: 110000,
    shortDescription:
      "Build a foundation in barbering tools, haircut techniques, hygiene and client care.",
    introduction:
      "For beginners who want to understand the fundamentals of professional barbering.",
    curriculumGroups: [
      {
        title: "Curriculum",
        items: [
          "Barbering fundamentals",
          "Clippers & trimmers",
          "Haircut foundations",
          "Fades",
          "Hairline & finishing",
          "Beard basics",
          "Hygiene & sanitation",
          "Client consultation",
          "Professional barber conduct",
        ],
      },
    ],
    imageSrc: "/media/academy/urbancut-foundation.webp",
    imageAlt:
      "Barbering clipper, guards and comb arranged on a dark work surface.",
    certificateTitle: "UrbanCut Foundation Certificate",
  },
  {
    id: "professional",
    level: 2,
    name: "UrbanCut Professional",
    duration: "8 Weeks",
    feeNaira: 150000,
    shortDescription:
      "Develop your fading, beard design and professional workflow while building a portfolio.",
    introduction:
      "For students ready to move beyond the basics and develop professional-level barbering skills.",
    curriculumGroups: [
      {
        title: "Curriculum",
        items: [
          "Advanced fading",
          "Afro-textured hair",
          "Beard design",
          "Hair enhancement",
          "Colour fundamentals",
          "Client experience",
          "Speed & precision",
          "Professional workflow",
          "Portfolio development",
          "Introduction to barbering business",
        ],
      },
    ],
    imageSrc: "/media/academy/urbancut-professional.webp",
    imageAlt: "Barber refining a short haircut with clippers.",
    certificateTitle: "UrbanCut Professional Barber Certificate",
  },
  {
    id: "master",
    level: 3,
    name: "UrbanCut Master",
    duration: "3 Months",
    feeNaira: 280000,
    shortDescription:
      "Refine technical precision, consistency and client consultation alongside your professional brand.",
    introduction:
      "An intensive programme focused on technical refinement, professional consistency and the development of your barbering practice.",
    curriculumGroups: [
      {
        title: "Curriculum",
        items: [
          "Advanced haircut techniques",
          "Precision fading",
          "Beard artistry",
          "Colour & enhancement",
          "Hair texture management",
          "Advanced client consultation",
          "Speed & consistency",
          "Professional photography/content",
          "Customer retention",
          "Pricing & service packaging",
          "Personal branding",
        ],
      },
    ],
    imageSrc: "/media/academy/urbancut-master.webp",
    imageAlt: "Barber detailing a client’s beard.",
    certificateTitle: "UrbanCut Certified Master Barber",
  },
  {
    id: "elite",
    level: 4,
    name: "UrbanCut Elite",
    duration: "6 Months",
    feeNaira: 550000,
    shortDescription:
      "Combine advanced barbering with business operations, marketing and content creation.",
    introduction:
      "A comprehensive programme combining advanced barbering, business knowledge and content creation.",
    curriculumGroups: [
      {
        title: "Barbering",
        items: [
          "Advanced technical skills",
          "Afro-textured hair mastery",
          "Beard artistry",
          "Colour",
          "Hair restoration fundamentals",
          "Advanced finishing",
        ],
      },
      {
        title: "Business",
        items: [
          "Starting a barbershop",
          "Business registration",
          "Pricing strategy",
          "Customer acquisition",
          "Social media marketing",
          "Personal branding",
          "Financial management",
          "Staff management",
          "Client retention",
        ],
      },
      {
        title: "Content",
        items: [
          "Photography",
          "Reels/TikTok",
          "Before & after content",
          "Advertising",
          "Personal brand development",
        ],
      },
    ],
    imageSrc: "/media/academy/urbancut-elite.webp",
    imageAlt: "Barber photographing a finished haircut.",
    certificateTitle: "UrbanCut Elite Professional Certificate",
  },
  {
    id: "executive",
    level: 5,
    name: "UrbanCut Executive",
    duration: "1 Year",
    feeNaira: 1000000,
    shortDescription:
      "Develop professional barbering, entrepreneurship and leadership skills through technical, business and brand development.",
    introduction:
      "A complete professional barbering, entrepreneurship and leadership development programme.",
    curriculumGroups: [
      {
        title: "Technical Mastery",
        items: ["Professional barbering."],
      },
      {
        title: "Business Mastery",
        items: ["How to build and operate a profitable grooming business."],
      },
      {
        title: "Brand Mastery",
        items: ["How to build a recognisable personal or business brand."],
      },
    ],
    imageSrc: "/media/academy/urbancut-executive.webp",
    imageAlt:
      "Grooming professional reviewing a notebook in a barbering studio.",
    subtitle: "Grooming & Business Certification",
  },
];

export const experiences = [
  "No previous experience",
  "Some experience",
  "Practising barber",
] as const;
export type AcademyDraft = { name: string; experience: string; notes: string };
export const emptyAcademyDraft: AcademyDraft = {
  name: "",
  experience: "",
  notes: "",
};
export function validateAcademy(draft: AcademyDraft) {
  const errors: Record<string, string> = {};
  if (!draft.name.trim()) errors.name = "Enter your full name.";
  if (!(experiences as readonly string[]).includes(draft.experience))
    errors.experience = "Choose your barbering experience.";
  return errors;
}
export function academyMessage(id: string, draft: AcademyDraft) {
  const programme = programmes.find((p) => p.id === id);
  if (!programme || Object.keys(validateAcademy(draft)).length) return null;
  return [
    "Hello UrbanCut Academy, I’m interested in the following programme.",
    "",
    `Name: ${draft.name.trim()}`,
    `Programme: ${programme.name}${programme.subtitle ? ` — ${programme.subtitle}` : ""}`,
    `Duration: ${programme.duration}`,
    `Fee: ${money(programme.feeNaira)}`,
    `Barbering experience: ${draft.experience}`,
    ...(draft.notes.trim() ? ["", "Questions:", draft.notes.trim()] : []),
    "",
    "Please share the enrolment details and next steps.",
  ].join("\n");
}
export function academyEnquiryUrl(id: string, draft: AcademyDraft) {
  const message = academyMessage(id, draft);
  return message === null ? null : whatsappUrl(message);
}
