import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import Container from '@/components/ui/Container'
import { EASE, lineChild } from '@/lib/motion'
import { img, media } from '@/data/media'

const HEADLINE = ['Engineering', 'what industry', 'depends on.']

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
        <Container>
          <motion.div variants={container} initial="hidden" animate="show">
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
              <Link
                to="/services"
                className="group inline-flex items-center gap-3 bg-ember px-8 py-4 font-mono text-[0.78rem] uppercase tracking-[0.16em] text-white transition-colors duration-400 hover:bg-ember-600"
              >
                Explore Our Services
                <span className="transition-transform duration-400 ease-editorial group-hover:translate-x-1">→</span>
              </Link>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 border border-white/30 px-8 py-4 font-mono text-[0.78rem] uppercase tracking-[0.16em] text-white transition-colors duration-400 hover:border-white hover:bg-white/5"
              >
                Request a Quote
                <span className="transition-transform duration-400 ease-editorial group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </motion.div>
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
