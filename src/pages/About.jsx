import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Reveal from '@/components/ui/Reveal'
import PremiumButton from '@/components/ui/PremiumButton'
import TechnicalLabel from '@/components/ui/TechnicalLabel'
import AnimatedLine from '@/components/ui/AnimatedLine'
import ParallaxImage from '@/components/ui/ParallaxImage'
import ServiceIcon from '@/components/icons/ServiceIcon'
import { services } from '@/data/services'
import { processSteps } from '@/data/process'
import { qualityPillars } from '@/data/capabilities'
import { industries } from '@/data/industries'
import { img, media, serviceHeroes } from '@/data/media'
import { EASE, lineParent, lineChild, viewportOnce } from '@/lib/motion'

const chapters = [
  {
    index: '01',
    title: 'Built in the shop',
    body: 'Every project begins with fabrication discipline — spools, structures, vessels, and skid packages built under controlled conditions and quality control, before anything reaches the field.',
    image: serviceHeroes['pipe-fabrication-installation'],
  },
  {
    index: '02',
    title: 'Proven in the field',
    body: 'Installation, rigging, and mechanical works are executed on live and greenfield sites under strict safety and permit discipline — coordinated so interfaces never fall between contractors.',
    image: serviceHeroes['mechanical-contracting'],
  },
  {
    index: '03',
    title: 'Sustained over the life',
    body: 'From commissioning through turnarounds and ongoing maintenance, we stay with the asset — keeping the mechanical systems that facilities depend on reliable and available.',
    image: serviceHeroes['shutdowns-turnarounds'],
  },
]

const values = [
  { index: '01', title: 'Accountability', description: 'One team owning the mechanical scope end to end — no gaps, no handoffs lost between contractors.' },
  { index: '02', title: 'Precision', description: 'Dimensional accuracy and engineering discipline carried into every weld and every fit-up.' },
  { index: '03', title: 'Safety', description: 'A safety-first culture on every site and in every fabrication shop, without exception.' },
  { index: '04', title: 'Partnership', description: 'Working as a long-term engineering partner, not a transactional contractor.' },
]

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
function AboutHero() {
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
          src={img(media.about, 2200)}
          alt="Lemos International engineering team on site"
          onError={(e) => (e.currentTarget.style.opacity = '0')}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <span className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/45 to-navy-950/25" />
      <span className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-transparent to-transparent" />

      <motion.div style={{ opacity: fade }} className="pointer-events-none absolute inset-0">
        <Container className="relative h-full">
          <div className="absolute left-[var(--edge)] top-[calc(var(--nav-h)+1.5rem)] font-mono text-[0.6rem] uppercase tracking-[0.25em] text-paper/40">
            Lemos / Company
          </div>
        </Container>
      </motion.div>

      <motion.div style={{ y: copyY, opacity: fade }} className="relative z-10 w-full pb-16 sm:pb-20">
        <Container>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
            <span className="eyebrow !text-amber [&>span]:bg-amber/60">
              <span className="h-px w-8" /> Who we are
            </span>
          </motion.div>
          <motion.h1 variants={lineParent} initial="hidden" animate="show" className="mt-6 text-display-xl font-bold uppercase leading-[0.92] text-white">
            {['An engineering', 'partner for the', "world's hardest", 'environments.'].map((line, i) => (
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

/* 2 — Who we are */
function WhoWeAre() {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Reveal>
              <TechnicalLabel code="01">Who we are</TechnicalLabel>
            </Reveal>
          </div>
          <div className="lg:col-span-9">
            <Reveal>
              <p className="text-display-sm font-semibold leading-[1.18] text-ink">
                Lemos International is an international oil &amp; gas mechanical contractor —{' '}
                <span className="text-ink-faint">
                  delivering mechanical contracting, fabrication, and turnaround execution from the
                  fabrication shop to the live facility.
                </span>
              </p>
            </Reveal>
            <div className="mt-10 max-w-2xl">
              <AnimatedLine />
              <Reveal>
                <p className="mt-8 text-lg leading-relaxed text-ink-mute">
                  Our work spans the full mechanical lifecycle: engineering and pipe fabrication,
                  structural steel, tanks and vessels, equipment installation, skid packages,
                  shutdowns, and maintenance — carried out with a safety-first discipline that keeps
                  demanding facilities running.
                </p>
              </Reveal>
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
    <section className="bg-ink py-24 text-paper lg:py-32">
      <Container>
        <Reveal>
          <Eyebrow className="!text-amber [&>span]:bg-amber/60">Our story</Eyebrow>
        </Reveal>
        <Reveal>
          <h2 className="mt-6 max-w-3xl text-display-md font-bold uppercase leading-[0.98] text-white">
            From the shop floor to the live facility.
          </h2>
        </Reveal>

        <div className="mt-16 space-y-20 lg:space-y-28">
          {chapters.map((c, i) => (
            <div key={c.index} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div className={`lg:col-span-6 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <Reveal>
                  <div className="relative overflow-hidden border border-white/10">
                    <ParallaxImage src={img(c.image, 1400)} alt={c.title} ratio="16/11" speed={50} className="w-full" />
                  </div>
                </Reveal>
              </div>
              <div className={`lg:col-span-6 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <Reveal>
                  <span className="index-num block font-display text-[6rem] font-bold leading-none lg:text-[8rem]">{c.index}</span>
                </Reveal>
                <Reveal>
                  <h3 className="mt-4 text-3xl font-semibold text-white md:text-4xl">{c.title}</h3>
                </Reveal>
                <Reveal>
                  <p className="mt-5 max-w-md text-lg leading-relaxed text-paper/70">{c.body}</p>
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
  const stats = [
    { n: '08', label: 'Engineering disciplines', sub: 'Across the mechanical scope' },
    { n: '06', label: 'Delivery phases', sub: 'Planning through maintenance' },
    { n: '05', label: 'Industry sectors', sub: 'Served across oil, gas & industry' },
  ]
  return (
    <section className="bg-navy-900 py-24 text-paper lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow className="!text-amber [&>span]:bg-amber/60">Engineering depth</Eyebrow>
            </Reveal>
            <Reveal>
              <h2 className="mt-6 text-display-md font-bold uppercase leading-[0.98] text-white">
                Depth across
                <br />
                every discipline.
              </h2>
            </Reveal>
            <Reveal>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-paper/75">
                Our capability is structured, not improvised — a defined set of disciplines and
                delivery phases that carry a mechanical project from first plan to long-term support.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7 lg:self-center">
            <div className="grid gap-px border border-white/12 bg-white/12 sm:grid-cols-3">
              {stats.map((s) => (
                <Reveal key={s.label}>
                  <div className="bg-navy-900 p-8">
                    <span className="font-display text-5xl font-bold text-amber md:text-6xl">{s.n}</span>
                    <p className="mt-4 text-base font-semibold text-white">{s.label}</p>
                    <p className="mt-1 text-sm text-paper/55">{s.sub}</p>
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

/* 5 — Core capabilities */
function CoreCapabilities() {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow>Core capabilities</Eyebrow>
            </Reveal>
            <Reveal>
              <h2 className="mt-6 text-display-md font-bold uppercase leading-[0.98] text-ink">
                Eight disciplines.
              </h2>
            </Reveal>
          </div>
          <Reveal>
            <Link to="/services" className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:text-ember">
              <span className="h-px w-8 bg-ember transition-all duration-400 ease-editorial group-hover:w-12" />
              All services
              <span className="transition-transform duration-400 ease-editorial group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 border-t border-line">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.04}>
              <Link to={`/services/${s.slug}`} className="group grid grid-cols-[auto_auto_1fr_auto] items-center gap-5 border-b border-line py-6 transition-colors hover:bg-ink/[0.02] md:gap-8">
                <span className="font-mono text-sm text-ember">{s.index}</span>
                <span className="text-ink-faint transition-colors group-hover:text-ember"><ServiceIcon name={s.slug} className="h-6 w-6" /></span>
                <span className="text-xl font-semibold text-ink transition-transform duration-400 ease-editorial group-hover:translate-x-1 md:text-2xl">{s.title}</span>
                <span className="text-ink-faint transition-all duration-400 ease-editorial group-hover:translate-x-1 group-hover:text-ember">→</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* 6 — Safety & quality */
function SafetyQuality() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 text-paper lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow className="!text-amber [&>span]:bg-amber/60">Safety &amp; quality</Eyebrow>
            </Reveal>
            <Reveal>
              <h2 className="mt-6 text-display-md font-bold uppercase leading-[0.98] text-white">
                Non-negotiable.
              </h2>
            </Reveal>
            <Reveal>
              <p className="mt-7 max-w-sm text-lg leading-relaxed text-paper/75">
                Safety and quality are not programs bolted on at the end — they are how the work is
                planned and executed from the first day.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8 lg:self-center">
            <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
              {qualityPillars.map((p, i) => (
                <Reveal key={p.index} delay={i * 0.05}>
                  <div className="border-t-2 border-amber/80 pt-5">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-amber">{p.index}</span>
                      <h3 className="text-2xl font-semibold text-white">{p.title}</h3>
                    </div>
                    <p className="mt-3 text-base leading-relaxed text-paper/70">{p.description}</p>
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

/* 7 — Values */
function Values() {
  return (
    <section className="bg-paper-warm py-24 lg:py-32">
      <Container>
        <Reveal>
          <Eyebrow>What we value</Eyebrow>
        </Reveal>
        <Reveal>
          <h2 className="mt-6 max-w-2xl text-display-md font-bold uppercase leading-[0.98] text-ink">
            The principles behind the work.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.index} delay={(i % 4) * 0.05}>
              <div className="group h-full bg-paper p-8">
                <span className="index-num block font-display text-5xl font-bold leading-none">{v.index}</span>
                <h3 className="mt-5 text-xl font-semibold text-ink">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-mute">{v.description}</p>
                <span className="mt-6 block h-px w-8 bg-ember transition-all duration-500 ease-editorial group-hover:w-16" />
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* 8 — Engineering approach (process) */
function EngineeringApproach() {
  return (
    <section className="bg-ink py-24 text-paper lg:py-32">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow className="!text-amber [&>span]:bg-amber/60">How we work</Eyebrow>
          </Reveal>
          <Reveal>
            <h2 className="mt-6 text-display-md font-bold uppercase leading-[0.98] text-white">
              The engineering approach.
            </h2>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-px border border-white/12 bg-white/12 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step, i) => (
            <Reveal key={step.key} delay={(i % 3) * 0.05}>
              <div className="group h-full bg-ink p-8">
                <span className="index-num block font-display text-5xl font-bold leading-none">{step.index}</span>
                <h3 className="mt-5 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/65">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* 9 — Industries */
function AboutIndustries() {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <Reveal>
              <Eyebrow>Industries</Eyebrow>
            </Reveal>
            <Reveal>
              <h2 className="mt-6 text-display-md font-bold uppercase leading-[0.98] text-ink">
                Sectors we serve.
              </h2>
            </Reveal>
          </div>
          <Reveal>
            <Link to="/industries" className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:text-ember">
              <span className="h-px w-8 bg-ember transition-all duration-400 ease-editorial group-hover:w-12" />
              Explore industries
              <span className="transition-transform duration-400 ease-editorial group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((ind, i) => (
            <Reveal key={ind.slug} delay={(i % 3) * 0.05}>
              <Link to="/industries" className="group flex items-start gap-5 border border-line bg-paper p-6 transition-colors duration-400 hover:border-ink">
                <span className="text-ember"><ServiceIcon name={ind.icon} className="h-8 w-8" /></span>
                <span>
                  <span className="block text-lg font-semibold text-ink">{ind.title}</span>
                  <span className="mt-1 block text-sm text-ink-mute">{ind.description}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* 10 — Final CTA */
function AboutCta() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-28 text-paper lg:py-36">
      <Container className="relative text-center">
        <Reveal>
          <span className="eyebrow !text-amber justify-center [&>span]:bg-amber/60">
            <span className="h-px w-8" /> Work with us
          </span>
        </Reveal>
        <Reveal>
          <h2 className="mx-auto mt-7 max-w-3xl text-display-lg font-bold uppercase leading-[0.95] text-white">
            Let&apos;s build <span className="text-ember-gradient">what&apos;s next.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-11 flex flex-wrap justify-center gap-4">
            <PremiumButton to="/contact" variant="ember">Request a Quote</PremiumButton>
            <PremiumButton to="/services" variant="outline" arrow={false} className="!border-white/30 !text-white hover:!border-white">
              Our services
            </PremiumButton>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
