"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOutCollegeCoach } from "@/lib/college-coach-client";
import { LINKS } from "@/lib/links";

const NAV: { href: string; label: string; exact?: boolean }[] = [
  { href: "/app", label: "Overview", exact: true },
  { href: "/app/inbox", label: "Inbox" },
  { href: "/app/board", label: "Recruiting Board" },
  { href: "/app/roster", label: "Pipeline list" },
  { href: "/app/settings", label: "Settings" },
  { href: LINKS.programs, label: "Program search" },
];

export function AppShell({
  children,
  coachName,
}: {
  children: React.ReactNode;
  coachName?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function onSignOut() {
    await signOutCollegeCoach();
    router.push("/sign-in");
    router.refresh();
  }

  return (
    <div className="min-h-[calc(100vh-4.5rem)]">
      <div className="border-b border-white/[0.06] bg-bg-panel/40">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3 md:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-400">
              Coach workspace
            </p>
            <p className="text-sm text-text-mid">
              {coachName ? `Signed in as ${coachName}` : "CollegeGolfOS"}
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-1">
            {NAV.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                    active
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "text-text-mid hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              type="button"
              onClick={() => void onSignOut()}
              className="ml-2 rounded-full border border-white/15 px-3 py-1.5 text-sm font-semibold text-text-mid hover:text-white"
            >
              Sign out
            </button>
          </nav>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-5 py-8 md:px-8">{children}</div>
    </div>
  );
}
