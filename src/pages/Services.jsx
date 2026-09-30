import { Link } from 'react-router-dom'
import PageHeader from '@/components/layout/PageHeader'
import Container from '@/components/ui/Container'
import Reveal from '@/components/ui/Reveal'
import { services } from '@/data/services'

export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Capabilities"
        title="Services"
        intro="Eight mechanical engineering disciplines, delivered under one accountable team — from fabrication shop to live facility."
        meta={['01 — 08', 'Oil & Gas', 'International']}
      />
      <section className="bg-paper pb-28">
        <Container>
          <div className="border-t border-line">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.05}>
                <Link
                  to={`/services/${s.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-line py-8 transition-colors hover:bg-ink/[0.02]"
                >
                  <span className="font-mono text-sm text-ember">{s.index}</span>
                  <span className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-10">
                    <span className="text-2xl font-semibold text-ink md:text-3xl">
                      {s.title}
                    </span>
                    <span className="max-w-xl text-sm text-ink-mute">
                      {s.summary}
                    </span>
                  </span>
                  <span className="text-ink-faint transition-all duration-500 ease-editorial group-hover:translate-x-1 group-hover:text-ember">
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
