import Link from "next/link";
import { OS_ORANGE, osCardSoft, osSectionLabel } from "@/lib/os-design-system";

export const metadata = { title: "Trends" };

export default function TrendsPage() {
  return (
    <div className="space-y-6">
      <header>
        <p
          className="text-xs font-bold uppercase tracking-[0.14em]"
          style={{ color: OS_ORANGE }}
        >
          Trends
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold text-white">
          Program trends
        </h1>
        <p className="mt-2 max-w-2xl text-text-mid">
          Scoring, practice completion, academic eligibility, and recruiting
          funnel health — decision support, not vanity dashboards.
        </p>
      </header>

      <div className="grid gap-3 md:grid-cols-2">
        {[
          "Team scoring average",
          "Practice completion",
          "Academic eligibility",
          "Recruiting funnel conversion",
          "Freshman performance trend",
          "Verified profile coverage",
        ].map((label) => (
          <article key={label} style={osCardSoft}>
            <h2 className="font-semibold text-white">{label}</h2>
            <p className="mt-2 text-sm text-text-mid">
              Chart and evidence rollups arrive after Team roster membership and
              Schedule are connected. No AI narrative yet.
            </p>
          </article>
        ))}
      </div>

      <p className="text-sm text-text-mid">
        <Link href="/app" className="text-[#EC691A] hover:underline">
          ← Today’s Briefing
        </Link>
      </p>
      <p className="sr-only" style={osSectionLabel}>
        Trends
      </p>
    </div>
  );
}
