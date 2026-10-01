import { Link } from 'react-router-dom'
import Button3D from './Button3D'

// Legacy API kept for existing pages; filled variants render as 3D buttons.
const map = {
  solid: 'dark',
  navy: 'dark',
  ember: 'primary',
  outline: 'outline',
  light: 'light',
  glass: 'glass',
}

export default function PremiumButton({
  to,
  href,
  variant = 'solid',
  size = 'lg',
  arrow = true,
  className = '',
  children,
  ...rest
}) {
  if (variant !== 'ghost')
    return (
      <Button3D to={to} href={href} variant={map[variant] || 'dark'} size={size} arrow={arrow} className={className} {...rest}>
        {children}
      </Button3D>
    )

  // Ghost stays a flat text link
  const cls = `group inline-flex items-center gap-3 py-2 font-mono text-[0.78rem] font-medium uppercase tracking-[0.18em] text-ink transition-colors duration-500 ease-editorial hover:text-ember ${className}`
  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span aria-hidden="true" className="inline-block transition-transform duration-500 ease-editorial group-hover:translate-x-1">
          →
        </span>
      )}
    </>
  )
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>
  return <button className={cls} {...rest}>{inner}</button>
}
