import { useState } from 'react'
import { pic } from '@/data/media'

// Cover image that hides itself on a failed load, leaving the
// parent's navy background as the branded fallback.
export default function Photo({ id, w = 1200, sizes = '(min-width: 1024px) 50vw, 100vw', alt = '', className = '', eager = false }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <img
      {...pic(id, w)}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable="false"
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className}`}
    />
  )
}
