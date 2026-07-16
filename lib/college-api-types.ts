export type ProgramListItem = {
  id: string;
  gender_category: string;
  association: string;
  division: string | null;
  conference: string | null;
  is_ivy: boolean;
  athletic_data_tier: string;
  team_ranking: number | null;
  team_scoring_average: number | null;
  scholarship_model: string | null;
  source_confidence: string;
  last_verified_at: string | null;
  institution: {
    id: string;
    name: string;
    slug: string;
    city: string | null;
    state_province: string | null;
    country: string;
    public_private: string | null;
    undergraduate_enrollment: number | null;
    acceptance_rate: number | null;
    estimated_net_cost: number | null;
  };
};

export type ProgramSearchResponse = {
  programs: ProgramListItem[];
  pagination: { total: number; limit: number; offset: number };
};

export type ProgramSearchFilters = {
  gender?: string;
  association?: string;
  division?: string;
  state?: string;
  q?: string;
  athletic_data_tier?: string;
  major?: string;
  public_private?: string;
  max_net_cost?: number;
  match_priority?: string;
  limit?: number;
  offset?: number;
};

export type ProgramDetail = ProgramListItem & {
  program_url: string | null;
  head_coach_name: string | null;
  head_coach_email: string | null;
  competitive_tier: string | null;
  roster_size: number | null;
  disclaimers: string[];
  institution: ProgramListItem["institution"] & {
    tuition_in_state: number | null;
    tuition_out_of_state: number | null;
    median_gpa: number | null;
    sat_25: number | null;
    sat_75: number | null;
    act_25: number | null;
    act_75: number | null;
    test_policy: string | null;
    admissions_url: string | null;
    athletics_url: string | null;
    academic_programs_json: unknown;
  };
  current_season: {
    season: string;
    estimated_openings: number | null;
    team_scoring_average: number | null;
    ranking: number | null;
    data_layer: string;
  } | null;
  roster_benchmarks: Array<{
    class_year: string | null;
    score_to_course_rating_avg: number | null;
    data_layer: string;
  }>;
  recruiting_profiles: Array<{
    graduation_class: number;
    recruiting_status: string;
    coach_verified: boolean;
    data_layer: string;
  }>;
};
