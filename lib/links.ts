function externalUrl(envValue: string | undefined, fallback: string): string {
  return envValue?.trim().replace(/\/$/, "") || fallback;
}

/** Cross-links across the GolfCoachOS ecosystem. */
export const LINKS = {
  home: "/",
  coaches: "/coaches",
  programs: "/programs",
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
  /** Shared API — same backend as GolfCoachOS when wired up. */
  apiBase: externalUrl(
    process.env.NEXT_PUBLIC_GOLFCOACHOS_API_URL,
    "https://golfcoachos-api-a2r5.vercel.app",
  ),
} as const;
