// Micro technical annotation — small mono label with a coordinate tick.
// e.g. <TechnicalLabel code="LX·02">Pipe Fabrication</TechnicalLabel>
export default function TechnicalLabel({ code, children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-ink-faint ${className}`}
    >
      <span aria-hidden="true" className="text-ember">
        ✛
      </span>
      {code && <span className="text-ink-mute">{code}</span>}
      {code && children && <span className="text-line">/</span>}
      {children}
    </span>
  )
}
