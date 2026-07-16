import Link from "next/link";
import {
  collegeCoachApiFetch,
  readUpstreamJson,
} from "@/lib/college-coach-api-server";
import { getCollegeCoachSession } from "@/lib/college-coach-session";

export const metadata = { title: "Overview" };

export default async function AppOverviewPage() {
  const session = await getCollegeCoachSession();
  if (!session) return null;

  const [inboxRes, boardRes, meRes] = await Promise.all([
    collegeCoachApiFetch(
      `/api/college/coaches/inbox?coach_id=${encodeURIComponent(session.coachId)}`,
      { session },
    ),
    collegeCoachApiFetch(
      `/api/college/coaches/pipeline?coach_id=${encodeURIComponent(session.coachId)}`,
      { session },
    ),
    collegeCoachApiFetch(
      `/api/college/coaches/me?coach_id=${encodeURIComponent(session.coachId)}`,
      { session },
    ),
  ]);

  const inbox = (await readUpstreamJson(inboxRes)).data as {
    invites?: unknown[];
  };
  const board = (await readUpstreamJson(boardRes)).data as {
    cards?: unknown[];
  };
  const me = (await readUpstreamJson(meRes)).data as {
    program?: { institution_name?: string } | null;
    verified?: boolean;
  };

  const inviteCount = inbox.invites?.length ?? 0;
  const boardCount = board.cards?.length ?? 0;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-3xl font-bold text-white">
          Recruiting workspace
        </h1>
        <p className="mt-2 max-w-2xl text-text-mid">
          Structural shell for invites, board, roster, and shared GolfCoachOS
          player records. Intelligence layers come after this foundation is
          correct.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Invite inbox"
          value={String(inviteCount)}
          href="/app/inbox"
          hint="Players who invited your email"
        />
        <StatCard
          label="On the board"
          value={String(boardCount)}
          href="/app/board"
          hint="Recruiting pipeline cards"
        />
        <StatCard
          label="Program link"
          value={me.program?.institution_name ? "Linked" : "Unset"}
          href="/app/settings"
          hint="Affiliate your golf program"
        />
        <StatCard
          label="Verification"
          value={me.verified ? "Verified" : "Pending"}
          href="/app/settings"
          hint="Program affiliation status"
        />
      </div>

      <section className="card-surface space-y-3 p-6 text-sm text-text-mid">
        <h2 className="text-base font-semibold text-white">Shell checklist</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>Permissions: signed-in college coach session + email-matched invites</li>
          <li>Search connection: public program directory remains at /programs</li>
          <li>Shared player record: open via invite token inside CollegeGolfOS</li>
          <li>Recruiting board: pipeline stages without cold player search</li>
          <li>Roster: board players + program context (no AI yet)</li>
        </ul>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/app/inbox" className="font-semibold text-emerald-400 hover:underline">
            Open inbox →
          </Link>
          <Link href="/app/board" className="font-semibold text-emerald-400 hover:underline">
            Open board →
          </Link>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  href,
  hint,
}: {
  label: string;
  value: string;
  href: string;
  hint: string;
}) {
  return (
    <Link href={href} className="card-surface block p-5 transition hover:border-emerald-400/30">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-text-low">
        {label}
      </p>
      <p className="mt-2 font-display text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs text-text-mid">{hint}</p>
    </Link>
  );
}
