import { NextResponse } from "next/server";
import {
  collegeCoachApiFetch,
  readUpstreamJson,
} from "@/lib/college-coach-api-server";
import { getCollegeCoachSession } from "@/lib/college-coach-session";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getCollegeCoachSession();
  if (!session) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  const upstream = await collegeCoachApiFetch(
    `/api/college/coaches/briefing?coach_id=${encodeURIComponent(session.coachId)}`,
    { session },
  );
  const { data, status } = await readUpstreamJson(upstream);
  return NextResponse.json(data, { status });
}
