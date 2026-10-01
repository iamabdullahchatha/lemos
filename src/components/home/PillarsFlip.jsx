import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import { qualityPillars } from '@/data/capabilities'
import { img, media } from '@/data/media'
import { EASE, lineChild, lineParent, viewportOnce } from '@/lib/motion'

const icons = {
  Safety: <path d="M12 3l7 3v5.5c0 4.4-3 8-7 9.5-4-1.5-7-5.1-7-9.5V6l7-3zM8.8 12.2l2.2 2.2 4.3-4.6" />,
  Quality: (
    <>
      <circle cx="12" cy="9.5" r="5.5" />
      <path d="M9 14.2 7.5 21l4.5-2.4 4.5 2.4-1.5-6.8M10 9.6l1.4 1.4 2.8-3" />
    </>
  ),
  Precision: (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    </>
  ),
  Reliability: (
    <>
      <path d="M4 16a8 8 0 1 1 16 0" />
      <path d="M12 16l4-5M4 20h16" />
    </>
  ),
}

function PillarIcon({ name, className }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {icons[name]}
    </svg>
  )
}

function FlipCard({ pillar, i }) {
  const [flipped, setFlipped] = useState(false)
  const pointer = useRef('mouse')

  return (
    <motion.li
      initial={{ opacity: 0, y: 60, rotateY: -40 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 1.1, ease: EASE, delay: i * 0.12 }}
      style={{ transformPerspective: 1400 }}
      className="h-[21rem]"
    >
      <button
        type="button"
        aria-pressed={flipped}
        aria-label={`${pillar.title}: ${pillar.description}`}
        onPointerDown={(e) => (pointer.current = e.pointerType)}
        onPointerEnter={(e) => e.pointerType === 'mouse' && setFlipped(true)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && setFlipped(false)}
        onClick={(e) => {
          // Touch / keyboard toggle; mouse is handled by hover
          if (e.detail === 0 || pointer.current !== 'mouse') setFlipped((f) => !f)
        }}
        className="group block h-full w-full rounded-[1.75rem] text-left [perspective:1200px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber"
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 16 }}
          className="preserve-3d relative h-full w-full"
        >
          {/* Front */}
          <div className="backface-hidden absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[1.75rem] bg-navy-900/75 p-7 ring-1 ring-inset ring-white/15 shadow-[0_40px_70px_-35px_rgba(0,0,0,0.9)]">
            <div className="flex items-start justify-between">
              <span className="grid h-14 w-14 place-items-center rounded-2xl text-white shadow-[0_5px_0_#b73a10,0_18px_30px_-12px_rgba(242,101,34,0.8)] [background:var(--brand-gradient)]">
                <PillarIcon name={pillar.title} className="h-7 w-7" />
              </span>
              <span className="index-num text-6xl text-white/25">{pillar.index}</span>
            </div>
            <div>
              <h3 className="font-display text-3xl font-bold uppercase text-white">{pillar.title}</h3>
              <span className="mt-4 flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-paper/50">
                <span className="h-px w-6 bg-amber/70" />
                <span className="hidden [@media(hover:hover)]:inline">Hover to flip</span>
                <span className="[@media(hover:hover)]:hidden">Tap to flip</span>
              </span>
            </div>
          </div>

          {/* Back */}
          <div className="backface-hidden absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[1.75rem] p-7 text-white shadow-[0_40px_70px_-30px_rgba(242,101,34,0.7)] [background:var(--brand-gradient)] [transform:rotateY(180deg)]">
            <span aria-hidden="true" className="grid-lines absolute inset-0 opacity-60" />
            <div className="relative flex items-center justify-between">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-white/80">
                {pillar.index} / {String(qualityPillars.length).padStart(2, '0')}
              </span>
              <PillarIcon name={pillar.title} className="h-7 w-7 text-white/90" />
            </div>
            <div className="relative">
              <h3 className="font-display text-2xl font-bold uppercase">{pillar.title}</h3>
              <p className="mt-3 text-lg font-medium leading-snug text-white/95">{pillar.description}</p>
            </div>
          </div>
        </motion.div>
      </button>
    </motion.li>
  )
}

export default function PillarsFlip() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy-950 py-24 text-paper lg:py-36">
      <motion.div style={{ y: imgY }} className="absolute inset-0 -top-[10%] h-[120%]">
        <img
          src={img(media.pillars, 2200)}
          alt=""
          aria-hidden="true"
          loading="lazy"
          onError={(e) => (e.currentTarget.style.opacity = '0')}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <span className="absolute inset-0 bg-navy-950/80" />
      <span className="absolute inset-0 bg-gradient-to-b from-navy-950 via-transparent to-navy-950" />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="eyebrow !text-amber inline-flex items-center gap-3">
              <span className="h-px w-8 bg-amber/60" /> How we work <span className="h-px w-8 bg-amber/60" />
            </span>
          </Reveal>
          <motion.h2
            variants={lineParent}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="mt-7 text-display-lg font-bold uppercase leading-[0.95] text-white"
          >
            {['Four', 'non-negotiables.'].map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.04em]">
                <motion.span variants={lineChild} className={`block ${i === 1 ? 'text-ember-gradient' : ''}`}>
                  {l}
                </motion.span>
              </span>
            ))}
          </motion.h2>
          <Reveal>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-paper/70">
              The standards every Lemos crew carries from the fabrication shop to the live plant.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {qualityPillars.map((p, i) => (
            <FlipCard key={p.index} pillar={p} i={i} />
          ))}
        </ul>
      </Container>
    </section>
  )
}
