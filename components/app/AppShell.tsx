"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOutCollegeCoach } from "@/lib/college-coach-client";
import { COLLEGE_COACH_NAV, OS_ORANGE } from "@/lib/os-design-system";
import { LINKS } from "@/lib/links";

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
      <div className="border-b border-white/[0.06] bg-[#0B1220]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3 px-5 py-3 md:px-8">
          <div>
            <p
              className="text-xs font-bold uppercase tracking-[0.14em]"
              style={{ color: OS_ORANGE }}
            >
              Coach Workspace
            </p>
            <p className="text-sm text-text-mid">
              {coachName ? `Signed in as ${coachName}` : "CollegeGolfOS"}
            </p>
          </div>
          <nav className="flex max-w-full flex-wrap items-center gap-1">
            {COLLEGE_COACH_NAV.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                    active
                      ? "bg-[rgba(236,105,26,0.15)] text-[#EC691A]"
                      : "text-text-mid hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={LINKS.appProgram}
              className="rounded-full px-3 py-1.5 text-sm font-semibold text-text-low hover:text-white"
            >
              Program
            </Link>
            <Link
              href={LINKS.programs}
              className="rounded-full px-3 py-1.5 text-sm font-semibold text-text-low hover:text-white"
            >
              Directory
            </Link>
            <button
              type="button"
              onClick={() => void onSignOut()}
              className="ml-1 rounded-full border border-white/15 px-3 py-1.5 text-sm font-semibold text-text-mid hover:text-white"
            >
              Sign out
            </button>
          </nav>
        </div>
      </div>
      <div className="mx-auto max-w-[1180px] px-5 py-8 md:px-8">{children}</div>
    </div>
  );
}
