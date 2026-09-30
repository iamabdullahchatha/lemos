import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Reveal from '@/components/ui/Reveal'
import { processSteps } from '@/data/process'
import { processImages, img } from '@/data/media'
import { EASE } from '@/lib/motion'

const N = processSteps.length
const PANEL_VW = 78 // width of each panel in vw

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const on = () => setDesktop(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return desktop
}

export default function ProcessJourney() {
  const desktop = useIsDesktop()
  return desktop ? <HorizontalTrack /> : <VerticalList />
}

/* ---------- Desktop: sticky horizontal scroll ---------- */
function HorizontalTrack() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0vw', `-${(N - 1) * PANEL_VW}vw`])
  const lineScale = useTransform(scrollYProgress, [0, 1], [1 / N, 1])

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      const idx = Math.min(N - 1, Math.floor(v * N + 0.0001))
      setActive(idx)
    })
  }, [scrollYProgress])

  return (
    <section
      ref={ref}
      className="relative bg-ink text-paper"
      style={{ height: `${N * 62}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Header */}
        <Container className="relative z-10 pt-[calc(var(--nav-h)+2rem)]">
          <div className="flex items-end justify-between gap-6">
            <div>
              <Eyebrow className="!text-amber [&>span]:bg-amber/60">How we deliver</Eyebrow>
              <h2 className="mt-5 text-display-md font-bold uppercase leading-[0.98] text-white">
                The process
              </h2>
            </div>
            <div className="hidden text-right font-mono text-xs uppercase tracking-[0.18em] text-paper/50 md:block">
              <span className="text-amber">{processSteps[active].index}</span>
              {' / '}
              {String(N).padStart(2, '0')}
              <p className="mt-1 text-paper/40">{processSteps[active].title}</p>
            </div>
          </div>
        </Container>

        {/* Track */}
        <div className="relative flex flex-1 items-center">
          <motion.div style={{ x }} className="flex gap-6 pl-[var(--edge)] will-change-transform">
            {processSteps.map((step, i) => (
              <article
                key={step.key}
                className="relative flex shrink-0 flex-col justify-end"
                style={{ width: `${PANEL_VW}vw` }}
              >
                <div className="grid h-full grid-cols-12 items-center gap-8">
                  {/* Image */}
                  <div className="col-span-7 h-[52vh] overflow-hidden border border-white/10">
                    <img
                      src={img(processImages[step.key], 1400)}
                      alt={step.title}
                      loading="lazy"
                      onError={(e) => (e.currentTarget.style.opacity = '0')}
                      className={`h-full w-full object-cover transition-all duration-700 ease-editorial ${
                        active === i ? 'scale-100 grayscale-0' : 'scale-105 grayscale'
                      }`}
                    />
                  </div>
                  {/* Text */}
                  <div className="col-span-5">
                    <span
                      className={`index-num block font-display text-[6rem] font-bold leading-none transition-colors duration-500 ${
                        active === i ? 'text-amber' : ''
                      }`}
                    >
                      {step.index}
                    </span>
                    <h3 className="mt-4 text-3xl font-semibold text-white">{step.title}</h3>
                    <p className="mt-4 max-w-sm text-base leading-relaxed text-paper/70">
                      {step.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </div>

        {/* Progress line */}
        <div className="relative z-10 mx-[var(--edge)] mb-10 h-px bg-white/15">
          <motion.div
            style={{ scaleX: lineScale }}
            className="h-full origin-left bg-ember"
          />
        </div>
      </div>
    </section>
  )
}

/* ---------- Mobile / tablet: vertical stacked steps ---------- */
function VerticalList() {
  return (
    <section className="bg-ink py-20 text-paper">
      <Container>
        <Eyebrow className="!text-amber [&>span]:bg-amber/60">How we deliver</Eyebrow>
        <h2 className="mt-5 text-display-sm font-bold uppercase leading-[1.0] text-white">
          The process
        </h2>

        <ol className="mt-12 space-y-12">
          {processSteps.map((step, i) => (
            <li key={step.key}>
              <Reveal>
                <div className="overflow-hidden border border-white/10">
                  <img
                    src={img(processImages[step.key], 1000)}
                    alt={step.title}
                    loading="lazy"
                    onError={(e) => (e.currentTarget.style.opacity = '0')}
                    className="aspect-[16/10] w-full object-cover"
                  />
                </div>
                <div className="mt-5 flex items-baseline gap-4">
                  <span className="font-display text-3xl font-bold text-amber">
                    {step.index}
                  </span>
                  <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
                </div>
                <p className="mt-3 text-base leading-relaxed text-paper/70">
                  {step.description}
                </p>
              </Reveal>
              {i < N - 1 && <span className="mt-8 block h-10 w-px bg-white/15" />}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
