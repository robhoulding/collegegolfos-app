import Link from "next/link";
import { ECOSYSTEM, HOME, VALUE_PROPS } from "@/lib/content/home";
import { LINKS } from "@/lib/links";

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden px-5 pb-20 pt-16 md:px-8 md:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(236,105,26,0.14),transparent_55%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-400">
            {HOME.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-white md:text-6xl">
            {HOME.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-mid">
            {HOME.subhead}
          </p>
          <ul className="mx-auto mt-8 flex max-w-xl flex-col gap-2 text-left text-sm text-text-mid md:text-center">
            {HOME.trust.map((item) => (
              <li key={item}>✓ {item}</li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href={LINKS.programs} className="btn-primary px-8 py-3.5 text-sm">
              Search college programs →
            </Link>
            <Link href={LINKS.coaches} className="rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-text-mid hover:border-white/30 hover:text-white">
              College coaches
            </Link>
            <a
              href={LINKS.golfCoachOs}
              className="rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-text-mid hover:border-white/30 hover:text-white"
            >
              GolfCoachOS →
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {VALUE_PROPS.map((item) => (
            <article key={item.title} className="card-surface p-6">
              <h2 className="font-display text-xl font-semibold text-white">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-text-mid">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-white/[0.06] px-5 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-text-low">
            GolfCoachOS ecosystem
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ECOSYSTEM.map((site) => (
              <a
                key={site.name}
                href={site.href}
                className={`card-surface block p-5 transition-colors hover:border-emerald-400/30 ${
                  "current" in site && site.current ? "border-emerald-400/40" : ""
                }`}
              >
                <p className="font-display text-lg font-semibold text-white">{site.name}</p>
                <p className="mt-1 text-sm text-text-mid">{site.role}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] px-5 py-10 text-center text-sm text-text-low md:px-8">
        <p>CollegeGolfOS · Coach recruiting hub · Built to link with GolfCoachOS</p>
        <p className="mt-2">
          Full product build coming next — share your prompt when ready.
        </p>
      </footer>
    </main>
  );
}
