import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ServiceIcon from '@/components/icons/ServiceIcon'
import { primaryNav, quoteCta } from '@/data/navigation'
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
                      className="flex items-center gap-3 py-2.5 text-ink-mute transition-colors hover:text-ember"
                    >
                      <span className="font-mono text-xs text-ember">{s.index}</span>
                      <ServiceIcon name={s.slug} className="h-5 w-5" />
                      <span className="text-[0.95rem] font-medium">{s.title}</span>
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
                      to="/industries"
                      onClick={onClose}
                      className="flex items-center gap-3 py-2.5 text-ink-mute transition-colors hover:text-ember"
                    >
                      <span className="font-mono text-xs text-ember">{ind.index}</span>
                      <ServiceIcon name={ind.icon} className="h-5 w-5" />
                      <span className="text-[0.95rem] font-medium">{ind.title}</span>
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
                className="flex w-full items-center justify-center gap-3 bg-ember px-8 py-5 font-mono text-sm uppercase tracking-[0.18em] text-white"
              >
                {quoteCta.label}
                <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
