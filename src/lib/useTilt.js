import { useRef } from 'react'
import {
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'

// Cursor-driven 3D tilt. Returns spring rotations plus a glare gradient that
// tracks the pointer. Only reacts to a real mouse (touch and pen are ignored)
// and is fully disabled under prefers-reduced-motion.
export default function useTilt({ max = 10, stiffness = 240, damping = 20, glareOpacity = 0.35 } = {}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness, damping, mass: 0.5 })
  const sy = useSpring(py, { stiffness, damping, mass: 0.5 })
  const hover = useSpring(0, { stiffness: 200, damping: 26 })

  const rotateY = useTransform(sx, [0, 1], [-max, max])
  const rotateX = useTransform(sy, [0, 1], [max, -max])
  const gx = useTransform(sx, (v) => `${v * 100}%`)
  const gy = useTransform(sy, (v) => `${v * 100}%`)
  const ga = useTransform(hover, (v) => v * glareOpacity)
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,${ga}), transparent 58%)`

  const reset = () => {
    px.set(0.5)
    py.set(0.5)
    hover.set(0)
  }

  const handlers = reduce
    ? {}
    : {
        onPointerMove: (e) => {
          if (e.pointerType !== 'mouse') return
          const el = ref.current
          if (!el) return
          const r = el.getBoundingClientRect()
          px.set((e.clientX - r.left) / r.width)
          py.set((e.clientY - r.top) / r.height)
          hover.set(1)
        },
        onPointerLeave: reset,
      }

  return {
    ref,
    handlers,
    rotateX: reduce ? 0 : rotateX,
    rotateY: reduce ? 0 : rotateY,
    glare,
    enabled: !reduce,
  }
}
