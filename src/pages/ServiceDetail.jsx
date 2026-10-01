import { useParams, Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Reveal from '@/components/ui/Reveal'
import Button3D from '@/components/ui/Button3D'
import TiltCard from '@/components/ui/TiltCard'
import Photo from '@/components/ui/Photo'
import TechnicalLabel from '@/components/ui/TechnicalLabel'
import ServiceIcon from '@/components/icons/ServiceIcon'
import { ArrowIcon } from '@/components/layout/NavIcons'
import { services, getService } from '@/data/services'
import { getServiceContent } from '@/data/serviceContent'
import { pic, media, serviceHeroes, serviceSecondary, serviceEquipmentImages } from '@/data/media'
import { industries } from '@/data/industries'
import { EASE, lineParent, lineChild, viewportOnce } from '@/lib/motion'
import NotFound from './NotFound'

const darkEyebrow = '!text-amber [&>span]:bg-amber/60'
const pad = (n) => String(n).padStart(2, '0')

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

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)
  const content = getServiceContent(slug)
  if (!service || !content) return <NotFound />

  const idx = services.findIndex((s) => s.slug === slug)
  const next = services[(idx + 1) % services.length]

  return (
    <>
      <ServiceHero key={`hero-${slug}`} service={service} content={content} />
      <ServiceIntro service={service} content={content} idx={idx} />
      <ServiceCapabilities service={service} content={content} />
      <ServiceApplications service={service} content={content} />
      <ServiceEquipment service={service} content={content} />
      <ServiceProcess content={content} />
      <ServiceIndustries content={content} />
      <ServiceFaq key={`faq-${slug}`} content={content} />
      <ServiceRelated content={content} />
      <ServiceCta next={next} />
    </>
  )
}

/* 1 — Cinematic hero */
function ServiceHero({ service, content }) {
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
          {...pic(serviceHeroes[service.slug], 2200)}
          fetchpriority="high"
          decoding="async"
          sizes="100vw"
          alt={service.title}
          onError={(e) => (e.currentTarget.style.opacity = '0')}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <span className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/30" />
      <span className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/25 to-transparent" />
      <span aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_top,black,transparent_70%)]" />

      <motion.div style={{ y: copyY }} className="relative z-10 w-full pb-14 pt-[calc(var(--nav-h)+4rem)] sm:pb-20">
        <Container>
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-8 flex flex-wrap items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-paper/55"
          >
            <Link to="/" className="transition-colors hover:text-white">Home</Link>
            <span className="text-paper/30">/</span>
            <Link to="/services" className="transition-colors hover:text-white">Services</Link>
            <span className="text-paper/30">/</span>
            <span className="text-amber">{service.title}</span>
          </motion.nav>

          <div className="grid items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
                <span className="inline-flex items-center gap-3 rounded-full bg-white/10 py-1.5 pl-1.5 pr-4 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-paper/85 ring-1 ring-inset ring-white/20 backdrop-blur">
                  <span className="grid h-7 w-7 place-items-center rounded-full text-white" style={{ background: 'var(--brand-gradient)' }}>
                    <ServiceIcon name={service.slug} className="h-4 w-4" />
                  </span>
                  {content.heroKicker}
                </span>
              </motion.div>
              <motion.h1
                variants={lineParent}
                initial="hidden"
                animate="show"
                className="mt-7 text-display-lg font-bold uppercase leading-[0.92] text-white"
              >
                {content.heroLines.map((line, i) => (
                  <span key={i} className="block overflow-hidden pb-[0.05em]">
                    <motion.span variants={lineChild} className={`block ${i === content.heroLines.length - 1 ? 'text-ember-gradient' : ''}`}>
                      {line}
                    </motion.span>
                  </span>
                ))}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
                className="mt-7 max-w-xl text-lg leading-relaxed text-paper/75"
              >
                {content.tagline}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
                className="mt-9 flex flex-wrap gap-4"
              >
                <Button3D to="/contact" size="lg">Request a quote</Button3D>
                <Button3D to="/services" variant="glass" size="lg" arrow={false}>
                  All services
                </Button3D>
              </motion.div>
            </div>

            {/* Floating glass scope cards */}
            <motion.ul style={{ opacity: fade }} className="grid gap-3 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1 lg:pl-4">
              {service.scope.map((sc, i) => (
                <motion.li
                  key={sc}
                  initial={{ opacity: 0, x: 60, rotateY: -30 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.5 + i * 0.1 }}
                  style={{ transformPerspective: 1000 }}
                  className={i % 2 ? '' : 'lg:ml-6'}
                >
                  <TiltCard max={12} cardClassName="rounded-2xl">
                    <div className="relative flex items-center gap-4 rounded-2xl p-4 [transform-style:preserve-3d]">
                      <span aria-hidden="true" className="absolute inset-0 rounded-2xl bg-white/[0.08] ring-1 ring-inset ring-white/20 backdrop-blur-md shadow-[0_30px_50px_-30px_rgba(0,0,0,0.8)]" />
                      <span className="relative font-display text-2xl font-bold text-amber [transform:translateZ(36px)]">{pad(i + 1)}</span>
                      <span className="relative text-sm font-semibold text-white [transform:translateZ(22px)]">{sc}</span>
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

/* 2 — Introduction */
function ServiceIntro({ service, content, idx }) {
  const flip = idx % 2 === 1
  return (
    <section className="relative overflow-hidden bg-paper py-24 lg:py-36">
      <span aria-hidden="true" className={`grid-lines-ink pointer-events-none absolute inset-0 ${flip ? '[mask-image:radial-gradient(ellipse_at_bottom_left,black_5%,transparent_55%)]' : '[mask-image:radial-gradient(ellipse_at_bottom_right,black_5%,transparent_55%)]'}`} />
      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-16">
          <div className={`lg:col-span-6 ${flip ? 'lg:order-2' : ''}`}>
            <Reveal>
              <TechnicalLabel code="INTRO">Overview</TechnicalLabel>
            </Reveal>
            <Reveal>
              <p className="mt-7 text-display-sm font-semibold leading-[1.2] text-ink">{content.intro.lead}</p>
            </Reveal>
            <div className="mt-8 max-w-xl space-y-5">
              {content.intro.body.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className="text-lg leading-relaxed text-ink-mute">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className={`lg:col-span-6 ${flip ? 'lg:order-1' : ''}`}>
            <motion.div
              initial={{ opacity: 0, y: 60, rotateY: flip ? 18 : -18 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1.2, ease: EASE }}
              style={{ transformPerspective: 1400 }}
              className="relative mx-auto max-w-lg lg:max-w-none"
            >
              <span aria-hidden="true" className={`absolute -bottom-6 ${flip ? '-left-6' : '-right-6'} h-2/3 w-2/3 rounded-[2rem] [background:var(--brand-gradient)] opacity-90`} />
              <TiltCard max={6} cardClassName="rounded-[2rem]">
                <div className="relative aspect-[4/5] rounded-[2rem] [transform-style:preserve-3d]">
                  <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[2rem] bg-navy-900 shadow-[0_50px_80px_-40px_rgba(8,15,46,0.8)]">
                    <Photo id={serviceSecondary[service.slug]} w={1400} alt="" className="transition-transform duration-[1.4s] ease-editorial group-hover:scale-105" />
                    <span className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
                  </div>
                  <div className={`absolute bottom-6 ${flip ? 'right-6' : 'left-6'} flex items-center gap-4 rounded-2xl bg-white/90 p-3 pr-5 shadow-[0_24px_40px_-20px_rgba(8,15,46,0.7)] backdrop-blur [transform:translateZ(60px)]`}>
                    <span className="grid h-12 w-12 place-items-center rounded-xl text-white" style={{ background: 'var(--brand-gradient)' }}>
                      <ServiceIcon name={service.slug} className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ember">Discipline {service.index}</span>
                      <span className="block text-sm font-semibold text-ink">{service.title}</span>
                    </span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* 3 — Capabilities */
function ServiceCapabilities({ service, content }) {
  return (
    <section className="bg-paper-warm py-24 lg:py-32">
      <Container>
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>Capabilities</Eyebrow>
            </Reveal>
            <Heading lines={['What this service', 'delivers.']} className="text-display-sm" />
          </div>
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-lg leading-relaxed text-ink-mute">{service.summary}</p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.capabilities.map((c, i) => (
            <motion.li
              key={c.title}
              initial={{ opacity: 0, y: 50, rotateX: -30 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1, ease: EASE, delay: i * 0.08 }}
              style={{ transformPerspective: 1000 }}
            >
              <TiltCard max={12} cardClassName="rounded-[1.5rem]" className="h-full">
                <div className="relative flex h-full flex-col rounded-[1.5rem] p-7 [transform-style:preserve-3d]">
                  <span aria-hidden="true" className="absolute inset-0 rounded-[1.5rem] bg-paper-pure ring-1 ring-inset ring-ink/[0.07] shadow-[0_6px_0_rgba(16,19,26,0.06),0_30px_50px_-30px_rgba(8,15,46,0.35)] transition-shadow duration-500 group-hover:shadow-[0_6px_0_rgba(242,101,34,0.35),0_40px_60px_-30px_rgba(242,101,34,0.45)]" />
                  <div className="relative flex items-center justify-between [transform:translateZ(40px)]">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-900 font-mono text-sm font-semibold text-amber transition-all duration-500 group-hover:text-white group-hover:[background:var(--brand-gradient)]">
                      {pad(i + 1)}
                    </span>
                    <ServiceIcon name={service.slug} className="h-6 w-6 text-ink-faint transition-colors duration-500 group-hover:text-ember" />
                  </div>
                  <h3 className="relative mt-8 text-lg font-semibold text-ink [transform:translateZ(30px)]">{c.title}</h3>
                  <p className="relative mt-3 text-[0.95rem] leading-relaxed text-ink-mute [transform:translateZ(20px)]">{c.description}</p>
                  <span className="relative mt-auto block pt-6">
                    <span className="block h-0.5 w-8 rounded-full [background:var(--brand-gradient)] transition-all duration-500 ease-editorial group-hover:w-20" />
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

/* 4 — Technical applications */
function ServiceApplications({ service, content }) {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-24 text-paper lg:py-32">
      <span aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_top_left,black_10%,transparent_65%)]" />
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-40 -right-32 h-[30rem] w-[30rem] rounded-full bg-ember/20 blur-[120px]" />
      <Container className="relative">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow className={darkEyebrow}>Technical applications</Eyebrow>
            </Reveal>
            <Heading lines={['Where it’s', 'applied.']} dark className="text-display-md" />
          </div>
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-paper/45">{service.index} / 08</span>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2">
          {content.applications.map((a, i) => (
            <motion.li
              key={a}
              initial={{ opacity: 0, y: 40, rotateY: i % 2 ? 22 : -22 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1, ease: EASE, delay: i * 0.08 }}
              style={{ transformPerspective: 1200 }}
            >
              <TiltCard max={10} cardClassName="rounded-2xl">
                <div className="relative flex items-center gap-6 rounded-2xl p-6 [transform-style:preserve-3d] sm:p-7">
                  <span aria-hidden="true" className="absolute inset-0 rounded-2xl bg-white/[0.05] ring-1 ring-inset ring-white/12 backdrop-blur transition-colors duration-500 group-hover:bg-white/[0.09] group-hover:ring-amber/40" />
                  <span className="relative font-display text-4xl font-bold leading-none text-amber [transform:translateZ(40px)]">{pad(i + 1)}</span>
                  <span className="relative flex-1 text-lg font-medium text-white [transform:translateZ(28px)] md:text-xl">{a}</span>
                  <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-white transition-all duration-500 ease-editorial [transform:translateZ(34px)] group-hover:-rotate-45 group-hover:[background:var(--brand-gradient)]">
                    <ArrowIcon className="h-3.5 w-3.5" />
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

/* 5 — Equipment / systems */
function ServiceEquipment({ service, content }) {
  return (
    <section className="relative overflow-hidden bg-paper py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Equipment &amp; systems</Eyebrow>
            </Reveal>
            <Heading lines={['What we', 'work with.']} className="text-display-sm" />
            <Reveal>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ink-mute">
                The systems and components at the core of {service.title.toLowerCase()} — handled, fabricated and
                installed to the standards demanding facilities require.
              </p>
            </Reveal>

            <motion.div
              initial={{ opacity: 0, y: 60, rotateX: 20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1.2, ease: EASE }}
              style={{ transformPerspective: 1400 }}
              className="mt-10"
            >
              <TiltCard max={7} cardClassName="rounded-[1.75rem]">
                <div className="relative aspect-[5/4] rounded-[1.75rem] [transform-style:preserve-3d]">
                  <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[1.75rem] bg-navy-900 shadow-[0_40px_70px_-38px_rgba(8,15,46,0.75)]">
                    <Photo id={serviceEquipmentImages[service.slug]} w={1200} alt="" className="transition-transform duration-[1.4s] ease-editorial group-hover:scale-110" />
                    <span className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
                  </div>
                  <div className="absolute inset-x-6 bottom-6 flex items-end justify-between [transform:translateZ(50px)]">
                    <span>
                      <span className="block font-mono text-[0.6rem] uppercase tracking-[0.22em] text-amber">Fig. {service.index}</span>
                      <span className="mt-1 block text-xl font-semibold text-white">{service.title}</span>
                    </span>
                    <span className="rounded-full bg-white/15 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white ring-1 ring-inset ring-white/25 backdrop-blur">
                      {pad(content.equipment.length)} systems
                    </span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>

          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-7">
            {content.equipment.map((e, i) => (
              <motion.li
                key={e}
                initial={{ opacity: 0, y: 40, rotateX: -50 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.06 }}
                style={{ transformPerspective: 900 }}
              >
                <TiltCard max={14} cardClassName="rounded-2xl">
                  <div className="relative flex aspect-square flex-col justify-between rounded-2xl p-5 [transform-style:preserve-3d]">
                    <span aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-2xl bg-navy-900 shadow-[0_5px_0_#030719,0_26px_36px_-20px_rgba(8,15,46,0.6)]">
                      <span className="grid-lines absolute inset-0 opacity-30" />
                      <span className="absolute inset-0 opacity-0 transition-opacity duration-500 [background:var(--brand-gradient)] group-hover:opacity-100" />
                    </span>
                    <span className="relative flex items-center justify-between [transform:translateZ(30px)]">
                      <span className="rounded-full bg-white/10 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-amber ring-1 ring-inset ring-white/15 transition-colors group-hover:text-white">
                        EQ·{pad(i + 1)}
                      </span>
                      <span className="h-2 w-2 rounded-full bg-white/40 transition-all duration-500 group-hover:bg-white group-hover:shadow-[0_0_12px_#fff]" />
                    </span>
                    <span className="relative text-base font-semibold leading-tight text-white [transform:translateZ(45px)] sm:text-lg">{e}</span>
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

/* 6 — Process timeline */
function ServiceProcess({ content }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const line = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-24 text-paper lg:py-32">
      <span aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
      <Container className="relative">
        <Reveal>
          <Eyebrow className={darkEyebrow}>How we deliver</Eyebrow>
        </Reveal>
        <Heading lines={['The', 'process.']} dark className="text-display-md" />

        <div className="relative mt-16">
          <span aria-hidden="true" className="absolute left-7 top-0 h-full w-px bg-white/10 md:left-0 md:top-7 md:h-px md:w-full" />
          <motion.span aria-hidden="true" style={{ scaleY: line }} className="absolute left-7 top-0 h-full w-px origin-top [background:var(--brand-gradient)] md:hidden" />
          <motion.span aria-hidden="true" style={{ scaleX: line }} className="absolute left-0 top-7 hidden h-px w-full origin-left [background:var(--brand-gradient)] md:block" />

          <ol className="relative grid gap-8 md:grid-cols-4 md:gap-5">
            {content.process.map((step, i) => (
              <motion.li
                key={step.index}
                initial={{ opacity: 0, y: 40, rotateX: -40 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
                style={{ transformPerspective: 900 }}
                className="flex gap-5 md:block"
              >
                <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl font-display text-lg font-bold text-white shadow-[0_6px_0_#7a2a0b,0_22px_34px_-12px_rgba(242,101,34,0.6)]" style={{ background: 'var(--brand-gradient)' }}>
                  {step.index}
                </span>
                <TiltCard max={10} cardClassName="rounded-2xl" className="flex-1 md:mt-7">
                  <div className="relative rounded-2xl p-6 [transform-style:preserve-3d]">
                    <span aria-hidden="true" className="absolute inset-0 rounded-2xl bg-white/[0.04] ring-1 ring-inset ring-white/10 transition-colors duration-500 group-hover:bg-white/[0.08]" />
                    <h3 className="relative text-lg font-semibold text-white [transform:translateZ(30px)]">{step.title}</h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-paper/65 [transform:translateZ(18px)]">{step.description}</p>
                  </div>
                </TiltCard>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}

/* 7 — Industries served */
function ServiceIndustries({ content }) {
  const list = content.industries.map((sl) => industries.find((x) => x.slug === sl)).filter(Boolean)
  return (
    <section className="bg-paper-warm py-24 lg:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <Eyebrow>Industries served</Eyebrow>
            </Reveal>
            <Heading lines={['Where it’s', 'used.']} className="text-display-sm" />
          </div>
          <Reveal>
            <Button3D to="/industries" variant="outline">All industries</Button3D>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((ind, i) => (
            <motion.li
              key={ind.slug}
              initial={{ opacity: 0, y: 40, rotateX: -35 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.07 }}
              style={{ transformPerspective: 900 }}
            >
              <TiltCard as={Link} to={`/industries/${ind.slug}`} max={12} cardClassName="rounded-2xl" aria-label={ind.title}>
                <div className="relative flex min-h-[12rem] flex-col justify-between rounded-2xl p-6 [transform-style:preserve-3d]">
                  <span aria-hidden="true" className="absolute inset-0 rounded-2xl bg-paper-pure ring-1 ring-inset ring-ink/[0.07] shadow-[0_6px_0_rgba(16,19,26,0.06),0_30px_50px_-30px_rgba(8,15,46,0.35)] transition-shadow duration-500 group-hover:shadow-[0_6px_0_rgba(242,101,34,0.35),0_40px_60px_-30px_rgba(242,101,34,0.45)]" />
                  <span className="relative flex items-center justify-between [transform:translateZ(35px)]">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-900 text-amber transition-all duration-500 group-hover:text-white group-hover:[background:var(--brand-gradient)]">
                      <ServiceIcon name={ind.icon} className="h-6 w-6" />
                    </span>
                    <ArrowIcon className="h-4 w-4 text-ink-faint transition-all duration-500 group-hover:-rotate-45 group-hover:text-ember" />
                  </span>
                  <span className="relative [transform:translateZ(28px)]">
                    <span className="block font-mono text-[0.6rem] text-ember">{ind.index}</span>
                    <span className="mt-1 block text-lg font-semibold text-ink">{ind.title}</span>
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

/* 9 — FAQ */
function ServiceFaq({ content }) {
  const [open, setOpen] = useState(0)
  return (
    <section className="bg-paper py-24 lg:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Questions</Eyebrow>
            </Reveal>
            <Heading lines={['Good to', 'know.']} className="text-display-sm" />
            <Reveal>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-ink-mute">
                Something not covered here? Our team will answer it directly.
              </p>
            </Reveal>
            <Reveal>
              <div className="mt-8">
                <Button3D to="/contact" variant="dark" size="md">Ask a question</Button3D>
              </div>
            </Reveal>
          </div>
          <ul className="space-y-3 lg:col-span-8">
            {content.faq.map((f, i) => {
              const isOpen = open === i
              return (
                <Reveal as="li" key={f.q} delay={i * 0.05}>
                  <div
                    className={`overflow-hidden rounded-2xl ring-1 ring-inset transition-all duration-500 ${
                      isOpen
                        ? 'bg-paper-pure shadow-[0_30px_50px_-30px_rgba(8,15,46,0.35)] ring-ember/30'
                        : 'bg-paper-warm ring-ink/[0.07] hover:ring-ink/20'
                    }`}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex w-full items-center justify-between gap-6 p-6 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-xs text-ember">{pad(i + 1)}</span>
                        <span className="text-lg font-semibold text-ink md:text-xl">{f.q}</span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xl transition-all duration-500 ease-editorial ${
                          isOpen ? 'rotate-45 text-white [background:var(--brand-gradient)]' : 'bg-navy-900 text-white'
                        }`}
                      >
                        +
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-2xl px-6 pb-6 pl-[3.25rem] text-base leading-relaxed text-ink-mute">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </Container>
    </section>
  )
}

/* 10 — Related services */
function ServiceRelated({ content }) {
  const related = content.related.map((sl) => getService(sl)).filter(Boolean)
  return (
    <section className="bg-paper-warm py-24 lg:py-32">
      <Container>
        <Reveal>
          <Eyebrow>Related services</Eyebrow>
        </Reveal>
        <Heading lines={['Explore more', 'capabilities.']} className="text-display-sm" />

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {related.map((s, i) => (
            <motion.li
              key={s.slug}
              initial={{ opacity: 0, y: 50, rotateY: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1, ease: EASE, delay: i * 0.1 }}
              style={{ transformPerspective: 1200 }}
            >
              <TiltCard as={Link} to={`/services/${s.slug}`} max={10} className="h-full" cardClassName="rounded-[1.5rem]" aria-label={s.title}>
                <article className="relative flex h-full min-h-[19rem] flex-col justify-between rounded-[1.5rem] p-7 text-white [transform-style:preserve-3d]">
                  <span aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[1.5rem] bg-navy-900 shadow-[0_6px_0_#030719,0_34px_50px_-26px_rgba(8,15,46,0.7)]">
                    <span className="grid-lines absolute inset-0 opacity-30" />
                    <span className="absolute inset-0 opacity-0 transition-opacity duration-700 [background:var(--brand-gradient)] group-hover:opacity-100" />
                    <span className="absolute -right-6 -top-10 font-display text-[9rem] font-bold leading-none text-white/[0.06]">{s.index}</span>
                  </span>
                  <span className="relative flex items-center justify-between [transform:translateZ(40px)]">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-amber ring-1 ring-inset ring-white/15 transition-colors duration-500 group-hover:bg-white group-hover:text-ember">
                      <ServiceIcon name={s.slug} className="h-7 w-7" />
                    </span>
                    <span className="font-mono text-xs text-paper/50 group-hover:text-white/80">{s.index}</span>
                  </span>
                  <span className="relative mt-10 [transform:translateZ(30px)]">
                    <span className="block text-xl font-semibold">{s.title}</span>
                    <span className="mt-3 block text-sm leading-relaxed text-paper/70 group-hover:text-white/90">{s.summary}</span>
                    <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em]">
                      View service
                      <ArrowIcon className="h-3 w-3 transition-transform duration-500 group-hover:-rotate-45" />
                    </span>
                  </span>
                </article>
              </TiltCard>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

/* 11 — Final CTA */
function ServiceCta({ next }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section ref={ref} className="relative flex min-h-[70vh] items-center overflow-hidden bg-navy-950 text-paper">
      <motion.div style={{ y: imgY }} className="absolute inset-0 -top-[8%] h-[116%]">
        <img
          {...pic(media.serviceCta, 2000)}
          loading="lazy"
          decoding="async"
          alt=""
          aria-hidden="true"
          onError={(e) => (e.currentTarget.style.opacity = '0')}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <span className="absolute inset-0 bg-navy-950/80" />
      <span className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/70" />
      <span aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 opacity-30" />

      <Container className="relative z-10 py-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: EASE }}
          className="eyebrow !text-amber justify-center"
        >
          <span className="h-px w-8 bg-amber/70" /> Let&apos;s talk scope
        </motion.p>
        <motion.h2
          variants={lineParent}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-7 max-w-3xl text-display-lg font-bold uppercase leading-[0.95] text-white"
        >
          <span className="block overflow-hidden pb-[0.04em]">
            <motion.span variants={lineChild} className="block">Let&apos;s engineer</motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.04em]">
            <motion.span variants={lineChild} className="block text-ember-gradient">what&apos;s next.</motion.span>
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          className="mt-11 flex flex-wrap justify-center gap-4"
        >
          <Button3D to="/contact" size="lg">Request a quote</Button3D>
          <Button3D to="/services" variant="glass" size="lg" arrow={false}>All services</Button3D>
        </motion.div>

        <div className="mx-auto mt-16 max-w-md">
          <TiltCard as={Link} to={`/services/${next.slug}`} max={10} cardClassName="rounded-2xl" aria-label={`Next service: ${next.title}`}>
            <div className="relative flex items-center gap-5 rounded-2xl p-4 text-left [transform-style:preserve-3d]">
              <span aria-hidden="true" className="absolute inset-0 rounded-2xl bg-white/[0.07] ring-1 ring-inset ring-white/15 backdrop-blur-md transition-colors duration-500 group-hover:bg-white/[0.12]" />
              <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-xl text-white [transform:translateZ(36px)]" style={{ background: 'var(--brand-gradient)' }}>
                <ServiceIcon name={next.slug} className="h-7 w-7" />
              </span>
              <span className="relative flex-1 [transform:translateZ(24px)]">
                <span className="block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-paper/50">Next service · {next.index}</span>
                <span className="mt-1 block text-lg font-semibold text-white">{next.title}</span>
              </span>
              <ArrowIcon className="relative h-4 w-4 text-amber transition-transform duration-500 group-hover:translate-x-1" />
            </div>
          </TiltCard>
        </div>
      </Container>
    </section>
  )
}
