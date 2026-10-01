import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Button3D from '@/components/ui/Button3D'
import TiltCard from '@/components/ui/TiltCard'
import FooterVisual from './FooterVisual'
import { ClockIcon, PhoneIcon, PinIcon } from './NavIcons'
import { site } from '@/data/site'
import { footerNav } from '@/data/navigation'
import { services } from '@/data/services'
import { industries } from '@/data/industries'
import { EASE, viewportOnce } from '@/lib/motion'
import { scrollToTop } from '@/lib/useSmoothScroll'

const WORDMARK = 'LEMOS'

function ColumnHeading({ children }) {
  return (
    <h3 className="flex items-center gap-2.5 font-mono text-[0.66rem] font-medium uppercase tracking-[0.24em] text-amber">
      <span className="h-1.5 w-1.5 rounded-full bg-ember shadow-[0_0_12px_rgba(242,101,34,0.9)]" />
      {children}
    </h3>
  )
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-2 text-[0.95rem] text-paper/65 transition-colors duration-300 hover:text-white"
    >
      <span className="h-px w-0 bg-ember transition-all duration-400 ease-editorial group-hover:w-4" />
      <span className="transition-transform duration-400 ease-editorial group-hover:translate-x-0.5">{children}</span>
    </Link>
  )
}

function ContactItem({ icon: Icon, label, children, href }) {
  const body = (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/[0.06] text-amber ring-1 ring-inset ring-white/10 shadow-[0_3px_0_rgba(255,255,255,0.06)] transition-all duration-400 ease-editorial group-hover:-translate-y-0.5 group-hover:rotate-[-6deg] group-hover:bg-ember group-hover:text-white group-hover:shadow-[0_5px_0_#b73a10,0_16px_28px_-12px_rgba(242,101,34,0.8)]">
        <Icon className="h-[1.1rem] w-[1.1rem]" />
      </span>
      <span className="flex flex-col gap-1 pt-0.5">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-paper/40">{label}</span>
        <span className="text-[0.95rem] leading-relaxed text-paper/85 transition-colors group-hover:text-white">{children}</span>
      </span>
    </>
  )
  return (
    <li>
      {href ? (
        <a href={href} className="group flex items-start gap-4">{body}</a>
      ) : (
        <div className="group flex items-start gap-4">{body}</div>
      )}
    </li>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  const { contact } = site
  const tel = contact.phone ? `tel:${contact.phoneHref || contact.phone.replace(/\s+/g, '')}` : null

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-paper">
      {/* Atmosphere: ember hairline, brand glows, masked grid, pipe routing */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember to-transparent opacity-70" />
      {/* Moving light along the hairline */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-8 overflow-hidden">
        <span className="footer-sweep absolute left-0 top-0 block h-full w-1/4">
          <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-amber to-transparent" />
          <span className="absolute inset-x-[15%] -top-3 h-6 rounded-full bg-amber/50 blur-xl" />
        </span>
      </span>
      <span aria-hidden="true" className="footer-drift pointer-events-none absolute -left-40 top-24 h-[28rem] w-[28rem] rounded-full bg-ember/15 blur-[120px]" />
      <span aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-0 h-[32rem] w-[32rem] rounded-full bg-navy-600/30 blur-[140px]" />
      <span aria-hidden="true" className="footer-drift pointer-events-none absolute bottom-10 left-[10%] h-64 w-64 rounded-full bg-amber/10 blur-[100px] [animation-delay:-7s] [animation-duration:18s]" />
      <span
        aria-hidden="true"
        className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] opacity-70">
        <FooterVisual />
      </div>

      <Container className="relative pt-20 lg:pt-28">
        {/* CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 12 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: EASE }}
          style={{ transformPerspective: 1200 }}
        >
          <TiltCard max={4} cardClassName="rounded-[2rem]">
            {/* Rotating ember glow around the card */}
            <span aria-hidden="true" className="glow-halo pointer-events-none absolute -inset-1 rounded-[2.2rem]" />
            <div className="relative rounded-[2rem] bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 p-8 ring-1 ring-inset ring-white/10 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] sm:p-12 lg:p-16">
              <span aria-hidden="true" className="glow-border pointer-events-none absolute inset-0 rounded-[2rem]" />
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
                <span className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-ember/30 blur-[90px]" />
                <span className="grid-lines absolute inset-0 opacity-60 [mask-image:linear-gradient(to_left,black,transparent_70%)]" />
              </span>

              <div className="relative grid items-end gap-10 lg:grid-cols-12 [transform-style:preserve-3d]">
                <div className="lg:col-span-7 [transform:translateZ(40px)]">
                  <span className="eyebrow !text-amber flex items-center gap-3">
                    <span className="h-px w-8 bg-amber/60" /> Start a project
                  </span>
                  <h2 className="mt-6 text-display-md font-bold uppercase leading-[0.96] text-white">
                    Let&apos;s engineer your <span className="text-ember-gradient">next project.</span>
                  </h2>
                  <p className="mt-5 max-w-lg text-base leading-relaxed text-paper/70">
                    Share your scope, drawings or shutdown window. Our engineers will come back with a clear plan and a firm quote.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 lg:col-span-5 lg:justify-end [transform:translateZ(60px)]">
                  <Button3D to="/contact" variant="primary" size="lg">Request a Quote</Button3D>
                  {tel && (
                    <Button3D href={tel} variant="glass" size="lg" icon={<PhoneIcon className="h-4 w-4" />}>
                      {contact.phone}
                    </Button3D>
                  )}
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Columns */}
        <div className="mt-20 grid gap-14 sm:grid-cols-2 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link to="/" aria-label={`${site.name} home`} className="inline-block transition-transform duration-500 ease-editorial hover:-translate-y-0.5">
              <img src={site.logo} alt={site.name} width="782" height="215" className="logo-on-dark h-14 w-auto sm:h-16" />
            </Link>
            <p className="mt-7 max-w-sm text-[0.95rem] leading-relaxed text-paper/65">{site.descriptor}</p>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {[`${services.length} core services`, `${industries.length} sectors`, 'End-to-end delivery'].map((t) => (
                <li
                  key={t}
                  className="rounded-full bg-white/[0.05] px-3.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-paper/70 ring-1 ring-inset ring-white/10"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <nav className="lg:col-span-3" aria-label="Services">
            <ColumnHeading>Services</ColumnHeading>
            <ul className="mt-7 space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <FooterLink to={`/services/${s.slug}`}>{s.title}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Industries + company */}
          <nav className="lg:col-span-2" aria-label="Industries and company">
            <ColumnHeading>Industries</ColumnHeading>
            <ul className="mt-7 space-y-3">
              {industries.map((ind) => (
                <li key={ind.slug}>
                  <FooterLink to={`/industries/${ind.slug}`}>{ind.title}</FooterLink>
                </li>
              ))}
            </ul>
            {footerNav.map((col) => (
              <div key={col.heading} className="mt-10">
                <ColumnHeading>{col.heading}</ColumnHeading>
                <ul className="mt-7 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.to}>
                      <FooterLink to={l.to}>{l.label}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Contact */}
          <div className="sm:col-span-2 lg:col-span-3">
            <ColumnHeading>Contact</ColumnHeading>
            <ul className="mt-7 space-y-6">
              {contact.phone && (
                <ContactItem icon={PhoneIcon} label="Phone" href={tel}>
                  {contact.phone}
                </ContactItem>
              )}
              {contact.addressLines?.length ? (
                <ContactItem icon={PinIcon} label="Office">
                  {contact.addressLines.map((l) => (
                    <span key={l} className="block">{l}</span>
                  ))}
                </ContactItem>
              ) : null}
              {site.hours?.length ? (
                <ContactItem icon={ClockIcon} label="Hours">
                  {site.hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}: {h.time}
                    </span>
                  ))}
                </ContactItem>
              ) : null}
            </ul>
          </div>
        </div>
      </Container>

      {/* Giant wordmark: letters lift in 3D on hover */}
      <div aria-hidden="true" className="relative mt-16 select-none overflow-hidden lg:mt-20">
        <Container>
          <div className="flex justify-between [perspective:900px]">
            {WORDMARK.split('').map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: '40%', rotateX: -70 }}
                whileInView={{ opacity: 1, y: '0%', rotateX: 0 }}
                viewport={{ once: true, margin: '0px 0px -5% 0px' }}
                transition={{ duration: 1.1, ease: EASE, delay: i * 0.08 }}
                className="text-outline inline-block origin-bottom font-display text-[25vw] font-bold leading-[0.78] text-white/[0.12] transition-[color,transform] duration-500 ease-editorial hover:-translate-y-3 hover:text-ember/60 lg:text-[21vw] 2xl:text-[19rem]"
              >
                {ch}
              </motion.span>
            ))}
          </div>
        </Container>
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-950 to-transparent" />
      </div>

      {/* Baseline */}
      <div className="relative border-t border-white/10">
        <Container className="flex flex-col gap-5 py-7 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="font-mono uppercase tracking-[0.18em]">{site.tagline}</p>
          <Button3D
            variant="glass"
            size="sm"
            onClick={scrollToTop}
            icon={
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 rotate-45">
                <path d="M12 19V5M6 11l6-6 6 6" />
              </svg>
            }
            className="self-start sm:self-auto"
          >
            Back to top
          </Button3D>
        </Container>
      </div>
    </footer>
  )
}
