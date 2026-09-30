// Oversized editorial index marker (outlined). Used to number sections.
export default function SectionNumber({ children, className = '', outlined = true }) {
  return (
    <span
      className={`select-none font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-none ${
        outlined ? 'index-num text-ink/25' : 'text-ink'
      } ${className}`}
      aria-hidden="true"
    >
      {children}
    </span>
  )
}
