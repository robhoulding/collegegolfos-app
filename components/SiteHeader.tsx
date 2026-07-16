import Link from "next/link";
import { LINKS } from "@/lib/links";
import { GoogleTranslateMenu } from "@/components/translate/GoogleTranslateMenu";

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
          <Link href={LINKS.signIn} className="text-text-mid hover:text-white">
            Sign in
          </Link>
          <GoogleTranslateMenu />
          <Link
            href={LINKS.app}
            className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-emerald-400 hover:bg-emerald-500/15"
          >
            Workspace
          </Link>
        </nav>
      </div>
    </header>
  );
}
