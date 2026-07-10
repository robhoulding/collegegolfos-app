import Link from "next/link";
import { LINKS } from "@/lib/links";

export const metadata = {
  title: "For college coaches",
};

export default function CoachesPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 md:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-400">
        Coming soon
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold text-white">
        College coach workspace
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-text-mid">
        This is where college coaches will review invited players, save prospects,
        and connect with verified GolfCoachOS development records.
      </p>

      <div className="card-surface mt-10 space-y-4 p-6 text-sm text-text-mid">
        <p>
          <span className="font-semibold text-white">Today:</span> Juniors invite
          you via GolfCoachOS with a read-only magic link (
          <code className="text-emerald-400">/view/player/…</code>
          ).
        </p>
        <p>
          <span className="font-semibold text-white">Next:</span> Coach accounts,
          saved players, roster fit tools, and messaging — scoped in your build
          prompt.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link href={LINKS.home} className="text-sm font-semibold text-emerald-400 hover:underline">
          ← Back home
        </Link>
        <a href={LINKS.golfCoachOs} className="text-sm font-semibold text-text-mid hover:text-white">
          GolfCoachOS →
        </a>
      </div>
    </main>
  );
}
