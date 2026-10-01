import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ServiceIcon from '@/components/icons/ServiceIcon'
import { industries, industryDetail } from '@/data/industries'
import { services, getService } from '@/data/services'
import { industryImages, img } from '@/data/media'
import { EASE } from '@/lib/motion'
import MegaMenuShell, { MegaFooter, MegaIntro, listVariants, rowVariants } from './MegaMenuShell'
import { ArrowIcon } from './NavIcons'

const preview = (slug) => img(industryImages[slug], 1000)

export default function IndustriesMenu({ onNavigate }) {
  const [active, setActive] = useState(industries[0])
  const detail = industryDetail[active.slug]

  useEffect(() => {
    industries.forEach((ind) => {
      new Image().src = preview(ind.slug)
    })
  }, [])

  return (
    <MegaMenuShell
      footer={
        <MegaFooter
          note="Mechanical contracting across the energy value chain"
          cta={{ label: 'Tell us about your facility', to: '/contact' }}
          onNavigate={onNavigate}
        />
      }
    >
      <div className="grid lg:grid-cols-12">
        <MegaIntro
          eyebrow="Sectors"
          title="Built for energy & heavy industry."
          body="From upstream facilities to refinery turnarounds — the sectors where our mechanical teams deliver."
          stats={[
            { label: 'Sectors', value: String(industries.length).padStart(2, '0') },
            { label: 'Services', value: String(services.length).padStart(2, '0') },
          ]}
          link={{ label: 'All industries', to: '/industries' }}
          onNavigate={onNavigate}
        />

        {/* List */}
        <div className="p-6 lg:col-span-5 xl:col-span-4 xl:p-7">
          <div className="mb-4 flex items-center justify-between px-3">
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-paper/45">
              Industries we serve
            </span>
            <Link
              to="/industries"
              onClick={onNavigate}
              className="group inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-amber transition-colors hover:text-white xl:hidden"
            >
              View all
              <ArrowIcon className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <motion.ul variants={listVariants} initial="hidden" animate="show" className="space-y-1">
            {industries.map((ind) => {
              const isActive = active.slug === ind.slug
              return (
                <motion.li key={ind.slug} variants={rowVariants}>
                  <Link
                    to="/industries"
                    onClick={onNavigate}
                    onMouseEnter={() => setActive(ind)}
                    onFocus={() => setActive(ind)}
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
                      <ServiceIcon name={ind.icon} className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline gap-2">
                        <span className="font-mono text-[0.6rem] text-amber/80">{ind.index}</span>
                        <span className="text-[0.92rem] font-semibold text-white">{ind.title}</span>
                      </span>
                      <span className="mt-0.5 block truncate text-[0.75rem] text-paper/45">
                        {ind.description}
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
        <div className="hidden p-3 pl-0 lg:col-span-7 lg:block xl:col-span-5">
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
            <span className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/75 to-navy-950/10" />
            <span className="absolute inset-0 bg-gradient-to-r from-navy-950/70 to-transparent" />

            <div className="relative flex h-full flex-col justify-between p-7">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-navy-950/60 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-amber ring-1 ring-inset ring-white/15 backdrop-blur-md">
                  Sector {active.index} / {String(industries.length).padStart(2, '0')}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-950/60 text-amber ring-1 ring-inset ring-white/15 backdrop-blur-md">
                  <ServiceIcon name={active.icon} className="h-5 w-5" stroke={1.3} />
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
                  <h3 className="text-2xl font-bold leading-tight text-white">{active.title}</h3>
                  <p className="mt-2 max-w-sm text-[0.85rem] leading-relaxed text-paper/70">
                    {active.description}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {detail.applications.map((a) => (
                      <li
                        key={a}
                        className="rounded-full bg-white/[0.08] px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-paper/80 ring-1 ring-inset ring-white/15 backdrop-blur-sm"
                      >
                        {a}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 border-t border-white/10 pt-4">
                    <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-paper/45">
                      Relevant services
                    </span>
                    <div className="mt-2.5 grid gap-x-4 gap-y-1.5 sm:grid-cols-2">
                      {detail.services.map((slug) => {
                        const s = getService(slug)
                        if (!s) return null
                        return (
                          <Link
                            key={slug}
                            to={`/services/${slug}`}
                            onClick={onNavigate}
                            className="group flex items-center gap-2 text-[0.8rem] text-paper/85 transition-colors hover:text-amber"
                          >
                            <ServiceIcon name={slug} className="h-4 w-4 shrink-0 text-ember" />
                            <span className="truncate">{s.title}</span>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </MegaMenuShell>
  )
}
