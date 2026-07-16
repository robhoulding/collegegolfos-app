import { LINKS } from "@/lib/links";

export const HOME = {
  eyebrow: "Coaching in Context™",
  headlineLine1: "Recruit the Player.",
  headlineLine2: "Not Just the Numbers.",
  subheadLead: "Every college coach can see tournament scores.",
  subheadEmphasis:
    "CollegeGolfOS helps you understand the athlete behind those scores.",
  subheadBody:
    "View verified tournament performance alongside long-term development trends, coaching observations, Four Pillar progress, practice history, and player context—so you can recruit with greater confidence.",
  benefits: [
    "Recruit beyond rankings and scoreboards",
    "Understand long-term player development",
    "Compare verified performance in context",
    "Make more confident recruiting decisions",
  ],
  supportingHeadline: "See the player behind the scorecard.",
  supportingBody:
    "CollegeGolfOS is a recruiting and player evaluation platform built around Coaching in Context™ — so you can understand the athlete, not only the numbers.",
} as const;

export const VALUE_PROPS = [
  {
    title: "Beyond the scoreboard",
    body: "Tournament scores are only the start. See development trends, practice history, and coaching observations that rankings never show.",
  },
  {
    title: "Development in context",
    body: "Four Pillar progress and long-term player context help your staff evaluate fit with greater confidence.",
  },
  {
    title: "Built for coaching staffs",
    body: "Recruiting, roster decisions, and player evaluation in one connected platform — not another directory of numbers.",
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
    name: "VarsityGolfOS",
    role: "High school & varsity teams",
    href: LINKS.varsityGolfOs,
  },
  {
    name: "CollegeGolfOS",
    role: "College golf programs",
    href: LINKS.home,
    current: true,
  },
] as const;
