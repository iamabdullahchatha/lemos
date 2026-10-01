import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import useTilt from '@/lib/useTilt'
import { ArrowIcon } from '@/components/layout/NavIcons'

// Extruded 3D pill: tilts toward the cursor, lifts off its edge on hover and
// presses down on click. Edge depth and glow are driven by CSS vars in
// index.css (.btn3d / .btn3d-face) so the motion stays on the compositor.
const variants = {
  primary: {
    face: 'text-white',
    style: { backgroundImage: 'var(--brand-gradient)', '--b3d-edge': '#b73a10', '--b3d-glow': 'rgba(242,101,34,0.65)' },
    dot: 'bg-white/20 text-white ring-1 ring-white/30',
  },
  light: {
    face: 'bg-white text-navy-950',
    style: { '--b3d-edge': '#c9c3b5', '--b3d-glow': 'rgba(8,15,46,0.35)' },
    dot: 'bg-ember text-white',
  },
  dark: {
    face: 'bg-navy-900 text-white',
    style: { '--b3d-edge': '#030719', '--b3d-glow': 'rgba(8,15,46,0.55)' },
    dot: 'bg-ember text-white',
  },
  glass: {
    face: 'bg-white/10 text-white ring-1 ring-inset ring-white/25 backdrop-blur-md',
    style: { '--b3d-edge': 'rgba(255,255,255,0.16)', '--b3d-glow': 'rgba(0,0,0,0.45)' },
    dot: 'bg-white text-navy-950',
  },
  outline: {
    face: 'bg-paper text-ink ring-1 ring-inset ring-ink/20',
    style: { '--b3d-edge': 'rgba(16,19,26,0.22)', '--b3d-glow': 'rgba(16,19,26,0.18)' },
    dot: 'bg-ink text-paper',
  },
}

const sizes = {
  sm: { face: 'h-10 gap-3 text-[0.66rem]', pad: 'pl-5 pr-1.5', padNo: 'px-5', dot: 'h-7 w-7', icon: 'h-3 w-3' },
  md: { face: 'h-12 gap-4 text-[0.72rem]', pad: 'pl-6 pr-2', padNo: 'px-7', dot: 'h-8 w-8', icon: 'h-3.5 w-3.5' },
  lg: { face: 'h-14 gap-5 text-[0.76rem]', pad: 'pl-8 pr-2', padNo: 'px-9', dot: 'h-10 w-10', icon: 'h-4 w-4' },
}

const Button3D = forwardRef(function Button3D(
  { to, href, variant = 'primary', size = 'md', arrow = true, icon, className = '', children, ...rest },
  forwardedRef
) {
  const v = variants[variant] || variants.primary
  const s = sizes[size] || sizes.md
  const tilt = useTilt({ max: 14, glareOpacity: 0.45 })

  const setRef = (node) => {
    tilt.ref.current = node
    if (typeof forwardedRef === 'function') forwardedRef(node)
    else if (forwardedRef) forwardedRef.current = node
  }

  const cls = `btn3d group/b3d relative inline-block select-none rounded-full [perspective:700px] focus-visible:outline-none ${className}`

  const inner = (
    <motion.span
      style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }}
      className="block rounded-full"
    >
      <span
        style={v.style}
        className={`btn3d-face relative flex items-center rounded-full font-mono font-medium uppercase tracking-[0.16em] ${v.face} ${s.face} ${arrow || icon ? s.pad : s.padNo}`}
      >
        {/* Clipped light layer: glare follows the cursor, shimmer sweeps on hover */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <motion.span className="absolute inset-0" style={{ backgroundImage: tilt.glare }} />
          <span className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition-[left,opacity] duration-700 ease-editorial group-hover/b3d:left-[120%] group-hover/b3d:opacity-100" />
          <span className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        </span>

        <span className="relative whitespace-nowrap [transform:translateZ(18px)]">{children}</span>

        {(arrow || icon) && (
          <span
            aria-hidden="true"
            className={`relative grid shrink-0 place-items-center rounded-full transition-transform duration-500 ease-editorial [transform:translateZ(26px)] ${v.dot} ${s.dot}`}
          >
            <span className="grid place-items-center transition-transform duration-500 ease-editorial group-hover/b3d:-rotate-45">
              {icon || <ArrowIcon className={s.icon} />}
            </span>
          </span>
        )}
      </span>
    </motion.span>
  )

  const props = { ref: setRef, className: cls, ...tilt.handlers, ...rest }

  if (to) return <Link to={to} {...props}>{inner}</Link>
  if (href) return <a href={href} {...props}>{inner}</a>
  return <button type="button" {...props}>{inner}</button>
})

export default Button3D
