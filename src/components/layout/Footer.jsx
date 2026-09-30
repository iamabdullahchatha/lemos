import { Link } from 'react-router-dom'
import Container from '@/components/ui/Container'
import FooterVisual from './FooterVisual'
import { site } from '@/data/site'
import { footerNav } from '@/data/navigation'
import { services } from '@/data/services'
import { industries } from '@/data/industries'

function ContactRow({ label, value, href }) {
  return (
    <li className="flex flex-col gap-1">
      <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-paper/40">
        {label}
      </span>
      {href ? (
        <a href={href} className="text-sm text-paper/80 transition-colors hover:text-white link-underline">
          {value}
        </a>
      ) : (
        <span className="text-sm text-paper/80">{value}</span>
      )}
    </li>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  const { contact } = site
  const hasContact = contact.email || contact.phone || contact.address

  return (
    <footer className="relative overflow-hidden bg-navy-900 text-paper">
      <FooterVisual />

      {/* CTA band */}
      <div className="relative border-b border-white/12">
        <Container className="flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center lg:py-20">
          <h2 className="max-w-2xl text-display-md font-bold uppercase leading-[0.98] text-white">
            Let's engineer your next project.
          </h2>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 bg-ember px-8 py-4 font-mono text-sm uppercase tracking-[0.16em] text-white transition-colors duration-400 hover:bg-ember-600"
          >
            Request a Quote
            <span aria-hidden="true" className="transition-transform duration-400 ease-editorial group-hover:translate-x-1">→</span>
          </Link>
        </Container>
      </div>

      <Container className="relative py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <img src={site.logo} alt={site.name} width="782" height="215" className="h-10 w-auto brightness-0 invert" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-paper/65">
              {site.descriptor}
            </p>
          </div>

          {/* Services */}
          <nav className="lg:col-span-3" aria-label="Services">
            <h3 className="eyebrow text-amber">Services</h3>
            <ul className="mt-6 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`} className="text-sm text-paper/70 transition-colors hover:text-white link-underline">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Industries + Company */}
          <nav className="lg:col-span-2" aria-label="Industries">
            <h3 className="eyebrow text-amber">Industries</h3>
            <ul className="mt-6 space-y-2.5">
              {industries.map((ind) => (
                <li key={ind.slug}>
                  <Link to="/industries" className="text-sm text-paper/70 transition-colors hover:text-white link-underline">
                    {ind.title}
                  </Link>
                </li>
              ))}
            </ul>
            {footerNav.map((col) => (
              <div key={col.heading} className="mt-8">
                <h3 className="eyebrow text-amber">{col.heading}</h3>
                <ul className="mt-6 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className="text-sm text-paper/70 transition-colors hover:text-white link-underline">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Contact / office */}
          <div className="lg:col-span-3">
            <h3 className="eyebrow text-amber">Contact</h3>
            {hasContact ? (
              <ul className="mt-6 space-y-5">
                {contact.email && <ContactRow label="Email" value={contact.email} href={`mailto:${contact.email}`} />}
                {contact.phone && <ContactRow label="Phone" value={contact.phone} href={`tel:${contact.phoneHref || contact.phone.replace(/\s+/g, '')}`} />}
                {contact.addressLines?.length ? (
                  <li className="flex flex-col gap-1">
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-paper/40">Office</span>
                    <span className="text-sm leading-relaxed text-paper/80">
                      {contact.addressLines.map((l) => (
                        <span key={l} className="block">{l}</span>
                      ))}
                    </span>
                  </li>
                ) : (
                  contact.address && <ContactRow label="Office" value={contact.address} />
                )}
                {site.hours?.length ? (
                  <li className="flex flex-col gap-1">
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-paper/40">Hours</span>
                    <span className="text-sm leading-relaxed text-paper/80">
                      {site.hours.map((h) => (
                        <span key={h.days} className="block">{h.days}: {h.time}</span>
                      ))}
                    </span>
                  </li>
                ) : null}
              </ul>
            ) : (
              <div className="mt-6">
                <p className="text-sm leading-relaxed text-paper/65">
                  Contact and office details available on request.
                </p>
                <Link to="/contact" className="mt-4 inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-white transition-colors hover:text-amber">
                  Get in touch <span aria-hidden="true">→</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Baseline */}
        <div className="mt-20 flex flex-col gap-4 border-t border-white/12 pt-8 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p className="font-mono uppercase tracking-[0.18em]">{site.tagline}</p>
        </div>
      </Container>
    </footer>
  )
}
