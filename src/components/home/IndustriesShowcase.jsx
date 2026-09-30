import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Reveal from '@/components/ui/Reveal'
import ServiceIcon from '@/components/icons/ServiceIcon'
import { industries } from '@/data/industries'
import { industryImages, img } from '@/data/media'
import { EASE } from '@/lib/motion'

export default function IndustriesShowcase() {
  const [active, setActive] = useState(0)
  const current = industries[active]

  return (
    <section className="relative overflow-hidden bg-navy-950 text-paper">
      {/* Changing background image */}
      <AnimatePresence>
        <motion.div
          key={current.slug}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="absolute inset-0"
        >
          <img
            src={img(industryImages[current.slug], 2000)}
            alt=""
            aria-hidden="true"
            onError={(e) => (e.currentTarget.style.opacity = '0')}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
      <span className="absolute inset-0 bg-navy-950/78" />
      <span className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/60 to-transparent" />

      <Container className="relative z-10 py-24 lg:py-32">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow className="!text-amber [&>span]:bg-amber/60">Sectors we serve</Eyebrow>
          </Reveal>
          <Reveal>
            <h2 className="mt-6 text-display-md font-bold uppercase leading-[0.98] text-white">
              Where our work
              <br />
              keeps running.
            </h2>
          </Reveal>
        </div>

        <ul className="mt-14 max-w-3xl">
          {industries.map((ind, i) => (
            <li key={ind.slug}>
              <Link
                to="/industries"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group flex items-center gap-6 border-b border-white/12 py-6"
              >
                <span
                  className={`font-mono text-sm transition-colors duration-300 ${
                    active === i ? 'text-amber' : 'text-paper/40'
                  }`}
                >
                  {ind.index}
                </span>
                <span
                  className={`transition-colors duration-300 ${
                    active === i ? 'text-amber' : 'text-paper/45'
                  }`}
                >
                  <ServiceIcon name={ind.icon} className="h-7 w-7" />
                </span>
                <span className="flex-1">
                  <span
                    className={`block text-2xl font-semibold transition-all duration-400 ease-editorial md:text-4xl ${
                      active === i
                        ? 'translate-x-1 text-white'
                        : 'text-paper/65 group-hover:translate-x-1 group-hover:text-white'
                    }`}
                  >
                    {ind.title}
                  </span>
                  <AnimatePresence mode="wait">
                    {active === i && (
                      <motion.span
                        key={ind.slug}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-1 block text-sm text-paper/60"
                      >
                        {ind.description}
                      </motion.span>
                    )}
                  </AnimatePresence>
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
              </Link>
            </li>
          ))}
        </ul>

        <Reveal>
          <Link
            to="/industries"
            className="group mt-10 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-paper/70 transition-colors hover:text-amber"
          >
            <span className="h-px w-8 bg-amber transition-all duration-400 ease-editorial group-hover:w-12" />
            Explore all sectors
            <span className="transition-transform duration-400 ease-editorial group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </Container>
    </section>
  )
}
