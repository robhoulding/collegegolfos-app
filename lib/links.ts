function externalUrl(envValue: string | undefined, fallback: string): string {
  return envValue?.trim().replace(/\/$/, "") || fallback;
}

/** Cross-links across the GolfCoachOS ecosystem. */
export const LINKS = {
  home: "/",
  coaches: "/coaches",
  programs: "/programs",
  signIn: "/sign-in",
  app: "/app",
  appBriefing: "/app",
  appTeam: "/app/team",
  appProgram: "/app/program",
  appRecruiting: "/app/recruiting",
  appPlayerSelection: "/app/player-selection",
  appFindPlayers: "/app/find-players",
  appReverseSearch: "/app/reverse-search",
  appSchedule: "/app/schedule",
  appCommunication: "/app/communication",
  appTrends: "/app/trends",
  appSettings: "/app/settings",
  /** Legacy aliases */
  appInbox: "/app/communication",
  appBoard: "/app/recruiting",
  appRoster: "/app/team",
  golfCoachOs: externalUrl(
    process.env.NEXT_PUBLIC_GOLFCOACHOS_URL,
    "https://www.golfcoachos.com",
  ),
  juniorGolfOs: externalUrl(
    process.env.NEXT_PUBLIC_JUNIORGOLFOS_URL,
    "https://www.juniorgolfos.com",
  ),
  academyOs: externalUrl(
    process.env.NEXT_PUBLIC_GOLFACADEMYOS_URL,
    "https://www.golfacademyos.com",
  ),
  varsityGolfOs: externalUrl(
    process.env.NEXT_PUBLIC_VARSITYGOLFOS_URL,
    "https://www.varsitygolfos.com",
  ),
  collegeGolfOs: externalUrl(
    process.env.NEXT_PUBLIC_COLLEGEGOLFOS_URL,
    "https://www.collegegolfos.com",
  ),
  /** Shared API — same backend as GolfCoachOS when wired up. */
  apiBase: externalUrl(
    process.env.NEXT_PUBLIC_GOLFCOACHOS_API_URL,
    "https://golfcoachos-api-a2r5.vercel.app",
  ),
} as const;
