import { cookies } from "next/headers";

export const COLLEGE_COACH_SESSION_COOKIE = "cgo_coach";

export type CollegeCoachSession = {
  coachId: string;
  userId: string;
  email: string;
  displayName: string;
};

function parseSession(value: string | undefined): CollegeCoachSession | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as CollegeCoachSession;
    if (!parsed.coachId?.trim() || !parsed.email?.trim()) return null;
    return {
      coachId: parsed.coachId.trim(),
      userId: parsed.userId?.trim() || parsed.coachId.trim(),
      email: parsed.email.trim().toLowerCase(),
      displayName: parsed.displayName?.trim() || "College Coach",
    };
  } catch {
    return null;
  }
}

export async function getCollegeCoachSession(): Promise<CollegeCoachSession | null> {
  const value = (await cookies()).get(COLLEGE_COACH_SESSION_COOKIE)?.value;
  return parseSession(value);
}

export function collegeCoachSessionCookieValue(
  session: CollegeCoachSession,
): string {
  return JSON.stringify({
    coachId: session.coachId.trim(),
    userId: session.userId.trim(),
    email: session.email.trim().toLowerCase(),
    displayName: session.displayName.trim() || "College Coach",
  });
}
