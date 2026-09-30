import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Reveal from '@/components/ui/Reveal'
import ServiceIcon from '@/components/icons/ServiceIcon'
import { services } from '@/data/services'
import { serviceImages, img } from '@/data/media'
import { EASE } from '@/lib/motion'

export default function CapabilitiesShowcase() {
  const [active, setActive] = useState(0)
  const current = services[active]

  return (
    <section className="relative overflow-hidden bg-navy-900 py-24 text-paper lg:py-32">
      <Container className="relative">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow className="!text-amber [&>span]:bg-amber/60">Capabilities</Eyebrow>
            </Reveal>
            <Reveal>
              <h2 className="mt-6 text-display-md font-bold uppercase leading-[0.98] text-white">
                Eight disciplines.
                <br />
                One accountable team.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link
              to="/services"
              className="font-mono text-xs uppercase tracking-[0.18em] text-paper/70 transition-colors hover:text-amber link-underline"
            >
              All services →
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* List */}
          <ul className="lg:col-span-7">
            {services.map((s, i) => (
              <li key={s.slug}>
                <Link
                  to={`/services/${s.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group relative block border-b border-white/12 py-6"
                >
                  {/* growing accent line */}
                  <span
                    className={`absolute left-0 top-0 h-[2px] bg-ember transition-all duration-500 ease-editorial ${
                      active === i ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                  <div className="flex items-center gap-5">
                    <span
                      className={`font-mono text-sm transition-colors duration-300 ${
                        active === i ? 'text-amber' : 'text-paper/40'
                      }`}
                    >
                      {s.index}
                    </span>
                    <span
                      className={`transition-colors duration-300 ${
                        active === i ? 'text-amber' : 'text-paper/50'
                      }`}
                    >
                      <ServiceIcon name={s.slug} className="h-6 w-6" />
                    </span>
                    <span
                      className={`flex-1 text-2xl font-semibold transition-all duration-400 ease-editorial md:text-3xl ${
                        active === i
                          ? 'translate-x-1 text-white'
                          : 'text-paper/70 group-hover:translate-x-1 group-hover:text-white'
                      }`}
                    >
                      {s.title}
                    </span>
                    <span
                      className={`text-xl transition-all duration-400 ease-editorial ${
                        active === i
                          ? 'translate-x-0 text-ember opacity-100'
                          : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                      }`}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Sticky preview */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] overflow-hidden border border-white/10 bg-navy-950">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current.slug}
                    src={img(serviceImages[current.slug], 1000)}
                    alt={current.title}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </AnimatePresence>
                <span className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <div className="flex items-center justify-between">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={current.index}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                        className="font-display text-5xl font-bold text-white"
                      >
                        {current.index}
                      </motion.span>
                    </AnimatePresence>
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-amber">
                      Capability
                    </span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={current.slug}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="max-w-xs text-sm leading-relaxed text-paper/85"
                    >
                      {current.summary}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
