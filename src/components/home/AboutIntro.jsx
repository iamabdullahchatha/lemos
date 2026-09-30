import { Link } from 'react-router-dom'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Reveal from '@/components/ui/Reveal'
import ParallaxImage from '@/components/ui/ParallaxImage'
import AnimatedLine from '@/components/ui/AnimatedLine'
import { img, media } from '@/data/media'

export default function AboutIntro() {
  return (
    <section className="bg-paper py-24 lg:py-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Image column (offset, editorial) */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative lg:-mt-8">
                <ParallaxImage
                  src={img(media.about, 1200)}
                  alt="Engineer reviewing plans on an industrial site"
                  ratio="3/4"
                  speed={70}
                  className="w-full"
                />
                <div className="absolute -right-4 -top-4 hidden border border-line bg-paper px-5 py-4 lg:block">
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-ink-mute">
                    Est. capability
                  </span>
                  <p className="mt-1 font-display text-2xl font-bold text-ink">
                    End to end
                  </p>
                </div>
              </div>
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
              <Link
                to="/about"
                className="group mt-10 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:text-ember"
              >
                <span className="h-px w-8 bg-ember transition-all duration-400 ease-editorial group-hover:w-12" />
                More about Lemos
                <span className="transition-transform duration-400 ease-editorial group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}
