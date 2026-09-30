import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { EASE } from './motion'

// Number transition — counts from 0 to `value` when scrolled into view.
export function useCountUp(value, { duration = 1600, decimals = 0 } = {}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }
    let raf
    const start = performance.now()
    // easeOutExpo-ish to match editorial ease
    const ease = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      setDisplay(value * ease(t))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setDisplay(value)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  const formatted = Number(display).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return { ref, value: formatted }
}
