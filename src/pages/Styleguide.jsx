import PageHeader from '@/components/layout/PageHeader'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import Eyebrow from '@/components/ui/Eyebrow'
import PremiumButton from '@/components/ui/PremiumButton'
import MagneticButton from '@/components/ui/MagneticButton'
import TechnicalLabel from '@/components/ui/TechnicalLabel'
import SectionNumber from '@/components/ui/SectionNumber'
import AnimatedLine from '@/components/ui/AnimatedLine'
import ImageReveal from '@/components/ui/ImageReveal'
import ParallaxImage from '@/components/ui/ParallaxImage'
import CountUp from '@/components/ui/CountUp'
import TechnicalGrid from '@/components/ui/TechnicalGrid'

function Block({ n, title, children }) {
  return (
    <section className="border-t border-line py-16 lg:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <div className="flex items-baseline gap-4">
              <SectionNumber>{n}</SectionNumber>
            </div>
            <h2 className="mt-4 text-display-sm font-bold text-ink">{title}</h2>
          </div>
          <div className="lg:col-span-9">{children}</div>
        </div>
      </Container>
    </section>
  )
}

const swatches = [
  ['Paper', 'bg-paper border border-line', 'text-ink'],
  ['Warm white', 'bg-paper-warm border border-line', 'text-ink'],
  ['Navy 900', 'bg-navy-900', 'text-paper'],
  ['Navy 700', 'bg-navy-700', 'text-paper'],
  ['Engineering blue', 'bg-navy-500', 'text-paper'],
  ['Ember', 'bg-ember', 'text-white'],
  ['Ember 400', 'bg-ember-400', 'text-white'],
  ['Amber', 'bg-amber', 'text-ink'],
  ['Steel', 'bg-ink-mute', 'text-white'],
  ['Graphite', 'bg-ink-soft', 'text-white'],
  ['Ink', 'bg-ink', 'text-paper'],
]

export default function Styleguide() {
  return (
    <>
      <PageHeader
        eyebrow="Design system"
        title="Visual Language"
        intro="The complete Lemos International design system — typography, color, engineering detail, motion, and reusable components."
        meta={['Foundation', 'v0.1', 'Internal']}
      />

      {/* Typography */}
      <Block n="01" title="Typography">
        <div className="space-y-8">
          <div>
            <TechnicalLabel code="DISPLAY / SPACE GROTESK">Display XL</TechnicalLabel>
            <p className="mt-3 text-display-xl font-bold uppercase text-ink">
              Precision
            </p>
          </div>
          <AnimatedLine />
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <TechnicalLabel code="H1">Heading 1</TechnicalLabel>
              <p className="mt-2 text-display-lg font-bold text-ink">Engineering</p>
            </div>
            <div>
              <TechnicalLabel code="H2">Heading 2</TechnicalLabel>
              <p className="mt-2 text-display-md font-bold text-ink">Reliability</p>
            </div>
            <div>
              <TechnicalLabel code="H3">Heading 3</TechnicalLabel>
              <p className="mt-2 text-display-sm font-semibold text-ink">
                Technical expertise
              </p>
            </div>
            <div>
              <TechnicalLabel code="BODY / INTER">Body</TechnicalLabel>
              <p className="mt-2 max-w-sm text-lg leading-relaxed text-ink-mute">
                Mechanical contracting and fabrication delivered to the highest
                industrial standards.
              </p>
            </div>
          </div>
          <AnimatedLine />
          <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
            <div>
              <TechnicalLabel code="LABEL / IBM PLEX MONO">Technical label</TechnicalLabel>
              <p className="eyebrow mt-2">Section · Coordinate · Spec</p>
            </div>
            <div>
              <TechnicalLabel>Caption</TechnicalLabel>
              <p className="mt-2 text-sm text-ink-faint">Fig. 01 — Pipe spool</p>
            </div>
          </div>
        </div>
      </Block>

      {/* Color */}
      <Block n="02" title="Color">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {swatches.map(([name, bg, text]) => (
            <div key={name} className={`flex h-28 flex-col justify-end p-4 ${bg}`}>
              <span className={`font-mono text-[0.68rem] uppercase tracking-[0.14em] ${text}`}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </Block>

      {/* Engineering detail */}
      <Block n="03" title="Engineering detail">
        <div className="space-y-8">
          <div className="flex flex-wrap gap-6">
            <TechnicalLabel code="LX·01">Coordinate mark</TechnicalLabel>
            <TechnicalLabel code="N 24°">Annotation</TechnicalLabel>
            <TechnicalLabel>Micro label</TechnicalLabel>
          </div>
          <div className="relative h-56 overflow-hidden border border-line bg-paper-warm">
            <TechnicalGrid />
            <div className="relative flex h-full items-center justify-center">
              <span className="eyebrow">Technical grid + coordinate marks</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="h-px w-16 bg-ember" />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-mute">
              Orange accent line
            </span>
          </div>
        </div>
      </Block>

      {/* Motion + components */}
      <Block n="04" title="Buttons & motion">
        <div className="space-y-10">
          <div className="flex flex-wrap items-center gap-4">
            <PremiumButton variant="ember">Ember</PremiumButton>
            <PremiumButton variant="solid">Solid</PremiumButton>
            <PremiumButton variant="outline">Outline</PremiumButton>
            <PremiumButton variant="ghost">Ghost link</PremiumButton>
            <MagneticButton variant="ember">Magnetic</MagneticButton>
          </div>
          <AnimatedLine />
          <div className="grid gap-10 sm:grid-cols-3">
            {[
              [120, '+', 'Projects delivered'],
              [40, '', 'Disciplines'],
              [99, '%', 'Safety focus'],
            ].map(([v, s, label]) => (
              <div key={label}>
                <p className="text-display-md font-bold text-ink">
                  <CountUp value={v} suffix={s} />
                </p>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-ink-faint">
                  {label}
                </p>
              </div>
            ))}
          </div>
          <p className="max-w-xl text-sm text-ink-faint">
            Note: figures above are placeholders demonstrating the number-count
            primitive, not verified company statistics.
          </p>
        </div>
      </Block>

      {/* Image primitives */}
      <Block n="05" title="Image primitives">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <TechnicalLabel code="CLIP REVEAL + ZOOM">ImageReveal</TechnicalLabel>
            <div className="mt-3">
              <ImageReveal ratio="4/3" />
            </div>
          </div>
          <div>
            <TechnicalLabel code="SCROLL PARALLAX">ParallaxImage</TechnicalLabel>
            <div className="mt-3">
              <ParallaxImage ratio="4/3" />
            </div>
          </div>
        </div>
      </Block>
    </>
  )
}
