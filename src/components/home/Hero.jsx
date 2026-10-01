import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button3D from '@/components/ui/Button3D'
import TiltCard from '@/components/ui/TiltCard'
import ServiceIcon from '@/components/icons/ServiceIcon'
import { EASE, lineChild } from '@/lib/motion'
import { img, media } from '@/data/media'
import { services } from '@/data/services'
import { industries } from '@/data/industries'
import { processSteps } from '@/data/process'

const HEADLINE = ['Engineering', 'what industry', 'depends on.']

// Facts derived from the site's own data — no invented metrics.
const STATS = [
  { value: String(services.length).padStart(2, '0'), label: 'Core services', note: 'Contracting to skids', icon: 'mechanical-contracting' },
  { value: String(industries.length).padStart(2, '0'), label: 'Industry sectors', note: 'Upstream to power', icon: 'oilgas' },
  { value: String(processSteps.length).padStart(2, '0'), label: 'Delivery stages', note: 'Plan → maintain', icon: 'industrial' },
]

// Orchestrated load sequence
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}
const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}

export default function Hero() {
  const ref = useRef(null)
  const [failed, setFailed] = useState(false)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Scroll-driven depth
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18])
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])
  const overlay = useTransform(scrollYProgress, [0, 1], [0.55, 0.85])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-navy-950 text-paper"
    >
      {/* Image layer */}
      <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0">
        {!failed ? (
          <motion.img
            src={img(media.hero, 2200)}
            alt="Industrial fabrication — welding on a steel structure"
            onError={() => setFailed(true)}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: EASE }}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-navy-900" />
        )}
      </motion.div>

      {/* Tonal overlays (kept bright via warm edge light, readable copy) */}
      <motion.div
        style={{ opacity: overlay }}
        className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/20"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-transparent to-transparent" />

      {/* Technical frame */}
      <motion.div
        style={{ opacity: fade }}
        className="pointer-events-none absolute inset-0"
      >
        <HeroTech />
      </motion.div>

      {/* Copy */}
      <motion.div
        style={{ y: copyY, opacity: fade }}
        className="relative z-10 flex h-full items-end pb-20 sm:pb-24"
      >
        <Container className="grid items-end gap-12 lg:grid-cols-12">
          <motion.div variants={container} initial="hidden" animate="show" className="lg:col-span-8">
            <motion.div variants={rise} className="eyebrow !text-amber">
              <span className="h-px w-8 bg-amber/70" /> International Oil &amp; Gas Engineering
            </motion.div>

            <h1 className="mt-7 text-display-xl font-bold uppercase leading-[0.92] text-white">
              {HEADLINE.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.05em]">
                  <motion.span
                    variants={lineChild}
                    className={`block ${i === 2 ? 'text-ember-gradient' : ''}`}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              variants={rise}
              className="mt-8 max-w-lg text-lg leading-relaxed text-paper/80"
            >
              Mechanical contracting, fabrication, and turnaround execution for the
              oil &amp; gas sector — delivered to the highest international standards.
            </motion.p>

            <motion.div variants={rise} className="mt-10 flex flex-wrap gap-4">
              <Button3D to="/services" variant="primary" size="lg">Explore Our Services</Button3D>
              <Button3D to="/contact" variant="glass" size="lg">Request a Quote</Button3D>
            </motion.div>
          </motion.div>

          {/* Floating glass stat cards */}
          <div className="hidden flex-col items-end gap-4 lg:col-span-4 lg:flex">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: 60, rotateY: -35 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.9 + i * 0.15 }}
                style={{ transformPerspective: 1000 }}
                className={i === 1 ? 'mr-10' : ''}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
                >
                  <TiltCard max={16} cardClassName="rounded-2xl">
                    <div className="relative flex w-72 items-center gap-4 rounded-2xl p-4 pr-6 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.7)] [transform-style:preserve-3d]">
                      <span aria-hidden="true" className="absolute inset-0 rounded-2xl bg-white/[0.08] ring-1 ring-inset ring-white/20 backdrop-blur-xl" />
                      <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white shadow-[0_4px_0_#b73a10] [background:var(--brand-gradient)] [transform:translateZ(30px)]">
                        <ServiceIcon name={s.icon} className="h-6 w-6" />
                      </span>
                      <span className="relative flex flex-col [transform:translateZ(20px)]">
                        <span className="flex items-baseline gap-2">
                          <span className="font-display text-3xl font-bold leading-none text-white">{s.value}</span>
                          <span className="text-sm font-semibold text-white">{s.label}</span>
                        </span>
                        <span className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-paper/55">{s.note}</span>
                      </span>
                    </div>
                  </TiltCard>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </Container>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-paper/50">
          Scroll
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-paper/60 to-transparent" />
      </motion.div>
    </section>
  )
}

function HeroTech() {
  return (
    <Container className="relative h-full">
      <div className="absolute left-[var(--edge)] top-[calc(var(--nav-h)+1.5rem)] font-mono text-[0.6rem] uppercase tracking-[0.25em] text-paper/40">
        N 24°·E
      </div>
      <div className="absolute right-[var(--edge)] top-[calc(var(--nav-h)+1.5rem)] hidden font-mono text-[0.6rem] uppercase tracking-[0.25em] text-paper/40 sm:block">
        Lemos / 001
      </div>
      <span className="absolute right-[var(--edge)] top-1/2 hidden h-24 w-px -translate-y-1/2 bg-white/15 sm:block" />
    </Container>
  )
}
