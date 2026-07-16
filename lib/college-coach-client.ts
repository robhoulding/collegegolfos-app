/** Browser client for CollegeGolfOS coach workspace BFFs. */

export type CollegeCoachMe = {
  coach_id: string;
  user_id: string;
  email: string;
  name: string;
  title: string | null;
  golf_program_id: string | null;
  verified: boolean;
  program: {
    id: string;
    gender_category: string;
    association: string;
    division: string | null;
    institution_name: string;
  } | null;
};

export type InboxInvite = {
  id: string;
  access_token: string;
  player_id: string;
  player_name: string;
  school_program: string | null;
  invited_by: string | null;
  status: string;
  expires_at: string | null;
  last_viewed_at: string | null;
  view_count: number;
  created_at: string;
  on_board: boolean;
};

export type PipelineCard = {
  id: string;
  player_id: string;
  stage: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  player: {
    id: string;
    first_name: string;
    last_name: string;
    graduation_year: number | null;
    handicap_index: number | null;
    hometown: string | null;
    recruiting_visibility: string | null;
  } | null;
  invite: {
    access_token: string;
    status: string;
    expires_at: string | null;
    school_program: string | null;
  } | null;
};

async function readJson<T>(response: Response): Promise<T> {
  const data = (await response.json().catch(() => ({}))) as T & {
    error?: string;
  };
  if (!response.ok) {
    throw new Error(
      (data as { error?: string }).error ||
        `Request failed (${response.status})`,
    );
  }
  return data;
}

export async function signInCollegeCoach(input: {
  email: string;
  name?: string;
}): Promise<{
  coachId: string;
  userId: string;
  email: string;
  displayName: string;
}> {
  const response = await fetch("/api/college/coach/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return readJson(response);
}

export async function signOutCollegeCoach(): Promise<void> {
  await fetch("/api/college/coach/session", { method: "DELETE" });
}

export async function fetchCollegeCoachMe(): Promise<CollegeCoachMe> {
  const response = await fetch("/api/college/coach/me", { cache: "no-store" });
  return readJson(response);
}

export async function fetchCoachInbox(): Promise<{ invites: InboxInvite[] }> {
  const response = await fetch("/api/college/coach/inbox", {
    cache: "no-store",
  });
  return readJson(response);
}

export async function acceptInviteToBoard(inviteId: string): Promise<void> {
  const response = await fetch("/api/college/coach/inbox", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ invite_id: inviteId }),
  });
  await readJson(response);
}

export async function fetchPipeline(): Promise<{
  stages: string[];
  cards: PipelineCard[];
}> {
  const response = await fetch("/api/college/coach/pipeline", {
    cache: "no-store",
  });
  return readJson(response);
}

export async function updatePipelineCard(
  id: string,
  patch: { stage?: string; notes?: string | null },
): Promise<void> {
  const response = await fetch(
    `/api/college/coach/pipeline?id=${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    },
  );
  await readJson(response);
}

export async function removePipelineCard(id: string): Promise<void> {
  const response = await fetch(
    `/api/college/coach/pipeline?id=${encodeURIComponent(id)}`,
    { method: "DELETE" },
  );
  await readJson(response);
}
