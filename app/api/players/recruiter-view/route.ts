import { NextResponse } from "next/server";
import {
  collegeCoachApiFetch,
  readUpstreamJson,
} from "@/lib/college-coach-api-server";
import { getCollegeCoachSession } from "@/lib/college-coach-session";

export const dynamic = "force-dynamic";

/**
 * Proxy redacted shared-player view (college-safe).
 * Requires signed-in college coach; upstream enforces email match + token.
 */
export async function GET(request: Request) {
  const session = await getCollegeCoachSession();
  if (!session) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const token = new URL(request.url).searchParams.get("token")?.trim() ?? "";
  if (!token) {
    return NextResponse.json({ error: "token is required" }, { status: 400 });
  }

  const upstream = await collegeCoachApiFetch(
    `/api/college/coaches/player-view?coach_id=${encodeURIComponent(session.coachId)}&token=${encodeURIComponent(token)}`,
    { session },
  );
  const { data, status } = await readUpstreamJson(upstream);
  return NextResponse.json(data, { status });
}
