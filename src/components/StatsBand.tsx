type Stat = { value: string; suffix: string; label: string };

// A row of headline figures between thin rules.
export default function StatsBand({ stats }: { stats: Stat[] }) {
  return (
    <section className="px-[clamp(1.25rem,6vw,6rem)] py-16 sm:py-24">
      <dl className="grid grid-cols-2 gap-y-12 border-y border-ink/15 py-12 sm:py-16 md:grid-cols-4">
        {stats.map((stat) => (
          <div data-reveal key={stat.label} className="px-2 sm:px-6">
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <p className="text-[clamp(2.75rem,5.5vw,5rem)] font-light leading-none tracking-[-0.03em]">
                {stat.value}
                <span className="text-ink/40">{stat.suffix}</span>
              </p>
              <p aria-hidden="true" className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-ink/60 sm:text-sm">
                {stat.label}
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
