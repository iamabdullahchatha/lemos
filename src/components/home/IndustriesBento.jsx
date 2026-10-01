import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Reveal from '@/components/ui/Reveal'
import Button3D from '@/components/ui/Button3D'
import TiltCard from '@/components/ui/TiltCard'
import ServiceIcon from '@/components/icons/ServiceIcon'
import { ArrowIcon } from '@/components/layout/NavIcons'
import { industries, industryDetail } from '@/data/industries'
import { img, industryCardImages } from '@/data/media'
import { EASE, lineChild, lineParent, viewportOnce } from '@/lib/motion'

// Bento placement (desktop 12-col, 2 rows); feature tile first
const layout = {
  'oil-gas': 'md:col-span-2 lg:col-span-5 lg:row-span-2',
  petrochemical: 'lg:col-span-4',
  refineries: 'lg:col-span-3',
  'energy-power': 'lg:col-span-3',
  industrial: 'md:col-span-2 lg:col-span-4',
}

const tile = {
  hidden: (i) => ({ opacity: 0, scale: 0.9, rotateY: i % 2 ? 18 : -18, y: 40 }),
  show: (i) => ({
    opacity: 1,
    scale: 1,
    rotateY: 0,
    y: 0,
    transition: { duration: 1.1, ease: EASE, delay: i * 0.1 },
  }),
}

function IndustryTile({ ind, i }) {
  const [failed, setFailed] = useState(false)
  const feature = i === 0
  const apps = industryDetail[ind.slug]?.applications || []

  return (
    <motion.li custom={i} variants={tile} style={{ transformPerspective: 1400 }} className={`${feature ? 'min-h-[27rem]' : 'min-h-[21rem]'} lg:min-h-0 ${layout[ind.slug]}`}>
      <TiltCard as={Link} to={`/industries/${ind.slug}`} max={feature ? 6 : 9} className="h-full" cardClassName="rounded-[1.75rem]" aria-label={ind.title}>
        <article className="relative flex h-full flex-col justify-between gap-8 rounded-[1.75rem] p-6 [transform-style:preserve-3d] sm:p-7">
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[1.75rem] bg-navy-900 shadow-[0_40px_70px_-38px_rgba(8,15,46,0.75)]">
            {!failed && (
              <img
                src={img(industryCardImages[ind.slug], feature ? 1400 : 1000)}
                alt=""
                loading="lazy"
                onError={() => setFailed(true)}
                className="h-full w-full object-cover transition-transform duration-[1.4s] ease-editorial group-hover:scale-110"
              />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/60 to-navy-950/10" />
            <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-700 ease-editorial [background:var(--brand-gradient)] group-hover:scale-x-100" />
          </div>

          <div className="relative flex items-start justify-between [transform:translateZ(55px)]">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/90 text-navy-950 shadow-[0_5px_0_rgba(255,255,255,0.35),0_18px_30px_-12px_rgba(0,0,0,0.7)] backdrop-blur transition-all duration-500 ease-editorial group-hover:-translate-y-1 group-hover:bg-ember group-hover:text-white group-hover:shadow-[0_5px_0_#b73a10,0_18px_30px_-12px_rgba(242,101,34,0.8)]">
              <ServiceIcon name={ind.icon} className="h-6 w-6" stroke={1.6} />
            </span>
            <span className="rounded-full bg-navy-950/40 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-white/80 ring-1 ring-inset ring-white/20 backdrop-blur">
              Sector {ind.index}
            </span>
          </div>

          <div className="relative [transform:translateZ(45px)]">
            <h3 className={`font-display font-bold uppercase leading-[0.98] text-white ${feature ? 'text-display-sm' : 'text-2xl'}`}>
              {ind.title}
            </h3>
            <div
              className={`grid grid-rows-[1fr] transition-[grid-template-rows,opacity] duration-500 ease-editorial ${
                feature ? '' : 'lg:group-hover:grid-rows-[0fr] lg:group-hover:opacity-0'
              }`}
            >
              <p className="max-w-sm overflow-hidden pt-3 text-[0.92rem] leading-relaxed text-paper/75">{ind.description}</p>
            </div>

            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-editorial group-hover:grid-rows-[1fr] max-lg:grid-rows-[1fr]">
              <ul className="flex flex-wrap gap-2 overflow-hidden">
                {apps.map((a) => (
                  <li
                    key={a}
                    className="mt-4 rounded-full bg-white/10 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-paper/85 ring-1 ring-inset ring-white/20 backdrop-blur"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <span className="mt-5 inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-amber opacity-80 transition-opacity group-hover:opacity-100">
              View sector
              <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-500 ease-editorial group-hover:translate-x-1" />
            </span>
          </div>
        </article>
      </TiltCard>
    </motion.li>
  )
}

export default function IndustriesBento() {
  return (
    <section className="relative overflow-hidden bg-paper-warm py-24 lg:py-36">
      <span aria-hidden="true" className="grid-lines-ink pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black_10%,transparent_60%)]" />

      <Container className="relative">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <Reveal>
              <Eyebrow>Industries</Eyebrow>
            </Reveal>
            <motion.h2
              variants={lineParent}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mt-7 text-display-lg font-bold uppercase leading-[0.95] text-ink"
            >
              {['Built for the sectors', 'that never stop.'].map((l, i) => (
                <span key={l} className="block overflow-hidden pb-[0.04em]">
                  <motion.span variants={lineChild} className={`block ${i === 1 ? 'text-ember-gradient' : ''}`}>
                    {l}
                  </motion.span>
                </span>
              ))}
            </motion.h2>
          </div>
          <Reveal className="flex flex-col items-start gap-6 lg:max-w-sm">
            <p className="text-base leading-relaxed text-ink-mute">
              Hydrocarbons, process plants and power assets demand contractors who understand live facilities, tight
              windows and zero-compromise safety.
            </p>
            <Button3D to="/industries" variant="dark" size="md">Explore industries</Button3D>
          </Reveal>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          className="mt-16 grid gap-5 md:grid-cols-2 lg:mt-20 lg:auto-rows-[19rem] lg:grid-cols-12"
        >
          {industries.map((ind, i) => (
            <IndustryTile key={ind.slug} ind={ind} i={i} />
          ))}
        </motion.ul>
      </Container>
    </section>
  )
}
