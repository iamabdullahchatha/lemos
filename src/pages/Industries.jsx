import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Reveal from '@/components/ui/Reveal'
import Button3D from '@/components/ui/Button3D'
import TiltCard from '@/components/ui/TiltCard'
import TechnicalLabel from '@/components/ui/TechnicalLabel'
import ServiceIcon from '@/components/icons/ServiceIcon'
import { ArrowIcon } from '@/components/layout/NavIcons'
import { industries, industryDetail as detail, industryPageContent } from '@/data/industries'
import { services, getService } from '@/data/services'
import { industriesCta, industryBlockImages, industryImages, img, media } from '@/data/media'
import { EASE, lineParent, lineChild, viewportOnce } from '@/lib/motion'

const darkEyebrow = '!text-amber [&>span]:bg-amber/60'

const sectorId = (slug) => `sector-${slug}`

// In-page jump that clears the fixed header and plays nicely with Lenis.
function jumpTo(e, id) {
  const el = document.getElementById(id)
  if (!el) return
  e.preventDefault()
  const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) * 16 || 96
  const extra = window.matchMedia('(min-width: 1024px)').matches ? 32 : 80
  const y = el.getBoundingClientRect().top + window.scrollY - navH - extra
  if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.3 })
  else window.scrollTo({ top: y, behavior: 'smooth' })
  history.replaceState(null, '', `#${id}`)
}

function Heading({ lines, accent = 1, dark = false, className = '' }) {
  return (
    <motion.h2
      variants={lineParent}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={`mt-6 font-bold uppercase leading-[0.96] ${dark ? 'text-white' : 'text-ink'} ${className}`}
    >
      {lines.map((l, i) => (
        <span key={l} className="block overflow-hidden pb-[0.04em]">
          <motion.span variants={lineChild} className={`block ${i === accent ? 'text-ember-gradient' : ''}`}>
            {l}
          </motion.span>
        </span>
      ))}
    </motion.h2>
  )
}

export default function Industries() {
  return (
    <>
      <IndustriesHero />
      <SectorChapters />
      <CoverageMatrix />
      <IndustriesCta />
    </>
  )
}

/* 1 — Hero */
function IndustriesHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.16])
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-16%'])
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  return (
    <section ref={ref} className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-navy-950 text-paper">
      <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0">
        <img
          src={img(media.industriesHero, 2200)}
          alt="Refinery storage tanks in evening light"
          onError={(e) => (e.currentTarget.style.opacity = '0')}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <span className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/30" />
      <span className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/25 to-transparent" />
      <span aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_top,black,transparent_70%)]" />

      <motion.div style={{ y: copyY }} className="relative z-10 w-full pb-14 pt-[calc(var(--nav-h)+4rem)] sm:pb-20">
        <Container>
          <div className="grid items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
                <span className="inline-flex items-center gap-3 rounded-full bg-white/10 py-1.5 pl-1.5 pr-4 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-paper/85 ring-1 ring-inset ring-white/20 backdrop-blur">
                  <span className="rounded-full bg-ember px-2.5 py-1 text-white">Industries</span>
                  Sectors we serve
                </span>
              </motion.div>
              <motion.h1
                variants={lineParent}
                initial="hidden"
                animate="show"
                className="mt-7 text-display-lg font-bold uppercase leading-[0.92] text-white"
              >
                {['The sectors', 'we keep', 'running.'].map((line, i) => (
                  <span key={line} className="block overflow-hidden pb-[0.05em]">
                    <motion.span variants={lineChild} className={`block ${i === 2 ? 'text-ember-gradient' : ''}`}>
                      {line}
                    </motion.span>
                  </span>
                ))}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
                className="mt-7 max-w-xl text-lg leading-relaxed text-paper/75"
              >
                Mechanical contracting, fabrication and maintenance for oil &amp; gas, process, power and industrial
                facilities — where reliability and safety are non-negotiable.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.65 }}
                className="mt-9 flex flex-wrap gap-4"
              >
                <Button3D href="#sectors" onClick={(e) => jumpTo(e, 'sectors')} size="lg">Explore sectors</Button3D>
                <Button3D to="/contact" variant="glass" size="lg" arrow={false}>
                  Request a quote
                </Button3D>
              </motion.div>
            </div>

            {/* Floating glass sector cards */}
            <motion.ul style={{ opacity: fade }} className="grid gap-3 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:pl-10">
              {industries.map((ind, i) => (
                <motion.li
                  key={ind.slug}
                  initial={{ opacity: 0, x: 60, rotateY: -30 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.45 + i * 0.09 }}
                  style={{ transformPerspective: 1000 }}
                  className={`${i % 2 ? '' : 'lg:ml-8'} ${i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
                >
                  <TiltCard
                    as="a"
                    href={`#${sectorId(ind.slug)}`}
                    onClick={(e) => jumpTo(e, sectorId(ind.slug))}
                    max={12}
                    cardClassName="rounded-2xl"
                    aria-label={`Jump to ${ind.title}`}
                  >
                    <div className="relative flex items-center gap-4 rounded-2xl p-3.5 [transform-style:preserve-3d]">
                      <span aria-hidden="true" className="absolute inset-0 rounded-2xl bg-white/[0.08] ring-1 ring-inset ring-white/20 backdrop-blur-md shadow-[0_30px_50px_-30px_rgba(0,0,0,0.8)] transition-colors duration-500 group-hover:bg-white/[0.14]" />
                      <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-amber transition-all duration-500 [transform:translateZ(34px)] group-hover:text-white group-hover:[background:var(--brand-gradient)]">
                        <ServiceIcon name={ind.icon} className="h-5 w-5" />
                      </span>
                      <span className="relative flex-1 [transform:translateZ(22px)]">
                        <span className="block font-mono text-[0.55rem] text-paper/45">{ind.index}</span>
                        <span className="block text-sm font-semibold text-white">{ind.title}</span>
                      </span>
                      <ArrowIcon className="relative mr-1 h-3.5 w-3.5 text-paper/50 transition-all duration-500 group-hover:-rotate-45 group-hover:text-amber" />
                    </div>
                  </TiltCard>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </Container>
      </motion.div>
    </section>
  )
}

/* 2 — Sector chapters: sticky index + one rich chapter per sector */
function SectorChapters() {
  const [active, setActive] = useState(0)
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 60%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 })

  useEffect(() => {
    const els = industries.map((ind) => document.getElementById(sectorId(ind.slug))).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(els.indexOf(e.target))
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    // overflow-clip (not hidden) so the sticky index keeps working
    <section id="sectors" className="relative overflow-clip bg-paper py-24 lg:py-32">
      <span aria-hidden="true" className="grid-lines-ink pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black_5%,transparent_55%)]" />
      <span aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/3 h-[34rem] w-[34rem] rounded-full bg-ember/10 blur-[140px]" />

      <Container className="relative">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <TechnicalLabel code="01">Sector overview</TechnicalLabel>
            </Reveal>
            <Heading lines={['Five sectors,', 'one standard.']} className="text-display-md" />
          </div>
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-lg leading-relaxed text-ink-mute">
                Each sector brings its own operating demands. Explore the applications we support and the core
                disciplines each one draws on.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Mobile / tablet quick index */}
        <nav aria-label="Sectors" className="sticky top-[var(--nav-h)] z-20 -mx-[var(--edge)] mt-12 border-y border-ink/10 bg-paper/85 px-[var(--edge)] py-3 backdrop-blur-xl lg:hidden">
          <ul className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {industries.map((ind, i) => (
              <li key={ind.slug} className="shrink-0">
                <a
                  href={`#${sectorId(ind.slug)}`}
                  onClick={(e) => jumpTo(e, sectorId(ind.slug))}
                  className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold transition-all duration-300 ${
                    active === i ? 'text-white shadow-[0_8px_20px_-8px_rgba(242,101,34,0.8)] [background:var(--brand-gradient)]' : 'bg-white text-ink ring-1 ring-inset ring-ink/10'
                  }`}
                >
                  <ServiceIcon name={ind.icon} className="h-3.5 w-3.5" />
                  {ind.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          {/* Desktop sticky index */}
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-[calc(var(--nav-h)+2rem)]">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ink-faint">Sector index</span>
              <div className="relative mt-5">
                <span aria-hidden="true" className="absolute bottom-3 left-[1.4rem] top-3 w-px bg-ink/10" />
                <motion.span
                  aria-hidden="true"
                  style={{ scaleY: progress }}
                  className="absolute bottom-3 left-[1.4rem] top-3 w-[2px] origin-top rounded-full shadow-[0_0_12px_rgba(242,101,34,0.6)] [background:linear-gradient(to_bottom,#f26522,#ffa430)]"
                />
                <ul className="relative space-y-1.5">
                  {industries.map((ind, i) => {
                    const on = active === i
                    return (
                      <li key={ind.slug}>
                        <a
                          href={`#${sectorId(ind.slug)}`}
                          onClick={(e) => jumpTo(e, sectorId(ind.slug))}
                          aria-current={on ? 'true' : undefined}
                          className={`group/ix flex items-center gap-4 rounded-2xl p-1.5 pr-4 transition-all duration-500 ease-editorial ${
                            on ? 'bg-white shadow-[0_24px_40px_-24px_rgba(8,15,46,0.45)] ring-1 ring-inset ring-ink/5' : 'hover:bg-white/60'
                          }`}
                        >
                          <span
                            className={`relative grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-all duration-500 ${
                              on
                                ? 'text-white shadow-[0_0_0_5px_rgba(242,101,34,0.14),0_10px_24px_-6px_rgba(242,101,34,0.8)] [background:var(--brand-gradient)]'
                                : 'bg-paper-warm text-ink-mute ring-1 ring-inset ring-ink/10 group-hover/ix:text-ember'
                            }`}
                          >
                            <ServiceIcon name={ind.icon} className="h-5 w-5" />
                          </span>
                          <span className="flex-1">
                            <span className={`block font-mono text-[0.58rem] transition-colors ${on ? 'text-ember' : 'text-ink-faint'}`}>{ind.index}</span>
                            <span className={`block text-[1.05rem] font-semibold transition-colors ${on ? 'text-ink' : 'text-ink-mute group-hover/ix:text-ink'}`}>{ind.title}</span>
                          </span>
                          <ArrowIcon className={`h-3.5 w-3.5 transition-all duration-500 ${on ? 'rotate-90 text-ember' : 'text-ink-faint opacity-0 group-hover/ix:opacity-100'}`} />
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>

              <div className="mt-8 rounded-2xl p-5 text-white shadow-[0_30px_50px_-28px_rgba(8,15,46,0.7)] [background:var(--brand-navy-gradient)]">
                <p className="font-display text-lg font-bold leading-snug">Not sure which sector fits your facility?</p>
                <p className="mt-2 text-sm leading-relaxed text-paper/65">Tell us about the asset — we will map the right disciplines to it.</p>
                <Button3D to="/contact" size="sm" className="mt-5">Talk to us</Button3D>
              </div>
            </div>
          </aside>

          {/* Chapters */}
          <div ref={listRef} className="space-y-20 lg:col-span-8 lg:space-y-28">
            {industries.map((ind, i) => (
              <SectorChapter key={ind.slug} ind={ind} i={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function SectorChapter({ ind, i }) {
  const d = detail[ind.slug]
  const page = industryPageContent[ind.slug]
  const flip = i % 2 === 1

  return (
    <article id={sectorId(ind.slug)} className="scroll-mt-[calc(var(--nav-h)+5rem)] lg:scroll-mt-[calc(var(--nav-h)+2rem)]">
      {/* Visual */}
      <motion.div
        initial={{ opacity: 0, y: 70, rotateX: -16 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 1.1, ease: EASE }}
        style={{ transformPerspective: 1600, transformOrigin: '50% 0%' }}
      >
        <TiltCard as={Link} to={`/industries/${ind.slug}`} max={5} cardClassName="rounded-[2rem]" aria-label={`${ind.title} sector page`}>
          <div className="relative aspect-[16/10] rounded-[2rem] [transform-style:preserve-3d] sm:aspect-[16/9]">
            <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[2rem] bg-navy-900 shadow-[0_50px_90px_-45px_rgba(8,15,46,0.8)]">
              <img
                src={img(industryBlockImages[ind.slug], 1600)}
                alt=""
                loading="lazy"
                onError={(e) => (e.currentTarget.style.opacity = '0')}
                className="h-full w-full object-cover transition-transform duration-[1.6s] ease-editorial group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/15 to-transparent" />
              <span className="absolute inset-0 bg-gradient-to-br from-ember/0 to-ember/0 transition-colors duration-700 group-hover:to-ember/20" />
              <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-700 ease-editorial [background:var(--brand-gradient)] group-hover:scale-x-100" />
            </div>

            <div className="absolute left-5 top-5 flex items-center gap-3 [transform:translateZ(40px)] sm:left-7 sm:top-7">
              <span className="grid h-12 w-12 place-items-center rounded-2xl text-white shadow-[0_5px_0_#b73a10,0_18px_30px_-10px_rgba(242,101,34,0.85)] [background:var(--brand-gradient)] sm:h-14 sm:w-14">
                <ServiceIcon name={ind.icon} className="h-6 w-6 sm:h-7 sm:w-7" />
              </span>
              <span className="rounded-full bg-navy-950/45 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white ring-1 ring-inset ring-white/20 backdrop-blur-md">
                Sector {ind.index} / {String(industries.length).padStart(2, '0')}
              </span>
            </div>

            <div className="absolute bottom-5 left-5 right-5 [transform:translateZ(55px)] sm:bottom-7 sm:left-7 sm:right-[42%]">
              <h3 className="text-[clamp(1.75rem,3.4vw,3rem)] font-bold uppercase leading-[0.95] text-white [text-shadow:0_2px_18px_rgba(3,7,25,0.55)]">
                {ind.title}
              </h3>
              <span className="mt-3 hidden items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-amber sm:inline-flex">
                Open sector page
                <ArrowIcon className="h-3 w-3 transition-transform duration-500 group-hover:-rotate-45" />
              </span>
            </div>

            {/* Floating inset photo */}
            <div
              aria-hidden="true"
              className={`absolute -right-6 hidden w-[34%] overflow-hidden rounded-2xl shadow-[0_40px_60px_-25px_rgba(8,15,46,0.75)] ring-[6px] ring-paper [transform:translateZ(80px)] sm:block ${
                flip ? '-top-10' : '-bottom-10'
              }`}
            >
              <img
                src={img(industryImages[ind.slug], 800)}
                alt=""
                loading="lazy"
                onError={(e) => (e.currentTarget.style.opacity = '0')}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </TiltCard>
      </motion.div>

      {/* Copy */}
      <div className="mt-10 grid gap-10 sm:mt-16 md:grid-cols-2">
        <Reveal>
          <p className="font-display text-xl font-semibold leading-snug text-ink">{page?.tagline || ind.description}</p>
          <p className="mt-4 text-base leading-relaxed text-ink-mute">{page?.intro.lead}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button3D to={`/industries/${ind.slug}`} size="sm">View sector</Button3D>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink-faint">Applications</span>
          <ul className="mt-4 space-y-3">
            {d.applications.map((a, k) => (
              <li key={a} className="flex gap-3">
                <span className="mt-0.5 font-mono text-[0.62rem] text-ember">{String(k + 1).padStart(2, '0')}</span>
                <span>
                  <span className="block text-sm font-semibold text-ink">{a}</span>
                  {page?.appDetails?.[k] && <span className="mt-0.5 block text-sm leading-relaxed text-ink-mute">{page.appDetails[k]}</span>}
                </span>
              </li>
            ))}
          </ul>

          <span className="mt-8 block font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink-faint">Core services</span>
          <ul className="mt-3 flex flex-wrap gap-2">
            {d.services.map((sl) => {
              const s = getService(sl)
              return (
                <li key={sl}>
                  <Link
                    to={`/services/${sl}`}
                    className="group/s inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-3.5 text-xs font-semibold text-ink ring-1 ring-inset ring-ink/10 shadow-[0_10px_20px_-14px_rgba(8,15,46,0.4)] transition-all hover:-translate-y-0.5 hover:ring-ember/40"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-paper-warm text-ember transition-all group-hover/s:text-white group-hover/s:[background:var(--brand-gradient)]">
                      <ServiceIcon name={sl} className="h-3.5 w-3.5" />
                    </span>
                    {s?.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </article>
  )
}

/* 3 — Sector × service coverage matrix (derived from industryDetail) */
function CoverageMatrix() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 text-paper lg:py-32">
      <span aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
      <span aria-hidden="true" className="pointer-events-none absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-ember/20 blur-[120px]" />
      <Container className="relative">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow className={darkEyebrow}>Coverage</Eyebrow>
          </Reveal>
          <Heading lines={['Disciplines', 'by sector.']} dark className="text-display-md" />
          <Reveal>
            <p className="mt-6 text-lg leading-relaxed text-paper/70">
              The core services each sector draws on most. Every discipline remains available across all five.
            </p>
          </Reveal>
        </div>

        <p className="mt-10 flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-paper/45 lg:hidden">
          Swipe to see all services
          <ArrowIcon className="h-3 w-3 text-amber" />
        </p>

        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 16 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1.2, ease: EASE }}
          style={{ transformPerspective: 1600 }}
          className="mt-14 overflow-x-auto rounded-[1.75rem] bg-white/[0.03] p-2 ring-1 ring-inset ring-white/10 backdrop-blur"
        >
          <table className="w-full min-w-[860px] border-separate border-spacing-0 text-left">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 bg-navy-950/90 p-4 font-mono text-[0.6rem] font-normal uppercase tracking-[0.2em] text-paper/45 backdrop-blur">
                  Sector
                </th>
                {services.map((s) => (
                  <th key={s.slug} className="p-3 text-center align-bottom">
                    <Link to={`/services/${s.slug}`} className="group inline-flex flex-col items-center gap-2" title={s.title}>
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/[0.06] text-amber ring-1 ring-inset ring-white/10 transition-all group-hover:text-white group-hover:[background:var(--brand-gradient)]">
                        <ServiceIcon name={s.slug} className="h-5 w-5" />
                      </span>
                      <span className="max-w-[6.5rem] text-[0.68rem] font-medium leading-tight text-paper/70 group-hover:text-white">{s.title}</span>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {industries.map((ind, r) => (
                <tr key={ind.slug} className="group/row">
                  <th scope="row" className="sticky left-0 z-10 border-t border-white/10 bg-navy-950/90 p-4 backdrop-blur">
                    <Link to={`/industries/${ind.slug}`} className="flex items-center gap-3 transition-colors hover:text-amber">
                      <ServiceIcon name={ind.icon} className="h-5 w-5 text-amber" />
                      <span className="whitespace-nowrap text-sm font-semibold text-white">{ind.title}</span>
                    </Link>
                  </th>
                  {services.map((s, c) => {
                    const on = detail[ind.slug].services.includes(s.slug)
                    return (
                      <td key={s.slug} className="border-t border-white/10 p-3 text-center transition-colors group-hover/row:bg-white/[0.03]">
                        {on ? (
                          <motion.span
                            initial={{ scale: 0, rotate: -90 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={viewportOnce}
                            transition={{ duration: 0.6, ease: EASE, delay: 0.3 + (r + c) * 0.04 }}
                            className="mx-auto grid h-8 w-8 place-items-center rounded-lg text-white shadow-[0_4px_0_#7a2a0b,0_12px_20px_-8px_rgba(242,101,34,0.7)]"
                            style={{ background: 'var(--brand-gradient)' }}
                          >
                            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-label="Core service">
                              <path d="M3 8.5l3.2 3L13 4.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </motion.span>
                        ) : (
                          <span aria-hidden="true" className="mx-auto block h-1.5 w-1.5 rounded-full bg-white/15" />
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </Container>
    </section>
  )
}

/* 5 — CTA */
function IndustriesCta() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section ref={ref} className="relative flex min-h-[72vh] items-center overflow-hidden bg-navy-950 text-paper">
      <motion.div style={{ y: imgY }} className="absolute inset-0 -top-[8%] h-[116%]">
        <img
          src={img(industriesCta, 2000)}
          alt=""
          aria-hidden="true"
          onError={(e) => (e.currentTarget.style.opacity = '0')}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <span className="absolute inset-0 bg-navy-950/70" />
      <span className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-navy-950/60" />

      <Container className="relative z-10 py-24 text-center">
        <Reveal>
          <Eyebrow className={`${darkEyebrow} justify-center`}>Your sector</Eyebrow>
        </Reveal>
        <motion.h2
          variants={lineParent}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-7 max-w-3xl text-display-lg font-bold uppercase leading-[0.95] text-white"
        >
          <span className="block overflow-hidden pb-[0.04em]">
            <motion.span variants={lineChild} className="block">Engineering for</motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.04em]">
            <motion.span variants={lineChild} className="block text-ember-gradient">your industry.</motion.span>
          </span>
        </motion.h2>
        <Reveal delay={0.1}>
          <div className="mt-11 flex flex-wrap justify-center gap-4">
            <Button3D to="/contact" size="lg">Request a quote</Button3D>
            <Button3D to="/services" variant="glass" size="lg" arrow={false}>Our services</Button3D>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
