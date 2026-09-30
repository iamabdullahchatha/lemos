// Line-style engineering icon set. Keyed by service slug and industry icon key.
// Stroke-based, inherits currentColor. Decorative — aria-hidden.
const paths = {
  // --- Services ---
  'mechanical-contracting': (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3v2.4M12 18.6V21M3 12h2.4M18.6 12H21M5.6 5.6l1.7 1.7M16.7 16.7l1.7 1.7M18.4 5.6l-1.7 1.7M7.3 16.7l-1.7 1.7" />
    </>
  ),
  'pipe-fabrication-installation': (
    <>
      <path d="M4 20V11a7 7 0 0 1 7-7h9" />
      <path d="M4 20h4M20 4v4" />
      <circle cx="4" cy="20" r="0.6" fill="currentColor" />
    </>
  ),
  'shutdowns-turnarounds': (
    <>
      <path d="M20 12a8 8 0 1 1-2.3-5.6" />
      <path d="M20 4v3.2h-3.2" />
    </>
  ),
  'structural-fabrication': (
    <>
      <path d="M4 20 12 4l8 16" />
      <path d="M7.2 13.6h9.6M4 20h16" />
    </>
  ),
  'tanks-vessel-fabrication': (
    <>
      <rect x="6" y="5" width="12" height="14" rx="6" />
      <path d="M6 9.5h12M6 14.5h12" />
    </>
  ),
  'equipment-installation': (
    <>
      <path d="M5 21V6l9-2v3" />
      <path d="M5 6h11v4H5M14 10v11" />
      <path d="M18 8v4" />
    </>
  ),
  'maintenance-services': (
    <>
      <path d="M14.5 6.5a3.5 3.5 0 0 0-4.8 4.2l-5 5a1.6 1.6 0 0 0 2.3 2.3l5-5a3.5 3.5 0 0 0 4.2-4.8l-2 2-1.7-1.7 2-2z" />
    </>
  ),
  'skid-fabrication': (
    <>
      <path d="M4 8l8-4 8 4-8 4-8-4z" />
      <path d="M4 8v8l8 4 8-4V8M12 12v8" />
    </>
  ),
  // --- Industries ---
  oilgas: (
    <>
      <path d="M12 3c2.5 3 4 5.3 4 7.8A4 4 0 0 1 8 11c0-1.3.6-2.6 1.6-4" />
      <path d="M6 21h12M8 21v-3M16 21v-3" />
    </>
  ),
  petrochemical: (
    <>
      <path d="M6 4v5l-2.4 9.2A1.5 1.5 0 0 0 5 20h14a1.5 1.5 0 0 0 1.4-1.8L18 9V4" />
      <path d="M5 4h14M8 14h8" />
    </>
  ),
  refinery: (
    <>
      <path d="M3 21V10l4 2V7l4 2V5l4 2V21" />
      <path d="M3 21h18M18 21V9l3 2v10" />
    </>
  ),
  energy: (
    <>
      <path d="M13 3 5 13h5l-1 8 8-10h-5l1-8z" />
    </>
  ),
  industrial: (
    <>
      <rect x="4" y="9" width="16" height="11" rx="1" />
      <path d="M4 20h16M9 9V5l3 2 3-2v4" />
    </>
  ),
}

export default function ServiceIcon({ name, className = 'h-6 w-6', stroke = 1.4 }) {
  const glyph = paths[name]
  if (!glyph) return null
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {glyph}
    </svg>
  )
}
