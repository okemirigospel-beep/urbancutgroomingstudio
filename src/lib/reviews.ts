export type ClientReview = {
  id: string;
  text: string;
  label: string;
};

export const reviews: readonly ClientReview[] = [
  {
    id: "craft",
    text: "You’re one of the best barbers I’ve ever had. You’re good at what you do, and I look my best whenever you cut my hair. God bless your craft.",
    label: "Onoja James",
  },
  {
    id: "sharp",
    text: "UrbanCut, you’re really good at what you do! My haircut still looks sharp. You know your craft!",
    label: "Bryma",
  },
  {
    id: "experience",
    text: "I had a great haircut experience at UrbanCut Grooming Studio.",
    label: "Collins",
  },
];
