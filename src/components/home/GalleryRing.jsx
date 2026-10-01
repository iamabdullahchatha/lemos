import { useRef, useState } from 'react'
import {
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'
import Reveal from '@/components/ui/Reveal'
import Button3D from '@/components/ui/Button3D'
import { pic, galleryImages } from '@/data/media'
import { EASE, lineChild, lineParent, viewportOnce } from '@/lib/motion'

const N = galleryImages.length
const STEP = 360 / N
const SPEED = 0.008 // deg per ms when idle (~45s per revolution)

function Panel({ item, i }) {
  const [failed, setFailed] = useState(false)
  return (
    <div
      className="preserve-3d absolute left-1/2 top-1/2 -ml-[calc(var(--w)/2)] -mt-[calc(var(--w)*0.65)] h-[calc(var(--w)*1.3)] w-[var(--w)]"
      style={{ transform: `rotateY(${i * STEP}deg) translateZ(calc(var(--w) * 1.42))` }}
    >
      {/* Front */}
      <figure className="backface-hidden absolute inset-0 overflow-hidden rounded-[1.5rem] bg-navy-900 shadow-[0_40px_60px_-30px_rgba(8,15,46,0.7)] ring-1 ring-black/5">
        {!failed && (
          <img
            {...pic(item.id, 700)}
            decoding="async"
            sizes="(min-width: 1024px) 22vw, 60vw"
            alt={item.label}
            loading="lazy"
            draggable="false"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
        <span className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-transparent to-transparent" />
        <figcaption className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-white">
          <span className="font-display text-lg font-bold uppercase leading-tight">{item.label}</span>
          <span className="font-mono text-[0.6rem] tracking-[0.2em] text-amber">{String(i + 1).padStart(2, '0')}</span>
        </figcaption>
      </figure>
      {/* Back */}
      <div className="backface-hidden absolute inset-0 grid place-items-center overflow-hidden rounded-[1.5rem] bg-navy-900 [transform:rotateY(180deg)]">
        <span className="grid-lines absolute inset-0 opacity-70" />
        <span className="index-num relative text-7xl text-white/15">{String(i + 1).padStart(2, '0')}</span>
      </div>
    </div>
  )
}

export default function GalleryRing() {
  const stage = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(stage, { margin: '20% 0px 20% 0px' })
  const rot = useMotionValue(0)
  const ringTransform = useTransform(rot, (r) => `rotateX(-7deg) rotateY(${r}deg)`)
  const drag = useRef({ active: false, x: 0, moved: 0 })
  const [hover, setHover] = useState(false)
  const busy = useRef(false)

  useAnimationFrame((_, dt) => {
    if (reduce || !inView || drag.current.active || busy.current) return
    rot.set(rot.get() - dt * SPEED * (hover ? 0.25 : 1))
  })

  const stepBy = (dir) => {
    busy.current = true
    const target = Math.round(rot.get() / STEP) * STEP + dir * STEP
    animate(rot, target, { duration: 0.9, ease: EASE, onComplete: () => (busy.current = false) })
  }

  const onPointerDown = (e) => {
    drag.current = { active: true, x: e.clientX, moved: 0 }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }
  const onPointerMove = (e) => {
    const d = drag.current
    if (!d.active) return
    const dx = e.clientX - d.x
    d.x = e.clientX
    d.moved += Math.abs(dx)
    rot.set(rot.get() + dx * 0.3)
  }
  const onPointerUp = () => {
    drag.current.active = false
  }

  return (
    <section className="relative overflow-hidden bg-paper-warm py-24 lg:py-32">
      <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-[120px]" />

      <Container className="relative">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>In the field</Eyebrow>
            </Reveal>
            <motion.h2
              variants={lineParent}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="mt-7 text-display-lg font-bold uppercase leading-[0.95] text-ink"
            >
              {['Shop floor', 'to live plant.'].map((l, i) => (
                <span key={l} className="block overflow-hidden pb-[0.04em]">
                  <motion.span variants={lineChild} className={`block ${i === 1 ? 'text-ember-gradient' : ''}`}>
                    {l}
                  </motion.span>
                </span>
              ))}
            </motion.h2>
          </div>
          <Reveal className="flex items-center gap-3">
            <Button3D
              variant="outline"
              size="md"
              aria-label="Previous image"
              onClick={() => stepBy(1)}
              icon={<span className="block rotate-180"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>}
            >
              Prev
            </Button3D>
            <Button3D variant="dark" size="md" aria-label="Next image" onClick={() => stepBy(-1)}>
              Next
            </Button3D>
          </Reveal>
        </div>
      </Container>

      {/* 3D stage */}
      <div
        ref={stage}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
        onPointerLeave={() => setHover(false)}
        className="relative mt-10 h-[calc(var(--w)*1.3_+_9rem)] cursor-grab touch-pan-y select-none [--w:clamp(9.5rem,19vw,17rem)] active:cursor-grabbing lg:mt-14"
      >
        {/* Fade wrapper holds the perspective; the ring below is the 3D root,
            so the opacity animation never flattens it */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.4, ease: EASE }}
          className="absolute inset-0 [perspective:1800px]"
        >
          <motion.div style={{ transform: ringTransform }} className="preserve-3d absolute inset-0">
            {galleryImages.map((item, i) => (
              <Panel key={item.id} item={item} i={i} />
            ))}
          </motion.div>
        </motion.div>
        {/* Floor shadow */}
        <span aria-hidden="true" className="pointer-events-none absolute bottom-2 left-1/2 h-10 w-[min(70vw,48rem)] -translate-x-1/2 rounded-[100%] bg-navy-950/20 blur-2xl" />
      </div>

      <p className="relative mt-2 text-center font-mono text-[0.62rem] uppercase tracking-[0.24em] text-ink-faint">
        Drag to rotate
      </p>
    </section>
  )
}
