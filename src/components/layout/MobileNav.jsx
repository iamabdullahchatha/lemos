import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ServiceIcon from '@/components/icons/ServiceIcon'
import { primaryNav, quoteCta } from '@/data/navigation'
import { site } from '@/data/site'
import { ArrowIcon, ClockIcon, PhoneIcon, PinIcon } from './NavIcons'
import { services } from '@/data/services'
import { industries } from '@/data/industries'
import { EASE } from '@/lib/motion'

const overlay = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.4, ease: EASE, staggerChildren: 0.05, delayChildren: 0.1 },
  },
  exit: { opacity: 0, transition: { duration: 0.3, ease: EASE } },
}
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
  exit: { opacity: 0, y: 8 },
}

function Accordion({ label, to, expanded, onToggle, onNavigate, children }) {
  return (
    <motion.div variants={item} className="border-b border-line">
      <div className="flex items-center justify-between">
        <NavLink
          to={to}
          onClick={onNavigate}
          className="flex items-baseline gap-4 py-5 text-display-sm font-bold text-ink"
        >
          {label}
        </NavLink>
        <button
          onClick={onToggle}
          aria-expanded={expanded}
          aria-label={`Toggle ${label} submenu`}
          className="flex h-10 w-10 items-center justify-center text-ember"
        >
          <span
            className={`text-2xl transition-transform duration-400 ease-editorial ${
              expanded ? 'rotate-45' : ''
            }`}
          >
            +
          </span>
        </button>
      </div>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function MobileNav({ open, onClose }) {
  const [expanded, setExpanded] = useState(null)
  const toggle = (key) => setExpanded((e) => (e === key ? null : key))

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={overlay}
          initial="hidden"
          animate="show"
          exit="exit"
          className="fixed inset-0 top-[var(--nav-h)] z-40 overflow-y-auto bg-paper lg:hidden"
        >
          <nav className="flex min-h-full flex-col edge pb-12 pt-6">
            {primaryNav
              .filter((n) => !n.panel)
              .slice(0, 2)
              .map((n) => (
                <motion.div key={n.to} variants={item} className="border-b border-line">
                  <NavLink
                    to={n.to}
                    onClick={onClose}
                    className="block py-5 text-display-sm font-bold text-ink"
                  >
                    {n.label}
                  </NavLink>
                </motion.div>
              ))}

            <Accordion
              label="Services"
              to="/services"
              expanded={expanded === 'services'}
              onToggle={() => toggle('services')}
              onNavigate={onClose}
            >
              <ul className="space-y-1">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/services/${s.slug}`}
                      onClick={onClose}
                      className="group flex items-center gap-3.5 rounded-xl px-2 py-2 text-ink-soft transition-colors hover:bg-ink/[0.04] hover:text-ember"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-ember ring-1 ring-ink/10 transition-colors group-hover:bg-ember group-hover:text-white">
                        <ServiceIcon name={s.slug} className="h-5 w-5" />
                      </span>
                      <span className="flex-1 text-[0.95rem] font-medium">{s.title}</span>
                      <span className="font-mono text-[0.65rem] text-ink-faint">{s.index}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Accordion>

            <Accordion
              label="Industries"
              to="/industries"
              expanded={expanded === 'industries'}
              onToggle={() => toggle('industries')}
              onNavigate={onClose}
            >
              <ul className="space-y-1">
                {industries.map((ind) => (
                  <li key={ind.slug}>
                    <Link
                      to={`/industries/${ind.slug}`}
                      onClick={onClose}
                      className="group flex items-center gap-3.5 rounded-xl px-2 py-2 text-ink-soft transition-colors hover:bg-ink/[0.04] hover:text-ember"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-ember ring-1 ring-ink/10 transition-colors group-hover:bg-ember group-hover:text-white">
                        <ServiceIcon name={ind.icon} className="h-5 w-5" />
                      </span>
                      <span className="flex-1 text-[0.95rem] font-medium">{ind.title}</span>
                      <span className="font-mono text-[0.65rem] text-ink-faint">{ind.index}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Accordion>

            {primaryNav
              .filter((n) => !n.panel)
              .slice(2)
              .map((n) => (
                <motion.div key={n.to} variants={item} className="border-b border-line">
                  <NavLink
                    to={n.to}
                    onClick={onClose}
                    className="block py-5 text-display-sm font-bold text-ink"
                  >
                    {n.label}
                  </NavLink>
                </motion.div>
              ))}

            <motion.div variants={item} className="mt-8">
              <Link
                to={quoteCta.to}
                onClick={onClose}
                className="flex w-full items-center justify-between rounded-full py-2 pl-7 pr-2 font-mono text-sm uppercase tracking-[0.16em] text-white"
                style={{
                  background: 'var(--brand-gradient)',
                  boxShadow: '0 16px 34px -14px rgba(242,101,34,0.75)',
                }}
              >
                {quoteCta.label}
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 ring-1 ring-inset ring-white/35">
                  <ArrowIcon className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-6 overflow-hidden rounded-2xl bg-navy-950 text-paper ring-1 ring-navy-900"
            >
              <a
                href={`tel:${site.contact.phoneHref}`}
                className="flex items-center gap-4 border-b border-white/10 px-5 py-4"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full text-white" style={{ background: 'var(--brand-gradient)' }}>
                  <PhoneIcon className="h-4 w-4" />
                </span>
                <span className="flex flex-col">
                  <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-paper/50">
                    Talk to an engineer
                  </span>
                  <span className="text-base font-semibold text-white">{site.contact.phone}</span>
                </span>
              </a>
              <div className="grid gap-3 px-5 py-4 text-[0.82rem] text-paper/70">
                <span className="flex items-start gap-3">
                  <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                  {site.contact.address}
                </span>
                <span className="flex items-start gap-3">
                  <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                  {site.hours[0].days} · {site.hours[0].time}
                </span>
              </div>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
