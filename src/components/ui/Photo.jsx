import { useState } from 'react'
import { img } from '@/data/media'

// Cover image that hides itself on a failed load, leaving the
// parent's navy background as the branded fallback.
export default function Photo({ id, w = 1200, alt = '', className = '', eager = false }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <img
      src={img(id, w)}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      draggable="false"
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover ${className}`}
    />
  )
}
