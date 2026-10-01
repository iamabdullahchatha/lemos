import { useEffect } from 'react'
import Lenis from 'lenis'

// Cinematic smooth scroll. Disabled automatically when the user
// prefers reduced motion.
export function scrollToTop() {
  if (window.__lenis) window.__lenis.scrollTo(0)
  else window.scrollTo({ top: 0, behavior: 'smooth' })
}

export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // lerp (instead of a fixed duration) follows the wheel closely, so scrolling
    // feels smooth without the delayed, floaty response.
    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
    })
    window.__lenis = lenis

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      if (window.__lenis === lenis) delete window.__lenis
    }
  }, [])
}
