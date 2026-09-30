import { useScroll, useTransform } from 'framer-motion'

// Scroll-linked parallax. Returns a MotionValue for `y`.
// `speed` is the total travel in px across the element's scroll pass.
export function useParallax(ref, speed = 80) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  return useTransform(scrollYProgress, [0, 1], [speed * -1, speed])
}
