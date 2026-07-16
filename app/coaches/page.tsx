import Link from "next/link";
import { LINKS } from "@/lib/links";
import { OS_ORANGE } from "@/lib/os-design-system";

export const metadata = {
  title: "For college coaches",
};

export default function CoachesPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 md:px-8">
      <p
        className="text-xs font-bold uppercase tracking-[0.16em]"
        style={{ color: OS_ORANGE }}
      >
        Coach Workspace
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold text-white">
        The operating system for college golf programs
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-text-mid">
        Today’s Briefing, Team, Player Selection, Recruiting, and Find Players —
        built so your staff knows what deserves attention and what to do next.
      </p>

      <div className="card-surface mt-10 space-y-4 p-6 text-sm text-text-mid">
        <p>
          <span className="font-semibold text-white">Now:</span> Coach Workspace
          shell with decision-first navigation, deterministic briefing, recruiting
          board, and shared GolfCoachOS player records.
        </p>
        <p>
          <span className="font-semibold text-white">Next:</span> live program
          roster membership, schedule events, transparent player discovery —
          then intelligence on top of the workflow.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link href={LINKS.signIn} className="btn-primary px-5 py-3 text-sm">
          Sign in to Coach Workspace
        </Link>
        <Link
          href={LINKS.home}
          className="text-sm font-semibold text-[#EC691A] hover:underline"
        >
          ← Back home
        </Link>
      </div>
    </main>
  );
}
