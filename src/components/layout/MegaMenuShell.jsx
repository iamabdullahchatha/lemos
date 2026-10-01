import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'
import { ArrowIcon } from './NavIcons'

const GRID = {
  backgroundImage:
    'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
  backgroundSize: '44px 44px',
  maskImage: 'radial-gradient(ellipse at 30% 0%, black 30%, transparent 75%)',
  WebkitMaskImage: 'radial-gradient(ellipse at 30% 0%, black 30%, transparent 75%)',
}

export const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035, delayChildren: 0.06 } },
}
export const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
}

// Dark floating card shared by the Services and Industries mega menus.
export default function MegaMenuShell({ children, footer }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-navy-950 text-paper ring-1 ring-white/10"
      style={{
        boxShadow: '0 40px 100px -30px rgba(8,15,46,0.75), 0 14px 34px -14px rgba(0,0,0,0.45)',
      }}
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-0" style={GRID} />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-1/3 h-96 w-96 rounded-full opacity-[0.14] blur-3xl"
        style={{ background: 'var(--brand-gradient)' }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-navy-500 opacity-20 blur-3xl"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/50 to-transparent"
      />

      <div className="relative">{children}</div>

      {footer && (
        <div className="relative flex items-center justify-between gap-6 border-t border-white/10 bg-white/[0.025] px-7 py-4">
          {footer}
        </div>
      )}
    </div>
  )
}

// Intro column shown at xl and up.
export function MegaIntro({ eyebrow, title, body, stats, link, onNavigate }) {
  return (
    <div className="relative hidden flex-col justify-between border-r border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-8 xl:col-span-3 xl:flex">
      <div>
        <span className="flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-amber">
          <span className="h-px w-6 bg-amber/60" />
          {eyebrow}
        </span>
        <h3 className="mt-5 text-[1.6rem] font-bold leading-[1.1] tracking-[-0.02em] text-white">
          {title}
        </h3>
        <p className="mt-4 text-[0.85rem] leading-relaxed text-paper/55">{body}</p>
      </div>

      <div>
        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/10 ring-1 ring-white/10">
          {stats.map((s) => (
            <div key={s.label} className="bg-navy-950/90 px-4 py-3.5">
              <dt className="font-mono text-[0.56rem] uppercase tracking-[0.2em] text-paper/45">
                {s.label}
              </dt>
              <dd className="mt-1 font-display text-2xl font-bold text-white">{s.value}</dd>
            </div>
          ))}
        </dl>
        <Link
          to={link.to}
          onClick={onNavigate}
          className="group mt-5 flex items-center justify-between rounded-full border border-white/15 py-1.5 pl-5 pr-1.5 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:border-ember hover:bg-ember"
        >
          {link.label}
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 ease-editorial group-hover:-rotate-45">
            <ArrowIcon className="h-3.5 w-3.5" />
          </span>
        </Link>
      </div>
    </div>
  )
}

// Footer row: a note on the left, a contact prompt on the right.
export function MegaFooter({ note, cta, onNavigate }) {
  return (
    <>
      <span className="flex items-center gap-2.5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-paper/50">
        <span className="h-1.5 w-1.5 rounded-full bg-ember" />
        {note}
      </span>
      <Link
        to={cta.to}
        onClick={onNavigate}
        className="group inline-flex items-center gap-2 text-[0.82rem] font-medium text-paper/80 transition-colors hover:text-amber"
      >
        {cta.label}
        <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </>
  )
}
