import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import Eyebrow from '@/components/ui/Eyebrow'
import ParallaxImage from '@/components/ui/ParallaxImage'
import TiltCard from '@/components/ui/TiltCard'
import AnimatedLine from '@/components/ui/AnimatedLine'
import { motion } from 'framer-motion'
import { lineParent, lineChild, viewportOnce } from '@/lib/motion'
import { img, media } from '@/data/media'

const WORDS = ['Engineering.', 'Fabrication.', 'Execution.']

export default function Statement() {
  return (
    <section className="bg-paper py-24 lg:py-36">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Text */}
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>What we do</Eyebrow>
            </Reveal>
            <motion.h2
              variants={lineParent}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mt-7 text-display-lg font-bold uppercase leading-[0.95] text-ink"
            >
              {WORDS.map((w, i) => (
                <span key={w} className="block overflow-hidden pb-[0.04em]">
                  <motion.span
                    variants={lineChild}
                    className={`block ${i === 1 ? 'text-ember-gradient' : ''}`}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </motion.h2>

            <div className="mt-10 max-w-md">
              <AnimatedLine />
              <Reveal>
                <p className="mt-8 text-lg leading-relaxed text-ink-mute">
                  From the fabrication shop to the live facility, Lemos International
                  carries mechanical projects end to end — engineered precisely, built
                  to code, and executed safely at industrial scale.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Image */}
          <div className="lg:col-span-6">
            <Reveal>
              <TiltCard max={7} cardClassName="rounded-[1.75rem]">
                <div className="relative [transform-style:preserve-3d]">
                  <div className="overflow-hidden rounded-[1.75rem] shadow-[0_50px_90px_-40px_rgba(8,15,46,0.55)]">
                    <ParallaxImage
                      src={img(media.statement, 1400)}
                      alt="Fabricator cutting steel in the workshop, sparks flying"
                      ratio="4/5"
                      speed={60}
                      className="w-full"
                    />
                  </div>
                  <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-gradient-to-t from-navy-950/30 via-transparent to-transparent" />

                  {/* Depth layers */}
                  <div className="absolute -bottom-5 left-5 rounded-2xl px-5 py-4 text-white shadow-[0_6px_0_#b73a10,0_24px_40px_-14px_rgba(242,101,34,0.7)] [background:var(--brand-gradient)] [transform:translateZ(70px)] sm:-left-5">
                    <span className="block font-mono text-[0.58rem] uppercase tracking-[0.22em] text-white/75">Fig. 01</span>
                    <span className="mt-1 block font-display text-lg font-bold">Shop fabrication</span>
                  </div>
                  <div className="absolute right-5 top-5 hidden rounded-full bg-white/90 px-4 py-2 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-navy-950 shadow-[0_18px_30px_-12px_rgba(8,15,46,0.6)] backdrop-blur [transform:translateZ(45px)] sm:block">
                    Shop → Site → Service
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
