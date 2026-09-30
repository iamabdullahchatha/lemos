import { Link } from 'react-router-dom'

const base =
  'group relative inline-flex items-center justify-center gap-3 overflow-hidden font-mono text-[0.78rem] uppercase tracking-[0.18em] font-medium transition-colors duration-500 ease-editorial'

const variants = {
  solid: 'bg-ink text-paper px-8 py-4',
  ember: 'bg-ember text-white px-8 py-4',
  navy: 'bg-navy-900 text-paper px-8 py-4',
  outline: 'border border-ink/25 text-ink px-8 py-4 hover:border-ink',
  ghost: 'text-ink px-0 py-2 hover:text-ember',
}

// Fill-wipe hover for the filled variants
const fillVariants = new Set(['solid', 'ember', 'navy'])

function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="relative z-10 inline-block transition-transform duration-500 ease-editorial group-hover:translate-x-1"
    >
      →
    </span>
  )
}

export default function PremiumButton({
  to,
  href,
  variant = 'solid',
  arrow = true,
  className = '',
  children,
  ...rest
}) {
  const hasFill = fillVariants.has(variant)
  const cls = `${base} ${variants[variant]} ${className}`

  const inner = (
    <>
      {hasFill && (
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-bottom scale-y-0 bg-ember transition-transform duration-500 ease-editorial group-hover:scale-y-100 data-[ember=true]:bg-ink"
          data-ember={variant === 'ember'}
        />
      )}
      <span className="relative z-10">{children}</span>
      {arrow && <Arrow />}
    </>
  )

  if (to)
    return (
      <Link to={to} className={cls} {...rest}>
        {inner}
      </Link>
    )
  if (href)
    return (
      <a href={href} className={cls} {...rest}>
        {inner}
      </a>
    )
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  )
}
