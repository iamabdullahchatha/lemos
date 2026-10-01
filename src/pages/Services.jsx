import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Reveal from '@/components/ui/Reveal'
import Button3D from '@/components/ui/Button3D'
import TiltCard from '@/components/ui/TiltCard'
import TechnicalLabel from '@/components/ui/TechnicalLabel'
import ServiceIcon from '@/components/icons/ServiceIcon'
import { ArrowIcon } from '@/components/layout/NavIcons'
import { services } from '@/data/services'
import { processSteps } from '@/data/process'
import { industries } from '@/data/industries'
import { pic, servicesPage } from '@/data/media'
import { EASE, lineParent, lineChild, viewportOnce } from '@/lib/motion'

const darkEyebrow = '!text-amber [&>span]:bg-amber/60'

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

export default function Services() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <DeliveryProcess />
      <OneContractor />
      <ServicesIndustries />
    </>
  )
}

/* 1 — Hero */
function ServicesHero() {
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
          {...pic(servicesPage.hero, 2200)}
          fetchpriority="high"
          decoding="async"
          sizes="100vw"
          alt="Welder at work in a fabrication shop"
          onError={(e) => (e.currentTarget.style.opacity = '0')}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <span className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/30" />
      <span className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/30 to-transparent" />
      <span aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_top,black,transparent_70%)]" />

      <motion.div style={{ y: copyY }} className="relative z-10 w-full pb-14 pt-[calc(var(--nav-h)+4rem)] sm:pb-20">
        <Container>
          <div className="grid items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
                <span className="inline-flex items-center gap-3 rounded-full bg-white/10 py-1.5 pl-1.5 pr-4 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-paper/85 ring-1 ring-inset ring-white/20 backdrop-blur">
                  <span className="rounded-full bg-ember px-2.5 py-1 text-white">Services</span>
                  01 — 08 Disciplines
                </span>
              </motion.div>
              <motion.h1
                variants={lineParent}
                initial="hidden"
                animate="show"
                className="mt-7 text-display-lg font-bold uppercase leading-[0.92] text-white"
              >
                {['Eight disciplines.', 'One accountable', 'team.'].map((line, i) => (
                  <span key={line} className="block overflow-hidden pb-[0.05em]">
                    <motion.span variants={lineChild} className={`block ${i === 1 ? 'text-ember-gradient' : ''}`}>
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
                Mechanical engineering disciplines delivered from fabrication shop to live facility — planned,
                built, installed and maintained under one contract.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.65 }}
                className="mt-9 flex flex-wrap gap-4"
              >
                <Button3D href="#disciplines" size="lg">Explore services</Button3D>
                <Button3D to="/contact" variant="glass" size="lg" arrow={false}>
                  Request a quote
                </Button3D>
              </motion.div>
            </div>

            {/* Floating glass index of all disciplines */}
            <motion.div
              style={{ opacity: fade, transformPerspective: 1200 }}
              initial={{ opacity: 0, x: 60, rotateY: -28 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
              className="hidden lg:col-span-5 lg:block lg:pl-8"
            >
              <TiltCard max={8} cardClassName="rounded-[1.75rem]">
                <div className="relative rounded-[1.75rem] p-6 [transform-style:preserve-3d]">
                  <span aria-hidden="true" className="absolute inset-0 rounded-[1.75rem] bg-white/[0.07] ring-1 ring-inset ring-white/20 backdrop-blur-md shadow-[0_40px_70px_-35px_rgba(0,0,0,0.85)]" />
                  <div className="relative flex items-center justify-between px-2 pb-4 [transform:translateZ(30px)]">
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-amber">Discipline index</span>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-paper/45">08</span>
                  </div>
                  <ul className="relative grid grid-cols-2 gap-2 [transform:translateZ(45px)]">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link
                          to={`/services/${s.slug}`}
                          className="group/row flex items-center gap-3 rounded-xl p-2.5 transition-colors duration-300 hover:bg-white/[0.08]"
                        >
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/[0.06] text-amber ring-1 ring-inset ring-white/10 transition-all duration-300 group-hover/row:text-white group-hover/row:[background:var(--brand-gradient)]">
                            <ServiceIcon name={s.slug} className="h-[18px] w-[18px]" />
                          </span>
                          <span className="min-w-0">
                            <span className="block font-mono text-[0.55rem] text-paper/40">{s.index}</span>
                            <span className="block text-[0.78rem] font-medium leading-snug text-paper/85 group-hover/row:text-white">
                              {s.title}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </Container>
      </motion.div>
    </section>
  )
}

/* 2 — Service cards */
const cardIn = {
  hidden: { opacity: 0, y: 70, rotateX: -24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 1.1, ease: EASE, delay: (i % 2) * 0.12 },
  }),
}

function ServiceCard({ s, i }) {
  const [failed, setFailed] = useState(false)
  return (
    <motion.li
      custom={i}
      variants={cardIn}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      style={{ transformPerspective: 1400 }}
      className="min-h-[34rem] sm:min-h-[30rem]"
    >
      <TiltCard as={Link} to={`/services/${s.slug}`} max={7} className="h-full" cardClassName="rounded-[1.75rem]" aria-label={s.title}>
        <article className="relative flex h-full flex-col justify-between gap-10 rounded-[1.75rem] p-6 [transform-style:preserve-3d] sm:p-8">
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[1.75rem] bg-navy-900 shadow-[0_40px_70px_-38px_rgba(8,15,46,0.75)]">
            {!failed && (
              <img
                {...pic(servicesPage.cards[s.slug], 1200)}
                decoding="async"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                alt=""
                loading="lazy"
                onError={() => setFailed(true)}
                className="h-full w-full object-cover transition-transform duration-[1.4s] ease-editorial group-hover:scale-110"
              />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/20" />
            <span className="absolute inset-0 bg-gradient-to-br from-ember/0 to-ember/0 transition-colors duration-700 group-hover:to-ember/25" />
            <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-700 ease-editorial [background:var(--brand-gradient)] group-hover:scale-x-100" />
          </div>

          <div className="relative flex items-start justify-between [transform:translateZ(35px)]">
            <span
              className="grid h-14 w-14 place-items-center rounded-2xl text-white shadow-[0_14px_30px_-10px_rgba(242,101,34,0.85)]"
              style={{ background: 'var(--brand-gradient)' }}
            >
              <ServiceIcon name={s.slug} className="h-7 w-7" />
            </span>
            <span className="font-display text-6xl font-bold leading-none text-white/15 transition-colors duration-500 group-hover:text-white/30">
              {s.index}
            </span>
          </div>

          <div className="relative [transform:translateZ(50px)]">
            <h3 className="text-2xl font-bold uppercase leading-tight text-white [text-shadow:0_2px_16px_rgba(3,7,25,0.6)] sm:text-3xl">
              {s.title}
            </h3>
            <p className="mt-3 max-w-lg text-[0.95rem] leading-relaxed text-paper/75">{s.summary}</p>
            <ul className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2">
              {s.scope.map((sc) => (
                <li key={sc} className="flex items-start gap-2.5 text-sm text-paper/85">
                  <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-amber shadow-[0_0_10px_#ffa430]" />
                  {sc}
                </li>
              ))}
            </ul>
            <span className="mt-7 inline-flex items-center gap-3 rounded-full bg-white/10 py-1.5 pl-4 pr-1.5 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-white ring-1 ring-inset ring-white/20 backdrop-blur transition-colors duration-500 group-hover:bg-white group-hover:text-navy-950">
              Explore service
              <span className="grid h-7 w-7 place-items-center rounded-full bg-ember text-white transition-transform duration-500 ease-editorial group-hover:-rotate-45">
                <ArrowIcon className="h-3 w-3" />
              </span>
            </span>
          </div>
        </article>
      </TiltCard>
    </motion.li>
  )
}

function ServicesGrid() {
  return (
    <section id="disciplines" className="relative scroll-mt-24 overflow-hidden bg-paper py-24 lg:py-32">
      <span aria-hidden="true" className="grid-lines-ink pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black_5%,transparent_55%)]" />
      <Container className="relative">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <TechnicalLabel code="01">Our disciplines</TechnicalLabel>
            </Reveal>
            <Heading lines={['Capabilities across', 'the mechanical scope.']} className="text-display-md" />
          </div>
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-lg leading-relaxed text-ink-mute">
                Each discipline stands on its own — or combines with the others into a single, coordinated
                mechanical package. Select a service to see scope, process and applications.
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:gap-8">
          {services.map((s, i) => (
            <ServiceCard key={s.slug} s={s} i={i} />
          ))}
        </ul>
      </Container>
    </section>
  )
}

/* 3 — Delivery process */
function DeliveryProcess() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const line = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy-950 py-24 text-paper lg:py-32">
      <span aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
      <span aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-ember/20 blur-[120px]" />
      <Container className="relative">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow className={darkEyebrow}>How we deliver</Eyebrow>
          </Reveal>
          <Heading lines={['From first plan', 'to long-term care.']} dark className="text-display-md" />
          <Reveal>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/70">
              Every service follows the same disciplined sequence, so scopes combine cleanly and nothing is lost
              between phases.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16">
          {/* animated rail */}
          <span aria-hidden="true" className="absolute left-[1.6rem] top-0 h-full w-px bg-white/10 lg:left-0 lg:top-[1.6rem] lg:h-px lg:w-full" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: line }}
            className="absolute left-[1.6rem] top-0 h-full w-px origin-top [background:var(--brand-gradient)] lg:hidden"
          />
          <motion.span
            aria-hidden="true"
            style={{ scaleX: line }}
            className="absolute left-0 top-[1.6rem] hidden h-px w-full origin-left [background:var(--brand-gradient)] lg:block"
          />

          <ol className="relative grid gap-10 lg:grid-cols-6 lg:gap-6">
            {processSteps.map((step, i) => (
              <motion.li
                key={step.key}
                initial={{ opacity: 0, y: 40, rotateX: -40 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
                style={{ transformPerspective: 900 }}
                className="flex gap-6 lg:block"
              >
                <span className="relative grid h-[3.2rem] w-[3.2rem] shrink-0 place-items-center rounded-2xl bg-navy-900 font-mono text-sm font-semibold text-amber ring-1 ring-inset ring-white/15 shadow-[0_6px_0_#030719,0_20px_30px_-12px_rgba(242,101,34,0.45)]">
                  {step.index}
                </span>
                <span className="block lg:mt-7">
                  <span className="block text-lg font-semibold text-white">{step.title}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-paper/60">{step.description}</span>
                </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}

/* 4 — Why one contractor */
const benefits = [
  {
    icon: 'mechanical-contracting',
    title: 'Single point of accountability',
    body: 'One team owns the mechanical scope, so responsibility never falls between contractors.',
  },
  {
    icon: 'pipe-fabrication-installation',
    title: 'Shop-to-field continuity',
    body: 'The people who fabricate the work are the people who install it — with the same drawings and standards.',
  },
  {
    icon: 'equipment-installation',
    title: 'Fewer interfaces',
    body: 'Fabrication, rigging, installation and testing are coordinated together, keeping schedules tight.',
  },
  {
    icon: 'maintenance-services',
    title: 'Lifecycle support',
    body: 'From commissioning through turnarounds and maintenance, we stay with the asset after handover.',
  },
]

function OneContractor() {
  return (
    <section className="relative overflow-hidden bg-paper-warm py-24 lg:py-32">
      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <TechnicalLabel code="02">Why one contractor</TechnicalLabel>
            </Reveal>
            <Heading lines={['Combined scope,', 'cleaner delivery.']} className="text-display-sm" />
            <Reveal>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-ink-mute">
                Our services are designed to work together. Bundle the disciplines you need and manage one
                relationship instead of many.
              </p>
            </Reveal>
            <Reveal>
              <div className="mt-9">
                <Button3D to="/contact" variant="dark">Discuss your scope</Button3D>
              </div>
            </Reveal>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
            {benefits.map((b, i) => (
              <motion.li
                key={b.title}
                initial={{ opacity: 0, y: 50, rotateY: i % 2 ? 25 : -25 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 1, ease: EASE, delay: i * 0.08 }}
                style={{ transformPerspective: 1200 }}
                className={i % 2 ? 'sm:mt-10' : ''}
              >
                <TiltCard max={12} cardClassName="rounded-[1.5rem]">
                  <div className="relative h-full rounded-[1.5rem] p-7 [transform-style:preserve-3d] sm:p-8">
                    <span aria-hidden="true" className="absolute inset-0 rounded-[1.5rem] bg-paper-pure ring-1 ring-inset ring-ink/[0.07] shadow-[0_6px_0_rgba(16,19,26,0.06),0_30px_50px_-30px_rgba(8,15,46,0.35)] transition-shadow duration-500 group-hover:shadow-[0_6px_0_rgba(242,101,34,0.35),0_40px_60px_-30px_rgba(242,101,34,0.45)]" />
                    <div className="relative flex items-center justify-between [transform:translateZ(40px)]">
                      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy-900 text-amber shadow-[0_10px_24px_-10px_rgba(8,15,46,0.8)] transition-all duration-500 group-hover:text-white group-hover:[background:var(--brand-gradient)]">
                        <ServiceIcon name={b.icon} className="h-7 w-7" />
                      </span>
                      <span className="font-mono text-xs text-ink-faint">0{i + 1}</span>
                    </div>
                    <h3 className="relative mt-8 text-xl font-semibold text-ink [transform:translateZ(30px)]">{b.title}</h3>
                    <p className="relative mt-3 text-[0.95rem] leading-relaxed text-ink-mute [transform:translateZ(20px)]">{b.body}</p>
                  </div>
                </TiltCard>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}

/* 5 — Industries strip */
function ServicesIndustries() {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <TechnicalLabel code="03">Sectors served</TechnicalLabel>
            </Reveal>
            <Heading lines={['Built for', 'demanding industries.']} className="text-display-sm" />
          </div>
          <Reveal>
            <Button3D to="/industries" variant="outline">All industries</Button3D>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {industries.map((ind, i) => (
            <motion.li
              key={ind.slug}
              initial={{ opacity: 0, y: 40, rotateX: -35 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.07 }}
              style={{ transformPerspective: 900 }}
              className={i === 4 ? 'col-span-2 md:col-span-1' : ''}
            >
              <TiltCard as={Link} to={`/industries/${ind.slug}`} max={14} cardClassName="rounded-2xl" aria-label={ind.title}>
                <div className="relative flex aspect-[4/5] flex-col justify-between rounded-2xl p-5 [transform-style:preserve-3d] max-md:aspect-auto max-md:min-h-[11rem]">
                  <span aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-2xl bg-navy-900 shadow-[0_5px_0_#030719,0_26px_36px_-20px_rgba(8,15,46,0.6)]">
                    <img
                      {...pic(servicesPage.industries[ind.slug], 700)}
                      decoding="async"
                      sizes="(min-width: 1024px) 18vw, 50vw"
                      alt=""
                      loading="lazy"
                      onError={(e) => (e.currentTarget.style.opacity = '0')}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-110"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/25" />
                    <span className="absolute inset-0 opacity-0 mix-blend-multiply transition-opacity duration-500 [background:var(--brand-gradient)] group-hover:opacity-70" />
                    <span className="grid-lines absolute inset-0 opacity-20" />
                  </span>
                  <span className="relative flex items-center justify-between [transform:translateZ(30px)]">
                    <span className="font-mono text-xs text-amber transition-colors group-hover:text-white">{ind.index}</span>
                    <ArrowIcon className="h-4 w-4 text-white/60 transition-all duration-500 group-hover:-rotate-45 group-hover:text-white" />
                  </span>
                  <span className="relative grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-white ring-1 ring-inset ring-white/25 backdrop-blur-md [transform:translateZ(50px)]">
                    <ServiceIcon name={ind.icon} className="h-6 w-6" />
                  </span>
                  <span className="relative text-lg font-semibold leading-tight text-white [transform:translateZ(40px)]">
                    {ind.title}
                  </span>
                </div>
              </TiltCard>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
