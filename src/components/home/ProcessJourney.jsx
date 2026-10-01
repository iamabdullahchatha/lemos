import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import { processSteps } from '@/data/process'
import { pic, processImages } from '@/data/media'
import { EASE } from '@/lib/motion'

const N = processSteps.length

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

// Scroll → step position with a short dwell on each step, so every card
// settles before the next one moves in.
function dwell(v) {
  const raw = Math.min(Math.max(v, 0), 1) * (N - 1)
  const i = Math.floor(raw)
  const f = raw - i
  const t = Math.min(Math.max((f - 0.18) / 0.64, 0), 1)
  return i + t * t * (3 - 2 * t)
}

// Minimal line icons per stage
const STAGE_ICONS = {
  planning: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V3h6v1M8.5 10h7M8.5 14h7M8.5 18h4" />
    </>
  ),
  engineering: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
    </>
  ),
  fabrication: (
    <>
      <path d="M3 20h18M6 20V11l6-4 6 4v9" />
      <path d="M12 7V3M10 14h4v6h-4z" />
    </>
  ),
  installation: (
    <>
      <path d="M4 21V3h11M15 3v5" />
      <path d="M15 8a2.5 2.5 0 1 1-2.5 2.5M4 9h4M4 15h4" />
    </>
  ),
  testing: (
    <>
      <path d="M4 16a8 8 0 1 1 16 0" />
      <path d="M12 16l4-5M3 20h18" />
    </>
  ),
  maintenance: (
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z" />
  ),
}

function StageIcon({ name, className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {STAGE_ICONS[name]}
    </svg>
  )
}

export default function ProcessJourney() {
  const desktop = useIsDesktop()
  return desktop ? <DeckJourney /> : <TimelineJourney />
}

/* ---------- Desktop: sticky scroll-driven 3D card deck ---------- */
function DeckJourney() {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const pos = useSpring(useTransform(scrollYProgress, dwell), { stiffness: 140, damping: 26, mass: 0.6 })
  const rail = useTransform(pos, [0, N - 1], ['0%', '100%'])

  useEffect(() => {
    return pos.on('change', (v) => setActive(Math.min(N - 1, Math.max(0, Math.round(v)))))
  }, [pos])

  // Jump to a stage: scroll to the point in the section where that card is centred.
  const goTo = (i) => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const span = el.offsetHeight - window.innerHeight
    const y = top + (span * i) / (N - 1) + 2
    if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.2 })
    else window.scrollTo({ top: y, behavior: 'smooth' })
  }

  const step = processSteps[active]

  return (
    <section ref={ref} className="relative bg-ink text-paper" style={{ height: `${N * 75}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Ambient backdrop — blurred photo of the active stage */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <AnimatePresence initial={false}>
            <motion.img
              key={step.key}
              {...pic(processImages[step.key], 800, 50)}
              decoding="async"
              sizes="60vw"
              alt=""
              initial={{ opacity: 0, scale: 1.25 }}
              animate={{ opacity: 0.32, scale: 1.15 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: EASE }}
              className="absolute inset-0 h-full w-full object-cover blur-2xl saturate-150"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/70" />
          <div className="grid-lines absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_70%_50%,black,transparent_70%)]" />
          <div className="absolute -right-40 top-1/4 h-[36rem] w-[36rem] rounded-full bg-ember/20 blur-[140px]" />
          <div className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-navy-500/25 blur-[120px]" />
        </div>

        {/* Header */}
        <Container className="relative z-10 pt-[calc(var(--nav-h)+1.75rem)]">
          <div className="flex items-end justify-between gap-6">
            <div>
              <Eyebrow className="!text-amber [&>span]:bg-amber/60">How we deliver</Eyebrow>
              <h2 className="mt-4 text-display-md font-bold uppercase leading-[0.98] text-white">
                The <span className="text-ember-gradient">process</span>
              </h2>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-paper/50">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
              </span>
              Stage <span className="tabular-nums text-white">{step.index}</span> / {String(N).padStart(2, '0')}
            </div>
          </div>
        </Container>

        {/* Stage */}
        <Container className="relative z-10 grid min-h-0 flex-1 grid-cols-12 items-center gap-10 py-6">
          {/* Active copy */}
          <div className="col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <div className="flex items-center gap-5">
                  <span className="text-ember-gradient font-display text-[clamp(4rem,8vw,7.5rem)] font-extrabold leading-[0.85] tracking-tight">
                    {step.index}
                  </span>
                  <span className="grid h-14 w-14 place-items-center rounded-2xl text-white shadow-[0_5px_0_#b73a10,0_20px_40px_-12px_rgba(242,101,34,0.75)] [background:var(--brand-gradient)]">
                    <StageIcon name={step.key} className="h-7 w-7" />
                  </span>
                </div>
                <h3 className="mt-6 font-display text-[clamp(1.75rem,2.6vw,2.6rem)] font-bold leading-tight text-white">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-paper/70">{step.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 3D deck */}
          {/* The deck stays a flat stacking context (z-index wins over 3D depth
              sorting); each card carries its own perspective for its flip. */}
          <div className="col-span-7 h-full max-h-[38rem] min-h-0 pt-[4.5rem] [perspective:1600px]">
            <div className="relative h-full [transform:rotateY(-9deg)_rotateX(4deg)]">
              {processSteps.map((s, i) => (
                <DeckCard key={s.key} step={s} i={i} pos={pos} active={active === i} />
              ))}
            </div>
          </div>
        </Container>

        {/* Stage rail */}
        <Container className="relative z-10 pb-8">
          <div className="relative">
            <div className="absolute left-0 right-0 top-[1.1rem] h-px bg-white/10" />
            <motion.div
              style={{ width: rail }}
              className="absolute left-0 top-[1.1rem] h-[2px] -translate-y-1/2 rounded-full shadow-[0_0_14px_2px_rgba(242,101,34,0.7)] [background:var(--brand-gradient)]"
            />
            <ol className="relative grid grid-cols-6">
              {processSteps.map((s, i) => {
                const reached = i <= active
                return (
                  <li key={s.key} className={i === 0 ? 'text-left' : i === N - 1 ? 'text-right' : 'text-center'}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={i === active ? 'step' : undefined}
                      className={`group/step inline-flex flex-col gap-2.5 ${i === 0 ? 'items-start' : i === N - 1 ? 'items-end' : 'items-center'}`}
                    >
                      <span
                        className={`relative grid h-[2.2rem] w-[2.2rem] place-items-center rounded-full border transition-all duration-500 ${
                          i === active
                            ? 'scale-110 border-transparent text-white shadow-[0_0_0_6px_rgba(242,101,34,0.18),0_0_30px_rgba(242,101,34,0.8)] [background:var(--brand-gradient)]'
                            : reached
                              ? 'border-ember/60 bg-ink text-amber'
                              : 'border-white/15 bg-ink text-paper/40 group-hover/step:border-white/40 group-hover/step:text-paper/80'
                        }`}
                      >
                        <StageIcon name={s.key} className="h-4 w-4" />
                      </span>
                      <span className={`font-mono text-[0.62rem] uppercase tracking-[0.18em] transition-colors duration-500 ${i === active ? 'text-white' : 'text-paper/45 group-hover/step:text-paper/75'}`}>
                        {s.index} · {s.title.split(' ')[0]}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>
        </Container>
      </div>
    </section>
  )
}

function DeckCard({ step, i, pos, active }) {
  // d < 0: card has been passed and flies off; d > 0: card waits in the stack.
  const y = useTransform(pos, (v) => {
    const d = i - v
    return d < 0 ? `${d * 125}%` : `${-d * 7}%`
  })
  const scale = useTransform(pos, (v) => {
    const d = i - v
    return d < 0 ? 1 + d * 0.05 : Math.max(0.7, 1 - d * 0.07)
  })
  const rotateX = useTransform(pos, (v) => {
    const d = i - v
    return d < 0 ? Math.max(d, -1) * -32 : 0
  })
  const opacity = useTransform(pos, (v) => {
    const d = i - v
    // Waiting cards stay opaque (darkened by `shade`) so nothing shows through.
    if (d < 0) return Math.max(0, 1 + d * 2.4)
    return d > 3 ? 0 : d > 2 ? 3 - d : 1
  })
  const shade = useTransform(pos, (v) => Math.min(Math.max(i - v, 0), 1) * 0.55)

  return (
    <motion.article
      style={{ y, scale, rotateX, opacity, zIndex: N - i, transformOrigin: '50% 0%', transformPerspective: 1400 }}
      className="absolute inset-0 will-change-transform"
      aria-hidden={!active}
    >
      <div
        className={`relative h-full overflow-hidden rounded-[1.75rem] ring-1 transition-shadow duration-700 ${
          active
            ? 'shadow-[0_50px_100px_-30px_rgba(0,0,0,0.85),0_0_60px_-10px_rgba(242,101,34,0.45)] ring-ember/40'
            : 'shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] ring-white/10'
        }`}
      >
        <img
          {...pic(processImages[step.key], 1400)}
          decoding="async"
          sizes="(min-width: 1024px) 55vw, 100vw"
          alt={step.title}
          loading="lazy"
          onError={(e) => (e.currentTarget.style.opacity = '0')}
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1.6s] ease-editorial ${active ? 'scale-100' : 'scale-110'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/10 to-transparent" />
        <motion.div style={{ opacity: shade }} className="absolute inset-0 bg-navy-950" />

        {/* Light sweep on the active card */}
        {active && (
          <motion.span
            aria-hidden="true"
            initial={{ x: '-120%' }}
            animate={{ x: '220%' }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.15 }}
            className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
          />
        )}

        <div className="absolute left-6 top-6 flex items-center gap-3">
          <span className="rounded-full bg-white/15 px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white ring-1 ring-inset ring-white/25 backdrop-blur-md">
            Stage {step.index}
          </span>
        </div>
        <span className="pointer-events-none absolute -right-2 -top-6 select-none font-display text-[10rem] font-extrabold leading-none text-white/10">
          {step.index}
        </span>

        <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-amber">Lemos delivery</span>
            <p className="mt-1.5 font-display text-2xl font-bold text-white">{step.title}</p>
          </div>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/15 text-white ring-1 ring-inset ring-white/25 backdrop-blur-md">
            <StageIcon name={step.key} className="h-5 w-5" />
          </span>
        </div>
      </div>
    </motion.article>
  )
}

/* ---------- Mobile / tablet: glowing vertical timeline ---------- */
function TimelineJourney() {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  return (
    <section className="relative overflow-hidden bg-ink py-20 text-paper sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grid-lines absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_60%)]" />
        <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-ember/20 blur-[110px]" />
        <div className="absolute -left-24 bottom-1/3 h-72 w-72 rounded-full bg-navy-500/25 blur-[110px]" />
      </div>

      <Container className="relative">
        <Eyebrow className="!text-amber [&>span]:bg-amber/60">How we deliver</Eyebrow>
        <h2 className="mt-5 text-display-sm font-bold uppercase leading-[1.0] text-white">
          The <span className="text-ember-gradient">process</span>
        </h2>
        <p className="mt-5 max-w-md text-base leading-relaxed text-paper/65">
          Six stages, one accountable team — from first scope to long-term care.
        </p>

        <ol ref={listRef} className="relative mt-14 space-y-10 pl-12 sm:pl-16">
          {/* Rail + glowing fill */}
          <span aria-hidden="true" className="absolute bottom-2 left-[1.05rem] top-2 w-px bg-white/10 sm:left-[1.55rem]" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: fill }}
            className="absolute bottom-2 left-[1.05rem] top-2 w-[2px] origin-top rounded-full shadow-[0_0_14px_2px_rgba(242,101,34,0.7)] [background:linear-gradient(to_bottom,#f26522,#ffa430)] sm:left-[1.55rem]"
          />

          {processSteps.map((step) => (
            <li key={step.key} className="relative">
              {/* Node */}
              <motion.span
                initial={{ scale: 0.4, opacity: 0.4 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '0px 0px -35% 0px' }}
                transition={{ duration: 0.6, ease: EASE }}
                className="absolute -left-12 top-1 grid h-[2.15rem] w-[2.15rem] place-items-center rounded-full text-white shadow-[0_0_0_5px_rgba(242,101,34,0.15),0_0_26px_rgba(242,101,34,0.7)] [background:var(--brand-gradient)] sm:-left-16 sm:h-[3.15rem] sm:w-[3.15rem]"
              >
                <StageIcon name={step.key} className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.span>

              <div className="[perspective:1200px]">
                <motion.div
                  initial={{ opacity: 0, rotateX: -18, y: 40 }}
                  whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                  transition={{ duration: 0.9, ease: EASE }}
                  style={{ transformOrigin: '50% 0%' }}
                  className="overflow-hidden rounded-3xl bg-white/[0.04] ring-1 ring-inset ring-white/10 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      {...pic(processImages[step.key], 1000)}
                      decoding="async"
                      sizes="90vw"
                      alt={step.title}
                      loading="lazy"
                      onError={(e) => (e.currentTarget.style.opacity = '0')}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-white ring-1 ring-inset ring-white/25 backdrop-blur-md">
                      Stage {step.index}
                    </span>
                    <span className="text-ember-gradient absolute bottom-2 right-4 font-display text-6xl font-extrabold leading-none">
                      {step.index}
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
                    <p className="mt-2.5 text-base leading-relaxed text-paper/70">{step.description}</p>
                  </div>
                </motion.div>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
