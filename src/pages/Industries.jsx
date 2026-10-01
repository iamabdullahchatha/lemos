import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Reveal from '@/components/ui/Reveal'
import PremiumButton from '@/components/ui/PremiumButton'
import ServiceIcon from '@/components/icons/ServiceIcon'
import { industries, industryDetail as detail } from '@/data/industries'
import { getService } from '@/data/services'
import { industryBlockImages, industryImages, img, media } from '@/data/media'
import { EASE, lineParent, lineChild, viewportOnce } from '@/lib/motion'

function useIsDesktop() {
  const [d, setD] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const on = () => setD(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return d
}

export default function Industries() {
  const desktop = useIsDesktop()
  return (
    <>
      <IndustriesHero />
      {desktop ? <Explorer /> : <StackedIndustries />}
      <IndustriesCta />
    </>
  )
}

/* Hero */
function IndustriesHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.16])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  return (
    <section ref={ref} className="relative flex h-[82svh] min-h-[560px] w-full items-end overflow-hidden bg-navy-950 text-paper">
      <motion.div style={{ scale: imgScale }} className="absolute inset-0">
        <img
          src={img(media.industriesHero, 2200)}
          alt="Refinery storage tanks in evening light"
          onError={(e) => (e.currentTarget.style.opacity = '0')}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <span className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/45 to-navy-950/25" />
      <span className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-transparent to-transparent" />

      <motion.div style={{ y: copyY, opacity: fade }} className="relative z-10 w-full pb-16 sm:pb-20">
        <Container>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
            <span className="eyebrow !text-amber [&>span]:bg-amber/60"><span className="h-px w-8" /> Sectors we serve</span>
          </motion.div>
          <motion.h1 variants={lineParent} initial="hidden" animate="show" className="mt-6 text-display-xl font-bold uppercase leading-[0.92] text-white">
            {['The sectors', 'we keep', 'running.'].map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.05em]">
                <motion.span variants={lineChild} className={`block ${i === 2 ? 'text-ember-gradient' : ''}`}>{line}</motion.span>
              </span>
            ))}
          </motion.h1>
        </Container>
      </motion.div>
    </section>
  )
}

/* Desktop immersive explorer */
function Explorer() {
  const [active, setActive] = useState(0)
  const cur = industries[active]
  const d = detail[cur.slug]

  return (
    <section className="relative min-h-screen overflow-hidden bg-navy-950 text-paper">
      {/* changing background */}
      <AnimatePresence>
        <motion.div
          key={cur.slug}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="absolute inset-0"
        >
          <img src={img(industryImages[cur.slug], 2000)} alt="" aria-hidden="true" onError={(e) => (e.currentTarget.style.opacity = '0')} className="h-full w-full object-cover" />
        </motion.div>
      </AnimatePresence>
      <span className="absolute inset-0 bg-navy-950/80" />
      <span className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/55 to-transparent" />

      {/* giant ghost index */}
      <AnimatePresence mode="wait">
        <motion.span
          key={cur.slug}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 0.06, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.6, ease: EASE }}
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none font-display text-[40vh] font-bold leading-none text-white"
        >
          {cur.index}
        </motion.span>
      </AnimatePresence>

      <Container className="relative z-10 grid min-h-screen grid-cols-12 items-center gap-16 py-28">
        {/* List */}
        <div className="col-span-5">
          <div className="mb-8 flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-amber">
            <span className="h-px w-8 bg-amber/60" /> Industry explorer
          </div>
          <ul>
            {industries.map((ind, i) => (
              <li key={ind.slug}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex w-full items-center gap-5 border-b border-white/12 py-5 text-left"
                >
                  <span className={`font-mono text-sm transition-colors duration-300 ${active === i ? 'text-amber' : 'text-paper/40'}`}>{ind.index}</span>
                  <span className={`transition-colors duration-300 ${active === i ? 'text-amber' : 'text-paper/45'}`}>
                    <ServiceIcon name={ind.icon} className="h-6 w-6" />
                  </span>
                  <span className={`flex-1 text-2xl font-semibold transition-all duration-400 ease-editorial md:text-3xl ${active === i ? 'translate-x-1 text-white' : 'text-paper/60 group-hover:translate-x-1 group-hover:text-white'}`}>
                    {ind.title}
                  </span>
                  <span className={`text-xl transition-all duration-400 ease-editorial ${active === i ? 'text-ember opacity-100' : '-translate-x-2 opacity-0'}`} aria-hidden="true">→</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Detail panel */}
        <div className="col-span-6 col-start-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={cur.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-amber">Sector {cur.index} / 05</span>
              <h2 className="mt-4 text-display-md font-bold uppercase leading-[0.98] text-white">{cur.title}</h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-paper/80">{cur.description}</p>

              <div className="mt-8">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-paper/45">Applications</span>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {d.applications.map((a) => (
                    <li key={a} className="border border-white/20 px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-paper/75">{a}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-paper/45">Relevant services</span>
                <div className="mt-3 flex flex-col gap-2">
                  {d.services.map((sl) => {
                    const s = getService(sl)
                    return (
                      <Link key={sl} to={`/services/${sl}`} className="group inline-flex items-center gap-3 text-paper/85 transition-colors hover:text-amber">
                        <span className="h-px w-6 bg-ember transition-all duration-400 ease-editorial group-hover:w-10" />
                        <span className="text-base font-medium">{s?.title}</span>
                        <span className="transition-transform duration-400 ease-editorial group-hover:translate-x-1">→</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}

/* Mobile / tablet stacked immersive blocks */
function StackedIndustries() {
  return (
    <section className="bg-navy-950">
      {industries.map((ind, i) => {
        const d = detail[ind.slug]
        return (
          <div key={ind.slug} className="relative overflow-hidden border-b border-white/10 text-paper">
            <div className="absolute inset-0">
              <img src={img(industryBlockImages[ind.slug], 1400)} alt="" aria-hidden="true" onError={(e) => (e.currentTarget.style.opacity = '0')} className="h-full w-full object-cover" />
            </div>
            <span className="absolute inset-0 bg-navy-950/82" />
            <Container className="relative z-10 py-16">
              <Reveal>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm text-amber">{ind.index}</span>
                  <span className="text-amber"><ServiceIcon name={ind.icon} className="h-7 w-7" /></span>
                </div>
              </Reveal>
              <Reveal>
                <h2 className="mt-4 text-display-sm font-bold uppercase leading-[1.0] text-white">{ind.title}</h2>
              </Reveal>
              <Reveal>
                <p className="mt-4 max-w-md text-base leading-relaxed text-paper/80">{ind.description}</p>
              </Reveal>
              <Reveal>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {d.applications.map((a) => (
                    <li key={a} className="border border-white/20 px-3 py-1.5 font-mono text-[0.64rem] uppercase tracking-[0.1em] text-paper/75">{a}</li>
                  ))}
                </ul>
              </Reveal>
              <Reveal>
                <div className="mt-6 flex flex-col gap-2">
                  {d.services.map((sl) => {
                    const s = getService(sl)
                    return (
                      <Link key={sl} to={`/services/${sl}`} className="group inline-flex items-center gap-3 text-paper/85">
                        <span className="h-px w-6 bg-ember" />
                        <span className="text-sm font-medium">{s?.title}</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    )
                  })}
                </div>
              </Reveal>
            </Container>
          </div>
        )
      })}
    </section>
  )
}

/* CTA */
function IndustriesCta() {
  return (
    <section className="bg-paper py-28 lg:py-36">
      <Container className="text-center">
        <Reveal>
          <Eyebrow className="justify-center">Your sector</Eyebrow>
        </Reveal>
        <Reveal>
          <h2 className="mx-auto mt-7 max-w-3xl text-display-lg font-bold uppercase leading-[0.95] text-ink">
            Engineering for <span className="text-ember-gradient">your industry.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-11 flex flex-wrap justify-center gap-4">
            <PremiumButton to="/contact" variant="ember">Request a Quote</PremiumButton>
            <PremiumButton to="/services" variant="outline" arrow={false}>Our services</PremiumButton>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
