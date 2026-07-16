/** Client helper for College Today's Briefing (deterministic, no LLM). */

export type CollegeBriefing = {
  briefing_type: "college_coach";
  generated_at: string;
  program_status: {
    roster_note: string;
    available_note: string;
    tournament_note: string;
    pipeline_count: number;
    inbox_count: number;
    program_name: string | null;
  };
  executive_summary: {
    status: string;
    headline: string;
    summary: string;
  };
  priorities: Array<{
    id: string;
    title: string;
    urgency: "high" | "medium" | "low";
    evidence: string;
    why_it_matters: string;
    action: string;
    destination: string;
  }>;
  positive_momentum: Array<{
    title: string;
    evidence: string;
    destination?: string;
  }>;
  recruiting_activity: Array<{
    title: string;
    evidence: string;
    destination: string;
  }>;
  upcoming_events: Array<{
    title: string;
    context: string;
    destination?: string;
  }>;
  data_gaps: Array<{ label: string; explanation: string }>;
  coach_name: string;
};

export async function fetchCollegeBriefing(): Promise<CollegeBriefing> {
  const response = await fetch("/api/college/coach/briefing", {
    cache: "no-store",
  });
  const data = (await response.json().catch(() => ({}))) as CollegeBriefing & {
    error?: string;
  };
  if (!response.ok) {
    throw new Error(data.error || `Briefing failed (${response.status})`);
  }
  return data;
}
