import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Reveal from '@/components/ui/Reveal'
import Button3D from '@/components/ui/Button3D'
import TiltCard from '@/components/ui/TiltCard'
import Photo from '@/components/ui/Photo'
import ParallaxImage from '@/components/ui/ParallaxImage'
import { site } from '@/data/site'
import { services } from '@/data/services'
import { pic, contactPage, media } from '@/data/media'
import { EASE, lineParent, lineChild, viewportOnce } from '@/lib/motion'

const PROJECT_TYPES = [
  'New fabrication / build',
  'Site installation',
  'Maintenance & repair',
  'Shutdown / turnaround',
  'Inspection & assessment',
  'Consultation',
  'Other',
]

const PLACE = 'Park Avenue Building, Dubai Silicon Oasis, Dubai'
const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(PLACE)
const MAP_EMBED = 'https://www.google.com/maps?q=' + encodeURIComponent(PLACE) + '&z=15&output=embed'

const NEXT_STEPS = [
  {
    index: '01',
    title: 'Share your scope',
    body: 'Send the enquiry form or call us. Drawings, location and target timeline help us respond with the right people.',
    image: contactPage.stepBrief,
  },
  {
    index: '02',
    title: 'Technical review',
    body: 'Our engineers review the scope and, where required, arrange a clarification call or a site visit.',
    image: contactPage.stepSite,
  },
  {
    index: '03',
    title: 'Proposal & plan',
    body: 'You receive a clear proposal covering the approach, resources and schedule for your project.',
    image: contactPage.stepProposal,
  },
]

export default function Contact() {
  return (
    <>
      <ContactHero />
      <ContactMain />
      <NextSteps />
      <MapSection />
      <ContactCta />
    </>
  )
}

/* ---------------------------------------------------------------- Hero */
function ContactHero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-16%'])
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  const cards = [
    { label: 'Call us', value: site.contact.phone, href: `tel:${site.contact.phoneHref}`, icon: <PhoneIcon /> },
    { label: 'Visit the office', value: 'Dubai Silicon Oasis', href: MAPS_URL, icon: <PinIcon />, external: true },
    { label: site.hours[0].days, value: site.hours[0].time, icon: <ClockIcon /> },
  ]

  return (
    <section ref={ref} className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-navy-950 text-paper">
      <motion.div style={{ scale: imgScale }} className="absolute inset-0">
        <img
          {...pic(media.contactHero, 2200)}
          fetchpriority="high"
          decoding="async"
          sizes="100vw"
          alt="Industrial engineering facility"
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
            <div className="lg:col-span-7">
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
                <span className="inline-flex items-center gap-3 rounded-full bg-white/10 py-1.5 pl-1.5 pr-4 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-paper/85 ring-1 ring-inset ring-white/20 backdrop-blur">
                  <span className="rounded-full bg-ember px-2.5 py-1 text-white">Contact</span>
                  Dubai · United Arab Emirates
                </span>
              </motion.div>
              <motion.h1 variants={lineParent} initial="hidden" animate="show" className="mt-7 text-display-xl font-bold uppercase leading-[0.9] text-white">
                {["Let's build", "what's next."].map((line, i) => (
                  <span key={i} className="block overflow-hidden pb-[0.05em]">
                    <motion.span variants={lineChild} className={`block ${i === 1 ? 'text-ember-gradient' : ''}`}>{line}</motion.span>
                  </span>
                ))}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
                className="mt-7 max-w-xl text-lg leading-relaxed text-paper/80"
              >
                Tell us about the mechanical scope — fabrication, installation, turnaround or maintenance. Our team
                will come back with the right people and approach.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
                className="mt-9 flex flex-wrap gap-4"
              >
                <Button3D href="#enquiry" size="lg">Send an enquiry</Button3D>
                <Button3D href={`tel:${site.contact.phoneHref}`} variant="glass" size="lg" icon={<PhoneIcon />}>
                  Call now
                </Button3D>
              </motion.div>
            </div>

            <motion.ul style={{ opacity: fade }} className="grid gap-4 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1 lg:pl-10">
              {cards.map((c, i) => {
                const Comp = c.href ? 'a' : 'div'
                const linkProps = c.href
                  ? { href: c.href, ...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
                  : {}
                return (
                  <motion.li
                    key={c.label}
                    initial={{ opacity: 0, x: 60, rotateY: -30 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ duration: 1.1, ease: EASE, delay: 0.5 + i * 0.12 }}
                    style={{ transformPerspective: 1000 }}
                    className={i === 1 ? 'lg:-translate-x-8' : ''}
                  >
                    <TiltCard as={Comp} {...linkProps} max={12} cardClassName="rounded-2xl">
                      <div className="relative flex items-center gap-4 rounded-2xl p-5 [transform-style:preserve-3d]">
                        <span aria-hidden="true" className="absolute inset-0 rounded-2xl bg-white/[0.08] ring-1 ring-inset ring-white/20 backdrop-blur-md shadow-[0_30px_50px_-30px_rgba(0,0,0,0.8)] transition-colors duration-500 group-hover:bg-white/[0.14]" />
                        <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-ember text-white shadow-[0_4px_0_#b73a10] [transform:translateZ(40px)]">
                          {c.icon}
                        </span>
                        <span className="relative min-w-0 [transform:translateZ(25px)]">
                          <span className="block font-mono text-[0.58rem] uppercase tracking-[0.2em] text-amber">{c.label}</span>
                          <span className="mt-1 block truncate text-base font-semibold text-white">{c.value}</span>
                        </span>
                        {c.href && (
                          <span aria-hidden="true" className="relative ml-auto text-white/50 transition-all duration-500 ease-editorial group-hover:translate-x-1 group-hover:text-amber [transform:translateZ(25px)]">
                            →
                          </span>
                        )}
                      </div>
                    </TiltCard>
                  </motion.li>
                )
              })}
            </motion.ul>
          </div>
        </Container>
      </motion.div>
    </section>
  )
}

/* ------------------------------------------------------- Main / form */
function ContactMain() {
  return (
    <section id="enquiry" className="relative scroll-mt-24 overflow-hidden bg-paper py-24 lg:py-32">
      <span aria-hidden="true" className="grid-lines-ink pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black_5%,transparent_55%)]" />
      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Details */}
          <div className="lg:col-span-5">
            <Reveal><Eyebrow>Get in touch</Eyebrow></Reveal>
            <motion.h2
              variants={lineParent}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mt-6 text-display-md font-bold uppercase leading-[0.96] text-ink"
            >
              {['Reach the', 'Lemos team.'].map((l, i) => (
                <span key={l} className="block overflow-hidden pb-[0.04em]">
                  <motion.span variants={lineChild} className={`block ${i === 1 ? 'text-ember-gradient' : ''}`}>{l}</motion.span>
                </span>
              ))}
            </motion.h2>
            <Reveal delay={0.05}>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ink-mute">
                Speak with us directly or send an enquiry — we respond to every project request from our Dubai
                office.
              </p>
            </Reveal>

            <div className="mt-10 space-y-4">
              <DetailCard label="Office" icon={<PinIcon />}>
                {site.contact.addressLines.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/l mt-3 inline-flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-ember"
                >
                  Open in Google Maps
                  <span aria-hidden="true" className="transition-transform duration-400 ease-editorial group-hover/l:translate-x-1">→</span>
                </a>
              </DetailCard>

              <DetailCard label="Phone" icon={<PhoneIcon />}>
                <a href={`tel:${site.contact.phoneHref}`} className="link-underline text-lg font-semibold text-ink">
                  {site.contact.phone}
                </a>
              </DetailCard>

              <DetailCard label="Working hours" icon={<ClockIcon />}>
                {site.hours.map((h) => (
                  <span key={h.days} className="flex items-baseline justify-between gap-6 border-b border-line/70 py-1.5 last:border-0">
                    <span className="text-ink">{h.days}</span>
                    <span className={`font-mono text-sm ${h.time === 'Closed' ? 'text-ink-faint' : 'text-ink-mute'}`}>{h.time}</span>
                  </span>
                ))}
              </DetailCard>
            </div>

            {/* Photo card */}
            <Reveal delay={0.1}>
              <TiltCard max={8} className="mt-6" cardClassName="rounded-[1.5rem]">
                <div className="relative flex aspect-[16/10] flex-col justify-end rounded-[1.5rem] p-6 [transform-style:preserve-3d]">
                  <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[1.5rem] bg-navy-900 shadow-[0_40px_60px_-35px_rgba(8,15,46,0.7)]">
                    <Photo id={contactPage.form} w={900} className="transition-transform duration-[1.4s] ease-editorial group-hover:scale-105" />
                    <span className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/40 to-transparent" />
                  </div>
                  <span className="relative [transform:translateZ(40px)]">
                    <span className="block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-amber">Engineering-led</span>
                    <span className="mt-1 block text-xl font-bold uppercase leading-tight text-white">
                      Talk to people who build it.
                    </span>
                  </span>
                </div>
              </TiltCard>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <EnquiryForm />
          </div>
        </div>
      </Container>
    </section>
  )
}

function DetailCard({ label, icon, children }) {
  return (
    <Reveal>
      <TiltCard max={6} glare={false} cardClassName="rounded-2xl">
        <div className="relative flex gap-4 rounded-2xl p-5 [transform-style:preserve-3d]">
          <span aria-hidden="true" className="absolute inset-0 rounded-2xl bg-white ring-1 ring-inset ring-line shadow-[0_4px_0_#dcd7cb,0_20px_30px_-24px_rgba(8,15,46,0.35)] transition-shadow duration-500 group-hover:shadow-[0_6px_0_#dcd7cb,0_30px_40px_-24px_rgba(8,15,46,0.45)]" />
          <span className="relative mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-navy-900 text-white transition-colors duration-500 group-hover:bg-ember [transform:translateZ(30px)]">
            {icon}
          </span>
          <div className="relative min-w-0 flex-1 [transform:translateZ(18px)]">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-faint">{label}</span>
            <div className="mt-1.5 text-base leading-relaxed text-ink-mute">{children}</div>
          </div>
        </div>
      </TiltCard>
    </Reveal>
  )
}

/* ------------------------------------------------------------- Form */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const EMPTY = { name: '', company: '', email: '', phone: '', service: '', projectType: '', message: '' }

function EnquiryForm() {
  const [data, setData] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const update = (e) => {
    const { name, value } = e.target
    setData((d) => ({ ...d, [name]: value }))
    if (errors[name]) setErrors((x) => ({ ...x, [name]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (!data.name.trim()) next.name = 'Please enter your name'
    if (!data.email.trim()) next.email = 'Please enter your email'
    else if (!EMAIL_RE.test(data.email.trim())) next.email = 'Enter a valid email address'
    if (!data.message.trim()) next.message = 'Tell us about your project'
    else if (data.message.trim().length < 12) next.message = 'A little more detail, please'
    return next
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length) {
      // focus first invalid field
      const first = document.querySelector('[aria-invalid="true"]')
      first?.focus()
      return
    }
    setStatus('loading')
    try {
      // NOTE: front-end only. Connect a real endpoint here before launch —
      // e.g. a Vercel serverless function (/api/enquiry) or Formspree.
      // await fetch('/api/enquiry', { method: 'POST', body: JSON.stringify(data) })
      await new Promise((res) => setTimeout(res, 1300))
      setStatus('success')
      setData(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  return (
    <Reveal>
      <div className="relative rounded-[1.75rem] bg-white shadow-[0_6px_0_#dcd7cb,0_50px_90px_-50px_rgba(16,19,26,0.45)] ring-1 ring-line">
        {/* Header band */}
        <div className="relative overflow-hidden rounded-t-[1.75rem] bg-navy-900 px-7 py-7 text-white sm:px-10">
          <span aria-hidden="true" className="grid-lines absolute inset-0 opacity-60" />
          <span aria-hidden="true" className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-ember/40 blur-3xl" />
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 [background:var(--brand-gradient)]" />
          <div className="relative flex items-center justify-between">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-amber">Project enquiry</span>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/50">REV · 01</span>
          </div>
          <h3 className="relative mt-3 text-2xl font-bold leading-tight sm:text-3xl">Start a conversation</h3>
          <p className="relative mt-2 max-w-md text-sm leading-relaxed text-paper/65">
            A few details about your scope help us bring the right engineers to the first call.
          </p>
        </div>

        <div className="relative p-7 sm:p-10">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex flex-col items-start py-6"
              >
                <motion.span
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                  className="grid h-16 w-16 place-items-center rounded-2xl text-white shadow-[0_5px_0_#b73a10,0_24px_30px_-12px_rgba(242,101,34,0.7)] [background:var(--brand-gradient)]"
                >
                  <CheckIcon />
                </motion.span>
                <h4 className="mt-7 text-2xl font-bold text-ink">Thank you — enquiry received.</h4>
                <p className="mt-3 max-w-md text-base leading-relaxed text-ink-mute">
                  We&apos;ve noted your details and will be in touch. For an immediate response, call us directly at{' '}
                  <a href={`tel:${site.contact.phoneHref}`} className="link-underline font-medium text-ember">{site.contact.phone}</a>.
                </p>
                <Button3D variant="outline" size="md" arrow={false} className="mt-8" onClick={() => setStatus('idle')}>
                  Send another enquiry
                </Button3D>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                onSubmit={onSubmit}
                noValidate
                className="space-y-6"
              >
                <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
                  <Field label="Name" name="name" value={data.name} onChange={update} error={errors.name} required autoComplete="name" />
                  <Field label="Company" name="company" value={data.company} onChange={update} autoComplete="organization" />
                  <Field label="Email" name="email" type="email" value={data.email} onChange={update} error={errors.email} required autoComplete="email" />
                  <Field label="Phone" name="phone" type="tel" value={data.phone} onChange={update} autoComplete="tel" />
                  <Select label="Service" name="service" value={data.service} onChange={update} options={services.map((s) => s.title)} placeholder="Select a service" />
                  <Select label="Project type" name="projectType" value={data.projectType} onChange={update} options={PROJECT_TYPES} placeholder="Select a type" />
                </div>

                <TextArea label="Project details" name="message" value={data.message} onChange={update} error={errors.message} required />

                {status === 'error' && (
                  <p className="flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-wide text-[#d64545]">
                    <WarnIcon /> Something went wrong. Please try again or call us directly.
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-between gap-5 pt-2">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-faint">
                    <span className="text-ember">*</span> Required fields
                  </span>
                  <Button3D
                    type="submit"
                    size="lg"
                    disabled={status === 'loading'}
                    icon={status === 'loading' ? <Spinner /> : undefined}
                    className="disabled:pointer-events-none disabled:opacity-80"
                  >
                    {status === 'loading' ? 'Sending…' : 'Send enquiry'}
                  </Button3D>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Reveal>
  )
}

/* ------------------------------------------------------- Form fields */
const fieldBox =
  'w-full rounded-xl bg-paper px-4 py-3.5 text-base text-ink outline-none ring-1 ring-inset ring-line transition-all duration-300 placeholder:text-ink-faint/60 hover:ring-ink/25 focus:bg-white focus:ring-2 focus:ring-ember focus:shadow-[0_10px_24px_-14px_rgba(242,101,34,0.6)]'
const fieldError = '!ring-2 !ring-[#d64545] bg-[#d64545]/[0.04]'

function Label({ htmlFor, children, required }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-faint">
      {children}{required && <span className="text-ember"> *</span>}
    </label>
  )
}

function ErrorText({ children }) {
  return children ? <p className="mt-2 font-mono text-[0.64rem] uppercase tracking-wide text-[#d64545]">{children}</p> : null
}

function Field({ label, name, type = 'text', value, onChange, error, required, ...rest }) {
  return (
    <div>
      <Label htmlFor={name} required={required}>{label}</Label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={error ? 'true' : undefined}
        className={`${fieldBox} ${error ? fieldError : ''}`}
        {...rest}
      />
      <ErrorText>{error}</ErrorText>
    </div>
  )
}

function Select({ label, name, value, onChange, options, placeholder }) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`${fieldBox} appearance-none pr-10 ${value ? 'text-ink' : 'text-ink-faint'}`}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o} className="text-ink">{o}</option>
          ))}
        </select>
        <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-faint">
          <svg viewBox="0 0 10 6" className="h-[6px] w-[10px]" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M1 1l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>
    </div>
  )
}

function TextArea({ label, name, value, onChange, error, required }) {
  return (
    <div>
      <Label htmlFor={name} required={required}>{label}</Label>
      <textarea
        id={name}
        name={name}
        rows={5}
        value={value}
        onChange={onChange}
        aria-invalid={error ? 'true' : undefined}
        placeholder="Scope, location, timeline, and any technical requirements…"
        className={`${fieldBox} resize-none ${error ? fieldError : ''}`}
      />
      <ErrorText>{error}</ErrorText>
    </div>
  )
}

/* ------------------------------------------------------ What happens next */
function NextSteps() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-paper lg:py-32">
      <span aria-hidden="true" className="pointer-events-none absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full bg-ember/15 blur-[130px]" />
      <Container className="relative">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal><Eyebrow className="!text-amber [&>span]:bg-amber/60">After you reach out</Eyebrow></Reveal>
            <motion.h2
              variants={lineParent}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mt-6 text-display-md font-bold uppercase leading-[0.96] text-white"
            >
              {['What happens', 'next.'].map((l, i) => (
                <span key={l} className="block overflow-hidden pb-[0.04em]">
                  <motion.span variants={lineChild} className={`block ${i === 1 ? 'text-ember-gradient' : ''}`}>{l}</motion.span>
                </span>
              ))}
            </motion.h2>
          </div>
          <Reveal>
            <p className="max-w-sm text-base leading-relaxed text-paper/60">
              A straightforward path from first message to a defined scope of work.
            </p>
          </Reveal>
        </div>

        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {NEXT_STEPS.map((s, i) => (
            <motion.li
              key={s.index}
              variants={{
                hidden: { opacity: 0, y: 60, rotateX: -35 },
                show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 1, ease: EASE, delay: i * 0.14 } },
              }}
              style={{ transformPerspective: 1200 }}
            >
              <TiltCard max={9} className="h-full" cardClassName="rounded-[1.75rem]">
                <article className="relative flex h-full flex-col rounded-[1.75rem] [transform-style:preserve-3d]">
                  <span aria-hidden="true" className="absolute inset-0 rounded-[1.75rem] bg-navy-900 ring-1 ring-inset ring-white/10 shadow-[0_6px_0_#030719,0_40px_60px_-35px_rgba(0,0,0,0.9)]" />
                  <div className="relative aspect-[16/10] overflow-hidden rounded-t-[1.75rem]">
                    <Photo id={s.image} w={900} className="transition-transform duration-[1.4s] ease-editorial group-hover:scale-110" />
                    <span className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/20 to-transparent" />
                  </div>
                  <span className="relative -mt-8 ml-7 grid h-16 w-16 place-items-center rounded-2xl font-display text-xl font-bold text-white shadow-[0_5px_0_#b73a10,0_20px_30px_-10px_rgba(242,101,34,0.7)] [background:var(--brand-gradient)] [transform:translateZ(50px)]">
                    {s.index}
                  </span>
                  <div className="relative flex-1 p-7 pt-5 [transform:translateZ(30px)]">
                    <h3 className="text-2xl font-semibold text-white">{s.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-paper/65">{s.body}</p>
                  </div>
                  <span aria-hidden="true" className="absolute inset-x-7 bottom-0 h-1 origin-left scale-x-0 rounded-full transition-transform duration-700 ease-editorial [background:var(--brand-gradient)] group-hover:scale-x-100" />
                </article>
              </TiltCard>
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------------ Map */
function MapSection() {
  return (
    <section className="bg-paper-warm py-24 lg:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal><Eyebrow>Find us</Eyebrow></Reveal>
            <Reveal>
              <h2 className="mt-6 text-display-md font-bold uppercase leading-[0.96] text-ink">
                Dubai Silicon <span className="text-ember-gradient">Oasis.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal>
            <Button3D href={MAPS_URL} target="_blank" rel="noopener noreferrer" variant="dark" size="md">
              Get directions
            </Button3D>
          </Reveal>
        </div>

        <Reveal>
          <div className="relative mt-12">
            <div className="relative h-[26rem] overflow-hidden rounded-[1.75rem] bg-navy-900 shadow-[0_6px_0_#dcd7cb,0_50px_80px_-45px_rgba(8,15,46,0.6)] ring-1 ring-line lg:h-[32rem]">
              <iframe
                title="Lemos International office location on Google Maps"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0 grayscale-[0.85] transition-[filter] duration-700 hover:grayscale-0"
              />
            </div>

            {/* Floating address card */}
            <div className="pointer-events-none relative -mt-24 px-4 sm:absolute sm:bottom-6 sm:left-6 sm:mt-0 sm:px-0">
              <TiltCard max={10} className="pointer-events-auto sm:w-[22rem]" cardClassName="rounded-2xl">
                <div className="relative rounded-2xl p-6 text-white [transform-style:preserve-3d]">
                  <span aria-hidden="true" className="absolute inset-0 rounded-2xl bg-navy-950 ring-1 ring-inset ring-white/10 shadow-[0_6px_0_#030719,0_40px_60px_-30px_rgba(0,0,0,0.8)]" />
                  <span aria-hidden="true" className="absolute inset-x-6 top-0 h-0.5 [background:var(--brand-gradient)]" />
                  <div className="relative flex items-center gap-3 [transform:translateZ(35px)]">
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-ember" />
                    </span>
                    <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-amber">Head office</span>
                  </div>
                  <p className="relative mt-3 text-base leading-relaxed text-paper/85 [transform:translateZ(25px)]">
                    {site.contact.addressLines.map((l) => (
                      <span key={l} className="block">{l}</span>
                    ))}
                  </p>
                </div>
              </TiltCard>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

/* -------------------------------------------------------- Final CTA */
function ContactCta() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-28 text-paper lg:py-36">
      <div aria-hidden="true" className="absolute inset-0">
        <ParallaxImage {...pic(contactPage.cta, 2000)} ratio="auto" speed={90} className="h-full w-full" />
      </div>
      <span aria-hidden="true" className="absolute inset-0 bg-navy-950/80" />
      <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(3,7,25,0.85)_75%)]" />
      <Container className="relative text-center">
        <Reveal><Eyebrow className="justify-center !text-amber [&>span]:bg-amber/60">Prefer to talk?</Eyebrow></Reveal>
        <motion.h2
          variants={lineParent}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mx-auto mt-7 max-w-3xl text-display-lg font-bold uppercase leading-[0.95] text-white"
        >
          {['Call the team', 'directly.'].map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.04em]">
              <motion.span variants={lineChild} className={`block ${i === 1 ? 'text-ember-gradient' : ''}`}>{l}</motion.span>
            </span>
          ))}
        </motion.h2>
        <Reveal delay={0.08}>
          <a href={`tel:${site.contact.phoneHref}`} className="mt-8 inline-block font-display text-display-sm font-bold text-white transition-colors hover:text-amber">
            {site.contact.phone}
          </a>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-5 max-w-md font-mono text-[0.68rem] uppercase tracking-[0.16em] text-paper/55">
            {site.contact.address}
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button3D href={`tel:${site.contact.phoneHref}`} size="lg" icon={<PhoneIcon />}>Call now</Button3D>
            <Button3D href="#enquiry" variant="glass" size="lg" arrow={false}>Send an enquiry</Button3D>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

/* ------------------------------------------------------------ Icons */
function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  )
}
function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
    </svg>
  )
}
function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}
function WarnIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    </svg>
  )
}
function Spinner() {
  return (
    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
  )
}
