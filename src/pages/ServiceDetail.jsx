import { useParams, Link } from 'react-router-dom'
import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Reveal from '@/components/ui/Reveal'
import PremiumButton from '@/components/ui/PremiumButton'
import TechnicalLabel from '@/components/ui/TechnicalLabel'
import ParallaxImage from '@/components/ui/ParallaxImage'
import ServiceIcon from '@/components/icons/ServiceIcon'
import TechnicalVisual from '@/components/service/TechnicalVisual'
import { services, getService } from '@/data/services'
import { getServiceContent } from '@/data/serviceContent'
import { media, serviceHeroes, serviceSecondary, img } from '@/data/media'
import { industries } from '@/data/industries'
import { EASE, lineParent, lineChild, viewportOnce } from '@/lib/motion'
import NotFound from './NotFound'

const industryTitle = (slug) => industries.find((i) => i.slug === slug)?.title || slug

export default function ServiceDetail() {
  const { slug } = useParams()
  const service = getService(slug)
  const content = getServiceContent(slug)
  if (!service || !content) return <NotFound />

  const idx = services.findIndex((s) => s.slug === slug)
  const next = services[(idx + 1) % services.length]
  const onDark = content.accent === 'amber' ? 'text-amber' : 'text-ember'
  const onDarkBg = content.accent === 'amber' ? 'bg-amber' : 'bg-ember'

  return (
    <>
      <ServiceHero service={service} content={content} accent={onDark} />
      <ServiceIntro service={service} content={content} idx={idx} />
      <ServiceCapabilities content={content} />
      <ServiceApplications service={service} content={content} accent={onDark} accentBg={onDarkBg} />
      <ServiceEquipment content={content} />
      <ServiceProcess content={content} accent={onDark} />
      <ServiceIndustries content={content} />
      <ServiceVisual service={service} content={content} />
      <ServiceFaq content={content} />
      <ServiceRelated content={content} />
      <ServiceCta next={next} />
    </>
  )
}

/* 1 — Cinematic hero */
function ServiceHero({ service, content, accent }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.16])
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  return (
    <section ref={ref} className="relative flex h-[92svh] min-h-[600px] w-full items-end overflow-hidden bg-navy-950 text-paper">
      <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0">
        <img
          src={img(serviceHeroes[service.slug], 2200)}
          alt={service.title}
          onError={(e) => (e.currentTarget.style.opacity = '0')}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <span className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/45 to-navy-950/25" />
      <span className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-transparent to-transparent" />

      {/* technical marks */}
      <motion.div style={{ opacity: fade }} className="pointer-events-none absolute inset-0">
        <Container className="relative h-full">
          <div className="absolute left-[var(--edge)] top-[calc(var(--nav-h)+1.5rem)] font-mono text-[0.6rem] uppercase tracking-[0.25em] text-paper/40">
            Lemos / {service.index}
          </div>
          <span className="absolute right-[var(--edge)] top-1/2 hidden h-24 w-px -translate-y-1/2 bg-white/15 sm:block" />
        </Container>
      </motion.div>

      <motion.div style={{ y: copyY, opacity: fade }} className="relative z-10 w-full pb-16 sm:pb-20">
        <Container>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
            <span className={`eyebrow ${accent === 'text-amber' ? '!text-amber [&>span]:bg-amber/60' : '!text-ember'}`}>
              <span className="h-px w-8 bg-current opacity-70" /> {content.heroKicker}
            </span>
          </motion.div>
          <motion.h1
            variants={lineParent}
            initial="hidden"
            animate="show"
            className="mt-6 text-display-xl font-bold uppercase leading-[0.92] text-white"
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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-paper/80"
          >
            {content.tagline}
          </motion.p>
        </Container>
      </motion.div>

      <motion.div style={{ opacity: fade }} className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex">
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.3em] text-paper/50">Scroll</span>
        <span className="h-9 w-px bg-gradient-to-b from-paper/60 to-transparent" />
      </motion.div>
    </section>
  )
}

/* 2 — Introduction */
function ServiceIntro({ service, content, idx }) {
  const flip = idx % 2 === 1
  return (
    <section className="bg-paper py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className={`lg:col-span-6 ${flip ? 'lg:order-2' : ''}`}>
            <Reveal>
              <TechnicalLabel code="INTRO">Overview</TechnicalLabel>
            </Reveal>
            <Reveal>
              <p className="mt-7 text-display-sm font-semibold leading-[1.2] text-ink">
                {content.intro.lead}
              </p>
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
            <Reveal>
              <div className="relative">
                <ParallaxImage
                  src={img(serviceSecondary[service.slug], 1400)}
                  alt={`${service.title} — Lemos International`}
                  ratio="4/5"
                  speed={60}
                  className="w-full"
                />
                <div className={`absolute -bottom-4 ${flip ? '-right-4' : '-left-4'} hidden bg-ember px-5 py-4 lg:block`}>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white">
                    {service.index} — {service.title}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* 3 — Capabilities */
function ServiceCapabilities({ content }) {
  return (
    <section className="bg-paper-warm py-24 lg:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Capabilities</Eyebrow>
            </Reveal>
            <Reveal>
              <h2 className="mt-6 text-display-sm font-bold uppercase leading-[1.0] text-ink">
                What this service delivers.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {content.capabilities.map((c, i) => (
                <Reveal key={c.title} delay={(i % 2) * 0.05}>
                  <div className="group h-full bg-paper p-8 transition-colors duration-400 hover:bg-paper-pure">
                    <span className="font-mono text-xs text-ember">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="mt-4 text-xl font-semibold text-ink">{c.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-ink-mute">{c.description}</p>
                    <span className="mt-5 block h-px w-8 bg-ember transition-all duration-400 ease-editorial group-hover:w-16" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* 4 — Technical applications */
function ServiceApplications({ service, content, accent, accentBg }) {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-24 text-paper lg:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow className={`${accent === 'text-amber' ? '!text-amber [&>span]:bg-amber/60' : '!text-ember [&>span]:bg-ember/60'}`}>
                Technical applications
              </Eyebrow>
            </Reveal>
            <Reveal>
              <h2 className="mt-6 text-display-md font-bold uppercase leading-[0.98] text-white">
                Where it&apos;s applied.
              </h2>
            </Reveal>
          </div>
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-paper/45">
              {service.index} / 08
            </span>
          </Reveal>
        </div>

        <ul className="mt-14 border-t border-white/12">
          {content.applications.map((a, i) => (
            <Reveal key={a}>
              <li className="group flex items-center gap-6 border-b border-white/12 py-6">
                <span className={`font-mono text-sm ${accent}`}>{String(i + 1).padStart(2, '0')}</span>
                <span className="flex-1 text-xl font-medium text-paper/85 transition-all duration-400 ease-editorial group-hover:translate-x-1 group-hover:text-white md:text-2xl">
                  {a}
                </span>
                <span className={`h-px w-0 ${accentBg} transition-all duration-500 ease-editorial group-hover:w-16`} />
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}

/* 5 — Equipment / systems */
function ServiceEquipment({ content }) {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Equipment &amp; systems</Eyebrow>
            </Reveal>
            <Reveal>
              <h2 className="mt-6 text-display-sm font-bold uppercase leading-[1.0] text-ink">
                What we work with.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8 lg:self-center">
            <div className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3">
              {content.equipment.map((e, i) => (
                <Reveal key={e} delay={(i % 3) * 0.04}>
                  <div className="group flex aspect-[5/3] flex-col justify-between bg-paper p-5 transition-colors duration-400 hover:bg-navy-900">
                    <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-ember transition-colors group-hover:text-amber">
                      EQ·{String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-base font-semibold leading-tight text-ink transition-colors duration-400 group-hover:text-white">
                      {e}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* 6 — Process */
function ServiceProcess({ content, accent }) {
  return (
    <section className="bg-ink py-24 text-paper lg:py-32">
      <Container>
        <Reveal>
          <Eyebrow className={`${accent === 'text-amber' ? '!text-amber [&>span]:bg-amber/60' : '!text-ember [&>span]:bg-ember/60'}`}>
            How we deliver
          </Eyebrow>
        </Reveal>
        <Reveal>
          <h2 className="mt-6 text-display-md font-bold uppercase leading-[0.98] text-white">
            The process
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px border border-white/12 bg-white/12 md:grid-cols-2 lg:grid-cols-4">
          {content.process.map((step, i) => (
            <Reveal key={step.index} delay={(i % 4) * 0.06}>
              <div className="group relative h-full bg-ink p-8">
                <span className="index-num block font-display text-5xl font-bold leading-none">{step.index}</span>
                <h3 className="mt-5 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/65">{step.description}</p>
                <span className={`mt-6 block h-px w-8 ${accent === 'text-amber' ? 'bg-amber' : 'bg-ember'} transition-all duration-500 ease-editorial group-hover:w-16`} />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* 7 — Industries / applications */
function ServiceIndustries({ content }) {
  return (
    <section className="bg-paper-warm py-24 lg:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Industries served</Eyebrow>
            </Reveal>
            <Reveal>
              <h2 className="mt-6 text-display-sm font-bold uppercase leading-[1.0] text-ink">
                Where it&apos;s used.
              </h2>
            </Reveal>
            <Reveal>
              <Link
                to="/industries"
                className="group mt-8 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:text-ember"
              >
                <span className="h-px w-8 bg-ember transition-all duration-400 ease-editorial group-hover:w-12" />
                All industries
                <span className="transition-transform duration-400 ease-editorial group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {content.industries.map((sl, i) => (
                <Reveal key={sl} delay={(i % 2) * 0.05}>
                  <Link
                    to="/industries"
                    className="group flex items-center gap-5 border border-line bg-paper p-6 transition-colors duration-400 hover:border-ink"
                  >
                    <span className="text-ember">
                      <ServiceIcon name={industries.find((x) => x.slug === sl)?.icon} className="h-8 w-8" />
                    </span>
                    <span className="flex-1 text-lg font-semibold text-ink">{industryTitle(sl)}</span>
                    <span className="text-ink-faint transition-all duration-400 ease-editorial group-hover:translate-x-1 group-hover:text-ember">→</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* 8 — Technical visual */
function ServiceVisual({ service, content }) {
  return (
    <section className="bg-navy-950 py-24 text-paper lg:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow className={`${content.accent === 'amber' ? '!text-amber [&>span]:bg-amber/60' : '!text-ember [&>span]:bg-ember/60'}`}>
                Technical view
              </Eyebrow>
            </Reveal>
            <Reveal>
              <h2 className="mt-6 text-display-md font-bold uppercase leading-[0.98] text-white">
                Engineered
                <br />
                in detail.
              </h2>
            </Reveal>
            <Reveal>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-paper/75">
                A schematic view of the {service.title.toLowerCase()} scope — the systems,
                connections, and sequence behind the work.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <div className="text-paper">
                <TechnicalVisual
                  type={content.visual}
                  use3D={service.slug === 'skid-fabrication'}
                  label={`Fig. ${service.index} — ${service.title}`}
                />
              </div>
            </Reveal>
          </div>
        </div>
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
            <Reveal>
              <h2 className="mt-6 text-display-sm font-bold uppercase leading-[1.0] text-ink">
                Good to know.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <ul className="border-t border-line">
              {content.faq.map((f, i) => {
                const isOpen = open === i
                return (
                  <li key={f.q} className="border-b border-line">
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-xs text-ember">{String(i + 1).padStart(2, '0')}</span>
                        <span className="text-lg font-semibold text-ink md:text-xl">{f.q}</span>
                      </span>
                      <span className={`shrink-0 text-2xl text-ember transition-transform duration-400 ease-editorial ${isOpen ? 'rotate-45' : ''}`} aria-hidden="true">
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
                          <p className="max-w-2xl pb-6 pl-8 text-base leading-relaxed text-ink-mute">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                )
              })}
            </ul>
          </div>
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
        <Reveal>
          <h2 className="mt-6 text-display-sm font-bold uppercase leading-[1.0] text-ink">
            Explore more capabilities.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {related.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.06}>
              <Link
                to={`/services/${s.slug}`}
                className="group flex h-full flex-col justify-between border border-line bg-paper p-7 transition-colors duration-400 hover:border-ink"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-ember">{s.index}</span>
                  <span className="text-ink-faint transition-colors group-hover:text-ember">
                    <ServiceIcon name={s.slug} className="h-7 w-7" />
                  </span>
                </div>
                <div className="mt-10">
                  <h3 className="text-xl font-semibold text-ink transition-colors group-hover:text-ember">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-mute">{s.summary}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-ink">
                  View service
                  <span className="transition-transform duration-400 ease-editorial group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
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
          src={img(media.serviceCta, 2000)}
          alt=""
          aria-hidden="true"
          onError={(e) => (e.currentTarget.style.opacity = '0')}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <span className="absolute inset-0 bg-navy-950/82" />
      <span className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/70" />

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
          <PremiumButton to="/contact" variant="ember">Request a Quote</PremiumButton>
          <PremiumButton to="/services" variant="glass" arrow={false}>
            All services
          </PremiumButton>
        </motion.div>

        <div className="mt-16 border-t border-white/12 pt-8">
          <Link to={`/services/${next.slug}`} className="group inline-flex flex-col items-center gap-2">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-paper/45">Next service</span>
            <span className="flex items-baseline gap-3 text-2xl font-semibold text-white transition-colors group-hover:text-amber md:text-3xl">
              {next.title}
              <span className="transition-transform duration-400 ease-editorial group-hover:translate-x-1">→</span>
            </span>
          </Link>
        </div>
      </Container>
    </section>
  )
}
