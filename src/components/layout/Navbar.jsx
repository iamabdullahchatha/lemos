import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { site } from '@/data/site'
import { primaryNav, quoteCta } from '@/data/navigation'
import { EASE } from '@/lib/motion'
import useMagnetic from '@/hooks/useMagnetic'
import ServicesMegaMenu from './ServicesMegaMenu'
import IndustriesMenu from './IndustriesMenu'
import MobileNav from './MobileNav'
import Button3D from '@/components/ui/Button3D'
import { ClockIcon, PhoneIcon, PinIcon } from './NavIcons'

function isActiveItem(item, pathname) {
  if (item.to === '/') return pathname === '/'
  return pathname === item.to || pathname.startsWith(item.to + '/')
}

// Routes that open on a dark, full-bleed hero. Every other route opens on
// paper, so the header starts in its dark-text variant there.
function hasDarkHero(pathname) {
  return (
    ['/', '/about', '/services', '/industries', '/contact'].includes(pathname) ||
    pathname.startsWith('/industries/') ||
    pathname.startsWith('/services/')
  )
}

function UtilityStrip({ show, onDark }) {
  const hours = site.hours[0]
  return (
    <div
      className={`relative hidden transition-[grid-template-rows,opacity,visibility] duration-500 ease-editorial lg:grid ${
        show ? 'visible grid-rows-[1fr] opacity-100' : 'invisible grid-rows-[0fr] opacity-0'
      }`}
    >
      <div className="overflow-hidden">
        <div className="mx-auto max-w-edge edge">
          <div
            className={`flex h-10 items-center justify-between border-b font-mono text-[0.64rem] uppercase tracking-[0.16em] transition-colors duration-500 ${
              onDark ? 'border-white/10 text-white/75' : 'border-ink/10 text-ink-mute'
            }`}
          >
            <div className="flex items-center gap-7">
              <span className="flex items-center gap-2.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember" />
                </span>
                {site.tagline}
              </span>
              <span className="hidden items-center gap-2 xl:flex">
                <PinIcon className="h-3.5 w-3.5 text-ember" />
                {site.contact.addressLines[1]}, Dubai
              </span>
            </div>
            <div className="flex items-center gap-7">
              <span className="flex items-center gap-2">
                <ClockIcon className="h-3.5 w-3.5 text-ember" />
                {hours.days} · {hours.time}
              </span>
              <a
                href={`tel:${site.contact.phoneHref}`}
                className={`flex items-center gap-2 transition-colors duration-300 ${
                  onDark ? 'text-white hover:text-amber' : 'text-ink hover:text-ember'
                }`}
              >
                <PhoneIcon className="h-3.5 w-3.5 text-ember" />
                {site.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(null) // 'services' | 'industries' | null
  const [hovered, setHovered] = useState(null)
  const { pathname } = useLocation()
  const closeTimer = useRef(null)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.4 })

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

  // Mobile: the bar turns solid on scroll or when the sheet is open.
  // Desktop: on scroll the bar detaches into a floating glass island.
  const solid = scrolled || mobileOpen
  const onDark = hasDarkHero(pathname) && !solid
  const island = scrolled

  const cta = useMagnetic({ strength: 0.35 })

  const activeIndex = primaryNav.findIndex((i) => isActiveItem(i, pathname))
  const current = hovered !== null ? hovered : activeIndex

  return (
    <header className="fixed inset-x-0 top-0 z-50" onMouseLeave={scheduleClose}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-paper"
      >
        Skip to content
      </a>

      {/* Page dim behind an open mega menu */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            onMouseEnter={scheduleClose}
            onClick={closeNow}
            className="fixed inset-0 -z-10 hidden bg-navy-950/45 backdrop-blur-[3px] lg:block"
          />
        )}
      </AnimatePresence>

      {/* Cinematic scrim over dark heroes (guarantees light-text legibility) */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 h-[calc(100%+3rem)] bg-gradient-to-b from-navy-950/80 via-navy-950/35 to-transparent transition-opacity duration-500 ease-editorial ${
          onDark ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {/* Mobile solid glass layer */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 bg-paper/[0.97] backdrop-blur-xl transition-opacity duration-500 ease-editorial lg:hidden ${
          solid ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ boxShadow: '0 1px 0 rgba(16,19,26,0.06), 0 22px 50px -32px rgba(16,19,26,0.45)' }}
      />
      {/* Mobile scroll progress */}
      <motion.span
        aria-hidden="true"
        style={{ scaleX: progress, background: 'var(--brand-gradient)' }}
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left transition-opacity duration-500 lg:hidden ${
          solid && !mobileOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <UtilityStrip show={!scrolled} onDark={hasDarkHero(pathname)} />

      <div
        className={`relative mx-auto max-w-edge edge transition-[padding] duration-500 ease-editorial ${
          island ? 'lg:pt-3' : 'lg:pt-0'
        }`}
      >
        <div
          className={`relative flex h-[5.25rem] items-center justify-between gap-6 transition-[height,padding] duration-500 ease-editorial ${
            island ? 'lg:h-[4.75rem] lg:px-4 xl:px-5' : 'lg:h-[5.5rem] lg:px-0'
          }`}
        >
          {/* Desktop floating island */}
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 hidden overflow-hidden rounded-2xl border border-white/70 bg-paper/[0.97] backdrop-blur-xl transition-[opacity,transform] duration-500 ease-editorial lg:block ${
              island ? 'scale-100 opacity-100' : 'scale-[0.985] opacity-0'
            }`}
            style={{
              boxShadow:
                'inset 0 1px 0 rgba(255,255,255,0.8), 0 22px 50px -26px rgba(8,15,46,0.45), 0 3px 10px -4px rgba(8,15,46,0.12)',
            }}
          >
            <motion.span
              style={{ scaleX: progress, background: 'var(--brand-gradient)' }}
              className="absolute inset-x-0 bottom-0 h-[2px] origin-left"
            />
          </span>

          {/* Logo */}
          <Link
            to="/"
            className="group relative z-10 flex shrink-0 items-center"
            aria-label={`${site.name} — home`}
          >
            <img
              src={site.logo}
              alt={site.name}
              width="782"
              height="215"
              className={`w-auto transition-[height,filter,transform] duration-500 ease-editorial group-hover:scale-[1.025] ${
                island
                  ? 'h-11 lg:h-11 xl:h-14'
                  : 'h-12 sm:h-[3.25rem] lg:h-[3.25rem] xl:h-16'
              } ${onDark ? 'logo-on-dark' : ''}`}
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
              const panelOpen = isPanel && openMenu === item.panel
              const routeActive = isActiveItem(item, pathname)
              const showPill = i === current && current >= 0
              const linkColor = panelOpen
                ? onDark
                  ? 'text-amber'
                  : 'text-ember'
                : routeActive
                  ? onDark
                    ? 'text-white'
                    : 'text-ink'
                  : onDark
                    ? 'text-white/75 hover:text-white'
                    : 'text-ink/65 hover:text-ink'
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
                        onDark
                          ? 'bg-white/10 ring-1 ring-inset ring-white/15'
                          : 'bg-ink/[0.05] ring-1 ring-inset ring-ink/10'
                      }`}
                    />
                  )}
                  {routeActive && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-x-0 -bottom-1.5 mx-auto h-[3px] w-5 rounded-full"
                      style={{ background: 'var(--brand-gradient)' }}
                    />
                  )}
                  <NavLink
                    to={item.to}
                    onFocus={() => (isPanel ? openPanel(item.panel) : closeNow())}
                    aria-haspopup={isPanel ? 'true' : undefined}
                    aria-expanded={isPanel ? panelOpen : undefined}
                    className={`relative z-10 flex items-center gap-1.5 px-3 py-2 font-display text-[0.95rem] font-medium tracking-[-0.01em] transition-colors duration-300 xl:px-4 ${linkColor}`}
                  >
                    {item.label}
                    {isPanel && (
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 10 6"
                        className={`h-[5px] w-[9px] transition-transform duration-300 ${
                          panelOpen ? 'rotate-180' : ''
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

          {/* Desktop actions */}
          <div className="relative hidden items-center gap-4 lg:flex">
            <a
              href={`tel:${site.contact.phoneHref}`}
              aria-label={`Call ${site.contact.phone}`}
              className={`group hidden items-center gap-3 transition-colors duration-300 xl:flex ${
                onDark ? 'text-white' : 'text-ink'
              }`}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full ring-1 transition-all duration-300 ease-editorial group-hover:-translate-y-0.5 group-hover:rotate-[-8deg] group-active:translate-y-0 ${
                  onDark
                    ? 'ring-white/25 shadow-[0_3px_0_rgba(255,255,255,0.14)] group-hover:bg-white group-hover:text-ink group-hover:shadow-[0_5px_0_rgba(255,255,255,0.3),0_14px_24px_-10px_rgba(0,0,0,0.6)]'
                    : 'ring-ink/15 shadow-[0_3px_0_rgba(16,19,26,0.12)] group-hover:bg-ink group-hover:text-white group-hover:shadow-[0_5px_0_#000,0_14px_24px_-10px_rgba(16,19,26,0.5)]'
                }`}
              >
                <PhoneIcon className="h-4 w-4" />
              </span>
              <span className="hidden flex-col leading-tight 2xl:flex">
                <span className="font-mono text-[0.58rem] uppercase tracking-[0.2em] opacity-60">
                  Talk to an engineer
                </span>
                <span className="text-sm font-semibold">{site.contact.phone}</span>
              </span>
            </a>

            <motion.div ref={cta.ref} style={{ x: cta.x, y: cta.y }} {...cta.handlers}>
              <Button3D to={quoteCta.to} variant="primary" size="md" className="-mt-1">
                {quoteCta.label}
              </Button3D>
            </motion.div>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className={`relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full ring-1 transition-colors duration-300 lg:hidden ${
              onDark ? 'ring-white/25 bg-white/5' : 'ring-ink/15 bg-white/60'
            }`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {[
              mobileOpen ? 'w-5 translate-y-[7px] rotate-45' : 'w-5',
              mobileOpen ? 'w-5 opacity-0' : 'w-3.5 translate-x-[3px]',
              mobileOpen ? 'w-5 -translate-y-[7px] -rotate-45' : 'w-5',
            ].map((cls, i) => (
              <span
                key={i}
                className={`h-[2px] rounded-full transition-all duration-300 ${onDark ? 'bg-white' : 'bg-ink'} ${cls}`}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Desktop mega panels */}
      <AnimatePresence>
        {openMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: EASE }}
            className="absolute inset-x-0 top-full hidden pt-3 lg:block"
            onMouseEnter={() => openPanel(openMenu)}
            onMouseLeave={scheduleClose}
          >
            <div className="mx-auto max-w-edge edge">
              <motion.div
                key={openMenu}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                {openMenu === 'services' && <ServicesMegaMenu onNavigate={closeNow} />}
                {openMenu === 'industries' && <IndustriesMenu onNavigate={closeNow} />}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
