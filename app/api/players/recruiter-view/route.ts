import { NextResponse } from "next/server";
import {
  collegeCoachApiFetch,
  readUpstreamJson,
} from "@/lib/college-coach-api-server";
import { getCollegeCoachSession } from "@/lib/college-coach-session";

export const dynamic = "force-dynamic";

/** Proxy shared-player recruiter view for signed-in college coaches. */
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
    `/api/players/recruiter-view?token=${encodeURIComponent(token)}`,
    { session },
  );
  const { data, status } = await readUpstreamJson(upstream);

  // Permission: invite must be addressed to this coach email when present.
  const payload = data as {
    access?: { coach_email?: string };
    error?: string;
  };
  const inviteEmail = payload.access?.coach_email?.trim().toLowerCase();
  if (
    upstream.ok &&
    inviteEmail &&
    inviteEmail !== session.email.toLowerCase()
  ) {
    return NextResponse.json(
      { error: "This invite is addressed to a different coach email." },
      { status: 403 },
    );
  }

  return NextResponse.json(data, { status });
}
