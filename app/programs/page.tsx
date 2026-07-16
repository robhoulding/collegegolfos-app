import Link from "next/link";
import { ProgramCard } from "@/components/ProgramCard";
import { ProgramSearchForm, type ProgramSearchParams } from "@/components/ProgramSearchForm";
import { searchCollegePrograms } from "@/lib/college-api-server";

export const metadata = {
  title: "College program search",
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function pickParam(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value?.trim() || undefined;
}

export default async function ProgramsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters: ProgramSearchParams = {
    q: pickParam(params.q),
    gender: pickParam(params.gender),
    association: pickParam(params.association),
    division: pickParam(params.division),
    state: pickParam(params.state),
    athletic_data_tier: pickParam(params.athletic_data_tier),
    major: pickParam(params.major),
    public_private: pickParam(params.public_private),
    max_net_cost: pickParam(params.max_net_cost),
    match_priority: pickParam(params.match_priority),
    campus_vibe: pickParam(params.campus_vibe),
  };

  const result = await searchCollegePrograms({
    ...filters,
    max_net_cost: filters.max_net_cost
      ? Number(filters.max_net_cost)
      : undefined,
    limit: 50,
  });

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 md:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-400">
        Live API test
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold text-white">
        College golf program search
      </h1>
      <p className="mt-3 max-w-2xl text-text-mid">
        Search by program basics and match dimensions — scoring, academics,
        location, budget, competition, and culture. Personalized match scores
        arrive in a later phase; priority chips adjust sort order today.
      </p>

      <div className="mt-8">
        <ProgramSearchForm initial={filters} />
      </div>

      {filters.campus_vibe ? (
        <p className="mt-4 text-sm text-text-mid">
          Campus vibe preferences:{" "}
          <span className="font-semibold text-emerald-300">
            {filters.campus_vibe.replace(/,/g, ", ")}
          </span>
          {" — "}
          full lifestyle matching arrives in a later phase; results emphasize culture fit today.
        </p>
      ) : null}

      {!result.ok ? (
        <div className="card-surface mt-8 border-red-400/30 p-6 text-sm text-red-300">
          <p className="font-semibold text-white">Could not load programs</p>
          <p className="mt-2">{result.error}</p>
          <p className="mt-3 text-text-mid">
            For local dev, add{" "}
            <code className="text-emerald-400">BASE44_SHARED_SECRET</code> to{" "}
            <code className="text-emerald-400">.env.local</code> (same value as
            golfcoachos-api).
          </p>
        </div>
      ) : (
        <>
          <p className="mt-8 text-sm text-text-mid">
            Showing {result.data.programs.length} of {result.data.pagination.total}{" "}
            programs
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {result.data.programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
          {result.data.programs.length === 0 ? (
            <p className="card-surface mt-4 p-6 text-sm text-text-mid">
              No programs matched these filters. Try clearing division or state.
            </p>
          ) : null}
        </>
      )}

      <p className="mt-10 text-sm text-text-low">
        <Link href="/" className="text-emerald-400 hover:underline">
          ← Back home
        </Link>
      </p>
    </main>
  );
}
