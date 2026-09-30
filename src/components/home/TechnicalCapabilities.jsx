import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Reveal from '@/components/ui/Reveal'
import { technicalCapabilities, qualityPillars } from '@/data/capabilities'
import { EASE, viewportOnce } from '@/lib/motion'

const chip = {
  hidden: { opacity: 0, y: 14 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay: i * 0.05 },
  }),
}

export default function TechnicalCapabilities() {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <Container>
        {/* Equipment labels */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Equipment &amp; systems</Eyebrow>
            </Reveal>
            <Reveal>
              <h2 className="mt-6 text-display-sm font-bold uppercase leading-[1.0] text-ink">
                What we build,
                <br />
                install &amp; maintain.
              </h2>
            </Reveal>
            <Reveal>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-ink-mute">
                Rotating and static equipment, pressure systems, and the piping that
                ties a facility together.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8 lg:self-center">
            <motion.ul
              variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-4"
            >
              {technicalCapabilities.map((cap, i) => (
                <motion.li
                  key={cap.code}
                  custom={i}
                  variants={chip}
                  className="group flex aspect-[4/3] flex-col justify-between bg-paper p-5 transition-colors duration-400 hover:bg-navy-900"
                >
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ember transition-colors group-hover:text-amber">
                    {cap.code}
                  </span>
                  <span className="text-lg font-semibold leading-tight text-ink transition-colors duration-400 group-hover:text-white">
                    {cap.label}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>

        {/* Quality pillars */}
        <div className="mt-24 border-t border-line pt-16">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow>How we work</Eyebrow>
              </Reveal>
              <Reveal>
                <h2 className="mt-6 text-display-sm font-bold uppercase leading-[1.0] text-ink">
                  Non-negotiables.
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-8 lg:self-center">
              <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
                {qualityPillars.map((p, i) => (
                  <Reveal key={p.index} delay={i * 0.05}>
                    <div className="border-t-2 border-ink pt-5">
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-xs text-ember">{p.index}</span>
                        <h3 className="text-2xl font-semibold text-ink">{p.title}</h3>
                      </div>
                      <p className="mt-3 text-base leading-relaxed text-ink-mute">
                        {p.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
