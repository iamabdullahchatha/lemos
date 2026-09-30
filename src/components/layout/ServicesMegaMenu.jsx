import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '@/components/ui/Container'
import ServiceIcon from '@/components/icons/ServiceIcon'
import { services } from '@/data/services'
import { serviceHeroes, img } from '@/data/media'
import { EASE } from '@/lib/motion'

const GRID = {
  backgroundImage:
    'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
  backgroundSize: '44px 44px',
}

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } },
}
const row = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
}

export default function ServicesMegaMenu({ onNavigate }) {
  const [active, setActive] = useState(services[0])

  return (
    <div className="relative overflow-hidden bg-navy-950/95 text-paper backdrop-blur-2xl shadow-[0_44px_90px_-32px_rgba(0,0,0,0.75)]">
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-60" style={GRID} />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-40 blur-3xl"
        style={{ background: 'var(--brand-gradient)' }}
      />
      <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/40 to-transparent" />

      <Container className="relative py-10 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* List */}
          <div className="lg:col-span-7">
            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-amber">
                Capabilities · 01—08
              </span>
              <Link
                to="/services"
                onClick={onNavigate}
                className="group inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-paper/60 transition-colors hover:text-amber"
              >
                All services
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>

            <motion.ul variants={list} initial="hidden" animate="show" className="grid gap-x-6 sm:grid-cols-2">
              {services.map((s) => {
                const isActive = active.slug === s.slug
                return (
                  <motion.li key={s.slug} variants={row}>
                    <Link
                      to={`/services/${s.slug}`}
                      onClick={onNavigate}
                      onMouseEnter={() => setActive(s)}
                      onFocus={() => setActive(s)}
                      className={`group relative flex items-start gap-3.5 rounded-lg px-3 py-3 transition-colors duration-300 ${
                        isActive ? 'bg-white/[0.05]' : 'hover:bg-white/[0.04]'
                      }`}
                    >
                      <span
                        className={`absolute left-0 top-1/2 h-7 w-[2px] -translate-y-1/2 bg-ember transition-transform duration-400 ease-editorial ${
                          isActive ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100'
                        }`}
                      />
                      <span className="pt-0.5 font-mono text-[0.68rem] text-amber">{s.index}</span>
                      <span className={`mt-0.5 transition-colors duration-300 ${isActive ? 'text-amber' : 'text-paper/45 group-hover:text-amber'}`}>
                        <ServiceIcon name={s.slug} className="h-5 w-5" />
                      </span>
                      <span className="flex-1">
                        <span className="flex items-center justify-between gap-2">
                          <span className="text-[0.95rem] font-semibold text-white">{s.title}</span>
                          <span
                            aria-hidden="true"
                            className="text-ember opacity-0 transition-all duration-400 ease-editorial group-hover:translate-x-1 group-hover:opacity-100"
                          >
                            →
                          </span>
                        </span>
                        <span className="mt-0.5 block text-[0.8rem] leading-snug text-paper/50">{s.summary}</span>
                      </span>
                    </Link>
                  </motion.li>
                )
              })}
            </motion.ul>
          </div>

          {/* Live image preview */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="relative h-full min-h-[20rem] overflow-hidden rounded-xl border border-white/10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={active.slug}
                  src={img(serviceHeroes[active.slug], 900)}
                  alt=""
                  aria-hidden="true"
                  onError={(e) => (e.currentTarget.style.opacity = '0')}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
              <span className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/45 to-transparent" />
              <span className="absolute inset-0 bg-gradient-to-r from-navy-950/60 to-transparent" />

              <div className="relative flex h-full flex-col justify-between p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-amber">{active.index}</span>
                  <span className="text-amber">
                    <ServiceIcon name={active.slug} className="h-7 w-7" stroke={1.2} />
                  </span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.slug}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <h3 className="text-xl font-bold leading-tight text-white">{active.title}</h3>
                    <p className="mt-2 text-[0.82rem] leading-relaxed text-paper/70">{active.summary}</p>
                    <Link
                      to={`/services/${active.slug}`}
                      onClick={onNavigate}
                      className="mt-4 inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-white transition-colors hover:text-amber"
                    >
                      Explore service
                      <span aria-hidden="true">→</span>
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
