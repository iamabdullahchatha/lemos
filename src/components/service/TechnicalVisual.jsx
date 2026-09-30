import { Suspense, lazy, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { EASE, viewportOnce } from '@/lib/motion'

const Scene3D = lazy(() => import('@/components/home/Scene3D'))

// Shared draw-on-scroll for SVG strokes
const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.1, ease: EASE, delay: i * 0.12 }, opacity: { duration: 0.3, delay: i * 0.12 } },
  }),
}

function Frame({ label, children }) {
  return (
    <div className="relative">
      <div className="relative aspect-[4/3] w-full overflow-hidden border border-white/12 bg-navy-950">
        {/* grid backdrop */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* corner ticks */}
        <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-white/30" />
        <span className="absolute right-3 top-3 h-4 w-4 border-r border-t border-white/30" />
        <span className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-white/30" />
        <span className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-white/30" />
        {children}
      </div>
      <div className="mt-3 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink-faint">
        <span>{label}</span>
        <span className="hidden sm:inline">Rev · A</span>
      </div>
    </div>
  )
}

/* Common motion SVG wrapper */
function Svg({ children }) {
  return (
    <motion.svg
      viewBox="0 0 400 300"
      fill="none"
      className="absolute inset-0 h-full w-full"
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      stroke="currentColor"
    >
      {children}
    </motion.svg>
  )
}

const P = { stroke: '#9fb0d6', strokeWidth: 1.4 } // steel-blue lines
const A = { stroke: '#f26522', strokeWidth: 2 } // ember accent
const Am = { stroke: '#ffa430', strokeWidth: 1.6 } // amber

/* ---------------- Per-type visuals ---------------- */

function PipingSvg({ flow }) {
  return (
    <Svg>
      {/* pipe runs */}
      <motion.path variants={draw} custom={0} d="M20 90 H150 a20 20 0 0 1 20 20 V200 a20 20 0 0 0 20 20 H380" {...P} />
      <motion.path variants={draw} custom={1} d="M20 150 H90 a20 20 0 0 1 20 20 V240 H300" {...P} />
      <motion.path variants={draw} custom={2} d="M250 20 V80 a20 20 0 0 0 20 20 H380" {...P} />
      {/* valves / nodes */}
      {[[150,90],[190,220],[270,100],[110,170]].map(([x,y],i)=>(
        <motion.circle key={i} variants={draw} custom={i*0.5+1.5} cx={x} cy={y} r="7" {...A} fill="#080f2e" />
      ))}
      {/* flowing dashes */}
      {flow && (
        <motion.path d="M20 90 H150 a20 20 0 0 1 20 20 V200 a20 20 0 0 0 20 20 H380" stroke="#ffa430" strokeWidth="2" strokeDasharray="4 16" animate={{ strokeDashoffset: [0, -40] }} transition={{ duration: 1.4, ease: 'linear', repeat: Infinity }} />
      )}
    </Svg>
  )
}

function VesselSvg({ flow }) {
  return (
    <Svg>
      {/* vessel body */}
      <motion.path variants={draw} custom={0} d="M150 70 a50 30 0 0 1 100 0 V230 a50 30 0 0 1 -100 0 Z" {...P} />
      <motion.ellipse variants={draw} custom={0.4} cx="200" cy="70" rx="50" ry="30" {...P} />
      {/* level line */}
      <motion.line variants={draw} custom={1.2} x1="150" y1="170" x2="250" y2="170" {...A} />
      {/* nozzles */}
      <motion.line variants={draw} custom={1.4} x1="200" y1="40" x2="200" y2="70" {...P} />
      <motion.line variants={draw} custom={1.5} x1="250" y1="120" x2="290" y2="120" {...P} />
      <motion.line variants={draw} custom={1.6} x1="200" y1="260" x2="200" y2="285" {...P} />
      {/* dimension arrows */}
      <motion.line variants={draw} custom={2} x1="110" y1="70" x2="110" y2="230" {...Am} />
      {flow && (
        <motion.line x1="150" y1="170" x2="250" y2="170" stroke="#ffa430" strokeWidth="2" animate={{ y1:[170,120,170], y2:[170,120,170] }} transition={{ duration: 4, ease: EASE, repeat: Infinity }} />
      )}
    </Svg>
  )
}

function StructureSvg() {
  return (
    <Svg>
      {/* truss */}
      <motion.path variants={draw} custom={0} d="M30 240 H370" {...P} />
      <motion.path variants={draw} custom={0.3} d="M30 100 H370" {...P} />
      <motion.path variants={draw} custom={0.6} d="M30 100 L100 240 L170 100 L240 240 L310 100 L370 240" {...P} />
      <motion.path variants={draw} custom={1.1} d="M30 100 V240 M370 100 V240" {...A} />
      {/* base plates */}
      {[30,370].map((x,i)=>(<motion.rect key={i} variants={draw} custom={1.4} x={x-14} y={240} width="28" height="8" {...Am} />))}
    </Svg>
  )
}

function MechanicalSvg({ flow }) {
  return (
    <Svg>
      {/* central gear-ish assembly */}
      <motion.circle variants={draw} custom={0} cx="200" cy="150" r="60" {...P} />
      <motion.circle variants={draw} custom={0.4} cx="200" cy="150" r="22" {...A} fill="#080f2e" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2
        const x1 = 200 + Math.cos(a) * 60, y1 = 150 + Math.sin(a) * 60
        const x2 = 200 + Math.cos(a) * 78, y2 = 150 + Math.sin(a) * 78
        return <motion.line key={i} variants={draw} custom={0.5 + i * 0.05} x1={x1} y1={y1} x2={x2} y2={y2} {...P} />
      })}
      {/* connecting shaft */}
      <motion.line variants={draw} custom={1.4} x1="260" y1="150" x2="380" y2="150" {...Am} />
      <motion.circle variants={draw} custom={1.5} cx="350" cy="150" r="14" {...P} />
      {flow && (
        <motion.g animate={{ rotate: 360 }} transition={{ duration: 18, ease: 'linear', repeat: Infinity }} style={{ transformOrigin: '200px 150px' }}>
          <line x1="200" y1="128" x2="200" y2="172" stroke="#f26522" strokeWidth="2" />
        </motion.g>
      )}
    </Svg>
  )
}

function MachineSvg() {
  return (
    <Svg>
      {/* pump/motor block */}
      <motion.rect variants={draw} custom={0} x="70" y="150" width="120" height="70" rx="6" {...P} />
      <motion.circle variants={draw} custom={0.5} cx="250" cy="150" r="45" {...P} />
      <motion.circle variants={draw} custom={0.7} cx="250" cy="150" r="16" {...A} fill="#080f2e" />
      {/* shaft coupling */}
      <motion.line variants={draw} custom={1} x1="190" y1="185" x2="205" y2="185" {...Am} />
      {/* baseplate */}
      <motion.rect variants={draw} custom={1.2} x="50" y="230" width="260" height="12" {...Am} />
      {/* anchor bolts */}
      {[80,150,230,290].map((x,i)=>(<motion.line key={i} variants={draw} custom={1.3+i*0.1} x1={x} y1="242" x2={x} y2="258" {...P} />))}
    </Svg>
  )
}

function SkidSvg({ flow }) {
  return (
    <Svg>
      {/* skid base (isometric-ish) */}
      <motion.path variants={draw} custom={0} d="M60 230 L200 270 L340 230 L200 190 Z" {...Am} />
      {/* frame uprights */}
      {[[60,230],[340,230],[200,270]].map(([x,y],i)=>(<motion.line key={i} variants={draw} custom={0.3} x1={x} y1={y} x2={x} y2={y-40} {...P} />))}
      {/* vessel on skid */}
      <motion.rect variants={draw} custom={0.8} x="150" y="120" width="60" height="70" rx="8" {...P} />
      {/* pump */}
      <motion.circle variants={draw} custom={1} cx="250" cy="175" r="18" {...A} fill="#080f2e" />
      {/* piping */}
      <motion.path variants={draw} custom={1.2} d="M180 120 V90 H250 V157" {...P} />
      {flow && (
        <motion.path d="M180 120 V90 H250 V157" stroke="#ffa430" strokeWidth="2" strokeDasharray="3 12" animate={{ strokeDashoffset:[0,-30] }} transition={{ duration:1.2, ease:'linear', repeat:Infinity }} />
      )}
    </Svg>
  )
}

function InspectionSvg({ flow }) {
  return (
    <Svg>
      {/* equipment outline */}
      <motion.rect variants={draw} custom={0} x="90" y="110" width="220" height="110" rx="10" {...P} />
      <motion.circle variants={draw} custom={0.4} cx="150" cy="165" r="24" {...P} />
      <motion.circle variants={draw} custom={0.6} cx="250" cy="165" r="24" {...P} />
      {/* callouts */}
      {[[150,165],[250,165]].map(([x,y],i)=>(
        <motion.g key={i} variants={draw} custom={1+i*0.3}>
          <line x1={x} y1={y-24} x2={x} y2={70} {...Am} />
          <circle cx={x} cy={70} r="4" {...A} fill="#080f2e" />
        </motion.g>
      ))}
      {/* scan line */}
      {flow && (
        <motion.line x1="90" y1="110" x2="90" y2="220" stroke="#f26522" strokeWidth="2" animate={{ x1:[90,310,90], x2:[90,310,90] }} transition={{ duration: 3.4, ease: EASE, repeat: Infinity }} />
      )}
    </Svg>
  )
}

function TurnaroundSvg({ flow }) {
  const bars = [
    { y: 90, w: 200, c: A },
    { y: 130, w: 300, c: P },
    { y: 170, w: 150, c: Am },
    { y: 210, w: 250, c: P },
  ]
  return (
    <Svg>
      <motion.line variants={draw} custom={0} x1="40" y1="60" x2="40" y2="250" {...P} />
      {bars.map((b, i) => (
        <motion.line key={i} variants={draw} custom={0.3 + i * 0.25} x1="40" y1={b.y} x2={40 + b.w} y2={b.y} {...b.c} strokeWidth="8" />
      ))}
      {/* now marker */}
      {flow && (
        <motion.line x1="40" y1="60" x2="40" y2="250" stroke="#ffa430" strokeWidth="1.5" strokeDasharray="4 6" animate={{ x1:[40,340,40], x2:[40,340,40] }} transition={{ duration: 6, ease: EASE, repeat: Infinity }} />
      )}
    </Svg>
  )
}

const SVGS = {
  piping: PipingSvg,
  vessel: VesselSvg,
  structure: StructureSvg,
  mechanical: MechanicalSvg,
  machine: MachineSvg,
  skid: SkidSvg,
  inspection: InspectionSvg,
  turnaround: TurnaroundSvg,
}

/* 3D branch (skid page): lazy R3F on capable desktops, SVG fallback otherwise */
function useCanRender3D() {
  const [ok, setOk] = useState(false)
  useEffect(() => {
    try {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const wide = window.matchMedia('(min-width: 1024px)').matches
      const fine = window.matchMedia('(pointer: fine)').matches
      const c = document.createElement('canvas')
      const gl = !!(c.getContext('webgl2') || c.getContext('webgl'))
      setOk(!reduce && wide && fine && gl)
    } catch {
      setOk(false)
    }
  }, [])
  return ok
}

export default function TechnicalVisual({ type = 'mechanical', use3D = false, label = 'Fig. — Technical schematic' }) {
  const reduce = useReducedMotion()
  const can3D = useCanRender3D()
  const Visual = SVGS[type] || MechanicalSvg
  const flow = !reduce

  if (use3D && can3D) {
    return (
      <Frame label={label}>
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-paper/40">Rendering model…</span>
            </div>
          }
        >
          <Scene3D />
        </Suspense>
      </Frame>
    )
  }

  return (
    <Frame label={label}>
      <div className="absolute inset-0 text-white">
        <Visual flow={flow} />
      </div>
    </Frame>
  )
}
