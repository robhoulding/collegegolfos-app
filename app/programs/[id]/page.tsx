import Link from "next/link";
import { notFound } from "next/navigation";
import { getCollegeProgram } from "@/lib/college-api-server";

type PageProps = {
  params: Promise<{ id: string }>;
};

function formatCost(value: number | null): string {
  if (value == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function ProgramDetailPage({ params }: PageProps) {
  const { id } = await params;
  const result = await getCollegeProgram(id);

  if (!result.ok) {
    if (result.status === 404) notFound();
    return (
      <main className="mx-auto max-w-3xl px-5 py-16 md:px-8">
        <p className="text-red-300">{result.error}</p>
        <Link href="/programs" className="mt-4 inline-block text-emerald-400 hover:underline">
          ← Back to search
        </Link>
      </main>
    );
  }

  const program = result.data;
  const location = [program.institution.city, program.institution.state_province]
    .filter(Boolean)
    .join(", ");

  return (
    <main className="mx-auto max-w-4xl px-5 py-12 md:px-8">
      <Link href="/programs" className="text-sm font-semibold text-emerald-400 hover:underline">
        ← Program search
      </Link>

      <h1 className="mt-4 font-display text-4xl font-bold text-white">
        {program.institution.name}
      </h1>
      <p className="mt-2 text-lg text-text-mid">
        {program.gender_category === "men" ? "Men's" : "Women's"} golf
        {location ? ` · ${location}` : ""}
      </p>

      {program.disclaimers.length > 0 ? (
        <ul className="card-surface mt-6 space-y-2 p-5 text-sm text-text-mid">
          {program.disclaimers.map((note) => (
            <li key={note}>• {note}</li>
          ))}
        </ul>
      ) : null}

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <article className="card-surface p-5">
          <h2 className="font-display text-lg font-semibold text-white">Program</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-text-low">Association</dt>
              <dd className="text-text-mid">
                {[program.association, program.division, program.conference]
                  .filter(Boolean)
                  .join(" · ")}
                {program.is_ivy ? " · Ivy" : ""}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-text-low">Data tier</dt>
              <dd className="text-text-mid">{program.athletic_data_tier.replace(/_/g, " ")}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-text-low">Team ranking</dt>
              <dd className="text-text-mid">{program.team_ranking ?? "—"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-text-low">Scoring avg (STCR)</dt>
              <dd className="text-text-mid">
                {program.team_scoring_average?.toFixed(1) ?? "—"}
              </dd>
            </div>
            {program.head_coach_name ? (
              <div className="flex justify-between gap-4">
                <dt className="text-text-low">Head coach</dt>
                <dd className="text-text-mid">{program.head_coach_name}</dd>
              </div>
            ) : null}
          </dl>
        </article>

        <article className="card-surface p-5">
          <h2 className="font-display text-lg font-semibold text-white">Institution</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-text-low">Enrollment</dt>
              <dd className="text-text-mid">
                {program.institution.undergraduate_enrollment?.toLocaleString() ?? "—"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-text-low">Acceptance rate</dt>
              <dd className="text-text-mid">
                {program.institution.acceptance_rate != null
                  ? `${Math.round(program.institution.acceptance_rate * 100)}%`
                  : "—"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-text-low">Est. net cost</dt>
              <dd className="text-text-mid">
                {formatCost(program.institution.estimated_net_cost)}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-text-low">Median GPA</dt>
              <dd className="text-text-mid">{program.institution.median_gpa ?? "—"}</dd>
            </div>
          </dl>
        </article>
      </section>

      {program.current_season ? (
        <section className="card-surface mt-4 p-5">
          <h2 className="font-display text-lg font-semibold text-white">
            {program.current_season.season} season
          </h2>
          <p className="mt-2 text-sm text-text-mid">
            Estimated openings: {program.current_season.estimated_openings ?? "—"} · Data
            layer: {program.current_season.data_layer.replace(/_/g, " ")}
          </p>
        </section>
      ) : null}

      {program.roster_benchmarks.length > 0 ? (
        <section className="card-surface mt-4 p-5">
          <h2 className="font-display text-lg font-semibold text-white">
            Roster scoring benchmarks
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-text-mid">
            {program.roster_benchmarks.map((bench, index) => (
              <li key={`${bench.class_year}-${index}`}>
                {bench.class_year ?? "Player"}: STCR avg{" "}
                {bench.score_to_course_rating_avg?.toFixed(1) ?? "—"} (
                {bench.data_layer.replace(/_/g, " ")})
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
