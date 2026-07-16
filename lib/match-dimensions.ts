export const MATCH_DIMENSIONS = [
  {
    key: "scoring_average",
    label: "Scoring Average",
    shortLabel: "Scoring",
    description: "How your tournament scoring aligns with program team benchmarks.",
  },
  {
    key: "academics",
    label: "Academics",
    shortLabel: "Academics",
    description: "Admission selectivity, majors, and academic profile fit.",
  },
  {
    key: "location",
    label: "Location",
    shortLabel: "Location",
    description: "Region, distance, and geography preferences.",
  },
  {
    key: "budget",
    label: "Budget",
    shortLabel: "Budget",
    description: "Estimated net cost and financial fit.",
  },
  {
    key: "competition",
    label: "Competition",
    shortLabel: "Competition",
    description: "Division level, team ranking, and roster opportunity.",
  },
  {
    key: "culture_fit",
    label: "Culture Fit",
    shortLabel: "Culture",
    description: "Campus size, setting, and program culture alignment.",
  },
] as const;

export type MatchDimensionKey = (typeof MATCH_DIMENSIONS)[number]["key"];

export function matchDimensionByKey(key: string) {
  return MATCH_DIMENSIONS.find((d) => d.key === key);
}
