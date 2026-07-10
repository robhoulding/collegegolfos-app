import Link from "next/link";
import { LINKS } from "@/lib/links";

export function SiteHeader() {
  return (
    <header className="border-b border-white/[0.06] bg-bg-base/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <Link href={LINKS.home} className="font-display text-xl font-bold tracking-tight text-white">
          College<span className="text-emerald-400">Golf</span>OS
        </Link>
        <nav className="flex items-center gap-3 text-sm font-semibold">
          <Link href={LINKS.programs} className="text-text-mid hover:text-white">
            Programs
          </Link>
          <Link href={LINKS.coaches} className="text-text-mid hover:text-white">
            For coaches
          </Link>
          <a
            href={LINKS.golfCoachOs}
            className="rounded-full border border-white/15 px-4 py-2 text-text-mid hover:border-emerald-400/40 hover:text-white"
          >
            GolfCoachOS →
          </a>
        </nav>
      </div>
    </header>
  );
}
