import { motion } from 'framer-motion'
import { viewportOnce } from '@/lib/motion'

// Abstract industrial pipe routing — draws itself on scroll-in.
// Decorative, low-opacity, sits behind the footer content.
const line = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }, opacity: { duration: 0.4, delay: i * 0.15 } },
  }),
}
const node = {
  hidden: { scale: 0, opacity: 0 },
  show: (i) => ({ scale: 1, opacity: 1, transition: { duration: 0.5, delay: 0.6 + i * 0.15 } }),
}

export default function FooterVisual() {
  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 1200 320"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full text-white/10"
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      <motion.path custom={0} variants={line} d="M-20 80 H320 a24 24 0 0 1 24 24 V220 a24 24 0 0 0 24 24 H760" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <motion.path custom={1} variants={line} d="M1220 140 H900 a24 24 0 0 0 -24 24 V250" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <motion.path custom={2} variants={line} d="M120 340 V200 a24 24 0 0 1 24 -24 H520" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <motion.path custom={3} variants={line} d="M1040 -20 V120 a24 24 0 0 1 -24 24 H620" stroke="var(--brand-orange, #f26522)" strokeOpacity="0.35" strokeWidth="1.5" fill="none" />

      {[[344, 104], [760, 244], [876, 164], [520, 176], [620, 144]].map(([cx, cy], i) => (
        <motion.circle key={i} custom={i} variants={node} cx={cx} cy={cy} r="4" fill="currentColor" />
      ))}
    </motion.svg>
  )
}
