import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

type Stat = {
  value: string;
  label: string;
};

type Panel = {
  eyebrow: string;
  title: string;
  description: string;
  points?: readonly string[];
};

type RouteShowcaseProps = {
  eyebrow: string;
  title: string;
  description: string;
  accent?: string;
  stats: readonly Stat[];
  primaryPanels: readonly Panel[];
  secondaryPanels?: readonly Panel[];
  ctaLabel?: string;
  ctaHref?: string;
};

const revealUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: 'easeOut' as const },
};

const RouteShowcase = ({
  eyebrow,
  title,
  description,
  accent = '#ff5c7a',
  stats,
  primaryPanels,
  secondaryPanels = [],
  ctaLabel = 'Connect with us',
  ctaHref = '#contact',
}: RouteShowcaseProps) => {
  return (
    <main className="min-h-screen bg-black px-4 pb-24 pt-36 text-white sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.section
          {...revealUp}
          className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(16,16,18,0.98),rgba(8,8,10,0.98))] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.38)] sm:p-10 lg:p-12"
        >
          <div
            className="absolute inset-0 opacity-80"
            style={{
              background: `radial-gradient(circle at top right, ${accent}22, transparent 24%), radial-gradient(circle at bottom left, rgba(89,120,255,0.12), transparent 28%)`,
            }}
          />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="font-general text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-white/52">
                {eyebrow}
              </p>
              <h1 className="mt-4 max-w-4xl font-sans text-4xl font-medium tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="mt-6 max-w-3xl font-robert-regular text-base leading-8 text-white/72 sm:text-lg">
                {description}
              </p>

              <a
                href={ctaHref}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/[0.04] px-6 py-3.5 font-general text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-white transition hover:border-white/30 hover:bg-white hover:text-black"
              >
                {ctaLabel}
                <ArrowUpRight size={16} />
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  {...revealUp}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.06,
                    ease: 'easeOut',
                  }}
                  className="rounded-[1.5rem] border border-white/10 bg-black/30 p-5"
                >
                  <p className="font-sans text-3xl font-medium tracking-tight text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-robert-regular text-sm leading-6 text-white/58">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          {primaryPanels.map((panel, index) => (
            <motion.article
              key={panel.title}
              {...revealUp}
              transition={{
                duration: 0.55,
                delay: index * 0.06,
                ease: 'easeOut',
              }}
              className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,18,20,0.92),rgba(8,8,10,0.96))] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.24)]"
            >
              <p className="font-general text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/48">
                {panel.eyebrow}
              </p>
              <h2 className="mt-4 font-sans text-2xl font-medium tracking-tight text-white">
                {panel.title}
              </h2>
              <p className="mt-4 font-robert-regular text-sm leading-7 text-white/68">
                {panel.description}
              </p>
              {panel.points?.length ? (
                <div className="mt-6 grid gap-3">
                  {panel.points.map((point) => (
                    <div
                      key={point}
                      className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 font-robert-regular text-sm text-white/72"
                    >
                      {point}
                    </div>
                  ))}
                </div>
              ) : null}
            </motion.article>
          ))}
        </section>

        {secondaryPanels.length ? (
          <section className="mt-10 grid gap-6 md:grid-cols-2">
            {secondaryPanels.map((panel, index) => (
              <motion.article
                key={panel.title}
                {...revealUp}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: 'easeOut',
                }}
                className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-6"
              >
                <p className="font-general text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/48">
                  {panel.eyebrow}
                </p>
                <h3 className="mt-4 font-sans text-2xl font-medium tracking-tight text-white">
                  {panel.title}
                </h3>
                <p className="mt-4 font-robert-regular text-sm leading-7 text-white/68">
                  {panel.description}
                </p>
                {panel.points?.length ? (
                  <div className="mt-6 grid gap-3">
                    {panel.points.map((point) => (
                      <div
                        key={point}
                        className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3 font-robert-regular text-sm text-white/72"
                      >
                        {point}
                      </div>
                    ))}
                  </div>
                ) : null}
              </motion.article>
            ))}
          </section>
        ) : null}
      </div>
    </main>
  );
};

export type { RouteShowcaseProps };
export default RouteShowcase;
