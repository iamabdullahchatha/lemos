import { useRef } from 'react'
import { useSpring } from 'framer-motion'

// Magnetic hover: element eases toward the cursor, springs back on leave.
// Respects prefers-reduced-motion and coarse pointers (touch).
export function useMagnetic(strength = 0.35) {
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 180, damping: 15, mass: 0.3 })
  const y = useSpring(0, { stiffness: 180, damping: 15, mass: 0.3 })

  const enabled = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const onMouseMove = (e) => {
    if (!enabled() || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }

  const onMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { ref, x, y, onMouseMove, onMouseLeave }
}
