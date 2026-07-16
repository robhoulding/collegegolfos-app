import { NextRequest, NextResponse } from "next/server";
import { searchCollegePrograms } from "@/lib/college-api-server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const result = await searchCollegePrograms({
    gender: searchParams.get("gender") ?? undefined,
    association: searchParams.get("association") ?? undefined,
    division: searchParams.get("division") ?? undefined,
    state: searchParams.get("state") ?? undefined,
    q: searchParams.get("q") ?? undefined,
    athletic_data_tier: searchParams.get("athletic_data_tier") ?? undefined,
    major: searchParams.get("major") ?? undefined,
    public_private: searchParams.get("public_private") ?? undefined,
    max_net_cost: searchParams.get("max_net_cost")
      ? Number(searchParams.get("max_net_cost"))
      : undefined,
    match_priority: searchParams.get("match_priority") ?? undefined,
    limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : undefined,
    offset: searchParams.get("offset") ? Number(searchParams.get("offset")) : undefined,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json(result.data);
}
