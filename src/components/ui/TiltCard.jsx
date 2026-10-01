import { motion } from 'framer-motion'
import useTilt from '@/lib/useTilt'

// 3D card shell. The tilting layer keeps preserve-3d, so children can float
// at depth with [transform:translateZ(..)]. Never put overflow-hidden on the
// card itself (it flattens 3D) — clip images in their own inner layer.
export default function TiltCard({
  as: Comp = 'div',
  max = 8,
  glare = true,
  className = '',
  cardClassName = '',
  children,
  ...rest
}) {
  const tilt = useTilt({ max, glareOpacity: 0.22 })

  return (
    <Comp
      ref={tilt.ref}
      className={`group relative block [perspective:1400px] ${className}`}
      {...tilt.handlers}
      {...rest}
    >
      <motion.div
        style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }}
        className={`relative h-full transition-shadow duration-500 ease-editorial ${cardClassName}`}
      >
        {children}
        {glare && (
          <motion.span
            aria-hidden="true"
            style={{ backgroundImage: tilt.glare }}
            className="pointer-events-none absolute inset-0 z-20 rounded-[inherit]"
          />
        )}
      </motion.div>
    </Comp>
  )
}
