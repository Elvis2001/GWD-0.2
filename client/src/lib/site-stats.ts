// Single source of truth for organisation-wide figures. Every page that shows
// a headline number reads it from here so the site never contradicts itself.
// Update the values and `STATS_AS_OF` together.
export const STATS_AS_OF = "October 2026";

export const IMPACT_STATS = {
  students: { value: 8000, suffix: "+", label: "Students reached" },
  schools: { value: 25, suffix: "+", label: "Schools & institutions" },
  trainingHours: { value: 25000, suffix: "+", label: "Training hours" },
  partners: { value: 15, suffix: "+", label: "Partner organisations" },
} as const;

export type ImpactStatKey = keyof typeof IMPACT_STATS;

export function formatStat(key: ImpactStatKey): string {
  const stat = IMPACT_STATS[key];
  return `${stat.value.toLocaleString()}${stat.suffix}`;
}

// Schools and partners named in published GWD posts. Swap names for logo
// images once they are available.
export const PARTNERS = [
  "Remi Educational Foundation",
  "AUN Schools – Charter",
  "Government Girls Secondary School, Yola",
  "Suleiman Ribadu Academy",
  "Kim Standard",
  "NE Innovation Hub",
  "Mentors International",
];

// Lowest donation tier on /donate, used as the concrete ask on the home page.
export const DONATION_ASK = {
  amount: "₦5,000",
  outcome: "provides curriculum materials and club tools for one student",
};
