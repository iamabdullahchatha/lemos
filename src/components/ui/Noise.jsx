// Ultra-subtle film grain to add depth on flat brand fields.
// SVG fractal noise, fixed layer, very low opacity. Normal blending on purpose:
// a full-viewport mix-blend layer forces the browser to re-blend the whole
// screen on every scroll frame.
const NOISE_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"

export default function Noise({ opacity = 0.025, fixed = true, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`${fixed ? 'fixed' : 'absolute'} inset-0 z-[1] pointer-events-none [contain:strict] ${className}`}
      style={{
        opacity,
        backgroundImage: `url("${NOISE_SVG}")`,
        backgroundSize: '120px 120px',
      }}
    />
  )
}
