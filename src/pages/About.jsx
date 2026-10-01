import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Reveal from '@/components/ui/Reveal'
import Button3D from '@/components/ui/Button3D'
import TiltCard from '@/components/ui/TiltCard'
import Photo from '@/components/ui/Photo'
import TechnicalLabel from '@/components/ui/TechnicalLabel'
import AnimatedLine from '@/components/ui/AnimatedLine'
import ParallaxImage from '@/components/ui/ParallaxImage'
import ServiceIcon from '@/components/icons/ServiceIcon'
import { ArrowIcon } from '@/components/layout/NavIcons'
import { services } from '@/data/services'
import { processSteps } from '@/data/process'
import { qualityPillars } from '@/data/capabilities'
import { industries } from '@/data/industries'
import { aboutImages, aboutPage, aboutSectorImages, img, media, valueImages } from '@/data/media'
import { EASE, lineParent, lineChild, viewportOnce } from '@/lib/motion'

const chapters = [
  {
    index: '01',
    tag: 'Fabrication',
    title: 'Built in the shop',
    body: 'Every project begins with fabrication discipline — spools, structures, vessels, and skid packages built under controlled conditions and quality control, before anything reaches the field.',
    image: aboutImages.pipe,
  },
  {
    index: '02',
    tag: 'Execution',
    title: 'Proven in the field',
    body: 'Installation, rigging, and mechanical works are executed on live and greenfield sites under strict safety and permit discipline — coordinated so interfaces never fall between contractors.',
    image: aboutImages.contracting,
  },
  {
    index: '03',
    tag: 'Lifecycle',
    title: 'Sustained over the life',
    body: 'From commissioning through turnarounds and ongoing maintenance, we stay with the asset — keeping the mechanical systems that facilities depend on reliable and available.',
    image: aboutImages.turnarounds,
  },
]

const values = [
  { index: '01', title: 'Accountability', description: 'One team owning the mechanical scope end to end — no gaps, no handoffs lost between contractors.' },
  { index: '02', title: 'Precision', description: 'Dimensional accuracy and engineering discipline carried into every weld and every fit-up.' },
  { index: '03', title: 'Safety', description: 'A safety-first culture on every site and in every fabrication shop, without exception.' },
  { index: '04', title: 'Partnership', description: 'Working as a long-term engineering partner, not a transactional contractor.' },
]

// Structural numbers only — counts of what the site itself defines.
const stats = [
  { n: '08', label: 'Engineering disciplines', sub: 'Across the mechanical scope', icon: 'mechanical-contracting' },
  { n: '06', label: 'Delivery phases', sub: 'Planning through maintenance', icon: 'equipment-installation' },
  { n: '05', label: 'Industry sectors', sub: 'Served across oil, gas & industry', icon: 'industrial' },
]

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

export default function About() {
  return (
    <>
      <AboutHero />
      <WhoWeAre />
      <CompanyStory />
      <EngineeringExperience />
      <CoreCapabilities />
      <SafetyQuality />
      <Values />
      <EngineeringApproach />
      <AboutIndustries />
      <AboutCta />
    </>
  )
}

/* 1 — Hero */
const heroCards = [
  { k: '08', t: 'Engineering disciplines', s: 'One mechanical contractor' },
  { k: '05', t: 'Industry sectors', s: 'Oil, gas, power & process' },
  { k: '360°', t: 'Asset lifecycle', s: 'Shop, field & maintenance' },
]

function AboutHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.16])
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  return (
    <section ref={ref} className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-navy-950 text-paper">
      <motion.div style={{ scale: imgScale, y: imgY }} className="absolute inset-0">
        <img
          src={img(media.aboutHero, 2200)}
          alt="Lemos International engineering team on site"
          onError={(e) => (e.currentTarget.style.opacity = '0')}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <span className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/30" />
      <span className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-950/20 to-transparent" />
      <span aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_top,black,transparent_70%)]" />

      <motion.div style={{ y: copyY }} className="relative z-10 w-full pb-14 pt-[calc(var(--nav-h)+4rem)] sm:pb-20">
        <Container>
          <div className="grid items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
                <span className="inline-flex items-center gap-3 rounded-full bg-white/10 py-1.5 pl-1.5 pr-4 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-paper/85 ring-1 ring-inset ring-white/20 backdrop-blur">
                  <span className="rounded-full bg-ember px-2.5 py-1 text-white">About</span>
                  Lemos International
                </span>
              </motion.div>
              <motion.h1
                variants={lineParent}
                initial="hidden"
                animate="show"
                className="mt-7 text-display-lg font-bold uppercase leading-[0.92] text-white"
              >
                {['An engineering', 'partner for the', "world's hardest", 'environments.'].map((line, i) => (
                  <span key={i} className="block overflow-hidden pb-[0.05em]">
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
                Mechanical contracting, fabrication and turnaround execution — from the fabrication shop to the live
                facility, under one accountable team.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.65 }}
                className="mt-9 flex flex-wrap gap-4"
              >
                <Button3D to="/contact" size="lg">Request a quote</Button3D>
                <Button3D to="/services" variant="glass" size="lg" arrow={false}>
                  Our services
                </Button3D>
              </motion.div>
            </div>

            {/* Floating glass stat cards */}
            <motion.ul style={{ opacity: fade }} className="grid gap-4 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1 lg:pl-6">
              {heroCards.map((c, i) => (
                <motion.li
                  key={c.t}
                  initial={{ opacity: 0, x: 60, rotateY: -30 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.5 + i * 0.12 }}
                  style={{ transformPerspective: 1000 }}
                  className={i === 1 ? 'lg:-translate-x-8' : ''}
                >
                  <TiltCard max={12} cardClassName="rounded-2xl">
                    <div className="relative flex items-center gap-5 rounded-2xl p-5 [transform-style:preserve-3d]">
                      <span aria-hidden="true" className="absolute inset-0 rounded-2xl bg-white/[0.08] ring-1 ring-inset ring-white/20 backdrop-blur-md shadow-[0_30px_50px_-30px_rgba(0,0,0,0.8)]" />
                      <span className="relative font-display text-4xl font-bold text-amber [transform:translateZ(40px)]">{c.k}</span>
                      <span className="relative [transform:translateZ(25px)]">
                        <span className="block text-sm font-semibold uppercase tracking-wide text-white">{c.t}</span>
                        <span className="mt-0.5 block text-xs text-paper/60">{c.s}</span>
                      </span>
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

/* 2 — Who we are: copy + 3D image collage */
function WhoWeAre() {
  const pillars = [
    { icon: 'structural-fabrication', t: 'Fabrication shop' },
    { icon: 'equipment-installation', t: 'Field execution' },
    { icon: 'maintenance-services', t: 'Lifecycle support' },
  ]
  return (
    <section className="relative overflow-hidden bg-paper py-24 lg:py-36">
      <span aria-hidden="true" className="grid-lines-ink pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_bottom_left,black_5%,transparent_55%)]" />
      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal>
              <TechnicalLabel code="01">Who we are</TechnicalLabel>
            </Reveal>
            <Reveal>
              <p className="mt-8 text-display-sm font-semibold leading-[1.18] text-ink">
                An international oil &amp; gas mechanical contractor —{' '}
                <span className="text-ink-faint">
                  delivering contracting, fabrication and turnaround execution from the shop to the live facility.
                </span>
              </p>
            </Reveal>
            <div className="mt-10 max-w-xl">
              <AnimatedLine />
              <Reveal>
                <p className="mt-8 text-lg leading-relaxed text-ink-mute">
                  Our work spans the full mechanical lifecycle: engineering and pipe fabrication, structural steel,
                  tanks and vessels, equipment installation, skid packages, shutdowns, and maintenance — carried out
                  with a safety-first discipline that keeps demanding facilities running.
                </p>
              </Reveal>
            </div>
            <ul className="mt-10 grid gap-3 sm:grid-cols-3">
              {pillars.map((p, i) => (
                <Reveal key={p.t} delay={i * 0.06}>
                  <li className="group flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-inset ring-line shadow-[0_4px_0_#dcd7cb] transition-all duration-500 ease-editorial hover:-translate-y-1 hover:shadow-[0_8px_0_#dcd7cb,0_24px_30px_-20px_rgba(8,15,46,0.4)]">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy-900 text-white transition-colors duration-500 group-hover:bg-ember">
                      <ServiceIcon name={p.icon} className="h-5 w-5" stroke={1.6} />
                    </span>
                    <span className="text-sm font-semibold leading-tight text-ink">{p.t}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Collage */}
          <div className="relative lg:col-span-6">
            <div className="relative mx-auto aspect-[5/6] max-w-xl sm:aspect-[6/5] lg:aspect-[5/6]">
              <motion.div
                initial={{ opacity: 0, y: 60, rotateY: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 1.2, ease: EASE }}
                style={{ transformPerspective: 1400 }}
                className="absolute right-0 top-0 h-[78%] w-[78%]"
              >
                <TiltCard max={7} className="h-full" cardClassName="rounded-[1.75rem]">
                  <div className="absolute inset-0 overflow-hidden rounded-[1.75rem] bg-navy-900 shadow-[0_50px_80px_-40px_rgba(8,15,46,0.7)]">
                    <Photo id={aboutPage.collageMain} w={1100} alt="Engineers reviewing drawings" className="transition-transform duration-[1.4s] ease-editorial group-hover:scale-105" />
                  </div>
                </TiltCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50, rotateY: 25 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
                style={{ transformPerspective: 1400 }}
                className="absolute bottom-0 left-0 h-[50%] w-[46%]"
              >
                <TiltCard max={10} className="h-full" cardClassName="rounded-[1.5rem]">
                  <div className="absolute inset-0 overflow-hidden rounded-[1.5rem] bg-navy-900 ring-[6px] ring-paper shadow-[0_40px_60px_-30px_rgba(8,15,46,0.7)]">
                    <Photo id={aboutPage.collageWorker} w={700} alt="Site technician in a hard hat" className="transition-transform duration-[1.4s] ease-editorial group-hover:scale-105" />
                  </div>
                </TiltCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
                style={{ transformPerspective: 1400 }}
                className="absolute bottom-[4%] right-[4%] h-[30%] w-[40%]"
              >
                <TiltCard max={12} className="h-full" cardClassName="rounded-[1.25rem]">
                  <div className="absolute inset-0 overflow-hidden rounded-[1.25rem] bg-navy-900 ring-[6px] ring-paper shadow-[0_30px_50px_-25px_rgba(8,15,46,0.7)]">
                    <Photo id={aboutPage.collageDrafting} w={600} alt="Engineering drawings being drafted" />
                  </div>
                </TiltCard>
              </motion.div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-[6%] top-[10%] z-10"
              >
                <div className="rounded-2xl px-5 py-4 text-white shadow-[0_6px_0_#b73a10,0_30px_40px_-18px_rgba(242,101,34,0.7)] [background:var(--brand-gradient)]">
                  <span className="block font-mono text-[0.58rem] uppercase tracking-[0.22em] text-white/80">Scope</span>
                  <span className="mt-1 block font-display text-xl font-bold uppercase leading-none">Shop → Field</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* 3 — Company story (chapters, no fabricated dates) */
function CompanyStory() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-paper lg:py-36">
      <span aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent_40%)]" />
      <Container className="relative">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <Eyebrow className={darkEyebrow}>Our story</Eyebrow>
            </Reveal>
            <Heading dark lines={['From the shop floor', 'to the live facility.']} className="max-w-3xl text-display-md" />
          </div>
          <Reveal>
            <p className="max-w-sm text-base leading-relaxed text-paper/60">
              Three chapters that define how every Lemos project is delivered.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-20 space-y-24 lg:space-y-32">
          {/* Spine */}
          <span aria-hidden="true" className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-gradient-to-b from-ember/0 via-white/15 to-ember/0 lg:block" />
          {chapters.map((c, i) => (
            <div key={c.index} className="relative grid items-center gap-10 lg:grid-cols-2 lg:gap-24">
              <span aria-hidden="true" className="absolute left-1/2 top-1/2 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember shadow-[0_0_0_6px_rgba(242,101,34,0.2),0_0_30px_rgba(242,101,34,0.7)] lg:block" />
              <motion.div
                initial={{ opacity: 0, rotateY: i % 2 ? -18 : 18, x: i % 2 ? 60 : -60 }}
                whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 1.2, ease: EASE }}
                style={{ transformPerspective: 1400 }}
                className={i % 2 === 1 ? 'lg:order-2' : ''}
              >
                <TiltCard max={6} cardClassName="rounded-[1.75rem]">
                  <div className="relative [transform-style:preserve-3d]">
                    <div className="overflow-hidden rounded-[1.75rem] ring-1 ring-white/10 shadow-[0_50px_80px_-40px_rgba(0,0,0,0.9)]">
                      <ParallaxImage src={img(c.image, 1400)} alt={c.title} ratio="16/11" speed={50} className="w-full" imgClassName="transition-transform duration-[1.4s] ease-editorial group-hover:scale-105" />
                    </div>
                    <span className="absolute -bottom-5 left-6 rounded-full bg-paper px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink shadow-[0_5px_0_#c9c3b5,0_20px_30px_-12px_rgba(0,0,0,0.6)] [transform:translateZ(50px)]">
                      Chapter {c.index} · {c.tag}
                    </span>
                  </div>
                </TiltCard>
              </motion.div>
              <div className={i % 2 === 1 ? 'lg:order-1 lg:text-right' : ''}>
                <Reveal>
                  <span className="text-outline block font-display text-[6rem] font-bold leading-none lg:text-[8rem]">{c.index}</span>
                </Reveal>
                <Reveal>
                  <h3 className="mt-4 text-3xl font-semibold text-white md:text-4xl">{c.title}</h3>
                </Reveal>
                <Reveal>
                  <p className={`mt-5 max-w-md text-lg leading-relaxed text-paper/70 ${i % 2 === 1 ? 'lg:ml-auto' : ''}`}>{c.body}</p>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* 4 — Engineering experience (verified structural numbers only) */
function EngineeringExperience() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-24 text-paper lg:py-32">
      <span aria-hidden="true" className="pointer-events-none absolute -right-40 top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full bg-ember/20 blur-[140px]" />
      <span aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 opacity-40" />
      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow className={darkEyebrow}>Engineering depth</Eyebrow>
            </Reveal>
            <Heading dark lines={['Depth across', 'every discipline.']} className="text-display-md" />
            <Reveal>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-paper/75">
                Our capability is structured, not improvised — a defined set of disciplines and delivery phases that
                carry a mechanical project from first plan to long-term support.
              </p>
            </Reveal>
          </div>
          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid gap-5 sm:grid-cols-3 lg:col-span-7 lg:self-center"
          >
            {stats.map((s, i) => (
              <motion.li
                key={s.label}
                variants={{
                  hidden: { opacity: 0, y: 50, rotateX: -40 },
                  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 1, ease: EASE, delay: i * 0.12 } },
                }}
                style={{ transformPerspective: 1000 }}
                className={i === 1 ? 'sm:mt-10' : ''}
              >
                <TiltCard max={14} cardClassName="rounded-[1.5rem]">
                  <div className="relative flex min-h-[15rem] flex-col justify-between rounded-[1.5rem] p-7 [transform-style:preserve-3d]">
                    <span aria-hidden="true" className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-navy-800 to-navy-950 ring-1 ring-inset ring-white/10 shadow-[0_6px_0_#030719,0_40px_50px_-30px_rgba(0,0,0,0.8)] transition-shadow duration-500 group-hover:shadow-[0_6px_0_#030719,0_50px_60px_-30px_rgba(242,101,34,0.45)]" />
                    <span aria-hidden="true" className="absolute inset-x-7 top-0 h-0.5 origin-left scale-x-0 rounded-full transition-transform duration-500 ease-editorial [background:var(--brand-gradient)] group-hover:scale-x-100" />
                    <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-amber ring-1 ring-inset ring-white/15 transition-colors duration-500 group-hover:bg-ember group-hover:text-white [transform:translateZ(30px)]">
                      <ServiceIcon name={s.icon} className="h-5 w-5" stroke={1.6} />
                    </span>
                    <span className="relative [transform:translateZ(50px)]">
                      <span className="block font-display text-6xl font-bold leading-none text-white">{s.n}</span>
                      <span className="mt-4 block text-base font-semibold text-white">{s.label}</span>
                      <span className="mt-1 block text-sm text-paper/55">{s.sub}</span>
                    </span>
                  </div>
                </TiltCard>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </Container>
    </section>
  )
}

/* 5 — Core capabilities */
function CoreCapabilities() {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow>Core capabilities</Eyebrow>
            </Reveal>
            <Heading lines={['Eight disciplines.', 'One team.']} className="text-display-md" />
          </div>
          <Reveal>
            <Button3D to="/services" variant="dark" size="md">All services</Button3D>
          </Reveal>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((s, i) => (
            <motion.li
              key={s.slug}
              variants={{
                hidden: { opacity: 0, y: 40, rotateY: -25 },
                show: { opacity: 1, y: 0, rotateY: 0, transition: { duration: 0.9, ease: EASE, delay: (i % 4) * 0.08 } },
              }}
              style={{ transformPerspective: 1000 }}
            >
              <TiltCard as={Link} to={`/services/${s.slug}`} max={12} className="h-full" cardClassName="rounded-[1.5rem]">
                <div className="relative flex h-full min-h-[14rem] flex-col justify-between gap-8 rounded-[1.5rem] p-6 [transform-style:preserve-3d]">
                  <span aria-hidden="true" className="absolute inset-0 rounded-[1.5rem] bg-white ring-1 ring-inset ring-line shadow-[0_5px_0_#dcd7cb,0_24px_34px_-24px_rgba(8,15,46,0.35)] transition-all duration-500 ease-editorial group-hover:bg-navy-900 group-hover:ring-navy-900 group-hover:shadow-[0_5px_0_#030719,0_34px_44px_-24px_rgba(8,15,46,0.6)]" />
                  <span aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 rounded-[1.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-60" />
                  <span className="relative flex items-start justify-between [transform:translateZ(35px)]">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-paper text-navy-900 ring-1 ring-inset ring-line transition-all duration-500 ease-editorial group-hover:bg-ember group-hover:text-white group-hover:ring-ember group-hover:shadow-[0_5px_0_#b73a10]">
                      <ServiceIcon name={s.slug} className="h-6 w-6" stroke={1.6} />
                    </span>
                    <span className="font-mono text-xs text-ember transition-colors duration-500 group-hover:text-amber">{s.index}</span>
                  </span>
                  <span className="relative [transform:translateZ(45px)]">
                    <span className="block text-lg font-semibold leading-tight text-ink transition-colors duration-500 group-hover:text-white">{s.title}</span>
                    <span className="mt-3 inline-flex items-center gap-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-faint transition-colors duration-500 group-hover:text-amber">
                      Explore
                      <ArrowIcon className="h-3 w-3 transition-transform duration-500 ease-editorial group-hover:translate-x-1" />
                    </span>
                  </span>
                </div>
              </TiltCard>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  )
}

/* 6 — Safety & quality, over a photographic backdrop */
function SafetyQuality() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 text-paper lg:py-36">
      <div aria-hidden="true" className="absolute inset-0">
        <ParallaxImage src={img(aboutPage.safety, 2000)} ratio="auto" speed={80} className="h-full w-full" />
      </div>
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/60" />
      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow className={darkEyebrow}>Safety &amp; quality</Eyebrow>
            </Reveal>
            <Heading dark lines={['Non-', 'negotiable.']} className="text-display-md" />
            <Reveal>
              <p className="mt-7 max-w-sm text-lg leading-relaxed text-paper/75">
                Safety and quality are not programs bolted on at the end — they are how the work is planned and
                executed from the first day.
              </p>
            </Reveal>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8 lg:self-center">
            {qualityPillars.map((p, i) => (
              <Reveal key={p.index} delay={i * 0.06}>
                <TiltCard max={10} className="h-full" cardClassName="rounded-[1.5rem]">
                  <div className="relative h-full rounded-[1.5rem] p-7 [transform-style:preserve-3d]">
                    <span aria-hidden="true" className="absolute inset-0 rounded-[1.5rem] bg-white/[0.06] ring-1 ring-inset ring-white/15 backdrop-blur-md transition-colors duration-500 group-hover:bg-white/[0.1]" />
                    <span aria-hidden="true" className="absolute inset-y-7 left-0 w-1 rounded-full bg-amber/80 transition-colors duration-500 group-hover:bg-ember" />
                    <div className="relative flex items-baseline gap-4 [transform:translateZ(35px)]">
                      <span className="font-mono text-xs text-amber">{p.index}</span>
                      <h3 className="text-2xl font-semibold text-white">{p.title}</h3>
                    </div>
                    <p className="relative mt-3 text-base leading-relaxed text-paper/70 [transform:translateZ(20px)]">{p.description}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

/* 7 — Values: 3D flip cards (hover on desktop, tap on touch) */
function ValueCard({ v }) {
  const [flipped, setFlipped] = useState(false)
  const lastPointer = useRef('')

  return (
    <button
      type="button"
      aria-pressed={flipped}
      aria-label={`${v.title}: ${v.description}`}
      onPointerDown={(e) => (lastPointer.current = e.pointerType)}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setFlipped(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setFlipped(false)}
      onClick={() => {
        if (lastPointer.current !== 'mouse') setFlipped((f) => !f)
        lastPointer.current = ''
      }}
      className="block w-full text-left [perspective:1600px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-4 focus-visible:ring-offset-paper-warm rounded-[1.5rem]"
    >
      <div
        className="preserve-3d relative aspect-[3/4] transition-transform duration-[900ms] ease-editorial"
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Front */}
        <div className="backface-hidden absolute inset-0 overflow-hidden rounded-[1.5rem] bg-navy-900 shadow-[0_40px_60px_-35px_rgba(8,15,46,0.7)]">
          <Photo id={valueImages[v.title]} w={700} />
          <span className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/30 to-navy-950/10" />
          <span className="absolute left-5 top-5 rounded-full bg-navy-950/50 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-amber ring-1 ring-inset ring-white/15">
            Value {v.index}
          </span>
          <span className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
            <span className="font-display text-2xl font-bold uppercase leading-none text-white">{v.title}</span>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 text-white ring-1 ring-inset ring-white/25">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
                <path d="M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4" />
              </svg>
            </span>
          </span>
        </div>
        {/* Back */}
        <div className="backface-hidden absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[1.5rem] p-7 text-white shadow-[0_40px_60px_-35px_rgba(242,101,34,0.6)] [background:var(--brand-gradient)] [transform:rotateY(180deg)]">
          <span className="grid-lines absolute inset-0 opacity-30" />
          <span className="relative font-display text-6xl font-bold leading-none text-white/25">{v.index}</span>
          <span className="relative">
            <span className="block font-display text-2xl font-bold uppercase leading-none">{v.title}</span>
            <span className="mt-4 block text-base leading-relaxed text-white/90">{v.description}</span>
          </span>
        </div>
      </div>
    </button>
  )
}

function Values() {
  return (
    <section className="bg-paper-warm py-24 lg:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <Eyebrow>What we value</Eyebrow>
            </Reveal>
            <Heading lines={['The principles', 'behind the work.']} className="max-w-2xl text-display-md" />
          </div>
          <Reveal>
            <p className="max-w-xs font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink-faint">
              Hover or tap a card to turn it over
            </p>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.index} delay={(i % 4) * 0.06}>
              <ValueCard v={v} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* 8 — Engineering approach: animated timeline */
function EngineeringApproach() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-paper lg:py-32">
      <span aria-hidden="true" className="pointer-events-none absolute -left-40 top-0 h-[30rem] w-[30rem] rounded-full bg-navy-700/40 blur-[120px]" />
      <Container className="relative">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow className={darkEyebrow}>How we work</Eyebrow>
          </Reveal>
          <Heading dark lines={['The engineering', 'approach.']} className="text-display-md" />
        </div>

        <div className="relative mt-16 lg:mt-20">
          {/* Track: vertical on mobile, horizontal on desktop */}
          <motion.span
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.6, ease: EASE }}
            className="absolute bottom-6 left-[1.4rem] top-6 w-0.5 origin-top rounded-full [background:var(--brand-gradient)] lg:hidden"
          />
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.6, ease: EASE }}
            className="absolute left-0 right-0 top-[1.4rem] hidden h-0.5 origin-left rounded-full [background:var(--brand-gradient)] lg:block"
          />
          <ol className="grid gap-10 lg:grid-cols-6 lg:gap-5">
            {processSteps.map((step, i) => (
              <motion.li
                key={step.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.8, ease: EASE, delay: 0.2 + i * 0.12 }}
                className="group relative grid grid-cols-[auto_1fr] gap-5 lg:block"
              >
                <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full bg-navy-900 font-mono text-xs text-amber ring-2 ring-ember/70 shadow-[0_0_0_6px_#10131a] transition-all duration-500 ease-editorial group-hover:scale-110 group-hover:bg-ember group-hover:text-white">
                  {step.index}
                </span>
                <div className="lg:mt-7">
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper/60">{step.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}

/* 9 — Industries: photo tiles */
function AboutIndustries() {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow>Industries</Eyebrow>
            </Reveal>
            <Heading lines={['Sectors', 'we serve.']} className="text-display-md" />
          </div>
          <Reveal>
            <Button3D to="/industries" variant="outline" size="md">Explore industries</Button3D>
          </Reveal>
        </div>
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
        >
          {industries.map((ind, i) => (
            <motion.li
              key={ind.slug}
              variants={{
                hidden: { opacity: 0, y: 50, rotateY: 30 },
                show: { opacity: 1, y: 0, rotateY: 0, transition: { duration: 1, ease: EASE, delay: i * 0.08 } },
              }}
              style={{ transformPerspective: 1200 }}
              className={i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}
            >
              <TiltCard as={Link} to={`/industries/${ind.slug}`} max={10} cardClassName="rounded-[1.5rem]" aria-label={ind.title}>
                <div className="relative flex aspect-[4/5] flex-col justify-between rounded-[1.5rem] p-5 [transform-style:preserve-3d] max-lg:sm:aspect-[16/10] lg:aspect-[3/5]">
                  <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[1.5rem] bg-navy-900 shadow-[0_40px_60px_-35px_rgba(8,15,46,0.7)]">
                    <Photo id={aboutSectorImages[ind.slug]} w={800} className="transition-transform duration-[1.4s] ease-editorial group-hover:scale-110" />
                    <span className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/40 to-navy-950/5" />
                    <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-700 ease-editorial [background:var(--brand-gradient)] group-hover:scale-x-100" />
                  </div>
                  <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-white/90 text-navy-950 shadow-[0_4px_0_rgba(255,255,255,0.35)] transition-colors duration-500 group-hover:bg-ember group-hover:text-white [transform:translateZ(40px)]">
                    <ServiceIcon name={ind.icon} className="h-5 w-5" stroke={1.6} />
                  </span>
                  <span className="relative [transform:translateZ(45px)]">
                    <span className="block font-mono text-[0.58rem] uppercase tracking-[0.2em] text-amber">Sector {ind.index}</span>
                    <span className="mt-2 block text-xl font-bold uppercase leading-tight text-white">{ind.title}</span>
                    <span className="mt-2 block text-sm leading-snug text-paper/70 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-all lg:duration-500 lg:group-hover:max-h-32 lg:group-hover:opacity-100">
                      {ind.description}
                    </span>
                  </span>
                </div>
              </TiltCard>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  )
}

/* 10 — Final CTA */
function AboutCta() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-28 text-paper lg:py-40">
      <div aria-hidden="true" className="absolute inset-0">
        <ParallaxImage src={img(aboutPage.cta, 2000)} ratio="auto" speed={90} className="h-full w-full" />
      </div>
      <span aria-hidden="true" className="absolute inset-0 bg-navy-950/75" />
      <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(3,7,25,0.85)_75%)]" />
      <Container className="relative text-center">
        <Reveal>
          <span className="eyebrow !text-amber justify-center [&>span]:bg-amber/60">
            <span className="h-px w-8" /> Work with us
          </span>
        </Reveal>
        <motion.h2
          variants={lineParent}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-7 max-w-4xl text-display-lg font-bold uppercase leading-[0.95] text-white"
        >
          {["Let's build", "what's next."].map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.04em]">
              <motion.span variants={lineChild} className={`block ${i === 1 ? 'text-ember-gradient' : ''}`}>
                {l}
              </motion.span>
            </span>
          ))}
        </motion.h2>
        <Reveal>
          <p className="mx-auto mt-7 max-w-lg text-lg leading-relaxed text-paper/75">
            Tell us about your scope — fabrication, installation, turnaround or maintenance — and our team will come
            back with a clear plan.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-11 flex flex-wrap justify-center gap-4">
            <Button3D to="/contact" size="lg">Request a quote</Button3D>
            <Button3D to="/services" variant="glass" size="lg" arrow={false}>
              Our services
            </Button3D>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
