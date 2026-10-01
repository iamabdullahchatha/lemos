// Small UI glyphs for the header, menus and mobile sheet. Inherit currentColor.
function Glyph({ className = 'h-4 w-4', strokeWidth = 1.7, children }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  )
}

export const PhoneIcon = (p) => (
  <Glyph {...p}>
    <path d="M5 4h3.5l1.8 4.4-2.3 1.4a11 11 0 0 0 6.2 6.2l1.4-2.3L20 15.5V19a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" />
  </Glyph>
)

export const ClockIcon = (p) => (
  <Glyph {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Glyph>
)

export const PinIcon = (p) => (
  <Glyph {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.3" />
  </Glyph>
)

export const ArrowIcon = (p) => (
  <Glyph strokeWidth={2} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Glyph>
)

export const CheckIcon = (p) => (
  <Glyph strokeWidth={2} {...p}>
    <path d="M5 12.5l4.2 4.2L19 7" />
  </Glyph>
)
