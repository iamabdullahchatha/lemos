import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Reveal from '@/components/ui/Reveal'
import ParallaxImage from '@/components/ui/ParallaxImage'
import { img, media } from '@/data/media'

const Scene3D = lazy(() => import('./Scene3D'))

// Only render WebGL when it will perform + be welcome:
// desktop-ish viewport, pointer present, motion allowed.
function useCanRender3D() {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const wide = window.matchMedia('(min-width: 1024px)').matches
    const fine = window.matchMedia('(pointer: fine)').matches
    let gl = false
    try {
      const c = document.createElement('canvas')
      gl = !!(c.getContext('webgl2') || c.getContext('webgl'))
    } catch {
      gl = false
    }
    setOk(!reduce && wide && fine && gl)
  }, [])
  return ok
}

export default function IndustrialExperience() {
  const ref = useRef(null)
  const can3D = useCanRender3D()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const labelY = useTransform(scrollYProgress, [0, 1], ['12%', '-12%'])

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-navy-950 py-24 text-paper lg:py-32"
    >
      {/* faint technical backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Copy */}
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow className="!text-amber [&>span]:bg-amber/60">
                Built to spec
              </Eyebrow>
            </Reveal>
            <Reveal>
              <h2 className="mt-6 text-display-md font-bold uppercase leading-[0.98] text-white">
                Modular skids,
                <br />
                engineered whole.
              </h2>
            </Reveal>
            <Reveal>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-paper/75">
                Vessels, piping, valves, and structural steel — designed, fabricated,
                and assembled as complete process packages, then delivered ready to
                commission.
              </p>
            </Reveal>

            <Reveal>
              <ul className="mt-10 space-y-3 font-mono text-xs uppercase tracking-[0.14em] text-paper/60">
                {['Pressure vessels', 'Process piping', 'Structural skids'].map((t, i) => (
                  <li key={t} className="flex items-center gap-3">
                    <span className="text-amber">{String(i + 1).padStart(2, '0')}</span>
                    <span className="h-px w-6 bg-white/20" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* 3D / fallback stage */}
          <div className="relative lg:col-span-7">
            <motion.span
              style={{ y: labelY }}
              aria-hidden="true"
              className="pointer-events-none absolute -left-4 top-0 z-0 select-none font-display text-[7rem] font-bold leading-none text-white/[0.04] lg:text-[10rem]"
            >
              04
            </motion.span>

            <div className="relative z-10 aspect-[4/3] w-full">
              {can3D ? (
                <Suspense
                  fallback={
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-paper/40">
                        Rendering model…
                      </span>
                    </div>
                  }
                >
                  <Scene3D progress={scrollYProgress} />
                </Suspense>
              ) : (
                <div className="relative h-full w-full overflow-hidden border border-white/10">
                  <ParallaxImage
                    src={img(media.statement, 1400)}
                    alt="Fabricated process skid and piping assembly"
                    ratio="4/3"
                    speed={40}
                    className="h-full w-full"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                </div>
              )}
            </div>

            <div className="relative z-10 mt-4 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.2em] text-paper/40">
              <span>Fig. 04 — Process skid assembly</span>
              <span className="hidden sm:inline">Rev · A</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
