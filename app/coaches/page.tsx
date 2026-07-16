import Link from "next/link";
import { LINKS } from "@/lib/links";

export const metadata = {
  title: "For college coaches",
};

export default function CoachesPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-16 md:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-400">
        Coach workspace
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold text-white">
        College coach workspace
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-text-mid">
        Review invited players, run a recruiting board, and open verified
        GolfCoachOS shared player records — before any AI layer is added.
      </p>

      <div className="card-surface mt-10 space-y-4 p-6 text-sm text-text-mid">
        <p>
          <span className="font-semibold text-white">Shell now live:</span>{" "}
          sign-in, invite inbox, recruiting board, roster, program affiliation,
          and permission-gated shared player views.
        </p>
        <p>
          <span className="font-semibold text-white">Still invite-only:</span>{" "}
          there is no cold junior search. Players invite your email from
          GolfCoachOS; you claim them into your board.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href={LINKS.signIn}
          className="btn-primary px-5 py-3 text-sm"
        >
          Sign in to workspace
        </Link>
        <Link href={LINKS.home} className="text-sm font-semibold text-emerald-400 hover:underline">
          ← Back home
        </Link>
      </div>
    </main>
  );
}
