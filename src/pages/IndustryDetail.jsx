import { useParams, Link } from 'react-router-dom'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Reveal from '@/components/ui/Reveal'
import Button3D from '@/components/ui/Button3D'
import TiltCard from '@/components/ui/TiltCard'
import Photo from '@/components/ui/Photo'
import TechnicalLabel from '@/components/ui/TechnicalLabel'
import ServiceIcon from '@/components/icons/ServiceIcon'
import { ArrowIcon } from '@/components/layout/NavIcons'
import { industries, industryDetail, industryPageContent, getIndustry } from '@/data/industries'
import { getService } from '@/data/services'
import { processSteps } from '@/data/process'
import { pic, industryPages } from '@/data/media'
import { EASE, lineParent, lineChild, viewportOnce } from '@/lib/motion'
import NotFound from './NotFound'

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

export default function IndustryDetail() {
  const { slug } = useParams()
  const industry = getIndustry(slug)
  const detail = industryDetail[slug]
  const content = industryPageContent[slug]
  const pics = industryPages[slug]
  if (!industry || !detail || !content || !pics) return <NotFound />

  return (
    <>
      <IndustryHero key={`hero-${slug}`} industry={industry} content={content} detail={detail} pics={pics} />
      <IndustryOverview industry={industry} content={content} pics={pics} />
      <IndustryApplications detail={detail} content={content} pics={pics} />
      <IndustryDemands industry={industry} content={content} />
      <IndustryServices industry={industry} detail={detail} />
      <IndustryApproach />
      <OtherSectors current={slug} />
    </>
  )
}

/* 1 — Cinematic hero */
function IndustryHero({ industry, content, detail, pics }) {
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
          {...pic(pics.hero, 2200)}
          fetchpriority="high"
          decoding="async"
          sizes="100vw"
          alt={`${industry.title} facility`}
          onError={(e) => (e.currentTarget.style.opacity = '0')}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <span className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/30" />
      <span className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/25 to-transparent" />
      <span aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_top,black,transparent_70%)]" />

      <motion.div style={{ y: copyY }} className="relative z-10 w-full pb-14 pt-[calc(var(--nav-h)+3rem)] sm:pb-20">
        <Container>
          <motion.nav
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-paper/55"
          >
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link to="/" className="transition-colors hover:text-amber">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/industries" className="transition-colors hover:text-amber">Industries</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-paper/85" aria-current="page">{industry.title}</li>
            </ol>
          </motion.nav>

          <div className="mt-8 grid items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}>
                <span className="inline-flex items-center gap-3 rounded-full bg-white/10 py-1.5 pl-1.5 pr-4 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-paper/85 ring-1 ring-inset ring-white/20 backdrop-blur">
                  <span className="grid h-7 w-7 place-items-center rounded-full text-white" style={{ background: 'var(--brand-gradient)' }}>
                    <ServiceIcon name={industry.icon} className="h-4 w-4" />
                  </span>
                  Sector {industry.index} · {industry.title}
                </span>
              </motion.div>
              <motion.h1
                variants={lineParent}
                initial="hidden"
                animate="show"
                className="mt-7 text-display-lg font-bold uppercase leading-[0.92] text-white"
              >
                {content.heroLines.map((line, i) => (
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
                {content.tagline}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.65 }}
                className="mt-9 flex flex-wrap gap-4"
              >
                <Button3D to="/contact" size="lg">Discuss your facility</Button3D>
                <Button3D to="/industries" variant="glass" size="lg" arrow={false}>
                  All industries
                </Button3D>
              </motion.div>
            </div>

            {/* Floating glass application cards */}
            <motion.ul style={{ opacity: fade }} className="hidden gap-3 lg:col-span-4 lg:grid">
              {detail.applications.map((a, i) => (
                <motion.li
                  key={a}
                  initial={{ opacity: 0, x: 60, rotateY: -30 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.5 + i * 0.12 }}
                  style={{ transformPerspective: 1000 }}
                  className={i === 1 ? 'ml-8' : ''}
                >
                  <TiltCard max={12} cardClassName="rounded-2xl">
                    <div className="relative flex items-center gap-4 rounded-2xl p-4 [transform-style:preserve-3d]">
                      <span aria-hidden="true" className="absolute inset-0 rounded-2xl bg-white/[0.08] ring-1 ring-inset ring-white/20 backdrop-blur-md shadow-[0_30px_50px_-30px_rgba(0,0,0,0.8)]" />
                      <span className="relative font-mono text-xs text-amber [transform:translateZ(30px)]">0{i + 1}</span>
                      <span className="relative text-sm font-semibold text-white [transform:translateZ(22px)]">{a}</span>
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

/* 2 — Overview */
function IndustryOverview({ industry, content, pics }) {
  return (
    <section className="relative overflow-hidden bg-paper py-24 lg:py-32">
      <span aria-hidden="true" className="grid-lines-ink pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black_5%,transparent_55%)]" />
      <Container className="relative grid items-center gap-16 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, x: -60, rotateY: 18 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1.2, ease: EASE }}
          style={{ transformPerspective: 1400 }}
          className="relative lg:col-span-6"
        >
          <span aria-hidden="true" className="absolute -bottom-5 -left-5 h-2/3 w-2/3 rounded-[2rem] [background:var(--brand-gradient)] opacity-90" />
          <TiltCard max={6} cardClassName="rounded-[2rem]">
            <div className="relative aspect-[4/5] [transform-style:preserve-3d] sm:aspect-[5/4] lg:aspect-[4/5]">
              <div className="absolute inset-0 overflow-hidden rounded-[2rem] bg-navy-900 shadow-[0_50px_90px_-40px_rgba(8,15,46,0.7)]">
                <Photo id={pics.overview} w={1400} alt={`${industry.title} site`} className="transition-transform duration-[1.4s] ease-editorial group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
              </div>
              <span className="absolute left-5 top-5 rounded-full bg-navy-950/60 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-amber ring-1 ring-inset ring-white/15 backdrop-blur [transform:translateZ(40px)]">
                Sector {industry.index}
              </span>
              <div className="absolute -right-3 bottom-6 flex items-center gap-3 rounded-2xl bg-white p-4 pr-6 shadow-[0_30px_60px_-24px_rgba(8,15,46,0.55)] [transform:translateZ(60px)] sm:-right-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl text-white" style={{ background: 'var(--brand-gradient)' }}>
                  <ServiceIcon name={industry.icon} className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-mono text-[0.58rem] uppercase tracking-[0.2em] text-ink-faint">Sector</span>
                  <span className="block text-sm font-bold text-ink">{industry.title}</span>
                </span>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        <div className="lg:col-span-6 lg:pl-6">
          <Reveal>
            <TechnicalLabel code="01">Overview</TechnicalLabel>
          </Reveal>
          <Heading lines={['Built for', `${industry.title}.`]} className="text-display-md" />
          <Reveal>
            <p className="mt-8 text-xl font-medium leading-relaxed text-ink">{content.intro.lead}</p>
          </Reveal>
          {content.intro.body.map((p, i) => (
            <Reveal key={i} delay={0.08 * (i + 1)}>
              <p className="mt-5 text-lg leading-relaxed text-ink-mute">{p}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* 3 — Applications with photos */
function IndustryApplications({ detail, content, pics }) {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 text-paper lg:py-32">
      <span aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
      <span aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-ember/20 blur-[120px]" />
      <Container className="relative">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow className={darkEyebrow}>Applications</Eyebrow>
          </Reveal>
          <Heading lines={['Where our', 'work applies.']} dark className="text-display-md" />
        </div>

        <ul className="mt-16 grid gap-6 md:grid-cols-3 lg:gap-8">
          {detail.applications.map((a, i) => (
            <motion.li
              key={a}
              initial={{ opacity: 0, y: 70, rotateX: -22 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1.1, ease: EASE, delay: i * 0.12 }}
              style={{ transformPerspective: 1400 }}
              className={i === 1 ? 'md:mt-12' : ''}
            >
              <TiltCard max={8} className="h-full" cardClassName="rounded-[1.75rem]">
                <article className="relative flex h-full min-h-[26rem] flex-col justify-end rounded-[1.75rem] p-6 [transform-style:preserve-3d] sm:p-7">
                  <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[1.75rem] bg-navy-900 shadow-[0_40px_70px_-38px_rgba(0,0,0,0.9)] ring-1 ring-inset ring-white/10">
                    <Photo id={pics.apps[i]} w={1000} className="transition-transform duration-[1.4s] ease-editorial group-hover:scale-110" />
                    <span className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-navy-950/5" />
                    <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-700 ease-editorial [background:var(--brand-gradient)] group-hover:scale-x-100" />
                  </div>
                  <span className="absolute left-6 top-6 font-display text-6xl font-bold leading-none text-white/15 [transform:translateZ(20px)]">
                    0{i + 1}
                  </span>
                  <div className="relative [transform:translateZ(45px)]">
                    <h3 className="text-2xl font-bold uppercase leading-tight text-white [text-shadow:0_2px_16px_rgba(3,7,25,0.6)]">{a}</h3>
                    <p className="mt-3 leading-relaxed text-paper/75">{content.appDetails[i]}</p>
                  </div>
                </article>
              </TiltCard>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

/* 4 — Sector demands */
function IndustryDemands({ industry, content }) {
  return (
    <section className="relative overflow-hidden bg-paper-warm py-24 lg:py-32">
      <Container className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
            <Reveal>
              <TechnicalLabel code="02">Sector demands</TechnicalLabel>
            </Reveal>
            <Heading lines={['What the', 'sector asks of us.']} className="text-display-sm" />
            <Reveal>
              <p className="mt-6 text-lg leading-relaxed text-ink-mute">
                The operating conditions that shape how we plan and execute mechanical work for {industry.title.toLowerCase()}.
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
          {content.demands.map((d, i) => (
            <motion.li
              key={d.title}
              initial={{ opacity: 0, y: 60, rotateX: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 1, ease: EASE, delay: (i % 2) * 0.12 }}
              style={{ transformPerspective: 1200 }}
              className={i % 2 ? 'sm:mt-10' : ''}
            >
              <TiltCard max={10} className="h-full" cardClassName="rounded-[1.5rem]">
                <article className="relative h-full rounded-[1.5rem] p-7 [transform-style:preserve-3d] sm:p-8">
                  <span aria-hidden="true" className="absolute inset-0 rounded-[1.5rem] bg-paper-pure shadow-[0_30px_60px_-34px_rgba(8,15,46,0.4)] ring-1 ring-inset ring-navy-900/[0.06] transition-shadow duration-500 group-hover:shadow-[0_40px_80px_-30px_rgba(242,101,34,0.35)]" />
                  <span aria-hidden="true" className="absolute inset-x-7 top-0 h-[3px] origin-left scale-x-0 rounded-b-full transition-transform duration-700 ease-editorial [background:var(--brand-gradient)] group-hover:scale-x-100" />
                  <div className="relative flex items-center justify-between [transform:translateZ(35px)]">
                    <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-950 font-mono text-sm text-amber shadow-[0_6px_0_#030719,0_14px_24px_-10px_rgba(3,7,25,0.6)] transition-colors duration-500 group-hover:text-white group-hover:[background:var(--brand-gradient)]">
                      0{i + 1}
                    </span>
                    <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-ink-faint">Demand</span>
                  </div>
                  <h3 className="relative mt-7 text-xl font-bold text-ink [transform:translateZ(25px)]">{d.title}</h3>
                  <p className="relative mt-3 leading-relaxed text-ink-mute [transform:translateZ(15px)]">{d.description}</p>
                </article>
              </TiltCard>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

/* 5 — Relevant services */
function IndustryServices({ industry, detail }) {
  return (
    <section className="relative overflow-hidden bg-paper py-24 lg:py-32">
      <span aria-hidden="true" className="grid-lines-ink pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_bottom_right,black_5%,transparent_55%)]" />
      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-2xl">
            <Reveal>
              <TechnicalLabel code="03">Relevant services</TechnicalLabel>
            </Reveal>
            <Heading lines={['Core disciplines', `for ${industry.title}.`]} className="text-display-sm" />
          </div>
          <Reveal>
            <Button3D to="/services" variant="outline" arrow={false}>All services</Button3D>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {detail.services.map((sl, i) => {
            const s = getService(sl)
            if (!s) return null
            return (
              <motion.li
                key={sl}
                initial={{ opacity: 0, y: 60, rotateY: -16 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 1, ease: EASE, delay: i * 0.1 }}
                style={{ transformPerspective: 1200 }}
              >
                <TiltCard as={Link} to={`/services/${sl}`} max={10} className="h-full" cardClassName="rounded-[1.5rem]" aria-label={s.title}>
                  <article className="relative flex h-full flex-col rounded-[1.5rem] p-7 [transform-style:preserve-3d]">
                    <span aria-hidden="true" className="absolute inset-0 rounded-[1.5rem] bg-navy-950 shadow-[0_40px_70px_-36px_rgba(8,15,46,0.8)] ring-1 ring-inset ring-white/10" />
                    <span aria-hidden="true" className="absolute inset-0 rounded-[1.5rem] opacity-0 transition-opacity duration-700 [background:var(--brand-gradient)] group-hover:opacity-100" />
                    <div className="relative flex items-start justify-between [transform:translateZ(40px)]">
                      <span className="grid h-14 w-14 place-items-center rounded-2xl text-white shadow-[0_14px_30px_-10px_rgba(242,101,34,0.85)] transition-colors duration-500 group-hover:bg-white/20" style={{ background: 'var(--brand-gradient)' }}>
                        <ServiceIcon name={sl} className="h-7 w-7" />
                      </span>
                      <span className="font-mono text-xs text-paper/40 group-hover:text-white/70">{s.index}</span>
                    </div>
                    <h3 className="relative mt-8 text-xl font-bold text-white [transform:translateZ(30px)]">{s.title}</h3>
                    <p className="relative mt-3 flex-1 text-[0.95rem] leading-relaxed text-paper/65 group-hover:text-white/85 [transform:translateZ(18px)]">
                      {s.summary}
                    </p>
                    <span className="relative mt-7 inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-amber group-hover:text-white">
                      Explore service
                      <ArrowIcon className="h-3 w-3 transition-transform duration-500 group-hover:-rotate-45" />
                    </span>
                  </article>
                </TiltCard>
              </motion.li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}

/* 6 — Delivery approach */
function IndustryApproach() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const rail = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy-950 py-24 text-paper lg:py-32">
      <span aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 opacity-30" />
      <span aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-ember/15 blur-[120px]" />
      <Container className="relative">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow className={darkEyebrow}>Our approach</Eyebrow>
          </Reveal>
          <Heading lines={['One team,', 'start to finish.']} dark className="text-display-md" />
        </div>

        <div className="relative mt-16">
          <span aria-hidden="true" className="absolute left-6 top-0 h-full w-px bg-white/10 lg:left-0 lg:top-6 lg:h-px lg:w-full" />
          <motion.span
            aria-hidden="true"
            style={{ scaleY: rail }}
            className="absolute left-6 top-0 h-full w-[2px] origin-top [background:var(--brand-gradient)] lg:hidden"
          />
          <motion.span
            aria-hidden="true"
            style={{ scaleX: rail }}
            className="absolute left-0 top-6 hidden h-[2px] w-full origin-left [background:var(--brand-gradient)] lg:block"
          />

          <ol className="relative grid gap-8 lg:grid-cols-6 lg:gap-5">
            {processSteps.map((step, i) => (
              <motion.li
                key={step.key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
                className="flex gap-6 lg:block"
              >
                <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full font-mono text-sm text-white shadow-[0_0_0_6px_#030719,0_12px_26px_-8px_rgba(242,101,34,0.8)]" style={{ background: 'var(--brand-gradient)' }}>
                  {step.index}
                </span>
                <TiltCard max={10} className="flex-1 lg:mt-7" cardClassName="rounded-2xl">
                  <div className="relative rounded-2xl p-5 [transform-style:preserve-3d]">
                    <span aria-hidden="true" className="absolute inset-0 rounded-2xl bg-white/[0.05] ring-1 ring-inset ring-white/10 backdrop-blur transition-colors duration-500 group-hover:bg-white/[0.09]" />
                    <h3 className="relative font-semibold text-white [transform:translateZ(25px)]">{step.title}</h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-paper/65 [transform:translateZ(12px)]">{step.description}</p>
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

/* 7 — Other sectors */
function OtherSectors({ current }) {
  const others = industries.filter((i) => i.slug !== current)
  return (
    <section className="relative bg-paper py-24 lg:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal>
              <TechnicalLabel code="04">Other sectors</TechnicalLabel>
            </Reveal>
            <Heading lines={['Explore', 'more sectors.']} className="text-display-sm" />
          </div>
          <Reveal>
            <Button3D to="/industries" variant="dark" arrow={false}>All industries</Button3D>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((ind, i) => (
            <motion.li
              key={ind.slug}
              initial={{ opacity: 0, y: 50, rotateX: -18 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
              style={{ transformPerspective: 1200 }}
            >
              <TiltCard as={Link} to={`/industries/${ind.slug}`} max={12} className="h-full" cardClassName="rounded-[1.5rem]" aria-label={ind.title}>
                <article className="relative flex h-full flex-col rounded-[1.5rem] p-6 [transform-style:preserve-3d]">
                  <span aria-hidden="true" className="absolute inset-0 rounded-[1.5rem] bg-paper-pure shadow-[0_30px_60px_-34px_rgba(8,15,46,0.4)] ring-1 ring-inset ring-navy-900/[0.06]" />
                  <span aria-hidden="true" className="absolute inset-0 rounded-[1.5rem] bg-navy-950 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex items-center justify-between [transform:translateZ(35px)]">
                    <span className="grid h-12 w-12 place-items-center rounded-xl text-white shadow-[0_10px_24px_-8px_rgba(242,101,34,0.8)]" style={{ background: 'var(--brand-gradient)' }}>
                      <ServiceIcon name={ind.icon} className="h-6 w-6" />
                    </span>
                    <span className="font-mono text-xs text-ink-faint group-hover:text-amber">{ind.index}</span>
                  </div>
                  <h3 className="relative mt-8 text-lg font-bold text-ink transition-colors duration-500 group-hover:text-white [transform:translateZ(25px)]">{ind.title}</h3>
                  <p className="relative mt-2 flex-1 text-sm leading-relaxed text-ink-mute transition-colors duration-500 group-hover:text-paper/70">{ind.description}</p>
                  <ArrowIcon className="relative mt-6 h-3.5 w-3.5 text-ember transition-all duration-500 group-hover:-rotate-45 group-hover:text-amber" />
                </article>
              </TiltCard>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
