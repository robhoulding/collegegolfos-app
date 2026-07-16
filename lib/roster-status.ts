/** Shared roster status vocabulary for CollegeGolfOS Team (not recruiting board). */
export const ROSTER_STATUSES = [
  "Prospect",
  "Committed",
  "Signed",
  "Incoming",
  "Active",
  "Redshirt",
  "Unavailable",
  "Graduated",
  "Transferred",
  "Former Player",
] as const;

export type RosterStatus = (typeof ROSTER_STATUSES)[number];

/** Active team statuses — never mix with recruiting pipeline cards as "team". */
export const ACTIVE_TEAM_STATUSES: RosterStatus[] = [
  "Active",
  "Redshirt",
  "Unavailable",
  "Incoming",
  "Signed",
];

export const CLASS_YEARS = [
  "Freshman",
  "Sophomore",
  "Junior",
  "Senior",
  "Graduate",
] as const;
