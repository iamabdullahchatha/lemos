import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Reveal from '@/components/ui/Reveal'
import { site } from '@/data/site'
import { services } from '@/data/services'
import { img, media } from '@/data/media'
import { EASE, lineParent, lineChild } from '@/lib/motion'

const PROJECT_TYPES = [
  'New fabrication / build',
  'Site installation',
  'Maintenance & repair',
  'Shutdown / turnaround',
  'Inspection & assessment',
  'Consultation',
  'Other',
]

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('Park Avenue Building, Dubai Silicon Oasis, Dubai')

export default function Contact() {
  return (
    <>
      <ContactHero />
      <ContactMain />
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

  return (
    <section ref={ref} className="relative flex h-[82svh] min-h-[560px] w-full items-end overflow-hidden bg-navy-950 text-paper">
      <motion.div style={{ scale: imgScale }} className="absolute inset-0">
        <img
          src={img(media.statement, 2200)}
          alt="Industrial engineering facility"
          onError={(e) => (e.currentTarget.style.opacity = '0')}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <span className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/30" />
      <span className="absolute inset-0 bg-gradient-to-r from-navy-950/75 via-transparent to-transparent" />

      <motion.div style={{ y: copyY, opacity: fade }} className="relative z-10 w-full pb-16 sm:pb-20">
        <Container>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
            <span className="eyebrow !text-amber [&>span]:bg-amber/60"><span className="h-px w-8" /> Contact</span>
          </motion.div>
          <motion.h1 variants={lineParent} initial="hidden" animate="show" className="mt-6 text-display-xl font-bold uppercase leading-[0.9] text-white">
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
            Tell us about the mechanical scope — fabrication, installation, turnaround or
            maintenance. Our team will come back with the right people and approach.
          </motion.p>
          <motion.a
            href={`tel:${site.contact.phoneHref}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42, ease: EASE }}
            className="group mt-8 inline-flex items-center gap-3 font-mono text-sm uppercase tracking-[0.14em] text-white"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 transition-colors group-hover:border-amber group-hover:text-amber">
              <PhoneIcon />
            </span>
            {site.contact.phone}
          </motion.a>
        </Container>
      </motion.div>
    </section>
  )
}

/* ------------------------------------------------------- Main / form */
function ContactMain() {
  return (
    <section className="relative bg-paper py-24 lg:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Details */}
          <div className="lg:col-span-5">
            <Reveal><Eyebrow>Get in touch</Eyebrow></Reveal>
            <Reveal>
              <h2 className="mt-6 text-display-sm font-bold uppercase leading-[1.02] text-ink">
                Reach the <span className="text-ember-gradient">Lemos team.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-5 max-w-md text-base leading-relaxed text-ink-mute">
                Speak with us directly or send an enquiry — we respond to every
                project request from our Dubai office.
              </p>
            </Reveal>

            <div className="mt-11 space-y-9">
              <DetailBlock label="Office" icon={<PinIcon />}>
                {site.contact.addressLines.map((l) => (
                  <span key={l} className="block">{l}</span>
                ))}
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-3 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ember"
                >
                  Open in Google Maps
                  <span aria-hidden="true" className="transition-transform duration-400 ease-editorial group-hover:translate-x-1">→</span>
                </a>
              </DetailBlock>

              <DetailBlock label="Phone" icon={<PhoneIcon />}>
                <a href={`tel:${site.contact.phoneHref}`} className="link-underline text-lg font-medium text-ink">
                  {site.contact.phone}
                </a>
              </DetailBlock>

              <DetailBlock label="Working hours" icon={<ClockIcon />}>
                {site.hours.map((h) => (
                  <span key={h.days} className="flex items-baseline justify-between gap-6 border-b border-line/70 py-1.5 last:border-0">
                    <span className="text-ink">{h.days}</span>
                    <span className={`font-mono text-sm ${h.time === 'Closed' ? 'text-ink-faint' : 'text-ink-mute'}`}>{h.time}</span>
                  </span>
                ))}
              </DetailBlock>
            </div>

            <LocationVisual />
          </div>

          {/* Form */}
          <div className="lg:col-span-6 lg:col-start-7">
            <EnquiryForm />
          </div>
        </div>
      </Container>
    </section>
  )
}

function DetailBlock({ label, icon, children }) {
  return (
    <Reveal>
      <div className="flex gap-4">
        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ember">
          {icon}
        </span>
        <div>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-faint">{label}</span>
          <div className="mt-2 text-base leading-relaxed text-ink-mute">{children}</div>
        </div>
      </div>
    </Reveal>
  )
}

/* ---------------------------------------------------- Location visual */
function LocationVisual() {
  return (
    <Reveal delay={0.1}>
      <a
        href={MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative mt-11 block aspect-[16/10] overflow-hidden rounded-xl border border-line bg-navy-950"
        aria-label="Open Lemos International office location in Google Maps"
      >
        {/* technical map grid */}
        <span
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
          }}
        />
        {/* diagonal route */}
        <svg aria-hidden="true" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 400 250">
          <path d="M-20 210 L150 150 L250 170 L440 60" fill="none" stroke="#f26522" strokeOpacity="0.55" strokeWidth="2" strokeDasharray="6 7" />
          <path d="M120 -20 L160 120 L210 140 L260 260" fill="none" stroke="#9fb0d6" strokeOpacity="0.25" strokeWidth="1.5" />
        </svg>
        {/* glow */}
        <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl" style={{ background: 'var(--brand-gradient)' }} />
        {/* marker */}
        <span className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2">
          <span className="relative flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60" />
            <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-ember" />
          </span>
        </span>
        {/* label */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
          <div className="text-paper">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-amber">Dubai · UAE</span>
            <p className="mt-1 text-sm font-semibold">Dubai Silicon Oasis</p>
          </div>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white transition-all duration-400 ease-editorial group-hover:border-amber group-hover:text-amber group-hover:translate-x-0.5">
            →
          </span>
        </div>
      </a>
    </Reveal>
  )
}

/* ------------------------------------------------------------- Form */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function EnquiryForm() {
  const [data, setData] = useState({
    name: '', company: '', email: '', phone: '', service: '', projectType: '', message: '',
  })
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
      setData({ name: '', company: '', email: '', phone: '', service: '', projectType: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="relative">
      {/* card frame */}
      <div className="relative overflow-hidden rounded-2xl border border-line bg-white p-7 shadow-[0_40px_90px_-50px_rgba(16,19,26,0.4)] sm:p-10">
        <span aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-bl-[3rem] bg-gradient-to-br from-amber/10 to-ember/10" />

        <div className="relative flex items-center justify-between">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-ember">Project enquiry</span>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-faint">REV · 01</span>
        </div>
        <h3 className="relative mt-4 text-2xl font-bold leading-tight text-ink sm:text-3xl">
          Start a conversation
        </h3>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="relative mt-10 flex flex-col items-start"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ember/10 text-ember">
                <CheckIcon />
              </span>
              <h4 className="mt-6 text-2xl font-bold text-ink">Thank you — enquiry received.</h4>
              <p className="mt-3 max-w-md text-base leading-relaxed text-ink-mute">
                We&apos;ve noted your details and will be in touch. For an immediate
                response, call us directly at{' '}
                <a href={`tel:${site.contact.phoneHref}`} className="font-medium text-ember link-underline">{site.contact.phone}</a>.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-8 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink transition-colors hover:text-ember"
              >
                ← Send another enquiry
              </button>
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
              className="relative mt-8 space-y-7"
            >
              <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
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

              <div className="flex flex-wrap items-center gap-5 pt-1">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-br from-ember to-ember-600 px-8 py-4 font-mono text-[0.74rem] uppercase tracking-[0.16em] text-white transition-opacity disabled:opacity-70"
                  style={{ boxShadow: '0 14px 34px -12px rgba(242,101,34,0.7), inset 0 1px 0 rgba(255,255,255,0.28)' }}
                >
                  <span className="relative z-10">{status === 'loading' ? 'Sending…' : 'Send enquiry'}</span>
                  {status === 'loading' ? (
                    <Spinner />
                  ) : (
                    <span aria-hidden="true" className="relative z-10 transition-transform duration-400 ease-editorial group-hover:translate-x-1">→</span>
                  )}
                </button>
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-ink-faint">
                  We reply within one business day
                </span>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ------------------------------------------------------- Form fields */
function Field({ label, name, type = 'text', value, onChange, error, required, ...rest }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-faint">
        {label}{required && <span className="text-ember"> *</span>}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          aria-invalid={error ? 'true' : undefined}
          className="peer w-full border-b border-line bg-transparent pb-3 pt-1 text-base text-ink outline-none transition-colors placeholder:text-ink-faint/50 focus:border-transparent"
          {...rest}
        />
        <span className={`pointer-events-none absolute -bottom-px left-0 h-[2px] w-full origin-left bg-ember transition-transform duration-400 ease-editorial ${error ? 'scale-x-100 !bg-[#d64545]' : 'scale-x-0 peer-focus:scale-x-100'}`} />
      </div>
      {error && <p className="mt-2 font-mono text-[0.64rem] uppercase tracking-wide text-[#d64545]">{error}</p>}
    </div>
  )
}

function Select({ label, name, value, onChange, options, placeholder }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-faint">{label}</label>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`peer w-full appearance-none border-b border-line bg-transparent pb-3 pt-1 pr-8 text-base outline-none transition-colors focus:border-transparent ${value ? 'text-ink' : 'text-ink-faint/60'}`}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o} className="text-ink">{o}</option>
          ))}
        </select>
        <span aria-hidden="true" className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-ink-faint">
          <svg viewBox="0 0 10 6" className="h-[6px] w-[10px]" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M1 1l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <span className="pointer-events-none absolute -bottom-px left-0 h-[2px] w-full origin-left scale-x-0 bg-ember transition-transform duration-400 ease-editorial peer-focus:scale-x-100" />
      </div>
    </div>
  )
}

function TextArea({ label, name, value, onChange, error, required }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-faint">
        {label}{required && <span className="text-ember"> *</span>}
      </label>
      <div className="relative">
        <textarea
          id={name}
          name={name}
          rows={4}
          value={value}
          onChange={onChange}
          aria-invalid={error ? 'true' : undefined}
          placeholder="Scope, location, timeline, and any technical requirements…"
          className="peer w-full resize-none border-b border-line bg-transparent pb-3 pt-1 text-base text-ink outline-none transition-colors placeholder:text-ink-faint/50 focus:border-transparent"
        />
        <span className={`pointer-events-none absolute -bottom-px left-0 h-[2px] w-full origin-left bg-ember transition-transform duration-400 ease-editorial ${error ? 'scale-x-100 !bg-[#d64545]' : 'scale-x-0 peer-focus:scale-x-100'}`} />
      </div>
      {error && <p className="mt-2 font-mono text-[0.64rem] uppercase tracking-wide text-[#d64545]">{error}</p>}
    </div>
  )
}

/* -------------------------------------------------------- Final CTA */
function ContactCta() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 text-paper lg:py-32">
      <span aria-hidden="true" className="pointer-events-none absolute -left-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full opacity-30 blur-3xl" style={{ background: 'var(--brand-gradient)' }} />
      <Container className="relative text-center">
        <Reveal><Eyebrow className="justify-center !text-amber [&>span]:bg-amber/60">Prefer to talk?</Eyebrow></Reveal>
        <Reveal>
          <h2 className="mx-auto mt-7 max-w-3xl text-display-lg font-bold uppercase leading-[0.95] text-white">
            Call the team directly.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <a href={`tel:${site.contact.phoneHref}`} className="mt-8 inline-block text-display-sm font-bold text-ember-gradient">
            {site.contact.phone}
          </a>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-md font-mono text-[0.68rem] uppercase tracking-[0.16em] text-paper/55">
            {site.contact.address}
          </p>
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
    <span className="relative z-10 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden="true" />
  )
}
