import Link from "next/link";
import { ECOSYSTEM, HOME, VALUE_PROPS } from "@/lib/content/home";
import { LINKS } from "@/lib/links";
import { OS_ORANGE } from "@/lib/os-design-system";

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden px-5 pb-20 pt-16 md:px-8 md:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(236,105,26,0.14),transparent_55%)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p
            className="text-xs font-bold uppercase tracking-[0.18em]"
            style={{ color: OS_ORANGE }}
          >
            {HOME.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-white md:text-6xl">
            <span className="block">{HOME.headlineLine1}</span>
            <span className="block">{HOME.headlineLine2}</span>
          </h1>
          <div className="mx-auto mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-text-mid">
            <p>{HOME.subheadLead}</p>
            <p className="font-semibold text-white">{HOME.subheadEmphasis}</p>
            <p>{HOME.subheadBody}</p>
          </div>
          <ul className="mx-auto mt-8 flex max-w-xl flex-col gap-2 text-left text-sm text-text-mid md:text-center">
            {HOME.benefits.map((item) => (
              <li key={item}>✓ {item}</li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href={LINKS.coaches} className="btn-primary px-8 py-3.5 text-sm">
              Explore CollegeGolfOS
            </Link>
            <Link
              href={LINKS.programs}
              className="rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-text-mid hover:border-white/30 hover:text-white"
            >
              Find College Programs
            </Link>
            <Link
              href={LINKS.signIn}
              className="rounded-full border border-white/15 px-8 py-3.5 text-sm font-semibold text-text-mid hover:border-white/30 hover:text-white"
            >
              For Coaches
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] px-5 py-16 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold text-white md:text-4xl">
            {HOME.supportingHeadline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-text-mid">
            {HOME.supportingBody}
          </p>
        </div>
      </section>

      <section className="border-t border-white/[0.06] px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {VALUE_PROPS.map((item) => (
            <article key={item.title} className="card-surface p-6">
              <h2 className="font-display text-xl font-semibold text-white">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-text-mid">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-white/[0.06] px-5 py-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-center text-xs font-bold uppercase tracking-[0.16em] text-text-low">
            GolfCoachOS ecosystem
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {ECOSYSTEM.map((site) => (
              <a
                key={site.name}
                href={site.href}
                className={`card-surface block p-5 transition-colors hover:border-[rgba(236,105,26,0.35)] ${
                  "current" in site && site.current
                    ? "border-[rgba(236,105,26,0.45)]"
                    : ""
                }`}
              >
                <p className="font-display text-lg font-semibold text-white">
                  {site.name}
                </p>
                <p className="mt-1 text-sm text-text-mid">{site.role}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] px-5 py-10 text-center text-sm text-text-low md:px-8">
        <p>CollegeGolfOS · Operating System for College Golf Programs</p>
        <p className="mt-2">
          Part of the GolfCoachOS ecosystem — one player record, familiar
          workflows across every OS.
        </p>
      </footer>
    </main>
  );
}
