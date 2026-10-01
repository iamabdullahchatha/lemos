import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useParallax } from '@/lib/useParallax'

// Full-bleed-capable image that drifts vertically with scroll.
// The inner layer is oversized so parallax never reveals edges.
// Falls back to a branded placeholder if the image fails to load.
export default function ParallaxImage({
  src,
  srcSet,
  sizes = '100vw',
  alt = '',
  ratio = '16/9',
  speed = 70,
  className = '',
  imgClassName = '',
  overlay = false,
}) {
  const ref = useRef(null)
  const y = useParallax(ref, speed)
  const [failed, setFailed] = useState(false)
  const showImg = src && !failed

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-navy-900 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <motion.div style={{ y }} className="absolute inset-x-0 -top-[12%] h-[124%]">
        {showImg ? (
          <img
            src={src}
            srcSet={srcSet}
            sizes={srcSet ? sizes : undefined}
            alt={alt}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className={`h-full w-full object-cover ${imgClassName}`}
          />
        ) : (
          <div className="relative flex h-full w-full items-center justify-center bg-navy-900">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />
            <span className="relative font-mono text-[0.68rem] uppercase tracking-[0.2em] text-paper/40">
              Lemos · Imagery
            </span>
          </div>
        )}
      </motion.div>
      {overlay && (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent"
        />
      )}
    </div>
  )
}
