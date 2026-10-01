import { motion } from 'framer-motion'
import { viewportOnce } from '@/lib/motion'

// Abstract industrial pipe routing — draws itself on scroll-in, then
// glowing pulses travel the lines and the junctions breathe.
// Decorative, sits behind the footer content.
const ROUTES = [
  { d: 'M-20 80 H320 a24 24 0 0 1 24 24 V220 a24 24 0 0 0 24 24 H760', dur: 7, delay: 0 },
  { d: 'M1220 140 H900 a24 24 0 0 0 -24 24 V250', dur: 5, delay: 1.2 },
  { d: 'M120 340 V200 a24 24 0 0 1 24 -24 H520', dur: 6, delay: 2.4 },
  { d: 'M1040 -20 V120 a24 24 0 0 1 -24 24 H620', dur: 5.5, delay: 0.6, accent: true },
]
const NODES = [[344, 104], [760, 244], [876, 164], [520, 176], [620, 144]]

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
const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1, delay: 1.4 } },
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
      <defs>
        <filter id="footer-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="footer-pulse-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f26522" />
          <stop offset="1" stopColor="#ffd08a" />
        </linearGradient>
      </defs>

      {/* Base routing */}
      {ROUTES.map((r, i) => (
        <motion.path
          key={r.d}
          custom={i}
          variants={line}
          d={r.d}
          stroke={r.accent ? '#f26522' : 'currentColor'}
          strokeOpacity={r.accent ? 0.35 : 1}
          strokeWidth="1.5"
          fill="none"
        />
      ))}

      {/* Travelling glow pulses */}
      <motion.g variants={fadeIn} filter="url(#footer-glow)">
        {ROUTES.map((r) => (
          <path
            key={r.d}
            d={r.d}
            pathLength="1"
            className="footer-pulse"
            style={{ '--pulse-dur': `${r.dur}s`, '--pulse-delay': `${r.delay}s` }}
            stroke={r.accent ? '#ffa430' : 'url(#footer-pulse-grad)'}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        ))}
      </motion.g>

      {/* Junctions: breathing ember rings over solid nodes */}
      {NODES.map(([cx, cy], i) => (
        <g key={i}>
          <motion.g variants={fadeIn}>
            <circle cx={cx} cy={cy} r="4" fill="none" stroke="#f26522" strokeWidth="1.2" className="footer-node-ring" style={{ '--node-delay': `${i * 0.6}s` }} />
          </motion.g>
          <motion.circle custom={i} variants={node} cx={cx} cy={cy} r="4" fill="currentColor" />
          <motion.circle variants={fadeIn} cx={cx} cy={cy} r="2" fill="#ffa430" filter="url(#footer-glow)" />
        </g>
      ))}
    </motion.svg>
  )
}
