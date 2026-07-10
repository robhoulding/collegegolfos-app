import Link from "next/link";
import type { ProgramListItem } from "@/lib/college-api-types";

function formatLocation(program: ProgramListItem): string {
  const { city, state_province, country } = program.institution;
  return [city, state_province, country].filter(Boolean).join(", ") || "—";
}

function formatDivision(program: ProgramListItem): string {
  const parts = [program.association, program.division, program.conference].filter(
    Boolean,
  );
  if (program.is_ivy) parts.push("Ivy");
  return parts.join(" · ");
}

function formatCost(value: number | null): string {
  if (value == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function dataTierLabel(tier: string): string {
  return tier === "high_confidence" ? "High-confidence athletic data" : "Limited match data";
}

export function ProgramCard({ program }: { program: ProgramListItem }) {
  return (
    <article className="card-surface flex flex-col gap-4 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold text-white">
            <Link href={`/programs/${program.id}`} className="hover:text-emerald-400">
              {program.institution.name}
            </Link>
          </h2>
          <p className="mt-1 text-sm text-text-mid">
            {program.gender_category === "men" ? "Men's" : "Women's"} golf · {formatLocation(program)}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            program.athletic_data_tier === "high_confidence"
              ? "bg-emerald-400/15 text-emerald-400"
              : "bg-white/10 text-text-mid"
          }`}
        >
          {dataTierLabel(program.athletic_data_tier)}
        </span>
      </div>

      <dl className="grid gap-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-text-low">Division</dt>
          <dd className="text-text-mid">{formatDivision(program)}</dd>
        </div>
        <div>
          <dt className="text-text-low">Team ranking</dt>
          <dd className="text-text-mid">{program.team_ranking ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-text-low">Scoring avg (STCR)</dt>
          <dd className="text-text-mid">
            {program.team_scoring_average != null
              ? program.team_scoring_average.toFixed(1)
              : "—"}
          </dd>
        </div>
        <div>
          <dt className="text-text-low">Est. net cost</dt>
          <dd className="text-text-mid">
            {formatCost(program.institution.estimated_net_cost)}
          </dd>
        </div>
      </dl>

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4 text-xs text-text-low">
        <span>Source: {program.source_confidence.replace(/_/g, " ")}</span>
        <Link
          href={`/programs/${program.id}`}
          className="font-semibold text-emerald-400 hover:underline"
        >
          View program →
        </Link>
      </div>
    </article>
  );
}
