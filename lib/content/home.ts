import { LINKS } from "@/lib/links";

export const HOME = {
  eyebrow: "College recruiting · coach side",
  headline: "See the player behind the scorecard.",
  subhead:
    "CollegeGolfOS is the college coach hub for the GolfCoachOS ecosystem — verified development data, transparent player views, and recruiting workflows built on real coaching records.",
  trust: [
    "Read-only access to logged rounds & development context",
    "Invited by players — not a cold recruiting directory",
    "Powered by the same GolfCoachOS player record",
  ],
} as const;

export const VALUE_PROPS = [
  {
    title: "Transparent player views",
    body: "When a junior invites you, you see their real dashboard — scores, trends, team observations, and improvement focus. Not a self-curated résumé.",
  },
  {
    title: "Development truth",
    body: "Four-pillar context from their coaching team: physical, skill, mental, and on-course performance — the story behind the numbers.",
  },
  {
    title: "Ecosystem aligned",
    body: "GolfCoachOS develops the player. JuniorGolfOS connects families. CollegeGolfOS is where college programs discover and evaluate fit.",
  },
] as const;

export const ECOSYSTEM = [
  {
    name: "GolfCoachOS",
    role: "Player development OS",
    href: LINKS.golfCoachOs,
  },
  {
    name: "JuniorGolfOS",
    role: "Families & juniors",
    href: LINKS.juniorGolfOs,
  },
  {
    name: "GolfAcademyOS",
    role: "Academy programs",
    href: LINKS.academyOs,
  },
  {
    name: "CollegeGolfOS",
    role: "College coaches",
    href: LINKS.home,
    current: true,
  },
] as const;
