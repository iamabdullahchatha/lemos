import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import Button3D from '@/components/ui/Button3D'
import TiltCard from '@/components/ui/TiltCard'
import ServiceIcon from '@/components/icons/ServiceIcon'
import { ArrowIcon, CheckIcon } from '@/components/layout/NavIcons'
import { services } from '@/data/services'
import { pic, serviceCardImages } from '@/data/media'
import { EASE, lineChild, lineParent, viewportOnce } from '@/lib/motion'

// Cards fold up out of the page as the grid enters
const card = {
  hidden: { opacity: 0, y: 70, rotateX: 28 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 1, ease: EASE, delay: (i % 4) * 0.09 + Math.floor(i / 4) * 0.12 },
  }),
}

function ServiceCard({ service, i }) {
  const [failed, setFailed] = useState(false)
  return (
    <motion.li custom={i} variants={card} style={{ transformPerspective: 1200 }} className="h-full">
      <TiltCard
        as={Link}
        to={`/services/${service.slug}`}
        max={10}
        className="h-full"
        cardClassName="rounded-[1.75rem]"
        aria-label={service.title}
      >
        <article className="relative flex h-full min-h-[27rem] flex-col justify-between rounded-[1.75rem] p-6 [transform-style:preserve-3d] lg:min-h-[29rem]">
          {/* Clipped image layer */}
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[1.75rem] bg-navy-900 shadow-[0_40px_70px_-35px_rgba(0,0,0,0.9)]">
            {!failed && (
              <img
                {...pic(serviceCardImages[service.slug], 900)}
                decoding="async"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                alt=""
                loading="lazy"
                onError={() => setFailed(true)}
                className="h-full w-full scale-105 object-cover transition-transform duration-[1.2s] ease-editorial group-hover:scale-[1.16]"
              />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/10 transition-opacity duration-500 group-hover:opacity-95" />
            <span className="absolute inset-0 bg-gradient-to-br from-ember/0 to-ember/0 transition-colors duration-700 group-hover:from-ember/25" />
            <span className="absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/10 transition-[box-shadow] duration-500 group-hover:ring-ember/60" />
          </div>

          {/* Top row */}
          <div className="relative flex items-start justify-between [transform:translateZ(50px)]">
            <span className="grid h-14 w-14 place-items-center rounded-2xl text-white shadow-[0_5px_0_#b73a10,0_18px_30px_-12px_rgba(242,101,34,0.8)] transition-transform duration-500 ease-editorial [background:var(--brand-gradient)] group-hover:-translate-y-1 group-hover:rotate-[-8deg]">
              <ServiceIcon name={service.slug} className="h-7 w-7" stroke={1.6} />
            </span>
            <span className="index-num text-5xl text-white/30 transition-colors duration-500 group-hover:text-amber">
              {service.index}
            </span>
          </div>

          {/* Bottom content */}
          <div className="relative [transform:translateZ(40px)]">
            <h3 className="font-display text-2xl font-bold uppercase leading-[1.02] text-white">{service.title}</h3>
            <div className="grid grid-rows-[1fr] transition-[grid-template-rows,opacity] duration-500 ease-editorial lg:group-hover:grid-rows-[0fr] lg:group-hover:opacity-0">
              <p className="line-clamp-3 overflow-hidden pt-3 text-[0.92rem] leading-relaxed text-paper/70">
                {service.summary}
              </p>
            </div>

            {/* Scope revealed on hover (desktop) */}
            <div className="hidden grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-editorial lg:grid lg:group-hover:grid-rows-[1fr]">
              <ul className="overflow-hidden">
                {service.scope.map((s) => (
                  <li key={s} className="mt-2.5 flex items-start gap-2.5 text-[0.88rem] leading-snug text-paper/85 first:mt-4">
                    <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <span className="mt-6 flex items-center justify-between border-t border-white/15 pt-4 font-mono text-[0.64rem] uppercase tracking-[0.2em] text-paper/70 transition-colors group-hover:text-white">
              Explore service
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10 ring-1 ring-inset ring-white/25 transition-all duration-500 ease-editorial group-hover:-rotate-45 group-hover:bg-ember group-hover:ring-ember">
                <ArrowIcon className="h-3.5 w-3.5" />
              </span>
            </span>
          </div>
        </article>
      </TiltCard>
    </motion.li>
  )
}

export default function ServicesCards() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-24 text-paper lg:py-36">
      <span aria-hidden="true" className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_15%,transparent_65%)]" />
      <span aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-ember/10 blur-[140px]" />

      <Container className="relative">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <Reveal>
              <span className="eyebrow !text-amber inline-flex items-center gap-3">
                <span className="h-px w-8 bg-amber/60" /> Our services
              </span>
            </Reveal>
            <motion.h2
              variants={lineParent}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mt-7 text-display-lg font-bold uppercase leading-[0.95] text-white"
            >
              {['Eight disciplines.', 'One accountable team.'].map((l, i) => (
                <span key={l} className="block overflow-hidden pb-[0.04em]">
                  <motion.span variants={lineChild} className={`block ${i === 1 ? 'text-ember-gradient' : ''}`}>
                    {l}
                  </motion.span>
                </span>
              ))}
            </motion.h2>
          </div>
          <Reveal className="flex flex-col items-start gap-6 lg:max-w-sm">
            <p className="text-base leading-relaxed text-paper/65">
              From the first spool in the shop to the last bolt torqued on site, every package is planned, built and delivered by
              one team.
            </p>
            <Button3D to="/services" variant="glass" size="md">All services</Button3D>
          </Reveal>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
        >
          {services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} i={i} />
          ))}
        </motion.ul>
      </Container>
    </section>
  )
}
