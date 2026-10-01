import Container from '@/components/ui/Container'
import Button3D from '@/components/ui/Button3D'
import TiltCard from '@/components/ui/TiltCard'
import ServiceIcon from '@/components/icons/ServiceIcon'
import Eyebrow from '@/components/ui/Eyebrow'
import Reveal from '@/components/ui/Reveal'
import ParallaxImage from '@/components/ui/ParallaxImage'
import AnimatedLine from '@/components/ui/AnimatedLine'
import { pic, media } from '@/data/media'

export default function AboutIntro() {
  return (
    <section className="bg-paper py-24 lg:py-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Image column (offset, editorial) */}
          <div className="lg:col-span-5">
            <Reveal>
              <TiltCard max={7} cardClassName="rounded-[1.75rem]" className="lg:-mt-8">
                <div className="relative [transform-style:preserve-3d]">
                  <div className="overflow-hidden rounded-[1.75rem] shadow-[0_50px_90px_-40px_rgba(8,15,46,0.55)]">
                    <ParallaxImage
                      {...pic(media.homeAbout, 1200)}
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      alt="Engineers reviewing plans on an industrial site"
                      ratio="3/4"
                      speed={70}
                      className="w-full"
                    />
                  </div>
                  <div className="absolute -right-3 -top-5 rounded-2xl bg-white px-5 py-4 ring-1 ring-line shadow-[0_6px_0_#d9d4c8,0_30px_50px_-20px_rgba(8,15,46,0.45)] [transform:translateZ(70px)] sm:-right-5">
                    <span className="font-mono text-[0.58rem] uppercase tracking-[0.22em] text-ink-mute">Capability</span>
                    <p className="mt-1 font-display text-2xl font-bold text-ink">End to end</p>
                  </div>
                  <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-navy-950 px-4 py-3 text-white shadow-[0_6px_0_#030719,0_26px_44px_-16px_rgba(8,15,46,0.7)] [transform:translateZ(50px)]">
                    <span className="grid h-9 w-9 place-items-center rounded-xl text-white [background:var(--brand-gradient)]">
                      <ServiceIcon name="oilgas" className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-[0.6rem] uppercase leading-snug tracking-[0.2em] text-paper/80">
                      Oil &amp; gas
                      <br />
                      specialists
                    </span>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          </div>

          {/* Copy column */}
          <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
            <Reveal>
              <Eyebrow>Who we are</Eyebrow>
            </Reveal>
            <Reveal>
              <h2 className="mt-6 text-display-md font-bold uppercase leading-[1.0] text-ink">
                An engineering partner for the{' '}
                <span className="text-ember-gradient">world&apos;s hardest</span> environments.
              </h2>
            </Reveal>

            <div className="mt-8 max-w-xl">
              <AnimatedLine />
              <Reveal>
                <p className="mt-8 text-lg leading-relaxed text-ink-mute">
                  Lemos International delivers mechanical contracting and fabrication
                  for the oil &amp; gas sector — from engineering and pipe fabrication
                  to structural steel, equipment installation, and plant maintenance.
                </p>
              </Reveal>
              <Reveal>
                <p className="mt-5 text-lg leading-relaxed text-ink-mute">
                  Our work spans the full project lifecycle: planning and engineering,
                  shop fabrication, on-site installation, testing, and ongoing
                  maintenance — executed with a safety-first discipline that keeps
                  demanding facilities running.
                </p>
              </Reveal>
            </div>

            <Reveal>
              <div className="mt-10">
                <Button3D to="/about" variant="dark" size="lg">More about Lemos</Button3D>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
