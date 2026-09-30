import { useRef } from 'react'
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

// Subtle magnetic pull toward the cursor. Returns props to spread on a
// motion element. Fully disabled under prefers-reduced-motion.
export default function useMagnetic({ strength = 0.35, stiffness = 200, damping = 15 } = {}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness, damping, mass: 0.4 })
  const sy = useSpring(y, { stiffness, damping, mass: 0.4 })

  const handlers = reduce
    ? {}
    : {
        onMouseMove: (e) => {
          const el = ref.current
          if (!el) return
          const r = el.getBoundingClientRect()
          x.set((e.clientX - (r.left + r.width / 2)) * strength)
          y.set((e.clientY - (r.top + r.height / 2)) * strength)
        },
        onMouseLeave: () => {
          x.set(0)
          y.set(0)
        },
      }

  return { ref, handlers, x: reduce ? 0 : sx, y: reduce ? 0 : sy }
}
