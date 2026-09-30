import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { site } from '@/data/site'
import { primaryNav, quoteCta } from '@/data/navigation'
import { EASE } from '@/lib/motion'
import useMagnetic from '@/hooks/useMagnetic'
import ServicesMegaMenu from './ServicesMegaMenu'
import IndustriesMenu from './IndustriesMenu'
import MobileNav from './MobileNav'

function isActiveItem(item, pathname) {
  if (item.to === '/') return pathname === '/'
  return pathname === item.to || pathname.startsWith(item.to + '/')
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(null) // 'services' | 'industries' | null
  const [hovered, setHovered] = useState(null)
  const { pathname } = useLocation()
  const closeTimer = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
  }, [pathname])

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? 'hidden' : ''
    return () => (document.documentElement.style.overflow = '')
  }, [mobileOpen])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenMenu(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const openPanel = (panel) => {
    clearTimeout(closeTimer.current)
    setOpenMenu(panel)
  }
  const scheduleClose = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140)
  }
  const closeNow = () => {
    clearTimeout(closeTimer.current)
    setOpenMenu(null)
  }

  // The bar turns solid on scroll or when the mobile sheet is open.
  // An open desktop mega-menu keeps the bar in its cinematic over-hero state
  // and drops a dark panel beneath it — read as one unit.
  const solid = scrolled || mobileOpen
  const overHero = !solid

  const cta = useMagnetic({ strength: 0.4 })

  const activeIndex = primaryNav.findIndex((i) => isActiveItem(i, pathname))
  const current = hovered !== null ? hovered : activeIndex

  const barTextColor = overHero ? 'text-white' : 'text-ink'

  return (
    <header className="fixed inset-x-0 top-0 z-50" onMouseLeave={scheduleClose}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-paper"
      >
        Skip to content
      </a>

      <div className="relative">
        {/* Solid glass layer (scrolled / mobile open) */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-paper/80 backdrop-blur-xl transition-opacity duration-500 ease-editorial ${
            solid ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ boxShadow: '0 1px 0 rgba(16,19,26,0.06), 0 22px 50px -32px rgba(16,19,26,0.45)' }}
        />
        {/* Cinematic scrim over hero (guarantees light-text legibility) */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/25 to-transparent transition-opacity duration-500 ease-editorial ${
            overHero ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Ember hairline under solid bar */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ember/35 to-transparent transition-opacity duration-500 ${
            solid && !openMenu ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div
          className="relative mx-auto flex max-w-edge items-center justify-between edge"
          style={{ height: 'var(--nav-h)' }}
        >
          {/* Logo */}
          <Link to="/" className="group flex items-center" aria-label={`${site.name} — home`}>
            <img
              src={site.logo}
              alt={site.name}
              width="782"
              height="215"
              className={`w-auto transition-all duration-500 ease-editorial group-hover:scale-[1.03] ${
                scrolled ? 'h-7 sm:h-8' : 'h-8 sm:h-10'
              } ${
                overHero
                  ? 'brightness-0 invert drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]'
                  : ''
              }`}
            />
          </Link>

          {/* Desktop nav */}
          <nav
            className="relative hidden items-center lg:flex"
            aria-label="Primary"
            onMouseLeave={() => setHovered(null)}
          >
            {primaryNav.map((item, i) => {
              const isPanel = Boolean(item.panel)
              const active =
                isActiveItem(item, pathname) || (isPanel && openMenu === item.panel)
              const showPill = i === current && current >= 0
              const linkColor = active
                ? overHero
                  ? 'text-amber'
                  : 'text-ember'
                : overHero
                  ? 'text-white/85 hover:text-white'
                  : 'text-ink/70 hover:text-ink'
              return (
                <div
                  key={item.to}
                  className="relative"
                  onMouseEnter={() => {
                    setHovered(i)
                    isPanel ? openPanel(item.panel) : closeNow()
                  }}
                >
                  {showPill && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className={`absolute inset-0 rounded-full ${
                        overHero
                          ? 'bg-white/10 ring-1 ring-inset ring-white/15'
                          : 'bg-ink/[0.05] ring-1 ring-inset ring-ink/10'
                      }`}
                    />
                  )}
                  <NavLink
                    to={item.to}
                    onFocus={() => (isPanel ? openPanel(item.panel) : closeNow())}
                    aria-haspopup={isPanel ? 'true' : undefined}
                    aria-expanded={isPanel ? openMenu === item.panel : undefined}
                    className={`relative z-10 flex items-center gap-1.5 px-4 py-2 font-mono text-[0.76rem] uppercase tracking-[0.12em] transition-colors duration-300 ${linkColor}`}
                  >
                    {item.label}
                    {isPanel && (
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 10 6"
                        className={`h-[5px] w-[9px] transition-transform duration-300 ${
                          openMenu === item.panel ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      >
                        <path d="M1 1l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </NavLink>
                </div>
              )
            })}
          </nav>

          {/* Magnetic 3D CTA */}
          <motion.div
            ref={cta.ref}
            style={{ x: cta.x, y: cta.y }}
            {...cta.handlers}
            className="hidden lg:block"
          >
            <Link
              to={quoteCta.to}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-br from-ember to-ember-600 px-6 py-3 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-white will-change-transform"
              style={{
                boxShadow:
                  '0 12px 30px -10px rgba(242,101,34,0.65), inset 0 1px 0 rgba(255,255,255,0.28)',
              }}
            >
              <span className="relative z-10">{quoteCta.label}</span>
              <span
                aria-hidden="true"
                className="relative z-10 inline-block transition-transform duration-400 ease-editorial group-hover:translate-x-1"
              >
                →
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-editorial group-hover:translate-x-[120%]"
              />
            </Link>
          </motion.div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span className={`h-[2px] w-7 transition-all duration-300 ${barTextColor === 'text-white' ? 'bg-white' : 'bg-ink'} ${mobileOpen ? 'translate-y-[8px] rotate-45' : ''}`} />
            <span className={`h-[2px] w-7 transition-all duration-300 ${barTextColor === 'text-white' ? 'bg-white' : 'bg-ink'} ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`h-[2px] w-7 transition-all duration-300 ${barTextColor === 'text-white' ? 'bg-white' : 'bg-ink'} ${mobileOpen ? '-translate-y-[8px] -rotate-45' : ''}`} />
          </button>
        </div>

        {/* Desktop mega panels */}
        <AnimatePresence>
          {openMenu && (
            <motion.div
              key={openMenu}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: EASE }}
              className="absolute inset-x-0 top-full hidden origin-top lg:block"
              onMouseEnter={() => openPanel(openMenu)}
              onMouseLeave={scheduleClose}
            >
              {openMenu === 'services' && <ServicesMegaMenu onNavigate={closeNow} />}
              {openMenu === 'industries' && <IndustriesMenu onNavigate={closeNow} />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
