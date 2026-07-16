/**
 * Shared GolfCoachOS ecosystem design tokens.
 * CollegeGolfOS / GolfCoachOS / JuniorGolfOS / GolfAcademyOS / VarsityGolfOS
 * should reuse this mental model so coaches feel at home across products.
 *
 * Navigation philosophy (role changes, order stays familiar):
 * 1. Today's Briefing (always first / default — top of primary nav)
 * 2. Primary operating surface (Team | Players | Roster)
 * 3. Pipeline / Recruiting
 * 4. Selection / Competition decisions
 * 5. Find / Search
 * 6. Schedule
 * 7. Communication
 * 8. Trends
 * 9. Settings
 *
 * Visual family: navy surfaces, orange for active/priority/CTA only,
 * card radius 12, section labels uppercase tracked, briefing priority cards
 * with urgency accent. Products may vary composition; tokens stay shared.
 */

export const OS_ORANGE = "#EC691A";
export const OS_NAVY = "#0B1220";
export const OS_SURFACE = "#141C2B";
export const OS_SURFACE_ELEVATED = "#1A2436";
export const OS_BORDER = "rgba(255,255,255,0.10)";
export const OS_MUTED = "#FFFFFF";
export const OS_MUTED_SOFT = "rgba(255,255,255,0.72)";
export const OS_EMERALD = "#10B981";
export const OS_GOLD = "#D4A017";
export const OS_INFO = "#3B82F6";

export const osCardSoft: React.CSSProperties = {
  background: OS_SURFACE,
  border: `1px solid ${OS_BORDER}`,
  borderRadius: 12,
  padding: "18px 20px",
};

export const osCardPrimary: React.CSSProperties = {
  ...osCardSoft,
  background: OS_SURFACE_ELEVATED,
  borderTop: `3px solid ${OS_ORANGE}`,
};

export const osSectionLabel: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 800,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: OS_MUTED_SOFT,
  marginBottom: 12,
};

export type CoachNavItem = {
  href: string;
  label: string;
  exact?: boolean;
};

/** Canonical Coach Workspace nav for CollegeGolfOS */
export const COLLEGE_COACH_NAV: CoachNavItem[] = [
  { href: "/app", label: "Today's Briefing", exact: true },
  { href: "/app/team", label: "Team" },
  { href: "/app/recruiting", label: "Recruiting" },
  { href: "/app/player-selection", label: "Player Selection" },
  { href: "/app/find-players", label: "Find Players" },
  { href: "/app/schedule", label: "Schedule" },
  { href: "/app/communication", label: "Communication" },
  { href: "/app/trends", label: "Trends" },
  { href: "/app/settings", label: "Settings" },
];
