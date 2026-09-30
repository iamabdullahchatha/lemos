// Subtle blueprint-inspired detail layer: a faint technical grid with
// coordinate ticks. Decorative only — never a literal blueprint.
export default function TechnicalGrid({
  className = '',
  ticks = true,
  opacity = 0.5,
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ opacity }}
    >
      {/* Fine grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(16,19,26,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,19,26,0.05) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(120% 120% at 50% 0%, black 30%, transparent 85%)',
          WebkitMaskImage:
            'radial-gradient(120% 120% at 50% 0%, black 30%, transparent 85%)',
        }}
      />
      {/* Corner coordinate marks */}
      {ticks && (
        <>
          <Corner className="left-6 top-6" />
          <Corner className="right-6 top-6 rotate-90" />
          <Corner className="bottom-6 left-6 -rotate-90" />
          <Corner className="bottom-6 right-6 rotate-180" />
        </>
      )}
    </div>
  )
}

function Corner({ className = '' }) {
  return (
    <span className={`absolute text-ember/50 ${className}`}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M1 1H6M1 1V6" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    </span>
  )
}
