import { motion } from 'framer-motion'
import { drawLine, viewportOnce } from '@/lib/motion'

// Thin measurement/accent line that draws itself on scroll-in.
export default function AnimatedLine({
  orientation = 'horizontal',
  className = '',
  color = 'bg-line',
}) {
  const isH = orientation === 'horizontal'
  return (
    <motion.span
      variants={drawLine}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      className={`block ${color} ${
        isH ? 'h-px w-full origin-left' : 'w-px h-full origin-top'
      } ${className}`}
      style={isH ? {} : { transformOrigin: 'top', transform: 'scaleY(0)' }}
    />
  )
}
