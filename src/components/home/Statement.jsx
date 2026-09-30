import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import Eyebrow from '@/components/ui/Eyebrow'
import ParallaxImage from '@/components/ui/ParallaxImage'
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
              <div className="relative">
                <ParallaxImage
                  src={img(media.statement, 1400)}
                  alt="Oil & gas process facility"
                  ratio="4/5"
                  speed={60}
                  className="w-full"
                />
                <div className="absolute -bottom-4 -left-4 hidden bg-ember px-5 py-4 lg:block">
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white">
                    Fig. 01 — Process facility
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
