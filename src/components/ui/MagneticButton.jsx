import { motion, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useMagnetic } from '@/lib/useMagnetic'

const base =
  'group relative inline-flex items-center justify-center gap-3 font-mono text-[0.78rem] uppercase tracking-[0.18em] font-medium transition-colors duration-500 ease-editorial'

const variants = {
  ember: 'bg-ember text-white px-9 py-4 hover:bg-ember-600',
  solid: 'bg-ink text-paper px-9 py-4 hover:bg-navy-900',
  outline: 'border border-ink/25 text-ink px-9 py-4 hover:border-ink',
}

// Button whose body eases toward the cursor; the label lags at ~40% for depth.
export default function MagneticButton({
  to,
  href,
  variant = 'ember',
  strength = 0.4,
  className = '',
  children,
  ...rest
}) {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic(strength)
  const labelX = useTransform(x, (v) => v * 0.4)
  const labelY = useTransform(y, (v) => v * 0.4)
  const cls = `${base} ${variants[variant]} ${className}`

  const label = (
    <motion.span
      style={{ x: labelX, y: labelY }}
      className="pointer-events-none relative z-10 flex items-center gap-3"
    >
      {children}
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-500 ease-editorial group-hover:translate-x-1"
      >
        →
      </span>
    </motion.span>
  )

  const inner = to ? (
    <Link to={to} className={cls} {...rest}>
      {label}
    </Link>
  ) : href ? (
    <a href={href} className={cls} {...rest}>
      {label}
    </a>
  ) : (
    <button className={cls} {...rest}>
      {label}
    </button>
  )

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x, y }}
      className="inline-flex"
    >
      {inner}
    </motion.div>
  )
}
