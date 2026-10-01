import { useState } from 'react'
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Reveal from '@/components/ui/Reveal'
import TiltCard from '@/components/ui/TiltCard'
import { technicalCapabilities } from '@/data/capabilities'
import { equipmentImages, img } from '@/data/media'
import { EASE, viewportOnce } from '@/lib/motion'

const chip = {
  hidden: { opacity: 0, y: 40, rotateX: -50 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.9, ease: EASE, delay: i * 0.06 },
  }),
}

function EquipmentCard({ cap, i }) {
  const [failed, setFailed] = useState(false)
  return (
    <motion.li custom={i} variants={chip} style={{ transformPerspective: 900 }}>
      <TiltCard max={14} cardClassName="rounded-2xl">
        <div className="relative flex aspect-[4/5] flex-col justify-between rounded-2xl p-4 [transform-style:preserve-3d] sm:p-5">
          {/* Photo layer: clipped on its own so the card keeps its 3D context */}
          <div
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden rounded-2xl bg-navy-900 shadow-[0_5px_0_#030719,0_26px_36px_-20px_rgba(8,15,46,0.6)]"
          >
            {!failed && (
              <img
                src={img(equipmentImages[cap.label], 600)}
                alt=""
                loading="lazy"
                onError={() => setFailed(true)}
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-editorial group-hover:scale-110"
              />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/35 to-navy-950/10 transition-opacity duration-500 group-hover:opacity-90" />
            <span className="absolute inset-0 bg-ember/0 mix-blend-multiply transition-colors duration-500 group-hover:bg-ember/15" />
            <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 ease-editorial [background:var(--brand-gradient)] group-hover:scale-x-100" />
          </div>

          <span className="relative flex items-center justify-between [transform:translateZ(30px)]">
            <span className="rounded-full bg-navy-950/50 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-amber ring-1 ring-inset ring-white/15">
              {cap.code}
            </span>
            <span className="h-2 w-2 rounded-full bg-white/50 transition-all duration-500 group-hover:bg-amber group-hover:shadow-[0_0_12px_#ffa430]" />
          </span>
          <span className="relative text-lg font-semibold leading-tight text-white [text-shadow:0_2px_12px_rgba(3,7,25,0.6)] [transform:translateZ(45px)] sm:text-xl">
            {cap.label}
          </span>
        </div>
      </TiltCard>
    </motion.li>
  )
}

export default function TechnicalCapabilities() {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>Equipment &amp; systems</Eyebrow>
            </Reveal>
            <Reveal>
              <h2 className="mt-6 text-display-sm font-bold uppercase leading-[1.0] text-ink">
                What we build,
                <br />
                install &amp; <span className="text-ember-gradient">maintain.</span>
              </h2>
            </Reveal>
            <Reveal>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-ink-mute">
                Rotating and static equipment, pressure systems, and the piping that ties a facility together.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8 lg:self-center">
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
            >
              {technicalCapabilities.map((cap, i) => (
                <EquipmentCard key={cap.code} cap={cap} i={i} />
              ))}
            </motion.ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
