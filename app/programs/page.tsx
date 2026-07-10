import Link from "next/link";
import { ProgramCard } from "@/components/ProgramCard";
import { ProgramSearchForm } from "@/components/ProgramSearchForm";
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
  const filters = {
    q: pickParam(params.q),
    gender: pickParam(params.gender),
    association: pickParam(params.association),
    division: pickParam(params.division),
    state: pickParam(params.state),
    athletic_data_tier: pickParam(params.athletic_data_tier),
    limit: 50,
  };

  const result = await searchCollegePrograms(filters);

  return (
    <main className="mx-auto max-w-6xl px-5 py-12 md:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-400">
        Live API test
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold text-white">
        College golf program search
      </h1>
      <p className="mt-3 max-w-2xl text-text-mid">
        Searching the GolfCoachOS college directory via{" "}
        <code className="text-emerald-400">/api/college/programs/search</code>.
        Match scores come in a later phase — this confirms data and filters work.
      </p>

      <div className="mt-8">
        <ProgramSearchForm initial={filters} />
      </div>

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
