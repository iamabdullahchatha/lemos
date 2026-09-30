export default function Eyebrow({ children, className = '' }) {
  return (
    <span className={`eyebrow inline-flex items-center gap-3 ${className}`}>
      <span className="h-px w-8 bg-ember/60" aria-hidden="true" />
      {children}
    </span>
  )
}
