export const PROGRAM_AREAS = [
  {
    value: "financial-literacy",
    title: "Financial Literacy",
    tagline: "Smart money habits for a brighter tomorrow.",
  },
  {
    value: "digital-skills",
    title: "Digital Skills and Inclusion",
    tagline: "Access, skills and opportunities.",
  },
  {
    value: "entrepreneurship",
    title: "Entrepreneurship & Employability",
    tagline: "Turning ideas into sustainable livelihoods.",
  },
] as const;

export type ProgramArea = (typeof PROGRAM_AREAS)[number]["value"];
