import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ServiceIcon from '@/components/icons/ServiceIcon'
import { services } from '@/data/services'
import { industries } from '@/data/industries'
import { serviceMenuImages, img } from '@/data/media'
import { EASE } from '@/lib/motion'
import MegaMenuShell, { MegaFooter, MegaIntro, listVariants, rowVariants } from './MegaMenuShell'
import { ArrowIcon, CheckIcon } from './NavIcons'

const preview = (slug) => img(serviceMenuImages[slug], 900)

export default function ServicesMegaMenu({ onNavigate }) {
  const [active, setActive] = useState(services[0])

  useEffect(() => {
    services.forEach((s) => {
      new Image().src = preview(s.slug)
    })
  }, [])

  return (
    <MegaMenuShell
      footer={
        <MegaFooter
          note="Eight disciplines · One accountable team"
          cta={{ label: 'Discuss your project scope', to: '/contact' }}
          onNavigate={onNavigate}
        />
      }
    >
      <div className="grid lg:grid-cols-12">
        <MegaIntro
          eyebrow="Capabilities"
          title="Mechanical delivery, shop to site."
          body="Fabrication, installation, turnaround and maintenance — planned and executed under one accountable team."
          stats={[
            { label: 'Services', value: String(services.length).padStart(2, '0') },
            { label: 'Sectors', value: String(industries.length).padStart(2, '0') },
          ]}
          link={{ label: 'All services', to: '/services' }}
          onNavigate={onNavigate}
        />

        {/* List */}
        <div className="p-6 lg:col-span-7 xl:col-span-6 xl:p-7">
          <div className="mb-4 flex items-center justify-between px-3">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-paper/45">
              Our services
            </span>
            <Link
              to="/services"
              onClick={onNavigate}
              className="group inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-amber transition-colors hover:text-white xl:hidden"
            >
              View all
              <ArrowIcon className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <motion.ul
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="grid gap-1 sm:grid-cols-2"
          >
            {services.map((s) => {
              const isActive = active.slug === s.slug
              return (
                <motion.li key={s.slug} variants={rowVariants}>
                  <Link
                    to={`/services/${s.slug}`}
                    onClick={onNavigate}
                    onMouseEnter={() => setActive(s)}
                    onFocus={() => setActive(s)}
                    className={`group relative flex items-center gap-3.5 rounded-xl p-3 transition-all duration-300 ${
                      isActive
                        ? 'bg-white/[0.07] ring-1 ring-inset ring-white/10'
                        : 'hover:bg-white/[0.04]'
                    }`}
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg transition-all duration-400 ease-editorial ${
                        isActive
                          ? 'text-white shadow-[0_8px_22px_-8px_rgba(242,101,34,0.8)]'
                          : 'bg-white/[0.05] text-paper/60 ring-1 ring-inset ring-white/10'
                      }`}
                      style={isActive ? { background: 'var(--brand-gradient)' } : undefined}
                    >
                      <ServiceIcon name={s.slug} className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline gap-2">
                        <span className="font-mono text-[0.6rem] text-amber/80">{s.index}</span>
                        <span className="text-[0.9rem] font-semibold leading-snug text-white">
                          {s.title}
                        </span>
                      </span>
                      <span className="mt-0.5 block truncate text-[0.75rem] text-paper/45">
                        {s.scope[0]}
                      </span>
                    </span>
                    <ArrowIcon
                      className={`h-3.5 w-3.5 shrink-0 text-ember transition-all duration-400 ease-editorial ${
                        isActive ? 'translate-x-0 opacity-100' : '-translate-x-1 opacity-0'
                      }`}
                    />
                  </Link>
                </motion.li>
              )
            })}
          </motion.ul>
        </div>

        {/* Live preview */}
        <div className="hidden p-3 pl-0 lg:col-span-5 lg:block xl:col-span-3">
          <div className="relative h-full min-h-[24rem] overflow-hidden rounded-xl ring-1 ring-white/10">
            <AnimatePresence initial={false}>
              <motion.img
                key={active.slug}
                src={preview(active.slug)}
                alt=""
                aria-hidden="true"
                onError={(e) => (e.currentTarget.style.opacity = '0')}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <span className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/10" />

            <div className="relative flex h-full flex-col justify-between p-6">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-navy-950/60 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-amber ring-1 ring-inset ring-white/15 backdrop-blur-md">
                  Service {active.index} / {String(services.length).padStart(2, '0')}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-950/60 text-amber ring-1 ring-inset ring-white/15 backdrop-blur-md">
                  <ServiceIcon name={active.slug} className="h-5 w-5" stroke={1.3} />
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.slug}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <h3 className="text-xl font-bold leading-tight text-white">{active.title}</h3>
                  <p className="mt-2 line-clamp-3 text-[0.8rem] leading-relaxed text-paper/70">
                    {active.summary}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {active.scope.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[0.78rem] text-paper/80">
                        <CheckIcon className="h-3.5 w-3.5 shrink-0 text-ember" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/services/${active.slug}`}
                    onClick={onNavigate}
                    className="group mt-5 inline-flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-4 pr-1.5 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-amber"
                  >
                    Explore service
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-white transition-transform duration-500 ease-editorial group-hover:-rotate-45">
                      <ArrowIcon className="h-3 w-3" />
                    </span>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </MegaMenuShell>
  )
}
