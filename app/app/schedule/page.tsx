import Link from "next/link";
import { OS_ORANGE, osCardSoft, osSectionLabel } from "@/lib/os-design-system";

const EVENT_TYPES = [
  "Practice",
  "Qualifying",
  "Tournament",
  "Campus Visit",
  "Recruit Visit",
  "Travel",
] as const;

export const metadata = { title: "Schedule" };

export default function SchedulePage() {
  return (
    <div className="space-y-6">
      <header>
        <p
          className="text-xs font-bold uppercase tracking-[0.14em]"
          style={{ color: OS_ORANGE }}
        >
          Schedule
        </p>
        <h1 className="mt-1 font-display text-3xl font-bold text-white">
          Program schedule
        </h1>
        <p className="mt-2 max-w-2xl text-text-mid">
          Compact operating calendar for practice, competition, and recruiting
          visits — feeds Today’s Briefing upcoming events.
        </p>
      </header>

      <section>
        <h2 style={osSectionLabel}>Event types</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {EVENT_TYPES.map((type) => (
            <article key={type} style={osCardSoft}>
              <p className="font-bold text-white">{type}</p>
              <p className="mt-2 text-sm text-text-mid">
                Compact cards appear here when the schedule calendar is wired.
              </p>
            </article>
          ))}
        </div>
      </section>

      <div style={osCardSoft}>
        <p className="text-sm text-text-mid">
          No events loaded yet. Player Selection will attach travel roster
          decisions to tournament events once Schedule persists.
        </p>
        <Link
          href="/app/player-selection"
          className="mt-3 inline-block text-sm font-semibold text-[#EC691A] hover:underline"
        >
          Open Player Selection →
        </Link>
      </div>
    </div>
  );
}
