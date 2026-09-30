import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '@/lib/motion'

// Scroll-in reveal primitive. Wraps any block and animates it once on enter.
export default function Reveal({
  as = 'div',
  variants = fadeUp,
  delay = 0,
  className = '',
  children,
}) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  )
}
